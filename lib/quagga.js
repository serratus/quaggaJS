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
	
	var _typedefs = __webpack_require__(2);
	
	var _typedefs2 = _interopRequireDefault(_typedefs);
	
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
	
	var merge = __webpack_require__(26);
	var InputStream = __webpack_require__(63);
	var FrameGrabber = __webpack_require__(65);
	
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
	    _framegrabber = FrameGrabber.create(_inputStream, _canvasContainer.dom.image);
	
	    if (_config.numOfWorkers > 0) {
	        initWorkers(function () {
	            console.log("Workers created");
	            ready(cb);
	        });
	    } else {
	        initializeData();
	        ready(cb);
	    }
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
	
	    console.log(_inputImageWrapper.size);
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
	
	function _start() {
	    _stopped = false;
	    (function frame() {
	        if (!_stopped) {
	            update();
	            if (_onUIThread && _config.inputStream.type === "LiveStream") {
	                window.requestAnimFrame(frame);
	            }
	        }
	    })();
	}
	
	function initWorkers(cb) {
	    var i;
	    _workerPool = [];
	
	    for (i = 0; i < _config.numOfWorkers; i++) {
	        initWorker(workerInitialized);
	    }
	
	    function workerInitialized(workerThread) {
	        _workerPool.push(workerThread);
	        if (_workerPool.length >= _config.numOfWorkers) {
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
	
	    workerThread.worker.onmessage = function (e) {
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
	        _workerPool.forEach(function (workerThread) {
	            workerThread.worker.terminate();
	            console.log("Worker terminated!");
	        });
	        _workerPool.length = 0;
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
	            numOfWorkers: 1,
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
	
	var _glMatrix2 = _interopRequireDefault(_glMatrix);
	
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
	    _skeletonizer,
	    vec2 = _glMatrix2['default'].vec2,
	    mat2 = _glMatrix2['default'].mat2;
	
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
	    if (_config.showCanvas === true) {
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
	        if (_config.showPatches) {
	            _commonImage_debug2['default'].drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, { color: "red" });
	        }
	    }
	
	    overAvg /= patches.length;
	    overAvg = (overAvg * 180 / Math.PI + 90) % 180 - 90;
	    if (overAvg < 0) {
	        overAvg += 180;
	    }
	
	    overAvg = (180 - overAvg) * Math.PI / 180;
	    transMat = mat2.clone([Math.cos(overAvg), Math.sin(overAvg), -Math.sin(overAvg), Math.cos(overAvg)]);
	
	    // iterate over patches and rotate by angle
	    for (i = 0; i < patches.length; i++) {
	        patch = patches[i];
	        for (j = 0; j < 4; j++) {
	            vec2.transformMat2(patch.box[j], patch.box[j], transMat);
	        }
	
	        if (_config.boxFromPatches.showTransformed) {
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
	
	    if (_config.boxFromPatches.showTransformedBox) {
	        _commonImage_debug2['default'].drawPath(box, { x: 0, y: 1 }, _canvasContainer.ctx.binary, { color: '#ff0000', lineWidth: 2 });
	    }
	
	    scale = _config.halfSample ? 2 : 1;
	    // reverse rotation;
	    transMat = mat2.invert(transMat, transMat);
	    for (j = 0; j < 4; j++) {
	        vec2.transformMat2(box[j], box[j], transMat);
	    }
	
	    if (_config.boxFromPatches.showBB) {
	        _commonImage_debug2['default'].drawPath(box, { x: 0, y: 1 }, _canvasContainer.ctx.binary, { color: '#ff0000', lineWidth: 2 });
	    }
	
	    for (j = 0; j < 4; j++) {
	        vec2.scale(box[j], box[j], scale);
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
	
	            if (_config.showLabels) {
	                _labelImageWrapper.overlay(_canvasContainer.dom.binary, Math.floor(360 / rasterResult.count), { x: x, y: y });
	            }
	
	            // calculate moments from the skeletonized patch
	            moments = _labelImageWrapper.moments(rasterResult.count);
	
	            // extract eligible patches
	            patchesFound = patchesFound.concat(describePatch(moments, [i, j], x, y));
	        }
	    }
	
	    if (_config.showFoundPatches) {
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
	            if (_config.showRemainingPatchLabels) {
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
	    if (_config.showSkeleton) {
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
	                    box: [vec2.clone([x, y]), vec2.clone([x + _subImageWrapper.size.x, y]), vec2.clone([x + _subImageWrapper.size.x, y + _subImageWrapper.size.y]), vec2.clone([x, y + _subImageWrapper.size.y])],
	                    moments: matchingMoments,
	                    rad: avg,
	                    vec: vec2.clone([Math.cos(avg), Math.sin(avg)])
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
	                    similarity = Math.abs(vec2.dot(_imageToPatchGrid.data[idx].vec, currentPatch.vec));
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
	    if (_config.showPatchLabels) {
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
	        console.log("Patch-Size: " + JSON.stringify(patchSize));
	
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
	            if (typeof document !== 'undefined') {
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
	                console.log("Before registering reader: ", reader);
	                _barcodeReaders.push(new READERS[reader](configuration));
	            });
	            console.log("Registered Readers: " + _barcodeReaders.map(function (reader) {
	                return JSON.stringify({ format: reader.FORMAT, config: reader.config });
	            }).join(', '));
	        }
	
	        function initConfig() {
	            if (typeof document !== 'undefined') {
	                var i,
	                    vis = [{
	                    node: _canvas.dom.frequency,
	                    prop: config.showFrequency
	                }, {
	                    node: _canvas.dom.pattern,
	                    prop: config.showPattern
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
	
	            if (config.showFrequency) {
	                _commonImage_debug2['default'].drawPath(line, { x: 'x', y: 'y' }, _canvas.ctx.overlay, { color: 'red', lineWidth: 3 });
	                _bresenham2['default'].debug.printFrequency(barcodeLine.line, _canvas.dom.frequency);
	            }
	            _bresenham2['default'].toBinaryLine(barcodeLine);
	            if (config.showPattern) {
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
	
	            if (config.drawBoundingBox && ctx) {
	                _commonImage_debug2['default'].drawPath(box, { x: 0, y: 1 }, ctx, { color: "blue", lineWidth: 2 });
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
	
	            if (result && config.drawScanline && ctx) {
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
	        console.log('Failed AZ09 pattern code:', code);
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
	                console.log(video.videoWidth + "px x " + video.videoHeight + "px");
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
	        if (tracks.length) {
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
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    inputStream: {
	        name: "Live",
	        type: "LiveStream",
	        constraints: {
	            width: 640,
	            height: 480,
	            minAspectRatio: 0,
	            maxAspectRatio: 100,
	            facing: "environment" // or user
	        },
	        area: {
	            top: "0%",
	            right: "0%",
	            left: "0%",
	            bottom: "0%"
	        },
	        singleChannel: false // true: only the red color-channel is read
	    },
	    debug: false,
	    locate: true,
	    numOfWorkers: 4,
	    decoder: {
	        drawBoundingBox: false,
	        showFrequency: false,
	        drawScanline: false,
	        showPattern: false,
	        readers: ['code_128_reader']
	    },
	    locator: {
	        halfSample: true,
	        patchSize: "medium", // x-small, small, medium, large, x-large
	        showCanvas: false,
	        showPatches: false,
	        showFoundPatches: false,
	        showSkeleton: false,
	        showLabels: false,
	        showPatchLabels: false,
	        showRemainingPatchLabels: false,
	        boxFromPatches: {
	            showTransformed: false,
	            showTransformedBox: false,
	            showBB: false
	        }
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _image_loader = __webpack_require__(64);
	
	var _image_loader2 = _interopRequireDefault(_image_loader);
	
	var InputStream = {};
	InputStream.createVideoStream = function (video) {
	    var that = {},
	        _config = null,
	        _eventNames = ['canrecord', 'ended'],
	        _eventHandlers = {},
	        _calculatedWidth,
	        _calculatedHeight,
	        _topRight = { x: 0, y: 0 },
	        _canvasSize = { x: 0, y: 0 };
	
	    function initSize() {
	        var width = video.videoWidth,
	            height = video.videoHeight;
	
	        _calculatedWidth = _config.size ? width / height > 1 ? _config.size : Math.floor(width / height * _config.size) : width;
	        _calculatedHeight = _config.size ? width / height > 1 ? Math.floor(height / width * _config.size) : _config.size : height;
	
	        _canvasSize.x = _calculatedWidth;
	        _canvasSize.y = _calculatedHeight;
	    }
	
	    that.getRealWidth = function () {
	        return video.videoWidth;
	    };
	
	    that.getRealHeight = function () {
	        return video.videoHeight;
	    };
	
	    that.getWidth = function () {
	        return _calculatedWidth;
	    };
	
	    that.getHeight = function () {
	        return _calculatedHeight;
	    };
	
	    that.setWidth = function (width) {
	        _calculatedWidth = width;
	    };
	
	    that.setHeight = function (height) {
	        _calculatedHeight = height;
	    };
	
	    that.setInputStream = function (config) {
	        _config = config;
	        video.src = typeof config.src !== 'undefined' ? config.src : '';
	    };
	
	    that.ended = function () {
	        return video.ended;
	    };
	
	    that.getConfig = function () {
	        return _config;
	    };
	
	    that.setAttribute = function (name, value) {
	        video.setAttribute(name, value);
	    };
	
	    that.pause = function () {
	        video.pause();
	    };
	
	    that.play = function () {
	        video.play();
	    };
	
	    that.setCurrentTime = function (time) {
	        if (_config.type !== "LiveStream") {
	            video.currentTime = time;
	        }
	    };
	
	    that.addEventListener = function (event, f, bool) {
	        if (_eventNames.indexOf(event) !== -1) {
	            if (!_eventHandlers[event]) {
	                _eventHandlers[event] = [];
	            }
	            _eventHandlers[event].push(f);
	        } else {
	            video.addEventListener(event, f, bool);
	        }
	    };
	
	    that.clearEventHandlers = function () {
	        _eventNames.forEach(function (eventName) {
	            var handlers = _eventHandlers[eventName];
	            if (handlers && handlers.length > 0) {
	                handlers.forEach(function (handler) {
	                    video.removeEventListener(eventName, handler);
	                });
	            }
	        });
	    };
	
	    that.trigger = function (eventName, args) {
	        var j,
	            handlers = _eventHandlers[eventName];
	
	        if (eventName === 'canrecord') {
	            initSize();
	        }
	        if (handlers && handlers.length > 0) {
	            for (j = 0; j < handlers.length; j++) {
	                handlers[j].apply(that, args);
	            }
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
	        return video;
	    };
	
	    return that;
	};
	
	InputStream.createLiveStream = function (video) {
	    video.setAttribute("autoplay", true);
	    var that = InputStream.createVideoStream(video);
	
	    that.ended = function () {
	        return false;
	    };
	
	    return that;
	};
	
	InputStream.createImageStream = function () {
	    var that = {};
	    var _config = null;
	
	    var width = 0,
	        height = 0,
	        frameIdx = 0,
	        paused = true,
	        loaded = false,
	        imgArray = null,
	        size = 0,
	        offset = 1,
	        baseUrl = null,
	        ended = false,
	        calculatedWidth,
	        calculatedHeight,
	        _eventNames = ['canrecord', 'ended'],
	        _eventHandlers = {},
	        _topRight = { x: 0, y: 0 },
	        _canvasSize = { x: 0, y: 0 };
	
	    function loadImages() {
	        loaded = false;
	        _image_loader2['default'].load(baseUrl, function (imgs) {
	            imgArray = imgs;
	            width = imgs[0].width;
	            height = imgs[0].height;
	            calculatedWidth = _config.size ? width / height > 1 ? _config.size : Math.floor(width / height * _config.size) : width;
	            calculatedHeight = _config.size ? width / height > 1 ? Math.floor(height / width * _config.size) : _config.size : height;
	            _canvasSize.x = calculatedWidth;
	            _canvasSize.y = calculatedHeight;
	            loaded = true;
	            frameIdx = 0;
	            setTimeout(function () {
	                publishEvent("canrecord", []);
	            }, 0);
	        }, offset, size, _config.sequence);
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
	
	    that.setWidth = function (newWidth) {
	        calculatedWidth = newWidth;
	    };
	
	    that.setHeight = function (newHeight) {
	        calculatedHeight = newHeight;
	    };
	
	    that.getRealWidth = function () {
	        return width;
	    };
	
	    that.getRealHeight = function () {
	        return height;
	    };
	
	    that.setInputStream = function (stream) {
	        _config = stream;
	        if (stream.sequence === false) {
	            baseUrl = stream.src;
	            size = 1;
	        } else {
	            baseUrl = stream.src;
	            size = stream.length;
	        }
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
	
	    that.setCanvasSize = function (canvasSize) {
	        _canvasSize.x = canvasSize.x;
	        _canvasSize.y = canvasSize.y;
	    };
	
	    that.getCanvasSize = function () {
	        return _canvasSize;
	    };
	
	    that.getFrame = function () {
	        var frame;
	
	        if (!loaded) {
	            return null;
	        }
	        if (!paused) {
	            frame = imgArray[frameIdx];
	            if (frameIdx < size - 1) {
	                frameIdx++;
	            } else {
	                setTimeout(function () {
	                    ended = true;
	                    publishEvent("ended", []);
	                }, 0);
	            }
	        }
	        return frame;
	    };
	
	    return that;
	};
	
	exports['default'] = InputStream;
	module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ImageLoader = {};
	ImageLoader.load = function (directory, callback, offset, size, sequence) {
	    var htmlImagesSrcArray = new Array(size),
	        htmlImagesArray = new Array(htmlImagesSrcArray.length),
	        i,
	        img,
	        num;
	
	    if (sequence === false) {
	        htmlImagesSrcArray[0] = directory;
	    } else {
	        for (i = 0; i < htmlImagesSrcArray.length; i++) {
	            num = offset + i;
	            htmlImagesSrcArray[i] = directory + "image-" + ("00" + num).slice(-3) + ".jpg";
	        }
	    }
	    htmlImagesArray.notLoaded = [];
	    htmlImagesArray.addImage = function (image) {
	        htmlImagesArray.notLoaded.push(image);
	    };
	    htmlImagesArray.loaded = function (loadedImg) {
	        var notloadedImgs = htmlImagesArray.notLoaded;
	        for (var x = 0; x < notloadedImgs.length; x++) {
	            if (notloadedImgs[x] === loadedImg) {
	                notloadedImgs.splice(x, 1);
	                for (var y = 0; y < htmlImagesSrcArray.length; y++) {
	                    var imgName = htmlImagesSrcArray[y].substr(htmlImagesSrcArray[y].lastIndexOf("/"));
	                    if (loadedImg.src.lastIndexOf(imgName) !== -1) {
	                        htmlImagesArray[y] = loadedImg;
	                        break;
	                    }
	                }
	                break;
	            }
	        }
	        if (notloadedImgs.length === 0) {
	            console.log("Images loaded");
	            callback.apply(null, [htmlImagesArray]);
	        }
	    };
	
	    for (i = 0; i < htmlImagesSrcArray.length; i++) {
	        img = new Image();
	        htmlImagesArray.addImage(img);
	        addOnloadHandler(img, htmlImagesArray);
	        img.src = htmlImagesSrcArray[i];
	    }
	};
	
	function addOnloadHandler(img, htmlImagesArray) {
	    img.onload = function () {
	        htmlImagesArray.loaded(this);
	    };
	}
	
	exports["default"] = ImageLoader;
	module.exports = exports["default"];

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _commonCv_utils = __webpack_require__(5);
	
	var _commonCv_utils2 = _interopRequireDefault(_commonCv_utils);
	
	var FrameGrabber = {};
	
	FrameGrabber.create = function (inputStream, canvas) {
	    var _that = {},
	        _streamConfig = inputStream.getConfig(),
	        _video_size = _commonCv_utils2["default"].imageRef(inputStream.getRealWidth(), inputStream.getRealHeight()),
	        _canvasSize = inputStream.getCanvasSize(),
	        _size = _commonCv_utils2["default"].imageRef(inputStream.getWidth(), inputStream.getHeight()),
	        topRight = inputStream.getTopRight(),
	        _sx = topRight.x,
	        _sy = topRight.y,
	        _canvas,
	        _ctx = null,
	        _data = null;
	
	    _canvas = canvas ? canvas : document.createElement("canvas");
	    _canvas.width = _canvasSize.x;
	    _canvas.height = _canvasSize.y;
	    _ctx = _canvas.getContext("2d");
	    _data = new Uint8Array(_size.x * _size.y);
	    console.log("FrameGrabber", JSON.stringify({
	        size: _size,
	        topRight: topRight,
	        videoSize: _video_size,
	        canvasSize: _canvasSize
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
	        var doHalfSample = _streamConfig.halfSample,
	            frame = inputStream.getFrame(),
	            ctxData;
	        if (frame) {
	            _ctx.drawImage(frame, 0, 0, _canvasSize.x, _canvasSize.y);
	            ctxData = _ctx.getImageData(_sx, _sy, _size.x, _size.y).data;
	            if (doHalfSample) {
	                _commonCv_utils2["default"].grayAndHalfSampleFromCanvasData(ctxData, _size, _data);
	            } else {
	                _commonCv_utils2["default"].computeGray(ctxData, _data, _streamConfig);
	            }
	            return true;
	        } else {
	            return false;
	        }
	    };
	
	    _that.getSize = function () {
	        return _size;
	    };
	
	    return _that;
	};
	
	exports["default"] = FrameGrabber;
	module.exports = exports["default"];

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODE5YTI3OTA4ZTMwY2QzMThkMjUiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3F1YWdnYS5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvdHlwZWRlZnMuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvbW1vbi9pbWFnZV93cmFwcGVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vc3ViSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvbW1vbi9jdl91dGlscy5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvY29tbW9uL2NsdXN0ZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZ2wtbWF0cml4XCIiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvbW1vbi9hcnJheV9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2xvY2F0b3IvYmFyY29kZV9sb2NhdG9yLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vaW1hZ2VfZGVidWcuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2xvY2F0b3IvcmFzdGVyaXplci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvbG9jYXRvci90cmFjZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2xvY2F0b3Ivc2tlbGV0b25pemVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9kZWNvZGVyL2JhcmNvZGVfZGVjb2Rlci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvZGVjb2Rlci9icmVzZW5oYW0uanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9jb2RlXzEyOF9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9iYXJjb2RlX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL2Vhbl9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9jb2RlXzM5X3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL2NvZGVfMzlfdmluX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL2NvZGFiYXJfcmVhZGVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvdXBjX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL2Vhbl84X3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL3VwY19lX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL2kyb2Y1X3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9vYmplY3QvbWVyZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZU1lcmdlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2FycmF5RWFjaC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlTWVyZ2VEZWVwLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2FycmF5Q29weS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9sYW5nL2lzQXJndW1lbnRzLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2lzQXJyYXlMaWtlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2dldExlbmd0aC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNMZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNPYmplY3RMaWtlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvaXNBcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9nZXROYXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbGFuZy9pc05hdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9sYW5nL2lzRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbGFuZy9pc09iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9sYW5nL2lzUGxhaW5PYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZUZvckluLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2Jhc2VGb3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvY3JlYXRlQmFzZUZvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC90b09iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9vYmplY3Qva2V5c0luLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2lzSW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbGFuZy9pc1R5cGVkQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbGFuZy90b1BsYWluT2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2Jhc2VDb3B5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL29iamVjdC9rZXlzLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL3NoaW1LZXlzLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2NyZWF0ZUFzc2lnbmVyLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2JpbmRDYWxsYmFjay5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC91dGlsaXR5L2lkZW50aXR5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2lzSXRlcmF0ZWVDYWxsLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2Z1bmN0aW9uL3Jlc3RQYXJhbS5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvY29tbW9uL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvaW5wdXQvY2FtZXJhX2FjY2Vzcy5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvYW5hbHl0aWNzL3Jlc3VsdF9jb2xsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvbmZpZy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2lucHV0L2lucHV0X3N0cmVhbS5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvaW5wdXQvaW1hZ2VfbG9hZGVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9pbnB1dC9mcmFtZV9ncmFiYmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQ0N0Q3FCLENBQVk7Ozs7OztnREFDUixDQUF3Qjs7OzttREFDdEIsQ0FBMkI7Ozs7bURB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RUFBRTtBQUMxQixjQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM1QixxQkFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDNUIsS0FBSyxHQUFHLFVBQVUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUNyQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQ3JDLEtBQUssR0FBRyxVQUFVLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFDckMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUMzQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQzNDLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUM1QyxLQUFLLEdBQUcsVUFBVSxDQUFFLFlBQVksR0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQzFDLEtBQUssR0FBRyxVQUFVLENBQUUsWUFBWSxHQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FDMUMsS0FBSyxHQUFHLFVBQVUsQ0FBRSxZQUFZLEdBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQzNDLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FDOUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUM5QyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMs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QUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxD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LFdBQU0sRUFBRSxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUM7QUFDbEIsaUJBQVksRUFBRSxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUM7QUFDekIsa0JBQWEsRUFBRSxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUM7QUFDekQsaUJBQVksRUFBRSxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUM7QUFDeEQsbUJBQWMsRUFBRSxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUM7QUFDaEYsaUJBQVksRUFBRSxFQUFDLEtBQUssRUFBRSxDQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQ2YsRUFBQztBQUNGLG1CQUFjLEVBQUUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBQztBQUNoRSxzQkFBaUIsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUM7QUFDaEMsbUJBQWMsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVB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RUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQzdHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBQztBQUNwRix3QkFBbUIsRUFBRSxFQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUM1RyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQzlHLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FDakgsRUFBQztBQUNGLGFBQVEsRUFBRSxFQUFDLEtBQUssRUFB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O0FBQ3BCLGFBQUksWUFBWSxHQUFHLGFBQWEsQ0FBQyxVQUFVO2FBQ3ZDLEtBQUssR0FBRyxXQUFXLENBQUMsUUFBUSxFQUFFO2FBQzlCLE9BQU8sQ0FBQztBQUNaLGFBQUksS0FBSyxFQUFFO0FBQ1AsaUJBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUQsb0JBQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzdELGlCQUFJLFlBQVksRUFBQztBQUNiLDZDQUFRLCtCQUErQixDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7Y0FDbEUsTUFBTTtBQUNILDZDQUFRLFdBQVcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2NBQ3REO0FBQ0Qsb0JBQU8sSUFBSSxDQUFDO1VBQ2YsTUFBTTtBQUNILG9CQUFPLEtBQUssQ0FBQztVQUNoQjtNQUNKLENBQUM7O0FBRUYsVUFBSyxDQUFDLE9BQU8sR0FBRyxZQUFXO0FBQ3ZCLGdCQUFPLEtBQUssQ0FBQztNQUNoQixDQUFDOztBQUVGLFlBQU8sS0FBSyxDQUFDO0VBQ2hCLENBQUM7O3NCQUVhLFlBQVkiLCJmaWxlIjoicXVhZ2dhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgODE5YTI3OTA4ZTMwY2QzMThkMjVcbiAqKi8iLCJpbXBvcnQgVHlwZURlZnMgZnJvbSAnLi90eXBlZGVmcyc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuaW1wb3J0IEltYWdlV3JhcHBlciBmcm9tICcuL2NvbW1vbi9pbWFnZV93cmFwcGVyJztcclxuaW1wb3J0IEJhcmNvZGVMb2NhdG9yIGZyb20gJy4vbG9jYXRvci9iYXJjb2RlX2xvY2F0b3InO1xyXG5pbXBvcnQgQmFyY29kZURlY29kZXIgZnJvbSAnLi9kZWNvZGVyL2JhcmNvZGVfZGVjb2Rlcic7XHJcbmltcG9ydCBFdmVudHMgZnJvbSAnLi9jb21tb24vZXZlbnRzJztcclxuaW1wb3J0IENhbWVyYUFjY2VzcyBmcm9tICcuL2lucHV0L2NhbWVyYV9hY2Nlc3MnO1xyXG5pbXBvcnQgSW1hZ2VEZWJ1ZyBmcm9tICcuL2NvbW1vbi9pbWFnZV9kZWJ1Zyc7XHJcbmltcG9ydCB7dmVjMn0gZnJvbSAnZ2wtbWF0cml4JztcclxuaW1wb3J0IFJlc3VsdENvbGxlY3RvciBmcm9tICcuL2FuYWx5dGljcy9yZXN1bHRfY29sbGVjdG9yJztcclxuaW1wb3J0IENvbmZpZyBmcm9tICcuL2NvbmZpZy9jb25maWcnO1xyXG5cclxuY29uc3QgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L21lcmdlJyk7XHJcbmNvbnN0IElucHV0U3RyZWFtID0gcmVxdWlyZSgnLi9pbnB1dC9pbnB1dF9zdHJlYW0nKTtcclxuY29uc3QgRnJhbWVHcmFiYmVyID0gcmVxdWlyZSgnLi9pbnB1dC9mcmFtZV9ncmFiYmVyJyk7XHJcblxyXG52YXIgX2lucHV0U3RyZWFtLFxyXG4gICAgX2ZyYW1lZ3JhYmJlcixcclxuICAgIF9zdG9wcGVkLFxyXG4gICAgX2NhbnZhc0NvbnRhaW5lciA9IHtcclxuICAgICAgICBjdHg6IHtcclxuICAgICAgICAgICAgaW1hZ2U6IG51bGwsXHJcbiAgICAgICAgICAgIG92ZXJsYXk6IG51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRvbToge1xyXG4gICAgICAgICAgICBpbWFnZTogbnVsbCxcclxuICAgICAgICAgICAgb3ZlcmxheTogbnVsbFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBfaW5wdXRJbWFnZVdyYXBwZXIsXHJcbiAgICBfYm94U2l6ZSxcclxuICAgIF9kZWNvZGVyLFxyXG4gICAgX3dvcmtlclBvb2wgPSBbXSxcclxuICAgIF9vblVJVGhyZWFkID0gdHJ1ZSxcclxuICAgIF9yZXN1bHRDb2xsZWN0b3IsXHJcbiAgICBfY29uZmlnID0ge307XHJcblxyXG5mdW5jdGlvbiBpbml0aWFsaXplRGF0YShpbWFnZVdyYXBwZXIpIHtcclxuICAgIGluaXRCdWZmZXJzKGltYWdlV3JhcHBlcik7XHJcbiAgICBfZGVjb2RlciA9IEJhcmNvZGVEZWNvZGVyLmNyZWF0ZShfY29uZmlnLmRlY29kZXIsIF9pbnB1dEltYWdlV3JhcHBlcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRJbnB1dFN0cmVhbShjYikge1xyXG4gICAgdmFyIHZpZGVvO1xyXG4gICAgaWYgKF9jb25maWcuaW5wdXRTdHJlYW0udHlwZSA9PT0gXCJWaWRlb1N0cmVhbVwiKSB7XHJcbiAgICAgICAgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidmlkZW9cIik7XHJcbiAgICAgICAgX2lucHV0U3RyZWFtID0gSW5wdXRTdHJlYW0uY3JlYXRlVmlkZW9TdHJlYW0odmlkZW8pO1xyXG4gICAgfSBlbHNlIGlmIChfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09IFwiSW1hZ2VTdHJlYW1cIikge1xyXG4gICAgICAgIF9pbnB1dFN0cmVhbSA9IElucHV0U3RyZWFtLmNyZWF0ZUltYWdlU3RyZWFtKCk7XHJcbiAgICB9IGVsc2UgaWYgKF9jb25maWcuaW5wdXRTdHJlYW0udHlwZSA9PT0gXCJMaXZlU3RyZWFtXCIpIHtcclxuICAgICAgICB2YXIgJHZpZXdwb3J0ID0gZ2V0Vmlld1BvcnQoKTtcclxuICAgICAgICBpZiAoJHZpZXdwb3J0KSB7XHJcbiAgICAgICAgICAgIHZpZGVvID0gJHZpZXdwb3J0LnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKTtcclxuICAgICAgICAgICAgaWYgKCF2aWRlbykge1xyXG4gICAgICAgICAgICAgICAgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidmlkZW9cIik7XHJcbiAgICAgICAgICAgICAgICAkdmlld3BvcnQuYXBwZW5kQ2hpbGQodmlkZW8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9pbnB1dFN0cmVhbSA9IElucHV0U3RyZWFtLmNyZWF0ZUxpdmVTdHJlYW0odmlkZW8pO1xyXG4gICAgICAgIENhbWVyYUFjY2Vzcy5yZXF1ZXN0KHZpZGVvLCBfY29uZmlnLmlucHV0U3RyZWFtLmNvbnN0cmFpbnRzLCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgaWYgKCFlcnIpIHtcclxuICAgICAgICAgICAgICAgIF9pbnB1dFN0cmVhbS50cmlnZ2VyKFwiY2FucmVjb3JkXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNiKGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfaW5wdXRTdHJlYW0uc2V0QXR0cmlidXRlKFwicHJlbG9hZFwiLCBcImF1dG9cIik7XHJcbiAgICBfaW5wdXRTdHJlYW0uc2V0QXR0cmlidXRlKFwiYXV0b3BsYXlcIiwgdHJ1ZSk7XHJcbiAgICBfaW5wdXRTdHJlYW0uc2V0SW5wdXRTdHJlYW0oX2NvbmZpZy5pbnB1dFN0cmVhbSk7XHJcbiAgICBfaW5wdXRTdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcImNhbnJlY29yZFwiLCBjYW5SZWNvcmQuYmluZCh1bmRlZmluZWQsIGNiKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFZpZXdQb3J0KCkge1xyXG4gICAgdmFyIHRhcmdldCA9IF9jb25maWcuaW5wdXRTdHJlYW0udGFyZ2V0O1xyXG4gICAgLy8gQ2hlY2sgaWYgdGFyZ2V0IGlzIGFscmVhZHkgYSBET00gZWxlbWVudFxyXG4gICAgaWYgKHRhcmdldCAmJiB0YXJnZXQubm9kZU5hbWUgJiYgdGFyZ2V0Lm5vZGVUeXBlID09PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gVXNlICcjaW50ZXJhY3RpdmUudmlld3BvcnQnIGFzIGEgZmFsbGJhY2sgc2VsZWN0b3IgKGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5KVxyXG4gICAgICAgIHZhciBzZWxlY3RvciA9IHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnID8gdGFyZ2V0IDogJyNpbnRlcmFjdGl2ZS52aWV3cG9ydCc7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjYW5SZWNvcmQoY2IpIHtcclxuICAgIEJhcmNvZGVMb2NhdG9yLmNoZWNrSW1hZ2VDb25zdHJhaW50cyhfaW5wdXRTdHJlYW0sIF9jb25maWcubG9jYXRvcik7XHJcbiAgICBpbml0Q2FudmFzKF9jb25maWcpO1xyXG4gICAgX2ZyYW1lZ3JhYmJlciA9IEZyYW1lR3JhYmJlci5jcmVhdGUoX2lucHV0U3RyZWFtLCBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZSk7XHJcblxyXG4gICAgaWYgKF9jb25maWcubnVtT2ZXb3JrZXJzID4gMCkge1xyXG4gICAgICAgIGluaXRXb3JrZXJzKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldvcmtlcnMgY3JlYXRlZFwiKTtcclxuICAgICAgICAgICAgcmVhZHkoY2IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpbml0aWFsaXplRGF0YSgpO1xyXG4gICAgICAgIHJlYWR5KGNiKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVhZHkoY2Ipe1xyXG4gICAgX2lucHV0U3RyZWFtLnBsYXkoKTtcclxuICAgIGNiKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRDYW52YXMoKSB7XHJcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgdmFyICR2aWV3cG9ydCA9IGdldFZpZXdQb3J0KCk7XHJcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzLmltZ0J1ZmZlclwiKTtcclxuICAgICAgICBpZiAoIV9jYW52YXNDb250YWluZXIuZG9tLmltYWdlKSB7XHJcbiAgICAgICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UuY2xhc3NOYW1lID0gXCJpbWdCdWZmZXJcIjtcclxuICAgICAgICAgICAgaWYgKCR2aWV3cG9ydCAmJiBfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09IFwiSW1hZ2VTdHJlYW1cIikge1xyXG4gICAgICAgICAgICAgICAgJHZpZXdwb3J0LmFwcGVuZENoaWxkKF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmN0eC5pbWFnZSA9IF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZS53aWR0aCA9IF9pbnB1dFN0cmVhbS5nZXRDYW52YXNTaXplKCkueDtcclxuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZS5oZWlnaHQgPSBfaW5wdXRTdHJlYW0uZ2V0Q2FudmFzU2l6ZSgpLnk7XHJcblxyXG4gICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzLmRyYXdpbmdCdWZmZXJcIik7XHJcbiAgICAgICAgaWYgKCFfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5KSB7XHJcbiAgICAgICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5LmNsYXNzTmFtZSA9IFwiZHJhd2luZ0J1ZmZlclwiO1xyXG4gICAgICAgICAgICBpZiAoJHZpZXdwb3J0KSB7XHJcbiAgICAgICAgICAgICAgICAkdmlld3BvcnQuYXBwZW5kQ2hpbGQoX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGNsZWFyRml4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpO1xyXG4gICAgICAgICAgICBjbGVhckZpeC5zZXRBdHRyaWJ1dGUoXCJjbGVhclwiLCBcImFsbFwiKTtcclxuICAgICAgICAgICAgaWYgKCR2aWV3cG9ydCkge1xyXG4gICAgICAgICAgICAgICAgJHZpZXdwb3J0LmFwcGVuZENoaWxkKGNsZWFyRml4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmN0eC5vdmVybGF5ID0gX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheS53aWR0aCA9IF9pbnB1dFN0cmVhbS5nZXRDYW52YXNTaXplKCkueDtcclxuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5LmhlaWdodCA9IF9pbnB1dFN0cmVhbS5nZXRDYW52YXNTaXplKCkueTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdEJ1ZmZlcnMoaW1hZ2VXcmFwcGVyKSB7XHJcbiAgICBpZiAoaW1hZ2VXcmFwcGVyKSB7XHJcbiAgICAgICAgX2lucHV0SW1hZ2VXcmFwcGVyID0gaW1hZ2VXcmFwcGVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBfaW5wdXRJbWFnZVdyYXBwZXIgPSBuZXcgSW1hZ2VXcmFwcGVyKHtcclxuICAgICAgICAgICAgeDogX2lucHV0U3RyZWFtLmdldFdpZHRoKCksXHJcbiAgICAgICAgICAgIHk6IF9pbnB1dFN0cmVhbS5nZXRIZWlnaHQoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKF9pbnB1dEltYWdlV3JhcHBlci5zaXplKTtcclxuICAgIF9ib3hTaXplID0gW1xyXG4gICAgICAgIHZlYzIuY2xvbmUoWzAsIDBdKSxcclxuICAgICAgICB2ZWMyLmNsb25lKFswLCBfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS55XSksXHJcbiAgICAgICAgdmVjMi5jbG9uZShbX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUueCwgX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUueV0pLFxyXG4gICAgICAgIHZlYzIuY2xvbmUoW19pbnB1dEltYWdlV3JhcHBlci5zaXplLngsIDBdKVxyXG4gICAgXTtcclxuICAgIEJhcmNvZGVMb2NhdG9yLmluaXQoX2lucHV0SW1hZ2VXcmFwcGVyLCBfY29uZmlnLmxvY2F0b3IpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRCb3VuZGluZ0JveGVzKCkge1xyXG4gICAgaWYgKF9jb25maWcubG9jYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIEJhcmNvZGVMb2NhdG9yLmxvY2F0ZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gW1tcclxuICAgICAgICAgICAgdmVjMi5jbG9uZShfYm94U2l6ZVswXSksXHJcbiAgICAgICAgICAgIHZlYzIuY2xvbmUoX2JveFNpemVbMV0pLFxyXG4gICAgICAgICAgICB2ZWMyLmNsb25lKF9ib3hTaXplWzJdKSxcclxuICAgICAgICAgICAgdmVjMi5jbG9uZShfYm94U2l6ZVszXSldXTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdHJhbnNmb3JtUmVzdWx0KHJlc3VsdCkge1xyXG4gICAgdmFyIHRvcFJpZ2h0ID0gX2lucHV0U3RyZWFtLmdldFRvcFJpZ2h0KCksXHJcbiAgICAgICAgeE9mZnNldCA9IHRvcFJpZ2h0LngsXHJcbiAgICAgICAgeU9mZnNldCA9IHRvcFJpZ2h0LnksXHJcbiAgICAgICAgaTtcclxuXHJcbiAgICBpZiAoeE9mZnNldCA9PT0gMCAmJiB5T2Zmc2V0ID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXN1bHQuYmFyY29kZXMpIHtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcmVzdWx0LmJhcmNvZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybVJlc3VsdChyZXN1bHQuYmFyY29kZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzdWx0LmxpbmUgJiYgcmVzdWx0LmxpbmUubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgbW92ZUxpbmUocmVzdWx0LmxpbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXN1bHQuYm94KSB7XHJcbiAgICAgICAgbW92ZUJveChyZXN1bHQuYm94KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzdWx0LmJveGVzICYmIHJlc3VsdC5ib3hlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHJlc3VsdC5ib3hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBtb3ZlQm94KHJlc3VsdC5ib3hlc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vdmVCb3goYm94KSB7XHJcbiAgICAgICAgdmFyIGNvcm5lciA9IGJveC5sZW5ndGg7XHJcblxyXG4gICAgICAgIHdoaWxlIChjb3JuZXItLSkge1xyXG4gICAgICAgICAgICBib3hbY29ybmVyXVswXSArPSB4T2Zmc2V0O1xyXG4gICAgICAgICAgICBib3hbY29ybmVyXVsxXSArPSB5T2Zmc2V0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb3ZlTGluZShsaW5lKSB7XHJcbiAgICAgICAgbGluZVswXS54ICs9IHhPZmZzZXQ7XHJcbiAgICAgICAgbGluZVswXS55ICs9IHlPZmZzZXQ7XHJcbiAgICAgICAgbGluZVsxXS54ICs9IHhPZmZzZXQ7XHJcbiAgICAgICAgbGluZVsxXS55ICs9IHlPZmZzZXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFJlc3VsdCAocmVzdWx0LCBpbWFnZURhdGEpIHtcclxuICAgIGlmICghaW1hZ2VEYXRhIHx8ICFfcmVzdWx0Q29sbGVjdG9yKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXN1bHQuYmFyY29kZXMpIHtcclxuICAgICAgICByZXN1bHQuYmFyY29kZXMuZmlsdGVyKGJhcmNvZGUgPT4gYmFyY29kZS5jb2RlUmVzdWx0KVxyXG4gICAgICAgICAgICAuZm9yRWFjaChiYXJjb2RlID0+IGFkZFJlc3VsdChiYXJjb2RlLCBpbWFnZURhdGEpKTtcclxuICAgIH0gZWxzZSBpZiAocmVzdWx0LmNvZGVSZXN1bHQpIHtcclxuICAgICAgICBfcmVzdWx0Q29sbGVjdG9yLmFkZFJlc3VsdChpbWFnZURhdGEsIF9pbnB1dFN0cmVhbS5nZXRDYW52YXNTaXplKCksIHJlc3VsdC5jb2RlUmVzdWx0KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaGFzQ29kZVJlc3VsdCAocmVzdWx0KSB7XHJcbiAgICByZXR1cm4gcmVzdWx0ICYmIChyZXN1bHQuYmFyY29kZXMgP1xyXG4gICAgICByZXN1bHQuYmFyY29kZXMuc29tZShiYXJjb2RlID0+IGJhcmNvZGUuY29kZVJlc3VsdCkgOlxyXG4gICAgICByZXN1bHQuY29kZVJlc3VsdCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHB1Ymxpc2hSZXN1bHQocmVzdWx0LCBpbWFnZURhdGEpIHtcclxuICAgIGNvbnN0IHJlc3VsdFRvUHVibGlzaCA9IHJlc3VsdCAmJiAocmVzdWx0LmJhcmNvZGVzIHx8IHJlc3VsdCk7XHJcblxyXG4gICAgaWYgKHJlc3VsdCAmJiBfb25VSVRocmVhZCkge1xyXG4gICAgICAgIHRyYW5zZm9ybVJlc3VsdChyZXN1bHQpO1xyXG4gICAgICAgIGFkZFJlc3VsdChyZXN1bHQsIGltYWdlRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgRXZlbnRzLnB1Ymxpc2goXCJwcm9jZXNzZWRcIiwgcmVzdWx0VG9QdWJsaXNoKTtcclxuICAgIGlmIChoYXNDb2RlUmVzdWx0KHJlc3VsdCkpIHtcclxuICAgICAgICBFdmVudHMucHVibGlzaChcImRldGVjdGVkXCIsIHJlc3VsdFRvUHVibGlzaCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvY2F0ZUFuZERlY29kZSgpIHtcclxuICAgIHZhciByZXN1bHQsXHJcbiAgICAgICAgYm94ZXM7XHJcblxyXG4gICAgYm94ZXMgPSBnZXRCb3VuZGluZ0JveGVzKCk7XHJcbiAgICBpZiAoYm94ZXMpIHtcclxuICAgICAgICByZXN1bHQgPSBfZGVjb2Rlci5kZWNvZGVGcm9tQm91bmRpbmdCb3hlcyhib3hlcyk7XHJcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0IHx8IHt9O1xyXG4gICAgICAgIHJlc3VsdC5ib3hlcyA9IGJveGVzO1xyXG4gICAgICAgIHB1Ymxpc2hSZXN1bHQocmVzdWx0LCBfaW5wdXRJbWFnZVdyYXBwZXIuZGF0YSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHB1Ymxpc2hSZXN1bHQoKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlKCkge1xyXG4gICAgdmFyIGF2YWlsYWJsZVdvcmtlcjtcclxuXHJcbiAgICBpZiAoX29uVUlUaHJlYWQpIHtcclxuICAgICAgICBpZiAoX3dvcmtlclBvb2wubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBhdmFpbGFibGVXb3JrZXIgPSBfd29ya2VyUG9vbC5maWx0ZXIoZnVuY3Rpb24od29ya2VyVGhyZWFkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIXdvcmtlclRocmVhZC5idXN5O1xyXG4gICAgICAgICAgICB9KVswXTtcclxuICAgICAgICAgICAgaWYgKGF2YWlsYWJsZVdvcmtlcikge1xyXG4gICAgICAgICAgICAgICAgX2ZyYW1lZ3JhYmJlci5hdHRhY2hEYXRhKGF2YWlsYWJsZVdvcmtlci5pbWFnZURhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBhbGwgd29ya2VycyBhcmUgYnVzeVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgX2ZyYW1lZ3JhYmJlci5hdHRhY2hEYXRhKF9pbnB1dEltYWdlV3JhcHBlci5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKF9mcmFtZWdyYWJiZXIuZ3JhYigpKSB7XHJcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGVXb3JrZXIpIHtcclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZVdvcmtlci5idXN5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZVdvcmtlci53b3JrZXIucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNtZDogJ3Byb2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlRGF0YTogYXZhaWxhYmxlV29ya2VyLmltYWdlRGF0YVxyXG4gICAgICAgICAgICAgICAgfSwgW2F2YWlsYWJsZVdvcmtlci5pbWFnZURhdGEuYnVmZmVyXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGVBbmREZWNvZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbG9jYXRlQW5kRGVjb2RlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YXJ0KCkge1xyXG4gICAgX3N0b3BwZWQgPSBmYWxzZTtcclxuICAgICggZnVuY3Rpb24gZnJhbWUoKSB7XHJcbiAgICAgICAgaWYgKCFfc3RvcHBlZCkge1xyXG4gICAgICAgICAgICB1cGRhdGUoKTtcclxuICAgICAgICAgICAgaWYgKF9vblVJVGhyZWFkICYmIF9jb25maWcuaW5wdXRTdHJlYW0udHlwZSA9PT0gXCJMaXZlU3RyZWFtXCIpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lKGZyYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0oKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRXb3JrZXJzKGNiKSB7XHJcbiAgICB2YXIgaTtcclxuICAgIF93b3JrZXJQb29sID0gW107XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IF9jb25maWcubnVtT2ZXb3JrZXJzOyBpKyspIHtcclxuICAgICAgICBpbml0V29ya2VyKHdvcmtlckluaXRpYWxpemVkKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB3b3JrZXJJbml0aWFsaXplZCh3b3JrZXJUaHJlYWQpIHtcclxuICAgICAgICBfd29ya2VyUG9vbC5wdXNoKHdvcmtlclRocmVhZCk7XHJcbiAgICAgICAgaWYgKF93b3JrZXJQb29sLmxlbmd0aCA+PSBfY29uZmlnLm51bU9mV29ya2Vycyl7XHJcbiAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0V29ya2VyKGNiKSB7XHJcbiAgICB2YXIgYmxvYlVSTCxcclxuICAgICAgICB3b3JrZXJUaHJlYWQgPSB7XHJcbiAgICAgICAgICAgIHdvcmtlcjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBpbWFnZURhdGE6IG5ldyBVaW50OEFycmF5KF9pbnB1dFN0cmVhbS5nZXRXaWR0aCgpICogX2lucHV0U3RyZWFtLmdldEhlaWdodCgpKSxcclxuICAgICAgICAgICAgYnVzeTogdHJ1ZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgYmxvYlVSTCA9IGdlbmVyYXRlV29ya2VyQmxvYigpO1xyXG4gICAgd29ya2VyVGhyZWFkLndvcmtlciA9IG5ldyBXb3JrZXIoYmxvYlVSTCk7XHJcblxyXG4gICAgd29ya2VyVGhyZWFkLndvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKGUuZGF0YS5ldmVudCA9PT0gJ2luaXRpYWxpemVkJykge1xyXG4gICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGJsb2JVUkwpO1xyXG4gICAgICAgICAgICB3b3JrZXJUaHJlYWQuYnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB3b3JrZXJUaHJlYWQuaW1hZ2VEYXRhID0gbmV3IFVpbnQ4QXJyYXkoZS5kYXRhLmltYWdlRGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV29ya2VyIGluaXRpYWxpemVkXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2Iod29ya2VyVGhyZWFkKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGUuZGF0YS5ldmVudCA9PT0gJ3Byb2Nlc3NlZCcpIHtcclxuICAgICAgICAgICAgd29ya2VyVGhyZWFkLmltYWdlRGF0YSA9IG5ldyBVaW50OEFycmF5KGUuZGF0YS5pbWFnZURhdGEpO1xyXG4gICAgICAgICAgICB3b3JrZXJUaHJlYWQuYnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBwdWJsaXNoUmVzdWx0KGUuZGF0YS5yZXN1bHQsIHdvcmtlclRocmVhZC5pbWFnZURhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZS5kYXRhLmV2ZW50ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV29ya2VyIGVycm9yOiBcIiArIGUuZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHdvcmtlclRocmVhZC53b3JrZXIucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgIGNtZDogJ2luaXQnLFxyXG4gICAgICAgIHNpemU6IHt4OiBfaW5wdXRTdHJlYW0uZ2V0V2lkdGgoKSwgeTogX2lucHV0U3RyZWFtLmdldEhlaWdodCgpfSxcclxuICAgICAgICBpbWFnZURhdGE6IHdvcmtlclRocmVhZC5pbWFnZURhdGEsXHJcbiAgICAgICAgY29uZmlnOiBfY29uZmlnXHJcbiAgICB9LCBbd29ya2VyVGhyZWFkLmltYWdlRGF0YS5idWZmZXJdKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHdvcmtlckludGVyZmFjZShmYWN0b3J5KSB7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiovXHJcbiAgICBpZiAoZmFjdG9yeSkge1xyXG4gICAgICAgIHZhciBRdWFnZ2EgPSBmYWN0b3J5KCk7XHJcbiAgICAgICAgaWYgKCFRdWFnZ2EpIHtcclxuICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7J2V2ZW50JzogJ2Vycm9yJywgbWVzc2FnZTogJ1F1YWdnYSBjb3VsZCBub3QgYmUgY3JlYXRlZCd9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZhciBpbWFnZVdyYXBwZXI7XHJcblxyXG4gICAgc2VsZi5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKGUuZGF0YS5jbWQgPT09ICdpbml0Jykge1xyXG4gICAgICAgICAgICB2YXIgY29uZmlnID0gZS5kYXRhLmNvbmZpZztcclxuICAgICAgICAgICAgY29uZmlnLm51bU9mV29ya2VycyA9IDA7XHJcbiAgICAgICAgICAgIGltYWdlV3JhcHBlciA9IG5ldyBRdWFnZ2EuSW1hZ2VXcmFwcGVyKHtcclxuICAgICAgICAgICAgICAgIHg6IGUuZGF0YS5zaXplLngsXHJcbiAgICAgICAgICAgICAgICB5OiBlLmRhdGEuc2l6ZS55XHJcbiAgICAgICAgICAgIH0sIG5ldyBVaW50OEFycmF5KGUuZGF0YS5pbWFnZURhdGEpKTtcclxuICAgICAgICAgICAgUXVhZ2dhLmluaXQoY29uZmlnLCByZWFkeSwgaW1hZ2VXcmFwcGVyKTtcclxuICAgICAgICAgICAgUXVhZ2dhLm9uUHJvY2Vzc2VkKG9uUHJvY2Vzc2VkKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGUuZGF0YS5jbWQgPT09ICdwcm9jZXNzJykge1xyXG4gICAgICAgICAgICBpbWFnZVdyYXBwZXIuZGF0YSA9IG5ldyBVaW50OEFycmF5KGUuZGF0YS5pbWFnZURhdGEpO1xyXG4gICAgICAgICAgICBRdWFnZ2Euc3RhcnQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGUuZGF0YS5jbWQgPT09ICdzZXRSZWFkZXJzJykge1xyXG4gICAgICAgICAgICBRdWFnZ2Euc2V0UmVhZGVycyhlLmRhdGEucmVhZGVycyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBvblByb2Nlc3NlZChyZXN1bHQpIHtcclxuICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHtcclxuICAgICAgICAgICAgJ2V2ZW50JzogJ3Byb2Nlc3NlZCcsXHJcbiAgICAgICAgICAgIGltYWdlRGF0YTogaW1hZ2VXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0XHJcbiAgICAgICAgfSwgW2ltYWdlV3JhcHBlci5kYXRhLmJ1ZmZlcl0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlYWR5KCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7J2V2ZW50JzogJ2luaXRpYWxpemVkJywgaW1hZ2VEYXRhOiBpbWFnZVdyYXBwZXIuZGF0YX0sIFtpbWFnZVdyYXBwZXIuZGF0YS5idWZmZXJdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlV29ya2VyQmxvYigpIHtcclxuICAgIHZhciBibG9iLFxyXG4gICAgICAgIGZhY3RvcnlTb3VyY2U7XHJcblxyXG4gICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xyXG4gICAgaWYgKHR5cGVvZiBfX2ZhY3RvcnlTb3VyY2VfXyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBmYWN0b3J5U291cmNlID0gX19mYWN0b3J5U291cmNlX187IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcclxuICAgIH1cclxuICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXHJcblxyXG4gICAgYmxvYiA9IG5ldyBCbG9iKFsnKCcgKyB3b3JrZXJJbnRlcmZhY2UudG9TdHJpbmcoKSArICcpKCcgKyBmYWN0b3J5U291cmNlICsgJyk7J10sXHJcbiAgICAgICAge3R5cGU6ICd0ZXh0L2phdmFzY3JpcHQnfSk7XHJcblxyXG4gICAgcmV0dXJuIHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRSZWFkZXJzKHJlYWRlcnMpIHtcclxuICAgIGlmIChfZGVjb2Rlcikge1xyXG4gICAgICAgIF9kZWNvZGVyLnNldFJlYWRlcnMocmVhZGVycyk7XHJcbiAgICB9IGVsc2UgaWYgKF9vblVJVGhyZWFkICYmIF93b3JrZXJQb29sLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBfd29ya2VyUG9vbC5mb3JFYWNoKGZ1bmN0aW9uKHdvcmtlclRocmVhZCkge1xyXG4gICAgICAgICAgICB3b3JrZXJUaHJlYWQud29ya2VyLnBvc3RNZXNzYWdlKHtjbWQ6ICdzZXRSZWFkZXJzJywgcmVhZGVyczogcmVhZGVyc30pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBpbml0OiBmdW5jdGlvbihjb25maWcsIGNiLCBpbWFnZVdyYXBwZXIpIHtcclxuICAgICAgICBfY29uZmlnID0gbWVyZ2Uoe30sIENvbmZpZywgY29uZmlnKTtcclxuICAgICAgICBpZiAoaW1hZ2VXcmFwcGVyKSB7XHJcbiAgICAgICAgICAgIF9vblVJVGhyZWFkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGluaXRpYWxpemVEYXRhKGltYWdlV3JhcHBlcik7XHJcbiAgICAgICAgICAgIHJldHVybiBjYigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGluaXRJbnB1dFN0cmVhbShjYik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBzdGFydCgpO1xyXG4gICAgfSxcclxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIF9zdG9wcGVkID0gdHJ1ZTtcclxuICAgICAgICBfd29ya2VyUG9vbC5mb3JFYWNoKGZ1bmN0aW9uKHdvcmtlclRocmVhZCkge1xyXG4gICAgICAgICAgICB3b3JrZXJUaHJlYWQud29ya2VyLnRlcm1pbmF0ZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldvcmtlciB0ZXJtaW5hdGVkIVwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBfd29ya2VyUG9vbC5sZW5ndGggPSAwO1xyXG4gICAgICAgIGlmIChfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09IFwiTGl2ZVN0cmVhbVwiKSB7XHJcbiAgICAgICAgICAgIENhbWVyYUFjY2Vzcy5yZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIF9pbnB1dFN0cmVhbS5jbGVhckV2ZW50SGFuZGxlcnMoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGF1c2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIF9zdG9wcGVkID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBvbkRldGVjdGVkOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgIEV2ZW50cy5zdWJzY3JpYmUoXCJkZXRlY3RlZFwiLCBjYWxsYmFjayk7XHJcbiAgICB9LFxyXG4gICAgb2ZmRGV0ZWN0ZWQ6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgRXZlbnRzLnVuc3Vic2NyaWJlKFwiZGV0ZWN0ZWRcIiwgY2FsbGJhY2spO1xyXG4gICAgfSxcclxuICAgIG9uUHJvY2Vzc2VkOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgIEV2ZW50cy5zdWJzY3JpYmUoXCJwcm9jZXNzZWRcIiwgY2FsbGJhY2spO1xyXG4gICAgfSxcclxuICAgIG9mZlByb2Nlc3NlZDogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuICAgICAgICBFdmVudHMudW5zdWJzY3JpYmUoXCJwcm9jZXNzZWRcIiwgY2FsbGJhY2spO1xyXG4gICAgfSxcclxuICAgIHNldFJlYWRlcnM6IGZ1bmN0aW9uKHJlYWRlcnMpIHtcclxuICAgICAgICBzZXRSZWFkZXJzKHJlYWRlcnMpO1xyXG4gICAgfSxcclxuICAgIHJlZ2lzdGVyUmVzdWx0Q29sbGVjdG9yOiBmdW5jdGlvbihyZXN1bHRDb2xsZWN0b3IpIHtcclxuICAgICAgICBpZiAocmVzdWx0Q29sbGVjdG9yICYmIHR5cGVvZiByZXN1bHRDb2xsZWN0b3IuYWRkUmVzdWx0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIF9yZXN1bHRDb2xsZWN0b3IgPSByZXN1bHRDb2xsZWN0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNhbnZhczogX2NhbnZhc0NvbnRhaW5lcixcclxuICAgIGRlY29kZVNpbmdsZTogZnVuY3Rpb24oY29uZmlnLCByZXN1bHRDYWxsYmFjaykge1xyXG4gICAgICAgIGNvbmZpZyA9IG1lcmdlKHtcclxuICAgICAgICAgICAgaW5wdXRTdHJlYW06IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiSW1hZ2VTdHJlYW1cIixcclxuICAgICAgICAgICAgICAgIHNlcXVlbmNlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNpemU6IDgwMCxcclxuICAgICAgICAgICAgICAgIHNyYzogY29uZmlnLnNyY1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBudW1PZldvcmtlcnM6IDEsXHJcbiAgICAgICAgICAgIGxvY2F0b3I6IHtcclxuICAgICAgICAgICAgICAgIGhhbGZTYW1wbGU6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBjb25maWcpO1xyXG4gICAgICAgIHRoaXMuaW5pdChjb25maWcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBFdmVudHMub25jZShcInByb2Nlc3NlZFwiLCBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIF9zdG9wcGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdENhbGxiYWNrLmNhbGwobnVsbCwgcmVzdWx0KTtcclxuICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHN0YXJ0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgSW1hZ2VXcmFwcGVyOiBJbWFnZVdyYXBwZXIsXHJcbiAgICBJbWFnZURlYnVnOiBJbWFnZURlYnVnLFxyXG4gICAgUmVzdWx0Q29sbGVjdG9yOiBSZXN1bHRDb2xsZWN0b3JcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvcXVhZ2dhLmpzXG4gKiovIiwiLypcclxuICogdHlwZWRlZnMuanNcclxuICogTm9ybWFsaXplcyBicm93c2VyLXNwZWNpZmljIHByZWZpeGVzXHJcbiAqL1xyXG5cclxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoLyogZnVuY3Rpb24gRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgKi8gY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLmdldFVzZXJNZWRpYSB8fFxyXG4gICAgICAgIG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEgfHwgbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3IubXNHZXRVc2VyTWVkaWE7XHJcbiAgICB3aW5kb3cuVVJMID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMIHx8IHdpbmRvdy5tb3pVUkwgfHwgd2luZG93Lm1zVVJMO1xyXG59XHJcbk1hdGguaW11bCA9IE1hdGguaW11bCB8fCBmdW5jdGlvbihhLCBiKSB7XHJcbiAgICB2YXIgYWggPSAoYSA+Pj4gMTYpICYgMHhmZmZmLFxyXG4gICAgICAgIGFsID0gYSAmIDB4ZmZmZixcclxuICAgICAgICBiaCA9IChiID4+PiAxNikgJiAweGZmZmYsXHJcbiAgICAgICAgYmwgPSBiICYgMHhmZmZmO1xyXG4gICAgLy8gdGhlIHNoaWZ0IGJ5IDAgZml4ZXMgdGhlIHNpZ24gb24gdGhlIGhpZ2ggcGFydFxyXG4gICAgLy8gdGhlIGZpbmFsIHwwIGNvbnZlcnRzIHRoZSB1bnNpZ25lZCB2YWx1ZSBpbnRvIGEgc2lnbmVkIHZhbHVlXHJcbiAgICByZXR1cm4gKChhbCAqIGJsKSArICgoKGFoICogYmwgKyBhbCAqIGJoKSA8PCAxNikgPj4+IDApIHwgMCk7XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL3R5cGVkZWZzLmpzXG4gKiovIiwiaW1wb3J0IFN1YkltYWdlIGZyb20gJy4vc3ViSW1hZ2UnO1xyXG5pbXBvcnQgQ1ZVdGlscyBmcm9tICcuLi9jb21tb24vY3ZfdXRpbHMnO1xyXG5pbXBvcnQgQXJyYXlIZWxwZXIgZnJvbSAnLi4vY29tbW9uL2FycmF5X2hlbHBlcic7XHJcbmltcG9ydCB7dmVjMn0gZnJvbSAnZ2wtbWF0cml4JztcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGEgYmFzaWMgaW1hZ2UgY29tYmluaW5nIHRoZSBkYXRhIGFuZCBzaXplLlxyXG4gKiBJbiBhZGRpdGlvbiwgc29tZSBtZXRob2RzIGZvciBtYW5pcHVsYXRpb24gYXJlIGNvbnRhaW5lZC5cclxuICogQHBhcmFtIHNpemUge3gseX0gVGhlIHNpemUgb2YgdGhlIGltYWdlIGluIHBpeGVsXHJcbiAqIEBwYXJhbSBkYXRhIHtBcnJheX0gSWYgZ2l2ZW4sIGEgZmxhdCBhcnJheSBjb250YWluaW5nIHRoZSBwaXhlbCBkYXRhXHJcbiAqIEBwYXJhbSBBcnJheVR5cGUge1R5cGV9IElmIGdpdmVuLCB0aGUgZGVzaXJlZCBEYXRhVHlwZSBvZiB0aGUgQXJyYXkgKG1heSBiZSB0eXBlZC9ub24tdHlwZWQpXHJcbiAqIEBwYXJhbSBpbml0aWFsaXplIHtCb29sZWFufSBJbmRpY2F0aW5nIGlmIHRoZSBhcnJheSBzaG91bGQgYmUgaW5pdGlhbGl6ZWQgb24gY3JlYXRpb24uXHJcbiAqIEByZXR1cm5zIHtJbWFnZVdyYXBwZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiBJbWFnZVdyYXBwZXIoc2l6ZSwgZGF0YSwgQXJyYXlUeXBlLCBpbml0aWFsaXplKSB7XHJcbiAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICBpZiAoQXJyYXlUeXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IG5ldyBBcnJheVR5cGUoc2l6ZS54ICogc2l6ZS55KTtcclxuICAgICAgICAgICAgaWYgKEFycmF5VHlwZSA9PT0gQXJyYXkgJiYgaW5pdGlhbGl6ZSkge1xyXG4gICAgICAgICAgICAgICAgQXJyYXlIZWxwZXIuaW5pdCh0aGlzLmRhdGEsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZS54ICogc2l6ZS55KTtcclxuICAgICAgICAgICAgaWYgKFVpbnQ4QXJyYXkgPT09IEFycmF5ICYmIGluaXRpYWxpemUpIHtcclxuICAgICAgICAgICAgICAgIEFycmF5SGVscGVyLmluaXQodGhpcy5kYXRhLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgIH1cclxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiB0ZXN0cyBpZiBhIHBvc2l0aW9uIGlzIHdpdGhpbiB0aGUgaW1hZ2Ugd2l0aCBhIGdpdmVuIG9mZnNldFxyXG4gKiBAcGFyYW0gaW1nUmVmIHt4LCB5fSBUaGUgbG9jYXRpb24gdG8gdGVzdFxyXG4gKiBAcGFyYW0gYm9yZGVyIE51bWJlciB0aGUgcGFkZGluZyB2YWx1ZSBpbiBwaXhlbFxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpZiBsb2NhdGlvbiBpbnNpZGUgdGhlIGltYWdlJ3MgYm9yZGVyLCBmYWxzZSBvdGhlcndpc2VcclxuICogQHNlZSBjdmQvaW1hZ2UuaFxyXG4gKi9cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5pbkltYWdlV2l0aEJvcmRlciA9IGZ1bmN0aW9uKGltZ1JlZiwgYm9yZGVyKSB7XHJcbiAgICByZXR1cm4gKGltZ1JlZi54ID49IGJvcmRlcilcclxuICAgICAgICAmJiAoaW1nUmVmLnkgPj0gYm9yZGVyKVxyXG4gICAgICAgICYmIChpbWdSZWYueCA8ICh0aGlzLnNpemUueCAtIGJvcmRlcikpXHJcbiAgICAgICAgJiYgKGltZ1JlZi55IDwgKHRoaXMuc2l6ZS55IC0gYm9yZGVyKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUGVyZm9ybXMgYmlsaW5lYXIgc2FtcGxpbmdcclxuICogQHBhcmFtIGluSW1nIEltYWdlIHRvIGV4dHJhY3Qgc2FtcGxlIGZyb21cclxuICogQHBhcmFtIHggdGhlIHgtY29vcmRpbmF0ZVxyXG4gKiBAcGFyYW0geSB0aGUgeS1jb29yZGluYXRlXHJcbiAqIEByZXR1cm5zIHRoZSBzYW1wbGVkIHZhbHVlXHJcbiAqIEBzZWUgY3ZkL3Zpc2lvbi5oXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIuc2FtcGxlID0gZnVuY3Rpb24oaW5JbWcsIHgsIHkpIHtcclxuICAgIHZhciBseCA9IE1hdGguZmxvb3IoeCk7XHJcbiAgICB2YXIgbHkgPSBNYXRoLmZsb29yKHkpO1xyXG4gICAgdmFyIHcgPSBpbkltZy5zaXplLng7XHJcbiAgICB2YXIgYmFzZSA9IGx5ICogaW5JbWcuc2l6ZS54ICsgbHg7XHJcbiAgICB2YXIgYSA9IGluSW1nLmRhdGFbYmFzZSArIDBdO1xyXG4gICAgdmFyIGIgPSBpbkltZy5kYXRhW2Jhc2UgKyAxXTtcclxuICAgIHZhciBjID0gaW5JbWcuZGF0YVtiYXNlICsgd107XHJcbiAgICB2YXIgZCA9IGluSW1nLmRhdGFbYmFzZSArIHcgKyAxXTtcclxuICAgIHZhciBlID0gYSAtIGI7XHJcbiAgICB4IC09IGx4O1xyXG4gICAgeSAtPSBseTtcclxuXHJcbiAgICB2YXIgcmVzdWx0ID0gTWF0aC5mbG9vcih4ICogKHkgKiAoZSAtIGMgKyBkKSAtIGUpICsgeSAqIChjIC0gYSkgKyBhKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZXMgYSBnaXZlbiBhcnJheS4gU2V0cyBlYWNoIGVsZW1lbnQgdG8gemVyby5cclxuICogQHBhcmFtIGFycmF5IHtBcnJheX0gVGhlIGFycmF5IHRvIGluaXRpYWxpemVcclxuICovXHJcbkltYWdlV3JhcHBlci5jbGVhckFycmF5ID0gZnVuY3Rpb24oYXJyYXkpIHtcclxuICAgIHZhciBsID0gYXJyYXkubGVuZ3RoO1xyXG4gICAgd2hpbGUgKGwtLSkge1xyXG4gICAgICAgIGFycmF5W2xdID0gMDtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEge1N1YkltYWdlfSBmcm9tIHRoZSBjdXJyZW50IGltYWdlICh7dGhpc30pLlxyXG4gKiBAcGFyYW0gZnJvbSB7SW1hZ2VSZWZ9IFRoZSBwb3NpdGlvbiB3aGVyZSB0byBzdGFydCB0aGUge1N1YkltYWdlfSBmcm9tLiAodG9wLWxlZnQgY29ybmVyKVxyXG4gKiBAcGFyYW0gc2l6ZSB7SW1hZ2VSZWZ9IFRoZSBzaXplIG9mIHRoZSByZXN1bHRpbmcgaW1hZ2VcclxuICogQHJldHVybnMge1N1YkltYWdlfSBBIHNoYXJlZCBwYXJ0IG9mIHRoZSBvcmlnaW5hbCBpbWFnZVxyXG4gKi9cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5zdWJJbWFnZSA9IGZ1bmN0aW9uKGZyb20sIHNpemUpIHtcclxuICAgIHJldHVybiBuZXcgU3ViSW1hZ2UoZnJvbSwgc2l6ZSwgdGhpcyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhbiB7SW1hZ2VXcmFwcGVyKSBhbmQgY29waWVzIHRoZSBuZWVkZWQgdW5kZXJseWluZyBpbWFnZS1kYXRhIGFyZWFcclxuICogQHBhcmFtIGltYWdlV3JhcHBlciB7SW1hZ2VXcmFwcGVyfSBUaGUgdGFyZ2V0IHtJbWFnZVdyYXBwZXJ9IHdoZXJlIHRoZSBkYXRhIHNob3VsZCBiZSBjb3BpZWRcclxuICogQHBhcmFtIGZyb20ge0ltYWdlUmVmfSBUaGUgbG9jYXRpb24gd2hlcmUgdG8gY29weSBmcm9tICh0b3AtbGVmdCBsb2NhdGlvbilcclxuICovXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuc3ViSW1hZ2VBc0NvcHkgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGZyb20pIHtcclxuICAgIHZhciBzaXplWSA9IGltYWdlV3JhcHBlci5zaXplLnksIHNpemVYID0gaW1hZ2VXcmFwcGVyLnNpemUueDtcclxuICAgIHZhciB4LCB5O1xyXG4gICAgZm9yICggeCA9IDA7IHggPCBzaXplWDsgeCsrKSB7XHJcbiAgICAgICAgZm9yICggeSA9IDA7IHkgPCBzaXplWTsgeSsrKSB7XHJcbiAgICAgICAgICAgIGltYWdlV3JhcHBlci5kYXRhW3kgKiBzaXplWCArIHhdID0gdGhpcy5kYXRhWyhmcm9tLnkgKyB5KSAqIHRoaXMuc2l6ZS54ICsgZnJvbS54ICsgeF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5jb3B5VG8gPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIpIHtcclxuICAgIHZhciBsZW5ndGggPSB0aGlzLmRhdGEubGVuZ3RoLCBzcmNEYXRhID0gdGhpcy5kYXRhLCBkc3REYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGE7XHJcblxyXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XHJcbiAgICAgICAgZHN0RGF0YVtsZW5ndGhdID0gc3JjRGF0YVtsZW5ndGhdO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlcyBhIGdpdmVuIHBpeGVsIHBvc2l0aW9uIGZyb20gdGhlIGltYWdlXHJcbiAqIEBwYXJhbSB4IHtOdW1iZXJ9IFRoZSB4LXBvc2l0aW9uXHJcbiAqIEBwYXJhbSB5IHtOdW1iZXJ9IFRoZSB5LXBvc2l0aW9uXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBncmF5c2NhbGUgdmFsdWUgYXQgdGhlIHBpeGVsLXBvc2l0aW9uXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGFbeSAqIHRoaXMuc2l6ZS54ICsgeF07XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0cmlldmVzIGEgZ2l2ZW4gcGl4ZWwgcG9zaXRpb24gZnJvbSB0aGUgaW1hZ2VcclxuICogQHBhcmFtIHgge051bWJlcn0gVGhlIHgtcG9zaXRpb25cclxuICogQHBhcmFtIHkge051bWJlcn0gVGhlIHktcG9zaXRpb25cclxuICogQHJldHVybnMge051bWJlcn0gVGhlIGdyYXlzY2FsZSB2YWx1ZSBhdCB0aGUgcGl4ZWwtcG9zaXRpb25cclxuICovXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuZ2V0U2FmZSA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgIHZhciBpO1xyXG5cclxuICAgIGlmICghdGhpcy5pbmRleE1hcHBpbmcpIHtcclxuICAgICAgICB0aGlzLmluZGV4TWFwcGluZyA9IHtcclxuICAgICAgICAgICAgeDogW10sXHJcbiAgICAgICAgICAgIHk6IFtdXHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5zaXplLng7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4TWFwcGluZy54W2ldID0gaTtcclxuICAgICAgICAgICAgdGhpcy5pbmRleE1hcHBpbmcueFtpICsgdGhpcy5zaXplLnhdID0gaTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuc2l6ZS55OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5pbmRleE1hcHBpbmcueVtpXSA9IGk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXhNYXBwaW5nLnlbaSArIHRoaXMuc2l6ZS55XSA9IGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZGF0YVsodGhpcy5pbmRleE1hcHBpbmcueVt5ICsgdGhpcy5zaXplLnldKSAqIHRoaXMuc2l6ZS54ICsgdGhpcy5pbmRleE1hcHBpbmcueFt4ICsgdGhpcy5zaXplLnhdXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXRzIGEgZ2l2ZW4gcGl4ZWwgcG9zaXRpb24gaW4gdGhlIGltYWdlXHJcbiAqIEBwYXJhbSB4IHtOdW1iZXJ9IFRoZSB4LXBvc2l0aW9uXHJcbiAqIEBwYXJhbSB5IHtOdW1iZXJ9IFRoZSB5LXBvc2l0aW9uXHJcbiAqIEBwYXJhbSB2YWx1ZSB7TnVtYmVyfSBUaGUgZ3JheXNjYWxlIHZhbHVlIHRvIHNldFxyXG4gKiBAcmV0dXJucyB7SW1hZ2VXcmFwcGVyfSBUaGUgSW1hZ2UgaXRzZWxmIChmb3IgcG9zc2libGUgY2hhaW5pbmcpXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKHgsIHksIHZhbHVlKSB7XHJcbiAgICB0aGlzLmRhdGFbeSAqIHRoaXMuc2l6ZS54ICsgeF0gPSB2YWx1ZTtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldHMgdGhlIGJvcmRlciBvZiB0aGUgaW1hZ2UgKDEgcGl4ZWwpIHRvIHplcm9cclxuICovXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuemVyb0JvcmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGksIHdpZHRoID0gdGhpcy5zaXplLngsIGhlaWdodCA9IHRoaXMuc2l6ZS55LCBkYXRhID0gdGhpcy5kYXRhO1xyXG4gICAgZm9yICggaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XHJcbiAgICAgICAgZGF0YVtpXSA9IGRhdGFbKGhlaWdodCAtIDEpICogd2lkdGggKyBpXSA9IDA7XHJcbiAgICB9XHJcbiAgICBmb3IgKCBpID0gMTsgaSA8IGhlaWdodCAtIDE7IGkrKykge1xyXG4gICAgICAgIGRhdGFbaSAqIHdpZHRoXSA9IGRhdGFbaSAqIHdpZHRoICsgKHdpZHRoIC0gMSldID0gMDtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbnZlcnRzIGEgYmluYXJ5IGltYWdlIGluIHBsYWNlXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLmludmVydCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGRhdGEgPSB0aGlzLmRhdGEsIGxlbmd0aCA9IGRhdGEubGVuZ3RoO1xyXG5cclxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgIGRhdGFbbGVuZ3RoXSA9IGRhdGFbbGVuZ3RoXSA/IDAgOiAxO1xyXG4gICAgfVxyXG59O1xyXG5cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5jb252b2x2ZSA9IGZ1bmN0aW9uKGtlcm5lbCkge1xyXG4gICAgdmFyIHgsIHksIGt4LCBreSwga1NpemUgPSAoa2VybmVsLmxlbmd0aCAvIDIpIHwgMCwgYWNjdSA9IDA7XHJcbiAgICBmb3IgKCB5ID0gMDsgeSA8IHRoaXMuc2l6ZS55OyB5KyspIHtcclxuICAgICAgICBmb3IgKCB4ID0gMDsgeCA8IHRoaXMuc2l6ZS54OyB4KyspIHtcclxuICAgICAgICAgICAgYWNjdSA9IDA7XHJcbiAgICAgICAgICAgIGZvciAoIGt5ID0gLWtTaXplOyBreSA8PSBrU2l6ZTsga3krKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICgga3ggPSAta1NpemU7IGt4IDw9IGtTaXplOyBreCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdSArPSBrZXJuZWxba3kgKyBrU2l6ZV1ba3ggKyBrU2l6ZV0gKiB0aGlzLmdldFNhZmUoeCArIGt4LCB5ICsga3kpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVt5ICogdGhpcy5zaXplLnggKyB4XSA9IGFjY3U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5tb21lbnRzID0gZnVuY3Rpb24obGFiZWxjb3VudCkge1xyXG4gICAgdmFyIGRhdGEgPSB0aGlzLmRhdGEsXHJcbiAgICAgICAgeCxcclxuICAgICAgICB5LFxyXG4gICAgICAgIGhlaWdodCA9IHRoaXMuc2l6ZS55LFxyXG4gICAgICAgIHdpZHRoID0gdGhpcy5zaXplLngsXHJcbiAgICAgICAgdmFsLFxyXG4gICAgICAgIHlzcSxcclxuICAgICAgICBsYWJlbHN1bSA9IFtdLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgbGFiZWwsXHJcbiAgICAgICAgbXUxMSxcclxuICAgICAgICBtdTAyLFxyXG4gICAgICAgIG11MjAsXHJcbiAgICAgICAgeF8sXHJcbiAgICAgICAgeV8sXHJcbiAgICAgICAgdG1wLFxyXG4gICAgICAgIHJlc3VsdCA9IFtdLFxyXG4gICAgICAgIFBJID0gTWF0aC5QSSxcclxuICAgICAgICBQSV80ID0gUEkgLyA0O1xyXG5cclxuICAgIGlmIChsYWJlbGNvdW50IDw9IDApIHtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgbGFiZWxjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgbGFiZWxzdW1baV0gPSB7XHJcbiAgICAgICAgICAgIG0wMDogMCxcclxuICAgICAgICAgICAgbTAxOiAwLFxyXG4gICAgICAgICAgICBtMTA6IDAsXHJcbiAgICAgICAgICAgIG0xMTogMCxcclxuICAgICAgICAgICAgbTAyOiAwLFxyXG4gICAgICAgICAgICBtMjA6IDAsXHJcbiAgICAgICAgICAgIHRoZXRhOiAwLFxyXG4gICAgICAgICAgICByYWQ6IDBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcclxuICAgICAgICB5c3EgPSB5ICogeTtcclxuICAgICAgICBmb3IgKCB4ID0gMDsgeCA8IHdpZHRoOyB4KyspIHtcclxuICAgICAgICAgICAgdmFsID0gZGF0YVt5ICogd2lkdGggKyB4XTtcclxuICAgICAgICAgICAgaWYgKHZhbCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsID0gbGFiZWxzdW1bdmFsIC0gMV07XHJcbiAgICAgICAgICAgICAgICBsYWJlbC5tMDAgKz0gMTtcclxuICAgICAgICAgICAgICAgIGxhYmVsLm0wMSArPSB5O1xyXG4gICAgICAgICAgICAgICAgbGFiZWwubTEwICs9IHg7XHJcbiAgICAgICAgICAgICAgICBsYWJlbC5tMTEgKz0geCAqIHk7XHJcbiAgICAgICAgICAgICAgICBsYWJlbC5tMDIgKz0geXNxO1xyXG4gICAgICAgICAgICAgICAgbGFiZWwubTIwICs9IHggKiB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgbGFiZWxjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgbGFiZWwgPSBsYWJlbHN1bVtpXTtcclxuICAgICAgICBpZiAoIWlzTmFOKGxhYmVsLm0wMCkgJiYgbGFiZWwubTAwICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHhfID0gbGFiZWwubTEwIC8gbGFiZWwubTAwO1xyXG4gICAgICAgICAgICB5XyA9IGxhYmVsLm0wMSAvIGxhYmVsLm0wMDtcclxuICAgICAgICAgICAgbXUxMSA9IGxhYmVsLm0xMSAvIGxhYmVsLm0wMCAtIHhfICogeV87XHJcbiAgICAgICAgICAgIG11MDIgPSBsYWJlbC5tMDIgLyBsYWJlbC5tMDAgLSB5XyAqIHlfO1xyXG4gICAgICAgICAgICBtdTIwID0gbGFiZWwubTIwIC8gbGFiZWwubTAwIC0geF8gKiB4XztcclxuICAgICAgICAgICAgdG1wID0gKG11MDIgLSBtdTIwKSAvICgyICogbXUxMSk7XHJcbiAgICAgICAgICAgIHRtcCA9IDAuNSAqIE1hdGguYXRhbih0bXApICsgKG11MTEgPj0gMCA/IFBJXzQgOiAtUElfNCApICsgUEk7XHJcbiAgICAgICAgICAgIGxhYmVsLnRoZXRhID0gKHRtcCAqIDE4MCAvIFBJICsgOTApICUgMTgwIC0gOTA7XHJcbiAgICAgICAgICAgIGlmIChsYWJlbC50aGV0YSA8IDApIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsLnRoZXRhICs9IDE4MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsYWJlbC5yYWQgPSB0bXAgPiBQSSA/IHRtcCAtIFBJIDogdG1wO1xyXG4gICAgICAgICAgICBsYWJlbC52ZWMgPSB2ZWMyLmNsb25lKFtNYXRoLmNvcyh0bXApLCBNYXRoLnNpbih0bXApXSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGxhYmVsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEaXNwbGF5cyB0aGUge0ltYWdlV3JhcHBlcn0gaW4gYSBnaXZlbiBjYW52YXNcclxuICogQHBhcmFtIGNhbnZhcyB7Q2FudmFzfSBUaGUgY2FudmFzIGVsZW1lbnQgdG8gd3JpdGUgdG9cclxuICogQHBhcmFtIHNjYWxlIHtOdW1iZXJ9IFNjYWxlIHdoaWNoIGlzIGFwcGxpZWQgdG8gZWFjaCBwaXhlbC12YWx1ZVxyXG4gKi9cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oY2FudmFzLCBzY2FsZSkge1xyXG4gICAgdmFyIGN0eCxcclxuICAgICAgICBmcmFtZSxcclxuICAgICAgICBkYXRhLFxyXG4gICAgICAgIGN1cnJlbnQsXHJcbiAgICAgICAgcGl4ZWwsXHJcbiAgICAgICAgeCxcclxuICAgICAgICB5O1xyXG5cclxuICAgIGlmICghc2NhbGUpIHtcclxuICAgICAgICBzY2FsZSA9IDEuMDtcclxuICAgIH1cclxuICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgY2FudmFzLndpZHRoID0gdGhpcy5zaXplLng7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gdGhpcy5zaXplLnk7XHJcbiAgICBmcmFtZSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgIGRhdGEgPSBmcmFtZS5kYXRhO1xyXG4gICAgY3VycmVudCA9IDA7XHJcbiAgICBmb3IgKHkgPSAwOyB5IDwgdGhpcy5zaXplLnk7IHkrKykge1xyXG4gICAgICAgIGZvciAoeCA9IDA7IHggPCB0aGlzLnNpemUueDsgeCsrKSB7XHJcbiAgICAgICAgICAgIHBpeGVsID0geSAqIHRoaXMuc2l6ZS54ICsgeDtcclxuICAgICAgICAgICAgY3VycmVudCA9IHRoaXMuZ2V0KHgsIHkpICogc2NhbGU7XHJcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMF0gPSBjdXJyZW50O1xyXG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDFdID0gY3VycmVudDtcclxuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAyXSA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgM10gPSAyNTU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9mcmFtZS5kYXRhID0gZGF0YTtcclxuICAgIGN0eC5wdXRJbWFnZURhdGEoZnJhbWUsIDAsIDApO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERpc3BsYXlzIHRoZSB7U3ViSW1hZ2V9IGluIGEgZ2l2ZW4gY2FudmFzXHJcbiAqIEBwYXJhbSBjYW52YXMge0NhbnZhc30gVGhlIGNhbnZhcyBlbGVtZW50IHRvIHdyaXRlIHRvXHJcbiAqIEBwYXJhbSBzY2FsZSB7TnVtYmVyfSBTY2FsZSB3aGljaCBpcyBhcHBsaWVkIHRvIGVhY2ggcGl4ZWwtdmFsdWVcclxuICovXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUub3ZlcmxheSA9IGZ1bmN0aW9uKGNhbnZhcywgc2NhbGUsIGZyb20pIHtcclxuICAgIGlmICghc2NhbGUgfHwgc2NhbGUgPCAwIHx8IHNjYWxlID4gMzYwKSB7XHJcbiAgICAgICAgc2NhbGUgPSAzNjA7XHJcbiAgICB9XHJcbiAgICB2YXIgaHN2ID0gWzAsIDEsIDFdO1xyXG4gICAgdmFyIHJnYiA9IFswLCAwLCAwXTtcclxuICAgIHZhciB3aGl0ZVJnYiA9IFsyNTUsIDI1NSwgMjU1XTtcclxuICAgIHZhciBibGFja1JnYiA9IFswLCAwLCAwXTtcclxuICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIHZhciBmcmFtZSA9IGN0eC5nZXRJbWFnZURhdGEoZnJvbS54LCBmcm9tLnksIHRoaXMuc2l6ZS54LCB0aGlzLnNpemUueSk7XHJcbiAgICB2YXIgZGF0YSA9IGZyYW1lLmRhdGE7XHJcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5kYXRhLmxlbmd0aDtcclxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgIGhzdlswXSA9IHRoaXMuZGF0YVtsZW5ndGhdICogc2NhbGU7XHJcbiAgICAgICAgcmVzdWx0ID0gaHN2WzBdIDw9IDAgPyB3aGl0ZVJnYiA6IGhzdlswXSA+PSAzNjAgPyBibGFja1JnYiA6IENWVXRpbHMuaHN2MnJnYihoc3YsIHJnYik7XHJcbiAgICAgICAgZGF0YVtsZW5ndGggKiA0ICsgMF0gPSByZXN1bHRbMF07XHJcbiAgICAgICAgZGF0YVtsZW5ndGggKiA0ICsgMV0gPSByZXN1bHRbMV07XHJcbiAgICAgICAgZGF0YVtsZW5ndGggKiA0ICsgMl0gPSByZXN1bHRbMl07XHJcbiAgICAgICAgZGF0YVtsZW5ndGggKiA0ICsgM10gPSAyNTU7XHJcbiAgICB9XHJcbiAgICBjdHgucHV0SW1hZ2VEYXRhKGZyYW1lLCBmcm9tLngsIGZyb20ueSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbWFnZVdyYXBwZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvbW1vbi9pbWFnZV93cmFwcGVyLmpzXG4gKiovIiwiLyoqXHJcbiAqIENvbnN0cnVjdCByZXByZXNlbnRpbmcgYSBwYXJ0IG9mIGFub3RoZXIge0ltYWdlV3JhcHBlcn0uIFNoYXJlcyBkYXRhXHJcbiAqIGJldHdlZW4gdGhlIHBhcmVudCBhbmQgdGhlIGNoaWxkLlxyXG4gKiBAcGFyYW0gZnJvbSB7SW1hZ2VSZWZ9IFRoZSBwb3NpdGlvbiB3aGVyZSB0byBzdGFydCB0aGUge1N1YkltYWdlfSBmcm9tLiAodG9wLWxlZnQgY29ybmVyKVxyXG4gKiBAcGFyYW0gc2l6ZSB7SW1hZ2VSZWZ9IFRoZSBzaXplIG9mIHRoZSByZXN1bHRpbmcgaW1hZ2VcclxuICogQHBhcmFtIEkge0ltYWdlV3JhcHBlcn0gVGhlIHtJbWFnZVdyYXBwZXJ9IHRvIHNoYXJlIGZyb21cclxuICogQHJldHVybnMge1N1YkltYWdlfSBBIHNoYXJlZCBwYXJ0IG9mIHRoZSBvcmlnaW5hbCBpbWFnZVxyXG4gKi9cclxuZnVuY3Rpb24gU3ViSW1hZ2UoZnJvbSwgc2l6ZSwgSSkge1xyXG4gICAgaWYgKCFJKSB7XHJcbiAgICAgICAgSSA9IHtcclxuICAgICAgICAgICAgZGF0YTogbnVsbCxcclxuICAgICAgICAgICAgc2l6ZTogc2l6ZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICB0aGlzLmRhdGEgPSBJLmRhdGE7XHJcbiAgICB0aGlzLm9yaWdpbmFsU2l6ZSA9IEkuc2l6ZTtcclxuICAgIHRoaXMuSSA9IEk7XHJcblxyXG4gICAgdGhpcy5mcm9tID0gZnJvbTtcclxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEaXNwbGF5cyB0aGUge1N1YkltYWdlfSBpbiBhIGdpdmVuIGNhbnZhc1xyXG4gKiBAcGFyYW0gY2FudmFzIHtDYW52YXN9IFRoZSBjYW52YXMgZWxlbWVudCB0byB3cml0ZSB0b1xyXG4gKiBAcGFyYW0gc2NhbGUge051bWJlcn0gU2NhbGUgd2hpY2ggaXMgYXBwbGllZCB0byBlYWNoIHBpeGVsLXZhbHVlXHJcbiAqL1xyXG5TdWJJbWFnZS5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKGNhbnZhcywgc2NhbGUpIHtcclxuICAgIHZhciBjdHgsXHJcbiAgICAgICAgZnJhbWUsXHJcbiAgICAgICAgZGF0YSxcclxuICAgICAgICBjdXJyZW50LFxyXG4gICAgICAgIHksXHJcbiAgICAgICAgeCxcclxuICAgICAgICBwaXhlbDtcclxuXHJcbiAgICBpZiAoIXNjYWxlKSB7XHJcbiAgICAgICAgc2NhbGUgPSAxLjA7XHJcbiAgICB9XHJcbiAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIGNhbnZhcy53aWR0aCA9IHRoaXMuc2l6ZS54O1xyXG4gICAgY2FudmFzLmhlaWdodCA9IHRoaXMuc2l6ZS55O1xyXG4gICAgZnJhbWUgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgICBkYXRhID0gZnJhbWUuZGF0YTtcclxuICAgIGN1cnJlbnQgPSAwO1xyXG4gICAgZm9yICh5ID0gMDsgeSA8IHRoaXMuc2l6ZS55OyB5KyspIHtcclxuICAgICAgICBmb3IgKHggPSAwOyB4IDwgdGhpcy5zaXplLng7IHgrKykge1xyXG4gICAgICAgICAgICBwaXhlbCA9IHkgKiB0aGlzLnNpemUueCArIHg7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLmdldCh4LCB5KSAqIHNjYWxlO1xyXG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDBdID0gY3VycmVudDtcclxuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAxXSA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMl0gPSBjdXJyZW50O1xyXG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDNdID0gMjU1O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZyYW1lLmRhdGEgPSBkYXRhO1xyXG4gICAgY3R4LnB1dEltYWdlRGF0YShmcmFtZSwgMCwgMCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0cmlldmVzIGEgZ2l2ZW4gcGl4ZWwgcG9zaXRpb24gZnJvbSB0aGUge1N1YkltYWdlfVxyXG4gKiBAcGFyYW0geCB7TnVtYmVyfSBUaGUgeC1wb3NpdGlvblxyXG4gKiBAcGFyYW0geSB7TnVtYmVyfSBUaGUgeS1wb3NpdGlvblxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgZ3JheXNjYWxlIHZhbHVlIGF0IHRoZSBwaXhlbC1wb3NpdGlvblxyXG4gKi9cclxuU3ViSW1hZ2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGFbKHRoaXMuZnJvbS55ICsgeSkgKiB0aGlzLm9yaWdpbmFsU2l6ZS54ICsgdGhpcy5mcm9tLnggKyB4XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBVcGRhdGVzIHRoZSB1bmRlcmx5aW5nIGRhdGEgZnJvbSBhIGdpdmVuIHtJbWFnZVdyYXBwZXJ9XHJcbiAqIEBwYXJhbSBpbWFnZSB7SW1hZ2VXcmFwcGVyfSBUaGUgdXBkYXRlZCBpbWFnZVxyXG4gKi9cclxuU3ViSW1hZ2UucHJvdG90eXBlLnVwZGF0ZURhdGEgPSBmdW5jdGlvbihpbWFnZSkge1xyXG4gICAgdGhpcy5vcmlnaW5hbFNpemUgPSBpbWFnZS5zaXplO1xyXG4gICAgdGhpcy5kYXRhID0gaW1hZ2UuZGF0YTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgc2hhcmVkIGFyZWFcclxuICogQHBhcmFtIGZyb20ge3gseX0gVGhlIG5ldyBsb2NhdGlvblxyXG4gKiBAcmV0dXJucyB7U3ViSW1hZ2V9IHJldHVybnMge3RoaXN9IGZvciBwb3NzaWJsZSBjaGFpbmluZ1xyXG4gKi9cclxuU3ViSW1hZ2UucHJvdG90eXBlLnVwZGF0ZUZyb20gPSBmdW5jdGlvbihmcm9tKSB7XHJcbiAgICB0aGlzLmZyb20gPSBmcm9tO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoU3ViSW1hZ2UpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vc3ViSW1hZ2UuanNcbiAqKi8iLCJpbXBvcnQgQ2x1c3RlcjIgZnJvbSAnLi9jbHVzdGVyJztcclxuaW1wb3J0IEFycmF5SGVscGVyIGZyb20gJy4vYXJyYXlfaGVscGVyJztcclxuaW1wb3J0IHt2ZWMyLCB2ZWMzfSBmcm9tICdnbC1tYXRyaXgnO1xyXG5cclxudmFyIENWVXRpbHMgPSB7fTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0geCB4LWNvb3JkaW5hdGVcclxuICogQHBhcmFtIHkgeS1jb29yZGluYXRlXHJcbiAqIEByZXR1cm4gSW1hZ2VSZWZlcmVuY2Uge3gseX0gQ29vcmRpbmF0ZVxyXG4gKi9cclxuQ1ZVdGlscy5pbWFnZVJlZiA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgIHZhciB0aGF0ID0ge1xyXG4gICAgICAgIHg6IHgsXHJcbiAgICAgICAgeTogeSxcclxuICAgICAgICB0b1ZlYzI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmVjMi5jbG9uZShbdGhpcy54LCB0aGlzLnldKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvVmVjMzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2ZWMzLmNsb25lKFt0aGlzLngsIHRoaXMueSwgMV0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm91bmQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnggPSB0aGlzLnggPiAwLjAgPyBNYXRoLmZsb29yKHRoaXMueCArIDAuNSkgOiBNYXRoLmZsb29yKHRoaXMueCAtIDAuNSk7XHJcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMueSA+IDAuMCA/IE1hdGguZmxvb3IodGhpcy55ICsgMC41KSA6IE1hdGguZmxvb3IodGhpcy55IC0gMC41KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbXB1dGVzIGFuIGludGVncmFsIGltYWdlIG9mIGEgZ2l2ZW4gZ3JheXNjYWxlIGltYWdlLlxyXG4gKiBAcGFyYW0gaW1hZ2VEYXRhQ29udGFpbmVyIHtJbWFnZURhdGFDb250YWluZXJ9IHRoZSBpbWFnZSB0byBiZSBpbnRlZ3JhdGVkXHJcbiAqL1xyXG5DVlV0aWxzLmNvbXB1dGVJbnRlZ3JhbEltYWdlMiA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgaW50ZWdyYWxXcmFwcGVyKSB7XHJcbiAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGE7XHJcbiAgICB2YXIgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54O1xyXG4gICAgdmFyIGhlaWdodCA9IGltYWdlV3JhcHBlci5zaXplLnk7XHJcbiAgICB2YXIgaW50ZWdyYWxJbWFnZURhdGEgPSBpbnRlZ3JhbFdyYXBwZXIuZGF0YTtcclxuICAgIHZhciBzdW0gPSAwLCBwb3NBID0gMCwgcG9zQiA9IDAsIHBvc0MgPSAwLCBwb3NEID0gMCwgeCwgeTtcclxuXHJcbiAgICAvLyBzdW0gdXAgZmlyc3QgY29sdW1uXHJcbiAgICBwb3NCID0gd2lkdGg7XHJcbiAgICBzdW0gPSAwO1xyXG4gICAgZm9yICggeSA9IDE7IHkgPCBoZWlnaHQ7IHkrKykge1xyXG4gICAgICAgIHN1bSArPSBpbWFnZURhdGFbcG9zQV07XHJcbiAgICAgICAgaW50ZWdyYWxJbWFnZURhdGFbcG9zQl0gKz0gc3VtO1xyXG4gICAgICAgIHBvc0EgKz0gd2lkdGg7XHJcbiAgICAgICAgcG9zQiArPSB3aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwb3NBID0gMDtcclxuICAgIHBvc0IgPSAxO1xyXG4gICAgc3VtID0gMDtcclxuICAgIGZvciAoIHggPSAxOyB4IDwgd2lkdGg7IHgrKykge1xyXG4gICAgICAgIHN1bSArPSBpbWFnZURhdGFbcG9zQV07XHJcbiAgICAgICAgaW50ZWdyYWxJbWFnZURhdGFbcG9zQl0gKz0gc3VtO1xyXG4gICAgICAgIHBvc0ErKztcclxuICAgICAgICBwb3NCKys7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICggeSA9IDE7IHkgPCBoZWlnaHQ7IHkrKykge1xyXG4gICAgICAgIHBvc0EgPSB5ICogd2lkdGggKyAxO1xyXG4gICAgICAgIHBvc0IgPSAoeSAtIDEpICogd2lkdGggKyAxO1xyXG4gICAgICAgIHBvc0MgPSB5ICogd2lkdGg7XHJcbiAgICAgICAgcG9zRCA9ICh5IC0gMSkgKiB3aWR0aDtcclxuICAgICAgICBmb3IgKCB4ID0gMTsgeCA8IHdpZHRoOyB4KyspIHtcclxuICAgICAgICAgICAgaW50ZWdyYWxJbWFnZURhdGFbcG9zQV0gKz1cclxuICAgICAgICAgICAgICAgIGltYWdlRGF0YVtwb3NBXSArIGludGVncmFsSW1hZ2VEYXRhW3Bvc0JdICsgaW50ZWdyYWxJbWFnZURhdGFbcG9zQ10gLSBpbnRlZ3JhbEltYWdlRGF0YVtwb3NEXTtcclxuICAgICAgICAgICAgcG9zQSsrO1xyXG4gICAgICAgICAgICBwb3NCKys7XHJcbiAgICAgICAgICAgIHBvc0MrKztcclxuICAgICAgICAgICAgcG9zRCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMuY29tcHV0ZUludGVncmFsSW1hZ2UgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGludGVncmFsV3JhcHBlcikge1xyXG4gICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhO1xyXG4gICAgdmFyIHdpZHRoID0gaW1hZ2VXcmFwcGVyLnNpemUueDtcclxuICAgIHZhciBoZWlnaHQgPSBpbWFnZVdyYXBwZXIuc2l6ZS55O1xyXG4gICAgdmFyIGludGVncmFsSW1hZ2VEYXRhID0gaW50ZWdyYWxXcmFwcGVyLmRhdGE7XHJcbiAgICB2YXIgc3VtID0gMDtcclxuXHJcbiAgICAvLyBzdW0gdXAgZmlyc3Qgcm93XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcclxuICAgICAgICBzdW0gKz0gaW1hZ2VEYXRhW2ldO1xyXG4gICAgICAgIGludGVncmFsSW1hZ2VEYXRhW2ldID0gc3VtO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIHYgPSAxOyB2IDwgaGVpZ2h0OyB2KyspIHtcclxuICAgICAgICBzdW0gPSAwO1xyXG4gICAgICAgIGZvciAodmFyIHUgPSAwOyB1IDwgd2lkdGg7IHUrKykge1xyXG4gICAgICAgICAgICBzdW0gKz0gaW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdO1xyXG4gICAgICAgICAgICBpbnRlZ3JhbEltYWdlRGF0YVsoKHYpICogd2lkdGgpICsgdV0gPSBzdW0gKyBpbnRlZ3JhbEltYWdlRGF0YVsodiAtIDEpICogd2lkdGggKyB1XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLnRocmVzaG9sZEltYWdlID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCB0aHJlc2hvbGQsIHRhcmdldFdyYXBwZXIpIHtcclxuICAgIGlmICghdGFyZ2V0V3JhcHBlcikge1xyXG4gICAgICAgIHRhcmdldFdyYXBwZXIgPSBpbWFnZVdyYXBwZXI7XHJcbiAgICB9XHJcbiAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGEsIGxlbmd0aCA9IGltYWdlRGF0YS5sZW5ndGgsIHRhcmdldERhdGEgPSB0YXJnZXRXcmFwcGVyLmRhdGE7XHJcblxyXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XHJcbiAgICAgICAgdGFyZ2V0RGF0YVtsZW5ndGhdID0gaW1hZ2VEYXRhW2xlbmd0aF0gPCB0aHJlc2hvbGQgPyAxIDogMDtcclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMuY29tcHV0ZUhpc3RvZ3JhbSA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgYml0c1BlclBpeGVsKSB7XHJcbiAgICBpZiAoIWJpdHNQZXJQaXhlbCkge1xyXG4gICAgICAgIGJpdHNQZXJQaXhlbCA9IDg7XHJcbiAgICB9XHJcbiAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgbGVuZ3RoID0gaW1hZ2VEYXRhLmxlbmd0aCxcclxuICAgICAgICBiaXRTaGlmdCA9IDggLSBiaXRzUGVyUGl4ZWwsXHJcbiAgICAgICAgYnVja2V0Q250ID0gMSA8PCBiaXRzUGVyUGl4ZWwsXHJcbiAgICAgICAgaGlzdCA9IG5ldyBJbnQzMkFycmF5KGJ1Y2tldENudCk7XHJcblxyXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XHJcbiAgICAgICAgaGlzdFtpbWFnZURhdGFbbGVuZ3RoXSA+PiBiaXRTaGlmdF0rKztcclxuICAgIH1cclxuICAgIHJldHVybiBoaXN0O1xyXG59O1xyXG5cclxuQ1ZVdGlscy5zaGFycGVuTGluZSA9IGZ1bmN0aW9uKGxpbmUpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIGxlbmd0aCA9IGxpbmUubGVuZ3RoLFxyXG4gICAgICAgIGxlZnQgPSBsaW5lWzBdLFxyXG4gICAgICAgIGNlbnRlciA9IGxpbmVbMV0sXHJcbiAgICAgICAgcmlnaHQ7XHJcblxyXG4gICAgZm9yIChpID0gMTsgaSA8IGxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgIHJpZ2h0ID0gbGluZVtpICsgMV07XHJcbiAgICAgICAgLy8gIC0xIDQgLTEga2VybmVsXHJcbiAgICAgICAgbGluZVtpIC0gMV0gPSAoKChjZW50ZXIgKiAyKSAtIGxlZnQgLSByaWdodCkpICYgMjU1O1xyXG4gICAgICAgIGxlZnQgPSBjZW50ZXI7XHJcbiAgICAgICAgY2VudGVyID0gcmlnaHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGluZTtcclxufTtcclxuXHJcbkNWVXRpbHMuZGV0ZXJtaW5lT3RzdVRocmVzaG9sZCA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgYml0c1BlclBpeGVsKSB7XHJcbiAgICBpZiAoIWJpdHNQZXJQaXhlbCkge1xyXG4gICAgICAgIGJpdHNQZXJQaXhlbCA9IDg7XHJcbiAgICB9XHJcbiAgICB2YXIgaGlzdCxcclxuICAgICAgICB0aHJlc2hvbGQsXHJcbiAgICAgICAgYml0U2hpZnQgPSA4IC0gYml0c1BlclBpeGVsO1xyXG5cclxuICAgIGZ1bmN0aW9uIHB4KGluaXQsIGVuZCkge1xyXG4gICAgICAgIHZhciBzdW0gPSAwLCBpO1xyXG4gICAgICAgIGZvciAoIGkgPSBpbml0OyBpIDw9IGVuZDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHN1bSArPSBoaXN0W2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3VtO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG14KGluaXQsIGVuZCkge1xyXG4gICAgICAgIHZhciBpLCBzdW0gPSAwO1xyXG5cclxuICAgICAgICBmb3IgKCBpID0gaW5pdDsgaSA8PSBlbmQ7IGkrKykge1xyXG4gICAgICAgICAgICBzdW0gKz0gaSAqIGhpc3RbaV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3VtO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRldGVybWluZVRocmVzaG9sZCgpIHtcclxuICAgICAgICB2YXIgdmV0ID0gWzBdLCBwMSwgcDIsIHAxMiwgaywgbTEsIG0yLCBtMTIsXHJcbiAgICAgICAgICAgIG1heCA9ICgxIDw8IGJpdHNQZXJQaXhlbCkgLSAxO1xyXG5cclxuICAgICAgICBoaXN0ID0gQ1ZVdGlscy5jb21wdXRlSGlzdG9ncmFtKGltYWdlV3JhcHBlciwgYml0c1BlclBpeGVsKTtcclxuICAgICAgICBmb3IgKCBrID0gMTsgayA8IG1heDsgaysrKSB7XHJcbiAgICAgICAgICAgIHAxID0gcHgoMCwgayk7XHJcbiAgICAgICAgICAgIHAyID0gcHgoayArIDEsIG1heCk7XHJcbiAgICAgICAgICAgIHAxMiA9IHAxICogcDI7XHJcbiAgICAgICAgICAgIGlmIChwMTIgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHAxMiA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbTEgPSBteCgwLCBrKSAqIHAyO1xyXG4gICAgICAgICAgICBtMiA9IG14KGsgKyAxLCBtYXgpICogcDE7XHJcbiAgICAgICAgICAgIG0xMiA9IG0xIC0gbTI7XHJcbiAgICAgICAgICAgIHZldFtrXSA9IG0xMiAqIG0xMiAvIHAxMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEFycmF5SGVscGVyLm1heEluZGV4KHZldCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhyZXNob2xkID0gZGV0ZXJtaW5lVGhyZXNob2xkKCk7XHJcbiAgICByZXR1cm4gdGhyZXNob2xkIDw8IGJpdFNoaWZ0O1xyXG59O1xyXG5cclxuQ1ZVdGlscy5vdHN1VGhyZXNob2xkID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCB0YXJnZXRXcmFwcGVyKSB7XHJcbiAgICB2YXIgdGhyZXNob2xkID0gQ1ZVdGlscy5kZXRlcm1pbmVPdHN1VGhyZXNob2xkKGltYWdlV3JhcHBlcik7XHJcblxyXG4gICAgQ1ZVdGlscy50aHJlc2hvbGRJbWFnZShpbWFnZVdyYXBwZXIsIHRocmVzaG9sZCwgdGFyZ2V0V3JhcHBlcik7XHJcbiAgICByZXR1cm4gdGhyZXNob2xkO1xyXG59O1xyXG5cclxuLy8gbG9jYWwgdGhyZXNob2xkaW5nXHJcbkNWVXRpbHMuY29tcHV0ZUJpbmFyeUltYWdlID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCBpbnRlZ3JhbFdyYXBwZXIsIHRhcmdldFdyYXBwZXIpIHtcclxuICAgIENWVXRpbHMuY29tcHV0ZUludGVncmFsSW1hZ2UoaW1hZ2VXcmFwcGVyLCBpbnRlZ3JhbFdyYXBwZXIpO1xyXG5cclxuICAgIGlmICghdGFyZ2V0V3JhcHBlcikge1xyXG4gICAgICAgIHRhcmdldFdyYXBwZXIgPSBpbWFnZVdyYXBwZXI7XHJcbiAgICB9XHJcbiAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGE7XHJcbiAgICB2YXIgdGFyZ2V0RGF0YSA9IHRhcmdldFdyYXBwZXIuZGF0YTtcclxuICAgIHZhciB3aWR0aCA9IGltYWdlV3JhcHBlci5zaXplLng7XHJcbiAgICB2YXIgaGVpZ2h0ID0gaW1hZ2VXcmFwcGVyLnNpemUueTtcclxuICAgIHZhciBpbnRlZ3JhbEltYWdlRGF0YSA9IGludGVncmFsV3JhcHBlci5kYXRhO1xyXG4gICAgdmFyIHN1bSA9IDAsIHYsIHUsIGtlcm5lbCA9IDMsIEEsIEIsIEMsIEQsIGF2Zywgc2l6ZSA9IChrZXJuZWwgKiAyICsgMSkgKiAoa2VybmVsICogMiArIDEpO1xyXG5cclxuICAgIC8vIGNsZWFyIG91dCB0b3AgJiBib3R0b20tYm9yZGVyXHJcbiAgICBmb3IgKCB2ID0gMDsgdiA8PSBrZXJuZWw7IHYrKykge1xyXG4gICAgICAgIGZvciAoIHUgPSAwOyB1IDwgd2lkdGg7IHUrKykge1xyXG4gICAgICAgICAgICB0YXJnZXREYXRhWygodikgKiB3aWR0aCkgKyB1XSA9IDA7XHJcbiAgICAgICAgICAgIHRhcmdldERhdGFbKCgoaGVpZ2h0IC0gMSkgLSB2KSAqIHdpZHRoKSArIHVdID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2xlYXIgb3V0IGxlZnQgJiByaWdodCBib3JkZXJcclxuICAgIGZvciAoIHYgPSBrZXJuZWw7IHYgPCBoZWlnaHQgLSBrZXJuZWw7IHYrKykge1xyXG4gICAgICAgIGZvciAoIHUgPSAwOyB1IDw9IGtlcm5lbDsgdSsrKSB7XHJcbiAgICAgICAgICAgIHRhcmdldERhdGFbKCh2KSAqIHdpZHRoKSArIHVdID0gMDtcclxuICAgICAgICAgICAgdGFyZ2V0RGF0YVsoKHYpICogd2lkdGgpICsgKHdpZHRoIC0gMSAtIHUpXSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIHYgPSBrZXJuZWwgKyAxOyB2IDwgaGVpZ2h0IC0ga2VybmVsIC0gMTsgdisrKSB7XHJcbiAgICAgICAgZm9yICggdSA9IGtlcm5lbCArIDE7IHUgPCB3aWR0aCAtIGtlcm5lbDsgdSsrKSB7XHJcbiAgICAgICAgICAgIEEgPSBpbnRlZ3JhbEltYWdlRGF0YVsodiAtIGtlcm5lbCAtIDEpICogd2lkdGggKyAodSAtIGtlcm5lbCAtIDEpXTtcclxuICAgICAgICAgICAgQiA9IGludGVncmFsSW1hZ2VEYXRhWyh2IC0ga2VybmVsIC0gMSkgKiB3aWR0aCArICh1ICsga2VybmVsKV07XHJcbiAgICAgICAgICAgIEMgPSBpbnRlZ3JhbEltYWdlRGF0YVsodiArIGtlcm5lbCkgKiB3aWR0aCArICh1IC0ga2VybmVsIC0gMSldO1xyXG4gICAgICAgICAgICBEID0gaW50ZWdyYWxJbWFnZURhdGFbKHYgKyBrZXJuZWwpICogd2lkdGggKyAodSArIGtlcm5lbCldO1xyXG4gICAgICAgICAgICBzdW0gPSBEIC0gQyAtIEIgKyBBO1xyXG4gICAgICAgICAgICBhdmcgPSBzdW0gLyAoc2l6ZSk7XHJcbiAgICAgICAgICAgIHRhcmdldERhdGFbdiAqIHdpZHRoICsgdV0gPSBpbWFnZURhdGFbdiAqIHdpZHRoICsgdV0gPiAoYXZnICsgNSkgPyAwIDogMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLmNsdXN0ZXIgPSBmdW5jdGlvbihwb2ludHMsIHRocmVzaG9sZCwgcHJvcGVydHkpIHtcclxuICAgIHZhciBpLCBrLCBjbHVzdGVyLCBwb2ludCwgY2x1c3RlcnMgPSBbXTtcclxuXHJcbiAgICBpZiAoIXByb3BlcnR5KSB7XHJcbiAgICAgICAgcHJvcGVydHkgPSBcInJhZFwiO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFRvQ2x1c3RlcihuZXdQb2ludCkge1xyXG4gICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAoIGsgPSAwOyBrIDwgY2x1c3RlcnMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgY2x1c3RlciA9IGNsdXN0ZXJzW2tdO1xyXG4gICAgICAgICAgICBpZiAoY2x1c3Rlci5maXRzKG5ld1BvaW50KSkge1xyXG4gICAgICAgICAgICAgICAgY2x1c3Rlci5hZGQobmV3UG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmb3VuZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpdGVyYXRlIG92ZXIgZWFjaCBjbG91ZFxyXG4gICAgZm9yICggaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwb2ludCA9IENsdXN0ZXIyLmNyZWF0ZVBvaW50KHBvaW50c1tpXSwgaSwgcHJvcGVydHkpO1xyXG4gICAgICAgIGlmICghYWRkVG9DbHVzdGVyKHBvaW50KSkge1xyXG4gICAgICAgICAgICBjbHVzdGVycy5wdXNoKENsdXN0ZXIyLmNyZWF0ZShwb2ludCwgdGhyZXNob2xkKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNsdXN0ZXJzO1xyXG59O1xyXG5cclxuQ1ZVdGlscy5UcmFjZXIgPSB7XHJcbiAgICB0cmFjZTogZnVuY3Rpb24ocG9pbnRzLCB2ZWMpIHtcclxuICAgICAgICB2YXIgaXRlcmF0aW9uLCBtYXhJdGVyYXRpb25zID0gMTAsIHRvcCA9IFtdLCByZXN1bHQgPSBbXSwgY2VudGVyUG9zID0gMCwgY3VycmVudFBvcyA9IDA7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRyYWNlKGlkeCwgZm9yd2FyZCkge1xyXG4gICAgICAgICAgICB2YXIgZnJvbSwgdG8sIHRvSWR4LCBwcmVkaWN0ZWRQb3MsIHRocmVzaG9sZFggPSAxLCB0aHJlc2hvbGRZID0gTWF0aC5hYnModmVjWzFdIC8gMTApLCBmb3VuZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gbWF0Y2gocG9zLCBwcmVkaWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwb3MueCA+IChwcmVkaWN0ZWQueCAtIHRocmVzaG9sZFgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHBvcy54IDwgKHByZWRpY3RlZC54ICsgdGhyZXNob2xkWClcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgcG9zLnkgPiAocHJlZGljdGVkLnkgLSB0aHJlc2hvbGRZKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBwb3MueSA8IChwcmVkaWN0ZWQueSArIHRocmVzaG9sZFkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIG5leHQgaW5kZXggaXMgd2l0aGluIHRoZSB2ZWMgc3BlY2lmaWNhdGlvbnNcclxuICAgICAgICAgICAgLy8gaWYgbm90LCBjaGVjayBhcyBsb25nIGFzIHRoZSB0aHJlc2hvbGQgaXMgbWV0XHJcblxyXG4gICAgICAgICAgICBmcm9tID0gcG9pbnRzW2lkeF07XHJcbiAgICAgICAgICAgIGlmIChmb3J3YXJkKSB7XHJcbiAgICAgICAgICAgICAgICBwcmVkaWN0ZWRQb3MgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogZnJvbS54ICsgdmVjWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IGZyb20ueSArIHZlY1sxXVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHByZWRpY3RlZFBvcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBmcm9tLnggLSB2ZWNbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgeTogZnJvbS55IC0gdmVjWzFdXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0b0lkeCA9IGZvcndhcmQgPyBpZHggKyAxIDogaWR4IC0gMTtcclxuICAgICAgICAgICAgdG8gPSBwb2ludHNbdG9JZHhdO1xyXG4gICAgICAgICAgICB3aGlsZSAodG8gJiYgKCBmb3VuZCA9IG1hdGNoKHRvLCBwcmVkaWN0ZWRQb3MpKSAhPT0gdHJ1ZSAmJiAoTWF0aC5hYnModG8ueSAtIGZyb20ueSkgPCB2ZWNbMV0pKSB7XHJcbiAgICAgICAgICAgICAgICB0b0lkeCA9IGZvcndhcmQgPyB0b0lkeCArIDEgOiB0b0lkeCAtIDE7XHJcbiAgICAgICAgICAgICAgICB0byA9IHBvaW50c1t0b0lkeF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmb3VuZCA/IHRvSWR4IDogbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoIGl0ZXJhdGlvbiA9IDA7IGl0ZXJhdGlvbiA8IG1heEl0ZXJhdGlvbnM7IGl0ZXJhdGlvbisrKSB7XHJcbiAgICAgICAgICAgIC8vIHJhbmRvbWx5IHNlbGVjdCBwb2ludCB0byBzdGFydCB3aXRoXHJcbiAgICAgICAgICAgIGNlbnRlclBvcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvaW50cy5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgLy8gdHJhY2UgZm9yd2FyZFxyXG4gICAgICAgICAgICB0b3AgPSBbXTtcclxuICAgICAgICAgICAgY3VycmVudFBvcyA9IGNlbnRlclBvcztcclxuICAgICAgICAgICAgdG9wLnB1c2gocG9pbnRzW2N1cnJlbnRQb3NdKTtcclxuICAgICAgICAgICAgd2hpbGUgKCggY3VycmVudFBvcyA9IHRyYWNlKGN1cnJlbnRQb3MsIHRydWUpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdG9wLnB1c2gocG9pbnRzW2N1cnJlbnRQb3NdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2VudGVyUG9zID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFBvcyA9IGNlbnRlclBvcztcclxuICAgICAgICAgICAgICAgIHdoaWxlICgoIGN1cnJlbnRQb3MgPSB0cmFjZShjdXJyZW50UG9zLCBmYWxzZSkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wLnB1c2gocG9pbnRzW2N1cnJlbnRQb3NdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRvcC5sZW5ndGggPiByZXN1bHQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0b3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMuRElMQVRFID0gMTtcclxuQ1ZVdGlscy5FUk9ERSA9IDI7XHJcblxyXG5DVlV0aWxzLmRpbGF0ZSA9IGZ1bmN0aW9uKGluSW1hZ2VXcmFwcGVyLCBvdXRJbWFnZVdyYXBwZXIpIHtcclxuICAgIHZhciB2LFxyXG4gICAgICAgIHUsXHJcbiAgICAgICAgaW5JbWFnZURhdGEgPSBpbkltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgIG91dEltYWdlRGF0YSA9IG91dEltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgIGhlaWdodCA9IGluSW1hZ2VXcmFwcGVyLnNpemUueSxcclxuICAgICAgICB3aWR0aCA9IGluSW1hZ2VXcmFwcGVyLnNpemUueCxcclxuICAgICAgICBzdW0sXHJcbiAgICAgICAgeVN0YXJ0MSxcclxuICAgICAgICB5U3RhcnQyLFxyXG4gICAgICAgIHhTdGFydDEsXHJcbiAgICAgICAgeFN0YXJ0MjtcclxuXHJcbiAgICBmb3IgKCB2ID0gMTsgdiA8IGhlaWdodCAtIDE7IHYrKykge1xyXG4gICAgICAgIGZvciAoIHUgPSAxOyB1IDwgd2lkdGggLSAxOyB1KyspIHtcclxuICAgICAgICAgICAgeVN0YXJ0MSA9IHYgLSAxO1xyXG4gICAgICAgICAgICB5U3RhcnQyID0gdiArIDE7XHJcbiAgICAgICAgICAgIHhTdGFydDEgPSB1IC0gMTtcclxuICAgICAgICAgICAgeFN0YXJ0MiA9IHUgKyAxO1xyXG4gICAgICAgICAgICBzdW0gPSBpbkltYWdlRGF0YVt5U3RhcnQxICogd2lkdGggKyB4U3RhcnQxXSArIGluSW1hZ2VEYXRhW3lTdGFydDEgKiB3aWR0aCArIHhTdGFydDJdICtcclxuICAgICAgICAgICAgaW5JbWFnZURhdGFbdiAqIHdpZHRoICsgdV0gK1xyXG4gICAgICAgICAgICBpbkltYWdlRGF0YVt5U3RhcnQyICogd2lkdGggKyB4U3RhcnQxXSArIGluSW1hZ2VEYXRhW3lTdGFydDIgKiB3aWR0aCArIHhTdGFydDJdO1xyXG4gICAgICAgICAgICBvdXRJbWFnZURhdGFbdiAqIHdpZHRoICsgdV0gPSBzdW0gPiAwID8gMSA6IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5lcm9kZSA9IGZ1bmN0aW9uKGluSW1hZ2VXcmFwcGVyLCBvdXRJbWFnZVdyYXBwZXIpIHtcclxuICAgIHZhciB2LFxyXG4gICAgICAgIHUsXHJcbiAgICAgICAgaW5JbWFnZURhdGEgPSBpbkltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgIG91dEltYWdlRGF0YSA9IG91dEltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgIGhlaWdodCA9IGluSW1hZ2VXcmFwcGVyLnNpemUueSxcclxuICAgICAgICB3aWR0aCA9IGluSW1hZ2VXcmFwcGVyLnNpemUueCxcclxuICAgICAgICBzdW0sXHJcbiAgICAgICAgeVN0YXJ0MSxcclxuICAgICAgICB5U3RhcnQyLFxyXG4gICAgICAgIHhTdGFydDEsXHJcbiAgICAgICAgeFN0YXJ0MjtcclxuXHJcbiAgICBmb3IgKCB2ID0gMTsgdiA8IGhlaWdodCAtIDE7IHYrKykge1xyXG4gICAgICAgIGZvciAoIHUgPSAxOyB1IDwgd2lkdGggLSAxOyB1KyspIHtcclxuICAgICAgICAgICAgeVN0YXJ0MSA9IHYgLSAxO1xyXG4gICAgICAgICAgICB5U3RhcnQyID0gdiArIDE7XHJcbiAgICAgICAgICAgIHhTdGFydDEgPSB1IC0gMTtcclxuICAgICAgICAgICAgeFN0YXJ0MiA9IHUgKyAxO1xyXG4gICAgICAgICAgICBzdW0gPSBpbkltYWdlRGF0YVt5U3RhcnQxICogd2lkdGggKyB4U3RhcnQxXSArIGluSW1hZ2VEYXRhW3lTdGFydDEgKiB3aWR0aCArIHhTdGFydDJdICtcclxuICAgICAgICAgICAgaW5JbWFnZURhdGFbdiAqIHdpZHRoICsgdV0gK1xyXG4gICAgICAgICAgICBpbkltYWdlRGF0YVt5U3RhcnQyICogd2lkdGggKyB4U3RhcnQxXSArIGluSW1hZ2VEYXRhW3lTdGFydDIgKiB3aWR0aCArIHhTdGFydDJdO1xyXG4gICAgICAgICAgICBvdXRJbWFnZURhdGFbdiAqIHdpZHRoICsgdV0gPSBzdW0gPT09IDUgPyAxIDogMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLnN1YnRyYWN0ID0gZnVuY3Rpb24oYUltYWdlV3JhcHBlciwgYkltYWdlV3JhcHBlciwgcmVzdWx0SW1hZ2VXcmFwcGVyKSB7XHJcbiAgICBpZiAoIXJlc3VsdEltYWdlV3JhcHBlcikge1xyXG4gICAgICAgIHJlc3VsdEltYWdlV3JhcHBlciA9IGFJbWFnZVdyYXBwZXI7XHJcbiAgICB9XHJcbiAgICB2YXIgbGVuZ3RoID0gYUltYWdlV3JhcHBlci5kYXRhLmxlbmd0aCxcclxuICAgICAgICBhSW1hZ2VEYXRhID0gYUltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgIGJJbWFnZURhdGEgPSBiSW1hZ2VXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgY0ltYWdlRGF0YSA9IHJlc3VsdEltYWdlV3JhcHBlci5kYXRhO1xyXG5cclxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgIGNJbWFnZURhdGFbbGVuZ3RoXSA9IGFJbWFnZURhdGFbbGVuZ3RoXSAtIGJJbWFnZURhdGFbbGVuZ3RoXTtcclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMuYml0d2lzZU9yID0gZnVuY3Rpb24oYUltYWdlV3JhcHBlciwgYkltYWdlV3JhcHBlciwgcmVzdWx0SW1hZ2VXcmFwcGVyKSB7XHJcbiAgICBpZiAoIXJlc3VsdEltYWdlV3JhcHBlcikge1xyXG4gICAgICAgIHJlc3VsdEltYWdlV3JhcHBlciA9IGFJbWFnZVdyYXBwZXI7XHJcbiAgICB9XHJcbiAgICB2YXIgbGVuZ3RoID0gYUltYWdlV3JhcHBlci5kYXRhLmxlbmd0aCxcclxuICAgICAgICBhSW1hZ2VEYXRhID0gYUltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgIGJJbWFnZURhdGEgPSBiSW1hZ2VXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgY0ltYWdlRGF0YSA9IHJlc3VsdEltYWdlV3JhcHBlci5kYXRhO1xyXG5cclxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgIGNJbWFnZURhdGFbbGVuZ3RoXSA9IGFJbWFnZURhdGFbbGVuZ3RoXSB8fCBiSW1hZ2VEYXRhW2xlbmd0aF07XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLmNvdW50Tm9uWmVybyA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlcikge1xyXG4gICAgdmFyIGxlbmd0aCA9IGltYWdlV3JhcHBlci5kYXRhLmxlbmd0aCwgZGF0YSA9IGltYWdlV3JhcHBlci5kYXRhLCBzdW0gPSAwO1xyXG5cclxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgIHN1bSArPSBkYXRhW2xlbmd0aF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VtO1xyXG59O1xyXG5cclxuQ1ZVdGlscy50b3BHZW5lcmljID0gZnVuY3Rpb24obGlzdCwgdG9wLCBzY29yZUZ1bmMpIHtcclxuICAgIHZhciBpLCBtaW5JZHggPSAwLCBtaW4gPSAwLCBxdWV1ZSA9IFtdLCBzY29yZSwgaGl0LCBwb3M7XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCB0b3A7IGkrKykge1xyXG4gICAgICAgIHF1ZXVlW2ldID0ge1xyXG4gICAgICAgICAgICBzY29yZTogMCxcclxuICAgICAgICAgICAgaXRlbTogbnVsbFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgc2NvcmUgPSBzY29yZUZ1bmMuYXBwbHkodGhpcywgW2xpc3RbaV1dKTtcclxuICAgICAgICBpZiAoc2NvcmUgPiBtaW4pIHtcclxuICAgICAgICAgICAgaGl0ID0gcXVldWVbbWluSWR4XTtcclxuICAgICAgICAgICAgaGl0LnNjb3JlID0gc2NvcmU7XHJcbiAgICAgICAgICAgIGhpdC5pdGVtID0gbGlzdFtpXTtcclxuICAgICAgICAgICAgbWluID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuICAgICAgICAgICAgZm9yICggcG9zID0gMDsgcG9zIDwgdG9wOyBwb3MrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlW3Bvc10uc2NvcmUgPCBtaW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBtaW4gPSBxdWV1ZVtwb3NdLnNjb3JlO1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbklkeCA9IHBvcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcXVldWU7XHJcbn07XHJcblxyXG5DVlV0aWxzLmdyYXlBcnJheUZyb21JbWFnZSA9IGZ1bmN0aW9uKGh0bWxJbWFnZSwgb2Zmc2V0WCwgY3R4LCBhcnJheSkge1xyXG4gICAgY3R4LmRyYXdJbWFnZShodG1sSW1hZ2UsIG9mZnNldFgsIDAsIGh0bWxJbWFnZS53aWR0aCwgaHRtbEltYWdlLmhlaWdodCk7XHJcbiAgICB2YXIgY3R4RGF0YSA9IGN0eC5nZXRJbWFnZURhdGEob2Zmc2V0WCwgMCwgaHRtbEltYWdlLndpZHRoLCBodG1sSW1hZ2UuaGVpZ2h0KS5kYXRhO1xyXG4gICAgQ1ZVdGlscy5jb21wdXRlR3JheShjdHhEYXRhLCBhcnJheSk7XHJcbn07XHJcblxyXG5DVlV0aWxzLmdyYXlBcnJheUZyb21Db250ZXh0ID0gZnVuY3Rpb24oY3R4LCBzaXplLCBvZmZzZXQsIGFycmF5KSB7XHJcbiAgICB2YXIgY3R4RGF0YSA9IGN0eC5nZXRJbWFnZURhdGEob2Zmc2V0LngsIG9mZnNldC55LCBzaXplLngsIHNpemUueSkuZGF0YTtcclxuICAgIENWVXRpbHMuY29tcHV0ZUdyYXkoY3R4RGF0YSwgYXJyYXkpO1xyXG59O1xyXG5cclxuQ1ZVdGlscy5ncmF5QW5kSGFsZlNhbXBsZUZyb21DYW52YXNEYXRhID0gZnVuY3Rpb24oY2FudmFzRGF0YSwgc2l6ZSwgb3V0QXJyYXkpIHtcclxuICAgIHZhciB0b3BSb3dJZHggPSAwO1xyXG4gICAgdmFyIGJvdHRvbVJvd0lkeCA9IHNpemUueDtcclxuICAgIHZhciBlbmRJZHggPSBNYXRoLmZsb29yKGNhbnZhc0RhdGEubGVuZ3RoIC8gNCk7XHJcbiAgICB2YXIgb3V0V2lkdGggPSBzaXplLnggLyAyO1xyXG4gICAgdmFyIG91dEltZ0lkeCA9IDA7XHJcbiAgICB2YXIgaW5XaWR0aCA9IHNpemUueDtcclxuICAgIHZhciBpO1xyXG5cclxuICAgIHdoaWxlIChib3R0b21Sb3dJZHggPCBlbmRJZHgpIHtcclxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IG91dFdpZHRoOyBpKyspIHtcclxuICAgICAgICAgICAgb3V0QXJyYXlbb3V0SW1nSWR4XSA9IE1hdGguZmxvb3IoKFxyXG4gICAgICAgICAgICAgICAgKDAuMjk5ICogY2FudmFzRGF0YVt0b3BSb3dJZHggKiA0ICsgMF0gK1xyXG4gICAgICAgICAgICAgICAgIDAuNTg3ICogY2FudmFzRGF0YVt0b3BSb3dJZHggKiA0ICsgMV0gK1xyXG4gICAgICAgICAgICAgICAgIDAuMTE0ICogY2FudmFzRGF0YVt0b3BSb3dJZHggKiA0ICsgMl0pICtcclxuICAgICAgICAgICAgICAgICgwLjI5OSAqIGNhbnZhc0RhdGFbKHRvcFJvd0lkeCArIDEpICogNCArIDBdICtcclxuICAgICAgICAgICAgICAgICAwLjU4NyAqIGNhbnZhc0RhdGFbKHRvcFJvd0lkeCArIDEpICogNCArIDFdICtcclxuICAgICAgICAgICAgICAgICAwLjExNCAqIGNhbnZhc0RhdGFbKHRvcFJvd0lkeCArIDEpICogNCArIDJdKSArXHJcbiAgICAgICAgICAgICAgICAoMC4yOTkgKiBjYW52YXNEYXRhWyhib3R0b21Sb3dJZHgpICogNCArIDBdICtcclxuICAgICAgICAgICAgICAgICAwLjU4NyAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCkgKiA0ICsgMV0gK1xyXG4gICAgICAgICAgICAgICAgIDAuMTE0ICogY2FudmFzRGF0YVsoYm90dG9tUm93SWR4KSAqIDQgKyAyXSkgK1xyXG4gICAgICAgICAgICAgICAgKDAuMjk5ICogY2FudmFzRGF0YVsoYm90dG9tUm93SWR4ICsgMSkgKiA0ICsgMF0gK1xyXG4gICAgICAgICAgICAgICAgIDAuNTg3ICogY2FudmFzRGF0YVsoYm90dG9tUm93SWR4ICsgMSkgKiA0ICsgMV0gK1xyXG4gICAgICAgICAgICAgICAgIDAuMTE0ICogY2FudmFzRGF0YVsoYm90dG9tUm93SWR4ICsgMSkgKiA0ICsgMl0pKSAvIDQpO1xyXG4gICAgICAgICAgICBvdXRJbWdJZHgrKztcclxuICAgICAgICAgICAgdG9wUm93SWR4ID0gdG9wUm93SWR4ICsgMjtcclxuICAgICAgICAgICAgYm90dG9tUm93SWR4ID0gYm90dG9tUm93SWR4ICsgMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdG9wUm93SWR4ID0gdG9wUm93SWR4ICsgaW5XaWR0aDtcclxuICAgICAgICBib3R0b21Sb3dJZHggPSBib3R0b21Sb3dJZHggKyBpbldpZHRoO1xyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5jb21wdXRlR3JheSA9IGZ1bmN0aW9uKGltYWdlRGF0YSwgb3V0QXJyYXksIGNvbmZpZykge1xyXG4gICAgdmFyIGwgPSAoaW1hZ2VEYXRhLmxlbmd0aCAvIDQpIHwgMCxcclxuICAgICAgICBpLFxyXG4gICAgICAgIHNpbmdsZUNoYW5uZWwgPSBjb25maWcgJiYgY29uZmlnLnNpbmdsZUNoYW5uZWwgPT09IHRydWU7XHJcblxyXG4gICAgaWYgKHNpbmdsZUNoYW5uZWwpIHtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG91dEFycmF5W2ldID0gaW1hZ2VEYXRhW2kgKiA0ICsgMF07XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG91dEFycmF5W2ldID0gTWF0aC5mbG9vcihcclxuICAgICAgICAgICAgICAgIDAuMjk5ICogaW1hZ2VEYXRhW2kgKiA0ICsgMF0gKyAwLjU4NyAqIGltYWdlRGF0YVtpICogNCArIDFdICsgMC4xMTQgKiBpbWFnZURhdGFbaSAqIDQgKyAyXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5sb2FkSW1hZ2VBcnJheSA9IGZ1bmN0aW9uKHNyYywgY2FsbGJhY2ssIGNhbnZhcykge1xyXG4gICAgaWYgKCFjYW52YXMpIHtcclxuICAgICAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgIH1cclxuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgIGltZy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHRoaXMud2lkdGg7XHJcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG4gICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMsIDAsIDApO1xyXG4gICAgICAgIHZhciBhcnJheSA9IG5ldyBVaW50OEFycmF5KHRoaXMud2lkdGggKiB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLCAwLCAwKTtcclxuICAgICAgICB2YXIgZGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpLmRhdGE7XHJcbiAgICAgICAgQ1ZVdGlscy5jb21wdXRlR3JheShkYXRhLCBhcnJheSk7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayhhcnJheSwge1xyXG4gICAgICAgICAgICB4OiB0aGlzLndpZHRoLFxyXG4gICAgICAgICAgICB5OiB0aGlzLmhlaWdodFxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfTtcclxuICAgIGltZy5zcmMgPSBzcmM7XHJcbn07XHJcblxyXG4vKipcclxuICogQHBhcmFtIGluSW1nIHtJbWFnZVdyYXBwZXJ9IGlucHV0IGltYWdlIHRvIGJlIHNhbXBsZWRcclxuICogQHBhcmFtIG91dEltZyB7SW1hZ2VXcmFwcGVyfSB0byBiZSBzdG9yZWQgaW5cclxuICovXHJcbkNWVXRpbHMuaGFsZlNhbXBsZSA9IGZ1bmN0aW9uKGluSW1nV3JhcHBlciwgb3V0SW1nV3JhcHBlcikge1xyXG4gICAgdmFyIGluSW1nID0gaW5JbWdXcmFwcGVyLmRhdGE7XHJcbiAgICB2YXIgaW5XaWR0aCA9IGluSW1nV3JhcHBlci5zaXplLng7XHJcbiAgICB2YXIgb3V0SW1nID0gb3V0SW1nV3JhcHBlci5kYXRhO1xyXG4gICAgdmFyIHRvcFJvd0lkeCA9IDA7XHJcbiAgICB2YXIgYm90dG9tUm93SWR4ID0gaW5XaWR0aDtcclxuICAgIHZhciBlbmRJZHggPSBpbkltZy5sZW5ndGg7XHJcbiAgICB2YXIgb3V0V2lkdGggPSBpbldpZHRoIC8gMjtcclxuICAgIHZhciBvdXRJbWdJZHggPSAwO1xyXG4gICAgd2hpbGUgKGJvdHRvbVJvd0lkeCA8IGVuZElkeCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3V0V2lkdGg7IGkrKykge1xyXG4gICAgICAgICAgICBvdXRJbWdbb3V0SW1nSWR4XSA9IE1hdGguZmxvb3IoXHJcbiAgICAgICAgICAgICAgICAoaW5JbWdbdG9wUm93SWR4XSArIGluSW1nW3RvcFJvd0lkeCArIDFdICsgaW5JbWdbYm90dG9tUm93SWR4XSArIGluSW1nW2JvdHRvbVJvd0lkeCArIDFdKSAvIDQpO1xyXG4gICAgICAgICAgICBvdXRJbWdJZHgrKztcclxuICAgICAgICAgICAgdG9wUm93SWR4ID0gdG9wUm93SWR4ICsgMjtcclxuICAgICAgICAgICAgYm90dG9tUm93SWR4ID0gYm90dG9tUm93SWR4ICsgMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdG9wUm93SWR4ID0gdG9wUm93SWR4ICsgaW5XaWR0aDtcclxuICAgICAgICBib3R0b21Sb3dJZHggPSBib3R0b21Sb3dJZHggKyBpbldpZHRoO1xyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5oc3YycmdiID0gZnVuY3Rpb24oaHN2LCByZ2IpIHtcclxuICAgIHZhciBoID0gaHN2WzBdLFxyXG4gICAgICAgIHMgPSBoc3ZbMV0sXHJcbiAgICAgICAgdiA9IGhzdlsyXSxcclxuICAgICAgICBjID0gdiAqIHMsXHJcbiAgICAgICAgeCA9IGMgKiAoMSAtIE1hdGguYWJzKChoIC8gNjApICUgMiAtIDEpKSxcclxuICAgICAgICBtID0gdiAtIGMsXHJcbiAgICAgICAgciA9IDAsXHJcbiAgICAgICAgZyA9IDAsXHJcbiAgICAgICAgYiA9IDA7XHJcblxyXG4gICAgcmdiID0gcmdiIHx8IFswLCAwLCAwXTtcclxuXHJcbiAgICBpZiAoaCA8IDYwKSB7XHJcbiAgICAgICAgciA9IGM7XHJcbiAgICAgICAgZyA9IHg7XHJcbiAgICB9IGVsc2UgaWYgKGggPCAxMjApIHtcclxuICAgICAgICByID0geDtcclxuICAgICAgICBnID0gYztcclxuICAgIH0gZWxzZSBpZiAoaCA8IDE4MCkge1xyXG4gICAgICAgIGcgPSBjO1xyXG4gICAgICAgIGIgPSB4O1xyXG4gICAgfSBlbHNlIGlmIChoIDwgMjQwKSB7XHJcbiAgICAgICAgZyA9IHg7XHJcbiAgICAgICAgYiA9IGM7XHJcbiAgICB9IGVsc2UgaWYgKGggPCAzMDApIHtcclxuICAgICAgICByID0geDtcclxuICAgICAgICBiID0gYztcclxuICAgIH0gZWxzZSBpZiAoaCA8IDM2MCkge1xyXG4gICAgICAgIHIgPSBjO1xyXG4gICAgICAgIGIgPSB4O1xyXG4gICAgfVxyXG4gICAgcmdiWzBdID0gKChyICsgbSkgKiAyNTUpIHwgMDtcclxuICAgIHJnYlsxXSA9ICgoZyArIG0pICogMjU1KSB8IDA7XHJcbiAgICByZ2JbMl0gPSAoKGIgKyBtKSAqIDI1NSkgfCAwO1xyXG4gICAgcmV0dXJuIHJnYjtcclxufTtcclxuXHJcbkNWVXRpbHMuX2NvbXB1dGVEaXZpc29ycyA9IGZ1bmN0aW9uKG4pIHtcclxuICAgIHZhciBsYXJnZURpdmlzb3JzID0gW10sXHJcbiAgICAgICAgZGl2aXNvcnMgPSBbXSxcclxuICAgICAgICBpO1xyXG5cclxuICAgIGZvciAoaSA9IDE7IGkgPCBNYXRoLnNxcnQobikgKyAxOyBpKyspIHtcclxuICAgICAgICBpZiAobiAlIGkgPT09IDApIHtcclxuICAgICAgICAgICAgZGl2aXNvcnMucHVzaChpKTtcclxuICAgICAgICAgICAgaWYgKGkgIT09IG4gLyBpKSB7XHJcbiAgICAgICAgICAgICAgICBsYXJnZURpdmlzb3JzLnVuc2hpZnQoTWF0aC5mbG9vcihuIC8gaSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRpdmlzb3JzLmNvbmNhdChsYXJnZURpdmlzb3JzKTtcclxufTtcclxuXHJcbkNWVXRpbHMuX2NvbXB1dGVJbnRlcnNlY3Rpb24gPSBmdW5jdGlvbihhcnIxLCBhcnIyKSB7XHJcbiAgICB2YXIgaSA9IDAsXHJcbiAgICAgICAgaiA9IDAsXHJcbiAgICAgICAgcmVzdWx0ID0gW107XHJcblxyXG4gICAgd2hpbGUgKGkgPCBhcnIxLmxlbmd0aCAmJiBqIDwgYXJyMi5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoYXJyMVtpXSA9PT0gYXJyMltqXSkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChhcnIxW2ldKTtcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICBqKys7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcnIxW2ldID4gYXJyMltqXSkge1xyXG4gICAgICAgICAgICBqKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5DVlV0aWxzLmNhbGN1bGF0ZVBhdGNoU2l6ZSA9IGZ1bmN0aW9uKHBhdGNoU2l6ZSwgaW1nU2l6ZSkge1xyXG4gICAgdmFyIGRpdmlzb3JzWCA9IHRoaXMuX2NvbXB1dGVEaXZpc29ycyhpbWdTaXplLngpLFxyXG4gICAgICAgIGRpdmlzb3JzWSA9IHRoaXMuX2NvbXB1dGVEaXZpc29ycyhpbWdTaXplLnkpLFxyXG4gICAgICAgIHdpZGVTaWRlID0gTWF0aC5tYXgoaW1nU2l6ZS54LCBpbWdTaXplLnkpLFxyXG4gICAgICAgIGNvbW1vbiA9IHRoaXMuX2NvbXB1dGVJbnRlcnNlY3Rpb24oZGl2aXNvcnNYLCBkaXZpc29yc1kpLFxyXG4gICAgICAgIG5yT2ZQYXRjaGVzTGlzdCA9IFs4LCAxMCwgMTUsIDIwLCAzMiwgNjAsIDgwXSxcclxuICAgICAgICBuck9mUGF0Y2hlc01hcCA9IHtcclxuICAgICAgICAgICAgXCJ4LXNtYWxsXCI6IDUsXHJcbiAgICAgICAgICAgIFwic21hbGxcIjogNCxcclxuICAgICAgICAgICAgXCJtZWRpdW1cIjogMyxcclxuICAgICAgICAgICAgXCJsYXJnZVwiOiAyLFxyXG4gICAgICAgICAgICBcIngtbGFyZ2VcIjogMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbnJPZlBhdGNoZXNJZHggPSBuck9mUGF0Y2hlc01hcFtwYXRjaFNpemVdIHx8IG5yT2ZQYXRjaGVzTWFwLm1lZGl1bSxcclxuICAgICAgICBuck9mUGF0Y2hlcyA9IG5yT2ZQYXRjaGVzTGlzdFtuck9mUGF0Y2hlc0lkeF0sXHJcbiAgICAgICAgZGVzaXJlZFBhdGNoU2l6ZSA9IE1hdGguZmxvb3Iod2lkZVNpZGUgLyBuck9mUGF0Y2hlcyksXHJcbiAgICAgICAgb3B0aW1hbFBhdGNoU2l6ZTtcclxuXHJcbiAgICBmdW5jdGlvbiBmaW5kUGF0Y2hTaXplRm9yRGl2aXNvcnMoZGl2aXNvcnMpIHtcclxuICAgICAgICB2YXIgaSA9IDAsXHJcbiAgICAgICAgICAgIGZvdW5kID0gZGl2aXNvcnNbTWF0aC5mbG9vcihkaXZpc29ycy5sZW5ndGggLyAyKV07XHJcblxyXG4gICAgICAgIHdoaWxlIChpIDwgKGRpdmlzb3JzLmxlbmd0aCAtIDEpICYmIGRpdmlzb3JzW2ldIDwgZGVzaXJlZFBhdGNoU2l6ZSkge1xyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpID4gMCkge1xyXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGl2aXNvcnNbaV0gLSBkZXNpcmVkUGF0Y2hTaXplKSA+IE1hdGguYWJzKGRpdmlzb3JzW2kgLSAxXSAtIGRlc2lyZWRQYXRjaFNpemUpKSB7XHJcbiAgICAgICAgICAgICAgICBmb3VuZCA9IGRpdmlzb3JzW2kgLSAxXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvdW5kID0gZGl2aXNvcnNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRlc2lyZWRQYXRjaFNpemUgLyBmb3VuZCA8IG5yT2ZQYXRjaGVzTGlzdFtuck9mUGF0Y2hlc0lkeCArIDFdIC8gbnJPZlBhdGNoZXNMaXN0W25yT2ZQYXRjaGVzSWR4XSAmJlxyXG4gICAgICAgICAgICBkZXNpcmVkUGF0Y2hTaXplIC8gZm91bmQgPiBuck9mUGF0Y2hlc0xpc3RbbnJPZlBhdGNoZXNJZHggLSAxXSAvIG5yT2ZQYXRjaGVzTGlzdFtuck9mUGF0Y2hlc0lkeF0gKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7eDogZm91bmQsIHk6IGZvdW5kfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgb3B0aW1hbFBhdGNoU2l6ZSA9IGZpbmRQYXRjaFNpemVGb3JEaXZpc29ycyhjb21tb24pO1xyXG4gICAgaWYgKCFvcHRpbWFsUGF0Y2hTaXplKSB7XHJcbiAgICAgICAgb3B0aW1hbFBhdGNoU2l6ZSA9IGZpbmRQYXRjaFNpemVGb3JEaXZpc29ycyh0aGlzLl9jb21wdXRlRGl2aXNvcnMod2lkZVNpZGUpKTtcclxuICAgICAgICBpZiAoIW9wdGltYWxQYXRjaFNpemUpIHtcclxuICAgICAgICAgICAgb3B0aW1hbFBhdGNoU2l6ZSA9IGZpbmRQYXRjaFNpemVGb3JEaXZpc29ycygodGhpcy5fY29tcHV0ZURpdmlzb3JzKGRlc2lyZWRQYXRjaFNpemUgKiBuck9mUGF0Y2hlcykpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3B0aW1hbFBhdGNoU2l6ZTtcclxufTtcclxuXHJcbkNWVXRpbHMuX3BhcnNlQ1NTRGltZW5zaW9uVmFsdWVzID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICAgIHZhciBkaW1lbnNpb24gPSB7XHJcbiAgICAgICAgdmFsdWU6IHBhcnNlRmxvYXQodmFsdWUpLFxyXG4gICAgICAgIHVuaXQ6IHZhbHVlLmluZGV4T2YoXCIlXCIpID09PSB2YWx1ZS5sZW5ndGggLSAxID8gXCIlXCIgOiBcIiVcIlxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZGltZW5zaW9uO1xyXG59O1xyXG5cclxuQ1ZVdGlscy5fZGltZW5zaW9uc0NvbnZlcnRlcnMgPSB7XHJcbiAgICB0b3A6IGZ1bmN0aW9uKGRpbWVuc2lvbiwgY29udGV4dCkge1xyXG4gICAgICAgIGlmIChkaW1lbnNpb24udW5pdCA9PT0gXCIlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoY29udGV4dC5oZWlnaHQgKiAoZGltZW5zaW9uLnZhbHVlIC8gMTAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJpZ2h0OiBmdW5jdGlvbihkaW1lbnNpb24sIGNvbnRleHQpIHtcclxuICAgICAgICBpZiAoZGltZW5zaW9uLnVuaXQgPT09IFwiJVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKGNvbnRleHQud2lkdGggLSAoY29udGV4dC53aWR0aCAqIChkaW1lbnNpb24udmFsdWUgLyAxMDApKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJvdHRvbTogZnVuY3Rpb24oZGltZW5zaW9uLCBjb250ZXh0KSB7XHJcbiAgICAgICAgaWYgKGRpbWVuc2lvbi51bml0ID09PSBcIiVcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihjb250ZXh0LmhlaWdodCAtIChjb250ZXh0LmhlaWdodCAqIChkaW1lbnNpb24udmFsdWUgLyAxMDApKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGxlZnQ6IGZ1bmN0aW9uKGRpbWVuc2lvbiwgY29udGV4dCkge1xyXG4gICAgICAgIGlmIChkaW1lbnNpb24udW5pdCA9PT0gXCIlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoY29udGV4dC53aWR0aCAqIChkaW1lbnNpb24udmFsdWUgLyAxMDApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLmNvbXB1dGVJbWFnZUFyZWEgPSBmdW5jdGlvbihpbnB1dFdpZHRoLCBpbnB1dEhlaWdodCwgYXJlYSkge1xyXG4gICAgdmFyIGNvbnRleHQgPSB7d2lkdGg6IGlucHV0V2lkdGgsIGhlaWdodDogaW5wdXRIZWlnaHR9O1xyXG5cclxuICAgIHZhciBwYXJzZWRBcmVhID0gT2JqZWN0LmtleXMoYXJlYSkucmVkdWNlKGZ1bmN0aW9uKHJlc3VsdCwga2V5KSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gYXJlYVtrZXldLFxyXG4gICAgICAgICAgICBwYXJzZWQgPSBDVlV0aWxzLl9wYXJzZUNTU0RpbWVuc2lvblZhbHVlcyh2YWx1ZSksXHJcbiAgICAgICAgICAgIGNhbGN1bGF0ZWQgPSBDVlV0aWxzLl9kaW1lbnNpb25zQ29udmVydGVyc1trZXldKHBhcnNlZCwgY29udGV4dCk7XHJcblxyXG4gICAgICAgIHJlc3VsdFtrZXldID0gY2FsY3VsYXRlZDtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSwge30pO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc3g6IHBhcnNlZEFyZWEubGVmdCxcclxuICAgICAgICBzeTogcGFyc2VkQXJlYS50b3AsXHJcbiAgICAgICAgc3c6IHBhcnNlZEFyZWEucmlnaHQgLSBwYXJzZWRBcmVhLmxlZnQsXHJcbiAgICAgICAgc2g6IHBhcnNlZEFyZWEuYm90dG9tIC0gcGFyc2VkQXJlYS50b3BcclxuICAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDVlV0aWxzO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vY3ZfdXRpbHMuanNcbiAqKi8iLCJpbXBvcnQge3ZlYzJ9IGZyb20gJ2dsLW1hdHJpeCc7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBjbHVzdGVyIGZvciBncm91cGluZyBzaW1pbGFyIG9yaWVudGF0aW9ucyBvZiBkYXRhcG9pbnRzXHJcbiAgICAgKi9cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihwb2ludCwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgdmFyIHBvaW50cyA9IFtdLFxyXG4gICAgICAgICAgICBjZW50ZXIgPSB7XHJcbiAgICAgICAgICAgICAgICByYWQ6IDAsXHJcbiAgICAgICAgICAgICAgICB2ZWM6IHZlYzIuY2xvbmUoWzAsIDBdKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwb2ludE1hcCA9IHt9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgICAgICBhZGQocG9pbnQpO1xyXG4gICAgICAgICAgICB1cGRhdGVDZW50ZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZChwb2ludFRvQWRkKSB7XHJcbiAgICAgICAgICAgIHBvaW50TWFwW3BvaW50VG9BZGQuaWRdID0gcG9pbnRUb0FkZDtcclxuICAgICAgICAgICAgcG9pbnRzLnB1c2gocG9pbnRUb0FkZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVDZW50ZXIoKSB7XHJcbiAgICAgICAgICAgIHZhciBpLCBzdW0gPSAwO1xyXG4gICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc3VtICs9IHBvaW50c1tpXS5yYWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2VudGVyLnJhZCA9IHN1bSAvIHBvaW50cy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGNlbnRlci52ZWMgPSB2ZWMyLmNsb25lKFtNYXRoLmNvcyhjZW50ZXIucmFkKSwgTWF0aC5zaW4oY2VudGVyLnJhZCldKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWRkOiBmdW5jdGlvbihwb2ludFRvQWRkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBvaW50TWFwW3BvaW50VG9BZGQuaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkKHBvaW50VG9BZGQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUNlbnRlcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmaXRzOiBmdW5jdGlvbihvdGhlclBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBjb3NpbmUgc2ltaWxhcml0eSB0byBjZW50ZXItYW5nbGVcclxuICAgICAgICAgICAgICAgIHZhciBzaW1pbGFyaXR5ID0gTWF0aC5hYnModmVjMi5kb3Qob3RoZXJQb2ludC5wb2ludC52ZWMsIGNlbnRlci52ZWMpKTtcclxuICAgICAgICAgICAgICAgIGlmIChzaW1pbGFyaXR5ID4gdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFBvaW50czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9pbnRzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRDZW50ZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNlbnRlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlUG9pbnQ6IGZ1bmN0aW9uKG5ld1BvaW50LCBpZCwgcHJvcGVydHkpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByYWQ6IG5ld1BvaW50W3Byb3BlcnR5XSxcclxuICAgICAgICAgICAgcG9pbnQ6IG5ld1BvaW50LFxyXG4gICAgICAgICAgICBpZDogaWRcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vY2x1c3Rlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdsLW1hdHJpeFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZ2wtbWF0cml4XCJcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBpbml0OiBmdW5jdGlvbihhcnIsIHZhbCkge1xyXG4gICAgICAgIHZhciBsID0gYXJyLmxlbmd0aDtcclxuICAgICAgICB3aGlsZSAobC0tKSB7XHJcbiAgICAgICAgICAgIGFycltsXSA9IHZhbDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2h1ZmZsZXMgdGhlIGNvbnRlbnQgb2YgYW4gYXJyYXlcclxuICAgICAqIEByZXR1cm4ge0FycmF5fSB0aGUgYXJyYXkgaXRzZWxmIHNodWZmbGVkXHJcbiAgICAgKi9cclxuICAgIHNodWZmbGU6IGZ1bmN0aW9uKGFycikge1xyXG4gICAgICAgIHZhciBpID0gYXJyLmxlbmd0aCAtIDEsIGosIHg7XHJcbiAgICAgICAgZm9yIChpOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSk7XHJcbiAgICAgICAgICAgIHggPSBhcnJbaV07XHJcbiAgICAgICAgICAgIGFycltpXSA9IGFycltqXTtcclxuICAgICAgICAgICAgYXJyW2pdID0geDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH0sXHJcblxyXG4gICAgdG9Qb2ludExpc3Q6IGZ1bmN0aW9uKGFycikge1xyXG4gICAgICAgIHZhciBpLCBqLCByb3cgPSBbXSwgcm93cyA9IFtdO1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJvdyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IGFycltpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgcm93W2pdID0gYXJyW2ldW2pdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJvd3NbaV0gPSBcIltcIiArIHJvdy5qb2luKFwiLFwiKSArIFwiXVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJbXCIgKyByb3dzLmpvaW4oXCIsXFxyXFxuXCIpICsgXCJdXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0dXJucyB0aGUgZWxlbWVudHMgd2hpY2gncyBzY29yZSBpcyBiaWdnZXIgdGhhbiB0aGUgdGhyZXNob2xkXHJcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gdGhlIHJlZHVjZWQgYXJyYXlcclxuICAgICAqL1xyXG4gICAgdGhyZXNob2xkOiBmdW5jdGlvbihhcnIsIHRocmVzaG9sZCwgc2NvcmVGdW5jKSB7XHJcbiAgICAgICAgdmFyIGksIHF1ZXVlID0gW107XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHNjb3JlRnVuYy5hcHBseShhcnIsIFthcnJbaV1dKSA+PSB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goYXJyW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcXVldWU7XHJcbiAgICB9LFxyXG5cclxuICAgIG1heEluZGV4OiBmdW5jdGlvbihhcnIpIHtcclxuICAgICAgICB2YXIgaSwgbWF4ID0gMDtcclxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYXJyW2ldID4gYXJyW21heF0pIHtcclxuICAgICAgICAgICAgICAgIG1heCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1heDtcclxuICAgIH0sXHJcblxyXG4gICAgbWF4OiBmdW5jdGlvbihhcnIpIHtcclxuICAgICAgICB2YXIgaSwgbWF4ID0gMDtcclxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYXJyW2ldID4gbWF4KSB7XHJcbiAgICAgICAgICAgICAgICBtYXggPSBhcnJbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1heDtcclxuICAgIH0sXHJcblxyXG4gICAgc3VtOiBmdW5jdGlvbihhcnIpIHtcclxuICAgICAgICB2YXIgbGVuZ3RoID0gYXJyLmxlbmd0aCxcclxuICAgICAgICAgICAgc3VtID0gMDtcclxuXHJcbiAgICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XHJcbiAgICAgICAgICAgIHN1bSArPSBhcnJbbGVuZ3RoXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1bTtcclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvY29tbW9uL2FycmF5X2hlbHBlci5qc1xuICoqLyIsImltcG9ydCBJbWFnZVdyYXBwZXIgZnJvbSAnLi4vY29tbW9uL2ltYWdlX3dyYXBwZXInO1xyXG5pbXBvcnQgQ1ZVdGlscyBmcm9tICcuLi9jb21tb24vY3ZfdXRpbHMnO1xyXG5pbXBvcnQgQXJyYXlIZWxwZXIgZnJvbSAnLi4vY29tbW9uL2FycmF5X2hlbHBlcic7XHJcbmltcG9ydCBJbWFnZURlYnVnIGZyb20gJy4uL2NvbW1vbi9pbWFnZV9kZWJ1Zyc7XHJcbmltcG9ydCBSYXN0ZXJpemVyIGZyb20gJy4vcmFzdGVyaXplcic7XHJcbmltcG9ydCBUcmFjZXIgZnJvbSAnLi90cmFjZXInO1xyXG5pbXBvcnQgc2tlbGV0b25pemVyIGZyb20gJy4vc2tlbGV0b25pemVyJztcclxuaW1wb3J0IGdsTWF0cml4IGZyb20gJ2dsLW1hdHJpeCc7XHJcblxyXG52YXIgX2NvbmZpZyxcclxuICAgIF9jdXJyZW50SW1hZ2VXcmFwcGVyLFxyXG4gICAgX3NrZWxJbWFnZVdyYXBwZXIsXHJcbiAgICBfc3ViSW1hZ2VXcmFwcGVyLFxyXG4gICAgX2xhYmVsSW1hZ2VXcmFwcGVyLFxyXG4gICAgX3BhdGNoR3JpZCxcclxuICAgIF9wYXRjaExhYmVsR3JpZCxcclxuICAgIF9pbWFnZVRvUGF0Y2hHcmlkLFxyXG4gICAgX2JpbmFyeUltYWdlV3JhcHBlcixcclxuICAgIF9wYXRjaFNpemUsXHJcbiAgICBfY2FudmFzQ29udGFpbmVyID0ge1xyXG4gICAgICAgIGN0eDoge1xyXG4gICAgICAgICAgICBiaW5hcnk6IG51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRvbToge1xyXG4gICAgICAgICAgICBiaW5hcnk6IG51bGxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgX251bVBhdGNoZXMgPSB7eDogMCwgeTogMH0sXHJcbiAgICBfaW5wdXRJbWFnZVdyYXBwZXIsXHJcbiAgICBfc2tlbGV0b25pemVyLFxyXG4gICAgdmVjMiA9IGdsTWF0cml4LnZlYzIsXHJcbiAgICBtYXQyID0gZ2xNYXRyaXgubWF0MjtcclxuXHJcbmZ1bmN0aW9uIGluaXRCdWZmZXJzKCkge1xyXG4gICAgdmFyIHNrZWxldG9uSW1hZ2VEYXRhO1xyXG5cclxuICAgIGlmIChfY29uZmlnLmhhbGZTYW1wbGUpIHtcclxuICAgICAgICBfY3VycmVudEltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoe1xyXG4gICAgICAgICAgICB4OiBfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS54IC8gMiB8IDAsXHJcbiAgICAgICAgICAgIHk6IF9pbnB1dEltYWdlV3JhcHBlci5zaXplLnkgLyAyIHwgMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBfY3VycmVudEltYWdlV3JhcHBlciA9IF9pbnB1dEltYWdlV3JhcHBlcjtcclxuICAgIH1cclxuXHJcbiAgICBfcGF0Y2hTaXplID0gQ1ZVdGlscy5jYWxjdWxhdGVQYXRjaFNpemUoX2NvbmZpZy5wYXRjaFNpemUsIF9jdXJyZW50SW1hZ2VXcmFwcGVyLnNpemUpO1xyXG5cclxuICAgIF9udW1QYXRjaGVzLnggPSBfY3VycmVudEltYWdlV3JhcHBlci5zaXplLnggLyBfcGF0Y2hTaXplLnggfCAwO1xyXG4gICAgX251bVBhdGNoZXMueSA9IF9jdXJyZW50SW1hZ2VXcmFwcGVyLnNpemUueSAvIF9wYXRjaFNpemUueSB8IDA7XHJcblxyXG4gICAgX2JpbmFyeUltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoX2N1cnJlbnRJbWFnZVdyYXBwZXIuc2l6ZSwgdW5kZWZpbmVkLCBVaW50OEFycmF5LCBmYWxzZSk7XHJcblxyXG4gICAgX2xhYmVsSW1hZ2VXcmFwcGVyID0gbmV3IEltYWdlV3JhcHBlcihfcGF0Y2hTaXplLCB1bmRlZmluZWQsIEFycmF5LCB0cnVlKTtcclxuXHJcbiAgICBza2VsZXRvbkltYWdlRGF0YSA9IG5ldyBBcnJheUJ1ZmZlcig2NCAqIDEwMjQpO1xyXG4gICAgX3N1YkltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoX3BhdGNoU2l6ZSxcclxuICAgICAgICBuZXcgVWludDhBcnJheShza2VsZXRvbkltYWdlRGF0YSwgMCwgX3BhdGNoU2l6ZS54ICogX3BhdGNoU2l6ZS55KSk7XHJcbiAgICBfc2tlbEltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoX3BhdGNoU2l6ZSxcclxuICAgICAgICBuZXcgVWludDhBcnJheShza2VsZXRvbkltYWdlRGF0YSwgX3BhdGNoU2l6ZS54ICogX3BhdGNoU2l6ZS55ICogMywgX3BhdGNoU2l6ZS54ICogX3BhdGNoU2l6ZS55KSxcclxuICAgICAgICB1bmRlZmluZWQsIHRydWUpO1xyXG4gICAgX3NrZWxldG9uaXplciA9IHNrZWxldG9uaXplcigodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpID8gd2luZG93IDogKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgPyBzZWxmIDogZ2xvYmFsLCB7XHJcbiAgICAgICAgc2l6ZTogX3BhdGNoU2l6ZS54XHJcbiAgICB9LCBza2VsZXRvbkltYWdlRGF0YSk7XHJcblxyXG4gICAgX2ltYWdlVG9QYXRjaEdyaWQgPSBuZXcgSW1hZ2VXcmFwcGVyKHtcclxuICAgICAgICB4OiAoX2N1cnJlbnRJbWFnZVdyYXBwZXIuc2l6ZS54IC8gX3N1YkltYWdlV3JhcHBlci5zaXplLngpIHwgMCxcclxuICAgICAgICB5OiAoX2N1cnJlbnRJbWFnZVdyYXBwZXIuc2l6ZS55IC8gX3N1YkltYWdlV3JhcHBlci5zaXplLnkpIHwgMFxyXG4gICAgfSwgdW5kZWZpbmVkLCBBcnJheSwgdHJ1ZSk7XHJcbiAgICBfcGF0Y2hHcmlkID0gbmV3IEltYWdlV3JhcHBlcihfaW1hZ2VUb1BhdGNoR3JpZC5zaXplLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSk7XHJcbiAgICBfcGF0Y2hMYWJlbEdyaWQgPSBuZXcgSW1hZ2VXcmFwcGVyKF9pbWFnZVRvUGF0Y2hHcmlkLnNpemUsIHVuZGVmaW5lZCwgSW50MzJBcnJheSwgdHJ1ZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRDYW52YXMoKSB7XHJcbiAgICBpZiAoX2NvbmZpZy51c2VXb3JrZXIgfHwgdHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkuY2xhc3NOYW1lID0gXCJiaW5hcnlCdWZmZXJcIjtcclxuICAgIGlmIChfY29uZmlnLnNob3dDYW52YXMgPT09IHRydWUpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlYnVnXCIpLmFwcGVuZENoaWxkKF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeSk7XHJcbiAgICB9XHJcbiAgICBfY2FudmFzQ29udGFpbmVyLmN0eC5iaW5hcnkgPSBfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5LndpZHRoID0gX2JpbmFyeUltYWdlV3JhcHBlci5zaXplLng7XHJcbiAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkuaGVpZ2h0ID0gX2JpbmFyeUltYWdlV3JhcHBlci5zaXplLnk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgYm91bmRpbmcgYm94IHdoaWNoIGVuY2xvc2VzIGFsbCB0aGUgZ2l2ZW4gcGF0Y2hlc1xyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBtaW5pbWFsIGJvdW5kaW5nIGJveFxyXG4gKi9cclxuZnVuY3Rpb24gYm94RnJvbVBhdGNoZXMocGF0Y2hlcykge1xyXG4gICAgdmFyIG92ZXJBdmcsXHJcbiAgICAgICAgaSxcclxuICAgICAgICBqLFxyXG4gICAgICAgIHBhdGNoLFxyXG4gICAgICAgIHRyYW5zTWF0LFxyXG4gICAgICAgIG1pbnggPVxyXG4gICAgICAgIF9iaW5hcnlJbWFnZVdyYXBwZXIuc2l6ZS54LFxyXG4gICAgICAgIG1pbnkgPSBfYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueSxcclxuICAgICAgICBtYXh4ID0gLV9iaW5hcnlJbWFnZVdyYXBwZXIuc2l6ZS54LFxyXG4gICAgICAgIG1heHkgPSAtX2JpbmFyeUltYWdlV3JhcHBlci5zaXplLnksXHJcbiAgICAgICAgYm94LFxyXG4gICAgICAgIHNjYWxlO1xyXG5cclxuICAgIC8vIGRyYXcgYWxsIHBhdGNoZXMgd2hpY2ggYXJlIHRvIGJlIHRha2VuIGludG8gY29uc2lkZXJhdGlvblxyXG4gICAgb3ZlckF2ZyA9IDA7XHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IHBhdGNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwYXRjaCA9IHBhdGNoZXNbaV07XHJcbiAgICAgICAgb3ZlckF2ZyArPSBwYXRjaC5yYWQ7XHJcbiAgICAgICAgaWYgKF9jb25maWcuc2hvd1BhdGNoZXMpIHtcclxuICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UmVjdChwYXRjaC5wb3MsIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LCB7Y29sb3I6IFwicmVkXCJ9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb3ZlckF2ZyAvPSBwYXRjaGVzLmxlbmd0aDtcclxuICAgIG92ZXJBdmcgPSAob3ZlckF2ZyAqIDE4MCAvIE1hdGguUEkgKyA5MCkgJSAxODAgLSA5MDtcclxuICAgIGlmIChvdmVyQXZnIDwgMCkge1xyXG4gICAgICAgIG92ZXJBdmcgKz0gMTgwO1xyXG4gICAgfVxyXG5cclxuICAgIG92ZXJBdmcgPSAoMTgwIC0gb3ZlckF2ZykgKiBNYXRoLlBJIC8gMTgwO1xyXG4gICAgdHJhbnNNYXQgPSBtYXQyLmNsb25lKFtNYXRoLmNvcyhvdmVyQXZnKSwgTWF0aC5zaW4ob3ZlckF2ZyksIC1NYXRoLnNpbihvdmVyQXZnKSwgTWF0aC5jb3Mob3ZlckF2ZyldKTtcclxuXHJcbiAgICAvLyBpdGVyYXRlIG92ZXIgcGF0Y2hlcyBhbmQgcm90YXRlIGJ5IGFuZ2xlXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IHBhdGNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwYXRjaCA9IHBhdGNoZXNbaV07XHJcbiAgICAgICAgZm9yICggaiA9IDA7IGogPCA0OyBqKyspIHtcclxuICAgICAgICAgICAgdmVjMi50cmFuc2Zvcm1NYXQyKHBhdGNoLmJveFtqXSwgcGF0Y2guYm94W2pdLCB0cmFuc01hdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoX2NvbmZpZy5ib3hGcm9tUGF0Y2hlcy5zaG93VHJhbnNmb3JtZWQpIHtcclxuICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UGF0aChwYXRjaC5ib3gsIHt4OiAwLCB5OiAxfSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LCB7Y29sb3I6ICcjOTlmZjAwJywgbGluZVdpZHRoOiAyfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGZpbmQgYm91bmRpbmcgYm94XHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IHBhdGNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwYXRjaCA9IHBhdGNoZXNbaV07XHJcbiAgICAgICAgZm9yICggaiA9IDA7IGogPCA0OyBqKyspIHtcclxuICAgICAgICAgICAgaWYgKHBhdGNoLmJveFtqXVswXSA8IG1pbngpIHtcclxuICAgICAgICAgICAgICAgIG1pbnggPSBwYXRjaC5ib3hbal1bMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhdGNoLmJveFtqXVswXSA+IG1heHgpIHtcclxuICAgICAgICAgICAgICAgIG1heHggPSBwYXRjaC5ib3hbal1bMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhdGNoLmJveFtqXVsxXSA8IG1pbnkpIHtcclxuICAgICAgICAgICAgICAgIG1pbnkgPSBwYXRjaC5ib3hbal1bMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhdGNoLmJveFtqXVsxXSA+IG1heHkpIHtcclxuICAgICAgICAgICAgICAgIG1heHkgPSBwYXRjaC5ib3hbal1bMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYm94ID0gW1ttaW54LCBtaW55XSwgW21heHgsIG1pbnldLCBbbWF4eCwgbWF4eV0sIFttaW54LCBtYXh5XV07XHJcblxyXG4gICAgaWYgKF9jb25maWcuYm94RnJvbVBhdGNoZXMuc2hvd1RyYW5zZm9ybWVkQm94KSB7XHJcbiAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UGF0aChib3gsIHt4OiAwLCB5OiAxfSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LCB7Y29sb3I6ICcjZmYwMDAwJywgbGluZVdpZHRoOiAyfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2NhbGUgPSBfY29uZmlnLmhhbGZTYW1wbGUgPyAyIDogMTtcclxuICAgIC8vIHJldmVyc2Ugcm90YXRpb247XHJcbiAgICB0cmFuc01hdCA9IG1hdDIuaW52ZXJ0KHRyYW5zTWF0LCB0cmFuc01hdCk7XHJcbiAgICBmb3IgKCBqID0gMDsgaiA8IDQ7IGorKykge1xyXG4gICAgICAgIHZlYzIudHJhbnNmb3JtTWF0Mihib3hbal0sIGJveFtqXSwgdHJhbnNNYXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfY29uZmlnLmJveEZyb21QYXRjaGVzLnNob3dCQikge1xyXG4gICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgoYm94LCB7eDogMCwgeTogMX0sIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSwge2NvbG9yOiAnI2ZmMDAwMCcsIGxpbmVXaWR0aDogMn0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgdmVjMi5zY2FsZShib3hbal0sIGJveFtqXSwgc2NhbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBib3g7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgYmluYXJ5IGltYWdlIG9mIHRoZSBjdXJyZW50IGltYWdlXHJcbiAqL1xyXG5mdW5jdGlvbiBiaW5hcml6ZUltYWdlKCkge1xyXG4gICAgQ1ZVdGlscy5vdHN1VGhyZXNob2xkKF9jdXJyZW50SW1hZ2VXcmFwcGVyLCBfYmluYXJ5SW1hZ2VXcmFwcGVyKTtcclxuICAgIF9iaW5hcnlJbWFnZVdyYXBwZXIuemVyb0JvcmRlcigpO1xyXG4gICAgaWYgKF9jb25maWcuc2hvd0NhbnZhcykge1xyXG4gICAgICAgIF9iaW5hcnlJbWFnZVdyYXBwZXIuc2hvdyhfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnksIDI1NSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJdGVyYXRlIG92ZXIgdGhlIGVudGlyZSBpbWFnZVxyXG4gKiBleHRyYWN0IHBhdGNoZXNcclxuICovXHJcbmZ1bmN0aW9uIGZpbmRQYXRjaGVzKCkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgaixcclxuICAgICAgICB4LFxyXG4gICAgICAgIHksXHJcbiAgICAgICAgbW9tZW50cyxcclxuICAgICAgICBwYXRjaGVzRm91bmQgPSBbXSxcclxuICAgICAgICByYXN0ZXJpemVyLFxyXG4gICAgICAgIHJhc3RlclJlc3VsdCxcclxuICAgICAgICBwYXRjaDtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBfbnVtUGF0Y2hlcy54OyBpKyspIHtcclxuICAgICAgICBmb3IgKGogPSAwOyBqIDwgX251bVBhdGNoZXMueTsgaisrKSB7XHJcbiAgICAgICAgICAgIHggPSBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueCAqIGk7XHJcbiAgICAgICAgICAgIHkgPSBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueSAqIGo7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXBlcmF0ZSBwYXJ0c1xyXG4gICAgICAgICAgICBza2VsZXRvbml6ZSh4LCB5KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJhc3Rlcml6ZSwgZmluZCBpbmRpdmlkdWFsIGJhcnNcclxuICAgICAgICAgICAgX3NrZWxJbWFnZVdyYXBwZXIuemVyb0JvcmRlcigpO1xyXG4gICAgICAgICAgICBBcnJheUhlbHBlci5pbml0KF9sYWJlbEltYWdlV3JhcHBlci5kYXRhLCAwKTtcclxuICAgICAgICAgICAgcmFzdGVyaXplciA9IFJhc3Rlcml6ZXIuY3JlYXRlKF9za2VsSW1hZ2VXcmFwcGVyLCBfbGFiZWxJbWFnZVdyYXBwZXIpO1xyXG4gICAgICAgICAgICByYXN0ZXJSZXN1bHQgPSByYXN0ZXJpemVyLnJhc3Rlcml6ZSgwKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfY29uZmlnLnNob3dMYWJlbHMpIHtcclxuICAgICAgICAgICAgICAgIF9sYWJlbEltYWdlV3JhcHBlci5vdmVybGF5KF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeSwgTWF0aC5mbG9vcigzNjAgLyByYXN0ZXJSZXN1bHQuY291bnQpLFxyXG4gICAgICAgICAgICAgICAgICAgIHt4OiB4LCB5OiB5fSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSBtb21lbnRzIGZyb20gdGhlIHNrZWxldG9uaXplZCBwYXRjaFxyXG4gICAgICAgICAgICBtb21lbnRzID0gX2xhYmVsSW1hZ2VXcmFwcGVyLm1vbWVudHMocmFzdGVyUmVzdWx0LmNvdW50KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGV4dHJhY3QgZWxpZ2libGUgcGF0Y2hlc1xyXG4gICAgICAgICAgICBwYXRjaGVzRm91bmQgPSBwYXRjaGVzRm91bmQuY29uY2F0KGRlc2NyaWJlUGF0Y2gobW9tZW50cywgW2ksIGpdLCB4LCB5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChfY29uZmlnLnNob3dGb3VuZFBhdGNoZXMpIHtcclxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IHBhdGNoZXNGb3VuZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBwYXRjaCA9IHBhdGNoZXNGb3VuZFtpXTtcclxuICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UmVjdChwYXRjaC5wb3MsIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LFxyXG4gICAgICAgICAgICAgICAge2NvbG9yOiBcIiM5OWZmMDBcIiwgbGluZVdpZHRoOiAyfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwYXRjaGVzRm91bmQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaW5kcyB0aG9zZSBjb25uZWN0ZWQgYXJlYXMgd2hpY2ggY29udGFpbiBhdCBsZWFzdCA2IHBhdGNoZXNcclxuICogYW5kIHJldHVybnMgdGhlbSBvcmRlcmVkIERFU0MgYnkgdGhlIG51bWJlciBvZiBjb250YWluZWQgcGF0Y2hlc1xyXG4gKiBAcGFyYW0ge051bWJlcn0gbWF4TGFiZWxcclxuICovXHJcbmZ1bmN0aW9uIGZpbmRCaWdnZXN0Q29ubmVjdGVkQXJlYXMobWF4TGFiZWwpe1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc3VtLFxyXG4gICAgICAgIGxhYmVsSGlzdCA9IFtdLFxyXG4gICAgICAgIHRvcExhYmVscyA9IFtdO1xyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgbWF4TGFiZWw7IGkrKykge1xyXG4gICAgICAgIGxhYmVsSGlzdC5wdXNoKDApO1xyXG4gICAgfVxyXG4gICAgc3VtID0gX3BhdGNoTGFiZWxHcmlkLmRhdGEubGVuZ3RoO1xyXG4gICAgd2hpbGUgKHN1bS0tKSB7XHJcbiAgICAgICAgaWYgKF9wYXRjaExhYmVsR3JpZC5kYXRhW3N1bV0gPiAwKSB7XHJcbiAgICAgICAgICAgIGxhYmVsSGlzdFtfcGF0Y2hMYWJlbEdyaWQuZGF0YVtzdW1dIC0gMV0rKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGFiZWxIaXN0ID0gbGFiZWxIaXN0Lm1hcChmdW5jdGlvbih2YWwsIGlkeCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbDogdmFsLFxyXG4gICAgICAgICAgICBsYWJlbDogaWR4ICsgMVxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICBsYWJlbEhpc3Quc29ydChmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIGIudmFsIC0gYS52YWw7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBleHRyYWN0IHRvcCBhcmVhcyB3aXRoIGF0IGxlYXN0IDYgcGF0Y2hlcyBwcmVzZW50XHJcbiAgICB0b3BMYWJlbHMgPSBsYWJlbEhpc3QuZmlsdGVyKGZ1bmN0aW9uKGVsKSB7XHJcbiAgICAgICAgcmV0dXJuIGVsLnZhbCA+PSA1O1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRvcExhYmVscztcclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBmaW5kQm94ZXModG9wTGFiZWxzLCBtYXhMYWJlbCkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgaixcclxuICAgICAgICBzdW0sXHJcbiAgICAgICAgcGF0Y2hlcyA9IFtdLFxyXG4gICAgICAgIHBhdGNoLFxyXG4gICAgICAgIGJveCxcclxuICAgICAgICBib3hlcyA9IFtdLFxyXG4gICAgICAgIGhzdiA9IFswLCAxLCAxXSxcclxuICAgICAgICByZ2IgPSBbMCwgMCwgMF07XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCB0b3BMYWJlbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBzdW0gPSBfcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgcGF0Y2hlcy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHdoaWxlIChzdW0tLSkge1xyXG4gICAgICAgICAgICBpZiAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbc3VtXSA9PT0gdG9wTGFiZWxzW2ldLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRjaCA9IF9pbWFnZVRvUGF0Y2hHcmlkLmRhdGFbc3VtXTtcclxuICAgICAgICAgICAgICAgIHBhdGNoZXMucHVzaChwYXRjaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYm94ID0gYm94RnJvbVBhdGNoZXMocGF0Y2hlcyk7XHJcbiAgICAgICAgaWYgKGJveCkge1xyXG4gICAgICAgICAgICBib3hlcy5wdXNoKGJveCk7XHJcblxyXG4gICAgICAgICAgICAvLyBkcmF3IHBhdGNoLWxhYmVscyBpZiByZXF1ZXN0ZWRcclxuICAgICAgICAgICAgaWYgKF9jb25maWcuc2hvd1JlbWFpbmluZ1BhdGNoTGFiZWxzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IHBhdGNoZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRjaCA9IHBhdGNoZXNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgaHN2WzBdID0gKHRvcExhYmVsc1tpXS5sYWJlbCAvIChtYXhMYWJlbCArIDEpKSAqIDM2MDtcclxuICAgICAgICAgICAgICAgICAgICBDVlV0aWxzLmhzdjJyZ2IoaHN2LCByZ2IpO1xyXG4gICAgICAgICAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1JlY3QocGF0Y2gucG9zLCBfc3ViSW1hZ2VXcmFwcGVyLnNpemUsIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge2NvbG9yOiBcInJnYihcIiArIHJnYi5qb2luKFwiLFwiKSArIFwiKVwiLCBsaW5lV2lkdGg6IDJ9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBib3hlcztcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmQgc2ltaWxhciBtb21lbnRzICh2aWEgY2x1c3RlcilcclxuICogQHBhcmFtIHtPYmplY3R9IG1vbWVudHNcclxuICovXHJcbmZ1bmN0aW9uIHNpbWlsYXJNb21lbnRzKG1vbWVudHMpIHtcclxuICAgIHZhciBjbHVzdGVycyA9IENWVXRpbHMuY2x1c3Rlcihtb21lbnRzLCAwLjkwKTtcclxuICAgIHZhciB0b3BDbHVzdGVyID0gQ1ZVdGlscy50b3BHZW5lcmljKGNsdXN0ZXJzLCAxLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgcmV0dXJuIGUuZ2V0UG9pbnRzKCkubGVuZ3RoO1xyXG4gICAgfSk7XHJcbiAgICB2YXIgcG9pbnRzID0gW10sIHJlc3VsdCA9IFtdO1xyXG4gICAgaWYgKHRvcENsdXN0ZXIubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgcG9pbnRzID0gdG9wQ2x1c3RlclswXS5pdGVtLmdldFBvaW50cygpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBvaW50c1tpXS5wb2ludCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gc2tlbGV0b25pemUoeCwgeSkge1xyXG4gICAgX2JpbmFyeUltYWdlV3JhcHBlci5zdWJJbWFnZUFzQ29weShfc3ViSW1hZ2VXcmFwcGVyLCBDVlV0aWxzLmltYWdlUmVmKHgsIHkpKTtcclxuICAgIF9za2VsZXRvbml6ZXIuc2tlbGV0b25pemUoKTtcclxuXHJcbiAgICAvLyBTaG93IHNrZWxldG9uIGlmIHJlcXVlc3RlZFxyXG4gICAgaWYgKF9jb25maWcuc2hvd1NrZWxldG9uKSB7XHJcbiAgICAgICAgX3NrZWxJbWFnZVdyYXBwZXIub3ZlcmxheShfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnksIDM2MCwgQ1ZVdGlscy5pbWFnZVJlZih4LCB5KSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeHRyYWN0cyBhbmQgZGVzY3JpYmVzIHRob3NlIHBhdGNoZXMgd2hpY2ggc2VlbSB0byBjb250YWluIGEgYmFyY29kZSBwYXR0ZXJuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IG1vbWVudHNcclxuICogQHBhcmFtIHtPYmplY3R9IHBhdGNoUG9zLFxyXG4gKiBAcGFyYW0ge051bWJlcn0geFxyXG4gKiBAcGFyYW0ge051bWJlcn0geVxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IGxpc3Qgb2YgcGF0Y2hlc1xyXG4gKi9cclxuZnVuY3Rpb24gZGVzY3JpYmVQYXRjaChtb21lbnRzLCBwYXRjaFBvcywgeCwgeSkge1xyXG4gICAgdmFyIGssXHJcbiAgICAgICAgYXZnLFxyXG4gICAgICAgIGVsaWdpYmxlTW9tZW50cyA9IFtdLFxyXG4gICAgICAgIG1hdGNoaW5nTW9tZW50cyxcclxuICAgICAgICBwYXRjaCxcclxuICAgICAgICBwYXRjaGVzRm91bmQgPSBbXSxcclxuICAgICAgICBtaW5Db21wb25lbnRXZWlnaHQgPSBNYXRoLmNlaWwoX3BhdGNoU2l6ZS54IC8gMyk7XHJcblxyXG4gICAgaWYgKG1vbWVudHMubGVuZ3RoID49IDIpIHtcclxuICAgICAgICAvLyBvbmx5IGNvbGxlY3QgbW9tZW50cyB3aGljaCdzIGFyZWEgY292ZXJzIGF0IGxlYXN0IG1pbkNvbXBvbmVudFdlaWdodCBwaXhlbHMuXHJcbiAgICAgICAgZm9yICggayA9IDA7IGsgPCBtb21lbnRzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIGlmIChtb21lbnRzW2tdLm0wMCA+IG1pbkNvbXBvbmVudFdlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgZWxpZ2libGVNb21lbnRzLnB1c2gobW9tZW50c1trXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmIGF0IGxlYXN0IDIgbW9tZW50cyBhcmUgZm91bmQgd2hpY2ggaGF2ZSBhdCBsZWFzdCBtaW5Db21wb25lbnRXZWlnaHRzIGNvdmVyZWRcclxuICAgICAgICBpZiAoZWxpZ2libGVNb21lbnRzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgICAgIG1hdGNoaW5nTW9tZW50cyA9IHNpbWlsYXJNb21lbnRzKGVsaWdpYmxlTW9tZW50cyk7XHJcbiAgICAgICAgICAgIGF2ZyA9IDA7XHJcbiAgICAgICAgICAgIC8vIGRldGVybWluZSB0aGUgc2ltaWxhcml0eSBvZiB0aGUgbW9tZW50c1xyXG4gICAgICAgICAgICBmb3IgKCBrID0gMDsgayA8IG1hdGNoaW5nTW9tZW50cy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgYXZnICs9IG1hdGNoaW5nTW9tZW50c1trXS5yYWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIE9ubHkgdHdvIG9mIHRoZSBtb21lbnRzIGFyZSBhbGxvd2VkIG5vdCB0byBmaXQgaW50byB0aGUgZXF1YXRpb25cclxuICAgICAgICAgICAgLy8gYWRkIHRoZSBwYXRjaCB0byB0aGUgc2V0XHJcbiAgICAgICAgICAgIGlmIChtYXRjaGluZ01vbWVudHMubGVuZ3RoID4gMVxyXG4gICAgICAgICAgICAgICAgICAgICYmIG1hdGNoaW5nTW9tZW50cy5sZW5ndGggPj0gKGVsaWdpYmxlTW9tZW50cy5sZW5ndGggLyA0KSAqIDNcclxuICAgICAgICAgICAgICAgICAgICAmJiBtYXRjaGluZ01vbWVudHMubGVuZ3RoID4gbW9tZW50cy5sZW5ndGggLyA0KSB7XHJcbiAgICAgICAgICAgICAgICBhdmcgLz0gbWF0Y2hpbmdNb21lbnRzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHBhdGNoID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBwYXRjaFBvc1sxXSAqIF9udW1QYXRjaGVzLnggKyBwYXRjaFBvc1swXSxcclxuICAgICAgICAgICAgICAgICAgICBwb3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogeVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYm94OiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlYzIuY2xvbmUoW3gsIHldKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmVjMi5jbG9uZShbeCArIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS54LCB5XSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlYzIuY2xvbmUoW3ggKyBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueCwgeSArIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS55XSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlYzIuY2xvbmUoW3gsIHkgKyBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueV0pXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBtb21lbnRzOiBtYXRjaGluZ01vbWVudHMsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkOiBhdmcsXHJcbiAgICAgICAgICAgICAgICAgICAgdmVjOiB2ZWMyLmNsb25lKFtNYXRoLmNvcyhhdmcpLCBNYXRoLnNpbihhdmcpXSlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBwYXRjaGVzRm91bmQucHVzaChwYXRjaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGF0Y2hlc0ZvdW5kO1xyXG59XHJcblxyXG4vKipcclxuICogZmluZHMgcGF0Y2hlcyB3aGljaCBhcmUgY29ubmVjdGVkIGFuZCBzaGFyZSB0aGUgc2FtZSBvcmllbnRhdGlvblxyXG4gKiBAcGFyYW0ge09iamVjdH0gcGF0Y2hlc0ZvdW5kXHJcbiAqL1xyXG5mdW5jdGlvbiByYXN0ZXJpemVBbmd1bGFyU2ltaWxhcml0eShwYXRjaGVzRm91bmQpIHtcclxuICAgIHZhciBsYWJlbCA9IDAsXHJcbiAgICAgICAgdGhyZXNob2xkID0gMC45NSxcclxuICAgICAgICBjdXJySWR4ID0gMCxcclxuICAgICAgICBqLFxyXG4gICAgICAgIHBhdGNoLFxyXG4gICAgICAgIGhzdiA9IFswLCAxLCAxXSxcclxuICAgICAgICByZ2IgPSBbMCwgMCwgMF07XHJcblxyXG4gICAgZnVuY3Rpb24gbm90WWV0UHJvY2Vzc2VkKCkge1xyXG4gICAgICAgIHZhciBpO1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgX3BhdGNoTGFiZWxHcmlkLmRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKF9wYXRjaExhYmVsR3JpZC5kYXRhW2ldID09PSAwICYmIF9wYXRjaEdyaWQuZGF0YVtpXSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF9wYXRjaExhYmVsR3JpZC5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdHJhY2UoY3VycmVudElkeCkge1xyXG4gICAgICAgIHZhciB4LFxyXG4gICAgICAgICAgICB5LFxyXG4gICAgICAgICAgICBjdXJyZW50UGF0Y2gsXHJcbiAgICAgICAgICAgIGlkeCxcclxuICAgICAgICAgICAgZGlyLFxyXG4gICAgICAgICAgICBjdXJyZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgeDogY3VycmVudElkeCAlIF9wYXRjaExhYmVsR3JpZC5zaXplLngsXHJcbiAgICAgICAgICAgICAgICB5OiAoY3VycmVudElkeCAvIF9wYXRjaExhYmVsR3JpZC5zaXplLngpIHwgMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzaW1pbGFyaXR5O1xyXG5cclxuICAgICAgICBpZiAoY3VycmVudElkeCA8IF9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjdXJyZW50UGF0Y2ggPSBfaW1hZ2VUb1BhdGNoR3JpZC5kYXRhW2N1cnJlbnRJZHhdO1xyXG4gICAgICAgICAgICAvLyBhc3NpZ24gbGFiZWxcclxuICAgICAgICAgICAgX3BhdGNoTGFiZWxHcmlkLmRhdGFbY3VycmVudElkeF0gPSBsYWJlbDtcclxuICAgICAgICAgICAgZm9yICggZGlyID0gMDsgZGlyIDwgVHJhY2VyLnNlYXJjaERpcmVjdGlvbnMubGVuZ3RoOyBkaXIrKykge1xyXG4gICAgICAgICAgICAgICAgeSA9IGN1cnJlbnQueSArIFRyYWNlci5zZWFyY2hEaXJlY3Rpb25zW2Rpcl1bMF07XHJcbiAgICAgICAgICAgICAgICB4ID0gY3VycmVudC54ICsgVHJhY2VyLnNlYXJjaERpcmVjdGlvbnNbZGlyXVsxXTtcclxuICAgICAgICAgICAgICAgIGlkeCA9IHkgKiBfcGF0Y2hMYWJlbEdyaWQuc2l6ZS54ICsgeDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjb250aW51ZSBpZiBwYXRjaCBlbXB0eVxyXG4gICAgICAgICAgICAgICAgaWYgKF9wYXRjaEdyaWQuZGF0YVtpZHhdID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3BhdGNoTGFiZWxHcmlkLmRhdGFbaWR4XSA9IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKF9wYXRjaExhYmVsR3JpZC5kYXRhW2lkeF0gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzaW1pbGFyaXR5ID0gTWF0aC5hYnModmVjMi5kb3QoX2ltYWdlVG9QYXRjaEdyaWQuZGF0YVtpZHhdLnZlYywgY3VycmVudFBhdGNoLnZlYykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaW1pbGFyaXR5ID4gdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNlKGlkeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHByZXBhcmUgZm9yIGZpbmRpbmcgdGhlIHJpZ2h0IHBhdGNoZXNcclxuICAgIEFycmF5SGVscGVyLmluaXQoX3BhdGNoR3JpZC5kYXRhLCAwKTtcclxuICAgIEFycmF5SGVscGVyLmluaXQoX3BhdGNoTGFiZWxHcmlkLmRhdGEsIDApO1xyXG4gICAgQXJyYXlIZWxwZXIuaW5pdChfaW1hZ2VUb1BhdGNoR3JpZC5kYXRhLCBudWxsKTtcclxuXHJcbiAgICBmb3IgKCBqID0gMDsgaiA8IHBhdGNoZXNGb3VuZC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIHBhdGNoID0gcGF0Y2hlc0ZvdW5kW2pdO1xyXG4gICAgICAgIF9pbWFnZVRvUGF0Y2hHcmlkLmRhdGFbcGF0Y2guaW5kZXhdID0gcGF0Y2g7XHJcbiAgICAgICAgX3BhdGNoR3JpZC5kYXRhW3BhdGNoLmluZGV4XSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmFzdGVyaXplIHRoZSBwYXRjaGVzIGZvdW5kIHRvIGRldGVybWluZSBhcmVhXHJcbiAgICBfcGF0Y2hHcmlkLnplcm9Cb3JkZXIoKTtcclxuXHJcbiAgICB3aGlsZSAoKCBjdXJySWR4ID0gbm90WWV0UHJvY2Vzc2VkKCkpIDwgX3BhdGNoTGFiZWxHcmlkLmRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgbGFiZWwrKztcclxuICAgICAgICB0cmFjZShjdXJySWR4KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBkcmF3IHBhdGNoLWxhYmVscyBpZiByZXF1ZXN0ZWRcclxuICAgIGlmIChfY29uZmlnLnNob3dQYXRjaExhYmVscykge1xyXG4gICAgICAgIGZvciAoIGogPSAwOyBqIDwgX3BhdGNoTGFiZWxHcmlkLmRhdGEubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgaWYgKF9wYXRjaExhYmVsR3JpZC5kYXRhW2pdID4gMCAmJiBfcGF0Y2hMYWJlbEdyaWQuZGF0YVtqXSA8PSBsYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgcGF0Y2ggPSBfaW1hZ2VUb1BhdGNoR3JpZC5kYXRhW2pdO1xyXG4gICAgICAgICAgICAgICAgaHN2WzBdID0gKF9wYXRjaExhYmVsR3JpZC5kYXRhW2pdIC8gKGxhYmVsICsgMSkpICogMzYwO1xyXG4gICAgICAgICAgICAgICAgQ1ZVdGlscy5oc3YycmdiKGhzdiwgcmdiKTtcclxuICAgICAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1JlY3QocGF0Y2gucG9zLCBfc3ViSW1hZ2VXcmFwcGVyLnNpemUsIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSxcclxuICAgICAgICAgICAgICAgICAgICB7Y29sb3I6IFwicmdiKFwiICsgcmdiLmpvaW4oXCIsXCIpICsgXCIpXCIsIGxpbmVXaWR0aDogMn0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsYWJlbDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oaW5wdXRJbWFnZVdyYXBwZXIsIGNvbmZpZykge1xyXG4gICAgICAgIF9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgX2lucHV0SW1hZ2VXcmFwcGVyID0gaW5wdXRJbWFnZVdyYXBwZXI7XHJcblxyXG4gICAgICAgIGluaXRCdWZmZXJzKCk7XHJcbiAgICAgICAgaW5pdENhbnZhcygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBsb2NhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBwYXRjaGVzRm91bmQsXHJcbiAgICAgICAgICAgIHRvcExhYmVscyxcclxuICAgICAgICAgICAgYm94ZXM7XHJcblxyXG4gICAgICAgIGlmIChfY29uZmlnLmhhbGZTYW1wbGUpIHtcclxuICAgICAgICAgICAgQ1ZVdGlscy5oYWxmU2FtcGxlKF9pbnB1dEltYWdlV3JhcHBlciwgX2N1cnJlbnRJbWFnZVdyYXBwZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYmluYXJpemVJbWFnZSgpO1xyXG4gICAgICAgIHBhdGNoZXNGb3VuZCA9IGZpbmRQYXRjaGVzKCk7XHJcbiAgICAgICAgLy8gcmV0dXJuIHVubGVzcyA1JSBvciBtb3JlIHBhdGNoZXMgYXJlIGZvdW5kXHJcbiAgICAgICAgaWYgKHBhdGNoZXNGb3VuZC5sZW5ndGggPCBfbnVtUGF0Y2hlcy54ICogX251bVBhdGNoZXMueSAqIDAuMDUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByYXN0ZXJyaXplIGFyZWEgYnkgY29tcGFyaW5nIGFuZ3VsYXIgc2ltaWxhcml0eTtcclxuICAgICAgICB2YXIgbWF4TGFiZWwgPSByYXN0ZXJpemVBbmd1bGFyU2ltaWxhcml0eShwYXRjaGVzRm91bmQpO1xyXG4gICAgICAgIGlmIChtYXhMYWJlbCA8IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzZWFyY2ggZm9yIGFyZWEgd2l0aCB0aGUgbW9zdCBwYXRjaGVzIChiaWdnZXN0IGNvbm5lY3RlZCBhcmVhKVxyXG4gICAgICAgIHRvcExhYmVscyA9IGZpbmRCaWdnZXN0Q29ubmVjdGVkQXJlYXMobWF4TGFiZWwpO1xyXG4gICAgICAgIGlmICh0b3BMYWJlbHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYm94ZXMgPSBmaW5kQm94ZXModG9wTGFiZWxzLCBtYXhMYWJlbCk7XHJcbiAgICAgICAgcmV0dXJuIGJveGVzO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja0ltYWdlQ29uc3RyYWludHM6IGZ1bmN0aW9uKGlucHV0U3RyZWFtLCBjb25maWcpIHtcclxuICAgICAgICB2YXIgcGF0Y2hTaXplLFxyXG4gICAgICAgICAgICB3aWR0aCA9IGlucHV0U3RyZWFtLmdldFdpZHRoKCksXHJcbiAgICAgICAgICAgIGhlaWdodCA9IGlucHV0U3RyZWFtLmdldEhlaWdodCgpLFxyXG4gICAgICAgICAgICBoYWxmU2FtcGxlID0gY29uZmlnLmhhbGZTYW1wbGUgPyAwLjUgOiAxLFxyXG4gICAgICAgICAgICBzaXplLFxyXG4gICAgICAgICAgICBhcmVhO1xyXG5cclxuICAgICAgICAvLyBjYWxjdWxhdGUgd2lkdGggYW5kIGhlaWdodCBiYXNlZCBvbiBhcmVhXHJcbiAgICAgICAgaWYgKGlucHV0U3RyZWFtLmdldENvbmZpZygpLmFyZWEpIHtcclxuICAgICAgICAgICAgYXJlYSA9IENWVXRpbHMuY29tcHV0ZUltYWdlQXJlYSh3aWR0aCwgaGVpZ2h0LCBpbnB1dFN0cmVhbS5nZXRDb25maWcoKS5hcmVhKTtcclxuICAgICAgICAgICAgaW5wdXRTdHJlYW0uc2V0VG9wUmlnaHQoe3g6IGFyZWEuc3gsIHk6IGFyZWEuc3l9KTtcclxuICAgICAgICAgICAgaW5wdXRTdHJlYW0uc2V0Q2FudmFzU2l6ZSh7eDogd2lkdGgsIHk6IGhlaWdodH0pO1xyXG4gICAgICAgICAgICB3aWR0aCA9IGFyZWEuc3c7XHJcbiAgICAgICAgICAgIGhlaWdodCA9IGFyZWEuc2g7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzaXplID0ge1xyXG4gICAgICAgICAgICB4OiBNYXRoLmZsb29yKHdpZHRoICogaGFsZlNhbXBsZSksXHJcbiAgICAgICAgICAgIHk6IE1hdGguZmxvb3IoaGVpZ2h0ICogaGFsZlNhbXBsZSlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwYXRjaFNpemUgPSBDVlV0aWxzLmNhbGN1bGF0ZVBhdGNoU2l6ZShjb25maWcucGF0Y2hTaXplLCBzaXplKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBhdGNoLVNpemU6IFwiICsgSlNPTi5zdHJpbmdpZnkocGF0Y2hTaXplKSk7XHJcblxyXG4gICAgICAgIGlucHV0U3RyZWFtLnNldFdpZHRoKE1hdGguZmxvb3IoTWF0aC5mbG9vcihzaXplLnggLyBwYXRjaFNpemUueCkgKiAoMSAvIGhhbGZTYW1wbGUpICogcGF0Y2hTaXplLngpKTtcclxuICAgICAgICBpbnB1dFN0cmVhbS5zZXRIZWlnaHQoTWF0aC5mbG9vcihNYXRoLmZsb29yKHNpemUueSAvIHBhdGNoU2l6ZS55KSAqICgxIC8gaGFsZlNhbXBsZSkgKiBwYXRjaFNpemUueSkpO1xyXG5cclxuICAgICAgICBpZiAoKGlucHV0U3RyZWFtLmdldFdpZHRoKCkgJSBwYXRjaFNpemUueCkgPT09IDAgJiYgKGlucHV0U3RyZWFtLmdldEhlaWdodCgpICUgcGF0Y2hTaXplLnkpID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW1hZ2UgZGltZW5zaW9ucyBkbyBub3QgY29tcGx5IHdpdGggdGhlIGN1cnJlbnQgc2V0dGluZ3M6IFdpZHRoIChcIiArXHJcbiAgICAgICAgICAgIHdpZHRoICsgXCIgKWFuZCBoZWlnaHQgKFwiICsgaGVpZ2h0ICtcclxuICAgICAgICAgICAgXCIpIG11c3QgYSBtdWx0aXBsZSBvZiBcIiArIHBhdGNoU2l6ZS54KTtcclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvbG9jYXRvci9iYXJjb2RlX2xvY2F0b3IuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBkcmF3UmVjdDogZnVuY3Rpb24ocG9zLCBzaXplLCBjdHgsIHN0eWxlKXtcclxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdHlsZS5jb2xvcjtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gc3R5bGUuY29sb3I7XHJcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGN0eC5zdHJva2VSZWN0KHBvcy54LCBwb3MueSwgc2l6ZS54LCBzaXplLnkpO1xyXG4gICAgfSxcclxuICAgIGRyYXdQYXRoOiBmdW5jdGlvbihwYXRoLCBkZWYsIGN0eCwgc3R5bGUpIHtcclxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdHlsZS5jb2xvcjtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gc3R5bGUuY29sb3I7XHJcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0eWxlLmxpbmVXaWR0aDtcclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY3R4Lm1vdmVUbyhwYXRoWzBdW2RlZi54XSwgcGF0aFswXVtkZWYueV0pO1xyXG4gICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgcGF0aC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBjdHgubGluZVRvKHBhdGhbal1bZGVmLnhdLCBwYXRoW2pdW2RlZi55XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcclxuICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICB9LFxyXG4gICAgZHJhd0ltYWdlOiBmdW5jdGlvbihpbWFnZURhdGEsIHNpemUsIGN0eCkge1xyXG4gICAgICAgIHZhciBjYW52YXNEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBzaXplLngsIHNpemUueSksXHJcbiAgICAgICAgICAgIGRhdGEgPSBjYW52YXNEYXRhLmRhdGEsXHJcbiAgICAgICAgICAgIGltYWdlRGF0YVBvcyA9IGltYWdlRGF0YS5sZW5ndGgsXHJcbiAgICAgICAgICAgIGNhbnZhc0RhdGFQb3MgPSBkYXRhLmxlbmd0aCxcclxuICAgICAgICAgICAgdmFsdWU7XHJcblxyXG4gICAgICAgIGlmIChjYW52YXNEYXRhUG9zIC8gaW1hZ2VEYXRhUG9zICE9PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUgKGltYWdlRGF0YVBvcy0tKXtcclxuICAgICAgICAgICAgdmFsdWUgPSBpbWFnZURhdGFbaW1hZ2VEYXRhUG9zXTtcclxuICAgICAgICAgICAgZGF0YVstLWNhbnZhc0RhdGFQb3NdID0gMjU1O1xyXG4gICAgICAgICAgICBkYXRhWy0tY2FudmFzRGF0YVBvc10gPSB2YWx1ZTtcclxuICAgICAgICAgICAgZGF0YVstLWNhbnZhc0RhdGFQb3NdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGRhdGFbLS1jYW52YXNEYXRhUG9zXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHgucHV0SW1hZ2VEYXRhKGNhbnZhc0RhdGEsIDAsIDApO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vaW1hZ2VfZGVidWcuanNcbiAqKi8iLCJpbXBvcnQgVHJhY2VyIGZyb20gJy4vdHJhY2VyJztcclxuXHJcbi8qKlxyXG4gKiBodHRwOi8vd3d3LmNvZGVwcm9qZWN0LmNvbS9UaXBzLzQwNzE3Mi9Db25uZWN0ZWQtQ29tcG9uZW50LUxhYmVsaW5nLWFuZC1WZWN0b3JpemF0aW9uXHJcbiAqL1xyXG52YXIgUmFzdGVyaXplciA9IHtcclxuICAgIGNyZWF0ZUNvbnRvdXIyRDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGlyOiBudWxsLFxyXG4gICAgICAgICAgICBpbmRleDogbnVsbCxcclxuICAgICAgICAgICAgZmlyc3RWZXJ0ZXg6IG51bGwsXHJcbiAgICAgICAgICAgIGluc2lkZUNvbnRvdXJzOiBudWxsLFxyXG4gICAgICAgICAgICBuZXh0cGVlcjogbnVsbCxcclxuICAgICAgICAgICAgcHJldnBlZXI6IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIENPTlRPVVJfRElSOiB7XHJcbiAgICAgICAgQ1dfRElSOiAwLFxyXG4gICAgICAgIENDV19ESVI6IDEsXHJcbiAgICAgICAgVU5LTk9XTl9ESVI6IDJcclxuICAgIH0sXHJcbiAgICBESVI6IHtcclxuICAgICAgICBPVVRTSURFX0VER0U6IC0zMjc2NyxcclxuICAgICAgICBJTlNJREVfRURHRTogLTMyNzY2XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGxhYmVsV3JhcHBlcikge1xyXG4gICAgICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICAgICAgbGFiZWxEYXRhID0gbGFiZWxXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgICAgIHdpZHRoID0gaW1hZ2VXcmFwcGVyLnNpemUueCxcclxuICAgICAgICAgICAgaGVpZ2h0ID0gaW1hZ2VXcmFwcGVyLnNpemUueSxcclxuICAgICAgICAgICAgdHJhY2VyID0gVHJhY2VyLmNyZWF0ZShpbWFnZVdyYXBwZXIsIGxhYmVsV3JhcHBlcik7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJhc3Rlcml6ZTogZnVuY3Rpb24oZGVwdGhsYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbG9yLFxyXG4gICAgICAgICAgICAgICAgICAgIGJjLFxyXG4gICAgICAgICAgICAgICAgICAgIGxjLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgY3gsXHJcbiAgICAgICAgICAgICAgICAgICAgY3ksXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3JNYXAgPSBbXSxcclxuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgcCxcclxuICAgICAgICAgICAgICAgICAgICBjYyxcclxuICAgICAgICAgICAgICAgICAgICBzYyxcclxuICAgICAgICAgICAgICAgICAgICBwb3MsXHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGVkQ291bnQgPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCA0MDA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yTWFwW2ldID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb2xvck1hcFswXSA9IGltYWdlRGF0YVswXTtcclxuICAgICAgICAgICAgICAgIGNjID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGZvciAoIGN5ID0gMTsgY3kgPCBoZWlnaHQgLSAxOyBjeSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxpbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgYmMgPSBjb2xvck1hcFswXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKCBjeCA9IDE7IGN4IDwgd2lkdGggLSAxOyBjeCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcyA9IGN5ICogd2lkdGggKyBjeDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsRGF0YVtwb3NdID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IGltYWdlRGF0YVtwb3NdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9yICE9PSBiYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxjID0gY29ubmVjdGVkQ291bnQgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvck1hcFtsY10gPSBjb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmMgPSBjb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVydGV4ID0gdHJhY2VyLmNvbnRvdXJUcmFjaW5nKGN5LCBjeCwgbGMsIGNvbG9yLCBSYXN0ZXJpemVyLkRJUi5PVVRTSURFX0VER0UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmVydGV4ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0ZWRDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxpbmRleCA9IGxjO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcCA9IFJhc3Rlcml6ZXIuY3JlYXRlQ29udG91cjJEKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmRpciA9IFJhc3Rlcml6ZXIuQ09OVE9VUl9ESVIuQ1dfRElSO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5pbmRleCA9IGxhYmVsaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmZpcnN0VmVydGV4ID0gdmVydGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5uZXh0cGVlciA9IGNjO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5pbnNpZGVDb250b3VycyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2MgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5wcmV2cGVlciA9IHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYyA9IHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXggPSB0cmFjZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jb250b3VyVHJhY2luZyhjeSwgY3gsIFJhc3Rlcml6ZXIuRElSLklOU0lERV9FREdFLCBjb2xvciwgbGFiZWxpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2ZXJ0ZXggIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBSYXN0ZXJpemVyLmNyZWF0ZUNvbnRvdXIyRCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5maXJzdFZlcnRleCA9IHZlcnRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuaW5zaWRlQ29udG91cnMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlcHRobGFiZWwgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmRpciA9IFJhc3Rlcml6ZXIuQ09OVE9VUl9ESVIuQ0NXX0RJUjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5kaXIgPSBSYXN0ZXJpemVyLkNPTlRPVVJfRElSLkNXX0RJUjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuaW5kZXggPSBkZXB0aGxhYmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2MgPSBjYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgoc2MgIT09IG51bGwpICYmIHNjLmluZGV4ICE9PSBsYWJlbGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2MgPSBzYy5uZXh0cGVlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzYyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubmV4dHBlZXIgPSBzYy5pbnNpZGVDb250b3VycztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2MuaW5zaWRlQ29udG91cnMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2MuaW5zaWRlQ29udG91cnMucHJldnBlZXIgPSBwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYy5pbnNpZGVDb250b3VycyA9IHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsRGF0YVtwb3NdID0gbGFiZWxpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsYWJlbERhdGFbcG9zXSA9PT0gUmFzdGVyaXplci5ESVIuT1VUU0lERV9FREdFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgbGFiZWxEYXRhW3Bvc10gPT09IFJhc3Rlcml6ZXIuRElSLklOU0lERV9FREdFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbGluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbERhdGFbcG9zXSA9PT0gUmFzdGVyaXplci5ESVIuSU5TSURFX0VER0UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYyA9IGltYWdlRGF0YVtwb3NdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYyA9IGNvbG9yTWFwWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxpbmRleCA9IGxhYmVsRGF0YVtwb3NdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmMgPSBjb2xvck1hcFtsYWJlbGluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNjID0gY2M7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoc2MgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBzYy5pbmRleCA9IGRlcHRobGFiZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgc2MgPSBzYy5uZXh0cGVlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2M6IGNjLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiBjb25uZWN0ZWRDb3VudFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVidWc6IHtcclxuICAgICAgICAgICAgICAgIGRyYXdDb250b3VyOiBmdW5jdGlvbihjYW52YXMsIGZpcnN0Q29udG91cikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcSA9IGZpcnN0Q29udG91cixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwicmVkXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmVkXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpcSA9IHBxLmluc2lkZUNvbnRvdXJzO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlxID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChwcSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXEgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHEgPSBpcTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlxID0gaXEubmV4dHBlZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxID0gcHE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcSA9IHBxLm5leHRwZWVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBxICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXEgPSBwcS5pbnNpZGVDb250b3VycztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHEuZGlyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUmFzdGVyaXplci5DT05UT1VSX0RJUi5DV19ESVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcInJlZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUmFzdGVyaXplci5DT05UT1VSX0RJUi5DQ1dfRElSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJibHVlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBSYXN0ZXJpemVyLkNPTlRPVVJfRElSLlVOS05PV05fRElSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBxLmZpcnN0VmVydGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5tb3ZlVG8ocC54LCBwLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwID0gcC5uZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVUbyhwLngsIHAueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKHAgIT09IHEuZmlyc3RWZXJ0ZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJhc3Rlcml6ZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2xvY2F0b3IvcmFzdGVyaXplci5qc1xuICoqLyIsIi8qKlxyXG4gKiBodHRwOi8vd3d3LmNvZGVwcm9qZWN0LmNvbS9UaXBzLzQwNzE3Mi9Db25uZWN0ZWQtQ29tcG9uZW50LUxhYmVsaW5nLWFuZC1WZWN0b3JpemF0aW9uXHJcbiAqL1xyXG52YXIgVHJhY2VyID0ge1xyXG4gICAgc2VhcmNoRGlyZWN0aW9uczogW1swLCAxXSwgWzEsIDFdLCBbMSwgMF0sIFsxLCAtMV0sIFswLCAtMV0sIFstMSwgLTFdLCBbLTEsIDBdLCBbLTEsIDFdXSxcclxuICAgIGNyZWF0ZTogZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCBsYWJlbFdyYXBwZXIpIHtcclxuICAgICAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgICAgIGxhYmVsRGF0YSA9IGxhYmVsV3JhcHBlci5kYXRhLFxyXG4gICAgICAgICAgICBzZWFyY2hEaXJlY3Rpb25zID0gdGhpcy5zZWFyY2hEaXJlY3Rpb25zLFxyXG4gICAgICAgICAgICB3aWR0aCA9IGltYWdlV3JhcHBlci5zaXplLngsXHJcbiAgICAgICAgICAgIHBvcztcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdHJhY2UoY3VycmVudCwgY29sb3IsIGxhYmVsLCBlZGdlbGFiZWwpIHtcclxuICAgICAgICAgICAgdmFyIGksXHJcbiAgICAgICAgICAgICAgICB5LFxyXG4gICAgICAgICAgICAgICAgeDtcclxuXHJcbiAgICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB5ID0gY3VycmVudC5jeSArIHNlYXJjaERpcmVjdGlvbnNbY3VycmVudC5kaXJdWzBdO1xyXG4gICAgICAgICAgICAgICAgeCA9IGN1cnJlbnQuY3ggKyBzZWFyY2hEaXJlY3Rpb25zW2N1cnJlbnQuZGlyXVsxXTtcclxuICAgICAgICAgICAgICAgIHBvcyA9IHkgKiB3aWR0aCArIHg7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGltYWdlRGF0YVtwb3NdID09PSBjb2xvcikgJiYgKChsYWJlbERhdGFbcG9zXSA9PT0gMCkgfHwgKGxhYmVsRGF0YVtwb3NdID09PSBsYWJlbCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxEYXRhW3Bvc10gPSBsYWJlbDtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50LmN5ID0geTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50LmN4ID0geDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsRGF0YVtwb3NdID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsRGF0YVtwb3NdID0gZWRnZWxhYmVsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50LmRpciA9IChjdXJyZW50LmRpciArIDEpICUgODtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB2ZXJ0ZXgyRCh4LCB5LCBkaXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGRpcjogZGlyLFxyXG4gICAgICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgICAgIHk6IHksXHJcbiAgICAgICAgICAgICAgICBuZXh0OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcHJldjogbnVsbFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY29udG91clRyYWNpbmcoc3ksIHN4LCBsYWJlbCwgY29sb3IsIGVkZ2VsYWJlbCkge1xyXG4gICAgICAgICAgICB2YXIgRnYgPSBudWxsLFxyXG4gICAgICAgICAgICAgICAgQ3YsXHJcbiAgICAgICAgICAgICAgICBQLFxyXG4gICAgICAgICAgICAgICAgbGRpcixcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3g6IHN4LFxyXG4gICAgICAgICAgICAgICAgICAgIGN5OiBzeSxcclxuICAgICAgICAgICAgICAgICAgICBkaXI6IDBcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAodHJhY2UoY3VycmVudCwgY29sb3IsIGxhYmVsLCBlZGdlbGFiZWwpKSB7XHJcbiAgICAgICAgICAgICAgICBGdiA9IHZlcnRleDJEKHN4LCBzeSwgY3VycmVudC5kaXIpO1xyXG4gICAgICAgICAgICAgICAgQ3YgPSBGdjtcclxuICAgICAgICAgICAgICAgIGxkaXIgPSBjdXJyZW50LmRpcjtcclxuICAgICAgICAgICAgICAgIFAgPSB2ZXJ0ZXgyRChjdXJyZW50LmN4LCBjdXJyZW50LmN5LCAwKTtcclxuICAgICAgICAgICAgICAgIFAucHJldiA9IEN2O1xyXG4gICAgICAgICAgICAgICAgQ3YubmV4dCA9IFA7XHJcbiAgICAgICAgICAgICAgICBQLm5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgQ3YgPSBQO1xyXG4gICAgICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuZGlyID0gKGN1cnJlbnQuZGlyICsgNikgJSA4O1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNlKGN1cnJlbnQsIGNvbG9yLCBsYWJlbCwgZWRnZWxhYmVsKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGRpciAhPT0gY3VycmVudC5kaXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ3YuZGlyID0gY3VycmVudC5kaXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFAgPSB2ZXJ0ZXgyRChjdXJyZW50LmN4LCBjdXJyZW50LmN5LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUC5wcmV2ID0gQ3Y7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEN2Lm5leHQgPSBQO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQLm5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDdiA9IFA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ3YuZGlyID0gbGRpcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ3YueCA9IGN1cnJlbnQuY3g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEN2LnkgPSBjdXJyZW50LmN5O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZGlyID0gY3VycmVudC5kaXI7XHJcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChjdXJyZW50LmN4ICE9PSBzeCB8fCBjdXJyZW50LmN5ICE9PSBzeSk7XHJcbiAgICAgICAgICAgICAgICBGdi5wcmV2ID0gQ3YucHJldjtcclxuICAgICAgICAgICAgICAgIEN2LnByZXYubmV4dCA9IEZ2O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBGdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRyYWNlOiBmdW5jdGlvbihjdXJyZW50LCBjb2xvciwgbGFiZWwsIGVkZ2VsYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYWNlKGN1cnJlbnQsIGNvbG9yLCBsYWJlbCwgZWRnZWxhYmVsKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29udG91clRyYWNpbmc6IGZ1bmN0aW9uKHN5LCBzeCwgbGFiZWwsIGNvbG9yLCBlZGdlbGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb250b3VyVHJhY2luZyhzeSwgc3gsIGxhYmVsLCBjb2xvciwgZWRnZWxhYmVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoVHJhY2VyKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvbG9jYXRvci90cmFjZXIuanNcbiAqKi8iLCIvKiBAcHJlc2VydmUgQVNNIEJFR0lOICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGVxZXFlcSovXHJcbmZ1bmN0aW9uIFNrZWxldG9uaXplcihzdGRsaWIsIGZvcmVpZ24sIGJ1ZmZlcikge1xyXG4gICAgXCJ1c2UgYXNtXCI7XHJcblxyXG4gICAgdmFyIGltYWdlcyA9IG5ldyBzdGRsaWIuVWludDhBcnJheShidWZmZXIpLFxyXG4gICAgICAgIHNpemUgPSBmb3JlaWduLnNpemUgfCAwLFxyXG4gICAgICAgIGltdWwgPSBzdGRsaWIuTWF0aC5pbXVsO1xyXG5cclxuICAgIGZ1bmN0aW9uIGVyb2RlKGluSW1hZ2VQdHIsIG91dEltYWdlUHRyKSB7XHJcbiAgICAgICAgaW5JbWFnZVB0ciA9IGluSW1hZ2VQdHIgfCAwO1xyXG4gICAgICAgIG91dEltYWdlUHRyID0gb3V0SW1hZ2VQdHIgfCAwO1xyXG5cclxuICAgICAgICB2YXIgdiA9IDAsXHJcbiAgICAgICAgICAgIHUgPSAwLFxyXG4gICAgICAgICAgICBzdW0gPSAwLFxyXG4gICAgICAgICAgICB5U3RhcnQxID0gMCxcclxuICAgICAgICAgICAgeVN0YXJ0MiA9IDAsXHJcbiAgICAgICAgICAgIHhTdGFydDEgPSAwLFxyXG4gICAgICAgICAgICB4U3RhcnQyID0gMCxcclxuICAgICAgICAgICAgb2Zmc2V0ID0gMDtcclxuXHJcbiAgICAgICAgZm9yICggdiA9IDE7ICh2IHwgMCkgPCAoKHNpemUgLSAxKSB8IDApOyB2ID0gKHYgKyAxKSB8IDApIHtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gKG9mZnNldCArIHNpemUpIHwgMDtcclxuICAgICAgICAgICAgZm9yICggdSA9IDE7ICh1IHwgMCkgPCAoKHNpemUgLSAxKSB8IDApOyB1ID0gKHUgKyAxKSB8IDApIHtcclxuICAgICAgICAgICAgICAgIHlTdGFydDEgPSAob2Zmc2V0IC0gc2l6ZSkgfCAwO1xyXG4gICAgICAgICAgICAgICAgeVN0YXJ0MiA9IChvZmZzZXQgKyBzaXplKSB8IDA7XHJcbiAgICAgICAgICAgICAgICB4U3RhcnQxID0gKHUgLSAxKSB8IDA7XHJcbiAgICAgICAgICAgICAgICB4U3RhcnQyID0gKHUgKyAxKSB8IDA7XHJcbiAgICAgICAgICAgICAgICBzdW0gPSAoKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDEgKyB4U3RhcnQxKSB8IDBdIHwgMClcclxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQxICsgeFN0YXJ0MikgfCAwXSB8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgb2Zmc2V0ICsgdSkgfCAwXSB8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MiArIHhTdGFydDEpIHwgMF0gfCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDIgKyB4U3RhcnQyKSB8IDBdIHwgMCkpIHwgMDtcclxuICAgICAgICAgICAgICAgIGlmICgoc3VtIHwgMCkgPT0gKDUgfCAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlc1sob3V0SW1hZ2VQdHIgKyBvZmZzZXQgKyB1KSB8IDBdID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIG9mZnNldCArIHUpIHwgMF0gPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdWJ0cmFjdChhSW1hZ2VQdHIsIGJJbWFnZVB0ciwgb3V0SW1hZ2VQdHIpIHtcclxuICAgICAgICBhSW1hZ2VQdHIgPSBhSW1hZ2VQdHIgfCAwO1xyXG4gICAgICAgIGJJbWFnZVB0ciA9IGJJbWFnZVB0ciB8IDA7XHJcbiAgICAgICAgb3V0SW1hZ2VQdHIgPSBvdXRJbWFnZVB0ciB8IDA7XHJcblxyXG4gICAgICAgIHZhciBsZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBsZW5ndGggPSBpbXVsKHNpemUsIHNpemUpIHwgMDtcclxuXHJcbiAgICAgICAgd2hpbGUgKChsZW5ndGggfCAwKSA+IDApIHtcclxuICAgICAgICAgICAgbGVuZ3RoID0gKGxlbmd0aCAtIDEpIHwgMDtcclxuICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSA9XHJcbiAgICAgICAgICAgICAgICAoKGltYWdlc1soYUltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCkgLSAoaW1hZ2VzWyhiSW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKSkgfCAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBiaXR3aXNlT3IoYUltYWdlUHRyLCBiSW1hZ2VQdHIsIG91dEltYWdlUHRyKSB7XHJcbiAgICAgICAgYUltYWdlUHRyID0gYUltYWdlUHRyIHwgMDtcclxuICAgICAgICBiSW1hZ2VQdHIgPSBiSW1hZ2VQdHIgfCAwO1xyXG4gICAgICAgIG91dEltYWdlUHRyID0gb3V0SW1hZ2VQdHIgfCAwO1xyXG5cclxuICAgICAgICB2YXIgbGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgbGVuZ3RoID0gaW11bChzaXplLCBzaXplKSB8IDA7XHJcblxyXG4gICAgICAgIHdoaWxlICgobGVuZ3RoIHwgMCkgPiAwKSB7XHJcbiAgICAgICAgICAgIGxlbmd0aCA9IChsZW5ndGggLSAxKSB8IDA7XHJcbiAgICAgICAgICAgIGltYWdlc1sob3V0SW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gPVxyXG4gICAgICAgICAgICAgICAgKChpbWFnZXNbKGFJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSB8IDApIHwgKGltYWdlc1soYkltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCkpIHwgMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY291bnROb25aZXJvKGltYWdlUHRyKSB7XHJcbiAgICAgICAgaW1hZ2VQdHIgPSBpbWFnZVB0ciB8IDA7XHJcblxyXG4gICAgICAgIHZhciBzdW0gPSAwLFxyXG4gICAgICAgICAgICBsZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBsZW5ndGggPSBpbXVsKHNpemUsIHNpemUpIHwgMDtcclxuXHJcbiAgICAgICAgd2hpbGUgKChsZW5ndGggfCAwKSA+IDApIHtcclxuICAgICAgICAgICAgbGVuZ3RoID0gKGxlbmd0aCAtIDEpIHwgMDtcclxuICAgICAgICAgICAgc3VtID0gKChzdW0gfCAwKSArIChpbWFnZXNbKGltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCkpIHwgMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoc3VtIHwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdChpbWFnZVB0ciwgdmFsdWUpIHtcclxuICAgICAgICBpbWFnZVB0ciA9IGltYWdlUHRyIHwgMDtcclxuICAgICAgICB2YWx1ZSA9IHZhbHVlIHwgMDtcclxuXHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIGxlbmd0aCA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xyXG5cclxuICAgICAgICB3aGlsZSAoKGxlbmd0aCB8IDApID4gMCkge1xyXG4gICAgICAgICAgICBsZW5ndGggPSAobGVuZ3RoIC0gMSkgfCAwO1xyXG4gICAgICAgICAgICBpbWFnZXNbKGltYWdlUHRyICsgbGVuZ3RoKSB8IDBdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRpbGF0ZShpbkltYWdlUHRyLCBvdXRJbWFnZVB0cikge1xyXG4gICAgICAgIGluSW1hZ2VQdHIgPSBpbkltYWdlUHRyIHwgMDtcclxuICAgICAgICBvdXRJbWFnZVB0ciA9IG91dEltYWdlUHRyIHwgMDtcclxuXHJcbiAgICAgICAgdmFyIHYgPSAwLFxyXG4gICAgICAgICAgICB1ID0gMCxcclxuICAgICAgICAgICAgc3VtID0gMCxcclxuICAgICAgICAgICAgeVN0YXJ0MSA9IDAsXHJcbiAgICAgICAgICAgIHlTdGFydDIgPSAwLFxyXG4gICAgICAgICAgICB4U3RhcnQxID0gMCxcclxuICAgICAgICAgICAgeFN0YXJ0MiA9IDAsXHJcbiAgICAgICAgICAgIG9mZnNldCA9IDA7XHJcblxyXG4gICAgICAgIGZvciAoIHYgPSAxOyAodiB8IDApIDwgKChzaXplIC0gMSkgfCAwKTsgdiA9ICh2ICsgMSkgfCAwKSB7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IChvZmZzZXQgKyBzaXplKSB8IDA7XHJcbiAgICAgICAgICAgIGZvciAoIHUgPSAxOyAodSB8IDApIDwgKChzaXplIC0gMSkgfCAwKTsgdSA9ICh1ICsgMSkgfCAwKSB7XHJcbiAgICAgICAgICAgICAgICB5U3RhcnQxID0gKG9mZnNldCAtIHNpemUpIHwgMDtcclxuICAgICAgICAgICAgICAgIHlTdGFydDIgPSAob2Zmc2V0ICsgc2l6ZSkgfCAwO1xyXG4gICAgICAgICAgICAgICAgeFN0YXJ0MSA9ICh1IC0gMSkgfCAwO1xyXG4gICAgICAgICAgICAgICAgeFN0YXJ0MiA9ICh1ICsgMSkgfCAwO1xyXG4gICAgICAgICAgICAgICAgc3VtID0gKChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQxICsgeFN0YXJ0MSkgfCAwXSB8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MSArIHhTdGFydDIpIHwgMF0gfCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIG9mZnNldCArIHUpIHwgMF0gfCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDIgKyB4U3RhcnQxKSB8IDBdIHwgMClcclxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQyICsgeFN0YXJ0MikgfCAwXSB8IDApKSB8IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHN1bSB8IDApID4gKDAgfCAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlc1sob3V0SW1hZ2VQdHIgKyBvZmZzZXQgKyB1KSB8IDBdID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIG9mZnNldCArIHUpIHwgMF0gPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtZW1jcHkoc3JjSW1hZ2VQdHIsIGRzdEltYWdlUHRyKSB7XHJcbiAgICAgICAgc3JjSW1hZ2VQdHIgPSBzcmNJbWFnZVB0ciB8IDA7XHJcbiAgICAgICAgZHN0SW1hZ2VQdHIgPSBkc3RJbWFnZVB0ciB8IDA7XHJcblxyXG4gICAgICAgIHZhciBsZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBsZW5ndGggPSBpbXVsKHNpemUsIHNpemUpIHwgMDtcclxuXHJcbiAgICAgICAgd2hpbGUgKChsZW5ndGggfCAwKSA+IDApIHtcclxuICAgICAgICAgICAgbGVuZ3RoID0gKGxlbmd0aCAtIDEpIHwgMDtcclxuICAgICAgICAgICAgaW1hZ2VzWyhkc3RJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSA9IChpbWFnZXNbKHNyY0ltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHplcm9Cb3JkZXIoaW1hZ2VQdHIpIHtcclxuICAgICAgICBpbWFnZVB0ciA9IGltYWdlUHRyIHwgMDtcclxuXHJcbiAgICAgICAgdmFyIHggPSAwLFxyXG4gICAgICAgICAgICB5ID0gMDtcclxuXHJcbiAgICAgICAgZm9yICggeCA9IDA7ICh4IHwgMCkgPCAoKHNpemUgLSAxKSB8IDApOyB4ID0gKHggKyAxKSB8IDApIHtcclxuICAgICAgICAgICAgaW1hZ2VzWyhpbWFnZVB0ciArIHgpIHwgMF0gPSAwO1xyXG4gICAgICAgICAgICBpbWFnZXNbKGltYWdlUHRyICsgeSkgfCAwXSA9IDA7XHJcbiAgICAgICAgICAgIHkgPSAoKHkgKyBzaXplKSAtIDEpIHwgMDtcclxuICAgICAgICAgICAgaW1hZ2VzWyhpbWFnZVB0ciArIHkpIHwgMF0gPSAwO1xyXG4gICAgICAgICAgICB5ID0gKHkgKyAxKSB8IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoIHggPSAwOyAoeCB8IDApIDwgKHNpemUgfCAwKTsgeCA9ICh4ICsgMSkgfCAwKSB7XHJcbiAgICAgICAgICAgIGltYWdlc1soaW1hZ2VQdHIgKyB5KSB8IDBdID0gMDtcclxuICAgICAgICAgICAgeSA9ICh5ICsgMSkgfCAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBza2VsZXRvbml6ZSgpIHtcclxuICAgICAgICB2YXIgc3ViSW1hZ2VQdHIgPSAwLFxyXG4gICAgICAgICAgICBlcm9kZWRJbWFnZVB0ciA9IDAsXHJcbiAgICAgICAgICAgIHRlbXBJbWFnZVB0ciA9IDAsXHJcbiAgICAgICAgICAgIHNrZWxJbWFnZVB0ciA9IDAsXHJcbiAgICAgICAgICAgIHN1bSA9IDAsXHJcbiAgICAgICAgICAgIGRvbmUgPSAwO1xyXG5cclxuICAgICAgICBlcm9kZWRJbWFnZVB0ciA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xyXG4gICAgICAgIHRlbXBJbWFnZVB0ciA9IChlcm9kZWRJbWFnZVB0ciArIGVyb2RlZEltYWdlUHRyKSB8IDA7XHJcbiAgICAgICAgc2tlbEltYWdlUHRyID0gKHRlbXBJbWFnZVB0ciArIGVyb2RlZEltYWdlUHRyKSB8IDA7XHJcblxyXG4gICAgICAgIC8vIGluaXQgc2tlbC1pbWFnZVxyXG4gICAgICAgIGluaXQoc2tlbEltYWdlUHRyLCAwKTtcclxuICAgICAgICB6ZXJvQm9yZGVyKHN1YkltYWdlUHRyKTtcclxuXHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBlcm9kZShzdWJJbWFnZVB0ciwgZXJvZGVkSW1hZ2VQdHIpO1xyXG4gICAgICAgICAgICBkaWxhdGUoZXJvZGVkSW1hZ2VQdHIsIHRlbXBJbWFnZVB0cik7XHJcbiAgICAgICAgICAgIHN1YnRyYWN0KHN1YkltYWdlUHRyLCB0ZW1wSW1hZ2VQdHIsIHRlbXBJbWFnZVB0cik7XHJcbiAgICAgICAgICAgIGJpdHdpc2VPcihza2VsSW1hZ2VQdHIsIHRlbXBJbWFnZVB0ciwgc2tlbEltYWdlUHRyKTtcclxuICAgICAgICAgICAgbWVtY3B5KGVyb2RlZEltYWdlUHRyLCBzdWJJbWFnZVB0cik7XHJcbiAgICAgICAgICAgIHN1bSA9IGNvdW50Tm9uWmVybyhzdWJJbWFnZVB0cikgfCAwO1xyXG4gICAgICAgICAgICBkb25lID0gKChzdW0gfCAwKSA9PSAwIHwgMCk7XHJcbiAgICAgICAgfSB3aGlsZSAoIWRvbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2tlbGV0b25pemU6IHNrZWxldG9uaXplXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTa2VsZXRvbml6ZXI7XHJcbi8qIGVzbGludC1lbmFibGUgZXFlcWVxKi9cclxuLyogQHByZXNlcnZlIEFTTSBFTkQgKi9cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvbG9jYXRvci9za2VsZXRvbml6ZXIuanNcbiAqKi8iLCJpbXBvcnQgQnJlc2VuaGFtIGZyb20gJy4vYnJlc2VuaGFtJztcclxuaW1wb3J0IEltYWdlRGVidWcgZnJvbSAnLi4vY29tbW9uL2ltYWdlX2RlYnVnJztcclxuaW1wb3J0IENvZGUxMjhSZWFkZXIgZnJvbSAnLi4vcmVhZGVyL2NvZGVfMTI4X3JlYWRlcic7XHJcbmltcG9ydCBFQU5SZWFkZXIgZnJvbSAnLi4vcmVhZGVyL2Vhbl9yZWFkZXInO1xyXG5pbXBvcnQgQ29kZTM5UmVhZGVyIGZyb20gJy4uL3JlYWRlci9jb2RlXzM5X3JlYWRlcic7XHJcbmltcG9ydCBDb2RlMzlWSU5SZWFkZXIgZnJvbSAnLi4vcmVhZGVyL2NvZGVfMzlfdmluX3JlYWRlcic7XHJcbmltcG9ydCBDb2RhYmFyUmVhZGVyIGZyb20gJy4uL3JlYWRlci9jb2RhYmFyX3JlYWRlcic7XHJcbmltcG9ydCBVUENSZWFkZXIgZnJvbSAnLi4vcmVhZGVyL3VwY19yZWFkZXInO1xyXG5pbXBvcnQgRUFOOFJlYWRlciBmcm9tICcuLi9yZWFkZXIvZWFuXzhfcmVhZGVyJztcclxuaW1wb3J0IFVQQ0VSZWFkZXIgZnJvbSAnLi4vcmVhZGVyL3VwY19lX3JlYWRlcic7XHJcbmltcG9ydCBJMm9mNVJlYWRlciBmcm9tICcuLi9yZWFkZXIvaTJvZjVfcmVhZGVyJztcclxuXHJcbmNvbnN0IFJFQURFUlMgPSB7XHJcbiAgICBjb2RlXzEyOF9yZWFkZXI6IENvZGUxMjhSZWFkZXIsXHJcbiAgICBlYW5fcmVhZGVyOiBFQU5SZWFkZXIsXHJcbiAgICBlYW5fOF9yZWFkZXI6IEVBTjhSZWFkZXIsXHJcbiAgICBjb2RlXzM5X3JlYWRlcjogQ29kZTM5UmVhZGVyLFxyXG4gICAgY29kZV8zOV92aW5fcmVhZGVyOiBDb2RlMzlWSU5SZWFkZXIsXHJcbiAgICBjb2RhYmFyX3JlYWRlcjogQ29kYWJhclJlYWRlcixcclxuICAgIHVwY19yZWFkZXI6IFVQQ1JlYWRlcixcclxuICAgIHVwY19lX3JlYWRlcjogVVBDRVJlYWRlcixcclxuICAgIGkyb2Y1X3JlYWRlcjogSTJvZjVSZWFkZXJcclxufTtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihjb25maWcsIGlucHV0SW1hZ2VXcmFwcGVyKSB7XHJcbiAgICAgICAgdmFyIF9jYW52YXMgPSB7XHJcbiAgICAgICAgICAgICAgICBjdHg6IHtcclxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiBudWxsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZG9tOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheTogbnVsbFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBfYmFyY29kZVJlYWRlcnMgPSBbXTtcclxuXHJcbiAgICAgICAgaW5pdENhbnZhcygpO1xyXG4gICAgICAgIGluaXRSZWFkZXJzKCk7XHJcbiAgICAgICAgaW5pdENvbmZpZygpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0Q2FudmFzKCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgdmFyICRkZWJ1ZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVidWcuZGV0ZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgX2NhbnZhcy5kb20uZnJlcXVlbmN5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhcy5mcmVxdWVuY3lcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV9jYW52YXMuZG9tLmZyZXF1ZW5jeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9jYW52YXMuZG9tLmZyZXF1ZW5jeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgX2NhbnZhcy5kb20uZnJlcXVlbmN5LmNsYXNzTmFtZSA9IFwiZnJlcXVlbmN5XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRkZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZGVidWcuYXBwZW5kQ2hpbGQoX2NhbnZhcy5kb20uZnJlcXVlbmN5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfY2FudmFzLmN0eC5mcmVxdWVuY3kgPSBfY2FudmFzLmRvbS5mcmVxdWVuY3kuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIF9jYW52YXMuZG9tLnBhdHRlcm4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzLnBhdHRlcm5CdWZmZXJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV9jYW52YXMuZG9tLnBhdHRlcm4pIHtcclxuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5wYXR0ZXJuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5wYXR0ZXJuLmNsYXNzTmFtZSA9IFwicGF0dGVybkJ1ZmZlclwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkZGVidWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGRlYnVnLmFwcGVuZENoaWxkKF9jYW52YXMuZG9tLnBhdHRlcm4pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF9jYW52YXMuY3R4LnBhdHRlcm4gPSBfY2FudmFzLmRvbS5wYXR0ZXJuLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5vdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhcy5kcmF3aW5nQnVmZmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF9jYW52YXMuZG9tLm92ZXJsYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmN0eC5vdmVybGF5ID0gX2NhbnZhcy5kb20ub3ZlcmxheS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRSZWFkZXJzKCkge1xyXG4gICAgICAgICAgICBjb25maWcucmVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHJlYWRlckNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlYWRlcixcclxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZWFkZXJDb25maWcgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyID0gcmVhZGVyQ29uZmlnLmZvcm1hdDtcclxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uID0gcmVhZGVyQ29uZmlnLmNvbmZpZztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlYWRlckNvbmZpZyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWFkZXIgPSByZWFkZXJDb25maWc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJlZm9yZSByZWdpc3RlcmluZyByZWFkZXI6IFwiLCByZWFkZXIpO1xyXG4gICAgICAgICAgICAgICAgX2JhcmNvZGVSZWFkZXJzLnB1c2gobmV3IFJFQURFUlNbcmVhZGVyXShjb25maWd1cmF0aW9uKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyZWQgUmVhZGVyczogXCIgKyBfYmFyY29kZVJlYWRlcnNcclxuICAgICAgICAgICAgICAgIC5tYXAoKHJlYWRlcikgPT4gSlNPTi5zdHJpbmdpZnkoe2Zvcm1hdDogcmVhZGVyLkZPUk1BVCwgY29uZmlnOiByZWFkZXIuY29uZmlnfSkpXHJcbiAgICAgICAgICAgICAgICAuam9pbignLCAnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0Q29uZmlnKCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGksXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzID0gW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZTogX2NhbnZhcy5kb20uZnJlcXVlbmN5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBjb25maWcuc2hvd0ZyZXF1ZW5jeVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZTogX2NhbnZhcy5kb20ucGF0dGVybixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogY29uZmlnLnNob3dQYXR0ZXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfV07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHZpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNbaV0ucHJvcCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNbaV0ubm9kZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc1tpXS5ub2RlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGV4dGVuZCB0aGUgbGluZSBvbiBib3RoIGVuZHNcclxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBsaW5lXHJcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGFuZ2xlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RXh0ZW5kZWRMaW5lKGxpbmUsIGFuZ2xlLCBleHQpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZXh0ZW5kTGluZShhbW91bnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBleHRlbnNpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeTogYW1vdW50ICogTWF0aC5zaW4oYW5nbGUpLFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IGFtb3VudCAqIE1hdGguY29zKGFuZ2xlKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBsaW5lWzBdLnkgLT0gZXh0ZW5zaW9uLnk7XHJcbiAgICAgICAgICAgICAgICBsaW5lWzBdLnggLT0gZXh0ZW5zaW9uLng7XHJcbiAgICAgICAgICAgICAgICBsaW5lWzFdLnkgKz0gZXh0ZW5zaW9uLnk7XHJcbiAgICAgICAgICAgICAgICBsaW5lWzFdLnggKz0gZXh0ZW5zaW9uLng7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGluc2lkZSBpbWFnZVxyXG4gICAgICAgICAgICBleHRlbmRMaW5lKGV4dCk7XHJcbiAgICAgICAgICAgIHdoaWxlIChleHQgPiAxICYmICghaW5wdXRJbWFnZVdyYXBwZXIuaW5JbWFnZVdpdGhCb3JkZXIobGluZVswXSwgMClcclxuICAgICAgICAgICAgICAgICAgICB8fCAhaW5wdXRJbWFnZVdyYXBwZXIuaW5JbWFnZVdpdGhCb3JkZXIobGluZVsxXSwgMCkpKSB7XHJcbiAgICAgICAgICAgICAgICBleHQgLT0gTWF0aC5jZWlsKGV4dCAvIDIpO1xyXG4gICAgICAgICAgICAgICAgZXh0ZW5kTGluZSgtZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbGluZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldExpbmUoYm94KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbe1xyXG4gICAgICAgICAgICAgICAgeDogKGJveFsxXVswXSAtIGJveFswXVswXSkgLyAyICsgYm94WzBdWzBdLFxyXG4gICAgICAgICAgICAgICAgeTogKGJveFsxXVsxXSAtIGJveFswXVsxXSkgLyAyICsgYm94WzBdWzFdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHg6IChib3hbM11bMF0gLSBib3hbMl1bMF0pIC8gMiArIGJveFsyXVswXSxcclxuICAgICAgICAgICAgICAgIHk6IChib3hbM11bMV0gLSBib3hbMl1bMV0pIC8gMiArIGJveFsyXVsxXVxyXG4gICAgICAgICAgICB9XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRyeURlY29kZShsaW5lKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBudWxsLFxyXG4gICAgICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgICAgIGJhcmNvZGVMaW5lID0gQnJlc2VuaGFtLmdldEJhcmNvZGVMaW5lKGlucHV0SW1hZ2VXcmFwcGVyLCBsaW5lWzBdLCBsaW5lWzFdKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25maWcuc2hvd0ZyZXF1ZW5jeSkge1xyXG4gICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UGF0aChsaW5lLCB7eDogJ3gnLCB5OiAneSd9LCBfY2FudmFzLmN0eC5vdmVybGF5LCB7Y29sb3I6ICdyZWQnLCBsaW5lV2lkdGg6IDN9KTtcclxuICAgICAgICAgICAgICAgIEJyZXNlbmhhbS5kZWJ1Zy5wcmludEZyZXF1ZW5jeShiYXJjb2RlTGluZS5saW5lLCBfY2FudmFzLmRvbS5mcmVxdWVuY3kpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEJyZXNlbmhhbS50b0JpbmFyeUxpbmUoYmFyY29kZUxpbmUpO1xyXG4gICAgICAgICAgICBpZiAoY29uZmlnLnNob3dQYXR0ZXJuKSB7XHJcbiAgICAgICAgICAgICAgICBCcmVzZW5oYW0uZGVidWcucHJpbnRQYXR0ZXJuKGJhcmNvZGVMaW5lLmxpbmUsIF9jYW52YXMuZG9tLnBhdHRlcm4pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IF9iYXJjb2RlUmVhZGVycy5sZW5ndGggJiYgcmVzdWx0ID09PSBudWxsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9iYXJjb2RlUmVhZGVyc1tpXS5kZWNvZGVQYXR0ZXJuKGJhcmNvZGVMaW5lLmxpbmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGNvZGVSZXN1bHQ6IHJlc3VsdCxcclxuICAgICAgICAgICAgICAgIGJhcmNvZGVMaW5lOiBiYXJjb2RlTGluZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhpcyBtZXRob2Qgc2xpY2VzIHRoZSBnaXZlbiBhcmVhIGFwYXJ0IGFuZCB0cmllcyB0byBkZXRlY3QgYSBiYXJjb2RlLXBhdHRlcm5cclxuICAgICAgICAgKiBmb3IgZWFjaCBzbGljZS4gSXQgcmV0dXJucyB0aGUgZGVjb2RlZCBiYXJjb2RlLCBvciBudWxsIGlmIG5vdGhpbmcgd2FzIGZvdW5kXHJcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gYm94XHJcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gbGluZVxyXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsaW5lQW5nbGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB0cnlEZWNvZGVCcnV0ZUZvcmNlKGJveCwgbGluZSwgbGluZUFuZ2xlKSB7XHJcbiAgICAgICAgICAgIHZhciBzaWRlTGVuZ3RoID0gTWF0aC5zcXJ0KE1hdGgucG93KGJveFsxXVswXSAtIGJveFswXVswXSwgMikgKyBNYXRoLnBvdygoYm94WzFdWzFdIC0gYm94WzBdWzFdKSwgMikpLFxyXG4gICAgICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgICAgIHNsaWNlcyA9IDE2LFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbnVsbCxcclxuICAgICAgICAgICAgICAgIGRpcixcclxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbixcclxuICAgICAgICAgICAgICAgIHhkaXIgPSBNYXRoLnNpbihsaW5lQW5nbGUpLFxyXG4gICAgICAgICAgICAgICAgeWRpciA9IE1hdGguY29zKGxpbmVBbmdsZSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKCBpID0gMTsgaSA8IHNsaWNlcyAmJiByZXN1bHQgPT09IG51bGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gbW92ZSBsaW5lIHBlcnBlbmRpY3VsYXIgdG8gYW5nbGVcclxuICAgICAgICAgICAgICAgIGRpciA9IHNpZGVMZW5ndGggLyBzbGljZXMgKiBpICogKGkgJSAyID09PSAwID8gLTEgOiAxKTtcclxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICB5OiBkaXIgKiB4ZGlyLFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IGRpciAqIHlkaXJcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBsaW5lWzBdLnkgKz0gZXh0ZW5zaW9uLng7XHJcbiAgICAgICAgICAgICAgICBsaW5lWzBdLnggLT0gZXh0ZW5zaW9uLnk7XHJcbiAgICAgICAgICAgICAgICBsaW5lWzFdLnkgKz0gZXh0ZW5zaW9uLng7XHJcbiAgICAgICAgICAgICAgICBsaW5lWzFdLnggLT0gZXh0ZW5zaW9uLnk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ5RGVjb2RlKGxpbmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRMaW5lTGVuZ3RoKGxpbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydChcclxuICAgICAgICAgICAgICAgIE1hdGgucG93KE1hdGguYWJzKGxpbmVbMV0ueSAtIGxpbmVbMF0ueSksIDIpICtcclxuICAgICAgICAgICAgICAgIE1hdGgucG93KE1hdGguYWJzKGxpbmVbMV0ueCAtIGxpbmVbMF0ueCksIDIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFdpdGggdGhlIGhlbHAgb2YgdGhlIGNvbmZpZ3VyZWQgcmVhZGVycyAoQ29kZTEyOCBvciBFQU4pIHRoaXMgZnVuY3Rpb24gdHJpZXMgdG8gZGV0ZWN0IGFcclxuICAgICAgICAgKiB2YWxpZCBiYXJjb2RlIHBhdHRlcm4gd2l0aGluIHRoZSBnaXZlbiBhcmVhLlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBib3ggVGhlIGFyZWEgdG8gc2VhcmNoIGluXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdH0gdGhlIHJlc3VsdCB7Y29kZVJlc3VsdCwgbGluZSwgYW5nbGUsIHBhdHRlcm4sIHRocmVzaG9sZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBkZWNvZGVGcm9tQm91bmRpbmdCb3goYm94KSB7XHJcbiAgICAgICAgICAgIHZhciBsaW5lLFxyXG4gICAgICAgICAgICAgICAgbGluZUFuZ2xlLFxyXG4gICAgICAgICAgICAgICAgY3R4ID0gX2NhbnZhcy5jdHgub3ZlcmxheSxcclxuICAgICAgICAgICAgICAgIHJlc3VsdCxcclxuICAgICAgICAgICAgICAgIGxpbmVMZW5ndGg7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29uZmlnLmRyYXdCb3VuZGluZ0JveCAmJiBjdHgpIHtcclxuICAgICAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgoYm94LCB7eDogMCwgeTogMX0sIGN0eCwge2NvbG9yOiBcImJsdWVcIiwgbGluZVdpZHRoOiAyfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxpbmUgPSBnZXRMaW5lKGJveCk7XHJcbiAgICAgICAgICAgIGxpbmVMZW5ndGggPSBnZXRMaW5lTGVuZ3RoKGxpbmUpO1xyXG4gICAgICAgICAgICBsaW5lQW5nbGUgPSBNYXRoLmF0YW4yKGxpbmVbMV0ueSAtIGxpbmVbMF0ueSwgbGluZVsxXS54IC0gbGluZVswXS54KTtcclxuICAgICAgICAgICAgbGluZSA9IGdldEV4dGVuZGVkTGluZShsaW5lLCBsaW5lQW5nbGUsIE1hdGguZmxvb3IobGluZUxlbmd0aCAqIDAuMSkpO1xyXG4gICAgICAgICAgICBpZiAobGluZSA9PT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzdWx0ID0gdHJ5RGVjb2RlKGxpbmUpO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnlEZWNvZGVCcnV0ZUZvcmNlKGJveCwgbGluZSwgbGluZUFuZ2xlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgY29uZmlnLmRyYXdTY2FubGluZSAmJiBjdHgpIHtcclxuICAgICAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgobGluZSwge3g6ICd4JywgeTogJ3knfSwgY3R4LCB7Y29sb3I6ICdyZWQnLCBsaW5lV2lkdGg6IDN9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGNvZGVSZXN1bHQ6IHJlc3VsdC5jb2RlUmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgbGluZTogbGluZSxcclxuICAgICAgICAgICAgICAgIGFuZ2xlOiBsaW5lQW5nbGUsXHJcbiAgICAgICAgICAgICAgICBwYXR0ZXJuOiByZXN1bHQuYmFyY29kZUxpbmUubGluZSxcclxuICAgICAgICAgICAgICAgIHRocmVzaG9sZDogcmVzdWx0LmJhcmNvZGVMaW5lLnRocmVzaG9sZFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGVjb2RlRnJvbUJvdW5kaW5nQm94OiBmdW5jdGlvbihib3gpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGVGcm9tQm91bmRpbmdCb3goYm94KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVjb2RlRnJvbUJvdW5kaW5nQm94ZXM6IGZ1bmN0aW9uKGJveGVzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaSwgcmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgICAgIGJhcmNvZGVzID0gW10sXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGUgPSBjb25maWcubXVsdGlwbGU7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCBib3hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJveCA9IGJveGVzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRlY29kZUZyb21Cb3VuZGluZ0JveChib3gpIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ib3ggPSBib3g7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXJjb2Rlcy5wdXNoKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQuY29kZVJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXJjb2Rlc1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldFJlYWRlcnM6IGZ1bmN0aW9uKHJlYWRlcnMpIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5yZWFkZXJzID0gcmVhZGVycztcclxuICAgICAgICAgICAgICAgIF9iYXJjb2RlUmVhZGVycy5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgaW5pdFJlYWRlcnMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2RlY29kZXIvYmFyY29kZV9kZWNvZGVyLmpzXG4gKiovIiwiaW1wb3J0IENWVXRpbHMgZnJvbSAnLi4vY29tbW9uL2N2X3V0aWxzJztcclxuaW1wb3J0IEltYWdlV3JhcHBlciBmcm9tICcuLi9jb21tb24vaW1hZ2Vfd3JhcHBlcic7XHJcblxyXG52YXIgQnJlc2VuaGFtID0ge307XHJcblxyXG52YXIgU2xvcGUgPSB7XHJcbiAgICBESVI6IHtcclxuICAgICAgICBVUDogMSxcclxuICAgICAgICBET1dOOiAtMVxyXG4gICAgfVxyXG59O1xyXG4vKipcclxuICogU2NhbnMgYSBsaW5lIG9mIHRoZSBnaXZlbiBpbWFnZSBmcm9tIHBvaW50IHAxIHRvIHAyIGFuZCByZXR1cm5zIGEgcmVzdWx0IG9iamVjdCBjb250YWluaW5nXHJcbiAqIGdyYXktc2NhbGUgdmFsdWVzICgwLTI1NSkgb2YgdGhlIHVuZGVybHlpbmcgcGl4ZWxzIGluIGFkZGl0aW9uIHRvIHRoZSBtaW5cclxuICogYW5kIG1heCB2YWx1ZXMuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbWFnZVdyYXBwZXJcclxuICogQHBhcmFtIHtPYmplY3R9IHAxIFRoZSBzdGFydCBwb2ludCB7eCx5fVxyXG4gKiBAcGFyYW0ge09iamVjdH0gcDIgVGhlIGVuZCBwb2ludCB7eCx5fVxyXG4gKiBAcmV0dXJucyB7bGluZSwgbWluLCBtYXh9XHJcbiAqL1xyXG5CcmVzZW5oYW0uZ2V0QmFyY29kZUxpbmUgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIHAxLCBwMikge1xyXG4gICAgdmFyIHgwID0gcDEueCB8IDAsXHJcbiAgICAgICAgeTAgPSBwMS55IHwgMCxcclxuICAgICAgICB4MSA9IHAyLnggfCAwLFxyXG4gICAgICAgIHkxID0gcDIueSB8IDAsXHJcbiAgICAgICAgc3RlZXAgPSBNYXRoLmFicyh5MSAtIHkwKSA+IE1hdGguYWJzKHgxIC0geDApLFxyXG4gICAgICAgIGRlbHRheCxcclxuICAgICAgICBkZWx0YXksXHJcbiAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgeXN0ZXAsXHJcbiAgICAgICAgeSxcclxuICAgICAgICB0bXAsXHJcbiAgICAgICAgeCxcclxuICAgICAgICBsaW5lID0gW10sXHJcbiAgICAgICAgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54LFxyXG4gICAgICAgIHN1bSA9IDAsXHJcbiAgICAgICAgdmFsLFxyXG4gICAgICAgIG1pbiA9IDI1NSxcclxuICAgICAgICBtYXggPSAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlYWQoYSwgYikge1xyXG4gICAgICAgIHZhbCA9IGltYWdlRGF0YVtiICogd2lkdGggKyBhXTtcclxuICAgICAgICBzdW0gKz0gdmFsO1xyXG4gICAgICAgIG1pbiA9IHZhbCA8IG1pbiA/IHZhbCA6IG1pbjtcclxuICAgICAgICBtYXggPSB2YWwgPiBtYXggPyB2YWwgOiBtYXg7XHJcbiAgICAgICAgbGluZS5wdXNoKHZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN0ZWVwKSB7XHJcbiAgICAgICAgdG1wID0geDA7XHJcbiAgICAgICAgeDAgPSB5MDtcclxuICAgICAgICB5MCA9IHRtcDtcclxuXHJcbiAgICAgICAgdG1wID0geDE7XHJcbiAgICAgICAgeDEgPSB5MTtcclxuICAgICAgICB5MSA9IHRtcDtcclxuICAgIH1cclxuICAgIGlmICh4MCA+IHgxKSB7XHJcbiAgICAgICAgdG1wID0geDA7XHJcbiAgICAgICAgeDAgPSB4MTtcclxuICAgICAgICB4MSA9IHRtcDtcclxuXHJcbiAgICAgICAgdG1wID0geTA7XHJcbiAgICAgICAgeTAgPSB5MTtcclxuICAgICAgICB5MSA9IHRtcDtcclxuICAgIH1cclxuICAgIGRlbHRheCA9IHgxIC0geDA7XHJcbiAgICBkZWx0YXkgPSBNYXRoLmFicyh5MSAtIHkwKTtcclxuICAgIGVycm9yID0gKGRlbHRheCAvIDIpIHwgMDtcclxuICAgIHkgPSB5MDtcclxuICAgIHlzdGVwID0geTAgPCB5MSA/IDEgOiAtMTtcclxuICAgIGZvciAoIHggPSB4MDsgeCA8IHgxOyB4KyspIHtcclxuICAgICAgICBpZiAoc3RlZXApe1xyXG4gICAgICAgICAgICByZWFkKHksIHgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlYWQoeCwgeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVycm9yID0gZXJyb3IgLSBkZWx0YXk7XHJcbiAgICAgICAgaWYgKGVycm9yIDwgMCkge1xyXG4gICAgICAgICAgICB5ID0geSArIHlzdGVwO1xyXG4gICAgICAgICAgICBlcnJvciA9IGVycm9yICsgZGVsdGF4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxpbmU6IGxpbmUsXHJcbiAgICAgICAgbWluOiBtaW4sXHJcbiAgICAgICAgbWF4OiBtYXhcclxuICAgIH07XHJcbn07XHJcblxyXG5CcmVzZW5oYW0udG9PdHN1QmluYXJ5TGluZSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgdmFyIGxpbmUgPSByZXN1bHQubGluZSxcclxuICAgICAgICBpbWFnZSA9IG5ldyBJbWFnZVdyYXBwZXIoe3g6IGxpbmUubGVuZ3RoIC0gMSwgeTogMX0sIGxpbmUpLFxyXG4gICAgICAgIHRocmVzaG9sZCA9IENWVXRpbHMuZGV0ZXJtaW5lT3RzdVRocmVzaG9sZChpbWFnZSwgNSk7XHJcblxyXG4gICAgbGluZSA9IENWVXRpbHMuc2hhcnBlbkxpbmUobGluZSk7XHJcbiAgICBDVlV0aWxzLnRocmVzaG9sZEltYWdlKGltYWdlLCB0aHJlc2hvbGQpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbGluZTogbGluZSxcclxuICAgICAgICB0aHJlc2hvbGQ6IHRocmVzaG9sZFxyXG4gICAgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGUgcmVzdWx0IGZyb20gZ2V0QmFyY29kZUxpbmUgaW50byBhIGJpbmFyeSByZXByZXNlbnRhdGlvblxyXG4gKiBhbHNvIGNvbnNpZGVyaW5nIHRoZSBmcmVxdWVuY3kgYW5kIHNsb3BlIG9mIHRoZSBzaWduYWwgZm9yIG1vcmUgcm9idXN0IHJlc3VsdHNcclxuICogQHBhcmFtIHtPYmplY3R9IHJlc3VsdCB7bGluZSwgbWluLCBtYXh9XHJcbiAqL1xyXG5CcmVzZW5oYW0udG9CaW5hcnlMaW5lID0gZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICB2YXIgbWluID0gcmVzdWx0Lm1pbixcclxuICAgICAgICBtYXggPSByZXN1bHQubWF4LFxyXG4gICAgICAgIGxpbmUgPSByZXN1bHQubGluZSxcclxuICAgICAgICBzbG9wZSxcclxuICAgICAgICBzbG9wZTIsXHJcbiAgICAgICAgY2VudGVyID0gbWluICsgKG1heCAtIG1pbikgLyAyLFxyXG4gICAgICAgIGV4dHJlbWEgPSBbXSxcclxuICAgICAgICBjdXJyZW50RGlyLFxyXG4gICAgICAgIGRpcixcclxuICAgICAgICB0aHJlc2hvbGQgPSAobWF4IC0gbWluKSAvIDEyLFxyXG4gICAgICAgIHJUaHJlc2hvbGQgPSAtdGhyZXNob2xkLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgajtcclxuXHJcbiAgICAvLyAxLiBmaW5kIGV4dHJlbWFcclxuICAgIGN1cnJlbnREaXIgPSBsaW5lWzBdID4gY2VudGVyID8gU2xvcGUuRElSLlVQIDogU2xvcGUuRElSLkRPV047XHJcbiAgICBleHRyZW1hLnB1c2goe1xyXG4gICAgICAgIHBvczogMCxcclxuICAgICAgICB2YWw6IGxpbmVbMF1cclxuICAgIH0pO1xyXG4gICAgZm9yICggaSA9IDA7IGkgPCBsaW5lLmxlbmd0aCAtIDI7IGkrKykge1xyXG4gICAgICAgIHNsb3BlID0gKGxpbmVbaSArIDFdIC0gbGluZVtpXSk7XHJcbiAgICAgICAgc2xvcGUyID0gKGxpbmVbaSArIDJdIC0gbGluZVtpICsgMV0pO1xyXG4gICAgICAgIGlmICgoc2xvcGUgKyBzbG9wZTIpIDwgclRocmVzaG9sZCAmJiBsaW5lW2kgKyAxXSA8IChjZW50ZXIgKiAxLjUpKSB7XHJcbiAgICAgICAgICAgIGRpciA9IFNsb3BlLkRJUi5ET1dOO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHNsb3BlICsgc2xvcGUyKSA+IHRocmVzaG9sZCAmJiBsaW5lW2kgKyAxXSA+IChjZW50ZXIgKiAwLjUpKSB7XHJcbiAgICAgICAgICAgIGRpciA9IFNsb3BlLkRJUi5VUDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkaXIgPSBjdXJyZW50RGlyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnREaXIgIT09IGRpcikge1xyXG4gICAgICAgICAgICBleHRyZW1hLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgcG9zOiBpLFxyXG4gICAgICAgICAgICAgICAgdmFsOiBsaW5lW2ldXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjdXJyZW50RGlyID0gZGlyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4dHJlbWEucHVzaCh7XHJcbiAgICAgICAgcG9zOiBsaW5lLmxlbmd0aCxcclxuICAgICAgICB2YWw6IGxpbmVbbGluZS5sZW5ndGggLSAxXVxyXG4gICAgfSk7XHJcblxyXG4gICAgZm9yICggaiA9IGV4dHJlbWFbMF0ucG9zOyBqIDwgZXh0cmVtYVsxXS5wb3M7IGorKykge1xyXG4gICAgICAgIGxpbmVbal0gPSBsaW5lW2pdID4gY2VudGVyID8gMCA6IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGV4dHJlbWEgYW5kIGNvbnZlcnQgdG8gYmluYXJ5IGJhc2VkIG9uIGF2ZyBiZXR3ZWVuIG1pbm1heFxyXG4gICAgZm9yICggaSA9IDE7IGkgPCBleHRyZW1hLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgIGlmIChleHRyZW1hW2kgKyAxXS52YWwgPiBleHRyZW1hW2ldLnZhbCkge1xyXG4gICAgICAgICAgICB0aHJlc2hvbGQgPSAoZXh0cmVtYVtpXS52YWwgKyAoKGV4dHJlbWFbaSArIDFdLnZhbCAtIGV4dHJlbWFbaV0udmFsKSAvIDMpICogMikgfCAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocmVzaG9sZCA9IChleHRyZW1hW2kgKyAxXS52YWwgKyAoKGV4dHJlbWFbaV0udmFsIC0gZXh0cmVtYVtpICsgMV0udmFsKSAvIDMpKSB8IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKCBqID0gZXh0cmVtYVtpXS5wb3M7IGogPCBleHRyZW1hW2kgKyAxXS5wb3M7IGorKykge1xyXG4gICAgICAgICAgICBsaW5lW2pdID0gbGluZVtqXSA+IHRocmVzaG9sZCA/IDAgOiAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxpbmU6IGxpbmUsXHJcbiAgICAgICAgdGhyZXNob2xkOiB0aHJlc2hvbGRcclxuICAgIH07XHJcbn07XHJcblxyXG4vKipcclxuICogVXNlZCBmb3IgZGV2ZWxvcG1lbnQgb25seVxyXG4gKi9cclxuQnJlc2VuaGFtLmRlYnVnID0ge1xyXG4gICAgcHJpbnRGcmVxdWVuY3k6IGZ1bmN0aW9uKGxpbmUsIGNhbnZhcykge1xyXG4gICAgICAgIHZhciBpLFxyXG4gICAgICAgICAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGxpbmUubGVuZ3RoO1xyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSAyNTY7XHJcblxyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsdWVcIjtcclxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY3R4Lm1vdmVUbyhpLCAyNTUpO1xyXG4gICAgICAgICAgICBjdHgubGluZVRvKGksIDI1NSAtIGxpbmVbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBwcmludFBhdHRlcm46IGZ1bmN0aW9uKGxpbmUsIGNhbnZhcykge1xyXG4gICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLCBpO1xyXG5cclxuICAgICAgICBjYW52YXMud2lkdGggPSBsaW5lLmxlbmd0aDtcclxuICAgICAgICBjdHguZmlsbENvbG9yID0gXCJibGFja1wiO1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgbGluZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobGluZVtpXSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KGksIDAsIDEsIDEwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCcmVzZW5oYW07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2RlY29kZXIvYnJlc2VuaGFtLmpzXG4gKiovIiwiaW1wb3J0IEJhcmNvZGVSZWFkZXIgZnJvbSAnLi9iYXJjb2RlX3JlYWRlcic7XHJcblxyXG5mdW5jdGlvbiBDb2RlMTI4UmVhZGVyKCkge1xyXG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG52YXIgcHJvcGVydGllcyA9IHtcclxuICAgIENPREVfU0hJRlQ6IHt2YWx1ZTogOTh9LFxyXG4gICAgQ09ERV9DOiB7dmFsdWU6IDk5fSxcclxuICAgIENPREVfQjoge3ZhbHVlOiAxMDB9LFxyXG4gICAgQ09ERV9BOiB7dmFsdWU6IDEwMX0sXHJcbiAgICBTVEFSVF9DT0RFX0E6IHt2YWx1ZTogMTAzfSxcclxuICAgIFNUQVJUX0NPREVfQjoge3ZhbHVlOiAxMDR9LFxyXG4gICAgU1RBUlRfQ09ERV9DOiB7dmFsdWU6IDEwNX0sXHJcbiAgICBTVE9QX0NPREU6IHt2YWx1ZTogMTA2fSxcclxuICAgIE1PRFVMTzoge3ZhbHVlOiAxMX0sXHJcbiAgICBDT0RFX1BBVFRFUk46IHt2YWx1ZTogW1xyXG4gICAgICAgIFsyLCAxLCAyLCAyLCAyLCAyXSxcclxuICAgICAgICBbMiwgMiwgMiwgMSwgMiwgMl0sXHJcbiAgICAgICAgWzIsIDIsIDIsIDIsIDIsIDFdLFxyXG4gICAgICAgIFsxLCAyLCAxLCAyLCAyLCAzXSxcclxuICAgICAgICBbMSwgMiwgMSwgMywgMiwgMl0sXHJcbiAgICAgICAgWzEsIDMsIDEsIDIsIDIsIDJdLFxyXG4gICAgICAgIFsxLCAyLCAyLCAyLCAxLCAzXSxcclxuICAgICAgICBbMSwgMiwgMiwgMywgMSwgMl0sXHJcbiAgICAgICAgWzEsIDMsIDIsIDIsIDEsIDJdLFxyXG4gICAgICAgIFsyLCAyLCAxLCAyLCAxLCAzXSxcclxuICAgICAgICBbMiwgMiwgMSwgMywgMSwgMl0sXHJcbiAgICAgICAgWzIsIDMsIDEsIDIsIDEsIDJdLFxyXG4gICAgICAgIFsxLCAxLCAyLCAyLCAzLCAyXSxcclxuICAgICAgICBbMSwgMiwgMiwgMSwgMywgMl0sXHJcbiAgICAgICAgWzEsIDIsIDIsIDIsIDMsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAzLCAyLCAyLCAyXSxcclxuICAgICAgICBbMSwgMiwgMywgMSwgMiwgMl0sXHJcbiAgICAgICAgWzEsIDIsIDMsIDIsIDIsIDFdLFxyXG4gICAgICAgIFsyLCAyLCAzLCAyLCAxLCAxXSxcclxuICAgICAgICBbMiwgMiwgMSwgMSwgMywgMl0sXHJcbiAgICAgICAgWzIsIDIsIDEsIDIsIDMsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAzLCAyLCAxLCAyXSxcclxuICAgICAgICBbMiwgMiwgMywgMSwgMSwgMl0sXHJcbiAgICAgICAgWzMsIDEsIDIsIDEsIDMsIDFdLFxyXG4gICAgICAgIFszLCAxLCAxLCAyLCAyLCAyXSxcclxuICAgICAgICBbMywgMiwgMSwgMSwgMiwgMl0sXHJcbiAgICAgICAgWzMsIDIsIDEsIDIsIDIsIDFdLFxyXG4gICAgICAgIFszLCAxLCAyLCAyLCAxLCAyXSxcclxuICAgICAgICBbMywgMiwgMiwgMSwgMSwgMl0sXHJcbiAgICAgICAgWzMsIDIsIDIsIDIsIDEsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAyLCAxLCAyLCAzXSxcclxuICAgICAgICBbMiwgMSwgMiwgMywgMiwgMV0sXHJcbiAgICAgICAgWzIsIDMsIDIsIDEsIDIsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAxLCAzLCAyLCAzXSxcclxuICAgICAgICBbMSwgMywgMSwgMSwgMiwgM10sXHJcbiAgICAgICAgWzEsIDMsIDEsIDMsIDIsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAyLCAzLCAxLCAzXSxcclxuICAgICAgICBbMSwgMywgMiwgMSwgMSwgM10sXHJcbiAgICAgICAgWzEsIDMsIDIsIDMsIDEsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAxLCAzLCAxLCAzXSxcclxuICAgICAgICBbMiwgMywgMSwgMSwgMSwgM10sXHJcbiAgICAgICAgWzIsIDMsIDEsIDMsIDEsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAyLCAxLCAzLCAzXSxcclxuICAgICAgICBbMSwgMSwgMiwgMywgMywgMV0sXHJcbiAgICAgICAgWzEsIDMsIDIsIDEsIDMsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAzLCAxLCAyLCAzXSxcclxuICAgICAgICBbMSwgMSwgMywgMywgMiwgMV0sXHJcbiAgICAgICAgWzEsIDMsIDMsIDEsIDIsIDFdLFxyXG4gICAgICAgIFszLCAxLCAzLCAxLCAyLCAxXSxcclxuICAgICAgICBbMiwgMSwgMSwgMywgMywgMV0sXHJcbiAgICAgICAgWzIsIDMsIDEsIDEsIDMsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAzLCAxLCAxLCAzXSxcclxuICAgICAgICBbMiwgMSwgMywgMywgMSwgMV0sXHJcbiAgICAgICAgWzIsIDEsIDMsIDEsIDMsIDFdLFxyXG4gICAgICAgIFszLCAxLCAxLCAxLCAyLCAzXSxcclxuICAgICAgICBbMywgMSwgMSwgMywgMiwgMV0sXHJcbiAgICAgICAgWzMsIDMsIDEsIDEsIDIsIDFdLFxyXG4gICAgICAgIFszLCAxLCAyLCAxLCAxLCAzXSxcclxuICAgICAgICBbMywgMSwgMiwgMywgMSwgMV0sXHJcbiAgICAgICAgWzMsIDMsIDIsIDEsIDEsIDFdLFxyXG4gICAgICAgIFszLCAxLCA0LCAxLCAxLCAxXSxcclxuICAgICAgICBbMiwgMiwgMSwgNCwgMSwgMV0sXHJcbiAgICAgICAgWzQsIDMsIDEsIDEsIDEsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAxLCAyLCAyLCA0XSxcclxuICAgICAgICBbMSwgMSwgMSwgNCwgMiwgMl0sXHJcbiAgICAgICAgWzEsIDIsIDEsIDEsIDIsIDRdLFxyXG4gICAgICAgIFsxLCAyLCAxLCA0LCAyLCAxXSxcclxuICAgICAgICBbMSwgNCwgMSwgMSwgMiwgMl0sXHJcbiAgICAgICAgWzEsIDQsIDEsIDIsIDIsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAyLCAyLCAxLCA0XSxcclxuICAgICAgICBbMSwgMSwgMiwgNCwgMSwgMl0sXHJcbiAgICAgICAgWzEsIDIsIDIsIDEsIDEsIDRdLFxyXG4gICAgICAgIFsxLCAyLCAyLCA0LCAxLCAxXSxcclxuICAgICAgICBbMSwgNCwgMiwgMSwgMSwgMl0sXHJcbiAgICAgICAgWzEsIDQsIDIsIDIsIDEsIDFdLFxyXG4gICAgICAgIFsyLCA0LCAxLCAyLCAxLCAxXSxcclxuICAgICAgICBbMiwgMiwgMSwgMSwgMSwgNF0sXHJcbiAgICAgICAgWzQsIDEsIDMsIDEsIDEsIDFdLFxyXG4gICAgICAgIFsyLCA0LCAxLCAxLCAxLCAyXSxcclxuICAgICAgICBbMSwgMywgNCwgMSwgMSwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDEsIDIsIDQsIDJdLFxyXG4gICAgICAgIFsxLCAyLCAxLCAxLCA0LCAyXSxcclxuICAgICAgICBbMSwgMiwgMSwgMiwgNCwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDQsIDIsIDEsIDJdLFxyXG4gICAgICAgIFsxLCAyLCA0LCAxLCAxLCAyXSxcclxuICAgICAgICBbMSwgMiwgNCwgMiwgMSwgMV0sXHJcbiAgICAgICAgWzQsIDEsIDEsIDIsIDEsIDJdLFxyXG4gICAgICAgIFs0LCAyLCAxLCAxLCAxLCAyXSxcclxuICAgICAgICBbNCwgMiwgMSwgMiwgMSwgMV0sXHJcbiAgICAgICAgWzIsIDEsIDIsIDEsIDQsIDFdLFxyXG4gICAgICAgIFsyLCAxLCA0LCAxLCAyLCAxXSxcclxuICAgICAgICBbNCwgMSwgMiwgMSwgMiwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDEsIDEsIDQsIDNdLFxyXG4gICAgICAgIFsxLCAxLCAxLCAzLCA0LCAxXSxcclxuICAgICAgICBbMSwgMywgMSwgMSwgNCwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDQsIDEsIDEsIDNdLFxyXG4gICAgICAgIFsxLCAxLCA0LCAzLCAxLCAxXSxcclxuICAgICAgICBbNCwgMSwgMSwgMSwgMSwgM10sXHJcbiAgICAgICAgWzQsIDEsIDEsIDMsIDEsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAzLCAxLCA0LCAxXSxcclxuICAgICAgICBbMSwgMSwgNCwgMSwgMywgMV0sXHJcbiAgICAgICAgWzMsIDEsIDEsIDEsIDQsIDFdLFxyXG4gICAgICAgIFs0LCAxLCAxLCAxLCAzLCAxXSxcclxuICAgICAgICBbMiwgMSwgMSwgNCwgMSwgMl0sXHJcbiAgICAgICAgWzIsIDEsIDEsIDIsIDEsIDRdLFxyXG4gICAgICAgIFsyLCAxLCAxLCAyLCAzLCAyXSxcclxuICAgICAgICBbMiwgMywgMywgMSwgMSwgMSwgMl1cclxuICAgIF19LFxyXG4gICAgU0lOR0xFX0NPREVfRVJST1I6IHt2YWx1ZTogMX0sXHJcbiAgICBBVkdfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjV9LFxyXG4gICAgRk9STUFUOiB7dmFsdWU6IFwiY29kZV8xMjhcIiwgd3JpdGVhYmxlOiBmYWxzZX1cclxufTtcclxuXHJcbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XHJcbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29kZTEyOFJlYWRlcjtcclxuXHJcbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlLl9kZWNvZGVDb2RlID0gZnVuY3Rpb24oc3RhcnQpIHtcclxuICAgIHZhciBjb3VudGVyID0gWzAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgb2Zmc2V0ID0gc3RhcnQsXHJcbiAgICAgICAgaXNXaGl0ZSA9ICFzZWxmLl9yb3dbb2Zmc2V0XSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxyXG4gICAgICAgICAgICBlbmQ6IHN0YXJ0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb2RlLFxyXG4gICAgICAgIGVycm9yLFxyXG4gICAgICAgIG5vcm1hbGl6ZWQ7XHJcblxyXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkID0gc2VsZi5fbm9ybWFsaXplKGNvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvZGUgPSAwOyBjb2RlIDwgc2VsZi5DT0RFX1BBVFRFUk4ubGVuZ3RoOyBjb2RlKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4obm9ybWFsaXplZCwgc2VsZi5DT0RFX1BBVFRFUk5bY29kZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBiZXN0TWF0Y2guZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb2RlID0gY29kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XHJcbiAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlLl9maW5kU3RhcnQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBjb3VudGVyID0gWzAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpLFxyXG4gICAgICAgIGlzV2hpdGUgPSBmYWxzZSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IDAsXHJcbiAgICAgICAgICAgIGVuZDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29kZSxcclxuICAgICAgICBlcnJvcixcclxuICAgICAgICBqLFxyXG4gICAgICAgIHN1bSxcclxuICAgICAgICBub3JtYWxpemVkO1xyXG5cclxuICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgc3VtID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgY291bnRlci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBjb3VudGVyW2pdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZCA9IHNlbGYuX25vcm1hbGl6ZShjb3VudGVyKTtcclxuICAgICAgICAgICAgICAgIGlmIChub3JtYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb2RlID0gc2VsZi5TVEFSVF9DT0RFX0E7IGNvZGUgPD0gc2VsZi5TVEFSVF9DT0RFX0M7IGNvZGUrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHNlbGYuX21hdGNoUGF0dGVybihub3JtYWxpemVkLCBzZWxmLkNPREVfUEFUVEVSTltjb2RlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciA8IGJlc3RNYXRjaC5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmNvZGUgPSBjb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJlc3RNYXRjaC5lcnJvciA8IHNlbGYuQVZHX0NPREVfRVJST1IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLnN0YXJ0ID0gaSAtIHN1bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVuZCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltqXSA9IGNvdW50ZXJbaiArIDJdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY291bnRlcls0XSA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyWzVdID0gMDtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MtLTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuQ29kZTEyOFJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIHN0YXJ0SW5mbyA9IHNlbGYuX2ZpbmRTdGFydCgpLFxyXG4gICAgICAgIGNvZGUgPSBudWxsLFxyXG4gICAgICAgIGRvbmUgPSBmYWxzZSxcclxuICAgICAgICByZXN1bHQgPSBbXSxcclxuICAgICAgICBtdWx0aXBsaWVyID0gMCxcclxuICAgICAgICBjaGVja3N1bSA9IDAsXHJcbiAgICAgICAgY29kZXNldCxcclxuICAgICAgICByYXdSZXN1bHQgPSBbXSxcclxuICAgICAgICBkZWNvZGVkQ29kZXMgPSBbXSxcclxuICAgICAgICBzaGlmdE5leHQgPSBmYWxzZSxcclxuICAgICAgICB1bnNoaWZ0LFxyXG4gICAgICAgIHJlbW92ZUxhc3RDaGFyYWN0ZXIgPSB0cnVlO1xyXG5cclxuICAgIGlmIChzdGFydEluZm8gPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvZGUgPSB7XHJcbiAgICAgICAgY29kZTogc3RhcnRJbmZvLmNvZGUsXHJcbiAgICAgICAgc3RhcnQ6IHN0YXJ0SW5mby5zdGFydCxcclxuICAgICAgICBlbmQ6IHN0YXJ0SW5mby5lbmRcclxuICAgIH07XHJcbiAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuICAgIGNoZWNrc3VtID0gY29kZS5jb2RlO1xyXG4gICAgc3dpdGNoIChjb2RlLmNvZGUpIHtcclxuICAgIGNhc2Ugc2VsZi5TVEFSVF9DT0RFX0E6XHJcbiAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9BO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBzZWxmLlNUQVJUX0NPREVfQjpcclxuICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0I7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIHNlbGYuU1RBUlRfQ09ERV9DOlxyXG4gICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQztcclxuICAgICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgd2hpbGUgKCFkb25lKSB7XHJcbiAgICAgICAgdW5zaGlmdCA9IHNoaWZ0TmV4dDtcclxuICAgICAgICBzaGlmdE5leHQgPSBmYWxzZTtcclxuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb2RlLmVuZCk7XHJcbiAgICAgICAgaWYgKGNvZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGNvZGUuY29kZSAhPT0gc2VsZi5TVE9QX0NPREUpIHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUxhc3RDaGFyYWN0ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29kZS5jb2RlICE9PSBzZWxmLlNUT1BfQ09ERSkge1xyXG4gICAgICAgICAgICAgICAgcmF3UmVzdWx0LnB1c2goY29kZS5jb2RlKTtcclxuICAgICAgICAgICAgICAgIG11bHRpcGxpZXIrKztcclxuICAgICAgICAgICAgICAgIGNoZWNrc3VtICs9IG11bHRpcGxpZXIgKiBjb2RlLmNvZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKGNvZGVzZXQpIHtcclxuICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQTpcclxuICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgPCA2NCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoMzIgKyBjb2RlLmNvZGUpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29kZS5jb2RlIDwgOTYpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUuY29kZSAtIDY0KSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgIT09IHNlbGYuU1RPUF9DT0RFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUxhc3RDaGFyYWN0ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjb2RlLmNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9TSElGVDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnROZXh0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9CO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9COlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0M6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLlNUT1BfQ09ERTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9COlxyXG4gICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSA8IDk2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgzMiArIGNvZGUuY29kZSkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29kZS5jb2RlICE9PSBzZWxmLlNUT1BfQ09ERSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVMYXN0Q2hhcmFjdGVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY29kZS5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfU0hJRlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0TmV4dCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9BO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9DOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5TVE9QX0NPREU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQzpcclxuICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgPCAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUgPCAxMCA/IFwiMFwiICsgY29kZS5jb2RlIDogY29kZS5jb2RlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSAhPT0gc2VsZi5TVE9QX0NPREUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTGFzdENoYXJhY3RlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvZGUuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0E6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9CO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuU1RPUF9DT0RFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkb25lID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVuc2hpZnQpIHtcclxuICAgICAgICAgICAgY29kZXNldCA9IGNvZGVzZXQgPT09IHNlbGYuQ09ERV9BID8gc2VsZi5DT0RFX0IgOiBzZWxmLkNPREVfQTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvZGUgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb2RlLmVuZCA9IHNlbGYuX25leHRVbnNldChzZWxmLl9yb3csIGNvZGUuZW5kKTtcclxuICAgIGlmICghc2VsZi5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlKGNvZGUpKXtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja3N1bSAtPSBtdWx0aXBsaWVyICogcmF3UmVzdWx0W3Jhd1Jlc3VsdC5sZW5ndGggLSAxXTtcclxuICAgIGlmIChjaGVja3N1bSAlIDEwMyAhPT0gcmF3UmVzdWx0W3Jhd1Jlc3VsdC5sZW5ndGggLSAxXSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghcmVzdWx0Lmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlbW92ZSBsYXN0IGNvZGUgZnJvbSByZXN1bHQgKGNoZWNrc3VtKVxyXG4gICAgaWYgKHJlbW92ZUxhc3RDaGFyYWN0ZXIpIHtcclxuICAgICAgICByZXN1bHQuc3BsaWNlKHJlc3VsdC5sZW5ndGggLSAxLCAxKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcclxuICAgICAgICBzdGFydDogc3RhcnRJbmZvLnN0YXJ0LFxyXG4gICAgICAgIGVuZDogY29kZS5lbmQsXHJcbiAgICAgICAgY29kZXNldDogY29kZXNldCxcclxuICAgICAgICBzdGFydEluZm86IHN0YXJ0SW5mbyxcclxuICAgICAgICBkZWNvZGVkQ29kZXM6IGRlY29kZWRDb2RlcyxcclxuICAgICAgICBlbmRJbmZvOiBjb2RlXHJcbiAgICB9O1xyXG59O1xyXG5cclxuXHJcbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbihlbmRJbmZvKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kO1xyXG5cclxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IGVuZEluZm8uZW5kICsgKChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpIC8gMik7XHJcbiAgICBpZiAodHJhaWxpbmdXaGl0ZXNwYWNlRW5kIDwgc2VsZi5fcm93Lmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKGVuZEluZm8uZW5kLCB0cmFpbGluZ1doaXRlc3BhY2VFbmQsIDApKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29kZTEyOFJlYWRlcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL2NvZGVfMTI4X3JlYWRlci5qc1xuICoqLyIsImZ1bmN0aW9uIEJhcmNvZGVSZWFkZXIoY29uZmlnKSB7XHJcbiAgICB0aGlzLl9yb3cgPSBbXTtcclxuICAgIHRoaXMuY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9uZXh0VW5zZXQgPSBmdW5jdGlvbihsaW5lLCBzdGFydCkge1xyXG4gICAgdmFyIGk7XHJcblxyXG4gICAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzdGFydCA9IDA7XHJcbiAgICB9XHJcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIWxpbmVbaV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpbmUubGVuZ3RoO1xyXG59O1xyXG5cclxuQmFyY29kZVJlYWRlci5wcm90b3R5cGUuX21hdGNoUGF0dGVybiA9IGZ1bmN0aW9uKGNvdW50ZXIsIGNvZGUpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIGVycm9yID0gMCxcclxuICAgICAgICBzaW5nbGVFcnJvciA9IDAsXHJcbiAgICAgICAgbW9kdWxvID0gdGhpcy5NT0RVTE8sXHJcbiAgICAgICAgbWF4U2luZ2xlRXJyb3IgPSB0aGlzLlNJTkdMRV9DT0RFX0VSUk9SIHx8IDE7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBzaW5nbGVFcnJvciA9IE1hdGguYWJzKGNvZGVbaV0gLSBjb3VudGVyW2ldKTtcclxuICAgICAgICBpZiAoc2luZ2xlRXJyb3IgPiBtYXhTaW5nbGVFcnJvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyLk1BWF9WQUxVRTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXJyb3IgKz0gc2luZ2xlRXJyb3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXJyb3IgLyBtb2R1bG87XHJcbn07XHJcblxyXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbmV4dFNldCA9IGZ1bmN0aW9uKGxpbmUsIG9mZnNldCkge1xyXG4gICAgdmFyIGk7XHJcblxyXG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XHJcbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBsaW5lLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGxpbmVbaV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpbmUubGVuZ3RoO1xyXG59O1xyXG5cclxuQmFyY29kZVJlYWRlci5wcm90b3R5cGUuX25vcm1hbGl6ZSA9IGZ1bmN0aW9uKGNvdW50ZXIsIG1vZHVsbykge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgc3VtID0gMCxcclxuICAgICAgICByYXRpbyxcclxuICAgICAgICBudW1PbmVzID0gMCxcclxuICAgICAgICBub3JtYWxpemVkID0gW10sXHJcbiAgICAgICAgbm9ybSA9IDA7XHJcblxyXG4gICAgaWYgKCFtb2R1bG8pIHtcclxuICAgICAgICBtb2R1bG8gPSBzZWxmLk1PRFVMTztcclxuICAgIH1cclxuICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGNvdW50ZXJbaV0gPT09IDEpIHtcclxuICAgICAgICAgICAgbnVtT25lcysrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN1bSArPSBjb3VudGVyW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJhdGlvID0gc3VtIC8gKG1vZHVsbyAtIG51bU9uZXMpO1xyXG4gICAgaWYgKHJhdGlvID4gMS4wKSB7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbm9ybSA9IGNvdW50ZXJbaV0gPT09IDEgPyBjb3VudGVyW2ldIDogY291bnRlcltpXSAvIHJhdGlvO1xyXG4gICAgICAgICAgICBub3JtYWxpemVkLnB1c2gobm9ybSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByYXRpbyA9IChzdW0gKyBudW1PbmVzKSAvIG1vZHVsbztcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBub3JtID0gY291bnRlcltpXSAvIHJhdGlvO1xyXG4gICAgICAgICAgICBub3JtYWxpemVkLnB1c2gobm9ybSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZWQ7XHJcbn07XHJcblxyXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hUcmFjZSA9IGZ1bmN0aW9uKGNtcENvdW50ZXIsIGVwc2lsb24pIHtcclxuICAgIHZhciBjb3VudGVyID0gW10sXHJcbiAgICAgICAgaSxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3JvdyksXHJcbiAgICAgICAgaXNXaGl0ZSA9ICFzZWxmLl9yb3dbb2Zmc2V0XSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yO1xyXG5cclxuICAgIGlmIChjbXBDb3VudGVyKSB7XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBjbXBDb3VudGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXIucHVzaCgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xyXG4gICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKGNvdW50ZXIsIGNtcENvdW50ZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBlcHNpbG9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5zdGFydCA9IGkgLSBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guY291bnRlciA9IGNvdW50ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY291bnRlci5wdXNoKDApO1xyXG4gICAgICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcclxuICAgICAgICAgICAgICAgIGNvdW50ZXIucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xyXG4gICAgICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIGNtcENvdW50ZXIgd2FzIG5vdCBnaXZlblxyXG4gICAgYmVzdE1hdGNoLnN0YXJ0ID0gb2Zmc2V0O1xyXG4gICAgYmVzdE1hdGNoLmVuZCA9IHNlbGYuX3Jvdy5sZW5ndGggLSAxO1xyXG4gICAgYmVzdE1hdGNoLmNvdW50ZXIgPSBjb3VudGVyO1xyXG4gICAgcmV0dXJuIGJlc3RNYXRjaDtcclxufTtcclxuXHJcbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLmRlY29kZVBhdHRlcm4gPSBmdW5jdGlvbihwYXR0ZXJuKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgcmVzdWx0O1xyXG5cclxuICAgIHNlbGYuX3JvdyA9IHBhdHRlcm47XHJcbiAgICByZXN1bHQgPSBzZWxmLl9kZWNvZGUoKTtcclxuICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHtcclxuICAgICAgICBzZWxmLl9yb3cucmV2ZXJzZSgpO1xyXG4gICAgICAgIHJlc3VsdCA9IHNlbGYuX2RlY29kZSgpO1xyXG4gICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcmVzdWx0LmRpcmVjdGlvbiA9IEJhcmNvZGVSZWFkZXIuRElSRUNUSU9OLlJFVkVSU0U7XHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydCA9IHNlbGYuX3Jvdy5sZW5ndGggLSByZXN1bHQuc3RhcnQ7XHJcbiAgICAgICAgICAgIHJlc3VsdC5lbmQgPSBzZWxmLl9yb3cubGVuZ3RoIC0gcmVzdWx0LmVuZDtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdC5kaXJlY3Rpb24gPSBCYXJjb2RlUmVhZGVyLkRJUkVDVElPTi5GT1JXQVJEO1xyXG4gICAgfVxyXG4gICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgIHJlc3VsdC5mb3JtYXQgPSBzZWxmLkZPUk1BVDtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hSYW5nZSA9IGZ1bmN0aW9uKHN0YXJ0LCBlbmQsIHZhbHVlKSB7XHJcbiAgICB2YXIgaTtcclxuXHJcbiAgICBzdGFydCA9IHN0YXJ0IDwgMCA/IDAgOiBzdGFydDtcclxuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcy5fcm93W2ldICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fZmlsbENvdW50ZXJzID0gZnVuY3Rpb24ob2Zmc2V0LCBlbmQsIGlzV2hpdGUpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGNvdW50ZXJzID0gW107XHJcblxyXG4gICAgaXNXaGl0ZSA9ICh0eXBlb2YgaXNXaGl0ZSAhPT0gJ3VuZGVmaW5lZCcpID8gaXNXaGl0ZSA6IHRydWU7XHJcbiAgICBvZmZzZXQgPSAodHlwZW9mIG9mZnNldCAhPT0gJ3VuZGVmaW5lZCcpID8gb2Zmc2V0IDogc2VsZi5fbmV4dFVuc2V0KHNlbGYuX3Jvdyk7XHJcbiAgICBlbmQgPSBlbmQgfHwgc2VsZi5fcm93Lmxlbmd0aDtcclxuXHJcbiAgICBjb3VudGVyc1tjb3VudGVyUG9zXSA9IDA7XHJcbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBlbmQ7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJzW2NvdW50ZXJQb3NdKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY291bnRlclBvcysrO1xyXG4gICAgICAgICAgICBjb3VudGVyc1tjb3VudGVyUG9zXSA9IDE7XHJcbiAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY291bnRlcnM7XHJcbn07XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQmFyY29kZVJlYWRlci5wcm90b3R5cGUsIFwiRk9STUFUXCIsIHtcclxuICAgIHZhbHVlOiAndW5rbm93bicsXHJcbiAgICB3cml0ZWFibGU6IGZhbHNlXHJcbn0pO1xyXG5cclxuQmFyY29kZVJlYWRlci5ESVJFQ1RJT04gPSB7XHJcbiAgICBGT1JXQVJEOiAxLFxyXG4gICAgUkVWRVJTRTogLTFcclxufTtcclxuXHJcbkJhcmNvZGVSZWFkZXIuRXhjZXB0aW9uID0ge1xyXG4gICAgU3RhcnROb3RGb3VuZEV4Y2VwdGlvbjogXCJTdGFydC1JbmZvIHdhcyBub3QgZm91bmQhXCIsXHJcbiAgICBDb2RlTm90Rm91bmRFeGNlcHRpb246IFwiQ29kZSBjb3VsZCBub3QgYmUgZm91bmQhXCIsXHJcbiAgICBQYXR0ZXJuTm90Rm91bmRFeGNlcHRpb246IFwiUGF0dGVybiBjb3VsZCBub3QgYmUgZm91bmQhXCJcclxufTtcclxuXHJcbkJhcmNvZGVSZWFkZXIuQ09ORklHX0tFWVMgPSB7fTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhcmNvZGVSZWFkZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9iYXJjb2RlX3JlYWRlci5qc1xuICoqLyIsImltcG9ydCBCYXJjb2RlUmVhZGVyIGZyb20gJy4vYmFyY29kZV9yZWFkZXInO1xyXG5cclxuZnVuY3Rpb24gRUFOUmVhZGVyKG9wdHMpIHtcclxuICAgIEJhcmNvZGVSZWFkZXIuY2FsbCh0aGlzLCBvcHRzKTtcclxufVxyXG5cclxudmFyIHByb3BlcnRpZXMgPSB7XHJcbiAgICBDT0RFX0xfU1RBUlQ6IHt2YWx1ZTogMH0sXHJcbiAgICBNT0RVTE86IHt2YWx1ZTogN30sXHJcbiAgICBDT0RFX0dfU1RBUlQ6IHt2YWx1ZTogMTB9LFxyXG4gICAgU1RBUlRfUEFUVEVSTjoge3ZhbHVlOiBbMSAvIDMgKiA3LCAxIC8gMyAqIDcsIDEgLyAzICogN119LFxyXG4gICAgU1RPUF9QQVRURVJOOiB7dmFsdWU6IFsxIC8gMyAqIDcsIDEgLyAzICogNywgMSAvIDMgKiA3XX0sXHJcbiAgICBNSURETEVfUEFUVEVSTjoge3ZhbHVlOiBbMSAvIDUgKiA3LCAxIC8gNSAqIDcsIDEgLyA1ICogNywgMSAvIDUgKiA3LCAxIC8gNSAqIDddfSxcclxuICAgIENPREVfUEFUVEVSTjoge3ZhbHVlOiBbXHJcbiAgICAgICAgWzMsIDIsIDEsIDFdLFxyXG4gICAgICAgIFsyLCAyLCAyLCAxXSxcclxuICAgICAgICBbMiwgMSwgMiwgMl0sXHJcbiAgICAgICAgWzEsIDQsIDEsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAzLCAyXSxcclxuICAgICAgICBbMSwgMiwgMywgMV0sXHJcbiAgICAgICAgWzEsIDEsIDEsIDRdLFxyXG4gICAgICAgIFsxLCAzLCAxLCAyXSxcclxuICAgICAgICBbMSwgMiwgMSwgM10sXHJcbiAgICAgICAgWzMsIDEsIDEsIDJdLFxyXG4gICAgICAgIFsxLCAxLCAyLCAzXSxcclxuICAgICAgICBbMSwgMiwgMiwgMl0sXHJcbiAgICAgICAgWzIsIDIsIDEsIDJdLFxyXG4gICAgICAgIFsxLCAxLCA0LCAxXSxcclxuICAgICAgICBbMiwgMywgMSwgMV0sXHJcbiAgICAgICAgWzEsIDMsIDIsIDFdLFxyXG4gICAgICAgIFs0LCAxLCAxLCAxXSxcclxuICAgICAgICBbMiwgMSwgMywgMV0sXHJcbiAgICAgICAgWzMsIDEsIDIsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAxLCAzXVxyXG4gICAgXX0sXHJcbiAgICBDT0RFX0ZSRVFVRU5DWToge3ZhbHVlOiBbMCwgMTEsIDEzLCAxNCwgMTksIDI1LCAyOCwgMjEsIDIyLCAyNl19LFxyXG4gICAgU0lOR0xFX0NPREVfRVJST1I6IHt2YWx1ZTogMC42N30sXHJcbiAgICBBVkdfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjI3fSxcclxuICAgIEZPUk1BVDoge3ZhbHVlOiBcImVhbl8xM1wiLCB3cml0ZWFibGU6IGZhbHNlfVxyXG59O1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFyY29kZVJlYWRlci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xyXG5FQU5SZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRUFOUmVhZGVyO1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlQ29kZSA9IGZ1bmN0aW9uKHN0YXJ0LCBjb2RlcmFuZ2UpIHtcclxuICAgIHZhciBjb3VudGVyID0gWzAsIDAsIDAsIDBdLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgb2Zmc2V0ID0gc3RhcnQsXHJcbiAgICAgICAgaXNXaGl0ZSA9ICFzZWxmLl9yb3dbb2Zmc2V0XSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxyXG4gICAgICAgICAgICBlbmQ6IHN0YXJ0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb2RlLFxyXG4gICAgICAgIGVycm9yLFxyXG4gICAgICAgIG5vcm1hbGl6ZWQ7XHJcblxyXG4gICAgaWYgKCFjb2RlcmFuZ2UpIHtcclxuICAgICAgICBjb2RlcmFuZ2UgPSBzZWxmLkNPREVfUEFUVEVSTi5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkID0gc2VsZi5fbm9ybWFsaXplKGNvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvZGUgPSAwOyBjb2RlIDwgY29kZXJhbmdlOyBjb2RlKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4obm9ybWFsaXplZCwgc2VsZi5DT0RFX1BBVFRFUk5bY29kZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBiZXN0TWF0Y2guZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb2RlID0gY29kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiZXN0TWF0Y2guZXJyb3IgPiBzZWxmLkFWR19DT0RFX0VSUk9SKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xyXG4gICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5FQU5SZWFkZXIucHJvdG90eXBlLl9maW5kUGF0dGVybiA9IGZ1bmN0aW9uKHBhdHRlcm4sIG9mZnNldCwgaXNXaGl0ZSwgdHJ5SGFyZGVyLCBlcHNpbG9uKSB7XHJcbiAgICB2YXIgY291bnRlciA9IFtdLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgY291bnRlclBvcyA9IDAsXHJcbiAgICAgICAgYmVzdE1hdGNoID0ge1xyXG4gICAgICAgICAgICBlcnJvcjogTnVtYmVyLk1BWF9WQUxVRSxcclxuICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgIHN0YXJ0OiAwLFxyXG4gICAgICAgICAgICBlbmQ6IDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yLFxyXG4gICAgICAgIGosXHJcbiAgICAgICAgc3VtLFxyXG4gICAgICAgIG5vcm1hbGl6ZWQ7XHJcblxyXG4gICAgaWYgKCFvZmZzZXQpIHtcclxuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3Jvdyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzV2hpdGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlzV2hpdGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHJ5SGFyZGVyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0cnlIYXJkZXIgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggZXBzaWxvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZXBzaWxvbiA9IHNlbGYuQVZHX0NPREVfRVJST1I7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCBwYXR0ZXJuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY291bnRlcltpXSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBzdW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBjb3VudGVyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGNvdW50ZXJbal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkID0gc2VsZi5fbm9ybWFsaXplKGNvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHNlbGYuX21hdGNoUGF0dGVybihub3JtYWxpemVkLCBwYXR0ZXJuKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIDwgZXBzaWxvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLnN0YXJ0ID0gaSAtIHN1bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVuZCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRyeUhhcmRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgY291bnRlci5sZW5ndGggLSAyOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcltqXSA9IGNvdW50ZXJbaiArIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXIubGVuZ3RoIC0gMl0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlci5sZW5ndGggLSAxXSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlclBvcy0tO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZmluZFN0YXJ0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgbGVhZGluZ1doaXRlc3BhY2VTdGFydCxcclxuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3JvdyksXHJcbiAgICAgICAgc3RhcnRJbmZvO1xyXG5cclxuICAgIHdoaWxlICghc3RhcnRJbmZvKSB7XHJcbiAgICAgICAgc3RhcnRJbmZvID0gc2VsZi5fZmluZFBhdHRlcm4oc2VsZi5TVEFSVF9QQVRURVJOLCBvZmZzZXQpO1xyXG4gICAgICAgIGlmICghc3RhcnRJbmZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0ID0gc3RhcnRJbmZvLnN0YXJ0IC0gKHN0YXJ0SW5mby5lbmQgLSBzdGFydEluZm8uc3RhcnQpO1xyXG4gICAgICAgIGlmIChsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0ID49IDApIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UobGVhZGluZ1doaXRlc3BhY2VTdGFydCwgc3RhcnRJbmZvLnN0YXJ0LCAwKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXJ0SW5mbztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBvZmZzZXQgPSBzdGFydEluZm8uZW5kO1xyXG4gICAgICAgIHN0YXJ0SW5mbyA9IG51bGw7XHJcbiAgICB9XHJcbn07XHJcblxyXG5FQU5SZWFkZXIucHJvdG90eXBlLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbihlbmRJbmZvKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kO1xyXG5cclxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IGVuZEluZm8uZW5kICsgKGVuZEluZm8uZW5kIC0gZW5kSW5mby5zdGFydCk7XHJcbiAgICBpZiAodHJhaWxpbmdXaGl0ZXNwYWNlRW5kIDwgc2VsZi5fcm93Lmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKGVuZEluZm8uZW5kLCB0cmFpbGluZ1doaXRlc3BhY2VFbmQsIDApKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZmluZEVuZCA9IGZ1bmN0aW9uKG9mZnNldCwgaXNXaGl0ZSkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGVuZEluZm8gPSBzZWxmLl9maW5kUGF0dGVybihzZWxmLlNUT1BfUEFUVEVSTiwgb2Zmc2V0LCBpc1doaXRlLCBmYWxzZSk7XHJcblxyXG4gICAgcmV0dXJuIGVuZEluZm8gIT09IG51bGwgPyBzZWxmLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UoZW5kSW5mbykgOiBudWxsO1xyXG59O1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZS5fY2FsY3VsYXRlRmlyc3REaWdpdCA9IGZ1bmN0aW9uKGNvZGVGcmVxdWVuY3kpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgc2VsZi5DT0RFX0ZSRVFVRU5DWS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChjb2RlRnJlcXVlbmN5ID09PSBzZWxmLkNPREVfRlJFUVVFTkNZW2ldKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlUGF5bG9hZCA9IGZ1bmN0aW9uKGNvZGUsIHJlc3VsdCwgZGVjb2RlZENvZGVzKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBjb2RlRnJlcXVlbmN5ID0gMHgwLFxyXG4gICAgICAgIGZpcnN0RGlnaXQ7XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCA2OyBpKyspIHtcclxuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb2RlLmVuZCk7XHJcbiAgICAgICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29kZS5jb2RlID49IHNlbGYuQ09ERV9HX1NUQVJUKSB7XHJcbiAgICAgICAgICAgIGNvZGUuY29kZSA9IGNvZGUuY29kZSAtIHNlbGYuQ09ERV9HX1NUQVJUO1xyXG4gICAgICAgICAgICBjb2RlRnJlcXVlbmN5IHw9IDEgPDwgKDUgLSBpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb2RlRnJlcXVlbmN5IHw9IDAgPDwgKDUgLSBpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0LnB1c2goY29kZS5jb2RlKTtcclxuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBmaXJzdERpZ2l0ID0gc2VsZi5fY2FsY3VsYXRlRmlyc3REaWdpdChjb2RlRnJlcXVlbmN5KTtcclxuICAgIGlmIChmaXJzdERpZ2l0ID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICByZXN1bHQudW5zaGlmdChmaXJzdERpZ2l0KTtcclxuXHJcbiAgICBjb2RlID0gc2VsZi5fZmluZFBhdHRlcm4oc2VsZi5NSURETEVfUEFUVEVSTiwgY29kZS5lbmQsIHRydWUsIGZhbHNlKTtcclxuICAgIGlmIChjb2RlID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kLCBzZWxmLkNPREVfR19TVEFSVCk7XHJcbiAgICAgICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb2RlO1xyXG59O1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc3RhcnRJbmZvLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGNvZGUsXHJcbiAgICAgICAgcmVzdWx0ID0gW10sXHJcbiAgICAgICAgZGVjb2RlZENvZGVzID0gW107XHJcblxyXG4gICAgc3RhcnRJbmZvID0gc2VsZi5fZmluZFN0YXJ0KCk7XHJcbiAgICBpZiAoIXN0YXJ0SW5mbykge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY29kZSA9IHtcclxuICAgICAgICBjb2RlOiBzdGFydEluZm8uY29kZSxcclxuICAgICAgICBzdGFydDogc3RhcnRJbmZvLnN0YXJ0LFxyXG4gICAgICAgIGVuZDogc3RhcnRJbmZvLmVuZFxyXG4gICAgfTtcclxuICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xyXG4gICAgY29kZSA9IHNlbGYuX2RlY29kZVBheWxvYWQoY29kZSwgcmVzdWx0LCBkZWNvZGVkQ29kZXMpO1xyXG4gICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjb2RlID0gc2VsZi5fZmluZEVuZChjb2RlLmVuZCwgZmFsc2UpO1xyXG4gICAgaWYgKCFjb2RlKXtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuXHJcbiAgICAvLyBDaGVja3N1bVxyXG4gICAgaWYgKCFzZWxmLl9jaGVja3N1bShyZXN1bHQpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcclxuICAgICAgICBzdGFydDogc3RhcnRJbmZvLnN0YXJ0LFxyXG4gICAgICAgIGVuZDogY29kZS5lbmQsXHJcbiAgICAgICAgY29kZXNldDogXCJcIixcclxuICAgICAgICBzdGFydEluZm86IHN0YXJ0SW5mbyxcclxuICAgICAgICBkZWNvZGVkQ29kZXM6IGRlY29kZWRDb2Rlc1xyXG4gICAgfTtcclxufTtcclxuXHJcbkVBTlJlYWRlci5wcm90b3R5cGUuX2NoZWNrc3VtID0gZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICB2YXIgc3VtID0gMCwgaTtcclxuXHJcbiAgICBmb3IgKCBpID0gcmVzdWx0Lmxlbmd0aCAtIDI7IGkgPj0gMDsgaSAtPSAyKSB7XHJcbiAgICAgICAgc3VtICs9IHJlc3VsdFtpXTtcclxuICAgIH1cclxuICAgIHN1bSAqPSAzO1xyXG4gICAgZm9yICggaSA9IHJlc3VsdC5sZW5ndGggLSAxOyBpID49IDA7IGkgLT0gMikge1xyXG4gICAgICAgIHN1bSArPSByZXN1bHRbaV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VtICUgMTAgPT09IDA7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoRUFOUmVhZGVyKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL2Vhbl9yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgQmFyY29kZVJlYWRlciBmcm9tICcuL2JhcmNvZGVfcmVhZGVyJztcclxuaW1wb3J0IEFycmF5SGVscGVyIGZyb20gJy4uL2NvbW1vbi9hcnJheV9oZWxwZXInO1xyXG5cclxuZnVuY3Rpb24gQ29kZTM5UmVhZGVyKCkge1xyXG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG52YXIgcHJvcGVydGllcyA9IHtcclxuICAgIEFMUEhBQkVUSF9TVFJJTkc6IHt2YWx1ZTogXCIwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVotLiAqJC8rJVwifSxcclxuICAgIEFMUEhBQkVUOiB7dmFsdWU6IFs0OCwgNDksIDUwLCA1MSwgNTIsIDUzLCA1NCwgNTUsIDU2LCA1NywgNjUsIDY2LCA2NywgNjgsIDY5LCA3MCwgNzEsIDcyLCA3MywgNzQsIDc1LCA3NiwgNzcsIDc4LFxyXG4gICAgICAgIDc5LCA4MCwgODEsIDgyLCA4MywgODQsIDg1LCA4NiwgODcsIDg4LCA4OSwgOTAsIDQ1LCA0NiwgMzIsIDQyLCAzNiwgNDcsIDQzLCAzN119LFxyXG4gICAgQ0hBUkFDVEVSX0VOQ09ESU5HUzoge3ZhbHVlOiBbMHgwMzQsIDB4MTIxLCAweDA2MSwgMHgxNjAsIDB4MDMxLCAweDEzMCwgMHgwNzAsIDB4MDI1LCAweDEyNCwgMHgwNjQsIDB4MTA5LCAweDA0OSxcclxuICAgICAgICAweDE0OCwgMHgwMTksIDB4MTE4LCAweDA1OCwgMHgwMEQsIDB4MTBDLCAweDA0QywgMHgwMUMsIDB4MTAzLCAweDA0MywgMHgxNDIsIDB4MDEzLCAweDExMiwgMHgwNTIsIDB4MDA3LCAweDEwNixcclxuICAgICAgICAweDA0NiwgMHgwMTYsIDB4MTgxLCAweDBDMSwgMHgxQzAsIDB4MDkxLCAweDE5MCwgMHgwRDAsIDB4MDg1LCAweDE4NCwgMHgwQzQsIDB4MDk0LCAweDBBOCwgMHgwQTIsIDB4MDhBLCAweDAyQVxyXG4gICAgXX0sXHJcbiAgICBBU1RFUklTSzoge3ZhbHVlOiAweDA5NH0sXHJcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJjb2RlXzM5XCIsIHdyaXRlYWJsZTogZmFsc2V9XHJcbn07XHJcblxyXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XHJcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb2RlMzlSZWFkZXI7XHJcblxyXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl90b0NvdW50ZXJzID0gZnVuY3Rpb24oc3RhcnQsIGNvdW50ZXIpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBudW1Db3VudGVycyA9IGNvdW50ZXIubGVuZ3RoLFxyXG4gICAgICAgIGVuZCA9IHNlbGYuX3Jvdy5sZW5ndGgsXHJcbiAgICAgICAgaXNXaGl0ZSA9ICFzZWxmLl9yb3dbc3RhcnRdLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgY291bnRlclBvcyA9IDA7XHJcblxyXG4gICAgQXJyYXlIZWxwZXIuaW5pdChjb3VudGVyLCAwKTtcclxuXHJcbiAgICBmb3IgKCBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb3VudGVyUG9zKys7XHJcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBudW1Db3VudGVycykge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY291bnRlcjtcclxufTtcclxuXHJcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGNvdW50ZXJzID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgIHJlc3VsdCA9IFtdLFxyXG4gICAgICAgIHN0YXJ0ID0gc2VsZi5fZmluZFN0YXJ0KCksXHJcbiAgICAgICAgZGVjb2RlZENoYXIsXHJcbiAgICAgICAgbGFzdFN0YXJ0LFxyXG4gICAgICAgIHBhdHRlcm4sXHJcbiAgICAgICAgbmV4dFN0YXJ0O1xyXG5cclxuICAgIGlmICghc3RhcnQpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIG5leHRTdGFydCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93LCBzdGFydC5lbmQpO1xyXG5cclxuICAgIGRvIHtcclxuICAgICAgICBjb3VudGVycyA9IHNlbGYuX3RvQ291bnRlcnMobmV4dFN0YXJ0LCBjb3VudGVycyk7XHJcbiAgICAgICAgcGF0dGVybiA9IHNlbGYuX3RvUGF0dGVybihjb3VudGVycyk7XHJcbiAgICAgICAgaWYgKHBhdHRlcm4gPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWNvZGVkQ2hhciA9IHNlbGYuX3BhdHRlcm5Ub0NoYXIocGF0dGVybik7XHJcbiAgICAgICAgaWYgKGRlY29kZWRDaGFyIDwgMCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQucHVzaChkZWNvZGVkQ2hhcik7XHJcbiAgICAgICAgbGFzdFN0YXJ0ID0gbmV4dFN0YXJ0O1xyXG4gICAgICAgIG5leHRTdGFydCArPSBBcnJheUhlbHBlci5zdW0oY291bnRlcnMpO1xyXG4gICAgICAgIG5leHRTdGFydCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93LCBuZXh0U3RhcnQpO1xyXG4gICAgfSB3aGlsZSAoZGVjb2RlZENoYXIgIT09ICcqJyk7XHJcbiAgICByZXN1bHQucG9wKCk7XHJcblxyXG4gICAgaWYgKCFyZXN1bHQubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFzZWxmLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UobGFzdFN0YXJ0LCBuZXh0U3RhcnQsIGNvdW50ZXJzKSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogcmVzdWx0LmpvaW4oXCJcIiksXHJcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LnN0YXJ0LFxyXG4gICAgICAgIGVuZDogbmV4dFN0YXJ0LFxyXG4gICAgICAgIHN0YXJ0SW5mbzogc3RhcnQsXHJcbiAgICAgICAgZGVjb2RlZENvZGVzOiByZXN1bHRcclxuICAgIH07XHJcbn07XHJcblxyXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbihsYXN0U3RhcnQsIG5leHRTdGFydCwgY291bnRlcnMpIHtcclxuICAgIHZhciB0cmFpbGluZ1doaXRlc3BhY2VFbmQsXHJcbiAgICAgICAgcGF0dGVyblNpemUgPSBBcnJheUhlbHBlci5zdW0oY291bnRlcnMpO1xyXG5cclxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IG5leHRTdGFydCAtIGxhc3RTdGFydCAtIHBhdHRlcm5TaXplO1xyXG4gICAgaWYgKCh0cmFpbGluZ1doaXRlc3BhY2VFbmQgKiAzKSA+PSBwYXR0ZXJuU2l6ZSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fcGF0dGVyblRvQ2hhciA9IGZ1bmN0aW9uKHBhdHRlcm4pIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoc2VsZi5DSEFSQUNURVJfRU5DT0RJTkdTW2ldID09PSBwYXR0ZXJuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHNlbGYuQUxQSEFCRVRbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAtMTtcclxufTtcclxuXHJcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX2ZpbmROZXh0V2lkdGggPSBmdW5jdGlvbihjb3VudGVycywgY3VycmVudCkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgbWluV2lkdGggPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChjb3VudGVyc1tpXSA8IG1pbldpZHRoICYmIGNvdW50ZXJzW2ldID4gY3VycmVudCkge1xyXG4gICAgICAgICAgICBtaW5XaWR0aCA9IGNvdW50ZXJzW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWluV2lkdGg7XHJcbn07XHJcblxyXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl90b1BhdHRlcm4gPSBmdW5jdGlvbihjb3VudGVycykge1xyXG4gICAgdmFyIG51bUNvdW50ZXJzID0gY291bnRlcnMubGVuZ3RoLFxyXG4gICAgICAgIG1heE5hcnJvd1dpZHRoID0gMCxcclxuICAgICAgICBudW1XaWRlQmFycyA9IG51bUNvdW50ZXJzLFxyXG4gICAgICAgIHdpZGVCYXJXaWR0aCA9IDAsXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgcGF0dGVybixcclxuICAgICAgICBpO1xyXG5cclxuICAgIHdoaWxlIChudW1XaWRlQmFycyA+IDMpIHtcclxuICAgICAgICBtYXhOYXJyb3dXaWR0aCA9IHNlbGYuX2ZpbmROZXh0V2lkdGgoY291bnRlcnMsIG1heE5hcnJvd1dpZHRoKTtcclxuICAgICAgICBudW1XaWRlQmFycyA9IDA7XHJcbiAgICAgICAgcGF0dGVybiA9IDA7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG51bUNvdW50ZXJzOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50ZXJzW2ldID4gbWF4TmFycm93V2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIHBhdHRlcm4gfD0gMSA8PCAobnVtQ291bnRlcnMgLSAxIC0gaSk7XHJcbiAgICAgICAgICAgICAgICBudW1XaWRlQmFycysrO1xyXG4gICAgICAgICAgICAgICAgd2lkZUJhcldpZHRoICs9IGNvdW50ZXJzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobnVtV2lkZUJhcnMgPT09IDMpIHtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG51bUNvdW50ZXJzICYmIG51bVdpZGVCYXJzID4gMDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnRlcnNbaV0gPiBtYXhOYXJyb3dXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG51bVdpZGVCYXJzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChjb3VudGVyc1tpXSAqIDIpID49IHdpZGVCYXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwYXR0ZXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAtMTtcclxufTtcclxuXHJcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX2ZpbmRTdGFydCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KSxcclxuICAgICAgICBwYXR0ZXJuU3RhcnQgPSBvZmZzZXQsXHJcbiAgICAgICAgY291bnRlciA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBpc1doaXRlID0gZmFsc2UsXHJcbiAgICAgICAgaSxcclxuICAgICAgICBqLFxyXG4gICAgICAgIHdoaXRlU3BhY2VNdXN0U3RhcnQ7XHJcblxyXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBmaW5kIHN0YXJ0IHBhdHRlcm5cclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLl90b1BhdHRlcm4oY291bnRlcikgPT09IHNlbGYuQVNURVJJU0spIHtcclxuICAgICAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlTXVzdFN0YXJ0ID0gTWF0aC5mbG9vcihNYXRoLm1heCgwLCBwYXR0ZXJuU3RhcnQgLSAoKGkgLSBwYXR0ZXJuU3RhcnQpIC8gNCkpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5fbWF0Y2hSYW5nZSh3aGl0ZVNwYWNlTXVzdFN0YXJ0LCBwYXR0ZXJuU3RhcnQsIDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogcGF0dGVyblN0YXJ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHBhdHRlcm5TdGFydCArPSBjb3VudGVyWzBdICsgY291bnRlclsxXTtcclxuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgNzsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltqXSA9IGNvdW50ZXJbaiArIDJdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY291bnRlcls3XSA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyWzhdID0gMDtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MtLTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29kZTM5UmVhZGVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvY29kZV8zOV9yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgQ29kZTM5UmVhZGVyIGZyb20gJy4vY29kZV8zOV9yZWFkZXInO1xyXG5cclxuZnVuY3Rpb24gQ29kZTM5VklOUmVhZGVyKCkge1xyXG4gICAgQ29kZTM5UmVhZGVyLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbnZhciBwYXR0ZXJucyA9IHtcclxuICAgIElPUTogL1tJT1FdL2csXHJcbiAgICBBWjA5OiAvW0EtWjAtOV17MTd9L1xyXG59O1xyXG5cclxuQ29kZTM5VklOUmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ29kZTM5UmVhZGVyLnByb3RvdHlwZSk7XHJcbkNvZGUzOVZJTlJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb2RlMzlWSU5SZWFkZXI7XHJcblxyXG4vLyBDcmliYmVkIGZyb206XHJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96eGluZy96eGluZy9ibG9iL21hc3Rlci9jb3JlL3NyYy9tYWluL2phdmEvY29tL2dvb2dsZS96eGluZy9jbGllbnQvcmVzdWx0L1ZJTlJlc3VsdFBhcnNlci5qYXZhXHJcbkNvZGUzOVZJTlJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHJlc3VsdCA9IENvZGUzOVJlYWRlci5wcm90b3R5cGUuX2RlY29kZS5hcHBseSh0aGlzKTtcclxuICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNvZGUgPSByZXN1bHQuY29kZTtcclxuXHJcbiAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKHBhdHRlcm5zLklPUSwgJycpO1xyXG5cclxuICAgIGlmICghY29kZS5tYXRjaChwYXR0ZXJucy5BWjA5KSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgQVowOSBwYXR0ZXJuIGNvZGU6JywgY29kZSk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLl9jaGVja0NoZWNrc3VtKGNvZGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdWx0LmNvZGUgPSBjb2RlO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbkNvZGUzOVZJTlJlYWRlci5wcm90b3R5cGUuX2NoZWNrQ2hlY2tzdW0gPSBmdW5jdGlvbihjb2RlKSB7XHJcbiAgICAvLyBUT0RPXHJcbiAgICByZXR1cm4gISFjb2RlO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29kZTM5VklOUmVhZGVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvY29kZV8zOV92aW5fcmVhZGVyLmpzXG4gKiovIiwiaW1wb3J0IEJhcmNvZGVSZWFkZXIgZnJvbSAnLi9iYXJjb2RlX3JlYWRlcic7XHJcblxyXG5mdW5jdGlvbiBDb2RhYmFyUmVhZGVyKCkge1xyXG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMpO1xyXG4gICAgdGhpcy5fY291bnRlcnMgPSBbXTtcclxufVxyXG5cclxudmFyIHByb3BlcnRpZXMgPSB7XHJcbiAgICBBTFBIQUJFVEhfU1RSSU5HOiB7dmFsdWU6IFwiMDEyMzQ1Njc4OS0kOi8uK0FCQ0RcIn0sXHJcbiAgICBBTFBIQUJFVDoge3ZhbHVlOiBbNDgsIDQ5LCA1MCwgNTEsIDUyLCA1MywgNTQsIDU1LCA1NiwgNTcsIDQ1LCAzNiwgNTgsIDQ3LCA0NiwgNDMsIDY1LCA2NiwgNjcsIDY4XX0sXHJcbiAgICBDSEFSQUNURVJfRU5DT0RJTkdTOiB7dmFsdWU6IFsweDAwMywgMHgwMDYsIDB4MDA5LCAweDA2MCwgMHgwMTIsIDB4MDQyLCAweDAyMSwgMHgwMjQsIDB4MDMwLCAweDA0OCwgMHgwMGMsIDB4MDE4LFxyXG4gICAgICAgIDB4MDQ1LCAweDA1MSwgMHgwNTQsIDB4MDE1LCAweDAxQSwgMHgwMjksIDB4MDBCLCAweDAwRV19LFxyXG4gICAgU1RBUlRfRU5EOiB7dmFsdWU6IFsweDAxQSwgMHgwMjksIDB4MDBCLCAweDAwRV19LFxyXG4gICAgTUlOX0VOQ09ERURfQ0hBUlM6IHt2YWx1ZTogNH0sXHJcbiAgICBNQVhfQUNDRVBUQUJMRToge3ZhbHVlOiAyLjB9LFxyXG4gICAgUEFERElORzoge3ZhbHVlOiAxLjV9LFxyXG4gICAgRk9STUFUOiB7dmFsdWU6IFwiY29kYWJhclwiLCB3cml0ZWFibGU6IGZhbHNlfVxyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb2RhYmFyUmVhZGVyO1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIHJlc3VsdCA9IFtdLFxyXG4gICAgICAgIHN0YXJ0LFxyXG4gICAgICAgIGRlY29kZWRDaGFyLFxyXG4gICAgICAgIHBhdHRlcm4sXHJcbiAgICAgICAgbmV4dFN0YXJ0LFxyXG4gICAgICAgIGVuZDtcclxuXHJcbiAgICB0aGlzLl9jb3VudGVycyA9IHNlbGYuX2ZpbGxDb3VudGVycygpO1xyXG4gICAgc3RhcnQgPSBzZWxmLl9maW5kU3RhcnQoKTtcclxuICAgIGlmICghc3RhcnQpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIG5leHRTdGFydCA9IHN0YXJ0LnN0YXJ0Q291bnRlcjtcclxuXHJcbiAgICBkbyB7XHJcbiAgICAgICAgcGF0dGVybiA9IHNlbGYuX3RvUGF0dGVybihuZXh0U3RhcnQpO1xyXG4gICAgICAgIGlmIChwYXR0ZXJuIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVjb2RlZENoYXIgPSBzZWxmLl9wYXR0ZXJuVG9DaGFyKHBhdHRlcm4pO1xyXG4gICAgICAgIGlmIChkZWNvZGVkQ2hhciA8IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0LnB1c2goZGVjb2RlZENoYXIpO1xyXG4gICAgICAgIG5leHRTdGFydCArPSA4O1xyXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMSAmJiBzZWxmLl9pc1N0YXJ0RW5kKHBhdHRlcm4pKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0gd2hpbGUgKG5leHRTdGFydCA8IHNlbGYuX2NvdW50ZXJzLmxlbmd0aCk7XHJcblxyXG4gICAgLy8gdmVyaWZ5IGVuZFxyXG4gICAgaWYgKChyZXN1bHQubGVuZ3RoIC0gMikgPCBzZWxmLk1JTl9FTkNPREVEX0NIQVJTIHx8ICFzZWxmLl9pc1N0YXJ0RW5kKHBhdHRlcm4pKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdmVyaWZ5IGVuZCB3aGl0ZSBzcGFjZVxyXG4gICAgaWYgKCFzZWxmLl92ZXJpZnlXaGl0ZXNwYWNlKHN0YXJ0LnN0YXJ0Q291bnRlciwgbmV4dFN0YXJ0IC0gOCkpe1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghc2VsZi5fdmFsaWRhdGVSZXN1bHQocmVzdWx0LCBzdGFydC5zdGFydENvdW50ZXIpKXtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBuZXh0U3RhcnQgPSBuZXh0U3RhcnQgPiBzZWxmLl9jb3VudGVycy5sZW5ndGggPyBzZWxmLl9jb3VudGVycy5sZW5ndGggOiBuZXh0U3RhcnQ7XHJcbiAgICBlbmQgPSBzdGFydC5zdGFydCArIHNlbGYuX3N1bUNvdW50ZXJzKHN0YXJ0LnN0YXJ0Q291bnRlciwgbmV4dFN0YXJ0IC0gOCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcclxuICAgICAgICBzdGFydDogc3RhcnQuc3RhcnQsXHJcbiAgICAgICAgZW5kOiBlbmQsXHJcbiAgICAgICAgc3RhcnRJbmZvOiBzdGFydCxcclxuICAgICAgICBkZWNvZGVkQ29kZXM6IHJlc3VsdFxyXG4gICAgfTtcclxufTtcclxuXHJcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlXaGl0ZXNwYWNlID0gZnVuY3Rpb24oc3RhcnRDb3VudGVyLCBlbmRDb3VudGVyKSB7XHJcbiAgICBpZiAoKHN0YXJ0Q291bnRlciAtIDEgPD0gMClcclxuICAgICAgICAgICAgfHwgdGhpcy5fY291bnRlcnNbc3RhcnRDb3VudGVyIC0gMV0gPj0gKHRoaXMuX2NhbGN1bGF0ZVBhdHRlcm5MZW5ndGgoc3RhcnRDb3VudGVyKSAvIDIuMCkpIHtcclxuICAgICAgICBpZiAoKGVuZENvdW50ZXIgKyA4ID49IHRoaXMuX2NvdW50ZXJzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHx8IHRoaXMuX2NvdW50ZXJzW2VuZENvdW50ZXIgKyA3XSA+PSAodGhpcy5fY2FsY3VsYXRlUGF0dGVybkxlbmd0aChlbmRDb3VudGVyKSAvIDIuMCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2NhbGN1bGF0ZVBhdHRlcm5MZW5ndGggPSBmdW5jdGlvbihvZmZzZXQpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIHN1bSA9IDA7XHJcblxyXG4gICAgZm9yIChpID0gb2Zmc2V0OyBpIDwgb2Zmc2V0ICsgNzsgaSsrKSB7XHJcbiAgICAgICAgc3VtICs9IHRoaXMuX2NvdW50ZXJzW2ldO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdW07XHJcbn07XHJcblxyXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fdGhyZXNob2xkUmVzdWx0UGF0dGVybiA9IGZ1bmN0aW9uKHJlc3VsdCwgc3RhcnRDb3VudGVyKXtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBjYXRlZ29yaXphdGlvbiA9IHtcclxuICAgICAgICAgICAgc3BhY2U6IHtcclxuICAgICAgICAgICAgICAgIG5hcnJvdzogeyBzaXplOiAwLCBjb3VudHM6IDAsIG1pbjogMCwgbWF4OiBOdW1iZXIuTUFYX1ZBTFVFfSxcclxuICAgICAgICAgICAgICAgIHdpZGU6IHtzaXplOiAwLCBjb3VudHM6IDAsIG1pbjogMCwgbWF4OiBOdW1iZXIuTUFYX1ZBTFVFfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBiYXI6IHtcclxuICAgICAgICAgICAgICAgIG5hcnJvdzogeyBzaXplOiAwLCBjb3VudHM6IDAsIG1pbjogMCwgbWF4OiBOdW1iZXIuTUFYX1ZBTFVFfSxcclxuICAgICAgICAgICAgICAgIHdpZGU6IHsgc2l6ZTogMCwgY291bnRzOiAwLCBtaW46IDAsIG1heDogTnVtYmVyLk1BWF9WQUxVRX1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAga2luZCxcclxuICAgICAgICBjYXQsXHJcbiAgICAgICAgaSxcclxuICAgICAgICBqLFxyXG4gICAgICAgIHBvcyA9IHN0YXJ0Q291bnRlcixcclxuICAgICAgICBwYXR0ZXJuO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIHBhdHRlcm4gPSBzZWxmLl9jaGFyVG9QYXR0ZXJuKHJlc3VsdFtpXSk7XHJcbiAgICAgICAgZm9yIChqID0gNjsgaiA+PSAwOyBqLS0pIHtcclxuICAgICAgICAgICAga2luZCA9IChqICYgMSkgPT09IDIgPyBjYXRlZ29yaXphdGlvbi5iYXIgOiBjYXRlZ29yaXphdGlvbi5zcGFjZTtcclxuICAgICAgICAgICAgY2F0ID0gKHBhdHRlcm4gJiAxKSA9PT0gMSA/IGtpbmQud2lkZSA6IGtpbmQubmFycm93O1xyXG4gICAgICAgICAgICBjYXQuc2l6ZSArPSBzZWxmLl9jb3VudGVyc1twb3MgKyBqXTtcclxuICAgICAgICAgICAgY2F0LmNvdW50cysrO1xyXG4gICAgICAgICAgICBwYXR0ZXJuID4+PSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwb3MgKz0gODtcclxuICAgIH1cclxuXHJcbiAgICBbXCJzcGFjZVwiLCBcImJhclwiXS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgIHZhciBuZXdraW5kID0gY2F0ZWdvcml6YXRpb25ba2V5XTtcclxuICAgICAgICBuZXdraW5kLndpZGUubWluID1cclxuICAgICAgICAgICAgTWF0aC5mbG9vcigobmV3a2luZC5uYXJyb3cuc2l6ZSAvIG5ld2tpbmQubmFycm93LmNvdW50cyArIG5ld2tpbmQud2lkZS5zaXplIC8gbmV3a2luZC53aWRlLmNvdW50cykgLyAyKTtcclxuICAgICAgICBuZXdraW5kLm5hcnJvdy5tYXggPSBNYXRoLmNlaWwobmV3a2luZC53aWRlLm1pbik7XHJcbiAgICAgICAgbmV3a2luZC53aWRlLm1heCA9IE1hdGguY2VpbCgobmV3a2luZC53aWRlLnNpemUgKiBzZWxmLk1BWF9BQ0NFUFRBQkxFICsgc2VsZi5QQURESU5HKSAvIG5ld2tpbmQud2lkZS5jb3VudHMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGNhdGVnb3JpemF0aW9uO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2NoYXJUb1BhdHRlcm4gPSBmdW5jdGlvbihjaGFyKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgY2hhckNvZGUgPSBjaGFyLmNoYXJDb2RlQXQoMCksXHJcbiAgICAgICAgaTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgc2VsZi5BTFBIQUJFVC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLkFMUEhBQkVUW2ldID09PSBjaGFyQ29kZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1NbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDB4MDtcclxufTtcclxuXHJcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl92YWxpZGF0ZVJlc3VsdCA9IGZ1bmN0aW9uKHJlc3VsdCwgc3RhcnRDb3VudGVyKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgdGhyZXNob2xkcyA9IHNlbGYuX3RocmVzaG9sZFJlc3VsdFBhdHRlcm4ocmVzdWx0LCBzdGFydENvdW50ZXIpLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgaixcclxuICAgICAgICBraW5kLFxyXG4gICAgICAgIGNhdCxcclxuICAgICAgICBzaXplLFxyXG4gICAgICAgIHBvcyA9IHN0YXJ0Q291bnRlcixcclxuICAgICAgICBwYXR0ZXJuO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwYXR0ZXJuID0gc2VsZi5fY2hhclRvUGF0dGVybihyZXN1bHRbaV0pO1xyXG4gICAgICAgIGZvciAoaiA9IDY7IGogPj0gMDsgai0tKSB7XHJcbiAgICAgICAgICAgIGtpbmQgPSAoaiAmIDEpID09PSAwID8gdGhyZXNob2xkcy5iYXIgOiB0aHJlc2hvbGRzLnNwYWNlO1xyXG4gICAgICAgICAgICBjYXQgPSAocGF0dGVybiAmIDEpID09PSAxID8ga2luZC53aWRlIDoga2luZC5uYXJyb3c7XHJcbiAgICAgICAgICAgIHNpemUgPSBzZWxmLl9jb3VudGVyc1twb3MgKyBqXTtcclxuICAgICAgICAgICAgaWYgKHNpemUgPCBjYXQubWluIHx8IHNpemUgPiBjYXQubWF4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGF0dGVybiA+Pj0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcG9zICs9IDg7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl9wYXR0ZXJuVG9DaGFyID0gZnVuY3Rpb24ocGF0dGVybikge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHNlbGYuQ0hBUkFDVEVSX0VOQ09ESU5HUy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1NbaV0gPT09IHBhdHRlcm4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoc2VsZi5BTFBIQUJFVFtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2NvbXB1dGVBbHRlcm5hdGluZ1RocmVzaG9sZCA9IGZ1bmN0aW9uKG9mZnNldCwgZW5kKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBtaW4gPSBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgIG1heCA9IDAsXHJcbiAgICAgICAgY291bnRlcjtcclxuXHJcbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBlbmQ7IGkgKz0gMil7XHJcbiAgICAgICAgY291bnRlciA9IHRoaXMuX2NvdW50ZXJzW2ldO1xyXG4gICAgICAgIGlmIChjb3VudGVyID4gbWF4KSB7XHJcbiAgICAgICAgICAgIG1heCA9IGNvdW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb3VudGVyIDwgbWluKSB7XHJcbiAgICAgICAgICAgIG1pbiA9IGNvdW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoKG1pbiArIG1heCkgLyAyLjApIHwgMDtcclxufTtcclxuXHJcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl90b1BhdHRlcm4gPSBmdW5jdGlvbihvZmZzZXQpIHtcclxuICAgIHZhciBudW1Db3VudGVycyA9IDcsXHJcbiAgICAgICAgZW5kID0gb2Zmc2V0ICsgbnVtQ291bnRlcnMsXHJcbiAgICAgICAgYmFyVGhyZXNob2xkLFxyXG4gICAgICAgIHNwYWNlVGhyZXNob2xkLFxyXG4gICAgICAgIGJpdG1hc2sgPSAxIDw8IChudW1Db3VudGVycyAtIDEpLFxyXG4gICAgICAgIHBhdHRlcm4gPSAwLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgdGhyZXNob2xkO1xyXG5cclxuICAgIGlmIChlbmQgPiB0aGlzLl9jb3VudGVycy5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgYmFyVGhyZXNob2xkID0gdGhpcy5fY29tcHV0ZUFsdGVybmF0aW5nVGhyZXNob2xkKG9mZnNldCwgZW5kKTtcclxuICAgIHNwYWNlVGhyZXNob2xkID0gdGhpcy5fY29tcHV0ZUFsdGVybmF0aW5nVGhyZXNob2xkKG9mZnNldCArIDEsIGVuZCk7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IG51bUNvdW50ZXJzOyBpKyspe1xyXG4gICAgICAgIHRocmVzaG9sZCA9IChpICYgMSkgPT09IDAgPyBiYXJUaHJlc2hvbGQgOiBzcGFjZVRocmVzaG9sZDtcclxuICAgICAgICBpZiAodGhpcy5fY291bnRlcnNbb2Zmc2V0ICsgaV0gPiB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgcGF0dGVybiB8PSBiaXRtYXNrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBiaXRtYXNrID4+PSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwYXR0ZXJuO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2lzU3RhcnRFbmQgPSBmdW5jdGlvbihwYXR0ZXJuKSB7XHJcbiAgICB2YXIgaTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5TVEFSVF9FTkQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcy5TVEFSVF9FTkRbaV0gPT09IHBhdHRlcm4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX3N1bUNvdW50ZXJzID0gZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc3VtID0gMDtcclxuXHJcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XHJcbiAgICAgICAgc3VtICs9IHRoaXMuX2NvdW50ZXJzW2ldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1bTtcclxufTtcclxuXHJcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl9maW5kU3RhcnQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBpLFxyXG4gICAgICAgIHBhdHRlcm4sXHJcbiAgICAgICAgc3RhcnQgPSBzZWxmLl9uZXh0VW5zZXQoc2VsZi5fcm93KSxcclxuICAgICAgICBlbmQ7XHJcblxyXG4gICAgZm9yIChpID0gMTsgaSA8IHRoaXMuX2NvdW50ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcGF0dGVybiA9IHNlbGYuX3RvUGF0dGVybihpKTtcclxuICAgICAgICBpZiAocGF0dGVybiAhPT0gLTEgJiYgc2VsZi5faXNTdGFydEVuZChwYXR0ZXJuKSkge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBMb29rIGZvciB3aGl0ZXNwYWNlIGFoZWFkXHJcbiAgICAgICAgICAgIHN0YXJ0ICs9IHNlbGYuX3N1bUNvdW50ZXJzKDAsIGkpO1xyXG4gICAgICAgICAgICBlbmQgPSBzdGFydCArIHNlbGYuX3N1bUNvdW50ZXJzKGksIGkgKyA4KTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcclxuICAgICAgICAgICAgICAgIGVuZDogZW5kLFxyXG4gICAgICAgICAgICAgICAgc3RhcnRDb3VudGVyOiBpLFxyXG4gICAgICAgICAgICAgICAgZW5kQ291bnRlcjogaSArIDhcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb2RhYmFyUmVhZGVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvY29kYWJhcl9yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgRUFOUmVhZGVyIGZyb20gJy4vZWFuX3JlYWRlcic7XHJcblxyXG5mdW5jdGlvbiBVUENSZWFkZXIoKSB7XHJcbiAgICBFQU5SZWFkZXIuY2FsbCh0aGlzKTtcclxufVxyXG5cclxudmFyIHByb3BlcnRpZXMgPSB7XHJcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJ1cGNfYVwiLCB3cml0ZWFibGU6IGZhbHNlfVxyXG59O1xyXG5cclxuVVBDUmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRUFOUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XHJcblVQQ1JlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBVUENSZWFkZXI7XHJcblxyXG5VUENSZWFkZXIucHJvdG90eXBlLl9kZWNvZGUgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciByZXN1bHQgPSBFQU5SZWFkZXIucHJvdG90eXBlLl9kZWNvZGUuY2FsbCh0aGlzKTtcclxuXHJcbiAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5jb2RlICYmIHJlc3VsdC5jb2RlLmxlbmd0aCA9PT0gMTMgJiYgcmVzdWx0LmNvZGUuY2hhckF0KDApID09PSBcIjBcIikge1xyXG4gICAgICAgIHJlc3VsdC5jb2RlID0gcmVzdWx0LmNvZGUuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVQQ1JlYWRlcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL3VwY19yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgRUFOUmVhZGVyIGZyb20gJy4vZWFuX3JlYWRlcic7XHJcblxyXG5mdW5jdGlvbiBFQU44UmVhZGVyKCkge1xyXG4gICAgRUFOUmVhZGVyLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbnZhciBwcm9wZXJ0aWVzID0ge1xyXG4gICAgRk9STUFUOiB7dmFsdWU6IFwiZWFuXzhcIiwgd3JpdGVhYmxlOiBmYWxzZX1cclxufTtcclxuXHJcbkVBTjhSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFQU5SZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcclxuRUFOOFJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFQU44UmVhZGVyO1xyXG5cclxuRUFOOFJlYWRlci5wcm90b3R5cGUuX2RlY29kZVBheWxvYWQgPSBmdW5jdGlvbihjb2RlLCByZXN1bHQsIGRlY29kZWRDb2Rlcykge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb2RlLmVuZCwgc2VsZi5DT0RFX0dfU1RBUlQpO1xyXG4gICAgICAgIGlmICghY29kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0LnB1c2goY29kZS5jb2RlKTtcclxuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb2RlID0gc2VsZi5fZmluZFBhdHRlcm4oc2VsZi5NSURETEVfUEFUVEVSTiwgY29kZS5lbmQsIHRydWUsIGZhbHNlKTtcclxuICAgIGlmIChjb2RlID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kLCBzZWxmLkNPREVfR19TVEFSVCk7XHJcbiAgICAgICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb2RlO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRUFOOFJlYWRlcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL2Vhbl84X3JlYWRlci5qc1xuICoqLyIsImltcG9ydCBFQU5SZWFkZXIgZnJvbSAnLi9lYW5fcmVhZGVyJztcclxuXHJcbmZ1bmN0aW9uIFVQQ0VSZWFkZXIoKSB7XHJcbiAgICBFQU5SZWFkZXIuY2FsbCh0aGlzKTtcclxufVxyXG5cclxudmFyIHByb3BlcnRpZXMgPSB7XHJcbiAgICBDT0RFX0ZSRVFVRU5DWToge3ZhbHVlOiBbXHJcbiAgICAgICAgWyA1NiwgNTIsIDUwLCA0OSwgNDQsIDM4LCAzNSwgNDIsIDQxLCAzNyBdLFxyXG4gICAgICAgIFs3LCAxMSwgMTMsIDE0LCAxOSwgMjUsIDI4LCAyMSwgMjIsIDI2XV19LFxyXG4gICAgU1RPUF9QQVRURVJOOiB7IHZhbHVlOiBbMSAvIDYgKiA3LCAxIC8gNiAqIDcsIDEgLyA2ICogNywgMSAvIDYgKiA3LCAxIC8gNiAqIDcsIDEgLyA2ICogN119LFxyXG4gICAgRk9STUFUOiB7dmFsdWU6IFwidXBjX2VcIiwgd3JpdGVhYmxlOiBmYWxzZX1cclxufTtcclxuXHJcblVQQ0VSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFQU5SZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcclxuVVBDRVJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBVUENFUmVhZGVyO1xyXG5cclxuVVBDRVJlYWRlci5wcm90b3R5cGUuX2RlY29kZVBheWxvYWQgPSBmdW5jdGlvbihjb2RlLCByZXN1bHQsIGRlY29kZWRDb2Rlcykge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgY29kZUZyZXF1ZW5jeSA9IDB4MDtcclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kKTtcclxuICAgICAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb2RlLmNvZGUgPj0gc2VsZi5DT0RFX0dfU1RBUlQpIHtcclxuICAgICAgICAgICAgY29kZS5jb2RlID0gY29kZS5jb2RlIC0gc2VsZi5DT0RFX0dfU1RBUlQ7XHJcbiAgICAgICAgICAgIGNvZGVGcmVxdWVuY3kgfD0gMSA8PCAoNSAtIGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUpO1xyXG4gICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFzZWxmLl9kZXRlcm1pbmVQYXJpdHkoY29kZUZyZXF1ZW5jeSwgcmVzdWx0KSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb2RlO1xyXG59O1xyXG5cclxuVVBDRVJlYWRlci5wcm90b3R5cGUuX2RldGVybWluZVBhcml0eSA9IGZ1bmN0aW9uKGNvZGVGcmVxdWVuY3ksIHJlc3VsdCkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgbnJTeXN0ZW07XHJcblxyXG4gICAgZm9yIChuclN5c3RlbSA9IDA7IG5yU3lzdGVtIDwgdGhpcy5DT0RFX0ZSRVFVRU5DWS5sZW5ndGg7IG5yU3lzdGVtKyspe1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgdGhpcy5DT0RFX0ZSRVFVRU5DWVtuclN5c3RlbV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGNvZGVGcmVxdWVuY3kgPT09IHRoaXMuQ09ERV9GUkVRVUVOQ1lbbnJTeXN0ZW1dW2ldKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQudW5zaGlmdChuclN5c3RlbSk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuVVBDRVJlYWRlci5wcm90b3R5cGUuX2NvbnZlcnRUb1VQQ0EgPSBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgIHZhciB1cGNhID0gW3Jlc3VsdFswXV0sXHJcbiAgICAgICAgbGFzdERpZ2l0ID0gcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAyXTtcclxuXHJcbiAgICBpZiAobGFzdERpZ2l0IDw9IDIpIHtcclxuICAgICAgICB1cGNhID0gdXBjYS5jb25jYXQocmVzdWx0LnNsaWNlKDEsIDMpKVxyXG4gICAgICAgICAgICAuY29uY2F0KFtsYXN0RGlnaXQsIDAsIDAsIDAsIDBdKVxyXG4gICAgICAgICAgICAuY29uY2F0KHJlc3VsdC5zbGljZSgzLCA2KSk7XHJcbiAgICB9IGVsc2UgaWYgKGxhc3REaWdpdCA9PT0gMykge1xyXG4gICAgICAgIHVwY2EgPSB1cGNhLmNvbmNhdChyZXN1bHQuc2xpY2UoMSwgNCkpXHJcbiAgICAgICAgICAgIC5jb25jYXQoWzAsIDAsIDAsIDAsIDBdKVxyXG4gICAgICAgICAgICAuY29uY2F0KHJlc3VsdC5zbGljZSg0LCA2KSk7XHJcbiAgICB9IGVsc2UgaWYgKGxhc3REaWdpdCA9PT0gNCkge1xyXG4gICAgICAgIHVwY2EgPSB1cGNhLmNvbmNhdChyZXN1bHQuc2xpY2UoMSwgNSkpXHJcbiAgICAgICAgICAgIC5jb25jYXQoWzAsIDAsIDAsIDAsIDAsIHJlc3VsdFs1XV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB1cGNhID0gdXBjYS5jb25jYXQocmVzdWx0LnNsaWNlKDEsIDYpKVxyXG4gICAgICAgICAgICAuY29uY2F0KFswLCAwLCAwLCAwLCBsYXN0RGlnaXRdKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGNhLnB1c2gocmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXSk7XHJcbiAgICByZXR1cm4gdXBjYTtcclxufTtcclxuXHJcblVQQ0VSZWFkZXIucHJvdG90eXBlLl9jaGVja3N1bSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgcmV0dXJuIEVBTlJlYWRlci5wcm90b3R5cGUuX2NoZWNrc3VtLmNhbGwodGhpcywgdGhpcy5fY29udmVydFRvVVBDQShyZXN1bHQpKTtcclxufTtcclxuXHJcblVQQ0VSZWFkZXIucHJvdG90eXBlLl9maW5kRW5kID0gZnVuY3Rpb24ob2Zmc2V0LCBpc1doaXRlKSB7XHJcbiAgICBpc1doaXRlID0gdHJ1ZTtcclxuICAgIHJldHVybiBFQU5SZWFkZXIucHJvdG90eXBlLl9maW5kRW5kLmNhbGwodGhpcywgb2Zmc2V0LCBpc1doaXRlKTtcclxufTtcclxuXHJcblVQQ0VSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbihlbmRJbmZvKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kO1xyXG5cclxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IGVuZEluZm8uZW5kICsgKChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpIC8gMik7XHJcbiAgICBpZiAodHJhaWxpbmdXaGl0ZXNwYWNlRW5kIDwgc2VsZi5fcm93Lmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKGVuZEluZm8uZW5kLCB0cmFpbGluZ1doaXRlc3BhY2VFbmQsIDApKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVQQ0VSZWFkZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci91cGNfZV9yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgQmFyY29kZVJlYWRlciBmcm9tICcuL2JhcmNvZGVfcmVhZGVyJztcclxuY29uc3QgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L21lcmdlJyk7XHJcblxyXG5mdW5jdGlvbiBJMm9mNVJlYWRlcihvcHRzKSB7XHJcbiAgICBvcHRzID0gbWVyZ2UoZ2V0RGVmYXVsQ29uZmlnKCksIG9wdHMpO1xyXG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMsIG9wdHMpO1xyXG4gICAgdGhpcy5iYXJTcGFjZVJhdGlvID0gWzEsIDFdO1xyXG4gICAgaWYgKG9wdHMubm9ybWFsaXplQmFyU3BhY2VXaWR0aCkge1xyXG4gICAgICAgIHRoaXMuU0lOR0xFX0NPREVfRVJST1IgPSAwLjM4O1xyXG4gICAgICAgIHRoaXMuQVZHX0NPREVfRVJST1IgPSAwLjA5O1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREZWZhdWxDb25maWcoKSB7XHJcbiAgICB2YXIgY29uZmlnID0ge307XHJcblxyXG4gICAgT2JqZWN0LmtleXMoSTJvZjVSZWFkZXIuQ09ORklHX0tFWVMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgY29uZmlnW2tleV0gPSBJMm9mNVJlYWRlci5DT05GSUdfS0VZU1trZXldLmRlZmF1bHQ7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBjb25maWc7XHJcbn1cclxuXHJcbnZhciBOID0gMSxcclxuICAgIFcgPSAzLFxyXG4gICAgcHJvcGVydGllcyA9IHtcclxuICAgICAgICBNT0RVTE86IHt2YWx1ZTogMTB9LFxyXG4gICAgICAgIFNUQVJUX1BBVFRFUk46IHt2YWx1ZTogW04gKiAyLjUsIE4gKiAyLjUsIE4gKiAyLjUsIE4gKiAyLjVdfSxcclxuICAgICAgICBTVE9QX1BBVFRFUk46IHt2YWx1ZTogW04gKiAyLCBOICogMiwgVyAqIDJdfSxcclxuICAgICAgICBDT0RFX1BBVFRFUk46IHt2YWx1ZTogW1xyXG4gICAgICAgICAgICBbTiwgTiwgVywgVywgTl0sXHJcbiAgICAgICAgICAgIFtXLCBOLCBOLCBOLCBXXSxcclxuICAgICAgICAgICAgW04sIFcsIE4sIE4sIFddLFxyXG4gICAgICAgICAgICBbVywgVywgTiwgTiwgTl0sXHJcbiAgICAgICAgICAgIFtOLCBOLCBXLCBOLCBXXSxcclxuICAgICAgICAgICAgW1csIE4sIFcsIE4sIE5dLFxyXG4gICAgICAgICAgICBbTiwgVywgVywgTiwgTl0sXHJcbiAgICAgICAgICAgIFtOLCBOLCBOLCBXLCBXXSxcclxuICAgICAgICAgICAgW1csIE4sIE4sIFcsIE5dLFxyXG4gICAgICAgICAgICBbTiwgVywgTiwgVywgTl1cclxuICAgICAgICBdfSxcclxuICAgICAgICBTSU5HTEVfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjc4LCB3cml0YWJsZTogdHJ1ZX0sXHJcbiAgICAgICAgQVZHX0NPREVfRVJST1I6IHt2YWx1ZTogMC4zOCwgd3JpdGFibGU6IHRydWV9LFxyXG4gICAgICAgIE1BWF9DT1JSRUNUSU9OX0ZBQ1RPUjoge3ZhbHVlOiA1fSxcclxuICAgICAgICBGT1JNQVQ6IHt2YWx1ZTogXCJpMm9mNVwifVxyXG4gICAgfTtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFyY29kZVJlYWRlci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBJMm9mNVJlYWRlcjtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hQYXR0ZXJuID0gZnVuY3Rpb24oY291bnRlciwgY29kZSkge1xyXG4gICAgaWYgKHRoaXMuY29uZmlnLm5vcm1hbGl6ZUJhclNwYWNlV2lkdGgpIHtcclxuICAgICAgICB2YXIgaSxcclxuICAgICAgICAgICAgY291bnRlclN1bSA9IFswLCAwXSxcclxuICAgICAgICAgICAgY29kZVN1bSA9IFswLCAwXSxcclxuICAgICAgICAgICAgY29ycmVjdGlvbiA9IFswLCAwXSxcclxuICAgICAgICAgICAgY29ycmVjdGlvblJhdGlvID0gdGhpcy5NQVhfQ09SUkVDVElPTl9GQUNUT1IsXHJcbiAgICAgICAgICAgIGNvcnJlY3Rpb25SYXRpb0ludmVyc2UgPSAxIC8gY29ycmVjdGlvblJhdGlvO1xyXG5cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb3VudGVyU3VtW2kgJSAyXSArPSBjb3VudGVyW2ldO1xyXG4gICAgICAgICAgICBjb2RlU3VtW2kgJSAyXSArPSBjb2RlW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb3JyZWN0aW9uWzBdID0gY29kZVN1bVswXSAvIGNvdW50ZXJTdW1bMF07XHJcbiAgICAgICAgY29ycmVjdGlvblsxXSA9IGNvZGVTdW1bMV0gLyBjb3VudGVyU3VtWzFdO1xyXG5cclxuICAgICAgICBjb3JyZWN0aW9uWzBdID0gTWF0aC5tYXgoTWF0aC5taW4oY29ycmVjdGlvblswXSwgY29ycmVjdGlvblJhdGlvKSwgY29ycmVjdGlvblJhdGlvSW52ZXJzZSk7XHJcbiAgICAgICAgY29ycmVjdGlvblsxXSA9IE1hdGgubWF4KE1hdGgubWluKGNvcnJlY3Rpb25bMV0sIGNvcnJlY3Rpb25SYXRpbyksIGNvcnJlY3Rpb25SYXRpb0ludmVyc2UpO1xyXG4gICAgICAgIHRoaXMuYmFyU3BhY2VSYXRpbyA9IGNvcnJlY3Rpb247XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY291bnRlcltpXSAqPSB0aGlzLmJhclNwYWNlUmF0aW9baSAlIDJdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBCYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hQYXR0ZXJuLmNhbGwodGhpcywgY291bnRlciwgY29kZSk7XHJcbn07XHJcblxyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2ZpbmRQYXR0ZXJuID0gZnVuY3Rpb24ocGF0dGVybiwgb2Zmc2V0LCBpc1doaXRlLCB0cnlIYXJkZXIpIHtcclxuICAgIHZhciBjb3VudGVyID0gW10sXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgaSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IDAsXHJcbiAgICAgICAgICAgIGVuZDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgaixcclxuICAgICAgICBzdW0sXHJcbiAgICAgICAgbm9ybWFsaXplZCxcclxuICAgICAgICBlcHNpbG9uID0gc2VsZi5BVkdfQ09ERV9FUlJPUjtcclxuXHJcbiAgICBpc1doaXRlID0gaXNXaGl0ZSB8fCBmYWxzZTtcclxuICAgIHRyeUhhcmRlciA9IHRyeUhhcmRlciB8fCBmYWxzZTtcclxuXHJcbiAgICBpZiAoIW9mZnNldCkge1xyXG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IHBhdHRlcm4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb3VudGVyW2ldID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBjb3VudGVyLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHN1bSA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IGNvdW50ZXIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gY291bnRlcltqXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWQgPSBzZWxmLl9ub3JtYWxpemUoY291bnRlcik7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKG5vcm1hbGl6ZWQsIHBhdHRlcm4pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBlcHNpbG9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guc3RhcnQgPSBpIC0gc3VtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZW5kID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJlc3RNYXRjaDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodHJ5SGFyZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGNvdW50ZXIubGVuZ3RoIC0gMjsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbal0gPSBjb3VudGVyW2ogKyAyXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyLmxlbmd0aCAtIDJdID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXIubGVuZ3RoIC0gMV0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MtLTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XHJcbiAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fZmluZFN0YXJ0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgbGVhZGluZ1doaXRlc3BhY2VTdGFydCxcclxuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3JvdyksXHJcbiAgICAgICAgc3RhcnRJbmZvLFxyXG4gICAgICAgIG5hcnJvd0JhcldpZHRoID0gMTtcclxuXHJcbiAgICB3aGlsZSAoIXN0YXJ0SW5mbykge1xyXG4gICAgICAgIHN0YXJ0SW5mbyA9IHNlbGYuX2ZpbmRQYXR0ZXJuKHNlbGYuU1RBUlRfUEFUVEVSTiwgb2Zmc2V0LCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgaWYgKCFzdGFydEluZm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5hcnJvd0JhcldpZHRoID0gTWF0aC5mbG9vcigoc3RhcnRJbmZvLmVuZCAtIHN0YXJ0SW5mby5zdGFydCkgLyA0KTtcclxuICAgICAgICBsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0ID0gc3RhcnRJbmZvLnN0YXJ0IC0gbmFycm93QmFyV2lkdGggKiAxMDtcclxuICAgICAgICBpZiAobGVhZGluZ1doaXRlc3BhY2VTdGFydCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQsIHN0YXJ0SW5mby5zdGFydCwgMCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGFydEluZm87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgb2Zmc2V0ID0gc3RhcnRJbmZvLmVuZDtcclxuICAgICAgICBzdGFydEluZm8gPSBudWxsO1xyXG4gICAgfVxyXG59O1xyXG5cclxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbihlbmRJbmZvKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kO1xyXG5cclxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IGVuZEluZm8uZW5kICsgKChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpIC8gMik7XHJcbiAgICBpZiAodHJhaWxpbmdXaGl0ZXNwYWNlRW5kIDwgc2VsZi5fcm93Lmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKGVuZEluZm8uZW5kLCB0cmFpbGluZ1doaXRlc3BhY2VFbmQsIDApKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9maW5kRW5kID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgZW5kSW5mbyxcclxuICAgICAgICB0bXA7XHJcblxyXG4gICAgc2VsZi5fcm93LnJldmVyc2UoKTtcclxuICAgIGVuZEluZm8gPSBzZWxmLl9maW5kUGF0dGVybihzZWxmLlNUT1BfUEFUVEVSTik7XHJcbiAgICBzZWxmLl9yb3cucmV2ZXJzZSgpO1xyXG5cclxuICAgIGlmIChlbmRJbmZvID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmV2ZXJzZSBudW1iZXJzXHJcbiAgICB0bXAgPSBlbmRJbmZvLnN0YXJ0O1xyXG4gICAgZW5kSW5mby5zdGFydCA9IHNlbGYuX3Jvdy5sZW5ndGggLSBlbmRJbmZvLmVuZDtcclxuICAgIGVuZEluZm8uZW5kID0gc2VsZi5fcm93Lmxlbmd0aCAtIHRtcDtcclxuXHJcbiAgICByZXR1cm4gZW5kSW5mbyAhPT0gbnVsbCA/IHNlbGYuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZShlbmRJbmZvKSA6IG51bGw7XHJcbn07XHJcblxyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2RlY29kZVBhaXIgPSBmdW5jdGlvbihjb3VudGVyUGFpcikge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgY29kZSxcclxuICAgICAgICBjb2RlcyA9IFtdLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVyUGFpci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvdW50ZXJQYWlyW2ldKTtcclxuICAgICAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvZGVzLnB1c2goY29kZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29kZXM7XHJcbn07XHJcblxyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2RlY29kZUNvZGUgPSBmdW5jdGlvbihjb3VudGVyKSB7XHJcbiAgICB2YXIgaixcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBzdW0gPSAwLFxyXG4gICAgICAgIG5vcm1hbGl6ZWQsXHJcbiAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgZXBzaWxvbiA9IHNlbGYuQVZHX0NPREVfRVJST1IsXHJcbiAgICAgICAgY29kZSxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IDAsXHJcbiAgICAgICAgICAgIGVuZDogMFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgZm9yICggaiA9IDA7IGogPCBjb3VudGVyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgc3VtICs9IGNvdW50ZXJbal07XHJcbiAgICB9XHJcbiAgICBub3JtYWxpemVkID0gc2VsZi5fbm9ybWFsaXplKGNvdW50ZXIpO1xyXG4gICAgaWYgKG5vcm1hbGl6ZWQpIHtcclxuICAgICAgICBmb3IgKGNvZGUgPSAwOyBjb2RlIDwgc2VsZi5DT0RFX1BBVFRFUk4ubGVuZ3RoOyBjb2RlKyspIHtcclxuICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4obm9ybWFsaXplZCwgc2VsZi5DT0RFX1BBVFRFUk5bY29kZV0pO1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IgPCBiZXN0TWF0Y2guZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb2RlID0gY29kZTtcclxuICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChiZXN0TWF0Y2guZXJyb3IgPCBlcHNpbG9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2RlY29kZVBheWxvYWQgPSBmdW5jdGlvbihjb3VudGVycywgcmVzdWx0LCBkZWNvZGVkQ29kZXMpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIHBvcyA9IDAsXHJcbiAgICAgICAgY291bnRlckxlbmd0aCA9IGNvdW50ZXJzLmxlbmd0aCxcclxuICAgICAgICBjb3VudGVyUGFpciA9IFtbMCwgMCwgMCwgMCwgMF0sIFswLCAwLCAwLCAwLCAwXV0sXHJcbiAgICAgICAgY29kZXM7XHJcblxyXG4gICAgd2hpbGUgKHBvcyA8IGNvdW50ZXJMZW5ndGgpIHtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJQYWlyWzBdW2ldID0gY291bnRlcnNbcG9zXSAqIHRoaXMuYmFyU3BhY2VSYXRpb1swXTtcclxuICAgICAgICAgICAgY291bnRlclBhaXJbMV1baV0gPSBjb3VudGVyc1twb3MgKyAxXSAqIHRoaXMuYmFyU3BhY2VSYXRpb1sxXTtcclxuICAgICAgICAgICAgcG9zICs9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvZGVzID0gc2VsZi5fZGVjb2RlUGFpcihjb3VudGVyUGFpcik7XHJcbiAgICAgICAgaWYgKCFjb2Rlcykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvZGVzW2ldLmNvZGUgKyBcIlwiKTtcclxuICAgICAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjb2RlcztcclxufTtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fdmVyaWZ5Q291bnRlckxlbmd0aCA9IGZ1bmN0aW9uKGNvdW50ZXJzKSB7XHJcbiAgICByZXR1cm4gKGNvdW50ZXJzLmxlbmd0aCAlIDEwID09PSAwKTtcclxufTtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc3RhcnRJbmZvLFxyXG4gICAgICAgIGVuZEluZm8sXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgY29kZSxcclxuICAgICAgICByZXN1bHQgPSBbXSxcclxuICAgICAgICBkZWNvZGVkQ29kZXMgPSBbXSxcclxuICAgICAgICBjb3VudGVycztcclxuXHJcbiAgICBzdGFydEluZm8gPSBzZWxmLl9maW5kU3RhcnQoKTtcclxuICAgIGlmICghc3RhcnRJbmZvKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBkZWNvZGVkQ29kZXMucHVzaChzdGFydEluZm8pO1xyXG5cclxuICAgIGVuZEluZm8gPSBzZWxmLl9maW5kRW5kKCk7XHJcbiAgICBpZiAoIWVuZEluZm8pIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb3VudGVycyA9IHNlbGYuX2ZpbGxDb3VudGVycyhzdGFydEluZm8uZW5kLCBlbmRJbmZvLnN0YXJ0LCBmYWxzZSk7XHJcbiAgICBpZiAoIXNlbGYuX3ZlcmlmeUNvdW50ZXJMZW5ndGgoY291bnRlcnMpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjb2RlID0gc2VsZi5fZGVjb2RlUGF5bG9hZChjb3VudGVycywgcmVzdWx0LCBkZWNvZGVkQ29kZXMpO1xyXG4gICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCAlIDIgIT09IDAgfHxcclxuICAgICAgICAgICAgcmVzdWx0Lmxlbmd0aCA8IDYpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBkZWNvZGVkQ29kZXMucHVzaChlbmRJbmZvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogcmVzdWx0LmpvaW4oXCJcIiksXHJcbiAgICAgICAgc3RhcnQ6IHN0YXJ0SW5mby5zdGFydCxcclxuICAgICAgICBlbmQ6IGVuZEluZm8uZW5kLFxyXG4gICAgICAgIHN0YXJ0SW5mbzogc3RhcnRJbmZvLFxyXG4gICAgICAgIGRlY29kZWRDb2RlczogZGVjb2RlZENvZGVzXHJcbiAgICB9O1xyXG59O1xyXG5cclxuSTJvZjVSZWFkZXIuQ09ORklHX0tFWVMgPSB7XHJcbiAgICBub3JtYWxpemVCYXJTcGFjZVdpZHRoOiB7XHJcbiAgICAgICAgJ3R5cGUnOiAnYm9vbGVhbicsXHJcbiAgICAgICAgJ2RlZmF1bHQnOiBmYWxzZSxcclxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnSWYgdHJ1ZSwgdGhlIHJlYWRlciB0cmllcyB0byBub3JtYWxpemUgdGhlJyArXHJcbiAgICAgICAgJ3dpZHRoLWRpZmZlcmVuY2UgYmV0d2VlbiBiYXJzIGFuZCBzcGFjZXMnXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJMm9mNVJlYWRlcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL2kyb2Y1X3JlYWRlci5qc1xuICoqLyIsInZhciBiYXNlTWVyZ2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlTWVyZ2UnKSxcbiAgICBjcmVhdGVBc3NpZ25lciA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2NyZWF0ZUFzc2lnbmVyJyk7XG5cbi8qKlxuICogUmVjdXJzaXZlbHkgbWVyZ2VzIG93biBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgdGhlIHNvdXJjZSBvYmplY3QocyksIHRoYXRcbiAqIGRvbid0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAgaW50byB0aGUgZGVzdGluYXRpb24gb2JqZWN0LiBTdWJzZXF1ZW50IHNvdXJjZXNcbiAqIG92ZXJ3cml0ZSBwcm9wZXJ0eSBhc3NpZ25tZW50cyBvZiBwcmV2aW91cyBzb3VyY2VzLiBJZiBgY3VzdG9taXplcmAgaXNcbiAqIHByb3ZpZGVkIGl0J3MgaW52b2tlZCB0byBwcm9kdWNlIHRoZSBtZXJnZWQgdmFsdWVzIG9mIHRoZSBkZXN0aW5hdGlvbiBhbmRcbiAqIHNvdXJjZSBwcm9wZXJ0aWVzLiBJZiBgY3VzdG9taXplcmAgcmV0dXJucyBgdW5kZWZpbmVkYCBtZXJnaW5nIGlzIGhhbmRsZWRcbiAqIGJ5IHRoZSBtZXRob2QgaW5zdGVhZC4gVGhlIGBjdXN0b21pemVyYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWRcbiAqIHdpdGggZml2ZSBhcmd1bWVudHM6IChvYmplY3RWYWx1ZSwgc291cmNlVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmVkIHZhbHVlcy5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY3VzdG9taXplcmAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSB7XG4gKiAgICdkYXRhJzogW3sgJ3VzZXInOiAnYmFybmV5JyB9LCB7ICd1c2VyJzogJ2ZyZWQnIH1dXG4gKiB9O1xuICpcbiAqIHZhciBhZ2VzID0ge1xuICogICAnZGF0YSc6IFt7ICdhZ2UnOiAzNiB9LCB7ICdhZ2UnOiA0MCB9XVxuICogfTtcbiAqXG4gKiBfLm1lcmdlKHVzZXJzLCBhZ2VzKTtcbiAqIC8vID0+IHsgJ2RhdGEnOiBbeyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYgfSwgeyAndXNlcic6ICdmcmVkJywgJ2FnZSc6IDQwIH1dIH1cbiAqXG4gKiAvLyB1c2luZyBhIGN1c3RvbWl6ZXIgY2FsbGJhY2tcbiAqIHZhciBvYmplY3QgPSB7XG4gKiAgICdmcnVpdHMnOiBbJ2FwcGxlJ10sXG4gKiAgICd2ZWdldGFibGVzJzogWydiZWV0J11cbiAqIH07XG4gKlxuICogdmFyIG90aGVyID0ge1xuICogICAnZnJ1aXRzJzogWydiYW5hbmEnXSxcbiAqICAgJ3ZlZ2V0YWJsZXMnOiBbJ2NhcnJvdCddXG4gKiB9O1xuICpcbiAqIF8ubWVyZ2Uob2JqZWN0LCBvdGhlciwgZnVuY3Rpb24oYSwgYikge1xuICogICBpZiAoXy5pc0FycmF5KGEpKSB7XG4gKiAgICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICogICB9XG4gKiB9KTtcbiAqIC8vID0+IHsgJ2ZydWl0cyc6IFsnYXBwbGUnLCAnYmFuYW5hJ10sICd2ZWdldGFibGVzJzogWydiZWV0JywgJ2NhcnJvdCddIH1cbiAqL1xudmFyIG1lcmdlID0gY3JlYXRlQXNzaWduZXIoYmFzZU1lcmdlKTtcblxubW9kdWxlLmV4cG9ydHMgPSBtZXJnZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9vYmplY3QvbWVyZ2UuanNcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFycmF5RWFjaCA9IHJlcXVpcmUoJy4vYXJyYXlFYWNoJyksXG4gICAgYmFzZU1lcmdlRGVlcCA9IHJlcXVpcmUoJy4vYmFzZU1lcmdlRGVlcCcpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNUeXBlZEFycmF5JyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWVyZ2VgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXJndW1lbnQganVnZ2xpbmcsXG4gKiBtdWx0aXBsZSBzb3VyY2VzLCBhbmQgYHRoaXNgIGJpbmRpbmcgYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdlZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBPVtdXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQj1bXV0gQXNzb2NpYXRlcyB2YWx1ZXMgd2l0aCBzb3VyY2UgY291bnRlcnBhcnRzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlKG9iamVjdCwgc291cmNlLCBjdXN0b21pemVyLCBzdGFja0EsIHN0YWNrQikge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIHZhciBpc1NyY0FyciA9IGlzQXJyYXlMaWtlKHNvdXJjZSkgJiYgKGlzQXJyYXkoc291cmNlKSB8fCBpc1R5cGVkQXJyYXkoc291cmNlKSksXG4gICAgICBwcm9wcyA9IGlzU3JjQXJyID8gdW5kZWZpbmVkIDoga2V5cyhzb3VyY2UpO1xuXG4gIGFycmF5RWFjaChwcm9wcyB8fCBzb3VyY2UsIGZ1bmN0aW9uKHNyY1ZhbHVlLCBrZXkpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGtleSA9IHNyY1ZhbHVlO1xuICAgICAgc3JjVmFsdWUgPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0TGlrZShzcmNWYWx1ZSkpIHtcbiAgICAgIHN0YWNrQSB8fCAoc3RhY2tBID0gW10pO1xuICAgICAgc3RhY2tCIHx8IChzdGFja0IgPSBbXSk7XG4gICAgICBiYXNlTWVyZ2VEZWVwKG9iamVjdCwgc291cmNlLCBrZXksIGJhc2VNZXJnZSwgY3VzdG9taXplciwgc3RhY2tBLCBzdGFja0IpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciB2YWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKHZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgaXNDb21tb24gPSByZXN1bHQgPT09IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKGlzQ29tbW9uKSB7XG4gICAgICAgIHJlc3VsdCA9IHNyY1ZhbHVlO1xuICAgICAgfVxuICAgICAgaWYgKChyZXN1bHQgIT09IHVuZGVmaW5lZCB8fCAoaXNTcmNBcnIgJiYgIShrZXkgaW4gb2JqZWN0KSkpICYmXG4gICAgICAgICAgKGlzQ29tbW9uIHx8IChyZXN1bHQgPT09IHJlc3VsdCA/IChyZXN1bHQgIT09IHZhbHVlKSA6ICh2YWx1ZSA9PT0gdmFsdWUpKSkpIHtcbiAgICAgICAgb2JqZWN0W2tleV0gPSByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlTWVyZ2U7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZU1lcmdlLmpzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZvckVhY2hgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUVhY2g7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvYXJyYXlFYWNoLmpzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhcnJheUNvcHkgPSByZXF1aXJlKCcuL2FycmF5Q29weScpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc1BsYWluT2JqZWN0JyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc1R5cGVkQXJyYXknKSxcbiAgICB0b1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy90b1BsYWluT2JqZWN0Jyk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlTWVyZ2VgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgbWVyZ2VzIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIG1lcmdlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gbWVyZ2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXJnZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1lcmdlIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdlZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBPVtdXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQj1bXV0gQXNzb2NpYXRlcyB2YWx1ZXMgd2l0aCBzb3VyY2UgY291bnRlcnBhcnRzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgbWVyZ2VGdW5jLCBjdXN0b21pemVyLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgbGVuZ3RoID0gc3RhY2tBLmxlbmd0aCxcbiAgICAgIHNyY1ZhbHVlID0gc291cmNlW2tleV07XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKHN0YWNrQVtsZW5ndGhdID09IHNyY1ZhbHVlKSB7XG4gICAgICBvYmplY3Rba2V5XSA9IHN0YWNrQltsZW5ndGhdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKHZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkgOiB1bmRlZmluZWQsXG4gICAgICBpc0NvbW1vbiA9IHJlc3VsdCA9PT0gdW5kZWZpbmVkO1xuXG4gIGlmIChpc0NvbW1vbikge1xuICAgIHJlc3VsdCA9IHNyY1ZhbHVlO1xuICAgIGlmIChpc0FycmF5TGlrZShzcmNWYWx1ZSkgJiYgKGlzQXJyYXkoc3JjVmFsdWUpIHx8IGlzVHlwZWRBcnJheShzcmNWYWx1ZSkpKSB7XG4gICAgICByZXN1bHQgPSBpc0FycmF5KHZhbHVlKVxuICAgICAgICA/IHZhbHVlXG4gICAgICAgIDogKGlzQXJyYXlMaWtlKHZhbHVlKSA/IGFycmF5Q29weSh2YWx1ZSkgOiBbXSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3Qoc3JjVmFsdWUpIHx8IGlzQXJndW1lbnRzKHNyY1ZhbHVlKSkge1xuICAgICAgcmVzdWx0ID0gaXNBcmd1bWVudHModmFsdWUpXG4gICAgICAgID8gdG9QbGFpbk9iamVjdCh2YWx1ZSlcbiAgICAgICAgOiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkgPyB2YWx1ZSA6IHt9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICAvLyBBZGQgdGhlIHNvdXJjZSB2YWx1ZSB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMgYW5kIGFzc29jaWF0ZVxuICAvLyBpdCB3aXRoIGl0cyBtZXJnZWQgdmFsdWUuXG4gIHN0YWNrQS5wdXNoKHNyY1ZhbHVlKTtcbiAgc3RhY2tCLnB1c2gocmVzdWx0KTtcblxuICBpZiAoaXNDb21tb24pIHtcbiAgICAvLyBSZWN1cnNpdmVseSBtZXJnZSBvYmplY3RzIGFuZCBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBvYmplY3Rba2V5XSA9IG1lcmdlRnVuYyhyZXN1bHQsIHNyY1ZhbHVlLCBjdXN0b21pemVyLCBzdGFja0EsIHN0YWNrQik7XG4gIH0gZWxzZSBpZiAocmVzdWx0ID09PSByZXN1bHQgPyAocmVzdWx0ICE9PSB2YWx1ZSkgOiAodmFsdWUgPT09IHZhbHVlKSkge1xuICAgIG9iamVjdFtrZXldID0gcmVzdWx0O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZU1lcmdlRGVlcDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlTWVyZ2VEZWVwLmpzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlDb3B5KHNvdXJjZSwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xuXG4gIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5Q29weTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9hcnJheUNvcHkuanNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNBcnJheUxpa2UnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSkgJiZcbiAgICBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiYgIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FyZ3VtZW50cztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL2lzQXJndW1lbnRzLmpzXG4gKiogbW9kdWxlIGlkID0gMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnZXRMZW5ndGggPSByZXF1aXJlKCcuL2dldExlbmd0aCcpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aChnZXRMZW5ndGgodmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5TGlrZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9pc0FycmF5TGlrZS5qc1xuICoqIG1vZHVsZSBpZCA9IDMyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYmFzZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9iYXNlUHJvcGVydHknKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBcImxlbmd0aFwiIHByb3BlcnR5IHZhbHVlIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXZvaWQgYSBbSklUIGJ1Z10oaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE0Mjc5MilcbiAqIHRoYXQgYWZmZWN0cyBTYWZhcmkgb24gYXQgbGVhc3QgaU9TIDguMS04LjMgQVJNNjQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBcImxlbmd0aFwiIHZhbHVlLlxuICovXG52YXIgZ2V0TGVuZ3RoID0gYmFzZVByb3BlcnR5KCdsZW5ndGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRMZW5ndGg7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvZ2V0TGVuZ3RoLmpzXG4gKiogbW9kdWxlIGlkID0gMzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVByb3BlcnR5O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2Jhc2VQcm9wZXJ0eS5qc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTGVuZ3RoO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2lzTGVuZ3RoLmpzXG4gKiogbW9kdWxlIGlkID0gMzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNPYmplY3RMaWtlLmpzXG4gKiogbW9kdWxlIGlkID0gMzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9nZXROYXRpdmUnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQXJyYXkgPSBnZXROYXRpdmUoQXJyYXksICdpc0FycmF5Jyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBuYXRpdmVJc0FycmF5IHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJyYXlUYWc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvbGFuZy9pc0FycmF5LmpzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc05hdGl2ZSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNOYXRpdmUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIHJldHVybiBpc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXROYXRpdmU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvZ2V0TmF0aXZlLmpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpID4gNSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZm5Ub1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZywgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIHJldHVybiByZUlzTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVJc0hvc3RDdG9yLnRlc3QodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTmF0aXZlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2xhbmcvaXNOYXRpdmUuanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaSB3aGljaCByZXR1cm4gJ2Z1bmN0aW9uJyBmb3IgcmVnZXhlc1xuICAvLyBhbmQgU2FmYXJpIDggd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgY29uc3RydWN0b3JzLlxuICByZXR1cm4gaXNPYmplY3QodmFsdWUpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL2lzRnVuY3Rpb24uanNcbiAqKiBtb2R1bGUgaWQgPSA0MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL2lzT2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiYXNlRm9ySW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlRm9ySW4nKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGFzc3VtZXMgb2JqZWN0cyBjcmVhdGVkIGJ5IHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3RvclxuICogaGF2ZSBubyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHZhciBDdG9yO1xuXG4gIC8vIEV4aXQgZWFybHkgZm9yIG5vbiBgT2JqZWN0YCBvYmplY3RzLlxuICBpZiAoIShpc09iamVjdExpa2UodmFsdWUpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IG9iamVjdFRhZyAmJiAhaXNBcmd1bWVudHModmFsdWUpKSB8fFxuICAgICAgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY29uc3RydWN0b3InKSAmJiAoQ3RvciA9IHZhbHVlLmNvbnN0cnVjdG9yLCB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmICEoQ3RvciBpbnN0YW5jZW9mIEN0b3IpKSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gSUUgPCA5IGl0ZXJhdGVzIGluaGVyaXRlZCBwcm9wZXJ0aWVzIGJlZm9yZSBvd24gcHJvcGVydGllcy4gSWYgdGhlIGZpcnN0XG4gIC8vIGl0ZXJhdGVkIHByb3BlcnR5IGlzIGFuIG9iamVjdCdzIG93biBwcm9wZXJ0eSB0aGVuIHRoZXJlIGFyZSBubyBpbmhlcml0ZWRcbiAgLy8gZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICB2YXIgcmVzdWx0O1xuICAvLyBJbiBtb3N0IGVudmlyb25tZW50cyBhbiBvYmplY3QncyBvd24gcHJvcGVydGllcyBhcmUgaXRlcmF0ZWQgYmVmb3JlXG4gIC8vIGl0cyBpbmhlcml0ZWQgcHJvcGVydGllcy4gSWYgdGhlIGxhc3QgaXRlcmF0ZWQgcHJvcGVydHkgaXMgYW4gb2JqZWN0J3NcbiAgLy8gb3duIHByb3BlcnR5IHRoZW4gdGhlcmUgYXJlIG5vIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gIGJhc2VGb3JJbih2YWx1ZSwgZnVuY3Rpb24oc3ViVmFsdWUsIGtleSkge1xuICAgIHJlc3VsdCA9IGtleTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQgPT09IHVuZGVmaW5lZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCByZXN1bHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUGxhaW5PYmplY3Q7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvbGFuZy9pc1BsYWluT2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiYXNlRm9yID0gcmVxdWlyZSgnLi9iYXNlRm9yJyksXG4gICAga2V5c0luID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXNJbicpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvckluYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9ySW4ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gYmFzZUZvcihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzSW4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGb3JJbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlRm9ySW4uanNcbiAqKiBtb2R1bGUgaWQgPSA0M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGNyZWF0ZUJhc2VGb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUJhc2VGb3InKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvckluYCBhbmQgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzXG4gKiBvdmVyIGBvYmplY3RgIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBpbnZva2luZyBgaXRlcmF0ZWVgIGZvclxuICogZWFjaCBwcm9wZXJ0eS4gSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5XG4gKiByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xudmFyIGJhc2VGb3IgPSBjcmVhdGVCYXNlRm9yKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZvcjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlRm9yLmpzXG4gKiogbW9kdWxlIGlkID0gNDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vdG9PYmplY3QnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgYmFzZSBmdW5jdGlvbiBmb3IgYF8uZm9ySW5gIG9yIGBfLmZvckluUmlnaHRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VGb3IoZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICAgIHZhciBpdGVyYWJsZSA9IHRvT2JqZWN0KG9iamVjdCksXG4gICAgICAgIHByb3BzID0ga2V5c0Z1bmMob2JqZWN0KSxcbiAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgICBpbmRleCA9IGZyb21SaWdodCA/IGxlbmd0aCA6IC0xO1xuXG4gICAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVba2V5XSwga2V5LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUJhc2VGb3I7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvY3JlYXRlQmFzZUZvci5qc1xuICoqIG1vZHVsZSBpZCA9IDQ1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhbiBvYmplY3QgaWYgaXQncyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgb2JqZWN0LlxuICovXG5mdW5jdGlvbiB0b09iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3QodmFsdWUpID8gdmFsdWUgOiBPYmplY3QodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvT2JqZWN0O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL3RvT2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzSW5kZXgnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICB9XG4gIHZhciBsZW5ndGggPSBvYmplY3QubGVuZ3RoO1xuICBsZW5ndGggPSAobGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpICYmIGxlbmd0aCkgfHwgMDtcblxuICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBpc1Byb3RvID0gdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0LFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKSxcbiAgICAgIHNraXBJbmRleGVzID0gbGVuZ3RoID4gMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSAoaW5kZXggKyAnJyk7XG4gIH1cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKHNraXBJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSAmJlxuICAgICAgICAhKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXNJbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9vYmplY3Qva2V5c0luLmpzXG4gKiogbW9kdWxlIGlkID0gNDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eXFxkKyQvO1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIHZhbHVlID0gKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgPyArdmFsdWUgOiAtMTtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0luZGV4O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2lzSW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA0OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPSB0eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPSB0eXBlZEFycmF5VGFnc1ttYXBUYWddID1cbnR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID1cbnR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzZXRUYWddID1cbnR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPSB0eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW29ialRvU3RyaW5nLmNhbGwodmFsdWUpXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1R5cGVkQXJyYXk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvbGFuZy9pc1R5cGVkQXJyYXkuanNcbiAqKiBtb2R1bGUgaWQgPSA0OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGJhc2VDb3B5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUNvcHknKSxcbiAgICBrZXlzSW4gPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5c0luJyk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHBsYWluIG9iamVjdCBmbGF0dGVuaW5nIGluaGVyaXRlZCBlbnVtZXJhYmxlXG4gKiBwcm9wZXJ0aWVzIG9mIGB2YWx1ZWAgdG8gb3duIHByb3BlcnRpZXMgb2YgdGhlIHBsYWluIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgcGxhaW4gb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBuZXcgRm9vKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIgfVxuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIF8udG9QbGFpbk9iamVjdChuZXcgRm9vKSk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyLCAnYyc6IDMgfVxuICovXG5mdW5jdGlvbiB0b1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBiYXNlQ29weSh2YWx1ZSwga2V5c0luKHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9QbGFpbk9iamVjdDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL3RvUGxhaW5PYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA1MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3BpZXMgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IG5hbWVzIHRvIGNvcHkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlQ29weShzb3VyY2UsIHByb3BzLCBvYmplY3QpIHtcbiAgb2JqZWN0IHx8IChvYmplY3QgPSB7fSk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIG9iamVjdFtrZXldID0gc291cmNlW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ29weTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlQ29weS5qc1xuICoqIG1vZHVsZSBpZCA9IDUxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvZ2V0TmF0aXZlJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0FycmF5TGlrZScpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpLFxuICAgIHNoaW1LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvc2hpbUtleXMnKTtcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2tleXMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xudmFyIGtleXMgPSAhbmF0aXZlS2V5cyA/IHNoaW1LZXlzIDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIHZhciBDdG9yID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3QuY29uc3RydWN0b3I7XG4gIGlmICgodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0KSB8fFxuICAgICAgKHR5cGVvZiBvYmplY3QgIT0gJ2Z1bmN0aW9uJyAmJiBpc0FycmF5TGlrZShvYmplY3QpKSkge1xuICAgIHJldHVybiBzaGltS2V5cyhvYmplY3QpO1xuICB9XG4gIHJldHVybiBpc09iamVjdChvYmplY3QpID8gbmF0aXZlS2V5cyhvYmplY3QpIDogW107XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvb2JqZWN0L2tleXMuanNcbiAqKiBtb2R1bGUgaWQgPSA1MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9pc0luZGV4JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAga2V5c0luID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXNJbicpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBIGZhbGxiYWNrIGltcGxlbWVudGF0aW9uIG9mIGBPYmplY3Qua2V5c2Agd2hpY2ggY3JlYXRlcyBhbiBhcnJheSBvZiB0aGVcbiAqIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBzaGltS2V5cyhvYmplY3QpIHtcbiAgdmFyIHByb3BzID0ga2V5c0luKG9iamVjdCksXG4gICAgICBwcm9wc0xlbmd0aCA9IHByb3BzLmxlbmd0aCxcbiAgICAgIGxlbmd0aCA9IHByb3BzTGVuZ3RoICYmIG9iamVjdC5sZW5ndGg7XG5cbiAgdmFyIGFsbG93SW5kZXhlcyA9ICEhbGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBwcm9wc0xlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKChhbGxvd0luZGV4ZXMgJiYgaXNJbmRleChrZXksIGxlbmd0aCkpIHx8IGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNoaW1LZXlzO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL3NoaW1LZXlzLmpzXG4gKiogbW9kdWxlIGlkID0gNTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCcuL2JpbmRDYWxsYmFjaycpLFxuICAgIGlzSXRlcmF0ZWVDYWxsID0gcmVxdWlyZSgnLi9pc0l0ZXJhdGVlQ2FsbCcpLFxuICAgIHJlc3RQYXJhbSA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9uL3Jlc3RQYXJhbScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBgXy5hc3NpZ25gLCBgXy5kZWZhdWx0c2AsIG9yIGBfLm1lcmdlYCBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIHJlc3RQYXJhbShmdW5jdGlvbihvYmplY3QsIHNvdXJjZXMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gb2JqZWN0ID09IG51bGwgPyAwIDogc291cmNlcy5sZW5ndGgsXG4gICAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPiAyID8gc291cmNlc1tsZW5ndGggLSAyXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgZ3VhcmQgPSBsZW5ndGggPiAyID8gc291cmNlc1syXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgdGhpc0FyZyA9IGxlbmd0aCA+IDEgPyBzb3VyY2VzW2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicpIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSBiaW5kQ2FsbGJhY2soY3VzdG9taXplciwgdGhpc0FyZywgNSk7XG4gICAgICBsZW5ndGggLT0gMjtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VzdG9taXplciA9IHR5cGVvZiB0aGlzQXJnID09ICdmdW5jdGlvbicgPyB0aGlzQXJnIDogdW5kZWZpbmVkO1xuICAgICAgbGVuZ3RoIC09IChjdXN0b21pemVyID8gMSA6IDApO1xuICAgIH1cbiAgICBpZiAoZ3VhcmQgJiYgaXNJdGVyYXRlZUNhbGwoc291cmNlc1swXSwgc291cmNlc1sxXSwgZ3VhcmQpKSB7XG4gICAgICBjdXN0b21pemVyID0gbGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IGN1c3RvbWl6ZXI7XG4gICAgICBsZW5ndGggPSAxO1xuICAgIH1cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBhc3NpZ25lcihvYmplY3QsIHNvdXJjZSwgY3VzdG9taXplcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUFzc2lnbmVyO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2NyZWF0ZUFzc2lnbmVyLmpzXG4gKiogbW9kdWxlIGlkID0gNTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpZGVudGl0eSA9IHJlcXVpcmUoJy4uL3V0aWxpdHkvaWRlbnRpdHknKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VDYWxsYmFja2Agd2hpY2ggb25seSBzdXBwb3J0cyBgdGhpc2AgYmluZGluZ1xuICogYW5kIHNwZWNpZnlpbmcgdGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGJpbmQuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJnQ291bnRdIFRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjYWxsYmFjay5cbiAqL1xuZnVuY3Rpb24gYmluZENhbGxiYWNrKGZ1bmMsIHRoaXNBcmcsIGFyZ0NvdW50KSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5O1xuICB9XG4gIGlmICh0aGlzQXJnID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZnVuYztcbiAgfVxuICBzd2l0Y2ggKGFyZ0NvdW50KSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDQ6IHJldHVybiBmdW5jdGlvbihhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH07XG4gICAgY2FzZSA1OiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBvdGhlciwga2V5LCBvYmplY3QsIHNvdXJjZSk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kQ2FsbGJhY2s7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvYmluZENhbGxiYWNrLmpzXG4gKiogbW9kdWxlIGlkID0gNTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgcHJvdmlkZWQgdG8gaXQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsaXR5XG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKlxuICogXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3Q7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpZGVudGl0eTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC91dGlsaXR5L2lkZW50aXR5LmpzXG4gKiogbW9kdWxlIGlkID0gNTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9pc0luZGV4JyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBwcm92aWRlZCBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0l0ZXJhdGVlQ2FsbCh2YWx1ZSwgaW5kZXgsIG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgaW5kZXg7XG4gIGlmICh0eXBlID09ICdudW1iZXInXG4gICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgOiAodHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3QpKSB7XG4gICAgdmFyIG90aGVyID0gb2JqZWN0W2luZGV4XTtcbiAgICByZXR1cm4gdmFsdWUgPT09IHZhbHVlID8gKHZhbHVlID09PSBvdGhlcikgOiAob3RoZXIgIT09IG90aGVyKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJdGVyYXRlZUNhbGw7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNJdGVyYXRlZUNhbGwuanNcbiAqKiBtb2R1bGUgaWQgPSA1N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXg7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlXG4gKiBjcmVhdGVkIGZ1bmN0aW9uIGFuZCBhcmd1bWVudHMgZnJvbSBgc3RhcnRgIGFuZCBiZXlvbmQgcHJvdmlkZWQgYXMgYW4gYXJyYXkuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGJhc2VkIG9uIHRoZSBbcmVzdCBwYXJhbWV0ZXJdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9GdW5jdGlvbnMvcmVzdF9wYXJhbWV0ZXJzKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBzYXkgPSBfLnJlc3RQYXJhbShmdW5jdGlvbih3aGF0LCBuYW1lcykge1xuICogICByZXR1cm4gd2hhdCArICcgJyArIF8uaW5pdGlhbChuYW1lcykuam9pbignLCAnKSArXG4gKiAgICAgKF8uc2l6ZShuYW1lcykgPiAxID8gJywgJiAnIDogJycpICsgXy5sYXN0KG5hbWVzKTtcbiAqIH0pO1xuICpcbiAqIHNheSgnaGVsbG8nLCAnZnJlZCcsICdiYXJuZXknLCAncGViYmxlcycpO1xuICogLy8gPT4gJ2hlbGxvIGZyZWQsIGJhcm5leSwgJiBwZWJibGVzJ1xuICovXG5mdW5jdGlvbiByZXN0UGFyYW0oZnVuYywgc3RhcnQpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogKCtzdGFydCB8fCAwKSwgMCk7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWF4KGFyZ3MubGVuZ3RoIC0gc3RhcnQsIDApLFxuICAgICAgICByZXN0ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICByZXN0W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIHN3aXRjaCAoc3RhcnQpIHtcbiAgICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCByZXN0KTtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcmdzWzBdLCByZXN0KTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcmdzWzBdLCBhcmdzWzFdLCByZXN0KTtcbiAgICB9XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgaW5kZXggPSAtMTtcbiAgICB3aGlsZSAoKytpbmRleCA8IHN0YXJ0KSB7XG4gICAgICBvdGhlckFyZ3NbaW5kZXhdID0gYXJnc1tpbmRleF07XG4gICAgfVxuICAgIG90aGVyQXJnc1tzdGFydF0gPSByZXN0O1xuICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzdFBhcmFtO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2Z1bmN0aW9uL3Jlc3RQYXJhbS5qc1xuICoqIG1vZHVsZSBpZCA9IDU4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgZXZlbnRzID0ge307XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RXZlbnQoZXZlbnROYW1lKSB7XHJcbiAgICAgICAgaWYgKCFldmVudHNbZXZlbnROYW1lXSkge1xyXG4gICAgICAgICAgICBldmVudHNbZXZlbnROYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgIHN1YnNjcmliZXJzOiBbXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZXZlbnRzW2V2ZW50TmFtZV07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xlYXJFdmVudHMoKXtcclxuICAgICAgICBldmVudHMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwdWJsaXNoU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbiwgZGF0YSkge1xyXG4gICAgICAgIGlmIChzdWJzY3JpcHRpb24uYXN5bmMpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5jYWxsYmFjayhkYXRhKTtcclxuICAgICAgICAgICAgfSwgNCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uLmNhbGxiYWNrKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdWJzY3JpYmUoZXZlbnQsIGNhbGxiYWNrLCBhc3luYykge1xyXG4gICAgICAgIHZhciBzdWJzY3JpcHRpb247XHJcblxyXG4gICAgICAgIGlmICggdHlwZW9mIGNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IGFzeW5jXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgIGlmICghc3Vic2NyaXB0aW9uLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkNhbGxiYWNrIHdhcyBub3Qgc3BlY2lmaWVkIG9uIG9wdGlvbnNcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0RXZlbnQoZXZlbnQpLnN1YnNjcmliZXJzLnB1c2goc3Vic2NyaXB0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrLCBhc3luYykge1xyXG4gICAgICAgICAgICByZXR1cm4gc3Vic2NyaWJlKGV2ZW50LCBjYWxsYmFjaywgYXN5bmMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHVibGlzaDogZnVuY3Rpb24oZXZlbnROYW1lLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudCA9IGdldEV2ZW50KGV2ZW50TmFtZSksXHJcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVycyA9IGV2ZW50LnN1YnNjcmliZXJzO1xyXG5cclxuICAgICAgICAgICAgZXZlbnQuc3Vic2NyaWJlcnMgPSBzdWJzY3JpYmVycy5maWx0ZXIoZnVuY3Rpb24oc3Vic2NyaWJlcikge1xyXG4gICAgICAgICAgICAgICAgcHVibGlzaFN1YnNjcmlwdGlvbihzdWJzY3JpYmVyLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhc3Vic2NyaWJlci5vbmNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uY2U6IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaywgYXN5bmMpIHtcclxuICAgICAgICAgICAgc3Vic2NyaWJlKGV2ZW50LCB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXHJcbiAgICAgICAgICAgICAgICBhc3luYzogYXN5bmMsXHJcbiAgICAgICAgICAgICAgICBvbmNlOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50O1xyXG5cclxuICAgICAgICAgICAgaWYgKGV2ZW50TmFtZSkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBnZXRFdmVudChldmVudE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50ICYmIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3Vic2NyaWJlcnMgPSBldmVudC5zdWJzY3JpYmVycy5maWx0ZXIoZnVuY3Rpb24oc3Vic2NyaWJlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJzY3JpYmVyLmNhbGxiYWNrICE9PSBjYWxsYmFjaztcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3Vic2NyaWJlcnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyRXZlbnRzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59KSgpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vZXZlbnRzLmpzXG4gKiovIiwiY29uc3QgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L21lcmdlJyk7XHJcblxyXG52YXIgc3RyZWFtUmVmLFxyXG4gICAgbG9hZGVkRGF0YUhhbmRsZXI7XHJcblxyXG4vKipcclxuICogV3JhcHMgYnJvd3Nlci1zcGVjaWZpYyBnZXRVc2VyTWVkaWFcclxuICogQHBhcmFtIHtPYmplY3R9IGNvbnN0cmFpbnRzXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdWNjZXNzIENhbGxiYWNrXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBmYWlsdXJlIENhbGxiYWNrXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRVc2VyTWVkaWEoY29uc3RyYWludHMsIHN1Y2Nlc3MsIGZhaWx1cmUpIHtcclxuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzLCBmdW5jdGlvbiAoc3RyZWFtKSB7XHJcbiAgICAgICAgICAgIHN0cmVhbVJlZiA9IHN0cmVhbTtcclxuICAgICAgICAgICAgdmFyIHZpZGVvU3JjID0gKHdpbmRvdy5VUkwgJiYgd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKSkgfHwgc3RyZWFtO1xyXG4gICAgICAgICAgICBzdWNjZXNzLmFwcGx5KG51bGwsIFt2aWRlb1NyY10pO1xyXG4gICAgICAgIH0sIGZhaWx1cmUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBmYWlsdXJlKG5ldyBUeXBlRXJyb3IoXCJnZXRVc2VyTWVkaWEgbm90IGF2YWlsYWJsZVwiKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRlZERhdGEodmlkZW8sIGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgYXR0ZW1wdHMgPSAxMDtcclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja1ZpZGVvKCkge1xyXG4gICAgICAgIGlmIChhdHRlbXB0cyA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHZpZGVvLnZpZGVvV2lkdGggPiAwICYmIHZpZGVvLnZpZGVvSGVpZ2h0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codmlkZW8udmlkZW9XaWR0aCArIFwicHggeCBcIiArIHZpZGVvLnZpZGVvSGVpZ2h0ICsgXCJweFwiKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjaGVja1ZpZGVvLCA1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soJ1VuYWJsZSB0byBwbGF5IHZpZGVvIHN0cmVhbS4gSXMgd2ViY2FtIHdvcmtpbmc/Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF0dGVtcHRzLS07XHJcbiAgICB9XHJcbiAgICBjaGVja1ZpZGVvKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcmllcyB0byBhdHRhY2ggdGhlIGNhbWVyYS1zdHJlYW0gdG8gYSBnaXZlbiB2aWRlby1lbGVtZW50XHJcbiAqIGFuZCBjYWxscyB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gd2hlbiB0aGUgY29udGVudCBpcyByZWFkeVxyXG4gKiBAcGFyYW0ge09iamVjdH0gY29uc3RyYWludHNcclxuICogQHBhcmFtIHtPYmplY3R9IHZpZGVvXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjYWxsYmFja1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdENhbWVyYShjb25zdHJhaW50cywgdmlkZW8sIGNhbGxiYWNrKSB7XHJcbiAgICBnZXRVc2VyTWVkaWEoY29uc3RyYWludHMsIGZ1bmN0aW9uKHNyYykge1xyXG4gICAgICAgIHZpZGVvLnNyYyA9IHNyYztcclxuICAgICAgICBpZiAobG9hZGVkRGF0YUhhbmRsZXIpIHtcclxuICAgICAgICAgICAgdmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRlZGRhdGFcIiwgbG9hZGVkRGF0YUhhbmRsZXIsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9hZGVkRGF0YUhhbmRsZXIgPSBsb2FkZWREYXRhLmJpbmQobnVsbCwgdmlkZW8sIGNhbGxiYWNrKTtcclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRkYXRhJywgbG9hZGVkRGF0YUhhbmRsZXIsIGZhbHNlKTtcclxuICAgICAgICB2aWRlby5wbGF5KCk7XHJcbiAgICB9LCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY2FsbGJhY2soZSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE5vcm1hbGl6ZXMgdGhlIGluY29taW5nIGNvbnN0cmFpbnRzIHRvIHNhdGlzZnkgdGhlIGN1cnJlbnQgYnJvd3NlclxyXG4gKiBAcGFyYW0gY29uZmlnXHJcbiAqIEBwYXJhbSBjYiBDYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbmV2ZXIgY29uc3RyYWludHMgYXJlIGNyZWF0ZWRcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5mdW5jdGlvbiBub3JtYWxpemVDb25zdHJhaW50cyhjb25maWcsIGNiKSB7XHJcbiAgICB2YXIgY29uc3RyYWludHMgPSB7XHJcbiAgICAgICAgICAgIGF1ZGlvOiBmYWxzZSxcclxuICAgICAgICAgICAgdmlkZW86IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHZpZGVvQ29uc3RyYWludHMgPSBtZXJnZSh7XHJcbiAgICAgICAgICAgIHdpZHRoOiA2NDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogNDgwLFxyXG4gICAgICAgICAgICBtaW5Bc3BlY3RSYXRpbzogMCxcclxuICAgICAgICAgICAgbWF4QXNwZWN0UmF0aW86IDEwMCxcclxuICAgICAgICAgICAgZmFjaW5nOiBcImVudmlyb25tZW50XCJcclxuICAgICAgICB9LCBjb25maWcpO1xyXG5cclxuICAgIGlmICggdHlwZW9mIE1lZGlhU3RyZWFtVHJhY2sgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBNZWRpYVN0cmVhbVRyYWNrLmdldFNvdXJjZXMgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgTWVkaWFTdHJlYW1UcmFjay5nZXRTb3VyY2VzKGZ1bmN0aW9uKHNvdXJjZUluZm9zKSB7XHJcbiAgICAgICAgICAgIHZhciB2aWRlb1NvdXJjZUlkO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZUluZm9zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc291cmNlSW5mbyA9IHNvdXJjZUluZm9zW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZUluZm8ua2luZCA9PT0gXCJ2aWRlb1wiICYmIHNvdXJjZUluZm8uZmFjaW5nID09PSB2aWRlb0NvbnN0cmFpbnRzLmZhY2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZGVvU291cmNlSWQgPSBzb3VyY2VJbmZvLmlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0ge1xyXG4gICAgICAgICAgICAgICAgbWFuZGF0b3J5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluV2lkdGg6IHZpZGVvQ29uc3RyYWludHMud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluSGVpZ2h0OiB2aWRlb0NvbnN0cmFpbnRzLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICBtaW5Bc3BlY3RSYXRpbzogdmlkZW9Db25zdHJhaW50cy5taW5Bc3BlY3RSYXRpbyxcclxuICAgICAgICAgICAgICAgICAgICBtYXhBc3BlY3RSYXRpbzogdmlkZW9Db25zdHJhaW50cy5tYXhBc3BlY3RSYXRpb1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9wdGlvbmFsOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUlkOiB2aWRlb1NvdXJjZUlkXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gY2IoY29uc3RyYWludHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdHJhaW50cy52aWRlbyA9IHtcclxuICAgICAgICAgICAgbWVkaWFTb3VyY2U6IFwiY2FtZXJhXCIsXHJcbiAgICAgICAgICAgIHdpZHRoOiB7IG1pbjogdmlkZW9Db25zdHJhaW50cy53aWR0aCwgbWF4OiB2aWRlb0NvbnN0cmFpbnRzLndpZHRoIH0sXHJcbiAgICAgICAgICAgIGhlaWdodDogeyBtaW46IHZpZGVvQ29uc3RyYWludHMuaGVpZ2h0LCBtYXg6IHZpZGVvQ29uc3RyYWludHMuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgIHJlcXVpcmU6IFtcIndpZHRoXCIsIFwiaGVpZ2h0XCJdXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gY2IoY29uc3RyYWludHMpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVxdWVzdHMgdGhlIGJhY2stZmFjaW5nIGNhbWVyYSBvZiB0aGUgdXNlci4gVGhlIGNhbGxiYWNrIGlzIGNhbGxlZFxyXG4gKiB3aGVuZXZlciB0aGUgc3RyZWFtIGlzIHJlYWR5IHRvIGJlIGNvbnN1bWVkLCBvciBpZiBhbiBlcnJvciBvY2N1cmVzLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdmlkZW9cclxuICogQHBhcmFtIHtPYmplY3R9IGNhbGxiYWNrXHJcbiAqL1xyXG5mdW5jdGlvbiByZXF1ZXN0KHZpZGVvLCB2aWRlb0NvbnN0cmFpbnRzLCBjYWxsYmFjaykge1xyXG4gICAgbm9ybWFsaXplQ29uc3RyYWludHModmlkZW9Db25zdHJhaW50cywgZnVuY3Rpb24oY29uc3RyYWludHMpIHtcclxuICAgICAgICBpbml0Q2FtZXJhKGNvbnN0cmFpbnRzLCB2aWRlbywgY2FsbGJhY2spO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHJlcXVlc3Q6IGZ1bmN0aW9uKHZpZGVvLCBjb25zdHJhaW50cywgY2FsbGJhY2spIHtcclxuICAgICAgICByZXF1ZXN0KHZpZGVvLCBjb25zdHJhaW50cywgY2FsbGJhY2spO1xyXG4gICAgfSxcclxuICAgIHJlbGVhc2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB0cmFja3MgPSBzdHJlYW1SZWYgJiYgc3RyZWFtUmVmLmdldFZpZGVvVHJhY2tzKCk7XHJcbiAgICAgICAgaWYgKHRyYWNrcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdHJhY2tzWzBdLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RyZWFtUmVmID0gbnVsbDtcclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvaW5wdXQvY2FtZXJhX2FjY2Vzcy5qc1xuICoqLyIsImltcG9ydCBJbWFnZURlYnVnIGZyb20gJy4uL2NvbW1vbi9pbWFnZV9kZWJ1Zyc7XHJcblxyXG5mdW5jdGlvbiBjb250YWlucyhjb2RlUmVzdWx0LCBsaXN0KSB7XHJcbiAgICBpZiAobGlzdCkge1xyXG4gICAgICAgIHJldHVybiBsaXN0LnNvbWUoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGl0ZW0pLmV2ZXJ5KGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtW2tleV0gPT09IGNvZGVSZXN1bHRba2V5XTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhc3Nlc0ZpbHRlcihjb2RlUmVzdWx0LCBmaWx0ZXIpIHtcclxuICAgIGlmICh0eXBlb2YgZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgcmV0dXJuIGZpbHRlcihjb2RlUmVzdWx0KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGNvbmZpZykge1xyXG4gICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLFxyXG4gICAgICAgICAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLFxyXG4gICAgICAgICAgICByZXN1bHRzID0gW10sXHJcbiAgICAgICAgICAgIGNhcGFjaXR5ID0gY29uZmlnLmNhcGFjaXR5IHx8IDIwLFxyXG4gICAgICAgICAgICBjYXB0dXJlID0gY29uZmlnLmNhcHR1cmUgPT09IHRydWU7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG1hdGNoZXNDb25zdHJhaW50cyhjb2RlUmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYXBhY2l0eVxyXG4gICAgICAgICAgICAgICAgJiYgY29kZVJlc3VsdFxyXG4gICAgICAgICAgICAgICAgJiYgIWNvbnRhaW5zKGNvZGVSZXN1bHQsIGNvbmZpZy5ibGFja2xpc3QpXHJcbiAgICAgICAgICAgICAgICAmJiBwYXNzZXNGaWx0ZXIoY29kZVJlc3VsdCwgY29uZmlnLmZpbHRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhZGRSZXN1bHQ6IGZ1bmN0aW9uKGRhdGEsIGltYWdlU2l6ZSwgY29kZVJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzQ29uc3RyYWludHMoY29kZVJlc3VsdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXBhY2l0eS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5jb2RlUmVzdWx0ID0gY29kZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FwdHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggPSBpbWFnZVNpemUueDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IGltYWdlU2l6ZS55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdJbWFnZShkYXRhLCBpbWFnZVNpemUsIGN0eCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5mcmFtZSA9IGNhbnZhcy50b0RhdGFVUkwoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFJlc3VsdHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9hbmFseXRpY3MvcmVzdWx0X2NvbGxlY3Rvci5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGlucHV0U3RyZWFtOiB7XHJcbiAgICAgICAgbmFtZTogXCJMaXZlXCIsXHJcbiAgICAgICAgdHlwZTogXCJMaXZlU3RyZWFtXCIsXHJcbiAgICAgICAgY29uc3RyYWludHM6IHtcclxuICAgICAgICAgICAgd2lkdGg6IDY0MCxcclxuICAgICAgICAgICAgaGVpZ2h0OiA0ODAsXHJcbiAgICAgICAgICAgIG1pbkFzcGVjdFJhdGlvOiAwLFxyXG4gICAgICAgICAgICBtYXhBc3BlY3RSYXRpbzogMTAwLFxyXG4gICAgICAgICAgICBmYWNpbmc6IFwiZW52aXJvbm1lbnRcIiAvLyBvciB1c2VyXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhcmVhOiB7XHJcbiAgICAgICAgICAgIHRvcDogXCIwJVwiLFxyXG4gICAgICAgICAgICByaWdodDogXCIwJVwiLFxyXG4gICAgICAgICAgICBsZWZ0OiBcIjAlXCIsXHJcbiAgICAgICAgICAgIGJvdHRvbTogXCIwJVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaW5nbGVDaGFubmVsOiBmYWxzZSAvLyB0cnVlOiBvbmx5IHRoZSByZWQgY29sb3ItY2hhbm5lbCBpcyByZWFkXHJcbiAgICB9LFxyXG4gICAgZGVidWc6IGZhbHNlLFxyXG4gICAgbG9jYXRlOiB0cnVlLFxyXG4gICAgbnVtT2ZXb3JrZXJzOiA0LFxyXG4gICAgZGVjb2Rlcjoge1xyXG4gICAgICAgIGRyYXdCb3VuZGluZ0JveDogZmFsc2UsXHJcbiAgICAgICAgc2hvd0ZyZXF1ZW5jeTogZmFsc2UsXHJcbiAgICAgICAgZHJhd1NjYW5saW5lOiBmYWxzZSxcclxuICAgICAgICBzaG93UGF0dGVybjogZmFsc2UsXHJcbiAgICAgICAgcmVhZGVyczogW1xyXG4gICAgICAgICAgICAnY29kZV8xMjhfcmVhZGVyJ1xyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICBsb2NhdG9yOiB7XHJcbiAgICAgICAgaGFsZlNhbXBsZTogdHJ1ZSxcclxuICAgICAgICBwYXRjaFNpemU6IFwibWVkaXVtXCIsIC8vIHgtc21hbGwsIHNtYWxsLCBtZWRpdW0sIGxhcmdlLCB4LWxhcmdlXHJcbiAgICAgICAgc2hvd0NhbnZhczogZmFsc2UsXHJcbiAgICAgICAgc2hvd1BhdGNoZXM6IGZhbHNlLFxyXG4gICAgICAgIHNob3dGb3VuZFBhdGNoZXM6IGZhbHNlLFxyXG4gICAgICAgIHNob3dTa2VsZXRvbjogZmFsc2UsXHJcbiAgICAgICAgc2hvd0xhYmVsczogZmFsc2UsXHJcbiAgICAgICAgc2hvd1BhdGNoTGFiZWxzOiBmYWxzZSxcclxuICAgICAgICBzaG93UmVtYWluaW5nUGF0Y2hMYWJlbHM6IGZhbHNlLFxyXG4gICAgICAgIGJveEZyb21QYXRjaGVzOiB7XHJcbiAgICAgICAgICAgIHNob3dUcmFuc2Zvcm1lZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dUcmFuc2Zvcm1lZEJveDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dCQjogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvbmZpZy9jb25maWcuanNcbiAqKi8iLCJpbXBvcnQgSW1hZ2VMb2FkZXIgZnJvbSAnLi9pbWFnZV9sb2FkZXInO1xyXG5cclxudmFyIElucHV0U3RyZWFtID0ge307XHJcbklucHV0U3RyZWFtLmNyZWF0ZVZpZGVvU3RyZWFtID0gZnVuY3Rpb24odmlkZW8pIHtcclxuICAgIHZhciB0aGF0ID0ge30sXHJcbiAgICAgICAgX2NvbmZpZyA9IG51bGwsXHJcbiAgICAgICAgX2V2ZW50TmFtZXMgPSBbJ2NhbnJlY29yZCcsICdlbmRlZCddLFxyXG4gICAgICAgIF9ldmVudEhhbmRsZXJzID0ge30sXHJcbiAgICAgICAgX2NhbGN1bGF0ZWRXaWR0aCxcclxuICAgICAgICBfY2FsY3VsYXRlZEhlaWdodCxcclxuICAgICAgICBfdG9wUmlnaHQgPSB7eDogMCwgeTogMH0sXHJcbiAgICAgICAgX2NhbnZhc1NpemUgPSB7eDogMCwgeTogMH07XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdFNpemUoKSB7XHJcbiAgICAgICAgdmFyIHdpZHRoID0gdmlkZW8udmlkZW9XaWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0ID0gdmlkZW8udmlkZW9IZWlnaHQ7XHJcblxyXG4gICAgICAgIF9jYWxjdWxhdGVkV2lkdGggPVxyXG4gICAgICAgICAgICBfY29uZmlnLnNpemUgPyB3aWR0aCAvIGhlaWdodCA+IDEgPyBfY29uZmlnLnNpemUgOiBNYXRoLmZsb29yKCh3aWR0aCAvIGhlaWdodCkgKiBfY29uZmlnLnNpemUpIDogd2lkdGg7XHJcbiAgICAgICAgX2NhbGN1bGF0ZWRIZWlnaHQgPVxyXG4gICAgICAgICAgICBfY29uZmlnLnNpemUgPyB3aWR0aCAvIGhlaWdodCA+IDEgPyBNYXRoLmZsb29yKChoZWlnaHQgLyB3aWR0aCkgKiBfY29uZmlnLnNpemUpIDogX2NvbmZpZy5zaXplIDogaGVpZ2h0O1xyXG5cclxuICAgICAgICBfY2FudmFzU2l6ZS54ID0gX2NhbGN1bGF0ZWRXaWR0aDtcclxuICAgICAgICBfY2FudmFzU2l6ZS55ID0gX2NhbGN1bGF0ZWRIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5nZXRSZWFsV2lkdGggPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdmlkZW8udmlkZW9XaWR0aDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRSZWFsSGVpZ2h0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHZpZGVvLnZpZGVvSGVpZ2h0O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFdpZHRoID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIF9jYWxjdWxhdGVkV2lkdGg7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIF9jYWxjdWxhdGVkSGVpZ2h0O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldFdpZHRoID0gZnVuY3Rpb24od2lkdGgpIHtcclxuICAgICAgICBfY2FsY3VsYXRlZFdpZHRoID0gd2lkdGg7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2V0SGVpZ2h0ID0gZnVuY3Rpb24oaGVpZ2h0KSB7XHJcbiAgICAgICAgX2NhbGN1bGF0ZWRIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2V0SW5wdXRTdHJlYW0gPSBmdW5jdGlvbihjb25maWcpIHtcclxuICAgICAgICBfY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHZpZGVvLnNyYyA9ICh0eXBlb2YgY29uZmlnLnNyYyAhPT0gJ3VuZGVmaW5lZCcpID8gY29uZmlnLnNyYyA6ICcnO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmVuZGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHZpZGVvLmVuZGVkO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldENvbmZpZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBfY29uZmlnO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldEF0dHJpYnV0ZSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5wYXVzZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZpZGVvLnBhdXNlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucGxheSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZpZGVvLnBsYXkoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zZXRDdXJyZW50VGltZSA9IGZ1bmN0aW9uKHRpbWUpIHtcclxuICAgICAgICBpZiAoX2NvbmZpZy50eXBlICE9PSBcIkxpdmVTdHJlYW1cIikge1xyXG4gICAgICAgICAgICB2aWRlby5jdXJyZW50VGltZSA9IHRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZiwgYm9vbCkge1xyXG4gICAgICAgIGlmIChfZXZlbnROYW1lcy5pbmRleE9mKGV2ZW50KSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgaWYgKCFfZXZlbnRIYW5kbGVyc1tldmVudF0pIHtcclxuICAgICAgICAgICAgICAgIF9ldmVudEhhbmRsZXJzW2V2ZW50XSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9ldmVudEhhbmRsZXJzW2V2ZW50XS5wdXNoKGYpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGYsIGJvb2wpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5jbGVhckV2ZW50SGFuZGxlcnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBfZXZlbnROYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50TmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgaGFuZGxlcnMgPSBfZXZlbnRIYW5kbGVyc1tldmVudE5hbWVdO1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlcnMgJiYgaGFuZGxlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC50cmlnZ2VyID0gZnVuY3Rpb24oZXZlbnROYW1lLCBhcmdzKSB7XHJcbiAgICAgICAgdmFyIGosXHJcbiAgICAgICAgICAgIGhhbmRsZXJzID0gX2V2ZW50SGFuZGxlcnNbZXZlbnROYW1lXTtcclxuXHJcbiAgICAgICAgaWYgKGV2ZW50TmFtZSA9PT0gJ2NhbnJlY29yZCcpIHtcclxuICAgICAgICAgICAgaW5pdFNpemUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGhhbmRsZXJzICYmIGhhbmRsZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBoYW5kbGVycy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlcnNbal0uYXBwbHkodGhhdCwgYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2V0VG9wUmlnaHQgPSBmdW5jdGlvbih0b3BSaWdodCkge1xyXG4gICAgICAgIF90b3BSaWdodC54ID0gdG9wUmlnaHQueDtcclxuICAgICAgICBfdG9wUmlnaHQueSA9IHRvcFJpZ2h0Lnk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0VG9wUmlnaHQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gX3RvcFJpZ2h0O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldENhbnZhc1NpemUgPSBmdW5jdGlvbihzaXplKSB7XHJcbiAgICAgICAgX2NhbnZhc1NpemUueCA9IHNpemUueDtcclxuICAgICAgICBfY2FudmFzU2l6ZS55ID0gc2l6ZS55O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldENhbnZhc1NpemUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gX2NhbnZhc1NpemU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0RnJhbWUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdmlkZW87XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuSW5wdXRTdHJlYW0uY3JlYXRlTGl2ZVN0cmVhbSA9IGZ1bmN0aW9uKHZpZGVvKSB7XHJcbiAgICB2aWRlby5zZXRBdHRyaWJ1dGUoXCJhdXRvcGxheVwiLCB0cnVlKTtcclxuICAgIHZhciB0aGF0ID0gSW5wdXRTdHJlYW0uY3JlYXRlVmlkZW9TdHJlYW0odmlkZW8pO1xyXG5cclxuICAgIHRoYXQuZW5kZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuSW5wdXRTdHJlYW0uY3JlYXRlSW1hZ2VTdHJlYW0gPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciB0aGF0ID0ge307XHJcbiAgICB2YXIgX2NvbmZpZyA9IG51bGw7XHJcblxyXG4gICAgdmFyIHdpZHRoID0gMCxcclxuICAgICAgICBoZWlnaHQgPSAwLFxyXG4gICAgICAgIGZyYW1lSWR4ID0gMCxcclxuICAgICAgICBwYXVzZWQgPSB0cnVlLFxyXG4gICAgICAgIGxvYWRlZCA9IGZhbHNlLFxyXG4gICAgICAgIGltZ0FycmF5ID0gbnVsbCxcclxuICAgICAgICBzaXplID0gMCxcclxuICAgICAgICBvZmZzZXQgPSAxLFxyXG4gICAgICAgIGJhc2VVcmwgPSBudWxsLFxyXG4gICAgICAgIGVuZGVkID0gZmFsc2UsXHJcbiAgICAgICAgY2FsY3VsYXRlZFdpZHRoLFxyXG4gICAgICAgIGNhbGN1bGF0ZWRIZWlnaHQsXHJcbiAgICAgICAgX2V2ZW50TmFtZXMgPSBbJ2NhbnJlY29yZCcsICdlbmRlZCddLFxyXG4gICAgICAgIF9ldmVudEhhbmRsZXJzID0ge30sXHJcbiAgICAgICAgX3RvcFJpZ2h0ID0ge3g6IDAsIHk6IDB9LFxyXG4gICAgICAgIF9jYW52YXNTaXplID0ge3g6IDAsIHk6IDB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGxvYWRJbWFnZXMoKSB7XHJcbiAgICAgICAgbG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgSW1hZ2VMb2FkZXIubG9hZChiYXNlVXJsLCBmdW5jdGlvbihpbWdzKSB7XHJcbiAgICAgICAgICAgIGltZ0FycmF5ID0gaW1ncztcclxuICAgICAgICAgICAgd2lkdGggPSBpbWdzWzBdLndpZHRoO1xyXG4gICAgICAgICAgICBoZWlnaHQgPSBpbWdzWzBdLmhlaWdodDtcclxuICAgICAgICAgICAgY2FsY3VsYXRlZFdpZHRoID1cclxuICAgICAgICAgICAgICAgIF9jb25maWcuc2l6ZSA/IHdpZHRoIC8gaGVpZ2h0ID4gMSA/IF9jb25maWcuc2l6ZSA6IE1hdGguZmxvb3IoKHdpZHRoIC8gaGVpZ2h0KSAqIF9jb25maWcuc2l6ZSkgOiB3aWR0aDtcclxuICAgICAgICAgICAgY2FsY3VsYXRlZEhlaWdodCA9XHJcbiAgICAgICAgICAgICAgICBfY29uZmlnLnNpemUgPyB3aWR0aCAvIGhlaWdodCA+IDEgPyBNYXRoLmZsb29yKChoZWlnaHQgLyB3aWR0aCkgKiBfY29uZmlnLnNpemUpIDogX2NvbmZpZy5zaXplIDogaGVpZ2h0O1xyXG4gICAgICAgICAgICBfY2FudmFzU2l6ZS54ID0gY2FsY3VsYXRlZFdpZHRoO1xyXG4gICAgICAgICAgICBfY2FudmFzU2l6ZS55ID0gY2FsY3VsYXRlZEhlaWdodDtcclxuICAgICAgICAgICAgbG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgZnJhbWVJZHggPSAwO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcHVibGlzaEV2ZW50KFwiY2FucmVjb3JkXCIsIFtdKTtcclxuICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgfSwgb2Zmc2V0LCBzaXplLCBfY29uZmlnLnNlcXVlbmNlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwdWJsaXNoRXZlbnQoZXZlbnROYW1lLCBhcmdzKSB7XHJcbiAgICAgICAgdmFyIGosXHJcbiAgICAgICAgICAgIGhhbmRsZXJzID0gX2V2ZW50SGFuZGxlcnNbZXZlbnROYW1lXTtcclxuXHJcbiAgICAgICAgaWYgKGhhbmRsZXJzICYmIGhhbmRsZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBoYW5kbGVycy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlcnNbal0uYXBwbHkodGhhdCwgYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRoYXQudHJpZ2dlciA9IHB1Ymxpc2hFdmVudDtcclxuXHJcbiAgICB0aGF0LmdldFdpZHRoID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGN1bGF0ZWRXaWR0aDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRIZWlnaHQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gY2FsY3VsYXRlZEhlaWdodDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zZXRXaWR0aCA9IGZ1bmN0aW9uKG5ld1dpZHRoKSB7XHJcbiAgICAgICAgY2FsY3VsYXRlZFdpZHRoID0gbmV3V2lkdGg7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2V0SGVpZ2h0ID0gZnVuY3Rpb24obmV3SGVpZ2h0KSB7XHJcbiAgICAgICAgY2FsY3VsYXRlZEhlaWdodCA9IG5ld0hlaWdodDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRSZWFsV2lkdGggPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gd2lkdGg7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0UmVhbEhlaWdodCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBoZWlnaHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2V0SW5wdXRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICBfY29uZmlnID0gc3RyZWFtO1xyXG4gICAgICAgIGlmIChzdHJlYW0uc2VxdWVuY2UgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGJhc2VVcmwgPSBzdHJlYW0uc3JjO1xyXG4gICAgICAgICAgICBzaXplID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBiYXNlVXJsID0gc3RyZWFtLnNyYztcclxuICAgICAgICAgICAgc2l6ZSA9IHN0cmVhbS5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvYWRJbWFnZXMoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5lbmRlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBlbmRlZDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zZXRBdHRyaWJ1dGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cclxuICAgIHRoYXQuZ2V0Q29uZmlnID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIF9jb25maWc7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucGF1c2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBwYXVzZWQgPSB0cnVlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnBsYXkgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBwYXVzZWQgPSBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zZXRDdXJyZW50VGltZSA9IGZ1bmN0aW9uKHRpbWUpIHtcclxuICAgICAgICBmcmFtZUlkeCA9IHRpbWU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmKSB7XHJcbiAgICAgICAgaWYgKF9ldmVudE5hbWVzLmluZGV4T2YoZXZlbnQpICE9PSAtMSkge1xyXG4gICAgICAgICAgICBpZiAoIV9ldmVudEhhbmRsZXJzW2V2ZW50XSkge1xyXG4gICAgICAgICAgICAgICAgX2V2ZW50SGFuZGxlcnNbZXZlbnRdID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX2V2ZW50SGFuZGxlcnNbZXZlbnRdLnB1c2goZik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldFRvcFJpZ2h0ID0gZnVuY3Rpb24odG9wUmlnaHQpIHtcclxuICAgICAgICBfdG9wUmlnaHQueCA9IHRvcFJpZ2h0Lng7XHJcbiAgICAgICAgX3RvcFJpZ2h0LnkgPSB0b3BSaWdodC55O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFRvcFJpZ2h0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIF90b3BSaWdodDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zZXRDYW52YXNTaXplID0gZnVuY3Rpb24oY2FudmFzU2l6ZSkge1xyXG4gICAgICAgIF9jYW52YXNTaXplLnggPSBjYW52YXNTaXplLng7XHJcbiAgICAgICAgX2NhbnZhc1NpemUueSA9IGNhbnZhc1NpemUueTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRDYW52YXNTaXplID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIF9jYW52YXNTaXplO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldEZyYW1lID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGZyYW1lO1xyXG5cclxuICAgICAgICBpZiAoIWxvYWRlZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXBhdXNlZCkge1xyXG4gICAgICAgICAgICBmcmFtZSA9IGltZ0FycmF5W2ZyYW1lSWR4XTtcclxuICAgICAgICAgICAgaWYgKGZyYW1lSWR4IDwgKHNpemUgLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgZnJhbWVJZHgrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHB1Ymxpc2hFdmVudChcImVuZGVkXCIsIFtdKTtcclxuICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmcmFtZTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbnB1dFN0cmVhbTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvaW5wdXQvaW5wdXRfc3RyZWFtLmpzXG4gKiovIiwidmFyIEltYWdlTG9hZGVyID0ge307XHJcbkltYWdlTG9hZGVyLmxvYWQgPSBmdW5jdGlvbihkaXJlY3RvcnksIGNhbGxiYWNrLCBvZmZzZXQsIHNpemUsIHNlcXVlbmNlKSB7XHJcbiAgICB2YXIgaHRtbEltYWdlc1NyY0FycmF5ID0gbmV3IEFycmF5KHNpemUpLFxyXG4gICAgICAgIGh0bWxJbWFnZXNBcnJheSA9IG5ldyBBcnJheShodG1sSW1hZ2VzU3JjQXJyYXkubGVuZ3RoKSxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGltZyxcclxuICAgICAgICBudW07XHJcblxyXG4gICAgaWYgKHNlcXVlbmNlID09PSBmYWxzZSkge1xyXG4gICAgICAgIGh0bWxJbWFnZXNTcmNBcnJheVswXSA9IGRpcmVjdG9yeTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBodG1sSW1hZ2VzU3JjQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbnVtID0gKG9mZnNldCArIGkpO1xyXG4gICAgICAgICAgICBodG1sSW1hZ2VzU3JjQXJyYXlbaV0gPSBkaXJlY3RvcnkgKyBcImltYWdlLVwiICsgKFwiMDBcIiArIG51bSkuc2xpY2UoLTMpICsgXCIuanBnXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaHRtbEltYWdlc0FycmF5Lm5vdExvYWRlZCA9IFtdO1xyXG4gICAgaHRtbEltYWdlc0FycmF5LmFkZEltYWdlID0gZnVuY3Rpb24oaW1hZ2UpIHtcclxuICAgICAgICBodG1sSW1hZ2VzQXJyYXkubm90TG9hZGVkLnB1c2goaW1hZ2UpO1xyXG4gICAgfTtcclxuICAgIGh0bWxJbWFnZXNBcnJheS5sb2FkZWQgPSBmdW5jdGlvbihsb2FkZWRJbWcpIHtcclxuICAgICAgICB2YXIgbm90bG9hZGVkSW1ncyA9IGh0bWxJbWFnZXNBcnJheS5ub3RMb2FkZWQ7XHJcbiAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBub3Rsb2FkZWRJbWdzLmxlbmd0aDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChub3Rsb2FkZWRJbWdzW3hdID09PSBsb2FkZWRJbWcpIHtcclxuICAgICAgICAgICAgICAgIG5vdGxvYWRlZEltZ3Muc3BsaWNlKHgsIDEpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBodG1sSW1hZ2VzU3JjQXJyYXkubGVuZ3RoOyB5KyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW1nTmFtZSA9IGh0bWxJbWFnZXNTcmNBcnJheVt5XS5zdWJzdHIoaHRtbEltYWdlc1NyY0FycmF5W3ldLmxhc3RJbmRleE9mKFwiL1wiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRlZEltZy5zcmMubGFzdEluZGV4T2YoaW1nTmFtZSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWxJbWFnZXNBcnJheVt5XSA9IGxvYWRlZEltZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vdGxvYWRlZEltZ3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSW1hZ2VzIGxvYWRlZFwiKTtcclxuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgW2h0bWxJbWFnZXNBcnJheV0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCBodG1sSW1hZ2VzU3JjQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBodG1sSW1hZ2VzQXJyYXkuYWRkSW1hZ2UoaW1nKTtcclxuICAgICAgICBhZGRPbmxvYWRIYW5kbGVyKGltZywgaHRtbEltYWdlc0FycmF5KTtcclxuICAgICAgICBpbWcuc3JjID0gaHRtbEltYWdlc1NyY0FycmF5W2ldO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gYWRkT25sb2FkSGFuZGxlcihpbWcsIGh0bWxJbWFnZXNBcnJheSkge1xyXG4gICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGh0bWxJbWFnZXNBcnJheS5sb2FkZWQodGhpcyk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoSW1hZ2VMb2FkZXIpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9pbnB1dC9pbWFnZV9sb2FkZXIuanNcbiAqKi8iLCJpbXBvcnQgQ1ZVdGlscyBmcm9tICcuLi9jb21tb24vY3ZfdXRpbHMnO1xyXG5cclxudmFyIEZyYW1lR3JhYmJlciA9IHt9O1xyXG5cclxuRnJhbWVHcmFiYmVyLmNyZWF0ZSA9IGZ1bmN0aW9uKGlucHV0U3RyZWFtLCBjYW52YXMpIHtcclxuICAgIHZhciBfdGhhdCA9IHt9LFxyXG4gICAgICAgIF9zdHJlYW1Db25maWcgPSBpbnB1dFN0cmVhbS5nZXRDb25maWcoKSxcclxuICAgICAgICBfdmlkZW9fc2l6ZSA9IENWVXRpbHMuaW1hZ2VSZWYoaW5wdXRTdHJlYW0uZ2V0UmVhbFdpZHRoKCksIGlucHV0U3RyZWFtLmdldFJlYWxIZWlnaHQoKSksXHJcbiAgICAgICAgX2NhbnZhc1NpemUgPSBpbnB1dFN0cmVhbS5nZXRDYW52YXNTaXplKCksXHJcbiAgICAgICAgX3NpemUgPSBDVlV0aWxzLmltYWdlUmVmKGlucHV0U3RyZWFtLmdldFdpZHRoKCksIGlucHV0U3RyZWFtLmdldEhlaWdodCgpKSxcclxuICAgICAgICB0b3BSaWdodCA9IGlucHV0U3RyZWFtLmdldFRvcFJpZ2h0KCksXHJcbiAgICAgICAgX3N4ID0gdG9wUmlnaHQueCxcclxuICAgICAgICBfc3kgPSB0b3BSaWdodC55LFxyXG4gICAgICAgIF9jYW52YXMsXHJcbiAgICAgICAgX2N0eCA9IG51bGwsXHJcbiAgICAgICAgX2RhdGEgPSBudWxsO1xyXG5cclxuICAgIF9jYW52YXMgPSBjYW52YXMgPyBjYW52YXMgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgX2NhbnZhcy53aWR0aCA9IF9jYW52YXNTaXplLng7XHJcbiAgICBfY2FudmFzLmhlaWdodCA9IF9jYW52YXNTaXplLnk7XHJcbiAgICBfY3R4ID0gX2NhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBfZGF0YSA9IG5ldyBVaW50OEFycmF5KF9zaXplLnggKiBfc2l6ZS55KTtcclxuICAgIGNvbnNvbGUubG9nKFwiRnJhbWVHcmFiYmVyXCIsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICBzaXplOiBfc2l6ZSxcclxuICAgICAgICB0b3BSaWdodDogdG9wUmlnaHQsXHJcbiAgICAgICAgdmlkZW9TaXplOiBfdmlkZW9fc2l6ZSxcclxuICAgICAgICBjYW52YXNTaXplOiBfY2FudmFzU2l6ZVxyXG4gICAgfSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXNlcyB0aGUgZ2l2ZW4gYXJyYXkgYXMgZnJhbWUtYnVmZmVyXHJcbiAgICAgKi9cclxuICAgIF90aGF0LmF0dGFjaERhdGEgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgX2RhdGEgPSBkYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHVzZWQgZnJhbWUtYnVmZmVyXHJcbiAgICAgKi9cclxuICAgIF90aGF0LmdldERhdGEgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gX2RhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmV0Y2hlcyBhIGZyYW1lIGZyb20gdGhlIGlucHV0LXN0cmVhbSBhbmQgcHV0cyBpbnRvIHRoZSBmcmFtZS1idWZmZXIuXHJcbiAgICAgKiBUaGUgaW1hZ2UtZGF0YSBpcyBjb252ZXJ0ZWQgdG8gZ3JheS1zY2FsZSBhbmQgdGhlbiBoYWxmLXNhbXBsZWQgaWYgY29uZmlndXJlZC5cclxuICAgICAqL1xyXG4gICAgX3RoYXQuZ3JhYiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBkb0hhbGZTYW1wbGUgPSBfc3RyZWFtQ29uZmlnLmhhbGZTYW1wbGUsXHJcbiAgICAgICAgICAgIGZyYW1lID0gaW5wdXRTdHJlYW0uZ2V0RnJhbWUoKSxcclxuICAgICAgICAgICAgY3R4RGF0YTtcclxuICAgICAgICBpZiAoZnJhbWUpIHtcclxuICAgICAgICAgICAgX2N0eC5kcmF3SW1hZ2UoZnJhbWUsIDAsIDAsIF9jYW52YXNTaXplLngsIF9jYW52YXNTaXplLnkpO1xyXG4gICAgICAgICAgICBjdHhEYXRhID0gX2N0eC5nZXRJbWFnZURhdGEoX3N4LCBfc3ksIF9zaXplLngsIF9zaXplLnkpLmRhdGE7XHJcbiAgICAgICAgICAgIGlmIChkb0hhbGZTYW1wbGUpe1xyXG4gICAgICAgICAgICAgICAgQ1ZVdGlscy5ncmF5QW5kSGFsZlNhbXBsZUZyb21DYW52YXNEYXRhKGN0eERhdGEsIF9zaXplLCBfZGF0YSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBDVlV0aWxzLmNvbXB1dGVHcmF5KGN0eERhdGEsIF9kYXRhLCBfc3RyZWFtQ29uZmlnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBfdGhhdC5nZXRTaXplID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zaXplO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gX3RoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGcmFtZUdyYWJiZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2lucHV0L2ZyYW1lX2dyYWJiZXIuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9