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
	    initConfig();
	
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTQ1NGIxNjJmYjM2OGViMjJiYzAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1YWdnYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHlwZWRlZnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlX3dyYXBwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N1YkltYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9jdl91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2x1c3Rlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJnbC1tYXRyaXhcIiIsIndlYnBhY2s6Ly8vLi9zcmMvYXJyYXlfaGVscGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9iYXJjb2RlX2xvY2F0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Jhc3Rlcml6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYWNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2tlbGV0b25pemVyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZV9kZWJ1Zy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFyY29kZV9kZWNvZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9icmVzZW5oYW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGVfMTI4X3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFyY29kZV9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vhbl9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGVfMzlfcmVhZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb2RlXzM5X3Zpbl9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGFiYXJfcmVhZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy91cGNfcmVhZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9lYW5fOF9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VwY19lX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaTJvZjVfcmVhZGVyLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL29iamVjdC9tZXJnZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlTWVyZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYXJyYXlFYWNoLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2Jhc2VNZXJnZURlZXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYXJyYXlDb3B5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvaXNBcmd1bWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNBcnJheUxpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvZ2V0TGVuZ3RoLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2Jhc2VQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9pc0xlbmd0aC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbGFuZy9pc0FycmF5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2dldE5hdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9sYW5nL2lzTmF0aXZlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvaXNGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9sYW5nL2lzT2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvaXNQbGFpbk9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlRm9ySW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZUZvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9jcmVhdGVCYXNlRm9yLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL3RvT2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL29iamVjdC9rZXlzSW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNJbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9sYW5nL2lzVHlwZWRBcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9sYW5nL3RvUGxhaW5PYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZUNvcHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvb2JqZWN0L2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvc2hpbUtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvY3JlYXRlQXNzaWduZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYmluZENhbGxiYWNrLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL3V0aWxpdHkvaWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNJdGVyYXRlZUNhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvZnVuY3Rpb24vcmVzdFBhcmFtLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FtZXJhX2FjY2Vzcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVzdWx0X2NvbGxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW5wdXRfc3RyZWFtLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImdldC1waXhlbHNcIiIsIndlYnBhY2s6Ly8vLi9saWIvZnJhbWVfZ3JhYmJlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZGFycmF5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmRhcnJheS1saW5lYXItaW50ZXJwb2xhdGVcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUNDdENxQixDQUFZOzs7Ozs7MENBQ1IsQ0FBaUI7Ozs7NENBQ2YsQ0FBbUI7Ozs7NENBQ25CLEVBQW1COzs7O29DQUMzQixFQUFVOzs7O21DQUNWLEVBQVU7Ozs7MENBQ0osRUFBaUI7Ozs7d0NBQ25CLEVBQWU7Ozs7cUNBQ25CLENBQVc7OzZDQUNGLEVBQW9COzs7O0FBRWhELEtBQU0sS0FBSyxHQUFHLG1CQUFPLENBQUMsRUFBcUIsQ0FBQyxDQUFDO0FBQzdDLEtBQU0sV0FBVyxHQUFHLG1CQUFPLENBQUMsRUFBYyxDQUFDLENBQUM7QUFDNUMsS0FBTSxZQUFZLEdBQUcsbUJBQU8sQ0FBQyxFQUFlLENBQUMsQ0FBQzs7QUFFOUMsS0FBSSxZQUFZO0tBQ1osYUFBYTtLQUNiLFFBQVE7S0FDUixnQkFBZ0IsR0FBRztBQUNmLFFBQUcsRUFBRTtBQUNELGNBQUssRUFBRSxJQUFJO0FBQ1gsZ0JBQU8sRUFBRSxJQUFJO01BQ2hCO0FBQ0QsUUFBRyxFQUFFO0FBQ0QsY0FBSyxFQUFFLElBQUk7QUFDWCxnQkFBTyxFQUFFLElBQUk7TUFDaEI7RUFDSjtLQUNELGtCQUFrQjtLQUNsQixRQUFRO0tBQ1IsUUFBUTtLQUNSLFdBQVcsR0FBRyxFQUFFO0tBQ2hCLFdBQVcsR0FBRyxJQUFJO0tBQ2xCLGdCQUFnQjtLQUNoQixPQUFPLEdBQUcsRUFBRSxDQUFDOztBQUVqQixVQUFTLGNBQWMsQ0FBQyxZQUFZLEVBQUU7QUFDbEMsZ0JBQVcsQ0FB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QUMsSUFBSSxDQUFDO0FBQ3BDLFNBQUksS0FBSyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2hDLFNBQUksTUFBTSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2pDLFNBQUksaUJBQWlCLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQztBQUM3QyxTQUFJLEdBQUcsR0FBRyxDQUFDO1NBQUUsQ0FBQztTQUFFLENBQUM7U0FBRSxNQUFNLEdBQUcsQ0FBQztTQUFFLENBQUM7U0FBRSxDQUFDO1NBQUUsQ0FBQztTQUFFLENBQUM7U0FBRSxHQUFHO1NBQUUsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7O0FBRzNGLFVBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzNCLGNBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3pCLHVCQUFVLENBQUcsQ0FBQyxHQUFJLEtBQUssR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEMsdUJBQVUsQ0FBRSxDQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUksQ0FBQyxJQUFJLEtBQUssR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7VUFDcEQ7TUFDSjs7O0FBR0QsVUFBTSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3hDLGNBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzNCLHVCQUFVLENBQUcsQ0FBQyxHQUFJLEtBQUssR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEMsdUJBQVUsQ0FBRyxDQUFDLEdBQUksS0FBSyxJQUFLLEtBQUss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Q0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQzVCLEtBQUssR0FBRyxVQUFVLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FDckMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUNyQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQ3JDLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FDM0MsS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUMzQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFDNUMsS0FBSyxHQUFHLFVBQVUsQ0FBRSxZQUFZLEdBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUMxQyxLQUFLLEdBQUcsVUFBVSxDQUFFLFlBQVksR0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQzFDLEtBQUssR0FBRyxVQUFVLENBQUUsWUFBWSxHQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUMzQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQzlDLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FDOUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLEdBQUksQ0FBQyxDQUFDLENBQUM7QUFDM0Qsc0JBQVMsRUFBRSxDQUFDO0FBQ1osc0JBQVMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQzFC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LFdBQU0sRUFBRSxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUM7QUFDbkIsV0FBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQztBQUNwQixXQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFDO0FBQ3BCLGlCQUFZLEVBQUUsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFDO0FBQzFCLGlCQUFZLEVBQUUsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFDO0FBQzFCLGlCQUFZLEVBQUUsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFDO0FBQzFCLGNBQVMsRUFBRSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUM7QUFDdkIsV0FBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQztBQUNuQixpQkFBWSxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDeEIsRUFBQztBQUNGLHNCQUFpQixFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBQztBQUM3QixtQkFBYyxFQUFFLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQztBQUM1QixXQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsVUFBVSxFQUFF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LENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUM7QUFDeEQsbUJBQWMsRUFBRSxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUM7QUFDaEYsaUJBQVksRUFBRSxFQUFDLEtBQUssRUFBRSxDQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFF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QTs7QUFFQTs7Ozs7OztBQ2hCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsUUFBUTtBQUNuQixjQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDMUJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxFQUFFO0FBQ2IsY0FBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixjQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDL0RBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsRUFBRTtBQUNiLFlBQVcsT0FBTztBQUNsQixjQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDdkJBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUNBQSx3RCIsImZpbGUiOiJxdWFnZ2EuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBlNDU0YjE2MmZiMzY4ZWIyMmJjMFxuICoqLyIsImltcG9ydCBUeXBlRGVmcyBmcm9tICcuL3R5cGVkZWZzJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IEltYWdlV3JhcHBlciBmcm9tICcuL2ltYWdlX3dyYXBwZXInO1xuaW1wb3J0IEJhcmNvZGVMb2NhdG9yIGZyb20gJy4vYmFyY29kZV9sb2NhdG9yJztcbmltcG9ydCBCYXJjb2RlRGVjb2RlciBmcm9tICcuL2JhcmNvZGVfZGVjb2Rlcic7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uZmlnJztcbmltcG9ydCBFdmVudHMgZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IENhbWVyYUFjY2VzcyBmcm9tICcuL2NhbWVyYV9hY2Nlc3MnO1xuaW1wb3J0IEltYWdlRGVidWcgZnJvbSAnLi9pbWFnZV9kZWJ1Zyc7XG5pbXBvcnQge3ZlYzJ9IGZyb20gJ2dsLW1hdHJpeCc7XG5pbXBvcnQgUmVzdWx0Q29sbGVjdG9yIGZyb20gJy4vcmVzdWx0X2NvbGxlY3Rvcic7XG5cbmNvbnN0IG1lcmdlID0gcmVxdWlyZSgnbG9kYXNoL29iamVjdC9tZXJnZScpO1xuY29uc3QgSW5wdXRTdHJlYW0gPSByZXF1aXJlKCdpbnB1dF9zdHJlYW0nKTtcbmNvbnN0IEZyYW1lR3JhYmJlciA9IHJlcXVpcmUoJ2ZyYW1lX2dyYWJiZXInKTtcblxudmFyIF9pbnB1dFN0cmVhbSxcbiAgICBfZnJhbWVncmFiYmVyLFxuICAgIF9zdG9wcGVkLFxuICAgIF9jYW52YXNDb250YWluZXIgPSB7XG4gICAgICAgIGN0eDoge1xuICAgICAgICAgICAgaW1hZ2U6IG51bGwsXG4gICAgICAgICAgICBvdmVybGF5OiBudWxsXG4gICAgICAgIH0sXG4gICAgICAgIGRvbToge1xuICAgICAgICAgICAgaW1hZ2U6IG51bGwsXG4gICAgICAgICAgICBvdmVybGF5OiBudWxsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9pbnB1dEltYWdlV3JhcHBlcixcbiAgICBfYm94U2l6ZSxcbiAgICBfZGVjb2RlcixcbiAgICBfd29ya2VyUG9vbCA9IFtdLFxuICAgIF9vblVJVGhyZWFkID0gdHJ1ZSxcbiAgICBfcmVzdWx0Q29sbGVjdG9yLFxuICAgIF9jb25maWcgPSB7fTtcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZURhdGEoaW1hZ2VXcmFwcGVyKSB7XG4gICAgaW5pdEJ1ZmZlcnMoaW1hZ2VXcmFwcGVyKTtcbiAgICBfZGVjb2RlciA9IEJhcmNvZGVEZWNvZGVyLmNyZWF0ZShfY29uZmlnLmRlY29kZXIsIF9pbnB1dEltYWdlV3JhcHBlcik7XG59XG5cbmZ1bmN0aW9uIGluaXRDb25maWcoKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICB2YXIgdmlzID0gW3tcbiAgICAgICAgICAgIG5vZGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJkaXZbZGF0YS1jb250cm9sc11cIiksXG4gICAgICAgICAgICBwcm9wOiBfY29uZmlnLmNvbnRyb2xzXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5vZGU6IF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXksXG4gICAgICAgICAgICBwcm9wOiBfY29uZmlnLnZpc3VhbC5zaG93XG4gICAgICAgIH1dO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodmlzW2ldLm5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmlzW2ldLnByb3AgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmlzW2ldLm5vZGUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2aXNbaV0ubm9kZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbml0SW5wdXRTdHJlYW0oY2IpIHtcbiAgICB2YXIgdmlkZW87XG4gICAgaWYgKF9jb25maWcuaW5wdXRTdHJlYW0udHlwZSA9PT0gXCJWaWRlb1N0cmVhbVwiKSB7XG4gICAgICAgIHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInZpZGVvXCIpO1xuICAgICAgICBfaW5wdXRTdHJlYW0gPSBJbnB1dFN0cmVhbS5jcmVhdGVWaWRlb1N0cmVhbSh2aWRlbyk7XG4gICAgfSBlbHNlIGlmIChfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09IFwiSW1hZ2VTdHJlYW1cIikge1xuICAgICAgICBfaW5wdXRTdHJlYW0gPSBJbnB1dFN0cmVhbS5jcmVhdGVJbWFnZVN0cmVhbSgpO1xuICAgIH0gZWxzZSBpZiAoX2NvbmZpZy5pbnB1dFN0cmVhbS50eXBlID09PSBcIkxpdmVTdHJlYW1cIikge1xuICAgICAgICB2YXIgJHZpZXdwb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnRlcmFjdGl2ZS52aWV3cG9ydFwiKTtcbiAgICAgICAgaWYgKCR2aWV3cG9ydCkge1xuICAgICAgICAgICAgdmlkZW8gPSAkdmlld3BvcnQucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpO1xuICAgICAgICAgICAgaWYgKCF2aWRlbykge1xuICAgICAgICAgICAgICAgIHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInZpZGVvXCIpO1xuICAgICAgICAgICAgICAgICR2aWV3cG9ydC5hcHBlbmRDaGlsZCh2aWRlbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX2lucHV0U3RyZWFtID0gSW5wdXRTdHJlYW0uY3JlYXRlTGl2ZVN0cmVhbSh2aWRlbyk7XG4gICAgICAgIENhbWVyYUFjY2Vzcy5yZXF1ZXN0KHZpZGVvLCBfY29uZmlnLmlucHV0U3RyZWFtLmNvbnN0cmFpbnRzLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgICAgICAgX2lucHV0U3RyZWFtLnRyaWdnZXIoXCJjYW5yZWNvcmRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfaW5wdXRTdHJlYW0uc2V0QXR0cmlidXRlKFwicHJlbG9hZFwiLCBcImF1dG9cIik7XG4gICAgX2lucHV0U3RyZWFtLnNldEF0dHJpYnV0ZShcImF1dG9wbGF5XCIsIHRydWUpO1xuICAgIF9pbnB1dFN0cmVhbS5zZXRJbnB1dFN0cmVhbShfY29uZmlnLmlucHV0U3RyZWFtKTtcbiAgICBfaW5wdXRTdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcImNhbnJlY29yZFwiLCBjYW5SZWNvcmQuYmluZCh1bmRlZmluZWQsIGNiKSk7XG59XG5cbmZ1bmN0aW9uIGNhblJlY29yZChjYikge1xuICAgIEJhcmNvZGVMb2NhdG9yLmNoZWNrSW1hZ2VDb25zdHJhaW50cyhfaW5wdXRTdHJlYW0sIF9jb25maWcubG9jYXRvcik7XG4gICAgaW5pdENhbnZhcygpO1xuICAgIF9mcmFtZWdyYWJiZXIgPSBGcmFtZUdyYWJiZXIuY3JlYXRlKF9pbnB1dFN0cmVhbSwgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UpO1xuICAgIGluaXRDb25maWcoKTtcblxuICAgIGlmIChfY29uZmlnLm51bU9mV29ya2VycyA+IDApIHtcbiAgICAgICAgaW5pdFdvcmtlcnMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldvcmtlcnMgY3JlYXRlZFwiKTtcbiAgICAgICAgICAgIHJlYWR5KGNiKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaW5pdGlhbGl6ZURhdGEoKTtcbiAgICAgICAgcmVhZHkoY2IpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVhZHkoY2Ipe1xuICAgIF9pbnB1dFN0cmVhbS5wbGF5KCk7XG4gICAgY2IoKTtcbn1cblxuZnVuY3Rpb24gaW5pdENhbnZhcygpIHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHZhciAkdmlld3BvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ludGVyYWN0aXZlLnZpZXdwb3J0XCIpO1xuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjYW52YXMuaW1nQnVmZmVyXCIpO1xuICAgICAgICBpZiAoIV9jYW52YXNDb250YWluZXIuZG9tLmltYWdlKSB7XG4gICAgICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZS5jbGFzc05hbWUgPSBcImltZ0J1ZmZlclwiO1xuICAgICAgICAgICAgaWYgKCR2aWV3cG9ydCAmJiBfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09IFwiSW1hZ2VTdHJlYW1cIikge1xuICAgICAgICAgICAgICAgICR2aWV3cG9ydC5hcHBlbmRDaGlsZChfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5jdHguaW1hZ2UgPSBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZS5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlLndpZHRoID0gX2lucHV0U3RyZWFtLmdldENhbnZhc1NpemUoKS54O1xuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZS5oZWlnaHQgPSBfaW5wdXRTdHJlYW0uZ2V0Q2FudmFzU2l6ZSgpLnk7XG5cbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjYW52YXMuZHJhd2luZ0J1ZmZlclwiKTtcbiAgICAgICAgaWYgKCFfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5KSB7XG4gICAgICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkuY2xhc3NOYW1lID0gXCJkcmF3aW5nQnVmZmVyXCI7XG4gICAgICAgICAgICBpZiAoJHZpZXdwb3J0KSB7XG4gICAgICAgICAgICAgICAgJHZpZXdwb3J0LmFwcGVuZENoaWxkKF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNsZWFyRml4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpO1xuICAgICAgICAgICAgY2xlYXJGaXguc2V0QXR0cmlidXRlKFwiY2xlYXJcIiwgXCJhbGxcIik7XG4gICAgICAgICAgICBpZiAoJHZpZXdwb3J0KSB7XG4gICAgICAgICAgICAgICAgJHZpZXdwb3J0LmFwcGVuZENoaWxkKGNsZWFyRml4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmN0eC5vdmVybGF5ID0gX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheS5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkud2lkdGggPSBfaW5wdXRTdHJlYW0uZ2V0Q2FudmFzU2l6ZSgpLng7XG4gICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkuaGVpZ2h0ID0gX2lucHV0U3RyZWFtLmdldENhbnZhc1NpemUoKS55O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5pdEJ1ZmZlcnMoaW1hZ2VXcmFwcGVyKSB7XG4gICAgaWYgKGltYWdlV3JhcHBlcikge1xuICAgICAgICBfaW5wdXRJbWFnZVdyYXBwZXIgPSBpbWFnZVdyYXBwZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgX2lucHV0SW1hZ2VXcmFwcGVyID0gbmV3IEltYWdlV3JhcHBlcih7XG4gICAgICAgICAgICB4OiBfaW5wdXRTdHJlYW0uZ2V0V2lkdGgoKSxcbiAgICAgICAgICAgIHk6IF9pbnB1dFN0cmVhbS5nZXRIZWlnaHQoKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZSk7XG4gICAgX2JveFNpemUgPSBbXG4gICAgICAgIHZlYzIuY2xvbmUoWzAsIDBdKSxcbiAgICAgICAgdmVjMi5jbG9uZShbMCwgX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUueV0pLFxuICAgICAgICB2ZWMyLmNsb25lKFtfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS54LCBfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS55XSksXG4gICAgICAgIHZlYzIuY2xvbmUoW19pbnB1dEltYWdlV3JhcHBlci5zaXplLngsIDBdKVxuICAgIF07XG4gICAgQmFyY29kZUxvY2F0b3IuaW5pdChfaW5wdXRJbWFnZVdyYXBwZXIsIF9jb25maWcubG9jYXRvcik7XG59XG5cbmZ1bmN0aW9uIGdldEJvdW5kaW5nQm94ZXMoKSB7XG4gICAgaWYgKF9jb25maWcubG9jYXRlKSB7XG4gICAgICAgIHJldHVybiBCYXJjb2RlTG9jYXRvci5sb2NhdGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW1tcbiAgICAgICAgICAgIHZlYzIuY2xvbmUoX2JveFNpemVbMF0pLFxuICAgICAgICAgICAgdmVjMi5jbG9uZShfYm94U2l6ZVsxXSksXG4gICAgICAgICAgICB2ZWMyLmNsb25lKF9ib3hTaXplWzJdKSxcbiAgICAgICAgICAgIHZlYzIuY2xvbmUoX2JveFNpemVbM10pXV07XG4gICAgfVxufVxuXG5mdW5jdGlvbiB0cmFuc2Zvcm1SZXN1bHQocmVzdWx0KSB7XG4gICAgdmFyIHRvcFJpZ2h0ID0gX2lucHV0U3RyZWFtLmdldFRvcFJpZ2h0KCksXG4gICAgICAgIHhPZmZzZXQgPSB0b3BSaWdodC54LFxuICAgICAgICB5T2Zmc2V0ID0gdG9wUmlnaHQueSxcbiAgICAgICAgaTtcblxuICAgIGlmICghcmVzdWx0IHx8ICh4T2Zmc2V0ID09PSAwICYmIHlPZmZzZXQgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cblxuICAgIGlmIChyZXN1bHQubGluZSAmJiByZXN1bHQubGluZS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgbW92ZUxpbmUocmVzdWx0LmxpbmUpO1xuICAgIH1cbiAgICBpZiAocmVzdWx0LmJveGVzICYmIHJlc3VsdC5ib3hlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCByZXN1bHQuYm94ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG1vdmVCb3gocmVzdWx0LmJveGVzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdmVCb3goYm94KSB7XG4gICAgICAgIHZhciBjb3JuZXIgPSBib3gubGVuZ3RoO1xuXG4gICAgICAgIHdoaWxlIChjb3JuZXItLSkge1xuICAgICAgICAgICAgYm94W2Nvcm5lcl1bMF0gKz0geE9mZnNldDtcbiAgICAgICAgICAgIGJveFtjb3JuZXJdWzFdICs9IHlPZmZzZXQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3ZlTGluZShsaW5lKSB7XG4gICAgICAgIGxpbmVbMF0ueCArPSB4T2Zmc2V0O1xuICAgICAgICBsaW5lWzBdLnkgKz0geU9mZnNldDtcbiAgICAgICAgbGluZVsxXS54ICs9IHhPZmZzZXQ7XG4gICAgICAgIGxpbmVbMV0ueSArPSB5T2Zmc2V0O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcHVibGlzaFJlc3VsdChyZXN1bHQsIGltYWdlRGF0YSkge1xuICAgIGlmIChfb25VSVRocmVhZCkge1xuICAgICAgICB0cmFuc2Zvcm1SZXN1bHQocmVzdWx0KTtcbiAgICAgICAgaWYgKGltYWdlRGF0YSAmJiByZXN1bHQgJiYgcmVzdWx0LmNvZGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChfcmVzdWx0Q29sbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgX3Jlc3VsdENvbGxlY3Rvci5hZGRSZXN1bHQoaW1hZ2VEYXRhLCBfaW5wdXRTdHJlYW0uZ2V0Q2FudmFzU2l6ZSgpLCByZXN1bHQuY29kZVJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBFdmVudHMucHVibGlzaChcInByb2Nlc3NlZFwiLCByZXN1bHQpO1xuICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LmNvZGVSZXN1bHQpIHtcbiAgICAgICAgRXZlbnRzLnB1Ymxpc2goXCJkZXRlY3RlZFwiLCByZXN1bHQpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbG9jYXRlQW5kRGVjb2RlKCkge1xuICAgIHZhciByZXN1bHQsXG4gICAgICAgIGJveGVzO1xuXG4gICAgYm94ZXMgPSBnZXRCb3VuZGluZ0JveGVzKCk7XG4gICAgaWYgKGJveGVzKSB7XG4gICAgICAgIHJlc3VsdCA9IF9kZWNvZGVyLmRlY29kZUZyb21Cb3VuZGluZ0JveGVzKGJveGVzKTtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0IHx8IHt9O1xuICAgICAgICByZXN1bHQuYm94ZXMgPSBib3hlcztcbiAgICAgICAgcHVibGlzaFJlc3VsdChyZXN1bHQsIF9pbnB1dEltYWdlV3JhcHBlci5kYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBwdWJsaXNoUmVzdWx0KCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdmFyIGF2YWlsYWJsZVdvcmtlcjtcblxuICAgIGlmIChfb25VSVRocmVhZCkge1xuICAgICAgICBpZiAoX3dvcmtlclBvb2wubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgYXZhaWxhYmxlV29ya2VyID0gX3dvcmtlclBvb2wuZmlsdGVyKGZ1bmN0aW9uKHdvcmtlclRocmVhZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhd29ya2VyVGhyZWFkLmJ1c3k7XG4gICAgICAgICAgICB9KVswXTtcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGVXb3JrZXIpIHtcbiAgICAgICAgICAgICAgICBfZnJhbWVncmFiYmVyLmF0dGFjaERhdGEoYXZhaWxhYmxlV29ya2VyLmltYWdlRGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gYWxsIHdvcmtlcnMgYXJlIGJ1c3lcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9mcmFtZWdyYWJiZXIuYXR0YWNoRGF0YShfaW5wdXRJbWFnZVdyYXBwZXIuZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKF9mcmFtZWdyYWJiZXIuZ3JhYigpKSB7XG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlV29ya2VyKSB7XG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlV29ya2VyLmJ1c3kgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGF2YWlsYWJsZVdvcmtlci53b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBjbWQ6ICdwcm9jZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VEYXRhOiBhdmFpbGFibGVXb3JrZXIuaW1hZ2VEYXRhXG4gICAgICAgICAgICAgICAgfSwgW2F2YWlsYWJsZVdvcmtlci5pbWFnZURhdGEuYnVmZmVyXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvY2F0ZUFuZERlY29kZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbG9jYXRlQW5kRGVjb2RlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzdGFydCgpIHtcbiAgICBfc3RvcHBlZCA9IGZhbHNlO1xuICAgICggZnVuY3Rpb24gZnJhbWUoKSB7XG4gICAgICAgIGlmICghX3N0b3BwZWQpIHtcbiAgICAgICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICAgICAgaWYgKF9vblVJVGhyZWFkICYmIF9jb25maWcuaW5wdXRTdHJlYW0udHlwZSA9PT0gXCJMaXZlU3RyZWFtXCIpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1GcmFtZShmcmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KCkpO1xufVxuXG5mdW5jdGlvbiBpbml0V29ya2VycyhjYikge1xuICAgIHZhciBpO1xuICAgIF93b3JrZXJQb29sID0gW107XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgX2NvbmZpZy5udW1PZldvcmtlcnM7IGkrKykge1xuICAgICAgICBpbml0V29ya2VyKHdvcmtlckluaXRpYWxpemVkKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3b3JrZXJJbml0aWFsaXplZCh3b3JrZXJUaHJlYWQpIHtcbiAgICAgICAgX3dvcmtlclBvb2wucHVzaCh3b3JrZXJUaHJlYWQpO1xuICAgICAgICBpZiAoX3dvcmtlclBvb2wubGVuZ3RoID49IF9jb25maWcubnVtT2ZXb3JrZXJzKXtcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGluaXRXb3JrZXIoY2IpIHtcbiAgICB2YXIgYmxvYlVSTCxcbiAgICAgICAgd29ya2VyVGhyZWFkID0ge1xuICAgICAgICAgICAgd29ya2VyOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBpbWFnZURhdGE6IG5ldyBVaW50OEFycmF5KF9pbnB1dFN0cmVhbS5nZXRXaWR0aCgpICogX2lucHV0U3RyZWFtLmdldEhlaWdodCgpKSxcbiAgICAgICAgICAgIGJ1c3k6IHRydWVcbiAgICAgICAgfTtcblxuICAgIGJsb2JVUkwgPSBnZW5lcmF0ZVdvcmtlckJsb2IoKTtcbiAgICB3b3JrZXJUaHJlYWQud29ya2VyID0gbmV3IFdvcmtlcihibG9iVVJMKTtcblxuICAgIHdvcmtlclRocmVhZC53b3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS5kYXRhLmV2ZW50ID09PSAnaW5pdGlhbGl6ZWQnKSB7XG4gICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGJsb2JVUkwpO1xuICAgICAgICAgICAgd29ya2VyVGhyZWFkLmJ1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgIHdvcmtlclRocmVhZC5pbWFnZURhdGEgPSBuZXcgVWludDhBcnJheShlLmRhdGEuaW1hZ2VEYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV29ya2VyIGluaXRpYWxpemVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGNiKHdvcmtlclRocmVhZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5kYXRhLmV2ZW50ID09PSAncHJvY2Vzc2VkJykge1xuICAgICAgICAgICAgd29ya2VyVGhyZWFkLmltYWdlRGF0YSA9IG5ldyBVaW50OEFycmF5KGUuZGF0YS5pbWFnZURhdGEpO1xuICAgICAgICAgICAgd29ya2VyVGhyZWFkLmJ1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgIHB1Ymxpc2hSZXN1bHQoZS5kYXRhLnJlc3VsdCwgd29ya2VyVGhyZWFkLmltYWdlRGF0YSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5kYXRhLmV2ZW50ID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldvcmtlciBlcnJvcjogXCIgKyBlLmRhdGEubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgd29ya2VyVGhyZWFkLndvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGNtZDogJ2luaXQnLFxuICAgICAgICBzaXplOiB7eDogX2lucHV0U3RyZWFtLmdldFdpZHRoKCksIHk6IF9pbnB1dFN0cmVhbS5nZXRIZWlnaHQoKX0sXG4gICAgICAgIGltYWdlRGF0YTogd29ya2VyVGhyZWFkLmltYWdlRGF0YSxcbiAgICAgICAgY29uZmlnOiBfY29uZmlnXG4gICAgfSwgW3dvcmtlclRocmVhZC5pbWFnZURhdGEuYnVmZmVyXSk7XG59XG5cblxuZnVuY3Rpb24gd29ya2VySW50ZXJmYWNlKGZhY3RvcnkpIHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiovXG4gICAgaWYgKGZhY3RvcnkpIHtcbiAgICAgICAgdmFyIFF1YWdnYSA9IGZhY3RvcnkoKTtcbiAgICAgICAgaWYgKCFRdWFnZ2EpIHtcbiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeydldmVudCc6ICdlcnJvcicsIG1lc3NhZ2U6ICdRdWFnZ2EgY291bGQgbm90IGJlIGNyZWF0ZWQnfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGltYWdlV3JhcHBlcjtcblxuICAgIHNlbGYub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS5kYXRhLmNtZCA9PT0gJ2luaXQnKSB7XG4gICAgICAgICAgICB2YXIgY29uZmlnID0gZS5kYXRhLmNvbmZpZztcbiAgICAgICAgICAgIGNvbmZpZy5udW1PZldvcmtlcnMgPSAwO1xuICAgICAgICAgICAgaW1hZ2VXcmFwcGVyID0gbmV3IFF1YWdnYS5JbWFnZVdyYXBwZXIoe1xuICAgICAgICAgICAgICAgIHg6IGUuZGF0YS5zaXplLngsXG4gICAgICAgICAgICAgICAgeTogZS5kYXRhLnNpemUueVxuICAgICAgICAgICAgfSwgbmV3IFVpbnQ4QXJyYXkoZS5kYXRhLmltYWdlRGF0YSkpO1xuICAgICAgICAgICAgUXVhZ2dhLmluaXQoY29uZmlnLCByZWFkeSwgaW1hZ2VXcmFwcGVyKTtcbiAgICAgICAgICAgIFF1YWdnYS5vblByb2Nlc3NlZChvblByb2Nlc3NlZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5kYXRhLmNtZCA9PT0gJ3Byb2Nlc3MnKSB7XG4gICAgICAgICAgICBpbWFnZVdyYXBwZXIuZGF0YSA9IG5ldyBVaW50OEFycmF5KGUuZGF0YS5pbWFnZURhdGEpO1xuICAgICAgICAgICAgUXVhZ2dhLnN0YXJ0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5kYXRhLmNtZCA9PT0gJ3NldFJlYWRlcnMnKSB7XG4gICAgICAgICAgICBRdWFnZ2Euc2V0UmVhZGVycyhlLmRhdGEucmVhZGVycyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gb25Qcm9jZXNzZWQocmVzdWx0KSB7XG4gICAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgJ2V2ZW50JzogJ3Byb2Nlc3NlZCcsXG4gICAgICAgICAgICBpbWFnZURhdGE6IGltYWdlV3JhcHBlci5kYXRhLFxuICAgICAgICAgICAgcmVzdWx0OiByZXN1bHRcbiAgICAgICAgfSwgW2ltYWdlV3JhcHBlci5kYXRhLmJ1ZmZlcl0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlYWR5KCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeydldmVudCc6ICdpbml0aWFsaXplZCcsIGltYWdlRGF0YTogaW1hZ2VXcmFwcGVyLmRhdGF9LCBbaW1hZ2VXcmFwcGVyLmRhdGEuYnVmZmVyXSk7XG4gICAgfVxuXG4gICAgLyogZXNsaW50LWVuYWJsZSAqL1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVdvcmtlckJsb2IoKSB7XG4gICAgdmFyIGJsb2IsXG4gICAgICAgIGZhY3RvcnlTb3VyY2U7XG5cbiAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4gICAgaWYgKHR5cGVvZiBfX2ZhY3RvcnlTb3VyY2VfXyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZmFjdG9yeVNvdXJjZSA9IF9fZmFjdG9yeVNvdXJjZV9fOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4gICAgfVxuICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG5cbiAgICBibG9iID0gbmV3IEJsb2IoWycoJyArIHdvcmtlckludGVyZmFjZS50b1N0cmluZygpICsgJykoJyArIGZhY3RvcnlTb3VyY2UgKyAnKTsnXSxcbiAgICAgICAge3R5cGU6ICd0ZXh0L2phdmFzY3JpcHQnfSk7XG5cbiAgICByZXR1cm4gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG59XG5cbmZ1bmN0aW9uIHNldFJlYWRlcnMocmVhZGVycykge1xuICAgIGlmIChfZGVjb2Rlcikge1xuICAgICAgICBfZGVjb2Rlci5zZXRSZWFkZXJzKHJlYWRlcnMpO1xuICAgIH0gZWxzZSBpZiAoX29uVUlUaHJlYWQgJiYgX3dvcmtlclBvb2wubGVuZ3RoID4gMCkge1xuICAgICAgICBfd29ya2VyUG9vbC5mb3JFYWNoKGZ1bmN0aW9uKHdvcmtlclRocmVhZCkge1xuICAgICAgICAgICAgd29ya2VyVGhyZWFkLndvcmtlci5wb3N0TWVzc2FnZSh7Y21kOiAnc2V0UmVhZGVycycsIHJlYWRlcnM6IHJlYWRlcnN9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaW5pdDogZnVuY3Rpb24oY29uZmlnLCBjYiwgaW1hZ2VXcmFwcGVyKSB7XG4gICAgICAgIF9jb25maWcgPSBtZXJnZSh7fSwgQ29uZmlnLCBjb25maWcpO1xuICAgICAgICBpZiAoaW1hZ2VXcmFwcGVyKSB7XG4gICAgICAgICAgICBfb25VSVRocmVhZCA9IGZhbHNlO1xuICAgICAgICAgICAgaW5pdGlhbGl6ZURhdGEoaW1hZ2VXcmFwcGVyKTtcbiAgICAgICAgICAgIHJldHVybiBjYigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5pdElucHV0U3RyZWFtKGNiKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBzdGFydCgpO1xuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIF9zdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgX3dvcmtlclBvb2wuZm9yRWFjaChmdW5jdGlvbih3b3JrZXJUaHJlYWQpIHtcbiAgICAgICAgICAgIHdvcmtlclRocmVhZC53b3JrZXIudGVybWluYXRlKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldvcmtlciB0ZXJtaW5hdGVkIVwiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIF93b3JrZXJQb29sLmxlbmd0aCA9IDA7XG4gICAgICAgIGlmIChfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09IFwiTGl2ZVN0cmVhbVwiKSB7XG4gICAgICAgICAgICBDYW1lcmFBY2Nlc3MucmVsZWFzZSgpO1xuICAgICAgICAgICAgX2lucHV0U3RyZWFtLmNsZWFyRXZlbnRIYW5kbGVycygpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBwYXVzZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIF9zdG9wcGVkID0gdHJ1ZTtcbiAgICB9LFxuICAgIG9uRGV0ZWN0ZWQ6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIEV2ZW50cy5zdWJzY3JpYmUoXCJkZXRlY3RlZFwiLCBjYWxsYmFjayk7XG4gICAgfSxcbiAgICBvZmZEZXRlY3RlZDogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgRXZlbnRzLnVuc3Vic2NyaWJlKFwiZGV0ZWN0ZWRcIiwgY2FsbGJhY2spO1xuICAgIH0sXG4gICAgb25Qcm9jZXNzZWQ6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIEV2ZW50cy5zdWJzY3JpYmUoXCJwcm9jZXNzZWRcIiwgY2FsbGJhY2spO1xuICAgIH0sXG4gICAgb2ZmUHJvY2Vzc2VkOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICBFdmVudHMudW5zdWJzY3JpYmUoXCJwcm9jZXNzZWRcIiwgY2FsbGJhY2spO1xuICAgIH0sXG4gICAgc2V0UmVhZGVyczogZnVuY3Rpb24ocmVhZGVycykge1xuICAgICAgICBzZXRSZWFkZXJzKHJlYWRlcnMpO1xuICAgIH0sXG4gICAgcmVnaXN0ZXJSZXN1bHRDb2xsZWN0b3I6IGZ1bmN0aW9uKHJlc3VsdENvbGxlY3Rvcikge1xuICAgICAgICBpZiAocmVzdWx0Q29sbGVjdG9yICYmIHR5cGVvZiByZXN1bHRDb2xsZWN0b3IuYWRkUmVzdWx0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBfcmVzdWx0Q29sbGVjdG9yID0gcmVzdWx0Q29sbGVjdG9yO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjYW52YXM6IF9jYW52YXNDb250YWluZXIsXG4gICAgZGVjb2RlU2luZ2xlOiBmdW5jdGlvbihjb25maWcsIHJlc3VsdENhbGxiYWNrKSB7XG4gICAgICAgIGNvbmZpZyA9IG1lcmdlKHtcbiAgICAgICAgICAgIGlucHV0U3RyZWFtOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJJbWFnZVN0cmVhbVwiLFxuICAgICAgICAgICAgICAgIHNlcXVlbmNlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaXplOiA4MDAsXG4gICAgICAgICAgICAgICAgc3JjOiBjb25maWcuc3JjXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbnVtT2ZXb3JrZXJzOiAxLFxuICAgICAgICAgICAgbG9jYXRvcjoge1xuICAgICAgICAgICAgICAgIGhhbGZTYW1wbGU6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNvbmZpZyk7XG4gICAgICAgIHRoaXMuaW5pdChjb25maWcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgRXZlbnRzLm9uY2UoXCJwcm9jZXNzZWRcIiwgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgX3N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlc3VsdENhbGxiYWNrLmNhbGwobnVsbCwgcmVzdWx0KTtcbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgICAgc3RhcnQoKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBJbWFnZVdyYXBwZXI6IEltYWdlV3JhcHBlcixcbiAgICBJbWFnZURlYnVnOiBJbWFnZURlYnVnLFxuICAgIFJlc3VsdENvbGxlY3RvcjogUmVzdWx0Q29sbGVjdG9yXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcXVhZ2dhLmpzXG4gKiovIiwiLypcbiAqIHR5cGVkZWZzLmpzXG4gKiBOb3JtYWxpemVzIGJyb3dzZXItc3BlY2lmaWMgcHJlZml4ZXNcbiAqL1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoLyogZnVuY3Rpb24gRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgKi8gY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhIHx8XG4gICAgICAgIG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEgfHwgbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3IubXNHZXRVc2VyTWVkaWE7XG4gICAgd2luZG93LlVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTCB8fCB3aW5kb3cubW96VVJMIHx8IHdpbmRvdy5tc1VSTDtcbn1cbk1hdGguaW11bCA9IE1hdGguaW11bCB8fCBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIGFoID0gKGEgPj4+IDE2KSAmIDB4ZmZmZixcbiAgICAgICAgYWwgPSBhICYgMHhmZmZmLFxuICAgICAgICBiaCA9IChiID4+PiAxNikgJiAweGZmZmYsXG4gICAgICAgIGJsID0gYiAmIDB4ZmZmZjtcbiAgICAvLyB0aGUgc2hpZnQgYnkgMCBmaXhlcyB0aGUgc2lnbiBvbiB0aGUgaGlnaCBwYXJ0XG4gICAgLy8gdGhlIGZpbmFsIHwwIGNvbnZlcnRzIHRoZSB1bnNpZ25lZCB2YWx1ZSBpbnRvIGEgc2lnbmVkIHZhbHVlXG4gICAgcmV0dXJuICgoYWwgKiBibCkgKyAoKChhaCAqIGJsICsgYWwgKiBiaCkgPDwgMTYpID4+PiAwKSB8IDApO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3R5cGVkZWZzLmpzXG4gKiovIiwiaW1wb3J0IFN1YkltYWdlIGZyb20gJy4vc3ViSW1hZ2UnO1xuaW1wb3J0IENWVXRpbHMgZnJvbSAnLi9jdl91dGlscyc7XG5pbXBvcnQgQXJyYXlIZWxwZXIgZnJvbSAnLi9hcnJheV9oZWxwZXInO1xuaW1wb3J0IHt2ZWMyfSBmcm9tICdnbC1tYXRyaXgnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBiYXNpYyBpbWFnZSBjb21iaW5pbmcgdGhlIGRhdGEgYW5kIHNpemUuXG4gKiBJbiBhZGRpdGlvbiwgc29tZSBtZXRob2RzIGZvciBtYW5pcHVsYXRpb24gYXJlIGNvbnRhaW5lZC5cbiAqIEBwYXJhbSBzaXplIHt4LHl9IFRoZSBzaXplIG9mIHRoZSBpbWFnZSBpbiBwaXhlbFxuICogQHBhcmFtIGRhdGEge0FycmF5fSBJZiBnaXZlbiwgYSBmbGF0IGFycmF5IGNvbnRhaW5pbmcgdGhlIHBpeGVsIGRhdGFcbiAqIEBwYXJhbSBBcnJheVR5cGUge1R5cGV9IElmIGdpdmVuLCB0aGUgZGVzaXJlZCBEYXRhVHlwZSBvZiB0aGUgQXJyYXkgKG1heSBiZSB0eXBlZC9ub24tdHlwZWQpXG4gKiBAcGFyYW0gaW5pdGlhbGl6ZSB7Qm9vbGVhbn0gSW5kaWNhdGluZyBpZiB0aGUgYXJyYXkgc2hvdWxkIGJlIGluaXRpYWxpemVkIG9uIGNyZWF0aW9uLlxuICogQHJldHVybnMge0ltYWdlV3JhcHBlcn1cbiAqL1xuZnVuY3Rpb24gSW1hZ2VXcmFwcGVyKHNpemUsIGRhdGEsIEFycmF5VHlwZSwgaW5pdGlhbGl6ZSkge1xuICAgIGlmICghZGF0YSkge1xuICAgICAgICBpZiAoQXJyYXlUeXBlKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBuZXcgQXJyYXlUeXBlKHNpemUueCAqIHNpemUueSk7XG4gICAgICAgICAgICBpZiAoQXJyYXlUeXBlID09PSBBcnJheSAmJiBpbml0aWFsaXplKSB7XG4gICAgICAgICAgICAgICAgQXJyYXlIZWxwZXIuaW5pdCh0aGlzLmRhdGEsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZS54ICogc2l6ZS55KTtcbiAgICAgICAgICAgIGlmIChVaW50OEFycmF5ID09PSBBcnJheSAmJiBpbml0aWFsaXplKSB7XG4gICAgICAgICAgICAgICAgQXJyYXlIZWxwZXIuaW5pdCh0aGlzLmRhdGEsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB9XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbn1cblxuLyoqXG4gKiB0ZXN0cyBpZiBhIHBvc2l0aW9uIGlzIHdpdGhpbiB0aGUgaW1hZ2Ugd2l0aCBhIGdpdmVuIG9mZnNldFxuICogQHBhcmFtIGltZ1JlZiB7eCwgeX0gVGhlIGxvY2F0aW9uIHRvIHRlc3RcbiAqIEBwYXJhbSBib3JkZXIgTnVtYmVyIHRoZSBwYWRkaW5nIHZhbHVlIGluIHBpeGVsXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpZiBsb2NhdGlvbiBpbnNpZGUgdGhlIGltYWdlJ3MgYm9yZGVyLCBmYWxzZSBvdGhlcndpc2VcbiAqIEBzZWUgY3ZkL2ltYWdlLmhcbiAqL1xuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5pbkltYWdlV2l0aEJvcmRlciA9IGZ1bmN0aW9uKGltZ1JlZiwgYm9yZGVyKSB7XG4gICAgcmV0dXJuIChpbWdSZWYueCA+PSBib3JkZXIpXG4gICAgICAgICYmIChpbWdSZWYueSA+PSBib3JkZXIpXG4gICAgICAgICYmIChpbWdSZWYueCA8ICh0aGlzLnNpemUueCAtIGJvcmRlcikpXG4gICAgICAgICYmIChpbWdSZWYueSA8ICh0aGlzLnNpemUueSAtIGJvcmRlcikpO1xufTtcblxuLyoqXG4gKiBQZXJmb3JtcyBiaWxpbmVhciBzYW1wbGluZ1xuICogQHBhcmFtIGluSW1nIEltYWdlIHRvIGV4dHJhY3Qgc2FtcGxlIGZyb21cbiAqIEBwYXJhbSB4IHRoZSB4LWNvb3JkaW5hdGVcbiAqIEBwYXJhbSB5IHRoZSB5LWNvb3JkaW5hdGVcbiAqIEByZXR1cm5zIHRoZSBzYW1wbGVkIHZhbHVlXG4gKiBAc2VlIGN2ZC92aXNpb24uaFxuICovXG5JbWFnZVdyYXBwZXIuc2FtcGxlID0gZnVuY3Rpb24oaW5JbWcsIHgsIHkpIHtcbiAgICB2YXIgbHggPSBNYXRoLmZsb29yKHgpO1xuICAgIHZhciBseSA9IE1hdGguZmxvb3IoeSk7XG4gICAgdmFyIHcgPSBpbkltZy5zaXplLng7XG4gICAgdmFyIGJhc2UgPSBseSAqIGluSW1nLnNpemUueCArIGx4O1xuICAgIHZhciBhID0gaW5JbWcuZGF0YVtiYXNlICsgMF07XG4gICAgdmFyIGIgPSBpbkltZy5kYXRhW2Jhc2UgKyAxXTtcbiAgICB2YXIgYyA9IGluSW1nLmRhdGFbYmFzZSArIHddO1xuICAgIHZhciBkID0gaW5JbWcuZGF0YVtiYXNlICsgdyArIDFdO1xuICAgIHZhciBlID0gYSAtIGI7XG4gICAgeCAtPSBseDtcbiAgICB5IC09IGx5O1xuXG4gICAgdmFyIHJlc3VsdCA9IE1hdGguZmxvb3IoeCAqICh5ICogKGUgLSBjICsgZCkgLSBlKSArIHkgKiAoYyAtIGEpICsgYSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYSBnaXZlbiBhcnJheS4gU2V0cyBlYWNoIGVsZW1lbnQgdG8gemVyby5cbiAqIEBwYXJhbSBhcnJheSB7QXJyYXl9IFRoZSBhcnJheSB0byBpbml0aWFsaXplXG4gKi9cbkltYWdlV3JhcHBlci5jbGVhckFycmF5ID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICB2YXIgbCA9IGFycmF5Lmxlbmd0aDtcbiAgICB3aGlsZSAobC0tKSB7XG4gICAgICAgIGFycmF5W2xdID0gMDtcbiAgICB9XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSB7U3ViSW1hZ2V9IGZyb20gdGhlIGN1cnJlbnQgaW1hZ2UgKHt0aGlzfSkuXG4gKiBAcGFyYW0gZnJvbSB7SW1hZ2VSZWZ9IFRoZSBwb3NpdGlvbiB3aGVyZSB0byBzdGFydCB0aGUge1N1YkltYWdlfSBmcm9tLiAodG9wLWxlZnQgY29ybmVyKVxuICogQHBhcmFtIHNpemUge0ltYWdlUmVmfSBUaGUgc2l6ZSBvZiB0aGUgcmVzdWx0aW5nIGltYWdlXG4gKiBAcmV0dXJucyB7U3ViSW1hZ2V9IEEgc2hhcmVkIHBhcnQgb2YgdGhlIG9yaWdpbmFsIGltYWdlXG4gKi9cbkltYWdlV3JhcHBlci5wcm90b3R5cGUuc3ViSW1hZ2UgPSBmdW5jdGlvbihmcm9tLCBzaXplKSB7XG4gICAgcmV0dXJuIG5ldyBTdWJJbWFnZShmcm9tLCBzaXplLCB0aGlzKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhbiB7SW1hZ2VXcmFwcGVyKSBhbmQgY29waWVzIHRoZSBuZWVkZWQgdW5kZXJseWluZyBpbWFnZS1kYXRhIGFyZWFcbiAqIEBwYXJhbSBpbWFnZVdyYXBwZXIge0ltYWdlV3JhcHBlcn0gVGhlIHRhcmdldCB7SW1hZ2VXcmFwcGVyfSB3aGVyZSB0aGUgZGF0YSBzaG91bGQgYmUgY29waWVkXG4gKiBAcGFyYW0gZnJvbSB7SW1hZ2VSZWZ9IFRoZSBsb2NhdGlvbiB3aGVyZSB0byBjb3B5IGZyb20gKHRvcC1sZWZ0IGxvY2F0aW9uKVxuICovXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLnN1YkltYWdlQXNDb3B5ID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCBmcm9tKSB7XG4gICAgdmFyIHNpemVZID0gaW1hZ2VXcmFwcGVyLnNpemUueSwgc2l6ZVggPSBpbWFnZVdyYXBwZXIuc2l6ZS54O1xuICAgIHZhciB4LCB5O1xuICAgIGZvciAoIHggPSAwOyB4IDwgc2l6ZVg7IHgrKykge1xuICAgICAgICBmb3IgKCB5ID0gMDsgeSA8IHNpemVZOyB5KyspIHtcbiAgICAgICAgICAgIGltYWdlV3JhcHBlci5kYXRhW3kgKiBzaXplWCArIHhdID0gdGhpcy5kYXRhWyhmcm9tLnkgKyB5KSAqIHRoaXMuc2l6ZS54ICsgZnJvbS54ICsgeF07XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLmNvcHlUbyA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlcikge1xuICAgIHZhciBsZW5ndGggPSB0aGlzLmRhdGEubGVuZ3RoLCBzcmNEYXRhID0gdGhpcy5kYXRhLCBkc3REYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGE7XG5cbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgZHN0RGF0YVtsZW5ndGhdID0gc3JjRGF0YVtsZW5ndGhdO1xuICAgIH1cbn07XG5cbi8qKlxuICogUmV0cmlldmVzIGEgZ2l2ZW4gcGl4ZWwgcG9zaXRpb24gZnJvbSB0aGUgaW1hZ2VcbiAqIEBwYXJhbSB4IHtOdW1iZXJ9IFRoZSB4LXBvc2l0aW9uXG4gKiBAcGFyYW0geSB7TnVtYmVyfSBUaGUgeS1wb3NpdGlvblxuICogQHJldHVybnMge051bWJlcn0gVGhlIGdyYXlzY2FsZSB2YWx1ZSBhdCB0aGUgcGl4ZWwtcG9zaXRpb25cbiAqL1xuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVt5ICogdGhpcy5zaXplLnggKyB4XTtcbn07XG5cbi8qKlxuICogUmV0cmlldmVzIGEgZ2l2ZW4gcGl4ZWwgcG9zaXRpb24gZnJvbSB0aGUgaW1hZ2VcbiAqIEBwYXJhbSB4IHtOdW1iZXJ9IFRoZSB4LXBvc2l0aW9uXG4gKiBAcGFyYW0geSB7TnVtYmVyfSBUaGUgeS1wb3NpdGlvblxuICogQHJldHVybnMge051bWJlcn0gVGhlIGdyYXlzY2FsZSB2YWx1ZSBhdCB0aGUgcGl4ZWwtcG9zaXRpb25cbiAqL1xuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5nZXRTYWZlID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIHZhciBpO1xuXG4gICAgaWYgKCF0aGlzLmluZGV4TWFwcGluZykge1xuICAgICAgICB0aGlzLmluZGV4TWFwcGluZyA9IHtcbiAgICAgICAgICAgIHg6IFtdLFxuICAgICAgICAgICAgeTogW11cbiAgICAgICAgfTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuc2l6ZS54OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuaW5kZXhNYXBwaW5nLnhbaV0gPSBpO1xuICAgICAgICAgICAgdGhpcy5pbmRleE1hcHBpbmcueFtpICsgdGhpcy5zaXplLnhdID0gaTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5zaXplLnk7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5pbmRleE1hcHBpbmcueVtpXSA9IGk7XG4gICAgICAgICAgICB0aGlzLmluZGV4TWFwcGluZy55W2kgKyB0aGlzLnNpemUueV0gPSBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRhdGFbKHRoaXMuaW5kZXhNYXBwaW5nLnlbeSArIHRoaXMuc2l6ZS55XSkgKiB0aGlzLnNpemUueCArIHRoaXMuaW5kZXhNYXBwaW5nLnhbeCArIHRoaXMuc2l6ZS54XV07XG59O1xuXG4vKipcbiAqIFNldHMgYSBnaXZlbiBwaXhlbCBwb3NpdGlvbiBpbiB0aGUgaW1hZ2VcbiAqIEBwYXJhbSB4IHtOdW1iZXJ9IFRoZSB4LXBvc2l0aW9uXG4gKiBAcGFyYW0geSB7TnVtYmVyfSBUaGUgeS1wb3NpdGlvblxuICogQHBhcmFtIHZhbHVlIHtOdW1iZXJ9IFRoZSBncmF5c2NhbGUgdmFsdWUgdG8gc2V0XG4gKiBAcmV0dXJucyB7SW1hZ2VXcmFwcGVyfSBUaGUgSW1hZ2UgaXRzZWxmIChmb3IgcG9zc2libGUgY2hhaW5pbmcpXG4gKi9cbkltYWdlV3JhcHBlci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24oeCwgeSwgdmFsdWUpIHtcbiAgICB0aGlzLmRhdGFbeSAqIHRoaXMuc2l6ZS54ICsgeF0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgYm9yZGVyIG9mIHRoZSBpbWFnZSAoMSBwaXhlbCkgdG8gemVyb1xuICovXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLnplcm9Cb3JkZXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaSwgd2lkdGggPSB0aGlzLnNpemUueCwgaGVpZ2h0ID0gdGhpcy5zaXplLnksIGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgZm9yICggaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICAgIGRhdGFbaV0gPSBkYXRhWyhoZWlnaHQgLSAxKSAqIHdpZHRoICsgaV0gPSAwO1xuICAgIH1cbiAgICBmb3IgKCBpID0gMTsgaSA8IGhlaWdodCAtIDE7IGkrKykge1xuICAgICAgICBkYXRhW2kgKiB3aWR0aF0gPSBkYXRhW2kgKiB3aWR0aCArICh3aWR0aCAtIDEpXSA9IDA7XG4gICAgfVxufTtcblxuLyoqXG4gKiBJbnZlcnRzIGEgYmluYXJ5IGltYWdlIGluIHBsYWNlXG4gKi9cbkltYWdlV3JhcHBlci5wcm90b3R5cGUuaW52ZXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRhdGEgPSB0aGlzLmRhdGEsIGxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIGRhdGFbbGVuZ3RoXSA9IGRhdGFbbGVuZ3RoXSA/IDAgOiAxO1xuICAgIH1cbn07XG5cbkltYWdlV3JhcHBlci5wcm90b3R5cGUuY29udm9sdmUgPSBmdW5jdGlvbihrZXJuZWwpIHtcbiAgICB2YXIgeCwgeSwga3gsIGt5LCBrU2l6ZSA9IChrZXJuZWwubGVuZ3RoIC8gMikgfCAwLCBhY2N1ID0gMDtcbiAgICBmb3IgKCB5ID0gMDsgeSA8IHRoaXMuc2l6ZS55OyB5KyspIHtcbiAgICAgICAgZm9yICggeCA9IDA7IHggPCB0aGlzLnNpemUueDsgeCsrKSB7XG4gICAgICAgICAgICBhY2N1ID0gMDtcbiAgICAgICAgICAgIGZvciAoIGt5ID0gLWtTaXplOyBreSA8PSBrU2l6ZTsga3krKykge1xuICAgICAgICAgICAgICAgIGZvciAoIGt4ID0gLWtTaXplOyBreCA8PSBrU2l6ZTsga3grKykge1xuICAgICAgICAgICAgICAgICAgICBhY2N1ICs9IGtlcm5lbFtreSArIGtTaXplXVtreCArIGtTaXplXSAqIHRoaXMuZ2V0U2FmZSh4ICsga3gsIHkgKyBreSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kYXRhW3kgKiB0aGlzLnNpemUueCArIHhdID0gYWNjdTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbkltYWdlV3JhcHBlci5wcm90b3R5cGUubW9tZW50cyA9IGZ1bmN0aW9uKGxhYmVsY291bnQpIHtcbiAgICB2YXIgZGF0YSA9IHRoaXMuZGF0YSxcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgaGVpZ2h0ID0gdGhpcy5zaXplLnksXG4gICAgICAgIHdpZHRoID0gdGhpcy5zaXplLngsXG4gICAgICAgIHZhbCxcbiAgICAgICAgeXNxLFxuICAgICAgICBsYWJlbHN1bSA9IFtdLFxuICAgICAgICBpLFxuICAgICAgICBsYWJlbCxcbiAgICAgICAgbXUxMSxcbiAgICAgICAgbXUwMixcbiAgICAgICAgbXUyMCxcbiAgICAgICAgeF8sXG4gICAgICAgIHlfLFxuICAgICAgICB0bXAsXG4gICAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgICBQSSA9IE1hdGguUEksXG4gICAgICAgIFBJXzQgPSBQSSAvIDQ7XG5cbiAgICBpZiAobGFiZWxjb3VudCA8PSAwKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZm9yICggaSA9IDA7IGkgPCBsYWJlbGNvdW50OyBpKyspIHtcbiAgICAgICAgbGFiZWxzdW1baV0gPSB7XG4gICAgICAgICAgICBtMDA6IDAsXG4gICAgICAgICAgICBtMDE6IDAsXG4gICAgICAgICAgICBtMTA6IDAsXG4gICAgICAgICAgICBtMTE6IDAsXG4gICAgICAgICAgICBtMDI6IDAsXG4gICAgICAgICAgICBtMjA6IDAsXG4gICAgICAgICAgICB0aGV0YTogMCxcbiAgICAgICAgICAgIHJhZDogMFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZvciAoIHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgeXNxID0geSAqIHk7XG4gICAgICAgIGZvciAoIHggPSAwOyB4IDwgd2lkdGg7IHgrKykge1xuICAgICAgICAgICAgdmFsID0gZGF0YVt5ICogd2lkdGggKyB4XTtcbiAgICAgICAgICAgIGlmICh2YWwgPiAwKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSBsYWJlbHN1bVt2YWwgLSAxXTtcbiAgICAgICAgICAgICAgICBsYWJlbC5tMDAgKz0gMTtcbiAgICAgICAgICAgICAgICBsYWJlbC5tMDEgKz0geTtcbiAgICAgICAgICAgICAgICBsYWJlbC5tMTAgKz0geDtcbiAgICAgICAgICAgICAgICBsYWJlbC5tMTEgKz0geCAqIHk7XG4gICAgICAgICAgICAgICAgbGFiZWwubTAyICs9IHlzcTtcbiAgICAgICAgICAgICAgICBsYWJlbC5tMjAgKz0geCAqIHg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8IGxhYmVsY291bnQ7IGkrKykge1xuICAgICAgICBsYWJlbCA9IGxhYmVsc3VtW2ldO1xuICAgICAgICBpZiAoIWlzTmFOKGxhYmVsLm0wMCkgJiYgbGFiZWwubTAwICE9PSAwKSB7XG4gICAgICAgICAgICB4XyA9IGxhYmVsLm0xMCAvIGxhYmVsLm0wMDtcbiAgICAgICAgICAgIHlfID0gbGFiZWwubTAxIC8gbGFiZWwubTAwO1xuICAgICAgICAgICAgbXUxMSA9IGxhYmVsLm0xMSAvIGxhYmVsLm0wMCAtIHhfICogeV87XG4gICAgICAgICAgICBtdTAyID0gbGFiZWwubTAyIC8gbGFiZWwubTAwIC0geV8gKiB5XztcbiAgICAgICAgICAgIG11MjAgPSBsYWJlbC5tMjAgLyBsYWJlbC5tMDAgLSB4XyAqIHhfO1xuICAgICAgICAgICAgdG1wID0gKG11MDIgLSBtdTIwKSAvICgyICogbXUxMSk7XG4gICAgICAgICAgICB0bXAgPSAwLjUgKiBNYXRoLmF0YW4odG1wKSArIChtdTExID49IDAgPyBQSV80IDogLVBJXzQgKSArIFBJO1xuICAgICAgICAgICAgbGFiZWwudGhldGEgPSAodG1wICogMTgwIC8gUEkgKyA5MCkgJSAxODAgLSA5MDtcbiAgICAgICAgICAgIGlmIChsYWJlbC50aGV0YSA8IDApIHtcbiAgICAgICAgICAgICAgICBsYWJlbC50aGV0YSArPSAxODA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYWJlbC5yYWQgPSB0bXAgPiBQSSA/IHRtcCAtIFBJIDogdG1wO1xuICAgICAgICAgICAgbGFiZWwudmVjID0gdmVjMi5jbG9uZShbTWF0aC5jb3ModG1wKSwgTWF0aC5zaW4odG1wKV0pO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gobGFiZWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogRGlzcGxheXMgdGhlIHtJbWFnZVdyYXBwZXJ9IGluIGEgZ2l2ZW4gY2FudmFzXG4gKiBAcGFyYW0gY2FudmFzIHtDYW52YXN9IFRoZSBjYW52YXMgZWxlbWVudCB0byB3cml0ZSB0b1xuICogQHBhcmFtIHNjYWxlIHtOdW1iZXJ9IFNjYWxlIHdoaWNoIGlzIGFwcGxpZWQgdG8gZWFjaCBwaXhlbC12YWx1ZVxuICovXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbihjYW52YXMsIHNjYWxlKSB7XG4gICAgdmFyIGN0eCxcbiAgICAgICAgZnJhbWUsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGN1cnJlbnQsXG4gICAgICAgIHBpeGVsLFxuICAgICAgICB4LFxuICAgICAgICB5O1xuXG4gICAgaWYgKCFzY2FsZSkge1xuICAgICAgICBzY2FsZSA9IDEuMDtcbiAgICB9XG4gICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgY2FudmFzLndpZHRoID0gdGhpcy5zaXplLng7XG4gICAgY2FudmFzLmhlaWdodCA9IHRoaXMuc2l6ZS55O1xuICAgIGZyYW1lID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGRhdGEgPSBmcmFtZS5kYXRhO1xuICAgIGN1cnJlbnQgPSAwO1xuICAgIGZvciAoeSA9IDA7IHkgPCB0aGlzLnNpemUueTsgeSsrKSB7XG4gICAgICAgIGZvciAoeCA9IDA7IHggPCB0aGlzLnNpemUueDsgeCsrKSB7XG4gICAgICAgICAgICBwaXhlbCA9IHkgKiB0aGlzLnNpemUueCArIHg7XG4gICAgICAgICAgICBjdXJyZW50ID0gdGhpcy5nZXQoeCwgeSkgKiBzY2FsZTtcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMF0gPSBjdXJyZW50O1xuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAxXSA9IGN1cnJlbnQ7XG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDJdID0gY3VycmVudDtcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgM10gPSAyNTU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9mcmFtZS5kYXRhID0gZGF0YTtcbiAgICBjdHgucHV0SW1hZ2VEYXRhKGZyYW1lLCAwLCAwKTtcbn07XG5cbi8qKlxuICogRGlzcGxheXMgdGhlIHtTdWJJbWFnZX0gaW4gYSBnaXZlbiBjYW52YXNcbiAqIEBwYXJhbSBjYW52YXMge0NhbnZhc30gVGhlIGNhbnZhcyBlbGVtZW50IHRvIHdyaXRlIHRvXG4gKiBAcGFyYW0gc2NhbGUge051bWJlcn0gU2NhbGUgd2hpY2ggaXMgYXBwbGllZCB0byBlYWNoIHBpeGVsLXZhbHVlXG4gKi9cbkltYWdlV3JhcHBlci5wcm90b3R5cGUub3ZlcmxheSA9IGZ1bmN0aW9uKGNhbnZhcywgc2NhbGUsIGZyb20pIHtcbiAgICBpZiAoIXNjYWxlIHx8IHNjYWxlIDwgMCB8fCBzY2FsZSA+IDM2MCkge1xuICAgICAgICBzY2FsZSA9IDM2MDtcbiAgICB9XG4gICAgdmFyIGhzdiA9IFswLCAxLCAxXTtcbiAgICB2YXIgcmdiID0gWzAsIDAsIDBdO1xuICAgIHZhciB3aGl0ZVJnYiA9IFsyNTUsIDI1NSwgMjU1XTtcbiAgICB2YXIgYmxhY2tSZ2IgPSBbMCwgMCwgMF07XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB2YXIgZnJhbWUgPSBjdHguZ2V0SW1hZ2VEYXRhKGZyb20ueCwgZnJvbS55LCB0aGlzLnNpemUueCwgdGhpcy5zaXplLnkpO1xuICAgIHZhciBkYXRhID0gZnJhbWUuZGF0YTtcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5kYXRhLmxlbmd0aDtcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgaHN2WzBdID0gdGhpcy5kYXRhW2xlbmd0aF0gKiBzY2FsZTtcbiAgICAgICAgcmVzdWx0ID0gaHN2WzBdIDw9IDAgPyB3aGl0ZVJnYiA6IGhzdlswXSA+PSAzNjAgPyBibGFja1JnYiA6IENWVXRpbHMuaHN2MnJnYihoc3YsIHJnYik7XG4gICAgICAgIGRhdGFbbGVuZ3RoICogNCArIDBdID0gcmVzdWx0WzBdO1xuICAgICAgICBkYXRhW2xlbmd0aCAqIDQgKyAxXSA9IHJlc3VsdFsxXTtcbiAgICAgICAgZGF0YVtsZW5ndGggKiA0ICsgMl0gPSByZXN1bHRbMl07XG4gICAgICAgIGRhdGFbbGVuZ3RoICogNCArIDNdID0gMjU1O1xuICAgIH1cbiAgICBjdHgucHV0SW1hZ2VEYXRhKGZyYW1lLCBmcm9tLngsIGZyb20ueSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbWFnZVdyYXBwZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbWFnZV93cmFwcGVyLmpzXG4gKiovIiwiLyoqXG4gKiBDb25zdHJ1Y3QgcmVwcmVzZW50aW5nIGEgcGFydCBvZiBhbm90aGVyIHtJbWFnZVdyYXBwZXJ9LiBTaGFyZXMgZGF0YVxuICogYmV0d2VlbiB0aGUgcGFyZW50IGFuZCB0aGUgY2hpbGQuXG4gKiBAcGFyYW0gZnJvbSB7SW1hZ2VSZWZ9IFRoZSBwb3NpdGlvbiB3aGVyZSB0byBzdGFydCB0aGUge1N1YkltYWdlfSBmcm9tLiAodG9wLWxlZnQgY29ybmVyKVxuICogQHBhcmFtIHNpemUge0ltYWdlUmVmfSBUaGUgc2l6ZSBvZiB0aGUgcmVzdWx0aW5nIGltYWdlXG4gKiBAcGFyYW0gSSB7SW1hZ2VXcmFwcGVyfSBUaGUge0ltYWdlV3JhcHBlcn0gdG8gc2hhcmUgZnJvbVxuICogQHJldHVybnMge1N1YkltYWdlfSBBIHNoYXJlZCBwYXJ0IG9mIHRoZSBvcmlnaW5hbCBpbWFnZVxuICovXG5mdW5jdGlvbiBTdWJJbWFnZShmcm9tLCBzaXplLCBJKSB7XG4gICAgaWYgKCFJKSB7XG4gICAgICAgIEkgPSB7XG4gICAgICAgICAgICBkYXRhOiBudWxsLFxuICAgICAgICAgICAgc2l6ZTogc2l6ZVxuICAgICAgICB9O1xuICAgIH1cbiAgICB0aGlzLmRhdGEgPSBJLmRhdGE7XG4gICAgdGhpcy5vcmlnaW5hbFNpemUgPSBJLnNpemU7XG4gICAgdGhpcy5JID0gSTtcblxuICAgIHRoaXMuZnJvbSA9IGZyb207XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbn1cblxuLyoqXG4gKiBEaXNwbGF5cyB0aGUge1N1YkltYWdlfSBpbiBhIGdpdmVuIGNhbnZhc1xuICogQHBhcmFtIGNhbnZhcyB7Q2FudmFzfSBUaGUgY2FudmFzIGVsZW1lbnQgdG8gd3JpdGUgdG9cbiAqIEBwYXJhbSBzY2FsZSB7TnVtYmVyfSBTY2FsZSB3aGljaCBpcyBhcHBsaWVkIHRvIGVhY2ggcGl4ZWwtdmFsdWVcbiAqL1xuU3ViSW1hZ2UucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbihjYW52YXMsIHNjYWxlKSB7XG4gICAgdmFyIGN0eCxcbiAgICAgICAgZnJhbWUsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGN1cnJlbnQsXG4gICAgICAgIHksXG4gICAgICAgIHgsXG4gICAgICAgIHBpeGVsO1xuXG4gICAgaWYgKCFzY2FsZSkge1xuICAgICAgICBzY2FsZSA9IDEuMDtcbiAgICB9XG4gICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgY2FudmFzLndpZHRoID0gdGhpcy5zaXplLng7XG4gICAgY2FudmFzLmhlaWdodCA9IHRoaXMuc2l6ZS55O1xuICAgIGZyYW1lID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGRhdGEgPSBmcmFtZS5kYXRhO1xuICAgIGN1cnJlbnQgPSAwO1xuICAgIGZvciAoeSA9IDA7IHkgPCB0aGlzLnNpemUueTsgeSsrKSB7XG4gICAgICAgIGZvciAoeCA9IDA7IHggPCB0aGlzLnNpemUueDsgeCsrKSB7XG4gICAgICAgICAgICBwaXhlbCA9IHkgKiB0aGlzLnNpemUueCArIHg7XG4gICAgICAgICAgICBjdXJyZW50ID0gdGhpcy5nZXQoeCwgeSkgKiBzY2FsZTtcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMF0gPSBjdXJyZW50O1xuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAxXSA9IGN1cnJlbnQ7XG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDJdID0gY3VycmVudDtcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgM10gPSAyNTU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnJhbWUuZGF0YSA9IGRhdGE7XG4gICAgY3R4LnB1dEltYWdlRGF0YShmcmFtZSwgMCwgMCk7XG59O1xuXG4vKipcbiAqIFJldHJpZXZlcyBhIGdpdmVuIHBpeGVsIHBvc2l0aW9uIGZyb20gdGhlIHtTdWJJbWFnZX1cbiAqIEBwYXJhbSB4IHtOdW1iZXJ9IFRoZSB4LXBvc2l0aW9uXG4gKiBAcGFyYW0geSB7TnVtYmVyfSBUaGUgeS1wb3NpdGlvblxuICogQHJldHVybnMge051bWJlcn0gVGhlIGdyYXlzY2FsZSB2YWx1ZSBhdCB0aGUgcGl4ZWwtcG9zaXRpb25cbiAqL1xuU3ViSW1hZ2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhWyh0aGlzLmZyb20ueSArIHkpICogdGhpcy5vcmlnaW5hbFNpemUueCArIHRoaXMuZnJvbS54ICsgeF07XG59O1xuXG4vKipcbiAqIFVwZGF0ZXMgdGhlIHVuZGVybHlpbmcgZGF0YSBmcm9tIGEgZ2l2ZW4ge0ltYWdlV3JhcHBlcn1cbiAqIEBwYXJhbSBpbWFnZSB7SW1hZ2VXcmFwcGVyfSBUaGUgdXBkYXRlZCBpbWFnZVxuICovXG5TdWJJbWFnZS5wcm90b3R5cGUudXBkYXRlRGF0YSA9IGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgdGhpcy5vcmlnaW5hbFNpemUgPSBpbWFnZS5zaXplO1xuICAgIHRoaXMuZGF0YSA9IGltYWdlLmRhdGE7XG59O1xuXG4vKipcbiAqIFVwZGF0ZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBzaGFyZWQgYXJlYVxuICogQHBhcmFtIGZyb20ge3gseX0gVGhlIG5ldyBsb2NhdGlvblxuICogQHJldHVybnMge1N1YkltYWdlfSByZXR1cm5zIHt0aGlzfSBmb3IgcG9zc2libGUgY2hhaW5pbmdcbiAqL1xuU3ViSW1hZ2UucHJvdG90eXBlLnVwZGF0ZUZyb20gPSBmdW5jdGlvbihmcm9tKSB7XG4gICAgdGhpcy5mcm9tID0gZnJvbTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IChTdWJJbWFnZSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zdWJJbWFnZS5qc1xuICoqLyIsImltcG9ydCBDbHVzdGVyMiBmcm9tICcuL2NsdXN0ZXInO1xuaW1wb3J0IEFycmF5SGVscGVyIGZyb20gJy4vYXJyYXlfaGVscGVyJztcbmltcG9ydCB7dmVjMiwgdmVjM30gZnJvbSAnZ2wtbWF0cml4JztcblxudmFyIENWVXRpbHMgPSB7fTtcblxuLyoqXG4gKiBAcGFyYW0geCB4LWNvb3JkaW5hdGVcbiAqIEBwYXJhbSB5IHktY29vcmRpbmF0ZVxuICogQHJldHVybiBJbWFnZVJlZmVyZW5jZSB7eCx5fSBDb29yZGluYXRlXG4gKi9cbkNWVXRpbHMuaW1hZ2VSZWYgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgdmFyIHRoYXQgPSB7XG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHksXG4gICAgICAgIHRvVmVjMjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdmVjMi5jbG9uZShbdGhpcy54LCB0aGlzLnldKTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9WZWMzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB2ZWMzLmNsb25lKFt0aGlzLngsIHRoaXMueSwgMV0pO1xuICAgICAgICB9LFxuICAgICAgICByb3VuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnggPSB0aGlzLnggPiAwLjAgPyBNYXRoLmZsb29yKHRoaXMueCArIDAuNSkgOiBNYXRoLmZsb29yKHRoaXMueCAtIDAuNSk7XG4gICAgICAgICAgICB0aGlzLnkgPSB0aGlzLnkgPiAwLjAgPyBNYXRoLmZsb29yKHRoaXMueSArIDAuNSkgOiBNYXRoLmZsb29yKHRoaXMueSAtIDAuNSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG4vKipcbiAqIENvbXB1dGVzIGFuIGludGVncmFsIGltYWdlIG9mIGEgZ2l2ZW4gZ3JheXNjYWxlIGltYWdlLlxuICogQHBhcmFtIGltYWdlRGF0YUNvbnRhaW5lciB7SW1hZ2VEYXRhQ29udGFpbmVyfSB0aGUgaW1hZ2UgdG8gYmUgaW50ZWdyYXRlZFxuICovXG5DVlV0aWxzLmNvbXB1dGVJbnRlZ3JhbEltYWdlMiA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgaW50ZWdyYWxXcmFwcGVyKSB7XG4gICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhO1xuICAgIHZhciB3aWR0aCA9IGltYWdlV3JhcHBlci5zaXplLng7XG4gICAgdmFyIGhlaWdodCA9IGltYWdlV3JhcHBlci5zaXplLnk7XG4gICAgdmFyIGludGVncmFsSW1hZ2VEYXRhID0gaW50ZWdyYWxXcmFwcGVyLmRhdGE7XG4gICAgdmFyIHN1bSA9IDAsIHBvc0EgPSAwLCBwb3NCID0gMCwgcG9zQyA9IDAsIHBvc0QgPSAwLCB4LCB5O1xuXG4gICAgLy8gc3VtIHVwIGZpcnN0IGNvbHVtblxuICAgIHBvc0IgPSB3aWR0aDtcbiAgICBzdW0gPSAwO1xuICAgIGZvciAoIHkgPSAxOyB5IDwgaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgc3VtICs9IGltYWdlRGF0YVtwb3NBXTtcbiAgICAgICAgaW50ZWdyYWxJbWFnZURhdGFbcG9zQl0gKz0gc3VtO1xuICAgICAgICBwb3NBICs9IHdpZHRoO1xuICAgICAgICBwb3NCICs9IHdpZHRoO1xuICAgIH1cblxuICAgIHBvc0EgPSAwO1xuICAgIHBvc0IgPSAxO1xuICAgIHN1bSA9IDA7XG4gICAgZm9yICggeCA9IDE7IHggPCB3aWR0aDsgeCsrKSB7XG4gICAgICAgIHN1bSArPSBpbWFnZURhdGFbcG9zQV07XG4gICAgICAgIGludGVncmFsSW1hZ2VEYXRhW3Bvc0JdICs9IHN1bTtcbiAgICAgICAgcG9zQSsrO1xuICAgICAgICBwb3NCKys7XG4gICAgfVxuXG4gICAgZm9yICggeSA9IDE7IHkgPCBoZWlnaHQ7IHkrKykge1xuICAgICAgICBwb3NBID0geSAqIHdpZHRoICsgMTtcbiAgICAgICAgcG9zQiA9ICh5IC0gMSkgKiB3aWR0aCArIDE7XG4gICAgICAgIHBvc0MgPSB5ICogd2lkdGg7XG4gICAgICAgIHBvc0QgPSAoeSAtIDEpICogd2lkdGg7XG4gICAgICAgIGZvciAoIHggPSAxOyB4IDwgd2lkdGg7IHgrKykge1xuICAgICAgICAgICAgaW50ZWdyYWxJbWFnZURhdGFbcG9zQV0gKz1cbiAgICAgICAgICAgICAgICBpbWFnZURhdGFbcG9zQV0gKyBpbnRlZ3JhbEltYWdlRGF0YVtwb3NCXSArIGludGVncmFsSW1hZ2VEYXRhW3Bvc0NdIC0gaW50ZWdyYWxJbWFnZURhdGFbcG9zRF07XG4gICAgICAgICAgICBwb3NBKys7XG4gICAgICAgICAgICBwb3NCKys7XG4gICAgICAgICAgICBwb3NDKys7XG4gICAgICAgICAgICBwb3NEKys7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5DVlV0aWxzLmNvbXB1dGVJbnRlZ3JhbEltYWdlID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCBpbnRlZ3JhbFdyYXBwZXIpIHtcbiAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGE7XG4gICAgdmFyIHdpZHRoID0gaW1hZ2VXcmFwcGVyLnNpemUueDtcbiAgICB2YXIgaGVpZ2h0ID0gaW1hZ2VXcmFwcGVyLnNpemUueTtcbiAgICB2YXIgaW50ZWdyYWxJbWFnZURhdGEgPSBpbnRlZ3JhbFdyYXBwZXIuZGF0YTtcbiAgICB2YXIgc3VtID0gMDtcblxuICAgIC8vIHN1bSB1cCBmaXJzdCByb3dcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICAgICAgc3VtICs9IGltYWdlRGF0YVtpXTtcbiAgICAgICAgaW50ZWdyYWxJbWFnZURhdGFbaV0gPSBzdW07XG4gICAgfVxuXG4gICAgZm9yICh2YXIgdiA9IDE7IHYgPCBoZWlnaHQ7IHYrKykge1xuICAgICAgICBzdW0gPSAwO1xuICAgICAgICBmb3IgKHZhciB1ID0gMDsgdSA8IHdpZHRoOyB1KyspIHtcbiAgICAgICAgICAgIHN1bSArPSBpbWFnZURhdGFbdiAqIHdpZHRoICsgdV07XG4gICAgICAgICAgICBpbnRlZ3JhbEltYWdlRGF0YVsoKHYpICogd2lkdGgpICsgdV0gPSBzdW0gKyBpbnRlZ3JhbEltYWdlRGF0YVsodiAtIDEpICogd2lkdGggKyB1XTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbkNWVXRpbHMudGhyZXNob2xkSW1hZ2UgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIHRocmVzaG9sZCwgdGFyZ2V0V3JhcHBlcikge1xuICAgIGlmICghdGFyZ2V0V3JhcHBlcikge1xuICAgICAgICB0YXJnZXRXcmFwcGVyID0gaW1hZ2VXcmFwcGVyO1xuICAgIH1cbiAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGEsIGxlbmd0aCA9IGltYWdlRGF0YS5sZW5ndGgsIHRhcmdldERhdGEgPSB0YXJnZXRXcmFwcGVyLmRhdGE7XG5cbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgdGFyZ2V0RGF0YVtsZW5ndGhdID0gaW1hZ2VEYXRhW2xlbmd0aF0gPCB0aHJlc2hvbGQgPyAxIDogMDtcbiAgICB9XG59O1xuXG5DVlV0aWxzLmNvbXB1dGVIaXN0b2dyYW0gPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGJpdHNQZXJQaXhlbCkge1xuICAgIGlmICghYml0c1BlclBpeGVsKSB7XG4gICAgICAgIGJpdHNQZXJQaXhlbCA9IDg7XG4gICAgfVxuICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YSxcbiAgICAgICAgbGVuZ3RoID0gaW1hZ2VEYXRhLmxlbmd0aCxcbiAgICAgICAgYml0U2hpZnQgPSA4IC0gYml0c1BlclBpeGVsLFxuICAgICAgICBidWNrZXRDbnQgPSAxIDw8IGJpdHNQZXJQaXhlbCxcbiAgICAgICAgaGlzdCA9IG5ldyBJbnQzMkFycmF5KGJ1Y2tldENudCk7XG5cbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgaGlzdFtpbWFnZURhdGFbbGVuZ3RoXSA+PiBiaXRTaGlmdF0rKztcbiAgICB9XG4gICAgcmV0dXJuIGhpc3Q7XG59O1xuXG5DVlV0aWxzLnNoYXJwZW5MaW5lID0gZnVuY3Rpb24obGluZSkge1xuICAgIHZhciBpLFxuICAgICAgICBsZW5ndGggPSBsaW5lLmxlbmd0aCxcbiAgICAgICAgbGVmdCA9IGxpbmVbMF0sXG4gICAgICAgIGNlbnRlciA9IGxpbmVbMV0sXG4gICAgICAgIHJpZ2h0O1xuXG4gICAgZm9yIChpID0gMTsgaSA8IGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICByaWdodCA9IGxpbmVbaSArIDFdO1xuICAgICAgICAvLyAgLTEgNCAtMSBrZXJuZWxcbiAgICAgICAgbGluZVtpIC0gMV0gPSAoKChjZW50ZXIgKiAyKSAtIGxlZnQgLSByaWdodCkpICYgMjU1O1xuICAgICAgICBsZWZ0ID0gY2VudGVyO1xuICAgICAgICBjZW50ZXIgPSByaWdodDtcbiAgICB9XG4gICAgcmV0dXJuIGxpbmU7XG59O1xuXG5DVlV0aWxzLmRldGVybWluZU90c3VUaHJlc2hvbGQgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGJpdHNQZXJQaXhlbCkge1xuICAgIGlmICghYml0c1BlclBpeGVsKSB7XG4gICAgICAgIGJpdHNQZXJQaXhlbCA9IDg7XG4gICAgfVxuICAgIHZhciBoaXN0LFxuICAgICAgICB0aHJlc2hvbGQsXG4gICAgICAgIGJpdFNoaWZ0ID0gOCAtIGJpdHNQZXJQaXhlbDtcblxuICAgIGZ1bmN0aW9uIHB4KGluaXQsIGVuZCkge1xuICAgICAgICB2YXIgc3VtID0gMCwgaTtcbiAgICAgICAgZm9yICggaSA9IGluaXQ7IGkgPD0gZW5kOyBpKyspIHtcbiAgICAgICAgICAgIHN1bSArPSBoaXN0W2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdW07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbXgoaW5pdCwgZW5kKSB7XG4gICAgICAgIHZhciBpLCBzdW0gPSAwO1xuXG4gICAgICAgIGZvciAoIGkgPSBpbml0OyBpIDw9IGVuZDsgaSsrKSB7XG4gICAgICAgICAgICBzdW0gKz0gaSAqIGhpc3RbaV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3VtO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRldGVybWluZVRocmVzaG9sZCgpIHtcbiAgICAgICAgdmFyIHZldCA9IFswXSwgcDEsIHAyLCBwMTIsIGssIG0xLCBtMiwgbTEyLFxuICAgICAgICAgICAgbWF4ID0gKDEgPDwgYml0c1BlclBpeGVsKSAtIDE7XG5cbiAgICAgICAgaGlzdCA9IENWVXRpbHMuY29tcHV0ZUhpc3RvZ3JhbShpbWFnZVdyYXBwZXIsIGJpdHNQZXJQaXhlbCk7XG4gICAgICAgIGZvciAoIGsgPSAxOyBrIDwgbWF4OyBrKyspIHtcbiAgICAgICAgICAgIHAxID0gcHgoMCwgayk7XG4gICAgICAgICAgICBwMiA9IHB4KGsgKyAxLCBtYXgpO1xuICAgICAgICAgICAgcDEyID0gcDEgKiBwMjtcbiAgICAgICAgICAgIGlmIChwMTIgPT09IDApIHtcbiAgICAgICAgICAgICAgICBwMTIgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbTEgPSBteCgwLCBrKSAqIHAyO1xuICAgICAgICAgICAgbTIgPSBteChrICsgMSwgbWF4KSAqIHAxO1xuICAgICAgICAgICAgbTEyID0gbTEgLSBtMjtcbiAgICAgICAgICAgIHZldFtrXSA9IG0xMiAqIG0xMiAvIHAxMjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQXJyYXlIZWxwZXIubWF4SW5kZXgodmV0KTtcbiAgICB9XG5cbiAgICB0aHJlc2hvbGQgPSBkZXRlcm1pbmVUaHJlc2hvbGQoKTtcbiAgICByZXR1cm4gdGhyZXNob2xkIDw8IGJpdFNoaWZ0O1xufTtcblxuQ1ZVdGlscy5vdHN1VGhyZXNob2xkID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCB0YXJnZXRXcmFwcGVyKSB7XG4gICAgdmFyIHRocmVzaG9sZCA9IENWVXRpbHMuZGV0ZXJtaW5lT3RzdVRocmVzaG9sZChpbWFnZVdyYXBwZXIpO1xuXG4gICAgQ1ZVdGlscy50aHJlc2hvbGRJbWFnZShpbWFnZVdyYXBwZXIsIHRocmVzaG9sZCwgdGFyZ2V0V3JhcHBlcik7XG4gICAgcmV0dXJuIHRocmVzaG9sZDtcbn07XG5cbi8vIGxvY2FsIHRocmVzaG9sZGluZ1xuQ1ZVdGlscy5jb21wdXRlQmluYXJ5SW1hZ2UgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGludGVncmFsV3JhcHBlciwgdGFyZ2V0V3JhcHBlcikge1xuICAgIENWVXRpbHMuY29tcHV0ZUludGVncmFsSW1hZ2UoaW1hZ2VXcmFwcGVyLCBpbnRlZ3JhbFdyYXBwZXIpO1xuXG4gICAgaWYgKCF0YXJnZXRXcmFwcGVyKSB7XG4gICAgICAgIHRhcmdldFdyYXBwZXIgPSBpbWFnZVdyYXBwZXI7XG4gICAgfVxuICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YTtcbiAgICB2YXIgdGFyZ2V0RGF0YSA9IHRhcmdldFdyYXBwZXIuZGF0YTtcbiAgICB2YXIgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54O1xuICAgIHZhciBoZWlnaHQgPSBpbWFnZVdyYXBwZXIuc2l6ZS55O1xuICAgIHZhciBpbnRlZ3JhbEltYWdlRGF0YSA9IGludGVncmFsV3JhcHBlci5kYXRhO1xuICAgIHZhciBzdW0gPSAwLCB2LCB1LCBrZXJuZWwgPSAzLCBBLCBCLCBDLCBELCBhdmcsIHNpemUgPSAoa2VybmVsICogMiArIDEpICogKGtlcm5lbCAqIDIgKyAxKTtcblxuICAgIC8vIGNsZWFyIG91dCB0b3AgJiBib3R0b20tYm9yZGVyXG4gICAgZm9yICggdiA9IDA7IHYgPD0ga2VybmVsOyB2KyspIHtcbiAgICAgICAgZm9yICggdSA9IDA7IHUgPCB3aWR0aDsgdSsrKSB7XG4gICAgICAgICAgICB0YXJnZXREYXRhWygodikgKiB3aWR0aCkgKyB1XSA9IDA7XG4gICAgICAgICAgICB0YXJnZXREYXRhWygoKGhlaWdodCAtIDEpIC0gdikgKiB3aWR0aCkgKyB1XSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjbGVhciBvdXQgbGVmdCAmIHJpZ2h0IGJvcmRlclxuICAgIGZvciAoIHYgPSBrZXJuZWw7IHYgPCBoZWlnaHQgLSBrZXJuZWw7IHYrKykge1xuICAgICAgICBmb3IgKCB1ID0gMDsgdSA8PSBrZXJuZWw7IHUrKykge1xuICAgICAgICAgICAgdGFyZ2V0RGF0YVsoKHYpICogd2lkdGgpICsgdV0gPSAwO1xuICAgICAgICAgICAgdGFyZ2V0RGF0YVsoKHYpICogd2lkdGgpICsgKHdpZHRoIC0gMSAtIHUpXSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKCB2ID0ga2VybmVsICsgMTsgdiA8IGhlaWdodCAtIGtlcm5lbCAtIDE7IHYrKykge1xuICAgICAgICBmb3IgKCB1ID0ga2VybmVsICsgMTsgdSA8IHdpZHRoIC0ga2VybmVsOyB1KyspIHtcbiAgICAgICAgICAgIEEgPSBpbnRlZ3JhbEltYWdlRGF0YVsodiAtIGtlcm5lbCAtIDEpICogd2lkdGggKyAodSAtIGtlcm5lbCAtIDEpXTtcbiAgICAgICAgICAgIEIgPSBpbnRlZ3JhbEltYWdlRGF0YVsodiAtIGtlcm5lbCAtIDEpICogd2lkdGggKyAodSArIGtlcm5lbCldO1xuICAgICAgICAgICAgQyA9IGludGVncmFsSW1hZ2VEYXRhWyh2ICsga2VybmVsKSAqIHdpZHRoICsgKHUgLSBrZXJuZWwgLSAxKV07XG4gICAgICAgICAgICBEID0gaW50ZWdyYWxJbWFnZURhdGFbKHYgKyBrZXJuZWwpICogd2lkdGggKyAodSArIGtlcm5lbCldO1xuICAgICAgICAgICAgc3VtID0gRCAtIEMgLSBCICsgQTtcbiAgICAgICAgICAgIGF2ZyA9IHN1bSAvIChzaXplKTtcbiAgICAgICAgICAgIHRhcmdldERhdGFbdiAqIHdpZHRoICsgdV0gPSBpbWFnZURhdGFbdiAqIHdpZHRoICsgdV0gPiAoYXZnICsgNSkgPyAwIDogMTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbkNWVXRpbHMuY2x1c3RlciA9IGZ1bmN0aW9uKHBvaW50cywgdGhyZXNob2xkLCBwcm9wZXJ0eSkge1xuICAgIHZhciBpLCBrLCBjbHVzdGVyLCBwb2ludCwgY2x1c3RlcnMgPSBbXTtcblxuICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgICAgcHJvcGVydHkgPSBcInJhZFwiO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRvQ2x1c3RlcihuZXdQb2ludCkge1xuICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgZm9yICggayA9IDA7IGsgPCBjbHVzdGVycy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgY2x1c3RlciA9IGNsdXN0ZXJzW2tdO1xuICAgICAgICAgICAgaWYgKGNsdXN0ZXIuZml0cyhuZXdQb2ludCkpIHtcbiAgICAgICAgICAgICAgICBjbHVzdGVyLmFkZChuZXdQb2ludCk7XG4gICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG5cbiAgICAvLyBpdGVyYXRlIG92ZXIgZWFjaCBjbG91ZFxuICAgIGZvciAoIGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBvaW50ID0gQ2x1c3RlcjIuY3JlYXRlUG9pbnQocG9pbnRzW2ldLCBpLCBwcm9wZXJ0eSk7XG4gICAgICAgIGlmICghYWRkVG9DbHVzdGVyKHBvaW50KSkge1xuICAgICAgICAgICAgY2x1c3RlcnMucHVzaChDbHVzdGVyMi5jcmVhdGUocG9pbnQsIHRocmVzaG9sZCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjbHVzdGVycztcbn07XG5cbkNWVXRpbHMuVHJhY2VyID0ge1xuICAgIHRyYWNlOiBmdW5jdGlvbihwb2ludHMsIHZlYykge1xuICAgICAgICB2YXIgaXRlcmF0aW9uLCBtYXhJdGVyYXRpb25zID0gMTAsIHRvcCA9IFtdLCByZXN1bHQgPSBbXSwgY2VudGVyUG9zID0gMCwgY3VycmVudFBvcyA9IDA7XG5cbiAgICAgICAgZnVuY3Rpb24gdHJhY2UoaWR4LCBmb3J3YXJkKSB7XG4gICAgICAgICAgICB2YXIgZnJvbSwgdG8sIHRvSWR4LCBwcmVkaWN0ZWRQb3MsIHRocmVzaG9sZFggPSAxLCB0aHJlc2hvbGRZID0gTWF0aC5hYnModmVjWzFdIC8gMTApLCBmb3VuZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBtYXRjaChwb3MsIHByZWRpY3RlZCkge1xuICAgICAgICAgICAgICAgIGlmIChwb3MueCA+IChwcmVkaWN0ZWQueCAtIHRocmVzaG9sZFgpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBwb3MueCA8IChwcmVkaWN0ZWQueCArIHRocmVzaG9sZFgpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBwb3MueSA+IChwcmVkaWN0ZWQueSAtIHRocmVzaG9sZFkpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBwb3MueSA8IChwcmVkaWN0ZWQueSArIHRocmVzaG9sZFkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBuZXh0IGluZGV4IGlzIHdpdGhpbiB0aGUgdmVjIHNwZWNpZmljYXRpb25zXG4gICAgICAgICAgICAvLyBpZiBub3QsIGNoZWNrIGFzIGxvbmcgYXMgdGhlIHRocmVzaG9sZCBpcyBtZXRcblxuICAgICAgICAgICAgZnJvbSA9IHBvaW50c1tpZHhdO1xuICAgICAgICAgICAgaWYgKGZvcndhcmQpIHtcbiAgICAgICAgICAgICAgICBwcmVkaWN0ZWRQb3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGZyb20ueCArIHZlY1swXSxcbiAgICAgICAgICAgICAgICAgICAgeTogZnJvbS55ICsgdmVjWzFdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJlZGljdGVkUG9zID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBmcm9tLnggLSB2ZWNbMF0sXG4gICAgICAgICAgICAgICAgICAgIHk6IGZyb20ueSAtIHZlY1sxXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRvSWR4ID0gZm9yd2FyZCA/IGlkeCArIDEgOiBpZHggLSAxO1xuICAgICAgICAgICAgdG8gPSBwb2ludHNbdG9JZHhdO1xuICAgICAgICAgICAgd2hpbGUgKHRvICYmICggZm91bmQgPSBtYXRjaCh0bywgcHJlZGljdGVkUG9zKSkgIT09IHRydWUgJiYgKE1hdGguYWJzKHRvLnkgLSBmcm9tLnkpIDwgdmVjWzFdKSkge1xuICAgICAgICAgICAgICAgIHRvSWR4ID0gZm9yd2FyZCA/IHRvSWR4ICsgMSA6IHRvSWR4IC0gMTtcbiAgICAgICAgICAgICAgICB0byA9IHBvaW50c1t0b0lkeF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmb3VuZCA/IHRvSWR4IDogbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoIGl0ZXJhdGlvbiA9IDA7IGl0ZXJhdGlvbiA8IG1heEl0ZXJhdGlvbnM7IGl0ZXJhdGlvbisrKSB7XG4gICAgICAgICAgICAvLyByYW5kb21seSBzZWxlY3QgcG9pbnQgdG8gc3RhcnQgd2l0aFxuICAgICAgICAgICAgY2VudGVyUG9zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9pbnRzLmxlbmd0aCk7XG5cbiAgICAgICAgICAgIC8vIHRyYWNlIGZvcndhcmRcbiAgICAgICAgICAgIHRvcCA9IFtdO1xuICAgICAgICAgICAgY3VycmVudFBvcyA9IGNlbnRlclBvcztcbiAgICAgICAgICAgIHRvcC5wdXNoKHBvaW50c1tjdXJyZW50UG9zXSk7XG4gICAgICAgICAgICB3aGlsZSAoKCBjdXJyZW50UG9zID0gdHJhY2UoY3VycmVudFBvcywgdHJ1ZSkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdG9wLnB1c2gocG9pbnRzW2N1cnJlbnRQb3NdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjZW50ZXJQb3MgPiAwKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFBvcyA9IGNlbnRlclBvcztcbiAgICAgICAgICAgICAgICB3aGlsZSAoKCBjdXJyZW50UG9zID0gdHJhY2UoY3VycmVudFBvcywgZmFsc2UpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0b3AucHVzaChwb2ludHNbY3VycmVudFBvc10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRvcC5sZW5ndGggPiByZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdG9wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufTtcblxuQ1ZVdGlscy5ESUxBVEUgPSAxO1xuQ1ZVdGlscy5FUk9ERSA9IDI7XG5cbkNWVXRpbHMuZGlsYXRlID0gZnVuY3Rpb24oaW5JbWFnZVdyYXBwZXIsIG91dEltYWdlV3JhcHBlcikge1xuICAgIHZhciB2LFxuICAgICAgICB1LFxuICAgICAgICBpbkltYWdlRGF0YSA9IGluSW1hZ2VXcmFwcGVyLmRhdGEsXG4gICAgICAgIG91dEltYWdlRGF0YSA9IG91dEltYWdlV3JhcHBlci5kYXRhLFxuICAgICAgICBoZWlnaHQgPSBpbkltYWdlV3JhcHBlci5zaXplLnksXG4gICAgICAgIHdpZHRoID0gaW5JbWFnZVdyYXBwZXIuc2l6ZS54LFxuICAgICAgICBzdW0sXG4gICAgICAgIHlTdGFydDEsXG4gICAgICAgIHlTdGFydDIsXG4gICAgICAgIHhTdGFydDEsXG4gICAgICAgIHhTdGFydDI7XG5cbiAgICBmb3IgKCB2ID0gMTsgdiA8IGhlaWdodCAtIDE7IHYrKykge1xuICAgICAgICBmb3IgKCB1ID0gMTsgdSA8IHdpZHRoIC0gMTsgdSsrKSB7XG4gICAgICAgICAgICB5U3RhcnQxID0gdiAtIDE7XG4gICAgICAgICAgICB5U3RhcnQyID0gdiArIDE7XG4gICAgICAgICAgICB4U3RhcnQxID0gdSAtIDE7XG4gICAgICAgICAgICB4U3RhcnQyID0gdSArIDE7XG4gICAgICAgICAgICBzdW0gPSBpbkltYWdlRGF0YVt5U3RhcnQxICogd2lkdGggKyB4U3RhcnQxXSArIGluSW1hZ2VEYXRhW3lTdGFydDEgKiB3aWR0aCArIHhTdGFydDJdICtcbiAgICAgICAgICAgIGluSW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdICtcbiAgICAgICAgICAgIGluSW1hZ2VEYXRhW3lTdGFydDIgKiB3aWR0aCArIHhTdGFydDFdICsgaW5JbWFnZURhdGFbeVN0YXJ0MiAqIHdpZHRoICsgeFN0YXJ0Ml07XG4gICAgICAgICAgICBvdXRJbWFnZURhdGFbdiAqIHdpZHRoICsgdV0gPSBzdW0gPiAwID8gMSA6IDA7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5DVlV0aWxzLmVyb2RlID0gZnVuY3Rpb24oaW5JbWFnZVdyYXBwZXIsIG91dEltYWdlV3JhcHBlcikge1xuICAgIHZhciB2LFxuICAgICAgICB1LFxuICAgICAgICBpbkltYWdlRGF0YSA9IGluSW1hZ2VXcmFwcGVyLmRhdGEsXG4gICAgICAgIG91dEltYWdlRGF0YSA9IG91dEltYWdlV3JhcHBlci5kYXRhLFxuICAgICAgICBoZWlnaHQgPSBpbkltYWdlV3JhcHBlci5zaXplLnksXG4gICAgICAgIHdpZHRoID0gaW5JbWFnZVdyYXBwZXIuc2l6ZS54LFxuICAgICAgICBzdW0sXG4gICAgICAgIHlTdGFydDEsXG4gICAgICAgIHlTdGFydDIsXG4gICAgICAgIHhTdGFydDEsXG4gICAgICAgIHhTdGFydDI7XG5cbiAgICBmb3IgKCB2ID0gMTsgdiA8IGhlaWdodCAtIDE7IHYrKykge1xuICAgICAgICBmb3IgKCB1ID0gMTsgdSA8IHdpZHRoIC0gMTsgdSsrKSB7XG4gICAgICAgICAgICB5U3RhcnQxID0gdiAtIDE7XG4gICAgICAgICAgICB5U3RhcnQyID0gdiArIDE7XG4gICAgICAgICAgICB4U3RhcnQxID0gdSAtIDE7XG4gICAgICAgICAgICB4U3RhcnQyID0gdSArIDE7XG4gICAgICAgICAgICBzdW0gPSBpbkltYWdlRGF0YVt5U3RhcnQxICogd2lkdGggKyB4U3RhcnQxXSArIGluSW1hZ2VEYXRhW3lTdGFydDEgKiB3aWR0aCArIHhTdGFydDJdICtcbiAgICAgICAgICAgIGluSW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdICtcbiAgICAgICAgICAgIGluSW1hZ2VEYXRhW3lTdGFydDIgKiB3aWR0aCArIHhTdGFydDFdICsgaW5JbWFnZURhdGFbeVN0YXJ0MiAqIHdpZHRoICsgeFN0YXJ0Ml07XG4gICAgICAgICAgICBvdXRJbWFnZURhdGFbdiAqIHdpZHRoICsgdV0gPSBzdW0gPT09IDUgPyAxIDogMDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbkNWVXRpbHMuc3VidHJhY3QgPSBmdW5jdGlvbihhSW1hZ2VXcmFwcGVyLCBiSW1hZ2VXcmFwcGVyLCByZXN1bHRJbWFnZVdyYXBwZXIpIHtcbiAgICBpZiAoIXJlc3VsdEltYWdlV3JhcHBlcikge1xuICAgICAgICByZXN1bHRJbWFnZVdyYXBwZXIgPSBhSW1hZ2VXcmFwcGVyO1xuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gYUltYWdlV3JhcHBlci5kYXRhLmxlbmd0aCxcbiAgICAgICAgYUltYWdlRGF0YSA9IGFJbWFnZVdyYXBwZXIuZGF0YSxcbiAgICAgICAgYkltYWdlRGF0YSA9IGJJbWFnZVdyYXBwZXIuZGF0YSxcbiAgICAgICAgY0ltYWdlRGF0YSA9IHJlc3VsdEltYWdlV3JhcHBlci5kYXRhO1xuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIGNJbWFnZURhdGFbbGVuZ3RoXSA9IGFJbWFnZURhdGFbbGVuZ3RoXSAtIGJJbWFnZURhdGFbbGVuZ3RoXTtcbiAgICB9XG59O1xuXG5DVlV0aWxzLmJpdHdpc2VPciA9IGZ1bmN0aW9uKGFJbWFnZVdyYXBwZXIsIGJJbWFnZVdyYXBwZXIsIHJlc3VsdEltYWdlV3JhcHBlcikge1xuICAgIGlmICghcmVzdWx0SW1hZ2VXcmFwcGVyKSB7XG4gICAgICAgIHJlc3VsdEltYWdlV3JhcHBlciA9IGFJbWFnZVdyYXBwZXI7XG4gICAgfVxuICAgIHZhciBsZW5ndGggPSBhSW1hZ2VXcmFwcGVyLmRhdGEubGVuZ3RoLFxuICAgICAgICBhSW1hZ2VEYXRhID0gYUltYWdlV3JhcHBlci5kYXRhLFxuICAgICAgICBiSW1hZ2VEYXRhID0gYkltYWdlV3JhcHBlci5kYXRhLFxuICAgICAgICBjSW1hZ2VEYXRhID0gcmVzdWx0SW1hZ2VXcmFwcGVyLmRhdGE7XG5cbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgY0ltYWdlRGF0YVtsZW5ndGhdID0gYUltYWdlRGF0YVtsZW5ndGhdIHx8IGJJbWFnZURhdGFbbGVuZ3RoXTtcbiAgICB9XG59O1xuXG5DVlV0aWxzLmNvdW50Tm9uWmVybyA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlcikge1xuICAgIHZhciBsZW5ndGggPSBpbWFnZVdyYXBwZXIuZGF0YS5sZW5ndGgsIGRhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YSwgc3VtID0gMDtcblxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICBzdW0gKz0gZGF0YVtsZW5ndGhdO1xuICAgIH1cbiAgICByZXR1cm4gc3VtO1xufTtcblxuQ1ZVdGlscy50b3BHZW5lcmljID0gZnVuY3Rpb24obGlzdCwgdG9wLCBzY29yZUZ1bmMpIHtcbiAgICB2YXIgaSwgbWluSWR4ID0gMCwgbWluID0gMCwgcXVldWUgPSBbXSwgc2NvcmUsIGhpdCwgcG9zO1xuXG4gICAgZm9yICggaSA9IDA7IGkgPCB0b3A7IGkrKykge1xuICAgICAgICBxdWV1ZVtpXSA9IHtcbiAgICAgICAgICAgIHNjb3JlOiAwLFxuICAgICAgICAgICAgaXRlbTogbnVsbFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZvciAoIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBzY29yZSA9IHNjb3JlRnVuYy5hcHBseSh0aGlzLCBbbGlzdFtpXV0pO1xuICAgICAgICBpZiAoc2NvcmUgPiBtaW4pIHtcbiAgICAgICAgICAgIGhpdCA9IHF1ZXVlW21pbklkeF07XG4gICAgICAgICAgICBoaXQuc2NvcmUgPSBzY29yZTtcbiAgICAgICAgICAgIGhpdC5pdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgIG1pbiA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICAgICAgICBmb3IgKCBwb3MgPSAwOyBwb3MgPCB0b3A7IHBvcysrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlW3Bvc10uc2NvcmUgPCBtaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgbWluID0gcXVldWVbcG9zXS5zY29yZTtcbiAgICAgICAgICAgICAgICAgICAgbWluSWR4ID0gcG9zO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBxdWV1ZTtcbn07XG5cbkNWVXRpbHMuZ3JheUFycmF5RnJvbUltYWdlID0gZnVuY3Rpb24oaHRtbEltYWdlLCBvZmZzZXRYLCBjdHgsIGFycmF5KSB7XG4gICAgY3R4LmRyYXdJbWFnZShodG1sSW1hZ2UsIG9mZnNldFgsIDAsIGh0bWxJbWFnZS53aWR0aCwgaHRtbEltYWdlLmhlaWdodCk7XG4gICAgdmFyIGN0eERhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKG9mZnNldFgsIDAsIGh0bWxJbWFnZS53aWR0aCwgaHRtbEltYWdlLmhlaWdodCkuZGF0YTtcbiAgICBDVlV0aWxzLmNvbXB1dGVHcmF5KGN0eERhdGEsIGFycmF5KTtcbn07XG5cbkNWVXRpbHMuZ3JheUFycmF5RnJvbUNvbnRleHQgPSBmdW5jdGlvbihjdHgsIHNpemUsIG9mZnNldCwgYXJyYXkpIHtcbiAgICB2YXIgY3R4RGF0YSA9IGN0eC5nZXRJbWFnZURhdGEob2Zmc2V0LngsIG9mZnNldC55LCBzaXplLngsIHNpemUueSkuZGF0YTtcbiAgICBDVlV0aWxzLmNvbXB1dGVHcmF5KGN0eERhdGEsIGFycmF5KTtcbn07XG5cbkNWVXRpbHMuZ3JheUFuZEhhbGZTYW1wbGVGcm9tQ2FudmFzRGF0YSA9IGZ1bmN0aW9uKGNhbnZhc0RhdGEsIHNpemUsIG91dEFycmF5KSB7XG4gICAgdmFyIHRvcFJvd0lkeCA9IDA7XG4gICAgdmFyIGJvdHRvbVJvd0lkeCA9IHNpemUueDtcbiAgICB2YXIgZW5kSWR4ID0gTWF0aC5mbG9vcihjYW52YXNEYXRhLmxlbmd0aCAvIDQpO1xuICAgIHZhciBvdXRXaWR0aCA9IHNpemUueCAvIDI7XG4gICAgdmFyIG91dEltZ0lkeCA9IDA7XG4gICAgdmFyIGluV2lkdGggPSBzaXplLng7XG4gICAgdmFyIGk7XG5cbiAgICB3aGlsZSAoYm90dG9tUm93SWR4IDwgZW5kSWR4KSB7XG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgb3V0V2lkdGg7IGkrKykge1xuICAgICAgICAgICAgb3V0QXJyYXlbb3V0SW1nSWR4XSA9IE1hdGguZmxvb3IoKFxuICAgICAgICAgICAgICAgICgwLjI5OSAqIGNhbnZhc0RhdGFbdG9wUm93SWR4ICogNCArIDBdICtcbiAgICAgICAgICAgICAgICAgMC41ODcgKiBjYW52YXNEYXRhW3RvcFJvd0lkeCAqIDQgKyAxXSArXG4gICAgICAgICAgICAgICAgIDAuMTE0ICogY2FudmFzRGF0YVt0b3BSb3dJZHggKiA0ICsgMl0pICtcbiAgICAgICAgICAgICAgICAoMC4yOTkgKiBjYW52YXNEYXRhWyh0b3BSb3dJZHggKyAxKSAqIDQgKyAwXSArXG4gICAgICAgICAgICAgICAgIDAuNTg3ICogY2FudmFzRGF0YVsodG9wUm93SWR4ICsgMSkgKiA0ICsgMV0gK1xuICAgICAgICAgICAgICAgICAwLjExNCAqIGNhbnZhc0RhdGFbKHRvcFJvd0lkeCArIDEpICogNCArIDJdKSArXG4gICAgICAgICAgICAgICAgKDAuMjk5ICogY2FudmFzRGF0YVsoYm90dG9tUm93SWR4KSAqIDQgKyAwXSArXG4gICAgICAgICAgICAgICAgIDAuNTg3ICogY2FudmFzRGF0YVsoYm90dG9tUm93SWR4KSAqIDQgKyAxXSArXG4gICAgICAgICAgICAgICAgIDAuMTE0ICogY2FudmFzRGF0YVsoYm90dG9tUm93SWR4KSAqIDQgKyAyXSkgK1xuICAgICAgICAgICAgICAgICgwLjI5OSAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCArIDEpICogNCArIDBdICtcbiAgICAgICAgICAgICAgICAgMC41ODcgKiBjYW52YXNEYXRhWyhib3R0b21Sb3dJZHggKyAxKSAqIDQgKyAxXSArXG4gICAgICAgICAgICAgICAgIDAuMTE0ICogY2FudmFzRGF0YVsoYm90dG9tUm93SWR4ICsgMSkgKiA0ICsgMl0pKSAvIDQpO1xuICAgICAgICAgICAgb3V0SW1nSWR4Kys7XG4gICAgICAgICAgICB0b3BSb3dJZHggPSB0b3BSb3dJZHggKyAyO1xuICAgICAgICAgICAgYm90dG9tUm93SWR4ID0gYm90dG9tUm93SWR4ICsgMjtcbiAgICAgICAgfVxuICAgICAgICB0b3BSb3dJZHggPSB0b3BSb3dJZHggKyBpbldpZHRoO1xuICAgICAgICBib3R0b21Sb3dJZHggPSBib3R0b21Sb3dJZHggKyBpbldpZHRoO1xuICAgIH1cbn07XG5cbkNWVXRpbHMuY29tcHV0ZUdyYXkgPSBmdW5jdGlvbihpbWFnZURhdGEsIG91dEFycmF5LCBjb25maWcpIHtcbiAgICB2YXIgbCA9IChpbWFnZURhdGEubGVuZ3RoIC8gNCkgfCAwLFxuICAgICAgICBpLFxuICAgICAgICBzaW5nbGVDaGFubmVsID0gY29uZmlnICYmIGNvbmZpZy5zaW5nbGVDaGFubmVsID09PSB0cnVlO1xuXG4gICAgaWYgKHNpbmdsZUNoYW5uZWwpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgb3V0QXJyYXlbaV0gPSBpbWFnZURhdGFbaSAqIDQgKyAwXTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIG91dEFycmF5W2ldID0gTWF0aC5mbG9vcihcbiAgICAgICAgICAgICAgICAwLjI5OSAqIGltYWdlRGF0YVtpICogNCArIDBdICsgMC41ODcgKiBpbWFnZURhdGFbaSAqIDQgKyAxXSArIDAuMTE0ICogaW1hZ2VEYXRhW2kgKiA0ICsgMl0pO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuQ1ZVdGlscy5sb2FkSW1hZ2VBcnJheSA9IGZ1bmN0aW9uKHNyYywgY2FsbGJhY2ssIGNhbnZhcykge1xuICAgIGlmICghY2FudmFzKSB7XG4gICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIH1cbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjYW52YXMud2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLCAwLCAwKTtcbiAgICAgICAgdmFyIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLCAwLCAwKTtcbiAgICAgICAgdmFyIGRhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KS5kYXRhO1xuICAgICAgICBDVlV0aWxzLmNvbXB1dGVHcmF5KGRhdGEsIGFycmF5KTtcbiAgICAgICAgdGhpcy5jYWxsYmFjayhhcnJheSwge1xuICAgICAgICAgICAgeDogdGhpcy53aWR0aCxcbiAgICAgICAgICAgIHk6IHRoaXMuaGVpZ2h0XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH07XG4gICAgaW1nLnNyYyA9IHNyYztcbn07XG5cbi8qKlxuICogQHBhcmFtIGluSW1nIHtJbWFnZVdyYXBwZXJ9IGlucHV0IGltYWdlIHRvIGJlIHNhbXBsZWRcbiAqIEBwYXJhbSBvdXRJbWcge0ltYWdlV3JhcHBlcn0gdG8gYmUgc3RvcmVkIGluXG4gKi9cbkNWVXRpbHMuaGFsZlNhbXBsZSA9IGZ1bmN0aW9uKGluSW1nV3JhcHBlciwgb3V0SW1nV3JhcHBlcikge1xuICAgIHZhciBpbkltZyA9IGluSW1nV3JhcHBlci5kYXRhO1xuICAgIHZhciBpbldpZHRoID0gaW5JbWdXcmFwcGVyLnNpemUueDtcbiAgICB2YXIgb3V0SW1nID0gb3V0SW1nV3JhcHBlci5kYXRhO1xuICAgIHZhciB0b3BSb3dJZHggPSAwO1xuICAgIHZhciBib3R0b21Sb3dJZHggPSBpbldpZHRoO1xuICAgIHZhciBlbmRJZHggPSBpbkltZy5sZW5ndGg7XG4gICAgdmFyIG91dFdpZHRoID0gaW5XaWR0aCAvIDI7XG4gICAgdmFyIG91dEltZ0lkeCA9IDA7XG4gICAgd2hpbGUgKGJvdHRvbVJvd0lkeCA8IGVuZElkeCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG91dFdpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIG91dEltZ1tvdXRJbWdJZHhdID0gTWF0aC5mbG9vcihcbiAgICAgICAgICAgICAgICAoaW5JbWdbdG9wUm93SWR4XSArIGluSW1nW3RvcFJvd0lkeCArIDFdICsgaW5JbWdbYm90dG9tUm93SWR4XSArIGluSW1nW2JvdHRvbVJvd0lkeCArIDFdKSAvIDQpO1xuICAgICAgICAgICAgb3V0SW1nSWR4Kys7XG4gICAgICAgICAgICB0b3BSb3dJZHggPSB0b3BSb3dJZHggKyAyO1xuICAgICAgICAgICAgYm90dG9tUm93SWR4ID0gYm90dG9tUm93SWR4ICsgMjtcbiAgICAgICAgfVxuICAgICAgICB0b3BSb3dJZHggPSB0b3BSb3dJZHggKyBpbldpZHRoO1xuICAgICAgICBib3R0b21Sb3dJZHggPSBib3R0b21Sb3dJZHggKyBpbldpZHRoO1xuICAgIH1cbn07XG5cbkNWVXRpbHMuaHN2MnJnYiA9IGZ1bmN0aW9uKGhzdiwgcmdiKSB7XG4gICAgdmFyIGggPSBoc3ZbMF0sXG4gICAgICAgIHMgPSBoc3ZbMV0sXG4gICAgICAgIHYgPSBoc3ZbMl0sXG4gICAgICAgIGMgPSB2ICogcyxcbiAgICAgICAgeCA9IGMgKiAoMSAtIE1hdGguYWJzKChoIC8gNjApICUgMiAtIDEpKSxcbiAgICAgICAgbSA9IHYgLSBjLFxuICAgICAgICByID0gMCxcbiAgICAgICAgZyA9IDAsXG4gICAgICAgIGIgPSAwO1xuXG4gICAgcmdiID0gcmdiIHx8IFswLCAwLCAwXTtcblxuICAgIGlmIChoIDwgNjApIHtcbiAgICAgICAgciA9IGM7XG4gICAgICAgIGcgPSB4O1xuICAgIH0gZWxzZSBpZiAoaCA8IDEyMCkge1xuICAgICAgICByID0geDtcbiAgICAgICAgZyA9IGM7XG4gICAgfSBlbHNlIGlmIChoIDwgMTgwKSB7XG4gICAgICAgIGcgPSBjO1xuICAgICAgICBiID0geDtcbiAgICB9IGVsc2UgaWYgKGggPCAyNDApIHtcbiAgICAgICAgZyA9IHg7XG4gICAgICAgIGIgPSBjO1xuICAgIH0gZWxzZSBpZiAoaCA8IDMwMCkge1xuICAgICAgICByID0geDtcbiAgICAgICAgYiA9IGM7XG4gICAgfSBlbHNlIGlmIChoIDwgMzYwKSB7XG4gICAgICAgIHIgPSBjO1xuICAgICAgICBiID0geDtcbiAgICB9XG4gICAgcmdiWzBdID0gKChyICsgbSkgKiAyNTUpIHwgMDtcbiAgICByZ2JbMV0gPSAoKGcgKyBtKSAqIDI1NSkgfCAwO1xuICAgIHJnYlsyXSA9ICgoYiArIG0pICogMjU1KSB8IDA7XG4gICAgcmV0dXJuIHJnYjtcbn07XG5cbkNWVXRpbHMuX2NvbXB1dGVEaXZpc29ycyA9IGZ1bmN0aW9uKG4pIHtcbiAgICB2YXIgbGFyZ2VEaXZpc29ycyA9IFtdLFxuICAgICAgICBkaXZpc29ycyA9IFtdLFxuICAgICAgICBpO1xuXG4gICAgZm9yIChpID0gMTsgaSA8IE1hdGguc3FydChuKSArIDE7IGkrKykge1xuICAgICAgICBpZiAobiAlIGkgPT09IDApIHtcbiAgICAgICAgICAgIGRpdmlzb3JzLnB1c2goaSk7XG4gICAgICAgICAgICBpZiAoaSAhPT0gbiAvIGkpIHtcbiAgICAgICAgICAgICAgICBsYXJnZURpdmlzb3JzLnVuc2hpZnQoTWF0aC5mbG9vcihuIC8gaSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkaXZpc29ycy5jb25jYXQobGFyZ2VEaXZpc29ycyk7XG59O1xuXG5DVlV0aWxzLl9jb21wdXRlSW50ZXJzZWN0aW9uID0gZnVuY3Rpb24oYXJyMSwgYXJyMikge1xuICAgIHZhciBpID0gMCxcbiAgICAgICAgaiA9IDAsXG4gICAgICAgIHJlc3VsdCA9IFtdO1xuXG4gICAgd2hpbGUgKGkgPCBhcnIxLmxlbmd0aCAmJiBqIDwgYXJyMi5sZW5ndGgpIHtcbiAgICAgICAgaWYgKGFycjFbaV0gPT09IGFycjJbal0pIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGFycjFbaV0pO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgaisrO1xuICAgICAgICB9IGVsc2UgaWYgKGFycjFbaV0gPiBhcnIyW2pdKSB7XG4gICAgICAgICAgICBqKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbkNWVXRpbHMuY2FsY3VsYXRlUGF0Y2hTaXplID0gZnVuY3Rpb24ocGF0Y2hTaXplLCBpbWdTaXplKSB7XG4gICAgdmFyIGRpdmlzb3JzWCA9IHRoaXMuX2NvbXB1dGVEaXZpc29ycyhpbWdTaXplLngpLFxuICAgICAgICBkaXZpc29yc1kgPSB0aGlzLl9jb21wdXRlRGl2aXNvcnMoaW1nU2l6ZS55KSxcbiAgICAgICAgd2lkZVNpZGUgPSBNYXRoLm1heChpbWdTaXplLngsIGltZ1NpemUueSksXG4gICAgICAgIGNvbW1vbiA9IHRoaXMuX2NvbXB1dGVJbnRlcnNlY3Rpb24oZGl2aXNvcnNYLCBkaXZpc29yc1kpLFxuICAgICAgICBuck9mUGF0Y2hlc0xpc3QgPSBbOCwgMTAsIDE1LCAyMCwgMzIsIDYwLCA4MF0sXG4gICAgICAgIG5yT2ZQYXRjaGVzTWFwID0ge1xuICAgICAgICAgICAgXCJ4LXNtYWxsXCI6IDUsXG4gICAgICAgICAgICBcInNtYWxsXCI6IDQsXG4gICAgICAgICAgICBcIm1lZGl1bVwiOiAzLFxuICAgICAgICAgICAgXCJsYXJnZVwiOiAyLFxuICAgICAgICAgICAgXCJ4LWxhcmdlXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgbnJPZlBhdGNoZXNJZHggPSBuck9mUGF0Y2hlc01hcFtwYXRjaFNpemVdIHx8IG5yT2ZQYXRjaGVzTWFwLm1lZGl1bSxcbiAgICAgICAgbnJPZlBhdGNoZXMgPSBuck9mUGF0Y2hlc0xpc3RbbnJPZlBhdGNoZXNJZHhdLFxuICAgICAgICBkZXNpcmVkUGF0Y2hTaXplID0gTWF0aC5mbG9vcih3aWRlU2lkZSAvIG5yT2ZQYXRjaGVzKSxcbiAgICAgICAgb3B0aW1hbFBhdGNoU2l6ZTtcblxuICAgIGZ1bmN0aW9uIGZpbmRQYXRjaFNpemVGb3JEaXZpc29ycyhkaXZpc29ycykge1xuICAgICAgICB2YXIgaSA9IDAsXG4gICAgICAgICAgICBmb3VuZCA9IGRpdmlzb3JzW01hdGguZmxvb3IoZGl2aXNvcnMubGVuZ3RoIC8gMildO1xuXG4gICAgICAgIHdoaWxlIChpIDwgKGRpdmlzb3JzLmxlbmd0aCAtIDEpICYmIGRpdmlzb3JzW2ldIDwgZGVzaXJlZFBhdGNoU2l6ZSkge1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRpdmlzb3JzW2ldIC0gZGVzaXJlZFBhdGNoU2l6ZSkgPiBNYXRoLmFicyhkaXZpc29yc1tpIC0gMV0gLSBkZXNpcmVkUGF0Y2hTaXplKSkge1xuICAgICAgICAgICAgICAgIGZvdW5kID0gZGl2aXNvcnNbaSAtIDFdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3VuZCA9IGRpdmlzb3JzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChkZXNpcmVkUGF0Y2hTaXplIC8gZm91bmQgPCBuck9mUGF0Y2hlc0xpc3RbbnJPZlBhdGNoZXNJZHggKyAxXSAvIG5yT2ZQYXRjaGVzTGlzdFtuck9mUGF0Y2hlc0lkeF0gJiZcbiAgICAgICAgICAgIGRlc2lyZWRQYXRjaFNpemUgLyBmb3VuZCA+IG5yT2ZQYXRjaGVzTGlzdFtuck9mUGF0Y2hlc0lkeCAtIDFdIC8gbnJPZlBhdGNoZXNMaXN0W25yT2ZQYXRjaGVzSWR4XSApIHtcbiAgICAgICAgICAgIHJldHVybiB7eDogZm91bmQsIHk6IGZvdW5kfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBvcHRpbWFsUGF0Y2hTaXplID0gZmluZFBhdGNoU2l6ZUZvckRpdmlzb3JzKGNvbW1vbik7XG4gICAgaWYgKCFvcHRpbWFsUGF0Y2hTaXplKSB7XG4gICAgICAgIG9wdGltYWxQYXRjaFNpemUgPSBmaW5kUGF0Y2hTaXplRm9yRGl2aXNvcnModGhpcy5fY29tcHV0ZURpdmlzb3JzKHdpZGVTaWRlKSk7XG4gICAgICAgIGlmICghb3B0aW1hbFBhdGNoU2l6ZSkge1xuICAgICAgICAgICAgb3B0aW1hbFBhdGNoU2l6ZSA9IGZpbmRQYXRjaFNpemVGb3JEaXZpc29ycygodGhpcy5fY29tcHV0ZURpdmlzb3JzKGRlc2lyZWRQYXRjaFNpemUgKiBuck9mUGF0Y2hlcykpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3B0aW1hbFBhdGNoU2l6ZTtcbn07XG5cbkNWVXRpbHMuX3BhcnNlQ1NTRGltZW5zaW9uVmFsdWVzID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgZGltZW5zaW9uID0ge1xuICAgICAgICB2YWx1ZTogcGFyc2VGbG9hdCh2YWx1ZSksXG4gICAgICAgIHVuaXQ6IHZhbHVlLmluZGV4T2YoXCIlXCIpID09PSB2YWx1ZS5sZW5ndGggLSAxID8gXCIlXCIgOiBcIiVcIlxuICAgIH07XG5cbiAgICByZXR1cm4gZGltZW5zaW9uO1xufTtcblxuQ1ZVdGlscy5fZGltZW5zaW9uc0NvbnZlcnRlcnMgPSB7XG4gICAgdG9wOiBmdW5jdGlvbihkaW1lbnNpb24sIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKGRpbWVuc2lvbi51bml0ID09PSBcIiVcIikge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoY29udGV4dC5oZWlnaHQgKiAoZGltZW5zaW9uLnZhbHVlIC8gMTAwKSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJpZ2h0OiBmdW5jdGlvbihkaW1lbnNpb24sIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKGRpbWVuc2lvbi51bml0ID09PSBcIiVcIikge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoY29udGV4dC53aWR0aCAtIChjb250ZXh0LndpZHRoICogKGRpbWVuc2lvbi52YWx1ZSAvIDEwMCkpKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYm90dG9tOiBmdW5jdGlvbihkaW1lbnNpb24sIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKGRpbWVuc2lvbi51bml0ID09PSBcIiVcIikge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoY29udGV4dC5oZWlnaHQgLSAoY29udGV4dC5oZWlnaHQgKiAoZGltZW5zaW9uLnZhbHVlIC8gMTAwKSkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBsZWZ0OiBmdW5jdGlvbihkaW1lbnNpb24sIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKGRpbWVuc2lvbi51bml0ID09PSBcIiVcIikge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoY29udGV4dC53aWR0aCAqIChkaW1lbnNpb24udmFsdWUgLyAxMDApKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbkNWVXRpbHMuY29tcHV0ZUltYWdlQXJlYSA9IGZ1bmN0aW9uKGlucHV0V2lkdGgsIGlucHV0SGVpZ2h0LCBhcmVhKSB7XG4gICAgdmFyIGNvbnRleHQgPSB7d2lkdGg6IGlucHV0V2lkdGgsIGhlaWdodDogaW5wdXRIZWlnaHR9O1xuXG4gICAgdmFyIHBhcnNlZEFyZWEgPSBPYmplY3Qua2V5cyhhcmVhKS5yZWR1Y2UoZnVuY3Rpb24ocmVzdWx0LCBrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gYXJlYVtrZXldLFxuICAgICAgICAgICAgcGFyc2VkID0gQ1ZVdGlscy5fcGFyc2VDU1NEaW1lbnNpb25WYWx1ZXModmFsdWUpLFxuICAgICAgICAgICAgY2FsY3VsYXRlZCA9IENWVXRpbHMuX2RpbWVuc2lvbnNDb252ZXJ0ZXJzW2tleV0ocGFyc2VkLCBjb250ZXh0KTtcblxuICAgICAgICByZXN1bHRba2V5XSA9IGNhbGN1bGF0ZWQ7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwge30pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3g6IHBhcnNlZEFyZWEubGVmdCxcbiAgICAgICAgc3k6IHBhcnNlZEFyZWEudG9wLFxuICAgICAgICBzdzogcGFyc2VkQXJlYS5yaWdodCAtIHBhcnNlZEFyZWEubGVmdCxcbiAgICAgICAgc2g6IHBhcnNlZEFyZWEuYm90dG9tIC0gcGFyc2VkQXJlYS50b3BcbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ1ZVdGlscztcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2N2X3V0aWxzLmpzXG4gKiovIiwiaW1wb3J0IHt2ZWMyfSBmcm9tICdnbC1tYXRyaXgnO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBjbHVzdGVyIGZvciBncm91cGluZyBzaW1pbGFyIG9yaWVudGF0aW9ucyBvZiBkYXRhcG9pbnRzXG4gICAgICovXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY3JlYXRlOiBmdW5jdGlvbihwb2ludCwgdGhyZXNob2xkKSB7XG4gICAgICAgIHZhciBwb2ludHMgPSBbXSxcbiAgICAgICAgICAgIGNlbnRlciA9IHtcbiAgICAgICAgICAgICAgICByYWQ6IDAsXG4gICAgICAgICAgICAgICAgdmVjOiB2ZWMyLmNsb25lKFswLCAwXSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwb2ludE1hcCA9IHt9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICBhZGQocG9pbnQpO1xuICAgICAgICAgICAgdXBkYXRlQ2VudGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGQocG9pbnRUb0FkZCkge1xuICAgICAgICAgICAgcG9pbnRNYXBbcG9pbnRUb0FkZC5pZF0gPSBwb2ludFRvQWRkO1xuICAgICAgICAgICAgcG9pbnRzLnB1c2gocG9pbnRUb0FkZCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVDZW50ZXIoKSB7XG4gICAgICAgICAgICB2YXIgaSwgc3VtID0gMDtcbiAgICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc3VtICs9IHBvaW50c1tpXS5yYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjZW50ZXIucmFkID0gc3VtIC8gcG9pbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIGNlbnRlci52ZWMgPSB2ZWMyLmNsb25lKFtNYXRoLmNvcyhjZW50ZXIucmFkKSwgTWF0aC5zaW4oY2VudGVyLnJhZCldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluaXQoKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWRkOiBmdW5jdGlvbihwb2ludFRvQWRkKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFwb2ludE1hcFtwb2ludFRvQWRkLmlkXSkge1xuICAgICAgICAgICAgICAgICAgICBhZGQocG9pbnRUb0FkZCk7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUNlbnRlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaXRzOiBmdW5jdGlvbihvdGhlclBvaW50KSB7XG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgY29zaW5lIHNpbWlsYXJpdHkgdG8gY2VudGVyLWFuZ2xlXG4gICAgICAgICAgICAgICAgdmFyIHNpbWlsYXJpdHkgPSBNYXRoLmFicyh2ZWMyLmRvdChvdGhlclBvaW50LnBvaW50LnZlYywgY2VudGVyLnZlYykpO1xuICAgICAgICAgICAgICAgIGlmIChzaW1pbGFyaXR5ID4gdGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0UG9pbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9pbnRzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldENlbnRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNlbnRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGNyZWF0ZVBvaW50OiBmdW5jdGlvbihuZXdQb2ludCwgaWQsIHByb3BlcnR5KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByYWQ6IG5ld1BvaW50W3Byb3BlcnR5XSxcbiAgICAgICAgICAgIHBvaW50OiBuZXdQb2ludCxcbiAgICAgICAgICAgIGlkOiBpZFxuICAgICAgICB9O1xuICAgIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jbHVzdGVyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ2wtbWF0cml4XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJnbC1tYXRyaXhcIlxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbml0OiBmdW5jdGlvbihhcnIsIHZhbCkge1xuICAgICAgICB2YXIgbCA9IGFyci5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChsLS0pIHtcbiAgICAgICAgICAgIGFycltsXSA9IHZhbDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTaHVmZmxlcyB0aGUgY29udGVudCBvZiBhbiBhcnJheVxuICAgICAqIEByZXR1cm4ge0FycmF5fSB0aGUgYXJyYXkgaXRzZWxmIHNodWZmbGVkXG4gICAgICovXG4gICAgc2h1ZmZsZTogZnVuY3Rpb24oYXJyKSB7XG4gICAgICAgIHZhciBpID0gYXJyLmxlbmd0aCAtIDEsIGosIHg7XG4gICAgICAgIGZvciAoaTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKTtcbiAgICAgICAgICAgIHggPSBhcnJbaV07XG4gICAgICAgICAgICBhcnJbaV0gPSBhcnJbal07XG4gICAgICAgICAgICBhcnJbal0gPSB4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfSxcblxuICAgIHRvUG9pbnRMaXN0OiBmdW5jdGlvbihhcnIpIHtcbiAgICAgICAgdmFyIGksIGosIHJvdyA9IFtdLCByb3dzID0gW107XG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByb3cgPSBbXTtcbiAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgYXJyW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgcm93W2pdID0gYXJyW2ldW2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm93c1tpXSA9IFwiW1wiICsgcm93LmpvaW4oXCIsXCIpICsgXCJdXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiW1wiICsgcm93cy5qb2luKFwiLFxcclxcblwiKSArIFwiXVwiO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIHRoZSBlbGVtZW50cyB3aGljaCdzIHNjb3JlIGlzIGJpZ2dlciB0aGFuIHRoZSB0aHJlc2hvbGRcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gdGhlIHJlZHVjZWQgYXJyYXlcbiAgICAgKi9cbiAgICB0aHJlc2hvbGQ6IGZ1bmN0aW9uKGFyciwgdGhyZXNob2xkLCBzY29yZUZ1bmMpIHtcbiAgICAgICAgdmFyIGksIHF1ZXVlID0gW107XG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc2NvcmVGdW5jLmFwcGx5KGFyciwgW2FycltpXV0pID49IHRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goYXJyW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcXVldWU7XG4gICAgfSxcblxuICAgIG1heEluZGV4OiBmdW5jdGlvbihhcnIpIHtcbiAgICAgICAgdmFyIGksIG1heCA9IDA7XG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYXJyW2ldID4gYXJyW21heF0pIHtcbiAgICAgICAgICAgICAgICBtYXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXg7XG4gICAgfSxcblxuICAgIG1heDogZnVuY3Rpb24oYXJyKSB7XG4gICAgICAgIHZhciBpLCBtYXggPSAwO1xuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGFycltpXSA+IG1heCkge1xuICAgICAgICAgICAgICAgIG1heCA9IGFycltpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF4O1xuICAgIH0sXG5cbiAgICBzdW06IGZ1bmN0aW9uKGFycikge1xuICAgICAgICB2YXIgbGVuZ3RoID0gYXJyLmxlbmd0aCxcbiAgICAgICAgICAgIHN1bSA9IDA7XG5cbiAgICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgICAgICBzdW0gKz0gYXJyW2xlbmd0aF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1bTtcbiAgICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYXJyYXlfaGVscGVyLmpzXG4gKiovIiwiaW1wb3J0IEltYWdlV3JhcHBlciBmcm9tICcuL2ltYWdlX3dyYXBwZXInO1xuaW1wb3J0IENWVXRpbHMgZnJvbSAnLi9jdl91dGlscyc7XG5pbXBvcnQgUmFzdGVyaXplciBmcm9tICcuL3Jhc3Rlcml6ZXInO1xuaW1wb3J0IFRyYWNlciBmcm9tICcuL3RyYWNlcic7XG5pbXBvcnQgc2tlbGV0b25pemVyIGZyb20gJy4vc2tlbGV0b25pemVyJztcbmltcG9ydCBBcnJheUhlbHBlciBmcm9tICcuL2FycmF5X2hlbHBlcic7XG5pbXBvcnQgSW1hZ2VEZWJ1ZyBmcm9tICcuL2ltYWdlX2RlYnVnJztcbmltcG9ydCBnbE1hdHJpeCBmcm9tICdnbC1tYXRyaXgnO1xuXG52YXIgX2NvbmZpZyxcbiAgICBfY3VycmVudEltYWdlV3JhcHBlcixcbiAgICBfc2tlbEltYWdlV3JhcHBlcixcbiAgICBfc3ViSW1hZ2VXcmFwcGVyLFxuICAgIF9sYWJlbEltYWdlV3JhcHBlcixcbiAgICBfcGF0Y2hHcmlkLFxuICAgIF9wYXRjaExhYmVsR3JpZCxcbiAgICBfaW1hZ2VUb1BhdGNoR3JpZCxcbiAgICBfYmluYXJ5SW1hZ2VXcmFwcGVyLFxuICAgIF9wYXRjaFNpemUsXG4gICAgX2NhbnZhc0NvbnRhaW5lciA9IHtcbiAgICAgICAgY3R4OiB7XG4gICAgICAgICAgICBiaW5hcnk6IG51bGxcbiAgICAgICAgfSxcbiAgICAgICAgZG9tOiB7XG4gICAgICAgICAgICBiaW5hcnk6IG51bGxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX251bVBhdGNoZXMgPSB7eDogMCwgeTogMH0sXG4gICAgX2lucHV0SW1hZ2VXcmFwcGVyLFxuICAgIF9za2VsZXRvbml6ZXIsXG4gICAgdmVjMiA9IGdsTWF0cml4LnZlYzIsXG4gICAgbWF0MiA9IGdsTWF0cml4Lm1hdDI7XG5cbmZ1bmN0aW9uIGluaXRCdWZmZXJzKCkge1xuICAgIHZhciBza2VsZXRvbkltYWdlRGF0YTtcblxuICAgIGlmIChfY29uZmlnLmhhbGZTYW1wbGUpIHtcbiAgICAgICAgX2N1cnJlbnRJbWFnZVdyYXBwZXIgPSBuZXcgSW1hZ2VXcmFwcGVyKHtcbiAgICAgICAgICAgIHg6IF9pbnB1dEltYWdlV3JhcHBlci5zaXplLnggLyAyIHwgMCxcbiAgICAgICAgICAgIHk6IF9pbnB1dEltYWdlV3JhcHBlci5zaXplLnkgLyAyIHwgMFxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBfY3VycmVudEltYWdlV3JhcHBlciA9IF9pbnB1dEltYWdlV3JhcHBlcjtcbiAgICB9XG5cbiAgICBfcGF0Y2hTaXplID0gQ1ZVdGlscy5jYWxjdWxhdGVQYXRjaFNpemUoX2NvbmZpZy5wYXRjaFNpemUsIF9jdXJyZW50SW1hZ2VXcmFwcGVyLnNpemUpO1xuXG4gICAgX251bVBhdGNoZXMueCA9IF9jdXJyZW50SW1hZ2VXcmFwcGVyLnNpemUueCAvIF9wYXRjaFNpemUueCB8IDA7XG4gICAgX251bVBhdGNoZXMueSA9IF9jdXJyZW50SW1hZ2VXcmFwcGVyLnNpemUueSAvIF9wYXRjaFNpemUueSB8IDA7XG5cbiAgICBfYmluYXJ5SW1hZ2VXcmFwcGVyID0gbmV3IEltYWdlV3JhcHBlcihfY3VycmVudEltYWdlV3JhcHBlci5zaXplLCB1bmRlZmluZWQsIFVpbnQ4QXJyYXksIGZhbHNlKTtcblxuICAgIF9sYWJlbEltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoX3BhdGNoU2l6ZSwgdW5kZWZpbmVkLCBBcnJheSwgdHJ1ZSk7XG5cbiAgICBza2VsZXRvbkltYWdlRGF0YSA9IG5ldyBBcnJheUJ1ZmZlcig2NCAqIDEwMjQpO1xuICAgIF9zdWJJbWFnZVdyYXBwZXIgPSBuZXcgSW1hZ2VXcmFwcGVyKF9wYXRjaFNpemUsXG4gICAgICAgIG5ldyBVaW50OEFycmF5KHNrZWxldG9uSW1hZ2VEYXRhLCAwLCBfcGF0Y2hTaXplLnggKiBfcGF0Y2hTaXplLnkpKTtcbiAgICBfc2tlbEltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoX3BhdGNoU2l6ZSxcbiAgICAgICAgbmV3IFVpbnQ4QXJyYXkoc2tlbGV0b25JbWFnZURhdGEsIF9wYXRjaFNpemUueCAqIF9wYXRjaFNpemUueSAqIDMsIF9wYXRjaFNpemUueCAqIF9wYXRjaFNpemUueSksXG4gICAgICAgIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgX3NrZWxldG9uaXplciA9IHNrZWxldG9uaXplcigodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpID8gd2luZG93IDogKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgPyBzZWxmIDogZ2xvYmFsLCB7XG4gICAgICAgIHNpemU6IF9wYXRjaFNpemUueFxuICAgIH0sIHNrZWxldG9uSW1hZ2VEYXRhKTtcblxuICAgIF9pbWFnZVRvUGF0Y2hHcmlkID0gbmV3IEltYWdlV3JhcHBlcih7XG4gICAgICAgIHg6IChfY3VycmVudEltYWdlV3JhcHBlci5zaXplLnggLyBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueCkgfCAwLFxuICAgICAgICB5OiAoX2N1cnJlbnRJbWFnZVdyYXBwZXIuc2l6ZS55IC8gX3N1YkltYWdlV3JhcHBlci5zaXplLnkpIHwgMFxuICAgIH0sIHVuZGVmaW5lZCwgQXJyYXksIHRydWUpO1xuICAgIF9wYXRjaEdyaWQgPSBuZXcgSW1hZ2VXcmFwcGVyKF9pbWFnZVRvUGF0Y2hHcmlkLnNpemUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICBfcGF0Y2hMYWJlbEdyaWQgPSBuZXcgSW1hZ2VXcmFwcGVyKF9pbWFnZVRvUGF0Y2hHcmlkLnNpemUsIHVuZGVmaW5lZCwgSW50MzJBcnJheSwgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIGluaXRDYW52YXMoKSB7XG4gICAgaWYgKF9jb25maWcudXNlV29ya2VyIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeS5jbGFzc05hbWUgPSBcImJpbmFyeUJ1ZmZlclwiO1xuICAgIGlmIChfY29uZmlnLnNob3dDYW52YXMgPT09IHRydWUpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZWJ1Z1wiKS5hcHBlbmRDaGlsZChfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkpO1xuICAgIH1cbiAgICBfY2FudmFzQ29udGFpbmVyLmN0eC5iaW5hcnkgPSBfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeS53aWR0aCA9IF9iaW5hcnlJbWFnZVdyYXBwZXIuc2l6ZS54O1xuICAgIF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeS5oZWlnaHQgPSBfYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgYm91bmRpbmcgYm94IHdoaWNoIGVuY2xvc2VzIGFsbCB0aGUgZ2l2ZW4gcGF0Y2hlc1xuICogQHJldHVybnMge0FycmF5fSBUaGUgbWluaW1hbCBib3VuZGluZyBib3hcbiAqL1xuZnVuY3Rpb24gYm94RnJvbVBhdGNoZXMocGF0Y2hlcykge1xuICAgIHZhciBvdmVyQXZnLFxuICAgICAgICBpLFxuICAgICAgICBqLFxuICAgICAgICBwYXRjaCxcbiAgICAgICAgdHJhbnNNYXQsXG4gICAgICAgIG1pbnggPVxuICAgICAgICBfYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueCxcbiAgICAgICAgbWlueSA9IF9iaW5hcnlJbWFnZVdyYXBwZXIuc2l6ZS55LFxuICAgICAgICBtYXh4ID0gLV9iaW5hcnlJbWFnZVdyYXBwZXIuc2l6ZS54LFxuICAgICAgICBtYXh5ID0gLV9iaW5hcnlJbWFnZVdyYXBwZXIuc2l6ZS55LFxuICAgICAgICBib3gsXG4gICAgICAgIHNjYWxlO1xuXG4gICAgLy8gZHJhdyBhbGwgcGF0Y2hlcyB3aGljaCBhcmUgdG8gYmUgdGFrZW4gaW50byBjb25zaWRlcmF0aW9uXG4gICAgb3ZlckF2ZyA9IDA7XG4gICAgZm9yICggaSA9IDA7IGkgPCBwYXRjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBhdGNoID0gcGF0Y2hlc1tpXTtcbiAgICAgICAgb3ZlckF2ZyArPSBwYXRjaC5yYWQ7XG4gICAgICAgIGlmIChfY29uZmlnLnNob3dQYXRjaGVzKSB7XG4gICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdSZWN0KHBhdGNoLnBvcywgX3N1YkltYWdlV3JhcHBlci5zaXplLCBfY2FudmFzQ29udGFpbmVyLmN0eC5iaW5hcnksIHtjb2xvcjogXCJyZWRcIn0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3ZlckF2ZyAvPSBwYXRjaGVzLmxlbmd0aDtcbiAgICBvdmVyQXZnID0gKG92ZXJBdmcgKiAxODAgLyBNYXRoLlBJICsgOTApICUgMTgwIC0gOTA7XG4gICAgaWYgKG92ZXJBdmcgPCAwKSB7XG4gICAgICAgIG92ZXJBdmcgKz0gMTgwO1xuICAgIH1cblxuICAgIG92ZXJBdmcgPSAoMTgwIC0gb3ZlckF2ZykgKiBNYXRoLlBJIC8gMTgwO1xuICAgIHRyYW5zTWF0ID0gbWF0Mi5jbG9uZShbTWF0aC5jb3Mob3ZlckF2ZyksIE1hdGguc2luKG92ZXJBdmcpLCAtTWF0aC5zaW4ob3ZlckF2ZyksIE1hdGguY29zKG92ZXJBdmcpXSk7XG5cbiAgICAvLyBpdGVyYXRlIG92ZXIgcGF0Y2hlcyBhbmQgcm90YXRlIGJ5IGFuZ2xlXG4gICAgZm9yICggaSA9IDA7IGkgPCBwYXRjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBhdGNoID0gcGF0Y2hlc1tpXTtcbiAgICAgICAgZm9yICggaiA9IDA7IGogPCA0OyBqKyspIHtcbiAgICAgICAgICAgIHZlYzIudHJhbnNmb3JtTWF0MihwYXRjaC5ib3hbal0sIHBhdGNoLmJveFtqXSwgdHJhbnNNYXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9jb25maWcuYm94RnJvbVBhdGNoZXMuc2hvd1RyYW5zZm9ybWVkKSB7XG4gICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdQYXRoKHBhdGNoLmJveCwge3g6IDAsIHk6IDF9LCBfY2FudmFzQ29udGFpbmVyLmN0eC5iaW5hcnksIHtjb2xvcjogJyM5OWZmMDAnLCBsaW5lV2lkdGg6IDJ9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZpbmQgYm91bmRpbmcgYm94XG4gICAgZm9yICggaSA9IDA7IGkgPCBwYXRjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBhdGNoID0gcGF0Y2hlc1tpXTtcbiAgICAgICAgZm9yICggaiA9IDA7IGogPCA0OyBqKyspIHtcbiAgICAgICAgICAgIGlmIChwYXRjaC5ib3hbal1bMF0gPCBtaW54KSB7XG4gICAgICAgICAgICAgICAgbWlueCA9IHBhdGNoLmJveFtqXVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXRjaC5ib3hbal1bMF0gPiBtYXh4KSB7XG4gICAgICAgICAgICAgICAgbWF4eCA9IHBhdGNoLmJveFtqXVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXRjaC5ib3hbal1bMV0gPCBtaW55KSB7XG4gICAgICAgICAgICAgICAgbWlueSA9IHBhdGNoLmJveFtqXVsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXRjaC5ib3hbal1bMV0gPiBtYXh5KSB7XG4gICAgICAgICAgICAgICAgbWF4eSA9IHBhdGNoLmJveFtqXVsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJveCA9IFtbbWlueCwgbWlueV0sIFttYXh4LCBtaW55XSwgW21heHgsIG1heHldLCBbbWlueCwgbWF4eV1dO1xuXG4gICAgaWYgKF9jb25maWcuYm94RnJvbVBhdGNoZXMuc2hvd1RyYW5zZm9ybWVkQm94KSB7XG4gICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgoYm94LCB7eDogMCwgeTogMX0sIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSwge2NvbG9yOiAnI2ZmMDAwMCcsIGxpbmVXaWR0aDogMn0pO1xuICAgIH1cblxuICAgIHNjYWxlID0gX2NvbmZpZy5oYWxmU2FtcGxlID8gMiA6IDE7XG4gICAgLy8gcmV2ZXJzZSByb3RhdGlvbjtcbiAgICB0cmFuc01hdCA9IG1hdDIuaW52ZXJ0KHRyYW5zTWF0LCB0cmFuc01hdCk7XG4gICAgZm9yICggaiA9IDA7IGogPCA0OyBqKyspIHtcbiAgICAgICAgdmVjMi50cmFuc2Zvcm1NYXQyKGJveFtqXSwgYm94W2pdLCB0cmFuc01hdCk7XG4gICAgfVxuXG4gICAgaWYgKF9jb25maWcuYm94RnJvbVBhdGNoZXMuc2hvd0JCKSB7XG4gICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgoYm94LCB7eDogMCwgeTogMX0sIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSwge2NvbG9yOiAnI2ZmMDAwMCcsIGxpbmVXaWR0aDogMn0pO1xuICAgIH1cblxuICAgIGZvciAoIGogPSAwOyBqIDwgNDsgaisrKSB7XG4gICAgICAgIHZlYzIuc2NhbGUoYm94W2pdLCBib3hbal0sIHNjYWxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYm94O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBiaW5hcnkgaW1hZ2Ugb2YgdGhlIGN1cnJlbnQgaW1hZ2VcbiAqL1xuZnVuY3Rpb24gYmluYXJpemVJbWFnZSgpIHtcbiAgICBDVlV0aWxzLm90c3VUaHJlc2hvbGQoX2N1cnJlbnRJbWFnZVdyYXBwZXIsIF9iaW5hcnlJbWFnZVdyYXBwZXIpO1xuICAgIF9iaW5hcnlJbWFnZVdyYXBwZXIuemVyb0JvcmRlcigpO1xuICAgIGlmIChfY29uZmlnLnNob3dDYW52YXMpIHtcbiAgICAgICAgX2JpbmFyeUltYWdlV3JhcHBlci5zaG93KF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeSwgMjU1KTtcbiAgICB9XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIHRoZSBlbnRpcmUgaW1hZ2VcbiAqIGV4dHJhY3QgcGF0Y2hlc1xuICovXG5mdW5jdGlvbiBmaW5kUGF0Y2hlcygpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgaixcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgbW9tZW50cyxcbiAgICAgICAgcGF0Y2hlc0ZvdW5kID0gW10sXG4gICAgICAgIHJhc3Rlcml6ZXIsXG4gICAgICAgIHJhc3RlclJlc3VsdCxcbiAgICAgICAgcGF0Y2g7XG4gICAgZm9yIChpID0gMDsgaSA8IF9udW1QYXRjaGVzLng7IGkrKykge1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgX251bVBhdGNoZXMueTsgaisrKSB7XG4gICAgICAgICAgICB4ID0gX3N1YkltYWdlV3JhcHBlci5zaXplLnggKiBpO1xuICAgICAgICAgICAgeSA9IF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS55ICogajtcblxuICAgICAgICAgICAgLy8gc2VwZXJhdGUgcGFydHNcbiAgICAgICAgICAgIHNrZWxldG9uaXplKHgsIHkpO1xuXG4gICAgICAgICAgICAvLyBSYXN0ZXJpemUsIGZpbmQgaW5kaXZpZHVhbCBiYXJzXG4gICAgICAgICAgICBfc2tlbEltYWdlV3JhcHBlci56ZXJvQm9yZGVyKCk7XG4gICAgICAgICAgICBBcnJheUhlbHBlci5pbml0KF9sYWJlbEltYWdlV3JhcHBlci5kYXRhLCAwKTtcbiAgICAgICAgICAgIHJhc3Rlcml6ZXIgPSBSYXN0ZXJpemVyLmNyZWF0ZShfc2tlbEltYWdlV3JhcHBlciwgX2xhYmVsSW1hZ2VXcmFwcGVyKTtcbiAgICAgICAgICAgIHJhc3RlclJlc3VsdCA9IHJhc3Rlcml6ZXIucmFzdGVyaXplKDApO1xuXG4gICAgICAgICAgICBpZiAoX2NvbmZpZy5zaG93TGFiZWxzKSB7XG4gICAgICAgICAgICAgICAgX2xhYmVsSW1hZ2VXcmFwcGVyLm92ZXJsYXkoX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5LCBNYXRoLmZsb29yKDM2MCAvIHJhc3RlclJlc3VsdC5jb3VudCksXG4gICAgICAgICAgICAgICAgICAgIHt4OiB4LCB5OiB5fSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSBtb21lbnRzIGZyb20gdGhlIHNrZWxldG9uaXplZCBwYXRjaFxuICAgICAgICAgICAgbW9tZW50cyA9IF9sYWJlbEltYWdlV3JhcHBlci5tb21lbnRzKHJhc3RlclJlc3VsdC5jb3VudCk7XG5cbiAgICAgICAgICAgIC8vIGV4dHJhY3QgZWxpZ2libGUgcGF0Y2hlc1xuICAgICAgICAgICAgcGF0Y2hlc0ZvdW5kID0gcGF0Y2hlc0ZvdW5kLmNvbmNhdChkZXNjcmliZVBhdGNoKG1vbWVudHMsIFtpLCBqXSwgeCwgeSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKF9jb25maWcuc2hvd0ZvdW5kUGF0Y2hlcykge1xuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IHBhdGNoZXNGb3VuZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcGF0Y2ggPSBwYXRjaGVzRm91bmRbaV07XG4gICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdSZWN0KHBhdGNoLnBvcywgX3N1YkltYWdlV3JhcHBlci5zaXplLCBfY2FudmFzQ29udGFpbmVyLmN0eC5iaW5hcnksXG4gICAgICAgICAgICAgICAge2NvbG9yOiBcIiM5OWZmMDBcIiwgbGluZVdpZHRoOiAyfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGF0Y2hlc0ZvdW5kO1xufVxuXG4vKipcbiAqIEZpbmRzIHRob3NlIGNvbm5lY3RlZCBhcmVhcyB3aGljaCBjb250YWluIGF0IGxlYXN0IDYgcGF0Y2hlc1xuICogYW5kIHJldHVybnMgdGhlbSBvcmRlcmVkIERFU0MgYnkgdGhlIG51bWJlciBvZiBjb250YWluZWQgcGF0Y2hlc1xuICogQHBhcmFtIHtOdW1iZXJ9IG1heExhYmVsXG4gKi9cbmZ1bmN0aW9uIGZpbmRCaWdnZXN0Q29ubmVjdGVkQXJlYXMobWF4TGFiZWwpe1xuICAgIHZhciBpLFxuICAgICAgICBzdW0sXG4gICAgICAgIGxhYmVsSGlzdCA9IFtdLFxuICAgICAgICB0b3BMYWJlbHMgPSBbXTtcblxuICAgIGZvciAoIGkgPSAwOyBpIDwgbWF4TGFiZWw7IGkrKykge1xuICAgICAgICBsYWJlbEhpc3QucHVzaCgwKTtcbiAgICB9XG4gICAgc3VtID0gX3BhdGNoTGFiZWxHcmlkLmRhdGEubGVuZ3RoO1xuICAgIHdoaWxlIChzdW0tLSkge1xuICAgICAgICBpZiAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbc3VtXSA+IDApIHtcbiAgICAgICAgICAgIGxhYmVsSGlzdFtfcGF0Y2hMYWJlbEdyaWQuZGF0YVtzdW1dIC0gMV0rKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxhYmVsSGlzdCA9IGxhYmVsSGlzdC5tYXAoZnVuY3Rpb24odmFsLCBpZHgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbDogdmFsLFxuICAgICAgICAgICAgbGFiZWw6IGlkeCArIDFcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIGxhYmVsSGlzdC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGIudmFsIC0gYS52YWw7XG4gICAgfSk7XG5cbiAgICAvLyBleHRyYWN0IHRvcCBhcmVhcyB3aXRoIGF0IGxlYXN0IDYgcGF0Y2hlcyBwcmVzZW50XG4gICAgdG9wTGFiZWxzID0gbGFiZWxIaXN0LmZpbHRlcihmdW5jdGlvbihlbCkge1xuICAgICAgICByZXR1cm4gZWwudmFsID49IDU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9wTGFiZWxzO1xufVxuXG4vKipcbiAqXG4gKi9cbmZ1bmN0aW9uIGZpbmRCb3hlcyh0b3BMYWJlbHMsIG1heExhYmVsKSB7XG4gICAgdmFyIGksXG4gICAgICAgIGosXG4gICAgICAgIHN1bSxcbiAgICAgICAgcGF0Y2hlcyA9IFtdLFxuICAgICAgICBwYXRjaCxcbiAgICAgICAgYm94LFxuICAgICAgICBib3hlcyA9IFtdLFxuICAgICAgICBoc3YgPSBbMCwgMSwgMV0sXG4gICAgICAgIHJnYiA9IFswLCAwLCAwXTtcblxuICAgIGZvciAoIGkgPSAwOyBpIDwgdG9wTGFiZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHN1bSA9IF9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aDtcbiAgICAgICAgcGF0Y2hlcy5sZW5ndGggPSAwO1xuICAgICAgICB3aGlsZSAoc3VtLS0pIHtcbiAgICAgICAgICAgIGlmIChfcGF0Y2hMYWJlbEdyaWQuZGF0YVtzdW1dID09PSB0b3BMYWJlbHNbaV0ubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBwYXRjaCA9IF9pbWFnZVRvUGF0Y2hHcmlkLmRhdGFbc3VtXTtcbiAgICAgICAgICAgICAgICBwYXRjaGVzLnB1c2gocGF0Y2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJveCA9IGJveEZyb21QYXRjaGVzKHBhdGNoZXMpO1xuICAgICAgICBpZiAoYm94KSB7XG4gICAgICAgICAgICBib3hlcy5wdXNoKGJveCk7XG5cbiAgICAgICAgICAgIC8vIGRyYXcgcGF0Y2gtbGFiZWxzIGlmIHJlcXVlc3RlZFxuICAgICAgICAgICAgaWYgKF9jb25maWcuc2hvd1JlbWFpbmluZ1BhdGNoTGFiZWxzKSB7XG4gICAgICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBwYXRjaGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGNoID0gcGF0Y2hlc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgaHN2WzBdID0gKHRvcExhYmVsc1tpXS5sYWJlbCAvIChtYXhMYWJlbCArIDEpKSAqIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgQ1ZVdGlscy5oc3YycmdiKGhzdiwgcmdiKTtcbiAgICAgICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UmVjdChwYXRjaC5wb3MsIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAge2NvbG9yOiBcInJnYihcIiArIHJnYi5qb2luKFwiLFwiKSArIFwiKVwiLCBsaW5lV2lkdGg6IDJ9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGJveGVzO1xufVxuXG4vKipcbiAqIEZpbmQgc2ltaWxhciBtb21lbnRzICh2aWEgY2x1c3RlcilcbiAqIEBwYXJhbSB7T2JqZWN0fSBtb21lbnRzXG4gKi9cbmZ1bmN0aW9uIHNpbWlsYXJNb21lbnRzKG1vbWVudHMpIHtcbiAgICB2YXIgY2x1c3RlcnMgPSBDVlV0aWxzLmNsdXN0ZXIobW9tZW50cywgMC45MCk7XG4gICAgdmFyIHRvcENsdXN0ZXIgPSBDVlV0aWxzLnRvcEdlbmVyaWMoY2x1c3RlcnMsIDEsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIGUuZ2V0UG9pbnRzKCkubGVuZ3RoO1xuICAgIH0pO1xuICAgIHZhciBwb2ludHMgPSBbXSwgcmVzdWx0ID0gW107XG4gICAgaWYgKHRvcENsdXN0ZXIubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHBvaW50cyA9IHRvcENsdXN0ZXJbMF0uaXRlbS5nZXRQb2ludHMoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBvaW50c1tpXS5wb2ludCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gc2tlbGV0b25pemUoeCwgeSkge1xuICAgIF9iaW5hcnlJbWFnZVdyYXBwZXIuc3ViSW1hZ2VBc0NvcHkoX3N1YkltYWdlV3JhcHBlciwgQ1ZVdGlscy5pbWFnZVJlZih4LCB5KSk7XG4gICAgX3NrZWxldG9uaXplci5za2VsZXRvbml6ZSgpO1xuXG4gICAgLy8gU2hvdyBza2VsZXRvbiBpZiByZXF1ZXN0ZWRcbiAgICBpZiAoX2NvbmZpZy5zaG93U2tlbGV0b24pIHtcbiAgICAgICAgX3NrZWxJbWFnZVdyYXBwZXIub3ZlcmxheShfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnksIDM2MCwgQ1ZVdGlscy5pbWFnZVJlZih4LCB5KSk7XG4gICAgfVxufVxuXG4vKipcbiAqIEV4dHJhY3RzIGFuZCBkZXNjcmliZXMgdGhvc2UgcGF0Y2hlcyB3aGljaCBzZWVtIHRvIGNvbnRhaW4gYSBiYXJjb2RlIHBhdHRlcm5cbiAqIEBwYXJhbSB7QXJyYXl9IG1vbWVudHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXRjaFBvcyxcbiAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gKiBAcGFyYW0ge051bWJlcn0geVxuICogQHJldHVybnMge0FycmF5fSBsaXN0IG9mIHBhdGNoZXNcbiAqL1xuZnVuY3Rpb24gZGVzY3JpYmVQYXRjaChtb21lbnRzLCBwYXRjaFBvcywgeCwgeSkge1xuICAgIHZhciBrLFxuICAgICAgICBhdmcsXG4gICAgICAgIGVsaWdpYmxlTW9tZW50cyA9IFtdLFxuICAgICAgICBtYXRjaGluZ01vbWVudHMsXG4gICAgICAgIHBhdGNoLFxuICAgICAgICBwYXRjaGVzRm91bmQgPSBbXSxcbiAgICAgICAgbWluQ29tcG9uZW50V2VpZ2h0ID0gTWF0aC5jZWlsKF9wYXRjaFNpemUueCAvIDMpO1xuXG4gICAgaWYgKG1vbWVudHMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgLy8gb25seSBjb2xsZWN0IG1vbWVudHMgd2hpY2gncyBhcmVhIGNvdmVycyBhdCBsZWFzdCBtaW5Db21wb25lbnRXZWlnaHQgcGl4ZWxzLlxuICAgICAgICBmb3IgKCBrID0gMDsgayA8IG1vbWVudHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgIGlmIChtb21lbnRzW2tdLm0wMCA+IG1pbkNvbXBvbmVudFdlaWdodCkge1xuICAgICAgICAgICAgICAgIGVsaWdpYmxlTW9tZW50cy5wdXNoKG1vbWVudHNba10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgYXQgbGVhc3QgMiBtb21lbnRzIGFyZSBmb3VuZCB3aGljaCBoYXZlIGF0IGxlYXN0IG1pbkNvbXBvbmVudFdlaWdodHMgY292ZXJlZFxuICAgICAgICBpZiAoZWxpZ2libGVNb21lbnRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICBtYXRjaGluZ01vbWVudHMgPSBzaW1pbGFyTW9tZW50cyhlbGlnaWJsZU1vbWVudHMpO1xuICAgICAgICAgICAgYXZnID0gMDtcbiAgICAgICAgICAgIC8vIGRldGVybWluZSB0aGUgc2ltaWxhcml0eSBvZiB0aGUgbW9tZW50c1xuICAgICAgICAgICAgZm9yICggayA9IDA7IGsgPCBtYXRjaGluZ01vbWVudHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBhdmcgKz0gbWF0Y2hpbmdNb21lbnRzW2tdLnJhZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gT25seSB0d28gb2YgdGhlIG1vbWVudHMgYXJlIGFsbG93ZWQgbm90IHRvIGZpdCBpbnRvIHRoZSBlcXVhdGlvblxuICAgICAgICAgICAgLy8gYWRkIHRoZSBwYXRjaCB0byB0aGUgc2V0XG4gICAgICAgICAgICBpZiAobWF0Y2hpbmdNb21lbnRzLmxlbmd0aCA+IDFcbiAgICAgICAgICAgICAgICAgICAgJiYgbWF0Y2hpbmdNb21lbnRzLmxlbmd0aCA+PSAoZWxpZ2libGVNb21lbnRzLmxlbmd0aCAvIDQpICogM1xuICAgICAgICAgICAgICAgICAgICAmJiBtYXRjaGluZ01vbWVudHMubGVuZ3RoID4gbW9tZW50cy5sZW5ndGggLyA0KSB7XG4gICAgICAgICAgICAgICAgYXZnIC89IG1hdGNoaW5nTW9tZW50cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgcGF0Y2ggPSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBwYXRjaFBvc1sxXSAqIF9udW1QYXRjaGVzLnggKyBwYXRjaFBvc1swXSxcbiAgICAgICAgICAgICAgICAgICAgcG9zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogeVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBib3g6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlYzIuY2xvbmUoW3gsIHldKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlYzIuY2xvbmUoW3ggKyBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueCwgeV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmVjMi5jbG9uZShbeCArIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS54LCB5ICsgX3N1YkltYWdlV3JhcHBlci5zaXplLnldKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlYzIuY2xvbmUoW3gsIHkgKyBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueV0pXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIG1vbWVudHM6IG1hdGNoaW5nTW9tZW50cyxcbiAgICAgICAgICAgICAgICAgICAgcmFkOiBhdmcsXG4gICAgICAgICAgICAgICAgICAgIHZlYzogdmVjMi5jbG9uZShbTWF0aC5jb3MoYXZnKSwgTWF0aC5zaW4oYXZnKV0pXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBwYXRjaGVzRm91bmQucHVzaChwYXRjaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBhdGNoZXNGb3VuZDtcbn1cblxuLyoqXG4gKiBmaW5kcyBwYXRjaGVzIHdoaWNoIGFyZSBjb25uZWN0ZWQgYW5kIHNoYXJlIHRoZSBzYW1lIG9yaWVudGF0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gcGF0Y2hlc0ZvdW5kXG4gKi9cbmZ1bmN0aW9uIHJhc3Rlcml6ZUFuZ3VsYXJTaW1pbGFyaXR5KHBhdGNoZXNGb3VuZCkge1xuICAgIHZhciBsYWJlbCA9IDAsXG4gICAgICAgIHRocmVzaG9sZCA9IDAuOTUsXG4gICAgICAgIGN1cnJJZHggPSAwLFxuICAgICAgICBqLFxuICAgICAgICBwYXRjaCxcbiAgICAgICAgaHN2ID0gWzAsIDEsIDFdLFxuICAgICAgICByZ2IgPSBbMCwgMCwgMF07XG5cbiAgICBmdW5jdGlvbiBub3RZZXRQcm9jZXNzZWQoKSB7XG4gICAgICAgIHZhciBpO1xuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IF9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbaV0gPT09IDAgJiYgX3BhdGNoR3JpZC5kYXRhW2ldID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9wYXRjaExhYmVsR3JpZC5sZW5ndGg7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhY2UoY3VycmVudElkeCkge1xuICAgICAgICB2YXIgeCxcbiAgICAgICAgICAgIHksXG4gICAgICAgICAgICBjdXJyZW50UGF0Y2gsXG4gICAgICAgICAgICBpZHgsXG4gICAgICAgICAgICBkaXIsXG4gICAgICAgICAgICBjdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHg6IGN1cnJlbnRJZHggJSBfcGF0Y2hMYWJlbEdyaWQuc2l6ZS54LFxuICAgICAgICAgICAgICAgIHk6IChjdXJyZW50SWR4IC8gX3BhdGNoTGFiZWxHcmlkLnNpemUueCkgfCAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2ltaWxhcml0eTtcblxuICAgICAgICBpZiAoY3VycmVudElkeCA8IF9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgY3VycmVudFBhdGNoID0gX2ltYWdlVG9QYXRjaEdyaWQuZGF0YVtjdXJyZW50SWR4XTtcbiAgICAgICAgICAgIC8vIGFzc2lnbiBsYWJlbFxuICAgICAgICAgICAgX3BhdGNoTGFiZWxHcmlkLmRhdGFbY3VycmVudElkeF0gPSBsYWJlbDtcbiAgICAgICAgICAgIGZvciAoIGRpciA9IDA7IGRpciA8IFRyYWNlci5zZWFyY2hEaXJlY3Rpb25zLmxlbmd0aDsgZGlyKyspIHtcbiAgICAgICAgICAgICAgICB5ID0gY3VycmVudC55ICsgVHJhY2VyLnNlYXJjaERpcmVjdGlvbnNbZGlyXVswXTtcbiAgICAgICAgICAgICAgICB4ID0gY3VycmVudC54ICsgVHJhY2VyLnNlYXJjaERpcmVjdGlvbnNbZGlyXVsxXTtcbiAgICAgICAgICAgICAgICBpZHggPSB5ICogX3BhdGNoTGFiZWxHcmlkLnNpemUueCArIHg7XG5cbiAgICAgICAgICAgICAgICAvLyBjb250aW51ZSBpZiBwYXRjaCBlbXB0eVxuICAgICAgICAgICAgICAgIGlmIChfcGF0Y2hHcmlkLmRhdGFbaWR4XSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBfcGF0Y2hMYWJlbEdyaWQuZGF0YVtpZHhdID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKF9wYXRjaExhYmVsR3JpZC5kYXRhW2lkeF0gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2ltaWxhcml0eSA9IE1hdGguYWJzKHZlYzIuZG90KF9pbWFnZVRvUGF0Y2hHcmlkLmRhdGFbaWR4XS52ZWMsIGN1cnJlbnRQYXRjaC52ZWMpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpbWlsYXJpdHkgPiB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNlKGlkeCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwcmVwYXJlIGZvciBmaW5kaW5nIHRoZSByaWdodCBwYXRjaGVzXG4gICAgQXJyYXlIZWxwZXIuaW5pdChfcGF0Y2hHcmlkLmRhdGEsIDApO1xuICAgIEFycmF5SGVscGVyLmluaXQoX3BhdGNoTGFiZWxHcmlkLmRhdGEsIDApO1xuICAgIEFycmF5SGVscGVyLmluaXQoX2ltYWdlVG9QYXRjaEdyaWQuZGF0YSwgbnVsbCk7XG5cbiAgICBmb3IgKCBqID0gMDsgaiA8IHBhdGNoZXNGb3VuZC5sZW5ndGg7IGorKykge1xuICAgICAgICBwYXRjaCA9IHBhdGNoZXNGb3VuZFtqXTtcbiAgICAgICAgX2ltYWdlVG9QYXRjaEdyaWQuZGF0YVtwYXRjaC5pbmRleF0gPSBwYXRjaDtcbiAgICAgICAgX3BhdGNoR3JpZC5kYXRhW3BhdGNoLmluZGV4XSA9IDE7XG4gICAgfVxuXG4gICAgLy8gcmFzdGVyaXplIHRoZSBwYXRjaGVzIGZvdW5kIHRvIGRldGVybWluZSBhcmVhXG4gICAgX3BhdGNoR3JpZC56ZXJvQm9yZGVyKCk7XG5cbiAgICB3aGlsZSAoKCBjdXJySWR4ID0gbm90WWV0UHJvY2Vzc2VkKCkpIDwgX3BhdGNoTGFiZWxHcmlkLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgIGxhYmVsKys7XG4gICAgICAgIHRyYWNlKGN1cnJJZHgpO1xuICAgIH1cblxuICAgIC8vIGRyYXcgcGF0Y2gtbGFiZWxzIGlmIHJlcXVlc3RlZFxuICAgIGlmIChfY29uZmlnLnNob3dQYXRjaExhYmVscykge1xuICAgICAgICBmb3IgKCBqID0gMDsgaiA8IF9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbal0gPiAwICYmIF9wYXRjaExhYmVsR3JpZC5kYXRhW2pdIDw9IGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2ggPSBfaW1hZ2VUb1BhdGNoR3JpZC5kYXRhW2pdO1xuICAgICAgICAgICAgICAgIGhzdlswXSA9IChfcGF0Y2hMYWJlbEdyaWQuZGF0YVtqXSAvIChsYWJlbCArIDEpKSAqIDM2MDtcbiAgICAgICAgICAgICAgICBDVlV0aWxzLmhzdjJyZ2IoaHN2LCByZ2IpO1xuICAgICAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1JlY3QocGF0Y2gucG9zLCBfc3ViSW1hZ2VXcmFwcGVyLnNpemUsIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSxcbiAgICAgICAgICAgICAgICAgICAge2NvbG9yOiBcInJnYihcIiArIHJnYi5qb2luKFwiLFwiKSArIFwiKVwiLCBsaW5lV2lkdGg6IDJ9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBsYWJlbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGluaXQ6IGZ1bmN0aW9uKGlucHV0SW1hZ2VXcmFwcGVyLCBjb25maWcpIHtcbiAgICAgICAgX2NvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgX2lucHV0SW1hZ2VXcmFwcGVyID0gaW5wdXRJbWFnZVdyYXBwZXI7XG5cbiAgICAgICAgaW5pdEJ1ZmZlcnMoKTtcbiAgICAgICAgaW5pdENhbnZhcygpO1xuICAgIH0sXG5cbiAgICBsb2NhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcGF0Y2hlc0ZvdW5kLFxuICAgICAgICAgICAgdG9wTGFiZWxzLFxuICAgICAgICAgICAgYm94ZXM7XG5cbiAgICAgICAgaWYgKF9jb25maWcuaGFsZlNhbXBsZSkge1xuICAgICAgICAgICAgQ1ZVdGlscy5oYWxmU2FtcGxlKF9pbnB1dEltYWdlV3JhcHBlciwgX2N1cnJlbnRJbWFnZVdyYXBwZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgYmluYXJpemVJbWFnZSgpO1xuICAgICAgICBwYXRjaGVzRm91bmQgPSBmaW5kUGF0Y2hlcygpO1xuICAgICAgICAvLyByZXR1cm4gdW5sZXNzIDUlIG9yIG1vcmUgcGF0Y2hlcyBhcmUgZm91bmRcbiAgICAgICAgaWYgKHBhdGNoZXNGb3VuZC5sZW5ndGggPCBfbnVtUGF0Y2hlcy54ICogX251bVBhdGNoZXMueSAqIDAuMDUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmFzdGVycml6ZSBhcmVhIGJ5IGNvbXBhcmluZyBhbmd1bGFyIHNpbWlsYXJpdHk7XG4gICAgICAgIHZhciBtYXhMYWJlbCA9IHJhc3Rlcml6ZUFuZ3VsYXJTaW1pbGFyaXR5KHBhdGNoZXNGb3VuZCk7XG4gICAgICAgIGlmIChtYXhMYWJlbCA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2VhcmNoIGZvciBhcmVhIHdpdGggdGhlIG1vc3QgcGF0Y2hlcyAoYmlnZ2VzdCBjb25uZWN0ZWQgYXJlYSlcbiAgICAgICAgdG9wTGFiZWxzID0gZmluZEJpZ2dlc3RDb25uZWN0ZWRBcmVhcyhtYXhMYWJlbCk7XG4gICAgICAgIGlmICh0b3BMYWJlbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGJveGVzID0gZmluZEJveGVzKHRvcExhYmVscywgbWF4TGFiZWwpO1xuICAgICAgICByZXR1cm4gYm94ZXM7XG4gICAgfSxcblxuICAgIGNoZWNrSW1hZ2VDb25zdHJhaW50czogZnVuY3Rpb24oaW5wdXRTdHJlYW0sIGNvbmZpZykge1xuICAgICAgICB2YXIgcGF0Y2hTaXplLFxuICAgICAgICAgICAgd2lkdGggPSBpbnB1dFN0cmVhbS5nZXRXaWR0aCgpLFxuICAgICAgICAgICAgaGVpZ2h0ID0gaW5wdXRTdHJlYW0uZ2V0SGVpZ2h0KCksXG4gICAgICAgICAgICBoYWxmU2FtcGxlID0gY29uZmlnLmhhbGZTYW1wbGUgPyAwLjUgOiAxLFxuICAgICAgICAgICAgc2l6ZSxcbiAgICAgICAgICAgIGFyZWE7XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIHdpZHRoIGFuZCBoZWlnaHQgYmFzZWQgb24gYXJlYVxuICAgICAgICBpZiAoaW5wdXRTdHJlYW0uZ2V0Q29uZmlnKCkuYXJlYSkge1xuICAgICAgICAgICAgYXJlYSA9IENWVXRpbHMuY29tcHV0ZUltYWdlQXJlYSh3aWR0aCwgaGVpZ2h0LCBpbnB1dFN0cmVhbS5nZXRDb25maWcoKS5hcmVhKTtcbiAgICAgICAgICAgIGlucHV0U3RyZWFtLnNldFRvcFJpZ2h0KHt4OiBhcmVhLnN4LCB5OiBhcmVhLnN5fSk7XG4gICAgICAgICAgICBpbnB1dFN0cmVhbS5zZXRDYW52YXNTaXplKHt4OiB3aWR0aCwgeTogaGVpZ2h0fSk7XG4gICAgICAgICAgICB3aWR0aCA9IGFyZWEuc3c7XG4gICAgICAgICAgICBoZWlnaHQgPSBhcmVhLnNoO1xuICAgICAgICB9XG5cbiAgICAgICAgc2l6ZSA9IHtcbiAgICAgICAgICAgIHg6IE1hdGguZmxvb3Iod2lkdGggKiBoYWxmU2FtcGxlKSxcbiAgICAgICAgICAgIHk6IE1hdGguZmxvb3IoaGVpZ2h0ICogaGFsZlNhbXBsZSlcbiAgICAgICAgfTtcblxuICAgICAgICBwYXRjaFNpemUgPSBDVlV0aWxzLmNhbGN1bGF0ZVBhdGNoU2l6ZShjb25maWcucGF0Y2hTaXplLCBzaXplKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJQYXRjaC1TaXplOiBcIiArIEpTT04uc3RyaW5naWZ5KHBhdGNoU2l6ZSkpO1xuXG4gICAgICAgIGlucHV0U3RyZWFtLnNldFdpZHRoKE1hdGguZmxvb3IoTWF0aC5mbG9vcihzaXplLnggLyBwYXRjaFNpemUueCkgKiAoMSAvIGhhbGZTYW1wbGUpICogcGF0Y2hTaXplLngpKTtcbiAgICAgICAgaW5wdXRTdHJlYW0uc2V0SGVpZ2h0KE1hdGguZmxvb3IoTWF0aC5mbG9vcihzaXplLnkgLyBwYXRjaFNpemUueSkgKiAoMSAvIGhhbGZTYW1wbGUpICogcGF0Y2hTaXplLnkpKTtcblxuICAgICAgICBpZiAoKGlucHV0U3RyZWFtLmdldFdpZHRoKCkgJSBwYXRjaFNpemUueCkgPT09IDAgJiYgKGlucHV0U3RyZWFtLmdldEhlaWdodCgpICUgcGF0Y2hTaXplLnkpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkltYWdlIGRpbWVuc2lvbnMgZG8gbm90IGNvbXBseSB3aXRoIHRoZSBjdXJyZW50IHNldHRpbmdzOiBXaWR0aCAoXCIgK1xuICAgICAgICAgICAgd2lkdGggKyBcIiApYW5kIGhlaWdodCAoXCIgKyBoZWlnaHQgK1xuICAgICAgICAgICAgXCIpIG11c3QgYSBtdWx0aXBsZSBvZiBcIiArIHBhdGNoU2l6ZS54KTtcbiAgICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmFyY29kZV9sb2NhdG9yLmpzXG4gKiovIiwiaW1wb3J0IFRyYWNlciBmcm9tICcuL3RyYWNlcic7XG5cbi8qKlxuICogaHR0cDovL3d3dy5jb2RlcHJvamVjdC5jb20vVGlwcy80MDcxNzIvQ29ubmVjdGVkLUNvbXBvbmVudC1MYWJlbGluZy1hbmQtVmVjdG9yaXphdGlvblxuICovXG52YXIgUmFzdGVyaXplciA9IHtcbiAgICBjcmVhdGVDb250b3VyMkQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlyOiBudWxsLFxuICAgICAgICAgICAgaW5kZXg6IG51bGwsXG4gICAgICAgICAgICBmaXJzdFZlcnRleDogbnVsbCxcbiAgICAgICAgICAgIGluc2lkZUNvbnRvdXJzOiBudWxsLFxuICAgICAgICAgICAgbmV4dHBlZXI6IG51bGwsXG4gICAgICAgICAgICBwcmV2cGVlcjogbnVsbFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgQ09OVE9VUl9ESVI6IHtcbiAgICAgICAgQ1dfRElSOiAwLFxuICAgICAgICBDQ1dfRElSOiAxLFxuICAgICAgICBVTktOT1dOX0RJUjogMlxuICAgIH0sXG4gICAgRElSOiB7XG4gICAgICAgIE9VVFNJREVfRURHRTogLTMyNzY3LFxuICAgICAgICBJTlNJREVfRURHRTogLTMyNzY2XG4gICAgfSxcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgbGFiZWxXcmFwcGVyKSB7XG4gICAgICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YSxcbiAgICAgICAgICAgIGxhYmVsRGF0YSA9IGxhYmVsV3JhcHBlci5kYXRhLFxuICAgICAgICAgICAgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54LFxuICAgICAgICAgICAgaGVpZ2h0ID0gaW1hZ2VXcmFwcGVyLnNpemUueSxcbiAgICAgICAgICAgIHRyYWNlciA9IFRyYWNlci5jcmVhdGUoaW1hZ2VXcmFwcGVyLCBsYWJlbFdyYXBwZXIpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByYXN0ZXJpemU6IGZ1bmN0aW9uKGRlcHRobGFiZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIGJjLFxuICAgICAgICAgICAgICAgICAgICBsYyxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgY3gsXG4gICAgICAgICAgICAgICAgICAgIGN5LFxuICAgICAgICAgICAgICAgICAgICBjb2xvck1hcCA9IFtdLFxuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXgsXG4gICAgICAgICAgICAgICAgICAgIHAsXG4gICAgICAgICAgICAgICAgICAgIGNjLFxuICAgICAgICAgICAgICAgICAgICBzYyxcbiAgICAgICAgICAgICAgICAgICAgcG9zLFxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0ZWRDb3VudCA9IDAsXG4gICAgICAgICAgICAgICAgICAgIGk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IDQwMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yTWFwW2ldID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb2xvck1hcFswXSA9IGltYWdlRGF0YVswXTtcbiAgICAgICAgICAgICAgICBjYyA9IG51bGw7XG4gICAgICAgICAgICAgICAgZm9yICggY3kgPSAxOyBjeSA8IGhlaWdodCAtIDE7IGN5KyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGJjID0gY29sb3JNYXBbMF07XG4gICAgICAgICAgICAgICAgICAgIGZvciAoIGN4ID0gMTsgY3ggPCB3aWR0aCAtIDE7IGN4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcyA9IGN5ICogd2lkdGggKyBjeDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbERhdGFbcG9zXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gaW1hZ2VEYXRhW3Bvc107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9yICE9PSBiYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWxpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGMgPSBjb25uZWN0ZWRDb3VudCArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvck1hcFtsY10gPSBjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJjID0gY29sb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXggPSB0cmFjZXIuY29udG91clRyYWNpbmcoY3ksIGN4LCBsYywgY29sb3IsIFJhc3Rlcml6ZXIuRElSLk9VVFNJREVfRURHRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmVydGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGVkQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbGluZGV4ID0gbGM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcCA9IFJhc3Rlcml6ZXIuY3JlYXRlQ29udG91cjJEKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5kaXIgPSBSYXN0ZXJpemVyLkNPTlRPVVJfRElSLkNXX0RJUjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmluZGV4ID0gbGFiZWxpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmZpcnN0VmVydGV4ID0gdmVydGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubmV4dHBlZXIgPSBjYztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmluc2lkZUNvbnRvdXJzID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2MgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MucHJldnBlZXIgPSBwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYyA9IHA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXggPSB0cmFjZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY29udG91clRyYWNpbmcoY3ksIGN4LCBSYXN0ZXJpemVyLkRJUi5JTlNJREVfRURHRSwgY29sb3IsIGxhYmVsaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZlcnRleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBSYXN0ZXJpemVyLmNyZWF0ZUNvbnRvdXIyRCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuZmlyc3RWZXJ0ZXggPSB2ZXJ0ZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5pbnNpZGVDb250b3VycyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlcHRobGFiZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5kaXIgPSBSYXN0ZXJpemVyLkNPTlRPVVJfRElSLkNDV19ESVI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5kaXIgPSBSYXN0ZXJpemVyLkNPTlRPVVJfRElSLkNXX0RJUjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5pbmRleCA9IGRlcHRobGFiZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2MgPSBjYztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKHNjICE9PSBudWxsKSAmJiBzYy5pbmRleCAhPT0gbGFiZWxpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYyA9IHNjLm5leHRwZWVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2MgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5uZXh0cGVlciA9IHNjLmluc2lkZUNvbnRvdXJzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2MuaW5zaWRlQ29udG91cnMgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjLmluc2lkZUNvbnRvdXJzLnByZXZwZWVyID0gcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYy5pbnNpZGVDb250b3VycyA9IHA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxEYXRhW3Bvc10gPSBsYWJlbGluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGFiZWxEYXRhW3Bvc10gPT09IFJhc3Rlcml6ZXIuRElSLk9VVFNJREVfRURHRVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBsYWJlbERhdGFbcG9zXSA9PT0gUmFzdGVyaXplci5ESVIuSU5TSURFX0VER0UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWxEYXRhW3Bvc10gPT09IFJhc3Rlcml6ZXIuRElSLklOU0lERV9FREdFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJjID0gaW1hZ2VEYXRhW3Bvc107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmMgPSBjb2xvck1hcFswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsaW5kZXggPSBsYWJlbERhdGFbcG9zXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYyA9IGNvbG9yTWFwW2xhYmVsaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNjID0gY2M7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHNjICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjLmluZGV4ID0gZGVwdGhsYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgc2MgPSBzYy5uZXh0cGVlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY2M6IGNjLFxuICAgICAgICAgICAgICAgICAgICBjb3VudDogY29ubmVjdGVkQ291bnRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlYnVnOiB7XG4gICAgICAgICAgICAgICAgZHJhd0NvbnRvdXI6IGZ1bmN0aW9uKGNhbnZhcywgZmlyc3RDb250b3VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHEgPSBmaXJzdENvbnRvdXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpcSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHEsXG4gICAgICAgICAgICAgICAgICAgICAgICBwO1xuXG4gICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwicmVkXCI7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJlZFwiO1xuICAgICAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocHEgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlxID0gcHEuaW5zaWRlQ29udG91cnM7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpcSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAocHEgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpcSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHEgPSBpcTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcSA9IGlxLm5leHRwZWVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxID0gcHE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHEgPSBwcS5uZXh0cGVlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHEgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXEgPSBwcS5pbnNpZGVDb250b3VycztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHEuZGlyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFJhc3Rlcml6ZXIuQ09OVE9VUl9ESVIuQ1dfRElSOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwicmVkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFJhc3Rlcml6ZXIuQ09OVE9VUl9ESVIuQ0NXX0RJUjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsdWVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUmFzdGVyaXplci5DT05UT1VSX0RJUi5VTktOT1dOX0RJUjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBxLmZpcnN0VmVydGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4Lm1vdmVUbyhwLngsIHAueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcCA9IHAubmV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHgubGluZVRvKHAueCwgcC55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKHAgIT09IHEuZmlyc3RWZXJ0ZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJhc3Rlcml6ZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9yYXN0ZXJpemVyLmpzXG4gKiovIiwiLyoqXG4gKiBodHRwOi8vd3d3LmNvZGVwcm9qZWN0LmNvbS9UaXBzLzQwNzE3Mi9Db25uZWN0ZWQtQ29tcG9uZW50LUxhYmVsaW5nLWFuZC1WZWN0b3JpemF0aW9uXG4gKi9cbnZhciBUcmFjZXIgPSB7XG4gICAgc2VhcmNoRGlyZWN0aW9uczogW1swLCAxXSwgWzEsIDFdLCBbMSwgMF0sIFsxLCAtMV0sIFswLCAtMV0sIFstMSwgLTFdLCBbLTEsIDBdLCBbLTEsIDFdXSxcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgbGFiZWxXcmFwcGVyKSB7XG4gICAgICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YSxcbiAgICAgICAgICAgIGxhYmVsRGF0YSA9IGxhYmVsV3JhcHBlci5kYXRhLFxuICAgICAgICAgICAgc2VhcmNoRGlyZWN0aW9ucyA9IHRoaXMuc2VhcmNoRGlyZWN0aW9ucyxcbiAgICAgICAgICAgIHdpZHRoID0gaW1hZ2VXcmFwcGVyLnNpemUueCxcbiAgICAgICAgICAgIHBvcztcblxuICAgICAgICBmdW5jdGlvbiB0cmFjZShjdXJyZW50LCBjb2xvciwgbGFiZWwsIGVkZ2VsYWJlbCkge1xuICAgICAgICAgICAgdmFyIGksXG4gICAgICAgICAgICAgICAgeSxcbiAgICAgICAgICAgICAgICB4O1xuXG4gICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgICAgIHkgPSBjdXJyZW50LmN5ICsgc2VhcmNoRGlyZWN0aW9uc1tjdXJyZW50LmRpcl1bMF07XG4gICAgICAgICAgICAgICAgeCA9IGN1cnJlbnQuY3ggKyBzZWFyY2hEaXJlY3Rpb25zW2N1cnJlbnQuZGlyXVsxXTtcbiAgICAgICAgICAgICAgICBwb3MgPSB5ICogd2lkdGggKyB4O1xuICAgICAgICAgICAgICAgIGlmICgoaW1hZ2VEYXRhW3Bvc10gPT09IGNvbG9yKSAmJiAoKGxhYmVsRGF0YVtwb3NdID09PSAwKSB8fCAobGFiZWxEYXRhW3Bvc10gPT09IGxhYmVsKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxEYXRhW3Bvc10gPSBsYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudC5jeSA9IHk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuY3ggPSB4O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWxEYXRhW3Bvc10gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsRGF0YVtwb3NdID0gZWRnZWxhYmVsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuZGlyID0gKGN1cnJlbnQuZGlyICsgMSkgJSA4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHZlcnRleDJEKHgsIHksIGRpcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBkaXI6IGRpcixcbiAgICAgICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgICAgIHk6IHksXG4gICAgICAgICAgICAgICAgbmV4dDogbnVsbCxcbiAgICAgICAgICAgICAgICBwcmV2OiBudWxsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY29udG91clRyYWNpbmcoc3ksIHN4LCBsYWJlbCwgY29sb3IsIGVkZ2VsYWJlbCkge1xuICAgICAgICAgICAgdmFyIEZ2ID0gbnVsbCxcbiAgICAgICAgICAgICAgICBDdixcbiAgICAgICAgICAgICAgICBQLFxuICAgICAgICAgICAgICAgIGxkaXIsXG4gICAgICAgICAgICAgICAgY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAgY3g6IHN4LFxuICAgICAgICAgICAgICAgICAgICBjeTogc3ksXG4gICAgICAgICAgICAgICAgICAgIGRpcjogMFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0cmFjZShjdXJyZW50LCBjb2xvciwgbGFiZWwsIGVkZ2VsYWJlbCkpIHtcbiAgICAgICAgICAgICAgICBGdiA9IHZlcnRleDJEKHN4LCBzeSwgY3VycmVudC5kaXIpO1xuICAgICAgICAgICAgICAgIEN2ID0gRnY7XG4gICAgICAgICAgICAgICAgbGRpciA9IGN1cnJlbnQuZGlyO1xuICAgICAgICAgICAgICAgIFAgPSB2ZXJ0ZXgyRChjdXJyZW50LmN4LCBjdXJyZW50LmN5LCAwKTtcbiAgICAgICAgICAgICAgICBQLnByZXYgPSBDdjtcbiAgICAgICAgICAgICAgICBDdi5uZXh0ID0gUDtcbiAgICAgICAgICAgICAgICBQLm5leHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIEN2ID0gUDtcbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuZGlyID0gKGN1cnJlbnQuZGlyICsgNikgJSA4O1xuICAgICAgICAgICAgICAgICAgICB0cmFjZShjdXJyZW50LCBjb2xvciwgbGFiZWwsIGVkZ2VsYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsZGlyICE9PSBjdXJyZW50LmRpcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgQ3YuZGlyID0gY3VycmVudC5kaXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBQID0gdmVydGV4MkQoY3VycmVudC5jeCwgY3VycmVudC5jeSwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBQLnByZXYgPSBDdjtcbiAgICAgICAgICAgICAgICAgICAgICAgIEN2Lm5leHQgPSBQO1xuICAgICAgICAgICAgICAgICAgICAgICAgUC5uZXh0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIEN2ID0gUDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEN2LmRpciA9IGxkaXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBDdi54ID0gY3VycmVudC5jeDtcbiAgICAgICAgICAgICAgICAgICAgICAgIEN2LnkgPSBjdXJyZW50LmN5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxkaXIgPSBjdXJyZW50LmRpcjtcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChjdXJyZW50LmN4ICE9PSBzeCB8fCBjdXJyZW50LmN5ICE9PSBzeSk7XG4gICAgICAgICAgICAgICAgRnYucHJldiA9IEN2LnByZXY7XG4gICAgICAgICAgICAgICAgQ3YucHJldi5uZXh0ID0gRnY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gRnY7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHJhY2U6IGZ1bmN0aW9uKGN1cnJlbnQsIGNvbG9yLCBsYWJlbCwgZWRnZWxhYmVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYWNlKGN1cnJlbnQsIGNvbG9yLCBsYWJlbCwgZWRnZWxhYmVsKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250b3VyVHJhY2luZzogZnVuY3Rpb24oc3ksIHN4LCBsYWJlbCwgY29sb3IsIGVkZ2VsYWJlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250b3VyVHJhY2luZyhzeSwgc3gsIGxhYmVsLCBjb2xvciwgZWRnZWxhYmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCAoVHJhY2VyKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3RyYWNlci5qc1xuICoqLyIsIi8qIEBwcmVzZXJ2ZSBBU00gQkVHSU4gKi9cbi8qIGVzbGludC1kaXNhYmxlIGVxZXFlcSovXG5mdW5jdGlvbiBTa2VsZXRvbml6ZXIoc3RkbGliLCBmb3JlaWduLCBidWZmZXIpIHtcbiAgICBcInVzZSBhc21cIjtcblxuICAgIHZhciBpbWFnZXMgPSBuZXcgc3RkbGliLlVpbnQ4QXJyYXkoYnVmZmVyKSxcbiAgICAgICAgc2l6ZSA9IGZvcmVpZ24uc2l6ZSB8IDAsXG4gICAgICAgIGltdWwgPSBzdGRsaWIuTWF0aC5pbXVsO1xuXG4gICAgZnVuY3Rpb24gZXJvZGUoaW5JbWFnZVB0ciwgb3V0SW1hZ2VQdHIpIHtcbiAgICAgICAgaW5JbWFnZVB0ciA9IGluSW1hZ2VQdHIgfCAwO1xuICAgICAgICBvdXRJbWFnZVB0ciA9IG91dEltYWdlUHRyIHwgMDtcblxuICAgICAgICB2YXIgdiA9IDAsXG4gICAgICAgICAgICB1ID0gMCxcbiAgICAgICAgICAgIHN1bSA9IDAsXG4gICAgICAgICAgICB5U3RhcnQxID0gMCxcbiAgICAgICAgICAgIHlTdGFydDIgPSAwLFxuICAgICAgICAgICAgeFN0YXJ0MSA9IDAsXG4gICAgICAgICAgICB4U3RhcnQyID0gMCxcbiAgICAgICAgICAgIG9mZnNldCA9IDA7XG5cbiAgICAgICAgZm9yICggdiA9IDE7ICh2IHwgMCkgPCAoKHNpemUgLSAxKSB8IDApOyB2ID0gKHYgKyAxKSB8IDApIHtcbiAgICAgICAgICAgIG9mZnNldCA9IChvZmZzZXQgKyBzaXplKSB8IDA7XG4gICAgICAgICAgICBmb3IgKCB1ID0gMTsgKHUgfCAwKSA8ICgoc2l6ZSAtIDEpIHwgMCk7IHUgPSAodSArIDEpIHwgMCkge1xuICAgICAgICAgICAgICAgIHlTdGFydDEgPSAob2Zmc2V0IC0gc2l6ZSkgfCAwO1xuICAgICAgICAgICAgICAgIHlTdGFydDIgPSAob2Zmc2V0ICsgc2l6ZSkgfCAwO1xuICAgICAgICAgICAgICAgIHhTdGFydDEgPSAodSAtIDEpIHwgMDtcbiAgICAgICAgICAgICAgICB4U3RhcnQyID0gKHUgKyAxKSB8IDA7XG4gICAgICAgICAgICAgICAgc3VtID0gKChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQxICsgeFN0YXJ0MSkgfCAwXSB8IDApXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDEgKyB4U3RhcnQyKSB8IDBdIHwgMClcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgb2Zmc2V0ICsgdSkgfCAwXSB8IDApXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDIgKyB4U3RhcnQxKSB8IDBdIHwgMClcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MiArIHhTdGFydDIpIHwgMF0gfCAwKSkgfCAwO1xuICAgICAgICAgICAgICAgIGlmICgoc3VtIHwgMCkgPT0gKDUgfCAwKSkge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZXNbKG91dEltYWdlUHRyICsgb2Zmc2V0ICsgdSkgfCAwXSA9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIG9mZnNldCArIHUpIHwgMF0gPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3VidHJhY3QoYUltYWdlUHRyLCBiSW1hZ2VQdHIsIG91dEltYWdlUHRyKSB7XG4gICAgICAgIGFJbWFnZVB0ciA9IGFJbWFnZVB0ciB8IDA7XG4gICAgICAgIGJJbWFnZVB0ciA9IGJJbWFnZVB0ciB8IDA7XG4gICAgICAgIG91dEltYWdlUHRyID0gb3V0SW1hZ2VQdHIgfCAwO1xuXG4gICAgICAgIHZhciBsZW5ndGggPSAwO1xuXG4gICAgICAgIGxlbmd0aCA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xuXG4gICAgICAgIHdoaWxlICgobGVuZ3RoIHwgMCkgPiAwKSB7XG4gICAgICAgICAgICBsZW5ndGggPSAobGVuZ3RoIC0gMSkgfCAwO1xuICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSA9XG4gICAgICAgICAgICAgICAgKChpbWFnZXNbKGFJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSB8IDApIC0gKGltYWdlc1soYkltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCkpIHwgMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJpdHdpc2VPcihhSW1hZ2VQdHIsIGJJbWFnZVB0ciwgb3V0SW1hZ2VQdHIpIHtcbiAgICAgICAgYUltYWdlUHRyID0gYUltYWdlUHRyIHwgMDtcbiAgICAgICAgYkltYWdlUHRyID0gYkltYWdlUHRyIHwgMDtcbiAgICAgICAgb3V0SW1hZ2VQdHIgPSBvdXRJbWFnZVB0ciB8IDA7XG5cbiAgICAgICAgdmFyIGxlbmd0aCA9IDA7XG5cbiAgICAgICAgbGVuZ3RoID0gaW11bChzaXplLCBzaXplKSB8IDA7XG5cbiAgICAgICAgd2hpbGUgKChsZW5ndGggfCAwKSA+IDApIHtcbiAgICAgICAgICAgIGxlbmd0aCA9IChsZW5ndGggLSAxKSB8IDA7XG4gICAgICAgICAgICBpbWFnZXNbKG91dEltYWdlUHRyICsgbGVuZ3RoKSB8IDBdID1cbiAgICAgICAgICAgICAgICAoKGltYWdlc1soYUltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCkgfCAoaW1hZ2VzWyhiSW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKSkgfCAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY291bnROb25aZXJvKGltYWdlUHRyKSB7XG4gICAgICAgIGltYWdlUHRyID0gaW1hZ2VQdHIgfCAwO1xuXG4gICAgICAgIHZhciBzdW0gPSAwLFxuICAgICAgICAgICAgbGVuZ3RoID0gMDtcblxuICAgICAgICBsZW5ndGggPSBpbXVsKHNpemUsIHNpemUpIHwgMDtcblxuICAgICAgICB3aGlsZSAoKGxlbmd0aCB8IDApID4gMCkge1xuICAgICAgICAgICAgbGVuZ3RoID0gKGxlbmd0aCAtIDEpIHwgMDtcbiAgICAgICAgICAgIHN1bSA9ICgoc3VtIHwgMCkgKyAoaW1hZ2VzWyhpbWFnZVB0ciArIGxlbmd0aCkgfCAwXSB8IDApKSB8IDA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKHN1bSB8IDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoaW1hZ2VQdHIsIHZhbHVlKSB7XG4gICAgICAgIGltYWdlUHRyID0gaW1hZ2VQdHIgfCAwO1xuICAgICAgICB2YWx1ZSA9IHZhbHVlIHwgMDtcblxuICAgICAgICB2YXIgbGVuZ3RoID0gMDtcblxuICAgICAgICBsZW5ndGggPSBpbXVsKHNpemUsIHNpemUpIHwgMDtcblxuICAgICAgICB3aGlsZSAoKGxlbmd0aCB8IDApID4gMCkge1xuICAgICAgICAgICAgbGVuZ3RoID0gKGxlbmd0aCAtIDEpIHwgMDtcbiAgICAgICAgICAgIGltYWdlc1soaW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpbGF0ZShpbkltYWdlUHRyLCBvdXRJbWFnZVB0cikge1xuICAgICAgICBpbkltYWdlUHRyID0gaW5JbWFnZVB0ciB8IDA7XG4gICAgICAgIG91dEltYWdlUHRyID0gb3V0SW1hZ2VQdHIgfCAwO1xuXG4gICAgICAgIHZhciB2ID0gMCxcbiAgICAgICAgICAgIHUgPSAwLFxuICAgICAgICAgICAgc3VtID0gMCxcbiAgICAgICAgICAgIHlTdGFydDEgPSAwLFxuICAgICAgICAgICAgeVN0YXJ0MiA9IDAsXG4gICAgICAgICAgICB4U3RhcnQxID0gMCxcbiAgICAgICAgICAgIHhTdGFydDIgPSAwLFxuICAgICAgICAgICAgb2Zmc2V0ID0gMDtcblxuICAgICAgICBmb3IgKCB2ID0gMTsgKHYgfCAwKSA8ICgoc2l6ZSAtIDEpIHwgMCk7IHYgPSAodiArIDEpIHwgMCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gKG9mZnNldCArIHNpemUpIHwgMDtcbiAgICAgICAgICAgIGZvciAoIHUgPSAxOyAodSB8IDApIDwgKChzaXplIC0gMSkgfCAwKTsgdSA9ICh1ICsgMSkgfCAwKSB7XG4gICAgICAgICAgICAgICAgeVN0YXJ0MSA9IChvZmZzZXQgLSBzaXplKSB8IDA7XG4gICAgICAgICAgICAgICAgeVN0YXJ0MiA9IChvZmZzZXQgKyBzaXplKSB8IDA7XG4gICAgICAgICAgICAgICAgeFN0YXJ0MSA9ICh1IC0gMSkgfCAwO1xuICAgICAgICAgICAgICAgIHhTdGFydDIgPSAodSArIDEpIHwgMDtcbiAgICAgICAgICAgICAgICBzdW0gPSAoKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDEgKyB4U3RhcnQxKSB8IDBdIHwgMClcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MSArIHhTdGFydDIpIHwgMF0gfCAwKVxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyBvZmZzZXQgKyB1KSB8IDBdIHwgMClcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MiArIHhTdGFydDEpIHwgMF0gfCAwKVxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQyICsgeFN0YXJ0MikgfCAwXSB8IDApKSB8IDA7XG4gICAgICAgICAgICAgICAgaWYgKChzdW0gfCAwKSA+ICgwIHwgMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIG9mZnNldCArIHUpIHwgMF0gPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlc1sob3V0SW1hZ2VQdHIgKyBvZmZzZXQgKyB1KSB8IDBdID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1lbWNweShzcmNJbWFnZVB0ciwgZHN0SW1hZ2VQdHIpIHtcbiAgICAgICAgc3JjSW1hZ2VQdHIgPSBzcmNJbWFnZVB0ciB8IDA7XG4gICAgICAgIGRzdEltYWdlUHRyID0gZHN0SW1hZ2VQdHIgfCAwO1xuXG4gICAgICAgIHZhciBsZW5ndGggPSAwO1xuXG4gICAgICAgIGxlbmd0aCA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xuXG4gICAgICAgIHdoaWxlICgobGVuZ3RoIHwgMCkgPiAwKSB7XG4gICAgICAgICAgICBsZW5ndGggPSAobGVuZ3RoIC0gMSkgfCAwO1xuICAgICAgICAgICAgaW1hZ2VzWyhkc3RJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSA9IChpbWFnZXNbKHNyY0ltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB6ZXJvQm9yZGVyKGltYWdlUHRyKSB7XG4gICAgICAgIGltYWdlUHRyID0gaW1hZ2VQdHIgfCAwO1xuXG4gICAgICAgIHZhciB4ID0gMCxcbiAgICAgICAgICAgIHkgPSAwO1xuXG4gICAgICAgIGZvciAoIHggPSAwOyAoeCB8IDApIDwgKChzaXplIC0gMSkgfCAwKTsgeCA9ICh4ICsgMSkgfCAwKSB7XG4gICAgICAgICAgICBpbWFnZXNbKGltYWdlUHRyICsgeCkgfCAwXSA9IDA7XG4gICAgICAgICAgICBpbWFnZXNbKGltYWdlUHRyICsgeSkgfCAwXSA9IDA7XG4gICAgICAgICAgICB5ID0gKCh5ICsgc2l6ZSkgLSAxKSB8IDA7XG4gICAgICAgICAgICBpbWFnZXNbKGltYWdlUHRyICsgeSkgfCAwXSA9IDA7XG4gICAgICAgICAgICB5ID0gKHkgKyAxKSB8IDA7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICggeCA9IDA7ICh4IHwgMCkgPCAoc2l6ZSB8IDApOyB4ID0gKHggKyAxKSB8IDApIHtcbiAgICAgICAgICAgIGltYWdlc1soaW1hZ2VQdHIgKyB5KSB8IDBdID0gMDtcbiAgICAgICAgICAgIHkgPSAoeSArIDEpIHwgMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNrZWxldG9uaXplKCkge1xuICAgICAgICB2YXIgc3ViSW1hZ2VQdHIgPSAwLFxuICAgICAgICAgICAgZXJvZGVkSW1hZ2VQdHIgPSAwLFxuICAgICAgICAgICAgdGVtcEltYWdlUHRyID0gMCxcbiAgICAgICAgICAgIHNrZWxJbWFnZVB0ciA9IDAsXG4gICAgICAgICAgICBzdW0gPSAwLFxuICAgICAgICAgICAgZG9uZSA9IDA7XG5cbiAgICAgICAgZXJvZGVkSW1hZ2VQdHIgPSBpbXVsKHNpemUsIHNpemUpIHwgMDtcbiAgICAgICAgdGVtcEltYWdlUHRyID0gKGVyb2RlZEltYWdlUHRyICsgZXJvZGVkSW1hZ2VQdHIpIHwgMDtcbiAgICAgICAgc2tlbEltYWdlUHRyID0gKHRlbXBJbWFnZVB0ciArIGVyb2RlZEltYWdlUHRyKSB8IDA7XG5cbiAgICAgICAgLy8gaW5pdCBza2VsLWltYWdlXG4gICAgICAgIGluaXQoc2tlbEltYWdlUHRyLCAwKTtcbiAgICAgICAgemVyb0JvcmRlcihzdWJJbWFnZVB0cik7XG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgZXJvZGUoc3ViSW1hZ2VQdHIsIGVyb2RlZEltYWdlUHRyKTtcbiAgICAgICAgICAgIGRpbGF0ZShlcm9kZWRJbWFnZVB0ciwgdGVtcEltYWdlUHRyKTtcbiAgICAgICAgICAgIHN1YnRyYWN0KHN1YkltYWdlUHRyLCB0ZW1wSW1hZ2VQdHIsIHRlbXBJbWFnZVB0cik7XG4gICAgICAgICAgICBiaXR3aXNlT3Ioc2tlbEltYWdlUHRyLCB0ZW1wSW1hZ2VQdHIsIHNrZWxJbWFnZVB0cik7XG4gICAgICAgICAgICBtZW1jcHkoZXJvZGVkSW1hZ2VQdHIsIHN1YkltYWdlUHRyKTtcbiAgICAgICAgICAgIHN1bSA9IGNvdW50Tm9uWmVybyhzdWJJbWFnZVB0cikgfCAwO1xuICAgICAgICAgICAgZG9uZSA9ICgoc3VtIHwgMCkgPT0gMCB8IDApO1xuICAgICAgICB9IHdoaWxlICghZG9uZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2tlbGV0b25pemU6IHNrZWxldG9uaXplXG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2tlbGV0b25pemVyO1xuLyogZXNsaW50LWVuYWJsZSBlcWVxZXEqL1xuLyogQHByZXNlcnZlIEFTTSBFTkQgKi9cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NrZWxldG9uaXplci5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBkcmF3UmVjdDogZnVuY3Rpb24ocG9zLCBzaXplLCBjdHgsIHN0eWxlKXtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3R5bGUuY29sb3I7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdHlsZS5jb2xvcjtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVJlY3QocG9zLngsIHBvcy55LCBzaXplLngsIHNpemUueSk7XG4gICAgfSxcbiAgICBkcmF3UGF0aDogZnVuY3Rpb24ocGF0aCwgZGVmLCBjdHgsIHN0eWxlKSB7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0eWxlLmNvbG9yO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gc3R5bGUuY29sb3I7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSBzdHlsZS5saW5lV2lkdGg7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyhwYXRoWzBdW2RlZi54XSwgcGF0aFswXVtkZWYueV0pO1xuICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IHBhdGgubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGN0eC5saW5lVG8ocGF0aFtqXVtkZWYueF0sIHBhdGhbal1bZGVmLnldKTtcbiAgICAgICAgfVxuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9LFxuICAgIGRyYXdJbWFnZTogZnVuY3Rpb24oaW1hZ2VEYXRhLCBzaXplLCBjdHgpIHtcbiAgICAgICAgdmFyIGNhbnZhc0RhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIHNpemUueCwgc2l6ZS55KSxcbiAgICAgICAgICAgIGRhdGEgPSBjYW52YXNEYXRhLmRhdGEsXG4gICAgICAgICAgICBpbWFnZURhdGFQb3MgPSBpbWFnZURhdGEubGVuZ3RoLFxuICAgICAgICAgICAgY2FudmFzRGF0YVBvcyA9IGRhdGEubGVuZ3RoLFxuICAgICAgICAgICAgdmFsdWU7XG5cbiAgICAgICAgaWYgKGNhbnZhc0RhdGFQb3MgLyBpbWFnZURhdGFQb3MgIT09IDQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoaW1hZ2VEYXRhUG9zLS0pe1xuICAgICAgICAgICAgdmFsdWUgPSBpbWFnZURhdGFbaW1hZ2VEYXRhUG9zXTtcbiAgICAgICAgICAgIGRhdGFbLS1jYW52YXNEYXRhUG9zXSA9IDI1NTtcbiAgICAgICAgICAgIGRhdGFbLS1jYW52YXNEYXRhUG9zXSA9IHZhbHVlO1xuICAgICAgICAgICAgZGF0YVstLWNhbnZhc0RhdGFQb3NdID0gdmFsdWU7XG4gICAgICAgICAgICBkYXRhWy0tY2FudmFzRGF0YVBvc10gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBjdHgucHV0SW1hZ2VEYXRhKGNhbnZhc0RhdGEsIDAsIDApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1hZ2VfZGVidWcuanNcbiAqKi8iLCJpbXBvcnQgQnJlc2VuaGFtIGZyb20gJy4vYnJlc2VuaGFtJztcbmltcG9ydCBJbWFnZURlYnVnIGZyb20gJy4vaW1hZ2VfZGVidWcnO1xuaW1wb3J0IENvZGUxMjhSZWFkZXIgZnJvbSAnLi9jb2RlXzEyOF9yZWFkZXInO1xuaW1wb3J0IEVBTlJlYWRlciBmcm9tICcuL2Vhbl9yZWFkZXInO1xuaW1wb3J0IENvZGUzOVJlYWRlciBmcm9tICcuL2NvZGVfMzlfcmVhZGVyJztcbmltcG9ydCBDb2RlMzlWSU5SZWFkZXIgZnJvbSAnLi9jb2RlXzM5X3Zpbl9yZWFkZXInO1xuaW1wb3J0IENvZGFiYXJSZWFkZXIgZnJvbSAnLi9jb2RhYmFyX3JlYWRlcic7XG5pbXBvcnQgVVBDUmVhZGVyIGZyb20gJy4vdXBjX3JlYWRlcic7XG5pbXBvcnQgRUFOOFJlYWRlciBmcm9tICcuL2Vhbl84X3JlYWRlcic7XG5pbXBvcnQgVVBDRVJlYWRlciBmcm9tICcuL3VwY19lX3JlYWRlcic7XG5pbXBvcnQgSTJvZjVSZWFkZXIgZnJvbSAnLi9pMm9mNV9yZWFkZXInO1xuXG5jb25zdCBSRUFERVJTID0ge1xuICAgIGNvZGVfMTI4X3JlYWRlcjogQ29kZTEyOFJlYWRlcixcbiAgICBlYW5fcmVhZGVyOiBFQU5SZWFkZXIsXG4gICAgZWFuXzhfcmVhZGVyOiBFQU44UmVhZGVyLFxuICAgIGNvZGVfMzlfcmVhZGVyOiBDb2RlMzlSZWFkZXIsXG4gICAgY29kZV8zOV92aW5fcmVhZGVyOiBDb2RlMzlWSU5SZWFkZXIsXG4gICAgY29kYWJhcl9yZWFkZXI6IENvZGFiYXJSZWFkZXIsXG4gICAgdXBjX3JlYWRlcjogVVBDUmVhZGVyLFxuICAgIHVwY19lX3JlYWRlcjogVVBDRVJlYWRlcixcbiAgICBpMm9mNV9yZWFkZXI6IEkyb2Y1UmVhZGVyXG59O1xuZXhwb3J0IGRlZmF1bHQge1xuICAgIGNyZWF0ZTogZnVuY3Rpb24oY29uZmlnLCBpbnB1dEltYWdlV3JhcHBlcikge1xuICAgICAgICB2YXIgX2NhbnZhcyA9IHtcbiAgICAgICAgICAgICAgICBjdHg6IHtcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiBudWxsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkb206IHtcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9iYXJjb2RlUmVhZGVycyA9IFtdO1xuXG4gICAgICAgIGluaXRDYW52YXMoKTtcbiAgICAgICAgaW5pdFJlYWRlcnMoKTtcbiAgICAgICAgaW5pdENvbmZpZygpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGluaXRDYW52YXMoKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHZhciAkZGVidWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlYnVnLmRldGVjdGlvblwiKTtcbiAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5mcmVxdWVuY3kgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzLmZyZXF1ZW5jeVwiKTtcbiAgICAgICAgICAgICAgICBpZiAoIV9jYW52YXMuZG9tLmZyZXF1ZW5jeSkge1xuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5mcmVxdWVuY3kgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5mcmVxdWVuY3kuY2xhc3NOYW1lID0gXCJmcmVxdWVuY3lcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRkZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGRlYnVnLmFwcGVuZENoaWxkKF9jYW52YXMuZG9tLmZyZXF1ZW5jeSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX2NhbnZhcy5jdHguZnJlcXVlbmN5ID0gX2NhbnZhcy5kb20uZnJlcXVlbmN5LmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgICAgICAgICAgIF9jYW52YXMuZG9tLnBhdHRlcm4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzLnBhdHRlcm5CdWZmZXJcIik7XG4gICAgICAgICAgICAgICAgaWYgKCFfY2FudmFzLmRvbS5wYXR0ZXJuKSB7XG4gICAgICAgICAgICAgICAgICAgIF9jYW52YXMuZG9tLnBhdHRlcm4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5wYXR0ZXJuLmNsYXNzTmFtZSA9IFwicGF0dGVybkJ1ZmZlclwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAoJGRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZGVidWcuYXBwZW5kQ2hpbGQoX2NhbnZhcy5kb20ucGF0dGVybik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX2NhbnZhcy5jdHgucGF0dGVybiA9IF9jYW52YXMuZG9tLnBhdHRlcm4uZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICAgICAgICAgICAgX2NhbnZhcy5kb20ub3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjYW52YXMuZHJhd2luZ0J1ZmZlclwiKTtcbiAgICAgICAgICAgICAgICBpZiAoX2NhbnZhcy5kb20ub3ZlcmxheSkge1xuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmN0eC5vdmVybGF5ID0gX2NhbnZhcy5kb20ub3ZlcmxheS5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaW5pdFJlYWRlcnMoKSB7XG4gICAgICAgICAgICBjb25maWcucmVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHJlYWRlckNvbmZpZykge1xuICAgICAgICAgICAgICAgIHZhciByZWFkZXIsXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24gPSB7fTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVhZGVyQ29uZmlnID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICByZWFkZXIgPSByZWFkZXJDb25maWcuZm9ybWF0O1xuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uID0gcmVhZGVyQ29uZmlnLmNvbmZpZztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZWFkZXJDb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlciA9IHJlYWRlckNvbmZpZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJCZWZvcmUgcmVnaXN0ZXJpbmcgcmVhZGVyOiBcIiwgcmVhZGVyKTtcbiAgICAgICAgICAgICAgICBfYmFyY29kZVJlYWRlcnMucHVzaChuZXcgUkVBREVSU1tyZWFkZXJdKGNvbmZpZ3VyYXRpb24pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWdpc3RlcmVkIFJlYWRlcnM6IFwiICsgX2JhcmNvZGVSZWFkZXJzXG4gICAgICAgICAgICAgICAgLm1hcCgocmVhZGVyKSA9PiBKU09OLnN0cmluZ2lmeSh7Zm9ybWF0OiByZWFkZXIuRk9STUFULCBjb25maWc6IHJlYWRlci5jb25maWd9KSlcbiAgICAgICAgICAgICAgICAuam9pbignLCAnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpbml0Q29uZmlnKCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgICAgICAgICAgdmlzID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGU6IF9jYW52YXMuZG9tLmZyZXF1ZW5jeSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IGNvbmZpZy5zaG93RnJlcXVlbmN5XG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGU6IF9jYW52YXMuZG9tLnBhdHRlcm4sXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBjb25maWcuc2hvd1BhdHRlcm5cbiAgICAgICAgICAgICAgICAgICAgfV07XG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdmlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNbaV0ucHJvcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlzW2ldLm5vZGUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc1tpXS5ub2RlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBleHRlbmQgdGhlIGxpbmUgb24gYm90aCBlbmRzXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpbmVcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGFuZ2xlXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBnZXRFeHRlbmRlZExpbmUobGluZSwgYW5nbGUsIGV4dCkge1xuICAgICAgICAgICAgZnVuY3Rpb24gZXh0ZW5kTGluZShhbW91bnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXh0ZW5zaW9uID0ge1xuICAgICAgICAgICAgICAgICAgICB5OiBhbW91bnQgKiBNYXRoLnNpbihhbmdsZSksXG4gICAgICAgICAgICAgICAgICAgIHg6IGFtb3VudCAqIE1hdGguY29zKGFuZ2xlKVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBsaW5lWzBdLnkgLT0gZXh0ZW5zaW9uLnk7XG4gICAgICAgICAgICAgICAgbGluZVswXS54IC09IGV4dGVuc2lvbi54O1xuICAgICAgICAgICAgICAgIGxpbmVbMV0ueSArPSBleHRlbnNpb24ueTtcbiAgICAgICAgICAgICAgICBsaW5lWzFdLnggKz0gZXh0ZW5zaW9uLng7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGluc2lkZSBpbWFnZVxuICAgICAgICAgICAgZXh0ZW5kTGluZShleHQpO1xuICAgICAgICAgICAgd2hpbGUgKGV4dCA+IDEgJiYgKCFpbnB1dEltYWdlV3JhcHBlci5pbkltYWdlV2l0aEJvcmRlcihsaW5lWzBdLCAwKVxuICAgICAgICAgICAgICAgICAgICB8fCAhaW5wdXRJbWFnZVdyYXBwZXIuaW5JbWFnZVdpdGhCb3JkZXIobGluZVsxXSwgMCkpKSB7XG4gICAgICAgICAgICAgICAgZXh0IC09IE1hdGguY2VpbChleHQgLyAyKTtcbiAgICAgICAgICAgICAgICBleHRlbmRMaW5lKC1leHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxpbmU7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRMaW5lKGJveCkge1xuICAgICAgICAgICAgcmV0dXJuIFt7XG4gICAgICAgICAgICAgICAgeDogKGJveFsxXVswXSAtIGJveFswXVswXSkgLyAyICsgYm94WzBdWzBdLFxuICAgICAgICAgICAgICAgIHk6IChib3hbMV1bMV0gLSBib3hbMF1bMV0pIC8gMiArIGJveFswXVsxXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHg6IChib3hbM11bMF0gLSBib3hbMl1bMF0pIC8gMiArIGJveFsyXVswXSxcbiAgICAgICAgICAgICAgICB5OiAoYm94WzNdWzFdIC0gYm94WzJdWzFdKSAvIDIgKyBib3hbMl1bMV1cbiAgICAgICAgICAgIH1dO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdHJ5RGVjb2RlKGxpbmUpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBudWxsLFxuICAgICAgICAgICAgICAgIGksXG4gICAgICAgICAgICAgICAgYmFyY29kZUxpbmUgPSBCcmVzZW5oYW0uZ2V0QmFyY29kZUxpbmUoaW5wdXRJbWFnZVdyYXBwZXIsIGxpbmVbMF0sIGxpbmVbMV0pO1xuXG4gICAgICAgICAgICBpZiAoY29uZmlnLnNob3dGcmVxdWVuY3kpIHtcbiAgICAgICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdQYXRoKGxpbmUsIHt4OiAneCcsIHk6ICd5J30sIF9jYW52YXMuY3R4Lm92ZXJsYXksIHtjb2xvcjogJ3JlZCcsIGxpbmVXaWR0aDogM30pO1xuICAgICAgICAgICAgICAgIEJyZXNlbmhhbS5kZWJ1Zy5wcmludEZyZXF1ZW5jeShiYXJjb2RlTGluZS5saW5lLCBfY2FudmFzLmRvbS5mcmVxdWVuY3kpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQnJlc2VuaGFtLnRvQmluYXJ5TGluZShiYXJjb2RlTGluZSk7XG4gICAgICAgICAgICBpZiAoY29uZmlnLnNob3dQYXR0ZXJuKSB7XG4gICAgICAgICAgICAgICAgQnJlc2VuaGFtLmRlYnVnLnByaW50UGF0dGVybihiYXJjb2RlTGluZS5saW5lLCBfY2FudmFzLmRvbS5wYXR0ZXJuKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCBfYmFyY29kZVJlYWRlcnMubGVuZ3RoICYmIHJlc3VsdCA9PT0gbnVsbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gX2JhcmNvZGVSZWFkZXJzW2ldLmRlY29kZVBhdHRlcm4oYmFyY29kZUxpbmUubGluZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY29kZVJlc3VsdDogcmVzdWx0LFxuICAgICAgICAgICAgICAgIGJhcmNvZGVMaW5lOiBiYXJjb2RlTGluZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIG1ldGhvZCBzbGljZXMgdGhlIGdpdmVuIGFyZWEgYXBhcnQgYW5kIHRyaWVzIHRvIGRldGVjdCBhIGJhcmNvZGUtcGF0dGVyblxuICAgICAgICAgKiBmb3IgZWFjaCBzbGljZS4gSXQgcmV0dXJucyB0aGUgZGVjb2RlZCBiYXJjb2RlLCBvciBudWxsIGlmIG5vdGhpbmcgd2FzIGZvdW5kXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGJveFxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBsaW5lXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsaW5lQW5nbGVcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIHRyeURlY29kZUJydXRlRm9yY2UoYm94LCBsaW5lLCBsaW5lQW5nbGUpIHtcbiAgICAgICAgICAgIHZhciBzaWRlTGVuZ3RoID0gTWF0aC5zcXJ0KE1hdGgucG93KGJveFsxXVswXSAtIGJveFswXVswXSwgMikgKyBNYXRoLnBvdygoYm94WzFdWzFdIC0gYm94WzBdWzFdKSwgMikpLFxuICAgICAgICAgICAgICAgIGksXG4gICAgICAgICAgICAgICAgc2xpY2VzID0gMTYsXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbnVsbCxcbiAgICAgICAgICAgICAgICBkaXIsXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uLFxuICAgICAgICAgICAgICAgIHhkaXIgPSBNYXRoLnNpbihsaW5lQW5nbGUpLFxuICAgICAgICAgICAgICAgIHlkaXIgPSBNYXRoLmNvcyhsaW5lQW5nbGUpO1xuXG4gICAgICAgICAgICBmb3IgKCBpID0gMTsgaSA8IHNsaWNlcyAmJiByZXN1bHQgPT09IG51bGw7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vIG1vdmUgbGluZSBwZXJwZW5kaWN1bGFyIHRvIGFuZ2xlXG4gICAgICAgICAgICAgICAgZGlyID0gc2lkZUxlbmd0aCAvIHNsaWNlcyAqIGkgKiAoaSAlIDIgPT09IDAgPyAtMSA6IDEpO1xuICAgICAgICAgICAgICAgIGV4dGVuc2lvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgeTogZGlyICogeGRpcixcbiAgICAgICAgICAgICAgICAgICAgeDogZGlyICogeWRpclxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbGluZVswXS55ICs9IGV4dGVuc2lvbi54O1xuICAgICAgICAgICAgICAgIGxpbmVbMF0ueCAtPSBleHRlbnNpb24ueTtcbiAgICAgICAgICAgICAgICBsaW5lWzFdLnkgKz0gZXh0ZW5zaW9uLng7XG4gICAgICAgICAgICAgICAgbGluZVsxXS54IC09IGV4dGVuc2lvbi55O1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ5RGVjb2RlKGxpbmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldExpbmVMZW5ndGgobGluZSkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydChcbiAgICAgICAgICAgICAgICBNYXRoLnBvdyhNYXRoLmFicyhsaW5lWzFdLnkgLSBsaW5lWzBdLnkpLCAyKSArXG4gICAgICAgICAgICAgICAgTWF0aC5wb3coTWF0aC5hYnMobGluZVsxXS54IC0gbGluZVswXS54KSwgMikpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdpdGggdGhlIGhlbHAgb2YgdGhlIGNvbmZpZ3VyZWQgcmVhZGVycyAoQ29kZTEyOCBvciBFQU4pIHRoaXMgZnVuY3Rpb24gdHJpZXMgdG8gZGV0ZWN0IGFcbiAgICAgICAgICogdmFsaWQgYmFyY29kZSBwYXR0ZXJuIHdpdGhpbiB0aGUgZ2l2ZW4gYXJlYS5cbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGJveCBUaGUgYXJlYSB0byBzZWFyY2ggaW5cbiAgICAgICAgICogQHJldHVybnMge09iamVjdH0gdGhlIHJlc3VsdCB7Y29kZVJlc3VsdCwgbGluZSwgYW5nbGUsIHBhdHRlcm4sIHRocmVzaG9sZH1cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGRlY29kZUZyb21Cb3VuZGluZ0JveChib3gpIHtcbiAgICAgICAgICAgIHZhciBsaW5lLFxuICAgICAgICAgICAgICAgIGxpbmVBbmdsZSxcbiAgICAgICAgICAgICAgICBjdHggPSBfY2FudmFzLmN0eC5vdmVybGF5LFxuICAgICAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgICAgICBsaW5lTGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAoY29uZmlnLmRyYXdCb3VuZGluZ0JveCAmJiBjdHgpIHtcbiAgICAgICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdQYXRoKGJveCwge3g6IDAsIHk6IDF9LCBjdHgsIHtjb2xvcjogXCJibHVlXCIsIGxpbmVXaWR0aDogMn0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsaW5lID0gZ2V0TGluZShib3gpO1xuICAgICAgICAgICAgbGluZUxlbmd0aCA9IGdldExpbmVMZW5ndGgobGluZSk7XG4gICAgICAgICAgICBsaW5lQW5nbGUgPSBNYXRoLmF0YW4yKGxpbmVbMV0ueSAtIGxpbmVbMF0ueSwgbGluZVsxXS54IC0gbGluZVswXS54KTtcbiAgICAgICAgICAgIGxpbmUgPSBnZXRFeHRlbmRlZExpbmUobGluZSwgbGluZUFuZ2xlLCBNYXRoLmZsb29yKGxpbmVMZW5ndGggKiAwLjEpKTtcbiAgICAgICAgICAgIGlmIChsaW5lID09PSBudWxsKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzdWx0ID0gdHJ5RGVjb2RlKGxpbmUpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRyeURlY29kZUJydXRlRm9yY2UoYm94LCBsaW5lLCBsaW5lQW5nbGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgY29uZmlnLmRyYXdTY2FubGluZSAmJiBjdHgpIHtcbiAgICAgICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdQYXRoKGxpbmUsIHt4OiAneCcsIHk6ICd5J30sIGN0eCwge2NvbG9yOiAncmVkJywgbGluZVdpZHRoOiAzfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY29kZVJlc3VsdDogcmVzdWx0LmNvZGVSZXN1bHQsXG4gICAgICAgICAgICAgICAgbGluZTogbGluZSxcbiAgICAgICAgICAgICAgICBhbmdsZTogbGluZUFuZ2xlLFxuICAgICAgICAgICAgICAgIHBhdHRlcm46IHJlc3VsdC5iYXJjb2RlTGluZS5saW5lLFxuICAgICAgICAgICAgICAgIHRocmVzaG9sZDogcmVzdWx0LmJhcmNvZGVMaW5lLnRocmVzaG9sZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkZWNvZGVGcm9tQm91bmRpbmdCb3g6IGZ1bmN0aW9uKGJveCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGVGcm9tQm91bmRpbmdCb3goYm94KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWNvZGVGcm9tQm91bmRpbmdCb3hlczogZnVuY3Rpb24oYm94ZXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwgcmVzdWx0O1xuICAgICAgICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgYm94ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZGVjb2RlRnJvbUJvdW5kaW5nQm94KGJveGVzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuY29kZVJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmJveCA9IGJveGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRSZWFkZXJzOiBmdW5jdGlvbihyZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLnJlYWRlcnMgPSByZWFkZXJzO1xuICAgICAgICAgICAgICAgIF9iYXJjb2RlUmVhZGVycy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgIGluaXRSZWFkZXJzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JhcmNvZGVfZGVjb2Rlci5qc1xuICoqLyIsImltcG9ydCBDVlV0aWxzIGZyb20gJy4vY3ZfdXRpbHMnO1xuaW1wb3J0IEltYWdlV3JhcHBlciBmcm9tICcuL2ltYWdlX3dyYXBwZXInO1xuXG52YXIgQnJlc2VuaGFtID0ge307XG5cbnZhciBTbG9wZSA9IHtcbiAgICBESVI6IHtcbiAgICAgICAgVVA6IDEsXG4gICAgICAgIERPV046IC0xXG4gICAgfVxufTtcbi8qKlxuICogU2NhbnMgYSBsaW5lIG9mIHRoZSBnaXZlbiBpbWFnZSBmcm9tIHBvaW50IHAxIHRvIHAyIGFuZCByZXR1cm5zIGEgcmVzdWx0IG9iamVjdCBjb250YWluaW5nXG4gKiBncmF5LXNjYWxlIHZhbHVlcyAoMC0yNTUpIG9mIHRoZSB1bmRlcmx5aW5nIHBpeGVscyBpbiBhZGRpdGlvbiB0byB0aGUgbWluXG4gKiBhbmQgbWF4IHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpbWFnZVdyYXBwZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwMSBUaGUgc3RhcnQgcG9pbnQge3gseX1cbiAqIEBwYXJhbSB7T2JqZWN0fSBwMiBUaGUgZW5kIHBvaW50IHt4LHl9XG4gKiBAcmV0dXJucyB7bGluZSwgbWluLCBtYXh9XG4gKi9cbkJyZXNlbmhhbS5nZXRCYXJjb2RlTGluZSA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgcDEsIHAyKSB7XG4gICAgdmFyIHgwID0gcDEueCB8IDAsXG4gICAgICAgIHkwID0gcDEueSB8IDAsXG4gICAgICAgIHgxID0gcDIueCB8IDAsXG4gICAgICAgIHkxID0gcDIueSB8IDAsXG4gICAgICAgIHN0ZWVwID0gTWF0aC5hYnMoeTEgLSB5MCkgPiBNYXRoLmFicyh4MSAtIHgwKSxcbiAgICAgICAgZGVsdGF4LFxuICAgICAgICBkZWx0YXksXG4gICAgICAgIGVycm9yLFxuICAgICAgICB5c3RlcCxcbiAgICAgICAgeSxcbiAgICAgICAgdG1wLFxuICAgICAgICB4LFxuICAgICAgICBsaW5lID0gW10sXG4gICAgICAgIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhLFxuICAgICAgICB3aWR0aCA9IGltYWdlV3JhcHBlci5zaXplLngsXG4gICAgICAgIHN1bSA9IDAsXG4gICAgICAgIHZhbCxcbiAgICAgICAgbWluID0gMjU1LFxuICAgICAgICBtYXggPSAwO1xuXG4gICAgZnVuY3Rpb24gcmVhZChhLCBiKSB7XG4gICAgICAgIHZhbCA9IGltYWdlRGF0YVtiICogd2lkdGggKyBhXTtcbiAgICAgICAgc3VtICs9IHZhbDtcbiAgICAgICAgbWluID0gdmFsIDwgbWluID8gdmFsIDogbWluO1xuICAgICAgICBtYXggPSB2YWwgPiBtYXggPyB2YWwgOiBtYXg7XG4gICAgICAgIGxpbmUucHVzaCh2YWwpO1xuICAgIH1cblxuICAgIGlmIChzdGVlcCkge1xuICAgICAgICB0bXAgPSB4MDtcbiAgICAgICAgeDAgPSB5MDtcbiAgICAgICAgeTAgPSB0bXA7XG5cbiAgICAgICAgdG1wID0geDE7XG4gICAgICAgIHgxID0geTE7XG4gICAgICAgIHkxID0gdG1wO1xuICAgIH1cbiAgICBpZiAoeDAgPiB4MSkge1xuICAgICAgICB0bXAgPSB4MDtcbiAgICAgICAgeDAgPSB4MTtcbiAgICAgICAgeDEgPSB0bXA7XG5cbiAgICAgICAgdG1wID0geTA7XG4gICAgICAgIHkwID0geTE7XG4gICAgICAgIHkxID0gdG1wO1xuICAgIH1cbiAgICBkZWx0YXggPSB4MSAtIHgwO1xuICAgIGRlbHRheSA9IE1hdGguYWJzKHkxIC0geTApO1xuICAgIGVycm9yID0gKGRlbHRheCAvIDIpIHwgMDtcbiAgICB5ID0geTA7XG4gICAgeXN0ZXAgPSB5MCA8IHkxID8gMSA6IC0xO1xuICAgIGZvciAoIHggPSB4MDsgeCA8IHgxOyB4KyspIHtcbiAgICAgICAgaWYgKHN0ZWVwKXtcbiAgICAgICAgICAgIHJlYWQoeSwgeCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWFkKHgsIHkpO1xuICAgICAgICB9XG4gICAgICAgIGVycm9yID0gZXJyb3IgLSBkZWx0YXk7XG4gICAgICAgIGlmIChlcnJvciA8IDApIHtcbiAgICAgICAgICAgIHkgPSB5ICsgeXN0ZXA7XG4gICAgICAgICAgICBlcnJvciA9IGVycm9yICsgZGVsdGF4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGluZTogbGluZSxcbiAgICAgICAgbWluOiBtaW4sXG4gICAgICAgIG1heDogbWF4XG4gICAgfTtcbn07XG5cbkJyZXNlbmhhbS50b090c3VCaW5hcnlMaW5lID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgdmFyIGxpbmUgPSByZXN1bHQubGluZSxcbiAgICAgICAgaW1hZ2UgPSBuZXcgSW1hZ2VXcmFwcGVyKHt4OiBsaW5lLmxlbmd0aCAtIDEsIHk6IDF9LCBsaW5lKSxcbiAgICAgICAgdGhyZXNob2xkID0gQ1ZVdGlscy5kZXRlcm1pbmVPdHN1VGhyZXNob2xkKGltYWdlLCA1KTtcblxuICAgIGxpbmUgPSBDVlV0aWxzLnNoYXJwZW5MaW5lKGxpbmUpO1xuICAgIENWVXRpbHMudGhyZXNob2xkSW1hZ2UoaW1hZ2UsIHRocmVzaG9sZCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBsaW5lOiBsaW5lLFxuICAgICAgICB0aHJlc2hvbGQ6IHRocmVzaG9sZFxuICAgIH07XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIHRoZSByZXN1bHQgZnJvbSBnZXRCYXJjb2RlTGluZSBpbnRvIGEgYmluYXJ5IHJlcHJlc2VudGF0aW9uXG4gKiBhbHNvIGNvbnNpZGVyaW5nIHRoZSBmcmVxdWVuY3kgYW5kIHNsb3BlIG9mIHRoZSBzaWduYWwgZm9yIG1vcmUgcm9idXN0IHJlc3VsdHNcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXN1bHQge2xpbmUsIG1pbiwgbWF4fVxuICovXG5CcmVzZW5oYW0udG9CaW5hcnlMaW5lID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgdmFyIG1pbiA9IHJlc3VsdC5taW4sXG4gICAgICAgIG1heCA9IHJlc3VsdC5tYXgsXG4gICAgICAgIGxpbmUgPSByZXN1bHQubGluZSxcbiAgICAgICAgc2xvcGUsXG4gICAgICAgIHNsb3BlMixcbiAgICAgICAgY2VudGVyID0gbWluICsgKG1heCAtIG1pbikgLyAyLFxuICAgICAgICBleHRyZW1hID0gW10sXG4gICAgICAgIGN1cnJlbnREaXIsXG4gICAgICAgIGRpcixcbiAgICAgICAgdGhyZXNob2xkID0gKG1heCAtIG1pbikgLyAxMixcbiAgICAgICAgclRocmVzaG9sZCA9IC10aHJlc2hvbGQsXG4gICAgICAgIGksXG4gICAgICAgIGo7XG5cbiAgICAvLyAxLiBmaW5kIGV4dHJlbWFcbiAgICBjdXJyZW50RGlyID0gbGluZVswXSA+IGNlbnRlciA/IFNsb3BlLkRJUi5VUCA6IFNsb3BlLkRJUi5ET1dOO1xuICAgIGV4dHJlbWEucHVzaCh7XG4gICAgICAgIHBvczogMCxcbiAgICAgICAgdmFsOiBsaW5lWzBdXG4gICAgfSk7XG4gICAgZm9yICggaSA9IDA7IGkgPCBsaW5lLmxlbmd0aCAtIDI7IGkrKykge1xuICAgICAgICBzbG9wZSA9IChsaW5lW2kgKyAxXSAtIGxpbmVbaV0pO1xuICAgICAgICBzbG9wZTIgPSAobGluZVtpICsgMl0gLSBsaW5lW2kgKyAxXSk7XG4gICAgICAgIGlmICgoc2xvcGUgKyBzbG9wZTIpIDwgclRocmVzaG9sZCAmJiBsaW5lW2kgKyAxXSA8IChjZW50ZXIgKiAxLjUpKSB7XG4gICAgICAgICAgICBkaXIgPSBTbG9wZS5ESVIuRE9XTjtcbiAgICAgICAgfSBlbHNlIGlmICgoc2xvcGUgKyBzbG9wZTIpID4gdGhyZXNob2xkICYmIGxpbmVbaSArIDFdID4gKGNlbnRlciAqIDAuNSkpIHtcbiAgICAgICAgICAgIGRpciA9IFNsb3BlLkRJUi5VUDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRpciA9IGN1cnJlbnREaXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VycmVudERpciAhPT0gZGlyKSB7XG4gICAgICAgICAgICBleHRyZW1hLnB1c2goe1xuICAgICAgICAgICAgICAgIHBvczogaSxcbiAgICAgICAgICAgICAgICB2YWw6IGxpbmVbaV1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY3VycmVudERpciA9IGRpcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBleHRyZW1hLnB1c2goe1xuICAgICAgICBwb3M6IGxpbmUubGVuZ3RoLFxuICAgICAgICB2YWw6IGxpbmVbbGluZS5sZW5ndGggLSAxXVxuICAgIH0pO1xuXG4gICAgZm9yICggaiA9IGV4dHJlbWFbMF0ucG9zOyBqIDwgZXh0cmVtYVsxXS5wb3M7IGorKykge1xuICAgICAgICBsaW5lW2pdID0gbGluZVtqXSA+IGNlbnRlciA/IDAgOiAxO1xuICAgIH1cblxuICAgIC8vIGl0ZXJhdGUgb3ZlciBleHRyZW1hIGFuZCBjb252ZXJ0IHRvIGJpbmFyeSBiYXNlZCBvbiBhdmcgYmV0d2VlbiBtaW5tYXhcbiAgICBmb3IgKCBpID0gMTsgaSA8IGV4dHJlbWEubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIGlmIChleHRyZW1hW2kgKyAxXS52YWwgPiBleHRyZW1hW2ldLnZhbCkge1xuICAgICAgICAgICAgdGhyZXNob2xkID0gKGV4dHJlbWFbaV0udmFsICsgKChleHRyZW1hW2kgKyAxXS52YWwgLSBleHRyZW1hW2ldLnZhbCkgLyAzKSAqIDIpIHwgMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocmVzaG9sZCA9IChleHRyZW1hW2kgKyAxXS52YWwgKyAoKGV4dHJlbWFbaV0udmFsIC0gZXh0cmVtYVtpICsgMV0udmFsKSAvIDMpKSB8IDA7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKCBqID0gZXh0cmVtYVtpXS5wb3M7IGogPCBleHRyZW1hW2kgKyAxXS5wb3M7IGorKykge1xuICAgICAgICAgICAgbGluZVtqXSA9IGxpbmVbal0gPiB0aHJlc2hvbGQgPyAwIDogMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGxpbmU6IGxpbmUsXG4gICAgICAgIHRocmVzaG9sZDogdGhyZXNob2xkXG4gICAgfTtcbn07XG5cbi8qKlxuICogVXNlZCBmb3IgZGV2ZWxvcG1lbnQgb25seVxuICovXG5CcmVzZW5oYW0uZGVidWcgPSB7XG4gICAgcHJpbnRGcmVxdWVuY3k6IGZ1bmN0aW9uKGxpbmUsIGNhbnZhcykge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGxpbmUubGVuZ3RoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gMjU2O1xuXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJibHVlXCI7XG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgbGluZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY3R4Lm1vdmVUbyhpLCAyNTUpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhpLCAyNTUgLSBsaW5lW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9LFxuXG4gICAgcHJpbnRQYXR0ZXJuOiBmdW5jdGlvbihsaW5lLCBjYW52YXMpIHtcbiAgICAgICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiksIGk7XG5cbiAgICAgICAgY2FudmFzLndpZHRoID0gbGluZS5sZW5ndGg7XG4gICAgICAgIGN0eC5maWxsQ29sb3IgPSBcImJsYWNrXCI7XG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgbGluZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGxpbmVbaV0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoaSwgMCwgMSwgMTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJyZXNlbmhhbTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JyZXNlbmhhbS5qc1xuICoqLyIsImltcG9ydCBCYXJjb2RlUmVhZGVyIGZyb20gJy4vYmFyY29kZV9yZWFkZXInO1xuXG5mdW5jdGlvbiBDb2RlMTI4UmVhZGVyKCkge1xuICAgIEJhcmNvZGVSZWFkZXIuY2FsbCh0aGlzKTtcbn1cblxudmFyIHByb3BlcnRpZXMgPSB7XG4gICAgQ09ERV9TSElGVDoge3ZhbHVlOiA5OH0sXG4gICAgQ09ERV9DOiB7dmFsdWU6IDk5fSxcbiAgICBDT0RFX0I6IHt2YWx1ZTogMTAwfSxcbiAgICBDT0RFX0E6IHt2YWx1ZTogMTAxfSxcbiAgICBTVEFSVF9DT0RFX0E6IHt2YWx1ZTogMTAzfSxcbiAgICBTVEFSVF9DT0RFX0I6IHt2YWx1ZTogMTA0fSxcbiAgICBTVEFSVF9DT0RFX0M6IHt2YWx1ZTogMTA1fSxcbiAgICBTVE9QX0NPREU6IHt2YWx1ZTogMTA2fSxcbiAgICBNT0RVTE86IHt2YWx1ZTogMTF9LFxuICAgIENPREVfUEFUVEVSTjoge3ZhbHVlOiBbXG4gICAgICAgIFsyLCAxLCAyLCAyLCAyLCAyXSxcbiAgICAgICAgWzIsIDIsIDIsIDEsIDIsIDJdLFxuICAgICAgICBbMiwgMiwgMiwgMiwgMiwgMV0sXG4gICAgICAgIFsxLCAyLCAxLCAyLCAyLCAzXSxcbiAgICAgICAgWzEsIDIsIDEsIDMsIDIsIDJdLFxuICAgICAgICBbMSwgMywgMSwgMiwgMiwgMl0sXG4gICAgICAgIFsxLCAyLCAyLCAyLCAxLCAzXSxcbiAgICAgICAgWzEsIDIsIDIsIDMsIDEsIDJdLFxuICAgICAgICBbMSwgMywgMiwgMiwgMSwgMl0sXG4gICAgICAgIFsyLCAyLCAxLCAyLCAxLCAzXSxcbiAgICAgICAgWzIsIDIsIDEsIDMsIDEsIDJdLFxuICAgICAgICBbMiwgMywgMSwgMiwgMSwgMl0sXG4gICAgICAgIFsxLCAxLCAyLCAyLCAzLCAyXSxcbiAgICAgICAgWzEsIDIsIDIsIDEsIDMsIDJdLFxuICAgICAgICBbMSwgMiwgMiwgMiwgMywgMV0sXG4gICAgICAgIFsxLCAxLCAzLCAyLCAyLCAyXSxcbiAgICAgICAgWzEsIDIsIDMsIDEsIDIsIDJdLFxuICAgICAgICBbMSwgMiwgMywgMiwgMiwgMV0sXG4gICAgICAgIFsyLCAyLCAzLCAyLCAxLCAxXSxcbiAgICAgICAgWzIsIDIsIDEsIDEsIDMsIDJdLFxuICAgICAgICBbMiwgMiwgMSwgMiwgMywgMV0sXG4gICAgICAgIFsyLCAxLCAzLCAyLCAxLCAyXSxcbiAgICAgICAgWzIsIDIsIDMsIDEsIDEsIDJdLFxuICAgICAgICBbMywgMSwgMiwgMSwgMywgMV0sXG4gICAgICAgIFszLCAxLCAxLCAyLCAyLCAyXSxcbiAgICAgICAgWzMsIDIsIDEsIDEsIDIsIDJdLFxuICAgICAgICBbMywgMiwgMSwgMiwgMiwgMV0sXG4gICAgICAgIFszLCAxLCAyLCAyLCAxLCAyXSxcbiAgICAgICAgWzMsIDIsIDIsIDEsIDEsIDJdLFxuICAgICAgICBbMywgMiwgMiwgMiwgMSwgMV0sXG4gICAgICAgIFsyLCAxLCAyLCAxLCAyLCAzXSxcbiAgICAgICAgWzIsIDEsIDIsIDMsIDIsIDFdLFxuICAgICAgICBbMiwgMywgMiwgMSwgMiwgMV0sXG4gICAgICAgIFsxLCAxLCAxLCAzLCAyLCAzXSxcbiAgICAgICAgWzEsIDMsIDEsIDEsIDIsIDNdLFxuICAgICAgICBbMSwgMywgMSwgMywgMiwgMV0sXG4gICAgICAgIFsxLCAxLCAyLCAzLCAxLCAzXSxcbiAgICAgICAgWzEsIDMsIDIsIDEsIDEsIDNdLFxuICAgICAgICBbMSwgMywgMiwgMywgMSwgMV0sXG4gICAgICAgIFsyLCAxLCAxLCAzLCAxLCAzXSxcbiAgICAgICAgWzIsIDMsIDEsIDEsIDEsIDNdLFxuICAgICAgICBbMiwgMywgMSwgMywgMSwgMV0sXG4gICAgICAgIFsxLCAxLCAyLCAxLCAzLCAzXSxcbiAgICAgICAgWzEsIDEsIDIsIDMsIDMsIDFdLFxuICAgICAgICBbMSwgMywgMiwgMSwgMywgMV0sXG4gICAgICAgIFsxLCAxLCAzLCAxLCAyLCAzXSxcbiAgICAgICAgWzEsIDEsIDMsIDMsIDIsIDFdLFxuICAgICAgICBbMSwgMywgMywgMSwgMiwgMV0sXG4gICAgICAgIFszLCAxLCAzLCAxLCAyLCAxXSxcbiAgICAgICAgWzIsIDEsIDEsIDMsIDMsIDFdLFxuICAgICAgICBbMiwgMywgMSwgMSwgMywgMV0sXG4gICAgICAgIFsyLCAxLCAzLCAxLCAxLCAzXSxcbiAgICAgICAgWzIsIDEsIDMsIDMsIDEsIDFdLFxuICAgICAgICBbMiwgMSwgMywgMSwgMywgMV0sXG4gICAgICAgIFszLCAxLCAxLCAxLCAyLCAzXSxcbiAgICAgICAgWzMsIDEsIDEsIDMsIDIsIDFdLFxuICAgICAgICBbMywgMywgMSwgMSwgMiwgMV0sXG4gICAgICAgIFszLCAxLCAyLCAxLCAxLCAzXSxcbiAgICAgICAgWzMsIDEsIDIsIDMsIDEsIDFdLFxuICAgICAgICBbMywgMywgMiwgMSwgMSwgMV0sXG4gICAgICAgIFszLCAxLCA0LCAxLCAxLCAxXSxcbiAgICAgICAgWzIsIDIsIDEsIDQsIDEsIDFdLFxuICAgICAgICBbNCwgMywgMSwgMSwgMSwgMV0sXG4gICAgICAgIFsxLCAxLCAxLCAyLCAyLCA0XSxcbiAgICAgICAgWzEsIDEsIDEsIDQsIDIsIDJdLFxuICAgICAgICBbMSwgMiwgMSwgMSwgMiwgNF0sXG4gICAgICAgIFsxLCAyLCAxLCA0LCAyLCAxXSxcbiAgICAgICAgWzEsIDQsIDEsIDEsIDIsIDJdLFxuICAgICAgICBbMSwgNCwgMSwgMiwgMiwgMV0sXG4gICAgICAgIFsxLCAxLCAyLCAyLCAxLCA0XSxcbiAgICAgICAgWzEsIDEsIDIsIDQsIDEsIDJdLFxuICAgICAgICBbMSwgMiwgMiwgMSwgMSwgNF0sXG4gICAgICAgIFsxLCAyLCAyLCA0LCAxLCAxXSxcbiAgICAgICAgWzEsIDQsIDIsIDEsIDEsIDJdLFxuICAgICAgICBbMSwgNCwgMiwgMiwgMSwgMV0sXG4gICAgICAgIFsyLCA0LCAxLCAyLCAxLCAxXSxcbiAgICAgICAgWzIsIDIsIDEsIDEsIDEsIDRdLFxuICAgICAgICBbNCwgMSwgMywgMSwgMSwgMV0sXG4gICAgICAgIFsyLCA0LCAxLCAxLCAxLCAyXSxcbiAgICAgICAgWzEsIDMsIDQsIDEsIDEsIDFdLFxuICAgICAgICBbMSwgMSwgMSwgMiwgNCwgMl0sXG4gICAgICAgIFsxLCAyLCAxLCAxLCA0LCAyXSxcbiAgICAgICAgWzEsIDIsIDEsIDIsIDQsIDFdLFxuICAgICAgICBbMSwgMSwgNCwgMiwgMSwgMl0sXG4gICAgICAgIFsxLCAyLCA0LCAxLCAxLCAyXSxcbiAgICAgICAgWzEsIDIsIDQsIDIsIDEsIDFdLFxuICAgICAgICBbNCwgMSwgMSwgMiwgMSwgMl0sXG4gICAgICAgIFs0LCAyLCAxLCAxLCAxLCAyXSxcbiAgICAgICAgWzQsIDIsIDEsIDIsIDEsIDFdLFxuICAgICAgICBbMiwgMSwgMiwgMSwgNCwgMV0sXG4gICAgICAgIFsyLCAxLCA0LCAxLCAyLCAxXSxcbiAgICAgICAgWzQsIDEsIDIsIDEsIDIsIDFdLFxuICAgICAgICBbMSwgMSwgMSwgMSwgNCwgM10sXG4gICAgICAgIFsxLCAxLCAxLCAzLCA0LCAxXSxcbiAgICAgICAgWzEsIDMsIDEsIDEsIDQsIDFdLFxuICAgICAgICBbMSwgMSwgNCwgMSwgMSwgM10sXG4gICAgICAgIFsxLCAxLCA0LCAzLCAxLCAxXSxcbiAgICAgICAgWzQsIDEsIDEsIDEsIDEsIDNdLFxuICAgICAgICBbNCwgMSwgMSwgMywgMSwgMV0sXG4gICAgICAgIFsxLCAxLCAzLCAxLCA0LCAxXSxcbiAgICAgICAgWzEsIDEsIDQsIDEsIDMsIDFdLFxuICAgICAgICBbMywgMSwgMSwgMSwgNCwgMV0sXG4gICAgICAgIFs0LCAxLCAxLCAxLCAzLCAxXSxcbiAgICAgICAgWzIsIDEsIDEsIDQsIDEsIDJdLFxuICAgICAgICBbMiwgMSwgMSwgMiwgMSwgNF0sXG4gICAgICAgIFsyLCAxLCAxLCAyLCAzLCAyXSxcbiAgICAgICAgWzIsIDMsIDMsIDEsIDEsIDEsIDJdXG4gICAgXX0sXG4gICAgU0lOR0xFX0NPREVfRVJST1I6IHt2YWx1ZTogMX0sXG4gICAgQVZHX0NPREVfRVJST1I6IHt2YWx1ZTogMC41fSxcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJjb2RlXzEyOFwiLCB3cml0ZWFibGU6IGZhbHNlfVxufTtcblxuQ29kZTEyOFJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29kZTEyOFJlYWRlcjtcblxuQ29kZTEyOFJlYWRlci5wcm90b3R5cGUuX2RlY29kZUNvZGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHZhciBjb3VudGVyID0gWzAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICBpLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgb2Zmc2V0ID0gc3RhcnQsXG4gICAgICAgIGlzV2hpdGUgPSAhc2VsZi5fcm93W29mZnNldF0sXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxuICAgICAgICBiZXN0TWF0Y2ggPSB7XG4gICAgICAgICAgICBlcnJvcjogTnVtYmVyLk1BWF9WQUxVRSxcbiAgICAgICAgICAgIGNvZGU6IC0xLFxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgICAgZW5kOiBzdGFydFxuICAgICAgICB9LFxuICAgICAgICBjb2RlLFxuICAgICAgICBlcnJvcixcbiAgICAgICAgbm9ybWFsaXplZDtcblxuICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBjb3VudGVyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkID0gc2VsZi5fbm9ybWFsaXplKGNvdW50ZXIpO1xuICAgICAgICAgICAgICAgIGlmIChub3JtYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29kZSA9IDA7IGNvZGUgPCBzZWxmLkNPREVfUEFUVEVSTi5sZW5ndGg7IGNvZGUrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4obm9ybWFsaXplZCwgc2VsZi5DT0RFX1BBVFRFUk5bY29kZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIDwgYmVzdE1hdGNoLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmNvZGUgPSBjb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XG4gICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5Db2RlMTI4UmVhZGVyLnByb3RvdHlwZS5fZmluZFN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvdW50ZXIgPSBbMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICAgIGksXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3JvdyksXG4gICAgICAgIGlzV2hpdGUgPSBmYWxzZSxcbiAgICAgICAgY291bnRlclBvcyA9IDAsXG4gICAgICAgIGJlc3RNYXRjaCA9IHtcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgICAgICAgY29kZTogLTEsXG4gICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgIGVuZDogMFxuICAgICAgICB9LFxuICAgICAgICBjb2RlLFxuICAgICAgICBlcnJvcixcbiAgICAgICAgaixcbiAgICAgICAgc3VtLFxuICAgICAgICBub3JtYWxpemVkO1xuXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIHN1bSA9IDA7XG4gICAgICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBjb3VudGVyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBjb3VudGVyW2pdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBub3JtYWxpemVkID0gc2VsZi5fbm9ybWFsaXplKGNvdW50ZXIpO1xuICAgICAgICAgICAgICAgIGlmIChub3JtYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29kZSA9IHNlbGYuU1RBUlRfQ09ERV9BOyBjb2RlIDw9IHNlbGYuU1RBUlRfQ09ERV9DOyBjb2RlKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKG5vcm1hbGl6ZWQsIHNlbGYuQ09ERV9QQVRURVJOW2NvZGVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciA8IGJlc3RNYXRjaC5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb2RlID0gY29kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoYmVzdE1hdGNoLmVycm9yIDwgc2VsZi5BVkdfQ09ERV9FUlJPUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLnN0YXJ0ID0gaSAtIHN1bTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJlc3RNYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgNDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbal0gPSBjb3VudGVyW2ogKyAyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY291bnRlcls0XSA9IDA7XG4gICAgICAgICAgICAgICAgY291bnRlcls1XSA9IDA7XG4gICAgICAgICAgICAgICAgY291bnRlclBvcy0tO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcbiAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlLl9kZWNvZGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIHN0YXJ0SW5mbyA9IHNlbGYuX2ZpbmRTdGFydCgpLFxuICAgICAgICBjb2RlID0gbnVsbCxcbiAgICAgICAgZG9uZSA9IGZhbHNlLFxuICAgICAgICByZXN1bHQgPSBbXSxcbiAgICAgICAgbXVsdGlwbGllciA9IDAsXG4gICAgICAgIGNoZWNrc3VtID0gMCxcbiAgICAgICAgY29kZXNldCxcbiAgICAgICAgcmF3UmVzdWx0ID0gW10sXG4gICAgICAgIGRlY29kZWRDb2RlcyA9IFtdLFxuICAgICAgICBzaGlmdE5leHQgPSBmYWxzZSxcbiAgICAgICAgdW5zaGlmdCxcbiAgICAgICAgcmVtb3ZlTGFzdENoYXJhY3RlciA9IHRydWU7XG5cbiAgICBpZiAoc3RhcnRJbmZvID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb2RlID0ge1xuICAgICAgICBjb2RlOiBzdGFydEluZm8uY29kZSxcbiAgICAgICAgc3RhcnQ6IHN0YXJ0SW5mby5zdGFydCxcbiAgICAgICAgZW5kOiBzdGFydEluZm8uZW5kXG4gICAgfTtcbiAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcbiAgICBjaGVja3N1bSA9IGNvZGUuY29kZTtcbiAgICBzd2l0Y2ggKGNvZGUuY29kZSkge1xuICAgIGNhc2Ugc2VsZi5TVEFSVF9DT0RFX0E6XG4gICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBzZWxmLlNUQVJUX0NPREVfQjpcbiAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9CO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIHNlbGYuU1RBUlRfQ09ERV9DOlxuICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0M7XG4gICAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHdoaWxlICghZG9uZSkge1xuICAgICAgICB1bnNoaWZ0ID0gc2hpZnROZXh0O1xuICAgICAgICBzaGlmdE5leHQgPSBmYWxzZTtcbiAgICAgICAgY29kZSA9IHNlbGYuX2RlY29kZUNvZGUoY29kZS5lbmQpO1xuICAgICAgICBpZiAoY29kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGNvZGUuY29kZSAhPT0gc2VsZi5TVE9QX0NPREUpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVMYXN0Q2hhcmFjdGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvZGUuY29kZSAhPT0gc2VsZi5TVE9QX0NPREUpIHtcbiAgICAgICAgICAgICAgICByYXdSZXN1bHQucHVzaChjb2RlLmNvZGUpO1xuICAgICAgICAgICAgICAgIG11bHRpcGxpZXIrKztcbiAgICAgICAgICAgICAgICBjaGVja3N1bSArPSBtdWx0aXBsaWVyICogY29kZS5jb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoY29kZXNldCkge1xuICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQTpcbiAgICAgICAgICAgICAgICBpZiAoY29kZS5jb2RlIDwgNjQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgzMiArIGNvZGUuY29kZSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29kZS5jb2RlIDwgOTYpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlLmNvZGUgLSA2NCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgIT09IHNlbGYuU1RPUF9DT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVMYXN0Q2hhcmFjdGVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjb2RlLmNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfU0hJRlQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlmdE5leHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9CO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0I6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0I7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuU1RPUF9DT0RFOlxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0I6XG4gICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSA8IDk2KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoMzIgKyBjb2RlLmNvZGUpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29kZS5jb2RlICE9PSBzZWxmLlNUT1BfQ09ERSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTGFzdENoYXJhY3RlciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY29kZS5jb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX1NISUZUOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnROZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9BOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9BO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0M6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0M7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLlNUT1BfQ09ERTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9DOlxuICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgPCAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY29kZS5jb2RlIDwgMTAgPyBcIjBcIiArIGNvZGUuY29kZSA6IGNvZGUuY29kZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSAhPT0gc2VsZi5TVE9QX0NPREUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUxhc3RDaGFyYWN0ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvZGUuY29kZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9BOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9BO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0I6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0I7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLlNUT1BfQ09ERTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodW5zaGlmdCkge1xuICAgICAgICAgICAgY29kZXNldCA9IGNvZGVzZXQgPT09IHNlbGYuQ09ERV9BID8gc2VsZi5DT0RFX0IgOiBzZWxmLkNPREVfQTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvZGUuZW5kID0gc2VsZi5fbmV4dFVuc2V0KHNlbGYuX3JvdywgY29kZS5lbmQpO1xuICAgIGlmICghc2VsZi5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlKGNvZGUpKXtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY2hlY2tzdW0gLT0gbXVsdGlwbGllciAqIHJhd1Jlc3VsdFtyYXdSZXN1bHQubGVuZ3RoIC0gMV07XG4gICAgaWYgKGNoZWNrc3VtICUgMTAzICE9PSByYXdSZXN1bHRbcmF3UmVzdWx0Lmxlbmd0aCAtIDFdKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICghcmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgbGFzdCBjb2RlIGZyb20gcmVzdWx0IChjaGVja3N1bSlcbiAgICBpZiAocmVtb3ZlTGFzdENoYXJhY3Rlcikge1xuICAgICAgICByZXN1bHQuc3BsaWNlKHJlc3VsdC5sZW5ndGggLSAxLCAxKTtcbiAgICB9XG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNvZGU6IHJlc3VsdC5qb2luKFwiXCIpLFxuICAgICAgICBzdGFydDogc3RhcnRJbmZvLnN0YXJ0LFxuICAgICAgICBlbmQ6IGNvZGUuZW5kLFxuICAgICAgICBjb2Rlc2V0OiBjb2Rlc2V0LFxuICAgICAgICBzdGFydEluZm86IHN0YXJ0SW5mbyxcbiAgICAgICAgZGVjb2RlZENvZGVzOiBkZWNvZGVkQ29kZXMsXG4gICAgICAgIGVuZEluZm86IGNvZGVcbiAgICB9O1xufTtcblxuXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlID0gZnVuY3Rpb24oZW5kSW5mbykge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kO1xuXG4gICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kID0gZW5kSW5mby5lbmQgKyAoKGVuZEluZm8uZW5kIC0gZW5kSW5mby5zdGFydCkgLyAyKTtcbiAgICBpZiAodHJhaWxpbmdXaGl0ZXNwYWNlRW5kIDwgc2VsZi5fcm93Lmxlbmd0aCkge1xuICAgICAgICBpZiAoc2VsZi5fbWF0Y2hSYW5nZShlbmRJbmZvLmVuZCwgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kLCAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIGVuZEluZm87XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb2RlMTI4UmVhZGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY29kZV8xMjhfcmVhZGVyLmpzXG4gKiovIiwiZnVuY3Rpb24gQmFyY29kZVJlYWRlcihjb25maWcpIHtcbiAgICB0aGlzLl9yb3cgPSBbXTtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICByZXR1cm4gdGhpcztcbn1cblxuQmFyY29kZVJlYWRlci5wcm90b3R5cGUuX25leHRVbnNldCA9IGZ1bmN0aW9uKGxpbmUsIHN0YXJ0KSB7XG4gICAgdmFyIGk7XG5cbiAgICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzdGFydCA9IDA7XG4gICAgfVxuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgbGluZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIWxpbmVbaV0pIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBsaW5lLmxlbmd0aDtcbn07XG5cbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9tYXRjaFBhdHRlcm4gPSBmdW5jdGlvbihjb3VudGVyLCBjb2RlKSB7XG4gICAgdmFyIGksXG4gICAgICAgIGVycm9yID0gMCxcbiAgICAgICAgc2luZ2xlRXJyb3IgPSAwLFxuICAgICAgICBtb2R1bG8gPSB0aGlzLk1PRFVMTyxcbiAgICAgICAgbWF4U2luZ2xlRXJyb3IgPSB0aGlzLlNJTkdMRV9DT0RFX0VSUk9SIHx8IDE7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICBzaW5nbGVFcnJvciA9IE1hdGguYWJzKGNvZGVbaV0gLSBjb3VudGVyW2ldKTtcbiAgICAgICAgaWYgKHNpbmdsZUVycm9yID4gbWF4U2luZ2xlRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICB9XG4gICAgICAgIGVycm9yICs9IHNpbmdsZUVycm9yO1xuICAgIH1cbiAgICByZXR1cm4gZXJyb3IgLyBtb2R1bG87XG59O1xuXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbmV4dFNldCA9IGZ1bmN0aW9uKGxpbmUsIG9mZnNldCkge1xuICAgIHZhciBpO1xuXG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG4gICAgZm9yIChpID0gb2Zmc2V0OyBpIDwgbGluZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobGluZVtpXSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxpbmUubGVuZ3RoO1xufTtcblxuQmFyY29kZVJlYWRlci5wcm90b3R5cGUuX25vcm1hbGl6ZSA9IGZ1bmN0aW9uKGNvdW50ZXIsIG1vZHVsbykge1xuICAgIHZhciBpLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgc3VtID0gMCxcbiAgICAgICAgcmF0aW8sXG4gICAgICAgIG51bU9uZXMgPSAwLFxuICAgICAgICBub3JtYWxpemVkID0gW10sXG4gICAgICAgIG5vcm0gPSAwO1xuXG4gICAgaWYgKCFtb2R1bG8pIHtcbiAgICAgICAgbW9kdWxvID0gc2VsZi5NT0RVTE87XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChjb3VudGVyW2ldID09PSAxKSB7XG4gICAgICAgICAgICBudW1PbmVzKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdW0gKz0gY291bnRlcltpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByYXRpbyA9IHN1bSAvIChtb2R1bG8gLSBudW1PbmVzKTtcbiAgICBpZiAocmF0aW8gPiAxLjApIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG5vcm0gPSBjb3VudGVyW2ldID09PSAxID8gY291bnRlcltpXSA6IGNvdW50ZXJbaV0gLyByYXRpbztcbiAgICAgICAgICAgIG5vcm1hbGl6ZWQucHVzaChub3JtKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJhdGlvID0gKHN1bSArIG51bU9uZXMpIC8gbW9kdWxvO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbm9ybSA9IGNvdW50ZXJbaV0gLyByYXRpbztcbiAgICAgICAgICAgIG5vcm1hbGl6ZWQucHVzaChub3JtKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9ybWFsaXplZDtcbn07XG5cbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9tYXRjaFRyYWNlID0gZnVuY3Rpb24oY21wQ291bnRlciwgZXBzaWxvbikge1xuICAgIHZhciBjb3VudGVyID0gW10sXG4gICAgICAgIGksXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3JvdyksXG4gICAgICAgIGlzV2hpdGUgPSAhc2VsZi5fcm93W29mZnNldF0sXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxuICAgICAgICBiZXN0TWF0Y2ggPSB7XG4gICAgICAgICAgICBlcnJvcjogTnVtYmVyLk1BWF9WQUxVRSxcbiAgICAgICAgICAgIGNvZGU6IC0xLFxuICAgICAgICAgICAgc3RhcnQ6IDBcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I7XG5cbiAgICBpZiAoY21wQ291bnRlcikge1xuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGNtcENvdW50ZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvdW50ZXIucHVzaCgwKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHNlbGYuX21hdGNoUGF0dGVybihjb3VudGVyLCBjbXBDb3VudGVyKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBlcHNpbG9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guc3RhcnQgPSBpIC0gb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVuZCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guY291bnRlciA9IGNvdW50ZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xuICAgICAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvdW50ZXIucHVzaCgwKTtcbiAgICAgICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcbiAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcbiAgICAgICAgICAgICAgICBjb3VudGVyLnB1c2goMCk7XG4gICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XG4gICAgICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgY21wQ291bnRlciB3YXMgbm90IGdpdmVuXG4gICAgYmVzdE1hdGNoLnN0YXJ0ID0gb2Zmc2V0O1xuICAgIGJlc3RNYXRjaC5lbmQgPSBzZWxmLl9yb3cubGVuZ3RoIC0gMTtcbiAgICBiZXN0TWF0Y2guY291bnRlciA9IGNvdW50ZXI7XG4gICAgcmV0dXJuIGJlc3RNYXRjaDtcbn07XG5cbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLmRlY29kZVBhdHRlcm4gPSBmdW5jdGlvbihwYXR0ZXJuKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICByZXN1bHQ7XG5cbiAgICBzZWxmLl9yb3cgPSBwYXR0ZXJuO1xuICAgIHJlc3VsdCA9IHNlbGYuX2RlY29kZSgpO1xuICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHtcbiAgICAgICAgc2VsZi5fcm93LnJldmVyc2UoKTtcbiAgICAgICAgcmVzdWx0ID0gc2VsZi5fZGVjb2RlKCk7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5kaXJlY3Rpb24gPSBCYXJjb2RlUmVhZGVyLkRJUkVDVElPTi5SRVZFUlNFO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0ID0gc2VsZi5fcm93Lmxlbmd0aCAtIHJlc3VsdC5zdGFydDtcbiAgICAgICAgICAgIHJlc3VsdC5lbmQgPSBzZWxmLl9yb3cubGVuZ3RoIC0gcmVzdWx0LmVuZDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdC5kaXJlY3Rpb24gPSBCYXJjb2RlUmVhZGVyLkRJUkVDVElPTi5GT1JXQVJEO1xuICAgIH1cbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIHJlc3VsdC5mb3JtYXQgPSBzZWxmLkZPUk1BVDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9tYXRjaFJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIGVuZCwgdmFsdWUpIHtcbiAgICB2YXIgaTtcblxuICAgIHN0YXJ0ID0gc3RhcnQgPCAwID8gMCA6IHN0YXJ0O1xuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuX3Jvd1tpXSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9maWxsQ291bnRlcnMgPSBmdW5jdGlvbihvZmZzZXQsIGVuZCwgaXNXaGl0ZSkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgY291bnRlclBvcyA9IDAsXG4gICAgICAgIGksXG4gICAgICAgIGNvdW50ZXJzID0gW107XG5cbiAgICBpc1doaXRlID0gKHR5cGVvZiBpc1doaXRlICE9PSAndW5kZWZpbmVkJykgPyBpc1doaXRlIDogdHJ1ZTtcbiAgICBvZmZzZXQgPSAodHlwZW9mIG9mZnNldCAhPT0gJ3VuZGVmaW5lZCcpID8gb2Zmc2V0IDogc2VsZi5fbmV4dFVuc2V0KHNlbGYuX3Jvdyk7XG4gICAgZW5kID0gZW5kIHx8IHNlbGYuX3Jvdy5sZW5ndGg7XG5cbiAgICBjb3VudGVyc1tjb3VudGVyUG9zXSA9IDA7XG4gICAgZm9yIChpID0gb2Zmc2V0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcbiAgICAgICAgICAgIGNvdW50ZXJzW2NvdW50ZXJQb3NdKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb3VudGVyUG9zKys7XG4gICAgICAgICAgICBjb3VudGVyc1tjb3VudGVyUG9zXSA9IDE7XG4gICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdW50ZXJzO1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLCBcIkZPUk1BVFwiLCB7XG4gICAgdmFsdWU6ICd1bmtub3duJyxcbiAgICB3cml0ZWFibGU6IGZhbHNlXG59KTtcblxuQmFyY29kZVJlYWRlci5ESVJFQ1RJT04gPSB7XG4gICAgRk9SV0FSRDogMSxcbiAgICBSRVZFUlNFOiAtMVxufTtcblxuQmFyY29kZVJlYWRlci5FeGNlcHRpb24gPSB7XG4gICAgU3RhcnROb3RGb3VuZEV4Y2VwdGlvbjogXCJTdGFydC1JbmZvIHdhcyBub3QgZm91bmQhXCIsXG4gICAgQ29kZU5vdEZvdW5kRXhjZXB0aW9uOiBcIkNvZGUgY291bGQgbm90IGJlIGZvdW5kIVwiLFxuICAgIFBhdHRlcm5Ob3RGb3VuZEV4Y2VwdGlvbjogXCJQYXR0ZXJuIGNvdWxkIG5vdCBiZSBmb3VuZCFcIlxufTtcblxuQmFyY29kZVJlYWRlci5DT05GSUdfS0VZUyA9IHt9O1xuXG5leHBvcnQgZGVmYXVsdCBCYXJjb2RlUmVhZGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmFyY29kZV9yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgQmFyY29kZVJlYWRlciBmcm9tICcuL2JhcmNvZGVfcmVhZGVyJztcblxuZnVuY3Rpb24gRUFOUmVhZGVyKG9wdHMpIHtcbiAgICBCYXJjb2RlUmVhZGVyLmNhbGwodGhpcywgb3B0cyk7XG59XG5cbnZhciBwcm9wZXJ0aWVzID0ge1xuICAgIENPREVfTF9TVEFSVDoge3ZhbHVlOiAwfSxcbiAgICBNT0RVTE86IHt2YWx1ZTogN30sXG4gICAgQ09ERV9HX1NUQVJUOiB7dmFsdWU6IDEwfSxcbiAgICBTVEFSVF9QQVRURVJOOiB7dmFsdWU6IFsxIC8gMyAqIDcsIDEgLyAzICogNywgMSAvIDMgKiA3XX0sXG4gICAgU1RPUF9QQVRURVJOOiB7dmFsdWU6IFsxIC8gMyAqIDcsIDEgLyAzICogNywgMSAvIDMgKiA3XX0sXG4gICAgTUlERExFX1BBVFRFUk46IHt2YWx1ZTogWzEgLyA1ICogNywgMSAvIDUgKiA3LCAxIC8gNSAqIDcsIDEgLyA1ICogNywgMSAvIDUgKiA3XX0sXG4gICAgQ09ERV9QQVRURVJOOiB7dmFsdWU6IFtcbiAgICAgICAgWzMsIDIsIDEsIDFdLFxuICAgICAgICBbMiwgMiwgMiwgMV0sXG4gICAgICAgIFsyLCAxLCAyLCAyXSxcbiAgICAgICAgWzEsIDQsIDEsIDFdLFxuICAgICAgICBbMSwgMSwgMywgMl0sXG4gICAgICAgIFsxLCAyLCAzLCAxXSxcbiAgICAgICAgWzEsIDEsIDEsIDRdLFxuICAgICAgICBbMSwgMywgMSwgMl0sXG4gICAgICAgIFsxLCAyLCAxLCAzXSxcbiAgICAgICAgWzMsIDEsIDEsIDJdLFxuICAgICAgICBbMSwgMSwgMiwgM10sXG4gICAgICAgIFsxLCAyLCAyLCAyXSxcbiAgICAgICAgWzIsIDIsIDEsIDJdLFxuICAgICAgICBbMSwgMSwgNCwgMV0sXG4gICAgICAgIFsyLCAzLCAxLCAxXSxcbiAgICAgICAgWzEsIDMsIDIsIDFdLFxuICAgICAgICBbNCwgMSwgMSwgMV0sXG4gICAgICAgIFsyLCAxLCAzLCAxXSxcbiAgICAgICAgWzMsIDEsIDIsIDFdLFxuICAgICAgICBbMiwgMSwgMSwgM11cbiAgICBdfSxcbiAgICBDT0RFX0ZSRVFVRU5DWToge3ZhbHVlOiBbMCwgMTEsIDEzLCAxNCwgMTksIDI1LCAyOCwgMjEsIDIyLCAyNl19LFxuICAgIFNJTkdMRV9DT0RFX0VSUk9SOiB7dmFsdWU6IDAuNjd9LFxuICAgIEFWR19DT0RFX0VSUk9SOiB7dmFsdWU6IDAuMjd9LFxuICAgIEZPUk1BVDoge3ZhbHVlOiBcImVhbl8xM1wiLCB3cml0ZWFibGU6IGZhbHNlfVxufTtcblxuRUFOUmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFyY29kZVJlYWRlci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xuRUFOUmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEVBTlJlYWRlcjtcblxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlQ29kZSA9IGZ1bmN0aW9uKHN0YXJ0LCBjb2RlcmFuZ2UpIHtcbiAgICB2YXIgY291bnRlciA9IFswLCAwLCAwLCAwXSxcbiAgICAgICAgaSxcbiAgICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICAgIG9mZnNldCA9IHN0YXJ0LFxuICAgICAgICBpc1doaXRlID0gIXNlbGYuX3Jvd1tvZmZzZXRdLFxuICAgICAgICBjb3VudGVyUG9zID0gMCxcbiAgICAgICAgYmVzdE1hdGNoID0ge1xuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXG4gICAgICAgICAgICBjb2RlOiAtMSxcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgIGVuZDogc3RhcnRcbiAgICAgICAgfSxcbiAgICAgICAgY29kZSxcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIG5vcm1hbGl6ZWQ7XG5cbiAgICBpZiAoIWNvZGVyYW5nZSkge1xuICAgICAgICBjb2RlcmFuZ2UgPSBzZWxmLkNPREVfUEFUVEVSTi5sZW5ndGg7XG4gICAgfVxuXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWQgPSBzZWxmLl9ub3JtYWxpemUoY291bnRlcik7XG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb2RlID0gMDsgY29kZSA8IGNvZGVyYW5nZTsgY29kZSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHNlbGYuX21hdGNoUGF0dGVybihub3JtYWxpemVkLCBzZWxmLkNPREVfUEFUVEVSTltjb2RlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBiZXN0TWF0Y2guZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guY29kZSA9IGNvZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVuZCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChiZXN0TWF0Y2guZXJyb3IgPiBzZWxmLkFWR19DT0RFX0VSUk9SKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XG4gICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5FQU5SZWFkZXIucHJvdG90eXBlLl9maW5kUGF0dGVybiA9IGZ1bmN0aW9uKHBhdHRlcm4sIG9mZnNldCwgaXNXaGl0ZSwgdHJ5SGFyZGVyLCBlcHNpbG9uKSB7XG4gICAgdmFyIGNvdW50ZXIgPSBbXSxcbiAgICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICAgIGksXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxuICAgICAgICBiZXN0TWF0Y2ggPSB7XG4gICAgICAgICAgICBlcnJvcjogTnVtYmVyLk1BWF9WQUxVRSxcbiAgICAgICAgICAgIGNvZGU6IC0xLFxuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICBlbmQ6IDBcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIGosXG4gICAgICAgIHN1bSxcbiAgICAgICAgbm9ybWFsaXplZDtcblxuICAgIGlmICghb2Zmc2V0KSB7XG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KTtcbiAgICB9XG5cbiAgICBpZiAoaXNXaGl0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlzV2hpdGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodHJ5SGFyZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdHJ5SGFyZGVyID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIGVwc2lsb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBlcHNpbG9uID0gc2VsZi5BVkdfQ09ERV9FUlJPUjtcbiAgICB9XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8IHBhdHRlcm4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY291bnRlcltpXSA9IDA7XG4gICAgfVxuXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIHN1bSA9IDA7XG4gICAgICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBjb3VudGVyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBjb3VudGVyW2pdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBub3JtYWxpemVkID0gc2VsZi5fbm9ybWFsaXplKGNvdW50ZXIpO1xuICAgICAgICAgICAgICAgIGlmIChub3JtYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKG5vcm1hbGl6ZWQsIHBhdHRlcm4pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciA8IGVwc2lsb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLnN0YXJ0ID0gaSAtIHN1bTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJlc3RNYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHJ5SGFyZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgY291bnRlci5sZW5ndGggLSAyOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbal0gPSBjb3VudGVyW2ogKyAyXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXIubGVuZ3RoIC0gMl0gPSAwO1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXIubGVuZ3RoIC0gMV0gPSAwO1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyUG9zLS07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcbiAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbkVBTlJlYWRlci5wcm90b3R5cGUuX2ZpbmRTdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgbGVhZGluZ1doaXRlc3BhY2VTdGFydCxcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpLFxuICAgICAgICBzdGFydEluZm87XG5cbiAgICB3aGlsZSAoIXN0YXJ0SW5mbykge1xuICAgICAgICBzdGFydEluZm8gPSBzZWxmLl9maW5kUGF0dGVybihzZWxmLlNUQVJUX1BBVFRFUk4sIG9mZnNldCk7XG4gICAgICAgIGlmICghc3RhcnRJbmZvKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0ID0gc3RhcnRJbmZvLnN0YXJ0IC0gKHN0YXJ0SW5mby5lbmQgLSBzdGFydEluZm8uc3RhcnQpO1xuICAgICAgICBpZiAobGVhZGluZ1doaXRlc3BhY2VTdGFydCA+PSAwKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5fbWF0Y2hSYW5nZShsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0LCBzdGFydEluZm8uc3RhcnQsIDApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXJ0SW5mbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvZmZzZXQgPSBzdGFydEluZm8uZW5kO1xuICAgICAgICBzdGFydEluZm8gPSBudWxsO1xuICAgIH1cbn07XG5cbkVBTlJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZSA9IGZ1bmN0aW9uKGVuZEluZm8pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZDtcblxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IGVuZEluZm8uZW5kICsgKGVuZEluZm8uZW5kIC0gZW5kSW5mby5zdGFydCk7XG4gICAgaWYgKHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA8IHNlbGYuX3Jvdy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UoZW5kSW5mby5lbmQsIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCwgMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZmluZEVuZCA9IGZ1bmN0aW9uKG9mZnNldCwgaXNXaGl0ZSkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgZW5kSW5mbyA9IHNlbGYuX2ZpbmRQYXR0ZXJuKHNlbGYuU1RPUF9QQVRURVJOLCBvZmZzZXQsIGlzV2hpdGUsIGZhbHNlKTtcblxuICAgIHJldHVybiBlbmRJbmZvICE9PSBudWxsID8gc2VsZi5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlKGVuZEluZm8pIDogbnVsbDtcbn07XG5cbkVBTlJlYWRlci5wcm90b3R5cGUuX2NhbGN1bGF0ZUZpcnN0RGlnaXQgPSBmdW5jdGlvbihjb2RlRnJlcXVlbmN5KSB7XG4gICAgdmFyIGksXG4gICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgZm9yICggaSA9IDA7IGkgPCBzZWxmLkNPREVfRlJFUVVFTkNZLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChjb2RlRnJlcXVlbmN5ID09PSBzZWxmLkNPREVfRlJFUVVFTkNZW2ldKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbkVBTlJlYWRlci5wcm90b3R5cGUuX2RlY29kZVBheWxvYWQgPSBmdW5jdGlvbihjb2RlLCByZXN1bHQsIGRlY29kZWRDb2Rlcykge1xuICAgIHZhciBpLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgY29kZUZyZXF1ZW5jeSA9IDB4MCxcbiAgICAgICAgZmlyc3REaWdpdDtcblxuICAgIGZvciAoIGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kKTtcbiAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29kZS5jb2RlID49IHNlbGYuQ09ERV9HX1NUQVJUKSB7XG4gICAgICAgICAgICBjb2RlLmNvZGUgPSBjb2RlLmNvZGUgLSBzZWxmLkNPREVfR19TVEFSVDtcbiAgICAgICAgICAgIGNvZGVGcmVxdWVuY3kgfD0gMSA8PCAoNSAtIGkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29kZUZyZXF1ZW5jeSB8PSAwIDw8ICg1IC0gaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0LnB1c2goY29kZS5jb2RlKTtcbiAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XG4gICAgfVxuXG4gICAgZmlyc3REaWdpdCA9IHNlbGYuX2NhbGN1bGF0ZUZpcnN0RGlnaXQoY29kZUZyZXF1ZW5jeSk7XG4gICAgaWYgKGZpcnN0RGlnaXQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJlc3VsdC51bnNoaWZ0KGZpcnN0RGlnaXQpO1xuXG4gICAgY29kZSA9IHNlbGYuX2ZpbmRQYXR0ZXJuKHNlbGYuTUlERExFX1BBVFRFUk4sIGNvZGUuZW5kLCB0cnVlLCBmYWxzZSk7XG4gICAgaWYgKGNvZGUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xuXG4gICAgZm9yICggaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICAgICAgY29kZSA9IHNlbGYuX2RlY29kZUNvZGUoY29kZS5lbmQsIHNlbGYuQ09ERV9HX1NUQVJUKTtcbiAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcbiAgICAgICAgcmVzdWx0LnB1c2goY29kZS5jb2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29kZTtcbn07XG5cbkVBTlJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdGFydEluZm8sXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBjb2RlLFxuICAgICAgICByZXN1bHQgPSBbXSxcbiAgICAgICAgZGVjb2RlZENvZGVzID0gW107XG5cbiAgICBzdGFydEluZm8gPSBzZWxmLl9maW5kU3RhcnQoKTtcbiAgICBpZiAoIXN0YXJ0SW5mbykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29kZSA9IHtcbiAgICAgICAgY29kZTogc3RhcnRJbmZvLmNvZGUsXG4gICAgICAgIHN0YXJ0OiBzdGFydEluZm8uc3RhcnQsXG4gICAgICAgIGVuZDogc3RhcnRJbmZvLmVuZFxuICAgIH07XG4gICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XG4gICAgY29kZSA9IHNlbGYuX2RlY29kZVBheWxvYWQoY29kZSwgcmVzdWx0LCBkZWNvZGVkQ29kZXMpO1xuICAgIGlmICghY29kZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29kZSA9IHNlbGYuX2ZpbmRFbmQoY29kZS5lbmQsIGZhbHNlKTtcbiAgICBpZiAoIWNvZGUpe1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcblxuICAgIC8vIENoZWNrc3VtXG4gICAgaWYgKCFzZWxmLl9jaGVja3N1bShyZXN1bHQpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNvZGU6IHJlc3VsdC5qb2luKFwiXCIpLFxuICAgICAgICBzdGFydDogc3RhcnRJbmZvLnN0YXJ0LFxuICAgICAgICBlbmQ6IGNvZGUuZW5kLFxuICAgICAgICBjb2Rlc2V0OiBcIlwiLFxuICAgICAgICBzdGFydEluZm86IHN0YXJ0SW5mbyxcbiAgICAgICAgZGVjb2RlZENvZGVzOiBkZWNvZGVkQ29kZXNcbiAgICB9O1xufTtcblxuRUFOUmVhZGVyLnByb3RvdHlwZS5fY2hlY2tzdW0gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICB2YXIgc3VtID0gMCwgaTtcblxuICAgIGZvciAoIGkgPSByZXN1bHQubGVuZ3RoIC0gMjsgaSA+PSAwOyBpIC09IDIpIHtcbiAgICAgICAgc3VtICs9IHJlc3VsdFtpXTtcbiAgICB9XG4gICAgc3VtICo9IDM7XG4gICAgZm9yICggaSA9IHJlc3VsdC5sZW5ndGggLSAxOyBpID49IDA7IGkgLT0gMikge1xuICAgICAgICBzdW0gKz0gcmVzdWx0W2ldO1xuICAgIH1cbiAgICByZXR1cm4gc3VtICUgMTAgPT09IDA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCAoRUFOUmVhZGVyKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2Vhbl9yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgQmFyY29kZVJlYWRlciBmcm9tICcuL2JhcmNvZGVfcmVhZGVyJztcbmltcG9ydCBBcnJheUhlbHBlciBmcm9tICcuL2FycmF5X2hlbHBlcic7XG5cbmZ1bmN0aW9uIENvZGUzOVJlYWRlcigpIHtcbiAgICBCYXJjb2RlUmVhZGVyLmNhbGwodGhpcyk7XG59XG5cbnZhciBwcm9wZXJ0aWVzID0ge1xuICAgIEFMUEhBQkVUSF9TVFJJTkc6IHt2YWx1ZTogXCIwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVotLiAqJC8rJVwifSxcbiAgICBBTFBIQUJFVDoge3ZhbHVlOiBbNDgsIDQ5LCA1MCwgNTEsIDUyLCA1MywgNTQsIDU1LCA1NiwgNTcsIDY1LCA2NiwgNjcsIDY4LCA2OSwgNzAsIDcxLCA3MiwgNzMsIDc0LCA3NSwgNzYsIDc3LCA3OCxcbiAgICAgICAgNzksIDgwLCA4MSwgODIsIDgzLCA4NCwgODUsIDg2LCA4NywgODgsIDg5LCA5MCwgNDUsIDQ2LCAzMiwgNDIsIDM2LCA0NywgNDMsIDM3XX0sXG4gICAgQ0hBUkFDVEVSX0VOQ09ESU5HUzoge3ZhbHVlOiBbMHgwMzQsIDB4MTIxLCAweDA2MSwgMHgxNjAsIDB4MDMxLCAweDEzMCwgMHgwNzAsIDB4MDI1LCAweDEyNCwgMHgwNjQsIDB4MTA5LCAweDA0OSxcbiAgICAgICAgMHgxNDgsIDB4MDE5LCAweDExOCwgMHgwNTgsIDB4MDBELCAweDEwQywgMHgwNEMsIDB4MDFDLCAweDEwMywgMHgwNDMsIDB4MTQyLCAweDAxMywgMHgxMTIsIDB4MDUyLCAweDAwNywgMHgxMDYsXG4gICAgICAgIDB4MDQ2LCAweDAxNiwgMHgxODEsIDB4MEMxLCAweDFDMCwgMHgwOTEsIDB4MTkwLCAweDBEMCwgMHgwODUsIDB4MTg0LCAweDBDNCwgMHgwOTQsIDB4MEE4LCAweDBBMiwgMHgwOEEsIDB4MDJBXG4gICAgXX0sXG4gICAgQVNURVJJU0s6IHt2YWx1ZTogMHgwOTR9LFxuICAgIEZPUk1BVDoge3ZhbHVlOiBcImNvZGVfMzlcIiwgd3JpdGVhYmxlOiBmYWxzZX1cbn07XG5cbkNvZGUzOVJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb2RlMzlSZWFkZXI7XG5cbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX3RvQ291bnRlcnMgPSBmdW5jdGlvbihzdGFydCwgY291bnRlcikge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgbnVtQ291bnRlcnMgPSBjb3VudGVyLmxlbmd0aCxcbiAgICAgICAgZW5kID0gc2VsZi5fcm93Lmxlbmd0aCxcbiAgICAgICAgaXNXaGl0ZSA9ICFzZWxmLl9yb3dbc3RhcnRdLFxuICAgICAgICBpLFxuICAgICAgICBjb3VudGVyUG9zID0gMDtcblxuICAgIEFycmF5SGVscGVyLmluaXQoY291bnRlciwgMCk7XG5cbiAgICBmb3IgKCBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY291bnRlclBvcysrO1xuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IG51bUNvdW50ZXJzKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xuICAgICAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb3VudGVyO1xufTtcblxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBjb3VudGVycyA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgIHN0YXJ0ID0gc2VsZi5fZmluZFN0YXJ0KCksXG4gICAgICAgIGRlY29kZWRDaGFyLFxuICAgICAgICBsYXN0U3RhcnQsXG4gICAgICAgIHBhdHRlcm4sXG4gICAgICAgIG5leHRTdGFydDtcblxuICAgIGlmICghc3RhcnQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIG5leHRTdGFydCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93LCBzdGFydC5lbmQpO1xuXG4gICAgZG8ge1xuICAgICAgICBjb3VudGVycyA9IHNlbGYuX3RvQ291bnRlcnMobmV4dFN0YXJ0LCBjb3VudGVycyk7XG4gICAgICAgIHBhdHRlcm4gPSBzZWxmLl90b1BhdHRlcm4oY291bnRlcnMpO1xuICAgICAgICBpZiAocGF0dGVybiA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGRlY29kZWRDaGFyID0gc2VsZi5fcGF0dGVyblRvQ2hhcihwYXR0ZXJuKTtcbiAgICAgICAgaWYgKGRlY29kZWRDaGFyIDwgMCl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucHVzaChkZWNvZGVkQ2hhcik7XG4gICAgICAgIGxhc3RTdGFydCA9IG5leHRTdGFydDtcbiAgICAgICAgbmV4dFN0YXJ0ICs9IEFycmF5SGVscGVyLnN1bShjb3VudGVycyk7XG4gICAgICAgIG5leHRTdGFydCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93LCBuZXh0U3RhcnQpO1xuICAgIH0gd2hpbGUgKGRlY29kZWRDaGFyICE9PSAnKicpO1xuICAgIHJlc3VsdC5wb3AoKTtcblxuICAgIGlmICghcmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoIXNlbGYuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZShsYXN0U3RhcnQsIG5leHRTdGFydCwgY291bnRlcnMpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNvZGU6IHJlc3VsdC5qb2luKFwiXCIpLFxuICAgICAgICBzdGFydDogc3RhcnQuc3RhcnQsXG4gICAgICAgIGVuZDogbmV4dFN0YXJ0LFxuICAgICAgICBzdGFydEluZm86IHN0YXJ0LFxuICAgICAgICBkZWNvZGVkQ29kZXM6IHJlc3VsdFxuICAgIH07XG59O1xuXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbihsYXN0U3RhcnQsIG5leHRTdGFydCwgY291bnRlcnMpIHtcbiAgICB2YXIgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kLFxuICAgICAgICBwYXR0ZXJuU2l6ZSA9IEFycmF5SGVscGVyLnN1bShjb3VudGVycyk7XG5cbiAgICB0cmFpbGluZ1doaXRlc3BhY2VFbmQgPSBuZXh0U3RhcnQgLSBsYXN0U3RhcnQgLSBwYXR0ZXJuU2l6ZTtcbiAgICBpZiAoKHRyYWlsaW5nV2hpdGVzcGFjZUVuZCAqIDMpID49IHBhdHRlcm5TaXplKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl9wYXR0ZXJuVG9DaGFyID0gZnVuY3Rpb24ocGF0dGVybikge1xuICAgIHZhciBpLFxuICAgICAgICBzZWxmID0gdGhpcztcblxuICAgIGZvciAoaSA9IDA7IGkgPCBzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuQ0hBUkFDVEVSX0VOQ09ESU5HU1tpXSA9PT0gcGF0dGVybikge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoc2VsZi5BTFBIQUJFVFtpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufTtcblxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fZmluZE5leHRXaWR0aCA9IGZ1bmN0aW9uKGNvdW50ZXJzLCBjdXJyZW50KSB7XG4gICAgdmFyIGksXG4gICAgICAgIG1pbldpZHRoID0gTnVtYmVyLk1BWF9WQUxVRTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY291bnRlcnNbaV0gPCBtaW5XaWR0aCAmJiBjb3VudGVyc1tpXSA+IGN1cnJlbnQpIHtcbiAgICAgICAgICAgIG1pbldpZHRoID0gY291bnRlcnNbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWluV2lkdGg7XG59O1xuXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl90b1BhdHRlcm4gPSBmdW5jdGlvbihjb3VudGVycykge1xuICAgIHZhciBudW1Db3VudGVycyA9IGNvdW50ZXJzLmxlbmd0aCxcbiAgICAgICAgbWF4TmFycm93V2lkdGggPSAwLFxuICAgICAgICBudW1XaWRlQmFycyA9IG51bUNvdW50ZXJzLFxuICAgICAgICB3aWRlQmFyV2lkdGggPSAwLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgcGF0dGVybixcbiAgICAgICAgaTtcblxuICAgIHdoaWxlIChudW1XaWRlQmFycyA+IDMpIHtcbiAgICAgICAgbWF4TmFycm93V2lkdGggPSBzZWxmLl9maW5kTmV4dFdpZHRoKGNvdW50ZXJzLCBtYXhOYXJyb3dXaWR0aCk7XG4gICAgICAgIG51bVdpZGVCYXJzID0gMDtcbiAgICAgICAgcGF0dGVybiA9IDA7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBudW1Db3VudGVyczsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY291bnRlcnNbaV0gPiBtYXhOYXJyb3dXaWR0aCkge1xuICAgICAgICAgICAgICAgIHBhdHRlcm4gfD0gMSA8PCAobnVtQ291bnRlcnMgLSAxIC0gaSk7XG4gICAgICAgICAgICAgICAgbnVtV2lkZUJhcnMrKztcbiAgICAgICAgICAgICAgICB3aWRlQmFyV2lkdGggKz0gY291bnRlcnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobnVtV2lkZUJhcnMgPT09IDMpIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBudW1Db3VudGVycyAmJiBudW1XaWRlQmFycyA+IDA7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChjb3VudGVyc1tpXSA+IG1heE5hcnJvd1dpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIG51bVdpZGVCYXJzLS07XG4gICAgICAgICAgICAgICAgICAgIGlmICgoY291bnRlcnNbaV0gKiAyKSA+PSB3aWRlQmFyV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwYXR0ZXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn07XG5cbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX2ZpbmRTdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpLFxuICAgICAgICBwYXR0ZXJuU3RhcnQgPSBvZmZzZXQsXG4gICAgICAgIGNvdW50ZXIgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxuICAgICAgICBpc1doaXRlID0gZmFsc2UsXG4gICAgICAgIGksXG4gICAgICAgIGosXG4gICAgICAgIHdoaXRlU3BhY2VNdXN0U3RhcnQ7XG5cbiAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgLy8gZmluZCBzdGFydCBwYXR0ZXJuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuX3RvUGF0dGVybihjb3VudGVyKSA9PT0gc2VsZi5BU1RFUklTSykge1xuICAgICAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlTXVzdFN0YXJ0ID0gTWF0aC5mbG9vcihNYXRoLm1heCgwLCBwYXR0ZXJuU3RhcnQgLSAoKGkgLSBwYXR0ZXJuU3RhcnQpIC8gNCkpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2Uod2hpdGVTcGFjZU11c3RTdGFydCwgcGF0dGVyblN0YXJ0LCAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogcGF0dGVyblN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogaVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHBhdHRlcm5TdGFydCArPSBjb3VudGVyWzBdICsgY291bnRlclsxXTtcbiAgICAgICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IDc7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2pdID0gY291bnRlcltqICsgMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvdW50ZXJbN10gPSAwO1xuICAgICAgICAgICAgICAgIGNvdW50ZXJbOF0gPSAwO1xuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MtLTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XG4gICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb2RlMzlSZWFkZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb2RlXzM5X3JlYWRlci5qc1xuICoqLyIsImltcG9ydCBDb2RlMzlSZWFkZXIgZnJvbSAnLi9jb2RlXzM5X3JlYWRlcic7XG5cbmZ1bmN0aW9uIENvZGUzOVZJTlJlYWRlcigpIHtcbiAgICBDb2RlMzlSZWFkZXIuY2FsbCh0aGlzKTtcbn1cblxudmFyIHBhdHRlcm5zID0ge1xuICAgIElPUTogL1tJT1FdL2csXG4gICAgQVowOTogL1tBLVowLTldezE3fS9cbn07XG5cbkNvZGUzOVZJTlJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENvZGUzOVJlYWRlci5wcm90b3R5cGUpO1xuQ29kZTM5VklOUmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvZGUzOVZJTlJlYWRlcjtcblxuLy8gQ3JpYmJlZCBmcm9tOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3p4aW5nL3p4aW5nL2Jsb2IvbWFzdGVyL2NvcmUvc3JjL21haW4vamF2YS9jb20vZ29vZ2xlL3p4aW5nL2NsaWVudC9yZXN1bHQvVklOUmVzdWx0UGFyc2VyLmphdmFcbkNvZGUzOVZJTlJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZXN1bHQgPSBDb2RlMzlSZWFkZXIucHJvdG90eXBlLl9kZWNvZGUuYXBwbHkodGhpcyk7XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGNvZGUgPSByZXN1bHQuY29kZTtcblxuICAgIGlmICghY29kZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKHBhdHRlcm5zLklPUSwgJycpO1xuXG4gICAgaWYgKCFjb2RlLm1hdGNoKHBhdHRlcm5zLkFaMDkpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgQVowOSBwYXR0ZXJuIGNvZGU6JywgY29kZSk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fY2hlY2tDaGVja3N1bShjb2RlKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXN1bHQuY29kZSA9IGNvZGU7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbkNvZGUzOVZJTlJlYWRlci5wcm90b3R5cGUuX2NoZWNrQ2hlY2tzdW0gPSBmdW5jdGlvbihjb2RlKSB7XG4gICAgLy8gVE9ET1xuICAgIHJldHVybiAhIWNvZGU7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb2RlMzlWSU5SZWFkZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb2RlXzM5X3Zpbl9yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgQmFyY29kZVJlYWRlciBmcm9tICcuL2JhcmNvZGVfcmVhZGVyJztcblxuZnVuY3Rpb24gQ29kYWJhclJlYWRlcigpIHtcbiAgICBCYXJjb2RlUmVhZGVyLmNhbGwodGhpcyk7XG4gICAgdGhpcy5fY291bnRlcnMgPSBbXTtcbn1cblxudmFyIHByb3BlcnRpZXMgPSB7XG4gICAgQUxQSEFCRVRIX1NUUklORzoge3ZhbHVlOiBcIjAxMjM0NTY3ODktJDovLitBQkNEXCJ9LFxuICAgIEFMUEhBQkVUOiB7dmFsdWU6IFs0OCwgNDksIDUwLCA1MSwgNTIsIDUzLCA1NCwgNTUsIDU2LCA1NywgNDUsIDM2LCA1OCwgNDcsIDQ2LCA0MywgNjUsIDY2LCA2NywgNjhdfSxcbiAgICBDSEFSQUNURVJfRU5DT0RJTkdTOiB7dmFsdWU6IFsweDAwMywgMHgwMDYsIDB4MDA5LCAweDA2MCwgMHgwMTIsIDB4MDQyLCAweDAyMSwgMHgwMjQsIDB4MDMwLCAweDA0OCwgMHgwMGMsIDB4MDE4LFxuICAgICAgICAweDA0NSwgMHgwNTEsIDB4MDU0LCAweDAxNSwgMHgwMUEsIDB4MDI5LCAweDAwQiwgMHgwMEVdfSxcbiAgICBTVEFSVF9FTkQ6IHt2YWx1ZTogWzB4MDFBLCAweDAyOSwgMHgwMEIsIDB4MDBFXX0sXG4gICAgTUlOX0VOQ09ERURfQ0hBUlM6IHt2YWx1ZTogNH0sXG4gICAgTUFYX0FDQ0VQVEFCTEU6IHt2YWx1ZTogMi4wfSxcbiAgICBQQURESU5HOiB7dmFsdWU6IDEuNX0sXG4gICAgRk9STUFUOiB7dmFsdWU6IFwiY29kYWJhclwiLCB3cml0ZWFibGU6IGZhbHNlfVxufTtcblxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29kYWJhclJlYWRlcjtcblxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgIHN0YXJ0LFxuICAgICAgICBkZWNvZGVkQ2hhcixcbiAgICAgICAgcGF0dGVybixcbiAgICAgICAgbmV4dFN0YXJ0LFxuICAgICAgICBlbmQ7XG5cbiAgICB0aGlzLl9jb3VudGVycyA9IHNlbGYuX2ZpbGxDb3VudGVycygpO1xuICAgIHN0YXJ0ID0gc2VsZi5fZmluZFN0YXJ0KCk7XG4gICAgaWYgKCFzdGFydCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgbmV4dFN0YXJ0ID0gc3RhcnQuc3RhcnRDb3VudGVyO1xuXG4gICAgZG8ge1xuICAgICAgICBwYXR0ZXJuID0gc2VsZi5fdG9QYXR0ZXJuKG5leHRTdGFydCk7XG4gICAgICAgIGlmIChwYXR0ZXJuIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZGVjb2RlZENoYXIgPSBzZWxmLl9wYXR0ZXJuVG9DaGFyKHBhdHRlcm4pO1xuICAgICAgICBpZiAoZGVjb2RlZENoYXIgPCAwKXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdC5wdXNoKGRlY29kZWRDaGFyKTtcbiAgICAgICAgbmV4dFN0YXJ0ICs9IDg7XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMSAmJiBzZWxmLl9pc1N0YXJ0RW5kKHBhdHRlcm4pKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0gd2hpbGUgKG5leHRTdGFydCA8IHNlbGYuX2NvdW50ZXJzLmxlbmd0aCk7XG5cbiAgICAvLyB2ZXJpZnkgZW5kXG4gICAgaWYgKChyZXN1bHQubGVuZ3RoIC0gMikgPCBzZWxmLk1JTl9FTkNPREVEX0NIQVJTIHx8ICFzZWxmLl9pc1N0YXJ0RW5kKHBhdHRlcm4pKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHZlcmlmeSBlbmQgd2hpdGUgc3BhY2VcbiAgICBpZiAoIXNlbGYuX3ZlcmlmeVdoaXRlc3BhY2Uoc3RhcnQuc3RhcnRDb3VudGVyLCBuZXh0U3RhcnQgLSA4KSl7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICghc2VsZi5fdmFsaWRhdGVSZXN1bHQocmVzdWx0LCBzdGFydC5zdGFydENvdW50ZXIpKXtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbmV4dFN0YXJ0ID0gbmV4dFN0YXJ0ID4gc2VsZi5fY291bnRlcnMubGVuZ3RoID8gc2VsZi5fY291bnRlcnMubGVuZ3RoIDogbmV4dFN0YXJ0O1xuICAgIGVuZCA9IHN0YXJ0LnN0YXJ0ICsgc2VsZi5fc3VtQ291bnRlcnMoc3RhcnQuc3RhcnRDb3VudGVyLCBuZXh0U3RhcnQgLSA4KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGNvZGU6IHJlc3VsdC5qb2luKFwiXCIpLFxuICAgICAgICBzdGFydDogc3RhcnQuc3RhcnQsXG4gICAgICAgIGVuZDogZW5kLFxuICAgICAgICBzdGFydEluZm86IHN0YXJ0LFxuICAgICAgICBkZWNvZGVkQ29kZXM6IHJlc3VsdFxuICAgIH07XG59O1xuXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fdmVyaWZ5V2hpdGVzcGFjZSA9IGZ1bmN0aW9uKHN0YXJ0Q291bnRlciwgZW5kQ291bnRlcikge1xuICAgIGlmICgoc3RhcnRDb3VudGVyIC0gMSA8PSAwKVxuICAgICAgICAgICAgfHwgdGhpcy5fY291bnRlcnNbc3RhcnRDb3VudGVyIC0gMV0gPj0gKHRoaXMuX2NhbGN1bGF0ZVBhdHRlcm5MZW5ndGgoc3RhcnRDb3VudGVyKSAvIDIuMCkpIHtcbiAgICAgICAgaWYgKChlbmRDb3VudGVyICsgOCA+PSB0aGlzLl9jb3VudGVycy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5fY291bnRlcnNbZW5kQ291bnRlciArIDddID49ICh0aGlzLl9jYWxjdWxhdGVQYXR0ZXJuTGVuZ3RoKGVuZENvdW50ZXIpIC8gMi4wKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2NhbGN1bGF0ZVBhdHRlcm5MZW5ndGggPSBmdW5jdGlvbihvZmZzZXQpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgc3VtID0gMDtcblxuICAgIGZvciAoaSA9IG9mZnNldDsgaSA8IG9mZnNldCArIDc7IGkrKykge1xuICAgICAgICBzdW0gKz0gdGhpcy5fY291bnRlcnNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1bTtcbn07XG5cbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl90aHJlc2hvbGRSZXN1bHRQYXR0ZXJuID0gZnVuY3Rpb24ocmVzdWx0LCBzdGFydENvdW50ZXIpe1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgY2F0ZWdvcml6YXRpb24gPSB7XG4gICAgICAgICAgICBzcGFjZToge1xuICAgICAgICAgICAgICAgIG5hcnJvdzogeyBzaXplOiAwLCBjb3VudHM6IDAsIG1pbjogMCwgbWF4OiBOdW1iZXIuTUFYX1ZBTFVFfSxcbiAgICAgICAgICAgICAgICB3aWRlOiB7c2l6ZTogMCwgY291bnRzOiAwLCBtaW46IDAsIG1heDogTnVtYmVyLk1BWF9WQUxVRX1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXI6IHtcbiAgICAgICAgICAgICAgICBuYXJyb3c6IHsgc2l6ZTogMCwgY291bnRzOiAwLCBtaW46IDAsIG1heDogTnVtYmVyLk1BWF9WQUxVRX0sXG4gICAgICAgICAgICAgICAgd2lkZTogeyBzaXplOiAwLCBjb3VudHM6IDAsIG1pbjogMCwgbWF4OiBOdW1iZXIuTUFYX1ZBTFVFfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBraW5kLFxuICAgICAgICBjYXQsXG4gICAgICAgIGksXG4gICAgICAgIGosXG4gICAgICAgIHBvcyA9IHN0YXJ0Q291bnRlcixcbiAgICAgICAgcGF0dGVybjtcblxuICAgIGZvciAoaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspe1xuICAgICAgICBwYXR0ZXJuID0gc2VsZi5fY2hhclRvUGF0dGVybihyZXN1bHRbaV0pO1xuICAgICAgICBmb3IgKGogPSA2OyBqID49IDA7IGotLSkge1xuICAgICAgICAgICAga2luZCA9IChqICYgMSkgPT09IDIgPyBjYXRlZ29yaXphdGlvbi5iYXIgOiBjYXRlZ29yaXphdGlvbi5zcGFjZTtcbiAgICAgICAgICAgIGNhdCA9IChwYXR0ZXJuICYgMSkgPT09IDEgPyBraW5kLndpZGUgOiBraW5kLm5hcnJvdztcbiAgICAgICAgICAgIGNhdC5zaXplICs9IHNlbGYuX2NvdW50ZXJzW3BvcyArIGpdO1xuICAgICAgICAgICAgY2F0LmNvdW50cysrO1xuICAgICAgICAgICAgcGF0dGVybiA+Pj0gMTtcbiAgICAgICAgfVxuICAgICAgICBwb3MgKz0gODtcbiAgICB9XG5cbiAgICBbXCJzcGFjZVwiLCBcImJhclwiXS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICB2YXIgbmV3a2luZCA9IGNhdGVnb3JpemF0aW9uW2tleV07XG4gICAgICAgIG5ld2tpbmQud2lkZS5taW4gPVxuICAgICAgICAgICAgTWF0aC5mbG9vcigobmV3a2luZC5uYXJyb3cuc2l6ZSAvIG5ld2tpbmQubmFycm93LmNvdW50cyArIG5ld2tpbmQud2lkZS5zaXplIC8gbmV3a2luZC53aWRlLmNvdW50cykgLyAyKTtcbiAgICAgICAgbmV3a2luZC5uYXJyb3cubWF4ID0gTWF0aC5jZWlsKG5ld2tpbmQud2lkZS5taW4pO1xuICAgICAgICBuZXdraW5kLndpZGUubWF4ID0gTWF0aC5jZWlsKChuZXdraW5kLndpZGUuc2l6ZSAqIHNlbGYuTUFYX0FDQ0VQVEFCTEUgKyBzZWxmLlBBRERJTkcpIC8gbmV3a2luZC53aWRlLmNvdW50cyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY2F0ZWdvcml6YXRpb247XG59O1xuXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fY2hhclRvUGF0dGVybiA9IGZ1bmN0aW9uKGNoYXIpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGNoYXJDb2RlID0gY2hhci5jaGFyQ29kZUF0KDApLFxuICAgICAgICBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHNlbGYuQUxQSEFCRVQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuQUxQSEFCRVRbaV0gPT09IGNoYXJDb2RlKXtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1NbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDB4MDtcbn07XG5cbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl92YWxpZGF0ZVJlc3VsdCA9IGZ1bmN0aW9uKHJlc3VsdCwgc3RhcnRDb3VudGVyKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICB0aHJlc2hvbGRzID0gc2VsZi5fdGhyZXNob2xkUmVzdWx0UGF0dGVybihyZXN1bHQsIHN0YXJ0Q291bnRlciksXG4gICAgICAgIGksXG4gICAgICAgIGosXG4gICAgICAgIGtpbmQsXG4gICAgICAgIGNhdCxcbiAgICAgICAgc2l6ZSxcbiAgICAgICAgcG9zID0gc3RhcnRDb3VudGVyLFxuICAgICAgICBwYXR0ZXJuO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXR0ZXJuID0gc2VsZi5fY2hhclRvUGF0dGVybihyZXN1bHRbaV0pO1xuICAgICAgICBmb3IgKGogPSA2OyBqID49IDA7IGotLSkge1xuICAgICAgICAgICAga2luZCA9IChqICYgMSkgPT09IDAgPyB0aHJlc2hvbGRzLmJhciA6IHRocmVzaG9sZHMuc3BhY2U7XG4gICAgICAgICAgICBjYXQgPSAocGF0dGVybiAmIDEpID09PSAxID8ga2luZC53aWRlIDoga2luZC5uYXJyb3c7XG4gICAgICAgICAgICBzaXplID0gc2VsZi5fY291bnRlcnNbcG9zICsgal07XG4gICAgICAgICAgICBpZiAoc2l6ZSA8IGNhdC5taW4gfHwgc2l6ZSA+IGNhdC5tYXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXR0ZXJuID4+PSAxO1xuICAgICAgICB9XG4gICAgICAgIHBvcyArPSA4O1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl9wYXR0ZXJuVG9DaGFyID0gZnVuY3Rpb24ocGF0dGVybikge1xuICAgIHZhciBpLFxuICAgICAgICBzZWxmID0gdGhpcztcblxuICAgIGZvciAoaSA9IDA7IGkgPCBzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuQ0hBUkFDVEVSX0VOQ09ESU5HU1tpXSA9PT0gcGF0dGVybikge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoc2VsZi5BTFBIQUJFVFtpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufTtcblxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2NvbXB1dGVBbHRlcm5hdGluZ1RocmVzaG9sZCA9IGZ1bmN0aW9uKG9mZnNldCwgZW5kKSB7XG4gICAgdmFyIGksXG4gICAgICAgIG1pbiA9IE51bWJlci5NQVhfVkFMVUUsXG4gICAgICAgIG1heCA9IDAsXG4gICAgICAgIGNvdW50ZXI7XG5cbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBlbmQ7IGkgKz0gMil7XG4gICAgICAgIGNvdW50ZXIgPSB0aGlzLl9jb3VudGVyc1tpXTtcbiAgICAgICAgaWYgKGNvdW50ZXIgPiBtYXgpIHtcbiAgICAgICAgICAgIG1heCA9IGNvdW50ZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvdW50ZXIgPCBtaW4pIHtcbiAgICAgICAgICAgIG1pbiA9IGNvdW50ZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKChtaW4gKyBtYXgpIC8gMi4wKSB8IDA7XG59O1xuXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fdG9QYXR0ZXJuID0gZnVuY3Rpb24ob2Zmc2V0KSB7XG4gICAgdmFyIG51bUNvdW50ZXJzID0gNyxcbiAgICAgICAgZW5kID0gb2Zmc2V0ICsgbnVtQ291bnRlcnMsXG4gICAgICAgIGJhclRocmVzaG9sZCxcbiAgICAgICAgc3BhY2VUaHJlc2hvbGQsXG4gICAgICAgIGJpdG1hc2sgPSAxIDw8IChudW1Db3VudGVycyAtIDEpLFxuICAgICAgICBwYXR0ZXJuID0gMCxcbiAgICAgICAgaSxcbiAgICAgICAgdGhyZXNob2xkO1xuXG4gICAgaWYgKGVuZCA+IHRoaXMuX2NvdW50ZXJzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgYmFyVGhyZXNob2xkID0gdGhpcy5fY29tcHV0ZUFsdGVybmF0aW5nVGhyZXNob2xkKG9mZnNldCwgZW5kKTtcbiAgICBzcGFjZVRocmVzaG9sZCA9IHRoaXMuX2NvbXB1dGVBbHRlcm5hdGluZ1RocmVzaG9sZChvZmZzZXQgKyAxLCBlbmQpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IG51bUNvdW50ZXJzOyBpKyspe1xuICAgICAgICB0aHJlc2hvbGQgPSAoaSAmIDEpID09PSAwID8gYmFyVGhyZXNob2xkIDogc3BhY2VUaHJlc2hvbGQ7XG4gICAgICAgIGlmICh0aGlzLl9jb3VudGVyc1tvZmZzZXQgKyBpXSA+IHRocmVzaG9sZCkge1xuICAgICAgICAgICAgcGF0dGVybiB8PSBiaXRtYXNrO1xuICAgICAgICB9XG4gICAgICAgIGJpdG1hc2sgPj49IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdHRlcm47XG59O1xuXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5faXNTdGFydEVuZCA9IGZ1bmN0aW9uKHBhdHRlcm4pIHtcbiAgICB2YXIgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLlNUQVJUX0VORC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5TVEFSVF9FTkRbaV0gPT09IHBhdHRlcm4pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl9zdW1Db3VudGVycyA9IGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgc3VtID0gMDtcblxuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgc3VtICs9IHRoaXMuX2NvdW50ZXJzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gc3VtO1xufTtcblxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2ZpbmRTdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgaSxcbiAgICAgICAgcGF0dGVybixcbiAgICAgICAgc3RhcnQgPSBzZWxmLl9uZXh0VW5zZXQoc2VsZi5fcm93KSxcbiAgICAgICAgZW5kO1xuXG4gICAgZm9yIChpID0gMTsgaSA8IHRoaXMuX2NvdW50ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBhdHRlcm4gPSBzZWxmLl90b1BhdHRlcm4oaSk7XG4gICAgICAgIGlmIChwYXR0ZXJuICE9PSAtMSAmJiBzZWxmLl9pc1N0YXJ0RW5kKHBhdHRlcm4pKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBMb29rIGZvciB3aGl0ZXNwYWNlIGFoZWFkXG4gICAgICAgICAgICBzdGFydCArPSBzZWxmLl9zdW1Db3VudGVycygwLCBpKTtcbiAgICAgICAgICAgIGVuZCA9IHN0YXJ0ICsgc2VsZi5fc3VtQ291bnRlcnMoaSwgaSArIDgpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICAgICAgZW5kOiBlbmQsXG4gICAgICAgICAgICAgICAgc3RhcnRDb3VudGVyOiBpLFxuICAgICAgICAgICAgICAgIGVuZENvdW50ZXI6IGkgKyA4XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29kYWJhclJlYWRlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NvZGFiYXJfcmVhZGVyLmpzXG4gKiovIiwiaW1wb3J0IEVBTlJlYWRlciBmcm9tICcuL2Vhbl9yZWFkZXInO1xuXG5mdW5jdGlvbiBVUENSZWFkZXIoKSB7XG4gICAgRUFOUmVhZGVyLmNhbGwodGhpcyk7XG59XG5cbnZhciBwcm9wZXJ0aWVzID0ge1xuICAgIEZPUk1BVDoge3ZhbHVlOiBcInVwY19hXCIsIHdyaXRlYWJsZTogZmFsc2V9XG59O1xuXG5VUENSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFQU5SZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcblVQQ1JlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBVUENSZWFkZXI7XG5cblVQQ1JlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZXN1bHQgPSBFQU5SZWFkZXIucHJvdG90eXBlLl9kZWNvZGUuY2FsbCh0aGlzKTtcblxuICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LmNvZGUgJiYgcmVzdWx0LmNvZGUubGVuZ3RoID09PSAxMyAmJiByZXN1bHQuY29kZS5jaGFyQXQoMCkgPT09IFwiMFwiKSB7XG4gICAgICAgIHJlc3VsdC5jb2RlID0gcmVzdWx0LmNvZGUuc3Vic3RyaW5nKDEpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVQQ1JlYWRlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3VwY19yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgRUFOUmVhZGVyIGZyb20gJy4vZWFuX3JlYWRlcic7XG5cbmZ1bmN0aW9uIEVBTjhSZWFkZXIoKSB7XG4gICAgRUFOUmVhZGVyLmNhbGwodGhpcyk7XG59XG5cbnZhciBwcm9wZXJ0aWVzID0ge1xuICAgIEZPUk1BVDoge3ZhbHVlOiBcImVhbl84XCIsIHdyaXRlYWJsZTogZmFsc2V9XG59O1xuXG5FQU44UmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRUFOUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XG5FQU44UmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEVBTjhSZWFkZXI7XG5cbkVBTjhSZWFkZXIucHJvdG90eXBlLl9kZWNvZGVQYXlsb2FkID0gZnVuY3Rpb24oY29kZSwgcmVzdWx0LCBkZWNvZGVkQ29kZXMpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgc2VsZiA9IHRoaXM7XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb2RlLmVuZCwgc2VsZi5DT0RFX0dfU1RBUlQpO1xuICAgICAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSk7XG4gICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xuICAgIH1cblxuICAgIGNvZGUgPSBzZWxmLl9maW5kUGF0dGVybihzZWxmLk1JRERMRV9QQVRURVJOLCBjb2RlLmVuZCwgdHJ1ZSwgZmFsc2UpO1xuICAgIGlmIChjb2RlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcblxuICAgIGZvciAoIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kLCBzZWxmLkNPREVfR19TVEFSVCk7XG4gICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XG4gICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvZGU7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFQU44UmVhZGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZWFuXzhfcmVhZGVyLmpzXG4gKiovIiwiaW1wb3J0IEVBTlJlYWRlciBmcm9tICcuL2Vhbl9yZWFkZXInO1xuXG5mdW5jdGlvbiBVUENFUmVhZGVyKCkge1xuICAgIEVBTlJlYWRlci5jYWxsKHRoaXMpO1xufVxuXG52YXIgcHJvcGVydGllcyA9IHtcbiAgICBDT0RFX0ZSRVFVRU5DWToge3ZhbHVlOiBbXG4gICAgICAgIFsgNTYsIDUyLCA1MCwgNDksIDQ0LCAzOCwgMzUsIDQyLCA0MSwgMzcgXSxcbiAgICAgICAgWzcsIDExLCAxMywgMTQsIDE5LCAyNSwgMjgsIDIxLCAyMiwgMjZdXX0sXG4gICAgU1RPUF9QQVRURVJOOiB7IHZhbHVlOiBbMSAvIDYgKiA3LCAxIC8gNiAqIDcsIDEgLyA2ICogNywgMSAvIDYgKiA3LCAxIC8gNiAqIDcsIDEgLyA2ICogN119LFxuICAgIEZPUk1BVDoge3ZhbHVlOiBcInVwY19lXCIsIHdyaXRlYWJsZTogZmFsc2V9XG59O1xuXG5VUENFUmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRUFOUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XG5VUENFUmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFVQQ0VSZWFkZXI7XG5cblVQQ0VSZWFkZXIucHJvdG90eXBlLl9kZWNvZGVQYXlsb2FkID0gZnVuY3Rpb24oY29kZSwgcmVzdWx0LCBkZWNvZGVkQ29kZXMpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICAgIGNvZGVGcmVxdWVuY3kgPSAweDA7XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb2RlLmVuZCk7XG4gICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvZGUuY29kZSA+PSBzZWxmLkNPREVfR19TVEFSVCkge1xuICAgICAgICAgICAgY29kZS5jb2RlID0gY29kZS5jb2RlIC0gc2VsZi5DT0RFX0dfU1RBUlQ7XG4gICAgICAgICAgICBjb2RlRnJlcXVlbmN5IHw9IDEgPDwgKDUgLSBpKTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUpO1xuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcbiAgICB9XG4gICAgaWYgKCFzZWxmLl9kZXRlcm1pbmVQYXJpdHkoY29kZUZyZXF1ZW5jeSwgcmVzdWx0KSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gY29kZTtcbn07XG5cblVQQ0VSZWFkZXIucHJvdG90eXBlLl9kZXRlcm1pbmVQYXJpdHkgPSBmdW5jdGlvbihjb2RlRnJlcXVlbmN5LCByZXN1bHQpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgbnJTeXN0ZW07XG5cbiAgICBmb3IgKG5yU3lzdGVtID0gMDsgbnJTeXN0ZW0gPCB0aGlzLkNPREVfRlJFUVVFTkNZLmxlbmd0aDsgbnJTeXN0ZW0rKyl7XG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgdGhpcy5DT0RFX0ZSRVFVRU5DWVtuclN5c3RlbV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjb2RlRnJlcXVlbmN5ID09PSB0aGlzLkNPREVfRlJFUVVFTkNZW25yU3lzdGVtXVtpXSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC51bnNoaWZ0KG5yU3lzdGVtKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5VUENFUmVhZGVyLnByb3RvdHlwZS5fY29udmVydFRvVVBDQSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgIHZhciB1cGNhID0gW3Jlc3VsdFswXV0sXG4gICAgICAgIGxhc3REaWdpdCA9IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMl07XG5cbiAgICBpZiAobGFzdERpZ2l0IDw9IDIpIHtcbiAgICAgICAgdXBjYSA9IHVwY2EuY29uY2F0KHJlc3VsdC5zbGljZSgxLCAzKSlcbiAgICAgICAgICAgIC5jb25jYXQoW2xhc3REaWdpdCwgMCwgMCwgMCwgMF0pXG4gICAgICAgICAgICAuY29uY2F0KHJlc3VsdC5zbGljZSgzLCA2KSk7XG4gICAgfSBlbHNlIGlmIChsYXN0RGlnaXQgPT09IDMpIHtcbiAgICAgICAgdXBjYSA9IHVwY2EuY29uY2F0KHJlc3VsdC5zbGljZSgxLCA0KSlcbiAgICAgICAgICAgIC5jb25jYXQoWzAsIDAsIDAsIDAsIDBdKVxuICAgICAgICAgICAgLmNvbmNhdChyZXN1bHQuc2xpY2UoNCwgNikpO1xuICAgIH0gZWxzZSBpZiAobGFzdERpZ2l0ID09PSA0KSB7XG4gICAgICAgIHVwY2EgPSB1cGNhLmNvbmNhdChyZXN1bHQuc2xpY2UoMSwgNSkpXG4gICAgICAgICAgICAuY29uY2F0KFswLCAwLCAwLCAwLCAwLCByZXN1bHRbNV1dKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB1cGNhID0gdXBjYS5jb25jYXQocmVzdWx0LnNsaWNlKDEsIDYpKVxuICAgICAgICAgICAgLmNvbmNhdChbMCwgMCwgMCwgMCwgbGFzdERpZ2l0XSk7XG4gICAgfVxuXG4gICAgdXBjYS5wdXNoKHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV0pO1xuICAgIHJldHVybiB1cGNhO1xufTtcblxuVVBDRVJlYWRlci5wcm90b3R5cGUuX2NoZWNrc3VtID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgcmV0dXJuIEVBTlJlYWRlci5wcm90b3R5cGUuX2NoZWNrc3VtLmNhbGwodGhpcywgdGhpcy5fY29udmVydFRvVVBDQShyZXN1bHQpKTtcbn07XG5cblVQQ0VSZWFkZXIucHJvdG90eXBlLl9maW5kRW5kID0gZnVuY3Rpb24ob2Zmc2V0LCBpc1doaXRlKSB7XG4gICAgaXNXaGl0ZSA9IHRydWU7XG4gICAgcmV0dXJuIEVBTlJlYWRlci5wcm90b3R5cGUuX2ZpbmRFbmQuY2FsbCh0aGlzLCBvZmZzZXQsIGlzV2hpdGUpO1xufTtcblxuVVBDRVJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZSA9IGZ1bmN0aW9uKGVuZEluZm8pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZDtcblxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IGVuZEluZm8uZW5kICsgKChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpIC8gMik7XG4gICAgaWYgKHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA8IHNlbGYuX3Jvdy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UoZW5kSW5mby5lbmQsIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCwgMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgVVBDRVJlYWRlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3VwY19lX3JlYWRlci5qc1xuICoqLyIsImltcG9ydCBCYXJjb2RlUmVhZGVyIGZyb20gJy4vYmFyY29kZV9yZWFkZXInO1xuY29uc3QgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L21lcmdlJyk7XG5cbmZ1bmN0aW9uIEkyb2Y1UmVhZGVyKG9wdHMpIHtcbiAgICBvcHRzID0gbWVyZ2UoZ2V0RGVmYXVsQ29uZmlnKCksIG9wdHMpO1xuICAgIEJhcmNvZGVSZWFkZXIuY2FsbCh0aGlzLCBvcHRzKTtcbiAgICB0aGlzLmJhclNwYWNlUmF0aW8gPSBbMSwgMV07XG4gICAgaWYgKG9wdHMubm9ybWFsaXplQmFyU3BhY2VXaWR0aCkge1xuICAgICAgICB0aGlzLlNJTkdMRV9DT0RFX0VSUk9SID0gMC4zODtcbiAgICAgICAgdGhpcy5BVkdfQ09ERV9FUlJPUiA9IDAuMDk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWxDb25maWcoKSB7XG4gICAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gICAgT2JqZWN0LmtleXMoSTJvZjVSZWFkZXIuQ09ORklHX0tFWVMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIGNvbmZpZ1trZXldID0gSTJvZjVSZWFkZXIuQ09ORklHX0tFWVNba2V5XS5kZWZhdWx0O1xuICAgIH0pO1xuICAgIHJldHVybiBjb25maWc7XG59XG5cbnZhciBOID0gMSxcbiAgICBXID0gMyxcbiAgICBwcm9wZXJ0aWVzID0ge1xuICAgICAgICBNT0RVTE86IHt2YWx1ZTogMTB9LFxuICAgICAgICBTVEFSVF9QQVRURVJOOiB7dmFsdWU6IFtOICogMi41LCBOICogMi41LCBOICogMi41LCBOICogMi41XX0sXG4gICAgICAgIFNUT1BfUEFUVEVSTjoge3ZhbHVlOiBbTiAqIDIsIE4gKiAyLCBXICogMl19LFxuICAgICAgICBDT0RFX1BBVFRFUk46IHt2YWx1ZTogW1xuICAgICAgICAgICAgW04sIE4sIFcsIFcsIE5dLFxuICAgICAgICAgICAgW1csIE4sIE4sIE4sIFddLFxuICAgICAgICAgICAgW04sIFcsIE4sIE4sIFddLFxuICAgICAgICAgICAgW1csIFcsIE4sIE4sIE5dLFxuICAgICAgICAgICAgW04sIE4sIFcsIE4sIFddLFxuICAgICAgICAgICAgW1csIE4sIFcsIE4sIE5dLFxuICAgICAgICAgICAgW04sIFcsIFcsIE4sIE5dLFxuICAgICAgICAgICAgW04sIE4sIE4sIFcsIFddLFxuICAgICAgICAgICAgW1csIE4sIE4sIFcsIE5dLFxuICAgICAgICAgICAgW04sIFcsIE4sIFcsIE5dXG4gICAgICAgIF19LFxuICAgICAgICBTSU5HTEVfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjc4LCB3cml0YWJsZTogdHJ1ZX0sXG4gICAgICAgIEFWR19DT0RFX0VSUk9SOiB7dmFsdWU6IDAuMzgsIHdyaXRhYmxlOiB0cnVlfSxcbiAgICAgICAgTUFYX0NPUlJFQ1RJT05fRkFDVE9SOiB7dmFsdWU6IDV9LFxuICAgICAgICBGT1JNQVQ6IHt2YWx1ZTogXCJpMm9mNVwifVxuICAgIH07XG5cbkkyb2Y1UmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFyY29kZVJlYWRlci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xuSTJvZjVSZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSTJvZjVSZWFkZXI7XG5cbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hQYXR0ZXJuID0gZnVuY3Rpb24oY291bnRlciwgY29kZSkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5ub3JtYWxpemVCYXJTcGFjZVdpZHRoKSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgY291bnRlclN1bSA9IFswLCAwXSxcbiAgICAgICAgICAgIGNvZGVTdW0gPSBbMCwgMF0sXG4gICAgICAgICAgICBjb3JyZWN0aW9uID0gWzAsIDBdLFxuICAgICAgICAgICAgY29ycmVjdGlvblJhdGlvID0gdGhpcy5NQVhfQ09SUkVDVElPTl9GQUNUT1IsXG4gICAgICAgICAgICBjb3JyZWN0aW9uUmF0aW9JbnZlcnNlID0gMSAvIGNvcnJlY3Rpb25SYXRpbztcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY291bnRlclN1bVtpICUgMl0gKz0gY291bnRlcltpXTtcbiAgICAgICAgICAgIGNvZGVTdW1baSAlIDJdICs9IGNvZGVbaV07XG4gICAgICAgIH1cbiAgICAgICAgY29ycmVjdGlvblswXSA9IGNvZGVTdW1bMF0gLyBjb3VudGVyU3VtWzBdO1xuICAgICAgICBjb3JyZWN0aW9uWzFdID0gY29kZVN1bVsxXSAvIGNvdW50ZXJTdW1bMV07XG5cbiAgICAgICAgY29ycmVjdGlvblswXSA9IE1hdGgubWF4KE1hdGgubWluKGNvcnJlY3Rpb25bMF0sIGNvcnJlY3Rpb25SYXRpbyksIGNvcnJlY3Rpb25SYXRpb0ludmVyc2UpO1xuICAgICAgICBjb3JyZWN0aW9uWzFdID0gTWF0aC5tYXgoTWF0aC5taW4oY29ycmVjdGlvblsxXSwgY29ycmVjdGlvblJhdGlvKSwgY29ycmVjdGlvblJhdGlvSW52ZXJzZSk7XG4gICAgICAgIHRoaXMuYmFyU3BhY2VSYXRpbyA9IGNvcnJlY3Rpb247XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb3VudGVyW2ldICo9IHRoaXMuYmFyU3BhY2VSYXRpb1tpICUgMl07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9tYXRjaFBhdHRlcm4uY2FsbCh0aGlzLCBjb3VudGVyLCBjb2RlKTtcbn07XG5cbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fZmluZFBhdHRlcm4gPSBmdW5jdGlvbihwYXR0ZXJuLCBvZmZzZXQsIGlzV2hpdGUsIHRyeUhhcmRlcikge1xuICAgIHZhciBjb3VudGVyID0gW10sXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBpLFxuICAgICAgICBjb3VudGVyUG9zID0gMCxcbiAgICAgICAgYmVzdE1hdGNoID0ge1xuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXG4gICAgICAgICAgICBjb2RlOiAtMSxcbiAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICAgICAgZW5kOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yLFxuICAgICAgICBqLFxuICAgICAgICBzdW0sXG4gICAgICAgIG5vcm1hbGl6ZWQsXG4gICAgICAgIGVwc2lsb24gPSBzZWxmLkFWR19DT0RFX0VSUk9SO1xuXG4gICAgaXNXaGl0ZSA9IGlzV2hpdGUgfHwgZmFsc2U7XG4gICAgdHJ5SGFyZGVyID0gdHJ5SGFyZGVyIHx8IGZhbHNlO1xuXG4gICAgaWYgKCFvZmZzZXQpIHtcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpO1xuICAgIH1cblxuICAgIGZvciAoIGkgPSAwOyBpIDwgcGF0dGVybi5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb3VudGVyW2ldID0gMDtcbiAgICB9XG5cbiAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgc3VtID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IGNvdW50ZXIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGNvdW50ZXJbal07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWQgPSBzZWxmLl9ub3JtYWxpemUoY291bnRlcik7XG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4obm9ybWFsaXplZCwgcGF0dGVybik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIDwgZXBzaWxvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guc3RhcnQgPSBpIC0gc3VtO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVuZCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0cnlIYXJkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGNvdW50ZXIubGVuZ3RoIC0gMjsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2pdID0gY291bnRlcltqICsgMl07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyLmxlbmd0aCAtIDJdID0gMDtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyLmxlbmd0aCAtIDFdID0gMDtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlclBvcy0tO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XG4gICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2ZpbmRTdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgbGVhZGluZ1doaXRlc3BhY2VTdGFydCxcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpLFxuICAgICAgICBzdGFydEluZm8sXG4gICAgICAgIG5hcnJvd0JhcldpZHRoID0gMTtcblxuICAgIHdoaWxlICghc3RhcnRJbmZvKSB7XG4gICAgICAgIHN0YXJ0SW5mbyA9IHNlbGYuX2ZpbmRQYXR0ZXJuKHNlbGYuU1RBUlRfUEFUVEVSTiwgb2Zmc2V0LCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIGlmICghc3RhcnRJbmZvKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBuYXJyb3dCYXJXaWR0aCA9IE1hdGguZmxvb3IoKHN0YXJ0SW5mby5lbmQgLSBzdGFydEluZm8uc3RhcnQpIC8gNCk7XG4gICAgICAgIGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQgPSBzdGFydEluZm8uc3RhcnQgLSBuYXJyb3dCYXJXaWR0aCAqIDEwO1xuICAgICAgICBpZiAobGVhZGluZ1doaXRlc3BhY2VTdGFydCA+PSAwKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5fbWF0Y2hSYW5nZShsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0LCBzdGFydEluZm8uc3RhcnQsIDApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXJ0SW5mbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvZmZzZXQgPSBzdGFydEluZm8uZW5kO1xuICAgICAgICBzdGFydEluZm8gPSBudWxsO1xuICAgIH1cbn07XG5cbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlID0gZnVuY3Rpb24oZW5kSW5mbykge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kO1xuXG4gICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kID0gZW5kSW5mby5lbmQgKyAoKGVuZEluZm8uZW5kIC0gZW5kSW5mby5zdGFydCkgLyAyKTtcbiAgICBpZiAodHJhaWxpbmdXaGl0ZXNwYWNlRW5kIDwgc2VsZi5fcm93Lmxlbmd0aCkge1xuICAgICAgICBpZiAoc2VsZi5fbWF0Y2hSYW5nZShlbmRJbmZvLmVuZCwgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kLCAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIGVuZEluZm87XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2ZpbmRFbmQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGVuZEluZm8sXG4gICAgICAgIHRtcDtcblxuICAgIHNlbGYuX3Jvdy5yZXZlcnNlKCk7XG4gICAgZW5kSW5mbyA9IHNlbGYuX2ZpbmRQYXR0ZXJuKHNlbGYuU1RPUF9QQVRURVJOKTtcbiAgICBzZWxmLl9yb3cucmV2ZXJzZSgpO1xuXG4gICAgaWYgKGVuZEluZm8gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gcmV2ZXJzZSBudW1iZXJzXG4gICAgdG1wID0gZW5kSW5mby5zdGFydDtcbiAgICBlbmRJbmZvLnN0YXJ0ID0gc2VsZi5fcm93Lmxlbmd0aCAtIGVuZEluZm8uZW5kO1xuICAgIGVuZEluZm8uZW5kID0gc2VsZi5fcm93Lmxlbmd0aCAtIHRtcDtcblxuICAgIHJldHVybiBlbmRJbmZvICE9PSBudWxsID8gc2VsZi5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlKGVuZEluZm8pIDogbnVsbDtcbn07XG5cbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlUGFpciA9IGZ1bmN0aW9uKGNvdW50ZXJQYWlyKSB7XG4gICAgdmFyIGksXG4gICAgICAgIGNvZGUsXG4gICAgICAgIGNvZGVzID0gW10sXG4gICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXJQYWlyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvdW50ZXJQYWlyW2ldKTtcbiAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb2Rlcy5wdXNoKGNvZGUpO1xuICAgIH1cbiAgICByZXR1cm4gY29kZXM7XG59O1xuXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2RlY29kZUNvZGUgPSBmdW5jdGlvbihjb3VudGVyKSB7XG4gICAgdmFyIGosXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBzdW0gPSAwLFxuICAgICAgICBub3JtYWxpemVkLFxuICAgICAgICBlcnJvcixcbiAgICAgICAgZXBzaWxvbiA9IHNlbGYuQVZHX0NPREVfRVJST1IsXG4gICAgICAgIGNvZGUsXG4gICAgICAgIGJlc3RNYXRjaCA9IHtcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgICAgICAgY29kZTogLTEsXG4gICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgIGVuZDogMFxuICAgICAgICB9O1xuXG4gICAgZm9yICggaiA9IDA7IGogPCBjb3VudGVyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHN1bSArPSBjb3VudGVyW2pdO1xuICAgIH1cbiAgICBub3JtYWxpemVkID0gc2VsZi5fbm9ybWFsaXplKGNvdW50ZXIpO1xuICAgIGlmIChub3JtYWxpemVkKSB7XG4gICAgICAgIGZvciAoY29kZSA9IDA7IGNvZGUgPCBzZWxmLkNPREVfUEFUVEVSTi5sZW5ndGg7IGNvZGUrKykge1xuICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4obm9ybWFsaXplZCwgc2VsZi5DT0RFX1BBVFRFUk5bY29kZV0pO1xuICAgICAgICAgICAgaWYgKGVycm9yIDwgYmVzdE1hdGNoLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgYmVzdE1hdGNoLmNvZGUgPSBjb2RlO1xuICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChiZXN0TWF0Y2guZXJyb3IgPCBlcHNpbG9uKSB7XG4gICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9kZWNvZGVQYXlsb2FkID0gZnVuY3Rpb24oY291bnRlcnMsIHJlc3VsdCwgZGVjb2RlZENvZGVzKSB7XG4gICAgdmFyIGksXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBwb3MgPSAwLFxuICAgICAgICBjb3VudGVyTGVuZ3RoID0gY291bnRlcnMubGVuZ3RoLFxuICAgICAgICBjb3VudGVyUGFpciA9IFtbMCwgMCwgMCwgMCwgMF0sIFswLCAwLCAwLCAwLCAwXV0sXG4gICAgICAgIGNvZGVzO1xuXG4gICAgd2hpbGUgKHBvcyA8IGNvdW50ZXJMZW5ndGgpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICAgICAgY291bnRlclBhaXJbMF1baV0gPSBjb3VudGVyc1twb3NdICogdGhpcy5iYXJTcGFjZVJhdGlvWzBdO1xuICAgICAgICAgICAgY291bnRlclBhaXJbMV1baV0gPSBjb3VudGVyc1twb3MgKyAxXSAqIHRoaXMuYmFyU3BhY2VSYXRpb1sxXTtcbiAgICAgICAgICAgIHBvcyArPSAyO1xuICAgICAgICB9XG4gICAgICAgIGNvZGVzID0gc2VsZi5fZGVjb2RlUGFpcihjb3VudGVyUGFpcik7XG4gICAgICAgIGlmICghY29kZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goY29kZXNbaV0uY29kZSArIFwiXCIpO1xuICAgICAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZXNbaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb2Rlcztcbn07XG5cbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fdmVyaWZ5Q291bnRlckxlbmd0aCA9IGZ1bmN0aW9uKGNvdW50ZXJzKSB7XG4gICAgcmV0dXJuIChjb3VudGVycy5sZW5ndGggJSAxMCA9PT0gMCk7XG59O1xuXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdGFydEluZm8sXG4gICAgICAgIGVuZEluZm8sXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBjb2RlLFxuICAgICAgICByZXN1bHQgPSBbXSxcbiAgICAgICAgZGVjb2RlZENvZGVzID0gW10sXG4gICAgICAgIGNvdW50ZXJzO1xuXG4gICAgc3RhcnRJbmZvID0gc2VsZi5fZmluZFN0YXJ0KCk7XG4gICAgaWYgKCFzdGFydEluZm8pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGRlY29kZWRDb2Rlcy5wdXNoKHN0YXJ0SW5mbyk7XG5cbiAgICBlbmRJbmZvID0gc2VsZi5fZmluZEVuZCgpO1xuICAgIGlmICghZW5kSW5mbykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb3VudGVycyA9IHNlbGYuX2ZpbGxDb3VudGVycyhzdGFydEluZm8uZW5kLCBlbmRJbmZvLnN0YXJ0LCBmYWxzZSk7XG4gICAgaWYgKCFzZWxmLl92ZXJpZnlDb3VudGVyTGVuZ3RoKGNvdW50ZXJzKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29kZSA9IHNlbGYuX2RlY29kZVBheWxvYWQoY291bnRlcnMsIHJlc3VsdCwgZGVjb2RlZENvZGVzKTtcbiAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChyZXN1bHQubGVuZ3RoICUgMiAhPT0gMCB8fFxuICAgICAgICAgICAgcmVzdWx0Lmxlbmd0aCA8IDYpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZGVjb2RlZENvZGVzLnB1c2goZW5kSW5mbyk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29kZTogcmVzdWx0LmpvaW4oXCJcIiksXG4gICAgICAgIHN0YXJ0OiBzdGFydEluZm8uc3RhcnQsXG4gICAgICAgIGVuZDogZW5kSW5mby5lbmQsXG4gICAgICAgIHN0YXJ0SW5mbzogc3RhcnRJbmZvLFxuICAgICAgICBkZWNvZGVkQ29kZXM6IGRlY29kZWRDb2Rlc1xuICAgIH07XG59O1xuXG5JMm9mNVJlYWRlci5DT05GSUdfS0VZUyA9IHtcbiAgICBub3JtYWxpemVCYXJTcGFjZVdpZHRoOiB7XG4gICAgICAgICd0eXBlJzogJ2Jvb2xlYW4nLFxuICAgICAgICAnZGVmYXVsdCc6IGZhbHNlLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnSWYgdHJ1ZSwgdGhlIHJlYWRlciB0cmllcyB0byBub3JtYWxpemUgdGhlJyArXG4gICAgICAgICd3aWR0aC1kaWZmZXJlbmNlIGJldHdlZW4gYmFycyBhbmQgc3BhY2VzJ1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEkyb2Y1UmVhZGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaTJvZjVfcmVhZGVyLmpzXG4gKiovIiwidmFyIGJhc2VNZXJnZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Jhc2VNZXJnZScpLFxuICAgIGNyZWF0ZUFzc2lnbmVyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvY3JlYXRlQXNzaWduZXInKTtcblxuLyoqXG4gKiBSZWN1cnNpdmVseSBtZXJnZXMgb3duIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiB0aGUgc291cmNlIG9iamVjdChzKSwgdGhhdFxuICogZG9uJ3QgcmVzb2x2ZSB0byBgdW5kZWZpbmVkYCBpbnRvIHRoZSBkZXN0aW5hdGlvbiBvYmplY3QuIFN1YnNlcXVlbnQgc291cmNlc1xuICogb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuIElmIGBjdXN0b21pemVyYCBpc1xuICogcHJvdmlkZWQgaXQncyBpbnZva2VkIHRvIHByb2R1Y2UgdGhlIG1lcmdlZCB2YWx1ZXMgb2YgdGhlIGRlc3RpbmF0aW9uIGFuZFxuICogc291cmNlIHByb3BlcnRpZXMuIElmIGBjdXN0b21pemVyYCByZXR1cm5zIGB1bmRlZmluZWRgIG1lcmdpbmcgaXMgaGFuZGxlZFxuICogYnkgdGhlIG1ldGhvZCBpbnN0ZWFkLiBUaGUgYGN1c3RvbWl6ZXJgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZFxuICogd2l0aCBmaXZlIGFyZ3VtZW50czogKG9iamVjdFZhbHVlLCBzb3VyY2VWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduZWQgdmFsdWVzLlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjdXN0b21pemVyYC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB1c2VycyA9IHtcbiAqICAgJ2RhdGEnOiBbeyAndXNlcic6ICdiYXJuZXknIH0sIHsgJ3VzZXInOiAnZnJlZCcgfV1cbiAqIH07XG4gKlxuICogdmFyIGFnZXMgPSB7XG4gKiAgICdkYXRhJzogW3sgJ2FnZSc6IDM2IH0sIHsgJ2FnZSc6IDQwIH1dXG4gKiB9O1xuICpcbiAqIF8ubWVyZ2UodXNlcnMsIGFnZXMpO1xuICogLy8gPT4geyAnZGF0YSc6IFt7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiB9LCB7ICd1c2VyJzogJ2ZyZWQnLCAnYWdlJzogNDAgfV0gfVxuICpcbiAqIC8vIHVzaW5nIGEgY3VzdG9taXplciBjYWxsYmFja1xuICogdmFyIG9iamVjdCA9IHtcbiAqICAgJ2ZydWl0cyc6IFsnYXBwbGUnXSxcbiAqICAgJ3ZlZ2V0YWJsZXMnOiBbJ2JlZXQnXVxuICogfTtcbiAqXG4gKiB2YXIgb3RoZXIgPSB7XG4gKiAgICdmcnVpdHMnOiBbJ2JhbmFuYSddLFxuICogICAndmVnZXRhYmxlcyc6IFsnY2Fycm90J11cbiAqIH07XG4gKlxuICogXy5tZXJnZShvYmplY3QsIG90aGVyLCBmdW5jdGlvbihhLCBiKSB7XG4gKiAgIGlmIChfLmlzQXJyYXkoYSkpIHtcbiAqICAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gKiAgIH1cbiAqIH0pO1xuICogLy8gPT4geyAnZnJ1aXRzJzogWydhcHBsZScsICdiYW5hbmEnXSwgJ3ZlZ2V0YWJsZXMnOiBbJ2JlZXQnLCAnY2Fycm90J10gfVxuICovXG52YXIgbWVyZ2UgPSBjcmVhdGVBc3NpZ25lcihiYXNlTWVyZ2UpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1lcmdlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL29iamVjdC9tZXJnZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYXJyYXlFYWNoID0gcmVxdWlyZSgnLi9hcnJheUVhY2gnKSxcbiAgICBiYXNlTWVyZ2VEZWVwID0gcmVxdWlyZSgnLi9iYXNlTWVyZ2VEZWVwJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc1R5cGVkQXJyYXknKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXMnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tZXJnZWAgd2l0aG91dCBzdXBwb3J0IGZvciBhcmd1bWVudCBqdWdnbGluZyxcbiAqIG11bHRpcGxlIHNvdXJjZXMsIGFuZCBgdGhpc2AgYmluZGluZyBgY3VzdG9taXplcmAgZnVuY3Rpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgbWVyZ2VkIHZhbHVlcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0E9W11dIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCPVtdXSBBc3NvY2lhdGVzIHZhbHVlcyB3aXRoIHNvdXJjZSBjb3VudGVycGFydHMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlTWVyZ2Uob2JqZWN0LCBzb3VyY2UsIGN1c3RvbWl6ZXIsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbiAgdmFyIGlzU3JjQXJyID0gaXNBcnJheUxpa2Uoc291cmNlKSAmJiAoaXNBcnJheShzb3VyY2UpIHx8IGlzVHlwZWRBcnJheShzb3VyY2UpKSxcbiAgICAgIHByb3BzID0gaXNTcmNBcnIgPyB1bmRlZmluZWQgOiBrZXlzKHNvdXJjZSk7XG5cbiAgYXJyYXlFYWNoKHByb3BzIHx8IHNvdXJjZSwgZnVuY3Rpb24oc3JjVmFsdWUsIGtleSkge1xuICAgIGlmIChwcm9wcykge1xuICAgICAga2V5ID0gc3JjVmFsdWU7XG4gICAgICBzcmNWYWx1ZSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3RMaWtlKHNyY1ZhbHVlKSkge1xuICAgICAgc3RhY2tBIHx8IChzdGFja0EgPSBbXSk7XG4gICAgICBzdGFja0IgfHwgKHN0YWNrQiA9IFtdKTtcbiAgICAgIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgYmFzZU1lcmdlLCBjdXN0b21pemVyLCBzdGFja0EsIHN0YWNrQik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgICAgcmVzdWx0ID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIodmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICBpc0NvbW1vbiA9IHJlc3VsdCA9PT0gdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoaXNDb21tb24pIHtcbiAgICAgICAgcmVzdWx0ID0gc3JjVmFsdWU7XG4gICAgICB9XG4gICAgICBpZiAoKHJlc3VsdCAhPT0gdW5kZWZpbmVkIHx8IChpc1NyY0FyciAmJiAhKGtleSBpbiBvYmplY3QpKSkgJiZcbiAgICAgICAgICAoaXNDb21tb24gfHwgKHJlc3VsdCA9PT0gcmVzdWx0ID8gKHJlc3VsdCAhPT0gdmFsdWUpIDogKHZhbHVlID09PSB2YWx1ZSkpKSkge1xuICAgICAgICBvYmplY3Rba2V5XSA9IHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VNZXJnZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlTWVyZ2UuanNcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZm9yRWFjaGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlFYWNoKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkgPT09IGZhbHNlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5RWFjaDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9hcnJheUVhY2guanNcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFycmF5Q29weSA9IHJlcXVpcmUoJy4vYXJyYXlDb3B5JyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpLFxuICAgIGlzUGxhaW5PYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzUGxhaW5PYmplY3QnKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzVHlwZWRBcnJheScpLFxuICAgIHRvUGxhaW5PYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL3RvUGxhaW5PYmplY3QnKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VNZXJnZWAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBtZXJnZXMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgbWVyZ2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBtZXJnZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1lcmdlRnVuYyBUaGUgZnVuY3Rpb24gdG8gbWVyZ2UgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgbWVyZ2VkIHZhbHVlcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0E9W11dIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCPVtdXSBBc3NvY2lhdGVzIHZhbHVlcyB3aXRoIHNvdXJjZSBjb3VudGVycGFydHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBtZXJnZUZ1bmMsIGN1c3RvbWl6ZXIsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBsZW5ndGggPSBzdGFja0EubGVuZ3RoLFxuICAgICAgc3JjVmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoc3RhY2tBW2xlbmd0aF0gPT0gc3JjVmFsdWUpIHtcbiAgICAgIG9iamVjdFtrZXldID0gc3RhY2tCW2xlbmd0aF07XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIHZhciB2YWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgcmVzdWx0ID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIodmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlKSA6IHVuZGVmaW5lZCxcbiAgICAgIGlzQ29tbW9uID0gcmVzdWx0ID09PSB1bmRlZmluZWQ7XG5cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgcmVzdWx0ID0gc3JjVmFsdWU7XG4gICAgaWYgKGlzQXJyYXlMaWtlKHNyY1ZhbHVlKSAmJiAoaXNBcnJheShzcmNWYWx1ZSkgfHwgaXNUeXBlZEFycmF5KHNyY1ZhbHVlKSkpIHtcbiAgICAgIHJlc3VsdCA9IGlzQXJyYXkodmFsdWUpXG4gICAgICAgID8gdmFsdWVcbiAgICAgICAgOiAoaXNBcnJheUxpa2UodmFsdWUpID8gYXJyYXlDb3B5KHZhbHVlKSA6IFtdKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChzcmNWYWx1ZSkgfHwgaXNBcmd1bWVudHMoc3JjVmFsdWUpKSB7XG4gICAgICByZXN1bHQgPSBpc0FyZ3VtZW50cyh2YWx1ZSlcbiAgICAgICAgPyB0b1BsYWluT2JqZWN0KHZhbHVlKVxuICAgICAgICA6IChpc1BsYWluT2JqZWN0KHZhbHVlKSA/IHZhbHVlIDoge30pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8vIEFkZCB0aGUgc291cmNlIHZhbHVlIHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cyBhbmQgYXNzb2NpYXRlXG4gIC8vIGl0IHdpdGggaXRzIG1lcmdlZCB2YWx1ZS5cbiAgc3RhY2tBLnB1c2goc3JjVmFsdWUpO1xuICBzdGFja0IucHVzaChyZXN1bHQpO1xuXG4gIGlmIChpc0NvbW1vbikge1xuICAgIC8vIFJlY3Vyc2l2ZWx5IG1lcmdlIG9iamVjdHMgYW5kIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIG9iamVjdFtrZXldID0gbWVyZ2VGdW5jKHJlc3VsdCwgc3JjVmFsdWUsIGN1c3RvbWl6ZXIsIHN0YWNrQSwgc3RhY2tCKTtcbiAgfSBlbHNlIGlmIChyZXN1bHQgPT09IHJlc3VsdCA/IChyZXN1bHQgIT09IHZhbHVlKSA6ICh2YWx1ZSA9PT0gdmFsdWUpKSB7XG4gICAgb2JqZWN0W2tleV0gPSByZXN1bHQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlTWVyZ2VEZWVwO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2Jhc2VNZXJnZURlZXAuanNcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3BpZXMgdGhlIHZhbHVlcyBvZiBgc291cmNlYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBzb3VyY2UgVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXk9W11dIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyB0by5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheUNvcHkoc291cmNlLCBhcnJheSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHNvdXJjZS5sZW5ndGg7XG5cbiAgYXJyYXkgfHwgKGFycmF5ID0gQXJyYXkobGVuZ3RoKSk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbaW5kZXhdID0gc291cmNlW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlDb3B5O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2FycmF5Q29weS5qc1xuICoqIG1vZHVsZSBpZCA9IDMwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0FycmF5TGlrZScpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKSAmJlxuICAgIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJiAhcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJndW1lbnRzO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2xhbmcvaXNBcmd1bWVudHMuanNcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGdldExlbmd0aCA9IHJlcXVpcmUoJy4vZ2V0TGVuZ3RoJyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKGdldExlbmd0aCh2YWx1ZSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXlMaWtlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2lzQXJyYXlMaWtlLmpzXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiYXNlUHJvcGVydHkgPSByZXF1aXJlKCcuL2Jhc2VQcm9wZXJ0eScpO1xuXG4vKipcbiAqIEdldHMgdGhlIFwibGVuZ3RoXCIgcHJvcGVydHkgdmFsdWUgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBhdm9pZCBhIFtKSVQgYnVnXShodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNzkyKVxuICogdGhhdCBhZmZlY3RzIFNhZmFyaSBvbiBhdCBsZWFzdCBpT1MgOC4xLTguMyBBUk02NC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIFwibGVuZ3RoXCIgdmFsdWUuXG4gKi9cbnZhciBnZXRMZW5ndGggPSBiYXNlUHJvcGVydHkoJ2xlbmd0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldExlbmd0aDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9nZXRMZW5ndGguanNcbiAqKiBtb2R1bGUgaWQgPSAzM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eWAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHkoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlUHJvcGVydHk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZVByb3BlcnR5LmpzXG4gKiogbW9kdWxlIGlkID0gMzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVXNlZCBhcyB0aGUgW21heGltdW0gbGVuZ3RoXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGJhc2VkIG9uIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNMZW5ndGg7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNMZW5ndGguanNcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9pc09iamVjdExpa2UuanNcbiAqKiBtb2R1bGUgaWQgPSAzNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2dldE5hdGl2ZScpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlSXNBcnJheSA9IGdldE5hdGl2ZShBcnJheSwgJ2lzQXJyYXknKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IG5hdGl2ZUlzQXJyYXkgfHwgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcnJheVRhZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL2lzQXJyYXkuanNcbiAqKiBtb2R1bGUgaWQgPSAzN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzTmF0aXZlID0gcmVxdWlyZSgnLi4vbGFuZy9pc05hdGl2ZScpO1xuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgcmV0dXJuIGlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE5hdGl2ZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9nZXROYXRpdmUuanNcbiAqKiBtb2R1bGUgaWQgPSAzOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuL2lzRnVuY3Rpb24nKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkgPiA1KS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZuVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmblRvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UoL1tcXFxcXiQuKis/KClbXFxde318XS9nLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTmF0aXZlKEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTmF0aXZlKF8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgcmV0dXJuIHJlSXNOYXRpdmUudGVzdChmblRvU3RyaW5nLmNhbGwodmFsdWUpKTtcbiAgfVxuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiByZUlzSG9zdEN0b3IudGVzdCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNOYXRpdmU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvbGFuZy9pc05hdGl2ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIG9sZGVyIHZlcnNpb25zIG9mIENocm9tZSBhbmQgU2FmYXJpIHdoaWNoIHJldHVybiAnZnVuY3Rpb24nIGZvciByZWdleGVzXG4gIC8vIGFuZCBTYWZhcmkgOCB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBjb25zdHJ1Y3RvcnMuXG4gIHJldHVybiBpc09iamVjdCh2YWx1ZSkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gZnVuY1RhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2xhbmcvaXNGdW5jdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDQwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBbbGFuZ3VhZ2UgdHlwZV0oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2xhbmcvaXNPYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA0MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGJhc2VGb3JJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Jhc2VGb3JJbicpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgYXNzdW1lcyBvYmplY3RzIGNyZWF0ZWQgYnkgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yXG4gKiBoYXZlIG5vIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqIH1cbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QobmV3IEZvbyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoeyAneCc6IDAsICd5JzogMCB9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgdmFyIEN0b3I7XG5cbiAgLy8gRXhpdCBlYXJseSBmb3Igbm9uIGBPYmplY3RgIG9iamVjdHMuXG4gIGlmICghKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gb2JqZWN0VGFnICYmICFpc0FyZ3VtZW50cyh2YWx1ZSkpIHx8XG4gICAgICAoIWhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjb25zdHJ1Y3RvcicpICYmIChDdG9yID0gdmFsdWUuY29uc3RydWN0b3IsIHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgIShDdG9yIGluc3RhbmNlb2YgQ3RvcikpKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBJRSA8IDkgaXRlcmF0ZXMgaW5oZXJpdGVkIHByb3BlcnRpZXMgYmVmb3JlIG93biBwcm9wZXJ0aWVzLiBJZiB0aGUgZmlyc3RcbiAgLy8gaXRlcmF0ZWQgcHJvcGVydHkgaXMgYW4gb2JqZWN0J3Mgb3duIHByb3BlcnR5IHRoZW4gdGhlcmUgYXJlIG5vIGluaGVyaXRlZFxuICAvLyBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gIHZhciByZXN1bHQ7XG4gIC8vIEluIG1vc3QgZW52aXJvbm1lbnRzIGFuIG9iamVjdCdzIG93biBwcm9wZXJ0aWVzIGFyZSBpdGVyYXRlZCBiZWZvcmVcbiAgLy8gaXRzIGluaGVyaXRlZCBwcm9wZXJ0aWVzLiBJZiB0aGUgbGFzdCBpdGVyYXRlZCBwcm9wZXJ0eSBpcyBhbiBvYmplY3Qnc1xuICAvLyBvd24gcHJvcGVydHkgdGhlbiB0aGVyZSBhcmUgbm8gaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydGllcy5cbiAgYmFzZUZvckluKHZhbHVlLCBmdW5jdGlvbihzdWJWYWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0ID0ga2V5O1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdCA9PT0gdW5kZWZpbmVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHJlc3VsdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNQbGFpbk9iamVjdDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL2lzUGxhaW5PYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA0MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGJhc2VGb3IgPSByZXF1aXJlKCcuL2Jhc2VGb3InKSxcbiAgICBrZXlzSW4gPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5c0luJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9ySW5gIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2tcbiAqIHNob3J0aGFuZHMgYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGb3JJbihvYmplY3QsIGl0ZXJhdGVlKSB7XG4gIHJldHVybiBiYXNlRm9yKG9iamVjdCwgaXRlcmF0ZWUsIGtleXNJbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZvckluO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2Jhc2VGb3JJbi5qc1xuICoqIG1vZHVsZSBpZCA9IDQzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgY3JlYXRlQmFzZUZvciA9IHJlcXVpcmUoJy4vY3JlYXRlQmFzZUZvcicpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBiYXNlRm9ySW5gIGFuZCBgYmFzZUZvck93bmAgd2hpY2ggaXRlcmF0ZXNcbiAqIG92ZXIgYG9iamVjdGAgcHJvcGVydGllcyByZXR1cm5lZCBieSBga2V5c0Z1bmNgIGludm9raW5nIGBpdGVyYXRlZWAgZm9yXG4gKiBlYWNoIHByb3BlcnR5LiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHlcbiAqIHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGtleXNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGtleXMgb2YgYG9iamVjdGAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG52YXIgYmFzZUZvciA9IGNyZWF0ZUJhc2VGb3IoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRm9yO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2Jhc2VGb3IuanNcbiAqKiBtb2R1bGUgaWQgPSA0NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi90b09iamVjdCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBiYXNlIGZ1bmN0aW9uIGZvciBgXy5mb3JJbmAgb3IgYF8uZm9ySW5SaWdodGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYmFzZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmFzZUZvcihmcm9tUmlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCwgaXRlcmF0ZWUsIGtleXNGdW5jKSB7XG4gICAgdmFyIGl0ZXJhYmxlID0gdG9PYmplY3Qob2JqZWN0KSxcbiAgICAgICAgcHJvcHMgPSBrZXlzRnVuYyhvYmplY3QpLFxuICAgICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICAgIGluZGV4ID0gZnJvbVJpZ2h0ID8gbGVuZ3RoIDogLTE7XG5cbiAgICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtrZXldLCBrZXksIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQmFzZUZvcjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9jcmVhdGVCYXNlRm9yLmpzXG4gKiogbW9kdWxlIGlkID0gNDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGFuIG9iamVjdCBpZiBpdCdzIG5vdCBvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWx1ZSkgPyB2YWx1ZSA6IE9iamVjdCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9PYmplY3Q7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvdG9PYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA0NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNJbmRleCcpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKTtcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gIH1cbiAgdmFyIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7XG4gIGxlbmd0aCA9IChsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgaXNBcmd1bWVudHMob2JqZWN0KSkgJiYgbGVuZ3RoKSB8fCAwO1xuXG4gIHZhciBDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgaW5kZXggPSAtMSxcbiAgICAgIGlzUHJvdG8gPSB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlID09PSBvYmplY3QsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpLFxuICAgICAgc2tpcEluZGV4ZXMgPSBsZW5ndGggPiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IChpbmRleCArICcnKTtcbiAgfVxuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKCEoc2tpcEluZGV4ZXMgJiYgaXNJbmRleChrZXksIGxlbmd0aCkpICYmXG4gICAgICAgICEoa2V5ID09ICdjb25zdHJ1Y3RvcicgJiYgKGlzUHJvdG8gfHwgIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5c0luO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL29iamVjdC9rZXlzSW4uanNcbiAqKiBtb2R1bGUgaWQgPSA0N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL15cXGQrJC87XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgW21heGltdW0gbGVuZ3RoXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFsdWUgPSAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSA/ICt2YWx1ZSA6IC0xO1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSW5kZXg7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNJbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDQ4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9XG50eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9IHR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3Nbb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSldO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVHlwZWRBcnJheTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL2lzVHlwZWRBcnJheS5qc1xuICoqIG1vZHVsZSBpZCA9IDQ5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYmFzZUNvcHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlQ29weScpLFxuICAgIGtleXNJbiA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzSW4nKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgcGxhaW4gb2JqZWN0IGZsYXR0ZW5pbmcgaW5oZXJpdGVkIGVudW1lcmFibGVcbiAqIHByb3BlcnRpZXMgb2YgYHZhbHVlYCB0byBvd24gcHJvcGVydGllcyBvZiB0aGUgcGxhaW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBwbGFpbiBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIG5ldyBGb28pO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiB9XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgXy50b1BsYWluT2JqZWN0KG5ldyBGb28pKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIsICdjJzogMyB9XG4gKi9cbmZ1bmN0aW9uIHRvUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGJhc2VDb3B5KHZhbHVlLCBrZXlzSW4odmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1BsYWluT2JqZWN0O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2xhbmcvdG9QbGFpbk9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDUwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcGllcyBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gY29weS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDb3B5KHNvdXJjZSwgcHJvcHMsIG9iamVjdCkge1xuICBvYmplY3QgfHwgKG9iamVjdCA9IHt9KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgb2JqZWN0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VDb3B5O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2Jhc2VDb3B5LmpzXG4gKiogbW9kdWxlIGlkID0gNTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9nZXROYXRpdmUnKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzQXJyYXlMaWtlJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0JyksXG4gICAgc2hpbUtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9zaGltS2V5cycpO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBnZXROYXRpdmUoT2JqZWN0LCAna2V5cycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG52YXIga2V5cyA9ICFuYXRpdmVLZXlzID8gc2hpbUtleXMgOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgdmFyIEN0b3IgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdC5jb25zdHJ1Y3RvcjtcbiAgaWYgKCh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlID09PSBvYmplY3QpIHx8XG4gICAgICAodHlwZW9mIG9iamVjdCAhPSAnZnVuY3Rpb24nICYmIGlzQXJyYXlMaWtlKG9iamVjdCkpKSB7XG4gICAgcmV0dXJuIHNoaW1LZXlzKG9iamVjdCk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0KG9iamVjdCkgPyBuYXRpdmVLZXlzKG9iamVjdCkgOiBbXTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5cztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9vYmplY3Qva2V5cy5qc1xuICoqIG1vZHVsZSBpZCA9IDUyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuL2lzSW5kZXgnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKSxcbiAgICBrZXlzSW4gPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5c0luJyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEEgZmFsbGJhY2sgaW1wbGVtZW50YXRpb24gb2YgYE9iamVjdC5rZXlzYCB3aGljaCBjcmVhdGVzIGFuIGFycmF5IG9mIHRoZVxuICogb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIHNoaW1LZXlzKG9iamVjdCkge1xuICB2YXIgcHJvcHMgPSBrZXlzSW4ob2JqZWN0KSxcbiAgICAgIHByb3BzTGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgbGVuZ3RoID0gcHJvcHNMZW5ndGggJiYgb2JqZWN0Lmxlbmd0aDtcblxuICB2YXIgYWxsb3dJbmRleGVzID0gISFsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgaXNBcmd1bWVudHMob2JqZWN0KSk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoKytpbmRleCA8IHByb3BzTGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICBpZiAoKGFsbG93SW5kZXhlcyAmJiBpc0luZGV4KGtleSwgbGVuZ3RoKSkgfHwgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hpbUtleXM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvc2hpbUtleXMuanNcbiAqKiBtb2R1bGUgaWQgPSA1M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGJpbmRDYWxsYmFjayA9IHJlcXVpcmUoJy4vYmluZENhbGxiYWNrJyksXG4gICAgaXNJdGVyYXRlZUNhbGwgPSByZXF1aXJlKCcuL2lzSXRlcmF0ZWVDYWxsJyksXG4gICAgcmVzdFBhcmFtID0gcmVxdWlyZSgnLi4vZnVuY3Rpb24vcmVzdFBhcmFtJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGBfLmFzc2lnbmAsIGBfLmRlZmF1bHRzYCwgb3IgYF8ubWVyZ2VgIGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhc3NpZ25lciBUaGUgZnVuY3Rpb24gdG8gYXNzaWduIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFzc2lnbmVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVBc3NpZ25lcihhc3NpZ25lcikge1xuICByZXR1cm4gcmVzdFBhcmFtKGZ1bmN0aW9uKG9iamVjdCwgc291cmNlcykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBvYmplY3QgPT0gbnVsbCA/IDAgOiBzb3VyY2VzLmxlbmd0aCxcbiAgICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA+IDIgPyBzb3VyY2VzW2xlbmd0aCAtIDJdIDogdW5kZWZpbmVkLFxuICAgICAgICBndWFyZCA9IGxlbmd0aCA+IDIgPyBzb3VyY2VzWzJdIDogdW5kZWZpbmVkLFxuICAgICAgICB0aGlzQXJnID0gbGVuZ3RoID4gMSA/IHNvdXJjZXNbbGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAodHlwZW9mIGN1c3RvbWl6ZXIgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY3VzdG9taXplciA9IGJpbmRDYWxsYmFjayhjdXN0b21pemVyLCB0aGlzQXJnLCA1KTtcbiAgICAgIGxlbmd0aCAtPSAyO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXN0b21pemVyID0gdHlwZW9mIHRoaXNBcmcgPT0gJ2Z1bmN0aW9uJyA/IHRoaXNBcmcgOiB1bmRlZmluZWQ7XG4gICAgICBsZW5ndGggLT0gKGN1c3RvbWl6ZXIgPyAxIDogMCk7XG4gICAgfVxuICAgIGlmIChndWFyZCAmJiBpc0l0ZXJhdGVlQ2FsbChzb3VyY2VzWzBdLCBzb3VyY2VzWzFdLCBndWFyZCkpIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPCAzID8gdW5kZWZpbmVkIDogY3VzdG9taXplcjtcbiAgICAgIGxlbmd0aCA9IDE7XG4gICAgfVxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgc291cmNlID0gc291cmNlc1tpbmRleF07XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIGFzc2lnbmVyKG9iamVjdCwgc291cmNlLCBjdXN0b21pemVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQXNzaWduZXI7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvY3JlYXRlQXNzaWduZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA1NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlkZW50aXR5ID0gcmVxdWlyZSgnLi4vdXRpbGl0eS9pZGVudGl0eScpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUNhbGxiYWNrYCB3aGljaCBvbmx5IHN1cHBvcnRzIGB0aGlzYCBiaW5kaW5nXG4gKiBhbmQgc3BlY2lmeWluZyB0aGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYmluZC5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtudW1iZXJ9IFthcmdDb3VudF0gVGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGNhbGxiYWNrLlxuICovXG5mdW5jdGlvbiBiaW5kQ2FsbGJhY2soZnVuYywgdGhpc0FyZywgYXJnQ291bnQpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gaWRlbnRpdHk7XG4gIH1cbiAgaWYgKHRoaXNBcmcgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmdW5jO1xuICB9XG4gIHN3aXRjaCAoYXJnQ291bnQpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICB9O1xuICAgIGNhc2UgNDogcmV0dXJuIGZ1bmN0aW9uKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDU6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgb3RoZXIsIGtleSwgb2JqZWN0LCBzb3VyY2UpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmRDYWxsYmFjaztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iaW5kQ2FsbGJhY2suanNcbiAqKiBtb2R1bGUgaWQgPSA1NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBwcm92aWRlZCB0byBpdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxpdHlcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqXG4gKiBfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdDtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlkZW50aXR5O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL3V0aWxpdHkvaWRlbnRpdHkuanNcbiAqKiBtb2R1bGUgaWQgPSA1NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuL2lzSW5kZXgnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHByb3ZpZGVkIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgdmFsdWUgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IGluZGV4IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgaW5kZXggb3Iga2V5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBvYmplY3QgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBvYmplY3QgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSXRlcmF0ZWVDYWxsKHZhbHVlLCBpbmRleCwgb2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiBpbmRleDtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcidcbiAgICAgID8gKGlzQXJyYXlMaWtlKG9iamVjdCkgJiYgaXNJbmRleChpbmRleCwgb2JqZWN0Lmxlbmd0aCkpXG4gICAgICA6ICh0eXBlID09ICdzdHJpbmcnICYmIGluZGV4IGluIG9iamVjdCkpIHtcbiAgICB2YXIgb3RoZXIgPSBvYmplY3RbaW5kZXhdO1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgPyAodmFsdWUgPT09IG90aGVyKSA6IChvdGhlciAhPT0gb3RoZXIpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0l0ZXJhdGVlQ2FsbDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9pc0l0ZXJhdGVlQ2FsbC5qc1xuICoqIG1vZHVsZSBpZCA9IDU3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGVcbiAqIGNyZWF0ZWQgZnVuY3Rpb24gYW5kIGFyZ3VtZW50cyBmcm9tIGBzdGFydGAgYW5kIGJleW9uZCBwcm92aWRlZCBhcyBhbiBhcnJheS5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgYmFzZWQgb24gdGhlIFtyZXN0IHBhcmFtZXRlcl0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0Z1bmN0aW9ucy9yZXN0X3BhcmFtZXRlcnMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIHNheSA9IF8ucmVzdFBhcmFtKGZ1bmN0aW9uKHdoYXQsIG5hbWVzKSB7XG4gKiAgIHJldHVybiB3aGF0ICsgJyAnICsgXy5pbml0aWFsKG5hbWVzKS5qb2luKCcsICcpICtcbiAqICAgICAoXy5zaXplKG5hbWVzKSA+IDEgPyAnLCAmICcgOiAnJykgKyBfLmxhc3QobmFtZXMpO1xuICogfSk7XG4gKlxuICogc2F5KCdoZWxsbycsICdmcmVkJywgJ2Jhcm5leScsICdwZWJibGVzJyk7XG4gKiAvLyA9PiAnaGVsbG8gZnJlZCwgYmFybmV5LCAmIHBlYmJsZXMnXG4gKi9cbmZ1bmN0aW9uIHJlc3RQYXJhbShmdW5jLCBzdGFydCkge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICBzdGFydCA9IG5hdGl2ZU1heChzdGFydCA9PT0gdW5kZWZpbmVkID8gKGZ1bmMubGVuZ3RoIC0gMSkgOiAoK3N0YXJ0IHx8IDApLCAwKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgIHJlc3QgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHJlc3RbaW5kZXhdID0gYXJnc1tzdGFydCArIGluZGV4XTtcbiAgICB9XG4gICAgc3dpdGNoIChzdGFydCkge1xuICAgICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXMsIHJlc3QpO1xuICAgICAgY2FzZSAxOiByZXR1cm4gZnVuYy5jYWxsKHRoaXMsIGFyZ3NbMF0sIHJlc3QpO1xuICAgICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXMsIGFyZ3NbMF0sIGFyZ3NbMV0sIHJlc3QpO1xuICAgIH1cbiAgICB2YXIgb3RoZXJBcmdzID0gQXJyYXkoc3RhcnQgKyAxKTtcbiAgICBpbmRleCA9IC0xO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IHJlc3Q7XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgb3RoZXJBcmdzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZXN0UGFyYW07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvZnVuY3Rpb24vcmVzdFBhcmFtLmpzXG4gKiogbW9kdWxlIGlkID0gNThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbnB1dFN0cmVhbToge1xuICAgICAgICBuYW1lOiBcIkxpdmVcIixcbiAgICAgICAgdHlwZTogXCJMaXZlU3RyZWFtXCIsXG4gICAgICAgIGNvbnN0cmFpbnRzOiB7XG4gICAgICAgICAgICB3aWR0aDogNjQwLFxuICAgICAgICAgICAgaGVpZ2h0OiA0ODAsXG4gICAgICAgICAgICBtaW5Bc3BlY3RSYXRpbzogMCxcbiAgICAgICAgICAgIG1heEFzcGVjdFJhdGlvOiAxMDAsXG4gICAgICAgICAgICBmYWNpbmc6IFwiZW52aXJvbm1lbnRcIiAvLyBvciB1c2VyXG4gICAgICAgIH0sXG4gICAgICAgIGFyZWE6IHtcbiAgICAgICAgICAgIHRvcDogXCIwJVwiLFxuICAgICAgICAgICAgcmlnaHQ6IFwiMCVcIixcbiAgICAgICAgICAgIGxlZnQ6IFwiMCVcIixcbiAgICAgICAgICAgIGJvdHRvbTogXCIwJVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNpbmdsZUNoYW5uZWw6IGZhbHNlIC8vIHRydWU6IG9ubHkgdGhlIHJlZCBjb2xvci1jaGFubmVsIGlzIHJlYWRcbiAgICB9LFxuICAgIHRyYWNraW5nOiBmYWxzZSxcbiAgICBkZWJ1ZzogZmFsc2UsXG4gICAgY29udHJvbHM6IGZhbHNlLFxuICAgIGxvY2F0ZTogdHJ1ZSxcbiAgICBudW1PZldvcmtlcnM6IDQsXG4gICAgdmlzdWFsOiB7XG4gICAgICAgIHNob3c6IHRydWVcbiAgICB9LFxuICAgIGRlY29kZXI6IHtcbiAgICAgICAgZHJhd0JvdW5kaW5nQm94OiBmYWxzZSxcbiAgICAgICAgc2hvd0ZyZXF1ZW5jeTogZmFsc2UsXG4gICAgICAgIGRyYXdTY2FubGluZTogZmFsc2UsXG4gICAgICAgIHNob3dQYXR0ZXJuOiBmYWxzZSxcbiAgICAgICAgcmVhZGVyczogW1xuICAgICAgICAgICAgJ2NvZGVfMTI4X3JlYWRlcidcbiAgICAgICAgXVxuICAgIH0sXG4gICAgbG9jYXRvcjoge1xuICAgICAgICBoYWxmU2FtcGxlOiB0cnVlLFxuICAgICAgICBwYXRjaFNpemU6IFwibWVkaXVtXCIsIC8vIHgtc21hbGwsIHNtYWxsLCBtZWRpdW0sIGxhcmdlLCB4LWxhcmdlXG4gICAgICAgIHNob3dDYW52YXM6IGZhbHNlLFxuICAgICAgICBzaG93UGF0Y2hlczogZmFsc2UsXG4gICAgICAgIHNob3dGb3VuZFBhdGNoZXM6IGZhbHNlLFxuICAgICAgICBzaG93U2tlbGV0b246IGZhbHNlLFxuICAgICAgICBzaG93TGFiZWxzOiBmYWxzZSxcbiAgICAgICAgc2hvd1BhdGNoTGFiZWxzOiBmYWxzZSxcbiAgICAgICAgc2hvd1JlbWFpbmluZ1BhdGNoTGFiZWxzOiBmYWxzZSxcbiAgICAgICAgYm94RnJvbVBhdGNoZXM6IHtcbiAgICAgICAgICAgIHNob3dUcmFuc2Zvcm1lZDogZmFsc2UsXG4gICAgICAgICAgICBzaG93VHJhbnNmb3JtZWRCb3g6IGZhbHNlLFxuICAgICAgICAgICAgc2hvd0JCOiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NvbmZpZy5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbigpIHtcbiAgICB2YXIgZXZlbnRzID0ge307XG5cbiAgICBmdW5jdGlvbiBnZXRFdmVudChldmVudE5hbWUpIHtcbiAgICAgICAgaWYgKCFldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlcnM6IFtdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBldmVudHNbZXZlbnROYW1lXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckV2ZW50cygpe1xuICAgICAgICBldmVudHMgPSB7fTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwdWJsaXNoU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbiwgZGF0YSkge1xuICAgICAgICBpZiAoc3Vic2NyaXB0aW9uLmFzeW5jKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5jYWxsYmFjayhkYXRhKTtcbiAgICAgICAgICAgIH0sIDQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uLmNhbGxiYWNrKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3Vic2NyaWJlKGV2ZW50LCBjYWxsYmFjaywgYXN5bmMpIHtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbjtcblxuICAgICAgICBpZiAoIHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24gPSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgIGFzeW5jOiBhc3luY1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgaWYgKCFzdWJzY3JpcHRpb24uY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkNhbGxiYWNrIHdhcyBub3Qgc3BlY2lmaWVkIG9uIG9wdGlvbnNcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGdldEV2ZW50KGV2ZW50KS5zdWJzY3JpYmVycy5wdXNoKHN1YnNjcmlwdGlvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3Vic2NyaWJlOiBmdW5jdGlvbihldmVudCwgY2FsbGJhY2ssIGFzeW5jKSB7XG4gICAgICAgICAgICByZXR1cm4gc3Vic2NyaWJlKGV2ZW50LCBjYWxsYmFjaywgYXN5bmMpO1xuICAgICAgICB9LFxuICAgICAgICBwdWJsaXNoOiBmdW5jdGlvbihldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBldmVudCA9IGdldEV2ZW50KGV2ZW50TmFtZSksXG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlcnMgPSBldmVudC5zdWJzY3JpYmVycztcblxuICAgICAgICAgICAgZXZlbnQuc3Vic2NyaWJlcnMgPSBzdWJzY3JpYmVycy5maWx0ZXIoZnVuY3Rpb24oc3Vic2NyaWJlcikge1xuICAgICAgICAgICAgICAgIHB1Ymxpc2hTdWJzY3JpcHRpb24oc3Vic2NyaWJlciwgZGF0YSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFzdWJzY3JpYmVyLm9uY2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25jZTogZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrLCBhc3luYykge1xuICAgICAgICAgICAgc3Vic2NyaWJlKGV2ZW50LCB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgIGFzeW5jOiBhc3luYyxcbiAgICAgICAgICAgICAgICBvbmNlOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBldmVudDtcblxuICAgICAgICAgICAgaWYgKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgICAgIGV2ZW50ID0gZ2V0RXZlbnQoZXZlbnROYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQgJiYgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3Vic2NyaWJlcnMgPSBldmVudC5zdWJzY3JpYmVycy5maWx0ZXIoZnVuY3Rpb24oc3Vic2NyaWJlcil7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3Vic2NyaWJlci5jYWxsYmFjayAhPT0gY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN1YnNjcmliZXJzID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbGVhckV2ZW50cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn0pKCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9ldmVudHMuanNcbiAqKi8iLCJjb25zdCBtZXJnZSA9IHJlcXVpcmUoJ2xvZGFzaC9vYmplY3QvbWVyZ2UnKTtcblxudmFyIHN0cmVhbVJlZixcbiAgICBsb2FkZWREYXRhSGFuZGxlcjtcblxuLyoqXG4gKiBXcmFwcyBicm93c2VyLXNwZWNpZmljIGdldFVzZXJNZWRpYVxuICogQHBhcmFtIHtPYmplY3R9IGNvbnN0cmFpbnRzXG4gKiBAcGFyYW0ge09iamVjdH0gc3VjY2VzcyBDYWxsYmFja1xuICogQHBhcmFtIHtPYmplY3R9IGZhaWx1cmUgQ2FsbGJhY2tcbiAqL1xuZnVuY3Rpb24gZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzLCBzdWNjZXNzLCBmYWlsdXJlKSB7XG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzLCBmdW5jdGlvbiAoc3RyZWFtKSB7XG4gICAgICAgICAgICBzdHJlYW1SZWYgPSBzdHJlYW07XG4gICAgICAgICAgICB2YXIgdmlkZW9TcmMgPSAod2luZG93LlVSTCAmJiB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pKSB8fCBzdHJlYW07XG4gICAgICAgICAgICBzdWNjZXNzLmFwcGx5KG51bGwsIFt2aWRlb1NyY10pO1xuICAgICAgICB9LCBmYWlsdXJlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmYWlsdXJlKG5ldyBUeXBlRXJyb3IoXCJnZXRVc2VyTWVkaWEgbm90IGF2YWlsYWJsZVwiKSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBsb2FkZWREYXRhKHZpZGVvLCBjYWxsYmFjaykge1xuICAgIHZhciBhdHRlbXB0cyA9IDEwO1xuXG4gICAgZnVuY3Rpb24gY2hlY2tWaWRlbygpIHtcbiAgICAgICAgaWYgKGF0dGVtcHRzID4gMCkge1xuICAgICAgICAgICAgaWYgKHZpZGVvLnZpZGVvV2lkdGggPiAwICYmIHZpZGVvLnZpZGVvSGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHZpZGVvLnZpZGVvV2lkdGggKyBcInB4IHggXCIgKyB2aWRlby52aWRlb0hlaWdodCArIFwicHhcIik7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2hlY2tWaWRlbywgNTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCdVbmFibGUgdG8gcGxheSB2aWRlbyBzdHJlYW0uIElzIHdlYmNhbSB3b3JraW5nPycpO1xuICAgICAgICB9XG4gICAgICAgIGF0dGVtcHRzLS07XG4gICAgfVxuICAgIGNoZWNrVmlkZW8oKTtcbn1cblxuLyoqXG4gKiBUcmllcyB0byBhdHRhY2ggdGhlIGNhbWVyYS1zdHJlYW0gdG8gYSBnaXZlbiB2aWRlby1lbGVtZW50XG4gKiBhbmQgY2FsbHMgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gdGhlIGNvbnRlbnQgaXMgcmVhZHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25zdHJhaW50c1xuICogQHBhcmFtIHtPYmplY3R9IHZpZGVvXG4gKiBAcGFyYW0ge09iamVjdH0gY2FsbGJhY2tcbiAqL1xuZnVuY3Rpb24gaW5pdENhbWVyYShjb25zdHJhaW50cywgdmlkZW8sIGNhbGxiYWNrKSB7XG4gICAgZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzLCBmdW5jdGlvbihzcmMpIHtcbiAgICAgICAgdmlkZW8uc3JjID0gc3JjO1xuICAgICAgICBpZiAobG9hZGVkRGF0YUhhbmRsZXIpIHtcbiAgICAgICAgICAgIHZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkZWRkYXRhXCIsIGxvYWRlZERhdGFIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgbG9hZGVkRGF0YUhhbmRsZXIgPSBsb2FkZWREYXRhLmJpbmQobnVsbCwgdmlkZW8sIGNhbGxiYWNrKTtcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkZGF0YScsIGxvYWRlZERhdGFIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIHZpZGVvLnBsYXkoKTtcbiAgICB9LCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGNhbGxiYWNrKGUpO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIE5vcm1hbGl6ZXMgdGhlIGluY29taW5nIGNvbnN0cmFpbnRzIHRvIHNhdGlzZnkgdGhlIGN1cnJlbnQgYnJvd3NlclxuICogQHBhcmFtIGNvbmZpZ1xuICogQHBhcmFtIGNiIENhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aGVuZXZlciBjb25zdHJhaW50cyBhcmUgY3JlYXRlZFxuICogQHJldHVybnMgeyp9XG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZUNvbnN0cmFpbnRzKGNvbmZpZywgY2IpIHtcbiAgICB2YXIgY29uc3RyYWludHMgPSB7XG4gICAgICAgICAgICBhdWRpbzogZmFsc2UsXG4gICAgICAgICAgICB2aWRlbzogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB2aWRlb0NvbnN0cmFpbnRzID0gbWVyZ2Uoe1xuICAgICAgICAgICAgd2lkdGg6IDY0MCxcbiAgICAgICAgICAgIGhlaWdodDogNDgwLFxuICAgICAgICAgICAgbWluQXNwZWN0UmF0aW86IDAsXG4gICAgICAgICAgICBtYXhBc3BlY3RSYXRpbzogMTAwLFxuICAgICAgICAgICAgZmFjaW5nOiBcImVudmlyb25tZW50XCJcbiAgICAgICAgfSwgY29uZmlnKTtcblxuICAgIGlmICggdHlwZW9mIE1lZGlhU3RyZWFtVHJhY2sgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBNZWRpYVN0cmVhbVRyYWNrLmdldFNvdXJjZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIE1lZGlhU3RyZWFtVHJhY2suZ2V0U291cmNlcyhmdW5jdGlvbihzb3VyY2VJbmZvcykge1xuICAgICAgICAgICAgdmFyIHZpZGVvU291cmNlSWQ7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZUluZm9zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNvdXJjZUluZm8gPSBzb3VyY2VJbmZvc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlSW5mby5raW5kID09PSBcInZpZGVvXCIgJiYgc291cmNlSW5mby5mYWNpbmcgPT09IHZpZGVvQ29uc3RyYWludHMuZmFjaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZGVvU291cmNlSWQgPSBzb3VyY2VJbmZvLmlkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0ge1xuICAgICAgICAgICAgICAgIG1hbmRhdG9yeToge1xuICAgICAgICAgICAgICAgICAgICBtaW5XaWR0aDogdmlkZW9Db25zdHJhaW50cy53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgbWluSGVpZ2h0OiB2aWRlb0NvbnN0cmFpbnRzLmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgbWluQXNwZWN0UmF0aW86IHZpZGVvQ29uc3RyYWludHMubWluQXNwZWN0UmF0aW8sXG4gICAgICAgICAgICAgICAgICAgIG1heEFzcGVjdFJhdGlvOiB2aWRlb0NvbnN0cmFpbnRzLm1heEFzcGVjdFJhdGlvXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcHRpb25hbDogW3tcbiAgICAgICAgICAgICAgICAgICAgc291cmNlSWQ6IHZpZGVvU291cmNlSWRcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBjYihjb25zdHJhaW50cyk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0ge1xuICAgICAgICAgICAgbWVkaWFTb3VyY2U6IFwiY2FtZXJhXCIsXG4gICAgICAgICAgICB3aWR0aDogeyBtaW46IHZpZGVvQ29uc3RyYWludHMud2lkdGgsIG1heDogdmlkZW9Db25zdHJhaW50cy53aWR0aCB9LFxuICAgICAgICAgICAgaGVpZ2h0OiB7IG1pbjogdmlkZW9Db25zdHJhaW50cy5oZWlnaHQsIG1heDogdmlkZW9Db25zdHJhaW50cy5oZWlnaHQgfSxcbiAgICAgICAgICAgIHJlcXVpcmU6IFtcIndpZHRoXCIsIFwiaGVpZ2h0XCJdXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBjYihjb25zdHJhaW50cyk7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcXVlc3RzIHRoZSBiYWNrLWZhY2luZyBjYW1lcmEgb2YgdGhlIHVzZXIuIFRoZSBjYWxsYmFjayBpcyBjYWxsZWRcbiAqIHdoZW5ldmVyIHRoZSBzdHJlYW0gaXMgcmVhZHkgdG8gYmUgY29uc3VtZWQsIG9yIGlmIGFuIGVycm9yIG9jY3VyZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gdmlkZW9cbiAqIEBwYXJhbSB7T2JqZWN0fSBjYWxsYmFja1xuICovXG5mdW5jdGlvbiByZXF1ZXN0KHZpZGVvLCB2aWRlb0NvbnN0cmFpbnRzLCBjYWxsYmFjaykge1xuICAgIG5vcm1hbGl6ZUNvbnN0cmFpbnRzKHZpZGVvQ29uc3RyYWludHMsIGZ1bmN0aW9uKGNvbnN0cmFpbnRzKSB7XG4gICAgICAgIGluaXRDYW1lcmEoY29uc3RyYWludHMsIHZpZGVvLCBjYWxsYmFjayk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICByZXF1ZXN0OiBmdW5jdGlvbih2aWRlbywgY29uc3RyYWludHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJlcXVlc3QodmlkZW8sIGNvbnN0cmFpbnRzLCBjYWxsYmFjayk7XG4gICAgfSxcbiAgICByZWxlYXNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRyYWNrcyA9IHN0cmVhbVJlZiAmJiBzdHJlYW1SZWYuZ2V0VmlkZW9UcmFja3MoKTtcbiAgICAgICAgaWYgKHRyYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRyYWNrc1swXS5zdG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3RyZWFtUmVmID0gbnVsbDtcbiAgICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2FtZXJhX2FjY2Vzcy5qc1xuICoqLyIsImltcG9ydCBJbWFnZURlYnVnIGZyb20gJy4vaW1hZ2VfZGVidWcnO1xuXG5mdW5jdGlvbiBjb250YWlucyhjb2RlUmVzdWx0LCBsaXN0KSB7XG4gICAgaWYgKGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIGxpc3Quc29tZShmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGl0ZW0pLmV2ZXJ5KGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbVtrZXldID09PSBjb2RlUmVzdWx0W2tleV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcGFzc2VzRmlsdGVyKGNvZGVSZXN1bHQsIGZpbHRlcikge1xuICAgIGlmICh0eXBlb2YgZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBmaWx0ZXIoY29kZVJlc3VsdCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY3JlYXRlOiBmdW5jdGlvbihjb25maWcpIHtcbiAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksXG4gICAgICAgICAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLFxuICAgICAgICAgICAgcmVzdWx0cyA9IFtdLFxuICAgICAgICAgICAgY2FwYWNpdHkgPSBjb25maWcuY2FwYWNpdHkgfHwgMjAsXG4gICAgICAgICAgICBjYXB0dXJlID0gY29uZmlnLmNhcHR1cmUgPT09IHRydWU7XG5cbiAgICAgICAgZnVuY3Rpb24gbWF0Y2hlc0NvbnN0cmFpbnRzKGNvZGVSZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBjYXBhY2l0eVxuICAgICAgICAgICAgICAgICYmIGNvZGVSZXN1bHRcbiAgICAgICAgICAgICAgICAmJiAhY29udGFpbnMoY29kZVJlc3VsdCwgY29uZmlnLmJsYWNrbGlzdClcbiAgICAgICAgICAgICAgICAmJiBwYXNzZXNGaWx0ZXIoY29kZVJlc3VsdCwgY29uZmlnLmZpbHRlcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWRkUmVzdWx0OiBmdW5jdGlvbihkYXRhLCBpbWFnZVNpemUsIGNvZGVSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0ge307XG5cbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlc0NvbnN0cmFpbnRzKGNvZGVSZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhcGFjaXR5LS07XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5jb2RlUmVzdWx0ID0gY29kZVJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhcHR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IGltYWdlU2l6ZS54O1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IGltYWdlU2l6ZS55O1xuICAgICAgICAgICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3SW1hZ2UoZGF0YSwgaW1hZ2VTaXplLCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmZyYW1lID0gY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRSZXN1bHRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVzdWx0X2NvbGxlY3Rvci5qc1xuICoqLyIsImNvbnN0IEdldFBpeGVscyA9IHJlcXVpcmUoXCJnZXQtcGl4ZWxzXCIpO1xuXG52YXIgSW5wdXRTdHJlYW0gPSB7fTtcblxuSW5wdXRTdHJlYW0uY3JlYXRlSW1hZ2VTdHJlYW0gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGhhdCA9IHt9O1xuICAgIHZhciBfY29uZmlnID0gbnVsbDtcblxuICAgIHZhciB3aWR0aCA9IDAsXG4gICAgICAgIGhlaWdodCA9IDAsXG4gICAgICAgIGZyYW1lSWR4ID0gMCxcbiAgICAgICAgcGF1c2VkID0gdHJ1ZSxcbiAgICAgICAgbG9hZGVkID0gZmFsc2UsXG4gICAgICAgIGZyYW1lID0gbnVsbCxcbiAgICAgICAgYmFzZVVybCxcbiAgICAgICAgZW5kZWQgPSBmYWxzZSxcbiAgICAgICAgc2l6ZSxcbiAgICAgICAgY2FsY3VsYXRlZFdpZHRoLFxuICAgICAgICBjYWxjdWxhdGVkSGVpZ2h0LFxuICAgICAgICBfZXZlbnROYW1lcyA9IFsnY2FucmVjb3JkJywgJ2VuZGVkJ10sXG4gICAgICAgIF9ldmVudEhhbmRsZXJzID0ge30sXG4gICAgICAgIF90b3BSaWdodCA9IHt4OiAwLCB5OiAwfSxcbiAgICAgICAgX2NhbnZhc1NpemUgPSB7eDogMCwgeTogMH07XG5cbiAgICBmdW5jdGlvbiBsb2FkSW1hZ2VzKCkge1xuICAgICAgICBsb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgR2V0UGl4ZWxzKGJhc2VVcmwsIGZ1bmN0aW9uKGVyciwgcGl4ZWxzKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICBleGl0KDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBpeGVscy5zaGFwZSk7XG4gICAgICAgICAgICBmcmFtZSA9IHBpeGVscztcbiAgICAgICAgICAgIHdpZHRoID0gcGl4ZWxzLnNoYXBlWzBdO1xuICAgICAgICAgICAgaGVpZ2h0ID0gcGl4ZWxzLnNoYXBlWzFdO1xuICAgICAgICAgICAgY2FsY3VsYXRlZFdpZHRoID0gX2NvbmZpZy5zaXplID8gd2lkdGgvaGVpZ2h0ID4gMSA/IF9jb25maWcuc2l6ZSA6IE1hdGguZmxvb3IoKHdpZHRoL2hlaWdodCkgKiBfY29uZmlnLnNpemUpIDogd2lkdGg7XG4gICAgICAgICAgICBjYWxjdWxhdGVkSGVpZ2h0ID0gX2NvbmZpZy5zaXplID8gd2lkdGgvaGVpZ2h0ID4gMSA/IE1hdGguZmxvb3IoKGhlaWdodC93aWR0aCkgKiBfY29uZmlnLnNpemUpIDogX2NvbmZpZy5zaXplIDogaGVpZ2h0O1xuXG4gICAgICAgICAgICBfY2FudmFzU2l6ZS54ID0gY2FsY3VsYXRlZFdpZHRoO1xuICAgICAgICAgICAgX2NhbnZhc1NpemUueSA9IGNhbGN1bGF0ZWRIZWlnaHQ7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcHVibGlzaEV2ZW50KFwiY2FucmVjb3JkXCIsIFtdKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwdWJsaXNoRXZlbnQoZXZlbnROYW1lLCBhcmdzKSB7XG4gICAgICAgIHZhciBqLFxuICAgICAgICAgICAgaGFuZGxlcnMgPSBfZXZlbnRIYW5kbGVyc1tldmVudE5hbWVdO1xuXG4gICAgICAgIGlmIChoYW5kbGVycyAmJiBoYW5kbGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IGhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcnNbal0uYXBwbHkodGhhdCwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHRoYXQudHJpZ2dlciA9IHB1Ymxpc2hFdmVudDtcblxuICAgIHRoYXQuZ2V0V2lkdGggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGNhbGN1bGF0ZWRXaWR0aDtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRIZWlnaHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGNhbGN1bGF0ZWRIZWlnaHQ7XG4gICAgfTtcblxuICAgIHRoYXQuc2V0V2lkdGggPSBmdW5jdGlvbih3aWR0aCkge1xuICAgICAgICBjYWxjdWxhdGVkV2lkdGggPSB3aWR0aDtcbiAgICB9O1xuXG4gICAgdGhhdC5zZXRIZWlnaHQgPSBmdW5jdGlvbihoZWlnaHQpIHtcbiAgICAgICAgY2FsY3VsYXRlZEhlaWdodCA9IGhlaWdodDtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRSZWFsV2lkdGggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHdpZHRoO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFJlYWxIZWlnaHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGhlaWdodDtcbiAgICB9O1xuXG4gICAgdGhhdC5zZXRJbnB1dFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICBfY29uZmlnID0gc3RyZWFtO1xuICAgICAgICBiYXNlVXJsID0gX2NvbmZpZy5zcmM7XG4gICAgICAgIHNpemUgPSAxO1xuICAgICAgICBsb2FkSW1hZ2VzKCk7XG4gICAgfTtcblxuICAgIHRoYXQuZW5kZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGVuZGVkO1xuICAgIH07XG5cbiAgICB0aGF0LnNldEF0dHJpYnV0ZSA9IGZ1bmN0aW9uKCkge307XG5cbiAgICB0aGF0LmdldENvbmZpZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX2NvbmZpZztcbiAgICB9O1xuXG4gICAgdGhhdC5wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXVzZWQgPSB0cnVlO1xuICAgIH07XG5cbiAgICB0aGF0LnBsYXkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcGF1c2VkID0gZmFsc2U7XG4gICAgfTtcblxuICAgIHRoYXQuc2V0Q3VycmVudFRpbWUgPSBmdW5jdGlvbih0aW1lKSB7XG4gICAgICAgIGZyYW1lSWR4ID0gdGltZTtcbiAgICB9O1xuXG4gICAgdGhhdC5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGYpIHtcbiAgICAgICAgaWYgKF9ldmVudE5hbWVzLmluZGV4T2YoZXZlbnQpICE9PSAtMSkge1xuICAgICAgICAgICAgaWYgKCFfZXZlbnRIYW5kbGVyc1tldmVudF0pIHtcbiAgICAgICAgICAgICAgICBfZXZlbnRIYW5kbGVyc1tldmVudF0gPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9ldmVudEhhbmRsZXJzW2V2ZW50XS5wdXNoKGYpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuc2V0VG9wUmlnaHQgPSBmdW5jdGlvbih0b3BSaWdodCkge1xuICAgICAgICBfdG9wUmlnaHQueCA9IHRvcFJpZ2h0Lng7XG4gICAgICAgIF90b3BSaWdodC55ID0gdG9wUmlnaHQueTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRUb3BSaWdodCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX3RvcFJpZ2h0O1xuICAgIH07XG5cbiAgICB0aGF0LnNldENhbnZhc1NpemUgPSBmdW5jdGlvbihzaXplKSB7XG4gICAgICAgIF9jYW52YXNTaXplLnggPSBzaXplLng7XG4gICAgICAgIF9jYW52YXNTaXplLnkgPSBzaXplLnk7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0Q2FudmFzU2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX2NhbnZhc1NpemU7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0RnJhbWUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFsb2FkZWQpe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZyYW1lO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXRTdHJlYW07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9pbnB1dF9zdHJlYW0uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnZXQtcGl4ZWxzXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJnZXQtcGl4ZWxzXCJcbiAqKiBtb2R1bGUgaWQgPSA2NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiY29uc3QgQ1ZVdGlscyA9IHJlcXVpcmUoJy4uL3NyYy9jdl91dGlscycpLFxuICAgICAgTmRhcnJheSA9IHJlcXVpcmUoXCJuZGFycmF5XCIpLFxuICAgICAgSW50ZXJwMkQgPSByZXF1aXJlKFwibmRhcnJheS1saW5lYXItaW50ZXJwb2xhdGVcIikuZDI7XG5cbnZhciBGcmFtZUdyYWJiZXIgPSB7fTtcblxuRnJhbWVHcmFiYmVyLmNyZWF0ZSA9IGZ1bmN0aW9uKGlucHV0U3RyZWFtKSB7XG4gICAgdmFyIF90aGF0ID0ge30sXG4gICAgICAgIF9zdHJlYW1Db25maWcgPSBpbnB1dFN0cmVhbS5nZXRDb25maWcoKSxcbiAgICAgICAgX3ZpZGVvX3NpemUgPSBDVlV0aWxzLmltYWdlUmVmKGlucHV0U3RyZWFtLmdldFJlYWxXaWR0aCgpLCBpbnB1dFN0cmVhbS5nZXRSZWFsSGVpZ2h0KCkpLFxuICAgICAgICBfY2FudmFzU2l6ZSA9IGlucHV0U3RyZWFtLmdldENhbnZhc1NpemUoKSxcbiAgICAgICAgX3NpemUgPSBDVlV0aWxzLmltYWdlUmVmKGlucHV0U3RyZWFtLmdldFdpZHRoKCksIGlucHV0U3RyZWFtLmdldEhlaWdodCgpKSxcbiAgICAgICAgX3RvcFJpZ2h0ID0gaW5wdXRTdHJlYW0uZ2V0VG9wUmlnaHQoKSxcbiAgICAgICAgX2RhdGEgPSBuZXcgVWludDhBcnJheShfc2l6ZS54ICogX3NpemUueSksXG4gICAgICAgIF9ncmF5RGF0YSA9IG5ldyBVaW50OEFycmF5KF92aWRlb19zaXplLnggKiBfdmlkZW9fc2l6ZS55KSxcbiAgICAgICAgX2NhbnZhc0RhdGEgPSBuZXcgVWludDhBcnJheShfY2FudmFzU2l6ZS54ICogX2NhbnZhc1NpemUueSksXG4gICAgICAgIF9ncmF5SW1hZ2VBcnJheSA9IE5kYXJyYXkoX2dyYXlEYXRhLCBbX3ZpZGVvX3NpemUueSwgX3ZpZGVvX3NpemUueF0pLnRyYW5zcG9zZSgxLCAwKSxcbiAgICAgICAgX2NhbnZhc0ltYWdlQXJyYXkgPSBOZGFycmF5KF9jYW52YXNEYXRhLCBbX2NhbnZhc1NpemUueSwgX2NhbnZhc1NpemUueF0pLnRyYW5zcG9zZSgxLCAwKSxcbiAgICAgICAgX3RhcmdldEltYWdlQXJyYXkgPSBfY2FudmFzSW1hZ2VBcnJheS5oaShfdG9wUmlnaHQueCArIF9zaXplLngsIF90b3BSaWdodC55ICsgX3NpemUueSkubG8oX3RvcFJpZ2h0LngsIF90b3BSaWdodC55KSxcbiAgICAgICAgX3N0ZXBTaXplWCA9IF92aWRlb19zaXplLngvX2NhbnZhc1NpemUueCxcbiAgICAgICAgX3N0ZXBTaXplWSA9IF92aWRlb19zaXplLnkvX2NhbnZhc1NpemUueTtcblxuICAgIGNvbnNvbGUubG9nKFwiRnJhbWVHcmFiYmVyXCIsIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdmlkZW9TaXplOiBfZ3JheUltYWdlQXJyYXkuc2hhcGUsXG4gICAgICAgIGNhbnZhc1NpemU6IF9jYW52YXNJbWFnZUFycmF5LnNoYXBlLFxuICAgICAgICBzdGVwU2l6ZTogW19zdGVwU2l6ZVgsIF9zdGVwU2l6ZVldLFxuICAgICAgICBzaXplOiBfdGFyZ2V0SW1hZ2VBcnJheS5zaGFwZSxcbiAgICAgICAgdG9wUmlnaHQ6IF90b3BSaWdodFxuICAgIH0pKTtcblxuICAgIC8qKlxuICAgICAqIFVzZXMgdGhlIGdpdmVuIGFycmF5IGFzIGZyYW1lLWJ1ZmZlclxuICAgICAqL1xuICAgIF90aGF0LmF0dGFjaERhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIF9kYXRhID0gZGF0YTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdXNlZCBmcmFtZS1idWZmZXJcbiAgICAgKi9cbiAgICBfdGhhdC5nZXREYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfZGF0YTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmV0Y2hlcyBhIGZyYW1lIGZyb20gdGhlIGlucHV0LXN0cmVhbSBhbmQgcHV0cyBpbnRvIHRoZSBmcmFtZS1idWZmZXIuXG4gICAgICogVGhlIGltYWdlLWRhdGEgaXMgY29udmVydGVkIHRvIGdyYXktc2NhbGUgYW5kIHRoZW4gaGFsZi1zYW1wbGVkIGlmIGNvbmZpZ3VyZWQuXG4gICAgICovXG4gICAgX3RoYXQuZ3JhYiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZnJhbWUgPSBpbnB1dFN0cmVhbS5nZXRGcmFtZSgpO1xuXG4gICAgICAgIGlmIChmcmFtZSkge1xuICAgICAgICAgICAgdGhpcy5zY2FsZUFuZENyb3AoZnJhbWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgX3RoYXQuc2NhbGVBbmRDcm9wID0gZnVuY3Rpb24oZnJhbWUpIHtcbiAgICAgICAgdmFyIHgsXG4gICAgICAgICAgICB5O1xuXG4gICAgICAgIC8vIDEuIGNvbXB1dGUgZnVsbC1zaXplZCBncmF5IGltYWdlXG4gICAgICAgIENWVXRpbHMuY29tcHV0ZUdyYXkoZnJhbWUuZGF0YSwgX2dyYXlEYXRhKTtcblxuICAgICAgICAvLyAyLiBpbnRlcnBvbGF0ZVxuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgX2NhbnZhc1NpemUueTsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgX2NhbnZhc1NpemUueDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgX2NhbnZhc0ltYWdlQXJyYXkuc2V0KHgsIHksIChJbnRlcnAyRChfZ3JheUltYWdlQXJyYXksIHggKiBfc3RlcFNpemVYLCB5ICogX3N0ZXBTaXplWSkpIHwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0YXJnZXRJbWFnZUFycmF5IG11c3QgYmUgZXF1YWwgdG8gdGFyZ2V0U2l6ZVxuICAgICAgICBpZiAoX3RhcmdldEltYWdlQXJyYXkuc2hhcGVbMF0gIT09IF9zaXplLnggfHxcbiAgICAgICAgICAgIF90YXJnZXRJbWFnZUFycmF5LnNoYXBlWzFdICE9PSBfc2l6ZS55KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGFwZXMgZG8gbm90IG1hdGNoIVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDMuIGNyb3BcbiAgICAgICAgZm9yICh5ID0gMDsgeSA8IF9zaXplLnk7IHkrKykge1xuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IF9zaXplLng7IHgrKykge1xuICAgICAgICAgICAgICAgIF9kYXRhW3kgKiBfc2l6ZS54ICsgeF0gPSBfdGFyZ2V0SW1hZ2VBcnJheS5nZXQoeCwgeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3RoYXQuZ2V0U2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX3NpemU7XG4gICAgfTtcblxuICAgIHJldHVybiBfdGhhdDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRnJhbWVHcmFiYmVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvZnJhbWVfZ3JhYmJlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5kYXJyYXlcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIm5kYXJyYXlcIlxuICoqIG1vZHVsZSBpZCA9IDY2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZGFycmF5LWxpbmVhci1pbnRlcnBvbGF0ZVwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwibmRhcnJheS1saW5lYXItaW50ZXJwb2xhdGVcIlxuICoqIG1vZHVsZSBpZCA9IDY3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9