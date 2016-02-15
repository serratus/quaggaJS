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
	
	var _image_wrapper = __webpack_require__(3);
	
	var _image_wrapper2 = _interopRequireDefault(_image_wrapper);
	
	var _barcode_locator = __webpack_require__(9);
	
	var _barcode_locator2 = _interopRequireDefault(_barcode_locator);
	
	var _barcode_decoder = __webpack_require__(14);
	
	var _barcode_decoder2 = _interopRequireDefault(_barcode_decoder);
	
	var _config2 = __webpack_require__(59);
	
	var _config3 = _interopRequireDefault(_config2);
	
	var _events = __webpack_require__(60);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _camera_access = __webpack_require__(61);
	
	var _camera_access2 = _interopRequireDefault(_camera_access);
	
	var _image_debug = __webpack_require__(13);
	
	var _image_debug2 = _interopRequireDefault(_image_debug);
	
	var _glMatrix = __webpack_require__(7);
	
	var _result_collector = __webpack_require__(62);
	
	var _result_collector2 = _interopRequireDefault(_result_collector);
	
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
	    _decoder = _barcode_decoder2['default'].create(_config.decoder, _inputImageWrapper);
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
	        _camera_access2['default'].request(video, _config.inputStream.constraints, function (err) {
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
	    _barcode_locator2['default'].checkImageConstraints(_inputStream, _config.locator);
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
	        _inputImageWrapper = new _image_wrapper2['default']({
	            x: _inputStream.getWidth(),
	            y: _inputStream.getHeight()
	        });
	    }
	
	    console.log(_inputImageWrapper.size);
	    _boxSize = [_glMatrix.vec2.clone([0, 0]), _glMatrix.vec2.clone([0, _inputImageWrapper.size.y]), _glMatrix.vec2.clone([_inputImageWrapper.size.x, _inputImageWrapper.size.y]), _glMatrix.vec2.clone([_inputImageWrapper.size.x, 0])];
	    _barcode_locator2['default'].init(_inputImageWrapper, _config.locator);
	}
	
	function getBoundingBoxes() {
	    if (_config.locate) {
	        return _barcode_locator2['default'].locate();
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
	
	    _events2['default'].publish("processed", resultToPublish);
	    if (hasCodeResult(result)) {
	        _events2['default'].publish("detected", resultToPublish);
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
	        _config = merge({}, _config3['default'], config);
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
	            _camera_access2['default'].release();
	            _inputStream.clearEventHandlers();
	        }
	    },
	    pause: function pause() {
	        _stopped = true;
	    },
	    onDetected: function onDetected(callback) {
	        _events2['default'].subscribe("detected", callback);
	    },
	    offDetected: function offDetected(callback) {
	        _events2['default'].unsubscribe("detected", callback);
	    },
	    onProcessed: function onProcessed(callback) {
	        _events2['default'].subscribe("processed", callback);
	    },
	    offProcessed: function offProcessed(callback) {
	        _events2['default'].unsubscribe("processed", callback);
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
	            _events2['default'].once("processed", function (result) {
	                _stopped = true;
	                resultCallback.call(null, result);
	            }, true);
	            _start();
	        });
	    },
	    ImageWrapper: _image_wrapper2['default'],
	    ImageDebug: _image_debug2['default'],
	    ResultCollector: _result_collector2['default']
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
	
	var _cv_utils = __webpack_require__(5);
	
	var _cv_utils2 = _interopRequireDefault(_cv_utils);
	
	var _array_helper = __webpack_require__(8);
	
	var _array_helper2 = _interopRequireDefault(_array_helper);
	
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
	                _array_helper2['default'].init(this.data, 0);
	            }
	        } else {
	            this.data = new Uint8Array(size.x * size.y);
	            if (Uint8Array === Array && initialize) {
	                _array_helper2['default'].init(this.data, 0);
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
	        result = hsv[0] <= 0 ? whiteRgb : hsv[0] >= 360 ? blackRgb : _cv_utils2['default'].hsv2rgb(hsv, rgb);
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
	
	var _image_wrapper = __webpack_require__(3);
	
	var _image_wrapper2 = _interopRequireDefault(_image_wrapper);
	
	var _cv_utils = __webpack_require__(5);
	
	var _cv_utils2 = _interopRequireDefault(_cv_utils);
	
	var _rasterizer = __webpack_require__(10);
	
	var _rasterizer2 = _interopRequireDefault(_rasterizer);
	
	var _tracer = __webpack_require__(11);
	
	var _tracer2 = _interopRequireDefault(_tracer);
	
	var _skeletonizer2 = __webpack_require__(12);
	
	var _skeletonizer3 = _interopRequireDefault(_skeletonizer2);
	
	var _array_helper = __webpack_require__(8);
	
	var _array_helper2 = _interopRequireDefault(_array_helper);
	
	var _image_debug = __webpack_require__(13);
	
	var _image_debug2 = _interopRequireDefault(_image_debug);
	
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
	        _currentImageWrapper = new _image_wrapper2['default']({
	            x: _inputImageWrapper.size.x / 2 | 0,
	            y: _inputImageWrapper.size.y / 2 | 0
	        });
	    } else {
	        _currentImageWrapper = _inputImageWrapper;
	    }
	
	    _patchSize = _cv_utils2['default'].calculatePatchSize(_config.patchSize, _currentImageWrapper.size);
	
	    _numPatches.x = _currentImageWrapper.size.x / _patchSize.x | 0;
	    _numPatches.y = _currentImageWrapper.size.y / _patchSize.y | 0;
	
	    _binaryImageWrapper = new _image_wrapper2['default'](_currentImageWrapper.size, undefined, Uint8Array, false);
	
	    _labelImageWrapper = new _image_wrapper2['default'](_patchSize, undefined, Array, true);
	
	    skeletonImageData = new ArrayBuffer(64 * 1024);
	    _subImageWrapper = new _image_wrapper2['default'](_patchSize, new Uint8Array(skeletonImageData, 0, _patchSize.x * _patchSize.y));
	    _skelImageWrapper = new _image_wrapper2['default'](_patchSize, new Uint8Array(skeletonImageData, _patchSize.x * _patchSize.y * 3, _patchSize.x * _patchSize.y), undefined, true);
	    _skeletonizer = (0, _skeletonizer3['default'])(typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : global, {
	        size: _patchSize.x
	    }, skeletonImageData);
	
	    _imageToPatchGrid = new _image_wrapper2['default']({
	        x: _currentImageWrapper.size.x / _subImageWrapper.size.x | 0,
	        y: _currentImageWrapper.size.y / _subImageWrapper.size.y | 0
	    }, undefined, Array, true);
	    _patchGrid = new _image_wrapper2['default'](_imageToPatchGrid.size, undefined, undefined, true);
	    _patchLabelGrid = new _image_wrapper2['default'](_imageToPatchGrid.size, undefined, Int32Array, true);
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
	            _image_debug2['default'].drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, { color: "red" });
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
	            _image_debug2['default'].drawPath(patch.box, { x: 0, y: 1 }, _canvasContainer.ctx.binary, { color: '#99ff00', lineWidth: 2 });
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
	        _image_debug2['default'].drawPath(box, { x: 0, y: 1 }, _canvasContainer.ctx.binary, { color: '#ff0000', lineWidth: 2 });
	    }
	
	    scale = _config.halfSample ? 2 : 1;
	    // reverse rotation;
	    transMat = mat2.invert(transMat, transMat);
	    for (j = 0; j < 4; j++) {
	        vec2.transformMat2(box[j], box[j], transMat);
	    }
	
	    if (_config.boxFromPatches.showBB) {
	        _image_debug2['default'].drawPath(box, { x: 0, y: 1 }, _canvasContainer.ctx.binary, { color: '#ff0000', lineWidth: 2 });
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
	    _cv_utils2['default'].otsuThreshold(_currentImageWrapper, _binaryImageWrapper);
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
	            _array_helper2['default'].init(_labelImageWrapper.data, 0);
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
	            _image_debug2['default'].drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, { color: "#99ff00", lineWidth: 2 });
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
	                    _cv_utils2['default'].hsv2rgb(hsv, rgb);
	                    _image_debug2['default'].drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, { color: "rgb(" + rgb.join(",") + ")", lineWidth: 2 });
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
	    var clusters = _cv_utils2['default'].cluster(moments, 0.90);
	    var topCluster = _cv_utils2['default'].topGeneric(clusters, 1, function (e) {
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
	    _binaryImageWrapper.subImageAsCopy(_subImageWrapper, _cv_utils2['default'].imageRef(x, y));
	    _skeletonizer.skeletonize();
	
	    // Show skeleton if requested
	    if (_config.showSkeleton) {
	        _skelImageWrapper.overlay(_canvasContainer.dom.binary, 360, _cv_utils2['default'].imageRef(x, y));
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
	    _array_helper2['default'].init(_patchGrid.data, 0);
	    _array_helper2['default'].init(_patchLabelGrid.data, 0);
	    _array_helper2['default'].init(_imageToPatchGrid.data, null);
	
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
	                _cv_utils2['default'].hsv2rgb(hsv, rgb);
	                _image_debug2['default'].drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, { color: "rgb(" + rgb.join(",") + ")", lineWidth: 2 });
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
	            _cv_utils2['default'].halfSample(_inputImageWrapper, _currentImageWrapper);
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
	            area = _cv_utils2['default'].computeImageArea(width, height, inputStream.getConfig().area);
	            inputStream.setTopRight({ x: area.sx, y: area.sy });
	            inputStream.setCanvasSize({ x: width, y: height });
	            width = area.sw;
	            height = area.sh;
	        }
	
	        size = {
	            x: Math.floor(width * halfSample),
	            y: Math.floor(height * halfSample)
	        };
	
	        patchSize = _cv_utils2['default'].calculatePatchSize(config.patchSize, size);
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
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _tracer = __webpack_require__(11);
	
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _bresenham = __webpack_require__(15);
	
	var _bresenham2 = _interopRequireDefault(_bresenham);
	
	var _image_debug = __webpack_require__(13);
	
	var _image_debug2 = _interopRequireDefault(_image_debug);
	
	var _code_128_reader = __webpack_require__(16);
	
	var _code_128_reader2 = _interopRequireDefault(_code_128_reader);
	
	var _ean_reader = __webpack_require__(18);
	
	var _ean_reader2 = _interopRequireDefault(_ean_reader);
	
	var _code_39_reader = __webpack_require__(19);
	
	var _code_39_reader2 = _interopRequireDefault(_code_39_reader);
	
	var _code_39_vin_reader = __webpack_require__(20);
	
	var _code_39_vin_reader2 = _interopRequireDefault(_code_39_vin_reader);
	
	var _codabar_reader = __webpack_require__(21);
	
	var _codabar_reader2 = _interopRequireDefault(_codabar_reader);
	
	var _upc_reader = __webpack_require__(22);
	
	var _upc_reader2 = _interopRequireDefault(_upc_reader);
	
	var _ean_8_reader = __webpack_require__(23);
	
	var _ean_8_reader2 = _interopRequireDefault(_ean_8_reader);
	
	var _upc_e_reader = __webpack_require__(24);
	
	var _upc_e_reader2 = _interopRequireDefault(_upc_e_reader);
	
	var _i2of5_reader = __webpack_require__(25);
	
	var _i2of5_reader2 = _interopRequireDefault(_i2of5_reader);
	
	var READERS = {
	    code_128_reader: _code_128_reader2['default'],
	    ean_reader: _ean_reader2['default'],
	    ean_8_reader: _ean_8_reader2['default'],
	    code_39_reader: _code_39_reader2['default'],
	    code_39_vin_reader: _code_39_vin_reader2['default'],
	    codabar_reader: _codabar_reader2['default'],
	    upc_reader: _upc_reader2['default'],
	    upc_e_reader: _upc_e_reader2['default'],
	    i2of5_reader: _i2of5_reader2['default']
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
	                _image_debug2['default'].drawPath(line, { x: 'x', y: 'y' }, _canvas.ctx.overlay, { color: 'red', lineWidth: 3 });
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
	                _image_debug2['default'].drawPath(box, { x: 0, y: 1 }, ctx, { color: "blue", lineWidth: 2 });
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
	                _image_debug2['default'].drawPath(line, { x: 'x', y: 'y' }, ctx, { color: 'red', lineWidth: 3 });
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
	
	var _cv_utils = __webpack_require__(5);
	
	var _cv_utils2 = _interopRequireDefault(_cv_utils);
	
	var _image_wrapper = __webpack_require__(3);
	
	var _image_wrapper2 = _interopRequireDefault(_image_wrapper);
	
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
	        image = new _image_wrapper2['default']({ x: line.length - 1, y: 1 }, line),
	        threshold = _cv_utils2['default'].determineOtsuThreshold(image, 5);
	
	    line = _cv_utils2['default'].sharpenLine(line);
	    _cv_utils2['default'].thresholdImage(image, threshold);
	
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
	
	var _array_helper = __webpack_require__(8);
	
	var _array_helper2 = _interopRequireDefault(_array_helper);
	
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
	
	    _array_helper2['default'].init(counter, 0);
	
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
	        nextStart += _array_helper2['default'].sum(counters);
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
	        patternSize = _array_helper2['default'].sum(counters);
	
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
/* 60 */
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
/* 61 */
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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _image_debug = __webpack_require__(13);
	
	var _image_debug2 = _interopRequireDefault(_image_debug);
	
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
	                        _image_debug2['default'].drawImage(data, imageSize, ctx);
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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var GetPixels = __webpack_require__(64);
	
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
/* 64 */
/***/ function(module, exports) {

	module.exports = require("get-pixels");

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var CVUtils = __webpack_require__(5),
	    Ndarray = __webpack_require__(66),
	    Interp2D = __webpack_require__(67).d2;
	
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
/* 66 */
/***/ function(module, exports) {

	module.exports = require("ndarray");

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = require("ndarray-linear-interpolate");

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzk2ZGRlYTczZWY3NWIxMzA1NjYiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3F1YWdnYS5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvdHlwZWRlZnMuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2ltYWdlX3dyYXBwZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3N1YkltYWdlLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jdl91dGlscy5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvY2x1c3Rlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJnbC1tYXRyaXhcIiIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvYXJyYXlfaGVscGVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9iYXJjb2RlX2xvY2F0b3IuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3Jhc3Rlcml6ZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3RyYWNlci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvc2tlbGV0b25pemVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9pbWFnZV9kZWJ1Zy5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvYmFyY29kZV9kZWNvZGVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9icmVzZW5oYW0uanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvZGVfMTI4X3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvYmFyY29kZV9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2Vhbl9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvZGVfMzlfcmVhZGVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jb2RlXzM5X3Zpbl9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvZGFiYXJfcmVhZGVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy91cGNfcmVhZGVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9lYW5fOF9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3VwY19lX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvaTJvZjVfcmVhZGVyLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL29iamVjdC9tZXJnZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlTWVyZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYXJyYXlFYWNoLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2Jhc2VNZXJnZURlZXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYXJyYXlDb3B5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvaXNBcmd1bWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNBcnJheUxpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvZ2V0TGVuZ3RoLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2Jhc2VQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9pc0xlbmd0aC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbGFuZy9pc0FycmF5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2dldE5hdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9sYW5nL2lzTmF0aXZlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvaXNGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9sYW5nL2lzT2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvaXNQbGFpbk9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlRm9ySW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZUZvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9jcmVhdGVCYXNlRm9yLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL3RvT2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL29iamVjdC9rZXlzSW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNJbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9sYW5nL2lzVHlwZWRBcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9sYW5nL3RvUGxhaW5PYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZUNvcHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvb2JqZWN0L2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvc2hpbUtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvY3JlYXRlQXNzaWduZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYmluZENhbGxiYWNrLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL3V0aWxpdHkvaWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNJdGVyYXRlZUNhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvZnVuY3Rpb24vcmVzdFBhcmFtLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvY2FtZXJhX2FjY2Vzcy5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvcmVzdWx0X2NvbGxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9saWIvaW5wdXRfc3RyZWFtLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImdldC1waXhlbHNcIiIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9saWIvZnJhbWVfZ3JhYmJlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZGFycmF5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmRhcnJheS1saW5lYXItaW50ZXJwb2xhdGVcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUNDdENxQixDQUFZOzs7Ozs7MENBQ1IsQ0FBaUI7Ozs7NENBQ2YsQ0FBbUI7Ozs7NENBQ25CLEVBQW1COzs7O29DQUMzQixFQUFVOzs7O21DQUNWLEVBQVU7Ozs7MENBQ0osRUFBaUI7Ozs7d0NBQ25CLEVBQWU7Ozs7cUNBQ25CLENBQVc7OzZDQUNGLEVBQW9COzs7O0FBRWhELEtBQU0sS0FBSyxHQUFHLG1CQUFPLENBQUMsRUFB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QUFDO0FBQ2hDLFNBQUksTUFBTSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2pDLFNBQUksaUJBQWlCLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQztBQUM3QyxTQUFJLEdBQUcsR0FBRyxDQUFDO1NBQUUsQ0FBQztTQUFFLENBQUM7U0FBRSxNQUFNLEdBQUcsQ0FBQztTQUFFLENBQUM7U0FBRSxDQUFDO1NBQUUsQ0FBQztTQUFFLENBQUM7U0FBRSxHQUFHO1NBQUUsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7O0FBRzNGLFVBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzNCLGNBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3pCLHVCQUFVLENBQUcsQ0FBQyxHQUFJLEtBQUssR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEMsdUJBQVUsQ0FBRSxDQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUksQ0FBQyxJQUFJLEtBQUssR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7VUFDcEQ7TUFDSjs7O0FBR0QsVUFBTSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3hDLGNBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzNCLHVCQUFVLENBQUcsQ0FBQyxHQUFJLEtBQUssR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEMsdUJBQVUsQ0FBRyxDQUFDLEdBQUksS0FBSyxJQUFLLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7VUFDbkQ7TUFDSjs7QUFF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LENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FDckMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUNyQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQ3JDLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FDM0MsS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUMzQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFDNUMsS0FBSyxHQUFHLFVBQVUsQ0FBRSxZQUFZLEdBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUMxQyxLQUFLLEdBQUcsVUFBVSxDQUFFLFlBQVksR0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQzFDLEtBQUssR0FBRyxVQUFVLENBQUUsWUFBWSxHQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUMzQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQzlDLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FDOUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLEdBQUksQ0FBQyxDQUFDLENBQUM7QUFDM0Qsc0JBQVMsRUFBRSxDQUFDO0FBQ1osc0JBQVMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLHlCQUFZLEdBQUcsWUFBWSxHQUFHLENBQUMsQ0FBQztVQUNuQztBQUNELGtCQUFTLEdBQUcsU0FBUyxH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VixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDVCxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFFLENBQUMsR0FBRyxFQUFFLEdBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3hDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztTQUNULENBQUMsR0FBRyxDQUFDO1NBQ0wsQ0FBQyxHQUFHLENBQUM7U0FDTCxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVWLFFBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztBQUV2QixTQUFJLENBQUMsR0FBRyxFQUFFLEVBQUU7QUFDUixVQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ04sVUFBQyxHQUFHLENBQUMsQ0FBQztNQUNULE1BQU0sSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFO0FBQ2hCLFVBQUMsR0FBRyxDQUFDLENBQUM7QUFDTixVQUFDLEdBQUcsQ0FBQyxDQUFDO01BQ1QsTUFBTSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUU7QUFDaEIsVUFBQyxHQUFHLENBQUMsQ0FBQztBQUNOLFVBQUMsR0FBRyxDQUFDLENBQUM7TUFDVCxNQUFNLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRTtBQUNoQixVQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ04sVUFBQyxHQUFHLENBQUMsQ0FBQztNQUNULE1BQU0sSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFO0FBQ2hCLFVBQUMsR0FBRyxDQUFDLENBQUM7QUFDTixVQUFDLEdBQUcsQ0FBQyxDQUFDO01BQ1QsTUFBTSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUU7QUFDaEIsVUFBQyxHQUFHLENBQUMsQ0FBQztBQUNOLFVBQUMsR0FBRyxDQUFDLENBQUM7TUFDVDtBQUNELFFBQUcsQ0FBQyxDQUFDLENBQUMsR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFJLENBQUMsQ0FBQztBQUM3QixRQUFHLENBQUMsQ0FB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LEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FB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LENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQztBQUN6RCxpQkFBWSxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQztBQUN4RCxtQkFBYyxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQztBQUNoRixpQkFBWSxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDZixFQUFDO0FBQ0YsbUJBQWMsRUFBRSxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDO0FBQ2hFLHNCQUFpQixFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQztBQUNoQyxtQkFBYyxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQztBQUM3QixXQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUM7RUFDOUMsQ0FBQzs7QUFFRixVQUFTLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsNEJBQWMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FB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LEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFDN0csRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDO0FBQ3BGLHdCQUFtQixFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQzVHLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFDOUcsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUNqSCxFQUFDO0FBQ0YsYUFBUSxFQUFFLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQztBQUN4QixXQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUM7RUFDL0MsQ0FBQzs7QUFFRixhQUFZLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsNEJBQWMsU0FBUyxFQUFFLFVBQVUsQ0FB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QUssQ0FBQztFQUNoQixDQUFDOztBQUVGLE9BQU0sQ0FBQyxPQUFPLEdBQUcsWUFBWSxDOzs7Ozs7QUM5RjdCLHFDOzs7Ozs7QUNBQSx3RCIsImZpbGUiOiJxdWFnZ2EuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBjOTZkZGVhNzNlZjc1YjEzMDU2NlxuICoqLyIsImltcG9ydCBUeXBlRGVmcyBmcm9tICcuL3R5cGVkZWZzJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG5pbXBvcnQgSW1hZ2VXcmFwcGVyIGZyb20gJy4vaW1hZ2Vfd3JhcHBlcic7XHJcbmltcG9ydCBCYXJjb2RlTG9jYXRvciBmcm9tICcuL2JhcmNvZGVfbG9jYXRvcic7XHJcbmltcG9ydCBCYXJjb2RlRGVjb2RlciBmcm9tICcuL2JhcmNvZGVfZGVjb2Rlcic7XHJcbmltcG9ydCBDb25maWcgZnJvbSAnLi9jb25maWcnO1xyXG5pbXBvcnQgRXZlbnRzIGZyb20gJy4vZXZlbnRzJztcclxuaW1wb3J0IENhbWVyYUFjY2VzcyBmcm9tICcuL2NhbWVyYV9hY2Nlc3MnO1xyXG5pbXBvcnQgSW1hZ2VEZWJ1ZyBmcm9tICcuL2ltYWdlX2RlYnVnJztcclxuaW1wb3J0IHt2ZWMyfSBmcm9tICdnbC1tYXRyaXgnO1xyXG5pbXBvcnQgUmVzdWx0Q29sbGVjdG9yIGZyb20gJy4vcmVzdWx0X2NvbGxlY3Rvcic7XHJcblxyXG5jb25zdCBtZXJnZSA9IHJlcXVpcmUoJ2xvZGFzaC9vYmplY3QvbWVyZ2UnKTtcclxuY29uc3QgSW5wdXRTdHJlYW0gPSByZXF1aXJlKCdpbnB1dF9zdHJlYW0nKTtcclxuY29uc3QgRnJhbWVHcmFiYmVyID0gcmVxdWlyZSgnZnJhbWVfZ3JhYmJlcicpO1xyXG5cclxudmFyIF9pbnB1dFN0cmVhbSxcclxuICAgIF9mcmFtZWdyYWJiZXIsXHJcbiAgICBfc3RvcHBlZCxcclxuICAgIF9jYW52YXNDb250YWluZXIgPSB7XHJcbiAgICAgICAgY3R4OiB7XHJcbiAgICAgICAgICAgIGltYWdlOiBudWxsLFxyXG4gICAgICAgICAgICBvdmVybGF5OiBudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkb206IHtcclxuICAgICAgICAgICAgaW1hZ2U6IG51bGwsXHJcbiAgICAgICAgICAgIG92ZXJsYXk6IG51bGxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgX2lucHV0SW1hZ2VXcmFwcGVyLFxyXG4gICAgX2JveFNpemUsXHJcbiAgICBfZGVjb2RlcixcclxuICAgIF93b3JrZXJQb29sID0gW10sXHJcbiAgICBfb25VSVRocmVhZCA9IHRydWUsXHJcbiAgICBfcmVzdWx0Q29sbGVjdG9yLFxyXG4gICAgX2NvbmZpZyA9IHt9O1xyXG5cclxuZnVuY3Rpb24gaW5pdGlhbGl6ZURhdGEoaW1hZ2VXcmFwcGVyKSB7XHJcbiAgICBpbml0QnVmZmVycyhpbWFnZVdyYXBwZXIpO1xyXG4gICAgX2RlY29kZXIgPSBCYXJjb2RlRGVjb2Rlci5jcmVhdGUoX2NvbmZpZy5kZWNvZGVyLCBfaW5wdXRJbWFnZVdyYXBwZXIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0SW5wdXRTdHJlYW0oY2IpIHtcclxuICAgIHZhciB2aWRlbztcclxuICAgIGlmIChfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09IFwiVmlkZW9TdHJlYW1cIikge1xyXG4gICAgICAgIHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInZpZGVvXCIpO1xyXG4gICAgICAgIF9pbnB1dFN0cmVhbSA9IElucHV0U3RyZWFtLmNyZWF0ZVZpZGVvU3RyZWFtKHZpZGVvKTtcclxuICAgIH0gZWxzZSBpZiAoX2NvbmZpZy5pbnB1dFN0cmVhbS50eXBlID09PSBcIkltYWdlU3RyZWFtXCIpIHtcclxuICAgICAgICBfaW5wdXRTdHJlYW0gPSBJbnB1dFN0cmVhbS5jcmVhdGVJbWFnZVN0cmVhbSgpO1xyXG4gICAgfSBlbHNlIGlmIChfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09IFwiTGl2ZVN0cmVhbVwiKSB7XHJcbiAgICAgICAgdmFyICR2aWV3cG9ydCA9IGdldFZpZXdQb3J0KCk7XHJcbiAgICAgICAgaWYgKCR2aWV3cG9ydCkge1xyXG4gICAgICAgICAgICB2aWRlbyA9ICR2aWV3cG9ydC5xdWVyeVNlbGVjdG9yKFwidmlkZW9cIik7XHJcbiAgICAgICAgICAgIGlmICghdmlkZW8pIHtcclxuICAgICAgICAgICAgICAgIHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInZpZGVvXCIpO1xyXG4gICAgICAgICAgICAgICAgJHZpZXdwb3J0LmFwcGVuZENoaWxkKHZpZGVvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBfaW5wdXRTdHJlYW0gPSBJbnB1dFN0cmVhbS5jcmVhdGVMaXZlU3RyZWFtKHZpZGVvKTtcclxuICAgICAgICBDYW1lcmFBY2Nlc3MucmVxdWVzdCh2aWRlbywgX2NvbmZpZy5pbnB1dFN0cmVhbS5jb25zdHJhaW50cywgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgIGlmICghZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBfaW5wdXRTdHJlYW0udHJpZ2dlcihcImNhbnJlY29yZFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYihlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2lucHV0U3RyZWFtLnNldEF0dHJpYnV0ZShcInByZWxvYWRcIiwgXCJhdXRvXCIpO1xyXG4gICAgX2lucHV0U3RyZWFtLnNldEF0dHJpYnV0ZShcImF1dG9wbGF5XCIsIHRydWUpO1xyXG4gICAgX2lucHV0U3RyZWFtLnNldElucHV0U3RyZWFtKF9jb25maWcuaW5wdXRTdHJlYW0pO1xyXG4gICAgX2lucHV0U3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5yZWNvcmRcIiwgY2FuUmVjb3JkLmJpbmQodW5kZWZpbmVkLCBjYikpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRWaWV3UG9ydCgpIHtcclxuICAgIHZhciB0YXJnZXQgPSBfY29uZmlnLmlucHV0U3RyZWFtLnRhcmdldDtcclxuICAgIC8vIENoZWNrIGlmIHRhcmdldCBpcyBhbHJlYWR5IGEgRE9NIGVsZW1lbnRcclxuICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0Lm5vZGVOYW1lICYmIHRhcmdldC5ub2RlVHlwZSA9PT0gMSkge1xyXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFVzZSAnI2ludGVyYWN0aXZlLnZpZXdwb3J0JyBhcyBhIGZhbGxiYWNrIHNlbGVjdG9yIChiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSlcclxuICAgICAgICB2YXIgc2VsZWN0b3IgPSB0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJyA/IHRhcmdldCA6ICcjaW50ZXJhY3RpdmUudmlld3BvcnQnO1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2FuUmVjb3JkKGNiKSB7XHJcbiAgICBCYXJjb2RlTG9jYXRvci5jaGVja0ltYWdlQ29uc3RyYWludHMoX2lucHV0U3RyZWFtLCBfY29uZmlnLmxvY2F0b3IpO1xyXG4gICAgaW5pdENhbnZhcyhfY29uZmlnKTtcclxuICAgIF9mcmFtZWdyYWJiZXIgPSBGcmFtZUdyYWJiZXIuY3JlYXRlKF9pbnB1dFN0cmVhbSwgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UpO1xyXG5cclxuICAgIGlmIChfY29uZmlnLm51bU9mV29ya2VycyA+IDApIHtcclxuICAgICAgICBpbml0V29ya2VycyhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXb3JrZXJzIGNyZWF0ZWRcIik7XHJcbiAgICAgICAgICAgIHJlYWR5KGNiKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5pdGlhbGl6ZURhdGEoKTtcclxuICAgICAgICByZWFkeShjYik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWR5KGNiKXtcclxuICAgIF9pbnB1dFN0cmVhbS5wbGF5KCk7XHJcbiAgICBjYigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0Q2FudmFzKCkge1xyXG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIHZhciAkdmlld3BvcnQgPSBnZXRWaWV3UG9ydCgpO1xyXG4gICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhcy5pbWdCdWZmZXJcIik7XHJcbiAgICAgICAgaWYgKCFfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZSkge1xyXG4gICAgICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlLmNsYXNzTmFtZSA9IFwiaW1nQnVmZmVyXCI7XHJcbiAgICAgICAgICAgIGlmICgkdmlld3BvcnQgJiYgX2NvbmZpZy5pbnB1dFN0cmVhbS50eXBlID09PSBcIkltYWdlU3RyZWFtXCIpIHtcclxuICAgICAgICAgICAgICAgICR2aWV3cG9ydC5hcHBlbmRDaGlsZChfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5jdHguaW1hZ2UgPSBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2Uud2lkdGggPSBfaW5wdXRTdHJlYW0uZ2V0Q2FudmFzU2l6ZSgpLng7XHJcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UuaGVpZ2h0ID0gX2lucHV0U3RyZWFtLmdldENhbnZhc1NpemUoKS55O1xyXG5cclxuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhcy5kcmF3aW5nQnVmZmVyXCIpO1xyXG4gICAgICAgIGlmICghX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheSkge1xyXG4gICAgICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheS5jbGFzc05hbWUgPSBcImRyYXdpbmdCdWZmZXJcIjtcclxuICAgICAgICAgICAgaWYgKCR2aWV3cG9ydCkge1xyXG4gICAgICAgICAgICAgICAgJHZpZXdwb3J0LmFwcGVuZENoaWxkKF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBjbGVhckZpeCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKTtcclxuICAgICAgICAgICAgY2xlYXJGaXguc2V0QXR0cmlidXRlKFwiY2xlYXJcIiwgXCJhbGxcIik7XHJcbiAgICAgICAgICAgIGlmICgkdmlld3BvcnQpIHtcclxuICAgICAgICAgICAgICAgICR2aWV3cG9ydC5hcHBlbmRDaGlsZChjbGVhckZpeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5jdHgub3ZlcmxheSA9IF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkud2lkdGggPSBfaW5wdXRTdHJlYW0uZ2V0Q2FudmFzU2l6ZSgpLng7XHJcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheS5oZWlnaHQgPSBfaW5wdXRTdHJlYW0uZ2V0Q2FudmFzU2l6ZSgpLnk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRCdWZmZXJzKGltYWdlV3JhcHBlcikge1xyXG4gICAgaWYgKGltYWdlV3JhcHBlcikge1xyXG4gICAgICAgIF9pbnB1dEltYWdlV3JhcHBlciA9IGltYWdlV3JhcHBlcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX2lucHV0SW1hZ2VXcmFwcGVyID0gbmV3IEltYWdlV3JhcHBlcih7XHJcbiAgICAgICAgICAgIHg6IF9pbnB1dFN0cmVhbS5nZXRXaWR0aCgpLFxyXG4gICAgICAgICAgICB5OiBfaW5wdXRTdHJlYW0uZ2V0SGVpZ2h0KClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZSk7XHJcbiAgICBfYm94U2l6ZSA9IFtcclxuICAgICAgICB2ZWMyLmNsb25lKFswLCAwXSksXHJcbiAgICAgICAgdmVjMi5jbG9uZShbMCwgX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUueV0pLFxyXG4gICAgICAgIHZlYzIuY2xvbmUoW19pbnB1dEltYWdlV3JhcHBlci5zaXplLngsIF9pbnB1dEltYWdlV3JhcHBlci5zaXplLnldKSxcclxuICAgICAgICB2ZWMyLmNsb25lKFtfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS54LCAwXSlcclxuICAgIF07XHJcbiAgICBCYXJjb2RlTG9jYXRvci5pbml0KF9pbnB1dEltYWdlV3JhcHBlciwgX2NvbmZpZy5sb2NhdG9yKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Qm91bmRpbmdCb3hlcygpIHtcclxuICAgIGlmIChfY29uZmlnLmxvY2F0ZSkge1xyXG4gICAgICAgIHJldHVybiBCYXJjb2RlTG9jYXRvci5sb2NhdGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFtbXHJcbiAgICAgICAgICAgIHZlYzIuY2xvbmUoX2JveFNpemVbMF0pLFxyXG4gICAgICAgICAgICB2ZWMyLmNsb25lKF9ib3hTaXplWzFdKSxcclxuICAgICAgICAgICAgdmVjMi5jbG9uZShfYm94U2l6ZVsyXSksXHJcbiAgICAgICAgICAgIHZlYzIuY2xvbmUoX2JveFNpemVbM10pXV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRyYW5zZm9ybVJlc3VsdChyZXN1bHQpIHtcclxuICAgIHZhciB0b3BSaWdodCA9IF9pbnB1dFN0cmVhbS5nZXRUb3BSaWdodCgpLFxyXG4gICAgICAgIHhPZmZzZXQgPSB0b3BSaWdodC54LFxyXG4gICAgICAgIHlPZmZzZXQgPSB0b3BSaWdodC55LFxyXG4gICAgICAgIGk7XHJcblxyXG4gICAgaWYgKHhPZmZzZXQgPT09IDAgJiYgeU9mZnNldCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzdWx0LmJhcmNvZGVzKSB7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHJlc3VsdC5iYXJjb2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm1SZXN1bHQocmVzdWx0LmJhcmNvZGVzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlc3VsdC5saW5lICYmIHJlc3VsdC5saW5lLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgIG1vdmVMaW5lKHJlc3VsdC5saW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzdWx0LmJveCkge1xyXG4gICAgICAgIG1vdmVCb3gocmVzdWx0LmJveCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlc3VsdC5ib3hlcyAmJiByZXN1bHQuYm94ZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCByZXN1bHQuYm94ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbW92ZUJveChyZXN1bHQuYm94ZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb3ZlQm94KGJveCkge1xyXG4gICAgICAgIHZhciBjb3JuZXIgPSBib3gubGVuZ3RoO1xyXG5cclxuICAgICAgICB3aGlsZSAoY29ybmVyLS0pIHtcclxuICAgICAgICAgICAgYm94W2Nvcm5lcl1bMF0gKz0geE9mZnNldDtcclxuICAgICAgICAgICAgYm94W2Nvcm5lcl1bMV0gKz0geU9mZnNldDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW92ZUxpbmUobGluZSkge1xyXG4gICAgICAgIGxpbmVbMF0ueCArPSB4T2Zmc2V0O1xyXG4gICAgICAgIGxpbmVbMF0ueSArPSB5T2Zmc2V0O1xyXG4gICAgICAgIGxpbmVbMV0ueCArPSB4T2Zmc2V0O1xyXG4gICAgICAgIGxpbmVbMV0ueSArPSB5T2Zmc2V0O1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRSZXN1bHQgKHJlc3VsdCwgaW1hZ2VEYXRhKSB7XHJcbiAgICBpZiAoIWltYWdlRGF0YSB8fCAhX3Jlc3VsdENvbGxlY3Rvcikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzdWx0LmJhcmNvZGVzKSB7XHJcbiAgICAgICAgcmVzdWx0LmJhcmNvZGVzLmZpbHRlcihiYXJjb2RlID0+IGJhcmNvZGUuY29kZVJlc3VsdClcclxuICAgICAgICAgICAgLmZvckVhY2goYmFyY29kZSA9PiBhZGRSZXN1bHQoYmFyY29kZSwgaW1hZ2VEYXRhKSk7XHJcbiAgICB9IGVsc2UgaWYgKHJlc3VsdC5jb2RlUmVzdWx0KSB7XHJcbiAgICAgICAgX3Jlc3VsdENvbGxlY3Rvci5hZGRSZXN1bHQoaW1hZ2VEYXRhLCBfaW5wdXRTdHJlYW0uZ2V0Q2FudmFzU2l6ZSgpLCByZXN1bHQuY29kZVJlc3VsdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhc0NvZGVSZXN1bHQgKHJlc3VsdCkge1xyXG4gICAgcmV0dXJuIHJlc3VsdCAmJiAocmVzdWx0LmJhcmNvZGVzID9cclxuICAgICAgcmVzdWx0LmJhcmNvZGVzLnNvbWUoYmFyY29kZSA9PiBiYXJjb2RlLmNvZGVSZXN1bHQpIDpcclxuICAgICAgcmVzdWx0LmNvZGVSZXN1bHQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwdWJsaXNoUmVzdWx0KHJlc3VsdCwgaW1hZ2VEYXRhKSB7XHJcbiAgICBjb25zdCByZXN1bHRUb1B1Ymxpc2ggPSByZXN1bHQgJiYgKHJlc3VsdC5iYXJjb2RlcyB8fCByZXN1bHQpO1xyXG5cclxuICAgIGlmIChyZXN1bHQgJiYgX29uVUlUaHJlYWQpIHtcclxuICAgICAgICB0cmFuc2Zvcm1SZXN1bHQocmVzdWx0KTtcclxuICAgICAgICBhZGRSZXN1bHQocmVzdWx0LCBpbWFnZURhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIEV2ZW50cy5wdWJsaXNoKFwicHJvY2Vzc2VkXCIsIHJlc3VsdFRvUHVibGlzaCk7XHJcbiAgICBpZiAoaGFzQ29kZVJlc3VsdChyZXN1bHQpKSB7XHJcbiAgICAgICAgRXZlbnRzLnB1Ymxpc2goXCJkZXRlY3RlZFwiLCByZXN1bHRUb1B1Ymxpc2gpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsb2NhdGVBbmREZWNvZGUoKSB7XHJcbiAgICB2YXIgcmVzdWx0LFxyXG4gICAgICAgIGJveGVzO1xyXG5cclxuICAgIGJveGVzID0gZ2V0Qm91bmRpbmdCb3hlcygpO1xyXG4gICAgaWYgKGJveGVzKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gX2RlY29kZXIuZGVjb2RlRnJvbUJvdW5kaW5nQm94ZXMoYm94ZXMpO1xyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCB7fTtcclxuICAgICAgICByZXN1bHQuYm94ZXMgPSBib3hlcztcclxuICAgICAgICBwdWJsaXNoUmVzdWx0KHJlc3VsdCwgX2lucHV0SW1hZ2VXcmFwcGVyLmRhdGEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwdWJsaXNoUmVzdWx0KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZSgpIHtcclxuICAgIHZhciBhdmFpbGFibGVXb3JrZXI7XHJcblxyXG4gICAgaWYgKF9vblVJVGhyZWFkKSB7XHJcbiAgICAgICAgaWYgKF93b3JrZXJQb29sLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgYXZhaWxhYmxlV29ya2VyID0gX3dvcmtlclBvb2wuZmlsdGVyKGZ1bmN0aW9uKHdvcmtlclRocmVhZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICF3b3JrZXJUaHJlYWQuYnVzeTtcclxuICAgICAgICAgICAgfSlbMF07XHJcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGVXb3JrZXIpIHtcclxuICAgICAgICAgICAgICAgIF9mcmFtZWdyYWJiZXIuYXR0YWNoRGF0YShhdmFpbGFibGVXb3JrZXIuaW1hZ2VEYXRhKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gYWxsIHdvcmtlcnMgYXJlIGJ1c3lcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIF9mcmFtZWdyYWJiZXIuYXR0YWNoRGF0YShfaW5wdXRJbWFnZVdyYXBwZXIuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChfZnJhbWVncmFiYmVyLmdyYWIoKSkge1xyXG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlV29ya2VyKSB7XHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVXb3JrZXIuYnVzeSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVXb3JrZXIud29ya2VyLnBvc3RNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICBjbWQ6ICdwcm9jZXNzJyxcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZURhdGE6IGF2YWlsYWJsZVdvcmtlci5pbWFnZURhdGFcclxuICAgICAgICAgICAgICAgIH0sIFthdmFpbGFibGVXb3JrZXIuaW1hZ2VEYXRhLmJ1ZmZlcl0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRlQW5kRGVjb2RlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxvY2F0ZUFuZERlY29kZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFydCgpIHtcclxuICAgIF9zdG9wcGVkID0gZmFsc2U7XHJcbiAgICAoIGZ1bmN0aW9uIGZyYW1lKCkge1xyXG4gICAgICAgIGlmICghX3N0b3BwZWQpIHtcclxuICAgICAgICAgICAgdXBkYXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChfb25VSVRocmVhZCAmJiBfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09IFwiTGl2ZVN0cmVhbVwiKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1GcmFtZShmcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0V29ya2VycyhjYikge1xyXG4gICAgdmFyIGk7XHJcbiAgICBfd29ya2VyUG9vbCA9IFtdO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBfY29uZmlnLm51bU9mV29ya2VyczsgaSsrKSB7XHJcbiAgICAgICAgaW5pdFdvcmtlcih3b3JrZXJJbml0aWFsaXplZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gd29ya2VySW5pdGlhbGl6ZWQod29ya2VyVGhyZWFkKSB7XHJcbiAgICAgICAgX3dvcmtlclBvb2wucHVzaCh3b3JrZXJUaHJlYWQpO1xyXG4gICAgICAgIGlmIChfd29ya2VyUG9vbC5sZW5ndGggPj0gX2NvbmZpZy5udW1PZldvcmtlcnMpe1xyXG4gICAgICAgICAgICBjYigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFdvcmtlcihjYikge1xyXG4gICAgdmFyIGJsb2JVUkwsXHJcbiAgICAgICAgd29ya2VyVGhyZWFkID0ge1xyXG4gICAgICAgICAgICB3b3JrZXI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgaW1hZ2VEYXRhOiBuZXcgVWludDhBcnJheShfaW5wdXRTdHJlYW0uZ2V0V2lkdGgoKSAqIF9pbnB1dFN0cmVhbS5nZXRIZWlnaHQoKSksXHJcbiAgICAgICAgICAgIGJ1c3k6IHRydWVcclxuICAgICAgICB9O1xyXG5cclxuICAgIGJsb2JVUkwgPSBnZW5lcmF0ZVdvcmtlckJsb2IoKTtcclxuICAgIHdvcmtlclRocmVhZC53b3JrZXIgPSBuZXcgV29ya2VyKGJsb2JVUkwpO1xyXG5cclxuICAgIHdvcmtlclRocmVhZC53b3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmIChlLmRhdGEuZXZlbnQgPT09ICdpbml0aWFsaXplZCcpIHtcclxuICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChibG9iVVJMKTtcclxuICAgICAgICAgICAgd29ya2VyVGhyZWFkLmJ1c3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgd29ya2VyVGhyZWFkLmltYWdlRGF0YSA9IG5ldyBVaW50OEFycmF5KGUuZGF0YS5pbWFnZURhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldvcmtlciBpbml0aWFsaXplZFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNiKHdvcmtlclRocmVhZCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlLmRhdGEuZXZlbnQgPT09ICdwcm9jZXNzZWQnKSB7XHJcbiAgICAgICAgICAgIHdvcmtlclRocmVhZC5pbWFnZURhdGEgPSBuZXcgVWludDhBcnJheShlLmRhdGEuaW1hZ2VEYXRhKTtcclxuICAgICAgICAgICAgd29ya2VyVGhyZWFkLmJ1c3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgcHVibGlzaFJlc3VsdChlLmRhdGEucmVzdWx0LCB3b3JrZXJUaHJlYWQuaW1hZ2VEYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGUuZGF0YS5ldmVudCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldvcmtlciBlcnJvcjogXCIgKyBlLmRhdGEubWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB3b3JrZXJUaHJlYWQud29ya2VyLnBvc3RNZXNzYWdlKHtcclxuICAgICAgICBjbWQ6ICdpbml0JyxcclxuICAgICAgICBzaXplOiB7eDogX2lucHV0U3RyZWFtLmdldFdpZHRoKCksIHk6IF9pbnB1dFN0cmVhbS5nZXRIZWlnaHQoKX0sXHJcbiAgICAgICAgaW1hZ2VEYXRhOiB3b3JrZXJUaHJlYWQuaW1hZ2VEYXRhLFxyXG4gICAgICAgIGNvbmZpZzogX2NvbmZpZ1xyXG4gICAgfSwgW3dvcmtlclRocmVhZC5pbWFnZURhdGEuYnVmZmVyXSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiB3b3JrZXJJbnRlcmZhY2UoZmFjdG9yeSkge1xyXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYqL1xyXG4gICAgaWYgKGZhY3RvcnkpIHtcclxuICAgICAgICB2YXIgUXVhZ2dhID0gZmFjdG9yeSgpO1xyXG4gICAgICAgIGlmICghUXVhZ2dhKSB7XHJcbiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeydldmVudCc6ICdlcnJvcicsIG1lc3NhZ2U6ICdRdWFnZ2EgY291bGQgbm90IGJlIGNyZWF0ZWQnfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgaW1hZ2VXcmFwcGVyO1xyXG5cclxuICAgIHNlbGYub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmIChlLmRhdGEuY21kID09PSAnaW5pdCcpIHtcclxuICAgICAgICAgICAgdmFyIGNvbmZpZyA9IGUuZGF0YS5jb25maWc7XHJcbiAgICAgICAgICAgIGNvbmZpZy5udW1PZldvcmtlcnMgPSAwO1xyXG4gICAgICAgICAgICBpbWFnZVdyYXBwZXIgPSBuZXcgUXVhZ2dhLkltYWdlV3JhcHBlcih7XHJcbiAgICAgICAgICAgICAgICB4OiBlLmRhdGEuc2l6ZS54LFxyXG4gICAgICAgICAgICAgICAgeTogZS5kYXRhLnNpemUueVxyXG4gICAgICAgICAgICB9LCBuZXcgVWludDhBcnJheShlLmRhdGEuaW1hZ2VEYXRhKSk7XHJcbiAgICAgICAgICAgIFF1YWdnYS5pbml0KGNvbmZpZywgcmVhZHksIGltYWdlV3JhcHBlcik7XHJcbiAgICAgICAgICAgIFF1YWdnYS5vblByb2Nlc3NlZChvblByb2Nlc3NlZCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlLmRhdGEuY21kID09PSAncHJvY2VzcycpIHtcclxuICAgICAgICAgICAgaW1hZ2VXcmFwcGVyLmRhdGEgPSBuZXcgVWludDhBcnJheShlLmRhdGEuaW1hZ2VEYXRhKTtcclxuICAgICAgICAgICAgUXVhZ2dhLnN0YXJ0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlLmRhdGEuY21kID09PSAnc2V0UmVhZGVycycpIHtcclxuICAgICAgICAgICAgUXVhZ2dhLnNldFJlYWRlcnMoZS5kYXRhLnJlYWRlcnMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gb25Qcm9jZXNzZWQocmVzdWx0KSB7XHJcbiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgICdldmVudCc6ICdwcm9jZXNzZWQnLFxyXG4gICAgICAgICAgICBpbWFnZURhdGE6IGltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgICAgICByZXN1bHQ6IHJlc3VsdFxyXG4gICAgICAgIH0sIFtpbWFnZVdyYXBwZXIuZGF0YS5idWZmZXJdKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZWFkeSgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeydldmVudCc6ICdpbml0aWFsaXplZCcsIGltYWdlRGF0YTogaW1hZ2VXcmFwcGVyLmRhdGF9LCBbaW1hZ2VXcmFwcGVyLmRhdGEuYnVmZmVyXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogZXNsaW50LWVuYWJsZSAqL1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZVdvcmtlckJsb2IoKSB7XHJcbiAgICB2YXIgYmxvYixcclxuICAgICAgICBmYWN0b3J5U291cmNlO1xyXG5cclxuICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cclxuICAgIGlmICh0eXBlb2YgX19mYWN0b3J5U291cmNlX18gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgZmFjdG9yeVNvdXJjZSA9IF9fZmFjdG9yeVNvdXJjZV9fOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXHJcbiAgICB9XHJcbiAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xyXG5cclxuICAgIGJsb2IgPSBuZXcgQmxvYihbJygnICsgd29ya2VySW50ZXJmYWNlLnRvU3RyaW5nKCkgKyAnKSgnICsgZmFjdG9yeVNvdXJjZSArICcpOyddLFxyXG4gICAgICAgIHt0eXBlOiAndGV4dC9qYXZhc2NyaXB0J30pO1xyXG5cclxuICAgIHJldHVybiB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0UmVhZGVycyhyZWFkZXJzKSB7XHJcbiAgICBpZiAoX2RlY29kZXIpIHtcclxuICAgICAgICBfZGVjb2Rlci5zZXRSZWFkZXJzKHJlYWRlcnMpO1xyXG4gICAgfSBlbHNlIGlmIChfb25VSVRocmVhZCAmJiBfd29ya2VyUG9vbC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgX3dvcmtlclBvb2wuZm9yRWFjaChmdW5jdGlvbih3b3JrZXJUaHJlYWQpIHtcclxuICAgICAgICAgICAgd29ya2VyVGhyZWFkLndvcmtlci5wb3N0TWVzc2FnZSh7Y21kOiAnc2V0UmVhZGVycycsIHJlYWRlcnM6IHJlYWRlcnN9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oY29uZmlnLCBjYiwgaW1hZ2VXcmFwcGVyKSB7XHJcbiAgICAgICAgX2NvbmZpZyA9IG1lcmdlKHt9LCBDb25maWcsIGNvbmZpZyk7XHJcbiAgICAgICAgaWYgKGltYWdlV3JhcHBlcikge1xyXG4gICAgICAgICAgICBfb25VSVRocmVhZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpbml0aWFsaXplRGF0YShpbWFnZVdyYXBwZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2IoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbml0SW5wdXRTdHJlYW0oY2IpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzdGFydDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc3RhcnQoKTtcclxuICAgIH0sXHJcbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBfc3RvcHBlZCA9IHRydWU7XHJcbiAgICAgICAgX3dvcmtlclBvb2wuZm9yRWFjaChmdW5jdGlvbih3b3JrZXJUaHJlYWQpIHtcclxuICAgICAgICAgICAgd29ya2VyVGhyZWFkLndvcmtlci50ZXJtaW5hdGUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXb3JrZXIgdGVybWluYXRlZCFcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgX3dvcmtlclBvb2wubGVuZ3RoID0gMDtcclxuICAgICAgICBpZiAoX2NvbmZpZy5pbnB1dFN0cmVhbS50eXBlID09PSBcIkxpdmVTdHJlYW1cIikge1xyXG4gICAgICAgICAgICBDYW1lcmFBY2Nlc3MucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICBfaW5wdXRTdHJlYW0uY2xlYXJFdmVudEhhbmRsZXJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhdXNlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBfc3RvcHBlZCA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgb25EZXRlY3RlZDogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuICAgICAgICBFdmVudHMuc3Vic2NyaWJlKFwiZGV0ZWN0ZWRcIiwgY2FsbGJhY2spO1xyXG4gICAgfSxcclxuICAgIG9mZkRldGVjdGVkOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgIEV2ZW50cy51bnN1YnNjcmliZShcImRldGVjdGVkXCIsIGNhbGxiYWNrKTtcclxuICAgIH0sXHJcbiAgICBvblByb2Nlc3NlZDogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuICAgICAgICBFdmVudHMuc3Vic2NyaWJlKFwicHJvY2Vzc2VkXCIsIGNhbGxiYWNrKTtcclxuICAgIH0sXHJcbiAgICBvZmZQcm9jZXNzZWQ6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgRXZlbnRzLnVuc3Vic2NyaWJlKFwicHJvY2Vzc2VkXCIsIGNhbGxiYWNrKTtcclxuICAgIH0sXHJcbiAgICBzZXRSZWFkZXJzOiBmdW5jdGlvbihyZWFkZXJzKSB7XHJcbiAgICAgICAgc2V0UmVhZGVycyhyZWFkZXJzKTtcclxuICAgIH0sXHJcbiAgICByZWdpc3RlclJlc3VsdENvbGxlY3RvcjogZnVuY3Rpb24ocmVzdWx0Q29sbGVjdG9yKSB7XHJcbiAgICAgICAgaWYgKHJlc3VsdENvbGxlY3RvciAmJiB0eXBlb2YgcmVzdWx0Q29sbGVjdG9yLmFkZFJlc3VsdCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBfcmVzdWx0Q29sbGVjdG9yID0gcmVzdWx0Q29sbGVjdG9yO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjYW52YXM6IF9jYW52YXNDb250YWluZXIsXHJcbiAgICBkZWNvZGVTaW5nbGU6IGZ1bmN0aW9uKGNvbmZpZywgcmVzdWx0Q2FsbGJhY2spIHtcclxuICAgICAgICBjb25maWcgPSBtZXJnZSh7XHJcbiAgICAgICAgICAgIGlucHV0U3RyZWFtOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkltYWdlU3RyZWFtXCIsXHJcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzaXplOiA4MDAsXHJcbiAgICAgICAgICAgICAgICBzcmM6IGNvbmZpZy5zcmNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbnVtT2ZXb3JrZXJzOiAxLFxyXG4gICAgICAgICAgICBsb2NhdG9yOiB7XHJcbiAgICAgICAgICAgICAgICBoYWxmU2FtcGxlOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgY29uZmlnKTtcclxuICAgICAgICB0aGlzLmluaXQoY29uZmlnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgRXZlbnRzLm9uY2UoXCJwcm9jZXNzZWRcIiwgZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBfc3RvcHBlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRDYWxsYmFjay5jYWxsKG51bGwsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0sIHRydWUpO1xyXG4gICAgICAgICAgICBzdGFydCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIEltYWdlV3JhcHBlcjogSW1hZ2VXcmFwcGVyLFxyXG4gICAgSW1hZ2VEZWJ1ZzogSW1hZ2VEZWJ1ZyxcclxuICAgIFJlc3VsdENvbGxlY3RvcjogUmVzdWx0Q29sbGVjdG9yXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL3F1YWdnYS5qc1xuICoqLyIsIi8qXHJcbiAqIHR5cGVkZWZzLmpzXHJcbiAqIE5vcm1hbGl6ZXMgYnJvd3Nlci1zcGVjaWZpYyBwcmVmaXhlc1xyXG4gKi9cclxuXHJcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKC8qIGZ1bmN0aW9uIEZyYW1lUmVxdWVzdENhbGxiYWNrICovIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcclxuICAgICAgICAgICAgfTtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgfHxcclxuICAgICAgICBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhIHx8IG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEgfHwgbmF2aWdhdG9yLm1zR2V0VXNlck1lZGlhO1xyXG4gICAgd2luZG93LlVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTCB8fCB3aW5kb3cubW96VVJMIHx8IHdpbmRvdy5tc1VSTDtcclxufVxyXG5NYXRoLmltdWwgPSBNYXRoLmltdWwgfHwgZnVuY3Rpb24oYSwgYikge1xyXG4gICAgdmFyIGFoID0gKGEgPj4+IDE2KSAmIDB4ZmZmZixcclxuICAgICAgICBhbCA9IGEgJiAweGZmZmYsXHJcbiAgICAgICAgYmggPSAoYiA+Pj4gMTYpICYgMHhmZmZmLFxyXG4gICAgICAgIGJsID0gYiAmIDB4ZmZmZjtcclxuICAgIC8vIHRoZSBzaGlmdCBieSAwIGZpeGVzIHRoZSBzaWduIG9uIHRoZSBoaWdoIHBhcnRcclxuICAgIC8vIHRoZSBmaW5hbCB8MCBjb252ZXJ0cyB0aGUgdW5zaWduZWQgdmFsdWUgaW50byBhIHNpZ25lZCB2YWx1ZVxyXG4gICAgcmV0dXJuICgoYWwgKiBibCkgKyAoKChhaCAqIGJsICsgYWwgKiBiaCkgPDwgMTYpID4+PiAwKSB8IDApO1xyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy90eXBlZGVmcy5qc1xuICoqLyIsImltcG9ydCBTdWJJbWFnZSBmcm9tICcuL3N1YkltYWdlJztcclxuaW1wb3J0IENWVXRpbHMgZnJvbSAnLi9jdl91dGlscyc7XHJcbmltcG9ydCBBcnJheUhlbHBlciBmcm9tICcuL2FycmF5X2hlbHBlcic7XHJcbmltcG9ydCB7dmVjMn0gZnJvbSAnZ2wtbWF0cml4JztcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGEgYmFzaWMgaW1hZ2UgY29tYmluaW5nIHRoZSBkYXRhIGFuZCBzaXplLlxyXG4gKiBJbiBhZGRpdGlvbiwgc29tZSBtZXRob2RzIGZvciBtYW5pcHVsYXRpb24gYXJlIGNvbnRhaW5lZC5cclxuICogQHBhcmFtIHNpemUge3gseX0gVGhlIHNpemUgb2YgdGhlIGltYWdlIGluIHBpeGVsXHJcbiAqIEBwYXJhbSBkYXRhIHtBcnJheX0gSWYgZ2l2ZW4sIGEgZmxhdCBhcnJheSBjb250YWluaW5nIHRoZSBwaXhlbCBkYXRhXHJcbiAqIEBwYXJhbSBBcnJheVR5cGUge1R5cGV9IElmIGdpdmVuLCB0aGUgZGVzaXJlZCBEYXRhVHlwZSBvZiB0aGUgQXJyYXkgKG1heSBiZSB0eXBlZC9ub24tdHlwZWQpXHJcbiAqIEBwYXJhbSBpbml0aWFsaXplIHtCb29sZWFufSBJbmRpY2F0aW5nIGlmIHRoZSBhcnJheSBzaG91bGQgYmUgaW5pdGlhbGl6ZWQgb24gY3JlYXRpb24uXHJcbiAqIEByZXR1cm5zIHtJbWFnZVdyYXBwZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiBJbWFnZVdyYXBwZXIoc2l6ZSwgZGF0YSwgQXJyYXlUeXBlLCBpbml0aWFsaXplKSB7XHJcbiAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICBpZiAoQXJyYXlUeXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IG5ldyBBcnJheVR5cGUoc2l6ZS54ICogc2l6ZS55KTtcclxuICAgICAgICAgICAgaWYgKEFycmF5VHlwZSA9PT0gQXJyYXkgJiYgaW5pdGlhbGl6ZSkge1xyXG4gICAgICAgICAgICAgICAgQXJyYXlIZWxwZXIuaW5pdCh0aGlzLmRhdGEsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZS54ICogc2l6ZS55KTtcclxuICAgICAgICAgICAgaWYgKFVpbnQ4QXJyYXkgPT09IEFycmF5ICYmIGluaXRpYWxpemUpIHtcclxuICAgICAgICAgICAgICAgIEFycmF5SGVscGVyLmluaXQodGhpcy5kYXRhLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgIH1cclxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiB0ZXN0cyBpZiBhIHBvc2l0aW9uIGlzIHdpdGhpbiB0aGUgaW1hZ2Ugd2l0aCBhIGdpdmVuIG9mZnNldFxyXG4gKiBAcGFyYW0gaW1nUmVmIHt4LCB5fSBUaGUgbG9jYXRpb24gdG8gdGVzdFxyXG4gKiBAcGFyYW0gYm9yZGVyIE51bWJlciB0aGUgcGFkZGluZyB2YWx1ZSBpbiBwaXhlbFxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpZiBsb2NhdGlvbiBpbnNpZGUgdGhlIGltYWdlJ3MgYm9yZGVyLCBmYWxzZSBvdGhlcndpc2VcclxuICogQHNlZSBjdmQvaW1hZ2UuaFxyXG4gKi9cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5pbkltYWdlV2l0aEJvcmRlciA9IGZ1bmN0aW9uKGltZ1JlZiwgYm9yZGVyKSB7XHJcbiAgICByZXR1cm4gKGltZ1JlZi54ID49IGJvcmRlcilcclxuICAgICAgICAmJiAoaW1nUmVmLnkgPj0gYm9yZGVyKVxyXG4gICAgICAgICYmIChpbWdSZWYueCA8ICh0aGlzLnNpemUueCAtIGJvcmRlcikpXHJcbiAgICAgICAgJiYgKGltZ1JlZi55IDwgKHRoaXMuc2l6ZS55IC0gYm9yZGVyKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUGVyZm9ybXMgYmlsaW5lYXIgc2FtcGxpbmdcclxuICogQHBhcmFtIGluSW1nIEltYWdlIHRvIGV4dHJhY3Qgc2FtcGxlIGZyb21cclxuICogQHBhcmFtIHggdGhlIHgtY29vcmRpbmF0ZVxyXG4gKiBAcGFyYW0geSB0aGUgeS1jb29yZGluYXRlXHJcbiAqIEByZXR1cm5zIHRoZSBzYW1wbGVkIHZhbHVlXHJcbiAqIEBzZWUgY3ZkL3Zpc2lvbi5oXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIuc2FtcGxlID0gZnVuY3Rpb24oaW5JbWcsIHgsIHkpIHtcclxuICAgIHZhciBseCA9IE1hdGguZmxvb3IoeCk7XHJcbiAgICB2YXIgbHkgPSBNYXRoLmZsb29yKHkpO1xyXG4gICAgdmFyIHcgPSBpbkltZy5zaXplLng7XHJcbiAgICB2YXIgYmFzZSA9IGx5ICogaW5JbWcuc2l6ZS54ICsgbHg7XHJcbiAgICB2YXIgYSA9IGluSW1nLmRhdGFbYmFzZSArIDBdO1xyXG4gICAgdmFyIGIgPSBpbkltZy5kYXRhW2Jhc2UgKyAxXTtcclxuICAgIHZhciBjID0gaW5JbWcuZGF0YVtiYXNlICsgd107XHJcbiAgICB2YXIgZCA9IGluSW1nLmRhdGFbYmFzZSArIHcgKyAxXTtcclxuICAgIHZhciBlID0gYSAtIGI7XHJcbiAgICB4IC09IGx4O1xyXG4gICAgeSAtPSBseTtcclxuXHJcbiAgICB2YXIgcmVzdWx0ID0gTWF0aC5mbG9vcih4ICogKHkgKiAoZSAtIGMgKyBkKSAtIGUpICsgeSAqIChjIC0gYSkgKyBhKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZXMgYSBnaXZlbiBhcnJheS4gU2V0cyBlYWNoIGVsZW1lbnQgdG8gemVyby5cclxuICogQHBhcmFtIGFycmF5IHtBcnJheX0gVGhlIGFycmF5IHRvIGluaXRpYWxpemVcclxuICovXHJcbkltYWdlV3JhcHBlci5jbGVhckFycmF5ID0gZnVuY3Rpb24oYXJyYXkpIHtcclxuICAgIHZhciBsID0gYXJyYXkubGVuZ3RoO1xyXG4gICAgd2hpbGUgKGwtLSkge1xyXG4gICAgICAgIGFycmF5W2xdID0gMDtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEge1N1YkltYWdlfSBmcm9tIHRoZSBjdXJyZW50IGltYWdlICh7dGhpc30pLlxyXG4gKiBAcGFyYW0gZnJvbSB7SW1hZ2VSZWZ9IFRoZSBwb3NpdGlvbiB3aGVyZSB0byBzdGFydCB0aGUge1N1YkltYWdlfSBmcm9tLiAodG9wLWxlZnQgY29ybmVyKVxyXG4gKiBAcGFyYW0gc2l6ZSB7SW1hZ2VSZWZ9IFRoZSBzaXplIG9mIHRoZSByZXN1bHRpbmcgaW1hZ2VcclxuICogQHJldHVybnMge1N1YkltYWdlfSBBIHNoYXJlZCBwYXJ0IG9mIHRoZSBvcmlnaW5hbCBpbWFnZVxyXG4gKi9cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5zdWJJbWFnZSA9IGZ1bmN0aW9uKGZyb20sIHNpemUpIHtcclxuICAgIHJldHVybiBuZXcgU3ViSW1hZ2UoZnJvbSwgc2l6ZSwgdGhpcyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhbiB7SW1hZ2VXcmFwcGVyKSBhbmQgY29waWVzIHRoZSBuZWVkZWQgdW5kZXJseWluZyBpbWFnZS1kYXRhIGFyZWFcclxuICogQHBhcmFtIGltYWdlV3JhcHBlciB7SW1hZ2VXcmFwcGVyfSBUaGUgdGFyZ2V0IHtJbWFnZVdyYXBwZXJ9IHdoZXJlIHRoZSBkYXRhIHNob3VsZCBiZSBjb3BpZWRcclxuICogQHBhcmFtIGZyb20ge0ltYWdlUmVmfSBUaGUgbG9jYXRpb24gd2hlcmUgdG8gY29weSBmcm9tICh0b3AtbGVmdCBsb2NhdGlvbilcclxuICovXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuc3ViSW1hZ2VBc0NvcHkgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGZyb20pIHtcclxuICAgIHZhciBzaXplWSA9IGltYWdlV3JhcHBlci5zaXplLnksIHNpemVYID0gaW1hZ2VXcmFwcGVyLnNpemUueDtcclxuICAgIHZhciB4LCB5O1xyXG4gICAgZm9yICggeCA9IDA7IHggPCBzaXplWDsgeCsrKSB7XHJcbiAgICAgICAgZm9yICggeSA9IDA7IHkgPCBzaXplWTsgeSsrKSB7XHJcbiAgICAgICAgICAgIGltYWdlV3JhcHBlci5kYXRhW3kgKiBzaXplWCArIHhdID0gdGhpcy5kYXRhWyhmcm9tLnkgKyB5KSAqIHRoaXMuc2l6ZS54ICsgZnJvbS54ICsgeF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5jb3B5VG8gPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIpIHtcclxuICAgIHZhciBsZW5ndGggPSB0aGlzLmRhdGEubGVuZ3RoLCBzcmNEYXRhID0gdGhpcy5kYXRhLCBkc3REYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGE7XHJcblxyXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XHJcbiAgICAgICAgZHN0RGF0YVtsZW5ndGhdID0gc3JjRGF0YVtsZW5ndGhdO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlcyBhIGdpdmVuIHBpeGVsIHBvc2l0aW9uIGZyb20gdGhlIGltYWdlXHJcbiAqIEBwYXJhbSB4IHtOdW1iZXJ9IFRoZSB4LXBvc2l0aW9uXHJcbiAqIEBwYXJhbSB5IHtOdW1iZXJ9IFRoZSB5LXBvc2l0aW9uXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBncmF5c2NhbGUgdmFsdWUgYXQgdGhlIHBpeGVsLXBvc2l0aW9uXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGFbeSAqIHRoaXMuc2l6ZS54ICsgeF07XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0cmlldmVzIGEgZ2l2ZW4gcGl4ZWwgcG9zaXRpb24gZnJvbSB0aGUgaW1hZ2VcclxuICogQHBhcmFtIHgge051bWJlcn0gVGhlIHgtcG9zaXRpb25cclxuICogQHBhcmFtIHkge051bWJlcn0gVGhlIHktcG9zaXRpb25cclxuICogQHJldHVybnMge051bWJlcn0gVGhlIGdyYXlzY2FsZSB2YWx1ZSBhdCB0aGUgcGl4ZWwtcG9zaXRpb25cclxuICovXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuZ2V0U2FmZSA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgIHZhciBpO1xyXG5cclxuICAgIGlmICghdGhpcy5pbmRleE1hcHBpbmcpIHtcclxuICAgICAgICB0aGlzLmluZGV4TWFwcGluZyA9IHtcclxuICAgICAgICAgICAgeDogW10sXHJcbiAgICAgICAgICAgIHk6IFtdXHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5zaXplLng7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4TWFwcGluZy54W2ldID0gaTtcclxuICAgICAgICAgICAgdGhpcy5pbmRleE1hcHBpbmcueFtpICsgdGhpcy5zaXplLnhdID0gaTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuc2l6ZS55OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5pbmRleE1hcHBpbmcueVtpXSA9IGk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXhNYXBwaW5nLnlbaSArIHRoaXMuc2l6ZS55XSA9IGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZGF0YVsodGhpcy5pbmRleE1hcHBpbmcueVt5ICsgdGhpcy5zaXplLnldKSAqIHRoaXMuc2l6ZS54ICsgdGhpcy5pbmRleE1hcHBpbmcueFt4ICsgdGhpcy5zaXplLnhdXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXRzIGEgZ2l2ZW4gcGl4ZWwgcG9zaXRpb24gaW4gdGhlIGltYWdlXHJcbiAqIEBwYXJhbSB4IHtOdW1iZXJ9IFRoZSB4LXBvc2l0aW9uXHJcbiAqIEBwYXJhbSB5IHtOdW1iZXJ9IFRoZSB5LXBvc2l0aW9uXHJcbiAqIEBwYXJhbSB2YWx1ZSB7TnVtYmVyfSBUaGUgZ3JheXNjYWxlIHZhbHVlIHRvIHNldFxyXG4gKiBAcmV0dXJucyB7SW1hZ2VXcmFwcGVyfSBUaGUgSW1hZ2UgaXRzZWxmIChmb3IgcG9zc2libGUgY2hhaW5pbmcpXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKHgsIHksIHZhbHVlKSB7XHJcbiAgICB0aGlzLmRhdGFbeSAqIHRoaXMuc2l6ZS54ICsgeF0gPSB2YWx1ZTtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldHMgdGhlIGJvcmRlciBvZiB0aGUgaW1hZ2UgKDEgcGl4ZWwpIHRvIHplcm9cclxuICovXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuemVyb0JvcmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGksIHdpZHRoID0gdGhpcy5zaXplLngsIGhlaWdodCA9IHRoaXMuc2l6ZS55LCBkYXRhID0gdGhpcy5kYXRhO1xyXG4gICAgZm9yICggaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XHJcbiAgICAgICAgZGF0YVtpXSA9IGRhdGFbKGhlaWdodCAtIDEpICogd2lkdGggKyBpXSA9IDA7XHJcbiAgICB9XHJcbiAgICBmb3IgKCBpID0gMTsgaSA8IGhlaWdodCAtIDE7IGkrKykge1xyXG4gICAgICAgIGRhdGFbaSAqIHdpZHRoXSA9IGRhdGFbaSAqIHdpZHRoICsgKHdpZHRoIC0gMSldID0gMDtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbnZlcnRzIGEgYmluYXJ5IGltYWdlIGluIHBsYWNlXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLmludmVydCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGRhdGEgPSB0aGlzLmRhdGEsIGxlbmd0aCA9IGRhdGEubGVuZ3RoO1xyXG5cclxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgIGRhdGFbbGVuZ3RoXSA9IGRhdGFbbGVuZ3RoXSA/IDAgOiAxO1xyXG4gICAgfVxyXG59O1xyXG5cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5jb252b2x2ZSA9IGZ1bmN0aW9uKGtlcm5lbCkge1xyXG4gICAgdmFyIHgsIHksIGt4LCBreSwga1NpemUgPSAoa2VybmVsLmxlbmd0aCAvIDIpIHwgMCwgYWNjdSA9IDA7XHJcbiAgICBmb3IgKCB5ID0gMDsgeSA8IHRoaXMuc2l6ZS55OyB5KyspIHtcclxuICAgICAgICBmb3IgKCB4ID0gMDsgeCA8IHRoaXMuc2l6ZS54OyB4KyspIHtcclxuICAgICAgICAgICAgYWNjdSA9IDA7XHJcbiAgICAgICAgICAgIGZvciAoIGt5ID0gLWtTaXplOyBreSA8PSBrU2l6ZTsga3krKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICgga3ggPSAta1NpemU7IGt4IDw9IGtTaXplOyBreCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdSArPSBrZXJuZWxba3kgKyBrU2l6ZV1ba3ggKyBrU2l6ZV0gKiB0aGlzLmdldFNhZmUoeCArIGt4LCB5ICsga3kpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVt5ICogdGhpcy5zaXplLnggKyB4XSA9IGFjY3U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5tb21lbnRzID0gZnVuY3Rpb24obGFiZWxjb3VudCkge1xyXG4gICAgdmFyIGRhdGEgPSB0aGlzLmRhdGEsXHJcbiAgICAgICAgeCxcclxuICAgICAgICB5LFxyXG4gICAgICAgIGhlaWdodCA9IHRoaXMuc2l6ZS55LFxyXG4gICAgICAgIHdpZHRoID0gdGhpcy5zaXplLngsXHJcbiAgICAgICAgdmFsLFxyXG4gICAgICAgIHlzcSxcclxuICAgICAgICBsYWJlbHN1bSA9IFtdLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgbGFiZWwsXHJcbiAgICAgICAgbXUxMSxcclxuICAgICAgICBtdTAyLFxyXG4gICAgICAgIG11MjAsXHJcbiAgICAgICAgeF8sXHJcbiAgICAgICAgeV8sXHJcbiAgICAgICAgdG1wLFxyXG4gICAgICAgIHJlc3VsdCA9IFtdLFxyXG4gICAgICAgIFBJID0gTWF0aC5QSSxcclxuICAgICAgICBQSV80ID0gUEkgLyA0O1xyXG5cclxuICAgIGlmIChsYWJlbGNvdW50IDw9IDApIHtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgbGFiZWxjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgbGFiZWxzdW1baV0gPSB7XHJcbiAgICAgICAgICAgIG0wMDogMCxcclxuICAgICAgICAgICAgbTAxOiAwLFxyXG4gICAgICAgICAgICBtMTA6IDAsXHJcbiAgICAgICAgICAgIG0xMTogMCxcclxuICAgICAgICAgICAgbTAyOiAwLFxyXG4gICAgICAgICAgICBtMjA6IDAsXHJcbiAgICAgICAgICAgIHRoZXRhOiAwLFxyXG4gICAgICAgICAgICByYWQ6IDBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcclxuICAgICAgICB5c3EgPSB5ICogeTtcclxuICAgICAgICBmb3IgKCB4ID0gMDsgeCA8IHdpZHRoOyB4KyspIHtcclxuICAgICAgICAgICAgdmFsID0gZGF0YVt5ICogd2lkdGggKyB4XTtcclxuICAgICAgICAgICAgaWYgKHZhbCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsID0gbGFiZWxzdW1bdmFsIC0gMV07XHJcbiAgICAgICAgICAgICAgICBsYWJlbC5tMDAgKz0gMTtcclxuICAgICAgICAgICAgICAgIGxhYmVsLm0wMSArPSB5O1xyXG4gICAgICAgICAgICAgICAgbGFiZWwubTEwICs9IHg7XHJcbiAgICAgICAgICAgICAgICBsYWJlbC5tMTEgKz0geCAqIHk7XHJcbiAgICAgICAgICAgICAgICBsYWJlbC5tMDIgKz0geXNxO1xyXG4gICAgICAgICAgICAgICAgbGFiZWwubTIwICs9IHggKiB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgbGFiZWxjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgbGFiZWwgPSBsYWJlbHN1bVtpXTtcclxuICAgICAgICBpZiAoIWlzTmFOKGxhYmVsLm0wMCkgJiYgbGFiZWwubTAwICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHhfID0gbGFiZWwubTEwIC8gbGFiZWwubTAwO1xyXG4gICAgICAgICAgICB5XyA9IGxhYmVsLm0wMSAvIGxhYmVsLm0wMDtcclxuICAgICAgICAgICAgbXUxMSA9IGxhYmVsLm0xMSAvIGxhYmVsLm0wMCAtIHhfICogeV87XHJcbiAgICAgICAgICAgIG11MDIgPSBsYWJlbC5tMDIgLyBsYWJlbC5tMDAgLSB5XyAqIHlfO1xyXG4gICAgICAgICAgICBtdTIwID0gbGFiZWwubTIwIC8gbGFiZWwubTAwIC0geF8gKiB4XztcclxuICAgICAgICAgICAgdG1wID0gKG11MDIgLSBtdTIwKSAvICgyICogbXUxMSk7XHJcbiAgICAgICAgICAgIHRtcCA9IDAuNSAqIE1hdGguYXRhbih0bXApICsgKG11MTEgPj0gMCA/IFBJXzQgOiAtUElfNCApICsgUEk7XHJcbiAgICAgICAgICAgIGxhYmVsLnRoZXRhID0gKHRtcCAqIDE4MCAvIFBJICsgOTApICUgMTgwIC0gOTA7XHJcbiAgICAgICAgICAgIGlmIChsYWJlbC50aGV0YSA8IDApIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsLnRoZXRhICs9IDE4MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsYWJlbC5yYWQgPSB0bXAgPiBQSSA/IHRtcCAtIFBJIDogdG1wO1xyXG4gICAgICAgICAgICBsYWJlbC52ZWMgPSB2ZWMyLmNsb25lKFtNYXRoLmNvcyh0bXApLCBNYXRoLnNpbih0bXApXSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGxhYmVsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEaXNwbGF5cyB0aGUge0ltYWdlV3JhcHBlcn0gaW4gYSBnaXZlbiBjYW52YXNcclxuICogQHBhcmFtIGNhbnZhcyB7Q2FudmFzfSBUaGUgY2FudmFzIGVsZW1lbnQgdG8gd3JpdGUgdG9cclxuICogQHBhcmFtIHNjYWxlIHtOdW1iZXJ9IFNjYWxlIHdoaWNoIGlzIGFwcGxpZWQgdG8gZWFjaCBwaXhlbC12YWx1ZVxyXG4gKi9cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oY2FudmFzLCBzY2FsZSkge1xyXG4gICAgdmFyIGN0eCxcclxuICAgICAgICBmcmFtZSxcclxuICAgICAgICBkYXRhLFxyXG4gICAgICAgIGN1cnJlbnQsXHJcbiAgICAgICAgcGl4ZWwsXHJcbiAgICAgICAgeCxcclxuICAgICAgICB5O1xyXG5cclxuICAgIGlmICghc2NhbGUpIHtcclxuICAgICAgICBzY2FsZSA9IDEuMDtcclxuICAgIH1cclxuICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgY2FudmFzLndpZHRoID0gdGhpcy5zaXplLng7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gdGhpcy5zaXplLnk7XHJcbiAgICBmcmFtZSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgIGRhdGEgPSBmcmFtZS5kYXRhO1xyXG4gICAgY3VycmVudCA9IDA7XHJcbiAgICBmb3IgKHkgPSAwOyB5IDwgdGhpcy5zaXplLnk7IHkrKykge1xyXG4gICAgICAgIGZvciAoeCA9IDA7IHggPCB0aGlzLnNpemUueDsgeCsrKSB7XHJcbiAgICAgICAgICAgIHBpeGVsID0geSAqIHRoaXMuc2l6ZS54ICsgeDtcclxuICAgICAgICAgICAgY3VycmVudCA9IHRoaXMuZ2V0KHgsIHkpICogc2NhbGU7XHJcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMF0gPSBjdXJyZW50O1xyXG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDFdID0gY3VycmVudDtcclxuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAyXSA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgM10gPSAyNTU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9mcmFtZS5kYXRhID0gZGF0YTtcclxuICAgIGN0eC5wdXRJbWFnZURhdGEoZnJhbWUsIDAsIDApO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERpc3BsYXlzIHRoZSB7U3ViSW1hZ2V9IGluIGEgZ2l2ZW4gY2FudmFzXHJcbiAqIEBwYXJhbSBjYW52YXMge0NhbnZhc30gVGhlIGNhbnZhcyBlbGVtZW50IHRvIHdyaXRlIHRvXHJcbiAqIEBwYXJhbSBzY2FsZSB7TnVtYmVyfSBTY2FsZSB3aGljaCBpcyBhcHBsaWVkIHRvIGVhY2ggcGl4ZWwtdmFsdWVcclxuICovXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUub3ZlcmxheSA9IGZ1bmN0aW9uKGNhbnZhcywgc2NhbGUsIGZyb20pIHtcclxuICAgIGlmICghc2NhbGUgfHwgc2NhbGUgPCAwIHx8IHNjYWxlID4gMzYwKSB7XHJcbiAgICAgICAgc2NhbGUgPSAzNjA7XHJcbiAgICB9XHJcbiAgICB2YXIgaHN2ID0gWzAsIDEsIDFdO1xyXG4gICAgdmFyIHJnYiA9IFswLCAwLCAwXTtcclxuICAgIHZhciB3aGl0ZVJnYiA9IFsyNTUsIDI1NSwgMjU1XTtcclxuICAgIHZhciBibGFja1JnYiA9IFswLCAwLCAwXTtcclxuICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIHZhciBmcmFtZSA9IGN0eC5nZXRJbWFnZURhdGEoZnJvbS54LCBmcm9tLnksIHRoaXMuc2l6ZS54LCB0aGlzLnNpemUueSk7XHJcbiAgICB2YXIgZGF0YSA9IGZyYW1lLmRhdGE7XHJcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5kYXRhLmxlbmd0aDtcclxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgIGhzdlswXSA9IHRoaXMuZGF0YVtsZW5ndGhdICogc2NhbGU7XHJcbiAgICAgICAgcmVzdWx0ID0gaHN2WzBdIDw9IDAgPyB3aGl0ZVJnYiA6IGhzdlswXSA+PSAzNjAgPyBibGFja1JnYiA6IENWVXRpbHMuaHN2MnJnYihoc3YsIHJnYik7XHJcbiAgICAgICAgZGF0YVtsZW5ndGggKiA0ICsgMF0gPSByZXN1bHRbMF07XHJcbiAgICAgICAgZGF0YVtsZW5ndGggKiA0ICsgMV0gPSByZXN1bHRbMV07XHJcbiAgICAgICAgZGF0YVtsZW5ndGggKiA0ICsgMl0gPSByZXN1bHRbMl07XHJcbiAgICAgICAgZGF0YVtsZW5ndGggKiA0ICsgM10gPSAyNTU7XHJcbiAgICB9XHJcbiAgICBjdHgucHV0SW1hZ2VEYXRhKGZyYW1lLCBmcm9tLngsIGZyb20ueSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbWFnZVdyYXBwZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2ltYWdlX3dyYXBwZXIuanNcbiAqKi8iLCIvKipcclxuICogQ29uc3RydWN0IHJlcHJlc2VudGluZyBhIHBhcnQgb2YgYW5vdGhlciB7SW1hZ2VXcmFwcGVyfS4gU2hhcmVzIGRhdGFcclxuICogYmV0d2VlbiB0aGUgcGFyZW50IGFuZCB0aGUgY2hpbGQuXHJcbiAqIEBwYXJhbSBmcm9tIHtJbWFnZVJlZn0gVGhlIHBvc2l0aW9uIHdoZXJlIHRvIHN0YXJ0IHRoZSB7U3ViSW1hZ2V9IGZyb20uICh0b3AtbGVmdCBjb3JuZXIpXHJcbiAqIEBwYXJhbSBzaXplIHtJbWFnZVJlZn0gVGhlIHNpemUgb2YgdGhlIHJlc3VsdGluZyBpbWFnZVxyXG4gKiBAcGFyYW0gSSB7SW1hZ2VXcmFwcGVyfSBUaGUge0ltYWdlV3JhcHBlcn0gdG8gc2hhcmUgZnJvbVxyXG4gKiBAcmV0dXJucyB7U3ViSW1hZ2V9IEEgc2hhcmVkIHBhcnQgb2YgdGhlIG9yaWdpbmFsIGltYWdlXHJcbiAqL1xyXG5mdW5jdGlvbiBTdWJJbWFnZShmcm9tLCBzaXplLCBJKSB7XHJcbiAgICBpZiAoIUkpIHtcclxuICAgICAgICBJID0ge1xyXG4gICAgICAgICAgICBkYXRhOiBudWxsLFxyXG4gICAgICAgICAgICBzaXplOiBzaXplXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHRoaXMuZGF0YSA9IEkuZGF0YTtcclxuICAgIHRoaXMub3JpZ2luYWxTaXplID0gSS5zaXplO1xyXG4gICAgdGhpcy5JID0gSTtcclxuXHJcbiAgICB0aGlzLmZyb20gPSBmcm9tO1xyXG4gICAgdGhpcy5zaXplID0gc2l6ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERpc3BsYXlzIHRoZSB7U3ViSW1hZ2V9IGluIGEgZ2l2ZW4gY2FudmFzXHJcbiAqIEBwYXJhbSBjYW52YXMge0NhbnZhc30gVGhlIGNhbnZhcyBlbGVtZW50IHRvIHdyaXRlIHRvXHJcbiAqIEBwYXJhbSBzY2FsZSB7TnVtYmVyfSBTY2FsZSB3aGljaCBpcyBhcHBsaWVkIHRvIGVhY2ggcGl4ZWwtdmFsdWVcclxuICovXHJcblN1YkltYWdlLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oY2FudmFzLCBzY2FsZSkge1xyXG4gICAgdmFyIGN0eCxcclxuICAgICAgICBmcmFtZSxcclxuICAgICAgICBkYXRhLFxyXG4gICAgICAgIGN1cnJlbnQsXHJcbiAgICAgICAgeSxcclxuICAgICAgICB4LFxyXG4gICAgICAgIHBpeGVsO1xyXG5cclxuICAgIGlmICghc2NhbGUpIHtcclxuICAgICAgICBzY2FsZSA9IDEuMDtcclxuICAgIH1cclxuICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgY2FudmFzLndpZHRoID0gdGhpcy5zaXplLng7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gdGhpcy5zaXplLnk7XHJcbiAgICBmcmFtZSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgIGRhdGEgPSBmcmFtZS5kYXRhO1xyXG4gICAgY3VycmVudCA9IDA7XHJcbiAgICBmb3IgKHkgPSAwOyB5IDwgdGhpcy5zaXplLnk7IHkrKykge1xyXG4gICAgICAgIGZvciAoeCA9IDA7IHggPCB0aGlzLnNpemUueDsgeCsrKSB7XHJcbiAgICAgICAgICAgIHBpeGVsID0geSAqIHRoaXMuc2l6ZS54ICsgeDtcclxuICAgICAgICAgICAgY3VycmVudCA9IHRoaXMuZ2V0KHgsIHkpICogc2NhbGU7XHJcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMF0gPSBjdXJyZW50O1xyXG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDFdID0gY3VycmVudDtcclxuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAyXSA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgM10gPSAyNTU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnJhbWUuZGF0YSA9IGRhdGE7XHJcbiAgICBjdHgucHV0SW1hZ2VEYXRhKGZyYW1lLCAwLCAwKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZXMgYSBnaXZlbiBwaXhlbCBwb3NpdGlvbiBmcm9tIHRoZSB7U3ViSW1hZ2V9XHJcbiAqIEBwYXJhbSB4IHtOdW1iZXJ9IFRoZSB4LXBvc2l0aW9uXHJcbiAqIEBwYXJhbSB5IHtOdW1iZXJ9IFRoZSB5LXBvc2l0aW9uXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBncmF5c2NhbGUgdmFsdWUgYXQgdGhlIHBpeGVsLXBvc2l0aW9uXHJcbiAqL1xyXG5TdWJJbWFnZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YVsodGhpcy5mcm9tLnkgKyB5KSAqIHRoaXMub3JpZ2luYWxTaXplLnggKyB0aGlzLmZyb20ueCArIHhdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZXMgdGhlIHVuZGVybHlpbmcgZGF0YSBmcm9tIGEgZ2l2ZW4ge0ltYWdlV3JhcHBlcn1cclxuICogQHBhcmFtIGltYWdlIHtJbWFnZVdyYXBwZXJ9IFRoZSB1cGRhdGVkIGltYWdlXHJcbiAqL1xyXG5TdWJJbWFnZS5wcm90b3R5cGUudXBkYXRlRGF0YSA9IGZ1bmN0aW9uKGltYWdlKSB7XHJcbiAgICB0aGlzLm9yaWdpbmFsU2l6ZSA9IGltYWdlLnNpemU7XHJcbiAgICB0aGlzLmRhdGEgPSBpbWFnZS5kYXRhO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBzaGFyZWQgYXJlYVxyXG4gKiBAcGFyYW0gZnJvbSB7eCx5fSBUaGUgbmV3IGxvY2F0aW9uXHJcbiAqIEByZXR1cm5zIHtTdWJJbWFnZX0gcmV0dXJucyB7dGhpc30gZm9yIHBvc3NpYmxlIGNoYWluaW5nXHJcbiAqL1xyXG5TdWJJbWFnZS5wcm90b3R5cGUudXBkYXRlRnJvbSA9IGZ1bmN0aW9uKGZyb20pIHtcclxuICAgIHRoaXMuZnJvbSA9IGZyb207XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChTdWJJbWFnZSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL3N1YkltYWdlLmpzXG4gKiovIiwiaW1wb3J0IENsdXN0ZXIyIGZyb20gJy4vY2x1c3Rlcic7XHJcbmltcG9ydCBBcnJheUhlbHBlciBmcm9tICcuL2FycmF5X2hlbHBlcic7XHJcbmltcG9ydCB7dmVjMiwgdmVjM30gZnJvbSAnZ2wtbWF0cml4JztcclxuXHJcbnZhciBDVlV0aWxzID0ge307XHJcblxyXG4vKipcclxuICogQHBhcmFtIHggeC1jb29yZGluYXRlXHJcbiAqIEBwYXJhbSB5IHktY29vcmRpbmF0ZVxyXG4gKiBAcmV0dXJuIEltYWdlUmVmZXJlbmNlIHt4LHl9IENvb3JkaW5hdGVcclxuICovXHJcbkNWVXRpbHMuaW1hZ2VSZWYgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICB2YXIgdGhhdCA9IHtcclxuICAgICAgICB4OiB4LFxyXG4gICAgICAgIHk6IHksXHJcbiAgICAgICAgdG9WZWMyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZlYzIuY2xvbmUoW3RoaXMueCwgdGhpcy55XSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b1ZlYzM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmVjMy5jbG9uZShbdGhpcy54LCB0aGlzLnksIDFdKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvdW5kOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy54ID0gdGhpcy54ID4gMC4wID8gTWF0aC5mbG9vcih0aGlzLnggKyAwLjUpIDogTWF0aC5mbG9vcih0aGlzLnggLSAwLjUpO1xyXG4gICAgICAgICAgICB0aGlzLnkgPSB0aGlzLnkgPiAwLjAgPyBNYXRoLmZsb29yKHRoaXMueSArIDAuNSkgOiBNYXRoLmZsb29yKHRoaXMueSAtIDAuNSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb21wdXRlcyBhbiBpbnRlZ3JhbCBpbWFnZSBvZiBhIGdpdmVuIGdyYXlzY2FsZSBpbWFnZS5cclxuICogQHBhcmFtIGltYWdlRGF0YUNvbnRhaW5lciB7SW1hZ2VEYXRhQ29udGFpbmVyfSB0aGUgaW1hZ2UgdG8gYmUgaW50ZWdyYXRlZFxyXG4gKi9cclxuQ1ZVdGlscy5jb21wdXRlSW50ZWdyYWxJbWFnZTIgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGludGVncmFsV3JhcHBlcikge1xyXG4gICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhO1xyXG4gICAgdmFyIHdpZHRoID0gaW1hZ2VXcmFwcGVyLnNpemUueDtcclxuICAgIHZhciBoZWlnaHQgPSBpbWFnZVdyYXBwZXIuc2l6ZS55O1xyXG4gICAgdmFyIGludGVncmFsSW1hZ2VEYXRhID0gaW50ZWdyYWxXcmFwcGVyLmRhdGE7XHJcbiAgICB2YXIgc3VtID0gMCwgcG9zQSA9IDAsIHBvc0IgPSAwLCBwb3NDID0gMCwgcG9zRCA9IDAsIHgsIHk7XHJcblxyXG4gICAgLy8gc3VtIHVwIGZpcnN0IGNvbHVtblxyXG4gICAgcG9zQiA9IHdpZHRoO1xyXG4gICAgc3VtID0gMDtcclxuICAgIGZvciAoIHkgPSAxOyB5IDwgaGVpZ2h0OyB5KyspIHtcclxuICAgICAgICBzdW0gKz0gaW1hZ2VEYXRhW3Bvc0FdO1xyXG4gICAgICAgIGludGVncmFsSW1hZ2VEYXRhW3Bvc0JdICs9IHN1bTtcclxuICAgICAgICBwb3NBICs9IHdpZHRoO1xyXG4gICAgICAgIHBvc0IgKz0gd2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zQSA9IDA7XHJcbiAgICBwb3NCID0gMTtcclxuICAgIHN1bSA9IDA7XHJcbiAgICBmb3IgKCB4ID0gMTsgeCA8IHdpZHRoOyB4KyspIHtcclxuICAgICAgICBzdW0gKz0gaW1hZ2VEYXRhW3Bvc0FdO1xyXG4gICAgICAgIGludGVncmFsSW1hZ2VEYXRhW3Bvc0JdICs9IHN1bTtcclxuICAgICAgICBwb3NBKys7XHJcbiAgICAgICAgcG9zQisrO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIHkgPSAxOyB5IDwgaGVpZ2h0OyB5KyspIHtcclxuICAgICAgICBwb3NBID0geSAqIHdpZHRoICsgMTtcclxuICAgICAgICBwb3NCID0gKHkgLSAxKSAqIHdpZHRoICsgMTtcclxuICAgICAgICBwb3NDID0geSAqIHdpZHRoO1xyXG4gICAgICAgIHBvc0QgPSAoeSAtIDEpICogd2lkdGg7XHJcbiAgICAgICAgZm9yICggeCA9IDE7IHggPCB3aWR0aDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGludGVncmFsSW1hZ2VEYXRhW3Bvc0FdICs9XHJcbiAgICAgICAgICAgICAgICBpbWFnZURhdGFbcG9zQV0gKyBpbnRlZ3JhbEltYWdlRGF0YVtwb3NCXSArIGludGVncmFsSW1hZ2VEYXRhW3Bvc0NdIC0gaW50ZWdyYWxJbWFnZURhdGFbcG9zRF07XHJcbiAgICAgICAgICAgIHBvc0ErKztcclxuICAgICAgICAgICAgcG9zQisrO1xyXG4gICAgICAgICAgICBwb3NDKys7XHJcbiAgICAgICAgICAgIHBvc0QrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLmNvbXB1dGVJbnRlZ3JhbEltYWdlID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCBpbnRlZ3JhbFdyYXBwZXIpIHtcclxuICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YTtcclxuICAgIHZhciB3aWR0aCA9IGltYWdlV3JhcHBlci5zaXplLng7XHJcbiAgICB2YXIgaGVpZ2h0ID0gaW1hZ2VXcmFwcGVyLnNpemUueTtcclxuICAgIHZhciBpbnRlZ3JhbEltYWdlRGF0YSA9IGludGVncmFsV3JhcHBlci5kYXRhO1xyXG4gICAgdmFyIHN1bSA9IDA7XHJcblxyXG4gICAgLy8gc3VtIHVwIGZpcnN0IHJvd1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XHJcbiAgICAgICAgc3VtICs9IGltYWdlRGF0YVtpXTtcclxuICAgICAgICBpbnRlZ3JhbEltYWdlRGF0YVtpXSA9IHN1bTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciB2ID0gMTsgdiA8IGhlaWdodDsgdisrKSB7XHJcbiAgICAgICAgc3VtID0gMDtcclxuICAgICAgICBmb3IgKHZhciB1ID0gMDsgdSA8IHdpZHRoOyB1KyspIHtcclxuICAgICAgICAgICAgc3VtICs9IGltYWdlRGF0YVt2ICogd2lkdGggKyB1XTtcclxuICAgICAgICAgICAgaW50ZWdyYWxJbWFnZURhdGFbKCh2KSAqIHdpZHRoKSArIHVdID0gc3VtICsgaW50ZWdyYWxJbWFnZURhdGFbKHYgLSAxKSAqIHdpZHRoICsgdV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy50aHJlc2hvbGRJbWFnZSA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgdGhyZXNob2xkLCB0YXJnZXRXcmFwcGVyKSB7XHJcbiAgICBpZiAoIXRhcmdldFdyYXBwZXIpIHtcclxuICAgICAgICB0YXJnZXRXcmFwcGVyID0gaW1hZ2VXcmFwcGVyO1xyXG4gICAgfVxyXG4gICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhLCBsZW5ndGggPSBpbWFnZURhdGEubGVuZ3RoLCB0YXJnZXREYXRhID0gdGFyZ2V0V3JhcHBlci5kYXRhO1xyXG5cclxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgIHRhcmdldERhdGFbbGVuZ3RoXSA9IGltYWdlRGF0YVtsZW5ndGhdIDwgdGhyZXNob2xkID8gMSA6IDA7XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLmNvbXB1dGVIaXN0b2dyYW0gPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGJpdHNQZXJQaXhlbCkge1xyXG4gICAgaWYgKCFiaXRzUGVyUGl4ZWwpIHtcclxuICAgICAgICBiaXRzUGVyUGl4ZWwgPSA4O1xyXG4gICAgfVxyXG4gICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgIGxlbmd0aCA9IGltYWdlRGF0YS5sZW5ndGgsXHJcbiAgICAgICAgYml0U2hpZnQgPSA4IC0gYml0c1BlclBpeGVsLFxyXG4gICAgICAgIGJ1Y2tldENudCA9IDEgPDwgYml0c1BlclBpeGVsLFxyXG4gICAgICAgIGhpc3QgPSBuZXcgSW50MzJBcnJheShidWNrZXRDbnQpO1xyXG5cclxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgIGhpc3RbaW1hZ2VEYXRhW2xlbmd0aF0gPj4gYml0U2hpZnRdKys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGlzdDtcclxufTtcclxuXHJcbkNWVXRpbHMuc2hhcnBlbkxpbmUgPSBmdW5jdGlvbihsaW5lKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBsZW5ndGggPSBsaW5lLmxlbmd0aCxcclxuICAgICAgICBsZWZ0ID0gbGluZVswXSxcclxuICAgICAgICBjZW50ZXIgPSBsaW5lWzFdLFxyXG4gICAgICAgIHJpZ2h0O1xyXG5cclxuICAgIGZvciAoaSA9IDE7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICByaWdodCA9IGxpbmVbaSArIDFdO1xyXG4gICAgICAgIC8vICAtMSA0IC0xIGtlcm5lbFxyXG4gICAgICAgIGxpbmVbaSAtIDFdID0gKCgoY2VudGVyICogMikgLSBsZWZ0IC0gcmlnaHQpKSAmIDI1NTtcclxuICAgICAgICBsZWZ0ID0gY2VudGVyO1xyXG4gICAgICAgIGNlbnRlciA9IHJpZ2h0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpbmU7XHJcbn07XHJcblxyXG5DVlV0aWxzLmRldGVybWluZU90c3VUaHJlc2hvbGQgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGJpdHNQZXJQaXhlbCkge1xyXG4gICAgaWYgKCFiaXRzUGVyUGl4ZWwpIHtcclxuICAgICAgICBiaXRzUGVyUGl4ZWwgPSA4O1xyXG4gICAgfVxyXG4gICAgdmFyIGhpc3QsXHJcbiAgICAgICAgdGhyZXNob2xkLFxyXG4gICAgICAgIGJpdFNoaWZ0ID0gOCAtIGJpdHNQZXJQaXhlbDtcclxuXHJcbiAgICBmdW5jdGlvbiBweChpbml0LCBlbmQpIHtcclxuICAgICAgICB2YXIgc3VtID0gMCwgaTtcclxuICAgICAgICBmb3IgKCBpID0gaW5pdDsgaSA8PSBlbmQ7IGkrKykge1xyXG4gICAgICAgICAgICBzdW0gKz0gaGlzdFtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1bTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBteChpbml0LCBlbmQpIHtcclxuICAgICAgICB2YXIgaSwgc3VtID0gMDtcclxuXHJcbiAgICAgICAgZm9yICggaSA9IGluaXQ7IGkgPD0gZW5kOyBpKyspIHtcclxuICAgICAgICAgICAgc3VtICs9IGkgKiBoaXN0W2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN1bTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZXRlcm1pbmVUaHJlc2hvbGQoKSB7XHJcbiAgICAgICAgdmFyIHZldCA9IFswXSwgcDEsIHAyLCBwMTIsIGssIG0xLCBtMiwgbTEyLFxyXG4gICAgICAgICAgICBtYXggPSAoMSA8PCBiaXRzUGVyUGl4ZWwpIC0gMTtcclxuXHJcbiAgICAgICAgaGlzdCA9IENWVXRpbHMuY29tcHV0ZUhpc3RvZ3JhbShpbWFnZVdyYXBwZXIsIGJpdHNQZXJQaXhlbCk7XHJcbiAgICAgICAgZm9yICggayA9IDE7IGsgPCBtYXg7IGsrKykge1xyXG4gICAgICAgICAgICBwMSA9IHB4KDAsIGspO1xyXG4gICAgICAgICAgICBwMiA9IHB4KGsgKyAxLCBtYXgpO1xyXG4gICAgICAgICAgICBwMTIgPSBwMSAqIHAyO1xyXG4gICAgICAgICAgICBpZiAocDEyID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBwMTIgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG0xID0gbXgoMCwgaykgKiBwMjtcclxuICAgICAgICAgICAgbTIgPSBteChrICsgMSwgbWF4KSAqIHAxO1xyXG4gICAgICAgICAgICBtMTIgPSBtMSAtIG0yO1xyXG4gICAgICAgICAgICB2ZXRba10gPSBtMTIgKiBtMTIgLyBwMTI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBcnJheUhlbHBlci5tYXhJbmRleCh2ZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRocmVzaG9sZCA9IGRldGVybWluZVRocmVzaG9sZCgpO1xyXG4gICAgcmV0dXJuIHRocmVzaG9sZCA8PCBiaXRTaGlmdDtcclxufTtcclxuXHJcbkNWVXRpbHMub3RzdVRocmVzaG9sZCA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgdGFyZ2V0V3JhcHBlcikge1xyXG4gICAgdmFyIHRocmVzaG9sZCA9IENWVXRpbHMuZGV0ZXJtaW5lT3RzdVRocmVzaG9sZChpbWFnZVdyYXBwZXIpO1xyXG5cclxuICAgIENWVXRpbHMudGhyZXNob2xkSW1hZ2UoaW1hZ2VXcmFwcGVyLCB0aHJlc2hvbGQsIHRhcmdldFdyYXBwZXIpO1xyXG4gICAgcmV0dXJuIHRocmVzaG9sZDtcclxufTtcclxuXHJcbi8vIGxvY2FsIHRocmVzaG9sZGluZ1xyXG5DVlV0aWxzLmNvbXB1dGVCaW5hcnlJbWFnZSA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgaW50ZWdyYWxXcmFwcGVyLCB0YXJnZXRXcmFwcGVyKSB7XHJcbiAgICBDVlV0aWxzLmNvbXB1dGVJbnRlZ3JhbEltYWdlKGltYWdlV3JhcHBlciwgaW50ZWdyYWxXcmFwcGVyKTtcclxuXHJcbiAgICBpZiAoIXRhcmdldFdyYXBwZXIpIHtcclxuICAgICAgICB0YXJnZXRXcmFwcGVyID0gaW1hZ2VXcmFwcGVyO1xyXG4gICAgfVxyXG4gICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhO1xyXG4gICAgdmFyIHRhcmdldERhdGEgPSB0YXJnZXRXcmFwcGVyLmRhdGE7XHJcbiAgICB2YXIgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54O1xyXG4gICAgdmFyIGhlaWdodCA9IGltYWdlV3JhcHBlci5zaXplLnk7XHJcbiAgICB2YXIgaW50ZWdyYWxJbWFnZURhdGEgPSBpbnRlZ3JhbFdyYXBwZXIuZGF0YTtcclxuICAgIHZhciBzdW0gPSAwLCB2LCB1LCBrZXJuZWwgPSAzLCBBLCBCLCBDLCBELCBhdmcsIHNpemUgPSAoa2VybmVsICogMiArIDEpICogKGtlcm5lbCAqIDIgKyAxKTtcclxuXHJcbiAgICAvLyBjbGVhciBvdXQgdG9wICYgYm90dG9tLWJvcmRlclxyXG4gICAgZm9yICggdiA9IDA7IHYgPD0ga2VybmVsOyB2KyspIHtcclxuICAgICAgICBmb3IgKCB1ID0gMDsgdSA8IHdpZHRoOyB1KyspIHtcclxuICAgICAgICAgICAgdGFyZ2V0RGF0YVsoKHYpICogd2lkdGgpICsgdV0gPSAwO1xyXG4gICAgICAgICAgICB0YXJnZXREYXRhWygoKGhlaWdodCAtIDEpIC0gdikgKiB3aWR0aCkgKyB1XSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNsZWFyIG91dCBsZWZ0ICYgcmlnaHQgYm9yZGVyXHJcbiAgICBmb3IgKCB2ID0ga2VybmVsOyB2IDwgaGVpZ2h0IC0ga2VybmVsOyB2KyspIHtcclxuICAgICAgICBmb3IgKCB1ID0gMDsgdSA8PSBrZXJuZWw7IHUrKykge1xyXG4gICAgICAgICAgICB0YXJnZXREYXRhWygodikgKiB3aWR0aCkgKyB1XSA9IDA7XHJcbiAgICAgICAgICAgIHRhcmdldERhdGFbKCh2KSAqIHdpZHRoKSArICh3aWR0aCAtIDEgLSB1KV0gPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCB2ID0ga2VybmVsICsgMTsgdiA8IGhlaWdodCAtIGtlcm5lbCAtIDE7IHYrKykge1xyXG4gICAgICAgIGZvciAoIHUgPSBrZXJuZWwgKyAxOyB1IDwgd2lkdGggLSBrZXJuZWw7IHUrKykge1xyXG4gICAgICAgICAgICBBID0gaW50ZWdyYWxJbWFnZURhdGFbKHYgLSBrZXJuZWwgLSAxKSAqIHdpZHRoICsgKHUgLSBrZXJuZWwgLSAxKV07XHJcbiAgICAgICAgICAgIEIgPSBpbnRlZ3JhbEltYWdlRGF0YVsodiAtIGtlcm5lbCAtIDEpICogd2lkdGggKyAodSArIGtlcm5lbCldO1xyXG4gICAgICAgICAgICBDID0gaW50ZWdyYWxJbWFnZURhdGFbKHYgKyBrZXJuZWwpICogd2lkdGggKyAodSAtIGtlcm5lbCAtIDEpXTtcclxuICAgICAgICAgICAgRCA9IGludGVncmFsSW1hZ2VEYXRhWyh2ICsga2VybmVsKSAqIHdpZHRoICsgKHUgKyBrZXJuZWwpXTtcclxuICAgICAgICAgICAgc3VtID0gRCAtIEMgLSBCICsgQTtcclxuICAgICAgICAgICAgYXZnID0gc3VtIC8gKHNpemUpO1xyXG4gICAgICAgICAgICB0YXJnZXREYXRhW3YgKiB3aWR0aCArIHVdID0gaW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdID4gKGF2ZyArIDUpID8gMCA6IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5jbHVzdGVyID0gZnVuY3Rpb24ocG9pbnRzLCB0aHJlc2hvbGQsIHByb3BlcnR5KSB7XHJcbiAgICB2YXIgaSwgaywgY2x1c3RlciwgcG9pbnQsIGNsdXN0ZXJzID0gW107XHJcblxyXG4gICAgaWYgKCFwcm9wZXJ0eSkge1xyXG4gICAgICAgIHByb3BlcnR5ID0gXCJyYWRcIjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRUb0NsdXN0ZXIobmV3UG9pbnQpIHtcclxuICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKCBrID0gMDsgayA8IGNsdXN0ZXJzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIGNsdXN0ZXIgPSBjbHVzdGVyc1trXTtcclxuICAgICAgICAgICAgaWYgKGNsdXN0ZXIuZml0cyhuZXdQb2ludCkpIHtcclxuICAgICAgICAgICAgICAgIGNsdXN0ZXIuYWRkKG5ld1BvaW50KTtcclxuICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGVhY2ggY2xvdWRcclxuICAgIGZvciAoIGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcG9pbnQgPSBDbHVzdGVyMi5jcmVhdGVQb2ludChwb2ludHNbaV0sIGksIHByb3BlcnR5KTtcclxuICAgICAgICBpZiAoIWFkZFRvQ2x1c3Rlcihwb2ludCkpIHtcclxuICAgICAgICAgICAgY2x1c3RlcnMucHVzaChDbHVzdGVyMi5jcmVhdGUocG9pbnQsIHRocmVzaG9sZCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjbHVzdGVycztcclxufTtcclxuXHJcbkNWVXRpbHMuVHJhY2VyID0ge1xyXG4gICAgdHJhY2U6IGZ1bmN0aW9uKHBvaW50cywgdmVjKSB7XHJcbiAgICAgICAgdmFyIGl0ZXJhdGlvbiwgbWF4SXRlcmF0aW9ucyA9IDEwLCB0b3AgPSBbXSwgcmVzdWx0ID0gW10sIGNlbnRlclBvcyA9IDAsIGN1cnJlbnRQb3MgPSAwO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmFjZShpZHgsIGZvcndhcmQpIHtcclxuICAgICAgICAgICAgdmFyIGZyb20sIHRvLCB0b0lkeCwgcHJlZGljdGVkUG9zLCB0aHJlc2hvbGRYID0gMSwgdGhyZXNob2xkWSA9IE1hdGguYWJzKHZlY1sxXSAvIDEwKSwgZm91bmQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG1hdGNoKHBvcywgcHJlZGljdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocG9zLnggPiAocHJlZGljdGVkLnggLSB0aHJlc2hvbGRYKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBwb3MueCA8IChwcmVkaWN0ZWQueCArIHRocmVzaG9sZFgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHBvcy55ID4gKHByZWRpY3RlZC55IC0gdGhyZXNob2xkWSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgcG9zLnkgPCAocHJlZGljdGVkLnkgKyB0aHJlc2hvbGRZKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBuZXh0IGluZGV4IGlzIHdpdGhpbiB0aGUgdmVjIHNwZWNpZmljYXRpb25zXHJcbiAgICAgICAgICAgIC8vIGlmIG5vdCwgY2hlY2sgYXMgbG9uZyBhcyB0aGUgdGhyZXNob2xkIGlzIG1ldFxyXG5cclxuICAgICAgICAgICAgZnJvbSA9IHBvaW50c1tpZHhdO1xyXG4gICAgICAgICAgICBpZiAoZm9yd2FyZCkge1xyXG4gICAgICAgICAgICAgICAgcHJlZGljdGVkUG9zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGZyb20ueCArIHZlY1swXSxcclxuICAgICAgICAgICAgICAgICAgICB5OiBmcm9tLnkgKyB2ZWNbMV1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwcmVkaWN0ZWRQb3MgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogZnJvbS54IC0gdmVjWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IGZyb20ueSAtIHZlY1sxXVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdG9JZHggPSBmb3J3YXJkID8gaWR4ICsgMSA6IGlkeCAtIDE7XHJcbiAgICAgICAgICAgIHRvID0gcG9pbnRzW3RvSWR4XTtcclxuICAgICAgICAgICAgd2hpbGUgKHRvICYmICggZm91bmQgPSBtYXRjaCh0bywgcHJlZGljdGVkUG9zKSkgIT09IHRydWUgJiYgKE1hdGguYWJzKHRvLnkgLSBmcm9tLnkpIDwgdmVjWzFdKSkge1xyXG4gICAgICAgICAgICAgICAgdG9JZHggPSBmb3J3YXJkID8gdG9JZHggKyAxIDogdG9JZHggLSAxO1xyXG4gICAgICAgICAgICAgICAgdG8gPSBwb2ludHNbdG9JZHhdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZm91bmQgPyB0b0lkeCA6IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKCBpdGVyYXRpb24gPSAwOyBpdGVyYXRpb24gPCBtYXhJdGVyYXRpb25zOyBpdGVyYXRpb24rKykge1xyXG4gICAgICAgICAgICAvLyByYW5kb21seSBzZWxlY3QgcG9pbnQgdG8gc3RhcnQgd2l0aFxyXG4gICAgICAgICAgICBjZW50ZXJQb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb2ludHMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRyYWNlIGZvcndhcmRcclxuICAgICAgICAgICAgdG9wID0gW107XHJcbiAgICAgICAgICAgIGN1cnJlbnRQb3MgPSBjZW50ZXJQb3M7XHJcbiAgICAgICAgICAgIHRvcC5wdXNoKHBvaW50c1tjdXJyZW50UG9zXSk7XHJcbiAgICAgICAgICAgIHdoaWxlICgoIGN1cnJlbnRQb3MgPSB0cmFjZShjdXJyZW50UG9zLCB0cnVlKSkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRvcC5wdXNoKHBvaW50c1tjdXJyZW50UG9zXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNlbnRlclBvcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQb3MgPSBjZW50ZXJQb3M7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoKCBjdXJyZW50UG9zID0gdHJhY2UoY3VycmVudFBvcywgZmFsc2UpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcC5wdXNoKHBvaW50c1tjdXJyZW50UG9zXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0b3AubGVuZ3RoID4gcmVzdWx0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdG9wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLkRJTEFURSA9IDE7XHJcbkNWVXRpbHMuRVJPREUgPSAyO1xyXG5cclxuQ1ZVdGlscy5kaWxhdGUgPSBmdW5jdGlvbihpbkltYWdlV3JhcHBlciwgb3V0SW1hZ2VXcmFwcGVyKSB7XHJcbiAgICB2YXIgdixcclxuICAgICAgICB1LFxyXG4gICAgICAgIGluSW1hZ2VEYXRhID0gaW5JbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICBvdXRJbWFnZURhdGEgPSBvdXRJbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICBoZWlnaHQgPSBpbkltYWdlV3JhcHBlci5zaXplLnksXHJcbiAgICAgICAgd2lkdGggPSBpbkltYWdlV3JhcHBlci5zaXplLngsXHJcbiAgICAgICAgc3VtLFxyXG4gICAgICAgIHlTdGFydDEsXHJcbiAgICAgICAgeVN0YXJ0MixcclxuICAgICAgICB4U3RhcnQxLFxyXG4gICAgICAgIHhTdGFydDI7XHJcblxyXG4gICAgZm9yICggdiA9IDE7IHYgPCBoZWlnaHQgLSAxOyB2KyspIHtcclxuICAgICAgICBmb3IgKCB1ID0gMTsgdSA8IHdpZHRoIC0gMTsgdSsrKSB7XHJcbiAgICAgICAgICAgIHlTdGFydDEgPSB2IC0gMTtcclxuICAgICAgICAgICAgeVN0YXJ0MiA9IHYgKyAxO1xyXG4gICAgICAgICAgICB4U3RhcnQxID0gdSAtIDE7XHJcbiAgICAgICAgICAgIHhTdGFydDIgPSB1ICsgMTtcclxuICAgICAgICAgICAgc3VtID0gaW5JbWFnZURhdGFbeVN0YXJ0MSAqIHdpZHRoICsgeFN0YXJ0MV0gKyBpbkltYWdlRGF0YVt5U3RhcnQxICogd2lkdGggKyB4U3RhcnQyXSArXHJcbiAgICAgICAgICAgIGluSW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdICtcclxuICAgICAgICAgICAgaW5JbWFnZURhdGFbeVN0YXJ0MiAqIHdpZHRoICsgeFN0YXJ0MV0gKyBpbkltYWdlRGF0YVt5U3RhcnQyICogd2lkdGggKyB4U3RhcnQyXTtcclxuICAgICAgICAgICAgb3V0SW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdID0gc3VtID4gMCA/IDEgOiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMuZXJvZGUgPSBmdW5jdGlvbihpbkltYWdlV3JhcHBlciwgb3V0SW1hZ2VXcmFwcGVyKSB7XHJcbiAgICB2YXIgdixcclxuICAgICAgICB1LFxyXG4gICAgICAgIGluSW1hZ2VEYXRhID0gaW5JbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICBvdXRJbWFnZURhdGEgPSBvdXRJbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICBoZWlnaHQgPSBpbkltYWdlV3JhcHBlci5zaXplLnksXHJcbiAgICAgICAgd2lkdGggPSBpbkltYWdlV3JhcHBlci5zaXplLngsXHJcbiAgICAgICAgc3VtLFxyXG4gICAgICAgIHlTdGFydDEsXHJcbiAgICAgICAgeVN0YXJ0MixcclxuICAgICAgICB4U3RhcnQxLFxyXG4gICAgICAgIHhTdGFydDI7XHJcblxyXG4gICAgZm9yICggdiA9IDE7IHYgPCBoZWlnaHQgLSAxOyB2KyspIHtcclxuICAgICAgICBmb3IgKCB1ID0gMTsgdSA8IHdpZHRoIC0gMTsgdSsrKSB7XHJcbiAgICAgICAgICAgIHlTdGFydDEgPSB2IC0gMTtcclxuICAgICAgICAgICAgeVN0YXJ0MiA9IHYgKyAxO1xyXG4gICAgICAgICAgICB4U3RhcnQxID0gdSAtIDE7XHJcbiAgICAgICAgICAgIHhTdGFydDIgPSB1ICsgMTtcclxuICAgICAgICAgICAgc3VtID0gaW5JbWFnZURhdGFbeVN0YXJ0MSAqIHdpZHRoICsgeFN0YXJ0MV0gKyBpbkltYWdlRGF0YVt5U3RhcnQxICogd2lkdGggKyB4U3RhcnQyXSArXHJcbiAgICAgICAgICAgIGluSW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdICtcclxuICAgICAgICAgICAgaW5JbWFnZURhdGFbeVN0YXJ0MiAqIHdpZHRoICsgeFN0YXJ0MV0gKyBpbkltYWdlRGF0YVt5U3RhcnQyICogd2lkdGggKyB4U3RhcnQyXTtcclxuICAgICAgICAgICAgb3V0SW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdID0gc3VtID09PSA1ID8gMSA6IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5zdWJ0cmFjdCA9IGZ1bmN0aW9uKGFJbWFnZVdyYXBwZXIsIGJJbWFnZVdyYXBwZXIsIHJlc3VsdEltYWdlV3JhcHBlcikge1xyXG4gICAgaWYgKCFyZXN1bHRJbWFnZVdyYXBwZXIpIHtcclxuICAgICAgICByZXN1bHRJbWFnZVdyYXBwZXIgPSBhSW1hZ2VXcmFwcGVyO1xyXG4gICAgfVxyXG4gICAgdmFyIGxlbmd0aCA9IGFJbWFnZVdyYXBwZXIuZGF0YS5sZW5ndGgsXHJcbiAgICAgICAgYUltYWdlRGF0YSA9IGFJbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICBiSW1hZ2VEYXRhID0gYkltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgIGNJbWFnZURhdGEgPSByZXN1bHRJbWFnZVdyYXBwZXIuZGF0YTtcclxuXHJcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcclxuICAgICAgICBjSW1hZ2VEYXRhW2xlbmd0aF0gPSBhSW1hZ2VEYXRhW2xlbmd0aF0gLSBiSW1hZ2VEYXRhW2xlbmd0aF07XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLmJpdHdpc2VPciA9IGZ1bmN0aW9uKGFJbWFnZVdyYXBwZXIsIGJJbWFnZVdyYXBwZXIsIHJlc3VsdEltYWdlV3JhcHBlcikge1xyXG4gICAgaWYgKCFyZXN1bHRJbWFnZVdyYXBwZXIpIHtcclxuICAgICAgICByZXN1bHRJbWFnZVdyYXBwZXIgPSBhSW1hZ2VXcmFwcGVyO1xyXG4gICAgfVxyXG4gICAgdmFyIGxlbmd0aCA9IGFJbWFnZVdyYXBwZXIuZGF0YS5sZW5ndGgsXHJcbiAgICAgICAgYUltYWdlRGF0YSA9IGFJbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICBiSW1hZ2VEYXRhID0gYkltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgIGNJbWFnZURhdGEgPSByZXN1bHRJbWFnZVdyYXBwZXIuZGF0YTtcclxuXHJcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcclxuICAgICAgICBjSW1hZ2VEYXRhW2xlbmd0aF0gPSBhSW1hZ2VEYXRhW2xlbmd0aF0gfHwgYkltYWdlRGF0YVtsZW5ndGhdO1xyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5jb3VudE5vblplcm8gPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIpIHtcclxuICAgIHZhciBsZW5ndGggPSBpbWFnZVdyYXBwZXIuZGF0YS5sZW5ndGgsIGRhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YSwgc3VtID0gMDtcclxuXHJcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcclxuICAgICAgICBzdW0gKz0gZGF0YVtsZW5ndGhdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1bTtcclxufTtcclxuXHJcbkNWVXRpbHMudG9wR2VuZXJpYyA9IGZ1bmN0aW9uKGxpc3QsIHRvcCwgc2NvcmVGdW5jKSB7XHJcbiAgICB2YXIgaSwgbWluSWR4ID0gMCwgbWluID0gMCwgcXVldWUgPSBbXSwgc2NvcmUsIGhpdCwgcG9zO1xyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgdG9wOyBpKyspIHtcclxuICAgICAgICBxdWV1ZVtpXSA9IHtcclxuICAgICAgICAgICAgc2NvcmU6IDAsXHJcbiAgICAgICAgICAgIGl0ZW06IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHNjb3JlID0gc2NvcmVGdW5jLmFwcGx5KHRoaXMsIFtsaXN0W2ldXSk7XHJcbiAgICAgICAgaWYgKHNjb3JlID4gbWluKSB7XHJcbiAgICAgICAgICAgIGhpdCA9IHF1ZXVlW21pbklkeF07XHJcbiAgICAgICAgICAgIGhpdC5zY29yZSA9IHNjb3JlO1xyXG4gICAgICAgICAgICBoaXQuaXRlbSA9IGxpc3RbaV07XHJcbiAgICAgICAgICAgIG1pbiA9IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgICAgICAgICAgIGZvciAoIHBvcyA9IDA7IHBvcyA8IHRvcDsgcG9zKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChxdWV1ZVtwb3NdLnNjb3JlIDwgbWluKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluID0gcXVldWVbcG9zXS5zY29yZTtcclxuICAgICAgICAgICAgICAgICAgICBtaW5JZHggPSBwb3M7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHF1ZXVlO1xyXG59O1xyXG5cclxuQ1ZVdGlscy5ncmF5QXJyYXlGcm9tSW1hZ2UgPSBmdW5jdGlvbihodG1sSW1hZ2UsIG9mZnNldFgsIGN0eCwgYXJyYXkpIHtcclxuICAgIGN0eC5kcmF3SW1hZ2UoaHRtbEltYWdlLCBvZmZzZXRYLCAwLCBodG1sSW1hZ2Uud2lkdGgsIGh0bWxJbWFnZS5oZWlnaHQpO1xyXG4gICAgdmFyIGN0eERhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKG9mZnNldFgsIDAsIGh0bWxJbWFnZS53aWR0aCwgaHRtbEltYWdlLmhlaWdodCkuZGF0YTtcclxuICAgIENWVXRpbHMuY29tcHV0ZUdyYXkoY3R4RGF0YSwgYXJyYXkpO1xyXG59O1xyXG5cclxuQ1ZVdGlscy5ncmF5QXJyYXlGcm9tQ29udGV4dCA9IGZ1bmN0aW9uKGN0eCwgc2l6ZSwgb2Zmc2V0LCBhcnJheSkge1xyXG4gICAgdmFyIGN0eERhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKG9mZnNldC54LCBvZmZzZXQueSwgc2l6ZS54LCBzaXplLnkpLmRhdGE7XHJcbiAgICBDVlV0aWxzLmNvbXB1dGVHcmF5KGN0eERhdGEsIGFycmF5KTtcclxufTtcclxuXHJcbkNWVXRpbHMuZ3JheUFuZEhhbGZTYW1wbGVGcm9tQ2FudmFzRGF0YSA9IGZ1bmN0aW9uKGNhbnZhc0RhdGEsIHNpemUsIG91dEFycmF5KSB7XHJcbiAgICB2YXIgdG9wUm93SWR4ID0gMDtcclxuICAgIHZhciBib3R0b21Sb3dJZHggPSBzaXplLng7XHJcbiAgICB2YXIgZW5kSWR4ID0gTWF0aC5mbG9vcihjYW52YXNEYXRhLmxlbmd0aCAvIDQpO1xyXG4gICAgdmFyIG91dFdpZHRoID0gc2l6ZS54IC8gMjtcclxuICAgIHZhciBvdXRJbWdJZHggPSAwO1xyXG4gICAgdmFyIGluV2lkdGggPSBzaXplLng7XHJcbiAgICB2YXIgaTtcclxuXHJcbiAgICB3aGlsZSAoYm90dG9tUm93SWR4IDwgZW5kSWR4KSB7XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBvdXRXaWR0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG91dEFycmF5W291dEltZ0lkeF0gPSBNYXRoLmZsb29yKChcclxuICAgICAgICAgICAgICAgICgwLjI5OSAqIGNhbnZhc0RhdGFbdG9wUm93SWR4ICogNCArIDBdICtcclxuICAgICAgICAgICAgICAgICAwLjU4NyAqIGNhbnZhc0RhdGFbdG9wUm93SWR4ICogNCArIDFdICtcclxuICAgICAgICAgICAgICAgICAwLjExNCAqIGNhbnZhc0RhdGFbdG9wUm93SWR4ICogNCArIDJdKSArXHJcbiAgICAgICAgICAgICAgICAoMC4yOTkgKiBjYW52YXNEYXRhWyh0b3BSb3dJZHggKyAxKSAqIDQgKyAwXSArXHJcbiAgICAgICAgICAgICAgICAgMC41ODcgKiBjYW52YXNEYXRhWyh0b3BSb3dJZHggKyAxKSAqIDQgKyAxXSArXHJcbiAgICAgICAgICAgICAgICAgMC4xMTQgKiBjYW52YXNEYXRhWyh0b3BSb3dJZHggKyAxKSAqIDQgKyAyXSkgK1xyXG4gICAgICAgICAgICAgICAgKDAuMjk5ICogY2FudmFzRGF0YVsoYm90dG9tUm93SWR4KSAqIDQgKyAwXSArXHJcbiAgICAgICAgICAgICAgICAgMC41ODcgKiBjYW52YXNEYXRhWyhib3R0b21Sb3dJZHgpICogNCArIDFdICtcclxuICAgICAgICAgICAgICAgICAwLjExNCAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCkgKiA0ICsgMl0pICtcclxuICAgICAgICAgICAgICAgICgwLjI5OSAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCArIDEpICogNCArIDBdICtcclxuICAgICAgICAgICAgICAgICAwLjU4NyAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCArIDEpICogNCArIDFdICtcclxuICAgICAgICAgICAgICAgICAwLjExNCAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCArIDEpICogNCArIDJdKSkgLyA0KTtcclxuICAgICAgICAgICAgb3V0SW1nSWR4Kys7XHJcbiAgICAgICAgICAgIHRvcFJvd0lkeCA9IHRvcFJvd0lkeCArIDI7XHJcbiAgICAgICAgICAgIGJvdHRvbVJvd0lkeCA9IGJvdHRvbVJvd0lkeCArIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRvcFJvd0lkeCA9IHRvcFJvd0lkeCArIGluV2lkdGg7XHJcbiAgICAgICAgYm90dG9tUm93SWR4ID0gYm90dG9tUm93SWR4ICsgaW5XaWR0aDtcclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMuY29tcHV0ZUdyYXkgPSBmdW5jdGlvbihpbWFnZURhdGEsIG91dEFycmF5LCBjb25maWcpIHtcclxuICAgIHZhciBsID0gKGltYWdlRGF0YS5sZW5ndGggLyA0KSB8IDAsXHJcbiAgICAgICAgaSxcclxuICAgICAgICBzaW5nbGVDaGFubmVsID0gY29uZmlnICYmIGNvbmZpZy5zaW5nbGVDaGFubmVsID09PSB0cnVlO1xyXG5cclxuICAgIGlmIChzaW5nbGVDaGFubmVsKSB7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBvdXRBcnJheVtpXSA9IGltYWdlRGF0YVtpICogNCArIDBdO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBvdXRBcnJheVtpXSA9IE1hdGguZmxvb3IoXHJcbiAgICAgICAgICAgICAgICAwLjI5OSAqIGltYWdlRGF0YVtpICogNCArIDBdICsgMC41ODcgKiBpbWFnZURhdGFbaSAqIDQgKyAxXSArIDAuMTE0ICogaW1hZ2VEYXRhW2kgKiA0ICsgMl0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMubG9hZEltYWdlQXJyYXkgPSBmdW5jdGlvbihzcmMsIGNhbGxiYWNrLCBjYW52YXMpIHtcclxuICAgIGlmICghY2FudmFzKSB7XHJcbiAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICBpbWcuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjYW52YXMud2lkdGggPSB0aGlzLndpZHRoO1xyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuICAgICAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLCAwLCAwKTtcclxuICAgICAgICB2YXIgYXJyYXkgPSBuZXcgVWludDhBcnJheSh0aGlzLndpZHRoICogdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcywgMCwgMCk7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KS5kYXRhO1xyXG4gICAgICAgIENWVXRpbHMuY29tcHV0ZUdyYXkoZGF0YSwgYXJyYXkpO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2soYXJyYXksIHtcclxuICAgICAgICAgICAgeDogdGhpcy53aWR0aCxcclxuICAgICAgICAgICAgeTogdGhpcy5oZWlnaHRcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH07XHJcbiAgICBpbWcuc3JjID0gc3JjO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSBpbkltZyB7SW1hZ2VXcmFwcGVyfSBpbnB1dCBpbWFnZSB0byBiZSBzYW1wbGVkXHJcbiAqIEBwYXJhbSBvdXRJbWcge0ltYWdlV3JhcHBlcn0gdG8gYmUgc3RvcmVkIGluXHJcbiAqL1xyXG5DVlV0aWxzLmhhbGZTYW1wbGUgPSBmdW5jdGlvbihpbkltZ1dyYXBwZXIsIG91dEltZ1dyYXBwZXIpIHtcclxuICAgIHZhciBpbkltZyA9IGluSW1nV3JhcHBlci5kYXRhO1xyXG4gICAgdmFyIGluV2lkdGggPSBpbkltZ1dyYXBwZXIuc2l6ZS54O1xyXG4gICAgdmFyIG91dEltZyA9IG91dEltZ1dyYXBwZXIuZGF0YTtcclxuICAgIHZhciB0b3BSb3dJZHggPSAwO1xyXG4gICAgdmFyIGJvdHRvbVJvd0lkeCA9IGluV2lkdGg7XHJcbiAgICB2YXIgZW5kSWR4ID0gaW5JbWcubGVuZ3RoO1xyXG4gICAgdmFyIG91dFdpZHRoID0gaW5XaWR0aCAvIDI7XHJcbiAgICB2YXIgb3V0SW1nSWR4ID0gMDtcclxuICAgIHdoaWxlIChib3R0b21Sb3dJZHggPCBlbmRJZHgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG91dFdpZHRoOyBpKyspIHtcclxuICAgICAgICAgICAgb3V0SW1nW291dEltZ0lkeF0gPSBNYXRoLmZsb29yKFxyXG4gICAgICAgICAgICAgICAgKGluSW1nW3RvcFJvd0lkeF0gKyBpbkltZ1t0b3BSb3dJZHggKyAxXSArIGluSW1nW2JvdHRvbVJvd0lkeF0gKyBpbkltZ1tib3R0b21Sb3dJZHggKyAxXSkgLyA0KTtcclxuICAgICAgICAgICAgb3V0SW1nSWR4Kys7XHJcbiAgICAgICAgICAgIHRvcFJvd0lkeCA9IHRvcFJvd0lkeCArIDI7XHJcbiAgICAgICAgICAgIGJvdHRvbVJvd0lkeCA9IGJvdHRvbVJvd0lkeCArIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRvcFJvd0lkeCA9IHRvcFJvd0lkeCArIGluV2lkdGg7XHJcbiAgICAgICAgYm90dG9tUm93SWR4ID0gYm90dG9tUm93SWR4ICsgaW5XaWR0aDtcclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMuaHN2MnJnYiA9IGZ1bmN0aW9uKGhzdiwgcmdiKSB7XHJcbiAgICB2YXIgaCA9IGhzdlswXSxcclxuICAgICAgICBzID0gaHN2WzFdLFxyXG4gICAgICAgIHYgPSBoc3ZbMl0sXHJcbiAgICAgICAgYyA9IHYgKiBzLFxyXG4gICAgICAgIHggPSBjICogKDEgLSBNYXRoLmFicygoaCAvIDYwKSAlIDIgLSAxKSksXHJcbiAgICAgICAgbSA9IHYgLSBjLFxyXG4gICAgICAgIHIgPSAwLFxyXG4gICAgICAgIGcgPSAwLFxyXG4gICAgICAgIGIgPSAwO1xyXG5cclxuICAgIHJnYiA9IHJnYiB8fCBbMCwgMCwgMF07XHJcblxyXG4gICAgaWYgKGggPCA2MCkge1xyXG4gICAgICAgIHIgPSBjO1xyXG4gICAgICAgIGcgPSB4O1xyXG4gICAgfSBlbHNlIGlmIChoIDwgMTIwKSB7XHJcbiAgICAgICAgciA9IHg7XHJcbiAgICAgICAgZyA9IGM7XHJcbiAgICB9IGVsc2UgaWYgKGggPCAxODApIHtcclxuICAgICAgICBnID0gYztcclxuICAgICAgICBiID0geDtcclxuICAgIH0gZWxzZSBpZiAoaCA8IDI0MCkge1xyXG4gICAgICAgIGcgPSB4O1xyXG4gICAgICAgIGIgPSBjO1xyXG4gICAgfSBlbHNlIGlmIChoIDwgMzAwKSB7XHJcbiAgICAgICAgciA9IHg7XHJcbiAgICAgICAgYiA9IGM7XHJcbiAgICB9IGVsc2UgaWYgKGggPCAzNjApIHtcclxuICAgICAgICByID0gYztcclxuICAgICAgICBiID0geDtcclxuICAgIH1cclxuICAgIHJnYlswXSA9ICgociArIG0pICogMjU1KSB8IDA7XHJcbiAgICByZ2JbMV0gPSAoKGcgKyBtKSAqIDI1NSkgfCAwO1xyXG4gICAgcmdiWzJdID0gKChiICsgbSkgKiAyNTUpIHwgMDtcclxuICAgIHJldHVybiByZ2I7XHJcbn07XHJcblxyXG5DVlV0aWxzLl9jb21wdXRlRGl2aXNvcnMgPSBmdW5jdGlvbihuKSB7XHJcbiAgICB2YXIgbGFyZ2VEaXZpc29ycyA9IFtdLFxyXG4gICAgICAgIGRpdmlzb3JzID0gW10sXHJcbiAgICAgICAgaTtcclxuXHJcbiAgICBmb3IgKGkgPSAxOyBpIDwgTWF0aC5zcXJ0KG4pICsgMTsgaSsrKSB7XHJcbiAgICAgICAgaWYgKG4gJSBpID09PSAwKSB7XHJcbiAgICAgICAgICAgIGRpdmlzb3JzLnB1c2goaSk7XHJcbiAgICAgICAgICAgIGlmIChpICE9PSBuIC8gaSkge1xyXG4gICAgICAgICAgICAgICAgbGFyZ2VEaXZpc29ycy51bnNoaWZ0KE1hdGguZmxvb3IobiAvIGkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBkaXZpc29ycy5jb25jYXQobGFyZ2VEaXZpc29ycyk7XHJcbn07XHJcblxyXG5DVlV0aWxzLl9jb21wdXRlSW50ZXJzZWN0aW9uID0gZnVuY3Rpb24oYXJyMSwgYXJyMikge1xyXG4gICAgdmFyIGkgPSAwLFxyXG4gICAgICAgIGogPSAwLFxyXG4gICAgICAgIHJlc3VsdCA9IFtdO1xyXG5cclxuICAgIHdoaWxlIChpIDwgYXJyMS5sZW5ndGggJiYgaiA8IGFycjIubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKGFycjFbaV0gPT09IGFycjJbal0pIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goYXJyMVtpXSk7XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgaisrO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJyMVtpXSA+IGFycjJbal0pIHtcclxuICAgICAgICAgICAgaisrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuQ1ZVdGlscy5jYWxjdWxhdGVQYXRjaFNpemUgPSBmdW5jdGlvbihwYXRjaFNpemUsIGltZ1NpemUpIHtcclxuICAgIHZhciBkaXZpc29yc1ggPSB0aGlzLl9jb21wdXRlRGl2aXNvcnMoaW1nU2l6ZS54KSxcclxuICAgICAgICBkaXZpc29yc1kgPSB0aGlzLl9jb21wdXRlRGl2aXNvcnMoaW1nU2l6ZS55KSxcclxuICAgICAgICB3aWRlU2lkZSA9IE1hdGgubWF4KGltZ1NpemUueCwgaW1nU2l6ZS55KSxcclxuICAgICAgICBjb21tb24gPSB0aGlzLl9jb21wdXRlSW50ZXJzZWN0aW9uKGRpdmlzb3JzWCwgZGl2aXNvcnNZKSxcclxuICAgICAgICBuck9mUGF0Y2hlc0xpc3QgPSBbOCwgMTAsIDE1LCAyMCwgMzIsIDYwLCA4MF0sXHJcbiAgICAgICAgbnJPZlBhdGNoZXNNYXAgPSB7XHJcbiAgICAgICAgICAgIFwieC1zbWFsbFwiOiA1LFxyXG4gICAgICAgICAgICBcInNtYWxsXCI6IDQsXHJcbiAgICAgICAgICAgIFwibWVkaXVtXCI6IDMsXHJcbiAgICAgICAgICAgIFwibGFyZ2VcIjogMixcclxuICAgICAgICAgICAgXCJ4LWxhcmdlXCI6IDFcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5yT2ZQYXRjaGVzSWR4ID0gbnJPZlBhdGNoZXNNYXBbcGF0Y2hTaXplXSB8fCBuck9mUGF0Y2hlc01hcC5tZWRpdW0sXHJcbiAgICAgICAgbnJPZlBhdGNoZXMgPSBuck9mUGF0Y2hlc0xpc3RbbnJPZlBhdGNoZXNJZHhdLFxyXG4gICAgICAgIGRlc2lyZWRQYXRjaFNpemUgPSBNYXRoLmZsb29yKHdpZGVTaWRlIC8gbnJPZlBhdGNoZXMpLFxyXG4gICAgICAgIG9wdGltYWxQYXRjaFNpemU7XHJcblxyXG4gICAgZnVuY3Rpb24gZmluZFBhdGNoU2l6ZUZvckRpdmlzb3JzKGRpdmlzb3JzKSB7XHJcbiAgICAgICAgdmFyIGkgPSAwLFxyXG4gICAgICAgICAgICBmb3VuZCA9IGRpdmlzb3JzW01hdGguZmxvb3IoZGl2aXNvcnMubGVuZ3RoIC8gMildO1xyXG5cclxuICAgICAgICB3aGlsZSAoaSA8IChkaXZpc29ycy5sZW5ndGggLSAxKSAmJiBkaXZpc29yc1tpXSA8IGRlc2lyZWRQYXRjaFNpemUpIHtcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaSA+IDApIHtcclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRpdmlzb3JzW2ldIC0gZGVzaXJlZFBhdGNoU2l6ZSkgPiBNYXRoLmFicyhkaXZpc29yc1tpIC0gMV0gLSBkZXNpcmVkUGF0Y2hTaXplKSkge1xyXG4gICAgICAgICAgICAgICAgZm91bmQgPSBkaXZpc29yc1tpIC0gMV07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3VuZCA9IGRpdmlzb3JzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkZXNpcmVkUGF0Y2hTaXplIC8gZm91bmQgPCBuck9mUGF0Y2hlc0xpc3RbbnJPZlBhdGNoZXNJZHggKyAxXSAvIG5yT2ZQYXRjaGVzTGlzdFtuck9mUGF0Y2hlc0lkeF0gJiZcclxuICAgICAgICAgICAgZGVzaXJlZFBhdGNoU2l6ZSAvIGZvdW5kID4gbnJPZlBhdGNoZXNMaXN0W25yT2ZQYXRjaGVzSWR4IC0gMV0gLyBuck9mUGF0Y2hlc0xpc3RbbnJPZlBhdGNoZXNJZHhdICkge1xyXG4gICAgICAgICAgICByZXR1cm4ge3g6IGZvdW5kLCB5OiBmb3VuZH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIG9wdGltYWxQYXRjaFNpemUgPSBmaW5kUGF0Y2hTaXplRm9yRGl2aXNvcnMoY29tbW9uKTtcclxuICAgIGlmICghb3B0aW1hbFBhdGNoU2l6ZSkge1xyXG4gICAgICAgIG9wdGltYWxQYXRjaFNpemUgPSBmaW5kUGF0Y2hTaXplRm9yRGl2aXNvcnModGhpcy5fY29tcHV0ZURpdmlzb3JzKHdpZGVTaWRlKSk7XHJcbiAgICAgICAgaWYgKCFvcHRpbWFsUGF0Y2hTaXplKSB7XHJcbiAgICAgICAgICAgIG9wdGltYWxQYXRjaFNpemUgPSBmaW5kUGF0Y2hTaXplRm9yRGl2aXNvcnMoKHRoaXMuX2NvbXB1dGVEaXZpc29ycyhkZXNpcmVkUGF0Y2hTaXplICogbnJPZlBhdGNoZXMpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9wdGltYWxQYXRjaFNpemU7XHJcbn07XHJcblxyXG5DVlV0aWxzLl9wYXJzZUNTU0RpbWVuc2lvblZhbHVlcyA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICB2YXIgZGltZW5zaW9uID0ge1xyXG4gICAgICAgIHZhbHVlOiBwYXJzZUZsb2F0KHZhbHVlKSxcclxuICAgICAgICB1bml0OiB2YWx1ZS5pbmRleE9mKFwiJVwiKSA9PT0gdmFsdWUubGVuZ3RoIC0gMSA/IFwiJVwiIDogXCIlXCJcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGRpbWVuc2lvbjtcclxufTtcclxuXHJcbkNWVXRpbHMuX2RpbWVuc2lvbnNDb252ZXJ0ZXJzID0ge1xyXG4gICAgdG9wOiBmdW5jdGlvbihkaW1lbnNpb24sIGNvbnRleHQpIHtcclxuICAgICAgICBpZiAoZGltZW5zaW9uLnVuaXQgPT09IFwiJVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKGNvbnRleHQuaGVpZ2h0ICogKGRpbWVuc2lvbi52YWx1ZSAvIDEwMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByaWdodDogZnVuY3Rpb24oZGltZW5zaW9uLCBjb250ZXh0KSB7XHJcbiAgICAgICAgaWYgKGRpbWVuc2lvbi51bml0ID09PSBcIiVcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihjb250ZXh0LndpZHRoIC0gKGNvbnRleHQud2lkdGggKiAoZGltZW5zaW9uLnZhbHVlIC8gMTAwKSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBib3R0b206IGZ1bmN0aW9uKGRpbWVuc2lvbiwgY29udGV4dCkge1xyXG4gICAgICAgIGlmIChkaW1lbnNpb24udW5pdCA9PT0gXCIlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoY29udGV4dC5oZWlnaHQgLSAoY29udGV4dC5oZWlnaHQgKiAoZGltZW5zaW9uLnZhbHVlIC8gMTAwKSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBsZWZ0OiBmdW5jdGlvbihkaW1lbnNpb24sIGNvbnRleHQpIHtcclxuICAgICAgICBpZiAoZGltZW5zaW9uLnVuaXQgPT09IFwiJVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKGNvbnRleHQud2lkdGggKiAoZGltZW5zaW9uLnZhbHVlIC8gMTAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5jb21wdXRlSW1hZ2VBcmVhID0gZnVuY3Rpb24oaW5wdXRXaWR0aCwgaW5wdXRIZWlnaHQsIGFyZWEpIHtcclxuICAgIHZhciBjb250ZXh0ID0ge3dpZHRoOiBpbnB1dFdpZHRoLCBoZWlnaHQ6IGlucHV0SGVpZ2h0fTtcclxuXHJcbiAgICB2YXIgcGFyc2VkQXJlYSA9IE9iamVjdC5rZXlzKGFyZWEpLnJlZHVjZShmdW5jdGlvbihyZXN1bHQsIGtleSkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IGFyZWFba2V5XSxcclxuICAgICAgICAgICAgcGFyc2VkID0gQ1ZVdGlscy5fcGFyc2VDU1NEaW1lbnNpb25WYWx1ZXModmFsdWUpLFxyXG4gICAgICAgICAgICBjYWxjdWxhdGVkID0gQ1ZVdGlscy5fZGltZW5zaW9uc0NvbnZlcnRlcnNba2V5XShwYXJzZWQsIGNvbnRleHQpO1xyXG5cclxuICAgICAgICByZXN1bHRba2V5XSA9IGNhbGN1bGF0ZWQ7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0sIHt9KTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN4OiBwYXJzZWRBcmVhLmxlZnQsXHJcbiAgICAgICAgc3k6IHBhcnNlZEFyZWEudG9wLFxyXG4gICAgICAgIHN3OiBwYXJzZWRBcmVhLnJpZ2h0IC0gcGFyc2VkQXJlYS5sZWZ0LFxyXG4gICAgICAgIHNoOiBwYXJzZWRBcmVhLmJvdHRvbSAtIHBhcnNlZEFyZWEudG9wXHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ1ZVdGlscztcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvY3ZfdXRpbHMuanNcbiAqKi8iLCJpbXBvcnQge3ZlYzJ9IGZyb20gJ2dsLW1hdHJpeCc7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBjbHVzdGVyIGZvciBncm91cGluZyBzaW1pbGFyIG9yaWVudGF0aW9ucyBvZiBkYXRhcG9pbnRzXHJcbiAgICAgKi9cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihwb2ludCwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgdmFyIHBvaW50cyA9IFtdLFxyXG4gICAgICAgICAgICBjZW50ZXIgPSB7XHJcbiAgICAgICAgICAgICAgICByYWQ6IDAsXHJcbiAgICAgICAgICAgICAgICB2ZWM6IHZlYzIuY2xvbmUoWzAsIDBdKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwb2ludE1hcCA9IHt9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgICAgICBhZGQocG9pbnQpO1xyXG4gICAgICAgICAgICB1cGRhdGVDZW50ZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZChwb2ludFRvQWRkKSB7XHJcbiAgICAgICAgICAgIHBvaW50TWFwW3BvaW50VG9BZGQuaWRdID0gcG9pbnRUb0FkZDtcclxuICAgICAgICAgICAgcG9pbnRzLnB1c2gocG9pbnRUb0FkZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVDZW50ZXIoKSB7XHJcbiAgICAgICAgICAgIHZhciBpLCBzdW0gPSAwO1xyXG4gICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc3VtICs9IHBvaW50c1tpXS5yYWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2VudGVyLnJhZCA9IHN1bSAvIHBvaW50cy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGNlbnRlci52ZWMgPSB2ZWMyLmNsb25lKFtNYXRoLmNvcyhjZW50ZXIucmFkKSwgTWF0aC5zaW4oY2VudGVyLnJhZCldKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWRkOiBmdW5jdGlvbihwb2ludFRvQWRkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBvaW50TWFwW3BvaW50VG9BZGQuaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkKHBvaW50VG9BZGQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUNlbnRlcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmaXRzOiBmdW5jdGlvbihvdGhlclBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBjb3NpbmUgc2ltaWxhcml0eSB0byBjZW50ZXItYW5nbGVcclxuICAgICAgICAgICAgICAgIHZhciBzaW1pbGFyaXR5ID0gTWF0aC5hYnModmVjMi5kb3Qob3RoZXJQb2ludC5wb2ludC52ZWMsIGNlbnRlci52ZWMpKTtcclxuICAgICAgICAgICAgICAgIGlmIChzaW1pbGFyaXR5ID4gdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFBvaW50czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9pbnRzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRDZW50ZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNlbnRlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlUG9pbnQ6IGZ1bmN0aW9uKG5ld1BvaW50LCBpZCwgcHJvcGVydHkpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByYWQ6IG5ld1BvaW50W3Byb3BlcnR5XSxcclxuICAgICAgICAgICAgcG9pbnQ6IG5ld1BvaW50LFxyXG4gICAgICAgICAgICBpZDogaWRcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9jbHVzdGVyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ2wtbWF0cml4XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJnbC1tYXRyaXhcIlxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKGFyciwgdmFsKSB7XHJcbiAgICAgICAgdmFyIGwgPSBhcnIubGVuZ3RoO1xyXG4gICAgICAgIHdoaWxlIChsLS0pIHtcclxuICAgICAgICAgICAgYXJyW2xdID0gdmFsO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaHVmZmxlcyB0aGUgY29udGVudCBvZiBhbiBhcnJheVxyXG4gICAgICogQHJldHVybiB7QXJyYXl9IHRoZSBhcnJheSBpdHNlbGYgc2h1ZmZsZWRcclxuICAgICAqL1xyXG4gICAgc2h1ZmZsZTogZnVuY3Rpb24oYXJyKSB7XHJcbiAgICAgICAgdmFyIGkgPSBhcnIubGVuZ3RoIC0gMSwgaiwgeDtcclxuICAgICAgICBmb3IgKGk7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKTtcclxuICAgICAgICAgICAgeCA9IGFycltpXTtcclxuICAgICAgICAgICAgYXJyW2ldID0gYXJyW2pdO1xyXG4gICAgICAgICAgICBhcnJbal0gPSB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfSxcclxuXHJcbiAgICB0b1BvaW50TGlzdDogZnVuY3Rpb24oYXJyKSB7XHJcbiAgICAgICAgdmFyIGksIGosIHJvdyA9IFtdLCByb3dzID0gW107XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcm93ID0gW107XHJcbiAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgYXJyW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICByb3dbal0gPSBhcnJbaV1bal07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcm93c1tpXSA9IFwiW1wiICsgcm93LmpvaW4oXCIsXCIpICsgXCJdXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIltcIiArIHJvd3Muam9pbihcIixcXHJcXG5cIikgKyBcIl1cIjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm5zIHRoZSBlbGVtZW50cyB3aGljaCdzIHNjb3JlIGlzIGJpZ2dlciB0aGFuIHRoZSB0aHJlc2hvbGRcclxuICAgICAqIEByZXR1cm4ge0FycmF5fSB0aGUgcmVkdWNlZCBhcnJheVxyXG4gICAgICovXHJcbiAgICB0aHJlc2hvbGQ6IGZ1bmN0aW9uKGFyciwgdGhyZXNob2xkLCBzY29yZUZ1bmMpIHtcclxuICAgICAgICB2YXIgaSwgcXVldWUgPSBbXTtcclxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoc2NvcmVGdW5jLmFwcGx5KGFyciwgW2FycltpXV0pID49IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgcXVldWUucHVzaChhcnJbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBxdWV1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgbWF4SW5kZXg6IGZ1bmN0aW9uKGFycikge1xyXG4gICAgICAgIHZhciBpLCBtYXggPSAwO1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChhcnJbaV0gPiBhcnJbbWF4XSkge1xyXG4gICAgICAgICAgICAgICAgbWF4ID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF4O1xyXG4gICAgfSxcclxuXHJcbiAgICBtYXg6IGZ1bmN0aW9uKGFycikge1xyXG4gICAgICAgIHZhciBpLCBtYXggPSAwO1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChhcnJbaV0gPiBtYXgpIHtcclxuICAgICAgICAgICAgICAgIG1heCA9IGFycltpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF4O1xyXG4gICAgfSxcclxuXHJcbiAgICBzdW06IGZ1bmN0aW9uKGFycikge1xyXG4gICAgICAgIHZhciBsZW5ndGggPSBhcnIubGVuZ3RoLFxyXG4gICAgICAgICAgICBzdW0gPSAwO1xyXG5cclxuICAgICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcclxuICAgICAgICAgICAgc3VtICs9IGFycltsZW5ndGhdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3VtO1xyXG4gICAgfVxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9hcnJheV9oZWxwZXIuanNcbiAqKi8iLCJpbXBvcnQgSW1hZ2VXcmFwcGVyIGZyb20gJy4vaW1hZ2Vfd3JhcHBlcic7XHJcbmltcG9ydCBDVlV0aWxzIGZyb20gJy4vY3ZfdXRpbHMnO1xyXG5pbXBvcnQgUmFzdGVyaXplciBmcm9tICcuL3Jhc3Rlcml6ZXInO1xyXG5pbXBvcnQgVHJhY2VyIGZyb20gJy4vdHJhY2VyJztcclxuaW1wb3J0IHNrZWxldG9uaXplciBmcm9tICcuL3NrZWxldG9uaXplcic7XHJcbmltcG9ydCBBcnJheUhlbHBlciBmcm9tICcuL2FycmF5X2hlbHBlcic7XHJcbmltcG9ydCBJbWFnZURlYnVnIGZyb20gJy4vaW1hZ2VfZGVidWcnO1xyXG5pbXBvcnQgZ2xNYXRyaXggZnJvbSAnZ2wtbWF0cml4JztcclxuXHJcbnZhciBfY29uZmlnLFxyXG4gICAgX2N1cnJlbnRJbWFnZVdyYXBwZXIsXHJcbiAgICBfc2tlbEltYWdlV3JhcHBlcixcclxuICAgIF9zdWJJbWFnZVdyYXBwZXIsXHJcbiAgICBfbGFiZWxJbWFnZVdyYXBwZXIsXHJcbiAgICBfcGF0Y2hHcmlkLFxyXG4gICAgX3BhdGNoTGFiZWxHcmlkLFxyXG4gICAgX2ltYWdlVG9QYXRjaEdyaWQsXHJcbiAgICBfYmluYXJ5SW1hZ2VXcmFwcGVyLFxyXG4gICAgX3BhdGNoU2l6ZSxcclxuICAgIF9jYW52YXNDb250YWluZXIgPSB7XHJcbiAgICAgICAgY3R4OiB7XHJcbiAgICAgICAgICAgIGJpbmFyeTogbnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZG9tOiB7XHJcbiAgICAgICAgICAgIGJpbmFyeTogbnVsbFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBfbnVtUGF0Y2hlcyA9IHt4OiAwLCB5OiAwfSxcclxuICAgIF9pbnB1dEltYWdlV3JhcHBlcixcclxuICAgIF9za2VsZXRvbml6ZXIsXHJcbiAgICB2ZWMyID0gZ2xNYXRyaXgudmVjMixcclxuICAgIG1hdDIgPSBnbE1hdHJpeC5tYXQyO1xyXG5cclxuZnVuY3Rpb24gaW5pdEJ1ZmZlcnMoKSB7XHJcbiAgICB2YXIgc2tlbGV0b25JbWFnZURhdGE7XHJcblxyXG4gICAgaWYgKF9jb25maWcuaGFsZlNhbXBsZSkge1xyXG4gICAgICAgIF9jdXJyZW50SW1hZ2VXcmFwcGVyID0gbmV3IEltYWdlV3JhcHBlcih7XHJcbiAgICAgICAgICAgIHg6IF9pbnB1dEltYWdlV3JhcHBlci5zaXplLnggLyAyIHwgMCxcclxuICAgICAgICAgICAgeTogX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUueSAvIDIgfCAwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIF9jdXJyZW50SW1hZ2VXcmFwcGVyID0gX2lucHV0SW1hZ2VXcmFwcGVyO1xyXG4gICAgfVxyXG5cclxuICAgIF9wYXRjaFNpemUgPSBDVlV0aWxzLmNhbGN1bGF0ZVBhdGNoU2l6ZShfY29uZmlnLnBhdGNoU2l6ZSwgX2N1cnJlbnRJbWFnZVdyYXBwZXIuc2l6ZSk7XHJcblxyXG4gICAgX251bVBhdGNoZXMueCA9IF9jdXJyZW50SW1hZ2VXcmFwcGVyLnNpemUueCAvIF9wYXRjaFNpemUueCB8IDA7XHJcbiAgICBfbnVtUGF0Y2hlcy55ID0gX2N1cnJlbnRJbWFnZVdyYXBwZXIuc2l6ZS55IC8gX3BhdGNoU2l6ZS55IHwgMDtcclxuXHJcbiAgICBfYmluYXJ5SW1hZ2VXcmFwcGVyID0gbmV3IEltYWdlV3JhcHBlcihfY3VycmVudEltYWdlV3JhcHBlci5zaXplLCB1bmRlZmluZWQsIFVpbnQ4QXJyYXksIGZhbHNlKTtcclxuXHJcbiAgICBfbGFiZWxJbWFnZVdyYXBwZXIgPSBuZXcgSW1hZ2VXcmFwcGVyKF9wYXRjaFNpemUsIHVuZGVmaW5lZCwgQXJyYXksIHRydWUpO1xyXG5cclxuICAgIHNrZWxldG9uSW1hZ2VEYXRhID0gbmV3IEFycmF5QnVmZmVyKDY0ICogMTAyNCk7XHJcbiAgICBfc3ViSW1hZ2VXcmFwcGVyID0gbmV3IEltYWdlV3JhcHBlcihfcGF0Y2hTaXplLFxyXG4gICAgICAgIG5ldyBVaW50OEFycmF5KHNrZWxldG9uSW1hZ2VEYXRhLCAwLCBfcGF0Y2hTaXplLnggKiBfcGF0Y2hTaXplLnkpKTtcclxuICAgIF9za2VsSW1hZ2VXcmFwcGVyID0gbmV3IEltYWdlV3JhcHBlcihfcGF0Y2hTaXplLFxyXG4gICAgICAgIG5ldyBVaW50OEFycmF5KHNrZWxldG9uSW1hZ2VEYXRhLCBfcGF0Y2hTaXplLnggKiBfcGF0Y2hTaXplLnkgKiAzLCBfcGF0Y2hTaXplLnggKiBfcGF0Y2hTaXplLnkpLFxyXG4gICAgICAgIHVuZGVmaW5lZCwgdHJ1ZSk7XHJcbiAgICBfc2tlbGV0b25pemVyID0gc2tlbGV0b25pemVyKCh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgPyB3aW5kb3cgOiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSA/IHNlbGYgOiBnbG9iYWwsIHtcclxuICAgICAgICBzaXplOiBfcGF0Y2hTaXplLnhcclxuICAgIH0sIHNrZWxldG9uSW1hZ2VEYXRhKTtcclxuXHJcbiAgICBfaW1hZ2VUb1BhdGNoR3JpZCA9IG5ldyBJbWFnZVdyYXBwZXIoe1xyXG4gICAgICAgIHg6IChfY3VycmVudEltYWdlV3JhcHBlci5zaXplLnggLyBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueCkgfCAwLFxyXG4gICAgICAgIHk6IChfY3VycmVudEltYWdlV3JhcHBlci5zaXplLnkgLyBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueSkgfCAwXHJcbiAgICB9LCB1bmRlZmluZWQsIEFycmF5LCB0cnVlKTtcclxuICAgIF9wYXRjaEdyaWQgPSBuZXcgSW1hZ2VXcmFwcGVyKF9pbWFnZVRvUGF0Y2hHcmlkLnNpemUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKTtcclxuICAgIF9wYXRjaExhYmVsR3JpZCA9IG5ldyBJbWFnZVdyYXBwZXIoX2ltYWdlVG9QYXRjaEdyaWQuc2l6ZSwgdW5kZWZpbmVkLCBJbnQzMkFycmF5LCB0cnVlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdENhbnZhcygpIHtcclxuICAgIGlmIChfY29uZmlnLnVzZVdvcmtlciB8fCB0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgIF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeS5jbGFzc05hbWUgPSBcImJpbmFyeUJ1ZmZlclwiO1xyXG4gICAgaWYgKF9jb25maWcuc2hvd0NhbnZhcyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVidWdcIikuYXBwZW5kQ2hpbGQoX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5KTtcclxuICAgIH1cclxuICAgIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSA9IF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkud2lkdGggPSBfYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueDtcclxuICAgIF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeS5oZWlnaHQgPSBfYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBib3VuZGluZyBib3ggd2hpY2ggZW5jbG9zZXMgYWxsIHRoZSBnaXZlbiBwYXRjaGVzXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gVGhlIG1pbmltYWwgYm91bmRpbmcgYm94XHJcbiAqL1xyXG5mdW5jdGlvbiBib3hGcm9tUGF0Y2hlcyhwYXRjaGVzKSB7XHJcbiAgICB2YXIgb3ZlckF2ZyxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGosXHJcbiAgICAgICAgcGF0Y2gsXHJcbiAgICAgICAgdHJhbnNNYXQsXHJcbiAgICAgICAgbWlueCA9XHJcbiAgICAgICAgX2JpbmFyeUltYWdlV3JhcHBlci5zaXplLngsXHJcbiAgICAgICAgbWlueSA9IF9iaW5hcnlJbWFnZVdyYXBwZXIuc2l6ZS55LFxyXG4gICAgICAgIG1heHggPSAtX2JpbmFyeUltYWdlV3JhcHBlci5zaXplLngsXHJcbiAgICAgICAgbWF4eSA9IC1fYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueSxcclxuICAgICAgICBib3gsXHJcbiAgICAgICAgc2NhbGU7XHJcblxyXG4gICAgLy8gZHJhdyBhbGwgcGF0Y2hlcyB3aGljaCBhcmUgdG8gYmUgdGFrZW4gaW50byBjb25zaWRlcmF0aW9uXHJcbiAgICBvdmVyQXZnID0gMDtcclxuICAgIGZvciAoIGkgPSAwOyBpIDwgcGF0Y2hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHBhdGNoID0gcGF0Y2hlc1tpXTtcclxuICAgICAgICBvdmVyQXZnICs9IHBhdGNoLnJhZDtcclxuICAgICAgICBpZiAoX2NvbmZpZy5zaG93UGF0Y2hlcykge1xyXG4gICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdSZWN0KHBhdGNoLnBvcywgX3N1YkltYWdlV3JhcHBlci5zaXplLCBfY2FudmFzQ29udGFpbmVyLmN0eC5iaW5hcnksIHtjb2xvcjogXCJyZWRcIn0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvdmVyQXZnIC89IHBhdGNoZXMubGVuZ3RoO1xyXG4gICAgb3ZlckF2ZyA9IChvdmVyQXZnICogMTgwIC8gTWF0aC5QSSArIDkwKSAlIDE4MCAtIDkwO1xyXG4gICAgaWYgKG92ZXJBdmcgPCAwKSB7XHJcbiAgICAgICAgb3ZlckF2ZyArPSAxODA7XHJcbiAgICB9XHJcblxyXG4gICAgb3ZlckF2ZyA9ICgxODAgLSBvdmVyQXZnKSAqIE1hdGguUEkgLyAxODA7XHJcbiAgICB0cmFuc01hdCA9IG1hdDIuY2xvbmUoW01hdGguY29zKG92ZXJBdmcpLCBNYXRoLnNpbihvdmVyQXZnKSwgLU1hdGguc2luKG92ZXJBdmcpLCBNYXRoLmNvcyhvdmVyQXZnKV0pO1xyXG5cclxuICAgIC8vIGl0ZXJhdGUgb3ZlciBwYXRjaGVzIGFuZCByb3RhdGUgYnkgYW5nbGVcclxuICAgIGZvciAoIGkgPSAwOyBpIDwgcGF0Y2hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHBhdGNoID0gcGF0Y2hlc1tpXTtcclxuICAgICAgICBmb3IgKCBqID0gMDsgaiA8IDQ7IGorKykge1xyXG4gICAgICAgICAgICB2ZWMyLnRyYW5zZm9ybU1hdDIocGF0Y2guYm94W2pdLCBwYXRjaC5ib3hbal0sIHRyYW5zTWF0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChfY29uZmlnLmJveEZyb21QYXRjaGVzLnNob3dUcmFuc2Zvcm1lZCkge1xyXG4gICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdQYXRoKHBhdGNoLmJveCwge3g6IDAsIHk6IDF9LCBfY2FudmFzQ29udGFpbmVyLmN0eC5iaW5hcnksIHtjb2xvcjogJyM5OWZmMDAnLCBsaW5lV2lkdGg6IDJ9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZmluZCBib3VuZGluZyBib3hcclxuICAgIGZvciAoIGkgPSAwOyBpIDwgcGF0Y2hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHBhdGNoID0gcGF0Y2hlc1tpXTtcclxuICAgICAgICBmb3IgKCBqID0gMDsgaiA8IDQ7IGorKykge1xyXG4gICAgICAgICAgICBpZiAocGF0Y2guYm94W2pdWzBdIDwgbWlueCkge1xyXG4gICAgICAgICAgICAgICAgbWlueCA9IHBhdGNoLmJveFtqXVswXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGF0Y2guYm94W2pdWzBdID4gbWF4eCkge1xyXG4gICAgICAgICAgICAgICAgbWF4eCA9IHBhdGNoLmJveFtqXVswXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGF0Y2guYm94W2pdWzFdIDwgbWlueSkge1xyXG4gICAgICAgICAgICAgICAgbWlueSA9IHBhdGNoLmJveFtqXVsxXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGF0Y2guYm94W2pdWzFdID4gbWF4eSkge1xyXG4gICAgICAgICAgICAgICAgbWF4eSA9IHBhdGNoLmJveFtqXVsxXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBib3ggPSBbW21pbngsIG1pbnldLCBbbWF4eCwgbWlueV0sIFttYXh4LCBtYXh5XSwgW21pbngsIG1heHldXTtcclxuXHJcbiAgICBpZiAoX2NvbmZpZy5ib3hGcm9tUGF0Y2hlcy5zaG93VHJhbnNmb3JtZWRCb3gpIHtcclxuICAgICAgICBJbWFnZURlYnVnLmRyYXdQYXRoKGJveCwge3g6IDAsIHk6IDF9LCBfY2FudmFzQ29udGFpbmVyLmN0eC5iaW5hcnksIHtjb2xvcjogJyNmZjAwMDAnLCBsaW5lV2lkdGg6IDJ9KTtcclxuICAgIH1cclxuXHJcbiAgICBzY2FsZSA9IF9jb25maWcuaGFsZlNhbXBsZSA/IDIgOiAxO1xyXG4gICAgLy8gcmV2ZXJzZSByb3RhdGlvbjtcclxuICAgIHRyYW5zTWF0ID0gbWF0Mi5pbnZlcnQodHJhbnNNYXQsIHRyYW5zTWF0KTtcclxuICAgIGZvciAoIGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgdmVjMi50cmFuc2Zvcm1NYXQyKGJveFtqXSwgYm94W2pdLCB0cmFuc01hdCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9jb25maWcuYm94RnJvbVBhdGNoZXMuc2hvd0JCKSB7XHJcbiAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UGF0aChib3gsIHt4OiAwLCB5OiAxfSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LCB7Y29sb3I6ICcjZmYwMDAwJywgbGluZVdpZHRoOiAyfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICggaiA9IDA7IGogPCA0OyBqKyspIHtcclxuICAgICAgICB2ZWMyLnNjYWxlKGJveFtqXSwgYm94W2pdLCBzY2FsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGJveDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBiaW5hcnkgaW1hZ2Ugb2YgdGhlIGN1cnJlbnQgaW1hZ2VcclxuICovXHJcbmZ1bmN0aW9uIGJpbmFyaXplSW1hZ2UoKSB7XHJcbiAgICBDVlV0aWxzLm90c3VUaHJlc2hvbGQoX2N1cnJlbnRJbWFnZVdyYXBwZXIsIF9iaW5hcnlJbWFnZVdyYXBwZXIpO1xyXG4gICAgX2JpbmFyeUltYWdlV3JhcHBlci56ZXJvQm9yZGVyKCk7XHJcbiAgICBpZiAoX2NvbmZpZy5zaG93Q2FudmFzKSB7XHJcbiAgICAgICAgX2JpbmFyeUltYWdlV3JhcHBlci5zaG93KF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeSwgMjU1KTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEl0ZXJhdGUgb3ZlciB0aGUgZW50aXJlIGltYWdlXHJcbiAqIGV4dHJhY3QgcGF0Y2hlc1xyXG4gKi9cclxuZnVuY3Rpb24gZmluZFBhdGNoZXMoKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBqLFxyXG4gICAgICAgIHgsXHJcbiAgICAgICAgeSxcclxuICAgICAgICBtb21lbnRzLFxyXG4gICAgICAgIHBhdGNoZXNGb3VuZCA9IFtdLFxyXG4gICAgICAgIHJhc3Rlcml6ZXIsXHJcbiAgICAgICAgcmFzdGVyUmVzdWx0LFxyXG4gICAgICAgIHBhdGNoO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IF9udW1QYXRjaGVzLng7IGkrKykge1xyXG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBfbnVtUGF0Y2hlcy55OyBqKyspIHtcclxuICAgICAgICAgICAgeCA9IF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS54ICogaTtcclxuICAgICAgICAgICAgeSA9IF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS55ICogajtcclxuXHJcbiAgICAgICAgICAgIC8vIHNlcGVyYXRlIHBhcnRzXHJcbiAgICAgICAgICAgIHNrZWxldG9uaXplKHgsIHkpO1xyXG5cclxuICAgICAgICAgICAgLy8gUmFzdGVyaXplLCBmaW5kIGluZGl2aWR1YWwgYmFyc1xyXG4gICAgICAgICAgICBfc2tlbEltYWdlV3JhcHBlci56ZXJvQm9yZGVyKCk7XHJcbiAgICAgICAgICAgIEFycmF5SGVscGVyLmluaXQoX2xhYmVsSW1hZ2VXcmFwcGVyLmRhdGEsIDApO1xyXG4gICAgICAgICAgICByYXN0ZXJpemVyID0gUmFzdGVyaXplci5jcmVhdGUoX3NrZWxJbWFnZVdyYXBwZXIsIF9sYWJlbEltYWdlV3JhcHBlcik7XHJcbiAgICAgICAgICAgIHJhc3RlclJlc3VsdCA9IHJhc3Rlcml6ZXIucmFzdGVyaXplKDApO1xyXG5cclxuICAgICAgICAgICAgaWYgKF9jb25maWcuc2hvd0xhYmVscykge1xyXG4gICAgICAgICAgICAgICAgX2xhYmVsSW1hZ2VXcmFwcGVyLm92ZXJsYXkoX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5LCBNYXRoLmZsb29yKDM2MCAvIHJhc3RlclJlc3VsdC5jb3VudCksXHJcbiAgICAgICAgICAgICAgICAgICAge3g6IHgsIHk6IHl9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIG1vbWVudHMgZnJvbSB0aGUgc2tlbGV0b25pemVkIHBhdGNoXHJcbiAgICAgICAgICAgIG1vbWVudHMgPSBfbGFiZWxJbWFnZVdyYXBwZXIubW9tZW50cyhyYXN0ZXJSZXN1bHQuY291bnQpO1xyXG5cclxuICAgICAgICAgICAgLy8gZXh0cmFjdCBlbGlnaWJsZSBwYXRjaGVzXHJcbiAgICAgICAgICAgIHBhdGNoZXNGb3VuZCA9IHBhdGNoZXNGb3VuZC5jb25jYXQoZGVzY3JpYmVQYXRjaChtb21lbnRzLCBbaSwgal0sIHgsIHkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9jb25maWcuc2hvd0ZvdW5kUGF0Y2hlcykge1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgcGF0Y2hlc0ZvdW5kLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHBhdGNoID0gcGF0Y2hlc0ZvdW5kW2ldO1xyXG4gICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdSZWN0KHBhdGNoLnBvcywgX3N1YkltYWdlV3JhcHBlci5zaXplLCBfY2FudmFzQ29udGFpbmVyLmN0eC5iaW5hcnksXHJcbiAgICAgICAgICAgICAgICB7Y29sb3I6IFwiIzk5ZmYwMFwiLCBsaW5lV2lkdGg6IDJ9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBhdGNoZXNGb3VuZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmRzIHRob3NlIGNvbm5lY3RlZCBhcmVhcyB3aGljaCBjb250YWluIGF0IGxlYXN0IDYgcGF0Y2hlc1xyXG4gKiBhbmQgcmV0dXJucyB0aGVtIG9yZGVyZWQgREVTQyBieSB0aGUgbnVtYmVyIG9mIGNvbnRhaW5lZCBwYXRjaGVzXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXhMYWJlbFxyXG4gKi9cclxuZnVuY3Rpb24gZmluZEJpZ2dlc3RDb25uZWN0ZWRBcmVhcyhtYXhMYWJlbCl7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBzdW0sXHJcbiAgICAgICAgbGFiZWxIaXN0ID0gW10sXHJcbiAgICAgICAgdG9wTGFiZWxzID0gW107XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCBtYXhMYWJlbDsgaSsrKSB7XHJcbiAgICAgICAgbGFiZWxIaXN0LnB1c2goMCk7XHJcbiAgICB9XHJcbiAgICBzdW0gPSBfcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGg7XHJcbiAgICB3aGlsZSAoc3VtLS0pIHtcclxuICAgICAgICBpZiAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbc3VtXSA+IDApIHtcclxuICAgICAgICAgICAgbGFiZWxIaXN0W19wYXRjaExhYmVsR3JpZC5kYXRhW3N1bV0gLSAxXSsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsYWJlbEhpc3QgPSBsYWJlbEhpc3QubWFwKGZ1bmN0aW9uKHZhbCwgaWR4KSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsOiB2YWwsXHJcbiAgICAgICAgICAgIGxhYmVsOiBpZHggKyAxXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxhYmVsSGlzdC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gYi52YWwgLSBhLnZhbDtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGV4dHJhY3QgdG9wIGFyZWFzIHdpdGggYXQgbGVhc3QgNiBwYXRjaGVzIHByZXNlbnRcclxuICAgIHRvcExhYmVscyA9IGxhYmVsSGlzdC5maWx0ZXIoZnVuY3Rpb24oZWwpIHtcclxuICAgICAgICByZXR1cm4gZWwudmFsID49IDU7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdG9wTGFiZWxzO1xyXG59XHJcblxyXG4vKipcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIGZpbmRCb3hlcyh0b3BMYWJlbHMsIG1heExhYmVsKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBqLFxyXG4gICAgICAgIHN1bSxcclxuICAgICAgICBwYXRjaGVzID0gW10sXHJcbiAgICAgICAgcGF0Y2gsXHJcbiAgICAgICAgYm94LFxyXG4gICAgICAgIGJveGVzID0gW10sXHJcbiAgICAgICAgaHN2ID0gWzAsIDEsIDFdLFxyXG4gICAgICAgIHJnYiA9IFswLCAwLCAwXTtcclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IHRvcExhYmVscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHN1bSA9IF9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aDtcclxuICAgICAgICBwYXRjaGVzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgd2hpbGUgKHN1bS0tKSB7XHJcbiAgICAgICAgICAgIGlmIChfcGF0Y2hMYWJlbEdyaWQuZGF0YVtzdW1dID09PSB0b3BMYWJlbHNbaV0ubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIHBhdGNoID0gX2ltYWdlVG9QYXRjaEdyaWQuZGF0YVtzdW1dO1xyXG4gICAgICAgICAgICAgICAgcGF0Y2hlcy5wdXNoKHBhdGNoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBib3ggPSBib3hGcm9tUGF0Y2hlcyhwYXRjaGVzKTtcclxuICAgICAgICBpZiAoYm94KSB7XHJcbiAgICAgICAgICAgIGJveGVzLnB1c2goYm94KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRyYXcgcGF0Y2gtbGFiZWxzIGlmIHJlcXVlc3RlZFxyXG4gICAgICAgICAgICBpZiAoX2NvbmZpZy5zaG93UmVtYWluaW5nUGF0Y2hMYWJlbHMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgcGF0Y2hlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGNoID0gcGF0Y2hlc1tqXTtcclxuICAgICAgICAgICAgICAgICAgICBoc3ZbMF0gPSAodG9wTGFiZWxzW2ldLmxhYmVsIC8gKG1heExhYmVsICsgMSkpICogMzYwO1xyXG4gICAgICAgICAgICAgICAgICAgIENWVXRpbHMuaHN2MnJnYihoc3YsIHJnYik7XHJcbiAgICAgICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UmVjdChwYXRjaC5wb3MsIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Y29sb3I6IFwicmdiKFwiICsgcmdiLmpvaW4oXCIsXCIpICsgXCIpXCIsIGxpbmVXaWR0aDogMn0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJveGVzO1xyXG59XHJcblxyXG4vKipcclxuICogRmluZCBzaW1pbGFyIG1vbWVudHMgKHZpYSBjbHVzdGVyKVxyXG4gKiBAcGFyYW0ge09iamVjdH0gbW9tZW50c1xyXG4gKi9cclxuZnVuY3Rpb24gc2ltaWxhck1vbWVudHMobW9tZW50cykge1xyXG4gICAgdmFyIGNsdXN0ZXJzID0gQ1ZVdGlscy5jbHVzdGVyKG1vbWVudHMsIDAuOTApO1xyXG4gICAgdmFyIHRvcENsdXN0ZXIgPSBDVlV0aWxzLnRvcEdlbmVyaWMoY2x1c3RlcnMsIDEsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICByZXR1cm4gZS5nZXRQb2ludHMoKS5sZW5ndGg7XHJcbiAgICB9KTtcclxuICAgIHZhciBwb2ludHMgPSBbXSwgcmVzdWx0ID0gW107XHJcbiAgICBpZiAodG9wQ2x1c3Rlci5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICBwb2ludHMgPSB0b3BDbHVzdGVyWzBdLml0ZW0uZ2V0UG9pbnRzKCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2gocG9pbnRzW2ldLnBvaW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBza2VsZXRvbml6ZSh4LCB5KSB7XHJcbiAgICBfYmluYXJ5SW1hZ2VXcmFwcGVyLnN1YkltYWdlQXNDb3B5KF9zdWJJbWFnZVdyYXBwZXIsIENWVXRpbHMuaW1hZ2VSZWYoeCwgeSkpO1xyXG4gICAgX3NrZWxldG9uaXplci5za2VsZXRvbml6ZSgpO1xyXG5cclxuICAgIC8vIFNob3cgc2tlbGV0b24gaWYgcmVxdWVzdGVkXHJcbiAgICBpZiAoX2NvbmZpZy5zaG93U2tlbGV0b24pIHtcclxuICAgICAgICBfc2tlbEltYWdlV3JhcHBlci5vdmVybGF5KF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeSwgMzYwLCBDVlV0aWxzLmltYWdlUmVmKHgsIHkpKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEV4dHJhY3RzIGFuZCBkZXNjcmliZXMgdGhvc2UgcGF0Y2hlcyB3aGljaCBzZWVtIHRvIGNvbnRhaW4gYSBiYXJjb2RlIHBhdHRlcm5cclxuICogQHBhcmFtIHtBcnJheX0gbW9tZW50c1xyXG4gKiBAcGFyYW0ge09iamVjdH0gcGF0Y2hQb3MsXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB4XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB5XHJcbiAqIEByZXR1cm5zIHtBcnJheX0gbGlzdCBvZiBwYXRjaGVzXHJcbiAqL1xyXG5mdW5jdGlvbiBkZXNjcmliZVBhdGNoKG1vbWVudHMsIHBhdGNoUG9zLCB4LCB5KSB7XHJcbiAgICB2YXIgayxcclxuICAgICAgICBhdmcsXHJcbiAgICAgICAgZWxpZ2libGVNb21lbnRzID0gW10sXHJcbiAgICAgICAgbWF0Y2hpbmdNb21lbnRzLFxyXG4gICAgICAgIHBhdGNoLFxyXG4gICAgICAgIHBhdGNoZXNGb3VuZCA9IFtdLFxyXG4gICAgICAgIG1pbkNvbXBvbmVudFdlaWdodCA9IE1hdGguY2VpbChfcGF0Y2hTaXplLnggLyAzKTtcclxuXHJcbiAgICBpZiAobW9tZW50cy5sZW5ndGggPj0gMikge1xyXG4gICAgICAgIC8vIG9ubHkgY29sbGVjdCBtb21lbnRzIHdoaWNoJ3MgYXJlYSBjb3ZlcnMgYXQgbGVhc3QgbWluQ29tcG9uZW50V2VpZ2h0IHBpeGVscy5cclxuICAgICAgICBmb3IgKCBrID0gMDsgayA8IG1vbWVudHMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgaWYgKG1vbWVudHNba10ubTAwID4gbWluQ29tcG9uZW50V2VpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBlbGlnaWJsZU1vbWVudHMucHVzaChtb21lbnRzW2tdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYgYXQgbGVhc3QgMiBtb21lbnRzIGFyZSBmb3VuZCB3aGljaCBoYXZlIGF0IGxlYXN0IG1pbkNvbXBvbmVudFdlaWdodHMgY292ZXJlZFxyXG4gICAgICAgIGlmIChlbGlnaWJsZU1vbWVudHMubGVuZ3RoID49IDIpIHtcclxuICAgICAgICAgICAgbWF0Y2hpbmdNb21lbnRzID0gc2ltaWxhck1vbWVudHMoZWxpZ2libGVNb21lbnRzKTtcclxuICAgICAgICAgICAgYXZnID0gMDtcclxuICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIHRoZSBzaW1pbGFyaXR5IG9mIHRoZSBtb21lbnRzXHJcbiAgICAgICAgICAgIGZvciAoIGsgPSAwOyBrIDwgbWF0Y2hpbmdNb21lbnRzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBhdmcgKz0gbWF0Y2hpbmdNb21lbnRzW2tdLnJhZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gT25seSB0d28gb2YgdGhlIG1vbWVudHMgYXJlIGFsbG93ZWQgbm90IHRvIGZpdCBpbnRvIHRoZSBlcXVhdGlvblxyXG4gICAgICAgICAgICAvLyBhZGQgdGhlIHBhdGNoIHRvIHRoZSBzZXRcclxuICAgICAgICAgICAgaWYgKG1hdGNoaW5nTW9tZW50cy5sZW5ndGggPiAxXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgbWF0Y2hpbmdNb21lbnRzLmxlbmd0aCA+PSAoZWxpZ2libGVNb21lbnRzLmxlbmd0aCAvIDQpICogM1xyXG4gICAgICAgICAgICAgICAgICAgICYmIG1hdGNoaW5nTW9tZW50cy5sZW5ndGggPiBtb21lbnRzLmxlbmd0aCAvIDQpIHtcclxuICAgICAgICAgICAgICAgIGF2ZyAvPSBtYXRjaGluZ01vbWVudHMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgcGF0Y2ggPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHBhdGNoUG9zWzFdICogX251bVBhdGNoZXMueCArIHBhdGNoUG9zWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB5XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBib3g6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmVjMi5jbG9uZShbeCwgeV0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZWMyLmNsb25lKFt4ICsgX3N1YkltYWdlV3JhcHBlci5zaXplLngsIHldKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmVjMi5jbG9uZShbeCArIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS54LCB5ICsgX3N1YkltYWdlV3JhcHBlci5zaXplLnldKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmVjMi5jbG9uZShbeCwgeSArIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS55XSlcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vbWVudHM6IG1hdGNoaW5nTW9tZW50cyxcclxuICAgICAgICAgICAgICAgICAgICByYWQ6IGF2ZyxcclxuICAgICAgICAgICAgICAgICAgICB2ZWM6IHZlYzIuY2xvbmUoW01hdGguY29zKGF2ZyksIE1hdGguc2luKGF2ZyldKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHBhdGNoZXNGb3VuZC5wdXNoKHBhdGNoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwYXRjaGVzRm91bmQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBmaW5kcyBwYXRjaGVzIHdoaWNoIGFyZSBjb25uZWN0ZWQgYW5kIHNoYXJlIHRoZSBzYW1lIG9yaWVudGF0aW9uXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXRjaGVzRm91bmRcclxuICovXHJcbmZ1bmN0aW9uIHJhc3Rlcml6ZUFuZ3VsYXJTaW1pbGFyaXR5KHBhdGNoZXNGb3VuZCkge1xyXG4gICAgdmFyIGxhYmVsID0gMCxcclxuICAgICAgICB0aHJlc2hvbGQgPSAwLjk1LFxyXG4gICAgICAgIGN1cnJJZHggPSAwLFxyXG4gICAgICAgIGosXHJcbiAgICAgICAgcGF0Y2gsXHJcbiAgICAgICAgaHN2ID0gWzAsIDEsIDFdLFxyXG4gICAgICAgIHJnYiA9IFswLCAwLCAwXTtcclxuXHJcbiAgICBmdW5jdGlvbiBub3RZZXRQcm9jZXNzZWQoKSB7XHJcbiAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBfcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbaV0gPT09IDAgJiYgX3BhdGNoR3JpZC5kYXRhW2ldID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gX3BhdGNoTGFiZWxHcmlkLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0cmFjZShjdXJyZW50SWR4KSB7XHJcbiAgICAgICAgdmFyIHgsXHJcbiAgICAgICAgICAgIHksXHJcbiAgICAgICAgICAgIGN1cnJlbnRQYXRjaCxcclxuICAgICAgICAgICAgaWR4LFxyXG4gICAgICAgICAgICBkaXIsXHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSB7XHJcbiAgICAgICAgICAgICAgICB4OiBjdXJyZW50SWR4ICUgX3BhdGNoTGFiZWxHcmlkLnNpemUueCxcclxuICAgICAgICAgICAgICAgIHk6IChjdXJyZW50SWR4IC8gX3BhdGNoTGFiZWxHcmlkLnNpemUueCkgfCAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNpbWlsYXJpdHk7XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW50SWR4IDwgX3BhdGNoTGFiZWxHcmlkLmRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQYXRjaCA9IF9pbWFnZVRvUGF0Y2hHcmlkLmRhdGFbY3VycmVudElkeF07XHJcbiAgICAgICAgICAgIC8vIGFzc2lnbiBsYWJlbFxyXG4gICAgICAgICAgICBfcGF0Y2hMYWJlbEdyaWQuZGF0YVtjdXJyZW50SWR4XSA9IGxhYmVsO1xyXG4gICAgICAgICAgICBmb3IgKCBkaXIgPSAwOyBkaXIgPCBUcmFjZXIuc2VhcmNoRGlyZWN0aW9ucy5sZW5ndGg7IGRpcisrKSB7XHJcbiAgICAgICAgICAgICAgICB5ID0gY3VycmVudC55ICsgVHJhY2VyLnNlYXJjaERpcmVjdGlvbnNbZGlyXVswXTtcclxuICAgICAgICAgICAgICAgIHggPSBjdXJyZW50LnggKyBUcmFjZXIuc2VhcmNoRGlyZWN0aW9uc1tkaXJdWzFdO1xyXG4gICAgICAgICAgICAgICAgaWR4ID0geSAqIF9wYXRjaExhYmVsR3JpZC5zaXplLnggKyB4O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNvbnRpbnVlIGlmIHBhdGNoIGVtcHR5XHJcbiAgICAgICAgICAgICAgICBpZiAoX3BhdGNoR3JpZC5kYXRhW2lkeF0gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBfcGF0Y2hMYWJlbEdyaWQuZGF0YVtpZHhdID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbaWR4XSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpbWlsYXJpdHkgPSBNYXRoLmFicyh2ZWMyLmRvdChfaW1hZ2VUb1BhdGNoR3JpZC5kYXRhW2lkeF0udmVjLCBjdXJyZW50UGF0Y2gudmVjKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpbWlsYXJpdHkgPiB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2UoaWR4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHJlcGFyZSBmb3IgZmluZGluZyB0aGUgcmlnaHQgcGF0Y2hlc1xyXG4gICAgQXJyYXlIZWxwZXIuaW5pdChfcGF0Y2hHcmlkLmRhdGEsIDApO1xyXG4gICAgQXJyYXlIZWxwZXIuaW5pdChfcGF0Y2hMYWJlbEdyaWQuZGF0YSwgMCk7XHJcbiAgICBBcnJheUhlbHBlci5pbml0KF9pbWFnZVRvUGF0Y2hHcmlkLmRhdGEsIG51bGwpO1xyXG5cclxuICAgIGZvciAoIGogPSAwOyBqIDwgcGF0Y2hlc0ZvdW5kLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgcGF0Y2ggPSBwYXRjaGVzRm91bmRbal07XHJcbiAgICAgICAgX2ltYWdlVG9QYXRjaEdyaWQuZGF0YVtwYXRjaC5pbmRleF0gPSBwYXRjaDtcclxuICAgICAgICBfcGF0Y2hHcmlkLmRhdGFbcGF0Y2guaW5kZXhdID0gMTtcclxuICAgIH1cclxuXHJcbiAgICAvLyByYXN0ZXJpemUgdGhlIHBhdGNoZXMgZm91bmQgdG8gZGV0ZXJtaW5lIGFyZWFcclxuICAgIF9wYXRjaEdyaWQuemVyb0JvcmRlcigpO1xyXG5cclxuICAgIHdoaWxlICgoIGN1cnJJZHggPSBub3RZZXRQcm9jZXNzZWQoKSkgPCBfcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICBsYWJlbCsrO1xyXG4gICAgICAgIHRyYWNlKGN1cnJJZHgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGRyYXcgcGF0Y2gtbGFiZWxzIGlmIHJlcXVlc3RlZFxyXG4gICAgaWYgKF9jb25maWcuc2hvd1BhdGNoTGFiZWxzKSB7XHJcbiAgICAgICAgZm9yICggaiA9IDA7IGogPCBfcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBpZiAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbal0gPiAwICYmIF9wYXRjaExhYmVsR3JpZC5kYXRhW2pdIDw9IGxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRjaCA9IF9pbWFnZVRvUGF0Y2hHcmlkLmRhdGFbal07XHJcbiAgICAgICAgICAgICAgICBoc3ZbMF0gPSAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbal0gLyAobGFiZWwgKyAxKSkgKiAzNjA7XHJcbiAgICAgICAgICAgICAgICBDVlV0aWxzLmhzdjJyZ2IoaHN2LCByZ2IpO1xyXG4gICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UmVjdChwYXRjaC5wb3MsIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LFxyXG4gICAgICAgICAgICAgICAgICAgIHtjb2xvcjogXCJyZ2IoXCIgKyByZ2Iuam9pbihcIixcIikgKyBcIilcIiwgbGluZVdpZHRoOiAyfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxhYmVsO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBpbml0OiBmdW5jdGlvbihpbnB1dEltYWdlV3JhcHBlciwgY29uZmlnKSB7XHJcbiAgICAgICAgX2NvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICBfaW5wdXRJbWFnZVdyYXBwZXIgPSBpbnB1dEltYWdlV3JhcHBlcjtcclxuXHJcbiAgICAgICAgaW5pdEJ1ZmZlcnMoKTtcclxuICAgICAgICBpbml0Q2FudmFzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGxvY2F0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHBhdGNoZXNGb3VuZCxcclxuICAgICAgICAgICAgdG9wTGFiZWxzLFxyXG4gICAgICAgICAgICBib3hlcztcclxuXHJcbiAgICAgICAgaWYgKF9jb25maWcuaGFsZlNhbXBsZSkge1xyXG4gICAgICAgICAgICBDVlV0aWxzLmhhbGZTYW1wbGUoX2lucHV0SW1hZ2VXcmFwcGVyLCBfY3VycmVudEltYWdlV3JhcHBlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBiaW5hcml6ZUltYWdlKCk7XHJcbiAgICAgICAgcGF0Y2hlc0ZvdW5kID0gZmluZFBhdGNoZXMoKTtcclxuICAgICAgICAvLyByZXR1cm4gdW5sZXNzIDUlIG9yIG1vcmUgcGF0Y2hlcyBhcmUgZm91bmRcclxuICAgICAgICBpZiAocGF0Y2hlc0ZvdW5kLmxlbmd0aCA8IF9udW1QYXRjaGVzLnggKiBfbnVtUGF0Y2hlcy55ICogMC4wNSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJhc3RlcnJpemUgYXJlYSBieSBjb21wYXJpbmcgYW5ndWxhciBzaW1pbGFyaXR5O1xyXG4gICAgICAgIHZhciBtYXhMYWJlbCA9IHJhc3Rlcml6ZUFuZ3VsYXJTaW1pbGFyaXR5KHBhdGNoZXNGb3VuZCk7XHJcbiAgICAgICAgaWYgKG1heExhYmVsIDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNlYXJjaCBmb3IgYXJlYSB3aXRoIHRoZSBtb3N0IHBhdGNoZXMgKGJpZ2dlc3QgY29ubmVjdGVkIGFyZWEpXHJcbiAgICAgICAgdG9wTGFiZWxzID0gZmluZEJpZ2dlc3RDb25uZWN0ZWRBcmVhcyhtYXhMYWJlbCk7XHJcbiAgICAgICAgaWYgKHRvcExhYmVscy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBib3hlcyA9IGZpbmRCb3hlcyh0b3BMYWJlbHMsIG1heExhYmVsKTtcclxuICAgICAgICByZXR1cm4gYm94ZXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrSW1hZ2VDb25zdHJhaW50czogZnVuY3Rpb24oaW5wdXRTdHJlYW0sIGNvbmZpZykge1xyXG4gICAgICAgIHZhciBwYXRjaFNpemUsXHJcbiAgICAgICAgICAgIHdpZHRoID0gaW5wdXRTdHJlYW0uZ2V0V2lkdGgoKSxcclxuICAgICAgICAgICAgaGVpZ2h0ID0gaW5wdXRTdHJlYW0uZ2V0SGVpZ2h0KCksXHJcbiAgICAgICAgICAgIGhhbGZTYW1wbGUgPSBjb25maWcuaGFsZlNhbXBsZSA/IDAuNSA6IDEsXHJcbiAgICAgICAgICAgIHNpemUsXHJcbiAgICAgICAgICAgIGFyZWE7XHJcblxyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB3aWR0aCBhbmQgaGVpZ2h0IGJhc2VkIG9uIGFyZWFcclxuICAgICAgICBpZiAoaW5wdXRTdHJlYW0uZ2V0Q29uZmlnKCkuYXJlYSkge1xyXG4gICAgICAgICAgICBhcmVhID0gQ1ZVdGlscy5jb21wdXRlSW1hZ2VBcmVhKHdpZHRoLCBoZWlnaHQsIGlucHV0U3RyZWFtLmdldENvbmZpZygpLmFyZWEpO1xyXG4gICAgICAgICAgICBpbnB1dFN0cmVhbS5zZXRUb3BSaWdodCh7eDogYXJlYS5zeCwgeTogYXJlYS5zeX0pO1xyXG4gICAgICAgICAgICBpbnB1dFN0cmVhbS5zZXRDYW52YXNTaXplKHt4OiB3aWR0aCwgeTogaGVpZ2h0fSk7XHJcbiAgICAgICAgICAgIHdpZHRoID0gYXJlYS5zdztcclxuICAgICAgICAgICAgaGVpZ2h0ID0gYXJlYS5zaDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNpemUgPSB7XHJcbiAgICAgICAgICAgIHg6IE1hdGguZmxvb3Iod2lkdGggKiBoYWxmU2FtcGxlKSxcclxuICAgICAgICAgICAgeTogTWF0aC5mbG9vcihoZWlnaHQgKiBoYWxmU2FtcGxlKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHBhdGNoU2l6ZSA9IENWVXRpbHMuY2FsY3VsYXRlUGF0Y2hTaXplKGNvbmZpZy5wYXRjaFNpemUsIHNpemUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGF0Y2gtU2l6ZTogXCIgKyBKU09OLnN0cmluZ2lmeShwYXRjaFNpemUpKTtcclxuXHJcbiAgICAgICAgaW5wdXRTdHJlYW0uc2V0V2lkdGgoTWF0aC5mbG9vcihNYXRoLmZsb29yKHNpemUueCAvIHBhdGNoU2l6ZS54KSAqICgxIC8gaGFsZlNhbXBsZSkgKiBwYXRjaFNpemUueCkpO1xyXG4gICAgICAgIGlucHV0U3RyZWFtLnNldEhlaWdodChNYXRoLmZsb29yKE1hdGguZmxvb3Ioc2l6ZS55IC8gcGF0Y2hTaXplLnkpICogKDEgLyBoYWxmU2FtcGxlKSAqIHBhdGNoU2l6ZS55KSk7XHJcblxyXG4gICAgICAgIGlmICgoaW5wdXRTdHJlYW0uZ2V0V2lkdGgoKSAlIHBhdGNoU2l6ZS54KSA9PT0gMCAmJiAoaW5wdXRTdHJlYW0uZ2V0SGVpZ2h0KCkgJSBwYXRjaFNpemUueSkgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbWFnZSBkaW1lbnNpb25zIGRvIG5vdCBjb21wbHkgd2l0aCB0aGUgY3VycmVudCBzZXR0aW5nczogV2lkdGggKFwiICtcclxuICAgICAgICAgICAgd2lkdGggKyBcIiApYW5kIGhlaWdodCAoXCIgKyBoZWlnaHQgK1xyXG4gICAgICAgICAgICBcIikgbXVzdCBhIG11bHRpcGxlIG9mIFwiICsgcGF0Y2hTaXplLngpO1xyXG4gICAgfVxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9iYXJjb2RlX2xvY2F0b3IuanNcbiAqKi8iLCJpbXBvcnQgVHJhY2VyIGZyb20gJy4vdHJhY2VyJztcclxuXHJcbi8qKlxyXG4gKiBodHRwOi8vd3d3LmNvZGVwcm9qZWN0LmNvbS9UaXBzLzQwNzE3Mi9Db25uZWN0ZWQtQ29tcG9uZW50LUxhYmVsaW5nLWFuZC1WZWN0b3JpemF0aW9uXHJcbiAqL1xyXG52YXIgUmFzdGVyaXplciA9IHtcclxuICAgIGNyZWF0ZUNvbnRvdXIyRDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGlyOiBudWxsLFxyXG4gICAgICAgICAgICBpbmRleDogbnVsbCxcclxuICAgICAgICAgICAgZmlyc3RWZXJ0ZXg6IG51bGwsXHJcbiAgICAgICAgICAgIGluc2lkZUNvbnRvdXJzOiBudWxsLFxyXG4gICAgICAgICAgICBuZXh0cGVlcjogbnVsbCxcclxuICAgICAgICAgICAgcHJldnBlZXI6IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIENPTlRPVVJfRElSOiB7XHJcbiAgICAgICAgQ1dfRElSOiAwLFxyXG4gICAgICAgIENDV19ESVI6IDEsXHJcbiAgICAgICAgVU5LTk9XTl9ESVI6IDJcclxuICAgIH0sXHJcbiAgICBESVI6IHtcclxuICAgICAgICBPVVRTSURFX0VER0U6IC0zMjc2NyxcclxuICAgICAgICBJTlNJREVfRURHRTogLTMyNzY2XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGxhYmVsV3JhcHBlcikge1xyXG4gICAgICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICAgICAgbGFiZWxEYXRhID0gbGFiZWxXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgICAgIHdpZHRoID0gaW1hZ2VXcmFwcGVyLnNpemUueCxcclxuICAgICAgICAgICAgaGVpZ2h0ID0gaW1hZ2VXcmFwcGVyLnNpemUueSxcclxuICAgICAgICAgICAgdHJhY2VyID0gVHJhY2VyLmNyZWF0ZShpbWFnZVdyYXBwZXIsIGxhYmVsV3JhcHBlcik7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJhc3Rlcml6ZTogZnVuY3Rpb24oZGVwdGhsYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbG9yLFxyXG4gICAgICAgICAgICAgICAgICAgIGJjLFxyXG4gICAgICAgICAgICAgICAgICAgIGxjLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgY3gsXHJcbiAgICAgICAgICAgICAgICAgICAgY3ksXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3JNYXAgPSBbXSxcclxuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgcCxcclxuICAgICAgICAgICAgICAgICAgICBjYyxcclxuICAgICAgICAgICAgICAgICAgICBzYyxcclxuICAgICAgICAgICAgICAgICAgICBwb3MsXHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGVkQ291bnQgPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCA0MDA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yTWFwW2ldID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb2xvck1hcFswXSA9IGltYWdlRGF0YVswXTtcclxuICAgICAgICAgICAgICAgIGNjID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGZvciAoIGN5ID0gMTsgY3kgPCBoZWlnaHQgLSAxOyBjeSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxpbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgYmMgPSBjb2xvck1hcFswXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKCBjeCA9IDE7IGN4IDwgd2lkdGggLSAxOyBjeCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcyA9IGN5ICogd2lkdGggKyBjeDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsRGF0YVtwb3NdID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IGltYWdlRGF0YVtwb3NdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9yICE9PSBiYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxjID0gY29ubmVjdGVkQ291bnQgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvck1hcFtsY10gPSBjb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmMgPSBjb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVydGV4ID0gdHJhY2VyLmNvbnRvdXJUcmFjaW5nKGN5LCBjeCwgbGMsIGNvbG9yLCBSYXN0ZXJpemVyLkRJUi5PVVRTSURFX0VER0UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmVydGV4ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0ZWRDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxpbmRleCA9IGxjO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcCA9IFJhc3Rlcml6ZXIuY3JlYXRlQ29udG91cjJEKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmRpciA9IFJhc3Rlcml6ZXIuQ09OVE9VUl9ESVIuQ1dfRElSO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5pbmRleCA9IGxhYmVsaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmZpcnN0VmVydGV4ID0gdmVydGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5uZXh0cGVlciA9IGNjO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5pbnNpZGVDb250b3VycyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2MgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5wcmV2cGVlciA9IHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYyA9IHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXggPSB0cmFjZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jb250b3VyVHJhY2luZyhjeSwgY3gsIFJhc3Rlcml6ZXIuRElSLklOU0lERV9FREdFLCBjb2xvciwgbGFiZWxpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2ZXJ0ZXggIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBSYXN0ZXJpemVyLmNyZWF0ZUNvbnRvdXIyRCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5maXJzdFZlcnRleCA9IHZlcnRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuaW5zaWRlQ29udG91cnMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlcHRobGFiZWwgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmRpciA9IFJhc3Rlcml6ZXIuQ09OVE9VUl9ESVIuQ0NXX0RJUjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5kaXIgPSBSYXN0ZXJpemVyLkNPTlRPVVJfRElSLkNXX0RJUjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuaW5kZXggPSBkZXB0aGxhYmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2MgPSBjYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgoc2MgIT09IG51bGwpICYmIHNjLmluZGV4ICE9PSBsYWJlbGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2MgPSBzYy5uZXh0cGVlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzYyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubmV4dHBlZXIgPSBzYy5pbnNpZGVDb250b3VycztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2MuaW5zaWRlQ29udG91cnMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2MuaW5zaWRlQ29udG91cnMucHJldnBlZXIgPSBwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYy5pbnNpZGVDb250b3VycyA9IHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsRGF0YVtwb3NdID0gbGFiZWxpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsYWJlbERhdGFbcG9zXSA9PT0gUmFzdGVyaXplci5ESVIuT1VUU0lERV9FREdFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgbGFiZWxEYXRhW3Bvc10gPT09IFJhc3Rlcml6ZXIuRElSLklOU0lERV9FREdFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbGluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbERhdGFbcG9zXSA9PT0gUmFzdGVyaXplci5ESVIuSU5TSURFX0VER0UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYyA9IGltYWdlRGF0YVtwb3NdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYyA9IGNvbG9yTWFwWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxpbmRleCA9IGxhYmVsRGF0YVtwb3NdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmMgPSBjb2xvck1hcFtsYWJlbGluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNjID0gY2M7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoc2MgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBzYy5pbmRleCA9IGRlcHRobGFiZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgc2MgPSBzYy5uZXh0cGVlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2M6IGNjLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiBjb25uZWN0ZWRDb3VudFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVidWc6IHtcclxuICAgICAgICAgICAgICAgIGRyYXdDb250b3VyOiBmdW5jdGlvbihjYW52YXMsIGZpcnN0Q29udG91cikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcSA9IGZpcnN0Q29udG91cixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwicmVkXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmVkXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpcSA9IHBxLmluc2lkZUNvbnRvdXJzO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlxID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChwcSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXEgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHEgPSBpcTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlxID0gaXEubmV4dHBlZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxID0gcHE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcSA9IHBxLm5leHRwZWVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBxICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXEgPSBwcS5pbnNpZGVDb250b3VycztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHEuZGlyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUmFzdGVyaXplci5DT05UT1VSX0RJUi5DV19ESVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcInJlZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUmFzdGVyaXplci5DT05UT1VSX0RJUi5DQ1dfRElSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJibHVlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBSYXN0ZXJpemVyLkNPTlRPVVJfRElSLlVOS05PV05fRElSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBxLmZpcnN0VmVydGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5tb3ZlVG8ocC54LCBwLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwID0gcC5uZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVUbyhwLngsIHAueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKHAgIT09IHEuZmlyc3RWZXJ0ZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJhc3Rlcml6ZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL3Jhc3Rlcml6ZXIuanNcbiAqKi8iLCIvKipcclxuICogaHR0cDovL3d3dy5jb2RlcHJvamVjdC5jb20vVGlwcy80MDcxNzIvQ29ubmVjdGVkLUNvbXBvbmVudC1MYWJlbGluZy1hbmQtVmVjdG9yaXphdGlvblxyXG4gKi9cclxudmFyIFRyYWNlciA9IHtcclxuICAgIHNlYXJjaERpcmVjdGlvbnM6IFtbMCwgMV0sIFsxLCAxXSwgWzEsIDBdLCBbMSwgLTFdLCBbMCwgLTFdLCBbLTEsIC0xXSwgWy0xLCAwXSwgWy0xLCAxXV0sXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgbGFiZWxXcmFwcGVyKSB7XHJcbiAgICAgICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgICAgICBsYWJlbERhdGEgPSBsYWJlbFdyYXBwZXIuZGF0YSxcclxuICAgICAgICAgICAgc2VhcmNoRGlyZWN0aW9ucyA9IHRoaXMuc2VhcmNoRGlyZWN0aW9ucyxcclxuICAgICAgICAgICAgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54LFxyXG4gICAgICAgICAgICBwb3M7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRyYWNlKGN1cnJlbnQsIGNvbG9yLCBsYWJlbCwgZWRnZWxhYmVsKSB7XHJcbiAgICAgICAgICAgIHZhciBpLFxyXG4gICAgICAgICAgICAgICAgeSxcclxuICAgICAgICAgICAgICAgIHg7XHJcblxyXG4gICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgeSA9IGN1cnJlbnQuY3kgKyBzZWFyY2hEaXJlY3Rpb25zW2N1cnJlbnQuZGlyXVswXTtcclxuICAgICAgICAgICAgICAgIHggPSBjdXJyZW50LmN4ICsgc2VhcmNoRGlyZWN0aW9uc1tjdXJyZW50LmRpcl1bMV07XHJcbiAgICAgICAgICAgICAgICBwb3MgPSB5ICogd2lkdGggKyB4O1xyXG4gICAgICAgICAgICAgICAgaWYgKChpbWFnZURhdGFbcG9zXSA9PT0gY29sb3IpICYmICgobGFiZWxEYXRhW3Bvc10gPT09IDApIHx8IChsYWJlbERhdGFbcG9zXSA9PT0gbGFiZWwpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsRGF0YVtwb3NdID0gbGFiZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudC5jeSA9IHk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudC5jeCA9IHg7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbERhdGFbcG9zXSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbERhdGFbcG9zXSA9IGVkZ2VsYWJlbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudC5kaXIgPSAoY3VycmVudC5kaXIgKyAxKSAlIDg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdmVydGV4MkQoeCwgeSwgZGlyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkaXI6IGRpcixcclxuICAgICAgICAgICAgICAgIHg6IHgsXHJcbiAgICAgICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICAgICAgbmV4dDogbnVsbCxcclxuICAgICAgICAgICAgICAgIHByZXY6IG51bGxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNvbnRvdXJUcmFjaW5nKHN5LCBzeCwgbGFiZWwsIGNvbG9yLCBlZGdlbGFiZWwpIHtcclxuICAgICAgICAgICAgdmFyIEZ2ID0gbnVsbCxcclxuICAgICAgICAgICAgICAgIEN2LFxyXG4gICAgICAgICAgICAgICAgUCxcclxuICAgICAgICAgICAgICAgIGxkaXIsXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGN4OiBzeCxcclxuICAgICAgICAgICAgICAgICAgICBjeTogc3ksXHJcbiAgICAgICAgICAgICAgICAgICAgZGlyOiAwXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRyYWNlKGN1cnJlbnQsIGNvbG9yLCBsYWJlbCwgZWRnZWxhYmVsKSkge1xyXG4gICAgICAgICAgICAgICAgRnYgPSB2ZXJ0ZXgyRChzeCwgc3ksIGN1cnJlbnQuZGlyKTtcclxuICAgICAgICAgICAgICAgIEN2ID0gRnY7XHJcbiAgICAgICAgICAgICAgICBsZGlyID0gY3VycmVudC5kaXI7XHJcbiAgICAgICAgICAgICAgICBQID0gdmVydGV4MkQoY3VycmVudC5jeCwgY3VycmVudC5jeSwgMCk7XHJcbiAgICAgICAgICAgICAgICBQLnByZXYgPSBDdjtcclxuICAgICAgICAgICAgICAgIEN2Lm5leHQgPSBQO1xyXG4gICAgICAgICAgICAgICAgUC5uZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIEN2ID0gUDtcclxuICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50LmRpciA9IChjdXJyZW50LmRpciArIDYpICUgODtcclxuICAgICAgICAgICAgICAgICAgICB0cmFjZShjdXJyZW50LCBjb2xvciwgbGFiZWwsIGVkZ2VsYWJlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxkaXIgIT09IGN1cnJlbnQuZGlyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEN2LmRpciA9IGN1cnJlbnQuZGlyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQID0gdmVydGV4MkQoY3VycmVudC5jeCwgY3VycmVudC5jeSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFAucHJldiA9IEN2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDdi5uZXh0ID0gUDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUC5uZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ3YgPSBQO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEN2LmRpciA9IGxkaXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEN2LnggPSBjdXJyZW50LmN4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDdi55ID0gY3VycmVudC5jeTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGRpciA9IGN1cnJlbnQuZGlyO1xyXG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoY3VycmVudC5jeCAhPT0gc3ggfHwgY3VycmVudC5jeSAhPT0gc3kpO1xyXG4gICAgICAgICAgICAgICAgRnYucHJldiA9IEN2LnByZXY7XHJcbiAgICAgICAgICAgICAgICBDdi5wcmV2Lm5leHQgPSBGdjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gRnY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0cmFjZTogZnVuY3Rpb24oY3VycmVudCwgY29sb3IsIGxhYmVsLCBlZGdlbGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cmFjZShjdXJyZW50LCBjb2xvciwgbGFiZWwsIGVkZ2VsYWJlbCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbnRvdXJUcmFjaW5nOiBmdW5jdGlvbihzeSwgc3gsIGxhYmVsLCBjb2xvciwgZWRnZWxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udG91clRyYWNpbmcoc3ksIHN4LCBsYWJlbCwgY29sb3IsIGVkZ2VsYWJlbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKFRyYWNlcik7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL3RyYWNlci5qc1xuICoqLyIsIi8qIEBwcmVzZXJ2ZSBBU00gQkVHSU4gKi9cclxuLyogZXNsaW50LWRpc2FibGUgZXFlcWVxKi9cclxuZnVuY3Rpb24gU2tlbGV0b25pemVyKHN0ZGxpYiwgZm9yZWlnbiwgYnVmZmVyKSB7XHJcbiAgICBcInVzZSBhc21cIjtcclxuXHJcbiAgICB2YXIgaW1hZ2VzID0gbmV3IHN0ZGxpYi5VaW50OEFycmF5KGJ1ZmZlciksXHJcbiAgICAgICAgc2l6ZSA9IGZvcmVpZ24uc2l6ZSB8IDAsXHJcbiAgICAgICAgaW11bCA9IHN0ZGxpYi5NYXRoLmltdWw7XHJcblxyXG4gICAgZnVuY3Rpb24gZXJvZGUoaW5JbWFnZVB0ciwgb3V0SW1hZ2VQdHIpIHtcclxuICAgICAgICBpbkltYWdlUHRyID0gaW5JbWFnZVB0ciB8IDA7XHJcbiAgICAgICAgb3V0SW1hZ2VQdHIgPSBvdXRJbWFnZVB0ciB8IDA7XHJcblxyXG4gICAgICAgIHZhciB2ID0gMCxcclxuICAgICAgICAgICAgdSA9IDAsXHJcbiAgICAgICAgICAgIHN1bSA9IDAsXHJcbiAgICAgICAgICAgIHlTdGFydDEgPSAwLFxyXG4gICAgICAgICAgICB5U3RhcnQyID0gMCxcclxuICAgICAgICAgICAgeFN0YXJ0MSA9IDAsXHJcbiAgICAgICAgICAgIHhTdGFydDIgPSAwLFxyXG4gICAgICAgICAgICBvZmZzZXQgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKCB2ID0gMTsgKHYgfCAwKSA8ICgoc2l6ZSAtIDEpIHwgMCk7IHYgPSAodiArIDEpIHwgMCkge1xyXG4gICAgICAgICAgICBvZmZzZXQgPSAob2Zmc2V0ICsgc2l6ZSkgfCAwO1xyXG4gICAgICAgICAgICBmb3IgKCB1ID0gMTsgKHUgfCAwKSA8ICgoc2l6ZSAtIDEpIHwgMCk7IHUgPSAodSArIDEpIHwgMCkge1xyXG4gICAgICAgICAgICAgICAgeVN0YXJ0MSA9IChvZmZzZXQgLSBzaXplKSB8IDA7XHJcbiAgICAgICAgICAgICAgICB5U3RhcnQyID0gKG9mZnNldCArIHNpemUpIHwgMDtcclxuICAgICAgICAgICAgICAgIHhTdGFydDEgPSAodSAtIDEpIHwgMDtcclxuICAgICAgICAgICAgICAgIHhTdGFydDIgPSAodSArIDEpIHwgMDtcclxuICAgICAgICAgICAgICAgIHN1bSA9ICgoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MSArIHhTdGFydDEpIHwgMF0gfCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDEgKyB4U3RhcnQyKSB8IDBdIHwgMClcclxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyBvZmZzZXQgKyB1KSB8IDBdIHwgMClcclxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQyICsgeFN0YXJ0MSkgfCAwXSB8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MiArIHhTdGFydDIpIHwgMF0gfCAwKSkgfCAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKChzdW0gfCAwKSA9PSAoNSB8IDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIG9mZnNldCArIHUpIHwgMF0gPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZXNbKG91dEltYWdlUHRyICsgb2Zmc2V0ICsgdSkgfCAwXSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN1YnRyYWN0KGFJbWFnZVB0ciwgYkltYWdlUHRyLCBvdXRJbWFnZVB0cikge1xyXG4gICAgICAgIGFJbWFnZVB0ciA9IGFJbWFnZVB0ciB8IDA7XHJcbiAgICAgICAgYkltYWdlUHRyID0gYkltYWdlUHRyIHwgMDtcclxuICAgICAgICBvdXRJbWFnZVB0ciA9IG91dEltYWdlUHRyIHwgMDtcclxuXHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIGxlbmd0aCA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xyXG5cclxuICAgICAgICB3aGlsZSAoKGxlbmd0aCB8IDApID4gMCkge1xyXG4gICAgICAgICAgICBsZW5ndGggPSAobGVuZ3RoIC0gMSkgfCAwO1xyXG4gICAgICAgICAgICBpbWFnZXNbKG91dEltYWdlUHRyICsgbGVuZ3RoKSB8IDBdID1cclxuICAgICAgICAgICAgICAgICgoaW1hZ2VzWyhhSW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKSAtIChpbWFnZXNbKGJJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSB8IDApKSB8IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGJpdHdpc2VPcihhSW1hZ2VQdHIsIGJJbWFnZVB0ciwgb3V0SW1hZ2VQdHIpIHtcclxuICAgICAgICBhSW1hZ2VQdHIgPSBhSW1hZ2VQdHIgfCAwO1xyXG4gICAgICAgIGJJbWFnZVB0ciA9IGJJbWFnZVB0ciB8IDA7XHJcbiAgICAgICAgb3V0SW1hZ2VQdHIgPSBvdXRJbWFnZVB0ciB8IDA7XHJcblxyXG4gICAgICAgIHZhciBsZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBsZW5ndGggPSBpbXVsKHNpemUsIHNpemUpIHwgMDtcclxuXHJcbiAgICAgICAgd2hpbGUgKChsZW5ndGggfCAwKSA+IDApIHtcclxuICAgICAgICAgICAgbGVuZ3RoID0gKGxlbmd0aCAtIDEpIHwgMDtcclxuICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSA9XHJcbiAgICAgICAgICAgICAgICAoKGltYWdlc1soYUltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCkgfCAoaW1hZ2VzWyhiSW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKSkgfCAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb3VudE5vblplcm8oaW1hZ2VQdHIpIHtcclxuICAgICAgICBpbWFnZVB0ciA9IGltYWdlUHRyIHwgMDtcclxuXHJcbiAgICAgICAgdmFyIHN1bSA9IDAsXHJcbiAgICAgICAgICAgIGxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIGxlbmd0aCA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xyXG5cclxuICAgICAgICB3aGlsZSAoKGxlbmd0aCB8IDApID4gMCkge1xyXG4gICAgICAgICAgICBsZW5ndGggPSAobGVuZ3RoIC0gMSkgfCAwO1xyXG4gICAgICAgICAgICBzdW0gPSAoKHN1bSB8IDApICsgKGltYWdlc1soaW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKSkgfCAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChzdW0gfCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KGltYWdlUHRyLCB2YWx1ZSkge1xyXG4gICAgICAgIGltYWdlUHRyID0gaW1hZ2VQdHIgfCAwO1xyXG4gICAgICAgIHZhbHVlID0gdmFsdWUgfCAwO1xyXG5cclxuICAgICAgICB2YXIgbGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgbGVuZ3RoID0gaW11bChzaXplLCBzaXplKSB8IDA7XHJcblxyXG4gICAgICAgIHdoaWxlICgobGVuZ3RoIHwgMCkgPiAwKSB7XHJcbiAgICAgICAgICAgIGxlbmd0aCA9IChsZW5ndGggLSAxKSB8IDA7XHJcbiAgICAgICAgICAgIGltYWdlc1soaW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGlsYXRlKGluSW1hZ2VQdHIsIG91dEltYWdlUHRyKSB7XHJcbiAgICAgICAgaW5JbWFnZVB0ciA9IGluSW1hZ2VQdHIgfCAwO1xyXG4gICAgICAgIG91dEltYWdlUHRyID0gb3V0SW1hZ2VQdHIgfCAwO1xyXG5cclxuICAgICAgICB2YXIgdiA9IDAsXHJcbiAgICAgICAgICAgIHUgPSAwLFxyXG4gICAgICAgICAgICBzdW0gPSAwLFxyXG4gICAgICAgICAgICB5U3RhcnQxID0gMCxcclxuICAgICAgICAgICAgeVN0YXJ0MiA9IDAsXHJcbiAgICAgICAgICAgIHhTdGFydDEgPSAwLFxyXG4gICAgICAgICAgICB4U3RhcnQyID0gMCxcclxuICAgICAgICAgICAgb2Zmc2V0ID0gMDtcclxuXHJcbiAgICAgICAgZm9yICggdiA9IDE7ICh2IHwgMCkgPCAoKHNpemUgLSAxKSB8IDApOyB2ID0gKHYgKyAxKSB8IDApIHtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gKG9mZnNldCArIHNpemUpIHwgMDtcclxuICAgICAgICAgICAgZm9yICggdSA9IDE7ICh1IHwgMCkgPCAoKHNpemUgLSAxKSB8IDApOyB1ID0gKHUgKyAxKSB8IDApIHtcclxuICAgICAgICAgICAgICAgIHlTdGFydDEgPSAob2Zmc2V0IC0gc2l6ZSkgfCAwO1xyXG4gICAgICAgICAgICAgICAgeVN0YXJ0MiA9IChvZmZzZXQgKyBzaXplKSB8IDA7XHJcbiAgICAgICAgICAgICAgICB4U3RhcnQxID0gKHUgLSAxKSB8IDA7XHJcbiAgICAgICAgICAgICAgICB4U3RhcnQyID0gKHUgKyAxKSB8IDA7XHJcbiAgICAgICAgICAgICAgICBzdW0gPSAoKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDEgKyB4U3RhcnQxKSB8IDBdIHwgMClcclxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQxICsgeFN0YXJ0MikgfCAwXSB8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgb2Zmc2V0ICsgdSkgfCAwXSB8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MiArIHhTdGFydDEpIHwgMF0gfCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDIgKyB4U3RhcnQyKSB8IDBdIHwgMCkpIHwgMDtcclxuICAgICAgICAgICAgICAgIGlmICgoc3VtIHwgMCkgPiAoMCB8IDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIG9mZnNldCArIHUpIHwgMF0gPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZXNbKG91dEltYWdlUHRyICsgb2Zmc2V0ICsgdSkgfCAwXSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1lbWNweShzcmNJbWFnZVB0ciwgZHN0SW1hZ2VQdHIpIHtcclxuICAgICAgICBzcmNJbWFnZVB0ciA9IHNyY0ltYWdlUHRyIHwgMDtcclxuICAgICAgICBkc3RJbWFnZVB0ciA9IGRzdEltYWdlUHRyIHwgMDtcclxuXHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIGxlbmd0aCA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xyXG5cclxuICAgICAgICB3aGlsZSAoKGxlbmd0aCB8IDApID4gMCkge1xyXG4gICAgICAgICAgICBsZW5ndGggPSAobGVuZ3RoIC0gMSkgfCAwO1xyXG4gICAgICAgICAgICBpbWFnZXNbKGRzdEltYWdlUHRyICsgbGVuZ3RoKSB8IDBdID0gKGltYWdlc1soc3JjSW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gemVyb0JvcmRlcihpbWFnZVB0cikge1xyXG4gICAgICAgIGltYWdlUHRyID0gaW1hZ2VQdHIgfCAwO1xyXG5cclxuICAgICAgICB2YXIgeCA9IDAsXHJcbiAgICAgICAgICAgIHkgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKCB4ID0gMDsgKHggfCAwKSA8ICgoc2l6ZSAtIDEpIHwgMCk7IHggPSAoeCArIDEpIHwgMCkge1xyXG4gICAgICAgICAgICBpbWFnZXNbKGltYWdlUHRyICsgeCkgfCAwXSA9IDA7XHJcbiAgICAgICAgICAgIGltYWdlc1soaW1hZ2VQdHIgKyB5KSB8IDBdID0gMDtcclxuICAgICAgICAgICAgeSA9ICgoeSArIHNpemUpIC0gMSkgfCAwO1xyXG4gICAgICAgICAgICBpbWFnZXNbKGltYWdlUHRyICsgeSkgfCAwXSA9IDA7XHJcbiAgICAgICAgICAgIHkgPSAoeSArIDEpIHwgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICggeCA9IDA7ICh4IHwgMCkgPCAoc2l6ZSB8IDApOyB4ID0gKHggKyAxKSB8IDApIHtcclxuICAgICAgICAgICAgaW1hZ2VzWyhpbWFnZVB0ciArIHkpIHwgMF0gPSAwO1xyXG4gICAgICAgICAgICB5ID0gKHkgKyAxKSB8IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNrZWxldG9uaXplKCkge1xyXG4gICAgICAgIHZhciBzdWJJbWFnZVB0ciA9IDAsXHJcbiAgICAgICAgICAgIGVyb2RlZEltYWdlUHRyID0gMCxcclxuICAgICAgICAgICAgdGVtcEltYWdlUHRyID0gMCxcclxuICAgICAgICAgICAgc2tlbEltYWdlUHRyID0gMCxcclxuICAgICAgICAgICAgc3VtID0gMCxcclxuICAgICAgICAgICAgZG9uZSA9IDA7XHJcblxyXG4gICAgICAgIGVyb2RlZEltYWdlUHRyID0gaW11bChzaXplLCBzaXplKSB8IDA7XHJcbiAgICAgICAgdGVtcEltYWdlUHRyID0gKGVyb2RlZEltYWdlUHRyICsgZXJvZGVkSW1hZ2VQdHIpIHwgMDtcclxuICAgICAgICBza2VsSW1hZ2VQdHIgPSAodGVtcEltYWdlUHRyICsgZXJvZGVkSW1hZ2VQdHIpIHwgMDtcclxuXHJcbiAgICAgICAgLy8gaW5pdCBza2VsLWltYWdlXHJcbiAgICAgICAgaW5pdChza2VsSW1hZ2VQdHIsIDApO1xyXG4gICAgICAgIHplcm9Cb3JkZXIoc3ViSW1hZ2VQdHIpO1xyXG5cclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIGVyb2RlKHN1YkltYWdlUHRyLCBlcm9kZWRJbWFnZVB0cik7XHJcbiAgICAgICAgICAgIGRpbGF0ZShlcm9kZWRJbWFnZVB0ciwgdGVtcEltYWdlUHRyKTtcclxuICAgICAgICAgICAgc3VidHJhY3Qoc3ViSW1hZ2VQdHIsIHRlbXBJbWFnZVB0ciwgdGVtcEltYWdlUHRyKTtcclxuICAgICAgICAgICAgYml0d2lzZU9yKHNrZWxJbWFnZVB0ciwgdGVtcEltYWdlUHRyLCBza2VsSW1hZ2VQdHIpO1xyXG4gICAgICAgICAgICBtZW1jcHkoZXJvZGVkSW1hZ2VQdHIsIHN1YkltYWdlUHRyKTtcclxuICAgICAgICAgICAgc3VtID0gY291bnROb25aZXJvKHN1YkltYWdlUHRyKSB8IDA7XHJcbiAgICAgICAgICAgIGRvbmUgPSAoKHN1bSB8IDApID09IDAgfCAwKTtcclxuICAgICAgICB9IHdoaWxlICghZG9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBza2VsZXRvbml6ZTogc2tlbGV0b25pemVcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNrZWxldG9uaXplcjtcclxuLyogZXNsaW50LWVuYWJsZSBlcWVxZXEqL1xyXG4vKiBAcHJlc2VydmUgQVNNIEVORCAqL1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9za2VsZXRvbml6ZXIuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBkcmF3UmVjdDogZnVuY3Rpb24ocG9zLCBzaXplLCBjdHgsIHN0eWxlKXtcclxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdHlsZS5jb2xvcjtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gc3R5bGUuY29sb3I7XHJcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGN0eC5zdHJva2VSZWN0KHBvcy54LCBwb3MueSwgc2l6ZS54LCBzaXplLnkpO1xyXG4gICAgfSxcclxuICAgIGRyYXdQYXRoOiBmdW5jdGlvbihwYXRoLCBkZWYsIGN0eCwgc3R5bGUpIHtcclxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdHlsZS5jb2xvcjtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gc3R5bGUuY29sb3I7XHJcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0eWxlLmxpbmVXaWR0aDtcclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY3R4Lm1vdmVUbyhwYXRoWzBdW2RlZi54XSwgcGF0aFswXVtkZWYueV0pO1xyXG4gICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgcGF0aC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBjdHgubGluZVRvKHBhdGhbal1bZGVmLnhdLCBwYXRoW2pdW2RlZi55XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcclxuICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICB9LFxyXG4gICAgZHJhd0ltYWdlOiBmdW5jdGlvbihpbWFnZURhdGEsIHNpemUsIGN0eCkge1xyXG4gICAgICAgIHZhciBjYW52YXNEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBzaXplLngsIHNpemUueSksXHJcbiAgICAgICAgICAgIGRhdGEgPSBjYW52YXNEYXRhLmRhdGEsXHJcbiAgICAgICAgICAgIGltYWdlRGF0YVBvcyA9IGltYWdlRGF0YS5sZW5ndGgsXHJcbiAgICAgICAgICAgIGNhbnZhc0RhdGFQb3MgPSBkYXRhLmxlbmd0aCxcclxuICAgICAgICAgICAgdmFsdWU7XHJcblxyXG4gICAgICAgIGlmIChjYW52YXNEYXRhUG9zIC8gaW1hZ2VEYXRhUG9zICE9PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUgKGltYWdlRGF0YVBvcy0tKXtcclxuICAgICAgICAgICAgdmFsdWUgPSBpbWFnZURhdGFbaW1hZ2VEYXRhUG9zXTtcclxuICAgICAgICAgICAgZGF0YVstLWNhbnZhc0RhdGFQb3NdID0gMjU1O1xyXG4gICAgICAgICAgICBkYXRhWy0tY2FudmFzRGF0YVBvc10gPSB2YWx1ZTtcclxuICAgICAgICAgICAgZGF0YVstLWNhbnZhc0RhdGFQb3NdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGRhdGFbLS1jYW52YXNEYXRhUG9zXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHgucHV0SW1hZ2VEYXRhKGNhbnZhc0RhdGEsIDAsIDApO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9pbWFnZV9kZWJ1Zy5qc1xuICoqLyIsImltcG9ydCBCcmVzZW5oYW0gZnJvbSAnLi9icmVzZW5oYW0nO1xyXG5pbXBvcnQgSW1hZ2VEZWJ1ZyBmcm9tICcuL2ltYWdlX2RlYnVnJztcclxuaW1wb3J0IENvZGUxMjhSZWFkZXIgZnJvbSAnLi9jb2RlXzEyOF9yZWFkZXInO1xyXG5pbXBvcnQgRUFOUmVhZGVyIGZyb20gJy4vZWFuX3JlYWRlcic7XHJcbmltcG9ydCBDb2RlMzlSZWFkZXIgZnJvbSAnLi9jb2RlXzM5X3JlYWRlcic7XHJcbmltcG9ydCBDb2RlMzlWSU5SZWFkZXIgZnJvbSAnLi9jb2RlXzM5X3Zpbl9yZWFkZXInO1xyXG5pbXBvcnQgQ29kYWJhclJlYWRlciBmcm9tICcuL2NvZGFiYXJfcmVhZGVyJztcclxuaW1wb3J0IFVQQ1JlYWRlciBmcm9tICcuL3VwY19yZWFkZXInO1xyXG5pbXBvcnQgRUFOOFJlYWRlciBmcm9tICcuL2Vhbl84X3JlYWRlcic7XHJcbmltcG9ydCBVUENFUmVhZGVyIGZyb20gJy4vdXBjX2VfcmVhZGVyJztcclxuaW1wb3J0IEkyb2Y1UmVhZGVyIGZyb20gJy4vaTJvZjVfcmVhZGVyJztcclxuXHJcbmNvbnN0IFJFQURFUlMgPSB7XHJcbiAgICBjb2RlXzEyOF9yZWFkZXI6IENvZGUxMjhSZWFkZXIsXHJcbiAgICBlYW5fcmVhZGVyOiBFQU5SZWFkZXIsXHJcbiAgICBlYW5fOF9yZWFkZXI6IEVBTjhSZWFkZXIsXHJcbiAgICBjb2RlXzM5X3JlYWRlcjogQ29kZTM5UmVhZGVyLFxyXG4gICAgY29kZV8zOV92aW5fcmVhZGVyOiBDb2RlMzlWSU5SZWFkZXIsXHJcbiAgICBjb2RhYmFyX3JlYWRlcjogQ29kYWJhclJlYWRlcixcclxuICAgIHVwY19yZWFkZXI6IFVQQ1JlYWRlcixcclxuICAgIHVwY19lX3JlYWRlcjogVVBDRVJlYWRlcixcclxuICAgIGkyb2Y1X3JlYWRlcjogSTJvZjVSZWFkZXJcclxufTtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihjb25maWcsIGlucHV0SW1hZ2VXcmFwcGVyKSB7XHJcbiAgICAgICAgdmFyIF9jYW52YXMgPSB7XHJcbiAgICAgICAgICAgICAgICBjdHg6IHtcclxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiBudWxsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZG9tOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheTogbnVsbFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBfYmFyY29kZVJlYWRlcnMgPSBbXTtcclxuXHJcbiAgICAgICAgaW5pdENhbnZhcygpO1xyXG4gICAgICAgIGluaXRSZWFkZXJzKCk7XHJcbiAgICAgICAgaW5pdENvbmZpZygpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0Q2FudmFzKCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgdmFyICRkZWJ1ZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVidWcuZGV0ZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgX2NhbnZhcy5kb20uZnJlcXVlbmN5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhcy5mcmVxdWVuY3lcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV9jYW52YXMuZG9tLmZyZXF1ZW5jeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9jYW52YXMuZG9tLmZyZXF1ZW5jeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgX2NhbnZhcy5kb20uZnJlcXVlbmN5LmNsYXNzTmFtZSA9IFwiZnJlcXVlbmN5XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRkZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZGVidWcuYXBwZW5kQ2hpbGQoX2NhbnZhcy5kb20uZnJlcXVlbmN5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfY2FudmFzLmN0eC5mcmVxdWVuY3kgPSBfY2FudmFzLmRvbS5mcmVxdWVuY3kuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIF9jYW52YXMuZG9tLnBhdHRlcm4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzLnBhdHRlcm5CdWZmZXJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV9jYW52YXMuZG9tLnBhdHRlcm4pIHtcclxuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5wYXR0ZXJuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5wYXR0ZXJuLmNsYXNzTmFtZSA9IFwicGF0dGVybkJ1ZmZlclwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkZGVidWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGRlYnVnLmFwcGVuZENoaWxkKF9jYW52YXMuZG9tLnBhdHRlcm4pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF9jYW52YXMuY3R4LnBhdHRlcm4gPSBfY2FudmFzLmRvbS5wYXR0ZXJuLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5vdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhcy5kcmF3aW5nQnVmZmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF9jYW52YXMuZG9tLm92ZXJsYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmN0eC5vdmVybGF5ID0gX2NhbnZhcy5kb20ub3ZlcmxheS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRSZWFkZXJzKCkge1xyXG4gICAgICAgICAgICBjb25maWcucmVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHJlYWRlckNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlYWRlcixcclxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZWFkZXJDb25maWcgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyID0gcmVhZGVyQ29uZmlnLmZvcm1hdDtcclxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uID0gcmVhZGVyQ29uZmlnLmNvbmZpZztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlYWRlckNvbmZpZyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWFkZXIgPSByZWFkZXJDb25maWc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJlZm9yZSByZWdpc3RlcmluZyByZWFkZXI6IFwiLCByZWFkZXIpO1xyXG4gICAgICAgICAgICAgICAgX2JhcmNvZGVSZWFkZXJzLnB1c2gobmV3IFJFQURFUlNbcmVhZGVyXShjb25maWd1cmF0aW9uKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyZWQgUmVhZGVyczogXCIgKyBfYmFyY29kZVJlYWRlcnNcclxuICAgICAgICAgICAgICAgIC5tYXAoKHJlYWRlcikgPT4gSlNPTi5zdHJpbmdpZnkoe2Zvcm1hdDogcmVhZGVyLkZPUk1BVCwgY29uZmlnOiByZWFkZXIuY29uZmlnfSkpXHJcbiAgICAgICAgICAgICAgICAuam9pbignLCAnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0Q29uZmlnKCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGksXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzID0gW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZTogX2NhbnZhcy5kb20uZnJlcXVlbmN5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBjb25maWcuc2hvd0ZyZXF1ZW5jeVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZTogX2NhbnZhcy5kb20ucGF0dGVybixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogY29uZmlnLnNob3dQYXR0ZXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfV07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHZpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNbaV0ucHJvcCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNbaV0ubm9kZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc1tpXS5ub2RlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGV4dGVuZCB0aGUgbGluZSBvbiBib3RoIGVuZHNcclxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBsaW5lXHJcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGFuZ2xlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RXh0ZW5kZWRMaW5lKGxpbmUsIGFuZ2xlLCBleHQpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZXh0ZW5kTGluZShhbW91bnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBleHRlbnNpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeTogYW1vdW50ICogTWF0aC5zaW4oYW5nbGUpLFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IGFtb3VudCAqIE1hdGguY29zKGFuZ2xlKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBsaW5lWzBdLnkgLT0gZXh0ZW5zaW9uLnk7XHJcbiAgICAgICAgICAgICAgICBsaW5lWzBdLnggLT0gZXh0ZW5zaW9uLng7XHJcbiAgICAgICAgICAgICAgICBsaW5lWzFdLnkgKz0gZXh0ZW5zaW9uLnk7XHJcbiAgICAgICAgICAgICAgICBsaW5lWzFdLnggKz0gZXh0ZW5zaW9uLng7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGluc2lkZSBpbWFnZVxyXG4gICAgICAgICAgICBleHRlbmRMaW5lKGV4dCk7XHJcbiAgICAgICAgICAgIHdoaWxlIChleHQgPiAxICYmICghaW5wdXRJbWFnZVdyYXBwZXIuaW5JbWFnZVdpdGhCb3JkZXIobGluZVswXSwgMClcclxuICAgICAgICAgICAgICAgICAgICB8fCAhaW5wdXRJbWFnZVdyYXBwZXIuaW5JbWFnZVdpdGhCb3JkZXIobGluZVsxXSwgMCkpKSB7XHJcbiAgICAgICAgICAgICAgICBleHQgLT0gTWF0aC5jZWlsKGV4dCAvIDIpO1xyXG4gICAgICAgICAgICAgICAgZXh0ZW5kTGluZSgtZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbGluZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldExpbmUoYm94KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbe1xyXG4gICAgICAgICAgICAgICAgeDogKGJveFsxXVswXSAtIGJveFswXVswXSkgLyAyICsgYm94WzBdWzBdLFxyXG4gICAgICAgICAgICAgICAgeTogKGJveFsxXVsxXSAtIGJveFswXVsxXSkgLyAyICsgYm94WzBdWzFdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHg6IChib3hbM11bMF0gLSBib3hbMl1bMF0pIC8gMiArIGJveFsyXVswXSxcclxuICAgICAgICAgICAgICAgIHk6IChib3hbM11bMV0gLSBib3hbMl1bMV0pIC8gMiArIGJveFsyXVsxXVxyXG4gICAgICAgICAgICB9XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRyeURlY29kZShsaW5lKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBudWxsLFxyXG4gICAgICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgICAgIGJhcmNvZGVMaW5lID0gQnJlc2VuaGFtLmdldEJhcmNvZGVMaW5lKGlucHV0SW1hZ2VXcmFwcGVyLCBsaW5lWzBdLCBsaW5lWzFdKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25maWcuc2hvd0ZyZXF1ZW5jeSkge1xyXG4gICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UGF0aChsaW5lLCB7eDogJ3gnLCB5OiAneSd9LCBfY2FudmFzLmN0eC5vdmVybGF5LCB7Y29sb3I6ICdyZWQnLCBsaW5lV2lkdGg6IDN9KTtcclxuICAgICAgICAgICAgICAgIEJyZXNlbmhhbS5kZWJ1Zy5wcmludEZyZXF1ZW5jeShiYXJjb2RlTGluZS5saW5lLCBfY2FudmFzLmRvbS5mcmVxdWVuY3kpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEJyZXNlbmhhbS50b0JpbmFyeUxpbmUoYmFyY29kZUxpbmUpO1xyXG4gICAgICAgICAgICBpZiAoY29uZmlnLnNob3dQYXR0ZXJuKSB7XHJcbiAgICAgICAgICAgICAgICBCcmVzZW5oYW0uZGVidWcucHJpbnRQYXR0ZXJuKGJhcmNvZGVMaW5lLmxpbmUsIF9jYW52YXMuZG9tLnBhdHRlcm4pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IF9iYXJjb2RlUmVhZGVycy5sZW5ndGggJiYgcmVzdWx0ID09PSBudWxsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9iYXJjb2RlUmVhZGVyc1tpXS5kZWNvZGVQYXR0ZXJuKGJhcmNvZGVMaW5lLmxpbmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGNvZGVSZXN1bHQ6IHJlc3VsdCxcclxuICAgICAgICAgICAgICAgIGJhcmNvZGVMaW5lOiBiYXJjb2RlTGluZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhpcyBtZXRob2Qgc2xpY2VzIHRoZSBnaXZlbiBhcmVhIGFwYXJ0IGFuZCB0cmllcyB0byBkZXRlY3QgYSBiYXJjb2RlLXBhdHRlcm5cclxuICAgICAgICAgKiBmb3IgZWFjaCBzbGljZS4gSXQgcmV0dXJucyB0aGUgZGVjb2RlZCBiYXJjb2RlLCBvciBudWxsIGlmIG5vdGhpbmcgd2FzIGZvdW5kXHJcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gYm94XHJcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gbGluZVxyXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsaW5lQW5nbGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB0cnlEZWNvZGVCcnV0ZUZvcmNlKGJveCwgbGluZSwgbGluZUFuZ2xlKSB7XHJcbiAgICAgICAgICAgIHZhciBzaWRlTGVuZ3RoID0gTWF0aC5zcXJ0KE1hdGgucG93KGJveFsxXVswXSAtIGJveFswXVswXSwgMikgKyBNYXRoLnBvdygoYm94WzFdWzFdIC0gYm94WzBdWzFdKSwgMikpLFxyXG4gICAgICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgICAgIHNsaWNlcyA9IDE2LFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbnVsbCxcclxuICAgICAgICAgICAgICAgIGRpcixcclxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbixcclxuICAgICAgICAgICAgICAgIHhkaXIgPSBNYXRoLnNpbihsaW5lQW5nbGUpLFxyXG4gICAgICAgICAgICAgICAgeWRpciA9IE1hdGguY29zKGxpbmVBbmdsZSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKCBpID0gMTsgaSA8IHNsaWNlcyAmJiByZXN1bHQgPT09IG51bGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gbW92ZSBsaW5lIHBlcnBlbmRpY3VsYXIgdG8gYW5nbGVcclxuICAgICAgICAgICAgICAgIGRpciA9IHNpZGVMZW5ndGggLyBzbGljZXMgKiBpICogKGkgJSAyID09PSAwID8gLTEgOiAxKTtcclxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICB5OiBkaXIgKiB4ZGlyLFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IGRpciAqIHlkaXJcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBsaW5lWzBdLnkgKz0gZXh0ZW5zaW9uLng7XHJcbiAgICAgICAgICAgICAgICBsaW5lWzBdLnggLT0gZXh0ZW5zaW9uLnk7XHJcbiAgICAgICAgICAgICAgICBsaW5lWzFdLnkgKz0gZXh0ZW5zaW9uLng7XHJcbiAgICAgICAgICAgICAgICBsaW5lWzFdLnggLT0gZXh0ZW5zaW9uLnk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ5RGVjb2RlKGxpbmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRMaW5lTGVuZ3RoKGxpbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydChcclxuICAgICAgICAgICAgICAgIE1hdGgucG93KE1hdGguYWJzKGxpbmVbMV0ueSAtIGxpbmVbMF0ueSksIDIpICtcclxuICAgICAgICAgICAgICAgIE1hdGgucG93KE1hdGguYWJzKGxpbmVbMV0ueCAtIGxpbmVbMF0ueCksIDIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFdpdGggdGhlIGhlbHAgb2YgdGhlIGNvbmZpZ3VyZWQgcmVhZGVycyAoQ29kZTEyOCBvciBFQU4pIHRoaXMgZnVuY3Rpb24gdHJpZXMgdG8gZGV0ZWN0IGFcclxuICAgICAgICAgKiB2YWxpZCBiYXJjb2RlIHBhdHRlcm4gd2l0aGluIHRoZSBnaXZlbiBhcmVhLlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBib3ggVGhlIGFyZWEgdG8gc2VhcmNoIGluXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdH0gdGhlIHJlc3VsdCB7Y29kZVJlc3VsdCwgbGluZSwgYW5nbGUsIHBhdHRlcm4sIHRocmVzaG9sZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBkZWNvZGVGcm9tQm91bmRpbmdCb3goYm94KSB7XHJcbiAgICAgICAgICAgIHZhciBsaW5lLFxyXG4gICAgICAgICAgICAgICAgbGluZUFuZ2xlLFxyXG4gICAgICAgICAgICAgICAgY3R4ID0gX2NhbnZhcy5jdHgub3ZlcmxheSxcclxuICAgICAgICAgICAgICAgIHJlc3VsdCxcclxuICAgICAgICAgICAgICAgIGxpbmVMZW5ndGg7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29uZmlnLmRyYXdCb3VuZGluZ0JveCAmJiBjdHgpIHtcclxuICAgICAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgoYm94LCB7eDogMCwgeTogMX0sIGN0eCwge2NvbG9yOiBcImJsdWVcIiwgbGluZVdpZHRoOiAyfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxpbmUgPSBnZXRMaW5lKGJveCk7XHJcbiAgICAgICAgICAgIGxpbmVMZW5ndGggPSBnZXRMaW5lTGVuZ3RoKGxpbmUpO1xyXG4gICAgICAgICAgICBsaW5lQW5nbGUgPSBNYXRoLmF0YW4yKGxpbmVbMV0ueSAtIGxpbmVbMF0ueSwgbGluZVsxXS54IC0gbGluZVswXS54KTtcclxuICAgICAgICAgICAgbGluZSA9IGdldEV4dGVuZGVkTGluZShsaW5lLCBsaW5lQW5nbGUsIE1hdGguZmxvb3IobGluZUxlbmd0aCAqIDAuMSkpO1xyXG4gICAgICAgICAgICBpZiAobGluZSA9PT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzdWx0ID0gdHJ5RGVjb2RlKGxpbmUpO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnlEZWNvZGVCcnV0ZUZvcmNlKGJveCwgbGluZSwgbGluZUFuZ2xlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgY29uZmlnLmRyYXdTY2FubGluZSAmJiBjdHgpIHtcclxuICAgICAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgobGluZSwge3g6ICd4JywgeTogJ3knfSwgY3R4LCB7Y29sb3I6ICdyZWQnLCBsaW5lV2lkdGg6IDN9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGNvZGVSZXN1bHQ6IHJlc3VsdC5jb2RlUmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgbGluZTogbGluZSxcclxuICAgICAgICAgICAgICAgIGFuZ2xlOiBsaW5lQW5nbGUsXHJcbiAgICAgICAgICAgICAgICBwYXR0ZXJuOiByZXN1bHQuYmFyY29kZUxpbmUubGluZSxcclxuICAgICAgICAgICAgICAgIHRocmVzaG9sZDogcmVzdWx0LmJhcmNvZGVMaW5lLnRocmVzaG9sZFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGVjb2RlRnJvbUJvdW5kaW5nQm94OiBmdW5jdGlvbihib3gpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGVGcm9tQm91bmRpbmdCb3goYm94KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVjb2RlRnJvbUJvdW5kaW5nQm94ZXM6IGZ1bmN0aW9uKGJveGVzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaSwgcmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgICAgIGJhcmNvZGVzID0gW10sXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGUgPSBjb25maWcubXVsdGlwbGU7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCBib3hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJveCA9IGJveGVzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRlY29kZUZyb21Cb3VuZGluZ0JveChib3gpIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ib3ggPSBib3g7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXJjb2Rlcy5wdXNoKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQuY29kZVJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXJjb2Rlc1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldFJlYWRlcnM6IGZ1bmN0aW9uKHJlYWRlcnMpIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5yZWFkZXJzID0gcmVhZGVycztcclxuICAgICAgICAgICAgICAgIF9iYXJjb2RlUmVhZGVycy5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgaW5pdFJlYWRlcnMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2JhcmNvZGVfZGVjb2Rlci5qc1xuICoqLyIsImltcG9ydCBDVlV0aWxzIGZyb20gJy4vY3ZfdXRpbHMnO1xyXG5pbXBvcnQgSW1hZ2VXcmFwcGVyIGZyb20gJy4vaW1hZ2Vfd3JhcHBlcic7XHJcblxyXG52YXIgQnJlc2VuaGFtID0ge307XHJcblxyXG52YXIgU2xvcGUgPSB7XHJcbiAgICBESVI6IHtcclxuICAgICAgICBVUDogMSxcclxuICAgICAgICBET1dOOiAtMVxyXG4gICAgfVxyXG59O1xyXG4vKipcclxuICogU2NhbnMgYSBsaW5lIG9mIHRoZSBnaXZlbiBpbWFnZSBmcm9tIHBvaW50IHAxIHRvIHAyIGFuZCByZXR1cm5zIGEgcmVzdWx0IG9iamVjdCBjb250YWluaW5nXHJcbiAqIGdyYXktc2NhbGUgdmFsdWVzICgwLTI1NSkgb2YgdGhlIHVuZGVybHlpbmcgcGl4ZWxzIGluIGFkZGl0aW9uIHRvIHRoZSBtaW5cclxuICogYW5kIG1heCB2YWx1ZXMuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbWFnZVdyYXBwZXJcclxuICogQHBhcmFtIHtPYmplY3R9IHAxIFRoZSBzdGFydCBwb2ludCB7eCx5fVxyXG4gKiBAcGFyYW0ge09iamVjdH0gcDIgVGhlIGVuZCBwb2ludCB7eCx5fVxyXG4gKiBAcmV0dXJucyB7bGluZSwgbWluLCBtYXh9XHJcbiAqL1xyXG5CcmVzZW5oYW0uZ2V0QmFyY29kZUxpbmUgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIHAxLCBwMikge1xyXG4gICAgdmFyIHgwID0gcDEueCB8IDAsXHJcbiAgICAgICAgeTAgPSBwMS55IHwgMCxcclxuICAgICAgICB4MSA9IHAyLnggfCAwLFxyXG4gICAgICAgIHkxID0gcDIueSB8IDAsXHJcbiAgICAgICAgc3RlZXAgPSBNYXRoLmFicyh5MSAtIHkwKSA+IE1hdGguYWJzKHgxIC0geDApLFxyXG4gICAgICAgIGRlbHRheCxcclxuICAgICAgICBkZWx0YXksXHJcbiAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgeXN0ZXAsXHJcbiAgICAgICAgeSxcclxuICAgICAgICB0bXAsXHJcbiAgICAgICAgeCxcclxuICAgICAgICBsaW5lID0gW10sXHJcbiAgICAgICAgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54LFxyXG4gICAgICAgIHN1bSA9IDAsXHJcbiAgICAgICAgdmFsLFxyXG4gICAgICAgIG1pbiA9IDI1NSxcclxuICAgICAgICBtYXggPSAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlYWQoYSwgYikge1xyXG4gICAgICAgIHZhbCA9IGltYWdlRGF0YVtiICogd2lkdGggKyBhXTtcclxuICAgICAgICBzdW0gKz0gdmFsO1xyXG4gICAgICAgIG1pbiA9IHZhbCA8IG1pbiA/IHZhbCA6IG1pbjtcclxuICAgICAgICBtYXggPSB2YWwgPiBtYXggPyB2YWwgOiBtYXg7XHJcbiAgICAgICAgbGluZS5wdXNoKHZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN0ZWVwKSB7XHJcbiAgICAgICAgdG1wID0geDA7XHJcbiAgICAgICAgeDAgPSB5MDtcclxuICAgICAgICB5MCA9IHRtcDtcclxuXHJcbiAgICAgICAgdG1wID0geDE7XHJcbiAgICAgICAgeDEgPSB5MTtcclxuICAgICAgICB5MSA9IHRtcDtcclxuICAgIH1cclxuICAgIGlmICh4MCA+IHgxKSB7XHJcbiAgICAgICAgdG1wID0geDA7XHJcbiAgICAgICAgeDAgPSB4MTtcclxuICAgICAgICB4MSA9IHRtcDtcclxuXHJcbiAgICAgICAgdG1wID0geTA7XHJcbiAgICAgICAgeTAgPSB5MTtcclxuICAgICAgICB5MSA9IHRtcDtcclxuICAgIH1cclxuICAgIGRlbHRheCA9IHgxIC0geDA7XHJcbiAgICBkZWx0YXkgPSBNYXRoLmFicyh5MSAtIHkwKTtcclxuICAgIGVycm9yID0gKGRlbHRheCAvIDIpIHwgMDtcclxuICAgIHkgPSB5MDtcclxuICAgIHlzdGVwID0geTAgPCB5MSA/IDEgOiAtMTtcclxuICAgIGZvciAoIHggPSB4MDsgeCA8IHgxOyB4KyspIHtcclxuICAgICAgICBpZiAoc3RlZXApe1xyXG4gICAgICAgICAgICByZWFkKHksIHgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlYWQoeCwgeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVycm9yID0gZXJyb3IgLSBkZWx0YXk7XHJcbiAgICAgICAgaWYgKGVycm9yIDwgMCkge1xyXG4gICAgICAgICAgICB5ID0geSArIHlzdGVwO1xyXG4gICAgICAgICAgICBlcnJvciA9IGVycm9yICsgZGVsdGF4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxpbmU6IGxpbmUsXHJcbiAgICAgICAgbWluOiBtaW4sXHJcbiAgICAgICAgbWF4OiBtYXhcclxuICAgIH07XHJcbn07XHJcblxyXG5CcmVzZW5oYW0udG9PdHN1QmluYXJ5TGluZSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgdmFyIGxpbmUgPSByZXN1bHQubGluZSxcclxuICAgICAgICBpbWFnZSA9IG5ldyBJbWFnZVdyYXBwZXIoe3g6IGxpbmUubGVuZ3RoIC0gMSwgeTogMX0sIGxpbmUpLFxyXG4gICAgICAgIHRocmVzaG9sZCA9IENWVXRpbHMuZGV0ZXJtaW5lT3RzdVRocmVzaG9sZChpbWFnZSwgNSk7XHJcblxyXG4gICAgbGluZSA9IENWVXRpbHMuc2hhcnBlbkxpbmUobGluZSk7XHJcbiAgICBDVlV0aWxzLnRocmVzaG9sZEltYWdlKGltYWdlLCB0aHJlc2hvbGQpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbGluZTogbGluZSxcclxuICAgICAgICB0aHJlc2hvbGQ6IHRocmVzaG9sZFxyXG4gICAgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGUgcmVzdWx0IGZyb20gZ2V0QmFyY29kZUxpbmUgaW50byBhIGJpbmFyeSByZXByZXNlbnRhdGlvblxyXG4gKiBhbHNvIGNvbnNpZGVyaW5nIHRoZSBmcmVxdWVuY3kgYW5kIHNsb3BlIG9mIHRoZSBzaWduYWwgZm9yIG1vcmUgcm9idXN0IHJlc3VsdHNcclxuICogQHBhcmFtIHtPYmplY3R9IHJlc3VsdCB7bGluZSwgbWluLCBtYXh9XHJcbiAqL1xyXG5CcmVzZW5oYW0udG9CaW5hcnlMaW5lID0gZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICB2YXIgbWluID0gcmVzdWx0Lm1pbixcclxuICAgICAgICBtYXggPSByZXN1bHQubWF4LFxyXG4gICAgICAgIGxpbmUgPSByZXN1bHQubGluZSxcclxuICAgICAgICBzbG9wZSxcclxuICAgICAgICBzbG9wZTIsXHJcbiAgICAgICAgY2VudGVyID0gbWluICsgKG1heCAtIG1pbikgLyAyLFxyXG4gICAgICAgIGV4dHJlbWEgPSBbXSxcclxuICAgICAgICBjdXJyZW50RGlyLFxyXG4gICAgICAgIGRpcixcclxuICAgICAgICB0aHJlc2hvbGQgPSAobWF4IC0gbWluKSAvIDEyLFxyXG4gICAgICAgIHJUaHJlc2hvbGQgPSAtdGhyZXNob2xkLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgajtcclxuXHJcbiAgICAvLyAxLiBmaW5kIGV4dHJlbWFcclxuICAgIGN1cnJlbnREaXIgPSBsaW5lWzBdID4gY2VudGVyID8gU2xvcGUuRElSLlVQIDogU2xvcGUuRElSLkRPV047XHJcbiAgICBleHRyZW1hLnB1c2goe1xyXG4gICAgICAgIHBvczogMCxcclxuICAgICAgICB2YWw6IGxpbmVbMF1cclxuICAgIH0pO1xyXG4gICAgZm9yICggaSA9IDA7IGkgPCBsaW5lLmxlbmd0aCAtIDI7IGkrKykge1xyXG4gICAgICAgIHNsb3BlID0gKGxpbmVbaSArIDFdIC0gbGluZVtpXSk7XHJcbiAgICAgICAgc2xvcGUyID0gKGxpbmVbaSArIDJdIC0gbGluZVtpICsgMV0pO1xyXG4gICAgICAgIGlmICgoc2xvcGUgKyBzbG9wZTIpIDwgclRocmVzaG9sZCAmJiBsaW5lW2kgKyAxXSA8IChjZW50ZXIgKiAxLjUpKSB7XHJcbiAgICAgICAgICAgIGRpciA9IFNsb3BlLkRJUi5ET1dOO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHNsb3BlICsgc2xvcGUyKSA+IHRocmVzaG9sZCAmJiBsaW5lW2kgKyAxXSA+IChjZW50ZXIgKiAwLjUpKSB7XHJcbiAgICAgICAgICAgIGRpciA9IFNsb3BlLkRJUi5VUDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkaXIgPSBjdXJyZW50RGlyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnREaXIgIT09IGRpcikge1xyXG4gICAgICAgICAgICBleHRyZW1hLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgcG9zOiBpLFxyXG4gICAgICAgICAgICAgICAgdmFsOiBsaW5lW2ldXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjdXJyZW50RGlyID0gZGlyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4dHJlbWEucHVzaCh7XHJcbiAgICAgICAgcG9zOiBsaW5lLmxlbmd0aCxcclxuICAgICAgICB2YWw6IGxpbmVbbGluZS5sZW5ndGggLSAxXVxyXG4gICAgfSk7XHJcblxyXG4gICAgZm9yICggaiA9IGV4dHJlbWFbMF0ucG9zOyBqIDwgZXh0cmVtYVsxXS5wb3M7IGorKykge1xyXG4gICAgICAgIGxpbmVbal0gPSBsaW5lW2pdID4gY2VudGVyID8gMCA6IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGV4dHJlbWEgYW5kIGNvbnZlcnQgdG8gYmluYXJ5IGJhc2VkIG9uIGF2ZyBiZXR3ZWVuIG1pbm1heFxyXG4gICAgZm9yICggaSA9IDE7IGkgPCBleHRyZW1hLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgIGlmIChleHRyZW1hW2kgKyAxXS52YWwgPiBleHRyZW1hW2ldLnZhbCkge1xyXG4gICAgICAgICAgICB0aHJlc2hvbGQgPSAoZXh0cmVtYVtpXS52YWwgKyAoKGV4dHJlbWFbaSArIDFdLnZhbCAtIGV4dHJlbWFbaV0udmFsKSAvIDMpICogMikgfCAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocmVzaG9sZCA9IChleHRyZW1hW2kgKyAxXS52YWwgKyAoKGV4dHJlbWFbaV0udmFsIC0gZXh0cmVtYVtpICsgMV0udmFsKSAvIDMpKSB8IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKCBqID0gZXh0cmVtYVtpXS5wb3M7IGogPCBleHRyZW1hW2kgKyAxXS5wb3M7IGorKykge1xyXG4gICAgICAgICAgICBsaW5lW2pdID0gbGluZVtqXSA+IHRocmVzaG9sZCA/IDAgOiAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxpbmU6IGxpbmUsXHJcbiAgICAgICAgdGhyZXNob2xkOiB0aHJlc2hvbGRcclxuICAgIH07XHJcbn07XHJcblxyXG4vKipcclxuICogVXNlZCBmb3IgZGV2ZWxvcG1lbnQgb25seVxyXG4gKi9cclxuQnJlc2VuaGFtLmRlYnVnID0ge1xyXG4gICAgcHJpbnRGcmVxdWVuY3k6IGZ1bmN0aW9uKGxpbmUsIGNhbnZhcykge1xyXG4gICAgICAgIHZhciBpLFxyXG4gICAgICAgICAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGxpbmUubGVuZ3RoO1xyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSAyNTY7XHJcblxyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsdWVcIjtcclxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY3R4Lm1vdmVUbyhpLCAyNTUpO1xyXG4gICAgICAgICAgICBjdHgubGluZVRvKGksIDI1NSAtIGxpbmVbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBwcmludFBhdHRlcm46IGZ1bmN0aW9uKGxpbmUsIGNhbnZhcykge1xyXG4gICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLCBpO1xyXG5cclxuICAgICAgICBjYW52YXMud2lkdGggPSBsaW5lLmxlbmd0aDtcclxuICAgICAgICBjdHguZmlsbENvbG9yID0gXCJibGFja1wiO1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgbGluZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobGluZVtpXSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KGksIDAsIDEsIDEwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCcmVzZW5oYW07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2JyZXNlbmhhbS5qc1xuICoqLyIsImltcG9ydCBCYXJjb2RlUmVhZGVyIGZyb20gJy4vYmFyY29kZV9yZWFkZXInO1xyXG5cclxuZnVuY3Rpb24gQ29kZTEyOFJlYWRlcigpIHtcclxuICAgIEJhcmNvZGVSZWFkZXIuY2FsbCh0aGlzKTtcclxufVxyXG5cclxudmFyIHByb3BlcnRpZXMgPSB7XHJcbiAgICBDT0RFX1NISUZUOiB7dmFsdWU6IDk4fSxcclxuICAgIENPREVfQzoge3ZhbHVlOiA5OX0sXHJcbiAgICBDT0RFX0I6IHt2YWx1ZTogMTAwfSxcclxuICAgIENPREVfQToge3ZhbHVlOiAxMDF9LFxyXG4gICAgU1RBUlRfQ09ERV9BOiB7dmFsdWU6IDEwM30sXHJcbiAgICBTVEFSVF9DT0RFX0I6IHt2YWx1ZTogMTA0fSxcclxuICAgIFNUQVJUX0NPREVfQzoge3ZhbHVlOiAxMDV9LFxyXG4gICAgU1RPUF9DT0RFOiB7dmFsdWU6IDEwNn0sXHJcbiAgICBNT0RVTE86IHt2YWx1ZTogMTF9LFxyXG4gICAgQ09ERV9QQVRURVJOOiB7dmFsdWU6IFtcclxuICAgICAgICBbMiwgMSwgMiwgMiwgMiwgMl0sXHJcbiAgICAgICAgWzIsIDIsIDIsIDEsIDIsIDJdLFxyXG4gICAgICAgIFsyLCAyLCAyLCAyLCAyLCAxXSxcclxuICAgICAgICBbMSwgMiwgMSwgMiwgMiwgM10sXHJcbiAgICAgICAgWzEsIDIsIDEsIDMsIDIsIDJdLFxyXG4gICAgICAgIFsxLCAzLCAxLCAyLCAyLCAyXSxcclxuICAgICAgICBbMSwgMiwgMiwgMiwgMSwgM10sXHJcbiAgICAgICAgWzEsIDIsIDIsIDMsIDEsIDJdLFxyXG4gICAgICAgIFsxLCAzLCAyLCAyLCAxLCAyXSxcclxuICAgICAgICBbMiwgMiwgMSwgMiwgMSwgM10sXHJcbiAgICAgICAgWzIsIDIsIDEsIDMsIDEsIDJdLFxyXG4gICAgICAgIFsyLCAzLCAxLCAyLCAxLCAyXSxcclxuICAgICAgICBbMSwgMSwgMiwgMiwgMywgMl0sXHJcbiAgICAgICAgWzEsIDIsIDIsIDEsIDMsIDJdLFxyXG4gICAgICAgIFsxLCAyLCAyLCAyLCAzLCAxXSxcclxuICAgICAgICBbMSwgMSwgMywgMiwgMiwgMl0sXHJcbiAgICAgICAgWzEsIDIsIDMsIDEsIDIsIDJdLFxyXG4gICAgICAgIFsxLCAyLCAzLCAyLCAyLCAxXSxcclxuICAgICAgICBbMiwgMiwgMywgMiwgMSwgMV0sXHJcbiAgICAgICAgWzIsIDIsIDEsIDEsIDMsIDJdLFxyXG4gICAgICAgIFsyLCAyLCAxLCAyLCAzLCAxXSxcclxuICAgICAgICBbMiwgMSwgMywgMiwgMSwgMl0sXHJcbiAgICAgICAgWzIsIDIsIDMsIDEsIDEsIDJdLFxyXG4gICAgICAgIFszLCAxLCAyLCAxLCAzLCAxXSxcclxuICAgICAgICBbMywgMSwgMSwgMiwgMiwgMl0sXHJcbiAgICAgICAgWzMsIDIsIDEsIDEsIDIsIDJdLFxyXG4gICAgICAgIFszLCAyLCAxLCAyLCAyLCAxXSxcclxuICAgICAgICBbMywgMSwgMiwgMiwgMSwgMl0sXHJcbiAgICAgICAgWzMsIDIsIDIsIDEsIDEsIDJdLFxyXG4gICAgICAgIFszLCAyLCAyLCAyLCAxLCAxXSxcclxuICAgICAgICBbMiwgMSwgMiwgMSwgMiwgM10sXHJcbiAgICAgICAgWzIsIDEsIDIsIDMsIDIsIDFdLFxyXG4gICAgICAgIFsyLCAzLCAyLCAxLCAyLCAxXSxcclxuICAgICAgICBbMSwgMSwgMSwgMywgMiwgM10sXHJcbiAgICAgICAgWzEsIDMsIDEsIDEsIDIsIDNdLFxyXG4gICAgICAgIFsxLCAzLCAxLCAzLCAyLCAxXSxcclxuICAgICAgICBbMSwgMSwgMiwgMywgMSwgM10sXHJcbiAgICAgICAgWzEsIDMsIDIsIDEsIDEsIDNdLFxyXG4gICAgICAgIFsxLCAzLCAyLCAzLCAxLCAxXSxcclxuICAgICAgICBbMiwgMSwgMSwgMywgMSwgM10sXHJcbiAgICAgICAgWzIsIDMsIDEsIDEsIDEsIDNdLFxyXG4gICAgICAgIFsyLCAzLCAxLCAzLCAxLCAxXSxcclxuICAgICAgICBbMSwgMSwgMiwgMSwgMywgM10sXHJcbiAgICAgICAgWzEsIDEsIDIsIDMsIDMsIDFdLFxyXG4gICAgICAgIFsxLCAzLCAyLCAxLCAzLCAxXSxcclxuICAgICAgICBbMSwgMSwgMywgMSwgMiwgM10sXHJcbiAgICAgICAgWzEsIDEsIDMsIDMsIDIsIDFdLFxyXG4gICAgICAgIFsxLCAzLCAzLCAxLCAyLCAxXSxcclxuICAgICAgICBbMywgMSwgMywgMSwgMiwgMV0sXHJcbiAgICAgICAgWzIsIDEsIDEsIDMsIDMsIDFdLFxyXG4gICAgICAgIFsyLCAzLCAxLCAxLCAzLCAxXSxcclxuICAgICAgICBbMiwgMSwgMywgMSwgMSwgM10sXHJcbiAgICAgICAgWzIsIDEsIDMsIDMsIDEsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAzLCAxLCAzLCAxXSxcclxuICAgICAgICBbMywgMSwgMSwgMSwgMiwgM10sXHJcbiAgICAgICAgWzMsIDEsIDEsIDMsIDIsIDFdLFxyXG4gICAgICAgIFszLCAzLCAxLCAxLCAyLCAxXSxcclxuICAgICAgICBbMywgMSwgMiwgMSwgMSwgM10sXHJcbiAgICAgICAgWzMsIDEsIDIsIDMsIDEsIDFdLFxyXG4gICAgICAgIFszLCAzLCAyLCAxLCAxLCAxXSxcclxuICAgICAgICBbMywgMSwgNCwgMSwgMSwgMV0sXHJcbiAgICAgICAgWzIsIDIsIDEsIDQsIDEsIDFdLFxyXG4gICAgICAgIFs0LCAzLCAxLCAxLCAxLCAxXSxcclxuICAgICAgICBbMSwgMSwgMSwgMiwgMiwgNF0sXHJcbiAgICAgICAgWzEsIDEsIDEsIDQsIDIsIDJdLFxyXG4gICAgICAgIFsxLCAyLCAxLCAxLCAyLCA0XSxcclxuICAgICAgICBbMSwgMiwgMSwgNCwgMiwgMV0sXHJcbiAgICAgICAgWzEsIDQsIDEsIDEsIDIsIDJdLFxyXG4gICAgICAgIFsxLCA0LCAxLCAyLCAyLCAxXSxcclxuICAgICAgICBbMSwgMSwgMiwgMiwgMSwgNF0sXHJcbiAgICAgICAgWzEsIDEsIDIsIDQsIDEsIDJdLFxyXG4gICAgICAgIFsxLCAyLCAyLCAxLCAxLCA0XSxcclxuICAgICAgICBbMSwgMiwgMiwgNCwgMSwgMV0sXHJcbiAgICAgICAgWzEsIDQsIDIsIDEsIDEsIDJdLFxyXG4gICAgICAgIFsxLCA0LCAyLCAyLCAxLCAxXSxcclxuICAgICAgICBbMiwgNCwgMSwgMiwgMSwgMV0sXHJcbiAgICAgICAgWzIsIDIsIDEsIDEsIDEsIDRdLFxyXG4gICAgICAgIFs0LCAxLCAzLCAxLCAxLCAxXSxcclxuICAgICAgICBbMiwgNCwgMSwgMSwgMSwgMl0sXHJcbiAgICAgICAgWzEsIDMsIDQsIDEsIDEsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAxLCAyLCA0LCAyXSxcclxuICAgICAgICBbMSwgMiwgMSwgMSwgNCwgMl0sXHJcbiAgICAgICAgWzEsIDIsIDEsIDIsIDQsIDFdLFxyXG4gICAgICAgIFsxLCAxLCA0LCAyLCAxLCAyXSxcclxuICAgICAgICBbMSwgMiwgNCwgMSwgMSwgMl0sXHJcbiAgICAgICAgWzEsIDIsIDQsIDIsIDEsIDFdLFxyXG4gICAgICAgIFs0LCAxLCAxLCAyLCAxLCAyXSxcclxuICAgICAgICBbNCwgMiwgMSwgMSwgMSwgMl0sXHJcbiAgICAgICAgWzQsIDIsIDEsIDIsIDEsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAyLCAxLCA0LCAxXSxcclxuICAgICAgICBbMiwgMSwgNCwgMSwgMiwgMV0sXHJcbiAgICAgICAgWzQsIDEsIDIsIDEsIDIsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAxLCAxLCA0LCAzXSxcclxuICAgICAgICBbMSwgMSwgMSwgMywgNCwgMV0sXHJcbiAgICAgICAgWzEsIDMsIDEsIDEsIDQsIDFdLFxyXG4gICAgICAgIFsxLCAxLCA0LCAxLCAxLCAzXSxcclxuICAgICAgICBbMSwgMSwgNCwgMywgMSwgMV0sXHJcbiAgICAgICAgWzQsIDEsIDEsIDEsIDEsIDNdLFxyXG4gICAgICAgIFs0LCAxLCAxLCAzLCAxLCAxXSxcclxuICAgICAgICBbMSwgMSwgMywgMSwgNCwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDQsIDEsIDMsIDFdLFxyXG4gICAgICAgIFszLCAxLCAxLCAxLCA0LCAxXSxcclxuICAgICAgICBbNCwgMSwgMSwgMSwgMywgMV0sXHJcbiAgICAgICAgWzIsIDEsIDEsIDQsIDEsIDJdLFxyXG4gICAgICAgIFsyLCAxLCAxLCAyLCAxLCA0XSxcclxuICAgICAgICBbMiwgMSwgMSwgMiwgMywgMl0sXHJcbiAgICAgICAgWzIsIDMsIDMsIDEsIDEsIDEsIDJdXHJcbiAgICBdfSxcclxuICAgIFNJTkdMRV9DT0RFX0VSUk9SOiB7dmFsdWU6IDF9LFxyXG4gICAgQVZHX0NPREVfRVJST1I6IHt2YWx1ZTogMC41fSxcclxuICAgIEZPUk1BVDoge3ZhbHVlOiBcImNvZGVfMTI4XCIsIHdyaXRlYWJsZTogZmFsc2V9XHJcbn07XHJcblxyXG5Db2RlMTI4UmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFyY29kZVJlYWRlci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xyXG5Db2RlMTI4UmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvZGUxMjhSZWFkZXI7XHJcblxyXG5Db2RlMTI4UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlQ29kZSA9IGZ1bmN0aW9uKHN0YXJ0KSB7XHJcbiAgICB2YXIgY291bnRlciA9IFswLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICBpLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIG9mZnNldCA9IHN0YXJ0LFxyXG4gICAgICAgIGlzV2hpdGUgPSAhc2VsZi5fcm93W29mZnNldF0sXHJcbiAgICAgICAgY291bnRlclBvcyA9IDAsXHJcbiAgICAgICAgYmVzdE1hdGNoID0ge1xyXG4gICAgICAgICAgICBlcnJvcjogTnVtYmVyLk1BWF9WQUxVRSxcclxuICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcclxuICAgICAgICAgICAgZW5kOiBzdGFydFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29kZSxcclxuICAgICAgICBlcnJvcixcclxuICAgICAgICBub3JtYWxpemVkO1xyXG5cclxuICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZCA9IHNlbGYuX25vcm1hbGl6ZShjb3VudGVyKTtcclxuICAgICAgICAgICAgICAgIGlmIChub3JtYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb2RlID0gMDsgY29kZSA8IHNlbGYuQ09ERV9QQVRURVJOLmxlbmd0aDsgY29kZSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKG5vcm1hbGl6ZWQsIHNlbGYuQ09ERV9QQVRURVJOW2NvZGVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIDwgYmVzdE1hdGNoLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guY29kZSA9IGNvZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZW5kID0gaTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xyXG4gICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5Db2RlMTI4UmVhZGVyLnByb3RvdHlwZS5fZmluZFN0YXJ0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgY291bnRlciA9IFswLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICBpLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KSxcclxuICAgICAgICBpc1doaXRlID0gZmFsc2UsXHJcbiAgICAgICAgY291bnRlclBvcyA9IDAsXHJcbiAgICAgICAgYmVzdE1hdGNoID0ge1xyXG4gICAgICAgICAgICBlcnJvcjogTnVtYmVyLk1BWF9WQUxVRSxcclxuICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgIHN0YXJ0OiAwLFxyXG4gICAgICAgICAgICBlbmQ6IDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvZGUsXHJcbiAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgaixcclxuICAgICAgICBzdW0sXHJcbiAgICAgICAgbm9ybWFsaXplZDtcclxuXHJcbiAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBjb3VudGVyLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHN1bSA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IGNvdW50ZXIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gY291bnRlcltqXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWQgPSBzZWxmLl9ub3JtYWxpemUoY291bnRlcik7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29kZSA9IHNlbGYuU1RBUlRfQ09ERV9BOyBjb2RlIDw9IHNlbGYuU1RBUlRfQ09ERV9DOyBjb2RlKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4obm9ybWFsaXplZCwgc2VsZi5DT0RFX1BBVFRFUk5bY29kZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBiZXN0TWF0Y2guZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb2RlID0gY29kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiZXN0TWF0Y2guZXJyb3IgPCBzZWxmLkFWR19DT0RFX0VSUk9SKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5zdGFydCA9IGkgLSBzdW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IDQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbal0gPSBjb3VudGVyW2ogKyAyXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvdW50ZXJbNF0gPSAwO1xyXG4gICAgICAgICAgICAgICAgY291bnRlcls1XSA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zLS07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XHJcbiAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlLl9kZWNvZGUgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBzdGFydEluZm8gPSBzZWxmLl9maW5kU3RhcnQoKSxcclxuICAgICAgICBjb2RlID0gbnVsbCxcclxuICAgICAgICBkb25lID0gZmFsc2UsXHJcbiAgICAgICAgcmVzdWx0ID0gW10sXHJcbiAgICAgICAgbXVsdGlwbGllciA9IDAsXHJcbiAgICAgICAgY2hlY2tzdW0gPSAwLFxyXG4gICAgICAgIGNvZGVzZXQsXHJcbiAgICAgICAgcmF3UmVzdWx0ID0gW10sXHJcbiAgICAgICAgZGVjb2RlZENvZGVzID0gW10sXHJcbiAgICAgICAgc2hpZnROZXh0ID0gZmFsc2UsXHJcbiAgICAgICAgdW5zaGlmdCxcclxuICAgICAgICByZW1vdmVMYXN0Q2hhcmFjdGVyID0gdHJ1ZTtcclxuXHJcbiAgICBpZiAoc3RhcnRJbmZvID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjb2RlID0ge1xyXG4gICAgICAgIGNvZGU6IHN0YXJ0SW5mby5jb2RlLFxyXG4gICAgICAgIHN0YXJ0OiBzdGFydEluZm8uc3RhcnQsXHJcbiAgICAgICAgZW5kOiBzdGFydEluZm8uZW5kXHJcbiAgICB9O1xyXG4gICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XHJcbiAgICBjaGVja3N1bSA9IGNvZGUuY29kZTtcclxuICAgIHN3aXRjaCAoY29kZS5jb2RlKSB7XHJcbiAgICBjYXNlIHNlbGYuU1RBUlRfQ09ERV9BOlxyXG4gICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQTtcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2Ugc2VsZi5TVEFSVF9DT0RFX0I6XHJcbiAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9CO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBzZWxmLlNUQVJUX0NPREVfQzpcclxuICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0M7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHdoaWxlICghZG9uZSkge1xyXG4gICAgICAgIHVuc2hpZnQgPSBzaGlmdE5leHQ7XHJcbiAgICAgICAgc2hpZnROZXh0ID0gZmFsc2U7XHJcbiAgICAgICAgY29kZSA9IHNlbGYuX2RlY29kZUNvZGUoY29kZS5lbmQpO1xyXG4gICAgICAgIGlmIChjb2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgIT09IHNlbGYuU1RPUF9DT0RFKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVMYXN0Q2hhcmFjdGVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvZGUuY29kZSAhPT0gc2VsZi5TVE9QX0NPREUpIHtcclxuICAgICAgICAgICAgICAgIHJhd1Jlc3VsdC5wdXNoKGNvZGUuY29kZSk7XHJcbiAgICAgICAgICAgICAgICBtdWx0aXBsaWVyKys7XHJcbiAgICAgICAgICAgICAgICBjaGVja3N1bSArPSBtdWx0aXBsaWVyICogY29kZS5jb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChjb2Rlc2V0KSB7XHJcbiAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0E6XHJcbiAgICAgICAgICAgICAgICBpZiAoY29kZS5jb2RlIDwgNjQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKDMyICsgY29kZS5jb2RlKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvZGUuY29kZSA8IDk2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlLmNvZGUgLSA2NCkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29kZS5jb2RlICE9PSBzZWxmLlNUT1BfQ09ERSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVMYXN0Q2hhcmFjdGVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY29kZS5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfU0hJRlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0TmV4dCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9CO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9DOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5TVE9QX0NPREU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQjpcclxuICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgPCA5Nikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoMzIgKyBjb2RlLmNvZGUpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSAhPT0gc2VsZi5TVE9QX0NPREUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTGFzdENoYXJhY3RlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvZGUuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX1NISUZUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlmdE5leHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0E7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0E6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9DO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuU1RPUF9DT0RFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0M6XHJcbiAgICAgICAgICAgICAgICBpZiAoY29kZS5jb2RlIDwgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY29kZS5jb2RlIDwgMTAgPyBcIjBcIiArIGNvZGUuY29kZSA6IGNvZGUuY29kZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgIT09IHNlbGYuU1RPUF9DT0RFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUxhc3RDaGFyYWN0ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjb2RlLmNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9BOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0E7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0I6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLlNUT1BfQ09ERTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZG9uZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1bnNoaWZ0KSB7XHJcbiAgICAgICAgICAgIGNvZGVzZXQgPSBjb2Rlc2V0ID09PSBzZWxmLkNPREVfQSA/IHNlbGYuQ09ERV9CIDogc2VsZi5DT0RFX0E7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb2RlID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29kZS5lbmQgPSBzZWxmLl9uZXh0VW5zZXQoc2VsZi5fcm93LCBjb2RlLmVuZCk7XHJcbiAgICBpZiAoIXNlbGYuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZShjb2RlKSl7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tzdW0gLT0gbXVsdGlwbGllciAqIHJhd1Jlc3VsdFtyYXdSZXN1bHQubGVuZ3RoIC0gMV07XHJcbiAgICBpZiAoY2hlY2tzdW0gJSAxMDMgIT09IHJhd1Jlc3VsdFtyYXdSZXN1bHQubGVuZ3RoIC0gMV0pIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXJlc3VsdC5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyByZW1vdmUgbGFzdCBjb2RlIGZyb20gcmVzdWx0IChjaGVja3N1bSlcclxuICAgIGlmIChyZW1vdmVMYXN0Q2hhcmFjdGVyKSB7XHJcbiAgICAgICAgcmVzdWx0LnNwbGljZShyZXN1bHQubGVuZ3RoIC0gMSwgMSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogcmVzdWx0LmpvaW4oXCJcIiksXHJcbiAgICAgICAgc3RhcnQ6IHN0YXJ0SW5mby5zdGFydCxcclxuICAgICAgICBlbmQ6IGNvZGUuZW5kLFxyXG4gICAgICAgIGNvZGVzZXQ6IGNvZGVzZXQsXHJcbiAgICAgICAgc3RhcnRJbmZvOiBzdGFydEluZm8sXHJcbiAgICAgICAgZGVjb2RlZENvZGVzOiBkZWNvZGVkQ29kZXMsXHJcbiAgICAgICAgZW5kSW5mbzogY29kZVxyXG4gICAgfTtcclxufTtcclxuXHJcblxyXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlID0gZnVuY3Rpb24oZW5kSW5mbykge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZDtcclxuXHJcbiAgICB0cmFpbGluZ1doaXRlc3BhY2VFbmQgPSBlbmRJbmZvLmVuZCArICgoZW5kSW5mby5lbmQgLSBlbmRJbmZvLnN0YXJ0KSAvIDIpO1xyXG4gICAgaWYgKHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA8IHNlbGYuX3Jvdy5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoc2VsZi5fbWF0Y2hSYW5nZShlbmRJbmZvLmVuZCwgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kLCAwKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZW5kSW5mbztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvZGUxMjhSZWFkZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvZGVfMTI4X3JlYWRlci5qc1xuICoqLyIsImZ1bmN0aW9uIEJhcmNvZGVSZWFkZXIoY29uZmlnKSB7XHJcbiAgICB0aGlzLl9yb3cgPSBbXTtcclxuICAgIHRoaXMuY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9uZXh0VW5zZXQgPSBmdW5jdGlvbihsaW5lLCBzdGFydCkge1xyXG4gICAgdmFyIGk7XHJcblxyXG4gICAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzdGFydCA9IDA7XHJcbiAgICB9XHJcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIWxpbmVbaV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpbmUubGVuZ3RoO1xyXG59O1xyXG5cclxuQmFyY29kZVJlYWRlci5wcm90b3R5cGUuX21hdGNoUGF0dGVybiA9IGZ1bmN0aW9uKGNvdW50ZXIsIGNvZGUpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIGVycm9yID0gMCxcclxuICAgICAgICBzaW5nbGVFcnJvciA9IDAsXHJcbiAgICAgICAgbW9kdWxvID0gdGhpcy5NT0RVTE8sXHJcbiAgICAgICAgbWF4U2luZ2xlRXJyb3IgPSB0aGlzLlNJTkdMRV9DT0RFX0VSUk9SIHx8IDE7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBzaW5nbGVFcnJvciA9IE1hdGguYWJzKGNvZGVbaV0gLSBjb3VudGVyW2ldKTtcclxuICAgICAgICBpZiAoc2luZ2xlRXJyb3IgPiBtYXhTaW5nbGVFcnJvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyLk1BWF9WQUxVRTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXJyb3IgKz0gc2luZ2xlRXJyb3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXJyb3IgLyBtb2R1bG87XHJcbn07XHJcblxyXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbmV4dFNldCA9IGZ1bmN0aW9uKGxpbmUsIG9mZnNldCkge1xyXG4gICAgdmFyIGk7XHJcblxyXG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XHJcbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBsaW5lLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGxpbmVbaV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpbmUubGVuZ3RoO1xyXG59O1xyXG5cclxuQmFyY29kZVJlYWRlci5wcm90b3R5cGUuX25vcm1hbGl6ZSA9IGZ1bmN0aW9uKGNvdW50ZXIsIG1vZHVsbykge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgc3VtID0gMCxcclxuICAgICAgICByYXRpbyxcclxuICAgICAgICBudW1PbmVzID0gMCxcclxuICAgICAgICBub3JtYWxpemVkID0gW10sXHJcbiAgICAgICAgbm9ybSA9IDA7XHJcblxyXG4gICAgaWYgKCFtb2R1bG8pIHtcclxuICAgICAgICBtb2R1bG8gPSBzZWxmLk1PRFVMTztcclxuICAgIH1cclxuICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGNvdW50ZXJbaV0gPT09IDEpIHtcclxuICAgICAgICAgICAgbnVtT25lcysrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN1bSArPSBjb3VudGVyW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJhdGlvID0gc3VtIC8gKG1vZHVsbyAtIG51bU9uZXMpO1xyXG4gICAgaWYgKHJhdGlvID4gMS4wKSB7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbm9ybSA9IGNvdW50ZXJbaV0gPT09IDEgPyBjb3VudGVyW2ldIDogY291bnRlcltpXSAvIHJhdGlvO1xyXG4gICAgICAgICAgICBub3JtYWxpemVkLnB1c2gobm9ybSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByYXRpbyA9IChzdW0gKyBudW1PbmVzKSAvIG1vZHVsbztcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBub3JtID0gY291bnRlcltpXSAvIHJhdGlvO1xyXG4gICAgICAgICAgICBub3JtYWxpemVkLnB1c2gobm9ybSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZWQ7XHJcbn07XHJcblxyXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hUcmFjZSA9IGZ1bmN0aW9uKGNtcENvdW50ZXIsIGVwc2lsb24pIHtcclxuICAgIHZhciBjb3VudGVyID0gW10sXHJcbiAgICAgICAgaSxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3JvdyksXHJcbiAgICAgICAgaXNXaGl0ZSA9ICFzZWxmLl9yb3dbb2Zmc2V0XSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yO1xyXG5cclxuICAgIGlmIChjbXBDb3VudGVyKSB7XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBjbXBDb3VudGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXIucHVzaCgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xyXG4gICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKGNvdW50ZXIsIGNtcENvdW50ZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBlcHNpbG9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5zdGFydCA9IGkgLSBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guY291bnRlciA9IGNvdW50ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY291bnRlci5wdXNoKDApO1xyXG4gICAgICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcclxuICAgICAgICAgICAgICAgIGNvdW50ZXIucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xyXG4gICAgICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIGNtcENvdW50ZXIgd2FzIG5vdCBnaXZlblxyXG4gICAgYmVzdE1hdGNoLnN0YXJ0ID0gb2Zmc2V0O1xyXG4gICAgYmVzdE1hdGNoLmVuZCA9IHNlbGYuX3Jvdy5sZW5ndGggLSAxO1xyXG4gICAgYmVzdE1hdGNoLmNvdW50ZXIgPSBjb3VudGVyO1xyXG4gICAgcmV0dXJuIGJlc3RNYXRjaDtcclxufTtcclxuXHJcbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLmRlY29kZVBhdHRlcm4gPSBmdW5jdGlvbihwYXR0ZXJuKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgcmVzdWx0O1xyXG5cclxuICAgIHNlbGYuX3JvdyA9IHBhdHRlcm47XHJcbiAgICByZXN1bHQgPSBzZWxmLl9kZWNvZGUoKTtcclxuICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHtcclxuICAgICAgICBzZWxmLl9yb3cucmV2ZXJzZSgpO1xyXG4gICAgICAgIHJlc3VsdCA9IHNlbGYuX2RlY29kZSgpO1xyXG4gICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcmVzdWx0LmRpcmVjdGlvbiA9IEJhcmNvZGVSZWFkZXIuRElSRUNUSU9OLlJFVkVSU0U7XHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydCA9IHNlbGYuX3Jvdy5sZW5ndGggLSByZXN1bHQuc3RhcnQ7XHJcbiAgICAgICAgICAgIHJlc3VsdC5lbmQgPSBzZWxmLl9yb3cubGVuZ3RoIC0gcmVzdWx0LmVuZDtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdC5kaXJlY3Rpb24gPSBCYXJjb2RlUmVhZGVyLkRJUkVDVElPTi5GT1JXQVJEO1xyXG4gICAgfVxyXG4gICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgIHJlc3VsdC5mb3JtYXQgPSBzZWxmLkZPUk1BVDtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hSYW5nZSA9IGZ1bmN0aW9uKHN0YXJ0LCBlbmQsIHZhbHVlKSB7XHJcbiAgICB2YXIgaTtcclxuXHJcbiAgICBzdGFydCA9IHN0YXJ0IDwgMCA/IDAgOiBzdGFydDtcclxuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcy5fcm93W2ldICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fZmlsbENvdW50ZXJzID0gZnVuY3Rpb24ob2Zmc2V0LCBlbmQsIGlzV2hpdGUpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGNvdW50ZXJzID0gW107XHJcblxyXG4gICAgaXNXaGl0ZSA9ICh0eXBlb2YgaXNXaGl0ZSAhPT0gJ3VuZGVmaW5lZCcpID8gaXNXaGl0ZSA6IHRydWU7XHJcbiAgICBvZmZzZXQgPSAodHlwZW9mIG9mZnNldCAhPT0gJ3VuZGVmaW5lZCcpID8gb2Zmc2V0IDogc2VsZi5fbmV4dFVuc2V0KHNlbGYuX3Jvdyk7XHJcbiAgICBlbmQgPSBlbmQgfHwgc2VsZi5fcm93Lmxlbmd0aDtcclxuXHJcbiAgICBjb3VudGVyc1tjb3VudGVyUG9zXSA9IDA7XHJcbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBlbmQ7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJzW2NvdW50ZXJQb3NdKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY291bnRlclBvcysrO1xyXG4gICAgICAgICAgICBjb3VudGVyc1tjb3VudGVyUG9zXSA9IDE7XHJcbiAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY291bnRlcnM7XHJcbn07XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQmFyY29kZVJlYWRlci5wcm90b3R5cGUsIFwiRk9STUFUXCIsIHtcclxuICAgIHZhbHVlOiAndW5rbm93bicsXHJcbiAgICB3cml0ZWFibGU6IGZhbHNlXHJcbn0pO1xyXG5cclxuQmFyY29kZVJlYWRlci5ESVJFQ1RJT04gPSB7XHJcbiAgICBGT1JXQVJEOiAxLFxyXG4gICAgUkVWRVJTRTogLTFcclxufTtcclxuXHJcbkJhcmNvZGVSZWFkZXIuRXhjZXB0aW9uID0ge1xyXG4gICAgU3RhcnROb3RGb3VuZEV4Y2VwdGlvbjogXCJTdGFydC1JbmZvIHdhcyBub3QgZm91bmQhXCIsXHJcbiAgICBDb2RlTm90Rm91bmRFeGNlcHRpb246IFwiQ29kZSBjb3VsZCBub3QgYmUgZm91bmQhXCIsXHJcbiAgICBQYXR0ZXJuTm90Rm91bmRFeGNlcHRpb246IFwiUGF0dGVybiBjb3VsZCBub3QgYmUgZm91bmQhXCJcclxufTtcclxuXHJcbkJhcmNvZGVSZWFkZXIuQ09ORklHX0tFWVMgPSB7fTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhcmNvZGVSZWFkZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2JhcmNvZGVfcmVhZGVyLmpzXG4gKiovIiwiaW1wb3J0IEJhcmNvZGVSZWFkZXIgZnJvbSAnLi9iYXJjb2RlX3JlYWRlcic7XHJcblxyXG5mdW5jdGlvbiBFQU5SZWFkZXIob3B0cykge1xyXG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMsIG9wdHMpO1xyXG59XHJcblxyXG52YXIgcHJvcGVydGllcyA9IHtcclxuICAgIENPREVfTF9TVEFSVDoge3ZhbHVlOiAwfSxcclxuICAgIE1PRFVMTzoge3ZhbHVlOiA3fSxcclxuICAgIENPREVfR19TVEFSVDoge3ZhbHVlOiAxMH0sXHJcbiAgICBTVEFSVF9QQVRURVJOOiB7dmFsdWU6IFsxIC8gMyAqIDcsIDEgLyAzICogNywgMSAvIDMgKiA3XX0sXHJcbiAgICBTVE9QX1BBVFRFUk46IHt2YWx1ZTogWzEgLyAzICogNywgMSAvIDMgKiA3LCAxIC8gMyAqIDddfSxcclxuICAgIE1JRERMRV9QQVRURVJOOiB7dmFsdWU6IFsxIC8gNSAqIDcsIDEgLyA1ICogNywgMSAvIDUgKiA3LCAxIC8gNSAqIDcsIDEgLyA1ICogN119LFxyXG4gICAgQ09ERV9QQVRURVJOOiB7dmFsdWU6IFtcclxuICAgICAgICBbMywgMiwgMSwgMV0sXHJcbiAgICAgICAgWzIsIDIsIDIsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAyLCAyXSxcclxuICAgICAgICBbMSwgNCwgMSwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDMsIDJdLFxyXG4gICAgICAgIFsxLCAyLCAzLCAxXSxcclxuICAgICAgICBbMSwgMSwgMSwgNF0sXHJcbiAgICAgICAgWzEsIDMsIDEsIDJdLFxyXG4gICAgICAgIFsxLCAyLCAxLCAzXSxcclxuICAgICAgICBbMywgMSwgMSwgMl0sXHJcbiAgICAgICAgWzEsIDEsIDIsIDNdLFxyXG4gICAgICAgIFsxLCAyLCAyLCAyXSxcclxuICAgICAgICBbMiwgMiwgMSwgMl0sXHJcbiAgICAgICAgWzEsIDEsIDQsIDFdLFxyXG4gICAgICAgIFsyLCAzLCAxLCAxXSxcclxuICAgICAgICBbMSwgMywgMiwgMV0sXHJcbiAgICAgICAgWzQsIDEsIDEsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAzLCAxXSxcclxuICAgICAgICBbMywgMSwgMiwgMV0sXHJcbiAgICAgICAgWzIsIDEsIDEsIDNdXHJcbiAgICBdfSxcclxuICAgIENPREVfRlJFUVVFTkNZOiB7dmFsdWU6IFswLCAxMSwgMTMsIDE0LCAxOSwgMjUsIDI4LCAyMSwgMjIsIDI2XX0sXHJcbiAgICBTSU5HTEVfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjY3fSxcclxuICAgIEFWR19DT0RFX0VSUk9SOiB7dmFsdWU6IDAuMjd9LFxyXG4gICAgRk9STUFUOiB7dmFsdWU6IFwiZWFuXzEzXCIsIHdyaXRlYWJsZTogZmFsc2V9XHJcbn07XHJcblxyXG5FQU5SZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XHJcbkVBTlJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFQU5SZWFkZXI7XHJcblxyXG5FQU5SZWFkZXIucHJvdG90eXBlLl9kZWNvZGVDb2RlID0gZnVuY3Rpb24oc3RhcnQsIGNvZGVyYW5nZSkge1xyXG4gICAgdmFyIGNvdW50ZXIgPSBbMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgaSxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBvZmZzZXQgPSBzdGFydCxcclxuICAgICAgICBpc1doaXRlID0gIXNlbGYuX3Jvd1tvZmZzZXRdLFxyXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxyXG4gICAgICAgIGJlc3RNYXRjaCA9IHtcclxuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXHJcbiAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXHJcbiAgICAgICAgICAgIGVuZDogc3RhcnRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvZGUsXHJcbiAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgbm9ybWFsaXplZDtcclxuXHJcbiAgICBpZiAoIWNvZGVyYW5nZSkge1xyXG4gICAgICAgIGNvZGVyYW5nZSA9IHNlbGYuQ09ERV9QQVRURVJOLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBjb3VudGVyLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWQgPSBzZWxmLl9ub3JtYWxpemUoY291bnRlcik7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29kZSA9IDA7IGNvZGUgPCBjb2RlcmFuZ2U7IGNvZGUrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHNlbGYuX21hdGNoUGF0dGVybihub3JtYWxpemVkLCBzZWxmLkNPREVfUEFUVEVSTltjb2RlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciA8IGJlc3RNYXRjaC5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmNvZGUgPSBjb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVuZCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJlc3RNYXRjaC5lcnJvciA+IHNlbGYuQVZHX0NPREVfRVJST1IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XHJcbiAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbkVBTlJlYWRlci5wcm90b3R5cGUuX2ZpbmRQYXR0ZXJuID0gZnVuY3Rpb24ocGF0dGVybiwgb2Zmc2V0LCBpc1doaXRlLCB0cnlIYXJkZXIsIGVwc2lsb24pIHtcclxuICAgIHZhciBjb3VudGVyID0gW10sXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgaSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IDAsXHJcbiAgICAgICAgICAgIGVuZDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgaixcclxuICAgICAgICBzdW0sXHJcbiAgICAgICAgbm9ybWFsaXplZDtcclxuXHJcbiAgICBpZiAoIW9mZnNldCkge1xyXG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNXaGl0ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaXNXaGl0ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0cnlIYXJkZXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRyeUhhcmRlciA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCBlcHNpbG9uID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBlcHNpbG9uID0gc2VsZi5BVkdfQ09ERV9FUlJPUjtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IHBhdHRlcm4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb3VudGVyW2ldID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBjb3VudGVyLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHN1bSA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IGNvdW50ZXIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gY291bnRlcltqXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWQgPSBzZWxmLl9ub3JtYWxpemUoY291bnRlcik7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKG5vcm1hbGl6ZWQsIHBhdHRlcm4pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBlcHNpbG9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guc3RhcnQgPSBpIC0gc3VtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZW5kID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJlc3RNYXRjaDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodHJ5SGFyZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBjb3VudGVyLmxlbmd0aCAtIDI7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2pdID0gY291bnRlcltqICsgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlci5sZW5ndGggLSAyXSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyLmxlbmd0aCAtIDFdID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyUG9zLS07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xyXG4gICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5FQU5SZWFkZXIucHJvdG90eXBlLl9maW5kU3RhcnQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0LFxyXG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KSxcclxuICAgICAgICBzdGFydEluZm87XHJcblxyXG4gICAgd2hpbGUgKCFzdGFydEluZm8pIHtcclxuICAgICAgICBzdGFydEluZm8gPSBzZWxmLl9maW5kUGF0dGVybihzZWxmLlNUQVJUX1BBVFRFUk4sIG9mZnNldCk7XHJcbiAgICAgICAgaWYgKCFzdGFydEluZm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQgPSBzdGFydEluZm8uc3RhcnQgLSAoc3RhcnRJbmZvLmVuZCAtIHN0YXJ0SW5mby5zdGFydCk7XHJcbiAgICAgICAgaWYgKGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQgPj0gMCkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5fbWF0Y2hSYW5nZShsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0LCBzdGFydEluZm8uc3RhcnQsIDApKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhcnRJbmZvO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9mZnNldCA9IHN0YXJ0SW5mby5lbmQ7XHJcbiAgICAgICAgc3RhcnRJbmZvID0gbnVsbDtcclxuICAgIH1cclxufTtcclxuXHJcbkVBTlJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZSA9IGZ1bmN0aW9uKGVuZEluZm8pIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICB0cmFpbGluZ1doaXRlc3BhY2VFbmQ7XHJcblxyXG4gICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kID0gZW5kSW5mby5lbmQgKyAoZW5kSW5mby5lbmQgLSBlbmRJbmZvLnN0YXJ0KTtcclxuICAgIGlmICh0cmFpbGluZ1doaXRlc3BhY2VFbmQgPCBzZWxmLl9yb3cubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UoZW5kSW5mby5lbmQsIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCwgMCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVuZEluZm87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5FQU5SZWFkZXIucHJvdG90eXBlLl9maW5kRW5kID0gZnVuY3Rpb24ob2Zmc2V0LCBpc1doaXRlKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgZW5kSW5mbyA9IHNlbGYuX2ZpbmRQYXR0ZXJuKHNlbGYuU1RPUF9QQVRURVJOLCBvZmZzZXQsIGlzV2hpdGUsIGZhbHNlKTtcclxuXHJcbiAgICByZXR1cm4gZW5kSW5mbyAhPT0gbnVsbCA/IHNlbGYuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZShlbmRJbmZvKSA6IG51bGw7XHJcbn07XHJcblxyXG5FQU5SZWFkZXIucHJvdG90eXBlLl9jYWxjdWxhdGVGaXJzdERpZ2l0ID0gZnVuY3Rpb24oY29kZUZyZXF1ZW5jeSkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCBzZWxmLkNPREVfRlJFUVVFTkNZLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGNvZGVGcmVxdWVuY3kgPT09IHNlbGYuQ09ERV9GUkVRVUVOQ1lbaV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5FQU5SZWFkZXIucHJvdG90eXBlLl9kZWNvZGVQYXlsb2FkID0gZnVuY3Rpb24oY29kZSwgcmVzdWx0LCBkZWNvZGVkQ29kZXMpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGNvZGVGcmVxdWVuY3kgPSAweDAsXHJcbiAgICAgICAgZmlyc3REaWdpdDtcclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kKTtcclxuICAgICAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb2RlLmNvZGUgPj0gc2VsZi5DT0RFX0dfU1RBUlQpIHtcclxuICAgICAgICAgICAgY29kZS5jb2RlID0gY29kZS5jb2RlIC0gc2VsZi5DT0RFX0dfU1RBUlQ7XHJcbiAgICAgICAgICAgIGNvZGVGcmVxdWVuY3kgfD0gMSA8PCAoNSAtIGkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvZGVGcmVxdWVuY3kgfD0gMCA8PCAoNSAtIGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUpO1xyXG4gICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZpcnN0RGlnaXQgPSBzZWxmLl9jYWxjdWxhdGVGaXJzdERpZ2l0KGNvZGVGcmVxdWVuY3kpO1xyXG4gICAgaWYgKGZpcnN0RGlnaXQgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJlc3VsdC51bnNoaWZ0KGZpcnN0RGlnaXQpO1xyXG5cclxuICAgIGNvZGUgPSBzZWxmLl9maW5kUGF0dGVybihzZWxmLk1JRERMRV9QQVRURVJOLCBjb2RlLmVuZCwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgaWYgKGNvZGUgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAgICAgY29kZSA9IHNlbGYuX2RlY29kZUNvZGUoY29kZS5lbmQsIHNlbGYuQ09ERV9HX1NUQVJUKTtcclxuICAgICAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xyXG4gICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvZGU7XHJcbn07XHJcblxyXG5FQU5SZWFkZXIucHJvdG90eXBlLl9kZWNvZGUgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzdGFydEluZm8sXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgY29kZSxcclxuICAgICAgICByZXN1bHQgPSBbXSxcclxuICAgICAgICBkZWNvZGVkQ29kZXMgPSBbXTtcclxuXHJcbiAgICBzdGFydEluZm8gPSBzZWxmLl9maW5kU3RhcnQoKTtcclxuICAgIGlmICghc3RhcnRJbmZvKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjb2RlID0ge1xyXG4gICAgICAgIGNvZGU6IHN0YXJ0SW5mby5jb2RlLFxyXG4gICAgICAgIHN0YXJ0OiBzdGFydEluZm8uc3RhcnQsXHJcbiAgICAgICAgZW5kOiBzdGFydEluZm8uZW5kXHJcbiAgICB9O1xyXG4gICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XHJcbiAgICBjb2RlID0gc2VsZi5fZGVjb2RlUGF5bG9hZChjb2RlLCByZXN1bHQsIGRlY29kZWRDb2Rlcyk7XHJcbiAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvZGUgPSBzZWxmLl9maW5kRW5kKGNvZGUuZW5kLCBmYWxzZSk7XHJcbiAgICBpZiAoIWNvZGUpe1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xyXG5cclxuICAgIC8vIENoZWNrc3VtXHJcbiAgICBpZiAoIXNlbGYuX2NoZWNrc3VtKHJlc3VsdCkpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvZGU6IHJlc3VsdC5qb2luKFwiXCIpLFxyXG4gICAgICAgIHN0YXJ0OiBzdGFydEluZm8uc3RhcnQsXHJcbiAgICAgICAgZW5kOiBjb2RlLmVuZCxcclxuICAgICAgICBjb2Rlc2V0OiBcIlwiLFxyXG4gICAgICAgIHN0YXJ0SW5mbzogc3RhcnRJbmZvLFxyXG4gICAgICAgIGRlY29kZWRDb2RlczogZGVjb2RlZENvZGVzXHJcbiAgICB9O1xyXG59O1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZS5fY2hlY2tzdW0gPSBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgIHZhciBzdW0gPSAwLCBpO1xyXG5cclxuICAgIGZvciAoIGkgPSByZXN1bHQubGVuZ3RoIC0gMjsgaSA+PSAwOyBpIC09IDIpIHtcclxuICAgICAgICBzdW0gKz0gcmVzdWx0W2ldO1xyXG4gICAgfVxyXG4gICAgc3VtICo9IDM7XHJcbiAgICBmb3IgKCBpID0gcmVzdWx0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaSAtPSAyKSB7XHJcbiAgICAgICAgc3VtICs9IHJlc3VsdFtpXTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdW0gJSAxMCA9PT0gMDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChFQU5SZWFkZXIpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9lYW5fcmVhZGVyLmpzXG4gKiovIiwiaW1wb3J0IEJhcmNvZGVSZWFkZXIgZnJvbSAnLi9iYXJjb2RlX3JlYWRlcic7XHJcbmltcG9ydCBBcnJheUhlbHBlciBmcm9tICcuL2FycmF5X2hlbHBlcic7XHJcblxyXG5mdW5jdGlvbiBDb2RlMzlSZWFkZXIoKSB7XHJcbiAgICBCYXJjb2RlUmVhZGVyLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbnZhciBwcm9wZXJ0aWVzID0ge1xyXG4gICAgQUxQSEFCRVRIX1NUUklORzoge3ZhbHVlOiBcIjAxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWi0uICokLyslXCJ9LFxyXG4gICAgQUxQSEFCRVQ6IHt2YWx1ZTogWzQ4LCA0OSwgNTAsIDUxLCA1MiwgNTMsIDU0LCA1NSwgNTYsIDU3LCA2NSwgNjYsIDY3LCA2OCwgNjksIDcwLCA3MSwgNzIsIDczLCA3NCwgNzUsIDc2LCA3NywgNzgsXHJcbiAgICAgICAgNzksIDgwLCA4MSwgODIsIDgzLCA4NCwgODUsIDg2LCA4NywgODgsIDg5LCA5MCwgNDUsIDQ2LCAzMiwgNDIsIDM2LCA0NywgNDMsIDM3XX0sXHJcbiAgICBDSEFSQUNURVJfRU5DT0RJTkdTOiB7dmFsdWU6IFsweDAzNCwgMHgxMjEsIDB4MDYxLCAweDE2MCwgMHgwMzEsIDB4MTMwLCAweDA3MCwgMHgwMjUsIDB4MTI0LCAweDA2NCwgMHgxMDksIDB4MDQ5LFxyXG4gICAgICAgIDB4MTQ4LCAweDAxOSwgMHgxMTgsIDB4MDU4LCAweDAwRCwgMHgxMEMsIDB4MDRDLCAweDAxQywgMHgxMDMsIDB4MDQzLCAweDE0MiwgMHgwMTMsIDB4MTEyLCAweDA1MiwgMHgwMDcsIDB4MTA2LFxyXG4gICAgICAgIDB4MDQ2LCAweDAxNiwgMHgxODEsIDB4MEMxLCAweDFDMCwgMHgwOTEsIDB4MTkwLCAweDBEMCwgMHgwODUsIDB4MTg0LCAweDBDNCwgMHgwOTQsIDB4MEE4LCAweDBBMiwgMHgwOEEsIDB4MDJBXHJcbiAgICBdfSxcclxuICAgIEFTVEVSSVNLOiB7dmFsdWU6IDB4MDk0fSxcclxuICAgIEZPUk1BVDoge3ZhbHVlOiBcImNvZGVfMzlcIiwgd3JpdGVhYmxlOiBmYWxzZX1cclxufTtcclxuXHJcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcclxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvZGUzOVJlYWRlcjtcclxuXHJcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX3RvQ291bnRlcnMgPSBmdW5jdGlvbihzdGFydCwgY291bnRlcikge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIG51bUNvdW50ZXJzID0gY291bnRlci5sZW5ndGgsXHJcbiAgICAgICAgZW5kID0gc2VsZi5fcm93Lmxlbmd0aCxcclxuICAgICAgICBpc1doaXRlID0gIXNlbGYuX3Jvd1tzdGFydF0sXHJcbiAgICAgICAgaSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMDtcclxuXHJcbiAgICBBcnJheUhlbHBlci5pbml0KGNvdW50ZXIsIDApO1xyXG5cclxuICAgIGZvciAoIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcclxuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IG51bUNvdW50ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xyXG4gICAgICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb3VudGVyO1xyXG59O1xyXG5cclxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgY291bnRlcnMgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgcmVzdWx0ID0gW10sXHJcbiAgICAgICAgc3RhcnQgPSBzZWxmLl9maW5kU3RhcnQoKSxcclxuICAgICAgICBkZWNvZGVkQ2hhcixcclxuICAgICAgICBsYXN0U3RhcnQsXHJcbiAgICAgICAgcGF0dGVybixcclxuICAgICAgICBuZXh0U3RhcnQ7XHJcblxyXG4gICAgaWYgKCFzdGFydCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgbmV4dFN0YXJ0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3csIHN0YXJ0LmVuZCk7XHJcblxyXG4gICAgZG8ge1xyXG4gICAgICAgIGNvdW50ZXJzID0gc2VsZi5fdG9Db3VudGVycyhuZXh0U3RhcnQsIGNvdW50ZXJzKTtcclxuICAgICAgICBwYXR0ZXJuID0gc2VsZi5fdG9QYXR0ZXJuKGNvdW50ZXJzKTtcclxuICAgICAgICBpZiAocGF0dGVybiA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlY29kZWRDaGFyID0gc2VsZi5fcGF0dGVyblRvQ2hhcihwYXR0ZXJuKTtcclxuICAgICAgICBpZiAoZGVjb2RlZENoYXIgPCAwKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdC5wdXNoKGRlY29kZWRDaGFyKTtcclxuICAgICAgICBsYXN0U3RhcnQgPSBuZXh0U3RhcnQ7XHJcbiAgICAgICAgbmV4dFN0YXJ0ICs9IEFycmF5SGVscGVyLnN1bShjb3VudGVycyk7XHJcbiAgICAgICAgbmV4dFN0YXJ0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3csIG5leHRTdGFydCk7XHJcbiAgICB9IHdoaWxlIChkZWNvZGVkQ2hhciAhPT0gJyonKTtcclxuICAgIHJlc3VsdC5wb3AoKTtcclxuXHJcbiAgICBpZiAoIXJlc3VsdC5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXNlbGYuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZShsYXN0U3RhcnQsIG5leHRTdGFydCwgY291bnRlcnMpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcclxuICAgICAgICBzdGFydDogc3RhcnQuc3RhcnQsXHJcbiAgICAgICAgZW5kOiBuZXh0U3RhcnQsXHJcbiAgICAgICAgc3RhcnRJbmZvOiBzdGFydCxcclxuICAgICAgICBkZWNvZGVkQ29kZXM6IHJlc3VsdFxyXG4gICAgfTtcclxufTtcclxuXHJcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZSA9IGZ1bmN0aW9uKGxhc3RTdGFydCwgbmV4dFN0YXJ0LCBjb3VudGVycykge1xyXG4gICAgdmFyIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCxcclxuICAgICAgICBwYXR0ZXJuU2l6ZSA9IEFycmF5SGVscGVyLnN1bShjb3VudGVycyk7XHJcblxyXG4gICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kID0gbmV4dFN0YXJ0IC0gbGFzdFN0YXJ0IC0gcGF0dGVyblNpemU7XHJcbiAgICBpZiAoKHRyYWlsaW5nV2hpdGVzcGFjZUVuZCAqIDMpID49IHBhdHRlcm5TaXplKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl9wYXR0ZXJuVG9DaGFyID0gZnVuY3Rpb24ocGF0dGVybikge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHNlbGYuQ0hBUkFDVEVSX0VOQ09ESU5HUy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1NbaV0gPT09IHBhdHRlcm4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoc2VsZi5BTFBIQUJFVFtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG59O1xyXG5cclxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fZmluZE5leHRXaWR0aCA9IGZ1bmN0aW9uKGNvdW50ZXJzLCBjdXJyZW50KSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBtaW5XaWR0aCA9IE51bWJlci5NQVhfVkFMVUU7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGNvdW50ZXJzW2ldIDwgbWluV2lkdGggJiYgY291bnRlcnNbaV0gPiBjdXJyZW50KSB7XHJcbiAgICAgICAgICAgIG1pbldpZHRoID0gY291bnRlcnNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtaW5XaWR0aDtcclxufTtcclxuXHJcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX3RvUGF0dGVybiA9IGZ1bmN0aW9uKGNvdW50ZXJzKSB7XHJcbiAgICB2YXIgbnVtQ291bnRlcnMgPSBjb3VudGVycy5sZW5ndGgsXHJcbiAgICAgICAgbWF4TmFycm93V2lkdGggPSAwLFxyXG4gICAgICAgIG51bVdpZGVCYXJzID0gbnVtQ291bnRlcnMsXHJcbiAgICAgICAgd2lkZUJhcldpZHRoID0gMCxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBwYXR0ZXJuLFxyXG4gICAgICAgIGk7XHJcblxyXG4gICAgd2hpbGUgKG51bVdpZGVCYXJzID4gMykge1xyXG4gICAgICAgIG1heE5hcnJvd1dpZHRoID0gc2VsZi5fZmluZE5leHRXaWR0aChjb3VudGVycywgbWF4TmFycm93V2lkdGgpO1xyXG4gICAgICAgIG51bVdpZGVCYXJzID0gMDtcclxuICAgICAgICBwYXR0ZXJuID0gMDtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbnVtQ291bnRlcnM7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoY291bnRlcnNbaV0gPiBtYXhOYXJyb3dXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgcGF0dGVybiB8PSAxIDw8IChudW1Db3VudGVycyAtIDEgLSBpKTtcclxuICAgICAgICAgICAgICAgIG51bVdpZGVCYXJzKys7XHJcbiAgICAgICAgICAgICAgICB3aWRlQmFyV2lkdGggKz0gY291bnRlcnNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChudW1XaWRlQmFycyA9PT0gMykge1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbnVtQ291bnRlcnMgJiYgbnVtV2lkZUJhcnMgPiAwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb3VudGVyc1tpXSA+IG1heE5hcnJvd1dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtV2lkZUJhcnMtLTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGNvdW50ZXJzW2ldICogMikgPj0gd2lkZUJhcldpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHBhdHRlcm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG59O1xyXG5cclxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fZmluZFN0YXJ0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpLFxyXG4gICAgICAgIHBhdHRlcm5TdGFydCA9IG9mZnNldCxcclxuICAgICAgICBjb3VudGVyID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxyXG4gICAgICAgIGlzV2hpdGUgPSBmYWxzZSxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGosXHJcbiAgICAgICAgd2hpdGVTcGFjZU11c3RTdGFydDtcclxuXHJcbiAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBjb3VudGVyLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIC8vIGZpbmQgc3RhcnQgcGF0dGVyblxyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuX3RvUGF0dGVybihjb3VudGVyKSA9PT0gc2VsZi5BU1RFUklTSykge1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaXRlU3BhY2VNdXN0U3RhcnQgPSBNYXRoLmZsb29yKE1hdGgubWF4KDAsIHBhdHRlcm5TdGFydCAtICgoaSAtIHBhdHRlcm5TdGFydCkgLyA0KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKHdoaXRlU3BhY2VNdXN0U3RhcnQsIHBhdHRlcm5TdGFydCwgMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBwYXR0ZXJuU3RhcnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcGF0dGVyblN0YXJ0ICs9IGNvdW50ZXJbMF0gKyBjb3VudGVyWzFdO1xyXG4gICAgICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCA3OyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2pdID0gY291bnRlcltqICsgMl07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyWzddID0gMDtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJbOF0gPSAwO1xyXG4gICAgICAgICAgICAgICAgY291bnRlclBvcy0tO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xyXG4gICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb2RlMzlSZWFkZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvZGVfMzlfcmVhZGVyLmpzXG4gKiovIiwiaW1wb3J0IENvZGUzOVJlYWRlciBmcm9tICcuL2NvZGVfMzlfcmVhZGVyJztcclxuXHJcbmZ1bmN0aW9uIENvZGUzOVZJTlJlYWRlcigpIHtcclxuICAgIENvZGUzOVJlYWRlci5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG52YXIgcGF0dGVybnMgPSB7XHJcbiAgICBJT1E6IC9bSU9RXS9nLFxyXG4gICAgQVowOTogL1tBLVowLTldezE3fS9cclxufTtcclxuXHJcbkNvZGUzOVZJTlJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENvZGUzOVJlYWRlci5wcm90b3R5cGUpO1xyXG5Db2RlMzlWSU5SZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29kZTM5VklOUmVhZGVyO1xyXG5cclxuLy8gQ3JpYmJlZCBmcm9tOlxyXG4vLyBodHRwczovL2dpdGh1Yi5jb20venhpbmcvenhpbmcvYmxvYi9tYXN0ZXIvY29yZS9zcmMvbWFpbi9qYXZhL2NvbS9nb29nbGUvenhpbmcvY2xpZW50L3Jlc3VsdC9WSU5SZXN1bHRQYXJzZXIuamF2YVxyXG5Db2RlMzlWSU5SZWFkZXIucHJvdG90eXBlLl9kZWNvZGUgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciByZXN1bHQgPSBDb2RlMzlSZWFkZXIucHJvdG90eXBlLl9kZWNvZGUuYXBwbHkodGhpcyk7XHJcbiAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBjb2RlID0gcmVzdWx0LmNvZGU7XHJcblxyXG4gICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29kZSA9IGNvZGUucmVwbGFjZShwYXR0ZXJucy5JT1EsICcnKTtcclxuXHJcbiAgICBpZiAoIWNvZGUubWF0Y2gocGF0dGVybnMuQVowOSkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnRmFpbGVkIEFaMDkgcGF0dGVybiBjb2RlOicsIGNvZGUpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5fY2hlY2tDaGVja3N1bShjb2RlKSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc3VsdC5jb2RlID0gY29kZTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5Db2RlMzlWSU5SZWFkZXIucHJvdG90eXBlLl9jaGVja0NoZWNrc3VtID0gZnVuY3Rpb24oY29kZSkge1xyXG4gICAgLy8gVE9ET1xyXG4gICAgcmV0dXJuICEhY29kZTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvZGUzOVZJTlJlYWRlcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvY29kZV8zOV92aW5fcmVhZGVyLmpzXG4gKiovIiwiaW1wb3J0IEJhcmNvZGVSZWFkZXIgZnJvbSAnLi9iYXJjb2RlX3JlYWRlcic7XHJcblxyXG5mdW5jdGlvbiBDb2RhYmFyUmVhZGVyKCkge1xyXG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMpO1xyXG4gICAgdGhpcy5fY291bnRlcnMgPSBbXTtcclxufVxyXG5cclxudmFyIHByb3BlcnRpZXMgPSB7XHJcbiAgICBBTFBIQUJFVEhfU1RSSU5HOiB7dmFsdWU6IFwiMDEyMzQ1Njc4OS0kOi8uK0FCQ0RcIn0sXHJcbiAgICBBTFBIQUJFVDoge3ZhbHVlOiBbNDgsIDQ5LCA1MCwgNTEsIDUyLCA1MywgNTQsIDU1LCA1NiwgNTcsIDQ1LCAzNiwgNTgsIDQ3LCA0NiwgNDMsIDY1LCA2NiwgNjcsIDY4XX0sXHJcbiAgICBDSEFSQUNURVJfRU5DT0RJTkdTOiB7dmFsdWU6IFsweDAwMywgMHgwMDYsIDB4MDA5LCAweDA2MCwgMHgwMTIsIDB4MDQyLCAweDAyMSwgMHgwMjQsIDB4MDMwLCAweDA0OCwgMHgwMGMsIDB4MDE4LFxyXG4gICAgICAgIDB4MDQ1LCAweDA1MSwgMHgwNTQsIDB4MDE1LCAweDAxQSwgMHgwMjksIDB4MDBCLCAweDAwRV19LFxyXG4gICAgU1RBUlRfRU5EOiB7dmFsdWU6IFsweDAxQSwgMHgwMjksIDB4MDBCLCAweDAwRV19LFxyXG4gICAgTUlOX0VOQ09ERURfQ0hBUlM6IHt2YWx1ZTogNH0sXHJcbiAgICBNQVhfQUNDRVBUQUJMRToge3ZhbHVlOiAyLjB9LFxyXG4gICAgUEFERElORzoge3ZhbHVlOiAxLjV9LFxyXG4gICAgRk9STUFUOiB7dmFsdWU6IFwiY29kYWJhclwiLCB3cml0ZWFibGU6IGZhbHNlfVxyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb2RhYmFyUmVhZGVyO1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIHJlc3VsdCA9IFtdLFxyXG4gICAgICAgIHN0YXJ0LFxyXG4gICAgICAgIGRlY29kZWRDaGFyLFxyXG4gICAgICAgIHBhdHRlcm4sXHJcbiAgICAgICAgbmV4dFN0YXJ0LFxyXG4gICAgICAgIGVuZDtcclxuXHJcbiAgICB0aGlzLl9jb3VudGVycyA9IHNlbGYuX2ZpbGxDb3VudGVycygpO1xyXG4gICAgc3RhcnQgPSBzZWxmLl9maW5kU3RhcnQoKTtcclxuICAgIGlmICghc3RhcnQpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIG5leHRTdGFydCA9IHN0YXJ0LnN0YXJ0Q291bnRlcjtcclxuXHJcbiAgICBkbyB7XHJcbiAgICAgICAgcGF0dGVybiA9IHNlbGYuX3RvUGF0dGVybihuZXh0U3RhcnQpO1xyXG4gICAgICAgIGlmIChwYXR0ZXJuIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVjb2RlZENoYXIgPSBzZWxmLl9wYXR0ZXJuVG9DaGFyKHBhdHRlcm4pO1xyXG4gICAgICAgIGlmIChkZWNvZGVkQ2hhciA8IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0LnB1c2goZGVjb2RlZENoYXIpO1xyXG4gICAgICAgIG5leHRTdGFydCArPSA4O1xyXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMSAmJiBzZWxmLl9pc1N0YXJ0RW5kKHBhdHRlcm4pKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0gd2hpbGUgKG5leHRTdGFydCA8IHNlbGYuX2NvdW50ZXJzLmxlbmd0aCk7XHJcblxyXG4gICAgLy8gdmVyaWZ5IGVuZFxyXG4gICAgaWYgKChyZXN1bHQubGVuZ3RoIC0gMikgPCBzZWxmLk1JTl9FTkNPREVEX0NIQVJTIHx8ICFzZWxmLl9pc1N0YXJ0RW5kKHBhdHRlcm4pKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdmVyaWZ5IGVuZCB3aGl0ZSBzcGFjZVxyXG4gICAgaWYgKCFzZWxmLl92ZXJpZnlXaGl0ZXNwYWNlKHN0YXJ0LnN0YXJ0Q291bnRlciwgbmV4dFN0YXJ0IC0gOCkpe1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghc2VsZi5fdmFsaWRhdGVSZXN1bHQocmVzdWx0LCBzdGFydC5zdGFydENvdW50ZXIpKXtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBuZXh0U3RhcnQgPSBuZXh0U3RhcnQgPiBzZWxmLl9jb3VudGVycy5sZW5ndGggPyBzZWxmLl9jb3VudGVycy5sZW5ndGggOiBuZXh0U3RhcnQ7XHJcbiAgICBlbmQgPSBzdGFydC5zdGFydCArIHNlbGYuX3N1bUNvdW50ZXJzKHN0YXJ0LnN0YXJ0Q291bnRlciwgbmV4dFN0YXJ0IC0gOCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcclxuICAgICAgICBzdGFydDogc3RhcnQuc3RhcnQsXHJcbiAgICAgICAgZW5kOiBlbmQsXHJcbiAgICAgICAgc3RhcnRJbmZvOiBzdGFydCxcclxuICAgICAgICBkZWNvZGVkQ29kZXM6IHJlc3VsdFxyXG4gICAgfTtcclxufTtcclxuXHJcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlXaGl0ZXNwYWNlID0gZnVuY3Rpb24oc3RhcnRDb3VudGVyLCBlbmRDb3VudGVyKSB7XHJcbiAgICBpZiAoKHN0YXJ0Q291bnRlciAtIDEgPD0gMClcclxuICAgICAgICAgICAgfHwgdGhpcy5fY291bnRlcnNbc3RhcnRDb3VudGVyIC0gMV0gPj0gKHRoaXMuX2NhbGN1bGF0ZVBhdHRlcm5MZW5ndGgoc3RhcnRDb3VudGVyKSAvIDIuMCkpIHtcclxuICAgICAgICBpZiAoKGVuZENvdW50ZXIgKyA4ID49IHRoaXMuX2NvdW50ZXJzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHx8IHRoaXMuX2NvdW50ZXJzW2VuZENvdW50ZXIgKyA3XSA+PSAodGhpcy5fY2FsY3VsYXRlUGF0dGVybkxlbmd0aChlbmRDb3VudGVyKSAvIDIuMCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2NhbGN1bGF0ZVBhdHRlcm5MZW5ndGggPSBmdW5jdGlvbihvZmZzZXQpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIHN1bSA9IDA7XHJcblxyXG4gICAgZm9yIChpID0gb2Zmc2V0OyBpIDwgb2Zmc2V0ICsgNzsgaSsrKSB7XHJcbiAgICAgICAgc3VtICs9IHRoaXMuX2NvdW50ZXJzW2ldO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdW07XHJcbn07XHJcblxyXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fdGhyZXNob2xkUmVzdWx0UGF0dGVybiA9IGZ1bmN0aW9uKHJlc3VsdCwgc3RhcnRDb3VudGVyKXtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBjYXRlZ29yaXphdGlvbiA9IHtcclxuICAgICAgICAgICAgc3BhY2U6IHtcclxuICAgICAgICAgICAgICAgIG5hcnJvdzogeyBzaXplOiAwLCBjb3VudHM6IDAsIG1pbjogMCwgbWF4OiBOdW1iZXIuTUFYX1ZBTFVFfSxcclxuICAgICAgICAgICAgICAgIHdpZGU6IHtzaXplOiAwLCBjb3VudHM6IDAsIG1pbjogMCwgbWF4OiBOdW1iZXIuTUFYX1ZBTFVFfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBiYXI6IHtcclxuICAgICAgICAgICAgICAgIG5hcnJvdzogeyBzaXplOiAwLCBjb3VudHM6IDAsIG1pbjogMCwgbWF4OiBOdW1iZXIuTUFYX1ZBTFVFfSxcclxuICAgICAgICAgICAgICAgIHdpZGU6IHsgc2l6ZTogMCwgY291bnRzOiAwLCBtaW46IDAsIG1heDogTnVtYmVyLk1BWF9WQUxVRX1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAga2luZCxcclxuICAgICAgICBjYXQsXHJcbiAgICAgICAgaSxcclxuICAgICAgICBqLFxyXG4gICAgICAgIHBvcyA9IHN0YXJ0Q291bnRlcixcclxuICAgICAgICBwYXR0ZXJuO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIHBhdHRlcm4gPSBzZWxmLl9jaGFyVG9QYXR0ZXJuKHJlc3VsdFtpXSk7XHJcbiAgICAgICAgZm9yIChqID0gNjsgaiA+PSAwOyBqLS0pIHtcclxuICAgICAgICAgICAga2luZCA9IChqICYgMSkgPT09IDIgPyBjYXRlZ29yaXphdGlvbi5iYXIgOiBjYXRlZ29yaXphdGlvbi5zcGFjZTtcclxuICAgICAgICAgICAgY2F0ID0gKHBhdHRlcm4gJiAxKSA9PT0gMSA/IGtpbmQud2lkZSA6IGtpbmQubmFycm93O1xyXG4gICAgICAgICAgICBjYXQuc2l6ZSArPSBzZWxmLl9jb3VudGVyc1twb3MgKyBqXTtcclxuICAgICAgICAgICAgY2F0LmNvdW50cysrO1xyXG4gICAgICAgICAgICBwYXR0ZXJuID4+PSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwb3MgKz0gODtcclxuICAgIH1cclxuXHJcbiAgICBbXCJzcGFjZVwiLCBcImJhclwiXS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgIHZhciBuZXdraW5kID0gY2F0ZWdvcml6YXRpb25ba2V5XTtcclxuICAgICAgICBuZXdraW5kLndpZGUubWluID1cclxuICAgICAgICAgICAgTWF0aC5mbG9vcigobmV3a2luZC5uYXJyb3cuc2l6ZSAvIG5ld2tpbmQubmFycm93LmNvdW50cyArIG5ld2tpbmQud2lkZS5zaXplIC8gbmV3a2luZC53aWRlLmNvdW50cykgLyAyKTtcclxuICAgICAgICBuZXdraW5kLm5hcnJvdy5tYXggPSBNYXRoLmNlaWwobmV3a2luZC53aWRlLm1pbik7XHJcbiAgICAgICAgbmV3a2luZC53aWRlLm1heCA9IE1hdGguY2VpbCgobmV3a2luZC53aWRlLnNpemUgKiBzZWxmLk1BWF9BQ0NFUFRBQkxFICsgc2VsZi5QQURESU5HKSAvIG5ld2tpbmQud2lkZS5jb3VudHMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGNhdGVnb3JpemF0aW9uO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2NoYXJUb1BhdHRlcm4gPSBmdW5jdGlvbihjaGFyKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgY2hhckNvZGUgPSBjaGFyLmNoYXJDb2RlQXQoMCksXHJcbiAgICAgICAgaTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgc2VsZi5BTFBIQUJFVC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLkFMUEhBQkVUW2ldID09PSBjaGFyQ29kZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1NbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDB4MDtcclxufTtcclxuXHJcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl92YWxpZGF0ZVJlc3VsdCA9IGZ1bmN0aW9uKHJlc3VsdCwgc3RhcnRDb3VudGVyKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgdGhyZXNob2xkcyA9IHNlbGYuX3RocmVzaG9sZFJlc3VsdFBhdHRlcm4ocmVzdWx0LCBzdGFydENvdW50ZXIpLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgaixcclxuICAgICAgICBraW5kLFxyXG4gICAgICAgIGNhdCxcclxuICAgICAgICBzaXplLFxyXG4gICAgICAgIHBvcyA9IHN0YXJ0Q291bnRlcixcclxuICAgICAgICBwYXR0ZXJuO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwYXR0ZXJuID0gc2VsZi5fY2hhclRvUGF0dGVybihyZXN1bHRbaV0pO1xyXG4gICAgICAgIGZvciAoaiA9IDY7IGogPj0gMDsgai0tKSB7XHJcbiAgICAgICAgICAgIGtpbmQgPSAoaiAmIDEpID09PSAwID8gdGhyZXNob2xkcy5iYXIgOiB0aHJlc2hvbGRzLnNwYWNlO1xyXG4gICAgICAgICAgICBjYXQgPSAocGF0dGVybiAmIDEpID09PSAxID8ga2luZC53aWRlIDoga2luZC5uYXJyb3c7XHJcbiAgICAgICAgICAgIHNpemUgPSBzZWxmLl9jb3VudGVyc1twb3MgKyBqXTtcclxuICAgICAgICAgICAgaWYgKHNpemUgPCBjYXQubWluIHx8IHNpemUgPiBjYXQubWF4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGF0dGVybiA+Pj0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcG9zICs9IDg7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl9wYXR0ZXJuVG9DaGFyID0gZnVuY3Rpb24ocGF0dGVybikge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHNlbGYuQ0hBUkFDVEVSX0VOQ09ESU5HUy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1NbaV0gPT09IHBhdHRlcm4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoc2VsZi5BTFBIQUJFVFtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2NvbXB1dGVBbHRlcm5hdGluZ1RocmVzaG9sZCA9IGZ1bmN0aW9uKG9mZnNldCwgZW5kKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBtaW4gPSBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgIG1heCA9IDAsXHJcbiAgICAgICAgY291bnRlcjtcclxuXHJcbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBlbmQ7IGkgKz0gMil7XHJcbiAgICAgICAgY291bnRlciA9IHRoaXMuX2NvdW50ZXJzW2ldO1xyXG4gICAgICAgIGlmIChjb3VudGVyID4gbWF4KSB7XHJcbiAgICAgICAgICAgIG1heCA9IGNvdW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb3VudGVyIDwgbWluKSB7XHJcbiAgICAgICAgICAgIG1pbiA9IGNvdW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoKG1pbiArIG1heCkgLyAyLjApIHwgMDtcclxufTtcclxuXHJcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl90b1BhdHRlcm4gPSBmdW5jdGlvbihvZmZzZXQpIHtcclxuICAgIHZhciBudW1Db3VudGVycyA9IDcsXHJcbiAgICAgICAgZW5kID0gb2Zmc2V0ICsgbnVtQ291bnRlcnMsXHJcbiAgICAgICAgYmFyVGhyZXNob2xkLFxyXG4gICAgICAgIHNwYWNlVGhyZXNob2xkLFxyXG4gICAgICAgIGJpdG1hc2sgPSAxIDw8IChudW1Db3VudGVycyAtIDEpLFxyXG4gICAgICAgIHBhdHRlcm4gPSAwLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgdGhyZXNob2xkO1xyXG5cclxuICAgIGlmIChlbmQgPiB0aGlzLl9jb3VudGVycy5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgYmFyVGhyZXNob2xkID0gdGhpcy5fY29tcHV0ZUFsdGVybmF0aW5nVGhyZXNob2xkKG9mZnNldCwgZW5kKTtcclxuICAgIHNwYWNlVGhyZXNob2xkID0gdGhpcy5fY29tcHV0ZUFsdGVybmF0aW5nVGhyZXNob2xkKG9mZnNldCArIDEsIGVuZCk7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IG51bUNvdW50ZXJzOyBpKyspe1xyXG4gICAgICAgIHRocmVzaG9sZCA9IChpICYgMSkgPT09IDAgPyBiYXJUaHJlc2hvbGQgOiBzcGFjZVRocmVzaG9sZDtcclxuICAgICAgICBpZiAodGhpcy5fY291bnRlcnNbb2Zmc2V0ICsgaV0gPiB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgcGF0dGVybiB8PSBiaXRtYXNrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBiaXRtYXNrID4+PSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwYXR0ZXJuO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2lzU3RhcnRFbmQgPSBmdW5jdGlvbihwYXR0ZXJuKSB7XHJcbiAgICB2YXIgaTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5TVEFSVF9FTkQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcy5TVEFSVF9FTkRbaV0gPT09IHBhdHRlcm4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX3N1bUNvdW50ZXJzID0gZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc3VtID0gMDtcclxuXHJcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XHJcbiAgICAgICAgc3VtICs9IHRoaXMuX2NvdW50ZXJzW2ldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1bTtcclxufTtcclxuXHJcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl9maW5kU3RhcnQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBpLFxyXG4gICAgICAgIHBhdHRlcm4sXHJcbiAgICAgICAgc3RhcnQgPSBzZWxmLl9uZXh0VW5zZXQoc2VsZi5fcm93KSxcclxuICAgICAgICBlbmQ7XHJcblxyXG4gICAgZm9yIChpID0gMTsgaSA8IHRoaXMuX2NvdW50ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcGF0dGVybiA9IHNlbGYuX3RvUGF0dGVybihpKTtcclxuICAgICAgICBpZiAocGF0dGVybiAhPT0gLTEgJiYgc2VsZi5faXNTdGFydEVuZChwYXR0ZXJuKSkge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBMb29rIGZvciB3aGl0ZXNwYWNlIGFoZWFkXHJcbiAgICAgICAgICAgIHN0YXJ0ICs9IHNlbGYuX3N1bUNvdW50ZXJzKDAsIGkpO1xyXG4gICAgICAgICAgICBlbmQgPSBzdGFydCArIHNlbGYuX3N1bUNvdW50ZXJzKGksIGkgKyA4KTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcclxuICAgICAgICAgICAgICAgIGVuZDogZW5kLFxyXG4gICAgICAgICAgICAgICAgc3RhcnRDb3VudGVyOiBpLFxyXG4gICAgICAgICAgICAgICAgZW5kQ291bnRlcjogaSArIDhcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb2RhYmFyUmVhZGVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9jb2RhYmFyX3JlYWRlci5qc1xuICoqLyIsImltcG9ydCBFQU5SZWFkZXIgZnJvbSAnLi9lYW5fcmVhZGVyJztcclxuXHJcbmZ1bmN0aW9uIFVQQ1JlYWRlcigpIHtcclxuICAgIEVBTlJlYWRlci5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG52YXIgcHJvcGVydGllcyA9IHtcclxuICAgIEZPUk1BVDoge3ZhbHVlOiBcInVwY19hXCIsIHdyaXRlYWJsZTogZmFsc2V9XHJcbn07XHJcblxyXG5VUENSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFQU5SZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcclxuVVBDUmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFVQQ1JlYWRlcjtcclxuXHJcblVQQ1JlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHJlc3VsdCA9IEVBTlJlYWRlci5wcm90b3R5cGUuX2RlY29kZS5jYWxsKHRoaXMpO1xyXG5cclxuICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LmNvZGUgJiYgcmVzdWx0LmNvZGUubGVuZ3RoID09PSAxMyAmJiByZXN1bHQuY29kZS5jaGFyQXQoMCkgPT09IFwiMFwiKSB7XHJcbiAgICAgICAgcmVzdWx0LmNvZGUgPSByZXN1bHQuY29kZS5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVVBDUmVhZGVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy91cGNfcmVhZGVyLmpzXG4gKiovIiwiaW1wb3J0IEVBTlJlYWRlciBmcm9tICcuL2Vhbl9yZWFkZXInO1xyXG5cclxuZnVuY3Rpb24gRUFOOFJlYWRlcigpIHtcclxuICAgIEVBTlJlYWRlci5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG52YXIgcHJvcGVydGllcyA9IHtcclxuICAgIEZPUk1BVDoge3ZhbHVlOiBcImVhbl84XCIsIHdyaXRlYWJsZTogZmFsc2V9XHJcbn07XHJcblxyXG5FQU44UmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRUFOUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XHJcbkVBTjhSZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRUFOOFJlYWRlcjtcclxuXHJcbkVBTjhSZWFkZXIucHJvdG90eXBlLl9kZWNvZGVQYXlsb2FkID0gZnVuY3Rpb24oY29kZSwgcmVzdWx0LCBkZWNvZGVkQ29kZXMpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgY29kZSA9IHNlbGYuX2RlY29kZUNvZGUoY29kZS5lbmQsIHNlbGYuQ09ERV9HX1NUQVJUKTtcclxuICAgICAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSk7XHJcbiAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29kZSA9IHNlbGYuX2ZpbmRQYXR0ZXJuKHNlbGYuTUlERExFX1BBVFRFUk4sIGNvZGUuZW5kLCB0cnVlLCBmYWxzZSk7XHJcbiAgICBpZiAoY29kZSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb2RlLmVuZCwgc2VsZi5DT0RFX0dfU1RBUlQpO1xyXG4gICAgICAgIGlmICghY29kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XHJcbiAgICAgICAgcmVzdWx0LnB1c2goY29kZS5jb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29kZTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVBTjhSZWFkZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2Vhbl84X3JlYWRlci5qc1xuICoqLyIsImltcG9ydCBFQU5SZWFkZXIgZnJvbSAnLi9lYW5fcmVhZGVyJztcclxuXHJcbmZ1bmN0aW9uIFVQQ0VSZWFkZXIoKSB7XHJcbiAgICBFQU5SZWFkZXIuY2FsbCh0aGlzKTtcclxufVxyXG5cclxudmFyIHByb3BlcnRpZXMgPSB7XHJcbiAgICBDT0RFX0ZSRVFVRU5DWToge3ZhbHVlOiBbXHJcbiAgICAgICAgWyA1NiwgNTIsIDUwLCA0OSwgNDQsIDM4LCAzNSwgNDIsIDQxLCAzNyBdLFxyXG4gICAgICAgIFs3LCAxMSwgMTMsIDE0LCAxOSwgMjUsIDI4LCAyMSwgMjIsIDI2XV19LFxyXG4gICAgU1RPUF9QQVRURVJOOiB7IHZhbHVlOiBbMSAvIDYgKiA3LCAxIC8gNiAqIDcsIDEgLyA2ICogNywgMSAvIDYgKiA3LCAxIC8gNiAqIDcsIDEgLyA2ICogN119LFxyXG4gICAgRk9STUFUOiB7dmFsdWU6IFwidXBjX2VcIiwgd3JpdGVhYmxlOiBmYWxzZX1cclxufTtcclxuXHJcblVQQ0VSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFQU5SZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcclxuVVBDRVJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBVUENFUmVhZGVyO1xyXG5cclxuVVBDRVJlYWRlci5wcm90b3R5cGUuX2RlY29kZVBheWxvYWQgPSBmdW5jdGlvbihjb2RlLCByZXN1bHQsIGRlY29kZWRDb2Rlcykge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgY29kZUZyZXF1ZW5jeSA9IDB4MDtcclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kKTtcclxuICAgICAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb2RlLmNvZGUgPj0gc2VsZi5DT0RFX0dfU1RBUlQpIHtcclxuICAgICAgICAgICAgY29kZS5jb2RlID0gY29kZS5jb2RlIC0gc2VsZi5DT0RFX0dfU1RBUlQ7XHJcbiAgICAgICAgICAgIGNvZGVGcmVxdWVuY3kgfD0gMSA8PCAoNSAtIGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUpO1xyXG4gICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFzZWxmLl9kZXRlcm1pbmVQYXJpdHkoY29kZUZyZXF1ZW5jeSwgcmVzdWx0KSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb2RlO1xyXG59O1xyXG5cclxuVVBDRVJlYWRlci5wcm90b3R5cGUuX2RldGVybWluZVBhcml0eSA9IGZ1bmN0aW9uKGNvZGVGcmVxdWVuY3ksIHJlc3VsdCkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgbnJTeXN0ZW07XHJcblxyXG4gICAgZm9yIChuclN5c3RlbSA9IDA7IG5yU3lzdGVtIDwgdGhpcy5DT0RFX0ZSRVFVRU5DWS5sZW5ndGg7IG5yU3lzdGVtKyspe1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgdGhpcy5DT0RFX0ZSRVFVRU5DWVtuclN5c3RlbV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGNvZGVGcmVxdWVuY3kgPT09IHRoaXMuQ09ERV9GUkVRVUVOQ1lbbnJTeXN0ZW1dW2ldKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQudW5zaGlmdChuclN5c3RlbSk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuVVBDRVJlYWRlci5wcm90b3R5cGUuX2NvbnZlcnRUb1VQQ0EgPSBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgIHZhciB1cGNhID0gW3Jlc3VsdFswXV0sXHJcbiAgICAgICAgbGFzdERpZ2l0ID0gcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAyXTtcclxuXHJcbiAgICBpZiAobGFzdERpZ2l0IDw9IDIpIHtcclxuICAgICAgICB1cGNhID0gdXBjYS5jb25jYXQocmVzdWx0LnNsaWNlKDEsIDMpKVxyXG4gICAgICAgICAgICAuY29uY2F0KFtsYXN0RGlnaXQsIDAsIDAsIDAsIDBdKVxyXG4gICAgICAgICAgICAuY29uY2F0KHJlc3VsdC5zbGljZSgzLCA2KSk7XHJcbiAgICB9IGVsc2UgaWYgKGxhc3REaWdpdCA9PT0gMykge1xyXG4gICAgICAgIHVwY2EgPSB1cGNhLmNvbmNhdChyZXN1bHQuc2xpY2UoMSwgNCkpXHJcbiAgICAgICAgICAgIC5jb25jYXQoWzAsIDAsIDAsIDAsIDBdKVxyXG4gICAgICAgICAgICAuY29uY2F0KHJlc3VsdC5zbGljZSg0LCA2KSk7XHJcbiAgICB9IGVsc2UgaWYgKGxhc3REaWdpdCA9PT0gNCkge1xyXG4gICAgICAgIHVwY2EgPSB1cGNhLmNvbmNhdChyZXN1bHQuc2xpY2UoMSwgNSkpXHJcbiAgICAgICAgICAgIC5jb25jYXQoWzAsIDAsIDAsIDAsIDAsIHJlc3VsdFs1XV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB1cGNhID0gdXBjYS5jb25jYXQocmVzdWx0LnNsaWNlKDEsIDYpKVxyXG4gICAgICAgICAgICAuY29uY2F0KFswLCAwLCAwLCAwLCBsYXN0RGlnaXRdKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGNhLnB1c2gocmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXSk7XHJcbiAgICByZXR1cm4gdXBjYTtcclxufTtcclxuXHJcblVQQ0VSZWFkZXIucHJvdG90eXBlLl9jaGVja3N1bSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgcmV0dXJuIEVBTlJlYWRlci5wcm90b3R5cGUuX2NoZWNrc3VtLmNhbGwodGhpcywgdGhpcy5fY29udmVydFRvVVBDQShyZXN1bHQpKTtcclxufTtcclxuXHJcblVQQ0VSZWFkZXIucHJvdG90eXBlLl9maW5kRW5kID0gZnVuY3Rpb24ob2Zmc2V0LCBpc1doaXRlKSB7XHJcbiAgICBpc1doaXRlID0gdHJ1ZTtcclxuICAgIHJldHVybiBFQU5SZWFkZXIucHJvdG90eXBlLl9maW5kRW5kLmNhbGwodGhpcywgb2Zmc2V0LCBpc1doaXRlKTtcclxufTtcclxuXHJcblVQQ0VSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbihlbmRJbmZvKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kO1xyXG5cclxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IGVuZEluZm8uZW5kICsgKChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpIC8gMik7XHJcbiAgICBpZiAodHJhaWxpbmdXaGl0ZXNwYWNlRW5kIDwgc2VsZi5fcm93Lmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKGVuZEluZm8uZW5kLCB0cmFpbGluZ1doaXRlc3BhY2VFbmQsIDApKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVQQ0VSZWFkZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL3VwY19lX3JlYWRlci5qc1xuICoqLyIsImltcG9ydCBCYXJjb2RlUmVhZGVyIGZyb20gJy4vYmFyY29kZV9yZWFkZXInO1xyXG5jb25zdCBtZXJnZSA9IHJlcXVpcmUoJ2xvZGFzaC9vYmplY3QvbWVyZ2UnKTtcclxuXHJcbmZ1bmN0aW9uIEkyb2Y1UmVhZGVyKG9wdHMpIHtcclxuICAgIG9wdHMgPSBtZXJnZShnZXREZWZhdWxDb25maWcoKSwgb3B0cyk7XHJcbiAgICBCYXJjb2RlUmVhZGVyLmNhbGwodGhpcywgb3B0cyk7XHJcbiAgICB0aGlzLmJhclNwYWNlUmF0aW8gPSBbMSwgMV07XHJcbiAgICBpZiAob3B0cy5ub3JtYWxpemVCYXJTcGFjZVdpZHRoKSB7XHJcbiAgICAgICAgdGhpcy5TSU5HTEVfQ09ERV9FUlJPUiA9IDAuMzg7XHJcbiAgICAgICAgdGhpcy5BVkdfQ09ERV9FUlJPUiA9IDAuMDk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERlZmF1bENvbmZpZygpIHtcclxuICAgIHZhciBjb25maWcgPSB7fTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhJMm9mNVJlYWRlci5DT05GSUdfS0VZUykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICBjb25maWdba2V5XSA9IEkyb2Y1UmVhZGVyLkNPTkZJR19LRVlTW2tleV0uZGVmYXVsdDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNvbmZpZztcclxufVxyXG5cclxudmFyIE4gPSAxLFxyXG4gICAgVyA9IDMsXHJcbiAgICBwcm9wZXJ0aWVzID0ge1xyXG4gICAgICAgIE1PRFVMTzoge3ZhbHVlOiAxMH0sXHJcbiAgICAgICAgU1RBUlRfUEFUVEVSTjoge3ZhbHVlOiBbTiAqIDIuNSwgTiAqIDIuNSwgTiAqIDIuNSwgTiAqIDIuNV19LFxyXG4gICAgICAgIFNUT1BfUEFUVEVSTjoge3ZhbHVlOiBbTiAqIDIsIE4gKiAyLCBXICogMl19LFxyXG4gICAgICAgIENPREVfUEFUVEVSTjoge3ZhbHVlOiBbXHJcbiAgICAgICAgICAgIFtOLCBOLCBXLCBXLCBOXSxcclxuICAgICAgICAgICAgW1csIE4sIE4sIE4sIFddLFxyXG4gICAgICAgICAgICBbTiwgVywgTiwgTiwgV10sXHJcbiAgICAgICAgICAgIFtXLCBXLCBOLCBOLCBOXSxcclxuICAgICAgICAgICAgW04sIE4sIFcsIE4sIFddLFxyXG4gICAgICAgICAgICBbVywgTiwgVywgTiwgTl0sXHJcbiAgICAgICAgICAgIFtOLCBXLCBXLCBOLCBOXSxcclxuICAgICAgICAgICAgW04sIE4sIE4sIFcsIFddLFxyXG4gICAgICAgICAgICBbVywgTiwgTiwgVywgTl0sXHJcbiAgICAgICAgICAgIFtOLCBXLCBOLCBXLCBOXVxyXG4gICAgICAgIF19LFxyXG4gICAgICAgIFNJTkdMRV9DT0RFX0VSUk9SOiB7dmFsdWU6IDAuNzgsIHdyaXRhYmxlOiB0cnVlfSxcclxuICAgICAgICBBVkdfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjM4LCB3cml0YWJsZTogdHJ1ZX0sXHJcbiAgICAgICAgTUFYX0NPUlJFQ1RJT05fRkFDVE9SOiB7dmFsdWU6IDV9LFxyXG4gICAgICAgIEZPUk1BVDoge3ZhbHVlOiBcImkyb2Y1XCJ9XHJcbiAgICB9O1xyXG5cclxuSTJvZjVSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEkyb2Y1UmVhZGVyO1xyXG5cclxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9tYXRjaFBhdHRlcm4gPSBmdW5jdGlvbihjb3VudGVyLCBjb2RlKSB7XHJcbiAgICBpZiAodGhpcy5jb25maWcubm9ybWFsaXplQmFyU3BhY2VXaWR0aCkge1xyXG4gICAgICAgIHZhciBpLFxyXG4gICAgICAgICAgICBjb3VudGVyU3VtID0gWzAsIDBdLFxyXG4gICAgICAgICAgICBjb2RlU3VtID0gWzAsIDBdLFxyXG4gICAgICAgICAgICBjb3JyZWN0aW9uID0gWzAsIDBdLFxyXG4gICAgICAgICAgICBjb3JyZWN0aW9uUmF0aW8gPSB0aGlzLk1BWF9DT1JSRUNUSU9OX0ZBQ1RPUixcclxuICAgICAgICAgICAgY29ycmVjdGlvblJhdGlvSW52ZXJzZSA9IDEgLyBjb3JyZWN0aW9uUmF0aW87XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJTdW1baSAlIDJdICs9IGNvdW50ZXJbaV07XHJcbiAgICAgICAgICAgIGNvZGVTdW1baSAlIDJdICs9IGNvZGVbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvcnJlY3Rpb25bMF0gPSBjb2RlU3VtWzBdIC8gY291bnRlclN1bVswXTtcclxuICAgICAgICBjb3JyZWN0aW9uWzFdID0gY29kZVN1bVsxXSAvIGNvdW50ZXJTdW1bMV07XHJcblxyXG4gICAgICAgIGNvcnJlY3Rpb25bMF0gPSBNYXRoLm1heChNYXRoLm1pbihjb3JyZWN0aW9uWzBdLCBjb3JyZWN0aW9uUmF0aW8pLCBjb3JyZWN0aW9uUmF0aW9JbnZlcnNlKTtcclxuICAgICAgICBjb3JyZWN0aW9uWzFdID0gTWF0aC5tYXgoTWF0aC5taW4oY29ycmVjdGlvblsxXSwgY29ycmVjdGlvblJhdGlvKSwgY29ycmVjdGlvblJhdGlvSW52ZXJzZSk7XHJcbiAgICAgICAgdGhpcy5iYXJTcGFjZVJhdGlvID0gY29ycmVjdGlvbjtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb3VudGVyW2ldICo9IHRoaXMuYmFyU3BhY2VSYXRpb1tpICUgMl07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9tYXRjaFBhdHRlcm4uY2FsbCh0aGlzLCBjb3VudGVyLCBjb2RlKTtcclxufTtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fZmluZFBhdHRlcm4gPSBmdW5jdGlvbihwYXR0ZXJuLCBvZmZzZXQsIGlzV2hpdGUsIHRyeUhhcmRlcikge1xyXG4gICAgdmFyIGNvdW50ZXIgPSBbXSxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxyXG4gICAgICAgIGJlc3RNYXRjaCA9IHtcclxuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXHJcbiAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICBzdGFydDogMCxcclxuICAgICAgICAgICAgZW5kOiAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcixcclxuICAgICAgICBqLFxyXG4gICAgICAgIHN1bSxcclxuICAgICAgICBub3JtYWxpemVkLFxyXG4gICAgICAgIGVwc2lsb24gPSBzZWxmLkFWR19DT0RFX0VSUk9SO1xyXG5cclxuICAgIGlzV2hpdGUgPSBpc1doaXRlIHx8IGZhbHNlO1xyXG4gICAgdHJ5SGFyZGVyID0gdHJ5SGFyZGVyIHx8IGZhbHNlO1xyXG5cclxuICAgIGlmICghb2Zmc2V0KSB7XHJcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgcGF0dGVybi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvdW50ZXJbaV0gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgc3VtID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgY291bnRlci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBjb3VudGVyW2pdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZCA9IHNlbGYuX25vcm1hbGl6ZShjb3VudGVyKTtcclxuICAgICAgICAgICAgICAgIGlmIChub3JtYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4obm9ybWFsaXplZCwgcGF0dGVybik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciA8IGVwc2lsb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5zdGFydCA9IGkgLSBzdW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0cnlIYXJkZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgY291bnRlci5sZW5ndGggLSAyOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcltqXSA9IGNvdW50ZXJbaiArIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXIubGVuZ3RoIC0gMl0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlci5sZW5ndGggLSAxXSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlclBvcy0tO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9maW5kU3RhcnQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0LFxyXG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KSxcclxuICAgICAgICBzdGFydEluZm8sXHJcbiAgICAgICAgbmFycm93QmFyV2lkdGggPSAxO1xyXG5cclxuICAgIHdoaWxlICghc3RhcnRJbmZvKSB7XHJcbiAgICAgICAgc3RhcnRJbmZvID0gc2VsZi5fZmluZFBhdHRlcm4oc2VsZi5TVEFSVF9QQVRURVJOLCBvZmZzZXQsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICBpZiAoIXN0YXJ0SW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmFycm93QmFyV2lkdGggPSBNYXRoLmZsb29yKChzdGFydEluZm8uZW5kIC0gc3RhcnRJbmZvLnN0YXJ0KSAvIDQpO1xyXG4gICAgICAgIGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQgPSBzdGFydEluZm8uc3RhcnQgLSBuYXJyb3dCYXJXaWR0aCAqIDEwO1xyXG4gICAgICAgIGlmIChsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0ID49IDApIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UobGVhZGluZ1doaXRlc3BhY2VTdGFydCwgc3RhcnRJbmZvLnN0YXJ0LCAwKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXJ0SW5mbztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBvZmZzZXQgPSBzdGFydEluZm8uZW5kO1xyXG4gICAgICAgIHN0YXJ0SW5mbyA9IG51bGw7XHJcbiAgICB9XHJcbn07XHJcblxyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZSA9IGZ1bmN0aW9uKGVuZEluZm8pIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICB0cmFpbGluZ1doaXRlc3BhY2VFbmQ7XHJcblxyXG4gICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kID0gZW5kSW5mby5lbmQgKyAoKGVuZEluZm8uZW5kIC0gZW5kSW5mby5zdGFydCkgLyAyKTtcclxuICAgIGlmICh0cmFpbGluZ1doaXRlc3BhY2VFbmQgPCBzZWxmLl9yb3cubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UoZW5kSW5mby5lbmQsIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCwgMCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVuZEluZm87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2ZpbmRFbmQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBlbmRJbmZvLFxyXG4gICAgICAgIHRtcDtcclxuXHJcbiAgICBzZWxmLl9yb3cucmV2ZXJzZSgpO1xyXG4gICAgZW5kSW5mbyA9IHNlbGYuX2ZpbmRQYXR0ZXJuKHNlbGYuU1RPUF9QQVRURVJOKTtcclxuICAgIHNlbGYuX3Jvdy5yZXZlcnNlKCk7XHJcblxyXG4gICAgaWYgKGVuZEluZm8gPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyByZXZlcnNlIG51bWJlcnNcclxuICAgIHRtcCA9IGVuZEluZm8uc3RhcnQ7XHJcbiAgICBlbmRJbmZvLnN0YXJ0ID0gc2VsZi5fcm93Lmxlbmd0aCAtIGVuZEluZm8uZW5kO1xyXG4gICAgZW5kSW5mby5lbmQgPSBzZWxmLl9yb3cubGVuZ3RoIC0gdG1wO1xyXG5cclxuICAgIHJldHVybiBlbmRJbmZvICE9PSBudWxsID8gc2VsZi5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlKGVuZEluZm8pIDogbnVsbDtcclxufTtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlUGFpciA9IGZ1bmN0aW9uKGNvdW50ZXJQYWlyKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBjb2RlLFxyXG4gICAgICAgIGNvZGVzID0gW10sXHJcbiAgICAgICAgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXJQYWlyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29kZSA9IHNlbGYuX2RlY29kZUNvZGUoY291bnRlclBhaXJbaV0pO1xyXG4gICAgICAgIGlmICghY29kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29kZXMucHVzaChjb2RlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb2RlcztcclxufTtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlQ29kZSA9IGZ1bmN0aW9uKGNvdW50ZXIpIHtcclxuICAgIHZhciBqLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIHN1bSA9IDAsXHJcbiAgICAgICAgbm9ybWFsaXplZCxcclxuICAgICAgICBlcnJvcixcclxuICAgICAgICBlcHNpbG9uID0gc2VsZi5BVkdfQ09ERV9FUlJPUixcclxuICAgICAgICBjb2RlLFxyXG4gICAgICAgIGJlc3RNYXRjaCA9IHtcclxuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXHJcbiAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICBzdGFydDogMCxcclxuICAgICAgICAgICAgZW5kOiAwXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICBmb3IgKCBqID0gMDsgaiA8IGNvdW50ZXIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBzdW0gKz0gY291bnRlcltqXTtcclxuICAgIH1cclxuICAgIG5vcm1hbGl6ZWQgPSBzZWxmLl9ub3JtYWxpemUoY291bnRlcik7XHJcbiAgICBpZiAobm9ybWFsaXplZCkge1xyXG4gICAgICAgIGZvciAoY29kZSA9IDA7IGNvZGUgPCBzZWxmLkNPREVfUEFUVEVSTi5sZW5ndGg7IGNvZGUrKykge1xyXG4gICAgICAgICAgICBlcnJvciA9IHNlbGYuX21hdGNoUGF0dGVybihub3JtYWxpemVkLCBzZWxmLkNPREVfUEFUVEVSTltjb2RlXSk7XHJcbiAgICAgICAgICAgIGlmIChlcnJvciA8IGJlc3RNYXRjaC5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgYmVzdE1hdGNoLmNvZGUgPSBjb2RlO1xyXG4gICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJlc3RNYXRjaC5lcnJvciA8IGVwc2lsb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGJlc3RNYXRjaDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlUGF5bG9hZCA9IGZ1bmN0aW9uKGNvdW50ZXJzLCByZXN1bHQsIGRlY29kZWRDb2Rlcykge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgcG9zID0gMCxcclxuICAgICAgICBjb3VudGVyTGVuZ3RoID0gY291bnRlcnMubGVuZ3RoLFxyXG4gICAgICAgIGNvdW50ZXJQYWlyID0gW1swLCAwLCAwLCAwLCAwXSwgWzAsIDAsIDAsIDAsIDBdXSxcclxuICAgICAgICBjb2RlcztcclxuXHJcbiAgICB3aGlsZSAocG9zIDwgY291bnRlckxlbmd0aCkge1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgY291bnRlclBhaXJbMF1baV0gPSBjb3VudGVyc1twb3NdICogdGhpcy5iYXJTcGFjZVJhdGlvWzBdO1xyXG4gICAgICAgICAgICBjb3VudGVyUGFpclsxXVtpXSA9IGNvdW50ZXJzW3BvcyArIDFdICogdGhpcy5iYXJTcGFjZVJhdGlvWzFdO1xyXG4gICAgICAgICAgICBwb3MgKz0gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29kZXMgPSBzZWxmLl9kZWNvZGVQYWlyKGNvdW50ZXJQYWlyKTtcclxuICAgICAgICBpZiAoIWNvZGVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goY29kZXNbaV0uY29kZSArIFwiXCIpO1xyXG4gICAgICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2Rlc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvZGVzO1xyXG59O1xyXG5cclxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlDb3VudGVyTGVuZ3RoID0gZnVuY3Rpb24oY291bnRlcnMpIHtcclxuICAgIHJldHVybiAoY291bnRlcnMubGVuZ3RoICUgMTAgPT09IDApO1xyXG59O1xyXG5cclxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9kZWNvZGUgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzdGFydEluZm8sXHJcbiAgICAgICAgZW5kSW5mbyxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBjb2RlLFxyXG4gICAgICAgIHJlc3VsdCA9IFtdLFxyXG4gICAgICAgIGRlY29kZWRDb2RlcyA9IFtdLFxyXG4gICAgICAgIGNvdW50ZXJzO1xyXG5cclxuICAgIHN0YXJ0SW5mbyA9IHNlbGYuX2ZpbmRTdGFydCgpO1xyXG4gICAgaWYgKCFzdGFydEluZm8pIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGRlY29kZWRDb2Rlcy5wdXNoKHN0YXJ0SW5mbyk7XHJcblxyXG4gICAgZW5kSW5mbyA9IHNlbGYuX2ZpbmRFbmQoKTtcclxuICAgIGlmICghZW5kSW5mbykge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvdW50ZXJzID0gc2VsZi5fZmlsbENvdW50ZXJzKHN0YXJ0SW5mby5lbmQsIGVuZEluZm8uc3RhcnQsIGZhbHNlKTtcclxuICAgIGlmICghc2VsZi5fdmVyaWZ5Q291bnRlckxlbmd0aChjb3VudGVycykpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVQYXlsb2FkKGNvdW50ZXJzLCByZXN1bHQsIGRlY29kZWRDb2Rlcyk7XHJcbiAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGlmIChyZXN1bHQubGVuZ3RoICUgMiAhPT0gMCB8fFxyXG4gICAgICAgICAgICByZXN1bHQubGVuZ3RoIDwgNikge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGRlY29kZWRDb2Rlcy5wdXNoKGVuZEluZm8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcclxuICAgICAgICBzdGFydDogc3RhcnRJbmZvLnN0YXJ0LFxyXG4gICAgICAgIGVuZDogZW5kSW5mby5lbmQsXHJcbiAgICAgICAgc3RhcnRJbmZvOiBzdGFydEluZm8sXHJcbiAgICAgICAgZGVjb2RlZENvZGVzOiBkZWNvZGVkQ29kZXNcclxuICAgIH07XHJcbn07XHJcblxyXG5JMm9mNVJlYWRlci5DT05GSUdfS0VZUyA9IHtcclxuICAgIG5vcm1hbGl6ZUJhclNwYWNlV2lkdGg6IHtcclxuICAgICAgICAndHlwZSc6ICdib29sZWFuJyxcclxuICAgICAgICAnZGVmYXVsdCc6IGZhbHNlLFxyXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdJZiB0cnVlLCB0aGUgcmVhZGVyIHRyaWVzIHRvIG5vcm1hbGl6ZSB0aGUnICtcclxuICAgICAgICAnd2lkdGgtZGlmZmVyZW5jZSBiZXR3ZWVuIGJhcnMgYW5kIHNwYWNlcydcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEkyb2Y1UmVhZGVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9pMm9mNV9yZWFkZXIuanNcbiAqKi8iLCJ2YXIgYmFzZU1lcmdlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZU1lcmdlJyksXG4gICAgY3JlYXRlQXNzaWduZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9jcmVhdGVBc3NpZ25lcicpO1xuXG4vKipcbiAqIFJlY3Vyc2l2ZWx5IG1lcmdlcyBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIHRoZSBzb3VyY2Ugb2JqZWN0KHMpLCB0aGF0XG4gKiBkb24ndCByZXNvbHZlIHRvIGB1bmRlZmluZWRgIGludG8gdGhlIGRlc3RpbmF0aW9uIG9iamVjdC4gU3Vic2VxdWVudCBzb3VyY2VzXG4gKiBvdmVyd3JpdGUgcHJvcGVydHkgYXNzaWdubWVudHMgb2YgcHJldmlvdXMgc291cmNlcy4gSWYgYGN1c3RvbWl6ZXJgIGlzXG4gKiBwcm92aWRlZCBpdCdzIGludm9rZWQgdG8gcHJvZHVjZSB0aGUgbWVyZ2VkIHZhbHVlcyBvZiB0aGUgZGVzdGluYXRpb24gYW5kXG4gKiBzb3VyY2UgcHJvcGVydGllcy4gSWYgYGN1c3RvbWl6ZXJgIHJldHVybnMgYHVuZGVmaW5lZGAgbWVyZ2luZyBpcyBoYW5kbGVkXG4gKiBieSB0aGUgbWV0aG9kIGluc3RlYWQuIFRoZSBgY3VzdG9taXplcmAgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkXG4gKiB3aXRoIGZpdmUgYXJndW1lbnRzOiAob2JqZWN0VmFsdWUsIHNvdXJjZVZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHsuLi5PYmplY3R9IFtzb3VyY2VzXSBUaGUgc291cmNlIG9iamVjdHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBhc3NpZ25lZCB2YWx1ZXMuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGN1c3RvbWl6ZXJgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIHVzZXJzID0ge1xuICogICAnZGF0YSc6IFt7ICd1c2VyJzogJ2Jhcm5leScgfSwgeyAndXNlcic6ICdmcmVkJyB9XVxuICogfTtcbiAqXG4gKiB2YXIgYWdlcyA9IHtcbiAqICAgJ2RhdGEnOiBbeyAnYWdlJzogMzYgfSwgeyAnYWdlJzogNDAgfV1cbiAqIH07XG4gKlxuICogXy5tZXJnZSh1c2VycywgYWdlcyk7XG4gKiAvLyA9PiB7ICdkYXRhJzogW3sgJ3VzZXInOiAnYmFybmV5JywgJ2FnZSc6IDM2IH0sIHsgJ3VzZXInOiAnZnJlZCcsICdhZ2UnOiA0MCB9XSB9XG4gKlxuICogLy8gdXNpbmcgYSBjdXN0b21pemVyIGNhbGxiYWNrXG4gKiB2YXIgb2JqZWN0ID0ge1xuICogICAnZnJ1aXRzJzogWydhcHBsZSddLFxuICogICAndmVnZXRhYmxlcyc6IFsnYmVldCddXG4gKiB9O1xuICpcbiAqIHZhciBvdGhlciA9IHtcbiAqICAgJ2ZydWl0cyc6IFsnYmFuYW5hJ10sXG4gKiAgICd2ZWdldGFibGVzJzogWydjYXJyb3QnXVxuICogfTtcbiAqXG4gKiBfLm1lcmdlKG9iamVjdCwgb3RoZXIsIGZ1bmN0aW9uKGEsIGIpIHtcbiAqICAgaWYgKF8uaXNBcnJheShhKSkge1xuICogICAgIHJldHVybiBhLmNvbmNhdChiKTtcbiAqICAgfVxuICogfSk7XG4gKiAvLyA9PiB7ICdmcnVpdHMnOiBbJ2FwcGxlJywgJ2JhbmFuYSddLCAndmVnZXRhYmxlcyc6IFsnYmVldCcsICdjYXJyb3QnXSB9XG4gKi9cbnZhciBtZXJnZSA9IGNyZWF0ZUFzc2lnbmVyKGJhc2VNZXJnZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbWVyZ2U7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvb2JqZWN0L21lcmdlLmpzXG4gKiogbW9kdWxlIGlkID0gMjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhcnJheUVhY2ggPSByZXF1aXJlKCcuL2FycmF5RWFjaCcpLFxuICAgIGJhc2VNZXJnZURlZXAgPSByZXF1aXJlKCcuL2Jhc2VNZXJnZURlZXAnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0JyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzVHlwZWRBcnJheScpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5cycpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1lcmdlYCB3aXRob3V0IHN1cHBvcnQgZm9yIGFyZ3VtZW50IGp1Z2dsaW5nLFxuICogbXVsdGlwbGUgc291cmNlcywgYW5kIGB0aGlzYCBiaW5kaW5nIGBjdXN0b21pemVyYCBmdW5jdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBtZXJnZWQgdmFsdWVzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQT1bXV0gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2Ugb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0I9W11dIEFzc29jaWF0ZXMgdmFsdWVzIHdpdGggc291cmNlIGNvdW50ZXJwYXJ0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgY3VzdG9taXplciwgc3RhY2tBLCBzdGFja0IpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICB2YXIgaXNTcmNBcnIgPSBpc0FycmF5TGlrZShzb3VyY2UpICYmIChpc0FycmF5KHNvdXJjZSkgfHwgaXNUeXBlZEFycmF5KHNvdXJjZSkpLFxuICAgICAgcHJvcHMgPSBpc1NyY0FyciA/IHVuZGVmaW5lZCA6IGtleXMoc291cmNlKTtcblxuICBhcnJheUVhY2gocHJvcHMgfHwgc291cmNlLCBmdW5jdGlvbihzcmNWYWx1ZSwga2V5KSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICBrZXkgPSBzcmNWYWx1ZTtcbiAgICAgIHNyY1ZhbHVlID0gc291cmNlW2tleV07XG4gICAgfVxuICAgIGlmIChpc09iamVjdExpa2Uoc3JjVmFsdWUpKSB7XG4gICAgICBzdGFja0EgfHwgKHN0YWNrQSA9IFtdKTtcbiAgICAgIHN0YWNrQiB8fCAoc3RhY2tCID0gW10pO1xuICAgICAgYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBiYXNlTWVyZ2UsIGN1c3RvbWl6ZXIsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgICByZXN1bHQgPSBjdXN0b21pemVyID8gY3VzdG9taXplcih2YWx1ZSwgc3JjVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UpIDogdW5kZWZpbmVkLFxuICAgICAgICAgIGlzQ29tbW9uID0gcmVzdWx0ID09PSB1bmRlZmluZWQ7XG5cbiAgICAgIGlmIChpc0NvbW1vbikge1xuICAgICAgICByZXN1bHQgPSBzcmNWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGlmICgocmVzdWx0ICE9PSB1bmRlZmluZWQgfHwgKGlzU3JjQXJyICYmICEoa2V5IGluIG9iamVjdCkpKSAmJlxuICAgICAgICAgIChpc0NvbW1vbiB8fCAocmVzdWx0ID09PSByZXN1bHQgPyAocmVzdWx0ICE9PSB2YWx1ZSkgOiAodmFsdWUgPT09IHZhbHVlKSkpKSB7XG4gICAgICAgIG9iamVjdFtrZXldID0gcmVzdWx0O1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZU1lcmdlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2Jhc2VNZXJnZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5mb3JFYWNoYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2tcbiAqIHNob3J0aGFuZHMgYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheUVhY2goYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlFYWNoO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2FycmF5RWFjaC5qc1xuICoqIG1vZHVsZSBpZCA9IDI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYXJyYXlDb3B5ID0gcmVxdWlyZSgnLi9hcnJheUNvcHknKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyksXG4gICAgaXNQbGFpbk9iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNQbGFpbk9iamVjdCcpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNUeXBlZEFycmF5JyksXG4gICAgdG9QbGFpbk9iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvdG9QbGFpbk9iamVjdCcpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZU1lcmdlYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIG1lcmdlcyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBtZXJnZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIG1lcmdlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWVyZ2VGdW5jIFRoZSBmdW5jdGlvbiB0byBtZXJnZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBtZXJnZWQgdmFsdWVzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQT1bXV0gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2Ugb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0I9W11dIEFzc29jaWF0ZXMgdmFsdWVzIHdpdGggc291cmNlIGNvdW50ZXJwYXJ0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlTWVyZ2VEZWVwKG9iamVjdCwgc291cmNlLCBrZXksIG1lcmdlRnVuYywgY3VzdG9taXplciwgc3RhY2tBLCBzdGFja0IpIHtcbiAgdmFyIGxlbmd0aCA9IHN0YWNrQS5sZW5ndGgsXG4gICAgICBzcmNWYWx1ZSA9IHNvdXJjZVtrZXldO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChzdGFja0FbbGVuZ3RoXSA9PSBzcmNWYWx1ZSkge1xuICAgICAgb2JqZWN0W2tleV0gPSBzdGFja0JbbGVuZ3RoXTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgdmFyIHZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICByZXN1bHQgPSBjdXN0b21pemVyID8gY3VzdG9taXplcih2YWx1ZSwgc3JjVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UpIDogdW5kZWZpbmVkLFxuICAgICAgaXNDb21tb24gPSByZXN1bHQgPT09IHVuZGVmaW5lZDtcblxuICBpZiAoaXNDb21tb24pIHtcbiAgICByZXN1bHQgPSBzcmNWYWx1ZTtcbiAgICBpZiAoaXNBcnJheUxpa2Uoc3JjVmFsdWUpICYmIChpc0FycmF5KHNyY1ZhbHVlKSB8fCBpc1R5cGVkQXJyYXkoc3JjVmFsdWUpKSkge1xuICAgICAgcmVzdWx0ID0gaXNBcnJheSh2YWx1ZSlcbiAgICAgICAgPyB2YWx1ZVxuICAgICAgICA6IChpc0FycmF5TGlrZSh2YWx1ZSkgPyBhcnJheUNvcHkodmFsdWUpIDogW10pO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHNyY1ZhbHVlKSB8fCBpc0FyZ3VtZW50cyhzcmNWYWx1ZSkpIHtcbiAgICAgIHJlc3VsdCA9IGlzQXJndW1lbnRzKHZhbHVlKVxuICAgICAgICA/IHRvUGxhaW5PYmplY3QodmFsdWUpXG4gICAgICAgIDogKGlzUGxhaW5PYmplY3QodmFsdWUpID8gdmFsdWUgOiB7fSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgLy8gQWRkIHRoZSBzb3VyY2UgdmFsdWUgdG8gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzIGFuZCBhc3NvY2lhdGVcbiAgLy8gaXQgd2l0aCBpdHMgbWVyZ2VkIHZhbHVlLlxuICBzdGFja0EucHVzaChzcmNWYWx1ZSk7XG4gIHN0YWNrQi5wdXNoKHJlc3VsdCk7XG5cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgLy8gUmVjdXJzaXZlbHkgbWVyZ2Ugb2JqZWN0cyBhbmQgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgb2JqZWN0W2tleV0gPSBtZXJnZUZ1bmMocmVzdWx0LCBzcmNWYWx1ZSwgY3VzdG9taXplciwgc3RhY2tBLCBzdGFja0IpO1xuICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gcmVzdWx0ID8gKHJlc3VsdCAhPT0gdmFsdWUpIDogKHZhbHVlID09PSB2YWx1ZSkpIHtcbiAgICBvYmplY3Rba2V5XSA9IHJlc3VsdDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VNZXJnZURlZXA7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZU1lcmdlRGVlcC5qc1xuICoqIG1vZHVsZSBpZCA9IDI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIG9mIGBzb3VyY2VgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheT1bXV0gVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIHRvLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5Q29weShzb3VyY2UsIGFycmF5KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gc291cmNlLmxlbmd0aDtcblxuICBhcnJheSB8fCAoYXJyYXkgPSBBcnJheShsZW5ndGgpKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtpbmRleF0gPSBzb3VyY2VbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUNvcHk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvYXJyYXlDb3B5LmpzXG4gKiogbW9kdWxlIGlkID0gMzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzQXJyYXlMaWtlJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpICYmXG4gICAgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcmd1bWVudHM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvbGFuZy9pc0FyZ3VtZW50cy5qc1xuICoqIG1vZHVsZSBpZCA9IDMxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2V0TGVuZ3RoID0gcmVxdWlyZSgnLi9nZXRMZW5ndGgnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgoZ2V0TGVuZ3RoKHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheUxpa2U7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNBcnJheUxpa2UuanNcbiAqKiBtb2R1bGUgaWQgPSAzMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGJhc2VQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vYmFzZVByb3BlcnR5Jyk7XG5cbi8qKlxuICogR2V0cyB0aGUgXCJsZW5ndGhcIiBwcm9wZXJ0eSB2YWx1ZSBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGF2b2lkIGEgW0pJVCBidWddKGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI3OTIpXG4gKiB0aGF0IGFmZmVjdHMgU2FmYXJpIG9uIGF0IGxlYXN0IGlPUyA4LjEtOC4zIEFSTTY0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgXCJsZW5ndGhcIiB2YWx1ZS5cbiAqL1xudmFyIGdldExlbmd0aCA9IGJhc2VQcm9wZXJ0eSgnbGVuZ3RoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TGVuZ3RoO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2dldExlbmd0aC5qc1xuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VQcm9wZXJ0eTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlUHJvcGVydHkuanNcbiAqKiBtb2R1bGUgaWQgPSAzNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBVc2VkIGFzIHRoZSBbbWF4aW11bSBsZW5ndGhdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0xlbmd0aDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9pc0xlbmd0aC5qc1xuICoqIG1vZHVsZSBpZCA9IDM1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2lzT2JqZWN0TGlrZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvZ2V0TmF0aXZlJyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVJc0FycmF5ID0gZ2V0TmF0aXZlKEFycmF5LCAnaXNBcnJheScpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gbmF0aXZlSXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFycmF5VGFnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2xhbmcvaXNBcnJheS5qc1xuICoqIG1vZHVsZSBpZCA9IDM3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNOYXRpdmUgPSByZXF1aXJlKCcuLi9sYW5nL2lzTmF0aXZlJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICByZXR1cm4gaXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TmF0aXZlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2dldE5hdGl2ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaXNGdW5jdGlvbicpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSA+IDUpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZm5Ub1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZuVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZSgvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2csICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNOYXRpdmUoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNOYXRpdmUoXyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICByZXR1cm4gcmVJc05hdGl2ZS50ZXN0KGZuVG9TdHJpbmcuY2FsbCh2YWx1ZSkpO1xuICB9XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIHJlSXNIb3N0Q3Rvci50ZXN0KHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc05hdGl2ZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL2lzTmF0aXZlLmpzXG4gKiogbW9kdWxlIGlkID0gMzlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gb2xkZXIgdmVyc2lvbnMgb2YgQ2hyb21lIGFuZCBTYWZhcmkgd2hpY2ggcmV0dXJuICdmdW5jdGlvbicgZm9yIHJlZ2V4ZXNcbiAgLy8gYW5kIFNhZmFyaSA4IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGNvbnN0cnVjdG9ycy5cbiAgcmV0dXJuIGlzT2JqZWN0KHZhbHVlKSAmJiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBmdW5jVGFnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb247XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvbGFuZy9pc0Z1bmN0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gNDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIFtsYW5ndWFnZSB0eXBlXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3Q7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvbGFuZy9pc09iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDQxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYmFzZUZvckluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUZvckluJyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIHRoYXQgaXMsIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZVxuICogYE9iamVjdGAgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBgW1tQcm90b3R5cGVdXWAgb2YgYG51bGxgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBhc3N1bWVzIG9iamVjdHMgY3JlYXRlZCBieSB0aGUgYE9iamVjdGAgY29uc3RydWN0b3JcbiAqIGhhdmUgbm8gaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydGllcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChuZXcgRm9vKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdCh7ICd4JzogMCwgJ3knOiAwIH0pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICB2YXIgQ3RvcjtcblxuICAvLyBFeGl0IGVhcmx5IGZvciBub24gYE9iamVjdGAgb2JqZWN0cy5cbiAgaWYgKCEoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBvYmplY3RUYWcgJiYgIWlzQXJndW1lbnRzKHZhbHVlKSkgfHxcbiAgICAgICghaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NvbnN0cnVjdG9yJykgJiYgKEN0b3IgPSB2YWx1ZS5jb25zdHJ1Y3RvciwgdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiAhKEN0b3IgaW5zdGFuY2VvZiBDdG9yKSkpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIElFIDwgOSBpdGVyYXRlcyBpbmhlcml0ZWQgcHJvcGVydGllcyBiZWZvcmUgb3duIHByb3BlcnRpZXMuIElmIHRoZSBmaXJzdFxuICAvLyBpdGVyYXRlZCBwcm9wZXJ0eSBpcyBhbiBvYmplY3QncyBvd24gcHJvcGVydHkgdGhlbiB0aGVyZSBhcmUgbm8gaW5oZXJpdGVkXG4gIC8vIGVudW1lcmFibGUgcHJvcGVydGllcy5cbiAgdmFyIHJlc3VsdDtcbiAgLy8gSW4gbW9zdCBlbnZpcm9ubWVudHMgYW4gb2JqZWN0J3Mgb3duIHByb3BlcnRpZXMgYXJlIGl0ZXJhdGVkIGJlZm9yZVxuICAvLyBpdHMgaW5oZXJpdGVkIHByb3BlcnRpZXMuIElmIHRoZSBsYXN0IGl0ZXJhdGVkIHByb3BlcnR5IGlzIGFuIG9iamVjdCdzXG4gIC8vIG93biBwcm9wZXJ0eSB0aGVuIHRoZXJlIGFyZSBubyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICBiYXNlRm9ySW4odmFsdWUsIGZ1bmN0aW9uKHN1YlZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHQgPSBrZXk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0ID09PSB1bmRlZmluZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgcmVzdWx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1BsYWluT2JqZWN0O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2xhbmcvaXNQbGFpbk9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDQyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYmFzZUZvciA9IHJlcXVpcmUoJy4vYmFzZUZvcicpLFxuICAgIGtleXNJbiA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzSW4nKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JJbmAgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZvckluKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5c0luKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRm9ySW47XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZUZvckluLmpzXG4gKiogbW9kdWxlIGlkID0gNDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjcmVhdGVCYXNlRm9yID0gcmVxdWlyZSgnLi9jcmVhdGVCYXNlRm9yJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGJhc2VGb3JJbmAgYW5kIGBiYXNlRm9yT3duYCB3aGljaCBpdGVyYXRlc1xuICogb3ZlciBgb2JqZWN0YCBwcm9wZXJ0aWVzIHJldHVybmVkIGJ5IGBrZXlzRnVuY2AgaW52b2tpbmcgYGl0ZXJhdGVlYCBmb3JcbiAqIGVhY2ggcHJvcGVydHkuIEl0ZXJhdGVlIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb24gZWFybHkgYnkgZXhwbGljaXRseVxuICogcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbnZhciBiYXNlRm9yID0gY3JlYXRlQmFzZUZvcigpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGb3I7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZUZvci5qc1xuICoqIG1vZHVsZSBpZCA9IDQ0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL3RvT2JqZWN0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGJhc2UgZnVuY3Rpb24gZm9yIGBfLmZvckluYCBvciBgXy5mb3JJblJpZ2h0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVCYXNlRm9yKGZyb21SaWdodCkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0LCBpdGVyYXRlZSwga2V5c0Z1bmMpIHtcbiAgICB2YXIgaXRlcmFibGUgPSB0b09iamVjdChvYmplY3QpLFxuICAgICAgICBwcm9wcyA9IGtleXNGdW5jKG9iamVjdCksXG4gICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aCxcbiAgICAgICAgaW5kZXggPSBmcm9tUmlnaHQgPyBsZW5ndGggOiAtMTtcblxuICAgIHdoaWxlICgoZnJvbVJpZ2h0ID8gaW5kZXgtLSA6ICsraW5kZXggPCBsZW5ndGgpKSB7XG4gICAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2tleV0sIGtleSwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVCYXNlRm9yO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2NyZWF0ZUJhc2VGb3IuanNcbiAqKiBtb2R1bGUgaWQgPSA0NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYW4gb2JqZWN0IGlmIGl0J3Mgbm90IG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gdG9PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbHVlKSA/IHZhbHVlIDogT2JqZWN0KHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b09iamVjdDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC90b09iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDQ2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0luZGV4JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXNJbihuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJywgJ2MnXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICovXG5mdW5jdGlvbiBrZXlzSW4ob2JqZWN0KSB7XG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgfVxuICB2YXIgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDtcbiAgbGVuZ3RoID0gKGxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKSAmJiBsZW5ndGgpIHx8IDA7XG5cbiAgdmFyIEN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICBpbmRleCA9IC0xLFxuICAgICAgaXNQcm90byA9IHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUgPT09IG9iamVjdCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCksXG4gICAgICBza2lwSW5kZXhlcyA9IGxlbmd0aCA+IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gKGluZGV4ICsgJycpO1xuICB9XG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoIShza2lwSW5kZXhlcyAmJiBpc0luZGV4KGtleSwgbGVuZ3RoKSkgJiZcbiAgICAgICAgIShrZXkgPT0gJ2NvbnN0cnVjdG9yJyAmJiAoaXNQcm90byB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzSW47XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvb2JqZWN0L2tleXNJbi5qc1xuICoqIG1vZHVsZSBpZCA9IDQ3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXlxcZCskLztcblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBbbWF4aW11bSBsZW5ndGhdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICB2YWx1ZSA9ICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpID8gK3ZhbHVlIDogLTE7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGg7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJbmRleDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9pc0luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID0gdHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID0gdHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID0gdHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID0gdHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID0gdHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tvYmpUb1N0cmluZy5jYWxsKHZhbHVlKV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUeXBlZEFycmF5O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2xhbmcvaXNUeXBlZEFycmF5LmpzXG4gKiogbW9kdWxlIGlkID0gNDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiYXNlQ29weSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Jhc2VDb3B5JyksXG4gICAga2V5c0luID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXNJbicpO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBwbGFpbiBvYmplY3QgZmxhdHRlbmluZyBpbmhlcml0ZWQgZW51bWVyYWJsZVxuICogcHJvcGVydGllcyBvZiBgdmFsdWVgIHRvIG93biBwcm9wZXJ0aWVzIG9mIHRoZSBwbGFpbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY29udmVydGVkIHBsYWluIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgbmV3IEZvbyk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyIH1cbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBfLnRvUGxhaW5PYmplY3QobmV3IEZvbykpO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiwgJ2MnOiAzIH1cbiAqL1xuZnVuY3Rpb24gdG9QbGFpbk9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gYmFzZUNvcHkodmFsdWUsIGtleXNJbih2YWx1ZSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvUGxhaW5PYmplY3Q7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvbGFuZy90b1BsYWluT2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29waWVzIHByb3BlcnRpZXMgb2YgYHNvdXJjZWAgdG8gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBuYW1lcyB0byBjb3B5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIHRvLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUNvcHkoc291cmNlLCBwcm9wcywgb2JqZWN0KSB7XG4gIG9iamVjdCB8fCAob2JqZWN0ID0ge30pO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICBvYmplY3Rba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUNvcHk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZUNvcHkuanNcbiAqKiBtb2R1bGUgaWQgPSA1MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2dldE5hdGl2ZScpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNBcnJheUxpa2UnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKSxcbiAgICBzaGltS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3NoaW1LZXlzJyk7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IGdldE5hdGl2ZShPYmplY3QsICdrZXlzJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbnZhciBrZXlzID0gIW5hdGl2ZUtleXMgPyBzaGltS2V5cyA6IGZ1bmN0aW9uKG9iamVjdCkge1xuICB2YXIgQ3RvciA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0LmNvbnN0cnVjdG9yO1xuICBpZiAoKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUgPT09IG9iamVjdCkgfHxcbiAgICAgICh0eXBlb2Ygb2JqZWN0ICE9ICdmdW5jdGlvbicgJiYgaXNBcnJheUxpa2Uob2JqZWN0KSkpIHtcbiAgICByZXR1cm4gc2hpbUtleXMob2JqZWN0KTtcbiAgfVxuICByZXR1cm4gaXNPYmplY3Qob2JqZWN0KSA/IG5hdGl2ZUtleXMob2JqZWN0KSA6IFtdO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL29iamVjdC9rZXlzLmpzXG4gKiogbW9kdWxlIGlkID0gNTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4vaXNJbmRleCcpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpLFxuICAgIGtleXNJbiA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzSW4nKTtcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQSBmYWxsYmFjayBpbXBsZW1lbnRhdGlvbiBvZiBgT2JqZWN0LmtleXNgIHdoaWNoIGNyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlXG4gKiBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gc2hpbUtleXMob2JqZWN0KSB7XG4gIHZhciBwcm9wcyA9IGtleXNJbihvYmplY3QpLFxuICAgICAgcHJvcHNMZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBwcm9wc0xlbmd0aCAmJiBvYmplY3QubGVuZ3RoO1xuXG4gIHZhciBhbGxvd0luZGV4ZXMgPSAhIWxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgcHJvcHNMZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIGlmICgoYWxsb3dJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaGltS2V5cztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9zaGltS2V5cy5qc1xuICoqIG1vZHVsZSBpZCA9IDUzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYmluZENhbGxiYWNrID0gcmVxdWlyZSgnLi9iaW5kQ2FsbGJhY2snKSxcbiAgICBpc0l0ZXJhdGVlQ2FsbCA9IHJlcXVpcmUoJy4vaXNJdGVyYXRlZUNhbGwnKSxcbiAgICByZXN0UGFyYW0gPSByZXF1aXJlKCcuLi9mdW5jdGlvbi9yZXN0UGFyYW0nKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgYF8uYXNzaWduYCwgYF8uZGVmYXVsdHNgLCBvciBgXy5tZXJnZWAgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFzc2lnbmVyIFRoZSBmdW5jdGlvbiB0byBhc3NpZ24gdmFsdWVzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYXNzaWduZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUFzc2lnbmVyKGFzc2lnbmVyKSB7XG4gIHJldHVybiByZXN0UGFyYW0oZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2VzKSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IG9iamVjdCA9PSBudWxsID8gMCA6IHNvdXJjZXMubGVuZ3RoLFxuICAgICAgICBjdXN0b21pemVyID0gbGVuZ3RoID4gMiA/IHNvdXJjZXNbbGVuZ3RoIC0gMl0gOiB1bmRlZmluZWQsXG4gICAgICAgIGd1YXJkID0gbGVuZ3RoID4gMiA/IHNvdXJjZXNbMl0gOiB1bmRlZmluZWQsXG4gICAgICAgIHRoaXNBcmcgPSBsZW5ndGggPiAxID8gc291cmNlc1tsZW5ndGggLSAxXSA6IHVuZGVmaW5lZDtcblxuICAgIGlmICh0eXBlb2YgY3VzdG9taXplciA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjdXN0b21pemVyID0gYmluZENhbGxiYWNrKGN1c3RvbWl6ZXIsIHRoaXNBcmcsIDUpO1xuICAgICAgbGVuZ3RoIC09IDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSB0eXBlb2YgdGhpc0FyZyA9PSAnZnVuY3Rpb24nID8gdGhpc0FyZyA6IHVuZGVmaW5lZDtcbiAgICAgIGxlbmd0aCAtPSAoY3VzdG9taXplciA/IDEgOiAwKTtcbiAgICB9XG4gICAgaWYgKGd1YXJkICYmIGlzSXRlcmF0ZWVDYWxsKHNvdXJjZXNbMF0sIHNvdXJjZXNbMV0sIGd1YXJkKSkge1xuICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiBjdXN0b21pemVyO1xuICAgICAgbGVuZ3RoID0gMTtcbiAgICB9XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGN1c3RvbWl6ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVBc3NpZ25lcjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9jcmVhdGVBc3NpZ25lci5qc1xuICoqIG1vZHVsZSBpZCA9IDU0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaWRlbnRpdHkgPSByZXF1aXJlKCcuLi91dGlsaXR5L2lkZW50aXR5Jyk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlQ2FsbGJhY2tgIHdoaWNoIG9ubHkgc3VwcG9ydHMgYHRoaXNgIGJpbmRpbmdcbiAqIGFuZCBzcGVjaWZ5aW5nIHRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBiaW5kLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge251bWJlcn0gW2FyZ0NvdW50XSBUaGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FsbGJhY2suXG4gKi9cbmZ1bmN0aW9uIGJpbmRDYWxsYmFjayhmdW5jLCB0aGlzQXJnLCBhcmdDb3VudCkge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBpZGVudGl0eTtcbiAgfVxuICBpZiAodGhpc0FyZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZ1bmM7XG4gIH1cbiAgc3dpdGNoIChhcmdDb3VudCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH07XG4gICAgY2FzZSA0OiByZXR1cm4gZnVuY3Rpb24oYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICB9O1xuICAgIGNhc2UgNTogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBvdGhlciwga2V5LCBvYmplY3QsIHNvdXJjZSkge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgb3RoZXIsIGtleSwgb2JqZWN0LCBzb3VyY2UpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmluZENhbGxiYWNrO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2JpbmRDYWxsYmFjay5qc1xuICoqIG1vZHVsZSBpZCA9IDU1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IHByb3ZpZGVkIHRvIGl0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbGl0eVxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICpcbiAqIF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0O1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaWRlbnRpdHk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvdXRpbGl0eS9pZGVudGl0eS5qc1xuICoqIG1vZHVsZSBpZCA9IDU2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4vaXNJbmRleCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgcHJvdmlkZWQgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSB2YWx1ZSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gaW5kZXggVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBpbmRleCBvciBrZXkgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IG9iamVjdCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIG9iamVjdCBhcmd1bWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJ1xuICAgICAgPyAoaXNBcnJheUxpa2Uob2JqZWN0KSAmJiBpc0luZGV4KGluZGV4LCBvYmplY3QubGVuZ3RoKSlcbiAgICAgIDogKHR5cGUgPT0gJ3N0cmluZycgJiYgaW5kZXggaW4gb2JqZWN0KSkge1xuICAgIHZhciBvdGhlciA9IG9iamVjdFtpbmRleF07XG4gICAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSA/ICh2YWx1ZSA9PT0gb3RoZXIpIDogKG90aGVyICE9PSBvdGhlcik7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSXRlcmF0ZWVDYWxsO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2lzSXRlcmF0ZWVDYWxsLmpzXG4gKiogbW9kdWxlIGlkID0gNTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZVxuICogY3JlYXRlZCBmdW5jdGlvbiBhbmQgYXJndW1lbnRzIGZyb20gYHN0YXJ0YCBhbmQgYmV5b25kIHByb3ZpZGVkIGFzIGFuIGFycmF5LlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBiYXNlZCBvbiB0aGUgW3Jlc3QgcGFyYW1ldGVyXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvRnVuY3Rpb25zL3Jlc3RfcGFyYW1ldGVycykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYXBwbHkgYSByZXN0IHBhcmFtZXRlciB0by5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9ZnVuYy5sZW5ndGgtMV0gVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSByZXN0IHBhcmFtZXRlci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgc2F5ID0gXy5yZXN0UGFyYW0oZnVuY3Rpb24od2hhdCwgbmFtZXMpIHtcbiAqICAgcmV0dXJuIHdoYXQgKyAnICcgKyBfLmluaXRpYWwobmFtZXMpLmpvaW4oJywgJykgK1xuICogICAgIChfLnNpemUobmFtZXMpID4gMSA/ICcsICYgJyA6ICcnKSArIF8ubGFzdChuYW1lcyk7XG4gKiB9KTtcbiAqXG4gKiBzYXkoJ2hlbGxvJywgJ2ZyZWQnLCAnYmFybmV5JywgJ3BlYmJsZXMnKTtcbiAqIC8vID0+ICdoZWxsbyBmcmVkLCBiYXJuZXksICYgcGViYmxlcydcbiAqL1xuZnVuY3Rpb24gcmVzdFBhcmFtKGZ1bmMsIHN0YXJ0KSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6ICgrc3RhcnQgfHwgMCksIDApO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIHN0YXJ0LCAwKSxcbiAgICAgICAgcmVzdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgcmVzdFtpbmRleF0gPSBhcmdzW3N0YXJ0ICsgaW5kZXhdO1xuICAgIH1cbiAgICBzd2l0Y2ggKHN0YXJ0KSB7XG4gICAgICBjYXNlIDA6IHJldHVybiBmdW5jLmNhbGwodGhpcywgcmVzdCk7XG4gICAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpcywgYXJnc1swXSwgcmVzdCk7XG4gICAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpcywgYXJnc1swXSwgYXJnc1sxXSwgcmVzdCk7XG4gICAgfVxuICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgIGluZGV4ID0gLTE7XG4gICAgd2hpbGUgKCsraW5kZXggPCBzdGFydCkge1xuICAgICAgb3RoZXJBcmdzW2luZGV4XSA9IGFyZ3NbaW5kZXhdO1xuICAgIH1cbiAgICBvdGhlckFyZ3Nbc3RhcnRdID0gcmVzdDtcbiAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBvdGhlckFyZ3MpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc3RQYXJhbTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9mdW5jdGlvbi9yZXN0UGFyYW0uanNcbiAqKiBtb2R1bGUgaWQgPSA1OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgaW5wdXRTdHJlYW06IHtcclxuICAgICAgICBuYW1lOiBcIkxpdmVcIixcclxuICAgICAgICB0eXBlOiBcIkxpdmVTdHJlYW1cIixcclxuICAgICAgICBjb25zdHJhaW50czoge1xyXG4gICAgICAgICAgICB3aWR0aDogNjQwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDQ4MCxcclxuICAgICAgICAgICAgbWluQXNwZWN0UmF0aW86IDAsXHJcbiAgICAgICAgICAgIG1heEFzcGVjdFJhdGlvOiAxMDAsXHJcbiAgICAgICAgICAgIGZhY2luZzogXCJlbnZpcm9ubWVudFwiIC8vIG9yIHVzZXJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFyZWE6IHtcclxuICAgICAgICAgICAgdG9wOiBcIjAlXCIsXHJcbiAgICAgICAgICAgIHJpZ2h0OiBcIjAlXCIsXHJcbiAgICAgICAgICAgIGxlZnQ6IFwiMCVcIixcclxuICAgICAgICAgICAgYm90dG9tOiBcIjAlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNpbmdsZUNoYW5uZWw6IGZhbHNlIC8vIHRydWU6IG9ubHkgdGhlIHJlZCBjb2xvci1jaGFubmVsIGlzIHJlYWRcclxuICAgIH0sXHJcbiAgICBkZWJ1ZzogZmFsc2UsXHJcbiAgICBsb2NhdGU6IHRydWUsXHJcbiAgICBudW1PZldvcmtlcnM6IDQsXHJcbiAgICBkZWNvZGVyOiB7XHJcbiAgICAgICAgZHJhd0JvdW5kaW5nQm94OiBmYWxzZSxcclxuICAgICAgICBzaG93RnJlcXVlbmN5OiBmYWxzZSxcclxuICAgICAgICBkcmF3U2NhbmxpbmU6IGZhbHNlLFxyXG4gICAgICAgIHNob3dQYXR0ZXJuOiBmYWxzZSxcclxuICAgICAgICByZWFkZXJzOiBbXHJcbiAgICAgICAgICAgICdjb2RlXzEyOF9yZWFkZXInXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIGxvY2F0b3I6IHtcclxuICAgICAgICBoYWxmU2FtcGxlOiB0cnVlLFxyXG4gICAgICAgIHBhdGNoU2l6ZTogXCJtZWRpdW1cIiwgLy8geC1zbWFsbCwgc21hbGwsIG1lZGl1bSwgbGFyZ2UsIHgtbGFyZ2VcclxuICAgICAgICBzaG93Q2FudmFzOiBmYWxzZSxcclxuICAgICAgICBzaG93UGF0Y2hlczogZmFsc2UsXHJcbiAgICAgICAgc2hvd0ZvdW5kUGF0Y2hlczogZmFsc2UsXHJcbiAgICAgICAgc2hvd1NrZWxldG9uOiBmYWxzZSxcclxuICAgICAgICBzaG93TGFiZWxzOiBmYWxzZSxcclxuICAgICAgICBzaG93UGF0Y2hMYWJlbHM6IGZhbHNlLFxyXG4gICAgICAgIHNob3dSZW1haW5pbmdQYXRjaExhYmVsczogZmFsc2UsXHJcbiAgICAgICAgYm94RnJvbVBhdGNoZXM6IHtcclxuICAgICAgICAgICAgc2hvd1RyYW5zZm9ybWVkOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd1RyYW5zZm9ybWVkQm94OiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd0JCOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvY29uZmlnLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGV2ZW50cyA9IHt9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldEV2ZW50KGV2ZW50TmFtZSkge1xyXG4gICAgICAgIGlmICghZXZlbnRzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSB7XHJcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyczogW11cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50c1tldmVudE5hbWVdO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsZWFyRXZlbnRzKCl7XHJcbiAgICAgICAgZXZlbnRzID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHVibGlzaFN1YnNjcmlwdGlvbihzdWJzY3JpcHRpb24sIGRhdGEpIHtcclxuICAgICAgICBpZiAoc3Vic2NyaXB0aW9uLmFzeW5jKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24uY2FsbGJhY2soZGF0YSk7XHJcbiAgICAgICAgICAgIH0sIDQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5jYWxsYmFjayhkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3Vic2NyaWJlKGV2ZW50LCBjYWxsYmFjaywgYXN5bmMpIHtcclxuICAgICAgICB2YXIgc3Vic2NyaXB0aW9uO1xyXG5cclxuICAgICAgICBpZiAoIHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcclxuICAgICAgICAgICAgICAgIGFzeW5jOiBhc3luY1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IGNhbGxiYWNrO1xyXG4gICAgICAgICAgICBpZiAoIXN1YnNjcmlwdGlvbi5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJDYWxsYmFjayB3YXMgbm90IHNwZWNpZmllZCBvbiBvcHRpb25zXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldEV2ZW50KGV2ZW50KS5zdWJzY3JpYmVycy5wdXNoKHN1YnNjcmlwdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaywgYXN5bmMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1YnNjcmliZShldmVudCwgY2FsbGJhY2ssIGFzeW5jKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHB1Ymxpc2g6IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBnZXRFdmVudChldmVudE5hbWUpLFxyXG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlcnMgPSBldmVudC5zdWJzY3JpYmVycztcclxuXHJcbiAgICAgICAgICAgIGV2ZW50LnN1YnNjcmliZXJzID0gc3Vic2NyaWJlcnMuZmlsdGVyKGZ1bmN0aW9uKHN1YnNjcmliZXIpIHtcclxuICAgICAgICAgICAgICAgIHB1Ymxpc2hTdWJzY3JpcHRpb24oc3Vic2NyaWJlciwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIXN1YnNjcmliZXIub25jZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbmNlOiBmdW5jdGlvbihldmVudCwgY2FsbGJhY2ssIGFzeW5jKSB7XHJcbiAgICAgICAgICAgIHN1YnNjcmliZShldmVudCwge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IGFzeW5jLFxyXG4gICAgICAgICAgICAgICAgb25jZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbihldmVudE5hbWUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudDtcclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudE5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gZ2V0RXZlbnQoZXZlbnROYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudCAmJiBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN1YnNjcmliZXJzID0gZXZlbnQuc3Vic2NyaWJlcnMuZmlsdGVyKGZ1bmN0aW9uKHN1YnNjcmliZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3Vic2NyaWJlci5jYWxsYmFjayAhPT0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN1YnNjcmliZXJzID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckV2ZW50cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSkoKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvZXZlbnRzLmpzXG4gKiovIiwiY29uc3QgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L21lcmdlJyk7XHJcblxyXG52YXIgc3RyZWFtUmVmLFxyXG4gICAgbG9hZGVkRGF0YUhhbmRsZXI7XHJcblxyXG4vKipcclxuICogV3JhcHMgYnJvd3Nlci1zcGVjaWZpYyBnZXRVc2VyTWVkaWFcclxuICogQHBhcmFtIHtPYmplY3R9IGNvbnN0cmFpbnRzXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdWNjZXNzIENhbGxiYWNrXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBmYWlsdXJlIENhbGxiYWNrXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRVc2VyTWVkaWEoY29uc3RyYWludHMsIHN1Y2Nlc3MsIGZhaWx1cmUpIHtcclxuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzLCBmdW5jdGlvbiAoc3RyZWFtKSB7XHJcbiAgICAgICAgICAgIHN0cmVhbVJlZiA9IHN0cmVhbTtcclxuICAgICAgICAgICAgdmFyIHZpZGVvU3JjID0gKHdpbmRvdy5VUkwgJiYgd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKSkgfHwgc3RyZWFtO1xyXG4gICAgICAgICAgICBzdWNjZXNzLmFwcGx5KG51bGwsIFt2aWRlb1NyY10pO1xyXG4gICAgICAgIH0sIGZhaWx1cmUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBmYWlsdXJlKG5ldyBUeXBlRXJyb3IoXCJnZXRVc2VyTWVkaWEgbm90IGF2YWlsYWJsZVwiKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRlZERhdGEodmlkZW8sIGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgYXR0ZW1wdHMgPSAxMDtcclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja1ZpZGVvKCkge1xyXG4gICAgICAgIGlmIChhdHRlbXB0cyA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHZpZGVvLnZpZGVvV2lkdGggPiAwICYmIHZpZGVvLnZpZGVvSGVpZ2h0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codmlkZW8udmlkZW9XaWR0aCArIFwicHggeCBcIiArIHZpZGVvLnZpZGVvSGVpZ2h0ICsgXCJweFwiKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjaGVja1ZpZGVvLCA1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soJ1VuYWJsZSB0byBwbGF5IHZpZGVvIHN0cmVhbS4gSXMgd2ViY2FtIHdvcmtpbmc/Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF0dGVtcHRzLS07XHJcbiAgICB9XHJcbiAgICBjaGVja1ZpZGVvKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcmllcyB0byBhdHRhY2ggdGhlIGNhbWVyYS1zdHJlYW0gdG8gYSBnaXZlbiB2aWRlby1lbGVtZW50XHJcbiAqIGFuZCBjYWxscyB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gd2hlbiB0aGUgY29udGVudCBpcyByZWFkeVxyXG4gKiBAcGFyYW0ge09iamVjdH0gY29uc3RyYWludHNcclxuICogQHBhcmFtIHtPYmplY3R9IHZpZGVvXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjYWxsYmFja1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdENhbWVyYShjb25zdHJhaW50cywgdmlkZW8sIGNhbGxiYWNrKSB7XHJcbiAgICBnZXRVc2VyTWVkaWEoY29uc3RyYWludHMsIGZ1bmN0aW9uKHNyYykge1xyXG4gICAgICAgIHZpZGVvLnNyYyA9IHNyYztcclxuICAgICAgICBpZiAobG9hZGVkRGF0YUhhbmRsZXIpIHtcclxuICAgICAgICAgICAgdmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRlZGRhdGFcIiwgbG9hZGVkRGF0YUhhbmRsZXIsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9hZGVkRGF0YUhhbmRsZXIgPSBsb2FkZWREYXRhLmJpbmQobnVsbCwgdmlkZW8sIGNhbGxiYWNrKTtcclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRkYXRhJywgbG9hZGVkRGF0YUhhbmRsZXIsIGZhbHNlKTtcclxuICAgICAgICB2aWRlby5wbGF5KCk7XHJcbiAgICB9LCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY2FsbGJhY2soZSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE5vcm1hbGl6ZXMgdGhlIGluY29taW5nIGNvbnN0cmFpbnRzIHRvIHNhdGlzZnkgdGhlIGN1cnJlbnQgYnJvd3NlclxyXG4gKiBAcGFyYW0gY29uZmlnXHJcbiAqIEBwYXJhbSBjYiBDYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbmV2ZXIgY29uc3RyYWludHMgYXJlIGNyZWF0ZWRcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5mdW5jdGlvbiBub3JtYWxpemVDb25zdHJhaW50cyhjb25maWcsIGNiKSB7XHJcbiAgICB2YXIgY29uc3RyYWludHMgPSB7XHJcbiAgICAgICAgICAgIGF1ZGlvOiBmYWxzZSxcclxuICAgICAgICAgICAgdmlkZW86IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHZpZGVvQ29uc3RyYWludHMgPSBtZXJnZSh7XHJcbiAgICAgICAgICAgIHdpZHRoOiA2NDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogNDgwLFxyXG4gICAgICAgICAgICBtaW5Bc3BlY3RSYXRpbzogMCxcclxuICAgICAgICAgICAgbWF4QXNwZWN0UmF0aW86IDEwMCxcclxuICAgICAgICAgICAgZmFjaW5nOiBcImVudmlyb25tZW50XCJcclxuICAgICAgICB9LCBjb25maWcpO1xyXG5cclxuICAgIGlmICggdHlwZW9mIE1lZGlhU3RyZWFtVHJhY2sgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBNZWRpYVN0cmVhbVRyYWNrLmdldFNvdXJjZXMgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgTWVkaWFTdHJlYW1UcmFjay5nZXRTb3VyY2VzKGZ1bmN0aW9uKHNvdXJjZUluZm9zKSB7XHJcbiAgICAgICAgICAgIHZhciB2aWRlb1NvdXJjZUlkO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZUluZm9zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc291cmNlSW5mbyA9IHNvdXJjZUluZm9zW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZUluZm8ua2luZCA9PT0gXCJ2aWRlb1wiICYmIHNvdXJjZUluZm8uZmFjaW5nID09PSB2aWRlb0NvbnN0cmFpbnRzLmZhY2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZGVvU291cmNlSWQgPSBzb3VyY2VJbmZvLmlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0ge1xyXG4gICAgICAgICAgICAgICAgbWFuZGF0b3J5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluV2lkdGg6IHZpZGVvQ29uc3RyYWludHMud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluSGVpZ2h0OiB2aWRlb0NvbnN0cmFpbnRzLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICBtaW5Bc3BlY3RSYXRpbzogdmlkZW9Db25zdHJhaW50cy5taW5Bc3BlY3RSYXRpbyxcclxuICAgICAgICAgICAgICAgICAgICBtYXhBc3BlY3RSYXRpbzogdmlkZW9Db25zdHJhaW50cy5tYXhBc3BlY3RSYXRpb1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9wdGlvbmFsOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUlkOiB2aWRlb1NvdXJjZUlkXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gY2IoY29uc3RyYWludHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdHJhaW50cy52aWRlbyA9IHtcclxuICAgICAgICAgICAgbWVkaWFTb3VyY2U6IFwiY2FtZXJhXCIsXHJcbiAgICAgICAgICAgIHdpZHRoOiB7IG1pbjogdmlkZW9Db25zdHJhaW50cy53aWR0aCwgbWF4OiB2aWRlb0NvbnN0cmFpbnRzLndpZHRoIH0sXHJcbiAgICAgICAgICAgIGhlaWdodDogeyBtaW46IHZpZGVvQ29uc3RyYWludHMuaGVpZ2h0LCBtYXg6IHZpZGVvQ29uc3RyYWludHMuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgIHJlcXVpcmU6IFtcIndpZHRoXCIsIFwiaGVpZ2h0XCJdXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gY2IoY29uc3RyYWludHMpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVxdWVzdHMgdGhlIGJhY2stZmFjaW5nIGNhbWVyYSBvZiB0aGUgdXNlci4gVGhlIGNhbGxiYWNrIGlzIGNhbGxlZFxyXG4gKiB3aGVuZXZlciB0aGUgc3RyZWFtIGlzIHJlYWR5IHRvIGJlIGNvbnN1bWVkLCBvciBpZiBhbiBlcnJvciBvY2N1cmVzLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdmlkZW9cclxuICogQHBhcmFtIHtPYmplY3R9IGNhbGxiYWNrXHJcbiAqL1xyXG5mdW5jdGlvbiByZXF1ZXN0KHZpZGVvLCB2aWRlb0NvbnN0cmFpbnRzLCBjYWxsYmFjaykge1xyXG4gICAgbm9ybWFsaXplQ29uc3RyYWludHModmlkZW9Db25zdHJhaW50cywgZnVuY3Rpb24oY29uc3RyYWludHMpIHtcclxuICAgICAgICBpbml0Q2FtZXJhKGNvbnN0cmFpbnRzLCB2aWRlbywgY2FsbGJhY2spO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHJlcXVlc3Q6IGZ1bmN0aW9uKHZpZGVvLCBjb25zdHJhaW50cywgY2FsbGJhY2spIHtcclxuICAgICAgICByZXF1ZXN0KHZpZGVvLCBjb25zdHJhaW50cywgY2FsbGJhY2spO1xyXG4gICAgfSxcclxuICAgIHJlbGVhc2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB0cmFja3MgPSBzdHJlYW1SZWYgJiYgc3RyZWFtUmVmLmdldFZpZGVvVHJhY2tzKCk7XHJcbiAgICAgICAgaWYgKHRyYWNrcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdHJhY2tzWzBdLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RyZWFtUmVmID0gbnVsbDtcclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvY2FtZXJhX2FjY2Vzcy5qc1xuICoqLyIsImltcG9ydCBJbWFnZURlYnVnIGZyb20gJy4vaW1hZ2VfZGVidWcnO1xyXG5cclxuZnVuY3Rpb24gY29udGFpbnMoY29kZVJlc3VsdCwgbGlzdCkge1xyXG4gICAgaWYgKGxpc3QpIHtcclxuICAgICAgICByZXR1cm4gbGlzdC5zb21lKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhpdGVtKS5ldmVyeShmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbVtrZXldID09PSBjb2RlUmVzdWx0W2tleV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXNzZXNGaWx0ZXIoY29kZVJlc3VsdCwgZmlsdGVyKSB7XHJcbiAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHJldHVybiBmaWx0ZXIoY29kZVJlc3VsdCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihjb25maWcpIHtcclxuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSxcclxuICAgICAgICAgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSxcclxuICAgICAgICAgICAgcmVzdWx0cyA9IFtdLFxyXG4gICAgICAgICAgICBjYXBhY2l0eSA9IGNvbmZpZy5jYXBhY2l0eSB8fCAyMCxcclxuICAgICAgICAgICAgY2FwdHVyZSA9IGNvbmZpZy5jYXB0dXJlID09PSB0cnVlO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBtYXRjaGVzQ29uc3RyYWludHMoY29kZVJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2FwYWNpdHlcclxuICAgICAgICAgICAgICAgICYmIGNvZGVSZXN1bHRcclxuICAgICAgICAgICAgICAgICYmICFjb250YWlucyhjb2RlUmVzdWx0LCBjb25maWcuYmxhY2tsaXN0KVxyXG4gICAgICAgICAgICAgICAgJiYgcGFzc2VzRmlsdGVyKGNvZGVSZXN1bHQsIGNvbmZpZy5maWx0ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWRkUmVzdWx0OiBmdW5jdGlvbihkYXRhLCBpbWFnZVNpemUsIGNvZGVSZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlc0NvbnN0cmFpbnRzKGNvZGVSZXN1bHQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwYWNpdHktLTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuY29kZVJlc3VsdCA9IGNvZGVSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhcHR1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gaW1hZ2VTaXplLng7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBpbWFnZVNpemUueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3SW1hZ2UoZGF0YSwgaW1hZ2VTaXplLCBjdHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZnJhbWUgPSBjYW52YXMudG9EYXRhVVJMKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRSZXN1bHRzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvcmVzdWx0X2NvbGxlY3Rvci5qc1xuICoqLyIsImNvbnN0IEdldFBpeGVscyA9IHJlcXVpcmUoXCJnZXQtcGl4ZWxzXCIpO1xyXG5cclxudmFyIElucHV0U3RyZWFtID0ge307XHJcblxyXG5JbnB1dFN0cmVhbS5jcmVhdGVJbWFnZVN0cmVhbSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHRoYXQgPSB7fTtcclxuICAgIHZhciBfY29uZmlnID0gbnVsbDtcclxuXHJcbiAgICB2YXIgd2lkdGggPSAwLFxyXG4gICAgICAgIGhlaWdodCA9IDAsXHJcbiAgICAgICAgZnJhbWVJZHggPSAwLFxyXG4gICAgICAgIHBhdXNlZCA9IHRydWUsXHJcbiAgICAgICAgbG9hZGVkID0gZmFsc2UsXHJcbiAgICAgICAgZnJhbWUgPSBudWxsLFxyXG4gICAgICAgIGJhc2VVcmwsXHJcbiAgICAgICAgZW5kZWQgPSBmYWxzZSxcclxuICAgICAgICBzaXplLFxyXG4gICAgICAgIGNhbGN1bGF0ZWRXaWR0aCxcclxuICAgICAgICBjYWxjdWxhdGVkSGVpZ2h0LFxyXG4gICAgICAgIF9ldmVudE5hbWVzID0gWydjYW5yZWNvcmQnLCAnZW5kZWQnXSxcclxuICAgICAgICBfZXZlbnRIYW5kbGVycyA9IHt9LFxyXG4gICAgICAgIF90b3BSaWdodCA9IHt4OiAwLCB5OiAwfSxcclxuICAgICAgICBfY2FudmFzU2l6ZSA9IHt4OiAwLCB5OiAwfTtcclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkSW1hZ2VzKCkge1xyXG4gICAgICAgIGxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIEdldFBpeGVscyhiYXNlVXJsLCBmdW5jdGlvbihlcnIsIHBpeGVscykge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgZXhpdCgxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwaXhlbHMuc2hhcGUpO1xyXG4gICAgICAgICAgICBmcmFtZSA9IHBpeGVscztcclxuICAgICAgICAgICAgd2lkdGggPSBwaXhlbHMuc2hhcGVbMF07XHJcbiAgICAgICAgICAgIGhlaWdodCA9IHBpeGVscy5zaGFwZVsxXTtcclxuICAgICAgICAgICAgY2FsY3VsYXRlZFdpZHRoID0gX2NvbmZpZy5zaXplID8gd2lkdGgvaGVpZ2h0ID4gMSA/IF9jb25maWcuc2l6ZSA6IE1hdGguZmxvb3IoKHdpZHRoL2hlaWdodCkgKiBfY29uZmlnLnNpemUpIDogd2lkdGg7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRIZWlnaHQgPSBfY29uZmlnLnNpemUgPyB3aWR0aC9oZWlnaHQgPiAxID8gTWF0aC5mbG9vcigoaGVpZ2h0L3dpZHRoKSAqIF9jb25maWcuc2l6ZSkgOiBfY29uZmlnLnNpemUgOiBoZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBfY2FudmFzU2l6ZS54ID0gY2FsY3VsYXRlZFdpZHRoO1xyXG4gICAgICAgICAgICBfY2FudmFzU2l6ZS55ID0gY2FsY3VsYXRlZEhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBwdWJsaXNoRXZlbnQoXCJjYW5yZWNvcmRcIiwgW10pO1xyXG4gICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwdWJsaXNoRXZlbnQoZXZlbnROYW1lLCBhcmdzKSB7XHJcbiAgICAgICAgdmFyIGosXHJcbiAgICAgICAgICAgIGhhbmRsZXJzID0gX2V2ZW50SGFuZGxlcnNbZXZlbnROYW1lXTtcclxuXHJcbiAgICAgICAgaWYgKGhhbmRsZXJzICYmIGhhbmRsZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBoYW5kbGVycy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlcnNbal0uYXBwbHkodGhhdCwgYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRoYXQudHJpZ2dlciA9IHB1Ymxpc2hFdmVudDtcclxuXHJcbiAgICB0aGF0LmdldFdpZHRoID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGN1bGF0ZWRXaWR0aDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRIZWlnaHQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gY2FsY3VsYXRlZEhlaWdodDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zZXRXaWR0aCA9IGZ1bmN0aW9uKHdpZHRoKSB7XHJcbiAgICAgICAgY2FsY3VsYXRlZFdpZHRoID0gd2lkdGg7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2V0SGVpZ2h0ID0gZnVuY3Rpb24oaGVpZ2h0KSB7XHJcbiAgICAgICAgY2FsY3VsYXRlZEhlaWdodCA9IGhlaWdodDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRSZWFsV2lkdGggPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gd2lkdGg7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0UmVhbEhlaWdodCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBoZWlnaHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2V0SW5wdXRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICBfY29uZmlnID0gc3RyZWFtO1xyXG4gICAgICAgIGJhc2VVcmwgPSBfY29uZmlnLnNyYztcclxuICAgICAgICBzaXplID0gMTtcclxuICAgICAgICBsb2FkSW1hZ2VzKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZW5kZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gZW5kZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2V0QXR0cmlidXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHJcbiAgICB0aGF0LmdldENvbmZpZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBfY29uZmlnO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnBhdXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcGF1c2VkID0gdHJ1ZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5wbGF5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcGF1c2VkID0gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2V0Q3VycmVudFRpbWUgPSBmdW5jdGlvbih0aW1lKSB7XHJcbiAgICAgICAgZnJhbWVJZHggPSB0aW1lO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZikge1xyXG4gICAgICAgIGlmIChfZXZlbnROYW1lcy5pbmRleE9mKGV2ZW50KSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgaWYgKCFfZXZlbnRIYW5kbGVyc1tldmVudF0pIHtcclxuICAgICAgICAgICAgICAgIF9ldmVudEhhbmRsZXJzW2V2ZW50XSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9ldmVudEhhbmRsZXJzW2V2ZW50XS5wdXNoKGYpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zZXRUb3BSaWdodCA9IGZ1bmN0aW9uKHRvcFJpZ2h0KSB7XHJcbiAgICAgICAgX3RvcFJpZ2h0LnggPSB0b3BSaWdodC54O1xyXG4gICAgICAgIF90b3BSaWdodC55ID0gdG9wUmlnaHQueTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRUb3BSaWdodCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBfdG9wUmlnaHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2V0Q2FudmFzU2l6ZSA9IGZ1bmN0aW9uKHNpemUpIHtcclxuICAgICAgICBfY2FudmFzU2l6ZS54ID0gc2l6ZS54O1xyXG4gICAgICAgIF9jYW52YXNTaXplLnkgPSBzaXplLnk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0Q2FudmFzU2l6ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBfY2FudmFzU2l6ZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRGcmFtZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghbG9hZGVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmcmFtZTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0U3RyZWFtO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL2xpYi9pbnB1dF9zdHJlYW0uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnZXQtcGl4ZWxzXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJnZXQtcGl4ZWxzXCJcbiAqKiBtb2R1bGUgaWQgPSA2NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiY29uc3QgQ1ZVdGlscyA9IHJlcXVpcmUoJy4uL3NyYy9jdl91dGlscycpLFxyXG4gICAgICBOZGFycmF5ID0gcmVxdWlyZShcIm5kYXJyYXlcIiksXHJcbiAgICAgIEludGVycDJEID0gcmVxdWlyZShcIm5kYXJyYXktbGluZWFyLWludGVycG9sYXRlXCIpLmQyO1xyXG5cclxudmFyIEZyYW1lR3JhYmJlciA9IHt9O1xyXG5cclxuRnJhbWVHcmFiYmVyLmNyZWF0ZSA9IGZ1bmN0aW9uKGlucHV0U3RyZWFtKSB7XHJcbiAgICB2YXIgX3RoYXQgPSB7fSxcclxuICAgICAgICBfc3RyZWFtQ29uZmlnID0gaW5wdXRTdHJlYW0uZ2V0Q29uZmlnKCksXHJcbiAgICAgICAgX3ZpZGVvX3NpemUgPSBDVlV0aWxzLmltYWdlUmVmKGlucHV0U3RyZWFtLmdldFJlYWxXaWR0aCgpLCBpbnB1dFN0cmVhbS5nZXRSZWFsSGVpZ2h0KCkpLFxyXG4gICAgICAgIF9jYW52YXNTaXplID0gaW5wdXRTdHJlYW0uZ2V0Q2FudmFzU2l6ZSgpLFxyXG4gICAgICAgIF9zaXplID0gQ1ZVdGlscy5pbWFnZVJlZihpbnB1dFN0cmVhbS5nZXRXaWR0aCgpLCBpbnB1dFN0cmVhbS5nZXRIZWlnaHQoKSksXHJcbiAgICAgICAgX3RvcFJpZ2h0ID0gaW5wdXRTdHJlYW0uZ2V0VG9wUmlnaHQoKSxcclxuICAgICAgICBfZGF0YSA9IG5ldyBVaW50OEFycmF5KF9zaXplLnggKiBfc2l6ZS55KSxcclxuICAgICAgICBfZ3JheURhdGEgPSBuZXcgVWludDhBcnJheShfdmlkZW9fc2l6ZS54ICogX3ZpZGVvX3NpemUueSksXHJcbiAgICAgICAgX2NhbnZhc0RhdGEgPSBuZXcgVWludDhBcnJheShfY2FudmFzU2l6ZS54ICogX2NhbnZhc1NpemUueSksXHJcbiAgICAgICAgX2dyYXlJbWFnZUFycmF5ID0gTmRhcnJheShfZ3JheURhdGEsIFtfdmlkZW9fc2l6ZS55LCBfdmlkZW9fc2l6ZS54XSkudHJhbnNwb3NlKDEsIDApLFxyXG4gICAgICAgIF9jYW52YXNJbWFnZUFycmF5ID0gTmRhcnJheShfY2FudmFzRGF0YSwgW19jYW52YXNTaXplLnksIF9jYW52YXNTaXplLnhdKS50cmFuc3Bvc2UoMSwgMCksXHJcbiAgICAgICAgX3RhcmdldEltYWdlQXJyYXkgPSBfY2FudmFzSW1hZ2VBcnJheS5oaShfdG9wUmlnaHQueCArIF9zaXplLngsIF90b3BSaWdodC55ICsgX3NpemUueSkubG8oX3RvcFJpZ2h0LngsIF90b3BSaWdodC55KSxcclxuICAgICAgICBfc3RlcFNpemVYID0gX3ZpZGVvX3NpemUueC9fY2FudmFzU2l6ZS54LFxyXG4gICAgICAgIF9zdGVwU2l6ZVkgPSBfdmlkZW9fc2l6ZS55L19jYW52YXNTaXplLnk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJGcmFtZUdyYWJiZXJcIiwgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIHZpZGVvU2l6ZTogX2dyYXlJbWFnZUFycmF5LnNoYXBlLFxyXG4gICAgICAgIGNhbnZhc1NpemU6IF9jYW52YXNJbWFnZUFycmF5LnNoYXBlLFxyXG4gICAgICAgIHN0ZXBTaXplOiBbX3N0ZXBTaXplWCwgX3N0ZXBTaXplWV0sXHJcbiAgICAgICAgc2l6ZTogX3RhcmdldEltYWdlQXJyYXkuc2hhcGUsXHJcbiAgICAgICAgdG9wUmlnaHQ6IF90b3BSaWdodFxyXG4gICAgfSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXNlcyB0aGUgZ2l2ZW4gYXJyYXkgYXMgZnJhbWUtYnVmZmVyXHJcbiAgICAgKi9cclxuICAgIF90aGF0LmF0dGFjaERhdGEgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgX2RhdGEgPSBkYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHVzZWQgZnJhbWUtYnVmZmVyXHJcbiAgICAgKi9cclxuICAgIF90aGF0LmdldERhdGEgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gX2RhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmV0Y2hlcyBhIGZyYW1lIGZyb20gdGhlIGlucHV0LXN0cmVhbSBhbmQgcHV0cyBpbnRvIHRoZSBmcmFtZS1idWZmZXIuXHJcbiAgICAgKiBUaGUgaW1hZ2UtZGF0YSBpcyBjb252ZXJ0ZWQgdG8gZ3JheS1zY2FsZSBhbmQgdGhlbiBoYWxmLXNhbXBsZWQgaWYgY29uZmlndXJlZC5cclxuICAgICAqL1xyXG4gICAgX3RoYXQuZ3JhYiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBmcmFtZSA9IGlucHV0U3RyZWFtLmdldEZyYW1lKCk7XHJcblxyXG4gICAgICAgIGlmIChmcmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlQW5kQ3JvcChmcmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIF90aGF0LnNjYWxlQW5kQ3JvcCA9IGZ1bmN0aW9uKGZyYW1lKSB7XHJcbiAgICAgICAgdmFyIHgsXHJcbiAgICAgICAgICAgIHk7XHJcblxyXG4gICAgICAgIC8vIDEuIGNvbXB1dGUgZnVsbC1zaXplZCBncmF5IGltYWdlXHJcbiAgICAgICAgQ1ZVdGlscy5jb21wdXRlR3JheShmcmFtZS5kYXRhLCBfZ3JheURhdGEpO1xyXG5cclxuICAgICAgICAvLyAyLiBpbnRlcnBvbGF0ZVxyXG4gICAgICAgIGZvciAoeSA9IDA7IHkgPCBfY2FudmFzU2l6ZS55OyB5KyspIHtcclxuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IF9jYW52YXNTaXplLng7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgX2NhbnZhc0ltYWdlQXJyYXkuc2V0KHgsIHksIChJbnRlcnAyRChfZ3JheUltYWdlQXJyYXksIHggKiBfc3RlcFNpemVYLCB5ICogX3N0ZXBTaXplWSkpIHwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHRhcmdldEltYWdlQXJyYXkgbXVzdCBiZSBlcXVhbCB0byB0YXJnZXRTaXplXHJcbiAgICAgICAgaWYgKF90YXJnZXRJbWFnZUFycmF5LnNoYXBlWzBdICE9PSBfc2l6ZS54IHx8XHJcbiAgICAgICAgICAgIF90YXJnZXRJbWFnZUFycmF5LnNoYXBlWzFdICE9PSBfc2l6ZS55KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoYXBlcyBkbyBub3QgbWF0Y2ghXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gMy4gY3JvcFxyXG4gICAgICAgIGZvciAoeSA9IDA7IHkgPCBfc2l6ZS55OyB5KyspIHtcclxuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IF9zaXplLng7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgX2RhdGFbeSAqIF9zaXplLnggKyB4XSA9IF90YXJnZXRJbWFnZUFycmF5LmdldCh4LCB5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3RoYXQuZ2V0U2l6ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBfc2l6ZTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIF90aGF0O1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGcmFtZUdyYWJiZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvbGliL2ZyYW1lX2dyYWJiZXIuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZGFycmF5XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJuZGFycmF5XCJcbiAqKiBtb2R1bGUgaWQgPSA2NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmRhcnJheS1saW5lYXItaW50ZXJwb2xhdGVcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIm5kYXJyYXktbGluZWFyLWludGVycG9sYXRlXCJcbiAqKiBtb2R1bGUgaWQgPSA2N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==