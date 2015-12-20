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
	    tracking: false,
	    debug: false,
	    controls: false,
	    locate: true,
	    numOfWorkers: 4,
	    visual: {
	        show: true
	    },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWE5NjljMWM0ZjdkYTU3ZmY1ODMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3F1YWdnYS5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvdHlwZWRlZnMuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2ltYWdlX3dyYXBwZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3N1YkltYWdlLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jdl91dGlscy5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvY2x1c3Rlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJnbC1tYXRyaXhcIiIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvYXJyYXlfaGVscGVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9iYXJjb2RlX2xvY2F0b3IuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3Jhc3Rlcml6ZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3RyYWNlci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvc2tlbGV0b25pemVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9pbWFnZV9kZWJ1Zy5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvYmFyY29kZV9kZWNvZGVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9icmVzZW5oYW0uanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvZGVfMTI4X3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvYmFyY29kZV9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2Vhbl9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvZGVfMzlfcmVhZGVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jb2RlXzM5X3Zpbl9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvZGFiYXJfcmVhZGVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy91cGNfcmVhZGVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9lYW5fOF9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3VwY19lX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvaTJvZjVfcmVhZGVyLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL29iamVjdC9tZXJnZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlTWVyZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYXJyYXlFYWNoLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2Jhc2VNZXJnZURlZXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYXJyYXlDb3B5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvaXNBcmd1bWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNBcnJheUxpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvZ2V0TGVuZ3RoLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2Jhc2VQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9pc0xlbmd0aC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbGFuZy9pc0FycmF5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2dldE5hdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9sYW5nL2lzTmF0aXZlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvaXNGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9sYW5nL2lzT2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvaXNQbGFpbk9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlRm9ySW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZUZvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9jcmVhdGVCYXNlRm9yLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL3RvT2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL29iamVjdC9rZXlzSW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNJbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9sYW5nL2lzVHlwZWRBcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9sYW5nL3RvUGxhaW5PYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZUNvcHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvb2JqZWN0L2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvc2hpbUtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvY3JlYXRlQXNzaWduZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYmluZENhbGxiYWNrLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL3V0aWxpdHkvaWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNJdGVyYXRlZUNhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvZnVuY3Rpb24vcmVzdFBhcmFtLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvY2FtZXJhX2FjY2Vzcy5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvcmVzdWx0X2NvbGxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9saWIvaW5wdXRfc3RyZWFtLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImdldC1waXhlbHNcIiIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9saWIvZnJhbWVfZ3JhYmJlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZGFycmF5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmRhcnJheS1saW5lYXItaW50ZXJwb2xhdGVcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUNDdENxQixDQUFZOzs7Ozs7MENBQ1IsQ0FBaUI7Ozs7NENBQ2YsQ0FBbUI7Ozs7NENBQ25CLEVBQW1COzs7O29DQUMzQixFQUFVOzs7O21DQUNWLEVBQVU7Ozs7MENBQ0osRUFBaUI7Ozs7d0NBQ25CLEVBQWU7Ozs7cUNBQ25CLENBQVc7OzZDQUNGLEVBQW9COzs7O0FBRWhELEtBQU0sS0FBSyxHQUFHLG1CQUFPLENBQUMsRUFB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RyxDQUFDO1NBQUUsSUFBSSxHQUFHLENBQUM7U0FBRSxJQUFJLEdBQUcsQ0FBQztTQUFFLElBQUksR0FBRyxDQUFDO1NBQUUsQ0FBQztTQUFFLENBQUMsQ0FBQzs7O0FBRzFELFNBQUksR0FBRyxLQUFLLENBQUM7QUFDYixRQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQ1IsVUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDMUIsWUFBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QiwwQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUM7QUFDL0IsYUFBSSxJQUFJLEtBQUssQ0FBQztBQUNkLGFBQUksSUFBSSxLQUFLLENBQUM7TUFDakI7O0FBRUQsU0FBSSxHQUFHLENBQUMsQ0FBQztBQUNULFNBQUksR0FBRyxDQUFDLENBQUM7QUFDVCxRQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQ1IsVUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDekIsWUFBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QiwwQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUM7QUFDL0IsYUFBSSxFQUFFLENBQUM7QUFDUCxhQUFJLEVBQUUsQ0FBQztNQUNWOztBQUVELFVBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzFCLGFBQUksR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztBQUNyQixhQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDM0IsYUFBSSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDakIsYUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUM7QUFDdkIsY0FBTSxDQUFDLEdB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QU0sR0FBRyxDQUFDO1NBQUUsQ0FBQztTQUFFLENBQUM7U0FBRSxDQUFDO1NBQUUsQ0FBQztTQUFFLEdBQUc7U0FBRSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzs7QUFHM0YsVUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDM0IsY0FBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDekIsdUJBQVUsQ0FBRyxDQUFDLEdBQUksS0FBSyxHQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsQyx1QkFBVSxDQUFFLENBQUUsTUFBTSxHQUFHLENBQUMsR0FBSSxDQUFDLElBQUksS0FBSyxHQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztVQUNwRDtNQUNKOzs7QUFHRCxVQUFNLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxHQUFHLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDeEMsY0FBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDM0IsdUJBQVUsQ0FBRyxDQUFDLEdBQUksS0FBSyxHQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsQyx1QkFBVSxDQUFHLENBQUMsR0FBSSxLQUFLLElBQUssS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztVQUNuRDtNQUNKOztBQUVELFVBQU0sQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2hELGNBQU0sQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssR0FB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RUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxFQUFFLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1VBQy9HO01BQ0o7OztBQUdELFVBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNsQyxjQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25CLGNBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3JCLGlCQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQ3hCLHFCQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUMxQjtBQUNELGlCQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQ3hCLHFCQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUMxQjtBQUNELGlCQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQ3hCLHFCQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUMxQjtBQUNELGlCQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQ3hCLHFCQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUMxQjtVQUNKO01BQ0o7O0FBRUQsUUFBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzs7QUFFL0QsU0FBSSxPQUFPLENBQUMsY0FBYyxDQUFDLGtCQUFrQixFQUFFO0FBQzNDLGtDQUFXLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztNQUN6Rzs7QUFFRCxVQUFLLEdBQUcsT0FBTyxDQUFDLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVuQyxhQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDM0MsVUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDckIsYUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO01BQ2hEOztBQUVELFNBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUU7QUFDL0Isa0NBQVcsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxFQUFFLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO01BQ3pHOztBQUVELFVBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3JCLGFBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztNQUNyQzs7QUFFRCxZQUFPLEdBQUcsQ0FBQztFQUNkOzs7OztBQUtELFVBQVMsYUFBYSxHQUFHO0FBQ3JCLDJCQUFRLGFBQWEsQ0FBQyxvQkFBb0IsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBQ2pFLHdCQUFtQixDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ2pDLFNBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtBQUNwQiw0QkFBbUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztNQUM5RDtFQUNKOzs7Ozs7QUFNRCxVQUFTLFdBQVcsR0FBRztBQUNuQixTQUFJLENBQUM7U0FDRCxDQUFDO1NBQ0QsQ0FBQztTQUNELENBQUM7U0FDRCxPQUFPO1NBQ1AsWUFBWSxHQUFHLEVBQUU7U0FDakIsVUFBVTtTQUNWLFlBQVk7U0FDWixLQUFLLENBQUM7QUFDVixVQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDaEMsY0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2hDLGNBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoQyxjQUFDLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7OztBQUdoQyx3QkFBVyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O0FBR2xCLDhCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQy9CLHVDQUFZLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0MsdUJBQVUsR0FBRyx3QkFBVyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUN0RSx5QkFBWSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRXZDLGlCQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUU7QUFDcEIsbUNBQWtCLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUN4RixFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7Y0FDckI7OztBQUdELG9CQUFPLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O0FBR3pELHlCQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQzVFO01BQ0o7O0FBRUQsU0FBSSxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7QUFDMUIsY0FBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3ZDLGtCQUFLLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLHNDQUFXLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUM3RSxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7VUFDekM7TUFDSjs7QUFFRCxZQUFPLFlBQVksQ0FBQztFQUN2Qjs7Ozs7OztBQU9ELFVBQVMseUJBQXlCLENBQUMsUUFBUSxFQUFDO0FBQ3hDLFNBQUksQ0FBQztTQUNELEdBQUc7U0FDSCxTQUFTLEdBQUcsRUFBRTtTQUNkLFNBQVMsR0FBRyxFQUFFLENBQUM7O0FBRW5CLFVBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzVCLGtCQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQ3JCO0FBQ0QsUUFBRyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ2xDLFlBQU8sR0FBRyxFQUFFLEVBQUU7QUFDVixhQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQy9CLHNCQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1VBQzlDO01BQ0o7O0FBRUQsY0FBUyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBUyxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQ3pDLGdCQUFPO0FBQ0gsZ0JBQUcsRUFBRSxHQUFHO0FBQ1Isa0JBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQztVQUNqQixDQUFDO01BQ0wsQ0FBQyxDQUFDOztBQUVILGNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQzFCLGdCQUFPLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztNQUN4QixDQUFDLENBQUM7OztBQUdILGNBQVMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVMsRUFBRSxFQUFFO0FBQ3RDLGdCQUFPLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO01BQ3RCLENBQUMsQ0FBQzs7QUFFSCxZQUFPLFNBQVMsQ0FBQztFQUNwQjs7Ozs7QUFLRCxVQUFTLFNBQVMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFO0FBQ3BDLFNBQUksQ0FBQztTQUNELENBQUM7U0FDRCxHQUFHO1NBQ0gsT0FBTyxHQUFHLEVBQUU7U0FDWixLQUFLO1NBQ0wsR0FBRztTQUNILEtBQUssR0FBRyxFQUFFO1NBQ1YsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDZixHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztBQUVwQixVQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDcEMsWUFBRyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ2xDLGdCQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNuQixnQkFBTyxHQUFHLEVBQUUsRUFBRTtBQUNWLGlCQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTtBQUNsRCxzQkFBSyxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQyx3QkFBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztjQUN2QjtVQUNKO0FBQ0QsWUFBRyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM5QixhQUFJLEdBQUcsRUFBRTtBQUNMLGtCQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7QUFHaEIsaUJBQUksT0FBTyxDQUFDLHdCQUF3QixFQUFFO0FBQ2xDLHNCQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDbEMsMEJBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkIsd0JBQUcsQ0FBQyxDQUFDLENBQUMsR0FBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBSSxHQUFHLENBQUM7QUFDckQsMkNBQVEsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUMxQiw4Q0FBVyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFDN0UsRUFBQyxLQUFLLEVBQUUsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO2tCQUM1RDtjQUNKO1VBQ0o7TUFDSjtBQUNELFlBQU8sS0FBSyxDQUFDO0VBQ2hCOzs7Ozs7QUFNRCxVQUFTLGNBQWMsQ0FBQyxPQUFPLEVBQUU7QUFDN0IsU0FBSSxRQUFRLEdBQUcsc0JBQVEsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM5QyxTQUFJLFVBQVUsR0FBRyxzQkFBUSxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxVQUFTLENBQUMsRUFBRTtBQUN6RCxnQkFBTyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxDQUFDO01BQy9CLENBQUMsQ0FBQztBQUNILFNBQUksTUFBTSxHQUFHLEVBQUU7U0FBRSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQzdCLFNBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDekIsZUFBTSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDeEMsY0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDcEMsbUJBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1VBQ2hDO01BQ0o7QUFDRCxZQUFPLE1BQU0sQ0FBQztFQUNqQjs7QUFFRCxVQUFTLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3ZCLHdCQUFtQixDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsRUFBRSxzQkFBUSxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0Usa0JBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7O0FBRzVCLFNBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtBQUN0QiwwQkFBaUIsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsc0JBQVEsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQ3ZGO0VBQ0o7Ozs7Ozs7Ozs7QUFVRCxVQUFTLGFBQWEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDNUMsU0FBSSxDQUFDO1NBQ0QsR0FBRztTQUNILGVBQWUsR0FBRyxFQUFFO1NBQ3BCLGVBQWU7U0FDZixLQUFLO1NBQ0wsWUFBWSxHQUFHLEVBQUU7U0FDakIsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOztBQUVyRCxTQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFOztBQUVyQixjQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDbEMsaUJBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxrQkFBa0IsRUFBRTtBQUNyQyxnQ0FBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUNwQztVQUNKOzs7QUFHRCxhQUFJLGVBQWUsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO0FBQzdCLDRCQUFlLEdBQUcsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ2xELGdCQUFHLEdBQUcsQ0FBQyxDQUFDOztBQUVSLGtCQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDMUMsb0JBQUcsSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO2NBQ2pDOzs7O0FBSUQsaUJBQUksZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQ25CLGVBQWUsQ0FBQyxNQUFNLElBQUssZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUksQ0FBQyxJQUMxRCxlQUFlLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3BELG9CQUFHLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQztBQUM5QixzQkFBSyxHQUFHO0FBQ0osMEJBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ2hELHdCQUFHLEVBQUU7QUFDRCwwQkFBQyxFQUFFLENBQUM7QUFDSiwwQkFBQyxFQUFFLENBQUM7c0JBQ1A7QUFDRCx3QkFBRyxFQUFFLENBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFDNUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDdEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQy9DO0FBQ0QsNEJBQU8sRUFBRSxlQUFlO0FBQ3hCLHdCQUFHLEVBQUUsR0FBRztBQUNSLHdCQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2tCQUNsRCxDQUFDO0FBQ0YsNkJBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Y0FDNUI7VUFDSjtNQUNKO0FBQ0QsWUFBTyxZQUFZLENBQUM7RUFDdkI7Ozs7OztBQU1ELFVBQVMsMEJBQTBCLENBQUMsWUFBWSxFQUFFO0FBQzlDLFNBQUksS0FBSyxHQUFHLENBQUM7U0FDVCxTQUFTLEdBQUcsSUFBSTtTQUNoQixPQUFPLEdBQUcsQ0FBQztTQUNYLENBQUM7U0FDRCxLQUFLO1NBQ0wsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDZixHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztBQUVwQixjQUFTLGVBQWUsR0FBRztBQUN2QixhQUFJLENBQUMsQ0FBQztBQUNOLGNBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDL0MsaUJBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDM0Qsd0JBQU8sQ0FBQyxDQUFDO2NBQ1o7VUFDSjtBQUNELGdCQUFPLGVBQWUsQ0FBQyxNQUFNLENBQUM7TUFDakM7O0FBRUQsY0FBUyxLQUFLLENBQUMsVUFBVSxFQUFFO0FBQ3ZCLGFBQUksQ0FBQzthQUNELENBQUM7YUFDRCxZQUFZO2FBQ1osR0FBRzthQUNILEdBQUc7YUFDSCxPQUFPLEdBQUc7QUFDTixjQUFDLEVBQUUsVUFBVSxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QyxjQUFDLEVBQUcsVUFBVSxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFJLENBQUM7VUFDL0M7YUFDRCxVQUFVLENBQUM7O0FBRWYsYUFBSSxVQUFVLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDMUMseUJBQVksR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRWxELDRCQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUN6QyxrQkFBTSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxvQkFBTyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUU7QUFDeEQsa0JBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxHQUFHLG9CQUFPLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hELGtCQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxvQkFBTyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoRCxvQkFBRyxHQUFHLENBQUMsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7OztBQUdyQyxxQkFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUM1QixvQ0FBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQzdDLDhCQUFTO2tCQUNaOztBQUVELHFCQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ2pDLCtCQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbkYseUJBQUksVUFBVSxHQUFHLFNBQVMsRUFBRTtBQUN4Qiw4QkFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3NCQUNkO2tCQUNKO2NBQ0o7VUFDSjtNQUNKOzs7QUFHRCwrQkFBWSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNyQywrQkFBWSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMxQywrQkFBWSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUUvQyxVQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDdkMsY0FBSyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4QiwwQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUM1QyxtQkFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BQ3BDOzs7QUFHRCxlQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7O0FBRXhCLFlBQU8sQ0FBRSxPQUFPLEdBQUcsZUFBZSxFQUFFLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDakUsY0FBSyxFQUFFLENBQUM7QUFDUixjQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7TUFDbEI7OztBQUdELFNBQUksT0FBTyxDQUFDLGVBQWUsRUFBRTtBQUN6QixjQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQy9DLGlCQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFO0FBQ2pFLHNCQUFLLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLG9CQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUksR0FBRyxDQUFDO0FBQ3ZELHVDQUFRLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDMUIsMENBQVcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQzdFLEVBQUMsS0FBSyxFQUFFLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztjQUM1RDtVQUNKO01BQ0o7O0FBRUQsWUFBTyxLQUFLLENBQUM7RUFDaEI7O3NCQUVjO0FBQ1gsU0FBSSxFQUFFLGNBQVMsaUJBQWlCLEVBQUUsTUFBTSxFQUFFO0FBQ3RDLGdCQUFPLEdBQUcsTUFBTSxDQUFDO0FBQ2pCLDJCQUFrQixHQUFHLGlCQUFpQixDQUFDOztBQUV2QyxvQkFBVyxFQUFFLENBQUM7QUFDZCxtQkFBVSxFQUFFLENBQUM7TUFDaEI7O0FBRUQsV0FBTSxFQUFFLGtCQUFXO0FBQ2YsYUFBSSxZQUFZLEVBQ1osU0FBUyxFQUNULEtBQUssQ0FBQzs7QUFFVixhQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUU7QUFDcEIsbUNBQVEsVUFBVSxDQUFDLGtCQUFrQixFQUFFLG9CQUFvQixDQUFDLENBQUM7VUFDaEU7O0FBRUQsc0JBQWEsRUFBRSxDQUFDO0FBQ2hCLHFCQUFZLEdBQUcsV0FBVyxFQUFFLENBQUM7O0FBRTdCLGFBQUksWUFBWSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQzVELG9CQUFPLElBQUksQ0FBQztVQUNmOzs7QUFHRCxhQUFJLFFBQVEsR0FBRywwQkFBMEIsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN4RCxhQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUU7QUFDZCxvQkFBTyxJQUFJLENBQUM7VUFDZjs7O0FBR0Qsa0JBQVMsR0FBRyx5QkFBeUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoRCxhQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ3hCLG9CQUFPLElBQUksQ0FBQztVQUNmOztBQUVELGNBQUssR0FBRyxTQUFTLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZDLGdCQUFPLEtBQUssQ0FBQztNQUNoQjs7QUFFRCwwQkFBcUIsRUFBRSwrQkFBUyxXQUFXLEVBQUUsTUFBTSxFQUFFO0FBQ2pELGFBQUksU0FBUzthQUNULEtBQUssR0FBRyxXQUFXLENBQUMsUUFBUSxFQUFFO2FBQzlCLE1BQU0sR0FBRyxXQUFXLENBQUMsU0FBUyxFQUFFO2FBQ2hDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxDQUFDO2FBQ3hDLElBQUk7YUFDSixJQUFJLENBQUM7OztBQUdULGFBQUksV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksRUFBRTtBQUM5QixpQkFBSSxHQUFHLHNCQUFRLGdCQUFnQixDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdFLHdCQUFXLENBQUMsV0FBVyxDQUFDLEVBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDO0FBQ2xELHdCQUFXLENBQUMsYUFBYSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztBQUNqRCxrQkFBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7QUFDaEIsbUJBQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1VBQ3BCOztBQUVELGFBQUksR0FBRztBQUNILGNBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7QUFDakMsY0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztVQUNyQyxDQUFDOztBQUVGLGtCQUFTLEdBQUcsc0JBQVEsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMvRCxnQkFBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOztBQUV4RCxvQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BHLG9CQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRXJHLGFBQUssV0FBVyxDQUFDLFFBQVEsRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDLEtBQU0sQ0FBQyxJQUFLLFdBQVcsQ0FBQyxTQUFTLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQyxLQUFNLENBQUMsRUFBRTtBQUMvRixvQkFBTyxJQUFJLENBQUM7VUFDZjs7QUFFRCxlQUFNLElBQUksS0FBSyxDQUFDLG1FQUFtRSxHQUMvRSxLQUFLLEdBQUcsZ0JBQWdCLEdBQUcsTUFBTSxHQUNqQyx1QkFBdUIsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDOUM7RUFDSjs7Ozs7Ozs7Ozs7Ozs7OzttQ0Mza0JrQixFQUFVOzs7Ozs7O0FBSzdCLEtBQUksVUFBVSxHQUFHO0FBQ2Isb0JBQWUsRUFBRSwyQkFBVztBQUN4QixnQkFBTztBQUNILGdCQUFHLEVBQUUsSUFBSTtBQUNULGtCQUFLLEVBQUUsSUFBSTtBQUNYLHdCQUFXLEVBQUUsSUFBSTtBQUNqQiwyQkFBYyxFQUFFLElBQUk7QUFDcEIscUJBQVEsRUFBRSxJQUFJO0FBQ2QscUJBQVEsRUFBRSxJQUFJO1VBQ2pCLENBQUM7TUFDTDtBQUNELGdCQUFXLEVBQUU7QUFDVCxlQUFNLEVBQUUsQ0FBQztBQUNULGdCQUFPLEVBQUUsQ0FBQztBQUNWLG9CQUFXLEVBQUUsQ0FBQztNQUNqQjtBQUNELFFBQUcsRUFBRTtBQUNELHFCQUFZLEVBQUUsQ0FBQyxLQUFLO0FBQ3BCLG9CQUFXLEVBQUUsQ0FBQyxLQUFLO01BQ3RCO0FBQ0QsV0FBTSxFQUFFLGdCQUFTLFlBQVksRUFBRSxZQUFZLEVBQUU7QUFDekMsYUFBSSxTQUFTLEdBQUcsWUFBWSxDQUFDLElBQUk7YUFDN0IsU0FBUyxHQUFHLFlBQVksQ0FBQyxJQUFJO2FBQzdCLEtBQUssR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDM0IsTUFBTSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM1QixNQUFNLEdBQUcsb0JBQU8sTUFBTSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQzs7QUFFdkQsZ0JBQU87QUFDSCxzQkFBUyxFQUFFLG1CQUFTLFVBQVUsRUFBRTtBQUM1QixxQkFBSSxLQUFLO3FCQUNMLEVBQUU7cUJBQ0YsRUFBRTtxQkFDRixVQUFVO3FCQUNWLEVBQUU7cUJBQ0YsRUFBRTtxQkFDRixRQUFRLEdBQUcsRUFBRTtxQkFDYixNQUFNO3FCQUNOLENBQUM7cUJBQ0QsRUFBRTtxQkFDRixFQUFFO3FCQUNGLEdBQUc7cUJBQ0gsY0FBYyxHQUFHLENBQUM7cUJBQ2xCLENBQUMsQ0FBQzs7QUFFTixzQkFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDdkIsNkJBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7a0JBQ25COztBQUVELHlCQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNCLG1CQUFFLEdBQUcsSUFBSSxDQUFDO0FBQ1Ysc0JBQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtBQUNqQywrQkFBVSxHQUFHLENBQUMsQ0FBQztBQUNmLHVCQUFFLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pCLDBCQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEtBQUssR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFDaEMsNEJBQUcsR0FBRyxFQUFFLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUN0Qiw2QkFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3RCLGtDQUFLLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLGlDQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7QUFDZCxxQ0FBSSxVQUFVLEtBQUssQ0FBQyxFQUFFO0FBQ2xCLHVDQUFFLEdBQUcsY0FBYyxHQUFHLENBQUMsQ0FBQztBQUN4Qiw2Q0FBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUNyQix1Q0FBRSxHQUFHLEtBQUssQ0FBQztBQUNYLDJDQUFNLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMvRSx5Q0FBSSxNQUFNLEtBQUssSUFBSSxFQUFFO0FBQ2pCLHVEQUFjLEVBQUUsQ0FBQztBQUNqQixtREFBVSxHQUFHLEVBQUUsQ0FBQztBQUNoQiwwQ0FBQyxHQUFHLFVBQVUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztBQUNqQywwQ0FBQyxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztBQUN0QywwQ0FBQyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7QUFDckIsMENBQUMsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO0FBQ3ZCLDBDQUFDLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNoQiwwQ0FBQyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7QUFDeEIsNkNBQUksRUFBRSxLQUFLLElBQUksRUFBRTtBQUNiLCtDQUFFLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQzswQ0FDbkI7QUFDRCwyQ0FBRSxHQUFHLENBQUMsQ0FBQztzQ0FDVjtrQ0FDSixNQUFNO0FBQ0gsMkNBQU0sR0FBRyxNQUFNLENBQ1YsY0FBYyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzNFLHlDQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7QUFDakIsMENBQUMsR0FBRyxVQUFVLENBQUMsZUFBZSxFQUFFLENBQUM7QUFDakMsMENBQUMsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO0FBQ3ZCLDBDQUFDLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztBQUN4Qiw2Q0FBSSxVQUFVLEtBQUssQ0FBQyxFQUFFO0FBQ2xCLDhDQUFDLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDOzBDQUMxQyxNQUFNO0FBQ0gsOENBQUMsQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7MENBQ3pDO0FBQ0QsMENBQUMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO0FBQ3JCLDJDQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ1IsZ0RBQVEsRUFBRSxLQUFLLElBQUksSUFBSyxFQUFFLENBQUMsS0FBSyxLQUFLLFVBQVUsRUFBRTtBQUM3QywrQ0FBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7MENBQ3BCO0FBQ0QsNkNBQUksRUFBRSxLQUFLLElBQUksRUFBRTtBQUNiLDhDQUFDLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUM7QUFDL0IsaURBQUksRUFBRSxDQUFDLGNBQWMsS0FBSyxJQUFJLEVBQUU7QUFDNUIsbURBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQzs4Q0FDbEM7QUFDRCwrQ0FBRSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7MENBQ3pCO3NDQUNKO2tDQUNKOzhCQUNKLE1BQU07QUFDSCwwQ0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQzs4QkFDL0I7MEJBQ0osTUFBTSxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxVQUFVLENBQUMsR0FBRyxDQUFDLFlBQVksSUFDOUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFO0FBQ3RELHVDQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsaUNBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFO0FBQy9DLG1DQUFFLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzhCQUN2QixNQUFNO0FBQ0gsbUNBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7OEJBQ3BCOzBCQUNKLE1BQU07QUFDSCx1Q0FBVSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QiwrQkFBRSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQzswQkFDN0I7c0JBQ0o7a0JBQ0o7QUFDRCxtQkFBRSxHQUFHLEVBQUUsQ0FBQztBQUNSLHdCQUFPLEVBQUUsS0FBSyxJQUFJLEVBQUU7QUFDaEIsdUJBQUUsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO0FBQ3RCLHVCQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztrQkFDcEI7QUFDRCx3QkFBTztBQUNILHVCQUFFLEVBQUUsRUFBRTtBQUNOLDBCQUFLLEVBQUUsY0FBYztrQkFDeEIsQ0FBQztjQUNMO0FBQ0Qsa0JBQUssRUFBRTtBQUNILDRCQUFXLEVBQUUscUJBQVMsTUFBTSxFQUFFLFlBQVksRUFBRTtBQUN4Qyx5QkFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7eUJBQzdCLEVBQUUsR0FBRyxZQUFZO3lCQUNqQixFQUFFO3lCQUNGLENBQUM7eUJBQ0QsQ0FBQyxDQUFDOztBQUVOLHdCQUFHLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztBQUN4Qix3QkFBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDdEIsd0JBQUcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDOztBQUVsQix5QkFBSSxFQUFFLEtBQUssSUFBSSxFQUFFO0FBQ2IsMkJBQUUsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDO3NCQUMxQixNQUFNO0FBQ0gsMkJBQUUsR0FBRyxJQUFJLENBQUM7c0JBQ2I7O0FBRUQsNEJBQU8sRUFBRSxLQUFLLElBQUksRUFBRTtBQUNoQiw2QkFBSSxFQUFFLEtBQUssSUFBSSxFQUFFO0FBQ2IsOEJBQUMsR0FBRyxFQUFFLENBQUM7QUFDUCwrQkFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7MEJBQ3BCLE1BQU07QUFDSCw4QkFBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLCtCQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztBQUNqQixpQ0FBSSxFQUFFLEtBQUssSUFBSSxFQUFFO0FBQ2IsbUNBQUUsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDOzhCQUMxQixNQUFNO0FBQ0gsbUNBQUUsR0FBRyxJQUFJLENBQUM7OEJBQ2I7MEJBQ0o7O0FBRUQsaUNBQVEsQ0FBQyxDQUFDLEdBQUc7QUFDYixrQ0FBSyxVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU07QUFDOUIsb0NBQUcsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0FBQ3hCLHVDQUFNO0FBQ1Ysa0NBQUssVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPO0FBQy9CLG9DQUFHLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztBQUN6Qix1Q0FBTTtBQUNWLGtDQUFLLFVBQVUsQ0FBQyxXQUFXLENBQUMsV0FBVztBQUNuQyxvQ0FBRyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7QUFDMUIsdUNBQU07QUFBQSwwQkFDVDs7QUFFRCwwQkFBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUM7QUFDbEIsNEJBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNoQiw0QkFBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQiw0QkFBRztBQUNDLDhCQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNYLGdDQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzBCQUN4QixRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFO0FBQzlCLDRCQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7c0JBQ2hCO2tCQUNKO2NBQ0o7VUFDSixDQUFDO01BQ0w7RUFDSixDQUFDOztzQkFFYSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7QUMvTHpCLEtBQUksTUFBTSxHQUFHO0FBQ1QscUJBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4RixXQUFNLEVBQUUsZ0JBQVMsWUFBWSxFQUFFLFlBQVksRUFBRTtBQUN6QyxhQUFJLFNBQVMsR0FBRyxZQUFZLENBQUMsSUFBSTthQUM3QixTQUFTLEdBQUcsWUFBWSxDQUFDLElBQUk7YUFDN0IsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQjthQUN4QyxLQUFLLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNCLEdBQUcsQ0FBQzs7QUFFUixrQkFBUyxNQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO0FBQzdDLGlCQUFJLENBQUMsRUFDRCxDQUFDLEVBQ0QsQ0FBQyxDQUFDOztBQUVOLGtCQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNyQixrQkFBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xELGtCQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEQsb0JBQUcsR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztBQUNwQixxQkFBSyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxLQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQU0sU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssQ0FBRSxFQUFFO0FBQ3RGLDhCQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQ3ZCLDRCQUFPLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNmLDRCQUFPLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNmLDRCQUFPLElBQUksQ0FBQztrQkFDZixNQUFNO0FBQ0gseUJBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUN0QixrQ0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQztzQkFDOUI7QUFDRCw0QkFBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztrQkFDdkM7Y0FDSjtBQUNELG9CQUFPLEtBQUssQ0FBQztVQUNoQjs7QUFFRCxrQkFBUyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUU7QUFDekIsb0JBQU87QUFDSCxvQkFBRyxFQUFFLEdBQUc7QUFDUixrQkFBQyxFQUFFLENBQUM7QUFDSixrQkFBQyxFQUFFLENBQUM7QUFDSixxQkFBSSxFQUFFLElBQUk7QUFDVixxQkFBSSxFQUFFLElBQUk7Y0FDYixDQUFDO1VBQ0w7O0FBRUQsa0JBQVMsZUFBYyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7QUFDckQsaUJBQUksRUFBRSxHQUFHLElBQUk7aUJBQ1QsRUFBRTtpQkFDRixDQUFDO2lCQUNELElBQUk7aUJBQ0osT0FBTyxHQUFHO0FBQ04sbUJBQUUsRUFBRSxFQUFFO0FBQ04sbUJBQUUsRUFBRSxFQUFFO0FBQ04sb0JBQUcsRUFBRSxDQUFDO2NBQ1QsQ0FBQzs7QUFFTixpQkFBSSxNQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLEVBQUU7QUFDekMsbUJBQUUsR0FBRyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkMsbUJBQUUsR0FBRyxFQUFFLENBQUM7QUFDUixxQkFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDbkIsa0JBQUMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hDLGtCQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNaLG1CQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztBQUNaLGtCQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNkLG1CQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ1Asb0JBQUc7QUFDQyw0QkFBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQywyQkFBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3hDLHlCQUFJLElBQUksS0FBSyxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQ3RCLDJCQUFFLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDckIsMEJBQUMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hDLDBCQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNaLDJCQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztBQUNaLDBCQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNkLDJCQUFFLEdBQUcsQ0FBQyxDQUFDO3NCQUNWLE1BQU07QUFDSCwyQkFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7QUFDZCwyQkFBRSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDO0FBQ2xCLDJCQUFFLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUM7c0JBQ3JCO0FBQ0QseUJBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO2tCQUN0QixRQUFRLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO0FBQ2pELG1CQUFFLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7QUFDbEIsbUJBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztjQUNyQjtBQUNELG9CQUFPLEVBQUUsQ0FBQztVQUNiOztBQUVELGdCQUFPO0FBQ0gsa0JBQUssRUFBRSxlQUFTLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRTtBQUM5Qyx3QkFBTyxNQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7Y0FDbEQ7QUFDRCwyQkFBYyxFQUFFLHdCQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7QUFDdEQsd0JBQU8sZUFBYyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztjQUMxRDtVQUNKLENBQUM7TUFDTDtFQUNKLENBQUM7O3NCQUVjLE1BQU07Ozs7Ozs7Ozs7Ozs7O0FDbEd0QixVQUFTLFlBQVksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMzQyxjQUFTLENBQUM7O0FBRVYsU0FBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztTQUN0QyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDO1NBQ3ZCLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7QUFFNUIsY0FBUyxLQUFLLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUNwQyxtQkFBVSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDNUIsb0JBQVcsR0FBRyxXQUFXLEdBQUcsQ0FBQyxDQUFDOztBQUU5QixhQUFJLENBQUMsR0FBRyxDQUFDO2FBQ0wsQ0FBQyxHQUFHLENBQUM7YUFDTCxHQUFHLEdBQUcsQ0FBQzthQUNQLE9BQU8sR0FBRyxDQUFDO2FBQ1gsT0FBTyxHQUFHLENBQUM7YUFDWCxPQUFPLEdBQUcsQ0FBQzthQUNYLE9BQU8sR0FBRyxDQUFDO2FBQ1gsTUFBTSxHQUFHLENBQUMsQ0FBQzs7QUFFZixjQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFNLElBQUksR0FBRyxDQUFDLEdBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFJLENBQUMsR0FBRyxDQUFDLEdBQUksQ0FBQyxFQUFFO0FBQ3RELG1CQUFNLEdBQUksTUFBTSxHQUFHLElBQUksR0FBSSxDQUFDLENBQUM7QUFDN0Isa0JBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQU0sSUFBSSxHQUFHLENBQUMsR0FBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUksQ0FBQyxHQUFHLENBQUMsR0FBSSxDQUFDLEVBQUU7QUFDdEQsd0JBQU8sR0FBSSxNQUFNLEdBQUcsSUFBSSxHQUFJLENBQUMsQ0FBQztBQUM5Qix3QkFBTyxHQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUksQ0FBQyxDQUFDO0FBQzlCLHdCQUFPLEdBQUksQ0FBQyxHQUFHLENBQUMsR0FBSSxDQUFDLENBQUM7QUFDdEIsd0JBQU8sR0FBSSxDQUFDLEdBQUcsQ0FBQyxHQUFJLENBQUMsQ0FBQztBQUN0QixvQkFBRyxHQUFJLENBQUMsTUFBTSxDQUFFLFVBQVUsR0FBRyxPQUFPLEdBQUcsT0FBTyxHQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FDakQsTUFBTSxDQUFFLFVBQVUsR0FBRyxPQUFPLEdBQUcsT0FBTyxHQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUNqRCxNQUFNLENBQUUsVUFBVSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQzFDLE1BQU0sQ0FBRSxVQUFVLEdBQUcsT0FBTyxHQUFHLE9BQU8sR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFDakQsTUFBTSxDQUFFLFVBQVUsR0FBRyxPQUFPLEdBQUcsT0FBTyxHQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFJLENBQUMsQ0FBQztBQUM5RCxxQkFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQ3RCLDJCQUFNLENBQUUsV0FBVyxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2tCQUM5QyxNQUFNO0FBQ0gsMkJBQU0sQ0FBRSxXQUFXLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7a0JBQzlDO2NBQ0o7VUFDSjtBQUNELGdCQUFPO01BQ1Y7O0FBRUQsY0FBUyxRQUFRLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUU7QUFDakQsa0JBQVMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLGtCQUFTLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQztBQUMxQixvQkFBVyxHQUFHLFdBQVcsR0FBRyxDQUFDLENBQUM7O0FBRTlCLGFBQUksTUFBTSxHQUFHLENBQUMsQ0FBQzs7QUFFZixlQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRTlCLGdCQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDckIsbUJBQU0sR0FBSSxNQUFNLEdBQUcsQ0FBQyxHQUFJLENBQUMsQ0FBQztBQUMxQixtQkFBTSxDQUFFLFdBQVcsR0FBRyxNQUFNLEdBQUksQ0FBQyxDQUFDLEdBQzdCLENBQUMsTUFBTSxDQUFFLFNBQVMsR0FBRyxNQUFNLEdBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLE1BQU0sQ0FBRSxTQUFTLEdBQUcsTUFBTSxHQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFJLENBQUMsQ0FBQztVQUM3RjtNQUNKOztBQUVELGNBQVMsU0FBUyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFO0FBQ2xELGtCQUFTLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQztBQUMxQixrQkFBUyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFDMUIsb0JBQVcsR0FBRyxXQUFXLEdBQUcsQ0FBQyxDQUFDOztBQUU5QixhQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7O0FBRWYsZUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUU5QixnQkFBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3JCLG1CQUFNLEdBQUksTUFBTSxHQUFHLENBQUMsR0FBSSxDQUFDLENBQUM7QUFDMUIsbUJBQU0sQ0FBRSxXQUFXLEdBQUcsTUFBTSxHQUFJLENBQUMsQ0FBQyxHQUM1QixNQUFNLENBQUUsU0FBUyxHQUFHLE1BQU0sR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUssTUFBTSxDQUFFLFNBQVMsR0FBRyxNQUFNLEdBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUksQ0FBQyxDQUFDO1VBQzdGO01BQ0o7O0FBRUQsY0FBUyxZQUFZLENBQUMsUUFBUSxFQUFFO0FBQzVCLGlCQUFRLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQzs7QUFFeEIsYUFBSSxHQUFHLEdBQUcsQ0FBQzthQUNQLE1BQU0sR0FBRyxDQUFDLENBQUM7O0FBRWYsZUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUU5QixnQkFBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3JCLG1CQUFNLEdBQUksTUFBTSxHQUFHLENBQUMsR0FBSSxDQUFDLENBQUM7QUFDMUIsZ0JBQUcsR0FBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssTUFBTSxDQUFFLFFBQVEsR0FBRyxNQUFNLEdBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUksQ0FBQyxDQUFDO1VBQ2pFOztBQUVELGdCQUFRLEdBQUcsR0FBRyxDQUFDLENBQUU7TUFDcEI7O0FBRUQsY0FBUyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRTtBQUMzQixpQkFBUSxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDeEIsY0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7O0FBRWxCLGFBQUksTUFBTSxHQUFHLENBQUMsQ0FBQzs7QUFFZixlQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRTlCLGdCQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDckIsbUJBQU0sR0FBSSxNQUFNLEdBQUcsQ0FBQyxHQUFJLENBQUMsQ0FBQztBQUMxQixtQkFBTSxDQUFFLFFBQVEsR0FBRyxNQUFNLEdBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1VBQzNDO01BQ0o7O0FBRUQsY0FBUyxNQUFNLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUNyQyxtQkFBVSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDNUIsb0JBQVcsR0FBRyxXQUFXLEdBQUcsQ0FBQyxDQUFDOztBQUU5QixhQUFJLENBQUMsR0FBRyxDQUFDO2FBQ0wsQ0FBQyxHQUFHLENBQUM7YUFDTCxHQUFHLEdBQUcsQ0FBQzthQUNQLE9BQU8sR0FBRyxDQUFDO2FBQ1gsT0FBTyxHQUFHLENBQUM7YUFDWCxPQUFPLEdBQUcsQ0FBQzthQUNYLE9BQU8sR0FBRyxDQUFDO2FBQ1gsTUFBTSxHQUFHLENBQUMsQ0FBQzs7QUFFZixjQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFNLElBQUksR0FBRyxDQUFDLEdBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFJLENBQUMsR0FBRyxDQUFDLEdBQUksQ0FBQyxFQUFFO0FBQ3RELG1CQUFNLEdBQUksTUFBTSxHQUFHLElBQUksR0FBSSxDQUFDLENBQUM7QUFDN0Isa0JBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQU0sSUFBSSxHQUFHLENBQUMsR0FBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUksQ0FBQyxHQUFHLENBQUMsR0FBSSxDQUFDLEVBQUU7QUFDdEQsd0JBQU8sR0FBSSxNQUFNLEdBQUcsSUFBSSxHQUFJLENBQUMsQ0FBQztBQUM5Qix3QkFBTyxHQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUksQ0FBQyxDQUFDO0FBQzlCLHdCQUFPLEdBQUksQ0FBQyxHQUFHLENBQUMsR0FBSSxDQUFDLENBQUM7QUFDdEIsd0JBQU8sR0FBSSxDQUFDLEdBQUcsQ0FBQyxHQUFJLENBQUMsQ0FBQztBQUN0QixvQkFBRyxHQUFJLENBQUMsTUFBTSxDQUFFLFVBQVUsR0FBRyxPQUFPLEdBQUcsT0FBTyxHQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FDakQsTUFBTSxDQUFFLFVBQVUsR0FBRyxPQUFPLEdBQUcsT0FBTyxHQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUNqRCxNQUFNLENBQUUsVUFBVSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQzFDLE1BQU0sQ0FBRSxVQUFVLEdBQUcsT0FBTyxHQUFHLE9BQU8sR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFDakQsTUFBTSxDQUFFLFVBQVUsR0FBRyxPQUFPLEdBQUcsT0FBTyxHQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFJLENBQUMsQ0FBQztBQUM5RCxxQkFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQ3JCLDJCQUFNLENBQUUsV0FBVyxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2tCQUM5QyxNQUFNO0FBQ0gsMkJBQU0sQ0FBRSxXQUFXLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7a0JBQzlDO2NBQ0o7VUFDSjtBQUNELGdCQUFPO01BQ1Y7O0FBRUQsY0FBUyxNQUFNLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRTtBQUN0QyxvQkFBVyxHQUFHLFdBQVcsR0FBRyxDQUFDLENBQUM7QUFDOUIsb0JBQVcsR0FBRyxXQUFXLEdBQUcsQ0FBQyxDQUFDOztBQUU5QixhQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7O0FBRWYsZUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUU5QixnQkFBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3JCLG1CQUFNLEdBQUksTUFBTSxHQUFHLENBQUMsR0FBSSxDQUFDLENBQUM7QUFDMUIsbUJBQU0sQ0FBRSxXQUFXLEdBQUcsTUFBTSxHQUFJLENBQUMsQ0FBQyxHQUFJLE1BQU0sQ0FBRSxXQUFXLEdBQUcsTUFBTSxHQUFJLENBQUMsQ0FBQyxHQUFHLENBQUUsQ0FBQztVQUNqRjtNQUNKOztBQUVELGNBQVMsVUFBVSxDQUFDLFFBQVEsRUFBRTtBQUMxQixpQkFBUSxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUM7O0FBRXhCLGFBQUksQ0FBQyxHQUFHLENBQUM7YUFDTCxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVWLGNBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQU0sSUFBSSxHQUFHLENBQUMsR0FBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUksQ0FBQyxHQUFHLENBQUMsR0FBSSxDQUFDLEVBQUU7QUFDdEQsbUJBQU0sQ0FBRSxRQUFRLEdBQUcsQ0FBQyxHQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMvQixtQkFBTSxDQUFFLFFBQVEsR0FBRyxDQUFDLEdBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLGNBQUMsR0FBSyxDQUFDLEdBQUcsSUFBSSxHQUFJLENBQUMsR0FBSSxDQUFDLENBQUM7QUFDekIsbUJBQU0sQ0FBRSxRQUFRLEdBQUcsQ0FBQyxHQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMvQixjQUFDLEdBQUksQ0FBQyxHQUFHLENBQUMsR0FBSSxDQUFDLENBQUM7VUFDbkI7QUFDRCxjQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUksQ0FBQyxHQUFHLENBQUMsR0FBSSxDQUFDLEVBQUU7QUFDaEQsbUJBQU0sQ0FBRSxRQUFRLEdBQUcsQ0FBQyxHQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMvQixjQUFDLEdBQUksQ0FBQyxHQUFHLENBQUMsR0FBSSxDQUFDLENBQUM7VUFDbkI7TUFDSjs7QUFFRCxjQUFTLFdBQVcsR0FBRztBQUNuQixhQUFJLFdBQVcsR0FBRyxDQUFDO2FBQ2YsY0FBYyxHQUFHLENBQUM7YUFDbEIsWUFBWSxHQUFHLENBQUM7YUFDaEIsWUFBWSxHQUFHLENBQUM7YUFDaEIsR0FBRyxHQUFHLENBQUM7YUFDUCxJQUFJLEdBQUcsQ0FBQyxDQUFDOztBQUViLHVCQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEMscUJBQVksR0FBSSxjQUFjLEdBQUcsY0FBYyxHQUFJLENBQUMsQ0FBQztBQUNyRCxxQkFBWSxHQUFJLFlBQVksR0FBRyxjQUFjLEdBQUksQ0FBQyxDQUFDOzs7QUFHbkQsYUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN0QixtQkFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUV4QixZQUFHO0FBQ0Msa0JBQUssQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDbkMsbUJBQU0sQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDckMscUJBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ2xELHNCQUFTLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztBQUNwRCxtQkFBTSxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNwQyxnQkFBRyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDcEMsaUJBQUksR0FBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUUsQ0FBQztVQUMvQixRQUFRLENBQUMsSUFBSSxFQUFFO01BQ25COztBQUVELFlBQU87QUFDSCxvQkFBVyxFQUFFLFdBQVc7TUFDM0IsQ0FBQztFQUNMOztzQkFFYyxZQUFZOzs7Ozs7Ozs7Ozs7Ozs7c0JDOU1aO0FBQ1gsYUFBUSxFQUFFLGtCQUFTLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBQztBQUNyQyxZQUFHLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFDOUIsWUFBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0FBQzVCLFlBQUcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCLFlBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNoQixZQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUNoRDtBQUNELGFBQVEsRUFBRSxrQkFBUyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFDdEMsWUFBRyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0FBQzlCLFlBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztBQUM1QixZQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7QUFDaEMsWUFBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ2hCLFlBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0MsY0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDbEMsZ0JBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7VUFDOUM7QUFDRCxZQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDaEIsWUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO01BQ2hCO0FBQ0QsY0FBUyxFQUFFLG1CQUFTLFNBQVMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFO0FBQ3RDLGFBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDbkQsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJO2FBQ3RCLFlBQVksR0FBRyxTQUFTLENBQUMsTUFBTTthQUMvQixhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU07YUFDM0IsS0FBSyxDQUFDOztBQUVWLGFBQUksYUFBYSxHQUFHLFlBQVksS0FBSyxDQUFDLEVBQUU7QUFDcEMsb0JBQU8sS0FBSyxDQUFDO1VBQ2hCO0FBQ0QsZ0JBQU8sWUFBWSxFQUFFLEVBQUM7QUFDbEIsa0JBQUssR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDaEMsaUJBQUksQ0FBQyxFQUFFLGFBQWEsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUM1QixpQkFBSSxDQUFDLEVBQUUsYUFBYSxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQzlCLGlCQUFJLENBQUMsRUFBRSxhQUFhLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDOUIsaUJBQUksQ0FBQyxFQUFFLGFBQWEsQ0FBQyxHQUFHLEtBQUssQ0FBQztVQUNqQztBQUNELFlBQUcsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuQyxnQkFBTyxJQUFJLENBQUM7TUFDZjtFQUNKOzs7Ozs7Ozs7Ozs7Ozs7c0NDeENxQixFQUFhOzs7O3dDQUNaLEVBQWU7Ozs7NENBQ1osRUFBbUI7Ozs7dUNBQ3ZCLEVBQWM7Ozs7MkNBQ1gsRUFBa0I7Ozs7K0NBQ2YsRUFBc0I7Ozs7MkNBQ3hCLEVBQWtCOzs7O3VDQUN0QixFQUFjOzs7O3lDQUNiLEVBQWdCOzs7O3lDQUNoQixFQUFnQjs7Ozt5Q0FDZixFQUFnQjs7OztBQUV4QyxLQUFNLE9BQU8sR0FBRztBQUNaLG9CQUFlLDhCQUFlO0FBQzlCLGVBQVUseUJBQVc7QUFDckIsaUJBQVksMkJBQVk7QUFDeEIsbUJBQWMsNkJBQWM7QUFDNUIsdUJBQWtCLGlDQUFpQjtBQUNuQyxtQkFBYyw2QkFBZTtBQUM3QixlQUFVLHlCQUFXO0FBQ3JCLGlCQUFZLDJCQUFZO0FBQ3hCLGlCQUFZLDJCQUFhO0VBQzVCLENBQUM7c0JBQ2E7QUFDWCxXQUFNLEVBQUUsZ0JBQVMsTUFBTSxFQUFFLGlCQUFpQixFQUFFO0FBQ3hDLGFBQUksT0FBTyxHQUFHO0FBQ04sZ0JBQUcsRUFBRTtBQUNELDBCQUFTLEVBQUUsSUFBSTtBQUNmLHdCQUFPLEVBQUUsSUFBSTtBQUNiLHdCQUFPLEVBQUUsSUFBSTtjQUNoQjtBQUNELGdCQUFHLEVBQUU7QUFDRCwwQkFBUyxFQUFFLElBQUk7QUFDZix3QkFBTyxFQUFFLElBQUk7QUFDYix3QkFBTyxFQUFFLElBQUk7Y0FDaEI7VUFDSjthQUNELGVBQWUsR0FBRyxFQUFFLENBQUM7O0FBRXpCLG1CQUFVLEVBQUUsQ0FBQztBQUNiLG9CQUFXLEVBQUUsQ0FBQztBQUNkLG1CQUFVLEVBQUUsQ0FBQzs7QUFFYixrQkFBUyxVQUFVLEdBQUc7QUFDbEIsaUJBQUksT0FBTyxRQUFRLEtBQUssV0FBVyxFQUFFO0FBQ2pDLHFCQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDeEQsd0JBQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNuRSxxQkFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFO0FBQ3hCLDRCQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3pELDRCQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO0FBQzlDLHlCQUFJLE1BQU0sRUFBRTtBQUNSLCtCQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7c0JBQzdDO2tCQUNKO0FBQ0Qsd0JBQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFL0Qsd0JBQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNyRSxxQkFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO0FBQ3RCLDRCQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZELDRCQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDO0FBQ2hELHlCQUFJLE1BQU0sRUFBRTtBQUNSLCtCQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7c0JBQzNDO2tCQUNKO0FBQ0Qsd0JBQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFM0Qsd0JBQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNyRSxxQkFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtBQUNyQiw0QkFBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2tCQUM5RDtjQUNKO1VBQ0o7O0FBRUQsa0JBQVMsV0FBVyxHQUFHO0FBQ25CLG1CQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFTLFlBQVksRUFBRTtBQUMxQyxxQkFBSSxNQUFNO3FCQUNOLGFBQWEsR0FBRyxFQUFFLENBQUM7O0FBRXZCLHFCQUFJLE9BQU8sWUFBWSxLQUFLLFFBQVEsRUFBRTtBQUNsQywyQkFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7QUFDN0Isa0NBQWEsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDO2tCQUN2QyxNQUFNLElBQUksT0FBTyxZQUFZLEtBQUssUUFBUSxFQUFFO0FBQ3pDLDJCQUFNLEdBQUcsWUFBWSxDQUFDO2tCQUN6QjtBQUNELHdCQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ25ELGdDQUFlLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Y0FDNUQsQ0FBQyxDQUFDO0FBQ0gsb0JBQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEdBQUcsZUFBZSxDQUMvQyxHQUFHLENBQUMsVUFBQyxNQUFNO3dCQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBQyxDQUFDO2NBQUEsQ0FBQyxDQUMvRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztVQUNwQjs7QUFFRCxrQkFBUyxVQUFVLEdBQUc7QUFDbEIsaUJBQUksT0FBTyxRQUFRLEtBQUssV0FBVyxFQUFFO0FBQ2pDLHFCQUFJLENBQUM7cUJBQ0QsR0FBRyxHQUFHLENBQUM7QUFDSCx5QkFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUztBQUMzQix5QkFBSSxFQUFFLE1BQU0sQ0FBQyxhQUFhO2tCQUM3QixFQUFFO0FBQ0MseUJBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU87QUFDekIseUJBQUksRUFBRSxNQUFNLENBQUMsV0FBVztrQkFDM0IsQ0FBQyxDQUFDOztBQUVQLHNCQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDN0IseUJBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7QUFDdEIsNEJBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7c0JBQ3ZDLE1BQU07QUFDSCw0QkFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztzQkFDdEM7a0JBQ0o7Y0FDSjtVQUNKOzs7Ozs7O0FBT0Qsa0JBQVMsZUFBZSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO0FBQ3ZDLHNCQUFTLFVBQVUsQ0FBQyxNQUFNLEVBQUU7QUFDeEIscUJBQUksU0FBUyxHQUFHO0FBQ1osc0JBQUMsRUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDM0Isc0JBQUMsRUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7a0JBQzlCLENBQUM7O0FBRUYscUJBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztBQUN6QixxQkFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLHFCQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDekIscUJBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztjQUM1Qjs7O0FBR0QsdUJBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoQixvQkFBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUN4RCxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQzFELG9CQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDMUIsMkJBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2NBQ3BCO0FBQ0Qsb0JBQU8sSUFBSSxDQUFDO1VBQ2Y7O0FBRUQsa0JBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUNsQixvQkFBTyxDQUFDO0FBQ0osa0JBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUMsa0JBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Y0FDN0MsRUFBRTtBQUNDLGtCQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFDLGtCQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2NBQzdDLENBQUMsQ0FBQztVQUNOOztBQUVELGtCQUFTLFNBQVMsQ0FBQyxJQUFJLEVBQUU7QUFDckIsaUJBQUksTUFBTSxHQUFHLElBQUk7aUJBQ2IsQ0FBQztpQkFDRCxXQUFXLEdBQUcsdUJBQVUsY0FBYyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFaEYsaUJBQUksTUFBTSxDQUFDLGFBQWEsRUFBRTtBQUN0QiwwQ0FBVyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0FBQy9GLHdDQUFVLEtBQUssQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2NBQzNFO0FBQ0Qsb0NBQVUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3BDLGlCQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUU7QUFDcEIsd0NBQVUsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Y0FDdkU7O0FBRUQsa0JBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzdELHVCQUFNLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Y0FDL0Q7QUFDRCxpQkFBSSxNQUFNLEtBQUssSUFBSSxFQUFDO0FBQ2hCLHdCQUFPLElBQUksQ0FBQztjQUNmO0FBQ0Qsb0JBQU87QUFDSCwyQkFBVSxFQUFFLE1BQU07QUFDbEIsNEJBQVcsRUFBRSxXQUFXO2NBQzNCLENBQUM7VUFDTDs7Ozs7Ozs7O0FBU0Qsa0JBQVMsbUJBQW1CLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7QUFDL0MsaUJBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRyxDQUFDLENBQUMsQ0FBQztpQkFDakcsQ0FBQztpQkFDRCxNQUFNLEdBQUcsRUFBRTtpQkFDWCxNQUFNLEdBQUcsSUFBSTtpQkFDYixHQUFHO2lCQUNILFNBQVM7aUJBQ1QsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO2lCQUMxQixJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFL0Isa0JBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O0FBRTdDLG9CQUFHLEdBQUcsVUFBVSxHQUFHLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDdkQsMEJBQVMsR0FBRztBQUNSLHNCQUFDLEVBQUUsR0FBRyxHQUFHLElBQUk7QUFDYixzQkFBQyxFQUFFLEdBQUcsR0FBRyxJQUFJO2tCQUNoQixDQUFDO0FBQ0YscUJBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztBQUN6QixxQkFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLHFCQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDekIscUJBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQzs7QUFFekIsdUJBQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Y0FDNUI7QUFDRCxvQkFBTyxNQUFNLENBQUM7VUFDakI7O0FBRUQsa0JBQVMsYUFBYSxDQUFDLElBQUksRUFBRTtBQUN6QixvQkFBTyxJQUFJLENBQUMsSUFBSSxDQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7VUFDckQ7Ozs7Ozs7O0FBUUQsa0JBQVMsc0JBQXFCLENBQUMsR0FBRyxFQUFFO0FBQ2hDLGlCQUFJLElBQUk7aUJBQ0osU0FBUztpQkFDVCxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPO2lCQUN6QixNQUFNO2lCQUNOLFVBQVUsQ0FBQzs7QUFFZixpQkFBSSxNQUFNLENBQUMsZUFBZSxJQUFJLEdBQUcsRUFBRTtBQUMvQiwwQ0FBVyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztjQUM5RTs7QUFFRCxpQkFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQix1QkFBVSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQyxzQkFBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JFLGlCQUFJLEdBQUcsZUFBZSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN0RSxpQkFBSSxJQUFJLEtBQUssSUFBSSxFQUFDO0FBQ2Qsd0JBQU8sSUFBSSxDQUFDO2NBQ2Y7O0FBRUQsbUJBQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekIsaUJBQUksTUFBTSxLQUFLLElBQUksRUFBRTtBQUNqQix1QkFBTSxHQUFHLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7Y0FDdEQ7O0FBRUQsaUJBQUksTUFBTSxLQUFLLElBQUksRUFBRTtBQUNqQix3QkFBTyxJQUFJLENBQUM7Y0FDZjs7QUFFRCxpQkFBSSxNQUFNLElBQUksTUFBTSxDQUFDLFlBQVksSUFBSSxHQUFHLEVBQUU7QUFDdEMsMENBQVcsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBQyxFQUFFLEdBQUcsRUFBRSxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7Y0FDbEY7O0FBRUQsb0JBQU87QUFDSCwyQkFBVSxFQUFFLE1BQU0sQ0FBQyxVQUFVO0FBQzdCLHFCQUFJLEVBQUUsSUFBSTtBQUNWLHNCQUFLLEVBQUUsU0FBUztBQUNoQix3QkFBTyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSTtBQUNoQywwQkFBUyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUztjQUMxQyxDQUFDO1VBQ0w7O0FBRUQsZ0JBQU87QUFDSCxrQ0FBcUIsRUFBRSwrQkFBUyxHQUFHLEVBQUU7QUFDakMsd0JBQU8sc0JBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7Y0FDckM7QUFDRCxvQ0FBdUIsRUFBRSxpQ0FBUyxLQUFLLEVBQUU7QUFDckMscUJBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQztBQUNkLHNCQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDaEMsMkJBQU0sR0FBRyxzQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6Qyx5QkFBSSxNQUFNLElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRTtBQUM3QiwrQkFBTSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEIsZ0NBQU8sTUFBTSxDQUFDO3NCQUNqQjtrQkFDSjtjQUNKO0FBQ0QsdUJBQVUsRUFBRSxvQkFBUyxPQUFPLEVBQUU7QUFDMUIsdUJBQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3pCLGdDQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUMzQiw0QkFBVyxFQUFFLENBQUM7Y0FDakI7VUFDSixDQUFDO01BQ0w7RUFDSjs7Ozs7Ozs7Ozs7Ozs7O3FDQzdSbUIsQ0FBWTs7OzswQ0FDUCxDQUFpQjs7OztBQUUxQyxLQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7O0FBRW5CLEtBQUksS0FBSyxHQUFHO0FBQ1IsUUFBRyxFQUFFO0FBQ0QsV0FBRSxFQUFFLENBQUM7QUFDTCxhQUFJLEVBQUUsQ0FBQyxDQUFDO01BQ1g7RUFDSixDQUFDOzs7Ozs7Ozs7O0FBVUYsVUFBUyxDQUFDLGNBQWMsR0FBRyxVQUFTLFlBQVksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0FBQ3RELFNBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztTQUNiLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FDYixFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDO1NBQ2IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztTQUNiLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FDN0MsTUFBTTtTQUNOLE1BQU07U0FDTixLQUFLO1NBQ0wsS0FBSztTQUNMLENBQUM7U0FDRCxHQUFHO1NBQ0gsQ0FBQztTQUNELElBQUksR0FBRyxFQUFFO1NBQ1QsU0FBUyxHQUFHLFlBQVksQ0FBQyxJQUFJO1NBQzdCLEtBQUssR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0IsR0FBRyxHQUFHLENBQUM7U0FDUCxHQUFHO1NBQ0gsR0FBRyxHQUFHLEdBQUc7U0FDVCxHQUFHLEdBQUcsQ0FBQyxDQUFDOztBQUVaLGNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDaEIsWUFBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQy9CLFlBQUcsSUFBSSxHQUFHLENBQUM7QUFDWCxZQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQzVCLFlBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDNUIsYUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztNQUNsQjs7QUFFRCxTQUFJLEtBQUssRUFBRTtBQUNQLFlBQUcsR0FBRyxFQUFFLENBQUM7QUFDVCxXQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ1IsV0FBRSxHQUFHLEdBQUcsQ0FBQzs7QUFFVCxZQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ1QsV0FBRSxHQUFHLEVBQUUsQ0FBQztBQUNSLFdBQUUsR0FBRyxHQUFHLENBQUM7TUFDWjtBQUNELFNBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtBQUNULFlBQUcsR0FBRyxFQUFFLENBQUM7QUFDVCxXQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ1IsV0FBRSxHQUFHLEdBQUcsQ0FBQzs7QUFFVCxZQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ1QsV0FBRSxHQUFHLEVBQUUsQ0FBQztBQUNSLFdBQUUsR0FBRyxHQUFHLENBQUM7TUFDWjtBQUNELFdBQU0sR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLFdBQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUMzQixVQUFLLEdBQUksTUFBTSxHQUFHLENBQUMsR0FBSSxDQUFDLENBQUM7QUFDekIsTUFBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFVBQUssR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6QixVQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN2QixhQUFJLEtBQUssRUFBQztBQUNOLGlCQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1VBQ2QsTUFBTTtBQUNILGlCQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1VBQ2Q7QUFDRCxjQUFLLEdBQUcsS0FBSyxHQUFHLE1BQU0sQ0FBQztBQUN2QixhQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7QUFDWCxjQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUNkLGtCQUFLLEdBQUcsS0FBSyxHQUFHLE1BQU0sQ0FBQztVQUMxQjtNQUNKOztBQUVELFlBQU87QUFDSCxhQUFJLEVBQUUsSUFBSTtBQUNWLFlBQUcsRUFBRSxHQUFHO0FBQ1IsWUFBRyxFQUFFLEdBQUc7TUFDWCxDQUFDO0VBQ0wsQ0FBQzs7QUFFRixVQUFTLENBQUMsZ0JBQWdCLEdBQUcsVUFBUyxNQUFNLEVBQUU7QUFDMUMsU0FBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUk7U0FDbEIsS0FBSyxHQUFHLCtCQUFpQixFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQUUsSUFBSSxDQUFDO1NBQzFELFNBQVMsR0FBRyxzQkFBUSxzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRXpELFNBQUksR0FBRyxzQkFBUSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakMsMkJBQVEsY0FBYyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQzs7QUFFekMsWUFBTztBQUNILGFBQUksRUFBRSxJQUFJO0FBQ1Ysa0JBQVMsRUFBRSxTQUFTO01BQ3ZCLENBQUM7RUFDTCxDQUFDOzs7Ozs7O0FBT0YsVUFBUyxDQUFDLFlBQVksR0FBRyxVQUFTLE1BQU0sRUFBRTtBQUN0QyxTQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRztTQUNoQixHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUc7U0FDaEIsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJO1NBQ2xCLEtBQUs7U0FDTCxNQUFNO1NBQ04sTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztTQUM5QixPQUFPLEdBQUcsRUFBRTtTQUNaLFVBQVU7U0FDVixHQUFHO1NBQ0gsU0FBUyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxFQUFFO1NBQzVCLFVBQVUsR0FBRyxDQUFDLFNBQVM7U0FDdkIsQ0FBQztTQUNELENBQUMsQ0FBQzs7O0FBR04sZUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDOUQsWUFBTyxDQUFDLElBQUksQ0FBQztBQUNULFlBQUcsRUFBRSxDQUFDO0FBQ04sWUFBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7TUFDZixDQUFDLENBQUM7QUFDSCxVQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ25DLGNBQUssR0FBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUUsQ0FBQztBQUNoQyxlQUFNLEdBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBRSxDQUFDO0FBQ3JDLGFBQUssS0FBSyxHQUFHLE1BQU0sR0FBSSxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBSSxNQUFNLEdBQUcsR0FBSSxFQUFFO0FBQy9ELGdCQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7VUFDeEIsTUFBTSxJQUFLLEtBQUssR0FBRyxNQUFNLEdBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUksTUFBTSxHQUFHLEdBQUksRUFBRTtBQUNyRSxnQkFBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1VBQ3RCLE1BQU07QUFDSCxnQkFBRyxHQUFHLFVBQVUsQ0FBQztVQUNwQjs7QUFFRCxhQUFJLFVBQVUsS0FBSyxHQUFHLEVBQUU7QUFDcEIsb0JBQU8sQ0FBQyxJQUFJLENBQUM7QUFDVCxvQkFBRyxFQUFFLENBQUM7QUFDTixvQkFBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7Y0FDZixDQUFDLENBQUM7QUFDSCx1QkFBVSxHQUFHLEdBQUcsQ0FBQztVQUNwQjtNQUNKO0FBQ0QsWUFBTyxDQUFDLElBQUksQ0FBQztBQUNULFlBQUcsRUFBRSxJQUFJLENBQUMsTUFBTTtBQUNoQixZQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO01BQzdCLENBQUMsQ0FBQzs7QUFFSCxVQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQy9DLGFBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7TUFDdEM7OztBQUdELFVBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDdEMsYUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0FBQ3JDLHNCQUFTLEdBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFJLENBQUMsR0FBSSxDQUFDLENBQUM7VUFDdEYsTUFBTTtBQUNILHNCQUFTLEdBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUUsR0FBSSxDQUFDLENBQUM7VUFDdEY7O0FBRUQsY0FBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDbkQsaUJBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7VUFDekM7TUFDSjs7QUFFRCxZQUFPO0FBQ0gsYUFBSSxFQUFFLElBQUk7QUFDVixrQkFBUyxFQUFFLFNBQVM7TUFDdkIsQ0FBQztFQUNMLENBQUM7Ozs7O0FBS0YsVUFBUyxDQUFDLEtBQUssR0FBRztBQUNkLG1CQUFjLEVBQUUsd0JBQVMsSUFBSSxFQUFFLE1BQU0sRUFBRTtBQUNuQyxhQUFJLENBQUM7YUFDRCxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsQyxlQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDM0IsZUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7O0FBRXBCLFlBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNoQixZQUFHLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztBQUN6QixjQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDL0IsZ0JBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ25CLGdCQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7VUFDaEM7QUFDRCxZQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDYixZQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7TUFDbkI7O0FBRUQsaUJBQVksRUFBRSxzQkFBUyxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQ2pDLGFBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2FBQUUsQ0FBQyxDQUFDOztBQUVyQyxlQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDM0IsWUFBRyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7QUFDeEIsY0FBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQy9CLGlCQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDZixvQkFBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztjQUM5QjtVQUNKO01BQ0o7RUFDSixDQUFDOztzQkFFYSxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7MkNDcE5FLEVBQWtCOzs7O0FBRTVDLFVBQVMsYUFBYSxHQUFHO0FBQ3JCLGlDQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUM1Qjs7QUFFRCxLQUFJLFVBQVUsR0FBRztBQUNiLGVBQVUsRUFBRSxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUM7QUFDdkIsV0FBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQztBQUNuQixXQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFDO0FBQ3BCLFdBQU0sRUFBRSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUM7QUFDcEIsaUJBQVksRUFBRSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUM7QUFDMUIsaUJBQVksRUFBRSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUM7QUFDMUIsaUJBQVksRUFBRSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUM7QUFDMUIsY0FBUyxFQUFFLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQztBQUN2QixXQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFDO0FBQ25CLGlCQUFZLEVBQUUsRUFBQyxLQUFLLEVBQUUsQ0FDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FB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RyxDQUFDLENBQUMsRUFBQztBQUNoRixpQkFBWSxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMs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QUUsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFDO0FBQ25CLGtCQUFhLEVBQUUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUM7QUFDNUQsaUJBQVksRUFBRSxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUM7QUFDNUMsaUJBQVksRUFBRSxFQUFDLEtBQUssRUFBRSxDQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDZixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDZixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDZixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDZixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDZixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDZixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDZixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDZixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDZixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDbEIsRUFBQztBQUNG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YixjQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGNBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUMvREE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxFQUFFO0FBQ2IsWUFBVyxPQUFPO0FBQ2xCLGNBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUN2QkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsRUFBRTtBQUNiLGNBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDekVBO0FBQ0E7O0FB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QUFDLGVBQWUsRUFBRSxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBSSxDQUFDLENBQUMsQ0FBQztjQUNoRztVQUNKOzs7QUFHRCxhQUFJLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxJQUN0QyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtBQUN4QyxtQkFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1VBQzNDOzs7QUFHRCxjQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDMUIsa0JBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMxQixzQkFBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Y0FDeEQ7VUFDSjtNQUNKLEVBRUQsS0FBSyxDQUFDLE9BQU8sR0FBRyxZQUFXO0FBQ3ZCLGdCQUFPLEtBQUssQ0FBQztNQUNoQixDQUFDOztBQUVGLFlBQU8sS0FBSyxDQUFDO0VBQ2hCLENBQUM7O0FBRUYsT0FBTSxDQUFDLE9BQU8sR0FBRyxZQUFZLEM7Ozs7OztBQzlGN0IscUM7Ozs7OztBQ0FBLHdEIiwiZmlsZSI6InF1YWdnYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDVhOTY5YzFjNGY3ZGE1N2ZmNTgzXG4gKiovIiwiaW1wb3J0IFR5cGVEZWZzIGZyb20gJy4vdHlwZWRlZnMnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbmltcG9ydCBJbWFnZVdyYXBwZXIgZnJvbSAnLi9pbWFnZV93cmFwcGVyJztcclxuaW1wb3J0IEJhcmNvZGVMb2NhdG9yIGZyb20gJy4vYmFyY29kZV9sb2NhdG9yJztcclxuaW1wb3J0IEJhcmNvZGVEZWNvZGVyIGZyb20gJy4vYmFyY29kZV9kZWNvZGVyJztcclxuaW1wb3J0IENvbmZpZyBmcm9tICcuL2NvbmZpZyc7XHJcbmltcG9ydCBFdmVudHMgZnJvbSAnLi9ldmVudHMnO1xyXG5pbXBvcnQgQ2FtZXJhQWNjZXNzIGZyb20gJy4vY2FtZXJhX2FjY2Vzcyc7XHJcbmltcG9ydCBJbWFnZURlYnVnIGZyb20gJy4vaW1hZ2VfZGVidWcnO1xyXG5pbXBvcnQge3ZlYzJ9IGZyb20gJ2dsLW1hdHJpeCc7XHJcbmltcG9ydCBSZXN1bHRDb2xsZWN0b3IgZnJvbSAnLi9yZXN1bHRfY29sbGVjdG9yJztcclxuXHJcbmNvbnN0IG1lcmdlID0gcmVxdWlyZSgnbG9kYXNoL29iamVjdC9tZXJnZScpO1xyXG5jb25zdCBJbnB1dFN0cmVhbSA9IHJlcXVpcmUoJ2lucHV0X3N0cmVhbScpO1xyXG5jb25zdCBGcmFtZUdyYWJiZXIgPSByZXF1aXJlKCdmcmFtZV9ncmFiYmVyJyk7XHJcblxyXG52YXIgX2lucHV0U3RyZWFtLFxyXG4gICAgX2ZyYW1lZ3JhYmJlcixcclxuICAgIF9zdG9wcGVkLFxyXG4gICAgX2NhbnZhc0NvbnRhaW5lciA9IHtcclxuICAgICAgICBjdHg6IHtcclxuICAgICAgICAgICAgaW1hZ2U6IG51bGwsXHJcbiAgICAgICAgICAgIG92ZXJsYXk6IG51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRvbToge1xyXG4gICAgICAgICAgICBpbWFnZTogbnVsbCxcclxuICAgICAgICAgICAgb3ZlcmxheTogbnVsbFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBfaW5wdXRJbWFnZVdyYXBwZXIsXHJcbiAgICBfYm94U2l6ZSxcclxuICAgIF9kZWNvZGVyLFxyXG4gICAgX3dvcmtlclBvb2wgPSBbXSxcclxuICAgIF9vblVJVGhyZWFkID0gdHJ1ZSxcclxuICAgIF9yZXN1bHRDb2xsZWN0b3IsXHJcbiAgICBfY29uZmlnID0ge307XHJcblxyXG5mdW5jdGlvbiBpbml0aWFsaXplRGF0YShpbWFnZVdyYXBwZXIpIHtcclxuICAgIGluaXRCdWZmZXJzKGltYWdlV3JhcHBlcik7XHJcbiAgICBfZGVjb2RlciA9IEJhcmNvZGVEZWNvZGVyLmNyZWF0ZShfY29uZmlnLmRlY29kZXIsIF9pbnB1dEltYWdlV3JhcHBlcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRJbnB1dFN0cmVhbShjYikge1xyXG4gICAgdmFyIHZpZGVvO1xyXG4gICAgaWYgKF9jb25maWcuaW5wdXRTdHJlYW0udHlwZSA9PT0gXCJWaWRlb1N0cmVhbVwiKSB7XHJcbiAgICAgICAgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidmlkZW9cIik7XHJcbiAgICAgICAgX2lucHV0U3RyZWFtID0gSW5wdXRTdHJlYW0uY3JlYXRlVmlkZW9TdHJlYW0odmlkZW8pO1xyXG4gICAgfSBlbHNlIGlmIChfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09IFwiSW1hZ2VTdHJlYW1cIikge1xyXG4gICAgICAgIF9pbnB1dFN0cmVhbSA9IElucHV0U3RyZWFtLmNyZWF0ZUltYWdlU3RyZWFtKCk7XHJcbiAgICB9IGVsc2UgaWYgKF9jb25maWcuaW5wdXRTdHJlYW0udHlwZSA9PT0gXCJMaXZlU3RyZWFtXCIpIHtcclxuICAgICAgICB2YXIgJHZpZXdwb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnRlcmFjdGl2ZS52aWV3cG9ydFwiKTtcclxuICAgICAgICBpZiAoJHZpZXdwb3J0KSB7XHJcbiAgICAgICAgICAgIHZpZGVvID0gJHZpZXdwb3J0LnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKTtcclxuICAgICAgICAgICAgaWYgKCF2aWRlbykge1xyXG4gICAgICAgICAgICAgICAgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidmlkZW9cIik7XHJcbiAgICAgICAgICAgICAgICAkdmlld3BvcnQuYXBwZW5kQ2hpbGQodmlkZW8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9pbnB1dFN0cmVhbSA9IElucHV0U3RyZWFtLmNyZWF0ZUxpdmVTdHJlYW0odmlkZW8pO1xyXG4gICAgICAgIENhbWVyYUFjY2Vzcy5yZXF1ZXN0KHZpZGVvLCBfY29uZmlnLmlucHV0U3RyZWFtLmNvbnN0cmFpbnRzLCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgaWYgKCFlcnIpIHtcclxuICAgICAgICAgICAgICAgIF9pbnB1dFN0cmVhbS50cmlnZ2VyKFwiY2FucmVjb3JkXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNiKGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfaW5wdXRTdHJlYW0uc2V0QXR0cmlidXRlKFwicHJlbG9hZFwiLCBcImF1dG9cIik7XHJcbiAgICBfaW5wdXRTdHJlYW0uc2V0QXR0cmlidXRlKFwiYXV0b3BsYXlcIiwgdHJ1ZSk7XHJcbiAgICBfaW5wdXRTdHJlYW0uc2V0SW5wdXRTdHJlYW0oX2NvbmZpZy5pbnB1dFN0cmVhbSk7XHJcbiAgICBfaW5wdXRTdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcImNhbnJlY29yZFwiLCBjYW5SZWNvcmQuYmluZCh1bmRlZmluZWQsIGNiKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhblJlY29yZChjYikge1xyXG4gICAgQmFyY29kZUxvY2F0b3IuY2hlY2tJbWFnZUNvbnN0cmFpbnRzKF9pbnB1dFN0cmVhbSwgX2NvbmZpZy5sb2NhdG9yKTtcclxuICAgIGluaXRDYW52YXMoKTtcclxuICAgIF9mcmFtZWdyYWJiZXIgPSBGcmFtZUdyYWJiZXIuY3JlYXRlKF9pbnB1dFN0cmVhbSwgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UpO1xyXG5cclxuICAgIGlmIChfY29uZmlnLm51bU9mV29ya2VycyA+IDApIHtcclxuICAgICAgICBpbml0V29ya2VycyhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXb3JrZXJzIGNyZWF0ZWRcIik7XHJcbiAgICAgICAgICAgIHJlYWR5KGNiKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5pdGlhbGl6ZURhdGEoKTtcclxuICAgICAgICByZWFkeShjYik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWR5KGNiKXtcclxuICAgIF9pbnB1dFN0cmVhbS5wbGF5KCk7XHJcbiAgICBjYigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0Q2FudmFzKCkge1xyXG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIHZhciAkdmlld3BvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ludGVyYWN0aXZlLnZpZXdwb3J0XCIpO1xyXG4gICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhcy5pbWdCdWZmZXJcIik7XHJcbiAgICAgICAgaWYgKCFfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZSkge1xyXG4gICAgICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlLmNsYXNzTmFtZSA9IFwiaW1nQnVmZmVyXCI7XHJcbiAgICAgICAgICAgIGlmICgkdmlld3BvcnQgJiYgX2NvbmZpZy5pbnB1dFN0cmVhbS50eXBlID09PSBcIkltYWdlU3RyZWFtXCIpIHtcclxuICAgICAgICAgICAgICAgICR2aWV3cG9ydC5hcHBlbmRDaGlsZChfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5jdHguaW1hZ2UgPSBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2Uud2lkdGggPSBfaW5wdXRTdHJlYW0uZ2V0Q2FudmFzU2l6ZSgpLng7XHJcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UuaGVpZ2h0ID0gX2lucHV0U3RyZWFtLmdldENhbnZhc1NpemUoKS55O1xyXG5cclxuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhcy5kcmF3aW5nQnVmZmVyXCIpO1xyXG4gICAgICAgIGlmICghX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheSkge1xyXG4gICAgICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheS5jbGFzc05hbWUgPSBcImRyYXdpbmdCdWZmZXJcIjtcclxuICAgICAgICAgICAgaWYgKCR2aWV3cG9ydCkge1xyXG4gICAgICAgICAgICAgICAgJHZpZXdwb3J0LmFwcGVuZENoaWxkKF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBjbGVhckZpeCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKTtcclxuICAgICAgICAgICAgY2xlYXJGaXguc2V0QXR0cmlidXRlKFwiY2xlYXJcIiwgXCJhbGxcIik7XHJcbiAgICAgICAgICAgIGlmICgkdmlld3BvcnQpIHtcclxuICAgICAgICAgICAgICAgICR2aWV3cG9ydC5hcHBlbmRDaGlsZChjbGVhckZpeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5jdHgub3ZlcmxheSA9IF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkud2lkdGggPSBfaW5wdXRTdHJlYW0uZ2V0Q2FudmFzU2l6ZSgpLng7XHJcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheS5oZWlnaHQgPSBfaW5wdXRTdHJlYW0uZ2V0Q2FudmFzU2l6ZSgpLnk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRCdWZmZXJzKGltYWdlV3JhcHBlcikge1xyXG4gICAgaWYgKGltYWdlV3JhcHBlcikge1xyXG4gICAgICAgIF9pbnB1dEltYWdlV3JhcHBlciA9IGltYWdlV3JhcHBlcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX2lucHV0SW1hZ2VXcmFwcGVyID0gbmV3IEltYWdlV3JhcHBlcih7XHJcbiAgICAgICAgICAgIHg6IF9pbnB1dFN0cmVhbS5nZXRXaWR0aCgpLFxyXG4gICAgICAgICAgICB5OiBfaW5wdXRTdHJlYW0uZ2V0SGVpZ2h0KClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZSk7XHJcbiAgICBfYm94U2l6ZSA9IFtcclxuICAgICAgICB2ZWMyLmNsb25lKFswLCAwXSksXHJcbiAgICAgICAgdmVjMi5jbG9uZShbMCwgX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUueV0pLFxyXG4gICAgICAgIHZlYzIuY2xvbmUoW19pbnB1dEltYWdlV3JhcHBlci5zaXplLngsIF9pbnB1dEltYWdlV3JhcHBlci5zaXplLnldKSxcclxuICAgICAgICB2ZWMyLmNsb25lKFtfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS54LCAwXSlcclxuICAgIF07XHJcbiAgICBCYXJjb2RlTG9jYXRvci5pbml0KF9pbnB1dEltYWdlV3JhcHBlciwgX2NvbmZpZy5sb2NhdG9yKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Qm91bmRpbmdCb3hlcygpIHtcclxuICAgIGlmIChfY29uZmlnLmxvY2F0ZSkge1xyXG4gICAgICAgIHJldHVybiBCYXJjb2RlTG9jYXRvci5sb2NhdGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFtbXHJcbiAgICAgICAgICAgIHZlYzIuY2xvbmUoX2JveFNpemVbMF0pLFxyXG4gICAgICAgICAgICB2ZWMyLmNsb25lKF9ib3hTaXplWzFdKSxcclxuICAgICAgICAgICAgdmVjMi5jbG9uZShfYm94U2l6ZVsyXSksXHJcbiAgICAgICAgICAgIHZlYzIuY2xvbmUoX2JveFNpemVbM10pXV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRyYW5zZm9ybVJlc3VsdChyZXN1bHQpIHtcclxuICAgIHZhciB0b3BSaWdodCA9IF9pbnB1dFN0cmVhbS5nZXRUb3BSaWdodCgpLFxyXG4gICAgICAgIHhPZmZzZXQgPSB0b3BSaWdodC54LFxyXG4gICAgICAgIHlPZmZzZXQgPSB0b3BSaWdodC55LFxyXG4gICAgICAgIGk7XHJcblxyXG4gICAgaWYgKCFyZXN1bHQgfHwgKHhPZmZzZXQgPT09IDAgJiYgeU9mZnNldCA9PT0gMCkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmIChyZXN1bHQubGluZSAmJiByZXN1bHQubGluZS5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICBtb3ZlTGluZShyZXN1bHQubGluZSk7XHJcbiAgICB9XHJcbiAgICBpZiAocmVzdWx0LmJveGVzICYmIHJlc3VsdC5ib3hlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHJlc3VsdC5ib3hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBtb3ZlQm94KHJlc3VsdC5ib3hlc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vdmVCb3goYm94KSB7XHJcbiAgICAgICAgdmFyIGNvcm5lciA9IGJveC5sZW5ndGg7XHJcblxyXG4gICAgICAgIHdoaWxlIChjb3JuZXItLSkge1xyXG4gICAgICAgICAgICBib3hbY29ybmVyXVswXSArPSB4T2Zmc2V0O1xyXG4gICAgICAgICAgICBib3hbY29ybmVyXVsxXSArPSB5T2Zmc2V0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb3ZlTGluZShsaW5lKSB7XHJcbiAgICAgICAgbGluZVswXS54ICs9IHhPZmZzZXQ7XHJcbiAgICAgICAgbGluZVswXS55ICs9IHlPZmZzZXQ7XHJcbiAgICAgICAgbGluZVsxXS54ICs9IHhPZmZzZXQ7XHJcbiAgICAgICAgbGluZVsxXS55ICs9IHlPZmZzZXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHB1Ymxpc2hSZXN1bHQocmVzdWx0LCBpbWFnZURhdGEpIHtcclxuICAgIGlmIChfb25VSVRocmVhZCkge1xyXG4gICAgICAgIHRyYW5zZm9ybVJlc3VsdChyZXN1bHQpO1xyXG4gICAgICAgIGlmIChpbWFnZURhdGEgJiYgcmVzdWx0ICYmIHJlc3VsdC5jb2RlUmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlmIChfcmVzdWx0Q29sbGVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBfcmVzdWx0Q29sbGVjdG9yLmFkZFJlc3VsdChpbWFnZURhdGEsIF9pbnB1dFN0cmVhbS5nZXRDYW52YXNTaXplKCksIHJlc3VsdC5jb2RlUmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBFdmVudHMucHVibGlzaChcInByb2Nlc3NlZFwiLCByZXN1bHQpO1xyXG4gICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuY29kZVJlc3VsdCkge1xyXG4gICAgICAgIEV2ZW50cy5wdWJsaXNoKFwiZGV0ZWN0ZWRcIiwgcmVzdWx0KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbG9jYXRlQW5kRGVjb2RlKCkge1xyXG4gICAgdmFyIHJlc3VsdCxcclxuICAgICAgICBib3hlcztcclxuXHJcbiAgICBib3hlcyA9IGdldEJvdW5kaW5nQm94ZXMoKTtcclxuICAgIGlmIChib3hlcykge1xyXG4gICAgICAgIHJlc3VsdCA9IF9kZWNvZGVyLmRlY29kZUZyb21Cb3VuZGluZ0JveGVzKGJveGVzKTtcclxuICAgICAgICByZXN1bHQgPSByZXN1bHQgfHwge307XHJcbiAgICAgICAgcmVzdWx0LmJveGVzID0gYm94ZXM7XHJcbiAgICAgICAgcHVibGlzaFJlc3VsdChyZXN1bHQsIF9pbnB1dEltYWdlV3JhcHBlci5kYXRhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcHVibGlzaFJlc3VsdCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGUoKSB7XHJcbiAgICB2YXIgYXZhaWxhYmxlV29ya2VyO1xyXG5cclxuICAgIGlmIChfb25VSVRocmVhZCkge1xyXG4gICAgICAgIGlmIChfd29ya2VyUG9vbC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGF2YWlsYWJsZVdvcmtlciA9IF93b3JrZXJQb29sLmZpbHRlcihmdW5jdGlvbih3b3JrZXJUaHJlYWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhd29ya2VyVGhyZWFkLmJ1c3k7XHJcbiAgICAgICAgICAgIH0pWzBdO1xyXG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlV29ya2VyKSB7XHJcbiAgICAgICAgICAgICAgICBfZnJhbWVncmFiYmVyLmF0dGFjaERhdGEoYXZhaWxhYmxlV29ya2VyLmltYWdlRGF0YSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIGFsbCB3b3JrZXJzIGFyZSBidXN5XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBfZnJhbWVncmFiYmVyLmF0dGFjaERhdGEoX2lucHV0SW1hZ2VXcmFwcGVyLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoX2ZyYW1lZ3JhYmJlci5ncmFiKCkpIHtcclxuICAgICAgICAgICAgaWYgKGF2YWlsYWJsZVdvcmtlcikge1xyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlV29ya2VyLmJ1c3kgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlV29ya2VyLndvcmtlci5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgY21kOiAncHJvY2VzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VEYXRhOiBhdmFpbGFibGVXb3JrZXIuaW1hZ2VEYXRhXHJcbiAgICAgICAgICAgICAgICB9LCBbYXZhaWxhYmxlV29ya2VyLmltYWdlRGF0YS5idWZmZXJdKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxvY2F0ZUFuZERlY29kZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsb2NhdGVBbmREZWNvZGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnQoKSB7XHJcbiAgICBfc3RvcHBlZCA9IGZhbHNlO1xyXG4gICAgKCBmdW5jdGlvbiBmcmFtZSgpIHtcclxuICAgICAgICBpZiAoIV9zdG9wcGVkKSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAoX29uVUlUaHJlYWQgJiYgX2NvbmZpZy5pbnB1dFN0cmVhbS50eXBlID09PSBcIkxpdmVTdHJlYW1cIikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltRnJhbWUoZnJhbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSgpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFdvcmtlcnMoY2IpIHtcclxuICAgIHZhciBpO1xyXG4gICAgX3dvcmtlclBvb2wgPSBbXTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgX2NvbmZpZy5udW1PZldvcmtlcnM7IGkrKykge1xyXG4gICAgICAgIGluaXRXb3JrZXIod29ya2VySW5pdGlhbGl6ZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHdvcmtlckluaXRpYWxpemVkKHdvcmtlclRocmVhZCkge1xyXG4gICAgICAgIF93b3JrZXJQb29sLnB1c2god29ya2VyVGhyZWFkKTtcclxuICAgICAgICBpZiAoX3dvcmtlclBvb2wubGVuZ3RoID49IF9jb25maWcubnVtT2ZXb3JrZXJzKXtcclxuICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRXb3JrZXIoY2IpIHtcclxuICAgIHZhciBibG9iVVJMLFxyXG4gICAgICAgIHdvcmtlclRocmVhZCA9IHtcclxuICAgICAgICAgICAgd29ya2VyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGltYWdlRGF0YTogbmV3IFVpbnQ4QXJyYXkoX2lucHV0U3RyZWFtLmdldFdpZHRoKCkgKiBfaW5wdXRTdHJlYW0uZ2V0SGVpZ2h0KCkpLFxyXG4gICAgICAgICAgICBidXN5OiB0cnVlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICBibG9iVVJMID0gZ2VuZXJhdGVXb3JrZXJCbG9iKCk7XHJcbiAgICB3b3JrZXJUaHJlYWQud29ya2VyID0gbmV3IFdvcmtlcihibG9iVVJMKTtcclxuXHJcbiAgICB3b3JrZXJUaHJlYWQud29ya2VyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5kYXRhLmV2ZW50ID09PSAnaW5pdGlhbGl6ZWQnKSB7XHJcbiAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoYmxvYlVSTCk7XHJcbiAgICAgICAgICAgIHdvcmtlclRocmVhZC5idXN5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHdvcmtlclRocmVhZC5pbWFnZURhdGEgPSBuZXcgVWludDhBcnJheShlLmRhdGEuaW1hZ2VEYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXb3JrZXIgaW5pdGlhbGl6ZWRcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBjYih3b3JrZXJUaHJlYWQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZS5kYXRhLmV2ZW50ID09PSAncHJvY2Vzc2VkJykge1xyXG4gICAgICAgICAgICB3b3JrZXJUaHJlYWQuaW1hZ2VEYXRhID0gbmV3IFVpbnQ4QXJyYXkoZS5kYXRhLmltYWdlRGF0YSk7XHJcbiAgICAgICAgICAgIHdvcmtlclRocmVhZC5idXN5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHB1Ymxpc2hSZXN1bHQoZS5kYXRhLnJlc3VsdCwgd29ya2VyVGhyZWFkLmltYWdlRGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlLmRhdGEuZXZlbnQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXb3JrZXIgZXJyb3I6IFwiICsgZS5kYXRhLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgd29ya2VyVGhyZWFkLndvcmtlci5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgY21kOiAnaW5pdCcsXHJcbiAgICAgICAgc2l6ZToge3g6IF9pbnB1dFN0cmVhbS5nZXRXaWR0aCgpLCB5OiBfaW5wdXRTdHJlYW0uZ2V0SGVpZ2h0KCl9LFxyXG4gICAgICAgIGltYWdlRGF0YTogd29ya2VyVGhyZWFkLmltYWdlRGF0YSxcclxuICAgICAgICBjb25maWc6IF9jb25maWdcclxuICAgIH0sIFt3b3JrZXJUaHJlYWQuaW1hZ2VEYXRhLmJ1ZmZlcl0pO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gd29ya2VySW50ZXJmYWNlKGZhY3RvcnkpIHtcclxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmKi9cclxuICAgIGlmIChmYWN0b3J5KSB7XHJcbiAgICAgICAgdmFyIFF1YWdnYSA9IGZhY3RvcnkoKTtcclxuICAgICAgICBpZiAoIVF1YWdnYSkge1xyXG4gICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsnZXZlbnQnOiAnZXJyb3InLCBtZXNzYWdlOiAnUXVhZ2dhIGNvdWxkIG5vdCBiZSBjcmVhdGVkJ30pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIGltYWdlV3JhcHBlcjtcclxuXHJcbiAgICBzZWxmLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5kYXRhLmNtZCA9PT0gJ2luaXQnKSB7XHJcbiAgICAgICAgICAgIHZhciBjb25maWcgPSBlLmRhdGEuY29uZmlnO1xyXG4gICAgICAgICAgICBjb25maWcubnVtT2ZXb3JrZXJzID0gMDtcclxuICAgICAgICAgICAgaW1hZ2VXcmFwcGVyID0gbmV3IFF1YWdnYS5JbWFnZVdyYXBwZXIoe1xyXG4gICAgICAgICAgICAgICAgeDogZS5kYXRhLnNpemUueCxcclxuICAgICAgICAgICAgICAgIHk6IGUuZGF0YS5zaXplLnlcclxuICAgICAgICAgICAgfSwgbmV3IFVpbnQ4QXJyYXkoZS5kYXRhLmltYWdlRGF0YSkpO1xyXG4gICAgICAgICAgICBRdWFnZ2EuaW5pdChjb25maWcsIHJlYWR5LCBpbWFnZVdyYXBwZXIpO1xyXG4gICAgICAgICAgICBRdWFnZ2Eub25Qcm9jZXNzZWQob25Qcm9jZXNzZWQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZS5kYXRhLmNtZCA9PT0gJ3Byb2Nlc3MnKSB7XHJcbiAgICAgICAgICAgIGltYWdlV3JhcHBlci5kYXRhID0gbmV3IFVpbnQ4QXJyYXkoZS5kYXRhLmltYWdlRGF0YSk7XHJcbiAgICAgICAgICAgIFF1YWdnYS5zdGFydCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZS5kYXRhLmNtZCA9PT0gJ3NldFJlYWRlcnMnKSB7XHJcbiAgICAgICAgICAgIFF1YWdnYS5zZXRSZWFkZXJzKGUuZGF0YS5yZWFkZXJzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIG9uUHJvY2Vzc2VkKHJlc3VsdCkge1xyXG4gICAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAnZXZlbnQnOiAncHJvY2Vzc2VkJyxcclxuICAgICAgICAgICAgaW1hZ2VEYXRhOiBpbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICAgICAgcmVzdWx0OiByZXN1bHRcclxuICAgICAgICB9LCBbaW1hZ2VXcmFwcGVyLmRhdGEuYnVmZmVyXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVhZHkoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsnZXZlbnQnOiAnaW5pdGlhbGl6ZWQnLCBpbWFnZURhdGE6IGltYWdlV3JhcHBlci5kYXRhfSwgW2ltYWdlV3JhcHBlci5kYXRhLmJ1ZmZlcl0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIGVzbGludC1lbmFibGUgKi9cclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVXb3JrZXJCbG9iKCkge1xyXG4gICAgdmFyIGJsb2IsXHJcbiAgICAgICAgZmFjdG9yeVNvdXJjZTtcclxuXHJcbiAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXHJcbiAgICBpZiAodHlwZW9mIF9fZmFjdG9yeVNvdXJjZV9fICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGZhY3RvcnlTb3VyY2UgPSBfX2ZhY3RvcnlTb3VyY2VfXzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxyXG4gICAgfVxyXG4gICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cclxuXHJcbiAgICBibG9iID0gbmV3IEJsb2IoWycoJyArIHdvcmtlckludGVyZmFjZS50b1N0cmluZygpICsgJykoJyArIGZhY3RvcnlTb3VyY2UgKyAnKTsnXSxcclxuICAgICAgICB7dHlwZTogJ3RleHQvamF2YXNjcmlwdCd9KTtcclxuXHJcbiAgICByZXR1cm4gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFJlYWRlcnMocmVhZGVycykge1xyXG4gICAgaWYgKF9kZWNvZGVyKSB7XHJcbiAgICAgICAgX2RlY29kZXIuc2V0UmVhZGVycyhyZWFkZXJzKTtcclxuICAgIH0gZWxzZSBpZiAoX29uVUlUaHJlYWQgJiYgX3dvcmtlclBvb2wubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIF93b3JrZXJQb29sLmZvckVhY2goZnVuY3Rpb24od29ya2VyVGhyZWFkKSB7XHJcbiAgICAgICAgICAgIHdvcmtlclRocmVhZC53b3JrZXIucG9zdE1lc3NhZ2Uoe2NtZDogJ3NldFJlYWRlcnMnLCByZWFkZXJzOiByZWFkZXJzfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKGNvbmZpZywgY2IsIGltYWdlV3JhcHBlcikge1xyXG4gICAgICAgIF9jb25maWcgPSBtZXJnZSh7fSwgQ29uZmlnLCBjb25maWcpO1xyXG4gICAgICAgIGlmIChpbWFnZVdyYXBwZXIpIHtcclxuICAgICAgICAgICAgX29uVUlUaHJlYWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaW5pdGlhbGl6ZURhdGEoaW1hZ2VXcmFwcGVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNiKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5pdElucHV0U3RyZWFtKGNiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHN0YXJ0KCk7XHJcbiAgICB9LFxyXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgX3N0b3BwZWQgPSB0cnVlO1xyXG4gICAgICAgIF93b3JrZXJQb29sLmZvckVhY2goZnVuY3Rpb24od29ya2VyVGhyZWFkKSB7XHJcbiAgICAgICAgICAgIHdvcmtlclRocmVhZC53b3JrZXIudGVybWluYXRlKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV29ya2VyIHRlcm1pbmF0ZWQhXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIF93b3JrZXJQb29sLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgaWYgKF9jb25maWcuaW5wdXRTdHJlYW0udHlwZSA9PT0gXCJMaXZlU3RyZWFtXCIpIHtcclxuICAgICAgICAgICAgQ2FtZXJhQWNjZXNzLnJlbGVhc2UoKTtcclxuICAgICAgICAgICAgX2lucHV0U3RyZWFtLmNsZWFyRXZlbnRIYW5kbGVycygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwYXVzZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgX3N0b3BwZWQgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIG9uRGV0ZWN0ZWQ6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgRXZlbnRzLnN1YnNjcmliZShcImRldGVjdGVkXCIsIGNhbGxiYWNrKTtcclxuICAgIH0sXHJcbiAgICBvZmZEZXRlY3RlZDogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuICAgICAgICBFdmVudHMudW5zdWJzY3JpYmUoXCJkZXRlY3RlZFwiLCBjYWxsYmFjayk7XHJcbiAgICB9LFxyXG4gICAgb25Qcm9jZXNzZWQ6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgRXZlbnRzLnN1YnNjcmliZShcInByb2Nlc3NlZFwiLCBjYWxsYmFjayk7XHJcbiAgICB9LFxyXG4gICAgb2ZmUHJvY2Vzc2VkOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgIEV2ZW50cy51bnN1YnNjcmliZShcInByb2Nlc3NlZFwiLCBjYWxsYmFjayk7XHJcbiAgICB9LFxyXG4gICAgc2V0UmVhZGVyczogZnVuY3Rpb24ocmVhZGVycykge1xyXG4gICAgICAgIHNldFJlYWRlcnMocmVhZGVycyk7XHJcbiAgICB9LFxyXG4gICAgcmVnaXN0ZXJSZXN1bHRDb2xsZWN0b3I6IGZ1bmN0aW9uKHJlc3VsdENvbGxlY3Rvcikge1xyXG4gICAgICAgIGlmIChyZXN1bHRDb2xsZWN0b3IgJiYgdHlwZW9mIHJlc3VsdENvbGxlY3Rvci5hZGRSZXN1bHQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgX3Jlc3VsdENvbGxlY3RvciA9IHJlc3VsdENvbGxlY3RvcjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2FudmFzOiBfY2FudmFzQ29udGFpbmVyLFxyXG4gICAgZGVjb2RlU2luZ2xlOiBmdW5jdGlvbihjb25maWcsIHJlc3VsdENhbGxiYWNrKSB7XHJcbiAgICAgICAgY29uZmlnID0gbWVyZ2Uoe1xyXG4gICAgICAgICAgICBpbnB1dFN0cmVhbToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJJbWFnZVN0cmVhbVwiLFxyXG4gICAgICAgICAgICAgICAgc2VxdWVuY2U6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogODAwLFxyXG4gICAgICAgICAgICAgICAgc3JjOiBjb25maWcuc3JjXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG51bU9mV29ya2VyczogMSxcclxuICAgICAgICAgICAgbG9jYXRvcjoge1xyXG4gICAgICAgICAgICAgICAgaGFsZlNhbXBsZTogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5pbml0KGNvbmZpZywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIEV2ZW50cy5vbmNlKFwicHJvY2Vzc2VkXCIsIGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgX3N0b3BwZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0Q2FsbGJhY2suY2FsbChudWxsLCByZXN1bHQpO1xyXG4gICAgICAgICAgICB9LCB0cnVlKTtcclxuICAgICAgICAgICAgc3RhcnQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBJbWFnZVdyYXBwZXI6IEltYWdlV3JhcHBlcixcclxuICAgIEltYWdlRGVidWc6IEltYWdlRGVidWcsXHJcbiAgICBSZXN1bHRDb2xsZWN0b3I6IFJlc3VsdENvbGxlY3RvclxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9xdWFnZ2EuanNcbiAqKi8iLCIvKlxyXG4gKiB0eXBlZGVmcy5qc1xyXG4gKiBOb3JtYWxpemVzIGJyb3dzZXItc3BlY2lmaWMgcHJlZml4ZXNcclxuICovXHJcblxyXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICgvKiBmdW5jdGlvbiBGcmFtZVJlcXVlc3RDYWxsYmFjayAqLyBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhIHx8XHJcbiAgICAgICAgbmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhIHx8IG5hdmlnYXRvci5tc0dldFVzZXJNZWRpYTtcclxuICAgIHdpbmRvdy5VUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkwgfHwgd2luZG93Lm1velVSTCB8fCB3aW5kb3cubXNVUkw7XHJcbn1cclxuTWF0aC5pbXVsID0gTWF0aC5pbXVsIHx8IGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgIHZhciBhaCA9IChhID4+PiAxNikgJiAweGZmZmYsXHJcbiAgICAgICAgYWwgPSBhICYgMHhmZmZmLFxyXG4gICAgICAgIGJoID0gKGIgPj4+IDE2KSAmIDB4ZmZmZixcclxuICAgICAgICBibCA9IGIgJiAweGZmZmY7XHJcbiAgICAvLyB0aGUgc2hpZnQgYnkgMCBmaXhlcyB0aGUgc2lnbiBvbiB0aGUgaGlnaCBwYXJ0XHJcbiAgICAvLyB0aGUgZmluYWwgfDAgY29udmVydHMgdGhlIHVuc2lnbmVkIHZhbHVlIGludG8gYSBzaWduZWQgdmFsdWVcclxuICAgIHJldHVybiAoKGFsICogYmwpICsgKCgoYWggKiBibCArIGFsICogYmgpIDw8IDE2KSA+Pj4gMCkgfCAwKTtcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvdHlwZWRlZnMuanNcbiAqKi8iLCJpbXBvcnQgU3ViSW1hZ2UgZnJvbSAnLi9zdWJJbWFnZSc7XHJcbmltcG9ydCBDVlV0aWxzIGZyb20gJy4vY3ZfdXRpbHMnO1xyXG5pbXBvcnQgQXJyYXlIZWxwZXIgZnJvbSAnLi9hcnJheV9oZWxwZXInO1xyXG5pbXBvcnQge3ZlYzJ9IGZyb20gJ2dsLW1hdHJpeCc7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBhIGJhc2ljIGltYWdlIGNvbWJpbmluZyB0aGUgZGF0YSBhbmQgc2l6ZS5cclxuICogSW4gYWRkaXRpb24sIHNvbWUgbWV0aG9kcyBmb3IgbWFuaXB1bGF0aW9uIGFyZSBjb250YWluZWQuXHJcbiAqIEBwYXJhbSBzaXplIHt4LHl9IFRoZSBzaXplIG9mIHRoZSBpbWFnZSBpbiBwaXhlbFxyXG4gKiBAcGFyYW0gZGF0YSB7QXJyYXl9IElmIGdpdmVuLCBhIGZsYXQgYXJyYXkgY29udGFpbmluZyB0aGUgcGl4ZWwgZGF0YVxyXG4gKiBAcGFyYW0gQXJyYXlUeXBlIHtUeXBlfSBJZiBnaXZlbiwgdGhlIGRlc2lyZWQgRGF0YVR5cGUgb2YgdGhlIEFycmF5IChtYXkgYmUgdHlwZWQvbm9uLXR5cGVkKVxyXG4gKiBAcGFyYW0gaW5pdGlhbGl6ZSB7Qm9vbGVhbn0gSW5kaWNhdGluZyBpZiB0aGUgYXJyYXkgc2hvdWxkIGJlIGluaXRpYWxpemVkIG9uIGNyZWF0aW9uLlxyXG4gKiBAcmV0dXJucyB7SW1hZ2VXcmFwcGVyfVxyXG4gKi9cclxuZnVuY3Rpb24gSW1hZ2VXcmFwcGVyKHNpemUsIGRhdGEsIEFycmF5VHlwZSwgaW5pdGlhbGl6ZSkge1xyXG4gICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgaWYgKEFycmF5VHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBuZXcgQXJyYXlUeXBlKHNpemUueCAqIHNpemUueSk7XHJcbiAgICAgICAgICAgIGlmIChBcnJheVR5cGUgPT09IEFycmF5ICYmIGluaXRpYWxpemUpIHtcclxuICAgICAgICAgICAgICAgIEFycmF5SGVscGVyLmluaXQodGhpcy5kYXRhLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IG5ldyBVaW50OEFycmF5KHNpemUueCAqIHNpemUueSk7XHJcbiAgICAgICAgICAgIGlmIChVaW50OEFycmF5ID09PSBBcnJheSAmJiBpbml0aWFsaXplKSB7XHJcbiAgICAgICAgICAgICAgICBBcnJheUhlbHBlci5pbml0KHRoaXMuZGF0YSwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNpemUgPSBzaXplO1xyXG59XHJcblxyXG4vKipcclxuICogdGVzdHMgaWYgYSBwb3NpdGlvbiBpcyB3aXRoaW4gdGhlIGltYWdlIHdpdGggYSBnaXZlbiBvZmZzZXRcclxuICogQHBhcmFtIGltZ1JlZiB7eCwgeX0gVGhlIGxvY2F0aW9uIHRvIHRlc3RcclxuICogQHBhcmFtIGJvcmRlciBOdW1iZXIgdGhlIHBhZGRpbmcgdmFsdWUgaW4gcGl4ZWxcclxuICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgbG9jYXRpb24gaW5zaWRlIHRoZSBpbWFnZSdzIGJvcmRlciwgZmFsc2Ugb3RoZXJ3aXNlXHJcbiAqIEBzZWUgY3ZkL2ltYWdlLmhcclxuICovXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuaW5JbWFnZVdpdGhCb3JkZXIgPSBmdW5jdGlvbihpbWdSZWYsIGJvcmRlcikge1xyXG4gICAgcmV0dXJuIChpbWdSZWYueCA+PSBib3JkZXIpXHJcbiAgICAgICAgJiYgKGltZ1JlZi55ID49IGJvcmRlcilcclxuICAgICAgICAmJiAoaW1nUmVmLnggPCAodGhpcy5zaXplLnggLSBib3JkZXIpKVxyXG4gICAgICAgICYmIChpbWdSZWYueSA8ICh0aGlzLnNpemUueSAtIGJvcmRlcikpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFBlcmZvcm1zIGJpbGluZWFyIHNhbXBsaW5nXHJcbiAqIEBwYXJhbSBpbkltZyBJbWFnZSB0byBleHRyYWN0IHNhbXBsZSBmcm9tXHJcbiAqIEBwYXJhbSB4IHRoZSB4LWNvb3JkaW5hdGVcclxuICogQHBhcmFtIHkgdGhlIHktY29vcmRpbmF0ZVxyXG4gKiBAcmV0dXJucyB0aGUgc2FtcGxlZCB2YWx1ZVxyXG4gKiBAc2VlIGN2ZC92aXNpb24uaFxyXG4gKi9cclxuSW1hZ2VXcmFwcGVyLnNhbXBsZSA9IGZ1bmN0aW9uKGluSW1nLCB4LCB5KSB7XHJcbiAgICB2YXIgbHggPSBNYXRoLmZsb29yKHgpO1xyXG4gICAgdmFyIGx5ID0gTWF0aC5mbG9vcih5KTtcclxuICAgIHZhciB3ID0gaW5JbWcuc2l6ZS54O1xyXG4gICAgdmFyIGJhc2UgPSBseSAqIGluSW1nLnNpemUueCArIGx4O1xyXG4gICAgdmFyIGEgPSBpbkltZy5kYXRhW2Jhc2UgKyAwXTtcclxuICAgIHZhciBiID0gaW5JbWcuZGF0YVtiYXNlICsgMV07XHJcbiAgICB2YXIgYyA9IGluSW1nLmRhdGFbYmFzZSArIHddO1xyXG4gICAgdmFyIGQgPSBpbkltZy5kYXRhW2Jhc2UgKyB3ICsgMV07XHJcbiAgICB2YXIgZSA9IGEgLSBiO1xyXG4gICAgeCAtPSBseDtcclxuICAgIHkgLT0gbHk7XHJcblxyXG4gICAgdmFyIHJlc3VsdCA9IE1hdGguZmxvb3IoeCAqICh5ICogKGUgLSBjICsgZCkgLSBlKSArIHkgKiAoYyAtIGEpICsgYSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemVzIGEgZ2l2ZW4gYXJyYXkuIFNldHMgZWFjaCBlbGVtZW50IHRvIHplcm8uXHJcbiAqIEBwYXJhbSBhcnJheSB7QXJyYXl9IFRoZSBhcnJheSB0byBpbml0aWFsaXplXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIuY2xlYXJBcnJheSA9IGZ1bmN0aW9uKGFycmF5KSB7XHJcbiAgICB2YXIgbCA9IGFycmF5Lmxlbmd0aDtcclxuICAgIHdoaWxlIChsLS0pIHtcclxuICAgICAgICBhcnJheVtsXSA9IDA7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIHtTdWJJbWFnZX0gZnJvbSB0aGUgY3VycmVudCBpbWFnZSAoe3RoaXN9KS5cclxuICogQHBhcmFtIGZyb20ge0ltYWdlUmVmfSBUaGUgcG9zaXRpb24gd2hlcmUgdG8gc3RhcnQgdGhlIHtTdWJJbWFnZX0gZnJvbS4gKHRvcC1sZWZ0IGNvcm5lcilcclxuICogQHBhcmFtIHNpemUge0ltYWdlUmVmfSBUaGUgc2l6ZSBvZiB0aGUgcmVzdWx0aW5nIGltYWdlXHJcbiAqIEByZXR1cm5zIHtTdWJJbWFnZX0gQSBzaGFyZWQgcGFydCBvZiB0aGUgb3JpZ2luYWwgaW1hZ2VcclxuICovXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuc3ViSW1hZ2UgPSBmdW5jdGlvbihmcm9tLCBzaXplKSB7XHJcbiAgICByZXR1cm4gbmV3IFN1YkltYWdlKGZyb20sIHNpemUsIHRoaXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYW4ge0ltYWdlV3JhcHBlcikgYW5kIGNvcGllcyB0aGUgbmVlZGVkIHVuZGVybHlpbmcgaW1hZ2UtZGF0YSBhcmVhXHJcbiAqIEBwYXJhbSBpbWFnZVdyYXBwZXIge0ltYWdlV3JhcHBlcn0gVGhlIHRhcmdldCB7SW1hZ2VXcmFwcGVyfSB3aGVyZSB0aGUgZGF0YSBzaG91bGQgYmUgY29waWVkXHJcbiAqIEBwYXJhbSBmcm9tIHtJbWFnZVJlZn0gVGhlIGxvY2F0aW9uIHdoZXJlIHRvIGNvcHkgZnJvbSAodG9wLWxlZnQgbG9jYXRpb24pXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLnN1YkltYWdlQXNDb3B5ID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCBmcm9tKSB7XHJcbiAgICB2YXIgc2l6ZVkgPSBpbWFnZVdyYXBwZXIuc2l6ZS55LCBzaXplWCA9IGltYWdlV3JhcHBlci5zaXplLng7XHJcbiAgICB2YXIgeCwgeTtcclxuICAgIGZvciAoIHggPSAwOyB4IDwgc2l6ZVg7IHgrKykge1xyXG4gICAgICAgIGZvciAoIHkgPSAwOyB5IDwgc2l6ZVk7IHkrKykge1xyXG4gICAgICAgICAgICBpbWFnZVdyYXBwZXIuZGF0YVt5ICogc2l6ZVggKyB4XSA9IHRoaXMuZGF0YVsoZnJvbS55ICsgeSkgKiB0aGlzLnNpemUueCArIGZyb20ueCArIHhdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuY29weVRvID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyKSB7XHJcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5kYXRhLmxlbmd0aCwgc3JjRGF0YSA9IHRoaXMuZGF0YSwgZHN0RGF0YSA9IGltYWdlV3JhcHBlci5kYXRhO1xyXG5cclxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgIGRzdERhdGFbbGVuZ3RoXSA9IHNyY0RhdGFbbGVuZ3RoXTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZXMgYSBnaXZlbiBwaXhlbCBwb3NpdGlvbiBmcm9tIHRoZSBpbWFnZVxyXG4gKiBAcGFyYW0geCB7TnVtYmVyfSBUaGUgeC1wb3NpdGlvblxyXG4gKiBAcGFyYW0geSB7TnVtYmVyfSBUaGUgeS1wb3NpdGlvblxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgZ3JheXNjYWxlIHZhbHVlIGF0IHRoZSBwaXhlbC1wb3NpdGlvblxyXG4gKi9cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhW3kgKiB0aGlzLnNpemUueCArIHhdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlcyBhIGdpdmVuIHBpeGVsIHBvc2l0aW9uIGZyb20gdGhlIGltYWdlXHJcbiAqIEBwYXJhbSB4IHtOdW1iZXJ9IFRoZSB4LXBvc2l0aW9uXHJcbiAqIEBwYXJhbSB5IHtOdW1iZXJ9IFRoZSB5LXBvc2l0aW9uXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBncmF5c2NhbGUgdmFsdWUgYXQgdGhlIHBpeGVsLXBvc2l0aW9uXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLmdldFNhZmUgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICB2YXIgaTtcclxuXHJcbiAgICBpZiAoIXRoaXMuaW5kZXhNYXBwaW5nKSB7XHJcbiAgICAgICAgdGhpcy5pbmRleE1hcHBpbmcgPSB7XHJcbiAgICAgICAgICAgIHg6IFtdLFxyXG4gICAgICAgICAgICB5OiBbXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuc2l6ZS54OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5pbmRleE1hcHBpbmcueFtpXSA9IGk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXhNYXBwaW5nLnhbaSArIHRoaXMuc2l6ZS54XSA9IGk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnNpemUueTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXhNYXBwaW5nLnlbaV0gPSBpO1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4TWFwcGluZy55W2kgKyB0aGlzLnNpemUueV0gPSBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmRhdGFbKHRoaXMuaW5kZXhNYXBwaW5nLnlbeSArIHRoaXMuc2l6ZS55XSkgKiB0aGlzLnNpemUueCArIHRoaXMuaW5kZXhNYXBwaW5nLnhbeCArIHRoaXMuc2l6ZS54XV07XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0cyBhIGdpdmVuIHBpeGVsIHBvc2l0aW9uIGluIHRoZSBpbWFnZVxyXG4gKiBAcGFyYW0geCB7TnVtYmVyfSBUaGUgeC1wb3NpdGlvblxyXG4gKiBAcGFyYW0geSB7TnVtYmVyfSBUaGUgeS1wb3NpdGlvblxyXG4gKiBAcGFyYW0gdmFsdWUge051bWJlcn0gVGhlIGdyYXlzY2FsZSB2YWx1ZSB0byBzZXRcclxuICogQHJldHVybnMge0ltYWdlV3JhcHBlcn0gVGhlIEltYWdlIGl0c2VsZiAoZm9yIHBvc3NpYmxlIGNoYWluaW5nKVxyXG4gKi9cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbih4LCB5LCB2YWx1ZSkge1xyXG4gICAgdGhpcy5kYXRhW3kgKiB0aGlzLnNpemUueCArIHhdID0gdmFsdWU7XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXRzIHRoZSBib3JkZXIgb2YgdGhlIGltYWdlICgxIHBpeGVsKSB0byB6ZXJvXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLnplcm9Cb3JkZXIgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBpLCB3aWR0aCA9IHRoaXMuc2l6ZS54LCBoZWlnaHQgPSB0aGlzLnNpemUueSwgZGF0YSA9IHRoaXMuZGF0YTtcclxuICAgIGZvciAoIGkgPSAwOyBpIDwgd2lkdGg7IGkrKykge1xyXG4gICAgICAgIGRhdGFbaV0gPSBkYXRhWyhoZWlnaHQgLSAxKSAqIHdpZHRoICsgaV0gPSAwO1xyXG4gICAgfVxyXG4gICAgZm9yICggaSA9IDE7IGkgPCBoZWlnaHQgLSAxOyBpKyspIHtcclxuICAgICAgICBkYXRhW2kgKiB3aWR0aF0gPSBkYXRhW2kgKiB3aWR0aCArICh3aWR0aCAtIDEpXSA9IDA7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogSW52ZXJ0cyBhIGJpbmFyeSBpbWFnZSBpbiBwbGFjZVxyXG4gKi9cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5pbnZlcnQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBkYXRhID0gdGhpcy5kYXRhLCBsZW5ndGggPSBkYXRhLmxlbmd0aDtcclxuXHJcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcclxuICAgICAgICBkYXRhW2xlbmd0aF0gPSBkYXRhW2xlbmd0aF0gPyAwIDogMTtcclxuICAgIH1cclxufTtcclxuXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuY29udm9sdmUgPSBmdW5jdGlvbihrZXJuZWwpIHtcclxuICAgIHZhciB4LCB5LCBreCwga3ksIGtTaXplID0gKGtlcm5lbC5sZW5ndGggLyAyKSB8IDAsIGFjY3UgPSAwO1xyXG4gICAgZm9yICggeSA9IDA7IHkgPCB0aGlzLnNpemUueTsgeSsrKSB7XHJcbiAgICAgICAgZm9yICggeCA9IDA7IHggPCB0aGlzLnNpemUueDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGFjY3UgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKCBreSA9IC1rU2l6ZTsga3kgPD0ga1NpemU7IGt5KyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAoIGt4ID0gLWtTaXplOyBreCA8PSBrU2l6ZTsga3grKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY3UgKz0ga2VybmVsW2t5ICsga1NpemVdW2t4ICsga1NpemVdICogdGhpcy5nZXRTYWZlKHggKyBreCwgeSArIGt5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRhdGFbeSAqIHRoaXMuc2l6ZS54ICsgeF0gPSBhY2N1O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUubW9tZW50cyA9IGZ1bmN0aW9uKGxhYmVsY291bnQpIHtcclxuICAgIHZhciBkYXRhID0gdGhpcy5kYXRhLFxyXG4gICAgICAgIHgsXHJcbiAgICAgICAgeSxcclxuICAgICAgICBoZWlnaHQgPSB0aGlzLnNpemUueSxcclxuICAgICAgICB3aWR0aCA9IHRoaXMuc2l6ZS54LFxyXG4gICAgICAgIHZhbCxcclxuICAgICAgICB5c3EsXHJcbiAgICAgICAgbGFiZWxzdW0gPSBbXSxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGxhYmVsLFxyXG4gICAgICAgIG11MTEsXHJcbiAgICAgICAgbXUwMixcclxuICAgICAgICBtdTIwLFxyXG4gICAgICAgIHhfLFxyXG4gICAgICAgIHlfLFxyXG4gICAgICAgIHRtcCxcclxuICAgICAgICByZXN1bHQgPSBbXSxcclxuICAgICAgICBQSSA9IE1hdGguUEksXHJcbiAgICAgICAgUElfNCA9IFBJIC8gNDtcclxuXHJcbiAgICBpZiAobGFiZWxjb3VudCA8PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IGxhYmVsY291bnQ7IGkrKykge1xyXG4gICAgICAgIGxhYmVsc3VtW2ldID0ge1xyXG4gICAgICAgICAgICBtMDA6IDAsXHJcbiAgICAgICAgICAgIG0wMTogMCxcclxuICAgICAgICAgICAgbTEwOiAwLFxyXG4gICAgICAgICAgICBtMTE6IDAsXHJcbiAgICAgICAgICAgIG0wMjogMCxcclxuICAgICAgICAgICAgbTIwOiAwLFxyXG4gICAgICAgICAgICB0aGV0YTogMCxcclxuICAgICAgICAgICAgcmFkOiAwXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgeXNxID0geSAqIHk7XHJcbiAgICAgICAgZm9yICggeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XHJcbiAgICAgICAgICAgIHZhbCA9IGRhdGFbeSAqIHdpZHRoICsgeF07XHJcbiAgICAgICAgICAgIGlmICh2YWwgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbCA9IGxhYmVsc3VtW3ZhbCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgbGFiZWwubTAwICs9IDE7XHJcbiAgICAgICAgICAgICAgICBsYWJlbC5tMDEgKz0geTtcclxuICAgICAgICAgICAgICAgIGxhYmVsLm0xMCArPSB4O1xyXG4gICAgICAgICAgICAgICAgbGFiZWwubTExICs9IHggKiB5O1xyXG4gICAgICAgICAgICAgICAgbGFiZWwubTAyICs9IHlzcTtcclxuICAgICAgICAgICAgICAgIGxhYmVsLm0yMCArPSB4ICogeDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IGxhYmVsY291bnQ7IGkrKykge1xyXG4gICAgICAgIGxhYmVsID0gbGFiZWxzdW1baV07XHJcbiAgICAgICAgaWYgKCFpc05hTihsYWJlbC5tMDApICYmIGxhYmVsLm0wMCAhPT0gMCkge1xyXG4gICAgICAgICAgICB4XyA9IGxhYmVsLm0xMCAvIGxhYmVsLm0wMDtcclxuICAgICAgICAgICAgeV8gPSBsYWJlbC5tMDEgLyBsYWJlbC5tMDA7XHJcbiAgICAgICAgICAgIG11MTEgPSBsYWJlbC5tMTEgLyBsYWJlbC5tMDAgLSB4XyAqIHlfO1xyXG4gICAgICAgICAgICBtdTAyID0gbGFiZWwubTAyIC8gbGFiZWwubTAwIC0geV8gKiB5XztcclxuICAgICAgICAgICAgbXUyMCA9IGxhYmVsLm0yMCAvIGxhYmVsLm0wMCAtIHhfICogeF87XHJcbiAgICAgICAgICAgIHRtcCA9IChtdTAyIC0gbXUyMCkgLyAoMiAqIG11MTEpO1xyXG4gICAgICAgICAgICB0bXAgPSAwLjUgKiBNYXRoLmF0YW4odG1wKSArIChtdTExID49IDAgPyBQSV80IDogLVBJXzQgKSArIFBJO1xyXG4gICAgICAgICAgICBsYWJlbC50aGV0YSA9ICh0bXAgKiAxODAgLyBQSSArIDkwKSAlIDE4MCAtIDkwO1xyXG4gICAgICAgICAgICBpZiAobGFiZWwudGhldGEgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbC50aGV0YSArPSAxODA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGFiZWwucmFkID0gdG1wID4gUEkgPyB0bXAgLSBQSSA6IHRtcDtcclxuICAgICAgICAgICAgbGFiZWwudmVjID0gdmVjMi5jbG9uZShbTWF0aC5jb3ModG1wKSwgTWF0aC5zaW4odG1wKV0pO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChsYWJlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogRGlzcGxheXMgdGhlIHtJbWFnZVdyYXBwZXJ9IGluIGEgZ2l2ZW4gY2FudmFzXHJcbiAqIEBwYXJhbSBjYW52YXMge0NhbnZhc30gVGhlIGNhbnZhcyBlbGVtZW50IHRvIHdyaXRlIHRvXHJcbiAqIEBwYXJhbSBzY2FsZSB7TnVtYmVyfSBTY2FsZSB3aGljaCBpcyBhcHBsaWVkIHRvIGVhY2ggcGl4ZWwtdmFsdWVcclxuICovXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKGNhbnZhcywgc2NhbGUpIHtcclxuICAgIHZhciBjdHgsXHJcbiAgICAgICAgZnJhbWUsXHJcbiAgICAgICAgZGF0YSxcclxuICAgICAgICBjdXJyZW50LFxyXG4gICAgICAgIHBpeGVsLFxyXG4gICAgICAgIHgsXHJcbiAgICAgICAgeTtcclxuXHJcbiAgICBpZiAoIXNjYWxlKSB7XHJcbiAgICAgICAgc2NhbGUgPSAxLjA7XHJcbiAgICB9XHJcbiAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIGNhbnZhcy53aWR0aCA9IHRoaXMuc2l6ZS54O1xyXG4gICAgY2FudmFzLmhlaWdodCA9IHRoaXMuc2l6ZS55O1xyXG4gICAgZnJhbWUgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgICBkYXRhID0gZnJhbWUuZGF0YTtcclxuICAgIGN1cnJlbnQgPSAwO1xyXG4gICAgZm9yICh5ID0gMDsgeSA8IHRoaXMuc2l6ZS55OyB5KyspIHtcclxuICAgICAgICBmb3IgKHggPSAwOyB4IDwgdGhpcy5zaXplLng7IHgrKykge1xyXG4gICAgICAgICAgICBwaXhlbCA9IHkgKiB0aGlzLnNpemUueCArIHg7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLmdldCh4LCB5KSAqIHNjYWxlO1xyXG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDBdID0gY3VycmVudDtcclxuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAxXSA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMl0gPSBjdXJyZW50O1xyXG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDNdID0gMjU1O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vZnJhbWUuZGF0YSA9IGRhdGE7XHJcbiAgICBjdHgucHV0SW1hZ2VEYXRhKGZyYW1lLCAwLCAwKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEaXNwbGF5cyB0aGUge1N1YkltYWdlfSBpbiBhIGdpdmVuIGNhbnZhc1xyXG4gKiBAcGFyYW0gY2FudmFzIHtDYW52YXN9IFRoZSBjYW52YXMgZWxlbWVudCB0byB3cml0ZSB0b1xyXG4gKiBAcGFyYW0gc2NhbGUge051bWJlcn0gU2NhbGUgd2hpY2ggaXMgYXBwbGllZCB0byBlYWNoIHBpeGVsLXZhbHVlXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLm92ZXJsYXkgPSBmdW5jdGlvbihjYW52YXMsIHNjYWxlLCBmcm9tKSB7XHJcbiAgICBpZiAoIXNjYWxlIHx8IHNjYWxlIDwgMCB8fCBzY2FsZSA+IDM2MCkge1xyXG4gICAgICAgIHNjYWxlID0gMzYwO1xyXG4gICAgfVxyXG4gICAgdmFyIGhzdiA9IFswLCAxLCAxXTtcclxuICAgIHZhciByZ2IgPSBbMCwgMCwgMF07XHJcbiAgICB2YXIgd2hpdGVSZ2IgPSBbMjU1LCAyNTUsIDI1NV07XHJcbiAgICB2YXIgYmxhY2tSZ2IgPSBbMCwgMCwgMF07XHJcbiAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICB2YXIgZnJhbWUgPSBjdHguZ2V0SW1hZ2VEYXRhKGZyb20ueCwgZnJvbS55LCB0aGlzLnNpemUueCwgdGhpcy5zaXplLnkpO1xyXG4gICAgdmFyIGRhdGEgPSBmcmFtZS5kYXRhO1xyXG4gICAgdmFyIGxlbmd0aCA9IHRoaXMuZGF0YS5sZW5ndGg7XHJcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcclxuICAgICAgICBoc3ZbMF0gPSB0aGlzLmRhdGFbbGVuZ3RoXSAqIHNjYWxlO1xyXG4gICAgICAgIHJlc3VsdCA9IGhzdlswXSA8PSAwID8gd2hpdGVSZ2IgOiBoc3ZbMF0gPj0gMzYwID8gYmxhY2tSZ2IgOiBDVlV0aWxzLmhzdjJyZ2IoaHN2LCByZ2IpO1xyXG4gICAgICAgIGRhdGFbbGVuZ3RoICogNCArIDBdID0gcmVzdWx0WzBdO1xyXG4gICAgICAgIGRhdGFbbGVuZ3RoICogNCArIDFdID0gcmVzdWx0WzFdO1xyXG4gICAgICAgIGRhdGFbbGVuZ3RoICogNCArIDJdID0gcmVzdWx0WzJdO1xyXG4gICAgICAgIGRhdGFbbGVuZ3RoICogNCArIDNdID0gMjU1O1xyXG4gICAgfVxyXG4gICAgY3R4LnB1dEltYWdlRGF0YShmcmFtZSwgZnJvbS54LCBmcm9tLnkpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VXcmFwcGVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9pbWFnZV93cmFwcGVyLmpzXG4gKiovIiwiLyoqXHJcbiAqIENvbnN0cnVjdCByZXByZXNlbnRpbmcgYSBwYXJ0IG9mIGFub3RoZXIge0ltYWdlV3JhcHBlcn0uIFNoYXJlcyBkYXRhXHJcbiAqIGJldHdlZW4gdGhlIHBhcmVudCBhbmQgdGhlIGNoaWxkLlxyXG4gKiBAcGFyYW0gZnJvbSB7SW1hZ2VSZWZ9IFRoZSBwb3NpdGlvbiB3aGVyZSB0byBzdGFydCB0aGUge1N1YkltYWdlfSBmcm9tLiAodG9wLWxlZnQgY29ybmVyKVxyXG4gKiBAcGFyYW0gc2l6ZSB7SW1hZ2VSZWZ9IFRoZSBzaXplIG9mIHRoZSByZXN1bHRpbmcgaW1hZ2VcclxuICogQHBhcmFtIEkge0ltYWdlV3JhcHBlcn0gVGhlIHtJbWFnZVdyYXBwZXJ9IHRvIHNoYXJlIGZyb21cclxuICogQHJldHVybnMge1N1YkltYWdlfSBBIHNoYXJlZCBwYXJ0IG9mIHRoZSBvcmlnaW5hbCBpbWFnZVxyXG4gKi9cclxuZnVuY3Rpb24gU3ViSW1hZ2UoZnJvbSwgc2l6ZSwgSSkge1xyXG4gICAgaWYgKCFJKSB7XHJcbiAgICAgICAgSSA9IHtcclxuICAgICAgICAgICAgZGF0YTogbnVsbCxcclxuICAgICAgICAgICAgc2l6ZTogc2l6ZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICB0aGlzLmRhdGEgPSBJLmRhdGE7XHJcbiAgICB0aGlzLm9yaWdpbmFsU2l6ZSA9IEkuc2l6ZTtcclxuICAgIHRoaXMuSSA9IEk7XHJcblxyXG4gICAgdGhpcy5mcm9tID0gZnJvbTtcclxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEaXNwbGF5cyB0aGUge1N1YkltYWdlfSBpbiBhIGdpdmVuIGNhbnZhc1xyXG4gKiBAcGFyYW0gY2FudmFzIHtDYW52YXN9IFRoZSBjYW52YXMgZWxlbWVudCB0byB3cml0ZSB0b1xyXG4gKiBAcGFyYW0gc2NhbGUge051bWJlcn0gU2NhbGUgd2hpY2ggaXMgYXBwbGllZCB0byBlYWNoIHBpeGVsLXZhbHVlXHJcbiAqL1xyXG5TdWJJbWFnZS5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKGNhbnZhcywgc2NhbGUpIHtcclxuICAgIHZhciBjdHgsXHJcbiAgICAgICAgZnJhbWUsXHJcbiAgICAgICAgZGF0YSxcclxuICAgICAgICBjdXJyZW50LFxyXG4gICAgICAgIHksXHJcbiAgICAgICAgeCxcclxuICAgICAgICBwaXhlbDtcclxuXHJcbiAgICBpZiAoIXNjYWxlKSB7XHJcbiAgICAgICAgc2NhbGUgPSAxLjA7XHJcbiAgICB9XHJcbiAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIGNhbnZhcy53aWR0aCA9IHRoaXMuc2l6ZS54O1xyXG4gICAgY2FudmFzLmhlaWdodCA9IHRoaXMuc2l6ZS55O1xyXG4gICAgZnJhbWUgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgICBkYXRhID0gZnJhbWUuZGF0YTtcclxuICAgIGN1cnJlbnQgPSAwO1xyXG4gICAgZm9yICh5ID0gMDsgeSA8IHRoaXMuc2l6ZS55OyB5KyspIHtcclxuICAgICAgICBmb3IgKHggPSAwOyB4IDwgdGhpcy5zaXplLng7IHgrKykge1xyXG4gICAgICAgICAgICBwaXhlbCA9IHkgKiB0aGlzLnNpemUueCArIHg7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLmdldCh4LCB5KSAqIHNjYWxlO1xyXG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDBdID0gY3VycmVudDtcclxuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAxXSA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMl0gPSBjdXJyZW50O1xyXG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDNdID0gMjU1O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZyYW1lLmRhdGEgPSBkYXRhO1xyXG4gICAgY3R4LnB1dEltYWdlRGF0YShmcmFtZSwgMCwgMCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0cmlldmVzIGEgZ2l2ZW4gcGl4ZWwgcG9zaXRpb24gZnJvbSB0aGUge1N1YkltYWdlfVxyXG4gKiBAcGFyYW0geCB7TnVtYmVyfSBUaGUgeC1wb3NpdGlvblxyXG4gKiBAcGFyYW0geSB7TnVtYmVyfSBUaGUgeS1wb3NpdGlvblxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgZ3JheXNjYWxlIHZhbHVlIGF0IHRoZSBwaXhlbC1wb3NpdGlvblxyXG4gKi9cclxuU3ViSW1hZ2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGFbKHRoaXMuZnJvbS55ICsgeSkgKiB0aGlzLm9yaWdpbmFsU2l6ZS54ICsgdGhpcy5mcm9tLnggKyB4XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBVcGRhdGVzIHRoZSB1bmRlcmx5aW5nIGRhdGEgZnJvbSBhIGdpdmVuIHtJbWFnZVdyYXBwZXJ9XHJcbiAqIEBwYXJhbSBpbWFnZSB7SW1hZ2VXcmFwcGVyfSBUaGUgdXBkYXRlZCBpbWFnZVxyXG4gKi9cclxuU3ViSW1hZ2UucHJvdG90eXBlLnVwZGF0ZURhdGEgPSBmdW5jdGlvbihpbWFnZSkge1xyXG4gICAgdGhpcy5vcmlnaW5hbFNpemUgPSBpbWFnZS5zaXplO1xyXG4gICAgdGhpcy5kYXRhID0gaW1hZ2UuZGF0YTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgc2hhcmVkIGFyZWFcclxuICogQHBhcmFtIGZyb20ge3gseX0gVGhlIG5ldyBsb2NhdGlvblxyXG4gKiBAcmV0dXJucyB7U3ViSW1hZ2V9IHJldHVybnMge3RoaXN9IGZvciBwb3NzaWJsZSBjaGFpbmluZ1xyXG4gKi9cclxuU3ViSW1hZ2UucHJvdG90eXBlLnVwZGF0ZUZyb20gPSBmdW5jdGlvbihmcm9tKSB7XHJcbiAgICB0aGlzLmZyb20gPSBmcm9tO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoU3ViSW1hZ2UpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9zdWJJbWFnZS5qc1xuICoqLyIsImltcG9ydCBDbHVzdGVyMiBmcm9tICcuL2NsdXN0ZXInO1xyXG5pbXBvcnQgQXJyYXlIZWxwZXIgZnJvbSAnLi9hcnJheV9oZWxwZXInO1xyXG5pbXBvcnQge3ZlYzIsIHZlYzN9IGZyb20gJ2dsLW1hdHJpeCc7XHJcblxyXG52YXIgQ1ZVdGlscyA9IHt9O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB4IHgtY29vcmRpbmF0ZVxyXG4gKiBAcGFyYW0geSB5LWNvb3JkaW5hdGVcclxuICogQHJldHVybiBJbWFnZVJlZmVyZW5jZSB7eCx5fSBDb29yZGluYXRlXHJcbiAqL1xyXG5DVlV0aWxzLmltYWdlUmVmID0gZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgdmFyIHRoYXQgPSB7XHJcbiAgICAgICAgeDogeCxcclxuICAgICAgICB5OiB5LFxyXG4gICAgICAgIHRvVmVjMjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2ZWMyLmNsb25lKFt0aGlzLngsIHRoaXMueV0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9WZWMzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZlYzMuY2xvbmUoW3RoaXMueCwgdGhpcy55LCAxXSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByb3VuZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IHRoaXMueCA+IDAuMCA/IE1hdGguZmxvb3IodGhpcy54ICsgMC41KSA6IE1hdGguZmxvb3IodGhpcy54IC0gMC41KTtcclxuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy55ID4gMC4wID8gTWF0aC5mbG9vcih0aGlzLnkgKyAwLjUpIDogTWF0aC5mbG9vcih0aGlzLnkgLSAwLjUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29tcHV0ZXMgYW4gaW50ZWdyYWwgaW1hZ2Ugb2YgYSBnaXZlbiBncmF5c2NhbGUgaW1hZ2UuXHJcbiAqIEBwYXJhbSBpbWFnZURhdGFDb250YWluZXIge0ltYWdlRGF0YUNvbnRhaW5lcn0gdGhlIGltYWdlIHRvIGJlIGludGVncmF0ZWRcclxuICovXHJcbkNWVXRpbHMuY29tcHV0ZUludGVncmFsSW1hZ2UyID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCBpbnRlZ3JhbFdyYXBwZXIpIHtcclxuICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YTtcclxuICAgIHZhciB3aWR0aCA9IGltYWdlV3JhcHBlci5zaXplLng7XHJcbiAgICB2YXIgaGVpZ2h0ID0gaW1hZ2VXcmFwcGVyLnNpemUueTtcclxuICAgIHZhciBpbnRlZ3JhbEltYWdlRGF0YSA9IGludGVncmFsV3JhcHBlci5kYXRhO1xyXG4gICAgdmFyIHN1bSA9IDAsIHBvc0EgPSAwLCBwb3NCID0gMCwgcG9zQyA9IDAsIHBvc0QgPSAwLCB4LCB5O1xyXG5cclxuICAgIC8vIHN1bSB1cCBmaXJzdCBjb2x1bW5cclxuICAgIHBvc0IgPSB3aWR0aDtcclxuICAgIHN1bSA9IDA7XHJcbiAgICBmb3IgKCB5ID0gMTsgeSA8IGhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgc3VtICs9IGltYWdlRGF0YVtwb3NBXTtcclxuICAgICAgICBpbnRlZ3JhbEltYWdlRGF0YVtwb3NCXSArPSBzdW07XHJcbiAgICAgICAgcG9zQSArPSB3aWR0aDtcclxuICAgICAgICBwb3NCICs9IHdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHBvc0EgPSAwO1xyXG4gICAgcG9zQiA9IDE7XHJcbiAgICBzdW0gPSAwO1xyXG4gICAgZm9yICggeCA9IDE7IHggPCB3aWR0aDsgeCsrKSB7XHJcbiAgICAgICAgc3VtICs9IGltYWdlRGF0YVtwb3NBXTtcclxuICAgICAgICBpbnRlZ3JhbEltYWdlRGF0YVtwb3NCXSArPSBzdW07XHJcbiAgICAgICAgcG9zQSsrO1xyXG4gICAgICAgIHBvc0IrKztcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCB5ID0gMTsgeSA8IGhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgcG9zQSA9IHkgKiB3aWR0aCArIDE7XHJcbiAgICAgICAgcG9zQiA9ICh5IC0gMSkgKiB3aWR0aCArIDE7XHJcbiAgICAgICAgcG9zQyA9IHkgKiB3aWR0aDtcclxuICAgICAgICBwb3NEID0gKHkgLSAxKSAqIHdpZHRoO1xyXG4gICAgICAgIGZvciAoIHggPSAxOyB4IDwgd2lkdGg7IHgrKykge1xyXG4gICAgICAgICAgICBpbnRlZ3JhbEltYWdlRGF0YVtwb3NBXSArPVxyXG4gICAgICAgICAgICAgICAgaW1hZ2VEYXRhW3Bvc0FdICsgaW50ZWdyYWxJbWFnZURhdGFbcG9zQl0gKyBpbnRlZ3JhbEltYWdlRGF0YVtwb3NDXSAtIGludGVncmFsSW1hZ2VEYXRhW3Bvc0RdO1xyXG4gICAgICAgICAgICBwb3NBKys7XHJcbiAgICAgICAgICAgIHBvc0IrKztcclxuICAgICAgICAgICAgcG9zQysrO1xyXG4gICAgICAgICAgICBwb3NEKys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5jb21wdXRlSW50ZWdyYWxJbWFnZSA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgaW50ZWdyYWxXcmFwcGVyKSB7XHJcbiAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGE7XHJcbiAgICB2YXIgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54O1xyXG4gICAgdmFyIGhlaWdodCA9IGltYWdlV3JhcHBlci5zaXplLnk7XHJcbiAgICB2YXIgaW50ZWdyYWxJbWFnZURhdGEgPSBpbnRlZ3JhbFdyYXBwZXIuZGF0YTtcclxuICAgIHZhciBzdW0gPSAwO1xyXG5cclxuICAgIC8vIHN1bSB1cCBmaXJzdCByb3dcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2lkdGg7IGkrKykge1xyXG4gICAgICAgIHN1bSArPSBpbWFnZURhdGFbaV07XHJcbiAgICAgICAgaW50ZWdyYWxJbWFnZURhdGFbaV0gPSBzdW07XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgdiA9IDE7IHYgPCBoZWlnaHQ7IHYrKykge1xyXG4gICAgICAgIHN1bSA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgdSA9IDA7IHUgPCB3aWR0aDsgdSsrKSB7XHJcbiAgICAgICAgICAgIHN1bSArPSBpbWFnZURhdGFbdiAqIHdpZHRoICsgdV07XHJcbiAgICAgICAgICAgIGludGVncmFsSW1hZ2VEYXRhWygodikgKiB3aWR0aCkgKyB1XSA9IHN1bSArIGludGVncmFsSW1hZ2VEYXRhWyh2IC0gMSkgKiB3aWR0aCArIHVdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMudGhyZXNob2xkSW1hZ2UgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIHRocmVzaG9sZCwgdGFyZ2V0V3JhcHBlcikge1xyXG4gICAgaWYgKCF0YXJnZXRXcmFwcGVyKSB7XHJcbiAgICAgICAgdGFyZ2V0V3JhcHBlciA9IGltYWdlV3JhcHBlcjtcclxuICAgIH1cclxuICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YSwgbGVuZ3RoID0gaW1hZ2VEYXRhLmxlbmd0aCwgdGFyZ2V0RGF0YSA9IHRhcmdldFdyYXBwZXIuZGF0YTtcclxuXHJcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcclxuICAgICAgICB0YXJnZXREYXRhW2xlbmd0aF0gPSBpbWFnZURhdGFbbGVuZ3RoXSA8IHRocmVzaG9sZCA/IDEgOiAwO1xyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5jb21wdXRlSGlzdG9ncmFtID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCBiaXRzUGVyUGl4ZWwpIHtcclxuICAgIGlmICghYml0c1BlclBpeGVsKSB7XHJcbiAgICAgICAgYml0c1BlclBpeGVsID0gODtcclxuICAgIH1cclxuICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICBsZW5ndGggPSBpbWFnZURhdGEubGVuZ3RoLFxyXG4gICAgICAgIGJpdFNoaWZ0ID0gOCAtIGJpdHNQZXJQaXhlbCxcclxuICAgICAgICBidWNrZXRDbnQgPSAxIDw8IGJpdHNQZXJQaXhlbCxcclxuICAgICAgICBoaXN0ID0gbmV3IEludDMyQXJyYXkoYnVja2V0Q250KTtcclxuXHJcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcclxuICAgICAgICBoaXN0W2ltYWdlRGF0YVtsZW5ndGhdID4+IGJpdFNoaWZ0XSsrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhpc3Q7XHJcbn07XHJcblxyXG5DVlV0aWxzLnNoYXJwZW5MaW5lID0gZnVuY3Rpb24obGluZSkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgbGVuZ3RoID0gbGluZS5sZW5ndGgsXHJcbiAgICAgICAgbGVmdCA9IGxpbmVbMF0sXHJcbiAgICAgICAgY2VudGVyID0gbGluZVsxXSxcclxuICAgICAgICByaWdodDtcclxuXHJcbiAgICBmb3IgKGkgPSAxOyBpIDwgbGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgcmlnaHQgPSBsaW5lW2kgKyAxXTtcclxuICAgICAgICAvLyAgLTEgNCAtMSBrZXJuZWxcclxuICAgICAgICBsaW5lW2kgLSAxXSA9ICgoKGNlbnRlciAqIDIpIC0gbGVmdCAtIHJpZ2h0KSkgJiAyNTU7XHJcbiAgICAgICAgbGVmdCA9IGNlbnRlcjtcclxuICAgICAgICBjZW50ZXIgPSByaWdodDtcclxuICAgIH1cclxuICAgIHJldHVybiBsaW5lO1xyXG59O1xyXG5cclxuQ1ZVdGlscy5kZXRlcm1pbmVPdHN1VGhyZXNob2xkID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCBiaXRzUGVyUGl4ZWwpIHtcclxuICAgIGlmICghYml0c1BlclBpeGVsKSB7XHJcbiAgICAgICAgYml0c1BlclBpeGVsID0gODtcclxuICAgIH1cclxuICAgIHZhciBoaXN0LFxyXG4gICAgICAgIHRocmVzaG9sZCxcclxuICAgICAgICBiaXRTaGlmdCA9IDggLSBiaXRzUGVyUGl4ZWw7XHJcblxyXG4gICAgZnVuY3Rpb24gcHgoaW5pdCwgZW5kKSB7XHJcbiAgICAgICAgdmFyIHN1bSA9IDAsIGk7XHJcbiAgICAgICAgZm9yICggaSA9IGluaXQ7IGkgPD0gZW5kOyBpKyspIHtcclxuICAgICAgICAgICAgc3VtICs9IGhpc3RbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdW07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbXgoaW5pdCwgZW5kKSB7XHJcbiAgICAgICAgdmFyIGksIHN1bSA9IDA7XHJcblxyXG4gICAgICAgIGZvciAoIGkgPSBpbml0OyBpIDw9IGVuZDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHN1bSArPSBpICogaGlzdFtpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdW07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGV0ZXJtaW5lVGhyZXNob2xkKCkge1xyXG4gICAgICAgIHZhciB2ZXQgPSBbMF0sIHAxLCBwMiwgcDEyLCBrLCBtMSwgbTIsIG0xMixcclxuICAgICAgICAgICAgbWF4ID0gKDEgPDwgYml0c1BlclBpeGVsKSAtIDE7XHJcblxyXG4gICAgICAgIGhpc3QgPSBDVlV0aWxzLmNvbXB1dGVIaXN0b2dyYW0oaW1hZ2VXcmFwcGVyLCBiaXRzUGVyUGl4ZWwpO1xyXG4gICAgICAgIGZvciAoIGsgPSAxOyBrIDwgbWF4OyBrKyspIHtcclxuICAgICAgICAgICAgcDEgPSBweCgwLCBrKTtcclxuICAgICAgICAgICAgcDIgPSBweChrICsgMSwgbWF4KTtcclxuICAgICAgICAgICAgcDEyID0gcDEgKiBwMjtcclxuICAgICAgICAgICAgaWYgKHAxMiA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcDEyID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtMSA9IG14KDAsIGspICogcDI7XHJcbiAgICAgICAgICAgIG0yID0gbXgoayArIDEsIG1heCkgKiBwMTtcclxuICAgICAgICAgICAgbTEyID0gbTEgLSBtMjtcclxuICAgICAgICAgICAgdmV0W2tdID0gbTEyICogbTEyIC8gcDEyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQXJyYXlIZWxwZXIubWF4SW5kZXgodmV0KTtcclxuICAgIH1cclxuXHJcbiAgICB0aHJlc2hvbGQgPSBkZXRlcm1pbmVUaHJlc2hvbGQoKTtcclxuICAgIHJldHVybiB0aHJlc2hvbGQgPDwgYml0U2hpZnQ7XHJcbn07XHJcblxyXG5DVlV0aWxzLm90c3VUaHJlc2hvbGQgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIHRhcmdldFdyYXBwZXIpIHtcclxuICAgIHZhciB0aHJlc2hvbGQgPSBDVlV0aWxzLmRldGVybWluZU90c3VUaHJlc2hvbGQoaW1hZ2VXcmFwcGVyKTtcclxuXHJcbiAgICBDVlV0aWxzLnRocmVzaG9sZEltYWdlKGltYWdlV3JhcHBlciwgdGhyZXNob2xkLCB0YXJnZXRXcmFwcGVyKTtcclxuICAgIHJldHVybiB0aHJlc2hvbGQ7XHJcbn07XHJcblxyXG4vLyBsb2NhbCB0aHJlc2hvbGRpbmdcclxuQ1ZVdGlscy5jb21wdXRlQmluYXJ5SW1hZ2UgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGludGVncmFsV3JhcHBlciwgdGFyZ2V0V3JhcHBlcikge1xyXG4gICAgQ1ZVdGlscy5jb21wdXRlSW50ZWdyYWxJbWFnZShpbWFnZVdyYXBwZXIsIGludGVncmFsV3JhcHBlcik7XHJcblxyXG4gICAgaWYgKCF0YXJnZXRXcmFwcGVyKSB7XHJcbiAgICAgICAgdGFyZ2V0V3JhcHBlciA9IGltYWdlV3JhcHBlcjtcclxuICAgIH1cclxuICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YTtcclxuICAgIHZhciB0YXJnZXREYXRhID0gdGFyZ2V0V3JhcHBlci5kYXRhO1xyXG4gICAgdmFyIHdpZHRoID0gaW1hZ2VXcmFwcGVyLnNpemUueDtcclxuICAgIHZhciBoZWlnaHQgPSBpbWFnZVdyYXBwZXIuc2l6ZS55O1xyXG4gICAgdmFyIGludGVncmFsSW1hZ2VEYXRhID0gaW50ZWdyYWxXcmFwcGVyLmRhdGE7XHJcbiAgICB2YXIgc3VtID0gMCwgdiwgdSwga2VybmVsID0gMywgQSwgQiwgQywgRCwgYXZnLCBzaXplID0gKGtlcm5lbCAqIDIgKyAxKSAqIChrZXJuZWwgKiAyICsgMSk7XHJcblxyXG4gICAgLy8gY2xlYXIgb3V0IHRvcCAmIGJvdHRvbS1ib3JkZXJcclxuICAgIGZvciAoIHYgPSAwOyB2IDw9IGtlcm5lbDsgdisrKSB7XHJcbiAgICAgICAgZm9yICggdSA9IDA7IHUgPCB3aWR0aDsgdSsrKSB7XHJcbiAgICAgICAgICAgIHRhcmdldERhdGFbKCh2KSAqIHdpZHRoKSArIHVdID0gMDtcclxuICAgICAgICAgICAgdGFyZ2V0RGF0YVsoKChoZWlnaHQgLSAxKSAtIHYpICogd2lkdGgpICsgdV0gPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBjbGVhciBvdXQgbGVmdCAmIHJpZ2h0IGJvcmRlclxyXG4gICAgZm9yICggdiA9IGtlcm5lbDsgdiA8IGhlaWdodCAtIGtlcm5lbDsgdisrKSB7XHJcbiAgICAgICAgZm9yICggdSA9IDA7IHUgPD0ga2VybmVsOyB1KyspIHtcclxuICAgICAgICAgICAgdGFyZ2V0RGF0YVsoKHYpICogd2lkdGgpICsgdV0gPSAwO1xyXG4gICAgICAgICAgICB0YXJnZXREYXRhWygodikgKiB3aWR0aCkgKyAod2lkdGggLSAxIC0gdSldID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICggdiA9IGtlcm5lbCArIDE7IHYgPCBoZWlnaHQgLSBrZXJuZWwgLSAxOyB2KyspIHtcclxuICAgICAgICBmb3IgKCB1ID0ga2VybmVsICsgMTsgdSA8IHdpZHRoIC0ga2VybmVsOyB1KyspIHtcclxuICAgICAgICAgICAgQSA9IGludGVncmFsSW1hZ2VEYXRhWyh2IC0ga2VybmVsIC0gMSkgKiB3aWR0aCArICh1IC0ga2VybmVsIC0gMSldO1xyXG4gICAgICAgICAgICBCID0gaW50ZWdyYWxJbWFnZURhdGFbKHYgLSBrZXJuZWwgLSAxKSAqIHdpZHRoICsgKHUgKyBrZXJuZWwpXTtcclxuICAgICAgICAgICAgQyA9IGludGVncmFsSW1hZ2VEYXRhWyh2ICsga2VybmVsKSAqIHdpZHRoICsgKHUgLSBrZXJuZWwgLSAxKV07XHJcbiAgICAgICAgICAgIEQgPSBpbnRlZ3JhbEltYWdlRGF0YVsodiArIGtlcm5lbCkgKiB3aWR0aCArICh1ICsga2VybmVsKV07XHJcbiAgICAgICAgICAgIHN1bSA9IEQgLSBDIC0gQiArIEE7XHJcbiAgICAgICAgICAgIGF2ZyA9IHN1bSAvIChzaXplKTtcclxuICAgICAgICAgICAgdGFyZ2V0RGF0YVt2ICogd2lkdGggKyB1XSA9IGltYWdlRGF0YVt2ICogd2lkdGggKyB1XSA+IChhdmcgKyA1KSA/IDAgOiAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMuY2x1c3RlciA9IGZ1bmN0aW9uKHBvaW50cywgdGhyZXNob2xkLCBwcm9wZXJ0eSkge1xyXG4gICAgdmFyIGksIGssIGNsdXN0ZXIsIHBvaW50LCBjbHVzdGVycyA9IFtdO1xyXG5cclxuICAgIGlmICghcHJvcGVydHkpIHtcclxuICAgICAgICBwcm9wZXJ0eSA9IFwicmFkXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkVG9DbHVzdGVyKG5ld1BvaW50KSB7XHJcbiAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgZm9yICggayA9IDA7IGsgPCBjbHVzdGVycy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICBjbHVzdGVyID0gY2x1c3RlcnNba107XHJcbiAgICAgICAgICAgIGlmIChjbHVzdGVyLmZpdHMobmV3UG9pbnQpKSB7XHJcbiAgICAgICAgICAgICAgICBjbHVzdGVyLmFkZChuZXdQb2ludCk7XHJcbiAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGl0ZXJhdGUgb3ZlciBlYWNoIGNsb3VkXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHBvaW50ID0gQ2x1c3RlcjIuY3JlYXRlUG9pbnQocG9pbnRzW2ldLCBpLCBwcm9wZXJ0eSk7XHJcbiAgICAgICAgaWYgKCFhZGRUb0NsdXN0ZXIocG9pbnQpKSB7XHJcbiAgICAgICAgICAgIGNsdXN0ZXJzLnB1c2goQ2x1c3RlcjIuY3JlYXRlKHBvaW50LCB0aHJlc2hvbGQpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2x1c3RlcnM7XHJcbn07XHJcblxyXG5DVlV0aWxzLlRyYWNlciA9IHtcclxuICAgIHRyYWNlOiBmdW5jdGlvbihwb2ludHMsIHZlYykge1xyXG4gICAgICAgIHZhciBpdGVyYXRpb24sIG1heEl0ZXJhdGlvbnMgPSAxMCwgdG9wID0gW10sIHJlc3VsdCA9IFtdLCBjZW50ZXJQb3MgPSAwLCBjdXJyZW50UG9zID0gMDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdHJhY2UoaWR4LCBmb3J3YXJkKSB7XHJcbiAgICAgICAgICAgIHZhciBmcm9tLCB0bywgdG9JZHgsIHByZWRpY3RlZFBvcywgdGhyZXNob2xkWCA9IDEsIHRocmVzaG9sZFkgPSBNYXRoLmFicyh2ZWNbMV0gLyAxMCksIGZvdW5kID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBtYXRjaChwb3MsIHByZWRpY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBvcy54ID4gKHByZWRpY3RlZC54IC0gdGhyZXNob2xkWClcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgcG9zLnggPCAocHJlZGljdGVkLnggKyB0aHJlc2hvbGRYKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBwb3MueSA+IChwcmVkaWN0ZWQueSAtIHRocmVzaG9sZFkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHBvcy55IDwgKHByZWRpY3RlZC55ICsgdGhyZXNob2xkWSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgbmV4dCBpbmRleCBpcyB3aXRoaW4gdGhlIHZlYyBzcGVjaWZpY2F0aW9uc1xyXG4gICAgICAgICAgICAvLyBpZiBub3QsIGNoZWNrIGFzIGxvbmcgYXMgdGhlIHRocmVzaG9sZCBpcyBtZXRcclxuXHJcbiAgICAgICAgICAgIGZyb20gPSBwb2ludHNbaWR4XTtcclxuICAgICAgICAgICAgaWYgKGZvcndhcmQpIHtcclxuICAgICAgICAgICAgICAgIHByZWRpY3RlZFBvcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBmcm9tLnggKyB2ZWNbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgeTogZnJvbS55ICsgdmVjWzFdXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcHJlZGljdGVkUG9zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGZyb20ueCAtIHZlY1swXSxcclxuICAgICAgICAgICAgICAgICAgICB5OiBmcm9tLnkgLSB2ZWNbMV1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRvSWR4ID0gZm9yd2FyZCA/IGlkeCArIDEgOiBpZHggLSAxO1xyXG4gICAgICAgICAgICB0byA9IHBvaW50c1t0b0lkeF07XHJcbiAgICAgICAgICAgIHdoaWxlICh0byAmJiAoIGZvdW5kID0gbWF0Y2godG8sIHByZWRpY3RlZFBvcykpICE9PSB0cnVlICYmIChNYXRoLmFicyh0by55IC0gZnJvbS55KSA8IHZlY1sxXSkpIHtcclxuICAgICAgICAgICAgICAgIHRvSWR4ID0gZm9yd2FyZCA/IHRvSWR4ICsgMSA6IHRvSWR4IC0gMTtcclxuICAgICAgICAgICAgICAgIHRvID0gcG9pbnRzW3RvSWR4XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZvdW5kID8gdG9JZHggOiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICggaXRlcmF0aW9uID0gMDsgaXRlcmF0aW9uIDwgbWF4SXRlcmF0aW9uczsgaXRlcmF0aW9uKyspIHtcclxuICAgICAgICAgICAgLy8gcmFuZG9tbHkgc2VsZWN0IHBvaW50IHRvIHN0YXJ0IHdpdGhcclxuICAgICAgICAgICAgY2VudGVyUG9zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9pbnRzLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAvLyB0cmFjZSBmb3J3YXJkXHJcbiAgICAgICAgICAgIHRvcCA9IFtdO1xyXG4gICAgICAgICAgICBjdXJyZW50UG9zID0gY2VudGVyUG9zO1xyXG4gICAgICAgICAgICB0b3AucHVzaChwb2ludHNbY3VycmVudFBvc10pO1xyXG4gICAgICAgICAgICB3aGlsZSAoKCBjdXJyZW50UG9zID0gdHJhY2UoY3VycmVudFBvcywgdHJ1ZSkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0b3AucHVzaChwb2ludHNbY3VycmVudFBvc10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjZW50ZXJQb3MgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UG9zID0gY2VudGVyUG9zO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKCggY3VycmVudFBvcyA9IHRyYWNlKGN1cnJlbnRQb3MsIGZhbHNlKSkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3AucHVzaChwb2ludHNbY3VycmVudFBvc10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodG9wLmxlbmd0aCA+IHJlc3VsdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5ESUxBVEUgPSAxO1xyXG5DVlV0aWxzLkVST0RFID0gMjtcclxuXHJcbkNWVXRpbHMuZGlsYXRlID0gZnVuY3Rpb24oaW5JbWFnZVdyYXBwZXIsIG91dEltYWdlV3JhcHBlcikge1xyXG4gICAgdmFyIHYsXHJcbiAgICAgICAgdSxcclxuICAgICAgICBpbkltYWdlRGF0YSA9IGluSW1hZ2VXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgb3V0SW1hZ2VEYXRhID0gb3V0SW1hZ2VXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgaGVpZ2h0ID0gaW5JbWFnZVdyYXBwZXIuc2l6ZS55LFxyXG4gICAgICAgIHdpZHRoID0gaW5JbWFnZVdyYXBwZXIuc2l6ZS54LFxyXG4gICAgICAgIHN1bSxcclxuICAgICAgICB5U3RhcnQxLFxyXG4gICAgICAgIHlTdGFydDIsXHJcbiAgICAgICAgeFN0YXJ0MSxcclxuICAgICAgICB4U3RhcnQyO1xyXG5cclxuICAgIGZvciAoIHYgPSAxOyB2IDwgaGVpZ2h0IC0gMTsgdisrKSB7XHJcbiAgICAgICAgZm9yICggdSA9IDE7IHUgPCB3aWR0aCAtIDE7IHUrKykge1xyXG4gICAgICAgICAgICB5U3RhcnQxID0gdiAtIDE7XHJcbiAgICAgICAgICAgIHlTdGFydDIgPSB2ICsgMTtcclxuICAgICAgICAgICAgeFN0YXJ0MSA9IHUgLSAxO1xyXG4gICAgICAgICAgICB4U3RhcnQyID0gdSArIDE7XHJcbiAgICAgICAgICAgIHN1bSA9IGluSW1hZ2VEYXRhW3lTdGFydDEgKiB3aWR0aCArIHhTdGFydDFdICsgaW5JbWFnZURhdGFbeVN0YXJ0MSAqIHdpZHRoICsgeFN0YXJ0Ml0gK1xyXG4gICAgICAgICAgICBpbkltYWdlRGF0YVt2ICogd2lkdGggKyB1XSArXHJcbiAgICAgICAgICAgIGluSW1hZ2VEYXRhW3lTdGFydDIgKiB3aWR0aCArIHhTdGFydDFdICsgaW5JbWFnZURhdGFbeVN0YXJ0MiAqIHdpZHRoICsgeFN0YXJ0Ml07XHJcbiAgICAgICAgICAgIG91dEltYWdlRGF0YVt2ICogd2lkdGggKyB1XSA9IHN1bSA+IDAgPyAxIDogMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLmVyb2RlID0gZnVuY3Rpb24oaW5JbWFnZVdyYXBwZXIsIG91dEltYWdlV3JhcHBlcikge1xyXG4gICAgdmFyIHYsXHJcbiAgICAgICAgdSxcclxuICAgICAgICBpbkltYWdlRGF0YSA9IGluSW1hZ2VXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgb3V0SW1hZ2VEYXRhID0gb3V0SW1hZ2VXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgaGVpZ2h0ID0gaW5JbWFnZVdyYXBwZXIuc2l6ZS55LFxyXG4gICAgICAgIHdpZHRoID0gaW5JbWFnZVdyYXBwZXIuc2l6ZS54LFxyXG4gICAgICAgIHN1bSxcclxuICAgICAgICB5U3RhcnQxLFxyXG4gICAgICAgIHlTdGFydDIsXHJcbiAgICAgICAgeFN0YXJ0MSxcclxuICAgICAgICB4U3RhcnQyO1xyXG5cclxuICAgIGZvciAoIHYgPSAxOyB2IDwgaGVpZ2h0IC0gMTsgdisrKSB7XHJcbiAgICAgICAgZm9yICggdSA9IDE7IHUgPCB3aWR0aCAtIDE7IHUrKykge1xyXG4gICAgICAgICAgICB5U3RhcnQxID0gdiAtIDE7XHJcbiAgICAgICAgICAgIHlTdGFydDIgPSB2ICsgMTtcclxuICAgICAgICAgICAgeFN0YXJ0MSA9IHUgLSAxO1xyXG4gICAgICAgICAgICB4U3RhcnQyID0gdSArIDE7XHJcbiAgICAgICAgICAgIHN1bSA9IGluSW1hZ2VEYXRhW3lTdGFydDEgKiB3aWR0aCArIHhTdGFydDFdICsgaW5JbWFnZURhdGFbeVN0YXJ0MSAqIHdpZHRoICsgeFN0YXJ0Ml0gK1xyXG4gICAgICAgICAgICBpbkltYWdlRGF0YVt2ICogd2lkdGggKyB1XSArXHJcbiAgICAgICAgICAgIGluSW1hZ2VEYXRhW3lTdGFydDIgKiB3aWR0aCArIHhTdGFydDFdICsgaW5JbWFnZURhdGFbeVN0YXJ0MiAqIHdpZHRoICsgeFN0YXJ0Ml07XHJcbiAgICAgICAgICAgIG91dEltYWdlRGF0YVt2ICogd2lkdGggKyB1XSA9IHN1bSA9PT0gNSA/IDEgOiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMuc3VidHJhY3QgPSBmdW5jdGlvbihhSW1hZ2VXcmFwcGVyLCBiSW1hZ2VXcmFwcGVyLCByZXN1bHRJbWFnZVdyYXBwZXIpIHtcclxuICAgIGlmICghcmVzdWx0SW1hZ2VXcmFwcGVyKSB7XHJcbiAgICAgICAgcmVzdWx0SW1hZ2VXcmFwcGVyID0gYUltYWdlV3JhcHBlcjtcclxuICAgIH1cclxuICAgIHZhciBsZW5ndGggPSBhSW1hZ2VXcmFwcGVyLmRhdGEubGVuZ3RoLFxyXG4gICAgICAgIGFJbWFnZURhdGEgPSBhSW1hZ2VXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgYkltYWdlRGF0YSA9IGJJbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICBjSW1hZ2VEYXRhID0gcmVzdWx0SW1hZ2VXcmFwcGVyLmRhdGE7XHJcblxyXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XHJcbiAgICAgICAgY0ltYWdlRGF0YVtsZW5ndGhdID0gYUltYWdlRGF0YVtsZW5ndGhdIC0gYkltYWdlRGF0YVtsZW5ndGhdO1xyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5iaXR3aXNlT3IgPSBmdW5jdGlvbihhSW1hZ2VXcmFwcGVyLCBiSW1hZ2VXcmFwcGVyLCByZXN1bHRJbWFnZVdyYXBwZXIpIHtcclxuICAgIGlmICghcmVzdWx0SW1hZ2VXcmFwcGVyKSB7XHJcbiAgICAgICAgcmVzdWx0SW1hZ2VXcmFwcGVyID0gYUltYWdlV3JhcHBlcjtcclxuICAgIH1cclxuICAgIHZhciBsZW5ndGggPSBhSW1hZ2VXcmFwcGVyLmRhdGEubGVuZ3RoLFxyXG4gICAgICAgIGFJbWFnZURhdGEgPSBhSW1hZ2VXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgYkltYWdlRGF0YSA9IGJJbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICBjSW1hZ2VEYXRhID0gcmVzdWx0SW1hZ2VXcmFwcGVyLmRhdGE7XHJcblxyXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XHJcbiAgICAgICAgY0ltYWdlRGF0YVtsZW5ndGhdID0gYUltYWdlRGF0YVtsZW5ndGhdIHx8IGJJbWFnZURhdGFbbGVuZ3RoXTtcclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMuY291bnROb25aZXJvID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyKSB7XHJcbiAgICB2YXIgbGVuZ3RoID0gaW1hZ2VXcmFwcGVyLmRhdGEubGVuZ3RoLCBkYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGEsIHN1bSA9IDA7XHJcblxyXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XHJcbiAgICAgICAgc3VtICs9IGRhdGFbbGVuZ3RoXTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdW07XHJcbn07XHJcblxyXG5DVlV0aWxzLnRvcEdlbmVyaWMgPSBmdW5jdGlvbihsaXN0LCB0b3AsIHNjb3JlRnVuYykge1xyXG4gICAgdmFyIGksIG1pbklkeCA9IDAsIG1pbiA9IDAsIHF1ZXVlID0gW10sIHNjb3JlLCBoaXQsIHBvcztcclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IHRvcDsgaSsrKSB7XHJcbiAgICAgICAgcXVldWVbaV0gPSB7XHJcbiAgICAgICAgICAgIHNjb3JlOiAwLFxyXG4gICAgICAgICAgICBpdGVtOiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBzY29yZSA9IHNjb3JlRnVuYy5hcHBseSh0aGlzLCBbbGlzdFtpXV0pO1xyXG4gICAgICAgIGlmIChzY29yZSA+IG1pbikge1xyXG4gICAgICAgICAgICBoaXQgPSBxdWV1ZVttaW5JZHhdO1xyXG4gICAgICAgICAgICBoaXQuc2NvcmUgPSBzY29yZTtcclxuICAgICAgICAgICAgaGl0Lml0ZW0gPSBsaXN0W2ldO1xyXG4gICAgICAgICAgICBtaW4gPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG4gICAgICAgICAgICBmb3IgKCBwb3MgPSAwOyBwb3MgPCB0b3A7IHBvcysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocXVldWVbcG9zXS5zY29yZSA8IG1pbikge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IHF1ZXVlW3Bvc10uc2NvcmU7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluSWR4ID0gcG9zO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBxdWV1ZTtcclxufTtcclxuXHJcbkNWVXRpbHMuZ3JheUFycmF5RnJvbUltYWdlID0gZnVuY3Rpb24oaHRtbEltYWdlLCBvZmZzZXRYLCBjdHgsIGFycmF5KSB7XHJcbiAgICBjdHguZHJhd0ltYWdlKGh0bWxJbWFnZSwgb2Zmc2V0WCwgMCwgaHRtbEltYWdlLndpZHRoLCBodG1sSW1hZ2UuaGVpZ2h0KTtcclxuICAgIHZhciBjdHhEYXRhID0gY3R4LmdldEltYWdlRGF0YShvZmZzZXRYLCAwLCBodG1sSW1hZ2Uud2lkdGgsIGh0bWxJbWFnZS5oZWlnaHQpLmRhdGE7XHJcbiAgICBDVlV0aWxzLmNvbXB1dGVHcmF5KGN0eERhdGEsIGFycmF5KTtcclxufTtcclxuXHJcbkNWVXRpbHMuZ3JheUFycmF5RnJvbUNvbnRleHQgPSBmdW5jdGlvbihjdHgsIHNpemUsIG9mZnNldCwgYXJyYXkpIHtcclxuICAgIHZhciBjdHhEYXRhID0gY3R4LmdldEltYWdlRGF0YShvZmZzZXQueCwgb2Zmc2V0LnksIHNpemUueCwgc2l6ZS55KS5kYXRhO1xyXG4gICAgQ1ZVdGlscy5jb21wdXRlR3JheShjdHhEYXRhLCBhcnJheSk7XHJcbn07XHJcblxyXG5DVlV0aWxzLmdyYXlBbmRIYWxmU2FtcGxlRnJvbUNhbnZhc0RhdGEgPSBmdW5jdGlvbihjYW52YXNEYXRhLCBzaXplLCBvdXRBcnJheSkge1xyXG4gICAgdmFyIHRvcFJvd0lkeCA9IDA7XHJcbiAgICB2YXIgYm90dG9tUm93SWR4ID0gc2l6ZS54O1xyXG4gICAgdmFyIGVuZElkeCA9IE1hdGguZmxvb3IoY2FudmFzRGF0YS5sZW5ndGggLyA0KTtcclxuICAgIHZhciBvdXRXaWR0aCA9IHNpemUueCAvIDI7XHJcbiAgICB2YXIgb3V0SW1nSWR4ID0gMDtcclxuICAgIHZhciBpbldpZHRoID0gc2l6ZS54O1xyXG4gICAgdmFyIGk7XHJcblxyXG4gICAgd2hpbGUgKGJvdHRvbVJvd0lkeCA8IGVuZElkeCkge1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgb3V0V2lkdGg7IGkrKykge1xyXG4gICAgICAgICAgICBvdXRBcnJheVtvdXRJbWdJZHhdID0gTWF0aC5mbG9vcigoXHJcbiAgICAgICAgICAgICAgICAoMC4yOTkgKiBjYW52YXNEYXRhW3RvcFJvd0lkeCAqIDQgKyAwXSArXHJcbiAgICAgICAgICAgICAgICAgMC41ODcgKiBjYW52YXNEYXRhW3RvcFJvd0lkeCAqIDQgKyAxXSArXHJcbiAgICAgICAgICAgICAgICAgMC4xMTQgKiBjYW52YXNEYXRhW3RvcFJvd0lkeCAqIDQgKyAyXSkgK1xyXG4gICAgICAgICAgICAgICAgKDAuMjk5ICogY2FudmFzRGF0YVsodG9wUm93SWR4ICsgMSkgKiA0ICsgMF0gK1xyXG4gICAgICAgICAgICAgICAgIDAuNTg3ICogY2FudmFzRGF0YVsodG9wUm93SWR4ICsgMSkgKiA0ICsgMV0gK1xyXG4gICAgICAgICAgICAgICAgIDAuMTE0ICogY2FudmFzRGF0YVsodG9wUm93SWR4ICsgMSkgKiA0ICsgMl0pICtcclxuICAgICAgICAgICAgICAgICgwLjI5OSAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCkgKiA0ICsgMF0gK1xyXG4gICAgICAgICAgICAgICAgIDAuNTg3ICogY2FudmFzRGF0YVsoYm90dG9tUm93SWR4KSAqIDQgKyAxXSArXHJcbiAgICAgICAgICAgICAgICAgMC4xMTQgKiBjYW52YXNEYXRhWyhib3R0b21Sb3dJZHgpICogNCArIDJdKSArXHJcbiAgICAgICAgICAgICAgICAoMC4yOTkgKiBjYW52YXNEYXRhWyhib3R0b21Sb3dJZHggKyAxKSAqIDQgKyAwXSArXHJcbiAgICAgICAgICAgICAgICAgMC41ODcgKiBjYW52YXNEYXRhWyhib3R0b21Sb3dJZHggKyAxKSAqIDQgKyAxXSArXHJcbiAgICAgICAgICAgICAgICAgMC4xMTQgKiBjYW52YXNEYXRhWyhib3R0b21Sb3dJZHggKyAxKSAqIDQgKyAyXSkpIC8gNCk7XHJcbiAgICAgICAgICAgIG91dEltZ0lkeCsrO1xyXG4gICAgICAgICAgICB0b3BSb3dJZHggPSB0b3BSb3dJZHggKyAyO1xyXG4gICAgICAgICAgICBib3R0b21Sb3dJZHggPSBib3R0b21Sb3dJZHggKyAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0b3BSb3dJZHggPSB0b3BSb3dJZHggKyBpbldpZHRoO1xyXG4gICAgICAgIGJvdHRvbVJvd0lkeCA9IGJvdHRvbVJvd0lkeCArIGluV2lkdGg7XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLmNvbXB1dGVHcmF5ID0gZnVuY3Rpb24oaW1hZ2VEYXRhLCBvdXRBcnJheSwgY29uZmlnKSB7XHJcbiAgICB2YXIgbCA9IChpbWFnZURhdGEubGVuZ3RoIC8gNCkgfCAwLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgc2luZ2xlQ2hhbm5lbCA9IGNvbmZpZyAmJiBjb25maWcuc2luZ2xlQ2hhbm5lbCA9PT0gdHJ1ZTtcclxuXHJcbiAgICBpZiAoc2luZ2xlQ2hhbm5lbCkge1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgb3V0QXJyYXlbaV0gPSBpbWFnZURhdGFbaSAqIDQgKyAwXTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgb3V0QXJyYXlbaV0gPSBNYXRoLmZsb29yKFxyXG4gICAgICAgICAgICAgICAgMC4yOTkgKiBpbWFnZURhdGFbaSAqIDQgKyAwXSArIDAuNTg3ICogaW1hZ2VEYXRhW2kgKiA0ICsgMV0gKyAwLjExNCAqIGltYWdlRGF0YVtpICogNCArIDJdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLmxvYWRJbWFnZUFycmF5ID0gZnVuY3Rpb24oc3JjLCBjYWxsYmFjaywgY2FudmFzKSB7XHJcbiAgICBpZiAoIWNhbnZhcykge1xyXG4gICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgfVxyXG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgaW1nLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICBpbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY2FudmFzLndpZHRoID0gdGhpcy53aWR0aDtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcbiAgICAgICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcywgMCwgMCk7XHJcbiAgICAgICAgdmFyIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMsIDAsIDApO1xyXG4gICAgICAgIHZhciBkYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkuZGF0YTtcclxuICAgICAgICBDVlV0aWxzLmNvbXB1dGVHcmF5KGRhdGEsIGFycmF5KTtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrKGFycmF5LCB7XHJcbiAgICAgICAgICAgIHg6IHRoaXMud2lkdGgsXHJcbiAgICAgICAgICAgIHk6IHRoaXMuaGVpZ2h0XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9O1xyXG4gICAgaW1nLnNyYyA9IHNyYztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0gaW5JbWcge0ltYWdlV3JhcHBlcn0gaW5wdXQgaW1hZ2UgdG8gYmUgc2FtcGxlZFxyXG4gKiBAcGFyYW0gb3V0SW1nIHtJbWFnZVdyYXBwZXJ9IHRvIGJlIHN0b3JlZCBpblxyXG4gKi9cclxuQ1ZVdGlscy5oYWxmU2FtcGxlID0gZnVuY3Rpb24oaW5JbWdXcmFwcGVyLCBvdXRJbWdXcmFwcGVyKSB7XHJcbiAgICB2YXIgaW5JbWcgPSBpbkltZ1dyYXBwZXIuZGF0YTtcclxuICAgIHZhciBpbldpZHRoID0gaW5JbWdXcmFwcGVyLnNpemUueDtcclxuICAgIHZhciBvdXRJbWcgPSBvdXRJbWdXcmFwcGVyLmRhdGE7XHJcbiAgICB2YXIgdG9wUm93SWR4ID0gMDtcclxuICAgIHZhciBib3R0b21Sb3dJZHggPSBpbldpZHRoO1xyXG4gICAgdmFyIGVuZElkeCA9IGluSW1nLmxlbmd0aDtcclxuICAgIHZhciBvdXRXaWR0aCA9IGluV2lkdGggLyAyO1xyXG4gICAgdmFyIG91dEltZ0lkeCA9IDA7XHJcbiAgICB3aGlsZSAoYm90dG9tUm93SWR4IDwgZW5kSWR4KSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvdXRXaWR0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG91dEltZ1tvdXRJbWdJZHhdID0gTWF0aC5mbG9vcihcclxuICAgICAgICAgICAgICAgIChpbkltZ1t0b3BSb3dJZHhdICsgaW5JbWdbdG9wUm93SWR4ICsgMV0gKyBpbkltZ1tib3R0b21Sb3dJZHhdICsgaW5JbWdbYm90dG9tUm93SWR4ICsgMV0pIC8gNCk7XHJcbiAgICAgICAgICAgIG91dEltZ0lkeCsrO1xyXG4gICAgICAgICAgICB0b3BSb3dJZHggPSB0b3BSb3dJZHggKyAyO1xyXG4gICAgICAgICAgICBib3R0b21Sb3dJZHggPSBib3R0b21Sb3dJZHggKyAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0b3BSb3dJZHggPSB0b3BSb3dJZHggKyBpbldpZHRoO1xyXG4gICAgICAgIGJvdHRvbVJvd0lkeCA9IGJvdHRvbVJvd0lkeCArIGluV2lkdGg7XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLmhzdjJyZ2IgPSBmdW5jdGlvbihoc3YsIHJnYikge1xyXG4gICAgdmFyIGggPSBoc3ZbMF0sXHJcbiAgICAgICAgcyA9IGhzdlsxXSxcclxuICAgICAgICB2ID0gaHN2WzJdLFxyXG4gICAgICAgIGMgPSB2ICogcyxcclxuICAgICAgICB4ID0gYyAqICgxIC0gTWF0aC5hYnMoKGggLyA2MCkgJSAyIC0gMSkpLFxyXG4gICAgICAgIG0gPSB2IC0gYyxcclxuICAgICAgICByID0gMCxcclxuICAgICAgICBnID0gMCxcclxuICAgICAgICBiID0gMDtcclxuXHJcbiAgICByZ2IgPSByZ2IgfHwgWzAsIDAsIDBdO1xyXG5cclxuICAgIGlmIChoIDwgNjApIHtcclxuICAgICAgICByID0gYztcclxuICAgICAgICBnID0geDtcclxuICAgIH0gZWxzZSBpZiAoaCA8IDEyMCkge1xyXG4gICAgICAgIHIgPSB4O1xyXG4gICAgICAgIGcgPSBjO1xyXG4gICAgfSBlbHNlIGlmIChoIDwgMTgwKSB7XHJcbiAgICAgICAgZyA9IGM7XHJcbiAgICAgICAgYiA9IHg7XHJcbiAgICB9IGVsc2UgaWYgKGggPCAyNDApIHtcclxuICAgICAgICBnID0geDtcclxuICAgICAgICBiID0gYztcclxuICAgIH0gZWxzZSBpZiAoaCA8IDMwMCkge1xyXG4gICAgICAgIHIgPSB4O1xyXG4gICAgICAgIGIgPSBjO1xyXG4gICAgfSBlbHNlIGlmIChoIDwgMzYwKSB7XHJcbiAgICAgICAgciA9IGM7XHJcbiAgICAgICAgYiA9IHg7XHJcbiAgICB9XHJcbiAgICByZ2JbMF0gPSAoKHIgKyBtKSAqIDI1NSkgfCAwO1xyXG4gICAgcmdiWzFdID0gKChnICsgbSkgKiAyNTUpIHwgMDtcclxuICAgIHJnYlsyXSA9ICgoYiArIG0pICogMjU1KSB8IDA7XHJcbiAgICByZXR1cm4gcmdiO1xyXG59O1xyXG5cclxuQ1ZVdGlscy5fY29tcHV0ZURpdmlzb3JzID0gZnVuY3Rpb24obikge1xyXG4gICAgdmFyIGxhcmdlRGl2aXNvcnMgPSBbXSxcclxuICAgICAgICBkaXZpc29ycyA9IFtdLFxyXG4gICAgICAgIGk7XHJcblxyXG4gICAgZm9yIChpID0gMTsgaSA8IE1hdGguc3FydChuKSArIDE7IGkrKykge1xyXG4gICAgICAgIGlmIChuICUgaSA9PT0gMCkge1xyXG4gICAgICAgICAgICBkaXZpc29ycy5wdXNoKGkpO1xyXG4gICAgICAgICAgICBpZiAoaSAhPT0gbiAvIGkpIHtcclxuICAgICAgICAgICAgICAgIGxhcmdlRGl2aXNvcnMudW5zaGlmdChNYXRoLmZsb29yKG4gLyBpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGl2aXNvcnMuY29uY2F0KGxhcmdlRGl2aXNvcnMpO1xyXG59O1xyXG5cclxuQ1ZVdGlscy5fY29tcHV0ZUludGVyc2VjdGlvbiA9IGZ1bmN0aW9uKGFycjEsIGFycjIpIHtcclxuICAgIHZhciBpID0gMCxcclxuICAgICAgICBqID0gMCxcclxuICAgICAgICByZXN1bHQgPSBbXTtcclxuXHJcbiAgICB3aGlsZSAoaSA8IGFycjEubGVuZ3RoICYmIGogPCBhcnIyLmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChhcnIxW2ldID09PSBhcnIyW2pdKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGFycjFbaV0pO1xyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIGorKztcclxuICAgICAgICB9IGVsc2UgaWYgKGFycjFbaV0gPiBhcnIyW2pdKSB7XHJcbiAgICAgICAgICAgIGorKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbkNWVXRpbHMuY2FsY3VsYXRlUGF0Y2hTaXplID0gZnVuY3Rpb24ocGF0Y2hTaXplLCBpbWdTaXplKSB7XHJcbiAgICB2YXIgZGl2aXNvcnNYID0gdGhpcy5fY29tcHV0ZURpdmlzb3JzKGltZ1NpemUueCksXHJcbiAgICAgICAgZGl2aXNvcnNZID0gdGhpcy5fY29tcHV0ZURpdmlzb3JzKGltZ1NpemUueSksXHJcbiAgICAgICAgd2lkZVNpZGUgPSBNYXRoLm1heChpbWdTaXplLngsIGltZ1NpemUueSksXHJcbiAgICAgICAgY29tbW9uID0gdGhpcy5fY29tcHV0ZUludGVyc2VjdGlvbihkaXZpc29yc1gsIGRpdmlzb3JzWSksXHJcbiAgICAgICAgbnJPZlBhdGNoZXNMaXN0ID0gWzgsIDEwLCAxNSwgMjAsIDMyLCA2MCwgODBdLFxyXG4gICAgICAgIG5yT2ZQYXRjaGVzTWFwID0ge1xyXG4gICAgICAgICAgICBcIngtc21hbGxcIjogNSxcclxuICAgICAgICAgICAgXCJzbWFsbFwiOiA0LFxyXG4gICAgICAgICAgICBcIm1lZGl1bVwiOiAzLFxyXG4gICAgICAgICAgICBcImxhcmdlXCI6IDIsXHJcbiAgICAgICAgICAgIFwieC1sYXJnZVwiOiAxXHJcbiAgICAgICAgfSxcclxuICAgICAgICBuck9mUGF0Y2hlc0lkeCA9IG5yT2ZQYXRjaGVzTWFwW3BhdGNoU2l6ZV0gfHwgbnJPZlBhdGNoZXNNYXAubWVkaXVtLFxyXG4gICAgICAgIG5yT2ZQYXRjaGVzID0gbnJPZlBhdGNoZXNMaXN0W25yT2ZQYXRjaGVzSWR4XSxcclxuICAgICAgICBkZXNpcmVkUGF0Y2hTaXplID0gTWF0aC5mbG9vcih3aWRlU2lkZSAvIG5yT2ZQYXRjaGVzKSxcclxuICAgICAgICBvcHRpbWFsUGF0Y2hTaXplO1xyXG5cclxuICAgIGZ1bmN0aW9uIGZpbmRQYXRjaFNpemVGb3JEaXZpc29ycyhkaXZpc29ycykge1xyXG4gICAgICAgIHZhciBpID0gMCxcclxuICAgICAgICAgICAgZm91bmQgPSBkaXZpc29yc1tNYXRoLmZsb29yKGRpdmlzb3JzLmxlbmd0aCAvIDIpXTtcclxuXHJcbiAgICAgICAgd2hpbGUgKGkgPCAoZGl2aXNvcnMubGVuZ3RoIC0gMSkgJiYgZGl2aXNvcnNbaV0gPCBkZXNpcmVkUGF0Y2hTaXplKSB7XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGkgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhkaXZpc29yc1tpXSAtIGRlc2lyZWRQYXRjaFNpemUpID4gTWF0aC5hYnMoZGl2aXNvcnNbaSAtIDFdIC0gZGVzaXJlZFBhdGNoU2l6ZSkpIHtcclxuICAgICAgICAgICAgICAgIGZvdW5kID0gZGl2aXNvcnNbaSAtIDFdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm91bmQgPSBkaXZpc29yc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGVzaXJlZFBhdGNoU2l6ZSAvIGZvdW5kIDwgbnJPZlBhdGNoZXNMaXN0W25yT2ZQYXRjaGVzSWR4ICsgMV0gLyBuck9mUGF0Y2hlc0xpc3RbbnJPZlBhdGNoZXNJZHhdICYmXHJcbiAgICAgICAgICAgIGRlc2lyZWRQYXRjaFNpemUgLyBmb3VuZCA+IG5yT2ZQYXRjaGVzTGlzdFtuck9mUGF0Y2hlc0lkeCAtIDFdIC8gbnJPZlBhdGNoZXNMaXN0W25yT2ZQYXRjaGVzSWR4XSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHt4OiBmb3VuZCwgeTogZm91bmR9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBvcHRpbWFsUGF0Y2hTaXplID0gZmluZFBhdGNoU2l6ZUZvckRpdmlzb3JzKGNvbW1vbik7XHJcbiAgICBpZiAoIW9wdGltYWxQYXRjaFNpemUpIHtcclxuICAgICAgICBvcHRpbWFsUGF0Y2hTaXplID0gZmluZFBhdGNoU2l6ZUZvckRpdmlzb3JzKHRoaXMuX2NvbXB1dGVEaXZpc29ycyh3aWRlU2lkZSkpO1xyXG4gICAgICAgIGlmICghb3B0aW1hbFBhdGNoU2l6ZSkge1xyXG4gICAgICAgICAgICBvcHRpbWFsUGF0Y2hTaXplID0gZmluZFBhdGNoU2l6ZUZvckRpdmlzb3JzKCh0aGlzLl9jb21wdXRlRGl2aXNvcnMoZGVzaXJlZFBhdGNoU2l6ZSAqIG5yT2ZQYXRjaGVzKSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvcHRpbWFsUGF0Y2hTaXplO1xyXG59O1xyXG5cclxuQ1ZVdGlscy5fcGFyc2VDU1NEaW1lbnNpb25WYWx1ZXMgPSBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgdmFyIGRpbWVuc2lvbiA9IHtcclxuICAgICAgICB2YWx1ZTogcGFyc2VGbG9hdCh2YWx1ZSksXHJcbiAgICAgICAgdW5pdDogdmFsdWUuaW5kZXhPZihcIiVcIikgPT09IHZhbHVlLmxlbmd0aCAtIDEgPyBcIiVcIiA6IFwiJVwiXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBkaW1lbnNpb247XHJcbn07XHJcblxyXG5DVlV0aWxzLl9kaW1lbnNpb25zQ29udmVydGVycyA9IHtcclxuICAgIHRvcDogZnVuY3Rpb24oZGltZW5zaW9uLCBjb250ZXh0KSB7XHJcbiAgICAgICAgaWYgKGRpbWVuc2lvbi51bml0ID09PSBcIiVcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihjb250ZXh0LmhlaWdodCAqIChkaW1lbnNpb24udmFsdWUgLyAxMDApKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmlnaHQ6IGZ1bmN0aW9uKGRpbWVuc2lvbiwgY29udGV4dCkge1xyXG4gICAgICAgIGlmIChkaW1lbnNpb24udW5pdCA9PT0gXCIlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoY29udGV4dC53aWR0aCAtIChjb250ZXh0LndpZHRoICogKGRpbWVuc2lvbi52YWx1ZSAvIDEwMCkpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYm90dG9tOiBmdW5jdGlvbihkaW1lbnNpb24sIGNvbnRleHQpIHtcclxuICAgICAgICBpZiAoZGltZW5zaW9uLnVuaXQgPT09IFwiJVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKGNvbnRleHQuaGVpZ2h0IC0gKGNvbnRleHQuaGVpZ2h0ICogKGRpbWVuc2lvbi52YWx1ZSAvIDEwMCkpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbGVmdDogZnVuY3Rpb24oZGltZW5zaW9uLCBjb250ZXh0KSB7XHJcbiAgICAgICAgaWYgKGRpbWVuc2lvbi51bml0ID09PSBcIiVcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihjb250ZXh0LndpZHRoICogKGRpbWVuc2lvbi52YWx1ZSAvIDEwMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMuY29tcHV0ZUltYWdlQXJlYSA9IGZ1bmN0aW9uKGlucHV0V2lkdGgsIGlucHV0SGVpZ2h0LCBhcmVhKSB7XHJcbiAgICB2YXIgY29udGV4dCA9IHt3aWR0aDogaW5wdXRXaWR0aCwgaGVpZ2h0OiBpbnB1dEhlaWdodH07XHJcblxyXG4gICAgdmFyIHBhcnNlZEFyZWEgPSBPYmplY3Qua2V5cyhhcmVhKS5yZWR1Y2UoZnVuY3Rpb24ocmVzdWx0LCBrZXkpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBhcmVhW2tleV0sXHJcbiAgICAgICAgICAgIHBhcnNlZCA9IENWVXRpbHMuX3BhcnNlQ1NTRGltZW5zaW9uVmFsdWVzKHZhbHVlKSxcclxuICAgICAgICAgICAgY2FsY3VsYXRlZCA9IENWVXRpbHMuX2RpbWVuc2lvbnNDb252ZXJ0ZXJzW2tleV0ocGFyc2VkLCBjb250ZXh0KTtcclxuXHJcbiAgICAgICAgcmVzdWx0W2tleV0gPSBjYWxjdWxhdGVkO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9LCB7fSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzeDogcGFyc2VkQXJlYS5sZWZ0LFxyXG4gICAgICAgIHN5OiBwYXJzZWRBcmVhLnRvcCxcclxuICAgICAgICBzdzogcGFyc2VkQXJlYS5yaWdodCAtIHBhcnNlZEFyZWEubGVmdCxcclxuICAgICAgICBzaDogcGFyc2VkQXJlYS5ib3R0b20gLSBwYXJzZWRBcmVhLnRvcFxyXG4gICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENWVXRpbHM7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2N2X3V0aWxzLmpzXG4gKiovIiwiaW1wb3J0IHt2ZWMyfSBmcm9tICdnbC1tYXRyaXgnO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgY2x1c3RlciBmb3IgZ3JvdXBpbmcgc2ltaWxhciBvcmllbnRhdGlvbnMgb2YgZGF0YXBvaW50c1xyXG4gICAgICovXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNyZWF0ZTogZnVuY3Rpb24ocG9pbnQsIHRocmVzaG9sZCkge1xyXG4gICAgICAgIHZhciBwb2ludHMgPSBbXSxcclxuICAgICAgICAgICAgY2VudGVyID0ge1xyXG4gICAgICAgICAgICAgICAgcmFkOiAwLFxyXG4gICAgICAgICAgICAgICAgdmVjOiB2ZWMyLmNsb25lKFswLCAwXSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcG9pbnRNYXAgPSB7fTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgYWRkKHBvaW50KTtcclxuICAgICAgICAgICAgdXBkYXRlQ2VudGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGQocG9pbnRUb0FkZCkge1xyXG4gICAgICAgICAgICBwb2ludE1hcFtwb2ludFRvQWRkLmlkXSA9IHBvaW50VG9BZGQ7XHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKHBvaW50VG9BZGQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlQ2VudGVyKCkge1xyXG4gICAgICAgICAgICB2YXIgaSwgc3VtID0gMDtcclxuICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHN1bSArPSBwb2ludHNbaV0ucmFkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNlbnRlci5yYWQgPSBzdW0gLyBwb2ludHMubGVuZ3RoO1xyXG4gICAgICAgICAgICBjZW50ZXIudmVjID0gdmVjMi5jbG9uZShbTWF0aC5jb3MoY2VudGVyLnJhZCksIE1hdGguc2luKGNlbnRlci5yYWQpXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFkZDogZnVuY3Rpb24ocG9pbnRUb0FkZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFwb2ludE1hcFtwb2ludFRvQWRkLmlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZChwb2ludFRvQWRkKTtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDZW50ZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZml0czogZnVuY3Rpb24ob3RoZXJQb2ludCkge1xyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgY29zaW5lIHNpbWlsYXJpdHkgdG8gY2VudGVyLWFuZ2xlXHJcbiAgICAgICAgICAgICAgICB2YXIgc2ltaWxhcml0eSA9IE1hdGguYWJzKHZlYzIuZG90KG90aGVyUG9pbnQucG9pbnQudmVjLCBjZW50ZXIudmVjKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2ltaWxhcml0eSA+IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRQb2ludHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0Q2VudGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjZW50ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGNyZWF0ZVBvaW50OiBmdW5jdGlvbihuZXdQb2ludCwgaWQsIHByb3BlcnR5KSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmFkOiBuZXdQb2ludFtwcm9wZXJ0eV0sXHJcbiAgICAgICAgICAgIHBvaW50OiBuZXdQb2ludCxcclxuICAgICAgICAgICAgaWQ6IGlkXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvY2x1c3Rlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdsLW1hdHJpeFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZ2wtbWF0cml4XCJcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBpbml0OiBmdW5jdGlvbihhcnIsIHZhbCkge1xyXG4gICAgICAgIHZhciBsID0gYXJyLmxlbmd0aDtcclxuICAgICAgICB3aGlsZSAobC0tKSB7XHJcbiAgICAgICAgICAgIGFycltsXSA9IHZhbDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2h1ZmZsZXMgdGhlIGNvbnRlbnQgb2YgYW4gYXJyYXlcclxuICAgICAqIEByZXR1cm4ge0FycmF5fSB0aGUgYXJyYXkgaXRzZWxmIHNodWZmbGVkXHJcbiAgICAgKi9cclxuICAgIHNodWZmbGU6IGZ1bmN0aW9uKGFycikge1xyXG4gICAgICAgIHZhciBpID0gYXJyLmxlbmd0aCAtIDEsIGosIHg7XHJcbiAgICAgICAgZm9yIChpOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSk7XHJcbiAgICAgICAgICAgIHggPSBhcnJbaV07XHJcbiAgICAgICAgICAgIGFycltpXSA9IGFycltqXTtcclxuICAgICAgICAgICAgYXJyW2pdID0geDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH0sXHJcblxyXG4gICAgdG9Qb2ludExpc3Q6IGZ1bmN0aW9uKGFycikge1xyXG4gICAgICAgIHZhciBpLCBqLCByb3cgPSBbXSwgcm93cyA9IFtdO1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJvdyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IGFycltpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgcm93W2pdID0gYXJyW2ldW2pdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJvd3NbaV0gPSBcIltcIiArIHJvdy5qb2luKFwiLFwiKSArIFwiXVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJbXCIgKyByb3dzLmpvaW4oXCIsXFxyXFxuXCIpICsgXCJdXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0dXJucyB0aGUgZWxlbWVudHMgd2hpY2gncyBzY29yZSBpcyBiaWdnZXIgdGhhbiB0aGUgdGhyZXNob2xkXHJcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gdGhlIHJlZHVjZWQgYXJyYXlcclxuICAgICAqL1xyXG4gICAgdGhyZXNob2xkOiBmdW5jdGlvbihhcnIsIHRocmVzaG9sZCwgc2NvcmVGdW5jKSB7XHJcbiAgICAgICAgdmFyIGksIHF1ZXVlID0gW107XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHNjb3JlRnVuYy5hcHBseShhcnIsIFthcnJbaV1dKSA+PSB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goYXJyW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcXVldWU7XHJcbiAgICB9LFxyXG5cclxuICAgIG1heEluZGV4OiBmdW5jdGlvbihhcnIpIHtcclxuICAgICAgICB2YXIgaSwgbWF4ID0gMDtcclxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYXJyW2ldID4gYXJyW21heF0pIHtcclxuICAgICAgICAgICAgICAgIG1heCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1heDtcclxuICAgIH0sXHJcblxyXG4gICAgbWF4OiBmdW5jdGlvbihhcnIpIHtcclxuICAgICAgICB2YXIgaSwgbWF4ID0gMDtcclxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYXJyW2ldID4gbWF4KSB7XHJcbiAgICAgICAgICAgICAgICBtYXggPSBhcnJbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1heDtcclxuICAgIH0sXHJcblxyXG4gICAgc3VtOiBmdW5jdGlvbihhcnIpIHtcclxuICAgICAgICB2YXIgbGVuZ3RoID0gYXJyLmxlbmd0aCxcclxuICAgICAgICAgICAgc3VtID0gMDtcclxuXHJcbiAgICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XHJcbiAgICAgICAgICAgIHN1bSArPSBhcnJbbGVuZ3RoXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1bTtcclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvYXJyYXlfaGVscGVyLmpzXG4gKiovIiwiaW1wb3J0IEltYWdlV3JhcHBlciBmcm9tICcuL2ltYWdlX3dyYXBwZXInO1xyXG5pbXBvcnQgQ1ZVdGlscyBmcm9tICcuL2N2X3V0aWxzJztcclxuaW1wb3J0IFJhc3Rlcml6ZXIgZnJvbSAnLi9yYXN0ZXJpemVyJztcclxuaW1wb3J0IFRyYWNlciBmcm9tICcuL3RyYWNlcic7XHJcbmltcG9ydCBza2VsZXRvbml6ZXIgZnJvbSAnLi9za2VsZXRvbml6ZXInO1xyXG5pbXBvcnQgQXJyYXlIZWxwZXIgZnJvbSAnLi9hcnJheV9oZWxwZXInO1xyXG5pbXBvcnQgSW1hZ2VEZWJ1ZyBmcm9tICcuL2ltYWdlX2RlYnVnJztcclxuaW1wb3J0IGdsTWF0cml4IGZyb20gJ2dsLW1hdHJpeCc7XHJcblxyXG52YXIgX2NvbmZpZyxcclxuICAgIF9jdXJyZW50SW1hZ2VXcmFwcGVyLFxyXG4gICAgX3NrZWxJbWFnZVdyYXBwZXIsXHJcbiAgICBfc3ViSW1hZ2VXcmFwcGVyLFxyXG4gICAgX2xhYmVsSW1hZ2VXcmFwcGVyLFxyXG4gICAgX3BhdGNoR3JpZCxcclxuICAgIF9wYXRjaExhYmVsR3JpZCxcclxuICAgIF9pbWFnZVRvUGF0Y2hHcmlkLFxyXG4gICAgX2JpbmFyeUltYWdlV3JhcHBlcixcclxuICAgIF9wYXRjaFNpemUsXHJcbiAgICBfY2FudmFzQ29udGFpbmVyID0ge1xyXG4gICAgICAgIGN0eDoge1xyXG4gICAgICAgICAgICBiaW5hcnk6IG51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRvbToge1xyXG4gICAgICAgICAgICBiaW5hcnk6IG51bGxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgX251bVBhdGNoZXMgPSB7eDogMCwgeTogMH0sXHJcbiAgICBfaW5wdXRJbWFnZVdyYXBwZXIsXHJcbiAgICBfc2tlbGV0b25pemVyLFxyXG4gICAgdmVjMiA9IGdsTWF0cml4LnZlYzIsXHJcbiAgICBtYXQyID0gZ2xNYXRyaXgubWF0MjtcclxuXHJcbmZ1bmN0aW9uIGluaXRCdWZmZXJzKCkge1xyXG4gICAgdmFyIHNrZWxldG9uSW1hZ2VEYXRhO1xyXG5cclxuICAgIGlmIChfY29uZmlnLmhhbGZTYW1wbGUpIHtcclxuICAgICAgICBfY3VycmVudEltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoe1xyXG4gICAgICAgICAgICB4OiBfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS54IC8gMiB8IDAsXHJcbiAgICAgICAgICAgIHk6IF9pbnB1dEltYWdlV3JhcHBlci5zaXplLnkgLyAyIHwgMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBfY3VycmVudEltYWdlV3JhcHBlciA9IF9pbnB1dEltYWdlV3JhcHBlcjtcclxuICAgIH1cclxuXHJcbiAgICBfcGF0Y2hTaXplID0gQ1ZVdGlscy5jYWxjdWxhdGVQYXRjaFNpemUoX2NvbmZpZy5wYXRjaFNpemUsIF9jdXJyZW50SW1hZ2VXcmFwcGVyLnNpemUpO1xyXG5cclxuICAgIF9udW1QYXRjaGVzLnggPSBfY3VycmVudEltYWdlV3JhcHBlci5zaXplLnggLyBfcGF0Y2hTaXplLnggfCAwO1xyXG4gICAgX251bVBhdGNoZXMueSA9IF9jdXJyZW50SW1hZ2VXcmFwcGVyLnNpemUueSAvIF9wYXRjaFNpemUueSB8IDA7XHJcblxyXG4gICAgX2JpbmFyeUltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoX2N1cnJlbnRJbWFnZVdyYXBwZXIuc2l6ZSwgdW5kZWZpbmVkLCBVaW50OEFycmF5LCBmYWxzZSk7XHJcblxyXG4gICAgX2xhYmVsSW1hZ2VXcmFwcGVyID0gbmV3IEltYWdlV3JhcHBlcihfcGF0Y2hTaXplLCB1bmRlZmluZWQsIEFycmF5LCB0cnVlKTtcclxuXHJcbiAgICBza2VsZXRvbkltYWdlRGF0YSA9IG5ldyBBcnJheUJ1ZmZlcig2NCAqIDEwMjQpO1xyXG4gICAgX3N1YkltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoX3BhdGNoU2l6ZSxcclxuICAgICAgICBuZXcgVWludDhBcnJheShza2VsZXRvbkltYWdlRGF0YSwgMCwgX3BhdGNoU2l6ZS54ICogX3BhdGNoU2l6ZS55KSk7XHJcbiAgICBfc2tlbEltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoX3BhdGNoU2l6ZSxcclxuICAgICAgICBuZXcgVWludDhBcnJheShza2VsZXRvbkltYWdlRGF0YSwgX3BhdGNoU2l6ZS54ICogX3BhdGNoU2l6ZS55ICogMywgX3BhdGNoU2l6ZS54ICogX3BhdGNoU2l6ZS55KSxcclxuICAgICAgICB1bmRlZmluZWQsIHRydWUpO1xyXG4gICAgX3NrZWxldG9uaXplciA9IHNrZWxldG9uaXplcigodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpID8gd2luZG93IDogKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgPyBzZWxmIDogZ2xvYmFsLCB7XHJcbiAgICAgICAgc2l6ZTogX3BhdGNoU2l6ZS54XHJcbiAgICB9LCBza2VsZXRvbkltYWdlRGF0YSk7XHJcblxyXG4gICAgX2ltYWdlVG9QYXRjaEdyaWQgPSBuZXcgSW1hZ2VXcmFwcGVyKHtcclxuICAgICAgICB4OiAoX2N1cnJlbnRJbWFnZVdyYXBwZXIuc2l6ZS54IC8gX3N1YkltYWdlV3JhcHBlci5zaXplLngpIHwgMCxcclxuICAgICAgICB5OiAoX2N1cnJlbnRJbWFnZVdyYXBwZXIuc2l6ZS55IC8gX3N1YkltYWdlV3JhcHBlci5zaXplLnkpIHwgMFxyXG4gICAgfSwgdW5kZWZpbmVkLCBBcnJheSwgdHJ1ZSk7XHJcbiAgICBfcGF0Y2hHcmlkID0gbmV3IEltYWdlV3JhcHBlcihfaW1hZ2VUb1BhdGNoR3JpZC5zaXplLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSk7XHJcbiAgICBfcGF0Y2hMYWJlbEdyaWQgPSBuZXcgSW1hZ2VXcmFwcGVyKF9pbWFnZVRvUGF0Y2hHcmlkLnNpemUsIHVuZGVmaW5lZCwgSW50MzJBcnJheSwgdHJ1ZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRDYW52YXMoKSB7XHJcbiAgICBpZiAoX2NvbmZpZy51c2VXb3JrZXIgfHwgdHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkuY2xhc3NOYW1lID0gXCJiaW5hcnlCdWZmZXJcIjtcclxuICAgIGlmIChfY29uZmlnLnNob3dDYW52YXMgPT09IHRydWUpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlYnVnXCIpLmFwcGVuZENoaWxkKF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeSk7XHJcbiAgICB9XHJcbiAgICBfY2FudmFzQ29udGFpbmVyLmN0eC5iaW5hcnkgPSBfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5LndpZHRoID0gX2JpbmFyeUltYWdlV3JhcHBlci5zaXplLng7XHJcbiAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkuaGVpZ2h0ID0gX2JpbmFyeUltYWdlV3JhcHBlci5zaXplLnk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgYm91bmRpbmcgYm94IHdoaWNoIGVuY2xvc2VzIGFsbCB0aGUgZ2l2ZW4gcGF0Y2hlc1xyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBtaW5pbWFsIGJvdW5kaW5nIGJveFxyXG4gKi9cclxuZnVuY3Rpb24gYm94RnJvbVBhdGNoZXMocGF0Y2hlcykge1xyXG4gICAgdmFyIG92ZXJBdmcsXHJcbiAgICAgICAgaSxcclxuICAgICAgICBqLFxyXG4gICAgICAgIHBhdGNoLFxyXG4gICAgICAgIHRyYW5zTWF0LFxyXG4gICAgICAgIG1pbnggPVxyXG4gICAgICAgIF9iaW5hcnlJbWFnZVdyYXBwZXIuc2l6ZS54LFxyXG4gICAgICAgIG1pbnkgPSBfYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueSxcclxuICAgICAgICBtYXh4ID0gLV9iaW5hcnlJbWFnZVdyYXBwZXIuc2l6ZS54LFxyXG4gICAgICAgIG1heHkgPSAtX2JpbmFyeUltYWdlV3JhcHBlci5zaXplLnksXHJcbiAgICAgICAgYm94LFxyXG4gICAgICAgIHNjYWxlO1xyXG5cclxuICAgIC8vIGRyYXcgYWxsIHBhdGNoZXMgd2hpY2ggYXJlIHRvIGJlIHRha2VuIGludG8gY29uc2lkZXJhdGlvblxyXG4gICAgb3ZlckF2ZyA9IDA7XHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IHBhdGNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwYXRjaCA9IHBhdGNoZXNbaV07XHJcbiAgICAgICAgb3ZlckF2ZyArPSBwYXRjaC5yYWQ7XHJcbiAgICAgICAgaWYgKF9jb25maWcuc2hvd1BhdGNoZXMpIHtcclxuICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UmVjdChwYXRjaC5wb3MsIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LCB7Y29sb3I6IFwicmVkXCJ9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb3ZlckF2ZyAvPSBwYXRjaGVzLmxlbmd0aDtcclxuICAgIG92ZXJBdmcgPSAob3ZlckF2ZyAqIDE4MCAvIE1hdGguUEkgKyA5MCkgJSAxODAgLSA5MDtcclxuICAgIGlmIChvdmVyQXZnIDwgMCkge1xyXG4gICAgICAgIG92ZXJBdmcgKz0gMTgwO1xyXG4gICAgfVxyXG5cclxuICAgIG92ZXJBdmcgPSAoMTgwIC0gb3ZlckF2ZykgKiBNYXRoLlBJIC8gMTgwO1xyXG4gICAgdHJhbnNNYXQgPSBtYXQyLmNsb25lKFtNYXRoLmNvcyhvdmVyQXZnKSwgTWF0aC5zaW4ob3ZlckF2ZyksIC1NYXRoLnNpbihvdmVyQXZnKSwgTWF0aC5jb3Mob3ZlckF2ZyldKTtcclxuXHJcbiAgICAvLyBpdGVyYXRlIG92ZXIgcGF0Y2hlcyBhbmQgcm90YXRlIGJ5IGFuZ2xlXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IHBhdGNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwYXRjaCA9IHBhdGNoZXNbaV07XHJcbiAgICAgICAgZm9yICggaiA9IDA7IGogPCA0OyBqKyspIHtcclxuICAgICAgICAgICAgdmVjMi50cmFuc2Zvcm1NYXQyKHBhdGNoLmJveFtqXSwgcGF0Y2guYm94W2pdLCB0cmFuc01hdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoX2NvbmZpZy5ib3hGcm9tUGF0Y2hlcy5zaG93VHJhbnNmb3JtZWQpIHtcclxuICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UGF0aChwYXRjaC5ib3gsIHt4OiAwLCB5OiAxfSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LCB7Y29sb3I6ICcjOTlmZjAwJywgbGluZVdpZHRoOiAyfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGZpbmQgYm91bmRpbmcgYm94XHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IHBhdGNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwYXRjaCA9IHBhdGNoZXNbaV07XHJcbiAgICAgICAgZm9yICggaiA9IDA7IGogPCA0OyBqKyspIHtcclxuICAgICAgICAgICAgaWYgKHBhdGNoLmJveFtqXVswXSA8IG1pbngpIHtcclxuICAgICAgICAgICAgICAgIG1pbnggPSBwYXRjaC5ib3hbal1bMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhdGNoLmJveFtqXVswXSA+IG1heHgpIHtcclxuICAgICAgICAgICAgICAgIG1heHggPSBwYXRjaC5ib3hbal1bMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhdGNoLmJveFtqXVsxXSA8IG1pbnkpIHtcclxuICAgICAgICAgICAgICAgIG1pbnkgPSBwYXRjaC5ib3hbal1bMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhdGNoLmJveFtqXVsxXSA+IG1heHkpIHtcclxuICAgICAgICAgICAgICAgIG1heHkgPSBwYXRjaC5ib3hbal1bMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYm94ID0gW1ttaW54LCBtaW55XSwgW21heHgsIG1pbnldLCBbbWF4eCwgbWF4eV0sIFttaW54LCBtYXh5XV07XHJcblxyXG4gICAgaWYgKF9jb25maWcuYm94RnJvbVBhdGNoZXMuc2hvd1RyYW5zZm9ybWVkQm94KSB7XHJcbiAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UGF0aChib3gsIHt4OiAwLCB5OiAxfSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LCB7Y29sb3I6ICcjZmYwMDAwJywgbGluZVdpZHRoOiAyfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2NhbGUgPSBfY29uZmlnLmhhbGZTYW1wbGUgPyAyIDogMTtcclxuICAgIC8vIHJldmVyc2Ugcm90YXRpb247XHJcbiAgICB0cmFuc01hdCA9IG1hdDIuaW52ZXJ0KHRyYW5zTWF0LCB0cmFuc01hdCk7XHJcbiAgICBmb3IgKCBqID0gMDsgaiA8IDQ7IGorKykge1xyXG4gICAgICAgIHZlYzIudHJhbnNmb3JtTWF0Mihib3hbal0sIGJveFtqXSwgdHJhbnNNYXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfY29uZmlnLmJveEZyb21QYXRjaGVzLnNob3dCQikge1xyXG4gICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgoYm94LCB7eDogMCwgeTogMX0sIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSwge2NvbG9yOiAnI2ZmMDAwMCcsIGxpbmVXaWR0aDogMn0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgdmVjMi5zY2FsZShib3hbal0sIGJveFtqXSwgc2NhbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBib3g7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgYmluYXJ5IGltYWdlIG9mIHRoZSBjdXJyZW50IGltYWdlXHJcbiAqL1xyXG5mdW5jdGlvbiBiaW5hcml6ZUltYWdlKCkge1xyXG4gICAgQ1ZVdGlscy5vdHN1VGhyZXNob2xkKF9jdXJyZW50SW1hZ2VXcmFwcGVyLCBfYmluYXJ5SW1hZ2VXcmFwcGVyKTtcclxuICAgIF9iaW5hcnlJbWFnZVdyYXBwZXIuemVyb0JvcmRlcigpO1xyXG4gICAgaWYgKF9jb25maWcuc2hvd0NhbnZhcykge1xyXG4gICAgICAgIF9iaW5hcnlJbWFnZVdyYXBwZXIuc2hvdyhfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnksIDI1NSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJdGVyYXRlIG92ZXIgdGhlIGVudGlyZSBpbWFnZVxyXG4gKiBleHRyYWN0IHBhdGNoZXNcclxuICovXHJcbmZ1bmN0aW9uIGZpbmRQYXRjaGVzKCkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgaixcclxuICAgICAgICB4LFxyXG4gICAgICAgIHksXHJcbiAgICAgICAgbW9tZW50cyxcclxuICAgICAgICBwYXRjaGVzRm91bmQgPSBbXSxcclxuICAgICAgICByYXN0ZXJpemVyLFxyXG4gICAgICAgIHJhc3RlclJlc3VsdCxcclxuICAgICAgICBwYXRjaDtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBfbnVtUGF0Y2hlcy54OyBpKyspIHtcclxuICAgICAgICBmb3IgKGogPSAwOyBqIDwgX251bVBhdGNoZXMueTsgaisrKSB7XHJcbiAgICAgICAgICAgIHggPSBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueCAqIGk7XHJcbiAgICAgICAgICAgIHkgPSBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueSAqIGo7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXBlcmF0ZSBwYXJ0c1xyXG4gICAgICAgICAgICBza2VsZXRvbml6ZSh4LCB5KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJhc3Rlcml6ZSwgZmluZCBpbmRpdmlkdWFsIGJhcnNcclxuICAgICAgICAgICAgX3NrZWxJbWFnZVdyYXBwZXIuemVyb0JvcmRlcigpO1xyXG4gICAgICAgICAgICBBcnJheUhlbHBlci5pbml0KF9sYWJlbEltYWdlV3JhcHBlci5kYXRhLCAwKTtcclxuICAgICAgICAgICAgcmFzdGVyaXplciA9IFJhc3Rlcml6ZXIuY3JlYXRlKF9za2VsSW1hZ2VXcmFwcGVyLCBfbGFiZWxJbWFnZVdyYXBwZXIpO1xyXG4gICAgICAgICAgICByYXN0ZXJSZXN1bHQgPSByYXN0ZXJpemVyLnJhc3Rlcml6ZSgwKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfY29uZmlnLnNob3dMYWJlbHMpIHtcclxuICAgICAgICAgICAgICAgIF9sYWJlbEltYWdlV3JhcHBlci5vdmVybGF5KF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeSwgTWF0aC5mbG9vcigzNjAgLyByYXN0ZXJSZXN1bHQuY291bnQpLFxyXG4gICAgICAgICAgICAgICAgICAgIHt4OiB4LCB5OiB5fSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSBtb21lbnRzIGZyb20gdGhlIHNrZWxldG9uaXplZCBwYXRjaFxyXG4gICAgICAgICAgICBtb21lbnRzID0gX2xhYmVsSW1hZ2VXcmFwcGVyLm1vbWVudHMocmFzdGVyUmVzdWx0LmNvdW50KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGV4dHJhY3QgZWxpZ2libGUgcGF0Y2hlc1xyXG4gICAgICAgICAgICBwYXRjaGVzRm91bmQgPSBwYXRjaGVzRm91bmQuY29uY2F0KGRlc2NyaWJlUGF0Y2gobW9tZW50cywgW2ksIGpdLCB4LCB5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChfY29uZmlnLnNob3dGb3VuZFBhdGNoZXMpIHtcclxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IHBhdGNoZXNGb3VuZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBwYXRjaCA9IHBhdGNoZXNGb3VuZFtpXTtcclxuICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UmVjdChwYXRjaC5wb3MsIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LFxyXG4gICAgICAgICAgICAgICAge2NvbG9yOiBcIiM5OWZmMDBcIiwgbGluZVdpZHRoOiAyfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwYXRjaGVzRm91bmQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaW5kcyB0aG9zZSBjb25uZWN0ZWQgYXJlYXMgd2hpY2ggY29udGFpbiBhdCBsZWFzdCA2IHBhdGNoZXNcclxuICogYW5kIHJldHVybnMgdGhlbSBvcmRlcmVkIERFU0MgYnkgdGhlIG51bWJlciBvZiBjb250YWluZWQgcGF0Y2hlc1xyXG4gKiBAcGFyYW0ge051bWJlcn0gbWF4TGFiZWxcclxuICovXHJcbmZ1bmN0aW9uIGZpbmRCaWdnZXN0Q29ubmVjdGVkQXJlYXMobWF4TGFiZWwpe1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc3VtLFxyXG4gICAgICAgIGxhYmVsSGlzdCA9IFtdLFxyXG4gICAgICAgIHRvcExhYmVscyA9IFtdO1xyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgbWF4TGFiZWw7IGkrKykge1xyXG4gICAgICAgIGxhYmVsSGlzdC5wdXNoKDApO1xyXG4gICAgfVxyXG4gICAgc3VtID0gX3BhdGNoTGFiZWxHcmlkLmRhdGEubGVuZ3RoO1xyXG4gICAgd2hpbGUgKHN1bS0tKSB7XHJcbiAgICAgICAgaWYgKF9wYXRjaExhYmVsR3JpZC5kYXRhW3N1bV0gPiAwKSB7XHJcbiAgICAgICAgICAgIGxhYmVsSGlzdFtfcGF0Y2hMYWJlbEdyaWQuZGF0YVtzdW1dIC0gMV0rKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGFiZWxIaXN0ID0gbGFiZWxIaXN0Lm1hcChmdW5jdGlvbih2YWwsIGlkeCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbDogdmFsLFxyXG4gICAgICAgICAgICBsYWJlbDogaWR4ICsgMVxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICBsYWJlbEhpc3Quc29ydChmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIGIudmFsIC0gYS52YWw7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBleHRyYWN0IHRvcCBhcmVhcyB3aXRoIGF0IGxlYXN0IDYgcGF0Y2hlcyBwcmVzZW50XHJcbiAgICB0b3BMYWJlbHMgPSBsYWJlbEhpc3QuZmlsdGVyKGZ1bmN0aW9uKGVsKSB7XHJcbiAgICAgICAgcmV0dXJuIGVsLnZhbCA+PSA1O1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRvcExhYmVscztcclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBmaW5kQm94ZXModG9wTGFiZWxzLCBtYXhMYWJlbCkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgaixcclxuICAgICAgICBzdW0sXHJcbiAgICAgICAgcGF0Y2hlcyA9IFtdLFxyXG4gICAgICAgIHBhdGNoLFxyXG4gICAgICAgIGJveCxcclxuICAgICAgICBib3hlcyA9IFtdLFxyXG4gICAgICAgIGhzdiA9IFswLCAxLCAxXSxcclxuICAgICAgICByZ2IgPSBbMCwgMCwgMF07XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCB0b3BMYWJlbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBzdW0gPSBfcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgcGF0Y2hlcy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHdoaWxlIChzdW0tLSkge1xyXG4gICAgICAgICAgICBpZiAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbc3VtXSA9PT0gdG9wTGFiZWxzW2ldLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRjaCA9IF9pbWFnZVRvUGF0Y2hHcmlkLmRhdGFbc3VtXTtcclxuICAgICAgICAgICAgICAgIHBhdGNoZXMucHVzaChwYXRjaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYm94ID0gYm94RnJvbVBhdGNoZXMocGF0Y2hlcyk7XHJcbiAgICAgICAgaWYgKGJveCkge1xyXG4gICAgICAgICAgICBib3hlcy5wdXNoKGJveCk7XHJcblxyXG4gICAgICAgICAgICAvLyBkcmF3IHBhdGNoLWxhYmVscyBpZiByZXF1ZXN0ZWRcclxuICAgICAgICAgICAgaWYgKF9jb25maWcuc2hvd1JlbWFpbmluZ1BhdGNoTGFiZWxzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IHBhdGNoZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRjaCA9IHBhdGNoZXNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgaHN2WzBdID0gKHRvcExhYmVsc1tpXS5sYWJlbCAvIChtYXhMYWJlbCArIDEpKSAqIDM2MDtcclxuICAgICAgICAgICAgICAgICAgICBDVlV0aWxzLmhzdjJyZ2IoaHN2LCByZ2IpO1xyXG4gICAgICAgICAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1JlY3QocGF0Y2gucG9zLCBfc3ViSW1hZ2VXcmFwcGVyLnNpemUsIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge2NvbG9yOiBcInJnYihcIiArIHJnYi5qb2luKFwiLFwiKSArIFwiKVwiLCBsaW5lV2lkdGg6IDJ9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBib3hlcztcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmQgc2ltaWxhciBtb21lbnRzICh2aWEgY2x1c3RlcilcclxuICogQHBhcmFtIHtPYmplY3R9IG1vbWVudHNcclxuICovXHJcbmZ1bmN0aW9uIHNpbWlsYXJNb21lbnRzKG1vbWVudHMpIHtcclxuICAgIHZhciBjbHVzdGVycyA9IENWVXRpbHMuY2x1c3Rlcihtb21lbnRzLCAwLjkwKTtcclxuICAgIHZhciB0b3BDbHVzdGVyID0gQ1ZVdGlscy50b3BHZW5lcmljKGNsdXN0ZXJzLCAxLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgcmV0dXJuIGUuZ2V0UG9pbnRzKCkubGVuZ3RoO1xyXG4gICAgfSk7XHJcbiAgICB2YXIgcG9pbnRzID0gW10sIHJlc3VsdCA9IFtdO1xyXG4gICAgaWYgKHRvcENsdXN0ZXIubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgcG9pbnRzID0gdG9wQ2x1c3RlclswXS5pdGVtLmdldFBvaW50cygpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBvaW50c1tpXS5wb2ludCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gc2tlbGV0b25pemUoeCwgeSkge1xyXG4gICAgX2JpbmFyeUltYWdlV3JhcHBlci5zdWJJbWFnZUFzQ29weShfc3ViSW1hZ2VXcmFwcGVyLCBDVlV0aWxzLmltYWdlUmVmKHgsIHkpKTtcclxuICAgIF9za2VsZXRvbml6ZXIuc2tlbGV0b25pemUoKTtcclxuXHJcbiAgICAvLyBTaG93IHNrZWxldG9uIGlmIHJlcXVlc3RlZFxyXG4gICAgaWYgKF9jb25maWcuc2hvd1NrZWxldG9uKSB7XHJcbiAgICAgICAgX3NrZWxJbWFnZVdyYXBwZXIub3ZlcmxheShfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnksIDM2MCwgQ1ZVdGlscy5pbWFnZVJlZih4LCB5KSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeHRyYWN0cyBhbmQgZGVzY3JpYmVzIHRob3NlIHBhdGNoZXMgd2hpY2ggc2VlbSB0byBjb250YWluIGEgYmFyY29kZSBwYXR0ZXJuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IG1vbWVudHNcclxuICogQHBhcmFtIHtPYmplY3R9IHBhdGNoUG9zLFxyXG4gKiBAcGFyYW0ge051bWJlcn0geFxyXG4gKiBAcGFyYW0ge051bWJlcn0geVxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IGxpc3Qgb2YgcGF0Y2hlc1xyXG4gKi9cclxuZnVuY3Rpb24gZGVzY3JpYmVQYXRjaChtb21lbnRzLCBwYXRjaFBvcywgeCwgeSkge1xyXG4gICAgdmFyIGssXHJcbiAgICAgICAgYXZnLFxyXG4gICAgICAgIGVsaWdpYmxlTW9tZW50cyA9IFtdLFxyXG4gICAgICAgIG1hdGNoaW5nTW9tZW50cyxcclxuICAgICAgICBwYXRjaCxcclxuICAgICAgICBwYXRjaGVzRm91bmQgPSBbXSxcclxuICAgICAgICBtaW5Db21wb25lbnRXZWlnaHQgPSBNYXRoLmNlaWwoX3BhdGNoU2l6ZS54IC8gMyk7XHJcblxyXG4gICAgaWYgKG1vbWVudHMubGVuZ3RoID49IDIpIHtcclxuICAgICAgICAvLyBvbmx5IGNvbGxlY3QgbW9tZW50cyB3aGljaCdzIGFyZWEgY292ZXJzIGF0IGxlYXN0IG1pbkNvbXBvbmVudFdlaWdodCBwaXhlbHMuXHJcbiAgICAgICAgZm9yICggayA9IDA7IGsgPCBtb21lbnRzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIGlmIChtb21lbnRzW2tdLm0wMCA+IG1pbkNvbXBvbmVudFdlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgZWxpZ2libGVNb21lbnRzLnB1c2gobW9tZW50c1trXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmIGF0IGxlYXN0IDIgbW9tZW50cyBhcmUgZm91bmQgd2hpY2ggaGF2ZSBhdCBsZWFzdCBtaW5Db21wb25lbnRXZWlnaHRzIGNvdmVyZWRcclxuICAgICAgICBpZiAoZWxpZ2libGVNb21lbnRzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgICAgIG1hdGNoaW5nTW9tZW50cyA9IHNpbWlsYXJNb21lbnRzKGVsaWdpYmxlTW9tZW50cyk7XHJcbiAgICAgICAgICAgIGF2ZyA9IDA7XHJcbiAgICAgICAgICAgIC8vIGRldGVybWluZSB0aGUgc2ltaWxhcml0eSBvZiB0aGUgbW9tZW50c1xyXG4gICAgICAgICAgICBmb3IgKCBrID0gMDsgayA8IG1hdGNoaW5nTW9tZW50cy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgYXZnICs9IG1hdGNoaW5nTW9tZW50c1trXS5yYWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIE9ubHkgdHdvIG9mIHRoZSBtb21lbnRzIGFyZSBhbGxvd2VkIG5vdCB0byBmaXQgaW50byB0aGUgZXF1YXRpb25cclxuICAgICAgICAgICAgLy8gYWRkIHRoZSBwYXRjaCB0byB0aGUgc2V0XHJcbiAgICAgICAgICAgIGlmIChtYXRjaGluZ01vbWVudHMubGVuZ3RoID4gMVxyXG4gICAgICAgICAgICAgICAgICAgICYmIG1hdGNoaW5nTW9tZW50cy5sZW5ndGggPj0gKGVsaWdpYmxlTW9tZW50cy5sZW5ndGggLyA0KSAqIDNcclxuICAgICAgICAgICAgICAgICAgICAmJiBtYXRjaGluZ01vbWVudHMubGVuZ3RoID4gbW9tZW50cy5sZW5ndGggLyA0KSB7XHJcbiAgICAgICAgICAgICAgICBhdmcgLz0gbWF0Y2hpbmdNb21lbnRzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHBhdGNoID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBwYXRjaFBvc1sxXSAqIF9udW1QYXRjaGVzLnggKyBwYXRjaFBvc1swXSxcclxuICAgICAgICAgICAgICAgICAgICBwb3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogeVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYm94OiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlYzIuY2xvbmUoW3gsIHldKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmVjMi5jbG9uZShbeCArIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS54LCB5XSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlYzIuY2xvbmUoW3ggKyBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueCwgeSArIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS55XSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlYzIuY2xvbmUoW3gsIHkgKyBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueV0pXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBtb21lbnRzOiBtYXRjaGluZ01vbWVudHMsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkOiBhdmcsXHJcbiAgICAgICAgICAgICAgICAgICAgdmVjOiB2ZWMyLmNsb25lKFtNYXRoLmNvcyhhdmcpLCBNYXRoLnNpbihhdmcpXSlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBwYXRjaGVzRm91bmQucHVzaChwYXRjaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGF0Y2hlc0ZvdW5kO1xyXG59XHJcblxyXG4vKipcclxuICogZmluZHMgcGF0Y2hlcyB3aGljaCBhcmUgY29ubmVjdGVkIGFuZCBzaGFyZSB0aGUgc2FtZSBvcmllbnRhdGlvblxyXG4gKiBAcGFyYW0ge09iamVjdH0gcGF0Y2hlc0ZvdW5kXHJcbiAqL1xyXG5mdW5jdGlvbiByYXN0ZXJpemVBbmd1bGFyU2ltaWxhcml0eShwYXRjaGVzRm91bmQpIHtcclxuICAgIHZhciBsYWJlbCA9IDAsXHJcbiAgICAgICAgdGhyZXNob2xkID0gMC45NSxcclxuICAgICAgICBjdXJySWR4ID0gMCxcclxuICAgICAgICBqLFxyXG4gICAgICAgIHBhdGNoLFxyXG4gICAgICAgIGhzdiA9IFswLCAxLCAxXSxcclxuICAgICAgICByZ2IgPSBbMCwgMCwgMF07XHJcblxyXG4gICAgZnVuY3Rpb24gbm90WWV0UHJvY2Vzc2VkKCkge1xyXG4gICAgICAgIHZhciBpO1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgX3BhdGNoTGFiZWxHcmlkLmRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKF9wYXRjaExhYmVsR3JpZC5kYXRhW2ldID09PSAwICYmIF9wYXRjaEdyaWQuZGF0YVtpXSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF9wYXRjaExhYmVsR3JpZC5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdHJhY2UoY3VycmVudElkeCkge1xyXG4gICAgICAgIHZhciB4LFxyXG4gICAgICAgICAgICB5LFxyXG4gICAgICAgICAgICBjdXJyZW50UGF0Y2gsXHJcbiAgICAgICAgICAgIGlkeCxcclxuICAgICAgICAgICAgZGlyLFxyXG4gICAgICAgICAgICBjdXJyZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgeDogY3VycmVudElkeCAlIF9wYXRjaExhYmVsR3JpZC5zaXplLngsXHJcbiAgICAgICAgICAgICAgICB5OiAoY3VycmVudElkeCAvIF9wYXRjaExhYmVsR3JpZC5zaXplLngpIHwgMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzaW1pbGFyaXR5O1xyXG5cclxuICAgICAgICBpZiAoY3VycmVudElkeCA8IF9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjdXJyZW50UGF0Y2ggPSBfaW1hZ2VUb1BhdGNoR3JpZC5kYXRhW2N1cnJlbnRJZHhdO1xyXG4gICAgICAgICAgICAvLyBhc3NpZ24gbGFiZWxcclxuICAgICAgICAgICAgX3BhdGNoTGFiZWxHcmlkLmRhdGFbY3VycmVudElkeF0gPSBsYWJlbDtcclxuICAgICAgICAgICAgZm9yICggZGlyID0gMDsgZGlyIDwgVHJhY2VyLnNlYXJjaERpcmVjdGlvbnMubGVuZ3RoOyBkaXIrKykge1xyXG4gICAgICAgICAgICAgICAgeSA9IGN1cnJlbnQueSArIFRyYWNlci5zZWFyY2hEaXJlY3Rpb25zW2Rpcl1bMF07XHJcbiAgICAgICAgICAgICAgICB4ID0gY3VycmVudC54ICsgVHJhY2VyLnNlYXJjaERpcmVjdGlvbnNbZGlyXVsxXTtcclxuICAgICAgICAgICAgICAgIGlkeCA9IHkgKiBfcGF0Y2hMYWJlbEdyaWQuc2l6ZS54ICsgeDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjb250aW51ZSBpZiBwYXRjaCBlbXB0eVxyXG4gICAgICAgICAgICAgICAgaWYgKF9wYXRjaEdyaWQuZGF0YVtpZHhdID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3BhdGNoTGFiZWxHcmlkLmRhdGFbaWR4XSA9IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKF9wYXRjaExhYmVsR3JpZC5kYXRhW2lkeF0gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzaW1pbGFyaXR5ID0gTWF0aC5hYnModmVjMi5kb3QoX2ltYWdlVG9QYXRjaEdyaWQuZGF0YVtpZHhdLnZlYywgY3VycmVudFBhdGNoLnZlYykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaW1pbGFyaXR5ID4gdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNlKGlkeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHByZXBhcmUgZm9yIGZpbmRpbmcgdGhlIHJpZ2h0IHBhdGNoZXNcclxuICAgIEFycmF5SGVscGVyLmluaXQoX3BhdGNoR3JpZC5kYXRhLCAwKTtcclxuICAgIEFycmF5SGVscGVyLmluaXQoX3BhdGNoTGFiZWxHcmlkLmRhdGEsIDApO1xyXG4gICAgQXJyYXlIZWxwZXIuaW5pdChfaW1hZ2VUb1BhdGNoR3JpZC5kYXRhLCBudWxsKTtcclxuXHJcbiAgICBmb3IgKCBqID0gMDsgaiA8IHBhdGNoZXNGb3VuZC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIHBhdGNoID0gcGF0Y2hlc0ZvdW5kW2pdO1xyXG4gICAgICAgIF9pbWFnZVRvUGF0Y2hHcmlkLmRhdGFbcGF0Y2guaW5kZXhdID0gcGF0Y2g7XHJcbiAgICAgICAgX3BhdGNoR3JpZC5kYXRhW3BhdGNoLmluZGV4XSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmFzdGVyaXplIHRoZSBwYXRjaGVzIGZvdW5kIHRvIGRldGVybWluZSBhcmVhXHJcbiAgICBfcGF0Y2hHcmlkLnplcm9Cb3JkZXIoKTtcclxuXHJcbiAgICB3aGlsZSAoKCBjdXJySWR4ID0gbm90WWV0UHJvY2Vzc2VkKCkpIDwgX3BhdGNoTGFiZWxHcmlkLmRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgbGFiZWwrKztcclxuICAgICAgICB0cmFjZShjdXJySWR4KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBkcmF3IHBhdGNoLWxhYmVscyBpZiByZXF1ZXN0ZWRcclxuICAgIGlmIChfY29uZmlnLnNob3dQYXRjaExhYmVscykge1xyXG4gICAgICAgIGZvciAoIGogPSAwOyBqIDwgX3BhdGNoTGFiZWxHcmlkLmRhdGEubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgaWYgKF9wYXRjaExhYmVsR3JpZC5kYXRhW2pdID4gMCAmJiBfcGF0Y2hMYWJlbEdyaWQuZGF0YVtqXSA8PSBsYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgcGF0Y2ggPSBfaW1hZ2VUb1BhdGNoR3JpZC5kYXRhW2pdO1xyXG4gICAgICAgICAgICAgICAgaHN2WzBdID0gKF9wYXRjaExhYmVsR3JpZC5kYXRhW2pdIC8gKGxhYmVsICsgMSkpICogMzYwO1xyXG4gICAgICAgICAgICAgICAgQ1ZVdGlscy5oc3YycmdiKGhzdiwgcmdiKTtcclxuICAgICAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1JlY3QocGF0Y2gucG9zLCBfc3ViSW1hZ2VXcmFwcGVyLnNpemUsIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSxcclxuICAgICAgICAgICAgICAgICAgICB7Y29sb3I6IFwicmdiKFwiICsgcmdiLmpvaW4oXCIsXCIpICsgXCIpXCIsIGxpbmVXaWR0aDogMn0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsYWJlbDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oaW5wdXRJbWFnZVdyYXBwZXIsIGNvbmZpZykge1xyXG4gICAgICAgIF9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgX2lucHV0SW1hZ2VXcmFwcGVyID0gaW5wdXRJbWFnZVdyYXBwZXI7XHJcblxyXG4gICAgICAgIGluaXRCdWZmZXJzKCk7XHJcbiAgICAgICAgaW5pdENhbnZhcygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBsb2NhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBwYXRjaGVzRm91bmQsXHJcbiAgICAgICAgICAgIHRvcExhYmVscyxcclxuICAgICAgICAgICAgYm94ZXM7XHJcblxyXG4gICAgICAgIGlmIChfY29uZmlnLmhhbGZTYW1wbGUpIHtcclxuICAgICAgICAgICAgQ1ZVdGlscy5oYWxmU2FtcGxlKF9pbnB1dEltYWdlV3JhcHBlciwgX2N1cnJlbnRJbWFnZVdyYXBwZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYmluYXJpemVJbWFnZSgpO1xyXG4gICAgICAgIHBhdGNoZXNGb3VuZCA9IGZpbmRQYXRjaGVzKCk7XHJcbiAgICAgICAgLy8gcmV0dXJuIHVubGVzcyA1JSBvciBtb3JlIHBhdGNoZXMgYXJlIGZvdW5kXHJcbiAgICAgICAgaWYgKHBhdGNoZXNGb3VuZC5sZW5ndGggPCBfbnVtUGF0Y2hlcy54ICogX251bVBhdGNoZXMueSAqIDAuMDUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByYXN0ZXJyaXplIGFyZWEgYnkgY29tcGFyaW5nIGFuZ3VsYXIgc2ltaWxhcml0eTtcclxuICAgICAgICB2YXIgbWF4TGFiZWwgPSByYXN0ZXJpemVBbmd1bGFyU2ltaWxhcml0eShwYXRjaGVzRm91bmQpO1xyXG4gICAgICAgIGlmIChtYXhMYWJlbCA8IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzZWFyY2ggZm9yIGFyZWEgd2l0aCB0aGUgbW9zdCBwYXRjaGVzIChiaWdnZXN0IGNvbm5lY3RlZCBhcmVhKVxyXG4gICAgICAgIHRvcExhYmVscyA9IGZpbmRCaWdnZXN0Q29ubmVjdGVkQXJlYXMobWF4TGFiZWwpO1xyXG4gICAgICAgIGlmICh0b3BMYWJlbHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYm94ZXMgPSBmaW5kQm94ZXModG9wTGFiZWxzLCBtYXhMYWJlbCk7XHJcbiAgICAgICAgcmV0dXJuIGJveGVzO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja0ltYWdlQ29uc3RyYWludHM6IGZ1bmN0aW9uKGlucHV0U3RyZWFtLCBjb25maWcpIHtcclxuICAgICAgICB2YXIgcGF0Y2hTaXplLFxyXG4gICAgICAgICAgICB3aWR0aCA9IGlucHV0U3RyZWFtLmdldFdpZHRoKCksXHJcbiAgICAgICAgICAgIGhlaWdodCA9IGlucHV0U3RyZWFtLmdldEhlaWdodCgpLFxyXG4gICAgICAgICAgICBoYWxmU2FtcGxlID0gY29uZmlnLmhhbGZTYW1wbGUgPyAwLjUgOiAxLFxyXG4gICAgICAgICAgICBzaXplLFxyXG4gICAgICAgICAgICBhcmVhO1xyXG5cclxuICAgICAgICAvLyBjYWxjdWxhdGUgd2lkdGggYW5kIGhlaWdodCBiYXNlZCBvbiBhcmVhXHJcbiAgICAgICAgaWYgKGlucHV0U3RyZWFtLmdldENvbmZpZygpLmFyZWEpIHtcclxuICAgICAgICAgICAgYXJlYSA9IENWVXRpbHMuY29tcHV0ZUltYWdlQXJlYSh3aWR0aCwgaGVpZ2h0LCBpbnB1dFN0cmVhbS5nZXRDb25maWcoKS5hcmVhKTtcclxuICAgICAgICAgICAgaW5wdXRTdHJlYW0uc2V0VG9wUmlnaHQoe3g6IGFyZWEuc3gsIHk6IGFyZWEuc3l9KTtcclxuICAgICAgICAgICAgaW5wdXRTdHJlYW0uc2V0Q2FudmFzU2l6ZSh7eDogd2lkdGgsIHk6IGhlaWdodH0pO1xyXG4gICAgICAgICAgICB3aWR0aCA9IGFyZWEuc3c7XHJcbiAgICAgICAgICAgIGhlaWdodCA9IGFyZWEuc2g7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzaXplID0ge1xyXG4gICAgICAgICAgICB4OiBNYXRoLmZsb29yKHdpZHRoICogaGFsZlNhbXBsZSksXHJcbiAgICAgICAgICAgIHk6IE1hdGguZmxvb3IoaGVpZ2h0ICogaGFsZlNhbXBsZSlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwYXRjaFNpemUgPSBDVlV0aWxzLmNhbGN1bGF0ZVBhdGNoU2l6ZShjb25maWcucGF0Y2hTaXplLCBzaXplKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBhdGNoLVNpemU6IFwiICsgSlNPTi5zdHJpbmdpZnkocGF0Y2hTaXplKSk7XHJcblxyXG4gICAgICAgIGlucHV0U3RyZWFtLnNldFdpZHRoKE1hdGguZmxvb3IoTWF0aC5mbG9vcihzaXplLnggLyBwYXRjaFNpemUueCkgKiAoMSAvIGhhbGZTYW1wbGUpICogcGF0Y2hTaXplLngpKTtcclxuICAgICAgICBpbnB1dFN0cmVhbS5zZXRIZWlnaHQoTWF0aC5mbG9vcihNYXRoLmZsb29yKHNpemUueSAvIHBhdGNoU2l6ZS55KSAqICgxIC8gaGFsZlNhbXBsZSkgKiBwYXRjaFNpemUueSkpO1xyXG5cclxuICAgICAgICBpZiAoKGlucHV0U3RyZWFtLmdldFdpZHRoKCkgJSBwYXRjaFNpemUueCkgPT09IDAgJiYgKGlucHV0U3RyZWFtLmdldEhlaWdodCgpICUgcGF0Y2hTaXplLnkpID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW1hZ2UgZGltZW5zaW9ucyBkbyBub3QgY29tcGx5IHdpdGggdGhlIGN1cnJlbnQgc2V0dGluZ3M6IFdpZHRoIChcIiArXHJcbiAgICAgICAgICAgIHdpZHRoICsgXCIgKWFuZCBoZWlnaHQgKFwiICsgaGVpZ2h0ICtcclxuICAgICAgICAgICAgXCIpIG11c3QgYSBtdWx0aXBsZSBvZiBcIiArIHBhdGNoU2l6ZS54KTtcclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvYmFyY29kZV9sb2NhdG9yLmpzXG4gKiovIiwiaW1wb3J0IFRyYWNlciBmcm9tICcuL3RyYWNlcic7XHJcblxyXG4vKipcclxuICogaHR0cDovL3d3dy5jb2RlcHJvamVjdC5jb20vVGlwcy80MDcxNzIvQ29ubmVjdGVkLUNvbXBvbmVudC1MYWJlbGluZy1hbmQtVmVjdG9yaXphdGlvblxyXG4gKi9cclxudmFyIFJhc3Rlcml6ZXIgPSB7XHJcbiAgICBjcmVhdGVDb250b3VyMkQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRpcjogbnVsbCxcclxuICAgICAgICAgICAgaW5kZXg6IG51bGwsXHJcbiAgICAgICAgICAgIGZpcnN0VmVydGV4OiBudWxsLFxyXG4gICAgICAgICAgICBpbnNpZGVDb250b3VyczogbnVsbCxcclxuICAgICAgICAgICAgbmV4dHBlZXI6IG51bGwsXHJcbiAgICAgICAgICAgIHByZXZwZWVyOiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBDT05UT1VSX0RJUjoge1xyXG4gICAgICAgIENXX0RJUjogMCxcclxuICAgICAgICBDQ1dfRElSOiAxLFxyXG4gICAgICAgIFVOS05PV05fRElSOiAyXHJcbiAgICB9LFxyXG4gICAgRElSOiB7XHJcbiAgICAgICAgT1VUU0lERV9FREdFOiAtMzI3NjcsXHJcbiAgICAgICAgSU5TSURFX0VER0U6IC0zMjc2NlxyXG4gICAgfSxcclxuICAgIGNyZWF0ZTogZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCBsYWJlbFdyYXBwZXIpIHtcclxuICAgICAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgICAgIGxhYmVsRGF0YSA9IGxhYmVsV3JhcHBlci5kYXRhLFxyXG4gICAgICAgICAgICB3aWR0aCA9IGltYWdlV3JhcHBlci5zaXplLngsXHJcbiAgICAgICAgICAgIGhlaWdodCA9IGltYWdlV3JhcHBlci5zaXplLnksXHJcbiAgICAgICAgICAgIHRyYWNlciA9IFRyYWNlci5jcmVhdGUoaW1hZ2VXcmFwcGVyLCBsYWJlbFdyYXBwZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByYXN0ZXJpemU6IGZ1bmN0aW9uKGRlcHRobGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb2xvcixcclxuICAgICAgICAgICAgICAgICAgICBiYyxcclxuICAgICAgICAgICAgICAgICAgICBsYyxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIGN4LFxyXG4gICAgICAgICAgICAgICAgICAgIGN5LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yTWFwID0gW10sXHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIHAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2MsXHJcbiAgICAgICAgICAgICAgICAgICAgc2MsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3RlZENvdW50ID0gMCxcclxuICAgICAgICAgICAgICAgICAgICBpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgNDAwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvck1hcFtpXSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29sb3JNYXBbMF0gPSBpbWFnZURhdGFbMF07XHJcbiAgICAgICAgICAgICAgICBjYyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBjeSA9IDE7IGN5IDwgaGVpZ2h0IC0gMTsgY3krKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJjID0gY29sb3JNYXBbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICggY3ggPSAxOyBjeCA8IHdpZHRoIC0gMTsgY3grKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSBjeSAqIHdpZHRoICsgY3g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbERhdGFbcG9zXSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgPSBpbWFnZURhdGFbcG9zXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xvciAhPT0gYmMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWxpbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYyA9IGNvbm5lY3RlZENvdW50ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JNYXBbbGNdID0gY29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJjID0gY29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRleCA9IHRyYWNlci5jb250b3VyVHJhY2luZyhjeSwgY3gsIGxjLCBjb2xvciwgUmFzdGVyaXplci5ESVIuT1VUU0lERV9FREdFKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZlcnRleCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGVkQ291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsaW5kZXggPSBsYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBSYXN0ZXJpemVyLmNyZWF0ZUNvbnRvdXIyRCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5kaXIgPSBSYXN0ZXJpemVyLkNPTlRPVVJfRElSLkNXX0RJUjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuaW5kZXggPSBsYWJlbGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5maXJzdFZlcnRleCA9IHZlcnRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubmV4dHBlZXIgPSBjYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuaW5zaWRlQ29udG91cnMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNjICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MucHJldnBlZXIgPSBwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MgPSBwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVydGV4ID0gdHJhY2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY29udG91clRyYWNpbmcoY3ksIGN4LCBSYXN0ZXJpemVyLkRJUi5JTlNJREVfRURHRSwgY29sb3IsIGxhYmVsaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmVydGV4ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwID0gUmFzdGVyaXplci5jcmVhdGVDb250b3VyMkQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuZmlyc3RWZXJ0ZXggPSB2ZXJ0ZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmluc2lkZUNvbnRvdXJzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXB0aGxhYmVsID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5kaXIgPSBSYXN0ZXJpemVyLkNPTlRPVVJfRElSLkNDV19ESVI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuZGlyID0gUmFzdGVyaXplci5DT05UT1VSX0RJUi5DV19ESVI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmluZGV4ID0gZGVwdGhsYWJlbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjID0gY2M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKHNjICE9PSBudWxsKSAmJiBzYy5pbmRleCAhPT0gbGFiZWxpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjID0gc2MubmV4dHBlZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2MgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLm5leHRwZWVyID0gc2MuaW5zaWRlQ29udG91cnM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjLmluc2lkZUNvbnRvdXJzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjLmluc2lkZUNvbnRvdXJzLnByZXZwZWVyID0gcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2MuaW5zaWRlQ29udG91cnMgPSBwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbERhdGFbcG9zXSA9IGxhYmVsaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGFiZWxEYXRhW3Bvc10gPT09IFJhc3Rlcml6ZXIuRElSLk9VVFNJREVfRURHRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IGxhYmVsRGF0YVtwb3NdID09PSBSYXN0ZXJpemVyLkRJUi5JTlNJREVfRURHRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxpbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWxEYXRhW3Bvc10gPT09IFJhc3Rlcml6ZXIuRElSLklOU0lERV9FREdFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmMgPSBpbWFnZURhdGFbcG9zXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmMgPSBjb2xvck1hcFswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsaW5kZXggPSBsYWJlbERhdGFbcG9zXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJjID0gY29sb3JNYXBbbGFiZWxpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzYyA9IGNjO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKHNjICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2MuaW5kZXggPSBkZXB0aGxhYmVsO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjID0gc2MubmV4dHBlZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjOiBjYyxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogY29ubmVjdGVkQ291bnRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlYnVnOiB7XHJcbiAgICAgICAgICAgICAgICBkcmF3Q29udG91cjogZnVuY3Rpb24oY2FudmFzLCBmaXJzdENvbnRvdXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHEgPSBmaXJzdENvbnRvdXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcInJlZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJlZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocHEgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXEgPSBwcS5pbnNpZGVDb250b3VycztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpcSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAocHEgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlxICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxID0gaXE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcSA9IGlxLm5leHRwZWVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcSA9IHBxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHEgPSBwcS5uZXh0cGVlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlxID0gcHEuaW5zaWRlQ29udG91cnM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlxID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChxLmRpcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFJhc3Rlcml6ZXIuQ09OVE9VUl9ESVIuQ1dfRElSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJyZWRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFJhc3Rlcml6ZXIuQ09OVE9VUl9ESVIuQ0NXX0RJUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmx1ZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUmFzdGVyaXplci5DT05UT1VSX0RJUi5VTktOT1dOX0RJUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwID0gcS5maXJzdFZlcnRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgubW92ZVRvKHAueCwgcC55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcCA9IHAubmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5saW5lVG8ocC54LCBwLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IHdoaWxlIChwICE9PSBxLmZpcnN0VmVydGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSYXN0ZXJpemVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9yYXN0ZXJpemVyLmpzXG4gKiovIiwiLyoqXHJcbiAqIGh0dHA6Ly93d3cuY29kZXByb2plY3QuY29tL1RpcHMvNDA3MTcyL0Nvbm5lY3RlZC1Db21wb25lbnQtTGFiZWxpbmctYW5kLVZlY3Rvcml6YXRpb25cclxuICovXHJcbnZhciBUcmFjZXIgPSB7XHJcbiAgICBzZWFyY2hEaXJlY3Rpb25zOiBbWzAsIDFdLCBbMSwgMV0sIFsxLCAwXSwgWzEsIC0xXSwgWzAsIC0xXSwgWy0xLCAtMV0sIFstMSwgMF0sIFstMSwgMV1dLFxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGxhYmVsV3JhcHBlcikge1xyXG4gICAgICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICAgICAgbGFiZWxEYXRhID0gbGFiZWxXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgICAgIHNlYXJjaERpcmVjdGlvbnMgPSB0aGlzLnNlYXJjaERpcmVjdGlvbnMsXHJcbiAgICAgICAgICAgIHdpZHRoID0gaW1hZ2VXcmFwcGVyLnNpemUueCxcclxuICAgICAgICAgICAgcG9zO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmFjZShjdXJyZW50LCBjb2xvciwgbGFiZWwsIGVkZ2VsYWJlbCkge1xyXG4gICAgICAgICAgICB2YXIgaSxcclxuICAgICAgICAgICAgICAgIHksXHJcbiAgICAgICAgICAgICAgICB4O1xyXG5cclxuICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHkgPSBjdXJyZW50LmN5ICsgc2VhcmNoRGlyZWN0aW9uc1tjdXJyZW50LmRpcl1bMF07XHJcbiAgICAgICAgICAgICAgICB4ID0gY3VycmVudC5jeCArIHNlYXJjaERpcmVjdGlvbnNbY3VycmVudC5kaXJdWzFdO1xyXG4gICAgICAgICAgICAgICAgcG9zID0geSAqIHdpZHRoICsgeDtcclxuICAgICAgICAgICAgICAgIGlmICgoaW1hZ2VEYXRhW3Bvc10gPT09IGNvbG9yKSAmJiAoKGxhYmVsRGF0YVtwb3NdID09PSAwKSB8fCAobGFiZWxEYXRhW3Bvc10gPT09IGxhYmVsKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbERhdGFbcG9zXSA9IGxhYmVsO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuY3kgPSB5O1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuY3ggPSB4O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWxEYXRhW3Bvc10gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxEYXRhW3Bvc10gPSBlZGdlbGFiZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuZGlyID0gKGN1cnJlbnQuZGlyICsgMSkgJSA4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHZlcnRleDJEKHgsIHksIGRpcikge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZGlyOiBkaXIsXHJcbiAgICAgICAgICAgICAgICB4OiB4LFxyXG4gICAgICAgICAgICAgICAgeTogeSxcclxuICAgICAgICAgICAgICAgIG5leHQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBwcmV2OiBudWxsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjb250b3VyVHJhY2luZyhzeSwgc3gsIGxhYmVsLCBjb2xvciwgZWRnZWxhYmVsKSB7XHJcbiAgICAgICAgICAgIHZhciBGdiA9IG51bGwsXHJcbiAgICAgICAgICAgICAgICBDdixcclxuICAgICAgICAgICAgICAgIFAsXHJcbiAgICAgICAgICAgICAgICBsZGlyLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjeDogc3gsXHJcbiAgICAgICAgICAgICAgICAgICAgY3k6IHN5LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpcjogMFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0cmFjZShjdXJyZW50LCBjb2xvciwgbGFiZWwsIGVkZ2VsYWJlbCkpIHtcclxuICAgICAgICAgICAgICAgIEZ2ID0gdmVydGV4MkQoc3gsIHN5LCBjdXJyZW50LmRpcik7XHJcbiAgICAgICAgICAgICAgICBDdiA9IEZ2O1xyXG4gICAgICAgICAgICAgICAgbGRpciA9IGN1cnJlbnQuZGlyO1xyXG4gICAgICAgICAgICAgICAgUCA9IHZlcnRleDJEKGN1cnJlbnQuY3gsIGN1cnJlbnQuY3ksIDApO1xyXG4gICAgICAgICAgICAgICAgUC5wcmV2ID0gQ3Y7XHJcbiAgICAgICAgICAgICAgICBDdi5uZXh0ID0gUDtcclxuICAgICAgICAgICAgICAgIFAubmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBDdiA9IFA7XHJcbiAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudC5kaXIgPSAoY3VycmVudC5kaXIgKyA2KSAlIDg7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2UoY3VycmVudCwgY29sb3IsIGxhYmVsLCBlZGdlbGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZGlyICE9PSBjdXJyZW50LmRpcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDdi5kaXIgPSBjdXJyZW50LmRpcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUCA9IHZlcnRleDJEKGN1cnJlbnQuY3gsIGN1cnJlbnQuY3ksIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQLnByZXYgPSBDdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ3YubmV4dCA9IFA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFAubmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEN2ID0gUDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDdi5kaXIgPSBsZGlyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDdi54ID0gY3VycmVudC5jeDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ3YueSA9IGN1cnJlbnQuY3k7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxkaXIgPSBjdXJyZW50LmRpcjtcclxuICAgICAgICAgICAgICAgIH0gd2hpbGUgKGN1cnJlbnQuY3ggIT09IHN4IHx8IGN1cnJlbnQuY3kgIT09IHN5KTtcclxuICAgICAgICAgICAgICAgIEZ2LnByZXYgPSBDdi5wcmV2O1xyXG4gICAgICAgICAgICAgICAgQ3YucHJldi5uZXh0ID0gRnY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIEZ2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHJhY2U6IGZ1bmN0aW9uKGN1cnJlbnQsIGNvbG9yLCBsYWJlbCwgZWRnZWxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhY2UoY3VycmVudCwgY29sb3IsIGxhYmVsLCBlZGdlbGFiZWwpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb250b3VyVHJhY2luZzogZnVuY3Rpb24oc3ksIHN4LCBsYWJlbCwgY29sb3IsIGVkZ2VsYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRvdXJUcmFjaW5nKHN5LCBzeCwgbGFiZWwsIGNvbG9yLCBlZGdlbGFiZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChUcmFjZXIpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy90cmFjZXIuanNcbiAqKi8iLCIvKiBAcHJlc2VydmUgQVNNIEJFR0lOICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGVxZXFlcSovXHJcbmZ1bmN0aW9uIFNrZWxldG9uaXplcihzdGRsaWIsIGZvcmVpZ24sIGJ1ZmZlcikge1xyXG4gICAgXCJ1c2UgYXNtXCI7XHJcblxyXG4gICAgdmFyIGltYWdlcyA9IG5ldyBzdGRsaWIuVWludDhBcnJheShidWZmZXIpLFxyXG4gICAgICAgIHNpemUgPSBmb3JlaWduLnNpemUgfCAwLFxyXG4gICAgICAgIGltdWwgPSBzdGRsaWIuTWF0aC5pbXVsO1xyXG5cclxuICAgIGZ1bmN0aW9uIGVyb2RlKGluSW1hZ2VQdHIsIG91dEltYWdlUHRyKSB7XHJcbiAgICAgICAgaW5JbWFnZVB0ciA9IGluSW1hZ2VQdHIgfCAwO1xyXG4gICAgICAgIG91dEltYWdlUHRyID0gb3V0SW1hZ2VQdHIgfCAwO1xyXG5cclxuICAgICAgICB2YXIgdiA9IDAsXHJcbiAgICAgICAgICAgIHUgPSAwLFxyXG4gICAgICAgICAgICBzdW0gPSAwLFxyXG4gICAgICAgICAgICB5U3RhcnQxID0gMCxcclxuICAgICAgICAgICAgeVN0YXJ0MiA9IDAsXHJcbiAgICAgICAgICAgIHhTdGFydDEgPSAwLFxyXG4gICAgICAgICAgICB4U3RhcnQyID0gMCxcclxuICAgICAgICAgICAgb2Zmc2V0ID0gMDtcclxuXHJcbiAgICAgICAgZm9yICggdiA9IDE7ICh2IHwgMCkgPCAoKHNpemUgLSAxKSB8IDApOyB2ID0gKHYgKyAxKSB8IDApIHtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gKG9mZnNldCArIHNpemUpIHwgMDtcclxuICAgICAgICAgICAgZm9yICggdSA9IDE7ICh1IHwgMCkgPCAoKHNpemUgLSAxKSB8IDApOyB1ID0gKHUgKyAxKSB8IDApIHtcclxuICAgICAgICAgICAgICAgIHlTdGFydDEgPSAob2Zmc2V0IC0gc2l6ZSkgfCAwO1xyXG4gICAgICAgICAgICAgICAgeVN0YXJ0MiA9IChvZmZzZXQgKyBzaXplKSB8IDA7XHJcbiAgICAgICAgICAgICAgICB4U3RhcnQxID0gKHUgLSAxKSB8IDA7XHJcbiAgICAgICAgICAgICAgICB4U3RhcnQyID0gKHUgKyAxKSB8IDA7XHJcbiAgICAgICAgICAgICAgICBzdW0gPSAoKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDEgKyB4U3RhcnQxKSB8IDBdIHwgMClcclxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQxICsgeFN0YXJ0MikgfCAwXSB8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgb2Zmc2V0ICsgdSkgfCAwXSB8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MiArIHhTdGFydDEpIHwgMF0gfCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDIgKyB4U3RhcnQyKSB8IDBdIHwgMCkpIHwgMDtcclxuICAgICAgICAgICAgICAgIGlmICgoc3VtIHwgMCkgPT0gKDUgfCAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlc1sob3V0SW1hZ2VQdHIgKyBvZmZzZXQgKyB1KSB8IDBdID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIG9mZnNldCArIHUpIHwgMF0gPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdWJ0cmFjdChhSW1hZ2VQdHIsIGJJbWFnZVB0ciwgb3V0SW1hZ2VQdHIpIHtcclxuICAgICAgICBhSW1hZ2VQdHIgPSBhSW1hZ2VQdHIgfCAwO1xyXG4gICAgICAgIGJJbWFnZVB0ciA9IGJJbWFnZVB0ciB8IDA7XHJcbiAgICAgICAgb3V0SW1hZ2VQdHIgPSBvdXRJbWFnZVB0ciB8IDA7XHJcblxyXG4gICAgICAgIHZhciBsZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBsZW5ndGggPSBpbXVsKHNpemUsIHNpemUpIHwgMDtcclxuXHJcbiAgICAgICAgd2hpbGUgKChsZW5ndGggfCAwKSA+IDApIHtcclxuICAgICAgICAgICAgbGVuZ3RoID0gKGxlbmd0aCAtIDEpIHwgMDtcclxuICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSA9XHJcbiAgICAgICAgICAgICAgICAoKGltYWdlc1soYUltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCkgLSAoaW1hZ2VzWyhiSW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKSkgfCAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBiaXR3aXNlT3IoYUltYWdlUHRyLCBiSW1hZ2VQdHIsIG91dEltYWdlUHRyKSB7XHJcbiAgICAgICAgYUltYWdlUHRyID0gYUltYWdlUHRyIHwgMDtcclxuICAgICAgICBiSW1hZ2VQdHIgPSBiSW1hZ2VQdHIgfCAwO1xyXG4gICAgICAgIG91dEltYWdlUHRyID0gb3V0SW1hZ2VQdHIgfCAwO1xyXG5cclxuICAgICAgICB2YXIgbGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgbGVuZ3RoID0gaW11bChzaXplLCBzaXplKSB8IDA7XHJcblxyXG4gICAgICAgIHdoaWxlICgobGVuZ3RoIHwgMCkgPiAwKSB7XHJcbiAgICAgICAgICAgIGxlbmd0aCA9IChsZW5ndGggLSAxKSB8IDA7XHJcbiAgICAgICAgICAgIGltYWdlc1sob3V0SW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gPVxyXG4gICAgICAgICAgICAgICAgKChpbWFnZXNbKGFJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSB8IDApIHwgKGltYWdlc1soYkltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCkpIHwgMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY291bnROb25aZXJvKGltYWdlUHRyKSB7XHJcbiAgICAgICAgaW1hZ2VQdHIgPSBpbWFnZVB0ciB8IDA7XHJcblxyXG4gICAgICAgIHZhciBzdW0gPSAwLFxyXG4gICAgICAgICAgICBsZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBsZW5ndGggPSBpbXVsKHNpemUsIHNpemUpIHwgMDtcclxuXHJcbiAgICAgICAgd2hpbGUgKChsZW5ndGggfCAwKSA+IDApIHtcclxuICAgICAgICAgICAgbGVuZ3RoID0gKGxlbmd0aCAtIDEpIHwgMDtcclxuICAgICAgICAgICAgc3VtID0gKChzdW0gfCAwKSArIChpbWFnZXNbKGltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCkpIHwgMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoc3VtIHwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdChpbWFnZVB0ciwgdmFsdWUpIHtcclxuICAgICAgICBpbWFnZVB0ciA9IGltYWdlUHRyIHwgMDtcclxuICAgICAgICB2YWx1ZSA9IHZhbHVlIHwgMDtcclxuXHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIGxlbmd0aCA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xyXG5cclxuICAgICAgICB3aGlsZSAoKGxlbmd0aCB8IDApID4gMCkge1xyXG4gICAgICAgICAgICBsZW5ndGggPSAobGVuZ3RoIC0gMSkgfCAwO1xyXG4gICAgICAgICAgICBpbWFnZXNbKGltYWdlUHRyICsgbGVuZ3RoKSB8IDBdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRpbGF0ZShpbkltYWdlUHRyLCBvdXRJbWFnZVB0cikge1xyXG4gICAgICAgIGluSW1hZ2VQdHIgPSBpbkltYWdlUHRyIHwgMDtcclxuICAgICAgICBvdXRJbWFnZVB0ciA9IG91dEltYWdlUHRyIHwgMDtcclxuXHJcbiAgICAgICAgdmFyIHYgPSAwLFxyXG4gICAgICAgICAgICB1ID0gMCxcclxuICAgICAgICAgICAgc3VtID0gMCxcclxuICAgICAgICAgICAgeVN0YXJ0MSA9IDAsXHJcbiAgICAgICAgICAgIHlTdGFydDIgPSAwLFxyXG4gICAgICAgICAgICB4U3RhcnQxID0gMCxcclxuICAgICAgICAgICAgeFN0YXJ0MiA9IDAsXHJcbiAgICAgICAgICAgIG9mZnNldCA9IDA7XHJcblxyXG4gICAgICAgIGZvciAoIHYgPSAxOyAodiB8IDApIDwgKChzaXplIC0gMSkgfCAwKTsgdiA9ICh2ICsgMSkgfCAwKSB7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IChvZmZzZXQgKyBzaXplKSB8IDA7XHJcbiAgICAgICAgICAgIGZvciAoIHUgPSAxOyAodSB8IDApIDwgKChzaXplIC0gMSkgfCAwKTsgdSA9ICh1ICsgMSkgfCAwKSB7XHJcbiAgICAgICAgICAgICAgICB5U3RhcnQxID0gKG9mZnNldCAtIHNpemUpIHwgMDtcclxuICAgICAgICAgICAgICAgIHlTdGFydDIgPSAob2Zmc2V0ICsgc2l6ZSkgfCAwO1xyXG4gICAgICAgICAgICAgICAgeFN0YXJ0MSA9ICh1IC0gMSkgfCAwO1xyXG4gICAgICAgICAgICAgICAgeFN0YXJ0MiA9ICh1ICsgMSkgfCAwO1xyXG4gICAgICAgICAgICAgICAgc3VtID0gKChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQxICsgeFN0YXJ0MSkgfCAwXSB8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MSArIHhTdGFydDIpIHwgMF0gfCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIG9mZnNldCArIHUpIHwgMF0gfCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDIgKyB4U3RhcnQxKSB8IDBdIHwgMClcclxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQyICsgeFN0YXJ0MikgfCAwXSB8IDApKSB8IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHN1bSB8IDApID4gKDAgfCAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlc1sob3V0SW1hZ2VQdHIgKyBvZmZzZXQgKyB1KSB8IDBdID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIG9mZnNldCArIHUpIHwgMF0gPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtZW1jcHkoc3JjSW1hZ2VQdHIsIGRzdEltYWdlUHRyKSB7XHJcbiAgICAgICAgc3JjSW1hZ2VQdHIgPSBzcmNJbWFnZVB0ciB8IDA7XHJcbiAgICAgICAgZHN0SW1hZ2VQdHIgPSBkc3RJbWFnZVB0ciB8IDA7XHJcblxyXG4gICAgICAgIHZhciBsZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBsZW5ndGggPSBpbXVsKHNpemUsIHNpemUpIHwgMDtcclxuXHJcbiAgICAgICAgd2hpbGUgKChsZW5ndGggfCAwKSA+IDApIHtcclxuICAgICAgICAgICAgbGVuZ3RoID0gKGxlbmd0aCAtIDEpIHwgMDtcclxuICAgICAgICAgICAgaW1hZ2VzWyhkc3RJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSA9IChpbWFnZXNbKHNyY0ltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHplcm9Cb3JkZXIoaW1hZ2VQdHIpIHtcclxuICAgICAgICBpbWFnZVB0ciA9IGltYWdlUHRyIHwgMDtcclxuXHJcbiAgICAgICAgdmFyIHggPSAwLFxyXG4gICAgICAgICAgICB5ID0gMDtcclxuXHJcbiAgICAgICAgZm9yICggeCA9IDA7ICh4IHwgMCkgPCAoKHNpemUgLSAxKSB8IDApOyB4ID0gKHggKyAxKSB8IDApIHtcclxuICAgICAgICAgICAgaW1hZ2VzWyhpbWFnZVB0ciArIHgpIHwgMF0gPSAwO1xyXG4gICAgICAgICAgICBpbWFnZXNbKGltYWdlUHRyICsgeSkgfCAwXSA9IDA7XHJcbiAgICAgICAgICAgIHkgPSAoKHkgKyBzaXplKSAtIDEpIHwgMDtcclxuICAgICAgICAgICAgaW1hZ2VzWyhpbWFnZVB0ciArIHkpIHwgMF0gPSAwO1xyXG4gICAgICAgICAgICB5ID0gKHkgKyAxKSB8IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoIHggPSAwOyAoeCB8IDApIDwgKHNpemUgfCAwKTsgeCA9ICh4ICsgMSkgfCAwKSB7XHJcbiAgICAgICAgICAgIGltYWdlc1soaW1hZ2VQdHIgKyB5KSB8IDBdID0gMDtcclxuICAgICAgICAgICAgeSA9ICh5ICsgMSkgfCAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBza2VsZXRvbml6ZSgpIHtcclxuICAgICAgICB2YXIgc3ViSW1hZ2VQdHIgPSAwLFxyXG4gICAgICAgICAgICBlcm9kZWRJbWFnZVB0ciA9IDAsXHJcbiAgICAgICAgICAgIHRlbXBJbWFnZVB0ciA9IDAsXHJcbiAgICAgICAgICAgIHNrZWxJbWFnZVB0ciA9IDAsXHJcbiAgICAgICAgICAgIHN1bSA9IDAsXHJcbiAgICAgICAgICAgIGRvbmUgPSAwO1xyXG5cclxuICAgICAgICBlcm9kZWRJbWFnZVB0ciA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xyXG4gICAgICAgIHRlbXBJbWFnZVB0ciA9IChlcm9kZWRJbWFnZVB0ciArIGVyb2RlZEltYWdlUHRyKSB8IDA7XHJcbiAgICAgICAgc2tlbEltYWdlUHRyID0gKHRlbXBJbWFnZVB0ciArIGVyb2RlZEltYWdlUHRyKSB8IDA7XHJcblxyXG4gICAgICAgIC8vIGluaXQgc2tlbC1pbWFnZVxyXG4gICAgICAgIGluaXQoc2tlbEltYWdlUHRyLCAwKTtcclxuICAgICAgICB6ZXJvQm9yZGVyKHN1YkltYWdlUHRyKTtcclxuXHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBlcm9kZShzdWJJbWFnZVB0ciwgZXJvZGVkSW1hZ2VQdHIpO1xyXG4gICAgICAgICAgICBkaWxhdGUoZXJvZGVkSW1hZ2VQdHIsIHRlbXBJbWFnZVB0cik7XHJcbiAgICAgICAgICAgIHN1YnRyYWN0KHN1YkltYWdlUHRyLCB0ZW1wSW1hZ2VQdHIsIHRlbXBJbWFnZVB0cik7XHJcbiAgICAgICAgICAgIGJpdHdpc2VPcihza2VsSW1hZ2VQdHIsIHRlbXBJbWFnZVB0ciwgc2tlbEltYWdlUHRyKTtcclxuICAgICAgICAgICAgbWVtY3B5KGVyb2RlZEltYWdlUHRyLCBzdWJJbWFnZVB0cik7XHJcbiAgICAgICAgICAgIHN1bSA9IGNvdW50Tm9uWmVybyhzdWJJbWFnZVB0cikgfCAwO1xyXG4gICAgICAgICAgICBkb25lID0gKChzdW0gfCAwKSA9PSAwIHwgMCk7XHJcbiAgICAgICAgfSB3aGlsZSAoIWRvbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2tlbGV0b25pemU6IHNrZWxldG9uaXplXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTa2VsZXRvbml6ZXI7XHJcbi8qIGVzbGludC1lbmFibGUgZXFlcWVxKi9cclxuLyogQHByZXNlcnZlIEFTTSBFTkQgKi9cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvc2tlbGV0b25pemVyLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgZHJhd1JlY3Q6IGZ1bmN0aW9uKHBvcywgc2l6ZSwgY3R4LCBzdHlsZSl7XHJcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3R5bGUuY29sb3I7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0eWxlLmNvbG9yO1xyXG4gICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHguc3Ryb2tlUmVjdChwb3MueCwgcG9zLnksIHNpemUueCwgc2l6ZS55KTtcclxuICAgIH0sXHJcbiAgICBkcmF3UGF0aDogZnVuY3Rpb24ocGF0aCwgZGVmLCBjdHgsIHN0eWxlKSB7XHJcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3R5bGUuY29sb3I7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0eWxlLmNvbG9yO1xyXG4gICAgICAgIGN0eC5saW5lV2lkdGggPSBzdHlsZS5saW5lV2lkdGg7XHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGN0eC5tb3ZlVG8ocGF0aFswXVtkZWYueF0sIHBhdGhbMF1bZGVmLnldKTtcclxuICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IHBhdGgubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgY3R4LmxpbmVUbyhwYXRoW2pdW2RlZi54XSwgcGF0aFtqXVtkZWYueV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgfSxcclxuICAgIGRyYXdJbWFnZTogZnVuY3Rpb24oaW1hZ2VEYXRhLCBzaXplLCBjdHgpIHtcclxuICAgICAgICB2YXIgY2FudmFzRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgc2l6ZS54LCBzaXplLnkpLFxyXG4gICAgICAgICAgICBkYXRhID0gY2FudmFzRGF0YS5kYXRhLFxyXG4gICAgICAgICAgICBpbWFnZURhdGFQb3MgPSBpbWFnZURhdGEubGVuZ3RoLFxyXG4gICAgICAgICAgICBjYW52YXNEYXRhUG9zID0gZGF0YS5sZW5ndGgsXHJcbiAgICAgICAgICAgIHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoY2FudmFzRGF0YVBvcyAvIGltYWdlRGF0YVBvcyAhPT0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlIChpbWFnZURhdGFQb3MtLSl7XHJcbiAgICAgICAgICAgIHZhbHVlID0gaW1hZ2VEYXRhW2ltYWdlRGF0YVBvc107XHJcbiAgICAgICAgICAgIGRhdGFbLS1jYW52YXNEYXRhUG9zXSA9IDI1NTtcclxuICAgICAgICAgICAgZGF0YVstLWNhbnZhc0RhdGFQb3NdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGRhdGFbLS1jYW52YXNEYXRhUG9zXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBkYXRhWy0tY2FudmFzRGF0YVBvc10gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4LnB1dEltYWdlRGF0YShjYW52YXNEYXRhLCAwLCAwKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvaW1hZ2VfZGVidWcuanNcbiAqKi8iLCJpbXBvcnQgQnJlc2VuaGFtIGZyb20gJy4vYnJlc2VuaGFtJztcclxuaW1wb3J0IEltYWdlRGVidWcgZnJvbSAnLi9pbWFnZV9kZWJ1Zyc7XHJcbmltcG9ydCBDb2RlMTI4UmVhZGVyIGZyb20gJy4vY29kZV8xMjhfcmVhZGVyJztcclxuaW1wb3J0IEVBTlJlYWRlciBmcm9tICcuL2Vhbl9yZWFkZXInO1xyXG5pbXBvcnQgQ29kZTM5UmVhZGVyIGZyb20gJy4vY29kZV8zOV9yZWFkZXInO1xyXG5pbXBvcnQgQ29kZTM5VklOUmVhZGVyIGZyb20gJy4vY29kZV8zOV92aW5fcmVhZGVyJztcclxuaW1wb3J0IENvZGFiYXJSZWFkZXIgZnJvbSAnLi9jb2RhYmFyX3JlYWRlcic7XHJcbmltcG9ydCBVUENSZWFkZXIgZnJvbSAnLi91cGNfcmVhZGVyJztcclxuaW1wb3J0IEVBTjhSZWFkZXIgZnJvbSAnLi9lYW5fOF9yZWFkZXInO1xyXG5pbXBvcnQgVVBDRVJlYWRlciBmcm9tICcuL3VwY19lX3JlYWRlcic7XHJcbmltcG9ydCBJMm9mNVJlYWRlciBmcm9tICcuL2kyb2Y1X3JlYWRlcic7XHJcblxyXG5jb25zdCBSRUFERVJTID0ge1xyXG4gICAgY29kZV8xMjhfcmVhZGVyOiBDb2RlMTI4UmVhZGVyLFxyXG4gICAgZWFuX3JlYWRlcjogRUFOUmVhZGVyLFxyXG4gICAgZWFuXzhfcmVhZGVyOiBFQU44UmVhZGVyLFxyXG4gICAgY29kZV8zOV9yZWFkZXI6IENvZGUzOVJlYWRlcixcclxuICAgIGNvZGVfMzlfdmluX3JlYWRlcjogQ29kZTM5VklOUmVhZGVyLFxyXG4gICAgY29kYWJhcl9yZWFkZXI6IENvZGFiYXJSZWFkZXIsXHJcbiAgICB1cGNfcmVhZGVyOiBVUENSZWFkZXIsXHJcbiAgICB1cGNfZV9yZWFkZXI6IFVQQ0VSZWFkZXIsXHJcbiAgICBpMm9mNV9yZWFkZXI6IEkyb2Y1UmVhZGVyXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNyZWF0ZTogZnVuY3Rpb24oY29uZmlnLCBpbnB1dEltYWdlV3JhcHBlcikge1xyXG4gICAgICAgIHZhciBfY2FudmFzID0ge1xyXG4gICAgICAgICAgICAgICAgY3R4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheTogbnVsbFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRvbToge1xyXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IG51bGxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgX2JhcmNvZGVSZWFkZXJzID0gW107XHJcblxyXG4gICAgICAgIGluaXRDYW52YXMoKTtcclxuICAgICAgICBpbml0UmVhZGVycygpO1xyXG4gICAgICAgIGluaXRDb25maWcoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdENhbnZhcygpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkZGVidWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlYnVnLmRldGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgIF9jYW52YXMuZG9tLmZyZXF1ZW5jeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjYW52YXMuZnJlcXVlbmN5XCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfY2FudmFzLmRvbS5mcmVxdWVuY3kpIHtcclxuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5mcmVxdWVuY3kgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9jYW52YXMuZG9tLmZyZXF1ZW5jeS5jbGFzc05hbWUgPSBcImZyZXF1ZW5jeVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkZGVidWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGRlYnVnLmFwcGVuZENoaWxkKF9jYW52YXMuZG9tLmZyZXF1ZW5jeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX2NhbnZhcy5jdHguZnJlcXVlbmN5ID0gX2NhbnZhcy5kb20uZnJlcXVlbmN5LmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5wYXR0ZXJuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhcy5wYXR0ZXJuQnVmZmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfY2FudmFzLmRvbS5wYXR0ZXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2NhbnZhcy5kb20ucGF0dGVybiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgX2NhbnZhcy5kb20ucGF0dGVybi5jbGFzc05hbWUgPSBcInBhdHRlcm5CdWZmZXJcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJGRlYnVnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRkZWJ1Zy5hcHBlbmRDaGlsZChfY2FudmFzLmRvbS5wYXR0ZXJuKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfY2FudmFzLmN0eC5wYXR0ZXJuID0gX2NhbnZhcy5kb20ucGF0dGVybi5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgX2NhbnZhcy5kb20ub3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjYW52YXMuZHJhd2luZ0J1ZmZlclwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChfY2FudmFzLmRvbS5vdmVybGF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2NhbnZhcy5jdHgub3ZlcmxheSA9IF9jYW52YXMuZG9tLm92ZXJsYXkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0UmVhZGVycygpIHtcclxuICAgICAgICAgICAgY29uZmlnLnJlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihyZWFkZXJDb25maWcpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZWFkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbiA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVhZGVyQ29uZmlnID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRlciA9IHJlYWRlckNvbmZpZy5mb3JtYXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbiA9IHJlYWRlckNvbmZpZy5jb25maWc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZWFkZXJDb25maWcgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyID0gcmVhZGVyQ29uZmlnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJCZWZvcmUgcmVnaXN0ZXJpbmcgcmVhZGVyOiBcIiwgcmVhZGVyKTtcclxuICAgICAgICAgICAgICAgIF9iYXJjb2RlUmVhZGVycy5wdXNoKG5ldyBSRUFERVJTW3JlYWRlcl0oY29uZmlndXJhdGlvbikpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWdpc3RlcmVkIFJlYWRlcnM6IFwiICsgX2JhcmNvZGVSZWFkZXJzXHJcbiAgICAgICAgICAgICAgICAubWFwKChyZWFkZXIpID0+IEpTT04uc3RyaW5naWZ5KHtmb3JtYXQ6IHJlYWRlci5GT1JNQVQsIGNvbmZpZzogcmVhZGVyLmNvbmZpZ30pKVxyXG4gICAgICAgICAgICAgICAgLmpvaW4oJywgJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdENvbmZpZygpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpcyA9IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGU6IF9jYW52YXMuZG9tLmZyZXF1ZW5jeSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogY29uZmlnLnNob3dGcmVxdWVuY3lcclxuICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGU6IF9jYW52YXMuZG9tLnBhdHRlcm4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IGNvbmZpZy5zaG93UGF0dGVyblxyXG4gICAgICAgICAgICAgICAgICAgIH1dO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB2aXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmlzW2ldLnByb3AgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlzW2ldLm5vZGUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNbaV0ubm9kZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBleHRlbmQgdGhlIGxpbmUgb24gYm90aCBlbmRzXHJcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gbGluZVxyXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldEV4dGVuZGVkTGluZShsaW5lLCBhbmdsZSwgZXh0KSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGV4dGVuZExpbmUoYW1vdW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXh0ZW5zaW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHk6IGFtb3VudCAqIE1hdGguc2luKGFuZ2xlKSxcclxuICAgICAgICAgICAgICAgICAgICB4OiBhbW91bnQgKiBNYXRoLmNvcyhhbmdsZSlcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgbGluZVswXS55IC09IGV4dGVuc2lvbi55O1xyXG4gICAgICAgICAgICAgICAgbGluZVswXS54IC09IGV4dGVuc2lvbi54O1xyXG4gICAgICAgICAgICAgICAgbGluZVsxXS55ICs9IGV4dGVuc2lvbi55O1xyXG4gICAgICAgICAgICAgICAgbGluZVsxXS54ICs9IGV4dGVuc2lvbi54O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiBpbnNpZGUgaW1hZ2VcclxuICAgICAgICAgICAgZXh0ZW5kTGluZShleHQpO1xyXG4gICAgICAgICAgICB3aGlsZSAoZXh0ID4gMSAmJiAoIWlucHV0SW1hZ2VXcmFwcGVyLmluSW1hZ2VXaXRoQm9yZGVyKGxpbmVbMF0sIDApXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgIWlucHV0SW1hZ2VXcmFwcGVyLmluSW1hZ2VXaXRoQm9yZGVyKGxpbmVbMV0sIDApKSkge1xyXG4gICAgICAgICAgICAgICAgZXh0IC09IE1hdGguY2VpbChleHQgLyAyKTtcclxuICAgICAgICAgICAgICAgIGV4dGVuZExpbmUoLWV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGxpbmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRMaW5lKGJveCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW3tcclxuICAgICAgICAgICAgICAgIHg6IChib3hbMV1bMF0gLSBib3hbMF1bMF0pIC8gMiArIGJveFswXVswXSxcclxuICAgICAgICAgICAgICAgIHk6IChib3hbMV1bMV0gLSBib3hbMF1bMV0pIC8gMiArIGJveFswXVsxXVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB4OiAoYm94WzNdWzBdIC0gYm94WzJdWzBdKSAvIDIgKyBib3hbMl1bMF0sXHJcbiAgICAgICAgICAgICAgICB5OiAoYm94WzNdWzFdIC0gYm94WzJdWzFdKSAvIDIgKyBib3hbMl1bMV1cclxuICAgICAgICAgICAgfV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cnlEZWNvZGUobGluZSkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gbnVsbCxcclxuICAgICAgICAgICAgICAgIGksXHJcbiAgICAgICAgICAgICAgICBiYXJjb2RlTGluZSA9IEJyZXNlbmhhbS5nZXRCYXJjb2RlTGluZShpbnB1dEltYWdlV3JhcHBlciwgbGluZVswXSwgbGluZVsxXSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29uZmlnLnNob3dGcmVxdWVuY3kpIHtcclxuICAgICAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgobGluZSwge3g6ICd4JywgeTogJ3knfSwgX2NhbnZhcy5jdHgub3ZlcmxheSwge2NvbG9yOiAncmVkJywgbGluZVdpZHRoOiAzfSk7XHJcbiAgICAgICAgICAgICAgICBCcmVzZW5oYW0uZGVidWcucHJpbnRGcmVxdWVuY3koYmFyY29kZUxpbmUubGluZSwgX2NhbnZhcy5kb20uZnJlcXVlbmN5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBCcmVzZW5oYW0udG9CaW5hcnlMaW5lKGJhcmNvZGVMaW5lKTtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZy5zaG93UGF0dGVybikge1xyXG4gICAgICAgICAgICAgICAgQnJlc2VuaGFtLmRlYnVnLnByaW50UGF0dGVybihiYXJjb2RlTGluZS5saW5lLCBfY2FudmFzLmRvbS5wYXR0ZXJuKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCBfYmFyY29kZVJlYWRlcnMubGVuZ3RoICYmIHJlc3VsdCA9PT0gbnVsbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBfYmFyY29kZVJlYWRlcnNbaV0uZGVjb2RlUGF0dGVybihiYXJjb2RlTGluZS5saW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBjb2RlUmVzdWx0OiByZXN1bHQsXHJcbiAgICAgICAgICAgICAgICBiYXJjb2RlTGluZTogYmFyY29kZUxpbmVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoaXMgbWV0aG9kIHNsaWNlcyB0aGUgZ2l2ZW4gYXJlYSBhcGFydCBhbmQgdHJpZXMgdG8gZGV0ZWN0IGEgYmFyY29kZS1wYXR0ZXJuXHJcbiAgICAgICAgICogZm9yIGVhY2ggc2xpY2UuIEl0IHJldHVybnMgdGhlIGRlY29kZWQgYmFyY29kZSwgb3IgbnVsbCBpZiBub3RoaW5nIHdhcyBmb3VuZFxyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGJveFxyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpbmVcclxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gbGluZUFuZ2xlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdHJ5RGVjb2RlQnJ1dGVGb3JjZShib3gsIGxpbmUsIGxpbmVBbmdsZSkge1xyXG4gICAgICAgICAgICB2YXIgc2lkZUxlbmd0aCA9IE1hdGguc3FydChNYXRoLnBvdyhib3hbMV1bMF0gLSBib3hbMF1bMF0sIDIpICsgTWF0aC5wb3coKGJveFsxXVsxXSAtIGJveFswXVsxXSksIDIpKSxcclxuICAgICAgICAgICAgICAgIGksXHJcbiAgICAgICAgICAgICAgICBzbGljZXMgPSAxNixcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG51bGwsXHJcbiAgICAgICAgICAgICAgICBkaXIsXHJcbiAgICAgICAgICAgICAgICBleHRlbnNpb24sXHJcbiAgICAgICAgICAgICAgICB4ZGlyID0gTWF0aC5zaW4obGluZUFuZ2xlKSxcclxuICAgICAgICAgICAgICAgIHlkaXIgPSBNYXRoLmNvcyhsaW5lQW5nbGUpO1xyXG5cclxuICAgICAgICAgICAgZm9yICggaSA9IDE7IGkgPCBzbGljZXMgJiYgcmVzdWx0ID09PSBudWxsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vIG1vdmUgbGluZSBwZXJwZW5kaWN1bGFyIHRvIGFuZ2xlXHJcbiAgICAgICAgICAgICAgICBkaXIgPSBzaWRlTGVuZ3RoIC8gc2xpY2VzICogaSAqIChpICUgMiA9PT0gMCA/IC0xIDogMSk7XHJcbiAgICAgICAgICAgICAgICBleHRlbnNpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeTogZGlyICogeGRpcixcclxuICAgICAgICAgICAgICAgICAgICB4OiBkaXIgKiB5ZGlyXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbGluZVswXS55ICs9IGV4dGVuc2lvbi54O1xyXG4gICAgICAgICAgICAgICAgbGluZVswXS54IC09IGV4dGVuc2lvbi55O1xyXG4gICAgICAgICAgICAgICAgbGluZVsxXS55ICs9IGV4dGVuc2lvbi54O1xyXG4gICAgICAgICAgICAgICAgbGluZVsxXS54IC09IGV4dGVuc2lvbi55O1xyXG5cclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRyeURlY29kZShsaW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0TGluZUxlbmd0aChsaW5lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQoXHJcbiAgICAgICAgICAgICAgICBNYXRoLnBvdyhNYXRoLmFicyhsaW5lWzFdLnkgLSBsaW5lWzBdLnkpLCAyKSArXHJcbiAgICAgICAgICAgICAgICBNYXRoLnBvdyhNYXRoLmFicyhsaW5lWzFdLnggLSBsaW5lWzBdLngpLCAyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBXaXRoIHRoZSBoZWxwIG9mIHRoZSBjb25maWd1cmVkIHJlYWRlcnMgKENvZGUxMjggb3IgRUFOKSB0aGlzIGZ1bmN0aW9uIHRyaWVzIHRvIGRldGVjdCBhXHJcbiAgICAgICAgICogdmFsaWQgYmFyY29kZSBwYXR0ZXJuIHdpdGhpbiB0aGUgZ2l2ZW4gYXJlYS5cclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gYm94IFRoZSBhcmVhIHRvIHNlYXJjaCBpblxyXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSByZXN1bHQge2NvZGVSZXN1bHQsIGxpbmUsIGFuZ2xlLCBwYXR0ZXJuLCB0aHJlc2hvbGR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZGVjb2RlRnJvbUJvdW5kaW5nQm94KGJveCkge1xyXG4gICAgICAgICAgICB2YXIgbGluZSxcclxuICAgICAgICAgICAgICAgIGxpbmVBbmdsZSxcclxuICAgICAgICAgICAgICAgIGN0eCA9IF9jYW52YXMuY3R4Lm92ZXJsYXksXHJcbiAgICAgICAgICAgICAgICByZXN1bHQsXHJcbiAgICAgICAgICAgICAgICBsaW5lTGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbmZpZy5kcmF3Qm91bmRpbmdCb3ggJiYgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdQYXRoKGJveCwge3g6IDAsIHk6IDF9LCBjdHgsIHtjb2xvcjogXCJibHVlXCIsIGxpbmVXaWR0aDogMn0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsaW5lID0gZ2V0TGluZShib3gpO1xyXG4gICAgICAgICAgICBsaW5lTGVuZ3RoID0gZ2V0TGluZUxlbmd0aChsaW5lKTtcclxuICAgICAgICAgICAgbGluZUFuZ2xlID0gTWF0aC5hdGFuMihsaW5lWzFdLnkgLSBsaW5lWzBdLnksIGxpbmVbMV0ueCAtIGxpbmVbMF0ueCk7XHJcbiAgICAgICAgICAgIGxpbmUgPSBnZXRFeHRlbmRlZExpbmUobGluZSwgbGluZUFuZ2xlLCBNYXRoLmZsb29yKGxpbmVMZW5ndGggKiAwLjEpKTtcclxuICAgICAgICAgICAgaWYgKGxpbmUgPT09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRyeURlY29kZShsaW5lKTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ5RGVjb2RlQnJ1dGVGb3JjZShib3gsIGxpbmUsIGxpbmVBbmdsZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0ICYmIGNvbmZpZy5kcmF3U2NhbmxpbmUgJiYgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdQYXRoKGxpbmUsIHt4OiAneCcsIHk6ICd5J30sIGN0eCwge2NvbG9yOiAncmVkJywgbGluZVdpZHRoOiAzfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBjb2RlUmVzdWx0OiByZXN1bHQuY29kZVJlc3VsdCxcclxuICAgICAgICAgICAgICAgIGxpbmU6IGxpbmUsXHJcbiAgICAgICAgICAgICAgICBhbmdsZTogbGluZUFuZ2xlLFxyXG4gICAgICAgICAgICAgICAgcGF0dGVybjogcmVzdWx0LmJhcmNvZGVMaW5lLmxpbmUsXHJcbiAgICAgICAgICAgICAgICB0aHJlc2hvbGQ6IHJlc3VsdC5iYXJjb2RlTGluZS50aHJlc2hvbGRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRlY29kZUZyb21Cb3VuZGluZ0JveDogZnVuY3Rpb24oYm94KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVjb2RlRnJvbUJvdW5kaW5nQm94KGJveCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlY29kZUZyb21Cb3VuZGluZ0JveGVzOiBmdW5jdGlvbihib3hlcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGksIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgYm94ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBkZWNvZGVGcm9tQm91bmRpbmdCb3goYm94ZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LmNvZGVSZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmJveCA9IGJveGVzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0UmVhZGVyczogZnVuY3Rpb24ocmVhZGVycykge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLnJlYWRlcnMgPSByZWFkZXJzO1xyXG4gICAgICAgICAgICAgICAgX2JhcmNvZGVSZWFkZXJzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICBpbml0UmVhZGVycygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvYmFyY29kZV9kZWNvZGVyLmpzXG4gKiovIiwiaW1wb3J0IENWVXRpbHMgZnJvbSAnLi9jdl91dGlscyc7XHJcbmltcG9ydCBJbWFnZVdyYXBwZXIgZnJvbSAnLi9pbWFnZV93cmFwcGVyJztcclxuXHJcbnZhciBCcmVzZW5oYW0gPSB7fTtcclxuXHJcbnZhciBTbG9wZSA9IHtcclxuICAgIERJUjoge1xyXG4gICAgICAgIFVQOiAxLFxyXG4gICAgICAgIERPV046IC0xXHJcbiAgICB9XHJcbn07XHJcbi8qKlxyXG4gKiBTY2FucyBhIGxpbmUgb2YgdGhlIGdpdmVuIGltYWdlIGZyb20gcG9pbnQgcDEgdG8gcDIgYW5kIHJldHVybnMgYSByZXN1bHQgb2JqZWN0IGNvbnRhaW5pbmdcclxuICogZ3JheS1zY2FsZSB2YWx1ZXMgKDAtMjU1KSBvZiB0aGUgdW5kZXJseWluZyBwaXhlbHMgaW4gYWRkaXRpb24gdG8gdGhlIG1pblxyXG4gKiBhbmQgbWF4IHZhbHVlcy5cclxuICogQHBhcmFtIHtPYmplY3R9IGltYWdlV3JhcHBlclxyXG4gKiBAcGFyYW0ge09iamVjdH0gcDEgVGhlIHN0YXJ0IHBvaW50IHt4LHl9XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwMiBUaGUgZW5kIHBvaW50IHt4LHl9XHJcbiAqIEByZXR1cm5zIHtsaW5lLCBtaW4sIG1heH1cclxuICovXHJcbkJyZXNlbmhhbS5nZXRCYXJjb2RlTGluZSA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgcDEsIHAyKSB7XHJcbiAgICB2YXIgeDAgPSBwMS54IHwgMCxcclxuICAgICAgICB5MCA9IHAxLnkgfCAwLFxyXG4gICAgICAgIHgxID0gcDIueCB8IDAsXHJcbiAgICAgICAgeTEgPSBwMi55IHwgMCxcclxuICAgICAgICBzdGVlcCA9IE1hdGguYWJzKHkxIC0geTApID4gTWF0aC5hYnMoeDEgLSB4MCksXHJcbiAgICAgICAgZGVsdGF4LFxyXG4gICAgICAgIGRlbHRheSxcclxuICAgICAgICBlcnJvcixcclxuICAgICAgICB5c3RlcCxcclxuICAgICAgICB5LFxyXG4gICAgICAgIHRtcCxcclxuICAgICAgICB4LFxyXG4gICAgICAgIGxpbmUgPSBbXSxcclxuICAgICAgICBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICB3aWR0aCA9IGltYWdlV3JhcHBlci5zaXplLngsXHJcbiAgICAgICAgc3VtID0gMCxcclxuICAgICAgICB2YWwsXHJcbiAgICAgICAgbWluID0gMjU1LFxyXG4gICAgICAgIG1heCA9IDA7XHJcblxyXG4gICAgZnVuY3Rpb24gcmVhZChhLCBiKSB7XHJcbiAgICAgICAgdmFsID0gaW1hZ2VEYXRhW2IgKiB3aWR0aCArIGFdO1xyXG4gICAgICAgIHN1bSArPSB2YWw7XHJcbiAgICAgICAgbWluID0gdmFsIDwgbWluID8gdmFsIDogbWluO1xyXG4gICAgICAgIG1heCA9IHZhbCA+IG1heCA/IHZhbCA6IG1heDtcclxuICAgICAgICBsaW5lLnB1c2godmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc3RlZXApIHtcclxuICAgICAgICB0bXAgPSB4MDtcclxuICAgICAgICB4MCA9IHkwO1xyXG4gICAgICAgIHkwID0gdG1wO1xyXG5cclxuICAgICAgICB0bXAgPSB4MTtcclxuICAgICAgICB4MSA9IHkxO1xyXG4gICAgICAgIHkxID0gdG1wO1xyXG4gICAgfVxyXG4gICAgaWYgKHgwID4geDEpIHtcclxuICAgICAgICB0bXAgPSB4MDtcclxuICAgICAgICB4MCA9IHgxO1xyXG4gICAgICAgIHgxID0gdG1wO1xyXG5cclxuICAgICAgICB0bXAgPSB5MDtcclxuICAgICAgICB5MCA9IHkxO1xyXG4gICAgICAgIHkxID0gdG1wO1xyXG4gICAgfVxyXG4gICAgZGVsdGF4ID0geDEgLSB4MDtcclxuICAgIGRlbHRheSA9IE1hdGguYWJzKHkxIC0geTApO1xyXG4gICAgZXJyb3IgPSAoZGVsdGF4IC8gMikgfCAwO1xyXG4gICAgeSA9IHkwO1xyXG4gICAgeXN0ZXAgPSB5MCA8IHkxID8gMSA6IC0xO1xyXG4gICAgZm9yICggeCA9IHgwOyB4IDwgeDE7IHgrKykge1xyXG4gICAgICAgIGlmIChzdGVlcCl7XHJcbiAgICAgICAgICAgIHJlYWQoeSwgeCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVhZCh4LCB5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXJyb3IgPSBlcnJvciAtIGRlbHRheTtcclxuICAgICAgICBpZiAoZXJyb3IgPCAwKSB7XHJcbiAgICAgICAgICAgIHkgPSB5ICsgeXN0ZXA7XHJcbiAgICAgICAgICAgIGVycm9yID0gZXJyb3IgKyBkZWx0YXg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbGluZTogbGluZSxcclxuICAgICAgICBtaW46IG1pbixcclxuICAgICAgICBtYXg6IG1heFxyXG4gICAgfTtcclxufTtcclxuXHJcbkJyZXNlbmhhbS50b090c3VCaW5hcnlMaW5lID0gZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICB2YXIgbGluZSA9IHJlc3VsdC5saW5lLFxyXG4gICAgICAgIGltYWdlID0gbmV3IEltYWdlV3JhcHBlcih7eDogbGluZS5sZW5ndGggLSAxLCB5OiAxfSwgbGluZSksXHJcbiAgICAgICAgdGhyZXNob2xkID0gQ1ZVdGlscy5kZXRlcm1pbmVPdHN1VGhyZXNob2xkKGltYWdlLCA1KTtcclxuXHJcbiAgICBsaW5lID0gQ1ZVdGlscy5zaGFycGVuTGluZShsaW5lKTtcclxuICAgIENWVXRpbHMudGhyZXNob2xkSW1hZ2UoaW1hZ2UsIHRocmVzaG9sZCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsaW5lOiBsaW5lLFxyXG4gICAgICAgIHRocmVzaG9sZDogdGhyZXNob2xkXHJcbiAgICB9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoZSByZXN1bHQgZnJvbSBnZXRCYXJjb2RlTGluZSBpbnRvIGEgYmluYXJ5IHJlcHJlc2VudGF0aW9uXHJcbiAqIGFsc28gY29uc2lkZXJpbmcgdGhlIGZyZXF1ZW5jeSBhbmQgc2xvcGUgb2YgdGhlIHNpZ25hbCBmb3IgbW9yZSByb2J1c3QgcmVzdWx0c1xyXG4gKiBAcGFyYW0ge09iamVjdH0gcmVzdWx0IHtsaW5lLCBtaW4sIG1heH1cclxuICovXHJcbkJyZXNlbmhhbS50b0JpbmFyeUxpbmUgPSBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgIHZhciBtaW4gPSByZXN1bHQubWluLFxyXG4gICAgICAgIG1heCA9IHJlc3VsdC5tYXgsXHJcbiAgICAgICAgbGluZSA9IHJlc3VsdC5saW5lLFxyXG4gICAgICAgIHNsb3BlLFxyXG4gICAgICAgIHNsb3BlMixcclxuICAgICAgICBjZW50ZXIgPSBtaW4gKyAobWF4IC0gbWluKSAvIDIsXHJcbiAgICAgICAgZXh0cmVtYSA9IFtdLFxyXG4gICAgICAgIGN1cnJlbnREaXIsXHJcbiAgICAgICAgZGlyLFxyXG4gICAgICAgIHRocmVzaG9sZCA9IChtYXggLSBtaW4pIC8gMTIsXHJcbiAgICAgICAgclRocmVzaG9sZCA9IC10aHJlc2hvbGQsXHJcbiAgICAgICAgaSxcclxuICAgICAgICBqO1xyXG5cclxuICAgIC8vIDEuIGZpbmQgZXh0cmVtYVxyXG4gICAgY3VycmVudERpciA9IGxpbmVbMF0gPiBjZW50ZXIgPyBTbG9wZS5ESVIuVVAgOiBTbG9wZS5ESVIuRE9XTjtcclxuICAgIGV4dHJlbWEucHVzaCh7XHJcbiAgICAgICAgcG9zOiAwLFxyXG4gICAgICAgIHZhbDogbGluZVswXVxyXG4gICAgfSk7XHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IGxpbmUubGVuZ3RoIC0gMjsgaSsrKSB7XHJcbiAgICAgICAgc2xvcGUgPSAobGluZVtpICsgMV0gLSBsaW5lW2ldKTtcclxuICAgICAgICBzbG9wZTIgPSAobGluZVtpICsgMl0gLSBsaW5lW2kgKyAxXSk7XHJcbiAgICAgICAgaWYgKChzbG9wZSArIHNsb3BlMikgPCByVGhyZXNob2xkICYmIGxpbmVbaSArIDFdIDwgKGNlbnRlciAqIDEuNSkpIHtcclxuICAgICAgICAgICAgZGlyID0gU2xvcGUuRElSLkRPV047XHJcbiAgICAgICAgfSBlbHNlIGlmICgoc2xvcGUgKyBzbG9wZTIpID4gdGhyZXNob2xkICYmIGxpbmVbaSArIDFdID4gKGNlbnRlciAqIDAuNSkpIHtcclxuICAgICAgICAgICAgZGlyID0gU2xvcGUuRElSLlVQO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRpciA9IGN1cnJlbnREaXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY3VycmVudERpciAhPT0gZGlyKSB7XHJcbiAgICAgICAgICAgIGV4dHJlbWEucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBwb3M6IGksXHJcbiAgICAgICAgICAgICAgICB2YWw6IGxpbmVbaV1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnREaXIgPSBkaXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXh0cmVtYS5wdXNoKHtcclxuICAgICAgICBwb3M6IGxpbmUubGVuZ3RoLFxyXG4gICAgICAgIHZhbDogbGluZVtsaW5lLmxlbmd0aCAtIDFdXHJcbiAgICB9KTtcclxuXHJcbiAgICBmb3IgKCBqID0gZXh0cmVtYVswXS5wb3M7IGogPCBleHRyZW1hWzFdLnBvczsgaisrKSB7XHJcbiAgICAgICAgbGluZVtqXSA9IGxpbmVbal0gPiBjZW50ZXIgPyAwIDogMTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpdGVyYXRlIG92ZXIgZXh0cmVtYSBhbmQgY29udmVydCB0byBiaW5hcnkgYmFzZWQgb24gYXZnIGJldHdlZW4gbWlubWF4XHJcbiAgICBmb3IgKCBpID0gMTsgaSA8IGV4dHJlbWEubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGV4dHJlbWFbaSArIDFdLnZhbCA+IGV4dHJlbWFbaV0udmFsKSB7XHJcbiAgICAgICAgICAgIHRocmVzaG9sZCA9IChleHRyZW1hW2ldLnZhbCArICgoZXh0cmVtYVtpICsgMV0udmFsIC0gZXh0cmVtYVtpXS52YWwpIC8gMykgKiAyKSB8IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyZXNob2xkID0gKGV4dHJlbWFbaSArIDFdLnZhbCArICgoZXh0cmVtYVtpXS52YWwgLSBleHRyZW1hW2kgKyAxXS52YWwpIC8gMykpIHwgMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoIGogPSBleHRyZW1hW2ldLnBvczsgaiA8IGV4dHJlbWFbaSArIDFdLnBvczsgaisrKSB7XHJcbiAgICAgICAgICAgIGxpbmVbal0gPSBsaW5lW2pdID4gdGhyZXNob2xkID8gMCA6IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbGluZTogbGluZSxcclxuICAgICAgICB0aHJlc2hvbGQ6IHRocmVzaG9sZFxyXG4gICAgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBVc2VkIGZvciBkZXZlbG9wbWVudCBvbmx5XHJcbiAqL1xyXG5CcmVzZW5oYW0uZGVidWcgPSB7XHJcbiAgICBwcmludEZyZXF1ZW5jeTogZnVuY3Rpb24obGluZSwgY2FudmFzKSB7XHJcbiAgICAgICAgdmFyIGksXHJcbiAgICAgICAgICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgY2FudmFzLndpZHRoID0gbGluZS5sZW5ndGg7XHJcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IDI1NjtcclxuXHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmx1ZVwiO1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgbGluZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjdHgubW92ZVRvKGksIDI1NSk7XHJcbiAgICAgICAgICAgIGN0eC5saW5lVG8oaSwgMjU1IC0gbGluZVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHByaW50UGF0dGVybjogZnVuY3Rpb24obGluZSwgY2FudmFzKSB7XHJcbiAgICAgICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiksIGk7XHJcblxyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGxpbmUubGVuZ3RoO1xyXG4gICAgICAgIGN0eC5maWxsQ29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBsaW5lLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChsaW5lW2ldID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoaSwgMCwgMSwgMTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJyZXNlbmhhbTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvYnJlc2VuaGFtLmpzXG4gKiovIiwiaW1wb3J0IEJhcmNvZGVSZWFkZXIgZnJvbSAnLi9iYXJjb2RlX3JlYWRlcic7XHJcblxyXG5mdW5jdGlvbiBDb2RlMTI4UmVhZGVyKCkge1xyXG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG52YXIgcHJvcGVydGllcyA9IHtcclxuICAgIENPREVfU0hJRlQ6IHt2YWx1ZTogOTh9LFxyXG4gICAgQ09ERV9DOiB7dmFsdWU6IDk5fSxcclxuICAgIENPREVfQjoge3ZhbHVlOiAxMDB9LFxyXG4gICAgQ09ERV9BOiB7dmFsdWU6IDEwMX0sXHJcbiAgICBTVEFSVF9DT0RFX0E6IHt2YWx1ZTogMTAzfSxcclxuICAgIFNUQVJUX0NPREVfQjoge3ZhbHVlOiAxMDR9LFxyXG4gICAgU1RBUlRfQ09ERV9DOiB7dmFsdWU6IDEwNX0sXHJcbiAgICBTVE9QX0NPREU6IHt2YWx1ZTogMTA2fSxcclxuICAgIE1PRFVMTzoge3ZhbHVlOiAxMX0sXHJcbiAgICBDT0RFX1BBVFRFUk46IHt2YWx1ZTogW1xyXG4gICAgICAgIFsyLCAxLCAyLCAyLCAyLCAyXSxcclxuICAgICAgICBbMiwgMiwgMiwgMSwgMiwgMl0sXHJcbiAgICAgICAgWzIsIDIsIDIsIDIsIDIsIDFdLFxyXG4gICAgICAgIFsxLCAyLCAxLCAyLCAyLCAzXSxcclxuICAgICAgICBbMSwgMiwgMSwgMywgMiwgMl0sXHJcbiAgICAgICAgWzEsIDMsIDEsIDIsIDIsIDJdLFxyXG4gICAgICAgIFsxLCAyLCAyLCAyLCAxLCAzXSxcclxuICAgICAgICBbMSwgMiwgMiwgMywgMSwgMl0sXHJcbiAgICAgICAgWzEsIDMsIDIsIDIsIDEsIDJdLFxyXG4gICAgICAgIFsyLCAyLCAxLCAyLCAxLCAzXSxcclxuICAgICAgICBbMiwgMiwgMSwgMywgMSwgMl0sXHJcbiAgICAgICAgWzIsIDMsIDEsIDIsIDEsIDJdLFxyXG4gICAgICAgIFsxLCAxLCAyLCAyLCAzLCAyXSxcclxuICAgICAgICBbMSwgMiwgMiwgMSwgMywgMl0sXHJcbiAgICAgICAgWzEsIDIsIDIsIDIsIDMsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAzLCAyLCAyLCAyXSxcclxuICAgICAgICBbMSwgMiwgMywgMSwgMiwgMl0sXHJcbiAgICAgICAgWzEsIDIsIDMsIDIsIDIsIDFdLFxyXG4gICAgICAgIFsyLCAyLCAzLCAyLCAxLCAxXSxcclxuICAgICAgICBbMiwgMiwgMSwgMSwgMywgMl0sXHJcbiAgICAgICAgWzIsIDIsIDEsIDIsIDMsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAzLCAyLCAxLCAyXSxcclxuICAgICAgICBbMiwgMiwgMywgMSwgMSwgMl0sXHJcbiAgICAgICAgWzMsIDEsIDIsIDEsIDMsIDFdLFxyXG4gICAgICAgIFszLCAxLCAxLCAyLCAyLCAyXSxcclxuICAgICAgICBbMywgMiwgMSwgMSwgMiwgMl0sXHJcbiAgICAgICAgWzMsIDIsIDEsIDIsIDIsIDFdLFxyXG4gICAgICAgIFszLCAxLCAyLCAyLCAxLCAyXSxcclxuICAgICAgICBbMywgMiwgMiwgMSwgMSwgMl0sXHJcbiAgICAgICAgWzMsIDIsIDIsIDIsIDEsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAyLCAxLCAyLCAzXSxcclxuICAgICAgICBbMiwgMSwgMiwgMywgMiwgMV0sXHJcbiAgICAgICAgWzIsIDMsIDIsIDEsIDIsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAxLCAzLCAyLCAzXSxcclxuICAgICAgICBbMSwgMywgMSwgMSwgMiwgM10sXHJcbiAgICAgICAgWzEsIDMsIDEsIDMsIDIsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAyLCAzLCAxLCAzXSxcclxuICAgICAgICBbMSwgMywgMiwgMSwgMSwgM10sXHJcbiAgICAgICAgWzEsIDMsIDIsIDMsIDEsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAxLCAzLCAxLCAzXSxcclxuICAgICAgICBbMiwgMywgMSwgMSwgMSwgM10sXHJcbiAgICAgICAgWzIsIDMsIDEsIDMsIDEsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAyLCAxLCAzLCAzXSxcclxuICAgICAgICBbMSwgMSwgMiwgMywgMywgMV0sXHJcbiAgICAgICAgWzEsIDMsIDIsIDEsIDMsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAzLCAxLCAyLCAzXSxcclxuICAgICAgICBbMSwgMSwgMywgMywgMiwgMV0sXHJcbiAgICAgICAgWzEsIDMsIDMsIDEsIDIsIDFdLFxyXG4gICAgICAgIFszLCAxLCAzLCAxLCAyLCAxXSxcclxuICAgICAgICBbMiwgMSwgMSwgMywgMywgMV0sXHJcbiAgICAgICAgWzIsIDMsIDEsIDEsIDMsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAzLCAxLCAxLCAzXSxcclxuICAgICAgICBbMiwgMSwgMywgMywgMSwgMV0sXHJcbiAgICAgICAgWzIsIDEsIDMsIDEsIDMsIDFdLFxyXG4gICAgICAgIFszLCAxLCAxLCAxLCAyLCAzXSxcclxuICAgICAgICBbMywgMSwgMSwgMywgMiwgMV0sXHJcbiAgICAgICAgWzMsIDMsIDEsIDEsIDIsIDFdLFxyXG4gICAgICAgIFszLCAxLCAyLCAxLCAxLCAzXSxcclxuICAgICAgICBbMywgMSwgMiwgMywgMSwgMV0sXHJcbiAgICAgICAgWzMsIDMsIDIsIDEsIDEsIDFdLFxyXG4gICAgICAgIFszLCAxLCA0LCAxLCAxLCAxXSxcclxuICAgICAgICBbMiwgMiwgMSwgNCwgMSwgMV0sXHJcbiAgICAgICAgWzQsIDMsIDEsIDEsIDEsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAxLCAyLCAyLCA0XSxcclxuICAgICAgICBbMSwgMSwgMSwgNCwgMiwgMl0sXHJcbiAgICAgICAgWzEsIDIsIDEsIDEsIDIsIDRdLFxyXG4gICAgICAgIFsxLCAyLCAxLCA0LCAyLCAxXSxcclxuICAgICAgICBbMSwgNCwgMSwgMSwgMiwgMl0sXHJcbiAgICAgICAgWzEsIDQsIDEsIDIsIDIsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAyLCAyLCAxLCA0XSxcclxuICAgICAgICBbMSwgMSwgMiwgNCwgMSwgMl0sXHJcbiAgICAgICAgWzEsIDIsIDIsIDEsIDEsIDRdLFxyXG4gICAgICAgIFsxLCAyLCAyLCA0LCAxLCAxXSxcclxuICAgICAgICBbMSwgNCwgMiwgMSwgMSwgMl0sXHJcbiAgICAgICAgWzEsIDQsIDIsIDIsIDEsIDFdLFxyXG4gICAgICAgIFsyLCA0LCAxLCAyLCAxLCAxXSxcclxuICAgICAgICBbMiwgMiwgMSwgMSwgMSwgNF0sXHJcbiAgICAgICAgWzQsIDEsIDMsIDEsIDEsIDFdLFxyXG4gICAgICAgIFsyLCA0LCAxLCAxLCAxLCAyXSxcclxuICAgICAgICBbMSwgMywgNCwgMSwgMSwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDEsIDIsIDQsIDJdLFxyXG4gICAgICAgIFsxLCAyLCAxLCAxLCA0LCAyXSxcclxuICAgICAgICBbMSwgMiwgMSwgMiwgNCwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDQsIDIsIDEsIDJdLFxyXG4gICAgICAgIFsxLCAyLCA0LCAxLCAxLCAyXSxcclxuICAgICAgICBbMSwgMiwgNCwgMiwgMSwgMV0sXHJcbiAgICAgICAgWzQsIDEsIDEsIDIsIDEsIDJdLFxyXG4gICAgICAgIFs0LCAyLCAxLCAxLCAxLCAyXSxcclxuICAgICAgICBbNCwgMiwgMSwgMiwgMSwgMV0sXHJcbiAgICAgICAgWzIsIDEsIDIsIDEsIDQsIDFdLFxyXG4gICAgICAgIFsyLCAxLCA0LCAxLCAyLCAxXSxcclxuICAgICAgICBbNCwgMSwgMiwgMSwgMiwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDEsIDEsIDQsIDNdLFxyXG4gICAgICAgIFsxLCAxLCAxLCAzLCA0LCAxXSxcclxuICAgICAgICBbMSwgMywgMSwgMSwgNCwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDQsIDEsIDEsIDNdLFxyXG4gICAgICAgIFsxLCAxLCA0LCAzLCAxLCAxXSxcclxuICAgICAgICBbNCwgMSwgMSwgMSwgMSwgM10sXHJcbiAgICAgICAgWzQsIDEsIDEsIDMsIDEsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAzLCAxLCA0LCAxXSxcclxuICAgICAgICBbMSwgMSwgNCwgMSwgMywgMV0sXHJcbiAgICAgICAgWzMsIDEsIDEsIDEsIDQsIDFdLFxyXG4gICAgICAgIFs0LCAxLCAxLCAxLCAzLCAxXSxcclxuICAgICAgICBbMiwgMSwgMSwgNCwgMSwgMl0sXHJcbiAgICAgICAgWzIsIDEsIDEsIDIsIDEsIDRdLFxyXG4gICAgICAgIFsyLCAxLCAxLCAyLCAzLCAyXSxcclxuICAgICAgICBbMiwgMywgMywgMSwgMSwgMSwgMl1cclxuICAgIF19LFxyXG4gICAgU0lOR0xFX0NPREVfRVJST1I6IHt2YWx1ZTogMX0sXHJcbiAgICBBVkdfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjV9LFxyXG4gICAgRk9STUFUOiB7dmFsdWU6IFwiY29kZV8xMjhcIiwgd3JpdGVhYmxlOiBmYWxzZX1cclxufTtcclxuXHJcbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XHJcbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29kZTEyOFJlYWRlcjtcclxuXHJcbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlLl9kZWNvZGVDb2RlID0gZnVuY3Rpb24oc3RhcnQpIHtcclxuICAgIHZhciBjb3VudGVyID0gWzAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgb2Zmc2V0ID0gc3RhcnQsXHJcbiAgICAgICAgaXNXaGl0ZSA9ICFzZWxmLl9yb3dbb2Zmc2V0XSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxyXG4gICAgICAgICAgICBlbmQ6IHN0YXJ0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb2RlLFxyXG4gICAgICAgIGVycm9yLFxyXG4gICAgICAgIG5vcm1hbGl6ZWQ7XHJcblxyXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkID0gc2VsZi5fbm9ybWFsaXplKGNvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvZGUgPSAwOyBjb2RlIDwgc2VsZi5DT0RFX1BBVFRFUk4ubGVuZ3RoOyBjb2RlKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4obm9ybWFsaXplZCwgc2VsZi5DT0RFX1BBVFRFUk5bY29kZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBiZXN0TWF0Y2guZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb2RlID0gY29kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XHJcbiAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlLl9maW5kU3RhcnQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBjb3VudGVyID0gWzAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpLFxyXG4gICAgICAgIGlzV2hpdGUgPSBmYWxzZSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IDAsXHJcbiAgICAgICAgICAgIGVuZDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29kZSxcclxuICAgICAgICBlcnJvcixcclxuICAgICAgICBqLFxyXG4gICAgICAgIHN1bSxcclxuICAgICAgICBub3JtYWxpemVkO1xyXG5cclxuICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgc3VtID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgY291bnRlci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBjb3VudGVyW2pdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZCA9IHNlbGYuX25vcm1hbGl6ZShjb3VudGVyKTtcclxuICAgICAgICAgICAgICAgIGlmIChub3JtYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb2RlID0gc2VsZi5TVEFSVF9DT0RFX0E7IGNvZGUgPD0gc2VsZi5TVEFSVF9DT0RFX0M7IGNvZGUrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHNlbGYuX21hdGNoUGF0dGVybihub3JtYWxpemVkLCBzZWxmLkNPREVfUEFUVEVSTltjb2RlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciA8IGJlc3RNYXRjaC5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmNvZGUgPSBjb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJlc3RNYXRjaC5lcnJvciA8IHNlbGYuQVZHX0NPREVfRVJST1IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLnN0YXJ0ID0gaSAtIHN1bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVuZCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltqXSA9IGNvdW50ZXJbaiArIDJdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY291bnRlcls0XSA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyWzVdID0gMDtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MtLTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuQ29kZTEyOFJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIHN0YXJ0SW5mbyA9IHNlbGYuX2ZpbmRTdGFydCgpLFxyXG4gICAgICAgIGNvZGUgPSBudWxsLFxyXG4gICAgICAgIGRvbmUgPSBmYWxzZSxcclxuICAgICAgICByZXN1bHQgPSBbXSxcclxuICAgICAgICBtdWx0aXBsaWVyID0gMCxcclxuICAgICAgICBjaGVja3N1bSA9IDAsXHJcbiAgICAgICAgY29kZXNldCxcclxuICAgICAgICByYXdSZXN1bHQgPSBbXSxcclxuICAgICAgICBkZWNvZGVkQ29kZXMgPSBbXSxcclxuICAgICAgICBzaGlmdE5leHQgPSBmYWxzZSxcclxuICAgICAgICB1bnNoaWZ0LFxyXG4gICAgICAgIHJlbW92ZUxhc3RDaGFyYWN0ZXIgPSB0cnVlO1xyXG5cclxuICAgIGlmIChzdGFydEluZm8gPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvZGUgPSB7XHJcbiAgICAgICAgY29kZTogc3RhcnRJbmZvLmNvZGUsXHJcbiAgICAgICAgc3RhcnQ6IHN0YXJ0SW5mby5zdGFydCxcclxuICAgICAgICBlbmQ6IHN0YXJ0SW5mby5lbmRcclxuICAgIH07XHJcbiAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuICAgIGNoZWNrc3VtID0gY29kZS5jb2RlO1xyXG4gICAgc3dpdGNoIChjb2RlLmNvZGUpIHtcclxuICAgIGNhc2Ugc2VsZi5TVEFSVF9DT0RFX0E6XHJcbiAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9BO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBzZWxmLlNUQVJUX0NPREVfQjpcclxuICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0I7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIHNlbGYuU1RBUlRfQ09ERV9DOlxyXG4gICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQztcclxuICAgICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgd2hpbGUgKCFkb25lKSB7XHJcbiAgICAgICAgdW5zaGlmdCA9IHNoaWZ0TmV4dDtcclxuICAgICAgICBzaGlmdE5leHQgPSBmYWxzZTtcclxuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb2RlLmVuZCk7XHJcbiAgICAgICAgaWYgKGNvZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGNvZGUuY29kZSAhPT0gc2VsZi5TVE9QX0NPREUpIHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUxhc3RDaGFyYWN0ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29kZS5jb2RlICE9PSBzZWxmLlNUT1BfQ09ERSkge1xyXG4gICAgICAgICAgICAgICAgcmF3UmVzdWx0LnB1c2goY29kZS5jb2RlKTtcclxuICAgICAgICAgICAgICAgIG11bHRpcGxpZXIrKztcclxuICAgICAgICAgICAgICAgIGNoZWNrc3VtICs9IG11bHRpcGxpZXIgKiBjb2RlLmNvZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKGNvZGVzZXQpIHtcclxuICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQTpcclxuICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgPCA2NCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoMzIgKyBjb2RlLmNvZGUpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29kZS5jb2RlIDwgOTYpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUuY29kZSAtIDY0KSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgIT09IHNlbGYuU1RPUF9DT0RFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUxhc3RDaGFyYWN0ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjb2RlLmNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9TSElGVDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnROZXh0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9CO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9COlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0M6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLlNUT1BfQ09ERTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9COlxyXG4gICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSA8IDk2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgzMiArIGNvZGUuY29kZSkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29kZS5jb2RlICE9PSBzZWxmLlNUT1BfQ09ERSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVMYXN0Q2hhcmFjdGVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY29kZS5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfU0hJRlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0TmV4dCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9BO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9DOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5TVE9QX0NPREU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQzpcclxuICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgPCAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUgPCAxMCA/IFwiMFwiICsgY29kZS5jb2RlIDogY29kZS5jb2RlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSAhPT0gc2VsZi5TVE9QX0NPREUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTGFzdENoYXJhY3RlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvZGUuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0E6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9CO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuU1RPUF9DT0RFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkb25lID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVuc2hpZnQpIHtcclxuICAgICAgICAgICAgY29kZXNldCA9IGNvZGVzZXQgPT09IHNlbGYuQ09ERV9BID8gc2VsZi5DT0RFX0IgOiBzZWxmLkNPREVfQTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvZGUgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb2RlLmVuZCA9IHNlbGYuX25leHRVbnNldChzZWxmLl9yb3csIGNvZGUuZW5kKTtcclxuICAgIGlmICghc2VsZi5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlKGNvZGUpKXtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja3N1bSAtPSBtdWx0aXBsaWVyICogcmF3UmVzdWx0W3Jhd1Jlc3VsdC5sZW5ndGggLSAxXTtcclxuICAgIGlmIChjaGVja3N1bSAlIDEwMyAhPT0gcmF3UmVzdWx0W3Jhd1Jlc3VsdC5sZW5ndGggLSAxXSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghcmVzdWx0Lmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlbW92ZSBsYXN0IGNvZGUgZnJvbSByZXN1bHQgKGNoZWNrc3VtKVxyXG4gICAgaWYgKHJlbW92ZUxhc3RDaGFyYWN0ZXIpIHtcclxuICAgICAgICByZXN1bHQuc3BsaWNlKHJlc3VsdC5sZW5ndGggLSAxLCAxKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcclxuICAgICAgICBzdGFydDogc3RhcnRJbmZvLnN0YXJ0LFxyXG4gICAgICAgIGVuZDogY29kZS5lbmQsXHJcbiAgICAgICAgY29kZXNldDogY29kZXNldCxcclxuICAgICAgICBzdGFydEluZm86IHN0YXJ0SW5mbyxcclxuICAgICAgICBkZWNvZGVkQ29kZXM6IGRlY29kZWRDb2RlcyxcclxuICAgICAgICBlbmRJbmZvOiBjb2RlXHJcbiAgICB9O1xyXG59O1xyXG5cclxuXHJcbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbihlbmRJbmZvKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kO1xyXG5cclxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IGVuZEluZm8uZW5kICsgKChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpIC8gMik7XHJcbiAgICBpZiAodHJhaWxpbmdXaGl0ZXNwYWNlRW5kIDwgc2VsZi5fcm93Lmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKGVuZEluZm8uZW5kLCB0cmFpbGluZ1doaXRlc3BhY2VFbmQsIDApKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29kZTEyOFJlYWRlcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvY29kZV8xMjhfcmVhZGVyLmpzXG4gKiovIiwiZnVuY3Rpb24gQmFyY29kZVJlYWRlcihjb25maWcpIHtcclxuICAgIHRoaXMuX3JvdyA9IFtdO1xyXG4gICAgdGhpcy5jb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICByZXR1cm4gdGhpcztcclxufVxyXG5cclxuQmFyY29kZVJlYWRlci5wcm90b3R5cGUuX25leHRVbnNldCA9IGZ1bmN0aW9uKGxpbmUsIHN0YXJ0KSB7XHJcbiAgICB2YXIgaTtcclxuXHJcbiAgICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHN0YXJ0ID0gMDtcclxuICAgIH1cclxuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgbGluZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghbGluZVtpXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGluZS5sZW5ndGg7XHJcbn07XHJcblxyXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hQYXR0ZXJuID0gZnVuY3Rpb24oY291bnRlciwgY29kZSkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgZXJyb3IgPSAwLFxyXG4gICAgICAgIHNpbmdsZUVycm9yID0gMCxcclxuICAgICAgICBtb2R1bG8gPSB0aGlzLk1PRFVMTyxcclxuICAgICAgICBtYXhTaW5nbGVFcnJvciA9IHRoaXMuU0lOR0xFX0NPREVfRVJST1IgfHwgMTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHNpbmdsZUVycm9yID0gTWF0aC5hYnMoY29kZVtpXSAtIGNvdW50ZXJbaV0pO1xyXG4gICAgICAgIGlmIChzaW5nbGVFcnJvciA+IG1heFNpbmdsZUVycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIuTUFYX1ZBTFVFO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlcnJvciArPSBzaW5nbGVFcnJvcjtcclxuICAgIH1cclxuICAgIHJldHVybiBlcnJvciAvIG1vZHVsbztcclxufTtcclxuXHJcbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9uZXh0U2V0ID0gZnVuY3Rpb24obGluZSwgb2Zmc2V0KSB7XHJcbiAgICB2YXIgaTtcclxuXHJcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcclxuICAgIGZvciAoaSA9IG9mZnNldDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAobGluZVtpXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGluZS5sZW5ndGg7XHJcbn07XHJcblxyXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbm9ybWFsaXplID0gZnVuY3Rpb24oY291bnRlciwgbW9kdWxvKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBzdW0gPSAwLFxyXG4gICAgICAgIHJhdGlvLFxyXG4gICAgICAgIG51bU9uZXMgPSAwLFxyXG4gICAgICAgIG5vcm1hbGl6ZWQgPSBbXSxcclxuICAgICAgICBub3JtID0gMDtcclxuXHJcbiAgICBpZiAoIW1vZHVsbykge1xyXG4gICAgICAgIG1vZHVsbyA9IHNlbGYuTU9EVUxPO1xyXG4gICAgfVxyXG4gICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoY291bnRlcltpXSA9PT0gMSkge1xyXG4gICAgICAgICAgICBudW1PbmVzKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3VtICs9IGNvdW50ZXJbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmF0aW8gPSBzdW0gLyAobW9kdWxvIC0gbnVtT25lcyk7XHJcbiAgICBpZiAocmF0aW8gPiAxLjApIHtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBub3JtID0gY291bnRlcltpXSA9PT0gMSA/IGNvdW50ZXJbaV0gOiBjb3VudGVyW2ldIC8gcmF0aW87XHJcbiAgICAgICAgICAgIG5vcm1hbGl6ZWQucHVzaChub3JtKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJhdGlvID0gKHN1bSArIG51bU9uZXMpIC8gbW9kdWxvO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5vcm0gPSBjb3VudGVyW2ldIC8gcmF0aW87XHJcbiAgICAgICAgICAgIG5vcm1hbGl6ZWQucHVzaChub3JtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbm9ybWFsaXplZDtcclxufTtcclxuXHJcbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9tYXRjaFRyYWNlID0gZnVuY3Rpb24oY21wQ291bnRlciwgZXBzaWxvbikge1xyXG4gICAgdmFyIGNvdW50ZXIgPSBbXSxcclxuICAgICAgICBpLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KSxcclxuICAgICAgICBpc1doaXRlID0gIXNlbGYuX3Jvd1tvZmZzZXRdLFxyXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxyXG4gICAgICAgIGJlc3RNYXRjaCA9IHtcclxuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXHJcbiAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICBzdGFydDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I7XHJcblxyXG4gICAgaWYgKGNtcENvdW50ZXIpIHtcclxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGNtcENvdW50ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY291bnRlci5wdXNoKDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4oY291bnRlciwgY21wQ291bnRlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciA8IGVwc2lsb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLnN0YXJ0ID0gaSAtIG9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVuZCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb3VudGVyID0gY291bnRlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJlc3RNYXRjaDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xyXG4gICAgICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb3VudGVyLnB1c2goMCk7XHJcbiAgICAgICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xyXG4gICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xyXG4gICAgICAgICAgICAgICAgY291bnRlci5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XHJcbiAgICAgICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgY21wQ291bnRlciB3YXMgbm90IGdpdmVuXHJcbiAgICBiZXN0TWF0Y2guc3RhcnQgPSBvZmZzZXQ7XHJcbiAgICBiZXN0TWF0Y2guZW5kID0gc2VsZi5fcm93Lmxlbmd0aCAtIDE7XHJcbiAgICBiZXN0TWF0Y2guY291bnRlciA9IGNvdW50ZXI7XHJcbiAgICByZXR1cm4gYmVzdE1hdGNoO1xyXG59O1xyXG5cclxuQmFyY29kZVJlYWRlci5wcm90b3R5cGUuZGVjb2RlUGF0dGVybiA9IGZ1bmN0aW9uKHBhdHRlcm4pIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICByZXN1bHQ7XHJcblxyXG4gICAgc2VsZi5fcm93ID0gcGF0dGVybjtcclxuICAgIHJlc3VsdCA9IHNlbGYuX2RlY29kZSgpO1xyXG4gICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkge1xyXG4gICAgICAgIHNlbGYuX3Jvdy5yZXZlcnNlKCk7XHJcbiAgICAgICAgcmVzdWx0ID0gc2VsZi5fZGVjb2RlKCk7XHJcbiAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXN1bHQuZGlyZWN0aW9uID0gQmFyY29kZVJlYWRlci5ESVJFQ1RJT04uUkVWRVJTRTtcclxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0ID0gc2VsZi5fcm93Lmxlbmd0aCAtIHJlc3VsdC5zdGFydDtcclxuICAgICAgICAgICAgcmVzdWx0LmVuZCA9IHNlbGYuX3Jvdy5sZW5ndGggLSByZXN1bHQuZW5kO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzdWx0LmRpcmVjdGlvbiA9IEJhcmNvZGVSZWFkZXIuRElSRUNUSU9OLkZPUldBUkQ7XHJcbiAgICB9XHJcbiAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgcmVzdWx0LmZvcm1hdCA9IHNlbGYuRk9STUFUO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9tYXRjaFJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIGVuZCwgdmFsdWUpIHtcclxuICAgIHZhciBpO1xyXG5cclxuICAgIHN0YXJ0ID0gc3RhcnQgPCAwID8gMCA6IHN0YXJ0O1xyXG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xyXG4gICAgICAgIGlmICh0aGlzLl9yb3dbaV0gIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9maWxsQ291bnRlcnMgPSBmdW5jdGlvbihvZmZzZXQsIGVuZCwgaXNXaGl0ZSkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgY291bnRlcnMgPSBbXTtcclxuXHJcbiAgICBpc1doaXRlID0gKHR5cGVvZiBpc1doaXRlICE9PSAndW5kZWZpbmVkJykgPyBpc1doaXRlIDogdHJ1ZTtcclxuICAgIG9mZnNldCA9ICh0eXBlb2Ygb2Zmc2V0ICE9PSAndW5kZWZpbmVkJykgPyBvZmZzZXQgOiBzZWxmLl9uZXh0VW5zZXQoc2VsZi5fcm93KTtcclxuICAgIGVuZCA9IGVuZCB8fCBzZWxmLl9yb3cubGVuZ3RoO1xyXG5cclxuICAgIGNvdW50ZXJzW2NvdW50ZXJQb3NdID0gMDtcclxuICAgIGZvciAoaSA9IG9mZnNldDsgaSA8IGVuZDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcclxuICAgICAgICAgICAgY291bnRlcnNbY291bnRlclBvc10rKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb3VudGVyUG9zKys7XHJcbiAgICAgICAgICAgIGNvdW50ZXJzW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjb3VudGVycztcclxufTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgXCJGT1JNQVRcIiwge1xyXG4gICAgdmFsdWU6ICd1bmtub3duJyxcclxuICAgIHdyaXRlYWJsZTogZmFsc2VcclxufSk7XHJcblxyXG5CYXJjb2RlUmVhZGVyLkRJUkVDVElPTiA9IHtcclxuICAgIEZPUldBUkQ6IDEsXHJcbiAgICBSRVZFUlNFOiAtMVxyXG59O1xyXG5cclxuQmFyY29kZVJlYWRlci5FeGNlcHRpb24gPSB7XHJcbiAgICBTdGFydE5vdEZvdW5kRXhjZXB0aW9uOiBcIlN0YXJ0LUluZm8gd2FzIG5vdCBmb3VuZCFcIixcclxuICAgIENvZGVOb3RGb3VuZEV4Y2VwdGlvbjogXCJDb2RlIGNvdWxkIG5vdCBiZSBmb3VuZCFcIixcclxuICAgIFBhdHRlcm5Ob3RGb3VuZEV4Y2VwdGlvbjogXCJQYXR0ZXJuIGNvdWxkIG5vdCBiZSBmb3VuZCFcIlxyXG59O1xyXG5cclxuQmFyY29kZVJlYWRlci5DT05GSUdfS0VZUyA9IHt9O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFyY29kZVJlYWRlcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvYmFyY29kZV9yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgQmFyY29kZVJlYWRlciBmcm9tICcuL2JhcmNvZGVfcmVhZGVyJztcclxuXHJcbmZ1bmN0aW9uIEVBTlJlYWRlcihvcHRzKSB7XHJcbiAgICBCYXJjb2RlUmVhZGVyLmNhbGwodGhpcywgb3B0cyk7XHJcbn1cclxuXHJcbnZhciBwcm9wZXJ0aWVzID0ge1xyXG4gICAgQ09ERV9MX1NUQVJUOiB7dmFsdWU6IDB9LFxyXG4gICAgTU9EVUxPOiB7dmFsdWU6IDd9LFxyXG4gICAgQ09ERV9HX1NUQVJUOiB7dmFsdWU6IDEwfSxcclxuICAgIFNUQVJUX1BBVFRFUk46IHt2YWx1ZTogWzEgLyAzICogNywgMSAvIDMgKiA3LCAxIC8gMyAqIDddfSxcclxuICAgIFNUT1BfUEFUVEVSTjoge3ZhbHVlOiBbMSAvIDMgKiA3LCAxIC8gMyAqIDcsIDEgLyAzICogN119LFxyXG4gICAgTUlERExFX1BBVFRFUk46IHt2YWx1ZTogWzEgLyA1ICogNywgMSAvIDUgKiA3LCAxIC8gNSAqIDcsIDEgLyA1ICogNywgMSAvIDUgKiA3XX0sXHJcbiAgICBDT0RFX1BBVFRFUk46IHt2YWx1ZTogW1xyXG4gICAgICAgIFszLCAyLCAxLCAxXSxcclxuICAgICAgICBbMiwgMiwgMiwgMV0sXHJcbiAgICAgICAgWzIsIDEsIDIsIDJdLFxyXG4gICAgICAgIFsxLCA0LCAxLCAxXSxcclxuICAgICAgICBbMSwgMSwgMywgMl0sXHJcbiAgICAgICAgWzEsIDIsIDMsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAxLCA0XSxcclxuICAgICAgICBbMSwgMywgMSwgMl0sXHJcbiAgICAgICAgWzEsIDIsIDEsIDNdLFxyXG4gICAgICAgIFszLCAxLCAxLCAyXSxcclxuICAgICAgICBbMSwgMSwgMiwgM10sXHJcbiAgICAgICAgWzEsIDIsIDIsIDJdLFxyXG4gICAgICAgIFsyLCAyLCAxLCAyXSxcclxuICAgICAgICBbMSwgMSwgNCwgMV0sXHJcbiAgICAgICAgWzIsIDMsIDEsIDFdLFxyXG4gICAgICAgIFsxLCAzLCAyLCAxXSxcclxuICAgICAgICBbNCwgMSwgMSwgMV0sXHJcbiAgICAgICAgWzIsIDEsIDMsIDFdLFxyXG4gICAgICAgIFszLCAxLCAyLCAxXSxcclxuICAgICAgICBbMiwgMSwgMSwgM11cclxuICAgIF19LFxyXG4gICAgQ09ERV9GUkVRVUVOQ1k6IHt2YWx1ZTogWzAsIDExLCAxMywgMTQsIDE5LCAyNSwgMjgsIDIxLCAyMiwgMjZdfSxcclxuICAgIFNJTkdMRV9DT0RFX0VSUk9SOiB7dmFsdWU6IDAuNjd9LFxyXG4gICAgQVZHX0NPREVfRVJST1I6IHt2YWx1ZTogMC4yN30sXHJcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJlYW5fMTNcIiwgd3JpdGVhYmxlOiBmYWxzZX1cclxufTtcclxuXHJcbkVBTlJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcclxuRUFOUmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEVBTlJlYWRlcjtcclxuXHJcbkVBTlJlYWRlci5wcm90b3R5cGUuX2RlY29kZUNvZGUgPSBmdW5jdGlvbihzdGFydCwgY29kZXJhbmdlKSB7XHJcbiAgICB2YXIgY291bnRlciA9IFswLCAwLCAwLCAwXSxcclxuICAgICAgICBpLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIG9mZnNldCA9IHN0YXJ0LFxyXG4gICAgICAgIGlzV2hpdGUgPSAhc2VsZi5fcm93W29mZnNldF0sXHJcbiAgICAgICAgY291bnRlclBvcyA9IDAsXHJcbiAgICAgICAgYmVzdE1hdGNoID0ge1xyXG4gICAgICAgICAgICBlcnJvcjogTnVtYmVyLk1BWF9WQUxVRSxcclxuICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcclxuICAgICAgICAgICAgZW5kOiBzdGFydFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29kZSxcclxuICAgICAgICBlcnJvcixcclxuICAgICAgICBub3JtYWxpemVkO1xyXG5cclxuICAgIGlmICghY29kZXJhbmdlKSB7XHJcbiAgICAgICAgY29kZXJhbmdlID0gc2VsZi5DT0RFX1BBVFRFUk4ubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZCA9IHNlbGYuX25vcm1hbGl6ZShjb3VudGVyKTtcclxuICAgICAgICAgICAgICAgIGlmIChub3JtYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb2RlID0gMDsgY29kZSA8IGNvZGVyYW5nZTsgY29kZSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKG5vcm1hbGl6ZWQsIHNlbGYuQ09ERV9QQVRURVJOW2NvZGVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIDwgYmVzdE1hdGNoLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guY29kZSA9IGNvZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZW5kID0gaTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYmVzdE1hdGNoLmVycm9yID4gc2VsZi5BVkdfQ09ERV9FUlJPUikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJlc3RNYXRjaDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZmluZFBhdHRlcm4gPSBmdW5jdGlvbihwYXR0ZXJuLCBvZmZzZXQsIGlzV2hpdGUsIHRyeUhhcmRlciwgZXBzaWxvbikge1xyXG4gICAgdmFyIGNvdW50ZXIgPSBbXSxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxyXG4gICAgICAgIGJlc3RNYXRjaCA9IHtcclxuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXHJcbiAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICBzdGFydDogMCxcclxuICAgICAgICAgICAgZW5kOiAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcixcclxuICAgICAgICBqLFxyXG4gICAgICAgIHN1bSxcclxuICAgICAgICBub3JtYWxpemVkO1xyXG5cclxuICAgIGlmICghb2Zmc2V0KSB7XHJcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc1doaXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBpc1doaXRlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRyeUhhcmRlciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdHJ5SGFyZGVyID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIGVwc2lsb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGVwc2lsb24gPSBzZWxmLkFWR19DT0RFX0VSUk9SO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgcGF0dGVybi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvdW50ZXJbaV0gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgc3VtID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgY291bnRlci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBjb3VudGVyW2pdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZCA9IHNlbGYuX25vcm1hbGl6ZShjb3VudGVyKTtcclxuICAgICAgICAgICAgICAgIGlmIChub3JtYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4obm9ybWFsaXplZCwgcGF0dGVybik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciA8IGVwc2lsb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5zdGFydCA9IGkgLSBzdW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0cnlIYXJkZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IGNvdW50ZXIubGVuZ3RoIC0gMjsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbal0gPSBjb3VudGVyW2ogKyAyXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyLmxlbmd0aCAtIDJdID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXIubGVuZ3RoIC0gMV0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MtLTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XHJcbiAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbkVBTlJlYWRlci5wcm90b3R5cGUuX2ZpbmRTdGFydCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQsXHJcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpLFxyXG4gICAgICAgIHN0YXJ0SW5mbztcclxuXHJcbiAgICB3aGlsZSAoIXN0YXJ0SW5mbykge1xyXG4gICAgICAgIHN0YXJ0SW5mbyA9IHNlbGYuX2ZpbmRQYXR0ZXJuKHNlbGYuU1RBUlRfUEFUVEVSTiwgb2Zmc2V0KTtcclxuICAgICAgICBpZiAoIXN0YXJ0SW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGVhZGluZ1doaXRlc3BhY2VTdGFydCA9IHN0YXJ0SW5mby5zdGFydCAtIChzdGFydEluZm8uZW5kIC0gc3RhcnRJbmZvLnN0YXJ0KTtcclxuICAgICAgICBpZiAobGVhZGluZ1doaXRlc3BhY2VTdGFydCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQsIHN0YXJ0SW5mby5zdGFydCwgMCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGFydEluZm87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgb2Zmc2V0ID0gc3RhcnRJbmZvLmVuZDtcclxuICAgICAgICBzdGFydEluZm8gPSBudWxsO1xyXG4gICAgfVxyXG59O1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZS5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlID0gZnVuY3Rpb24oZW5kSW5mbykge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZDtcclxuXHJcbiAgICB0cmFpbGluZ1doaXRlc3BhY2VFbmQgPSBlbmRJbmZvLmVuZCArIChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpO1xyXG4gICAgaWYgKHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA8IHNlbGYuX3Jvdy5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoc2VsZi5fbWF0Y2hSYW5nZShlbmRJbmZvLmVuZCwgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kLCAwKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZW5kSW5mbztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbkVBTlJlYWRlci5wcm90b3R5cGUuX2ZpbmRFbmQgPSBmdW5jdGlvbihvZmZzZXQsIGlzV2hpdGUpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBlbmRJbmZvID0gc2VsZi5fZmluZFBhdHRlcm4oc2VsZi5TVE9QX1BBVFRFUk4sIG9mZnNldCwgaXNXaGl0ZSwgZmFsc2UpO1xyXG5cclxuICAgIHJldHVybiBlbmRJbmZvICE9PSBudWxsID8gc2VsZi5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlKGVuZEluZm8pIDogbnVsbDtcclxufTtcclxuXHJcbkVBTlJlYWRlci5wcm90b3R5cGUuX2NhbGN1bGF0ZUZpcnN0RGlnaXQgPSBmdW5jdGlvbihjb2RlRnJlcXVlbmN5KSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBzZWxmID0gdGhpcztcclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IHNlbGYuQ09ERV9GUkVRVUVOQ1kubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoY29kZUZyZXF1ZW5jeSA9PT0gc2VsZi5DT0RFX0ZSRVFVRU5DWVtpXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbkVBTlJlYWRlci5wcm90b3R5cGUuX2RlY29kZVBheWxvYWQgPSBmdW5jdGlvbihjb2RlLCByZXN1bHQsIGRlY29kZWRDb2Rlcykge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgY29kZUZyZXF1ZW5jeSA9IDB4MCxcclxuICAgICAgICBmaXJzdERpZ2l0O1xyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAgICAgY29kZSA9IHNlbGYuX2RlY29kZUNvZGUoY29kZS5lbmQpO1xyXG4gICAgICAgIGlmICghY29kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvZGUuY29kZSA+PSBzZWxmLkNPREVfR19TVEFSVCkge1xyXG4gICAgICAgICAgICBjb2RlLmNvZGUgPSBjb2RlLmNvZGUgLSBzZWxmLkNPREVfR19TVEFSVDtcclxuICAgICAgICAgICAgY29kZUZyZXF1ZW5jeSB8PSAxIDw8ICg1IC0gaSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29kZUZyZXF1ZW5jeSB8PSAwIDw8ICg1IC0gaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSk7XHJcbiAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmlyc3REaWdpdCA9IHNlbGYuX2NhbGN1bGF0ZUZpcnN0RGlnaXQoY29kZUZyZXF1ZW5jeSk7XHJcbiAgICBpZiAoZmlyc3REaWdpdCA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmVzdWx0LnVuc2hpZnQoZmlyc3REaWdpdCk7XHJcblxyXG4gICAgY29kZSA9IHNlbGYuX2ZpbmRQYXR0ZXJuKHNlbGYuTUlERExFX1BBVFRFUk4sIGNvZGUuZW5kLCB0cnVlLCBmYWxzZSk7XHJcbiAgICBpZiAoY29kZSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCA2OyBpKyspIHtcclxuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb2RlLmVuZCwgc2VsZi5DT0RFX0dfU1RBUlQpO1xyXG4gICAgICAgIGlmICghY29kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XHJcbiAgICAgICAgcmVzdWx0LnB1c2goY29kZS5jb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29kZTtcclxufTtcclxuXHJcbkVBTlJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHN0YXJ0SW5mbyxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBjb2RlLFxyXG4gICAgICAgIHJlc3VsdCA9IFtdLFxyXG4gICAgICAgIGRlY29kZWRDb2RlcyA9IFtdO1xyXG5cclxuICAgIHN0YXJ0SW5mbyA9IHNlbGYuX2ZpbmRTdGFydCgpO1xyXG4gICAgaWYgKCFzdGFydEluZm8pIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvZGUgPSB7XHJcbiAgICAgICAgY29kZTogc3RhcnRJbmZvLmNvZGUsXHJcbiAgICAgICAgc3RhcnQ6IHN0YXJ0SW5mby5zdGFydCxcclxuICAgICAgICBlbmQ6IHN0YXJ0SW5mby5lbmRcclxuICAgIH07XHJcbiAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVQYXlsb2FkKGNvZGUsIHJlc3VsdCwgZGVjb2RlZENvZGVzKTtcclxuICAgIGlmICghY29kZSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY29kZSA9IHNlbGYuX2ZpbmRFbmQoY29kZS5lbmQsIGZhbHNlKTtcclxuICAgIGlmICghY29kZSl7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XHJcblxyXG4gICAgLy8gQ2hlY2tzdW1cclxuICAgIGlmICghc2VsZi5fY2hlY2tzdW0ocmVzdWx0KSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogcmVzdWx0LmpvaW4oXCJcIiksXHJcbiAgICAgICAgc3RhcnQ6IHN0YXJ0SW5mby5zdGFydCxcclxuICAgICAgICBlbmQ6IGNvZGUuZW5kLFxyXG4gICAgICAgIGNvZGVzZXQ6IFwiXCIsXHJcbiAgICAgICAgc3RhcnRJbmZvOiBzdGFydEluZm8sXHJcbiAgICAgICAgZGVjb2RlZENvZGVzOiBkZWNvZGVkQ29kZXNcclxuICAgIH07XHJcbn07XHJcblxyXG5FQU5SZWFkZXIucHJvdG90eXBlLl9jaGVja3N1bSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgdmFyIHN1bSA9IDAsIGk7XHJcblxyXG4gICAgZm9yICggaSA9IHJlc3VsdC5sZW5ndGggLSAyOyBpID49IDA7IGkgLT0gMikge1xyXG4gICAgICAgIHN1bSArPSByZXN1bHRbaV07XHJcbiAgICB9XHJcbiAgICBzdW0gKj0gMztcclxuICAgIGZvciAoIGkgPSByZXN1bHQubGVuZ3RoIC0gMTsgaSA+PSAwOyBpIC09IDIpIHtcclxuICAgICAgICBzdW0gKz0gcmVzdWx0W2ldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1bSAlIDEwID09PSAwO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKEVBTlJlYWRlcik7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2Vhbl9yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgQmFyY29kZVJlYWRlciBmcm9tICcuL2JhcmNvZGVfcmVhZGVyJztcclxuaW1wb3J0IEFycmF5SGVscGVyIGZyb20gJy4vYXJyYXlfaGVscGVyJztcclxuXHJcbmZ1bmN0aW9uIENvZGUzOVJlYWRlcigpIHtcclxuICAgIEJhcmNvZGVSZWFkZXIuY2FsbCh0aGlzKTtcclxufVxyXG5cclxudmFyIHByb3BlcnRpZXMgPSB7XHJcbiAgICBBTFBIQUJFVEhfU1RSSU5HOiB7dmFsdWU6IFwiMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaLS4gKiQvKyVcIn0sXHJcbiAgICBBTFBIQUJFVDoge3ZhbHVlOiBbNDgsIDQ5LCA1MCwgNTEsIDUyLCA1MywgNTQsIDU1LCA1NiwgNTcsIDY1LCA2NiwgNjcsIDY4LCA2OSwgNzAsIDcxLCA3MiwgNzMsIDc0LCA3NSwgNzYsIDc3LCA3OCxcclxuICAgICAgICA3OSwgODAsIDgxLCA4MiwgODMsIDg0LCA4NSwgODYsIDg3LCA4OCwgODksIDkwLCA0NSwgNDYsIDMyLCA0MiwgMzYsIDQ3LCA0MywgMzddfSxcclxuICAgIENIQVJBQ1RFUl9FTkNPRElOR1M6IHt2YWx1ZTogWzB4MDM0LCAweDEyMSwgMHgwNjEsIDB4MTYwLCAweDAzMSwgMHgxMzAsIDB4MDcwLCAweDAyNSwgMHgxMjQsIDB4MDY0LCAweDEwOSwgMHgwNDksXHJcbiAgICAgICAgMHgxNDgsIDB4MDE5LCAweDExOCwgMHgwNTgsIDB4MDBELCAweDEwQywgMHgwNEMsIDB4MDFDLCAweDEwMywgMHgwNDMsIDB4MTQyLCAweDAxMywgMHgxMTIsIDB4MDUyLCAweDAwNywgMHgxMDYsXHJcbiAgICAgICAgMHgwNDYsIDB4MDE2LCAweDE4MSwgMHgwQzEsIDB4MUMwLCAweDA5MSwgMHgxOTAsIDB4MEQwLCAweDA4NSwgMHgxODQsIDB4MEM0LCAweDA5NCwgMHgwQTgsIDB4MEEyLCAweDA4QSwgMHgwMkFcclxuICAgIF19LFxyXG4gICAgQVNURVJJU0s6IHt2YWx1ZTogMHgwOTR9LFxyXG4gICAgRk9STUFUOiB7dmFsdWU6IFwiY29kZV8zOVwiLCB3cml0ZWFibGU6IGZhbHNlfVxyXG59O1xyXG5cclxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFyY29kZVJlYWRlci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xyXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29kZTM5UmVhZGVyO1xyXG5cclxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fdG9Db3VudGVycyA9IGZ1bmN0aW9uKHN0YXJ0LCBjb3VudGVyKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgbnVtQ291bnRlcnMgPSBjb3VudGVyLmxlbmd0aCxcclxuICAgICAgICBlbmQgPSBzZWxmLl9yb3cubGVuZ3RoLFxyXG4gICAgICAgIGlzV2hpdGUgPSAhc2VsZi5fcm93W3N0YXJ0XSxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwO1xyXG5cclxuICAgIEFycmF5SGVscGVyLmluaXQoY291bnRlciwgMCk7XHJcblxyXG4gICAgZm9yICggaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcclxuICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY291bnRlclBvcysrO1xyXG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gbnVtQ291bnRlcnMpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XHJcbiAgICAgICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvdW50ZXI7XHJcbn07XHJcblxyXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl9kZWNvZGUgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBjb3VudGVycyA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICByZXN1bHQgPSBbXSxcclxuICAgICAgICBzdGFydCA9IHNlbGYuX2ZpbmRTdGFydCgpLFxyXG4gICAgICAgIGRlY29kZWRDaGFyLFxyXG4gICAgICAgIGxhc3RTdGFydCxcclxuICAgICAgICBwYXR0ZXJuLFxyXG4gICAgICAgIG5leHRTdGFydDtcclxuXHJcbiAgICBpZiAoIXN0YXJ0KSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBuZXh0U3RhcnQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3Jvdywgc3RhcnQuZW5kKTtcclxuXHJcbiAgICBkbyB7XHJcbiAgICAgICAgY291bnRlcnMgPSBzZWxmLl90b0NvdW50ZXJzKG5leHRTdGFydCwgY291bnRlcnMpO1xyXG4gICAgICAgIHBhdHRlcm4gPSBzZWxmLl90b1BhdHRlcm4oY291bnRlcnMpO1xyXG4gICAgICAgIGlmIChwYXR0ZXJuIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVjb2RlZENoYXIgPSBzZWxmLl9wYXR0ZXJuVG9DaGFyKHBhdHRlcm4pO1xyXG4gICAgICAgIGlmIChkZWNvZGVkQ2hhciA8IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0LnB1c2goZGVjb2RlZENoYXIpO1xyXG4gICAgICAgIGxhc3RTdGFydCA9IG5leHRTdGFydDtcclxuICAgICAgICBuZXh0U3RhcnQgKz0gQXJyYXlIZWxwZXIuc3VtKGNvdW50ZXJzKTtcclxuICAgICAgICBuZXh0U3RhcnQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3JvdywgbmV4dFN0YXJ0KTtcclxuICAgIH0gd2hpbGUgKGRlY29kZWRDaGFyICE9PSAnKicpO1xyXG4gICAgcmVzdWx0LnBvcCgpO1xyXG5cclxuICAgIGlmICghcmVzdWx0Lmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghc2VsZi5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlKGxhc3RTdGFydCwgbmV4dFN0YXJ0LCBjb3VudGVycykpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvZGU6IHJlc3VsdC5qb2luKFwiXCIpLFxyXG4gICAgICAgIHN0YXJ0OiBzdGFydC5zdGFydCxcclxuICAgICAgICBlbmQ6IG5leHRTdGFydCxcclxuICAgICAgICBzdGFydEluZm86IHN0YXJ0LFxyXG4gICAgICAgIGRlY29kZWRDb2RlczogcmVzdWx0XHJcbiAgICB9O1xyXG59O1xyXG5cclxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlID0gZnVuY3Rpb24obGFzdFN0YXJ0LCBuZXh0U3RhcnQsIGNvdW50ZXJzKSB7XHJcbiAgICB2YXIgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kLFxyXG4gICAgICAgIHBhdHRlcm5TaXplID0gQXJyYXlIZWxwZXIuc3VtKGNvdW50ZXJzKTtcclxuXHJcbiAgICB0cmFpbGluZ1doaXRlc3BhY2VFbmQgPSBuZXh0U3RhcnQgLSBsYXN0U3RhcnQgLSBwYXR0ZXJuU2l6ZTtcclxuICAgIGlmICgodHJhaWxpbmdXaGl0ZXNwYWNlRW5kICogMykgPj0gcGF0dGVyblNpemUpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX3BhdHRlcm5Ub0NoYXIgPSBmdW5jdGlvbihwYXR0ZXJuKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBzZWxmID0gdGhpcztcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgc2VsZi5DSEFSQUNURVJfRU5DT0RJTkdTLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuQ0hBUkFDVEVSX0VOQ09ESU5HU1tpXSA9PT0gcGF0dGVybikge1xyXG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShzZWxmLkFMUEhBQkVUW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLTE7XHJcbn07XHJcblxyXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl9maW5kTmV4dFdpZHRoID0gZnVuY3Rpb24oY291bnRlcnMsIGN1cnJlbnQpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIG1pbldpZHRoID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoY291bnRlcnNbaV0gPCBtaW5XaWR0aCAmJiBjb3VudGVyc1tpXSA+IGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgbWluV2lkdGggPSBjb3VudGVyc1tpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1pbldpZHRoO1xyXG59O1xyXG5cclxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fdG9QYXR0ZXJuID0gZnVuY3Rpb24oY291bnRlcnMpIHtcclxuICAgIHZhciBudW1Db3VudGVycyA9IGNvdW50ZXJzLmxlbmd0aCxcclxuICAgICAgICBtYXhOYXJyb3dXaWR0aCA9IDAsXHJcbiAgICAgICAgbnVtV2lkZUJhcnMgPSBudW1Db3VudGVycyxcclxuICAgICAgICB3aWRlQmFyV2lkdGggPSAwLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIHBhdHRlcm4sXHJcbiAgICAgICAgaTtcclxuXHJcbiAgICB3aGlsZSAobnVtV2lkZUJhcnMgPiAzKSB7XHJcbiAgICAgICAgbWF4TmFycm93V2lkdGggPSBzZWxmLl9maW5kTmV4dFdpZHRoKGNvdW50ZXJzLCBtYXhOYXJyb3dXaWR0aCk7XHJcbiAgICAgICAgbnVtV2lkZUJhcnMgPSAwO1xyXG4gICAgICAgIHBhdHRlcm4gPSAwO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBudW1Db3VudGVyczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudGVyc1tpXSA+IG1heE5hcnJvd1dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBwYXR0ZXJuIHw9IDEgPDwgKG51bUNvdW50ZXJzIC0gMSAtIGkpO1xyXG4gICAgICAgICAgICAgICAgbnVtV2lkZUJhcnMrKztcclxuICAgICAgICAgICAgICAgIHdpZGVCYXJXaWR0aCArPSBjb3VudGVyc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG51bVdpZGVCYXJzID09PSAzKSB7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBudW1Db3VudGVycyAmJiBudW1XaWRlQmFycyA+IDA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ZXJzW2ldID4gbWF4TmFycm93V2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBudW1XaWRlQmFycy0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoY291bnRlcnNbaV0gKiAyKSA+PSB3aWRlQmFyV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcGF0dGVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLTE7XHJcbn07XHJcblxyXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl9maW5kU3RhcnQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3JvdyksXHJcbiAgICAgICAgcGF0dGVyblN0YXJ0ID0gb2Zmc2V0LFxyXG4gICAgICAgIGNvdW50ZXIgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgY291bnRlclBvcyA9IDAsXHJcbiAgICAgICAgaXNXaGl0ZSA9IGZhbHNlLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgaixcclxuICAgICAgICB3aGl0ZVNwYWNlTXVzdFN0YXJ0O1xyXG5cclxuICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gZmluZCBzdGFydCBwYXR0ZXJuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5fdG9QYXR0ZXJuKGNvdW50ZXIpID09PSBzZWxmLkFTVEVSSVNLKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpdGVTcGFjZU11c3RTdGFydCA9IE1hdGguZmxvb3IoTWF0aC5tYXgoMCwgcGF0dGVyblN0YXJ0IC0gKChpIC0gcGF0dGVyblN0YXJ0KSAvIDQpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2Uod2hpdGVTcGFjZU11c3RTdGFydCwgcGF0dGVyblN0YXJ0LCAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHBhdHRlcm5TdGFydCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwYXR0ZXJuU3RhcnQgKz0gY291bnRlclswXSArIGNvdW50ZXJbMV07XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IDc7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbal0gPSBjb3VudGVyW2ogKyAyXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvdW50ZXJbN10gPSAwO1xyXG4gICAgICAgICAgICAgICAgY291bnRlcls4XSA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zLS07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XHJcbiAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvZGUzOVJlYWRlcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvY29kZV8zOV9yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgQ29kZTM5UmVhZGVyIGZyb20gJy4vY29kZV8zOV9yZWFkZXInO1xyXG5cclxuZnVuY3Rpb24gQ29kZTM5VklOUmVhZGVyKCkge1xyXG4gICAgQ29kZTM5UmVhZGVyLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbnZhciBwYXR0ZXJucyA9IHtcclxuICAgIElPUTogL1tJT1FdL2csXHJcbiAgICBBWjA5OiAvW0EtWjAtOV17MTd9L1xyXG59O1xyXG5cclxuQ29kZTM5VklOUmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ29kZTM5UmVhZGVyLnByb3RvdHlwZSk7XHJcbkNvZGUzOVZJTlJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb2RlMzlWSU5SZWFkZXI7XHJcblxyXG4vLyBDcmliYmVkIGZyb206XHJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96eGluZy96eGluZy9ibG9iL21hc3Rlci9jb3JlL3NyYy9tYWluL2phdmEvY29tL2dvb2dsZS96eGluZy9jbGllbnQvcmVzdWx0L1ZJTlJlc3VsdFBhcnNlci5qYXZhXHJcbkNvZGUzOVZJTlJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHJlc3VsdCA9IENvZGUzOVJlYWRlci5wcm90b3R5cGUuX2RlY29kZS5hcHBseSh0aGlzKTtcclxuICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNvZGUgPSByZXN1bHQuY29kZTtcclxuXHJcbiAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKHBhdHRlcm5zLklPUSwgJycpO1xyXG5cclxuICAgIGlmICghY29kZS5tYXRjaChwYXR0ZXJucy5BWjA5KSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgQVowOSBwYXR0ZXJuIGNvZGU6JywgY29kZSk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLl9jaGVja0NoZWNrc3VtKGNvZGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdWx0LmNvZGUgPSBjb2RlO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbkNvZGUzOVZJTlJlYWRlci5wcm90b3R5cGUuX2NoZWNrQ2hlY2tzdW0gPSBmdW5jdGlvbihjb2RlKSB7XHJcbiAgICAvLyBUT0RPXHJcbiAgICByZXR1cm4gISFjb2RlO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29kZTM5VklOUmVhZGVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9jb2RlXzM5X3Zpbl9yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgQmFyY29kZVJlYWRlciBmcm9tICcuL2JhcmNvZGVfcmVhZGVyJztcclxuXHJcbmZ1bmN0aW9uIENvZGFiYXJSZWFkZXIoKSB7XHJcbiAgICBCYXJjb2RlUmVhZGVyLmNhbGwodGhpcyk7XHJcbiAgICB0aGlzLl9jb3VudGVycyA9IFtdO1xyXG59XHJcblxyXG52YXIgcHJvcGVydGllcyA9IHtcclxuICAgIEFMUEhBQkVUSF9TVFJJTkc6IHt2YWx1ZTogXCIwMTIzNDU2Nzg5LSQ6Ly4rQUJDRFwifSxcclxuICAgIEFMUEhBQkVUOiB7dmFsdWU6IFs0OCwgNDksIDUwLCA1MSwgNTIsIDUzLCA1NCwgNTUsIDU2LCA1NywgNDUsIDM2LCA1OCwgNDcsIDQ2LCA0MywgNjUsIDY2LCA2NywgNjhdfSxcclxuICAgIENIQVJBQ1RFUl9FTkNPRElOR1M6IHt2YWx1ZTogWzB4MDAzLCAweDAwNiwgMHgwMDksIDB4MDYwLCAweDAxMiwgMHgwNDIsIDB4MDIxLCAweDAyNCwgMHgwMzAsIDB4MDQ4LCAweDAwYywgMHgwMTgsXHJcbiAgICAgICAgMHgwNDUsIDB4MDUxLCAweDA1NCwgMHgwMTUsIDB4MDFBLCAweDAyOSwgMHgwMEIsIDB4MDBFXX0sXHJcbiAgICBTVEFSVF9FTkQ6IHt2YWx1ZTogWzB4MDFBLCAweDAyOSwgMHgwMEIsIDB4MDBFXX0sXHJcbiAgICBNSU5fRU5DT0RFRF9DSEFSUzoge3ZhbHVlOiA0fSxcclxuICAgIE1BWF9BQ0NFUFRBQkxFOiB7dmFsdWU6IDIuMH0sXHJcbiAgICBQQURESU5HOiB7dmFsdWU6IDEuNX0sXHJcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJjb2RhYmFyXCIsIHdyaXRlYWJsZTogZmFsc2V9XHJcbn07XHJcblxyXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFyY29kZVJlYWRlci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xyXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvZGFiYXJSZWFkZXI7XHJcblxyXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgcmVzdWx0ID0gW10sXHJcbiAgICAgICAgc3RhcnQsXHJcbiAgICAgICAgZGVjb2RlZENoYXIsXHJcbiAgICAgICAgcGF0dGVybixcclxuICAgICAgICBuZXh0U3RhcnQsXHJcbiAgICAgICAgZW5kO1xyXG5cclxuICAgIHRoaXMuX2NvdW50ZXJzID0gc2VsZi5fZmlsbENvdW50ZXJzKCk7XHJcbiAgICBzdGFydCA9IHNlbGYuX2ZpbmRTdGFydCgpO1xyXG4gICAgaWYgKCFzdGFydCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgbmV4dFN0YXJ0ID0gc3RhcnQuc3RhcnRDb3VudGVyO1xyXG5cclxuICAgIGRvIHtcclxuICAgICAgICBwYXR0ZXJuID0gc2VsZi5fdG9QYXR0ZXJuKG5leHRTdGFydCk7XHJcbiAgICAgICAgaWYgKHBhdHRlcm4gPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWNvZGVkQ2hhciA9IHNlbGYuX3BhdHRlcm5Ub0NoYXIocGF0dGVybik7XHJcbiAgICAgICAgaWYgKGRlY29kZWRDaGFyIDwgMCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQucHVzaChkZWNvZGVkQ2hhcik7XHJcbiAgICAgICAgbmV4dFN0YXJ0ICs9IDg7XHJcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAxICYmIHNlbGYuX2lzU3RhcnRFbmQocGF0dGVybikpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSB3aGlsZSAobmV4dFN0YXJ0IDwgc2VsZi5fY291bnRlcnMubGVuZ3RoKTtcclxuXHJcbiAgICAvLyB2ZXJpZnkgZW5kXHJcbiAgICBpZiAoKHJlc3VsdC5sZW5ndGggLSAyKSA8IHNlbGYuTUlOX0VOQ09ERURfQ0hBUlMgfHwgIXNlbGYuX2lzU3RhcnRFbmQocGF0dGVybikpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyB2ZXJpZnkgZW5kIHdoaXRlIHNwYWNlXHJcbiAgICBpZiAoIXNlbGYuX3ZlcmlmeVdoaXRlc3BhY2Uoc3RhcnQuc3RhcnRDb3VudGVyLCBuZXh0U3RhcnQgLSA4KSl7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFzZWxmLl92YWxpZGF0ZVJlc3VsdChyZXN1bHQsIHN0YXJ0LnN0YXJ0Q291bnRlcikpe1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIG5leHRTdGFydCA9IG5leHRTdGFydCA+IHNlbGYuX2NvdW50ZXJzLmxlbmd0aCA/IHNlbGYuX2NvdW50ZXJzLmxlbmd0aCA6IG5leHRTdGFydDtcclxuICAgIGVuZCA9IHN0YXJ0LnN0YXJ0ICsgc2VsZi5fc3VtQ291bnRlcnMoc3RhcnQuc3RhcnRDb3VudGVyLCBuZXh0U3RhcnQgLSA4KTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvZGU6IHJlc3VsdC5qb2luKFwiXCIpLFxyXG4gICAgICAgIHN0YXJ0OiBzdGFydC5zdGFydCxcclxuICAgICAgICBlbmQ6IGVuZCxcclxuICAgICAgICBzdGFydEluZm86IHN0YXJ0LFxyXG4gICAgICAgIGRlY29kZWRDb2RlczogcmVzdWx0XHJcbiAgICB9O1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeVdoaXRlc3BhY2UgPSBmdW5jdGlvbihzdGFydENvdW50ZXIsIGVuZENvdW50ZXIpIHtcclxuICAgIGlmICgoc3RhcnRDb3VudGVyIC0gMSA8PSAwKVxyXG4gICAgICAgICAgICB8fCB0aGlzLl9jb3VudGVyc1tzdGFydENvdW50ZXIgLSAxXSA+PSAodGhpcy5fY2FsY3VsYXRlUGF0dGVybkxlbmd0aChzdGFydENvdW50ZXIpIC8gMi4wKSkge1xyXG4gICAgICAgIGlmICgoZW5kQ291bnRlciArIDggPj0gdGhpcy5fY291bnRlcnMubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5fY291bnRlcnNbZW5kQ291bnRlciArIDddID49ICh0aGlzLl9jYWxjdWxhdGVQYXR0ZXJuTGVuZ3RoKGVuZENvdW50ZXIpIC8gMi4wKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fY2FsY3VsYXRlUGF0dGVybkxlbmd0aCA9IGZ1bmN0aW9uKG9mZnNldCkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc3VtID0gMDtcclxuXHJcbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBvZmZzZXQgKyA3OyBpKyspIHtcclxuICAgICAgICBzdW0gKz0gdGhpcy5fY291bnRlcnNbaV07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN1bTtcclxufTtcclxuXHJcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl90aHJlc2hvbGRSZXN1bHRQYXR0ZXJuID0gZnVuY3Rpb24ocmVzdWx0LCBzdGFydENvdW50ZXIpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGNhdGVnb3JpemF0aW9uID0ge1xyXG4gICAgICAgICAgICBzcGFjZToge1xyXG4gICAgICAgICAgICAgICAgbmFycm93OiB7IHNpemU6IDAsIGNvdW50czogMCwgbWluOiAwLCBtYXg6IE51bWJlci5NQVhfVkFMVUV9LFxyXG4gICAgICAgICAgICAgICAgd2lkZToge3NpemU6IDAsIGNvdW50czogMCwgbWluOiAwLCBtYXg6IE51bWJlci5NQVhfVkFMVUV9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJhcjoge1xyXG4gICAgICAgICAgICAgICAgbmFycm93OiB7IHNpemU6IDAsIGNvdW50czogMCwgbWluOiAwLCBtYXg6IE51bWJlci5NQVhfVkFMVUV9LFxyXG4gICAgICAgICAgICAgICAgd2lkZTogeyBzaXplOiAwLCBjb3VudHM6IDAsIG1pbjogMCwgbWF4OiBOdW1iZXIuTUFYX1ZBTFVFfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBraW5kLFxyXG4gICAgICAgIGNhdCxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGosXHJcbiAgICAgICAgcG9zID0gc3RhcnRDb3VudGVyLFxyXG4gICAgICAgIHBhdHRlcm47XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgcGF0dGVybiA9IHNlbGYuX2NoYXJUb1BhdHRlcm4ocmVzdWx0W2ldKTtcclxuICAgICAgICBmb3IgKGogPSA2OyBqID49IDA7IGotLSkge1xyXG4gICAgICAgICAgICBraW5kID0gKGogJiAxKSA9PT0gMiA/IGNhdGVnb3JpemF0aW9uLmJhciA6IGNhdGVnb3JpemF0aW9uLnNwYWNlO1xyXG4gICAgICAgICAgICBjYXQgPSAocGF0dGVybiAmIDEpID09PSAxID8ga2luZC53aWRlIDoga2luZC5uYXJyb3c7XHJcbiAgICAgICAgICAgIGNhdC5zaXplICs9IHNlbGYuX2NvdW50ZXJzW3BvcyArIGpdO1xyXG4gICAgICAgICAgICBjYXQuY291bnRzKys7XHJcbiAgICAgICAgICAgIHBhdHRlcm4gPj49IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBvcyArPSA4O1xyXG4gICAgfVxyXG5cclxuICAgIFtcInNwYWNlXCIsIFwiYmFyXCJdLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgdmFyIG5ld2tpbmQgPSBjYXRlZ29yaXphdGlvbltrZXldO1xyXG4gICAgICAgIG5ld2tpbmQud2lkZS5taW4gPVxyXG4gICAgICAgICAgICBNYXRoLmZsb29yKChuZXdraW5kLm5hcnJvdy5zaXplIC8gbmV3a2luZC5uYXJyb3cuY291bnRzICsgbmV3a2luZC53aWRlLnNpemUgLyBuZXdraW5kLndpZGUuY291bnRzKSAvIDIpO1xyXG4gICAgICAgIG5ld2tpbmQubmFycm93Lm1heCA9IE1hdGguY2VpbChuZXdraW5kLndpZGUubWluKTtcclxuICAgICAgICBuZXdraW5kLndpZGUubWF4ID0gTWF0aC5jZWlsKChuZXdraW5kLndpZGUuc2l6ZSAqIHNlbGYuTUFYX0FDQ0VQVEFCTEUgKyBzZWxmLlBBRERJTkcpIC8gbmV3a2luZC53aWRlLmNvdW50cyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gY2F0ZWdvcml6YXRpb247XHJcbn07XHJcblxyXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fY2hhclRvUGF0dGVybiA9IGZ1bmN0aW9uKGNoYXIpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBjaGFyQ29kZSA9IGNoYXIuY2hhckNvZGVBdCgwKSxcclxuICAgICAgICBpO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBzZWxmLkFMUEhBQkVULmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuQUxQSEFCRVRbaV0gPT09IGNoYXJDb2RlKXtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGYuQ0hBUkFDVEVSX0VOQ09ESU5HU1tpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gMHgwO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX3ZhbGlkYXRlUmVzdWx0ID0gZnVuY3Rpb24ocmVzdWx0LCBzdGFydENvdW50ZXIpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICB0aHJlc2hvbGRzID0gc2VsZi5fdGhyZXNob2xkUmVzdWx0UGF0dGVybihyZXN1bHQsIHN0YXJ0Q291bnRlciksXHJcbiAgICAgICAgaSxcclxuICAgICAgICBqLFxyXG4gICAgICAgIGtpbmQsXHJcbiAgICAgICAgY2F0LFxyXG4gICAgICAgIHNpemUsXHJcbiAgICAgICAgcG9zID0gc3RhcnRDb3VudGVyLFxyXG4gICAgICAgIHBhdHRlcm47XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHBhdHRlcm4gPSBzZWxmLl9jaGFyVG9QYXR0ZXJuKHJlc3VsdFtpXSk7XHJcbiAgICAgICAgZm9yIChqID0gNjsgaiA+PSAwOyBqLS0pIHtcclxuICAgICAgICAgICAga2luZCA9IChqICYgMSkgPT09IDAgPyB0aHJlc2hvbGRzLmJhciA6IHRocmVzaG9sZHMuc3BhY2U7XHJcbiAgICAgICAgICAgIGNhdCA9IChwYXR0ZXJuICYgMSkgPT09IDEgPyBraW5kLndpZGUgOiBraW5kLm5hcnJvdztcclxuICAgICAgICAgICAgc2l6ZSA9IHNlbGYuX2NvdW50ZXJzW3BvcyArIGpdO1xyXG4gICAgICAgICAgICBpZiAoc2l6ZSA8IGNhdC5taW4gfHwgc2l6ZSA+IGNhdC5tYXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwYXR0ZXJuID4+PSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwb3MgKz0gODtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX3BhdHRlcm5Ub0NoYXIgPSBmdW5jdGlvbihwYXR0ZXJuKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBzZWxmID0gdGhpcztcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgc2VsZi5DSEFSQUNURVJfRU5DT0RJTkdTLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuQ0hBUkFDVEVSX0VOQ09ESU5HU1tpXSA9PT0gcGF0dGVybikge1xyXG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShzZWxmLkFMUEhBQkVUW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLTE7XHJcbn07XHJcblxyXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fY29tcHV0ZUFsdGVybmF0aW5nVGhyZXNob2xkID0gZnVuY3Rpb24ob2Zmc2V0LCBlbmQpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIG1pbiA9IE51bWJlci5NQVhfVkFMVUUsXHJcbiAgICAgICAgbWF4ID0gMCxcclxuICAgICAgICBjb3VudGVyO1xyXG5cclxuICAgIGZvciAoaSA9IG9mZnNldDsgaSA8IGVuZDsgaSArPSAyKXtcclxuICAgICAgICBjb3VudGVyID0gdGhpcy5fY291bnRlcnNbaV07XHJcbiAgICAgICAgaWYgKGNvdW50ZXIgPiBtYXgpIHtcclxuICAgICAgICAgICAgbWF4ID0gY291bnRlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvdW50ZXIgPCBtaW4pIHtcclxuICAgICAgICAgICAgbWluID0gY291bnRlcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICgobWluICsgbWF4KSAvIDIuMCkgfCAwO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX3RvUGF0dGVybiA9IGZ1bmN0aW9uKG9mZnNldCkge1xyXG4gICAgdmFyIG51bUNvdW50ZXJzID0gNyxcclxuICAgICAgICBlbmQgPSBvZmZzZXQgKyBudW1Db3VudGVycyxcclxuICAgICAgICBiYXJUaHJlc2hvbGQsXHJcbiAgICAgICAgc3BhY2VUaHJlc2hvbGQsXHJcbiAgICAgICAgYml0bWFzayA9IDEgPDwgKG51bUNvdW50ZXJzIC0gMSksXHJcbiAgICAgICAgcGF0dGVybiA9IDAsXHJcbiAgICAgICAgaSxcclxuICAgICAgICB0aHJlc2hvbGQ7XHJcblxyXG4gICAgaWYgKGVuZCA+IHRoaXMuX2NvdW50ZXJzLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICBiYXJUaHJlc2hvbGQgPSB0aGlzLl9jb21wdXRlQWx0ZXJuYXRpbmdUaHJlc2hvbGQob2Zmc2V0LCBlbmQpO1xyXG4gICAgc3BhY2VUaHJlc2hvbGQgPSB0aGlzLl9jb21wdXRlQWx0ZXJuYXRpbmdUaHJlc2hvbGQob2Zmc2V0ICsgMSwgZW5kKTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbnVtQ291bnRlcnM7IGkrKyl7XHJcbiAgICAgICAgdGhyZXNob2xkID0gKGkgJiAxKSA9PT0gMCA/IGJhclRocmVzaG9sZCA6IHNwYWNlVGhyZXNob2xkO1xyXG4gICAgICAgIGlmICh0aGlzLl9jb3VudGVyc1tvZmZzZXQgKyBpXSA+IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICBwYXR0ZXJuIHw9IGJpdG1hc2s7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJpdG1hc2sgPj49IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBhdHRlcm47XHJcbn07XHJcblxyXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5faXNTdGFydEVuZCA9IGZ1bmN0aW9uKHBhdHRlcm4pIHtcclxuICAgIHZhciBpO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLlNUQVJUX0VORC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICh0aGlzLlNUQVJUX0VORFtpXSA9PT0gcGF0dGVybikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fc3VtQ291bnRlcnMgPSBmdW5jdGlvbihzdGFydCwgZW5kKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBzdW0gPSAwO1xyXG5cclxuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcclxuICAgICAgICBzdW0gKz0gdGhpcy5fY291bnRlcnNbaV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VtO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2ZpbmRTdGFydCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgcGF0dGVybixcclxuICAgICAgICBzdGFydCA9IHNlbGYuX25leHRVbnNldChzZWxmLl9yb3cpLFxyXG4gICAgICAgIGVuZDtcclxuXHJcbiAgICBmb3IgKGkgPSAxOyBpIDwgdGhpcy5fY291bnRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwYXR0ZXJuID0gc2VsZi5fdG9QYXR0ZXJuKGkpO1xyXG4gICAgICAgIGlmIChwYXR0ZXJuICE9PSAtMSAmJiBzZWxmLl9pc1N0YXJ0RW5kKHBhdHRlcm4pKSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IExvb2sgZm9yIHdoaXRlc3BhY2UgYWhlYWRcclxuICAgICAgICAgICAgc3RhcnQgKz0gc2VsZi5fc3VtQ291bnRlcnMoMCwgaSk7XHJcbiAgICAgICAgICAgIGVuZCA9IHN0YXJ0ICsgc2VsZi5fc3VtQ291bnRlcnMoaSwgaSArIDgpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxyXG4gICAgICAgICAgICAgICAgZW5kOiBlbmQsXHJcbiAgICAgICAgICAgICAgICBzdGFydENvdW50ZXI6IGksXHJcbiAgICAgICAgICAgICAgICBlbmRDb3VudGVyOiBpICsgOFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvZGFiYXJSZWFkZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvZGFiYXJfcmVhZGVyLmpzXG4gKiovIiwiaW1wb3J0IEVBTlJlYWRlciBmcm9tICcuL2Vhbl9yZWFkZXInO1xyXG5cclxuZnVuY3Rpb24gVVBDUmVhZGVyKCkge1xyXG4gICAgRUFOUmVhZGVyLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbnZhciBwcm9wZXJ0aWVzID0ge1xyXG4gICAgRk9STUFUOiB7dmFsdWU6IFwidXBjX2FcIiwgd3JpdGVhYmxlOiBmYWxzZX1cclxufTtcclxuXHJcblVQQ1JlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVBTlJlYWRlci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xyXG5VUENSZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVVBDUmVhZGVyO1xyXG5cclxuVVBDUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcmVzdWx0ID0gRUFOUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlLmNhbGwodGhpcyk7XHJcblxyXG4gICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuY29kZSAmJiByZXN1bHQuY29kZS5sZW5ndGggPT09IDEzICYmIHJlc3VsdC5jb2RlLmNoYXJBdCgwKSA9PT0gXCIwXCIpIHtcclxuICAgICAgICByZXN1bHQuY29kZSA9IHJlc3VsdC5jb2RlLnN1YnN0cmluZygxKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVUENSZWFkZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL3VwY19yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgRUFOUmVhZGVyIGZyb20gJy4vZWFuX3JlYWRlcic7XHJcblxyXG5mdW5jdGlvbiBFQU44UmVhZGVyKCkge1xyXG4gICAgRUFOUmVhZGVyLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbnZhciBwcm9wZXJ0aWVzID0ge1xyXG4gICAgRk9STUFUOiB7dmFsdWU6IFwiZWFuXzhcIiwgd3JpdGVhYmxlOiBmYWxzZX1cclxufTtcclxuXHJcbkVBTjhSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFQU5SZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcclxuRUFOOFJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFQU44UmVhZGVyO1xyXG5cclxuRUFOOFJlYWRlci5wcm90b3R5cGUuX2RlY29kZVBheWxvYWQgPSBmdW5jdGlvbihjb2RlLCByZXN1bHQsIGRlY29kZWRDb2Rlcykge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb2RlLmVuZCwgc2VsZi5DT0RFX0dfU1RBUlQpO1xyXG4gICAgICAgIGlmICghY29kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0LnB1c2goY29kZS5jb2RlKTtcclxuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb2RlID0gc2VsZi5fZmluZFBhdHRlcm4oc2VsZi5NSURETEVfUEFUVEVSTiwgY29kZS5lbmQsIHRydWUsIGZhbHNlKTtcclxuICAgIGlmIChjb2RlID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kLCBzZWxmLkNPREVfR19TVEFSVCk7XHJcbiAgICAgICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb2RlO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRUFOOFJlYWRlcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvZWFuXzhfcmVhZGVyLmpzXG4gKiovIiwiaW1wb3J0IEVBTlJlYWRlciBmcm9tICcuL2Vhbl9yZWFkZXInO1xyXG5cclxuZnVuY3Rpb24gVVBDRVJlYWRlcigpIHtcclxuICAgIEVBTlJlYWRlci5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG52YXIgcHJvcGVydGllcyA9IHtcclxuICAgIENPREVfRlJFUVVFTkNZOiB7dmFsdWU6IFtcclxuICAgICAgICBbIDU2LCA1MiwgNTAsIDQ5LCA0NCwgMzgsIDM1LCA0MiwgNDEsIDM3IF0sXHJcbiAgICAgICAgWzcsIDExLCAxMywgMTQsIDE5LCAyNSwgMjgsIDIxLCAyMiwgMjZdXX0sXHJcbiAgICBTVE9QX1BBVFRFUk46IHsgdmFsdWU6IFsxIC8gNiAqIDcsIDEgLyA2ICogNywgMSAvIDYgKiA3LCAxIC8gNiAqIDcsIDEgLyA2ICogNywgMSAvIDYgKiA3XX0sXHJcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJ1cGNfZVwiLCB3cml0ZWFibGU6IGZhbHNlfVxyXG59O1xyXG5cclxuVVBDRVJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVBTlJlYWRlci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xyXG5VUENFUmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFVQQ0VSZWFkZXI7XHJcblxyXG5VUENFUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlUGF5bG9hZCA9IGZ1bmN0aW9uKGNvZGUsIHJlc3VsdCwgZGVjb2RlZENvZGVzKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBjb2RlRnJlcXVlbmN5ID0gMHgwO1xyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAgICAgY29kZSA9IHNlbGYuX2RlY29kZUNvZGUoY29kZS5lbmQpO1xyXG4gICAgICAgIGlmICghY29kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvZGUuY29kZSA+PSBzZWxmLkNPREVfR19TVEFSVCkge1xyXG4gICAgICAgICAgICBjb2RlLmNvZGUgPSBjb2RlLmNvZGUgLSBzZWxmLkNPREVfR19TVEFSVDtcclxuICAgICAgICAgICAgY29kZUZyZXF1ZW5jeSB8PSAxIDw8ICg1IC0gaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSk7XHJcbiAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXNlbGYuX2RldGVybWluZVBhcml0eShjb2RlRnJlcXVlbmN5LCByZXN1bHQpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvZGU7XHJcbn07XHJcblxyXG5VUENFUmVhZGVyLnByb3RvdHlwZS5fZGV0ZXJtaW5lUGFyaXR5ID0gZnVuY3Rpb24oY29kZUZyZXF1ZW5jeSwgcmVzdWx0KSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBuclN5c3RlbTtcclxuXHJcbiAgICBmb3IgKG5yU3lzdGVtID0gMDsgbnJTeXN0ZW0gPCB0aGlzLkNPREVfRlJFUVVFTkNZLmxlbmd0aDsgbnJTeXN0ZW0rKyl7XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCB0aGlzLkNPREVfRlJFUVVFTkNZW25yU3lzdGVtXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoY29kZUZyZXF1ZW5jeSA9PT0gdGhpcy5DT0RFX0ZSRVFVRU5DWVtuclN5c3RlbV1baV0pIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC51bnNoaWZ0KG5yU3lzdGVtKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5VUENFUmVhZGVyLnByb3RvdHlwZS5fY29udmVydFRvVVBDQSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgdmFyIHVwY2EgPSBbcmVzdWx0WzBdXSxcclxuICAgICAgICBsYXN0RGlnaXQgPSByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDJdO1xyXG5cclxuICAgIGlmIChsYXN0RGlnaXQgPD0gMikge1xyXG4gICAgICAgIHVwY2EgPSB1cGNhLmNvbmNhdChyZXN1bHQuc2xpY2UoMSwgMykpXHJcbiAgICAgICAgICAgIC5jb25jYXQoW2xhc3REaWdpdCwgMCwgMCwgMCwgMF0pXHJcbiAgICAgICAgICAgIC5jb25jYXQocmVzdWx0LnNsaWNlKDMsIDYpKTtcclxuICAgIH0gZWxzZSBpZiAobGFzdERpZ2l0ID09PSAzKSB7XHJcbiAgICAgICAgdXBjYSA9IHVwY2EuY29uY2F0KHJlc3VsdC5zbGljZSgxLCA0KSlcclxuICAgICAgICAgICAgLmNvbmNhdChbMCwgMCwgMCwgMCwgMF0pXHJcbiAgICAgICAgICAgIC5jb25jYXQocmVzdWx0LnNsaWNlKDQsIDYpKTtcclxuICAgIH0gZWxzZSBpZiAobGFzdERpZ2l0ID09PSA0KSB7XHJcbiAgICAgICAgdXBjYSA9IHVwY2EuY29uY2F0KHJlc3VsdC5zbGljZSgxLCA1KSlcclxuICAgICAgICAgICAgLmNvbmNhdChbMCwgMCwgMCwgMCwgMCwgcmVzdWx0WzVdXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHVwY2EgPSB1cGNhLmNvbmNhdChyZXN1bHQuc2xpY2UoMSwgNikpXHJcbiAgICAgICAgICAgIC5jb25jYXQoWzAsIDAsIDAsIDAsIGxhc3REaWdpdF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwY2EucHVzaChyZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdKTtcclxuICAgIHJldHVybiB1cGNhO1xyXG59O1xyXG5cclxuVVBDRVJlYWRlci5wcm90b3R5cGUuX2NoZWNrc3VtID0gZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICByZXR1cm4gRUFOUmVhZGVyLnByb3RvdHlwZS5fY2hlY2tzdW0uY2FsbCh0aGlzLCB0aGlzLl9jb252ZXJ0VG9VUENBKHJlc3VsdCkpO1xyXG59O1xyXG5cclxuVVBDRVJlYWRlci5wcm90b3R5cGUuX2ZpbmRFbmQgPSBmdW5jdGlvbihvZmZzZXQsIGlzV2hpdGUpIHtcclxuICAgIGlzV2hpdGUgPSB0cnVlO1xyXG4gICAgcmV0dXJuIEVBTlJlYWRlci5wcm90b3R5cGUuX2ZpbmRFbmQuY2FsbCh0aGlzLCBvZmZzZXQsIGlzV2hpdGUpO1xyXG59O1xyXG5cclxuVVBDRVJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZSA9IGZ1bmN0aW9uKGVuZEluZm8pIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICB0cmFpbGluZ1doaXRlc3BhY2VFbmQ7XHJcblxyXG4gICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kID0gZW5kSW5mby5lbmQgKyAoKGVuZEluZm8uZW5kIC0gZW5kSW5mby5zdGFydCkgLyAyKTtcclxuICAgIGlmICh0cmFpbGluZ1doaXRlc3BhY2VFbmQgPCBzZWxmLl9yb3cubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UoZW5kSW5mby5lbmQsIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCwgMCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVuZEluZm87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVVBDRVJlYWRlcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvdXBjX2VfcmVhZGVyLmpzXG4gKiovIiwiaW1wb3J0IEJhcmNvZGVSZWFkZXIgZnJvbSAnLi9iYXJjb2RlX3JlYWRlcic7XHJcbmNvbnN0IG1lcmdlID0gcmVxdWlyZSgnbG9kYXNoL29iamVjdC9tZXJnZScpO1xyXG5cclxuZnVuY3Rpb24gSTJvZjVSZWFkZXIob3B0cykge1xyXG4gICAgb3B0cyA9IG1lcmdlKGdldERlZmF1bENvbmZpZygpLCBvcHRzKTtcclxuICAgIEJhcmNvZGVSZWFkZXIuY2FsbCh0aGlzLCBvcHRzKTtcclxuICAgIHRoaXMuYmFyU3BhY2VSYXRpbyA9IFsxLCAxXTtcclxuICAgIGlmIChvcHRzLm5vcm1hbGl6ZUJhclNwYWNlV2lkdGgpIHtcclxuICAgICAgICB0aGlzLlNJTkdMRV9DT0RFX0VSUk9SID0gMC4zODtcclxuICAgICAgICB0aGlzLkFWR19DT0RFX0VSUk9SID0gMC4wOTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsQ29uZmlnKCkge1xyXG4gICAgdmFyIGNvbmZpZyA9IHt9O1xyXG5cclxuICAgIE9iamVjdC5rZXlzKEkyb2Y1UmVhZGVyLkNPTkZJR19LRVlTKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgIGNvbmZpZ1trZXldID0gSTJvZjVSZWFkZXIuQ09ORklHX0tFWVNba2V5XS5kZWZhdWx0O1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gY29uZmlnO1xyXG59XHJcblxyXG52YXIgTiA9IDEsXHJcbiAgICBXID0gMyxcclxuICAgIHByb3BlcnRpZXMgPSB7XHJcbiAgICAgICAgTU9EVUxPOiB7dmFsdWU6IDEwfSxcclxuICAgICAgICBTVEFSVF9QQVRURVJOOiB7dmFsdWU6IFtOICogMi41LCBOICogMi41LCBOICogMi41LCBOICogMi41XX0sXHJcbiAgICAgICAgU1RPUF9QQVRURVJOOiB7dmFsdWU6IFtOICogMiwgTiAqIDIsIFcgKiAyXX0sXHJcbiAgICAgICAgQ09ERV9QQVRURVJOOiB7dmFsdWU6IFtcclxuICAgICAgICAgICAgW04sIE4sIFcsIFcsIE5dLFxyXG4gICAgICAgICAgICBbVywgTiwgTiwgTiwgV10sXHJcbiAgICAgICAgICAgIFtOLCBXLCBOLCBOLCBXXSxcclxuICAgICAgICAgICAgW1csIFcsIE4sIE4sIE5dLFxyXG4gICAgICAgICAgICBbTiwgTiwgVywgTiwgV10sXHJcbiAgICAgICAgICAgIFtXLCBOLCBXLCBOLCBOXSxcclxuICAgICAgICAgICAgW04sIFcsIFcsIE4sIE5dLFxyXG4gICAgICAgICAgICBbTiwgTiwgTiwgVywgV10sXHJcbiAgICAgICAgICAgIFtXLCBOLCBOLCBXLCBOXSxcclxuICAgICAgICAgICAgW04sIFcsIE4sIFcsIE5dXHJcbiAgICAgICAgXX0sXHJcbiAgICAgICAgU0lOR0xFX0NPREVfRVJST1I6IHt2YWx1ZTogMC43OCwgd3JpdGFibGU6IHRydWV9LFxyXG4gICAgICAgIEFWR19DT0RFX0VSUk9SOiB7dmFsdWU6IDAuMzgsIHdyaXRhYmxlOiB0cnVlfSxcclxuICAgICAgICBNQVhfQ09SUkVDVElPTl9GQUNUT1I6IHt2YWx1ZTogNX0sXHJcbiAgICAgICAgRk9STUFUOiB7dmFsdWU6IFwiaTJvZjVcIn1cclxuICAgIH07XHJcblxyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcclxuSTJvZjVSZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSTJvZjVSZWFkZXI7XHJcblxyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX21hdGNoUGF0dGVybiA9IGZ1bmN0aW9uKGNvdW50ZXIsIGNvZGUpIHtcclxuICAgIGlmICh0aGlzLmNvbmZpZy5ub3JtYWxpemVCYXJTcGFjZVdpZHRoKSB7XHJcbiAgICAgICAgdmFyIGksXHJcbiAgICAgICAgICAgIGNvdW50ZXJTdW0gPSBbMCwgMF0sXHJcbiAgICAgICAgICAgIGNvZGVTdW0gPSBbMCwgMF0sXHJcbiAgICAgICAgICAgIGNvcnJlY3Rpb24gPSBbMCwgMF0sXHJcbiAgICAgICAgICAgIGNvcnJlY3Rpb25SYXRpbyA9IHRoaXMuTUFYX0NPUlJFQ1RJT05fRkFDVE9SLFxyXG4gICAgICAgICAgICBjb3JyZWN0aW9uUmF0aW9JbnZlcnNlID0gMSAvIGNvcnJlY3Rpb25SYXRpbztcclxuXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY291bnRlclN1bVtpICUgMl0gKz0gY291bnRlcltpXTtcclxuICAgICAgICAgICAgY29kZVN1bVtpICUgMl0gKz0gY29kZVtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29ycmVjdGlvblswXSA9IGNvZGVTdW1bMF0gLyBjb3VudGVyU3VtWzBdO1xyXG4gICAgICAgIGNvcnJlY3Rpb25bMV0gPSBjb2RlU3VtWzFdIC8gY291bnRlclN1bVsxXTtcclxuXHJcbiAgICAgICAgY29ycmVjdGlvblswXSA9IE1hdGgubWF4KE1hdGgubWluKGNvcnJlY3Rpb25bMF0sIGNvcnJlY3Rpb25SYXRpbyksIGNvcnJlY3Rpb25SYXRpb0ludmVyc2UpO1xyXG4gICAgICAgIGNvcnJlY3Rpb25bMV0gPSBNYXRoLm1heChNYXRoLm1pbihjb3JyZWN0aW9uWzFdLCBjb3JyZWN0aW9uUmF0aW8pLCBjb3JyZWN0aW9uUmF0aW9JbnZlcnNlKTtcclxuICAgICAgICB0aGlzLmJhclNwYWNlUmF0aW8gPSBjb3JyZWN0aW9uO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJbaV0gKj0gdGhpcy5iYXJTcGFjZVJhdGlvW2kgJSAyXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQmFyY29kZVJlYWRlci5wcm90b3R5cGUuX21hdGNoUGF0dGVybi5jYWxsKHRoaXMsIGNvdW50ZXIsIGNvZGUpO1xyXG59O1xyXG5cclxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9maW5kUGF0dGVybiA9IGZ1bmN0aW9uKHBhdHRlcm4sIG9mZnNldCwgaXNXaGl0ZSwgdHJ5SGFyZGVyKSB7XHJcbiAgICB2YXIgY291bnRlciA9IFtdLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgY291bnRlclBvcyA9IDAsXHJcbiAgICAgICAgYmVzdE1hdGNoID0ge1xyXG4gICAgICAgICAgICBlcnJvcjogTnVtYmVyLk1BWF9WQUxVRSxcclxuICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgIHN0YXJ0OiAwLFxyXG4gICAgICAgICAgICBlbmQ6IDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yLFxyXG4gICAgICAgIGosXHJcbiAgICAgICAgc3VtLFxyXG4gICAgICAgIG5vcm1hbGl6ZWQsXHJcbiAgICAgICAgZXBzaWxvbiA9IHNlbGYuQVZHX0NPREVfRVJST1I7XHJcblxyXG4gICAgaXNXaGl0ZSA9IGlzV2hpdGUgfHwgZmFsc2U7XHJcbiAgICB0cnlIYXJkZXIgPSB0cnlIYXJkZXIgfHwgZmFsc2U7XHJcblxyXG4gICAgaWYgKCFvZmZzZXQpIHtcclxuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3Jvdyk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCBwYXR0ZXJuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY291bnRlcltpXSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBzdW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBjb3VudGVyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGNvdW50ZXJbal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkID0gc2VsZi5fbm9ybWFsaXplKGNvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHNlbGYuX21hdGNoUGF0dGVybihub3JtYWxpemVkLCBwYXR0ZXJuKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIDwgZXBzaWxvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLnN0YXJ0ID0gaSAtIHN1bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVuZCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRyeUhhcmRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBjb3VudGVyLmxlbmd0aCAtIDI7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2pdID0gY291bnRlcltqICsgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlci5sZW5ndGggLSAyXSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyLmxlbmd0aCAtIDFdID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyUG9zLS07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xyXG4gICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2ZpbmRTdGFydCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQsXHJcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpLFxyXG4gICAgICAgIHN0YXJ0SW5mbyxcclxuICAgICAgICBuYXJyb3dCYXJXaWR0aCA9IDE7XHJcblxyXG4gICAgd2hpbGUgKCFzdGFydEluZm8pIHtcclxuICAgICAgICBzdGFydEluZm8gPSBzZWxmLl9maW5kUGF0dGVybihzZWxmLlNUQVJUX1BBVFRFUk4sIG9mZnNldCwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgIGlmICghc3RhcnRJbmZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBuYXJyb3dCYXJXaWR0aCA9IE1hdGguZmxvb3IoKHN0YXJ0SW5mby5lbmQgLSBzdGFydEluZm8uc3RhcnQpIC8gNCk7XHJcbiAgICAgICAgbGVhZGluZ1doaXRlc3BhY2VTdGFydCA9IHN0YXJ0SW5mby5zdGFydCAtIG5hcnJvd0JhcldpZHRoICogMTA7XHJcbiAgICAgICAgaWYgKGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQgPj0gMCkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5fbWF0Y2hSYW5nZShsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0LCBzdGFydEluZm8uc3RhcnQsIDApKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhcnRJbmZvO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9mZnNldCA9IHN0YXJ0SW5mby5lbmQ7XHJcbiAgICAgICAgc3RhcnRJbmZvID0gbnVsbDtcclxuICAgIH1cclxufTtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlID0gZnVuY3Rpb24oZW5kSW5mbykge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZDtcclxuXHJcbiAgICB0cmFpbGluZ1doaXRlc3BhY2VFbmQgPSBlbmRJbmZvLmVuZCArICgoZW5kSW5mby5lbmQgLSBlbmRJbmZvLnN0YXJ0KSAvIDIpO1xyXG4gICAgaWYgKHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA8IHNlbGYuX3Jvdy5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoc2VsZi5fbWF0Y2hSYW5nZShlbmRJbmZvLmVuZCwgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kLCAwKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZW5kSW5mbztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fZmluZEVuZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGVuZEluZm8sXHJcbiAgICAgICAgdG1wO1xyXG5cclxuICAgIHNlbGYuX3Jvdy5yZXZlcnNlKCk7XHJcbiAgICBlbmRJbmZvID0gc2VsZi5fZmluZFBhdHRlcm4oc2VsZi5TVE9QX1BBVFRFUk4pO1xyXG4gICAgc2VsZi5fcm93LnJldmVyc2UoKTtcclxuXHJcbiAgICBpZiAoZW5kSW5mbyA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJldmVyc2UgbnVtYmVyc1xyXG4gICAgdG1wID0gZW5kSW5mby5zdGFydDtcclxuICAgIGVuZEluZm8uc3RhcnQgPSBzZWxmLl9yb3cubGVuZ3RoIC0gZW5kSW5mby5lbmQ7XHJcbiAgICBlbmRJbmZvLmVuZCA9IHNlbGYuX3Jvdy5sZW5ndGggLSB0bXA7XHJcblxyXG4gICAgcmV0dXJuIGVuZEluZm8gIT09IG51bGwgPyBzZWxmLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UoZW5kSW5mbykgOiBudWxsO1xyXG59O1xyXG5cclxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9kZWNvZGVQYWlyID0gZnVuY3Rpb24oY291bnRlclBhaXIpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIGNvZGUsXHJcbiAgICAgICAgY29kZXMgPSBbXSxcclxuICAgICAgICBzZWxmID0gdGhpcztcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlclBhaXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb3VudGVyUGFpcltpXSk7XHJcbiAgICAgICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb2Rlcy5wdXNoKGNvZGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvZGVzO1xyXG59O1xyXG5cclxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9kZWNvZGVDb2RlID0gZnVuY3Rpb24oY291bnRlcikge1xyXG4gICAgdmFyIGosXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgc3VtID0gMCxcclxuICAgICAgICBub3JtYWxpemVkLFxyXG4gICAgICAgIGVycm9yLFxyXG4gICAgICAgIGVwc2lsb24gPSBzZWxmLkFWR19DT0RFX0VSUk9SLFxyXG4gICAgICAgIGNvZGUsXHJcbiAgICAgICAgYmVzdE1hdGNoID0ge1xyXG4gICAgICAgICAgICBlcnJvcjogTnVtYmVyLk1BWF9WQUxVRSxcclxuICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgIHN0YXJ0OiAwLFxyXG4gICAgICAgICAgICBlbmQ6IDBcclxuICAgICAgICB9O1xyXG5cclxuICAgIGZvciAoIGogPSAwOyBqIDwgY291bnRlci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIHN1bSArPSBjb3VudGVyW2pdO1xyXG4gICAgfVxyXG4gICAgbm9ybWFsaXplZCA9IHNlbGYuX25vcm1hbGl6ZShjb3VudGVyKTtcclxuICAgIGlmIChub3JtYWxpemVkKSB7XHJcbiAgICAgICAgZm9yIChjb2RlID0gMDsgY29kZSA8IHNlbGYuQ09ERV9QQVRURVJOLmxlbmd0aDsgY29kZSsrKSB7XHJcbiAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKG5vcm1hbGl6ZWQsIHNlbGYuQ09ERV9QQVRURVJOW2NvZGVdKTtcclxuICAgICAgICAgICAgaWYgKGVycm9yIDwgYmVzdE1hdGNoLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBiZXN0TWF0Y2guY29kZSA9IGNvZGU7XHJcbiAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYmVzdE1hdGNoLmVycm9yIDwgZXBzaWxvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9kZWNvZGVQYXlsb2FkID0gZnVuY3Rpb24oY291bnRlcnMsIHJlc3VsdCwgZGVjb2RlZENvZGVzKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBwb3MgPSAwLFxyXG4gICAgICAgIGNvdW50ZXJMZW5ndGggPSBjb3VudGVycy5sZW5ndGgsXHJcbiAgICAgICAgY291bnRlclBhaXIgPSBbWzAsIDAsIDAsIDAsIDBdLCBbMCwgMCwgMCwgMCwgMF1dLFxyXG4gICAgICAgIGNvZGVzO1xyXG5cclxuICAgIHdoaWxlIChwb3MgPCBjb3VudGVyTGVuZ3RoKSB7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBjb3VudGVyUGFpclswXVtpXSA9IGNvdW50ZXJzW3Bvc10gKiB0aGlzLmJhclNwYWNlUmF0aW9bMF07XHJcbiAgICAgICAgICAgIGNvdW50ZXJQYWlyWzFdW2ldID0gY291bnRlcnNbcG9zICsgMV0gKiB0aGlzLmJhclNwYWNlUmF0aW9bMV07XHJcbiAgICAgICAgICAgIHBvcyArPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb2RlcyA9IHNlbGYuX2RlY29kZVBhaXIoY291bnRlclBhaXIpO1xyXG4gICAgICAgIGlmICghY29kZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChjb2Rlc1tpXS5jb2RlICsgXCJcIik7XHJcbiAgICAgICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGVzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29kZXM7XHJcbn07XHJcblxyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeUNvdW50ZXJMZW5ndGggPSBmdW5jdGlvbihjb3VudGVycykge1xyXG4gICAgcmV0dXJuIChjb3VudGVycy5sZW5ndGggJSAxMCA9PT0gMCk7XHJcbn07XHJcblxyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHN0YXJ0SW5mbyxcclxuICAgICAgICBlbmRJbmZvLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGNvZGUsXHJcbiAgICAgICAgcmVzdWx0ID0gW10sXHJcbiAgICAgICAgZGVjb2RlZENvZGVzID0gW10sXHJcbiAgICAgICAgY291bnRlcnM7XHJcblxyXG4gICAgc3RhcnRJbmZvID0gc2VsZi5fZmluZFN0YXJ0KCk7XHJcbiAgICBpZiAoIXN0YXJ0SW5mbykge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgZGVjb2RlZENvZGVzLnB1c2goc3RhcnRJbmZvKTtcclxuXHJcbiAgICBlbmRJbmZvID0gc2VsZi5fZmluZEVuZCgpO1xyXG4gICAgaWYgKCFlbmRJbmZvKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY291bnRlcnMgPSBzZWxmLl9maWxsQ291bnRlcnMoc3RhcnRJbmZvLmVuZCwgZW5kSW5mby5zdGFydCwgZmFsc2UpO1xyXG4gICAgaWYgKCFzZWxmLl92ZXJpZnlDb3VudGVyTGVuZ3RoKGNvdW50ZXJzKSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY29kZSA9IHNlbGYuX2RlY29kZVBheWxvYWQoY291bnRlcnMsIHJlc3VsdCwgZGVjb2RlZENvZGVzKTtcclxuICAgIGlmICghY29kZSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKHJlc3VsdC5sZW5ndGggJSAyICE9PSAwIHx8XHJcbiAgICAgICAgICAgIHJlc3VsdC5sZW5ndGggPCA2KSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZGVjb2RlZENvZGVzLnB1c2goZW5kSW5mbyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvZGU6IHJlc3VsdC5qb2luKFwiXCIpLFxyXG4gICAgICAgIHN0YXJ0OiBzdGFydEluZm8uc3RhcnQsXHJcbiAgICAgICAgZW5kOiBlbmRJbmZvLmVuZCxcclxuICAgICAgICBzdGFydEluZm86IHN0YXJ0SW5mbyxcclxuICAgICAgICBkZWNvZGVkQ29kZXM6IGRlY29kZWRDb2Rlc1xyXG4gICAgfTtcclxufTtcclxuXHJcbkkyb2Y1UmVhZGVyLkNPTkZJR19LRVlTID0ge1xyXG4gICAgbm9ybWFsaXplQmFyU3BhY2VXaWR0aDoge1xyXG4gICAgICAgICd0eXBlJzogJ2Jvb2xlYW4nLFxyXG4gICAgICAgICdkZWZhdWx0JzogZmFsc2UsXHJcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0lmIHRydWUsIHRoZSByZWFkZXIgdHJpZXMgdG8gbm9ybWFsaXplIHRoZScgK1xyXG4gICAgICAgICd3aWR0aC1kaWZmZXJlbmNlIGJldHdlZW4gYmFycyBhbmQgc3BhY2VzJ1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSTJvZjVSZWFkZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2kyb2Y1X3JlYWRlci5qc1xuICoqLyIsInZhciBiYXNlTWVyZ2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlTWVyZ2UnKSxcbiAgICBjcmVhdGVBc3NpZ25lciA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2NyZWF0ZUFzc2lnbmVyJyk7XG5cbi8qKlxuICogUmVjdXJzaXZlbHkgbWVyZ2VzIG93biBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgdGhlIHNvdXJjZSBvYmplY3QocyksIHRoYXRcbiAqIGRvbid0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAgaW50byB0aGUgZGVzdGluYXRpb24gb2JqZWN0LiBTdWJzZXF1ZW50IHNvdXJjZXNcbiAqIG92ZXJ3cml0ZSBwcm9wZXJ0eSBhc3NpZ25tZW50cyBvZiBwcmV2aW91cyBzb3VyY2VzLiBJZiBgY3VzdG9taXplcmAgaXNcbiAqIHByb3ZpZGVkIGl0J3MgaW52b2tlZCB0byBwcm9kdWNlIHRoZSBtZXJnZWQgdmFsdWVzIG9mIHRoZSBkZXN0aW5hdGlvbiBhbmRcbiAqIHNvdXJjZSBwcm9wZXJ0aWVzLiBJZiBgY3VzdG9taXplcmAgcmV0dXJucyBgdW5kZWZpbmVkYCBtZXJnaW5nIGlzIGhhbmRsZWRcbiAqIGJ5IHRoZSBtZXRob2QgaW5zdGVhZC4gVGhlIGBjdXN0b21pemVyYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWRcbiAqIHdpdGggZml2ZSBhcmd1bWVudHM6IChvYmplY3RWYWx1ZSwgc291cmNlVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmVkIHZhbHVlcy5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY3VzdG9taXplcmAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSB7XG4gKiAgICdkYXRhJzogW3sgJ3VzZXInOiAnYmFybmV5JyB9LCB7ICd1c2VyJzogJ2ZyZWQnIH1dXG4gKiB9O1xuICpcbiAqIHZhciBhZ2VzID0ge1xuICogICAnZGF0YSc6IFt7ICdhZ2UnOiAzNiB9LCB7ICdhZ2UnOiA0MCB9XVxuICogfTtcbiAqXG4gKiBfLm1lcmdlKHVzZXJzLCBhZ2VzKTtcbiAqIC8vID0+IHsgJ2RhdGEnOiBbeyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYgfSwgeyAndXNlcic6ICdmcmVkJywgJ2FnZSc6IDQwIH1dIH1cbiAqXG4gKiAvLyB1c2luZyBhIGN1c3RvbWl6ZXIgY2FsbGJhY2tcbiAqIHZhciBvYmplY3QgPSB7XG4gKiAgICdmcnVpdHMnOiBbJ2FwcGxlJ10sXG4gKiAgICd2ZWdldGFibGVzJzogWydiZWV0J11cbiAqIH07XG4gKlxuICogdmFyIG90aGVyID0ge1xuICogICAnZnJ1aXRzJzogWydiYW5hbmEnXSxcbiAqICAgJ3ZlZ2V0YWJsZXMnOiBbJ2NhcnJvdCddXG4gKiB9O1xuICpcbiAqIF8ubWVyZ2Uob2JqZWN0LCBvdGhlciwgZnVuY3Rpb24oYSwgYikge1xuICogICBpZiAoXy5pc0FycmF5KGEpKSB7XG4gKiAgICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICogICB9XG4gKiB9KTtcbiAqIC8vID0+IHsgJ2ZydWl0cyc6IFsnYXBwbGUnLCAnYmFuYW5hJ10sICd2ZWdldGFibGVzJzogWydiZWV0JywgJ2NhcnJvdCddIH1cbiAqL1xudmFyIG1lcmdlID0gY3JlYXRlQXNzaWduZXIoYmFzZU1lcmdlKTtcblxubW9kdWxlLmV4cG9ydHMgPSBtZXJnZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9vYmplY3QvbWVyZ2UuanNcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFycmF5RWFjaCA9IHJlcXVpcmUoJy4vYXJyYXlFYWNoJyksXG4gICAgYmFzZU1lcmdlRGVlcCA9IHJlcXVpcmUoJy4vYmFzZU1lcmdlRGVlcCcpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNUeXBlZEFycmF5JyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWVyZ2VgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXJndW1lbnQganVnZ2xpbmcsXG4gKiBtdWx0aXBsZSBzb3VyY2VzLCBhbmQgYHRoaXNgIGJpbmRpbmcgYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdlZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBPVtdXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQj1bXV0gQXNzb2NpYXRlcyB2YWx1ZXMgd2l0aCBzb3VyY2UgY291bnRlcnBhcnRzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlKG9iamVjdCwgc291cmNlLCBjdXN0b21pemVyLCBzdGFja0EsIHN0YWNrQikge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIHZhciBpc1NyY0FyciA9IGlzQXJyYXlMaWtlKHNvdXJjZSkgJiYgKGlzQXJyYXkoc291cmNlKSB8fCBpc1R5cGVkQXJyYXkoc291cmNlKSksXG4gICAgICBwcm9wcyA9IGlzU3JjQXJyID8gdW5kZWZpbmVkIDoga2V5cyhzb3VyY2UpO1xuXG4gIGFycmF5RWFjaChwcm9wcyB8fCBzb3VyY2UsIGZ1bmN0aW9uKHNyY1ZhbHVlLCBrZXkpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGtleSA9IHNyY1ZhbHVlO1xuICAgICAgc3JjVmFsdWUgPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0TGlrZShzcmNWYWx1ZSkpIHtcbiAgICAgIHN0YWNrQSB8fCAoc3RhY2tBID0gW10pO1xuICAgICAgc3RhY2tCIHx8IChzdGFja0IgPSBbXSk7XG4gICAgICBiYXNlTWVyZ2VEZWVwKG9iamVjdCwgc291cmNlLCBrZXksIGJhc2VNZXJnZSwgY3VzdG9taXplciwgc3RhY2tBLCBzdGFja0IpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciB2YWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKHZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgaXNDb21tb24gPSByZXN1bHQgPT09IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKGlzQ29tbW9uKSB7XG4gICAgICAgIHJlc3VsdCA9IHNyY1ZhbHVlO1xuICAgICAgfVxuICAgICAgaWYgKChyZXN1bHQgIT09IHVuZGVmaW5lZCB8fCAoaXNTcmNBcnIgJiYgIShrZXkgaW4gb2JqZWN0KSkpICYmXG4gICAgICAgICAgKGlzQ29tbW9uIHx8IChyZXN1bHQgPT09IHJlc3VsdCA/IChyZXN1bHQgIT09IHZhbHVlKSA6ICh2YWx1ZSA9PT0gdmFsdWUpKSkpIHtcbiAgICAgICAgb2JqZWN0W2tleV0gPSByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlTWVyZ2U7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZU1lcmdlLmpzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZvckVhY2hgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUVhY2g7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvYXJyYXlFYWNoLmpzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhcnJheUNvcHkgPSByZXF1aXJlKCcuL2FycmF5Q29weScpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc1BsYWluT2JqZWN0JyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc1R5cGVkQXJyYXknKSxcbiAgICB0b1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy90b1BsYWluT2JqZWN0Jyk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlTWVyZ2VgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgbWVyZ2VzIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIG1lcmdlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gbWVyZ2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXJnZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1lcmdlIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdlZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBPVtdXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQj1bXV0gQXNzb2NpYXRlcyB2YWx1ZXMgd2l0aCBzb3VyY2UgY291bnRlcnBhcnRzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgbWVyZ2VGdW5jLCBjdXN0b21pemVyLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgbGVuZ3RoID0gc3RhY2tBLmxlbmd0aCxcbiAgICAgIHNyY1ZhbHVlID0gc291cmNlW2tleV07XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKHN0YWNrQVtsZW5ndGhdID09IHNyY1ZhbHVlKSB7XG4gICAgICBvYmplY3Rba2V5XSA9IHN0YWNrQltsZW5ndGhdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKHZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkgOiB1bmRlZmluZWQsXG4gICAgICBpc0NvbW1vbiA9IHJlc3VsdCA9PT0gdW5kZWZpbmVkO1xuXG4gIGlmIChpc0NvbW1vbikge1xuICAgIHJlc3VsdCA9IHNyY1ZhbHVlO1xuICAgIGlmIChpc0FycmF5TGlrZShzcmNWYWx1ZSkgJiYgKGlzQXJyYXkoc3JjVmFsdWUpIHx8IGlzVHlwZWRBcnJheShzcmNWYWx1ZSkpKSB7XG4gICAgICByZXN1bHQgPSBpc0FycmF5KHZhbHVlKVxuICAgICAgICA/IHZhbHVlXG4gICAgICAgIDogKGlzQXJyYXlMaWtlKHZhbHVlKSA/IGFycmF5Q29weSh2YWx1ZSkgOiBbXSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3Qoc3JjVmFsdWUpIHx8IGlzQXJndW1lbnRzKHNyY1ZhbHVlKSkge1xuICAgICAgcmVzdWx0ID0gaXNBcmd1bWVudHModmFsdWUpXG4gICAgICAgID8gdG9QbGFpbk9iamVjdCh2YWx1ZSlcbiAgICAgICAgOiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkgPyB2YWx1ZSA6IHt9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICAvLyBBZGQgdGhlIHNvdXJjZSB2YWx1ZSB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMgYW5kIGFzc29jaWF0ZVxuICAvLyBpdCB3aXRoIGl0cyBtZXJnZWQgdmFsdWUuXG4gIHN0YWNrQS5wdXNoKHNyY1ZhbHVlKTtcbiAgc3RhY2tCLnB1c2gocmVzdWx0KTtcblxuICBpZiAoaXNDb21tb24pIHtcbiAgICAvLyBSZWN1cnNpdmVseSBtZXJnZSBvYmplY3RzIGFuZCBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBvYmplY3Rba2V5XSA9IG1lcmdlRnVuYyhyZXN1bHQsIHNyY1ZhbHVlLCBjdXN0b21pemVyLCBzdGFja0EsIHN0YWNrQik7XG4gIH0gZWxzZSBpZiAocmVzdWx0ID09PSByZXN1bHQgPyAocmVzdWx0ICE9PSB2YWx1ZSkgOiAodmFsdWUgPT09IHZhbHVlKSkge1xuICAgIG9iamVjdFtrZXldID0gcmVzdWx0O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZU1lcmdlRGVlcDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlTWVyZ2VEZWVwLmpzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlDb3B5KHNvdXJjZSwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xuXG4gIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5Q29weTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9hcnJheUNvcHkuanNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNBcnJheUxpa2UnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSkgJiZcbiAgICBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiYgIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FyZ3VtZW50cztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL2lzQXJndW1lbnRzLmpzXG4gKiogbW9kdWxlIGlkID0gMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnZXRMZW5ndGggPSByZXF1aXJlKCcuL2dldExlbmd0aCcpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aChnZXRMZW5ndGgodmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5TGlrZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9pc0FycmF5TGlrZS5qc1xuICoqIG1vZHVsZSBpZCA9IDMyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYmFzZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9iYXNlUHJvcGVydHknKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBcImxlbmd0aFwiIHByb3BlcnR5IHZhbHVlIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXZvaWQgYSBbSklUIGJ1Z10oaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE0Mjc5MilcbiAqIHRoYXQgYWZmZWN0cyBTYWZhcmkgb24gYXQgbGVhc3QgaU9TIDguMS04LjMgQVJNNjQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBcImxlbmd0aFwiIHZhbHVlLlxuICovXG52YXIgZ2V0TGVuZ3RoID0gYmFzZVByb3BlcnR5KCdsZW5ndGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRMZW5ndGg7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvZ2V0TGVuZ3RoLmpzXG4gKiogbW9kdWxlIGlkID0gMzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVByb3BlcnR5O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2Jhc2VQcm9wZXJ0eS5qc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTGVuZ3RoO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2lzTGVuZ3RoLmpzXG4gKiogbW9kdWxlIGlkID0gMzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNPYmplY3RMaWtlLmpzXG4gKiogbW9kdWxlIGlkID0gMzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9nZXROYXRpdmUnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQXJyYXkgPSBnZXROYXRpdmUoQXJyYXksICdpc0FycmF5Jyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBuYXRpdmVJc0FycmF5IHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJyYXlUYWc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvbGFuZy9pc0FycmF5LmpzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc05hdGl2ZSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNOYXRpdmUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIHJldHVybiBpc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXROYXRpdmU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvZ2V0TmF0aXZlLmpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpID4gNSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZm5Ub1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZywgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIHJldHVybiByZUlzTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVJc0hvc3RDdG9yLnRlc3QodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTmF0aXZlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2xhbmcvaXNOYXRpdmUuanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaSB3aGljaCByZXR1cm4gJ2Z1bmN0aW9uJyBmb3IgcmVnZXhlc1xuICAvLyBhbmQgU2FmYXJpIDggd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgY29uc3RydWN0b3JzLlxuICByZXR1cm4gaXNPYmplY3QodmFsdWUpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL2lzRnVuY3Rpb24uanNcbiAqKiBtb2R1bGUgaWQgPSA0MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL2lzT2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiYXNlRm9ySW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlRm9ySW4nKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGFzc3VtZXMgb2JqZWN0cyBjcmVhdGVkIGJ5IHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3RvclxuICogaGF2ZSBubyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHZhciBDdG9yO1xuXG4gIC8vIEV4aXQgZWFybHkgZm9yIG5vbiBgT2JqZWN0YCBvYmplY3RzLlxuICBpZiAoIShpc09iamVjdExpa2UodmFsdWUpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IG9iamVjdFRhZyAmJiAhaXNBcmd1bWVudHModmFsdWUpKSB8fFxuICAgICAgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY29uc3RydWN0b3InKSAmJiAoQ3RvciA9IHZhbHVlLmNvbnN0cnVjdG9yLCB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmICEoQ3RvciBpbnN0YW5jZW9mIEN0b3IpKSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gSUUgPCA5IGl0ZXJhdGVzIGluaGVyaXRlZCBwcm9wZXJ0aWVzIGJlZm9yZSBvd24gcHJvcGVydGllcy4gSWYgdGhlIGZpcnN0XG4gIC8vIGl0ZXJhdGVkIHByb3BlcnR5IGlzIGFuIG9iamVjdCdzIG93biBwcm9wZXJ0eSB0aGVuIHRoZXJlIGFyZSBubyBpbmhlcml0ZWRcbiAgLy8gZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICB2YXIgcmVzdWx0O1xuICAvLyBJbiBtb3N0IGVudmlyb25tZW50cyBhbiBvYmplY3QncyBvd24gcHJvcGVydGllcyBhcmUgaXRlcmF0ZWQgYmVmb3JlXG4gIC8vIGl0cyBpbmhlcml0ZWQgcHJvcGVydGllcy4gSWYgdGhlIGxhc3QgaXRlcmF0ZWQgcHJvcGVydHkgaXMgYW4gb2JqZWN0J3NcbiAgLy8gb3duIHByb3BlcnR5IHRoZW4gdGhlcmUgYXJlIG5vIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gIGJhc2VGb3JJbih2YWx1ZSwgZnVuY3Rpb24oc3ViVmFsdWUsIGtleSkge1xuICAgIHJlc3VsdCA9IGtleTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQgPT09IHVuZGVmaW5lZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCByZXN1bHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUGxhaW5PYmplY3Q7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvbGFuZy9pc1BsYWluT2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiYXNlRm9yID0gcmVxdWlyZSgnLi9iYXNlRm9yJyksXG4gICAga2V5c0luID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXNJbicpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvckluYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9ySW4ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gYmFzZUZvcihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzSW4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGb3JJbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlRm9ySW4uanNcbiAqKiBtb2R1bGUgaWQgPSA0M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGNyZWF0ZUJhc2VGb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUJhc2VGb3InKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvckluYCBhbmQgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzXG4gKiBvdmVyIGBvYmplY3RgIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBpbnZva2luZyBgaXRlcmF0ZWVgIGZvclxuICogZWFjaCBwcm9wZXJ0eS4gSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5XG4gKiByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xudmFyIGJhc2VGb3IgPSBjcmVhdGVCYXNlRm9yKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZvcjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlRm9yLmpzXG4gKiogbW9kdWxlIGlkID0gNDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vdG9PYmplY3QnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgYmFzZSBmdW5jdGlvbiBmb3IgYF8uZm9ySW5gIG9yIGBfLmZvckluUmlnaHRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VGb3IoZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICAgIHZhciBpdGVyYWJsZSA9IHRvT2JqZWN0KG9iamVjdCksXG4gICAgICAgIHByb3BzID0ga2V5c0Z1bmMob2JqZWN0KSxcbiAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgICBpbmRleCA9IGZyb21SaWdodCA/IGxlbmd0aCA6IC0xO1xuXG4gICAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVba2V5XSwga2V5LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUJhc2VGb3I7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvY3JlYXRlQmFzZUZvci5qc1xuICoqIG1vZHVsZSBpZCA9IDQ1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhbiBvYmplY3QgaWYgaXQncyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgb2JqZWN0LlxuICovXG5mdW5jdGlvbiB0b09iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3QodmFsdWUpID8gdmFsdWUgOiBPYmplY3QodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvT2JqZWN0O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL3RvT2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzSW5kZXgnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICB9XG4gIHZhciBsZW5ndGggPSBvYmplY3QubGVuZ3RoO1xuICBsZW5ndGggPSAobGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpICYmIGxlbmd0aCkgfHwgMDtcblxuICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBpc1Byb3RvID0gdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0LFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKSxcbiAgICAgIHNraXBJbmRleGVzID0gbGVuZ3RoID4gMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSAoaW5kZXggKyAnJyk7XG4gIH1cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKHNraXBJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSAmJlxuICAgICAgICAhKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXNJbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9vYmplY3Qva2V5c0luLmpzXG4gKiogbW9kdWxlIGlkID0gNDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eXFxkKyQvO1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIHZhbHVlID0gKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgPyArdmFsdWUgOiAtMTtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0luZGV4O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2lzSW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA0OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPSB0eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPSB0eXBlZEFycmF5VGFnc1ttYXBUYWddID1cbnR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID1cbnR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzZXRUYWddID1cbnR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPSB0eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW29ialRvU3RyaW5nLmNhbGwodmFsdWUpXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1R5cGVkQXJyYXk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvbGFuZy9pc1R5cGVkQXJyYXkuanNcbiAqKiBtb2R1bGUgaWQgPSA0OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGJhc2VDb3B5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUNvcHknKSxcbiAgICBrZXlzSW4gPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5c0luJyk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHBsYWluIG9iamVjdCBmbGF0dGVuaW5nIGluaGVyaXRlZCBlbnVtZXJhYmxlXG4gKiBwcm9wZXJ0aWVzIG9mIGB2YWx1ZWAgdG8gb3duIHByb3BlcnRpZXMgb2YgdGhlIHBsYWluIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgcGxhaW4gb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBuZXcgRm9vKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIgfVxuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIF8udG9QbGFpbk9iamVjdChuZXcgRm9vKSk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyLCAnYyc6IDMgfVxuICovXG5mdW5jdGlvbiB0b1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBiYXNlQ29weSh2YWx1ZSwga2V5c0luKHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9QbGFpbk9iamVjdDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL3RvUGxhaW5PYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA1MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3BpZXMgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IG5hbWVzIHRvIGNvcHkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlQ29weShzb3VyY2UsIHByb3BzLCBvYmplY3QpIHtcbiAgb2JqZWN0IHx8IChvYmplY3QgPSB7fSk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIG9iamVjdFtrZXldID0gc291cmNlW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ29weTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlQ29weS5qc1xuICoqIG1vZHVsZSBpZCA9IDUxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvZ2V0TmF0aXZlJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0FycmF5TGlrZScpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpLFxuICAgIHNoaW1LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvc2hpbUtleXMnKTtcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2tleXMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xudmFyIGtleXMgPSAhbmF0aXZlS2V5cyA/IHNoaW1LZXlzIDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIHZhciBDdG9yID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3QuY29uc3RydWN0b3I7XG4gIGlmICgodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0KSB8fFxuICAgICAgKHR5cGVvZiBvYmplY3QgIT0gJ2Z1bmN0aW9uJyAmJiBpc0FycmF5TGlrZShvYmplY3QpKSkge1xuICAgIHJldHVybiBzaGltS2V5cyhvYmplY3QpO1xuICB9XG4gIHJldHVybiBpc09iamVjdChvYmplY3QpID8gbmF0aXZlS2V5cyhvYmplY3QpIDogW107XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvb2JqZWN0L2tleXMuanNcbiAqKiBtb2R1bGUgaWQgPSA1MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9pc0luZGV4JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAga2V5c0luID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXNJbicpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBIGZhbGxiYWNrIGltcGxlbWVudGF0aW9uIG9mIGBPYmplY3Qua2V5c2Agd2hpY2ggY3JlYXRlcyBhbiBhcnJheSBvZiB0aGVcbiAqIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBzaGltS2V5cyhvYmplY3QpIHtcbiAgdmFyIHByb3BzID0ga2V5c0luKG9iamVjdCksXG4gICAgICBwcm9wc0xlbmd0aCA9IHByb3BzLmxlbmd0aCxcbiAgICAgIGxlbmd0aCA9IHByb3BzTGVuZ3RoICYmIG9iamVjdC5sZW5ndGg7XG5cbiAgdmFyIGFsbG93SW5kZXhlcyA9ICEhbGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBwcm9wc0xlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKChhbGxvd0luZGV4ZXMgJiYgaXNJbmRleChrZXksIGxlbmd0aCkpIHx8IGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNoaW1LZXlzO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL3NoaW1LZXlzLmpzXG4gKiogbW9kdWxlIGlkID0gNTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCcuL2JpbmRDYWxsYmFjaycpLFxuICAgIGlzSXRlcmF0ZWVDYWxsID0gcmVxdWlyZSgnLi9pc0l0ZXJhdGVlQ2FsbCcpLFxuICAgIHJlc3RQYXJhbSA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9uL3Jlc3RQYXJhbScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBgXy5hc3NpZ25gLCBgXy5kZWZhdWx0c2AsIG9yIGBfLm1lcmdlYCBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIHJlc3RQYXJhbShmdW5jdGlvbihvYmplY3QsIHNvdXJjZXMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gb2JqZWN0ID09IG51bGwgPyAwIDogc291cmNlcy5sZW5ndGgsXG4gICAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPiAyID8gc291cmNlc1tsZW5ndGggLSAyXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgZ3VhcmQgPSBsZW5ndGggPiAyID8gc291cmNlc1syXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgdGhpc0FyZyA9IGxlbmd0aCA+IDEgPyBzb3VyY2VzW2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicpIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSBiaW5kQ2FsbGJhY2soY3VzdG9taXplciwgdGhpc0FyZywgNSk7XG4gICAgICBsZW5ndGggLT0gMjtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VzdG9taXplciA9IHR5cGVvZiB0aGlzQXJnID09ICdmdW5jdGlvbicgPyB0aGlzQXJnIDogdW5kZWZpbmVkO1xuICAgICAgbGVuZ3RoIC09IChjdXN0b21pemVyID8gMSA6IDApO1xuICAgIH1cbiAgICBpZiAoZ3VhcmQgJiYgaXNJdGVyYXRlZUNhbGwoc291cmNlc1swXSwgc291cmNlc1sxXSwgZ3VhcmQpKSB7XG4gICAgICBjdXN0b21pemVyID0gbGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IGN1c3RvbWl6ZXI7XG4gICAgICBsZW5ndGggPSAxO1xuICAgIH1cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBhc3NpZ25lcihvYmplY3QsIHNvdXJjZSwgY3VzdG9taXplcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUFzc2lnbmVyO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2NyZWF0ZUFzc2lnbmVyLmpzXG4gKiogbW9kdWxlIGlkID0gNTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpZGVudGl0eSA9IHJlcXVpcmUoJy4uL3V0aWxpdHkvaWRlbnRpdHknKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VDYWxsYmFja2Agd2hpY2ggb25seSBzdXBwb3J0cyBgdGhpc2AgYmluZGluZ1xuICogYW5kIHNwZWNpZnlpbmcgdGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGJpbmQuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJnQ291bnRdIFRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjYWxsYmFjay5cbiAqL1xuZnVuY3Rpb24gYmluZENhbGxiYWNrKGZ1bmMsIHRoaXNBcmcsIGFyZ0NvdW50KSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5O1xuICB9XG4gIGlmICh0aGlzQXJnID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZnVuYztcbiAgfVxuICBzd2l0Y2ggKGFyZ0NvdW50KSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDQ6IHJldHVybiBmdW5jdGlvbihhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH07XG4gICAgY2FzZSA1OiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBvdGhlciwga2V5LCBvYmplY3QsIHNvdXJjZSk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kQ2FsbGJhY2s7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvYmluZENhbGxiYWNrLmpzXG4gKiogbW9kdWxlIGlkID0gNTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgcHJvdmlkZWQgdG8gaXQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsaXR5XG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKlxuICogXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3Q7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpZGVudGl0eTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC91dGlsaXR5L2lkZW50aXR5LmpzXG4gKiogbW9kdWxlIGlkID0gNTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9pc0luZGV4JyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBwcm92aWRlZCBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0l0ZXJhdGVlQ2FsbCh2YWx1ZSwgaW5kZXgsIG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgaW5kZXg7XG4gIGlmICh0eXBlID09ICdudW1iZXInXG4gICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgOiAodHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3QpKSB7XG4gICAgdmFyIG90aGVyID0gb2JqZWN0W2luZGV4XTtcbiAgICByZXR1cm4gdmFsdWUgPT09IHZhbHVlID8gKHZhbHVlID09PSBvdGhlcikgOiAob3RoZXIgIT09IG90aGVyKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJdGVyYXRlZUNhbGw7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNJdGVyYXRlZUNhbGwuanNcbiAqKiBtb2R1bGUgaWQgPSA1N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXg7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlXG4gKiBjcmVhdGVkIGZ1bmN0aW9uIGFuZCBhcmd1bWVudHMgZnJvbSBgc3RhcnRgIGFuZCBiZXlvbmQgcHJvdmlkZWQgYXMgYW4gYXJyYXkuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGJhc2VkIG9uIHRoZSBbcmVzdCBwYXJhbWV0ZXJdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9GdW5jdGlvbnMvcmVzdF9wYXJhbWV0ZXJzKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBzYXkgPSBfLnJlc3RQYXJhbShmdW5jdGlvbih3aGF0LCBuYW1lcykge1xuICogICByZXR1cm4gd2hhdCArICcgJyArIF8uaW5pdGlhbChuYW1lcykuam9pbignLCAnKSArXG4gKiAgICAgKF8uc2l6ZShuYW1lcykgPiAxID8gJywgJiAnIDogJycpICsgXy5sYXN0KG5hbWVzKTtcbiAqIH0pO1xuICpcbiAqIHNheSgnaGVsbG8nLCAnZnJlZCcsICdiYXJuZXknLCAncGViYmxlcycpO1xuICogLy8gPT4gJ2hlbGxvIGZyZWQsIGJhcm5leSwgJiBwZWJibGVzJ1xuICovXG5mdW5jdGlvbiByZXN0UGFyYW0oZnVuYywgc3RhcnQpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogKCtzdGFydCB8fCAwKSwgMCk7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWF4KGFyZ3MubGVuZ3RoIC0gc3RhcnQsIDApLFxuICAgICAgICByZXN0ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICByZXN0W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIHN3aXRjaCAoc3RhcnQpIHtcbiAgICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCByZXN0KTtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcmdzWzBdLCByZXN0KTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcmdzWzBdLCBhcmdzWzFdLCByZXN0KTtcbiAgICB9XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgaW5kZXggPSAtMTtcbiAgICB3aGlsZSAoKytpbmRleCA8IHN0YXJ0KSB7XG4gICAgICBvdGhlckFyZ3NbaW5kZXhdID0gYXJnc1tpbmRleF07XG4gICAgfVxuICAgIG90aGVyQXJnc1tzdGFydF0gPSByZXN0O1xuICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzdFBhcmFtO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2Z1bmN0aW9uL3Jlc3RQYXJhbS5qc1xuICoqIG1vZHVsZSBpZCA9IDU4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBpbnB1dFN0cmVhbToge1xyXG4gICAgICAgIG5hbWU6IFwiTGl2ZVwiLFxyXG4gICAgICAgIHR5cGU6IFwiTGl2ZVN0cmVhbVwiLFxyXG4gICAgICAgIGNvbnN0cmFpbnRzOiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiA2NDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogNDgwLFxyXG4gICAgICAgICAgICBtaW5Bc3BlY3RSYXRpbzogMCxcclxuICAgICAgICAgICAgbWF4QXNwZWN0UmF0aW86IDEwMCxcclxuICAgICAgICAgICAgZmFjaW5nOiBcImVudmlyb25tZW50XCIgLy8gb3IgdXNlclxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXJlYToge1xyXG4gICAgICAgICAgICB0b3A6IFwiMCVcIixcclxuICAgICAgICAgICAgcmlnaHQ6IFwiMCVcIixcclxuICAgICAgICAgICAgbGVmdDogXCIwJVwiLFxyXG4gICAgICAgICAgICBib3R0b206IFwiMCVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2luZ2xlQ2hhbm5lbDogZmFsc2UgLy8gdHJ1ZTogb25seSB0aGUgcmVkIGNvbG9yLWNoYW5uZWwgaXMgcmVhZFxyXG4gICAgfSxcclxuICAgIHRyYWNraW5nOiBmYWxzZSxcclxuICAgIGRlYnVnOiBmYWxzZSxcclxuICAgIGNvbnRyb2xzOiBmYWxzZSxcclxuICAgIGxvY2F0ZTogdHJ1ZSxcclxuICAgIG51bU9mV29ya2VyczogNCxcclxuICAgIHZpc3VhbDoge1xyXG4gICAgICAgIHNob3c6IHRydWVcclxuICAgIH0sXHJcbiAgICBkZWNvZGVyOiB7XHJcbiAgICAgICAgZHJhd0JvdW5kaW5nQm94OiBmYWxzZSxcclxuICAgICAgICBzaG93RnJlcXVlbmN5OiBmYWxzZSxcclxuICAgICAgICBkcmF3U2NhbmxpbmU6IGZhbHNlLFxyXG4gICAgICAgIHNob3dQYXR0ZXJuOiBmYWxzZSxcclxuICAgICAgICByZWFkZXJzOiBbXHJcbiAgICAgICAgICAgICdjb2RlXzEyOF9yZWFkZXInXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIGxvY2F0b3I6IHtcclxuICAgICAgICBoYWxmU2FtcGxlOiB0cnVlLFxyXG4gICAgICAgIHBhdGNoU2l6ZTogXCJtZWRpdW1cIiwgLy8geC1zbWFsbCwgc21hbGwsIG1lZGl1bSwgbGFyZ2UsIHgtbGFyZ2VcclxuICAgICAgICBzaG93Q2FudmFzOiBmYWxzZSxcclxuICAgICAgICBzaG93UGF0Y2hlczogZmFsc2UsXHJcbiAgICAgICAgc2hvd0ZvdW5kUGF0Y2hlczogZmFsc2UsXHJcbiAgICAgICAgc2hvd1NrZWxldG9uOiBmYWxzZSxcclxuICAgICAgICBzaG93TGFiZWxzOiBmYWxzZSxcclxuICAgICAgICBzaG93UGF0Y2hMYWJlbHM6IGZhbHNlLFxyXG4gICAgICAgIHNob3dSZW1haW5pbmdQYXRjaExhYmVsczogZmFsc2UsXHJcbiAgICAgICAgYm94RnJvbVBhdGNoZXM6IHtcclxuICAgICAgICAgICAgc2hvd1RyYW5zZm9ybWVkOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd1RyYW5zZm9ybWVkQm94OiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd0JCOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvY29uZmlnLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGV2ZW50cyA9IHt9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldEV2ZW50KGV2ZW50TmFtZSkge1xyXG4gICAgICAgIGlmICghZXZlbnRzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSB7XHJcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyczogW11cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50c1tldmVudE5hbWVdO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsZWFyRXZlbnRzKCl7XHJcbiAgICAgICAgZXZlbnRzID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHVibGlzaFN1YnNjcmlwdGlvbihzdWJzY3JpcHRpb24sIGRhdGEpIHtcclxuICAgICAgICBpZiAoc3Vic2NyaXB0aW9uLmFzeW5jKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24uY2FsbGJhY2soZGF0YSk7XHJcbiAgICAgICAgICAgIH0sIDQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5jYWxsYmFjayhkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3Vic2NyaWJlKGV2ZW50LCBjYWxsYmFjaywgYXN5bmMpIHtcclxuICAgICAgICB2YXIgc3Vic2NyaXB0aW9uO1xyXG5cclxuICAgICAgICBpZiAoIHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcclxuICAgICAgICAgICAgICAgIGFzeW5jOiBhc3luY1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IGNhbGxiYWNrO1xyXG4gICAgICAgICAgICBpZiAoIXN1YnNjcmlwdGlvbi5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJDYWxsYmFjayB3YXMgbm90IHNwZWNpZmllZCBvbiBvcHRpb25zXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldEV2ZW50KGV2ZW50KS5zdWJzY3JpYmVycy5wdXNoKHN1YnNjcmlwdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaywgYXN5bmMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1YnNjcmliZShldmVudCwgY2FsbGJhY2ssIGFzeW5jKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHB1Ymxpc2g6IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBnZXRFdmVudChldmVudE5hbWUpLFxyXG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlcnMgPSBldmVudC5zdWJzY3JpYmVycztcclxuXHJcbiAgICAgICAgICAgIGV2ZW50LnN1YnNjcmliZXJzID0gc3Vic2NyaWJlcnMuZmlsdGVyKGZ1bmN0aW9uKHN1YnNjcmliZXIpIHtcclxuICAgICAgICAgICAgICAgIHB1Ymxpc2hTdWJzY3JpcHRpb24oc3Vic2NyaWJlciwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIXN1YnNjcmliZXIub25jZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbmNlOiBmdW5jdGlvbihldmVudCwgY2FsbGJhY2ssIGFzeW5jKSB7XHJcbiAgICAgICAgICAgIHN1YnNjcmliZShldmVudCwge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IGFzeW5jLFxyXG4gICAgICAgICAgICAgICAgb25jZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbihldmVudE5hbWUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudDtcclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudE5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gZ2V0RXZlbnQoZXZlbnROYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudCAmJiBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN1YnNjcmliZXJzID0gZXZlbnQuc3Vic2NyaWJlcnMuZmlsdGVyKGZ1bmN0aW9uKHN1YnNjcmliZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3Vic2NyaWJlci5jYWxsYmFjayAhPT0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN1YnNjcmliZXJzID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckV2ZW50cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSkoKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvZXZlbnRzLmpzXG4gKiovIiwiY29uc3QgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L21lcmdlJyk7XHJcblxyXG52YXIgc3RyZWFtUmVmLFxyXG4gICAgbG9hZGVkRGF0YUhhbmRsZXI7XHJcblxyXG4vKipcclxuICogV3JhcHMgYnJvd3Nlci1zcGVjaWZpYyBnZXRVc2VyTWVkaWFcclxuICogQHBhcmFtIHtPYmplY3R9IGNvbnN0cmFpbnRzXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdWNjZXNzIENhbGxiYWNrXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBmYWlsdXJlIENhbGxiYWNrXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRVc2VyTWVkaWEoY29uc3RyYWludHMsIHN1Y2Nlc3MsIGZhaWx1cmUpIHtcclxuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzLCBmdW5jdGlvbiAoc3RyZWFtKSB7XHJcbiAgICAgICAgICAgIHN0cmVhbVJlZiA9IHN0cmVhbTtcclxuICAgICAgICAgICAgdmFyIHZpZGVvU3JjID0gKHdpbmRvdy5VUkwgJiYgd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKSkgfHwgc3RyZWFtO1xyXG4gICAgICAgICAgICBzdWNjZXNzLmFwcGx5KG51bGwsIFt2aWRlb1NyY10pO1xyXG4gICAgICAgIH0sIGZhaWx1cmUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBmYWlsdXJlKG5ldyBUeXBlRXJyb3IoXCJnZXRVc2VyTWVkaWEgbm90IGF2YWlsYWJsZVwiKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRlZERhdGEodmlkZW8sIGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgYXR0ZW1wdHMgPSAxMDtcclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja1ZpZGVvKCkge1xyXG4gICAgICAgIGlmIChhdHRlbXB0cyA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHZpZGVvLnZpZGVvV2lkdGggPiAwICYmIHZpZGVvLnZpZGVvSGVpZ2h0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codmlkZW8udmlkZW9XaWR0aCArIFwicHggeCBcIiArIHZpZGVvLnZpZGVvSGVpZ2h0ICsgXCJweFwiKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjaGVja1ZpZGVvLCA1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soJ1VuYWJsZSB0byBwbGF5IHZpZGVvIHN0cmVhbS4gSXMgd2ViY2FtIHdvcmtpbmc/Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF0dGVtcHRzLS07XHJcbiAgICB9XHJcbiAgICBjaGVja1ZpZGVvKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcmllcyB0byBhdHRhY2ggdGhlIGNhbWVyYS1zdHJlYW0gdG8gYSBnaXZlbiB2aWRlby1lbGVtZW50XHJcbiAqIGFuZCBjYWxscyB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gd2hlbiB0aGUgY29udGVudCBpcyByZWFkeVxyXG4gKiBAcGFyYW0ge09iamVjdH0gY29uc3RyYWludHNcclxuICogQHBhcmFtIHtPYmplY3R9IHZpZGVvXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjYWxsYmFja1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdENhbWVyYShjb25zdHJhaW50cywgdmlkZW8sIGNhbGxiYWNrKSB7XHJcbiAgICBnZXRVc2VyTWVkaWEoY29uc3RyYWludHMsIGZ1bmN0aW9uKHNyYykge1xyXG4gICAgICAgIHZpZGVvLnNyYyA9IHNyYztcclxuICAgICAgICBpZiAobG9hZGVkRGF0YUhhbmRsZXIpIHtcclxuICAgICAgICAgICAgdmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRlZGRhdGFcIiwgbG9hZGVkRGF0YUhhbmRsZXIsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9hZGVkRGF0YUhhbmRsZXIgPSBsb2FkZWREYXRhLmJpbmQobnVsbCwgdmlkZW8sIGNhbGxiYWNrKTtcclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRkYXRhJywgbG9hZGVkRGF0YUhhbmRsZXIsIGZhbHNlKTtcclxuICAgICAgICB2aWRlby5wbGF5KCk7XHJcbiAgICB9LCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY2FsbGJhY2soZSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE5vcm1hbGl6ZXMgdGhlIGluY29taW5nIGNvbnN0cmFpbnRzIHRvIHNhdGlzZnkgdGhlIGN1cnJlbnQgYnJvd3NlclxyXG4gKiBAcGFyYW0gY29uZmlnXHJcbiAqIEBwYXJhbSBjYiBDYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbmV2ZXIgY29uc3RyYWludHMgYXJlIGNyZWF0ZWRcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5mdW5jdGlvbiBub3JtYWxpemVDb25zdHJhaW50cyhjb25maWcsIGNiKSB7XHJcbiAgICB2YXIgY29uc3RyYWludHMgPSB7XHJcbiAgICAgICAgICAgIGF1ZGlvOiBmYWxzZSxcclxuICAgICAgICAgICAgdmlkZW86IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHZpZGVvQ29uc3RyYWludHMgPSBtZXJnZSh7XHJcbiAgICAgICAgICAgIHdpZHRoOiA2NDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogNDgwLFxyXG4gICAgICAgICAgICBtaW5Bc3BlY3RSYXRpbzogMCxcclxuICAgICAgICAgICAgbWF4QXNwZWN0UmF0aW86IDEwMCxcclxuICAgICAgICAgICAgZmFjaW5nOiBcImVudmlyb25tZW50XCJcclxuICAgICAgICB9LCBjb25maWcpO1xyXG5cclxuICAgIGlmICggdHlwZW9mIE1lZGlhU3RyZWFtVHJhY2sgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBNZWRpYVN0cmVhbVRyYWNrLmdldFNvdXJjZXMgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgTWVkaWFTdHJlYW1UcmFjay5nZXRTb3VyY2VzKGZ1bmN0aW9uKHNvdXJjZUluZm9zKSB7XHJcbiAgICAgICAgICAgIHZhciB2aWRlb1NvdXJjZUlkO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZUluZm9zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc291cmNlSW5mbyA9IHNvdXJjZUluZm9zW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZUluZm8ua2luZCA9PT0gXCJ2aWRlb1wiICYmIHNvdXJjZUluZm8uZmFjaW5nID09PSB2aWRlb0NvbnN0cmFpbnRzLmZhY2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZGVvU291cmNlSWQgPSBzb3VyY2VJbmZvLmlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0ge1xyXG4gICAgICAgICAgICAgICAgbWFuZGF0b3J5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluV2lkdGg6IHZpZGVvQ29uc3RyYWludHMud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluSGVpZ2h0OiB2aWRlb0NvbnN0cmFpbnRzLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICBtaW5Bc3BlY3RSYXRpbzogdmlkZW9Db25zdHJhaW50cy5taW5Bc3BlY3RSYXRpbyxcclxuICAgICAgICAgICAgICAgICAgICBtYXhBc3BlY3RSYXRpbzogdmlkZW9Db25zdHJhaW50cy5tYXhBc3BlY3RSYXRpb1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9wdGlvbmFsOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUlkOiB2aWRlb1NvdXJjZUlkXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gY2IoY29uc3RyYWludHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdHJhaW50cy52aWRlbyA9IHtcclxuICAgICAgICAgICAgbWVkaWFTb3VyY2U6IFwiY2FtZXJhXCIsXHJcbiAgICAgICAgICAgIHdpZHRoOiB7IG1pbjogdmlkZW9Db25zdHJhaW50cy53aWR0aCwgbWF4OiB2aWRlb0NvbnN0cmFpbnRzLndpZHRoIH0sXHJcbiAgICAgICAgICAgIGhlaWdodDogeyBtaW46IHZpZGVvQ29uc3RyYWludHMuaGVpZ2h0LCBtYXg6IHZpZGVvQ29uc3RyYWludHMuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgIHJlcXVpcmU6IFtcIndpZHRoXCIsIFwiaGVpZ2h0XCJdXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gY2IoY29uc3RyYWludHMpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVxdWVzdHMgdGhlIGJhY2stZmFjaW5nIGNhbWVyYSBvZiB0aGUgdXNlci4gVGhlIGNhbGxiYWNrIGlzIGNhbGxlZFxyXG4gKiB3aGVuZXZlciB0aGUgc3RyZWFtIGlzIHJlYWR5IHRvIGJlIGNvbnN1bWVkLCBvciBpZiBhbiBlcnJvciBvY2N1cmVzLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdmlkZW9cclxuICogQHBhcmFtIHtPYmplY3R9IGNhbGxiYWNrXHJcbiAqL1xyXG5mdW5jdGlvbiByZXF1ZXN0KHZpZGVvLCB2aWRlb0NvbnN0cmFpbnRzLCBjYWxsYmFjaykge1xyXG4gICAgbm9ybWFsaXplQ29uc3RyYWludHModmlkZW9Db25zdHJhaW50cywgZnVuY3Rpb24oY29uc3RyYWludHMpIHtcclxuICAgICAgICBpbml0Q2FtZXJhKGNvbnN0cmFpbnRzLCB2aWRlbywgY2FsbGJhY2spO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHJlcXVlc3Q6IGZ1bmN0aW9uKHZpZGVvLCBjb25zdHJhaW50cywgY2FsbGJhY2spIHtcclxuICAgICAgICByZXF1ZXN0KHZpZGVvLCBjb25zdHJhaW50cywgY2FsbGJhY2spO1xyXG4gICAgfSxcclxuICAgIHJlbGVhc2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB0cmFja3MgPSBzdHJlYW1SZWYgJiYgc3RyZWFtUmVmLmdldFZpZGVvVHJhY2tzKCk7XHJcbiAgICAgICAgaWYgKHRyYWNrcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdHJhY2tzWzBdLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RyZWFtUmVmID0gbnVsbDtcclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvY2FtZXJhX2FjY2Vzcy5qc1xuICoqLyIsImltcG9ydCBJbWFnZURlYnVnIGZyb20gJy4vaW1hZ2VfZGVidWcnO1xyXG5cclxuZnVuY3Rpb24gY29udGFpbnMoY29kZVJlc3VsdCwgbGlzdCkge1xyXG4gICAgaWYgKGxpc3QpIHtcclxuICAgICAgICByZXR1cm4gbGlzdC5zb21lKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhpdGVtKS5ldmVyeShmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbVtrZXldID09PSBjb2RlUmVzdWx0W2tleV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXNzZXNGaWx0ZXIoY29kZVJlc3VsdCwgZmlsdGVyKSB7XHJcbiAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHJldHVybiBmaWx0ZXIoY29kZVJlc3VsdCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihjb25maWcpIHtcclxuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSxcclxuICAgICAgICAgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSxcclxuICAgICAgICAgICAgcmVzdWx0cyA9IFtdLFxyXG4gICAgICAgICAgICBjYXBhY2l0eSA9IGNvbmZpZy5jYXBhY2l0eSB8fCAyMCxcclxuICAgICAgICAgICAgY2FwdHVyZSA9IGNvbmZpZy5jYXB0dXJlID09PSB0cnVlO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBtYXRjaGVzQ29uc3RyYWludHMoY29kZVJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2FwYWNpdHlcclxuICAgICAgICAgICAgICAgICYmIGNvZGVSZXN1bHRcclxuICAgICAgICAgICAgICAgICYmICFjb250YWlucyhjb2RlUmVzdWx0LCBjb25maWcuYmxhY2tsaXN0KVxyXG4gICAgICAgICAgICAgICAgJiYgcGFzc2VzRmlsdGVyKGNvZGVSZXN1bHQsIGNvbmZpZy5maWx0ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWRkUmVzdWx0OiBmdW5jdGlvbihkYXRhLCBpbWFnZVNpemUsIGNvZGVSZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlc0NvbnN0cmFpbnRzKGNvZGVSZXN1bHQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwYWNpdHktLTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuY29kZVJlc3VsdCA9IGNvZGVSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhcHR1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gaW1hZ2VTaXplLng7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBpbWFnZVNpemUueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3SW1hZ2UoZGF0YSwgaW1hZ2VTaXplLCBjdHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZnJhbWUgPSBjYW52YXMudG9EYXRhVVJMKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRSZXN1bHRzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvcmVzdWx0X2NvbGxlY3Rvci5qc1xuICoqLyIsImNvbnN0IEdldFBpeGVscyA9IHJlcXVpcmUoXCJnZXQtcGl4ZWxzXCIpO1xyXG5cclxudmFyIElucHV0U3RyZWFtID0ge307XHJcblxyXG5JbnB1dFN0cmVhbS5jcmVhdGVJbWFnZVN0cmVhbSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHRoYXQgPSB7fTtcclxuICAgIHZhciBfY29uZmlnID0gbnVsbDtcclxuXHJcbiAgICB2YXIgd2lkdGggPSAwLFxyXG4gICAgICAgIGhlaWdodCA9IDAsXHJcbiAgICAgICAgZnJhbWVJZHggPSAwLFxyXG4gICAgICAgIHBhdXNlZCA9IHRydWUsXHJcbiAgICAgICAgbG9hZGVkID0gZmFsc2UsXHJcbiAgICAgICAgZnJhbWUgPSBudWxsLFxyXG4gICAgICAgIGJhc2VVcmwsXHJcbiAgICAgICAgZW5kZWQgPSBmYWxzZSxcclxuICAgICAgICBzaXplLFxyXG4gICAgICAgIGNhbGN1bGF0ZWRXaWR0aCxcclxuICAgICAgICBjYWxjdWxhdGVkSGVpZ2h0LFxyXG4gICAgICAgIF9ldmVudE5hbWVzID0gWydjYW5yZWNvcmQnLCAnZW5kZWQnXSxcclxuICAgICAgICBfZXZlbnRIYW5kbGVycyA9IHt9LFxyXG4gICAgICAgIF90b3BSaWdodCA9IHt4OiAwLCB5OiAwfSxcclxuICAgICAgICBfY2FudmFzU2l6ZSA9IHt4OiAwLCB5OiAwfTtcclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkSW1hZ2VzKCkge1xyXG4gICAgICAgIGxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIEdldFBpeGVscyhiYXNlVXJsLCBmdW5jdGlvbihlcnIsIHBpeGVscykge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgZXhpdCgxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwaXhlbHMuc2hhcGUpO1xyXG4gICAgICAgICAgICBmcmFtZSA9IHBpeGVscztcclxuICAgICAgICAgICAgd2lkdGggPSBwaXhlbHMuc2hhcGVbMF07XHJcbiAgICAgICAgICAgIGhlaWdodCA9IHBpeGVscy5zaGFwZVsxXTtcclxuICAgICAgICAgICAgY2FsY3VsYXRlZFdpZHRoID0gX2NvbmZpZy5zaXplID8gd2lkdGgvaGVpZ2h0ID4gMSA/IF9jb25maWcuc2l6ZSA6IE1hdGguZmxvb3IoKHdpZHRoL2hlaWdodCkgKiBfY29uZmlnLnNpemUpIDogd2lkdGg7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRIZWlnaHQgPSBfY29uZmlnLnNpemUgPyB3aWR0aC9oZWlnaHQgPiAxID8gTWF0aC5mbG9vcigoaGVpZ2h0L3dpZHRoKSAqIF9jb25maWcuc2l6ZSkgOiBfY29uZmlnLnNpemUgOiBoZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBfY2FudmFzU2l6ZS54ID0gY2FsY3VsYXRlZFdpZHRoO1xyXG4gICAgICAgICAgICBfY2FudmFzU2l6ZS55ID0gY2FsY3VsYXRlZEhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBwdWJsaXNoRXZlbnQoXCJjYW5yZWNvcmRcIiwgW10pO1xyXG4gICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwdWJsaXNoRXZlbnQoZXZlbnROYW1lLCBhcmdzKSB7XHJcbiAgICAgICAgdmFyIGosXHJcbiAgICAgICAgICAgIGhhbmRsZXJzID0gX2V2ZW50SGFuZGxlcnNbZXZlbnROYW1lXTtcclxuXHJcbiAgICAgICAgaWYgKGhhbmRsZXJzICYmIGhhbmRsZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBoYW5kbGVycy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlcnNbal0uYXBwbHkodGhhdCwgYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRoYXQudHJpZ2dlciA9IHB1Ymxpc2hFdmVudDtcclxuXHJcbiAgICB0aGF0LmdldFdpZHRoID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGN1bGF0ZWRXaWR0aDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRIZWlnaHQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gY2FsY3VsYXRlZEhlaWdodDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zZXRXaWR0aCA9IGZ1bmN0aW9uKHdpZHRoKSB7XHJcbiAgICAgICAgY2FsY3VsYXRlZFdpZHRoID0gd2lkdGg7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2V0SGVpZ2h0ID0gZnVuY3Rpb24oaGVpZ2h0KSB7XHJcbiAgICAgICAgY2FsY3VsYXRlZEhlaWdodCA9IGhlaWdodDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRSZWFsV2lkdGggPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gd2lkdGg7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0UmVhbEhlaWdodCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBoZWlnaHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2V0SW5wdXRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICBfY29uZmlnID0gc3RyZWFtO1xyXG4gICAgICAgIGJhc2VVcmwgPSBfY29uZmlnLnNyYztcclxuICAgICAgICBzaXplID0gMTtcclxuICAgICAgICBsb2FkSW1hZ2VzKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZW5kZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gZW5kZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2V0QXR0cmlidXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHJcbiAgICB0aGF0LmdldENvbmZpZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBfY29uZmlnO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnBhdXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcGF1c2VkID0gdHJ1ZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5wbGF5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcGF1c2VkID0gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2V0Q3VycmVudFRpbWUgPSBmdW5jdGlvbih0aW1lKSB7XHJcbiAgICAgICAgZnJhbWVJZHggPSB0aW1lO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZikge1xyXG4gICAgICAgIGlmIChfZXZlbnROYW1lcy5pbmRleE9mKGV2ZW50KSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgaWYgKCFfZXZlbnRIYW5kbGVyc1tldmVudF0pIHtcclxuICAgICAgICAgICAgICAgIF9ldmVudEhhbmRsZXJzW2V2ZW50XSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9ldmVudEhhbmRsZXJzW2V2ZW50XS5wdXNoKGYpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zZXRUb3BSaWdodCA9IGZ1bmN0aW9uKHRvcFJpZ2h0KSB7XHJcbiAgICAgICAgX3RvcFJpZ2h0LnggPSB0b3BSaWdodC54O1xyXG4gICAgICAgIF90b3BSaWdodC55ID0gdG9wUmlnaHQueTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRUb3BSaWdodCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBfdG9wUmlnaHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2V0Q2FudmFzU2l6ZSA9IGZ1bmN0aW9uKHNpemUpIHtcclxuICAgICAgICBfY2FudmFzU2l6ZS54ID0gc2l6ZS54O1xyXG4gICAgICAgIF9jYW52YXNTaXplLnkgPSBzaXplLnk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0Q2FudmFzU2l6ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBfY2FudmFzU2l6ZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRGcmFtZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghbG9hZGVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmcmFtZTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0U3RyZWFtO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL2xpYi9pbnB1dF9zdHJlYW0uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnZXQtcGl4ZWxzXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJnZXQtcGl4ZWxzXCJcbiAqKiBtb2R1bGUgaWQgPSA2NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiY29uc3QgQ1ZVdGlscyA9IHJlcXVpcmUoJy4uL3NyYy9jdl91dGlscycpLFxyXG4gICAgICBOZGFycmF5ID0gcmVxdWlyZShcIm5kYXJyYXlcIiksXHJcbiAgICAgIEludGVycDJEID0gcmVxdWlyZShcIm5kYXJyYXktbGluZWFyLWludGVycG9sYXRlXCIpLmQyO1xyXG5cclxudmFyIEZyYW1lR3JhYmJlciA9IHt9O1xyXG5cclxuRnJhbWVHcmFiYmVyLmNyZWF0ZSA9IGZ1bmN0aW9uKGlucHV0U3RyZWFtKSB7XHJcbiAgICB2YXIgX3RoYXQgPSB7fSxcclxuICAgICAgICBfc3RyZWFtQ29uZmlnID0gaW5wdXRTdHJlYW0uZ2V0Q29uZmlnKCksXHJcbiAgICAgICAgX3ZpZGVvX3NpemUgPSBDVlV0aWxzLmltYWdlUmVmKGlucHV0U3RyZWFtLmdldFJlYWxXaWR0aCgpLCBpbnB1dFN0cmVhbS5nZXRSZWFsSGVpZ2h0KCkpLFxyXG4gICAgICAgIF9jYW52YXNTaXplID0gaW5wdXRTdHJlYW0uZ2V0Q2FudmFzU2l6ZSgpLFxyXG4gICAgICAgIF9zaXplID0gQ1ZVdGlscy5pbWFnZVJlZihpbnB1dFN0cmVhbS5nZXRXaWR0aCgpLCBpbnB1dFN0cmVhbS5nZXRIZWlnaHQoKSksXHJcbiAgICAgICAgX3RvcFJpZ2h0ID0gaW5wdXRTdHJlYW0uZ2V0VG9wUmlnaHQoKSxcclxuICAgICAgICBfZGF0YSA9IG5ldyBVaW50OEFycmF5KF9zaXplLnggKiBfc2l6ZS55KSxcclxuICAgICAgICBfZ3JheURhdGEgPSBuZXcgVWludDhBcnJheShfdmlkZW9fc2l6ZS54ICogX3ZpZGVvX3NpemUueSksXHJcbiAgICAgICAgX2NhbnZhc0RhdGEgPSBuZXcgVWludDhBcnJheShfY2FudmFzU2l6ZS54ICogX2NhbnZhc1NpemUueSksXHJcbiAgICAgICAgX2dyYXlJbWFnZUFycmF5ID0gTmRhcnJheShfZ3JheURhdGEsIFtfdmlkZW9fc2l6ZS55LCBfdmlkZW9fc2l6ZS54XSkudHJhbnNwb3NlKDEsIDApLFxyXG4gICAgICAgIF9jYW52YXNJbWFnZUFycmF5ID0gTmRhcnJheShfY2FudmFzRGF0YSwgW19jYW52YXNTaXplLnksIF9jYW52YXNTaXplLnhdKS50cmFuc3Bvc2UoMSwgMCksXHJcbiAgICAgICAgX3RhcmdldEltYWdlQXJyYXkgPSBfY2FudmFzSW1hZ2VBcnJheS5oaShfdG9wUmlnaHQueCArIF9zaXplLngsIF90b3BSaWdodC55ICsgX3NpemUueSkubG8oX3RvcFJpZ2h0LngsIF90b3BSaWdodC55KSxcclxuICAgICAgICBfc3RlcFNpemVYID0gX3ZpZGVvX3NpemUueC9fY2FudmFzU2l6ZS54LFxyXG4gICAgICAgIF9zdGVwU2l6ZVkgPSBfdmlkZW9fc2l6ZS55L19jYW52YXNTaXplLnk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJGcmFtZUdyYWJiZXJcIiwgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIHZpZGVvU2l6ZTogX2dyYXlJbWFnZUFycmF5LnNoYXBlLFxyXG4gICAgICAgIGNhbnZhc1NpemU6IF9jYW52YXNJbWFnZUFycmF5LnNoYXBlLFxyXG4gICAgICAgIHN0ZXBTaXplOiBbX3N0ZXBTaXplWCwgX3N0ZXBTaXplWV0sXHJcbiAgICAgICAgc2l6ZTogX3RhcmdldEltYWdlQXJyYXkuc2hhcGUsXHJcbiAgICAgICAgdG9wUmlnaHQ6IF90b3BSaWdodFxyXG4gICAgfSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXNlcyB0aGUgZ2l2ZW4gYXJyYXkgYXMgZnJhbWUtYnVmZmVyXHJcbiAgICAgKi9cclxuICAgIF90aGF0LmF0dGFjaERhdGEgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgX2RhdGEgPSBkYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHVzZWQgZnJhbWUtYnVmZmVyXHJcbiAgICAgKi9cclxuICAgIF90aGF0LmdldERhdGEgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gX2RhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmV0Y2hlcyBhIGZyYW1lIGZyb20gdGhlIGlucHV0LXN0cmVhbSBhbmQgcHV0cyBpbnRvIHRoZSBmcmFtZS1idWZmZXIuXHJcbiAgICAgKiBUaGUgaW1hZ2UtZGF0YSBpcyBjb252ZXJ0ZWQgdG8gZ3JheS1zY2FsZSBhbmQgdGhlbiBoYWxmLXNhbXBsZWQgaWYgY29uZmlndXJlZC5cclxuICAgICAqL1xyXG4gICAgX3RoYXQuZ3JhYiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBmcmFtZSA9IGlucHV0U3RyZWFtLmdldEZyYW1lKCk7XHJcblxyXG4gICAgICAgIGlmIChmcmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlQW5kQ3JvcChmcmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIF90aGF0LnNjYWxlQW5kQ3JvcCA9IGZ1bmN0aW9uKGZyYW1lKSB7XHJcbiAgICAgICAgdmFyIHgsXHJcbiAgICAgICAgICAgIHk7XHJcblxyXG4gICAgICAgIC8vIDEuIGNvbXB1dGUgZnVsbC1zaXplZCBncmF5IGltYWdlXHJcbiAgICAgICAgQ1ZVdGlscy5jb21wdXRlR3JheShmcmFtZS5kYXRhLCBfZ3JheURhdGEpO1xyXG5cclxuICAgICAgICAvLyAyLiBpbnRlcnBvbGF0ZVxyXG4gICAgICAgIGZvciAoeSA9IDA7IHkgPCBfY2FudmFzU2l6ZS55OyB5KyspIHtcclxuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IF9jYW52YXNTaXplLng7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgX2NhbnZhc0ltYWdlQXJyYXkuc2V0KHgsIHksIChJbnRlcnAyRChfZ3JheUltYWdlQXJyYXksIHggKiBfc3RlcFNpemVYLCB5ICogX3N0ZXBTaXplWSkpIHwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHRhcmdldEltYWdlQXJyYXkgbXVzdCBiZSBlcXVhbCB0byB0YXJnZXRTaXplXHJcbiAgICAgICAgaWYgKF90YXJnZXRJbWFnZUFycmF5LnNoYXBlWzBdICE9PSBfc2l6ZS54IHx8XHJcbiAgICAgICAgICAgIF90YXJnZXRJbWFnZUFycmF5LnNoYXBlWzFdICE9PSBfc2l6ZS55KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoYXBlcyBkbyBub3QgbWF0Y2ghXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gMy4gY3JvcFxyXG4gICAgICAgIGZvciAoeSA9IDA7IHkgPCBfc2l6ZS55OyB5KyspIHtcclxuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IF9zaXplLng7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgX2RhdGFbeSAqIF9zaXplLnggKyB4XSA9IF90YXJnZXRJbWFnZUFycmF5LmdldCh4LCB5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3RoYXQuZ2V0U2l6ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBfc2l6ZTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIF90aGF0O1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGcmFtZUdyYWJiZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvbGliL2ZyYW1lX2dyYWJiZXIuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZGFycmF5XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJuZGFycmF5XCJcbiAqKiBtb2R1bGUgaWQgPSA2NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmRhcnJheS1saW5lYXItaW50ZXJwb2xhdGVcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIm5kYXJyYXktbGluZWFyLWludGVycG9sYXRlXCJcbiAqKiBtb2R1bGUgaWQgPSA2N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==