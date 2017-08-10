import {merge, memoize} from 'lodash';

import ImageWrapper from './common/image_wrapper';
import createLocator, {checkImageConstraints} from './locator/barcode_locator';
import BarcodeDecoder from './decoder/barcode_decoder';
import createEventedElement from './common/events';
import {release, aquire, releaseAll} from './common/buffers';
import Config from './config/config';
import {getViewport} from './common/utils';
import {Scope} from './input/SourceScope';

const vec2 = {
    clone: require('gl-vec2/clone')
};

const getDecoder = memoize(decoderConfig => {
    return BarcodeDecoder.create(decoderConfig);
}, decoderConfig => {
    return JSON.stringify(decoderConfig);
});

const _checkImageConstraints = memoize((opts) => {
    return checkImageConstraints(opts);
}, (opts) => {
    return JSON.stringify(opts);
});

function createScanner(pixelCapturer) {
    var _stopped = true,
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
        _workerPool = [],
        _onUIThread = true,
        _resultCollector,
        _config = {},
        _events = createEventedElement(),
        _locator;

    const source = pixelCapturer ? pixelCapturer.getSource() : {};

    function updateViewportStyle(target) {
        const $drawable = source.getDrawable();
        const $viewport = getViewport(target);

        if (!$viewport) {
            return;
        }

        const {viewport} = source.getDimensions();
        const zoom = Math.floor((((2 * viewport.x) + viewport.width) / viewport.width) * 100) / 100;
        const videoWidth = zoom * viewport.width;
        const translate = ((viewport.x / videoWidth) * (-100)).toFixed(5);

        $drawable.style.width = `${zoom * 100}%`;
        $drawable.style.transform = `translate(${translate}%, ${translate}%)`;
        $drawable.style.position = 'absolute';
        $viewport.style.paddingBottom = `${(viewport.height * 100 / viewport.width).toFixed(5)}%`;
        $viewport.style.overflow = "hidden";
        $viewport.style.height = 0;
    }

    function setup({numOfWorkers, target}) {
        if (source.type === 'IMAGE') {
            numOfWorkers = numOfWorkers >= 1 ? 1 : 0;
        }
        return adjustWorkerPool(numOfWorkers)
        .then(() => {
            if (numOfWorkers === 0) {
                initBuffers();
            }
        })
        .then(updateViewportStyle.bind(null, target));
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

    function transformResult(result, dimensions = {}) {
        const {clipping = {x: 0, y: 0}} = dimensions;
        let xOffset = clipping.x,
            yOffset = clipping.y,
            i;

        if (xOffset === 0 && yOffset === 0) {
            return;
        }

        if (result.barcodes) {
            for (i = 0; i < result.barcodes.length; i++) {
                transformResult(result.barcodes[i], dimensions);
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
            _resultCollector.addResult(imageData, source.getDimensions().canvas, result.codeResult);
        }
    }

    function hasCodeResult (result) {
        return result && (result.barcodes ?
          result.barcodes.some(barcode => barcode.codeResult) :
          result.codeResult);
    }

    function publishResult(result, imageData, bitmap) {
        let resultToPublish = result;

        if (result && _onUIThread) {
            transformResult(result, bitmap.dimensions);
            addResult(result, imageData);
            resultToPublish = result.barcodes || result;
        }

        _events.publish("processed", resultToPublish);
        if (hasCodeResult(result)) {
            _events.publish("detected", resultToPublish);
        }
    }

    function locateAndDecode(bitmap) {
        var result,
            boxes;

        boxes = getBoundingBoxes();
        if (boxes) {
            result = getDecoder(_config.decoder)
                .decodeFromBoundingBoxes(_inputImageWrapper, boxes);
            result = result || {};
            result.boxes = boxes;
            publishResult(result, _inputImageWrapper.data, bitmap);
        } else {
            publishResult(undefined, undefined, bitmap);
        }
    }

    function calculateClipping(canvasSize) {
        if (_config.detector && _config.detector.area) {
            const area = _config.detector.area;
            const patchSize = _config.locator.patchSize || "medium";
            const halfSample = _config.locator.halfSample || true;

            return _checkImageConstraints({area, patchSize, canvasSize, halfSample});
        }
        return {
            x: 0,
            y: 0,
            width: canvasSize.width,
            height: canvasSize.height,
        };
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
            return pixelCapturer.grabFrameData({clipping: calculateClipping})
            .then((bitmap) => {
                if (bitmap) {
                    if (availableWorker) {
                        availableWorker.imageData = bitmap.data;
                        availableWorker.dimensions = bitmap.dimensions;
                        availableWorker.busy = true;
                        availableWorker.worker.postMessage({
                            cmd: 'process',
                            imageData: availableWorker.imageData
                        }, [availableWorker.imageData.buffer]);
                    } else {
                        _inputImageWrapper.data = bitmap.data;
                        locateAndDecode(bitmap);
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
            imageData: new Uint8Array(aquire(captureSize.width * captureSize.height)),
            busy: true
        };

        const blobURL = generateWorkerBlob();
        workerThread.worker = new Worker(blobURL);

        workerThread.worker.onmessage = function(e) {
            if (e.data.event === 'initialized') {
                URL.revokeObjectURL(blobURL);
                workerThread.busy = false;
                release(e.data.imageData);
                if (ENV.development) {
                    console.log("Worker initialized");
                }
                return cb(workerThread);
            } else if (e.data.event === 'processed') {
                release(e.data.imageData);
                workerThread.busy = false;
                publishResult(e.data.result, workerThread.imageData, workerThread.dimensions);
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
                scanner.init(config, imageWrapper).then(ready);
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
        init: function(config, imageWrapper) {
            _stopped = true;
            _config = merge({}, Config, config);

            if (imageWrapper) {
                _onUIThread = false;
                initBuffers(imageWrapper);
            }
            return Promise.resolve();
        },
        start: function() {
            if (_onUIThread) {
                adjustWorkerPool(0);
                return source.waitUntilReady()
                .then(setup.bind(null, _config))
                .then(start);
            }
            start();
        },
        isRunning: function() {
            return !_stopped;
        },
        stop: function() {
            _stopped = true;
            adjustWorkerPool(0);
            releaseAll();
            if (source.getScope() === Scope.INTERNAL) {
                source.stop();
            }
            _events.publish("stopped");
        },
        applyConfig(newConfig) {
            return this.init(newConfig);
        },
        pause: function() {
            _stopped = true;
        },
        subscribe(eventName, callback, once = false) {
            if (!once) {
                return _events.subscribe(eventName, callback);
            }
            _events.once(eventName, callback);
        },
        unsubscribe(eventName, callback) {
            _events.unsubscribe(eventName, callback);
        },
        registerResultCollector: function(resultCollector) {
            if (resultCollector && typeof resultCollector.addResult === 'function') {
                _resultCollector = resultCollector;
            }
        },
        decodeSingle() {
            return new Promise((resolve, reject) => {
                _events.once("processed", (result) => {
                    this.stop();
                    if (result && result.codeResult && result.codeResult.code) {
                        return resolve(result);
                    }
                    return reject(result);
                }, true);
                this.start();
            });
        },
        canvas: _canvasContainer
    };
}

export default createScanner;
