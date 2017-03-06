import TypeDefs from './common/typedefs'; // eslint-disable-line no-unused-vars
import ImageWrapper from './common/image_wrapper';
import BarcodeLocator from './locator/barcode_locator';
import BarcodeDecoder from './decoder/barcode_decoder';
import Events from './common/events';
import CameraAccess from './input/camera_access';
import ImageDebug from './common/image_debug';
import ResultCollector from './analytics/result_collector';
import Config from './config/config';
import InputStream from 'input_stream';
import FrameGrabber from 'frame_grabber';
import {merge} from 'lodash';
const vec2 = {
    clone: require('gl-vec2/clone')
};

var _inputStream,
    _framegrabber,
    _stopped,
    _canvasContainer = {
        ctx: {
            image: null,
            overlay: null
        },
        dom: {
            image: null,
            overlay: null
        }
    },
    _inputImageWrapper,
    _boxSize,
    _decoder,
    _workerPool = [],
    _onUIThread = true,
    _resultCollector,
    _config = {};

function initializeData(imageWrapper) {
    initBuffers(imageWrapper);
    _decoder = BarcodeDecoder.create(_config.decoder, _inputImageWrapper);
}

function initInputStream(cb) {
    var video;
    if (_config.inputStream.type === "VideoStream") {
        video = document.createElement("video");
        _inputStream = InputStream.createVideoStream(video);
    } else if (_config.inputStream.type === "ImageStream") {
        _inputStream = InputStream.createImageStream();
    } else if (_config.inputStream.type === "LiveStream") {
        var $viewport = getViewPort();
        if ($viewport) {
            video = $viewport.querySelector("video");
            if (!video) {
                video = document.createElement("video");
                $viewport.appendChild(video);
            }
        }
        _inputStream = InputStream.createLiveStream(video);
        CameraAccess.request(video, _config.inputStream.constraints)
        .then(() => {
            _inputStream.trigger("canrecord");
        }).catch((err) => {
            return cb(err);
        });
    }

    _inputStream.setAttribute("preload", "auto");
    _inputStream.setInputStream(_config.inputStream);
    _inputStream.addEventListener("canrecord", canRecord.bind(undefined, cb));
}

function getViewPort() {
    var target = _config.inputStream.target;
    // Check if target is already a DOM element
    if (target && target.nodeName && target.nodeType === 1) {
        return target;
    } else {
        // Use '#interactive.viewport' as a fallback selector (backwards compatibility)
        var selector = typeof target === 'string' ? target : '#interactive.viewport';
        return document.querySelector(selector);
    }
}

function canRecord(cb) {
    BarcodeLocator.checkImageConstraints(_inputStream, _config.locator);
    initCanvas(_config);
    _framegrabber = FrameGrabber.create(_inputStream, _canvasContainer.dom.image);

    adjustWorkerPool(_config.numOfWorkers, function() {
        if (_config.numOfWorkers === 0) {
            initializeData();
        }
        ready(cb);
    });
}

function ready(cb){
    _inputStream.play();
    cb();
}

function initCanvas() {
    if (typeof document !== "undefined") {
        var $viewport = getViewPort();
        _canvasContainer.dom.image = document.querySelector("canvas.imgBuffer");
        if (!_canvasContainer.dom.image) {
            _canvasContainer.dom.image = document.createElement("canvas");
            _canvasContainer.dom.image.className = "imgBuffer";
            if ($viewport && _config.inputStream.type === "ImageStream") {
                $viewport.appendChild(_canvasContainer.dom.image);
            }
        }
        _canvasContainer.ctx.image = _canvasContainer.dom.image.getContext("2d");
        _canvasContainer.dom.image.width = _inputStream.getCanvasSize().x;
        _canvasContainer.dom.image.height = _inputStream.getCanvasSize().y;

        _canvasContainer.dom.overlay = document.querySelector("canvas.drawingBuffer");
        if (!_canvasContainer.dom.overlay) {
            _canvasContainer.dom.overlay = document.createElement("canvas");
            _canvasContainer.dom.overlay.className = "drawingBuffer";
            if ($viewport) {
                $viewport.appendChild(_canvasContainer.dom.overlay);
            }
            var clearFix = document.createElement("br");
            clearFix.setAttribute("clear", "all");
            if ($viewport) {
                $viewport.appendChild(clearFix);
            }
        }
        _canvasContainer.ctx.overlay = _canvasContainer.dom.overlay.getContext("2d");
        _canvasContainer.dom.overlay.width = _inputStream.getCanvasSize().x;
        _canvasContainer.dom.overlay.height = _inputStream.getCanvasSize().y;
    }
}

function initBuffers(imageWrapper) {
    if (imageWrapper) {
        _inputImageWrapper = imageWrapper;
    } else {
        _inputImageWrapper = new ImageWrapper({
            x: _inputStream.getWidth(),
            y: _inputStream.getHeight()
        });
    }

    if (ENV.development) {
        console.log(_inputImageWrapper.size);
    }
    _boxSize = [
        vec2.clone([0, 0]),
        vec2.clone([0, _inputImageWrapper.size.y]),
        vec2.clone([_inputImageWrapper.size.x, _inputImageWrapper.size.y]),
        vec2.clone([_inputImageWrapper.size.x, 0])
    ];
    BarcodeLocator.init(_inputImageWrapper, _config.locator);
}

