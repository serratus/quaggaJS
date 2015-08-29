/* jshint undef: true, unused: true, browser:true, devel: true, evil: true */
/* global define, vec2 */


define([
        "input_stream",
        "image_wrapper",
        "barcode_locator",
        "barcode_decoder",
        "frame_grabber",
        "html_utils",
        "config",
        "events",
        "camera_access",
        "image_debug",
        "result_collector"],
function(InputStream,
         ImageWrapper,
         BarcodeLocator,
         BarcodeDecoder,
         FrameGrabber,
         HtmlUtils,
         _config,
         Events,
         CameraAccess,
         ImageDebug,
         ResultCollector) {
    "use strict";
    
    var _inputStream,
        _framegrabber,
        _stopped,
        _canvasContainer = {
            ctx : {
                image : null,
                overlay : null
            },
            dom : {
                image : null,
                overlay : null
            }
        },
        _inputImageWrapper,
        _boxSize,
        _decoder,
        _workerPool = [],
        _onUIThread = true,
        _resultCollector;

    function initializeData(imageWrapper) {
        initBuffers(imageWrapper);
        _decoder = BarcodeDecoder.create(_config.decoder, _inputImageWrapper);
    }

    function initConfig() {
        if (typeof document !== "undefined") {
            var vis = [{
                node: document.querySelector("div[data-controls]"),
                prop: _config.controls
            }, {
                node: _canvasContainer.dom.overlay,
                prop: _config.visual.show
            }];

            for (var i = 0; i < vis.length; i++) {
                if (vis[i].node) {
                    if (vis[i].prop === true) {
                        vis[i].node.style.display = "block";
                    } else {
                        vis[i].node.style.display = "none";
                    }
                }
            }
        }
    }

    function initInputStream(cb) {
        var video;
        if (_config.inputStream.type == "VideoStream") {
            video = document.createElement("video");
            _inputStream = InputStream.createVideoStream(video);
        } else if (_config.inputStream.type == "ImageStream") {
            _inputStream = InputStream.createImageStream();
        } else if (_config.inputStream.type == "LiveStream") {
            var $viewport = document.querySelector("#interactive.viewport");
            if ($viewport) {
                video = $viewport.querySelector("video");
                if (!video) {
                    video = document.createElement("video");
                    $viewport.appendChild(video);
                }
            }
            _inputStream = InputStream.createLiveStream(video);
            CameraAccess.request(video, _config.inputStream.constraints, function(err) {
                if (!err) {
                    _inputStream.trigger("canrecord");
                } else {
                    return cb(err);
                }
            });
        }

        _inputStream.setAttribute("preload", "auto");
        _inputStream.setAttribute("autoplay", true);
        _inputStream.setInputStream(_config.inputStream);
        _inputStream.addEventListener("canrecord", canRecord.bind(undefined, cb));
    }

    function canRecord(cb) {
        BarcodeLocator.checkImageConstraints(_inputStream, _config.locator);
        initCanvas();
        _framegrabber = FrameGrabber.create(_inputStream, _canvasContainer.dom.image);
        initConfig();

        if (_config.numOfWorkers > 0) {
            initWorkers(function() {
                console.log("Workers created");
                ready(cb);
            });
        } else {
            initializeData();
            ready(cb);
        }
    }

    function ready(cb){
        _inputStream.play();
        cb();
    }

    function initCanvas() {
        if (typeof document !== "undefined") {
            var $viewport = document.querySelector("#interactive.viewport");
            _canvasContainer.dom.image = document.querySelector("canvas.imgBuffer");
            if (!_canvasContainer.dom.image) {
                _canvasContainer.dom.image = document.createElement("canvas");
                _canvasContainer.dom.image.className = "imgBuffer";
                if ($viewport && _config.inputStream.type == "ImageStream") {
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
                x : _inputStream.getWidth(),
                y : _inputStream.getHeight()
            });
        }

        console.log(_inputImageWrapper.size);
        _boxSize = [
                vec2.create([0, 0]),
                vec2.create([0, _inputImageWrapper.size.y]),
                vec2.create([_inputImageWrapper.size.x, _inputImageWrapper.size.y]),
                vec2.create([_inputImageWrapper.size.x, 0])
            ];
        BarcodeLocator.init(_inputImageWrapper, _config.locator);
    }

    function getBoundingBoxes() {
        if (_config.locate) {
            return BarcodeLocator.locate();
        } else {
            return [[
                vec2.create(_boxSize[0]),
                vec2.create(_boxSize[1]),
                vec2.create(_boxSize[2]),
                vec2.create(_boxSize[3])]];
        }
    }

    function transformResult(result) {
        var topRight = _inputStream.getTopRight(),
            xOffset = topRight.x,
            yOffset = topRight.y,
            i;

        if (!result || (xOffset === 0 && yOffset === 0)) {
            return;
        }


        if (result.line && result.line.length === 2) {
            moveLine(result.line);
        }
        if (result.boxes && result.boxes.length > 0) {
            for (i = 0; i < result.boxes.length; i++) {
                moveBox(result.boxes[i]);
            }
        }

        function moveBox(box) {
            var corner = box.length;

            while(corner--) {
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

    function publishResult(result, imageData) {
        if (_onUIThread) {
            transformResult(result);
            if (imageData && result && result.codeResult) {
                if (_resultCollector) {
                    _resultCollector.addResult(imageData, _inputStream.getCanvasSize(), result.codeResult);
                }
            }
        }

        Events.publish("processed", result);
        if (result && result.codeResult) {
            Events.publish("detected", result);
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

    function start() {
        _stopped = false;
        ( function frame() {
            if (!_stopped) {
                update();
                if (_onUIThread && _config.inputStream.type == "LiveStream") {
                    window.requestAnimFrame(frame);
                }
            }
        }());
    }

    function initWorkers(cb) {
        var i;
        _workerPool = [];

        for (i = 0; i < _config.numOfWorkers; i++) {
            initWorker(workerInitialized);
        }

        function workerInitialized(workerThread) {
            _workerPool.push(workerThread);
            if (_workerPool.length >= _config.numOfWorkers){
                cb();
            }
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
                console.log("Worker initialized");
                return cb(workerThread);
            } else if (e.data.event === 'processed') {
                workerThread.imageData = new Uint8Array(e.data.imageData);
                workerThread.busy = false;
                publishResult(e.data.result, workerThread.imageData);
            } else if (e.data.event === 'error') {
                console.log("Worker error: " + e.data.message);
            }
        };

        workerThread.worker.postMessage({
            cmd: 'init',
            size: {x: _inputStream.getWidth(), y: _inputStream.getHeight()},
            imageData: workerThread.imageData,
            config: _config
        }, [workerThread.imageData.buffer]);
    }


    function workerInterface(factory) {
        if (factory) {
            /* jshint ignore:start */
            var Quagga = factory();
            if (!Quagga) {
                self.postMessage({'event': 'error', message: 'Quagga could not be created'});
                return;
            }
            /* jshint ignore:end */
        }
        /* jshint ignore:start */
        var imageWrapper;

        self.onmessage = function(e) {
            if (e.data.cmd === 'init') {
                var config = e.data.config;
                config.numOfWorkers = 0;
                imageWrapper = new Quagga.ImageWrapper({
                    x : e.data.size.x,
                    y : e.data.size.y
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
            self.postMessage({'event': 'processed', imageData: imageWrapper.data, result: result}, [imageWrapper.data.buffer]);
        }

        function ready() {
            self.postMessage({'event': 'initialized', imageData: imageWrapper.data}, [imageWrapper.data.buffer]);
        }
        /* jshint ignore:end */
    }

    function generateWorkerBlob() {
        var blob,
            factorySource;

        /* jshint ignore:start */
        if (typeof __factorySource__ !== 'undefined') {
            factorySource = __factorySource__;
        }
        /* jshint ignore:end */

        blob = new Blob(['(' + workerInterface.toString() + ')(' + factorySource + ');'],
            {type : 'text/javascript'});

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

    return {
        init : function(config, cb, imageWrapper) {
            _config = HtmlUtils.mergeObjects(_config, config);
            if (imageWrapper) {
                _onUIThread = false;
                initializeData(imageWrapper);
                return cb();
            } else {
                initInputStream(cb);
            }
        },
        start : function() {
            start();
        },
        stop : function() {
            _stopped = true;
            _workerPool.forEach(function(workerThread) {
                workerThread.worker.terminate();
                console.log("Worker terminated!");
            });
            _workerPool.length = 0;
            if (_config.inputStream.type === "LiveStream") {
                CameraAccess.release();
                _inputStream.clearEventHandlers();
            }
        },
        pause: function() {
            _stopped = true;
        },
        onDetected : function(callback) {
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
        canvas : _canvasContainer,
        decodeSingle : function(config, resultCallback) {
            config = HtmlUtils.mergeObjects({
                inputStream: {
                    type : "ImageStream",
                    sequence : false,
                    size: 800,
                    src: config.src
                },
                numOfWorkers: 1,
                locator: {
                    halfSample: false
                }
            }, config);
            this.init(config, function() {
                Events.once("processed", function(result) {
                    _stopped = true;
                    resultCallback.call(null, result);
                }, true);
                start();
            });
        },
        ImageWrapper: ImageWrapper,
        ImageDebug: ImageDebug,
        ResultCollector: ResultCollector
    };
});
