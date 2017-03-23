import ImageWrapper from './common/image_wrapper';
import createLocator, {checkImageConstraints} from './locator/barcode_locator';
import BarcodeDecoder from './decoder/barcode_decoder';
import createEventedElement from './common/events';
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


function createScanner(pixelCapturer) {
    var _inputStream,
        _framegrabber,
        _stopped = true,
        _canvasContainer = {
            ctx: {
                image: null
            },
            dom: {
                image: null
            }
        },
        _inputImageWrapper,
        _boxSize,
        _decoder,
        _workerPool = [],
        _onUIThread = true,
        _resultCollector,
        _config = {},
        _events = createEventedElement(),
        _locator;

    const source = pixelCapturer ? pixelCapturer.getSource() : {};

    function setup() {
        // checkImageConstraints(_inputStream, _config.locator);
        return adjustWorkerPool(_config.numOfWorkers)
        .then(() => {
            if (_config.numOfWorkers === 0) {
                initializeData();
            }
        });
    }

    function initializeData(imageWrapper) {
        initBuffers(imageWrapper);
        _decoder = BarcodeDecoder.create(_config.decoder, _inputImageWrapper);
    }

    function initBuffers(imageWrapper) {
        if (imageWrapper) {
            _inputImageWrapper = imageWrapper;
        } else {
            const captureSize = pixelCapturer.getCaptureSize();
            _inputImageWrapper = new ImageWrapper({
                x: captureSize.width,
                y: captureSize.height,
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
        _locator = createLocator(_inputImageWrapper, _config.locator);
    }

    function getBoundingBoxes() {
        if (_config.locate) {
            return _locator.locate();
        } else {
            return [[
                vec2.clone(_boxSize[0]),
                vec2.clone(_boxSize[1]),
                vec2.clone(_boxSize[2]),
                vec2.clone(_boxSize[3])]];
        }
    }

    function transformResult(result) {
        const {viewport} = source.getDimensions();
        let xOffset = viewport.x,
            yOffset = viewport.y,
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

        _events.publish("processed", resultToPublish);
        if (hasCodeResult(result)) {
            _events.publish("detected", resultToPublish);
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
                if (!availableWorker) {
                    return Promise.resolve();
                }
            }
            const buffer = availableWorker ? availableWorker.imageData : _inputImageWrapper.data;
            return pixelCapturer.grabFrameData({buffer})
            .then((bitmap) => {
                if (bitmap) {
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
            })
            .catch(err => {
                console.error(err);
            });
        }

        return Promise.resolve(locateAndDecode());
    }

    function startContinuousUpdate() {
        var next = null,
            delay = 1000 / (_config.frequency === 0 ? 10 : (_config.frequency || 10));

        _stopped = false;
        (function frame(timestamp) {
            next = next || timestamp;
            if (!_stopped) {
                if (timestamp >= next) {
                    next += delay;
                    update().then(() => {
                        window.requestAnimFrame(frame);
                    });
                } else {
                    window.requestAnimFrame(frame);
                }
            }
        }(performance.now()));
    }

    function start() {
        if (_onUIThread && source.type === "CAMERA") {
            startContinuousUpdate();
        } else {
            update();
        }
    }

    function initWorker(cb) {
        const captureSize = pixelCapturer.getCaptureSize();
        const workerThread = {
            worker: undefined,
            imageData: new Uint8Array(captureSize.width * captureSize.height),
            busy: true
        };

        const blobURL = generateWorkerBlob();
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
            size: {x: captureSize.width, y: captureSize.height},
            imageData: workerThread.imageData,
            config: configForWorker(_config)
        }, [workerThread.imageData.buffer]);
    }

    function configForWorker(config) {
        return Object.assign({}, config, {
            inputStream: Object.assign({}, config.inputStream, {target: null})
        });
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
        var imageWrapper,
            scanner = Quagga._worker.createScanner();

        self.onmessage = function(e) {
            if (e.data.cmd === 'init') {
                var config = e.data.config;
                config.numOfWorkers = 0;
                imageWrapper = new Quagga.ImageWrapper({
                    x: e.data.size.x,
                    y: e.data.size.y
                }, new Uint8Array(e.data.imageData));
                scanner.init(config, ready, imageWrapper);
                scanner.subscribe("processed", onProcessed);
            } else if (e.data.cmd === 'process') {
                imageWrapper.data = new Uint8Array(e.data.imageData);
                scanner.start();
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

    function adjustWorkerPool(capacity) {
        return new Promise((resolve) => {
            const increaseBy = capacity - _workerPool.length;
            if (increaseBy === 0) {
                return resolve();
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
                return resolve();
            } else {
                for (var i = 0; i < increaseBy; i++) {
                    initWorker(workerInitialized);
                }

                function workerInitialized(workerThread) {
                    _workerPool.push(workerThread);
                    if (_workerPool.length >= capacity){
                        resolve();
                    }
                }
            }
        });
    }

    return {
        init: function(config, cb, imageWrapper) {
            _config = merge({}, Config, config);

            if (imageWrapper) {
                _onUIThread = false;
                initializeData(imageWrapper);
                return cb();
            } else {
                return setup().then(cb);
            }
        },
        start: function() {
            start();
        },
        isRunning: function() {
            return !_stopped;
        },
        stop: function() {
            _stopped = true;
            adjustWorkerPool(0);
            if (source.type === "CAMERA") {
                CameraAccess.release();
            }
        },
        pause: function() {
            _stopped = true;
        },
        subscribe(eventName, callback) {
            _events.subscribe(eventName, callback);
        },
        unsubscribe(eventName, callback) {
            _events.unsubscribe(eventName, callback);
        },
        registerResultCollector: function(resultCollector) {
            if (resultCollector && typeof resultCollector.addResult === 'function') {
                _resultCollector = resultCollector;
            }
        },
        decodeSingle: function(config, resultCallback) {
            this.init(config, () => {
                _events.once("processed", (result) => {
                    this.stop();
                    resultCallback.call(null, result);
                }, true);
                start();
            });
        },
        canvas: _canvasContainer
    };
}

export default createScanner;