function getBoundingBoxes() {
    if (_config.locate) {
        return BarcodeLocator.locate();
    } else {
        return [[
            vec2.clone(_boxSize[0]),
            vec2.clone(_boxSize[1]),
            vec2.clone(_boxSize[2]),
            vec2.clone(_boxSize[3])]];
    }
}

function transformResult(result) {
    var topRight = _inputStream.getTopRight(),
        xOffset = topRight.x,
        yOffset = topRight.y,
        i;

    if (xOffset === 0 && yOffset === 0) {
        return;
    }

    if (result.barcodes) {
        for (i = 0; i < result.barcodes.length; i++) {
            transformResult(result.barcodes[i]);
        }
    }

    if (result.line && result.line.length === 2) {
        moveLine(result.line);
    }

    if (result.box) {
        moveBox(result.box);
    }

    if (result.boxes && result.boxes.length > 0) {
        for (i = 0; i < result.boxes.length; i++) {
            moveBox(result.boxes[i]);
        }
    }

    function moveBox(box) {
        var corner = box.length;

        while (corner--) {
            box[corner][0] += xOffset;
            box[corner][1] += yOffset;
        }
    }

    function moveLine(line) {
        line[0].x += xOffset;
        line[0].y += yOffset;
        line[1].x += xOffset;
        line[1].y += yOffset;
    }
}

function addResult (result, imageData) {
    if (!imageData || !_resultCollector) {
        return;
    }

    if (result.barcodes) {
        result.barcodes.filter(barcode => barcode.codeResult)
            .forEach(barcode => addResult(barcode, imageData));
    } else if (result.codeResult) {
        _resultCollector.addResult(imageData, _inputStream.getCanvasSize(), result.codeResult);
    }
}

function hasCodeResult (result) {
    return result && (result.barcodes ?
      result.barcodes.some(barcode => barcode.codeResult) :
      result.codeResult);
}

function publishResult(result, imageData) {
    let resultToPublish = result;

    if (result && _onUIThread) {
        transformResult(result);
        addResult(result, imageData);
        resultToPublish = result.barcodes || result;
    }

    Events.publish("processed", resultToPublish);
    if (hasCodeResult(result)) {
        Events.publish("detected", resultToPublish);
    }
}

function locateAndDecode() {
    var result,
        boxes;

    boxes = getBoundingBoxes();
    if (boxes) {
        result = _decoder.decodeFromBoundingBoxes(boxes);
        result = result || {};
        result.boxes = boxes;
        publishResult(result, _inputImageWrapper.data);
    } else {
        publishResult();
    }
}

function update() {
    var availableWorker;

    if (_onUIThread) {
        if (_workerPool.length > 0) {
            availableWorker = _workerPool.filter(function(workerThread) {
                return !workerThread.busy;
            })[0];
            if (availableWorker) {
                _framegrabber.attachData(availableWorker.imageData);
            } else {
                return; // all workers are busy
            }
        } else {
            _framegrabber.attachData(_inputImageWrapper.data);
        }
        if (_framegrabber.grab()) {
            if (availableWorker) {
                availableWorker.busy = true;
                availableWorker.worker.postMessage({
                    cmd: 'process',
                    imageData: availableWorker.imageData
                }, [availableWorker.imageData.buffer]);
            } else {
                locateAndDecode();
            }
        }
    } else {
        locateAndDecode();
    }
}

function startContinuousUpdate() {
    var next = null,
        delay = 1000 / (_config.frequency || 60);

    _stopped = false;
    (function frame(timestamp) {
        next = next || timestamp;
        if (!_stopped) {
            if (timestamp >= next) {
                next += delay;
                update();
            }
            window.requestAnimFrame(frame);
        }
    }(performance.now()));
}

function start() {
    if (_onUIThread && _config.inputStream.type === "LiveStream") {
        startContinuousUpdate();
    } else {
        update();
    }
}

function initWorker(cb) {
    var blobURL,
        workerThread = {
            worker: undefined,
            imageData: new Uint8Array(_inputStream.getWidth() * _inputStream.getHeight()),
            busy: true
        };

    blobURL = generateWorkerBlob();
    workerThread.worker = new Worker(blobURL);

    workerThread.worker.onmessage = function(e) {
        if (e.data.event === 'initialized') {
            URL.revokeObjectURL(blobURL);
            workerThread.busy = false;
            workerThread.imageData = new Uint8Array(e.data.imageData);
            if (ENV.development) {
                console.log("Worker initialized");
            }
            return cb(workerThread);
        } else if (e.data.event === 'processed') {
            workerThread.imageData = new Uint8Array(e.data.imageData);
            workerThread.busy = false;
            publishResult(e.data.result, workerThread.imageData);
        } else if (e.data.event === 'error') {
            if (ENV.development) {
                console.log("Worker error: " + e.data.message);
            }
        }
    };

    workerThread.worker.postMessage({
        cmd: 'init',
        size: {x: _inputStream.getWidth(), y: _inputStream.getHeight()},
        imageData: workerThread.imageData,
        config: configForWorker(_config)
    }, [workerThread.imageData.buffer]);
}

