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
	        var $viewport = document.querySelector("#interactive.viewport");
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
	
	function canRecord(cb) {
	    _barcode_locator2['default'].checkImageConstraints(_inputStream, _config.locator);
	    initCanvas();
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
	        var $viewport = document.querySelector("#interactive.viewport");
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
	
	    if (!result || xOffset === 0 && yOffset === 0) {
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
	
	function publishResult(result, imageData) {
	    if (_onUIThread) {
	        transformResult(result);
	        if (imageData && result && result.codeResult) {
	            if (_resultCollector) {
	                _resultCollector.addResult(imageData, _inputStream.getCanvasSize(), result.codeResult);
	            }
	        }
	    }
	
	    _events2['default'].publish("processed", result);
	    if (result && result.codeResult) {
	        _events2['default'].publish("detected", result);
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
	                var i, result;
	                for (i = 0; i < boxes.length; i++) {
	                    result = _decodeFromBoundingBox(boxes[i]);
	                    if (result && result.codeResult) {
	                        result.box = boxes[i];
	                        return result;
	                    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWNkMDMyOTNjNTYwY2ZmZGVhOTgiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1YWdnYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHlwZWRlZnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlX3dyYXBwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N1YkltYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9jdl91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2x1c3Rlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJnbC1tYXRyaXhcIiIsIndlYnBhY2s6Ly8vLi9zcmMvYXJyYXlfaGVscGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9iYXJjb2RlX2xvY2F0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Jhc3Rlcml6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYWNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2tlbGV0b25pemVyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZV9kZWJ1Zy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFyY29kZV9kZWNvZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9icmVzZW5oYW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGVfMTI4X3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFyY29kZV9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vhbl9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGVfMzlfcmVhZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb2RlXzM5X3Zpbl9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGFiYXJfcmVhZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy91cGNfcmVhZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9lYW5fOF9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VwY19lX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaTJvZjVfcmVhZGVyLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL29iamVjdC9tZXJnZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlTWVyZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYXJyYXlFYWNoLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2Jhc2VNZXJnZURlZXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYXJyYXlDb3B5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvaXNBcmd1bWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNBcnJheUxpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvZ2V0TGVuZ3RoLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2Jhc2VQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9pc0xlbmd0aC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbGFuZy9pc0FycmF5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2dldE5hdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9sYW5nL2lzTmF0aXZlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvaXNGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9sYW5nL2lzT2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvaXNQbGFpbk9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlRm9ySW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZUZvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9jcmVhdGVCYXNlRm9yLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL3RvT2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL29iamVjdC9rZXlzSW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNJbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9sYW5nL2lzVHlwZWRBcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9sYW5nL3RvUGxhaW5PYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZUNvcHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvb2JqZWN0L2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvc2hpbUtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvY3JlYXRlQXNzaWduZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYmluZENhbGxiYWNrLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL3V0aWxpdHkvaWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNJdGVyYXRlZUNhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvZnVuY3Rpb24vcmVzdFBhcmFtLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FtZXJhX2FjY2Vzcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVzdWx0X2NvbGxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW5wdXRfc3RyZWFtLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImdldC1waXhlbHNcIiIsIndlYnBhY2s6Ly8vLi9saWIvZnJhbWVfZ3JhYmJlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZGFycmF5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmRhcnJheS1saW5lYXItaW50ZXJwb2xhdGVcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUNDdENxQixDQUFZOzs7Ozs7MENBQ1IsQ0FBaUI7Ozs7NENBQ2YsQ0FBbUI7Ozs7NENBQ25CLEVBQW1COzs7O29DQUMzQixFQUFVOzs7O21DQUNWLEVBQVU7Ozs7MENBQ0osRUFBaUI7Ozs7d0NBQ25CLEVBQWU7Ozs7cUNBQ25CLENBQVc7OzZDQUNGLEVBQW9COzs7O0FBRWhELEtBQU0sS0FBSyxHQUFHLG1CQUFPLENBQUMsRUFBcUIsQ0FBQyxDQUFDO0FBQzdDLEtBQU0sV0FBVyxHQUFHLG1CQUFPLENBQUMsRUFBYyxDQUFDLENBQUM7QUFDNUMsS0FBTSxZQUFZLEdBQUcsbUJBQU8sQ0FBQyxFQUFlLENBQUMsQ0FBQzs7QUFFOUMsS0FBSSxZQUFZO0tBQ1osYUFBYTtLQUNiLFFBQVE7S0FDUixnQkFBZ0IsR0FBRztBQUNmLFFBQUcsRUFBRTtBQUNELGNBQUssRUFBRSxJQUFJO0FBQ1gsZ0JBQU8sRUFBRSxJQUFJO01BQ2hCO0FBQ0QsUUFBRyxFQUFFO0FBQ0QsY0FBSyxFQUFFLElBQUk7QUFDWCxnQkFBTyxFQUFFLElBQUk7TUFDaEI7RUFDSjtLQUNELGtCQUFrQjtLQUNsQixRQUFRO0tBQ1IsUUFBUTtLQUNSLFdBQVcsR0FBRyxFQUFFO0tBQ2hCLFdBQVcsR0FBRyxJQUFJO0tBQ2xCLGdCQUFnQjtLQUNoQixPQUFPLEdBQUcsRUFBRSxDQUFDOztBQUVqQixVQUFTLGNBQWMsQ0FBQyxZQUFZLEVBQUU7QUFDbEMsZ0JBQVcsQ0FB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Q0FBQyxNQUFNLEdBQUcsVUFBUyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN4QyxTQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLFNBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkIsU0FBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDckIsU0FBSSxJQUFJLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNsQyxTQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM3QixTQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM3QixTQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM3QixTQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDakMsU0FBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNkLE1BQUMsSUFBSSxFQUFFLENBQUM7QUFDUixNQUFDLElBQUksRUFBRSxDQUFDOztBQUVSLFNBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDckUsWUFBTyxNQUFNLENBQUM7RUFDakIsQ0FBQzs7Ozs7O0FBTUYsYUFBWSxDQUFDLFVBQVUsR0FBRyxVQUFTLEtBQUssRUFBRTtBQUN0QyxTQUFJLENB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USxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLFNBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztBQUNsQixTQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3JCLFNBQUksQ0FBQyxDQUFDOztBQUVOLFlBQU8sWUFBWSxHQUFHLE1BQU0sRUFBRTtBQUMxQixjQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM1QixxQkFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDNUIsS0FBSyxHQUFHLFVBQVUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUNyQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQ3JDLEtBQUssR0FBRyxVQUFVLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFDckMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUMzQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQzNDLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUM1QyxLQUFLLEdBQUcsVUFBVSxDQUFFLFlBQVksR0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQzFDLEtBQUssR0FBRyxVQUFVLENBQUUsWUFBWSxHQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FDMUMsS0FBSyxHQUFHLFVBQVUsQ0FBRSxZQUFZLEdBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQzNDLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxD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RSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVB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LEVBQUUsRUFBQztBQUN6QixrQkFBYSxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQztBQUN6RCxpQkFBWSxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQztBQUN4RCxtQkFBYyxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQztBQUNoRixpQkFBWSxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDZixFQUFDO0FBQ0YsbUJBQWMsRUFBRSxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDO0FBQ2hFLHNCQUFpQixFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQztBQUNoQyxtQkFBYyxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQztBQUM3QixXQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUM7RUFD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QUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFDN0csRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDO0FBQ3BGLHdCQUFtQixFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQzVHLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFDOUcsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUNqSCxFQUFDO0FBQ0YsYUFBUSxFQUFFLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQztBQUN4QixXQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFL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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsRUFBRTtBQUNiLGNBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDL0NBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsRUFBRTtBQUNiLGNBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxFQUFFO0FBQ2IsY0FBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQzNCQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsRUFBRTtBQUNiLGNBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBb0IsaUJBQWlCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFF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O1VBQ0o7TUFDSixFQUVELEtBQUssQ0FBQyxPQUFPLEdBQUcsWUFBVztBQUN2QixnQkFBTyxLQUFLLENBQUM7TUFDaEIsQ0FBQzs7QUFFRixZQUFPLEtBQUssQ0FBQztFQUNoQixDQUFDOztBQUVGLE9BQU0sQ0FBQyxPQUFPLEdBQUcsWUFBWSxDOzs7Ozs7QUM5RjdCLHFDOzs7Ozs7QUNBQSx3RCIsImZpbGUiOiJxdWFnZ2EuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAxY2QwMzI5M2M1NjBjZmZkZWE5OFxuICoqLyIsImltcG9ydCBUeXBlRGVmcyBmcm9tICcuL3R5cGVkZWZzJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IEltYWdlV3JhcHBlciBmcm9tICcuL2ltYWdlX3dyYXBwZXInO1xuaW1wb3J0IEJhcmNvZGVMb2NhdG9yIGZyb20gJy4vYmFyY29kZV9sb2NhdG9yJztcbmltcG9ydCBCYXJjb2RlRGVjb2RlciBmcm9tICcuL2JhcmNvZGVfZGVjb2Rlcic7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uZmlnJztcbmltcG9ydCBFdmVudHMgZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IENhbWVyYUFjY2VzcyBmcm9tICcuL2NhbWVyYV9hY2Nlc3MnO1xuaW1wb3J0IEltYWdlRGVidWcgZnJvbSAnLi9pbWFnZV9kZWJ1Zyc7XG5pbXBvcnQge3ZlYzJ9IGZyb20gJ2dsLW1hdHJpeCc7XG5pbXBvcnQgUmVzdWx0Q29sbGVjdG9yIGZyb20gJy4vcmVzdWx0X2NvbGxlY3Rvcic7XG5cbmNvbnN0IG1lcmdlID0gcmVxdWlyZSgnbG9kYXNoL29iamVjdC9tZXJnZScpO1xuY29uc3QgSW5wdXRTdHJlYW0gPSByZXF1aXJlKCdpbnB1dF9zdHJlYW0nKTtcbmNvbnN0IEZyYW1lR3JhYmJlciA9IHJlcXVpcmUoJ2ZyYW1lX2dyYWJiZXInKTtcblxudmFyIF9pbnB1dFN0cmVhbSxcbiAgICBfZnJhbWVncmFiYmVyLFxuICAgIF9zdG9wcGVkLFxuICAgIF9jYW52YXNDb250YWluZXIgPSB7XG4gICAgICAgIGN0eDoge1xuICAgICAgICAgICAgaW1hZ2U6IG51bGwsXG4gICAgICAgICAgICBvdmVybGF5OiBudWxsXG4gICAgICAgIH0sXG4gICAgICAgIGRvbToge1xuICAgICAgICAgICAgaW1hZ2U6IG51bGwsXG4gICAgICAgICAgICBvdmVybGF5OiBudWxsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9pbnB1dEltYWdlV3JhcHBlcixcbiAgICBfYm94U2l6ZSxcbiAgICBfZGVjb2RlcixcbiAgICBfd29ya2VyUG9vbCA9IFtdLFxuICAgIF9vblVJVGhyZWFkID0gdHJ1ZSxcbiAgICBfcmVzdWx0Q29sbGVjdG9yLFxuICAgIF9jb25maWcgPSB7fTtcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZURhdGEoaW1hZ2VXcmFwcGVyKSB7XG4gICAgaW5pdEJ1ZmZlcnMoaW1hZ2VXcmFwcGVyKTtcbiAgICBfZGVjb2RlciA9IEJhcmNvZGVEZWNvZGVyLmNyZWF0ZShfY29uZmlnLmRlY29kZXIsIF9pbnB1dEltYWdlV3JhcHBlcik7XG59XG5cbmZ1bmN0aW9uIGluaXRJbnB1dFN0cmVhbShjYikge1xuICAgIHZhciB2aWRlbztcbiAgICBpZiAoX2NvbmZpZy5pbnB1dFN0cmVhbS50eXBlID09PSBcIlZpZGVvU3RyZWFtXCIpIHtcbiAgICAgICAgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidmlkZW9cIik7XG4gICAgICAgIF9pbnB1dFN0cmVhbSA9IElucHV0U3RyZWFtLmNyZWF0ZVZpZGVvU3RyZWFtKHZpZGVvKTtcbiAgICB9IGVsc2UgaWYgKF9jb25maWcuaW5wdXRTdHJlYW0udHlwZSA9PT0gXCJJbWFnZVN0cmVhbVwiKSB7XG4gICAgICAgIF9pbnB1dFN0cmVhbSA9IElucHV0U3RyZWFtLmNyZWF0ZUltYWdlU3RyZWFtKCk7XG4gICAgfSBlbHNlIGlmIChfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09IFwiTGl2ZVN0cmVhbVwiKSB7XG4gICAgICAgIHZhciAkdmlld3BvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ludGVyYWN0aXZlLnZpZXdwb3J0XCIpO1xuICAgICAgICBpZiAoJHZpZXdwb3J0KSB7XG4gICAgICAgICAgICB2aWRlbyA9ICR2aWV3cG9ydC5xdWVyeVNlbGVjdG9yKFwidmlkZW9cIik7XG4gICAgICAgICAgICBpZiAoIXZpZGVvKSB7XG4gICAgICAgICAgICAgICAgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidmlkZW9cIik7XG4gICAgICAgICAgICAgICAgJHZpZXdwb3J0LmFwcGVuZENoaWxkKHZpZGVvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfaW5wdXRTdHJlYW0gPSBJbnB1dFN0cmVhbS5jcmVhdGVMaXZlU3RyZWFtKHZpZGVvKTtcbiAgICAgICAgQ2FtZXJhQWNjZXNzLnJlcXVlc3QodmlkZW8sIF9jb25maWcuaW5wdXRTdHJlYW0uY29uc3RyYWludHMsIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgICAgICAgICBfaW5wdXRTdHJlYW0udHJpZ2dlcihcImNhbnJlY29yZFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNiKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9pbnB1dFN0cmVhbS5zZXRBdHRyaWJ1dGUoXCJwcmVsb2FkXCIsIFwiYXV0b1wiKTtcbiAgICBfaW5wdXRTdHJlYW0uc2V0QXR0cmlidXRlKFwiYXV0b3BsYXlcIiwgdHJ1ZSk7XG4gICAgX2lucHV0U3RyZWFtLnNldElucHV0U3RyZWFtKF9jb25maWcuaW5wdXRTdHJlYW0pO1xuICAgIF9pbnB1dFN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFwiY2FucmVjb3JkXCIsIGNhblJlY29yZC5iaW5kKHVuZGVmaW5lZCwgY2IpKTtcbn1cblxuZnVuY3Rpb24gY2FuUmVjb3JkKGNiKSB7XG4gICAgQmFyY29kZUxvY2F0b3IuY2hlY2tJbWFnZUNvbnN0cmFpbnRzKF9pbnB1dFN0cmVhbSwgX2NvbmZpZy5sb2NhdG9yKTtcbiAgICBpbml0Q2FudmFzKCk7XG4gICAgX2ZyYW1lZ3JhYmJlciA9IEZyYW1lR3JhYmJlci5jcmVhdGUoX2lucHV0U3RyZWFtLCBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZSk7XG5cbiAgICBpZiAoX2NvbmZpZy5udW1PZldvcmtlcnMgPiAwKSB7XG4gICAgICAgIGluaXRXb3JrZXJzKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXb3JrZXJzIGNyZWF0ZWRcIik7XG4gICAgICAgICAgICByZWFkeShjYik7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGluaXRpYWxpemVEYXRhKCk7XG4gICAgICAgIHJlYWR5KGNiKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlYWR5KGNiKXtcbiAgICBfaW5wdXRTdHJlYW0ucGxheSgpO1xuICAgIGNiKCk7XG59XG5cbmZ1bmN0aW9uIGluaXRDYW52YXMoKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICB2YXIgJHZpZXdwb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnRlcmFjdGl2ZS52aWV3cG9ydFwiKTtcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzLmltZ0J1ZmZlclwiKTtcbiAgICAgICAgaWYgKCFfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZSkge1xuICAgICAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UuY2xhc3NOYW1lID0gXCJpbWdCdWZmZXJcIjtcbiAgICAgICAgICAgIGlmICgkdmlld3BvcnQgJiYgX2NvbmZpZy5pbnB1dFN0cmVhbS50eXBlID09PSBcIkltYWdlU3RyZWFtXCIpIHtcbiAgICAgICAgICAgICAgICAkdmlld3BvcnQuYXBwZW5kQ2hpbGQoX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9jYW52YXNDb250YWluZXIuY3R4LmltYWdlID0gX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZS53aWR0aCA9IF9pbnB1dFN0cmVhbS5nZXRDYW52YXNTaXplKCkueDtcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UuaGVpZ2h0ID0gX2lucHV0U3RyZWFtLmdldENhbnZhc1NpemUoKS55O1xuXG4gICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzLmRyYXdpbmdCdWZmZXJcIik7XG4gICAgICAgIGlmICghX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheSkge1xuICAgICAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5LmNsYXNzTmFtZSA9IFwiZHJhd2luZ0J1ZmZlclwiO1xuICAgICAgICAgICAgaWYgKCR2aWV3cG9ydCkge1xuICAgICAgICAgICAgICAgICR2aWV3cG9ydC5hcHBlbmRDaGlsZChfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjbGVhckZpeCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKTtcbiAgICAgICAgICAgIGNsZWFyRml4LnNldEF0dHJpYnV0ZShcImNsZWFyXCIsIFwiYWxsXCIpO1xuICAgICAgICAgICAgaWYgKCR2aWV3cG9ydCkge1xuICAgICAgICAgICAgICAgICR2aWV3cG9ydC5hcHBlbmRDaGlsZChjbGVhckZpeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5jdHgub3ZlcmxheSA9IF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5LndpZHRoID0gX2lucHV0U3RyZWFtLmdldENhbnZhc1NpemUoKS54O1xuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5LmhlaWdodCA9IF9pbnB1dFN0cmVhbS5nZXRDYW52YXNTaXplKCkueTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGluaXRCdWZmZXJzKGltYWdlV3JhcHBlcikge1xuICAgIGlmIChpbWFnZVdyYXBwZXIpIHtcbiAgICAgICAgX2lucHV0SW1hZ2VXcmFwcGVyID0gaW1hZ2VXcmFwcGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIF9pbnB1dEltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoe1xuICAgICAgICAgICAgeDogX2lucHV0U3RyZWFtLmdldFdpZHRoKCksXG4gICAgICAgICAgICB5OiBfaW5wdXRTdHJlYW0uZ2V0SGVpZ2h0KClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUpO1xuICAgIF9ib3hTaXplID0gW1xuICAgICAgICB2ZWMyLmNsb25lKFswLCAwXSksXG4gICAgICAgIHZlYzIuY2xvbmUoWzAsIF9pbnB1dEltYWdlV3JhcHBlci5zaXplLnldKSxcbiAgICAgICAgdmVjMi5jbG9uZShbX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUueCwgX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUueV0pLFxuICAgICAgICB2ZWMyLmNsb25lKFtfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS54LCAwXSlcbiAgICBdO1xuICAgIEJhcmNvZGVMb2NhdG9yLmluaXQoX2lucHV0SW1hZ2VXcmFwcGVyLCBfY29uZmlnLmxvY2F0b3IpO1xufVxuXG5mdW5jdGlvbiBnZXRCb3VuZGluZ0JveGVzKCkge1xuICAgIGlmIChfY29uZmlnLmxvY2F0ZSkge1xuICAgICAgICByZXR1cm4gQmFyY29kZUxvY2F0b3IubG9jYXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtbXG4gICAgICAgICAgICB2ZWMyLmNsb25lKF9ib3hTaXplWzBdKSxcbiAgICAgICAgICAgIHZlYzIuY2xvbmUoX2JveFNpemVbMV0pLFxuICAgICAgICAgICAgdmVjMi5jbG9uZShfYm94U2l6ZVsyXSksXG4gICAgICAgICAgICB2ZWMyLmNsb25lKF9ib3hTaXplWzNdKV1dO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdHJhbnNmb3JtUmVzdWx0KHJlc3VsdCkge1xuICAgIHZhciB0b3BSaWdodCA9IF9pbnB1dFN0cmVhbS5nZXRUb3BSaWdodCgpLFxuICAgICAgICB4T2Zmc2V0ID0gdG9wUmlnaHQueCxcbiAgICAgICAgeU9mZnNldCA9IHRvcFJpZ2h0LnksXG4gICAgICAgIGk7XG5cbiAgICBpZiAoIXJlc3VsdCB8fCAoeE9mZnNldCA9PT0gMCAmJiB5T2Zmc2V0ID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG5cbiAgICBpZiAocmVzdWx0LmxpbmUgJiYgcmVzdWx0LmxpbmUubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIG1vdmVMaW5lKHJlc3VsdC5saW5lKTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdC5ib3hlcyAmJiByZXN1bHQuYm94ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcmVzdWx0LmJveGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBtb3ZlQm94KHJlc3VsdC5ib3hlc1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3ZlQm94KGJveCkge1xuICAgICAgICB2YXIgY29ybmVyID0gYm94Lmxlbmd0aDtcblxuICAgICAgICB3aGlsZSAoY29ybmVyLS0pIHtcbiAgICAgICAgICAgIGJveFtjb3JuZXJdWzBdICs9IHhPZmZzZXQ7XG4gICAgICAgICAgICBib3hbY29ybmVyXVsxXSArPSB5T2Zmc2V0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW92ZUxpbmUobGluZSkge1xuICAgICAgICBsaW5lWzBdLnggKz0geE9mZnNldDtcbiAgICAgICAgbGluZVswXS55ICs9IHlPZmZzZXQ7XG4gICAgICAgIGxpbmVbMV0ueCArPSB4T2Zmc2V0O1xuICAgICAgICBsaW5lWzFdLnkgKz0geU9mZnNldDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHB1Ymxpc2hSZXN1bHQocmVzdWx0LCBpbWFnZURhdGEpIHtcbiAgICBpZiAoX29uVUlUaHJlYWQpIHtcbiAgICAgICAgdHJhbnNmb3JtUmVzdWx0KHJlc3VsdCk7XG4gICAgICAgIGlmIChpbWFnZURhdGEgJiYgcmVzdWx0ICYmIHJlc3VsdC5jb2RlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoX3Jlc3VsdENvbGxlY3Rvcikge1xuICAgICAgICAgICAgICAgIF9yZXN1bHRDb2xsZWN0b3IuYWRkUmVzdWx0KGltYWdlRGF0YSwgX2lucHV0U3RyZWFtLmdldENhbnZhc1NpemUoKSwgcmVzdWx0LmNvZGVSZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgRXZlbnRzLnB1Ymxpc2goXCJwcm9jZXNzZWRcIiwgcmVzdWx0KTtcbiAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5jb2RlUmVzdWx0KSB7XG4gICAgICAgIEV2ZW50cy5wdWJsaXNoKFwiZGV0ZWN0ZWRcIiwgcmVzdWx0KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGxvY2F0ZUFuZERlY29kZSgpIHtcbiAgICB2YXIgcmVzdWx0LFxuICAgICAgICBib3hlcztcblxuICAgIGJveGVzID0gZ2V0Qm91bmRpbmdCb3hlcygpO1xuICAgIGlmIChib3hlcykge1xuICAgICAgICByZXN1bHQgPSBfZGVjb2Rlci5kZWNvZGVGcm9tQm91bmRpbmdCb3hlcyhib3hlcyk7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCB7fTtcbiAgICAgICAgcmVzdWx0LmJveGVzID0gYm94ZXM7XG4gICAgICAgIHB1Ymxpc2hSZXN1bHQocmVzdWx0LCBfaW5wdXRJbWFnZVdyYXBwZXIuZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcHVibGlzaFJlc3VsdCgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIHZhciBhdmFpbGFibGVXb3JrZXI7XG5cbiAgICBpZiAoX29uVUlUaHJlYWQpIHtcbiAgICAgICAgaWYgKF93b3JrZXJQb29sLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGF2YWlsYWJsZVdvcmtlciA9IF93b3JrZXJQb29sLmZpbHRlcihmdW5jdGlvbih3b3JrZXJUaHJlYWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXdvcmtlclRocmVhZC5idXN5O1xuICAgICAgICAgICAgfSlbMF07XG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlV29ya2VyKSB7XG4gICAgICAgICAgICAgICAgX2ZyYW1lZ3JhYmJlci5hdHRhY2hEYXRhKGF2YWlsYWJsZVdvcmtlci5pbWFnZURhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIGFsbCB3b3JrZXJzIGFyZSBidXN5XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfZnJhbWVncmFiYmVyLmF0dGFjaERhdGEoX2lucHV0SW1hZ2VXcmFwcGVyLmRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChfZnJhbWVncmFiYmVyLmdyYWIoKSkge1xuICAgICAgICAgICAgaWYgKGF2YWlsYWJsZVdvcmtlcikge1xuICAgICAgICAgICAgICAgIGF2YWlsYWJsZVdvcmtlci5idXN5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVXb3JrZXIud29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgY21kOiAncHJvY2VzcycsXG4gICAgICAgICAgICAgICAgICAgIGltYWdlRGF0YTogYXZhaWxhYmxlV29ya2VyLmltYWdlRGF0YVxuICAgICAgICAgICAgICAgIH0sIFthdmFpbGFibGVXb3JrZXIuaW1hZ2VEYXRhLmJ1ZmZlcl0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2NhdGVBbmREZWNvZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGxvY2F0ZUFuZERlY29kZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgX3N0b3BwZWQgPSBmYWxzZTtcbiAgICAoIGZ1bmN0aW9uIGZyYW1lKCkge1xuICAgICAgICBpZiAoIV9zdG9wcGVkKSB7XG4gICAgICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgICAgIGlmIChfb25VSVRocmVhZCAmJiBfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09IFwiTGl2ZVN0cmVhbVwiKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltRnJhbWUoZnJhbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSgpKTtcbn1cblxuZnVuY3Rpb24gaW5pdFdvcmtlcnMoY2IpIHtcbiAgICB2YXIgaTtcbiAgICBfd29ya2VyUG9vbCA9IFtdO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IF9jb25maWcubnVtT2ZXb3JrZXJzOyBpKyspIHtcbiAgICAgICAgaW5pdFdvcmtlcih3b3JrZXJJbml0aWFsaXplZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd29ya2VySW5pdGlhbGl6ZWQod29ya2VyVGhyZWFkKSB7XG4gICAgICAgIF93b3JrZXJQb29sLnB1c2god29ya2VyVGhyZWFkKTtcbiAgICAgICAgaWYgKF93b3JrZXJQb29sLmxlbmd0aCA+PSBfY29uZmlnLm51bU9mV29ya2Vycyl7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbml0V29ya2VyKGNiKSB7XG4gICAgdmFyIGJsb2JVUkwsXG4gICAgICAgIHdvcmtlclRocmVhZCA9IHtcbiAgICAgICAgICAgIHdvcmtlcjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgaW1hZ2VEYXRhOiBuZXcgVWludDhBcnJheShfaW5wdXRTdHJlYW0uZ2V0V2lkdGgoKSAqIF9pbnB1dFN0cmVhbS5nZXRIZWlnaHQoKSksXG4gICAgICAgICAgICBidXN5OiB0cnVlXG4gICAgICAgIH07XG5cbiAgICBibG9iVVJMID0gZ2VuZXJhdGVXb3JrZXJCbG9iKCk7XG4gICAgd29ya2VyVGhyZWFkLndvcmtlciA9IG5ldyBXb3JrZXIoYmxvYlVSTCk7XG5cbiAgICB3b3JrZXJUaHJlYWQud29ya2VyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUuZGF0YS5ldmVudCA9PT0gJ2luaXRpYWxpemVkJykge1xuICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChibG9iVVJMKTtcbiAgICAgICAgICAgIHdvcmtlclRocmVhZC5idXN5ID0gZmFsc2U7XG4gICAgICAgICAgICB3b3JrZXJUaHJlYWQuaW1hZ2VEYXRhID0gbmV3IFVpbnQ4QXJyYXkoZS5kYXRhLmltYWdlRGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldvcmtlciBpbml0aWFsaXplZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBjYih3b3JrZXJUaHJlYWQpO1xuICAgICAgICB9IGVsc2UgaWYgKGUuZGF0YS5ldmVudCA9PT0gJ3Byb2Nlc3NlZCcpIHtcbiAgICAgICAgICAgIHdvcmtlclRocmVhZC5pbWFnZURhdGEgPSBuZXcgVWludDhBcnJheShlLmRhdGEuaW1hZ2VEYXRhKTtcbiAgICAgICAgICAgIHdvcmtlclRocmVhZC5idXN5ID0gZmFsc2U7XG4gICAgICAgICAgICBwdWJsaXNoUmVzdWx0KGUuZGF0YS5yZXN1bHQsIHdvcmtlclRocmVhZC5pbWFnZURhdGEpO1xuICAgICAgICB9IGVsc2UgaWYgKGUuZGF0YS5ldmVudCA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXb3JrZXIgZXJyb3I6IFwiICsgZS5kYXRhLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHdvcmtlclRocmVhZC53b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBjbWQ6ICdpbml0JyxcbiAgICAgICAgc2l6ZToge3g6IF9pbnB1dFN0cmVhbS5nZXRXaWR0aCgpLCB5OiBfaW5wdXRTdHJlYW0uZ2V0SGVpZ2h0KCl9LFxuICAgICAgICBpbWFnZURhdGE6IHdvcmtlclRocmVhZC5pbWFnZURhdGEsXG4gICAgICAgIGNvbmZpZzogX2NvbmZpZ1xuICAgIH0sIFt3b3JrZXJUaHJlYWQuaW1hZ2VEYXRhLmJ1ZmZlcl0pO1xufVxuXG5cbmZ1bmN0aW9uIHdvcmtlckludGVyZmFjZShmYWN0b3J5KSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYqL1xuICAgIGlmIChmYWN0b3J5KSB7XG4gICAgICAgIHZhciBRdWFnZ2EgPSBmYWN0b3J5KCk7XG4gICAgICAgIGlmICghUXVhZ2dhKSB7XG4gICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsnZXZlbnQnOiAnZXJyb3InLCBtZXNzYWdlOiAnUXVhZ2dhIGNvdWxkIG5vdCBiZSBjcmVhdGVkJ30pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBpbWFnZVdyYXBwZXI7XG5cbiAgICBzZWxmLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUuZGF0YS5jbWQgPT09ICdpbml0Jykge1xuICAgICAgICAgICAgdmFyIGNvbmZpZyA9IGUuZGF0YS5jb25maWc7XG4gICAgICAgICAgICBjb25maWcubnVtT2ZXb3JrZXJzID0gMDtcbiAgICAgICAgICAgIGltYWdlV3JhcHBlciA9IG5ldyBRdWFnZ2EuSW1hZ2VXcmFwcGVyKHtcbiAgICAgICAgICAgICAgICB4OiBlLmRhdGEuc2l6ZS54LFxuICAgICAgICAgICAgICAgIHk6IGUuZGF0YS5zaXplLnlcbiAgICAgICAgICAgIH0sIG5ldyBVaW50OEFycmF5KGUuZGF0YS5pbWFnZURhdGEpKTtcbiAgICAgICAgICAgIFF1YWdnYS5pbml0KGNvbmZpZywgcmVhZHksIGltYWdlV3JhcHBlcik7XG4gICAgICAgICAgICBRdWFnZ2Eub25Qcm9jZXNzZWQob25Qcm9jZXNzZWQpO1xuICAgICAgICB9IGVsc2UgaWYgKGUuZGF0YS5jbWQgPT09ICdwcm9jZXNzJykge1xuICAgICAgICAgICAgaW1hZ2VXcmFwcGVyLmRhdGEgPSBuZXcgVWludDhBcnJheShlLmRhdGEuaW1hZ2VEYXRhKTtcbiAgICAgICAgICAgIFF1YWdnYS5zdGFydCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGUuZGF0YS5jbWQgPT09ICdzZXRSZWFkZXJzJykge1xuICAgICAgICAgICAgUXVhZ2dhLnNldFJlYWRlcnMoZS5kYXRhLnJlYWRlcnMpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG9uUHJvY2Vzc2VkKHJlc3VsdCkge1xuICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICdldmVudCc6ICdwcm9jZXNzZWQnLFxuICAgICAgICAgICAgaW1hZ2VEYXRhOiBpbWFnZVdyYXBwZXIuZGF0YSxcbiAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0XG4gICAgICAgIH0sIFtpbWFnZVdyYXBwZXIuZGF0YS5idWZmZXJdKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWFkeSgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsnZXZlbnQnOiAnaW5pdGlhbGl6ZWQnLCBpbWFnZURhdGE6IGltYWdlV3JhcHBlci5kYXRhfSwgW2ltYWdlV3JhcHBlci5kYXRhLmJ1ZmZlcl0pO1xuICAgIH1cblxuICAgIC8qIGVzbGludC1lbmFibGUgKi9cbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVXb3JrZXJCbG9iKCkge1xuICAgIHZhciBibG9iLFxuICAgICAgICBmYWN0b3J5U291cmNlO1xuXG4gICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgIGlmICh0eXBlb2YgX19mYWN0b3J5U291cmNlX18gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGZhY3RvcnlTb3VyY2UgPSBfX2ZhY3RvcnlTb3VyY2VfXzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuICAgIH1cbiAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuXG4gICAgYmxvYiA9IG5ldyBCbG9iKFsnKCcgKyB3b3JrZXJJbnRlcmZhY2UudG9TdHJpbmcoKSArICcpKCcgKyBmYWN0b3J5U291cmNlICsgJyk7J10sXG4gICAgICAgIHt0eXBlOiAndGV4dC9qYXZhc2NyaXB0J30pO1xuXG4gICAgcmV0dXJuIHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xufVxuXG5mdW5jdGlvbiBzZXRSZWFkZXJzKHJlYWRlcnMpIHtcbiAgICBpZiAoX2RlY29kZXIpIHtcbiAgICAgICAgX2RlY29kZXIuc2V0UmVhZGVycyhyZWFkZXJzKTtcbiAgICB9IGVsc2UgaWYgKF9vblVJVGhyZWFkICYmIF93b3JrZXJQb29sLmxlbmd0aCA+IDApIHtcbiAgICAgICAgX3dvcmtlclBvb2wuZm9yRWFjaChmdW5jdGlvbih3b3JrZXJUaHJlYWQpIHtcbiAgICAgICAgICAgIHdvcmtlclRocmVhZC53b3JrZXIucG9zdE1lc3NhZ2Uoe2NtZDogJ3NldFJlYWRlcnMnLCByZWFkZXJzOiByZWFkZXJzfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGluaXQ6IGZ1bmN0aW9uKGNvbmZpZywgY2IsIGltYWdlV3JhcHBlcikge1xuICAgICAgICBfY29uZmlnID0gbWVyZ2Uoe30sIENvbmZpZywgY29uZmlnKTtcbiAgICAgICAgaWYgKGltYWdlV3JhcHBlcikge1xuICAgICAgICAgICAgX29uVUlUaHJlYWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGluaXRpYWxpemVEYXRhKGltYWdlV3JhcHBlcik7XG4gICAgICAgICAgICByZXR1cm4gY2IoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluaXRJbnB1dFN0cmVhbShjYik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgc3RhcnQoKTtcbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfc3RvcHBlZCA9IHRydWU7XG4gICAgICAgIF93b3JrZXJQb29sLmZvckVhY2goZnVuY3Rpb24od29ya2VyVGhyZWFkKSB7XG4gICAgICAgICAgICB3b3JrZXJUaHJlYWQud29ya2VyLnRlcm1pbmF0ZSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXb3JrZXIgdGVybWluYXRlZCFcIik7XG4gICAgICAgIH0pO1xuICAgICAgICBfd29ya2VyUG9vbC5sZW5ndGggPSAwO1xuICAgICAgICBpZiAoX2NvbmZpZy5pbnB1dFN0cmVhbS50eXBlID09PSBcIkxpdmVTdHJlYW1cIikge1xuICAgICAgICAgICAgQ2FtZXJhQWNjZXNzLnJlbGVhc2UoKTtcbiAgICAgICAgICAgIF9pbnB1dFN0cmVhbS5jbGVhckV2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcGF1c2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfc3RvcHBlZCA9IHRydWU7XG4gICAgfSxcbiAgICBvbkRldGVjdGVkOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICBFdmVudHMuc3Vic2NyaWJlKFwiZGV0ZWN0ZWRcIiwgY2FsbGJhY2spO1xuICAgIH0sXG4gICAgb2ZmRGV0ZWN0ZWQ6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIEV2ZW50cy51bnN1YnNjcmliZShcImRldGVjdGVkXCIsIGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIG9uUHJvY2Vzc2VkOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICBFdmVudHMuc3Vic2NyaWJlKFwicHJvY2Vzc2VkXCIsIGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIG9mZlByb2Nlc3NlZDogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgRXZlbnRzLnVuc3Vic2NyaWJlKFwicHJvY2Vzc2VkXCIsIGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIHNldFJlYWRlcnM6IGZ1bmN0aW9uKHJlYWRlcnMpIHtcbiAgICAgICAgc2V0UmVhZGVycyhyZWFkZXJzKTtcbiAgICB9LFxuICAgIHJlZ2lzdGVyUmVzdWx0Q29sbGVjdG9yOiBmdW5jdGlvbihyZXN1bHRDb2xsZWN0b3IpIHtcbiAgICAgICAgaWYgKHJlc3VsdENvbGxlY3RvciAmJiB0eXBlb2YgcmVzdWx0Q29sbGVjdG9yLmFkZFJlc3VsdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgX3Jlc3VsdENvbGxlY3RvciA9IHJlc3VsdENvbGxlY3RvcjtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY2FudmFzOiBfY2FudmFzQ29udGFpbmVyLFxuICAgIGRlY29kZVNpbmdsZTogZnVuY3Rpb24oY29uZmlnLCByZXN1bHRDYWxsYmFjaykge1xuICAgICAgICBjb25maWcgPSBtZXJnZSh7XG4gICAgICAgICAgICBpbnB1dFN0cmVhbToge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiSW1hZ2VTdHJlYW1cIixcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2l6ZTogODAwLFxuICAgICAgICAgICAgICAgIHNyYzogY29uZmlnLnNyY1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG51bU9mV29ya2VyczogMSxcbiAgICAgICAgICAgIGxvY2F0b3I6IHtcbiAgICAgICAgICAgICAgICBoYWxmU2FtcGxlOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjb25maWcpO1xuICAgICAgICB0aGlzLmluaXQoY29uZmlnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEV2ZW50cy5vbmNlKFwicHJvY2Vzc2VkXCIsIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIF9zdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXN1bHRDYWxsYmFjay5jYWxsKG51bGwsIHJlc3VsdCk7XG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgICAgIHN0YXJ0KCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgSW1hZ2VXcmFwcGVyOiBJbWFnZVdyYXBwZXIsXG4gICAgSW1hZ2VEZWJ1ZzogSW1hZ2VEZWJ1ZyxcbiAgICBSZXN1bHRDb2xsZWN0b3I6IFJlc3VsdENvbGxlY3RvclxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3F1YWdnYS5qc1xuICoqLyIsIi8qXG4gKiB0eXBlZGVmcy5qc1xuICogTm9ybWFsaXplcyBicm93c2VyLXNwZWNpZmljIHByZWZpeGVzXG4gKi9cblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2luZG93LnJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKC8qIGZ1bmN0aW9uIEZyYW1lUmVxdWVzdENhbGxiYWNrICovIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4gICAgICAgICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLmdldFVzZXJNZWRpYSB8fFxuICAgICAgICBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhIHx8IG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEgfHwgbmF2aWdhdG9yLm1zR2V0VXNlck1lZGlhO1xuICAgIHdpbmRvdy5VUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkwgfHwgd2luZG93Lm1velVSTCB8fCB3aW5kb3cubXNVUkw7XG59XG5NYXRoLmltdWwgPSBNYXRoLmltdWwgfHwgZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciBhaCA9IChhID4+PiAxNikgJiAweGZmZmYsXG4gICAgICAgIGFsID0gYSAmIDB4ZmZmZixcbiAgICAgICAgYmggPSAoYiA+Pj4gMTYpICYgMHhmZmZmLFxuICAgICAgICBibCA9IGIgJiAweGZmZmY7XG4gICAgLy8gdGhlIHNoaWZ0IGJ5IDAgZml4ZXMgdGhlIHNpZ24gb24gdGhlIGhpZ2ggcGFydFxuICAgIC8vIHRoZSBmaW5hbCB8MCBjb252ZXJ0cyB0aGUgdW5zaWduZWQgdmFsdWUgaW50byBhIHNpZ25lZCB2YWx1ZVxuICAgIHJldHVybiAoKGFsICogYmwpICsgKCgoYWggKiBibCArIGFsICogYmgpIDw8IDE2KSA+Pj4gMCkgfCAwKTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90eXBlZGVmcy5qc1xuICoqLyIsImltcG9ydCBTdWJJbWFnZSBmcm9tICcuL3N1YkltYWdlJztcbmltcG9ydCBDVlV0aWxzIGZyb20gJy4vY3ZfdXRpbHMnO1xuaW1wb3J0IEFycmF5SGVscGVyIGZyb20gJy4vYXJyYXlfaGVscGVyJztcbmltcG9ydCB7dmVjMn0gZnJvbSAnZ2wtbWF0cml4JztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgYmFzaWMgaW1hZ2UgY29tYmluaW5nIHRoZSBkYXRhIGFuZCBzaXplLlxuICogSW4gYWRkaXRpb24sIHNvbWUgbWV0aG9kcyBmb3IgbWFuaXB1bGF0aW9uIGFyZSBjb250YWluZWQuXG4gKiBAcGFyYW0gc2l6ZSB7eCx5fSBUaGUgc2l6ZSBvZiB0aGUgaW1hZ2UgaW4gcGl4ZWxcbiAqIEBwYXJhbSBkYXRhIHtBcnJheX0gSWYgZ2l2ZW4sIGEgZmxhdCBhcnJheSBjb250YWluaW5nIHRoZSBwaXhlbCBkYXRhXG4gKiBAcGFyYW0gQXJyYXlUeXBlIHtUeXBlfSBJZiBnaXZlbiwgdGhlIGRlc2lyZWQgRGF0YVR5cGUgb2YgdGhlIEFycmF5IChtYXkgYmUgdHlwZWQvbm9uLXR5cGVkKVxuICogQHBhcmFtIGluaXRpYWxpemUge0Jvb2xlYW59IEluZGljYXRpbmcgaWYgdGhlIGFycmF5IHNob3VsZCBiZSBpbml0aWFsaXplZCBvbiBjcmVhdGlvbi5cbiAqIEByZXR1cm5zIHtJbWFnZVdyYXBwZXJ9XG4gKi9cbmZ1bmN0aW9uIEltYWdlV3JhcHBlcihzaXplLCBkYXRhLCBBcnJheVR5cGUsIGluaXRpYWxpemUpIHtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgaWYgKEFycmF5VHlwZSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gbmV3IEFycmF5VHlwZShzaXplLnggKiBzaXplLnkpO1xuICAgICAgICAgICAgaWYgKEFycmF5VHlwZSA9PT0gQXJyYXkgJiYgaW5pdGlhbGl6ZSkge1xuICAgICAgICAgICAgICAgIEFycmF5SGVscGVyLmluaXQodGhpcy5kYXRhLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IG5ldyBVaW50OEFycmF5KHNpemUueCAqIHNpemUueSk7XG4gICAgICAgICAgICBpZiAoVWludDhBcnJheSA9PT0gQXJyYXkgJiYgaW5pdGlhbGl6ZSkge1xuICAgICAgICAgICAgICAgIEFycmF5SGVscGVyLmluaXQodGhpcy5kYXRhLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgfVxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG59XG5cbi8qKlxuICogdGVzdHMgaWYgYSBwb3NpdGlvbiBpcyB3aXRoaW4gdGhlIGltYWdlIHdpdGggYSBnaXZlbiBvZmZzZXRcbiAqIEBwYXJhbSBpbWdSZWYge3gsIHl9IFRoZSBsb2NhdGlvbiB0byB0ZXN0XG4gKiBAcGFyYW0gYm9yZGVyIE51bWJlciB0aGUgcGFkZGluZyB2YWx1ZSBpbiBwaXhlbFxuICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgbG9jYXRpb24gaW5zaWRlIHRoZSBpbWFnZSdzIGJvcmRlciwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAc2VlIGN2ZC9pbWFnZS5oXG4gKi9cbkltYWdlV3JhcHBlci5wcm90b3R5cGUuaW5JbWFnZVdpdGhCb3JkZXIgPSBmdW5jdGlvbihpbWdSZWYsIGJvcmRlcikge1xuICAgIHJldHVybiAoaW1nUmVmLnggPj0gYm9yZGVyKVxuICAgICAgICAmJiAoaW1nUmVmLnkgPj0gYm9yZGVyKVxuICAgICAgICAmJiAoaW1nUmVmLnggPCAodGhpcy5zaXplLnggLSBib3JkZXIpKVxuICAgICAgICAmJiAoaW1nUmVmLnkgPCAodGhpcy5zaXplLnkgLSBib3JkZXIpKTtcbn07XG5cbi8qKlxuICogUGVyZm9ybXMgYmlsaW5lYXIgc2FtcGxpbmdcbiAqIEBwYXJhbSBpbkltZyBJbWFnZSB0byBleHRyYWN0IHNhbXBsZSBmcm9tXG4gKiBAcGFyYW0geCB0aGUgeC1jb29yZGluYXRlXG4gKiBAcGFyYW0geSB0aGUgeS1jb29yZGluYXRlXG4gKiBAcmV0dXJucyB0aGUgc2FtcGxlZCB2YWx1ZVxuICogQHNlZSBjdmQvdmlzaW9uLmhcbiAqL1xuSW1hZ2VXcmFwcGVyLnNhbXBsZSA9IGZ1bmN0aW9uKGluSW1nLCB4LCB5KSB7XG4gICAgdmFyIGx4ID0gTWF0aC5mbG9vcih4KTtcbiAgICB2YXIgbHkgPSBNYXRoLmZsb29yKHkpO1xuICAgIHZhciB3ID0gaW5JbWcuc2l6ZS54O1xuICAgIHZhciBiYXNlID0gbHkgKiBpbkltZy5zaXplLnggKyBseDtcbiAgICB2YXIgYSA9IGluSW1nLmRhdGFbYmFzZSArIDBdO1xuICAgIHZhciBiID0gaW5JbWcuZGF0YVtiYXNlICsgMV07XG4gICAgdmFyIGMgPSBpbkltZy5kYXRhW2Jhc2UgKyB3XTtcbiAgICB2YXIgZCA9IGluSW1nLmRhdGFbYmFzZSArIHcgKyAxXTtcbiAgICB2YXIgZSA9IGEgLSBiO1xuICAgIHggLT0gbHg7XG4gICAgeSAtPSBseTtcblxuICAgIHZhciByZXN1bHQgPSBNYXRoLmZsb29yKHggKiAoeSAqIChlIC0gYyArIGQpIC0gZSkgKyB5ICogKGMgLSBhKSArIGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGEgZ2l2ZW4gYXJyYXkuIFNldHMgZWFjaCBlbGVtZW50IHRvIHplcm8uXG4gKiBAcGFyYW0gYXJyYXkge0FycmF5fSBUaGUgYXJyYXkgdG8gaW5pdGlhbGl6ZVxuICovXG5JbWFnZVdyYXBwZXIuY2xlYXJBcnJheSA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgdmFyIGwgPSBhcnJheS5sZW5ndGg7XG4gICAgd2hpbGUgKGwtLSkge1xuICAgICAgICBhcnJheVtsXSA9IDA7XG4gICAgfVxufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEge1N1YkltYWdlfSBmcm9tIHRoZSBjdXJyZW50IGltYWdlICh7dGhpc30pLlxuICogQHBhcmFtIGZyb20ge0ltYWdlUmVmfSBUaGUgcG9zaXRpb24gd2hlcmUgdG8gc3RhcnQgdGhlIHtTdWJJbWFnZX0gZnJvbS4gKHRvcC1sZWZ0IGNvcm5lcilcbiAqIEBwYXJhbSBzaXplIHtJbWFnZVJlZn0gVGhlIHNpemUgb2YgdGhlIHJlc3VsdGluZyBpbWFnZVxuICogQHJldHVybnMge1N1YkltYWdlfSBBIHNoYXJlZCBwYXJ0IG9mIHRoZSBvcmlnaW5hbCBpbWFnZVxuICovXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLnN1YkltYWdlID0gZnVuY3Rpb24oZnJvbSwgc2l6ZSkge1xuICAgIHJldHVybiBuZXcgU3ViSW1hZ2UoZnJvbSwgc2l6ZSwgdGhpcyk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4ge0ltYWdlV3JhcHBlcikgYW5kIGNvcGllcyB0aGUgbmVlZGVkIHVuZGVybHlpbmcgaW1hZ2UtZGF0YSBhcmVhXG4gKiBAcGFyYW0gaW1hZ2VXcmFwcGVyIHtJbWFnZVdyYXBwZXJ9IFRoZSB0YXJnZXQge0ltYWdlV3JhcHBlcn0gd2hlcmUgdGhlIGRhdGEgc2hvdWxkIGJlIGNvcGllZFxuICogQHBhcmFtIGZyb20ge0ltYWdlUmVmfSBUaGUgbG9jYXRpb24gd2hlcmUgdG8gY29weSBmcm9tICh0b3AtbGVmdCBsb2NhdGlvbilcbiAqL1xuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5zdWJJbWFnZUFzQ29weSA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgZnJvbSkge1xuICAgIHZhciBzaXplWSA9IGltYWdlV3JhcHBlci5zaXplLnksIHNpemVYID0gaW1hZ2VXcmFwcGVyLnNpemUueDtcbiAgICB2YXIgeCwgeTtcbiAgICBmb3IgKCB4ID0gMDsgeCA8IHNpemVYOyB4KyspIHtcbiAgICAgICAgZm9yICggeSA9IDA7IHkgPCBzaXplWTsgeSsrKSB7XG4gICAgICAgICAgICBpbWFnZVdyYXBwZXIuZGF0YVt5ICogc2l6ZVggKyB4XSA9IHRoaXMuZGF0YVsoZnJvbS55ICsgeSkgKiB0aGlzLnNpemUueCArIGZyb20ueCArIHhdO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5jb3B5VG8gPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIpIHtcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5kYXRhLmxlbmd0aCwgc3JjRGF0YSA9IHRoaXMuZGF0YSwgZHN0RGF0YSA9IGltYWdlV3JhcHBlci5kYXRhO1xuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIGRzdERhdGFbbGVuZ3RoXSA9IHNyY0RhdGFbbGVuZ3RoXTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFJldHJpZXZlcyBhIGdpdmVuIHBpeGVsIHBvc2l0aW9uIGZyb20gdGhlIGltYWdlXG4gKiBAcGFyYW0geCB7TnVtYmVyfSBUaGUgeC1wb3NpdGlvblxuICogQHBhcmFtIHkge051bWJlcn0gVGhlIHktcG9zaXRpb25cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBncmF5c2NhbGUgdmFsdWUgYXQgdGhlIHBpeGVsLXBvc2l0aW9uXG4gKi9cbkltYWdlV3JhcHBlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIHJldHVybiB0aGlzLmRhdGFbeSAqIHRoaXMuc2l6ZS54ICsgeF07XG59O1xuXG4vKipcbiAqIFJldHJpZXZlcyBhIGdpdmVuIHBpeGVsIHBvc2l0aW9uIGZyb20gdGhlIGltYWdlXG4gKiBAcGFyYW0geCB7TnVtYmVyfSBUaGUgeC1wb3NpdGlvblxuICogQHBhcmFtIHkge051bWJlcn0gVGhlIHktcG9zaXRpb25cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBncmF5c2NhbGUgdmFsdWUgYXQgdGhlIHBpeGVsLXBvc2l0aW9uXG4gKi9cbkltYWdlV3JhcHBlci5wcm90b3R5cGUuZ2V0U2FmZSA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICB2YXIgaTtcblxuICAgIGlmICghdGhpcy5pbmRleE1hcHBpbmcpIHtcbiAgICAgICAgdGhpcy5pbmRleE1hcHBpbmcgPSB7XG4gICAgICAgICAgICB4OiBbXSxcbiAgICAgICAgICAgIHk6IFtdXG4gICAgICAgIH07XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnNpemUueDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmluZGV4TWFwcGluZy54W2ldID0gaTtcbiAgICAgICAgICAgIHRoaXMuaW5kZXhNYXBwaW5nLnhbaSArIHRoaXMuc2l6ZS54XSA9IGk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuc2l6ZS55OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuaW5kZXhNYXBwaW5nLnlbaV0gPSBpO1xuICAgICAgICAgICAgdGhpcy5pbmRleE1hcHBpbmcueVtpICsgdGhpcy5zaXplLnldID0gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kYXRhWyh0aGlzLmluZGV4TWFwcGluZy55W3kgKyB0aGlzLnNpemUueV0pICogdGhpcy5zaXplLnggKyB0aGlzLmluZGV4TWFwcGluZy54W3ggKyB0aGlzLnNpemUueF1dO1xufTtcblxuLyoqXG4gKiBTZXRzIGEgZ2l2ZW4gcGl4ZWwgcG9zaXRpb24gaW4gdGhlIGltYWdlXG4gKiBAcGFyYW0geCB7TnVtYmVyfSBUaGUgeC1wb3NpdGlvblxuICogQHBhcmFtIHkge051bWJlcn0gVGhlIHktcG9zaXRpb25cbiAqIEBwYXJhbSB2YWx1ZSB7TnVtYmVyfSBUaGUgZ3JheXNjYWxlIHZhbHVlIHRvIHNldFxuICogQHJldHVybnMge0ltYWdlV3JhcHBlcn0gVGhlIEltYWdlIGl0c2VsZiAoZm9yIHBvc3NpYmxlIGNoYWluaW5nKVxuICovXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKHgsIHksIHZhbHVlKSB7XG4gICAgdGhpcy5kYXRhW3kgKiB0aGlzLnNpemUueCArIHhdID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGJvcmRlciBvZiB0aGUgaW1hZ2UgKDEgcGl4ZWwpIHRvIHplcm9cbiAqL1xuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS56ZXJvQm9yZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGksIHdpZHRoID0gdGhpcy5zaXplLngsIGhlaWdodCA9IHRoaXMuc2l6ZS55LCBkYXRhID0gdGhpcy5kYXRhO1xuICAgIGZvciAoIGkgPSAwOyBpIDwgd2lkdGg7IGkrKykge1xuICAgICAgICBkYXRhW2ldID0gZGF0YVsoaGVpZ2h0IC0gMSkgKiB3aWR0aCArIGldID0gMDtcbiAgICB9XG4gICAgZm9yICggaSA9IDE7IGkgPCBoZWlnaHQgLSAxOyBpKyspIHtcbiAgICAgICAgZGF0YVtpICogd2lkdGhdID0gZGF0YVtpICogd2lkdGggKyAod2lkdGggLSAxKV0gPSAwO1xuICAgIH1cbn07XG5cbi8qKlxuICogSW52ZXJ0cyBhIGJpbmFyeSBpbWFnZSBpbiBwbGFjZVxuICovXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLmludmVydCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXRhID0gdGhpcy5kYXRhLCBsZW5ndGggPSBkYXRhLmxlbmd0aDtcblxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICBkYXRhW2xlbmd0aF0gPSBkYXRhW2xlbmd0aF0gPyAwIDogMTtcbiAgICB9XG59O1xuXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLmNvbnZvbHZlID0gZnVuY3Rpb24oa2VybmVsKSB7XG4gICAgdmFyIHgsIHksIGt4LCBreSwga1NpemUgPSAoa2VybmVsLmxlbmd0aCAvIDIpIHwgMCwgYWNjdSA9IDA7XG4gICAgZm9yICggeSA9IDA7IHkgPCB0aGlzLnNpemUueTsgeSsrKSB7XG4gICAgICAgIGZvciAoIHggPSAwOyB4IDwgdGhpcy5zaXplLng7IHgrKykge1xuICAgICAgICAgICAgYWNjdSA9IDA7XG4gICAgICAgICAgICBmb3IgKCBreSA9IC1rU2l6ZTsga3kgPD0ga1NpemU7IGt5KyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKCBreCA9IC1rU2l6ZTsga3ggPD0ga1NpemU7IGt4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjdSArPSBrZXJuZWxba3kgKyBrU2l6ZV1ba3ggKyBrU2l6ZV0gKiB0aGlzLmdldFNhZmUoeCArIGt4LCB5ICsga3kpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGF0YVt5ICogdGhpcy5zaXplLnggKyB4XSA9IGFjY3U7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLm1vbWVudHMgPSBmdW5jdGlvbihsYWJlbGNvdW50KSB7XG4gICAgdmFyIGRhdGEgPSB0aGlzLmRhdGEsXG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIGhlaWdodCA9IHRoaXMuc2l6ZS55LFxuICAgICAgICB3aWR0aCA9IHRoaXMuc2l6ZS54LFxuICAgICAgICB2YWwsXG4gICAgICAgIHlzcSxcbiAgICAgICAgbGFiZWxzdW0gPSBbXSxcbiAgICAgICAgaSxcbiAgICAgICAgbGFiZWwsXG4gICAgICAgIG11MTEsXG4gICAgICAgIG11MDIsXG4gICAgICAgIG11MjAsXG4gICAgICAgIHhfLFxuICAgICAgICB5XyxcbiAgICAgICAgdG1wLFxuICAgICAgICByZXN1bHQgPSBbXSxcbiAgICAgICAgUEkgPSBNYXRoLlBJLFxuICAgICAgICBQSV80ID0gUEkgLyA0O1xuXG4gICAgaWYgKGxhYmVsY291bnQgPD0gMCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGZvciAoIGkgPSAwOyBpIDwgbGFiZWxjb3VudDsgaSsrKSB7XG4gICAgICAgIGxhYmVsc3VtW2ldID0ge1xuICAgICAgICAgICAgbTAwOiAwLFxuICAgICAgICAgICAgbTAxOiAwLFxuICAgICAgICAgICAgbTEwOiAwLFxuICAgICAgICAgICAgbTExOiAwLFxuICAgICAgICAgICAgbTAyOiAwLFxuICAgICAgICAgICAgbTIwOiAwLFxuICAgICAgICAgICAgdGhldGE6IDAsXG4gICAgICAgICAgICByYWQ6IDBcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmb3IgKCB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKSB7XG4gICAgICAgIHlzcSA9IHkgKiB5O1xuICAgICAgICBmb3IgKCB4ID0gMDsgeCA8IHdpZHRoOyB4KyspIHtcbiAgICAgICAgICAgIHZhbCA9IGRhdGFbeSAqIHdpZHRoICsgeF07XG4gICAgICAgICAgICBpZiAodmFsID4gMCkge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gbGFiZWxzdW1bdmFsIC0gMV07XG4gICAgICAgICAgICAgICAgbGFiZWwubTAwICs9IDE7XG4gICAgICAgICAgICAgICAgbGFiZWwubTAxICs9IHk7XG4gICAgICAgICAgICAgICAgbGFiZWwubTEwICs9IHg7XG4gICAgICAgICAgICAgICAgbGFiZWwubTExICs9IHggKiB5O1xuICAgICAgICAgICAgICAgIGxhYmVsLm0wMiArPSB5c3E7XG4gICAgICAgICAgICAgICAgbGFiZWwubTIwICs9IHggKiB4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yICggaSA9IDA7IGkgPCBsYWJlbGNvdW50OyBpKyspIHtcbiAgICAgICAgbGFiZWwgPSBsYWJlbHN1bVtpXTtcbiAgICAgICAgaWYgKCFpc05hTihsYWJlbC5tMDApICYmIGxhYmVsLm0wMCAhPT0gMCkge1xuICAgICAgICAgICAgeF8gPSBsYWJlbC5tMTAgLyBsYWJlbC5tMDA7XG4gICAgICAgICAgICB5XyA9IGxhYmVsLm0wMSAvIGxhYmVsLm0wMDtcbiAgICAgICAgICAgIG11MTEgPSBsYWJlbC5tMTEgLyBsYWJlbC5tMDAgLSB4XyAqIHlfO1xuICAgICAgICAgICAgbXUwMiA9IGxhYmVsLm0wMiAvIGxhYmVsLm0wMCAtIHlfICogeV87XG4gICAgICAgICAgICBtdTIwID0gbGFiZWwubTIwIC8gbGFiZWwubTAwIC0geF8gKiB4XztcbiAgICAgICAgICAgIHRtcCA9IChtdTAyIC0gbXUyMCkgLyAoMiAqIG11MTEpO1xuICAgICAgICAgICAgdG1wID0gMC41ICogTWF0aC5hdGFuKHRtcCkgKyAobXUxMSA+PSAwID8gUElfNCA6IC1QSV80ICkgKyBQSTtcbiAgICAgICAgICAgIGxhYmVsLnRoZXRhID0gKHRtcCAqIDE4MCAvIFBJICsgOTApICUgMTgwIC0gOTA7XG4gICAgICAgICAgICBpZiAobGFiZWwudGhldGEgPCAwKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwudGhldGEgKz0gMTgwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFiZWwucmFkID0gdG1wID4gUEkgPyB0bXAgLSBQSSA6IHRtcDtcbiAgICAgICAgICAgIGxhYmVsLnZlYyA9IHZlYzIuY2xvbmUoW01hdGguY29zKHRtcCksIE1hdGguc2luKHRtcCldKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGxhYmVsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIERpc3BsYXlzIHRoZSB7SW1hZ2VXcmFwcGVyfSBpbiBhIGdpdmVuIGNhbnZhc1xuICogQHBhcmFtIGNhbnZhcyB7Q2FudmFzfSBUaGUgY2FudmFzIGVsZW1lbnQgdG8gd3JpdGUgdG9cbiAqIEBwYXJhbSBzY2FsZSB7TnVtYmVyfSBTY2FsZSB3aGljaCBpcyBhcHBsaWVkIHRvIGVhY2ggcGl4ZWwtdmFsdWVcbiAqL1xuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oY2FudmFzLCBzY2FsZSkge1xuICAgIHZhciBjdHgsXG4gICAgICAgIGZyYW1lLFxuICAgICAgICBkYXRhLFxuICAgICAgICBjdXJyZW50LFxuICAgICAgICBwaXhlbCxcbiAgICAgICAgeCxcbiAgICAgICAgeTtcblxuICAgIGlmICghc2NhbGUpIHtcbiAgICAgICAgc2NhbGUgPSAxLjA7XG4gICAgfVxuICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGNhbnZhcy53aWR0aCA9IHRoaXMuc2l6ZS54O1xuICAgIGNhbnZhcy5oZWlnaHQgPSB0aGlzLnNpemUueTtcbiAgICBmcmFtZSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBkYXRhID0gZnJhbWUuZGF0YTtcbiAgICBjdXJyZW50ID0gMDtcbiAgICBmb3IgKHkgPSAwOyB5IDwgdGhpcy5zaXplLnk7IHkrKykge1xuICAgICAgICBmb3IgKHggPSAwOyB4IDwgdGhpcy5zaXplLng7IHgrKykge1xuICAgICAgICAgICAgcGl4ZWwgPSB5ICogdGhpcy5zaXplLnggKyB4O1xuICAgICAgICAgICAgY3VycmVudCA9IHRoaXMuZ2V0KHgsIHkpICogc2NhbGU7XG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDBdID0gY3VycmVudDtcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMV0gPSBjdXJyZW50O1xuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAyXSA9IGN1cnJlbnQ7XG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDNdID0gMjU1O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vZnJhbWUuZGF0YSA9IGRhdGE7XG4gICAgY3R4LnB1dEltYWdlRGF0YShmcmFtZSwgMCwgMCk7XG59O1xuXG4vKipcbiAqIERpc3BsYXlzIHRoZSB7U3ViSW1hZ2V9IGluIGEgZ2l2ZW4gY2FudmFzXG4gKiBAcGFyYW0gY2FudmFzIHtDYW52YXN9IFRoZSBjYW52YXMgZWxlbWVudCB0byB3cml0ZSB0b1xuICogQHBhcmFtIHNjYWxlIHtOdW1iZXJ9IFNjYWxlIHdoaWNoIGlzIGFwcGxpZWQgdG8gZWFjaCBwaXhlbC12YWx1ZVxuICovXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLm92ZXJsYXkgPSBmdW5jdGlvbihjYW52YXMsIHNjYWxlLCBmcm9tKSB7XG4gICAgaWYgKCFzY2FsZSB8fCBzY2FsZSA8IDAgfHwgc2NhbGUgPiAzNjApIHtcbiAgICAgICAgc2NhbGUgPSAzNjA7XG4gICAgfVxuICAgIHZhciBoc3YgPSBbMCwgMSwgMV07XG4gICAgdmFyIHJnYiA9IFswLCAwLCAwXTtcbiAgICB2YXIgd2hpdGVSZ2IgPSBbMjU1LCAyNTUsIDI1NV07XG4gICAgdmFyIGJsYWNrUmdiID0gWzAsIDAsIDBdO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdmFyIGZyYW1lID0gY3R4LmdldEltYWdlRGF0YShmcm9tLngsIGZyb20ueSwgdGhpcy5zaXplLngsIHRoaXMuc2l6ZS55KTtcbiAgICB2YXIgZGF0YSA9IGZyYW1lLmRhdGE7XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMuZGF0YS5sZW5ndGg7XG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIGhzdlswXSA9IHRoaXMuZGF0YVtsZW5ndGhdICogc2NhbGU7XG4gICAgICAgIHJlc3VsdCA9IGhzdlswXSA8PSAwID8gd2hpdGVSZ2IgOiBoc3ZbMF0gPj0gMzYwID8gYmxhY2tSZ2IgOiBDVlV0aWxzLmhzdjJyZ2IoaHN2LCByZ2IpO1xuICAgICAgICBkYXRhW2xlbmd0aCAqIDQgKyAwXSA9IHJlc3VsdFswXTtcbiAgICAgICAgZGF0YVtsZW5ndGggKiA0ICsgMV0gPSByZXN1bHRbMV07XG4gICAgICAgIGRhdGFbbGVuZ3RoICogNCArIDJdID0gcmVzdWx0WzJdO1xuICAgICAgICBkYXRhW2xlbmd0aCAqIDQgKyAzXSA9IDI1NTtcbiAgICB9XG4gICAgY3R4LnB1dEltYWdlRGF0YShmcmFtZSwgZnJvbS54LCBmcm9tLnkpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VXcmFwcGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1hZ2Vfd3JhcHBlci5qc1xuICoqLyIsIi8qKlxuICogQ29uc3RydWN0IHJlcHJlc2VudGluZyBhIHBhcnQgb2YgYW5vdGhlciB7SW1hZ2VXcmFwcGVyfS4gU2hhcmVzIGRhdGFcbiAqIGJldHdlZW4gdGhlIHBhcmVudCBhbmQgdGhlIGNoaWxkLlxuICogQHBhcmFtIGZyb20ge0ltYWdlUmVmfSBUaGUgcG9zaXRpb24gd2hlcmUgdG8gc3RhcnQgdGhlIHtTdWJJbWFnZX0gZnJvbS4gKHRvcC1sZWZ0IGNvcm5lcilcbiAqIEBwYXJhbSBzaXplIHtJbWFnZVJlZn0gVGhlIHNpemUgb2YgdGhlIHJlc3VsdGluZyBpbWFnZVxuICogQHBhcmFtIEkge0ltYWdlV3JhcHBlcn0gVGhlIHtJbWFnZVdyYXBwZXJ9IHRvIHNoYXJlIGZyb21cbiAqIEByZXR1cm5zIHtTdWJJbWFnZX0gQSBzaGFyZWQgcGFydCBvZiB0aGUgb3JpZ2luYWwgaW1hZ2VcbiAqL1xuZnVuY3Rpb24gU3ViSW1hZ2UoZnJvbSwgc2l6ZSwgSSkge1xuICAgIGlmICghSSkge1xuICAgICAgICBJID0ge1xuICAgICAgICAgICAgZGF0YTogbnVsbCxcbiAgICAgICAgICAgIHNpemU6IHNpemVcbiAgICAgICAgfTtcbiAgICB9XG4gICAgdGhpcy5kYXRhID0gSS5kYXRhO1xuICAgIHRoaXMub3JpZ2luYWxTaXplID0gSS5zaXplO1xuICAgIHRoaXMuSSA9IEk7XG5cbiAgICB0aGlzLmZyb20gPSBmcm9tO1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG59XG5cbi8qKlxuICogRGlzcGxheXMgdGhlIHtTdWJJbWFnZX0gaW4gYSBnaXZlbiBjYW52YXNcbiAqIEBwYXJhbSBjYW52YXMge0NhbnZhc30gVGhlIGNhbnZhcyBlbGVtZW50IHRvIHdyaXRlIHRvXG4gKiBAcGFyYW0gc2NhbGUge051bWJlcn0gU2NhbGUgd2hpY2ggaXMgYXBwbGllZCB0byBlYWNoIHBpeGVsLXZhbHVlXG4gKi9cblN1YkltYWdlLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oY2FudmFzLCBzY2FsZSkge1xuICAgIHZhciBjdHgsXG4gICAgICAgIGZyYW1lLFxuICAgICAgICBkYXRhLFxuICAgICAgICBjdXJyZW50LFxuICAgICAgICB5LFxuICAgICAgICB4LFxuICAgICAgICBwaXhlbDtcblxuICAgIGlmICghc2NhbGUpIHtcbiAgICAgICAgc2NhbGUgPSAxLjA7XG4gICAgfVxuICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGNhbnZhcy53aWR0aCA9IHRoaXMuc2l6ZS54O1xuICAgIGNhbnZhcy5oZWlnaHQgPSB0aGlzLnNpemUueTtcbiAgICBmcmFtZSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBkYXRhID0gZnJhbWUuZGF0YTtcbiAgICBjdXJyZW50ID0gMDtcbiAgICBmb3IgKHkgPSAwOyB5IDwgdGhpcy5zaXplLnk7IHkrKykge1xuICAgICAgICBmb3IgKHggPSAwOyB4IDwgdGhpcy5zaXplLng7IHgrKykge1xuICAgICAgICAgICAgcGl4ZWwgPSB5ICogdGhpcy5zaXplLnggKyB4O1xuICAgICAgICAgICAgY3VycmVudCA9IHRoaXMuZ2V0KHgsIHkpICogc2NhbGU7XG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDBdID0gY3VycmVudDtcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMV0gPSBjdXJyZW50O1xuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAyXSA9IGN1cnJlbnQ7XG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDNdID0gMjU1O1xuICAgICAgICB9XG4gICAgfVxuICAgIGZyYW1lLmRhdGEgPSBkYXRhO1xuICAgIGN0eC5wdXRJbWFnZURhdGEoZnJhbWUsIDAsIDApO1xufTtcblxuLyoqXG4gKiBSZXRyaWV2ZXMgYSBnaXZlbiBwaXhlbCBwb3NpdGlvbiBmcm9tIHRoZSB7U3ViSW1hZ2V9XG4gKiBAcGFyYW0geCB7TnVtYmVyfSBUaGUgeC1wb3NpdGlvblxuICogQHBhcmFtIHkge051bWJlcn0gVGhlIHktcG9zaXRpb25cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBncmF5c2NhbGUgdmFsdWUgYXQgdGhlIHBpeGVsLXBvc2l0aW9uXG4gKi9cblN1YkltYWdlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVsodGhpcy5mcm9tLnkgKyB5KSAqIHRoaXMub3JpZ2luYWxTaXplLnggKyB0aGlzLmZyb20ueCArIHhdO1xufTtcblxuLyoqXG4gKiBVcGRhdGVzIHRoZSB1bmRlcmx5aW5nIGRhdGEgZnJvbSBhIGdpdmVuIHtJbWFnZVdyYXBwZXJ9XG4gKiBAcGFyYW0gaW1hZ2Uge0ltYWdlV3JhcHBlcn0gVGhlIHVwZGF0ZWQgaW1hZ2VcbiAqL1xuU3ViSW1hZ2UucHJvdG90eXBlLnVwZGF0ZURhdGEgPSBmdW5jdGlvbihpbWFnZSkge1xuICAgIHRoaXMub3JpZ2luYWxTaXplID0gaW1hZ2Uuc2l6ZTtcbiAgICB0aGlzLmRhdGEgPSBpbWFnZS5kYXRhO1xufTtcblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgc2hhcmVkIGFyZWFcbiAqIEBwYXJhbSBmcm9tIHt4LHl9IFRoZSBuZXcgbG9jYXRpb25cbiAqIEByZXR1cm5zIHtTdWJJbWFnZX0gcmV0dXJucyB7dGhpc30gZm9yIHBvc3NpYmxlIGNoYWluaW5nXG4gKi9cblN1YkltYWdlLnByb3RvdHlwZS51cGRhdGVGcm9tID0gZnVuY3Rpb24oZnJvbSkge1xuICAgIHRoaXMuZnJvbSA9IGZyb207XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5leHBvcnQgZGVmYXVsdCAoU3ViSW1hZ2UpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc3ViSW1hZ2UuanNcbiAqKi8iLCJpbXBvcnQgQ2x1c3RlcjIgZnJvbSAnLi9jbHVzdGVyJztcbmltcG9ydCBBcnJheUhlbHBlciBmcm9tICcuL2FycmF5X2hlbHBlcic7XG5pbXBvcnQge3ZlYzIsIHZlYzN9IGZyb20gJ2dsLW1hdHJpeCc7XG5cbnZhciBDVlV0aWxzID0ge307XG5cbi8qKlxuICogQHBhcmFtIHggeC1jb29yZGluYXRlXG4gKiBAcGFyYW0geSB5LWNvb3JkaW5hdGVcbiAqIEByZXR1cm4gSW1hZ2VSZWZlcmVuY2Uge3gseX0gQ29vcmRpbmF0ZVxuICovXG5DVlV0aWxzLmltYWdlUmVmID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIHZhciB0aGF0ID0ge1xuICAgICAgICB4OiB4LFxuICAgICAgICB5OiB5LFxuICAgICAgICB0b1ZlYzI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHZlYzIuY2xvbmUoW3RoaXMueCwgdGhpcy55XSk7XG4gICAgICAgIH0sXG4gICAgICAgIHRvVmVjMzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdmVjMy5jbG9uZShbdGhpcy54LCB0aGlzLnksIDFdKTtcbiAgICAgICAgfSxcbiAgICAgICAgcm91bmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy54ID0gdGhpcy54ID4gMC4wID8gTWF0aC5mbG9vcih0aGlzLnggKyAwLjUpIDogTWF0aC5mbG9vcih0aGlzLnggLSAwLjUpO1xuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy55ID4gMC4wID8gTWF0aC5mbG9vcih0aGlzLnkgKyAwLjUpIDogTWF0aC5mbG9vcih0aGlzLnkgLSAwLjUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xufTtcblxuLyoqXG4gKiBDb21wdXRlcyBhbiBpbnRlZ3JhbCBpbWFnZSBvZiBhIGdpdmVuIGdyYXlzY2FsZSBpbWFnZS5cbiAqIEBwYXJhbSBpbWFnZURhdGFDb250YWluZXIge0ltYWdlRGF0YUNvbnRhaW5lcn0gdGhlIGltYWdlIHRvIGJlIGludGVncmF0ZWRcbiAqL1xuQ1ZVdGlscy5jb21wdXRlSW50ZWdyYWxJbWFnZTIgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGludGVncmFsV3JhcHBlcikge1xuICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YTtcbiAgICB2YXIgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54O1xuICAgIHZhciBoZWlnaHQgPSBpbWFnZVdyYXBwZXIuc2l6ZS55O1xuICAgIHZhciBpbnRlZ3JhbEltYWdlRGF0YSA9IGludGVncmFsV3JhcHBlci5kYXRhO1xuICAgIHZhciBzdW0gPSAwLCBwb3NBID0gMCwgcG9zQiA9IDAsIHBvc0MgPSAwLCBwb3NEID0gMCwgeCwgeTtcblxuICAgIC8vIHN1bSB1cCBmaXJzdCBjb2x1bW5cbiAgICBwb3NCID0gd2lkdGg7XG4gICAgc3VtID0gMDtcbiAgICBmb3IgKCB5ID0gMTsgeSA8IGhlaWdodDsgeSsrKSB7XG4gICAgICAgIHN1bSArPSBpbWFnZURhdGFbcG9zQV07XG4gICAgICAgIGludGVncmFsSW1hZ2VEYXRhW3Bvc0JdICs9IHN1bTtcbiAgICAgICAgcG9zQSArPSB3aWR0aDtcbiAgICAgICAgcG9zQiArPSB3aWR0aDtcbiAgICB9XG5cbiAgICBwb3NBID0gMDtcbiAgICBwb3NCID0gMTtcbiAgICBzdW0gPSAwO1xuICAgIGZvciAoIHggPSAxOyB4IDwgd2lkdGg7IHgrKykge1xuICAgICAgICBzdW0gKz0gaW1hZ2VEYXRhW3Bvc0FdO1xuICAgICAgICBpbnRlZ3JhbEltYWdlRGF0YVtwb3NCXSArPSBzdW07XG4gICAgICAgIHBvc0ErKztcbiAgICAgICAgcG9zQisrO1xuICAgIH1cblxuICAgIGZvciAoIHkgPSAxOyB5IDwgaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgcG9zQSA9IHkgKiB3aWR0aCArIDE7XG4gICAgICAgIHBvc0IgPSAoeSAtIDEpICogd2lkdGggKyAxO1xuICAgICAgICBwb3NDID0geSAqIHdpZHRoO1xuICAgICAgICBwb3NEID0gKHkgLSAxKSAqIHdpZHRoO1xuICAgICAgICBmb3IgKCB4ID0gMTsgeCA8IHdpZHRoOyB4KyspIHtcbiAgICAgICAgICAgIGludGVncmFsSW1hZ2VEYXRhW3Bvc0FdICs9XG4gICAgICAgICAgICAgICAgaW1hZ2VEYXRhW3Bvc0FdICsgaW50ZWdyYWxJbWFnZURhdGFbcG9zQl0gKyBpbnRlZ3JhbEltYWdlRGF0YVtwb3NDXSAtIGludGVncmFsSW1hZ2VEYXRhW3Bvc0RdO1xuICAgICAgICAgICAgcG9zQSsrO1xuICAgICAgICAgICAgcG9zQisrO1xuICAgICAgICAgICAgcG9zQysrO1xuICAgICAgICAgICAgcG9zRCsrO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuQ1ZVdGlscy5jb21wdXRlSW50ZWdyYWxJbWFnZSA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgaW50ZWdyYWxXcmFwcGVyKSB7XG4gICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhO1xuICAgIHZhciB3aWR0aCA9IGltYWdlV3JhcHBlci5zaXplLng7XG4gICAgdmFyIGhlaWdodCA9IGltYWdlV3JhcHBlci5zaXplLnk7XG4gICAgdmFyIGludGVncmFsSW1hZ2VEYXRhID0gaW50ZWdyYWxXcmFwcGVyLmRhdGE7XG4gICAgdmFyIHN1bSA9IDA7XG5cbiAgICAvLyBzdW0gdXAgZmlyc3Qgcm93XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICAgIHN1bSArPSBpbWFnZURhdGFbaV07XG4gICAgICAgIGludGVncmFsSW1hZ2VEYXRhW2ldID0gc3VtO1xuICAgIH1cblxuICAgIGZvciAodmFyIHYgPSAxOyB2IDwgaGVpZ2h0OyB2KyspIHtcbiAgICAgICAgc3VtID0gMDtcbiAgICAgICAgZm9yICh2YXIgdSA9IDA7IHUgPCB3aWR0aDsgdSsrKSB7XG4gICAgICAgICAgICBzdW0gKz0gaW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdO1xuICAgICAgICAgICAgaW50ZWdyYWxJbWFnZURhdGFbKCh2KSAqIHdpZHRoKSArIHVdID0gc3VtICsgaW50ZWdyYWxJbWFnZURhdGFbKHYgLSAxKSAqIHdpZHRoICsgdV07XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5DVlV0aWxzLnRocmVzaG9sZEltYWdlID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCB0aHJlc2hvbGQsIHRhcmdldFdyYXBwZXIpIHtcbiAgICBpZiAoIXRhcmdldFdyYXBwZXIpIHtcbiAgICAgICAgdGFyZ2V0V3JhcHBlciA9IGltYWdlV3JhcHBlcjtcbiAgICB9XG4gICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhLCBsZW5ndGggPSBpbWFnZURhdGEubGVuZ3RoLCB0YXJnZXREYXRhID0gdGFyZ2V0V3JhcHBlci5kYXRhO1xuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIHRhcmdldERhdGFbbGVuZ3RoXSA9IGltYWdlRGF0YVtsZW5ndGhdIDwgdGhyZXNob2xkID8gMSA6IDA7XG4gICAgfVxufTtcblxuQ1ZVdGlscy5jb21wdXRlSGlzdG9ncmFtID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCBiaXRzUGVyUGl4ZWwpIHtcbiAgICBpZiAoIWJpdHNQZXJQaXhlbCkge1xuICAgICAgICBiaXRzUGVyUGl4ZWwgPSA4O1xuICAgIH1cbiAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGEsXG4gICAgICAgIGxlbmd0aCA9IGltYWdlRGF0YS5sZW5ndGgsXG4gICAgICAgIGJpdFNoaWZ0ID0gOCAtIGJpdHNQZXJQaXhlbCxcbiAgICAgICAgYnVja2V0Q250ID0gMSA8PCBiaXRzUGVyUGl4ZWwsXG4gICAgICAgIGhpc3QgPSBuZXcgSW50MzJBcnJheShidWNrZXRDbnQpO1xuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIGhpc3RbaW1hZ2VEYXRhW2xlbmd0aF0gPj4gYml0U2hpZnRdKys7XG4gICAgfVxuICAgIHJldHVybiBoaXN0O1xufTtcblxuQ1ZVdGlscy5zaGFycGVuTGluZSA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgbGVuZ3RoID0gbGluZS5sZW5ndGgsXG4gICAgICAgIGxlZnQgPSBsaW5lWzBdLFxuICAgICAgICBjZW50ZXIgPSBsaW5lWzFdLFxuICAgICAgICByaWdodDtcblxuICAgIGZvciAoaSA9IDE7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgcmlnaHQgPSBsaW5lW2kgKyAxXTtcbiAgICAgICAgLy8gIC0xIDQgLTEga2VybmVsXG4gICAgICAgIGxpbmVbaSAtIDFdID0gKCgoY2VudGVyICogMikgLSBsZWZ0IC0gcmlnaHQpKSAmIDI1NTtcbiAgICAgICAgbGVmdCA9IGNlbnRlcjtcbiAgICAgICAgY2VudGVyID0gcmlnaHQ7XG4gICAgfVxuICAgIHJldHVybiBsaW5lO1xufTtcblxuQ1ZVdGlscy5kZXRlcm1pbmVPdHN1VGhyZXNob2xkID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCBiaXRzUGVyUGl4ZWwpIHtcbiAgICBpZiAoIWJpdHNQZXJQaXhlbCkge1xuICAgICAgICBiaXRzUGVyUGl4ZWwgPSA4O1xuICAgIH1cbiAgICB2YXIgaGlzdCxcbiAgICAgICAgdGhyZXNob2xkLFxuICAgICAgICBiaXRTaGlmdCA9IDggLSBiaXRzUGVyUGl4ZWw7XG5cbiAgICBmdW5jdGlvbiBweChpbml0LCBlbmQpIHtcbiAgICAgICAgdmFyIHN1bSA9IDAsIGk7XG4gICAgICAgIGZvciAoIGkgPSBpbml0OyBpIDw9IGVuZDsgaSsrKSB7XG4gICAgICAgICAgICBzdW0gKz0gaGlzdFtpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VtO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG14KGluaXQsIGVuZCkge1xuICAgICAgICB2YXIgaSwgc3VtID0gMDtcblxuICAgICAgICBmb3IgKCBpID0gaW5pdDsgaSA8PSBlbmQ7IGkrKykge1xuICAgICAgICAgICAgc3VtICs9IGkgKiBoaXN0W2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN1bTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXRlcm1pbmVUaHJlc2hvbGQoKSB7XG4gICAgICAgIHZhciB2ZXQgPSBbMF0sIHAxLCBwMiwgcDEyLCBrLCBtMSwgbTIsIG0xMixcbiAgICAgICAgICAgIG1heCA9ICgxIDw8IGJpdHNQZXJQaXhlbCkgLSAxO1xuXG4gICAgICAgIGhpc3QgPSBDVlV0aWxzLmNvbXB1dGVIaXN0b2dyYW0oaW1hZ2VXcmFwcGVyLCBiaXRzUGVyUGl4ZWwpO1xuICAgICAgICBmb3IgKCBrID0gMTsgayA8IG1heDsgaysrKSB7XG4gICAgICAgICAgICBwMSA9IHB4KDAsIGspO1xuICAgICAgICAgICAgcDIgPSBweChrICsgMSwgbWF4KTtcbiAgICAgICAgICAgIHAxMiA9IHAxICogcDI7XG4gICAgICAgICAgICBpZiAocDEyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcDEyID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG0xID0gbXgoMCwgaykgKiBwMjtcbiAgICAgICAgICAgIG0yID0gbXgoayArIDEsIG1heCkgKiBwMTtcbiAgICAgICAgICAgIG0xMiA9IG0xIC0gbTI7XG4gICAgICAgICAgICB2ZXRba10gPSBtMTIgKiBtMTIgLyBwMTI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEFycmF5SGVscGVyLm1heEluZGV4KHZldCk7XG4gICAgfVxuXG4gICAgdGhyZXNob2xkID0gZGV0ZXJtaW5lVGhyZXNob2xkKCk7XG4gICAgcmV0dXJuIHRocmVzaG9sZCA8PCBiaXRTaGlmdDtcbn07XG5cbkNWVXRpbHMub3RzdVRocmVzaG9sZCA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgdGFyZ2V0V3JhcHBlcikge1xuICAgIHZhciB0aHJlc2hvbGQgPSBDVlV0aWxzLmRldGVybWluZU90c3VUaHJlc2hvbGQoaW1hZ2VXcmFwcGVyKTtcblxuICAgIENWVXRpbHMudGhyZXNob2xkSW1hZ2UoaW1hZ2VXcmFwcGVyLCB0aHJlc2hvbGQsIHRhcmdldFdyYXBwZXIpO1xuICAgIHJldHVybiB0aHJlc2hvbGQ7XG59O1xuXG4vLyBsb2NhbCB0aHJlc2hvbGRpbmdcbkNWVXRpbHMuY29tcHV0ZUJpbmFyeUltYWdlID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCBpbnRlZ3JhbFdyYXBwZXIsIHRhcmdldFdyYXBwZXIpIHtcbiAgICBDVlV0aWxzLmNvbXB1dGVJbnRlZ3JhbEltYWdlKGltYWdlV3JhcHBlciwgaW50ZWdyYWxXcmFwcGVyKTtcblxuICAgIGlmICghdGFyZ2V0V3JhcHBlcikge1xuICAgICAgICB0YXJnZXRXcmFwcGVyID0gaW1hZ2VXcmFwcGVyO1xuICAgIH1cbiAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGE7XG4gICAgdmFyIHRhcmdldERhdGEgPSB0YXJnZXRXcmFwcGVyLmRhdGE7XG4gICAgdmFyIHdpZHRoID0gaW1hZ2VXcmFwcGVyLnNpemUueDtcbiAgICB2YXIgaGVpZ2h0ID0gaW1hZ2VXcmFwcGVyLnNpemUueTtcbiAgICB2YXIgaW50ZWdyYWxJbWFnZURhdGEgPSBpbnRlZ3JhbFdyYXBwZXIuZGF0YTtcbiAgICB2YXIgc3VtID0gMCwgdiwgdSwga2VybmVsID0gMywgQSwgQiwgQywgRCwgYXZnLCBzaXplID0gKGtlcm5lbCAqIDIgKyAxKSAqIChrZXJuZWwgKiAyICsgMSk7XG5cbiAgICAvLyBjbGVhciBvdXQgdG9wICYgYm90dG9tLWJvcmRlclxuICAgIGZvciAoIHYgPSAwOyB2IDw9IGtlcm5lbDsgdisrKSB7XG4gICAgICAgIGZvciAoIHUgPSAwOyB1IDwgd2lkdGg7IHUrKykge1xuICAgICAgICAgICAgdGFyZ2V0RGF0YVsoKHYpICogd2lkdGgpICsgdV0gPSAwO1xuICAgICAgICAgICAgdGFyZ2V0RGF0YVsoKChoZWlnaHQgLSAxKSAtIHYpICogd2lkdGgpICsgdV0gPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gY2xlYXIgb3V0IGxlZnQgJiByaWdodCBib3JkZXJcbiAgICBmb3IgKCB2ID0ga2VybmVsOyB2IDwgaGVpZ2h0IC0ga2VybmVsOyB2KyspIHtcbiAgICAgICAgZm9yICggdSA9IDA7IHUgPD0ga2VybmVsOyB1KyspIHtcbiAgICAgICAgICAgIHRhcmdldERhdGFbKCh2KSAqIHdpZHRoKSArIHVdID0gMDtcbiAgICAgICAgICAgIHRhcmdldERhdGFbKCh2KSAqIHdpZHRoKSArICh3aWR0aCAtIDEgLSB1KV0gPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yICggdiA9IGtlcm5lbCArIDE7IHYgPCBoZWlnaHQgLSBrZXJuZWwgLSAxOyB2KyspIHtcbiAgICAgICAgZm9yICggdSA9IGtlcm5lbCArIDE7IHUgPCB3aWR0aCAtIGtlcm5lbDsgdSsrKSB7XG4gICAgICAgICAgICBBID0gaW50ZWdyYWxJbWFnZURhdGFbKHYgLSBrZXJuZWwgLSAxKSAqIHdpZHRoICsgKHUgLSBrZXJuZWwgLSAxKV07XG4gICAgICAgICAgICBCID0gaW50ZWdyYWxJbWFnZURhdGFbKHYgLSBrZXJuZWwgLSAxKSAqIHdpZHRoICsgKHUgKyBrZXJuZWwpXTtcbiAgICAgICAgICAgIEMgPSBpbnRlZ3JhbEltYWdlRGF0YVsodiArIGtlcm5lbCkgKiB3aWR0aCArICh1IC0ga2VybmVsIC0gMSldO1xuICAgICAgICAgICAgRCA9IGludGVncmFsSW1hZ2VEYXRhWyh2ICsga2VybmVsKSAqIHdpZHRoICsgKHUgKyBrZXJuZWwpXTtcbiAgICAgICAgICAgIHN1bSA9IEQgLSBDIC0gQiArIEE7XG4gICAgICAgICAgICBhdmcgPSBzdW0gLyAoc2l6ZSk7XG4gICAgICAgICAgICB0YXJnZXREYXRhW3YgKiB3aWR0aCArIHVdID0gaW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdID4gKGF2ZyArIDUpID8gMCA6IDE7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5DVlV0aWxzLmNsdXN0ZXIgPSBmdW5jdGlvbihwb2ludHMsIHRocmVzaG9sZCwgcHJvcGVydHkpIHtcbiAgICB2YXIgaSwgaywgY2x1c3RlciwgcG9pbnQsIGNsdXN0ZXJzID0gW107XG5cbiAgICBpZiAoIXByb3BlcnR5KSB7XG4gICAgICAgIHByb3BlcnR5ID0gXCJyYWRcIjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUb0NsdXN0ZXIobmV3UG9pbnQpIHtcbiAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgICAgIGZvciAoIGsgPSAwOyBrIDwgY2x1c3RlcnMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgIGNsdXN0ZXIgPSBjbHVzdGVyc1trXTtcbiAgICAgICAgICAgIGlmIChjbHVzdGVyLmZpdHMobmV3UG9pbnQpKSB7XG4gICAgICAgICAgICAgICAgY2x1c3Rlci5hZGQobmV3UG9pbnQpO1xuICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgfVxuXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGVhY2ggY2xvdWRcbiAgICBmb3IgKCBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwb2ludCA9IENsdXN0ZXIyLmNyZWF0ZVBvaW50KHBvaW50c1tpXSwgaSwgcHJvcGVydHkpO1xuICAgICAgICBpZiAoIWFkZFRvQ2x1c3Rlcihwb2ludCkpIHtcbiAgICAgICAgICAgIGNsdXN0ZXJzLnB1c2goQ2x1c3RlcjIuY3JlYXRlKHBvaW50LCB0aHJlc2hvbGQpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2x1c3RlcnM7XG59O1xuXG5DVlV0aWxzLlRyYWNlciA9IHtcbiAgICB0cmFjZTogZnVuY3Rpb24ocG9pbnRzLCB2ZWMpIHtcbiAgICAgICAgdmFyIGl0ZXJhdGlvbiwgbWF4SXRlcmF0aW9ucyA9IDEwLCB0b3AgPSBbXSwgcmVzdWx0ID0gW10sIGNlbnRlclBvcyA9IDAsIGN1cnJlbnRQb3MgPSAwO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRyYWNlKGlkeCwgZm9yd2FyZCkge1xuICAgICAgICAgICAgdmFyIGZyb20sIHRvLCB0b0lkeCwgcHJlZGljdGVkUG9zLCB0aHJlc2hvbGRYID0gMSwgdGhyZXNob2xkWSA9IE1hdGguYWJzKHZlY1sxXSAvIDEwKSwgZm91bmQgPSBmYWxzZTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gbWF0Y2gocG9zLCBwcmVkaWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zLnggPiAocHJlZGljdGVkLnggLSB0aHJlc2hvbGRYKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgcG9zLnggPCAocHJlZGljdGVkLnggKyB0aHJlc2hvbGRYKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgcG9zLnkgPiAocHJlZGljdGVkLnkgLSB0aHJlc2hvbGRZKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgcG9zLnkgPCAocHJlZGljdGVkLnkgKyB0aHJlc2hvbGRZKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgbmV4dCBpbmRleCBpcyB3aXRoaW4gdGhlIHZlYyBzcGVjaWZpY2F0aW9uc1xuICAgICAgICAgICAgLy8gaWYgbm90LCBjaGVjayBhcyBsb25nIGFzIHRoZSB0aHJlc2hvbGQgaXMgbWV0XG5cbiAgICAgICAgICAgIGZyb20gPSBwb2ludHNbaWR4XTtcbiAgICAgICAgICAgIGlmIChmb3J3YXJkKSB7XG4gICAgICAgICAgICAgICAgcHJlZGljdGVkUG9zID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBmcm9tLnggKyB2ZWNbMF0sXG4gICAgICAgICAgICAgICAgICAgIHk6IGZyb20ueSArIHZlY1sxXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByZWRpY3RlZFBvcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogZnJvbS54IC0gdmVjWzBdLFxuICAgICAgICAgICAgICAgICAgICB5OiBmcm9tLnkgLSB2ZWNbMV1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b0lkeCA9IGZvcndhcmQgPyBpZHggKyAxIDogaWR4IC0gMTtcbiAgICAgICAgICAgIHRvID0gcG9pbnRzW3RvSWR4XTtcbiAgICAgICAgICAgIHdoaWxlICh0byAmJiAoIGZvdW5kID0gbWF0Y2godG8sIHByZWRpY3RlZFBvcykpICE9PSB0cnVlICYmIChNYXRoLmFicyh0by55IC0gZnJvbS55KSA8IHZlY1sxXSkpIHtcbiAgICAgICAgICAgICAgICB0b0lkeCA9IGZvcndhcmQgPyB0b0lkeCArIDEgOiB0b0lkeCAtIDE7XG4gICAgICAgICAgICAgICAgdG8gPSBwb2ludHNbdG9JZHhdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZm91bmQgPyB0b0lkeCA6IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKCBpdGVyYXRpb24gPSAwOyBpdGVyYXRpb24gPCBtYXhJdGVyYXRpb25zOyBpdGVyYXRpb24rKykge1xuICAgICAgICAgICAgLy8gcmFuZG9tbHkgc2VsZWN0IHBvaW50IHRvIHN0YXJ0IHdpdGhcbiAgICAgICAgICAgIGNlbnRlclBvcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvaW50cy5sZW5ndGgpO1xuXG4gICAgICAgICAgICAvLyB0cmFjZSBmb3J3YXJkXG4gICAgICAgICAgICB0b3AgPSBbXTtcbiAgICAgICAgICAgIGN1cnJlbnRQb3MgPSBjZW50ZXJQb3M7XG4gICAgICAgICAgICB0b3AucHVzaChwb2ludHNbY3VycmVudFBvc10pO1xuICAgICAgICAgICAgd2hpbGUgKCggY3VycmVudFBvcyA9IHRyYWNlKGN1cnJlbnRQb3MsIHRydWUpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRvcC5wdXNoKHBvaW50c1tjdXJyZW50UG9zXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2VudGVyUG9zID4gMCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQb3MgPSBjZW50ZXJQb3M7XG4gICAgICAgICAgICAgICAgd2hpbGUgKCggY3VycmVudFBvcyA9IHRyYWNlKGN1cnJlbnRQb3MsIGZhbHNlKSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9wLnB1c2gocG9pbnRzW2N1cnJlbnRQb3NdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0b3AubGVuZ3RoID4gcmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn07XG5cbkNWVXRpbHMuRElMQVRFID0gMTtcbkNWVXRpbHMuRVJPREUgPSAyO1xuXG5DVlV0aWxzLmRpbGF0ZSA9IGZ1bmN0aW9uKGluSW1hZ2VXcmFwcGVyLCBvdXRJbWFnZVdyYXBwZXIpIHtcbiAgICB2YXIgdixcbiAgICAgICAgdSxcbiAgICAgICAgaW5JbWFnZURhdGEgPSBpbkltYWdlV3JhcHBlci5kYXRhLFxuICAgICAgICBvdXRJbWFnZURhdGEgPSBvdXRJbWFnZVdyYXBwZXIuZGF0YSxcbiAgICAgICAgaGVpZ2h0ID0gaW5JbWFnZVdyYXBwZXIuc2l6ZS55LFxuICAgICAgICB3aWR0aCA9IGluSW1hZ2VXcmFwcGVyLnNpemUueCxcbiAgICAgICAgc3VtLFxuICAgICAgICB5U3RhcnQxLFxuICAgICAgICB5U3RhcnQyLFxuICAgICAgICB4U3RhcnQxLFxuICAgICAgICB4U3RhcnQyO1xuXG4gICAgZm9yICggdiA9IDE7IHYgPCBoZWlnaHQgLSAxOyB2KyspIHtcbiAgICAgICAgZm9yICggdSA9IDE7IHUgPCB3aWR0aCAtIDE7IHUrKykge1xuICAgICAgICAgICAgeVN0YXJ0MSA9IHYgLSAxO1xuICAgICAgICAgICAgeVN0YXJ0MiA9IHYgKyAxO1xuICAgICAgICAgICAgeFN0YXJ0MSA9IHUgLSAxO1xuICAgICAgICAgICAgeFN0YXJ0MiA9IHUgKyAxO1xuICAgICAgICAgICAgc3VtID0gaW5JbWFnZURhdGFbeVN0YXJ0MSAqIHdpZHRoICsgeFN0YXJ0MV0gKyBpbkltYWdlRGF0YVt5U3RhcnQxICogd2lkdGggKyB4U3RhcnQyXSArXG4gICAgICAgICAgICBpbkltYWdlRGF0YVt2ICogd2lkdGggKyB1XSArXG4gICAgICAgICAgICBpbkltYWdlRGF0YVt5U3RhcnQyICogd2lkdGggKyB4U3RhcnQxXSArIGluSW1hZ2VEYXRhW3lTdGFydDIgKiB3aWR0aCArIHhTdGFydDJdO1xuICAgICAgICAgICAgb3V0SW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdID0gc3VtID4gMCA/IDEgOiAwO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuQ1ZVdGlscy5lcm9kZSA9IGZ1bmN0aW9uKGluSW1hZ2VXcmFwcGVyLCBvdXRJbWFnZVdyYXBwZXIpIHtcbiAgICB2YXIgdixcbiAgICAgICAgdSxcbiAgICAgICAgaW5JbWFnZURhdGEgPSBpbkltYWdlV3JhcHBlci5kYXRhLFxuICAgICAgICBvdXRJbWFnZURhdGEgPSBvdXRJbWFnZVdyYXBwZXIuZGF0YSxcbiAgICAgICAgaGVpZ2h0ID0gaW5JbWFnZVdyYXBwZXIuc2l6ZS55LFxuICAgICAgICB3aWR0aCA9IGluSW1hZ2VXcmFwcGVyLnNpemUueCxcbiAgICAgICAgc3VtLFxuICAgICAgICB5U3RhcnQxLFxuICAgICAgICB5U3RhcnQyLFxuICAgICAgICB4U3RhcnQxLFxuICAgICAgICB4U3RhcnQyO1xuXG4gICAgZm9yICggdiA9IDE7IHYgPCBoZWlnaHQgLSAxOyB2KyspIHtcbiAgICAgICAgZm9yICggdSA9IDE7IHUgPCB3aWR0aCAtIDE7IHUrKykge1xuICAgICAgICAgICAgeVN0YXJ0MSA9IHYgLSAxO1xuICAgICAgICAgICAgeVN0YXJ0MiA9IHYgKyAxO1xuICAgICAgICAgICAgeFN0YXJ0MSA9IHUgLSAxO1xuICAgICAgICAgICAgeFN0YXJ0MiA9IHUgKyAxO1xuICAgICAgICAgICAgc3VtID0gaW5JbWFnZURhdGFbeVN0YXJ0MSAqIHdpZHRoICsgeFN0YXJ0MV0gKyBpbkltYWdlRGF0YVt5U3RhcnQxICogd2lkdGggKyB4U3RhcnQyXSArXG4gICAgICAgICAgICBpbkltYWdlRGF0YVt2ICogd2lkdGggKyB1XSArXG4gICAgICAgICAgICBpbkltYWdlRGF0YVt5U3RhcnQyICogd2lkdGggKyB4U3RhcnQxXSArIGluSW1hZ2VEYXRhW3lTdGFydDIgKiB3aWR0aCArIHhTdGFydDJdO1xuICAgICAgICAgICAgb3V0SW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdID0gc3VtID09PSA1ID8gMSA6IDA7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5DVlV0aWxzLnN1YnRyYWN0ID0gZnVuY3Rpb24oYUltYWdlV3JhcHBlciwgYkltYWdlV3JhcHBlciwgcmVzdWx0SW1hZ2VXcmFwcGVyKSB7XG4gICAgaWYgKCFyZXN1bHRJbWFnZVdyYXBwZXIpIHtcbiAgICAgICAgcmVzdWx0SW1hZ2VXcmFwcGVyID0gYUltYWdlV3JhcHBlcjtcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IGFJbWFnZVdyYXBwZXIuZGF0YS5sZW5ndGgsXG4gICAgICAgIGFJbWFnZURhdGEgPSBhSW1hZ2VXcmFwcGVyLmRhdGEsXG4gICAgICAgIGJJbWFnZURhdGEgPSBiSW1hZ2VXcmFwcGVyLmRhdGEsXG4gICAgICAgIGNJbWFnZURhdGEgPSByZXN1bHRJbWFnZVdyYXBwZXIuZGF0YTtcblxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICBjSW1hZ2VEYXRhW2xlbmd0aF0gPSBhSW1hZ2VEYXRhW2xlbmd0aF0gLSBiSW1hZ2VEYXRhW2xlbmd0aF07XG4gICAgfVxufTtcblxuQ1ZVdGlscy5iaXR3aXNlT3IgPSBmdW5jdGlvbihhSW1hZ2VXcmFwcGVyLCBiSW1hZ2VXcmFwcGVyLCByZXN1bHRJbWFnZVdyYXBwZXIpIHtcbiAgICBpZiAoIXJlc3VsdEltYWdlV3JhcHBlcikge1xuICAgICAgICByZXN1bHRJbWFnZVdyYXBwZXIgPSBhSW1hZ2VXcmFwcGVyO1xuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gYUltYWdlV3JhcHBlci5kYXRhLmxlbmd0aCxcbiAgICAgICAgYUltYWdlRGF0YSA9IGFJbWFnZVdyYXBwZXIuZGF0YSxcbiAgICAgICAgYkltYWdlRGF0YSA9IGJJbWFnZVdyYXBwZXIuZGF0YSxcbiAgICAgICAgY0ltYWdlRGF0YSA9IHJlc3VsdEltYWdlV3JhcHBlci5kYXRhO1xuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIGNJbWFnZURhdGFbbGVuZ3RoXSA9IGFJbWFnZURhdGFbbGVuZ3RoXSB8fCBiSW1hZ2VEYXRhW2xlbmd0aF07XG4gICAgfVxufTtcblxuQ1ZVdGlscy5jb3VudE5vblplcm8gPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIpIHtcbiAgICB2YXIgbGVuZ3RoID0gaW1hZ2VXcmFwcGVyLmRhdGEubGVuZ3RoLCBkYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGEsIHN1bSA9IDA7XG5cbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgc3VtICs9IGRhdGFbbGVuZ3RoXTtcbiAgICB9XG4gICAgcmV0dXJuIHN1bTtcbn07XG5cbkNWVXRpbHMudG9wR2VuZXJpYyA9IGZ1bmN0aW9uKGxpc3QsIHRvcCwgc2NvcmVGdW5jKSB7XG4gICAgdmFyIGksIG1pbklkeCA9IDAsIG1pbiA9IDAsIHF1ZXVlID0gW10sIHNjb3JlLCBoaXQsIHBvcztcblxuICAgIGZvciAoIGkgPSAwOyBpIDwgdG9wOyBpKyspIHtcbiAgICAgICAgcXVldWVbaV0gPSB7XG4gICAgICAgICAgICBzY29yZTogMCxcbiAgICAgICAgICAgIGl0ZW06IG51bGxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2NvcmUgPSBzY29yZUZ1bmMuYXBwbHkodGhpcywgW2xpc3RbaV1dKTtcbiAgICAgICAgaWYgKHNjb3JlID4gbWluKSB7XG4gICAgICAgICAgICBoaXQgPSBxdWV1ZVttaW5JZHhdO1xuICAgICAgICAgICAgaGl0LnNjb3JlID0gc2NvcmU7XG4gICAgICAgICAgICBoaXQuaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICBtaW4gPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICAgICAgZm9yICggcG9zID0gMDsgcG9zIDwgdG9wOyBwb3MrKykge1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZVtwb3NdLnNjb3JlIDwgbWluKSB7XG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IHF1ZXVlW3Bvc10uc2NvcmU7XG4gICAgICAgICAgICAgICAgICAgIG1pbklkeCA9IHBvcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcXVldWU7XG59O1xuXG5DVlV0aWxzLmdyYXlBcnJheUZyb21JbWFnZSA9IGZ1bmN0aW9uKGh0bWxJbWFnZSwgb2Zmc2V0WCwgY3R4LCBhcnJheSkge1xuICAgIGN0eC5kcmF3SW1hZ2UoaHRtbEltYWdlLCBvZmZzZXRYLCAwLCBodG1sSW1hZ2Uud2lkdGgsIGh0bWxJbWFnZS5oZWlnaHQpO1xuICAgIHZhciBjdHhEYXRhID0gY3R4LmdldEltYWdlRGF0YShvZmZzZXRYLCAwLCBodG1sSW1hZ2Uud2lkdGgsIGh0bWxJbWFnZS5oZWlnaHQpLmRhdGE7XG4gICAgQ1ZVdGlscy5jb21wdXRlR3JheShjdHhEYXRhLCBhcnJheSk7XG59O1xuXG5DVlV0aWxzLmdyYXlBcnJheUZyb21Db250ZXh0ID0gZnVuY3Rpb24oY3R4LCBzaXplLCBvZmZzZXQsIGFycmF5KSB7XG4gICAgdmFyIGN0eERhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKG9mZnNldC54LCBvZmZzZXQueSwgc2l6ZS54LCBzaXplLnkpLmRhdGE7XG4gICAgQ1ZVdGlscy5jb21wdXRlR3JheShjdHhEYXRhLCBhcnJheSk7XG59O1xuXG5DVlV0aWxzLmdyYXlBbmRIYWxmU2FtcGxlRnJvbUNhbnZhc0RhdGEgPSBmdW5jdGlvbihjYW52YXNEYXRhLCBzaXplLCBvdXRBcnJheSkge1xuICAgIHZhciB0b3BSb3dJZHggPSAwO1xuICAgIHZhciBib3R0b21Sb3dJZHggPSBzaXplLng7XG4gICAgdmFyIGVuZElkeCA9IE1hdGguZmxvb3IoY2FudmFzRGF0YS5sZW5ndGggLyA0KTtcbiAgICB2YXIgb3V0V2lkdGggPSBzaXplLnggLyAyO1xuICAgIHZhciBvdXRJbWdJZHggPSAwO1xuICAgIHZhciBpbldpZHRoID0gc2l6ZS54O1xuICAgIHZhciBpO1xuXG4gICAgd2hpbGUgKGJvdHRvbVJvd0lkeCA8IGVuZElkeCkge1xuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IG91dFdpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIG91dEFycmF5W291dEltZ0lkeF0gPSBNYXRoLmZsb29yKChcbiAgICAgICAgICAgICAgICAoMC4yOTkgKiBjYW52YXNEYXRhW3RvcFJvd0lkeCAqIDQgKyAwXSArXG4gICAgICAgICAgICAgICAgIDAuNTg3ICogY2FudmFzRGF0YVt0b3BSb3dJZHggKiA0ICsgMV0gK1xuICAgICAgICAgICAgICAgICAwLjExNCAqIGNhbnZhc0RhdGFbdG9wUm93SWR4ICogNCArIDJdKSArXG4gICAgICAgICAgICAgICAgKDAuMjk5ICogY2FudmFzRGF0YVsodG9wUm93SWR4ICsgMSkgKiA0ICsgMF0gK1xuICAgICAgICAgICAgICAgICAwLjU4NyAqIGNhbnZhc0RhdGFbKHRvcFJvd0lkeCArIDEpICogNCArIDFdICtcbiAgICAgICAgICAgICAgICAgMC4xMTQgKiBjYW52YXNEYXRhWyh0b3BSb3dJZHggKyAxKSAqIDQgKyAyXSkgK1xuICAgICAgICAgICAgICAgICgwLjI5OSAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCkgKiA0ICsgMF0gK1xuICAgICAgICAgICAgICAgICAwLjU4NyAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCkgKiA0ICsgMV0gK1xuICAgICAgICAgICAgICAgICAwLjExNCAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCkgKiA0ICsgMl0pICtcbiAgICAgICAgICAgICAgICAoMC4yOTkgKiBjYW52YXNEYXRhWyhib3R0b21Sb3dJZHggKyAxKSAqIDQgKyAwXSArXG4gICAgICAgICAgICAgICAgIDAuNTg3ICogY2FudmFzRGF0YVsoYm90dG9tUm93SWR4ICsgMSkgKiA0ICsgMV0gK1xuICAgICAgICAgICAgICAgICAwLjExNCAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCArIDEpICogNCArIDJdKSkgLyA0KTtcbiAgICAgICAgICAgIG91dEltZ0lkeCsrO1xuICAgICAgICAgICAgdG9wUm93SWR4ID0gdG9wUm93SWR4ICsgMjtcbiAgICAgICAgICAgIGJvdHRvbVJvd0lkeCA9IGJvdHRvbVJvd0lkeCArIDI7XG4gICAgICAgIH1cbiAgICAgICAgdG9wUm93SWR4ID0gdG9wUm93SWR4ICsgaW5XaWR0aDtcbiAgICAgICAgYm90dG9tUm93SWR4ID0gYm90dG9tUm93SWR4ICsgaW5XaWR0aDtcbiAgICB9XG59O1xuXG5DVlV0aWxzLmNvbXB1dGVHcmF5ID0gZnVuY3Rpb24oaW1hZ2VEYXRhLCBvdXRBcnJheSwgY29uZmlnKSB7XG4gICAgdmFyIGwgPSAoaW1hZ2VEYXRhLmxlbmd0aCAvIDQpIHwgMCxcbiAgICAgICAgaSxcbiAgICAgICAgc2luZ2xlQ2hhbm5lbCA9IGNvbmZpZyAmJiBjb25maWcuc2luZ2xlQ2hhbm5lbCA9PT0gdHJ1ZTtcblxuICAgIGlmIChzaW5nbGVDaGFubmVsKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIG91dEFycmF5W2ldID0gaW1hZ2VEYXRhW2kgKiA0ICsgMF07XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBvdXRBcnJheVtpXSA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgICAgMC4yOTkgKiBpbWFnZURhdGFbaSAqIDQgKyAwXSArIDAuNTg3ICogaW1hZ2VEYXRhW2kgKiA0ICsgMV0gKyAwLjExNCAqIGltYWdlRGF0YVtpICogNCArIDJdKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbkNWVXRpbHMubG9hZEltYWdlQXJyYXkgPSBmdW5jdGlvbihzcmMsIGNhbGxiYWNrLCBjYW52YXMpIHtcbiAgICBpZiAoIWNhbnZhcykge1xuICAgICAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB9XG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY2FudmFzLndpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcywgMCwgMCk7XG4gICAgICAgIHZhciBhcnJheSA9IG5ldyBVaW50OEFycmF5KHRoaXMud2lkdGggKiB0aGlzLmhlaWdodCk7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcywgMCwgMCk7XG4gICAgICAgIHZhciBkYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkuZGF0YTtcbiAgICAgICAgQ1ZVdGlscy5jb21wdXRlR3JheShkYXRhLCBhcnJheSk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2soYXJyYXksIHtcbiAgICAgICAgICAgIHg6IHRoaXMud2lkdGgsXG4gICAgICAgICAgICB5OiB0aGlzLmhlaWdodFxuICAgICAgICB9LCB0aGlzKTtcbiAgICB9O1xuICAgIGltZy5zcmMgPSBzcmM7XG59O1xuXG4vKipcbiAqIEBwYXJhbSBpbkltZyB7SW1hZ2VXcmFwcGVyfSBpbnB1dCBpbWFnZSB0byBiZSBzYW1wbGVkXG4gKiBAcGFyYW0gb3V0SW1nIHtJbWFnZVdyYXBwZXJ9IHRvIGJlIHN0b3JlZCBpblxuICovXG5DVlV0aWxzLmhhbGZTYW1wbGUgPSBmdW5jdGlvbihpbkltZ1dyYXBwZXIsIG91dEltZ1dyYXBwZXIpIHtcbiAgICB2YXIgaW5JbWcgPSBpbkltZ1dyYXBwZXIuZGF0YTtcbiAgICB2YXIgaW5XaWR0aCA9IGluSW1nV3JhcHBlci5zaXplLng7XG4gICAgdmFyIG91dEltZyA9IG91dEltZ1dyYXBwZXIuZGF0YTtcbiAgICB2YXIgdG9wUm93SWR4ID0gMDtcbiAgICB2YXIgYm90dG9tUm93SWR4ID0gaW5XaWR0aDtcbiAgICB2YXIgZW5kSWR4ID0gaW5JbWcubGVuZ3RoO1xuICAgIHZhciBvdXRXaWR0aCA9IGluV2lkdGggLyAyO1xuICAgIHZhciBvdXRJbWdJZHggPSAwO1xuICAgIHdoaWxlIChib3R0b21Sb3dJZHggPCBlbmRJZHgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvdXRXaWR0aDsgaSsrKSB7XG4gICAgICAgICAgICBvdXRJbWdbb3V0SW1nSWR4XSA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgICAgKGluSW1nW3RvcFJvd0lkeF0gKyBpbkltZ1t0b3BSb3dJZHggKyAxXSArIGluSW1nW2JvdHRvbVJvd0lkeF0gKyBpbkltZ1tib3R0b21Sb3dJZHggKyAxXSkgLyA0KTtcbiAgICAgICAgICAgIG91dEltZ0lkeCsrO1xuICAgICAgICAgICAgdG9wUm93SWR4ID0gdG9wUm93SWR4ICsgMjtcbiAgICAgICAgICAgIGJvdHRvbVJvd0lkeCA9IGJvdHRvbVJvd0lkeCArIDI7XG4gICAgICAgIH1cbiAgICAgICAgdG9wUm93SWR4ID0gdG9wUm93SWR4ICsgaW5XaWR0aDtcbiAgICAgICAgYm90dG9tUm93SWR4ID0gYm90dG9tUm93SWR4ICsgaW5XaWR0aDtcbiAgICB9XG59O1xuXG5DVlV0aWxzLmhzdjJyZ2IgPSBmdW5jdGlvbihoc3YsIHJnYikge1xuICAgIHZhciBoID0gaHN2WzBdLFxuICAgICAgICBzID0gaHN2WzFdLFxuICAgICAgICB2ID0gaHN2WzJdLFxuICAgICAgICBjID0gdiAqIHMsXG4gICAgICAgIHggPSBjICogKDEgLSBNYXRoLmFicygoaCAvIDYwKSAlIDIgLSAxKSksXG4gICAgICAgIG0gPSB2IC0gYyxcbiAgICAgICAgciA9IDAsXG4gICAgICAgIGcgPSAwLFxuICAgICAgICBiID0gMDtcblxuICAgIHJnYiA9IHJnYiB8fCBbMCwgMCwgMF07XG5cbiAgICBpZiAoaCA8IDYwKSB7XG4gICAgICAgIHIgPSBjO1xuICAgICAgICBnID0geDtcbiAgICB9IGVsc2UgaWYgKGggPCAxMjApIHtcbiAgICAgICAgciA9IHg7XG4gICAgICAgIGcgPSBjO1xuICAgIH0gZWxzZSBpZiAoaCA8IDE4MCkge1xuICAgICAgICBnID0gYztcbiAgICAgICAgYiA9IHg7XG4gICAgfSBlbHNlIGlmIChoIDwgMjQwKSB7XG4gICAgICAgIGcgPSB4O1xuICAgICAgICBiID0gYztcbiAgICB9IGVsc2UgaWYgKGggPCAzMDApIHtcbiAgICAgICAgciA9IHg7XG4gICAgICAgIGIgPSBjO1xuICAgIH0gZWxzZSBpZiAoaCA8IDM2MCkge1xuICAgICAgICByID0gYztcbiAgICAgICAgYiA9IHg7XG4gICAgfVxuICAgIHJnYlswXSA9ICgociArIG0pICogMjU1KSB8IDA7XG4gICAgcmdiWzFdID0gKChnICsgbSkgKiAyNTUpIHwgMDtcbiAgICByZ2JbMl0gPSAoKGIgKyBtKSAqIDI1NSkgfCAwO1xuICAgIHJldHVybiByZ2I7XG59O1xuXG5DVlV0aWxzLl9jb21wdXRlRGl2aXNvcnMgPSBmdW5jdGlvbihuKSB7XG4gICAgdmFyIGxhcmdlRGl2aXNvcnMgPSBbXSxcbiAgICAgICAgZGl2aXNvcnMgPSBbXSxcbiAgICAgICAgaTtcblxuICAgIGZvciAoaSA9IDE7IGkgPCBNYXRoLnNxcnQobikgKyAxOyBpKyspIHtcbiAgICAgICAgaWYgKG4gJSBpID09PSAwKSB7XG4gICAgICAgICAgICBkaXZpc29ycy5wdXNoKGkpO1xuICAgICAgICAgICAgaWYgKGkgIT09IG4gLyBpKSB7XG4gICAgICAgICAgICAgICAgbGFyZ2VEaXZpc29ycy51bnNoaWZ0KE1hdGguZmxvb3IobiAvIGkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGl2aXNvcnMuY29uY2F0KGxhcmdlRGl2aXNvcnMpO1xufTtcblxuQ1ZVdGlscy5fY29tcHV0ZUludGVyc2VjdGlvbiA9IGZ1bmN0aW9uKGFycjEsIGFycjIpIHtcbiAgICB2YXIgaSA9IDAsXG4gICAgICAgIGogPSAwLFxuICAgICAgICByZXN1bHQgPSBbXTtcblxuICAgIHdoaWxlIChpIDwgYXJyMS5sZW5ndGggJiYgaiA8IGFycjIubGVuZ3RoKSB7XG4gICAgICAgIGlmIChhcnIxW2ldID09PSBhcnIyW2pdKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChhcnIxW2ldKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGorKztcbiAgICAgICAgfSBlbHNlIGlmIChhcnIxW2ldID4gYXJyMltqXSkge1xuICAgICAgICAgICAgaisrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5DVlV0aWxzLmNhbGN1bGF0ZVBhdGNoU2l6ZSA9IGZ1bmN0aW9uKHBhdGNoU2l6ZSwgaW1nU2l6ZSkge1xuICAgIHZhciBkaXZpc29yc1ggPSB0aGlzLl9jb21wdXRlRGl2aXNvcnMoaW1nU2l6ZS54KSxcbiAgICAgICAgZGl2aXNvcnNZID0gdGhpcy5fY29tcHV0ZURpdmlzb3JzKGltZ1NpemUueSksXG4gICAgICAgIHdpZGVTaWRlID0gTWF0aC5tYXgoaW1nU2l6ZS54LCBpbWdTaXplLnkpLFxuICAgICAgICBjb21tb24gPSB0aGlzLl9jb21wdXRlSW50ZXJzZWN0aW9uKGRpdmlzb3JzWCwgZGl2aXNvcnNZKSxcbiAgICAgICAgbnJPZlBhdGNoZXNMaXN0ID0gWzgsIDEwLCAxNSwgMjAsIDMyLCA2MCwgODBdLFxuICAgICAgICBuck9mUGF0Y2hlc01hcCA9IHtcbiAgICAgICAgICAgIFwieC1zbWFsbFwiOiA1LFxuICAgICAgICAgICAgXCJzbWFsbFwiOiA0LFxuICAgICAgICAgICAgXCJtZWRpdW1cIjogMyxcbiAgICAgICAgICAgIFwibGFyZ2VcIjogMixcbiAgICAgICAgICAgIFwieC1sYXJnZVwiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIG5yT2ZQYXRjaGVzSWR4ID0gbnJPZlBhdGNoZXNNYXBbcGF0Y2hTaXplXSB8fCBuck9mUGF0Y2hlc01hcC5tZWRpdW0sXG4gICAgICAgIG5yT2ZQYXRjaGVzID0gbnJPZlBhdGNoZXNMaXN0W25yT2ZQYXRjaGVzSWR4XSxcbiAgICAgICAgZGVzaXJlZFBhdGNoU2l6ZSA9IE1hdGguZmxvb3Iod2lkZVNpZGUgLyBuck9mUGF0Y2hlcyksXG4gICAgICAgIG9wdGltYWxQYXRjaFNpemU7XG5cbiAgICBmdW5jdGlvbiBmaW5kUGF0Y2hTaXplRm9yRGl2aXNvcnMoZGl2aXNvcnMpIHtcbiAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgICAgZm91bmQgPSBkaXZpc29yc1tNYXRoLmZsb29yKGRpdmlzb3JzLmxlbmd0aCAvIDIpXTtcblxuICAgICAgICB3aGlsZSAoaSA8IChkaXZpc29ycy5sZW5ndGggLSAxKSAmJiBkaXZpc29yc1tpXSA8IGRlc2lyZWRQYXRjaFNpemUpIHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhkaXZpc29yc1tpXSAtIGRlc2lyZWRQYXRjaFNpemUpID4gTWF0aC5hYnMoZGl2aXNvcnNbaSAtIDFdIC0gZGVzaXJlZFBhdGNoU2l6ZSkpIHtcbiAgICAgICAgICAgICAgICBmb3VuZCA9IGRpdmlzb3JzW2kgLSAxXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm91bmQgPSBkaXZpc29yc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVzaXJlZFBhdGNoU2l6ZSAvIGZvdW5kIDwgbnJPZlBhdGNoZXNMaXN0W25yT2ZQYXRjaGVzSWR4ICsgMV0gLyBuck9mUGF0Y2hlc0xpc3RbbnJPZlBhdGNoZXNJZHhdICYmXG4gICAgICAgICAgICBkZXNpcmVkUGF0Y2hTaXplIC8gZm91bmQgPiBuck9mUGF0Y2hlc0xpc3RbbnJPZlBhdGNoZXNJZHggLSAxXSAvIG5yT2ZQYXRjaGVzTGlzdFtuck9mUGF0Y2hlc0lkeF0gKSB7XG4gICAgICAgICAgICByZXR1cm4ge3g6IGZvdW5kLCB5OiBmb3VuZH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgb3B0aW1hbFBhdGNoU2l6ZSA9IGZpbmRQYXRjaFNpemVGb3JEaXZpc29ycyhjb21tb24pO1xuICAgIGlmICghb3B0aW1hbFBhdGNoU2l6ZSkge1xuICAgICAgICBvcHRpbWFsUGF0Y2hTaXplID0gZmluZFBhdGNoU2l6ZUZvckRpdmlzb3JzKHRoaXMuX2NvbXB1dGVEaXZpc29ycyh3aWRlU2lkZSkpO1xuICAgICAgICBpZiAoIW9wdGltYWxQYXRjaFNpemUpIHtcbiAgICAgICAgICAgIG9wdGltYWxQYXRjaFNpemUgPSBmaW5kUGF0Y2hTaXplRm9yRGl2aXNvcnMoKHRoaXMuX2NvbXB1dGVEaXZpc29ycyhkZXNpcmVkUGF0Y2hTaXplICogbnJPZlBhdGNoZXMpKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9wdGltYWxQYXRjaFNpemU7XG59O1xuXG5DVlV0aWxzLl9wYXJzZUNTU0RpbWVuc2lvblZhbHVlcyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIGRpbWVuc2lvbiA9IHtcbiAgICAgICAgdmFsdWU6IHBhcnNlRmxvYXQodmFsdWUpLFxuICAgICAgICB1bml0OiB2YWx1ZS5pbmRleE9mKFwiJVwiKSA9PT0gdmFsdWUubGVuZ3RoIC0gMSA/IFwiJVwiIDogXCIlXCJcbiAgICB9O1xuXG4gICAgcmV0dXJuIGRpbWVuc2lvbjtcbn07XG5cbkNWVXRpbHMuX2RpbWVuc2lvbnNDb252ZXJ0ZXJzID0ge1xuICAgIHRvcDogZnVuY3Rpb24oZGltZW5zaW9uLCBjb250ZXh0KSB7XG4gICAgICAgIGlmIChkaW1lbnNpb24udW5pdCA9PT0gXCIlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKGNvbnRleHQuaGVpZ2h0ICogKGRpbWVuc2lvbi52YWx1ZSAvIDEwMCkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByaWdodDogZnVuY3Rpb24oZGltZW5zaW9uLCBjb250ZXh0KSB7XG4gICAgICAgIGlmIChkaW1lbnNpb24udW5pdCA9PT0gXCIlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKGNvbnRleHQud2lkdGggLSAoY29udGV4dC53aWR0aCAqIChkaW1lbnNpb24udmFsdWUgLyAxMDApKSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGJvdHRvbTogZnVuY3Rpb24oZGltZW5zaW9uLCBjb250ZXh0KSB7XG4gICAgICAgIGlmIChkaW1lbnNpb24udW5pdCA9PT0gXCIlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKGNvbnRleHQuaGVpZ2h0IC0gKGNvbnRleHQuaGVpZ2h0ICogKGRpbWVuc2lvbi52YWx1ZSAvIDEwMCkpKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbGVmdDogZnVuY3Rpb24oZGltZW5zaW9uLCBjb250ZXh0KSB7XG4gICAgICAgIGlmIChkaW1lbnNpb24udW5pdCA9PT0gXCIlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKGNvbnRleHQud2lkdGggKiAoZGltZW5zaW9uLnZhbHVlIC8gMTAwKSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5DVlV0aWxzLmNvbXB1dGVJbWFnZUFyZWEgPSBmdW5jdGlvbihpbnB1dFdpZHRoLCBpbnB1dEhlaWdodCwgYXJlYSkge1xuICAgIHZhciBjb250ZXh0ID0ge3dpZHRoOiBpbnB1dFdpZHRoLCBoZWlnaHQ6IGlucHV0SGVpZ2h0fTtcblxuICAgIHZhciBwYXJzZWRBcmVhID0gT2JqZWN0LmtleXMoYXJlYSkucmVkdWNlKGZ1bmN0aW9uKHJlc3VsdCwga2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGFyZWFba2V5XSxcbiAgICAgICAgICAgIHBhcnNlZCA9IENWVXRpbHMuX3BhcnNlQ1NTRGltZW5zaW9uVmFsdWVzKHZhbHVlKSxcbiAgICAgICAgICAgIGNhbGN1bGF0ZWQgPSBDVlV0aWxzLl9kaW1lbnNpb25zQ29udmVydGVyc1trZXldKHBhcnNlZCwgY29udGV4dCk7XG5cbiAgICAgICAgcmVzdWx0W2tleV0gPSBjYWxjdWxhdGVkO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIHt9KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHN4OiBwYXJzZWRBcmVhLmxlZnQsXG4gICAgICAgIHN5OiBwYXJzZWRBcmVhLnRvcCxcbiAgICAgICAgc3c6IHBhcnNlZEFyZWEucmlnaHQgLSBwYXJzZWRBcmVhLmxlZnQsXG4gICAgICAgIHNoOiBwYXJzZWRBcmVhLmJvdHRvbSAtIHBhcnNlZEFyZWEudG9wXG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENWVXRpbHM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jdl91dGlscy5qc1xuICoqLyIsImltcG9ydCB7dmVjMn0gZnJvbSAnZ2wtbWF0cml4JztcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgY2x1c3RlciBmb3IgZ3JvdXBpbmcgc2ltaWxhciBvcmllbnRhdGlvbnMgb2YgZGF0YXBvaW50c1xuICAgICAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICAgIGNyZWF0ZTogZnVuY3Rpb24ocG9pbnQsIHRocmVzaG9sZCkge1xuICAgICAgICB2YXIgcG9pbnRzID0gW10sXG4gICAgICAgICAgICBjZW50ZXIgPSB7XG4gICAgICAgICAgICAgICAgcmFkOiAwLFxuICAgICAgICAgICAgICAgIHZlYzogdmVjMi5jbG9uZShbMCwgMF0pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9pbnRNYXAgPSB7fTtcblxuICAgICAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgYWRkKHBvaW50KTtcbiAgICAgICAgICAgIHVwZGF0ZUNlbnRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkKHBvaW50VG9BZGQpIHtcbiAgICAgICAgICAgIHBvaW50TWFwW3BvaW50VG9BZGQuaWRdID0gcG9pbnRUb0FkZDtcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKHBvaW50VG9BZGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlQ2VudGVyKCkge1xuICAgICAgICAgICAgdmFyIGksIHN1bSA9IDA7XG4gICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHN1bSArPSBwb2ludHNbaV0ucmFkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2VudGVyLnJhZCA9IHN1bSAvIHBvaW50cy5sZW5ndGg7XG4gICAgICAgICAgICBjZW50ZXIudmVjID0gdmVjMi5jbG9uZShbTWF0aC5jb3MoY2VudGVyLnJhZCksIE1hdGguc2luKGNlbnRlci5yYWQpXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpbml0KCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFkZDogZnVuY3Rpb24ocG9pbnRUb0FkZCkge1xuICAgICAgICAgICAgICAgIGlmICghcG9pbnRNYXBbcG9pbnRUb0FkZC5pZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkKHBvaW50VG9BZGQpO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDZW50ZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZml0czogZnVuY3Rpb24ob3RoZXJQb2ludCkge1xuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGNvc2luZSBzaW1pbGFyaXR5IHRvIGNlbnRlci1hbmdsZVxuICAgICAgICAgICAgICAgIHZhciBzaW1pbGFyaXR5ID0gTWF0aC5hYnModmVjMi5kb3Qob3RoZXJQb2ludC5wb2ludC52ZWMsIGNlbnRlci52ZWMpKTtcbiAgICAgICAgICAgICAgICBpZiAoc2ltaWxhcml0eSA+IHRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFBvaW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvaW50cztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRDZW50ZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjZW50ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjcmVhdGVQb2ludDogZnVuY3Rpb24obmV3UG9pbnQsIGlkLCBwcm9wZXJ0eSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmFkOiBuZXdQb2ludFtwcm9wZXJ0eV0sXG4gICAgICAgICAgICBwb2ludDogbmV3UG9pbnQsXG4gICAgICAgICAgICBpZDogaWRcbiAgICAgICAgfTtcbiAgICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2x1c3Rlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdsLW1hdHJpeFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZ2wtbWF0cml4XCJcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgaW5pdDogZnVuY3Rpb24oYXJyLCB2YWwpIHtcbiAgICAgICAgdmFyIGwgPSBhcnIubGVuZ3RoO1xuICAgICAgICB3aGlsZSAobC0tKSB7XG4gICAgICAgICAgICBhcnJbbF0gPSB2YWw7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2h1ZmZsZXMgdGhlIGNvbnRlbnQgb2YgYW4gYXJyYXlcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gdGhlIGFycmF5IGl0c2VsZiBzaHVmZmxlZFxuICAgICAqL1xuICAgIHNodWZmbGU6IGZ1bmN0aW9uKGFycikge1xuICAgICAgICB2YXIgaSA9IGFyci5sZW5ndGggLSAxLCBqLCB4O1xuICAgICAgICBmb3IgKGk7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSk7XG4gICAgICAgICAgICB4ID0gYXJyW2ldO1xuICAgICAgICAgICAgYXJyW2ldID0gYXJyW2pdO1xuICAgICAgICAgICAgYXJyW2pdID0geDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH0sXG5cbiAgICB0b1BvaW50TGlzdDogZnVuY3Rpb24oYXJyKSB7XG4gICAgICAgIHZhciBpLCBqLCByb3cgPSBbXSwgcm93cyA9IFtdO1xuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcm93ID0gW107XG4gICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IGFycltpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHJvd1tqXSA9IGFycltpXVtqXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvd3NbaV0gPSBcIltcIiArIHJvdy5qb2luKFwiLFwiKSArIFwiXVwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIltcIiArIHJvd3Muam9pbihcIixcXHJcXG5cIikgKyBcIl1cIjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyB0aGUgZWxlbWVudHMgd2hpY2gncyBzY29yZSBpcyBiaWdnZXIgdGhhbiB0aGUgdGhyZXNob2xkXG4gICAgICogQHJldHVybiB7QXJyYXl9IHRoZSByZWR1Y2VkIGFycmF5XG4gICAgICovXG4gICAgdGhyZXNob2xkOiBmdW5jdGlvbihhcnIsIHRocmVzaG9sZCwgc2NvcmVGdW5jKSB7XG4gICAgICAgIHZhciBpLCBxdWV1ZSA9IFtdO1xuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNjb3JlRnVuYy5hcHBseShhcnIsIFthcnJbaV1dKSA+PSB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKGFycltpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHF1ZXVlO1xuICAgIH0sXG5cbiAgICBtYXhJbmRleDogZnVuY3Rpb24oYXJyKSB7XG4gICAgICAgIHZhciBpLCBtYXggPSAwO1xuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGFycltpXSA+IGFyclttYXhdKSB7XG4gICAgICAgICAgICAgICAgbWF4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF4O1xuICAgIH0sXG5cbiAgICBtYXg6IGZ1bmN0aW9uKGFycikge1xuICAgICAgICB2YXIgaSwgbWF4ID0gMDtcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhcnJbaV0gPiBtYXgpIHtcbiAgICAgICAgICAgICAgICBtYXggPSBhcnJbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1heDtcbiAgICB9LFxuXG4gICAgc3VtOiBmdW5jdGlvbihhcnIpIHtcbiAgICAgICAgdmFyIGxlbmd0aCA9IGFyci5sZW5ndGgsXG4gICAgICAgICAgICBzdW0gPSAwO1xuXG4gICAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICAgICAgc3VtICs9IGFycltsZW5ndGhdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdW07XG4gICAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FycmF5X2hlbHBlci5qc1xuICoqLyIsImltcG9ydCBJbWFnZVdyYXBwZXIgZnJvbSAnLi9pbWFnZV93cmFwcGVyJztcbmltcG9ydCBDVlV0aWxzIGZyb20gJy4vY3ZfdXRpbHMnO1xuaW1wb3J0IFJhc3Rlcml6ZXIgZnJvbSAnLi9yYXN0ZXJpemVyJztcbmltcG9ydCBUcmFjZXIgZnJvbSAnLi90cmFjZXInO1xuaW1wb3J0IHNrZWxldG9uaXplciBmcm9tICcuL3NrZWxldG9uaXplcic7XG5pbXBvcnQgQXJyYXlIZWxwZXIgZnJvbSAnLi9hcnJheV9oZWxwZXInO1xuaW1wb3J0IEltYWdlRGVidWcgZnJvbSAnLi9pbWFnZV9kZWJ1Zyc7XG5pbXBvcnQgZ2xNYXRyaXggZnJvbSAnZ2wtbWF0cml4JztcblxudmFyIF9jb25maWcsXG4gICAgX2N1cnJlbnRJbWFnZVdyYXBwZXIsXG4gICAgX3NrZWxJbWFnZVdyYXBwZXIsXG4gICAgX3N1YkltYWdlV3JhcHBlcixcbiAgICBfbGFiZWxJbWFnZVdyYXBwZXIsXG4gICAgX3BhdGNoR3JpZCxcbiAgICBfcGF0Y2hMYWJlbEdyaWQsXG4gICAgX2ltYWdlVG9QYXRjaEdyaWQsXG4gICAgX2JpbmFyeUltYWdlV3JhcHBlcixcbiAgICBfcGF0Y2hTaXplLFxuICAgIF9jYW52YXNDb250YWluZXIgPSB7XG4gICAgICAgIGN0eDoge1xuICAgICAgICAgICAgYmluYXJ5OiBudWxsXG4gICAgICAgIH0sXG4gICAgICAgIGRvbToge1xuICAgICAgICAgICAgYmluYXJ5OiBudWxsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9udW1QYXRjaGVzID0ge3g6IDAsIHk6IDB9LFxuICAgIF9pbnB1dEltYWdlV3JhcHBlcixcbiAgICBfc2tlbGV0b25pemVyLFxuICAgIHZlYzIgPSBnbE1hdHJpeC52ZWMyLFxuICAgIG1hdDIgPSBnbE1hdHJpeC5tYXQyO1xuXG5mdW5jdGlvbiBpbml0QnVmZmVycygpIHtcbiAgICB2YXIgc2tlbGV0b25JbWFnZURhdGE7XG5cbiAgICBpZiAoX2NvbmZpZy5oYWxmU2FtcGxlKSB7XG4gICAgICAgIF9jdXJyZW50SW1hZ2VXcmFwcGVyID0gbmV3IEltYWdlV3JhcHBlcih7XG4gICAgICAgICAgICB4OiBfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS54IC8gMiB8IDAsXG4gICAgICAgICAgICB5OiBfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS55IC8gMiB8IDBcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgX2N1cnJlbnRJbWFnZVdyYXBwZXIgPSBfaW5wdXRJbWFnZVdyYXBwZXI7XG4gICAgfVxuXG4gICAgX3BhdGNoU2l6ZSA9IENWVXRpbHMuY2FsY3VsYXRlUGF0Y2hTaXplKF9jb25maWcucGF0Y2hTaXplLCBfY3VycmVudEltYWdlV3JhcHBlci5zaXplKTtcblxuICAgIF9udW1QYXRjaGVzLnggPSBfY3VycmVudEltYWdlV3JhcHBlci5zaXplLnggLyBfcGF0Y2hTaXplLnggfCAwO1xuICAgIF9udW1QYXRjaGVzLnkgPSBfY3VycmVudEltYWdlV3JhcHBlci5zaXplLnkgLyBfcGF0Y2hTaXplLnkgfCAwO1xuXG4gICAgX2JpbmFyeUltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoX2N1cnJlbnRJbWFnZVdyYXBwZXIuc2l6ZSwgdW5kZWZpbmVkLCBVaW50OEFycmF5LCBmYWxzZSk7XG5cbiAgICBfbGFiZWxJbWFnZVdyYXBwZXIgPSBuZXcgSW1hZ2VXcmFwcGVyKF9wYXRjaFNpemUsIHVuZGVmaW5lZCwgQXJyYXksIHRydWUpO1xuXG4gICAgc2tlbGV0b25JbWFnZURhdGEgPSBuZXcgQXJyYXlCdWZmZXIoNjQgKiAxMDI0KTtcbiAgICBfc3ViSW1hZ2VXcmFwcGVyID0gbmV3IEltYWdlV3JhcHBlcihfcGF0Y2hTaXplLFxuICAgICAgICBuZXcgVWludDhBcnJheShza2VsZXRvbkltYWdlRGF0YSwgMCwgX3BhdGNoU2l6ZS54ICogX3BhdGNoU2l6ZS55KSk7XG4gICAgX3NrZWxJbWFnZVdyYXBwZXIgPSBuZXcgSW1hZ2VXcmFwcGVyKF9wYXRjaFNpemUsXG4gICAgICAgIG5ldyBVaW50OEFycmF5KHNrZWxldG9uSW1hZ2VEYXRhLCBfcGF0Y2hTaXplLnggKiBfcGF0Y2hTaXplLnkgKiAzLCBfcGF0Y2hTaXplLnggKiBfcGF0Y2hTaXplLnkpLFxuICAgICAgICB1bmRlZmluZWQsIHRydWUpO1xuICAgIF9za2VsZXRvbml6ZXIgPSBza2VsZXRvbml6ZXIoKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSA/IHdpbmRvdyA6ICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpID8gc2VsZiA6IGdsb2JhbCwge1xuICAgICAgICBzaXplOiBfcGF0Y2hTaXplLnhcbiAgICB9LCBza2VsZXRvbkltYWdlRGF0YSk7XG5cbiAgICBfaW1hZ2VUb1BhdGNoR3JpZCA9IG5ldyBJbWFnZVdyYXBwZXIoe1xuICAgICAgICB4OiAoX2N1cnJlbnRJbWFnZVdyYXBwZXIuc2l6ZS54IC8gX3N1YkltYWdlV3JhcHBlci5zaXplLngpIHwgMCxcbiAgICAgICAgeTogKF9jdXJyZW50SW1hZ2VXcmFwcGVyLnNpemUueSAvIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS55KSB8IDBcbiAgICB9LCB1bmRlZmluZWQsIEFycmF5LCB0cnVlKTtcbiAgICBfcGF0Y2hHcmlkID0gbmV3IEltYWdlV3JhcHBlcihfaW1hZ2VUb1BhdGNoR3JpZC5zaXplLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgX3BhdGNoTGFiZWxHcmlkID0gbmV3IEltYWdlV3JhcHBlcihfaW1hZ2VUb1BhdGNoR3JpZC5zaXplLCB1bmRlZmluZWQsIEludDMyQXJyYXksIHRydWUpO1xufVxuXG5mdW5jdGlvbiBpbml0Q2FudmFzKCkge1xuICAgIGlmIChfY29uZmlnLnVzZVdvcmtlciB8fCB0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkuY2xhc3NOYW1lID0gXCJiaW5hcnlCdWZmZXJcIjtcbiAgICBpZiAoX2NvbmZpZy5zaG93Q2FudmFzID09PSB0cnVlKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVidWdcIikuYXBwZW5kQ2hpbGQoX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5KTtcbiAgICB9XG4gICAgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5ID0gX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkud2lkdGggPSBfYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueDtcbiAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkuaGVpZ2h0ID0gX2JpbmFyeUltYWdlV3JhcHBlci5zaXplLnk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGJvdW5kaW5nIGJveCB3aGljaCBlbmNsb3NlcyBhbGwgdGhlIGdpdmVuIHBhdGNoZXNcbiAqIEByZXR1cm5zIHtBcnJheX0gVGhlIG1pbmltYWwgYm91bmRpbmcgYm94XG4gKi9cbmZ1bmN0aW9uIGJveEZyb21QYXRjaGVzKHBhdGNoZXMpIHtcbiAgICB2YXIgb3ZlckF2ZyxcbiAgICAgICAgaSxcbiAgICAgICAgaixcbiAgICAgICAgcGF0Y2gsXG4gICAgICAgIHRyYW5zTWF0LFxuICAgICAgICBtaW54ID1cbiAgICAgICAgX2JpbmFyeUltYWdlV3JhcHBlci5zaXplLngsXG4gICAgICAgIG1pbnkgPSBfYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueSxcbiAgICAgICAgbWF4eCA9IC1fYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueCxcbiAgICAgICAgbWF4eSA9IC1fYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueSxcbiAgICAgICAgYm94LFxuICAgICAgICBzY2FsZTtcblxuICAgIC8vIGRyYXcgYWxsIHBhdGNoZXMgd2hpY2ggYXJlIHRvIGJlIHRha2VuIGludG8gY29uc2lkZXJhdGlvblxuICAgIG92ZXJBdmcgPSAwO1xuICAgIGZvciAoIGkgPSAwOyBpIDwgcGF0Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXRjaCA9IHBhdGNoZXNbaV07XG4gICAgICAgIG92ZXJBdmcgKz0gcGF0Y2gucmFkO1xuICAgICAgICBpZiAoX2NvbmZpZy5zaG93UGF0Y2hlcykge1xuICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UmVjdChwYXRjaC5wb3MsIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LCB7Y29sb3I6IFwicmVkXCJ9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG92ZXJBdmcgLz0gcGF0Y2hlcy5sZW5ndGg7XG4gICAgb3ZlckF2ZyA9IChvdmVyQXZnICogMTgwIC8gTWF0aC5QSSArIDkwKSAlIDE4MCAtIDkwO1xuICAgIGlmIChvdmVyQXZnIDwgMCkge1xuICAgICAgICBvdmVyQXZnICs9IDE4MDtcbiAgICB9XG5cbiAgICBvdmVyQXZnID0gKDE4MCAtIG92ZXJBdmcpICogTWF0aC5QSSAvIDE4MDtcbiAgICB0cmFuc01hdCA9IG1hdDIuY2xvbmUoW01hdGguY29zKG92ZXJBdmcpLCBNYXRoLnNpbihvdmVyQXZnKSwgLU1hdGguc2luKG92ZXJBdmcpLCBNYXRoLmNvcyhvdmVyQXZnKV0pO1xuXG4gICAgLy8gaXRlcmF0ZSBvdmVyIHBhdGNoZXMgYW5kIHJvdGF0ZSBieSBhbmdsZVxuICAgIGZvciAoIGkgPSAwOyBpIDwgcGF0Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXRjaCA9IHBhdGNoZXNbaV07XG4gICAgICAgIGZvciAoIGogPSAwOyBqIDwgNDsgaisrKSB7XG4gICAgICAgICAgICB2ZWMyLnRyYW5zZm9ybU1hdDIocGF0Y2guYm94W2pdLCBwYXRjaC5ib3hbal0sIHRyYW5zTWF0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfY29uZmlnLmJveEZyb21QYXRjaGVzLnNob3dUcmFuc2Zvcm1lZCkge1xuICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UGF0aChwYXRjaC5ib3gsIHt4OiAwLCB5OiAxfSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LCB7Y29sb3I6ICcjOTlmZjAwJywgbGluZVdpZHRoOiAyfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmaW5kIGJvdW5kaW5nIGJveFxuICAgIGZvciAoIGkgPSAwOyBpIDwgcGF0Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXRjaCA9IHBhdGNoZXNbaV07XG4gICAgICAgIGZvciAoIGogPSAwOyBqIDwgNDsgaisrKSB7XG4gICAgICAgICAgICBpZiAocGF0Y2guYm94W2pdWzBdIDwgbWlueCkge1xuICAgICAgICAgICAgICAgIG1pbnggPSBwYXRjaC5ib3hbal1bMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGF0Y2guYm94W2pdWzBdID4gbWF4eCkge1xuICAgICAgICAgICAgICAgIG1heHggPSBwYXRjaC5ib3hbal1bMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGF0Y2guYm94W2pdWzFdIDwgbWlueSkge1xuICAgICAgICAgICAgICAgIG1pbnkgPSBwYXRjaC5ib3hbal1bMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGF0Y2guYm94W2pdWzFdID4gbWF4eSkge1xuICAgICAgICAgICAgICAgIG1heHkgPSBwYXRjaC5ib3hbal1bMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBib3ggPSBbW21pbngsIG1pbnldLCBbbWF4eCwgbWlueV0sIFttYXh4LCBtYXh5XSwgW21pbngsIG1heHldXTtcblxuICAgIGlmIChfY29uZmlnLmJveEZyb21QYXRjaGVzLnNob3dUcmFuc2Zvcm1lZEJveCkge1xuICAgICAgICBJbWFnZURlYnVnLmRyYXdQYXRoKGJveCwge3g6IDAsIHk6IDF9LCBfY2FudmFzQ29udGFpbmVyLmN0eC5iaW5hcnksIHtjb2xvcjogJyNmZjAwMDAnLCBsaW5lV2lkdGg6IDJ9KTtcbiAgICB9XG5cbiAgICBzY2FsZSA9IF9jb25maWcuaGFsZlNhbXBsZSA/IDIgOiAxO1xuICAgIC8vIHJldmVyc2Ugcm90YXRpb247XG4gICAgdHJhbnNNYXQgPSBtYXQyLmludmVydCh0cmFuc01hdCwgdHJhbnNNYXQpO1xuICAgIGZvciAoIGogPSAwOyBqIDwgNDsgaisrKSB7XG4gICAgICAgIHZlYzIudHJhbnNmb3JtTWF0Mihib3hbal0sIGJveFtqXSwgdHJhbnNNYXQpO1xuICAgIH1cblxuICAgIGlmIChfY29uZmlnLmJveEZyb21QYXRjaGVzLnNob3dCQikge1xuICAgICAgICBJbWFnZURlYnVnLmRyYXdQYXRoKGJveCwge3g6IDAsIHk6IDF9LCBfY2FudmFzQ29udGFpbmVyLmN0eC5iaW5hcnksIHtjb2xvcjogJyNmZjAwMDAnLCBsaW5lV2lkdGg6IDJ9KTtcbiAgICB9XG5cbiAgICBmb3IgKCBqID0gMDsgaiA8IDQ7IGorKykge1xuICAgICAgICB2ZWMyLnNjYWxlKGJveFtqXSwgYm94W2pdLCBzY2FsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJveDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgYmluYXJ5IGltYWdlIG9mIHRoZSBjdXJyZW50IGltYWdlXG4gKi9cbmZ1bmN0aW9uIGJpbmFyaXplSW1hZ2UoKSB7XG4gICAgQ1ZVdGlscy5vdHN1VGhyZXNob2xkKF9jdXJyZW50SW1hZ2VXcmFwcGVyLCBfYmluYXJ5SW1hZ2VXcmFwcGVyKTtcbiAgICBfYmluYXJ5SW1hZ2VXcmFwcGVyLnplcm9Cb3JkZXIoKTtcbiAgICBpZiAoX2NvbmZpZy5zaG93Q2FudmFzKSB7XG4gICAgICAgIF9iaW5hcnlJbWFnZVdyYXBwZXIuc2hvdyhfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnksIDI1NSk7XG4gICAgfVxufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciB0aGUgZW50aXJlIGltYWdlXG4gKiBleHRyYWN0IHBhdGNoZXNcbiAqL1xuZnVuY3Rpb24gZmluZFBhdGNoZXMoKSB7XG4gICAgdmFyIGksXG4gICAgICAgIGosXG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIG1vbWVudHMsXG4gICAgICAgIHBhdGNoZXNGb3VuZCA9IFtdLFxuICAgICAgICByYXN0ZXJpemVyLFxuICAgICAgICByYXN0ZXJSZXN1bHQsXG4gICAgICAgIHBhdGNoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBfbnVtUGF0Y2hlcy54OyBpKyspIHtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IF9udW1QYXRjaGVzLnk7IGorKykge1xuICAgICAgICAgICAgeCA9IF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS54ICogaTtcbiAgICAgICAgICAgIHkgPSBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueSAqIGo7XG5cbiAgICAgICAgICAgIC8vIHNlcGVyYXRlIHBhcnRzXG4gICAgICAgICAgICBza2VsZXRvbml6ZSh4LCB5KTtcblxuICAgICAgICAgICAgLy8gUmFzdGVyaXplLCBmaW5kIGluZGl2aWR1YWwgYmFyc1xuICAgICAgICAgICAgX3NrZWxJbWFnZVdyYXBwZXIuemVyb0JvcmRlcigpO1xuICAgICAgICAgICAgQXJyYXlIZWxwZXIuaW5pdChfbGFiZWxJbWFnZVdyYXBwZXIuZGF0YSwgMCk7XG4gICAgICAgICAgICByYXN0ZXJpemVyID0gUmFzdGVyaXplci5jcmVhdGUoX3NrZWxJbWFnZVdyYXBwZXIsIF9sYWJlbEltYWdlV3JhcHBlcik7XG4gICAgICAgICAgICByYXN0ZXJSZXN1bHQgPSByYXN0ZXJpemVyLnJhc3Rlcml6ZSgwKTtcblxuICAgICAgICAgICAgaWYgKF9jb25maWcuc2hvd0xhYmVscykge1xuICAgICAgICAgICAgICAgIF9sYWJlbEltYWdlV3JhcHBlci5vdmVybGF5KF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeSwgTWF0aC5mbG9vcigzNjAgLyByYXN0ZXJSZXN1bHQuY291bnQpLFxuICAgICAgICAgICAgICAgICAgICB7eDogeCwgeTogeX0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgbW9tZW50cyBmcm9tIHRoZSBza2VsZXRvbml6ZWQgcGF0Y2hcbiAgICAgICAgICAgIG1vbWVudHMgPSBfbGFiZWxJbWFnZVdyYXBwZXIubW9tZW50cyhyYXN0ZXJSZXN1bHQuY291bnQpO1xuXG4gICAgICAgICAgICAvLyBleHRyYWN0IGVsaWdpYmxlIHBhdGNoZXNcbiAgICAgICAgICAgIHBhdGNoZXNGb3VuZCA9IHBhdGNoZXNGb3VuZC5jb25jYXQoZGVzY3JpYmVQYXRjaChtb21lbnRzLCBbaSwgal0sIHgsIHkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChfY29uZmlnLnNob3dGb3VuZFBhdGNoZXMpIHtcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBwYXRjaGVzRm91bmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhdGNoID0gcGF0Y2hlc0ZvdW5kW2ldO1xuICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UmVjdChwYXRjaC5wb3MsIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LFxuICAgICAgICAgICAgICAgIHtjb2xvcjogXCIjOTlmZjAwXCIsIGxpbmVXaWR0aDogMn0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdGNoZXNGb3VuZDtcbn1cblxuLyoqXG4gKiBGaW5kcyB0aG9zZSBjb25uZWN0ZWQgYXJlYXMgd2hpY2ggY29udGFpbiBhdCBsZWFzdCA2IHBhdGNoZXNcbiAqIGFuZCByZXR1cm5zIHRoZW0gb3JkZXJlZCBERVNDIGJ5IHRoZSBudW1iZXIgb2YgY29udGFpbmVkIHBhdGNoZXNcbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXhMYWJlbFxuICovXG5mdW5jdGlvbiBmaW5kQmlnZ2VzdENvbm5lY3RlZEFyZWFzKG1heExhYmVsKXtcbiAgICB2YXIgaSxcbiAgICAgICAgc3VtLFxuICAgICAgICBsYWJlbEhpc3QgPSBbXSxcbiAgICAgICAgdG9wTGFiZWxzID0gW107XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8IG1heExhYmVsOyBpKyspIHtcbiAgICAgICAgbGFiZWxIaXN0LnB1c2goMCk7XG4gICAgfVxuICAgIHN1bSA9IF9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aDtcbiAgICB3aGlsZSAoc3VtLS0pIHtcbiAgICAgICAgaWYgKF9wYXRjaExhYmVsR3JpZC5kYXRhW3N1bV0gPiAwKSB7XG4gICAgICAgICAgICBsYWJlbEhpc3RbX3BhdGNoTGFiZWxHcmlkLmRhdGFbc3VtXSAtIDFdKys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsYWJlbEhpc3QgPSBsYWJlbEhpc3QubWFwKGZ1bmN0aW9uKHZhbCwgaWR4KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWw6IHZhbCxcbiAgICAgICAgICAgIGxhYmVsOiBpZHggKyAxXG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICBsYWJlbEhpc3Quc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHJldHVybiBiLnZhbCAtIGEudmFsO1xuICAgIH0pO1xuXG4gICAgLy8gZXh0cmFjdCB0b3AgYXJlYXMgd2l0aCBhdCBsZWFzdCA2IHBhdGNoZXMgcHJlc2VudFxuICAgIHRvcExhYmVscyA9IGxhYmVsSGlzdC5maWx0ZXIoZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgcmV0dXJuIGVsLnZhbCA+PSA1O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvcExhYmVscztcbn1cblxuLyoqXG4gKlxuICovXG5mdW5jdGlvbiBmaW5kQm94ZXModG9wTGFiZWxzLCBtYXhMYWJlbCkge1xuICAgIHZhciBpLFxuICAgICAgICBqLFxuICAgICAgICBzdW0sXG4gICAgICAgIHBhdGNoZXMgPSBbXSxcbiAgICAgICAgcGF0Y2gsXG4gICAgICAgIGJveCxcbiAgICAgICAgYm94ZXMgPSBbXSxcbiAgICAgICAgaHN2ID0gWzAsIDEsIDFdLFxuICAgICAgICByZ2IgPSBbMCwgMCwgMF07XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8IHRvcExhYmVscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzdW0gPSBfcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGg7XG4gICAgICAgIHBhdGNoZXMubGVuZ3RoID0gMDtcbiAgICAgICAgd2hpbGUgKHN1bS0tKSB7XG4gICAgICAgICAgICBpZiAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbc3VtXSA9PT0gdG9wTGFiZWxzW2ldLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2ggPSBfaW1hZ2VUb1BhdGNoR3JpZC5kYXRhW3N1bV07XG4gICAgICAgICAgICAgICAgcGF0Y2hlcy5wdXNoKHBhdGNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBib3ggPSBib3hGcm9tUGF0Y2hlcyhwYXRjaGVzKTtcbiAgICAgICAgaWYgKGJveCkge1xuICAgICAgICAgICAgYm94ZXMucHVzaChib3gpO1xuXG4gICAgICAgICAgICAvLyBkcmF3IHBhdGNoLWxhYmVscyBpZiByZXF1ZXN0ZWRcbiAgICAgICAgICAgIGlmIChfY29uZmlnLnNob3dSZW1haW5pbmdQYXRjaExhYmVscykge1xuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgcGF0Y2hlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBwYXRjaCA9IHBhdGNoZXNbal07XG4gICAgICAgICAgICAgICAgICAgIGhzdlswXSA9ICh0b3BMYWJlbHNbaV0ubGFiZWwgLyAobWF4TGFiZWwgKyAxKSkgKiAzNjA7XG4gICAgICAgICAgICAgICAgICAgIENWVXRpbHMuaHN2MnJnYihoc3YsIHJnYik7XG4gICAgICAgICAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1JlY3QocGF0Y2gucG9zLCBfc3ViSW1hZ2VXcmFwcGVyLnNpemUsIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtjb2xvcjogXCJyZ2IoXCIgKyByZ2Iuam9pbihcIixcIikgKyBcIilcIiwgbGluZVdpZHRoOiAyfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBib3hlcztcbn1cblxuLyoqXG4gKiBGaW5kIHNpbWlsYXIgbW9tZW50cyAodmlhIGNsdXN0ZXIpXG4gKiBAcGFyYW0ge09iamVjdH0gbW9tZW50c1xuICovXG5mdW5jdGlvbiBzaW1pbGFyTW9tZW50cyhtb21lbnRzKSB7XG4gICAgdmFyIGNsdXN0ZXJzID0gQ1ZVdGlscy5jbHVzdGVyKG1vbWVudHMsIDAuOTApO1xuICAgIHZhciB0b3BDbHVzdGVyID0gQ1ZVdGlscy50b3BHZW5lcmljKGNsdXN0ZXJzLCAxLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBlLmdldFBvaW50cygpLmxlbmd0aDtcbiAgICB9KTtcbiAgICB2YXIgcG9pbnRzID0gW10sIHJlc3VsdCA9IFtdO1xuICAgIGlmICh0b3BDbHVzdGVyLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBwb2ludHMgPSB0b3BDbHVzdGVyWzBdLml0ZW0uZ2V0UG9pbnRzKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChwb2ludHNbaV0ucG9pbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHNrZWxldG9uaXplKHgsIHkpIHtcbiAgICBfYmluYXJ5SW1hZ2VXcmFwcGVyLnN1YkltYWdlQXNDb3B5KF9zdWJJbWFnZVdyYXBwZXIsIENWVXRpbHMuaW1hZ2VSZWYoeCwgeSkpO1xuICAgIF9za2VsZXRvbml6ZXIuc2tlbGV0b25pemUoKTtcblxuICAgIC8vIFNob3cgc2tlbGV0b24gaWYgcmVxdWVzdGVkXG4gICAgaWYgKF9jb25maWcuc2hvd1NrZWxldG9uKSB7XG4gICAgICAgIF9za2VsSW1hZ2VXcmFwcGVyLm92ZXJsYXkoX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5LCAzNjAsIENWVXRpbHMuaW1hZ2VSZWYoeCwgeSkpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBFeHRyYWN0cyBhbmQgZGVzY3JpYmVzIHRob3NlIHBhdGNoZXMgd2hpY2ggc2VlbSB0byBjb250YWluIGEgYmFyY29kZSBwYXR0ZXJuXG4gKiBAcGFyYW0ge0FycmF5fSBtb21lbnRzXG4gKiBAcGFyYW0ge09iamVjdH0gcGF0Y2hQb3MsXG4gKiBAcGFyYW0ge051bWJlcn0geFxuICogQHBhcmFtIHtOdW1iZXJ9IHlcbiAqIEByZXR1cm5zIHtBcnJheX0gbGlzdCBvZiBwYXRjaGVzXG4gKi9cbmZ1bmN0aW9uIGRlc2NyaWJlUGF0Y2gobW9tZW50cywgcGF0Y2hQb3MsIHgsIHkpIHtcbiAgICB2YXIgayxcbiAgICAgICAgYXZnLFxuICAgICAgICBlbGlnaWJsZU1vbWVudHMgPSBbXSxcbiAgICAgICAgbWF0Y2hpbmdNb21lbnRzLFxuICAgICAgICBwYXRjaCxcbiAgICAgICAgcGF0Y2hlc0ZvdW5kID0gW10sXG4gICAgICAgIG1pbkNvbXBvbmVudFdlaWdodCA9IE1hdGguY2VpbChfcGF0Y2hTaXplLnggLyAzKTtcblxuICAgIGlmIChtb21lbnRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgIC8vIG9ubHkgY29sbGVjdCBtb21lbnRzIHdoaWNoJ3MgYXJlYSBjb3ZlcnMgYXQgbGVhc3QgbWluQ29tcG9uZW50V2VpZ2h0IHBpeGVscy5cbiAgICAgICAgZm9yICggayA9IDA7IGsgPCBtb21lbnRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBpZiAobW9tZW50c1trXS5tMDAgPiBtaW5Db21wb25lbnRXZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBlbGlnaWJsZU1vbWVudHMucHVzaChtb21lbnRzW2tdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIGF0IGxlYXN0IDIgbW9tZW50cyBhcmUgZm91bmQgd2hpY2ggaGF2ZSBhdCBsZWFzdCBtaW5Db21wb25lbnRXZWlnaHRzIGNvdmVyZWRcbiAgICAgICAgaWYgKGVsaWdpYmxlTW9tZW50cy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgbWF0Y2hpbmdNb21lbnRzID0gc2ltaWxhck1vbWVudHMoZWxpZ2libGVNb21lbnRzKTtcbiAgICAgICAgICAgIGF2ZyA9IDA7XG4gICAgICAgICAgICAvLyBkZXRlcm1pbmUgdGhlIHNpbWlsYXJpdHkgb2YgdGhlIG1vbWVudHNcbiAgICAgICAgICAgIGZvciAoIGsgPSAwOyBrIDwgbWF0Y2hpbmdNb21lbnRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgYXZnICs9IG1hdGNoaW5nTW9tZW50c1trXS5yYWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE9ubHkgdHdvIG9mIHRoZSBtb21lbnRzIGFyZSBhbGxvd2VkIG5vdCB0byBmaXQgaW50byB0aGUgZXF1YXRpb25cbiAgICAgICAgICAgIC8vIGFkZCB0aGUgcGF0Y2ggdG8gdGhlIHNldFxuICAgICAgICAgICAgaWYgKG1hdGNoaW5nTW9tZW50cy5sZW5ndGggPiAxXG4gICAgICAgICAgICAgICAgICAgICYmIG1hdGNoaW5nTW9tZW50cy5sZW5ndGggPj0gKGVsaWdpYmxlTW9tZW50cy5sZW5ndGggLyA0KSAqIDNcbiAgICAgICAgICAgICAgICAgICAgJiYgbWF0Y2hpbmdNb21lbnRzLmxlbmd0aCA+IG1vbWVudHMubGVuZ3RoIC8gNCkge1xuICAgICAgICAgICAgICAgIGF2ZyAvPSBtYXRjaGluZ01vbWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHBhdGNoID0ge1xuICAgICAgICAgICAgICAgICAgICBpbmRleDogcGF0Y2hQb3NbMV0gKiBfbnVtUGF0Y2hlcy54ICsgcGF0Y2hQb3NbMF0sXG4gICAgICAgICAgICAgICAgICAgIHBvczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHlcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYm94OiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZWMyLmNsb25lKFt4LCB5XSksXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZWMyLmNsb25lKFt4ICsgX3N1YkltYWdlV3JhcHBlci5zaXplLngsIHldKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlYzIuY2xvbmUoW3ggKyBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueCwgeSArIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS55XSksXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZWMyLmNsb25lKFt4LCB5ICsgX3N1YkltYWdlV3JhcHBlci5zaXplLnldKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBtb21lbnRzOiBtYXRjaGluZ01vbWVudHMsXG4gICAgICAgICAgICAgICAgICAgIHJhZDogYXZnLFxuICAgICAgICAgICAgICAgICAgICB2ZWM6IHZlYzIuY2xvbmUoW01hdGguY29zKGF2ZyksIE1hdGguc2luKGF2ZyldKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcGF0Y2hlc0ZvdW5kLnB1c2gocGF0Y2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYXRjaGVzRm91bmQ7XG59XG5cbi8qKlxuICogZmluZHMgcGF0Y2hlcyB3aGljaCBhcmUgY29ubmVjdGVkIGFuZCBzaGFyZSB0aGUgc2FtZSBvcmllbnRhdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHBhdGNoZXNGb3VuZFxuICovXG5mdW5jdGlvbiByYXN0ZXJpemVBbmd1bGFyU2ltaWxhcml0eShwYXRjaGVzRm91bmQpIHtcbiAgICB2YXIgbGFiZWwgPSAwLFxuICAgICAgICB0aHJlc2hvbGQgPSAwLjk1LFxuICAgICAgICBjdXJySWR4ID0gMCxcbiAgICAgICAgaixcbiAgICAgICAgcGF0Y2gsXG4gICAgICAgIGhzdiA9IFswLCAxLCAxXSxcbiAgICAgICAgcmdiID0gWzAsIDAsIDBdO1xuXG4gICAgZnVuY3Rpb24gbm90WWV0UHJvY2Vzc2VkKCkge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBfcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKF9wYXRjaExhYmVsR3JpZC5kYXRhW2ldID09PSAwICYmIF9wYXRjaEdyaWQuZGF0YVtpXSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfcGF0Y2hMYWJlbEdyaWQubGVuZ3RoO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYWNlKGN1cnJlbnRJZHgpIHtcbiAgICAgICAgdmFyIHgsXG4gICAgICAgICAgICB5LFxuICAgICAgICAgICAgY3VycmVudFBhdGNoLFxuICAgICAgICAgICAgaWR4LFxuICAgICAgICAgICAgZGlyLFxuICAgICAgICAgICAgY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBjdXJyZW50SWR4ICUgX3BhdGNoTGFiZWxHcmlkLnNpemUueCxcbiAgICAgICAgICAgICAgICB5OiAoY3VycmVudElkeCAvIF9wYXRjaExhYmVsR3JpZC5zaXplLngpIHwgMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNpbWlsYXJpdHk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRJZHggPCBfcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQYXRjaCA9IF9pbWFnZVRvUGF0Y2hHcmlkLmRhdGFbY3VycmVudElkeF07XG4gICAgICAgICAgICAvLyBhc3NpZ24gbGFiZWxcbiAgICAgICAgICAgIF9wYXRjaExhYmVsR3JpZC5kYXRhW2N1cnJlbnRJZHhdID0gbGFiZWw7XG4gICAgICAgICAgICBmb3IgKCBkaXIgPSAwOyBkaXIgPCBUcmFjZXIuc2VhcmNoRGlyZWN0aW9ucy5sZW5ndGg7IGRpcisrKSB7XG4gICAgICAgICAgICAgICAgeSA9IGN1cnJlbnQueSArIFRyYWNlci5zZWFyY2hEaXJlY3Rpb25zW2Rpcl1bMF07XG4gICAgICAgICAgICAgICAgeCA9IGN1cnJlbnQueCArIFRyYWNlci5zZWFyY2hEaXJlY3Rpb25zW2Rpcl1bMV07XG4gICAgICAgICAgICAgICAgaWR4ID0geSAqIF9wYXRjaExhYmVsR3JpZC5zaXplLnggKyB4O1xuXG4gICAgICAgICAgICAgICAgLy8gY29udGludWUgaWYgcGF0Y2ggZW1wdHlcbiAgICAgICAgICAgICAgICBpZiAoX3BhdGNoR3JpZC5kYXRhW2lkeF0gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgX3BhdGNoTGFiZWxHcmlkLmRhdGFbaWR4XSA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChfcGF0Y2hMYWJlbEdyaWQuZGF0YVtpZHhdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNpbWlsYXJpdHkgPSBNYXRoLmFicyh2ZWMyLmRvdChfaW1hZ2VUb1BhdGNoR3JpZC5kYXRhW2lkeF0udmVjLCBjdXJyZW50UGF0Y2gudmVjKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaW1pbGFyaXR5ID4gdGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFjZShpZHgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcHJlcGFyZSBmb3IgZmluZGluZyB0aGUgcmlnaHQgcGF0Y2hlc1xuICAgIEFycmF5SGVscGVyLmluaXQoX3BhdGNoR3JpZC5kYXRhLCAwKTtcbiAgICBBcnJheUhlbHBlci5pbml0KF9wYXRjaExhYmVsR3JpZC5kYXRhLCAwKTtcbiAgICBBcnJheUhlbHBlci5pbml0KF9pbWFnZVRvUGF0Y2hHcmlkLmRhdGEsIG51bGwpO1xuXG4gICAgZm9yICggaiA9IDA7IGogPCBwYXRjaGVzRm91bmQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgcGF0Y2ggPSBwYXRjaGVzRm91bmRbal07XG4gICAgICAgIF9pbWFnZVRvUGF0Y2hHcmlkLmRhdGFbcGF0Y2guaW5kZXhdID0gcGF0Y2g7XG4gICAgICAgIF9wYXRjaEdyaWQuZGF0YVtwYXRjaC5pbmRleF0gPSAxO1xuICAgIH1cblxuICAgIC8vIHJhc3Rlcml6ZSB0aGUgcGF0Y2hlcyBmb3VuZCB0byBkZXRlcm1pbmUgYXJlYVxuICAgIF9wYXRjaEdyaWQuemVyb0JvcmRlcigpO1xuXG4gICAgd2hpbGUgKCggY3VycklkeCA9IG5vdFlldFByb2Nlc3NlZCgpKSA8IF9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aCkge1xuICAgICAgICBsYWJlbCsrO1xuICAgICAgICB0cmFjZShjdXJySWR4KTtcbiAgICB9XG5cbiAgICAvLyBkcmF3IHBhdGNoLWxhYmVscyBpZiByZXF1ZXN0ZWRcbiAgICBpZiAoX2NvbmZpZy5zaG93UGF0Y2hMYWJlbHMpIHtcbiAgICAgICAgZm9yICggaiA9IDA7IGogPCBfcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKF9wYXRjaExhYmVsR3JpZC5kYXRhW2pdID4gMCAmJiBfcGF0Y2hMYWJlbEdyaWQuZGF0YVtqXSA8PSBsYWJlbCkge1xuICAgICAgICAgICAgICAgIHBhdGNoID0gX2ltYWdlVG9QYXRjaEdyaWQuZGF0YVtqXTtcbiAgICAgICAgICAgICAgICBoc3ZbMF0gPSAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbal0gLyAobGFiZWwgKyAxKSkgKiAzNjA7XG4gICAgICAgICAgICAgICAgQ1ZVdGlscy5oc3YycmdiKGhzdiwgcmdiKTtcbiAgICAgICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdSZWN0KHBhdGNoLnBvcywgX3N1YkltYWdlV3JhcHBlci5zaXplLCBfY2FudmFzQ29udGFpbmVyLmN0eC5iaW5hcnksXG4gICAgICAgICAgICAgICAgICAgIHtjb2xvcjogXCJyZ2IoXCIgKyByZ2Iuam9pbihcIixcIikgKyBcIilcIiwgbGluZVdpZHRoOiAyfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGFiZWw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbml0OiBmdW5jdGlvbihpbnB1dEltYWdlV3JhcHBlciwgY29uZmlnKSB7XG4gICAgICAgIF9jb25maWcgPSBjb25maWc7XG4gICAgICAgIF9pbnB1dEltYWdlV3JhcHBlciA9IGlucHV0SW1hZ2VXcmFwcGVyO1xuXG4gICAgICAgIGluaXRCdWZmZXJzKCk7XG4gICAgICAgIGluaXRDYW52YXMoKTtcbiAgICB9LFxuXG4gICAgbG9jYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBhdGNoZXNGb3VuZCxcbiAgICAgICAgICAgIHRvcExhYmVscyxcbiAgICAgICAgICAgIGJveGVzO1xuXG4gICAgICAgIGlmIChfY29uZmlnLmhhbGZTYW1wbGUpIHtcbiAgICAgICAgICAgIENWVXRpbHMuaGFsZlNhbXBsZShfaW5wdXRJbWFnZVdyYXBwZXIsIF9jdXJyZW50SW1hZ2VXcmFwcGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJpbmFyaXplSW1hZ2UoKTtcbiAgICAgICAgcGF0Y2hlc0ZvdW5kID0gZmluZFBhdGNoZXMoKTtcbiAgICAgICAgLy8gcmV0dXJuIHVubGVzcyA1JSBvciBtb3JlIHBhdGNoZXMgYXJlIGZvdW5kXG4gICAgICAgIGlmIChwYXRjaGVzRm91bmQubGVuZ3RoIDwgX251bVBhdGNoZXMueCAqIF9udW1QYXRjaGVzLnkgKiAwLjA1KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJhc3RlcnJpemUgYXJlYSBieSBjb21wYXJpbmcgYW5ndWxhciBzaW1pbGFyaXR5O1xuICAgICAgICB2YXIgbWF4TGFiZWwgPSByYXN0ZXJpemVBbmd1bGFyU2ltaWxhcml0eShwYXRjaGVzRm91bmQpO1xuICAgICAgICBpZiAobWF4TGFiZWwgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNlYXJjaCBmb3IgYXJlYSB3aXRoIHRoZSBtb3N0IHBhdGNoZXMgKGJpZ2dlc3QgY29ubmVjdGVkIGFyZWEpXG4gICAgICAgIHRvcExhYmVscyA9IGZpbmRCaWdnZXN0Q29ubmVjdGVkQXJlYXMobWF4TGFiZWwpO1xuICAgICAgICBpZiAodG9wTGFiZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBib3hlcyA9IGZpbmRCb3hlcyh0b3BMYWJlbHMsIG1heExhYmVsKTtcbiAgICAgICAgcmV0dXJuIGJveGVzO1xuICAgIH0sXG5cbiAgICBjaGVja0ltYWdlQ29uc3RyYWludHM6IGZ1bmN0aW9uKGlucHV0U3RyZWFtLCBjb25maWcpIHtcbiAgICAgICAgdmFyIHBhdGNoU2l6ZSxcbiAgICAgICAgICAgIHdpZHRoID0gaW5wdXRTdHJlYW0uZ2V0V2lkdGgoKSxcbiAgICAgICAgICAgIGhlaWdodCA9IGlucHV0U3RyZWFtLmdldEhlaWdodCgpLFxuICAgICAgICAgICAgaGFsZlNhbXBsZSA9IGNvbmZpZy5oYWxmU2FtcGxlID8gMC41IDogMSxcbiAgICAgICAgICAgIHNpemUsXG4gICAgICAgICAgICBhcmVhO1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB3aWR0aCBhbmQgaGVpZ2h0IGJhc2VkIG9uIGFyZWFcbiAgICAgICAgaWYgKGlucHV0U3RyZWFtLmdldENvbmZpZygpLmFyZWEpIHtcbiAgICAgICAgICAgIGFyZWEgPSBDVlV0aWxzLmNvbXB1dGVJbWFnZUFyZWEod2lkdGgsIGhlaWdodCwgaW5wdXRTdHJlYW0uZ2V0Q29uZmlnKCkuYXJlYSk7XG4gICAgICAgICAgICBpbnB1dFN0cmVhbS5zZXRUb3BSaWdodCh7eDogYXJlYS5zeCwgeTogYXJlYS5zeX0pO1xuICAgICAgICAgICAgaW5wdXRTdHJlYW0uc2V0Q2FudmFzU2l6ZSh7eDogd2lkdGgsIHk6IGhlaWdodH0pO1xuICAgICAgICAgICAgd2lkdGggPSBhcmVhLnN3O1xuICAgICAgICAgICAgaGVpZ2h0ID0gYXJlYS5zaDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNpemUgPSB7XG4gICAgICAgICAgICB4OiBNYXRoLmZsb29yKHdpZHRoICogaGFsZlNhbXBsZSksXG4gICAgICAgICAgICB5OiBNYXRoLmZsb29yKGhlaWdodCAqIGhhbGZTYW1wbGUpXG4gICAgICAgIH07XG5cbiAgICAgICAgcGF0Y2hTaXplID0gQ1ZVdGlscy5jYWxjdWxhdGVQYXRjaFNpemUoY29uZmlnLnBhdGNoU2l6ZSwgc2l6ZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGF0Y2gtU2l6ZTogXCIgKyBKU09OLnN0cmluZ2lmeShwYXRjaFNpemUpKTtcblxuICAgICAgICBpbnB1dFN0cmVhbS5zZXRXaWR0aChNYXRoLmZsb29yKE1hdGguZmxvb3Ioc2l6ZS54IC8gcGF0Y2hTaXplLngpICogKDEgLyBoYWxmU2FtcGxlKSAqIHBhdGNoU2l6ZS54KSk7XG4gICAgICAgIGlucHV0U3RyZWFtLnNldEhlaWdodChNYXRoLmZsb29yKE1hdGguZmxvb3Ioc2l6ZS55IC8gcGF0Y2hTaXplLnkpICogKDEgLyBoYWxmU2FtcGxlKSAqIHBhdGNoU2l6ZS55KSk7XG5cbiAgICAgICAgaWYgKChpbnB1dFN0cmVhbS5nZXRXaWR0aCgpICUgcGF0Y2hTaXplLngpID09PSAwICYmIChpbnB1dFN0cmVhbS5nZXRIZWlnaHQoKSAlIHBhdGNoU2l6ZS55KSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbWFnZSBkaW1lbnNpb25zIGRvIG5vdCBjb21wbHkgd2l0aCB0aGUgY3VycmVudCBzZXR0aW5nczogV2lkdGggKFwiICtcbiAgICAgICAgICAgIHdpZHRoICsgXCIgKWFuZCBoZWlnaHQgKFwiICsgaGVpZ2h0ICtcbiAgICAgICAgICAgIFwiKSBtdXN0IGEgbXVsdGlwbGUgb2YgXCIgKyBwYXRjaFNpemUueCk7XG4gICAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JhcmNvZGVfbG9jYXRvci5qc1xuICoqLyIsImltcG9ydCBUcmFjZXIgZnJvbSAnLi90cmFjZXInO1xuXG4vKipcbiAqIGh0dHA6Ly93d3cuY29kZXByb2plY3QuY29tL1RpcHMvNDA3MTcyL0Nvbm5lY3RlZC1Db21wb25lbnQtTGFiZWxpbmctYW5kLVZlY3Rvcml6YXRpb25cbiAqL1xudmFyIFJhc3Rlcml6ZXIgPSB7XG4gICAgY3JlYXRlQ29udG91cjJEOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpcjogbnVsbCxcbiAgICAgICAgICAgIGluZGV4OiBudWxsLFxuICAgICAgICAgICAgZmlyc3RWZXJ0ZXg6IG51bGwsXG4gICAgICAgICAgICBpbnNpZGVDb250b3VyczogbnVsbCxcbiAgICAgICAgICAgIG5leHRwZWVyOiBudWxsLFxuICAgICAgICAgICAgcHJldnBlZXI6IG51bGxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIENPTlRPVVJfRElSOiB7XG4gICAgICAgIENXX0RJUjogMCxcbiAgICAgICAgQ0NXX0RJUjogMSxcbiAgICAgICAgVU5LTk9XTl9ESVI6IDJcbiAgICB9LFxuICAgIERJUjoge1xuICAgICAgICBPVVRTSURFX0VER0U6IC0zMjc2NyxcbiAgICAgICAgSU5TSURFX0VER0U6IC0zMjc2NlxuICAgIH0sXG4gICAgY3JlYXRlOiBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGxhYmVsV3JhcHBlcikge1xuICAgICAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGEsXG4gICAgICAgICAgICBsYWJlbERhdGEgPSBsYWJlbFdyYXBwZXIuZGF0YSxcbiAgICAgICAgICAgIHdpZHRoID0gaW1hZ2VXcmFwcGVyLnNpemUueCxcbiAgICAgICAgICAgIGhlaWdodCA9IGltYWdlV3JhcHBlci5zaXplLnksXG4gICAgICAgICAgICB0cmFjZXIgPSBUcmFjZXIuY3JlYXRlKGltYWdlV3JhcHBlciwgbGFiZWxXcmFwcGVyKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmFzdGVyaXplOiBmdW5jdGlvbihkZXB0aGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbG9yLFxuICAgICAgICAgICAgICAgICAgICBiYyxcbiAgICAgICAgICAgICAgICAgICAgbGMsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGN4LFxuICAgICAgICAgICAgICAgICAgICBjeSxcbiAgICAgICAgICAgICAgICAgICAgY29sb3JNYXAgPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4LFxuICAgICAgICAgICAgICAgICAgICBwLFxuICAgICAgICAgICAgICAgICAgICBjYyxcbiAgICAgICAgICAgICAgICAgICAgc2MsXG4gICAgICAgICAgICAgICAgICAgIHBvcyxcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGVkQ291bnQgPSAwLFxuICAgICAgICAgICAgICAgICAgICBpO1xuXG4gICAgICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCA0MDA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb2xvck1hcFtpXSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29sb3JNYXBbMF0gPSBpbWFnZURhdGFbMF07XG4gICAgICAgICAgICAgICAgY2MgPSBudWxsO1xuICAgICAgICAgICAgICAgIGZvciAoIGN5ID0gMTsgY3kgPCBoZWlnaHQgLSAxOyBjeSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICBiYyA9IGNvbG9yTWFwWzBdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKCBjeCA9IDE7IGN4IDwgd2lkdGggLSAxOyBjeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSBjeSAqIHdpZHRoICsgY3g7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWxEYXRhW3Bvc10gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IGltYWdlRGF0YVtwb3NdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xvciAhPT0gYmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxjID0gY29ubmVjdGVkQ291bnQgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JNYXBbbGNdID0gY29sb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYyA9IGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVydGV4ID0gdHJhY2VyLmNvbnRvdXJUcmFjaW5nKGN5LCBjeCwgbGMsIGNvbG9yLCBSYXN0ZXJpemVyLkRJUi5PVVRTSURFX0VER0UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZlcnRleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3RlZENvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxpbmRleCA9IGxjO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBSYXN0ZXJpemVyLmNyZWF0ZUNvbnRvdXIyRCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuZGlyID0gUmFzdGVyaXplci5DT05UT1VSX0RJUi5DV19ESVI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5pbmRleCA9IGxhYmVsaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5maXJzdFZlcnRleCA9IHZlcnRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLm5leHRwZWVyID0gY2M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5pbnNpZGVDb250b3VycyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNjICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnByZXZwZWVyID0gcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MgPSBwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVydGV4ID0gdHJhY2VyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvbnRvdXJUcmFjaW5nKGN5LCBjeCwgUmFzdGVyaXplci5ESVIuSU5TSURFX0VER0UsIGNvbG9yLCBsYWJlbGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2ZXJ0ZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwID0gUmFzdGVyaXplci5jcmVhdGVDb250b3VyMkQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmZpcnN0VmVydGV4ID0gdmVydGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuaW5zaWRlQ29udG91cnMgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXB0aGxhYmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuZGlyID0gUmFzdGVyaXplci5DT05UT1VSX0RJUi5DQ1dfRElSO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuZGlyID0gUmFzdGVyaXplci5DT05UT1VSX0RJUi5DV19ESVI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuaW5kZXggPSBkZXB0aGxhYmVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjID0gY2M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKChzYyAhPT0gbnVsbCkgJiYgc2MuaW5kZXggIT09IGxhYmVsaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2MgPSBzYy5uZXh0cGVlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubmV4dHBlZXIgPSBzYy5pbnNpZGVDb250b3VycztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjLmluc2lkZUNvbnRvdXJzICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYy5pbnNpZGVDb250b3Vycy5wcmV2cGVlciA9IHA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2MuaW5zaWRlQ29udG91cnMgPSBwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsRGF0YVtwb3NdID0gbGFiZWxpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxhYmVsRGF0YVtwb3NdID09PSBSYXN0ZXJpemVyLkRJUi5PVVRTSURFX0VER0VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgbGFiZWxEYXRhW3Bvc10gPT09IFJhc3Rlcml6ZXIuRElSLklOU0lERV9FREdFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsRGF0YVtwb3NdID09PSBSYXN0ZXJpemVyLkRJUi5JTlNJREVfRURHRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYyA9IGltYWdlRGF0YVtwb3NdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJjID0gY29sb3JNYXBbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbGluZGV4ID0gbGFiZWxEYXRhW3Bvc107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmMgPSBjb2xvck1hcFtsYWJlbGluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzYyA9IGNjO1xuICAgICAgICAgICAgICAgIHdoaWxlIChzYyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBzYy5pbmRleCA9IGRlcHRobGFiZWw7XG4gICAgICAgICAgICAgICAgICAgIHNjID0gc2MubmV4dHBlZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGNjOiBjYyxcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IGNvbm5lY3RlZENvdW50XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWJ1Zzoge1xuICAgICAgICAgICAgICAgIGRyYXdDb250b3VyOiBmdW5jdGlvbihjYW52YXMsIGZpcnN0Q29udG91cikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBxID0gZmlyc3RDb250b3VyLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXEsXG4gICAgICAgICAgICAgICAgICAgICAgICBxLFxuICAgICAgICAgICAgICAgICAgICAgICAgcDtcblxuICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcInJlZFwiO1xuICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBxICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpcSA9IHBxLmluc2lkZUNvbnRvdXJzO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXEgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHBxICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXEgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxID0gaXE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXEgPSBpcS5uZXh0cGVlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcSA9IHBxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBxID0gcHEubmV4dHBlZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBxICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlxID0gcHEuaW5zaWRlQ29udG91cnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXEgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChxLmRpcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBSYXN0ZXJpemVyLkNPTlRPVVJfRElSLkNXX0RJUjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcInJlZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBSYXN0ZXJpemVyLkNPTlRPVVJfRElSLkNDV19ESVI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJibHVlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFJhc3Rlcml6ZXIuQ09OVE9VUl9ESVIuVU5LTk9XTl9ESVI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBwID0gcS5maXJzdFZlcnRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5tb3ZlVG8ocC54LCBwLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBwLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVUbyhwLngsIHAueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IHdoaWxlIChwICE9PSBxLmZpcnN0VmVydGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSYXN0ZXJpemVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmFzdGVyaXplci5qc1xuICoqLyIsIi8qKlxuICogaHR0cDovL3d3dy5jb2RlcHJvamVjdC5jb20vVGlwcy80MDcxNzIvQ29ubmVjdGVkLUNvbXBvbmVudC1MYWJlbGluZy1hbmQtVmVjdG9yaXphdGlvblxuICovXG52YXIgVHJhY2VyID0ge1xuICAgIHNlYXJjaERpcmVjdGlvbnM6IFtbMCwgMV0sIFsxLCAxXSwgWzEsIDBdLCBbMSwgLTFdLCBbMCwgLTFdLCBbLTEsIC0xXSwgWy0xLCAwXSwgWy0xLCAxXV0sXG4gICAgY3JlYXRlOiBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGxhYmVsV3JhcHBlcikge1xuICAgICAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGEsXG4gICAgICAgICAgICBsYWJlbERhdGEgPSBsYWJlbFdyYXBwZXIuZGF0YSxcbiAgICAgICAgICAgIHNlYXJjaERpcmVjdGlvbnMgPSB0aGlzLnNlYXJjaERpcmVjdGlvbnMsXG4gICAgICAgICAgICB3aWR0aCA9IGltYWdlV3JhcHBlci5zaXplLngsXG4gICAgICAgICAgICBwb3M7XG5cbiAgICAgICAgZnVuY3Rpb24gdHJhY2UoY3VycmVudCwgY29sb3IsIGxhYmVsLCBlZGdlbGFiZWwpIHtcbiAgICAgICAgICAgIHZhciBpLFxuICAgICAgICAgICAgICAgIHksXG4gICAgICAgICAgICAgICAgeDtcblxuICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgICAgICB5ID0gY3VycmVudC5jeSArIHNlYXJjaERpcmVjdGlvbnNbY3VycmVudC5kaXJdWzBdO1xuICAgICAgICAgICAgICAgIHggPSBjdXJyZW50LmN4ICsgc2VhcmNoRGlyZWN0aW9uc1tjdXJyZW50LmRpcl1bMV07XG4gICAgICAgICAgICAgICAgcG9zID0geSAqIHdpZHRoICsgeDtcbiAgICAgICAgICAgICAgICBpZiAoKGltYWdlRGF0YVtwb3NdID09PSBjb2xvcikgJiYgKChsYWJlbERhdGFbcG9zXSA9PT0gMCkgfHwgKGxhYmVsRGF0YVtwb3NdID09PSBsYWJlbCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsRGF0YVtwb3NdID0gbGFiZWw7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuY3kgPSB5O1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50LmN4ID0geDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsRGF0YVtwb3NdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbERhdGFbcG9zXSA9IGVkZ2VsYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50LmRpciA9IChjdXJyZW50LmRpciArIDEpICUgODtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB2ZXJ0ZXgyRCh4LCB5LCBkaXIpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZGlyOiBkaXIsXG4gICAgICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgICAgIG5leHQ6IG51bGwsXG4gICAgICAgICAgICAgICAgcHJldjogbnVsbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNvbnRvdXJUcmFjaW5nKHN5LCBzeCwgbGFiZWwsIGNvbG9yLCBlZGdlbGFiZWwpIHtcbiAgICAgICAgICAgIHZhciBGdiA9IG51bGwsXG4gICAgICAgICAgICAgICAgQ3YsXG4gICAgICAgICAgICAgICAgUCxcbiAgICAgICAgICAgICAgICBsZGlyLFxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGN4OiBzeCxcbiAgICAgICAgICAgICAgICAgICAgY3k6IHN5LFxuICAgICAgICAgICAgICAgICAgICBkaXI6IDBcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodHJhY2UoY3VycmVudCwgY29sb3IsIGxhYmVsLCBlZGdlbGFiZWwpKSB7XG4gICAgICAgICAgICAgICAgRnYgPSB2ZXJ0ZXgyRChzeCwgc3ksIGN1cnJlbnQuZGlyKTtcbiAgICAgICAgICAgICAgICBDdiA9IEZ2O1xuICAgICAgICAgICAgICAgIGxkaXIgPSBjdXJyZW50LmRpcjtcbiAgICAgICAgICAgICAgICBQID0gdmVydGV4MkQoY3VycmVudC5jeCwgY3VycmVudC5jeSwgMCk7XG4gICAgICAgICAgICAgICAgUC5wcmV2ID0gQ3Y7XG4gICAgICAgICAgICAgICAgQ3YubmV4dCA9IFA7XG4gICAgICAgICAgICAgICAgUC5uZXh0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBDdiA9IFA7XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50LmRpciA9IChjdXJyZW50LmRpciArIDYpICUgODtcbiAgICAgICAgICAgICAgICAgICAgdHJhY2UoY3VycmVudCwgY29sb3IsIGxhYmVsLCBlZGdlbGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGRpciAhPT0gY3VycmVudC5kaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEN2LmRpciA9IGN1cnJlbnQuZGlyO1xuICAgICAgICAgICAgICAgICAgICAgICAgUCA9IHZlcnRleDJEKGN1cnJlbnQuY3gsIGN1cnJlbnQuY3ksIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgUC5wcmV2ID0gQ3Y7XG4gICAgICAgICAgICAgICAgICAgICAgICBDdi5uZXh0ID0gUDtcbiAgICAgICAgICAgICAgICAgICAgICAgIFAubmV4dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBDdiA9IFA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBDdi5kaXIgPSBsZGlyO1xuICAgICAgICAgICAgICAgICAgICAgICAgQ3YueCA9IGN1cnJlbnQuY3g7XG4gICAgICAgICAgICAgICAgICAgICAgICBDdi55ID0gY3VycmVudC5jeTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZGlyID0gY3VycmVudC5kaXI7XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoY3VycmVudC5jeCAhPT0gc3ggfHwgY3VycmVudC5jeSAhPT0gc3kpO1xuICAgICAgICAgICAgICAgIEZ2LnByZXYgPSBDdi5wcmV2O1xuICAgICAgICAgICAgICAgIEN2LnByZXYubmV4dCA9IEZ2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIEZ2O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRyYWNlOiBmdW5jdGlvbihjdXJyZW50LCBjb2xvciwgbGFiZWwsIGVkZ2VsYWJlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmFjZShjdXJyZW50LCBjb2xvciwgbGFiZWwsIGVkZ2VsYWJlbCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udG91clRyYWNpbmc6IGZ1bmN0aW9uKHN5LCBzeCwgbGFiZWwsIGNvbG9yLCBlZGdlbGFiZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udG91clRyYWNpbmcoc3ksIHN4LCBsYWJlbCwgY29sb3IsIGVkZ2VsYWJlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgKFRyYWNlcik7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90cmFjZXIuanNcbiAqKi8iLCIvKiBAcHJlc2VydmUgQVNNIEJFR0lOICovXG4vKiBlc2xpbnQtZGlzYWJsZSBlcWVxZXEqL1xuZnVuY3Rpb24gU2tlbGV0b25pemVyKHN0ZGxpYiwgZm9yZWlnbiwgYnVmZmVyKSB7XG4gICAgXCJ1c2UgYXNtXCI7XG5cbiAgICB2YXIgaW1hZ2VzID0gbmV3IHN0ZGxpYi5VaW50OEFycmF5KGJ1ZmZlciksXG4gICAgICAgIHNpemUgPSBmb3JlaWduLnNpemUgfCAwLFxuICAgICAgICBpbXVsID0gc3RkbGliLk1hdGguaW11bDtcblxuICAgIGZ1bmN0aW9uIGVyb2RlKGluSW1hZ2VQdHIsIG91dEltYWdlUHRyKSB7XG4gICAgICAgIGluSW1hZ2VQdHIgPSBpbkltYWdlUHRyIHwgMDtcbiAgICAgICAgb3V0SW1hZ2VQdHIgPSBvdXRJbWFnZVB0ciB8IDA7XG5cbiAgICAgICAgdmFyIHYgPSAwLFxuICAgICAgICAgICAgdSA9IDAsXG4gICAgICAgICAgICBzdW0gPSAwLFxuICAgICAgICAgICAgeVN0YXJ0MSA9IDAsXG4gICAgICAgICAgICB5U3RhcnQyID0gMCxcbiAgICAgICAgICAgIHhTdGFydDEgPSAwLFxuICAgICAgICAgICAgeFN0YXJ0MiA9IDAsXG4gICAgICAgICAgICBvZmZzZXQgPSAwO1xuXG4gICAgICAgIGZvciAoIHYgPSAxOyAodiB8IDApIDwgKChzaXplIC0gMSkgfCAwKTsgdiA9ICh2ICsgMSkgfCAwKSB7XG4gICAgICAgICAgICBvZmZzZXQgPSAob2Zmc2V0ICsgc2l6ZSkgfCAwO1xuICAgICAgICAgICAgZm9yICggdSA9IDE7ICh1IHwgMCkgPCAoKHNpemUgLSAxKSB8IDApOyB1ID0gKHUgKyAxKSB8IDApIHtcbiAgICAgICAgICAgICAgICB5U3RhcnQxID0gKG9mZnNldCAtIHNpemUpIHwgMDtcbiAgICAgICAgICAgICAgICB5U3RhcnQyID0gKG9mZnNldCArIHNpemUpIHwgMDtcbiAgICAgICAgICAgICAgICB4U3RhcnQxID0gKHUgLSAxKSB8IDA7XG4gICAgICAgICAgICAgICAgeFN0YXJ0MiA9ICh1ICsgMSkgfCAwO1xuICAgICAgICAgICAgICAgIHN1bSA9ICgoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MSArIHhTdGFydDEpIHwgMF0gfCAwKVxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQxICsgeFN0YXJ0MikgfCAwXSB8IDApXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIG9mZnNldCArIHUpIHwgMF0gfCAwKVxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQyICsgeFN0YXJ0MSkgfCAwXSB8IDApXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDIgKyB4U3RhcnQyKSB8IDBdIHwgMCkpIHwgMDtcbiAgICAgICAgICAgICAgICBpZiAoKHN1bSB8IDApID09ICg1IHwgMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIG9mZnNldCArIHUpIHwgMF0gPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlc1sob3V0SW1hZ2VQdHIgKyBvZmZzZXQgKyB1KSB8IDBdID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN1YnRyYWN0KGFJbWFnZVB0ciwgYkltYWdlUHRyLCBvdXRJbWFnZVB0cikge1xuICAgICAgICBhSW1hZ2VQdHIgPSBhSW1hZ2VQdHIgfCAwO1xuICAgICAgICBiSW1hZ2VQdHIgPSBiSW1hZ2VQdHIgfCAwO1xuICAgICAgICBvdXRJbWFnZVB0ciA9IG91dEltYWdlUHRyIHwgMDtcblxuICAgICAgICB2YXIgbGVuZ3RoID0gMDtcblxuICAgICAgICBsZW5ndGggPSBpbXVsKHNpemUsIHNpemUpIHwgMDtcblxuICAgICAgICB3aGlsZSAoKGxlbmd0aCB8IDApID4gMCkge1xuICAgICAgICAgICAgbGVuZ3RoID0gKGxlbmd0aCAtIDEpIHwgMDtcbiAgICAgICAgICAgIGltYWdlc1sob3V0SW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gPVxuICAgICAgICAgICAgICAgICgoaW1hZ2VzWyhhSW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKSAtIChpbWFnZXNbKGJJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSB8IDApKSB8IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBiaXR3aXNlT3IoYUltYWdlUHRyLCBiSW1hZ2VQdHIsIG91dEltYWdlUHRyKSB7XG4gICAgICAgIGFJbWFnZVB0ciA9IGFJbWFnZVB0ciB8IDA7XG4gICAgICAgIGJJbWFnZVB0ciA9IGJJbWFnZVB0ciB8IDA7XG4gICAgICAgIG91dEltYWdlUHRyID0gb3V0SW1hZ2VQdHIgfCAwO1xuXG4gICAgICAgIHZhciBsZW5ndGggPSAwO1xuXG4gICAgICAgIGxlbmd0aCA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xuXG4gICAgICAgIHdoaWxlICgobGVuZ3RoIHwgMCkgPiAwKSB7XG4gICAgICAgICAgICBsZW5ndGggPSAobGVuZ3RoIC0gMSkgfCAwO1xuICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSA9XG4gICAgICAgICAgICAgICAgKChpbWFnZXNbKGFJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSB8IDApIHwgKGltYWdlc1soYkltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCkpIHwgMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvdW50Tm9uWmVybyhpbWFnZVB0cikge1xuICAgICAgICBpbWFnZVB0ciA9IGltYWdlUHRyIHwgMDtcblxuICAgICAgICB2YXIgc3VtID0gMCxcbiAgICAgICAgICAgIGxlbmd0aCA9IDA7XG5cbiAgICAgICAgbGVuZ3RoID0gaW11bChzaXplLCBzaXplKSB8IDA7XG5cbiAgICAgICAgd2hpbGUgKChsZW5ndGggfCAwKSA+IDApIHtcbiAgICAgICAgICAgIGxlbmd0aCA9IChsZW5ndGggLSAxKSB8IDA7XG4gICAgICAgICAgICBzdW0gPSAoKHN1bSB8IDApICsgKGltYWdlc1soaW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKSkgfCAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChzdW0gfCAwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KGltYWdlUHRyLCB2YWx1ZSkge1xuICAgICAgICBpbWFnZVB0ciA9IGltYWdlUHRyIHwgMDtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZSB8IDA7XG5cbiAgICAgICAgdmFyIGxlbmd0aCA9IDA7XG5cbiAgICAgICAgbGVuZ3RoID0gaW11bChzaXplLCBzaXplKSB8IDA7XG5cbiAgICAgICAgd2hpbGUgKChsZW5ndGggfCAwKSA+IDApIHtcbiAgICAgICAgICAgIGxlbmd0aCA9IChsZW5ndGggLSAxKSB8IDA7XG4gICAgICAgICAgICBpbWFnZXNbKGltYWdlUHRyICsgbGVuZ3RoKSB8IDBdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaWxhdGUoaW5JbWFnZVB0ciwgb3V0SW1hZ2VQdHIpIHtcbiAgICAgICAgaW5JbWFnZVB0ciA9IGluSW1hZ2VQdHIgfCAwO1xuICAgICAgICBvdXRJbWFnZVB0ciA9IG91dEltYWdlUHRyIHwgMDtcblxuICAgICAgICB2YXIgdiA9IDAsXG4gICAgICAgICAgICB1ID0gMCxcbiAgICAgICAgICAgIHN1bSA9IDAsXG4gICAgICAgICAgICB5U3RhcnQxID0gMCxcbiAgICAgICAgICAgIHlTdGFydDIgPSAwLFxuICAgICAgICAgICAgeFN0YXJ0MSA9IDAsXG4gICAgICAgICAgICB4U3RhcnQyID0gMCxcbiAgICAgICAgICAgIG9mZnNldCA9IDA7XG5cbiAgICAgICAgZm9yICggdiA9IDE7ICh2IHwgMCkgPCAoKHNpemUgLSAxKSB8IDApOyB2ID0gKHYgKyAxKSB8IDApIHtcbiAgICAgICAgICAgIG9mZnNldCA9IChvZmZzZXQgKyBzaXplKSB8IDA7XG4gICAgICAgICAgICBmb3IgKCB1ID0gMTsgKHUgfCAwKSA8ICgoc2l6ZSAtIDEpIHwgMCk7IHUgPSAodSArIDEpIHwgMCkge1xuICAgICAgICAgICAgICAgIHlTdGFydDEgPSAob2Zmc2V0IC0gc2l6ZSkgfCAwO1xuICAgICAgICAgICAgICAgIHlTdGFydDIgPSAob2Zmc2V0ICsgc2l6ZSkgfCAwO1xuICAgICAgICAgICAgICAgIHhTdGFydDEgPSAodSAtIDEpIHwgMDtcbiAgICAgICAgICAgICAgICB4U3RhcnQyID0gKHUgKyAxKSB8IDA7XG4gICAgICAgICAgICAgICAgc3VtID0gKChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQxICsgeFN0YXJ0MSkgfCAwXSB8IDApXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDEgKyB4U3RhcnQyKSB8IDBdIHwgMClcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgb2Zmc2V0ICsgdSkgfCAwXSB8IDApXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDIgKyB4U3RhcnQxKSB8IDBdIHwgMClcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MiArIHhTdGFydDIpIHwgMF0gfCAwKSkgfCAwO1xuICAgICAgICAgICAgICAgIGlmICgoc3VtIHwgMCkgPiAoMCB8IDApKSB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlc1sob3V0SW1hZ2VQdHIgKyBvZmZzZXQgKyB1KSB8IDBdID0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZXNbKG91dEltYWdlUHRyICsgb2Zmc2V0ICsgdSkgfCAwXSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZW1jcHkoc3JjSW1hZ2VQdHIsIGRzdEltYWdlUHRyKSB7XG4gICAgICAgIHNyY0ltYWdlUHRyID0gc3JjSW1hZ2VQdHIgfCAwO1xuICAgICAgICBkc3RJbWFnZVB0ciA9IGRzdEltYWdlUHRyIHwgMDtcblxuICAgICAgICB2YXIgbGVuZ3RoID0gMDtcblxuICAgICAgICBsZW5ndGggPSBpbXVsKHNpemUsIHNpemUpIHwgMDtcblxuICAgICAgICB3aGlsZSAoKGxlbmd0aCB8IDApID4gMCkge1xuICAgICAgICAgICAgbGVuZ3RoID0gKGxlbmd0aCAtIDEpIHwgMDtcbiAgICAgICAgICAgIGltYWdlc1soZHN0SW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gPSAoaW1hZ2VzWyhzcmNJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSB8IDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gemVyb0JvcmRlcihpbWFnZVB0cikge1xuICAgICAgICBpbWFnZVB0ciA9IGltYWdlUHRyIHwgMDtcblxuICAgICAgICB2YXIgeCA9IDAsXG4gICAgICAgICAgICB5ID0gMDtcblxuICAgICAgICBmb3IgKCB4ID0gMDsgKHggfCAwKSA8ICgoc2l6ZSAtIDEpIHwgMCk7IHggPSAoeCArIDEpIHwgMCkge1xuICAgICAgICAgICAgaW1hZ2VzWyhpbWFnZVB0ciArIHgpIHwgMF0gPSAwO1xuICAgICAgICAgICAgaW1hZ2VzWyhpbWFnZVB0ciArIHkpIHwgMF0gPSAwO1xuICAgICAgICAgICAgeSA9ICgoeSArIHNpemUpIC0gMSkgfCAwO1xuICAgICAgICAgICAgaW1hZ2VzWyhpbWFnZVB0ciArIHkpIHwgMF0gPSAwO1xuICAgICAgICAgICAgeSA9ICh5ICsgMSkgfCAwO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoIHggPSAwOyAoeCB8IDApIDwgKHNpemUgfCAwKTsgeCA9ICh4ICsgMSkgfCAwKSB7XG4gICAgICAgICAgICBpbWFnZXNbKGltYWdlUHRyICsgeSkgfCAwXSA9IDA7XG4gICAgICAgICAgICB5ID0gKHkgKyAxKSB8IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBza2VsZXRvbml6ZSgpIHtcbiAgICAgICAgdmFyIHN1YkltYWdlUHRyID0gMCxcbiAgICAgICAgICAgIGVyb2RlZEltYWdlUHRyID0gMCxcbiAgICAgICAgICAgIHRlbXBJbWFnZVB0ciA9IDAsXG4gICAgICAgICAgICBza2VsSW1hZ2VQdHIgPSAwLFxuICAgICAgICAgICAgc3VtID0gMCxcbiAgICAgICAgICAgIGRvbmUgPSAwO1xuXG4gICAgICAgIGVyb2RlZEltYWdlUHRyID0gaW11bChzaXplLCBzaXplKSB8IDA7XG4gICAgICAgIHRlbXBJbWFnZVB0ciA9IChlcm9kZWRJbWFnZVB0ciArIGVyb2RlZEltYWdlUHRyKSB8IDA7XG4gICAgICAgIHNrZWxJbWFnZVB0ciA9ICh0ZW1wSW1hZ2VQdHIgKyBlcm9kZWRJbWFnZVB0cikgfCAwO1xuXG4gICAgICAgIC8vIGluaXQgc2tlbC1pbWFnZVxuICAgICAgICBpbml0KHNrZWxJbWFnZVB0ciwgMCk7XG4gICAgICAgIHplcm9Cb3JkZXIoc3ViSW1hZ2VQdHIpO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGVyb2RlKHN1YkltYWdlUHRyLCBlcm9kZWRJbWFnZVB0cik7XG4gICAgICAgICAgICBkaWxhdGUoZXJvZGVkSW1hZ2VQdHIsIHRlbXBJbWFnZVB0cik7XG4gICAgICAgICAgICBzdWJ0cmFjdChzdWJJbWFnZVB0ciwgdGVtcEltYWdlUHRyLCB0ZW1wSW1hZ2VQdHIpO1xuICAgICAgICAgICAgYml0d2lzZU9yKHNrZWxJbWFnZVB0ciwgdGVtcEltYWdlUHRyLCBza2VsSW1hZ2VQdHIpO1xuICAgICAgICAgICAgbWVtY3B5KGVyb2RlZEltYWdlUHRyLCBzdWJJbWFnZVB0cik7XG4gICAgICAgICAgICBzdW0gPSBjb3VudE5vblplcm8oc3ViSW1hZ2VQdHIpIHwgMDtcbiAgICAgICAgICAgIGRvbmUgPSAoKHN1bSB8IDApID09IDAgfCAwKTtcbiAgICAgICAgfSB3aGlsZSAoIWRvbmUpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHNrZWxldG9uaXplOiBza2VsZXRvbml6ZVxuICAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNrZWxldG9uaXplcjtcbi8qIGVzbGludC1lbmFibGUgZXFlcWVxKi9cbi8qIEBwcmVzZXJ2ZSBBU00gRU5EICovXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9za2VsZXRvbml6ZXIuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgZHJhd1JlY3Q6IGZ1bmN0aW9uKHBvcywgc2l6ZSwgY3R4LCBzdHlsZSl7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0eWxlLmNvbG9yO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gc3R5bGUuY29sb3I7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VSZWN0KHBvcy54LCBwb3MueSwgc2l6ZS54LCBzaXplLnkpO1xuICAgIH0sXG4gICAgZHJhd1BhdGg6IGZ1bmN0aW9uKHBhdGgsIGRlZiwgY3R4LCBzdHlsZSkge1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdHlsZS5jb2xvcjtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0eWxlLmNvbG9yO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gc3R5bGUubGluZVdpZHRoO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8ocGF0aFswXVtkZWYueF0sIHBhdGhbMF1bZGVmLnldKTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCBwYXRoLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBjdHgubGluZVRvKHBhdGhbal1bZGVmLnhdLCBwYXRoW2pdW2RlZi55XSk7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfSxcbiAgICBkcmF3SW1hZ2U6IGZ1bmN0aW9uKGltYWdlRGF0YSwgc2l6ZSwgY3R4KSB7XG4gICAgICAgIHZhciBjYW52YXNEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBzaXplLngsIHNpemUueSksXG4gICAgICAgICAgICBkYXRhID0gY2FudmFzRGF0YS5kYXRhLFxuICAgICAgICAgICAgaW1hZ2VEYXRhUG9zID0gaW1hZ2VEYXRhLmxlbmd0aCxcbiAgICAgICAgICAgIGNhbnZhc0RhdGFQb3MgPSBkYXRhLmxlbmd0aCxcbiAgICAgICAgICAgIHZhbHVlO1xuXG4gICAgICAgIGlmIChjYW52YXNEYXRhUG9zIC8gaW1hZ2VEYXRhUG9zICE9PSA0KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGltYWdlRGF0YVBvcy0tKXtcbiAgICAgICAgICAgIHZhbHVlID0gaW1hZ2VEYXRhW2ltYWdlRGF0YVBvc107XG4gICAgICAgICAgICBkYXRhWy0tY2FudmFzRGF0YVBvc10gPSAyNTU7XG4gICAgICAgICAgICBkYXRhWy0tY2FudmFzRGF0YVBvc10gPSB2YWx1ZTtcbiAgICAgICAgICAgIGRhdGFbLS1jYW52YXNEYXRhUG9zXSA9IHZhbHVlO1xuICAgICAgICAgICAgZGF0YVstLWNhbnZhc0RhdGFQb3NdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LnB1dEltYWdlRGF0YShjYW52YXNEYXRhLCAwLCAwKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltYWdlX2RlYnVnLmpzXG4gKiovIiwiaW1wb3J0IEJyZXNlbmhhbSBmcm9tICcuL2JyZXNlbmhhbSc7XG5pbXBvcnQgSW1hZ2VEZWJ1ZyBmcm9tICcuL2ltYWdlX2RlYnVnJztcbmltcG9ydCBDb2RlMTI4UmVhZGVyIGZyb20gJy4vY29kZV8xMjhfcmVhZGVyJztcbmltcG9ydCBFQU5SZWFkZXIgZnJvbSAnLi9lYW5fcmVhZGVyJztcbmltcG9ydCBDb2RlMzlSZWFkZXIgZnJvbSAnLi9jb2RlXzM5X3JlYWRlcic7XG5pbXBvcnQgQ29kZTM5VklOUmVhZGVyIGZyb20gJy4vY29kZV8zOV92aW5fcmVhZGVyJztcbmltcG9ydCBDb2RhYmFyUmVhZGVyIGZyb20gJy4vY29kYWJhcl9yZWFkZXInO1xuaW1wb3J0IFVQQ1JlYWRlciBmcm9tICcuL3VwY19yZWFkZXInO1xuaW1wb3J0IEVBTjhSZWFkZXIgZnJvbSAnLi9lYW5fOF9yZWFkZXInO1xuaW1wb3J0IFVQQ0VSZWFkZXIgZnJvbSAnLi91cGNfZV9yZWFkZXInO1xuaW1wb3J0IEkyb2Y1UmVhZGVyIGZyb20gJy4vaTJvZjVfcmVhZGVyJztcblxuY29uc3QgUkVBREVSUyA9IHtcbiAgICBjb2RlXzEyOF9yZWFkZXI6IENvZGUxMjhSZWFkZXIsXG4gICAgZWFuX3JlYWRlcjogRUFOUmVhZGVyLFxuICAgIGVhbl84X3JlYWRlcjogRUFOOFJlYWRlcixcbiAgICBjb2RlXzM5X3JlYWRlcjogQ29kZTM5UmVhZGVyLFxuICAgIGNvZGVfMzlfdmluX3JlYWRlcjogQ29kZTM5VklOUmVhZGVyLFxuICAgIGNvZGFiYXJfcmVhZGVyOiBDb2RhYmFyUmVhZGVyLFxuICAgIHVwY19yZWFkZXI6IFVQQ1JlYWRlcixcbiAgICB1cGNfZV9yZWFkZXI6IFVQQ0VSZWFkZXIsXG4gICAgaTJvZjVfcmVhZGVyOiBJMm9mNVJlYWRlclxufTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGNvbmZpZywgaW5wdXRJbWFnZVdyYXBwZXIpIHtcbiAgICAgICAgdmFyIF9jYW52YXMgPSB7XG4gICAgICAgICAgICAgICAgY3R4OiB7XG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheTogbnVsbFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZG9tOiB7XG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheTogbnVsbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfYmFyY29kZVJlYWRlcnMgPSBbXTtcblxuICAgICAgICBpbml0Q2FudmFzKCk7XG4gICAgICAgIGluaXRSZWFkZXJzKCk7XG4gICAgICAgIGluaXRDb25maWcoKTtcblxuICAgICAgICBmdW5jdGlvbiBpbml0Q2FudmFzKCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGRlYnVnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZWJ1Zy5kZXRlY3Rpb25cIik7XG4gICAgICAgICAgICAgICAgX2NhbnZhcy5kb20uZnJlcXVlbmN5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhcy5mcmVxdWVuY3lcIik7XG4gICAgICAgICAgICAgICAgaWYgKCFfY2FudmFzLmRvbS5mcmVxdWVuY3kpIHtcbiAgICAgICAgICAgICAgICAgICAgX2NhbnZhcy5kb20uZnJlcXVlbmN5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgX2NhbnZhcy5kb20uZnJlcXVlbmN5LmNsYXNzTmFtZSA9IFwiZnJlcXVlbmN5XCI7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRkZWJ1Zy5hcHBlbmRDaGlsZChfY2FudmFzLmRvbS5mcmVxdWVuY3kpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9jYW52YXMuY3R4LmZyZXF1ZW5jeSA9IF9jYW52YXMuZG9tLmZyZXF1ZW5jeS5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5wYXR0ZXJuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhcy5wYXR0ZXJuQnVmZmVyXCIpO1xuICAgICAgICAgICAgICAgIGlmICghX2NhbnZhcy5kb20ucGF0dGVybikge1xuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5wYXR0ZXJuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgX2NhbnZhcy5kb20ucGF0dGVybi5jbGFzc05hbWUgPSBcInBhdHRlcm5CdWZmZXJcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRkZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGRlYnVnLmFwcGVuZENoaWxkKF9jYW52YXMuZG9tLnBhdHRlcm4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9jYW52YXMuY3R4LnBhdHRlcm4gPSBfY2FudmFzLmRvbS5wYXR0ZXJuLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgICAgICAgICAgIF9jYW52YXMuZG9tLm92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzLmRyYXdpbmdCdWZmZXJcIik7XG4gICAgICAgICAgICAgICAgaWYgKF9jYW52YXMuZG9tLm92ZXJsYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgX2NhbnZhcy5jdHgub3ZlcmxheSA9IF9jYW52YXMuZG9tLm92ZXJsYXkuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGluaXRSZWFkZXJzKCkge1xuICAgICAgICAgICAgY29uZmlnLnJlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihyZWFkZXJDb25maWcpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVhZGVyLFxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uID0ge307XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlYWRlckNvbmZpZyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyID0gcmVhZGVyQ29uZmlnLmZvcm1hdDtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbiA9IHJlYWRlckNvbmZpZy5jb25maWc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVhZGVyQ29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICByZWFkZXIgPSByZWFkZXJDb25maWc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmVmb3JlIHJlZ2lzdGVyaW5nIHJlYWRlcjogXCIsIHJlYWRlcik7XG4gICAgICAgICAgICAgICAgX2JhcmNvZGVSZWFkZXJzLnB1c2gobmV3IFJFQURFUlNbcmVhZGVyXShjb25maWd1cmF0aW9uKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXJlZCBSZWFkZXJzOiBcIiArIF9iYXJjb2RlUmVhZGVyc1xuICAgICAgICAgICAgICAgIC5tYXAoKHJlYWRlcikgPT4gSlNPTi5zdHJpbmdpZnkoe2Zvcm1hdDogcmVhZGVyLkZPUk1BVCwgY29uZmlnOiByZWFkZXIuY29uZmlnfSkpXG4gICAgICAgICAgICAgICAgLmpvaW4oJywgJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaW5pdENvbmZpZygpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGksXG4gICAgICAgICAgICAgICAgICAgIHZpcyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlOiBfY2FudmFzLmRvbS5mcmVxdWVuY3ksXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBjb25maWcuc2hvd0ZyZXF1ZW5jeVxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlOiBfY2FudmFzLmRvbS5wYXR0ZXJuLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogY29uZmlnLnNob3dQYXR0ZXJuXG4gICAgICAgICAgICAgICAgICAgIH1dO1xuXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHZpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmlzW2ldLnByb3AgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc1tpXS5ub2RlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNbaV0ubm9kZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogZXh0ZW5kIHRoZSBsaW5lIG9uIGJvdGggZW5kc1xuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBsaW5lXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZ2V0RXh0ZW5kZWRMaW5lKGxpbmUsIGFuZ2xlLCBleHQpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGV4dGVuZExpbmUoYW1vdW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGV4dGVuc2lvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgeTogYW1vdW50ICogTWF0aC5zaW4oYW5nbGUpLFxuICAgICAgICAgICAgICAgICAgICB4OiBhbW91bnQgKiBNYXRoLmNvcyhhbmdsZSlcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgbGluZVswXS55IC09IGV4dGVuc2lvbi55O1xuICAgICAgICAgICAgICAgIGxpbmVbMF0ueCAtPSBleHRlbnNpb24ueDtcbiAgICAgICAgICAgICAgICBsaW5lWzFdLnkgKz0gZXh0ZW5zaW9uLnk7XG4gICAgICAgICAgICAgICAgbGluZVsxXS54ICs9IGV4dGVuc2lvbi54O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjaGVjayBpZiBpbnNpZGUgaW1hZ2VcbiAgICAgICAgICAgIGV4dGVuZExpbmUoZXh0KTtcbiAgICAgICAgICAgIHdoaWxlIChleHQgPiAxICYmICghaW5wdXRJbWFnZVdyYXBwZXIuaW5JbWFnZVdpdGhCb3JkZXIobGluZVswXSwgMClcbiAgICAgICAgICAgICAgICAgICAgfHwgIWlucHV0SW1hZ2VXcmFwcGVyLmluSW1hZ2VXaXRoQm9yZGVyKGxpbmVbMV0sIDApKSkge1xuICAgICAgICAgICAgICAgIGV4dCAtPSBNYXRoLmNlaWwoZXh0IC8gMik7XG4gICAgICAgICAgICAgICAgZXh0ZW5kTGluZSgtZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsaW5lO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0TGluZShib3gpIHtcbiAgICAgICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAgICAgIHg6IChib3hbMV1bMF0gLSBib3hbMF1bMF0pIC8gMiArIGJveFswXVswXSxcbiAgICAgICAgICAgICAgICB5OiAoYm94WzFdWzFdIC0gYm94WzBdWzFdKSAvIDIgKyBib3hbMF1bMV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB4OiAoYm94WzNdWzBdIC0gYm94WzJdWzBdKSAvIDIgKyBib3hbMl1bMF0sXG4gICAgICAgICAgICAgICAgeTogKGJveFszXVsxXSAtIGJveFsyXVsxXSkgLyAyICsgYm94WzJdWzFdXG4gICAgICAgICAgICB9XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHRyeURlY29kZShsaW5lKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gbnVsbCxcbiAgICAgICAgICAgICAgICBpLFxuICAgICAgICAgICAgICAgIGJhcmNvZGVMaW5lID0gQnJlc2VuaGFtLmdldEJhcmNvZGVMaW5lKGlucHV0SW1hZ2VXcmFwcGVyLCBsaW5lWzBdLCBsaW5lWzFdKTtcblxuICAgICAgICAgICAgaWYgKGNvbmZpZy5zaG93RnJlcXVlbmN5KSB7XG4gICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UGF0aChsaW5lLCB7eDogJ3gnLCB5OiAneSd9LCBfY2FudmFzLmN0eC5vdmVybGF5LCB7Y29sb3I6ICdyZWQnLCBsaW5lV2lkdGg6IDN9KTtcbiAgICAgICAgICAgICAgICBCcmVzZW5oYW0uZGVidWcucHJpbnRGcmVxdWVuY3koYmFyY29kZUxpbmUubGluZSwgX2NhbnZhcy5kb20uZnJlcXVlbmN5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEJyZXNlbmhhbS50b0JpbmFyeUxpbmUoYmFyY29kZUxpbmUpO1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5zaG93UGF0dGVybikge1xuICAgICAgICAgICAgICAgIEJyZXNlbmhhbS5kZWJ1Zy5wcmludFBhdHRlcm4oYmFyY29kZUxpbmUubGluZSwgX2NhbnZhcy5kb20ucGF0dGVybik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgX2JhcmNvZGVSZWFkZXJzLmxlbmd0aCAmJiByZXN1bHQgPT09IG51bGw7IGkrKykge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9iYXJjb2RlUmVhZGVyc1tpXS5kZWNvZGVQYXR0ZXJuKGJhcmNvZGVMaW5lLmxpbmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNvZGVSZXN1bHQ6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICBiYXJjb2RlTGluZTogYmFyY29kZUxpbmVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBtZXRob2Qgc2xpY2VzIHRoZSBnaXZlbiBhcmVhIGFwYXJ0IGFuZCB0cmllcyB0byBkZXRlY3QgYSBiYXJjb2RlLXBhdHRlcm5cbiAgICAgICAgICogZm9yIGVhY2ggc2xpY2UuIEl0IHJldHVybnMgdGhlIGRlY29kZWQgYmFyY29kZSwgb3IgbnVsbCBpZiBub3RoaW5nIHdhcyBmb3VuZFxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBib3hcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gbGluZVxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gbGluZUFuZ2xlXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiB0cnlEZWNvZGVCcnV0ZUZvcmNlKGJveCwgbGluZSwgbGluZUFuZ2xlKSB7XG4gICAgICAgICAgICB2YXIgc2lkZUxlbmd0aCA9IE1hdGguc3FydChNYXRoLnBvdyhib3hbMV1bMF0gLSBib3hbMF1bMF0sIDIpICsgTWF0aC5wb3coKGJveFsxXVsxXSAtIGJveFswXVsxXSksIDIpKSxcbiAgICAgICAgICAgICAgICBpLFxuICAgICAgICAgICAgICAgIHNsaWNlcyA9IDE2LFxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG51bGwsXG4gICAgICAgICAgICAgICAgZGlyLFxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbixcbiAgICAgICAgICAgICAgICB4ZGlyID0gTWF0aC5zaW4obGluZUFuZ2xlKSxcbiAgICAgICAgICAgICAgICB5ZGlyID0gTWF0aC5jb3MobGluZUFuZ2xlKTtcblxuICAgICAgICAgICAgZm9yICggaSA9IDE7IGkgPCBzbGljZXMgJiYgcmVzdWx0ID09PSBudWxsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvLyBtb3ZlIGxpbmUgcGVycGVuZGljdWxhciB0byBhbmdsZVxuICAgICAgICAgICAgICAgIGRpciA9IHNpZGVMZW5ndGggLyBzbGljZXMgKiBpICogKGkgJSAyID09PSAwID8gLTEgOiAxKTtcbiAgICAgICAgICAgICAgICBleHRlbnNpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIHk6IGRpciAqIHhkaXIsXG4gICAgICAgICAgICAgICAgICAgIHg6IGRpciAqIHlkaXJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGxpbmVbMF0ueSArPSBleHRlbnNpb24ueDtcbiAgICAgICAgICAgICAgICBsaW5lWzBdLnggLT0gZXh0ZW5zaW9uLnk7XG4gICAgICAgICAgICAgICAgbGluZVsxXS55ICs9IGV4dGVuc2lvbi54O1xuICAgICAgICAgICAgICAgIGxpbmVbMV0ueCAtPSBleHRlbnNpb24ueTtcblxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRyeURlY29kZShsaW5lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRMaW5lTGVuZ3RoKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQoXG4gICAgICAgICAgICAgICAgTWF0aC5wb3coTWF0aC5hYnMobGluZVsxXS55IC0gbGluZVswXS55KSwgMikgK1xuICAgICAgICAgICAgICAgIE1hdGgucG93KE1hdGguYWJzKGxpbmVbMV0ueCAtIGxpbmVbMF0ueCksIDIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaXRoIHRoZSBoZWxwIG9mIHRoZSBjb25maWd1cmVkIHJlYWRlcnMgKENvZGUxMjggb3IgRUFOKSB0aGlzIGZ1bmN0aW9uIHRyaWVzIHRvIGRldGVjdCBhXG4gICAgICAgICAqIHZhbGlkIGJhcmNvZGUgcGF0dGVybiB3aXRoaW4gdGhlIGdpdmVuIGFyZWEuXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBib3ggVGhlIGFyZWEgdG8gc2VhcmNoIGluXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSByZXN1bHQge2NvZGVSZXN1bHQsIGxpbmUsIGFuZ2xlLCBwYXR0ZXJuLCB0aHJlc2hvbGR9XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBkZWNvZGVGcm9tQm91bmRpbmdCb3goYm94KSB7XG4gICAgICAgICAgICB2YXIgbGluZSxcbiAgICAgICAgICAgICAgICBsaW5lQW5nbGUsXG4gICAgICAgICAgICAgICAgY3R4ID0gX2NhbnZhcy5jdHgub3ZlcmxheSxcbiAgICAgICAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgICAgICAgbGluZUxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKGNvbmZpZy5kcmF3Qm91bmRpbmdCb3ggJiYgY3R4KSB7XG4gICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UGF0aChib3gsIHt4OiAwLCB5OiAxfSwgY3R4LCB7Y29sb3I6IFwiYmx1ZVwiLCBsaW5lV2lkdGg6IDJ9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGluZSA9IGdldExpbmUoYm94KTtcbiAgICAgICAgICAgIGxpbmVMZW5ndGggPSBnZXRMaW5lTGVuZ3RoKGxpbmUpO1xuICAgICAgICAgICAgbGluZUFuZ2xlID0gTWF0aC5hdGFuMihsaW5lWzFdLnkgLSBsaW5lWzBdLnksIGxpbmVbMV0ueCAtIGxpbmVbMF0ueCk7XG4gICAgICAgICAgICBsaW5lID0gZ2V0RXh0ZW5kZWRMaW5lKGxpbmUsIGxpbmVBbmdsZSwgTWF0aC5mbG9vcihsaW5lTGVuZ3RoICogMC4xKSk7XG4gICAgICAgICAgICBpZiAobGluZSA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdCA9IHRyeURlY29kZShsaW5lKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnlEZWNvZGVCcnV0ZUZvcmNlKGJveCwgbGluZSwgbGluZUFuZ2xlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVzdWx0ICYmIGNvbmZpZy5kcmF3U2NhbmxpbmUgJiYgY3R4KSB7XG4gICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UGF0aChsaW5lLCB7eDogJ3gnLCB5OiAneSd9LCBjdHgsIHtjb2xvcjogJ3JlZCcsIGxpbmVXaWR0aDogM30pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNvZGVSZXN1bHQ6IHJlc3VsdC5jb2RlUmVzdWx0LFxuICAgICAgICAgICAgICAgIGxpbmU6IGxpbmUsXG4gICAgICAgICAgICAgICAgYW5nbGU6IGxpbmVBbmdsZSxcbiAgICAgICAgICAgICAgICBwYXR0ZXJuOiByZXN1bHQuYmFyY29kZUxpbmUubGluZSxcbiAgICAgICAgICAgICAgICB0aHJlc2hvbGQ6IHJlc3VsdC5iYXJjb2RlTGluZS50aHJlc2hvbGRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGVjb2RlRnJvbUJvdW5kaW5nQm94OiBmdW5jdGlvbihib3gpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVjb2RlRnJvbUJvdW5kaW5nQm94KGJveCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVjb2RlRnJvbUJvdW5kaW5nQm94ZXM6IGZ1bmN0aW9uKGJveGVzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGksIHJlc3VsdDtcbiAgICAgICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGJveGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRlY29kZUZyb21Cb3VuZGluZ0JveChib3hlc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LmNvZGVSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ib3ggPSBib3hlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0UmVhZGVyczogZnVuY3Rpb24ocmVhZGVycykge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5yZWFkZXJzID0gcmVhZGVycztcbiAgICAgICAgICAgICAgICBfYmFyY29kZVJlYWRlcnMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICBpbml0UmVhZGVycygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iYXJjb2RlX2RlY29kZXIuanNcbiAqKi8iLCJpbXBvcnQgQ1ZVdGlscyBmcm9tICcuL2N2X3V0aWxzJztcbmltcG9ydCBJbWFnZVdyYXBwZXIgZnJvbSAnLi9pbWFnZV93cmFwcGVyJztcblxudmFyIEJyZXNlbmhhbSA9IHt9O1xuXG52YXIgU2xvcGUgPSB7XG4gICAgRElSOiB7XG4gICAgICAgIFVQOiAxLFxuICAgICAgICBET1dOOiAtMVxuICAgIH1cbn07XG4vKipcbiAqIFNjYW5zIGEgbGluZSBvZiB0aGUgZ2l2ZW4gaW1hZ2UgZnJvbSBwb2ludCBwMSB0byBwMiBhbmQgcmV0dXJucyBhIHJlc3VsdCBvYmplY3QgY29udGFpbmluZ1xuICogZ3JheS1zY2FsZSB2YWx1ZXMgKDAtMjU1KSBvZiB0aGUgdW5kZXJseWluZyBwaXhlbHMgaW4gYWRkaXRpb24gdG8gdGhlIG1pblxuICogYW5kIG1heCB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gaW1hZ2VXcmFwcGVyXG4gKiBAcGFyYW0ge09iamVjdH0gcDEgVGhlIHN0YXJ0IHBvaW50IHt4LHl9XG4gKiBAcGFyYW0ge09iamVjdH0gcDIgVGhlIGVuZCBwb2ludCB7eCx5fVxuICogQHJldHVybnMge2xpbmUsIG1pbiwgbWF4fVxuICovXG5CcmVzZW5oYW0uZ2V0QmFyY29kZUxpbmUgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIHAxLCBwMikge1xuICAgIHZhciB4MCA9IHAxLnggfCAwLFxuICAgICAgICB5MCA9IHAxLnkgfCAwLFxuICAgICAgICB4MSA9IHAyLnggfCAwLFxuICAgICAgICB5MSA9IHAyLnkgfCAwLFxuICAgICAgICBzdGVlcCA9IE1hdGguYWJzKHkxIC0geTApID4gTWF0aC5hYnMoeDEgLSB4MCksXG4gICAgICAgIGRlbHRheCxcbiAgICAgICAgZGVsdGF5LFxuICAgICAgICBlcnJvcixcbiAgICAgICAgeXN0ZXAsXG4gICAgICAgIHksXG4gICAgICAgIHRtcCxcbiAgICAgICAgeCxcbiAgICAgICAgbGluZSA9IFtdLFxuICAgICAgICBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YSxcbiAgICAgICAgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54LFxuICAgICAgICBzdW0gPSAwLFxuICAgICAgICB2YWwsXG4gICAgICAgIG1pbiA9IDI1NSxcbiAgICAgICAgbWF4ID0gMDtcblxuICAgIGZ1bmN0aW9uIHJlYWQoYSwgYikge1xuICAgICAgICB2YWwgPSBpbWFnZURhdGFbYiAqIHdpZHRoICsgYV07XG4gICAgICAgIHN1bSArPSB2YWw7XG4gICAgICAgIG1pbiA9IHZhbCA8IG1pbiA/IHZhbCA6IG1pbjtcbiAgICAgICAgbWF4ID0gdmFsID4gbWF4ID8gdmFsIDogbWF4O1xuICAgICAgICBsaW5lLnB1c2godmFsKTtcbiAgICB9XG5cbiAgICBpZiAoc3RlZXApIHtcbiAgICAgICAgdG1wID0geDA7XG4gICAgICAgIHgwID0geTA7XG4gICAgICAgIHkwID0gdG1wO1xuXG4gICAgICAgIHRtcCA9IHgxO1xuICAgICAgICB4MSA9IHkxO1xuICAgICAgICB5MSA9IHRtcDtcbiAgICB9XG4gICAgaWYgKHgwID4geDEpIHtcbiAgICAgICAgdG1wID0geDA7XG4gICAgICAgIHgwID0geDE7XG4gICAgICAgIHgxID0gdG1wO1xuXG4gICAgICAgIHRtcCA9IHkwO1xuICAgICAgICB5MCA9IHkxO1xuICAgICAgICB5MSA9IHRtcDtcbiAgICB9XG4gICAgZGVsdGF4ID0geDEgLSB4MDtcbiAgICBkZWx0YXkgPSBNYXRoLmFicyh5MSAtIHkwKTtcbiAgICBlcnJvciA9IChkZWx0YXggLyAyKSB8IDA7XG4gICAgeSA9IHkwO1xuICAgIHlzdGVwID0geTAgPCB5MSA/IDEgOiAtMTtcbiAgICBmb3IgKCB4ID0geDA7IHggPCB4MTsgeCsrKSB7XG4gICAgICAgIGlmIChzdGVlcCl7XG4gICAgICAgICAgICByZWFkKHksIHgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVhZCh4LCB5KTtcbiAgICAgICAgfVxuICAgICAgICBlcnJvciA9IGVycm9yIC0gZGVsdGF5O1xuICAgICAgICBpZiAoZXJyb3IgPCAwKSB7XG4gICAgICAgICAgICB5ID0geSArIHlzdGVwO1xuICAgICAgICAgICAgZXJyb3IgPSBlcnJvciArIGRlbHRheDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGxpbmU6IGxpbmUsXG4gICAgICAgIG1pbjogbWluLFxuICAgICAgICBtYXg6IG1heFxuICAgIH07XG59O1xuXG5CcmVzZW5oYW0udG9PdHN1QmluYXJ5TGluZSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgIHZhciBsaW5lID0gcmVzdWx0LmxpbmUsXG4gICAgICAgIGltYWdlID0gbmV3IEltYWdlV3JhcHBlcih7eDogbGluZS5sZW5ndGggLSAxLCB5OiAxfSwgbGluZSksXG4gICAgICAgIHRocmVzaG9sZCA9IENWVXRpbHMuZGV0ZXJtaW5lT3RzdVRocmVzaG9sZChpbWFnZSwgNSk7XG5cbiAgICBsaW5lID0gQ1ZVdGlscy5zaGFycGVuTGluZShsaW5lKTtcbiAgICBDVlV0aWxzLnRocmVzaG9sZEltYWdlKGltYWdlLCB0aHJlc2hvbGQpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGluZTogbGluZSxcbiAgICAgICAgdGhyZXNob2xkOiB0aHJlc2hvbGRcbiAgICB9O1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgcmVzdWx0IGZyb20gZ2V0QmFyY29kZUxpbmUgaW50byBhIGJpbmFyeSByZXByZXNlbnRhdGlvblxuICogYWxzbyBjb25zaWRlcmluZyB0aGUgZnJlcXVlbmN5IGFuZCBzbG9wZSBvZiB0aGUgc2lnbmFsIGZvciBtb3JlIHJvYnVzdCByZXN1bHRzXG4gKiBAcGFyYW0ge09iamVjdH0gcmVzdWx0IHtsaW5lLCBtaW4sIG1heH1cbiAqL1xuQnJlc2VuaGFtLnRvQmluYXJ5TGluZSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgIHZhciBtaW4gPSByZXN1bHQubWluLFxuICAgICAgICBtYXggPSByZXN1bHQubWF4LFxuICAgICAgICBsaW5lID0gcmVzdWx0LmxpbmUsXG4gICAgICAgIHNsb3BlLFxuICAgICAgICBzbG9wZTIsXG4gICAgICAgIGNlbnRlciA9IG1pbiArIChtYXggLSBtaW4pIC8gMixcbiAgICAgICAgZXh0cmVtYSA9IFtdLFxuICAgICAgICBjdXJyZW50RGlyLFxuICAgICAgICBkaXIsXG4gICAgICAgIHRocmVzaG9sZCA9IChtYXggLSBtaW4pIC8gMTIsXG4gICAgICAgIHJUaHJlc2hvbGQgPSAtdGhyZXNob2xkLFxuICAgICAgICBpLFxuICAgICAgICBqO1xuXG4gICAgLy8gMS4gZmluZCBleHRyZW1hXG4gICAgY3VycmVudERpciA9IGxpbmVbMF0gPiBjZW50ZXIgPyBTbG9wZS5ESVIuVVAgOiBTbG9wZS5ESVIuRE9XTjtcbiAgICBleHRyZW1hLnB1c2goe1xuICAgICAgICBwb3M6IDAsXG4gICAgICAgIHZhbDogbGluZVswXVxuICAgIH0pO1xuICAgIGZvciAoIGkgPSAwOyBpIDwgbGluZS5sZW5ndGggLSAyOyBpKyspIHtcbiAgICAgICAgc2xvcGUgPSAobGluZVtpICsgMV0gLSBsaW5lW2ldKTtcbiAgICAgICAgc2xvcGUyID0gKGxpbmVbaSArIDJdIC0gbGluZVtpICsgMV0pO1xuICAgICAgICBpZiAoKHNsb3BlICsgc2xvcGUyKSA8IHJUaHJlc2hvbGQgJiYgbGluZVtpICsgMV0gPCAoY2VudGVyICogMS41KSkge1xuICAgICAgICAgICAgZGlyID0gU2xvcGUuRElSLkRPV047XG4gICAgICAgIH0gZWxzZSBpZiAoKHNsb3BlICsgc2xvcGUyKSA+IHRocmVzaG9sZCAmJiBsaW5lW2kgKyAxXSA+IChjZW50ZXIgKiAwLjUpKSB7XG4gICAgICAgICAgICBkaXIgPSBTbG9wZS5ESVIuVVA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaXIgPSBjdXJyZW50RGlyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnJlbnREaXIgIT09IGRpcikge1xuICAgICAgICAgICAgZXh0cmVtYS5wdXNoKHtcbiAgICAgICAgICAgICAgICBwb3M6IGksXG4gICAgICAgICAgICAgICAgdmFsOiBsaW5lW2ldXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGN1cnJlbnREaXIgPSBkaXI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZXh0cmVtYS5wdXNoKHtcbiAgICAgICAgcG9zOiBsaW5lLmxlbmd0aCxcbiAgICAgICAgdmFsOiBsaW5lW2xpbmUubGVuZ3RoIC0gMV1cbiAgICB9KTtcblxuICAgIGZvciAoIGogPSBleHRyZW1hWzBdLnBvczsgaiA8IGV4dHJlbWFbMV0ucG9zOyBqKyspIHtcbiAgICAgICAgbGluZVtqXSA9IGxpbmVbal0gPiBjZW50ZXIgPyAwIDogMTtcbiAgICB9XG5cbiAgICAvLyBpdGVyYXRlIG92ZXIgZXh0cmVtYSBhbmQgY29udmVydCB0byBiaW5hcnkgYmFzZWQgb24gYXZnIGJldHdlZW4gbWlubWF4XG4gICAgZm9yICggaSA9IDE7IGkgPCBleHRyZW1hLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBpZiAoZXh0cmVtYVtpICsgMV0udmFsID4gZXh0cmVtYVtpXS52YWwpIHtcbiAgICAgICAgICAgIHRocmVzaG9sZCA9IChleHRyZW1hW2ldLnZhbCArICgoZXh0cmVtYVtpICsgMV0udmFsIC0gZXh0cmVtYVtpXS52YWwpIC8gMykgKiAyKSB8IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJlc2hvbGQgPSAoZXh0cmVtYVtpICsgMV0udmFsICsgKChleHRyZW1hW2ldLnZhbCAtIGV4dHJlbWFbaSArIDFdLnZhbCkgLyAzKSkgfCAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICggaiA9IGV4dHJlbWFbaV0ucG9zOyBqIDwgZXh0cmVtYVtpICsgMV0ucG9zOyBqKyspIHtcbiAgICAgICAgICAgIGxpbmVbal0gPSBsaW5lW2pdID4gdGhyZXNob2xkID8gMCA6IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBsaW5lOiBsaW5lLFxuICAgICAgICB0aHJlc2hvbGQ6IHRocmVzaG9sZFxuICAgIH07XG59O1xuXG4vKipcbiAqIFVzZWQgZm9yIGRldmVsb3BtZW50IG9ubHlcbiAqL1xuQnJlc2VuaGFtLmRlYnVnID0ge1xuICAgIHByaW50RnJlcXVlbmN5OiBmdW5jdGlvbihsaW5lLCBjYW52YXMpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICBjYW52YXMud2lkdGggPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IDI1NjtcblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmx1ZVwiO1xuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8oaSwgMjU1KTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oaSwgMjU1IC0gbGluZVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfSxcblxuICAgIHByaW50UGF0dGVybjogZnVuY3Rpb24obGluZSwgY2FudmFzKSB7XG4gICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLCBpO1xuXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGxpbmUubGVuZ3RoO1xuICAgICAgICBjdHguZmlsbENvbG9yID0gXCJibGFja1wiO1xuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChsaW5lW2ldID09PSAxKSB7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KGksIDAsIDEsIDEwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBCcmVzZW5oYW07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icmVzZW5oYW0uanNcbiAqKi8iLCJpbXBvcnQgQmFyY29kZVJlYWRlciBmcm9tICcuL2JhcmNvZGVfcmVhZGVyJztcblxuZnVuY3Rpb24gQ29kZTEyOFJlYWRlcigpIHtcbiAgICBCYXJjb2RlUmVhZGVyLmNhbGwodGhpcyk7XG59XG5cbnZhciBwcm9wZXJ0aWVzID0ge1xuICAgIENPREVfU0hJRlQ6IHt2YWx1ZTogOTh9LFxuICAgIENPREVfQzoge3ZhbHVlOiA5OX0sXG4gICAgQ09ERV9COiB7dmFsdWU6IDEwMH0sXG4gICAgQ09ERV9BOiB7dmFsdWU6IDEwMX0sXG4gICAgU1RBUlRfQ09ERV9BOiB7dmFsdWU6IDEwM30sXG4gICAgU1RBUlRfQ09ERV9COiB7dmFsdWU6IDEwNH0sXG4gICAgU1RBUlRfQ09ERV9DOiB7dmFsdWU6IDEwNX0sXG4gICAgU1RPUF9DT0RFOiB7dmFsdWU6IDEwNn0sXG4gICAgTU9EVUxPOiB7dmFsdWU6IDExfSxcbiAgICBDT0RFX1BBVFRFUk46IHt2YWx1ZTogW1xuICAgICAgICBbMiwgMSwgMiwgMiwgMiwgMl0sXG4gICAgICAgIFsyLCAyLCAyLCAxLCAyLCAyXSxcbiAgICAgICAgWzIsIDIsIDIsIDIsIDIsIDFdLFxuICAgICAgICBbMSwgMiwgMSwgMiwgMiwgM10sXG4gICAgICAgIFsxLCAyLCAxLCAzLCAyLCAyXSxcbiAgICAgICAgWzEsIDMsIDEsIDIsIDIsIDJdLFxuICAgICAgICBbMSwgMiwgMiwgMiwgMSwgM10sXG4gICAgICAgIFsxLCAyLCAyLCAzLCAxLCAyXSxcbiAgICAgICAgWzEsIDMsIDIsIDIsIDEsIDJdLFxuICAgICAgICBbMiwgMiwgMSwgMiwgMSwgM10sXG4gICAgICAgIFsyLCAyLCAxLCAzLCAxLCAyXSxcbiAgICAgICAgWzIsIDMsIDEsIDIsIDEsIDJdLFxuICAgICAgICBbMSwgMSwgMiwgMiwgMywgMl0sXG4gICAgICAgIFsxLCAyLCAyLCAxLCAzLCAyXSxcbiAgICAgICAgWzEsIDIsIDIsIDIsIDMsIDFdLFxuICAgICAgICBbMSwgMSwgMywgMiwgMiwgMl0sXG4gICAgICAgIFsxLCAyLCAzLCAxLCAyLCAyXSxcbiAgICAgICAgWzEsIDIsIDMsIDIsIDIsIDFdLFxuICAgICAgICBbMiwgMiwgMywgMiwgMSwgMV0sXG4gICAgICAgIFsyLCAyLCAxLCAxLCAzLCAyXSxcbiAgICAgICAgWzIsIDIsIDEsIDIsIDMsIDFdLFxuICAgICAgICBbMiwgMSwgMywgMiwgMSwgMl0sXG4gICAgICAgIFsyLCAyLCAzLCAxLCAxLCAyXSxcbiAgICAgICAgWzMsIDEsIDIsIDEsIDMsIDFdLFxuICAgICAgICBbMywgMSwgMSwgMiwgMiwgMl0sXG4gICAgICAgIFszLCAyLCAxLCAxLCAyLCAyXSxcbiAgICAgICAgWzMsIDIsIDEsIDIsIDIsIDFdLFxuICAgICAgICBbMywgMSwgMiwgMiwgMSwgMl0sXG4gICAgICAgIFszLCAyLCAyLCAxLCAxLCAyXSxcbiAgICAgICAgWzMsIDIsIDIsIDIsIDEsIDFdLFxuICAgICAgICBbMiwgMSwgMiwgMSwgMiwgM10sXG4gICAgICAgIFsyLCAxLCAyLCAzLCAyLCAxXSxcbiAgICAgICAgWzIsIDMsIDIsIDEsIDIsIDFdLFxuICAgICAgICBbMSwgMSwgMSwgMywgMiwgM10sXG4gICAgICAgIFsxLCAzLCAxLCAxLCAyLCAzXSxcbiAgICAgICAgWzEsIDMsIDEsIDMsIDIsIDFdLFxuICAgICAgICBbMSwgMSwgMiwgMywgMSwgM10sXG4gICAgICAgIFsxLCAzLCAyLCAxLCAxLCAzXSxcbiAgICAgICAgWzEsIDMsIDIsIDMsIDEsIDFdLFxuICAgICAgICBbMiwgMSwgMSwgMywgMSwgM10sXG4gICAgICAgIFsyLCAzLCAxLCAxLCAxLCAzXSxcbiAgICAgICAgWzIsIDMsIDEsIDMsIDEsIDFdLFxuICAgICAgICBbMSwgMSwgMiwgMSwgMywgM10sXG4gICAgICAgIFsxLCAxLCAyLCAzLCAzLCAxXSxcbiAgICAgICAgWzEsIDMsIDIsIDEsIDMsIDFdLFxuICAgICAgICBbMSwgMSwgMywgMSwgMiwgM10sXG4gICAgICAgIFsxLCAxLCAzLCAzLCAyLCAxXSxcbiAgICAgICAgWzEsIDMsIDMsIDEsIDIsIDFdLFxuICAgICAgICBbMywgMSwgMywgMSwgMiwgMV0sXG4gICAgICAgIFsyLCAxLCAxLCAzLCAzLCAxXSxcbiAgICAgICAgWzIsIDMsIDEsIDEsIDMsIDFdLFxuICAgICAgICBbMiwgMSwgMywgMSwgMSwgM10sXG4gICAgICAgIFsyLCAxLCAzLCAzLCAxLCAxXSxcbiAgICAgICAgWzIsIDEsIDMsIDEsIDMsIDFdLFxuICAgICAgICBbMywgMSwgMSwgMSwgMiwgM10sXG4gICAgICAgIFszLCAxLCAxLCAzLCAyLCAxXSxcbiAgICAgICAgWzMsIDMsIDEsIDEsIDIsIDFdLFxuICAgICAgICBbMywgMSwgMiwgMSwgMSwgM10sXG4gICAgICAgIFszLCAxLCAyLCAzLCAxLCAxXSxcbiAgICAgICAgWzMsIDMsIDIsIDEsIDEsIDFdLFxuICAgICAgICBbMywgMSwgNCwgMSwgMSwgMV0sXG4gICAgICAgIFsyLCAyLCAxLCA0LCAxLCAxXSxcbiAgICAgICAgWzQsIDMsIDEsIDEsIDEsIDFdLFxuICAgICAgICBbMSwgMSwgMSwgMiwgMiwgNF0sXG4gICAgICAgIFsxLCAxLCAxLCA0LCAyLCAyXSxcbiAgICAgICAgWzEsIDIsIDEsIDEsIDIsIDRdLFxuICAgICAgICBbMSwgMiwgMSwgNCwgMiwgMV0sXG4gICAgICAgIFsxLCA0LCAxLCAxLCAyLCAyXSxcbiAgICAgICAgWzEsIDQsIDEsIDIsIDIsIDFdLFxuICAgICAgICBbMSwgMSwgMiwgMiwgMSwgNF0sXG4gICAgICAgIFsxLCAxLCAyLCA0LCAxLCAyXSxcbiAgICAgICAgWzEsIDIsIDIsIDEsIDEsIDRdLFxuICAgICAgICBbMSwgMiwgMiwgNCwgMSwgMV0sXG4gICAgICAgIFsxLCA0LCAyLCAxLCAxLCAyXSxcbiAgICAgICAgWzEsIDQsIDIsIDIsIDEsIDFdLFxuICAgICAgICBbMiwgNCwgMSwgMiwgMSwgMV0sXG4gICAgICAgIFsyLCAyLCAxLCAxLCAxLCA0XSxcbiAgICAgICAgWzQsIDEsIDMsIDEsIDEsIDFdLFxuICAgICAgICBbMiwgNCwgMSwgMSwgMSwgMl0sXG4gICAgICAgIFsxLCAzLCA0LCAxLCAxLCAxXSxcbiAgICAgICAgWzEsIDEsIDEsIDIsIDQsIDJdLFxuICAgICAgICBbMSwgMiwgMSwgMSwgNCwgMl0sXG4gICAgICAgIFsxLCAyLCAxLCAyLCA0LCAxXSxcbiAgICAgICAgWzEsIDEsIDQsIDIsIDEsIDJdLFxuICAgICAgICBbMSwgMiwgNCwgMSwgMSwgMl0sXG4gICAgICAgIFsxLCAyLCA0LCAyLCAxLCAxXSxcbiAgICAgICAgWzQsIDEsIDEsIDIsIDEsIDJdLFxuICAgICAgICBbNCwgMiwgMSwgMSwgMSwgMl0sXG4gICAgICAgIFs0LCAyLCAxLCAyLCAxLCAxXSxcbiAgICAgICAgWzIsIDEsIDIsIDEsIDQsIDFdLFxuICAgICAgICBbMiwgMSwgNCwgMSwgMiwgMV0sXG4gICAgICAgIFs0LCAxLCAyLCAxLCAyLCAxXSxcbiAgICAgICAgWzEsIDEsIDEsIDEsIDQsIDNdLFxuICAgICAgICBbMSwgMSwgMSwgMywgNCwgMV0sXG4gICAgICAgIFsxLCAzLCAxLCAxLCA0LCAxXSxcbiAgICAgICAgWzEsIDEsIDQsIDEsIDEsIDNdLFxuICAgICAgICBbMSwgMSwgNCwgMywgMSwgMV0sXG4gICAgICAgIFs0LCAxLCAxLCAxLCAxLCAzXSxcbiAgICAgICAgWzQsIDEsIDEsIDMsIDEsIDFdLFxuICAgICAgICBbMSwgMSwgMywgMSwgNCwgMV0sXG4gICAgICAgIFsxLCAxLCA0LCAxLCAzLCAxXSxcbiAgICAgICAgWzMsIDEsIDEsIDEsIDQsIDFdLFxuICAgICAgICBbNCwgMSwgMSwgMSwgMywgMV0sXG4gICAgICAgIFsyLCAxLCAxLCA0LCAxLCAyXSxcbiAgICAgICAgWzIsIDEsIDEsIDIsIDEsIDRdLFxuICAgICAgICBbMiwgMSwgMSwgMiwgMywgMl0sXG4gICAgICAgIFsyLCAzLCAzLCAxLCAxLCAxLCAyXVxuICAgIF19LFxuICAgIFNJTkdMRV9DT0RFX0VSUk9SOiB7dmFsdWU6IDF9LFxuICAgIEFWR19DT0RFX0VSUk9SOiB7dmFsdWU6IDAuNX0sXG4gICAgRk9STUFUOiB7dmFsdWU6IFwiY29kZV8xMjhcIiwgd3JpdGVhYmxlOiBmYWxzZX1cbn07XG5cbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XG5Db2RlMTI4UmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvZGUxMjhSZWFkZXI7XG5cbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlLl9kZWNvZGVDb2RlID0gZnVuY3Rpb24oc3RhcnQpIHtcbiAgICB2YXIgY291bnRlciA9IFswLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgaSxcbiAgICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICAgIG9mZnNldCA9IHN0YXJ0LFxuICAgICAgICBpc1doaXRlID0gIXNlbGYuX3Jvd1tvZmZzZXRdLFxuICAgICAgICBjb3VudGVyUG9zID0gMCxcbiAgICAgICAgYmVzdE1hdGNoID0ge1xuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXG4gICAgICAgICAgICBjb2RlOiAtMSxcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgIGVuZDogc3RhcnRcbiAgICAgICAgfSxcbiAgICAgICAgY29kZSxcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIG5vcm1hbGl6ZWQ7XG5cbiAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZCA9IHNlbGYuX25vcm1hbGl6ZShjb3VudGVyKTtcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsaXplZCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvZGUgPSAwOyBjb2RlIDwgc2VsZi5DT0RFX1BBVFRFUk4ubGVuZ3RoOyBjb2RlKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKG5vcm1hbGl6ZWQsIHNlbGYuQ09ERV9QQVRURVJOW2NvZGVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciA8IGJlc3RNYXRjaC5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb2RlID0gY29kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZW5kID0gaTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJlc3RNYXRjaDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuQ29kZTEyOFJlYWRlci5wcm90b3R5cGUuX2ZpbmRTdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb3VudGVyID0gWzAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICBpLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpLFxuICAgICAgICBpc1doaXRlID0gZmFsc2UsXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxuICAgICAgICBiZXN0TWF0Y2ggPSB7XG4gICAgICAgICAgICBlcnJvcjogTnVtYmVyLk1BWF9WQUxVRSxcbiAgICAgICAgICAgIGNvZGU6IC0xLFxuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICBlbmQ6IDBcbiAgICAgICAgfSxcbiAgICAgICAgY29kZSxcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIGosXG4gICAgICAgIHN1bSxcbiAgICAgICAgbm9ybWFsaXplZDtcblxuICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBjb3VudGVyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBzdW0gPSAwO1xuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgY291bnRlci5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gY291bnRlcltqXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZCA9IHNlbGYuX25vcm1hbGl6ZShjb3VudGVyKTtcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsaXplZCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvZGUgPSBzZWxmLlNUQVJUX0NPREVfQTsgY29kZSA8PSBzZWxmLlNUQVJUX0NPREVfQzsgY29kZSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHNlbGYuX21hdGNoUGF0dGVybihub3JtYWxpemVkLCBzZWxmLkNPREVfUEFUVEVSTltjb2RlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBiZXN0TWF0Y2guZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guY29kZSA9IGNvZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGJlc3RNYXRjaC5lcnJvciA8IHNlbGYuQVZHX0NPREVfRVJST1IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5zdGFydCA9IGkgLSBzdW07XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZW5kID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IDQ7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2pdID0gY291bnRlcltqICsgMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvdW50ZXJbNF0gPSAwO1xuICAgICAgICAgICAgICAgIGNvdW50ZXJbNV0gPSAwO1xuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MtLTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XG4gICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5Db2RlMTI4UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBzdGFydEluZm8gPSBzZWxmLl9maW5kU3RhcnQoKSxcbiAgICAgICAgY29kZSA9IG51bGwsXG4gICAgICAgIGRvbmUgPSBmYWxzZSxcbiAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgIG11bHRpcGxpZXIgPSAwLFxuICAgICAgICBjaGVja3N1bSA9IDAsXG4gICAgICAgIGNvZGVzZXQsXG4gICAgICAgIHJhd1Jlc3VsdCA9IFtdLFxuICAgICAgICBkZWNvZGVkQ29kZXMgPSBbXSxcbiAgICAgICAgc2hpZnROZXh0ID0gZmFsc2UsXG4gICAgICAgIHVuc2hpZnQsXG4gICAgICAgIHJlbW92ZUxhc3RDaGFyYWN0ZXIgPSB0cnVlO1xuXG4gICAgaWYgKHN0YXJ0SW5mbyA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29kZSA9IHtcbiAgICAgICAgY29kZTogc3RhcnRJbmZvLmNvZGUsXG4gICAgICAgIHN0YXJ0OiBzdGFydEluZm8uc3RhcnQsXG4gICAgICAgIGVuZDogc3RhcnRJbmZvLmVuZFxuICAgIH07XG4gICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XG4gICAgY2hlY2tzdW0gPSBjb2RlLmNvZGU7XG4gICAgc3dpdGNoIChjb2RlLmNvZGUpIHtcbiAgICBjYXNlIHNlbGYuU1RBUlRfQ09ERV9BOlxuICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0E7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2Ugc2VsZi5TVEFSVF9DT0RFX0I6XG4gICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQjtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBzZWxmLlNUQVJUX0NPREVfQzpcbiAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9DO1xuICAgICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB3aGlsZSAoIWRvbmUpIHtcbiAgICAgICAgdW5zaGlmdCA9IHNoaWZ0TmV4dDtcbiAgICAgICAgc2hpZnROZXh0ID0gZmFsc2U7XG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kKTtcbiAgICAgICAgaWYgKGNvZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgIT09IHNlbGYuU1RPUF9DT0RFKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlTGFzdENoYXJhY3RlciA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgIT09IHNlbGYuU1RPUF9DT0RFKSB7XG4gICAgICAgICAgICAgICAgcmF3UmVzdWx0LnB1c2goY29kZS5jb2RlKTtcbiAgICAgICAgICAgICAgICBtdWx0aXBsaWVyKys7XG4gICAgICAgICAgICAgICAgY2hlY2tzdW0gKz0gbXVsdGlwbGllciAqIGNvZGUuY29kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGNvZGVzZXQpIHtcbiAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0E6XG4gICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSA8IDY0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoMzIgKyBjb2RlLmNvZGUpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvZGUuY29kZSA8IDk2KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZS5jb2RlIC0gNjQpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29kZS5jb2RlICE9PSBzZWxmLlNUT1BfQ09ERSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTGFzdENoYXJhY3RlciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY29kZS5jb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX1NISUZUOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnROZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9COlxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9CO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0M6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0M7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLlNUT1BfQ09ERTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9COlxuICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgPCA5Nikge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKDMyICsgY29kZS5jb2RlKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSAhPT0gc2VsZi5TVE9QX0NPREUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUxhc3RDaGFyYWN0ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvZGUuY29kZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9TSElGVDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0TmV4dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0E7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9DOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9DO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5TVE9QX0NPREU6XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQzpcbiAgICAgICAgICAgICAgICBpZiAoY29kZS5jb2RlIDwgMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSA8IDEwID8gXCIwXCIgKyBjb2RlLmNvZGUgOiBjb2RlLmNvZGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgIT09IHNlbGYuU1RPUF9DT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVMYXN0Q2hhcmFjdGVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjb2RlLmNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9COlxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9CO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5TVE9QX0NPREU6XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVuc2hpZnQpIHtcbiAgICAgICAgICAgIGNvZGVzZXQgPSBjb2Rlc2V0ID09PSBzZWxmLkNPREVfQSA/IHNlbGYuQ09ERV9CIDogc2VsZi5DT0RFX0E7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb2RlLmVuZCA9IHNlbGYuX25leHRVbnNldChzZWxmLl9yb3csIGNvZGUuZW5kKTtcbiAgICBpZiAoIXNlbGYuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZShjb2RlKSl7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNoZWNrc3VtIC09IG11bHRpcGxpZXIgKiByYXdSZXN1bHRbcmF3UmVzdWx0Lmxlbmd0aCAtIDFdO1xuICAgIGlmIChjaGVja3N1bSAlIDEwMyAhPT0gcmF3UmVzdWx0W3Jhd1Jlc3VsdC5sZW5ndGggLSAxXSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoIXJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIGxhc3QgY29kZSBmcm9tIHJlc3VsdCAoY2hlY2tzdW0pXG4gICAgaWYgKHJlbW92ZUxhc3RDaGFyYWN0ZXIpIHtcbiAgICAgICAgcmVzdWx0LnNwbGljZShyZXN1bHQubGVuZ3RoIC0gMSwgMSk7XG4gICAgfVxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcbiAgICAgICAgc3RhcnQ6IHN0YXJ0SW5mby5zdGFydCxcbiAgICAgICAgZW5kOiBjb2RlLmVuZCxcbiAgICAgICAgY29kZXNldDogY29kZXNldCxcbiAgICAgICAgc3RhcnRJbmZvOiBzdGFydEluZm8sXG4gICAgICAgIGRlY29kZWRDb2RlczogZGVjb2RlZENvZGVzLFxuICAgICAgICBlbmRJbmZvOiBjb2RlXG4gICAgfTtcbn07XG5cblxuQmFyY29kZVJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZSA9IGZ1bmN0aW9uKGVuZEluZm8pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZDtcblxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IGVuZEluZm8uZW5kICsgKChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpIC8gMik7XG4gICAgaWYgKHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA8IHNlbGYuX3Jvdy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UoZW5kSW5mby5lbmQsIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCwgMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29kZTEyOFJlYWRlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NvZGVfMTI4X3JlYWRlci5qc1xuICoqLyIsImZ1bmN0aW9uIEJhcmNvZGVSZWFkZXIoY29uZmlnKSB7XG4gICAgdGhpcy5fcm93ID0gW107XG4gICAgdGhpcy5jb25maWcgPSBjb25maWcgfHwge307XG4gICAgcmV0dXJuIHRoaXM7XG59XG5cbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9uZXh0VW5zZXQgPSBmdW5jdGlvbihsaW5lLCBzdGFydCkge1xuICAgIHZhciBpO1xuXG4gICAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3RhcnQgPSAwO1xuICAgIH1cbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFsaW5lW2ldKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbGluZS5sZW5ndGg7XG59O1xuXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hQYXR0ZXJuID0gZnVuY3Rpb24oY291bnRlciwgY29kZSkge1xuICAgIHZhciBpLFxuICAgICAgICBlcnJvciA9IDAsXG4gICAgICAgIHNpbmdsZUVycm9yID0gMCxcbiAgICAgICAgbW9kdWxvID0gdGhpcy5NT0RVTE8sXG4gICAgICAgIG1heFNpbmdsZUVycm9yID0gdGhpcy5TSU5HTEVfQ09ERV9FUlJPUiB8fCAxO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2luZ2xlRXJyb3IgPSBNYXRoLmFicyhjb2RlW2ldIC0gY291bnRlcltpXSk7XG4gICAgICAgIGlmIChzaW5nbGVFcnJvciA+IG1heFNpbmdsZUVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgfVxuICAgICAgICBlcnJvciArPSBzaW5nbGVFcnJvcjtcbiAgICB9XG4gICAgcmV0dXJuIGVycm9yIC8gbW9kdWxvO1xufTtcblxuQmFyY29kZVJlYWRlci5wcm90b3R5cGUuX25leHRTZXQgPSBmdW5jdGlvbihsaW5lLCBvZmZzZXQpIHtcbiAgICB2YXIgaTtcblxuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuICAgIGZvciAoaSA9IG9mZnNldDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGxpbmVbaV0pIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBsaW5lLmxlbmd0aDtcbn07XG5cbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9ub3JtYWxpemUgPSBmdW5jdGlvbihjb3VudGVyLCBtb2R1bG8pIHtcbiAgICB2YXIgaSxcbiAgICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICAgIHN1bSA9IDAsXG4gICAgICAgIHJhdGlvLFxuICAgICAgICBudW1PbmVzID0gMCxcbiAgICAgICAgbm9ybWFsaXplZCA9IFtdLFxuICAgICAgICBub3JtID0gMDtcblxuICAgIGlmICghbW9kdWxvKSB7XG4gICAgICAgIG1vZHVsbyA9IHNlbGYuTU9EVUxPO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY291bnRlcltpXSA9PT0gMSkge1xuICAgICAgICAgICAgbnVtT25lcysrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VtICs9IGNvdW50ZXJbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmF0aW8gPSBzdW0gLyAobW9kdWxvIC0gbnVtT25lcyk7XG4gICAgaWYgKHJhdGlvID4gMS4wKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBub3JtID0gY291bnRlcltpXSA9PT0gMSA/IGNvdW50ZXJbaV0gOiBjb3VudGVyW2ldIC8gcmF0aW87XG4gICAgICAgICAgICBub3JtYWxpemVkLnB1c2gobm9ybSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByYXRpbyA9IChzdW0gKyBudW1PbmVzKSAvIG1vZHVsbztcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG5vcm0gPSBjb3VudGVyW2ldIC8gcmF0aW87XG4gICAgICAgICAgICBub3JtYWxpemVkLnB1c2gobm9ybSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWQ7XG59O1xuXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hUcmFjZSA9IGZ1bmN0aW9uKGNtcENvdW50ZXIsIGVwc2lsb24pIHtcbiAgICB2YXIgY291bnRlciA9IFtdLFxuICAgICAgICBpLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpLFxuICAgICAgICBpc1doaXRlID0gIXNlbGYuX3Jvd1tvZmZzZXRdLFxuICAgICAgICBjb3VudGVyUG9zID0gMCxcbiAgICAgICAgYmVzdE1hdGNoID0ge1xuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXG4gICAgICAgICAgICBjb2RlOiAtMSxcbiAgICAgICAgICAgIHN0YXJ0OiAwXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yO1xuXG4gICAgaWYgKGNtcENvdW50ZXIpIHtcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBjbXBDb3VudGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb3VudGVyLnB1c2goMCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcbiAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBjb3VudGVyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4oY291bnRlciwgY21wQ291bnRlcik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIDwgZXBzaWxvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLnN0YXJ0ID0gaSAtIG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmNvdW50ZXIgPSBjb3VudGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJlc3RNYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcbiAgICAgICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudGVyLnB1c2goMCk7XG4gICAgICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XG4gICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XG4gICAgICAgICAgICAgICAgY291bnRlci5wdXNoKDApO1xuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xuICAgICAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIGNtcENvdW50ZXIgd2FzIG5vdCBnaXZlblxuICAgIGJlc3RNYXRjaC5zdGFydCA9IG9mZnNldDtcbiAgICBiZXN0TWF0Y2guZW5kID0gc2VsZi5fcm93Lmxlbmd0aCAtIDE7XG4gICAgYmVzdE1hdGNoLmNvdW50ZXIgPSBjb3VudGVyO1xuICAgIHJldHVybiBiZXN0TWF0Y2g7XG59O1xuXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5kZWNvZGVQYXR0ZXJuID0gZnVuY3Rpb24ocGF0dGVybikge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgcmVzdWx0O1xuXG4gICAgc2VsZi5fcm93ID0gcGF0dGVybjtcbiAgICByZXN1bHQgPSBzZWxmLl9kZWNvZGUoKTtcbiAgICBpZiAocmVzdWx0ID09PSBudWxsKSB7XG4gICAgICAgIHNlbGYuX3Jvdy5yZXZlcnNlKCk7XG4gICAgICAgIHJlc3VsdCA9IHNlbGYuX2RlY29kZSgpO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXN1bHQuZGlyZWN0aW9uID0gQmFyY29kZVJlYWRlci5ESVJFQ1RJT04uUkVWRVJTRTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydCA9IHNlbGYuX3Jvdy5sZW5ndGggLSByZXN1bHQuc3RhcnQ7XG4gICAgICAgICAgICByZXN1bHQuZW5kID0gc2VsZi5fcm93Lmxlbmd0aCAtIHJlc3VsdC5lbmQ7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQuZGlyZWN0aW9uID0gQmFyY29kZVJlYWRlci5ESVJFQ1RJT04uRk9SV0FSRDtcbiAgICB9XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgICByZXN1bHQuZm9ybWF0ID0gc2VsZi5GT1JNQVQ7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hSYW5nZSA9IGZ1bmN0aW9uKHN0YXJ0LCBlbmQsIHZhbHVlKSB7XG4gICAgdmFyIGk7XG5cbiAgICBzdGFydCA9IHN0YXJ0IDwgMCA/IDAgOiBzdGFydDtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLl9yb3dbaV0gIT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fZmlsbENvdW50ZXJzID0gZnVuY3Rpb24ob2Zmc2V0LCBlbmQsIGlzV2hpdGUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxuICAgICAgICBpLFxuICAgICAgICBjb3VudGVycyA9IFtdO1xuXG4gICAgaXNXaGl0ZSA9ICh0eXBlb2YgaXNXaGl0ZSAhPT0gJ3VuZGVmaW5lZCcpID8gaXNXaGl0ZSA6IHRydWU7XG4gICAgb2Zmc2V0ID0gKHR5cGVvZiBvZmZzZXQgIT09ICd1bmRlZmluZWQnKSA/IG9mZnNldCA6IHNlbGYuX25leHRVbnNldChzZWxmLl9yb3cpO1xuICAgIGVuZCA9IGVuZCB8fCBzZWxmLl9yb3cubGVuZ3RoO1xuXG4gICAgY291bnRlcnNbY291bnRlclBvc10gPSAwO1xuICAgIGZvciAoaSA9IG9mZnNldDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XG4gICAgICAgICAgICBjb3VudGVyc1tjb3VudGVyUG9zXSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY291bnRlclBvcysrO1xuICAgICAgICAgICAgY291bnRlcnNbY291bnRlclBvc10gPSAxO1xuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb3VudGVycztcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgXCJGT1JNQVRcIiwge1xuICAgIHZhbHVlOiAndW5rbm93bicsXG4gICAgd3JpdGVhYmxlOiBmYWxzZVxufSk7XG5cbkJhcmNvZGVSZWFkZXIuRElSRUNUSU9OID0ge1xuICAgIEZPUldBUkQ6IDEsXG4gICAgUkVWRVJTRTogLTFcbn07XG5cbkJhcmNvZGVSZWFkZXIuRXhjZXB0aW9uID0ge1xuICAgIFN0YXJ0Tm90Rm91bmRFeGNlcHRpb246IFwiU3RhcnQtSW5mbyB3YXMgbm90IGZvdW5kIVwiLFxuICAgIENvZGVOb3RGb3VuZEV4Y2VwdGlvbjogXCJDb2RlIGNvdWxkIG5vdCBiZSBmb3VuZCFcIixcbiAgICBQYXR0ZXJuTm90Rm91bmRFeGNlcHRpb246IFwiUGF0dGVybiBjb3VsZCBub3QgYmUgZm91bmQhXCJcbn07XG5cbkJhcmNvZGVSZWFkZXIuQ09ORklHX0tFWVMgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgQmFyY29kZVJlYWRlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JhcmNvZGVfcmVhZGVyLmpzXG4gKiovIiwiaW1wb3J0IEJhcmNvZGVSZWFkZXIgZnJvbSAnLi9iYXJjb2RlX3JlYWRlcic7XG5cbmZ1bmN0aW9uIEVBTlJlYWRlcihvcHRzKSB7XG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMsIG9wdHMpO1xufVxuXG52YXIgcHJvcGVydGllcyA9IHtcbiAgICBDT0RFX0xfU1RBUlQ6IHt2YWx1ZTogMH0sXG4gICAgTU9EVUxPOiB7dmFsdWU6IDd9LFxuICAgIENPREVfR19TVEFSVDoge3ZhbHVlOiAxMH0sXG4gICAgU1RBUlRfUEFUVEVSTjoge3ZhbHVlOiBbMSAvIDMgKiA3LCAxIC8gMyAqIDcsIDEgLyAzICogN119LFxuICAgIFNUT1BfUEFUVEVSTjoge3ZhbHVlOiBbMSAvIDMgKiA3LCAxIC8gMyAqIDcsIDEgLyAzICogN119LFxuICAgIE1JRERMRV9QQVRURVJOOiB7dmFsdWU6IFsxIC8gNSAqIDcsIDEgLyA1ICogNywgMSAvIDUgKiA3LCAxIC8gNSAqIDcsIDEgLyA1ICogN119LFxuICAgIENPREVfUEFUVEVSTjoge3ZhbHVlOiBbXG4gICAgICAgIFszLCAyLCAxLCAxXSxcbiAgICAgICAgWzIsIDIsIDIsIDFdLFxuICAgICAgICBbMiwgMSwgMiwgMl0sXG4gICAgICAgIFsxLCA0LCAxLCAxXSxcbiAgICAgICAgWzEsIDEsIDMsIDJdLFxuICAgICAgICBbMSwgMiwgMywgMV0sXG4gICAgICAgIFsxLCAxLCAxLCA0XSxcbiAgICAgICAgWzEsIDMsIDEsIDJdLFxuICAgICAgICBbMSwgMiwgMSwgM10sXG4gICAgICAgIFszLCAxLCAxLCAyXSxcbiAgICAgICAgWzEsIDEsIDIsIDNdLFxuICAgICAgICBbMSwgMiwgMiwgMl0sXG4gICAgICAgIFsyLCAyLCAxLCAyXSxcbiAgICAgICAgWzEsIDEsIDQsIDFdLFxuICAgICAgICBbMiwgMywgMSwgMV0sXG4gICAgICAgIFsxLCAzLCAyLCAxXSxcbiAgICAgICAgWzQsIDEsIDEsIDFdLFxuICAgICAgICBbMiwgMSwgMywgMV0sXG4gICAgICAgIFszLCAxLCAyLCAxXSxcbiAgICAgICAgWzIsIDEsIDEsIDNdXG4gICAgXX0sXG4gICAgQ09ERV9GUkVRVUVOQ1k6IHt2YWx1ZTogWzAsIDExLCAxMywgMTQsIDE5LCAyNSwgMjgsIDIxLCAyMiwgMjZdfSxcbiAgICBTSU5HTEVfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjY3fSxcbiAgICBBVkdfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjI3fSxcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJlYW5fMTNcIiwgd3JpdGVhYmxlOiBmYWxzZX1cbn07XG5cbkVBTlJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcbkVBTlJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFQU5SZWFkZXI7XG5cbkVBTlJlYWRlci5wcm90b3R5cGUuX2RlY29kZUNvZGUgPSBmdW5jdGlvbihzdGFydCwgY29kZXJhbmdlKSB7XG4gICAgdmFyIGNvdW50ZXIgPSBbMCwgMCwgMCwgMF0sXG4gICAgICAgIGksXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBvZmZzZXQgPSBzdGFydCxcbiAgICAgICAgaXNXaGl0ZSA9ICFzZWxmLl9yb3dbb2Zmc2V0XSxcbiAgICAgICAgY291bnRlclBvcyA9IDAsXG4gICAgICAgIGJlc3RNYXRjaCA9IHtcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgICAgICAgY29kZTogLTEsXG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICBlbmQ6IHN0YXJ0XG4gICAgICAgIH0sXG4gICAgICAgIGNvZGUsXG4gICAgICAgIGVycm9yLFxuICAgICAgICBub3JtYWxpemVkO1xuXG4gICAgaWYgKCFjb2RlcmFuZ2UpIHtcbiAgICAgICAgY29kZXJhbmdlID0gc2VsZi5DT0RFX1BBVFRFUk4ubGVuZ3RoO1xuICAgIH1cblxuICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBjb3VudGVyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkID0gc2VsZi5fbm9ybWFsaXplKGNvdW50ZXIpO1xuICAgICAgICAgICAgICAgIGlmIChub3JtYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29kZSA9IDA7IGNvZGUgPCBjb2RlcmFuZ2U7IGNvZGUrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4obm9ybWFsaXplZCwgc2VsZi5DT0RFX1BBVFRFUk5bY29kZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIDwgYmVzdE1hdGNoLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmNvZGUgPSBjb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYmVzdE1hdGNoLmVycm9yID4gc2VsZi5BVkdfQ09ERV9FUlJPUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJlc3RNYXRjaDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZmluZFBhdHRlcm4gPSBmdW5jdGlvbihwYXR0ZXJuLCBvZmZzZXQsIGlzV2hpdGUsIHRyeUhhcmRlciwgZXBzaWxvbikge1xuICAgIHZhciBjb3VudGVyID0gW10sXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBpLFxuICAgICAgICBjb3VudGVyUG9zID0gMCxcbiAgICAgICAgYmVzdE1hdGNoID0ge1xuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXG4gICAgICAgICAgICBjb2RlOiAtMSxcbiAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICAgICAgZW5kOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yLFxuICAgICAgICBqLFxuICAgICAgICBzdW0sXG4gICAgICAgIG5vcm1hbGl6ZWQ7XG5cbiAgICBpZiAoIW9mZnNldCkge1xuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3Jvdyk7XG4gICAgfVxuXG4gICAgaWYgKGlzV2hpdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpc1doaXRlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRyeUhhcmRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRyeUhhcmRlciA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCBlcHNpbG9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZXBzaWxvbiA9IHNlbGYuQVZHX0NPREVfRVJST1I7XG4gICAgfVxuXG4gICAgZm9yICggaSA9IDA7IGkgPCBwYXR0ZXJuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvdW50ZXJbaV0gPSAwO1xuICAgIH1cblxuICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBjb3VudGVyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBzdW0gPSAwO1xuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgY291bnRlci5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gY291bnRlcltqXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZCA9IHNlbGYuX25vcm1hbGl6ZShjb3VudGVyKTtcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsaXplZCkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHNlbGYuX21hdGNoUGF0dGVybihub3JtYWxpemVkLCBwYXR0ZXJuKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBlcHNpbG9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5zdGFydCA9IGkgLSBzdW07XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZW5kID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRyeUhhcmRlcikge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IGNvdW50ZXIubGVuZ3RoIC0gMjsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2pdID0gY291bnRlcltqICsgMl07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyLmxlbmd0aCAtIDJdID0gMDtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyLmxlbmd0aCAtIDFdID0gMDtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlclBvcy0tO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XG4gICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5FQU5SZWFkZXIucHJvdG90eXBlLl9maW5kU3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQsXG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KSxcbiAgICAgICAgc3RhcnRJbmZvO1xuXG4gICAgd2hpbGUgKCFzdGFydEluZm8pIHtcbiAgICAgICAgc3RhcnRJbmZvID0gc2VsZi5fZmluZFBhdHRlcm4oc2VsZi5TVEFSVF9QQVRURVJOLCBvZmZzZXQpO1xuICAgICAgICBpZiAoIXN0YXJ0SW5mbykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGVhZGluZ1doaXRlc3BhY2VTdGFydCA9IHN0YXJ0SW5mby5zdGFydCAtIChzdGFydEluZm8uZW5kIC0gc3RhcnRJbmZvLnN0YXJ0KTtcbiAgICAgICAgaWYgKGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQgPj0gMCkge1xuICAgICAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UobGVhZGluZ1doaXRlc3BhY2VTdGFydCwgc3RhcnRJbmZvLnN0YXJ0LCAwKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGFydEluZm87XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb2Zmc2V0ID0gc3RhcnRJbmZvLmVuZDtcbiAgICAgICAgc3RhcnRJbmZvID0gbnVsbDtcbiAgICB9XG59O1xuXG5FQU5SZWFkZXIucHJvdG90eXBlLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbihlbmRJbmZvKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICB0cmFpbGluZ1doaXRlc3BhY2VFbmQ7XG5cbiAgICB0cmFpbGluZ1doaXRlc3BhY2VFbmQgPSBlbmRJbmZvLmVuZCArIChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpO1xuICAgIGlmICh0cmFpbGluZ1doaXRlc3BhY2VFbmQgPCBzZWxmLl9yb3cubGVuZ3RoKSB7XG4gICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKGVuZEluZm8uZW5kLCB0cmFpbGluZ1doaXRlc3BhY2VFbmQsIDApKSB7XG4gICAgICAgICAgICByZXR1cm4gZW5kSW5mbztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbkVBTlJlYWRlci5wcm90b3R5cGUuX2ZpbmRFbmQgPSBmdW5jdGlvbihvZmZzZXQsIGlzV2hpdGUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGVuZEluZm8gPSBzZWxmLl9maW5kUGF0dGVybihzZWxmLlNUT1BfUEFUVEVSTiwgb2Zmc2V0LCBpc1doaXRlLCBmYWxzZSk7XG5cbiAgICByZXR1cm4gZW5kSW5mbyAhPT0gbnVsbCA/IHNlbGYuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZShlbmRJbmZvKSA6IG51bGw7XG59O1xuXG5FQU5SZWFkZXIucHJvdG90eXBlLl9jYWxjdWxhdGVGaXJzdERpZ2l0ID0gZnVuY3Rpb24oY29kZUZyZXF1ZW5jeSkge1xuICAgIHZhciBpLFxuICAgICAgICBzZWxmID0gdGhpcztcblxuICAgIGZvciAoIGkgPSAwOyBpIDwgc2VsZi5DT0RFX0ZSRVFVRU5DWS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY29kZUZyZXF1ZW5jeSA9PT0gc2VsZi5DT0RFX0ZSRVFVRU5DWVtpXSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5FQU5SZWFkZXIucHJvdG90eXBlLl9kZWNvZGVQYXlsb2FkID0gZnVuY3Rpb24oY29kZSwgcmVzdWx0LCBkZWNvZGVkQ29kZXMpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICAgIGNvZGVGcmVxdWVuY3kgPSAweDAsXG4gICAgICAgIGZpcnN0RGlnaXQ7XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb2RlLmVuZCk7XG4gICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvZGUuY29kZSA+PSBzZWxmLkNPREVfR19TVEFSVCkge1xuICAgICAgICAgICAgY29kZS5jb2RlID0gY29kZS5jb2RlIC0gc2VsZi5DT0RFX0dfU1RBUlQ7XG4gICAgICAgICAgICBjb2RlRnJlcXVlbmN5IHw9IDEgPDwgKDUgLSBpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvZGVGcmVxdWVuY3kgfD0gMCA8PCAoNSAtIGkpO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSk7XG4gICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xuICAgIH1cblxuICAgIGZpcnN0RGlnaXQgPSBzZWxmLl9jYWxjdWxhdGVGaXJzdERpZ2l0KGNvZGVGcmVxdWVuY3kpO1xuICAgIGlmIChmaXJzdERpZ2l0ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXN1bHQudW5zaGlmdChmaXJzdERpZ2l0KTtcblxuICAgIGNvZGUgPSBzZWxmLl9maW5kUGF0dGVybihzZWxmLk1JRERMRV9QQVRURVJOLCBjb2RlLmVuZCwgdHJ1ZSwgZmFsc2UpO1xuICAgIGlmIChjb2RlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcblxuICAgIGZvciAoIGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kLCBzZWxmLkNPREVfR19TVEFSVCk7XG4gICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XG4gICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvZGU7XG59O1xuXG5FQU5SZWFkZXIucHJvdG90eXBlLl9kZWNvZGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RhcnRJbmZvLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgY29kZSxcbiAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgIGRlY29kZWRDb2RlcyA9IFtdO1xuXG4gICAgc3RhcnRJbmZvID0gc2VsZi5fZmluZFN0YXJ0KCk7XG4gICAgaWYgKCFzdGFydEluZm8pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvZGUgPSB7XG4gICAgICAgIGNvZGU6IHN0YXJ0SW5mby5jb2RlLFxuICAgICAgICBzdGFydDogc3RhcnRJbmZvLnN0YXJ0LFxuICAgICAgICBlbmQ6IHN0YXJ0SW5mby5lbmRcbiAgICB9O1xuICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xuICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVQYXlsb2FkKGNvZGUsIHJlc3VsdCwgZGVjb2RlZENvZGVzKTtcbiAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvZGUgPSBzZWxmLl9maW5kRW5kKGNvZGUuZW5kLCBmYWxzZSk7XG4gICAgaWYgKCFjb2RlKXtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XG5cbiAgICAvLyBDaGVja3N1bVxuICAgIGlmICghc2VsZi5fY2hlY2tzdW0ocmVzdWx0KSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcbiAgICAgICAgc3RhcnQ6IHN0YXJ0SW5mby5zdGFydCxcbiAgICAgICAgZW5kOiBjb2RlLmVuZCxcbiAgICAgICAgY29kZXNldDogXCJcIixcbiAgICAgICAgc3RhcnRJbmZvOiBzdGFydEluZm8sXG4gICAgICAgIGRlY29kZWRDb2RlczogZGVjb2RlZENvZGVzXG4gICAgfTtcbn07XG5cbkVBTlJlYWRlci5wcm90b3R5cGUuX2NoZWNrc3VtID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgdmFyIHN1bSA9IDAsIGk7XG5cbiAgICBmb3IgKCBpID0gcmVzdWx0Lmxlbmd0aCAtIDI7IGkgPj0gMDsgaSAtPSAyKSB7XG4gICAgICAgIHN1bSArPSByZXN1bHRbaV07XG4gICAgfVxuICAgIHN1bSAqPSAzO1xuICAgIGZvciAoIGkgPSByZXN1bHQubGVuZ3RoIC0gMTsgaSA+PSAwOyBpIC09IDIpIHtcbiAgICAgICAgc3VtICs9IHJlc3VsdFtpXTtcbiAgICB9XG4gICAgcmV0dXJuIHN1bSAlIDEwID09PSAwO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgKEVBTlJlYWRlcik7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9lYW5fcmVhZGVyLmpzXG4gKiovIiwiaW1wb3J0IEJhcmNvZGVSZWFkZXIgZnJvbSAnLi9iYXJjb2RlX3JlYWRlcic7XG5pbXBvcnQgQXJyYXlIZWxwZXIgZnJvbSAnLi9hcnJheV9oZWxwZXInO1xuXG5mdW5jdGlvbiBDb2RlMzlSZWFkZXIoKSB7XG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMpO1xufVxuXG52YXIgcHJvcGVydGllcyA9IHtcbiAgICBBTFBIQUJFVEhfU1RSSU5HOiB7dmFsdWU6IFwiMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaLS4gKiQvKyVcIn0sXG4gICAgQUxQSEFCRVQ6IHt2YWx1ZTogWzQ4LCA0OSwgNTAsIDUxLCA1MiwgNTMsIDU0LCA1NSwgNTYsIDU3LCA2NSwgNjYsIDY3LCA2OCwgNjksIDcwLCA3MSwgNzIsIDczLCA3NCwgNzUsIDc2LCA3NywgNzgsXG4gICAgICAgIDc5LCA4MCwgODEsIDgyLCA4MywgODQsIDg1LCA4NiwgODcsIDg4LCA4OSwgOTAsIDQ1LCA0NiwgMzIsIDQyLCAzNiwgNDcsIDQzLCAzN119LFxuICAgIENIQVJBQ1RFUl9FTkNPRElOR1M6IHt2YWx1ZTogWzB4MDM0LCAweDEyMSwgMHgwNjEsIDB4MTYwLCAweDAzMSwgMHgxMzAsIDB4MDcwLCAweDAyNSwgMHgxMjQsIDB4MDY0LCAweDEwOSwgMHgwNDksXG4gICAgICAgIDB4MTQ4LCAweDAxOSwgMHgxMTgsIDB4MDU4LCAweDAwRCwgMHgxMEMsIDB4MDRDLCAweDAxQywgMHgxMDMsIDB4MDQzLCAweDE0MiwgMHgwMTMsIDB4MTEyLCAweDA1MiwgMHgwMDcsIDB4MTA2LFxuICAgICAgICAweDA0NiwgMHgwMTYsIDB4MTgxLCAweDBDMSwgMHgxQzAsIDB4MDkxLCAweDE5MCwgMHgwRDAsIDB4MDg1LCAweDE4NCwgMHgwQzQsIDB4MDk0LCAweDBBOCwgMHgwQTIsIDB4MDhBLCAweDAyQVxuICAgIF19LFxuICAgIEFTVEVSSVNLOiB7dmFsdWU6IDB4MDk0fSxcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJjb2RlXzM5XCIsIHdyaXRlYWJsZTogZmFsc2V9XG59O1xuXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29kZTM5UmVhZGVyO1xuXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl90b0NvdW50ZXJzID0gZnVuY3Rpb24oc3RhcnQsIGNvdW50ZXIpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIG51bUNvdW50ZXJzID0gY291bnRlci5sZW5ndGgsXG4gICAgICAgIGVuZCA9IHNlbGYuX3Jvdy5sZW5ndGgsXG4gICAgICAgIGlzV2hpdGUgPSAhc2VsZi5fcm93W3N0YXJ0XSxcbiAgICAgICAgaSxcbiAgICAgICAgY291bnRlclBvcyA9IDA7XG5cbiAgICBBcnJheUhlbHBlci5pbml0KGNvdW50ZXIsIDApO1xuXG4gICAgZm9yICggaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBudW1Db3VudGVycykge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcbiAgICAgICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY291bnRlcjtcbn07XG5cbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgY291bnRlcnMgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgICBzdGFydCA9IHNlbGYuX2ZpbmRTdGFydCgpLFxuICAgICAgICBkZWNvZGVkQ2hhcixcbiAgICAgICAgbGFzdFN0YXJ0LFxuICAgICAgICBwYXR0ZXJuLFxuICAgICAgICBuZXh0U3RhcnQ7XG5cbiAgICBpZiAoIXN0YXJ0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBuZXh0U3RhcnQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3Jvdywgc3RhcnQuZW5kKTtcblxuICAgIGRvIHtcbiAgICAgICAgY291bnRlcnMgPSBzZWxmLl90b0NvdW50ZXJzKG5leHRTdGFydCwgY291bnRlcnMpO1xuICAgICAgICBwYXR0ZXJuID0gc2VsZi5fdG9QYXR0ZXJuKGNvdW50ZXJzKTtcbiAgICAgICAgaWYgKHBhdHRlcm4gPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBkZWNvZGVkQ2hhciA9IHNlbGYuX3BhdHRlcm5Ub0NoYXIocGF0dGVybik7XG4gICAgICAgIGlmIChkZWNvZGVkQ2hhciA8IDApe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0LnB1c2goZGVjb2RlZENoYXIpO1xuICAgICAgICBsYXN0U3RhcnQgPSBuZXh0U3RhcnQ7XG4gICAgICAgIG5leHRTdGFydCArPSBBcnJheUhlbHBlci5zdW0oY291bnRlcnMpO1xuICAgICAgICBuZXh0U3RhcnQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3JvdywgbmV4dFN0YXJ0KTtcbiAgICB9IHdoaWxlIChkZWNvZGVkQ2hhciAhPT0gJyonKTtcbiAgICByZXN1bHQucG9wKCk7XG5cbiAgICBpZiAoIXJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCFzZWxmLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UobGFzdFN0YXJ0LCBuZXh0U3RhcnQsIGNvdW50ZXJzKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LnN0YXJ0LFxuICAgICAgICBlbmQ6IG5leHRTdGFydCxcbiAgICAgICAgc3RhcnRJbmZvOiBzdGFydCxcbiAgICAgICAgZGVjb2RlZENvZGVzOiByZXN1bHRcbiAgICB9O1xufTtcblxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlID0gZnVuY3Rpb24obGFzdFN0YXJ0LCBuZXh0U3RhcnQsIGNvdW50ZXJzKSB7XG4gICAgdmFyIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCxcbiAgICAgICAgcGF0dGVyblNpemUgPSBBcnJheUhlbHBlci5zdW0oY291bnRlcnMpO1xuXG4gICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kID0gbmV4dFN0YXJ0IC0gbGFzdFN0YXJ0IC0gcGF0dGVyblNpemU7XG4gICAgaWYgKCh0cmFpbGluZ1doaXRlc3BhY2VFbmQgKiAzKSA+PSBwYXR0ZXJuU2l6ZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fcGF0dGVyblRvQ2hhciA9IGZ1bmN0aW9uKHBhdHRlcm4pIHtcbiAgICB2YXIgaSxcbiAgICAgICAgc2VsZiA9IHRoaXM7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc2VsZi5DSEFSQUNURVJfRU5DT0RJTkdTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1NbaV0gPT09IHBhdHRlcm4pIHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHNlbGYuQUxQSEFCRVRbaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn07XG5cbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX2ZpbmROZXh0V2lkdGggPSBmdW5jdGlvbihjb3VudGVycywgY3VycmVudCkge1xuICAgIHZhciBpLFxuICAgICAgICBtaW5XaWR0aCA9IE51bWJlci5NQVhfVkFMVUU7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNvdW50ZXJzW2ldIDwgbWluV2lkdGggJiYgY291bnRlcnNbaV0gPiBjdXJyZW50KSB7XG4gICAgICAgICAgICBtaW5XaWR0aCA9IGNvdW50ZXJzW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1pbldpZHRoO1xufTtcblxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fdG9QYXR0ZXJuID0gZnVuY3Rpb24oY291bnRlcnMpIHtcbiAgICB2YXIgbnVtQ291bnRlcnMgPSBjb3VudGVycy5sZW5ndGgsXG4gICAgICAgIG1heE5hcnJvd1dpZHRoID0gMCxcbiAgICAgICAgbnVtV2lkZUJhcnMgPSBudW1Db3VudGVycyxcbiAgICAgICAgd2lkZUJhcldpZHRoID0gMCxcbiAgICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICAgIHBhdHRlcm4sXG4gICAgICAgIGk7XG5cbiAgICB3aGlsZSAobnVtV2lkZUJhcnMgPiAzKSB7XG4gICAgICAgIG1heE5hcnJvd1dpZHRoID0gc2VsZi5fZmluZE5leHRXaWR0aChjb3VudGVycywgbWF4TmFycm93V2lkdGgpO1xuICAgICAgICBudW1XaWRlQmFycyA9IDA7XG4gICAgICAgIHBhdHRlcm4gPSAwO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbnVtQ291bnRlcnM7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNvdW50ZXJzW2ldID4gbWF4TmFycm93V2lkdGgpIHtcbiAgICAgICAgICAgICAgICBwYXR0ZXJuIHw9IDEgPDwgKG51bUNvdW50ZXJzIC0gMSAtIGkpO1xuICAgICAgICAgICAgICAgIG51bVdpZGVCYXJzKys7XG4gICAgICAgICAgICAgICAgd2lkZUJhcldpZHRoICs9IGNvdW50ZXJzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG51bVdpZGVCYXJzID09PSAzKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbnVtQ291bnRlcnMgJiYgbnVtV2lkZUJhcnMgPiAwOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoY291bnRlcnNbaV0gPiBtYXhOYXJyb3dXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBudW1XaWRlQmFycy0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKGNvdW50ZXJzW2ldICogMikgPj0gd2lkZUJhcldpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcGF0dGVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG59O1xuXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl9maW5kU3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KSxcbiAgICAgICAgcGF0dGVyblN0YXJ0ID0gb2Zmc2V0LFxuICAgICAgICBjb3VudGVyID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICBjb3VudGVyUG9zID0gMCxcbiAgICAgICAgaXNXaGl0ZSA9IGZhbHNlLFxuICAgICAgICBpLFxuICAgICAgICBqLFxuICAgICAgICB3aGl0ZVNwYWNlTXVzdFN0YXJ0O1xuXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIC8vIGZpbmQgc3RhcnQgcGF0dGVyblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLl90b1BhdHRlcm4oY291bnRlcikgPT09IHNlbGYuQVNURVJJU0spIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpdGVTcGFjZU11c3RTdGFydCA9IE1hdGguZmxvb3IoTWF0aC5tYXgoMCwgcGF0dGVyblN0YXJ0IC0gKChpIC0gcGF0dGVyblN0YXJ0KSAvIDQpKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKHdoaXRlU3BhY2VNdXN0U3RhcnQsIHBhdHRlcm5TdGFydCwgMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHBhdHRlcm5TdGFydCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IGlcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwYXR0ZXJuU3RhcnQgKz0gY291bnRlclswXSArIGNvdW50ZXJbMV07XG4gICAgICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCA3OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltqXSA9IGNvdW50ZXJbaiArIDJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb3VudGVyWzddID0gMDtcbiAgICAgICAgICAgICAgICBjb3VudGVyWzhdID0gMDtcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zLS07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29kZTM5UmVhZGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY29kZV8zOV9yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgQ29kZTM5UmVhZGVyIGZyb20gJy4vY29kZV8zOV9yZWFkZXInO1xuXG5mdW5jdGlvbiBDb2RlMzlWSU5SZWFkZXIoKSB7XG4gICAgQ29kZTM5UmVhZGVyLmNhbGwodGhpcyk7XG59XG5cbnZhciBwYXR0ZXJucyA9IHtcbiAgICBJT1E6IC9bSU9RXS9nLFxuICAgIEFaMDk6IC9bQS1aMC05XXsxN30vXG59O1xuXG5Db2RlMzlWSU5SZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDb2RlMzlSZWFkZXIucHJvdG90eXBlKTtcbkNvZGUzOVZJTlJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb2RlMzlWSU5SZWFkZXI7XG5cbi8vIENyaWJiZWQgZnJvbTpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96eGluZy96eGluZy9ibG9iL21hc3Rlci9jb3JlL3NyYy9tYWluL2phdmEvY29tL2dvb2dsZS96eGluZy9jbGllbnQvcmVzdWx0L1ZJTlJlc3VsdFBhcnNlci5qYXZhXG5Db2RlMzlWSU5SZWFkZXIucHJvdG90eXBlLl9kZWNvZGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzdWx0ID0gQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlLmFwcGx5KHRoaXMpO1xuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBjb2RlID0gcmVzdWx0LmNvZGU7XG5cbiAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29kZSA9IGNvZGUucmVwbGFjZShwYXR0ZXJucy5JT1EsICcnKTtcblxuICAgIGlmICghY29kZS5tYXRjaChwYXR0ZXJucy5BWjA5KSkge1xuICAgICAgICBjb25zb2xlLmxvZygnRmFpbGVkIEFaMDkgcGF0dGVybiBjb2RlOicsIGNvZGUpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2NoZWNrQ2hlY2tzdW0oY29kZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmVzdWx0LmNvZGUgPSBjb2RlO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5Db2RlMzlWSU5SZWFkZXIucHJvdG90eXBlLl9jaGVja0NoZWNrc3VtID0gZnVuY3Rpb24oY29kZSkge1xuICAgIC8vIFRPRE9cbiAgICByZXR1cm4gISFjb2RlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29kZTM5VklOUmVhZGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY29kZV8zOV92aW5fcmVhZGVyLmpzXG4gKiovIiwiaW1wb3J0IEJhcmNvZGVSZWFkZXIgZnJvbSAnLi9iYXJjb2RlX3JlYWRlcic7XG5cbmZ1bmN0aW9uIENvZGFiYXJSZWFkZXIoKSB7XG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMpO1xuICAgIHRoaXMuX2NvdW50ZXJzID0gW107XG59XG5cbnZhciBwcm9wZXJ0aWVzID0ge1xuICAgIEFMUEhBQkVUSF9TVFJJTkc6IHt2YWx1ZTogXCIwMTIzNDU2Nzg5LSQ6Ly4rQUJDRFwifSxcbiAgICBBTFBIQUJFVDoge3ZhbHVlOiBbNDgsIDQ5LCA1MCwgNTEsIDUyLCA1MywgNTQsIDU1LCA1NiwgNTcsIDQ1LCAzNiwgNTgsIDQ3LCA0NiwgNDMsIDY1LCA2NiwgNjcsIDY4XX0sXG4gICAgQ0hBUkFDVEVSX0VOQ09ESU5HUzoge3ZhbHVlOiBbMHgwMDMsIDB4MDA2LCAweDAwOSwgMHgwNjAsIDB4MDEyLCAweDA0MiwgMHgwMjEsIDB4MDI0LCAweDAzMCwgMHgwNDgsIDB4MDBjLCAweDAxOCxcbiAgICAgICAgMHgwNDUsIDB4MDUxLCAweDA1NCwgMHgwMTUsIDB4MDFBLCAweDAyOSwgMHgwMEIsIDB4MDBFXX0sXG4gICAgU1RBUlRfRU5EOiB7dmFsdWU6IFsweDAxQSwgMHgwMjksIDB4MDBCLCAweDAwRV19LFxuICAgIE1JTl9FTkNPREVEX0NIQVJTOiB7dmFsdWU6IDR9LFxuICAgIE1BWF9BQ0NFUFRBQkxFOiB7dmFsdWU6IDIuMH0sXG4gICAgUEFERElORzoge3ZhbHVlOiAxLjV9LFxuICAgIEZPUk1BVDoge3ZhbHVlOiBcImNvZGFiYXJcIiwgd3JpdGVhYmxlOiBmYWxzZX1cbn07XG5cbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvZGFiYXJSZWFkZXI7XG5cbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl9kZWNvZGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgICBzdGFydCxcbiAgICAgICAgZGVjb2RlZENoYXIsXG4gICAgICAgIHBhdHRlcm4sXG4gICAgICAgIG5leHRTdGFydCxcbiAgICAgICAgZW5kO1xuXG4gICAgdGhpcy5fY291bnRlcnMgPSBzZWxmLl9maWxsQ291bnRlcnMoKTtcbiAgICBzdGFydCA9IHNlbGYuX2ZpbmRTdGFydCgpO1xuICAgIGlmICghc3RhcnQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIG5leHRTdGFydCA9IHN0YXJ0LnN0YXJ0Q291bnRlcjtcblxuICAgIGRvIHtcbiAgICAgICAgcGF0dGVybiA9IHNlbGYuX3RvUGF0dGVybihuZXh0U3RhcnQpO1xuICAgICAgICBpZiAocGF0dGVybiA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGRlY29kZWRDaGFyID0gc2VsZi5fcGF0dGVyblRvQ2hhcihwYXR0ZXJuKTtcbiAgICAgICAgaWYgKGRlY29kZWRDaGFyIDwgMCl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucHVzaChkZWNvZGVkQ2hhcik7XG4gICAgICAgIG5leHRTdGFydCArPSA4O1xuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+IDEgJiYgc2VsZi5faXNTdGFydEVuZChwYXR0ZXJuKSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9IHdoaWxlIChuZXh0U3RhcnQgPCBzZWxmLl9jb3VudGVycy5sZW5ndGgpO1xuXG4gICAgLy8gdmVyaWZ5IGVuZFxuICAgIGlmICgocmVzdWx0Lmxlbmd0aCAtIDIpIDwgc2VsZi5NSU5fRU5DT0RFRF9DSEFSUyB8fCAhc2VsZi5faXNTdGFydEVuZChwYXR0ZXJuKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyB2ZXJpZnkgZW5kIHdoaXRlIHNwYWNlXG4gICAgaWYgKCFzZWxmLl92ZXJpZnlXaGl0ZXNwYWNlKHN0YXJ0LnN0YXJ0Q291bnRlciwgbmV4dFN0YXJ0IC0gOCkpe1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoIXNlbGYuX3ZhbGlkYXRlUmVzdWx0KHJlc3VsdCwgc3RhcnQuc3RhcnRDb3VudGVyKSl7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIG5leHRTdGFydCA9IG5leHRTdGFydCA+IHNlbGYuX2NvdW50ZXJzLmxlbmd0aCA/IHNlbGYuX2NvdW50ZXJzLmxlbmd0aCA6IG5leHRTdGFydDtcbiAgICBlbmQgPSBzdGFydC5zdGFydCArIHNlbGYuX3N1bUNvdW50ZXJzKHN0YXJ0LnN0YXJ0Q291bnRlciwgbmV4dFN0YXJ0IC0gOCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LnN0YXJ0LFxuICAgICAgICBlbmQ6IGVuZCxcbiAgICAgICAgc3RhcnRJbmZvOiBzdGFydCxcbiAgICAgICAgZGVjb2RlZENvZGVzOiByZXN1bHRcbiAgICB9O1xufTtcblxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeVdoaXRlc3BhY2UgPSBmdW5jdGlvbihzdGFydENvdW50ZXIsIGVuZENvdW50ZXIpIHtcbiAgICBpZiAoKHN0YXJ0Q291bnRlciAtIDEgPD0gMClcbiAgICAgICAgICAgIHx8IHRoaXMuX2NvdW50ZXJzW3N0YXJ0Q291bnRlciAtIDFdID49ICh0aGlzLl9jYWxjdWxhdGVQYXR0ZXJuTGVuZ3RoKHN0YXJ0Q291bnRlcikgLyAyLjApKSB7XG4gICAgICAgIGlmICgoZW5kQ291bnRlciArIDggPj0gdGhpcy5fY291bnRlcnMubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHx8IHRoaXMuX2NvdW50ZXJzW2VuZENvdW50ZXIgKyA3XSA+PSAodGhpcy5fY2FsY3VsYXRlUGF0dGVybkxlbmd0aChlbmRDb3VudGVyKSAvIDIuMCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl9jYWxjdWxhdGVQYXR0ZXJuTGVuZ3RoID0gZnVuY3Rpb24ob2Zmc2V0KSB7XG4gICAgdmFyIGksXG4gICAgICAgIHN1bSA9IDA7XG5cbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBvZmZzZXQgKyA3OyBpKyspIHtcbiAgICAgICAgc3VtICs9IHRoaXMuX2NvdW50ZXJzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBzdW07XG59O1xuXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fdGhyZXNob2xkUmVzdWx0UGF0dGVybiA9IGZ1bmN0aW9uKHJlc3VsdCwgc3RhcnRDb3VudGVyKXtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGNhdGVnb3JpemF0aW9uID0ge1xuICAgICAgICAgICAgc3BhY2U6IHtcbiAgICAgICAgICAgICAgICBuYXJyb3c6IHsgc2l6ZTogMCwgY291bnRzOiAwLCBtaW46IDAsIG1heDogTnVtYmVyLk1BWF9WQUxVRX0sXG4gICAgICAgICAgICAgICAgd2lkZToge3NpemU6IDAsIGNvdW50czogMCwgbWluOiAwLCBtYXg6IE51bWJlci5NQVhfVkFMVUV9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFyOiB7XG4gICAgICAgICAgICAgICAgbmFycm93OiB7IHNpemU6IDAsIGNvdW50czogMCwgbWluOiAwLCBtYXg6IE51bWJlci5NQVhfVkFMVUV9LFxuICAgICAgICAgICAgICAgIHdpZGU6IHsgc2l6ZTogMCwgY291bnRzOiAwLCBtaW46IDAsIG1heDogTnVtYmVyLk1BWF9WQUxVRX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAga2luZCxcbiAgICAgICAgY2F0LFxuICAgICAgICBpLFxuICAgICAgICBqLFxuICAgICAgICBwb3MgPSBzdGFydENvdW50ZXIsXG4gICAgICAgIHBhdHRlcm47XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgcGF0dGVybiA9IHNlbGYuX2NoYXJUb1BhdHRlcm4ocmVzdWx0W2ldKTtcbiAgICAgICAgZm9yIChqID0gNjsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgICAgIGtpbmQgPSAoaiAmIDEpID09PSAyID8gY2F0ZWdvcml6YXRpb24uYmFyIDogY2F0ZWdvcml6YXRpb24uc3BhY2U7XG4gICAgICAgICAgICBjYXQgPSAocGF0dGVybiAmIDEpID09PSAxID8ga2luZC53aWRlIDoga2luZC5uYXJyb3c7XG4gICAgICAgICAgICBjYXQuc2l6ZSArPSBzZWxmLl9jb3VudGVyc1twb3MgKyBqXTtcbiAgICAgICAgICAgIGNhdC5jb3VudHMrKztcbiAgICAgICAgICAgIHBhdHRlcm4gPj49IDE7XG4gICAgICAgIH1cbiAgICAgICAgcG9zICs9IDg7XG4gICAgfVxuXG4gICAgW1wic3BhY2VcIiwgXCJiYXJcIl0uZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgdmFyIG5ld2tpbmQgPSBjYXRlZ29yaXphdGlvbltrZXldO1xuICAgICAgICBuZXdraW5kLndpZGUubWluID1cbiAgICAgICAgICAgIE1hdGguZmxvb3IoKG5ld2tpbmQubmFycm93LnNpemUgLyBuZXdraW5kLm5hcnJvdy5jb3VudHMgKyBuZXdraW5kLndpZGUuc2l6ZSAvIG5ld2tpbmQud2lkZS5jb3VudHMpIC8gMik7XG4gICAgICAgIG5ld2tpbmQubmFycm93Lm1heCA9IE1hdGguY2VpbChuZXdraW5kLndpZGUubWluKTtcbiAgICAgICAgbmV3a2luZC53aWRlLm1heCA9IE1hdGguY2VpbCgobmV3a2luZC53aWRlLnNpemUgKiBzZWxmLk1BWF9BQ0NFUFRBQkxFICsgc2VsZi5QQURESU5HKSAvIG5ld2tpbmQud2lkZS5jb3VudHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNhdGVnb3JpemF0aW9uO1xufTtcblxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2NoYXJUb1BhdHRlcm4gPSBmdW5jdGlvbihjaGFyKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBjaGFyQ29kZSA9IGNoYXIuY2hhckNvZGVBdCgwKSxcbiAgICAgICAgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBzZWxmLkFMUEhBQkVULmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLkFMUEhBQkVUW2ldID09PSBjaGFyQ29kZSl7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5DSEFSQUNURVJfRU5DT0RJTkdTW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAweDA7XG59O1xuXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fdmFsaWRhdGVSZXN1bHQgPSBmdW5jdGlvbihyZXN1bHQsIHN0YXJ0Q291bnRlcikge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgdGhyZXNob2xkcyA9IHNlbGYuX3RocmVzaG9sZFJlc3VsdFBhdHRlcm4ocmVzdWx0LCBzdGFydENvdW50ZXIpLFxuICAgICAgICBpLFxuICAgICAgICBqLFxuICAgICAgICBraW5kLFxuICAgICAgICBjYXQsXG4gICAgICAgIHNpemUsXG4gICAgICAgIHBvcyA9IHN0YXJ0Q291bnRlcixcbiAgICAgICAgcGF0dGVybjtcblxuICAgIGZvciAoaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGF0dGVybiA9IHNlbGYuX2NoYXJUb1BhdHRlcm4ocmVzdWx0W2ldKTtcbiAgICAgICAgZm9yIChqID0gNjsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgICAgIGtpbmQgPSAoaiAmIDEpID09PSAwID8gdGhyZXNob2xkcy5iYXIgOiB0aHJlc2hvbGRzLnNwYWNlO1xuICAgICAgICAgICAgY2F0ID0gKHBhdHRlcm4gJiAxKSA9PT0gMSA/IGtpbmQud2lkZSA6IGtpbmQubmFycm93O1xuICAgICAgICAgICAgc2l6ZSA9IHNlbGYuX2NvdW50ZXJzW3BvcyArIGpdO1xuICAgICAgICAgICAgaWYgKHNpemUgPCBjYXQubWluIHx8IHNpemUgPiBjYXQubWF4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGF0dGVybiA+Pj0gMTtcbiAgICAgICAgfVxuICAgICAgICBwb3MgKz0gODtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fcGF0dGVyblRvQ2hhciA9IGZ1bmN0aW9uKHBhdHRlcm4pIHtcbiAgICB2YXIgaSxcbiAgICAgICAgc2VsZiA9IHRoaXM7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc2VsZi5DSEFSQUNURVJfRU5DT0RJTkdTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1NbaV0gPT09IHBhdHRlcm4pIHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHNlbGYuQUxQSEFCRVRbaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn07XG5cbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl9jb21wdXRlQWx0ZXJuYXRpbmdUaHJlc2hvbGQgPSBmdW5jdGlvbihvZmZzZXQsIGVuZCkge1xuICAgIHZhciBpLFxuICAgICAgICBtaW4gPSBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgICBtYXggPSAwLFxuICAgICAgICBjb3VudGVyO1xuXG4gICAgZm9yIChpID0gb2Zmc2V0OyBpIDwgZW5kOyBpICs9IDIpe1xuICAgICAgICBjb3VudGVyID0gdGhpcy5fY291bnRlcnNbaV07XG4gICAgICAgIGlmIChjb3VudGVyID4gbWF4KSB7XG4gICAgICAgICAgICBtYXggPSBjb3VudGVyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3VudGVyIDwgbWluKSB7XG4gICAgICAgICAgICBtaW4gPSBjb3VudGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICgobWluICsgbWF4KSAvIDIuMCkgfCAwO1xufTtcblxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX3RvUGF0dGVybiA9IGZ1bmN0aW9uKG9mZnNldCkge1xuICAgIHZhciBudW1Db3VudGVycyA9IDcsXG4gICAgICAgIGVuZCA9IG9mZnNldCArIG51bUNvdW50ZXJzLFxuICAgICAgICBiYXJUaHJlc2hvbGQsXG4gICAgICAgIHNwYWNlVGhyZXNob2xkLFxuICAgICAgICBiaXRtYXNrID0gMSA8PCAobnVtQ291bnRlcnMgLSAxKSxcbiAgICAgICAgcGF0dGVybiA9IDAsXG4gICAgICAgIGksXG4gICAgICAgIHRocmVzaG9sZDtcblxuICAgIGlmIChlbmQgPiB0aGlzLl9jb3VudGVycy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIGJhclRocmVzaG9sZCA9IHRoaXMuX2NvbXB1dGVBbHRlcm5hdGluZ1RocmVzaG9sZChvZmZzZXQsIGVuZCk7XG4gICAgc3BhY2VUaHJlc2hvbGQgPSB0aGlzLl9jb21wdXRlQWx0ZXJuYXRpbmdUaHJlc2hvbGQob2Zmc2V0ICsgMSwgZW5kKTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBudW1Db3VudGVyczsgaSsrKXtcbiAgICAgICAgdGhyZXNob2xkID0gKGkgJiAxKSA9PT0gMCA/IGJhclRocmVzaG9sZCA6IHNwYWNlVGhyZXNob2xkO1xuICAgICAgICBpZiAodGhpcy5fY291bnRlcnNbb2Zmc2V0ICsgaV0gPiB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIHBhdHRlcm4gfD0gYml0bWFzaztcbiAgICAgICAgfVxuICAgICAgICBiaXRtYXNrID4+PSAxO1xuICAgIH1cblxuICAgIHJldHVybiBwYXR0ZXJuO1xufTtcblxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2lzU3RhcnRFbmQgPSBmdW5jdGlvbihwYXR0ZXJuKSB7XG4gICAgdmFyIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5TVEFSVF9FTkQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuU1RBUlRfRU5EW2ldID09PSBwYXR0ZXJuKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fc3VtQ291bnRlcnMgPSBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgdmFyIGksXG4gICAgICAgIHN1bSA9IDA7XG5cbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICAgIHN1bSArPSB0aGlzLl9jb3VudGVyc1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIHN1bTtcbn07XG5cbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl9maW5kU3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGksXG4gICAgICAgIHBhdHRlcm4sXG4gICAgICAgIHN0YXJ0ID0gc2VsZi5fbmV4dFVuc2V0KHNlbGYuX3JvdyksXG4gICAgICAgIGVuZDtcblxuICAgIGZvciAoaSA9IDE7IGkgPCB0aGlzLl9jb3VudGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXR0ZXJuID0gc2VsZi5fdG9QYXR0ZXJuKGkpO1xuICAgICAgICBpZiAocGF0dGVybiAhPT0gLTEgJiYgc2VsZi5faXNTdGFydEVuZChwYXR0ZXJuKSkge1xuICAgICAgICAgICAgLy8gVE9ETzogTG9vayBmb3Igd2hpdGVzcGFjZSBhaGVhZFxuICAgICAgICAgICAgc3RhcnQgKz0gc2VsZi5fc3VtQ291bnRlcnMoMCwgaSk7XG4gICAgICAgICAgICBlbmQgPSBzdGFydCArIHNlbGYuX3N1bUNvdW50ZXJzKGksIGkgKyA4KTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgICAgICAgIGVuZDogZW5kLFxuICAgICAgICAgICAgICAgIHN0YXJ0Q291bnRlcjogaSxcbiAgICAgICAgICAgICAgICBlbmRDb3VudGVyOiBpICsgOFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvZGFiYXJSZWFkZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb2RhYmFyX3JlYWRlci5qc1xuICoqLyIsImltcG9ydCBFQU5SZWFkZXIgZnJvbSAnLi9lYW5fcmVhZGVyJztcblxuZnVuY3Rpb24gVVBDUmVhZGVyKCkge1xuICAgIEVBTlJlYWRlci5jYWxsKHRoaXMpO1xufVxuXG52YXIgcHJvcGVydGllcyA9IHtcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJ1cGNfYVwiLCB3cml0ZWFibGU6IGZhbHNlfVxufTtcblxuVVBDUmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRUFOUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XG5VUENSZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVVBDUmVhZGVyO1xuXG5VUENSZWFkZXIucHJvdG90eXBlLl9kZWNvZGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzdWx0ID0gRUFOUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlLmNhbGwodGhpcyk7XG5cbiAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5jb2RlICYmIHJlc3VsdC5jb2RlLmxlbmd0aCA9PT0gMTMgJiYgcmVzdWx0LmNvZGUuY2hhckF0KDApID09PSBcIjBcIikge1xuICAgICAgICByZXN1bHQuY29kZSA9IHJlc3VsdC5jb2RlLnN1YnN0cmluZygxKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBVUENSZWFkZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91cGNfcmVhZGVyLmpzXG4gKiovIiwiaW1wb3J0IEVBTlJlYWRlciBmcm9tICcuL2Vhbl9yZWFkZXInO1xuXG5mdW5jdGlvbiBFQU44UmVhZGVyKCkge1xuICAgIEVBTlJlYWRlci5jYWxsKHRoaXMpO1xufVxuXG52YXIgcHJvcGVydGllcyA9IHtcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJlYW5fOFwiLCB3cml0ZWFibGU6IGZhbHNlfVxufTtcblxuRUFOOFJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVBTlJlYWRlci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xuRUFOOFJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFQU44UmVhZGVyO1xuXG5FQU44UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlUGF5bG9hZCA9IGZ1bmN0aW9uKGNvZGUsIHJlc3VsdCwgZGVjb2RlZENvZGVzKSB7XG4gICAgdmFyIGksXG4gICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgZm9yICggaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgY29kZSA9IHNlbGYuX2RlY29kZUNvZGUoY29kZS5lbmQsIHNlbGYuQ09ERV9HX1NUQVJUKTtcbiAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUpO1xuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcbiAgICB9XG5cbiAgICBjb2RlID0gc2VsZi5fZmluZFBhdHRlcm4oc2VsZi5NSURETEVfUEFUVEVSTiwgY29kZS5lbmQsIHRydWUsIGZhbHNlKTtcbiAgICBpZiAoY29kZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb2RlLmVuZCwgc2VsZi5DT0RFX0dfU1RBUlQpO1xuICAgICAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xuICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUpO1xuICAgIH1cblxuICAgIHJldHVybiBjb2RlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRUFOOFJlYWRlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2Vhbl84X3JlYWRlci5qc1xuICoqLyIsImltcG9ydCBFQU5SZWFkZXIgZnJvbSAnLi9lYW5fcmVhZGVyJztcblxuZnVuY3Rpb24gVVBDRVJlYWRlcigpIHtcbiAgICBFQU5SZWFkZXIuY2FsbCh0aGlzKTtcbn1cblxudmFyIHByb3BlcnRpZXMgPSB7XG4gICAgQ09ERV9GUkVRVUVOQ1k6IHt2YWx1ZTogW1xuICAgICAgICBbIDU2LCA1MiwgNTAsIDQ5LCA0NCwgMzgsIDM1LCA0MiwgNDEsIDM3IF0sXG4gICAgICAgIFs3LCAxMSwgMTMsIDE0LCAxOSwgMjUsIDI4LCAyMSwgMjIsIDI2XV19LFxuICAgIFNUT1BfUEFUVEVSTjogeyB2YWx1ZTogWzEgLyA2ICogNywgMSAvIDYgKiA3LCAxIC8gNiAqIDcsIDEgLyA2ICogNywgMSAvIDYgKiA3LCAxIC8gNiAqIDddfSxcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJ1cGNfZVwiLCB3cml0ZWFibGU6IGZhbHNlfVxufTtcblxuVVBDRVJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVBTlJlYWRlci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xuVVBDRVJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBVUENFUmVhZGVyO1xuXG5VUENFUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlUGF5bG9hZCA9IGZ1bmN0aW9uKGNvZGUsIHJlc3VsdCwgZGVjb2RlZENvZGVzKSB7XG4gICAgdmFyIGksXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBjb2RlRnJlcXVlbmN5ID0gMHgwO1xuXG4gICAgZm9yICggaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICAgICAgY29kZSA9IHNlbGYuX2RlY29kZUNvZGUoY29kZS5lbmQpO1xuICAgICAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2RlLmNvZGUgPj0gc2VsZi5DT0RFX0dfU1RBUlQpIHtcbiAgICAgICAgICAgIGNvZGUuY29kZSA9IGNvZGUuY29kZSAtIHNlbGYuQ09ERV9HX1NUQVJUO1xuICAgICAgICAgICAgY29kZUZyZXF1ZW5jeSB8PSAxIDw8ICg1IC0gaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0LnB1c2goY29kZS5jb2RlKTtcbiAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XG4gICAgfVxuICAgIGlmICghc2VsZi5fZGV0ZXJtaW5lUGFyaXR5KGNvZGVGcmVxdWVuY3ksIHJlc3VsdCkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvZGU7XG59O1xuXG5VUENFUmVhZGVyLnByb3RvdHlwZS5fZGV0ZXJtaW5lUGFyaXR5ID0gZnVuY3Rpb24oY29kZUZyZXF1ZW5jeSwgcmVzdWx0KSB7XG4gICAgdmFyIGksXG4gICAgICAgIG5yU3lzdGVtO1xuXG4gICAgZm9yIChuclN5c3RlbSA9IDA7IG5yU3lzdGVtIDwgdGhpcy5DT0RFX0ZSRVFVRU5DWS5sZW5ndGg7IG5yU3lzdGVtKyspe1xuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IHRoaXMuQ09ERV9GUkVRVUVOQ1lbbnJTeXN0ZW1dLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY29kZUZyZXF1ZW5jeSA9PT0gdGhpcy5DT0RFX0ZSRVFVRU5DWVtuclN5c3RlbV1baV0pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQudW5zaGlmdChuclN5c3RlbSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuVVBDRVJlYWRlci5wcm90b3R5cGUuX2NvbnZlcnRUb1VQQ0EgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICB2YXIgdXBjYSA9IFtyZXN1bHRbMF1dLFxuICAgICAgICBsYXN0RGlnaXQgPSByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDJdO1xuXG4gICAgaWYgKGxhc3REaWdpdCA8PSAyKSB7XG4gICAgICAgIHVwY2EgPSB1cGNhLmNvbmNhdChyZXN1bHQuc2xpY2UoMSwgMykpXG4gICAgICAgICAgICAuY29uY2F0KFtsYXN0RGlnaXQsIDAsIDAsIDAsIDBdKVxuICAgICAgICAgICAgLmNvbmNhdChyZXN1bHQuc2xpY2UoMywgNikpO1xuICAgIH0gZWxzZSBpZiAobGFzdERpZ2l0ID09PSAzKSB7XG4gICAgICAgIHVwY2EgPSB1cGNhLmNvbmNhdChyZXN1bHQuc2xpY2UoMSwgNCkpXG4gICAgICAgICAgICAuY29uY2F0KFswLCAwLCAwLCAwLCAwXSlcbiAgICAgICAgICAgIC5jb25jYXQocmVzdWx0LnNsaWNlKDQsIDYpKTtcbiAgICB9IGVsc2UgaWYgKGxhc3REaWdpdCA9PT0gNCkge1xuICAgICAgICB1cGNhID0gdXBjYS5jb25jYXQocmVzdWx0LnNsaWNlKDEsIDUpKVxuICAgICAgICAgICAgLmNvbmNhdChbMCwgMCwgMCwgMCwgMCwgcmVzdWx0WzVdXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdXBjYSA9IHVwY2EuY29uY2F0KHJlc3VsdC5zbGljZSgxLCA2KSlcbiAgICAgICAgICAgIC5jb25jYXQoWzAsIDAsIDAsIDAsIGxhc3REaWdpdF0pO1xuICAgIH1cblxuICAgIHVwY2EucHVzaChyZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdKTtcbiAgICByZXR1cm4gdXBjYTtcbn07XG5cblVQQ0VSZWFkZXIucHJvdG90eXBlLl9jaGVja3N1bSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgIHJldHVybiBFQU5SZWFkZXIucHJvdG90eXBlLl9jaGVja3N1bS5jYWxsKHRoaXMsIHRoaXMuX2NvbnZlcnRUb1VQQ0EocmVzdWx0KSk7XG59O1xuXG5VUENFUmVhZGVyLnByb3RvdHlwZS5fZmluZEVuZCA9IGZ1bmN0aW9uKG9mZnNldCwgaXNXaGl0ZSkge1xuICAgIGlzV2hpdGUgPSB0cnVlO1xuICAgIHJldHVybiBFQU5SZWFkZXIucHJvdG90eXBlLl9maW5kRW5kLmNhbGwodGhpcywgb2Zmc2V0LCBpc1doaXRlKTtcbn07XG5cblVQQ0VSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbihlbmRJbmZvKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICB0cmFpbGluZ1doaXRlc3BhY2VFbmQ7XG5cbiAgICB0cmFpbGluZ1doaXRlc3BhY2VFbmQgPSBlbmRJbmZvLmVuZCArICgoZW5kSW5mby5lbmQgLSBlbmRJbmZvLnN0YXJ0KSAvIDIpO1xuICAgIGlmICh0cmFpbGluZ1doaXRlc3BhY2VFbmQgPCBzZWxmLl9yb3cubGVuZ3RoKSB7XG4gICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKGVuZEluZm8uZW5kLCB0cmFpbGluZ1doaXRlc3BhY2VFbmQsIDApKSB7XG4gICAgICAgICAgICByZXR1cm4gZW5kSW5mbztcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVQQ0VSZWFkZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91cGNfZV9yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgQmFyY29kZVJlYWRlciBmcm9tICcuL2JhcmNvZGVfcmVhZGVyJztcbmNvbnN0IG1lcmdlID0gcmVxdWlyZSgnbG9kYXNoL29iamVjdC9tZXJnZScpO1xuXG5mdW5jdGlvbiBJMm9mNVJlYWRlcihvcHRzKSB7XG4gICAgb3B0cyA9IG1lcmdlKGdldERlZmF1bENvbmZpZygpLCBvcHRzKTtcbiAgICBCYXJjb2RlUmVhZGVyLmNhbGwodGhpcywgb3B0cyk7XG4gICAgdGhpcy5iYXJTcGFjZVJhdGlvID0gWzEsIDFdO1xuICAgIGlmIChvcHRzLm5vcm1hbGl6ZUJhclNwYWNlV2lkdGgpIHtcbiAgICAgICAgdGhpcy5TSU5HTEVfQ09ERV9FUlJPUiA9IDAuMzg7XG4gICAgICAgIHRoaXMuQVZHX0NPREVfRVJST1IgPSAwLjA5O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsQ29uZmlnKCkge1xuICAgIHZhciBjb25maWcgPSB7fTtcblxuICAgIE9iamVjdC5rZXlzKEkyb2Y1UmVhZGVyLkNPTkZJR19LRVlTKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICBjb25maWdba2V5XSA9IEkyb2Y1UmVhZGVyLkNPTkZJR19LRVlTW2tleV0uZGVmYXVsdDtcbiAgICB9KTtcbiAgICByZXR1cm4gY29uZmlnO1xufVxuXG52YXIgTiA9IDEsXG4gICAgVyA9IDMsXG4gICAgcHJvcGVydGllcyA9IHtcbiAgICAgICAgTU9EVUxPOiB7dmFsdWU6IDEwfSxcbiAgICAgICAgU1RBUlRfUEFUVEVSTjoge3ZhbHVlOiBbTiAqIDIuNSwgTiAqIDIuNSwgTiAqIDIuNSwgTiAqIDIuNV19LFxuICAgICAgICBTVE9QX1BBVFRFUk46IHt2YWx1ZTogW04gKiAyLCBOICogMiwgVyAqIDJdfSxcbiAgICAgICAgQ09ERV9QQVRURVJOOiB7dmFsdWU6IFtcbiAgICAgICAgICAgIFtOLCBOLCBXLCBXLCBOXSxcbiAgICAgICAgICAgIFtXLCBOLCBOLCBOLCBXXSxcbiAgICAgICAgICAgIFtOLCBXLCBOLCBOLCBXXSxcbiAgICAgICAgICAgIFtXLCBXLCBOLCBOLCBOXSxcbiAgICAgICAgICAgIFtOLCBOLCBXLCBOLCBXXSxcbiAgICAgICAgICAgIFtXLCBOLCBXLCBOLCBOXSxcbiAgICAgICAgICAgIFtOLCBXLCBXLCBOLCBOXSxcbiAgICAgICAgICAgIFtOLCBOLCBOLCBXLCBXXSxcbiAgICAgICAgICAgIFtXLCBOLCBOLCBXLCBOXSxcbiAgICAgICAgICAgIFtOLCBXLCBOLCBXLCBOXVxuICAgICAgICBdfSxcbiAgICAgICAgU0lOR0xFX0NPREVfRVJST1I6IHt2YWx1ZTogMC43OCwgd3JpdGFibGU6IHRydWV9LFxuICAgICAgICBBVkdfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjM4LCB3cml0YWJsZTogdHJ1ZX0sXG4gICAgICAgIE1BWF9DT1JSRUNUSU9OX0ZBQ1RPUjoge3ZhbHVlOiA1fSxcbiAgICAgICAgRk9STUFUOiB7dmFsdWU6IFwiaTJvZjVcIn1cbiAgICB9O1xuXG5JMm9mNVJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEkyb2Y1UmVhZGVyO1xuXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX21hdGNoUGF0dGVybiA9IGZ1bmN0aW9uKGNvdW50ZXIsIGNvZGUpIHtcbiAgICBpZiAodGhpcy5jb25maWcubm9ybWFsaXplQmFyU3BhY2VXaWR0aCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGNvdW50ZXJTdW0gPSBbMCwgMF0sXG4gICAgICAgICAgICBjb2RlU3VtID0gWzAsIDBdLFxuICAgICAgICAgICAgY29ycmVjdGlvbiA9IFswLCAwXSxcbiAgICAgICAgICAgIGNvcnJlY3Rpb25SYXRpbyA9IHRoaXMuTUFYX0NPUlJFQ1RJT05fRkFDVE9SLFxuICAgICAgICAgICAgY29ycmVjdGlvblJhdGlvSW52ZXJzZSA9IDEgLyBjb3JyZWN0aW9uUmF0aW87XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvdW50ZXJTdW1baSAlIDJdICs9IGNvdW50ZXJbaV07XG4gICAgICAgICAgICBjb2RlU3VtW2kgJSAyXSArPSBjb2RlW2ldO1xuICAgICAgICB9XG4gICAgICAgIGNvcnJlY3Rpb25bMF0gPSBjb2RlU3VtWzBdIC8gY291bnRlclN1bVswXTtcbiAgICAgICAgY29ycmVjdGlvblsxXSA9IGNvZGVTdW1bMV0gLyBjb3VudGVyU3VtWzFdO1xuXG4gICAgICAgIGNvcnJlY3Rpb25bMF0gPSBNYXRoLm1heChNYXRoLm1pbihjb3JyZWN0aW9uWzBdLCBjb3JyZWN0aW9uUmF0aW8pLCBjb3JyZWN0aW9uUmF0aW9JbnZlcnNlKTtcbiAgICAgICAgY29ycmVjdGlvblsxXSA9IE1hdGgubWF4KE1hdGgubWluKGNvcnJlY3Rpb25bMV0sIGNvcnJlY3Rpb25SYXRpbyksIGNvcnJlY3Rpb25SYXRpb0ludmVyc2UpO1xuICAgICAgICB0aGlzLmJhclNwYWNlUmF0aW8gPSBjb3JyZWN0aW9uO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY291bnRlcltpXSAqPSB0aGlzLmJhclNwYWNlUmF0aW9baSAlIDJdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBCYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hQYXR0ZXJuLmNhbGwodGhpcywgY291bnRlciwgY29kZSk7XG59O1xuXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2ZpbmRQYXR0ZXJuID0gZnVuY3Rpb24ocGF0dGVybiwgb2Zmc2V0LCBpc1doaXRlLCB0cnlIYXJkZXIpIHtcbiAgICB2YXIgY291bnRlciA9IFtdLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgaSxcbiAgICAgICAgY291bnRlclBvcyA9IDAsXG4gICAgICAgIGJlc3RNYXRjaCA9IHtcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgICAgICAgY29kZTogLTEsXG4gICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgIGVuZDogMFxuICAgICAgICB9LFxuICAgICAgICBlcnJvcixcbiAgICAgICAgaixcbiAgICAgICAgc3VtLFxuICAgICAgICBub3JtYWxpemVkLFxuICAgICAgICBlcHNpbG9uID0gc2VsZi5BVkdfQ09ERV9FUlJPUjtcblxuICAgIGlzV2hpdGUgPSBpc1doaXRlIHx8IGZhbHNlO1xuICAgIHRyeUhhcmRlciA9IHRyeUhhcmRlciB8fCBmYWxzZTtcblxuICAgIGlmICghb2Zmc2V0KSB7XG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KTtcbiAgICB9XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8IHBhdHRlcm4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY291bnRlcltpXSA9IDA7XG4gICAgfVxuXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIHN1bSA9IDA7XG4gICAgICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBjb3VudGVyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBjb3VudGVyW2pdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBub3JtYWxpemVkID0gc2VsZi5fbm9ybWFsaXplKGNvdW50ZXIpO1xuICAgICAgICAgICAgICAgIGlmIChub3JtYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKG5vcm1hbGl6ZWQsIHBhdHRlcm4pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciA8IGVwc2lsb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLnN0YXJ0ID0gaSAtIHN1bTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJlc3RNYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHJ5SGFyZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBjb3VudGVyLmxlbmd0aCAtIDI7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcltqXSA9IGNvdW50ZXJbaiArIDJdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlci5sZW5ndGggLSAyXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlci5sZW5ndGggLSAxXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MtLTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9maW5kU3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQsXG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KSxcbiAgICAgICAgc3RhcnRJbmZvLFxuICAgICAgICBuYXJyb3dCYXJXaWR0aCA9IDE7XG5cbiAgICB3aGlsZSAoIXN0YXJ0SW5mbykge1xuICAgICAgICBzdGFydEluZm8gPSBzZWxmLl9maW5kUGF0dGVybihzZWxmLlNUQVJUX1BBVFRFUk4sIG9mZnNldCwgZmFsc2UsIHRydWUpO1xuICAgICAgICBpZiAoIXN0YXJ0SW5mbykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbmFycm93QmFyV2lkdGggPSBNYXRoLmZsb29yKChzdGFydEluZm8uZW5kIC0gc3RhcnRJbmZvLnN0YXJ0KSAvIDQpO1xuICAgICAgICBsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0ID0gc3RhcnRJbmZvLnN0YXJ0IC0gbmFycm93QmFyV2lkdGggKiAxMDtcbiAgICAgICAgaWYgKGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQgPj0gMCkge1xuICAgICAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UobGVhZGluZ1doaXRlc3BhY2VTdGFydCwgc3RhcnRJbmZvLnN0YXJ0LCAwKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGFydEluZm87XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb2Zmc2V0ID0gc3RhcnRJbmZvLmVuZDtcbiAgICAgICAgc3RhcnRJbmZvID0gbnVsbDtcbiAgICB9XG59O1xuXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZSA9IGZ1bmN0aW9uKGVuZEluZm8pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZDtcblxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IGVuZEluZm8uZW5kICsgKChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpIC8gMik7XG4gICAgaWYgKHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA8IHNlbGYuX3Jvdy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UoZW5kSW5mby5lbmQsIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCwgMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9maW5kRW5kID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBlbmRJbmZvLFxuICAgICAgICB0bXA7XG5cbiAgICBzZWxmLl9yb3cucmV2ZXJzZSgpO1xuICAgIGVuZEluZm8gPSBzZWxmLl9maW5kUGF0dGVybihzZWxmLlNUT1BfUEFUVEVSTik7XG4gICAgc2VsZi5fcm93LnJldmVyc2UoKTtcblxuICAgIGlmIChlbmRJbmZvID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHJldmVyc2UgbnVtYmVyc1xuICAgIHRtcCA9IGVuZEluZm8uc3RhcnQ7XG4gICAgZW5kSW5mby5zdGFydCA9IHNlbGYuX3Jvdy5sZW5ndGggLSBlbmRJbmZvLmVuZDtcbiAgICBlbmRJbmZvLmVuZCA9IHNlbGYuX3Jvdy5sZW5ndGggLSB0bXA7XG5cbiAgICByZXR1cm4gZW5kSW5mbyAhPT0gbnVsbCA/IHNlbGYuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZShlbmRJbmZvKSA6IG51bGw7XG59O1xuXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2RlY29kZVBhaXIgPSBmdW5jdGlvbihjb3VudGVyUGFpcikge1xuICAgIHZhciBpLFxuICAgICAgICBjb2RlLFxuICAgICAgICBjb2RlcyA9IFtdLFxuICAgICAgICBzZWxmID0gdGhpcztcblxuICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVyUGFpci5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb3VudGVyUGFpcltpXSk7XG4gICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29kZXMucHVzaChjb2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvZGVzO1xufTtcblxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9kZWNvZGVDb2RlID0gZnVuY3Rpb24oY291bnRlcikge1xuICAgIHZhciBqLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgc3VtID0gMCxcbiAgICAgICAgbm9ybWFsaXplZCxcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIGVwc2lsb24gPSBzZWxmLkFWR19DT0RFX0VSUk9SLFxuICAgICAgICBjb2RlLFxuICAgICAgICBiZXN0TWF0Y2ggPSB7XG4gICAgICAgICAgICBlcnJvcjogTnVtYmVyLk1BWF9WQUxVRSxcbiAgICAgICAgICAgIGNvZGU6IC0xLFxuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICBlbmQ6IDBcbiAgICAgICAgfTtcblxuICAgIGZvciAoIGogPSAwOyBqIDwgY291bnRlci5sZW5ndGg7IGorKykge1xuICAgICAgICBzdW0gKz0gY291bnRlcltqXTtcbiAgICB9XG4gICAgbm9ybWFsaXplZCA9IHNlbGYuX25vcm1hbGl6ZShjb3VudGVyKTtcbiAgICBpZiAobm9ybWFsaXplZCkge1xuICAgICAgICBmb3IgKGNvZGUgPSAwOyBjb2RlIDwgc2VsZi5DT0RFX1BBVFRFUk4ubGVuZ3RoOyBjb2RlKyspIHtcbiAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKG5vcm1hbGl6ZWQsIHNlbGYuQ09ERV9QQVRURVJOW2NvZGVdKTtcbiAgICAgICAgICAgIGlmIChlcnJvciA8IGJlc3RNYXRjaC5lcnJvcikge1xuICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb2RlID0gY29kZTtcbiAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYmVzdE1hdGNoLmVycm9yIDwgZXBzaWxvbikge1xuICAgICAgICAgICAgcmV0dXJuIGJlc3RNYXRjaDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlUGF5bG9hZCA9IGZ1bmN0aW9uKGNvdW50ZXJzLCByZXN1bHQsIGRlY29kZWRDb2Rlcykge1xuICAgIHZhciBpLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgcG9zID0gMCxcbiAgICAgICAgY291bnRlckxlbmd0aCA9IGNvdW50ZXJzLmxlbmd0aCxcbiAgICAgICAgY291bnRlclBhaXIgPSBbWzAsIDAsIDAsIDAsIDBdLCBbMCwgMCwgMCwgMCwgMF1dLFxuICAgICAgICBjb2RlcztcblxuICAgIHdoaWxlIChwb3MgPCBjb3VudGVyTGVuZ3RoKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgICAgIGNvdW50ZXJQYWlyWzBdW2ldID0gY291bnRlcnNbcG9zXSAqIHRoaXMuYmFyU3BhY2VSYXRpb1swXTtcbiAgICAgICAgICAgIGNvdW50ZXJQYWlyWzFdW2ldID0gY291bnRlcnNbcG9zICsgMV0gKiB0aGlzLmJhclNwYWNlUmF0aW9bMV07XG4gICAgICAgICAgICBwb3MgKz0gMjtcbiAgICAgICAgfVxuICAgICAgICBjb2RlcyA9IHNlbGYuX2RlY29kZVBhaXIoY291bnRlclBhaXIpO1xuICAgICAgICBpZiAoIWNvZGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvZGVzW2ldLmNvZGUgKyBcIlwiKTtcbiAgICAgICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGVzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29kZXM7XG59O1xuXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeUNvdW50ZXJMZW5ndGggPSBmdW5jdGlvbihjb3VudGVycykge1xuICAgIHJldHVybiAoY291bnRlcnMubGVuZ3RoICUgMTAgPT09IDApO1xufTtcblxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9kZWNvZGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RhcnRJbmZvLFxuICAgICAgICBlbmRJbmZvLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgY29kZSxcbiAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgIGRlY29kZWRDb2RlcyA9IFtdLFxuICAgICAgICBjb3VudGVycztcblxuICAgIHN0YXJ0SW5mbyA9IHNlbGYuX2ZpbmRTdGFydCgpO1xuICAgIGlmICghc3RhcnRJbmZvKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZWNvZGVkQ29kZXMucHVzaChzdGFydEluZm8pO1xuXG4gICAgZW5kSW5mbyA9IHNlbGYuX2ZpbmRFbmQoKTtcbiAgICBpZiAoIWVuZEluZm8pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY291bnRlcnMgPSBzZWxmLl9maWxsQ291bnRlcnMoc3RhcnRJbmZvLmVuZCwgZW5kSW5mby5zdGFydCwgZmFsc2UpO1xuICAgIGlmICghc2VsZi5fdmVyaWZ5Q291bnRlckxlbmd0aChjb3VudGVycykpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVQYXlsb2FkKGNvdW50ZXJzLCByZXN1bHQsIGRlY29kZWRDb2Rlcyk7XG4gICAgaWYgKCFjb2RlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAocmVzdWx0Lmxlbmd0aCAlIDIgIT09IDAgfHxcbiAgICAgICAgICAgIHJlc3VsdC5sZW5ndGggPCA2KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGRlY29kZWRDb2Rlcy5wdXNoKGVuZEluZm8pO1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvZGU6IHJlc3VsdC5qb2luKFwiXCIpLFxuICAgICAgICBzdGFydDogc3RhcnRJbmZvLnN0YXJ0LFxuICAgICAgICBlbmQ6IGVuZEluZm8uZW5kLFxuICAgICAgICBzdGFydEluZm86IHN0YXJ0SW5mbyxcbiAgICAgICAgZGVjb2RlZENvZGVzOiBkZWNvZGVkQ29kZXNcbiAgICB9O1xufTtcblxuSTJvZjVSZWFkZXIuQ09ORklHX0tFWVMgPSB7XG4gICAgbm9ybWFsaXplQmFyU3BhY2VXaWR0aDoge1xuICAgICAgICAndHlwZSc6ICdib29sZWFuJyxcbiAgICAgICAgJ2RlZmF1bHQnOiBmYWxzZSxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0lmIHRydWUsIHRoZSByZWFkZXIgdHJpZXMgdG8gbm9ybWFsaXplIHRoZScgK1xuICAgICAgICAnd2lkdGgtZGlmZmVyZW5jZSBiZXR3ZWVuIGJhcnMgYW5kIHNwYWNlcydcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJMm9mNVJlYWRlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2kyb2Y1X3JlYWRlci5qc1xuICoqLyIsInZhciBiYXNlTWVyZ2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlTWVyZ2UnKSxcbiAgICBjcmVhdGVBc3NpZ25lciA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2NyZWF0ZUFzc2lnbmVyJyk7XG5cbi8qKlxuICogUmVjdXJzaXZlbHkgbWVyZ2VzIG93biBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgdGhlIHNvdXJjZSBvYmplY3QocyksIHRoYXRcbiAqIGRvbid0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAgaW50byB0aGUgZGVzdGluYXRpb24gb2JqZWN0LiBTdWJzZXF1ZW50IHNvdXJjZXNcbiAqIG92ZXJ3cml0ZSBwcm9wZXJ0eSBhc3NpZ25tZW50cyBvZiBwcmV2aW91cyBzb3VyY2VzLiBJZiBgY3VzdG9taXplcmAgaXNcbiAqIHByb3ZpZGVkIGl0J3MgaW52b2tlZCB0byBwcm9kdWNlIHRoZSBtZXJnZWQgdmFsdWVzIG9mIHRoZSBkZXN0aW5hdGlvbiBhbmRcbiAqIHNvdXJjZSBwcm9wZXJ0aWVzLiBJZiBgY3VzdG9taXplcmAgcmV0dXJucyBgdW5kZWZpbmVkYCBtZXJnaW5nIGlzIGhhbmRsZWRcbiAqIGJ5IHRoZSBtZXRob2QgaW5zdGVhZC4gVGhlIGBjdXN0b21pemVyYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWRcbiAqIHdpdGggZml2ZSBhcmd1bWVudHM6IChvYmplY3RWYWx1ZSwgc291cmNlVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmVkIHZhbHVlcy5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY3VzdG9taXplcmAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSB7XG4gKiAgICdkYXRhJzogW3sgJ3VzZXInOiAnYmFybmV5JyB9LCB7ICd1c2VyJzogJ2ZyZWQnIH1dXG4gKiB9O1xuICpcbiAqIHZhciBhZ2VzID0ge1xuICogICAnZGF0YSc6IFt7ICdhZ2UnOiAzNiB9LCB7ICdhZ2UnOiA0MCB9XVxuICogfTtcbiAqXG4gKiBfLm1lcmdlKHVzZXJzLCBhZ2VzKTtcbiAqIC8vID0+IHsgJ2RhdGEnOiBbeyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYgfSwgeyAndXNlcic6ICdmcmVkJywgJ2FnZSc6IDQwIH1dIH1cbiAqXG4gKiAvLyB1c2luZyBhIGN1c3RvbWl6ZXIgY2FsbGJhY2tcbiAqIHZhciBvYmplY3QgPSB7XG4gKiAgICdmcnVpdHMnOiBbJ2FwcGxlJ10sXG4gKiAgICd2ZWdldGFibGVzJzogWydiZWV0J11cbiAqIH07XG4gKlxuICogdmFyIG90aGVyID0ge1xuICogICAnZnJ1aXRzJzogWydiYW5hbmEnXSxcbiAqICAgJ3ZlZ2V0YWJsZXMnOiBbJ2NhcnJvdCddXG4gKiB9O1xuICpcbiAqIF8ubWVyZ2Uob2JqZWN0LCBvdGhlciwgZnVuY3Rpb24oYSwgYikge1xuICogICBpZiAoXy5pc0FycmF5KGEpKSB7XG4gKiAgICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICogICB9XG4gKiB9KTtcbiAqIC8vID0+IHsgJ2ZydWl0cyc6IFsnYXBwbGUnLCAnYmFuYW5hJ10sICd2ZWdldGFibGVzJzogWydiZWV0JywgJ2NhcnJvdCddIH1cbiAqL1xudmFyIG1lcmdlID0gY3JlYXRlQXNzaWduZXIoYmFzZU1lcmdlKTtcblxubW9kdWxlLmV4cG9ydHMgPSBtZXJnZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9vYmplY3QvbWVyZ2UuanNcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFycmF5RWFjaCA9IHJlcXVpcmUoJy4vYXJyYXlFYWNoJyksXG4gICAgYmFzZU1lcmdlRGVlcCA9IHJlcXVpcmUoJy4vYmFzZU1lcmdlRGVlcCcpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNUeXBlZEFycmF5JyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWVyZ2VgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXJndW1lbnQganVnZ2xpbmcsXG4gKiBtdWx0aXBsZSBzb3VyY2VzLCBhbmQgYHRoaXNgIGJpbmRpbmcgYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdlZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBPVtdXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQj1bXV0gQXNzb2NpYXRlcyB2YWx1ZXMgd2l0aCBzb3VyY2UgY291bnRlcnBhcnRzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlKG9iamVjdCwgc291cmNlLCBjdXN0b21pemVyLCBzdGFja0EsIHN0YWNrQikge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIHZhciBpc1NyY0FyciA9IGlzQXJyYXlMaWtlKHNvdXJjZSkgJiYgKGlzQXJyYXkoc291cmNlKSB8fCBpc1R5cGVkQXJyYXkoc291cmNlKSksXG4gICAgICBwcm9wcyA9IGlzU3JjQXJyID8gdW5kZWZpbmVkIDoga2V5cyhzb3VyY2UpO1xuXG4gIGFycmF5RWFjaChwcm9wcyB8fCBzb3VyY2UsIGZ1bmN0aW9uKHNyY1ZhbHVlLCBrZXkpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGtleSA9IHNyY1ZhbHVlO1xuICAgICAgc3JjVmFsdWUgPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0TGlrZShzcmNWYWx1ZSkpIHtcbiAgICAgIHN0YWNrQSB8fCAoc3RhY2tBID0gW10pO1xuICAgICAgc3RhY2tCIHx8IChzdGFja0IgPSBbXSk7XG4gICAgICBiYXNlTWVyZ2VEZWVwKG9iamVjdCwgc291cmNlLCBrZXksIGJhc2VNZXJnZSwgY3VzdG9taXplciwgc3RhY2tBLCBzdGFja0IpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciB2YWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKHZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgaXNDb21tb24gPSByZXN1bHQgPT09IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKGlzQ29tbW9uKSB7XG4gICAgICAgIHJlc3VsdCA9IHNyY1ZhbHVlO1xuICAgICAgfVxuICAgICAgaWYgKChyZXN1bHQgIT09IHVuZGVmaW5lZCB8fCAoaXNTcmNBcnIgJiYgIShrZXkgaW4gb2JqZWN0KSkpICYmXG4gICAgICAgICAgKGlzQ29tbW9uIHx8IChyZXN1bHQgPT09IHJlc3VsdCA/IChyZXN1bHQgIT09IHZhbHVlKSA6ICh2YWx1ZSA9PT0gdmFsdWUpKSkpIHtcbiAgICAgICAgb2JqZWN0W2tleV0gPSByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlTWVyZ2U7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZU1lcmdlLmpzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZvckVhY2hgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUVhY2g7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvYXJyYXlFYWNoLmpzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhcnJheUNvcHkgPSByZXF1aXJlKCcuL2FycmF5Q29weScpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc1BsYWluT2JqZWN0JyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc1R5cGVkQXJyYXknKSxcbiAgICB0b1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy90b1BsYWluT2JqZWN0Jyk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlTWVyZ2VgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgbWVyZ2VzIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIG1lcmdlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gbWVyZ2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXJnZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1lcmdlIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdlZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBPVtdXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQj1bXV0gQXNzb2NpYXRlcyB2YWx1ZXMgd2l0aCBzb3VyY2UgY291bnRlcnBhcnRzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgbWVyZ2VGdW5jLCBjdXN0b21pemVyLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgbGVuZ3RoID0gc3RhY2tBLmxlbmd0aCxcbiAgICAgIHNyY1ZhbHVlID0gc291cmNlW2tleV07XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKHN0YWNrQVtsZW5ndGhdID09IHNyY1ZhbHVlKSB7XG4gICAgICBvYmplY3Rba2V5XSA9IHN0YWNrQltsZW5ndGhdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKHZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkgOiB1bmRlZmluZWQsXG4gICAgICBpc0NvbW1vbiA9IHJlc3VsdCA9PT0gdW5kZWZpbmVkO1xuXG4gIGlmIChpc0NvbW1vbikge1xuICAgIHJlc3VsdCA9IHNyY1ZhbHVlO1xuICAgIGlmIChpc0FycmF5TGlrZShzcmNWYWx1ZSkgJiYgKGlzQXJyYXkoc3JjVmFsdWUpIHx8IGlzVHlwZWRBcnJheShzcmNWYWx1ZSkpKSB7XG4gICAgICByZXN1bHQgPSBpc0FycmF5KHZhbHVlKVxuICAgICAgICA/IHZhbHVlXG4gICAgICAgIDogKGlzQXJyYXlMaWtlKHZhbHVlKSA/IGFycmF5Q29weSh2YWx1ZSkgOiBbXSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3Qoc3JjVmFsdWUpIHx8IGlzQXJndW1lbnRzKHNyY1ZhbHVlKSkge1xuICAgICAgcmVzdWx0ID0gaXNBcmd1bWVudHModmFsdWUpXG4gICAgICAgID8gdG9QbGFpbk9iamVjdCh2YWx1ZSlcbiAgICAgICAgOiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkgPyB2YWx1ZSA6IHt9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICAvLyBBZGQgdGhlIHNvdXJjZSB2YWx1ZSB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMgYW5kIGFzc29jaWF0ZVxuICAvLyBpdCB3aXRoIGl0cyBtZXJnZWQgdmFsdWUuXG4gIHN0YWNrQS5wdXNoKHNyY1ZhbHVlKTtcbiAgc3RhY2tCLnB1c2gocmVzdWx0KTtcblxuICBpZiAoaXNDb21tb24pIHtcbiAgICAvLyBSZWN1cnNpdmVseSBtZXJnZSBvYmplY3RzIGFuZCBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBvYmplY3Rba2V5XSA9IG1lcmdlRnVuYyhyZXN1bHQsIHNyY1ZhbHVlLCBjdXN0b21pemVyLCBzdGFja0EsIHN0YWNrQik7XG4gIH0gZWxzZSBpZiAocmVzdWx0ID09PSByZXN1bHQgPyAocmVzdWx0ICE9PSB2YWx1ZSkgOiAodmFsdWUgPT09IHZhbHVlKSkge1xuICAgIG9iamVjdFtrZXldID0gcmVzdWx0O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZU1lcmdlRGVlcDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlTWVyZ2VEZWVwLmpzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlDb3B5KHNvdXJjZSwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xuXG4gIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5Q29weTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9hcnJheUNvcHkuanNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNBcnJheUxpa2UnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSkgJiZcbiAgICBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiYgIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FyZ3VtZW50cztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL2lzQXJndW1lbnRzLmpzXG4gKiogbW9kdWxlIGlkID0gMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnZXRMZW5ndGggPSByZXF1aXJlKCcuL2dldExlbmd0aCcpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aChnZXRMZW5ndGgodmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5TGlrZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9pc0FycmF5TGlrZS5qc1xuICoqIG1vZHVsZSBpZCA9IDMyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYmFzZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9iYXNlUHJvcGVydHknKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBcImxlbmd0aFwiIHByb3BlcnR5IHZhbHVlIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXZvaWQgYSBbSklUIGJ1Z10oaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE0Mjc5MilcbiAqIHRoYXQgYWZmZWN0cyBTYWZhcmkgb24gYXQgbGVhc3QgaU9TIDguMS04LjMgQVJNNjQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBcImxlbmd0aFwiIHZhbHVlLlxuICovXG52YXIgZ2V0TGVuZ3RoID0gYmFzZVByb3BlcnR5KCdsZW5ndGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRMZW5ndGg7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvZ2V0TGVuZ3RoLmpzXG4gKiogbW9kdWxlIGlkID0gMzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVByb3BlcnR5O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2Jhc2VQcm9wZXJ0eS5qc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTGVuZ3RoO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2lzTGVuZ3RoLmpzXG4gKiogbW9kdWxlIGlkID0gMzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNPYmplY3RMaWtlLmpzXG4gKiogbW9kdWxlIGlkID0gMzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9nZXROYXRpdmUnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQXJyYXkgPSBnZXROYXRpdmUoQXJyYXksICdpc0FycmF5Jyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBuYXRpdmVJc0FycmF5IHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJyYXlUYWc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvbGFuZy9pc0FycmF5LmpzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc05hdGl2ZSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNOYXRpdmUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIHJldHVybiBpc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXROYXRpdmU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvZ2V0TmF0aXZlLmpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpID4gNSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZm5Ub1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZywgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIHJldHVybiByZUlzTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVJc0hvc3RDdG9yLnRlc3QodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTmF0aXZlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2xhbmcvaXNOYXRpdmUuanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaSB3aGljaCByZXR1cm4gJ2Z1bmN0aW9uJyBmb3IgcmVnZXhlc1xuICAvLyBhbmQgU2FmYXJpIDggd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgY29uc3RydWN0b3JzLlxuICByZXR1cm4gaXNPYmplY3QodmFsdWUpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL2lzRnVuY3Rpb24uanNcbiAqKiBtb2R1bGUgaWQgPSA0MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL2lzT2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiYXNlRm9ySW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlRm9ySW4nKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGFzc3VtZXMgb2JqZWN0cyBjcmVhdGVkIGJ5IHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3RvclxuICogaGF2ZSBubyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHZhciBDdG9yO1xuXG4gIC8vIEV4aXQgZWFybHkgZm9yIG5vbiBgT2JqZWN0YCBvYmplY3RzLlxuICBpZiAoIShpc09iamVjdExpa2UodmFsdWUpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IG9iamVjdFRhZyAmJiAhaXNBcmd1bWVudHModmFsdWUpKSB8fFxuICAgICAgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY29uc3RydWN0b3InKSAmJiAoQ3RvciA9IHZhbHVlLmNvbnN0cnVjdG9yLCB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmICEoQ3RvciBpbnN0YW5jZW9mIEN0b3IpKSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gSUUgPCA5IGl0ZXJhdGVzIGluaGVyaXRlZCBwcm9wZXJ0aWVzIGJlZm9yZSBvd24gcHJvcGVydGllcy4gSWYgdGhlIGZpcnN0XG4gIC8vIGl0ZXJhdGVkIHByb3BlcnR5IGlzIGFuIG9iamVjdCdzIG93biBwcm9wZXJ0eSB0aGVuIHRoZXJlIGFyZSBubyBpbmhlcml0ZWRcbiAgLy8gZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICB2YXIgcmVzdWx0O1xuICAvLyBJbiBtb3N0IGVudmlyb25tZW50cyBhbiBvYmplY3QncyBvd24gcHJvcGVydGllcyBhcmUgaXRlcmF0ZWQgYmVmb3JlXG4gIC8vIGl0cyBpbmhlcml0ZWQgcHJvcGVydGllcy4gSWYgdGhlIGxhc3QgaXRlcmF0ZWQgcHJvcGVydHkgaXMgYW4gb2JqZWN0J3NcbiAgLy8gb3duIHByb3BlcnR5IHRoZW4gdGhlcmUgYXJlIG5vIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gIGJhc2VGb3JJbih2YWx1ZSwgZnVuY3Rpb24oc3ViVmFsdWUsIGtleSkge1xuICAgIHJlc3VsdCA9IGtleTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQgPT09IHVuZGVmaW5lZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCByZXN1bHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUGxhaW5PYmplY3Q7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvbGFuZy9pc1BsYWluT2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiYXNlRm9yID0gcmVxdWlyZSgnLi9iYXNlRm9yJyksXG4gICAga2V5c0luID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXNJbicpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvckluYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9ySW4ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gYmFzZUZvcihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzSW4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGb3JJbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlRm9ySW4uanNcbiAqKiBtb2R1bGUgaWQgPSA0M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGNyZWF0ZUJhc2VGb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUJhc2VGb3InKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvckluYCBhbmQgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzXG4gKiBvdmVyIGBvYmplY3RgIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBpbnZva2luZyBgaXRlcmF0ZWVgIGZvclxuICogZWFjaCBwcm9wZXJ0eS4gSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5XG4gKiByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xudmFyIGJhc2VGb3IgPSBjcmVhdGVCYXNlRm9yKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZvcjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlRm9yLmpzXG4gKiogbW9kdWxlIGlkID0gNDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vdG9PYmplY3QnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgYmFzZSBmdW5jdGlvbiBmb3IgYF8uZm9ySW5gIG9yIGBfLmZvckluUmlnaHRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VGb3IoZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICAgIHZhciBpdGVyYWJsZSA9IHRvT2JqZWN0KG9iamVjdCksXG4gICAgICAgIHByb3BzID0ga2V5c0Z1bmMob2JqZWN0KSxcbiAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgICBpbmRleCA9IGZyb21SaWdodCA/IGxlbmd0aCA6IC0xO1xuXG4gICAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVba2V5XSwga2V5LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUJhc2VGb3I7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvY3JlYXRlQmFzZUZvci5qc1xuICoqIG1vZHVsZSBpZCA9IDQ1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhbiBvYmplY3QgaWYgaXQncyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgb2JqZWN0LlxuICovXG5mdW5jdGlvbiB0b09iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3QodmFsdWUpID8gdmFsdWUgOiBPYmplY3QodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvT2JqZWN0O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL3RvT2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzSW5kZXgnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICB9XG4gIHZhciBsZW5ndGggPSBvYmplY3QubGVuZ3RoO1xuICBsZW5ndGggPSAobGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpICYmIGxlbmd0aCkgfHwgMDtcblxuICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBpc1Byb3RvID0gdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0LFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKSxcbiAgICAgIHNraXBJbmRleGVzID0gbGVuZ3RoID4gMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSAoaW5kZXggKyAnJyk7XG4gIH1cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKHNraXBJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSAmJlxuICAgICAgICAhKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXNJbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9vYmplY3Qva2V5c0luLmpzXG4gKiogbW9kdWxlIGlkID0gNDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eXFxkKyQvO1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIHZhbHVlID0gKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgPyArdmFsdWUgOiAtMTtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0luZGV4O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2lzSW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA0OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPSB0eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPSB0eXBlZEFycmF5VGFnc1ttYXBUYWddID1cbnR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID1cbnR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzZXRUYWddID1cbnR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPSB0eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW29ialRvU3RyaW5nLmNhbGwodmFsdWUpXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1R5cGVkQXJyYXk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvbGFuZy9pc1R5cGVkQXJyYXkuanNcbiAqKiBtb2R1bGUgaWQgPSA0OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGJhc2VDb3B5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUNvcHknKSxcbiAgICBrZXlzSW4gPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5c0luJyk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHBsYWluIG9iamVjdCBmbGF0dGVuaW5nIGluaGVyaXRlZCBlbnVtZXJhYmxlXG4gKiBwcm9wZXJ0aWVzIG9mIGB2YWx1ZWAgdG8gb3duIHByb3BlcnRpZXMgb2YgdGhlIHBsYWluIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgcGxhaW4gb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBuZXcgRm9vKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIgfVxuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIF8udG9QbGFpbk9iamVjdChuZXcgRm9vKSk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyLCAnYyc6IDMgfVxuICovXG5mdW5jdGlvbiB0b1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBiYXNlQ29weSh2YWx1ZSwga2V5c0luKHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9QbGFpbk9iamVjdDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL3RvUGxhaW5PYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA1MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3BpZXMgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IG5hbWVzIHRvIGNvcHkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlQ29weShzb3VyY2UsIHByb3BzLCBvYmplY3QpIHtcbiAgb2JqZWN0IHx8IChvYmplY3QgPSB7fSk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIG9iamVjdFtrZXldID0gc291cmNlW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ29weTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlQ29weS5qc1xuICoqIG1vZHVsZSBpZCA9IDUxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvZ2V0TmF0aXZlJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0FycmF5TGlrZScpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpLFxuICAgIHNoaW1LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvc2hpbUtleXMnKTtcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2tleXMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xudmFyIGtleXMgPSAhbmF0aXZlS2V5cyA/IHNoaW1LZXlzIDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIHZhciBDdG9yID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3QuY29uc3RydWN0b3I7XG4gIGlmICgodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0KSB8fFxuICAgICAgKHR5cGVvZiBvYmplY3QgIT0gJ2Z1bmN0aW9uJyAmJiBpc0FycmF5TGlrZShvYmplY3QpKSkge1xuICAgIHJldHVybiBzaGltS2V5cyhvYmplY3QpO1xuICB9XG4gIHJldHVybiBpc09iamVjdChvYmplY3QpID8gbmF0aXZlS2V5cyhvYmplY3QpIDogW107XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvb2JqZWN0L2tleXMuanNcbiAqKiBtb2R1bGUgaWQgPSA1MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9pc0luZGV4JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAga2V5c0luID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXNJbicpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBIGZhbGxiYWNrIGltcGxlbWVudGF0aW9uIG9mIGBPYmplY3Qua2V5c2Agd2hpY2ggY3JlYXRlcyBhbiBhcnJheSBvZiB0aGVcbiAqIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBzaGltS2V5cyhvYmplY3QpIHtcbiAgdmFyIHByb3BzID0ga2V5c0luKG9iamVjdCksXG4gICAgICBwcm9wc0xlbmd0aCA9IHByb3BzLmxlbmd0aCxcbiAgICAgIGxlbmd0aCA9IHByb3BzTGVuZ3RoICYmIG9iamVjdC5sZW5ndGg7XG5cbiAgdmFyIGFsbG93SW5kZXhlcyA9ICEhbGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBwcm9wc0xlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKChhbGxvd0luZGV4ZXMgJiYgaXNJbmRleChrZXksIGxlbmd0aCkpIHx8IGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNoaW1LZXlzO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL3NoaW1LZXlzLmpzXG4gKiogbW9kdWxlIGlkID0gNTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCcuL2JpbmRDYWxsYmFjaycpLFxuICAgIGlzSXRlcmF0ZWVDYWxsID0gcmVxdWlyZSgnLi9pc0l0ZXJhdGVlQ2FsbCcpLFxuICAgIHJlc3RQYXJhbSA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9uL3Jlc3RQYXJhbScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBgXy5hc3NpZ25gLCBgXy5kZWZhdWx0c2AsIG9yIGBfLm1lcmdlYCBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIHJlc3RQYXJhbShmdW5jdGlvbihvYmplY3QsIHNvdXJjZXMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gb2JqZWN0ID09IG51bGwgPyAwIDogc291cmNlcy5sZW5ndGgsXG4gICAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPiAyID8gc291cmNlc1tsZW5ndGggLSAyXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgZ3VhcmQgPSBsZW5ndGggPiAyID8gc291cmNlc1syXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgdGhpc0FyZyA9IGxlbmd0aCA+IDEgPyBzb3VyY2VzW2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicpIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSBiaW5kQ2FsbGJhY2soY3VzdG9taXplciwgdGhpc0FyZywgNSk7XG4gICAgICBsZW5ndGggLT0gMjtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VzdG9taXplciA9IHR5cGVvZiB0aGlzQXJnID09ICdmdW5jdGlvbicgPyB0aGlzQXJnIDogdW5kZWZpbmVkO1xuICAgICAgbGVuZ3RoIC09IChjdXN0b21pemVyID8gMSA6IDApO1xuICAgIH1cbiAgICBpZiAoZ3VhcmQgJiYgaXNJdGVyYXRlZUNhbGwoc291cmNlc1swXSwgc291cmNlc1sxXSwgZ3VhcmQpKSB7XG4gICAgICBjdXN0b21pemVyID0gbGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IGN1c3RvbWl6ZXI7XG4gICAgICBsZW5ndGggPSAxO1xuICAgIH1cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBhc3NpZ25lcihvYmplY3QsIHNvdXJjZSwgY3VzdG9taXplcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUFzc2lnbmVyO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2NyZWF0ZUFzc2lnbmVyLmpzXG4gKiogbW9kdWxlIGlkID0gNTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpZGVudGl0eSA9IHJlcXVpcmUoJy4uL3V0aWxpdHkvaWRlbnRpdHknKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VDYWxsYmFja2Agd2hpY2ggb25seSBzdXBwb3J0cyBgdGhpc2AgYmluZGluZ1xuICogYW5kIHNwZWNpZnlpbmcgdGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGJpbmQuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJnQ291bnRdIFRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjYWxsYmFjay5cbiAqL1xuZnVuY3Rpb24gYmluZENhbGxiYWNrKGZ1bmMsIHRoaXNBcmcsIGFyZ0NvdW50KSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5O1xuICB9XG4gIGlmICh0aGlzQXJnID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZnVuYztcbiAgfVxuICBzd2l0Y2ggKGFyZ0NvdW50KSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDQ6IHJldHVybiBmdW5jdGlvbihhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH07XG4gICAgY2FzZSA1OiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBvdGhlciwga2V5LCBvYmplY3QsIHNvdXJjZSk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kQ2FsbGJhY2s7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvYmluZENhbGxiYWNrLmpzXG4gKiogbW9kdWxlIGlkID0gNTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgcHJvdmlkZWQgdG8gaXQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsaXR5XG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKlxuICogXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3Q7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpZGVudGl0eTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC91dGlsaXR5L2lkZW50aXR5LmpzXG4gKiogbW9kdWxlIGlkID0gNTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9pc0luZGV4JyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBwcm92aWRlZCBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0l0ZXJhdGVlQ2FsbCh2YWx1ZSwgaW5kZXgsIG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgaW5kZXg7XG4gIGlmICh0eXBlID09ICdudW1iZXInXG4gICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgOiAodHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3QpKSB7XG4gICAgdmFyIG90aGVyID0gb2JqZWN0W2luZGV4XTtcbiAgICByZXR1cm4gdmFsdWUgPT09IHZhbHVlID8gKHZhbHVlID09PSBvdGhlcikgOiAob3RoZXIgIT09IG90aGVyKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJdGVyYXRlZUNhbGw7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNJdGVyYXRlZUNhbGwuanNcbiAqKiBtb2R1bGUgaWQgPSA1N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXg7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlXG4gKiBjcmVhdGVkIGZ1bmN0aW9uIGFuZCBhcmd1bWVudHMgZnJvbSBgc3RhcnRgIGFuZCBiZXlvbmQgcHJvdmlkZWQgYXMgYW4gYXJyYXkuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGJhc2VkIG9uIHRoZSBbcmVzdCBwYXJhbWV0ZXJdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9GdW5jdGlvbnMvcmVzdF9wYXJhbWV0ZXJzKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBzYXkgPSBfLnJlc3RQYXJhbShmdW5jdGlvbih3aGF0LCBuYW1lcykge1xuICogICByZXR1cm4gd2hhdCArICcgJyArIF8uaW5pdGlhbChuYW1lcykuam9pbignLCAnKSArXG4gKiAgICAgKF8uc2l6ZShuYW1lcykgPiAxID8gJywgJiAnIDogJycpICsgXy5sYXN0KG5hbWVzKTtcbiAqIH0pO1xuICpcbiAqIHNheSgnaGVsbG8nLCAnZnJlZCcsICdiYXJuZXknLCAncGViYmxlcycpO1xuICogLy8gPT4gJ2hlbGxvIGZyZWQsIGJhcm5leSwgJiBwZWJibGVzJ1xuICovXG5mdW5jdGlvbiByZXN0UGFyYW0oZnVuYywgc3RhcnQpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogKCtzdGFydCB8fCAwKSwgMCk7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWF4KGFyZ3MubGVuZ3RoIC0gc3RhcnQsIDApLFxuICAgICAgICByZXN0ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICByZXN0W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIHN3aXRjaCAoc3RhcnQpIHtcbiAgICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCByZXN0KTtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcmdzWzBdLCByZXN0KTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcmdzWzBdLCBhcmdzWzFdLCByZXN0KTtcbiAgICB9XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgaW5kZXggPSAtMTtcbiAgICB3aGlsZSAoKytpbmRleCA8IHN0YXJ0KSB7XG4gICAgICBvdGhlckFyZ3NbaW5kZXhdID0gYXJnc1tpbmRleF07XG4gICAgfVxuICAgIG90aGVyQXJnc1tzdGFydF0gPSByZXN0O1xuICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzdFBhcmFtO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2Z1bmN0aW9uL3Jlc3RQYXJhbS5qc1xuICoqIG1vZHVsZSBpZCA9IDU4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgaW5wdXRTdHJlYW06IHtcbiAgICAgICAgbmFtZTogXCJMaXZlXCIsXG4gICAgICAgIHR5cGU6IFwiTGl2ZVN0cmVhbVwiLFxuICAgICAgICBjb25zdHJhaW50czoge1xuICAgICAgICAgICAgd2lkdGg6IDY0MCxcbiAgICAgICAgICAgIGhlaWdodDogNDgwLFxuICAgICAgICAgICAgbWluQXNwZWN0UmF0aW86IDAsXG4gICAgICAgICAgICBtYXhBc3BlY3RSYXRpbzogMTAwLFxuICAgICAgICAgICAgZmFjaW5nOiBcImVudmlyb25tZW50XCIgLy8gb3IgdXNlclxuICAgICAgICB9LFxuICAgICAgICBhcmVhOiB7XG4gICAgICAgICAgICB0b3A6IFwiMCVcIixcbiAgICAgICAgICAgIHJpZ2h0OiBcIjAlXCIsXG4gICAgICAgICAgICBsZWZ0OiBcIjAlXCIsXG4gICAgICAgICAgICBib3R0b206IFwiMCVcIlxuICAgICAgICB9LFxuICAgICAgICBzaW5nbGVDaGFubmVsOiBmYWxzZSAvLyB0cnVlOiBvbmx5IHRoZSByZWQgY29sb3ItY2hhbm5lbCBpcyByZWFkXG4gICAgfSxcbiAgICBkZWJ1ZzogZmFsc2UsXG4gICAgbG9jYXRlOiB0cnVlLFxuICAgIG51bU9mV29ya2VyczogNCxcbiAgICBkZWNvZGVyOiB7XG4gICAgICAgIGRyYXdCb3VuZGluZ0JveDogZmFsc2UsXG4gICAgICAgIHNob3dGcmVxdWVuY3k6IGZhbHNlLFxuICAgICAgICBkcmF3U2NhbmxpbmU6IGZhbHNlLFxuICAgICAgICBzaG93UGF0dGVybjogZmFsc2UsXG4gICAgICAgIHJlYWRlcnM6IFtcbiAgICAgICAgICAgICdjb2RlXzEyOF9yZWFkZXInXG4gICAgICAgIF1cbiAgICB9LFxuICAgIGxvY2F0b3I6IHtcbiAgICAgICAgaGFsZlNhbXBsZTogdHJ1ZSxcbiAgICAgICAgcGF0Y2hTaXplOiBcIm1lZGl1bVwiLCAvLyB4LXNtYWxsLCBzbWFsbCwgbWVkaXVtLCBsYXJnZSwgeC1sYXJnZVxuICAgICAgICBzaG93Q2FudmFzOiBmYWxzZSxcbiAgICAgICAgc2hvd1BhdGNoZXM6IGZhbHNlLFxuICAgICAgICBzaG93Rm91bmRQYXRjaGVzOiBmYWxzZSxcbiAgICAgICAgc2hvd1NrZWxldG9uOiBmYWxzZSxcbiAgICAgICAgc2hvd0xhYmVsczogZmFsc2UsXG4gICAgICAgIHNob3dQYXRjaExhYmVsczogZmFsc2UsXG4gICAgICAgIHNob3dSZW1haW5pbmdQYXRjaExhYmVsczogZmFsc2UsXG4gICAgICAgIGJveEZyb21QYXRjaGVzOiB7XG4gICAgICAgICAgICBzaG93VHJhbnNmb3JtZWQ6IGZhbHNlLFxuICAgICAgICAgICAgc2hvd1RyYW5zZm9ybWVkQm94OiBmYWxzZSxcbiAgICAgICAgICAgIHNob3dCQjogZmFsc2VcbiAgICAgICAgfVxuICAgIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb25maWcuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGV2ZW50cyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gZ2V0RXZlbnQoZXZlbnROYW1lKSB7XG4gICAgICAgIGlmICghZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgIGV2ZW50c1tldmVudE5hbWVdID0ge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXJzOiBbXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXZlbnRzW2V2ZW50TmFtZV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJFdmVudHMoKXtcbiAgICAgICAgZXZlbnRzID0ge307XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHVibGlzaFN1YnNjcmlwdGlvbihzdWJzY3JpcHRpb24sIGRhdGEpIHtcbiAgICAgICAgaWYgKHN1YnNjcmlwdGlvbi5hc3luYykge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24uY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgICB9LCA0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5jYWxsYmFjayhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN1YnNjcmliZShldmVudCwgY2FsbGJhY2ssIGFzeW5jKSB7XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb247XG5cbiAgICAgICAgaWYgKCB0eXBlb2YgY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgICAgICAgICAgICBhc3luYzogYXN5bmNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24gPSBjYWxsYmFjaztcbiAgICAgICAgICAgIGlmICghc3Vic2NyaXB0aW9uLmNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgXCJDYWxsYmFjayB3YXMgbm90IHNwZWNpZmllZCBvbiBvcHRpb25zXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBnZXRFdmVudChldmVudCkuc3Vic2NyaWJlcnMucHVzaChzdWJzY3JpcHRpb24pO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrLCBhc3luYykge1xuICAgICAgICAgICAgcmV0dXJuIHN1YnNjcmliZShldmVudCwgY2FsbGJhY2ssIGFzeW5jKTtcbiAgICAgICAgfSxcbiAgICAgICAgcHVibGlzaDogZnVuY3Rpb24oZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBnZXRFdmVudChldmVudE5hbWUpLFxuICAgICAgICAgICAgICAgIHN1YnNjcmliZXJzID0gZXZlbnQuc3Vic2NyaWJlcnM7XG5cbiAgICAgICAgICAgIGV2ZW50LnN1YnNjcmliZXJzID0gc3Vic2NyaWJlcnMuZmlsdGVyKGZ1bmN0aW9uKHN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgICAgICBwdWJsaXNoU3Vic2NyaXB0aW9uKHN1YnNjcmliZXIsIGRhdGEpO1xuICAgICAgICAgICAgICAgIHJldHVybiAhc3Vic2NyaWJlci5vbmNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uY2U6IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaywgYXN5bmMpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZShldmVudCwge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgICAgICAgICAgICBhc3luYzogYXN5bmMsXG4gICAgICAgICAgICAgICAgb25jZTogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnQ7XG5cbiAgICAgICAgICAgIGlmIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgICAgICBldmVudCA9IGdldEV2ZW50KGV2ZW50TmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50ICYmIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN1YnNjcmliZXJzID0gZXZlbnQuc3Vic2NyaWJlcnMuZmlsdGVyKGZ1bmN0aW9uKHN1YnNjcmliZXIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1YnNjcmliZXIuY2FsbGJhY2sgIT09IGNhbGxiYWNrO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdWJzY3JpYmVycyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2xlYXJFdmVudHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59KSgpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZXZlbnRzLmpzXG4gKiovIiwiY29uc3QgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L21lcmdlJyk7XG5cbnZhciBzdHJlYW1SZWYsXG4gICAgbG9hZGVkRGF0YUhhbmRsZXI7XG5cbi8qKlxuICogV3JhcHMgYnJvd3Nlci1zcGVjaWZpYyBnZXRVc2VyTWVkaWFcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25zdHJhaW50c1xuICogQHBhcmFtIHtPYmplY3R9IHN1Y2Nlc3MgQ2FsbGJhY2tcbiAqIEBwYXJhbSB7T2JqZWN0fSBmYWlsdXJlIENhbGxiYWNrXG4gKi9cbmZ1bmN0aW9uIGdldFVzZXJNZWRpYShjb25zdHJhaW50cywgc3VjY2VzcywgZmFpbHVyZSkge1xuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYShjb25zdHJhaW50cywgZnVuY3Rpb24gKHN0cmVhbSkge1xuICAgICAgICAgICAgc3RyZWFtUmVmID0gc3RyZWFtO1xuICAgICAgICAgICAgdmFyIHZpZGVvU3JjID0gKHdpbmRvdy5VUkwgJiYgd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKSkgfHwgc3RyZWFtO1xuICAgICAgICAgICAgc3VjY2Vzcy5hcHBseShudWxsLCBbdmlkZW9TcmNdKTtcbiAgICAgICAgfSwgZmFpbHVyZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZmFpbHVyZShuZXcgVHlwZUVycm9yKFwiZ2V0VXNlck1lZGlhIG5vdCBhdmFpbGFibGVcIikpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbG9hZGVkRGF0YSh2aWRlbywgY2FsbGJhY2spIHtcbiAgICB2YXIgYXR0ZW1wdHMgPSAxMDtcblxuICAgIGZ1bmN0aW9uIGNoZWNrVmlkZW8oKSB7XG4gICAgICAgIGlmIChhdHRlbXB0cyA+IDApIHtcbiAgICAgICAgICAgIGlmICh2aWRlby52aWRlb1dpZHRoID4gMCAmJiB2aWRlby52aWRlb0hlaWdodCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh2aWRlby52aWRlb1dpZHRoICsgXCJweCB4IFwiICsgdmlkZW8udmlkZW9IZWlnaHQgKyBcInB4XCIpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNoZWNrVmlkZW8sIDUwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjaygnVW5hYmxlIHRvIHBsYXkgdmlkZW8gc3RyZWFtLiBJcyB3ZWJjYW0gd29ya2luZz8nKTtcbiAgICAgICAgfVxuICAgICAgICBhdHRlbXB0cy0tO1xuICAgIH1cbiAgICBjaGVja1ZpZGVvKCk7XG59XG5cbi8qKlxuICogVHJpZXMgdG8gYXR0YWNoIHRoZSBjYW1lcmEtc3RyZWFtIHRvIGEgZ2l2ZW4gdmlkZW8tZWxlbWVudFxuICogYW5kIGNhbGxzIHRoZSBjYWxsYmFjayBmdW5jdGlvbiB3aGVuIHRoZSBjb250ZW50IGlzIHJlYWR5XG4gKiBAcGFyYW0ge09iamVjdH0gY29uc3RyYWludHNcbiAqIEBwYXJhbSB7T2JqZWN0fSB2aWRlb1xuICogQHBhcmFtIHtPYmplY3R9IGNhbGxiYWNrXG4gKi9cbmZ1bmN0aW9uIGluaXRDYW1lcmEoY29uc3RyYWludHMsIHZpZGVvLCBjYWxsYmFjaykge1xuICAgIGdldFVzZXJNZWRpYShjb25zdHJhaW50cywgZnVuY3Rpb24oc3JjKSB7XG4gICAgICAgIHZpZGVvLnNyYyA9IHNyYztcbiAgICAgICAgaWYgKGxvYWRlZERhdGFIYW5kbGVyKSB7XG4gICAgICAgICAgICB2aWRlby5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZGVkZGF0YVwiLCBsb2FkZWREYXRhSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGxvYWRlZERhdGFIYW5kbGVyID0gbG9hZGVkRGF0YS5iaW5kKG51bGwsIHZpZGVvLCBjYWxsYmFjayk7XG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZGRhdGEnLCBsb2FkZWREYXRhSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB2aWRlby5wbGF5KCk7XG4gICAgfSwgZnVuY3Rpb24oZSkge1xuICAgICAgICBjYWxsYmFjayhlKTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBOb3JtYWxpemVzIHRoZSBpbmNvbWluZyBjb25zdHJhaW50cyB0byBzYXRpc2Z5IHRoZSBjdXJyZW50IGJyb3dzZXJcbiAqIEBwYXJhbSBjb25maWdcbiAqIEBwYXJhbSBjYiBDYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbmV2ZXIgY29uc3RyYWludHMgYXJlIGNyZWF0ZWRcbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiBub3JtYWxpemVDb25zdHJhaW50cyhjb25maWcsIGNiKSB7XG4gICAgdmFyIGNvbnN0cmFpbnRzID0ge1xuICAgICAgICAgICAgYXVkaW86IGZhbHNlLFxuICAgICAgICAgICAgdmlkZW86IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgdmlkZW9Db25zdHJhaW50cyA9IG1lcmdlKHtcbiAgICAgICAgICAgIHdpZHRoOiA2NDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDQ4MCxcbiAgICAgICAgICAgIG1pbkFzcGVjdFJhdGlvOiAwLFxuICAgICAgICAgICAgbWF4QXNwZWN0UmF0aW86IDEwMCxcbiAgICAgICAgICAgIGZhY2luZzogXCJlbnZpcm9ubWVudFwiXG4gICAgICAgIH0sIGNvbmZpZyk7XG5cbiAgICBpZiAoIHR5cGVvZiBNZWRpYVN0cmVhbVRyYWNrICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgTWVkaWFTdHJlYW1UcmFjay5nZXRTb3VyY2VzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBNZWRpYVN0cmVhbVRyYWNrLmdldFNvdXJjZXMoZnVuY3Rpb24oc291cmNlSW5mb3MpIHtcbiAgICAgICAgICAgIHZhciB2aWRlb1NvdXJjZUlkO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VJbmZvcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHZhciBzb3VyY2VJbmZvID0gc291cmNlSW5mb3NbaV07XG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZUluZm8ua2luZCA9PT0gXCJ2aWRlb1wiICYmIHNvdXJjZUluZm8uZmFjaW5nID09PSB2aWRlb0NvbnN0cmFpbnRzLmZhY2luZykge1xuICAgICAgICAgICAgICAgICAgICB2aWRlb1NvdXJjZUlkID0gc291cmNlSW5mby5pZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdHJhaW50cy52aWRlbyA9IHtcbiAgICAgICAgICAgICAgICBtYW5kYXRvcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgbWluV2lkdGg6IHZpZGVvQ29uc3RyYWludHMud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIG1pbkhlaWdodDogdmlkZW9Db25zdHJhaW50cy5oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIG1pbkFzcGVjdFJhdGlvOiB2aWRlb0NvbnN0cmFpbnRzLm1pbkFzcGVjdFJhdGlvLFxuICAgICAgICAgICAgICAgICAgICBtYXhBc3BlY3RSYXRpbzogdmlkZW9Db25zdHJhaW50cy5tYXhBc3BlY3RSYXRpb1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3B0aW9uYWw6IFt7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUlkOiB2aWRlb1NvdXJjZUlkXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gY2IoY29uc3RyYWludHMpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdHJhaW50cy52aWRlbyA9IHtcbiAgICAgICAgICAgIG1lZGlhU291cmNlOiBcImNhbWVyYVwiLFxuICAgICAgICAgICAgd2lkdGg6IHsgbWluOiB2aWRlb0NvbnN0cmFpbnRzLndpZHRoLCBtYXg6IHZpZGVvQ29uc3RyYWludHMud2lkdGggfSxcbiAgICAgICAgICAgIGhlaWdodDogeyBtaW46IHZpZGVvQ29uc3RyYWludHMuaGVpZ2h0LCBtYXg6IHZpZGVvQ29uc3RyYWludHMuaGVpZ2h0IH0sXG4gICAgICAgICAgICByZXF1aXJlOiBbXCJ3aWR0aFwiLCBcImhlaWdodFwiXVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gY2IoY29uc3RyYWludHMpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXF1ZXN0cyB0aGUgYmFjay1mYWNpbmcgY2FtZXJhIG9mIHRoZSB1c2VyLiBUaGUgY2FsbGJhY2sgaXMgY2FsbGVkXG4gKiB3aGVuZXZlciB0aGUgc3RyZWFtIGlzIHJlYWR5IHRvIGJlIGNvbnN1bWVkLCBvciBpZiBhbiBlcnJvciBvY2N1cmVzLlxuICogQHBhcmFtIHtPYmplY3R9IHZpZGVvXG4gKiBAcGFyYW0ge09iamVjdH0gY2FsbGJhY2tcbiAqL1xuZnVuY3Rpb24gcmVxdWVzdCh2aWRlbywgdmlkZW9Db25zdHJhaW50cywgY2FsbGJhY2spIHtcbiAgICBub3JtYWxpemVDb25zdHJhaW50cyh2aWRlb0NvbnN0cmFpbnRzLCBmdW5jdGlvbihjb25zdHJhaW50cykge1xuICAgICAgICBpbml0Q2FtZXJhKGNvbnN0cmFpbnRzLCB2aWRlbywgY2FsbGJhY2spO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcmVxdWVzdDogZnVuY3Rpb24odmlkZW8sIGNvbnN0cmFpbnRzLCBjYWxsYmFjaykge1xuICAgICAgICByZXF1ZXN0KHZpZGVvLCBjb25zdHJhaW50cywgY2FsbGJhY2spO1xuICAgIH0sXG4gICAgcmVsZWFzZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0cmFja3MgPSBzdHJlYW1SZWYgJiYgc3RyZWFtUmVmLmdldFZpZGVvVHJhY2tzKCk7XG4gICAgICAgIGlmICh0cmFja3MubGVuZ3RoKSB7XG4gICAgICAgICAgICB0cmFja3NbMF0uc3RvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHN0cmVhbVJlZiA9IG51bGw7XG4gICAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NhbWVyYV9hY2Nlc3MuanNcbiAqKi8iLCJpbXBvcnQgSW1hZ2VEZWJ1ZyBmcm9tICcuL2ltYWdlX2RlYnVnJztcblxuZnVuY3Rpb24gY29udGFpbnMoY29kZVJlc3VsdCwgbGlzdCkge1xuICAgIGlmIChsaXN0KSB7XG4gICAgICAgIHJldHVybiBsaXN0LnNvbWUoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhpdGVtKS5ldmVyeShmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1ba2V5XSA9PT0gY29kZVJlc3VsdFtrZXldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHBhc3Nlc0ZpbHRlcihjb2RlUmVzdWx0LCBmaWx0ZXIpIHtcbiAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gZmlsdGVyKGNvZGVSZXN1bHQpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGNyZWF0ZTogZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLFxuICAgICAgICAgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSxcbiAgICAgICAgICAgIHJlc3VsdHMgPSBbXSxcbiAgICAgICAgICAgIGNhcGFjaXR5ID0gY29uZmlnLmNhcGFjaXR5IHx8IDIwLFxuICAgICAgICAgICAgY2FwdHVyZSA9IGNvbmZpZy5jYXB0dXJlID09PSB0cnVlO1xuXG4gICAgICAgIGZ1bmN0aW9uIG1hdGNoZXNDb25zdHJhaW50cyhjb2RlUmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gY2FwYWNpdHlcbiAgICAgICAgICAgICAgICAmJiBjb2RlUmVzdWx0XG4gICAgICAgICAgICAgICAgJiYgIWNvbnRhaW5zKGNvZGVSZXN1bHQsIGNvbmZpZy5ibGFja2xpc3QpXG4gICAgICAgICAgICAgICAgJiYgcGFzc2VzRmlsdGVyKGNvZGVSZXN1bHQsIGNvbmZpZy5maWx0ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFkZFJlc3VsdDogZnVuY3Rpb24oZGF0YSwgaW1hZ2VTaXplLCBjb2RlUmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoZXNDb25zdHJhaW50cyhjb2RlUmVzdWx0KSkge1xuICAgICAgICAgICAgICAgICAgICBjYXBhY2l0eS0tO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuY29kZVJlc3VsdCA9IGNvZGVSZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYXB0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggPSBpbWFnZVNpemUueDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBpbWFnZVNpemUueTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd0ltYWdlKGRhdGEsIGltYWdlU2l6ZSwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5mcmFtZSA9IGNhbnZhcy50b0RhdGFVUkwoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0UmVzdWx0czogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3Jlc3VsdF9jb2xsZWN0b3IuanNcbiAqKi8iLCJjb25zdCBHZXRQaXhlbHMgPSByZXF1aXJlKFwiZ2V0LXBpeGVsc1wiKTtcblxudmFyIElucHV0U3RyZWFtID0ge307XG5cbklucHV0U3RyZWFtLmNyZWF0ZUltYWdlU3RyZWFtID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRoYXQgPSB7fTtcbiAgICB2YXIgX2NvbmZpZyA9IG51bGw7XG5cbiAgICB2YXIgd2lkdGggPSAwLFxuICAgICAgICBoZWlnaHQgPSAwLFxuICAgICAgICBmcmFtZUlkeCA9IDAsXG4gICAgICAgIHBhdXNlZCA9IHRydWUsXG4gICAgICAgIGxvYWRlZCA9IGZhbHNlLFxuICAgICAgICBmcmFtZSA9IG51bGwsXG4gICAgICAgIGJhc2VVcmwsXG4gICAgICAgIGVuZGVkID0gZmFsc2UsXG4gICAgICAgIHNpemUsXG4gICAgICAgIGNhbGN1bGF0ZWRXaWR0aCxcbiAgICAgICAgY2FsY3VsYXRlZEhlaWdodCxcbiAgICAgICAgX2V2ZW50TmFtZXMgPSBbJ2NhbnJlY29yZCcsICdlbmRlZCddLFxuICAgICAgICBfZXZlbnRIYW5kbGVycyA9IHt9LFxuICAgICAgICBfdG9wUmlnaHQgPSB7eDogMCwgeTogMH0sXG4gICAgICAgIF9jYW52YXNTaXplID0ge3g6IDAsIHk6IDB9O1xuXG4gICAgZnVuY3Rpb24gbG9hZEltYWdlcygpIHtcbiAgICAgICAgbG9hZGVkID0gZmFsc2U7XG4gICAgICAgIEdldFBpeGVscyhiYXNlVXJsLCBmdW5jdGlvbihlcnIsIHBpeGVscykge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgZXhpdCgxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwaXhlbHMuc2hhcGUpO1xuICAgICAgICAgICAgZnJhbWUgPSBwaXhlbHM7XG4gICAgICAgICAgICB3aWR0aCA9IHBpeGVscy5zaGFwZVswXTtcbiAgICAgICAgICAgIGhlaWdodCA9IHBpeGVscy5zaGFwZVsxXTtcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRXaWR0aCA9IF9jb25maWcuc2l6ZSA/IHdpZHRoL2hlaWdodCA+IDEgPyBfY29uZmlnLnNpemUgOiBNYXRoLmZsb29yKCh3aWR0aC9oZWlnaHQpICogX2NvbmZpZy5zaXplKSA6IHdpZHRoO1xuICAgICAgICAgICAgY2FsY3VsYXRlZEhlaWdodCA9IF9jb25maWcuc2l6ZSA/IHdpZHRoL2hlaWdodCA+IDEgPyBNYXRoLmZsb29yKChoZWlnaHQvd2lkdGgpICogX2NvbmZpZy5zaXplKSA6IF9jb25maWcuc2l6ZSA6IGhlaWdodDtcblxuICAgICAgICAgICAgX2NhbnZhc1NpemUueCA9IGNhbGN1bGF0ZWRXaWR0aDtcbiAgICAgICAgICAgIF9jYW52YXNTaXplLnkgPSBjYWxjdWxhdGVkSGVpZ2h0O1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHB1Ymxpc2hFdmVudChcImNhbnJlY29yZFwiLCBbXSk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHVibGlzaEV2ZW50KGV2ZW50TmFtZSwgYXJncykge1xuICAgICAgICB2YXIgaixcbiAgICAgICAgICAgIGhhbmRsZXJzID0gX2V2ZW50SGFuZGxlcnNbZXZlbnROYW1lXTtcblxuICAgICAgICBpZiAoaGFuZGxlcnMgJiYgaGFuZGxlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBoYW5kbGVycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJzW2pdLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICB0aGF0LnRyaWdnZXIgPSBwdWJsaXNoRXZlbnQ7XG5cbiAgICB0aGF0LmdldFdpZHRoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBjYWxjdWxhdGVkV2lkdGg7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBjYWxjdWxhdGVkSGVpZ2h0O1xuICAgIH07XG5cbiAgICB0aGF0LnNldFdpZHRoID0gZnVuY3Rpb24od2lkdGgpIHtcbiAgICAgICAgY2FsY3VsYXRlZFdpZHRoID0gd2lkdGg7XG4gICAgfTtcblxuICAgIHRoYXQuc2V0SGVpZ2h0ID0gZnVuY3Rpb24oaGVpZ2h0KSB7XG4gICAgICAgIGNhbGN1bGF0ZWRIZWlnaHQgPSBoZWlnaHQ7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UmVhbFdpZHRoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB3aWR0aDtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRSZWFsSGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBoZWlnaHQ7XG4gICAgfTtcblxuICAgIHRoYXQuc2V0SW5wdXRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgX2NvbmZpZyA9IHN0cmVhbTtcbiAgICAgICAgYmFzZVVybCA9IF9jb25maWcuc3JjO1xuICAgICAgICBzaXplID0gMTtcbiAgICAgICAgbG9hZEltYWdlcygpO1xuICAgIH07XG5cbiAgICB0aGF0LmVuZGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBlbmRlZDtcbiAgICB9O1xuXG4gICAgdGhhdC5zZXRBdHRyaWJ1dGUgPSBmdW5jdGlvbigpIHt9O1xuXG4gICAgdGhhdC5nZXRDb25maWcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9jb25maWc7XG4gICAgfTtcblxuICAgIHRoYXQucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcGF1c2VkID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdGhhdC5wbGF5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgIH07XG5cbiAgICB0aGF0LnNldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24odGltZSkge1xuICAgICAgICBmcmFtZUlkeCA9IHRpbWU7XG4gICAgfTtcblxuICAgIHRoYXQuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmKSB7XG4gICAgICAgIGlmIChfZXZlbnROYW1lcy5pbmRleE9mKGV2ZW50KSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGlmICghX2V2ZW50SGFuZGxlcnNbZXZlbnRdKSB7XG4gICAgICAgICAgICAgICAgX2V2ZW50SGFuZGxlcnNbZXZlbnRdID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfZXZlbnRIYW5kbGVyc1tldmVudF0ucHVzaChmKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LnNldFRvcFJpZ2h0ID0gZnVuY3Rpb24odG9wUmlnaHQpIHtcbiAgICAgICAgX3RvcFJpZ2h0LnggPSB0b3BSaWdodC54O1xuICAgICAgICBfdG9wUmlnaHQueSA9IHRvcFJpZ2h0Lnk7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0VG9wUmlnaHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF90b3BSaWdodDtcbiAgICB9O1xuXG4gICAgdGhhdC5zZXRDYW52YXNTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgICBfY2FudmFzU2l6ZS54ID0gc2l6ZS54O1xuICAgICAgICBfY2FudmFzU2l6ZS55ID0gc2l6ZS55O1xuICAgIH07XG5cbiAgICB0aGF0LmdldENhbnZhc1NpemUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9jYW52YXNTaXplO1xuICAgIH07XG5cbiAgICB0aGF0LmdldEZyYW1lID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghbG9hZGVkKXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmcmFtZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0U3RyZWFtO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvaW5wdXRfc3RyZWFtLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ2V0LXBpeGVsc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZ2V0LXBpeGVsc1wiXG4gKiogbW9kdWxlIGlkID0gNjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImNvbnN0IENWVXRpbHMgPSByZXF1aXJlKCcuLi9zcmMvY3ZfdXRpbHMnKSxcbiAgICAgIE5kYXJyYXkgPSByZXF1aXJlKFwibmRhcnJheVwiKSxcbiAgICAgIEludGVycDJEID0gcmVxdWlyZShcIm5kYXJyYXktbGluZWFyLWludGVycG9sYXRlXCIpLmQyO1xuXG52YXIgRnJhbWVHcmFiYmVyID0ge307XG5cbkZyYW1lR3JhYmJlci5jcmVhdGUgPSBmdW5jdGlvbihpbnB1dFN0cmVhbSkge1xuICAgIHZhciBfdGhhdCA9IHt9LFxuICAgICAgICBfc3RyZWFtQ29uZmlnID0gaW5wdXRTdHJlYW0uZ2V0Q29uZmlnKCksXG4gICAgICAgIF92aWRlb19zaXplID0gQ1ZVdGlscy5pbWFnZVJlZihpbnB1dFN0cmVhbS5nZXRSZWFsV2lkdGgoKSwgaW5wdXRTdHJlYW0uZ2V0UmVhbEhlaWdodCgpKSxcbiAgICAgICAgX2NhbnZhc1NpemUgPSBpbnB1dFN0cmVhbS5nZXRDYW52YXNTaXplKCksXG4gICAgICAgIF9zaXplID0gQ1ZVdGlscy5pbWFnZVJlZihpbnB1dFN0cmVhbS5nZXRXaWR0aCgpLCBpbnB1dFN0cmVhbS5nZXRIZWlnaHQoKSksXG4gICAgICAgIF90b3BSaWdodCA9IGlucHV0U3RyZWFtLmdldFRvcFJpZ2h0KCksXG4gICAgICAgIF9kYXRhID0gbmV3IFVpbnQ4QXJyYXkoX3NpemUueCAqIF9zaXplLnkpLFxuICAgICAgICBfZ3JheURhdGEgPSBuZXcgVWludDhBcnJheShfdmlkZW9fc2l6ZS54ICogX3ZpZGVvX3NpemUueSksXG4gICAgICAgIF9jYW52YXNEYXRhID0gbmV3IFVpbnQ4QXJyYXkoX2NhbnZhc1NpemUueCAqIF9jYW52YXNTaXplLnkpLFxuICAgICAgICBfZ3JheUltYWdlQXJyYXkgPSBOZGFycmF5KF9ncmF5RGF0YSwgW192aWRlb19zaXplLnksIF92aWRlb19zaXplLnhdKS50cmFuc3Bvc2UoMSwgMCksXG4gICAgICAgIF9jYW52YXNJbWFnZUFycmF5ID0gTmRhcnJheShfY2FudmFzRGF0YSwgW19jYW52YXNTaXplLnksIF9jYW52YXNTaXplLnhdKS50cmFuc3Bvc2UoMSwgMCksXG4gICAgICAgIF90YXJnZXRJbWFnZUFycmF5ID0gX2NhbnZhc0ltYWdlQXJyYXkuaGkoX3RvcFJpZ2h0LnggKyBfc2l6ZS54LCBfdG9wUmlnaHQueSArIF9zaXplLnkpLmxvKF90b3BSaWdodC54LCBfdG9wUmlnaHQueSksXG4gICAgICAgIF9zdGVwU2l6ZVggPSBfdmlkZW9fc2l6ZS54L19jYW52YXNTaXplLngsXG4gICAgICAgIF9zdGVwU2l6ZVkgPSBfdmlkZW9fc2l6ZS55L19jYW52YXNTaXplLnk7XG5cbiAgICBjb25zb2xlLmxvZyhcIkZyYW1lR3JhYmJlclwiLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHZpZGVvU2l6ZTogX2dyYXlJbWFnZUFycmF5LnNoYXBlLFxuICAgICAgICBjYW52YXNTaXplOiBfY2FudmFzSW1hZ2VBcnJheS5zaGFwZSxcbiAgICAgICAgc3RlcFNpemU6IFtfc3RlcFNpemVYLCBfc3RlcFNpemVZXSxcbiAgICAgICAgc2l6ZTogX3RhcmdldEltYWdlQXJyYXkuc2hhcGUsXG4gICAgICAgIHRvcFJpZ2h0OiBfdG9wUmlnaHRcbiAgICB9KSk7XG5cbiAgICAvKipcbiAgICAgKiBVc2VzIHRoZSBnaXZlbiBhcnJheSBhcyBmcmFtZS1idWZmZXJcbiAgICAgKi9cbiAgICBfdGhhdC5hdHRhY2hEYXRhID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBfZGF0YSA9IGRhdGE7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHVzZWQgZnJhbWUtYnVmZmVyXG4gICAgICovXG4gICAgX3RoYXQuZ2V0RGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX2RhdGE7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZldGNoZXMgYSBmcmFtZSBmcm9tIHRoZSBpbnB1dC1zdHJlYW0gYW5kIHB1dHMgaW50byB0aGUgZnJhbWUtYnVmZmVyLlxuICAgICAqIFRoZSBpbWFnZS1kYXRhIGlzIGNvbnZlcnRlZCB0byBncmF5LXNjYWxlIGFuZCB0aGVuIGhhbGYtc2FtcGxlZCBpZiBjb25maWd1cmVkLlxuICAgICAqL1xuICAgIF90aGF0LmdyYWIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZyYW1lID0gaW5wdXRTdHJlYW0uZ2V0RnJhbWUoKTtcblxuICAgICAgICBpZiAoZnJhbWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhbGVBbmRDcm9wKGZyYW1lKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIF90aGF0LnNjYWxlQW5kQ3JvcCA9IGZ1bmN0aW9uKGZyYW1lKSB7XG4gICAgICAgIHZhciB4LFxuICAgICAgICAgICAgeTtcblxuICAgICAgICAvLyAxLiBjb21wdXRlIGZ1bGwtc2l6ZWQgZ3JheSBpbWFnZVxuICAgICAgICBDVlV0aWxzLmNvbXB1dGVHcmF5KGZyYW1lLmRhdGEsIF9ncmF5RGF0YSk7XG5cbiAgICAgICAgLy8gMi4gaW50ZXJwb2xhdGVcbiAgICAgICAgZm9yICh5ID0gMDsgeSA8IF9jYW52YXNTaXplLnk7IHkrKykge1xuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IF9jYW52YXNTaXplLng7IHgrKykge1xuICAgICAgICAgICAgICAgIF9jYW52YXNJbWFnZUFycmF5LnNldCh4LCB5LCAoSW50ZXJwMkQoX2dyYXlJbWFnZUFycmF5LCB4ICogX3N0ZXBTaXplWCwgeSAqIF9zdGVwU2l6ZVkpKSB8IDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGFyZ2V0SW1hZ2VBcnJheSBtdXN0IGJlIGVxdWFsIHRvIHRhcmdldFNpemVcbiAgICAgICAgaWYgKF90YXJnZXRJbWFnZUFycmF5LnNoYXBlWzBdICE9PSBfc2l6ZS54IHx8XG4gICAgICAgICAgICBfdGFyZ2V0SW1hZ2VBcnJheS5zaGFwZVsxXSAhPT0gX3NpemUueSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hhcGVzIGRvIG5vdCBtYXRjaCFcIik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAzLiBjcm9wXG4gICAgICAgIGZvciAoeSA9IDA7IHkgPCBfc2l6ZS55OyB5KyspIHtcbiAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCBfc2l6ZS54OyB4KyspIHtcbiAgICAgICAgICAgICAgICBfZGF0YVt5ICogX3NpemUueCArIHhdID0gX3RhcmdldEltYWdlQXJyYXkuZ2V0KHgsIHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF90aGF0LmdldFNpemUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9zaXplO1xuICAgIH07XG5cbiAgICByZXR1cm4gX3RoYXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZyYW1lR3JhYmJlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL2ZyYW1lX2dyYWJiZXIuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZGFycmF5XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJuZGFycmF5XCJcbiAqKiBtb2R1bGUgaWQgPSA2NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmRhcnJheS1saW5lYXItaW50ZXJwb2xhdGVcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIm5kYXJyYXktbGluZWFyLWludGVycG9sYXRlXCJcbiAqKiBtb2R1bGUgaWQgPSA2N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==