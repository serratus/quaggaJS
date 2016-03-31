module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonTypedefs = __webpack_require__(2);
	
	var _commonTypedefs2 = _interopRequireDefault(_commonTypedefs);
	
	// eslint-disable-line no-unused-vars
	
	var _commonImage_wrapper = __webpack_require__(3);
	
	var _commonImage_wrapper2 = _interopRequireDefault(_commonImage_wrapper);
	
	var _locatorBarcode_locator = __webpack_require__(9);
	
	var _locatorBarcode_locator2 = _interopRequireDefault(_locatorBarcode_locator);
	
	var _decoderBarcode_decoder = __webpack_require__(14);
	
	var _decoderBarcode_decoder2 = _interopRequireDefault(_decoderBarcode_decoder);
	
	var _commonEvents = __webpack_require__(59);
	
	var _commonEvents2 = _interopRequireDefault(_commonEvents);
	
	var _inputCamera_access = __webpack_require__(60);
	
	var _inputCamera_access2 = _interopRequireDefault(_inputCamera_access);
	
	var _commonImage_debug = __webpack_require__(10);
	
	var _commonImage_debug2 = _interopRequireDefault(_commonImage_debug);
	
	var _glMatrix = __webpack_require__(7);
	
	var _analyticsResult_collector = __webpack_require__(61);
	
	var _analyticsResult_collector2 = _interopRequireDefault(_analyticsResult_collector);
	
	var _configConfig = __webpack_require__(62);
	
	var _configConfig2 = _interopRequireDefault(_configConfig);
	
	var _input_stream = __webpack_require__(64);
	
	var _input_stream2 = _interopRequireDefault(_input_stream);
	
	var _frame_grabber = __webpack_require__(66);
	
	var _frame_grabber2 = _interopRequireDefault(_frame_grabber);
	
	var merge = __webpack_require__(26);
	
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
	    _decoder = _decoderBarcode_decoder2['default'].create(_config.decoder, _inputImageWrapper);
	}
	
	function initInputStream(cb) {
	    var video;
	    if (_config.inputStream.type === "VideoStream") {
	        video = document.createElement("video");
	        _inputStream = _input_stream2['default'].createVideoStream(video);
	    } else if (_config.inputStream.type === "ImageStream") {
	        _inputStream = _input_stream2['default'].createImageStream();
	    } else if (_config.inputStream.type === "LiveStream") {
	        var $viewport = getViewPort();
	        if ($viewport) {
	            video = $viewport.querySelector("video");
	            if (!video) {
	                video = document.createElement("video");
	                $viewport.appendChild(video);
	            }
	        }
	        _inputStream = _input_stream2['default'].createLiveStream(video);
	        _inputCamera_access2['default'].request(video, _config.inputStream.constraints, function (err) {
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
	    _locatorBarcode_locator2['default'].checkImageConstraints(_inputStream, _config.locator);
	    initCanvas(_config);
	    _framegrabber = _frame_grabber2['default'].create(_inputStream, _canvasContainer.dom.image);
	
	    adjustWorkerPool(_config.numOfWorkers, function () {
	        if (_config.numOfWorkers === 0) {
	            initializeData();
	        }
	        ready(cb);
	    });
	}
	
	function ready(cb) {
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
	        _inputImageWrapper = new _commonImage_wrapper2['default']({
	            x: _inputStream.getWidth(),
	            y: _inputStream.getHeight()
	        });
	    }
	
	    if (false) {
	        console.log(_inputImageWrapper.size);
	    }
	    _boxSize = [_glMatrix.vec2.clone([0, 0]), _glMatrix.vec2.clone([0, _inputImageWrapper.size.y]), _glMatrix.vec2.clone([_inputImageWrapper.size.x, _inputImageWrapper.size.y]), _glMatrix.vec2.clone([_inputImageWrapper.size.x, 0])];
	    _locatorBarcode_locator2['default'].init(_inputImageWrapper, _config.locator);
	}
	
	function getBoundingBoxes() {
	    if (_config.locate) {
	        return _locatorBarcode_locator2['default'].locate();
	    } else {
	        return [[_glMatrix.vec2.clone(_boxSize[0]), _glMatrix.vec2.clone(_boxSize[1]), _glMatrix.vec2.clone(_boxSize[2]), _glMatrix.vec2.clone(_boxSize[3])]];
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
	
	function addResult(result, imageData) {
	    if (!imageData || !_resultCollector) {
	        return;
	    }
	
	    if (result.barcodes) {
	        result.barcodes.filter(function (barcode) {
	            return barcode.codeResult;
	        }).forEach(function (barcode) {
	            return addResult(barcode, imageData);
	        });
	    } else if (result.codeResult) {
	        _resultCollector.addResult(imageData, _inputStream.getCanvasSize(), result.codeResult);
	    }
	}
	
	function hasCodeResult(result) {
	    return result && (result.barcodes ? result.barcodes.some(function (barcode) {
	        return barcode.codeResult;
	    }) : result.codeResult);
	}
	
	function publishResult(result, imageData) {
	    var resultToPublish = result && (result.barcodes || result);
	
	    if (result && _onUIThread) {
	        transformResult(result);
	        addResult(result, imageData);
	    }
	
	    _commonEvents2['default'].publish("processed", resultToPublish);
	    if (hasCodeResult(result)) {
	        _commonEvents2['default'].publish("detected", resultToPublish);
	    }
	}
	
	function locateAndDecode() {
	    var result, boxes;
	
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
	            availableWorker = _workerPool.filter(function (workerThread) {
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
	    })(performance.now());
	}
	
	function _start() {
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
	
	    workerThread.worker.onmessage = function (e) {
	        if (e.data.event === 'initialized') {
	            URL.revokeObjectURL(blobURL);
	            workerThread.busy = false;
	            workerThread.imageData = new Uint8Array(e.data.imageData);
	            if (false) {
	                console.log("Worker initialized");
	            }
	            return cb(workerThread);
	        } else if (e.data.event === 'processed') {
	            workerThread.imageData = new Uint8Array(e.data.imageData);
	            workerThread.busy = false;
	            publishResult(e.data.result, workerThread.imageData);
	        } else if (e.data.event === 'error') {
	            if (false) {
	                console.log("Worker error: " + e.data.message);
	            }
	        }
	    };
	
	    workerThread.worker.postMessage({
	        cmd: 'init',
	        size: { x: _inputStream.getWidth(), y: _inputStream.getHeight() },
	        imageData: workerThread.imageData,
	        config: _config
	    }, [workerThread.imageData.buffer]);
	}
	
	function workerInterface(factory) {
	    /* eslint-disable no-undef*/
	    if (factory) {
	        var Quagga = factory();
	        if (!Quagga) {
	            self.postMessage({ 'event': 'error', message: 'Quagga could not be created' });
	            return;
	        }
	    }
	    var imageWrapper;
	
	    self.onmessage = function (e) {
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
	
	    function ready() {
	        // eslint-disable-line
	        self.postMessage({ 'event': 'initialized', imageData: imageWrapper.data }, [imageWrapper.data.buffer]);
	    }
	
	    /* eslint-enable */
	}
	
	function generateWorkerBlob() {
	    var blob, factorySource;
	
	    /* jshint ignore:start */
	    if (typeof __factorySource__ !== 'undefined') {
	        factorySource = __factorySource__; // eslint-disable-line no-undef
	    }
	    /* jshint ignore:end */
	
	    blob = new Blob(['(' + workerInterface.toString() + ')(' + factorySource + ');'], { type: 'text/javascript' });
	
	    return window.URL.createObjectURL(blob);
	}
	
	function _setReaders(readers) {
	    if (_decoder) {
	        _decoder.setReaders(readers);
	    } else if (_onUIThread && _workerPool.length > 0) {
	        _workerPool.forEach(function (workerThread) {
	            workerThread.worker.postMessage({ cmd: 'setReaders', readers: readers });
	        });
	    }
	}
	
	function adjustWorkerPool(capacity, cb) {
	    var increaseBy = capacity - _workerPool.length;
	    if (increaseBy === 0) {
	        return cb && cb();
	    }
	    if (increaseBy < 0) {
	        var workersToTerminate = _workerPool.slice(increaseBy);
	        workersToTerminate.forEach(function (workerThread) {
	            workerThread.worker.terminate();
	            if (false) {
	                console.log("Worker terminated!");
	            }
	        });
	        _workerPool = _workerPool.slice(0, increaseBy);
	        return cb && cb();
	    } else {
	        var workerInitialized = function workerInitialized(workerThread) {
	            _workerPool.push(workerThread);
	            if (_workerPool.length >= capacity) {
	                cb && cb();
	            }
	        };
	
	        for (var i = 0; i < increaseBy; i++) {
	            initWorker(workerInitialized);
	        }
	    }
	}
	
	exports['default'] = {
	    init: function init(config, cb, imageWrapper) {
	        _config = merge({}, _configConfig2['default'], config);
	        if (imageWrapper) {
	            _onUIThread = false;
	            initializeData(imageWrapper);
	            return cb();
	        } else {
	            initInputStream(cb);
	        }
	    },
	    start: function start() {
	        _start();
	    },
	    stop: function stop() {
	        _stopped = true;
	        adjustWorkerPool(0);
	        if (_config.inputStream.type === "LiveStream") {
	            _inputCamera_access2['default'].release();
	            _inputStream.clearEventHandlers();
	        }
	    },
	    pause: function pause() {
	        _stopped = true;
	    },
	    onDetected: function onDetected(callback) {
	        _commonEvents2['default'].subscribe("detected", callback);
	    },
	    offDetected: function offDetected(callback) {
	        _commonEvents2['default'].unsubscribe("detected", callback);
	    },
	    onProcessed: function onProcessed(callback) {
	        _commonEvents2['default'].subscribe("processed", callback);
	    },
	    offProcessed: function offProcessed(callback) {
	        _commonEvents2['default'].unsubscribe("processed", callback);
	    },
	    setReaders: function setReaders(readers) {
	        _setReaders(readers);
	    },
	    registerResultCollector: function registerResultCollector(resultCollector) {
	        if (resultCollector && typeof resultCollector.addResult === 'function') {
	            _resultCollector = resultCollector;
	        }
	    },
	    canvas: _canvasContainer,
	    decodeSingle: function decodeSingle(config, resultCallback) {
	        config = merge({
	            inputStream: {
	                type: "ImageStream",
	                sequence: false,
	                size: 800,
	                src: config.src
	            },
	            numOfWorkers:  false ? 0 : 1,
	            locator: {
	                halfSample: false
	            }
	        }, config);
	        this.init(config, function () {
	            _commonEvents2['default'].once("processed", function (result) {
	                _stopped = true;
	                resultCallback.call(null, result);
	            }, true);
	            _start();
	        });
	    },
	    ImageWrapper: _commonImage_wrapper2['default'],
	    ImageDebug: _commonImage_debug2['default'],
	    ResultCollector: _analyticsResult_collector2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
	 * typedefs.js
	 * Normalizes browser-specific prefixes
	 */
	
	'use strict';
	
	if (typeof window !== 'undefined') {
	    window.requestAnimFrame = (function () {
	        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function ( /* function FrameRequestCallback */callback) {
	            window.setTimeout(callback, 1000 / 60);
	        };
	    })();
	
	    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
	}
	Math.imul = Math.imul || function (a, b) {
	    var ah = a >>> 16 & 0xffff,
	        al = a & 0xffff,
	        bh = b >>> 16 & 0xffff,
	        bl = b & 0xffff;
	    // the shift by 0 fixes the sign on the high part
	    // the final |0 converts the unsigned value into a signed value
	    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _subImage = __webpack_require__(4);
	
	var _subImage2 = _interopRequireDefault(_subImage);
	
	var _commonCv_utils = __webpack_require__(5);
	
	var _commonCv_utils2 = _interopRequireDefault(_commonCv_utils);
	
	var _commonArray_helper = __webpack_require__(8);
	
	var _commonArray_helper2 = _interopRequireDefault(_commonArray_helper);
	
	var _glMatrix = __webpack_require__(7);
	
	/**
	 * Represents a basic image combining the data and size.
	 * In addition, some methods for manipulation are contained.
	 * @param size {x,y} The size of the image in pixel
	 * @param data {Array} If given, a flat array containing the pixel data
	 * @param ArrayType {Type} If given, the desired DataType of the Array (may be typed/non-typed)
	 * @param initialize {Boolean} Indicating if the array should be initialized on creation.
	 * @returns {ImageWrapper}
	 */
	function ImageWrapper(size, data, ArrayType, initialize) {
	    if (!data) {
	        if (ArrayType) {
	            this.data = new ArrayType(size.x * size.y);
	            if (ArrayType === Array && initialize) {
	                _commonArray_helper2['default'].init(this.data, 0);
	            }
	        } else {
	            this.data = new Uint8Array(size.x * size.y);
	            if (Uint8Array === Array && initialize) {
	                _commonArray_helper2['default'].init(this.data, 0);
	            }
	        }
	    } else {
	        this.data = data;
	    }
	    this.size = size;
	}
	
	/**
	 * tests if a position is within the image with a given offset
	 * @param imgRef {x, y} The location to test
	 * @param border Number the padding value in pixel
	 * @returns {Boolean} true if location inside the image's border, false otherwise
	 * @see cvd/image.h
	 */
	ImageWrapper.prototype.inImageWithBorder = function (imgRef, border) {
	    return imgRef.x >= border && imgRef.y >= border && imgRef.x < this.size.x - border && imgRef.y < this.size.y - border;
	};
	
	/**
	 * Performs bilinear sampling
	 * @param inImg Image to extract sample from
	 * @param x the x-coordinate
	 * @param y the y-coordinate
	 * @returns the sampled value
	 * @see cvd/vision.h
	 */
	ImageWrapper.sample = function (inImg, x, y) {
	    var lx = Math.floor(x);
	    var ly = Math.floor(y);
	    var w = inImg.size.x;
	    var base = ly * inImg.size.x + lx;
	    var a = inImg.data[base + 0];
	    var b = inImg.data[base + 1];
	    var c = inImg.data[base + w];
	    var d = inImg.data[base + w + 1];
	    var e = a - b;
	    x -= lx;
	    y -= ly;
	
	    var result = Math.floor(x * (y * (e - c + d) - e) + y * (c - a) + a);
	    return result;
	};
	
	/**
	 * Initializes a given array. Sets each element to zero.
	 * @param array {Array} The array to initialize
	 */
	ImageWrapper.clearArray = function (array) {
	    var l = array.length;
	    while (l--) {
	        array[l] = 0;
	    }
	};
	
	/**
	 * Creates a {SubImage} from the current image ({this}).
	 * @param from {ImageRef} The position where to start the {SubImage} from. (top-left corner)
	 * @param size {ImageRef} The size of the resulting image
	 * @returns {SubImage} A shared part of the original image
	 */
	ImageWrapper.prototype.subImage = function (from, size) {
	    return new _subImage2['default'](from, size, this);
	};
	
	/**
	 * Creates an {ImageWrapper) and copies the needed underlying image-data area
	 * @param imageWrapper {ImageWrapper} The target {ImageWrapper} where the data should be copied
	 * @param from {ImageRef} The location where to copy from (top-left location)
	 */
	ImageWrapper.prototype.subImageAsCopy = function (imageWrapper, from) {
	    var sizeY = imageWrapper.size.y,
	        sizeX = imageWrapper.size.x;
	    var x, y;
	    for (x = 0; x < sizeX; x++) {
	        for (y = 0; y < sizeY; y++) {
	            imageWrapper.data[y * sizeX + x] = this.data[(from.y + y) * this.size.x + from.x + x];
	        }
	    }
	};
	
	ImageWrapper.prototype.copyTo = function (imageWrapper) {
	    var length = this.data.length,
	        srcData = this.data,
	        dstData = imageWrapper.data;
	
	    while (length--) {
	        dstData[length] = srcData[length];
	    }
	};
	
	/**
	 * Retrieves a given pixel position from the image
	 * @param x {Number} The x-position
	 * @param y {Number} The y-position
	 * @returns {Number} The grayscale value at the pixel-position
	 */
	ImageWrapper.prototype.get = function (x, y) {
	    return this.data[y * this.size.x + x];
	};
	
	/**
	 * Retrieves a given pixel position from the image
	 * @param x {Number} The x-position
	 * @param y {Number} The y-position
	 * @returns {Number} The grayscale value at the pixel-position
	 */
	ImageWrapper.prototype.getSafe = function (x, y) {
	    var i;
	
	    if (!this.indexMapping) {
	        this.indexMapping = {
	            x: [],
	            y: []
	        };
	        for (i = 0; i < this.size.x; i++) {
	            this.indexMapping.x[i] = i;
	            this.indexMapping.x[i + this.size.x] = i;
	        }
	        for (i = 0; i < this.size.y; i++) {
	            this.indexMapping.y[i] = i;
	            this.indexMapping.y[i + this.size.y] = i;
	        }
	    }
	    return this.data[this.indexMapping.y[y + this.size.y] * this.size.x + this.indexMapping.x[x + this.size.x]];
	};
	
	/**
	 * Sets a given pixel position in the image
	 * @param x {Number} The x-position
	 * @param y {Number} The y-position
	 * @param value {Number} The grayscale value to set
	 * @returns {ImageWrapper} The Image itself (for possible chaining)
	 */
	ImageWrapper.prototype.set = function (x, y, value) {
	    this.data[y * this.size.x + x] = value;
	    return this;
	};
	
	/**
	 * Sets the border of the image (1 pixel) to zero
	 */
	ImageWrapper.prototype.zeroBorder = function () {
	    var i,
	        width = this.size.x,
	        height = this.size.y,
	        data = this.data;
	    for (i = 0; i < width; i++) {
	        data[i] = data[(height - 1) * width + i] = 0;
	    }
	    for (i = 1; i < height - 1; i++) {
	        data[i * width] = data[i * width + (width - 1)] = 0;
	    }
	};
	
	/**
	 * Inverts a binary image in place
	 */
	ImageWrapper.prototype.invert = function () {
	    var data = this.data,
	        length = data.length;
	
	    while (length--) {
	        data[length] = data[length] ? 0 : 1;
	    }
	};
	
	ImageWrapper.prototype.convolve = function (kernel) {
	    var x,
	        y,
	        kx,
	        ky,
	        kSize = kernel.length / 2 | 0,
	        accu = 0;
	    for (y = 0; y < this.size.y; y++) {
	        for (x = 0; x < this.size.x; x++) {
	            accu = 0;
	            for (ky = -kSize; ky <= kSize; ky++) {
	                for (kx = -kSize; kx <= kSize; kx++) {
	                    accu += kernel[ky + kSize][kx + kSize] * this.getSafe(x + kx, y + ky);
	                }
	            }
	            this.data[y * this.size.x + x] = accu;
	        }
	    }
	};
	
	ImageWrapper.prototype.moments = function (labelcount) {
	    var data = this.data,
	        x,
	        y,
	        height = this.size.y,
	        width = this.size.x,
	        val,
	        ysq,
	        labelsum = [],
	        i,
	        label,
	        mu11,
	        mu02,
	        mu20,
	        x_,
	        y_,
	        tmp,
	        result = [],
	        PI = Math.PI,
	        PI_4 = PI / 4;
	
	    if (labelcount <= 0) {
	        return result;
	    }
	
	    for (i = 0; i < labelcount; i++) {
	        labelsum[i] = {
	            m00: 0,
	            m01: 0,
	            m10: 0,
	            m11: 0,
	            m02: 0,
	            m20: 0,
	            theta: 0,
	            rad: 0
	        };
	    }
	
	    for (y = 0; y < height; y++) {
	        ysq = y * y;
	        for (x = 0; x < width; x++) {
	            val = data[y * width + x];
	            if (val > 0) {
	                label = labelsum[val - 1];
	                label.m00 += 1;
	                label.m01 += y;
	                label.m10 += x;
	                label.m11 += x * y;
	                label.m02 += ysq;
	                label.m20 += x * x;
	            }
	        }
	    }
	
	    for (i = 0; i < labelcount; i++) {
	        label = labelsum[i];
	        if (!isNaN(label.m00) && label.m00 !== 0) {
	            x_ = label.m10 / label.m00;
	            y_ = label.m01 / label.m00;
	            mu11 = label.m11 / label.m00 - x_ * y_;
	            mu02 = label.m02 / label.m00 - y_ * y_;
	            mu20 = label.m20 / label.m00 - x_ * x_;
	            tmp = (mu02 - mu20) / (2 * mu11);
	            tmp = 0.5 * Math.atan(tmp) + (mu11 >= 0 ? PI_4 : -PI_4) + PI;
	            label.theta = (tmp * 180 / PI + 90) % 180 - 90;
	            if (label.theta < 0) {
	                label.theta += 180;
	            }
	            label.rad = tmp > PI ? tmp - PI : tmp;
	            label.vec = _glMatrix.vec2.clone([Math.cos(tmp), Math.sin(tmp)]);
	            result.push(label);
	        }
	    }
	
	    return result;
	};
	
	/**
	 * Displays the {ImageWrapper} in a given canvas
	 * @param canvas {Canvas} The canvas element to write to
	 * @param scale {Number} Scale which is applied to each pixel-value
	 */
	ImageWrapper.prototype.show = function (canvas, scale) {
	    var ctx, frame, data, current, pixel, x, y;
	
	    if (!scale) {
	        scale = 1.0;
	    }
	    ctx = canvas.getContext('2d');
	    canvas.width = this.size.x;
	    canvas.height = this.size.y;
	    frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
	    data = frame.data;
	    current = 0;
	    for (y = 0; y < this.size.y; y++) {
	        for (x = 0; x < this.size.x; x++) {
	            pixel = y * this.size.x + x;
	            current = this.get(x, y) * scale;
	            data[pixel * 4 + 0] = current;
	            data[pixel * 4 + 1] = current;
	            data[pixel * 4 + 2] = current;
	            data[pixel * 4 + 3] = 255;
	        }
	    }
	    //frame.data = data;
	    ctx.putImageData(frame, 0, 0);
	};
	
	/**
	 * Displays the {SubImage} in a given canvas
	 * @param canvas {Canvas} The canvas element to write to
	 * @param scale {Number} Scale which is applied to each pixel-value
	 */
	ImageWrapper.prototype.overlay = function (canvas, scale, from) {
	    if (!scale || scale < 0 || scale > 360) {
	        scale = 360;
	    }
	    var hsv = [0, 1, 1];
	    var rgb = [0, 0, 0];
	    var whiteRgb = [255, 255, 255];
	    var blackRgb = [0, 0, 0];
	    var result = [];
	    var ctx = canvas.getContext('2d');
	    var frame = ctx.getImageData(from.x, from.y, this.size.x, this.size.y);
	    var data = frame.data;
	    var length = this.data.length;
	    while (length--) {
	        hsv[0] = this.data[length] * scale;
	        result = hsv[0] <= 0 ? whiteRgb : hsv[0] >= 360 ? blackRgb : _commonCv_utils2['default'].hsv2rgb(hsv, rgb);
	        data[length * 4 + 0] = result[0];
	        data[length * 4 + 1] = result[1];
	        data[length * 4 + 2] = result[2];
	        data[length * 4 + 3] = 255;
	    }
	    ctx.putImageData(frame, from.x, from.y);
	};
	
	exports['default'] = ImageWrapper;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Construct representing a part of another {ImageWrapper}. Shares data
	 * between the parent and the child.
	 * @param from {ImageRef} The position where to start the {SubImage} from. (top-left corner)
	 * @param size {ImageRef} The size of the resulting image
	 * @param I {ImageWrapper} The {ImageWrapper} to share from
	 * @returns {SubImage} A shared part of the original image
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	function SubImage(from, size, I) {
	    if (!I) {
	        I = {
	            data: null,
	            size: size
	        };
	    }
	    this.data = I.data;
	    this.originalSize = I.size;
	    this.I = I;
	
	    this.from = from;
	    this.size = size;
	}
	
	/**
	 * Displays the {SubImage} in a given canvas
	 * @param canvas {Canvas} The canvas element to write to
	 * @param scale {Number} Scale which is applied to each pixel-value
	 */
	SubImage.prototype.show = function (canvas, scale) {
	    var ctx, frame, data, current, y, x, pixel;
	
	    if (!scale) {
	        scale = 1.0;
	    }
	    ctx = canvas.getContext('2d');
	    canvas.width = this.size.x;
	    canvas.height = this.size.y;
	    frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
	    data = frame.data;
	    current = 0;
	    for (y = 0; y < this.size.y; y++) {
	        for (x = 0; x < this.size.x; x++) {
	            pixel = y * this.size.x + x;
	            current = this.get(x, y) * scale;
	            data[pixel * 4 + 0] = current;
	            data[pixel * 4 + 1] = current;
	            data[pixel * 4 + 2] = current;
	            data[pixel * 4 + 3] = 255;
	        }
	    }
	    frame.data = data;
	    ctx.putImageData(frame, 0, 0);
	};
	
	/**
	 * Retrieves a given pixel position from the {SubImage}
	 * @param x {Number} The x-position
	 * @param y {Number} The y-position
	 * @returns {Number} The grayscale value at the pixel-position
	 */
	SubImage.prototype.get = function (x, y) {
	    return this.data[(this.from.y + y) * this.originalSize.x + this.from.x + x];
	};
	
	/**
	 * Updates the underlying data from a given {ImageWrapper}
	 * @param image {ImageWrapper} The updated image
	 */
	SubImage.prototype.updateData = function (image) {
	    this.originalSize = image.size;
	    this.data = image.data;
	};
	
	/**
	 * Updates the position of the shared area
	 * @param from {x,y} The new location
	 * @returns {SubImage} returns {this} for possible chaining
	 */
	SubImage.prototype.updateFrom = function (from) {
	    this.from = from;
	    return this;
	};
	
	exports['default'] = SubImage;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _cluster = __webpack_require__(6);
	
	var _cluster2 = _interopRequireDefault(_cluster);
	
	var _array_helper = __webpack_require__(8);
	
	var _array_helper2 = _interopRequireDefault(_array_helper);
	
	var _glMatrix = __webpack_require__(7);
	
	var CVUtils = {};
	
	/**
	 * @param x x-coordinate
	 * @param y y-coordinate
	 * @return ImageReference {x,y} Coordinate
	 */
	CVUtils.imageRef = function (x, y) {
	    var that = {
	        x: x,
	        y: y,
	        toVec2: function toVec2() {
	            return _glMatrix.vec2.clone([this.x, this.y]);
	        },
	        toVec3: function toVec3() {
	            return _glMatrix.vec3.clone([this.x, this.y, 1]);
	        },
	        round: function round() {
	            this.x = this.x > 0.0 ? Math.floor(this.x + 0.5) : Math.floor(this.x - 0.5);
	            this.y = this.y > 0.0 ? Math.floor(this.y + 0.5) : Math.floor(this.y - 0.5);
	            return this;
	        }
	    };
	    return that;
	};
	
	/**
	 * Computes an integral image of a given grayscale image.
	 * @param imageDataContainer {ImageDataContainer} the image to be integrated
	 */
	CVUtils.computeIntegralImage2 = function (imageWrapper, integralWrapper) {
	    var imageData = imageWrapper.data;
	    var width = imageWrapper.size.x;
	    var height = imageWrapper.size.y;
	    var integralImageData = integralWrapper.data;
	    var sum = 0,
	        posA = 0,
	        posB = 0,
	        posC = 0,
	        posD = 0,
	        x,
	        y;
	
	    // sum up first column
	    posB = width;
	    sum = 0;
	    for (y = 1; y < height; y++) {
	        sum += imageData[posA];
	        integralImageData[posB] += sum;
	        posA += width;
	        posB += width;
	    }
	
	    posA = 0;
	    posB = 1;
	    sum = 0;
	    for (x = 1; x < width; x++) {
	        sum += imageData[posA];
	        integralImageData[posB] += sum;
	        posA++;
	        posB++;
	    }
	
	    for (y = 1; y < height; y++) {
	        posA = y * width + 1;
	        posB = (y - 1) * width + 1;
	        posC = y * width;
	        posD = (y - 1) * width;
	        for (x = 1; x < width; x++) {
	            integralImageData[posA] += imageData[posA] + integralImageData[posB] + integralImageData[posC] - integralImageData[posD];
	            posA++;
	            posB++;
	            posC++;
	            posD++;
	        }
	    }
	};
	
	CVUtils.computeIntegralImage = function (imageWrapper, integralWrapper) {
	    var imageData = imageWrapper.data;
	    var width = imageWrapper.size.x;
	    var height = imageWrapper.size.y;
	    var integralImageData = integralWrapper.data;
	    var sum = 0;
	
	    // sum up first row
	    for (var i = 0; i < width; i++) {
	        sum += imageData[i];
	        integralImageData[i] = sum;
	    }
	
	    for (var v = 1; v < height; v++) {
	        sum = 0;
	        for (var u = 0; u < width; u++) {
	            sum += imageData[v * width + u];
	            integralImageData[v * width + u] = sum + integralImageData[(v - 1) * width + u];
	        }
	    }
	};
	
	CVUtils.thresholdImage = function (imageWrapper, threshold, targetWrapper) {
	    if (!targetWrapper) {
	        targetWrapper = imageWrapper;
	    }
	    var imageData = imageWrapper.data,
	        length = imageData.length,
	        targetData = targetWrapper.data;
	
	    while (length--) {
	        targetData[length] = imageData[length] < threshold ? 1 : 0;
	    }
	};
	
	CVUtils.computeHistogram = function (imageWrapper, bitsPerPixel) {
	    if (!bitsPerPixel) {
	        bitsPerPixel = 8;
	    }
	    var imageData = imageWrapper.data,
	        length = imageData.length,
	        bitShift = 8 - bitsPerPixel,
	        bucketCnt = 1 << bitsPerPixel,
	        hist = new Int32Array(bucketCnt);
	
	    while (length--) {
	        hist[imageData[length] >> bitShift]++;
	    }
	    return hist;
	};
	
	CVUtils.sharpenLine = function (line) {
	    var i,
	        length = line.length,
	        left = line[0],
	        center = line[1],
	        right;
	
	    for (i = 1; i < length - 1; i++) {
	        right = line[i + 1];
	        //  -1 4 -1 kernel
	        line[i - 1] = center * 2 - left - right & 255;
	        left = center;
	        center = right;
	    }
	    return line;
	};
	
	CVUtils.determineOtsuThreshold = function (imageWrapper, bitsPerPixel) {
	    if (!bitsPerPixel) {
	        bitsPerPixel = 8;
	    }
	    var hist,
	        threshold,
	        bitShift = 8 - bitsPerPixel;
	
	    function px(init, end) {
	        var sum = 0,
	            i;
	        for (i = init; i <= end; i++) {
	            sum += hist[i];
	        }
	        return sum;
	    }
	
	    function mx(init, end) {
	        var i,
	            sum = 0;
	
	        for (i = init; i <= end; i++) {
	            sum += i * hist[i];
	        }
	
	        return sum;
	    }
	
	    function determineThreshold() {
	        var vet = [0],
	            p1,
	            p2,
	            p12,
	            k,
	            m1,
	            m2,
	            m12,
	            max = (1 << bitsPerPixel) - 1;
	
	        hist = CVUtils.computeHistogram(imageWrapper, bitsPerPixel);
	        for (k = 1; k < max; k++) {
	            p1 = px(0, k);
	            p2 = px(k + 1, max);
	            p12 = p1 * p2;
	            if (p12 === 0) {
	                p12 = 1;
	            }
	            m1 = mx(0, k) * p2;
	            m2 = mx(k + 1, max) * p1;
	            m12 = m1 - m2;
	            vet[k] = m12 * m12 / p12;
	        }
	        return _array_helper2['default'].maxIndex(vet);
	    }
	
	    threshold = determineThreshold();
	    return threshold << bitShift;
	};
	
	CVUtils.otsuThreshold = function (imageWrapper, targetWrapper) {
	    var threshold = CVUtils.determineOtsuThreshold(imageWrapper);
	
	    CVUtils.thresholdImage(imageWrapper, threshold, targetWrapper);
	    return threshold;
	};
	
	// local thresholding
	CVUtils.computeBinaryImage = function (imageWrapper, integralWrapper, targetWrapper) {
	    CVUtils.computeIntegralImage(imageWrapper, integralWrapper);
	
	    if (!targetWrapper) {
	        targetWrapper = imageWrapper;
	    }
	    var imageData = imageWrapper.data;
	    var targetData = targetWrapper.data;
	    var width = imageWrapper.size.x;
	    var height = imageWrapper.size.y;
	    var integralImageData = integralWrapper.data;
	    var sum = 0,
	        v,
	        u,
	        kernel = 3,
	        A,
	        B,
	        C,
	        D,
	        avg,
	        size = (kernel * 2 + 1) * (kernel * 2 + 1);
	
	    // clear out top & bottom-border
	    for (v = 0; v <= kernel; v++) {
	        for (u = 0; u < width; u++) {
	            targetData[v * width + u] = 0;
	            targetData[(height - 1 - v) * width + u] = 0;
	        }
	    }
	
	    // clear out left & right border
	    for (v = kernel; v < height - kernel; v++) {
	        for (u = 0; u <= kernel; u++) {
	            targetData[v * width + u] = 0;
	            targetData[v * width + (width - 1 - u)] = 0;
	        }
	    }
	
	    for (v = kernel + 1; v < height - kernel - 1; v++) {
	        for (u = kernel + 1; u < width - kernel; u++) {
	            A = integralImageData[(v - kernel - 1) * width + (u - kernel - 1)];
	            B = integralImageData[(v - kernel - 1) * width + (u + kernel)];
	            C = integralImageData[(v + kernel) * width + (u - kernel - 1)];
	            D = integralImageData[(v + kernel) * width + (u + kernel)];
	            sum = D - C - B + A;
	            avg = sum / size;
	            targetData[v * width + u] = imageData[v * width + u] > avg + 5 ? 0 : 1;
	        }
	    }
	};
	
	CVUtils.cluster = function (points, threshold, property) {
	    var i,
	        k,
	        cluster,
	        point,
	        clusters = [];
	
	    if (!property) {
	        property = "rad";
	    }
	
	    function addToCluster(newPoint) {
	        var found = false;
	        for (k = 0; k < clusters.length; k++) {
	            cluster = clusters[k];
	            if (cluster.fits(newPoint)) {
	                cluster.add(newPoint);
	                found = true;
	            }
	        }
	        return found;
	    }
	
	    // iterate over each cloud
	    for (i = 0; i < points.length; i++) {
	        point = _cluster2['default'].createPoint(points[i], i, property);
	        if (!addToCluster(point)) {
	            clusters.push(_cluster2['default'].create(point, threshold));
	        }
	    }
	    return clusters;
	};
	
	CVUtils.Tracer = {
	    trace: function trace(points, vec) {
	        var iteration,
	            maxIterations = 10,
	            top = [],
	            result = [],
	            centerPos = 0,
	            currentPos = 0;
	
	        function trace(idx, forward) {
	            var from,
	                to,
	                toIdx,
	                predictedPos,
	                thresholdX = 1,
	                thresholdY = Math.abs(vec[1] / 10),
	                found = false;
	
	            function match(pos, predicted) {
	                if (pos.x > predicted.x - thresholdX && pos.x < predicted.x + thresholdX && pos.y > predicted.y - thresholdY && pos.y < predicted.y + thresholdY) {
	                    return true;
	                } else {
	                    return false;
	                }
	            }
	
	            // check if the next index is within the vec specifications
	            // if not, check as long as the threshold is met
	
	            from = points[idx];
	            if (forward) {
	                predictedPos = {
	                    x: from.x + vec[0],
	                    y: from.y + vec[1]
	                };
	            } else {
	                predictedPos = {
	                    x: from.x - vec[0],
	                    y: from.y - vec[1]
	                };
	            }
	
	            toIdx = forward ? idx + 1 : idx - 1;
	            to = points[toIdx];
	            while (to && (found = match(to, predictedPos)) !== true && Math.abs(to.y - from.y) < vec[1]) {
	                toIdx = forward ? toIdx + 1 : toIdx - 1;
	                to = points[toIdx];
	            }
	
	            return found ? toIdx : null;
	        }
	
	        for (iteration = 0; iteration < maxIterations; iteration++) {
	            // randomly select point to start with
	            centerPos = Math.floor(Math.random() * points.length);
	
	            // trace forward
	            top = [];
	            currentPos = centerPos;
	            top.push(points[currentPos]);
	            while ((currentPos = trace(currentPos, true)) !== null) {
	                top.push(points[currentPos]);
	            }
	            if (centerPos > 0) {
	                currentPos = centerPos;
	                while ((currentPos = trace(currentPos, false)) !== null) {
	                    top.push(points[currentPos]);
	                }
	            }
	
	            if (top.length > result.length) {
	                result = top;
	            }
	        }
	        return result;
	    }
	};
	
	CVUtils.DILATE = 1;
	CVUtils.ERODE = 2;
	
	CVUtils.dilate = function (inImageWrapper, outImageWrapper) {
	    var v,
	        u,
	        inImageData = inImageWrapper.data,
	        outImageData = outImageWrapper.data,
	        height = inImageWrapper.size.y,
	        width = inImageWrapper.size.x,
	        sum,
	        yStart1,
	        yStart2,
	        xStart1,
	        xStart2;
	
	    for (v = 1; v < height - 1; v++) {
	        for (u = 1; u < width - 1; u++) {
	            yStart1 = v - 1;
	            yStart2 = v + 1;
	            xStart1 = u - 1;
	            xStart2 = u + 1;
	            sum = inImageData[yStart1 * width + xStart1] + inImageData[yStart1 * width + xStart2] + inImageData[v * width + u] + inImageData[yStart2 * width + xStart1] + inImageData[yStart2 * width + xStart2];
	            outImageData[v * width + u] = sum > 0 ? 1 : 0;
	        }
	    }
	};
	
	CVUtils.erode = function (inImageWrapper, outImageWrapper) {
	    var v,
	        u,
	        inImageData = inImageWrapper.data,
	        outImageData = outImageWrapper.data,
	        height = inImageWrapper.size.y,
	        width = inImageWrapper.size.x,
	        sum,
	        yStart1,
	        yStart2,
	        xStart1,
	        xStart2;
	
	    for (v = 1; v < height - 1; v++) {
	        for (u = 1; u < width - 1; u++) {
	            yStart1 = v - 1;
	            yStart2 = v + 1;
	            xStart1 = u - 1;
	            xStart2 = u + 1;
	            sum = inImageData[yStart1 * width + xStart1] + inImageData[yStart1 * width + xStart2] + inImageData[v * width + u] + inImageData[yStart2 * width + xStart1] + inImageData[yStart2 * width + xStart2];
	            outImageData[v * width + u] = sum === 5 ? 1 : 0;
	        }
	    }
	};
	
	CVUtils.subtract = function (aImageWrapper, bImageWrapper, resultImageWrapper) {
	    if (!resultImageWrapper) {
	        resultImageWrapper = aImageWrapper;
	    }
	    var length = aImageWrapper.data.length,
	        aImageData = aImageWrapper.data,
	        bImageData = bImageWrapper.data,
	        cImageData = resultImageWrapper.data;
	
	    while (length--) {
	        cImageData[length] = aImageData[length] - bImageData[length];
	    }
	};
	
	CVUtils.bitwiseOr = function (aImageWrapper, bImageWrapper, resultImageWrapper) {
	    if (!resultImageWrapper) {
	        resultImageWrapper = aImageWrapper;
	    }
	    var length = aImageWrapper.data.length,
	        aImageData = aImageWrapper.data,
	        bImageData = bImageWrapper.data,
	        cImageData = resultImageWrapper.data;
	
	    while (length--) {
	        cImageData[length] = aImageData[length] || bImageData[length];
	    }
	};
	
	CVUtils.countNonZero = function (imageWrapper) {
	    var length = imageWrapper.data.length,
	        data = imageWrapper.data,
	        sum = 0;
	
	    while (length--) {
	        sum += data[length];
	    }
	    return sum;
	};
	
	CVUtils.topGeneric = function (list, top, scoreFunc) {
	    var i,
	        minIdx = 0,
	        min = 0,
	        queue = [],
	        score,
	        hit,
	        pos;
	
	    for (i = 0; i < top; i++) {
	        queue[i] = {
	            score: 0,
	            item: null
	        };
	    }
	
	    for (i = 0; i < list.length; i++) {
	        score = scoreFunc.apply(this, [list[i]]);
	        if (score > min) {
	            hit = queue[minIdx];
	            hit.score = score;
	            hit.item = list[i];
	            min = Number.MAX_VALUE;
	            for (pos = 0; pos < top; pos++) {
	                if (queue[pos].score < min) {
	                    min = queue[pos].score;
	                    minIdx = pos;
	                }
	            }
	        }
	    }
	
	    return queue;
	};
	
	CVUtils.grayArrayFromImage = function (htmlImage, offsetX, ctx, array) {
	    ctx.drawImage(htmlImage, offsetX, 0, htmlImage.width, htmlImage.height);
	    var ctxData = ctx.getImageData(offsetX, 0, htmlImage.width, htmlImage.height).data;
	    CVUtils.computeGray(ctxData, array);
	};
	
	CVUtils.grayArrayFromContext = function (ctx, size, offset, array) {
	    var ctxData = ctx.getImageData(offset.x, offset.y, size.x, size.y).data;
	    CVUtils.computeGray(ctxData, array);
	};
	
	CVUtils.grayAndHalfSampleFromCanvasData = function (canvasData, size, outArray) {
	    var topRowIdx = 0;
	    var bottomRowIdx = size.x;
	    var endIdx = Math.floor(canvasData.length / 4);
	    var outWidth = size.x / 2;
	    var outImgIdx = 0;
	    var inWidth = size.x;
	    var i;
	
	    while (bottomRowIdx < endIdx) {
	        for (i = 0; i < outWidth; i++) {
	            outArray[outImgIdx] = Math.floor((0.299 * canvasData[topRowIdx * 4 + 0] + 0.587 * canvasData[topRowIdx * 4 + 1] + 0.114 * canvasData[topRowIdx * 4 + 2] + (0.299 * canvasData[(topRowIdx + 1) * 4 + 0] + 0.587 * canvasData[(topRowIdx + 1) * 4 + 1] + 0.114 * canvasData[(topRowIdx + 1) * 4 + 2]) + (0.299 * canvasData[bottomRowIdx * 4 + 0] + 0.587 * canvasData[bottomRowIdx * 4 + 1] + 0.114 * canvasData[bottomRowIdx * 4 + 2]) + (0.299 * canvasData[(bottomRowIdx + 1) * 4 + 0] + 0.587 * canvasData[(bottomRowIdx + 1) * 4 + 1] + 0.114 * canvasData[(bottomRowIdx + 1) * 4 + 2])) / 4);
	            outImgIdx++;
	            topRowIdx = topRowIdx + 2;
	            bottomRowIdx = bottomRowIdx + 2;
	        }
	        topRowIdx = topRowIdx + inWidth;
	        bottomRowIdx = bottomRowIdx + inWidth;
	    }
	};
	
	CVUtils.computeGray = function (imageData, outArray, config) {
	    var l = imageData.length / 4 | 0,
	        i,
	        singleChannel = config && config.singleChannel === true;
	
	    if (singleChannel) {
	        for (i = 0; i < l; i++) {
	            outArray[i] = imageData[i * 4 + 0];
	        }
	    } else {
	        for (i = 0; i < l; i++) {
	            outArray[i] = Math.floor(0.299 * imageData[i * 4 + 0] + 0.587 * imageData[i * 4 + 1] + 0.114 * imageData[i * 4 + 2]);
	        }
	    }
	};
	
	CVUtils.loadImageArray = function (src, callback, canvas) {
	    if (!canvas) {
	        canvas = document.createElement('canvas');
	    }
	    var img = new Image();
	    img.callback = callback;
	    img.onload = function () {
	        canvas.width = this.width;
	        canvas.height = this.height;
	        var ctx = canvas.getContext('2d');
	        ctx.drawImage(this, 0, 0);
	        var array = new Uint8Array(this.width * this.height);
	        ctx.drawImage(this, 0, 0);
	        var data = ctx.getImageData(0, 0, this.width, this.height).data;
	        CVUtils.computeGray(data, array);
	        this.callback(array, {
	            x: this.width,
	            y: this.height
	        }, this);
	    };
	    img.src = src;
	};
	
	/**
	 * @param inImg {ImageWrapper} input image to be sampled
	 * @param outImg {ImageWrapper} to be stored in
	 */
	CVUtils.halfSample = function (inImgWrapper, outImgWrapper) {
	    var inImg = inImgWrapper.data;
	    var inWidth = inImgWrapper.size.x;
	    var outImg = outImgWrapper.data;
	    var topRowIdx = 0;
	    var bottomRowIdx = inWidth;
	    var endIdx = inImg.length;
	    var outWidth = inWidth / 2;
	    var outImgIdx = 0;
	    while (bottomRowIdx < endIdx) {
	        for (var i = 0; i < outWidth; i++) {
	            outImg[outImgIdx] = Math.floor((inImg[topRowIdx] + inImg[topRowIdx + 1] + inImg[bottomRowIdx] + inImg[bottomRowIdx + 1]) / 4);
	            outImgIdx++;
	            topRowIdx = topRowIdx + 2;
	            bottomRowIdx = bottomRowIdx + 2;
	        }
	        topRowIdx = topRowIdx + inWidth;
	        bottomRowIdx = bottomRowIdx + inWidth;
	    }
	};
	
	CVUtils.hsv2rgb = function (hsv, rgb) {
	    var h = hsv[0],
	        s = hsv[1],
	        v = hsv[2],
	        c = v * s,
	        x = c * (1 - Math.abs(h / 60 % 2 - 1)),
	        m = v - c,
	        r = 0,
	        g = 0,
	        b = 0;
	
	    rgb = rgb || [0, 0, 0];
	
	    if (h < 60) {
	        r = c;
	        g = x;
	    } else if (h < 120) {
	        r = x;
	        g = c;
	    } else if (h < 180) {
	        g = c;
	        b = x;
	    } else if (h < 240) {
	        g = x;
	        b = c;
	    } else if (h < 300) {
	        r = x;
	        b = c;
	    } else if (h < 360) {
	        r = c;
	        b = x;
	    }
	    rgb[0] = (r + m) * 255 | 0;
	    rgb[1] = (g + m) * 255 | 0;
	    rgb[2] = (b + m) * 255 | 0;
	    return rgb;
	};
	
	CVUtils._computeDivisors = function (n) {
	    var largeDivisors = [],
	        divisors = [],
	        i;
	
	    for (i = 1; i < Math.sqrt(n) + 1; i++) {
	        if (n % i === 0) {
	            divisors.push(i);
	            if (i !== n / i) {
	                largeDivisors.unshift(Math.floor(n / i));
	            }
	        }
	    }
	    return divisors.concat(largeDivisors);
	};
	
	CVUtils._computeIntersection = function (arr1, arr2) {
	    var i = 0,
	        j = 0,
	        result = [];
	
	    while (i < arr1.length && j < arr2.length) {
	        if (arr1[i] === arr2[j]) {
	            result.push(arr1[i]);
	            i++;
	            j++;
	        } else if (arr1[i] > arr2[j]) {
	            j++;
	        } else {
	            i++;
	        }
	    }
	    return result;
	};
	
	CVUtils.calculatePatchSize = function (patchSize, imgSize) {
	    var divisorsX = this._computeDivisors(imgSize.x),
	        divisorsY = this._computeDivisors(imgSize.y),
	        wideSide = Math.max(imgSize.x, imgSize.y),
	        common = this._computeIntersection(divisorsX, divisorsY),
	        nrOfPatchesList = [8, 10, 15, 20, 32, 60, 80],
	        nrOfPatchesMap = {
	        "x-small": 5,
	        "small": 4,
	        "medium": 3,
	        "large": 2,
	        "x-large": 1
	    },
	        nrOfPatchesIdx = nrOfPatchesMap[patchSize] || nrOfPatchesMap.medium,
	        nrOfPatches = nrOfPatchesList[nrOfPatchesIdx],
	        desiredPatchSize = Math.floor(wideSide / nrOfPatches),
	        optimalPatchSize;
	
	    function findPatchSizeForDivisors(divisors) {
	        var i = 0,
	            found = divisors[Math.floor(divisors.length / 2)];
	
	        while (i < divisors.length - 1 && divisors[i] < desiredPatchSize) {
	            i++;
	        }
	        if (i > 0) {
	            if (Math.abs(divisors[i] - desiredPatchSize) > Math.abs(divisors[i - 1] - desiredPatchSize)) {
	                found = divisors[i - 1];
	            } else {
	                found = divisors[i];
	            }
	        }
	        if (desiredPatchSize / found < nrOfPatchesList[nrOfPatchesIdx + 1] / nrOfPatchesList[nrOfPatchesIdx] && desiredPatchSize / found > nrOfPatchesList[nrOfPatchesIdx - 1] / nrOfPatchesList[nrOfPatchesIdx]) {
	            return { x: found, y: found };
	        }
	        return null;
	    }
	
	    optimalPatchSize = findPatchSizeForDivisors(common);
	    if (!optimalPatchSize) {
	        optimalPatchSize = findPatchSizeForDivisors(this._computeDivisors(wideSide));
	        if (!optimalPatchSize) {
	            optimalPatchSize = findPatchSizeForDivisors(this._computeDivisors(desiredPatchSize * nrOfPatches));
	        }
	    }
	    return optimalPatchSize;
	};
	
	CVUtils._parseCSSDimensionValues = function (value) {
	    var dimension = {
	        value: parseFloat(value),
	        unit: value.indexOf("%") === value.length - 1 ? "%" : "%"
	    };
	
	    return dimension;
	};
	
	CVUtils._dimensionsConverters = {
	    top: function top(dimension, context) {
	        if (dimension.unit === "%") {
	            return Math.floor(context.height * (dimension.value / 100));
	        }
	    },
	    right: function right(dimension, context) {
	        if (dimension.unit === "%") {
	            return Math.floor(context.width - context.width * (dimension.value / 100));
	        }
	    },
	    bottom: function bottom(dimension, context) {
	        if (dimension.unit === "%") {
	            return Math.floor(context.height - context.height * (dimension.value / 100));
	        }
	    },
	    left: function left(dimension, context) {
	        if (dimension.unit === "%") {
	            return Math.floor(context.width * (dimension.value / 100));
	        }
	    }
	};
	
	CVUtils.computeImageArea = function (inputWidth, inputHeight, area) {
	    var context = { width: inputWidth, height: inputHeight };
	
	    var parsedArea = Object.keys(area).reduce(function (result, key) {
	        var value = area[key],
	            parsed = CVUtils._parseCSSDimensionValues(value),
	            calculated = CVUtils._dimensionsConverters[key](parsed, context);
	
	        result[key] = calculated;
	        return result;
	    }, {});
	
	    return {
	        sx: parsedArea.left,
	        sy: parsedArea.top,
	        sw: parsedArea.right - parsedArea.left,
	        sh: parsedArea.bottom - parsedArea.top
	    };
	};
	
	exports['default'] = CVUtils;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _glMatrix = __webpack_require__(7);
	
	/**
	 * Creates a cluster for grouping similar orientations of datapoints
	 */
	exports['default'] = {
	    create: function create(point, threshold) {
	        var points = [],
	            center = {
	            rad: 0,
	            vec: _glMatrix.vec2.clone([0, 0])
	        },
	            pointMap = {};
	
	        function init() {
	            _add(point);
	            updateCenter();
	        }
	
	        function _add(pointToAdd) {
	            pointMap[pointToAdd.id] = pointToAdd;
	            points.push(pointToAdd);
	        }
	
	        function updateCenter() {
	            var i,
	                sum = 0;
	            for (i = 0; i < points.length; i++) {
	                sum += points[i].rad;
	            }
	            center.rad = sum / points.length;
	            center.vec = _glMatrix.vec2.clone([Math.cos(center.rad), Math.sin(center.rad)]);
	        }
	
	        init();
	
	        return {
	            add: function add(pointToAdd) {
	                if (!pointMap[pointToAdd.id]) {
	                    _add(pointToAdd);
	                    updateCenter();
	                }
	            },
	            fits: function fits(otherPoint) {
	                // check cosine similarity to center-angle
	                var similarity = Math.abs(_glMatrix.vec2.dot(otherPoint.point.vec, center.vec));
	                if (similarity > threshold) {
	                    return true;
	                }
	                return false;
	            },
	            getPoints: function getPoints() {
	                return points;
	            },
	            getCenter: function getCenter() {
	                return center;
	            }
	        };
	    },
	    createPoint: function createPoint(newPoint, id, property) {
	        return {
	            rad: newPoint[property],
	            point: newPoint,
	            id: id
	        };
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("gl-matrix");

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    init: function init(arr, val) {
	        var l = arr.length;
	        while (l--) {
	            arr[l] = val;
	        }
	    },
	
	    /**
	     * Shuffles the content of an array
	     * @return {Array} the array itself shuffled
	     */
	    shuffle: function shuffle(arr) {
	        var i = arr.length - 1,
	            j,
	            x;
	        for (i; i >= 0; i--) {
	            j = Math.floor(Math.random() * i);
	            x = arr[i];
	            arr[i] = arr[j];
	            arr[j] = x;
	        }
	        return arr;
	    },
	
	    toPointList: function toPointList(arr) {
	        var i,
	            j,
	            row = [],
	            rows = [];
	        for (i = 0; i < arr.length; i++) {
	            row = [];
	            for (j = 0; j < arr[i].length; j++) {
	                row[j] = arr[i][j];
	            }
	            rows[i] = "[" + row.join(",") + "]";
	        }
	        return "[" + rows.join(",\r\n") + "]";
	    },
	
	    /**
	     * returns the elements which's score is bigger than the threshold
	     * @return {Array} the reduced array
	     */
	    threshold: function threshold(arr, _threshold, scoreFunc) {
	        var i,
	            queue = [];
	        for (i = 0; i < arr.length; i++) {
	            if (scoreFunc.apply(arr, [arr[i]]) >= _threshold) {
	                queue.push(arr[i]);
	            }
	        }
	        return queue;
	    },
	
	    maxIndex: function maxIndex(arr) {
	        var i,
	            max = 0;
	        for (i = 0; i < arr.length; i++) {
	            if (arr[i] > arr[max]) {
	                max = i;
	            }
	        }
	        return max;
	    },
	
	    max: function max(arr) {
	        var i,
	            max = 0;
	        for (i = 0; i < arr.length; i++) {
	            if (arr[i] > max) {
	                max = arr[i];
	            }
	        }
	        return max;
	    },
	
	    sum: function sum(arr) {
	        var length = arr.length,
	            sum = 0;
	
	        while (length--) {
	            sum += arr[length];
	        }
	        return sum;
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonImage_wrapper = __webpack_require__(3);
	
	var _commonImage_wrapper2 = _interopRequireDefault(_commonImage_wrapper);
	
	var _commonCv_utils = __webpack_require__(5);
	
	var _commonCv_utils2 = _interopRequireDefault(_commonCv_utils);
	
	var _commonArray_helper = __webpack_require__(8);
	
	var _commonArray_helper2 = _interopRequireDefault(_commonArray_helper);
	
	var _commonImage_debug = __webpack_require__(10);
	
	var _commonImage_debug2 = _interopRequireDefault(_commonImage_debug);
	
	var _rasterizer = __webpack_require__(11);
	
	var _rasterizer2 = _interopRequireDefault(_rasterizer);
	
	var _tracer = __webpack_require__(12);
	
	var _tracer2 = _interopRequireDefault(_tracer);
	
	var _skeletonizer2 = __webpack_require__(13);
	
	var _skeletonizer3 = _interopRequireDefault(_skeletonizer2);
	
	var _glMatrix = __webpack_require__(7);
	
	var _config,
	    _currentImageWrapper,
	    _skelImageWrapper,
	    _subImageWrapper,
	    _labelImageWrapper,
	    _patchGrid,
	    _patchLabelGrid,
	    _imageToPatchGrid,
	    _binaryImageWrapper,
	    _patchSize,
	    _canvasContainer = {
	    ctx: {
	        binary: null
	    },
	    dom: {
	        binary: null
	    }
	},
	    _numPatches = { x: 0, y: 0 },
	    _inputImageWrapper,
	    _skeletonizer;
	
	function initBuffers() {
	    var skeletonImageData;
	
	    if (_config.halfSample) {
	        _currentImageWrapper = new _commonImage_wrapper2['default']({
	            x: _inputImageWrapper.size.x / 2 | 0,
	            y: _inputImageWrapper.size.y / 2 | 0
	        });
	    } else {
	        _currentImageWrapper = _inputImageWrapper;
	    }
	
	    _patchSize = _commonCv_utils2['default'].calculatePatchSize(_config.patchSize, _currentImageWrapper.size);
	
	    _numPatches.x = _currentImageWrapper.size.x / _patchSize.x | 0;
	    _numPatches.y = _currentImageWrapper.size.y / _patchSize.y | 0;
	
	    _binaryImageWrapper = new _commonImage_wrapper2['default'](_currentImageWrapper.size, undefined, Uint8Array, false);
	
	    _labelImageWrapper = new _commonImage_wrapper2['default'](_patchSize, undefined, Array, true);
	
	    skeletonImageData = new ArrayBuffer(64 * 1024);
	    _subImageWrapper = new _commonImage_wrapper2['default'](_patchSize, new Uint8Array(skeletonImageData, 0, _patchSize.x * _patchSize.y));
	    _skelImageWrapper = new _commonImage_wrapper2['default'](_patchSize, new Uint8Array(skeletonImageData, _patchSize.x * _patchSize.y * 3, _patchSize.x * _patchSize.y), undefined, true);
	    _skeletonizer = (0, _skeletonizer3['default'])(typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : global, {
	        size: _patchSize.x
	    }, skeletonImageData);
	
	    _imageToPatchGrid = new _commonImage_wrapper2['default']({
	        x: _currentImageWrapper.size.x / _subImageWrapper.size.x | 0,
	        y: _currentImageWrapper.size.y / _subImageWrapper.size.y | 0
	    }, undefined, Array, true);
	    _patchGrid = new _commonImage_wrapper2['default'](_imageToPatchGrid.size, undefined, undefined, true);
	    _patchLabelGrid = new _commonImage_wrapper2['default'](_imageToPatchGrid.size, undefined, Int32Array, true);
	}
	
	function initCanvas() {
	    if (_config.useWorker || typeof document === 'undefined') {
	        return;
	    }
	    _canvasContainer.dom.binary = document.createElement("canvas");
	    _canvasContainer.dom.binary.className = "binaryBuffer";
	    if (false) {
	        document.querySelector("#debug").appendChild(_canvasContainer.dom.binary);
	    }
	    _canvasContainer.ctx.binary = _canvasContainer.dom.binary.getContext("2d");
	    _canvasContainer.dom.binary.width = _binaryImageWrapper.size.x;
	    _canvasContainer.dom.binary.height = _binaryImageWrapper.size.y;
	}
	
	/**
	 * Creates a bounding box which encloses all the given patches
	 * @returns {Array} The minimal bounding box
	 */
	function boxFromPatches(patches) {
	    var overAvg,
	        i,
	        j,
	        patch,
	        transMat,
	        minx = _binaryImageWrapper.size.x,
	        miny = _binaryImageWrapper.size.y,
	        maxx = -_binaryImageWrapper.size.x,
	        maxy = -_binaryImageWrapper.size.y,
	        box,
	        scale;
	
	    // draw all patches which are to be taken into consideration
	    overAvg = 0;
	    for (i = 0; i < patches.length; i++) {
	        patch = patches[i];
	        overAvg += patch.rad;
	        if (false) {
	            _commonImage_debug2['default'].drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, { color: "red" });
	        }
	    }
	
	    overAvg /= patches.length;
	    overAvg = (overAvg * 180 / Math.PI + 90) % 180 - 90;
	    if (overAvg < 0) {
	        overAvg += 180;
	    }
	
	    overAvg = (180 - overAvg) * Math.PI / 180;
	    transMat = _glMatrix.mat2.clone([Math.cos(overAvg), Math.sin(overAvg), -Math.sin(overAvg), Math.cos(overAvg)]);
	
	    // iterate over patches and rotate by angle
	    for (i = 0; i < patches.length; i++) {
	        patch = patches[i];
	        for (j = 0; j < 4; j++) {
	            _glMatrix.vec2.transformMat2(patch.box[j], patch.box[j], transMat);
	        }
	
	        if (false) {
	            _commonImage_debug2['default'].drawPath(patch.box, { x: 0, y: 1 }, _canvasContainer.ctx.binary, { color: '#99ff00', lineWidth: 2 });
	        }
	    }
	
	    // find bounding box
	    for (i = 0; i < patches.length; i++) {
	        patch = patches[i];
	        for (j = 0; j < 4; j++) {
	            if (patch.box[j][0] < minx) {
	                minx = patch.box[j][0];
	            }
	            if (patch.box[j][0] > maxx) {
	                maxx = patch.box[j][0];
	            }
	            if (patch.box[j][1] < miny) {
	                miny = patch.box[j][1];
	            }
	            if (patch.box[j][1] > maxy) {
	                maxy = patch.box[j][1];
	            }
	        }
	    }
	
	    box = [[minx, miny], [maxx, miny], [maxx, maxy], [minx, maxy]];
	
	    if (false) {
	        _commonImage_debug2['default'].drawPath(box, { x: 0, y: 1 }, _canvasContainer.ctx.binary, { color: '#ff0000', lineWidth: 2 });
	    }
	
	    scale = _config.halfSample ? 2 : 1;
	    // reverse rotation;
	    transMat = _glMatrix.mat2.invert(transMat, transMat);
	    for (j = 0; j < 4; j++) {
	        _glMatrix.vec2.transformMat2(box[j], box[j], transMat);
	    }
	
	    if (false) {
	        _commonImage_debug2['default'].drawPath(box, { x: 0, y: 1 }, _canvasContainer.ctx.binary, { color: '#ff0000', lineWidth: 2 });
	    }
	
	    for (j = 0; j < 4; j++) {
	        _glMatrix.vec2.scale(box[j], box[j], scale);
	    }
	
	    return box;
	}
	
	/**
	 * Creates a binary image of the current image
	 */
	function binarizeImage() {
	    _commonCv_utils2['default'].otsuThreshold(_currentImageWrapper, _binaryImageWrapper);
	    _binaryImageWrapper.zeroBorder();
	    if (_config.showCanvas) {
	        _binaryImageWrapper.show(_canvasContainer.dom.binary, 255);
	    }
	}
	
	/**
	 * Iterate over the entire image
	 * extract patches
	 */
	function findPatches() {
	    var i,
	        j,
	        x,
	        y,
	        moments,
	        patchesFound = [],
	        rasterizer,
	        rasterResult,
	        patch;
	    for (i = 0; i < _numPatches.x; i++) {
	        for (j = 0; j < _numPatches.y; j++) {
	            x = _subImageWrapper.size.x * i;
	            y = _subImageWrapper.size.y * j;
	
	            // seperate parts
	            skeletonize(x, y);
	
	            // Rasterize, find individual bars
	            _skelImageWrapper.zeroBorder();
	            _commonArray_helper2['default'].init(_labelImageWrapper.data, 0);
	            rasterizer = _rasterizer2['default'].create(_skelImageWrapper, _labelImageWrapper);
	            rasterResult = rasterizer.rasterize(0);
	
	            if (false) {
	                _labelImageWrapper.overlay(_canvasContainer.dom.binary, Math.floor(360 / rasterResult.count), { x: x, y: y });
	            }
	
	            // calculate moments from the skeletonized patch
	            moments = _labelImageWrapper.moments(rasterResult.count);
	
	            // extract eligible patches
	            patchesFound = patchesFound.concat(describePatch(moments, [i, j], x, y));
	        }
	    }
	
	    if (false) {
	        for (i = 0; i < patchesFound.length; i++) {
	            patch = patchesFound[i];
	            _commonImage_debug2['default'].drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, { color: "#99ff00", lineWidth: 2 });
	        }
	    }
	
	    return patchesFound;
	}
	
	/**
	 * Finds those connected areas which contain at least 6 patches
	 * and returns them ordered DESC by the number of contained patches
	 * @param {Number} maxLabel
	 */
	function findBiggestConnectedAreas(maxLabel) {
	    var i,
	        sum,
	        labelHist = [],
	        topLabels = [];
	
	    for (i = 0; i < maxLabel; i++) {
	        labelHist.push(0);
	    }
	    sum = _patchLabelGrid.data.length;
	    while (sum--) {
	        if (_patchLabelGrid.data[sum] > 0) {
	            labelHist[_patchLabelGrid.data[sum] - 1]++;
	        }
	    }
	
	    labelHist = labelHist.map(function (val, idx) {
	        return {
	            val: val,
	            label: idx + 1
	        };
	    });
	
	    labelHist.sort(function (a, b) {
	        return b.val - a.val;
	    });
	
	    // extract top areas with at least 6 patches present
	    topLabels = labelHist.filter(function (el) {
	        return el.val >= 5;
	    });
	
	    return topLabels;
	}
	
	/**
	 *
	 */
	function findBoxes(topLabels, maxLabel) {
	    var i,
	        j,
	        sum,
	        patches = [],
	        patch,
	        box,
	        boxes = [],
	        hsv = [0, 1, 1],
	        rgb = [0, 0, 0];
	
	    for (i = 0; i < topLabels.length; i++) {
	        sum = _patchLabelGrid.data.length;
	        patches.length = 0;
	        while (sum--) {
	            if (_patchLabelGrid.data[sum] === topLabels[i].label) {
	                patch = _imageToPatchGrid.data[sum];
	                patches.push(patch);
	            }
	        }
	        box = boxFromPatches(patches);
	        if (box) {
	            boxes.push(box);
	
	            // draw patch-labels if requested
	            if (false) {
	                for (j = 0; j < patches.length; j++) {
	                    patch = patches[j];
	                    hsv[0] = topLabels[i].label / (maxLabel + 1) * 360;
	                    _commonCv_utils2['default'].hsv2rgb(hsv, rgb);
	                    _commonImage_debug2['default'].drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, { color: "rgb(" + rgb.join(",") + ")", lineWidth: 2 });
	                }
	            }
	        }
	    }
	    return boxes;
	}
	
	/**
	 * Find similar moments (via cluster)
	 * @param {Object} moments
	 */
	function similarMoments(moments) {
	    var clusters = _commonCv_utils2['default'].cluster(moments, 0.90);
	    var topCluster = _commonCv_utils2['default'].topGeneric(clusters, 1, function (e) {
	        return e.getPoints().length;
	    });
	    var points = [],
	        result = [];
	    if (topCluster.length === 1) {
	        points = topCluster[0].item.getPoints();
	        for (var i = 0; i < points.length; i++) {
	            result.push(points[i].point);
	        }
	    }
	    return result;
	}
	
	function skeletonize(x, y) {
	    _binaryImageWrapper.subImageAsCopy(_subImageWrapper, _commonCv_utils2['default'].imageRef(x, y));
	    _skeletonizer.skeletonize();
	
	    // Show skeleton if requested
	    if (false) {
	        _skelImageWrapper.overlay(_canvasContainer.dom.binary, 360, _commonCv_utils2['default'].imageRef(x, y));
	    }
	}
	
	/**
	 * Extracts and describes those patches which seem to contain a barcode pattern
	 * @param {Array} moments
	 * @param {Object} patchPos,
	 * @param {Number} x
	 * @param {Number} y
	 * @returns {Array} list of patches
	 */
	function describePatch(moments, patchPos, x, y) {
	    var k,
	        avg,
	        eligibleMoments = [],
	        matchingMoments,
	        patch,
	        patchesFound = [],
	        minComponentWeight = Math.ceil(_patchSize.x / 3);
	
	    if (moments.length >= 2) {
	        // only collect moments which's area covers at least minComponentWeight pixels.
	        for (k = 0; k < moments.length; k++) {
	            if (moments[k].m00 > minComponentWeight) {
	                eligibleMoments.push(moments[k]);
	            }
	        }
	
	        // if at least 2 moments are found which have at least minComponentWeights covered
	        if (eligibleMoments.length >= 2) {
	            matchingMoments = similarMoments(eligibleMoments);
	            avg = 0;
	            // determine the similarity of the moments
	            for (k = 0; k < matchingMoments.length; k++) {
	                avg += matchingMoments[k].rad;
	            }
	
	            // Only two of the moments are allowed not to fit into the equation
	            // add the patch to the set
	            if (matchingMoments.length > 1 && matchingMoments.length >= eligibleMoments.length / 4 * 3 && matchingMoments.length > moments.length / 4) {
	                avg /= matchingMoments.length;
	                patch = {
	                    index: patchPos[1] * _numPatches.x + patchPos[0],
	                    pos: {
	                        x: x,
	                        y: y
	                    },
	                    box: [_glMatrix.vec2.clone([x, y]), _glMatrix.vec2.clone([x + _subImageWrapper.size.x, y]), _glMatrix.vec2.clone([x + _subImageWrapper.size.x, y + _subImageWrapper.size.y]), _glMatrix.vec2.clone([x, y + _subImageWrapper.size.y])],
	                    moments: matchingMoments,
	                    rad: avg,
	                    vec: _glMatrix.vec2.clone([Math.cos(avg), Math.sin(avg)])
	                };
	                patchesFound.push(patch);
	            }
	        }
	    }
	    return patchesFound;
	}
	
	/**
	 * finds patches which are connected and share the same orientation
	 * @param {Object} patchesFound
	 */
	function rasterizeAngularSimilarity(patchesFound) {
	    var label = 0,
	        threshold = 0.95,
	        currIdx = 0,
	        j,
	        patch,
	        hsv = [0, 1, 1],
	        rgb = [0, 0, 0];
	
	    function notYetProcessed() {
	        var i;
	        for (i = 0; i < _patchLabelGrid.data.length; i++) {
	            if (_patchLabelGrid.data[i] === 0 && _patchGrid.data[i] === 1) {
	                return i;
	            }
	        }
	        return _patchLabelGrid.length;
	    }
	
	    function trace(currentIdx) {
	        var x,
	            y,
	            currentPatch,
	            idx,
	            dir,
	            current = {
	            x: currentIdx % _patchLabelGrid.size.x,
	            y: currentIdx / _patchLabelGrid.size.x | 0
	        },
	            similarity;
	
	        if (currentIdx < _patchLabelGrid.data.length) {
	            currentPatch = _imageToPatchGrid.data[currentIdx];
	            // assign label
	            _patchLabelGrid.data[currentIdx] = label;
	            for (dir = 0; dir < _tracer2['default'].searchDirections.length; dir++) {
	                y = current.y + _tracer2['default'].searchDirections[dir][0];
	                x = current.x + _tracer2['default'].searchDirections[dir][1];
	                idx = y * _patchLabelGrid.size.x + x;
	
	                // continue if patch empty
	                if (_patchGrid.data[idx] === 0) {
	                    _patchLabelGrid.data[idx] = Number.MAX_VALUE;
	                    continue;
	                }
	
	                if (_patchLabelGrid.data[idx] === 0) {
	                    similarity = Math.abs(_glMatrix.vec2.dot(_imageToPatchGrid.data[idx].vec, currentPatch.vec));
	                    if (similarity > threshold) {
	                        trace(idx);
	                    }
	                }
	            }
	        }
	    }
	
	    // prepare for finding the right patches
	    _commonArray_helper2['default'].init(_patchGrid.data, 0);
	    _commonArray_helper2['default'].init(_patchLabelGrid.data, 0);
	    _commonArray_helper2['default'].init(_imageToPatchGrid.data, null);
	
	    for (j = 0; j < patchesFound.length; j++) {
	        patch = patchesFound[j];
	        _imageToPatchGrid.data[patch.index] = patch;
	        _patchGrid.data[patch.index] = 1;
	    }
	
	    // rasterize the patches found to determine area
	    _patchGrid.zeroBorder();
	
	    while ((currIdx = notYetProcessed()) < _patchLabelGrid.data.length) {
	        label++;
	        trace(currIdx);
	    }
	
	    // draw patch-labels if requested
	    if (false) {
	        for (j = 0; j < _patchLabelGrid.data.length; j++) {
	            if (_patchLabelGrid.data[j] > 0 && _patchLabelGrid.data[j] <= label) {
	                patch = _imageToPatchGrid.data[j];
	                hsv[0] = _patchLabelGrid.data[j] / (label + 1) * 360;
	                _commonCv_utils2['default'].hsv2rgb(hsv, rgb);
	                _commonImage_debug2['default'].drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, { color: "rgb(" + rgb.join(",") + ")", lineWidth: 2 });
	            }
	        }
	    }
	
	    return label;
	}
	
	exports['default'] = {
	    init: function init(inputImageWrapper, config) {
	        _config = config;
	        _inputImageWrapper = inputImageWrapper;
	
	        initBuffers();
	        initCanvas();
	    },
	
	    locate: function locate() {
	        var patchesFound, topLabels, boxes;
	
	        if (_config.halfSample) {
	            _commonCv_utils2['default'].halfSample(_inputImageWrapper, _currentImageWrapper);
	        }
	
	        binarizeImage();
	        patchesFound = findPatches();
	        // return unless 5% or more patches are found
	        if (patchesFound.length < _numPatches.x * _numPatches.y * 0.05) {
	            return null;
	        }
	
	        // rasterrize area by comparing angular similarity;
	        var maxLabel = rasterizeAngularSimilarity(patchesFound);
	        if (maxLabel < 1) {
	            return null;
	        }
	
	        // search for area with the most patches (biggest connected area)
	        topLabels = findBiggestConnectedAreas(maxLabel);
	        if (topLabels.length === 0) {
	            return null;
	        }
	
	        boxes = findBoxes(topLabels, maxLabel);
	        return boxes;
	    },
	
	    checkImageConstraints: function checkImageConstraints(inputStream, config) {
	        var patchSize,
	            width = inputStream.getWidth(),
	            height = inputStream.getHeight(),
	            halfSample = config.halfSample ? 0.5 : 1,
	            size,
	            area;
	
	        // calculate width and height based on area
	        if (inputStream.getConfig().area) {
	            area = _commonCv_utils2['default'].computeImageArea(width, height, inputStream.getConfig().area);
	            inputStream.setTopRight({ x: area.sx, y: area.sy });
	            inputStream.setCanvasSize({ x: width, y: height });
	            width = area.sw;
	            height = area.sh;
	        }
	
	        size = {
	            x: Math.floor(width * halfSample),
	            y: Math.floor(height * halfSample)
	        };
	
	        patchSize = _commonCv_utils2['default'].calculatePatchSize(config.patchSize, size);
	        if (false) {
	            console.log("Patch-Size: " + JSON.stringify(patchSize));
	        }
	
	        inputStream.setWidth(Math.floor(Math.floor(size.x / patchSize.x) * (1 / halfSample) * patchSize.x));
	        inputStream.setHeight(Math.floor(Math.floor(size.y / patchSize.y) * (1 / halfSample) * patchSize.y));
	
	        if (inputStream.getWidth() % patchSize.x === 0 && inputStream.getHeight() % patchSize.y === 0) {
	            return true;
	        }
	
	        throw new Error("Image dimensions do not comply with the current settings: Width (" + width + " )and height (" + height + ") must a multiple of " + patchSize.x);
	    }
	};
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    drawRect: function drawRect(pos, size, ctx, style) {
	        ctx.strokeStyle = style.color;
	        ctx.fillStyle = style.color;
	        ctx.lineWidth = 1;
	        ctx.beginPath();
	        ctx.strokeRect(pos.x, pos.y, size.x, size.y);
	    },
	    drawPath: function drawPath(path, def, ctx, style) {
	        ctx.strokeStyle = style.color;
	        ctx.fillStyle = style.color;
	        ctx.lineWidth = style.lineWidth;
	        ctx.beginPath();
	        ctx.moveTo(path[0][def.x], path[0][def.y]);
	        for (var j = 1; j < path.length; j++) {
	            ctx.lineTo(path[j][def.x], path[j][def.y]);
	        }
	        ctx.closePath();
	        ctx.stroke();
	    },
	    drawImage: function drawImage(imageData, size, ctx) {
	        var canvasData = ctx.getImageData(0, 0, size.x, size.y),
	            data = canvasData.data,
	            imageDataPos = imageData.length,
	            canvasDataPos = data.length,
	            value;
	
	        if (canvasDataPos / imageDataPos !== 4) {
	            return false;
	        }
	        while (imageDataPos--) {
	            value = imageData[imageDataPos];
	            data[--canvasDataPos] = 255;
	            data[--canvasDataPos] = value;
	            data[--canvasDataPos] = value;
	            data[--canvasDataPos] = value;
	        }
	        ctx.putImageData(canvasData, 0, 0);
	        return true;
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _tracer = __webpack_require__(12);
	
	var _tracer2 = _interopRequireDefault(_tracer);
	
	/**
	 * http://www.codeproject.com/Tips/407172/Connected-Component-Labeling-and-Vectorization
	 */
	var Rasterizer = {
	    createContour2D: function createContour2D() {
	        return {
	            dir: null,
	            index: null,
	            firstVertex: null,
	            insideContours: null,
	            nextpeer: null,
	            prevpeer: null
	        };
	    },
	    CONTOUR_DIR: {
	        CW_DIR: 0,
	        CCW_DIR: 1,
	        UNKNOWN_DIR: 2
	    },
	    DIR: {
	        OUTSIDE_EDGE: -32767,
	        INSIDE_EDGE: -32766
	    },
	    create: function create(imageWrapper, labelWrapper) {
	        var imageData = imageWrapper.data,
	            labelData = labelWrapper.data,
	            width = imageWrapper.size.x,
	            height = imageWrapper.size.y,
	            tracer = _tracer2["default"].create(imageWrapper, labelWrapper);
	
	        return {
	            rasterize: function rasterize(depthlabel) {
	                var color,
	                    bc,
	                    lc,
	                    labelindex,
	                    cx,
	                    cy,
	                    colorMap = [],
	                    vertex,
	                    p,
	                    cc,
	                    sc,
	                    pos,
	                    connectedCount = 0,
	                    i;
	
	                for (i = 0; i < 400; i++) {
	                    colorMap[i] = 0;
	                }
	
	                colorMap[0] = imageData[0];
	                cc = null;
	                for (cy = 1; cy < height - 1; cy++) {
	                    labelindex = 0;
	                    bc = colorMap[0];
	                    for (cx = 1; cx < width - 1; cx++) {
	                        pos = cy * width + cx;
	                        if (labelData[pos] === 0) {
	                            color = imageData[pos];
	                            if (color !== bc) {
	                                if (labelindex === 0) {
	                                    lc = connectedCount + 1;
	                                    colorMap[lc] = color;
	                                    bc = color;
	                                    vertex = tracer.contourTracing(cy, cx, lc, color, Rasterizer.DIR.OUTSIDE_EDGE);
	                                    if (vertex !== null) {
	                                        connectedCount++;
	                                        labelindex = lc;
	                                        p = Rasterizer.createContour2D();
	                                        p.dir = Rasterizer.CONTOUR_DIR.CW_DIR;
	                                        p.index = labelindex;
	                                        p.firstVertex = vertex;
	                                        p.nextpeer = cc;
	                                        p.insideContours = null;
	                                        if (cc !== null) {
	                                            cc.prevpeer = p;
	                                        }
	                                        cc = p;
	                                    }
	                                } else {
	                                    vertex = tracer.contourTracing(cy, cx, Rasterizer.DIR.INSIDE_EDGE, color, labelindex);
	                                    if (vertex !== null) {
	                                        p = Rasterizer.createContour2D();
	                                        p.firstVertex = vertex;
	                                        p.insideContours = null;
	                                        if (depthlabel === 0) {
	                                            p.dir = Rasterizer.CONTOUR_DIR.CCW_DIR;
	                                        } else {
	                                            p.dir = Rasterizer.CONTOUR_DIR.CW_DIR;
	                                        }
	                                        p.index = depthlabel;
	                                        sc = cc;
	                                        while (sc !== null && sc.index !== labelindex) {
	                                            sc = sc.nextpeer;
	                                        }
	                                        if (sc !== null) {
	                                            p.nextpeer = sc.insideContours;
	                                            if (sc.insideContours !== null) {
	                                                sc.insideContours.prevpeer = p;
	                                            }
	                                            sc.insideContours = p;
	                                        }
	                                    }
	                                }
	                            } else {
	                                labelData[pos] = labelindex;
	                            }
	                        } else if (labelData[pos] === Rasterizer.DIR.OUTSIDE_EDGE || labelData[pos] === Rasterizer.DIR.INSIDE_EDGE) {
	                            labelindex = 0;
	                            if (labelData[pos] === Rasterizer.DIR.INSIDE_EDGE) {
	                                bc = imageData[pos];
	                            } else {
	                                bc = colorMap[0];
	                            }
	                        } else {
	                            labelindex = labelData[pos];
	                            bc = colorMap[labelindex];
	                        }
	                    }
	                }
	                sc = cc;
	                while (sc !== null) {
	                    sc.index = depthlabel;
	                    sc = sc.nextpeer;
	                }
	                return {
	                    cc: cc,
	                    count: connectedCount
	                };
	            },
	            debug: {
	                drawContour: function drawContour(canvas, firstContour) {
	                    var ctx = canvas.getContext("2d"),
	                        pq = firstContour,
	                        iq,
	                        q,
	                        p;
	
	                    ctx.strokeStyle = "red";
	                    ctx.fillStyle = "red";
	                    ctx.lineWidth = 1;
	
	                    if (pq !== null) {
	                        iq = pq.insideContours;
	                    } else {
	                        iq = null;
	                    }
	
	                    while (pq !== null) {
	                        if (iq !== null) {
	                            q = iq;
	                            iq = iq.nextpeer;
	                        } else {
	                            q = pq;
	                            pq = pq.nextpeer;
	                            if (pq !== null) {
	                                iq = pq.insideContours;
	                            } else {
	                                iq = null;
	                            }
	                        }
	
	                        switch (q.dir) {
	                            case Rasterizer.CONTOUR_DIR.CW_DIR:
	                                ctx.strokeStyle = "red";
	                                break;
	                            case Rasterizer.CONTOUR_DIR.CCW_DIR:
	                                ctx.strokeStyle = "blue";
	                                break;
	                            case Rasterizer.CONTOUR_DIR.UNKNOWN_DIR:
	                                ctx.strokeStyle = "green";
	                                break;
	                        }
	
	                        p = q.firstVertex;
	                        ctx.beginPath();
	                        ctx.moveTo(p.x, p.y);
	                        do {
	                            p = p.next;
	                            ctx.lineTo(p.x, p.y);
	                        } while (p !== q.firstVertex);
	                        ctx.stroke();
	                    }
	                }
	            }
	        };
	    }
	};
	
	exports["default"] = Rasterizer;
	module.exports = exports["default"];

/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * http://www.codeproject.com/Tips/407172/Connected-Component-Labeling-and-Vectorization
	 */
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Tracer = {
	    searchDirections: [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]],
	    create: function create(imageWrapper, labelWrapper) {
	        var imageData = imageWrapper.data,
	            labelData = labelWrapper.data,
	            searchDirections = this.searchDirections,
	            width = imageWrapper.size.x,
	            pos;
	
	        function _trace(current, color, label, edgelabel) {
	            var i, y, x;
	
	            for (i = 0; i < 7; i++) {
	                y = current.cy + searchDirections[current.dir][0];
	                x = current.cx + searchDirections[current.dir][1];
	                pos = y * width + x;
	                if (imageData[pos] === color && (labelData[pos] === 0 || labelData[pos] === label)) {
	                    labelData[pos] = label;
	                    current.cy = y;
	                    current.cx = x;
	                    return true;
	                } else {
	                    if (labelData[pos] === 0) {
	                        labelData[pos] = edgelabel;
	                    }
	                    current.dir = (current.dir + 1) % 8;
	                }
	            }
	            return false;
	        }
	
	        function vertex2D(x, y, dir) {
	            return {
	                dir: dir,
	                x: x,
	                y: y,
	                next: null,
	                prev: null
	            };
	        }
	
	        function _contourTracing(sy, sx, label, color, edgelabel) {
	            var Fv = null,
	                Cv,
	                P,
	                ldir,
	                current = {
	                cx: sx,
	                cy: sy,
	                dir: 0
	            };
	
	            if (_trace(current, color, label, edgelabel)) {
	                Fv = vertex2D(sx, sy, current.dir);
	                Cv = Fv;
	                ldir = current.dir;
	                P = vertex2D(current.cx, current.cy, 0);
	                P.prev = Cv;
	                Cv.next = P;
	                P.next = null;
	                Cv = P;
	                do {
	                    current.dir = (current.dir + 6) % 8;
	                    _trace(current, color, label, edgelabel);
	                    if (ldir !== current.dir) {
	                        Cv.dir = current.dir;
	                        P = vertex2D(current.cx, current.cy, 0);
	                        P.prev = Cv;
	                        Cv.next = P;
	                        P.next = null;
	                        Cv = P;
	                    } else {
	                        Cv.dir = ldir;
	                        Cv.x = current.cx;
	                        Cv.y = current.cy;
	                    }
	                    ldir = current.dir;
	                } while (current.cx !== sx || current.cy !== sy);
	                Fv.prev = Cv.prev;
	                Cv.prev.next = Fv;
	            }
	            return Fv;
	        }
	
	        return {
	            trace: function trace(current, color, label, edgelabel) {
	                return _trace(current, color, label, edgelabel);
	            },
	            contourTracing: function contourTracing(sy, sx, label, color, edgelabel) {
	                return _contourTracing(sy, sx, label, color, edgelabel);
	            }
	        };
	    }
	};
	
	exports["default"] = Tracer;
	module.exports = exports["default"];

/***/ },
/* 13 */
/***/ function(module, exports) {

	/* @preserve ASM BEGIN */
	/* eslint-disable eqeqeq*/
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function Skeletonizer(stdlib, foreign, buffer) {
	    "use asm";
	
	    var images = new stdlib.Uint8Array(buffer),
	        size = foreign.size | 0,
	        imul = stdlib.Math.imul;
	
	    function erode(inImagePtr, outImagePtr) {
	        inImagePtr = inImagePtr | 0;
	        outImagePtr = outImagePtr | 0;
	
	        var v = 0,
	            u = 0,
	            sum = 0,
	            yStart1 = 0,
	            yStart2 = 0,
	            xStart1 = 0,
	            xStart2 = 0,
	            offset = 0;
	
	        for (v = 1; (v | 0) < (size - 1 | 0); v = v + 1 | 0) {
	            offset = offset + size | 0;
	            for (u = 1; (u | 0) < (size - 1 | 0); u = u + 1 | 0) {
	                yStart1 = offset - size | 0;
	                yStart2 = offset + size | 0;
	                xStart1 = u - 1 | 0;
	                xStart2 = u + 1 | 0;
	                sum = (images[inImagePtr + yStart1 + xStart1 | 0] | 0) + (images[inImagePtr + yStart1 + xStart2 | 0] | 0) + (images[inImagePtr + offset + u | 0] | 0) + (images[inImagePtr + yStart2 + xStart1 | 0] | 0) + (images[inImagePtr + yStart2 + xStart2 | 0] | 0) | 0;
	                if ((sum | 0) == (5 | 0)) {
	                    images[outImagePtr + offset + u | 0] = 1;
	                } else {
	                    images[outImagePtr + offset + u | 0] = 0;
	                }
	            }
	        }
	        return;
	    }
	
	    function subtract(aImagePtr, bImagePtr, outImagePtr) {
	        aImagePtr = aImagePtr | 0;
	        bImagePtr = bImagePtr | 0;
	        outImagePtr = outImagePtr | 0;
	
	        var length = 0;
	
	        length = imul(size, size) | 0;
	
	        while ((length | 0) > 0) {
	            length = length - 1 | 0;
	            images[outImagePtr + length | 0] = (images[aImagePtr + length | 0] | 0) - (images[bImagePtr + length | 0] | 0) | 0;
	        }
	    }
	
	    function bitwiseOr(aImagePtr, bImagePtr, outImagePtr) {
	        aImagePtr = aImagePtr | 0;
	        bImagePtr = bImagePtr | 0;
	        outImagePtr = outImagePtr | 0;
	
	        var length = 0;
	
	        length = imul(size, size) | 0;
	
	        while ((length | 0) > 0) {
	            length = length - 1 | 0;
	            images[outImagePtr + length | 0] = images[aImagePtr + length | 0] | 0 | (images[bImagePtr + length | 0] | 0) | 0;
	        }
	    }
	
	    function countNonZero(imagePtr) {
	        imagePtr = imagePtr | 0;
	
	        var sum = 0,
	            length = 0;
	
	        length = imul(size, size) | 0;
	
	        while ((length | 0) > 0) {
	            length = length - 1 | 0;
	            sum = (sum | 0) + (images[imagePtr + length | 0] | 0) | 0;
	        }
	
	        return sum | 0;
	    }
	
	    function init(imagePtr, value) {
	        imagePtr = imagePtr | 0;
	        value = value | 0;
	
	        var length = 0;
	
	        length = imul(size, size) | 0;
	
	        while ((length | 0) > 0) {
	            length = length - 1 | 0;
	            images[imagePtr + length | 0] = value;
	        }
	    }
	
	    function dilate(inImagePtr, outImagePtr) {
	        inImagePtr = inImagePtr | 0;
	        outImagePtr = outImagePtr | 0;
	
	        var v = 0,
	            u = 0,
	            sum = 0,
	            yStart1 = 0,
	            yStart2 = 0,
	            xStart1 = 0,
	            xStart2 = 0,
	            offset = 0;
	
	        for (v = 1; (v | 0) < (size - 1 | 0); v = v + 1 | 0) {
	            offset = offset + size | 0;
	            for (u = 1; (u | 0) < (size - 1 | 0); u = u + 1 | 0) {
	                yStart1 = offset - size | 0;
	                yStart2 = offset + size | 0;
	                xStart1 = u - 1 | 0;
	                xStart2 = u + 1 | 0;
	                sum = (images[inImagePtr + yStart1 + xStart1 | 0] | 0) + (images[inImagePtr + yStart1 + xStart2 | 0] | 0) + (images[inImagePtr + offset + u | 0] | 0) + (images[inImagePtr + yStart2 + xStart1 | 0] | 0) + (images[inImagePtr + yStart2 + xStart2 | 0] | 0) | 0;
	                if ((sum | 0) > (0 | 0)) {
	                    images[outImagePtr + offset + u | 0] = 1;
	                } else {
	                    images[outImagePtr + offset + u | 0] = 0;
	                }
	            }
	        }
	        return;
	    }
	
	    function memcpy(srcImagePtr, dstImagePtr) {
	        srcImagePtr = srcImagePtr | 0;
	        dstImagePtr = dstImagePtr | 0;
	
	        var length = 0;
	
	        length = imul(size, size) | 0;
	
	        while ((length | 0) > 0) {
	            length = length - 1 | 0;
	            images[dstImagePtr + length | 0] = images[srcImagePtr + length | 0] | 0;
	        }
	    }
	
	    function zeroBorder(imagePtr) {
	        imagePtr = imagePtr | 0;
	
	        var x = 0,
	            y = 0;
	
	        for (x = 0; (x | 0) < (size - 1 | 0); x = x + 1 | 0) {
	            images[imagePtr + x | 0] = 0;
	            images[imagePtr + y | 0] = 0;
	            y = y + size - 1 | 0;
	            images[imagePtr + y | 0] = 0;
	            y = y + 1 | 0;
	        }
	        for (x = 0; (x | 0) < (size | 0); x = x + 1 | 0) {
	            images[imagePtr + y | 0] = 0;
	            y = y + 1 | 0;
	        }
	    }
	
	    function skeletonize() {
	        var subImagePtr = 0,
	            erodedImagePtr = 0,
	            tempImagePtr = 0,
	            skelImagePtr = 0,
	            sum = 0,
	            done = 0;
	
	        erodedImagePtr = imul(size, size) | 0;
	        tempImagePtr = erodedImagePtr + erodedImagePtr | 0;
	        skelImagePtr = tempImagePtr + erodedImagePtr | 0;
	
	        // init skel-image
	        init(skelImagePtr, 0);
	        zeroBorder(subImagePtr);
	
	        do {
	            erode(subImagePtr, erodedImagePtr);
	            dilate(erodedImagePtr, tempImagePtr);
	            subtract(subImagePtr, tempImagePtr, tempImagePtr);
	            bitwiseOr(skelImagePtr, tempImagePtr, skelImagePtr);
	            memcpy(erodedImagePtr, subImagePtr);
	            sum = countNonZero(subImagePtr) | 0;
	            done = (sum | 0) == 0 | 0;
	        } while (!done);
	    }
	
	    return {
	        skeletonize: skeletonize
	    };
	}
	
	exports["default"] = Skeletonizer;
	
	/* eslint-enable eqeqeq*/
	/* @preserve ASM END */
	module.exports = exports["default"];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _bresenham = __webpack_require__(15);
	
	var _bresenham2 = _interopRequireDefault(_bresenham);
	
	var _commonImage_debug = __webpack_require__(10);
	
	var _commonImage_debug2 = _interopRequireDefault(_commonImage_debug);
	
	var _readerCode_128_reader = __webpack_require__(16);
	
	var _readerCode_128_reader2 = _interopRequireDefault(_readerCode_128_reader);
	
	var _readerEan_reader = __webpack_require__(18);
	
	var _readerEan_reader2 = _interopRequireDefault(_readerEan_reader);
	
	var _readerCode_39_reader = __webpack_require__(19);
	
	var _readerCode_39_reader2 = _interopRequireDefault(_readerCode_39_reader);
	
	var _readerCode_39_vin_reader = __webpack_require__(20);
	
	var _readerCode_39_vin_reader2 = _interopRequireDefault(_readerCode_39_vin_reader);
	
	var _readerCodabar_reader = __webpack_require__(21);
	
	var _readerCodabar_reader2 = _interopRequireDefault(_readerCodabar_reader);
	
	var _readerUpc_reader = __webpack_require__(22);
	
	var _readerUpc_reader2 = _interopRequireDefault(_readerUpc_reader);
	
	var _readerEan_8_reader = __webpack_require__(23);
	
	var _readerEan_8_reader2 = _interopRequireDefault(_readerEan_8_reader);
	
	var _readerUpc_e_reader = __webpack_require__(24);
	
	var _readerUpc_e_reader2 = _interopRequireDefault(_readerUpc_e_reader);
	
	var _readerI2of5_reader = __webpack_require__(25);
	
	var _readerI2of5_reader2 = _interopRequireDefault(_readerI2of5_reader);
	
	var READERS = {
	    code_128_reader: _readerCode_128_reader2['default'],
	    ean_reader: _readerEan_reader2['default'],
	    ean_8_reader: _readerEan_8_reader2['default'],
	    code_39_reader: _readerCode_39_reader2['default'],
	    code_39_vin_reader: _readerCode_39_vin_reader2['default'],
	    codabar_reader: _readerCodabar_reader2['default'],
	    upc_reader: _readerUpc_reader2['default'],
	    upc_e_reader: _readerUpc_e_reader2['default'],
	    i2of5_reader: _readerI2of5_reader2['default']
	};
	exports['default'] = {
	    create: function create(config, inputImageWrapper) {
	        var _canvas = {
	            ctx: {
	                frequency: null,
	                pattern: null,
	                overlay: null
	            },
	            dom: {
	                frequency: null,
	                pattern: null,
	                overlay: null
	            }
	        },
	            _barcodeReaders = [];
	
	        initCanvas();
	        initReaders();
	        initConfig();
	
	        function initCanvas() {
	            if (false) {
	                var $debug = document.querySelector("#debug.detection");
	                _canvas.dom.frequency = document.querySelector("canvas.frequency");
	                if (!_canvas.dom.frequency) {
	                    _canvas.dom.frequency = document.createElement("canvas");
	                    _canvas.dom.frequency.className = "frequency";
	                    if ($debug) {
	                        $debug.appendChild(_canvas.dom.frequency);
	                    }
	                }
	                _canvas.ctx.frequency = _canvas.dom.frequency.getContext("2d");
	
	                _canvas.dom.pattern = document.querySelector("canvas.patternBuffer");
	                if (!_canvas.dom.pattern) {
	                    _canvas.dom.pattern = document.createElement("canvas");
	                    _canvas.dom.pattern.className = "patternBuffer";
	                    if ($debug) {
	                        $debug.appendChild(_canvas.dom.pattern);
	                    }
	                }
	                _canvas.ctx.pattern = _canvas.dom.pattern.getContext("2d");
	
	                _canvas.dom.overlay = document.querySelector("canvas.drawingBuffer");
	                if (_canvas.dom.overlay) {
	                    _canvas.ctx.overlay = _canvas.dom.overlay.getContext("2d");
	                }
	            }
	        }
	
	        function initReaders() {
	            config.readers.forEach(function (readerConfig) {
	                var reader,
	                    configuration = {};
	
	                if (typeof readerConfig === 'object') {
	                    reader = readerConfig.format;
	                    configuration = readerConfig.config;
	                } else if (typeof readerConfig === 'string') {
	                    reader = readerConfig;
	                }
	                if (false) {
	                    console.log("Before registering reader: ", reader);
	                }
	                _barcodeReaders.push(new READERS[reader](configuration));
	            });
	            if (false) {
	                console.log("Registered Readers: " + _barcodeReaders.map(function (reader) {
	                    return JSON.stringify({ format: reader.FORMAT, config: reader.config });
	                }).join(', '));
	            }
	        }
	
	        function initConfig() {
	            if (false) {
	                var i,
	                    vis = [{
	                    node: _canvas.dom.frequency,
	                    prop: config.debug.showFrequency
	                }, {
	                    node: _canvas.dom.pattern,
	                    prop: config.debug.showPattern
	                }];
	
	                for (i = 0; i < vis.length; i++) {
	                    if (vis[i].prop === true) {
	                        vis[i].node.style.display = "block";
	                    } else {
	                        vis[i].node.style.display = "none";
	                    }
	                }
	            }
	        }
	
	        /**
	         * extend the line on both ends
	         * @param {Array} line
	         * @param {Number} angle
	         */
	        function getExtendedLine(line, angle, ext) {
	            function extendLine(amount) {
	                var extension = {
	                    y: amount * Math.sin(angle),
	                    x: amount * Math.cos(angle)
	                };
	
	                line[0].y -= extension.y;
	                line[0].x -= extension.x;
	                line[1].y += extension.y;
	                line[1].x += extension.x;
	            }
	
	            // check if inside image
	            extendLine(ext);
	            while (ext > 1 && (!inputImageWrapper.inImageWithBorder(line[0], 0) || !inputImageWrapper.inImageWithBorder(line[1], 0))) {
	                ext -= Math.ceil(ext / 2);
	                extendLine(-ext);
	            }
	            return line;
	        }
	
	        function getLine(box) {
	            return [{
	                x: (box[1][0] - box[0][0]) / 2 + box[0][0],
	                y: (box[1][1] - box[0][1]) / 2 + box[0][1]
	            }, {
	                x: (box[3][0] - box[2][0]) / 2 + box[2][0],
	                y: (box[3][1] - box[2][1]) / 2 + box[2][1]
	            }];
	        }
	
	        function tryDecode(line) {
	            var result = null,
	                i,
	                barcodeLine = _bresenham2['default'].getBarcodeLine(inputImageWrapper, line[0], line[1]);
	
	            if (false) {
	                _commonImage_debug2['default'].drawPath(line, { x: 'x', y: 'y' }, _canvas.ctx.overlay, { color: 'red', lineWidth: 3 });
	                _bresenham2['default'].debug.printFrequency(barcodeLine.line, _canvas.dom.frequency);
	            }
	
	            _bresenham2['default'].toBinaryLine(barcodeLine);
	
	            if (false) {
	                _bresenham2['default'].debug.printPattern(barcodeLine.line, _canvas.dom.pattern);
	            }
	
	            for (i = 0; i < _barcodeReaders.length && result === null; i++) {
	                result = _barcodeReaders[i].decodePattern(barcodeLine.line);
	            }
	            if (result === null) {
	                return null;
	            }
	            return {
	                codeResult: result,
	                barcodeLine: barcodeLine
	            };
	        }
	
	        /**
	         * This method slices the given area apart and tries to detect a barcode-pattern
	         * for each slice. It returns the decoded barcode, or null if nothing was found
	         * @param {Array} box
	         * @param {Array} line
	         * @param {Number} lineAngle
	         */
	        function tryDecodeBruteForce(box, line, lineAngle) {
	            var sideLength = Math.sqrt(Math.pow(box[1][0] - box[0][0], 2) + Math.pow(box[1][1] - box[0][1], 2)),
	                i,
	                slices = 16,
	                result = null,
	                dir,
	                extension,
	                xdir = Math.sin(lineAngle),
	                ydir = Math.cos(lineAngle);
	
	            for (i = 1; i < slices && result === null; i++) {
	                // move line perpendicular to angle
	                dir = sideLength / slices * i * (i % 2 === 0 ? -1 : 1);
	                extension = {
	                    y: dir * xdir,
	                    x: dir * ydir
	                };
	                line[0].y += extension.x;
	                line[0].x -= extension.y;
	                line[1].y += extension.x;
	                line[1].x -= extension.y;
	
	                result = tryDecode(line);
	            }
	            return result;
	        }
	
	        function getLineLength(line) {
	            return Math.sqrt(Math.pow(Math.abs(line[1].y - line[0].y), 2) + Math.pow(Math.abs(line[1].x - line[0].x), 2));
	        }
	
	        /**
	         * With the help of the configured readers (Code128 or EAN) this function tries to detect a
	         * valid barcode pattern within the given area.
	         * @param {Object} box The area to search in
	         * @returns {Object} the result {codeResult, line, angle, pattern, threshold}
	         */
	        function _decodeFromBoundingBox(box) {
	            var line,
	                lineAngle,
	                ctx = _canvas.ctx.overlay,
	                result,
	                lineLength;
	
	            if (false) {
	                if (config.debug.drawBoundingBox && ctx) {
	                    _commonImage_debug2['default'].drawPath(box, { x: 0, y: 1 }, ctx, { color: "blue", lineWidth: 2 });
	                }
	            }
	
	            line = getLine(box);
	            lineLength = getLineLength(line);
	            lineAngle = Math.atan2(line[1].y - line[0].y, line[1].x - line[0].x);
	            line = getExtendedLine(line, lineAngle, Math.floor(lineLength * 0.1));
	            if (line === null) {
	                return null;
	            }
	
	            result = tryDecode(line);
	            if (result === null) {
	                result = tryDecodeBruteForce(box, line, lineAngle);
	            }
	
	            if (result === null) {
	                return null;
	            }
	
	            if (false) {
	                _commonImage_debug2['default'].drawPath(line, { x: 'x', y: 'y' }, ctx, { color: 'red', lineWidth: 3 });
	            }
	
	            return {
	                codeResult: result.codeResult,
	                line: line,
	                angle: lineAngle,
	                pattern: result.barcodeLine.line,
	                threshold: result.barcodeLine.threshold
	            };
	        }
	
	        return {
	            decodeFromBoundingBox: function decodeFromBoundingBox(box) {
	                return _decodeFromBoundingBox(box);
	            },
	            decodeFromBoundingBoxes: function decodeFromBoundingBoxes(boxes) {
	                var i,
	                    result,
	                    barcodes = [],
	                    multiple = config.multiple;
	
	                for (i = 0; i < boxes.length; i++) {
	                    var box = boxes[i];
	                    result = _decodeFromBoundingBox(box) || {};
	                    result.box = box;
	
	                    if (multiple) {
	                        barcodes.push(result);
	                    } else if (result.codeResult) {
	                        return result;
	                    }
	                }
	
	                if (multiple) {
	                    return {
	                        barcodes: barcodes
	                    };
	                }
	            },
	            setReaders: function setReaders(readers) {
	                config.readers = readers;
	                _barcodeReaders.length = 0;
	                initReaders();
	            }
	        };
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonCv_utils = __webpack_require__(5);
	
	var _commonCv_utils2 = _interopRequireDefault(_commonCv_utils);
	
	var _commonImage_wrapper = __webpack_require__(3);
	
	var _commonImage_wrapper2 = _interopRequireDefault(_commonImage_wrapper);
	
	var Bresenham = {};
	
	var Slope = {
	    DIR: {
	        UP: 1,
	        DOWN: -1
	    }
	};
	/**
	 * Scans a line of the given image from point p1 to p2 and returns a result object containing
	 * gray-scale values (0-255) of the underlying pixels in addition to the min
	 * and max values.
	 * @param {Object} imageWrapper
	 * @param {Object} p1 The start point {x,y}
	 * @param {Object} p2 The end point {x,y}
	 * @returns {line, min, max}
	 */
	Bresenham.getBarcodeLine = function (imageWrapper, p1, p2) {
	    var x0 = p1.x | 0,
	        y0 = p1.y | 0,
	        x1 = p2.x | 0,
	        y1 = p2.y | 0,
	        steep = Math.abs(y1 - y0) > Math.abs(x1 - x0),
	        deltax,
	        deltay,
	        error,
	        ystep,
	        y,
	        tmp,
	        x,
	        line = [],
	        imageData = imageWrapper.data,
	        width = imageWrapper.size.x,
	        sum = 0,
	        val,
	        min = 255,
	        max = 0;
	
	    function read(a, b) {
	        val = imageData[b * width + a];
	        sum += val;
	        min = val < min ? val : min;
	        max = val > max ? val : max;
	        line.push(val);
	    }
	
	    if (steep) {
	        tmp = x0;
	        x0 = y0;
	        y0 = tmp;
	
	        tmp = x1;
	        x1 = y1;
	        y1 = tmp;
	    }
	    if (x0 > x1) {
	        tmp = x0;
	        x0 = x1;
	        x1 = tmp;
	
	        tmp = y0;
	        y0 = y1;
	        y1 = tmp;
	    }
	    deltax = x1 - x0;
	    deltay = Math.abs(y1 - y0);
	    error = deltax / 2 | 0;
	    y = y0;
	    ystep = y0 < y1 ? 1 : -1;
	    for (x = x0; x < x1; x++) {
	        if (steep) {
	            read(y, x);
	        } else {
	            read(x, y);
	        }
	        error = error - deltay;
	        if (error < 0) {
	            y = y + ystep;
	            error = error + deltax;
	        }
	    }
	
	    return {
	        line: line,
	        min: min,
	        max: max
	    };
	};
	
	Bresenham.toOtsuBinaryLine = function (result) {
	    var line = result.line,
	        image = new _commonImage_wrapper2['default']({ x: line.length - 1, y: 1 }, line),
	        threshold = _commonCv_utils2['default'].determineOtsuThreshold(image, 5);
	
	    line = _commonCv_utils2['default'].sharpenLine(line);
	    _commonCv_utils2['default'].thresholdImage(image, threshold);
	
	    return {
	        line: line,
	        threshold: threshold
	    };
	};
	
	/**
	 * Converts the result from getBarcodeLine into a binary representation
	 * also considering the frequency and slope of the signal for more robust results
	 * @param {Object} result {line, min, max}
	 */
	Bresenham.toBinaryLine = function (result) {
	    var min = result.min,
	        max = result.max,
	        line = result.line,
	        slope,
	        slope2,
	        center = min + (max - min) / 2,
	        extrema = [],
	        currentDir,
	        dir,
	        threshold = (max - min) / 12,
	        rThreshold = -threshold,
	        i,
	        j;
	
	    // 1. find extrema
	    currentDir = line[0] > center ? Slope.DIR.UP : Slope.DIR.DOWN;
	    extrema.push({
	        pos: 0,
	        val: line[0]
	    });
	    for (i = 0; i < line.length - 2; i++) {
	        slope = line[i + 1] - line[i];
	        slope2 = line[i + 2] - line[i + 1];
	        if (slope + slope2 < rThreshold && line[i + 1] < center * 1.5) {
	            dir = Slope.DIR.DOWN;
	        } else if (slope + slope2 > threshold && line[i + 1] > center * 0.5) {
	            dir = Slope.DIR.UP;
	        } else {
	            dir = currentDir;
	        }
	
	        if (currentDir !== dir) {
	            extrema.push({
	                pos: i,
	                val: line[i]
	            });
	            currentDir = dir;
	        }
	    }
	    extrema.push({
	        pos: line.length,
	        val: line[line.length - 1]
	    });
	
	    for (j = extrema[0].pos; j < extrema[1].pos; j++) {
	        line[j] = line[j] > center ? 0 : 1;
	    }
	
	    // iterate over extrema and convert to binary based on avg between minmax
	    for (i = 1; i < extrema.length - 1; i++) {
	        if (extrema[i + 1].val > extrema[i].val) {
	            threshold = extrema[i].val + (extrema[i + 1].val - extrema[i].val) / 3 * 2 | 0;
	        } else {
	            threshold = extrema[i + 1].val + (extrema[i].val - extrema[i + 1].val) / 3 | 0;
	        }
	
	        for (j = extrema[i].pos; j < extrema[i + 1].pos; j++) {
	            line[j] = line[j] > threshold ? 0 : 1;
	        }
	    }
	
	    return {
	        line: line,
	        threshold: threshold
	    };
	};
	
	/**
	 * Used for development only
	 */
	Bresenham.debug = {
	    printFrequency: function printFrequency(line, canvas) {
	        var i,
	            ctx = canvas.getContext("2d");
	        canvas.width = line.length;
	        canvas.height = 256;
	
	        ctx.beginPath();
	        ctx.strokeStyle = "blue";
	        for (i = 0; i < line.length; i++) {
	            ctx.moveTo(i, 255);
	            ctx.lineTo(i, 255 - line[i]);
	        }
	        ctx.stroke();
	        ctx.closePath();
	    },
	
	    printPattern: function printPattern(line, canvas) {
	        var ctx = canvas.getContext("2d"),
	            i;
	
	        canvas.width = line.length;
	        ctx.fillColor = "black";
	        for (i = 0; i < line.length; i++) {
	            if (line[i] === 1) {
	                ctx.fillRect(i, 0, 1, 100);
	            }
	        }
	    }
	};
	
	exports['default'] = Bresenham;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _barcode_reader = __webpack_require__(17);
	
	var _barcode_reader2 = _interopRequireDefault(_barcode_reader);
	
	function Code128Reader() {
	    _barcode_reader2["default"].call(this);
	}
	
	var properties = {
	    CODE_SHIFT: { value: 98 },
	    CODE_C: { value: 99 },
	    CODE_B: { value: 100 },
	    CODE_A: { value: 101 },
	    START_CODE_A: { value: 103 },
	    START_CODE_B: { value: 104 },
	    START_CODE_C: { value: 105 },
	    STOP_CODE: { value: 106 },
	    MODULO: { value: 11 },
	    CODE_PATTERN: { value: [[2, 1, 2, 2, 2, 2], [2, 2, 2, 1, 2, 2], [2, 2, 2, 2, 2, 1], [1, 2, 1, 2, 2, 3], [1, 2, 1, 3, 2, 2], [1, 3, 1, 2, 2, 2], [1, 2, 2, 2, 1, 3], [1, 2, 2, 3, 1, 2], [1, 3, 2, 2, 1, 2], [2, 2, 1, 2, 1, 3], [2, 2, 1, 3, 1, 2], [2, 3, 1, 2, 1, 2], [1, 1, 2, 2, 3, 2], [1, 2, 2, 1, 3, 2], [1, 2, 2, 2, 3, 1], [1, 1, 3, 2, 2, 2], [1, 2, 3, 1, 2, 2], [1, 2, 3, 2, 2, 1], [2, 2, 3, 2, 1, 1], [2, 2, 1, 1, 3, 2], [2, 2, 1, 2, 3, 1], [2, 1, 3, 2, 1, 2], [2, 2, 3, 1, 1, 2], [3, 1, 2, 1, 3, 1], [3, 1, 1, 2, 2, 2], [3, 2, 1, 1, 2, 2], [3, 2, 1, 2, 2, 1], [3, 1, 2, 2, 1, 2], [3, 2, 2, 1, 1, 2], [3, 2, 2, 2, 1, 1], [2, 1, 2, 1, 2, 3], [2, 1, 2, 3, 2, 1], [2, 3, 2, 1, 2, 1], [1, 1, 1, 3, 2, 3], [1, 3, 1, 1, 2, 3], [1, 3, 1, 3, 2, 1], [1, 1, 2, 3, 1, 3], [1, 3, 2, 1, 1, 3], [1, 3, 2, 3, 1, 1], [2, 1, 1, 3, 1, 3], [2, 3, 1, 1, 1, 3], [2, 3, 1, 3, 1, 1], [1, 1, 2, 1, 3, 3], [1, 1, 2, 3, 3, 1], [1, 3, 2, 1, 3, 1], [1, 1, 3, 1, 2, 3], [1, 1, 3, 3, 2, 1], [1, 3, 3, 1, 2, 1], [3, 1, 3, 1, 2, 1], [2, 1, 1, 3, 3, 1], [2, 3, 1, 1, 3, 1], [2, 1, 3, 1, 1, 3], [2, 1, 3, 3, 1, 1], [2, 1, 3, 1, 3, 1], [3, 1, 1, 1, 2, 3], [3, 1, 1, 3, 2, 1], [3, 3, 1, 1, 2, 1], [3, 1, 2, 1, 1, 3], [3, 1, 2, 3, 1, 1], [3, 3, 2, 1, 1, 1], [3, 1, 4, 1, 1, 1], [2, 2, 1, 4, 1, 1], [4, 3, 1, 1, 1, 1], [1, 1, 1, 2, 2, 4], [1, 1, 1, 4, 2, 2], [1, 2, 1, 1, 2, 4], [1, 2, 1, 4, 2, 1], [1, 4, 1, 1, 2, 2], [1, 4, 1, 2, 2, 1], [1, 1, 2, 2, 1, 4], [1, 1, 2, 4, 1, 2], [1, 2, 2, 1, 1, 4], [1, 2, 2, 4, 1, 1], [1, 4, 2, 1, 1, 2], [1, 4, 2, 2, 1, 1], [2, 4, 1, 2, 1, 1], [2, 2, 1, 1, 1, 4], [4, 1, 3, 1, 1, 1], [2, 4, 1, 1, 1, 2], [1, 3, 4, 1, 1, 1], [1, 1, 1, 2, 4, 2], [1, 2, 1, 1, 4, 2], [1, 2, 1, 2, 4, 1], [1, 1, 4, 2, 1, 2], [1, 2, 4, 1, 1, 2], [1, 2, 4, 2, 1, 1], [4, 1, 1, 2, 1, 2], [4, 2, 1, 1, 1, 2], [4, 2, 1, 2, 1, 1], [2, 1, 2, 1, 4, 1], [2, 1, 4, 1, 2, 1], [4, 1, 2, 1, 2, 1], [1, 1, 1, 1, 4, 3], [1, 1, 1, 3, 4, 1], [1, 3, 1, 1, 4, 1], [1, 1, 4, 1, 1, 3], [1, 1, 4, 3, 1, 1], [4, 1, 1, 1, 1, 3], [4, 1, 1, 3, 1, 1], [1, 1, 3, 1, 4, 1], [1, 1, 4, 1, 3, 1], [3, 1, 1, 1, 4, 1], [4, 1, 1, 1, 3, 1], [2, 1, 1, 4, 1, 2], [2, 1, 1, 2, 1, 4], [2, 1, 1, 2, 3, 2], [2, 3, 3, 1, 1, 1, 2]] },
	    SINGLE_CODE_ERROR: { value: 1 },
	    AVG_CODE_ERROR: { value: 0.5 },
	    FORMAT: { value: "code_128", writeable: false }
	};
	
	Code128Reader.prototype = Object.create(_barcode_reader2["default"].prototype, properties);
	Code128Reader.prototype.constructor = Code128Reader;
	
	Code128Reader.prototype._decodeCode = function (start) {
	    var counter = [0, 0, 0, 0, 0, 0],
	        i,
	        self = this,
	        offset = start,
	        isWhite = !self._row[offset],
	        counterPos = 0,
	        bestMatch = {
	        error: Number.MAX_VALUE,
	        code: -1,
	        start: start,
	        end: start
	    },
	        code,
	        error,
	        normalized;
	
	    for (i = offset; i < self._row.length; i++) {
	        if (self._row[i] ^ isWhite) {
	            counter[counterPos]++;
	        } else {
	            if (counterPos === counter.length - 1) {
	                normalized = self._normalize(counter);
	                if (normalized) {
	                    for (code = 0; code < self.CODE_PATTERN.length; code++) {
	                        error = self._matchPattern(normalized, self.CODE_PATTERN[code]);
	                        if (error < bestMatch.error) {
	                            bestMatch.code = code;
	                            bestMatch.error = error;
	                        }
	                    }
	                    bestMatch.end = i;
	                    return bestMatch;
	                }
	            } else {
	                counterPos++;
	            }
	            counter[counterPos] = 1;
	            isWhite = !isWhite;
	        }
	    }
	    return null;
	};
	
	Code128Reader.prototype._findStart = function () {
	    var counter = [0, 0, 0, 0, 0, 0],
	        i,
	        self = this,
	        offset = self._nextSet(self._row),
	        isWhite = false,
	        counterPos = 0,
	        bestMatch = {
	        error: Number.MAX_VALUE,
	        code: -1,
	        start: 0,
	        end: 0
	    },
	        code,
	        error,
	        j,
	        sum,
	        normalized;
	
	    for (i = offset; i < self._row.length; i++) {
	        if (self._row[i] ^ isWhite) {
	            counter[counterPos]++;
	        } else {
	            if (counterPos === counter.length - 1) {
	                sum = 0;
	                for (j = 0; j < counter.length; j++) {
	                    sum += counter[j];
	                }
	                normalized = self._normalize(counter);
	                if (normalized) {
	                    for (code = self.START_CODE_A; code <= self.START_CODE_C; code++) {
	                        error = self._matchPattern(normalized, self.CODE_PATTERN[code]);
	                        if (error < bestMatch.error) {
	                            bestMatch.code = code;
	                            bestMatch.error = error;
	                        }
	                    }
	                    if (bestMatch.error < self.AVG_CODE_ERROR) {
	                        bestMatch.start = i - sum;
	                        bestMatch.end = i;
	                        return bestMatch;
	                    }
	                }
	
	                for (j = 0; j < 4; j++) {
	                    counter[j] = counter[j + 2];
	                }
	                counter[4] = 0;
	                counter[5] = 0;
	                counterPos--;
	            } else {
	                counterPos++;
	            }
	            counter[counterPos] = 1;
	            isWhite = !isWhite;
	        }
	    }
	    return null;
	};
	
	Code128Reader.prototype._decode = function () {
	    var self = this,
	        startInfo = self._findStart(),
	        code = null,
	        done = false,
	        result = [],
	        multiplier = 0,
	        checksum = 0,
	        codeset,
	        rawResult = [],
	        decodedCodes = [],
	        shiftNext = false,
	        unshift,
	        removeLastCharacter = true;
	
	    if (startInfo === null) {
	        return null;
	    }
	    code = {
	        code: startInfo.code,
	        start: startInfo.start,
	        end: startInfo.end
	    };
	    decodedCodes.push(code);
	    checksum = code.code;
	    switch (code.code) {
	        case self.START_CODE_A:
	            codeset = self.CODE_A;
	            break;
	        case self.START_CODE_B:
	            codeset = self.CODE_B;
	            break;
	        case self.START_CODE_C:
	            codeset = self.CODE_C;
	            break;
	        default:
	            return null;
	    }
	
	    while (!done) {
	        unshift = shiftNext;
	        shiftNext = false;
	        code = self._decodeCode(code.end);
	        if (code !== null) {
	            if (code.code !== self.STOP_CODE) {
	                removeLastCharacter = true;
	            }
	
	            if (code.code !== self.STOP_CODE) {
	                rawResult.push(code.code);
	                multiplier++;
	                checksum += multiplier * code.code;
	            }
	            decodedCodes.push(code);
	
	            switch (codeset) {
	                case self.CODE_A:
	                    if (code.code < 64) {
	                        result.push(String.fromCharCode(32 + code.code));
	                    } else if (code.code < 96) {
	                        result.push(String.fromCharCode(code.code - 64));
	                    } else {
	                        if (code.code !== self.STOP_CODE) {
	                            removeLastCharacter = false;
	                        }
	                        switch (code.code) {
	                            case self.CODE_SHIFT:
	                                shiftNext = true;
	                                codeset = self.CODE_B;
	                                break;
	                            case self.CODE_B:
	                                codeset = self.CODE_B;
	                                break;
	                            case self.CODE_C:
	                                codeset = self.CODE_C;
	                                break;
	                            case self.STOP_CODE:
	                                done = true;
	                                break;
	                        }
	                    }
	                    break;
	                case self.CODE_B:
	                    if (code.code < 96) {
	                        result.push(String.fromCharCode(32 + code.code));
	                    } else {
	                        if (code.code !== self.STOP_CODE) {
	                            removeLastCharacter = false;
	                        }
	                        switch (code.code) {
	                            case self.CODE_SHIFT:
	                                shiftNext = true;
	                                codeset = self.CODE_A;
	                                break;
	                            case self.CODE_A:
	                                codeset = self.CODE_A;
	                                break;
	                            case self.CODE_C:
	                                codeset = self.CODE_C;
	                                break;
	                            case self.STOP_CODE:
	                                done = true;
	                                break;
	                        }
	                    }
	                    break;
	                case self.CODE_C:
	                    if (code.code < 100) {
	                        result.push(code.code < 10 ? "0" + code.code : code.code);
	                    } else {
	                        if (code.code !== self.STOP_CODE) {
	                            removeLastCharacter = false;
	                        }
	                        switch (code.code) {
	                            case self.CODE_A:
	                                codeset = self.CODE_A;
	                                break;
	                            case self.CODE_B:
	                                codeset = self.CODE_B;
	                                break;
	                            case self.STOP_CODE:
	                                done = true;
	                                break;
	                        }
	                    }
	                    break;
	            }
	        } else {
	            done = true;
	        }
	        if (unshift) {
	            codeset = codeset === self.CODE_A ? self.CODE_B : self.CODE_A;
	        }
	    }
	
	    if (code === null) {
	        return null;
	    }
	
	    code.end = self._nextUnset(self._row, code.end);
	    if (!self._verifyTrailingWhitespace(code)) {
	        return null;
	    }
	
	    checksum -= multiplier * rawResult[rawResult.length - 1];
	    if (checksum % 103 !== rawResult[rawResult.length - 1]) {
	        return null;
	    }
	
	    if (!result.length) {
	        return null;
	    }
	
	    // remove last code from result (checksum)
	    if (removeLastCharacter) {
	        result.splice(result.length - 1, 1);
	    }
	
	    return {
	        code: result.join(""),
	        start: startInfo.start,
	        end: code.end,
	        codeset: codeset,
	        startInfo: startInfo,
	        decodedCodes: decodedCodes,
	        endInfo: code
	    };
	};
	
	_barcode_reader2["default"].prototype._verifyTrailingWhitespace = function (endInfo) {
	    var self = this,
	        trailingWhitespaceEnd;
	
	    trailingWhitespaceEnd = endInfo.end + (endInfo.end - endInfo.start) / 2;
	    if (trailingWhitespaceEnd < self._row.length) {
	        if (self._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
	            return endInfo;
	        }
	    }
	    return null;
	};
	
	exports["default"] = Code128Reader;
	module.exports = exports["default"];

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	function BarcodeReader(config) {
	    this._row = [];
	    this.config = config || {};
	    return this;
	}
	
	BarcodeReader.prototype._nextUnset = function (line, start) {
	    var i;
	
	    if (start === undefined) {
	        start = 0;
	    }
	    for (i = start; i < line.length; i++) {
	        if (!line[i]) {
	            return i;
	        }
	    }
	    return line.length;
	};
	
	BarcodeReader.prototype._matchPattern = function (counter, code) {
	    var i,
	        error = 0,
	        singleError = 0,
	        modulo = this.MODULO,
	        maxSingleError = this.SINGLE_CODE_ERROR || 1;
	
	    for (i = 0; i < counter.length; i++) {
	        singleError = Math.abs(code[i] - counter[i]);
	        if (singleError > maxSingleError) {
	            return Number.MAX_VALUE;
	        }
	        error += singleError;
	    }
	    return error / modulo;
	};
	
	BarcodeReader.prototype._nextSet = function (line, offset) {
	    var i;
	
	    offset = offset || 0;
	    for (i = offset; i < line.length; i++) {
	        if (line[i]) {
	            return i;
	        }
	    }
	    return line.length;
	};
	
	BarcodeReader.prototype._normalize = function (counter, modulo) {
	    var i,
	        self = this,
	        sum = 0,
	        ratio,
	        numOnes = 0,
	        normalized = [],
	        norm = 0;
	
	    if (!modulo) {
	        modulo = self.MODULO;
	    }
	    for (i = 0; i < counter.length; i++) {
	        if (counter[i] === 1) {
	            numOnes++;
	        } else {
	            sum += counter[i];
	        }
	    }
	    ratio = sum / (modulo - numOnes);
	    if (ratio > 1.0) {
	        for (i = 0; i < counter.length; i++) {
	            norm = counter[i] === 1 ? counter[i] : counter[i] / ratio;
	            normalized.push(norm);
	        }
	    } else {
	        ratio = (sum + numOnes) / modulo;
	        for (i = 0; i < counter.length; i++) {
	            norm = counter[i] / ratio;
	            normalized.push(norm);
	        }
	    }
	    return normalized;
	};
	
	BarcodeReader.prototype._matchTrace = function (cmpCounter, epsilon) {
	    var counter = [],
	        i,
	        self = this,
	        offset = self._nextSet(self._row),
	        isWhite = !self._row[offset],
	        counterPos = 0,
	        bestMatch = {
	        error: Number.MAX_VALUE,
	        code: -1,
	        start: 0
	    },
	        error;
	
	    if (cmpCounter) {
	        for (i = 0; i < cmpCounter.length; i++) {
	            counter.push(0);
	        }
	        for (i = offset; i < self._row.length; i++) {
	            if (self._row[i] ^ isWhite) {
	                counter[counterPos]++;
	            } else {
	                if (counterPos === counter.length - 1) {
	                    error = self._matchPattern(counter, cmpCounter);
	
	                    if (error < epsilon) {
	                        bestMatch.start = i - offset;
	                        bestMatch.end = i;
	                        bestMatch.counter = counter;
	                        return bestMatch;
	                    } else {
	                        return null;
	                    }
	                } else {
	                    counterPos++;
	                }
	                counter[counterPos] = 1;
	                isWhite = !isWhite;
	            }
	        }
	    } else {
	        counter.push(0);
	        for (i = offset; i < self._row.length; i++) {
	            if (self._row[i] ^ isWhite) {
	                counter[counterPos]++;
	            } else {
	                counterPos++;
	                counter.push(0);
	                counter[counterPos] = 1;
	                isWhite = !isWhite;
	            }
	        }
	    }
	
	    // if cmpCounter was not given
	    bestMatch.start = offset;
	    bestMatch.end = self._row.length - 1;
	    bestMatch.counter = counter;
	    return bestMatch;
	};
	
	BarcodeReader.prototype.decodePattern = function (pattern) {
	    var self = this,
	        result;
	
	    self._row = pattern;
	    result = self._decode();
	    if (result === null) {
	        self._row.reverse();
	        result = self._decode();
	        if (result) {
	            result.direction = BarcodeReader.DIRECTION.REVERSE;
	            result.start = self._row.length - result.start;
	            result.end = self._row.length - result.end;
	        }
	    } else {
	        result.direction = BarcodeReader.DIRECTION.FORWARD;
	    }
	    if (result) {
	        result.format = self.FORMAT;
	    }
	    return result;
	};
	
	BarcodeReader.prototype._matchRange = function (start, end, value) {
	    var i;
	
	    start = start < 0 ? 0 : start;
	    for (i = start; i < end; i++) {
	        if (this._row[i] !== value) {
	            return false;
	        }
	    }
	    return true;
	};
	
	BarcodeReader.prototype._fillCounters = function (offset, end, isWhite) {
	    var self = this,
	        counterPos = 0,
	        i,
	        counters = [];
	
	    isWhite = typeof isWhite !== 'undefined' ? isWhite : true;
	    offset = typeof offset !== 'undefined' ? offset : self._nextUnset(self._row);
	    end = end || self._row.length;
	
	    counters[counterPos] = 0;
	    for (i = offset; i < end; i++) {
	        if (self._row[i] ^ isWhite) {
	            counters[counterPos]++;
	        } else {
	            counterPos++;
	            counters[counterPos] = 1;
	            isWhite = !isWhite;
	        }
	    }
	    return counters;
	};
	
	Object.defineProperty(BarcodeReader.prototype, "FORMAT", {
	    value: 'unknown',
	    writeable: false
	});
	
	BarcodeReader.DIRECTION = {
	    FORWARD: 1,
	    REVERSE: -1
	};
	
	BarcodeReader.Exception = {
	    StartNotFoundException: "Start-Info was not found!",
	    CodeNotFoundException: "Code could not be found!",
	    PatternNotFoundException: "Pattern could not be found!"
	};
	
	BarcodeReader.CONFIG_KEYS = {};
	
	exports['default'] = BarcodeReader;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _barcode_reader = __webpack_require__(17);
	
	var _barcode_reader2 = _interopRequireDefault(_barcode_reader);
	
	function EANReader(opts) {
	    _barcode_reader2["default"].call(this, opts);
	}
	
	var properties = {
	    CODE_L_START: { value: 0 },
	    MODULO: { value: 7 },
	    CODE_G_START: { value: 10 },
	    START_PATTERN: { value: [1 / 3 * 7, 1 / 3 * 7, 1 / 3 * 7] },
	    STOP_PATTERN: { value: [1 / 3 * 7, 1 / 3 * 7, 1 / 3 * 7] },
	    MIDDLE_PATTERN: { value: [1 / 5 * 7, 1 / 5 * 7, 1 / 5 * 7, 1 / 5 * 7, 1 / 5 * 7] },
	    CODE_PATTERN: { value: [[3, 2, 1, 1], [2, 2, 2, 1], [2, 1, 2, 2], [1, 4, 1, 1], [1, 1, 3, 2], [1, 2, 3, 1], [1, 1, 1, 4], [1, 3, 1, 2], [1, 2, 1, 3], [3, 1, 1, 2], [1, 1, 2, 3], [1, 2, 2, 2], [2, 2, 1, 2], [1, 1, 4, 1], [2, 3, 1, 1], [1, 3, 2, 1], [4, 1, 1, 1], [2, 1, 3, 1], [3, 1, 2, 1], [2, 1, 1, 3]] },
	    CODE_FREQUENCY: { value: [0, 11, 13, 14, 19, 25, 28, 21, 22, 26] },
	    SINGLE_CODE_ERROR: { value: 0.67 },
	    AVG_CODE_ERROR: { value: 0.27 },
	    FORMAT: { value: "ean_13", writeable: false }
	};
	
	EANReader.prototype = Object.create(_barcode_reader2["default"].prototype, properties);
	EANReader.prototype.constructor = EANReader;
	
	EANReader.prototype._decodeCode = function (start, coderange) {
	    var counter = [0, 0, 0, 0],
	        i,
	        self = this,
	        offset = start,
	        isWhite = !self._row[offset],
	        counterPos = 0,
	        bestMatch = {
	        error: Number.MAX_VALUE,
	        code: -1,
	        start: start,
	        end: start
	    },
	        code,
	        error,
	        normalized;
	
	    if (!coderange) {
	        coderange = self.CODE_PATTERN.length;
	    }
	
	    for (i = offset; i < self._row.length; i++) {
	        if (self._row[i] ^ isWhite) {
	            counter[counterPos]++;
	        } else {
	            if (counterPos === counter.length - 1) {
	                normalized = self._normalize(counter);
	                if (normalized) {
	                    for (code = 0; code < coderange; code++) {
	                        error = self._matchPattern(normalized, self.CODE_PATTERN[code]);
	                        if (error < bestMatch.error) {
	                            bestMatch.code = code;
	                            bestMatch.error = error;
	                        }
	                    }
	                    bestMatch.end = i;
	                    if (bestMatch.error > self.AVG_CODE_ERROR) {
	                        return null;
	                    }
	                    return bestMatch;
	                }
	            } else {
	                counterPos++;
	            }
	            counter[counterPos] = 1;
	            isWhite = !isWhite;
	        }
	    }
	    return null;
	};
	
	EANReader.prototype._findPattern = function (pattern, offset, isWhite, tryHarder, epsilon) {
	    var counter = [],
	        self = this,
	        i,
	        counterPos = 0,
	        bestMatch = {
	        error: Number.MAX_VALUE,
	        code: -1,
	        start: 0,
	        end: 0
	    },
	        error,
	        j,
	        sum,
	        normalized;
	
	    if (!offset) {
	        offset = self._nextSet(self._row);
	    }
	
	    if (isWhite === undefined) {
	        isWhite = false;
	    }
	
	    if (tryHarder === undefined) {
	        tryHarder = true;
	    }
	
	    if (epsilon === undefined) {
	        epsilon = self.AVG_CODE_ERROR;
	    }
	
	    for (i = 0; i < pattern.length; i++) {
	        counter[i] = 0;
	    }
	
	    for (i = offset; i < self._row.length; i++) {
	        if (self._row[i] ^ isWhite) {
	            counter[counterPos]++;
	        } else {
	            if (counterPos === counter.length - 1) {
	                sum = 0;
	                for (j = 0; j < counter.length; j++) {
	                    sum += counter[j];
	                }
	                normalized = self._normalize(counter);
	                if (normalized) {
	                    error = self._matchPattern(normalized, pattern);
	
	                    if (error < epsilon) {
	                        bestMatch.error = error;
	                        bestMatch.start = i - sum;
	                        bestMatch.end = i;
	                        return bestMatch;
	                    }
	                }
	                if (tryHarder) {
	                    for (j = 0; j < counter.length - 2; j++) {
	                        counter[j] = counter[j + 2];
	                    }
	                    counter[counter.length - 2] = 0;
	                    counter[counter.length - 1] = 0;
	                    counterPos--;
	                } else {
	                    return null;
	                }
	            } else {
	                counterPos++;
	            }
	            counter[counterPos] = 1;
	            isWhite = !isWhite;
	        }
	    }
	    return null;
	};
	
	EANReader.prototype._findStart = function () {
	    var self = this,
	        leadingWhitespaceStart,
	        offset = self._nextSet(self._row),
	        startInfo;
	
	    while (!startInfo) {
	        startInfo = self._findPattern(self.START_PATTERN, offset);
	        if (!startInfo) {
	            return null;
	        }
	        leadingWhitespaceStart = startInfo.start - (startInfo.end - startInfo.start);
	        if (leadingWhitespaceStart >= 0) {
	            if (self._matchRange(leadingWhitespaceStart, startInfo.start, 0)) {
	                return startInfo;
	            }
	        }
	        offset = startInfo.end;
	        startInfo = null;
	    }
	};
	
	EANReader.prototype._verifyTrailingWhitespace = function (endInfo) {
	    var self = this,
	        trailingWhitespaceEnd;
	
	    trailingWhitespaceEnd = endInfo.end + (endInfo.end - endInfo.start);
	    if (trailingWhitespaceEnd < self._row.length) {
	        if (self._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
	            return endInfo;
	        }
	    }
	    return null;
	};
	
	EANReader.prototype._findEnd = function (offset, isWhite) {
	    var self = this,
	        endInfo = self._findPattern(self.STOP_PATTERN, offset, isWhite, false);
	
	    return endInfo !== null ? self._verifyTrailingWhitespace(endInfo) : null;
	};
	
	EANReader.prototype._calculateFirstDigit = function (codeFrequency) {
	    var i,
	        self = this;
	
	    for (i = 0; i < self.CODE_FREQUENCY.length; i++) {
	        if (codeFrequency === self.CODE_FREQUENCY[i]) {
	            return i;
	        }
	    }
	    return null;
	};
	
	EANReader.prototype._decodePayload = function (code, result, decodedCodes) {
	    var i,
	        self = this,
	        codeFrequency = 0x0,
	        firstDigit;
	
	    for (i = 0; i < 6; i++) {
	        code = self._decodeCode(code.end);
	        if (!code) {
	            return null;
	        }
	        if (code.code >= self.CODE_G_START) {
	            code.code = code.code - self.CODE_G_START;
	            codeFrequency |= 1 << 5 - i;
	        } else {
	            codeFrequency |= 0 << 5 - i;
	        }
	        result.push(code.code);
	        decodedCodes.push(code);
	    }
	
	    firstDigit = self._calculateFirstDigit(codeFrequency);
	    if (firstDigit === null) {
	        return null;
	    }
	    result.unshift(firstDigit);
	
	    code = self._findPattern(self.MIDDLE_PATTERN, code.end, true, false);
	    if (code === null) {
	        return null;
	    }
	    decodedCodes.push(code);
	
	    for (i = 0; i < 6; i++) {
	        code = self._decodeCode(code.end, self.CODE_G_START);
	        if (!code) {
	            return null;
	        }
	        decodedCodes.push(code);
	        result.push(code.code);
	    }
	
	    return code;
	};
	
	EANReader.prototype._decode = function () {
	    var startInfo,
	        self = this,
	        code,
	        result = [],
	        decodedCodes = [];
	
	    startInfo = self._findStart();
	    if (!startInfo) {
	        return null;
	    }
	    code = {
	        code: startInfo.code,
	        start: startInfo.start,
	        end: startInfo.end
	    };
	    decodedCodes.push(code);
	    code = self._decodePayload(code, result, decodedCodes);
	    if (!code) {
	        return null;
	    }
	    code = self._findEnd(code.end, false);
	    if (!code) {
	        return null;
	    }
	
	    decodedCodes.push(code);
	
	    // Checksum
	    if (!self._checksum(result)) {
	        return null;
	    }
	
	    return {
	        code: result.join(""),
	        start: startInfo.start,
	        end: code.end,
	        codeset: "",
	        startInfo: startInfo,
	        decodedCodes: decodedCodes
	    };
	};
	
	EANReader.prototype._checksum = function (result) {
	    var sum = 0,
	        i;
	
	    for (i = result.length - 2; i >= 0; i -= 2) {
	        sum += result[i];
	    }
	    sum *= 3;
	    for (i = result.length - 1; i >= 0; i -= 2) {
	        sum += result[i];
	    }
	    return sum % 10 === 0;
	};
	
	exports["default"] = EANReader;
	module.exports = exports["default"];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _barcode_reader = __webpack_require__(17);
	
	var _barcode_reader2 = _interopRequireDefault(_barcode_reader);
	
	var _commonArray_helper = __webpack_require__(8);
	
	var _commonArray_helper2 = _interopRequireDefault(_commonArray_helper);
	
	function Code39Reader() {
	    _barcode_reader2['default'].call(this);
	}
	
	var properties = {
	    ALPHABETH_STRING: { value: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. *$/+%" },
	    ALPHABET: { value: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 45, 46, 32, 42, 36, 47, 43, 37] },
	    CHARACTER_ENCODINGS: { value: [0x034, 0x121, 0x061, 0x160, 0x031, 0x130, 0x070, 0x025, 0x124, 0x064, 0x109, 0x049, 0x148, 0x019, 0x118, 0x058, 0x00D, 0x10C, 0x04C, 0x01C, 0x103, 0x043, 0x142, 0x013, 0x112, 0x052, 0x007, 0x106, 0x046, 0x016, 0x181, 0x0C1, 0x1C0, 0x091, 0x190, 0x0D0, 0x085, 0x184, 0x0C4, 0x094, 0x0A8, 0x0A2, 0x08A, 0x02A] },
	    ASTERISK: { value: 0x094 },
	    FORMAT: { value: "code_39", writeable: false }
	};
	
	Code39Reader.prototype = Object.create(_barcode_reader2['default'].prototype, properties);
	Code39Reader.prototype.constructor = Code39Reader;
	
	Code39Reader.prototype._toCounters = function (start, counter) {
	    var self = this,
	        numCounters = counter.length,
	        end = self._row.length,
	        isWhite = !self._row[start],
	        i,
	        counterPos = 0;
	
	    _commonArray_helper2['default'].init(counter, 0);
	
	    for (i = start; i < end; i++) {
	        if (self._row[i] ^ isWhite) {
	            counter[counterPos]++;
	        } else {
	            counterPos++;
	            if (counterPos === numCounters) {
	                break;
	            } else {
	                counter[counterPos] = 1;
	                isWhite = !isWhite;
	            }
	        }
	    }
	
	    return counter;
	};
	
	Code39Reader.prototype._decode = function () {
	    var self = this,
	        counters = [0, 0, 0, 0, 0, 0, 0, 0, 0],
	        result = [],
	        start = self._findStart(),
	        decodedChar,
	        lastStart,
	        pattern,
	        nextStart;
	
	    if (!start) {
	        return null;
	    }
	    nextStart = self._nextSet(self._row, start.end);
	
	    do {
	        counters = self._toCounters(nextStart, counters);
	        pattern = self._toPattern(counters);
	        if (pattern < 0) {
	            return null;
	        }
	        decodedChar = self._patternToChar(pattern);
	        if (decodedChar < 0) {
	            return null;
	        }
	        result.push(decodedChar);
	        lastStart = nextStart;
	        nextStart += _commonArray_helper2['default'].sum(counters);
	        nextStart = self._nextSet(self._row, nextStart);
	    } while (decodedChar !== '*');
	    result.pop();
	
	    if (!result.length) {
	        return null;
	    }
	
	    if (!self._verifyTrailingWhitespace(lastStart, nextStart, counters)) {
	        return null;
	    }
	
	    return {
	        code: result.join(""),
	        start: start.start,
	        end: nextStart,
	        startInfo: start,
	        decodedCodes: result
	    };
	};
	
	Code39Reader.prototype._verifyTrailingWhitespace = function (lastStart, nextStart, counters) {
	    var trailingWhitespaceEnd,
	        patternSize = _commonArray_helper2['default'].sum(counters);
	
	    trailingWhitespaceEnd = nextStart - lastStart - patternSize;
	    if (trailingWhitespaceEnd * 3 >= patternSize) {
	        return true;
	    }
	    return false;
	};
	
	Code39Reader.prototype._patternToChar = function (pattern) {
	    var i,
	        self = this;
	
	    for (i = 0; i < self.CHARACTER_ENCODINGS.length; i++) {
	        if (self.CHARACTER_ENCODINGS[i] === pattern) {
	            return String.fromCharCode(self.ALPHABET[i]);
	        }
	    }
	    return -1;
	};
	
	Code39Reader.prototype._findNextWidth = function (counters, current) {
	    var i,
	        minWidth = Number.MAX_VALUE;
	
	    for (i = 0; i < counters.length; i++) {
	        if (counters[i] < minWidth && counters[i] > current) {
	            minWidth = counters[i];
	        }
	    }
	
	    return minWidth;
	};
	
	Code39Reader.prototype._toPattern = function (counters) {
	    var numCounters = counters.length,
	        maxNarrowWidth = 0,
	        numWideBars = numCounters,
	        wideBarWidth = 0,
	        self = this,
	        pattern,
	        i;
	
	    while (numWideBars > 3) {
	        maxNarrowWidth = self._findNextWidth(counters, maxNarrowWidth);
	        numWideBars = 0;
	        pattern = 0;
	        for (i = 0; i < numCounters; i++) {
	            if (counters[i] > maxNarrowWidth) {
	                pattern |= 1 << numCounters - 1 - i;
	                numWideBars++;
	                wideBarWidth += counters[i];
	            }
	        }
	
	        if (numWideBars === 3) {
	            for (i = 0; i < numCounters && numWideBars > 0; i++) {
	                if (counters[i] > maxNarrowWidth) {
	                    numWideBars--;
	                    if (counters[i] * 2 >= wideBarWidth) {
	                        return -1;
	                    }
	                }
	            }
	            return pattern;
	        }
	    }
	    return -1;
	};
	
	Code39Reader.prototype._findStart = function () {
	    var self = this,
	        offset = self._nextSet(self._row),
	        patternStart = offset,
	        counter = [0, 0, 0, 0, 0, 0, 0, 0, 0],
	        counterPos = 0,
	        isWhite = false,
	        i,
	        j,
	        whiteSpaceMustStart;
	
	    for (i = offset; i < self._row.length; i++) {
	        if (self._row[i] ^ isWhite) {
	            counter[counterPos]++;
	        } else {
	            if (counterPos === counter.length - 1) {
	                // find start pattern
	                if (self._toPattern(counter) === self.ASTERISK) {
	                    whiteSpaceMustStart = Math.floor(Math.max(0, patternStart - (i - patternStart) / 4));
	                    if (self._matchRange(whiteSpaceMustStart, patternStart, 0)) {
	                        return {
	                            start: patternStart,
	                            end: i
	                        };
	                    }
	                }
	
	                patternStart += counter[0] + counter[1];
	                for (j = 0; j < 7; j++) {
	                    counter[j] = counter[j + 2];
	                }
	                counter[7] = 0;
	                counter[8] = 0;
	                counterPos--;
	            } else {
	                counterPos++;
	            }
	            counter[counterPos] = 1;
	            isWhite = !isWhite;
	        }
	    }
	    return null;
	};
	
	exports['default'] = Code39Reader;
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _code_39_reader = __webpack_require__(19);
	
	var _code_39_reader2 = _interopRequireDefault(_code_39_reader);
	
	function Code39VINReader() {
	    _code_39_reader2['default'].call(this);
	}
	
	var patterns = {
	    IOQ: /[IOQ]/g,
	    AZ09: /[A-Z0-9]{17}/
	};
	
	Code39VINReader.prototype = Object.create(_code_39_reader2['default'].prototype);
	Code39VINReader.prototype.constructor = Code39VINReader;
	
	// Cribbed from:
	// https://github.com/zxing/zxing/blob/master/core/src/main/java/com/google/zxing/client/result/VINResultParser.java
	Code39VINReader.prototype._decode = function () {
	    var result = _code_39_reader2['default'].prototype._decode.apply(this);
	    if (!result) {
	        return null;
	    }
	
	    var code = result.code;
	
	    if (!code) {
	        return null;
	    }
	
	    code = code.replace(patterns.IOQ, '');
	
	    if (!code.match(patterns.AZ09)) {
	        if (false) {
	            console.log('Failed AZ09 pattern code:', code);
	        }
	        return null;
	    }
	
	    if (!this._checkChecksum(code)) {
	        return null;
	    }
	
	    result.code = code;
	    return result;
	};
	
	Code39VINReader.prototype._checkChecksum = function (code) {
	    // TODO
	    return !!code;
	};
	
	exports['default'] = Code39VINReader;
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _barcode_reader = __webpack_require__(17);
	
	var _barcode_reader2 = _interopRequireDefault(_barcode_reader);
	
	function CodabarReader() {
	    _barcode_reader2["default"].call(this);
	    this._counters = [];
	}
	
	var properties = {
	    ALPHABETH_STRING: { value: "0123456789-$:/.+ABCD" },
	    ALPHABET: { value: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 45, 36, 58, 47, 46, 43, 65, 66, 67, 68] },
	    CHARACTER_ENCODINGS: { value: [0x003, 0x006, 0x009, 0x060, 0x012, 0x042, 0x021, 0x024, 0x030, 0x048, 0x00c, 0x018, 0x045, 0x051, 0x054, 0x015, 0x01A, 0x029, 0x00B, 0x00E] },
	    START_END: { value: [0x01A, 0x029, 0x00B, 0x00E] },
	    MIN_ENCODED_CHARS: { value: 4 },
	    MAX_ACCEPTABLE: { value: 2.0 },
	    PADDING: { value: 1.5 },
	    FORMAT: { value: "codabar", writeable: false }
	};
	
	CodabarReader.prototype = Object.create(_barcode_reader2["default"].prototype, properties);
	CodabarReader.prototype.constructor = CodabarReader;
	
	CodabarReader.prototype._decode = function () {
	    var self = this,
	        result = [],
	        start,
	        decodedChar,
	        pattern,
	        nextStart,
	        end;
	
	    this._counters = self._fillCounters();
	    start = self._findStart();
	    if (!start) {
	        return null;
	    }
	    nextStart = start.startCounter;
	
	    do {
	        pattern = self._toPattern(nextStart);
	        if (pattern < 0) {
	            return null;
	        }
	        decodedChar = self._patternToChar(pattern);
	        if (decodedChar < 0) {
	            return null;
	        }
	        result.push(decodedChar);
	        nextStart += 8;
	        if (result.length > 1 && self._isStartEnd(pattern)) {
	            break;
	        }
	    } while (nextStart < self._counters.length);
	
	    // verify end
	    if (result.length - 2 < self.MIN_ENCODED_CHARS || !self._isStartEnd(pattern)) {
	        return null;
	    }
	
	    // verify end white space
	    if (!self._verifyWhitespace(start.startCounter, nextStart - 8)) {
	        return null;
	    }
	
	    if (!self._validateResult(result, start.startCounter)) {
	        return null;
	    }
	
	    nextStart = nextStart > self._counters.length ? self._counters.length : nextStart;
	    end = start.start + self._sumCounters(start.startCounter, nextStart - 8);
	
	    return {
	        code: result.join(""),
	        start: start.start,
	        end: end,
	        startInfo: start,
	        decodedCodes: result
	    };
	};
	
	CodabarReader.prototype._verifyWhitespace = function (startCounter, endCounter) {
	    if (startCounter - 1 <= 0 || this._counters[startCounter - 1] >= this._calculatePatternLength(startCounter) / 2.0) {
	        if (endCounter + 8 >= this._counters.length || this._counters[endCounter + 7] >= this._calculatePatternLength(endCounter) / 2.0) {
	            return true;
	        }
	    }
	    return false;
	};
	
	CodabarReader.prototype._calculatePatternLength = function (offset) {
	    var i,
	        sum = 0;
	
	    for (i = offset; i < offset + 7; i++) {
	        sum += this._counters[i];
	    }
	
	    return sum;
	};
	
	CodabarReader.prototype._thresholdResultPattern = function (result, startCounter) {
	    var self = this,
	        categorization = {
	        space: {
	            narrow: { size: 0, counts: 0, min: 0, max: Number.MAX_VALUE },
	            wide: { size: 0, counts: 0, min: 0, max: Number.MAX_VALUE }
	        },
	        bar: {
	            narrow: { size: 0, counts: 0, min: 0, max: Number.MAX_VALUE },
	            wide: { size: 0, counts: 0, min: 0, max: Number.MAX_VALUE }
	        }
	    },
	        kind,
	        cat,
	        i,
	        j,
	        pos = startCounter,
	        pattern;
	
	    for (i = 0; i < result.length; i++) {
	        pattern = self._charToPattern(result[i]);
	        for (j = 6; j >= 0; j--) {
	            kind = (j & 1) === 2 ? categorization.bar : categorization.space;
	            cat = (pattern & 1) === 1 ? kind.wide : kind.narrow;
	            cat.size += self._counters[pos + j];
	            cat.counts++;
	            pattern >>= 1;
	        }
	        pos += 8;
	    }
	
	    ["space", "bar"].forEach(function (key) {
	        var newkind = categorization[key];
	        newkind.wide.min = Math.floor((newkind.narrow.size / newkind.narrow.counts + newkind.wide.size / newkind.wide.counts) / 2);
	        newkind.narrow.max = Math.ceil(newkind.wide.min);
	        newkind.wide.max = Math.ceil((newkind.wide.size * self.MAX_ACCEPTABLE + self.PADDING) / newkind.wide.counts);
	    });
	
	    return categorization;
	};
	
	CodabarReader.prototype._charToPattern = function (char) {
	    var self = this,
	        charCode = char.charCodeAt(0),
	        i;
	
	    for (i = 0; i < self.ALPHABET.length; i++) {
	        if (self.ALPHABET[i] === charCode) {
	            return self.CHARACTER_ENCODINGS[i];
	        }
	    }
	    return 0x0;
	};
	
	CodabarReader.prototype._validateResult = function (result, startCounter) {
	    var self = this,
	        thresholds = self._thresholdResultPattern(result, startCounter),
	        i,
	        j,
	        kind,
	        cat,
	        size,
	        pos = startCounter,
	        pattern;
	
	    for (i = 0; i < result.length; i++) {
	        pattern = self._charToPattern(result[i]);
	        for (j = 6; j >= 0; j--) {
	            kind = (j & 1) === 0 ? thresholds.bar : thresholds.space;
	            cat = (pattern & 1) === 1 ? kind.wide : kind.narrow;
	            size = self._counters[pos + j];
	            if (size < cat.min || size > cat.max) {
	                return false;
	            }
	            pattern >>= 1;
	        }
	        pos += 8;
	    }
	    return true;
	};
	
	CodabarReader.prototype._patternToChar = function (pattern) {
	    var i,
	        self = this;
	
	    for (i = 0; i < self.CHARACTER_ENCODINGS.length; i++) {
	        if (self.CHARACTER_ENCODINGS[i] === pattern) {
	            return String.fromCharCode(self.ALPHABET[i]);
	        }
	    }
	    return -1;
	};
	
	CodabarReader.prototype._computeAlternatingThreshold = function (offset, end) {
	    var i,
	        min = Number.MAX_VALUE,
	        max = 0,
	        counter;
	
	    for (i = offset; i < end; i += 2) {
	        counter = this._counters[i];
	        if (counter > max) {
	            max = counter;
	        }
	        if (counter < min) {
	            min = counter;
	        }
	    }
	
	    return (min + max) / 2.0 | 0;
	};
	
	CodabarReader.prototype._toPattern = function (offset) {
	    var numCounters = 7,
	        end = offset + numCounters,
	        barThreshold,
	        spaceThreshold,
	        bitmask = 1 << numCounters - 1,
	        pattern = 0,
	        i,
	        threshold;
	
	    if (end > this._counters.length) {
	        return -1;
	    }
	
	    barThreshold = this._computeAlternatingThreshold(offset, end);
	    spaceThreshold = this._computeAlternatingThreshold(offset + 1, end);
	
	    for (i = 0; i < numCounters; i++) {
	        threshold = (i & 1) === 0 ? barThreshold : spaceThreshold;
	        if (this._counters[offset + i] > threshold) {
	            pattern |= bitmask;
	        }
	        bitmask >>= 1;
	    }
	
	    return pattern;
	};
	
	CodabarReader.prototype._isStartEnd = function (pattern) {
	    var i;
	
	    for (i = 0; i < this.START_END.length; i++) {
	        if (this.START_END[i] === pattern) {
	            return true;
	        }
	    }
	    return false;
	};
	
	CodabarReader.prototype._sumCounters = function (start, end) {
	    var i,
	        sum = 0;
	
	    for (i = start; i < end; i++) {
	        sum += this._counters[i];
	    }
	    return sum;
	};
	
	CodabarReader.prototype._findStart = function () {
	    var self = this,
	        i,
	        pattern,
	        start = self._nextUnset(self._row),
	        end;
	
	    for (i = 1; i < this._counters.length; i++) {
	        pattern = self._toPattern(i);
	        if (pattern !== -1 && self._isStartEnd(pattern)) {
	            // TODO: Look for whitespace ahead
	            start += self._sumCounters(0, i);
	            end = start + self._sumCounters(i, i + 8);
	            return {
	                start: start,
	                end: end,
	                startCounter: i,
	                endCounter: i + 8
	            };
	        }
	    }
	};
	
	exports["default"] = CodabarReader;
	module.exports = exports["default"];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _ean_reader = __webpack_require__(18);
	
	var _ean_reader2 = _interopRequireDefault(_ean_reader);
	
	function UPCReader() {
	    _ean_reader2["default"].call(this);
	}
	
	var properties = {
	    FORMAT: { value: "upc_a", writeable: false }
	};
	
	UPCReader.prototype = Object.create(_ean_reader2["default"].prototype, properties);
	UPCReader.prototype.constructor = UPCReader;
	
	UPCReader.prototype._decode = function () {
	    var result = _ean_reader2["default"].prototype._decode.call(this);
	
	    if (result && result.code && result.code.length === 13 && result.code.charAt(0) === "0") {
	        result.code = result.code.substring(1);
	        return result;
	    }
	    return null;
	};
	
	exports["default"] = UPCReader;
	module.exports = exports["default"];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _ean_reader = __webpack_require__(18);
	
	var _ean_reader2 = _interopRequireDefault(_ean_reader);
	
	function EAN8Reader() {
	    _ean_reader2["default"].call(this);
	}
	
	var properties = {
	    FORMAT: { value: "ean_8", writeable: false }
	};
	
	EAN8Reader.prototype = Object.create(_ean_reader2["default"].prototype, properties);
	EAN8Reader.prototype.constructor = EAN8Reader;
	
	EAN8Reader.prototype._decodePayload = function (code, result, decodedCodes) {
	    var i,
	        self = this;
	
	    for (i = 0; i < 4; i++) {
	        code = self._decodeCode(code.end, self.CODE_G_START);
	        if (!code) {
	            return null;
	        }
	        result.push(code.code);
	        decodedCodes.push(code);
	    }
	
	    code = self._findPattern(self.MIDDLE_PATTERN, code.end, true, false);
	    if (code === null) {
	        return null;
	    }
	    decodedCodes.push(code);
	
	    for (i = 0; i < 4; i++) {
	        code = self._decodeCode(code.end, self.CODE_G_START);
	        if (!code) {
	            return null;
	        }
	        decodedCodes.push(code);
	        result.push(code.code);
	    }
	
	    return code;
	};
	
	exports["default"] = EAN8Reader;
	module.exports = exports["default"];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _ean_reader = __webpack_require__(18);
	
	var _ean_reader2 = _interopRequireDefault(_ean_reader);
	
	function UPCEReader() {
	    _ean_reader2["default"].call(this);
	}
	
	var properties = {
	    CODE_FREQUENCY: { value: [[56, 52, 50, 49, 44, 38, 35, 42, 41, 37], [7, 11, 13, 14, 19, 25, 28, 21, 22, 26]] },
	    STOP_PATTERN: { value: [1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7] },
	    FORMAT: { value: "upc_e", writeable: false }
	};
	
	UPCEReader.prototype = Object.create(_ean_reader2["default"].prototype, properties);
	UPCEReader.prototype.constructor = UPCEReader;
	
	UPCEReader.prototype._decodePayload = function (code, result, decodedCodes) {
	    var i,
	        self = this,
	        codeFrequency = 0x0;
	
	    for (i = 0; i < 6; i++) {
	        code = self._decodeCode(code.end);
	        if (!code) {
	            return null;
	        }
	        if (code.code >= self.CODE_G_START) {
	            code.code = code.code - self.CODE_G_START;
	            codeFrequency |= 1 << 5 - i;
	        }
	        result.push(code.code);
	        decodedCodes.push(code);
	    }
	    if (!self._determineParity(codeFrequency, result)) {
	        return null;
	    }
	
	    return code;
	};
	
	UPCEReader.prototype._determineParity = function (codeFrequency, result) {
	    var i, nrSystem;
	
	    for (nrSystem = 0; nrSystem < this.CODE_FREQUENCY.length; nrSystem++) {
	        for (i = 0; i < this.CODE_FREQUENCY[nrSystem].length; i++) {
	            if (codeFrequency === this.CODE_FREQUENCY[nrSystem][i]) {
	                result.unshift(nrSystem);
	                result.push(i);
	                return true;
	            }
	        }
	    }
	    return false;
	};
	
	UPCEReader.prototype._convertToUPCA = function (result) {
	    var upca = [result[0]],
	        lastDigit = result[result.length - 2];
	
	    if (lastDigit <= 2) {
	        upca = upca.concat(result.slice(1, 3)).concat([lastDigit, 0, 0, 0, 0]).concat(result.slice(3, 6));
	    } else if (lastDigit === 3) {
	        upca = upca.concat(result.slice(1, 4)).concat([0, 0, 0, 0, 0]).concat(result.slice(4, 6));
	    } else if (lastDigit === 4) {
	        upca = upca.concat(result.slice(1, 5)).concat([0, 0, 0, 0, 0, result[5]]);
	    } else {
	        upca = upca.concat(result.slice(1, 6)).concat([0, 0, 0, 0, lastDigit]);
	    }
	
	    upca.push(result[result.length - 1]);
	    return upca;
	};
	
	UPCEReader.prototype._checksum = function (result) {
	    return _ean_reader2["default"].prototype._checksum.call(this, this._convertToUPCA(result));
	};
	
	UPCEReader.prototype._findEnd = function (offset, isWhite) {
	    isWhite = true;
	    return _ean_reader2["default"].prototype._findEnd.call(this, offset, isWhite);
	};
	
	UPCEReader.prototype._verifyTrailingWhitespace = function (endInfo) {
	    var self = this,
	        trailingWhitespaceEnd;
	
	    trailingWhitespaceEnd = endInfo.end + (endInfo.end - endInfo.start) / 2;
	    if (trailingWhitespaceEnd < self._row.length) {
	        if (self._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
	            return endInfo;
	        }
	    }
	};
	
	exports["default"] = UPCEReader;
	module.exports = exports["default"];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _barcode_reader = __webpack_require__(17);
	
	var _barcode_reader2 = _interopRequireDefault(_barcode_reader);
	
	var merge = __webpack_require__(26);
	
	function I2of5Reader(opts) {
	    opts = merge(getDefaulConfig(), opts);
	    _barcode_reader2['default'].call(this, opts);
	    this.barSpaceRatio = [1, 1];
	    if (opts.normalizeBarSpaceWidth) {
	        this.SINGLE_CODE_ERROR = 0.38;
	        this.AVG_CODE_ERROR = 0.09;
	    }
	}
	
	function getDefaulConfig() {
	    var config = {};
	
	    Object.keys(I2of5Reader.CONFIG_KEYS).forEach(function (key) {
	        config[key] = I2of5Reader.CONFIG_KEYS[key]['default'];
	    });
	    return config;
	}
	
	var N = 1,
	    W = 3,
	    properties = {
	    MODULO: { value: 10 },
	    START_PATTERN: { value: [N * 2.5, N * 2.5, N * 2.5, N * 2.5] },
	    STOP_PATTERN: { value: [N * 2, N * 2, W * 2] },
	    CODE_PATTERN: { value: [[N, N, W, W, N], [W, N, N, N, W], [N, W, N, N, W], [W, W, N, N, N], [N, N, W, N, W], [W, N, W, N, N], [N, W, W, N, N], [N, N, N, W, W], [W, N, N, W, N], [N, W, N, W, N]] },
	    SINGLE_CODE_ERROR: { value: 0.78, writable: true },
	    AVG_CODE_ERROR: { value: 0.38, writable: true },
	    MAX_CORRECTION_FACTOR: { value: 5 },
	    FORMAT: { value: "i2of5" }
	};
	
	I2of5Reader.prototype = Object.create(_barcode_reader2['default'].prototype, properties);
	I2of5Reader.prototype.constructor = I2of5Reader;
	
	I2of5Reader.prototype._matchPattern = function (counter, code) {
	    if (this.config.normalizeBarSpaceWidth) {
	        var i,
	            counterSum = [0, 0],
	            codeSum = [0, 0],
	            correction = [0, 0],
	            correctionRatio = this.MAX_CORRECTION_FACTOR,
	            correctionRatioInverse = 1 / correctionRatio;
	
	        for (i = 0; i < counter.length; i++) {
	            counterSum[i % 2] += counter[i];
	            codeSum[i % 2] += code[i];
	        }
	        correction[0] = codeSum[0] / counterSum[0];
	        correction[1] = codeSum[1] / counterSum[1];
	
	        correction[0] = Math.max(Math.min(correction[0], correctionRatio), correctionRatioInverse);
	        correction[1] = Math.max(Math.min(correction[1], correctionRatio), correctionRatioInverse);
	        this.barSpaceRatio = correction;
	        for (i = 0; i < counter.length; i++) {
	            counter[i] *= this.barSpaceRatio[i % 2];
	        }
	    }
	    return _barcode_reader2['default'].prototype._matchPattern.call(this, counter, code);
	};
	
	I2of5Reader.prototype._findPattern = function (pattern, offset, isWhite, tryHarder) {
	    var counter = [],
	        self = this,
	        i,
	        counterPos = 0,
	        bestMatch = {
	        error: Number.MAX_VALUE,
	        code: -1,
	        start: 0,
	        end: 0
	    },
	        error,
	        j,
	        sum,
	        normalized,
	        epsilon = self.AVG_CODE_ERROR;
	
	    isWhite = isWhite || false;
	    tryHarder = tryHarder || false;
	
	    if (!offset) {
	        offset = self._nextSet(self._row);
	    }
	
	    for (i = 0; i < pattern.length; i++) {
	        counter[i] = 0;
	    }
	
	    for (i = offset; i < self._row.length; i++) {
	        if (self._row[i] ^ isWhite) {
	            counter[counterPos]++;
	        } else {
	            if (counterPos === counter.length - 1) {
	                sum = 0;
	                for (j = 0; j < counter.length; j++) {
	                    sum += counter[j];
	                }
	                normalized = self._normalize(counter);
	                if (normalized) {
	                    error = self._matchPattern(normalized, pattern);
	
	                    if (error < epsilon) {
	                        bestMatch.error = error;
	                        bestMatch.start = i - sum;
	                        bestMatch.end = i;
	                        return bestMatch;
	                    }
	                }
	                if (tryHarder) {
	                    for (j = 0; j < counter.length - 2; j++) {
	                        counter[j] = counter[j + 2];
	                    }
	                    counter[counter.length - 2] = 0;
	                    counter[counter.length - 1] = 0;
	                    counterPos--;
	                } else {
	                    return null;
	                }
	            } else {
	                counterPos++;
	            }
	            counter[counterPos] = 1;
	            isWhite = !isWhite;
	        }
	    }
	    return null;
	};
	
	I2of5Reader.prototype._findStart = function () {
	    var self = this,
	        leadingWhitespaceStart,
	        offset = self._nextSet(self._row),
	        startInfo,
	        narrowBarWidth = 1;
	
	    while (!startInfo) {
	        startInfo = self._findPattern(self.START_PATTERN, offset, false, true);
	        if (!startInfo) {
	            return null;
	        }
	        narrowBarWidth = Math.floor((startInfo.end - startInfo.start) / 4);
	        leadingWhitespaceStart = startInfo.start - narrowBarWidth * 10;
	        if (leadingWhitespaceStart >= 0) {
	            if (self._matchRange(leadingWhitespaceStart, startInfo.start, 0)) {
	                return startInfo;
	            }
	        }
	        offset = startInfo.end;
	        startInfo = null;
	    }
	};
	
	I2of5Reader.prototype._verifyTrailingWhitespace = function (endInfo) {
	    var self = this,
	        trailingWhitespaceEnd;
	
	    trailingWhitespaceEnd = endInfo.end + (endInfo.end - endInfo.start) / 2;
	    if (trailingWhitespaceEnd < self._row.length) {
	        if (self._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
	            return endInfo;
	        }
	    }
	    return null;
	};
	
	I2of5Reader.prototype._findEnd = function () {
	    var self = this,
	        endInfo,
	        tmp;
	
	    self._row.reverse();
	    endInfo = self._findPattern(self.STOP_PATTERN);
	    self._row.reverse();
	
	    if (endInfo === null) {
	        return null;
	    }
	
	    // reverse numbers
	    tmp = endInfo.start;
	    endInfo.start = self._row.length - endInfo.end;
	    endInfo.end = self._row.length - tmp;
	
	    return endInfo !== null ? self._verifyTrailingWhitespace(endInfo) : null;
	};
	
	I2of5Reader.prototype._decodePair = function (counterPair) {
	    var i,
	        code,
	        codes = [],
	        self = this;
	
	    for (i = 0; i < counterPair.length; i++) {
	        code = self._decodeCode(counterPair[i]);
	        if (!code) {
	            return null;
	        }
	        codes.push(code);
	    }
	    return codes;
	};
	
	I2of5Reader.prototype._decodeCode = function (counter) {
	    var j,
	        self = this,
	        sum = 0,
	        normalized,
	        error,
	        epsilon = self.AVG_CODE_ERROR,
	        code,
	        bestMatch = {
	        error: Number.MAX_VALUE,
	        code: -1,
	        start: 0,
	        end: 0
	    };
	
	    for (j = 0; j < counter.length; j++) {
	        sum += counter[j];
	    }
	    normalized = self._normalize(counter);
	    if (normalized) {
	        for (code = 0; code < self.CODE_PATTERN.length; code++) {
	            error = self._matchPattern(normalized, self.CODE_PATTERN[code]);
	            if (error < bestMatch.error) {
	                bestMatch.code = code;
	                bestMatch.error = error;
	            }
	        }
	        if (bestMatch.error < epsilon) {
	            return bestMatch;
	        }
	    }
	    return null;
	};
	
	I2of5Reader.prototype._decodePayload = function (counters, result, decodedCodes) {
	    var i,
	        self = this,
	        pos = 0,
	        counterLength = counters.length,
	        counterPair = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
	        codes;
	
	    while (pos < counterLength) {
	        for (i = 0; i < 5; i++) {
	            counterPair[0][i] = counters[pos] * this.barSpaceRatio[0];
	            counterPair[1][i] = counters[pos + 1] * this.barSpaceRatio[1];
	            pos += 2;
	        }
	        codes = self._decodePair(counterPair);
	        if (!codes) {
	            return null;
	        }
	        for (i = 0; i < codes.length; i++) {
	            result.push(codes[i].code + "");
	            decodedCodes.push(codes[i]);
	        }
	    }
	    return codes;
	};
	
	I2of5Reader.prototype._verifyCounterLength = function (counters) {
	    return counters.length % 10 === 0;
	};
	
	I2of5Reader.prototype._decode = function () {
	    var startInfo,
	        endInfo,
	        self = this,
	        code,
	        result = [],
	        decodedCodes = [],
	        counters;
	
	    startInfo = self._findStart();
	    if (!startInfo) {
	        return null;
	    }
	    decodedCodes.push(startInfo);
	
	    endInfo = self._findEnd();
	    if (!endInfo) {
	        return null;
	    }
	
	    counters = self._fillCounters(startInfo.end, endInfo.start, false);
	    if (!self._verifyCounterLength(counters)) {
	        return null;
	    }
	    code = self._decodePayload(counters, result, decodedCodes);
	    if (!code) {
	        return null;
	    }
	    if (result.length % 2 !== 0 || result.length < 6) {
	        return null;
	    }
	
	    decodedCodes.push(endInfo);
	    return {
	        code: result.join(""),
	        start: startInfo.start,
	        end: endInfo.end,
	        startInfo: startInfo,
	        decodedCodes: decodedCodes
	    };
	};
	
	I2of5Reader.CONFIG_KEYS = {
	    normalizeBarSpaceWidth: {
	        'type': 'boolean',
	        'default': false,
	        'description': 'If true, the reader tries to normalize the' + 'width-difference between bars and spaces'
	    }
	};
	
	exports['default'] = I2of5Reader;
	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(27),
	    createAssigner = __webpack_require__(54);
	
	/**
	 * Recursively merges own enumerable properties of the source object(s), that
	 * don't resolve to `undefined` into the destination object. Subsequent sources
	 * overwrite property assignments of previous sources. If `customizer` is
	 * provided it's invoked to produce the merged values of the destination and
	 * source properties. If `customizer` returns `undefined` merging is handled
	 * by the method instead. The `customizer` is bound to `thisArg` and invoked
	 * with five arguments: (objectValue, sourceValue, key, object, source).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var users = {
	 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	 * };
	 *
	 * var ages = {
	 *   'data': [{ 'age': 36 }, { 'age': 40 }]
	 * };
	 *
	 * _.merge(users, ages);
	 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	 *
	 * // using a customizer callback
	 * var object = {
	 *   'fruits': ['apple'],
	 *   'vegetables': ['beet']
	 * };
	 *
	 * var other = {
	 *   'fruits': ['banana'],
	 *   'vegetables': ['carrot']
	 * };
	 *
	 * _.merge(object, other, function(a, b) {
	 *   if (_.isArray(a)) {
	 *     return a.concat(b);
	 *   }
	 * });
	 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
	 */
	var merge = createAssigner(baseMerge);
	
	module.exports = merge;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(28),
	    baseMergeDeep = __webpack_require__(29),
	    isArray = __webpack_require__(37),
	    isArrayLike = __webpack_require__(32),
	    isObject = __webpack_require__(41),
	    isObjectLike = __webpack_require__(36),
	    isTypedArray = __webpack_require__(49),
	    keys = __webpack_require__(52);
	
	/**
	 * The base implementation of `_.merge` without support for argument juggling,
	 * multiple sources, and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {Object} Returns `object`.
	 */
	function baseMerge(object, source, customizer, stackA, stackB) {
	  if (!isObject(object)) {
	    return object;
	  }
	  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
	      props = isSrcArr ? undefined : keys(source);
	
	  arrayEach(props || source, function(srcValue, key) {
	    if (props) {
	      key = srcValue;
	      srcValue = source[key];
	    }
	    if (isObjectLike(srcValue)) {
	      stackA || (stackA = []);
	      stackB || (stackB = []);
	      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
	    }
	    else {
	      var value = object[key],
	          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	          isCommon = result === undefined;
	
	      if (isCommon) {
	        result = srcValue;
	      }
	      if ((result !== undefined || (isSrcArr && !(key in object))) &&
	          (isCommon || (result === result ? (result !== value) : (value === value)))) {
	        object[key] = result;
	      }
	    }
	  });
	  return object;
	}
	
	module.exports = baseMerge;


/***/ },
/* 28 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}
	
	module.exports = arrayEach;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(30),
	    isArguments = __webpack_require__(31),
	    isArray = __webpack_require__(37),
	    isArrayLike = __webpack_require__(32),
	    isPlainObject = __webpack_require__(42),
	    isTypedArray = __webpack_require__(49),
	    toPlainObject = __webpack_require__(50);
	
	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
	  var length = stackA.length,
	      srcValue = source[key];
	
	  while (length--) {
	    if (stackA[length] == srcValue) {
	      object[key] = stackB[length];
	      return;
	    }
	  }
	  var value = object[key],
	      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	      isCommon = result === undefined;
	
	  if (isCommon) {
	    result = srcValue;
	    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
	      result = isArray(value)
	        ? value
	        : (isArrayLike(value) ? arrayCopy(value) : []);
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      result = isArguments(value)
	        ? toPlainObject(value)
	        : (isPlainObject(value) ? value : {});
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  // Add the source value to the stack of traversed objects and associate
	  // it with its merged value.
	  stackA.push(srcValue);
	  stackB.push(result);
	
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
	  } else if (result === result ? (result !== value) : (value === value)) {
	    object[key] = result;
	  }
	}
	
	module.exports = baseMergeDeep;


/***/ },
/* 30 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function arrayCopy(source, array) {
	  var index = -1,
	      length = source.length;
	
	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}
	
	module.exports = arrayCopy;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(32),
	    isObjectLike = __webpack_require__(36);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}
	
	module.exports = isArguments;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(33),
	    isLength = __webpack_require__(35);
	
	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}
	
	module.exports = isArrayLike;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(34);
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	module.exports = getLength;


/***/ },
/* 34 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	module.exports = baseProperty;


/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ },
/* 36 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(38),
	    isLength = __webpack_require__(35),
	    isObjectLike = __webpack_require__(36);
	
	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};
	
	module.exports = isArray;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(39);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}
	
	module.exports = getNative;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(40),
	    isObjectLike = __webpack_require__(36);
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}
	
	module.exports = isNative;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(41);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 41 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var baseForIn = __webpack_require__(43),
	    isArguments = __webpack_require__(31),
	    isObjectLike = __webpack_require__(36);
	
	/** `Object#toString` result references. */
	var objectTag = '[object Object]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * **Note:** This method assumes objects created by the `Object` constructor
	 * have no inherited enumerable properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  var Ctor;
	
	  // Exit early for non `Object` objects.
	  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
	      (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
	    return false;
	  }
	  // IE < 9 iterates inherited properties before own properties. If the first
	  // iterated property is an object's own property then there are no inherited
	  // enumerable properties.
	  var result;
	  // In most environments an object's own properties are iterated before
	  // its inherited properties. If the last iterated property is an object's
	  // own property then there are no inherited enumerable properties.
	  baseForIn(value, function(subValue, key) {
	    result = key;
	  });
	  return result === undefined || hasOwnProperty.call(value, result);
	}
	
	module.exports = isPlainObject;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(44),
	    keysIn = __webpack_require__(47);
	
	/**
	 * The base implementation of `_.forIn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForIn(object, iteratee) {
	  return baseFor(object, iteratee, keysIn);
	}
	
	module.exports = baseForIn;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(45);
	
	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();
	
	module.exports = baseFor;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(46);
	
	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;
	
	    while ((fromRight ? index-- : ++index < length)) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}
	
	module.exports = createBaseFor;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(41);
	
	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}
	
	module.exports = toObject;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(31),
	    isArray = __webpack_require__(37),
	    isIndex = __webpack_require__(48),
	    isLength = __webpack_require__(35),
	    isObject = __webpack_require__(41);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;
	
	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;
	
	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keysIn;


/***/ },
/* 48 */
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;
	
	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	module.exports = isIndex;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(35),
	    isObjectLike = __webpack_require__(36);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}
	
	module.exports = isTypedArray;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(51),
	    keysIn = __webpack_require__(47);
	
	/**
	 * Converts `value` to a plain object flattening inherited enumerable
	 * properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return baseCopy(value, keysIn(value));
	}
	
	module.exports = toPlainObject;


/***/ },
/* 51 */
/***/ function(module, exports) {

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function baseCopy(source, props, object) {
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}
	
	module.exports = baseCopy;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(38),
	    isArrayLike = __webpack_require__(32),
	    isObject = __webpack_require__(41),
	    shimKeys = __webpack_require__(53);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};
	
	module.exports = keys;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(31),
	    isArray = __webpack_require__(37),
	    isIndex = __webpack_require__(48),
	    isLength = __webpack_require__(35),
	    keysIn = __webpack_require__(47);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;
	
	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));
	
	  var index = -1,
	      result = [];
	
	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = shimKeys;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(55),
	    isIterateeCall = __webpack_require__(57),
	    restParam = __webpack_require__(58);
	
	/**
	 * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return restParam(function(object, sources) {
	    var index = -1,
	        length = object == null ? 0 : sources.length,
	        customizer = length > 2 ? sources[length - 2] : undefined,
	        guard = length > 2 ? sources[2] : undefined,
	        thisArg = length > 1 ? sources[length - 1] : undefined;
	
	    if (typeof customizer == 'function') {
	      customizer = bindCallback(customizer, thisArg, 5);
	      length -= 2;
	    } else {
	      customizer = typeof thisArg == 'function' ? thisArg : undefined;
	      length -= (customizer ? 1 : 0);
	    }
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, customizer);
	      }
	    }
	    return object;
	  });
	}
	
	module.exports = createAssigner;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(56);
	
	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}
	
	module.exports = bindCallback;


/***/ },
/* 56 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(32),
	    isIndex = __webpack_require__(48),
	    isObject = __webpack_require__(41);
	
	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    var other = object[index];
	    return value === value ? (value === other) : (other !== other);
	  }
	  return false;
	}
	
	module.exports = isIterateeCall;


/***/ },
/* 58 */
/***/ function(module, exports) {

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);
	
	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, rest);
	      case 1: return func.call(this, args[0], rest);
	      case 2: return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}
	
	module.exports = restParam;


/***/ },
/* 59 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports["default"] = (function () {
	    var events = {};
	
	    function getEvent(eventName) {
	        if (!events[eventName]) {
	            events[eventName] = {
	                subscribers: []
	            };
	        }
	        return events[eventName];
	    }
	
	    function clearEvents() {
	        events = {};
	    }
	
	    function publishSubscription(subscription, data) {
	        if (subscription.async) {
	            setTimeout(function () {
	                subscription.callback(data);
	            }, 4);
	        } else {
	            subscription.callback(data);
	        }
	    }
	
	    function _subscribe(event, callback, async) {
	        var subscription;
	
	        if (typeof callback === "function") {
	            subscription = {
	                callback: callback,
	                async: async
	            };
	        } else {
	            subscription = callback;
	            if (!subscription.callback) {
	                throw "Callback was not specified on options";
	            }
	        }
	
	        getEvent(event).subscribers.push(subscription);
	    }
	
	    return {
	        subscribe: function subscribe(event, callback, async) {
	            return _subscribe(event, callback, async);
	        },
	        publish: function publish(eventName, data) {
	            var event = getEvent(eventName),
	                subscribers = event.subscribers;
	
	            event.subscribers = subscribers.filter(function (subscriber) {
	                publishSubscription(subscriber, data);
	                return !subscriber.once;
	            });
	        },
	        once: function once(event, callback, async) {
	            _subscribe(event, {
	                callback: callback,
	                async: async,
	                once: true
	            });
	        },
	        unsubscribe: function unsubscribe(eventName, callback) {
	            var event;
	
	            if (eventName) {
	                event = getEvent(eventName);
	                if (event && callback) {
	                    event.subscribers = event.subscribers.filter(function (subscriber) {
	                        return subscriber.callback !== callback;
	                    });
	                } else {
	                    event.subscribers = [];
	                }
	            } else {
	                clearEvents();
	            }
	        }
	    };
	})();
	
	module.exports = exports["default"];

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var merge = __webpack_require__(26);
	
	var streamRef, loadedDataHandler;
	
	/**
	 * Wraps browser-specific getUserMedia
	 * @param {Object} constraints
	 * @param {Object} success Callback
	 * @param {Object} failure Callback
	 */
	function getUserMedia(constraints, success, failure) {
	    if (typeof navigator.getUserMedia !== 'undefined') {
	        navigator.getUserMedia(constraints, function (stream) {
	            streamRef = stream;
	            var videoSrc = window.URL && window.URL.createObjectURL(stream) || stream;
	            success.apply(null, [videoSrc]);
	        }, failure);
	    } else {
	        failure(new TypeError("getUserMedia not available"));
	    }
	}
	
	function loadedData(video, callback) {
	    var attempts = 10;
	
	    function checkVideo() {
	        if (attempts > 0) {
	            if (video.videoWidth > 0 && video.videoHeight > 0) {
	                if (false) {
	                    console.log(video.videoWidth + "px x " + video.videoHeight + "px");
	                }
	                callback();
	            } else {
	                window.setTimeout(checkVideo, 500);
	            }
	        } else {
	            callback('Unable to play video stream. Is webcam working?');
	        }
	        attempts--;
	    }
	    checkVideo();
	}
	
	/**
	 * Tries to attach the camera-stream to a given video-element
	 * and calls the callback function when the content is ready
	 * @param {Object} constraints
	 * @param {Object} video
	 * @param {Object} callback
	 */
	function initCamera(constraints, video, callback) {
	    getUserMedia(constraints, function (src) {
	        video.src = src;
	        if (loadedDataHandler) {
	            video.removeEventListener("loadeddata", loadedDataHandler, false);
	        }
	        loadedDataHandler = loadedData.bind(null, video, callback);
	        video.addEventListener('loadeddata', loadedDataHandler, false);
	        video.play();
	    }, function (e) {
	        callback(e);
	    });
	}
	
	/**
	 * Normalizes the incoming constraints to satisfy the current browser
	 * @param config
	 * @param cb Callback which is called whenever constraints are created
	 * @returns {*}
	 */
	function normalizeConstraints(config, cb) {
	    var constraints = {
	        audio: false,
	        video: true
	    },
	        videoConstraints = merge({
	        width: 640,
	        height: 480,
	        minAspectRatio: 0,
	        maxAspectRatio: 100,
	        facing: "environment"
	    }, config);
	
	    if (typeof MediaStreamTrack !== 'undefined' && typeof MediaStreamTrack.getSources !== 'undefined') {
	        MediaStreamTrack.getSources(function (sourceInfos) {
	            var videoSourceId;
	            for (var i = 0; i < sourceInfos.length; ++i) {
	                var sourceInfo = sourceInfos[i];
	                if (sourceInfo.kind === "video" && sourceInfo.facing === videoConstraints.facing) {
	                    videoSourceId = sourceInfo.id;
	                }
	            }
	            constraints.video = {
	                mandatory: {
	                    minWidth: videoConstraints.width,
	                    minHeight: videoConstraints.height,
	                    minAspectRatio: videoConstraints.minAspectRatio,
	                    maxAspectRatio: videoConstraints.maxAspectRatio
	                },
	                optional: [{
	                    sourceId: videoSourceId
	                }]
	            };
	            return cb(constraints);
	        });
	    } else {
	        constraints.video = {
	            mediaSource: "camera",
	            width: { min: videoConstraints.width, max: videoConstraints.width },
	            height: { min: videoConstraints.height, max: videoConstraints.height },
	            require: ["width", "height"]
	        };
	        return cb(constraints);
	    }
	}
	
	/**
	 * Requests the back-facing camera of the user. The callback is called
	 * whenever the stream is ready to be consumed, or if an error occures.
	 * @param {Object} video
	 * @param {Object} callback
	 */
	function _request(video, videoConstraints, callback) {
	    normalizeConstraints(videoConstraints, function (constraints) {
	        initCamera(constraints, video, callback);
	    });
	}
	
	exports['default'] = {
	    request: function request(video, constraints, callback) {
	        _request(video, constraints, callback);
	    },
	    release: function release() {
	        var tracks = streamRef && streamRef.getVideoTracks();
	        if (tracks && tracks.length) {
	            tracks[0].stop();
	        }
	        streamRef = null;
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonImage_debug = __webpack_require__(10);
	
	var _commonImage_debug2 = _interopRequireDefault(_commonImage_debug);
	
	function contains(codeResult, list) {
	    if (list) {
	        return list.some(function (item) {
	            return Object.keys(item).every(function (key) {
	                return item[key] === codeResult[key];
	            });
	        });
	    }
	    return false;
	}
	
	function passesFilter(codeResult, filter) {
	    if (typeof filter === 'function') {
	        return filter(codeResult);
	    }
	    return true;
	}
	
	exports['default'] = {
	    create: function create(config) {
	        var canvas = document.createElement("canvas"),
	            ctx = canvas.getContext("2d"),
	            results = [],
	            capacity = config.capacity || 20,
	            capture = config.capture === true;
	
	        function matchesConstraints(codeResult) {
	            return capacity && codeResult && !contains(codeResult, config.blacklist) && passesFilter(codeResult, config.filter);
	        }
	
	        return {
	            addResult: function addResult(data, imageSize, codeResult) {
	                var result = {};
	
	                if (matchesConstraints(codeResult)) {
	                    capacity--;
	                    result.codeResult = codeResult;
	                    if (capture) {
	                        canvas.width = imageSize.x;
	                        canvas.height = imageSize.y;
	                        _commonImage_debug2['default'].drawImage(data, imageSize, ctx);
	                        result.frame = canvas.toDataURL();
	                    }
	                    results.push(result);
	                }
	            },
	            getResults: function getResults() {
	                return results;
	            }
	        };
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var config = undefined;
	
	if (false) {
	    config = require('./config.dev.js');
	} else if (true) {
	    config = __webpack_require__(63);
	} else {
	    config = require('./config.prod.js');
	}
	
	exports['default'] = config;
	module.exports = exports['default'];

/***/ },
/* 63 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	    inputStream: {
	        type: "ImageStream",
	        sequence: false,
	        size: 800,
	        area: {
	            top: "0%",
	            right: "0%",
	            left: "0%",
	            bottom: "0%"
	        },
	        singleChannel: false // true: only the red color-channel is read
	    },
	    locate: true,
	    numOfWorkers: 0,
	    decoder: {
	        readers: ['code_128_reader']
	    },
	    locator: {
	        halfSample: true,
	        patchSize: "medium" // x-small, small, medium, large, x-large
	    }
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var GetPixels = __webpack_require__(65);
	
	var InputStream = {};
	
	InputStream.createImageStream = function () {
	    var that = {};
	    var _config = null;
	
	    var width = 0,
	        height = 0,
	        frameIdx = 0,
	        paused = true,
	        loaded = false,
	        frame = null,
	        baseUrl,
	        ended = false,
	        size,
	        calculatedWidth,
	        calculatedHeight,
	        _eventNames = ['canrecord', 'ended'],
	        _eventHandlers = {},
	        _topRight = { x: 0, y: 0 },
	        _canvasSize = { x: 0, y: 0 };
	
	    function loadImages() {
	        loaded = false;
	        GetPixels(baseUrl, function (err, pixels) {
	            if (err) {
	                console.log(err);
	                exit(1);
	            }
	            loaded = true;
	            console.log(pixels.shape);
	            frame = pixels;
	            width = pixels.shape[0];
	            height = pixels.shape[1];
	            calculatedWidth = _config.size ? width / height > 1 ? _config.size : Math.floor(width / height * _config.size) : width;
	            calculatedHeight = _config.size ? width / height > 1 ? Math.floor(height / width * _config.size) : _config.size : height;
	
	            _canvasSize.x = calculatedWidth;
	            _canvasSize.y = calculatedHeight;
	
	            setTimeout(function () {
	                publishEvent("canrecord", []);
	            }, 0);
	        });
	    }
	
	    function publishEvent(eventName, args) {
	        var j,
	            handlers = _eventHandlers[eventName];
	
	        if (handlers && handlers.length > 0) {
	            for (j = 0; j < handlers.length; j++) {
	                handlers[j].apply(that, args);
	            }
	        }
	    }
	
	    that.trigger = publishEvent;
	
	    that.getWidth = function () {
	        return calculatedWidth;
	    };
	
	    that.getHeight = function () {
	        return calculatedHeight;
	    };
	
	    that.setWidth = function (width) {
	        calculatedWidth = width;
	    };
	
	    that.setHeight = function (height) {
	        calculatedHeight = height;
	    };
	
	    that.getRealWidth = function () {
	        return width;
	    };
	
	    that.getRealHeight = function () {
	        return height;
	    };
	
	    that.setInputStream = function (stream) {
	        _config = stream;
	        baseUrl = _config.src;
	        size = 1;
	        loadImages();
	    };
	
	    that.ended = function () {
	        return ended;
	    };
	
	    that.setAttribute = function () {};
	
	    that.getConfig = function () {
	        return _config;
	    };
	
	    that.pause = function () {
	        paused = true;
	    };
	
	    that.play = function () {
	        paused = false;
	    };
	
	    that.setCurrentTime = function (time) {
	        frameIdx = time;
	    };
	
	    that.addEventListener = function (event, f) {
	        if (_eventNames.indexOf(event) !== -1) {
	            if (!_eventHandlers[event]) {
	                _eventHandlers[event] = [];
	            }
	            _eventHandlers[event].push(f);
	        }
	    };
	
	    that.setTopRight = function (topRight) {
	        _topRight.x = topRight.x;
	        _topRight.y = topRight.y;
	    };
	
	    that.getTopRight = function () {
	        return _topRight;
	    };
	
	    that.setCanvasSize = function (size) {
	        _canvasSize.x = size.x;
	        _canvasSize.y = size.y;
	    };
	
	    that.getCanvasSize = function () {
	        return _canvasSize;
	    };
	
	    that.getFrame = function () {
	        if (!loaded) {
	            return null;
	        }
	        return frame;
	    };
	
	    return that;
	};
	
	module.exports = InputStream;

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = require("get-pixels");

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var CVUtils = __webpack_require__(5),
	    Ndarray = __webpack_require__(67),
	    Interp2D = __webpack_require__(68).d2;
	
	var FrameGrabber = {};
	
	FrameGrabber.create = function (inputStream) {
	    var _that = {},
	        _streamConfig = inputStream.getConfig(),
	        _video_size = CVUtils.imageRef(inputStream.getRealWidth(), inputStream.getRealHeight()),
	        _canvasSize = inputStream.getCanvasSize(),
	        _size = CVUtils.imageRef(inputStream.getWidth(), inputStream.getHeight()),
	        _topRight = inputStream.getTopRight(),
	        _data = new Uint8Array(_size.x * _size.y),
	        _grayData = new Uint8Array(_video_size.x * _video_size.y),
	        _canvasData = new Uint8Array(_canvasSize.x * _canvasSize.y),
	        _grayImageArray = Ndarray(_grayData, [_video_size.y, _video_size.x]).transpose(1, 0),
	        _canvasImageArray = Ndarray(_canvasData, [_canvasSize.y, _canvasSize.x]).transpose(1, 0),
	        _targetImageArray = _canvasImageArray.hi(_topRight.x + _size.x, _topRight.y + _size.y).lo(_topRight.x, _topRight.y),
	        _stepSizeX = _video_size.x / _canvasSize.x,
	        _stepSizeY = _video_size.y / _canvasSize.y;
	
	    console.log("FrameGrabber", JSON.stringify({
	        videoSize: _grayImageArray.shape,
	        canvasSize: _canvasImageArray.shape,
	        stepSize: [_stepSizeX, _stepSizeY],
	        size: _targetImageArray.shape,
	        topRight: _topRight
	    }));
	
	    /**
	     * Uses the given array as frame-buffer
	     */
	    _that.attachData = function (data) {
	        _data = data;
	    };
	
	    /**
	     * Returns the used frame-buffer
	     */
	    _that.getData = function () {
	        return _data;
	    };
	
	    /**
	     * Fetches a frame from the input-stream and puts into the frame-buffer.
	     * The image-data is converted to gray-scale and then half-sampled if configured.
	     */
	    _that.grab = function () {
	        var frame = inputStream.getFrame();
	
	        if (frame) {
	            this.scaleAndCrop(frame);
	            return true;
	        } else {
	            return false;
	        }
	    };
	
	    _that.scaleAndCrop = function (frame) {
	        var x, y;
	
	        // 1. compute full-sized gray image
	        CVUtils.computeGray(frame.data, _grayData);
	
	        // 2. interpolate
	        for (y = 0; y < _canvasSize.y; y++) {
	            for (x = 0; x < _canvasSize.x; x++) {
	                _canvasImageArray.set(x, y, Interp2D(_grayImageArray, x * _stepSizeX, y * _stepSizeY) | 0);
	            }
	        }
	
	        // targetImageArray must be equal to targetSize
	        if (_targetImageArray.shape[0] !== _size.x || _targetImageArray.shape[1] !== _size.y) {
	            throw new Error("Shapes do not match!");
	        }
	
	        // 3. crop
	        for (y = 0; y < _size.y; y++) {
	            for (x = 0; x < _size.x; x++) {
	                _data[y * _size.x + x] = _targetImageArray.get(x, y);
	            }
	        }
	    }, _that.getSize = function () {
	        return _size;
	    };
	
	    return _that;
	};
	
	module.exports = FrameGrabber;

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = require("ndarray");

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = require("ndarray-linear-interpolate");

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjBhZjk5ZDA0NmRjYTk5Zjg4NjIiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3F1YWdnYS5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvY29tbW9uL3R5cGVkZWZzLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vaW1hZ2Vfd3JhcHBlci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvY29tbW9uL3N1YkltYWdlLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vY3ZfdXRpbHMuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvbW1vbi9jbHVzdGVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImdsLW1hdHJpeFwiIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vYXJyYXlfaGVscGVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9sb2NhdG9yL2JhcmNvZGVfbG9jYXRvci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvY29tbW9uL2ltYWdlX2RlYnVnLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9sb2NhdG9yL3Jhc3Rlcml6ZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2xvY2F0b3IvdHJhY2VyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9sb2NhdG9yL3NrZWxldG9uaXplci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvZGVjb2Rlci9iYXJjb2RlX2RlY29kZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2RlY29kZXIvYnJlc2VuaGFtLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvY29kZV8xMjhfcmVhZGVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvYmFyY29kZV9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9lYW5fcmVhZGVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvY29kZV8zOV9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9jb2RlXzM5X3Zpbl9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9jb2RhYmFyX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL3VwY19yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9lYW5fOF9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci91cGNfZV9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9pMm9mNV9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvb2JqZWN0L21lcmdlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2Jhc2VNZXJnZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9hcnJheUVhY2guanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZU1lcmdlRGVlcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9hcnJheUNvcHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbGFuZy9pc0FyZ3VtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9pc0FycmF5TGlrZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9nZXRMZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2lzTGVuZ3RoLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2lzT2JqZWN0TGlrZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9sYW5nL2lzQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvZ2V0TmF0aXZlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvaXNOYXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbGFuZy9pc0Z1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvaXNPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbGFuZy9pc1BsYWluT2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2Jhc2VGb3JJbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlRm9yLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2NyZWF0ZUJhc2VGb3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvdG9PYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvb2JqZWN0L2tleXNJbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9pc0luZGV4LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvaXNUeXBlZEFycmF5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvdG9QbGFpbk9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlQ29weS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9zaGltS2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9jcmVhdGVBc3NpZ25lci5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9iaW5kQ2FsbGJhY2suanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvdXRpbGl0eS9pZGVudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9pc0l0ZXJhdGVlQ2FsbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9mdW5jdGlvbi9yZXN0UGFyYW0uanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvbW1vbi9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2lucHV0L2NhbWVyYV9hY2Nlc3MuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2FuYWx5dGljcy9yZXN1bHRfY29sbGVjdG9yLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jb25maWcvY29uZmlnLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jb25maWcvY29uZmlnLm5vZGUuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvbGliL2lucHV0X3N0cmVhbS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJnZXQtcGl4ZWxzXCIiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvbGliL2ZyYW1lX2dyYWJiZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmRhcnJheVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5kYXJyYXktbGluZWFyLWludGVycG9sYXRlXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QUFDO0FBQ2pDLFNBQUksaUJBQWlCLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQztBQUM3QyxTQUFJLEdBQUcsR0FBRyxDQUFDO1NBQUUsQ0FBQztTQUFFLENBQUM7U0FBRSxNQUFNLEdBQUcsQ0FBQztTQUFFLENBQUM7U0FBRSxDQUFDO1NBQUUsQ0FBQztTQUFFLENBQUM7U0FBRSxHQUFHO1NBQUUsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7O0FBRzNGLFVBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzNCLGNBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3pCLHVCQUFVLENBQUcsQ0FBQyxHQUFJLEtBQUssR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEMsdUJBQVUsQ0FBRSxDQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUksQ0FBQyxJQUFJLEtBQUssR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7VUFDcEQ7TUFDSjs7O0FBR0QsVUFBTSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3hDLGNBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzNCLHVCQUFVLENBQUcsQ0FBQyxHQUFJLEtBQUssR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEMsdUJBQVUsQ0FBRyxDQUFDLEdBQUksS0FBSyxJQUFLLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7VUFDbkQ7TUFDSjs7QUFFRCxVQUFNLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFN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LFVBQVUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUNyQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQ3JDLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FDM0MsS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUMzQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFDNUMsS0FBSyxHQUFHLFVBQVUsQ0FBRSxZQUFZLEdBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUMxQyxLQUFLLEdBQUcsVUFBVSxDQUFFLFlBQVksR0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQzFDLEtBQUssR0FBRyxVQUFVLENBQUUsWUFBWSxHQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUMzQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQzlDLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FDOUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLEdBQUksQ0FBQyxDQUFDLENBQUM7QUFDM0Qsc0JBQVMsRUFBRSxDQUFDO0FBQ1osc0JBQVMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLHlCQUFZLEdBQUcsWUFBWSxHQUFHLENBQUMsQ0FBQztVQUNuQztBQUNELGtCQUFTLEdBQUcsU0FBUyxHQUFHLE9BQU8sQ0FBQztBQUNoQyxxQkFBWSxHQUFHLFlBQVksR0FBRyxPQUFPLENBQUM7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LENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFFLENBQUMsR0FBRyxFQUFFLEdBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3hDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztTQUNULENBQUMsR0FBRyxDQUFDO1NBQ0wsQ0FBQyxHQUFHLENBQUM7U0FDTCxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVWLFFBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztBQUV2QixTQUFJLENBQUMsR0FBRyxFQUFFLEVBQUU7QUFDUixVQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ04sVUFBQyxHQUFHLENBQUMsQ0FBQztNQUNULE1BQU0sSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFO0FBQ2hCLFVBQUMsR0FBRyxDQUFDLENBQUM7QUFDTixVQUFDLEdBQUcsQ0FBQyxDQUFDO01BQ1QsTUFBTSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUU7QUFDaEIsVUFBQyxHQUFHLENBQUMsQ0FBQztBQUNOLFVBQUMsR0FBRyxDQUFDLENBQUM7TUFDVCxNQUFNLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRTtBQUNoQixVQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ04sVUFBQyxHQUFHLENBQUMsQ0FBQztNQUNULE1BQU0sSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFO0FBQ2hCLFVBQUMsR0FBRyxDQUFDLENBQUM7QUFDTixVQUFDLEdBQUcsQ0FBQyxDQUFDO01BQ1QsTUFBTSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUU7QUFDaEIsVUFBQyxHQUFHLENBQUMsQ0FBQztBQUNOLFVBQUMsR0FBRyxDQUFDLENBQUM7TUFDVDtBQUNELFFBQUcsQ0FBQyxDQUFDLENBQUMsR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFJLENBQUMsQ0FBQztBQUM3QixRQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBSSxDQUFD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LENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxFQUFFLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1VBQy9HO01BQ0o7OztBQUdELFVBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNsQyxjQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25CLGNBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3JCLGlCQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQ3hCLHFCQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUMxQjtBQUNELGlCQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQ3hCLHFCQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUMxQjtBQUNELGlCQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQ3hCLHFCQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUMxQjtBQUNELGlCQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQ3hCLHFCQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztj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RSxHQUFHLEVBQUM7QUFDcEIsV0FBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQztBQUNwQixpQkFBWSxFQUFFLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQztBQUMxQixpQkFBWSxFQUFFLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQztBQUMxQixpQkFBWSxFQUFFLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQztBQUMxQixjQUFTLEVBQUUsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFDO0FBQ3ZCLFdBQU0sRUFBRSxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUM7QUFDbkIsaUJBQVksRUFBRSxFQUFDLEtBQUssRUFBRSxDQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQ3hCLEVBQUM7QUFDRixzQkFBaUIsRUFBRSxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUM7QUFDN0IsbUJBQWMsRUFBRSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUM7QUFDNUIsV0FBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFDO0VBQ2hELENBQUM7O0FBRUYsY0FBYSxDQUFDLFNBQVMsR0FBRyxNQUFNLENB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QUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDO0FBQ2hGLGlCQUFZLEVBQUUsRUFBQyxLQUFLLEVBQUUsQ0FDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNa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QTtBQUNBLFlBQVcsUUFBUTtBQUNuQixjQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDMUJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxFQUFFO0FBQ2IsY0FBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixjQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDL0RBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsRUFBRTtBQUNiLFlBQVcsT0FBTztBQUNsQixjQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDdkJBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FB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QUNoRztVQUNKOzs7QUFHRCxhQUFJLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxJQUN0QyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtBQUN4QyxtQkFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1VBQzNDOzs7QUFHRCxjQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDMUIsa0JBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMxQixzQkFBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Y0FDeEQ7VUFDSjtNQUNKLEVBRUQsS0FBSyxDQUFDLE9BQU8sR0FBRyxZQUFXO0FBQ3ZCLGdCQUFPLEtBQUssQ0FBQztNQUNoQixDQUFDOztBQUVGLFlBQU8sS0FBSyxDQUFDO0VBQ2hCLENBQUM7O0FBRUYsT0FBTSxDQUFDLE9BQU8sR0FBRyxZQUFZLEM7Ozs7OztBQzlGN0IscUM7Ozs7OztBQ0FBLHdEIiwiZmlsZSI6InF1YWdnYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGIwYWY5OWQwNDZkY2E5OWY4ODYyXG4gKiovIiwiaW1wb3J0IFR5cGVEZWZzIGZyb20gJy4vY29tbW9uL3R5cGVkZWZzJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG5pbXBvcnQgSW1hZ2VXcmFwcGVyIGZyb20gJy4vY29tbW9uL2ltYWdlX3dyYXBwZXInO1xyXG5pbXBvcnQgQmFyY29kZUxvY2F0b3IgZnJvbSAnLi9sb2NhdG9yL2JhcmNvZGVfbG9jYXRvcic7XHJcbmltcG9ydCBCYXJjb2RlRGVjb2RlciBmcm9tICcuL2RlY29kZXIvYmFyY29kZV9kZWNvZGVyJztcclxuaW1wb3J0IEV2ZW50cyBmcm9tICcuL2NvbW1vbi9ldmVudHMnO1xyXG5pbXBvcnQgQ2FtZXJhQWNjZXNzIGZyb20gJy4vaW5wdXQvY2FtZXJhX2FjY2Vzcyc7XHJcbmltcG9ydCBJbWFnZURlYnVnIGZyb20gJy4vY29tbW9uL2ltYWdlX2RlYnVnJztcclxuaW1wb3J0IHt2ZWMyfSBmcm9tICdnbC1tYXRyaXgnO1xyXG5pbXBvcnQgUmVzdWx0Q29sbGVjdG9yIGZyb20gJy4vYW5hbHl0aWNzL3Jlc3VsdF9jb2xsZWN0b3InO1xyXG5pbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uZmlnL2NvbmZpZyc7XHJcbmltcG9ydCBJbnB1dFN0cmVhbSBmcm9tICdpbnB1dF9zdHJlYW0nO1xyXG5pbXBvcnQgRnJhbWVHcmFiYmVyIGZyb20gJ2ZyYW1lX2dyYWJiZXInO1xyXG5cclxuY29uc3QgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L21lcmdlJyk7XHJcblxyXG52YXIgX2lucHV0U3RyZWFtLFxyXG4gICAgX2ZyYW1lZ3JhYmJlcixcclxuICAgIF9zdG9wcGVkLFxyXG4gICAgX2NhbnZhc0NvbnRhaW5lciA9IHtcclxuICAgICAgICBjdHg6IHtcclxuICAgICAgICAgICAgaW1hZ2U6IG51bGwsXHJcbiAgICAgICAgICAgIG92ZXJsYXk6IG51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRvbToge1xyXG4gICAgICAgICAgICBpbWFnZTogbnVsbCxcclxuICAgICAgICAgICAgb3ZlcmxheTogbnVsbFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBfaW5wdXRJbWFnZVdyYXBwZXIsXHJcbiAgICBfYm94U2l6ZSxcclxuICAgIF9kZWNvZGVyLFxyXG4gICAgX3dvcmtlclBvb2wgPSBbXSxcclxuICAgIF9vblVJVGhyZWFkID0gdHJ1ZSxcclxuICAgIF9yZXN1bHRDb2xsZWN0b3IsXHJcbiAgICBfY29uZmlnID0ge307XHJcblxyXG5mdW5jdGlvbiBpbml0aWFsaXplRGF0YShpbWFnZVdyYXBwZXIpIHtcclxuICAgIGluaXRCdWZmZXJzKGltYWdlV3JhcHBlcik7XHJcbiAgICBfZGVjb2RlciA9IEJhcmNvZGVEZWNvZGVyLmNyZWF0ZShfY29uZmlnLmRlY29kZXIsIF9pbnB1dEltYWdlV3JhcHBlcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRJbnB1dFN0cmVhbShjYikge1xyXG4gICAgdmFyIHZpZGVvO1xyXG4gICAgaWYgKF9jb25maWcuaW5wdXRTdHJlYW0udHlwZSA9PT0gXCJWaWRlb1N0cmVhbVwiKSB7XHJcbiAgICAgICAgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidmlkZW9cIik7XHJcbiAgICAgICAgX2lucHV0U3RyZWFtID0gSW5wdXRTdHJlYW0uY3JlYXRlVmlkZW9TdHJlYW0odmlkZW8pO1xyXG4gICAgfSBlbHNlIGlmIChfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09IFwiSW1hZ2VTdHJlYW1cIikge1xyXG4gICAgICAgIF9pbnB1dFN0cmVhbSA9IElucHV0U3RyZWFtLmNyZWF0ZUltYWdlU3RyZWFtKCk7XHJcbiAgICB9IGVsc2UgaWYgKF9jb25maWcuaW5wdXRTdHJlYW0udHlwZSA9PT0gXCJMaXZlU3RyZWFtXCIpIHtcclxuICAgICAgICB2YXIgJHZpZXdwb3J0ID0gZ2V0Vmlld1BvcnQoKTtcclxuICAgICAgICBpZiAoJHZpZXdwb3J0KSB7XHJcbiAgICAgICAgICAgIHZpZGVvID0gJHZpZXdwb3J0LnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKTtcclxuICAgICAgICAgICAgaWYgKCF2aWRlbykge1xyXG4gICAgICAgICAgICAgICAgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidmlkZW9cIik7XHJcbiAgICAgICAgICAgICAgICAkdmlld3BvcnQuYXBwZW5kQ2hpbGQodmlkZW8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9pbnB1dFN0cmVhbSA9IElucHV0U3RyZWFtLmNyZWF0ZUxpdmVTdHJlYW0odmlkZW8pO1xyXG4gICAgICAgIENhbWVyYUFjY2Vzcy5yZXF1ZXN0KHZpZGVvLCBfY29uZmlnLmlucHV0U3RyZWFtLmNvbnN0cmFpbnRzLCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgaWYgKCFlcnIpIHtcclxuICAgICAgICAgICAgICAgIF9pbnB1dFN0cmVhbS50cmlnZ2VyKFwiY2FucmVjb3JkXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNiKGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfaW5wdXRTdHJlYW0uc2V0QXR0cmlidXRlKFwicHJlbG9hZFwiLCBcImF1dG9cIik7XHJcbiAgICBfaW5wdXRTdHJlYW0uc2V0QXR0cmlidXRlKFwiYXV0b3BsYXlcIiwgdHJ1ZSk7XHJcbiAgICBfaW5wdXRTdHJlYW0uc2V0SW5wdXRTdHJlYW0oX2NvbmZpZy5pbnB1dFN0cmVhbSk7XHJcbiAgICBfaW5wdXRTdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcImNhbnJlY29yZFwiLCBjYW5SZWNvcmQuYmluZCh1bmRlZmluZWQsIGNiKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFZpZXdQb3J0KCkge1xyXG4gICAgdmFyIHRhcmdldCA9IF9jb25maWcuaW5wdXRTdHJlYW0udGFyZ2V0O1xyXG4gICAgLy8gQ2hlY2sgaWYgdGFyZ2V0IGlzIGFscmVhZHkgYSBET00gZWxlbWVudFxyXG4gICAgaWYgKHRhcmdldCAmJiB0YXJnZXQubm9kZU5hbWUgJiYgdGFyZ2V0Lm5vZGVUeXBlID09PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gVXNlICcjaW50ZXJhY3RpdmUudmlld3BvcnQnIGFzIGEgZmFsbGJhY2sgc2VsZWN0b3IgKGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5KVxyXG4gICAgICAgIHZhciBzZWxlY3RvciA9IHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnID8gdGFyZ2V0IDogJyNpbnRlcmFjdGl2ZS52aWV3cG9ydCc7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjYW5SZWNvcmQoY2IpIHtcclxuICAgIEJhcmNvZGVMb2NhdG9yLmNoZWNrSW1hZ2VDb25zdHJhaW50cyhfaW5wdXRTdHJlYW0sIF9jb25maWcubG9jYXRvcik7XHJcbiAgICBpbml0Q2FudmFzKF9jb25maWcpO1xyXG4gICAgX2ZyYW1lZ3JhYmJlciA9IEZyYW1lR3JhYmJlci5jcmVhdGUoX2lucHV0U3RyZWFtLCBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZSk7XHJcblxyXG4gICAgYWRqdXN0V29ya2VyUG9vbChfY29uZmlnLm51bU9mV29ya2VycywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKF9jb25maWcubnVtT2ZXb3JrZXJzID09PSAwKSB7XHJcbiAgICAgICAgICAgIGluaXRpYWxpemVEYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlYWR5KGNiKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWFkeShjYil7XHJcbiAgICBfaW5wdXRTdHJlYW0ucGxheSgpO1xyXG4gICAgY2IoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdENhbnZhcygpIHtcclxuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICB2YXIgJHZpZXdwb3J0ID0gZ2V0Vmlld1BvcnQoKTtcclxuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjYW52YXMuaW1nQnVmZmVyXCIpO1xyXG4gICAgICAgIGlmICghX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UpIHtcclxuICAgICAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZS5jbGFzc05hbWUgPSBcImltZ0J1ZmZlclwiO1xyXG4gICAgICAgICAgICBpZiAoJHZpZXdwb3J0ICYmIF9jb25maWcuaW5wdXRTdHJlYW0udHlwZSA9PT0gXCJJbWFnZVN0cmVhbVwiKSB7XHJcbiAgICAgICAgICAgICAgICAkdmlld3BvcnQuYXBwZW5kQ2hpbGQoX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9jYW52YXNDb250YWluZXIuY3R4LmltYWdlID0gX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlLndpZHRoID0gX2lucHV0U3RyZWFtLmdldENhbnZhc1NpemUoKS54O1xyXG4gICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlLmhlaWdodCA9IF9pbnB1dFN0cmVhbS5nZXRDYW52YXNTaXplKCkueTtcclxuXHJcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjYW52YXMuZHJhd2luZ0J1ZmZlclwiKTtcclxuICAgICAgICBpZiAoIV9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkpIHtcclxuICAgICAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkuY2xhc3NOYW1lID0gXCJkcmF3aW5nQnVmZmVyXCI7XHJcbiAgICAgICAgICAgIGlmICgkdmlld3BvcnQpIHtcclxuICAgICAgICAgICAgICAgICR2aWV3cG9ydC5hcHBlbmRDaGlsZChfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgY2xlYXJGaXggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIik7XHJcbiAgICAgICAgICAgIGNsZWFyRml4LnNldEF0dHJpYnV0ZShcImNsZWFyXCIsIFwiYWxsXCIpO1xyXG4gICAgICAgICAgICBpZiAoJHZpZXdwb3J0KSB7XHJcbiAgICAgICAgICAgICAgICAkdmlld3BvcnQuYXBwZW5kQ2hpbGQoY2xlYXJGaXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9jYW52YXNDb250YWluZXIuY3R4Lm92ZXJsYXkgPSBfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5LmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5LndpZHRoID0gX2lucHV0U3RyZWFtLmdldENhbnZhc1NpemUoKS54O1xyXG4gICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkuaGVpZ2h0ID0gX2lucHV0U3RyZWFtLmdldENhbnZhc1NpemUoKS55O1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0QnVmZmVycyhpbWFnZVdyYXBwZXIpIHtcclxuICAgIGlmIChpbWFnZVdyYXBwZXIpIHtcclxuICAgICAgICBfaW5wdXRJbWFnZVdyYXBwZXIgPSBpbWFnZVdyYXBwZXI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIF9pbnB1dEltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoe1xyXG4gICAgICAgICAgICB4OiBfaW5wdXRTdHJlYW0uZ2V0V2lkdGgoKSxcclxuICAgICAgICAgICAgeTogX2lucHV0U3RyZWFtLmdldEhlaWdodCgpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKEVOVi5kZXZlbG9wbWVudCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9pbnB1dEltYWdlV3JhcHBlci5zaXplKTtcclxuICAgIH1cclxuICAgIF9ib3hTaXplID0gW1xyXG4gICAgICAgIHZlYzIuY2xvbmUoWzAsIDBdKSxcclxuICAgICAgICB2ZWMyLmNsb25lKFswLCBfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS55XSksXHJcbiAgICAgICAgdmVjMi5jbG9uZShbX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUueCwgX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUueV0pLFxyXG4gICAgICAgIHZlYzIuY2xvbmUoW19pbnB1dEltYWdlV3JhcHBlci5zaXplLngsIDBdKVxyXG4gICAgXTtcclxuICAgIEJhcmNvZGVMb2NhdG9yLmluaXQoX2lucHV0SW1hZ2VXcmFwcGVyLCBfY29uZmlnLmxvY2F0b3IpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRCb3VuZGluZ0JveGVzKCkge1xyXG4gICAgaWYgKF9jb25maWcubG9jYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIEJhcmNvZGVMb2NhdG9yLmxvY2F0ZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gW1tcclxuICAgICAgICAgICAgdmVjMi5jbG9uZShfYm94U2l6ZVswXSksXHJcbiAgICAgICAgICAgIHZlYzIuY2xvbmUoX2JveFNpemVbMV0pLFxyXG4gICAgICAgICAgICB2ZWMyLmNsb25lKF9ib3hTaXplWzJdKSxcclxuICAgICAgICAgICAgdmVjMi5jbG9uZShfYm94U2l6ZVszXSldXTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdHJhbnNmb3JtUmVzdWx0KHJlc3VsdCkge1xyXG4gICAgdmFyIHRvcFJpZ2h0ID0gX2lucHV0U3RyZWFtLmdldFRvcFJpZ2h0KCksXHJcbiAgICAgICAgeE9mZnNldCA9IHRvcFJpZ2h0LngsXHJcbiAgICAgICAgeU9mZnNldCA9IHRvcFJpZ2h0LnksXHJcbiAgICAgICAgaTtcclxuXHJcbiAgICBpZiAoeE9mZnNldCA9PT0gMCAmJiB5T2Zmc2V0ID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXN1bHQuYmFyY29kZXMpIHtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcmVzdWx0LmJhcmNvZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybVJlc3VsdChyZXN1bHQuYmFyY29kZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzdWx0LmxpbmUgJiYgcmVzdWx0LmxpbmUubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgbW92ZUxpbmUocmVzdWx0LmxpbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXN1bHQuYm94KSB7XHJcbiAgICAgICAgbW92ZUJveChyZXN1bHQuYm94KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzdWx0LmJveGVzICYmIHJlc3VsdC5ib3hlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHJlc3VsdC5ib3hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBtb3ZlQm94KHJlc3VsdC5ib3hlc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vdmVCb3goYm94KSB7XHJcbiAgICAgICAgdmFyIGNvcm5lciA9IGJveC5sZW5ndGg7XHJcblxyXG4gICAgICAgIHdoaWxlIChjb3JuZXItLSkge1xyXG4gICAgICAgICAgICBib3hbY29ybmVyXVswXSArPSB4T2Zmc2V0O1xyXG4gICAgICAgICAgICBib3hbY29ybmVyXVsxXSArPSB5T2Zmc2V0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb3ZlTGluZShsaW5lKSB7XHJcbiAgICAgICAgbGluZVswXS54ICs9IHhPZmZzZXQ7XHJcbiAgICAgICAgbGluZVswXS55ICs9IHlPZmZzZXQ7XHJcbiAgICAgICAgbGluZVsxXS54ICs9IHhPZmZzZXQ7XHJcbiAgICAgICAgbGluZVsxXS55ICs9IHlPZmZzZXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFJlc3VsdCAocmVzdWx0LCBpbWFnZURhdGEpIHtcclxuICAgIGlmICghaW1hZ2VEYXRhIHx8ICFfcmVzdWx0Q29sbGVjdG9yKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXN1bHQuYmFyY29kZXMpIHtcclxuICAgICAgICByZXN1bHQuYmFyY29kZXMuZmlsdGVyKGJhcmNvZGUgPT4gYmFyY29kZS5jb2RlUmVzdWx0KVxyXG4gICAgICAgICAgICAuZm9yRWFjaChiYXJjb2RlID0+IGFkZFJlc3VsdChiYXJjb2RlLCBpbWFnZURhdGEpKTtcclxuICAgIH0gZWxzZSBpZiAocmVzdWx0LmNvZGVSZXN1bHQpIHtcclxuICAgICAgICBfcmVzdWx0Q29sbGVjdG9yLmFkZFJlc3VsdChpbWFnZURhdGEsIF9pbnB1dFN0cmVhbS5nZXRDYW52YXNTaXplKCksIHJlc3VsdC5jb2RlUmVzdWx0KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaGFzQ29kZVJlc3VsdCAocmVzdWx0KSB7XHJcbiAgICByZXR1cm4gcmVzdWx0ICYmIChyZXN1bHQuYmFyY29kZXMgP1xyXG4gICAgICByZXN1bHQuYmFyY29kZXMuc29tZShiYXJjb2RlID0+IGJhcmNvZGUuY29kZVJlc3VsdCkgOlxyXG4gICAgICByZXN1bHQuY29kZVJlc3VsdCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHB1Ymxpc2hSZXN1bHQocmVzdWx0LCBpbWFnZURhdGEpIHtcclxuICAgIGNvbnN0IHJlc3VsdFRvUHVibGlzaCA9IHJlc3VsdCAmJiAocmVzdWx0LmJhcmNvZGVzIHx8IHJlc3VsdCk7XHJcblxyXG4gICAgaWYgKHJlc3VsdCAmJiBfb25VSVRocmVhZCkge1xyXG4gICAgICAgIHRyYW5zZm9ybVJlc3VsdChyZXN1bHQpO1xyXG4gICAgICAgIGFkZFJlc3VsdChyZXN1bHQsIGltYWdlRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgRXZlbnRzLnB1Ymxpc2goXCJwcm9jZXNzZWRcIiwgcmVzdWx0VG9QdWJsaXNoKTtcclxuICAgIGlmIChoYXNDb2RlUmVzdWx0KHJlc3VsdCkpIHtcclxuICAgICAgICBFdmVudHMucHVibGlzaChcImRldGVjdGVkXCIsIHJlc3VsdFRvUHVibGlzaCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvY2F0ZUFuZERlY29kZSgpIHtcclxuICAgIHZhciByZXN1bHQsXHJcbiAgICAgICAgYm94ZXM7XHJcblxyXG4gICAgYm94ZXMgPSBnZXRCb3VuZGluZ0JveGVzKCk7XHJcbiAgICBpZiAoYm94ZXMpIHtcclxuICAgICAgICByZXN1bHQgPSBfZGVjb2Rlci5kZWNvZGVGcm9tQm91bmRpbmdCb3hlcyhib3hlcyk7XHJcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0IHx8IHt9O1xyXG4gICAgICAgIHJlc3VsdC5ib3hlcyA9IGJveGVzO1xyXG4gICAgICAgIHB1Ymxpc2hSZXN1bHQocmVzdWx0LCBfaW5wdXRJbWFnZVdyYXBwZXIuZGF0YSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHB1Ymxpc2hSZXN1bHQoKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlKCkge1xyXG4gICAgdmFyIGF2YWlsYWJsZVdvcmtlcjtcclxuXHJcbiAgICBpZiAoX29uVUlUaHJlYWQpIHtcclxuICAgICAgICBpZiAoX3dvcmtlclBvb2wubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBhdmFpbGFibGVXb3JrZXIgPSBfd29ya2VyUG9vbC5maWx0ZXIoZnVuY3Rpb24od29ya2VyVGhyZWFkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIXdvcmtlclRocmVhZC5idXN5O1xyXG4gICAgICAgICAgICB9KVswXTtcclxuICAgICAgICAgICAgaWYgKGF2YWlsYWJsZVdvcmtlcikge1xyXG4gICAgICAgICAgICAgICAgX2ZyYW1lZ3JhYmJlci5hdHRhY2hEYXRhKGF2YWlsYWJsZVdvcmtlci5pbWFnZURhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBhbGwgd29ya2VycyBhcmUgYnVzeVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgX2ZyYW1lZ3JhYmJlci5hdHRhY2hEYXRhKF9pbnB1dEltYWdlV3JhcHBlci5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKF9mcmFtZWdyYWJiZXIuZ3JhYigpKSB7XHJcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGVXb3JrZXIpIHtcclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZVdvcmtlci5idXN5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZVdvcmtlci53b3JrZXIucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNtZDogJ3Byb2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlRGF0YTogYXZhaWxhYmxlV29ya2VyLmltYWdlRGF0YVxyXG4gICAgICAgICAgICAgICAgfSwgW2F2YWlsYWJsZVdvcmtlci5pbWFnZURhdGEuYnVmZmVyXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGVBbmREZWNvZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbG9jYXRlQW5kRGVjb2RlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YXJ0Q29udGludW91c1VwZGF0ZSgpIHtcclxuICAgIHZhciBuZXh0ID0gbnVsbCxcclxuICAgICAgICBkZWxheSA9IDEwMDAgLyAoX2NvbmZpZy5mcmVxdWVuY3kgfHwgNjApO1xyXG5cclxuICAgIF9zdG9wcGVkID0gZmFsc2U7XHJcbiAgICAoZnVuY3Rpb24gZnJhbWUodGltZXN0YW1wKSB7XHJcbiAgICAgICAgbmV4dCA9IG5leHQgfHwgdGltZXN0YW1wO1xyXG4gICAgICAgIGlmICghX3N0b3BwZWQpIHtcclxuICAgICAgICAgICAgaWYgKHRpbWVzdGFtcCA+PSBuZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0ICs9IGRlbGF5O1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltRnJhbWUoZnJhbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0ocGVyZm9ybWFuY2Uubm93KCkpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnQoKSB7XHJcbiAgICBpZiAoX29uVUlUaHJlYWQgJiYgX2NvbmZpZy5pbnB1dFN0cmVhbS50eXBlID09PSBcIkxpdmVTdHJlYW1cIikge1xyXG4gICAgICAgIHN0YXJ0Q29udGludW91c1VwZGF0ZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB1cGRhdGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFdvcmtlcihjYikge1xyXG4gICAgdmFyIGJsb2JVUkwsXHJcbiAgICAgICAgd29ya2VyVGhyZWFkID0ge1xyXG4gICAgICAgICAgICB3b3JrZXI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgaW1hZ2VEYXRhOiBuZXcgVWludDhBcnJheShfaW5wdXRTdHJlYW0uZ2V0V2lkdGgoKSAqIF9pbnB1dFN0cmVhbS5nZXRIZWlnaHQoKSksXHJcbiAgICAgICAgICAgIGJ1c3k6IHRydWVcclxuICAgICAgICB9O1xyXG5cclxuICAgIGJsb2JVUkwgPSBnZW5lcmF0ZVdvcmtlckJsb2IoKTtcclxuICAgIHdvcmtlclRocmVhZC53b3JrZXIgPSBuZXcgV29ya2VyKGJsb2JVUkwpO1xyXG5cclxuICAgIHdvcmtlclRocmVhZC53b3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmIChlLmRhdGEuZXZlbnQgPT09ICdpbml0aWFsaXplZCcpIHtcclxuICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChibG9iVVJMKTtcclxuICAgICAgICAgICAgd29ya2VyVGhyZWFkLmJ1c3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgd29ya2VyVGhyZWFkLmltYWdlRGF0YSA9IG5ldyBVaW50OEFycmF5KGUuZGF0YS5pbWFnZURhdGEpO1xyXG4gICAgICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldvcmtlciBpbml0aWFsaXplZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY2Iod29ya2VyVGhyZWFkKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGUuZGF0YS5ldmVudCA9PT0gJ3Byb2Nlc3NlZCcpIHtcclxuICAgICAgICAgICAgd29ya2VyVGhyZWFkLmltYWdlRGF0YSA9IG5ldyBVaW50OEFycmF5KGUuZGF0YS5pbWFnZURhdGEpO1xyXG4gICAgICAgICAgICB3b3JrZXJUaHJlYWQuYnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBwdWJsaXNoUmVzdWx0KGUuZGF0YS5yZXN1bHQsIHdvcmtlclRocmVhZC5pbWFnZURhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZS5kYXRhLmV2ZW50ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV29ya2VyIGVycm9yOiBcIiArIGUuZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgd29ya2VyVGhyZWFkLndvcmtlci5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgY21kOiAnaW5pdCcsXHJcbiAgICAgICAgc2l6ZToge3g6IF9pbnB1dFN0cmVhbS5nZXRXaWR0aCgpLCB5OiBfaW5wdXRTdHJlYW0uZ2V0SGVpZ2h0KCl9LFxyXG4gICAgICAgIGltYWdlRGF0YTogd29ya2VyVGhyZWFkLmltYWdlRGF0YSxcclxuICAgICAgICBjb25maWc6IF9jb25maWdcclxuICAgIH0sIFt3b3JrZXJUaHJlYWQuaW1hZ2VEYXRhLmJ1ZmZlcl0pO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gd29ya2VySW50ZXJmYWNlKGZhY3RvcnkpIHtcclxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmKi9cclxuICAgIGlmIChmYWN0b3J5KSB7XHJcbiAgICAgICAgdmFyIFF1YWdnYSA9IGZhY3RvcnkoKTtcclxuICAgICAgICBpZiAoIVF1YWdnYSkge1xyXG4gICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsnZXZlbnQnOiAnZXJyb3InLCBtZXNzYWdlOiAnUXVhZ2dhIGNvdWxkIG5vdCBiZSBjcmVhdGVkJ30pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIGltYWdlV3JhcHBlcjtcclxuXHJcbiAgICBzZWxmLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5kYXRhLmNtZCA9PT0gJ2luaXQnKSB7XHJcbiAgICAgICAgICAgIHZhciBjb25maWcgPSBlLmRhdGEuY29uZmlnO1xyXG4gICAgICAgICAgICBjb25maWcubnVtT2ZXb3JrZXJzID0gMDtcclxuICAgICAgICAgICAgaW1hZ2VXcmFwcGVyID0gbmV3IFF1YWdnYS5JbWFnZVdyYXBwZXIoe1xyXG4gICAgICAgICAgICAgICAgeDogZS5kYXRhLnNpemUueCxcclxuICAgICAgICAgICAgICAgIHk6IGUuZGF0YS5zaXplLnlcclxuICAgICAgICAgICAgfSwgbmV3IFVpbnQ4QXJyYXkoZS5kYXRhLmltYWdlRGF0YSkpO1xyXG4gICAgICAgICAgICBRdWFnZ2EuaW5pdChjb25maWcsIHJlYWR5LCBpbWFnZVdyYXBwZXIpO1xyXG4gICAgICAgICAgICBRdWFnZ2Eub25Qcm9jZXNzZWQob25Qcm9jZXNzZWQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZS5kYXRhLmNtZCA9PT0gJ3Byb2Nlc3MnKSB7XHJcbiAgICAgICAgICAgIGltYWdlV3JhcHBlci5kYXRhID0gbmV3IFVpbnQ4QXJyYXkoZS5kYXRhLmltYWdlRGF0YSk7XHJcbiAgICAgICAgICAgIFF1YWdnYS5zdGFydCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZS5kYXRhLmNtZCA9PT0gJ3NldFJlYWRlcnMnKSB7XHJcbiAgICAgICAgICAgIFF1YWdnYS5zZXRSZWFkZXJzKGUuZGF0YS5yZWFkZXJzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIG9uUHJvY2Vzc2VkKHJlc3VsdCkge1xyXG4gICAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAnZXZlbnQnOiAncHJvY2Vzc2VkJyxcclxuICAgICAgICAgICAgaW1hZ2VEYXRhOiBpbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICAgICAgcmVzdWx0OiByZXN1bHRcclxuICAgICAgICB9LCBbaW1hZ2VXcmFwcGVyLmRhdGEuYnVmZmVyXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVhZHkoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsnZXZlbnQnOiAnaW5pdGlhbGl6ZWQnLCBpbWFnZURhdGE6IGltYWdlV3JhcHBlci5kYXRhfSwgW2ltYWdlV3JhcHBlci5kYXRhLmJ1ZmZlcl0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIGVzbGludC1lbmFibGUgKi9cclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVXb3JrZXJCbG9iKCkge1xyXG4gICAgdmFyIGJsb2IsXHJcbiAgICAgICAgZmFjdG9yeVNvdXJjZTtcclxuXHJcbiAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXHJcbiAgICBpZiAodHlwZW9mIF9fZmFjdG9yeVNvdXJjZV9fICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGZhY3RvcnlTb3VyY2UgPSBfX2ZhY3RvcnlTb3VyY2VfXzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxyXG4gICAgfVxyXG4gICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cclxuXHJcbiAgICBibG9iID0gbmV3IEJsb2IoWycoJyArIHdvcmtlckludGVyZmFjZS50b1N0cmluZygpICsgJykoJyArIGZhY3RvcnlTb3VyY2UgKyAnKTsnXSxcclxuICAgICAgICB7dHlwZTogJ3RleHQvamF2YXNjcmlwdCd9KTtcclxuXHJcbiAgICByZXR1cm4gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFJlYWRlcnMocmVhZGVycykge1xyXG4gICAgaWYgKF9kZWNvZGVyKSB7XHJcbiAgICAgICAgX2RlY29kZXIuc2V0UmVhZGVycyhyZWFkZXJzKTtcclxuICAgIH0gZWxzZSBpZiAoX29uVUlUaHJlYWQgJiYgX3dvcmtlclBvb2wubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIF93b3JrZXJQb29sLmZvckVhY2goZnVuY3Rpb24od29ya2VyVGhyZWFkKSB7XHJcbiAgICAgICAgICAgIHdvcmtlclRocmVhZC53b3JrZXIucG9zdE1lc3NhZ2Uoe2NtZDogJ3NldFJlYWRlcnMnLCByZWFkZXJzOiByZWFkZXJzfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkanVzdFdvcmtlclBvb2woY2FwYWNpdHksIGNiKSB7XHJcbiAgICBjb25zdCBpbmNyZWFzZUJ5ID0gY2FwYWNpdHkgLSBfd29ya2VyUG9vbC5sZW5ndGg7XHJcbiAgICBpZiAoaW5jcmVhc2VCeSA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiBjYiAmJiBjYigpO1xyXG4gICAgfVxyXG4gICAgaWYgKGluY3JlYXNlQnkgPCAwKSB7XHJcbiAgICAgICAgY29uc3Qgd29ya2Vyc1RvVGVybWluYXRlID0gX3dvcmtlclBvb2wuc2xpY2UoaW5jcmVhc2VCeSk7XHJcbiAgICAgICAgd29ya2Vyc1RvVGVybWluYXRlLmZvckVhY2goZnVuY3Rpb24od29ya2VyVGhyZWFkKSB7XHJcbiAgICAgICAgICAgIHdvcmtlclRocmVhZC53b3JrZXIudGVybWluYXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV29ya2VyIHRlcm1pbmF0ZWQhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgX3dvcmtlclBvb2wgPSBfd29ya2VyUG9vbC5zbGljZSgwLCBpbmNyZWFzZUJ5KTtcclxuICAgICAgICByZXR1cm4gY2IgJiYgY2IoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmNyZWFzZUJ5OyBpKyspIHtcclxuICAgICAgICAgICAgaW5pdFdvcmtlcih3b3JrZXJJbml0aWFsaXplZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB3b3JrZXJJbml0aWFsaXplZCh3b3JrZXJUaHJlYWQpIHtcclxuICAgICAgICAgICAgX3dvcmtlclBvb2wucHVzaCh3b3JrZXJUaHJlYWQpO1xyXG4gICAgICAgICAgICBpZiAoX3dvcmtlclBvb2wubGVuZ3RoID49IGNhcGFjaXR5KXtcclxuICAgICAgICAgICAgICAgIGNiICYmIGNiKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKGNvbmZpZywgY2IsIGltYWdlV3JhcHBlcikge1xyXG4gICAgICAgIF9jb25maWcgPSBtZXJnZSh7fSwgQ29uZmlnLCBjb25maWcpO1xyXG4gICAgICAgIGlmIChpbWFnZVdyYXBwZXIpIHtcclxuICAgICAgICAgICAgX29uVUlUaHJlYWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaW5pdGlhbGl6ZURhdGEoaW1hZ2VXcmFwcGVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNiKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5pdElucHV0U3RyZWFtKGNiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHN0YXJ0KCk7XHJcbiAgICB9LFxyXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgX3N0b3BwZWQgPSB0cnVlO1xyXG4gICAgICAgIGFkanVzdFdvcmtlclBvb2woMCk7XHJcbiAgICAgICAgaWYgKF9jb25maWcuaW5wdXRTdHJlYW0udHlwZSA9PT0gXCJMaXZlU3RyZWFtXCIpIHtcclxuICAgICAgICAgICAgQ2FtZXJhQWNjZXNzLnJlbGVhc2UoKTtcclxuICAgICAgICAgICAgX2lucHV0U3RyZWFtLmNsZWFyRXZlbnRIYW5kbGVycygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwYXVzZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgX3N0b3BwZWQgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIG9uRGV0ZWN0ZWQ6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgRXZlbnRzLnN1YnNjcmliZShcImRldGVjdGVkXCIsIGNhbGxiYWNrKTtcclxuICAgIH0sXHJcbiAgICBvZmZEZXRlY3RlZDogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuICAgICAgICBFdmVudHMudW5zdWJzY3JpYmUoXCJkZXRlY3RlZFwiLCBjYWxsYmFjayk7XHJcbiAgICB9LFxyXG4gICAgb25Qcm9jZXNzZWQ6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgRXZlbnRzLnN1YnNjcmliZShcInByb2Nlc3NlZFwiLCBjYWxsYmFjayk7XHJcbiAgICB9LFxyXG4gICAgb2ZmUHJvY2Vzc2VkOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgIEV2ZW50cy51bnN1YnNjcmliZShcInByb2Nlc3NlZFwiLCBjYWxsYmFjayk7XHJcbiAgICB9LFxyXG4gICAgc2V0UmVhZGVyczogZnVuY3Rpb24ocmVhZGVycykge1xyXG4gICAgICAgIHNldFJlYWRlcnMocmVhZGVycyk7XHJcbiAgICB9LFxyXG4gICAgcmVnaXN0ZXJSZXN1bHRDb2xsZWN0b3I6IGZ1bmN0aW9uKHJlc3VsdENvbGxlY3Rvcikge1xyXG4gICAgICAgIGlmIChyZXN1bHRDb2xsZWN0b3IgJiYgdHlwZW9mIHJlc3VsdENvbGxlY3Rvci5hZGRSZXN1bHQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgX3Jlc3VsdENvbGxlY3RvciA9IHJlc3VsdENvbGxlY3RvcjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2FudmFzOiBfY2FudmFzQ29udGFpbmVyLFxyXG4gICAgZGVjb2RlU2luZ2xlOiBmdW5jdGlvbihjb25maWcsIHJlc3VsdENhbGxiYWNrKSB7XHJcbiAgICAgICAgY29uZmlnID0gbWVyZ2Uoe1xyXG4gICAgICAgICAgICBpbnB1dFN0cmVhbToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJJbWFnZVN0cmVhbVwiLFxyXG4gICAgICAgICAgICAgICAgc2VxdWVuY2U6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogODAwLFxyXG4gICAgICAgICAgICAgICAgc3JjOiBjb25maWcuc3JjXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG51bU9mV29ya2VyczogKEVOVi5kZXZlbG9wbWVudCAmJiBjb25maWcuZGVidWcpID8gMCA6IDEsXHJcbiAgICAgICAgICAgIGxvY2F0b3I6IHtcclxuICAgICAgICAgICAgICAgIGhhbGZTYW1wbGU6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBjb25maWcpO1xyXG4gICAgICAgIHRoaXMuaW5pdChjb25maWcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBFdmVudHMub25jZShcInByb2Nlc3NlZFwiLCBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIF9zdG9wcGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdENhbGxiYWNrLmNhbGwobnVsbCwgcmVzdWx0KTtcclxuICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHN0YXJ0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgSW1hZ2VXcmFwcGVyOiBJbWFnZVdyYXBwZXIsXHJcbiAgICBJbWFnZURlYnVnOiBJbWFnZURlYnVnLFxyXG4gICAgUmVzdWx0Q29sbGVjdG9yOiBSZXN1bHRDb2xsZWN0b3JcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvcXVhZ2dhLmpzXG4gKiovIiwiLypcclxuICogdHlwZWRlZnMuanNcclxuICogTm9ybWFsaXplcyBicm93c2VyLXNwZWNpZmljIHByZWZpeGVzXHJcbiAqL1xyXG5cclxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoLyogZnVuY3Rpb24gRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgKi8gY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLmdldFVzZXJNZWRpYSB8fFxyXG4gICAgICAgIG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEgfHwgbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3IubXNHZXRVc2VyTWVkaWE7XHJcbiAgICB3aW5kb3cuVVJMID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMIHx8IHdpbmRvdy5tb3pVUkwgfHwgd2luZG93Lm1zVVJMO1xyXG59XHJcbk1hdGguaW11bCA9IE1hdGguaW11bCB8fCBmdW5jdGlvbihhLCBiKSB7XHJcbiAgICB2YXIgYWggPSAoYSA+Pj4gMTYpICYgMHhmZmZmLFxyXG4gICAgICAgIGFsID0gYSAmIDB4ZmZmZixcclxuICAgICAgICBiaCA9IChiID4+PiAxNikgJiAweGZmZmYsXHJcbiAgICAgICAgYmwgPSBiICYgMHhmZmZmO1xyXG4gICAgLy8gdGhlIHNoaWZ0IGJ5IDAgZml4ZXMgdGhlIHNpZ24gb24gdGhlIGhpZ2ggcGFydFxyXG4gICAgLy8gdGhlIGZpbmFsIHwwIGNvbnZlcnRzIHRoZSB1bnNpZ25lZCB2YWx1ZSBpbnRvIGEgc2lnbmVkIHZhbHVlXHJcbiAgICByZXR1cm4gKChhbCAqIGJsKSArICgoKGFoICogYmwgKyBhbCAqIGJoKSA8PCAxNikgPj4+IDApIHwgMCk7XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvbW1vbi90eXBlZGVmcy5qc1xuICoqLyIsImltcG9ydCBTdWJJbWFnZSBmcm9tICcuL3N1YkltYWdlJztcclxuaW1wb3J0IENWVXRpbHMgZnJvbSAnLi4vY29tbW9uL2N2X3V0aWxzJztcclxuaW1wb3J0IEFycmF5SGVscGVyIGZyb20gJy4uL2NvbW1vbi9hcnJheV9oZWxwZXInO1xyXG5pbXBvcnQge3ZlYzJ9IGZyb20gJ2dsLW1hdHJpeCc7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBhIGJhc2ljIGltYWdlIGNvbWJpbmluZyB0aGUgZGF0YSBhbmQgc2l6ZS5cclxuICogSW4gYWRkaXRpb24sIHNvbWUgbWV0aG9kcyBmb3IgbWFuaXB1bGF0aW9uIGFyZSBjb250YWluZWQuXHJcbiAqIEBwYXJhbSBzaXplIHt4LHl9IFRoZSBzaXplIG9mIHRoZSBpbWFnZSBpbiBwaXhlbFxyXG4gKiBAcGFyYW0gZGF0YSB7QXJyYXl9IElmIGdpdmVuLCBhIGZsYXQgYXJyYXkgY29udGFpbmluZyB0aGUgcGl4ZWwgZGF0YVxyXG4gKiBAcGFyYW0gQXJyYXlUeXBlIHtUeXBlfSBJZiBnaXZlbiwgdGhlIGRlc2lyZWQgRGF0YVR5cGUgb2YgdGhlIEFycmF5IChtYXkgYmUgdHlwZWQvbm9uLXR5cGVkKVxyXG4gKiBAcGFyYW0gaW5pdGlhbGl6ZSB7Qm9vbGVhbn0gSW5kaWNhdGluZyBpZiB0aGUgYXJyYXkgc2hvdWxkIGJlIGluaXRpYWxpemVkIG9uIGNyZWF0aW9uLlxyXG4gKiBAcmV0dXJucyB7SW1hZ2VXcmFwcGVyfVxyXG4gKi9cclxuZnVuY3Rpb24gSW1hZ2VXcmFwcGVyKHNpemUsIGRhdGEsIEFycmF5VHlwZSwgaW5pdGlhbGl6ZSkge1xyXG4gICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgaWYgKEFycmF5VHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBuZXcgQXJyYXlUeXBlKHNpemUueCAqIHNpemUueSk7XHJcbiAgICAgICAgICAgIGlmIChBcnJheVR5cGUgPT09IEFycmF5ICYmIGluaXRpYWxpemUpIHtcclxuICAgICAgICAgICAgICAgIEFycmF5SGVscGVyLmluaXQodGhpcy5kYXRhLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IG5ldyBVaW50OEFycmF5KHNpemUueCAqIHNpemUueSk7XHJcbiAgICAgICAgICAgIGlmIChVaW50OEFycmF5ID09PSBBcnJheSAmJiBpbml0aWFsaXplKSB7XHJcbiAgICAgICAgICAgICAgICBBcnJheUhlbHBlci5pbml0KHRoaXMuZGF0YSwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNpemUgPSBzaXplO1xyXG59XHJcblxyXG4vKipcclxuICogdGVzdHMgaWYgYSBwb3NpdGlvbiBpcyB3aXRoaW4gdGhlIGltYWdlIHdpdGggYSBnaXZlbiBvZmZzZXRcclxuICogQHBhcmFtIGltZ1JlZiB7eCwgeX0gVGhlIGxvY2F0aW9uIHRvIHRlc3RcclxuICogQHBhcmFtIGJvcmRlciBOdW1iZXIgdGhlIHBhZGRpbmcgdmFsdWUgaW4gcGl4ZWxcclxuICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgbG9jYXRpb24gaW5zaWRlIHRoZSBpbWFnZSdzIGJvcmRlciwgZmFsc2Ugb3RoZXJ3aXNlXHJcbiAqIEBzZWUgY3ZkL2ltYWdlLmhcclxuICovXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuaW5JbWFnZVdpdGhCb3JkZXIgPSBmdW5jdGlvbihpbWdSZWYsIGJvcmRlcikge1xyXG4gICAgcmV0dXJuIChpbWdSZWYueCA+PSBib3JkZXIpXHJcbiAgICAgICAgJiYgKGltZ1JlZi55ID49IGJvcmRlcilcclxuICAgICAgICAmJiAoaW1nUmVmLnggPCAodGhpcy5zaXplLnggLSBib3JkZXIpKVxyXG4gICAgICAgICYmIChpbWdSZWYueSA8ICh0aGlzLnNpemUueSAtIGJvcmRlcikpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFBlcmZvcm1zIGJpbGluZWFyIHNhbXBsaW5nXHJcbiAqIEBwYXJhbSBpbkltZyBJbWFnZSB0byBleHRyYWN0IHNhbXBsZSBmcm9tXHJcbiAqIEBwYXJhbSB4IHRoZSB4LWNvb3JkaW5hdGVcclxuICogQHBhcmFtIHkgdGhlIHktY29vcmRpbmF0ZVxyXG4gKiBAcmV0dXJucyB0aGUgc2FtcGxlZCB2YWx1ZVxyXG4gKiBAc2VlIGN2ZC92aXNpb24uaFxyXG4gKi9cclxuSW1hZ2VXcmFwcGVyLnNhbXBsZSA9IGZ1bmN0aW9uKGluSW1nLCB4LCB5KSB7XHJcbiAgICB2YXIgbHggPSBNYXRoLmZsb29yKHgpO1xyXG4gICAgdmFyIGx5ID0gTWF0aC5mbG9vcih5KTtcclxuICAgIHZhciB3ID0gaW5JbWcuc2l6ZS54O1xyXG4gICAgdmFyIGJhc2UgPSBseSAqIGluSW1nLnNpemUueCArIGx4O1xyXG4gICAgdmFyIGEgPSBpbkltZy5kYXRhW2Jhc2UgKyAwXTtcclxuICAgIHZhciBiID0gaW5JbWcuZGF0YVtiYXNlICsgMV07XHJcbiAgICB2YXIgYyA9IGluSW1nLmRhdGFbYmFzZSArIHddO1xyXG4gICAgdmFyIGQgPSBpbkltZy5kYXRhW2Jhc2UgKyB3ICsgMV07XHJcbiAgICB2YXIgZSA9IGEgLSBiO1xyXG4gICAgeCAtPSBseDtcclxuICAgIHkgLT0gbHk7XHJcblxyXG4gICAgdmFyIHJlc3VsdCA9IE1hdGguZmxvb3IoeCAqICh5ICogKGUgLSBjICsgZCkgLSBlKSArIHkgKiAoYyAtIGEpICsgYSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemVzIGEgZ2l2ZW4gYXJyYXkuIFNldHMgZWFjaCBlbGVtZW50IHRvIHplcm8uXHJcbiAqIEBwYXJhbSBhcnJheSB7QXJyYXl9IFRoZSBhcnJheSB0byBpbml0aWFsaXplXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIuY2xlYXJBcnJheSA9IGZ1bmN0aW9uKGFycmF5KSB7XHJcbiAgICB2YXIgbCA9IGFycmF5Lmxlbmd0aDtcclxuICAgIHdoaWxlIChsLS0pIHtcclxuICAgICAgICBhcnJheVtsXSA9IDA7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIHtTdWJJbWFnZX0gZnJvbSB0aGUgY3VycmVudCBpbWFnZSAoe3RoaXN9KS5cclxuICogQHBhcmFtIGZyb20ge0ltYWdlUmVmfSBUaGUgcG9zaXRpb24gd2hlcmUgdG8gc3RhcnQgdGhlIHtTdWJJbWFnZX0gZnJvbS4gKHRvcC1sZWZ0IGNvcm5lcilcclxuICogQHBhcmFtIHNpemUge0ltYWdlUmVmfSBUaGUgc2l6ZSBvZiB0aGUgcmVzdWx0aW5nIGltYWdlXHJcbiAqIEByZXR1cm5zIHtTdWJJbWFnZX0gQSBzaGFyZWQgcGFydCBvZiB0aGUgb3JpZ2luYWwgaW1hZ2VcclxuICovXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuc3ViSW1hZ2UgPSBmdW5jdGlvbihmcm9tLCBzaXplKSB7XHJcbiAgICByZXR1cm4gbmV3IFN1YkltYWdlKGZyb20sIHNpemUsIHRoaXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYW4ge0ltYWdlV3JhcHBlcikgYW5kIGNvcGllcyB0aGUgbmVlZGVkIHVuZGVybHlpbmcgaW1hZ2UtZGF0YSBhcmVhXHJcbiAqIEBwYXJhbSBpbWFnZVdyYXBwZXIge0ltYWdlV3JhcHBlcn0gVGhlIHRhcmdldCB7SW1hZ2VXcmFwcGVyfSB3aGVyZSB0aGUgZGF0YSBzaG91bGQgYmUgY29waWVkXHJcbiAqIEBwYXJhbSBmcm9tIHtJbWFnZVJlZn0gVGhlIGxvY2F0aW9uIHdoZXJlIHRvIGNvcHkgZnJvbSAodG9wLWxlZnQgbG9jYXRpb24pXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLnN1YkltYWdlQXNDb3B5ID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCBmcm9tKSB7XHJcbiAgICB2YXIgc2l6ZVkgPSBpbWFnZVdyYXBwZXIuc2l6ZS55LCBzaXplWCA9IGltYWdlV3JhcHBlci5zaXplLng7XHJcbiAgICB2YXIgeCwgeTtcclxuICAgIGZvciAoIHggPSAwOyB4IDwgc2l6ZVg7IHgrKykge1xyXG4gICAgICAgIGZvciAoIHkgPSAwOyB5IDwgc2l6ZVk7IHkrKykge1xyXG4gICAgICAgICAgICBpbWFnZVdyYXBwZXIuZGF0YVt5ICogc2l6ZVggKyB4XSA9IHRoaXMuZGF0YVsoZnJvbS55ICsgeSkgKiB0aGlzLnNpemUueCArIGZyb20ueCArIHhdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuY29weVRvID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyKSB7XHJcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5kYXRhLmxlbmd0aCwgc3JjRGF0YSA9IHRoaXMuZGF0YSwgZHN0RGF0YSA9IGltYWdlV3JhcHBlci5kYXRhO1xyXG5cclxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgIGRzdERhdGFbbGVuZ3RoXSA9IHNyY0RhdGFbbGVuZ3RoXTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZXMgYSBnaXZlbiBwaXhlbCBwb3NpdGlvbiBmcm9tIHRoZSBpbWFnZVxyXG4gKiBAcGFyYW0geCB7TnVtYmVyfSBUaGUgeC1wb3NpdGlvblxyXG4gKiBAcGFyYW0geSB7TnVtYmVyfSBUaGUgeS1wb3NpdGlvblxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgZ3JheXNjYWxlIHZhbHVlIGF0IHRoZSBwaXhlbC1wb3NpdGlvblxyXG4gKi9cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhW3kgKiB0aGlzLnNpemUueCArIHhdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlcyBhIGdpdmVuIHBpeGVsIHBvc2l0aW9uIGZyb20gdGhlIGltYWdlXHJcbiAqIEBwYXJhbSB4IHtOdW1iZXJ9IFRoZSB4LXBvc2l0aW9uXHJcbiAqIEBwYXJhbSB5IHtOdW1iZXJ9IFRoZSB5LXBvc2l0aW9uXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBncmF5c2NhbGUgdmFsdWUgYXQgdGhlIHBpeGVsLXBvc2l0aW9uXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLmdldFNhZmUgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICB2YXIgaTtcclxuXHJcbiAgICBpZiAoIXRoaXMuaW5kZXhNYXBwaW5nKSB7XHJcbiAgICAgICAgdGhpcy5pbmRleE1hcHBpbmcgPSB7XHJcbiAgICAgICAgICAgIHg6IFtdLFxyXG4gICAgICAgICAgICB5OiBbXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuc2l6ZS54OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5pbmRleE1hcHBpbmcueFtpXSA9IGk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXhNYXBwaW5nLnhbaSArIHRoaXMuc2l6ZS54XSA9IGk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnNpemUueTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXhNYXBwaW5nLnlbaV0gPSBpO1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4TWFwcGluZy55W2kgKyB0aGlzLnNpemUueV0gPSBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmRhdGFbKHRoaXMuaW5kZXhNYXBwaW5nLnlbeSArIHRoaXMuc2l6ZS55XSkgKiB0aGlzLnNpemUueCArIHRoaXMuaW5kZXhNYXBwaW5nLnhbeCArIHRoaXMuc2l6ZS54XV07XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0cyBhIGdpdmVuIHBpeGVsIHBvc2l0aW9uIGluIHRoZSBpbWFnZVxyXG4gKiBAcGFyYW0geCB7TnVtYmVyfSBUaGUgeC1wb3NpdGlvblxyXG4gKiBAcGFyYW0geSB7TnVtYmVyfSBUaGUgeS1wb3NpdGlvblxyXG4gKiBAcGFyYW0gdmFsdWUge051bWJlcn0gVGhlIGdyYXlzY2FsZSB2YWx1ZSB0byBzZXRcclxuICogQHJldHVybnMge0ltYWdlV3JhcHBlcn0gVGhlIEltYWdlIGl0c2VsZiAoZm9yIHBvc3NpYmxlIGNoYWluaW5nKVxyXG4gKi9cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbih4LCB5LCB2YWx1ZSkge1xyXG4gICAgdGhpcy5kYXRhW3kgKiB0aGlzLnNpemUueCArIHhdID0gdmFsdWU7XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXRzIHRoZSBib3JkZXIgb2YgdGhlIGltYWdlICgxIHBpeGVsKSB0byB6ZXJvXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLnplcm9Cb3JkZXIgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBpLCB3aWR0aCA9IHRoaXMuc2l6ZS54LCBoZWlnaHQgPSB0aGlzLnNpemUueSwgZGF0YSA9IHRoaXMuZGF0YTtcclxuICAgIGZvciAoIGkgPSAwOyBpIDwgd2lkdGg7IGkrKykge1xyXG4gICAgICAgIGRhdGFbaV0gPSBkYXRhWyhoZWlnaHQgLSAxKSAqIHdpZHRoICsgaV0gPSAwO1xyXG4gICAgfVxyXG4gICAgZm9yICggaSA9IDE7IGkgPCBoZWlnaHQgLSAxOyBpKyspIHtcclxuICAgICAgICBkYXRhW2kgKiB3aWR0aF0gPSBkYXRhW2kgKiB3aWR0aCArICh3aWR0aCAtIDEpXSA9IDA7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogSW52ZXJ0cyBhIGJpbmFyeSBpbWFnZSBpbiBwbGFjZVxyXG4gKi9cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5pbnZlcnQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBkYXRhID0gdGhpcy5kYXRhLCBsZW5ndGggPSBkYXRhLmxlbmd0aDtcclxuXHJcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcclxuICAgICAgICBkYXRhW2xlbmd0aF0gPSBkYXRhW2xlbmd0aF0gPyAwIDogMTtcclxuICAgIH1cclxufTtcclxuXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuY29udm9sdmUgPSBmdW5jdGlvbihrZXJuZWwpIHtcclxuICAgIHZhciB4LCB5LCBreCwga3ksIGtTaXplID0gKGtlcm5lbC5sZW5ndGggLyAyKSB8IDAsIGFjY3UgPSAwO1xyXG4gICAgZm9yICggeSA9IDA7IHkgPCB0aGlzLnNpemUueTsgeSsrKSB7XHJcbiAgICAgICAgZm9yICggeCA9IDA7IHggPCB0aGlzLnNpemUueDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGFjY3UgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKCBreSA9IC1rU2l6ZTsga3kgPD0ga1NpemU7IGt5KyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAoIGt4ID0gLWtTaXplOyBreCA8PSBrU2l6ZTsga3grKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY3UgKz0ga2VybmVsW2t5ICsga1NpemVdW2t4ICsga1NpemVdICogdGhpcy5nZXRTYWZlKHggKyBreCwgeSArIGt5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRhdGFbeSAqIHRoaXMuc2l6ZS54ICsgeF0gPSBhY2N1O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUubW9tZW50cyA9IGZ1bmN0aW9uKGxhYmVsY291bnQpIHtcclxuICAgIHZhciBkYXRhID0gdGhpcy5kYXRhLFxyXG4gICAgICAgIHgsXHJcbiAgICAgICAgeSxcclxuICAgICAgICBoZWlnaHQgPSB0aGlzLnNpemUueSxcclxuICAgICAgICB3aWR0aCA9IHRoaXMuc2l6ZS54LFxyXG4gICAgICAgIHZhbCxcclxuICAgICAgICB5c3EsXHJcbiAgICAgICAgbGFiZWxzdW0gPSBbXSxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGxhYmVsLFxyXG4gICAgICAgIG11MTEsXHJcbiAgICAgICAgbXUwMixcclxuICAgICAgICBtdTIwLFxyXG4gICAgICAgIHhfLFxyXG4gICAgICAgIHlfLFxyXG4gICAgICAgIHRtcCxcclxuICAgICAgICByZXN1bHQgPSBbXSxcclxuICAgICAgICBQSSA9IE1hdGguUEksXHJcbiAgICAgICAgUElfNCA9IFBJIC8gNDtcclxuXHJcbiAgICBpZiAobGFiZWxjb3VudCA8PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IGxhYmVsY291bnQ7IGkrKykge1xyXG4gICAgICAgIGxhYmVsc3VtW2ldID0ge1xyXG4gICAgICAgICAgICBtMDA6IDAsXHJcbiAgICAgICAgICAgIG0wMTogMCxcclxuICAgICAgICAgICAgbTEwOiAwLFxyXG4gICAgICAgICAgICBtMTE6IDAsXHJcbiAgICAgICAgICAgIG0wMjogMCxcclxuICAgICAgICAgICAgbTIwOiAwLFxyXG4gICAgICAgICAgICB0aGV0YTogMCxcclxuICAgICAgICAgICAgcmFkOiAwXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgeXNxID0geSAqIHk7XHJcbiAgICAgICAgZm9yICggeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XHJcbiAgICAgICAgICAgIHZhbCA9IGRhdGFbeSAqIHdpZHRoICsgeF07XHJcbiAgICAgICAgICAgIGlmICh2YWwgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbCA9IGxhYmVsc3VtW3ZhbCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgbGFiZWwubTAwICs9IDE7XHJcbiAgICAgICAgICAgICAgICBsYWJlbC5tMDEgKz0geTtcclxuICAgICAgICAgICAgICAgIGxhYmVsLm0xMCArPSB4O1xyXG4gICAgICAgICAgICAgICAgbGFiZWwubTExICs9IHggKiB5O1xyXG4gICAgICAgICAgICAgICAgbGFiZWwubTAyICs9IHlzcTtcclxuICAgICAgICAgICAgICAgIGxhYmVsLm0yMCArPSB4ICogeDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IGxhYmVsY291bnQ7IGkrKykge1xyXG4gICAgICAgIGxhYmVsID0gbGFiZWxzdW1baV07XHJcbiAgICAgICAgaWYgKCFpc05hTihsYWJlbC5tMDApICYmIGxhYmVsLm0wMCAhPT0gMCkge1xyXG4gICAgICAgICAgICB4XyA9IGxhYmVsLm0xMCAvIGxhYmVsLm0wMDtcclxuICAgICAgICAgICAgeV8gPSBsYWJlbC5tMDEgLyBsYWJlbC5tMDA7XHJcbiAgICAgICAgICAgIG11MTEgPSBsYWJlbC5tMTEgLyBsYWJlbC5tMDAgLSB4XyAqIHlfO1xyXG4gICAgICAgICAgICBtdTAyID0gbGFiZWwubTAyIC8gbGFiZWwubTAwIC0geV8gKiB5XztcclxuICAgICAgICAgICAgbXUyMCA9IGxhYmVsLm0yMCAvIGxhYmVsLm0wMCAtIHhfICogeF87XHJcbiAgICAgICAgICAgIHRtcCA9IChtdTAyIC0gbXUyMCkgLyAoMiAqIG11MTEpO1xyXG4gICAgICAgICAgICB0bXAgPSAwLjUgKiBNYXRoLmF0YW4odG1wKSArIChtdTExID49IDAgPyBQSV80IDogLVBJXzQgKSArIFBJO1xyXG4gICAgICAgICAgICBsYWJlbC50aGV0YSA9ICh0bXAgKiAxODAgLyBQSSArIDkwKSAlIDE4MCAtIDkwO1xyXG4gICAgICAgICAgICBpZiAobGFiZWwudGhldGEgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbC50aGV0YSArPSAxODA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGFiZWwucmFkID0gdG1wID4gUEkgPyB0bXAgLSBQSSA6IHRtcDtcclxuICAgICAgICAgICAgbGFiZWwudmVjID0gdmVjMi5jbG9uZShbTWF0aC5jb3ModG1wKSwgTWF0aC5zaW4odG1wKV0pO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChsYWJlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogRGlzcGxheXMgdGhlIHtJbWFnZVdyYXBwZXJ9IGluIGEgZ2l2ZW4gY2FudmFzXHJcbiAqIEBwYXJhbSBjYW52YXMge0NhbnZhc30gVGhlIGNhbnZhcyBlbGVtZW50IHRvIHdyaXRlIHRvXHJcbiAqIEBwYXJhbSBzY2FsZSB7TnVtYmVyfSBTY2FsZSB3aGljaCBpcyBhcHBsaWVkIHRvIGVhY2ggcGl4ZWwtdmFsdWVcclxuICovXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKGNhbnZhcywgc2NhbGUpIHtcclxuICAgIHZhciBjdHgsXHJcbiAgICAgICAgZnJhbWUsXHJcbiAgICAgICAgZGF0YSxcclxuICAgICAgICBjdXJyZW50LFxyXG4gICAgICAgIHBpeGVsLFxyXG4gICAgICAgIHgsXHJcbiAgICAgICAgeTtcclxuXHJcbiAgICBpZiAoIXNjYWxlKSB7XHJcbiAgICAgICAgc2NhbGUgPSAxLjA7XHJcbiAgICB9XHJcbiAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIGNhbnZhcy53aWR0aCA9IHRoaXMuc2l6ZS54O1xyXG4gICAgY2FudmFzLmhlaWdodCA9IHRoaXMuc2l6ZS55O1xyXG4gICAgZnJhbWUgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgICBkYXRhID0gZnJhbWUuZGF0YTtcclxuICAgIGN1cnJlbnQgPSAwO1xyXG4gICAgZm9yICh5ID0gMDsgeSA8IHRoaXMuc2l6ZS55OyB5KyspIHtcclxuICAgICAgICBmb3IgKHggPSAwOyB4IDwgdGhpcy5zaXplLng7IHgrKykge1xyXG4gICAgICAgICAgICBwaXhlbCA9IHkgKiB0aGlzLnNpemUueCArIHg7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLmdldCh4LCB5KSAqIHNjYWxlO1xyXG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDBdID0gY3VycmVudDtcclxuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAxXSA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMl0gPSBjdXJyZW50O1xyXG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDNdID0gMjU1O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vZnJhbWUuZGF0YSA9IGRhdGE7XHJcbiAgICBjdHgucHV0SW1hZ2VEYXRhKGZyYW1lLCAwLCAwKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEaXNwbGF5cyB0aGUge1N1YkltYWdlfSBpbiBhIGdpdmVuIGNhbnZhc1xyXG4gKiBAcGFyYW0gY2FudmFzIHtDYW52YXN9IFRoZSBjYW52YXMgZWxlbWVudCB0byB3cml0ZSB0b1xyXG4gKiBAcGFyYW0gc2NhbGUge051bWJlcn0gU2NhbGUgd2hpY2ggaXMgYXBwbGllZCB0byBlYWNoIHBpeGVsLXZhbHVlXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLm92ZXJsYXkgPSBmdW5jdGlvbihjYW52YXMsIHNjYWxlLCBmcm9tKSB7XHJcbiAgICBpZiAoIXNjYWxlIHx8IHNjYWxlIDwgMCB8fCBzY2FsZSA+IDM2MCkge1xyXG4gICAgICAgIHNjYWxlID0gMzYwO1xyXG4gICAgfVxyXG4gICAgdmFyIGhzdiA9IFswLCAxLCAxXTtcclxuICAgIHZhciByZ2IgPSBbMCwgMCwgMF07XHJcbiAgICB2YXIgd2hpdGVSZ2IgPSBbMjU1LCAyNTUsIDI1NV07XHJcbiAgICB2YXIgYmxhY2tSZ2IgPSBbMCwgMCwgMF07XHJcbiAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICB2YXIgZnJhbWUgPSBjdHguZ2V0SW1hZ2VEYXRhKGZyb20ueCwgZnJvbS55LCB0aGlzLnNpemUueCwgdGhpcy5zaXplLnkpO1xyXG4gICAgdmFyIGRhdGEgPSBmcmFtZS5kYXRhO1xyXG4gICAgdmFyIGxlbmd0aCA9IHRoaXMuZGF0YS5sZW5ndGg7XHJcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcclxuICAgICAgICBoc3ZbMF0gPSB0aGlzLmRhdGFbbGVuZ3RoXSAqIHNjYWxlO1xyXG4gICAgICAgIHJlc3VsdCA9IGhzdlswXSA8PSAwID8gd2hpdGVSZ2IgOiBoc3ZbMF0gPj0gMzYwID8gYmxhY2tSZ2IgOiBDVlV0aWxzLmhzdjJyZ2IoaHN2LCByZ2IpO1xyXG4gICAgICAgIGRhdGFbbGVuZ3RoICogNCArIDBdID0gcmVzdWx0WzBdO1xyXG4gICAgICAgIGRhdGFbbGVuZ3RoICogNCArIDFdID0gcmVzdWx0WzFdO1xyXG4gICAgICAgIGRhdGFbbGVuZ3RoICogNCArIDJdID0gcmVzdWx0WzJdO1xyXG4gICAgICAgIGRhdGFbbGVuZ3RoICogNCArIDNdID0gMjU1O1xyXG4gICAgfVxyXG4gICAgY3R4LnB1dEltYWdlRGF0YShmcmFtZSwgZnJvbS54LCBmcm9tLnkpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VXcmFwcGVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vaW1hZ2Vfd3JhcHBlci5qc1xuICoqLyIsIi8qKlxyXG4gKiBDb25zdHJ1Y3QgcmVwcmVzZW50aW5nIGEgcGFydCBvZiBhbm90aGVyIHtJbWFnZVdyYXBwZXJ9LiBTaGFyZXMgZGF0YVxyXG4gKiBiZXR3ZWVuIHRoZSBwYXJlbnQgYW5kIHRoZSBjaGlsZC5cclxuICogQHBhcmFtIGZyb20ge0ltYWdlUmVmfSBUaGUgcG9zaXRpb24gd2hlcmUgdG8gc3RhcnQgdGhlIHtTdWJJbWFnZX0gZnJvbS4gKHRvcC1sZWZ0IGNvcm5lcilcclxuICogQHBhcmFtIHNpemUge0ltYWdlUmVmfSBUaGUgc2l6ZSBvZiB0aGUgcmVzdWx0aW5nIGltYWdlXHJcbiAqIEBwYXJhbSBJIHtJbWFnZVdyYXBwZXJ9IFRoZSB7SW1hZ2VXcmFwcGVyfSB0byBzaGFyZSBmcm9tXHJcbiAqIEByZXR1cm5zIHtTdWJJbWFnZX0gQSBzaGFyZWQgcGFydCBvZiB0aGUgb3JpZ2luYWwgaW1hZ2VcclxuICovXHJcbmZ1bmN0aW9uIFN1YkltYWdlKGZyb20sIHNpemUsIEkpIHtcclxuICAgIGlmICghSSkge1xyXG4gICAgICAgIEkgPSB7XHJcbiAgICAgICAgICAgIGRhdGE6IG51bGwsXHJcbiAgICAgICAgICAgIHNpemU6IHNpemVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgdGhpcy5kYXRhID0gSS5kYXRhO1xyXG4gICAgdGhpcy5vcmlnaW5hbFNpemUgPSBJLnNpemU7XHJcbiAgICB0aGlzLkkgPSBJO1xyXG5cclxuICAgIHRoaXMuZnJvbSA9IGZyb207XHJcbiAgICB0aGlzLnNpemUgPSBzaXplO1xyXG59XHJcblxyXG4vKipcclxuICogRGlzcGxheXMgdGhlIHtTdWJJbWFnZX0gaW4gYSBnaXZlbiBjYW52YXNcclxuICogQHBhcmFtIGNhbnZhcyB7Q2FudmFzfSBUaGUgY2FudmFzIGVsZW1lbnQgdG8gd3JpdGUgdG9cclxuICogQHBhcmFtIHNjYWxlIHtOdW1iZXJ9IFNjYWxlIHdoaWNoIGlzIGFwcGxpZWQgdG8gZWFjaCBwaXhlbC12YWx1ZVxyXG4gKi9cclxuU3ViSW1hZ2UucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbihjYW52YXMsIHNjYWxlKSB7XHJcbiAgICB2YXIgY3R4LFxyXG4gICAgICAgIGZyYW1lLFxyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgY3VycmVudCxcclxuICAgICAgICB5LFxyXG4gICAgICAgIHgsXHJcbiAgICAgICAgcGl4ZWw7XHJcblxyXG4gICAgaWYgKCFzY2FsZSkge1xyXG4gICAgICAgIHNjYWxlID0gMS4wO1xyXG4gICAgfVxyXG4gICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICBjYW52YXMud2lkdGggPSB0aGlzLnNpemUueDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSB0aGlzLnNpemUueTtcclxuICAgIGZyYW1lID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG4gICAgZGF0YSA9IGZyYW1lLmRhdGE7XHJcbiAgICBjdXJyZW50ID0gMDtcclxuICAgIGZvciAoeSA9IDA7IHkgPCB0aGlzLnNpemUueTsgeSsrKSB7XHJcbiAgICAgICAgZm9yICh4ID0gMDsgeCA8IHRoaXMuc2l6ZS54OyB4KyspIHtcclxuICAgICAgICAgICAgcGl4ZWwgPSB5ICogdGhpcy5zaXplLnggKyB4O1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gdGhpcy5nZXQoeCwgeSkgKiBzY2FsZTtcclxuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAwXSA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMV0gPSBjdXJyZW50O1xyXG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDJdID0gY3VycmVudDtcclxuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAzXSA9IDI1NTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmcmFtZS5kYXRhID0gZGF0YTtcclxuICAgIGN0eC5wdXRJbWFnZURhdGEoZnJhbWUsIDAsIDApO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlcyBhIGdpdmVuIHBpeGVsIHBvc2l0aW9uIGZyb20gdGhlIHtTdWJJbWFnZX1cclxuICogQHBhcmFtIHgge051bWJlcn0gVGhlIHgtcG9zaXRpb25cclxuICogQHBhcmFtIHkge051bWJlcn0gVGhlIHktcG9zaXRpb25cclxuICogQHJldHVybnMge051bWJlcn0gVGhlIGdyYXlzY2FsZSB2YWx1ZSBhdCB0aGUgcGl4ZWwtcG9zaXRpb25cclxuICovXHJcblN1YkltYWdlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhWyh0aGlzLmZyb20ueSArIHkpICogdGhpcy5vcmlnaW5hbFNpemUueCArIHRoaXMuZnJvbS54ICsgeF07XHJcbn07XHJcblxyXG4vKipcclxuICogVXBkYXRlcyB0aGUgdW5kZXJseWluZyBkYXRhIGZyb20gYSBnaXZlbiB7SW1hZ2VXcmFwcGVyfVxyXG4gKiBAcGFyYW0gaW1hZ2Uge0ltYWdlV3JhcHBlcn0gVGhlIHVwZGF0ZWQgaW1hZ2VcclxuICovXHJcblN1YkltYWdlLnByb3RvdHlwZS51cGRhdGVEYXRhID0gZnVuY3Rpb24oaW1hZ2UpIHtcclxuICAgIHRoaXMub3JpZ2luYWxTaXplID0gaW1hZ2Uuc2l6ZTtcclxuICAgIHRoaXMuZGF0YSA9IGltYWdlLmRhdGE7XHJcbn07XHJcblxyXG4vKipcclxuICogVXBkYXRlcyB0aGUgcG9zaXRpb24gb2YgdGhlIHNoYXJlZCBhcmVhXHJcbiAqIEBwYXJhbSBmcm9tIHt4LHl9IFRoZSBuZXcgbG9jYXRpb25cclxuICogQHJldHVybnMge1N1YkltYWdlfSByZXR1cm5zIHt0aGlzfSBmb3IgcG9zc2libGUgY2hhaW5pbmdcclxuICovXHJcblN1YkltYWdlLnByb3RvdHlwZS51cGRhdGVGcm9tID0gZnVuY3Rpb24oZnJvbSkge1xyXG4gICAgdGhpcy5mcm9tID0gZnJvbTtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKFN1YkltYWdlKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvY29tbW9uL3N1YkltYWdlLmpzXG4gKiovIiwiaW1wb3J0IENsdXN0ZXIyIGZyb20gJy4vY2x1c3Rlcic7XHJcbmltcG9ydCBBcnJheUhlbHBlciBmcm9tICcuL2FycmF5X2hlbHBlcic7XHJcbmltcG9ydCB7dmVjMiwgdmVjM30gZnJvbSAnZ2wtbWF0cml4JztcclxuXHJcbnZhciBDVlV0aWxzID0ge307XHJcblxyXG4vKipcclxuICogQHBhcmFtIHggeC1jb29yZGluYXRlXHJcbiAqIEBwYXJhbSB5IHktY29vcmRpbmF0ZVxyXG4gKiBAcmV0dXJuIEltYWdlUmVmZXJlbmNlIHt4LHl9IENvb3JkaW5hdGVcclxuICovXHJcbkNWVXRpbHMuaW1hZ2VSZWYgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICB2YXIgdGhhdCA9IHtcclxuICAgICAgICB4OiB4LFxyXG4gICAgICAgIHk6IHksXHJcbiAgICAgICAgdG9WZWMyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZlYzIuY2xvbmUoW3RoaXMueCwgdGhpcy55XSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b1ZlYzM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmVjMy5jbG9uZShbdGhpcy54LCB0aGlzLnksIDFdKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvdW5kOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy54ID0gdGhpcy54ID4gMC4wID8gTWF0aC5mbG9vcih0aGlzLnggKyAwLjUpIDogTWF0aC5mbG9vcih0aGlzLnggLSAwLjUpO1xyXG4gICAgICAgICAgICB0aGlzLnkgPSB0aGlzLnkgPiAwLjAgPyBNYXRoLmZsb29yKHRoaXMueSArIDAuNSkgOiBNYXRoLmZsb29yKHRoaXMueSAtIDAuNSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb21wdXRlcyBhbiBpbnRlZ3JhbCBpbWFnZSBvZiBhIGdpdmVuIGdyYXlzY2FsZSBpbWFnZS5cclxuICogQHBhcmFtIGltYWdlRGF0YUNvbnRhaW5lciB7SW1hZ2VEYXRhQ29udGFpbmVyfSB0aGUgaW1hZ2UgdG8gYmUgaW50ZWdyYXRlZFxyXG4gKi9cclxuQ1ZVdGlscy5jb21wdXRlSW50ZWdyYWxJbWFnZTIgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGludGVncmFsV3JhcHBlcikge1xyXG4gICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhO1xyXG4gICAgdmFyIHdpZHRoID0gaW1hZ2VXcmFwcGVyLnNpemUueDtcclxuICAgIHZhciBoZWlnaHQgPSBpbWFnZVdyYXBwZXIuc2l6ZS55O1xyXG4gICAgdmFyIGludGVncmFsSW1hZ2VEYXRhID0gaW50ZWdyYWxXcmFwcGVyLmRhdGE7XHJcbiAgICB2YXIgc3VtID0gMCwgcG9zQSA9IDAsIHBvc0IgPSAwLCBwb3NDID0gMCwgcG9zRCA9IDAsIHgsIHk7XHJcblxyXG4gICAgLy8gc3VtIHVwIGZpcnN0IGNvbHVtblxyXG4gICAgcG9zQiA9IHdpZHRoO1xyXG4gICAgc3VtID0gMDtcclxuICAgIGZvciAoIHkgPSAxOyB5IDwgaGVpZ2h0OyB5KyspIHtcclxuICAgICAgICBzdW0gKz0gaW1hZ2VEYXRhW3Bvc0FdO1xyXG4gICAgICAgIGludGVncmFsSW1hZ2VEYXRhW3Bvc0JdICs9IHN1bTtcclxuICAgICAgICBwb3NBICs9IHdpZHRoO1xyXG4gICAgICAgIHBvc0IgKz0gd2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zQSA9IDA7XHJcbiAgICBwb3NCID0gMTtcclxuICAgIHN1bSA9IDA7XHJcbiAgICBmb3IgKCB4ID0gMTsgeCA8IHdpZHRoOyB4KyspIHtcclxuICAgICAgICBzdW0gKz0gaW1hZ2VEYXRhW3Bvc0FdO1xyXG4gICAgICAgIGludGVncmFsSW1hZ2VEYXRhW3Bvc0JdICs9IHN1bTtcclxuICAgICAgICBwb3NBKys7XHJcbiAgICAgICAgcG9zQisrO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIHkgPSAxOyB5IDwgaGVpZ2h0OyB5KyspIHtcclxuICAgICAgICBwb3NBID0geSAqIHdpZHRoICsgMTtcclxuICAgICAgICBwb3NCID0gKHkgLSAxKSAqIHdpZHRoICsgMTtcclxuICAgICAgICBwb3NDID0geSAqIHdpZHRoO1xyXG4gICAgICAgIHBvc0QgPSAoeSAtIDEpICogd2lkdGg7XHJcbiAgICAgICAgZm9yICggeCA9IDE7IHggPCB3aWR0aDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGludGVncmFsSW1hZ2VEYXRhW3Bvc0FdICs9XHJcbiAgICAgICAgICAgICAgICBpbWFnZURhdGFbcG9zQV0gKyBpbnRlZ3JhbEltYWdlRGF0YVtwb3NCXSArIGludGVncmFsSW1hZ2VEYXRhW3Bvc0NdIC0gaW50ZWdyYWxJbWFnZURhdGFbcG9zRF07XHJcbiAgICAgICAgICAgIHBvc0ErKztcclxuICAgICAgICAgICAgcG9zQisrO1xyXG4gICAgICAgICAgICBwb3NDKys7XHJcbiAgICAgICAgICAgIHBvc0QrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLmNvbXB1dGVJbnRlZ3JhbEltYWdlID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCBpbnRlZ3JhbFdyYXBwZXIpIHtcclxuICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YTtcclxuICAgIHZhciB3aWR0aCA9IGltYWdlV3JhcHBlci5zaXplLng7XHJcbiAgICB2YXIgaGVpZ2h0ID0gaW1hZ2VXcmFwcGVyLnNpemUueTtcclxuICAgIHZhciBpbnRlZ3JhbEltYWdlRGF0YSA9IGludGVncmFsV3JhcHBlci5kYXRhO1xyXG4gICAgdmFyIHN1bSA9IDA7XHJcblxyXG4gICAgLy8gc3VtIHVwIGZpcnN0IHJvd1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XHJcbiAgICAgICAgc3VtICs9IGltYWdlRGF0YVtpXTtcclxuICAgICAgICBpbnRlZ3JhbEltYWdlRGF0YVtpXSA9IHN1bTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciB2ID0gMTsgdiA8IGhlaWdodDsgdisrKSB7XHJcbiAgICAgICAgc3VtID0gMDtcclxuICAgICAgICBmb3IgKHZhciB1ID0gMDsgdSA8IHdpZHRoOyB1KyspIHtcclxuICAgICAgICAgICAgc3VtICs9IGltYWdlRGF0YVt2ICogd2lkdGggKyB1XTtcclxuICAgICAgICAgICAgaW50ZWdyYWxJbWFnZURhdGFbKCh2KSAqIHdpZHRoKSArIHVdID0gc3VtICsgaW50ZWdyYWxJbWFnZURhdGFbKHYgLSAxKSAqIHdpZHRoICsgdV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy50aHJlc2hvbGRJbWFnZSA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgdGhyZXNob2xkLCB0YXJnZXRXcmFwcGVyKSB7XHJcbiAgICBpZiAoIXRhcmdldFdyYXBwZXIpIHtcclxuICAgICAgICB0YXJnZXRXcmFwcGVyID0gaW1hZ2VXcmFwcGVyO1xyXG4gICAgfVxyXG4gICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhLCBsZW5ndGggPSBpbWFnZURhdGEubGVuZ3RoLCB0YXJnZXREYXRhID0gdGFyZ2V0V3JhcHBlci5kYXRhO1xyXG5cclxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgIHRhcmdldERhdGFbbGVuZ3RoXSA9IGltYWdlRGF0YVtsZW5ndGhdIDwgdGhyZXNob2xkID8gMSA6IDA7XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLmNvbXB1dGVIaXN0b2dyYW0gPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGJpdHNQZXJQaXhlbCkge1xyXG4gICAgaWYgKCFiaXRzUGVyUGl4ZWwpIHtcclxuICAgICAgICBiaXRzUGVyUGl4ZWwgPSA4O1xyXG4gICAgfVxyXG4gICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgIGxlbmd0aCA9IGltYWdlRGF0YS5sZW5ndGgsXHJcbiAgICAgICAgYml0U2hpZnQgPSA4IC0gYml0c1BlclBpeGVsLFxyXG4gICAgICAgIGJ1Y2tldENudCA9IDEgPDwgYml0c1BlclBpeGVsLFxyXG4gICAgICAgIGhpc3QgPSBuZXcgSW50MzJBcnJheShidWNrZXRDbnQpO1xyXG5cclxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgIGhpc3RbaW1hZ2VEYXRhW2xlbmd0aF0gPj4gYml0U2hpZnRdKys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGlzdDtcclxufTtcclxuXHJcbkNWVXRpbHMuc2hhcnBlbkxpbmUgPSBmdW5jdGlvbihsaW5lKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBsZW5ndGggPSBsaW5lLmxlbmd0aCxcclxuICAgICAgICBsZWZ0ID0gbGluZVswXSxcclxuICAgICAgICBjZW50ZXIgPSBsaW5lWzFdLFxyXG4gICAgICAgIHJpZ2h0O1xyXG5cclxuICAgIGZvciAoaSA9IDE7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICByaWdodCA9IGxpbmVbaSArIDFdO1xyXG4gICAgICAgIC8vICAtMSA0IC0xIGtlcm5lbFxyXG4gICAgICAgIGxpbmVbaSAtIDFdID0gKCgoY2VudGVyICogMikgLSBsZWZ0IC0gcmlnaHQpKSAmIDI1NTtcclxuICAgICAgICBsZWZ0ID0gY2VudGVyO1xyXG4gICAgICAgIGNlbnRlciA9IHJpZ2h0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpbmU7XHJcbn07XHJcblxyXG5DVlV0aWxzLmRldGVybWluZU90c3VUaHJlc2hvbGQgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGJpdHNQZXJQaXhlbCkge1xyXG4gICAgaWYgKCFiaXRzUGVyUGl4ZWwpIHtcclxuICAgICAgICBiaXRzUGVyUGl4ZWwgPSA4O1xyXG4gICAgfVxyXG4gICAgdmFyIGhpc3QsXHJcbiAgICAgICAgdGhyZXNob2xkLFxyXG4gICAgICAgIGJpdFNoaWZ0ID0gOCAtIGJpdHNQZXJQaXhlbDtcclxuXHJcbiAgICBmdW5jdGlvbiBweChpbml0LCBlbmQpIHtcclxuICAgICAgICB2YXIgc3VtID0gMCwgaTtcclxuICAgICAgICBmb3IgKCBpID0gaW5pdDsgaSA8PSBlbmQ7IGkrKykge1xyXG4gICAgICAgICAgICBzdW0gKz0gaGlzdFtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1bTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBteChpbml0LCBlbmQpIHtcclxuICAgICAgICB2YXIgaSwgc3VtID0gMDtcclxuXHJcbiAgICAgICAgZm9yICggaSA9IGluaXQ7IGkgPD0gZW5kOyBpKyspIHtcclxuICAgICAgICAgICAgc3VtICs9IGkgKiBoaXN0W2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN1bTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZXRlcm1pbmVUaHJlc2hvbGQoKSB7XHJcbiAgICAgICAgdmFyIHZldCA9IFswXSwgcDEsIHAyLCBwMTIsIGssIG0xLCBtMiwgbTEyLFxyXG4gICAgICAgICAgICBtYXggPSAoMSA8PCBiaXRzUGVyUGl4ZWwpIC0gMTtcclxuXHJcbiAgICAgICAgaGlzdCA9IENWVXRpbHMuY29tcHV0ZUhpc3RvZ3JhbShpbWFnZVdyYXBwZXIsIGJpdHNQZXJQaXhlbCk7XHJcbiAgICAgICAgZm9yICggayA9IDE7IGsgPCBtYXg7IGsrKykge1xyXG4gICAgICAgICAgICBwMSA9IHB4KDAsIGspO1xyXG4gICAgICAgICAgICBwMiA9IHB4KGsgKyAxLCBtYXgpO1xyXG4gICAgICAgICAgICBwMTIgPSBwMSAqIHAyO1xyXG4gICAgICAgICAgICBpZiAocDEyID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBwMTIgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG0xID0gbXgoMCwgaykgKiBwMjtcclxuICAgICAgICAgICAgbTIgPSBteChrICsgMSwgbWF4KSAqIHAxO1xyXG4gICAgICAgICAgICBtMTIgPSBtMSAtIG0yO1xyXG4gICAgICAgICAgICB2ZXRba10gPSBtMTIgKiBtMTIgLyBwMTI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBcnJheUhlbHBlci5tYXhJbmRleCh2ZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRocmVzaG9sZCA9IGRldGVybWluZVRocmVzaG9sZCgpO1xyXG4gICAgcmV0dXJuIHRocmVzaG9sZCA8PCBiaXRTaGlmdDtcclxufTtcclxuXHJcbkNWVXRpbHMub3RzdVRocmVzaG9sZCA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgdGFyZ2V0V3JhcHBlcikge1xyXG4gICAgdmFyIHRocmVzaG9sZCA9IENWVXRpbHMuZGV0ZXJtaW5lT3RzdVRocmVzaG9sZChpbWFnZVdyYXBwZXIpO1xyXG5cclxuICAgIENWVXRpbHMudGhyZXNob2xkSW1hZ2UoaW1hZ2VXcmFwcGVyLCB0aHJlc2hvbGQsIHRhcmdldFdyYXBwZXIpO1xyXG4gICAgcmV0dXJuIHRocmVzaG9sZDtcclxufTtcclxuXHJcbi8vIGxvY2FsIHRocmVzaG9sZGluZ1xyXG5DVlV0aWxzLmNvbXB1dGVCaW5hcnlJbWFnZSA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgaW50ZWdyYWxXcmFwcGVyLCB0YXJnZXRXcmFwcGVyKSB7XHJcbiAgICBDVlV0aWxzLmNvbXB1dGVJbnRlZ3JhbEltYWdlKGltYWdlV3JhcHBlciwgaW50ZWdyYWxXcmFwcGVyKTtcclxuXHJcbiAgICBpZiAoIXRhcmdldFdyYXBwZXIpIHtcclxuICAgICAgICB0YXJnZXRXcmFwcGVyID0gaW1hZ2VXcmFwcGVyO1xyXG4gICAgfVxyXG4gICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhO1xyXG4gICAgdmFyIHRhcmdldERhdGEgPSB0YXJnZXRXcmFwcGVyLmRhdGE7XHJcbiAgICB2YXIgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54O1xyXG4gICAgdmFyIGhlaWdodCA9IGltYWdlV3JhcHBlci5zaXplLnk7XHJcbiAgICB2YXIgaW50ZWdyYWxJbWFnZURhdGEgPSBpbnRlZ3JhbFdyYXBwZXIuZGF0YTtcclxuICAgIHZhciBzdW0gPSAwLCB2LCB1LCBrZXJuZWwgPSAzLCBBLCBCLCBDLCBELCBhdmcsIHNpemUgPSAoa2VybmVsICogMiArIDEpICogKGtlcm5lbCAqIDIgKyAxKTtcclxuXHJcbiAgICAvLyBjbGVhciBvdXQgdG9wICYgYm90dG9tLWJvcmRlclxyXG4gICAgZm9yICggdiA9IDA7IHYgPD0ga2VybmVsOyB2KyspIHtcclxuICAgICAgICBmb3IgKCB1ID0gMDsgdSA8IHdpZHRoOyB1KyspIHtcclxuICAgICAgICAgICAgdGFyZ2V0RGF0YVsoKHYpICogd2lkdGgpICsgdV0gPSAwO1xyXG4gICAgICAgICAgICB0YXJnZXREYXRhWygoKGhlaWdodCAtIDEpIC0gdikgKiB3aWR0aCkgKyB1XSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNsZWFyIG91dCBsZWZ0ICYgcmlnaHQgYm9yZGVyXHJcbiAgICBmb3IgKCB2ID0ga2VybmVsOyB2IDwgaGVpZ2h0IC0ga2VybmVsOyB2KyspIHtcclxuICAgICAgICBmb3IgKCB1ID0gMDsgdSA8PSBrZXJuZWw7IHUrKykge1xyXG4gICAgICAgICAgICB0YXJnZXREYXRhWygodikgKiB3aWR0aCkgKyB1XSA9IDA7XHJcbiAgICAgICAgICAgIHRhcmdldERhdGFbKCh2KSAqIHdpZHRoKSArICh3aWR0aCAtIDEgLSB1KV0gPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCB2ID0ga2VybmVsICsgMTsgdiA8IGhlaWdodCAtIGtlcm5lbCAtIDE7IHYrKykge1xyXG4gICAgICAgIGZvciAoIHUgPSBrZXJuZWwgKyAxOyB1IDwgd2lkdGggLSBrZXJuZWw7IHUrKykge1xyXG4gICAgICAgICAgICBBID0gaW50ZWdyYWxJbWFnZURhdGFbKHYgLSBrZXJuZWwgLSAxKSAqIHdpZHRoICsgKHUgLSBrZXJuZWwgLSAxKV07XHJcbiAgICAgICAgICAgIEIgPSBpbnRlZ3JhbEltYWdlRGF0YVsodiAtIGtlcm5lbCAtIDEpICogd2lkdGggKyAodSArIGtlcm5lbCldO1xyXG4gICAgICAgICAgICBDID0gaW50ZWdyYWxJbWFnZURhdGFbKHYgKyBrZXJuZWwpICogd2lkdGggKyAodSAtIGtlcm5lbCAtIDEpXTtcclxuICAgICAgICAgICAgRCA9IGludGVncmFsSW1hZ2VEYXRhWyh2ICsga2VybmVsKSAqIHdpZHRoICsgKHUgKyBrZXJuZWwpXTtcclxuICAgICAgICAgICAgc3VtID0gRCAtIEMgLSBCICsgQTtcclxuICAgICAgICAgICAgYXZnID0gc3VtIC8gKHNpemUpO1xyXG4gICAgICAgICAgICB0YXJnZXREYXRhW3YgKiB3aWR0aCArIHVdID0gaW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdID4gKGF2ZyArIDUpID8gMCA6IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5jbHVzdGVyID0gZnVuY3Rpb24ocG9pbnRzLCB0aHJlc2hvbGQsIHByb3BlcnR5KSB7XHJcbiAgICB2YXIgaSwgaywgY2x1c3RlciwgcG9pbnQsIGNsdXN0ZXJzID0gW107XHJcblxyXG4gICAgaWYgKCFwcm9wZXJ0eSkge1xyXG4gICAgICAgIHByb3BlcnR5ID0gXCJyYWRcIjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRUb0NsdXN0ZXIobmV3UG9pbnQpIHtcclxuICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKCBrID0gMDsgayA8IGNsdXN0ZXJzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIGNsdXN0ZXIgPSBjbHVzdGVyc1trXTtcclxuICAgICAgICAgICAgaWYgKGNsdXN0ZXIuZml0cyhuZXdQb2ludCkpIHtcclxuICAgICAgICAgICAgICAgIGNsdXN0ZXIuYWRkKG5ld1BvaW50KTtcclxuICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGVhY2ggY2xvdWRcclxuICAgIGZvciAoIGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcG9pbnQgPSBDbHVzdGVyMi5jcmVhdGVQb2ludChwb2ludHNbaV0sIGksIHByb3BlcnR5KTtcclxuICAgICAgICBpZiAoIWFkZFRvQ2x1c3Rlcihwb2ludCkpIHtcclxuICAgICAgICAgICAgY2x1c3RlcnMucHVzaChDbHVzdGVyMi5jcmVhdGUocG9pbnQsIHRocmVzaG9sZCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjbHVzdGVycztcclxufTtcclxuXHJcbkNWVXRpbHMuVHJhY2VyID0ge1xyXG4gICAgdHJhY2U6IGZ1bmN0aW9uKHBvaW50cywgdmVjKSB7XHJcbiAgICAgICAgdmFyIGl0ZXJhdGlvbiwgbWF4SXRlcmF0aW9ucyA9IDEwLCB0b3AgPSBbXSwgcmVzdWx0ID0gW10sIGNlbnRlclBvcyA9IDAsIGN1cnJlbnRQb3MgPSAwO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmFjZShpZHgsIGZvcndhcmQpIHtcclxuICAgICAgICAgICAgdmFyIGZyb20sIHRvLCB0b0lkeCwgcHJlZGljdGVkUG9zLCB0aHJlc2hvbGRYID0gMSwgdGhyZXNob2xkWSA9IE1hdGguYWJzKHZlY1sxXSAvIDEwKSwgZm91bmQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG1hdGNoKHBvcywgcHJlZGljdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocG9zLnggPiAocHJlZGljdGVkLnggLSB0aHJlc2hvbGRYKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBwb3MueCA8IChwcmVkaWN0ZWQueCArIHRocmVzaG9sZFgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHBvcy55ID4gKHByZWRpY3RlZC55IC0gdGhyZXNob2xkWSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgcG9zLnkgPCAocHJlZGljdGVkLnkgKyB0aHJlc2hvbGRZKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBuZXh0IGluZGV4IGlzIHdpdGhpbiB0aGUgdmVjIHNwZWNpZmljYXRpb25zXHJcbiAgICAgICAgICAgIC8vIGlmIG5vdCwgY2hlY2sgYXMgbG9uZyBhcyB0aGUgdGhyZXNob2xkIGlzIG1ldFxyXG5cclxuICAgICAgICAgICAgZnJvbSA9IHBvaW50c1tpZHhdO1xyXG4gICAgICAgICAgICBpZiAoZm9yd2FyZCkge1xyXG4gICAgICAgICAgICAgICAgcHJlZGljdGVkUG9zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGZyb20ueCArIHZlY1swXSxcclxuICAgICAgICAgICAgICAgICAgICB5OiBmcm9tLnkgKyB2ZWNbMV1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwcmVkaWN0ZWRQb3MgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogZnJvbS54IC0gdmVjWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IGZyb20ueSAtIHZlY1sxXVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdG9JZHggPSBmb3J3YXJkID8gaWR4ICsgMSA6IGlkeCAtIDE7XHJcbiAgICAgICAgICAgIHRvID0gcG9pbnRzW3RvSWR4XTtcclxuICAgICAgICAgICAgd2hpbGUgKHRvICYmICggZm91bmQgPSBtYXRjaCh0bywgcHJlZGljdGVkUG9zKSkgIT09IHRydWUgJiYgKE1hdGguYWJzKHRvLnkgLSBmcm9tLnkpIDwgdmVjWzFdKSkge1xyXG4gICAgICAgICAgICAgICAgdG9JZHggPSBmb3J3YXJkID8gdG9JZHggKyAxIDogdG9JZHggLSAxO1xyXG4gICAgICAgICAgICAgICAgdG8gPSBwb2ludHNbdG9JZHhdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZm91bmQgPyB0b0lkeCA6IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKCBpdGVyYXRpb24gPSAwOyBpdGVyYXRpb24gPCBtYXhJdGVyYXRpb25zOyBpdGVyYXRpb24rKykge1xyXG4gICAgICAgICAgICAvLyByYW5kb21seSBzZWxlY3QgcG9pbnQgdG8gc3RhcnQgd2l0aFxyXG4gICAgICAgICAgICBjZW50ZXJQb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb2ludHMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRyYWNlIGZvcndhcmRcclxuICAgICAgICAgICAgdG9wID0gW107XHJcbiAgICAgICAgICAgIGN1cnJlbnRQb3MgPSBjZW50ZXJQb3M7XHJcbiAgICAgICAgICAgIHRvcC5wdXNoKHBvaW50c1tjdXJyZW50UG9zXSk7XHJcbiAgICAgICAgICAgIHdoaWxlICgoIGN1cnJlbnRQb3MgPSB0cmFjZShjdXJyZW50UG9zLCB0cnVlKSkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRvcC5wdXNoKHBvaW50c1tjdXJyZW50UG9zXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNlbnRlclBvcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQb3MgPSBjZW50ZXJQb3M7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoKCBjdXJyZW50UG9zID0gdHJhY2UoY3VycmVudFBvcywgZmFsc2UpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcC5wdXNoKHBvaW50c1tjdXJyZW50UG9zXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0b3AubGVuZ3RoID4gcmVzdWx0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdG9wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLkRJTEFURSA9IDE7XHJcbkNWVXRpbHMuRVJPREUgPSAyO1xyXG5cclxuQ1ZVdGlscy5kaWxhdGUgPSBmdW5jdGlvbihpbkltYWdlV3JhcHBlciwgb3V0SW1hZ2VXcmFwcGVyKSB7XHJcbiAgICB2YXIgdixcclxuICAgICAgICB1LFxyXG4gICAgICAgIGluSW1hZ2VEYXRhID0gaW5JbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICBvdXRJbWFnZURhdGEgPSBvdXRJbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICBoZWlnaHQgPSBpbkltYWdlV3JhcHBlci5zaXplLnksXHJcbiAgICAgICAgd2lkdGggPSBpbkltYWdlV3JhcHBlci5zaXplLngsXHJcbiAgICAgICAgc3VtLFxyXG4gICAgICAgIHlTdGFydDEsXHJcbiAgICAgICAgeVN0YXJ0MixcclxuICAgICAgICB4U3RhcnQxLFxyXG4gICAgICAgIHhTdGFydDI7XHJcblxyXG4gICAgZm9yICggdiA9IDE7IHYgPCBoZWlnaHQgLSAxOyB2KyspIHtcclxuICAgICAgICBmb3IgKCB1ID0gMTsgdSA8IHdpZHRoIC0gMTsgdSsrKSB7XHJcbiAgICAgICAgICAgIHlTdGFydDEgPSB2IC0gMTtcclxuICAgICAgICAgICAgeVN0YXJ0MiA9IHYgKyAxO1xyXG4gICAgICAgICAgICB4U3RhcnQxID0gdSAtIDE7XHJcbiAgICAgICAgICAgIHhTdGFydDIgPSB1ICsgMTtcclxuICAgICAgICAgICAgc3VtID0gaW5JbWFnZURhdGFbeVN0YXJ0MSAqIHdpZHRoICsgeFN0YXJ0MV0gKyBpbkltYWdlRGF0YVt5U3RhcnQxICogd2lkdGggKyB4U3RhcnQyXSArXHJcbiAgICAgICAgICAgIGluSW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdICtcclxuICAgICAgICAgICAgaW5JbWFnZURhdGFbeVN0YXJ0MiAqIHdpZHRoICsgeFN0YXJ0MV0gKyBpbkltYWdlRGF0YVt5U3RhcnQyICogd2lkdGggKyB4U3RhcnQyXTtcclxuICAgICAgICAgICAgb3V0SW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdID0gc3VtID4gMCA/IDEgOiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMuZXJvZGUgPSBmdW5jdGlvbihpbkltYWdlV3JhcHBlciwgb3V0SW1hZ2VXcmFwcGVyKSB7XHJcbiAgICB2YXIgdixcclxuICAgICAgICB1LFxyXG4gICAgICAgIGluSW1hZ2VEYXRhID0gaW5JbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICBvdXRJbWFnZURhdGEgPSBvdXRJbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICBoZWlnaHQgPSBpbkltYWdlV3JhcHBlci5zaXplLnksXHJcbiAgICAgICAgd2lkdGggPSBpbkltYWdlV3JhcHBlci5zaXplLngsXHJcbiAgICAgICAgc3VtLFxyXG4gICAgICAgIHlTdGFydDEsXHJcbiAgICAgICAgeVN0YXJ0MixcclxuICAgICAgICB4U3RhcnQxLFxyXG4gICAgICAgIHhTdGFydDI7XHJcblxyXG4gICAgZm9yICggdiA9IDE7IHYgPCBoZWlnaHQgLSAxOyB2KyspIHtcclxuICAgICAgICBmb3IgKCB1ID0gMTsgdSA8IHdpZHRoIC0gMTsgdSsrKSB7XHJcbiAgICAgICAgICAgIHlTdGFydDEgPSB2IC0gMTtcclxuICAgICAgICAgICAgeVN0YXJ0MiA9IHYgKyAxO1xyXG4gICAgICAgICAgICB4U3RhcnQxID0gdSAtIDE7XHJcbiAgICAgICAgICAgIHhTdGFydDIgPSB1ICsgMTtcclxuICAgICAgICAgICAgc3VtID0gaW5JbWFnZURhdGFbeVN0YXJ0MSAqIHdpZHRoICsgeFN0YXJ0MV0gKyBpbkltYWdlRGF0YVt5U3RhcnQxICogd2lkdGggKyB4U3RhcnQyXSArXHJcbiAgICAgICAgICAgIGluSW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdICtcclxuICAgICAgICAgICAgaW5JbWFnZURhdGFbeVN0YXJ0MiAqIHdpZHRoICsgeFN0YXJ0MV0gKyBpbkltYWdlRGF0YVt5U3RhcnQyICogd2lkdGggKyB4U3RhcnQyXTtcclxuICAgICAgICAgICAgb3V0SW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdID0gc3VtID09PSA1ID8gMSA6IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5zdWJ0cmFjdCA9IGZ1bmN0aW9uKGFJbWFnZVdyYXBwZXIsIGJJbWFnZVdyYXBwZXIsIHJlc3VsdEltYWdlV3JhcHBlcikge1xyXG4gICAgaWYgKCFyZXN1bHRJbWFnZVdyYXBwZXIpIHtcclxuICAgICAgICByZXN1bHRJbWFnZVdyYXBwZXIgPSBhSW1hZ2VXcmFwcGVyO1xyXG4gICAgfVxyXG4gICAgdmFyIGxlbmd0aCA9IGFJbWFnZVdyYXBwZXIuZGF0YS5sZW5ndGgsXHJcbiAgICAgICAgYUltYWdlRGF0YSA9IGFJbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICBiSW1hZ2VEYXRhID0gYkltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgIGNJbWFnZURhdGEgPSByZXN1bHRJbWFnZVdyYXBwZXIuZGF0YTtcclxuXHJcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcclxuICAgICAgICBjSW1hZ2VEYXRhW2xlbmd0aF0gPSBhSW1hZ2VEYXRhW2xlbmd0aF0gLSBiSW1hZ2VEYXRhW2xlbmd0aF07XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLmJpdHdpc2VPciA9IGZ1bmN0aW9uKGFJbWFnZVdyYXBwZXIsIGJJbWFnZVdyYXBwZXIsIHJlc3VsdEltYWdlV3JhcHBlcikge1xyXG4gICAgaWYgKCFyZXN1bHRJbWFnZVdyYXBwZXIpIHtcclxuICAgICAgICByZXN1bHRJbWFnZVdyYXBwZXIgPSBhSW1hZ2VXcmFwcGVyO1xyXG4gICAgfVxyXG4gICAgdmFyIGxlbmd0aCA9IGFJbWFnZVdyYXBwZXIuZGF0YS5sZW5ndGgsXHJcbiAgICAgICAgYUltYWdlRGF0YSA9IGFJbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICBiSW1hZ2VEYXRhID0gYkltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgIGNJbWFnZURhdGEgPSByZXN1bHRJbWFnZVdyYXBwZXIuZGF0YTtcclxuXHJcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcclxuICAgICAgICBjSW1hZ2VEYXRhW2xlbmd0aF0gPSBhSW1hZ2VEYXRhW2xlbmd0aF0gfHwgYkltYWdlRGF0YVtsZW5ndGhdO1xyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5jb3VudE5vblplcm8gPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIpIHtcclxuICAgIHZhciBsZW5ndGggPSBpbWFnZVdyYXBwZXIuZGF0YS5sZW5ndGgsIGRhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YSwgc3VtID0gMDtcclxuXHJcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcclxuICAgICAgICBzdW0gKz0gZGF0YVtsZW5ndGhdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1bTtcclxufTtcclxuXHJcbkNWVXRpbHMudG9wR2VuZXJpYyA9IGZ1bmN0aW9uKGxpc3QsIHRvcCwgc2NvcmVGdW5jKSB7XHJcbiAgICB2YXIgaSwgbWluSWR4ID0gMCwgbWluID0gMCwgcXVldWUgPSBbXSwgc2NvcmUsIGhpdCwgcG9zO1xyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgdG9wOyBpKyspIHtcclxuICAgICAgICBxdWV1ZVtpXSA9IHtcclxuICAgICAgICAgICAgc2NvcmU6IDAsXHJcbiAgICAgICAgICAgIGl0ZW06IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHNjb3JlID0gc2NvcmVGdW5jLmFwcGx5KHRoaXMsIFtsaXN0W2ldXSk7XHJcbiAgICAgICAgaWYgKHNjb3JlID4gbWluKSB7XHJcbiAgICAgICAgICAgIGhpdCA9IHF1ZXVlW21pbklkeF07XHJcbiAgICAgICAgICAgIGhpdC5zY29yZSA9IHNjb3JlO1xyXG4gICAgICAgICAgICBoaXQuaXRlbSA9IGxpc3RbaV07XHJcbiAgICAgICAgICAgIG1pbiA9IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgICAgICAgICAgIGZvciAoIHBvcyA9IDA7IHBvcyA8IHRvcDsgcG9zKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChxdWV1ZVtwb3NdLnNjb3JlIDwgbWluKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluID0gcXVldWVbcG9zXS5zY29yZTtcclxuICAgICAgICAgICAgICAgICAgICBtaW5JZHggPSBwb3M7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHF1ZXVlO1xyXG59O1xyXG5cclxuQ1ZVdGlscy5ncmF5QXJyYXlGcm9tSW1hZ2UgPSBmdW5jdGlvbihodG1sSW1hZ2UsIG9mZnNldFgsIGN0eCwgYXJyYXkpIHtcclxuICAgIGN0eC5kcmF3SW1hZ2UoaHRtbEltYWdlLCBvZmZzZXRYLCAwLCBodG1sSW1hZ2Uud2lkdGgsIGh0bWxJbWFnZS5oZWlnaHQpO1xyXG4gICAgdmFyIGN0eERhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKG9mZnNldFgsIDAsIGh0bWxJbWFnZS53aWR0aCwgaHRtbEltYWdlLmhlaWdodCkuZGF0YTtcclxuICAgIENWVXRpbHMuY29tcHV0ZUdyYXkoY3R4RGF0YSwgYXJyYXkpO1xyXG59O1xyXG5cclxuQ1ZVdGlscy5ncmF5QXJyYXlGcm9tQ29udGV4dCA9IGZ1bmN0aW9uKGN0eCwgc2l6ZSwgb2Zmc2V0LCBhcnJheSkge1xyXG4gICAgdmFyIGN0eERhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKG9mZnNldC54LCBvZmZzZXQueSwgc2l6ZS54LCBzaXplLnkpLmRhdGE7XHJcbiAgICBDVlV0aWxzLmNvbXB1dGVHcmF5KGN0eERhdGEsIGFycmF5KTtcclxufTtcclxuXHJcbkNWVXRpbHMuZ3JheUFuZEhhbGZTYW1wbGVGcm9tQ2FudmFzRGF0YSA9IGZ1bmN0aW9uKGNhbnZhc0RhdGEsIHNpemUsIG91dEFycmF5KSB7XHJcbiAgICB2YXIgdG9wUm93SWR4ID0gMDtcclxuICAgIHZhciBib3R0b21Sb3dJZHggPSBzaXplLng7XHJcbiAgICB2YXIgZW5kSWR4ID0gTWF0aC5mbG9vcihjYW52YXNEYXRhLmxlbmd0aCAvIDQpO1xyXG4gICAgdmFyIG91dFdpZHRoID0gc2l6ZS54IC8gMjtcclxuICAgIHZhciBvdXRJbWdJZHggPSAwO1xyXG4gICAgdmFyIGluV2lkdGggPSBzaXplLng7XHJcbiAgICB2YXIgaTtcclxuXHJcbiAgICB3aGlsZSAoYm90dG9tUm93SWR4IDwgZW5kSWR4KSB7XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBvdXRXaWR0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG91dEFycmF5W291dEltZ0lkeF0gPSBNYXRoLmZsb29yKChcclxuICAgICAgICAgICAgICAgICgwLjI5OSAqIGNhbnZhc0RhdGFbdG9wUm93SWR4ICogNCArIDBdICtcclxuICAgICAgICAgICAgICAgICAwLjU4NyAqIGNhbnZhc0RhdGFbdG9wUm93SWR4ICogNCArIDFdICtcclxuICAgICAgICAgICAgICAgICAwLjExNCAqIGNhbnZhc0RhdGFbdG9wUm93SWR4ICogNCArIDJdKSArXHJcbiAgICAgICAgICAgICAgICAoMC4yOTkgKiBjYW52YXNEYXRhWyh0b3BSb3dJZHggKyAxKSAqIDQgKyAwXSArXHJcbiAgICAgICAgICAgICAgICAgMC41ODcgKiBjYW52YXNEYXRhWyh0b3BSb3dJZHggKyAxKSAqIDQgKyAxXSArXHJcbiAgICAgICAgICAgICAgICAgMC4xMTQgKiBjYW52YXNEYXRhWyh0b3BSb3dJZHggKyAxKSAqIDQgKyAyXSkgK1xyXG4gICAgICAgICAgICAgICAgKDAuMjk5ICogY2FudmFzRGF0YVsoYm90dG9tUm93SWR4KSAqIDQgKyAwXSArXHJcbiAgICAgICAgICAgICAgICAgMC41ODcgKiBjYW52YXNEYXRhWyhib3R0b21Sb3dJZHgpICogNCArIDFdICtcclxuICAgICAgICAgICAgICAgICAwLjExNCAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCkgKiA0ICsgMl0pICtcclxuICAgICAgICAgICAgICAgICgwLjI5OSAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCArIDEpICogNCArIDBdICtcclxuICAgICAgICAgICAgICAgICAwLjU4NyAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCArIDEpICogNCArIDFdICtcclxuICAgICAgICAgICAgICAgICAwLjExNCAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCArIDEpICogNCArIDJdKSkgLyA0KTtcclxuICAgICAgICAgICAgb3V0SW1nSWR4Kys7XHJcbiAgICAgICAgICAgIHRvcFJvd0lkeCA9IHRvcFJvd0lkeCArIDI7XHJcbiAgICAgICAgICAgIGJvdHRvbVJvd0lkeCA9IGJvdHRvbVJvd0lkeCArIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRvcFJvd0lkeCA9IHRvcFJvd0lkeCArIGluV2lkdGg7XHJcbiAgICAgICAgYm90dG9tUm93SWR4ID0gYm90dG9tUm93SWR4ICsgaW5XaWR0aDtcclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMuY29tcHV0ZUdyYXkgPSBmdW5jdGlvbihpbWFnZURhdGEsIG91dEFycmF5LCBjb25maWcpIHtcclxuICAgIHZhciBsID0gKGltYWdlRGF0YS5sZW5ndGggLyA0KSB8IDAsXHJcbiAgICAgICAgaSxcclxuICAgICAgICBzaW5nbGVDaGFubmVsID0gY29uZmlnICYmIGNvbmZpZy5zaW5nbGVDaGFubmVsID09PSB0cnVlO1xyXG5cclxuICAgIGlmIChzaW5nbGVDaGFubmVsKSB7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBvdXRBcnJheVtpXSA9IGltYWdlRGF0YVtpICogNCArIDBdO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBvdXRBcnJheVtpXSA9IE1hdGguZmxvb3IoXHJcbiAgICAgICAgICAgICAgICAwLjI5OSAqIGltYWdlRGF0YVtpICogNCArIDBdICsgMC41ODcgKiBpbWFnZURhdGFbaSAqIDQgKyAxXSArIDAuMTE0ICogaW1hZ2VEYXRhW2kgKiA0ICsgMl0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMubG9hZEltYWdlQXJyYXkgPSBmdW5jdGlvbihzcmMsIGNhbGxiYWNrLCBjYW52YXMpIHtcclxuICAgIGlmICghY2FudmFzKSB7XHJcbiAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICBpbWcuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjYW52YXMud2lkdGggPSB0aGlzLndpZHRoO1xyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuICAgICAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLCAwLCAwKTtcclxuICAgICAgICB2YXIgYXJyYXkgPSBuZXcgVWludDhBcnJheSh0aGlzLndpZHRoICogdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcywgMCwgMCk7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KS5kYXRhO1xyXG4gICAgICAgIENWVXRpbHMuY29tcHV0ZUdyYXkoZGF0YSwgYXJyYXkpO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2soYXJyYXksIHtcclxuICAgICAgICAgICAgeDogdGhpcy53aWR0aCxcclxuICAgICAgICAgICAgeTogdGhpcy5oZWlnaHRcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH07XHJcbiAgICBpbWcuc3JjID0gc3JjO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSBpbkltZyB7SW1hZ2VXcmFwcGVyfSBpbnB1dCBpbWFnZSB0byBiZSBzYW1wbGVkXHJcbiAqIEBwYXJhbSBvdXRJbWcge0ltYWdlV3JhcHBlcn0gdG8gYmUgc3RvcmVkIGluXHJcbiAqL1xyXG5DVlV0aWxzLmhhbGZTYW1wbGUgPSBmdW5jdGlvbihpbkltZ1dyYXBwZXIsIG91dEltZ1dyYXBwZXIpIHtcclxuICAgIHZhciBpbkltZyA9IGluSW1nV3JhcHBlci5kYXRhO1xyXG4gICAgdmFyIGluV2lkdGggPSBpbkltZ1dyYXBwZXIuc2l6ZS54O1xyXG4gICAgdmFyIG91dEltZyA9IG91dEltZ1dyYXBwZXIuZGF0YTtcclxuICAgIHZhciB0b3BSb3dJZHggPSAwO1xyXG4gICAgdmFyIGJvdHRvbVJvd0lkeCA9IGluV2lkdGg7XHJcbiAgICB2YXIgZW5kSWR4ID0gaW5JbWcubGVuZ3RoO1xyXG4gICAgdmFyIG91dFdpZHRoID0gaW5XaWR0aCAvIDI7XHJcbiAgICB2YXIgb3V0SW1nSWR4ID0gMDtcclxuICAgIHdoaWxlIChib3R0b21Sb3dJZHggPCBlbmRJZHgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG91dFdpZHRoOyBpKyspIHtcclxuICAgICAgICAgICAgb3V0SW1nW291dEltZ0lkeF0gPSBNYXRoLmZsb29yKFxyXG4gICAgICAgICAgICAgICAgKGluSW1nW3RvcFJvd0lkeF0gKyBpbkltZ1t0b3BSb3dJZHggKyAxXSArIGluSW1nW2JvdHRvbVJvd0lkeF0gKyBpbkltZ1tib3R0b21Sb3dJZHggKyAxXSkgLyA0KTtcclxuICAgICAgICAgICAgb3V0SW1nSWR4Kys7XHJcbiAgICAgICAgICAgIHRvcFJvd0lkeCA9IHRvcFJvd0lkeCArIDI7XHJcbiAgICAgICAgICAgIGJvdHRvbVJvd0lkeCA9IGJvdHRvbVJvd0lkeCArIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRvcFJvd0lkeCA9IHRvcFJvd0lkeCArIGluV2lkdGg7XHJcbiAgICAgICAgYm90dG9tUm93SWR4ID0gYm90dG9tUm93SWR4ICsgaW5XaWR0aDtcclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMuaHN2MnJnYiA9IGZ1bmN0aW9uKGhzdiwgcmdiKSB7XHJcbiAgICB2YXIgaCA9IGhzdlswXSxcclxuICAgICAgICBzID0gaHN2WzFdLFxyXG4gICAgICAgIHYgPSBoc3ZbMl0sXHJcbiAgICAgICAgYyA9IHYgKiBzLFxyXG4gICAgICAgIHggPSBjICogKDEgLSBNYXRoLmFicygoaCAvIDYwKSAlIDIgLSAxKSksXHJcbiAgICAgICAgbSA9IHYgLSBjLFxyXG4gICAgICAgIHIgPSAwLFxyXG4gICAgICAgIGcgPSAwLFxyXG4gICAgICAgIGIgPSAwO1xyXG5cclxuICAgIHJnYiA9IHJnYiB8fCBbMCwgMCwgMF07XHJcblxyXG4gICAgaWYgKGggPCA2MCkge1xyXG4gICAgICAgIHIgPSBjO1xyXG4gICAgICAgIGcgPSB4O1xyXG4gICAgfSBlbHNlIGlmIChoIDwgMTIwKSB7XHJcbiAgICAgICAgciA9IHg7XHJcbiAgICAgICAgZyA9IGM7XHJcbiAgICB9IGVsc2UgaWYgKGggPCAxODApIHtcclxuICAgICAgICBnID0gYztcclxuICAgICAgICBiID0geDtcclxuICAgIH0gZWxzZSBpZiAoaCA8IDI0MCkge1xyXG4gICAgICAgIGcgPSB4O1xyXG4gICAgICAgIGIgPSBjO1xyXG4gICAgfSBlbHNlIGlmIChoIDwgMzAwKSB7XHJcbiAgICAgICAgciA9IHg7XHJcbiAgICAgICAgYiA9IGM7XHJcbiAgICB9IGVsc2UgaWYgKGggPCAzNjApIHtcclxuICAgICAgICByID0gYztcclxuICAgICAgICBiID0geDtcclxuICAgIH1cclxuICAgIHJnYlswXSA9ICgociArIG0pICogMjU1KSB8IDA7XHJcbiAgICByZ2JbMV0gPSAoKGcgKyBtKSAqIDI1NSkgfCAwO1xyXG4gICAgcmdiWzJdID0gKChiICsgbSkgKiAyNTUpIHwgMDtcclxuICAgIHJldHVybiByZ2I7XHJcbn07XHJcblxyXG5DVlV0aWxzLl9jb21wdXRlRGl2aXNvcnMgPSBmdW5jdGlvbihuKSB7XHJcbiAgICB2YXIgbGFyZ2VEaXZpc29ycyA9IFtdLFxyXG4gICAgICAgIGRpdmlzb3JzID0gW10sXHJcbiAgICAgICAgaTtcclxuXHJcbiAgICBmb3IgKGkgPSAxOyBpIDwgTWF0aC5zcXJ0KG4pICsgMTsgaSsrKSB7XHJcbiAgICAgICAgaWYgKG4gJSBpID09PSAwKSB7XHJcbiAgICAgICAgICAgIGRpdmlzb3JzLnB1c2goaSk7XHJcbiAgICAgICAgICAgIGlmIChpICE9PSBuIC8gaSkge1xyXG4gICAgICAgICAgICAgICAgbGFyZ2VEaXZpc29ycy51bnNoaWZ0KE1hdGguZmxvb3IobiAvIGkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBkaXZpc29ycy5jb25jYXQobGFyZ2VEaXZpc29ycyk7XHJcbn07XHJcblxyXG5DVlV0aWxzLl9jb21wdXRlSW50ZXJzZWN0aW9uID0gZnVuY3Rpb24oYXJyMSwgYXJyMikge1xyXG4gICAgdmFyIGkgPSAwLFxyXG4gICAgICAgIGogPSAwLFxyXG4gICAgICAgIHJlc3VsdCA9IFtdO1xyXG5cclxuICAgIHdoaWxlIChpIDwgYXJyMS5sZW5ndGggJiYgaiA8IGFycjIubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKGFycjFbaV0gPT09IGFycjJbal0pIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goYXJyMVtpXSk7XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgaisrO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJyMVtpXSA+IGFycjJbal0pIHtcclxuICAgICAgICAgICAgaisrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuQ1ZVdGlscy5jYWxjdWxhdGVQYXRjaFNpemUgPSBmdW5jdGlvbihwYXRjaFNpemUsIGltZ1NpemUpIHtcclxuICAgIHZhciBkaXZpc29yc1ggPSB0aGlzLl9jb21wdXRlRGl2aXNvcnMoaW1nU2l6ZS54KSxcclxuICAgICAgICBkaXZpc29yc1kgPSB0aGlzLl9jb21wdXRlRGl2aXNvcnMoaW1nU2l6ZS55KSxcclxuICAgICAgICB3aWRlU2lkZSA9IE1hdGgubWF4KGltZ1NpemUueCwgaW1nU2l6ZS55KSxcclxuICAgICAgICBjb21tb24gPSB0aGlzLl9jb21wdXRlSW50ZXJzZWN0aW9uKGRpdmlzb3JzWCwgZGl2aXNvcnNZKSxcclxuICAgICAgICBuck9mUGF0Y2hlc0xpc3QgPSBbOCwgMTAsIDE1LCAyMCwgMzIsIDYwLCA4MF0sXHJcbiAgICAgICAgbnJPZlBhdGNoZXNNYXAgPSB7XHJcbiAgICAgICAgICAgIFwieC1zbWFsbFwiOiA1LFxyXG4gICAgICAgICAgICBcInNtYWxsXCI6IDQsXHJcbiAgICAgICAgICAgIFwibWVkaXVtXCI6IDMsXHJcbiAgICAgICAgICAgIFwibGFyZ2VcIjogMixcclxuICAgICAgICAgICAgXCJ4LWxhcmdlXCI6IDFcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5yT2ZQYXRjaGVzSWR4ID0gbnJPZlBhdGNoZXNNYXBbcGF0Y2hTaXplXSB8fCBuck9mUGF0Y2hlc01hcC5tZWRpdW0sXHJcbiAgICAgICAgbnJPZlBhdGNoZXMgPSBuck9mUGF0Y2hlc0xpc3RbbnJPZlBhdGNoZXNJZHhdLFxyXG4gICAgICAgIGRlc2lyZWRQYXRjaFNpemUgPSBNYXRoLmZsb29yKHdpZGVTaWRlIC8gbnJPZlBhdGNoZXMpLFxyXG4gICAgICAgIG9wdGltYWxQYXRjaFNpemU7XHJcblxyXG4gICAgZnVuY3Rpb24gZmluZFBhdGNoU2l6ZUZvckRpdmlzb3JzKGRpdmlzb3JzKSB7XHJcbiAgICAgICAgdmFyIGkgPSAwLFxyXG4gICAgICAgICAgICBmb3VuZCA9IGRpdmlzb3JzW01hdGguZmxvb3IoZGl2aXNvcnMubGVuZ3RoIC8gMildO1xyXG5cclxuICAgICAgICB3aGlsZSAoaSA8IChkaXZpc29ycy5sZW5ndGggLSAxKSAmJiBkaXZpc29yc1tpXSA8IGRlc2lyZWRQYXRjaFNpemUpIHtcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaSA+IDApIHtcclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRpdmlzb3JzW2ldIC0gZGVzaXJlZFBhdGNoU2l6ZSkgPiBNYXRoLmFicyhkaXZpc29yc1tpIC0gMV0gLSBkZXNpcmVkUGF0Y2hTaXplKSkge1xyXG4gICAgICAgICAgICAgICAgZm91bmQgPSBkaXZpc29yc1tpIC0gMV07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3VuZCA9IGRpdmlzb3JzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkZXNpcmVkUGF0Y2hTaXplIC8gZm91bmQgPCBuck9mUGF0Y2hlc0xpc3RbbnJPZlBhdGNoZXNJZHggKyAxXSAvIG5yT2ZQYXRjaGVzTGlzdFtuck9mUGF0Y2hlc0lkeF0gJiZcclxuICAgICAgICAgICAgZGVzaXJlZFBhdGNoU2l6ZSAvIGZvdW5kID4gbnJPZlBhdGNoZXNMaXN0W25yT2ZQYXRjaGVzSWR4IC0gMV0gLyBuck9mUGF0Y2hlc0xpc3RbbnJPZlBhdGNoZXNJZHhdICkge1xyXG4gICAgICAgICAgICByZXR1cm4ge3g6IGZvdW5kLCB5OiBmb3VuZH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIG9wdGltYWxQYXRjaFNpemUgPSBmaW5kUGF0Y2hTaXplRm9yRGl2aXNvcnMoY29tbW9uKTtcclxuICAgIGlmICghb3B0aW1hbFBhdGNoU2l6ZSkge1xyXG4gICAgICAgIG9wdGltYWxQYXRjaFNpemUgPSBmaW5kUGF0Y2hTaXplRm9yRGl2aXNvcnModGhpcy5fY29tcHV0ZURpdmlzb3JzKHdpZGVTaWRlKSk7XHJcbiAgICAgICAgaWYgKCFvcHRpbWFsUGF0Y2hTaXplKSB7XHJcbiAgICAgICAgICAgIG9wdGltYWxQYXRjaFNpemUgPSBmaW5kUGF0Y2hTaXplRm9yRGl2aXNvcnMoKHRoaXMuX2NvbXB1dGVEaXZpc29ycyhkZXNpcmVkUGF0Y2hTaXplICogbnJPZlBhdGNoZXMpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9wdGltYWxQYXRjaFNpemU7XHJcbn07XHJcblxyXG5DVlV0aWxzLl9wYXJzZUNTU0RpbWVuc2lvblZhbHVlcyA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICB2YXIgZGltZW5zaW9uID0ge1xyXG4gICAgICAgIHZhbHVlOiBwYXJzZUZsb2F0KHZhbHVlKSxcclxuICAgICAgICB1bml0OiB2YWx1ZS5pbmRleE9mKFwiJVwiKSA9PT0gdmFsdWUubGVuZ3RoIC0gMSA/IFwiJVwiIDogXCIlXCJcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGRpbWVuc2lvbjtcclxufTtcclxuXHJcbkNWVXRpbHMuX2RpbWVuc2lvbnNDb252ZXJ0ZXJzID0ge1xyXG4gICAgdG9wOiBmdW5jdGlvbihkaW1lbnNpb24sIGNvbnRleHQpIHtcclxuICAgICAgICBpZiAoZGltZW5zaW9uLnVuaXQgPT09IFwiJVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKGNvbnRleHQuaGVpZ2h0ICogKGRpbWVuc2lvbi52YWx1ZSAvIDEwMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByaWdodDogZnVuY3Rpb24oZGltZW5zaW9uLCBjb250ZXh0KSB7XHJcbiAgICAgICAgaWYgKGRpbWVuc2lvbi51bml0ID09PSBcIiVcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihjb250ZXh0LndpZHRoIC0gKGNvbnRleHQud2lkdGggKiAoZGltZW5zaW9uLnZhbHVlIC8gMTAwKSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBib3R0b206IGZ1bmN0aW9uKGRpbWVuc2lvbiwgY29udGV4dCkge1xyXG4gICAgICAgIGlmIChkaW1lbnNpb24udW5pdCA9PT0gXCIlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoY29udGV4dC5oZWlnaHQgLSAoY29udGV4dC5oZWlnaHQgKiAoZGltZW5zaW9uLnZhbHVlIC8gMTAwKSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBsZWZ0OiBmdW5jdGlvbihkaW1lbnNpb24sIGNvbnRleHQpIHtcclxuICAgICAgICBpZiAoZGltZW5zaW9uLnVuaXQgPT09IFwiJVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKGNvbnRleHQud2lkdGggKiAoZGltZW5zaW9uLnZhbHVlIC8gMTAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5jb21wdXRlSW1hZ2VBcmVhID0gZnVuY3Rpb24oaW5wdXRXaWR0aCwgaW5wdXRIZWlnaHQsIGFyZWEpIHtcclxuICAgIHZhciBjb250ZXh0ID0ge3dpZHRoOiBpbnB1dFdpZHRoLCBoZWlnaHQ6IGlucHV0SGVpZ2h0fTtcclxuXHJcbiAgICB2YXIgcGFyc2VkQXJlYSA9IE9iamVjdC5rZXlzKGFyZWEpLnJlZHVjZShmdW5jdGlvbihyZXN1bHQsIGtleSkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IGFyZWFba2V5XSxcclxuICAgICAgICAgICAgcGFyc2VkID0gQ1ZVdGlscy5fcGFyc2VDU1NEaW1lbnNpb25WYWx1ZXModmFsdWUpLFxyXG4gICAgICAgICAgICBjYWxjdWxhdGVkID0gQ1ZVdGlscy5fZGltZW5zaW9uc0NvbnZlcnRlcnNba2V5XShwYXJzZWQsIGNvbnRleHQpO1xyXG5cclxuICAgICAgICByZXN1bHRba2V5XSA9IGNhbGN1bGF0ZWQ7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0sIHt9KTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN4OiBwYXJzZWRBcmVhLmxlZnQsXHJcbiAgICAgICAgc3k6IHBhcnNlZEFyZWEudG9wLFxyXG4gICAgICAgIHN3OiBwYXJzZWRBcmVhLnJpZ2h0IC0gcGFyc2VkQXJlYS5sZWZ0LFxyXG4gICAgICAgIHNoOiBwYXJzZWRBcmVhLmJvdHRvbSAtIHBhcnNlZEFyZWEudG9wXHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ1ZVdGlscztcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvY29tbW9uL2N2X3V0aWxzLmpzXG4gKiovIiwiaW1wb3J0IHt2ZWMyfSBmcm9tICdnbC1tYXRyaXgnO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgY2x1c3RlciBmb3IgZ3JvdXBpbmcgc2ltaWxhciBvcmllbnRhdGlvbnMgb2YgZGF0YXBvaW50c1xyXG4gICAgICovXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNyZWF0ZTogZnVuY3Rpb24ocG9pbnQsIHRocmVzaG9sZCkge1xyXG4gICAgICAgIHZhciBwb2ludHMgPSBbXSxcclxuICAgICAgICAgICAgY2VudGVyID0ge1xyXG4gICAgICAgICAgICAgICAgcmFkOiAwLFxyXG4gICAgICAgICAgICAgICAgdmVjOiB2ZWMyLmNsb25lKFswLCAwXSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcG9pbnRNYXAgPSB7fTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgYWRkKHBvaW50KTtcclxuICAgICAgICAgICAgdXBkYXRlQ2VudGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGQocG9pbnRUb0FkZCkge1xyXG4gICAgICAgICAgICBwb2ludE1hcFtwb2ludFRvQWRkLmlkXSA9IHBvaW50VG9BZGQ7XHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKHBvaW50VG9BZGQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlQ2VudGVyKCkge1xyXG4gICAgICAgICAgICB2YXIgaSwgc3VtID0gMDtcclxuICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHN1bSArPSBwb2ludHNbaV0ucmFkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNlbnRlci5yYWQgPSBzdW0gLyBwb2ludHMubGVuZ3RoO1xyXG4gICAgICAgICAgICBjZW50ZXIudmVjID0gdmVjMi5jbG9uZShbTWF0aC5jb3MoY2VudGVyLnJhZCksIE1hdGguc2luKGNlbnRlci5yYWQpXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFkZDogZnVuY3Rpb24ocG9pbnRUb0FkZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFwb2ludE1hcFtwb2ludFRvQWRkLmlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZChwb2ludFRvQWRkKTtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDZW50ZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZml0czogZnVuY3Rpb24ob3RoZXJQb2ludCkge1xyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgY29zaW5lIHNpbWlsYXJpdHkgdG8gY2VudGVyLWFuZ2xlXHJcbiAgICAgICAgICAgICAgICB2YXIgc2ltaWxhcml0eSA9IE1hdGguYWJzKHZlYzIuZG90KG90aGVyUG9pbnQucG9pbnQudmVjLCBjZW50ZXIudmVjKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2ltaWxhcml0eSA+IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRQb2ludHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0Q2VudGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjZW50ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGNyZWF0ZVBvaW50OiBmdW5jdGlvbihuZXdQb2ludCwgaWQsIHByb3BlcnR5KSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmFkOiBuZXdQb2ludFtwcm9wZXJ0eV0sXHJcbiAgICAgICAgICAgIHBvaW50OiBuZXdQb2ludCxcclxuICAgICAgICAgICAgaWQ6IGlkXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvY29tbW9uL2NsdXN0ZXIuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnbC1tYXRyaXhcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImdsLW1hdHJpeFwiXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oYXJyLCB2YWwpIHtcclxuICAgICAgICB2YXIgbCA9IGFyci5sZW5ndGg7XHJcbiAgICAgICAgd2hpbGUgKGwtLSkge1xyXG4gICAgICAgICAgICBhcnJbbF0gPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNodWZmbGVzIHRoZSBjb250ZW50IG9mIGFuIGFycmF5XHJcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gdGhlIGFycmF5IGl0c2VsZiBzaHVmZmxlZFxyXG4gICAgICovXHJcbiAgICBzaHVmZmxlOiBmdW5jdGlvbihhcnIpIHtcclxuICAgICAgICB2YXIgaSA9IGFyci5sZW5ndGggLSAxLCBqLCB4O1xyXG4gICAgICAgIGZvciAoaTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpO1xyXG4gICAgICAgICAgICB4ID0gYXJyW2ldO1xyXG4gICAgICAgICAgICBhcnJbaV0gPSBhcnJbal07XHJcbiAgICAgICAgICAgIGFycltqXSA9IHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9LFxyXG5cclxuICAgIHRvUG9pbnRMaXN0OiBmdW5jdGlvbihhcnIpIHtcclxuICAgICAgICB2YXIgaSwgaiwgcm93ID0gW10sIHJvd3MgPSBbXTtcclxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICByb3cgPSBbXTtcclxuICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBhcnJbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHJvd1tqXSA9IGFycltpXVtqXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByb3dzW2ldID0gXCJbXCIgKyByb3cuam9pbihcIixcIikgKyBcIl1cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiW1wiICsgcm93cy5qb2luKFwiLFxcclxcblwiKSArIFwiXVwiO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgdGhlIGVsZW1lbnRzIHdoaWNoJ3Mgc2NvcmUgaXMgYmlnZ2VyIHRoYW4gdGhlIHRocmVzaG9sZFxyXG4gICAgICogQHJldHVybiB7QXJyYXl9IHRoZSByZWR1Y2VkIGFycmF5XHJcbiAgICAgKi9cclxuICAgIHRocmVzaG9sZDogZnVuY3Rpb24oYXJyLCB0aHJlc2hvbGQsIHNjb3JlRnVuYykge1xyXG4gICAgICAgIHZhciBpLCBxdWV1ZSA9IFtdO1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChzY29yZUZ1bmMuYXBwbHkoYXJyLCBbYXJyW2ldXSkgPj0gdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKGFycltpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHF1ZXVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBtYXhJbmRleDogZnVuY3Rpb24oYXJyKSB7XHJcbiAgICAgICAgdmFyIGksIG1heCA9IDA7XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGFycltpXSA+IGFyclttYXhdKSB7XHJcbiAgICAgICAgICAgICAgICBtYXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXg7XHJcbiAgICB9LFxyXG5cclxuICAgIG1heDogZnVuY3Rpb24oYXJyKSB7XHJcbiAgICAgICAgdmFyIGksIG1heCA9IDA7XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGFycltpXSA+IG1heCkge1xyXG4gICAgICAgICAgICAgICAgbWF4ID0gYXJyW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXg7XHJcbiAgICB9LFxyXG5cclxuICAgIHN1bTogZnVuY3Rpb24oYXJyKSB7XHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IGFyci5sZW5ndGgsXHJcbiAgICAgICAgICAgIHN1bSA9IDA7XHJcblxyXG4gICAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgICAgICBzdW0gKz0gYXJyW2xlbmd0aF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdW07XHJcbiAgICB9XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvbW1vbi9hcnJheV9oZWxwZXIuanNcbiAqKi8iLCJpbXBvcnQgSW1hZ2VXcmFwcGVyIGZyb20gJy4uL2NvbW1vbi9pbWFnZV93cmFwcGVyJztcclxuaW1wb3J0IENWVXRpbHMgZnJvbSAnLi4vY29tbW9uL2N2X3V0aWxzJztcclxuaW1wb3J0IEFycmF5SGVscGVyIGZyb20gJy4uL2NvbW1vbi9hcnJheV9oZWxwZXInO1xyXG5pbXBvcnQgSW1hZ2VEZWJ1ZyBmcm9tICcuLi9jb21tb24vaW1hZ2VfZGVidWcnO1xyXG5pbXBvcnQgUmFzdGVyaXplciBmcm9tICcuL3Jhc3Rlcml6ZXInO1xyXG5pbXBvcnQgVHJhY2VyIGZyb20gJy4vdHJhY2VyJztcclxuaW1wb3J0IHNrZWxldG9uaXplciBmcm9tICcuL3NrZWxldG9uaXplcic7XHJcbmltcG9ydCB7dmVjMiwgbWF0Mn0gZnJvbSAnZ2wtbWF0cml4JztcclxuXHJcbnZhciBfY29uZmlnLFxyXG4gICAgX2N1cnJlbnRJbWFnZVdyYXBwZXIsXHJcbiAgICBfc2tlbEltYWdlV3JhcHBlcixcclxuICAgIF9zdWJJbWFnZVdyYXBwZXIsXHJcbiAgICBfbGFiZWxJbWFnZVdyYXBwZXIsXHJcbiAgICBfcGF0Y2hHcmlkLFxyXG4gICAgX3BhdGNoTGFiZWxHcmlkLFxyXG4gICAgX2ltYWdlVG9QYXRjaEdyaWQsXHJcbiAgICBfYmluYXJ5SW1hZ2VXcmFwcGVyLFxyXG4gICAgX3BhdGNoU2l6ZSxcclxuICAgIF9jYW52YXNDb250YWluZXIgPSB7XHJcbiAgICAgICAgY3R4OiB7XHJcbiAgICAgICAgICAgIGJpbmFyeTogbnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZG9tOiB7XHJcbiAgICAgICAgICAgIGJpbmFyeTogbnVsbFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBfbnVtUGF0Y2hlcyA9IHt4OiAwLCB5OiAwfSxcclxuICAgIF9pbnB1dEltYWdlV3JhcHBlcixcclxuICAgIF9za2VsZXRvbml6ZXI7XHJcblxyXG5mdW5jdGlvbiBpbml0QnVmZmVycygpIHtcclxuICAgIHZhciBza2VsZXRvbkltYWdlRGF0YTtcclxuXHJcbiAgICBpZiAoX2NvbmZpZy5oYWxmU2FtcGxlKSB7XHJcbiAgICAgICAgX2N1cnJlbnRJbWFnZVdyYXBwZXIgPSBuZXcgSW1hZ2VXcmFwcGVyKHtcclxuICAgICAgICAgICAgeDogX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUueCAvIDIgfCAwLFxyXG4gICAgICAgICAgICB5OiBfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS55IC8gMiB8IDBcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX2N1cnJlbnRJbWFnZVdyYXBwZXIgPSBfaW5wdXRJbWFnZVdyYXBwZXI7XHJcbiAgICB9XHJcblxyXG4gICAgX3BhdGNoU2l6ZSA9IENWVXRpbHMuY2FsY3VsYXRlUGF0Y2hTaXplKF9jb25maWcucGF0Y2hTaXplLCBfY3VycmVudEltYWdlV3JhcHBlci5zaXplKTtcclxuXHJcbiAgICBfbnVtUGF0Y2hlcy54ID0gX2N1cnJlbnRJbWFnZVdyYXBwZXIuc2l6ZS54IC8gX3BhdGNoU2l6ZS54IHwgMDtcclxuICAgIF9udW1QYXRjaGVzLnkgPSBfY3VycmVudEltYWdlV3JhcHBlci5zaXplLnkgLyBfcGF0Y2hTaXplLnkgfCAwO1xyXG5cclxuICAgIF9iaW5hcnlJbWFnZVdyYXBwZXIgPSBuZXcgSW1hZ2VXcmFwcGVyKF9jdXJyZW50SW1hZ2VXcmFwcGVyLnNpemUsIHVuZGVmaW5lZCwgVWludDhBcnJheSwgZmFsc2UpO1xyXG5cclxuICAgIF9sYWJlbEltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoX3BhdGNoU2l6ZSwgdW5kZWZpbmVkLCBBcnJheSwgdHJ1ZSk7XHJcblxyXG4gICAgc2tlbGV0b25JbWFnZURhdGEgPSBuZXcgQXJyYXlCdWZmZXIoNjQgKiAxMDI0KTtcclxuICAgIF9zdWJJbWFnZVdyYXBwZXIgPSBuZXcgSW1hZ2VXcmFwcGVyKF9wYXRjaFNpemUsXHJcbiAgICAgICAgbmV3IFVpbnQ4QXJyYXkoc2tlbGV0b25JbWFnZURhdGEsIDAsIF9wYXRjaFNpemUueCAqIF9wYXRjaFNpemUueSkpO1xyXG4gICAgX3NrZWxJbWFnZVdyYXBwZXIgPSBuZXcgSW1hZ2VXcmFwcGVyKF9wYXRjaFNpemUsXHJcbiAgICAgICAgbmV3IFVpbnQ4QXJyYXkoc2tlbGV0b25JbWFnZURhdGEsIF9wYXRjaFNpemUueCAqIF9wYXRjaFNpemUueSAqIDMsIF9wYXRjaFNpemUueCAqIF9wYXRjaFNpemUueSksXHJcbiAgICAgICAgdW5kZWZpbmVkLCB0cnVlKTtcclxuICAgIF9za2VsZXRvbml6ZXIgPSBza2VsZXRvbml6ZXIoKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSA/IHdpbmRvdyA6ICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpID8gc2VsZiA6IGdsb2JhbCwge1xyXG4gICAgICAgIHNpemU6IF9wYXRjaFNpemUueFxyXG4gICAgfSwgc2tlbGV0b25JbWFnZURhdGEpO1xyXG5cclxuICAgIF9pbWFnZVRvUGF0Y2hHcmlkID0gbmV3IEltYWdlV3JhcHBlcih7XHJcbiAgICAgICAgeDogKF9jdXJyZW50SW1hZ2VXcmFwcGVyLnNpemUueCAvIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS54KSB8IDAsXHJcbiAgICAgICAgeTogKF9jdXJyZW50SW1hZ2VXcmFwcGVyLnNpemUueSAvIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS55KSB8IDBcclxuICAgIH0sIHVuZGVmaW5lZCwgQXJyYXksIHRydWUpO1xyXG4gICAgX3BhdGNoR3JpZCA9IG5ldyBJbWFnZVdyYXBwZXIoX2ltYWdlVG9QYXRjaEdyaWQuc2l6ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xyXG4gICAgX3BhdGNoTGFiZWxHcmlkID0gbmV3IEltYWdlV3JhcHBlcihfaW1hZ2VUb1BhdGNoR3JpZC5zaXplLCB1bmRlZmluZWQsIEludDMyQXJyYXksIHRydWUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0Q2FudmFzKCkge1xyXG4gICAgaWYgKF9jb25maWcudXNlV29ya2VyIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5LmNsYXNzTmFtZSA9IFwiYmluYXJ5QnVmZmVyXCI7XHJcbiAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIF9jb25maWcuZGVidWcuc2hvd0NhbnZhcyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVidWdcIikuYXBwZW5kQ2hpbGQoX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5KTtcclxuICAgIH1cclxuICAgIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSA9IF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkud2lkdGggPSBfYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueDtcclxuICAgIF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeS5oZWlnaHQgPSBfYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBib3VuZGluZyBib3ggd2hpY2ggZW5jbG9zZXMgYWxsIHRoZSBnaXZlbiBwYXRjaGVzXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gVGhlIG1pbmltYWwgYm91bmRpbmcgYm94XHJcbiAqL1xyXG5mdW5jdGlvbiBib3hGcm9tUGF0Y2hlcyhwYXRjaGVzKSB7XHJcbiAgICB2YXIgb3ZlckF2ZyxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGosXHJcbiAgICAgICAgcGF0Y2gsXHJcbiAgICAgICAgdHJhbnNNYXQsXHJcbiAgICAgICAgbWlueCA9XHJcbiAgICAgICAgX2JpbmFyeUltYWdlV3JhcHBlci5zaXplLngsXHJcbiAgICAgICAgbWlueSA9IF9iaW5hcnlJbWFnZVdyYXBwZXIuc2l6ZS55LFxyXG4gICAgICAgIG1heHggPSAtX2JpbmFyeUltYWdlV3JhcHBlci5zaXplLngsXHJcbiAgICAgICAgbWF4eSA9IC1fYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueSxcclxuICAgICAgICBib3gsXHJcbiAgICAgICAgc2NhbGU7XHJcblxyXG4gICAgLy8gZHJhdyBhbGwgcGF0Y2hlcyB3aGljaCBhcmUgdG8gYmUgdGFrZW4gaW50byBjb25zaWRlcmF0aW9uXHJcbiAgICBvdmVyQXZnID0gMDtcclxuICAgIGZvciAoIGkgPSAwOyBpIDwgcGF0Y2hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHBhdGNoID0gcGF0Y2hlc1tpXTtcclxuICAgICAgICBvdmVyQXZnICs9IHBhdGNoLnJhZDtcclxuICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIF9jb25maWcuZGVidWcuc2hvd1BhdGNoZXMpIHtcclxuICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UmVjdChwYXRjaC5wb3MsIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LCB7Y29sb3I6IFwicmVkXCJ9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb3ZlckF2ZyAvPSBwYXRjaGVzLmxlbmd0aDtcclxuICAgIG92ZXJBdmcgPSAob3ZlckF2ZyAqIDE4MCAvIE1hdGguUEkgKyA5MCkgJSAxODAgLSA5MDtcclxuICAgIGlmIChvdmVyQXZnIDwgMCkge1xyXG4gICAgICAgIG92ZXJBdmcgKz0gMTgwO1xyXG4gICAgfVxyXG5cclxuICAgIG92ZXJBdmcgPSAoMTgwIC0gb3ZlckF2ZykgKiBNYXRoLlBJIC8gMTgwO1xyXG4gICAgdHJhbnNNYXQgPSBtYXQyLmNsb25lKFtNYXRoLmNvcyhvdmVyQXZnKSwgTWF0aC5zaW4ob3ZlckF2ZyksIC1NYXRoLnNpbihvdmVyQXZnKSwgTWF0aC5jb3Mob3ZlckF2ZyldKTtcclxuXHJcbiAgICAvLyBpdGVyYXRlIG92ZXIgcGF0Y2hlcyBhbmQgcm90YXRlIGJ5IGFuZ2xlXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IHBhdGNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwYXRjaCA9IHBhdGNoZXNbaV07XHJcbiAgICAgICAgZm9yICggaiA9IDA7IGogPCA0OyBqKyspIHtcclxuICAgICAgICAgICAgdmVjMi50cmFuc2Zvcm1NYXQyKHBhdGNoLmJveFtqXSwgcGF0Y2guYm94W2pdLCB0cmFuc01hdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIF9jb25maWcuZGVidWcuYm94RnJvbVBhdGNoZXMuc2hvd1RyYW5zZm9ybWVkKSB7XHJcbiAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgocGF0Y2guYm94LCB7eDogMCwgeTogMX0sIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSwge2NvbG9yOiAnIzk5ZmYwMCcsIGxpbmVXaWR0aDogMn0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBmaW5kIGJvdW5kaW5nIGJveFxyXG4gICAgZm9yICggaSA9IDA7IGkgPCBwYXRjaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcGF0Y2ggPSBwYXRjaGVzW2ldO1xyXG4gICAgICAgIGZvciAoIGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXRjaC5ib3hbal1bMF0gPCBtaW54KSB7XHJcbiAgICAgICAgICAgICAgICBtaW54ID0gcGF0Y2guYm94W2pdWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYXRjaC5ib3hbal1bMF0gPiBtYXh4KSB7XHJcbiAgICAgICAgICAgICAgICBtYXh4ID0gcGF0Y2guYm94W2pdWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYXRjaC5ib3hbal1bMV0gPCBtaW55KSB7XHJcbiAgICAgICAgICAgICAgICBtaW55ID0gcGF0Y2guYm94W2pdWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYXRjaC5ib3hbal1bMV0gPiBtYXh5KSB7XHJcbiAgICAgICAgICAgICAgICBtYXh5ID0gcGF0Y2guYm94W2pdWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJveCA9IFtbbWlueCwgbWlueV0sIFttYXh4LCBtaW55XSwgW21heHgsIG1heHldLCBbbWlueCwgbWF4eV1dO1xyXG5cclxuICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgX2NvbmZpZy5kZWJ1Zy5ib3hGcm9tUGF0Y2hlcy5zaG93VHJhbnNmb3JtZWRCb3gpIHtcclxuICAgICAgICBJbWFnZURlYnVnLmRyYXdQYXRoKGJveCwge3g6IDAsIHk6IDF9LCBfY2FudmFzQ29udGFpbmVyLmN0eC5iaW5hcnksIHtjb2xvcjogJyNmZjAwMDAnLCBsaW5lV2lkdGg6IDJ9KTtcclxuICAgIH1cclxuXHJcbiAgICBzY2FsZSA9IF9jb25maWcuaGFsZlNhbXBsZSA/IDIgOiAxO1xyXG4gICAgLy8gcmV2ZXJzZSByb3RhdGlvbjtcclxuICAgIHRyYW5zTWF0ID0gbWF0Mi5pbnZlcnQodHJhbnNNYXQsIHRyYW5zTWF0KTtcclxuICAgIGZvciAoIGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgdmVjMi50cmFuc2Zvcm1NYXQyKGJveFtqXSwgYm94W2pdLCB0cmFuc01hdCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiBfY29uZmlnLmRlYnVnLmJveEZyb21QYXRjaGVzLnNob3dCQikge1xyXG4gICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgoYm94LCB7eDogMCwgeTogMX0sIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSwge2NvbG9yOiAnI2ZmMDAwMCcsIGxpbmVXaWR0aDogMn0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgdmVjMi5zY2FsZShib3hbal0sIGJveFtqXSwgc2NhbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBib3g7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgYmluYXJ5IGltYWdlIG9mIHRoZSBjdXJyZW50IGltYWdlXHJcbiAqL1xyXG5mdW5jdGlvbiBiaW5hcml6ZUltYWdlKCkge1xyXG4gICAgQ1ZVdGlscy5vdHN1VGhyZXNob2xkKF9jdXJyZW50SW1hZ2VXcmFwcGVyLCBfYmluYXJ5SW1hZ2VXcmFwcGVyKTtcclxuICAgIF9iaW5hcnlJbWFnZVdyYXBwZXIuemVyb0JvcmRlcigpO1xyXG4gICAgaWYgKF9jb25maWcuc2hvd0NhbnZhcykge1xyXG4gICAgICAgIF9iaW5hcnlJbWFnZVdyYXBwZXIuc2hvdyhfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnksIDI1NSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJdGVyYXRlIG92ZXIgdGhlIGVudGlyZSBpbWFnZVxyXG4gKiBleHRyYWN0IHBhdGNoZXNcclxuICovXHJcbmZ1bmN0aW9uIGZpbmRQYXRjaGVzKCkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgaixcclxuICAgICAgICB4LFxyXG4gICAgICAgIHksXHJcbiAgICAgICAgbW9tZW50cyxcclxuICAgICAgICBwYXRjaGVzRm91bmQgPSBbXSxcclxuICAgICAgICByYXN0ZXJpemVyLFxyXG4gICAgICAgIHJhc3RlclJlc3VsdCxcclxuICAgICAgICBwYXRjaDtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBfbnVtUGF0Y2hlcy54OyBpKyspIHtcclxuICAgICAgICBmb3IgKGogPSAwOyBqIDwgX251bVBhdGNoZXMueTsgaisrKSB7XHJcbiAgICAgICAgICAgIHggPSBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueCAqIGk7XHJcbiAgICAgICAgICAgIHkgPSBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueSAqIGo7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXBlcmF0ZSBwYXJ0c1xyXG4gICAgICAgICAgICBza2VsZXRvbml6ZSh4LCB5KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJhc3Rlcml6ZSwgZmluZCBpbmRpdmlkdWFsIGJhcnNcclxuICAgICAgICAgICAgX3NrZWxJbWFnZVdyYXBwZXIuemVyb0JvcmRlcigpO1xyXG4gICAgICAgICAgICBBcnJheUhlbHBlci5pbml0KF9sYWJlbEltYWdlV3JhcHBlci5kYXRhLCAwKTtcclxuICAgICAgICAgICAgcmFzdGVyaXplciA9IFJhc3Rlcml6ZXIuY3JlYXRlKF9za2VsSW1hZ2VXcmFwcGVyLCBfbGFiZWxJbWFnZVdyYXBwZXIpO1xyXG4gICAgICAgICAgICByYXN0ZXJSZXN1bHQgPSByYXN0ZXJpemVyLnJhc3Rlcml6ZSgwKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgX2NvbmZpZy5kZWJ1Zy5zaG93TGFiZWxzKSB7XHJcbiAgICAgICAgICAgICAgICBfbGFiZWxJbWFnZVdyYXBwZXIub3ZlcmxheShfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnksIE1hdGguZmxvb3IoMzYwIC8gcmFzdGVyUmVzdWx0LmNvdW50KSxcclxuICAgICAgICAgICAgICAgICAgICB7eDogeCwgeTogeX0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgbW9tZW50cyBmcm9tIHRoZSBza2VsZXRvbml6ZWQgcGF0Y2hcclxuICAgICAgICAgICAgbW9tZW50cyA9IF9sYWJlbEltYWdlV3JhcHBlci5tb21lbnRzKHJhc3RlclJlc3VsdC5jb3VudCk7XHJcblxyXG4gICAgICAgICAgICAvLyBleHRyYWN0IGVsaWdpYmxlIHBhdGNoZXNcclxuICAgICAgICAgICAgcGF0Y2hlc0ZvdW5kID0gcGF0Y2hlc0ZvdW5kLmNvbmNhdChkZXNjcmliZVBhdGNoKG1vbWVudHMsIFtpLCBqXSwgeCwgeSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIF9jb25maWcuZGVidWcuc2hvd0ZvdW5kUGF0Y2hlcykge1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgcGF0Y2hlc0ZvdW5kLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHBhdGNoID0gcGF0Y2hlc0ZvdW5kW2ldO1xyXG4gICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdSZWN0KHBhdGNoLnBvcywgX3N1YkltYWdlV3JhcHBlci5zaXplLCBfY2FudmFzQ29udGFpbmVyLmN0eC5iaW5hcnksXHJcbiAgICAgICAgICAgICAgICB7Y29sb3I6IFwiIzk5ZmYwMFwiLCBsaW5lV2lkdGg6IDJ9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBhdGNoZXNGb3VuZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmRzIHRob3NlIGNvbm5lY3RlZCBhcmVhcyB3aGljaCBjb250YWluIGF0IGxlYXN0IDYgcGF0Y2hlc1xyXG4gKiBhbmQgcmV0dXJucyB0aGVtIG9yZGVyZWQgREVTQyBieSB0aGUgbnVtYmVyIG9mIGNvbnRhaW5lZCBwYXRjaGVzXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXhMYWJlbFxyXG4gKi9cclxuZnVuY3Rpb24gZmluZEJpZ2dlc3RDb25uZWN0ZWRBcmVhcyhtYXhMYWJlbCl7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBzdW0sXHJcbiAgICAgICAgbGFiZWxIaXN0ID0gW10sXHJcbiAgICAgICAgdG9wTGFiZWxzID0gW107XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCBtYXhMYWJlbDsgaSsrKSB7XHJcbiAgICAgICAgbGFiZWxIaXN0LnB1c2goMCk7XHJcbiAgICB9XHJcbiAgICBzdW0gPSBfcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGg7XHJcbiAgICB3aGlsZSAoc3VtLS0pIHtcclxuICAgICAgICBpZiAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbc3VtXSA+IDApIHtcclxuICAgICAgICAgICAgbGFiZWxIaXN0W19wYXRjaExhYmVsR3JpZC5kYXRhW3N1bV0gLSAxXSsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsYWJlbEhpc3QgPSBsYWJlbEhpc3QubWFwKGZ1bmN0aW9uKHZhbCwgaWR4KSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsOiB2YWwsXHJcbiAgICAgICAgICAgIGxhYmVsOiBpZHggKyAxXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxhYmVsSGlzdC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gYi52YWwgLSBhLnZhbDtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGV4dHJhY3QgdG9wIGFyZWFzIHdpdGggYXQgbGVhc3QgNiBwYXRjaGVzIHByZXNlbnRcclxuICAgIHRvcExhYmVscyA9IGxhYmVsSGlzdC5maWx0ZXIoZnVuY3Rpb24oZWwpIHtcclxuICAgICAgICByZXR1cm4gZWwudmFsID49IDU7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdG9wTGFiZWxzO1xyXG59XHJcblxyXG4vKipcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIGZpbmRCb3hlcyh0b3BMYWJlbHMsIG1heExhYmVsKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBqLFxyXG4gICAgICAgIHN1bSxcclxuICAgICAgICBwYXRjaGVzID0gW10sXHJcbiAgICAgICAgcGF0Y2gsXHJcbiAgICAgICAgYm94LFxyXG4gICAgICAgIGJveGVzID0gW10sXHJcbiAgICAgICAgaHN2ID0gWzAsIDEsIDFdLFxyXG4gICAgICAgIHJnYiA9IFswLCAwLCAwXTtcclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IHRvcExhYmVscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHN1bSA9IF9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aDtcclxuICAgICAgICBwYXRjaGVzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgd2hpbGUgKHN1bS0tKSB7XHJcbiAgICAgICAgICAgIGlmIChfcGF0Y2hMYWJlbEdyaWQuZGF0YVtzdW1dID09PSB0b3BMYWJlbHNbaV0ubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIHBhdGNoID0gX2ltYWdlVG9QYXRjaEdyaWQuZGF0YVtzdW1dO1xyXG4gICAgICAgICAgICAgICAgcGF0Y2hlcy5wdXNoKHBhdGNoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBib3ggPSBib3hGcm9tUGF0Y2hlcyhwYXRjaGVzKTtcclxuICAgICAgICBpZiAoYm94KSB7XHJcbiAgICAgICAgICAgIGJveGVzLnB1c2goYm94KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRyYXcgcGF0Y2gtbGFiZWxzIGlmIHJlcXVlc3RlZFxyXG4gICAgICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIF9jb25maWcuZGVidWcuc2hvd1JlbWFpbmluZ1BhdGNoTGFiZWxzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IHBhdGNoZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRjaCA9IHBhdGNoZXNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgaHN2WzBdID0gKHRvcExhYmVsc1tpXS5sYWJlbCAvIChtYXhMYWJlbCArIDEpKSAqIDM2MDtcclxuICAgICAgICAgICAgICAgICAgICBDVlV0aWxzLmhzdjJyZ2IoaHN2LCByZ2IpO1xyXG4gICAgICAgICAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1JlY3QocGF0Y2gucG9zLCBfc3ViSW1hZ2VXcmFwcGVyLnNpemUsIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge2NvbG9yOiBcInJnYihcIiArIHJnYi5qb2luKFwiLFwiKSArIFwiKVwiLCBsaW5lV2lkdGg6IDJ9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBib3hlcztcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmQgc2ltaWxhciBtb21lbnRzICh2aWEgY2x1c3RlcilcclxuICogQHBhcmFtIHtPYmplY3R9IG1vbWVudHNcclxuICovXHJcbmZ1bmN0aW9uIHNpbWlsYXJNb21lbnRzKG1vbWVudHMpIHtcclxuICAgIHZhciBjbHVzdGVycyA9IENWVXRpbHMuY2x1c3Rlcihtb21lbnRzLCAwLjkwKTtcclxuICAgIHZhciB0b3BDbHVzdGVyID0gQ1ZVdGlscy50b3BHZW5lcmljKGNsdXN0ZXJzLCAxLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgcmV0dXJuIGUuZ2V0UG9pbnRzKCkubGVuZ3RoO1xyXG4gICAgfSk7XHJcbiAgICB2YXIgcG9pbnRzID0gW10sIHJlc3VsdCA9IFtdO1xyXG4gICAgaWYgKHRvcENsdXN0ZXIubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgcG9pbnRzID0gdG9wQ2x1c3RlclswXS5pdGVtLmdldFBvaW50cygpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBvaW50c1tpXS5wb2ludCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gc2tlbGV0b25pemUoeCwgeSkge1xyXG4gICAgX2JpbmFyeUltYWdlV3JhcHBlci5zdWJJbWFnZUFzQ29weShfc3ViSW1hZ2VXcmFwcGVyLCBDVlV0aWxzLmltYWdlUmVmKHgsIHkpKTtcclxuICAgIF9za2VsZXRvbml6ZXIuc2tlbGV0b25pemUoKTtcclxuXHJcbiAgICAvLyBTaG93IHNrZWxldG9uIGlmIHJlcXVlc3RlZFxyXG4gICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiBfY29uZmlnLmRlYnVnLnNob3dTa2VsZXRvbikge1xyXG4gICAgICAgIF9za2VsSW1hZ2VXcmFwcGVyLm92ZXJsYXkoX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5LCAzNjAsIENWVXRpbHMuaW1hZ2VSZWYoeCwgeSkpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogRXh0cmFjdHMgYW5kIGRlc2NyaWJlcyB0aG9zZSBwYXRjaGVzIHdoaWNoIHNlZW0gdG8gY29udGFpbiBhIGJhcmNvZGUgcGF0dGVyblxyXG4gKiBAcGFyYW0ge0FycmF5fSBtb21lbnRzXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXRjaFBvcyxcclxuICogQHBhcmFtIHtOdW1iZXJ9IHhcclxuICogQHBhcmFtIHtOdW1iZXJ9IHlcclxuICogQHJldHVybnMge0FycmF5fSBsaXN0IG9mIHBhdGNoZXNcclxuICovXHJcbmZ1bmN0aW9uIGRlc2NyaWJlUGF0Y2gobW9tZW50cywgcGF0Y2hQb3MsIHgsIHkpIHtcclxuICAgIHZhciBrLFxyXG4gICAgICAgIGF2ZyxcclxuICAgICAgICBlbGlnaWJsZU1vbWVudHMgPSBbXSxcclxuICAgICAgICBtYXRjaGluZ01vbWVudHMsXHJcbiAgICAgICAgcGF0Y2gsXHJcbiAgICAgICAgcGF0Y2hlc0ZvdW5kID0gW10sXHJcbiAgICAgICAgbWluQ29tcG9uZW50V2VpZ2h0ID0gTWF0aC5jZWlsKF9wYXRjaFNpemUueCAvIDMpO1xyXG5cclxuICAgIGlmIChtb21lbnRzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgLy8gb25seSBjb2xsZWN0IG1vbWVudHMgd2hpY2gncyBhcmVhIGNvdmVycyBhdCBsZWFzdCBtaW5Db21wb25lbnRXZWlnaHQgcGl4ZWxzLlxyXG4gICAgICAgIGZvciAoIGsgPSAwOyBrIDwgbW9tZW50cy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICBpZiAobW9tZW50c1trXS5tMDAgPiBtaW5Db21wb25lbnRXZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGVsaWdpYmxlTW9tZW50cy5wdXNoKG1vbWVudHNba10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZiBhdCBsZWFzdCAyIG1vbWVudHMgYXJlIGZvdW5kIHdoaWNoIGhhdmUgYXQgbGVhc3QgbWluQ29tcG9uZW50V2VpZ2h0cyBjb3ZlcmVkXHJcbiAgICAgICAgaWYgKGVsaWdpYmxlTW9tZW50cy5sZW5ndGggPj0gMikge1xyXG4gICAgICAgICAgICBtYXRjaGluZ01vbWVudHMgPSBzaW1pbGFyTW9tZW50cyhlbGlnaWJsZU1vbWVudHMpO1xyXG4gICAgICAgICAgICBhdmcgPSAwO1xyXG4gICAgICAgICAgICAvLyBkZXRlcm1pbmUgdGhlIHNpbWlsYXJpdHkgb2YgdGhlIG1vbWVudHNcclxuICAgICAgICAgICAgZm9yICggayA9IDA7IGsgPCBtYXRjaGluZ01vbWVudHMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgIGF2ZyArPSBtYXRjaGluZ01vbWVudHNba10ucmFkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBPbmx5IHR3byBvZiB0aGUgbW9tZW50cyBhcmUgYWxsb3dlZCBub3QgdG8gZml0IGludG8gdGhlIGVxdWF0aW9uXHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgcGF0Y2ggdG8gdGhlIHNldFxyXG4gICAgICAgICAgICBpZiAobWF0Y2hpbmdNb21lbnRzLmxlbmd0aCA+IDFcclxuICAgICAgICAgICAgICAgICAgICAmJiBtYXRjaGluZ01vbWVudHMubGVuZ3RoID49IChlbGlnaWJsZU1vbWVudHMubGVuZ3RoIC8gNCkgKiAzXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgbWF0Y2hpbmdNb21lbnRzLmxlbmd0aCA+IG1vbWVudHMubGVuZ3RoIC8gNCkge1xyXG4gICAgICAgICAgICAgICAgYXZnIC89IG1hdGNoaW5nTW9tZW50cy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBwYXRjaCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogcGF0Y2hQb3NbMV0gKiBfbnVtUGF0Y2hlcy54ICsgcGF0Y2hQb3NbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGJveDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZWMyLmNsb25lKFt4LCB5XSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlYzIuY2xvbmUoW3ggKyBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueCwgeV0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZWMyLmNsb25lKFt4ICsgX3N1YkltYWdlV3JhcHBlci5zaXplLngsIHkgKyBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueV0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZWMyLmNsb25lKFt4LCB5ICsgX3N1YkltYWdlV3JhcHBlci5zaXplLnldKVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50czogbWF0Y2hpbmdNb21lbnRzLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZDogYXZnLFxyXG4gICAgICAgICAgICAgICAgICAgIHZlYzogdmVjMi5jbG9uZShbTWF0aC5jb3MoYXZnKSwgTWF0aC5zaW4oYXZnKV0pXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcGF0Y2hlc0ZvdW5kLnB1c2gocGF0Y2gpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhdGNoZXNGb3VuZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIGZpbmRzIHBhdGNoZXMgd2hpY2ggYXJlIGNvbm5lY3RlZCBhbmQgc2hhcmUgdGhlIHNhbWUgb3JpZW50YXRpb25cclxuICogQHBhcmFtIHtPYmplY3R9IHBhdGNoZXNGb3VuZFxyXG4gKi9cclxuZnVuY3Rpb24gcmFzdGVyaXplQW5ndWxhclNpbWlsYXJpdHkocGF0Y2hlc0ZvdW5kKSB7XHJcbiAgICB2YXIgbGFiZWwgPSAwLFxyXG4gICAgICAgIHRocmVzaG9sZCA9IDAuOTUsXHJcbiAgICAgICAgY3VycklkeCA9IDAsXHJcbiAgICAgICAgaixcclxuICAgICAgICBwYXRjaCxcclxuICAgICAgICBoc3YgPSBbMCwgMSwgMV0sXHJcbiAgICAgICAgcmdiID0gWzAsIDAsIDBdO1xyXG5cclxuICAgIGZ1bmN0aW9uIG5vdFlldFByb2Nlc3NlZCgpIHtcclxuICAgICAgICB2YXIgaTtcclxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IF9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChfcGF0Y2hMYWJlbEdyaWQuZGF0YVtpXSA9PT0gMCAmJiBfcGF0Y2hHcmlkLmRhdGFbaV0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfcGF0Y2hMYWJlbEdyaWQubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRyYWNlKGN1cnJlbnRJZHgpIHtcclxuICAgICAgICB2YXIgeCxcclxuICAgICAgICAgICAgeSxcclxuICAgICAgICAgICAgY3VycmVudFBhdGNoLFxyXG4gICAgICAgICAgICBpZHgsXHJcbiAgICAgICAgICAgIGRpcixcclxuICAgICAgICAgICAgY3VycmVudCA9IHtcclxuICAgICAgICAgICAgICAgIHg6IGN1cnJlbnRJZHggJSBfcGF0Y2hMYWJlbEdyaWQuc2l6ZS54LFxyXG4gICAgICAgICAgICAgICAgeTogKGN1cnJlbnRJZHggLyBfcGF0Y2hMYWJlbEdyaWQuc2l6ZS54KSB8IDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2ltaWxhcml0eTtcclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnRJZHggPCBfcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY3VycmVudFBhdGNoID0gX2ltYWdlVG9QYXRjaEdyaWQuZGF0YVtjdXJyZW50SWR4XTtcclxuICAgICAgICAgICAgLy8gYXNzaWduIGxhYmVsXHJcbiAgICAgICAgICAgIF9wYXRjaExhYmVsR3JpZC5kYXRhW2N1cnJlbnRJZHhdID0gbGFiZWw7XHJcbiAgICAgICAgICAgIGZvciAoIGRpciA9IDA7IGRpciA8IFRyYWNlci5zZWFyY2hEaXJlY3Rpb25zLmxlbmd0aDsgZGlyKyspIHtcclxuICAgICAgICAgICAgICAgIHkgPSBjdXJyZW50LnkgKyBUcmFjZXIuc2VhcmNoRGlyZWN0aW9uc1tkaXJdWzBdO1xyXG4gICAgICAgICAgICAgICAgeCA9IGN1cnJlbnQueCArIFRyYWNlci5zZWFyY2hEaXJlY3Rpb25zW2Rpcl1bMV07XHJcbiAgICAgICAgICAgICAgICBpZHggPSB5ICogX3BhdGNoTGFiZWxHcmlkLnNpemUueCArIHg7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY29udGludWUgaWYgcGF0Y2ggZW1wdHlcclxuICAgICAgICAgICAgICAgIGlmIChfcGF0Y2hHcmlkLmRhdGFbaWR4XSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9wYXRjaExhYmVsR3JpZC5kYXRhW2lkeF0gPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChfcGF0Y2hMYWJlbEdyaWQuZGF0YVtpZHhdID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2ltaWxhcml0eSA9IE1hdGguYWJzKHZlYzIuZG90KF9pbWFnZVRvUGF0Y2hHcmlkLmRhdGFbaWR4XS52ZWMsIGN1cnJlbnRQYXRjaC52ZWMpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2ltaWxhcml0eSA+IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFjZShpZHgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBwcmVwYXJlIGZvciBmaW5kaW5nIHRoZSByaWdodCBwYXRjaGVzXHJcbiAgICBBcnJheUhlbHBlci5pbml0KF9wYXRjaEdyaWQuZGF0YSwgMCk7XHJcbiAgICBBcnJheUhlbHBlci5pbml0KF9wYXRjaExhYmVsR3JpZC5kYXRhLCAwKTtcclxuICAgIEFycmF5SGVscGVyLmluaXQoX2ltYWdlVG9QYXRjaEdyaWQuZGF0YSwgbnVsbCk7XHJcblxyXG4gICAgZm9yICggaiA9IDA7IGogPCBwYXRjaGVzRm91bmQubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBwYXRjaCA9IHBhdGNoZXNGb3VuZFtqXTtcclxuICAgICAgICBfaW1hZ2VUb1BhdGNoR3JpZC5kYXRhW3BhdGNoLmluZGV4XSA9IHBhdGNoO1xyXG4gICAgICAgIF9wYXRjaEdyaWQuZGF0YVtwYXRjaC5pbmRleF0gPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJhc3Rlcml6ZSB0aGUgcGF0Y2hlcyBmb3VuZCB0byBkZXRlcm1pbmUgYXJlYVxyXG4gICAgX3BhdGNoR3JpZC56ZXJvQm9yZGVyKCk7XHJcblxyXG4gICAgd2hpbGUgKCggY3VycklkeCA9IG5vdFlldFByb2Nlc3NlZCgpKSA8IF9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aCkge1xyXG4gICAgICAgIGxhYmVsKys7XHJcbiAgICAgICAgdHJhY2UoY3VycklkeCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZHJhdyBwYXRjaC1sYWJlbHMgaWYgcmVxdWVzdGVkXHJcbiAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIF9jb25maWcuZGVidWcuc2hvd1BhdGNoTGFiZWxzKSB7XHJcbiAgICAgICAgZm9yICggaiA9IDA7IGogPCBfcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBpZiAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbal0gPiAwICYmIF9wYXRjaExhYmVsR3JpZC5kYXRhW2pdIDw9IGxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRjaCA9IF9pbWFnZVRvUGF0Y2hHcmlkLmRhdGFbal07XHJcbiAgICAgICAgICAgICAgICBoc3ZbMF0gPSAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbal0gLyAobGFiZWwgKyAxKSkgKiAzNjA7XHJcbiAgICAgICAgICAgICAgICBDVlV0aWxzLmhzdjJyZ2IoaHN2LCByZ2IpO1xyXG4gICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UmVjdChwYXRjaC5wb3MsIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LFxyXG4gICAgICAgICAgICAgICAgICAgIHtjb2xvcjogXCJyZ2IoXCIgKyByZ2Iuam9pbihcIixcIikgKyBcIilcIiwgbGluZVdpZHRoOiAyfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxhYmVsO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBpbml0OiBmdW5jdGlvbihpbnB1dEltYWdlV3JhcHBlciwgY29uZmlnKSB7XHJcbiAgICAgICAgX2NvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICBfaW5wdXRJbWFnZVdyYXBwZXIgPSBpbnB1dEltYWdlV3JhcHBlcjtcclxuXHJcbiAgICAgICAgaW5pdEJ1ZmZlcnMoKTtcclxuICAgICAgICBpbml0Q2FudmFzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGxvY2F0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHBhdGNoZXNGb3VuZCxcclxuICAgICAgICAgICAgdG9wTGFiZWxzLFxyXG4gICAgICAgICAgICBib3hlcztcclxuXHJcbiAgICAgICAgaWYgKF9jb25maWcuaGFsZlNhbXBsZSkge1xyXG4gICAgICAgICAgICBDVlV0aWxzLmhhbGZTYW1wbGUoX2lucHV0SW1hZ2VXcmFwcGVyLCBfY3VycmVudEltYWdlV3JhcHBlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBiaW5hcml6ZUltYWdlKCk7XHJcbiAgICAgICAgcGF0Y2hlc0ZvdW5kID0gZmluZFBhdGNoZXMoKTtcclxuICAgICAgICAvLyByZXR1cm4gdW5sZXNzIDUlIG9yIG1vcmUgcGF0Y2hlcyBhcmUgZm91bmRcclxuICAgICAgICBpZiAocGF0Y2hlc0ZvdW5kLmxlbmd0aCA8IF9udW1QYXRjaGVzLnggKiBfbnVtUGF0Y2hlcy55ICogMC4wNSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJhc3RlcnJpemUgYXJlYSBieSBjb21wYXJpbmcgYW5ndWxhciBzaW1pbGFyaXR5O1xyXG4gICAgICAgIHZhciBtYXhMYWJlbCA9IHJhc3Rlcml6ZUFuZ3VsYXJTaW1pbGFyaXR5KHBhdGNoZXNGb3VuZCk7XHJcbiAgICAgICAgaWYgKG1heExhYmVsIDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNlYXJjaCBmb3IgYXJlYSB3aXRoIHRoZSBtb3N0IHBhdGNoZXMgKGJpZ2dlc3QgY29ubmVjdGVkIGFyZWEpXHJcbiAgICAgICAgdG9wTGFiZWxzID0gZmluZEJpZ2dlc3RDb25uZWN0ZWRBcmVhcyhtYXhMYWJlbCk7XHJcbiAgICAgICAgaWYgKHRvcExhYmVscy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBib3hlcyA9IGZpbmRCb3hlcyh0b3BMYWJlbHMsIG1heExhYmVsKTtcclxuICAgICAgICByZXR1cm4gYm94ZXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrSW1hZ2VDb25zdHJhaW50czogZnVuY3Rpb24oaW5wdXRTdHJlYW0sIGNvbmZpZykge1xyXG4gICAgICAgIHZhciBwYXRjaFNpemUsXHJcbiAgICAgICAgICAgIHdpZHRoID0gaW5wdXRTdHJlYW0uZ2V0V2lkdGgoKSxcclxuICAgICAgICAgICAgaGVpZ2h0ID0gaW5wdXRTdHJlYW0uZ2V0SGVpZ2h0KCksXHJcbiAgICAgICAgICAgIGhhbGZTYW1wbGUgPSBjb25maWcuaGFsZlNhbXBsZSA/IDAuNSA6IDEsXHJcbiAgICAgICAgICAgIHNpemUsXHJcbiAgICAgICAgICAgIGFyZWE7XHJcblxyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB3aWR0aCBhbmQgaGVpZ2h0IGJhc2VkIG9uIGFyZWFcclxuICAgICAgICBpZiAoaW5wdXRTdHJlYW0uZ2V0Q29uZmlnKCkuYXJlYSkge1xyXG4gICAgICAgICAgICBhcmVhID0gQ1ZVdGlscy5jb21wdXRlSW1hZ2VBcmVhKHdpZHRoLCBoZWlnaHQsIGlucHV0U3RyZWFtLmdldENvbmZpZygpLmFyZWEpO1xyXG4gICAgICAgICAgICBpbnB1dFN0cmVhbS5zZXRUb3BSaWdodCh7eDogYXJlYS5zeCwgeTogYXJlYS5zeX0pO1xyXG4gICAgICAgICAgICBpbnB1dFN0cmVhbS5zZXRDYW52YXNTaXplKHt4OiB3aWR0aCwgeTogaGVpZ2h0fSk7XHJcbiAgICAgICAgICAgIHdpZHRoID0gYXJlYS5zdztcclxuICAgICAgICAgICAgaGVpZ2h0ID0gYXJlYS5zaDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNpemUgPSB7XHJcbiAgICAgICAgICAgIHg6IE1hdGguZmxvb3Iod2lkdGggKiBoYWxmU2FtcGxlKSxcclxuICAgICAgICAgICAgeTogTWF0aC5mbG9vcihoZWlnaHQgKiBoYWxmU2FtcGxlKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHBhdGNoU2l6ZSA9IENWVXRpbHMuY2FsY3VsYXRlUGF0Y2hTaXplKGNvbmZpZy5wYXRjaFNpemUsIHNpemUpO1xyXG4gICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQYXRjaC1TaXplOiBcIiArIEpTT04uc3RyaW5naWZ5KHBhdGNoU2l6ZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXRTdHJlYW0uc2V0V2lkdGgoTWF0aC5mbG9vcihNYXRoLmZsb29yKHNpemUueCAvIHBhdGNoU2l6ZS54KSAqICgxIC8gaGFsZlNhbXBsZSkgKiBwYXRjaFNpemUueCkpO1xyXG4gICAgICAgIGlucHV0U3RyZWFtLnNldEhlaWdodChNYXRoLmZsb29yKE1hdGguZmxvb3Ioc2l6ZS55IC8gcGF0Y2hTaXplLnkpICogKDEgLyBoYWxmU2FtcGxlKSAqIHBhdGNoU2l6ZS55KSk7XHJcblxyXG4gICAgICAgIGlmICgoaW5wdXRTdHJlYW0uZ2V0V2lkdGgoKSAlIHBhdGNoU2l6ZS54KSA9PT0gMCAmJiAoaW5wdXRTdHJlYW0uZ2V0SGVpZ2h0KCkgJSBwYXRjaFNpemUueSkgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbWFnZSBkaW1lbnNpb25zIGRvIG5vdCBjb21wbHkgd2l0aCB0aGUgY3VycmVudCBzZXR0aW5nczogV2lkdGggKFwiICtcclxuICAgICAgICAgICAgd2lkdGggKyBcIiApYW5kIGhlaWdodCAoXCIgKyBoZWlnaHQgK1xyXG4gICAgICAgICAgICBcIikgbXVzdCBhIG11bHRpcGxlIG9mIFwiICsgcGF0Y2hTaXplLngpO1xyXG4gICAgfVxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9sb2NhdG9yL2JhcmNvZGVfbG9jYXRvci5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGRyYXdSZWN0OiBmdW5jdGlvbihwb3MsIHNpemUsIGN0eCwgc3R5bGUpe1xyXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0eWxlLmNvbG9yO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdHlsZS5jb2xvcjtcclxuICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY3R4LnN0cm9rZVJlY3QocG9zLngsIHBvcy55LCBzaXplLngsIHNpemUueSk7XHJcbiAgICB9LFxyXG4gICAgZHJhd1BhdGg6IGZ1bmN0aW9uKHBhdGgsIGRlZiwgY3R4LCBzdHlsZSkge1xyXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0eWxlLmNvbG9yO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdHlsZS5jb2xvcjtcclxuICAgICAgICBjdHgubGluZVdpZHRoID0gc3R5bGUubGluZVdpZHRoO1xyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHgubW92ZVRvKHBhdGhbMF1bZGVmLnhdLCBwYXRoWzBdW2RlZi55XSk7XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCBwYXRoLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGN0eC5saW5lVG8ocGF0aFtqXVtkZWYueF0sIHBhdGhbal1bZGVmLnldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgIH0sXHJcbiAgICBkcmF3SW1hZ2U6IGZ1bmN0aW9uKGltYWdlRGF0YSwgc2l6ZSwgY3R4KSB7XHJcbiAgICAgICAgdmFyIGNhbnZhc0RhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIHNpemUueCwgc2l6ZS55KSxcclxuICAgICAgICAgICAgZGF0YSA9IGNhbnZhc0RhdGEuZGF0YSxcclxuICAgICAgICAgICAgaW1hZ2VEYXRhUG9zID0gaW1hZ2VEYXRhLmxlbmd0aCxcclxuICAgICAgICAgICAgY2FudmFzRGF0YVBvcyA9IGRhdGEubGVuZ3RoLFxyXG4gICAgICAgICAgICB2YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKGNhbnZhc0RhdGFQb3MgLyBpbWFnZURhdGFQb3MgIT09IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAoaW1hZ2VEYXRhUG9zLS0pe1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGltYWdlRGF0YVtpbWFnZURhdGFQb3NdO1xyXG4gICAgICAgICAgICBkYXRhWy0tY2FudmFzRGF0YVBvc10gPSAyNTU7XHJcbiAgICAgICAgICAgIGRhdGFbLS1jYW52YXNEYXRhUG9zXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBkYXRhWy0tY2FudmFzRGF0YVBvc10gPSB2YWx1ZTtcclxuICAgICAgICAgICAgZGF0YVstLWNhbnZhc0RhdGFQb3NdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0eC5wdXRJbWFnZURhdGEoY2FudmFzRGF0YSwgMCwgMCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvbW1vbi9pbWFnZV9kZWJ1Zy5qc1xuICoqLyIsImltcG9ydCBUcmFjZXIgZnJvbSAnLi90cmFjZXInO1xyXG5cclxuLyoqXHJcbiAqIGh0dHA6Ly93d3cuY29kZXByb2plY3QuY29tL1RpcHMvNDA3MTcyL0Nvbm5lY3RlZC1Db21wb25lbnQtTGFiZWxpbmctYW5kLVZlY3Rvcml6YXRpb25cclxuICovXHJcbnZhciBSYXN0ZXJpemVyID0ge1xyXG4gICAgY3JlYXRlQ29udG91cjJEOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkaXI6IG51bGwsXHJcbiAgICAgICAgICAgIGluZGV4OiBudWxsLFxyXG4gICAgICAgICAgICBmaXJzdFZlcnRleDogbnVsbCxcclxuICAgICAgICAgICAgaW5zaWRlQ29udG91cnM6IG51bGwsXHJcbiAgICAgICAgICAgIG5leHRwZWVyOiBudWxsLFxyXG4gICAgICAgICAgICBwcmV2cGVlcjogbnVsbFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgQ09OVE9VUl9ESVI6IHtcclxuICAgICAgICBDV19ESVI6IDAsXHJcbiAgICAgICAgQ0NXX0RJUjogMSxcclxuICAgICAgICBVTktOT1dOX0RJUjogMlxyXG4gICAgfSxcclxuICAgIERJUjoge1xyXG4gICAgICAgIE9VVFNJREVfRURHRTogLTMyNzY3LFxyXG4gICAgICAgIElOU0lERV9FREdFOiAtMzI3NjZcclxuICAgIH0sXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgbGFiZWxXcmFwcGVyKSB7XHJcbiAgICAgICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgICAgICBsYWJlbERhdGEgPSBsYWJlbFdyYXBwZXIuZGF0YSxcclxuICAgICAgICAgICAgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54LFxyXG4gICAgICAgICAgICBoZWlnaHQgPSBpbWFnZVdyYXBwZXIuc2l6ZS55LFxyXG4gICAgICAgICAgICB0cmFjZXIgPSBUcmFjZXIuY3JlYXRlKGltYWdlV3JhcHBlciwgbGFiZWxXcmFwcGVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmFzdGVyaXplOiBmdW5jdGlvbihkZXB0aGxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29sb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgYmMsXHJcbiAgICAgICAgICAgICAgICAgICAgbGMsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBjeCxcclxuICAgICAgICAgICAgICAgICAgICBjeSxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvck1hcCA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleCxcclxuICAgICAgICAgICAgICAgICAgICBwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvcyxcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0ZWRDb3VudCA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IDQwMDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3JNYXBbaV0gPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbG9yTWFwWzBdID0gaW1hZ2VEYXRhWzBdO1xyXG4gICAgICAgICAgICAgICAgY2MgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZm9yICggY3kgPSAxOyBjeSA8IGhlaWdodCAtIDE7IGN5KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbGluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBiYyA9IGNvbG9yTWFwWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoIGN4ID0gMTsgY3ggPCB3aWR0aCAtIDE7IGN4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0gY3kgKiB3aWR0aCArIGN4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWxEYXRhW3Bvc10gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gaW1hZ2VEYXRhW3Bvc107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IgIT09IGJjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGMgPSBjb25uZWN0ZWRDb3VudCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yTWFwW2xjXSA9IGNvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYyA9IGNvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXggPSB0cmFjZXIuY29udG91clRyYWNpbmcoY3ksIGN4LCBsYywgY29sb3IsIFJhc3Rlcml6ZXIuRElSLk9VVFNJREVfRURHRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2ZXJ0ZXggIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3RlZENvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbGluZGV4ID0gbGM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwID0gUmFzdGVyaXplci5jcmVhdGVDb250b3VyMkQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuZGlyID0gUmFzdGVyaXplci5DT05UT1VSX0RJUi5DV19ESVI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmluZGV4ID0gbGFiZWxpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuZmlyc3RWZXJ0ZXggPSB2ZXJ0ZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLm5leHRwZWVyID0gY2M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmluc2lkZUNvbnRvdXJzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnByZXZwZWVyID0gcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjID0gcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRleCA9IHRyYWNlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvbnRvdXJUcmFjaW5nKGN5LCBjeCwgUmFzdGVyaXplci5ESVIuSU5TSURFX0VER0UsIGNvbG9yLCBsYWJlbGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZlcnRleCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcCA9IFJhc3Rlcml6ZXIuY3JlYXRlQ29udG91cjJEKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmZpcnN0VmVydGV4ID0gdmVydGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5pbnNpZGVDb250b3VycyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVwdGhsYWJlbCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuZGlyID0gUmFzdGVyaXplci5DT05UT1VSX0RJUi5DQ1dfRElSO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmRpciA9IFJhc3Rlcml6ZXIuQ09OVE9VUl9ESVIuQ1dfRElSO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5pbmRleCA9IGRlcHRobGFiZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYyA9IGNjO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKChzYyAhPT0gbnVsbCkgJiYgc2MuaW5kZXggIT09IGxhYmVsaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYyA9IHNjLm5leHRwZWVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5uZXh0cGVlciA9IHNjLmluc2lkZUNvbnRvdXJzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzYy5pbnNpZGVDb250b3VycyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYy5pbnNpZGVDb250b3Vycy5wcmV2cGVlciA9IHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjLmluc2lkZUNvbnRvdXJzID0gcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxEYXRhW3Bvc10gPSBsYWJlbGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxhYmVsRGF0YVtwb3NdID09PSBSYXN0ZXJpemVyLkRJUi5PVVRTSURFX0VER0VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBsYWJlbERhdGFbcG9zXSA9PT0gUmFzdGVyaXplci5ESVIuSU5TSURFX0VER0UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsRGF0YVtwb3NdID09PSBSYXN0ZXJpemVyLkRJUi5JTlNJREVfRURHRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJjID0gaW1hZ2VEYXRhW3Bvc107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJjID0gY29sb3JNYXBbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbGluZGV4ID0gbGFiZWxEYXRhW3Bvc107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYyA9IGNvbG9yTWFwW2xhYmVsaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2MgPSBjYztcclxuICAgICAgICAgICAgICAgIHdoaWxlIChzYyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjLmluZGV4ID0gZGVwdGhsYWJlbDtcclxuICAgICAgICAgICAgICAgICAgICBzYyA9IHNjLm5leHRwZWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBjYzogY2MsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IGNvbm5lY3RlZENvdW50XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZWJ1Zzoge1xyXG4gICAgICAgICAgICAgICAgZHJhd0NvbnRvdXI6IGZ1bmN0aW9uKGNhbnZhcywgZmlyc3RDb250b3VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBxID0gZmlyc3RDb250b3VyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpcSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJyZWRcIjtcclxuICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZWRcIjtcclxuICAgICAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBxICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlxID0gcHEuaW5zaWRlQ29udG91cnM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHBxICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpcSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcSA9IGlxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXEgPSBpcS5uZXh0cGVlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHEgPSBwcTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBxID0gcHEubmV4dHBlZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHEgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcSA9IHBxLmluc2lkZUNvbnRvdXJzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocS5kaXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBSYXN0ZXJpemVyLkNPTlRPVVJfRElSLkNXX0RJUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwicmVkXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBSYXN0ZXJpemVyLkNPTlRPVVJfRElSLkNDV19ESVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsdWVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFJhc3Rlcml6ZXIuQ09OVE9VUl9ESVIuVU5LTk9XTl9ESVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcCA9IHEuZmlyc3RWZXJ0ZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4Lm1vdmVUbyhwLngsIHAueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBwLm5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHgubGluZVRvKHAueCwgcC55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSB3aGlsZSAocCAhPT0gcS5maXJzdFZlcnRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmFzdGVyaXplcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvbG9jYXRvci9yYXN0ZXJpemVyLmpzXG4gKiovIiwiLyoqXHJcbiAqIGh0dHA6Ly93d3cuY29kZXByb2plY3QuY29tL1RpcHMvNDA3MTcyL0Nvbm5lY3RlZC1Db21wb25lbnQtTGFiZWxpbmctYW5kLVZlY3Rvcml6YXRpb25cclxuICovXHJcbnZhciBUcmFjZXIgPSB7XHJcbiAgICBzZWFyY2hEaXJlY3Rpb25zOiBbWzAsIDFdLCBbMSwgMV0sIFsxLCAwXSwgWzEsIC0xXSwgWzAsIC0xXSwgWy0xLCAtMV0sIFstMSwgMF0sIFstMSwgMV1dLFxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGxhYmVsV3JhcHBlcikge1xyXG4gICAgICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICAgICAgbGFiZWxEYXRhID0gbGFiZWxXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgICAgIHNlYXJjaERpcmVjdGlvbnMgPSB0aGlzLnNlYXJjaERpcmVjdGlvbnMsXHJcbiAgICAgICAgICAgIHdpZHRoID0gaW1hZ2VXcmFwcGVyLnNpemUueCxcclxuICAgICAgICAgICAgcG9zO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmFjZShjdXJyZW50LCBjb2xvciwgbGFiZWwsIGVkZ2VsYWJlbCkge1xyXG4gICAgICAgICAgICB2YXIgaSxcclxuICAgICAgICAgICAgICAgIHksXHJcbiAgICAgICAgICAgICAgICB4O1xyXG5cclxuICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHkgPSBjdXJyZW50LmN5ICsgc2VhcmNoRGlyZWN0aW9uc1tjdXJyZW50LmRpcl1bMF07XHJcbiAgICAgICAgICAgICAgICB4ID0gY3VycmVudC5jeCArIHNlYXJjaERpcmVjdGlvbnNbY3VycmVudC5kaXJdWzFdO1xyXG4gICAgICAgICAgICAgICAgcG9zID0geSAqIHdpZHRoICsgeDtcclxuICAgICAgICAgICAgICAgIGlmICgoaW1hZ2VEYXRhW3Bvc10gPT09IGNvbG9yKSAmJiAoKGxhYmVsRGF0YVtwb3NdID09PSAwKSB8fCAobGFiZWxEYXRhW3Bvc10gPT09IGxhYmVsKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbERhdGFbcG9zXSA9IGxhYmVsO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuY3kgPSB5O1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuY3ggPSB4O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWxEYXRhW3Bvc10gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxEYXRhW3Bvc10gPSBlZGdlbGFiZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuZGlyID0gKGN1cnJlbnQuZGlyICsgMSkgJSA4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHZlcnRleDJEKHgsIHksIGRpcikge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZGlyOiBkaXIsXHJcbiAgICAgICAgICAgICAgICB4OiB4LFxyXG4gICAgICAgICAgICAgICAgeTogeSxcclxuICAgICAgICAgICAgICAgIG5leHQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBwcmV2OiBudWxsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjb250b3VyVHJhY2luZyhzeSwgc3gsIGxhYmVsLCBjb2xvciwgZWRnZWxhYmVsKSB7XHJcbiAgICAgICAgICAgIHZhciBGdiA9IG51bGwsXHJcbiAgICAgICAgICAgICAgICBDdixcclxuICAgICAgICAgICAgICAgIFAsXHJcbiAgICAgICAgICAgICAgICBsZGlyLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjeDogc3gsXHJcbiAgICAgICAgICAgICAgICAgICAgY3k6IHN5LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpcjogMFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0cmFjZShjdXJyZW50LCBjb2xvciwgbGFiZWwsIGVkZ2VsYWJlbCkpIHtcclxuICAgICAgICAgICAgICAgIEZ2ID0gdmVydGV4MkQoc3gsIHN5LCBjdXJyZW50LmRpcik7XHJcbiAgICAgICAgICAgICAgICBDdiA9IEZ2O1xyXG4gICAgICAgICAgICAgICAgbGRpciA9IGN1cnJlbnQuZGlyO1xyXG4gICAgICAgICAgICAgICAgUCA9IHZlcnRleDJEKGN1cnJlbnQuY3gsIGN1cnJlbnQuY3ksIDApO1xyXG4gICAgICAgICAgICAgICAgUC5wcmV2ID0gQ3Y7XHJcbiAgICAgICAgICAgICAgICBDdi5uZXh0ID0gUDtcclxuICAgICAgICAgICAgICAgIFAubmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBDdiA9IFA7XHJcbiAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudC5kaXIgPSAoY3VycmVudC5kaXIgKyA2KSAlIDg7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2UoY3VycmVudCwgY29sb3IsIGxhYmVsLCBlZGdlbGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZGlyICE9PSBjdXJyZW50LmRpcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDdi5kaXIgPSBjdXJyZW50LmRpcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUCA9IHZlcnRleDJEKGN1cnJlbnQuY3gsIGN1cnJlbnQuY3ksIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQLnByZXYgPSBDdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ3YubmV4dCA9IFA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFAubmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEN2ID0gUDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDdi5kaXIgPSBsZGlyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDdi54ID0gY3VycmVudC5jeDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ3YueSA9IGN1cnJlbnQuY3k7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxkaXIgPSBjdXJyZW50LmRpcjtcclxuICAgICAgICAgICAgICAgIH0gd2hpbGUgKGN1cnJlbnQuY3ggIT09IHN4IHx8IGN1cnJlbnQuY3kgIT09IHN5KTtcclxuICAgICAgICAgICAgICAgIEZ2LnByZXYgPSBDdi5wcmV2O1xyXG4gICAgICAgICAgICAgICAgQ3YucHJldi5uZXh0ID0gRnY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIEZ2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHJhY2U6IGZ1bmN0aW9uKGN1cnJlbnQsIGNvbG9yLCBsYWJlbCwgZWRnZWxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhY2UoY3VycmVudCwgY29sb3IsIGxhYmVsLCBlZGdlbGFiZWwpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb250b3VyVHJhY2luZzogZnVuY3Rpb24oc3ksIHN4LCBsYWJlbCwgY29sb3IsIGVkZ2VsYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRvdXJUcmFjaW5nKHN5LCBzeCwgbGFiZWwsIGNvbG9yLCBlZGdlbGFiZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChUcmFjZXIpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9sb2NhdG9yL3RyYWNlci5qc1xuICoqLyIsIi8qIEBwcmVzZXJ2ZSBBU00gQkVHSU4gKi9cclxuLyogZXNsaW50LWRpc2FibGUgZXFlcWVxKi9cclxuZnVuY3Rpb24gU2tlbGV0b25pemVyKHN0ZGxpYiwgZm9yZWlnbiwgYnVmZmVyKSB7XHJcbiAgICBcInVzZSBhc21cIjtcclxuXHJcbiAgICB2YXIgaW1hZ2VzID0gbmV3IHN0ZGxpYi5VaW50OEFycmF5KGJ1ZmZlciksXHJcbiAgICAgICAgc2l6ZSA9IGZvcmVpZ24uc2l6ZSB8IDAsXHJcbiAgICAgICAgaW11bCA9IHN0ZGxpYi5NYXRoLmltdWw7XHJcblxyXG4gICAgZnVuY3Rpb24gZXJvZGUoaW5JbWFnZVB0ciwgb3V0SW1hZ2VQdHIpIHtcclxuICAgICAgICBpbkltYWdlUHRyID0gaW5JbWFnZVB0ciB8IDA7XHJcbiAgICAgICAgb3V0SW1hZ2VQdHIgPSBvdXRJbWFnZVB0ciB8IDA7XHJcblxyXG4gICAgICAgIHZhciB2ID0gMCxcclxuICAgICAgICAgICAgdSA9IDAsXHJcbiAgICAgICAgICAgIHN1bSA9IDAsXHJcbiAgICAgICAgICAgIHlTdGFydDEgPSAwLFxyXG4gICAgICAgICAgICB5U3RhcnQyID0gMCxcclxuICAgICAgICAgICAgeFN0YXJ0MSA9IDAsXHJcbiAgICAgICAgICAgIHhTdGFydDIgPSAwLFxyXG4gICAgICAgICAgICBvZmZzZXQgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKCB2ID0gMTsgKHYgfCAwKSA8ICgoc2l6ZSAtIDEpIHwgMCk7IHYgPSAodiArIDEpIHwgMCkge1xyXG4gICAgICAgICAgICBvZmZzZXQgPSAob2Zmc2V0ICsgc2l6ZSkgfCAwO1xyXG4gICAgICAgICAgICBmb3IgKCB1ID0gMTsgKHUgfCAwKSA8ICgoc2l6ZSAtIDEpIHwgMCk7IHUgPSAodSArIDEpIHwgMCkge1xyXG4gICAgICAgICAgICAgICAgeVN0YXJ0MSA9IChvZmZzZXQgLSBzaXplKSB8IDA7XHJcbiAgICAgICAgICAgICAgICB5U3RhcnQyID0gKG9mZnNldCArIHNpemUpIHwgMDtcclxuICAgICAgICAgICAgICAgIHhTdGFydDEgPSAodSAtIDEpIHwgMDtcclxuICAgICAgICAgICAgICAgIHhTdGFydDIgPSAodSArIDEpIHwgMDtcclxuICAgICAgICAgICAgICAgIHN1bSA9ICgoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MSArIHhTdGFydDEpIHwgMF0gfCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDEgKyB4U3RhcnQyKSB8IDBdIHwgMClcclxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyBvZmZzZXQgKyB1KSB8IDBdIHwgMClcclxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQyICsgeFN0YXJ0MSkgfCAwXSB8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MiArIHhTdGFydDIpIHwgMF0gfCAwKSkgfCAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKChzdW0gfCAwKSA9PSAoNSB8IDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIG9mZnNldCArIHUpIHwgMF0gPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZXNbKG91dEltYWdlUHRyICsgb2Zmc2V0ICsgdSkgfCAwXSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN1YnRyYWN0KGFJbWFnZVB0ciwgYkltYWdlUHRyLCBvdXRJbWFnZVB0cikge1xyXG4gICAgICAgIGFJbWFnZVB0ciA9IGFJbWFnZVB0ciB8IDA7XHJcbiAgICAgICAgYkltYWdlUHRyID0gYkltYWdlUHRyIHwgMDtcclxuICAgICAgICBvdXRJbWFnZVB0ciA9IG91dEltYWdlUHRyIHwgMDtcclxuXHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIGxlbmd0aCA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xyXG5cclxuICAgICAgICB3aGlsZSAoKGxlbmd0aCB8IDApID4gMCkge1xyXG4gICAgICAgICAgICBsZW5ndGggPSAobGVuZ3RoIC0gMSkgfCAwO1xyXG4gICAgICAgICAgICBpbWFnZXNbKG91dEltYWdlUHRyICsgbGVuZ3RoKSB8IDBdID1cclxuICAgICAgICAgICAgICAgICgoaW1hZ2VzWyhhSW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKSAtIChpbWFnZXNbKGJJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSB8IDApKSB8IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGJpdHdpc2VPcihhSW1hZ2VQdHIsIGJJbWFnZVB0ciwgb3V0SW1hZ2VQdHIpIHtcclxuICAgICAgICBhSW1hZ2VQdHIgPSBhSW1hZ2VQdHIgfCAwO1xyXG4gICAgICAgIGJJbWFnZVB0ciA9IGJJbWFnZVB0ciB8IDA7XHJcbiAgICAgICAgb3V0SW1hZ2VQdHIgPSBvdXRJbWFnZVB0ciB8IDA7XHJcblxyXG4gICAgICAgIHZhciBsZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBsZW5ndGggPSBpbXVsKHNpemUsIHNpemUpIHwgMDtcclxuXHJcbiAgICAgICAgd2hpbGUgKChsZW5ndGggfCAwKSA+IDApIHtcclxuICAgICAgICAgICAgbGVuZ3RoID0gKGxlbmd0aCAtIDEpIHwgMDtcclxuICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSA9XHJcbiAgICAgICAgICAgICAgICAoKGltYWdlc1soYUltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCkgfCAoaW1hZ2VzWyhiSW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKSkgfCAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb3VudE5vblplcm8oaW1hZ2VQdHIpIHtcclxuICAgICAgICBpbWFnZVB0ciA9IGltYWdlUHRyIHwgMDtcclxuXHJcbiAgICAgICAgdmFyIHN1bSA9IDAsXHJcbiAgICAgICAgICAgIGxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIGxlbmd0aCA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xyXG5cclxuICAgICAgICB3aGlsZSAoKGxlbmd0aCB8IDApID4gMCkge1xyXG4gICAgICAgICAgICBsZW5ndGggPSAobGVuZ3RoIC0gMSkgfCAwO1xyXG4gICAgICAgICAgICBzdW0gPSAoKHN1bSB8IDApICsgKGltYWdlc1soaW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKSkgfCAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChzdW0gfCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KGltYWdlUHRyLCB2YWx1ZSkge1xyXG4gICAgICAgIGltYWdlUHRyID0gaW1hZ2VQdHIgfCAwO1xyXG4gICAgICAgIHZhbHVlID0gdmFsdWUgfCAwO1xyXG5cclxuICAgICAgICB2YXIgbGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgbGVuZ3RoID0gaW11bChzaXplLCBzaXplKSB8IDA7XHJcblxyXG4gICAgICAgIHdoaWxlICgobGVuZ3RoIHwgMCkgPiAwKSB7XHJcbiAgICAgICAgICAgIGxlbmd0aCA9IChsZW5ndGggLSAxKSB8IDA7XHJcbiAgICAgICAgICAgIGltYWdlc1soaW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGlsYXRlKGluSW1hZ2VQdHIsIG91dEltYWdlUHRyKSB7XHJcbiAgICAgICAgaW5JbWFnZVB0ciA9IGluSW1hZ2VQdHIgfCAwO1xyXG4gICAgICAgIG91dEltYWdlUHRyID0gb3V0SW1hZ2VQdHIgfCAwO1xyXG5cclxuICAgICAgICB2YXIgdiA9IDAsXHJcbiAgICAgICAgICAgIHUgPSAwLFxyXG4gICAgICAgICAgICBzdW0gPSAwLFxyXG4gICAgICAgICAgICB5U3RhcnQxID0gMCxcclxuICAgICAgICAgICAgeVN0YXJ0MiA9IDAsXHJcbiAgICAgICAgICAgIHhTdGFydDEgPSAwLFxyXG4gICAgICAgICAgICB4U3RhcnQyID0gMCxcclxuICAgICAgICAgICAgb2Zmc2V0ID0gMDtcclxuXHJcbiAgICAgICAgZm9yICggdiA9IDE7ICh2IHwgMCkgPCAoKHNpemUgLSAxKSB8IDApOyB2ID0gKHYgKyAxKSB8IDApIHtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gKG9mZnNldCArIHNpemUpIHwgMDtcclxuICAgICAgICAgICAgZm9yICggdSA9IDE7ICh1IHwgMCkgPCAoKHNpemUgLSAxKSB8IDApOyB1ID0gKHUgKyAxKSB8IDApIHtcclxuICAgICAgICAgICAgICAgIHlTdGFydDEgPSAob2Zmc2V0IC0gc2l6ZSkgfCAwO1xyXG4gICAgICAgICAgICAgICAgeVN0YXJ0MiA9IChvZmZzZXQgKyBzaXplKSB8IDA7XHJcbiAgICAgICAgICAgICAgICB4U3RhcnQxID0gKHUgLSAxKSB8IDA7XHJcbiAgICAgICAgICAgICAgICB4U3RhcnQyID0gKHUgKyAxKSB8IDA7XHJcbiAgICAgICAgICAgICAgICBzdW0gPSAoKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDEgKyB4U3RhcnQxKSB8IDBdIHwgMClcclxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQxICsgeFN0YXJ0MikgfCAwXSB8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgb2Zmc2V0ICsgdSkgfCAwXSB8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MiArIHhTdGFydDEpIHwgMF0gfCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDIgKyB4U3RhcnQyKSB8IDBdIHwgMCkpIHwgMDtcclxuICAgICAgICAgICAgICAgIGlmICgoc3VtIHwgMCkgPiAoMCB8IDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIG9mZnNldCArIHUpIHwgMF0gPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZXNbKG91dEltYWdlUHRyICsgb2Zmc2V0ICsgdSkgfCAwXSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1lbWNweShzcmNJbWFnZVB0ciwgZHN0SW1hZ2VQdHIpIHtcclxuICAgICAgICBzcmNJbWFnZVB0ciA9IHNyY0ltYWdlUHRyIHwgMDtcclxuICAgICAgICBkc3RJbWFnZVB0ciA9IGRzdEltYWdlUHRyIHwgMDtcclxuXHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIGxlbmd0aCA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xyXG5cclxuICAgICAgICB3aGlsZSAoKGxlbmd0aCB8IDApID4gMCkge1xyXG4gICAgICAgICAgICBsZW5ndGggPSAobGVuZ3RoIC0gMSkgfCAwO1xyXG4gICAgICAgICAgICBpbWFnZXNbKGRzdEltYWdlUHRyICsgbGVuZ3RoKSB8IDBdID0gKGltYWdlc1soc3JjSW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gemVyb0JvcmRlcihpbWFnZVB0cikge1xyXG4gICAgICAgIGltYWdlUHRyID0gaW1hZ2VQdHIgfCAwO1xyXG5cclxuICAgICAgICB2YXIgeCA9IDAsXHJcbiAgICAgICAgICAgIHkgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKCB4ID0gMDsgKHggfCAwKSA8ICgoc2l6ZSAtIDEpIHwgMCk7IHggPSAoeCArIDEpIHwgMCkge1xyXG4gICAgICAgICAgICBpbWFnZXNbKGltYWdlUHRyICsgeCkgfCAwXSA9IDA7XHJcbiAgICAgICAgICAgIGltYWdlc1soaW1hZ2VQdHIgKyB5KSB8IDBdID0gMDtcclxuICAgICAgICAgICAgeSA9ICgoeSArIHNpemUpIC0gMSkgfCAwO1xyXG4gICAgICAgICAgICBpbWFnZXNbKGltYWdlUHRyICsgeSkgfCAwXSA9IDA7XHJcbiAgICAgICAgICAgIHkgPSAoeSArIDEpIHwgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICggeCA9IDA7ICh4IHwgMCkgPCAoc2l6ZSB8IDApOyB4ID0gKHggKyAxKSB8IDApIHtcclxuICAgICAgICAgICAgaW1hZ2VzWyhpbWFnZVB0ciArIHkpIHwgMF0gPSAwO1xyXG4gICAgICAgICAgICB5ID0gKHkgKyAxKSB8IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNrZWxldG9uaXplKCkge1xyXG4gICAgICAgIHZhciBzdWJJbWFnZVB0ciA9IDAsXHJcbiAgICAgICAgICAgIGVyb2RlZEltYWdlUHRyID0gMCxcclxuICAgICAgICAgICAgdGVtcEltYWdlUHRyID0gMCxcclxuICAgICAgICAgICAgc2tlbEltYWdlUHRyID0gMCxcclxuICAgICAgICAgICAgc3VtID0gMCxcclxuICAgICAgICAgICAgZG9uZSA9IDA7XHJcblxyXG4gICAgICAgIGVyb2RlZEltYWdlUHRyID0gaW11bChzaXplLCBzaXplKSB8IDA7XHJcbiAgICAgICAgdGVtcEltYWdlUHRyID0gKGVyb2RlZEltYWdlUHRyICsgZXJvZGVkSW1hZ2VQdHIpIHwgMDtcclxuICAgICAgICBza2VsSW1hZ2VQdHIgPSAodGVtcEltYWdlUHRyICsgZXJvZGVkSW1hZ2VQdHIpIHwgMDtcclxuXHJcbiAgICAgICAgLy8gaW5pdCBza2VsLWltYWdlXHJcbiAgICAgICAgaW5pdChza2VsSW1hZ2VQdHIsIDApO1xyXG4gICAgICAgIHplcm9Cb3JkZXIoc3ViSW1hZ2VQdHIpO1xyXG5cclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIGVyb2RlKHN1YkltYWdlUHRyLCBlcm9kZWRJbWFnZVB0cik7XHJcbiAgICAgICAgICAgIGRpbGF0ZShlcm9kZWRJbWFnZVB0ciwgdGVtcEltYWdlUHRyKTtcclxuICAgICAgICAgICAgc3VidHJhY3Qoc3ViSW1hZ2VQdHIsIHRlbXBJbWFnZVB0ciwgdGVtcEltYWdlUHRyKTtcclxuICAgICAgICAgICAgYml0d2lzZU9yKHNrZWxJbWFnZVB0ciwgdGVtcEltYWdlUHRyLCBza2VsSW1hZ2VQdHIpO1xyXG4gICAgICAgICAgICBtZW1jcHkoZXJvZGVkSW1hZ2VQdHIsIHN1YkltYWdlUHRyKTtcclxuICAgICAgICAgICAgc3VtID0gY291bnROb25aZXJvKHN1YkltYWdlUHRyKSB8IDA7XHJcbiAgICAgICAgICAgIGRvbmUgPSAoKHN1bSB8IDApID09IDAgfCAwKTtcclxuICAgICAgICB9IHdoaWxlICghZG9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBza2VsZXRvbml6ZTogc2tlbGV0b25pemVcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNrZWxldG9uaXplcjtcclxuLyogZXNsaW50LWVuYWJsZSBlcWVxZXEqL1xyXG4vKiBAcHJlc2VydmUgQVNNIEVORCAqL1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9sb2NhdG9yL3NrZWxldG9uaXplci5qc1xuICoqLyIsImltcG9ydCBCcmVzZW5oYW0gZnJvbSAnLi9icmVzZW5oYW0nO1xyXG5pbXBvcnQgSW1hZ2VEZWJ1ZyBmcm9tICcuLi9jb21tb24vaW1hZ2VfZGVidWcnO1xyXG5pbXBvcnQgQ29kZTEyOFJlYWRlciBmcm9tICcuLi9yZWFkZXIvY29kZV8xMjhfcmVhZGVyJztcclxuaW1wb3J0IEVBTlJlYWRlciBmcm9tICcuLi9yZWFkZXIvZWFuX3JlYWRlcic7XHJcbmltcG9ydCBDb2RlMzlSZWFkZXIgZnJvbSAnLi4vcmVhZGVyL2NvZGVfMzlfcmVhZGVyJztcclxuaW1wb3J0IENvZGUzOVZJTlJlYWRlciBmcm9tICcuLi9yZWFkZXIvY29kZV8zOV92aW5fcmVhZGVyJztcclxuaW1wb3J0IENvZGFiYXJSZWFkZXIgZnJvbSAnLi4vcmVhZGVyL2NvZGFiYXJfcmVhZGVyJztcclxuaW1wb3J0IFVQQ1JlYWRlciBmcm9tICcuLi9yZWFkZXIvdXBjX3JlYWRlcic7XHJcbmltcG9ydCBFQU44UmVhZGVyIGZyb20gJy4uL3JlYWRlci9lYW5fOF9yZWFkZXInO1xyXG5pbXBvcnQgVVBDRVJlYWRlciBmcm9tICcuLi9yZWFkZXIvdXBjX2VfcmVhZGVyJztcclxuaW1wb3J0IEkyb2Y1UmVhZGVyIGZyb20gJy4uL3JlYWRlci9pMm9mNV9yZWFkZXInO1xyXG5cclxuY29uc3QgUkVBREVSUyA9IHtcclxuICAgIGNvZGVfMTI4X3JlYWRlcjogQ29kZTEyOFJlYWRlcixcclxuICAgIGVhbl9yZWFkZXI6IEVBTlJlYWRlcixcclxuICAgIGVhbl84X3JlYWRlcjogRUFOOFJlYWRlcixcclxuICAgIGNvZGVfMzlfcmVhZGVyOiBDb2RlMzlSZWFkZXIsXHJcbiAgICBjb2RlXzM5X3Zpbl9yZWFkZXI6IENvZGUzOVZJTlJlYWRlcixcclxuICAgIGNvZGFiYXJfcmVhZGVyOiBDb2RhYmFyUmVhZGVyLFxyXG4gICAgdXBjX3JlYWRlcjogVVBDUmVhZGVyLFxyXG4gICAgdXBjX2VfcmVhZGVyOiBVUENFUmVhZGVyLFxyXG4gICAgaTJvZjVfcmVhZGVyOiBJMm9mNVJlYWRlclxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGNvbmZpZywgaW5wdXRJbWFnZVdyYXBwZXIpIHtcclxuICAgICAgICB2YXIgX2NhbnZhcyA9IHtcclxuICAgICAgICAgICAgICAgIGN0eDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IG51bGxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkb206IHtcclxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiBudWxsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF9iYXJjb2RlUmVhZGVycyA9IFtdO1xyXG5cclxuICAgICAgICBpbml0Q2FudmFzKCk7XHJcbiAgICAgICAgaW5pdFJlYWRlcnMoKTtcclxuICAgICAgICBpbml0Q29uZmlnKCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRDYW52YXMoKSB7XHJcbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgdmFyICRkZWJ1ZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVidWcuZGV0ZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgX2NhbnZhcy5kb20uZnJlcXVlbmN5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhcy5mcmVxdWVuY3lcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV9jYW52YXMuZG9tLmZyZXF1ZW5jeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9jYW52YXMuZG9tLmZyZXF1ZW5jeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgX2NhbnZhcy5kb20uZnJlcXVlbmN5LmNsYXNzTmFtZSA9IFwiZnJlcXVlbmN5XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRkZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZGVidWcuYXBwZW5kQ2hpbGQoX2NhbnZhcy5kb20uZnJlcXVlbmN5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfY2FudmFzLmN0eC5mcmVxdWVuY3kgPSBfY2FudmFzLmRvbS5mcmVxdWVuY3kuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIF9jYW52YXMuZG9tLnBhdHRlcm4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzLnBhdHRlcm5CdWZmZXJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV9jYW52YXMuZG9tLnBhdHRlcm4pIHtcclxuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5wYXR0ZXJuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5wYXR0ZXJuLmNsYXNzTmFtZSA9IFwicGF0dGVybkJ1ZmZlclwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkZGVidWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGRlYnVnLmFwcGVuZENoaWxkKF9jYW52YXMuZG9tLnBhdHRlcm4pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF9jYW52YXMuY3R4LnBhdHRlcm4gPSBfY2FudmFzLmRvbS5wYXR0ZXJuLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5vdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhcy5kcmF3aW5nQnVmZmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF9jYW52YXMuZG9tLm92ZXJsYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmN0eC5vdmVybGF5ID0gX2NhbnZhcy5kb20ub3ZlcmxheS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRSZWFkZXJzKCkge1xyXG4gICAgICAgICAgICBjb25maWcucmVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHJlYWRlckNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlYWRlcixcclxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZWFkZXJDb25maWcgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyID0gcmVhZGVyQ29uZmlnLmZvcm1hdDtcclxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uID0gcmVhZGVyQ29uZmlnLmNvbmZpZztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlYWRlckNvbmZpZyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWFkZXIgPSByZWFkZXJDb25maWc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJCZWZvcmUgcmVnaXN0ZXJpbmcgcmVhZGVyOiBcIiwgcmVhZGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF9iYXJjb2RlUmVhZGVycy5wdXNoKG5ldyBSRUFERVJTW3JlYWRlcl0oY29uZmlndXJhdGlvbikpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWdpc3RlcmVkIFJlYWRlcnM6IFwiICsgX2JhcmNvZGVSZWFkZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgocmVhZGVyKSA9PiBKU09OLnN0cmluZ2lmeSh7Zm9ybWF0OiByZWFkZXIuRk9STUFULCBjb25maWc6IHJlYWRlci5jb25maWd9KSlcclxuICAgICAgICAgICAgICAgICAgICAuam9pbignLCAnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRDb25maWcoKSB7XHJcbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGksXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzID0gW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZTogX2NhbnZhcy5kb20uZnJlcXVlbmN5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBjb25maWcuZGVidWcuc2hvd0ZyZXF1ZW5jeVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZTogX2NhbnZhcy5kb20ucGF0dGVybixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogY29uZmlnLmRlYnVnLnNob3dQYXR0ZXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfV07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHZpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNbaV0ucHJvcCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNbaV0ubm9kZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc1tpXS5ub2RlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGV4dGVuZCB0aGUgbGluZSBvbiBib3RoIGVuZHNcclxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBsaW5lXHJcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGFuZ2xlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RXh0ZW5kZWRMaW5lKGxpbmUsIGFuZ2xlLCBleHQpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZXh0ZW5kTGluZShhbW91bnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBleHRlbnNpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeTogYW1vdW50ICogTWF0aC5zaW4oYW5nbGUpLFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IGFtb3VudCAqIE1hdGguY29zKGFuZ2xlKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBsaW5lWzBdLnkgLT0gZXh0ZW5zaW9uLnk7XHJcbiAgICAgICAgICAgICAgICBsaW5lWzBdLnggLT0gZXh0ZW5zaW9uLng7XHJcbiAgICAgICAgICAgICAgICBsaW5lWzFdLnkgKz0gZXh0ZW5zaW9uLnk7XHJcbiAgICAgICAgICAgICAgICBsaW5lWzFdLnggKz0gZXh0ZW5zaW9uLng7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGluc2lkZSBpbWFnZVxyXG4gICAgICAgICAgICBleHRlbmRMaW5lKGV4dCk7XHJcbiAgICAgICAgICAgIHdoaWxlIChleHQgPiAxICYmICghaW5wdXRJbWFnZVdyYXBwZXIuaW5JbWFnZVdpdGhCb3JkZXIobGluZVswXSwgMClcclxuICAgICAgICAgICAgICAgICAgICB8fCAhaW5wdXRJbWFnZVdyYXBwZXIuaW5JbWFnZVdpdGhCb3JkZXIobGluZVsxXSwgMCkpKSB7XHJcbiAgICAgICAgICAgICAgICBleHQgLT0gTWF0aC5jZWlsKGV4dCAvIDIpO1xyXG4gICAgICAgICAgICAgICAgZXh0ZW5kTGluZSgtZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbGluZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldExpbmUoYm94KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbe1xyXG4gICAgICAgICAgICAgICAgeDogKGJveFsxXVswXSAtIGJveFswXVswXSkgLyAyICsgYm94WzBdWzBdLFxyXG4gICAgICAgICAgICAgICAgeTogKGJveFsxXVsxXSAtIGJveFswXVsxXSkgLyAyICsgYm94WzBdWzFdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHg6IChib3hbM11bMF0gLSBib3hbMl1bMF0pIC8gMiArIGJveFsyXVswXSxcclxuICAgICAgICAgICAgICAgIHk6IChib3hbM11bMV0gLSBib3hbMl1bMV0pIC8gMiArIGJveFsyXVsxXVxyXG4gICAgICAgICAgICB9XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRyeURlY29kZShsaW5lKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBudWxsLFxyXG4gICAgICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgICAgIGJhcmNvZGVMaW5lID0gQnJlc2VuaGFtLmdldEJhcmNvZGVMaW5lKGlucHV0SW1hZ2VXcmFwcGVyLCBsaW5lWzBdLCBsaW5lWzFdKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgY29uZmlnLmRlYnVnLnNob3dGcmVxdWVuY3kpIHtcclxuICAgICAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgobGluZSwge3g6ICd4JywgeTogJ3knfSwgX2NhbnZhcy5jdHgub3ZlcmxheSwge2NvbG9yOiAncmVkJywgbGluZVdpZHRoOiAzfSk7XHJcbiAgICAgICAgICAgICAgICBCcmVzZW5oYW0uZGVidWcucHJpbnRGcmVxdWVuY3koYmFyY29kZUxpbmUubGluZSwgX2NhbnZhcy5kb20uZnJlcXVlbmN5KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgQnJlc2VuaGFtLnRvQmluYXJ5TGluZShiYXJjb2RlTGluZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIGNvbmZpZy5kZWJ1Zy5zaG93UGF0dGVybikge1xyXG4gICAgICAgICAgICAgICAgQnJlc2VuaGFtLmRlYnVnLnByaW50UGF0dGVybihiYXJjb2RlTGluZS5saW5lLCBfY2FudmFzLmRvbS5wYXR0ZXJuKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCBfYmFyY29kZVJlYWRlcnMubGVuZ3RoICYmIHJlc3VsdCA9PT0gbnVsbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBfYmFyY29kZVJlYWRlcnNbaV0uZGVjb2RlUGF0dGVybihiYXJjb2RlTGluZS5saW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBjb2RlUmVzdWx0OiByZXN1bHQsXHJcbiAgICAgICAgICAgICAgICBiYXJjb2RlTGluZTogYmFyY29kZUxpbmVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoaXMgbWV0aG9kIHNsaWNlcyB0aGUgZ2l2ZW4gYXJlYSBhcGFydCBhbmQgdHJpZXMgdG8gZGV0ZWN0IGEgYmFyY29kZS1wYXR0ZXJuXHJcbiAgICAgICAgICogZm9yIGVhY2ggc2xpY2UuIEl0IHJldHVybnMgdGhlIGRlY29kZWQgYmFyY29kZSwgb3IgbnVsbCBpZiBub3RoaW5nIHdhcyBmb3VuZFxyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGJveFxyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpbmVcclxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gbGluZUFuZ2xlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdHJ5RGVjb2RlQnJ1dGVGb3JjZShib3gsIGxpbmUsIGxpbmVBbmdsZSkge1xyXG4gICAgICAgICAgICB2YXIgc2lkZUxlbmd0aCA9IE1hdGguc3FydChNYXRoLnBvdyhib3hbMV1bMF0gLSBib3hbMF1bMF0sIDIpICsgTWF0aC5wb3coKGJveFsxXVsxXSAtIGJveFswXVsxXSksIDIpKSxcclxuICAgICAgICAgICAgICAgIGksXHJcbiAgICAgICAgICAgICAgICBzbGljZXMgPSAxNixcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG51bGwsXHJcbiAgICAgICAgICAgICAgICBkaXIsXHJcbiAgICAgICAgICAgICAgICBleHRlbnNpb24sXHJcbiAgICAgICAgICAgICAgICB4ZGlyID0gTWF0aC5zaW4obGluZUFuZ2xlKSxcclxuICAgICAgICAgICAgICAgIHlkaXIgPSBNYXRoLmNvcyhsaW5lQW5nbGUpO1xyXG5cclxuICAgICAgICAgICAgZm9yICggaSA9IDE7IGkgPCBzbGljZXMgJiYgcmVzdWx0ID09PSBudWxsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vIG1vdmUgbGluZSBwZXJwZW5kaWN1bGFyIHRvIGFuZ2xlXHJcbiAgICAgICAgICAgICAgICBkaXIgPSBzaWRlTGVuZ3RoIC8gc2xpY2VzICogaSAqIChpICUgMiA9PT0gMCA/IC0xIDogMSk7XHJcbiAgICAgICAgICAgICAgICBleHRlbnNpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeTogZGlyICogeGRpcixcclxuICAgICAgICAgICAgICAgICAgICB4OiBkaXIgKiB5ZGlyXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbGluZVswXS55ICs9IGV4dGVuc2lvbi54O1xyXG4gICAgICAgICAgICAgICAgbGluZVswXS54IC09IGV4dGVuc2lvbi55O1xyXG4gICAgICAgICAgICAgICAgbGluZVsxXS55ICs9IGV4dGVuc2lvbi54O1xyXG4gICAgICAgICAgICAgICAgbGluZVsxXS54IC09IGV4dGVuc2lvbi55O1xyXG5cclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRyeURlY29kZShsaW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0TGluZUxlbmd0aChsaW5lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQoXHJcbiAgICAgICAgICAgICAgICBNYXRoLnBvdyhNYXRoLmFicyhsaW5lWzFdLnkgLSBsaW5lWzBdLnkpLCAyKSArXHJcbiAgICAgICAgICAgICAgICBNYXRoLnBvdyhNYXRoLmFicyhsaW5lWzFdLnggLSBsaW5lWzBdLngpLCAyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBXaXRoIHRoZSBoZWxwIG9mIHRoZSBjb25maWd1cmVkIHJlYWRlcnMgKENvZGUxMjggb3IgRUFOKSB0aGlzIGZ1bmN0aW9uIHRyaWVzIHRvIGRldGVjdCBhXHJcbiAgICAgICAgICogdmFsaWQgYmFyY29kZSBwYXR0ZXJuIHdpdGhpbiB0aGUgZ2l2ZW4gYXJlYS5cclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gYm94IFRoZSBhcmVhIHRvIHNlYXJjaCBpblxyXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSByZXN1bHQge2NvZGVSZXN1bHQsIGxpbmUsIGFuZ2xlLCBwYXR0ZXJuLCB0aHJlc2hvbGR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZGVjb2RlRnJvbUJvdW5kaW5nQm94KGJveCkge1xyXG4gICAgICAgICAgICB2YXIgbGluZSxcclxuICAgICAgICAgICAgICAgIGxpbmVBbmdsZSxcclxuICAgICAgICAgICAgICAgIGN0eCA9IF9jYW52YXMuY3R4Lm92ZXJsYXksXHJcbiAgICAgICAgICAgICAgICByZXN1bHQsXHJcbiAgICAgICAgICAgICAgICBsaW5lTGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5kZWJ1Zy5kcmF3Qm91bmRpbmdCb3ggJiYgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UGF0aChib3gsIHt4OiAwLCB5OiAxfSwgY3R4LCB7Y29sb3I6IFwiYmx1ZVwiLCBsaW5lV2lkdGg6IDJ9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGluZSA9IGdldExpbmUoYm94KTtcclxuICAgICAgICAgICAgbGluZUxlbmd0aCA9IGdldExpbmVMZW5ndGgobGluZSk7XHJcbiAgICAgICAgICAgIGxpbmVBbmdsZSA9IE1hdGguYXRhbjIobGluZVsxXS55IC0gbGluZVswXS55LCBsaW5lWzFdLnggLSBsaW5lWzBdLngpO1xyXG4gICAgICAgICAgICBsaW5lID0gZ2V0RXh0ZW5kZWRMaW5lKGxpbmUsIGxpbmVBbmdsZSwgTWF0aC5mbG9vcihsaW5lTGVuZ3RoICogMC4xKSk7XHJcbiAgICAgICAgICAgIGlmIChsaW5lID09PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXN1bHQgPSB0cnlEZWNvZGUobGluZSk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRyeURlY29kZUJydXRlRm9yY2UoYm94LCBsaW5lLCBsaW5lQW5nbGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiByZXN1bHQgJiYgY29uZmlnLmRlYnVnLmRyYXdTY2FubGluZSAmJiBjdHgpIHtcclxuICAgICAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgobGluZSwge3g6ICd4JywgeTogJ3knfSwgY3R4LCB7Y29sb3I6ICdyZWQnLCBsaW5lV2lkdGg6IDN9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGNvZGVSZXN1bHQ6IHJlc3VsdC5jb2RlUmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgbGluZTogbGluZSxcclxuICAgICAgICAgICAgICAgIGFuZ2xlOiBsaW5lQW5nbGUsXHJcbiAgICAgICAgICAgICAgICBwYXR0ZXJuOiByZXN1bHQuYmFyY29kZUxpbmUubGluZSxcclxuICAgICAgICAgICAgICAgIHRocmVzaG9sZDogcmVzdWx0LmJhcmNvZGVMaW5lLnRocmVzaG9sZFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGVjb2RlRnJvbUJvdW5kaW5nQm94OiBmdW5jdGlvbihib3gpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGVGcm9tQm91bmRpbmdCb3goYm94KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVjb2RlRnJvbUJvdW5kaW5nQm94ZXM6IGZ1bmN0aW9uKGJveGVzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaSwgcmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgICAgIGJhcmNvZGVzID0gW10sXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGUgPSBjb25maWcubXVsdGlwbGU7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCBib3hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJveCA9IGJveGVzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRlY29kZUZyb21Cb3VuZGluZ0JveChib3gpIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ib3ggPSBib3g7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXJjb2Rlcy5wdXNoKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQuY29kZVJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXJjb2Rlc1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldFJlYWRlcnM6IGZ1bmN0aW9uKHJlYWRlcnMpIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5yZWFkZXJzID0gcmVhZGVycztcclxuICAgICAgICAgICAgICAgIF9iYXJjb2RlUmVhZGVycy5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgaW5pdFJlYWRlcnMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2RlY29kZXIvYmFyY29kZV9kZWNvZGVyLmpzXG4gKiovIiwiaW1wb3J0IENWVXRpbHMgZnJvbSAnLi4vY29tbW9uL2N2X3V0aWxzJztcclxuaW1wb3J0IEltYWdlV3JhcHBlciBmcm9tICcuLi9jb21tb24vaW1hZ2Vfd3JhcHBlcic7XHJcblxyXG52YXIgQnJlc2VuaGFtID0ge307XHJcblxyXG52YXIgU2xvcGUgPSB7XHJcbiAgICBESVI6IHtcclxuICAgICAgICBVUDogMSxcclxuICAgICAgICBET1dOOiAtMVxyXG4gICAgfVxyXG59O1xyXG4vKipcclxuICogU2NhbnMgYSBsaW5lIG9mIHRoZSBnaXZlbiBpbWFnZSBmcm9tIHBvaW50IHAxIHRvIHAyIGFuZCByZXR1cm5zIGEgcmVzdWx0IG9iamVjdCBjb250YWluaW5nXHJcbiAqIGdyYXktc2NhbGUgdmFsdWVzICgwLTI1NSkgb2YgdGhlIHVuZGVybHlpbmcgcGl4ZWxzIGluIGFkZGl0aW9uIHRvIHRoZSBtaW5cclxuICogYW5kIG1heCB2YWx1ZXMuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbWFnZVdyYXBwZXJcclxuICogQHBhcmFtIHtPYmplY3R9IHAxIFRoZSBzdGFydCBwb2ludCB7eCx5fVxyXG4gKiBAcGFyYW0ge09iamVjdH0gcDIgVGhlIGVuZCBwb2ludCB7eCx5fVxyXG4gKiBAcmV0dXJucyB7bGluZSwgbWluLCBtYXh9XHJcbiAqL1xyXG5CcmVzZW5oYW0uZ2V0QmFyY29kZUxpbmUgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIHAxLCBwMikge1xyXG4gICAgdmFyIHgwID0gcDEueCB8IDAsXHJcbiAgICAgICAgeTAgPSBwMS55IHwgMCxcclxuICAgICAgICB4MSA9IHAyLnggfCAwLFxyXG4gICAgICAgIHkxID0gcDIueSB8IDAsXHJcbiAgICAgICAgc3RlZXAgPSBNYXRoLmFicyh5MSAtIHkwKSA+IE1hdGguYWJzKHgxIC0geDApLFxyXG4gICAgICAgIGRlbHRheCxcclxuICAgICAgICBkZWx0YXksXHJcbiAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgeXN0ZXAsXHJcbiAgICAgICAgeSxcclxuICAgICAgICB0bXAsXHJcbiAgICAgICAgeCxcclxuICAgICAgICBsaW5lID0gW10sXHJcbiAgICAgICAgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54LFxyXG4gICAgICAgIHN1bSA9IDAsXHJcbiAgICAgICAgdmFsLFxyXG4gICAgICAgIG1pbiA9IDI1NSxcclxuICAgICAgICBtYXggPSAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlYWQoYSwgYikge1xyXG4gICAgICAgIHZhbCA9IGltYWdlRGF0YVtiICogd2lkdGggKyBhXTtcclxuICAgICAgICBzdW0gKz0gdmFsO1xyXG4gICAgICAgIG1pbiA9IHZhbCA8IG1pbiA/IHZhbCA6IG1pbjtcclxuICAgICAgICBtYXggPSB2YWwgPiBtYXggPyB2YWwgOiBtYXg7XHJcbiAgICAgICAgbGluZS5wdXNoKHZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN0ZWVwKSB7XHJcbiAgICAgICAgdG1wID0geDA7XHJcbiAgICAgICAgeDAgPSB5MDtcclxuICAgICAgICB5MCA9IHRtcDtcclxuXHJcbiAgICAgICAgdG1wID0geDE7XHJcbiAgICAgICAgeDEgPSB5MTtcclxuICAgICAgICB5MSA9IHRtcDtcclxuICAgIH1cclxuICAgIGlmICh4MCA+IHgxKSB7XHJcbiAgICAgICAgdG1wID0geDA7XHJcbiAgICAgICAgeDAgPSB4MTtcclxuICAgICAgICB4MSA9IHRtcDtcclxuXHJcbiAgICAgICAgdG1wID0geTA7XHJcbiAgICAgICAgeTAgPSB5MTtcclxuICAgICAgICB5MSA9IHRtcDtcclxuICAgIH1cclxuICAgIGRlbHRheCA9IHgxIC0geDA7XHJcbiAgICBkZWx0YXkgPSBNYXRoLmFicyh5MSAtIHkwKTtcclxuICAgIGVycm9yID0gKGRlbHRheCAvIDIpIHwgMDtcclxuICAgIHkgPSB5MDtcclxuICAgIHlzdGVwID0geTAgPCB5MSA/IDEgOiAtMTtcclxuICAgIGZvciAoIHggPSB4MDsgeCA8IHgxOyB4KyspIHtcclxuICAgICAgICBpZiAoc3RlZXApe1xyXG4gICAgICAgICAgICByZWFkKHksIHgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlYWQoeCwgeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVycm9yID0gZXJyb3IgLSBkZWx0YXk7XHJcbiAgICAgICAgaWYgKGVycm9yIDwgMCkge1xyXG4gICAgICAgICAgICB5ID0geSArIHlzdGVwO1xyXG4gICAgICAgICAgICBlcnJvciA9IGVycm9yICsgZGVsdGF4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxpbmU6IGxpbmUsXHJcbiAgICAgICAgbWluOiBtaW4sXHJcbiAgICAgICAgbWF4OiBtYXhcclxuICAgIH07XHJcbn07XHJcblxyXG5CcmVzZW5oYW0udG9PdHN1QmluYXJ5TGluZSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgdmFyIGxpbmUgPSByZXN1bHQubGluZSxcclxuICAgICAgICBpbWFnZSA9IG5ldyBJbWFnZVdyYXBwZXIoe3g6IGxpbmUubGVuZ3RoIC0gMSwgeTogMX0sIGxpbmUpLFxyXG4gICAgICAgIHRocmVzaG9sZCA9IENWVXRpbHMuZGV0ZXJtaW5lT3RzdVRocmVzaG9sZChpbWFnZSwgNSk7XHJcblxyXG4gICAgbGluZSA9IENWVXRpbHMuc2hhcnBlbkxpbmUobGluZSk7XHJcbiAgICBDVlV0aWxzLnRocmVzaG9sZEltYWdlKGltYWdlLCB0aHJlc2hvbGQpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbGluZTogbGluZSxcclxuICAgICAgICB0aHJlc2hvbGQ6IHRocmVzaG9sZFxyXG4gICAgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGUgcmVzdWx0IGZyb20gZ2V0QmFyY29kZUxpbmUgaW50byBhIGJpbmFyeSByZXByZXNlbnRhdGlvblxyXG4gKiBhbHNvIGNvbnNpZGVyaW5nIHRoZSBmcmVxdWVuY3kgYW5kIHNsb3BlIG9mIHRoZSBzaWduYWwgZm9yIG1vcmUgcm9idXN0IHJlc3VsdHNcclxuICogQHBhcmFtIHtPYmplY3R9IHJlc3VsdCB7bGluZSwgbWluLCBtYXh9XHJcbiAqL1xyXG5CcmVzZW5oYW0udG9CaW5hcnlMaW5lID0gZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICB2YXIgbWluID0gcmVzdWx0Lm1pbixcclxuICAgICAgICBtYXggPSByZXN1bHQubWF4LFxyXG4gICAgICAgIGxpbmUgPSByZXN1bHQubGluZSxcclxuICAgICAgICBzbG9wZSxcclxuICAgICAgICBzbG9wZTIsXHJcbiAgICAgICAgY2VudGVyID0gbWluICsgKG1heCAtIG1pbikgLyAyLFxyXG4gICAgICAgIGV4dHJlbWEgPSBbXSxcclxuICAgICAgICBjdXJyZW50RGlyLFxyXG4gICAgICAgIGRpcixcclxuICAgICAgICB0aHJlc2hvbGQgPSAobWF4IC0gbWluKSAvIDEyLFxyXG4gICAgICAgIHJUaHJlc2hvbGQgPSAtdGhyZXNob2xkLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgajtcclxuXHJcbiAgICAvLyAxLiBmaW5kIGV4dHJlbWFcclxuICAgIGN1cnJlbnREaXIgPSBsaW5lWzBdID4gY2VudGVyID8gU2xvcGUuRElSLlVQIDogU2xvcGUuRElSLkRPV047XHJcbiAgICBleHRyZW1hLnB1c2goe1xyXG4gICAgICAgIHBvczogMCxcclxuICAgICAgICB2YWw6IGxpbmVbMF1cclxuICAgIH0pO1xyXG4gICAgZm9yICggaSA9IDA7IGkgPCBsaW5lLmxlbmd0aCAtIDI7IGkrKykge1xyXG4gICAgICAgIHNsb3BlID0gKGxpbmVbaSArIDFdIC0gbGluZVtpXSk7XHJcbiAgICAgICAgc2xvcGUyID0gKGxpbmVbaSArIDJdIC0gbGluZVtpICsgMV0pO1xyXG4gICAgICAgIGlmICgoc2xvcGUgKyBzbG9wZTIpIDwgclRocmVzaG9sZCAmJiBsaW5lW2kgKyAxXSA8IChjZW50ZXIgKiAxLjUpKSB7XHJcbiAgICAgICAgICAgIGRpciA9IFNsb3BlLkRJUi5ET1dOO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHNsb3BlICsgc2xvcGUyKSA+IHRocmVzaG9sZCAmJiBsaW5lW2kgKyAxXSA+IChjZW50ZXIgKiAwLjUpKSB7XHJcbiAgICAgICAgICAgIGRpciA9IFNsb3BlLkRJUi5VUDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkaXIgPSBjdXJyZW50RGlyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnREaXIgIT09IGRpcikge1xyXG4gICAgICAgICAgICBleHRyZW1hLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgcG9zOiBpLFxyXG4gICAgICAgICAgICAgICAgdmFsOiBsaW5lW2ldXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjdXJyZW50RGlyID0gZGlyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4dHJlbWEucHVzaCh7XHJcbiAgICAgICAgcG9zOiBsaW5lLmxlbmd0aCxcclxuICAgICAgICB2YWw6IGxpbmVbbGluZS5sZW5ndGggLSAxXVxyXG4gICAgfSk7XHJcblxyXG4gICAgZm9yICggaiA9IGV4dHJlbWFbMF0ucG9zOyBqIDwgZXh0cmVtYVsxXS5wb3M7IGorKykge1xyXG4gICAgICAgIGxpbmVbal0gPSBsaW5lW2pdID4gY2VudGVyID8gMCA6IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGV4dHJlbWEgYW5kIGNvbnZlcnQgdG8gYmluYXJ5IGJhc2VkIG9uIGF2ZyBiZXR3ZWVuIG1pbm1heFxyXG4gICAgZm9yICggaSA9IDE7IGkgPCBleHRyZW1hLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgIGlmIChleHRyZW1hW2kgKyAxXS52YWwgPiBleHRyZW1hW2ldLnZhbCkge1xyXG4gICAgICAgICAgICB0aHJlc2hvbGQgPSAoZXh0cmVtYVtpXS52YWwgKyAoKGV4dHJlbWFbaSArIDFdLnZhbCAtIGV4dHJlbWFbaV0udmFsKSAvIDMpICogMikgfCAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocmVzaG9sZCA9IChleHRyZW1hW2kgKyAxXS52YWwgKyAoKGV4dHJlbWFbaV0udmFsIC0gZXh0cmVtYVtpICsgMV0udmFsKSAvIDMpKSB8IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKCBqID0gZXh0cmVtYVtpXS5wb3M7IGogPCBleHRyZW1hW2kgKyAxXS5wb3M7IGorKykge1xyXG4gICAgICAgICAgICBsaW5lW2pdID0gbGluZVtqXSA+IHRocmVzaG9sZCA/IDAgOiAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxpbmU6IGxpbmUsXHJcbiAgICAgICAgdGhyZXNob2xkOiB0aHJlc2hvbGRcclxuICAgIH07XHJcbn07XHJcblxyXG4vKipcclxuICogVXNlZCBmb3IgZGV2ZWxvcG1lbnQgb25seVxyXG4gKi9cclxuQnJlc2VuaGFtLmRlYnVnID0ge1xyXG4gICAgcHJpbnRGcmVxdWVuY3k6IGZ1bmN0aW9uKGxpbmUsIGNhbnZhcykge1xyXG4gICAgICAgIHZhciBpLFxyXG4gICAgICAgICAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGxpbmUubGVuZ3RoO1xyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSAyNTY7XHJcblxyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsdWVcIjtcclxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY3R4Lm1vdmVUbyhpLCAyNTUpO1xyXG4gICAgICAgICAgICBjdHgubGluZVRvKGksIDI1NSAtIGxpbmVbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBwcmludFBhdHRlcm46IGZ1bmN0aW9uKGxpbmUsIGNhbnZhcykge1xyXG4gICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLCBpO1xyXG5cclxuICAgICAgICBjYW52YXMud2lkdGggPSBsaW5lLmxlbmd0aDtcclxuICAgICAgICBjdHguZmlsbENvbG9yID0gXCJibGFja1wiO1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgbGluZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobGluZVtpXSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KGksIDAsIDEsIDEwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCcmVzZW5oYW07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2RlY29kZXIvYnJlc2VuaGFtLmpzXG4gKiovIiwiaW1wb3J0IEJhcmNvZGVSZWFkZXIgZnJvbSAnLi9iYXJjb2RlX3JlYWRlcic7XHJcblxyXG5mdW5jdGlvbiBDb2RlMTI4UmVhZGVyKCkge1xyXG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG52YXIgcHJvcGVydGllcyA9IHtcclxuICAgIENPREVfU0hJRlQ6IHt2YWx1ZTogOTh9LFxyXG4gICAgQ09ERV9DOiB7dmFsdWU6IDk5fSxcclxuICAgIENPREVfQjoge3ZhbHVlOiAxMDB9LFxyXG4gICAgQ09ERV9BOiB7dmFsdWU6IDEwMX0sXHJcbiAgICBTVEFSVF9DT0RFX0E6IHt2YWx1ZTogMTAzfSxcclxuICAgIFNUQVJUX0NPREVfQjoge3ZhbHVlOiAxMDR9LFxyXG4gICAgU1RBUlRfQ09ERV9DOiB7dmFsdWU6IDEwNX0sXHJcbiAgICBTVE9QX0NPREU6IHt2YWx1ZTogMTA2fSxcclxuICAgIE1PRFVMTzoge3ZhbHVlOiAxMX0sXHJcbiAgICBDT0RFX1BBVFRFUk46IHt2YWx1ZTogW1xyXG4gICAgICAgIFsyLCAxLCAyLCAyLCAyLCAyXSxcclxuICAgICAgICBbMiwgMiwgMiwgMSwgMiwgMl0sXHJcbiAgICAgICAgWzIsIDIsIDIsIDIsIDIsIDFdLFxyXG4gICAgICAgIFsxLCAyLCAxLCAyLCAyLCAzXSxcclxuICAgICAgICBbMSwgMiwgMSwgMywgMiwgMl0sXHJcbiAgICAgICAgWzEsIDMsIDEsIDIsIDIsIDJdLFxyXG4gICAgICAgIFsxLCAyLCAyLCAyLCAxLCAzXSxcclxuICAgICAgICBbMSwgMiwgMiwgMywgMSwgMl0sXHJcbiAgICAgICAgWzEsIDMsIDIsIDIsIDEsIDJdLFxyXG4gICAgICAgIFsyLCAyLCAxLCAyLCAxLCAzXSxcclxuICAgICAgICBbMiwgMiwgMSwgMywgMSwgMl0sXHJcbiAgICAgICAgWzIsIDMsIDEsIDIsIDEsIDJdLFxyXG4gICAgICAgIFsxLCAxLCAyLCAyLCAzLCAyXSxcclxuICAgICAgICBbMSwgMiwgMiwgMSwgMywgMl0sXHJcbiAgICAgICAgWzEsIDIsIDIsIDIsIDMsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAzLCAyLCAyLCAyXSxcclxuICAgICAgICBbMSwgMiwgMywgMSwgMiwgMl0sXHJcbiAgICAgICAgWzEsIDIsIDMsIDIsIDIsIDFdLFxyXG4gICAgICAgIFsyLCAyLCAzLCAyLCAxLCAxXSxcclxuICAgICAgICBbMiwgMiwgMSwgMSwgMywgMl0sXHJcbiAgICAgICAgWzIsIDIsIDEsIDIsIDMsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAzLCAyLCAxLCAyXSxcclxuICAgICAgICBbMiwgMiwgMywgMSwgMSwgMl0sXHJcbiAgICAgICAgWzMsIDEsIDIsIDEsIDMsIDFdLFxyXG4gICAgICAgIFszLCAxLCAxLCAyLCAyLCAyXSxcclxuICAgICAgICBbMywgMiwgMSwgMSwgMiwgMl0sXHJcbiAgICAgICAgWzMsIDIsIDEsIDIsIDIsIDFdLFxyXG4gICAgICAgIFszLCAxLCAyLCAyLCAxLCAyXSxcclxuICAgICAgICBbMywgMiwgMiwgMSwgMSwgMl0sXHJcbiAgICAgICAgWzMsIDIsIDIsIDIsIDEsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAyLCAxLCAyLCAzXSxcclxuICAgICAgICBbMiwgMSwgMiwgMywgMiwgMV0sXHJcbiAgICAgICAgWzIsIDMsIDIsIDEsIDIsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAxLCAzLCAyLCAzXSxcclxuICAgICAgICBbMSwgMywgMSwgMSwgMiwgM10sXHJcbiAgICAgICAgWzEsIDMsIDEsIDMsIDIsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAyLCAzLCAxLCAzXSxcclxuICAgICAgICBbMSwgMywgMiwgMSwgMSwgM10sXHJcbiAgICAgICAgWzEsIDMsIDIsIDMsIDEsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAxLCAzLCAxLCAzXSxcclxuICAgICAgICBbMiwgMywgMSwgMSwgMSwgM10sXHJcbiAgICAgICAgWzIsIDMsIDEsIDMsIDEsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAyLCAxLCAzLCAzXSxcclxuICAgICAgICBbMSwgMSwgMiwgMywgMywgMV0sXHJcbiAgICAgICAgWzEsIDMsIDIsIDEsIDMsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAzLCAxLCAyLCAzXSxcclxuICAgICAgICBbMSwgMSwgMywgMywgMiwgMV0sXHJcbiAgICAgICAgWzEsIDMsIDMsIDEsIDIsIDFdLFxyXG4gICAgICAgIFszLCAxLCAzLCAxLCAyLCAxXSxcclxuICAgICAgICBbMiwgMSwgMSwgMywgMywgMV0sXHJcbiAgICAgICAgWzIsIDMsIDEsIDEsIDMsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAzLCAxLCAxLCAzXSxcclxuICAgICAgICBbMiwgMSwgMywgMywgMSwgMV0sXHJcbiAgICAgICAgWzIsIDEsIDMsIDEsIDMsIDFdLFxyXG4gICAgICAgIFszLCAxLCAxLCAxLCAyLCAzXSxcclxuICAgICAgICBbMywgMSwgMSwgMywgMiwgMV0sXHJcbiAgICAgICAgWzMsIDMsIDEsIDEsIDIsIDFdLFxyXG4gICAgICAgIFszLCAxLCAyLCAxLCAxLCAzXSxcclxuICAgICAgICBbMywgMSwgMiwgMywgMSwgMV0sXHJcbiAgICAgICAgWzMsIDMsIDIsIDEsIDEsIDFdLFxyXG4gICAgICAgIFszLCAxLCA0LCAxLCAxLCAxXSxcclxuICAgICAgICBbMiwgMiwgMSwgNCwgMSwgMV0sXHJcbiAgICAgICAgWzQsIDMsIDEsIDEsIDEsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAxLCAyLCAyLCA0XSxcclxuICAgICAgICBbMSwgMSwgMSwgNCwgMiwgMl0sXHJcbiAgICAgICAgWzEsIDIsIDEsIDEsIDIsIDRdLFxyXG4gICAgICAgIFsxLCAyLCAxLCA0LCAyLCAxXSxcclxuICAgICAgICBbMSwgNCwgMSwgMSwgMiwgMl0sXHJcbiAgICAgICAgWzEsIDQsIDEsIDIsIDIsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAyLCAyLCAxLCA0XSxcclxuICAgICAgICBbMSwgMSwgMiwgNCwgMSwgMl0sXHJcbiAgICAgICAgWzEsIDIsIDIsIDEsIDEsIDRdLFxyXG4gICAgICAgIFsxLCAyLCAyLCA0LCAxLCAxXSxcclxuICAgICAgICBbMSwgNCwgMiwgMSwgMSwgMl0sXHJcbiAgICAgICAgWzEsIDQsIDIsIDIsIDEsIDFdLFxyXG4gICAgICAgIFsyLCA0LCAxLCAyLCAxLCAxXSxcclxuICAgICAgICBbMiwgMiwgMSwgMSwgMSwgNF0sXHJcbiAgICAgICAgWzQsIDEsIDMsIDEsIDEsIDFdLFxyXG4gICAgICAgIFsyLCA0LCAxLCAxLCAxLCAyXSxcclxuICAgICAgICBbMSwgMywgNCwgMSwgMSwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDEsIDIsIDQsIDJdLFxyXG4gICAgICAgIFsxLCAyLCAxLCAxLCA0LCAyXSxcclxuICAgICAgICBbMSwgMiwgMSwgMiwgNCwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDQsIDIsIDEsIDJdLFxyXG4gICAgICAgIFsxLCAyLCA0LCAxLCAxLCAyXSxcclxuICAgICAgICBbMSwgMiwgNCwgMiwgMSwgMV0sXHJcbiAgICAgICAgWzQsIDEsIDEsIDIsIDEsIDJdLFxyXG4gICAgICAgIFs0LCAyLCAxLCAxLCAxLCAyXSxcclxuICAgICAgICBbNCwgMiwgMSwgMiwgMSwgMV0sXHJcbiAgICAgICAgWzIsIDEsIDIsIDEsIDQsIDFdLFxyXG4gICAgICAgIFsyLCAxLCA0LCAxLCAyLCAxXSxcclxuICAgICAgICBbNCwgMSwgMiwgMSwgMiwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDEsIDEsIDQsIDNdLFxyXG4gICAgICAgIFsxLCAxLCAxLCAzLCA0LCAxXSxcclxuICAgICAgICBbMSwgMywgMSwgMSwgNCwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDQsIDEsIDEsIDNdLFxyXG4gICAgICAgIFsxLCAxLCA0LCAzLCAxLCAxXSxcclxuICAgICAgICBbNCwgMSwgMSwgMSwgMSwgM10sXHJcbiAgICAgICAgWzQsIDEsIDEsIDMsIDEsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAzLCAxLCA0LCAxXSxcclxuICAgICAgICBbMSwgMSwgNCwgMSwgMywgMV0sXHJcbiAgICAgICAgWzMsIDEsIDEsIDEsIDQsIDFdLFxyXG4gICAgICAgIFs0LCAxLCAxLCAxLCAzLCAxXSxcclxuICAgICAgICBbMiwgMSwgMSwgNCwgMSwgMl0sXHJcbiAgICAgICAgWzIsIDEsIDEsIDIsIDEsIDRdLFxyXG4gICAgICAgIFsyLCAxLCAxLCAyLCAzLCAyXSxcclxuICAgICAgICBbMiwgMywgMywgMSwgMSwgMSwgMl1cclxuICAgIF19LFxyXG4gICAgU0lOR0xFX0NPREVfRVJST1I6IHt2YWx1ZTogMX0sXHJcbiAgICBBVkdfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjV9LFxyXG4gICAgRk9STUFUOiB7dmFsdWU6IFwiY29kZV8xMjhcIiwgd3JpdGVhYmxlOiBmYWxzZX1cclxufTtcclxuXHJcbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XHJcbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29kZTEyOFJlYWRlcjtcclxuXHJcbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlLl9kZWNvZGVDb2RlID0gZnVuY3Rpb24oc3RhcnQpIHtcclxuICAgIHZhciBjb3VudGVyID0gWzAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgb2Zmc2V0ID0gc3RhcnQsXHJcbiAgICAgICAgaXNXaGl0ZSA9ICFzZWxmLl9yb3dbb2Zmc2V0XSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxyXG4gICAgICAgICAgICBlbmQ6IHN0YXJ0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb2RlLFxyXG4gICAgICAgIGVycm9yLFxyXG4gICAgICAgIG5vcm1hbGl6ZWQ7XHJcblxyXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkID0gc2VsZi5fbm9ybWFsaXplKGNvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvZGUgPSAwOyBjb2RlIDwgc2VsZi5DT0RFX1BBVFRFUk4ubGVuZ3RoOyBjb2RlKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4obm9ybWFsaXplZCwgc2VsZi5DT0RFX1BBVFRFUk5bY29kZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBiZXN0TWF0Y2guZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb2RlID0gY29kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XHJcbiAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlLl9maW5kU3RhcnQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBjb3VudGVyID0gWzAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpLFxyXG4gICAgICAgIGlzV2hpdGUgPSBmYWxzZSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IDAsXHJcbiAgICAgICAgICAgIGVuZDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29kZSxcclxuICAgICAgICBlcnJvcixcclxuICAgICAgICBqLFxyXG4gICAgICAgIHN1bSxcclxuICAgICAgICBub3JtYWxpemVkO1xyXG5cclxuICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgc3VtID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgY291bnRlci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBjb3VudGVyW2pdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZCA9IHNlbGYuX25vcm1hbGl6ZShjb3VudGVyKTtcclxuICAgICAgICAgICAgICAgIGlmIChub3JtYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb2RlID0gc2VsZi5TVEFSVF9DT0RFX0E7IGNvZGUgPD0gc2VsZi5TVEFSVF9DT0RFX0M7IGNvZGUrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHNlbGYuX21hdGNoUGF0dGVybihub3JtYWxpemVkLCBzZWxmLkNPREVfUEFUVEVSTltjb2RlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciA8IGJlc3RNYXRjaC5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmNvZGUgPSBjb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJlc3RNYXRjaC5lcnJvciA8IHNlbGYuQVZHX0NPREVfRVJST1IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLnN0YXJ0ID0gaSAtIHN1bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVuZCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltqXSA9IGNvdW50ZXJbaiArIDJdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY291bnRlcls0XSA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyWzVdID0gMDtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MtLTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuQ29kZTEyOFJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIHN0YXJ0SW5mbyA9IHNlbGYuX2ZpbmRTdGFydCgpLFxyXG4gICAgICAgIGNvZGUgPSBudWxsLFxyXG4gICAgICAgIGRvbmUgPSBmYWxzZSxcclxuICAgICAgICByZXN1bHQgPSBbXSxcclxuICAgICAgICBtdWx0aXBsaWVyID0gMCxcclxuICAgICAgICBjaGVja3N1bSA9IDAsXHJcbiAgICAgICAgY29kZXNldCxcclxuICAgICAgICByYXdSZXN1bHQgPSBbXSxcclxuICAgICAgICBkZWNvZGVkQ29kZXMgPSBbXSxcclxuICAgICAgICBzaGlmdE5leHQgPSBmYWxzZSxcclxuICAgICAgICB1bnNoaWZ0LFxyXG4gICAgICAgIHJlbW92ZUxhc3RDaGFyYWN0ZXIgPSB0cnVlO1xyXG5cclxuICAgIGlmIChzdGFydEluZm8gPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvZGUgPSB7XHJcbiAgICAgICAgY29kZTogc3RhcnRJbmZvLmNvZGUsXHJcbiAgICAgICAgc3RhcnQ6IHN0YXJ0SW5mby5zdGFydCxcclxuICAgICAgICBlbmQ6IHN0YXJ0SW5mby5lbmRcclxuICAgIH07XHJcbiAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuICAgIGNoZWNrc3VtID0gY29kZS5jb2RlO1xyXG4gICAgc3dpdGNoIChjb2RlLmNvZGUpIHtcclxuICAgIGNhc2Ugc2VsZi5TVEFSVF9DT0RFX0E6XHJcbiAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9BO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBzZWxmLlNUQVJUX0NPREVfQjpcclxuICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0I7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIHNlbGYuU1RBUlRfQ09ERV9DOlxyXG4gICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQztcclxuICAgICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgd2hpbGUgKCFkb25lKSB7XHJcbiAgICAgICAgdW5zaGlmdCA9IHNoaWZ0TmV4dDtcclxuICAgICAgICBzaGlmdE5leHQgPSBmYWxzZTtcclxuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb2RlLmVuZCk7XHJcbiAgICAgICAgaWYgKGNvZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGNvZGUuY29kZSAhPT0gc2VsZi5TVE9QX0NPREUpIHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUxhc3RDaGFyYWN0ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29kZS5jb2RlICE9PSBzZWxmLlNUT1BfQ09ERSkge1xyXG4gICAgICAgICAgICAgICAgcmF3UmVzdWx0LnB1c2goY29kZS5jb2RlKTtcclxuICAgICAgICAgICAgICAgIG11bHRpcGxpZXIrKztcclxuICAgICAgICAgICAgICAgIGNoZWNrc3VtICs9IG11bHRpcGxpZXIgKiBjb2RlLmNvZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKGNvZGVzZXQpIHtcclxuICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQTpcclxuICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgPCA2NCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoMzIgKyBjb2RlLmNvZGUpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29kZS5jb2RlIDwgOTYpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUuY29kZSAtIDY0KSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgIT09IHNlbGYuU1RPUF9DT0RFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUxhc3RDaGFyYWN0ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjb2RlLmNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9TSElGVDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnROZXh0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9CO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9COlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0M6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLlNUT1BfQ09ERTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9COlxyXG4gICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSA8IDk2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgzMiArIGNvZGUuY29kZSkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29kZS5jb2RlICE9PSBzZWxmLlNUT1BfQ09ERSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVMYXN0Q2hhcmFjdGVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY29kZS5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfU0hJRlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0TmV4dCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9BO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9DOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5TVE9QX0NPREU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQzpcclxuICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgPCAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUgPCAxMCA/IFwiMFwiICsgY29kZS5jb2RlIDogY29kZS5jb2RlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSAhPT0gc2VsZi5TVE9QX0NPREUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTGFzdENoYXJhY3RlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvZGUuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0E6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9CO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuU1RPUF9DT0RFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkb25lID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVuc2hpZnQpIHtcclxuICAgICAgICAgICAgY29kZXNldCA9IGNvZGVzZXQgPT09IHNlbGYuQ09ERV9BID8gc2VsZi5DT0RFX0IgOiBzZWxmLkNPREVfQTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvZGUgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb2RlLmVuZCA9IHNlbGYuX25leHRVbnNldChzZWxmLl9yb3csIGNvZGUuZW5kKTtcclxuICAgIGlmICghc2VsZi5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlKGNvZGUpKXtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja3N1bSAtPSBtdWx0aXBsaWVyICogcmF3UmVzdWx0W3Jhd1Jlc3VsdC5sZW5ndGggLSAxXTtcclxuICAgIGlmIChjaGVja3N1bSAlIDEwMyAhPT0gcmF3UmVzdWx0W3Jhd1Jlc3VsdC5sZW5ndGggLSAxXSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghcmVzdWx0Lmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlbW92ZSBsYXN0IGNvZGUgZnJvbSByZXN1bHQgKGNoZWNrc3VtKVxyXG4gICAgaWYgKHJlbW92ZUxhc3RDaGFyYWN0ZXIpIHtcclxuICAgICAgICByZXN1bHQuc3BsaWNlKHJlc3VsdC5sZW5ndGggLSAxLCAxKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcclxuICAgICAgICBzdGFydDogc3RhcnRJbmZvLnN0YXJ0LFxyXG4gICAgICAgIGVuZDogY29kZS5lbmQsXHJcbiAgICAgICAgY29kZXNldDogY29kZXNldCxcclxuICAgICAgICBzdGFydEluZm86IHN0YXJ0SW5mbyxcclxuICAgICAgICBkZWNvZGVkQ29kZXM6IGRlY29kZWRDb2RlcyxcclxuICAgICAgICBlbmRJbmZvOiBjb2RlXHJcbiAgICB9O1xyXG59O1xyXG5cclxuXHJcbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbihlbmRJbmZvKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kO1xyXG5cclxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IGVuZEluZm8uZW5kICsgKChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpIC8gMik7XHJcbiAgICBpZiAodHJhaWxpbmdXaGl0ZXNwYWNlRW5kIDwgc2VsZi5fcm93Lmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKGVuZEluZm8uZW5kLCB0cmFpbGluZ1doaXRlc3BhY2VFbmQsIDApKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29kZTEyOFJlYWRlcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL2NvZGVfMTI4X3JlYWRlci5qc1xuICoqLyIsImZ1bmN0aW9uIEJhcmNvZGVSZWFkZXIoY29uZmlnKSB7XHJcbiAgICB0aGlzLl9yb3cgPSBbXTtcclxuICAgIHRoaXMuY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9uZXh0VW5zZXQgPSBmdW5jdGlvbihsaW5lLCBzdGFydCkge1xyXG4gICAgdmFyIGk7XHJcblxyXG4gICAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzdGFydCA9IDA7XHJcbiAgICB9XHJcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIWxpbmVbaV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpbmUubGVuZ3RoO1xyXG59O1xyXG5cclxuQmFyY29kZVJlYWRlci5wcm90b3R5cGUuX21hdGNoUGF0dGVybiA9IGZ1bmN0aW9uKGNvdW50ZXIsIGNvZGUpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIGVycm9yID0gMCxcclxuICAgICAgICBzaW5nbGVFcnJvciA9IDAsXHJcbiAgICAgICAgbW9kdWxvID0gdGhpcy5NT0RVTE8sXHJcbiAgICAgICAgbWF4U2luZ2xlRXJyb3IgPSB0aGlzLlNJTkdMRV9DT0RFX0VSUk9SIHx8IDE7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBzaW5nbGVFcnJvciA9IE1hdGguYWJzKGNvZGVbaV0gLSBjb3VudGVyW2ldKTtcclxuICAgICAgICBpZiAoc2luZ2xlRXJyb3IgPiBtYXhTaW5nbGVFcnJvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyLk1BWF9WQUxVRTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXJyb3IgKz0gc2luZ2xlRXJyb3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXJyb3IgLyBtb2R1bG87XHJcbn07XHJcblxyXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbmV4dFNldCA9IGZ1bmN0aW9uKGxpbmUsIG9mZnNldCkge1xyXG4gICAgdmFyIGk7XHJcblxyXG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XHJcbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBsaW5lLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGxpbmVbaV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpbmUubGVuZ3RoO1xyXG59O1xyXG5cclxuQmFyY29kZVJlYWRlci5wcm90b3R5cGUuX25vcm1hbGl6ZSA9IGZ1bmN0aW9uKGNvdW50ZXIsIG1vZHVsbykge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgc3VtID0gMCxcclxuICAgICAgICByYXRpbyxcclxuICAgICAgICBudW1PbmVzID0gMCxcclxuICAgICAgICBub3JtYWxpemVkID0gW10sXHJcbiAgICAgICAgbm9ybSA9IDA7XHJcblxyXG4gICAgaWYgKCFtb2R1bG8pIHtcclxuICAgICAgICBtb2R1bG8gPSBzZWxmLk1PRFVMTztcclxuICAgIH1cclxuICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGNvdW50ZXJbaV0gPT09IDEpIHtcclxuICAgICAgICAgICAgbnVtT25lcysrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN1bSArPSBjb3VudGVyW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJhdGlvID0gc3VtIC8gKG1vZHVsbyAtIG51bU9uZXMpO1xyXG4gICAgaWYgKHJhdGlvID4gMS4wKSB7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbm9ybSA9IGNvdW50ZXJbaV0gPT09IDEgPyBjb3VudGVyW2ldIDogY291bnRlcltpXSAvIHJhdGlvO1xyXG4gICAgICAgICAgICBub3JtYWxpemVkLnB1c2gobm9ybSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByYXRpbyA9IChzdW0gKyBudW1PbmVzKSAvIG1vZHVsbztcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBub3JtID0gY291bnRlcltpXSAvIHJhdGlvO1xyXG4gICAgICAgICAgICBub3JtYWxpemVkLnB1c2gobm9ybSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZWQ7XHJcbn07XHJcblxyXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hUcmFjZSA9IGZ1bmN0aW9uKGNtcENvdW50ZXIsIGVwc2lsb24pIHtcclxuICAgIHZhciBjb3VudGVyID0gW10sXHJcbiAgICAgICAgaSxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3JvdyksXHJcbiAgICAgICAgaXNXaGl0ZSA9ICFzZWxmLl9yb3dbb2Zmc2V0XSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yO1xyXG5cclxuICAgIGlmIChjbXBDb3VudGVyKSB7XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBjbXBDb3VudGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXIucHVzaCgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xyXG4gICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKGNvdW50ZXIsIGNtcENvdW50ZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBlcHNpbG9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5zdGFydCA9IGkgLSBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guY291bnRlciA9IGNvdW50ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY291bnRlci5wdXNoKDApO1xyXG4gICAgICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcclxuICAgICAgICAgICAgICAgIGNvdW50ZXIucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xyXG4gICAgICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIGNtcENvdW50ZXIgd2FzIG5vdCBnaXZlblxyXG4gICAgYmVzdE1hdGNoLnN0YXJ0ID0gb2Zmc2V0O1xyXG4gICAgYmVzdE1hdGNoLmVuZCA9IHNlbGYuX3Jvdy5sZW5ndGggLSAxO1xyXG4gICAgYmVzdE1hdGNoLmNvdW50ZXIgPSBjb3VudGVyO1xyXG4gICAgcmV0dXJuIGJlc3RNYXRjaDtcclxufTtcclxuXHJcbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLmRlY29kZVBhdHRlcm4gPSBmdW5jdGlvbihwYXR0ZXJuKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgcmVzdWx0O1xyXG5cclxuICAgIHNlbGYuX3JvdyA9IHBhdHRlcm47XHJcbiAgICByZXN1bHQgPSBzZWxmLl9kZWNvZGUoKTtcclxuICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHtcclxuICAgICAgICBzZWxmLl9yb3cucmV2ZXJzZSgpO1xyXG4gICAgICAgIHJlc3VsdCA9IHNlbGYuX2RlY29kZSgpO1xyXG4gICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcmVzdWx0LmRpcmVjdGlvbiA9IEJhcmNvZGVSZWFkZXIuRElSRUNUSU9OLlJFVkVSU0U7XHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydCA9IHNlbGYuX3Jvdy5sZW5ndGggLSByZXN1bHQuc3RhcnQ7XHJcbiAgICAgICAgICAgIHJlc3VsdC5lbmQgPSBzZWxmLl9yb3cubGVuZ3RoIC0gcmVzdWx0LmVuZDtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdC5kaXJlY3Rpb24gPSBCYXJjb2RlUmVhZGVyLkRJUkVDVElPTi5GT1JXQVJEO1xyXG4gICAgfVxyXG4gICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgIHJlc3VsdC5mb3JtYXQgPSBzZWxmLkZPUk1BVDtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hSYW5nZSA9IGZ1bmN0aW9uKHN0YXJ0LCBlbmQsIHZhbHVlKSB7XHJcbiAgICB2YXIgaTtcclxuXHJcbiAgICBzdGFydCA9IHN0YXJ0IDwgMCA/IDAgOiBzdGFydDtcclxuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcy5fcm93W2ldICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fZmlsbENvdW50ZXJzID0gZnVuY3Rpb24ob2Zmc2V0LCBlbmQsIGlzV2hpdGUpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGNvdW50ZXJzID0gW107XHJcblxyXG4gICAgaXNXaGl0ZSA9ICh0eXBlb2YgaXNXaGl0ZSAhPT0gJ3VuZGVmaW5lZCcpID8gaXNXaGl0ZSA6IHRydWU7XHJcbiAgICBvZmZzZXQgPSAodHlwZW9mIG9mZnNldCAhPT0gJ3VuZGVmaW5lZCcpID8gb2Zmc2V0IDogc2VsZi5fbmV4dFVuc2V0KHNlbGYuX3Jvdyk7XHJcbiAgICBlbmQgPSBlbmQgfHwgc2VsZi5fcm93Lmxlbmd0aDtcclxuXHJcbiAgICBjb3VudGVyc1tjb3VudGVyUG9zXSA9IDA7XHJcbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBlbmQ7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJzW2NvdW50ZXJQb3NdKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY291bnRlclBvcysrO1xyXG4gICAgICAgICAgICBjb3VudGVyc1tjb3VudGVyUG9zXSA9IDE7XHJcbiAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY291bnRlcnM7XHJcbn07XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQmFyY29kZVJlYWRlci5wcm90b3R5cGUsIFwiRk9STUFUXCIsIHtcclxuICAgIHZhbHVlOiAndW5rbm93bicsXHJcbiAgICB3cml0ZWFibGU6IGZhbHNlXHJcbn0pO1xyXG5cclxuQmFyY29kZVJlYWRlci5ESVJFQ1RJT04gPSB7XHJcbiAgICBGT1JXQVJEOiAxLFxyXG4gICAgUkVWRVJTRTogLTFcclxufTtcclxuXHJcbkJhcmNvZGVSZWFkZXIuRXhjZXB0aW9uID0ge1xyXG4gICAgU3RhcnROb3RGb3VuZEV4Y2VwdGlvbjogXCJTdGFydC1JbmZvIHdhcyBub3QgZm91bmQhXCIsXHJcbiAgICBDb2RlTm90Rm91bmRFeGNlcHRpb246IFwiQ29kZSBjb3VsZCBub3QgYmUgZm91bmQhXCIsXHJcbiAgICBQYXR0ZXJuTm90Rm91bmRFeGNlcHRpb246IFwiUGF0dGVybiBjb3VsZCBub3QgYmUgZm91bmQhXCJcclxufTtcclxuXHJcbkJhcmNvZGVSZWFkZXIuQ09ORklHX0tFWVMgPSB7fTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhcmNvZGVSZWFkZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9iYXJjb2RlX3JlYWRlci5qc1xuICoqLyIsImltcG9ydCBCYXJjb2RlUmVhZGVyIGZyb20gJy4vYmFyY29kZV9yZWFkZXInO1xyXG5cclxuZnVuY3Rpb24gRUFOUmVhZGVyKG9wdHMpIHtcclxuICAgIEJhcmNvZGVSZWFkZXIuY2FsbCh0aGlzLCBvcHRzKTtcclxufVxyXG5cclxudmFyIHByb3BlcnRpZXMgPSB7XHJcbiAgICBDT0RFX0xfU1RBUlQ6IHt2YWx1ZTogMH0sXHJcbiAgICBNT0RVTE86IHt2YWx1ZTogN30sXHJcbiAgICBDT0RFX0dfU1RBUlQ6IHt2YWx1ZTogMTB9LFxyXG4gICAgU1RBUlRfUEFUVEVSTjoge3ZhbHVlOiBbMSAvIDMgKiA3LCAxIC8gMyAqIDcsIDEgLyAzICogN119LFxyXG4gICAgU1RPUF9QQVRURVJOOiB7dmFsdWU6IFsxIC8gMyAqIDcsIDEgLyAzICogNywgMSAvIDMgKiA3XX0sXHJcbiAgICBNSURETEVfUEFUVEVSTjoge3ZhbHVlOiBbMSAvIDUgKiA3LCAxIC8gNSAqIDcsIDEgLyA1ICogNywgMSAvIDUgKiA3LCAxIC8gNSAqIDddfSxcclxuICAgIENPREVfUEFUVEVSTjoge3ZhbHVlOiBbXHJcbiAgICAgICAgWzMsIDIsIDEsIDFdLFxyXG4gICAgICAgIFsyLCAyLCAyLCAxXSxcclxuICAgICAgICBbMiwgMSwgMiwgMl0sXHJcbiAgICAgICAgWzEsIDQsIDEsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAzLCAyXSxcclxuICAgICAgICBbMSwgMiwgMywgMV0sXHJcbiAgICAgICAgWzEsIDEsIDEsIDRdLFxyXG4gICAgICAgIFsxLCAzLCAxLCAyXSxcclxuICAgICAgICBbMSwgMiwgMSwgM10sXHJcbiAgICAgICAgWzMsIDEsIDEsIDJdLFxyXG4gICAgICAgIFsxLCAxLCAyLCAzXSxcclxuICAgICAgICBbMSwgMiwgMiwgMl0sXHJcbiAgICAgICAgWzIsIDIsIDEsIDJdLFxyXG4gICAgICAgIFsxLCAxLCA0LCAxXSxcclxuICAgICAgICBbMiwgMywgMSwgMV0sXHJcbiAgICAgICAgWzEsIDMsIDIsIDFdLFxyXG4gICAgICAgIFs0LCAxLCAxLCAxXSxcclxuICAgICAgICBbMiwgMSwgMywgMV0sXHJcbiAgICAgICAgWzMsIDEsIDIsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAxLCAzXVxyXG4gICAgXX0sXHJcbiAgICBDT0RFX0ZSRVFVRU5DWToge3ZhbHVlOiBbMCwgMTEsIDEzLCAxNCwgMTksIDI1LCAyOCwgMjEsIDIyLCAyNl19LFxyXG4gICAgU0lOR0xFX0NPREVfRVJST1I6IHt2YWx1ZTogMC42N30sXHJcbiAgICBBVkdfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjI3fSxcclxuICAgIEZPUk1BVDoge3ZhbHVlOiBcImVhbl8xM1wiLCB3cml0ZWFibGU6IGZhbHNlfVxyXG59O1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFyY29kZVJlYWRlci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xyXG5FQU5SZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRUFOUmVhZGVyO1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlQ29kZSA9IGZ1bmN0aW9uKHN0YXJ0LCBjb2RlcmFuZ2UpIHtcclxuICAgIHZhciBjb3VudGVyID0gWzAsIDAsIDAsIDBdLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgb2Zmc2V0ID0gc3RhcnQsXHJcbiAgICAgICAgaXNXaGl0ZSA9ICFzZWxmLl9yb3dbb2Zmc2V0XSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxyXG4gICAgICAgICAgICBlbmQ6IHN0YXJ0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb2RlLFxyXG4gICAgICAgIGVycm9yLFxyXG4gICAgICAgIG5vcm1hbGl6ZWQ7XHJcblxyXG4gICAgaWYgKCFjb2RlcmFuZ2UpIHtcclxuICAgICAgICBjb2RlcmFuZ2UgPSBzZWxmLkNPREVfUEFUVEVSTi5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkID0gc2VsZi5fbm9ybWFsaXplKGNvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvZGUgPSAwOyBjb2RlIDwgY29kZXJhbmdlOyBjb2RlKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4obm9ybWFsaXplZCwgc2VsZi5DT0RFX1BBVFRFUk5bY29kZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBiZXN0TWF0Y2guZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb2RlID0gY29kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiZXN0TWF0Y2guZXJyb3IgPiBzZWxmLkFWR19DT0RFX0VSUk9SKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xyXG4gICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5FQU5SZWFkZXIucHJvdG90eXBlLl9maW5kUGF0dGVybiA9IGZ1bmN0aW9uKHBhdHRlcm4sIG9mZnNldCwgaXNXaGl0ZSwgdHJ5SGFyZGVyLCBlcHNpbG9uKSB7XHJcbiAgICB2YXIgY291bnRlciA9IFtdLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgY291bnRlclBvcyA9IDAsXHJcbiAgICAgICAgYmVzdE1hdGNoID0ge1xyXG4gICAgICAgICAgICBlcnJvcjogTnVtYmVyLk1BWF9WQUxVRSxcclxuICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgIHN0YXJ0OiAwLFxyXG4gICAgICAgICAgICBlbmQ6IDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yLFxyXG4gICAgICAgIGosXHJcbiAgICAgICAgc3VtLFxyXG4gICAgICAgIG5vcm1hbGl6ZWQ7XHJcblxyXG4gICAgaWYgKCFvZmZzZXQpIHtcclxuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3Jvdyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzV2hpdGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlzV2hpdGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHJ5SGFyZGVyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0cnlIYXJkZXIgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggZXBzaWxvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZXBzaWxvbiA9IHNlbGYuQVZHX0NPREVfRVJST1I7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCBwYXR0ZXJuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY291bnRlcltpXSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBzdW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBjb3VudGVyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGNvdW50ZXJbal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkID0gc2VsZi5fbm9ybWFsaXplKGNvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHNlbGYuX21hdGNoUGF0dGVybihub3JtYWxpemVkLCBwYXR0ZXJuKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIDwgZXBzaWxvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLnN0YXJ0ID0gaSAtIHN1bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVuZCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRyeUhhcmRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgY291bnRlci5sZW5ndGggLSAyOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcltqXSA9IGNvdW50ZXJbaiArIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXIubGVuZ3RoIC0gMl0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlci5sZW5ndGggLSAxXSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlclBvcy0tO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZmluZFN0YXJ0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgbGVhZGluZ1doaXRlc3BhY2VTdGFydCxcclxuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3JvdyksXHJcbiAgICAgICAgc3RhcnRJbmZvO1xyXG5cclxuICAgIHdoaWxlICghc3RhcnRJbmZvKSB7XHJcbiAgICAgICAgc3RhcnRJbmZvID0gc2VsZi5fZmluZFBhdHRlcm4oc2VsZi5TVEFSVF9QQVRURVJOLCBvZmZzZXQpO1xyXG4gICAgICAgIGlmICghc3RhcnRJbmZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0ID0gc3RhcnRJbmZvLnN0YXJ0IC0gKHN0YXJ0SW5mby5lbmQgLSBzdGFydEluZm8uc3RhcnQpO1xyXG4gICAgICAgIGlmIChsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0ID49IDApIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UobGVhZGluZ1doaXRlc3BhY2VTdGFydCwgc3RhcnRJbmZvLnN0YXJ0LCAwKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXJ0SW5mbztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBvZmZzZXQgPSBzdGFydEluZm8uZW5kO1xyXG4gICAgICAgIHN0YXJ0SW5mbyA9IG51bGw7XHJcbiAgICB9XHJcbn07XHJcblxyXG5FQU5SZWFkZXIucHJvdG90eXBlLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbihlbmRJbmZvKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kO1xyXG5cclxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IGVuZEluZm8uZW5kICsgKGVuZEluZm8uZW5kIC0gZW5kSW5mby5zdGFydCk7XHJcbiAgICBpZiAodHJhaWxpbmdXaGl0ZXNwYWNlRW5kIDwgc2VsZi5fcm93Lmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKGVuZEluZm8uZW5kLCB0cmFpbGluZ1doaXRlc3BhY2VFbmQsIDApKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZmluZEVuZCA9IGZ1bmN0aW9uKG9mZnNldCwgaXNXaGl0ZSkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGVuZEluZm8gPSBzZWxmLl9maW5kUGF0dGVybihzZWxmLlNUT1BfUEFUVEVSTiwgb2Zmc2V0LCBpc1doaXRlLCBmYWxzZSk7XHJcblxyXG4gICAgcmV0dXJuIGVuZEluZm8gIT09IG51bGwgPyBzZWxmLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UoZW5kSW5mbykgOiBudWxsO1xyXG59O1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZS5fY2FsY3VsYXRlRmlyc3REaWdpdCA9IGZ1bmN0aW9uKGNvZGVGcmVxdWVuY3kpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgc2VsZi5DT0RFX0ZSRVFVRU5DWS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChjb2RlRnJlcXVlbmN5ID09PSBzZWxmLkNPREVfRlJFUVVFTkNZW2ldKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlUGF5bG9hZCA9IGZ1bmN0aW9uKGNvZGUsIHJlc3VsdCwgZGVjb2RlZENvZGVzKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBjb2RlRnJlcXVlbmN5ID0gMHgwLFxyXG4gICAgICAgIGZpcnN0RGlnaXQ7XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCA2OyBpKyspIHtcclxuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb2RlLmVuZCk7XHJcbiAgICAgICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29kZS5jb2RlID49IHNlbGYuQ09ERV9HX1NUQVJUKSB7XHJcbiAgICAgICAgICAgIGNvZGUuY29kZSA9IGNvZGUuY29kZSAtIHNlbGYuQ09ERV9HX1NUQVJUO1xyXG4gICAgICAgICAgICBjb2RlRnJlcXVlbmN5IHw9IDEgPDwgKDUgLSBpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb2RlRnJlcXVlbmN5IHw9IDAgPDwgKDUgLSBpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0LnB1c2goY29kZS5jb2RlKTtcclxuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBmaXJzdERpZ2l0ID0gc2VsZi5fY2FsY3VsYXRlRmlyc3REaWdpdChjb2RlRnJlcXVlbmN5KTtcclxuICAgIGlmIChmaXJzdERpZ2l0ID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICByZXN1bHQudW5zaGlmdChmaXJzdERpZ2l0KTtcclxuXHJcbiAgICBjb2RlID0gc2VsZi5fZmluZFBhdHRlcm4oc2VsZi5NSURETEVfUEFUVEVSTiwgY29kZS5lbmQsIHRydWUsIGZhbHNlKTtcclxuICAgIGlmIChjb2RlID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kLCBzZWxmLkNPREVfR19TVEFSVCk7XHJcbiAgICAgICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb2RlO1xyXG59O1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc3RhcnRJbmZvLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGNvZGUsXHJcbiAgICAgICAgcmVzdWx0ID0gW10sXHJcbiAgICAgICAgZGVjb2RlZENvZGVzID0gW107XHJcblxyXG4gICAgc3RhcnRJbmZvID0gc2VsZi5fZmluZFN0YXJ0KCk7XHJcbiAgICBpZiAoIXN0YXJ0SW5mbykge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY29kZSA9IHtcclxuICAgICAgICBjb2RlOiBzdGFydEluZm8uY29kZSxcclxuICAgICAgICBzdGFydDogc3RhcnRJbmZvLnN0YXJ0LFxyXG4gICAgICAgIGVuZDogc3RhcnRJbmZvLmVuZFxyXG4gICAgfTtcclxuICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xyXG4gICAgY29kZSA9IHNlbGYuX2RlY29kZVBheWxvYWQoY29kZSwgcmVzdWx0LCBkZWNvZGVkQ29kZXMpO1xyXG4gICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjb2RlID0gc2VsZi5fZmluZEVuZChjb2RlLmVuZCwgZmFsc2UpO1xyXG4gICAgaWYgKCFjb2RlKXtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuXHJcbiAgICAvLyBDaGVja3N1bVxyXG4gICAgaWYgKCFzZWxmLl9jaGVja3N1bShyZXN1bHQpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcclxuICAgICAgICBzdGFydDogc3RhcnRJbmZvLnN0YXJ0LFxyXG4gICAgICAgIGVuZDogY29kZS5lbmQsXHJcbiAgICAgICAgY29kZXNldDogXCJcIixcclxuICAgICAgICBzdGFydEluZm86IHN0YXJ0SW5mbyxcclxuICAgICAgICBkZWNvZGVkQ29kZXM6IGRlY29kZWRDb2Rlc1xyXG4gICAgfTtcclxufTtcclxuXHJcbkVBTlJlYWRlci5wcm90b3R5cGUuX2NoZWNrc3VtID0gZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICB2YXIgc3VtID0gMCwgaTtcclxuXHJcbiAgICBmb3IgKCBpID0gcmVzdWx0Lmxlbmd0aCAtIDI7IGkgPj0gMDsgaSAtPSAyKSB7XHJcbiAgICAgICAgc3VtICs9IHJlc3VsdFtpXTtcclxuICAgIH1cclxuICAgIHN1bSAqPSAzO1xyXG4gICAgZm9yICggaSA9IHJlc3VsdC5sZW5ndGggLSAxOyBpID49IDA7IGkgLT0gMikge1xyXG4gICAgICAgIHN1bSArPSByZXN1bHRbaV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VtICUgMTAgPT09IDA7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoRUFOUmVhZGVyKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL2Vhbl9yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgQmFyY29kZVJlYWRlciBmcm9tICcuL2JhcmNvZGVfcmVhZGVyJztcclxuaW1wb3J0IEFycmF5SGVscGVyIGZyb20gJy4uL2NvbW1vbi9hcnJheV9oZWxwZXInO1xyXG5cclxuZnVuY3Rpb24gQ29kZTM5UmVhZGVyKCkge1xyXG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG52YXIgcHJvcGVydGllcyA9IHtcclxuICAgIEFMUEhBQkVUSF9TVFJJTkc6IHt2YWx1ZTogXCIwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVotLiAqJC8rJVwifSxcclxuICAgIEFMUEhBQkVUOiB7dmFsdWU6IFs0OCwgNDksIDUwLCA1MSwgNTIsIDUzLCA1NCwgNTUsIDU2LCA1NywgNjUsIDY2LCA2NywgNjgsIDY5LCA3MCwgNzEsIDcyLCA3MywgNzQsIDc1LCA3NiwgNzcsIDc4LFxyXG4gICAgICAgIDc5LCA4MCwgODEsIDgyLCA4MywgODQsIDg1LCA4NiwgODcsIDg4LCA4OSwgOTAsIDQ1LCA0NiwgMzIsIDQyLCAzNiwgNDcsIDQzLCAzN119LFxyXG4gICAgQ0hBUkFDVEVSX0VOQ09ESU5HUzoge3ZhbHVlOiBbMHgwMzQsIDB4MTIxLCAweDA2MSwgMHgxNjAsIDB4MDMxLCAweDEzMCwgMHgwNzAsIDB4MDI1LCAweDEyNCwgMHgwNjQsIDB4MTA5LCAweDA0OSxcclxuICAgICAgICAweDE0OCwgMHgwMTksIDB4MTE4LCAweDA1OCwgMHgwMEQsIDB4MTBDLCAweDA0QywgMHgwMUMsIDB4MTAzLCAweDA0MywgMHgxNDIsIDB4MDEzLCAweDExMiwgMHgwNTIsIDB4MDA3LCAweDEwNixcclxuICAgICAgICAweDA0NiwgMHgwMTYsIDB4MTgxLCAweDBDMSwgMHgxQzAsIDB4MDkxLCAweDE5MCwgMHgwRDAsIDB4MDg1LCAweDE4NCwgMHgwQzQsIDB4MDk0LCAweDBBOCwgMHgwQTIsIDB4MDhBLCAweDAyQVxyXG4gICAgXX0sXHJcbiAgICBBU1RFUklTSzoge3ZhbHVlOiAweDA5NH0sXHJcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJjb2RlXzM5XCIsIHdyaXRlYWJsZTogZmFsc2V9XHJcbn07XHJcblxyXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XHJcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb2RlMzlSZWFkZXI7XHJcblxyXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl90b0NvdW50ZXJzID0gZnVuY3Rpb24oc3RhcnQsIGNvdW50ZXIpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBudW1Db3VudGVycyA9IGNvdW50ZXIubGVuZ3RoLFxyXG4gICAgICAgIGVuZCA9IHNlbGYuX3Jvdy5sZW5ndGgsXHJcbiAgICAgICAgaXNXaGl0ZSA9ICFzZWxmLl9yb3dbc3RhcnRdLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgY291bnRlclBvcyA9IDA7XHJcblxyXG4gICAgQXJyYXlIZWxwZXIuaW5pdChjb3VudGVyLCAwKTtcclxuXHJcbiAgICBmb3IgKCBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb3VudGVyUG9zKys7XHJcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBudW1Db3VudGVycykge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY291bnRlcjtcclxufTtcclxuXHJcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGNvdW50ZXJzID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgIHJlc3VsdCA9IFtdLFxyXG4gICAgICAgIHN0YXJ0ID0gc2VsZi5fZmluZFN0YXJ0KCksXHJcbiAgICAgICAgZGVjb2RlZENoYXIsXHJcbiAgICAgICAgbGFzdFN0YXJ0LFxyXG4gICAgICAgIHBhdHRlcm4sXHJcbiAgICAgICAgbmV4dFN0YXJ0O1xyXG5cclxuICAgIGlmICghc3RhcnQpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIG5leHRTdGFydCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93LCBzdGFydC5lbmQpO1xyXG5cclxuICAgIGRvIHtcclxuICAgICAgICBjb3VudGVycyA9IHNlbGYuX3RvQ291bnRlcnMobmV4dFN0YXJ0LCBjb3VudGVycyk7XHJcbiAgICAgICAgcGF0dGVybiA9IHNlbGYuX3RvUGF0dGVybihjb3VudGVycyk7XHJcbiAgICAgICAgaWYgKHBhdHRlcm4gPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWNvZGVkQ2hhciA9IHNlbGYuX3BhdHRlcm5Ub0NoYXIocGF0dGVybik7XHJcbiAgICAgICAgaWYgKGRlY29kZWRDaGFyIDwgMCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQucHVzaChkZWNvZGVkQ2hhcik7XHJcbiAgICAgICAgbGFzdFN0YXJ0ID0gbmV4dFN0YXJ0O1xyXG4gICAgICAgIG5leHRTdGFydCArPSBBcnJheUhlbHBlci5zdW0oY291bnRlcnMpO1xyXG4gICAgICAgIG5leHRTdGFydCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93LCBuZXh0U3RhcnQpO1xyXG4gICAgfSB3aGlsZSAoZGVjb2RlZENoYXIgIT09ICcqJyk7XHJcbiAgICByZXN1bHQucG9wKCk7XHJcblxyXG4gICAgaWYgKCFyZXN1bHQubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFzZWxmLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UobGFzdFN0YXJ0LCBuZXh0U3RhcnQsIGNvdW50ZXJzKSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogcmVzdWx0LmpvaW4oXCJcIiksXHJcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LnN0YXJ0LFxyXG4gICAgICAgIGVuZDogbmV4dFN0YXJ0LFxyXG4gICAgICAgIHN0YXJ0SW5mbzogc3RhcnQsXHJcbiAgICAgICAgZGVjb2RlZENvZGVzOiByZXN1bHRcclxuICAgIH07XHJcbn07XHJcblxyXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbihsYXN0U3RhcnQsIG5leHRTdGFydCwgY291bnRlcnMpIHtcclxuICAgIHZhciB0cmFpbGluZ1doaXRlc3BhY2VFbmQsXHJcbiAgICAgICAgcGF0dGVyblNpemUgPSBBcnJheUhlbHBlci5zdW0oY291bnRlcnMpO1xyXG5cclxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IG5leHRTdGFydCAtIGxhc3RTdGFydCAtIHBhdHRlcm5TaXplO1xyXG4gICAgaWYgKCh0cmFpbGluZ1doaXRlc3BhY2VFbmQgKiAzKSA+PSBwYXR0ZXJuU2l6ZSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fcGF0dGVyblRvQ2hhciA9IGZ1bmN0aW9uKHBhdHRlcm4pIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoc2VsZi5DSEFSQUNURVJfRU5DT0RJTkdTW2ldID09PSBwYXR0ZXJuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHNlbGYuQUxQSEFCRVRbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAtMTtcclxufTtcclxuXHJcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX2ZpbmROZXh0V2lkdGggPSBmdW5jdGlvbihjb3VudGVycywgY3VycmVudCkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgbWluV2lkdGggPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChjb3VudGVyc1tpXSA8IG1pbldpZHRoICYmIGNvdW50ZXJzW2ldID4gY3VycmVudCkge1xyXG4gICAgICAgICAgICBtaW5XaWR0aCA9IGNvdW50ZXJzW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWluV2lkdGg7XHJcbn07XHJcblxyXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl90b1BhdHRlcm4gPSBmdW5jdGlvbihjb3VudGVycykge1xyXG4gICAgdmFyIG51bUNvdW50ZXJzID0gY291bnRlcnMubGVuZ3RoLFxyXG4gICAgICAgIG1heE5hcnJvd1dpZHRoID0gMCxcclxuICAgICAgICBudW1XaWRlQmFycyA9IG51bUNvdW50ZXJzLFxyXG4gICAgICAgIHdpZGVCYXJXaWR0aCA9IDAsXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgcGF0dGVybixcclxuICAgICAgICBpO1xyXG5cclxuICAgIHdoaWxlIChudW1XaWRlQmFycyA+IDMpIHtcclxuICAgICAgICBtYXhOYXJyb3dXaWR0aCA9IHNlbGYuX2ZpbmROZXh0V2lkdGgoY291bnRlcnMsIG1heE5hcnJvd1dpZHRoKTtcclxuICAgICAgICBudW1XaWRlQmFycyA9IDA7XHJcbiAgICAgICAgcGF0dGVybiA9IDA7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG51bUNvdW50ZXJzOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50ZXJzW2ldID4gbWF4TmFycm93V2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIHBhdHRlcm4gfD0gMSA8PCAobnVtQ291bnRlcnMgLSAxIC0gaSk7XHJcbiAgICAgICAgICAgICAgICBudW1XaWRlQmFycysrO1xyXG4gICAgICAgICAgICAgICAgd2lkZUJhcldpZHRoICs9IGNvdW50ZXJzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobnVtV2lkZUJhcnMgPT09IDMpIHtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG51bUNvdW50ZXJzICYmIG51bVdpZGVCYXJzID4gMDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnRlcnNbaV0gPiBtYXhOYXJyb3dXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG51bVdpZGVCYXJzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChjb3VudGVyc1tpXSAqIDIpID49IHdpZGVCYXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwYXR0ZXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAtMTtcclxufTtcclxuXHJcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX2ZpbmRTdGFydCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KSxcclxuICAgICAgICBwYXR0ZXJuU3RhcnQgPSBvZmZzZXQsXHJcbiAgICAgICAgY291bnRlciA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBpc1doaXRlID0gZmFsc2UsXHJcbiAgICAgICAgaSxcclxuICAgICAgICBqLFxyXG4gICAgICAgIHdoaXRlU3BhY2VNdXN0U3RhcnQ7XHJcblxyXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBmaW5kIHN0YXJ0IHBhdHRlcm5cclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLl90b1BhdHRlcm4oY291bnRlcikgPT09IHNlbGYuQVNURVJJU0spIHtcclxuICAgICAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlTXVzdFN0YXJ0ID0gTWF0aC5mbG9vcihNYXRoLm1heCgwLCBwYXR0ZXJuU3RhcnQgLSAoKGkgLSBwYXR0ZXJuU3RhcnQpIC8gNCkpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5fbWF0Y2hSYW5nZSh3aGl0ZVNwYWNlTXVzdFN0YXJ0LCBwYXR0ZXJuU3RhcnQsIDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogcGF0dGVyblN0YXJ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHBhdHRlcm5TdGFydCArPSBjb3VudGVyWzBdICsgY291bnRlclsxXTtcclxuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgNzsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltqXSA9IGNvdW50ZXJbaiArIDJdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY291bnRlcls3XSA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyWzhdID0gMDtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MtLTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29kZTM5UmVhZGVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvY29kZV8zOV9yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgQ29kZTM5UmVhZGVyIGZyb20gJy4vY29kZV8zOV9yZWFkZXInO1xyXG5cclxuZnVuY3Rpb24gQ29kZTM5VklOUmVhZGVyKCkge1xyXG4gICAgQ29kZTM5UmVhZGVyLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbnZhciBwYXR0ZXJucyA9IHtcclxuICAgIElPUTogL1tJT1FdL2csXHJcbiAgICBBWjA5OiAvW0EtWjAtOV17MTd9L1xyXG59O1xyXG5cclxuQ29kZTM5VklOUmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ29kZTM5UmVhZGVyLnByb3RvdHlwZSk7XHJcbkNvZGUzOVZJTlJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb2RlMzlWSU5SZWFkZXI7XHJcblxyXG4vLyBDcmliYmVkIGZyb206XHJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96eGluZy96eGluZy9ibG9iL21hc3Rlci9jb3JlL3NyYy9tYWluL2phdmEvY29tL2dvb2dsZS96eGluZy9jbGllbnQvcmVzdWx0L1ZJTlJlc3VsdFBhcnNlci5qYXZhXHJcbkNvZGUzOVZJTlJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHJlc3VsdCA9IENvZGUzOVJlYWRlci5wcm90b3R5cGUuX2RlY29kZS5hcHBseSh0aGlzKTtcclxuICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNvZGUgPSByZXN1bHQuY29kZTtcclxuXHJcbiAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKHBhdHRlcm5zLklPUSwgJycpO1xyXG5cclxuICAgIGlmICghY29kZS5tYXRjaChwYXR0ZXJucy5BWjA5KSkge1xyXG4gICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCBBWjA5IHBhdHRlcm4gY29kZTonLCBjb2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLl9jaGVja0NoZWNrc3VtKGNvZGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdWx0LmNvZGUgPSBjb2RlO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbkNvZGUzOVZJTlJlYWRlci5wcm90b3R5cGUuX2NoZWNrQ2hlY2tzdW0gPSBmdW5jdGlvbihjb2RlKSB7XHJcbiAgICAvLyBUT0RPXHJcbiAgICByZXR1cm4gISFjb2RlO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29kZTM5VklOUmVhZGVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvY29kZV8zOV92aW5fcmVhZGVyLmpzXG4gKiovIiwiaW1wb3J0IEJhcmNvZGVSZWFkZXIgZnJvbSAnLi9iYXJjb2RlX3JlYWRlcic7XHJcblxyXG5mdW5jdGlvbiBDb2RhYmFyUmVhZGVyKCkge1xyXG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMpO1xyXG4gICAgdGhpcy5fY291bnRlcnMgPSBbXTtcclxufVxyXG5cclxudmFyIHByb3BlcnRpZXMgPSB7XHJcbiAgICBBTFBIQUJFVEhfU1RSSU5HOiB7dmFsdWU6IFwiMDEyMzQ1Njc4OS0kOi8uK0FCQ0RcIn0sXHJcbiAgICBBTFBIQUJFVDoge3ZhbHVlOiBbNDgsIDQ5LCA1MCwgNTEsIDUyLCA1MywgNTQsIDU1LCA1NiwgNTcsIDQ1LCAzNiwgNTgsIDQ3LCA0NiwgNDMsIDY1LCA2NiwgNjcsIDY4XX0sXHJcbiAgICBDSEFSQUNURVJfRU5DT0RJTkdTOiB7dmFsdWU6IFsweDAwMywgMHgwMDYsIDB4MDA5LCAweDA2MCwgMHgwMTIsIDB4MDQyLCAweDAyMSwgMHgwMjQsIDB4MDMwLCAweDA0OCwgMHgwMGMsIDB4MDE4LFxyXG4gICAgICAgIDB4MDQ1LCAweDA1MSwgMHgwNTQsIDB4MDE1LCAweDAxQSwgMHgwMjksIDB4MDBCLCAweDAwRV19LFxyXG4gICAgU1RBUlRfRU5EOiB7dmFsdWU6IFsweDAxQSwgMHgwMjksIDB4MDBCLCAweDAwRV19LFxyXG4gICAgTUlOX0VOQ09ERURfQ0hBUlM6IHt2YWx1ZTogNH0sXHJcbiAgICBNQVhfQUNDRVBUQUJMRToge3ZhbHVlOiAyLjB9LFxyXG4gICAgUEFERElORzoge3ZhbHVlOiAxLjV9LFxyXG4gICAgRk9STUFUOiB7dmFsdWU6IFwiY29kYWJhclwiLCB3cml0ZWFibGU6IGZhbHNlfVxyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb2RhYmFyUmVhZGVyO1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIHJlc3VsdCA9IFtdLFxyXG4gICAgICAgIHN0YXJ0LFxyXG4gICAgICAgIGRlY29kZWRDaGFyLFxyXG4gICAgICAgIHBhdHRlcm4sXHJcbiAgICAgICAgbmV4dFN0YXJ0LFxyXG4gICAgICAgIGVuZDtcclxuXHJcbiAgICB0aGlzLl9jb3VudGVycyA9IHNlbGYuX2ZpbGxDb3VudGVycygpO1xyXG4gICAgc3RhcnQgPSBzZWxmLl9maW5kU3RhcnQoKTtcclxuICAgIGlmICghc3RhcnQpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIG5leHRTdGFydCA9IHN0YXJ0LnN0YXJ0Q291bnRlcjtcclxuXHJcbiAgICBkbyB7XHJcbiAgICAgICAgcGF0dGVybiA9IHNlbGYuX3RvUGF0dGVybihuZXh0U3RhcnQpO1xyXG4gICAgICAgIGlmIChwYXR0ZXJuIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVjb2RlZENoYXIgPSBzZWxmLl9wYXR0ZXJuVG9DaGFyKHBhdHRlcm4pO1xyXG4gICAgICAgIGlmIChkZWNvZGVkQ2hhciA8IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0LnB1c2goZGVjb2RlZENoYXIpO1xyXG4gICAgICAgIG5leHRTdGFydCArPSA4O1xyXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMSAmJiBzZWxmLl9pc1N0YXJ0RW5kKHBhdHRlcm4pKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0gd2hpbGUgKG5leHRTdGFydCA8IHNlbGYuX2NvdW50ZXJzLmxlbmd0aCk7XHJcblxyXG4gICAgLy8gdmVyaWZ5IGVuZFxyXG4gICAgaWYgKChyZXN1bHQubGVuZ3RoIC0gMikgPCBzZWxmLk1JTl9FTkNPREVEX0NIQVJTIHx8ICFzZWxmLl9pc1N0YXJ0RW5kKHBhdHRlcm4pKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdmVyaWZ5IGVuZCB3aGl0ZSBzcGFjZVxyXG4gICAgaWYgKCFzZWxmLl92ZXJpZnlXaGl0ZXNwYWNlKHN0YXJ0LnN0YXJ0Q291bnRlciwgbmV4dFN0YXJ0IC0gOCkpe1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghc2VsZi5fdmFsaWRhdGVSZXN1bHQocmVzdWx0LCBzdGFydC5zdGFydENvdW50ZXIpKXtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBuZXh0U3RhcnQgPSBuZXh0U3RhcnQgPiBzZWxmLl9jb3VudGVycy5sZW5ndGggPyBzZWxmLl9jb3VudGVycy5sZW5ndGggOiBuZXh0U3RhcnQ7XHJcbiAgICBlbmQgPSBzdGFydC5zdGFydCArIHNlbGYuX3N1bUNvdW50ZXJzKHN0YXJ0LnN0YXJ0Q291bnRlciwgbmV4dFN0YXJ0IC0gOCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcclxuICAgICAgICBzdGFydDogc3RhcnQuc3RhcnQsXHJcbiAgICAgICAgZW5kOiBlbmQsXHJcbiAgICAgICAgc3RhcnRJbmZvOiBzdGFydCxcclxuICAgICAgICBkZWNvZGVkQ29kZXM6IHJlc3VsdFxyXG4gICAgfTtcclxufTtcclxuXHJcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlXaGl0ZXNwYWNlID0gZnVuY3Rpb24oc3RhcnRDb3VudGVyLCBlbmRDb3VudGVyKSB7XHJcbiAgICBpZiAoKHN0YXJ0Q291bnRlciAtIDEgPD0gMClcclxuICAgICAgICAgICAgfHwgdGhpcy5fY291bnRlcnNbc3RhcnRDb3VudGVyIC0gMV0gPj0gKHRoaXMuX2NhbGN1bGF0ZVBhdHRlcm5MZW5ndGgoc3RhcnRDb3VudGVyKSAvIDIuMCkpIHtcclxuICAgICAgICBpZiAoKGVuZENvdW50ZXIgKyA4ID49IHRoaXMuX2NvdW50ZXJzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHx8IHRoaXMuX2NvdW50ZXJzW2VuZENvdW50ZXIgKyA3XSA+PSAodGhpcy5fY2FsY3VsYXRlUGF0dGVybkxlbmd0aChlbmRDb3VudGVyKSAvIDIuMCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2NhbGN1bGF0ZVBhdHRlcm5MZW5ndGggPSBmdW5jdGlvbihvZmZzZXQpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIHN1bSA9IDA7XHJcblxyXG4gICAgZm9yIChpID0gb2Zmc2V0OyBpIDwgb2Zmc2V0ICsgNzsgaSsrKSB7XHJcbiAgICAgICAgc3VtICs9IHRoaXMuX2NvdW50ZXJzW2ldO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdW07XHJcbn07XHJcblxyXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fdGhyZXNob2xkUmVzdWx0UGF0dGVybiA9IGZ1bmN0aW9uKHJlc3VsdCwgc3RhcnRDb3VudGVyKXtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBjYXRlZ29yaXphdGlvbiA9IHtcclxuICAgICAgICAgICAgc3BhY2U6IHtcclxuICAgICAgICAgICAgICAgIG5hcnJvdzogeyBzaXplOiAwLCBjb3VudHM6IDAsIG1pbjogMCwgbWF4OiBOdW1iZXIuTUFYX1ZBTFVFfSxcclxuICAgICAgICAgICAgICAgIHdpZGU6IHtzaXplOiAwLCBjb3VudHM6IDAsIG1pbjogMCwgbWF4OiBOdW1iZXIuTUFYX1ZBTFVFfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBiYXI6IHtcclxuICAgICAgICAgICAgICAgIG5hcnJvdzogeyBzaXplOiAwLCBjb3VudHM6IDAsIG1pbjogMCwgbWF4OiBOdW1iZXIuTUFYX1ZBTFVFfSxcclxuICAgICAgICAgICAgICAgIHdpZGU6IHsgc2l6ZTogMCwgY291bnRzOiAwLCBtaW46IDAsIG1heDogTnVtYmVyLk1BWF9WQUxVRX1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAga2luZCxcclxuICAgICAgICBjYXQsXHJcbiAgICAgICAgaSxcclxuICAgICAgICBqLFxyXG4gICAgICAgIHBvcyA9IHN0YXJ0Q291bnRlcixcclxuICAgICAgICBwYXR0ZXJuO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIHBhdHRlcm4gPSBzZWxmLl9jaGFyVG9QYXR0ZXJuKHJlc3VsdFtpXSk7XHJcbiAgICAgICAgZm9yIChqID0gNjsgaiA+PSAwOyBqLS0pIHtcclxuICAgICAgICAgICAga2luZCA9IChqICYgMSkgPT09IDIgPyBjYXRlZ29yaXphdGlvbi5iYXIgOiBjYXRlZ29yaXphdGlvbi5zcGFjZTtcclxuICAgICAgICAgICAgY2F0ID0gKHBhdHRlcm4gJiAxKSA9PT0gMSA/IGtpbmQud2lkZSA6IGtpbmQubmFycm93O1xyXG4gICAgICAgICAgICBjYXQuc2l6ZSArPSBzZWxmLl9jb3VudGVyc1twb3MgKyBqXTtcclxuICAgICAgICAgICAgY2F0LmNvdW50cysrO1xyXG4gICAgICAgICAgICBwYXR0ZXJuID4+PSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwb3MgKz0gODtcclxuICAgIH1cclxuXHJcbiAgICBbXCJzcGFjZVwiLCBcImJhclwiXS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgIHZhciBuZXdraW5kID0gY2F0ZWdvcml6YXRpb25ba2V5XTtcclxuICAgICAgICBuZXdraW5kLndpZGUubWluID1cclxuICAgICAgICAgICAgTWF0aC5mbG9vcigobmV3a2luZC5uYXJyb3cuc2l6ZSAvIG5ld2tpbmQubmFycm93LmNvdW50cyArIG5ld2tpbmQud2lkZS5zaXplIC8gbmV3a2luZC53aWRlLmNvdW50cykgLyAyKTtcclxuICAgICAgICBuZXdraW5kLm5hcnJvdy5tYXggPSBNYXRoLmNlaWwobmV3a2luZC53aWRlLm1pbik7XHJcbiAgICAgICAgbmV3a2luZC53aWRlLm1heCA9IE1hdGguY2VpbCgobmV3a2luZC53aWRlLnNpemUgKiBzZWxmLk1BWF9BQ0NFUFRBQkxFICsgc2VsZi5QQURESU5HKSAvIG5ld2tpbmQud2lkZS5jb3VudHMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGNhdGVnb3JpemF0aW9uO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2NoYXJUb1BhdHRlcm4gPSBmdW5jdGlvbihjaGFyKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgY2hhckNvZGUgPSBjaGFyLmNoYXJDb2RlQXQoMCksXHJcbiAgICAgICAgaTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgc2VsZi5BTFBIQUJFVC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLkFMUEhBQkVUW2ldID09PSBjaGFyQ29kZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1NbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDB4MDtcclxufTtcclxuXHJcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl92YWxpZGF0ZVJlc3VsdCA9IGZ1bmN0aW9uKHJlc3VsdCwgc3RhcnRDb3VudGVyKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgdGhyZXNob2xkcyA9IHNlbGYuX3RocmVzaG9sZFJlc3VsdFBhdHRlcm4ocmVzdWx0LCBzdGFydENvdW50ZXIpLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgaixcclxuICAgICAgICBraW5kLFxyXG4gICAgICAgIGNhdCxcclxuICAgICAgICBzaXplLFxyXG4gICAgICAgIHBvcyA9IHN0YXJ0Q291bnRlcixcclxuICAgICAgICBwYXR0ZXJuO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwYXR0ZXJuID0gc2VsZi5fY2hhclRvUGF0dGVybihyZXN1bHRbaV0pO1xyXG4gICAgICAgIGZvciAoaiA9IDY7IGogPj0gMDsgai0tKSB7XHJcbiAgICAgICAgICAgIGtpbmQgPSAoaiAmIDEpID09PSAwID8gdGhyZXNob2xkcy5iYXIgOiB0aHJlc2hvbGRzLnNwYWNlO1xyXG4gICAgICAgICAgICBjYXQgPSAocGF0dGVybiAmIDEpID09PSAxID8ga2luZC53aWRlIDoga2luZC5uYXJyb3c7XHJcbiAgICAgICAgICAgIHNpemUgPSBzZWxmLl9jb3VudGVyc1twb3MgKyBqXTtcclxuICAgICAgICAgICAgaWYgKHNpemUgPCBjYXQubWluIHx8IHNpemUgPiBjYXQubWF4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGF0dGVybiA+Pj0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcG9zICs9IDg7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl9wYXR0ZXJuVG9DaGFyID0gZnVuY3Rpb24ocGF0dGVybikge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHNlbGYuQ0hBUkFDVEVSX0VOQ09ESU5HUy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1NbaV0gPT09IHBhdHRlcm4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoc2VsZi5BTFBIQUJFVFtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2NvbXB1dGVBbHRlcm5hdGluZ1RocmVzaG9sZCA9IGZ1bmN0aW9uKG9mZnNldCwgZW5kKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBtaW4gPSBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgIG1heCA9IDAsXHJcbiAgICAgICAgY291bnRlcjtcclxuXHJcbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBlbmQ7IGkgKz0gMil7XHJcbiAgICAgICAgY291bnRlciA9IHRoaXMuX2NvdW50ZXJzW2ldO1xyXG4gICAgICAgIGlmIChjb3VudGVyID4gbWF4KSB7XHJcbiAgICAgICAgICAgIG1heCA9IGNvdW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb3VudGVyIDwgbWluKSB7XHJcbiAgICAgICAgICAgIG1pbiA9IGNvdW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoKG1pbiArIG1heCkgLyAyLjApIHwgMDtcclxufTtcclxuXHJcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl90b1BhdHRlcm4gPSBmdW5jdGlvbihvZmZzZXQpIHtcclxuICAgIHZhciBudW1Db3VudGVycyA9IDcsXHJcbiAgICAgICAgZW5kID0gb2Zmc2V0ICsgbnVtQ291bnRlcnMsXHJcbiAgICAgICAgYmFyVGhyZXNob2xkLFxyXG4gICAgICAgIHNwYWNlVGhyZXNob2xkLFxyXG4gICAgICAgIGJpdG1hc2sgPSAxIDw8IChudW1Db3VudGVycyAtIDEpLFxyXG4gICAgICAgIHBhdHRlcm4gPSAwLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgdGhyZXNob2xkO1xyXG5cclxuICAgIGlmIChlbmQgPiB0aGlzLl9jb3VudGVycy5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgYmFyVGhyZXNob2xkID0gdGhpcy5fY29tcHV0ZUFsdGVybmF0aW5nVGhyZXNob2xkKG9mZnNldCwgZW5kKTtcclxuICAgIHNwYWNlVGhyZXNob2xkID0gdGhpcy5fY29tcHV0ZUFsdGVybmF0aW5nVGhyZXNob2xkKG9mZnNldCArIDEsIGVuZCk7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IG51bUNvdW50ZXJzOyBpKyspe1xyXG4gICAgICAgIHRocmVzaG9sZCA9IChpICYgMSkgPT09IDAgPyBiYXJUaHJlc2hvbGQgOiBzcGFjZVRocmVzaG9sZDtcclxuICAgICAgICBpZiAodGhpcy5fY291bnRlcnNbb2Zmc2V0ICsgaV0gPiB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgcGF0dGVybiB8PSBiaXRtYXNrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBiaXRtYXNrID4+PSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwYXR0ZXJuO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2lzU3RhcnRFbmQgPSBmdW5jdGlvbihwYXR0ZXJuKSB7XHJcbiAgICB2YXIgaTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5TVEFSVF9FTkQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcy5TVEFSVF9FTkRbaV0gPT09IHBhdHRlcm4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX3N1bUNvdW50ZXJzID0gZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc3VtID0gMDtcclxuXHJcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XHJcbiAgICAgICAgc3VtICs9IHRoaXMuX2NvdW50ZXJzW2ldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1bTtcclxufTtcclxuXHJcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl9maW5kU3RhcnQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBpLFxyXG4gICAgICAgIHBhdHRlcm4sXHJcbiAgICAgICAgc3RhcnQgPSBzZWxmLl9uZXh0VW5zZXQoc2VsZi5fcm93KSxcclxuICAgICAgICBlbmQ7XHJcblxyXG4gICAgZm9yIChpID0gMTsgaSA8IHRoaXMuX2NvdW50ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcGF0dGVybiA9IHNlbGYuX3RvUGF0dGVybihpKTtcclxuICAgICAgICBpZiAocGF0dGVybiAhPT0gLTEgJiYgc2VsZi5faXNTdGFydEVuZChwYXR0ZXJuKSkge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBMb29rIGZvciB3aGl0ZXNwYWNlIGFoZWFkXHJcbiAgICAgICAgICAgIHN0YXJ0ICs9IHNlbGYuX3N1bUNvdW50ZXJzKDAsIGkpO1xyXG4gICAgICAgICAgICBlbmQgPSBzdGFydCArIHNlbGYuX3N1bUNvdW50ZXJzKGksIGkgKyA4KTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcclxuICAgICAgICAgICAgICAgIGVuZDogZW5kLFxyXG4gICAgICAgICAgICAgICAgc3RhcnRDb3VudGVyOiBpLFxyXG4gICAgICAgICAgICAgICAgZW5kQ291bnRlcjogaSArIDhcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb2RhYmFyUmVhZGVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvY29kYWJhcl9yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgRUFOUmVhZGVyIGZyb20gJy4vZWFuX3JlYWRlcic7XHJcblxyXG5mdW5jdGlvbiBVUENSZWFkZXIoKSB7XHJcbiAgICBFQU5SZWFkZXIuY2FsbCh0aGlzKTtcclxufVxyXG5cclxudmFyIHByb3BlcnRpZXMgPSB7XHJcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJ1cGNfYVwiLCB3cml0ZWFibGU6IGZhbHNlfVxyXG59O1xyXG5cclxuVVBDUmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRUFOUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XHJcblVQQ1JlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBVUENSZWFkZXI7XHJcblxyXG5VUENSZWFkZXIucHJvdG90eXBlLl9kZWNvZGUgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciByZXN1bHQgPSBFQU5SZWFkZXIucHJvdG90eXBlLl9kZWNvZGUuY2FsbCh0aGlzKTtcclxuXHJcbiAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5jb2RlICYmIHJlc3VsdC5jb2RlLmxlbmd0aCA9PT0gMTMgJiYgcmVzdWx0LmNvZGUuY2hhckF0KDApID09PSBcIjBcIikge1xyXG4gICAgICAgIHJlc3VsdC5jb2RlID0gcmVzdWx0LmNvZGUuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVQQ1JlYWRlcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL3VwY19yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgRUFOUmVhZGVyIGZyb20gJy4vZWFuX3JlYWRlcic7XHJcblxyXG5mdW5jdGlvbiBFQU44UmVhZGVyKCkge1xyXG4gICAgRUFOUmVhZGVyLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbnZhciBwcm9wZXJ0aWVzID0ge1xyXG4gICAgRk9STUFUOiB7dmFsdWU6IFwiZWFuXzhcIiwgd3JpdGVhYmxlOiBmYWxzZX1cclxufTtcclxuXHJcbkVBTjhSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFQU5SZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcclxuRUFOOFJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFQU44UmVhZGVyO1xyXG5cclxuRUFOOFJlYWRlci5wcm90b3R5cGUuX2RlY29kZVBheWxvYWQgPSBmdW5jdGlvbihjb2RlLCByZXN1bHQsIGRlY29kZWRDb2Rlcykge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb2RlLmVuZCwgc2VsZi5DT0RFX0dfU1RBUlQpO1xyXG4gICAgICAgIGlmICghY29kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0LnB1c2goY29kZS5jb2RlKTtcclxuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb2RlID0gc2VsZi5fZmluZFBhdHRlcm4oc2VsZi5NSURETEVfUEFUVEVSTiwgY29kZS5lbmQsIHRydWUsIGZhbHNlKTtcclxuICAgIGlmIChjb2RlID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kLCBzZWxmLkNPREVfR19TVEFSVCk7XHJcbiAgICAgICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb2RlO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRUFOOFJlYWRlcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL2Vhbl84X3JlYWRlci5qc1xuICoqLyIsImltcG9ydCBFQU5SZWFkZXIgZnJvbSAnLi9lYW5fcmVhZGVyJztcclxuXHJcbmZ1bmN0aW9uIFVQQ0VSZWFkZXIoKSB7XHJcbiAgICBFQU5SZWFkZXIuY2FsbCh0aGlzKTtcclxufVxyXG5cclxudmFyIHByb3BlcnRpZXMgPSB7XHJcbiAgICBDT0RFX0ZSRVFVRU5DWToge3ZhbHVlOiBbXHJcbiAgICAgICAgWyA1NiwgNTIsIDUwLCA0OSwgNDQsIDM4LCAzNSwgNDIsIDQxLCAzNyBdLFxyXG4gICAgICAgIFs3LCAxMSwgMTMsIDE0LCAxOSwgMjUsIDI4LCAyMSwgMjIsIDI2XV19LFxyXG4gICAgU1RPUF9QQVRURVJOOiB7IHZhbHVlOiBbMSAvIDYgKiA3LCAxIC8gNiAqIDcsIDEgLyA2ICogNywgMSAvIDYgKiA3LCAxIC8gNiAqIDcsIDEgLyA2ICogN119LFxyXG4gICAgRk9STUFUOiB7dmFsdWU6IFwidXBjX2VcIiwgd3JpdGVhYmxlOiBmYWxzZX1cclxufTtcclxuXHJcblVQQ0VSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFQU5SZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcclxuVVBDRVJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBVUENFUmVhZGVyO1xyXG5cclxuVVBDRVJlYWRlci5wcm90b3R5cGUuX2RlY29kZVBheWxvYWQgPSBmdW5jdGlvbihjb2RlLCByZXN1bHQsIGRlY29kZWRDb2Rlcykge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgY29kZUZyZXF1ZW5jeSA9IDB4MDtcclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kKTtcclxuICAgICAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb2RlLmNvZGUgPj0gc2VsZi5DT0RFX0dfU1RBUlQpIHtcclxuICAgICAgICAgICAgY29kZS5jb2RlID0gY29kZS5jb2RlIC0gc2VsZi5DT0RFX0dfU1RBUlQ7XHJcbiAgICAgICAgICAgIGNvZGVGcmVxdWVuY3kgfD0gMSA8PCAoNSAtIGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUpO1xyXG4gICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFzZWxmLl9kZXRlcm1pbmVQYXJpdHkoY29kZUZyZXF1ZW5jeSwgcmVzdWx0KSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb2RlO1xyXG59O1xyXG5cclxuVVBDRVJlYWRlci5wcm90b3R5cGUuX2RldGVybWluZVBhcml0eSA9IGZ1bmN0aW9uKGNvZGVGcmVxdWVuY3ksIHJlc3VsdCkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgbnJTeXN0ZW07XHJcblxyXG4gICAgZm9yIChuclN5c3RlbSA9IDA7IG5yU3lzdGVtIDwgdGhpcy5DT0RFX0ZSRVFVRU5DWS5sZW5ndGg7IG5yU3lzdGVtKyspe1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgdGhpcy5DT0RFX0ZSRVFVRU5DWVtuclN5c3RlbV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGNvZGVGcmVxdWVuY3kgPT09IHRoaXMuQ09ERV9GUkVRVUVOQ1lbbnJTeXN0ZW1dW2ldKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQudW5zaGlmdChuclN5c3RlbSk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuVVBDRVJlYWRlci5wcm90b3R5cGUuX2NvbnZlcnRUb1VQQ0EgPSBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgIHZhciB1cGNhID0gW3Jlc3VsdFswXV0sXHJcbiAgICAgICAgbGFzdERpZ2l0ID0gcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAyXTtcclxuXHJcbiAgICBpZiAobGFzdERpZ2l0IDw9IDIpIHtcclxuICAgICAgICB1cGNhID0gdXBjYS5jb25jYXQocmVzdWx0LnNsaWNlKDEsIDMpKVxyXG4gICAgICAgICAgICAuY29uY2F0KFtsYXN0RGlnaXQsIDAsIDAsIDAsIDBdKVxyXG4gICAgICAgICAgICAuY29uY2F0KHJlc3VsdC5zbGljZSgzLCA2KSk7XHJcbiAgICB9IGVsc2UgaWYgKGxhc3REaWdpdCA9PT0gMykge1xyXG4gICAgICAgIHVwY2EgPSB1cGNhLmNvbmNhdChyZXN1bHQuc2xpY2UoMSwgNCkpXHJcbiAgICAgICAgICAgIC5jb25jYXQoWzAsIDAsIDAsIDAsIDBdKVxyXG4gICAgICAgICAgICAuY29uY2F0KHJlc3VsdC5zbGljZSg0LCA2KSk7XHJcbiAgICB9IGVsc2UgaWYgKGxhc3REaWdpdCA9PT0gNCkge1xyXG4gICAgICAgIHVwY2EgPSB1cGNhLmNvbmNhdChyZXN1bHQuc2xpY2UoMSwgNSkpXHJcbiAgICAgICAgICAgIC5jb25jYXQoWzAsIDAsIDAsIDAsIDAsIHJlc3VsdFs1XV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB1cGNhID0gdXBjYS5jb25jYXQocmVzdWx0LnNsaWNlKDEsIDYpKVxyXG4gICAgICAgICAgICAuY29uY2F0KFswLCAwLCAwLCAwLCBsYXN0RGlnaXRdKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGNhLnB1c2gocmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXSk7XHJcbiAgICByZXR1cm4gdXBjYTtcclxufTtcclxuXHJcblVQQ0VSZWFkZXIucHJvdG90eXBlLl9jaGVja3N1bSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgcmV0dXJuIEVBTlJlYWRlci5wcm90b3R5cGUuX2NoZWNrc3VtLmNhbGwodGhpcywgdGhpcy5fY29udmVydFRvVVBDQShyZXN1bHQpKTtcclxufTtcclxuXHJcblVQQ0VSZWFkZXIucHJvdG90eXBlLl9maW5kRW5kID0gZnVuY3Rpb24ob2Zmc2V0LCBpc1doaXRlKSB7XHJcbiAgICBpc1doaXRlID0gdHJ1ZTtcclxuICAgIHJldHVybiBFQU5SZWFkZXIucHJvdG90eXBlLl9maW5kRW5kLmNhbGwodGhpcywgb2Zmc2V0LCBpc1doaXRlKTtcclxufTtcclxuXHJcblVQQ0VSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbihlbmRJbmZvKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kO1xyXG5cclxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IGVuZEluZm8uZW5kICsgKChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpIC8gMik7XHJcbiAgICBpZiAodHJhaWxpbmdXaGl0ZXNwYWNlRW5kIDwgc2VsZi5fcm93Lmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKGVuZEluZm8uZW5kLCB0cmFpbGluZ1doaXRlc3BhY2VFbmQsIDApKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVQQ0VSZWFkZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci91cGNfZV9yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgQmFyY29kZVJlYWRlciBmcm9tICcuL2JhcmNvZGVfcmVhZGVyJztcclxuY29uc3QgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L21lcmdlJyk7XHJcblxyXG5mdW5jdGlvbiBJMm9mNVJlYWRlcihvcHRzKSB7XHJcbiAgICBvcHRzID0gbWVyZ2UoZ2V0RGVmYXVsQ29uZmlnKCksIG9wdHMpO1xyXG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMsIG9wdHMpO1xyXG4gICAgdGhpcy5iYXJTcGFjZVJhdGlvID0gWzEsIDFdO1xyXG4gICAgaWYgKG9wdHMubm9ybWFsaXplQmFyU3BhY2VXaWR0aCkge1xyXG4gICAgICAgIHRoaXMuU0lOR0xFX0NPREVfRVJST1IgPSAwLjM4O1xyXG4gICAgICAgIHRoaXMuQVZHX0NPREVfRVJST1IgPSAwLjA5O1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREZWZhdWxDb25maWcoKSB7XHJcbiAgICB2YXIgY29uZmlnID0ge307XHJcblxyXG4gICAgT2JqZWN0LmtleXMoSTJvZjVSZWFkZXIuQ09ORklHX0tFWVMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgY29uZmlnW2tleV0gPSBJMm9mNVJlYWRlci5DT05GSUdfS0VZU1trZXldLmRlZmF1bHQ7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBjb25maWc7XHJcbn1cclxuXHJcbnZhciBOID0gMSxcclxuICAgIFcgPSAzLFxyXG4gICAgcHJvcGVydGllcyA9IHtcclxuICAgICAgICBNT0RVTE86IHt2YWx1ZTogMTB9LFxyXG4gICAgICAgIFNUQVJUX1BBVFRFUk46IHt2YWx1ZTogW04gKiAyLjUsIE4gKiAyLjUsIE4gKiAyLjUsIE4gKiAyLjVdfSxcclxuICAgICAgICBTVE9QX1BBVFRFUk46IHt2YWx1ZTogW04gKiAyLCBOICogMiwgVyAqIDJdfSxcclxuICAgICAgICBDT0RFX1BBVFRFUk46IHt2YWx1ZTogW1xyXG4gICAgICAgICAgICBbTiwgTiwgVywgVywgTl0sXHJcbiAgICAgICAgICAgIFtXLCBOLCBOLCBOLCBXXSxcclxuICAgICAgICAgICAgW04sIFcsIE4sIE4sIFddLFxyXG4gICAgICAgICAgICBbVywgVywgTiwgTiwgTl0sXHJcbiAgICAgICAgICAgIFtOLCBOLCBXLCBOLCBXXSxcclxuICAgICAgICAgICAgW1csIE4sIFcsIE4sIE5dLFxyXG4gICAgICAgICAgICBbTiwgVywgVywgTiwgTl0sXHJcbiAgICAgICAgICAgIFtOLCBOLCBOLCBXLCBXXSxcclxuICAgICAgICAgICAgW1csIE4sIE4sIFcsIE5dLFxyXG4gICAgICAgICAgICBbTiwgVywgTiwgVywgTl1cclxuICAgICAgICBdfSxcclxuICAgICAgICBTSU5HTEVfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjc4LCB3cml0YWJsZTogdHJ1ZX0sXHJcbiAgICAgICAgQVZHX0NPREVfRVJST1I6IHt2YWx1ZTogMC4zOCwgd3JpdGFibGU6IHRydWV9LFxyXG4gICAgICAgIE1BWF9DT1JSRUNUSU9OX0ZBQ1RPUjoge3ZhbHVlOiA1fSxcclxuICAgICAgICBGT1JNQVQ6IHt2YWx1ZTogXCJpMm9mNVwifVxyXG4gICAgfTtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFyY29kZVJlYWRlci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBJMm9mNVJlYWRlcjtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hQYXR0ZXJuID0gZnVuY3Rpb24oY291bnRlciwgY29kZSkge1xyXG4gICAgaWYgKHRoaXMuY29uZmlnLm5vcm1hbGl6ZUJhclNwYWNlV2lkdGgpIHtcclxuICAgICAgICB2YXIgaSxcclxuICAgICAgICAgICAgY291bnRlclN1bSA9IFswLCAwXSxcclxuICAgICAgICAgICAgY29kZVN1bSA9IFswLCAwXSxcclxuICAgICAgICAgICAgY29ycmVjdGlvbiA9IFswLCAwXSxcclxuICAgICAgICAgICAgY29ycmVjdGlvblJhdGlvID0gdGhpcy5NQVhfQ09SUkVDVElPTl9GQUNUT1IsXHJcbiAgICAgICAgICAgIGNvcnJlY3Rpb25SYXRpb0ludmVyc2UgPSAxIC8gY29ycmVjdGlvblJhdGlvO1xyXG5cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb3VudGVyU3VtW2kgJSAyXSArPSBjb3VudGVyW2ldO1xyXG4gICAgICAgICAgICBjb2RlU3VtW2kgJSAyXSArPSBjb2RlW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb3JyZWN0aW9uWzBdID0gY29kZVN1bVswXSAvIGNvdW50ZXJTdW1bMF07XHJcbiAgICAgICAgY29ycmVjdGlvblsxXSA9IGNvZGVTdW1bMV0gLyBjb3VudGVyU3VtWzFdO1xyXG5cclxuICAgICAgICBjb3JyZWN0aW9uWzBdID0gTWF0aC5tYXgoTWF0aC5taW4oY29ycmVjdGlvblswXSwgY29ycmVjdGlvblJhdGlvKSwgY29ycmVjdGlvblJhdGlvSW52ZXJzZSk7XHJcbiAgICAgICAgY29ycmVjdGlvblsxXSA9IE1hdGgubWF4KE1hdGgubWluKGNvcnJlY3Rpb25bMV0sIGNvcnJlY3Rpb25SYXRpbyksIGNvcnJlY3Rpb25SYXRpb0ludmVyc2UpO1xyXG4gICAgICAgIHRoaXMuYmFyU3BhY2VSYXRpbyA9IGNvcnJlY3Rpb247XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY291bnRlcltpXSAqPSB0aGlzLmJhclNwYWNlUmF0aW9baSAlIDJdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBCYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hQYXR0ZXJuLmNhbGwodGhpcywgY291bnRlciwgY29kZSk7XHJcbn07XHJcblxyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2ZpbmRQYXR0ZXJuID0gZnVuY3Rpb24ocGF0dGVybiwgb2Zmc2V0LCBpc1doaXRlLCB0cnlIYXJkZXIpIHtcclxuICAgIHZhciBjb3VudGVyID0gW10sXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgaSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IDAsXHJcbiAgICAgICAgICAgIGVuZDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgaixcclxuICAgICAgICBzdW0sXHJcbiAgICAgICAgbm9ybWFsaXplZCxcclxuICAgICAgICBlcHNpbG9uID0gc2VsZi5BVkdfQ09ERV9FUlJPUjtcclxuXHJcbiAgICBpc1doaXRlID0gaXNXaGl0ZSB8fCBmYWxzZTtcclxuICAgIHRyeUhhcmRlciA9IHRyeUhhcmRlciB8fCBmYWxzZTtcclxuXHJcbiAgICBpZiAoIW9mZnNldCkge1xyXG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IHBhdHRlcm4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb3VudGVyW2ldID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBjb3VudGVyLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHN1bSA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IGNvdW50ZXIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gY291bnRlcltqXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWQgPSBzZWxmLl9ub3JtYWxpemUoY291bnRlcik7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKG5vcm1hbGl6ZWQsIHBhdHRlcm4pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBlcHNpbG9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guc3RhcnQgPSBpIC0gc3VtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZW5kID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJlc3RNYXRjaDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodHJ5SGFyZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGNvdW50ZXIubGVuZ3RoIC0gMjsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbal0gPSBjb3VudGVyW2ogKyAyXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyLmxlbmd0aCAtIDJdID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXIubGVuZ3RoIC0gMV0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MtLTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XHJcbiAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fZmluZFN0YXJ0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgbGVhZGluZ1doaXRlc3BhY2VTdGFydCxcclxuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3JvdyksXHJcbiAgICAgICAgc3RhcnRJbmZvLFxyXG4gICAgICAgIG5hcnJvd0JhcldpZHRoID0gMTtcclxuXHJcbiAgICB3aGlsZSAoIXN0YXJ0SW5mbykge1xyXG4gICAgICAgIHN0YXJ0SW5mbyA9IHNlbGYuX2ZpbmRQYXR0ZXJuKHNlbGYuU1RBUlRfUEFUVEVSTiwgb2Zmc2V0LCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgaWYgKCFzdGFydEluZm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5hcnJvd0JhcldpZHRoID0gTWF0aC5mbG9vcigoc3RhcnRJbmZvLmVuZCAtIHN0YXJ0SW5mby5zdGFydCkgLyA0KTtcclxuICAgICAgICBsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0ID0gc3RhcnRJbmZvLnN0YXJ0IC0gbmFycm93QmFyV2lkdGggKiAxMDtcclxuICAgICAgICBpZiAobGVhZGluZ1doaXRlc3BhY2VTdGFydCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQsIHN0YXJ0SW5mby5zdGFydCwgMCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGFydEluZm87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgb2Zmc2V0ID0gc3RhcnRJbmZvLmVuZDtcclxuICAgICAgICBzdGFydEluZm8gPSBudWxsO1xyXG4gICAgfVxyXG59O1xyXG5cclxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbihlbmRJbmZvKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kO1xyXG5cclxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IGVuZEluZm8uZW5kICsgKChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpIC8gMik7XHJcbiAgICBpZiAodHJhaWxpbmdXaGl0ZXNwYWNlRW5kIDwgc2VsZi5fcm93Lmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKGVuZEluZm8uZW5kLCB0cmFpbGluZ1doaXRlc3BhY2VFbmQsIDApKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9maW5kRW5kID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgZW5kSW5mbyxcclxuICAgICAgICB0bXA7XHJcblxyXG4gICAgc2VsZi5fcm93LnJldmVyc2UoKTtcclxuICAgIGVuZEluZm8gPSBzZWxmLl9maW5kUGF0dGVybihzZWxmLlNUT1BfUEFUVEVSTik7XHJcbiAgICBzZWxmLl9yb3cucmV2ZXJzZSgpO1xyXG5cclxuICAgIGlmIChlbmRJbmZvID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmV2ZXJzZSBudW1iZXJzXHJcbiAgICB0bXAgPSBlbmRJbmZvLnN0YXJ0O1xyXG4gICAgZW5kSW5mby5zdGFydCA9IHNlbGYuX3Jvdy5sZW5ndGggLSBlbmRJbmZvLmVuZDtcclxuICAgIGVuZEluZm8uZW5kID0gc2VsZi5fcm93Lmxlbmd0aCAtIHRtcDtcclxuXHJcbiAgICByZXR1cm4gZW5kSW5mbyAhPT0gbnVsbCA/IHNlbGYuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZShlbmRJbmZvKSA6IG51bGw7XHJcbn07XHJcblxyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2RlY29kZVBhaXIgPSBmdW5jdGlvbihjb3VudGVyUGFpcikge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgY29kZSxcclxuICAgICAgICBjb2RlcyA9IFtdLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVyUGFpci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvdW50ZXJQYWlyW2ldKTtcclxuICAgICAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvZGVzLnB1c2goY29kZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29kZXM7XHJcbn07XHJcblxyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2RlY29kZUNvZGUgPSBmdW5jdGlvbihjb3VudGVyKSB7XHJcbiAgICB2YXIgaixcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBzdW0gPSAwLFxyXG4gICAgICAgIG5vcm1hbGl6ZWQsXHJcbiAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgZXBzaWxvbiA9IHNlbGYuQVZHX0NPREVfRVJST1IsXHJcbiAgICAgICAgY29kZSxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IDAsXHJcbiAgICAgICAgICAgIGVuZDogMFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgZm9yICggaiA9IDA7IGogPCBjb3VudGVyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgc3VtICs9IGNvdW50ZXJbal07XHJcbiAgICB9XHJcbiAgICBub3JtYWxpemVkID0gc2VsZi5fbm9ybWFsaXplKGNvdW50ZXIpO1xyXG4gICAgaWYgKG5vcm1hbGl6ZWQpIHtcclxuICAgICAgICBmb3IgKGNvZGUgPSAwOyBjb2RlIDwgc2VsZi5DT0RFX1BBVFRFUk4ubGVuZ3RoOyBjb2RlKyspIHtcclxuICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4obm9ybWFsaXplZCwgc2VsZi5DT0RFX1BBVFRFUk5bY29kZV0pO1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IgPCBiZXN0TWF0Y2guZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb2RlID0gY29kZTtcclxuICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChiZXN0TWF0Y2guZXJyb3IgPCBlcHNpbG9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2RlY29kZVBheWxvYWQgPSBmdW5jdGlvbihjb3VudGVycywgcmVzdWx0LCBkZWNvZGVkQ29kZXMpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIHBvcyA9IDAsXHJcbiAgICAgICAgY291bnRlckxlbmd0aCA9IGNvdW50ZXJzLmxlbmd0aCxcclxuICAgICAgICBjb3VudGVyUGFpciA9IFtbMCwgMCwgMCwgMCwgMF0sIFswLCAwLCAwLCAwLCAwXV0sXHJcbiAgICAgICAgY29kZXM7XHJcblxyXG4gICAgd2hpbGUgKHBvcyA8IGNvdW50ZXJMZW5ndGgpIHtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJQYWlyWzBdW2ldID0gY291bnRlcnNbcG9zXSAqIHRoaXMuYmFyU3BhY2VSYXRpb1swXTtcclxuICAgICAgICAgICAgY291bnRlclBhaXJbMV1baV0gPSBjb3VudGVyc1twb3MgKyAxXSAqIHRoaXMuYmFyU3BhY2VSYXRpb1sxXTtcclxuICAgICAgICAgICAgcG9zICs9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvZGVzID0gc2VsZi5fZGVjb2RlUGFpcihjb3VudGVyUGFpcik7XHJcbiAgICAgICAgaWYgKCFjb2Rlcykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvZGVzW2ldLmNvZGUgKyBcIlwiKTtcclxuICAgICAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjb2RlcztcclxufTtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fdmVyaWZ5Q291bnRlckxlbmd0aCA9IGZ1bmN0aW9uKGNvdW50ZXJzKSB7XHJcbiAgICByZXR1cm4gKGNvdW50ZXJzLmxlbmd0aCAlIDEwID09PSAwKTtcclxufTtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc3RhcnRJbmZvLFxyXG4gICAgICAgIGVuZEluZm8sXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgY29kZSxcclxuICAgICAgICByZXN1bHQgPSBbXSxcclxuICAgICAgICBkZWNvZGVkQ29kZXMgPSBbXSxcclxuICAgICAgICBjb3VudGVycztcclxuXHJcbiAgICBzdGFydEluZm8gPSBzZWxmLl9maW5kU3RhcnQoKTtcclxuICAgIGlmICghc3RhcnRJbmZvKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBkZWNvZGVkQ29kZXMucHVzaChzdGFydEluZm8pO1xyXG5cclxuICAgIGVuZEluZm8gPSBzZWxmLl9maW5kRW5kKCk7XHJcbiAgICBpZiAoIWVuZEluZm8pIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb3VudGVycyA9IHNlbGYuX2ZpbGxDb3VudGVycyhzdGFydEluZm8uZW5kLCBlbmRJbmZvLnN0YXJ0LCBmYWxzZSk7XHJcbiAgICBpZiAoIXNlbGYuX3ZlcmlmeUNvdW50ZXJMZW5ndGgoY291bnRlcnMpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjb2RlID0gc2VsZi5fZGVjb2RlUGF5bG9hZChjb3VudGVycywgcmVzdWx0LCBkZWNvZGVkQ29kZXMpO1xyXG4gICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCAlIDIgIT09IDAgfHxcclxuICAgICAgICAgICAgcmVzdWx0Lmxlbmd0aCA8IDYpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBkZWNvZGVkQ29kZXMucHVzaChlbmRJbmZvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogcmVzdWx0LmpvaW4oXCJcIiksXHJcbiAgICAgICAgc3RhcnQ6IHN0YXJ0SW5mby5zdGFydCxcclxuICAgICAgICBlbmQ6IGVuZEluZm8uZW5kLFxyXG4gICAgICAgIHN0YXJ0SW5mbzogc3RhcnRJbmZvLFxyXG4gICAgICAgIGRlY29kZWRDb2RlczogZGVjb2RlZENvZGVzXHJcbiAgICB9O1xyXG59O1xyXG5cclxuSTJvZjVSZWFkZXIuQ09ORklHX0tFWVMgPSB7XHJcbiAgICBub3JtYWxpemVCYXJTcGFjZVdpZHRoOiB7XHJcbiAgICAgICAgJ3R5cGUnOiAnYm9vbGVhbicsXHJcbiAgICAgICAgJ2RlZmF1bHQnOiBmYWxzZSxcclxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnSWYgdHJ1ZSwgdGhlIHJlYWRlciB0cmllcyB0byBub3JtYWxpemUgdGhlJyArXHJcbiAgICAgICAgJ3dpZHRoLWRpZmZlcmVuY2UgYmV0d2VlbiBiYXJzIGFuZCBzcGFjZXMnXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJMm9mNVJlYWRlcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL2kyb2Y1X3JlYWRlci5qc1xuICoqLyIsInZhciBiYXNlTWVyZ2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlTWVyZ2UnKSxcbiAgICBjcmVhdGVBc3NpZ25lciA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2NyZWF0ZUFzc2lnbmVyJyk7XG5cbi8qKlxuICogUmVjdXJzaXZlbHkgbWVyZ2VzIG93biBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgdGhlIHNvdXJjZSBvYmplY3QocyksIHRoYXRcbiAqIGRvbid0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAgaW50byB0aGUgZGVzdGluYXRpb24gb2JqZWN0LiBTdWJzZXF1ZW50IHNvdXJjZXNcbiAqIG92ZXJ3cml0ZSBwcm9wZXJ0eSBhc3NpZ25tZW50cyBvZiBwcmV2aW91cyBzb3VyY2VzLiBJZiBgY3VzdG9taXplcmAgaXNcbiAqIHByb3ZpZGVkIGl0J3MgaW52b2tlZCB0byBwcm9kdWNlIHRoZSBtZXJnZWQgdmFsdWVzIG9mIHRoZSBkZXN0aW5hdGlvbiBhbmRcbiAqIHNvdXJjZSBwcm9wZXJ0aWVzLiBJZiBgY3VzdG9taXplcmAgcmV0dXJucyBgdW5kZWZpbmVkYCBtZXJnaW5nIGlzIGhhbmRsZWRcbiAqIGJ5IHRoZSBtZXRob2QgaW5zdGVhZC4gVGhlIGBjdXN0b21pemVyYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWRcbiAqIHdpdGggZml2ZSBhcmd1bWVudHM6IChvYmplY3RWYWx1ZSwgc291cmNlVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmVkIHZhbHVlcy5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY3VzdG9taXplcmAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSB7XG4gKiAgICdkYXRhJzogW3sgJ3VzZXInOiAnYmFybmV5JyB9LCB7ICd1c2VyJzogJ2ZyZWQnIH1dXG4gKiB9O1xuICpcbiAqIHZhciBhZ2VzID0ge1xuICogICAnZGF0YSc6IFt7ICdhZ2UnOiAzNiB9LCB7ICdhZ2UnOiA0MCB9XVxuICogfTtcbiAqXG4gKiBfLm1lcmdlKHVzZXJzLCBhZ2VzKTtcbiAqIC8vID0+IHsgJ2RhdGEnOiBbeyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYgfSwgeyAndXNlcic6ICdmcmVkJywgJ2FnZSc6IDQwIH1dIH1cbiAqXG4gKiAvLyB1c2luZyBhIGN1c3RvbWl6ZXIgY2FsbGJhY2tcbiAqIHZhciBvYmplY3QgPSB7XG4gKiAgICdmcnVpdHMnOiBbJ2FwcGxlJ10sXG4gKiAgICd2ZWdldGFibGVzJzogWydiZWV0J11cbiAqIH07XG4gKlxuICogdmFyIG90aGVyID0ge1xuICogICAnZnJ1aXRzJzogWydiYW5hbmEnXSxcbiAqICAgJ3ZlZ2V0YWJsZXMnOiBbJ2NhcnJvdCddXG4gKiB9O1xuICpcbiAqIF8ubWVyZ2Uob2JqZWN0LCBvdGhlciwgZnVuY3Rpb24oYSwgYikge1xuICogICBpZiAoXy5pc0FycmF5KGEpKSB7XG4gKiAgICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICogICB9XG4gKiB9KTtcbiAqIC8vID0+IHsgJ2ZydWl0cyc6IFsnYXBwbGUnLCAnYmFuYW5hJ10sICd2ZWdldGFibGVzJzogWydiZWV0JywgJ2NhcnJvdCddIH1cbiAqL1xudmFyIG1lcmdlID0gY3JlYXRlQXNzaWduZXIoYmFzZU1lcmdlKTtcblxubW9kdWxlLmV4cG9ydHMgPSBtZXJnZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9vYmplY3QvbWVyZ2UuanNcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFycmF5RWFjaCA9IHJlcXVpcmUoJy4vYXJyYXlFYWNoJyksXG4gICAgYmFzZU1lcmdlRGVlcCA9IHJlcXVpcmUoJy4vYmFzZU1lcmdlRGVlcCcpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNUeXBlZEFycmF5JyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWVyZ2VgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXJndW1lbnQganVnZ2xpbmcsXG4gKiBtdWx0aXBsZSBzb3VyY2VzLCBhbmQgYHRoaXNgIGJpbmRpbmcgYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdlZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBPVtdXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQj1bXV0gQXNzb2NpYXRlcyB2YWx1ZXMgd2l0aCBzb3VyY2UgY291bnRlcnBhcnRzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlKG9iamVjdCwgc291cmNlLCBjdXN0b21pemVyLCBzdGFja0EsIHN0YWNrQikge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIHZhciBpc1NyY0FyciA9IGlzQXJyYXlMaWtlKHNvdXJjZSkgJiYgKGlzQXJyYXkoc291cmNlKSB8fCBpc1R5cGVkQXJyYXkoc291cmNlKSksXG4gICAgICBwcm9wcyA9IGlzU3JjQXJyID8gdW5kZWZpbmVkIDoga2V5cyhzb3VyY2UpO1xuXG4gIGFycmF5RWFjaChwcm9wcyB8fCBzb3VyY2UsIGZ1bmN0aW9uKHNyY1ZhbHVlLCBrZXkpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGtleSA9IHNyY1ZhbHVlO1xuICAgICAgc3JjVmFsdWUgPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0TGlrZShzcmNWYWx1ZSkpIHtcbiAgICAgIHN0YWNrQSB8fCAoc3RhY2tBID0gW10pO1xuICAgICAgc3RhY2tCIHx8IChzdGFja0IgPSBbXSk7XG4gICAgICBiYXNlTWVyZ2VEZWVwKG9iamVjdCwgc291cmNlLCBrZXksIGJhc2VNZXJnZSwgY3VzdG9taXplciwgc3RhY2tBLCBzdGFja0IpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciB2YWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKHZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgaXNDb21tb24gPSByZXN1bHQgPT09IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKGlzQ29tbW9uKSB7XG4gICAgICAgIHJlc3VsdCA9IHNyY1ZhbHVlO1xuICAgICAgfVxuICAgICAgaWYgKChyZXN1bHQgIT09IHVuZGVmaW5lZCB8fCAoaXNTcmNBcnIgJiYgIShrZXkgaW4gb2JqZWN0KSkpICYmXG4gICAgICAgICAgKGlzQ29tbW9uIHx8IChyZXN1bHQgPT09IHJlc3VsdCA/IChyZXN1bHQgIT09IHZhbHVlKSA6ICh2YWx1ZSA9PT0gdmFsdWUpKSkpIHtcbiAgICAgICAgb2JqZWN0W2tleV0gPSByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlTWVyZ2U7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZU1lcmdlLmpzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZvckVhY2hgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUVhY2g7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvYXJyYXlFYWNoLmpzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhcnJheUNvcHkgPSByZXF1aXJlKCcuL2FycmF5Q29weScpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc1BsYWluT2JqZWN0JyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc1R5cGVkQXJyYXknKSxcbiAgICB0b1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy90b1BsYWluT2JqZWN0Jyk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlTWVyZ2VgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgbWVyZ2VzIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIG1lcmdlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gbWVyZ2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXJnZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1lcmdlIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdlZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBPVtdXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQj1bXV0gQXNzb2NpYXRlcyB2YWx1ZXMgd2l0aCBzb3VyY2UgY291bnRlcnBhcnRzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgbWVyZ2VGdW5jLCBjdXN0b21pemVyLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgbGVuZ3RoID0gc3RhY2tBLmxlbmd0aCxcbiAgICAgIHNyY1ZhbHVlID0gc291cmNlW2tleV07XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKHN0YWNrQVtsZW5ndGhdID09IHNyY1ZhbHVlKSB7XG4gICAgICBvYmplY3Rba2V5XSA9IHN0YWNrQltsZW5ndGhdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKHZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkgOiB1bmRlZmluZWQsXG4gICAgICBpc0NvbW1vbiA9IHJlc3VsdCA9PT0gdW5kZWZpbmVkO1xuXG4gIGlmIChpc0NvbW1vbikge1xuICAgIHJlc3VsdCA9IHNyY1ZhbHVlO1xuICAgIGlmIChpc0FycmF5TGlrZShzcmNWYWx1ZSkgJiYgKGlzQXJyYXkoc3JjVmFsdWUpIHx8IGlzVHlwZWRBcnJheShzcmNWYWx1ZSkpKSB7XG4gICAgICByZXN1bHQgPSBpc0FycmF5KHZhbHVlKVxuICAgICAgICA/IHZhbHVlXG4gICAgICAgIDogKGlzQXJyYXlMaWtlKHZhbHVlKSA/IGFycmF5Q29weSh2YWx1ZSkgOiBbXSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3Qoc3JjVmFsdWUpIHx8IGlzQXJndW1lbnRzKHNyY1ZhbHVlKSkge1xuICAgICAgcmVzdWx0ID0gaXNBcmd1bWVudHModmFsdWUpXG4gICAgICAgID8gdG9QbGFpbk9iamVjdCh2YWx1ZSlcbiAgICAgICAgOiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkgPyB2YWx1ZSA6IHt9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICAvLyBBZGQgdGhlIHNvdXJjZSB2YWx1ZSB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMgYW5kIGFzc29jaWF0ZVxuICAvLyBpdCB3aXRoIGl0cyBtZXJnZWQgdmFsdWUuXG4gIHN0YWNrQS5wdXNoKHNyY1ZhbHVlKTtcbiAgc3RhY2tCLnB1c2gocmVzdWx0KTtcblxuICBpZiAoaXNDb21tb24pIHtcbiAgICAvLyBSZWN1cnNpdmVseSBtZXJnZSBvYmplY3RzIGFuZCBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBvYmplY3Rba2V5XSA9IG1lcmdlRnVuYyhyZXN1bHQsIHNyY1ZhbHVlLCBjdXN0b21pemVyLCBzdGFja0EsIHN0YWNrQik7XG4gIH0gZWxzZSBpZiAocmVzdWx0ID09PSByZXN1bHQgPyAocmVzdWx0ICE9PSB2YWx1ZSkgOiAodmFsdWUgPT09IHZhbHVlKSkge1xuICAgIG9iamVjdFtrZXldID0gcmVzdWx0O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZU1lcmdlRGVlcDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlTWVyZ2VEZWVwLmpzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlDb3B5KHNvdXJjZSwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xuXG4gIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5Q29weTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9hcnJheUNvcHkuanNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNBcnJheUxpa2UnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSkgJiZcbiAgICBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiYgIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FyZ3VtZW50cztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL2lzQXJndW1lbnRzLmpzXG4gKiogbW9kdWxlIGlkID0gMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnZXRMZW5ndGggPSByZXF1aXJlKCcuL2dldExlbmd0aCcpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aChnZXRMZW5ndGgodmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5TGlrZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9pc0FycmF5TGlrZS5qc1xuICoqIG1vZHVsZSBpZCA9IDMyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYmFzZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9iYXNlUHJvcGVydHknKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBcImxlbmd0aFwiIHByb3BlcnR5IHZhbHVlIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXZvaWQgYSBbSklUIGJ1Z10oaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE0Mjc5MilcbiAqIHRoYXQgYWZmZWN0cyBTYWZhcmkgb24gYXQgbGVhc3QgaU9TIDguMS04LjMgQVJNNjQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBcImxlbmd0aFwiIHZhbHVlLlxuICovXG52YXIgZ2V0TGVuZ3RoID0gYmFzZVByb3BlcnR5KCdsZW5ndGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRMZW5ndGg7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvZ2V0TGVuZ3RoLmpzXG4gKiogbW9kdWxlIGlkID0gMzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVByb3BlcnR5O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2Jhc2VQcm9wZXJ0eS5qc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTGVuZ3RoO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2lzTGVuZ3RoLmpzXG4gKiogbW9kdWxlIGlkID0gMzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNPYmplY3RMaWtlLmpzXG4gKiogbW9kdWxlIGlkID0gMzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9nZXROYXRpdmUnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQXJyYXkgPSBnZXROYXRpdmUoQXJyYXksICdpc0FycmF5Jyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBuYXRpdmVJc0FycmF5IHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJyYXlUYWc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvbGFuZy9pc0FycmF5LmpzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc05hdGl2ZSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNOYXRpdmUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIHJldHVybiBpc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXROYXRpdmU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvZ2V0TmF0aXZlLmpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpID4gNSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZm5Ub1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZywgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIHJldHVybiByZUlzTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVJc0hvc3RDdG9yLnRlc3QodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTmF0aXZlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2xhbmcvaXNOYXRpdmUuanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaSB3aGljaCByZXR1cm4gJ2Z1bmN0aW9uJyBmb3IgcmVnZXhlc1xuICAvLyBhbmQgU2FmYXJpIDggd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgY29uc3RydWN0b3JzLlxuICByZXR1cm4gaXNPYmplY3QodmFsdWUpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL2lzRnVuY3Rpb24uanNcbiAqKiBtb2R1bGUgaWQgPSA0MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL2lzT2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiYXNlRm9ySW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlRm9ySW4nKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGFzc3VtZXMgb2JqZWN0cyBjcmVhdGVkIGJ5IHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3RvclxuICogaGF2ZSBubyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHZhciBDdG9yO1xuXG4gIC8vIEV4aXQgZWFybHkgZm9yIG5vbiBgT2JqZWN0YCBvYmplY3RzLlxuICBpZiAoIShpc09iamVjdExpa2UodmFsdWUpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IG9iamVjdFRhZyAmJiAhaXNBcmd1bWVudHModmFsdWUpKSB8fFxuICAgICAgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY29uc3RydWN0b3InKSAmJiAoQ3RvciA9IHZhbHVlLmNvbnN0cnVjdG9yLCB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmICEoQ3RvciBpbnN0YW5jZW9mIEN0b3IpKSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gSUUgPCA5IGl0ZXJhdGVzIGluaGVyaXRlZCBwcm9wZXJ0aWVzIGJlZm9yZSBvd24gcHJvcGVydGllcy4gSWYgdGhlIGZpcnN0XG4gIC8vIGl0ZXJhdGVkIHByb3BlcnR5IGlzIGFuIG9iamVjdCdzIG93biBwcm9wZXJ0eSB0aGVuIHRoZXJlIGFyZSBubyBpbmhlcml0ZWRcbiAgLy8gZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICB2YXIgcmVzdWx0O1xuICAvLyBJbiBtb3N0IGVudmlyb25tZW50cyBhbiBvYmplY3QncyBvd24gcHJvcGVydGllcyBhcmUgaXRlcmF0ZWQgYmVmb3JlXG4gIC8vIGl0cyBpbmhlcml0ZWQgcHJvcGVydGllcy4gSWYgdGhlIGxhc3QgaXRlcmF0ZWQgcHJvcGVydHkgaXMgYW4gb2JqZWN0J3NcbiAgLy8gb3duIHByb3BlcnR5IHRoZW4gdGhlcmUgYXJlIG5vIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gIGJhc2VGb3JJbih2YWx1ZSwgZnVuY3Rpb24oc3ViVmFsdWUsIGtleSkge1xuICAgIHJlc3VsdCA9IGtleTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQgPT09IHVuZGVmaW5lZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCByZXN1bHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUGxhaW5PYmplY3Q7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvbGFuZy9pc1BsYWluT2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiYXNlRm9yID0gcmVxdWlyZSgnLi9iYXNlRm9yJyksXG4gICAga2V5c0luID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXNJbicpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvckluYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9ySW4ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gYmFzZUZvcihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzSW4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGb3JJbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlRm9ySW4uanNcbiAqKiBtb2R1bGUgaWQgPSA0M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGNyZWF0ZUJhc2VGb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUJhc2VGb3InKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvckluYCBhbmQgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzXG4gKiBvdmVyIGBvYmplY3RgIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBpbnZva2luZyBgaXRlcmF0ZWVgIGZvclxuICogZWFjaCBwcm9wZXJ0eS4gSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5XG4gKiByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xudmFyIGJhc2VGb3IgPSBjcmVhdGVCYXNlRm9yKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZvcjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlRm9yLmpzXG4gKiogbW9kdWxlIGlkID0gNDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vdG9PYmplY3QnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgYmFzZSBmdW5jdGlvbiBmb3IgYF8uZm9ySW5gIG9yIGBfLmZvckluUmlnaHRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VGb3IoZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICAgIHZhciBpdGVyYWJsZSA9IHRvT2JqZWN0KG9iamVjdCksXG4gICAgICAgIHByb3BzID0ga2V5c0Z1bmMob2JqZWN0KSxcbiAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgICBpbmRleCA9IGZyb21SaWdodCA/IGxlbmd0aCA6IC0xO1xuXG4gICAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVba2V5XSwga2V5LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUJhc2VGb3I7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvY3JlYXRlQmFzZUZvci5qc1xuICoqIG1vZHVsZSBpZCA9IDQ1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhbiBvYmplY3QgaWYgaXQncyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgb2JqZWN0LlxuICovXG5mdW5jdGlvbiB0b09iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3QodmFsdWUpID8gdmFsdWUgOiBPYmplY3QodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvT2JqZWN0O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL3RvT2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzSW5kZXgnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICB9XG4gIHZhciBsZW5ndGggPSBvYmplY3QubGVuZ3RoO1xuICBsZW5ndGggPSAobGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpICYmIGxlbmd0aCkgfHwgMDtcblxuICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBpc1Byb3RvID0gdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0LFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKSxcbiAgICAgIHNraXBJbmRleGVzID0gbGVuZ3RoID4gMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSAoaW5kZXggKyAnJyk7XG4gIH1cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKHNraXBJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSAmJlxuICAgICAgICAhKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXNJbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9vYmplY3Qva2V5c0luLmpzXG4gKiogbW9kdWxlIGlkID0gNDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eXFxkKyQvO1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIHZhbHVlID0gKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgPyArdmFsdWUgOiAtMTtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0luZGV4O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2lzSW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA0OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPSB0eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPSB0eXBlZEFycmF5VGFnc1ttYXBUYWddID1cbnR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID1cbnR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzZXRUYWddID1cbnR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPSB0eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW29ialRvU3RyaW5nLmNhbGwodmFsdWUpXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1R5cGVkQXJyYXk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvbGFuZy9pc1R5cGVkQXJyYXkuanNcbiAqKiBtb2R1bGUgaWQgPSA0OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGJhc2VDb3B5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUNvcHknKSxcbiAgICBrZXlzSW4gPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5c0luJyk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHBsYWluIG9iamVjdCBmbGF0dGVuaW5nIGluaGVyaXRlZCBlbnVtZXJhYmxlXG4gKiBwcm9wZXJ0aWVzIG9mIGB2YWx1ZWAgdG8gb3duIHByb3BlcnRpZXMgb2YgdGhlIHBsYWluIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgcGxhaW4gb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBuZXcgRm9vKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIgfVxuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIF8udG9QbGFpbk9iamVjdChuZXcgRm9vKSk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyLCAnYyc6IDMgfVxuICovXG5mdW5jdGlvbiB0b1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBiYXNlQ29weSh2YWx1ZSwga2V5c0luKHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9QbGFpbk9iamVjdDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL3RvUGxhaW5PYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA1MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3BpZXMgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IG5hbWVzIHRvIGNvcHkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlQ29weShzb3VyY2UsIHByb3BzLCBvYmplY3QpIHtcbiAgb2JqZWN0IHx8IChvYmplY3QgPSB7fSk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIG9iamVjdFtrZXldID0gc291cmNlW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ29weTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlQ29weS5qc1xuICoqIG1vZHVsZSBpZCA9IDUxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvZ2V0TmF0aXZlJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0FycmF5TGlrZScpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpLFxuICAgIHNoaW1LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvc2hpbUtleXMnKTtcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2tleXMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xudmFyIGtleXMgPSAhbmF0aXZlS2V5cyA/IHNoaW1LZXlzIDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIHZhciBDdG9yID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3QuY29uc3RydWN0b3I7XG4gIGlmICgodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0KSB8fFxuICAgICAgKHR5cGVvZiBvYmplY3QgIT0gJ2Z1bmN0aW9uJyAmJiBpc0FycmF5TGlrZShvYmplY3QpKSkge1xuICAgIHJldHVybiBzaGltS2V5cyhvYmplY3QpO1xuICB9XG4gIHJldHVybiBpc09iamVjdChvYmplY3QpID8gbmF0aXZlS2V5cyhvYmplY3QpIDogW107XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvb2JqZWN0L2tleXMuanNcbiAqKiBtb2R1bGUgaWQgPSA1MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9pc0luZGV4JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAga2V5c0luID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXNJbicpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBIGZhbGxiYWNrIGltcGxlbWVudGF0aW9uIG9mIGBPYmplY3Qua2V5c2Agd2hpY2ggY3JlYXRlcyBhbiBhcnJheSBvZiB0aGVcbiAqIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBzaGltS2V5cyhvYmplY3QpIHtcbiAgdmFyIHByb3BzID0ga2V5c0luKG9iamVjdCksXG4gICAgICBwcm9wc0xlbmd0aCA9IHByb3BzLmxlbmd0aCxcbiAgICAgIGxlbmd0aCA9IHByb3BzTGVuZ3RoICYmIG9iamVjdC5sZW5ndGg7XG5cbiAgdmFyIGFsbG93SW5kZXhlcyA9ICEhbGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBwcm9wc0xlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKChhbGxvd0luZGV4ZXMgJiYgaXNJbmRleChrZXksIGxlbmd0aCkpIHx8IGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNoaW1LZXlzO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL3NoaW1LZXlzLmpzXG4gKiogbW9kdWxlIGlkID0gNTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCcuL2JpbmRDYWxsYmFjaycpLFxuICAgIGlzSXRlcmF0ZWVDYWxsID0gcmVxdWlyZSgnLi9pc0l0ZXJhdGVlQ2FsbCcpLFxuICAgIHJlc3RQYXJhbSA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9uL3Jlc3RQYXJhbScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBgXy5hc3NpZ25gLCBgXy5kZWZhdWx0c2AsIG9yIGBfLm1lcmdlYCBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIHJlc3RQYXJhbShmdW5jdGlvbihvYmplY3QsIHNvdXJjZXMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gb2JqZWN0ID09IG51bGwgPyAwIDogc291cmNlcy5sZW5ndGgsXG4gICAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPiAyID8gc291cmNlc1tsZW5ndGggLSAyXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgZ3VhcmQgPSBsZW5ndGggPiAyID8gc291cmNlc1syXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgdGhpc0FyZyA9IGxlbmd0aCA+IDEgPyBzb3VyY2VzW2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicpIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSBiaW5kQ2FsbGJhY2soY3VzdG9taXplciwgdGhpc0FyZywgNSk7XG4gICAgICBsZW5ndGggLT0gMjtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VzdG9taXplciA9IHR5cGVvZiB0aGlzQXJnID09ICdmdW5jdGlvbicgPyB0aGlzQXJnIDogdW5kZWZpbmVkO1xuICAgICAgbGVuZ3RoIC09IChjdXN0b21pemVyID8gMSA6IDApO1xuICAgIH1cbiAgICBpZiAoZ3VhcmQgJiYgaXNJdGVyYXRlZUNhbGwoc291cmNlc1swXSwgc291cmNlc1sxXSwgZ3VhcmQpKSB7XG4gICAgICBjdXN0b21pemVyID0gbGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IGN1c3RvbWl6ZXI7XG4gICAgICBsZW5ndGggPSAxO1xuICAgIH1cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBhc3NpZ25lcihvYmplY3QsIHNvdXJjZSwgY3VzdG9taXplcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUFzc2lnbmVyO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2NyZWF0ZUFzc2lnbmVyLmpzXG4gKiogbW9kdWxlIGlkID0gNTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpZGVudGl0eSA9IHJlcXVpcmUoJy4uL3V0aWxpdHkvaWRlbnRpdHknKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VDYWxsYmFja2Agd2hpY2ggb25seSBzdXBwb3J0cyBgdGhpc2AgYmluZGluZ1xuICogYW5kIHNwZWNpZnlpbmcgdGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGJpbmQuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJnQ291bnRdIFRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjYWxsYmFjay5cbiAqL1xuZnVuY3Rpb24gYmluZENhbGxiYWNrKGZ1bmMsIHRoaXNBcmcsIGFyZ0NvdW50KSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5O1xuICB9XG4gIGlmICh0aGlzQXJnID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZnVuYztcbiAgfVxuICBzd2l0Y2ggKGFyZ0NvdW50KSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDQ6IHJldHVybiBmdW5jdGlvbihhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH07XG4gICAgY2FzZSA1OiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBvdGhlciwga2V5LCBvYmplY3QsIHNvdXJjZSk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kQ2FsbGJhY2s7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvYmluZENhbGxiYWNrLmpzXG4gKiogbW9kdWxlIGlkID0gNTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgcHJvdmlkZWQgdG8gaXQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsaXR5XG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKlxuICogXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3Q7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpZGVudGl0eTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC91dGlsaXR5L2lkZW50aXR5LmpzXG4gKiogbW9kdWxlIGlkID0gNTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9pc0luZGV4JyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBwcm92aWRlZCBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0l0ZXJhdGVlQ2FsbCh2YWx1ZSwgaW5kZXgsIG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgaW5kZXg7XG4gIGlmICh0eXBlID09ICdudW1iZXInXG4gICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgOiAodHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3QpKSB7XG4gICAgdmFyIG90aGVyID0gb2JqZWN0W2luZGV4XTtcbiAgICByZXR1cm4gdmFsdWUgPT09IHZhbHVlID8gKHZhbHVlID09PSBvdGhlcikgOiAob3RoZXIgIT09IG90aGVyKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJdGVyYXRlZUNhbGw7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNJdGVyYXRlZUNhbGwuanNcbiAqKiBtb2R1bGUgaWQgPSA1N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXg7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlXG4gKiBjcmVhdGVkIGZ1bmN0aW9uIGFuZCBhcmd1bWVudHMgZnJvbSBgc3RhcnRgIGFuZCBiZXlvbmQgcHJvdmlkZWQgYXMgYW4gYXJyYXkuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGJhc2VkIG9uIHRoZSBbcmVzdCBwYXJhbWV0ZXJdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9GdW5jdGlvbnMvcmVzdF9wYXJhbWV0ZXJzKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBzYXkgPSBfLnJlc3RQYXJhbShmdW5jdGlvbih3aGF0LCBuYW1lcykge1xuICogICByZXR1cm4gd2hhdCArICcgJyArIF8uaW5pdGlhbChuYW1lcykuam9pbignLCAnKSArXG4gKiAgICAgKF8uc2l6ZShuYW1lcykgPiAxID8gJywgJiAnIDogJycpICsgXy5sYXN0KG5hbWVzKTtcbiAqIH0pO1xuICpcbiAqIHNheSgnaGVsbG8nLCAnZnJlZCcsICdiYXJuZXknLCAncGViYmxlcycpO1xuICogLy8gPT4gJ2hlbGxvIGZyZWQsIGJhcm5leSwgJiBwZWJibGVzJ1xuICovXG5mdW5jdGlvbiByZXN0UGFyYW0oZnVuYywgc3RhcnQpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogKCtzdGFydCB8fCAwKSwgMCk7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWF4KGFyZ3MubGVuZ3RoIC0gc3RhcnQsIDApLFxuICAgICAgICByZXN0ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICByZXN0W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIHN3aXRjaCAoc3RhcnQpIHtcbiAgICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCByZXN0KTtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcmdzWzBdLCByZXN0KTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcmdzWzBdLCBhcmdzWzFdLCByZXN0KTtcbiAgICB9XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgaW5kZXggPSAtMTtcbiAgICB3aGlsZSAoKytpbmRleCA8IHN0YXJ0KSB7XG4gICAgICBvdGhlckFyZ3NbaW5kZXhdID0gYXJnc1tpbmRleF07XG4gICAgfVxuICAgIG90aGVyQXJnc1tzdGFydF0gPSByZXN0O1xuICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzdFBhcmFtO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2Z1bmN0aW9uL3Jlc3RQYXJhbS5qc1xuICoqIG1vZHVsZSBpZCA9IDU4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgZXZlbnRzID0ge307XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RXZlbnQoZXZlbnROYW1lKSB7XHJcbiAgICAgICAgaWYgKCFldmVudHNbZXZlbnROYW1lXSkge1xyXG4gICAgICAgICAgICBldmVudHNbZXZlbnROYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgIHN1YnNjcmliZXJzOiBbXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZXZlbnRzW2V2ZW50TmFtZV07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xlYXJFdmVudHMoKXtcclxuICAgICAgICBldmVudHMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwdWJsaXNoU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbiwgZGF0YSkge1xyXG4gICAgICAgIGlmIChzdWJzY3JpcHRpb24uYXN5bmMpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5jYWxsYmFjayhkYXRhKTtcclxuICAgICAgICAgICAgfSwgNCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uLmNhbGxiYWNrKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdWJzY3JpYmUoZXZlbnQsIGNhbGxiYWNrLCBhc3luYykge1xyXG4gICAgICAgIHZhciBzdWJzY3JpcHRpb247XHJcblxyXG4gICAgICAgIGlmICggdHlwZW9mIGNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IGFzeW5jXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgIGlmICghc3Vic2NyaXB0aW9uLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkNhbGxiYWNrIHdhcyBub3Qgc3BlY2lmaWVkIG9uIG9wdGlvbnNcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0RXZlbnQoZXZlbnQpLnN1YnNjcmliZXJzLnB1c2goc3Vic2NyaXB0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrLCBhc3luYykge1xyXG4gICAgICAgICAgICByZXR1cm4gc3Vic2NyaWJlKGV2ZW50LCBjYWxsYmFjaywgYXN5bmMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHVibGlzaDogZnVuY3Rpb24oZXZlbnROYW1lLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudCA9IGdldEV2ZW50KGV2ZW50TmFtZSksXHJcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVycyA9IGV2ZW50LnN1YnNjcmliZXJzO1xyXG5cclxuICAgICAgICAgICAgZXZlbnQuc3Vic2NyaWJlcnMgPSBzdWJzY3JpYmVycy5maWx0ZXIoZnVuY3Rpb24oc3Vic2NyaWJlcikge1xyXG4gICAgICAgICAgICAgICAgcHVibGlzaFN1YnNjcmlwdGlvbihzdWJzY3JpYmVyLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhc3Vic2NyaWJlci5vbmNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uY2U6IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaywgYXN5bmMpIHtcclxuICAgICAgICAgICAgc3Vic2NyaWJlKGV2ZW50LCB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXHJcbiAgICAgICAgICAgICAgICBhc3luYzogYXN5bmMsXHJcbiAgICAgICAgICAgICAgICBvbmNlOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50O1xyXG5cclxuICAgICAgICAgICAgaWYgKGV2ZW50TmFtZSkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBnZXRFdmVudChldmVudE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50ICYmIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3Vic2NyaWJlcnMgPSBldmVudC5zdWJzY3JpYmVycy5maWx0ZXIoZnVuY3Rpb24oc3Vic2NyaWJlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJzY3JpYmVyLmNhbGxiYWNrICE9PSBjYWxsYmFjaztcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3Vic2NyaWJlcnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyRXZlbnRzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59KSgpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vZXZlbnRzLmpzXG4gKiovIiwiY29uc3QgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L21lcmdlJyk7XHJcblxyXG52YXIgc3RyZWFtUmVmLFxyXG4gICAgbG9hZGVkRGF0YUhhbmRsZXI7XHJcblxyXG4vKipcclxuICogV3JhcHMgYnJvd3Nlci1zcGVjaWZpYyBnZXRVc2VyTWVkaWFcclxuICogQHBhcmFtIHtPYmplY3R9IGNvbnN0cmFpbnRzXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdWNjZXNzIENhbGxiYWNrXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBmYWlsdXJlIENhbGxiYWNrXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRVc2VyTWVkaWEoY29uc3RyYWludHMsIHN1Y2Nlc3MsIGZhaWx1cmUpIHtcclxuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzLCBmdW5jdGlvbiAoc3RyZWFtKSB7XHJcbiAgICAgICAgICAgIHN0cmVhbVJlZiA9IHN0cmVhbTtcclxuICAgICAgICAgICAgdmFyIHZpZGVvU3JjID0gKHdpbmRvdy5VUkwgJiYgd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKSkgfHwgc3RyZWFtO1xyXG4gICAgICAgICAgICBzdWNjZXNzLmFwcGx5KG51bGwsIFt2aWRlb1NyY10pO1xyXG4gICAgICAgIH0sIGZhaWx1cmUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBmYWlsdXJlKG5ldyBUeXBlRXJyb3IoXCJnZXRVc2VyTWVkaWEgbm90IGF2YWlsYWJsZVwiKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRlZERhdGEodmlkZW8sIGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgYXR0ZW1wdHMgPSAxMDtcclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja1ZpZGVvKCkge1xyXG4gICAgICAgIGlmIChhdHRlbXB0cyA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHZpZGVvLnZpZGVvV2lkdGggPiAwICYmIHZpZGVvLnZpZGVvSGVpZ2h0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHZpZGVvLnZpZGVvV2lkdGggKyBcInB4IHggXCIgKyB2aWRlby52aWRlb0hlaWdodCArIFwicHhcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2hlY2tWaWRlbywgNTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCdVbmFibGUgdG8gcGxheSB2aWRlbyBzdHJlYW0uIElzIHdlYmNhbSB3b3JraW5nPycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhdHRlbXB0cy0tO1xyXG4gICAgfVxyXG4gICAgY2hlY2tWaWRlbygpO1xyXG59XHJcblxyXG4vKipcclxuICogVHJpZXMgdG8gYXR0YWNoIHRoZSBjYW1lcmEtc3RyZWFtIHRvIGEgZ2l2ZW4gdmlkZW8tZWxlbWVudFxyXG4gKiBhbmQgY2FsbHMgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gdGhlIGNvbnRlbnQgaXMgcmVhZHlcclxuICogQHBhcmFtIHtPYmplY3R9IGNvbnN0cmFpbnRzXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB2aWRlb1xyXG4gKiBAcGFyYW0ge09iamVjdH0gY2FsbGJhY2tcclxuICovXHJcbmZ1bmN0aW9uIGluaXRDYW1lcmEoY29uc3RyYWludHMsIHZpZGVvLCBjYWxsYmFjaykge1xyXG4gICAgZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzLCBmdW5jdGlvbihzcmMpIHtcclxuICAgICAgICB2aWRlby5zcmMgPSBzcmM7XHJcbiAgICAgICAgaWYgKGxvYWRlZERhdGFIYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIHZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkZWRkYXRhXCIsIGxvYWRlZERhdGFIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvYWRlZERhdGFIYW5kbGVyID0gbG9hZGVkRGF0YS5iaW5kKG51bGwsIHZpZGVvLCBjYWxsYmFjayk7XHJcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkZGF0YScsIGxvYWRlZERhdGFIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICAgICAgdmlkZW8ucGxheSgpO1xyXG4gICAgfSwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGNhbGxiYWNrKGUpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBOb3JtYWxpemVzIHRoZSBpbmNvbWluZyBjb25zdHJhaW50cyB0byBzYXRpc2Z5IHRoZSBjdXJyZW50IGJyb3dzZXJcclxuICogQHBhcmFtIGNvbmZpZ1xyXG4gKiBAcGFyYW0gY2IgQ2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIHdoZW5ldmVyIGNvbnN0cmFpbnRzIGFyZSBjcmVhdGVkXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZnVuY3Rpb24gbm9ybWFsaXplQ29uc3RyYWludHMoY29uZmlnLCBjYikge1xyXG4gICAgdmFyIGNvbnN0cmFpbnRzID0ge1xyXG4gICAgICAgICAgICBhdWRpbzogZmFsc2UsXHJcbiAgICAgICAgICAgIHZpZGVvOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB2aWRlb0NvbnN0cmFpbnRzID0gbWVyZ2Uoe1xyXG4gICAgICAgICAgICB3aWR0aDogNjQwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDQ4MCxcclxuICAgICAgICAgICAgbWluQXNwZWN0UmF0aW86IDAsXHJcbiAgICAgICAgICAgIG1heEFzcGVjdFJhdGlvOiAxMDAsXHJcbiAgICAgICAgICAgIGZhY2luZzogXCJlbnZpcm9ubWVudFwiXHJcbiAgICAgICAgfSwgY29uZmlnKTtcclxuXHJcbiAgICBpZiAoIHR5cGVvZiBNZWRpYVN0cmVhbVRyYWNrICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgTWVkaWFTdHJlYW1UcmFjay5nZXRTb3VyY2VzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIE1lZGlhU3RyZWFtVHJhY2suZ2V0U291cmNlcyhmdW5jdGlvbihzb3VyY2VJbmZvcykge1xyXG4gICAgICAgICAgICB2YXIgdmlkZW9Tb3VyY2VJZDtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VJbmZvcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNvdXJjZUluZm8gPSBzb3VyY2VJbmZvc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2VJbmZvLmtpbmQgPT09IFwidmlkZW9cIiAmJiBzb3VyY2VJbmZvLmZhY2luZyA9PT0gdmlkZW9Db25zdHJhaW50cy5mYWNpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICB2aWRlb1NvdXJjZUlkID0gc291cmNlSW5mby5pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdHJhaW50cy52aWRlbyA9IHtcclxuICAgICAgICAgICAgICAgIG1hbmRhdG9yeToge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbldpZHRoOiB2aWRlb0NvbnN0cmFpbnRzLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pbkhlaWdodDogdmlkZW9Db25zdHJhaW50cy5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluQXNwZWN0UmF0aW86IHZpZGVvQ29uc3RyYWludHMubWluQXNwZWN0UmF0aW8sXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4QXNwZWN0UmF0aW86IHZpZGVvQ29uc3RyYWludHMubWF4QXNwZWN0UmF0aW9cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvcHRpb25hbDogW3tcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VJZDogdmlkZW9Tb3VyY2VJZFxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIGNiKGNvbnN0cmFpbnRzKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3RyYWludHMudmlkZW8gPSB7XHJcbiAgICAgICAgICAgIG1lZGlhU291cmNlOiBcImNhbWVyYVwiLFxyXG4gICAgICAgICAgICB3aWR0aDogeyBtaW46IHZpZGVvQ29uc3RyYWludHMud2lkdGgsIG1heDogdmlkZW9Db25zdHJhaW50cy53aWR0aCB9LFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHsgbWluOiB2aWRlb0NvbnN0cmFpbnRzLmhlaWdodCwgbWF4OiB2aWRlb0NvbnN0cmFpbnRzLmhlaWdodCB9LFxyXG4gICAgICAgICAgICByZXF1aXJlOiBbXCJ3aWR0aFwiLCBcImhlaWdodFwiXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGNiKGNvbnN0cmFpbnRzKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcXVlc3RzIHRoZSBiYWNrLWZhY2luZyBjYW1lcmEgb2YgdGhlIHVzZXIuIFRoZSBjYWxsYmFjayBpcyBjYWxsZWRcclxuICogd2hlbmV2ZXIgdGhlIHN0cmVhbSBpcyByZWFkeSB0byBiZSBjb25zdW1lZCwgb3IgaWYgYW4gZXJyb3Igb2NjdXJlcy5cclxuICogQHBhcmFtIHtPYmplY3R9IHZpZGVvXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjYWxsYmFja1xyXG4gKi9cclxuZnVuY3Rpb24gcmVxdWVzdCh2aWRlbywgdmlkZW9Db25zdHJhaW50cywgY2FsbGJhY2spIHtcclxuICAgIG5vcm1hbGl6ZUNvbnN0cmFpbnRzKHZpZGVvQ29uc3RyYWludHMsIGZ1bmN0aW9uKGNvbnN0cmFpbnRzKSB7XHJcbiAgICAgICAgaW5pdENhbWVyYShjb25zdHJhaW50cywgdmlkZW8sIGNhbGxiYWNrKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICByZXF1ZXN0OiBmdW5jdGlvbih2aWRlbywgY29uc3RyYWludHMsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmVxdWVzdCh2aWRlbywgY29uc3RyYWludHMsIGNhbGxiYWNrKTtcclxuICAgIH0sXHJcbiAgICByZWxlYXNlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgdHJhY2tzID0gc3RyZWFtUmVmICYmIHN0cmVhbVJlZi5nZXRWaWRlb1RyYWNrcygpO1xyXG4gICAgICAgIGlmICh0cmFja3MgJiYgdHJhY2tzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0cmFja3NbMF0uc3RvcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdHJlYW1SZWYgPSBudWxsO1xyXG4gICAgfVxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9pbnB1dC9jYW1lcmFfYWNjZXNzLmpzXG4gKiovIiwiaW1wb3J0IEltYWdlRGVidWcgZnJvbSAnLi4vY29tbW9uL2ltYWdlX2RlYnVnJztcclxuXHJcbmZ1bmN0aW9uIGNvbnRhaW5zKGNvZGVSZXN1bHQsIGxpc3QpIHtcclxuICAgIGlmIChsaXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGxpc3Quc29tZShmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoaXRlbSkuZXZlcnkoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1ba2V5XSA9PT0gY29kZVJlc3VsdFtrZXldO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGFzc2VzRmlsdGVyKGNvZGVSZXN1bHQsIGZpbHRlcikge1xyXG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gZmlsdGVyKGNvZGVSZXN1bHQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNyZWF0ZTogZnVuY3Rpb24oY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksXHJcbiAgICAgICAgICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiksXHJcbiAgICAgICAgICAgIHJlc3VsdHMgPSBbXSxcclxuICAgICAgICAgICAgY2FwYWNpdHkgPSBjb25maWcuY2FwYWNpdHkgfHwgMjAsXHJcbiAgICAgICAgICAgIGNhcHR1cmUgPSBjb25maWcuY2FwdHVyZSA9PT0gdHJ1ZTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbWF0Y2hlc0NvbnN0cmFpbnRzKGNvZGVSZXN1bHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNhcGFjaXR5XHJcbiAgICAgICAgICAgICAgICAmJiBjb2RlUmVzdWx0XHJcbiAgICAgICAgICAgICAgICAmJiAhY29udGFpbnMoY29kZVJlc3VsdCwgY29uZmlnLmJsYWNrbGlzdClcclxuICAgICAgICAgICAgICAgICYmIHBhc3Nlc0ZpbHRlcihjb2RlUmVzdWx0LCBjb25maWcuZmlsdGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFkZFJlc3VsdDogZnVuY3Rpb24oZGF0YSwgaW1hZ2VTaXplLCBjb2RlUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoZXNDb25zdHJhaW50cyhjb2RlUmVzdWx0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcGFjaXR5LS07XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmNvZGVSZXN1bHQgPSBjb2RlUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYXB0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IGltYWdlU2l6ZS54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2VTaXplLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd0ltYWdlKGRhdGEsIGltYWdlU2l6ZSwgY3R4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmZyYW1lID0gY2FudmFzLnRvRGF0YVVSTCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0UmVzdWx0czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2FuYWx5dGljcy9yZXN1bHRfY29sbGVjdG9yLmpzXG4gKiovIiwibGV0IGNvbmZpZztcclxuXHJcbmlmIChFTlYuZGV2ZWxvcG1lbnQpe1xyXG4gICAgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcuZGV2LmpzJyk7XHJcbn0gZWxzZSBpZiAoRU5WLm5vZGUpIHtcclxuICAgIGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnLm5vZGUuanMnKTtcclxufSBlbHNlIHtcclxuICAgIGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnLnByb2QuanMnKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9jb25maWcvY29uZmlnLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBpbnB1dFN0cmVhbToge1xyXG4gICAgICAgIHR5cGU6IFwiSW1hZ2VTdHJlYW1cIixcclxuICAgICAgICBzZXF1ZW5jZTogZmFsc2UsXHJcbiAgICAgICAgc2l6ZTogODAwLFxyXG4gICAgICAgIGFyZWE6IHtcclxuICAgICAgICAgICAgdG9wOiBcIjAlXCIsXHJcbiAgICAgICAgICAgIHJpZ2h0OiBcIjAlXCIsXHJcbiAgICAgICAgICAgIGxlZnQ6IFwiMCVcIixcclxuICAgICAgICAgICAgYm90dG9tOiBcIjAlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNpbmdsZUNoYW5uZWw6IGZhbHNlIC8vIHRydWU6IG9ubHkgdGhlIHJlZCBjb2xvci1jaGFubmVsIGlzIHJlYWRcclxuICAgIH0sXHJcbiAgICBsb2NhdGU6IHRydWUsXHJcbiAgICBudW1PZldvcmtlcnM6IDAsXHJcbiAgICBkZWNvZGVyOiB7XHJcbiAgICAgICAgcmVhZGVyczogW1xyXG4gICAgICAgICAgICAnY29kZV8xMjhfcmVhZGVyJ1xyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICBsb2NhdG9yOiB7XHJcbiAgICAgICAgaGFsZlNhbXBsZTogdHJ1ZSxcclxuICAgICAgICBwYXRjaFNpemU6IFwibWVkaXVtXCIgLy8geC1zbWFsbCwgc21hbGwsIG1lZGl1bSwgbGFyZ2UsIHgtbGFyZ2VcclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvY29uZmlnL2NvbmZpZy5ub2RlLmpzXG4gKiovIiwiY29uc3QgR2V0UGl4ZWxzID0gcmVxdWlyZShcImdldC1waXhlbHNcIik7XHJcblxyXG52YXIgSW5wdXRTdHJlYW0gPSB7fTtcclxuXHJcbklucHV0U3RyZWFtLmNyZWF0ZUltYWdlU3RyZWFtID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdGhhdCA9IHt9O1xyXG4gICAgdmFyIF9jb25maWcgPSBudWxsO1xyXG5cclxuICAgIHZhciB3aWR0aCA9IDAsXHJcbiAgICAgICAgaGVpZ2h0ID0gMCxcclxuICAgICAgICBmcmFtZUlkeCA9IDAsXHJcbiAgICAgICAgcGF1c2VkID0gdHJ1ZSxcclxuICAgICAgICBsb2FkZWQgPSBmYWxzZSxcclxuICAgICAgICBmcmFtZSA9IG51bGwsXHJcbiAgICAgICAgYmFzZVVybCxcclxuICAgICAgICBlbmRlZCA9IGZhbHNlLFxyXG4gICAgICAgIHNpemUsXHJcbiAgICAgICAgY2FsY3VsYXRlZFdpZHRoLFxyXG4gICAgICAgIGNhbGN1bGF0ZWRIZWlnaHQsXHJcbiAgICAgICAgX2V2ZW50TmFtZXMgPSBbJ2NhbnJlY29yZCcsICdlbmRlZCddLFxyXG4gICAgICAgIF9ldmVudEhhbmRsZXJzID0ge30sXHJcbiAgICAgICAgX3RvcFJpZ2h0ID0ge3g6IDAsIHk6IDB9LFxyXG4gICAgICAgIF9jYW52YXNTaXplID0ge3g6IDAsIHk6IDB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGxvYWRJbWFnZXMoKSB7XHJcbiAgICAgICAgbG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgR2V0UGl4ZWxzKGJhc2VVcmwsIGZ1bmN0aW9uKGVyciwgcGl4ZWxzKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICBleGl0KDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBpeGVscy5zaGFwZSk7XHJcbiAgICAgICAgICAgIGZyYW1lID0gcGl4ZWxzO1xyXG4gICAgICAgICAgICB3aWR0aCA9IHBpeGVscy5zaGFwZVswXTtcclxuICAgICAgICAgICAgaGVpZ2h0ID0gcGl4ZWxzLnNoYXBlWzFdO1xyXG4gICAgICAgICAgICBjYWxjdWxhdGVkV2lkdGggPSBfY29uZmlnLnNpemUgPyB3aWR0aC9oZWlnaHQgPiAxID8gX2NvbmZpZy5zaXplIDogTWF0aC5mbG9vcigod2lkdGgvaGVpZ2h0KSAqIF9jb25maWcuc2l6ZSkgOiB3aWR0aDtcclxuICAgICAgICAgICAgY2FsY3VsYXRlZEhlaWdodCA9IF9jb25maWcuc2l6ZSA/IHdpZHRoL2hlaWdodCA+IDEgPyBNYXRoLmZsb29yKChoZWlnaHQvd2lkdGgpICogX2NvbmZpZy5zaXplKSA6IF9jb25maWcuc2l6ZSA6IGhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIF9jYW52YXNTaXplLnggPSBjYWxjdWxhdGVkV2lkdGg7XHJcbiAgICAgICAgICAgIF9jYW52YXNTaXplLnkgPSBjYWxjdWxhdGVkSGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHB1Ymxpc2hFdmVudChcImNhbnJlY29yZFwiLCBbXSk7XHJcbiAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHB1Ymxpc2hFdmVudChldmVudE5hbWUsIGFyZ3MpIHtcclxuICAgICAgICB2YXIgaixcclxuICAgICAgICAgICAgaGFuZGxlcnMgPSBfZXZlbnRIYW5kbGVyc1tldmVudE5hbWVdO1xyXG5cclxuICAgICAgICBpZiAoaGFuZGxlcnMgJiYgaGFuZGxlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IGhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyc1tqXS5hcHBseSh0aGF0LCBhcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgdGhhdC50cmlnZ2VyID0gcHVibGlzaEV2ZW50O1xyXG5cclxuICAgIHRoYXQuZ2V0V2lkdGggPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gY2FsY3VsYXRlZFdpZHRoO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldEhlaWdodCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBjYWxjdWxhdGVkSGVpZ2h0O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldFdpZHRoID0gZnVuY3Rpb24od2lkdGgpIHtcclxuICAgICAgICBjYWxjdWxhdGVkV2lkdGggPSB3aWR0aDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zZXRIZWlnaHQgPSBmdW5jdGlvbihoZWlnaHQpIHtcclxuICAgICAgICBjYWxjdWxhdGVkSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFJlYWxXaWR0aCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB3aWR0aDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRSZWFsSGVpZ2h0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGhlaWdodDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zZXRJbnB1dFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICAgIF9jb25maWcgPSBzdHJlYW07XHJcbiAgICAgICAgYmFzZVVybCA9IF9jb25maWcuc3JjO1xyXG4gICAgICAgIHNpemUgPSAxO1xyXG4gICAgICAgIGxvYWRJbWFnZXMoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5lbmRlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBlbmRlZDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zZXRBdHRyaWJ1dGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cclxuICAgIHRoYXQuZ2V0Q29uZmlnID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIF9jb25maWc7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucGF1c2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBwYXVzZWQgPSB0cnVlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnBsYXkgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBwYXVzZWQgPSBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zZXRDdXJyZW50VGltZSA9IGZ1bmN0aW9uKHRpbWUpIHtcclxuICAgICAgICBmcmFtZUlkeCA9IHRpbWU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmKSB7XHJcbiAgICAgICAgaWYgKF9ldmVudE5hbWVzLmluZGV4T2YoZXZlbnQpICE9PSAtMSkge1xyXG4gICAgICAgICAgICBpZiAoIV9ldmVudEhhbmRsZXJzW2V2ZW50XSkge1xyXG4gICAgICAgICAgICAgICAgX2V2ZW50SGFuZGxlcnNbZXZlbnRdID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX2V2ZW50SGFuZGxlcnNbZXZlbnRdLnB1c2goZik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldFRvcFJpZ2h0ID0gZnVuY3Rpb24odG9wUmlnaHQpIHtcclxuICAgICAgICBfdG9wUmlnaHQueCA9IHRvcFJpZ2h0Lng7XHJcbiAgICAgICAgX3RvcFJpZ2h0LnkgPSB0b3BSaWdodC55O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFRvcFJpZ2h0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIF90b3BSaWdodDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zZXRDYW52YXNTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xyXG4gICAgICAgIF9jYW52YXNTaXplLnggPSBzaXplLng7XHJcbiAgICAgICAgX2NhbnZhc1NpemUueSA9IHNpemUueTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRDYW52YXNTaXplID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIF9jYW52YXNTaXplO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldEZyYW1lID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCFsb2FkZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZyYW1lO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW5wdXRTdHJlYW07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvbGliL2lucHV0X3N0cmVhbS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdldC1waXhlbHNcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImdldC1waXhlbHNcIlxuICoqIG1vZHVsZSBpZCA9IDY1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJjb25zdCBDVlV0aWxzID0gcmVxdWlyZSgnLi4vc3JjL2NvbW1vbi9jdl91dGlscycpLFxyXG4gICAgICBOZGFycmF5ID0gcmVxdWlyZShcIm5kYXJyYXlcIiksXHJcbiAgICAgIEludGVycDJEID0gcmVxdWlyZShcIm5kYXJyYXktbGluZWFyLWludGVycG9sYXRlXCIpLmQyO1xyXG5cclxudmFyIEZyYW1lR3JhYmJlciA9IHt9O1xyXG5cclxuRnJhbWVHcmFiYmVyLmNyZWF0ZSA9IGZ1bmN0aW9uKGlucHV0U3RyZWFtKSB7XHJcbiAgICB2YXIgX3RoYXQgPSB7fSxcclxuICAgICAgICBfc3RyZWFtQ29uZmlnID0gaW5wdXRTdHJlYW0uZ2V0Q29uZmlnKCksXHJcbiAgICAgICAgX3ZpZGVvX3NpemUgPSBDVlV0aWxzLmltYWdlUmVmKGlucHV0U3RyZWFtLmdldFJlYWxXaWR0aCgpLCBpbnB1dFN0cmVhbS5nZXRSZWFsSGVpZ2h0KCkpLFxyXG4gICAgICAgIF9jYW52YXNTaXplID0gaW5wdXRTdHJlYW0uZ2V0Q2FudmFzU2l6ZSgpLFxyXG4gICAgICAgIF9zaXplID0gQ1ZVdGlscy5pbWFnZVJlZihpbnB1dFN0cmVhbS5nZXRXaWR0aCgpLCBpbnB1dFN0cmVhbS5nZXRIZWlnaHQoKSksXHJcbiAgICAgICAgX3RvcFJpZ2h0ID0gaW5wdXRTdHJlYW0uZ2V0VG9wUmlnaHQoKSxcclxuICAgICAgICBfZGF0YSA9IG5ldyBVaW50OEFycmF5KF9zaXplLnggKiBfc2l6ZS55KSxcclxuICAgICAgICBfZ3JheURhdGEgPSBuZXcgVWludDhBcnJheShfdmlkZW9fc2l6ZS54ICogX3ZpZGVvX3NpemUueSksXHJcbiAgICAgICAgX2NhbnZhc0RhdGEgPSBuZXcgVWludDhBcnJheShfY2FudmFzU2l6ZS54ICogX2NhbnZhc1NpemUueSksXHJcbiAgICAgICAgX2dyYXlJbWFnZUFycmF5ID0gTmRhcnJheShfZ3JheURhdGEsIFtfdmlkZW9fc2l6ZS55LCBfdmlkZW9fc2l6ZS54XSkudHJhbnNwb3NlKDEsIDApLFxyXG4gICAgICAgIF9jYW52YXNJbWFnZUFycmF5ID0gTmRhcnJheShfY2FudmFzRGF0YSwgW19jYW52YXNTaXplLnksIF9jYW52YXNTaXplLnhdKS50cmFuc3Bvc2UoMSwgMCksXHJcbiAgICAgICAgX3RhcmdldEltYWdlQXJyYXkgPSBfY2FudmFzSW1hZ2VBcnJheS5oaShfdG9wUmlnaHQueCArIF9zaXplLngsIF90b3BSaWdodC55ICsgX3NpemUueSkubG8oX3RvcFJpZ2h0LngsIF90b3BSaWdodC55KSxcclxuICAgICAgICBfc3RlcFNpemVYID0gX3ZpZGVvX3NpemUueC9fY2FudmFzU2l6ZS54LFxyXG4gICAgICAgIF9zdGVwU2l6ZVkgPSBfdmlkZW9fc2l6ZS55L19jYW52YXNTaXplLnk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJGcmFtZUdyYWJiZXJcIiwgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIHZpZGVvU2l6ZTogX2dyYXlJbWFnZUFycmF5LnNoYXBlLFxyXG4gICAgICAgIGNhbnZhc1NpemU6IF9jYW52YXNJbWFnZUFycmF5LnNoYXBlLFxyXG4gICAgICAgIHN0ZXBTaXplOiBbX3N0ZXBTaXplWCwgX3N0ZXBTaXplWV0sXHJcbiAgICAgICAgc2l6ZTogX3RhcmdldEltYWdlQXJyYXkuc2hhcGUsXHJcbiAgICAgICAgdG9wUmlnaHQ6IF90b3BSaWdodFxyXG4gICAgfSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXNlcyB0aGUgZ2l2ZW4gYXJyYXkgYXMgZnJhbWUtYnVmZmVyXHJcbiAgICAgKi9cclxuICAgIF90aGF0LmF0dGFjaERhdGEgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgX2RhdGEgPSBkYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHVzZWQgZnJhbWUtYnVmZmVyXHJcbiAgICAgKi9cclxuICAgIF90aGF0LmdldERhdGEgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gX2RhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmV0Y2hlcyBhIGZyYW1lIGZyb20gdGhlIGlucHV0LXN0cmVhbSBhbmQgcHV0cyBpbnRvIHRoZSBmcmFtZS1idWZmZXIuXHJcbiAgICAgKiBUaGUgaW1hZ2UtZGF0YSBpcyBjb252ZXJ0ZWQgdG8gZ3JheS1zY2FsZSBhbmQgdGhlbiBoYWxmLXNhbXBsZWQgaWYgY29uZmlndXJlZC5cclxuICAgICAqL1xyXG4gICAgX3RoYXQuZ3JhYiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBmcmFtZSA9IGlucHV0U3RyZWFtLmdldEZyYW1lKCk7XHJcblxyXG4gICAgICAgIGlmIChmcmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlQW5kQ3JvcChmcmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIF90aGF0LnNjYWxlQW5kQ3JvcCA9IGZ1bmN0aW9uKGZyYW1lKSB7XHJcbiAgICAgICAgdmFyIHgsXHJcbiAgICAgICAgICAgIHk7XHJcblxyXG4gICAgICAgIC8vIDEuIGNvbXB1dGUgZnVsbC1zaXplZCBncmF5IGltYWdlXHJcbiAgICAgICAgQ1ZVdGlscy5jb21wdXRlR3JheShmcmFtZS5kYXRhLCBfZ3JheURhdGEpO1xyXG5cclxuICAgICAgICAvLyAyLiBpbnRlcnBvbGF0ZVxyXG4gICAgICAgIGZvciAoeSA9IDA7IHkgPCBfY2FudmFzU2l6ZS55OyB5KyspIHtcclxuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IF9jYW52YXNTaXplLng7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgX2NhbnZhc0ltYWdlQXJyYXkuc2V0KHgsIHksIChJbnRlcnAyRChfZ3JheUltYWdlQXJyYXksIHggKiBfc3RlcFNpemVYLCB5ICogX3N0ZXBTaXplWSkpIHwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHRhcmdldEltYWdlQXJyYXkgbXVzdCBiZSBlcXVhbCB0byB0YXJnZXRTaXplXHJcbiAgICAgICAgaWYgKF90YXJnZXRJbWFnZUFycmF5LnNoYXBlWzBdICE9PSBfc2l6ZS54IHx8XHJcbiAgICAgICAgICAgIF90YXJnZXRJbWFnZUFycmF5LnNoYXBlWzFdICE9PSBfc2l6ZS55KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoYXBlcyBkbyBub3QgbWF0Y2ghXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gMy4gY3JvcFxyXG4gICAgICAgIGZvciAoeSA9IDA7IHkgPCBfc2l6ZS55OyB5KyspIHtcclxuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IF9zaXplLng7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgX2RhdGFbeSAqIF9zaXplLnggKyB4XSA9IF90YXJnZXRJbWFnZUFycmF5LmdldCh4LCB5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3RoYXQuZ2V0U2l6ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBfc2l6ZTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIF90aGF0O1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGcmFtZUdyYWJiZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvbGliL2ZyYW1lX2dyYWJiZXIuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZGFycmF5XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJuZGFycmF5XCJcbiAqKiBtb2R1bGUgaWQgPSA2N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmRhcnJheS1saW5lYXItaW50ZXJwb2xhdGVcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIm5kYXJyYXktbGluZWFyLWludGVycG9sYXRlXCJcbiAqKiBtb2R1bGUgaWQgPSA2OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==