function configForWorker(config) {
    return {
        ...config,
        inputStream: {
            ...config.inputStream,
            target: null
        }
    };
}

function workerInterface(factory) {
    /* eslint-disable no-undef*/
    if (factory) {
        var Quagga = factory().default;
        if (!Quagga) {
            self.postMessage({'event': 'error', message: 'Quagga could not be created'});
            return;
        }
    }
    var imageWrapper;

    self.onmessage = function(e) {
        if (e.data.cmd === 'init') {
            var config = e.data.config;
            config.numOfWorkers = 0;
            imageWrapper = new Quagga.ImageWrapper({
                x: e.data.size.x,
                y: e.data.size.y
            }, new Uint8Array(e.data.imageData));
            Quagga.init(config, ready, imageWrapper);
            Quagga.onProcessed(onProcessed);
        } else if (e.data.cmd === 'process') {
            imageWrapper.data = new Uint8Array(e.data.imageData);
            Quagga.start();
        } else if (e.data.cmd === 'setReaders') {
            Quagga.setReaders(e.data.readers);
        }
    };

    function onProcessed(result) {
        self.postMessage({
            'event': 'processed',
            imageData: imageWrapper.data,
            result: result
        }, [imageWrapper.data.buffer]);
    }

    function ready() { // eslint-disable-line
        self.postMessage({'event': 'initialized', imageData: imageWrapper.data}, [imageWrapper.data.buffer]);
    }

    /* eslint-enable */
}

function generateWorkerBlob() {
    var blob,
        factorySource;

    /* jshint ignore:start */
    if (typeof __factorySource__ !== 'undefined') {
        factorySource = __factorySource__; // eslint-disable-line no-undef
    }
    /* jshint ignore:end */

    blob = new Blob(['(' + workerInterface.toString() + ')(' + factorySource + ');'],
        {type: 'text/javascript'});

    return window.URL.createObjectURL(blob);
}

function setReaders(readers) {
    if (_decoder) {
        _decoder.setReaders(readers);
    } else if (_onUIThread && _workerPool.length > 0) {
        _workerPool.forEach(function(workerThread) {
            workerThread.worker.postMessage({cmd: 'setReaders', readers: readers});
        });
    }
}

function adjustWorkerPool(capacity, cb) {
    const increaseBy = capacity - _workerPool.length;
    if (increaseBy === 0) {
        return cb && cb();
    }
    if (increaseBy < 0) {
        const workersToTerminate = _workerPool.slice(increaseBy);
        workersToTerminate.forEach(function(workerThread) {
            workerThread.worker.terminate();
            if (ENV.development) {
                console.log("Worker terminated!");
            }
        });
        _workerPool = _workerPool.slice(0, increaseBy);
        return cb && cb();
    } else {
        for (var i = 0; i < increaseBy; i++) {
            initWorker(workerInitialized);
        }

        function workerInitialized(workerThread) {
            _workerPool.push(workerThread);
            if (_workerPool.length >= capacity){
                cb && cb();
            }
        }
    }
}

export default {
    init: function(config, cb, imageWrapper) {
        _config = merge({}, Config, config);
        if (imageWrapper) {
            _onUIThread = false;
            initializeData(imageWrapper);
            return cb();
        } else {
            initInputStream(cb);
        }
    },
    start: function() {
        start();
    },
    stop: function() {
        _stopped = true;
        adjustWorkerPool(0);
        if (_config.inputStream.type === "LiveStream") {
            CameraAccess.release();
            _inputStream.clearEventHandlers();
        }
    },
    pause: function() {
        _stopped = true;
    },
    onDetected: function(callback) {
        Events.subscribe("detected", callback);
    },
    offDetected: function(callback) {
        Events.unsubscribe("detected", callback);
    },
    onProcessed: function(callback) {
        Events.subscribe("processed", callback);
    },
    offProcessed: function(callback) {
        Events.unsubscribe("processed", callback);
    },
    setReaders: function(readers) {
        setReaders(readers);
    },
    registerResultCollector: function(resultCollector) {
        if (resultCollector && typeof resultCollector.addResult === 'function') {
            _resultCollector = resultCollector;
        }
    },
    canvas: _canvasContainer,
    decodeSingle: function(config, resultCallback) {
        config = merge({
            inputStream: {
                type: "ImageStream",
                sequence: false,
                size: 800,
                src: config.src
            },
            numOfWorkers: (ENV.development && config.debug) ? 0 : 1,
            locator: {
                halfSample: false
            }
        }, config);
        this.init(config, () => {
            Events.once("processed", (result) => {
                this.stop();
                resultCallback.call(null, result);
            }, true);
            start();
        });
    },
    ImageWrapper: ImageWrapper,
    ImageDebug: ImageDebug,
    ResultCollector: ResultCollector,
    CameraAccess: CameraAccess,
};
