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
	
	    if (_config.numOfWorkers > 0) {
	        initWorkers(function () {
	            if (false) {
	                console.log("Workers created");
	            }
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
	            if (false) {
	                console.log("Worker terminated!");
	            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjgxZGVkNGQ1ZmEyMjI5NzA5NzIiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3F1YWdnYS5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvY29tbW9uL3R5cGVkZWZzLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vaW1hZ2Vfd3JhcHBlci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvY29tbW9uL3N1YkltYWdlLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vY3ZfdXRpbHMuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvbW1vbi9jbHVzdGVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImdsLW1hdHJpeFwiIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vYXJyYXlfaGVscGVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9sb2NhdG9yL2JhcmNvZGVfbG9jYXRvci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvY29tbW9uL2ltYWdlX2RlYnVnLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9sb2NhdG9yL3Jhc3Rlcml6ZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2xvY2F0b3IvdHJhY2VyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9sb2NhdG9yL3NrZWxldG9uaXplci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvZGVjb2Rlci9iYXJjb2RlX2RlY29kZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2RlY29kZXIvYnJlc2VuaGFtLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvY29kZV8xMjhfcmVhZGVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvYmFyY29kZV9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9lYW5fcmVhZGVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvY29kZV8zOV9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9jb2RlXzM5X3Zpbl9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9jb2RhYmFyX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL3VwY19yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9lYW5fOF9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci91cGNfZV9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9pMm9mNV9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvb2JqZWN0L21lcmdlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2Jhc2VNZXJnZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9hcnJheUVhY2guanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZU1lcmdlRGVlcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9hcnJheUNvcHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbGFuZy9pc0FyZ3VtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9pc0FycmF5TGlrZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9nZXRMZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2lzTGVuZ3RoLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2lzT2JqZWN0TGlrZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9sYW5nL2lzQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvZ2V0TmF0aXZlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvaXNOYXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbGFuZy9pc0Z1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvaXNPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbGFuZy9pc1BsYWluT2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2Jhc2VGb3JJbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlRm9yLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2NyZWF0ZUJhc2VGb3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvdG9PYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvb2JqZWN0L2tleXNJbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9pc0luZGV4LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvaXNUeXBlZEFycmF5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvdG9QbGFpbk9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlQ29weS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9zaGltS2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9jcmVhdGVBc3NpZ25lci5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9iaW5kQ2FsbGJhY2suanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvdXRpbGl0eS9pZGVudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9pc0l0ZXJhdGVlQ2FsbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9mdW5jdGlvbi9yZXN0UGFyYW0uanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvbW1vbi9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2lucHV0L2NhbWVyYV9hY2Nlc3MuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2FuYWx5dGljcy9yZXN1bHRfY29sbGVjdG9yLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jb25maWcvY29uZmlnLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jb25maWcvY29uZmlnLm5vZGUuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvbGliL2lucHV0X3N0cmVhbS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJnZXQtcGl4ZWxzXCIiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvbGliL2ZyYW1lX2dyYWJiZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmRhcnJheVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5kYXJyYXktbGluZWFyLWludGVycG9sYXRlXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDL0MsU0FBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsU0FBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCLFNBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDckIsU0FBSSxDQUFDLENBQUM7O0FBRU4sWUFBTyxZQUFZLEdBQUcsTUFBTSxFQUFFO0FBQzFCLGNBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzVCLHFCQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUM1QixLQUFLLEdBQUcsVUFBVSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQ3JDLEtBQUssR0FBRyxVQUFVLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FDckMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUNyQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQzNDLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FDM0MsS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQzVDLEtBQUssR0FBRyxVQUFVLENBQUUsWUFBWSxHQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FDMUMsS0FBSyxHQUFHLFVBQVUsQ0FBRSxZQUFZLEdBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUMxQyxLQUFLLEdBQUcsVUFBVSxDQUFFLFlBQVksR0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFDM0MsS0FBSyxHQUFHLFVBQVUsQ0FB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QUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQy9DLGFBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7TUFDdEM7OztBQUdELFVBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDdEMsYUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0FBQ3JDLHNCQUFTLEdBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFJLENBQUMsR0FBSSxDQUFDLENBQUM7VUFDdEYsTUFBTTtBQUNILHNCQUFTLEdBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUUsR0FBSSxDQUFDLENBQUM7VUFDdEY7O0FBRUQsY0FBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDbkQsaUJBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7VUFDekM7TUFD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Q0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFD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RSxDQUFDLEVBQUM7QUFDeEIsV0FBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBQztBQUNsQixpQkFBWSxFQUFFLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQztBQUN6QixrQkFBYSxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQztBQUN6RCxpQkFBWSxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQztBQUN4RCxtQkFBYyxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQztBQUNoRixpQkFBWSxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDZixFQUFDO0FBQ0YsbUJBQWMsRUFBRSxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDO0FBQ2hFLHNCQUFpQixFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQztBQUNoQyxtQkFBYyxFQUFFLEVBQUMs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RSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFDN0csRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDO0FBQ3BGLHdCQUFtQixFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQzVHLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFDOUcsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUNqSCxFQUFDO0FBQ0YsYUFBUSxF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LENBQUM7O0FBRUYsWUFBTyxLQUFLLENBQUM7RUFDaEIsQ0FBQzs7QUFFRixPQUFNLENBQUMsT0FBTyxHQUFHLFlBQVksQzs7Ozs7O0FDOUY3QixxQzs7Ozs7O0FDQUEsd0QiLCJmaWxlIjoicXVhZ2dhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZjgxZGVkNGQ1ZmEyMjI5NzA5NzJcbiAqKi8iLCJpbXBvcnQgVHlwZURlZnMgZnJvbSAnLi9jb21tb24vdHlwZWRlZnMnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbmltcG9ydCBJbWFnZVdyYXBwZXIgZnJvbSAnLi9jb21tb24vaW1hZ2Vfd3JhcHBlcic7XHJcbmltcG9ydCBCYXJjb2RlTG9jYXRvciBmcm9tICcuL2xvY2F0b3IvYmFyY29kZV9sb2NhdG9yJztcclxuaW1wb3J0IEJhcmNvZGVEZWNvZGVyIGZyb20gJy4vZGVjb2Rlci9iYXJjb2RlX2RlY29kZXInO1xyXG5pbXBvcnQgRXZlbnRzIGZyb20gJy4vY29tbW9uL2V2ZW50cyc7XHJcbmltcG9ydCBDYW1lcmFBY2Nlc3MgZnJvbSAnLi9pbnB1dC9jYW1lcmFfYWNjZXNzJztcclxuaW1wb3J0IEltYWdlRGVidWcgZnJvbSAnLi9jb21tb24vaW1hZ2VfZGVidWcnO1xyXG5pbXBvcnQge3ZlYzJ9IGZyb20gJ2dsLW1hdHJpeCc7XHJcbmltcG9ydCBSZXN1bHRDb2xsZWN0b3IgZnJvbSAnLi9hbmFseXRpY3MvcmVzdWx0X2NvbGxlY3Rvcic7XHJcbmltcG9ydCBDb25maWcgZnJvbSAnLi9jb25maWcvY29uZmlnJztcclxuaW1wb3J0IElucHV0U3RyZWFtIGZyb20gJ2lucHV0X3N0cmVhbSc7XHJcbmltcG9ydCBGcmFtZUdyYWJiZXIgZnJvbSAnZnJhbWVfZ3JhYmJlcic7XHJcblxyXG5jb25zdCBtZXJnZSA9IHJlcXVpcmUoJ2xvZGFzaC9vYmplY3QvbWVyZ2UnKTtcclxuXHJcbnZhciBfaW5wdXRTdHJlYW0sXHJcbiAgICBfZnJhbWVncmFiYmVyLFxyXG4gICAgX3N0b3BwZWQsXHJcbiAgICBfY2FudmFzQ29udGFpbmVyID0ge1xyXG4gICAgICAgIGN0eDoge1xyXG4gICAgICAgICAgICBpbWFnZTogbnVsbCxcclxuICAgICAgICAgICAgb3ZlcmxheTogbnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZG9tOiB7XHJcbiAgICAgICAgICAgIGltYWdlOiBudWxsLFxyXG4gICAgICAgICAgICBvdmVybGF5OiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIF9pbnB1dEltYWdlV3JhcHBlcixcclxuICAgIF9ib3hTaXplLFxyXG4gICAgX2RlY29kZXIsXHJcbiAgICBfd29ya2VyUG9vbCA9IFtdLFxyXG4gICAgX29uVUlUaHJlYWQgPSB0cnVlLFxyXG4gICAgX3Jlc3VsdENvbGxlY3RvcixcclxuICAgIF9jb25maWcgPSB7fTtcclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVEYXRhKGltYWdlV3JhcHBlcikge1xyXG4gICAgaW5pdEJ1ZmZlcnMoaW1hZ2VXcmFwcGVyKTtcclxuICAgIF9kZWNvZGVyID0gQmFyY29kZURlY29kZXIuY3JlYXRlKF9jb25maWcuZGVjb2RlciwgX2lucHV0SW1hZ2VXcmFwcGVyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdElucHV0U3RyZWFtKGNiKSB7XHJcbiAgICB2YXIgdmlkZW87XHJcbiAgICBpZiAoX2NvbmZpZy5pbnB1dFN0cmVhbS50eXBlID09PSBcIlZpZGVvU3RyZWFtXCIpIHtcclxuICAgICAgICB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ2aWRlb1wiKTtcclxuICAgICAgICBfaW5wdXRTdHJlYW0gPSBJbnB1dFN0cmVhbS5jcmVhdGVWaWRlb1N0cmVhbSh2aWRlbyk7XHJcbiAgICB9IGVsc2UgaWYgKF9jb25maWcuaW5wdXRTdHJlYW0udHlwZSA9PT0gXCJJbWFnZVN0cmVhbVwiKSB7XHJcbiAgICAgICAgX2lucHV0U3RyZWFtID0gSW5wdXRTdHJlYW0uY3JlYXRlSW1hZ2VTdHJlYW0oKTtcclxuICAgIH0gZWxzZSBpZiAoX2NvbmZpZy5pbnB1dFN0cmVhbS50eXBlID09PSBcIkxpdmVTdHJlYW1cIikge1xyXG4gICAgICAgIHZhciAkdmlld3BvcnQgPSBnZXRWaWV3UG9ydCgpO1xyXG4gICAgICAgIGlmICgkdmlld3BvcnQpIHtcclxuICAgICAgICAgICAgdmlkZW8gPSAkdmlld3BvcnQucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpO1xyXG4gICAgICAgICAgICBpZiAoIXZpZGVvKSB7XHJcbiAgICAgICAgICAgICAgICB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ2aWRlb1wiKTtcclxuICAgICAgICAgICAgICAgICR2aWV3cG9ydC5hcHBlbmRDaGlsZCh2aWRlbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgX2lucHV0U3RyZWFtID0gSW5wdXRTdHJlYW0uY3JlYXRlTGl2ZVN0cmVhbSh2aWRlbyk7XHJcbiAgICAgICAgQ2FtZXJhQWNjZXNzLnJlcXVlc3QodmlkZW8sIF9jb25maWcuaW5wdXRTdHJlYW0uY29uc3RyYWludHMsIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICBpZiAoIWVycikge1xyXG4gICAgICAgICAgICAgICAgX2lucHV0U3RyZWFtLnRyaWdnZXIoXCJjYW5yZWNvcmRcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2IoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIF9pbnB1dFN0cmVhbS5zZXRBdHRyaWJ1dGUoXCJwcmVsb2FkXCIsIFwiYXV0b1wiKTtcclxuICAgIF9pbnB1dFN0cmVhbS5zZXRBdHRyaWJ1dGUoXCJhdXRvcGxheVwiLCB0cnVlKTtcclxuICAgIF9pbnB1dFN0cmVhbS5zZXRJbnB1dFN0cmVhbShfY29uZmlnLmlucHV0U3RyZWFtKTtcclxuICAgIF9pbnB1dFN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFwiY2FucmVjb3JkXCIsIGNhblJlY29yZC5iaW5kKHVuZGVmaW5lZCwgY2IpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Vmlld1BvcnQoKSB7XHJcbiAgICB2YXIgdGFyZ2V0ID0gX2NvbmZpZy5pbnB1dFN0cmVhbS50YXJnZXQ7XHJcbiAgICAvLyBDaGVjayBpZiB0YXJnZXQgaXMgYWxyZWFkeSBhIERPTSBlbGVtZW50XHJcbiAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5ub2RlTmFtZSAmJiB0YXJnZXQubm9kZVR5cGUgPT09IDEpIHtcclxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBVc2UgJyNpbnRlcmFjdGl2ZS52aWV3cG9ydCcgYXMgYSBmYWxsYmFjayBzZWxlY3RvciAoYmFja3dhcmRzIGNvbXBhdGliaWxpdHkpXHJcbiAgICAgICAgdmFyIHNlbGVjdG9yID0gdHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycgPyB0YXJnZXQgOiAnI2ludGVyYWN0aXZlLnZpZXdwb3J0JztcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhblJlY29yZChjYikge1xyXG4gICAgQmFyY29kZUxvY2F0b3IuY2hlY2tJbWFnZUNvbnN0cmFpbnRzKF9pbnB1dFN0cmVhbSwgX2NvbmZpZy5sb2NhdG9yKTtcclxuICAgIGluaXRDYW52YXMoX2NvbmZpZyk7XHJcbiAgICBfZnJhbWVncmFiYmVyID0gRnJhbWVHcmFiYmVyLmNyZWF0ZShfaW5wdXRTdHJlYW0sIF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlKTtcclxuXHJcbiAgICBpZiAoX2NvbmZpZy5udW1PZldvcmtlcnMgPiAwKSB7XHJcbiAgICAgICAgaW5pdFdvcmtlcnMoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV29ya2VycyBjcmVhdGVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlYWR5KGNiKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5pdGlhbGl6ZURhdGEoKTtcclxuICAgICAgICByZWFkeShjYik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWR5KGNiKXtcclxuICAgIF9pbnB1dFN0cmVhbS5wbGF5KCk7XHJcbiAgICBjYigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0Q2FudmFzKCkge1xyXG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIHZhciAkdmlld3BvcnQgPSBnZXRWaWV3UG9ydCgpO1xyXG4gICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhcy5pbWdCdWZmZXJcIik7XHJcbiAgICAgICAgaWYgKCFfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZSkge1xyXG4gICAgICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlLmNsYXNzTmFtZSA9IFwiaW1nQnVmZmVyXCI7XHJcbiAgICAgICAgICAgIGlmICgkdmlld3BvcnQgJiYgX2NvbmZpZy5pbnB1dFN0cmVhbS50eXBlID09PSBcIkltYWdlU3RyZWFtXCIpIHtcclxuICAgICAgICAgICAgICAgICR2aWV3cG9ydC5hcHBlbmRDaGlsZChfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5jdHguaW1hZ2UgPSBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2Uud2lkdGggPSBfaW5wdXRTdHJlYW0uZ2V0Q2FudmFzU2l6ZSgpLng7XHJcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UuaGVpZ2h0ID0gX2lucHV0U3RyZWFtLmdldENhbnZhc1NpemUoKS55O1xyXG5cclxuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhcy5kcmF3aW5nQnVmZmVyXCIpO1xyXG4gICAgICAgIGlmICghX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheSkge1xyXG4gICAgICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheS5jbGFzc05hbWUgPSBcImRyYXdpbmdCdWZmZXJcIjtcclxuICAgICAgICAgICAgaWYgKCR2aWV3cG9ydCkge1xyXG4gICAgICAgICAgICAgICAgJHZpZXdwb3J0LmFwcGVuZENoaWxkKF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBjbGVhckZpeCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKTtcclxuICAgICAgICAgICAgY2xlYXJGaXguc2V0QXR0cmlidXRlKFwiY2xlYXJcIiwgXCJhbGxcIik7XHJcbiAgICAgICAgICAgIGlmICgkdmlld3BvcnQpIHtcclxuICAgICAgICAgICAgICAgICR2aWV3cG9ydC5hcHBlbmRDaGlsZChjbGVhckZpeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5jdHgub3ZlcmxheSA9IF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkud2lkdGggPSBfaW5wdXRTdHJlYW0uZ2V0Q2FudmFzU2l6ZSgpLng7XHJcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheS5oZWlnaHQgPSBfaW5wdXRTdHJlYW0uZ2V0Q2FudmFzU2l6ZSgpLnk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRCdWZmZXJzKGltYWdlV3JhcHBlcikge1xyXG4gICAgaWYgKGltYWdlV3JhcHBlcikge1xyXG4gICAgICAgIF9pbnB1dEltYWdlV3JhcHBlciA9IGltYWdlV3JhcHBlcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX2lucHV0SW1hZ2VXcmFwcGVyID0gbmV3IEltYWdlV3JhcHBlcih7XHJcbiAgICAgICAgICAgIHg6IF9pbnB1dFN0cmVhbS5nZXRXaWR0aCgpLFxyXG4gICAgICAgICAgICB5OiBfaW5wdXRTdHJlYW0uZ2V0SGVpZ2h0KClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoRU5WLmRldmVsb3BtZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUpO1xyXG4gICAgfVxyXG4gICAgX2JveFNpemUgPSBbXHJcbiAgICAgICAgdmVjMi5jbG9uZShbMCwgMF0pLFxyXG4gICAgICAgIHZlYzIuY2xvbmUoWzAsIF9pbnB1dEltYWdlV3JhcHBlci5zaXplLnldKSxcclxuICAgICAgICB2ZWMyLmNsb25lKFtfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS54LCBfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS55XSksXHJcbiAgICAgICAgdmVjMi5jbG9uZShbX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUueCwgMF0pXHJcbiAgICBdO1xyXG4gICAgQmFyY29kZUxvY2F0b3IuaW5pdChfaW5wdXRJbWFnZVdyYXBwZXIsIF9jb25maWcubG9jYXRvcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEJvdW5kaW5nQm94ZXMoKSB7XHJcbiAgICBpZiAoX2NvbmZpZy5sb2NhdGUpIHtcclxuICAgICAgICByZXR1cm4gQmFyY29kZUxvY2F0b3IubG9jYXRlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBbW1xyXG4gICAgICAgICAgICB2ZWMyLmNsb25lKF9ib3hTaXplWzBdKSxcclxuICAgICAgICAgICAgdmVjMi5jbG9uZShfYm94U2l6ZVsxXSksXHJcbiAgICAgICAgICAgIHZlYzIuY2xvbmUoX2JveFNpemVbMl0pLFxyXG4gICAgICAgICAgICB2ZWMyLmNsb25lKF9ib3hTaXplWzNdKV1dO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB0cmFuc2Zvcm1SZXN1bHQocmVzdWx0KSB7XHJcbiAgICB2YXIgdG9wUmlnaHQgPSBfaW5wdXRTdHJlYW0uZ2V0VG9wUmlnaHQoKSxcclxuICAgICAgICB4T2Zmc2V0ID0gdG9wUmlnaHQueCxcclxuICAgICAgICB5T2Zmc2V0ID0gdG9wUmlnaHQueSxcclxuICAgICAgICBpO1xyXG5cclxuICAgIGlmICh4T2Zmc2V0ID09PSAwICYmIHlPZmZzZXQgPT09IDApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlc3VsdC5iYXJjb2Rlcykge1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCByZXN1bHQuYmFyY29kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdHJhbnNmb3JtUmVzdWx0KHJlc3VsdC5iYXJjb2Rlc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXN1bHQubGluZSAmJiByZXN1bHQubGluZS5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICBtb3ZlTGluZShyZXN1bHQubGluZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlc3VsdC5ib3gpIHtcclxuICAgICAgICBtb3ZlQm94KHJlc3VsdC5ib3gpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXN1bHQuYm94ZXMgJiYgcmVzdWx0LmJveGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcmVzdWx0LmJveGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG1vdmVCb3gocmVzdWx0LmJveGVzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW92ZUJveChib3gpIHtcclxuICAgICAgICB2YXIgY29ybmVyID0gYm94Lmxlbmd0aDtcclxuXHJcbiAgICAgICAgd2hpbGUgKGNvcm5lci0tKSB7XHJcbiAgICAgICAgICAgIGJveFtjb3JuZXJdWzBdICs9IHhPZmZzZXQ7XHJcbiAgICAgICAgICAgIGJveFtjb3JuZXJdWzFdICs9IHlPZmZzZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vdmVMaW5lKGxpbmUpIHtcclxuICAgICAgICBsaW5lWzBdLnggKz0geE9mZnNldDtcclxuICAgICAgICBsaW5lWzBdLnkgKz0geU9mZnNldDtcclxuICAgICAgICBsaW5lWzFdLnggKz0geE9mZnNldDtcclxuICAgICAgICBsaW5lWzFdLnkgKz0geU9mZnNldDtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkUmVzdWx0IChyZXN1bHQsIGltYWdlRGF0YSkge1xyXG4gICAgaWYgKCFpbWFnZURhdGEgfHwgIV9yZXN1bHRDb2xsZWN0b3IpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlc3VsdC5iYXJjb2Rlcykge1xyXG4gICAgICAgIHJlc3VsdC5iYXJjb2Rlcy5maWx0ZXIoYmFyY29kZSA9PiBiYXJjb2RlLmNvZGVSZXN1bHQpXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKGJhcmNvZGUgPT4gYWRkUmVzdWx0KGJhcmNvZGUsIGltYWdlRGF0YSkpO1xyXG4gICAgfSBlbHNlIGlmIChyZXN1bHQuY29kZVJlc3VsdCkge1xyXG4gICAgICAgIF9yZXN1bHRDb2xsZWN0b3IuYWRkUmVzdWx0KGltYWdlRGF0YSwgX2lucHV0U3RyZWFtLmdldENhbnZhc1NpemUoKSwgcmVzdWx0LmNvZGVSZXN1bHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBoYXNDb2RlUmVzdWx0IChyZXN1bHQpIHtcclxuICAgIHJldHVybiByZXN1bHQgJiYgKHJlc3VsdC5iYXJjb2RlcyA/XHJcbiAgICAgIHJlc3VsdC5iYXJjb2Rlcy5zb21lKGJhcmNvZGUgPT4gYmFyY29kZS5jb2RlUmVzdWx0KSA6XHJcbiAgICAgIHJlc3VsdC5jb2RlUmVzdWx0KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcHVibGlzaFJlc3VsdChyZXN1bHQsIGltYWdlRGF0YSkge1xyXG4gICAgY29uc3QgcmVzdWx0VG9QdWJsaXNoID0gcmVzdWx0ICYmIChyZXN1bHQuYmFyY29kZXMgfHwgcmVzdWx0KTtcclxuXHJcbiAgICBpZiAocmVzdWx0ICYmIF9vblVJVGhyZWFkKSB7XHJcbiAgICAgICAgdHJhbnNmb3JtUmVzdWx0KHJlc3VsdCk7XHJcbiAgICAgICAgYWRkUmVzdWx0KHJlc3VsdCwgaW1hZ2VEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBFdmVudHMucHVibGlzaChcInByb2Nlc3NlZFwiLCByZXN1bHRUb1B1Ymxpc2gpO1xyXG4gICAgaWYgKGhhc0NvZGVSZXN1bHQocmVzdWx0KSkge1xyXG4gICAgICAgIEV2ZW50cy5wdWJsaXNoKFwiZGV0ZWN0ZWRcIiwgcmVzdWx0VG9QdWJsaXNoKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbG9jYXRlQW5kRGVjb2RlKCkge1xyXG4gICAgdmFyIHJlc3VsdCxcclxuICAgICAgICBib3hlcztcclxuXHJcbiAgICBib3hlcyA9IGdldEJvdW5kaW5nQm94ZXMoKTtcclxuICAgIGlmIChib3hlcykge1xyXG4gICAgICAgIHJlc3VsdCA9IF9kZWNvZGVyLmRlY29kZUZyb21Cb3VuZGluZ0JveGVzKGJveGVzKTtcclxuICAgICAgICByZXN1bHQgPSByZXN1bHQgfHwge307XHJcbiAgICAgICAgcmVzdWx0LmJveGVzID0gYm94ZXM7XHJcbiAgICAgICAgcHVibGlzaFJlc3VsdChyZXN1bHQsIF9pbnB1dEltYWdlV3JhcHBlci5kYXRhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcHVibGlzaFJlc3VsdCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGUoKSB7XHJcbiAgICB2YXIgYXZhaWxhYmxlV29ya2VyO1xyXG5cclxuICAgIGlmIChfb25VSVRocmVhZCkge1xyXG4gICAgICAgIGlmIChfd29ya2VyUG9vbC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGF2YWlsYWJsZVdvcmtlciA9IF93b3JrZXJQb29sLmZpbHRlcihmdW5jdGlvbih3b3JrZXJUaHJlYWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhd29ya2VyVGhyZWFkLmJ1c3k7XHJcbiAgICAgICAgICAgIH0pWzBdO1xyXG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlV29ya2VyKSB7XHJcbiAgICAgICAgICAgICAgICBfZnJhbWVncmFiYmVyLmF0dGFjaERhdGEoYXZhaWxhYmxlV29ya2VyLmltYWdlRGF0YSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIGFsbCB3b3JrZXJzIGFyZSBidXN5XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBfZnJhbWVncmFiYmVyLmF0dGFjaERhdGEoX2lucHV0SW1hZ2VXcmFwcGVyLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoX2ZyYW1lZ3JhYmJlci5ncmFiKCkpIHtcclxuICAgICAgICAgICAgaWYgKGF2YWlsYWJsZVdvcmtlcikge1xyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlV29ya2VyLmJ1c3kgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlV29ya2VyLndvcmtlci5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgY21kOiAncHJvY2VzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VEYXRhOiBhdmFpbGFibGVXb3JrZXIuaW1hZ2VEYXRhXHJcbiAgICAgICAgICAgICAgICB9LCBbYXZhaWxhYmxlV29ya2VyLmltYWdlRGF0YS5idWZmZXJdKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxvY2F0ZUFuZERlY29kZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsb2NhdGVBbmREZWNvZGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnQoKSB7XHJcbiAgICBfc3RvcHBlZCA9IGZhbHNlO1xyXG4gICAgKCBmdW5jdGlvbiBmcmFtZSgpIHtcclxuICAgICAgICBpZiAoIV9zdG9wcGVkKSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAoX29uVUlUaHJlYWQgJiYgX2NvbmZpZy5pbnB1dFN0cmVhbS50eXBlID09PSBcIkxpdmVTdHJlYW1cIikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltRnJhbWUoZnJhbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSgpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFdvcmtlcnMoY2IpIHtcclxuICAgIHZhciBpO1xyXG4gICAgX3dvcmtlclBvb2wgPSBbXTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgX2NvbmZpZy5udW1PZldvcmtlcnM7IGkrKykge1xyXG4gICAgICAgIGluaXRXb3JrZXIod29ya2VySW5pdGlhbGl6ZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHdvcmtlckluaXRpYWxpemVkKHdvcmtlclRocmVhZCkge1xyXG4gICAgICAgIF93b3JrZXJQb29sLnB1c2god29ya2VyVGhyZWFkKTtcclxuICAgICAgICBpZiAoX3dvcmtlclBvb2wubGVuZ3RoID49IF9jb25maWcubnVtT2ZXb3JrZXJzKXtcclxuICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRXb3JrZXIoY2IpIHtcclxuICAgIHZhciBibG9iVVJMLFxyXG4gICAgICAgIHdvcmtlclRocmVhZCA9IHtcclxuICAgICAgICAgICAgd29ya2VyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGltYWdlRGF0YTogbmV3IFVpbnQ4QXJyYXkoX2lucHV0U3RyZWFtLmdldFdpZHRoKCkgKiBfaW5wdXRTdHJlYW0uZ2V0SGVpZ2h0KCkpLFxyXG4gICAgICAgICAgICBidXN5OiB0cnVlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICBibG9iVVJMID0gZ2VuZXJhdGVXb3JrZXJCbG9iKCk7XHJcbiAgICB3b3JrZXJUaHJlYWQud29ya2VyID0gbmV3IFdvcmtlcihibG9iVVJMKTtcclxuXHJcbiAgICB3b3JrZXJUaHJlYWQud29ya2VyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5kYXRhLmV2ZW50ID09PSAnaW5pdGlhbGl6ZWQnKSB7XHJcbiAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoYmxvYlVSTCk7XHJcbiAgICAgICAgICAgIHdvcmtlclRocmVhZC5idXN5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHdvcmtlclRocmVhZC5pbWFnZURhdGEgPSBuZXcgVWludDhBcnJheShlLmRhdGEuaW1hZ2VEYXRhKTtcclxuICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXb3JrZXIgaW5pdGlhbGl6ZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGNiKHdvcmtlclRocmVhZCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlLmRhdGEuZXZlbnQgPT09ICdwcm9jZXNzZWQnKSB7XHJcbiAgICAgICAgICAgIHdvcmtlclRocmVhZC5pbWFnZURhdGEgPSBuZXcgVWludDhBcnJheShlLmRhdGEuaW1hZ2VEYXRhKTtcclxuICAgICAgICAgICAgd29ya2VyVGhyZWFkLmJ1c3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgcHVibGlzaFJlc3VsdChlLmRhdGEucmVzdWx0LCB3b3JrZXJUaHJlYWQuaW1hZ2VEYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGUuZGF0YS5ldmVudCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldvcmtlciBlcnJvcjogXCIgKyBlLmRhdGEubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHdvcmtlclRocmVhZC53b3JrZXIucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgIGNtZDogJ2luaXQnLFxyXG4gICAgICAgIHNpemU6IHt4OiBfaW5wdXRTdHJlYW0uZ2V0V2lkdGgoKSwgeTogX2lucHV0U3RyZWFtLmdldEhlaWdodCgpfSxcclxuICAgICAgICBpbWFnZURhdGE6IHdvcmtlclRocmVhZC5pbWFnZURhdGEsXHJcbiAgICAgICAgY29uZmlnOiBfY29uZmlnXHJcbiAgICB9LCBbd29ya2VyVGhyZWFkLmltYWdlRGF0YS5idWZmZXJdKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHdvcmtlckludGVyZmFjZShmYWN0b3J5KSB7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiovXHJcbiAgICBpZiAoZmFjdG9yeSkge1xyXG4gICAgICAgIHZhciBRdWFnZ2EgPSBmYWN0b3J5KCk7XHJcbiAgICAgICAgaWYgKCFRdWFnZ2EpIHtcclxuICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7J2V2ZW50JzogJ2Vycm9yJywgbWVzc2FnZTogJ1F1YWdnYSBjb3VsZCBub3QgYmUgY3JlYXRlZCd9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZhciBpbWFnZVdyYXBwZXI7XHJcblxyXG4gICAgc2VsZi5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKGUuZGF0YS5jbWQgPT09ICdpbml0Jykge1xyXG4gICAgICAgICAgICB2YXIgY29uZmlnID0gZS5kYXRhLmNvbmZpZztcclxuICAgICAgICAgICAgY29uZmlnLm51bU9mV29ya2VycyA9IDA7XHJcbiAgICAgICAgICAgIGltYWdlV3JhcHBlciA9IG5ldyBRdWFnZ2EuSW1hZ2VXcmFwcGVyKHtcclxuICAgICAgICAgICAgICAgIHg6IGUuZGF0YS5zaXplLngsXHJcbiAgICAgICAgICAgICAgICB5OiBlLmRhdGEuc2l6ZS55XHJcbiAgICAgICAgICAgIH0sIG5ldyBVaW50OEFycmF5KGUuZGF0YS5pbWFnZURhdGEpKTtcclxuICAgICAgICAgICAgUXVhZ2dhLmluaXQoY29uZmlnLCByZWFkeSwgaW1hZ2VXcmFwcGVyKTtcclxuICAgICAgICAgICAgUXVhZ2dhLm9uUHJvY2Vzc2VkKG9uUHJvY2Vzc2VkKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGUuZGF0YS5jbWQgPT09ICdwcm9jZXNzJykge1xyXG4gICAgICAgICAgICBpbWFnZVdyYXBwZXIuZGF0YSA9IG5ldyBVaW50OEFycmF5KGUuZGF0YS5pbWFnZURhdGEpO1xyXG4gICAgICAgICAgICBRdWFnZ2Euc3RhcnQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGUuZGF0YS5jbWQgPT09ICdzZXRSZWFkZXJzJykge1xyXG4gICAgICAgICAgICBRdWFnZ2Euc2V0UmVhZGVycyhlLmRhdGEucmVhZGVycyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBvblByb2Nlc3NlZChyZXN1bHQpIHtcclxuICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHtcclxuICAgICAgICAgICAgJ2V2ZW50JzogJ3Byb2Nlc3NlZCcsXHJcbiAgICAgICAgICAgIGltYWdlRGF0YTogaW1hZ2VXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0XHJcbiAgICAgICAgfSwgW2ltYWdlV3JhcHBlci5kYXRhLmJ1ZmZlcl0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlYWR5KCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7J2V2ZW50JzogJ2luaXRpYWxpemVkJywgaW1hZ2VEYXRhOiBpbWFnZVdyYXBwZXIuZGF0YX0sIFtpbWFnZVdyYXBwZXIuZGF0YS5idWZmZXJdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlV29ya2VyQmxvYigpIHtcclxuICAgIHZhciBibG9iLFxyXG4gICAgICAgIGZhY3RvcnlTb3VyY2U7XHJcblxyXG4gICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xyXG4gICAgaWYgKHR5cGVvZiBfX2ZhY3RvcnlTb3VyY2VfXyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBmYWN0b3J5U291cmNlID0gX19mYWN0b3J5U291cmNlX187IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcclxuICAgIH1cclxuICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXHJcblxyXG4gICAgYmxvYiA9IG5ldyBCbG9iKFsnKCcgKyB3b3JrZXJJbnRlcmZhY2UudG9TdHJpbmcoKSArICcpKCcgKyBmYWN0b3J5U291cmNlICsgJyk7J10sXHJcbiAgICAgICAge3R5cGU6ICd0ZXh0L2phdmFzY3JpcHQnfSk7XHJcblxyXG4gICAgcmV0dXJuIHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRSZWFkZXJzKHJlYWRlcnMpIHtcclxuICAgIGlmIChfZGVjb2Rlcikge1xyXG4gICAgICAgIF9kZWNvZGVyLnNldFJlYWRlcnMocmVhZGVycyk7XHJcbiAgICB9IGVsc2UgaWYgKF9vblVJVGhyZWFkICYmIF93b3JrZXJQb29sLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBfd29ya2VyUG9vbC5mb3JFYWNoKGZ1bmN0aW9uKHdvcmtlclRocmVhZCkge1xyXG4gICAgICAgICAgICB3b3JrZXJUaHJlYWQud29ya2VyLnBvc3RNZXNzYWdlKHtjbWQ6ICdzZXRSZWFkZXJzJywgcmVhZGVyczogcmVhZGVyc30pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBpbml0OiBmdW5jdGlvbihjb25maWcsIGNiLCBpbWFnZVdyYXBwZXIpIHtcclxuICAgICAgICBfY29uZmlnID0gbWVyZ2Uoe30sIENvbmZpZywgY29uZmlnKTtcclxuICAgICAgICBpZiAoaW1hZ2VXcmFwcGVyKSB7XHJcbiAgICAgICAgICAgIF9vblVJVGhyZWFkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGluaXRpYWxpemVEYXRhKGltYWdlV3JhcHBlcik7XHJcbiAgICAgICAgICAgIHJldHVybiBjYigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGluaXRJbnB1dFN0cmVhbShjYik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBzdGFydCgpO1xyXG4gICAgfSxcclxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIF9zdG9wcGVkID0gdHJ1ZTtcclxuICAgICAgICBfd29ya2VyUG9vbC5mb3JFYWNoKGZ1bmN0aW9uKHdvcmtlclRocmVhZCkge1xyXG4gICAgICAgICAgICB3b3JrZXJUaHJlYWQud29ya2VyLnRlcm1pbmF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldvcmtlciB0ZXJtaW5hdGVkIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIF93b3JrZXJQb29sLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgaWYgKF9jb25maWcuaW5wdXRTdHJlYW0udHlwZSA9PT0gXCJMaXZlU3RyZWFtXCIpIHtcclxuICAgICAgICAgICAgQ2FtZXJhQWNjZXNzLnJlbGVhc2UoKTtcclxuICAgICAgICAgICAgX2lucHV0U3RyZWFtLmNsZWFyRXZlbnRIYW5kbGVycygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwYXVzZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgX3N0b3BwZWQgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIG9uRGV0ZWN0ZWQ6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgRXZlbnRzLnN1YnNjcmliZShcImRldGVjdGVkXCIsIGNhbGxiYWNrKTtcclxuICAgIH0sXHJcbiAgICBvZmZEZXRlY3RlZDogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuICAgICAgICBFdmVudHMudW5zdWJzY3JpYmUoXCJkZXRlY3RlZFwiLCBjYWxsYmFjayk7XHJcbiAgICB9LFxyXG4gICAgb25Qcm9jZXNzZWQ6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgRXZlbnRzLnN1YnNjcmliZShcInByb2Nlc3NlZFwiLCBjYWxsYmFjayk7XHJcbiAgICB9LFxyXG4gICAgb2ZmUHJvY2Vzc2VkOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgIEV2ZW50cy51bnN1YnNjcmliZShcInByb2Nlc3NlZFwiLCBjYWxsYmFjayk7XHJcbiAgICB9LFxyXG4gICAgc2V0UmVhZGVyczogZnVuY3Rpb24ocmVhZGVycykge1xyXG4gICAgICAgIHNldFJlYWRlcnMocmVhZGVycyk7XHJcbiAgICB9LFxyXG4gICAgcmVnaXN0ZXJSZXN1bHRDb2xsZWN0b3I6IGZ1bmN0aW9uKHJlc3VsdENvbGxlY3Rvcikge1xyXG4gICAgICAgIGlmIChyZXN1bHRDb2xsZWN0b3IgJiYgdHlwZW9mIHJlc3VsdENvbGxlY3Rvci5hZGRSZXN1bHQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgX3Jlc3VsdENvbGxlY3RvciA9IHJlc3VsdENvbGxlY3RvcjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2FudmFzOiBfY2FudmFzQ29udGFpbmVyLFxyXG4gICAgZGVjb2RlU2luZ2xlOiBmdW5jdGlvbihjb25maWcsIHJlc3VsdENhbGxiYWNrKSB7XHJcbiAgICAgICAgY29uZmlnID0gbWVyZ2Uoe1xyXG4gICAgICAgICAgICBpbnB1dFN0cmVhbToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJJbWFnZVN0cmVhbVwiLFxyXG4gICAgICAgICAgICAgICAgc2VxdWVuY2U6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogODAwLFxyXG4gICAgICAgICAgICAgICAgc3JjOiBjb25maWcuc3JjXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG51bU9mV29ya2VyczogKEVOVi5kZXZlbG9wbWVudCAmJiBjb25maWcuZGVidWcpID8gMCA6IDEsXHJcbiAgICAgICAgICAgIGxvY2F0b3I6IHtcclxuICAgICAgICAgICAgICAgIGhhbGZTYW1wbGU6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBjb25maWcpO1xyXG4gICAgICAgIHRoaXMuaW5pdChjb25maWcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBFdmVudHMub25jZShcInByb2Nlc3NlZFwiLCBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIF9zdG9wcGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdENhbGxiYWNrLmNhbGwobnVsbCwgcmVzdWx0KTtcclxuICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHN0YXJ0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgSW1hZ2VXcmFwcGVyOiBJbWFnZVdyYXBwZXIsXHJcbiAgICBJbWFnZURlYnVnOiBJbWFnZURlYnVnLFxyXG4gICAgUmVzdWx0Q29sbGVjdG9yOiBSZXN1bHRDb2xsZWN0b3JcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvcXVhZ2dhLmpzXG4gKiovIiwiLypcclxuICogdHlwZWRlZnMuanNcclxuICogTm9ybWFsaXplcyBicm93c2VyLXNwZWNpZmljIHByZWZpeGVzXHJcbiAqL1xyXG5cclxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoLyogZnVuY3Rpb24gRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgKi8gY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLmdldFVzZXJNZWRpYSB8fFxyXG4gICAgICAgIG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEgfHwgbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3IubXNHZXRVc2VyTWVkaWE7XHJcbiAgICB3aW5kb3cuVVJMID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMIHx8IHdpbmRvdy5tb3pVUkwgfHwgd2luZG93Lm1zVVJMO1xyXG59XHJcbk1hdGguaW11bCA9IE1hdGguaW11bCB8fCBmdW5jdGlvbihhLCBiKSB7XHJcbiAgICB2YXIgYWggPSAoYSA+Pj4gMTYpICYgMHhmZmZmLFxyXG4gICAgICAgIGFsID0gYSAmIDB4ZmZmZixcclxuICAgICAgICBiaCA9IChiID4+PiAxNikgJiAweGZmZmYsXHJcbiAgICAgICAgYmwgPSBiICYgMHhmZmZmO1xyXG4gICAgLy8gdGhlIHNoaWZ0IGJ5IDAgZml4ZXMgdGhlIHNpZ24gb24gdGhlIGhpZ2ggcGFydFxyXG4gICAgLy8gdGhlIGZpbmFsIHwwIGNvbnZlcnRzIHRoZSB1bnNpZ25lZCB2YWx1ZSBpbnRvIGEgc2lnbmVkIHZhbHVlXHJcbiAgICByZXR1cm4gKChhbCAqIGJsKSArICgoKGFoICogYmwgKyBhbCAqIGJoKSA8PCAxNikgPj4+IDApIHwgMCk7XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvbW1vbi90eXBlZGVmcy5qc1xuICoqLyIsImltcG9ydCBTdWJJbWFnZSBmcm9tICcuL3N1YkltYWdlJztcclxuaW1wb3J0IENWVXRpbHMgZnJvbSAnLi4vY29tbW9uL2N2X3V0aWxzJztcclxuaW1wb3J0IEFycmF5SGVscGVyIGZyb20gJy4uL2NvbW1vbi9hcnJheV9oZWxwZXInO1xyXG5pbXBvcnQge3ZlYzJ9IGZyb20gJ2dsLW1hdHJpeCc7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBhIGJhc2ljIGltYWdlIGNvbWJpbmluZyB0aGUgZGF0YSBhbmQgc2l6ZS5cclxuICogSW4gYWRkaXRpb24sIHNvbWUgbWV0aG9kcyBmb3IgbWFuaXB1bGF0aW9uIGFyZSBjb250YWluZWQuXHJcbiAqIEBwYXJhbSBzaXplIHt4LHl9IFRoZSBzaXplIG9mIHRoZSBpbWFnZSBpbiBwaXhlbFxyXG4gKiBAcGFyYW0gZGF0YSB7QXJyYXl9IElmIGdpdmVuLCBhIGZsYXQgYXJyYXkgY29udGFpbmluZyB0aGUgcGl4ZWwgZGF0YVxyXG4gKiBAcGFyYW0gQXJyYXlUeXBlIHtUeXBlfSBJZiBnaXZlbiwgdGhlIGRlc2lyZWQgRGF0YVR5cGUgb2YgdGhlIEFycmF5IChtYXkgYmUgdHlwZWQvbm9uLXR5cGVkKVxyXG4gKiBAcGFyYW0gaW5pdGlhbGl6ZSB7Qm9vbGVhbn0gSW5kaWNhdGluZyBpZiB0aGUgYXJyYXkgc2hvdWxkIGJlIGluaXRpYWxpemVkIG9uIGNyZWF0aW9uLlxyXG4gKiBAcmV0dXJucyB7SW1hZ2VXcmFwcGVyfVxyXG4gKi9cclxuZnVuY3Rpb24gSW1hZ2VXcmFwcGVyKHNpemUsIGRhdGEsIEFycmF5VHlwZSwgaW5pdGlhbGl6ZSkge1xyXG4gICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgaWYgKEFycmF5VHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBuZXcgQXJyYXlUeXBlKHNpemUueCAqIHNpemUueSk7XHJcbiAgICAgICAgICAgIGlmIChBcnJheVR5cGUgPT09IEFycmF5ICYmIGluaXRpYWxpemUpIHtcclxuICAgICAgICAgICAgICAgIEFycmF5SGVscGVyLmluaXQodGhpcy5kYXRhLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IG5ldyBVaW50OEFycmF5KHNpemUueCAqIHNpemUueSk7XHJcbiAgICAgICAgICAgIGlmIChVaW50OEFycmF5ID09PSBBcnJheSAmJiBpbml0aWFsaXplKSB7XHJcbiAgICAgICAgICAgICAgICBBcnJheUhlbHBlci5pbml0KHRoaXMuZGF0YSwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNpemUgPSBzaXplO1xyXG59XHJcblxyXG4vKipcclxuICogdGVzdHMgaWYgYSBwb3NpdGlvbiBpcyB3aXRoaW4gdGhlIGltYWdlIHdpdGggYSBnaXZlbiBvZmZzZXRcclxuICogQHBhcmFtIGltZ1JlZiB7eCwgeX0gVGhlIGxvY2F0aW9uIHRvIHRlc3RcclxuICogQHBhcmFtIGJvcmRlciBOdW1iZXIgdGhlIHBhZGRpbmcgdmFsdWUgaW4gcGl4ZWxcclxuICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgbG9jYXRpb24gaW5zaWRlIHRoZSBpbWFnZSdzIGJvcmRlciwgZmFsc2Ugb3RoZXJ3aXNlXHJcbiAqIEBzZWUgY3ZkL2ltYWdlLmhcclxuICovXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuaW5JbWFnZVdpdGhCb3JkZXIgPSBmdW5jdGlvbihpbWdSZWYsIGJvcmRlcikge1xyXG4gICAgcmV0dXJuIChpbWdSZWYueCA+PSBib3JkZXIpXHJcbiAgICAgICAgJiYgKGltZ1JlZi55ID49IGJvcmRlcilcclxuICAgICAgICAmJiAoaW1nUmVmLnggPCAodGhpcy5zaXplLnggLSBib3JkZXIpKVxyXG4gICAgICAgICYmIChpbWdSZWYueSA8ICh0aGlzLnNpemUueSAtIGJvcmRlcikpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFBlcmZvcm1zIGJpbGluZWFyIHNhbXBsaW5nXHJcbiAqIEBwYXJhbSBpbkltZyBJbWFnZSB0byBleHRyYWN0IHNhbXBsZSBmcm9tXHJcbiAqIEBwYXJhbSB4IHRoZSB4LWNvb3JkaW5hdGVcclxuICogQHBhcmFtIHkgdGhlIHktY29vcmRpbmF0ZVxyXG4gKiBAcmV0dXJucyB0aGUgc2FtcGxlZCB2YWx1ZVxyXG4gKiBAc2VlIGN2ZC92aXNpb24uaFxyXG4gKi9cclxuSW1hZ2VXcmFwcGVyLnNhbXBsZSA9IGZ1bmN0aW9uKGluSW1nLCB4LCB5KSB7XHJcbiAgICB2YXIgbHggPSBNYXRoLmZsb29yKHgpO1xyXG4gICAgdmFyIGx5ID0gTWF0aC5mbG9vcih5KTtcclxuICAgIHZhciB3ID0gaW5JbWcuc2l6ZS54O1xyXG4gICAgdmFyIGJhc2UgPSBseSAqIGluSW1nLnNpemUueCArIGx4O1xyXG4gICAgdmFyIGEgPSBpbkltZy5kYXRhW2Jhc2UgKyAwXTtcclxuICAgIHZhciBiID0gaW5JbWcuZGF0YVtiYXNlICsgMV07XHJcbiAgICB2YXIgYyA9IGluSW1nLmRhdGFbYmFzZSArIHddO1xyXG4gICAgdmFyIGQgPSBpbkltZy5kYXRhW2Jhc2UgKyB3ICsgMV07XHJcbiAgICB2YXIgZSA9IGEgLSBiO1xyXG4gICAgeCAtPSBseDtcclxuICAgIHkgLT0gbHk7XHJcblxyXG4gICAgdmFyIHJlc3VsdCA9IE1hdGguZmxvb3IoeCAqICh5ICogKGUgLSBjICsgZCkgLSBlKSArIHkgKiAoYyAtIGEpICsgYSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemVzIGEgZ2l2ZW4gYXJyYXkuIFNldHMgZWFjaCBlbGVtZW50IHRvIHplcm8uXHJcbiAqIEBwYXJhbSBhcnJheSB7QXJyYXl9IFRoZSBhcnJheSB0byBpbml0aWFsaXplXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIuY2xlYXJBcnJheSA9IGZ1bmN0aW9uKGFycmF5KSB7XHJcbiAgICB2YXIgbCA9IGFycmF5Lmxlbmd0aDtcclxuICAgIHdoaWxlIChsLS0pIHtcclxuICAgICAgICBhcnJheVtsXSA9IDA7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIHtTdWJJbWFnZX0gZnJvbSB0aGUgY3VycmVudCBpbWFnZSAoe3RoaXN9KS5cclxuICogQHBhcmFtIGZyb20ge0ltYWdlUmVmfSBUaGUgcG9zaXRpb24gd2hlcmUgdG8gc3RhcnQgdGhlIHtTdWJJbWFnZX0gZnJvbS4gKHRvcC1sZWZ0IGNvcm5lcilcclxuICogQHBhcmFtIHNpemUge0ltYWdlUmVmfSBUaGUgc2l6ZSBvZiB0aGUgcmVzdWx0aW5nIGltYWdlXHJcbiAqIEByZXR1cm5zIHtTdWJJbWFnZX0gQSBzaGFyZWQgcGFydCBvZiB0aGUgb3JpZ2luYWwgaW1hZ2VcclxuICovXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuc3ViSW1hZ2UgPSBmdW5jdGlvbihmcm9tLCBzaXplKSB7XHJcbiAgICByZXR1cm4gbmV3IFN1YkltYWdlKGZyb20sIHNpemUsIHRoaXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYW4ge0ltYWdlV3JhcHBlcikgYW5kIGNvcGllcyB0aGUgbmVlZGVkIHVuZGVybHlpbmcgaW1hZ2UtZGF0YSBhcmVhXHJcbiAqIEBwYXJhbSBpbWFnZVdyYXBwZXIge0ltYWdlV3JhcHBlcn0gVGhlIHRhcmdldCB7SW1hZ2VXcmFwcGVyfSB3aGVyZSB0aGUgZGF0YSBzaG91bGQgYmUgY29waWVkXHJcbiAqIEBwYXJhbSBmcm9tIHtJbWFnZVJlZn0gVGhlIGxvY2F0aW9uIHdoZXJlIHRvIGNvcHkgZnJvbSAodG9wLWxlZnQgbG9jYXRpb24pXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLnN1YkltYWdlQXNDb3B5ID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCBmcm9tKSB7XHJcbiAgICB2YXIgc2l6ZVkgPSBpbWFnZVdyYXBwZXIuc2l6ZS55LCBzaXplWCA9IGltYWdlV3JhcHBlci5zaXplLng7XHJcbiAgICB2YXIgeCwgeTtcclxuICAgIGZvciAoIHggPSAwOyB4IDwgc2l6ZVg7IHgrKykge1xyXG4gICAgICAgIGZvciAoIHkgPSAwOyB5IDwgc2l6ZVk7IHkrKykge1xyXG4gICAgICAgICAgICBpbWFnZVdyYXBwZXIuZGF0YVt5ICogc2l6ZVggKyB4XSA9IHRoaXMuZGF0YVsoZnJvbS55ICsgeSkgKiB0aGlzLnNpemUueCArIGZyb20ueCArIHhdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuY29weVRvID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyKSB7XHJcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5kYXRhLmxlbmd0aCwgc3JjRGF0YSA9IHRoaXMuZGF0YSwgZHN0RGF0YSA9IGltYWdlV3JhcHBlci5kYXRhO1xyXG5cclxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgIGRzdERhdGFbbGVuZ3RoXSA9IHNyY0RhdGFbbGVuZ3RoXTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZXMgYSBnaXZlbiBwaXhlbCBwb3NpdGlvbiBmcm9tIHRoZSBpbWFnZVxyXG4gKiBAcGFyYW0geCB7TnVtYmVyfSBUaGUgeC1wb3NpdGlvblxyXG4gKiBAcGFyYW0geSB7TnVtYmVyfSBUaGUgeS1wb3NpdGlvblxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgZ3JheXNjYWxlIHZhbHVlIGF0IHRoZSBwaXhlbC1wb3NpdGlvblxyXG4gKi9cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhW3kgKiB0aGlzLnNpemUueCArIHhdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlcyBhIGdpdmVuIHBpeGVsIHBvc2l0aW9uIGZyb20gdGhlIGltYWdlXHJcbiAqIEBwYXJhbSB4IHtOdW1iZXJ9IFRoZSB4LXBvc2l0aW9uXHJcbiAqIEBwYXJhbSB5IHtOdW1iZXJ9IFRoZSB5LXBvc2l0aW9uXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBncmF5c2NhbGUgdmFsdWUgYXQgdGhlIHBpeGVsLXBvc2l0aW9uXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLmdldFNhZmUgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICB2YXIgaTtcclxuXHJcbiAgICBpZiAoIXRoaXMuaW5kZXhNYXBwaW5nKSB7XHJcbiAgICAgICAgdGhpcy5pbmRleE1hcHBpbmcgPSB7XHJcbiAgICAgICAgICAgIHg6IFtdLFxyXG4gICAgICAgICAgICB5OiBbXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuc2l6ZS54OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5pbmRleE1hcHBpbmcueFtpXSA9IGk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXhNYXBwaW5nLnhbaSArIHRoaXMuc2l6ZS54XSA9IGk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnNpemUueTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXhNYXBwaW5nLnlbaV0gPSBpO1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4TWFwcGluZy55W2kgKyB0aGlzLnNpemUueV0gPSBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmRhdGFbKHRoaXMuaW5kZXhNYXBwaW5nLnlbeSArIHRoaXMuc2l6ZS55XSkgKiB0aGlzLnNpemUueCArIHRoaXMuaW5kZXhNYXBwaW5nLnhbeCArIHRoaXMuc2l6ZS54XV07XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0cyBhIGdpdmVuIHBpeGVsIHBvc2l0aW9uIGluIHRoZSBpbWFnZVxyXG4gKiBAcGFyYW0geCB7TnVtYmVyfSBUaGUgeC1wb3NpdGlvblxyXG4gKiBAcGFyYW0geSB7TnVtYmVyfSBUaGUgeS1wb3NpdGlvblxyXG4gKiBAcGFyYW0gdmFsdWUge051bWJlcn0gVGhlIGdyYXlzY2FsZSB2YWx1ZSB0byBzZXRcclxuICogQHJldHVybnMge0ltYWdlV3JhcHBlcn0gVGhlIEltYWdlIGl0c2VsZiAoZm9yIHBvc3NpYmxlIGNoYWluaW5nKVxyXG4gKi9cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbih4LCB5LCB2YWx1ZSkge1xyXG4gICAgdGhpcy5kYXRhW3kgKiB0aGlzLnNpemUueCArIHhdID0gdmFsdWU7XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXRzIHRoZSBib3JkZXIgb2YgdGhlIGltYWdlICgxIHBpeGVsKSB0byB6ZXJvXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLnplcm9Cb3JkZXIgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBpLCB3aWR0aCA9IHRoaXMuc2l6ZS54LCBoZWlnaHQgPSB0aGlzLnNpemUueSwgZGF0YSA9IHRoaXMuZGF0YTtcclxuICAgIGZvciAoIGkgPSAwOyBpIDwgd2lkdGg7IGkrKykge1xyXG4gICAgICAgIGRhdGFbaV0gPSBkYXRhWyhoZWlnaHQgLSAxKSAqIHdpZHRoICsgaV0gPSAwO1xyXG4gICAgfVxyXG4gICAgZm9yICggaSA9IDE7IGkgPCBoZWlnaHQgLSAxOyBpKyspIHtcclxuICAgICAgICBkYXRhW2kgKiB3aWR0aF0gPSBkYXRhW2kgKiB3aWR0aCArICh3aWR0aCAtIDEpXSA9IDA7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogSW52ZXJ0cyBhIGJpbmFyeSBpbWFnZSBpbiBwbGFjZVxyXG4gKi9cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5pbnZlcnQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBkYXRhID0gdGhpcy5kYXRhLCBsZW5ndGggPSBkYXRhLmxlbmd0aDtcclxuXHJcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcclxuICAgICAgICBkYXRhW2xlbmd0aF0gPSBkYXRhW2xlbmd0aF0gPyAwIDogMTtcclxuICAgIH1cclxufTtcclxuXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuY29udm9sdmUgPSBmdW5jdGlvbihrZXJuZWwpIHtcclxuICAgIHZhciB4LCB5LCBreCwga3ksIGtTaXplID0gKGtlcm5lbC5sZW5ndGggLyAyKSB8IDAsIGFjY3UgPSAwO1xyXG4gICAgZm9yICggeSA9IDA7IHkgPCB0aGlzLnNpemUueTsgeSsrKSB7XHJcbiAgICAgICAgZm9yICggeCA9IDA7IHggPCB0aGlzLnNpemUueDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGFjY3UgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKCBreSA9IC1rU2l6ZTsga3kgPD0ga1NpemU7IGt5KyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAoIGt4ID0gLWtTaXplOyBreCA8PSBrU2l6ZTsga3grKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY3UgKz0ga2VybmVsW2t5ICsga1NpemVdW2t4ICsga1NpemVdICogdGhpcy5nZXRTYWZlKHggKyBreCwgeSArIGt5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRhdGFbeSAqIHRoaXMuc2l6ZS54ICsgeF0gPSBhY2N1O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUubW9tZW50cyA9IGZ1bmN0aW9uKGxhYmVsY291bnQpIHtcclxuICAgIHZhciBkYXRhID0gdGhpcy5kYXRhLFxyXG4gICAgICAgIHgsXHJcbiAgICAgICAgeSxcclxuICAgICAgICBoZWlnaHQgPSB0aGlzLnNpemUueSxcclxuICAgICAgICB3aWR0aCA9IHRoaXMuc2l6ZS54LFxyXG4gICAgICAgIHZhbCxcclxuICAgICAgICB5c3EsXHJcbiAgICAgICAgbGFiZWxzdW0gPSBbXSxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGxhYmVsLFxyXG4gICAgICAgIG11MTEsXHJcbiAgICAgICAgbXUwMixcclxuICAgICAgICBtdTIwLFxyXG4gICAgICAgIHhfLFxyXG4gICAgICAgIHlfLFxyXG4gICAgICAgIHRtcCxcclxuICAgICAgICByZXN1bHQgPSBbXSxcclxuICAgICAgICBQSSA9IE1hdGguUEksXHJcbiAgICAgICAgUElfNCA9IFBJIC8gNDtcclxuXHJcbiAgICBpZiAobGFiZWxjb3VudCA8PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IGxhYmVsY291bnQ7IGkrKykge1xyXG4gICAgICAgIGxhYmVsc3VtW2ldID0ge1xyXG4gICAgICAgICAgICBtMDA6IDAsXHJcbiAgICAgICAgICAgIG0wMTogMCxcclxuICAgICAgICAgICAgbTEwOiAwLFxyXG4gICAgICAgICAgICBtMTE6IDAsXHJcbiAgICAgICAgICAgIG0wMjogMCxcclxuICAgICAgICAgICAgbTIwOiAwLFxyXG4gICAgICAgICAgICB0aGV0YTogMCxcclxuICAgICAgICAgICAgcmFkOiAwXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgeXNxID0geSAqIHk7XHJcbiAgICAgICAgZm9yICggeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XHJcbiAgICAgICAgICAgIHZhbCA9IGRhdGFbeSAqIHdpZHRoICsgeF07XHJcbiAgICAgICAgICAgIGlmICh2YWwgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbCA9IGxhYmVsc3VtW3ZhbCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgbGFiZWwubTAwICs9IDE7XHJcbiAgICAgICAgICAgICAgICBsYWJlbC5tMDEgKz0geTtcclxuICAgICAgICAgICAgICAgIGxhYmVsLm0xMCArPSB4O1xyXG4gICAgICAgICAgICAgICAgbGFiZWwubTExICs9IHggKiB5O1xyXG4gICAgICAgICAgICAgICAgbGFiZWwubTAyICs9IHlzcTtcclxuICAgICAgICAgICAgICAgIGxhYmVsLm0yMCArPSB4ICogeDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IGxhYmVsY291bnQ7IGkrKykge1xyXG4gICAgICAgIGxhYmVsID0gbGFiZWxzdW1baV07XHJcbiAgICAgICAgaWYgKCFpc05hTihsYWJlbC5tMDApICYmIGxhYmVsLm0wMCAhPT0gMCkge1xyXG4gICAgICAgICAgICB4XyA9IGxhYmVsLm0xMCAvIGxhYmVsLm0wMDtcclxuICAgICAgICAgICAgeV8gPSBsYWJlbC5tMDEgLyBsYWJlbC5tMDA7XHJcbiAgICAgICAgICAgIG11MTEgPSBsYWJlbC5tMTEgLyBsYWJlbC5tMDAgLSB4XyAqIHlfO1xyXG4gICAgICAgICAgICBtdTAyID0gbGFiZWwubTAyIC8gbGFiZWwubTAwIC0geV8gKiB5XztcclxuICAgICAgICAgICAgbXUyMCA9IGxhYmVsLm0yMCAvIGxhYmVsLm0wMCAtIHhfICogeF87XHJcbiAgICAgICAgICAgIHRtcCA9IChtdTAyIC0gbXUyMCkgLyAoMiAqIG11MTEpO1xyXG4gICAgICAgICAgICB0bXAgPSAwLjUgKiBNYXRoLmF0YW4odG1wKSArIChtdTExID49IDAgPyBQSV80IDogLVBJXzQgKSArIFBJO1xyXG4gICAgICAgICAgICBsYWJlbC50aGV0YSA9ICh0bXAgKiAxODAgLyBQSSArIDkwKSAlIDE4MCAtIDkwO1xyXG4gICAgICAgICAgICBpZiAobGFiZWwudGhldGEgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbC50aGV0YSArPSAxODA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGFiZWwucmFkID0gdG1wID4gUEkgPyB0bXAgLSBQSSA6IHRtcDtcclxuICAgICAgICAgICAgbGFiZWwudmVjID0gdmVjMi5jbG9uZShbTWF0aC5jb3ModG1wKSwgTWF0aC5zaW4odG1wKV0pO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChsYWJlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogRGlzcGxheXMgdGhlIHtJbWFnZVdyYXBwZXJ9IGluIGEgZ2l2ZW4gY2FudmFzXHJcbiAqIEBwYXJhbSBjYW52YXMge0NhbnZhc30gVGhlIGNhbnZhcyBlbGVtZW50IHRvIHdyaXRlIHRvXHJcbiAqIEBwYXJhbSBzY2FsZSB7TnVtYmVyfSBTY2FsZSB3aGljaCBpcyBhcHBsaWVkIHRvIGVhY2ggcGl4ZWwtdmFsdWVcclxuICovXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKGNhbnZhcywgc2NhbGUpIHtcclxuICAgIHZhciBjdHgsXHJcbiAgICAgICAgZnJhbWUsXHJcbiAgICAgICAgZGF0YSxcclxuICAgICAgICBjdXJyZW50LFxyXG4gICAgICAgIHBpeGVsLFxyXG4gICAgICAgIHgsXHJcbiAgICAgICAgeTtcclxuXHJcbiAgICBpZiAoIXNjYWxlKSB7XHJcbiAgICAgICAgc2NhbGUgPSAxLjA7XHJcbiAgICB9XHJcbiAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIGNhbnZhcy53aWR0aCA9IHRoaXMuc2l6ZS54O1xyXG4gICAgY2FudmFzLmhlaWdodCA9IHRoaXMuc2l6ZS55O1xyXG4gICAgZnJhbWUgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgICBkYXRhID0gZnJhbWUuZGF0YTtcclxuICAgIGN1cnJlbnQgPSAwO1xyXG4gICAgZm9yICh5ID0gMDsgeSA8IHRoaXMuc2l6ZS55OyB5KyspIHtcclxuICAgICAgICBmb3IgKHggPSAwOyB4IDwgdGhpcy5zaXplLng7IHgrKykge1xyXG4gICAgICAgICAgICBwaXhlbCA9IHkgKiB0aGlzLnNpemUueCArIHg7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLmdldCh4LCB5KSAqIHNjYWxlO1xyXG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDBdID0gY3VycmVudDtcclxuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAxXSA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMl0gPSBjdXJyZW50O1xyXG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDNdID0gMjU1O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vZnJhbWUuZGF0YSA9IGRhdGE7XHJcbiAgICBjdHgucHV0SW1hZ2VEYXRhKGZyYW1lLCAwLCAwKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEaXNwbGF5cyB0aGUge1N1YkltYWdlfSBpbiBhIGdpdmVuIGNhbnZhc1xyXG4gKiBAcGFyYW0gY2FudmFzIHtDYW52YXN9IFRoZSBjYW52YXMgZWxlbWVudCB0byB3cml0ZSB0b1xyXG4gKiBAcGFyYW0gc2NhbGUge051bWJlcn0gU2NhbGUgd2hpY2ggaXMgYXBwbGllZCB0byBlYWNoIHBpeGVsLXZhbHVlXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLm92ZXJsYXkgPSBmdW5jdGlvbihjYW52YXMsIHNjYWxlLCBmcm9tKSB7XHJcbiAgICBpZiAoIXNjYWxlIHx8IHNjYWxlIDwgMCB8fCBzY2FsZSA+IDM2MCkge1xyXG4gICAgICAgIHNjYWxlID0gMzYwO1xyXG4gICAgfVxyXG4gICAgdmFyIGhzdiA9IFswLCAxLCAxXTtcclxuICAgIHZhciByZ2IgPSBbMCwgMCwgMF07XHJcbiAgICB2YXIgd2hpdGVSZ2IgPSBbMjU1LCAyNTUsIDI1NV07XHJcbiAgICB2YXIgYmxhY2tSZ2IgPSBbMCwgMCwgMF07XHJcbiAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICB2YXIgZnJhbWUgPSBjdHguZ2V0SW1hZ2VEYXRhKGZyb20ueCwgZnJvbS55LCB0aGlzLnNpemUueCwgdGhpcy5zaXplLnkpO1xyXG4gICAgdmFyIGRhdGEgPSBmcmFtZS5kYXRhO1xyXG4gICAgdmFyIGxlbmd0aCA9IHRoaXMuZGF0YS5sZW5ndGg7XHJcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcclxuICAgICAgICBoc3ZbMF0gPSB0aGlzLmRhdGFbbGVuZ3RoXSAqIHNjYWxlO1xyXG4gICAgICAgIHJlc3VsdCA9IGhzdlswXSA8PSAwID8gd2hpdGVSZ2IgOiBoc3ZbMF0gPj0gMzYwID8gYmxhY2tSZ2IgOiBDVlV0aWxzLmhzdjJyZ2IoaHN2LCByZ2IpO1xyXG4gICAgICAgIGRhdGFbbGVuZ3RoICogNCArIDBdID0gcmVzdWx0WzBdO1xyXG4gICAgICAgIGRhdGFbbGVuZ3RoICogNCArIDFdID0gcmVzdWx0WzFdO1xyXG4gICAgICAgIGRhdGFbbGVuZ3RoICogNCArIDJdID0gcmVzdWx0WzJdO1xyXG4gICAgICAgIGRhdGFbbGVuZ3RoICogNCArIDNdID0gMjU1O1xyXG4gICAgfVxyXG4gICAgY3R4LnB1dEltYWdlRGF0YShmcmFtZSwgZnJvbS54LCBmcm9tLnkpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VXcmFwcGVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vaW1hZ2Vfd3JhcHBlci5qc1xuICoqLyIsIi8qKlxyXG4gKiBDb25zdHJ1Y3QgcmVwcmVzZW50aW5nIGEgcGFydCBvZiBhbm90aGVyIHtJbWFnZVdyYXBwZXJ9LiBTaGFyZXMgZGF0YVxyXG4gKiBiZXR3ZWVuIHRoZSBwYXJlbnQgYW5kIHRoZSBjaGlsZC5cclxuICogQHBhcmFtIGZyb20ge0ltYWdlUmVmfSBUaGUgcG9zaXRpb24gd2hlcmUgdG8gc3RhcnQgdGhlIHtTdWJJbWFnZX0gZnJvbS4gKHRvcC1sZWZ0IGNvcm5lcilcclxuICogQHBhcmFtIHNpemUge0ltYWdlUmVmfSBUaGUgc2l6ZSBvZiB0aGUgcmVzdWx0aW5nIGltYWdlXHJcbiAqIEBwYXJhbSBJIHtJbWFnZVdyYXBwZXJ9IFRoZSB7SW1hZ2VXcmFwcGVyfSB0byBzaGFyZSBmcm9tXHJcbiAqIEByZXR1cm5zIHtTdWJJbWFnZX0gQSBzaGFyZWQgcGFydCBvZiB0aGUgb3JpZ2luYWwgaW1hZ2VcclxuICovXHJcbmZ1bmN0aW9uIFN1YkltYWdlKGZyb20sIHNpemUsIEkpIHtcclxuICAgIGlmICghSSkge1xyXG4gICAgICAgIEkgPSB7XHJcbiAgICAgICAgICAgIGRhdGE6IG51bGwsXHJcbiAgICAgICAgICAgIHNpemU6IHNpemVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgdGhpcy5kYXRhID0gSS5kYXRhO1xyXG4gICAgdGhpcy5vcmlnaW5hbFNpemUgPSBJLnNpemU7XHJcbiAgICB0aGlzLkkgPSBJO1xyXG5cclxuICAgIHRoaXMuZnJvbSA9IGZyb207XHJcbiAgICB0aGlzLnNpemUgPSBzaXplO1xyXG59XHJcblxyXG4vKipcclxuICogRGlzcGxheXMgdGhlIHtTdWJJbWFnZX0gaW4gYSBnaXZlbiBjYW52YXNcclxuICogQHBhcmFtIGNhbnZhcyB7Q2FudmFzfSBUaGUgY2FudmFzIGVsZW1lbnQgdG8gd3JpdGUgdG9cclxuICogQHBhcmFtIHNjYWxlIHtOdW1iZXJ9IFNjYWxlIHdoaWNoIGlzIGFwcGxpZWQgdG8gZWFjaCBwaXhlbC12YWx1ZVxyXG4gKi9cclxuU3ViSW1hZ2UucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbihjYW52YXMsIHNjYWxlKSB7XHJcbiAgICB2YXIgY3R4LFxyXG4gICAgICAgIGZyYW1lLFxyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgY3VycmVudCxcclxuICAgICAgICB5LFxyXG4gICAgICAgIHgsXHJcbiAgICAgICAgcGl4ZWw7XHJcblxyXG4gICAgaWYgKCFzY2FsZSkge1xyXG4gICAgICAgIHNjYWxlID0gMS4wO1xyXG4gICAgfVxyXG4gICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICBjYW52YXMud2lkdGggPSB0aGlzLnNpemUueDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSB0aGlzLnNpemUueTtcclxuICAgIGZyYW1lID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG4gICAgZGF0YSA9IGZyYW1lLmRhdGE7XHJcbiAgICBjdXJyZW50ID0gMDtcclxuICAgIGZvciAoeSA9IDA7IHkgPCB0aGlzLnNpemUueTsgeSsrKSB7XHJcbiAgICAgICAgZm9yICh4ID0gMDsgeCA8IHRoaXMuc2l6ZS54OyB4KyspIHtcclxuICAgICAgICAgICAgcGl4ZWwgPSB5ICogdGhpcy5zaXplLnggKyB4O1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gdGhpcy5nZXQoeCwgeSkgKiBzY2FsZTtcclxuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAwXSA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMV0gPSBjdXJyZW50O1xyXG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDJdID0gY3VycmVudDtcclxuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAzXSA9IDI1NTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmcmFtZS5kYXRhID0gZGF0YTtcclxuICAgIGN0eC5wdXRJbWFnZURhdGEoZnJhbWUsIDAsIDApO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlcyBhIGdpdmVuIHBpeGVsIHBvc2l0aW9uIGZyb20gdGhlIHtTdWJJbWFnZX1cclxuICogQHBhcmFtIHgge051bWJlcn0gVGhlIHgtcG9zaXRpb25cclxuICogQHBhcmFtIHkge051bWJlcn0gVGhlIHktcG9zaXRpb25cclxuICogQHJldHVybnMge051bWJlcn0gVGhlIGdyYXlzY2FsZSB2YWx1ZSBhdCB0aGUgcGl4ZWwtcG9zaXRpb25cclxuICovXHJcblN1YkltYWdlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhWyh0aGlzLmZyb20ueSArIHkpICogdGhpcy5vcmlnaW5hbFNpemUueCArIHRoaXMuZnJvbS54ICsgeF07XHJcbn07XHJcblxyXG4vKipcclxuICogVXBkYXRlcyB0aGUgdW5kZXJseWluZyBkYXRhIGZyb20gYSBnaXZlbiB7SW1hZ2VXcmFwcGVyfVxyXG4gKiBAcGFyYW0gaW1hZ2Uge0ltYWdlV3JhcHBlcn0gVGhlIHVwZGF0ZWQgaW1hZ2VcclxuICovXHJcblN1YkltYWdlLnByb3RvdHlwZS51cGRhdGVEYXRhID0gZnVuY3Rpb24oaW1hZ2UpIHtcclxuICAgIHRoaXMub3JpZ2luYWxTaXplID0gaW1hZ2Uuc2l6ZTtcclxuICAgIHRoaXMuZGF0YSA9IGltYWdlLmRhdGE7XHJcbn07XHJcblxyXG4vKipcclxuICogVXBkYXRlcyB0aGUgcG9zaXRpb24gb2YgdGhlIHNoYXJlZCBhcmVhXHJcbiAqIEBwYXJhbSBmcm9tIHt4LHl9IFRoZSBuZXcgbG9jYXRpb25cclxuICogQHJldHVybnMge1N1YkltYWdlfSByZXR1cm5zIHt0aGlzfSBmb3IgcG9zc2libGUgY2hhaW5pbmdcclxuICovXHJcblN1YkltYWdlLnByb3RvdHlwZS51cGRhdGVGcm9tID0gZnVuY3Rpb24oZnJvbSkge1xyXG4gICAgdGhpcy5mcm9tID0gZnJvbTtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKFN1YkltYWdlKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvY29tbW9uL3N1YkltYWdlLmpzXG4gKiovIiwiaW1wb3J0IENsdXN0ZXIyIGZyb20gJy4vY2x1c3Rlcic7XHJcbmltcG9ydCBBcnJheUhlbHBlciBmcm9tICcuL2FycmF5X2hlbHBlcic7XHJcbmltcG9ydCB7dmVjMiwgdmVjM30gZnJvbSAnZ2wtbWF0cml4JztcclxuXHJcbnZhciBDVlV0aWxzID0ge307XHJcblxyXG4vKipcclxuICogQHBhcmFtIHggeC1jb29yZGluYXRlXHJcbiAqIEBwYXJhbSB5IHktY29vcmRpbmF0ZVxyXG4gKiBAcmV0dXJuIEltYWdlUmVmZXJlbmNlIHt4LHl9IENvb3JkaW5hdGVcclxuICovXHJcbkNWVXRpbHMuaW1hZ2VSZWYgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICB2YXIgdGhhdCA9IHtcclxuICAgICAgICB4OiB4LFxyXG4gICAgICAgIHk6IHksXHJcbiAgICAgICAgdG9WZWMyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZlYzIuY2xvbmUoW3RoaXMueCwgdGhpcy55XSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b1ZlYzM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmVjMy5jbG9uZShbdGhpcy54LCB0aGlzLnksIDFdKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvdW5kOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy54ID0gdGhpcy54ID4gMC4wID8gTWF0aC5mbG9vcih0aGlzLnggKyAwLjUpIDogTWF0aC5mbG9vcih0aGlzLnggLSAwLjUpO1xyXG4gICAgICAgICAgICB0aGlzLnkgPSB0aGlzLnkgPiAwLjAgPyBNYXRoLmZsb29yKHRoaXMueSArIDAuNSkgOiBNYXRoLmZsb29yKHRoaXMueSAtIDAuNSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb21wdXRlcyBhbiBpbnRlZ3JhbCBpbWFnZSBvZiBhIGdpdmVuIGdyYXlzY2FsZSBpbWFnZS5cclxuICogQHBhcmFtIGltYWdlRGF0YUNvbnRhaW5lciB7SW1hZ2VEYXRhQ29udGFpbmVyfSB0aGUgaW1hZ2UgdG8gYmUgaW50ZWdyYXRlZFxyXG4gKi9cclxuQ1ZVdGlscy5jb21wdXRlSW50ZWdyYWxJbWFnZTIgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGludGVncmFsV3JhcHBlcikge1xyXG4gICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhO1xyXG4gICAgdmFyIHdpZHRoID0gaW1hZ2VXcmFwcGVyLnNpemUueDtcclxuICAgIHZhciBoZWlnaHQgPSBpbWFnZVdyYXBwZXIuc2l6ZS55O1xyXG4gICAgdmFyIGludGVncmFsSW1hZ2VEYXRhID0gaW50ZWdyYWxXcmFwcGVyLmRhdGE7XHJcbiAgICB2YXIgc3VtID0gMCwgcG9zQSA9IDAsIHBvc0IgPSAwLCBwb3NDID0gMCwgcG9zRCA9IDAsIHgsIHk7XHJcblxyXG4gICAgLy8gc3VtIHVwIGZpcnN0IGNvbHVtblxyXG4gICAgcG9zQiA9IHdpZHRoO1xyXG4gICAgc3VtID0gMDtcclxuICAgIGZvciAoIHkgPSAxOyB5IDwgaGVpZ2h0OyB5KyspIHtcclxuICAgICAgICBzdW0gKz0gaW1hZ2VEYXRhW3Bvc0FdO1xyXG4gICAgICAgIGludGVncmFsSW1hZ2VEYXRhW3Bvc0JdICs9IHN1bTtcclxuICAgICAgICBwb3NBICs9IHdpZHRoO1xyXG4gICAgICAgIHBvc0IgKz0gd2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zQSA9IDA7XHJcbiAgICBwb3NCID0gMTtcclxuICAgIHN1bSA9IDA7XHJcbiAgICBmb3IgKCB4ID0gMTsgeCA8IHdpZHRoOyB4KyspIHtcclxuICAgICAgICBzdW0gKz0gaW1hZ2VEYXRhW3Bvc0FdO1xyXG4gICAgICAgIGludGVncmFsSW1hZ2VEYXRhW3Bvc0JdICs9IHN1bTtcclxuICAgICAgICBwb3NBKys7XHJcbiAgICAgICAgcG9zQisrO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIHkgPSAxOyB5IDwgaGVpZ2h0OyB5KyspIHtcclxuICAgICAgICBwb3NBID0geSAqIHdpZHRoICsgMTtcclxuICAgICAgICBwb3NCID0gKHkgLSAxKSAqIHdpZHRoICsgMTtcclxuICAgICAgICBwb3NDID0geSAqIHdpZHRoO1xyXG4gICAgICAgIHBvc0QgPSAoeSAtIDEpICogd2lkdGg7XHJcbiAgICAgICAgZm9yICggeCA9IDE7IHggPCB3aWR0aDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGludGVncmFsSW1hZ2VEYXRhW3Bvc0FdICs9XHJcbiAgICAgICAgICAgICAgICBpbWFnZURhdGFbcG9zQV0gKyBpbnRlZ3JhbEltYWdlRGF0YVtwb3NCXSArIGludGVncmFsSW1hZ2VEYXRhW3Bvc0NdIC0gaW50ZWdyYWxJbWFnZURhdGFbcG9zRF07XHJcbiAgICAgICAgICAgIHBvc0ErKztcclxuICAgICAgICAgICAgcG9zQisrO1xyXG4gICAgICAgICAgICBwb3NDKys7XHJcbiAgICAgICAgICAgIHBvc0QrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLmNvbXB1dGVJbnRlZ3JhbEltYWdlID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCBpbnRlZ3JhbFdyYXBwZXIpIHtcclxuICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YTtcclxuICAgIHZhciB3aWR0aCA9IGltYWdlV3JhcHBlci5zaXplLng7XHJcbiAgICB2YXIgaGVpZ2h0ID0gaW1hZ2VXcmFwcGVyLnNpemUueTtcclxuICAgIHZhciBpbnRlZ3JhbEltYWdlRGF0YSA9IGludGVncmFsV3JhcHBlci5kYXRhO1xyXG4gICAgdmFyIHN1bSA9IDA7XHJcblxyXG4gICAgLy8gc3VtIHVwIGZpcnN0IHJvd1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XHJcbiAgICAgICAgc3VtICs9IGltYWdlRGF0YVtpXTtcclxuICAgICAgICBpbnRlZ3JhbEltYWdlRGF0YVtpXSA9IHN1bTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciB2ID0gMTsgdiA8IGhlaWdodDsgdisrKSB7XHJcbiAgICAgICAgc3VtID0gMDtcclxuICAgICAgICBmb3IgKHZhciB1ID0gMDsgdSA8IHdpZHRoOyB1KyspIHtcclxuICAgICAgICAgICAgc3VtICs9IGltYWdlRGF0YVt2ICogd2lkdGggKyB1XTtcclxuICAgICAgICAgICAgaW50ZWdyYWxJbWFnZURhdGFbKCh2KSAqIHdpZHRoKSArIHVdID0gc3VtICsgaW50ZWdyYWxJbWFnZURhdGFbKHYgLSAxKSAqIHdpZHRoICsgdV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy50aHJlc2hvbGRJbWFnZSA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgdGhyZXNob2xkLCB0YXJnZXRXcmFwcGVyKSB7XHJcbiAgICBpZiAoIXRhcmdldFdyYXBwZXIpIHtcclxuICAgICAgICB0YXJnZXRXcmFwcGVyID0gaW1hZ2VXcmFwcGVyO1xyXG4gICAgfVxyXG4gICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhLCBsZW5ndGggPSBpbWFnZURhdGEubGVuZ3RoLCB0YXJnZXREYXRhID0gdGFyZ2V0V3JhcHBlci5kYXRhO1xyXG5cclxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgIHRhcmdldERhdGFbbGVuZ3RoXSA9IGltYWdlRGF0YVtsZW5ndGhdIDwgdGhyZXNob2xkID8gMSA6IDA7XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLmNvbXB1dGVIaXN0b2dyYW0gPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGJpdHNQZXJQaXhlbCkge1xyXG4gICAgaWYgKCFiaXRzUGVyUGl4ZWwpIHtcclxuICAgICAgICBiaXRzUGVyUGl4ZWwgPSA4O1xyXG4gICAgfVxyXG4gICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgIGxlbmd0aCA9IGltYWdlRGF0YS5sZW5ndGgsXHJcbiAgICAgICAgYml0U2hpZnQgPSA4IC0gYml0c1BlclBpeGVsLFxyXG4gICAgICAgIGJ1Y2tldENudCA9IDEgPDwgYml0c1BlclBpeGVsLFxyXG4gICAgICAgIGhpc3QgPSBuZXcgSW50MzJBcnJheShidWNrZXRDbnQpO1xyXG5cclxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgIGhpc3RbaW1hZ2VEYXRhW2xlbmd0aF0gPj4gYml0U2hpZnRdKys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGlzdDtcclxufTtcclxuXHJcbkNWVXRpbHMuc2hhcnBlbkxpbmUgPSBmdW5jdGlvbihsaW5lKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBsZW5ndGggPSBsaW5lLmxlbmd0aCxcclxuICAgICAgICBsZWZ0ID0gbGluZVswXSxcclxuICAgICAgICBjZW50ZXIgPSBsaW5lWzFdLFxyXG4gICAgICAgIHJpZ2h0O1xyXG5cclxuICAgIGZvciAoaSA9IDE7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICByaWdodCA9IGxpbmVbaSArIDFdO1xyXG4gICAgICAgIC8vICAtMSA0IC0xIGtlcm5lbFxyXG4gICAgICAgIGxpbmVbaSAtIDFdID0gKCgoY2VudGVyICogMikgLSBsZWZ0IC0gcmlnaHQpKSAmIDI1NTtcclxuICAgICAgICBsZWZ0ID0gY2VudGVyO1xyXG4gICAgICAgIGNlbnRlciA9IHJpZ2h0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpbmU7XHJcbn07XHJcblxyXG5DVlV0aWxzLmRldGVybWluZU90c3VUaHJlc2hvbGQgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGJpdHNQZXJQaXhlbCkge1xyXG4gICAgaWYgKCFiaXRzUGVyUGl4ZWwpIHtcclxuICAgICAgICBiaXRzUGVyUGl4ZWwgPSA4O1xyXG4gICAgfVxyXG4gICAgdmFyIGhpc3QsXHJcbiAgICAgICAgdGhyZXNob2xkLFxyXG4gICAgICAgIGJpdFNoaWZ0ID0gOCAtIGJpdHNQZXJQaXhlbDtcclxuXHJcbiAgICBmdW5jdGlvbiBweChpbml0LCBlbmQpIHtcclxuICAgICAgICB2YXIgc3VtID0gMCwgaTtcclxuICAgICAgICBmb3IgKCBpID0gaW5pdDsgaSA8PSBlbmQ7IGkrKykge1xyXG4gICAgICAgICAgICBzdW0gKz0gaGlzdFtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1bTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBteChpbml0LCBlbmQpIHtcclxuICAgICAgICB2YXIgaSwgc3VtID0gMDtcclxuXHJcbiAgICAgICAgZm9yICggaSA9IGluaXQ7IGkgPD0gZW5kOyBpKyspIHtcclxuICAgICAgICAgICAgc3VtICs9IGkgKiBoaXN0W2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN1bTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZXRlcm1pbmVUaHJlc2hvbGQoKSB7XHJcbiAgICAgICAgdmFyIHZldCA9IFswXSwgcDEsIHAyLCBwMTIsIGssIG0xLCBtMiwgbTEyLFxyXG4gICAgICAgICAgICBtYXggPSAoMSA8PCBiaXRzUGVyUGl4ZWwpIC0gMTtcclxuXHJcbiAgICAgICAgaGlzdCA9IENWVXRpbHMuY29tcHV0ZUhpc3RvZ3JhbShpbWFnZVdyYXBwZXIsIGJpdHNQZXJQaXhlbCk7XHJcbiAgICAgICAgZm9yICggayA9IDE7IGsgPCBtYXg7IGsrKykge1xyXG4gICAgICAgICAgICBwMSA9IHB4KDAsIGspO1xyXG4gICAgICAgICAgICBwMiA9IHB4KGsgKyAxLCBtYXgpO1xyXG4gICAgICAgICAgICBwMTIgPSBwMSAqIHAyO1xyXG4gICAgICAgICAgICBpZiAocDEyID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBwMTIgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG0xID0gbXgoMCwgaykgKiBwMjtcclxuICAgICAgICAgICAgbTIgPSBteChrICsgMSwgbWF4KSAqIHAxO1xyXG4gICAgICAgICAgICBtMTIgPSBtMSAtIG0yO1xyXG4gICAgICAgICAgICB2ZXRba10gPSBtMTIgKiBtMTIgLyBwMTI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBcnJheUhlbHBlci5tYXhJbmRleCh2ZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRocmVzaG9sZCA9IGRldGVybWluZVRocmVzaG9sZCgpO1xyXG4gICAgcmV0dXJuIHRocmVzaG9sZCA8PCBiaXRTaGlmdDtcclxufTtcclxuXHJcbkNWVXRpbHMub3RzdVRocmVzaG9sZCA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgdGFyZ2V0V3JhcHBlcikge1xyXG4gICAgdmFyIHRocmVzaG9sZCA9IENWVXRpbHMuZGV0ZXJtaW5lT3RzdVRocmVzaG9sZChpbWFnZVdyYXBwZXIpO1xyXG5cclxuICAgIENWVXRpbHMudGhyZXNob2xkSW1hZ2UoaW1hZ2VXcmFwcGVyLCB0aHJlc2hvbGQsIHRhcmdldFdyYXBwZXIpO1xyXG4gICAgcmV0dXJuIHRocmVzaG9sZDtcclxufTtcclxuXHJcbi8vIGxvY2FsIHRocmVzaG9sZGluZ1xyXG5DVlV0aWxzLmNvbXB1dGVCaW5hcnlJbWFnZSA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgaW50ZWdyYWxXcmFwcGVyLCB0YXJnZXRXcmFwcGVyKSB7XHJcbiAgICBDVlV0aWxzLmNvbXB1dGVJbnRlZ3JhbEltYWdlKGltYWdlV3JhcHBlciwgaW50ZWdyYWxXcmFwcGVyKTtcclxuXHJcbiAgICBpZiAoIXRhcmdldFdyYXBwZXIpIHtcclxuICAgICAgICB0YXJnZXRXcmFwcGVyID0gaW1hZ2VXcmFwcGVyO1xyXG4gICAgfVxyXG4gICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhO1xyXG4gICAgdmFyIHRhcmdldERhdGEgPSB0YXJnZXRXcmFwcGVyLmRhdGE7XHJcbiAgICB2YXIgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54O1xyXG4gICAgdmFyIGhlaWdodCA9IGltYWdlV3JhcHBlci5zaXplLnk7XHJcbiAgICB2YXIgaW50ZWdyYWxJbWFnZURhdGEgPSBpbnRlZ3JhbFdyYXBwZXIuZGF0YTtcclxuICAgIHZhciBzdW0gPSAwLCB2LCB1LCBrZXJuZWwgPSAzLCBBLCBCLCBDLCBELCBhdmcsIHNpemUgPSAoa2VybmVsICogMiArIDEpICogKGtlcm5lbCAqIDIgKyAxKTtcclxuXHJcbiAgICAvLyBjbGVhciBvdXQgdG9wICYgYm90dG9tLWJvcmRlclxyXG4gICAgZm9yICggdiA9IDA7IHYgPD0ga2VybmVsOyB2KyspIHtcclxuICAgICAgICBmb3IgKCB1ID0gMDsgdSA8IHdpZHRoOyB1KyspIHtcclxuICAgICAgICAgICAgdGFyZ2V0RGF0YVsoKHYpICogd2lkdGgpICsgdV0gPSAwO1xyXG4gICAgICAgICAgICB0YXJnZXREYXRhWygoKGhlaWdodCAtIDEpIC0gdikgKiB3aWR0aCkgKyB1XSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNsZWFyIG91dCBsZWZ0ICYgcmlnaHQgYm9yZGVyXHJcbiAgICBmb3IgKCB2ID0ga2VybmVsOyB2IDwgaGVpZ2h0IC0ga2VybmVsOyB2KyspIHtcclxuICAgICAgICBmb3IgKCB1ID0gMDsgdSA8PSBrZXJuZWw7IHUrKykge1xyXG4gICAgICAgICAgICB0YXJnZXREYXRhWygodikgKiB3aWR0aCkgKyB1XSA9IDA7XHJcbiAgICAgICAgICAgIHRhcmdldERhdGFbKCh2KSAqIHdpZHRoKSArICh3aWR0aCAtIDEgLSB1KV0gPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCB2ID0ga2VybmVsICsgMTsgdiA8IGhlaWdodCAtIGtlcm5lbCAtIDE7IHYrKykge1xyXG4gICAgICAgIGZvciAoIHUgPSBrZXJuZWwgKyAxOyB1IDwgd2lkdGggLSBrZXJuZWw7IHUrKykge1xyXG4gICAgICAgICAgICBBID0gaW50ZWdyYWxJbWFnZURhdGFbKHYgLSBrZXJuZWwgLSAxKSAqIHdpZHRoICsgKHUgLSBrZXJuZWwgLSAxKV07XHJcbiAgICAgICAgICAgIEIgPSBpbnRlZ3JhbEltYWdlRGF0YVsodiAtIGtlcm5lbCAtIDEpICogd2lkdGggKyAodSArIGtlcm5lbCldO1xyXG4gICAgICAgICAgICBDID0gaW50ZWdyYWxJbWFnZURhdGFbKHYgKyBrZXJuZWwpICogd2lkdGggKyAodSAtIGtlcm5lbCAtIDEpXTtcclxuICAgICAgICAgICAgRCA9IGludGVncmFsSW1hZ2VEYXRhWyh2ICsga2VybmVsKSAqIHdpZHRoICsgKHUgKyBrZXJuZWwpXTtcclxuICAgICAgICAgICAgc3VtID0gRCAtIEMgLSBCICsgQTtcclxuICAgICAgICAgICAgYXZnID0gc3VtIC8gKHNpemUpO1xyXG4gICAgICAgICAgICB0YXJnZXREYXRhW3YgKiB3aWR0aCArIHVdID0gaW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdID4gKGF2ZyArIDUpID8gMCA6IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5jbHVzdGVyID0gZnVuY3Rpb24ocG9pbnRzLCB0aHJlc2hvbGQsIHByb3BlcnR5KSB7XHJcbiAgICB2YXIgaSwgaywgY2x1c3RlciwgcG9pbnQsIGNsdXN0ZXJzID0gW107XHJcblxyXG4gICAgaWYgKCFwcm9wZXJ0eSkge1xyXG4gICAgICAgIHByb3BlcnR5ID0gXCJyYWRcIjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRUb0NsdXN0ZXIobmV3UG9pbnQpIHtcclxuICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKCBrID0gMDsgayA8IGNsdXN0ZXJzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIGNsdXN0ZXIgPSBjbHVzdGVyc1trXTtcclxuICAgICAgICAgICAgaWYgKGNsdXN0ZXIuZml0cyhuZXdQb2ludCkpIHtcclxuICAgICAgICAgICAgICAgIGNsdXN0ZXIuYWRkKG5ld1BvaW50KTtcclxuICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGVhY2ggY2xvdWRcclxuICAgIGZvciAoIGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcG9pbnQgPSBDbHVzdGVyMi5jcmVhdGVQb2ludChwb2ludHNbaV0sIGksIHByb3BlcnR5KTtcclxuICAgICAgICBpZiAoIWFkZFRvQ2x1c3Rlcihwb2ludCkpIHtcclxuICAgICAgICAgICAgY2x1c3RlcnMucHVzaChDbHVzdGVyMi5jcmVhdGUocG9pbnQsIHRocmVzaG9sZCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjbHVzdGVycztcclxufTtcclxuXHJcbkNWVXRpbHMuVHJhY2VyID0ge1xyXG4gICAgdHJhY2U6IGZ1bmN0aW9uKHBvaW50cywgdmVjKSB7XHJcbiAgICAgICAgdmFyIGl0ZXJhdGlvbiwgbWF4SXRlcmF0aW9ucyA9IDEwLCB0b3AgPSBbXSwgcmVzdWx0ID0gW10sIGNlbnRlclBvcyA9IDAsIGN1cnJlbnRQb3MgPSAwO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmFjZShpZHgsIGZvcndhcmQpIHtcclxuICAgICAgICAgICAgdmFyIGZyb20sIHRvLCB0b0lkeCwgcHJlZGljdGVkUG9zLCB0aHJlc2hvbGRYID0gMSwgdGhyZXNob2xkWSA9IE1hdGguYWJzKHZlY1sxXSAvIDEwKSwgZm91bmQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG1hdGNoKHBvcywgcHJlZGljdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocG9zLnggPiAocHJlZGljdGVkLnggLSB0aHJlc2hvbGRYKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBwb3MueCA8IChwcmVkaWN0ZWQueCArIHRocmVzaG9sZFgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHBvcy55ID4gKHByZWRpY3RlZC55IC0gdGhyZXNob2xkWSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgcG9zLnkgPCAocHJlZGljdGVkLnkgKyB0aHJlc2hvbGRZKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBuZXh0IGluZGV4IGlzIHdpdGhpbiB0aGUgdmVjIHNwZWNpZmljYXRpb25zXHJcbiAgICAgICAgICAgIC8vIGlmIG5vdCwgY2hlY2sgYXMgbG9uZyBhcyB0aGUgdGhyZXNob2xkIGlzIG1ldFxyXG5cclxuICAgICAgICAgICAgZnJvbSA9IHBvaW50c1tpZHhdO1xyXG4gICAgICAgICAgICBpZiAoZm9yd2FyZCkge1xyXG4gICAgICAgICAgICAgICAgcHJlZGljdGVkUG9zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGZyb20ueCArIHZlY1swXSxcclxuICAgICAgICAgICAgICAgICAgICB5OiBmcm9tLnkgKyB2ZWNbMV1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwcmVkaWN0ZWRQb3MgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogZnJvbS54IC0gdmVjWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IGZyb20ueSAtIHZlY1sxXVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdG9JZHggPSBmb3J3YXJkID8gaWR4ICsgMSA6IGlkeCAtIDE7XHJcbiAgICAgICAgICAgIHRvID0gcG9pbnRzW3RvSWR4XTtcclxuICAgICAgICAgICAgd2hpbGUgKHRvICYmICggZm91bmQgPSBtYXRjaCh0bywgcHJlZGljdGVkUG9zKSkgIT09IHRydWUgJiYgKE1hdGguYWJzKHRvLnkgLSBmcm9tLnkpIDwgdmVjWzFdKSkge1xyXG4gICAgICAgICAgICAgICAgdG9JZHggPSBmb3J3YXJkID8gdG9JZHggKyAxIDogdG9JZHggLSAxO1xyXG4gICAgICAgICAgICAgICAgdG8gPSBwb2ludHNbdG9JZHhdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZm91bmQgPyB0b0lkeCA6IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKCBpdGVyYXRpb24gPSAwOyBpdGVyYXRpb24gPCBtYXhJdGVyYXRpb25zOyBpdGVyYXRpb24rKykge1xyXG4gICAgICAgICAgICAvLyByYW5kb21seSBzZWxlY3QgcG9pbnQgdG8gc3RhcnQgd2l0aFxyXG4gICAgICAgICAgICBjZW50ZXJQb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb2ludHMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRyYWNlIGZvcndhcmRcclxuICAgICAgICAgICAgdG9wID0gW107XHJcbiAgICAgICAgICAgIGN1cnJlbnRQb3MgPSBjZW50ZXJQb3M7XHJcbiAgICAgICAgICAgIHRvcC5wdXNoKHBvaW50c1tjdXJyZW50UG9zXSk7XHJcbiAgICAgICAgICAgIHdoaWxlICgoIGN1cnJlbnRQb3MgPSB0cmFjZShjdXJyZW50UG9zLCB0cnVlKSkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRvcC5wdXNoKHBvaW50c1tjdXJyZW50UG9zXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNlbnRlclBvcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQb3MgPSBjZW50ZXJQb3M7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoKCBjdXJyZW50UG9zID0gdHJhY2UoY3VycmVudFBvcywgZmFsc2UpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcC5wdXNoKHBvaW50c1tjdXJyZW50UG9zXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0b3AubGVuZ3RoID4gcmVzdWx0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdG9wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLkRJTEFURSA9IDE7XHJcbkNWVXRpbHMuRVJPREUgPSAyO1xyXG5cclxuQ1ZVdGlscy5kaWxhdGUgPSBmdW5jdGlvbihpbkltYWdlV3JhcHBlciwgb3V0SW1hZ2VXcmFwcGVyKSB7XHJcbiAgICB2YXIgdixcclxuICAgICAgICB1LFxyXG4gICAgICAgIGluSW1hZ2VEYXRhID0gaW5JbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICBvdXRJbWFnZURhdGEgPSBvdXRJbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICBoZWlnaHQgPSBpbkltYWdlV3JhcHBlci5zaXplLnksXHJcbiAgICAgICAgd2lkdGggPSBpbkltYWdlV3JhcHBlci5zaXplLngsXHJcbiAgICAgICAgc3VtLFxyXG4gICAgICAgIHlTdGFydDEsXHJcbiAgICAgICAgeVN0YXJ0MixcclxuICAgICAgICB4U3RhcnQxLFxyXG4gICAgICAgIHhTdGFydDI7XHJcblxyXG4gICAgZm9yICggdiA9IDE7IHYgPCBoZWlnaHQgLSAxOyB2KyspIHtcclxuICAgICAgICBmb3IgKCB1ID0gMTsgdSA8IHdpZHRoIC0gMTsgdSsrKSB7XHJcbiAgICAgICAgICAgIHlTdGFydDEgPSB2IC0gMTtcclxuICAgICAgICAgICAgeVN0YXJ0MiA9IHYgKyAxO1xyXG4gICAgICAgICAgICB4U3RhcnQxID0gdSAtIDE7XHJcbiAgICAgICAgICAgIHhTdGFydDIgPSB1ICsgMTtcclxuICAgICAgICAgICAgc3VtID0gaW5JbWFnZURhdGFbeVN0YXJ0MSAqIHdpZHRoICsgeFN0YXJ0MV0gKyBpbkltYWdlRGF0YVt5U3RhcnQxICogd2lkdGggKyB4U3RhcnQyXSArXHJcbiAgICAgICAgICAgIGluSW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdICtcclxuICAgICAgICAgICAgaW5JbWFnZURhdGFbeVN0YXJ0MiAqIHdpZHRoICsgeFN0YXJ0MV0gKyBpbkltYWdlRGF0YVt5U3RhcnQyICogd2lkdGggKyB4U3RhcnQyXTtcclxuICAgICAgICAgICAgb3V0SW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdID0gc3VtID4gMCA/IDEgOiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMuZXJvZGUgPSBmdW5jdGlvbihpbkltYWdlV3JhcHBlciwgb3V0SW1hZ2VXcmFwcGVyKSB7XHJcbiAgICB2YXIgdixcclxuICAgICAgICB1LFxyXG4gICAgICAgIGluSW1hZ2VEYXRhID0gaW5JbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICBvdXRJbWFnZURhdGEgPSBvdXRJbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICBoZWlnaHQgPSBpbkltYWdlV3JhcHBlci5zaXplLnksXHJcbiAgICAgICAgd2lkdGggPSBpbkltYWdlV3JhcHBlci5zaXplLngsXHJcbiAgICAgICAgc3VtLFxyXG4gICAgICAgIHlTdGFydDEsXHJcbiAgICAgICAgeVN0YXJ0MixcclxuICAgICAgICB4U3RhcnQxLFxyXG4gICAgICAgIHhTdGFydDI7XHJcblxyXG4gICAgZm9yICggdiA9IDE7IHYgPCBoZWlnaHQgLSAxOyB2KyspIHtcclxuICAgICAgICBmb3IgKCB1ID0gMTsgdSA8IHdpZHRoIC0gMTsgdSsrKSB7XHJcbiAgICAgICAgICAgIHlTdGFydDEgPSB2IC0gMTtcclxuICAgICAgICAgICAgeVN0YXJ0MiA9IHYgKyAxO1xyXG4gICAgICAgICAgICB4U3RhcnQxID0gdSAtIDE7XHJcbiAgICAgICAgICAgIHhTdGFydDIgPSB1ICsgMTtcclxuICAgICAgICAgICAgc3VtID0gaW5JbWFnZURhdGFbeVN0YXJ0MSAqIHdpZHRoICsgeFN0YXJ0MV0gKyBpbkltYWdlRGF0YVt5U3RhcnQxICogd2lkdGggKyB4U3RhcnQyXSArXHJcbiAgICAgICAgICAgIGluSW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdICtcclxuICAgICAgICAgICAgaW5JbWFnZURhdGFbeVN0YXJ0MiAqIHdpZHRoICsgeFN0YXJ0MV0gKyBpbkltYWdlRGF0YVt5U3RhcnQyICogd2lkdGggKyB4U3RhcnQyXTtcclxuICAgICAgICAgICAgb3V0SW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdID0gc3VtID09PSA1ID8gMSA6IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5zdWJ0cmFjdCA9IGZ1bmN0aW9uKGFJbWFnZVdyYXBwZXIsIGJJbWFnZVdyYXBwZXIsIHJlc3VsdEltYWdlV3JhcHBlcikge1xyXG4gICAgaWYgKCFyZXN1bHRJbWFnZVdyYXBwZXIpIHtcclxuICAgICAgICByZXN1bHRJbWFnZVdyYXBwZXIgPSBhSW1hZ2VXcmFwcGVyO1xyXG4gICAgfVxyXG4gICAgdmFyIGxlbmd0aCA9IGFJbWFnZVdyYXBwZXIuZGF0YS5sZW5ndGgsXHJcbiAgICAgICAgYUltYWdlRGF0YSA9IGFJbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICBiSW1hZ2VEYXRhID0gYkltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgIGNJbWFnZURhdGEgPSByZXN1bHRJbWFnZVdyYXBwZXIuZGF0YTtcclxuXHJcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcclxuICAgICAgICBjSW1hZ2VEYXRhW2xlbmd0aF0gPSBhSW1hZ2VEYXRhW2xlbmd0aF0gLSBiSW1hZ2VEYXRhW2xlbmd0aF07XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLmJpdHdpc2VPciA9IGZ1bmN0aW9uKGFJbWFnZVdyYXBwZXIsIGJJbWFnZVdyYXBwZXIsIHJlc3VsdEltYWdlV3JhcHBlcikge1xyXG4gICAgaWYgKCFyZXN1bHRJbWFnZVdyYXBwZXIpIHtcclxuICAgICAgICByZXN1bHRJbWFnZVdyYXBwZXIgPSBhSW1hZ2VXcmFwcGVyO1xyXG4gICAgfVxyXG4gICAgdmFyIGxlbmd0aCA9IGFJbWFnZVdyYXBwZXIuZGF0YS5sZW5ndGgsXHJcbiAgICAgICAgYUltYWdlRGF0YSA9IGFJbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICBiSW1hZ2VEYXRhID0gYkltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgIGNJbWFnZURhdGEgPSByZXN1bHRJbWFnZVdyYXBwZXIuZGF0YTtcclxuXHJcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcclxuICAgICAgICBjSW1hZ2VEYXRhW2xlbmd0aF0gPSBhSW1hZ2VEYXRhW2xlbmd0aF0gfHwgYkltYWdlRGF0YVtsZW5ndGhdO1xyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5jb3VudE5vblplcm8gPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIpIHtcclxuICAgIHZhciBsZW5ndGggPSBpbWFnZVdyYXBwZXIuZGF0YS5sZW5ndGgsIGRhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YSwgc3VtID0gMDtcclxuXHJcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcclxuICAgICAgICBzdW0gKz0gZGF0YVtsZW5ndGhdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1bTtcclxufTtcclxuXHJcbkNWVXRpbHMudG9wR2VuZXJpYyA9IGZ1bmN0aW9uKGxpc3QsIHRvcCwgc2NvcmVGdW5jKSB7XHJcbiAgICB2YXIgaSwgbWluSWR4ID0gMCwgbWluID0gMCwgcXVldWUgPSBbXSwgc2NvcmUsIGhpdCwgcG9zO1xyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgdG9wOyBpKyspIHtcclxuICAgICAgICBxdWV1ZVtpXSA9IHtcclxuICAgICAgICAgICAgc2NvcmU6IDAsXHJcbiAgICAgICAgICAgIGl0ZW06IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHNjb3JlID0gc2NvcmVGdW5jLmFwcGx5KHRoaXMsIFtsaXN0W2ldXSk7XHJcbiAgICAgICAgaWYgKHNjb3JlID4gbWluKSB7XHJcbiAgICAgICAgICAgIGhpdCA9IHF1ZXVlW21pbklkeF07XHJcbiAgICAgICAgICAgIGhpdC5zY29yZSA9IHNjb3JlO1xyXG4gICAgICAgICAgICBoaXQuaXRlbSA9IGxpc3RbaV07XHJcbiAgICAgICAgICAgIG1pbiA9IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgICAgICAgICAgIGZvciAoIHBvcyA9IDA7IHBvcyA8IHRvcDsgcG9zKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChxdWV1ZVtwb3NdLnNjb3JlIDwgbWluKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluID0gcXVldWVbcG9zXS5zY29yZTtcclxuICAgICAgICAgICAgICAgICAgICBtaW5JZHggPSBwb3M7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHF1ZXVlO1xyXG59O1xyXG5cclxuQ1ZVdGlscy5ncmF5QXJyYXlGcm9tSW1hZ2UgPSBmdW5jdGlvbihodG1sSW1hZ2UsIG9mZnNldFgsIGN0eCwgYXJyYXkpIHtcclxuICAgIGN0eC5kcmF3SW1hZ2UoaHRtbEltYWdlLCBvZmZzZXRYLCAwLCBodG1sSW1hZ2Uud2lkdGgsIGh0bWxJbWFnZS5oZWlnaHQpO1xyXG4gICAgdmFyIGN0eERhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKG9mZnNldFgsIDAsIGh0bWxJbWFnZS53aWR0aCwgaHRtbEltYWdlLmhlaWdodCkuZGF0YTtcclxuICAgIENWVXRpbHMuY29tcHV0ZUdyYXkoY3R4RGF0YSwgYXJyYXkpO1xyXG59O1xyXG5cclxuQ1ZVdGlscy5ncmF5QXJyYXlGcm9tQ29udGV4dCA9IGZ1bmN0aW9uKGN0eCwgc2l6ZSwgb2Zmc2V0LCBhcnJheSkge1xyXG4gICAgdmFyIGN0eERhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKG9mZnNldC54LCBvZmZzZXQueSwgc2l6ZS54LCBzaXplLnkpLmRhdGE7XHJcbiAgICBDVlV0aWxzLmNvbXB1dGVHcmF5KGN0eERhdGEsIGFycmF5KTtcclxufTtcclxuXHJcbkNWVXRpbHMuZ3JheUFuZEhhbGZTYW1wbGVGcm9tQ2FudmFzRGF0YSA9IGZ1bmN0aW9uKGNhbnZhc0RhdGEsIHNpemUsIG91dEFycmF5KSB7XHJcbiAgICB2YXIgdG9wUm93SWR4ID0gMDtcclxuICAgIHZhciBib3R0b21Sb3dJZHggPSBzaXplLng7XHJcbiAgICB2YXIgZW5kSWR4ID0gTWF0aC5mbG9vcihjYW52YXNEYXRhLmxlbmd0aCAvIDQpO1xyXG4gICAgdmFyIG91dFdpZHRoID0gc2l6ZS54IC8gMjtcclxuICAgIHZhciBvdXRJbWdJZHggPSAwO1xyXG4gICAgdmFyIGluV2lkdGggPSBzaXplLng7XHJcbiAgICB2YXIgaTtcclxuXHJcbiAgICB3aGlsZSAoYm90dG9tUm93SWR4IDwgZW5kSWR4KSB7XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBvdXRXaWR0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG91dEFycmF5W291dEltZ0lkeF0gPSBNYXRoLmZsb29yKChcclxuICAgICAgICAgICAgICAgICgwLjI5OSAqIGNhbnZhc0RhdGFbdG9wUm93SWR4ICogNCArIDBdICtcclxuICAgICAgICAgICAgICAgICAwLjU4NyAqIGNhbnZhc0RhdGFbdG9wUm93SWR4ICogNCArIDFdICtcclxuICAgICAgICAgICAgICAgICAwLjExNCAqIGNhbnZhc0RhdGFbdG9wUm93SWR4ICogNCArIDJdKSArXHJcbiAgICAgICAgICAgICAgICAoMC4yOTkgKiBjYW52YXNEYXRhWyh0b3BSb3dJZHggKyAxKSAqIDQgKyAwXSArXHJcbiAgICAgICAgICAgICAgICAgMC41ODcgKiBjYW52YXNEYXRhWyh0b3BSb3dJZHggKyAxKSAqIDQgKyAxXSArXHJcbiAgICAgICAgICAgICAgICAgMC4xMTQgKiBjYW52YXNEYXRhWyh0b3BSb3dJZHggKyAxKSAqIDQgKyAyXSkgK1xyXG4gICAgICAgICAgICAgICAgKDAuMjk5ICogY2FudmFzRGF0YVsoYm90dG9tUm93SWR4KSAqIDQgKyAwXSArXHJcbiAgICAgICAgICAgICAgICAgMC41ODcgKiBjYW52YXNEYXRhWyhib3R0b21Sb3dJZHgpICogNCArIDFdICtcclxuICAgICAgICAgICAgICAgICAwLjExNCAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCkgKiA0ICsgMl0pICtcclxuICAgICAgICAgICAgICAgICgwLjI5OSAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCArIDEpICogNCArIDBdICtcclxuICAgICAgICAgICAgICAgICAwLjU4NyAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCArIDEpICogNCArIDFdICtcclxuICAgICAgICAgICAgICAgICAwLjExNCAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCArIDEpICogNCArIDJdKSkgLyA0KTtcclxuICAgICAgICAgICAgb3V0SW1nSWR4Kys7XHJcbiAgICAgICAgICAgIHRvcFJvd0lkeCA9IHRvcFJvd0lkeCArIDI7XHJcbiAgICAgICAgICAgIGJvdHRvbVJvd0lkeCA9IGJvdHRvbVJvd0lkeCArIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRvcFJvd0lkeCA9IHRvcFJvd0lkeCArIGluV2lkdGg7XHJcbiAgICAgICAgYm90dG9tUm93SWR4ID0gYm90dG9tUm93SWR4ICsgaW5XaWR0aDtcclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMuY29tcHV0ZUdyYXkgPSBmdW5jdGlvbihpbWFnZURhdGEsIG91dEFycmF5LCBjb25maWcpIHtcclxuICAgIHZhciBsID0gKGltYWdlRGF0YS5sZW5ndGggLyA0KSB8IDAsXHJcbiAgICAgICAgaSxcclxuICAgICAgICBzaW5nbGVDaGFubmVsID0gY29uZmlnICYmIGNvbmZpZy5zaW5nbGVDaGFubmVsID09PSB0cnVlO1xyXG5cclxuICAgIGlmIChzaW5nbGVDaGFubmVsKSB7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBvdXRBcnJheVtpXSA9IGltYWdlRGF0YVtpICogNCArIDBdO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBvdXRBcnJheVtpXSA9IE1hdGguZmxvb3IoXHJcbiAgICAgICAgICAgICAgICAwLjI5OSAqIGltYWdlRGF0YVtpICogNCArIDBdICsgMC41ODcgKiBpbWFnZURhdGFbaSAqIDQgKyAxXSArIDAuMTE0ICogaW1hZ2VEYXRhW2kgKiA0ICsgMl0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMubG9hZEltYWdlQXJyYXkgPSBmdW5jdGlvbihzcmMsIGNhbGxiYWNrLCBjYW52YXMpIHtcclxuICAgIGlmICghY2FudmFzKSB7XHJcbiAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICBpbWcuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjYW52YXMud2lkdGggPSB0aGlzLndpZHRoO1xyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuICAgICAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLCAwLCAwKTtcclxuICAgICAgICB2YXIgYXJyYXkgPSBuZXcgVWludDhBcnJheSh0aGlzLndpZHRoICogdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcywgMCwgMCk7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KS5kYXRhO1xyXG4gICAgICAgIENWVXRpbHMuY29tcHV0ZUdyYXkoZGF0YSwgYXJyYXkpO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2soYXJyYXksIHtcclxuICAgICAgICAgICAgeDogdGhpcy53aWR0aCxcclxuICAgICAgICAgICAgeTogdGhpcy5oZWlnaHRcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH07XHJcbiAgICBpbWcuc3JjID0gc3JjO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSBpbkltZyB7SW1hZ2VXcmFwcGVyfSBpbnB1dCBpbWFnZSB0byBiZSBzYW1wbGVkXHJcbiAqIEBwYXJhbSBvdXRJbWcge0ltYWdlV3JhcHBlcn0gdG8gYmUgc3RvcmVkIGluXHJcbiAqL1xyXG5DVlV0aWxzLmhhbGZTYW1wbGUgPSBmdW5jdGlvbihpbkltZ1dyYXBwZXIsIG91dEltZ1dyYXBwZXIpIHtcclxuICAgIHZhciBpbkltZyA9IGluSW1nV3JhcHBlci5kYXRhO1xyXG4gICAgdmFyIGluV2lkdGggPSBpbkltZ1dyYXBwZXIuc2l6ZS54O1xyXG4gICAgdmFyIG91dEltZyA9IG91dEltZ1dyYXBwZXIuZGF0YTtcclxuICAgIHZhciB0b3BSb3dJZHggPSAwO1xyXG4gICAgdmFyIGJvdHRvbVJvd0lkeCA9IGluV2lkdGg7XHJcbiAgICB2YXIgZW5kSWR4ID0gaW5JbWcubGVuZ3RoO1xyXG4gICAgdmFyIG91dFdpZHRoID0gaW5XaWR0aCAvIDI7XHJcbiAgICB2YXIgb3V0SW1nSWR4ID0gMDtcclxuICAgIHdoaWxlIChib3R0b21Sb3dJZHggPCBlbmRJZHgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG91dFdpZHRoOyBpKyspIHtcclxuICAgICAgICAgICAgb3V0SW1nW291dEltZ0lkeF0gPSBNYXRoLmZsb29yKFxyXG4gICAgICAgICAgICAgICAgKGluSW1nW3RvcFJvd0lkeF0gKyBpbkltZ1t0b3BSb3dJZHggKyAxXSArIGluSW1nW2JvdHRvbVJvd0lkeF0gKyBpbkltZ1tib3R0b21Sb3dJZHggKyAxXSkgLyA0KTtcclxuICAgICAgICAgICAgb3V0SW1nSWR4Kys7XHJcbiAgICAgICAgICAgIHRvcFJvd0lkeCA9IHRvcFJvd0lkeCArIDI7XHJcbiAgICAgICAgICAgIGJvdHRvbVJvd0lkeCA9IGJvdHRvbVJvd0lkeCArIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRvcFJvd0lkeCA9IHRvcFJvd0lkeCArIGluV2lkdGg7XHJcbiAgICAgICAgYm90dG9tUm93SWR4ID0gYm90dG9tUm93SWR4ICsgaW5XaWR0aDtcclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMuaHN2MnJnYiA9IGZ1bmN0aW9uKGhzdiwgcmdiKSB7XHJcbiAgICB2YXIgaCA9IGhzdlswXSxcclxuICAgICAgICBzID0gaHN2WzFdLFxyXG4gICAgICAgIHYgPSBoc3ZbMl0sXHJcbiAgICAgICAgYyA9IHYgKiBzLFxyXG4gICAgICAgIHggPSBjICogKDEgLSBNYXRoLmFicygoaCAvIDYwKSAlIDIgLSAxKSksXHJcbiAgICAgICAgbSA9IHYgLSBjLFxyXG4gICAgICAgIHIgPSAwLFxyXG4gICAgICAgIGcgPSAwLFxyXG4gICAgICAgIGIgPSAwO1xyXG5cclxuICAgIHJnYiA9IHJnYiB8fCBbMCwgMCwgMF07XHJcblxyXG4gICAgaWYgKGggPCA2MCkge1xyXG4gICAgICAgIHIgPSBjO1xyXG4gICAgICAgIGcgPSB4O1xyXG4gICAgfSBlbHNlIGlmIChoIDwgMTIwKSB7XHJcbiAgICAgICAgciA9IHg7XHJcbiAgICAgICAgZyA9IGM7XHJcbiAgICB9IGVsc2UgaWYgKGggPCAxODApIHtcclxuICAgICAgICBnID0gYztcclxuICAgICAgICBiID0geDtcclxuICAgIH0gZWxzZSBpZiAoaCA8IDI0MCkge1xyXG4gICAgICAgIGcgPSB4O1xyXG4gICAgICAgIGIgPSBjO1xyXG4gICAgfSBlbHNlIGlmIChoIDwgMzAwKSB7XHJcbiAgICAgICAgciA9IHg7XHJcbiAgICAgICAgYiA9IGM7XHJcbiAgICB9IGVsc2UgaWYgKGggPCAzNjApIHtcclxuICAgICAgICByID0gYztcclxuICAgICAgICBiID0geDtcclxuICAgIH1cclxuICAgIHJnYlswXSA9ICgociArIG0pICogMjU1KSB8IDA7XHJcbiAgICByZ2JbMV0gPSAoKGcgKyBtKSAqIDI1NSkgfCAwO1xyXG4gICAgcmdiWzJdID0gKChiICsgbSkgKiAyNTUpIHwgMDtcclxuICAgIHJldHVybiByZ2I7XHJcbn07XHJcblxyXG5DVlV0aWxzLl9jb21wdXRlRGl2aXNvcnMgPSBmdW5jdGlvbihuKSB7XHJcbiAgICB2YXIgbGFyZ2VEaXZpc29ycyA9IFtdLFxyXG4gICAgICAgIGRpdmlzb3JzID0gW10sXHJcbiAgICAgICAgaTtcclxuXHJcbiAgICBmb3IgKGkgPSAxOyBpIDwgTWF0aC5zcXJ0KG4pICsgMTsgaSsrKSB7XHJcbiAgICAgICAgaWYgKG4gJSBpID09PSAwKSB7XHJcbiAgICAgICAgICAgIGRpdmlzb3JzLnB1c2goaSk7XHJcbiAgICAgICAgICAgIGlmIChpICE9PSBuIC8gaSkge1xyXG4gICAgICAgICAgICAgICAgbGFyZ2VEaXZpc29ycy51bnNoaWZ0KE1hdGguZmxvb3IobiAvIGkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBkaXZpc29ycy5jb25jYXQobGFyZ2VEaXZpc29ycyk7XHJcbn07XHJcblxyXG5DVlV0aWxzLl9jb21wdXRlSW50ZXJzZWN0aW9uID0gZnVuY3Rpb24oYXJyMSwgYXJyMikge1xyXG4gICAgdmFyIGkgPSAwLFxyXG4gICAgICAgIGogPSAwLFxyXG4gICAgICAgIHJlc3VsdCA9IFtdO1xyXG5cclxuICAgIHdoaWxlIChpIDwgYXJyMS5sZW5ndGggJiYgaiA8IGFycjIubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKGFycjFbaV0gPT09IGFycjJbal0pIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goYXJyMVtpXSk7XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgaisrO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJyMVtpXSA+IGFycjJbal0pIHtcclxuICAgICAgICAgICAgaisrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuQ1ZVdGlscy5jYWxjdWxhdGVQYXRjaFNpemUgPSBmdW5jdGlvbihwYXRjaFNpemUsIGltZ1NpemUpIHtcclxuICAgIHZhciBkaXZpc29yc1ggPSB0aGlzLl9jb21wdXRlRGl2aXNvcnMoaW1nU2l6ZS54KSxcclxuICAgICAgICBkaXZpc29yc1kgPSB0aGlzLl9jb21wdXRlRGl2aXNvcnMoaW1nU2l6ZS55KSxcclxuICAgICAgICB3aWRlU2lkZSA9IE1hdGgubWF4KGltZ1NpemUueCwgaW1nU2l6ZS55KSxcclxuICAgICAgICBjb21tb24gPSB0aGlzLl9jb21wdXRlSW50ZXJzZWN0aW9uKGRpdmlzb3JzWCwgZGl2aXNvcnNZKSxcclxuICAgICAgICBuck9mUGF0Y2hlc0xpc3QgPSBbOCwgMTAsIDE1LCAyMCwgMzIsIDYwLCA4MF0sXHJcbiAgICAgICAgbnJPZlBhdGNoZXNNYXAgPSB7XHJcbiAgICAgICAgICAgIFwieC1zbWFsbFwiOiA1LFxyXG4gICAgICAgICAgICBcInNtYWxsXCI6IDQsXHJcbiAgICAgICAgICAgIFwibWVkaXVtXCI6IDMsXHJcbiAgICAgICAgICAgIFwibGFyZ2VcIjogMixcclxuICAgICAgICAgICAgXCJ4LWxhcmdlXCI6IDFcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5yT2ZQYXRjaGVzSWR4ID0gbnJPZlBhdGNoZXNNYXBbcGF0Y2hTaXplXSB8fCBuck9mUGF0Y2hlc01hcC5tZWRpdW0sXHJcbiAgICAgICAgbnJPZlBhdGNoZXMgPSBuck9mUGF0Y2hlc0xpc3RbbnJPZlBhdGNoZXNJZHhdLFxyXG4gICAgICAgIGRlc2lyZWRQYXRjaFNpemUgPSBNYXRoLmZsb29yKHdpZGVTaWRlIC8gbnJPZlBhdGNoZXMpLFxyXG4gICAgICAgIG9wdGltYWxQYXRjaFNpemU7XHJcblxyXG4gICAgZnVuY3Rpb24gZmluZFBhdGNoU2l6ZUZvckRpdmlzb3JzKGRpdmlzb3JzKSB7XHJcbiAgICAgICAgdmFyIGkgPSAwLFxyXG4gICAgICAgICAgICBmb3VuZCA9IGRpdmlzb3JzW01hdGguZmxvb3IoZGl2aXNvcnMubGVuZ3RoIC8gMildO1xyXG5cclxuICAgICAgICB3aGlsZSAoaSA8IChkaXZpc29ycy5sZW5ndGggLSAxKSAmJiBkaXZpc29yc1tpXSA8IGRlc2lyZWRQYXRjaFNpemUpIHtcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaSA+IDApIHtcclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRpdmlzb3JzW2ldIC0gZGVzaXJlZFBhdGNoU2l6ZSkgPiBNYXRoLmFicyhkaXZpc29yc1tpIC0gMV0gLSBkZXNpcmVkUGF0Y2hTaXplKSkge1xyXG4gICAgICAgICAgICAgICAgZm91bmQgPSBkaXZpc29yc1tpIC0gMV07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3VuZCA9IGRpdmlzb3JzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkZXNpcmVkUGF0Y2hTaXplIC8gZm91bmQgPCBuck9mUGF0Y2hlc0xpc3RbbnJPZlBhdGNoZXNJZHggKyAxXSAvIG5yT2ZQYXRjaGVzTGlzdFtuck9mUGF0Y2hlc0lkeF0gJiZcclxuICAgICAgICAgICAgZGVzaXJlZFBhdGNoU2l6ZSAvIGZvdW5kID4gbnJPZlBhdGNoZXNMaXN0W25yT2ZQYXRjaGVzSWR4IC0gMV0gLyBuck9mUGF0Y2hlc0xpc3RbbnJPZlBhdGNoZXNJZHhdICkge1xyXG4gICAgICAgICAgICByZXR1cm4ge3g6IGZvdW5kLCB5OiBmb3VuZH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIG9wdGltYWxQYXRjaFNpemUgPSBmaW5kUGF0Y2hTaXplRm9yRGl2aXNvcnMoY29tbW9uKTtcclxuICAgIGlmICghb3B0aW1hbFBhdGNoU2l6ZSkge1xyXG4gICAgICAgIG9wdGltYWxQYXRjaFNpemUgPSBmaW5kUGF0Y2hTaXplRm9yRGl2aXNvcnModGhpcy5fY29tcHV0ZURpdmlzb3JzKHdpZGVTaWRlKSk7XHJcbiAgICAgICAgaWYgKCFvcHRpbWFsUGF0Y2hTaXplKSB7XHJcbiAgICAgICAgICAgIG9wdGltYWxQYXRjaFNpemUgPSBmaW5kUGF0Y2hTaXplRm9yRGl2aXNvcnMoKHRoaXMuX2NvbXB1dGVEaXZpc29ycyhkZXNpcmVkUGF0Y2hTaXplICogbnJPZlBhdGNoZXMpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9wdGltYWxQYXRjaFNpemU7XHJcbn07XHJcblxyXG5DVlV0aWxzLl9wYXJzZUNTU0RpbWVuc2lvblZhbHVlcyA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICB2YXIgZGltZW5zaW9uID0ge1xyXG4gICAgICAgIHZhbHVlOiBwYXJzZUZsb2F0KHZhbHVlKSxcclxuICAgICAgICB1bml0OiB2YWx1ZS5pbmRleE9mKFwiJVwiKSA9PT0gdmFsdWUubGVuZ3RoIC0gMSA/IFwiJVwiIDogXCIlXCJcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGRpbWVuc2lvbjtcclxufTtcclxuXHJcbkNWVXRpbHMuX2RpbWVuc2lvbnNDb252ZXJ0ZXJzID0ge1xyXG4gICAgdG9wOiBmdW5jdGlvbihkaW1lbnNpb24sIGNvbnRleHQpIHtcclxuICAgICAgICBpZiAoZGltZW5zaW9uLnVuaXQgPT09IFwiJVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKGNvbnRleHQuaGVpZ2h0ICogKGRpbWVuc2lvbi52YWx1ZSAvIDEwMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByaWdodDogZnVuY3Rpb24oZGltZW5zaW9uLCBjb250ZXh0KSB7XHJcbiAgICAgICAgaWYgKGRpbWVuc2lvbi51bml0ID09PSBcIiVcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihjb250ZXh0LndpZHRoIC0gKGNvbnRleHQud2lkdGggKiAoZGltZW5zaW9uLnZhbHVlIC8gMTAwKSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBib3R0b206IGZ1bmN0aW9uKGRpbWVuc2lvbiwgY29udGV4dCkge1xyXG4gICAgICAgIGlmIChkaW1lbnNpb24udW5pdCA9PT0gXCIlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoY29udGV4dC5oZWlnaHQgLSAoY29udGV4dC5oZWlnaHQgKiAoZGltZW5zaW9uLnZhbHVlIC8gMTAwKSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBsZWZ0OiBmdW5jdGlvbihkaW1lbnNpb24sIGNvbnRleHQpIHtcclxuICAgICAgICBpZiAoZGltZW5zaW9uLnVuaXQgPT09IFwiJVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKGNvbnRleHQud2lkdGggKiAoZGltZW5zaW9uLnZhbHVlIC8gMTAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5jb21wdXRlSW1hZ2VBcmVhID0gZnVuY3Rpb24oaW5wdXRXaWR0aCwgaW5wdXRIZWlnaHQsIGFyZWEpIHtcclxuICAgIHZhciBjb250ZXh0ID0ge3dpZHRoOiBpbnB1dFdpZHRoLCBoZWlnaHQ6IGlucHV0SGVpZ2h0fTtcclxuXHJcbiAgICB2YXIgcGFyc2VkQXJlYSA9IE9iamVjdC5rZXlzKGFyZWEpLnJlZHVjZShmdW5jdGlvbihyZXN1bHQsIGtleSkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IGFyZWFba2V5XSxcclxuICAgICAgICAgICAgcGFyc2VkID0gQ1ZVdGlscy5fcGFyc2VDU1NEaW1lbnNpb25WYWx1ZXModmFsdWUpLFxyXG4gICAgICAgICAgICBjYWxjdWxhdGVkID0gQ1ZVdGlscy5fZGltZW5zaW9uc0NvbnZlcnRlcnNba2V5XShwYXJzZWQsIGNvbnRleHQpO1xyXG5cclxuICAgICAgICByZXN1bHRba2V5XSA9IGNhbGN1bGF0ZWQ7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0sIHt9KTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN4OiBwYXJzZWRBcmVhLmxlZnQsXHJcbiAgICAgICAgc3k6IHBhcnNlZEFyZWEudG9wLFxyXG4gICAgICAgIHN3OiBwYXJzZWRBcmVhLnJpZ2h0IC0gcGFyc2VkQXJlYS5sZWZ0LFxyXG4gICAgICAgIHNoOiBwYXJzZWRBcmVhLmJvdHRvbSAtIHBhcnNlZEFyZWEudG9wXHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ1ZVdGlscztcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvY29tbW9uL2N2X3V0aWxzLmpzXG4gKiovIiwiaW1wb3J0IHt2ZWMyfSBmcm9tICdnbC1tYXRyaXgnO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgY2x1c3RlciBmb3IgZ3JvdXBpbmcgc2ltaWxhciBvcmllbnRhdGlvbnMgb2YgZGF0YXBvaW50c1xyXG4gICAgICovXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNyZWF0ZTogZnVuY3Rpb24ocG9pbnQsIHRocmVzaG9sZCkge1xyXG4gICAgICAgIHZhciBwb2ludHMgPSBbXSxcclxuICAgICAgICAgICAgY2VudGVyID0ge1xyXG4gICAgICAgICAgICAgICAgcmFkOiAwLFxyXG4gICAgICAgICAgICAgICAgdmVjOiB2ZWMyLmNsb25lKFswLCAwXSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcG9pbnRNYXAgPSB7fTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgYWRkKHBvaW50KTtcclxuICAgICAgICAgICAgdXBkYXRlQ2VudGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGQocG9pbnRUb0FkZCkge1xyXG4gICAgICAgICAgICBwb2ludE1hcFtwb2ludFRvQWRkLmlkXSA9IHBvaW50VG9BZGQ7XHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKHBvaW50VG9BZGQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlQ2VudGVyKCkge1xyXG4gICAgICAgICAgICB2YXIgaSwgc3VtID0gMDtcclxuICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHN1bSArPSBwb2ludHNbaV0ucmFkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNlbnRlci5yYWQgPSBzdW0gLyBwb2ludHMubGVuZ3RoO1xyXG4gICAgICAgICAgICBjZW50ZXIudmVjID0gdmVjMi5jbG9uZShbTWF0aC5jb3MoY2VudGVyLnJhZCksIE1hdGguc2luKGNlbnRlci5yYWQpXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFkZDogZnVuY3Rpb24ocG9pbnRUb0FkZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFwb2ludE1hcFtwb2ludFRvQWRkLmlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZChwb2ludFRvQWRkKTtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDZW50ZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZml0czogZnVuY3Rpb24ob3RoZXJQb2ludCkge1xyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgY29zaW5lIHNpbWlsYXJpdHkgdG8gY2VudGVyLWFuZ2xlXHJcbiAgICAgICAgICAgICAgICB2YXIgc2ltaWxhcml0eSA9IE1hdGguYWJzKHZlYzIuZG90KG90aGVyUG9pbnQucG9pbnQudmVjLCBjZW50ZXIudmVjKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2ltaWxhcml0eSA+IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRQb2ludHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0Q2VudGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjZW50ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGNyZWF0ZVBvaW50OiBmdW5jdGlvbihuZXdQb2ludCwgaWQsIHByb3BlcnR5KSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmFkOiBuZXdQb2ludFtwcm9wZXJ0eV0sXHJcbiAgICAgICAgICAgIHBvaW50OiBuZXdQb2ludCxcclxuICAgICAgICAgICAgaWQ6IGlkXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvY29tbW9uL2NsdXN0ZXIuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnbC1tYXRyaXhcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImdsLW1hdHJpeFwiXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oYXJyLCB2YWwpIHtcclxuICAgICAgICB2YXIgbCA9IGFyci5sZW5ndGg7XHJcbiAgICAgICAgd2hpbGUgKGwtLSkge1xyXG4gICAgICAgICAgICBhcnJbbF0gPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNodWZmbGVzIHRoZSBjb250ZW50IG9mIGFuIGFycmF5XHJcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gdGhlIGFycmF5IGl0c2VsZiBzaHVmZmxlZFxyXG4gICAgICovXHJcbiAgICBzaHVmZmxlOiBmdW5jdGlvbihhcnIpIHtcclxuICAgICAgICB2YXIgaSA9IGFyci5sZW5ndGggLSAxLCBqLCB4O1xyXG4gICAgICAgIGZvciAoaTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpO1xyXG4gICAgICAgICAgICB4ID0gYXJyW2ldO1xyXG4gICAgICAgICAgICBhcnJbaV0gPSBhcnJbal07XHJcbiAgICAgICAgICAgIGFycltqXSA9IHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9LFxyXG5cclxuICAgIHRvUG9pbnRMaXN0OiBmdW5jdGlvbihhcnIpIHtcclxuICAgICAgICB2YXIgaSwgaiwgcm93ID0gW10sIHJvd3MgPSBbXTtcclxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICByb3cgPSBbXTtcclxuICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBhcnJbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHJvd1tqXSA9IGFycltpXVtqXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByb3dzW2ldID0gXCJbXCIgKyByb3cuam9pbihcIixcIikgKyBcIl1cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiW1wiICsgcm93cy5qb2luKFwiLFxcclxcblwiKSArIFwiXVwiO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgdGhlIGVsZW1lbnRzIHdoaWNoJ3Mgc2NvcmUgaXMgYmlnZ2VyIHRoYW4gdGhlIHRocmVzaG9sZFxyXG4gICAgICogQHJldHVybiB7QXJyYXl9IHRoZSByZWR1Y2VkIGFycmF5XHJcbiAgICAgKi9cclxuICAgIHRocmVzaG9sZDogZnVuY3Rpb24oYXJyLCB0aHJlc2hvbGQsIHNjb3JlRnVuYykge1xyXG4gICAgICAgIHZhciBpLCBxdWV1ZSA9IFtdO1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChzY29yZUZ1bmMuYXBwbHkoYXJyLCBbYXJyW2ldXSkgPj0gdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKGFycltpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHF1ZXVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBtYXhJbmRleDogZnVuY3Rpb24oYXJyKSB7XHJcbiAgICAgICAgdmFyIGksIG1heCA9IDA7XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGFycltpXSA+IGFyclttYXhdKSB7XHJcbiAgICAgICAgICAgICAgICBtYXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXg7XHJcbiAgICB9LFxyXG5cclxuICAgIG1heDogZnVuY3Rpb24oYXJyKSB7XHJcbiAgICAgICAgdmFyIGksIG1heCA9IDA7XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGFycltpXSA+IG1heCkge1xyXG4gICAgICAgICAgICAgICAgbWF4ID0gYXJyW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXg7XHJcbiAgICB9LFxyXG5cclxuICAgIHN1bTogZnVuY3Rpb24oYXJyKSB7XHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IGFyci5sZW5ndGgsXHJcbiAgICAgICAgICAgIHN1bSA9IDA7XHJcblxyXG4gICAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgICAgICBzdW0gKz0gYXJyW2xlbmd0aF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdW07XHJcbiAgICB9XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvbW1vbi9hcnJheV9oZWxwZXIuanNcbiAqKi8iLCJpbXBvcnQgSW1hZ2VXcmFwcGVyIGZyb20gJy4uL2NvbW1vbi9pbWFnZV93cmFwcGVyJztcclxuaW1wb3J0IENWVXRpbHMgZnJvbSAnLi4vY29tbW9uL2N2X3V0aWxzJztcclxuaW1wb3J0IEFycmF5SGVscGVyIGZyb20gJy4uL2NvbW1vbi9hcnJheV9oZWxwZXInO1xyXG5pbXBvcnQgSW1hZ2VEZWJ1ZyBmcm9tICcuLi9jb21tb24vaW1hZ2VfZGVidWcnO1xyXG5pbXBvcnQgUmFzdGVyaXplciBmcm9tICcuL3Jhc3Rlcml6ZXInO1xyXG5pbXBvcnQgVHJhY2VyIGZyb20gJy4vdHJhY2VyJztcclxuaW1wb3J0IHNrZWxldG9uaXplciBmcm9tICcuL3NrZWxldG9uaXplcic7XHJcbmltcG9ydCB7dmVjMiwgbWF0Mn0gZnJvbSAnZ2wtbWF0cml4JztcclxuXHJcbnZhciBfY29uZmlnLFxyXG4gICAgX2N1cnJlbnRJbWFnZVdyYXBwZXIsXHJcbiAgICBfc2tlbEltYWdlV3JhcHBlcixcclxuICAgIF9zdWJJbWFnZVdyYXBwZXIsXHJcbiAgICBfbGFiZWxJbWFnZVdyYXBwZXIsXHJcbiAgICBfcGF0Y2hHcmlkLFxyXG4gICAgX3BhdGNoTGFiZWxHcmlkLFxyXG4gICAgX2ltYWdlVG9QYXRjaEdyaWQsXHJcbiAgICBfYmluYXJ5SW1hZ2VXcmFwcGVyLFxyXG4gICAgX3BhdGNoU2l6ZSxcclxuICAgIF9jYW52YXNDb250YWluZXIgPSB7XHJcbiAgICAgICAgY3R4OiB7XHJcbiAgICAgICAgICAgIGJpbmFyeTogbnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZG9tOiB7XHJcbiAgICAgICAgICAgIGJpbmFyeTogbnVsbFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBfbnVtUGF0Y2hlcyA9IHt4OiAwLCB5OiAwfSxcclxuICAgIF9pbnB1dEltYWdlV3JhcHBlcixcclxuICAgIF9za2VsZXRvbml6ZXI7XHJcblxyXG5mdW5jdGlvbiBpbml0QnVmZmVycygpIHtcclxuICAgIHZhciBza2VsZXRvbkltYWdlRGF0YTtcclxuXHJcbiAgICBpZiAoX2NvbmZpZy5oYWxmU2FtcGxlKSB7XHJcbiAgICAgICAgX2N1cnJlbnRJbWFnZVdyYXBwZXIgPSBuZXcgSW1hZ2VXcmFwcGVyKHtcclxuICAgICAgICAgICAgeDogX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUueCAvIDIgfCAwLFxyXG4gICAgICAgICAgICB5OiBfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS55IC8gMiB8IDBcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX2N1cnJlbnRJbWFnZVdyYXBwZXIgPSBfaW5wdXRJbWFnZVdyYXBwZXI7XHJcbiAgICB9XHJcblxyXG4gICAgX3BhdGNoU2l6ZSA9IENWVXRpbHMuY2FsY3VsYXRlUGF0Y2hTaXplKF9jb25maWcucGF0Y2hTaXplLCBfY3VycmVudEltYWdlV3JhcHBlci5zaXplKTtcclxuXHJcbiAgICBfbnVtUGF0Y2hlcy54ID0gX2N1cnJlbnRJbWFnZVdyYXBwZXIuc2l6ZS54IC8gX3BhdGNoU2l6ZS54IHwgMDtcclxuICAgIF9udW1QYXRjaGVzLnkgPSBfY3VycmVudEltYWdlV3JhcHBlci5zaXplLnkgLyBfcGF0Y2hTaXplLnkgfCAwO1xyXG5cclxuICAgIF9iaW5hcnlJbWFnZVdyYXBwZXIgPSBuZXcgSW1hZ2VXcmFwcGVyKF9jdXJyZW50SW1hZ2VXcmFwcGVyLnNpemUsIHVuZGVmaW5lZCwgVWludDhBcnJheSwgZmFsc2UpO1xyXG5cclxuICAgIF9sYWJlbEltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoX3BhdGNoU2l6ZSwgdW5kZWZpbmVkLCBBcnJheSwgdHJ1ZSk7XHJcblxyXG4gICAgc2tlbGV0b25JbWFnZURhdGEgPSBuZXcgQXJyYXlCdWZmZXIoNjQgKiAxMDI0KTtcclxuICAgIF9zdWJJbWFnZVdyYXBwZXIgPSBuZXcgSW1hZ2VXcmFwcGVyKF9wYXRjaFNpemUsXHJcbiAgICAgICAgbmV3IFVpbnQ4QXJyYXkoc2tlbGV0b25JbWFnZURhdGEsIDAsIF9wYXRjaFNpemUueCAqIF9wYXRjaFNpemUueSkpO1xyXG4gICAgX3NrZWxJbWFnZVdyYXBwZXIgPSBuZXcgSW1hZ2VXcmFwcGVyKF9wYXRjaFNpemUsXHJcbiAgICAgICAgbmV3IFVpbnQ4QXJyYXkoc2tlbGV0b25JbWFnZURhdGEsIF9wYXRjaFNpemUueCAqIF9wYXRjaFNpemUueSAqIDMsIF9wYXRjaFNpemUueCAqIF9wYXRjaFNpemUueSksXHJcbiAgICAgICAgdW5kZWZpbmVkLCB0cnVlKTtcclxuICAgIF9za2VsZXRvbml6ZXIgPSBza2VsZXRvbml6ZXIoKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSA/IHdpbmRvdyA6ICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpID8gc2VsZiA6IGdsb2JhbCwge1xyXG4gICAgICAgIHNpemU6IF9wYXRjaFNpemUueFxyXG4gICAgfSwgc2tlbGV0b25JbWFnZURhdGEpO1xyXG5cclxuICAgIF9pbWFnZVRvUGF0Y2hHcmlkID0gbmV3IEltYWdlV3JhcHBlcih7XHJcbiAgICAgICAgeDogKF9jdXJyZW50SW1hZ2VXcmFwcGVyLnNpemUueCAvIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS54KSB8IDAsXHJcbiAgICAgICAgeTogKF9jdXJyZW50SW1hZ2VXcmFwcGVyLnNpemUueSAvIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS55KSB8IDBcclxuICAgIH0sIHVuZGVmaW5lZCwgQXJyYXksIHRydWUpO1xyXG4gICAgX3BhdGNoR3JpZCA9IG5ldyBJbWFnZVdyYXBwZXIoX2ltYWdlVG9QYXRjaEdyaWQuc2l6ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xyXG4gICAgX3BhdGNoTGFiZWxHcmlkID0gbmV3IEltYWdlV3JhcHBlcihfaW1hZ2VUb1BhdGNoR3JpZC5zaXplLCB1bmRlZmluZWQsIEludDMyQXJyYXksIHRydWUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0Q2FudmFzKCkge1xyXG4gICAgaWYgKF9jb25maWcudXNlV29ya2VyIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5LmNsYXNzTmFtZSA9IFwiYmluYXJ5QnVmZmVyXCI7XHJcbiAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIF9jb25maWcuZGVidWcuc2hvd0NhbnZhcyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVidWdcIikuYXBwZW5kQ2hpbGQoX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5KTtcclxuICAgIH1cclxuICAgIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSA9IF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkud2lkdGggPSBfYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueDtcclxuICAgIF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeS5oZWlnaHQgPSBfYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBib3VuZGluZyBib3ggd2hpY2ggZW5jbG9zZXMgYWxsIHRoZSBnaXZlbiBwYXRjaGVzXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gVGhlIG1pbmltYWwgYm91bmRpbmcgYm94XHJcbiAqL1xyXG5mdW5jdGlvbiBib3hGcm9tUGF0Y2hlcyhwYXRjaGVzKSB7XHJcbiAgICB2YXIgb3ZlckF2ZyxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGosXHJcbiAgICAgICAgcGF0Y2gsXHJcbiAgICAgICAgdHJhbnNNYXQsXHJcbiAgICAgICAgbWlueCA9XHJcbiAgICAgICAgX2JpbmFyeUltYWdlV3JhcHBlci5zaXplLngsXHJcbiAgICAgICAgbWlueSA9IF9iaW5hcnlJbWFnZVdyYXBwZXIuc2l6ZS55LFxyXG4gICAgICAgIG1heHggPSAtX2JpbmFyeUltYWdlV3JhcHBlci5zaXplLngsXHJcbiAgICAgICAgbWF4eSA9IC1fYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueSxcclxuICAgICAgICBib3gsXHJcbiAgICAgICAgc2NhbGU7XHJcblxyXG4gICAgLy8gZHJhdyBhbGwgcGF0Y2hlcyB3aGljaCBhcmUgdG8gYmUgdGFrZW4gaW50byBjb25zaWRlcmF0aW9uXHJcbiAgICBvdmVyQXZnID0gMDtcclxuICAgIGZvciAoIGkgPSAwOyBpIDwgcGF0Y2hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHBhdGNoID0gcGF0Y2hlc1tpXTtcclxuICAgICAgICBvdmVyQXZnICs9IHBhdGNoLnJhZDtcclxuICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIF9jb25maWcuZGVidWcuc2hvd1BhdGNoZXMpIHtcclxuICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UmVjdChwYXRjaC5wb3MsIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LCB7Y29sb3I6IFwicmVkXCJ9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb3ZlckF2ZyAvPSBwYXRjaGVzLmxlbmd0aDtcclxuICAgIG92ZXJBdmcgPSAob3ZlckF2ZyAqIDE4MCAvIE1hdGguUEkgKyA5MCkgJSAxODAgLSA5MDtcclxuICAgIGlmIChvdmVyQXZnIDwgMCkge1xyXG4gICAgICAgIG92ZXJBdmcgKz0gMTgwO1xyXG4gICAgfVxyXG5cclxuICAgIG92ZXJBdmcgPSAoMTgwIC0gb3ZlckF2ZykgKiBNYXRoLlBJIC8gMTgwO1xyXG4gICAgdHJhbnNNYXQgPSBtYXQyLmNsb25lKFtNYXRoLmNvcyhvdmVyQXZnKSwgTWF0aC5zaW4ob3ZlckF2ZyksIC1NYXRoLnNpbihvdmVyQXZnKSwgTWF0aC5jb3Mob3ZlckF2ZyldKTtcclxuXHJcbiAgICAvLyBpdGVyYXRlIG92ZXIgcGF0Y2hlcyBhbmQgcm90YXRlIGJ5IGFuZ2xlXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IHBhdGNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwYXRjaCA9IHBhdGNoZXNbaV07XHJcbiAgICAgICAgZm9yICggaiA9IDA7IGogPCA0OyBqKyspIHtcclxuICAgICAgICAgICAgdmVjMi50cmFuc2Zvcm1NYXQyKHBhdGNoLmJveFtqXSwgcGF0Y2guYm94W2pdLCB0cmFuc01hdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIF9jb25maWcuZGVidWcuYm94RnJvbVBhdGNoZXMuc2hvd1RyYW5zZm9ybWVkKSB7XHJcbiAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgocGF0Y2guYm94LCB7eDogMCwgeTogMX0sIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSwge2NvbG9yOiAnIzk5ZmYwMCcsIGxpbmVXaWR0aDogMn0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBmaW5kIGJvdW5kaW5nIGJveFxyXG4gICAgZm9yICggaSA9IDA7IGkgPCBwYXRjaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcGF0Y2ggPSBwYXRjaGVzW2ldO1xyXG4gICAgICAgIGZvciAoIGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXRjaC5ib3hbal1bMF0gPCBtaW54KSB7XHJcbiAgICAgICAgICAgICAgICBtaW54ID0gcGF0Y2guYm94W2pdWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYXRjaC5ib3hbal1bMF0gPiBtYXh4KSB7XHJcbiAgICAgICAgICAgICAgICBtYXh4ID0gcGF0Y2guYm94W2pdWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYXRjaC5ib3hbal1bMV0gPCBtaW55KSB7XHJcbiAgICAgICAgICAgICAgICBtaW55ID0gcGF0Y2guYm94W2pdWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYXRjaC5ib3hbal1bMV0gPiBtYXh5KSB7XHJcbiAgICAgICAgICAgICAgICBtYXh5ID0gcGF0Y2guYm94W2pdWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJveCA9IFtbbWlueCwgbWlueV0sIFttYXh4LCBtaW55XSwgW21heHgsIG1heHldLCBbbWlueCwgbWF4eV1dO1xyXG5cclxuICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgX2NvbmZpZy5kZWJ1Zy5ib3hGcm9tUGF0Y2hlcy5zaG93VHJhbnNmb3JtZWRCb3gpIHtcclxuICAgICAgICBJbWFnZURlYnVnLmRyYXdQYXRoKGJveCwge3g6IDAsIHk6IDF9LCBfY2FudmFzQ29udGFpbmVyLmN0eC5iaW5hcnksIHtjb2xvcjogJyNmZjAwMDAnLCBsaW5lV2lkdGg6IDJ9KTtcclxuICAgIH1cclxuXHJcbiAgICBzY2FsZSA9IF9jb25maWcuaGFsZlNhbXBsZSA/IDIgOiAxO1xyXG4gICAgLy8gcmV2ZXJzZSByb3RhdGlvbjtcclxuICAgIHRyYW5zTWF0ID0gbWF0Mi5pbnZlcnQodHJhbnNNYXQsIHRyYW5zTWF0KTtcclxuICAgIGZvciAoIGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgdmVjMi50cmFuc2Zvcm1NYXQyKGJveFtqXSwgYm94W2pdLCB0cmFuc01hdCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiBfY29uZmlnLmRlYnVnLmJveEZyb21QYXRjaGVzLnNob3dCQikge1xyXG4gICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgoYm94LCB7eDogMCwgeTogMX0sIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSwge2NvbG9yOiAnI2ZmMDAwMCcsIGxpbmVXaWR0aDogMn0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgdmVjMi5zY2FsZShib3hbal0sIGJveFtqXSwgc2NhbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBib3g7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgYmluYXJ5IGltYWdlIG9mIHRoZSBjdXJyZW50IGltYWdlXHJcbiAqL1xyXG5mdW5jdGlvbiBiaW5hcml6ZUltYWdlKCkge1xyXG4gICAgQ1ZVdGlscy5vdHN1VGhyZXNob2xkKF9jdXJyZW50SW1hZ2VXcmFwcGVyLCBfYmluYXJ5SW1hZ2VXcmFwcGVyKTtcclxuICAgIF9iaW5hcnlJbWFnZVdyYXBwZXIuemVyb0JvcmRlcigpO1xyXG4gICAgaWYgKF9jb25maWcuc2hvd0NhbnZhcykge1xyXG4gICAgICAgIF9iaW5hcnlJbWFnZVdyYXBwZXIuc2hvdyhfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnksIDI1NSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJdGVyYXRlIG92ZXIgdGhlIGVudGlyZSBpbWFnZVxyXG4gKiBleHRyYWN0IHBhdGNoZXNcclxuICovXHJcbmZ1bmN0aW9uIGZpbmRQYXRjaGVzKCkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgaixcclxuICAgICAgICB4LFxyXG4gICAgICAgIHksXHJcbiAgICAgICAgbW9tZW50cyxcclxuICAgICAgICBwYXRjaGVzRm91bmQgPSBbXSxcclxuICAgICAgICByYXN0ZXJpemVyLFxyXG4gICAgICAgIHJhc3RlclJlc3VsdCxcclxuICAgICAgICBwYXRjaDtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBfbnVtUGF0Y2hlcy54OyBpKyspIHtcclxuICAgICAgICBmb3IgKGogPSAwOyBqIDwgX251bVBhdGNoZXMueTsgaisrKSB7XHJcbiAgICAgICAgICAgIHggPSBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueCAqIGk7XHJcbiAgICAgICAgICAgIHkgPSBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueSAqIGo7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXBlcmF0ZSBwYXJ0c1xyXG4gICAgICAgICAgICBza2VsZXRvbml6ZSh4LCB5KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJhc3Rlcml6ZSwgZmluZCBpbmRpdmlkdWFsIGJhcnNcclxuICAgICAgICAgICAgX3NrZWxJbWFnZVdyYXBwZXIuemVyb0JvcmRlcigpO1xyXG4gICAgICAgICAgICBBcnJheUhlbHBlci5pbml0KF9sYWJlbEltYWdlV3JhcHBlci5kYXRhLCAwKTtcclxuICAgICAgICAgICAgcmFzdGVyaXplciA9IFJhc3Rlcml6ZXIuY3JlYXRlKF9za2VsSW1hZ2VXcmFwcGVyLCBfbGFiZWxJbWFnZVdyYXBwZXIpO1xyXG4gICAgICAgICAgICByYXN0ZXJSZXN1bHQgPSByYXN0ZXJpemVyLnJhc3Rlcml6ZSgwKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgX2NvbmZpZy5kZWJ1Zy5zaG93TGFiZWxzKSB7XHJcbiAgICAgICAgICAgICAgICBfbGFiZWxJbWFnZVdyYXBwZXIub3ZlcmxheShfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnksIE1hdGguZmxvb3IoMzYwIC8gcmFzdGVyUmVzdWx0LmNvdW50KSxcclxuICAgICAgICAgICAgICAgICAgICB7eDogeCwgeTogeX0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgbW9tZW50cyBmcm9tIHRoZSBza2VsZXRvbml6ZWQgcGF0Y2hcclxuICAgICAgICAgICAgbW9tZW50cyA9IF9sYWJlbEltYWdlV3JhcHBlci5tb21lbnRzKHJhc3RlclJlc3VsdC5jb3VudCk7XHJcblxyXG4gICAgICAgICAgICAvLyBleHRyYWN0IGVsaWdpYmxlIHBhdGNoZXNcclxuICAgICAgICAgICAgcGF0Y2hlc0ZvdW5kID0gcGF0Y2hlc0ZvdW5kLmNvbmNhdChkZXNjcmliZVBhdGNoKG1vbWVudHMsIFtpLCBqXSwgeCwgeSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIF9jb25maWcuZGVidWcuc2hvd0ZvdW5kUGF0Y2hlcykge1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgcGF0Y2hlc0ZvdW5kLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHBhdGNoID0gcGF0Y2hlc0ZvdW5kW2ldO1xyXG4gICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdSZWN0KHBhdGNoLnBvcywgX3N1YkltYWdlV3JhcHBlci5zaXplLCBfY2FudmFzQ29udGFpbmVyLmN0eC5iaW5hcnksXHJcbiAgICAgICAgICAgICAgICB7Y29sb3I6IFwiIzk5ZmYwMFwiLCBsaW5lV2lkdGg6IDJ9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBhdGNoZXNGb3VuZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmRzIHRob3NlIGNvbm5lY3RlZCBhcmVhcyB3aGljaCBjb250YWluIGF0IGxlYXN0IDYgcGF0Y2hlc1xyXG4gKiBhbmQgcmV0dXJucyB0aGVtIG9yZGVyZWQgREVTQyBieSB0aGUgbnVtYmVyIG9mIGNvbnRhaW5lZCBwYXRjaGVzXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXhMYWJlbFxyXG4gKi9cclxuZnVuY3Rpb24gZmluZEJpZ2dlc3RDb25uZWN0ZWRBcmVhcyhtYXhMYWJlbCl7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBzdW0sXHJcbiAgICAgICAgbGFiZWxIaXN0ID0gW10sXHJcbiAgICAgICAgdG9wTGFiZWxzID0gW107XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCBtYXhMYWJlbDsgaSsrKSB7XHJcbiAgICAgICAgbGFiZWxIaXN0LnB1c2goMCk7XHJcbiAgICB9XHJcbiAgICBzdW0gPSBfcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGg7XHJcbiAgICB3aGlsZSAoc3VtLS0pIHtcclxuICAgICAgICBpZiAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbc3VtXSA+IDApIHtcclxuICAgICAgICAgICAgbGFiZWxIaXN0W19wYXRjaExhYmVsR3JpZC5kYXRhW3N1bV0gLSAxXSsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsYWJlbEhpc3QgPSBsYWJlbEhpc3QubWFwKGZ1bmN0aW9uKHZhbCwgaWR4KSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsOiB2YWwsXHJcbiAgICAgICAgICAgIGxhYmVsOiBpZHggKyAxXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxhYmVsSGlzdC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gYi52YWwgLSBhLnZhbDtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGV4dHJhY3QgdG9wIGFyZWFzIHdpdGggYXQgbGVhc3QgNiBwYXRjaGVzIHByZXNlbnRcclxuICAgIHRvcExhYmVscyA9IGxhYmVsSGlzdC5maWx0ZXIoZnVuY3Rpb24oZWwpIHtcclxuICAgICAgICByZXR1cm4gZWwudmFsID49IDU7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdG9wTGFiZWxzO1xyXG59XHJcblxyXG4vKipcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIGZpbmRCb3hlcyh0b3BMYWJlbHMsIG1heExhYmVsKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBqLFxyXG4gICAgICAgIHN1bSxcclxuICAgICAgICBwYXRjaGVzID0gW10sXHJcbiAgICAgICAgcGF0Y2gsXHJcbiAgICAgICAgYm94LFxyXG4gICAgICAgIGJveGVzID0gW10sXHJcbiAgICAgICAgaHN2ID0gWzAsIDEsIDFdLFxyXG4gICAgICAgIHJnYiA9IFswLCAwLCAwXTtcclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IHRvcExhYmVscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHN1bSA9IF9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aDtcclxuICAgICAgICBwYXRjaGVzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgd2hpbGUgKHN1bS0tKSB7XHJcbiAgICAgICAgICAgIGlmIChfcGF0Y2hMYWJlbEdyaWQuZGF0YVtzdW1dID09PSB0b3BMYWJlbHNbaV0ubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIHBhdGNoID0gX2ltYWdlVG9QYXRjaEdyaWQuZGF0YVtzdW1dO1xyXG4gICAgICAgICAgICAgICAgcGF0Y2hlcy5wdXNoKHBhdGNoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBib3ggPSBib3hGcm9tUGF0Y2hlcyhwYXRjaGVzKTtcclxuICAgICAgICBpZiAoYm94KSB7XHJcbiAgICAgICAgICAgIGJveGVzLnB1c2goYm94KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRyYXcgcGF0Y2gtbGFiZWxzIGlmIHJlcXVlc3RlZFxyXG4gICAgICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIF9jb25maWcuZGVidWcuc2hvd1JlbWFpbmluZ1BhdGNoTGFiZWxzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IHBhdGNoZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRjaCA9IHBhdGNoZXNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgaHN2WzBdID0gKHRvcExhYmVsc1tpXS5sYWJlbCAvIChtYXhMYWJlbCArIDEpKSAqIDM2MDtcclxuICAgICAgICAgICAgICAgICAgICBDVlV0aWxzLmhzdjJyZ2IoaHN2LCByZ2IpO1xyXG4gICAgICAgICAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1JlY3QocGF0Y2gucG9zLCBfc3ViSW1hZ2VXcmFwcGVyLnNpemUsIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge2NvbG9yOiBcInJnYihcIiArIHJnYi5qb2luKFwiLFwiKSArIFwiKVwiLCBsaW5lV2lkdGg6IDJ9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBib3hlcztcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmQgc2ltaWxhciBtb21lbnRzICh2aWEgY2x1c3RlcilcclxuICogQHBhcmFtIHtPYmplY3R9IG1vbWVudHNcclxuICovXHJcbmZ1bmN0aW9uIHNpbWlsYXJNb21lbnRzKG1vbWVudHMpIHtcclxuICAgIHZhciBjbHVzdGVycyA9IENWVXRpbHMuY2x1c3Rlcihtb21lbnRzLCAwLjkwKTtcclxuICAgIHZhciB0b3BDbHVzdGVyID0gQ1ZVdGlscy50b3BHZW5lcmljKGNsdXN0ZXJzLCAxLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgcmV0dXJuIGUuZ2V0UG9pbnRzKCkubGVuZ3RoO1xyXG4gICAgfSk7XHJcbiAgICB2YXIgcG9pbnRzID0gW10sIHJlc3VsdCA9IFtdO1xyXG4gICAgaWYgKHRvcENsdXN0ZXIubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgcG9pbnRzID0gdG9wQ2x1c3RlclswXS5pdGVtLmdldFBvaW50cygpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBvaW50c1tpXS5wb2ludCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gc2tlbGV0b25pemUoeCwgeSkge1xyXG4gICAgX2JpbmFyeUltYWdlV3JhcHBlci5zdWJJbWFnZUFzQ29weShfc3ViSW1hZ2VXcmFwcGVyLCBDVlV0aWxzLmltYWdlUmVmKHgsIHkpKTtcclxuICAgIF9za2VsZXRvbml6ZXIuc2tlbGV0b25pemUoKTtcclxuXHJcbiAgICAvLyBTaG93IHNrZWxldG9uIGlmIHJlcXVlc3RlZFxyXG4gICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiBfY29uZmlnLmRlYnVnLnNob3dTa2VsZXRvbikge1xyXG4gICAgICAgIF9za2VsSW1hZ2VXcmFwcGVyLm92ZXJsYXkoX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5LCAzNjAsIENWVXRpbHMuaW1hZ2VSZWYoeCwgeSkpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogRXh0cmFjdHMgYW5kIGRlc2NyaWJlcyB0aG9zZSBwYXRjaGVzIHdoaWNoIHNlZW0gdG8gY29udGFpbiBhIGJhcmNvZGUgcGF0dGVyblxyXG4gKiBAcGFyYW0ge0FycmF5fSBtb21lbnRzXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXRjaFBvcyxcclxuICogQHBhcmFtIHtOdW1iZXJ9IHhcclxuICogQHBhcmFtIHtOdW1iZXJ9IHlcclxuICogQHJldHVybnMge0FycmF5fSBsaXN0IG9mIHBhdGNoZXNcclxuICovXHJcbmZ1bmN0aW9uIGRlc2NyaWJlUGF0Y2gobW9tZW50cywgcGF0Y2hQb3MsIHgsIHkpIHtcclxuICAgIHZhciBrLFxyXG4gICAgICAgIGF2ZyxcclxuICAgICAgICBlbGlnaWJsZU1vbWVudHMgPSBbXSxcclxuICAgICAgICBtYXRjaGluZ01vbWVudHMsXHJcbiAgICAgICAgcGF0Y2gsXHJcbiAgICAgICAgcGF0Y2hlc0ZvdW5kID0gW10sXHJcbiAgICAgICAgbWluQ29tcG9uZW50V2VpZ2h0ID0gTWF0aC5jZWlsKF9wYXRjaFNpemUueCAvIDMpO1xyXG5cclxuICAgIGlmIChtb21lbnRzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgLy8gb25seSBjb2xsZWN0IG1vbWVudHMgd2hpY2gncyBhcmVhIGNvdmVycyBhdCBsZWFzdCBtaW5Db21wb25lbnRXZWlnaHQgcGl4ZWxzLlxyXG4gICAgICAgIGZvciAoIGsgPSAwOyBrIDwgbW9tZW50cy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICBpZiAobW9tZW50c1trXS5tMDAgPiBtaW5Db21wb25lbnRXZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGVsaWdpYmxlTW9tZW50cy5wdXNoKG1vbWVudHNba10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZiBhdCBsZWFzdCAyIG1vbWVudHMgYXJlIGZvdW5kIHdoaWNoIGhhdmUgYXQgbGVhc3QgbWluQ29tcG9uZW50V2VpZ2h0cyBjb3ZlcmVkXHJcbiAgICAgICAgaWYgKGVsaWdpYmxlTW9tZW50cy5sZW5ndGggPj0gMikge1xyXG4gICAgICAgICAgICBtYXRjaGluZ01vbWVudHMgPSBzaW1pbGFyTW9tZW50cyhlbGlnaWJsZU1vbWVudHMpO1xyXG4gICAgICAgICAgICBhdmcgPSAwO1xyXG4gICAgICAgICAgICAvLyBkZXRlcm1pbmUgdGhlIHNpbWlsYXJpdHkgb2YgdGhlIG1vbWVudHNcclxuICAgICAgICAgICAgZm9yICggayA9IDA7IGsgPCBtYXRjaGluZ01vbWVudHMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgIGF2ZyArPSBtYXRjaGluZ01vbWVudHNba10ucmFkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBPbmx5IHR3byBvZiB0aGUgbW9tZW50cyBhcmUgYWxsb3dlZCBub3QgdG8gZml0IGludG8gdGhlIGVxdWF0aW9uXHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgcGF0Y2ggdG8gdGhlIHNldFxyXG4gICAgICAgICAgICBpZiAobWF0Y2hpbmdNb21lbnRzLmxlbmd0aCA+IDFcclxuICAgICAgICAgICAgICAgICAgICAmJiBtYXRjaGluZ01vbWVudHMubGVuZ3RoID49IChlbGlnaWJsZU1vbWVudHMubGVuZ3RoIC8gNCkgKiAzXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgbWF0Y2hpbmdNb21lbnRzLmxlbmd0aCA+IG1vbWVudHMubGVuZ3RoIC8gNCkge1xyXG4gICAgICAgICAgICAgICAgYXZnIC89IG1hdGNoaW5nTW9tZW50cy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBwYXRjaCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogcGF0Y2hQb3NbMV0gKiBfbnVtUGF0Y2hlcy54ICsgcGF0Y2hQb3NbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGJveDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZWMyLmNsb25lKFt4LCB5XSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlYzIuY2xvbmUoW3ggKyBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueCwgeV0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZWMyLmNsb25lKFt4ICsgX3N1YkltYWdlV3JhcHBlci5zaXplLngsIHkgKyBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueV0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZWMyLmNsb25lKFt4LCB5ICsgX3N1YkltYWdlV3JhcHBlci5zaXplLnldKVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50czogbWF0Y2hpbmdNb21lbnRzLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZDogYXZnLFxyXG4gICAgICAgICAgICAgICAgICAgIHZlYzogdmVjMi5jbG9uZShbTWF0aC5jb3MoYXZnKSwgTWF0aC5zaW4oYXZnKV0pXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcGF0Y2hlc0ZvdW5kLnB1c2gocGF0Y2gpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhdGNoZXNGb3VuZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIGZpbmRzIHBhdGNoZXMgd2hpY2ggYXJlIGNvbm5lY3RlZCBhbmQgc2hhcmUgdGhlIHNhbWUgb3JpZW50YXRpb25cclxuICogQHBhcmFtIHtPYmplY3R9IHBhdGNoZXNGb3VuZFxyXG4gKi9cclxuZnVuY3Rpb24gcmFzdGVyaXplQW5ndWxhclNpbWlsYXJpdHkocGF0Y2hlc0ZvdW5kKSB7XHJcbiAgICB2YXIgbGFiZWwgPSAwLFxyXG4gICAgICAgIHRocmVzaG9sZCA9IDAuOTUsXHJcbiAgICAgICAgY3VycklkeCA9IDAsXHJcbiAgICAgICAgaixcclxuICAgICAgICBwYXRjaCxcclxuICAgICAgICBoc3YgPSBbMCwgMSwgMV0sXHJcbiAgICAgICAgcmdiID0gWzAsIDAsIDBdO1xyXG5cclxuICAgIGZ1bmN0aW9uIG5vdFlldFByb2Nlc3NlZCgpIHtcclxuICAgICAgICB2YXIgaTtcclxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IF9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChfcGF0Y2hMYWJlbEdyaWQuZGF0YVtpXSA9PT0gMCAmJiBfcGF0Y2hHcmlkLmRhdGFbaV0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfcGF0Y2hMYWJlbEdyaWQubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRyYWNlKGN1cnJlbnRJZHgpIHtcclxuICAgICAgICB2YXIgeCxcclxuICAgICAgICAgICAgeSxcclxuICAgICAgICAgICAgY3VycmVudFBhdGNoLFxyXG4gICAgICAgICAgICBpZHgsXHJcbiAgICAgICAgICAgIGRpcixcclxuICAgICAgICAgICAgY3VycmVudCA9IHtcclxuICAgICAgICAgICAgICAgIHg6IGN1cnJlbnRJZHggJSBfcGF0Y2hMYWJlbEdyaWQuc2l6ZS54LFxyXG4gICAgICAgICAgICAgICAgeTogKGN1cnJlbnRJZHggLyBfcGF0Y2hMYWJlbEdyaWQuc2l6ZS54KSB8IDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2ltaWxhcml0eTtcclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnRJZHggPCBfcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY3VycmVudFBhdGNoID0gX2ltYWdlVG9QYXRjaEdyaWQuZGF0YVtjdXJyZW50SWR4XTtcclxuICAgICAgICAgICAgLy8gYXNzaWduIGxhYmVsXHJcbiAgICAgICAgICAgIF9wYXRjaExhYmVsR3JpZC5kYXRhW2N1cnJlbnRJZHhdID0gbGFiZWw7XHJcbiAgICAgICAgICAgIGZvciAoIGRpciA9IDA7IGRpciA8IFRyYWNlci5zZWFyY2hEaXJlY3Rpb25zLmxlbmd0aDsgZGlyKyspIHtcclxuICAgICAgICAgICAgICAgIHkgPSBjdXJyZW50LnkgKyBUcmFjZXIuc2VhcmNoRGlyZWN0aW9uc1tkaXJdWzBdO1xyXG4gICAgICAgICAgICAgICAgeCA9IGN1cnJlbnQueCArIFRyYWNlci5zZWFyY2hEaXJlY3Rpb25zW2Rpcl1bMV07XHJcbiAgICAgICAgICAgICAgICBpZHggPSB5ICogX3BhdGNoTGFiZWxHcmlkLnNpemUueCArIHg7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY29udGludWUgaWYgcGF0Y2ggZW1wdHlcclxuICAgICAgICAgICAgICAgIGlmIChfcGF0Y2hHcmlkLmRhdGFbaWR4XSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9wYXRjaExhYmVsR3JpZC5kYXRhW2lkeF0gPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChfcGF0Y2hMYWJlbEdyaWQuZGF0YVtpZHhdID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2ltaWxhcml0eSA9IE1hdGguYWJzKHZlYzIuZG90KF9pbWFnZVRvUGF0Y2hHcmlkLmRhdGFbaWR4XS52ZWMsIGN1cnJlbnRQYXRjaC52ZWMpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2ltaWxhcml0eSA+IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFjZShpZHgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBwcmVwYXJlIGZvciBmaW5kaW5nIHRoZSByaWdodCBwYXRjaGVzXHJcbiAgICBBcnJheUhlbHBlci5pbml0KF9wYXRjaEdyaWQuZGF0YSwgMCk7XHJcbiAgICBBcnJheUhlbHBlci5pbml0KF9wYXRjaExhYmVsR3JpZC5kYXRhLCAwKTtcclxuICAgIEFycmF5SGVscGVyLmluaXQoX2ltYWdlVG9QYXRjaEdyaWQuZGF0YSwgbnVsbCk7XHJcblxyXG4gICAgZm9yICggaiA9IDA7IGogPCBwYXRjaGVzRm91bmQubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBwYXRjaCA9IHBhdGNoZXNGb3VuZFtqXTtcclxuICAgICAgICBfaW1hZ2VUb1BhdGNoR3JpZC5kYXRhW3BhdGNoLmluZGV4XSA9IHBhdGNoO1xyXG4gICAgICAgIF9wYXRjaEdyaWQuZGF0YVtwYXRjaC5pbmRleF0gPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJhc3Rlcml6ZSB0aGUgcGF0Y2hlcyBmb3VuZCB0byBkZXRlcm1pbmUgYXJlYVxyXG4gICAgX3BhdGNoR3JpZC56ZXJvQm9yZGVyKCk7XHJcblxyXG4gICAgd2hpbGUgKCggY3VycklkeCA9IG5vdFlldFByb2Nlc3NlZCgpKSA8IF9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aCkge1xyXG4gICAgICAgIGxhYmVsKys7XHJcbiAgICAgICAgdHJhY2UoY3VycklkeCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZHJhdyBwYXRjaC1sYWJlbHMgaWYgcmVxdWVzdGVkXHJcbiAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIF9jb25maWcuZGVidWcuc2hvd1BhdGNoTGFiZWxzKSB7XHJcbiAgICAgICAgZm9yICggaiA9IDA7IGogPCBfcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBpZiAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbal0gPiAwICYmIF9wYXRjaExhYmVsR3JpZC5kYXRhW2pdIDw9IGxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRjaCA9IF9pbWFnZVRvUGF0Y2hHcmlkLmRhdGFbal07XHJcbiAgICAgICAgICAgICAgICBoc3ZbMF0gPSAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbal0gLyAobGFiZWwgKyAxKSkgKiAzNjA7XHJcbiAgICAgICAgICAgICAgICBDVlV0aWxzLmhzdjJyZ2IoaHN2LCByZ2IpO1xyXG4gICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UmVjdChwYXRjaC5wb3MsIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LFxyXG4gICAgICAgICAgICAgICAgICAgIHtjb2xvcjogXCJyZ2IoXCIgKyByZ2Iuam9pbihcIixcIikgKyBcIilcIiwgbGluZVdpZHRoOiAyfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxhYmVsO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBpbml0OiBmdW5jdGlvbihpbnB1dEltYWdlV3JhcHBlciwgY29uZmlnKSB7XHJcbiAgICAgICAgX2NvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICBfaW5wdXRJbWFnZVdyYXBwZXIgPSBpbnB1dEltYWdlV3JhcHBlcjtcclxuXHJcbiAgICAgICAgaW5pdEJ1ZmZlcnMoKTtcclxuICAgICAgICBpbml0Q2FudmFzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGxvY2F0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHBhdGNoZXNGb3VuZCxcclxuICAgICAgICAgICAgdG9wTGFiZWxzLFxyXG4gICAgICAgICAgICBib3hlcztcclxuXHJcbiAgICAgICAgaWYgKF9jb25maWcuaGFsZlNhbXBsZSkge1xyXG4gICAgICAgICAgICBDVlV0aWxzLmhhbGZTYW1wbGUoX2lucHV0SW1hZ2VXcmFwcGVyLCBfY3VycmVudEltYWdlV3JhcHBlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBiaW5hcml6ZUltYWdlKCk7XHJcbiAgICAgICAgcGF0Y2hlc0ZvdW5kID0gZmluZFBhdGNoZXMoKTtcclxuICAgICAgICAvLyByZXR1cm4gdW5sZXNzIDUlIG9yIG1vcmUgcGF0Y2hlcyBhcmUgZm91bmRcclxuICAgICAgICBpZiAocGF0Y2hlc0ZvdW5kLmxlbmd0aCA8IF9udW1QYXRjaGVzLnggKiBfbnVtUGF0Y2hlcy55ICogMC4wNSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJhc3RlcnJpemUgYXJlYSBieSBjb21wYXJpbmcgYW5ndWxhciBzaW1pbGFyaXR5O1xyXG4gICAgICAgIHZhciBtYXhMYWJlbCA9IHJhc3Rlcml6ZUFuZ3VsYXJTaW1pbGFyaXR5KHBhdGNoZXNGb3VuZCk7XHJcbiAgICAgICAgaWYgKG1heExhYmVsIDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNlYXJjaCBmb3IgYXJlYSB3aXRoIHRoZSBtb3N0IHBhdGNoZXMgKGJpZ2dlc3QgY29ubmVjdGVkIGFyZWEpXHJcbiAgICAgICAgdG9wTGFiZWxzID0gZmluZEJpZ2dlc3RDb25uZWN0ZWRBcmVhcyhtYXhMYWJlbCk7XHJcbiAgICAgICAgaWYgKHRvcExhYmVscy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBib3hlcyA9IGZpbmRCb3hlcyh0b3BMYWJlbHMsIG1heExhYmVsKTtcclxuICAgICAgICByZXR1cm4gYm94ZXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrSW1hZ2VDb25zdHJhaW50czogZnVuY3Rpb24oaW5wdXRTdHJlYW0sIGNvbmZpZykge1xyXG4gICAgICAgIHZhciBwYXRjaFNpemUsXHJcbiAgICAgICAgICAgIHdpZHRoID0gaW5wdXRTdHJlYW0uZ2V0V2lkdGgoKSxcclxuICAgICAgICAgICAgaGVpZ2h0ID0gaW5wdXRTdHJlYW0uZ2V0SGVpZ2h0KCksXHJcbiAgICAgICAgICAgIGhhbGZTYW1wbGUgPSBjb25maWcuaGFsZlNhbXBsZSA/IDAuNSA6IDEsXHJcbiAgICAgICAgICAgIHNpemUsXHJcbiAgICAgICAgICAgIGFyZWE7XHJcblxyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB3aWR0aCBhbmQgaGVpZ2h0IGJhc2VkIG9uIGFyZWFcclxuICAgICAgICBpZiAoaW5wdXRTdHJlYW0uZ2V0Q29uZmlnKCkuYXJlYSkge1xyXG4gICAgICAgICAgICBhcmVhID0gQ1ZVdGlscy5jb21wdXRlSW1hZ2VBcmVhKHdpZHRoLCBoZWlnaHQsIGlucHV0U3RyZWFtLmdldENvbmZpZygpLmFyZWEpO1xyXG4gICAgICAgICAgICBpbnB1dFN0cmVhbS5zZXRUb3BSaWdodCh7eDogYXJlYS5zeCwgeTogYXJlYS5zeX0pO1xyXG4gICAgICAgICAgICBpbnB1dFN0cmVhbS5zZXRDYW52YXNTaXplKHt4OiB3aWR0aCwgeTogaGVpZ2h0fSk7XHJcbiAgICAgICAgICAgIHdpZHRoID0gYXJlYS5zdztcclxuICAgICAgICAgICAgaGVpZ2h0ID0gYXJlYS5zaDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNpemUgPSB7XHJcbiAgICAgICAgICAgIHg6IE1hdGguZmxvb3Iod2lkdGggKiBoYWxmU2FtcGxlKSxcclxuICAgICAgICAgICAgeTogTWF0aC5mbG9vcihoZWlnaHQgKiBoYWxmU2FtcGxlKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHBhdGNoU2l6ZSA9IENWVXRpbHMuY2FsY3VsYXRlUGF0Y2hTaXplKGNvbmZpZy5wYXRjaFNpemUsIHNpemUpO1xyXG4gICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQYXRjaC1TaXplOiBcIiArIEpTT04uc3RyaW5naWZ5KHBhdGNoU2l6ZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXRTdHJlYW0uc2V0V2lkdGgoTWF0aC5mbG9vcihNYXRoLmZsb29yKHNpemUueCAvIHBhdGNoU2l6ZS54KSAqICgxIC8gaGFsZlNhbXBsZSkgKiBwYXRjaFNpemUueCkpO1xyXG4gICAgICAgIGlucHV0U3RyZWFtLnNldEhlaWdodChNYXRoLmZsb29yKE1hdGguZmxvb3Ioc2l6ZS55IC8gcGF0Y2hTaXplLnkpICogKDEgLyBoYWxmU2FtcGxlKSAqIHBhdGNoU2l6ZS55KSk7XHJcblxyXG4gICAgICAgIGlmICgoaW5wdXRTdHJlYW0uZ2V0V2lkdGgoKSAlIHBhdGNoU2l6ZS54KSA9PT0gMCAmJiAoaW5wdXRTdHJlYW0uZ2V0SGVpZ2h0KCkgJSBwYXRjaFNpemUueSkgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbWFnZSBkaW1lbnNpb25zIGRvIG5vdCBjb21wbHkgd2l0aCB0aGUgY3VycmVudCBzZXR0aW5nczogV2lkdGggKFwiICtcclxuICAgICAgICAgICAgd2lkdGggKyBcIiApYW5kIGhlaWdodCAoXCIgKyBoZWlnaHQgK1xyXG4gICAgICAgICAgICBcIikgbXVzdCBhIG11bHRpcGxlIG9mIFwiICsgcGF0Y2hTaXplLngpO1xyXG4gICAgfVxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9sb2NhdG9yL2JhcmNvZGVfbG9jYXRvci5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGRyYXdSZWN0OiBmdW5jdGlvbihwb3MsIHNpemUsIGN0eCwgc3R5bGUpe1xyXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0eWxlLmNvbG9yO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdHlsZS5jb2xvcjtcclxuICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY3R4LnN0cm9rZVJlY3QocG9zLngsIHBvcy55LCBzaXplLngsIHNpemUueSk7XHJcbiAgICB9LFxyXG4gICAgZHJhd1BhdGg6IGZ1bmN0aW9uKHBhdGgsIGRlZiwgY3R4LCBzdHlsZSkge1xyXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0eWxlLmNvbG9yO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdHlsZS5jb2xvcjtcclxuICAgICAgICBjdHgubGluZVdpZHRoID0gc3R5bGUubGluZVdpZHRoO1xyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHgubW92ZVRvKHBhdGhbMF1bZGVmLnhdLCBwYXRoWzBdW2RlZi55XSk7XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCBwYXRoLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGN0eC5saW5lVG8ocGF0aFtqXVtkZWYueF0sIHBhdGhbal1bZGVmLnldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgIH0sXHJcbiAgICBkcmF3SW1hZ2U6IGZ1bmN0aW9uKGltYWdlRGF0YSwgc2l6ZSwgY3R4KSB7XHJcbiAgICAgICAgdmFyIGNhbnZhc0RhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIHNpemUueCwgc2l6ZS55KSxcclxuICAgICAgICAgICAgZGF0YSA9IGNhbnZhc0RhdGEuZGF0YSxcclxuICAgICAgICAgICAgaW1hZ2VEYXRhUG9zID0gaW1hZ2VEYXRhLmxlbmd0aCxcclxuICAgICAgICAgICAgY2FudmFzRGF0YVBvcyA9IGRhdGEubGVuZ3RoLFxyXG4gICAgICAgICAgICB2YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKGNhbnZhc0RhdGFQb3MgLyBpbWFnZURhdGFQb3MgIT09IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAoaW1hZ2VEYXRhUG9zLS0pe1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGltYWdlRGF0YVtpbWFnZURhdGFQb3NdO1xyXG4gICAgICAgICAgICBkYXRhWy0tY2FudmFzRGF0YVBvc10gPSAyNTU7XHJcbiAgICAgICAgICAgIGRhdGFbLS1jYW52YXNEYXRhUG9zXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBkYXRhWy0tY2FudmFzRGF0YVBvc10gPSB2YWx1ZTtcclxuICAgICAgICAgICAgZGF0YVstLWNhbnZhc0RhdGFQb3NdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0eC5wdXRJbWFnZURhdGEoY2FudmFzRGF0YSwgMCwgMCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvbW1vbi9pbWFnZV9kZWJ1Zy5qc1xuICoqLyIsImltcG9ydCBUcmFjZXIgZnJvbSAnLi90cmFjZXInO1xyXG5cclxuLyoqXHJcbiAqIGh0dHA6Ly93d3cuY29kZXByb2plY3QuY29tL1RpcHMvNDA3MTcyL0Nvbm5lY3RlZC1Db21wb25lbnQtTGFiZWxpbmctYW5kLVZlY3Rvcml6YXRpb25cclxuICovXHJcbnZhciBSYXN0ZXJpemVyID0ge1xyXG4gICAgY3JlYXRlQ29udG91cjJEOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkaXI6IG51bGwsXHJcbiAgICAgICAgICAgIGluZGV4OiBudWxsLFxyXG4gICAgICAgICAgICBmaXJzdFZlcnRleDogbnVsbCxcclxuICAgICAgICAgICAgaW5zaWRlQ29udG91cnM6IG51bGwsXHJcbiAgICAgICAgICAgIG5leHRwZWVyOiBudWxsLFxyXG4gICAgICAgICAgICBwcmV2cGVlcjogbnVsbFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgQ09OVE9VUl9ESVI6IHtcclxuICAgICAgICBDV19ESVI6IDAsXHJcbiAgICAgICAgQ0NXX0RJUjogMSxcclxuICAgICAgICBVTktOT1dOX0RJUjogMlxyXG4gICAgfSxcclxuICAgIERJUjoge1xyXG4gICAgICAgIE9VVFNJREVfRURHRTogLTMyNzY3LFxyXG4gICAgICAgIElOU0lERV9FREdFOiAtMzI3NjZcclxuICAgIH0sXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgbGFiZWxXcmFwcGVyKSB7XHJcbiAgICAgICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgICAgICBsYWJlbERhdGEgPSBsYWJlbFdyYXBwZXIuZGF0YSxcclxuICAgICAgICAgICAgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54LFxyXG4gICAgICAgICAgICBoZWlnaHQgPSBpbWFnZVdyYXBwZXIuc2l6ZS55LFxyXG4gICAgICAgICAgICB0cmFjZXIgPSBUcmFjZXIuY3JlYXRlKGltYWdlV3JhcHBlciwgbGFiZWxXcmFwcGVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmFzdGVyaXplOiBmdW5jdGlvbihkZXB0aGxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29sb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgYmMsXHJcbiAgICAgICAgICAgICAgICAgICAgbGMsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBjeCxcclxuICAgICAgICAgICAgICAgICAgICBjeSxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvck1hcCA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleCxcclxuICAgICAgICAgICAgICAgICAgICBwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvcyxcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0ZWRDb3VudCA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IDQwMDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3JNYXBbaV0gPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbG9yTWFwWzBdID0gaW1hZ2VEYXRhWzBdO1xyXG4gICAgICAgICAgICAgICAgY2MgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZm9yICggY3kgPSAxOyBjeSA8IGhlaWdodCAtIDE7IGN5KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbGluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBiYyA9IGNvbG9yTWFwWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoIGN4ID0gMTsgY3ggPCB3aWR0aCAtIDE7IGN4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0gY3kgKiB3aWR0aCArIGN4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWxEYXRhW3Bvc10gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gaW1hZ2VEYXRhW3Bvc107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IgIT09IGJjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGMgPSBjb25uZWN0ZWRDb3VudCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yTWFwW2xjXSA9IGNvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYyA9IGNvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXggPSB0cmFjZXIuY29udG91clRyYWNpbmcoY3ksIGN4LCBsYywgY29sb3IsIFJhc3Rlcml6ZXIuRElSLk9VVFNJREVfRURHRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2ZXJ0ZXggIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3RlZENvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbGluZGV4ID0gbGM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwID0gUmFzdGVyaXplci5jcmVhdGVDb250b3VyMkQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuZGlyID0gUmFzdGVyaXplci5DT05UT1VSX0RJUi5DV19ESVI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmluZGV4ID0gbGFiZWxpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuZmlyc3RWZXJ0ZXggPSB2ZXJ0ZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLm5leHRwZWVyID0gY2M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmluc2lkZUNvbnRvdXJzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnByZXZwZWVyID0gcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjID0gcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRleCA9IHRyYWNlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvbnRvdXJUcmFjaW5nKGN5LCBjeCwgUmFzdGVyaXplci5ESVIuSU5TSURFX0VER0UsIGNvbG9yLCBsYWJlbGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZlcnRleCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcCA9IFJhc3Rlcml6ZXIuY3JlYXRlQ29udG91cjJEKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmZpcnN0VmVydGV4ID0gdmVydGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5pbnNpZGVDb250b3VycyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVwdGhsYWJlbCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuZGlyID0gUmFzdGVyaXplci5DT05UT1VSX0RJUi5DQ1dfRElSO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmRpciA9IFJhc3Rlcml6ZXIuQ09OVE9VUl9ESVIuQ1dfRElSO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5pbmRleCA9IGRlcHRobGFiZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYyA9IGNjO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKChzYyAhPT0gbnVsbCkgJiYgc2MuaW5kZXggIT09IGxhYmVsaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYyA9IHNjLm5leHRwZWVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5uZXh0cGVlciA9IHNjLmluc2lkZUNvbnRvdXJzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzYy5pbnNpZGVDb250b3VycyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYy5pbnNpZGVDb250b3Vycy5wcmV2cGVlciA9IHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjLmluc2lkZUNvbnRvdXJzID0gcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxEYXRhW3Bvc10gPSBsYWJlbGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxhYmVsRGF0YVtwb3NdID09PSBSYXN0ZXJpemVyLkRJUi5PVVRTSURFX0VER0VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBsYWJlbERhdGFbcG9zXSA9PT0gUmFzdGVyaXplci5ESVIuSU5TSURFX0VER0UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsRGF0YVtwb3NdID09PSBSYXN0ZXJpemVyLkRJUi5JTlNJREVfRURHRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJjID0gaW1hZ2VEYXRhW3Bvc107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJjID0gY29sb3JNYXBbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbGluZGV4ID0gbGFiZWxEYXRhW3Bvc107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYyA9IGNvbG9yTWFwW2xhYmVsaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2MgPSBjYztcclxuICAgICAgICAgICAgICAgIHdoaWxlIChzYyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjLmluZGV4ID0gZGVwdGhsYWJlbDtcclxuICAgICAgICAgICAgICAgICAgICBzYyA9IHNjLm5leHRwZWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBjYzogY2MsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IGNvbm5lY3RlZENvdW50XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZWJ1Zzoge1xyXG4gICAgICAgICAgICAgICAgZHJhd0NvbnRvdXI6IGZ1bmN0aW9uKGNhbnZhcywgZmlyc3RDb250b3VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBxID0gZmlyc3RDb250b3VyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpcSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJyZWRcIjtcclxuICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZWRcIjtcclxuICAgICAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBxICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlxID0gcHEuaW5zaWRlQ29udG91cnM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHBxICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpcSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcSA9IGlxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXEgPSBpcS5uZXh0cGVlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHEgPSBwcTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBxID0gcHEubmV4dHBlZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHEgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcSA9IHBxLmluc2lkZUNvbnRvdXJzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocS5kaXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBSYXN0ZXJpemVyLkNPTlRPVVJfRElSLkNXX0RJUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwicmVkXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBSYXN0ZXJpemVyLkNPTlRPVVJfRElSLkNDV19ESVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsdWVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFJhc3Rlcml6ZXIuQ09OVE9VUl9ESVIuVU5LTk9XTl9ESVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcCA9IHEuZmlyc3RWZXJ0ZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4Lm1vdmVUbyhwLngsIHAueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBwLm5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHgubGluZVRvKHAueCwgcC55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSB3aGlsZSAocCAhPT0gcS5maXJzdFZlcnRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmFzdGVyaXplcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvbG9jYXRvci9yYXN0ZXJpemVyLmpzXG4gKiovIiwiLyoqXHJcbiAqIGh0dHA6Ly93d3cuY29kZXByb2plY3QuY29tL1RpcHMvNDA3MTcyL0Nvbm5lY3RlZC1Db21wb25lbnQtTGFiZWxpbmctYW5kLVZlY3Rvcml6YXRpb25cclxuICovXHJcbnZhciBUcmFjZXIgPSB7XHJcbiAgICBzZWFyY2hEaXJlY3Rpb25zOiBbWzAsIDFdLCBbMSwgMV0sIFsxLCAwXSwgWzEsIC0xXSwgWzAsIC0xXSwgWy0xLCAtMV0sIFstMSwgMF0sIFstMSwgMV1dLFxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGxhYmVsV3JhcHBlcikge1xyXG4gICAgICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICAgICAgbGFiZWxEYXRhID0gbGFiZWxXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgICAgIHNlYXJjaERpcmVjdGlvbnMgPSB0aGlzLnNlYXJjaERpcmVjdGlvbnMsXHJcbiAgICAgICAgICAgIHdpZHRoID0gaW1hZ2VXcmFwcGVyLnNpemUueCxcclxuICAgICAgICAgICAgcG9zO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmFjZShjdXJyZW50LCBjb2xvciwgbGFiZWwsIGVkZ2VsYWJlbCkge1xyXG4gICAgICAgICAgICB2YXIgaSxcclxuICAgICAgICAgICAgICAgIHksXHJcbiAgICAgICAgICAgICAgICB4O1xyXG5cclxuICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHkgPSBjdXJyZW50LmN5ICsgc2VhcmNoRGlyZWN0aW9uc1tjdXJyZW50LmRpcl1bMF07XHJcbiAgICAgICAgICAgICAgICB4ID0gY3VycmVudC5jeCArIHNlYXJjaERpcmVjdGlvbnNbY3VycmVudC5kaXJdWzFdO1xyXG4gICAgICAgICAgICAgICAgcG9zID0geSAqIHdpZHRoICsgeDtcclxuICAgICAgICAgICAgICAgIGlmICgoaW1hZ2VEYXRhW3Bvc10gPT09IGNvbG9yKSAmJiAoKGxhYmVsRGF0YVtwb3NdID09PSAwKSB8fCAobGFiZWxEYXRhW3Bvc10gPT09IGxhYmVsKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbERhdGFbcG9zXSA9IGxhYmVsO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuY3kgPSB5O1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuY3ggPSB4O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWxEYXRhW3Bvc10gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxEYXRhW3Bvc10gPSBlZGdlbGFiZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuZGlyID0gKGN1cnJlbnQuZGlyICsgMSkgJSA4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHZlcnRleDJEKHgsIHksIGRpcikge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZGlyOiBkaXIsXHJcbiAgICAgICAgICAgICAgICB4OiB4LFxyXG4gICAgICAgICAgICAgICAgeTogeSxcclxuICAgICAgICAgICAgICAgIG5leHQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBwcmV2OiBudWxsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjb250b3VyVHJhY2luZyhzeSwgc3gsIGxhYmVsLCBjb2xvciwgZWRnZWxhYmVsKSB7XHJcbiAgICAgICAgICAgIHZhciBGdiA9IG51bGwsXHJcbiAgICAgICAgICAgICAgICBDdixcclxuICAgICAgICAgICAgICAgIFAsXHJcbiAgICAgICAgICAgICAgICBsZGlyLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjeDogc3gsXHJcbiAgICAgICAgICAgICAgICAgICAgY3k6IHN5LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpcjogMFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0cmFjZShjdXJyZW50LCBjb2xvciwgbGFiZWwsIGVkZ2VsYWJlbCkpIHtcclxuICAgICAgICAgICAgICAgIEZ2ID0gdmVydGV4MkQoc3gsIHN5LCBjdXJyZW50LmRpcik7XHJcbiAgICAgICAgICAgICAgICBDdiA9IEZ2O1xyXG4gICAgICAgICAgICAgICAgbGRpciA9IGN1cnJlbnQuZGlyO1xyXG4gICAgICAgICAgICAgICAgUCA9IHZlcnRleDJEKGN1cnJlbnQuY3gsIGN1cnJlbnQuY3ksIDApO1xyXG4gICAgICAgICAgICAgICAgUC5wcmV2ID0gQ3Y7XHJcbiAgICAgICAgICAgICAgICBDdi5uZXh0ID0gUDtcclxuICAgICAgICAgICAgICAgIFAubmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBDdiA9IFA7XHJcbiAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudC5kaXIgPSAoY3VycmVudC5kaXIgKyA2KSAlIDg7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2UoY3VycmVudCwgY29sb3IsIGxhYmVsLCBlZGdlbGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZGlyICE9PSBjdXJyZW50LmRpcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDdi5kaXIgPSBjdXJyZW50LmRpcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUCA9IHZlcnRleDJEKGN1cnJlbnQuY3gsIGN1cnJlbnQuY3ksIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQLnByZXYgPSBDdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ3YubmV4dCA9IFA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFAubmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEN2ID0gUDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDdi5kaXIgPSBsZGlyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDdi54ID0gY3VycmVudC5jeDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ3YueSA9IGN1cnJlbnQuY3k7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxkaXIgPSBjdXJyZW50LmRpcjtcclxuICAgICAgICAgICAgICAgIH0gd2hpbGUgKGN1cnJlbnQuY3ggIT09IHN4IHx8IGN1cnJlbnQuY3kgIT09IHN5KTtcclxuICAgICAgICAgICAgICAgIEZ2LnByZXYgPSBDdi5wcmV2O1xyXG4gICAgICAgICAgICAgICAgQ3YucHJldi5uZXh0ID0gRnY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIEZ2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHJhY2U6IGZ1bmN0aW9uKGN1cnJlbnQsIGNvbG9yLCBsYWJlbCwgZWRnZWxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhY2UoY3VycmVudCwgY29sb3IsIGxhYmVsLCBlZGdlbGFiZWwpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb250b3VyVHJhY2luZzogZnVuY3Rpb24oc3ksIHN4LCBsYWJlbCwgY29sb3IsIGVkZ2VsYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRvdXJUcmFjaW5nKHN5LCBzeCwgbGFiZWwsIGNvbG9yLCBlZGdlbGFiZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChUcmFjZXIpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9sb2NhdG9yL3RyYWNlci5qc1xuICoqLyIsIi8qIEBwcmVzZXJ2ZSBBU00gQkVHSU4gKi9cclxuLyogZXNsaW50LWRpc2FibGUgZXFlcWVxKi9cclxuZnVuY3Rpb24gU2tlbGV0b25pemVyKHN0ZGxpYiwgZm9yZWlnbiwgYnVmZmVyKSB7XHJcbiAgICBcInVzZSBhc21cIjtcclxuXHJcbiAgICB2YXIgaW1hZ2VzID0gbmV3IHN0ZGxpYi5VaW50OEFycmF5KGJ1ZmZlciksXHJcbiAgICAgICAgc2l6ZSA9IGZvcmVpZ24uc2l6ZSB8IDAsXHJcbiAgICAgICAgaW11bCA9IHN0ZGxpYi5NYXRoLmltdWw7XHJcblxyXG4gICAgZnVuY3Rpb24gZXJvZGUoaW5JbWFnZVB0ciwgb3V0SW1hZ2VQdHIpIHtcclxuICAgICAgICBpbkltYWdlUHRyID0gaW5JbWFnZVB0ciB8IDA7XHJcbiAgICAgICAgb3V0SW1hZ2VQdHIgPSBvdXRJbWFnZVB0ciB8IDA7XHJcblxyXG4gICAgICAgIHZhciB2ID0gMCxcclxuICAgICAgICAgICAgdSA9IDAsXHJcbiAgICAgICAgICAgIHN1bSA9IDAsXHJcbiAgICAgICAgICAgIHlTdGFydDEgPSAwLFxyXG4gICAgICAgICAgICB5U3RhcnQyID0gMCxcclxuICAgICAgICAgICAgeFN0YXJ0MSA9IDAsXHJcbiAgICAgICAgICAgIHhTdGFydDIgPSAwLFxyXG4gICAgICAgICAgICBvZmZzZXQgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKCB2ID0gMTsgKHYgfCAwKSA8ICgoc2l6ZSAtIDEpIHwgMCk7IHYgPSAodiArIDEpIHwgMCkge1xyXG4gICAgICAgICAgICBvZmZzZXQgPSAob2Zmc2V0ICsgc2l6ZSkgfCAwO1xyXG4gICAgICAgICAgICBmb3IgKCB1ID0gMTsgKHUgfCAwKSA8ICgoc2l6ZSAtIDEpIHwgMCk7IHUgPSAodSArIDEpIHwgMCkge1xyXG4gICAgICAgICAgICAgICAgeVN0YXJ0MSA9IChvZmZzZXQgLSBzaXplKSB8IDA7XHJcbiAgICAgICAgICAgICAgICB5U3RhcnQyID0gKG9mZnNldCArIHNpemUpIHwgMDtcclxuICAgICAgICAgICAgICAgIHhTdGFydDEgPSAodSAtIDEpIHwgMDtcclxuICAgICAgICAgICAgICAgIHhTdGFydDIgPSAodSArIDEpIHwgMDtcclxuICAgICAgICAgICAgICAgIHN1bSA9ICgoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MSArIHhTdGFydDEpIHwgMF0gfCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDEgKyB4U3RhcnQyKSB8IDBdIHwgMClcclxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyBvZmZzZXQgKyB1KSB8IDBdIHwgMClcclxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQyICsgeFN0YXJ0MSkgfCAwXSB8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MiArIHhTdGFydDIpIHwgMF0gfCAwKSkgfCAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKChzdW0gfCAwKSA9PSAoNSB8IDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIG9mZnNldCArIHUpIHwgMF0gPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZXNbKG91dEltYWdlUHRyICsgb2Zmc2V0ICsgdSkgfCAwXSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN1YnRyYWN0KGFJbWFnZVB0ciwgYkltYWdlUHRyLCBvdXRJbWFnZVB0cikge1xyXG4gICAgICAgIGFJbWFnZVB0ciA9IGFJbWFnZVB0ciB8IDA7XHJcbiAgICAgICAgYkltYWdlUHRyID0gYkltYWdlUHRyIHwgMDtcclxuICAgICAgICBvdXRJbWFnZVB0ciA9IG91dEltYWdlUHRyIHwgMDtcclxuXHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIGxlbmd0aCA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xyXG5cclxuICAgICAgICB3aGlsZSAoKGxlbmd0aCB8IDApID4gMCkge1xyXG4gICAgICAgICAgICBsZW5ndGggPSAobGVuZ3RoIC0gMSkgfCAwO1xyXG4gICAgICAgICAgICBpbWFnZXNbKG91dEltYWdlUHRyICsgbGVuZ3RoKSB8IDBdID1cclxuICAgICAgICAgICAgICAgICgoaW1hZ2VzWyhhSW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKSAtIChpbWFnZXNbKGJJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSB8IDApKSB8IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGJpdHdpc2VPcihhSW1hZ2VQdHIsIGJJbWFnZVB0ciwgb3V0SW1hZ2VQdHIpIHtcclxuICAgICAgICBhSW1hZ2VQdHIgPSBhSW1hZ2VQdHIgfCAwO1xyXG4gICAgICAgIGJJbWFnZVB0ciA9IGJJbWFnZVB0ciB8IDA7XHJcbiAgICAgICAgb3V0SW1hZ2VQdHIgPSBvdXRJbWFnZVB0ciB8IDA7XHJcblxyXG4gICAgICAgIHZhciBsZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBsZW5ndGggPSBpbXVsKHNpemUsIHNpemUpIHwgMDtcclxuXHJcbiAgICAgICAgd2hpbGUgKChsZW5ndGggfCAwKSA+IDApIHtcclxuICAgICAgICAgICAgbGVuZ3RoID0gKGxlbmd0aCAtIDEpIHwgMDtcclxuICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSA9XHJcbiAgICAgICAgICAgICAgICAoKGltYWdlc1soYUltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCkgfCAoaW1hZ2VzWyhiSW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKSkgfCAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb3VudE5vblplcm8oaW1hZ2VQdHIpIHtcclxuICAgICAgICBpbWFnZVB0ciA9IGltYWdlUHRyIHwgMDtcclxuXHJcbiAgICAgICAgdmFyIHN1bSA9IDAsXHJcbiAgICAgICAgICAgIGxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIGxlbmd0aCA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xyXG5cclxuICAgICAgICB3aGlsZSAoKGxlbmd0aCB8IDApID4gMCkge1xyXG4gICAgICAgICAgICBsZW5ndGggPSAobGVuZ3RoIC0gMSkgfCAwO1xyXG4gICAgICAgICAgICBzdW0gPSAoKHN1bSB8IDApICsgKGltYWdlc1soaW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKSkgfCAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChzdW0gfCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KGltYWdlUHRyLCB2YWx1ZSkge1xyXG4gICAgICAgIGltYWdlUHRyID0gaW1hZ2VQdHIgfCAwO1xyXG4gICAgICAgIHZhbHVlID0gdmFsdWUgfCAwO1xyXG5cclxuICAgICAgICB2YXIgbGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgbGVuZ3RoID0gaW11bChzaXplLCBzaXplKSB8IDA7XHJcblxyXG4gICAgICAgIHdoaWxlICgobGVuZ3RoIHwgMCkgPiAwKSB7XHJcbiAgICAgICAgICAgIGxlbmd0aCA9IChsZW5ndGggLSAxKSB8IDA7XHJcbiAgICAgICAgICAgIGltYWdlc1soaW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGlsYXRlKGluSW1hZ2VQdHIsIG91dEltYWdlUHRyKSB7XHJcbiAgICAgICAgaW5JbWFnZVB0ciA9IGluSW1hZ2VQdHIgfCAwO1xyXG4gICAgICAgIG91dEltYWdlUHRyID0gb3V0SW1hZ2VQdHIgfCAwO1xyXG5cclxuICAgICAgICB2YXIgdiA9IDAsXHJcbiAgICAgICAgICAgIHUgPSAwLFxyXG4gICAgICAgICAgICBzdW0gPSAwLFxyXG4gICAgICAgICAgICB5U3RhcnQxID0gMCxcclxuICAgICAgICAgICAgeVN0YXJ0MiA9IDAsXHJcbiAgICAgICAgICAgIHhTdGFydDEgPSAwLFxyXG4gICAgICAgICAgICB4U3RhcnQyID0gMCxcclxuICAgICAgICAgICAgb2Zmc2V0ID0gMDtcclxuXHJcbiAgICAgICAgZm9yICggdiA9IDE7ICh2IHwgMCkgPCAoKHNpemUgLSAxKSB8IDApOyB2ID0gKHYgKyAxKSB8IDApIHtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gKG9mZnNldCArIHNpemUpIHwgMDtcclxuICAgICAgICAgICAgZm9yICggdSA9IDE7ICh1IHwgMCkgPCAoKHNpemUgLSAxKSB8IDApOyB1ID0gKHUgKyAxKSB8IDApIHtcclxuICAgICAgICAgICAgICAgIHlTdGFydDEgPSAob2Zmc2V0IC0gc2l6ZSkgfCAwO1xyXG4gICAgICAgICAgICAgICAgeVN0YXJ0MiA9IChvZmZzZXQgKyBzaXplKSB8IDA7XHJcbiAgICAgICAgICAgICAgICB4U3RhcnQxID0gKHUgLSAxKSB8IDA7XHJcbiAgICAgICAgICAgICAgICB4U3RhcnQyID0gKHUgKyAxKSB8IDA7XHJcbiAgICAgICAgICAgICAgICBzdW0gPSAoKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDEgKyB4U3RhcnQxKSB8IDBdIHwgMClcclxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQxICsgeFN0YXJ0MikgfCAwXSB8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgb2Zmc2V0ICsgdSkgfCAwXSB8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MiArIHhTdGFydDEpIHwgMF0gfCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDIgKyB4U3RhcnQyKSB8IDBdIHwgMCkpIHwgMDtcclxuICAgICAgICAgICAgICAgIGlmICgoc3VtIHwgMCkgPiAoMCB8IDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIG9mZnNldCArIHUpIHwgMF0gPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZXNbKG91dEltYWdlUHRyICsgb2Zmc2V0ICsgdSkgfCAwXSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1lbWNweShzcmNJbWFnZVB0ciwgZHN0SW1hZ2VQdHIpIHtcclxuICAgICAgICBzcmNJbWFnZVB0ciA9IHNyY0ltYWdlUHRyIHwgMDtcclxuICAgICAgICBkc3RJbWFnZVB0ciA9IGRzdEltYWdlUHRyIHwgMDtcclxuXHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIGxlbmd0aCA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xyXG5cclxuICAgICAgICB3aGlsZSAoKGxlbmd0aCB8IDApID4gMCkge1xyXG4gICAgICAgICAgICBsZW5ndGggPSAobGVuZ3RoIC0gMSkgfCAwO1xyXG4gICAgICAgICAgICBpbWFnZXNbKGRzdEltYWdlUHRyICsgbGVuZ3RoKSB8IDBdID0gKGltYWdlc1soc3JjSW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gemVyb0JvcmRlcihpbWFnZVB0cikge1xyXG4gICAgICAgIGltYWdlUHRyID0gaW1hZ2VQdHIgfCAwO1xyXG5cclxuICAgICAgICB2YXIgeCA9IDAsXHJcbiAgICAgICAgICAgIHkgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKCB4ID0gMDsgKHggfCAwKSA8ICgoc2l6ZSAtIDEpIHwgMCk7IHggPSAoeCArIDEpIHwgMCkge1xyXG4gICAgICAgICAgICBpbWFnZXNbKGltYWdlUHRyICsgeCkgfCAwXSA9IDA7XHJcbiAgICAgICAgICAgIGltYWdlc1soaW1hZ2VQdHIgKyB5KSB8IDBdID0gMDtcclxuICAgICAgICAgICAgeSA9ICgoeSArIHNpemUpIC0gMSkgfCAwO1xyXG4gICAgICAgICAgICBpbWFnZXNbKGltYWdlUHRyICsgeSkgfCAwXSA9IDA7XHJcbiAgICAgICAgICAgIHkgPSAoeSArIDEpIHwgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICggeCA9IDA7ICh4IHwgMCkgPCAoc2l6ZSB8IDApOyB4ID0gKHggKyAxKSB8IDApIHtcclxuICAgICAgICAgICAgaW1hZ2VzWyhpbWFnZVB0ciArIHkpIHwgMF0gPSAwO1xyXG4gICAgICAgICAgICB5ID0gKHkgKyAxKSB8IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNrZWxldG9uaXplKCkge1xyXG4gICAgICAgIHZhciBzdWJJbWFnZVB0ciA9IDAsXHJcbiAgICAgICAgICAgIGVyb2RlZEltYWdlUHRyID0gMCxcclxuICAgICAgICAgICAgdGVtcEltYWdlUHRyID0gMCxcclxuICAgICAgICAgICAgc2tlbEltYWdlUHRyID0gMCxcclxuICAgICAgICAgICAgc3VtID0gMCxcclxuICAgICAgICAgICAgZG9uZSA9IDA7XHJcblxyXG4gICAgICAgIGVyb2RlZEltYWdlUHRyID0gaW11bChzaXplLCBzaXplKSB8IDA7XHJcbiAgICAgICAgdGVtcEltYWdlUHRyID0gKGVyb2RlZEltYWdlUHRyICsgZXJvZGVkSW1hZ2VQdHIpIHwgMDtcclxuICAgICAgICBza2VsSW1hZ2VQdHIgPSAodGVtcEltYWdlUHRyICsgZXJvZGVkSW1hZ2VQdHIpIHwgMDtcclxuXHJcbiAgICAgICAgLy8gaW5pdCBza2VsLWltYWdlXHJcbiAgICAgICAgaW5pdChza2VsSW1hZ2VQdHIsIDApO1xyXG4gICAgICAgIHplcm9Cb3JkZXIoc3ViSW1hZ2VQdHIpO1xyXG5cclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIGVyb2RlKHN1YkltYWdlUHRyLCBlcm9kZWRJbWFnZVB0cik7XHJcbiAgICAgICAgICAgIGRpbGF0ZShlcm9kZWRJbWFnZVB0ciwgdGVtcEltYWdlUHRyKTtcclxuICAgICAgICAgICAgc3VidHJhY3Qoc3ViSW1hZ2VQdHIsIHRlbXBJbWFnZVB0ciwgdGVtcEltYWdlUHRyKTtcclxuICAgICAgICAgICAgYml0d2lzZU9yKHNrZWxJbWFnZVB0ciwgdGVtcEltYWdlUHRyLCBza2VsSW1hZ2VQdHIpO1xyXG4gICAgICAgICAgICBtZW1jcHkoZXJvZGVkSW1hZ2VQdHIsIHN1YkltYWdlUHRyKTtcclxuICAgICAgICAgICAgc3VtID0gY291bnROb25aZXJvKHN1YkltYWdlUHRyKSB8IDA7XHJcbiAgICAgICAgICAgIGRvbmUgPSAoKHN1bSB8IDApID09IDAgfCAwKTtcclxuICAgICAgICB9IHdoaWxlICghZG9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBza2VsZXRvbml6ZTogc2tlbGV0b25pemVcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNrZWxldG9uaXplcjtcclxuLyogZXNsaW50LWVuYWJsZSBlcWVxZXEqL1xyXG4vKiBAcHJlc2VydmUgQVNNIEVORCAqL1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9sb2NhdG9yL3NrZWxldG9uaXplci5qc1xuICoqLyIsImltcG9ydCBCcmVzZW5oYW0gZnJvbSAnLi9icmVzZW5oYW0nO1xyXG5pbXBvcnQgSW1hZ2VEZWJ1ZyBmcm9tICcuLi9jb21tb24vaW1hZ2VfZGVidWcnO1xyXG5pbXBvcnQgQ29kZTEyOFJlYWRlciBmcm9tICcuLi9yZWFkZXIvY29kZV8xMjhfcmVhZGVyJztcclxuaW1wb3J0IEVBTlJlYWRlciBmcm9tICcuLi9yZWFkZXIvZWFuX3JlYWRlcic7XHJcbmltcG9ydCBDb2RlMzlSZWFkZXIgZnJvbSAnLi4vcmVhZGVyL2NvZGVfMzlfcmVhZGVyJztcclxuaW1wb3J0IENvZGUzOVZJTlJlYWRlciBmcm9tICcuLi9yZWFkZXIvY29kZV8zOV92aW5fcmVhZGVyJztcclxuaW1wb3J0IENvZGFiYXJSZWFkZXIgZnJvbSAnLi4vcmVhZGVyL2NvZGFiYXJfcmVhZGVyJztcclxuaW1wb3J0IFVQQ1JlYWRlciBmcm9tICcuLi9yZWFkZXIvdXBjX3JlYWRlcic7XHJcbmltcG9ydCBFQU44UmVhZGVyIGZyb20gJy4uL3JlYWRlci9lYW5fOF9yZWFkZXInO1xyXG5pbXBvcnQgVVBDRVJlYWRlciBmcm9tICcuLi9yZWFkZXIvdXBjX2VfcmVhZGVyJztcclxuaW1wb3J0IEkyb2Y1UmVhZGVyIGZyb20gJy4uL3JlYWRlci9pMm9mNV9yZWFkZXInO1xyXG5cclxuY29uc3QgUkVBREVSUyA9IHtcclxuICAgIGNvZGVfMTI4X3JlYWRlcjogQ29kZTEyOFJlYWRlcixcclxuICAgIGVhbl9yZWFkZXI6IEVBTlJlYWRlcixcclxuICAgIGVhbl84X3JlYWRlcjogRUFOOFJlYWRlcixcclxuICAgIGNvZGVfMzlfcmVhZGVyOiBDb2RlMzlSZWFkZXIsXHJcbiAgICBjb2RlXzM5X3Zpbl9yZWFkZXI6IENvZGUzOVZJTlJlYWRlcixcclxuICAgIGNvZGFiYXJfcmVhZGVyOiBDb2RhYmFyUmVhZGVyLFxyXG4gICAgdXBjX3JlYWRlcjogVVBDUmVhZGVyLFxyXG4gICAgdXBjX2VfcmVhZGVyOiBVUENFUmVhZGVyLFxyXG4gICAgaTJvZjVfcmVhZGVyOiBJMm9mNVJlYWRlclxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGNvbmZpZywgaW5wdXRJbWFnZVdyYXBwZXIpIHtcclxuICAgICAgICB2YXIgX2NhbnZhcyA9IHtcclxuICAgICAgICAgICAgICAgIGN0eDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IG51bGxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkb206IHtcclxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiBudWxsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF9iYXJjb2RlUmVhZGVycyA9IFtdO1xyXG5cclxuICAgICAgICBpbml0Q2FudmFzKCk7XHJcbiAgICAgICAgaW5pdFJlYWRlcnMoKTtcclxuICAgICAgICBpbml0Q29uZmlnKCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRDYW52YXMoKSB7XHJcbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgdmFyICRkZWJ1ZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVidWcuZGV0ZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgX2NhbnZhcy5kb20uZnJlcXVlbmN5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhcy5mcmVxdWVuY3lcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV9jYW52YXMuZG9tLmZyZXF1ZW5jeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9jYW52YXMuZG9tLmZyZXF1ZW5jeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgX2NhbnZhcy5kb20uZnJlcXVlbmN5LmNsYXNzTmFtZSA9IFwiZnJlcXVlbmN5XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRkZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZGVidWcuYXBwZW5kQ2hpbGQoX2NhbnZhcy5kb20uZnJlcXVlbmN5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfY2FudmFzLmN0eC5mcmVxdWVuY3kgPSBfY2FudmFzLmRvbS5mcmVxdWVuY3kuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIF9jYW52YXMuZG9tLnBhdHRlcm4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzLnBhdHRlcm5CdWZmZXJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV9jYW52YXMuZG9tLnBhdHRlcm4pIHtcclxuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5wYXR0ZXJuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5wYXR0ZXJuLmNsYXNzTmFtZSA9IFwicGF0dGVybkJ1ZmZlclwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkZGVidWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGRlYnVnLmFwcGVuZENoaWxkKF9jYW52YXMuZG9tLnBhdHRlcm4pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF9jYW52YXMuY3R4LnBhdHRlcm4gPSBfY2FudmFzLmRvbS5wYXR0ZXJuLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5vdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhcy5kcmF3aW5nQnVmZmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF9jYW52YXMuZG9tLm92ZXJsYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmN0eC5vdmVybGF5ID0gX2NhbnZhcy5kb20ub3ZlcmxheS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRSZWFkZXJzKCkge1xyXG4gICAgICAgICAgICBjb25maWcucmVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHJlYWRlckNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlYWRlcixcclxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZWFkZXJDb25maWcgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyID0gcmVhZGVyQ29uZmlnLmZvcm1hdDtcclxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uID0gcmVhZGVyQ29uZmlnLmNvbmZpZztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlYWRlckNvbmZpZyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWFkZXIgPSByZWFkZXJDb25maWc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJCZWZvcmUgcmVnaXN0ZXJpbmcgcmVhZGVyOiBcIiwgcmVhZGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF9iYXJjb2RlUmVhZGVycy5wdXNoKG5ldyBSRUFERVJTW3JlYWRlcl0oY29uZmlndXJhdGlvbikpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWdpc3RlcmVkIFJlYWRlcnM6IFwiICsgX2JhcmNvZGVSZWFkZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgocmVhZGVyKSA9PiBKU09OLnN0cmluZ2lmeSh7Zm9ybWF0OiByZWFkZXIuRk9STUFULCBjb25maWc6IHJlYWRlci5jb25maWd9KSlcclxuICAgICAgICAgICAgICAgICAgICAuam9pbignLCAnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRDb25maWcoKSB7XHJcbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGksXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzID0gW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZTogX2NhbnZhcy5kb20uZnJlcXVlbmN5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBjb25maWcuZGVidWcuc2hvd0ZyZXF1ZW5jeVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZTogX2NhbnZhcy5kb20ucGF0dGVybixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogY29uZmlnLmRlYnVnLnNob3dQYXR0ZXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfV07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHZpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNbaV0ucHJvcCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNbaV0ubm9kZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc1tpXS5ub2RlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGV4dGVuZCB0aGUgbGluZSBvbiBib3RoIGVuZHNcclxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBsaW5lXHJcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGFuZ2xlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RXh0ZW5kZWRMaW5lKGxpbmUsIGFuZ2xlLCBleHQpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZXh0ZW5kTGluZShhbW91bnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBleHRlbnNpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeTogYW1vdW50ICogTWF0aC5zaW4oYW5nbGUpLFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IGFtb3VudCAqIE1hdGguY29zKGFuZ2xlKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBsaW5lWzBdLnkgLT0gZXh0ZW5zaW9uLnk7XHJcbiAgICAgICAgICAgICAgICBsaW5lWzBdLnggLT0gZXh0ZW5zaW9uLng7XHJcbiAgICAgICAgICAgICAgICBsaW5lWzFdLnkgKz0gZXh0ZW5zaW9uLnk7XHJcbiAgICAgICAgICAgICAgICBsaW5lWzFdLnggKz0gZXh0ZW5zaW9uLng7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGluc2lkZSBpbWFnZVxyXG4gICAgICAgICAgICBleHRlbmRMaW5lKGV4dCk7XHJcbiAgICAgICAgICAgIHdoaWxlIChleHQgPiAxICYmICghaW5wdXRJbWFnZVdyYXBwZXIuaW5JbWFnZVdpdGhCb3JkZXIobGluZVswXSwgMClcclxuICAgICAgICAgICAgICAgICAgICB8fCAhaW5wdXRJbWFnZVdyYXBwZXIuaW5JbWFnZVdpdGhCb3JkZXIobGluZVsxXSwgMCkpKSB7XHJcbiAgICAgICAgICAgICAgICBleHQgLT0gTWF0aC5jZWlsKGV4dCAvIDIpO1xyXG4gICAgICAgICAgICAgICAgZXh0ZW5kTGluZSgtZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbGluZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldExpbmUoYm94KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbe1xyXG4gICAgICAgICAgICAgICAgeDogKGJveFsxXVswXSAtIGJveFswXVswXSkgLyAyICsgYm94WzBdWzBdLFxyXG4gICAgICAgICAgICAgICAgeTogKGJveFsxXVsxXSAtIGJveFswXVsxXSkgLyAyICsgYm94WzBdWzFdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHg6IChib3hbM11bMF0gLSBib3hbMl1bMF0pIC8gMiArIGJveFsyXVswXSxcclxuICAgICAgICAgICAgICAgIHk6IChib3hbM11bMV0gLSBib3hbMl1bMV0pIC8gMiArIGJveFsyXVsxXVxyXG4gICAgICAgICAgICB9XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRyeURlY29kZShsaW5lKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBudWxsLFxyXG4gICAgICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgICAgIGJhcmNvZGVMaW5lID0gQnJlc2VuaGFtLmdldEJhcmNvZGVMaW5lKGlucHV0SW1hZ2VXcmFwcGVyLCBsaW5lWzBdLCBsaW5lWzFdKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgY29uZmlnLmRlYnVnLnNob3dGcmVxdWVuY3kpIHtcclxuICAgICAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgobGluZSwge3g6ICd4JywgeTogJ3knfSwgX2NhbnZhcy5jdHgub3ZlcmxheSwge2NvbG9yOiAncmVkJywgbGluZVdpZHRoOiAzfSk7XHJcbiAgICAgICAgICAgICAgICBCcmVzZW5oYW0uZGVidWcucHJpbnRGcmVxdWVuY3koYmFyY29kZUxpbmUubGluZSwgX2NhbnZhcy5kb20uZnJlcXVlbmN5KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgQnJlc2VuaGFtLnRvQmluYXJ5TGluZShiYXJjb2RlTGluZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIGNvbmZpZy5kZWJ1Zy5zaG93UGF0dGVybikge1xyXG4gICAgICAgICAgICAgICAgQnJlc2VuaGFtLmRlYnVnLnByaW50UGF0dGVybihiYXJjb2RlTGluZS5saW5lLCBfY2FudmFzLmRvbS5wYXR0ZXJuKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCBfYmFyY29kZVJlYWRlcnMubGVuZ3RoICYmIHJlc3VsdCA9PT0gbnVsbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBfYmFyY29kZVJlYWRlcnNbaV0uZGVjb2RlUGF0dGVybihiYXJjb2RlTGluZS5saW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBjb2RlUmVzdWx0OiByZXN1bHQsXHJcbiAgICAgICAgICAgICAgICBiYXJjb2RlTGluZTogYmFyY29kZUxpbmVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoaXMgbWV0aG9kIHNsaWNlcyB0aGUgZ2l2ZW4gYXJlYSBhcGFydCBhbmQgdHJpZXMgdG8gZGV0ZWN0IGEgYmFyY29kZS1wYXR0ZXJuXHJcbiAgICAgICAgICogZm9yIGVhY2ggc2xpY2UuIEl0IHJldHVybnMgdGhlIGRlY29kZWQgYmFyY29kZSwgb3IgbnVsbCBpZiBub3RoaW5nIHdhcyBmb3VuZFxyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGJveFxyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpbmVcclxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gbGluZUFuZ2xlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdHJ5RGVjb2RlQnJ1dGVGb3JjZShib3gsIGxpbmUsIGxpbmVBbmdsZSkge1xyXG4gICAgICAgICAgICB2YXIgc2lkZUxlbmd0aCA9IE1hdGguc3FydChNYXRoLnBvdyhib3hbMV1bMF0gLSBib3hbMF1bMF0sIDIpICsgTWF0aC5wb3coKGJveFsxXVsxXSAtIGJveFswXVsxXSksIDIpKSxcclxuICAgICAgICAgICAgICAgIGksXHJcbiAgICAgICAgICAgICAgICBzbGljZXMgPSAxNixcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG51bGwsXHJcbiAgICAgICAgICAgICAgICBkaXIsXHJcbiAgICAgICAgICAgICAgICBleHRlbnNpb24sXHJcbiAgICAgICAgICAgICAgICB4ZGlyID0gTWF0aC5zaW4obGluZUFuZ2xlKSxcclxuICAgICAgICAgICAgICAgIHlkaXIgPSBNYXRoLmNvcyhsaW5lQW5nbGUpO1xyXG5cclxuICAgICAgICAgICAgZm9yICggaSA9IDE7IGkgPCBzbGljZXMgJiYgcmVzdWx0ID09PSBudWxsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vIG1vdmUgbGluZSBwZXJwZW5kaWN1bGFyIHRvIGFuZ2xlXHJcbiAgICAgICAgICAgICAgICBkaXIgPSBzaWRlTGVuZ3RoIC8gc2xpY2VzICogaSAqIChpICUgMiA9PT0gMCA/IC0xIDogMSk7XHJcbiAgICAgICAgICAgICAgICBleHRlbnNpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeTogZGlyICogeGRpcixcclxuICAgICAgICAgICAgICAgICAgICB4OiBkaXIgKiB5ZGlyXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbGluZVswXS55ICs9IGV4dGVuc2lvbi54O1xyXG4gICAgICAgICAgICAgICAgbGluZVswXS54IC09IGV4dGVuc2lvbi55O1xyXG4gICAgICAgICAgICAgICAgbGluZVsxXS55ICs9IGV4dGVuc2lvbi54O1xyXG4gICAgICAgICAgICAgICAgbGluZVsxXS54IC09IGV4dGVuc2lvbi55O1xyXG5cclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRyeURlY29kZShsaW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0TGluZUxlbmd0aChsaW5lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQoXHJcbiAgICAgICAgICAgICAgICBNYXRoLnBvdyhNYXRoLmFicyhsaW5lWzFdLnkgLSBsaW5lWzBdLnkpLCAyKSArXHJcbiAgICAgICAgICAgICAgICBNYXRoLnBvdyhNYXRoLmFicyhsaW5lWzFdLnggLSBsaW5lWzBdLngpLCAyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBXaXRoIHRoZSBoZWxwIG9mIHRoZSBjb25maWd1cmVkIHJlYWRlcnMgKENvZGUxMjggb3IgRUFOKSB0aGlzIGZ1bmN0aW9uIHRyaWVzIHRvIGRldGVjdCBhXHJcbiAgICAgICAgICogdmFsaWQgYmFyY29kZSBwYXR0ZXJuIHdpdGhpbiB0aGUgZ2l2ZW4gYXJlYS5cclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gYm94IFRoZSBhcmVhIHRvIHNlYXJjaCBpblxyXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSByZXN1bHQge2NvZGVSZXN1bHQsIGxpbmUsIGFuZ2xlLCBwYXR0ZXJuLCB0aHJlc2hvbGR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZGVjb2RlRnJvbUJvdW5kaW5nQm94KGJveCkge1xyXG4gICAgICAgICAgICB2YXIgbGluZSxcclxuICAgICAgICAgICAgICAgIGxpbmVBbmdsZSxcclxuICAgICAgICAgICAgICAgIGN0eCA9IF9jYW52YXMuY3R4Lm92ZXJsYXksXHJcbiAgICAgICAgICAgICAgICByZXN1bHQsXHJcbiAgICAgICAgICAgICAgICBsaW5lTGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5kZWJ1Zy5kcmF3Qm91bmRpbmdCb3ggJiYgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UGF0aChib3gsIHt4OiAwLCB5OiAxfSwgY3R4LCB7Y29sb3I6IFwiYmx1ZVwiLCBsaW5lV2lkdGg6IDJ9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGluZSA9IGdldExpbmUoYm94KTtcclxuICAgICAgICAgICAgbGluZUxlbmd0aCA9IGdldExpbmVMZW5ndGgobGluZSk7XHJcbiAgICAgICAgICAgIGxpbmVBbmdsZSA9IE1hdGguYXRhbjIobGluZVsxXS55IC0gbGluZVswXS55LCBsaW5lWzFdLnggLSBsaW5lWzBdLngpO1xyXG4gICAgICAgICAgICBsaW5lID0gZ2V0RXh0ZW5kZWRMaW5lKGxpbmUsIGxpbmVBbmdsZSwgTWF0aC5mbG9vcihsaW5lTGVuZ3RoICogMC4xKSk7XHJcbiAgICAgICAgICAgIGlmIChsaW5lID09PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXN1bHQgPSB0cnlEZWNvZGUobGluZSk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRyeURlY29kZUJydXRlRm9yY2UoYm94LCBsaW5lLCBsaW5lQW5nbGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiByZXN1bHQgJiYgY29uZmlnLmRlYnVnLmRyYXdTY2FubGluZSAmJiBjdHgpIHtcclxuICAgICAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgobGluZSwge3g6ICd4JywgeTogJ3knfSwgY3R4LCB7Y29sb3I6ICdyZWQnLCBsaW5lV2lkdGg6IDN9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGNvZGVSZXN1bHQ6IHJlc3VsdC5jb2RlUmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgbGluZTogbGluZSxcclxuICAgICAgICAgICAgICAgIGFuZ2xlOiBsaW5lQW5nbGUsXHJcbiAgICAgICAgICAgICAgICBwYXR0ZXJuOiByZXN1bHQuYmFyY29kZUxpbmUubGluZSxcclxuICAgICAgICAgICAgICAgIHRocmVzaG9sZDogcmVzdWx0LmJhcmNvZGVMaW5lLnRocmVzaG9sZFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGVjb2RlRnJvbUJvdW5kaW5nQm94OiBmdW5jdGlvbihib3gpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGVGcm9tQm91bmRpbmdCb3goYm94KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVjb2RlRnJvbUJvdW5kaW5nQm94ZXM6IGZ1bmN0aW9uKGJveGVzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaSwgcmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgICAgIGJhcmNvZGVzID0gW10sXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGUgPSBjb25maWcubXVsdGlwbGU7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCBib3hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJveCA9IGJveGVzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRlY29kZUZyb21Cb3VuZGluZ0JveChib3gpIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ib3ggPSBib3g7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXJjb2Rlcy5wdXNoKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQuY29kZVJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXJjb2Rlc1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldFJlYWRlcnM6IGZ1bmN0aW9uKHJlYWRlcnMpIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5yZWFkZXJzID0gcmVhZGVycztcclxuICAgICAgICAgICAgICAgIF9iYXJjb2RlUmVhZGVycy5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgaW5pdFJlYWRlcnMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2RlY29kZXIvYmFyY29kZV9kZWNvZGVyLmpzXG4gKiovIiwiaW1wb3J0IENWVXRpbHMgZnJvbSAnLi4vY29tbW9uL2N2X3V0aWxzJztcclxuaW1wb3J0IEltYWdlV3JhcHBlciBmcm9tICcuLi9jb21tb24vaW1hZ2Vfd3JhcHBlcic7XHJcblxyXG52YXIgQnJlc2VuaGFtID0ge307XHJcblxyXG52YXIgU2xvcGUgPSB7XHJcbiAgICBESVI6IHtcclxuICAgICAgICBVUDogMSxcclxuICAgICAgICBET1dOOiAtMVxyXG4gICAgfVxyXG59O1xyXG4vKipcclxuICogU2NhbnMgYSBsaW5lIG9mIHRoZSBnaXZlbiBpbWFnZSBmcm9tIHBvaW50IHAxIHRvIHAyIGFuZCByZXR1cm5zIGEgcmVzdWx0IG9iamVjdCBjb250YWluaW5nXHJcbiAqIGdyYXktc2NhbGUgdmFsdWVzICgwLTI1NSkgb2YgdGhlIHVuZGVybHlpbmcgcGl4ZWxzIGluIGFkZGl0aW9uIHRvIHRoZSBtaW5cclxuICogYW5kIG1heCB2YWx1ZXMuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbWFnZVdyYXBwZXJcclxuICogQHBhcmFtIHtPYmplY3R9IHAxIFRoZSBzdGFydCBwb2ludCB7eCx5fVxyXG4gKiBAcGFyYW0ge09iamVjdH0gcDIgVGhlIGVuZCBwb2ludCB7eCx5fVxyXG4gKiBAcmV0dXJucyB7bGluZSwgbWluLCBtYXh9XHJcbiAqL1xyXG5CcmVzZW5oYW0uZ2V0QmFyY29kZUxpbmUgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIHAxLCBwMikge1xyXG4gICAgdmFyIHgwID0gcDEueCB8IDAsXHJcbiAgICAgICAgeTAgPSBwMS55IHwgMCxcclxuICAgICAgICB4MSA9IHAyLnggfCAwLFxyXG4gICAgICAgIHkxID0gcDIueSB8IDAsXHJcbiAgICAgICAgc3RlZXAgPSBNYXRoLmFicyh5MSAtIHkwKSA+IE1hdGguYWJzKHgxIC0geDApLFxyXG4gICAgICAgIGRlbHRheCxcclxuICAgICAgICBkZWx0YXksXHJcbiAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgeXN0ZXAsXHJcbiAgICAgICAgeSxcclxuICAgICAgICB0bXAsXHJcbiAgICAgICAgeCxcclxuICAgICAgICBsaW5lID0gW10sXHJcbiAgICAgICAgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54LFxyXG4gICAgICAgIHN1bSA9IDAsXHJcbiAgICAgICAgdmFsLFxyXG4gICAgICAgIG1pbiA9IDI1NSxcclxuICAgICAgICBtYXggPSAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlYWQoYSwgYikge1xyXG4gICAgICAgIHZhbCA9IGltYWdlRGF0YVtiICogd2lkdGggKyBhXTtcclxuICAgICAgICBzdW0gKz0gdmFsO1xyXG4gICAgICAgIG1pbiA9IHZhbCA8IG1pbiA/IHZhbCA6IG1pbjtcclxuICAgICAgICBtYXggPSB2YWwgPiBtYXggPyB2YWwgOiBtYXg7XHJcbiAgICAgICAgbGluZS5wdXNoKHZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN0ZWVwKSB7XHJcbiAgICAgICAgdG1wID0geDA7XHJcbiAgICAgICAgeDAgPSB5MDtcclxuICAgICAgICB5MCA9IHRtcDtcclxuXHJcbiAgICAgICAgdG1wID0geDE7XHJcbiAgICAgICAgeDEgPSB5MTtcclxuICAgICAgICB5MSA9IHRtcDtcclxuICAgIH1cclxuICAgIGlmICh4MCA+IHgxKSB7XHJcbiAgICAgICAgdG1wID0geDA7XHJcbiAgICAgICAgeDAgPSB4MTtcclxuICAgICAgICB4MSA9IHRtcDtcclxuXHJcbiAgICAgICAgdG1wID0geTA7XHJcbiAgICAgICAgeTAgPSB5MTtcclxuICAgICAgICB5MSA9IHRtcDtcclxuICAgIH1cclxuICAgIGRlbHRheCA9IHgxIC0geDA7XHJcbiAgICBkZWx0YXkgPSBNYXRoLmFicyh5MSAtIHkwKTtcclxuICAgIGVycm9yID0gKGRlbHRheCAvIDIpIHwgMDtcclxuICAgIHkgPSB5MDtcclxuICAgIHlzdGVwID0geTAgPCB5MSA/IDEgOiAtMTtcclxuICAgIGZvciAoIHggPSB4MDsgeCA8IHgxOyB4KyspIHtcclxuICAgICAgICBpZiAoc3RlZXApe1xyXG4gICAgICAgICAgICByZWFkKHksIHgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlYWQoeCwgeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVycm9yID0gZXJyb3IgLSBkZWx0YXk7XHJcbiAgICAgICAgaWYgKGVycm9yIDwgMCkge1xyXG4gICAgICAgICAgICB5ID0geSArIHlzdGVwO1xyXG4gICAgICAgICAgICBlcnJvciA9IGVycm9yICsgZGVsdGF4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxpbmU6IGxpbmUsXHJcbiAgICAgICAgbWluOiBtaW4sXHJcbiAgICAgICAgbWF4OiBtYXhcclxuICAgIH07XHJcbn07XHJcblxyXG5CcmVzZW5oYW0udG9PdHN1QmluYXJ5TGluZSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgdmFyIGxpbmUgPSByZXN1bHQubGluZSxcclxuICAgICAgICBpbWFnZSA9IG5ldyBJbWFnZVdyYXBwZXIoe3g6IGxpbmUubGVuZ3RoIC0gMSwgeTogMX0sIGxpbmUpLFxyXG4gICAgICAgIHRocmVzaG9sZCA9IENWVXRpbHMuZGV0ZXJtaW5lT3RzdVRocmVzaG9sZChpbWFnZSwgNSk7XHJcblxyXG4gICAgbGluZSA9IENWVXRpbHMuc2hhcnBlbkxpbmUobGluZSk7XHJcbiAgICBDVlV0aWxzLnRocmVzaG9sZEltYWdlKGltYWdlLCB0aHJlc2hvbGQpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbGluZTogbGluZSxcclxuICAgICAgICB0aHJlc2hvbGQ6IHRocmVzaG9sZFxyXG4gICAgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGUgcmVzdWx0IGZyb20gZ2V0QmFyY29kZUxpbmUgaW50byBhIGJpbmFyeSByZXByZXNlbnRhdGlvblxyXG4gKiBhbHNvIGNvbnNpZGVyaW5nIHRoZSBmcmVxdWVuY3kgYW5kIHNsb3BlIG9mIHRoZSBzaWduYWwgZm9yIG1vcmUgcm9idXN0IHJlc3VsdHNcclxuICogQHBhcmFtIHtPYmplY3R9IHJlc3VsdCB7bGluZSwgbWluLCBtYXh9XHJcbiAqL1xyXG5CcmVzZW5oYW0udG9CaW5hcnlMaW5lID0gZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICB2YXIgbWluID0gcmVzdWx0Lm1pbixcclxuICAgICAgICBtYXggPSByZXN1bHQubWF4LFxyXG4gICAgICAgIGxpbmUgPSByZXN1bHQubGluZSxcclxuICAgICAgICBzbG9wZSxcclxuICAgICAgICBzbG9wZTIsXHJcbiAgICAgICAgY2VudGVyID0gbWluICsgKG1heCAtIG1pbikgLyAyLFxyXG4gICAgICAgIGV4dHJlbWEgPSBbXSxcclxuICAgICAgICBjdXJyZW50RGlyLFxyXG4gICAgICAgIGRpcixcclxuICAgICAgICB0aHJlc2hvbGQgPSAobWF4IC0gbWluKSAvIDEyLFxyXG4gICAgICAgIHJUaHJlc2hvbGQgPSAtdGhyZXNob2xkLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgajtcclxuXHJcbiAgICAvLyAxLiBmaW5kIGV4dHJlbWFcclxuICAgIGN1cnJlbnREaXIgPSBsaW5lWzBdID4gY2VudGVyID8gU2xvcGUuRElSLlVQIDogU2xvcGUuRElSLkRPV047XHJcbiAgICBleHRyZW1hLnB1c2goe1xyXG4gICAgICAgIHBvczogMCxcclxuICAgICAgICB2YWw6IGxpbmVbMF1cclxuICAgIH0pO1xyXG4gICAgZm9yICggaSA9IDA7IGkgPCBsaW5lLmxlbmd0aCAtIDI7IGkrKykge1xyXG4gICAgICAgIHNsb3BlID0gKGxpbmVbaSArIDFdIC0gbGluZVtpXSk7XHJcbiAgICAgICAgc2xvcGUyID0gKGxpbmVbaSArIDJdIC0gbGluZVtpICsgMV0pO1xyXG4gICAgICAgIGlmICgoc2xvcGUgKyBzbG9wZTIpIDwgclRocmVzaG9sZCAmJiBsaW5lW2kgKyAxXSA8IChjZW50ZXIgKiAxLjUpKSB7XHJcbiAgICAgICAgICAgIGRpciA9IFNsb3BlLkRJUi5ET1dOO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHNsb3BlICsgc2xvcGUyKSA+IHRocmVzaG9sZCAmJiBsaW5lW2kgKyAxXSA+IChjZW50ZXIgKiAwLjUpKSB7XHJcbiAgICAgICAgICAgIGRpciA9IFNsb3BlLkRJUi5VUDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkaXIgPSBjdXJyZW50RGlyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnREaXIgIT09IGRpcikge1xyXG4gICAgICAgICAgICBleHRyZW1hLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgcG9zOiBpLFxyXG4gICAgICAgICAgICAgICAgdmFsOiBsaW5lW2ldXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjdXJyZW50RGlyID0gZGlyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4dHJlbWEucHVzaCh7XHJcbiAgICAgICAgcG9zOiBsaW5lLmxlbmd0aCxcclxuICAgICAgICB2YWw6IGxpbmVbbGluZS5sZW5ndGggLSAxXVxyXG4gICAgfSk7XHJcblxyXG4gICAgZm9yICggaiA9IGV4dHJlbWFbMF0ucG9zOyBqIDwgZXh0cmVtYVsxXS5wb3M7IGorKykge1xyXG4gICAgICAgIGxpbmVbal0gPSBsaW5lW2pdID4gY2VudGVyID8gMCA6IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGV4dHJlbWEgYW5kIGNvbnZlcnQgdG8gYmluYXJ5IGJhc2VkIG9uIGF2ZyBiZXR3ZWVuIG1pbm1heFxyXG4gICAgZm9yICggaSA9IDE7IGkgPCBleHRyZW1hLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgIGlmIChleHRyZW1hW2kgKyAxXS52YWwgPiBleHRyZW1hW2ldLnZhbCkge1xyXG4gICAgICAgICAgICB0aHJlc2hvbGQgPSAoZXh0cmVtYVtpXS52YWwgKyAoKGV4dHJlbWFbaSArIDFdLnZhbCAtIGV4dHJlbWFbaV0udmFsKSAvIDMpICogMikgfCAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocmVzaG9sZCA9IChleHRyZW1hW2kgKyAxXS52YWwgKyAoKGV4dHJlbWFbaV0udmFsIC0gZXh0cmVtYVtpICsgMV0udmFsKSAvIDMpKSB8IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKCBqID0gZXh0cmVtYVtpXS5wb3M7IGogPCBleHRyZW1hW2kgKyAxXS5wb3M7IGorKykge1xyXG4gICAgICAgICAgICBsaW5lW2pdID0gbGluZVtqXSA+IHRocmVzaG9sZCA/IDAgOiAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxpbmU6IGxpbmUsXHJcbiAgICAgICAgdGhyZXNob2xkOiB0aHJlc2hvbGRcclxuICAgIH07XHJcbn07XHJcblxyXG4vKipcclxuICogVXNlZCBmb3IgZGV2ZWxvcG1lbnQgb25seVxyXG4gKi9cclxuQnJlc2VuaGFtLmRlYnVnID0ge1xyXG4gICAgcHJpbnRGcmVxdWVuY3k6IGZ1bmN0aW9uKGxpbmUsIGNhbnZhcykge1xyXG4gICAgICAgIHZhciBpLFxyXG4gICAgICAgICAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGxpbmUubGVuZ3RoO1xyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSAyNTY7XHJcblxyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsdWVcIjtcclxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY3R4Lm1vdmVUbyhpLCAyNTUpO1xyXG4gICAgICAgICAgICBjdHgubGluZVRvKGksIDI1NSAtIGxpbmVbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBwcmludFBhdHRlcm46IGZ1bmN0aW9uKGxpbmUsIGNhbnZhcykge1xyXG4gICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLCBpO1xyXG5cclxuICAgICAgICBjYW52YXMud2lkdGggPSBsaW5lLmxlbmd0aDtcclxuICAgICAgICBjdHguZmlsbENvbG9yID0gXCJibGFja1wiO1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgbGluZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobGluZVtpXSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KGksIDAsIDEsIDEwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCcmVzZW5oYW07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2RlY29kZXIvYnJlc2VuaGFtLmpzXG4gKiovIiwiaW1wb3J0IEJhcmNvZGVSZWFkZXIgZnJvbSAnLi9iYXJjb2RlX3JlYWRlcic7XHJcblxyXG5mdW5jdGlvbiBDb2RlMTI4UmVhZGVyKCkge1xyXG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG52YXIgcHJvcGVydGllcyA9IHtcclxuICAgIENPREVfU0hJRlQ6IHt2YWx1ZTogOTh9LFxyXG4gICAgQ09ERV9DOiB7dmFsdWU6IDk5fSxcclxuICAgIENPREVfQjoge3ZhbHVlOiAxMDB9LFxyXG4gICAgQ09ERV9BOiB7dmFsdWU6IDEwMX0sXHJcbiAgICBTVEFSVF9DT0RFX0E6IHt2YWx1ZTogMTAzfSxcclxuICAgIFNUQVJUX0NPREVfQjoge3ZhbHVlOiAxMDR9LFxyXG4gICAgU1RBUlRfQ09ERV9DOiB7dmFsdWU6IDEwNX0sXHJcbiAgICBTVE9QX0NPREU6IHt2YWx1ZTogMTA2fSxcclxuICAgIE1PRFVMTzoge3ZhbHVlOiAxMX0sXHJcbiAgICBDT0RFX1BBVFRFUk46IHt2YWx1ZTogW1xyXG4gICAgICAgIFsyLCAxLCAyLCAyLCAyLCAyXSxcclxuICAgICAgICBbMiwgMiwgMiwgMSwgMiwgMl0sXHJcbiAgICAgICAgWzIsIDIsIDIsIDIsIDIsIDFdLFxyXG4gICAgICAgIFsxLCAyLCAxLCAyLCAyLCAzXSxcclxuICAgICAgICBbMSwgMiwgMSwgMywgMiwgMl0sXHJcbiAgICAgICAgWzEsIDMsIDEsIDIsIDIsIDJdLFxyXG4gICAgICAgIFsxLCAyLCAyLCAyLCAxLCAzXSxcclxuICAgICAgICBbMSwgMiwgMiwgMywgMSwgMl0sXHJcbiAgICAgICAgWzEsIDMsIDIsIDIsIDEsIDJdLFxyXG4gICAgICAgIFsyLCAyLCAxLCAyLCAxLCAzXSxcclxuICAgICAgICBbMiwgMiwgMSwgMywgMSwgMl0sXHJcbiAgICAgICAgWzIsIDMsIDEsIDIsIDEsIDJdLFxyXG4gICAgICAgIFsxLCAxLCAyLCAyLCAzLCAyXSxcclxuICAgICAgICBbMSwgMiwgMiwgMSwgMywgMl0sXHJcbiAgICAgICAgWzEsIDIsIDIsIDIsIDMsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAzLCAyLCAyLCAyXSxcclxuICAgICAgICBbMSwgMiwgMywgMSwgMiwgMl0sXHJcbiAgICAgICAgWzEsIDIsIDMsIDIsIDIsIDFdLFxyXG4gICAgICAgIFsyLCAyLCAzLCAyLCAxLCAxXSxcclxuICAgICAgICBbMiwgMiwgMSwgMSwgMywgMl0sXHJcbiAgICAgICAgWzIsIDIsIDEsIDIsIDMsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAzLCAyLCAxLCAyXSxcclxuICAgICAgICBbMiwgMiwgMywgMSwgMSwgMl0sXHJcbiAgICAgICAgWzMsIDEsIDIsIDEsIDMsIDFdLFxyXG4gICAgICAgIFszLCAxLCAxLCAyLCAyLCAyXSxcclxuICAgICAgICBbMywgMiwgMSwgMSwgMiwgMl0sXHJcbiAgICAgICAgWzMsIDIsIDEsIDIsIDIsIDFdLFxyXG4gICAgICAgIFszLCAxLCAyLCAyLCAxLCAyXSxcclxuICAgICAgICBbMywgMiwgMiwgMSwgMSwgMl0sXHJcbiAgICAgICAgWzMsIDIsIDIsIDIsIDEsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAyLCAxLCAyLCAzXSxcclxuICAgICAgICBbMiwgMSwgMiwgMywgMiwgMV0sXHJcbiAgICAgICAgWzIsIDMsIDIsIDEsIDIsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAxLCAzLCAyLCAzXSxcclxuICAgICAgICBbMSwgMywgMSwgMSwgMiwgM10sXHJcbiAgICAgICAgWzEsIDMsIDEsIDMsIDIsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAyLCAzLCAxLCAzXSxcclxuICAgICAgICBbMSwgMywgMiwgMSwgMSwgM10sXHJcbiAgICAgICAgWzEsIDMsIDIsIDMsIDEsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAxLCAzLCAxLCAzXSxcclxuICAgICAgICBbMiwgMywgMSwgMSwgMSwgM10sXHJcbiAgICAgICAgWzIsIDMsIDEsIDMsIDEsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAyLCAxLCAzLCAzXSxcclxuICAgICAgICBbMSwgMSwgMiwgMywgMywgMV0sXHJcbiAgICAgICAgWzEsIDMsIDIsIDEsIDMsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAzLCAxLCAyLCAzXSxcclxuICAgICAgICBbMSwgMSwgMywgMywgMiwgMV0sXHJcbiAgICAgICAgWzEsIDMsIDMsIDEsIDIsIDFdLFxyXG4gICAgICAgIFszLCAxLCAzLCAxLCAyLCAxXSxcclxuICAgICAgICBbMiwgMSwgMSwgMywgMywgMV0sXHJcbiAgICAgICAgWzIsIDMsIDEsIDEsIDMsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAzLCAxLCAxLCAzXSxcclxuICAgICAgICBbMiwgMSwgMywgMywgMSwgMV0sXHJcbiAgICAgICAgWzIsIDEsIDMsIDEsIDMsIDFdLFxyXG4gICAgICAgIFszLCAxLCAxLCAxLCAyLCAzXSxcclxuICAgICAgICBbMywgMSwgMSwgMywgMiwgMV0sXHJcbiAgICAgICAgWzMsIDMsIDEsIDEsIDIsIDFdLFxyXG4gICAgICAgIFszLCAxLCAyLCAxLCAxLCAzXSxcclxuICAgICAgICBbMywgMSwgMiwgMywgMSwgMV0sXHJcbiAgICAgICAgWzMsIDMsIDIsIDEsIDEsIDFdLFxyXG4gICAgICAgIFszLCAxLCA0LCAxLCAxLCAxXSxcclxuICAgICAgICBbMiwgMiwgMSwgNCwgMSwgMV0sXHJcbiAgICAgICAgWzQsIDMsIDEsIDEsIDEsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAxLCAyLCAyLCA0XSxcclxuICAgICAgICBbMSwgMSwgMSwgNCwgMiwgMl0sXHJcbiAgICAgICAgWzEsIDIsIDEsIDEsIDIsIDRdLFxyXG4gICAgICAgIFsxLCAyLCAxLCA0LCAyLCAxXSxcclxuICAgICAgICBbMSwgNCwgMSwgMSwgMiwgMl0sXHJcbiAgICAgICAgWzEsIDQsIDEsIDIsIDIsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAyLCAyLCAxLCA0XSxcclxuICAgICAgICBbMSwgMSwgMiwgNCwgMSwgMl0sXHJcbiAgICAgICAgWzEsIDIsIDIsIDEsIDEsIDRdLFxyXG4gICAgICAgIFsxLCAyLCAyLCA0LCAxLCAxXSxcclxuICAgICAgICBbMSwgNCwgMiwgMSwgMSwgMl0sXHJcbiAgICAgICAgWzEsIDQsIDIsIDIsIDEsIDFdLFxyXG4gICAgICAgIFsyLCA0LCAxLCAyLCAxLCAxXSxcclxuICAgICAgICBbMiwgMiwgMSwgMSwgMSwgNF0sXHJcbiAgICAgICAgWzQsIDEsIDMsIDEsIDEsIDFdLFxyXG4gICAgICAgIFsyLCA0LCAxLCAxLCAxLCAyXSxcclxuICAgICAgICBbMSwgMywgNCwgMSwgMSwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDEsIDIsIDQsIDJdLFxyXG4gICAgICAgIFsxLCAyLCAxLCAxLCA0LCAyXSxcclxuICAgICAgICBbMSwgMiwgMSwgMiwgNCwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDQsIDIsIDEsIDJdLFxyXG4gICAgICAgIFsxLCAyLCA0LCAxLCAxLCAyXSxcclxuICAgICAgICBbMSwgMiwgNCwgMiwgMSwgMV0sXHJcbiAgICAgICAgWzQsIDEsIDEsIDIsIDEsIDJdLFxyXG4gICAgICAgIFs0LCAyLCAxLCAxLCAxLCAyXSxcclxuICAgICAgICBbNCwgMiwgMSwgMiwgMSwgMV0sXHJcbiAgICAgICAgWzIsIDEsIDIsIDEsIDQsIDFdLFxyXG4gICAgICAgIFsyLCAxLCA0LCAxLCAyLCAxXSxcclxuICAgICAgICBbNCwgMSwgMiwgMSwgMiwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDEsIDEsIDQsIDNdLFxyXG4gICAgICAgIFsxLCAxLCAxLCAzLCA0LCAxXSxcclxuICAgICAgICBbMSwgMywgMSwgMSwgNCwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDQsIDEsIDEsIDNdLFxyXG4gICAgICAgIFsxLCAxLCA0LCAzLCAxLCAxXSxcclxuICAgICAgICBbNCwgMSwgMSwgMSwgMSwgM10sXHJcbiAgICAgICAgWzQsIDEsIDEsIDMsIDEsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAzLCAxLCA0LCAxXSxcclxuICAgICAgICBbMSwgMSwgNCwgMSwgMywgMV0sXHJcbiAgICAgICAgWzMsIDEsIDEsIDEsIDQsIDFdLFxyXG4gICAgICAgIFs0LCAxLCAxLCAxLCAzLCAxXSxcclxuICAgICAgICBbMiwgMSwgMSwgNCwgMSwgMl0sXHJcbiAgICAgICAgWzIsIDEsIDEsIDIsIDEsIDRdLFxyXG4gICAgICAgIFsyLCAxLCAxLCAyLCAzLCAyXSxcclxuICAgICAgICBbMiwgMywgMywgMSwgMSwgMSwgMl1cclxuICAgIF19LFxyXG4gICAgU0lOR0xFX0NPREVfRVJST1I6IHt2YWx1ZTogMX0sXHJcbiAgICBBVkdfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjV9LFxyXG4gICAgRk9STUFUOiB7dmFsdWU6IFwiY29kZV8xMjhcIiwgd3JpdGVhYmxlOiBmYWxzZX1cclxufTtcclxuXHJcbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XHJcbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29kZTEyOFJlYWRlcjtcclxuXHJcbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlLl9kZWNvZGVDb2RlID0gZnVuY3Rpb24oc3RhcnQpIHtcclxuICAgIHZhciBjb3VudGVyID0gWzAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgb2Zmc2V0ID0gc3RhcnQsXHJcbiAgICAgICAgaXNXaGl0ZSA9ICFzZWxmLl9yb3dbb2Zmc2V0XSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxyXG4gICAgICAgICAgICBlbmQ6IHN0YXJ0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb2RlLFxyXG4gICAgICAgIGVycm9yLFxyXG4gICAgICAgIG5vcm1hbGl6ZWQ7XHJcblxyXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkID0gc2VsZi5fbm9ybWFsaXplKGNvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvZGUgPSAwOyBjb2RlIDwgc2VsZi5DT0RFX1BBVFRFUk4ubGVuZ3RoOyBjb2RlKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4obm9ybWFsaXplZCwgc2VsZi5DT0RFX1BBVFRFUk5bY29kZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBiZXN0TWF0Y2guZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb2RlID0gY29kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XHJcbiAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlLl9maW5kU3RhcnQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBjb3VudGVyID0gWzAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpLFxyXG4gICAgICAgIGlzV2hpdGUgPSBmYWxzZSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IDAsXHJcbiAgICAgICAgICAgIGVuZDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29kZSxcclxuICAgICAgICBlcnJvcixcclxuICAgICAgICBqLFxyXG4gICAgICAgIHN1bSxcclxuICAgICAgICBub3JtYWxpemVkO1xyXG5cclxuICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgc3VtID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgY291bnRlci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBjb3VudGVyW2pdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZCA9IHNlbGYuX25vcm1hbGl6ZShjb3VudGVyKTtcclxuICAgICAgICAgICAgICAgIGlmIChub3JtYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb2RlID0gc2VsZi5TVEFSVF9DT0RFX0E7IGNvZGUgPD0gc2VsZi5TVEFSVF9DT0RFX0M7IGNvZGUrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHNlbGYuX21hdGNoUGF0dGVybihub3JtYWxpemVkLCBzZWxmLkNPREVfUEFUVEVSTltjb2RlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciA8IGJlc3RNYXRjaC5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmNvZGUgPSBjb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJlc3RNYXRjaC5lcnJvciA8IHNlbGYuQVZHX0NPREVfRVJST1IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLnN0YXJ0ID0gaSAtIHN1bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVuZCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltqXSA9IGNvdW50ZXJbaiArIDJdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY291bnRlcls0XSA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyWzVdID0gMDtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MtLTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuQ29kZTEyOFJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIHN0YXJ0SW5mbyA9IHNlbGYuX2ZpbmRTdGFydCgpLFxyXG4gICAgICAgIGNvZGUgPSBudWxsLFxyXG4gICAgICAgIGRvbmUgPSBmYWxzZSxcclxuICAgICAgICByZXN1bHQgPSBbXSxcclxuICAgICAgICBtdWx0aXBsaWVyID0gMCxcclxuICAgICAgICBjaGVja3N1bSA9IDAsXHJcbiAgICAgICAgY29kZXNldCxcclxuICAgICAgICByYXdSZXN1bHQgPSBbXSxcclxuICAgICAgICBkZWNvZGVkQ29kZXMgPSBbXSxcclxuICAgICAgICBzaGlmdE5leHQgPSBmYWxzZSxcclxuICAgICAgICB1bnNoaWZ0LFxyXG4gICAgICAgIHJlbW92ZUxhc3RDaGFyYWN0ZXIgPSB0cnVlO1xyXG5cclxuICAgIGlmIChzdGFydEluZm8gPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvZGUgPSB7XHJcbiAgICAgICAgY29kZTogc3RhcnRJbmZvLmNvZGUsXHJcbiAgICAgICAgc3RhcnQ6IHN0YXJ0SW5mby5zdGFydCxcclxuICAgICAgICBlbmQ6IHN0YXJ0SW5mby5lbmRcclxuICAgIH07XHJcbiAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuICAgIGNoZWNrc3VtID0gY29kZS5jb2RlO1xyXG4gICAgc3dpdGNoIChjb2RlLmNvZGUpIHtcclxuICAgIGNhc2Ugc2VsZi5TVEFSVF9DT0RFX0E6XHJcbiAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9BO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBzZWxmLlNUQVJUX0NPREVfQjpcclxuICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0I7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIHNlbGYuU1RBUlRfQ09ERV9DOlxyXG4gICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQztcclxuICAgICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgd2hpbGUgKCFkb25lKSB7XHJcbiAgICAgICAgdW5zaGlmdCA9IHNoaWZ0TmV4dDtcclxuICAgICAgICBzaGlmdE5leHQgPSBmYWxzZTtcclxuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb2RlLmVuZCk7XHJcbiAgICAgICAgaWYgKGNvZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGNvZGUuY29kZSAhPT0gc2VsZi5TVE9QX0NPREUpIHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUxhc3RDaGFyYWN0ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29kZS5jb2RlICE9PSBzZWxmLlNUT1BfQ09ERSkge1xyXG4gICAgICAgICAgICAgICAgcmF3UmVzdWx0LnB1c2goY29kZS5jb2RlKTtcclxuICAgICAgICAgICAgICAgIG11bHRpcGxpZXIrKztcclxuICAgICAgICAgICAgICAgIGNoZWNrc3VtICs9IG11bHRpcGxpZXIgKiBjb2RlLmNvZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKGNvZGVzZXQpIHtcclxuICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQTpcclxuICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgPCA2NCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoMzIgKyBjb2RlLmNvZGUpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29kZS5jb2RlIDwgOTYpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUuY29kZSAtIDY0KSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgIT09IHNlbGYuU1RPUF9DT0RFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUxhc3RDaGFyYWN0ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjb2RlLmNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9TSElGVDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnROZXh0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9CO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9COlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0M6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLlNUT1BfQ09ERTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9COlxyXG4gICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSA8IDk2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgzMiArIGNvZGUuY29kZSkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29kZS5jb2RlICE9PSBzZWxmLlNUT1BfQ09ERSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVMYXN0Q2hhcmFjdGVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY29kZS5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfU0hJRlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0TmV4dCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9BO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9DOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5TVE9QX0NPREU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQzpcclxuICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgPCAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUgPCAxMCA/IFwiMFwiICsgY29kZS5jb2RlIDogY29kZS5jb2RlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSAhPT0gc2VsZi5TVE9QX0NPREUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTGFzdENoYXJhY3RlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvZGUuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0E6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9CO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuU1RPUF9DT0RFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkb25lID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVuc2hpZnQpIHtcclxuICAgICAgICAgICAgY29kZXNldCA9IGNvZGVzZXQgPT09IHNlbGYuQ09ERV9BID8gc2VsZi5DT0RFX0IgOiBzZWxmLkNPREVfQTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvZGUgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb2RlLmVuZCA9IHNlbGYuX25leHRVbnNldChzZWxmLl9yb3csIGNvZGUuZW5kKTtcclxuICAgIGlmICghc2VsZi5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlKGNvZGUpKXtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja3N1bSAtPSBtdWx0aXBsaWVyICogcmF3UmVzdWx0W3Jhd1Jlc3VsdC5sZW5ndGggLSAxXTtcclxuICAgIGlmIChjaGVja3N1bSAlIDEwMyAhPT0gcmF3UmVzdWx0W3Jhd1Jlc3VsdC5sZW5ndGggLSAxXSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghcmVzdWx0Lmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlbW92ZSBsYXN0IGNvZGUgZnJvbSByZXN1bHQgKGNoZWNrc3VtKVxyXG4gICAgaWYgKHJlbW92ZUxhc3RDaGFyYWN0ZXIpIHtcclxuICAgICAgICByZXN1bHQuc3BsaWNlKHJlc3VsdC5sZW5ndGggLSAxLCAxKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcclxuICAgICAgICBzdGFydDogc3RhcnRJbmZvLnN0YXJ0LFxyXG4gICAgICAgIGVuZDogY29kZS5lbmQsXHJcbiAgICAgICAgY29kZXNldDogY29kZXNldCxcclxuICAgICAgICBzdGFydEluZm86IHN0YXJ0SW5mbyxcclxuICAgICAgICBkZWNvZGVkQ29kZXM6IGRlY29kZWRDb2RlcyxcclxuICAgICAgICBlbmRJbmZvOiBjb2RlXHJcbiAgICB9O1xyXG59O1xyXG5cclxuXHJcbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbihlbmRJbmZvKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kO1xyXG5cclxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IGVuZEluZm8uZW5kICsgKChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpIC8gMik7XHJcbiAgICBpZiAodHJhaWxpbmdXaGl0ZXNwYWNlRW5kIDwgc2VsZi5fcm93Lmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKGVuZEluZm8uZW5kLCB0cmFpbGluZ1doaXRlc3BhY2VFbmQsIDApKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29kZTEyOFJlYWRlcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL2NvZGVfMTI4X3JlYWRlci5qc1xuICoqLyIsImZ1bmN0aW9uIEJhcmNvZGVSZWFkZXIoY29uZmlnKSB7XHJcbiAgICB0aGlzLl9yb3cgPSBbXTtcclxuICAgIHRoaXMuY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9uZXh0VW5zZXQgPSBmdW5jdGlvbihsaW5lLCBzdGFydCkge1xyXG4gICAgdmFyIGk7XHJcblxyXG4gICAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzdGFydCA9IDA7XHJcbiAgICB9XHJcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIWxpbmVbaV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpbmUubGVuZ3RoO1xyXG59O1xyXG5cclxuQmFyY29kZVJlYWRlci5wcm90b3R5cGUuX21hdGNoUGF0dGVybiA9IGZ1bmN0aW9uKGNvdW50ZXIsIGNvZGUpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIGVycm9yID0gMCxcclxuICAgICAgICBzaW5nbGVFcnJvciA9IDAsXHJcbiAgICAgICAgbW9kdWxvID0gdGhpcy5NT0RVTE8sXHJcbiAgICAgICAgbWF4U2luZ2xlRXJyb3IgPSB0aGlzLlNJTkdMRV9DT0RFX0VSUk9SIHx8IDE7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBzaW5nbGVFcnJvciA9IE1hdGguYWJzKGNvZGVbaV0gLSBjb3VudGVyW2ldKTtcclxuICAgICAgICBpZiAoc2luZ2xlRXJyb3IgPiBtYXhTaW5nbGVFcnJvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyLk1BWF9WQUxVRTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXJyb3IgKz0gc2luZ2xlRXJyb3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXJyb3IgLyBtb2R1bG87XHJcbn07XHJcblxyXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbmV4dFNldCA9IGZ1bmN0aW9uKGxpbmUsIG9mZnNldCkge1xyXG4gICAgdmFyIGk7XHJcblxyXG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XHJcbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBsaW5lLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGxpbmVbaV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpbmUubGVuZ3RoO1xyXG59O1xyXG5cclxuQmFyY29kZVJlYWRlci5wcm90b3R5cGUuX25vcm1hbGl6ZSA9IGZ1bmN0aW9uKGNvdW50ZXIsIG1vZHVsbykge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgc3VtID0gMCxcclxuICAgICAgICByYXRpbyxcclxuICAgICAgICBudW1PbmVzID0gMCxcclxuICAgICAgICBub3JtYWxpemVkID0gW10sXHJcbiAgICAgICAgbm9ybSA9IDA7XHJcblxyXG4gICAgaWYgKCFtb2R1bG8pIHtcclxuICAgICAgICBtb2R1bG8gPSBzZWxmLk1PRFVMTztcclxuICAgIH1cclxuICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGNvdW50ZXJbaV0gPT09IDEpIHtcclxuICAgICAgICAgICAgbnVtT25lcysrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN1bSArPSBjb3VudGVyW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJhdGlvID0gc3VtIC8gKG1vZHVsbyAtIG51bU9uZXMpO1xyXG4gICAgaWYgKHJhdGlvID4gMS4wKSB7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbm9ybSA9IGNvdW50ZXJbaV0gPT09IDEgPyBjb3VudGVyW2ldIDogY291bnRlcltpXSAvIHJhdGlvO1xyXG4gICAgICAgICAgICBub3JtYWxpemVkLnB1c2gobm9ybSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByYXRpbyA9IChzdW0gKyBudW1PbmVzKSAvIG1vZHVsbztcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBub3JtID0gY291bnRlcltpXSAvIHJhdGlvO1xyXG4gICAgICAgICAgICBub3JtYWxpemVkLnB1c2gobm9ybSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZWQ7XHJcbn07XHJcblxyXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hUcmFjZSA9IGZ1bmN0aW9uKGNtcENvdW50ZXIsIGVwc2lsb24pIHtcclxuICAgIHZhciBjb3VudGVyID0gW10sXHJcbiAgICAgICAgaSxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3JvdyksXHJcbiAgICAgICAgaXNXaGl0ZSA9ICFzZWxmLl9yb3dbb2Zmc2V0XSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yO1xyXG5cclxuICAgIGlmIChjbXBDb3VudGVyKSB7XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBjbXBDb3VudGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXIucHVzaCgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xyXG4gICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKGNvdW50ZXIsIGNtcENvdW50ZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBlcHNpbG9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5zdGFydCA9IGkgLSBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guY291bnRlciA9IGNvdW50ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY291bnRlci5wdXNoKDApO1xyXG4gICAgICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcclxuICAgICAgICAgICAgICAgIGNvdW50ZXIucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xyXG4gICAgICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIGNtcENvdW50ZXIgd2FzIG5vdCBnaXZlblxyXG4gICAgYmVzdE1hdGNoLnN0YXJ0ID0gb2Zmc2V0O1xyXG4gICAgYmVzdE1hdGNoLmVuZCA9IHNlbGYuX3Jvdy5sZW5ndGggLSAxO1xyXG4gICAgYmVzdE1hdGNoLmNvdW50ZXIgPSBjb3VudGVyO1xyXG4gICAgcmV0dXJuIGJlc3RNYXRjaDtcclxufTtcclxuXHJcbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLmRlY29kZVBhdHRlcm4gPSBmdW5jdGlvbihwYXR0ZXJuKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgcmVzdWx0O1xyXG5cclxuICAgIHNlbGYuX3JvdyA9IHBhdHRlcm47XHJcbiAgICByZXN1bHQgPSBzZWxmLl9kZWNvZGUoKTtcclxuICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHtcclxuICAgICAgICBzZWxmLl9yb3cucmV2ZXJzZSgpO1xyXG4gICAgICAgIHJlc3VsdCA9IHNlbGYuX2RlY29kZSgpO1xyXG4gICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcmVzdWx0LmRpcmVjdGlvbiA9IEJhcmNvZGVSZWFkZXIuRElSRUNUSU9OLlJFVkVSU0U7XHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydCA9IHNlbGYuX3Jvdy5sZW5ndGggLSByZXN1bHQuc3RhcnQ7XHJcbiAgICAgICAgICAgIHJlc3VsdC5lbmQgPSBzZWxmLl9yb3cubGVuZ3RoIC0gcmVzdWx0LmVuZDtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdC5kaXJlY3Rpb24gPSBCYXJjb2RlUmVhZGVyLkRJUkVDVElPTi5GT1JXQVJEO1xyXG4gICAgfVxyXG4gICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgIHJlc3VsdC5mb3JtYXQgPSBzZWxmLkZPUk1BVDtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hSYW5nZSA9IGZ1bmN0aW9uKHN0YXJ0LCBlbmQsIHZhbHVlKSB7XHJcbiAgICB2YXIgaTtcclxuXHJcbiAgICBzdGFydCA9IHN0YXJ0IDwgMCA/IDAgOiBzdGFydDtcclxuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcy5fcm93W2ldICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fZmlsbENvdW50ZXJzID0gZnVuY3Rpb24ob2Zmc2V0LCBlbmQsIGlzV2hpdGUpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGNvdW50ZXJzID0gW107XHJcblxyXG4gICAgaXNXaGl0ZSA9ICh0eXBlb2YgaXNXaGl0ZSAhPT0gJ3VuZGVmaW5lZCcpID8gaXNXaGl0ZSA6IHRydWU7XHJcbiAgICBvZmZzZXQgPSAodHlwZW9mIG9mZnNldCAhPT0gJ3VuZGVmaW5lZCcpID8gb2Zmc2V0IDogc2VsZi5fbmV4dFVuc2V0KHNlbGYuX3Jvdyk7XHJcbiAgICBlbmQgPSBlbmQgfHwgc2VsZi5fcm93Lmxlbmd0aDtcclxuXHJcbiAgICBjb3VudGVyc1tjb3VudGVyUG9zXSA9IDA7XHJcbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBlbmQ7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJzW2NvdW50ZXJQb3NdKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY291bnRlclBvcysrO1xyXG4gICAgICAgICAgICBjb3VudGVyc1tjb3VudGVyUG9zXSA9IDE7XHJcbiAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY291bnRlcnM7XHJcbn07XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQmFyY29kZVJlYWRlci5wcm90b3R5cGUsIFwiRk9STUFUXCIsIHtcclxuICAgIHZhbHVlOiAndW5rbm93bicsXHJcbiAgICB3cml0ZWFibGU6IGZhbHNlXHJcbn0pO1xyXG5cclxuQmFyY29kZVJlYWRlci5ESVJFQ1RJT04gPSB7XHJcbiAgICBGT1JXQVJEOiAxLFxyXG4gICAgUkVWRVJTRTogLTFcclxufTtcclxuXHJcbkJhcmNvZGVSZWFkZXIuRXhjZXB0aW9uID0ge1xyXG4gICAgU3RhcnROb3RGb3VuZEV4Y2VwdGlvbjogXCJTdGFydC1JbmZvIHdhcyBub3QgZm91bmQhXCIsXHJcbiAgICBDb2RlTm90Rm91bmRFeGNlcHRpb246IFwiQ29kZSBjb3VsZCBub3QgYmUgZm91bmQhXCIsXHJcbiAgICBQYXR0ZXJuTm90Rm91bmRFeGNlcHRpb246IFwiUGF0dGVybiBjb3VsZCBub3QgYmUgZm91bmQhXCJcclxufTtcclxuXHJcbkJhcmNvZGVSZWFkZXIuQ09ORklHX0tFWVMgPSB7fTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhcmNvZGVSZWFkZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9iYXJjb2RlX3JlYWRlci5qc1xuICoqLyIsImltcG9ydCBCYXJjb2RlUmVhZGVyIGZyb20gJy4vYmFyY29kZV9yZWFkZXInO1xyXG5cclxuZnVuY3Rpb24gRUFOUmVhZGVyKG9wdHMpIHtcclxuICAgIEJhcmNvZGVSZWFkZXIuY2FsbCh0aGlzLCBvcHRzKTtcclxufVxyXG5cclxudmFyIHByb3BlcnRpZXMgPSB7XHJcbiAgICBDT0RFX0xfU1RBUlQ6IHt2YWx1ZTogMH0sXHJcbiAgICBNT0RVTE86IHt2YWx1ZTogN30sXHJcbiAgICBDT0RFX0dfU1RBUlQ6IHt2YWx1ZTogMTB9LFxyXG4gICAgU1RBUlRfUEFUVEVSTjoge3ZhbHVlOiBbMSAvIDMgKiA3LCAxIC8gMyAqIDcsIDEgLyAzICogN119LFxyXG4gICAgU1RPUF9QQVRURVJOOiB7dmFsdWU6IFsxIC8gMyAqIDcsIDEgLyAzICogNywgMSAvIDMgKiA3XX0sXHJcbiAgICBNSURETEVfUEFUVEVSTjoge3ZhbHVlOiBbMSAvIDUgKiA3LCAxIC8gNSAqIDcsIDEgLyA1ICogNywgMSAvIDUgKiA3LCAxIC8gNSAqIDddfSxcclxuICAgIENPREVfUEFUVEVSTjoge3ZhbHVlOiBbXHJcbiAgICAgICAgWzMsIDIsIDEsIDFdLFxyXG4gICAgICAgIFsyLCAyLCAyLCAxXSxcclxuICAgICAgICBbMiwgMSwgMiwgMl0sXHJcbiAgICAgICAgWzEsIDQsIDEsIDFdLFxyXG4gICAgICAgIFsxLCAxLCAzLCAyXSxcclxuICAgICAgICBbMSwgMiwgMywgMV0sXHJcbiAgICAgICAgWzEsIDEsIDEsIDRdLFxyXG4gICAgICAgIFsxLCAzLCAxLCAyXSxcclxuICAgICAgICBbMSwgMiwgMSwgM10sXHJcbiAgICAgICAgWzMsIDEsIDEsIDJdLFxyXG4gICAgICAgIFsxLCAxLCAyLCAzXSxcclxuICAgICAgICBbMSwgMiwgMiwgMl0sXHJcbiAgICAgICAgWzIsIDIsIDEsIDJdLFxyXG4gICAgICAgIFsxLCAxLCA0LCAxXSxcclxuICAgICAgICBbMiwgMywgMSwgMV0sXHJcbiAgICAgICAgWzEsIDMsIDIsIDFdLFxyXG4gICAgICAgIFs0LCAxLCAxLCAxXSxcclxuICAgICAgICBbMiwgMSwgMywgMV0sXHJcbiAgICAgICAgWzMsIDEsIDIsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAxLCAzXVxyXG4gICAgXX0sXHJcbiAgICBDT0RFX0ZSRVFVRU5DWToge3ZhbHVlOiBbMCwgMTEsIDEzLCAxNCwgMTksIDI1LCAyOCwgMjEsIDIyLCAyNl19LFxyXG4gICAgU0lOR0xFX0NPREVfRVJST1I6IHt2YWx1ZTogMC42N30sXHJcbiAgICBBVkdfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjI3fSxcclxuICAgIEZPUk1BVDoge3ZhbHVlOiBcImVhbl8xM1wiLCB3cml0ZWFibGU6IGZhbHNlfVxyXG59O1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFyY29kZVJlYWRlci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xyXG5FQU5SZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRUFOUmVhZGVyO1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlQ29kZSA9IGZ1bmN0aW9uKHN0YXJ0LCBjb2RlcmFuZ2UpIHtcclxuICAgIHZhciBjb3VudGVyID0gWzAsIDAsIDAsIDBdLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgb2Zmc2V0ID0gc3RhcnQsXHJcbiAgICAgICAgaXNXaGl0ZSA9ICFzZWxmLl9yb3dbb2Zmc2V0XSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxyXG4gICAgICAgICAgICBlbmQ6IHN0YXJ0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb2RlLFxyXG4gICAgICAgIGVycm9yLFxyXG4gICAgICAgIG5vcm1hbGl6ZWQ7XHJcblxyXG4gICAgaWYgKCFjb2RlcmFuZ2UpIHtcclxuICAgICAgICBjb2RlcmFuZ2UgPSBzZWxmLkNPREVfUEFUVEVSTi5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkID0gc2VsZi5fbm9ybWFsaXplKGNvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvZGUgPSAwOyBjb2RlIDwgY29kZXJhbmdlOyBjb2RlKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4obm9ybWFsaXplZCwgc2VsZi5DT0RFX1BBVFRFUk5bY29kZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBiZXN0TWF0Y2guZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb2RlID0gY29kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiZXN0TWF0Y2guZXJyb3IgPiBzZWxmLkFWR19DT0RFX0VSUk9SKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xyXG4gICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5FQU5SZWFkZXIucHJvdG90eXBlLl9maW5kUGF0dGVybiA9IGZ1bmN0aW9uKHBhdHRlcm4sIG9mZnNldCwgaXNXaGl0ZSwgdHJ5SGFyZGVyLCBlcHNpbG9uKSB7XHJcbiAgICB2YXIgY291bnRlciA9IFtdLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgY291bnRlclBvcyA9IDAsXHJcbiAgICAgICAgYmVzdE1hdGNoID0ge1xyXG4gICAgICAgICAgICBlcnJvcjogTnVtYmVyLk1BWF9WQUxVRSxcclxuICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgIHN0YXJ0OiAwLFxyXG4gICAgICAgICAgICBlbmQ6IDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yLFxyXG4gICAgICAgIGosXHJcbiAgICAgICAgc3VtLFxyXG4gICAgICAgIG5vcm1hbGl6ZWQ7XHJcblxyXG4gICAgaWYgKCFvZmZzZXQpIHtcclxuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3Jvdyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzV2hpdGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlzV2hpdGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHJ5SGFyZGVyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0cnlIYXJkZXIgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggZXBzaWxvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZXBzaWxvbiA9IHNlbGYuQVZHX0NPREVfRVJST1I7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCBwYXR0ZXJuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY291bnRlcltpXSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBzdW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBjb3VudGVyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGNvdW50ZXJbal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkID0gc2VsZi5fbm9ybWFsaXplKGNvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHNlbGYuX21hdGNoUGF0dGVybihub3JtYWxpemVkLCBwYXR0ZXJuKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIDwgZXBzaWxvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLnN0YXJ0ID0gaSAtIHN1bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVuZCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRyeUhhcmRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgY291bnRlci5sZW5ndGggLSAyOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcltqXSA9IGNvdW50ZXJbaiArIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXIubGVuZ3RoIC0gMl0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlci5sZW5ndGggLSAxXSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlclBvcy0tO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZmluZFN0YXJ0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgbGVhZGluZ1doaXRlc3BhY2VTdGFydCxcclxuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3JvdyksXHJcbiAgICAgICAgc3RhcnRJbmZvO1xyXG5cclxuICAgIHdoaWxlICghc3RhcnRJbmZvKSB7XHJcbiAgICAgICAgc3RhcnRJbmZvID0gc2VsZi5fZmluZFBhdHRlcm4oc2VsZi5TVEFSVF9QQVRURVJOLCBvZmZzZXQpO1xyXG4gICAgICAgIGlmICghc3RhcnRJbmZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0ID0gc3RhcnRJbmZvLnN0YXJ0IC0gKHN0YXJ0SW5mby5lbmQgLSBzdGFydEluZm8uc3RhcnQpO1xyXG4gICAgICAgIGlmIChsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0ID49IDApIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UobGVhZGluZ1doaXRlc3BhY2VTdGFydCwgc3RhcnRJbmZvLnN0YXJ0LCAwKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXJ0SW5mbztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBvZmZzZXQgPSBzdGFydEluZm8uZW5kO1xyXG4gICAgICAgIHN0YXJ0SW5mbyA9IG51bGw7XHJcbiAgICB9XHJcbn07XHJcblxyXG5FQU5SZWFkZXIucHJvdG90eXBlLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbihlbmRJbmZvKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kO1xyXG5cclxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IGVuZEluZm8uZW5kICsgKGVuZEluZm8uZW5kIC0gZW5kSW5mby5zdGFydCk7XHJcbiAgICBpZiAodHJhaWxpbmdXaGl0ZXNwYWNlRW5kIDwgc2VsZi5fcm93Lmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKGVuZEluZm8uZW5kLCB0cmFpbGluZ1doaXRlc3BhY2VFbmQsIDApKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZmluZEVuZCA9IGZ1bmN0aW9uKG9mZnNldCwgaXNXaGl0ZSkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGVuZEluZm8gPSBzZWxmLl9maW5kUGF0dGVybihzZWxmLlNUT1BfUEFUVEVSTiwgb2Zmc2V0LCBpc1doaXRlLCBmYWxzZSk7XHJcblxyXG4gICAgcmV0dXJuIGVuZEluZm8gIT09IG51bGwgPyBzZWxmLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UoZW5kSW5mbykgOiBudWxsO1xyXG59O1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZS5fY2FsY3VsYXRlRmlyc3REaWdpdCA9IGZ1bmN0aW9uKGNvZGVGcmVxdWVuY3kpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgc2VsZi5DT0RFX0ZSRVFVRU5DWS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChjb2RlRnJlcXVlbmN5ID09PSBzZWxmLkNPREVfRlJFUVVFTkNZW2ldKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlUGF5bG9hZCA9IGZ1bmN0aW9uKGNvZGUsIHJlc3VsdCwgZGVjb2RlZENvZGVzKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBjb2RlRnJlcXVlbmN5ID0gMHgwLFxyXG4gICAgICAgIGZpcnN0RGlnaXQ7XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCA2OyBpKyspIHtcclxuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb2RlLmVuZCk7XHJcbiAgICAgICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29kZS5jb2RlID49IHNlbGYuQ09ERV9HX1NUQVJUKSB7XHJcbiAgICAgICAgICAgIGNvZGUuY29kZSA9IGNvZGUuY29kZSAtIHNlbGYuQ09ERV9HX1NUQVJUO1xyXG4gICAgICAgICAgICBjb2RlRnJlcXVlbmN5IHw9IDEgPDwgKDUgLSBpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb2RlRnJlcXVlbmN5IHw9IDAgPDwgKDUgLSBpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0LnB1c2goY29kZS5jb2RlKTtcclxuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBmaXJzdERpZ2l0ID0gc2VsZi5fY2FsY3VsYXRlRmlyc3REaWdpdChjb2RlRnJlcXVlbmN5KTtcclxuICAgIGlmIChmaXJzdERpZ2l0ID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICByZXN1bHQudW5zaGlmdChmaXJzdERpZ2l0KTtcclxuXHJcbiAgICBjb2RlID0gc2VsZi5fZmluZFBhdHRlcm4oc2VsZi5NSURETEVfUEFUVEVSTiwgY29kZS5lbmQsIHRydWUsIGZhbHNlKTtcclxuICAgIGlmIChjb2RlID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kLCBzZWxmLkNPREVfR19TVEFSVCk7XHJcbiAgICAgICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb2RlO1xyXG59O1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc3RhcnRJbmZvLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGNvZGUsXHJcbiAgICAgICAgcmVzdWx0ID0gW10sXHJcbiAgICAgICAgZGVjb2RlZENvZGVzID0gW107XHJcblxyXG4gICAgc3RhcnRJbmZvID0gc2VsZi5fZmluZFN0YXJ0KCk7XHJcbiAgICBpZiAoIXN0YXJ0SW5mbykge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY29kZSA9IHtcclxuICAgICAgICBjb2RlOiBzdGFydEluZm8uY29kZSxcclxuICAgICAgICBzdGFydDogc3RhcnRJbmZvLnN0YXJ0LFxyXG4gICAgICAgIGVuZDogc3RhcnRJbmZvLmVuZFxyXG4gICAgfTtcclxuICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xyXG4gICAgY29kZSA9IHNlbGYuX2RlY29kZVBheWxvYWQoY29kZSwgcmVzdWx0LCBkZWNvZGVkQ29kZXMpO1xyXG4gICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjb2RlID0gc2VsZi5fZmluZEVuZChjb2RlLmVuZCwgZmFsc2UpO1xyXG4gICAgaWYgKCFjb2RlKXtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuXHJcbiAgICAvLyBDaGVja3N1bVxyXG4gICAgaWYgKCFzZWxmLl9jaGVja3N1bShyZXN1bHQpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcclxuICAgICAgICBzdGFydDogc3RhcnRJbmZvLnN0YXJ0LFxyXG4gICAgICAgIGVuZDogY29kZS5lbmQsXHJcbiAgICAgICAgY29kZXNldDogXCJcIixcclxuICAgICAgICBzdGFydEluZm86IHN0YXJ0SW5mbyxcclxuICAgICAgICBkZWNvZGVkQ29kZXM6IGRlY29kZWRDb2Rlc1xyXG4gICAgfTtcclxufTtcclxuXHJcbkVBTlJlYWRlci5wcm90b3R5cGUuX2NoZWNrc3VtID0gZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICB2YXIgc3VtID0gMCwgaTtcclxuXHJcbiAgICBmb3IgKCBpID0gcmVzdWx0Lmxlbmd0aCAtIDI7IGkgPj0gMDsgaSAtPSAyKSB7XHJcbiAgICAgICAgc3VtICs9IHJlc3VsdFtpXTtcclxuICAgIH1cclxuICAgIHN1bSAqPSAzO1xyXG4gICAgZm9yICggaSA9IHJlc3VsdC5sZW5ndGggLSAxOyBpID49IDA7IGkgLT0gMikge1xyXG4gICAgICAgIHN1bSArPSByZXN1bHRbaV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VtICUgMTAgPT09IDA7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoRUFOUmVhZGVyKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL2Vhbl9yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgQmFyY29kZVJlYWRlciBmcm9tICcuL2JhcmNvZGVfcmVhZGVyJztcclxuaW1wb3J0IEFycmF5SGVscGVyIGZyb20gJy4uL2NvbW1vbi9hcnJheV9oZWxwZXInO1xyXG5cclxuZnVuY3Rpb24gQ29kZTM5UmVhZGVyKCkge1xyXG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG52YXIgcHJvcGVydGllcyA9IHtcclxuICAgIEFMUEhBQkVUSF9TVFJJTkc6IHt2YWx1ZTogXCIwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVotLiAqJC8rJVwifSxcclxuICAgIEFMUEhBQkVUOiB7dmFsdWU6IFs0OCwgNDksIDUwLCA1MSwgNTIsIDUzLCA1NCwgNTUsIDU2LCA1NywgNjUsIDY2LCA2NywgNjgsIDY5LCA3MCwgNzEsIDcyLCA3MywgNzQsIDc1LCA3NiwgNzcsIDc4LFxyXG4gICAgICAgIDc5LCA4MCwgODEsIDgyLCA4MywgODQsIDg1LCA4NiwgODcsIDg4LCA4OSwgOTAsIDQ1LCA0NiwgMzIsIDQyLCAzNiwgNDcsIDQzLCAzN119LFxyXG4gICAgQ0hBUkFDVEVSX0VOQ09ESU5HUzoge3ZhbHVlOiBbMHgwMzQsIDB4MTIxLCAweDA2MSwgMHgxNjAsIDB4MDMxLCAweDEzMCwgMHgwNzAsIDB4MDI1LCAweDEyNCwgMHgwNjQsIDB4MTA5LCAweDA0OSxcclxuICAgICAgICAweDE0OCwgMHgwMTksIDB4MTE4LCAweDA1OCwgMHgwMEQsIDB4MTBDLCAweDA0QywgMHgwMUMsIDB4MTAzLCAweDA0MywgMHgxNDIsIDB4MDEzLCAweDExMiwgMHgwNTIsIDB4MDA3LCAweDEwNixcclxuICAgICAgICAweDA0NiwgMHgwMTYsIDB4MTgxLCAweDBDMSwgMHgxQzAsIDB4MDkxLCAweDE5MCwgMHgwRDAsIDB4MDg1LCAweDE4NCwgMHgwQzQsIDB4MDk0LCAweDBBOCwgMHgwQTIsIDB4MDhBLCAweDAyQVxyXG4gICAgXX0sXHJcbiAgICBBU1RFUklTSzoge3ZhbHVlOiAweDA5NH0sXHJcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJjb2RlXzM5XCIsIHdyaXRlYWJsZTogZmFsc2V9XHJcbn07XHJcblxyXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XHJcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb2RlMzlSZWFkZXI7XHJcblxyXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl90b0NvdW50ZXJzID0gZnVuY3Rpb24oc3RhcnQsIGNvdW50ZXIpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBudW1Db3VudGVycyA9IGNvdW50ZXIubGVuZ3RoLFxyXG4gICAgICAgIGVuZCA9IHNlbGYuX3Jvdy5sZW5ndGgsXHJcbiAgICAgICAgaXNXaGl0ZSA9ICFzZWxmLl9yb3dbc3RhcnRdLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgY291bnRlclBvcyA9IDA7XHJcblxyXG4gICAgQXJyYXlIZWxwZXIuaW5pdChjb3VudGVyLCAwKTtcclxuXHJcbiAgICBmb3IgKCBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb3VudGVyUG9zKys7XHJcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBudW1Db3VudGVycykge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY291bnRlcjtcclxufTtcclxuXHJcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGNvdW50ZXJzID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgIHJlc3VsdCA9IFtdLFxyXG4gICAgICAgIHN0YXJ0ID0gc2VsZi5fZmluZFN0YXJ0KCksXHJcbiAgICAgICAgZGVjb2RlZENoYXIsXHJcbiAgICAgICAgbGFzdFN0YXJ0LFxyXG4gICAgICAgIHBhdHRlcm4sXHJcbiAgICAgICAgbmV4dFN0YXJ0O1xyXG5cclxuICAgIGlmICghc3RhcnQpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIG5leHRTdGFydCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93LCBzdGFydC5lbmQpO1xyXG5cclxuICAgIGRvIHtcclxuICAgICAgICBjb3VudGVycyA9IHNlbGYuX3RvQ291bnRlcnMobmV4dFN0YXJ0LCBjb3VudGVycyk7XHJcbiAgICAgICAgcGF0dGVybiA9IHNlbGYuX3RvUGF0dGVybihjb3VudGVycyk7XHJcbiAgICAgICAgaWYgKHBhdHRlcm4gPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWNvZGVkQ2hhciA9IHNlbGYuX3BhdHRlcm5Ub0NoYXIocGF0dGVybik7XHJcbiAgICAgICAgaWYgKGRlY29kZWRDaGFyIDwgMCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQucHVzaChkZWNvZGVkQ2hhcik7XHJcbiAgICAgICAgbGFzdFN0YXJ0ID0gbmV4dFN0YXJ0O1xyXG4gICAgICAgIG5leHRTdGFydCArPSBBcnJheUhlbHBlci5zdW0oY291bnRlcnMpO1xyXG4gICAgICAgIG5leHRTdGFydCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93LCBuZXh0U3RhcnQpO1xyXG4gICAgfSB3aGlsZSAoZGVjb2RlZENoYXIgIT09ICcqJyk7XHJcbiAgICByZXN1bHQucG9wKCk7XHJcblxyXG4gICAgaWYgKCFyZXN1bHQubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFzZWxmLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UobGFzdFN0YXJ0LCBuZXh0U3RhcnQsIGNvdW50ZXJzKSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogcmVzdWx0LmpvaW4oXCJcIiksXHJcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LnN0YXJ0LFxyXG4gICAgICAgIGVuZDogbmV4dFN0YXJ0LFxyXG4gICAgICAgIHN0YXJ0SW5mbzogc3RhcnQsXHJcbiAgICAgICAgZGVjb2RlZENvZGVzOiByZXN1bHRcclxuICAgIH07XHJcbn07XHJcblxyXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbihsYXN0U3RhcnQsIG5leHRTdGFydCwgY291bnRlcnMpIHtcclxuICAgIHZhciB0cmFpbGluZ1doaXRlc3BhY2VFbmQsXHJcbiAgICAgICAgcGF0dGVyblNpemUgPSBBcnJheUhlbHBlci5zdW0oY291bnRlcnMpO1xyXG5cclxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IG5leHRTdGFydCAtIGxhc3RTdGFydCAtIHBhdHRlcm5TaXplO1xyXG4gICAgaWYgKCh0cmFpbGluZ1doaXRlc3BhY2VFbmQgKiAzKSA+PSBwYXR0ZXJuU2l6ZSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fcGF0dGVyblRvQ2hhciA9IGZ1bmN0aW9uKHBhdHRlcm4pIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoc2VsZi5DSEFSQUNURVJfRU5DT0RJTkdTW2ldID09PSBwYXR0ZXJuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHNlbGYuQUxQSEFCRVRbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAtMTtcclxufTtcclxuXHJcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX2ZpbmROZXh0V2lkdGggPSBmdW5jdGlvbihjb3VudGVycywgY3VycmVudCkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgbWluV2lkdGggPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChjb3VudGVyc1tpXSA8IG1pbldpZHRoICYmIGNvdW50ZXJzW2ldID4gY3VycmVudCkge1xyXG4gICAgICAgICAgICBtaW5XaWR0aCA9IGNvdW50ZXJzW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWluV2lkdGg7XHJcbn07XHJcblxyXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl90b1BhdHRlcm4gPSBmdW5jdGlvbihjb3VudGVycykge1xyXG4gICAgdmFyIG51bUNvdW50ZXJzID0gY291bnRlcnMubGVuZ3RoLFxyXG4gICAgICAgIG1heE5hcnJvd1dpZHRoID0gMCxcclxuICAgICAgICBudW1XaWRlQmFycyA9IG51bUNvdW50ZXJzLFxyXG4gICAgICAgIHdpZGVCYXJXaWR0aCA9IDAsXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgcGF0dGVybixcclxuICAgICAgICBpO1xyXG5cclxuICAgIHdoaWxlIChudW1XaWRlQmFycyA+IDMpIHtcclxuICAgICAgICBtYXhOYXJyb3dXaWR0aCA9IHNlbGYuX2ZpbmROZXh0V2lkdGgoY291bnRlcnMsIG1heE5hcnJvd1dpZHRoKTtcclxuICAgICAgICBudW1XaWRlQmFycyA9IDA7XHJcbiAgICAgICAgcGF0dGVybiA9IDA7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG51bUNvdW50ZXJzOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50ZXJzW2ldID4gbWF4TmFycm93V2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIHBhdHRlcm4gfD0gMSA8PCAobnVtQ291bnRlcnMgLSAxIC0gaSk7XHJcbiAgICAgICAgICAgICAgICBudW1XaWRlQmFycysrO1xyXG4gICAgICAgICAgICAgICAgd2lkZUJhcldpZHRoICs9IGNvdW50ZXJzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobnVtV2lkZUJhcnMgPT09IDMpIHtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG51bUNvdW50ZXJzICYmIG51bVdpZGVCYXJzID4gMDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnRlcnNbaV0gPiBtYXhOYXJyb3dXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG51bVdpZGVCYXJzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChjb3VudGVyc1tpXSAqIDIpID49IHdpZGVCYXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwYXR0ZXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAtMTtcclxufTtcclxuXHJcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX2ZpbmRTdGFydCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KSxcclxuICAgICAgICBwYXR0ZXJuU3RhcnQgPSBvZmZzZXQsXHJcbiAgICAgICAgY291bnRlciA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBpc1doaXRlID0gZmFsc2UsXHJcbiAgICAgICAgaSxcclxuICAgICAgICBqLFxyXG4gICAgICAgIHdoaXRlU3BhY2VNdXN0U3RhcnQ7XHJcblxyXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBmaW5kIHN0YXJ0IHBhdHRlcm5cclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLl90b1BhdHRlcm4oY291bnRlcikgPT09IHNlbGYuQVNURVJJU0spIHtcclxuICAgICAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlTXVzdFN0YXJ0ID0gTWF0aC5mbG9vcihNYXRoLm1heCgwLCBwYXR0ZXJuU3RhcnQgLSAoKGkgLSBwYXR0ZXJuU3RhcnQpIC8gNCkpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5fbWF0Y2hSYW5nZSh3aGl0ZVNwYWNlTXVzdFN0YXJ0LCBwYXR0ZXJuU3RhcnQsIDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogcGF0dGVyblN0YXJ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHBhdHRlcm5TdGFydCArPSBjb3VudGVyWzBdICsgY291bnRlclsxXTtcclxuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgNzsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltqXSA9IGNvdW50ZXJbaiArIDJdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY291bnRlcls3XSA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyWzhdID0gMDtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MtLTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29kZTM5UmVhZGVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvY29kZV8zOV9yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgQ29kZTM5UmVhZGVyIGZyb20gJy4vY29kZV8zOV9yZWFkZXInO1xyXG5cclxuZnVuY3Rpb24gQ29kZTM5VklOUmVhZGVyKCkge1xyXG4gICAgQ29kZTM5UmVhZGVyLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbnZhciBwYXR0ZXJucyA9IHtcclxuICAgIElPUTogL1tJT1FdL2csXHJcbiAgICBBWjA5OiAvW0EtWjAtOV17MTd9L1xyXG59O1xyXG5cclxuQ29kZTM5VklOUmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ29kZTM5UmVhZGVyLnByb3RvdHlwZSk7XHJcbkNvZGUzOVZJTlJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb2RlMzlWSU5SZWFkZXI7XHJcblxyXG4vLyBDcmliYmVkIGZyb206XHJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96eGluZy96eGluZy9ibG9iL21hc3Rlci9jb3JlL3NyYy9tYWluL2phdmEvY29tL2dvb2dsZS96eGluZy9jbGllbnQvcmVzdWx0L1ZJTlJlc3VsdFBhcnNlci5qYXZhXHJcbkNvZGUzOVZJTlJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHJlc3VsdCA9IENvZGUzOVJlYWRlci5wcm90b3R5cGUuX2RlY29kZS5hcHBseSh0aGlzKTtcclxuICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNvZGUgPSByZXN1bHQuY29kZTtcclxuXHJcbiAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKHBhdHRlcm5zLklPUSwgJycpO1xyXG5cclxuICAgIGlmICghY29kZS5tYXRjaChwYXR0ZXJucy5BWjA5KSkge1xyXG4gICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCBBWjA5IHBhdHRlcm4gY29kZTonLCBjb2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLl9jaGVja0NoZWNrc3VtKGNvZGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdWx0LmNvZGUgPSBjb2RlO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbkNvZGUzOVZJTlJlYWRlci5wcm90b3R5cGUuX2NoZWNrQ2hlY2tzdW0gPSBmdW5jdGlvbihjb2RlKSB7XHJcbiAgICAvLyBUT0RPXHJcbiAgICByZXR1cm4gISFjb2RlO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29kZTM5VklOUmVhZGVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvY29kZV8zOV92aW5fcmVhZGVyLmpzXG4gKiovIiwiaW1wb3J0IEJhcmNvZGVSZWFkZXIgZnJvbSAnLi9iYXJjb2RlX3JlYWRlcic7XHJcblxyXG5mdW5jdGlvbiBDb2RhYmFyUmVhZGVyKCkge1xyXG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMpO1xyXG4gICAgdGhpcy5fY291bnRlcnMgPSBbXTtcclxufVxyXG5cclxudmFyIHByb3BlcnRpZXMgPSB7XHJcbiAgICBBTFBIQUJFVEhfU1RSSU5HOiB7dmFsdWU6IFwiMDEyMzQ1Njc4OS0kOi8uK0FCQ0RcIn0sXHJcbiAgICBBTFBIQUJFVDoge3ZhbHVlOiBbNDgsIDQ5LCA1MCwgNTEsIDUyLCA1MywgNTQsIDU1LCA1NiwgNTcsIDQ1LCAzNiwgNTgsIDQ3LCA0NiwgNDMsIDY1LCA2NiwgNjcsIDY4XX0sXHJcbiAgICBDSEFSQUNURVJfRU5DT0RJTkdTOiB7dmFsdWU6IFsweDAwMywgMHgwMDYsIDB4MDA5LCAweDA2MCwgMHgwMTIsIDB4MDQyLCAweDAyMSwgMHgwMjQsIDB4MDMwLCAweDA0OCwgMHgwMGMsIDB4MDE4LFxyXG4gICAgICAgIDB4MDQ1LCAweDA1MSwgMHgwNTQsIDB4MDE1LCAweDAxQSwgMHgwMjksIDB4MDBCLCAweDAwRV19LFxyXG4gICAgU1RBUlRfRU5EOiB7dmFsdWU6IFsweDAxQSwgMHgwMjksIDB4MDBCLCAweDAwRV19LFxyXG4gICAgTUlOX0VOQ09ERURfQ0hBUlM6IHt2YWx1ZTogNH0sXHJcbiAgICBNQVhfQUNDRVBUQUJMRToge3ZhbHVlOiAyLjB9LFxyXG4gICAgUEFERElORzoge3ZhbHVlOiAxLjV9LFxyXG4gICAgRk9STUFUOiB7dmFsdWU6IFwiY29kYWJhclwiLCB3cml0ZWFibGU6IGZhbHNlfVxyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb2RhYmFyUmVhZGVyO1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIHJlc3VsdCA9IFtdLFxyXG4gICAgICAgIHN0YXJ0LFxyXG4gICAgICAgIGRlY29kZWRDaGFyLFxyXG4gICAgICAgIHBhdHRlcm4sXHJcbiAgICAgICAgbmV4dFN0YXJ0LFxyXG4gICAgICAgIGVuZDtcclxuXHJcbiAgICB0aGlzLl9jb3VudGVycyA9IHNlbGYuX2ZpbGxDb3VudGVycygpO1xyXG4gICAgc3RhcnQgPSBzZWxmLl9maW5kU3RhcnQoKTtcclxuICAgIGlmICghc3RhcnQpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIG5leHRTdGFydCA9IHN0YXJ0LnN0YXJ0Q291bnRlcjtcclxuXHJcbiAgICBkbyB7XHJcbiAgICAgICAgcGF0dGVybiA9IHNlbGYuX3RvUGF0dGVybihuZXh0U3RhcnQpO1xyXG4gICAgICAgIGlmIChwYXR0ZXJuIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVjb2RlZENoYXIgPSBzZWxmLl9wYXR0ZXJuVG9DaGFyKHBhdHRlcm4pO1xyXG4gICAgICAgIGlmIChkZWNvZGVkQ2hhciA8IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0LnB1c2goZGVjb2RlZENoYXIpO1xyXG4gICAgICAgIG5leHRTdGFydCArPSA4O1xyXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMSAmJiBzZWxmLl9pc1N0YXJ0RW5kKHBhdHRlcm4pKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0gd2hpbGUgKG5leHRTdGFydCA8IHNlbGYuX2NvdW50ZXJzLmxlbmd0aCk7XHJcblxyXG4gICAgLy8gdmVyaWZ5IGVuZFxyXG4gICAgaWYgKChyZXN1bHQubGVuZ3RoIC0gMikgPCBzZWxmLk1JTl9FTkNPREVEX0NIQVJTIHx8ICFzZWxmLl9pc1N0YXJ0RW5kKHBhdHRlcm4pKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdmVyaWZ5IGVuZCB3aGl0ZSBzcGFjZVxyXG4gICAgaWYgKCFzZWxmLl92ZXJpZnlXaGl0ZXNwYWNlKHN0YXJ0LnN0YXJ0Q291bnRlciwgbmV4dFN0YXJ0IC0gOCkpe1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghc2VsZi5fdmFsaWRhdGVSZXN1bHQocmVzdWx0LCBzdGFydC5zdGFydENvdW50ZXIpKXtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBuZXh0U3RhcnQgPSBuZXh0U3RhcnQgPiBzZWxmLl9jb3VudGVycy5sZW5ndGggPyBzZWxmLl9jb3VudGVycy5sZW5ndGggOiBuZXh0U3RhcnQ7XHJcbiAgICBlbmQgPSBzdGFydC5zdGFydCArIHNlbGYuX3N1bUNvdW50ZXJzKHN0YXJ0LnN0YXJ0Q291bnRlciwgbmV4dFN0YXJ0IC0gOCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcclxuICAgICAgICBzdGFydDogc3RhcnQuc3RhcnQsXHJcbiAgICAgICAgZW5kOiBlbmQsXHJcbiAgICAgICAgc3RhcnRJbmZvOiBzdGFydCxcclxuICAgICAgICBkZWNvZGVkQ29kZXM6IHJlc3VsdFxyXG4gICAgfTtcclxufTtcclxuXHJcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlXaGl0ZXNwYWNlID0gZnVuY3Rpb24oc3RhcnRDb3VudGVyLCBlbmRDb3VudGVyKSB7XHJcbiAgICBpZiAoKHN0YXJ0Q291bnRlciAtIDEgPD0gMClcclxuICAgICAgICAgICAgfHwgdGhpcy5fY291bnRlcnNbc3RhcnRDb3VudGVyIC0gMV0gPj0gKHRoaXMuX2NhbGN1bGF0ZVBhdHRlcm5MZW5ndGgoc3RhcnRDb3VudGVyKSAvIDIuMCkpIHtcclxuICAgICAgICBpZiAoKGVuZENvdW50ZXIgKyA4ID49IHRoaXMuX2NvdW50ZXJzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHx8IHRoaXMuX2NvdW50ZXJzW2VuZENvdW50ZXIgKyA3XSA+PSAodGhpcy5fY2FsY3VsYXRlUGF0dGVybkxlbmd0aChlbmRDb3VudGVyKSAvIDIuMCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2NhbGN1bGF0ZVBhdHRlcm5MZW5ndGggPSBmdW5jdGlvbihvZmZzZXQpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIHN1bSA9IDA7XHJcblxyXG4gICAgZm9yIChpID0gb2Zmc2V0OyBpIDwgb2Zmc2V0ICsgNzsgaSsrKSB7XHJcbiAgICAgICAgc3VtICs9IHRoaXMuX2NvdW50ZXJzW2ldO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdW07XHJcbn07XHJcblxyXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fdGhyZXNob2xkUmVzdWx0UGF0dGVybiA9IGZ1bmN0aW9uKHJlc3VsdCwgc3RhcnRDb3VudGVyKXtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBjYXRlZ29yaXphdGlvbiA9IHtcclxuICAgICAgICAgICAgc3BhY2U6IHtcclxuICAgICAgICAgICAgICAgIG5hcnJvdzogeyBzaXplOiAwLCBjb3VudHM6IDAsIG1pbjogMCwgbWF4OiBOdW1iZXIuTUFYX1ZBTFVFfSxcclxuICAgICAgICAgICAgICAgIHdpZGU6IHtzaXplOiAwLCBjb3VudHM6IDAsIG1pbjogMCwgbWF4OiBOdW1iZXIuTUFYX1ZBTFVFfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBiYXI6IHtcclxuICAgICAgICAgICAgICAgIG5hcnJvdzogeyBzaXplOiAwLCBjb3VudHM6IDAsIG1pbjogMCwgbWF4OiBOdW1iZXIuTUFYX1ZBTFVFfSxcclxuICAgICAgICAgICAgICAgIHdpZGU6IHsgc2l6ZTogMCwgY291bnRzOiAwLCBtaW46IDAsIG1heDogTnVtYmVyLk1BWF9WQUxVRX1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAga2luZCxcclxuICAgICAgICBjYXQsXHJcbiAgICAgICAgaSxcclxuICAgICAgICBqLFxyXG4gICAgICAgIHBvcyA9IHN0YXJ0Q291bnRlcixcclxuICAgICAgICBwYXR0ZXJuO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIHBhdHRlcm4gPSBzZWxmLl9jaGFyVG9QYXR0ZXJuKHJlc3VsdFtpXSk7XHJcbiAgICAgICAgZm9yIChqID0gNjsgaiA+PSAwOyBqLS0pIHtcclxuICAgICAgICAgICAga2luZCA9IChqICYgMSkgPT09IDIgPyBjYXRlZ29yaXphdGlvbi5iYXIgOiBjYXRlZ29yaXphdGlvbi5zcGFjZTtcclxuICAgICAgICAgICAgY2F0ID0gKHBhdHRlcm4gJiAxKSA9PT0gMSA/IGtpbmQud2lkZSA6IGtpbmQubmFycm93O1xyXG4gICAgICAgICAgICBjYXQuc2l6ZSArPSBzZWxmLl9jb3VudGVyc1twb3MgKyBqXTtcclxuICAgICAgICAgICAgY2F0LmNvdW50cysrO1xyXG4gICAgICAgICAgICBwYXR0ZXJuID4+PSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwb3MgKz0gODtcclxuICAgIH1cclxuXHJcbiAgICBbXCJzcGFjZVwiLCBcImJhclwiXS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgIHZhciBuZXdraW5kID0gY2F0ZWdvcml6YXRpb25ba2V5XTtcclxuICAgICAgICBuZXdraW5kLndpZGUubWluID1cclxuICAgICAgICAgICAgTWF0aC5mbG9vcigobmV3a2luZC5uYXJyb3cuc2l6ZSAvIG5ld2tpbmQubmFycm93LmNvdW50cyArIG5ld2tpbmQud2lkZS5zaXplIC8gbmV3a2luZC53aWRlLmNvdW50cykgLyAyKTtcclxuICAgICAgICBuZXdraW5kLm5hcnJvdy5tYXggPSBNYXRoLmNlaWwobmV3a2luZC53aWRlLm1pbik7XHJcbiAgICAgICAgbmV3a2luZC53aWRlLm1heCA9IE1hdGguY2VpbCgobmV3a2luZC53aWRlLnNpemUgKiBzZWxmLk1BWF9BQ0NFUFRBQkxFICsgc2VsZi5QQURESU5HKSAvIG5ld2tpbmQud2lkZS5jb3VudHMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGNhdGVnb3JpemF0aW9uO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2NoYXJUb1BhdHRlcm4gPSBmdW5jdGlvbihjaGFyKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgY2hhckNvZGUgPSBjaGFyLmNoYXJDb2RlQXQoMCksXHJcbiAgICAgICAgaTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgc2VsZi5BTFBIQUJFVC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLkFMUEhBQkVUW2ldID09PSBjaGFyQ29kZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1NbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDB4MDtcclxufTtcclxuXHJcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl92YWxpZGF0ZVJlc3VsdCA9IGZ1bmN0aW9uKHJlc3VsdCwgc3RhcnRDb3VudGVyKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgdGhyZXNob2xkcyA9IHNlbGYuX3RocmVzaG9sZFJlc3VsdFBhdHRlcm4ocmVzdWx0LCBzdGFydENvdW50ZXIpLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgaixcclxuICAgICAgICBraW5kLFxyXG4gICAgICAgIGNhdCxcclxuICAgICAgICBzaXplLFxyXG4gICAgICAgIHBvcyA9IHN0YXJ0Q291bnRlcixcclxuICAgICAgICBwYXR0ZXJuO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwYXR0ZXJuID0gc2VsZi5fY2hhclRvUGF0dGVybihyZXN1bHRbaV0pO1xyXG4gICAgICAgIGZvciAoaiA9IDY7IGogPj0gMDsgai0tKSB7XHJcbiAgICAgICAgICAgIGtpbmQgPSAoaiAmIDEpID09PSAwID8gdGhyZXNob2xkcy5iYXIgOiB0aHJlc2hvbGRzLnNwYWNlO1xyXG4gICAgICAgICAgICBjYXQgPSAocGF0dGVybiAmIDEpID09PSAxID8ga2luZC53aWRlIDoga2luZC5uYXJyb3c7XHJcbiAgICAgICAgICAgIHNpemUgPSBzZWxmLl9jb3VudGVyc1twb3MgKyBqXTtcclxuICAgICAgICAgICAgaWYgKHNpemUgPCBjYXQubWluIHx8IHNpemUgPiBjYXQubWF4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGF0dGVybiA+Pj0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcG9zICs9IDg7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl9wYXR0ZXJuVG9DaGFyID0gZnVuY3Rpb24ocGF0dGVybikge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHNlbGYuQ0hBUkFDVEVSX0VOQ09ESU5HUy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1NbaV0gPT09IHBhdHRlcm4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoc2VsZi5BTFBIQUJFVFtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2NvbXB1dGVBbHRlcm5hdGluZ1RocmVzaG9sZCA9IGZ1bmN0aW9uKG9mZnNldCwgZW5kKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBtaW4gPSBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgIG1heCA9IDAsXHJcbiAgICAgICAgY291bnRlcjtcclxuXHJcbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBlbmQ7IGkgKz0gMil7XHJcbiAgICAgICAgY291bnRlciA9IHRoaXMuX2NvdW50ZXJzW2ldO1xyXG4gICAgICAgIGlmIChjb3VudGVyID4gbWF4KSB7XHJcbiAgICAgICAgICAgIG1heCA9IGNvdW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb3VudGVyIDwgbWluKSB7XHJcbiAgICAgICAgICAgIG1pbiA9IGNvdW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoKG1pbiArIG1heCkgLyAyLjApIHwgMDtcclxufTtcclxuXHJcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl90b1BhdHRlcm4gPSBmdW5jdGlvbihvZmZzZXQpIHtcclxuICAgIHZhciBudW1Db3VudGVycyA9IDcsXHJcbiAgICAgICAgZW5kID0gb2Zmc2V0ICsgbnVtQ291bnRlcnMsXHJcbiAgICAgICAgYmFyVGhyZXNob2xkLFxyXG4gICAgICAgIHNwYWNlVGhyZXNob2xkLFxyXG4gICAgICAgIGJpdG1hc2sgPSAxIDw8IChudW1Db3VudGVycyAtIDEpLFxyXG4gICAgICAgIHBhdHRlcm4gPSAwLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgdGhyZXNob2xkO1xyXG5cclxuICAgIGlmIChlbmQgPiB0aGlzLl9jb3VudGVycy5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgYmFyVGhyZXNob2xkID0gdGhpcy5fY29tcHV0ZUFsdGVybmF0aW5nVGhyZXNob2xkKG9mZnNldCwgZW5kKTtcclxuICAgIHNwYWNlVGhyZXNob2xkID0gdGhpcy5fY29tcHV0ZUFsdGVybmF0aW5nVGhyZXNob2xkKG9mZnNldCArIDEsIGVuZCk7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IG51bUNvdW50ZXJzOyBpKyspe1xyXG4gICAgICAgIHRocmVzaG9sZCA9IChpICYgMSkgPT09IDAgPyBiYXJUaHJlc2hvbGQgOiBzcGFjZVRocmVzaG9sZDtcclxuICAgICAgICBpZiAodGhpcy5fY291bnRlcnNbb2Zmc2V0ICsgaV0gPiB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgcGF0dGVybiB8PSBiaXRtYXNrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBiaXRtYXNrID4+PSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwYXR0ZXJuO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2lzU3RhcnRFbmQgPSBmdW5jdGlvbihwYXR0ZXJuKSB7XHJcbiAgICB2YXIgaTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5TVEFSVF9FTkQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcy5TVEFSVF9FTkRbaV0gPT09IHBhdHRlcm4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX3N1bUNvdW50ZXJzID0gZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc3VtID0gMDtcclxuXHJcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XHJcbiAgICAgICAgc3VtICs9IHRoaXMuX2NvdW50ZXJzW2ldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1bTtcclxufTtcclxuXHJcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl9maW5kU3RhcnQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBpLFxyXG4gICAgICAgIHBhdHRlcm4sXHJcbiAgICAgICAgc3RhcnQgPSBzZWxmLl9uZXh0VW5zZXQoc2VsZi5fcm93KSxcclxuICAgICAgICBlbmQ7XHJcblxyXG4gICAgZm9yIChpID0gMTsgaSA8IHRoaXMuX2NvdW50ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcGF0dGVybiA9IHNlbGYuX3RvUGF0dGVybihpKTtcclxuICAgICAgICBpZiAocGF0dGVybiAhPT0gLTEgJiYgc2VsZi5faXNTdGFydEVuZChwYXR0ZXJuKSkge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBMb29rIGZvciB3aGl0ZXNwYWNlIGFoZWFkXHJcbiAgICAgICAgICAgIHN0YXJ0ICs9IHNlbGYuX3N1bUNvdW50ZXJzKDAsIGkpO1xyXG4gICAgICAgICAgICBlbmQgPSBzdGFydCArIHNlbGYuX3N1bUNvdW50ZXJzKGksIGkgKyA4KTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcclxuICAgICAgICAgICAgICAgIGVuZDogZW5kLFxyXG4gICAgICAgICAgICAgICAgc3RhcnRDb3VudGVyOiBpLFxyXG4gICAgICAgICAgICAgICAgZW5kQ291bnRlcjogaSArIDhcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb2RhYmFyUmVhZGVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvY29kYWJhcl9yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgRUFOUmVhZGVyIGZyb20gJy4vZWFuX3JlYWRlcic7XHJcblxyXG5mdW5jdGlvbiBVUENSZWFkZXIoKSB7XHJcbiAgICBFQU5SZWFkZXIuY2FsbCh0aGlzKTtcclxufVxyXG5cclxudmFyIHByb3BlcnRpZXMgPSB7XHJcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJ1cGNfYVwiLCB3cml0ZWFibGU6IGZhbHNlfVxyXG59O1xyXG5cclxuVVBDUmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRUFOUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XHJcblVQQ1JlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBVUENSZWFkZXI7XHJcblxyXG5VUENSZWFkZXIucHJvdG90eXBlLl9kZWNvZGUgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciByZXN1bHQgPSBFQU5SZWFkZXIucHJvdG90eXBlLl9kZWNvZGUuY2FsbCh0aGlzKTtcclxuXHJcbiAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5jb2RlICYmIHJlc3VsdC5jb2RlLmxlbmd0aCA9PT0gMTMgJiYgcmVzdWx0LmNvZGUuY2hhckF0KDApID09PSBcIjBcIikge1xyXG4gICAgICAgIHJlc3VsdC5jb2RlID0gcmVzdWx0LmNvZGUuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVQQ1JlYWRlcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL3VwY19yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgRUFOUmVhZGVyIGZyb20gJy4vZWFuX3JlYWRlcic7XHJcblxyXG5mdW5jdGlvbiBFQU44UmVhZGVyKCkge1xyXG4gICAgRUFOUmVhZGVyLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbnZhciBwcm9wZXJ0aWVzID0ge1xyXG4gICAgRk9STUFUOiB7dmFsdWU6IFwiZWFuXzhcIiwgd3JpdGVhYmxlOiBmYWxzZX1cclxufTtcclxuXHJcbkVBTjhSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFQU5SZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcclxuRUFOOFJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFQU44UmVhZGVyO1xyXG5cclxuRUFOOFJlYWRlci5wcm90b3R5cGUuX2RlY29kZVBheWxvYWQgPSBmdW5jdGlvbihjb2RlLCByZXN1bHQsIGRlY29kZWRDb2Rlcykge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb2RlLmVuZCwgc2VsZi5DT0RFX0dfU1RBUlQpO1xyXG4gICAgICAgIGlmICghY29kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0LnB1c2goY29kZS5jb2RlKTtcclxuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb2RlID0gc2VsZi5fZmluZFBhdHRlcm4oc2VsZi5NSURETEVfUEFUVEVSTiwgY29kZS5lbmQsIHRydWUsIGZhbHNlKTtcclxuICAgIGlmIChjb2RlID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kLCBzZWxmLkNPREVfR19TVEFSVCk7XHJcbiAgICAgICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb2RlO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRUFOOFJlYWRlcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL2Vhbl84X3JlYWRlci5qc1xuICoqLyIsImltcG9ydCBFQU5SZWFkZXIgZnJvbSAnLi9lYW5fcmVhZGVyJztcclxuXHJcbmZ1bmN0aW9uIFVQQ0VSZWFkZXIoKSB7XHJcbiAgICBFQU5SZWFkZXIuY2FsbCh0aGlzKTtcclxufVxyXG5cclxudmFyIHByb3BlcnRpZXMgPSB7XHJcbiAgICBDT0RFX0ZSRVFVRU5DWToge3ZhbHVlOiBbXHJcbiAgICAgICAgWyA1NiwgNTIsIDUwLCA0OSwgNDQsIDM4LCAzNSwgNDIsIDQxLCAzNyBdLFxyXG4gICAgICAgIFs3LCAxMSwgMTMsIDE0LCAxOSwgMjUsIDI4LCAyMSwgMjIsIDI2XV19LFxyXG4gICAgU1RPUF9QQVRURVJOOiB7IHZhbHVlOiBbMSAvIDYgKiA3LCAxIC8gNiAqIDcsIDEgLyA2ICogNywgMSAvIDYgKiA3LCAxIC8gNiAqIDcsIDEgLyA2ICogN119LFxyXG4gICAgRk9STUFUOiB7dmFsdWU6IFwidXBjX2VcIiwgd3JpdGVhYmxlOiBmYWxzZX1cclxufTtcclxuXHJcblVQQ0VSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFQU5SZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcclxuVVBDRVJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBVUENFUmVhZGVyO1xyXG5cclxuVVBDRVJlYWRlci5wcm90b3R5cGUuX2RlY29kZVBheWxvYWQgPSBmdW5jdGlvbihjb2RlLCByZXN1bHQsIGRlY29kZWRDb2Rlcykge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgY29kZUZyZXF1ZW5jeSA9IDB4MDtcclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kKTtcclxuICAgICAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb2RlLmNvZGUgPj0gc2VsZi5DT0RFX0dfU1RBUlQpIHtcclxuICAgICAgICAgICAgY29kZS5jb2RlID0gY29kZS5jb2RlIC0gc2VsZi5DT0RFX0dfU1RBUlQ7XHJcbiAgICAgICAgICAgIGNvZGVGcmVxdWVuY3kgfD0gMSA8PCAoNSAtIGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUpO1xyXG4gICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFzZWxmLl9kZXRlcm1pbmVQYXJpdHkoY29kZUZyZXF1ZW5jeSwgcmVzdWx0KSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb2RlO1xyXG59O1xyXG5cclxuVVBDRVJlYWRlci5wcm90b3R5cGUuX2RldGVybWluZVBhcml0eSA9IGZ1bmN0aW9uKGNvZGVGcmVxdWVuY3ksIHJlc3VsdCkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgbnJTeXN0ZW07XHJcblxyXG4gICAgZm9yIChuclN5c3RlbSA9IDA7IG5yU3lzdGVtIDwgdGhpcy5DT0RFX0ZSRVFVRU5DWS5sZW5ndGg7IG5yU3lzdGVtKyspe1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgdGhpcy5DT0RFX0ZSRVFVRU5DWVtuclN5c3RlbV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGNvZGVGcmVxdWVuY3kgPT09IHRoaXMuQ09ERV9GUkVRVUVOQ1lbbnJTeXN0ZW1dW2ldKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQudW5zaGlmdChuclN5c3RlbSk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuVVBDRVJlYWRlci5wcm90b3R5cGUuX2NvbnZlcnRUb1VQQ0EgPSBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgIHZhciB1cGNhID0gW3Jlc3VsdFswXV0sXHJcbiAgICAgICAgbGFzdERpZ2l0ID0gcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAyXTtcclxuXHJcbiAgICBpZiAobGFzdERpZ2l0IDw9IDIpIHtcclxuICAgICAgICB1cGNhID0gdXBjYS5jb25jYXQocmVzdWx0LnNsaWNlKDEsIDMpKVxyXG4gICAgICAgICAgICAuY29uY2F0KFtsYXN0RGlnaXQsIDAsIDAsIDAsIDBdKVxyXG4gICAgICAgICAgICAuY29uY2F0KHJlc3VsdC5zbGljZSgzLCA2KSk7XHJcbiAgICB9IGVsc2UgaWYgKGxhc3REaWdpdCA9PT0gMykge1xyXG4gICAgICAgIHVwY2EgPSB1cGNhLmNvbmNhdChyZXN1bHQuc2xpY2UoMSwgNCkpXHJcbiAgICAgICAgICAgIC5jb25jYXQoWzAsIDAsIDAsIDAsIDBdKVxyXG4gICAgICAgICAgICAuY29uY2F0KHJlc3VsdC5zbGljZSg0LCA2KSk7XHJcbiAgICB9IGVsc2UgaWYgKGxhc3REaWdpdCA9PT0gNCkge1xyXG4gICAgICAgIHVwY2EgPSB1cGNhLmNvbmNhdChyZXN1bHQuc2xpY2UoMSwgNSkpXHJcbiAgICAgICAgICAgIC5jb25jYXQoWzAsIDAsIDAsIDAsIDAsIHJlc3VsdFs1XV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB1cGNhID0gdXBjYS5jb25jYXQocmVzdWx0LnNsaWNlKDEsIDYpKVxyXG4gICAgICAgICAgICAuY29uY2F0KFswLCAwLCAwLCAwLCBsYXN0RGlnaXRdKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGNhLnB1c2gocmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXSk7XHJcbiAgICByZXR1cm4gdXBjYTtcclxufTtcclxuXHJcblVQQ0VSZWFkZXIucHJvdG90eXBlLl9jaGVja3N1bSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgcmV0dXJuIEVBTlJlYWRlci5wcm90b3R5cGUuX2NoZWNrc3VtLmNhbGwodGhpcywgdGhpcy5fY29udmVydFRvVVBDQShyZXN1bHQpKTtcclxufTtcclxuXHJcblVQQ0VSZWFkZXIucHJvdG90eXBlLl9maW5kRW5kID0gZnVuY3Rpb24ob2Zmc2V0LCBpc1doaXRlKSB7XHJcbiAgICBpc1doaXRlID0gdHJ1ZTtcclxuICAgIHJldHVybiBFQU5SZWFkZXIucHJvdG90eXBlLl9maW5kRW5kLmNhbGwodGhpcywgb2Zmc2V0LCBpc1doaXRlKTtcclxufTtcclxuXHJcblVQQ0VSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbihlbmRJbmZvKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kO1xyXG5cclxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IGVuZEluZm8uZW5kICsgKChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpIC8gMik7XHJcbiAgICBpZiAodHJhaWxpbmdXaGl0ZXNwYWNlRW5kIDwgc2VsZi5fcm93Lmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKGVuZEluZm8uZW5kLCB0cmFpbGluZ1doaXRlc3BhY2VFbmQsIDApKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVQQ0VSZWFkZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci91cGNfZV9yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgQmFyY29kZVJlYWRlciBmcm9tICcuL2JhcmNvZGVfcmVhZGVyJztcclxuY29uc3QgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L21lcmdlJyk7XHJcblxyXG5mdW5jdGlvbiBJMm9mNVJlYWRlcihvcHRzKSB7XHJcbiAgICBvcHRzID0gbWVyZ2UoZ2V0RGVmYXVsQ29uZmlnKCksIG9wdHMpO1xyXG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMsIG9wdHMpO1xyXG4gICAgdGhpcy5iYXJTcGFjZVJhdGlvID0gWzEsIDFdO1xyXG4gICAgaWYgKG9wdHMubm9ybWFsaXplQmFyU3BhY2VXaWR0aCkge1xyXG4gICAgICAgIHRoaXMuU0lOR0xFX0NPREVfRVJST1IgPSAwLjM4O1xyXG4gICAgICAgIHRoaXMuQVZHX0NPREVfRVJST1IgPSAwLjA5O1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREZWZhdWxDb25maWcoKSB7XHJcbiAgICB2YXIgY29uZmlnID0ge307XHJcblxyXG4gICAgT2JqZWN0LmtleXMoSTJvZjVSZWFkZXIuQ09ORklHX0tFWVMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgY29uZmlnW2tleV0gPSBJMm9mNVJlYWRlci5DT05GSUdfS0VZU1trZXldLmRlZmF1bHQ7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBjb25maWc7XHJcbn1cclxuXHJcbnZhciBOID0gMSxcclxuICAgIFcgPSAzLFxyXG4gICAgcHJvcGVydGllcyA9IHtcclxuICAgICAgICBNT0RVTE86IHt2YWx1ZTogMTB9LFxyXG4gICAgICAgIFNUQVJUX1BBVFRFUk46IHt2YWx1ZTogW04gKiAyLjUsIE4gKiAyLjUsIE4gKiAyLjUsIE4gKiAyLjVdfSxcclxuICAgICAgICBTVE9QX1BBVFRFUk46IHt2YWx1ZTogW04gKiAyLCBOICogMiwgVyAqIDJdfSxcclxuICAgICAgICBDT0RFX1BBVFRFUk46IHt2YWx1ZTogW1xyXG4gICAgICAgICAgICBbTiwgTiwgVywgVywgTl0sXHJcbiAgICAgICAgICAgIFtXLCBOLCBOLCBOLCBXXSxcclxuICAgICAgICAgICAgW04sIFcsIE4sIE4sIFddLFxyXG4gICAgICAgICAgICBbVywgVywgTiwgTiwgTl0sXHJcbiAgICAgICAgICAgIFtOLCBOLCBXLCBOLCBXXSxcclxuICAgICAgICAgICAgW1csIE4sIFcsIE4sIE5dLFxyXG4gICAgICAgICAgICBbTiwgVywgVywgTiwgTl0sXHJcbiAgICAgICAgICAgIFtOLCBOLCBOLCBXLCBXXSxcclxuICAgICAgICAgICAgW1csIE4sIE4sIFcsIE5dLFxyXG4gICAgICAgICAgICBbTiwgVywgTiwgVywgTl1cclxuICAgICAgICBdfSxcclxuICAgICAgICBTSU5HTEVfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjc4LCB3cml0YWJsZTogdHJ1ZX0sXHJcbiAgICAgICAgQVZHX0NPREVfRVJST1I6IHt2YWx1ZTogMC4zOCwgd3JpdGFibGU6IHRydWV9LFxyXG4gICAgICAgIE1BWF9DT1JSRUNUSU9OX0ZBQ1RPUjoge3ZhbHVlOiA1fSxcclxuICAgICAgICBGT1JNQVQ6IHt2YWx1ZTogXCJpMm9mNVwifVxyXG4gICAgfTtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFyY29kZVJlYWRlci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBJMm9mNVJlYWRlcjtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hQYXR0ZXJuID0gZnVuY3Rpb24oY291bnRlciwgY29kZSkge1xyXG4gICAgaWYgKHRoaXMuY29uZmlnLm5vcm1hbGl6ZUJhclNwYWNlV2lkdGgpIHtcclxuICAgICAgICB2YXIgaSxcclxuICAgICAgICAgICAgY291bnRlclN1bSA9IFswLCAwXSxcclxuICAgICAgICAgICAgY29kZVN1bSA9IFswLCAwXSxcclxuICAgICAgICAgICAgY29ycmVjdGlvbiA9IFswLCAwXSxcclxuICAgICAgICAgICAgY29ycmVjdGlvblJhdGlvID0gdGhpcy5NQVhfQ09SUkVDVElPTl9GQUNUT1IsXHJcbiAgICAgICAgICAgIGNvcnJlY3Rpb25SYXRpb0ludmVyc2UgPSAxIC8gY29ycmVjdGlvblJhdGlvO1xyXG5cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb3VudGVyU3VtW2kgJSAyXSArPSBjb3VudGVyW2ldO1xyXG4gICAgICAgICAgICBjb2RlU3VtW2kgJSAyXSArPSBjb2RlW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb3JyZWN0aW9uWzBdID0gY29kZVN1bVswXSAvIGNvdW50ZXJTdW1bMF07XHJcbiAgICAgICAgY29ycmVjdGlvblsxXSA9IGNvZGVTdW1bMV0gLyBjb3VudGVyU3VtWzFdO1xyXG5cclxuICAgICAgICBjb3JyZWN0aW9uWzBdID0gTWF0aC5tYXgoTWF0aC5taW4oY29ycmVjdGlvblswXSwgY29ycmVjdGlvblJhdGlvKSwgY29ycmVjdGlvblJhdGlvSW52ZXJzZSk7XHJcbiAgICAgICAgY29ycmVjdGlvblsxXSA9IE1hdGgubWF4KE1hdGgubWluKGNvcnJlY3Rpb25bMV0sIGNvcnJlY3Rpb25SYXRpbyksIGNvcnJlY3Rpb25SYXRpb0ludmVyc2UpO1xyXG4gICAgICAgIHRoaXMuYmFyU3BhY2VSYXRpbyA9IGNvcnJlY3Rpb247XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY291bnRlcltpXSAqPSB0aGlzLmJhclNwYWNlUmF0aW9baSAlIDJdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBCYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hQYXR0ZXJuLmNhbGwodGhpcywgY291bnRlciwgY29kZSk7XHJcbn07XHJcblxyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2ZpbmRQYXR0ZXJuID0gZnVuY3Rpb24ocGF0dGVybiwgb2Zmc2V0LCBpc1doaXRlLCB0cnlIYXJkZXIpIHtcclxuICAgIHZhciBjb3VudGVyID0gW10sXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgaSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IDAsXHJcbiAgICAgICAgICAgIGVuZDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgaixcclxuICAgICAgICBzdW0sXHJcbiAgICAgICAgbm9ybWFsaXplZCxcclxuICAgICAgICBlcHNpbG9uID0gc2VsZi5BVkdfQ09ERV9FUlJPUjtcclxuXHJcbiAgICBpc1doaXRlID0gaXNXaGl0ZSB8fCBmYWxzZTtcclxuICAgIHRyeUhhcmRlciA9IHRyeUhhcmRlciB8fCBmYWxzZTtcclxuXHJcbiAgICBpZiAoIW9mZnNldCkge1xyXG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IHBhdHRlcm4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb3VudGVyW2ldID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBjb3VudGVyLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHN1bSA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IGNvdW50ZXIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gY291bnRlcltqXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWQgPSBzZWxmLl9ub3JtYWxpemUoY291bnRlcik7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKG5vcm1hbGl6ZWQsIHBhdHRlcm4pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBlcHNpbG9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guc3RhcnQgPSBpIC0gc3VtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZW5kID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJlc3RNYXRjaDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodHJ5SGFyZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGNvdW50ZXIubGVuZ3RoIC0gMjsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbal0gPSBjb3VudGVyW2ogKyAyXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyLmxlbmd0aCAtIDJdID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXIubGVuZ3RoIC0gMV0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MtLTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XHJcbiAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fZmluZFN0YXJ0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgbGVhZGluZ1doaXRlc3BhY2VTdGFydCxcclxuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3JvdyksXHJcbiAgICAgICAgc3RhcnRJbmZvLFxyXG4gICAgICAgIG5hcnJvd0JhcldpZHRoID0gMTtcclxuXHJcbiAgICB3aGlsZSAoIXN0YXJ0SW5mbykge1xyXG4gICAgICAgIHN0YXJ0SW5mbyA9IHNlbGYuX2ZpbmRQYXR0ZXJuKHNlbGYuU1RBUlRfUEFUVEVSTiwgb2Zmc2V0LCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgaWYgKCFzdGFydEluZm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5hcnJvd0JhcldpZHRoID0gTWF0aC5mbG9vcigoc3RhcnRJbmZvLmVuZCAtIHN0YXJ0SW5mby5zdGFydCkgLyA0KTtcclxuICAgICAgICBsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0ID0gc3RhcnRJbmZvLnN0YXJ0IC0gbmFycm93QmFyV2lkdGggKiAxMDtcclxuICAgICAgICBpZiAobGVhZGluZ1doaXRlc3BhY2VTdGFydCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQsIHN0YXJ0SW5mby5zdGFydCwgMCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGFydEluZm87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgb2Zmc2V0ID0gc3RhcnRJbmZvLmVuZDtcclxuICAgICAgICBzdGFydEluZm8gPSBudWxsO1xyXG4gICAgfVxyXG59O1xyXG5cclxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbihlbmRJbmZvKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kO1xyXG5cclxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IGVuZEluZm8uZW5kICsgKChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpIC8gMik7XHJcbiAgICBpZiAodHJhaWxpbmdXaGl0ZXNwYWNlRW5kIDwgc2VsZi5fcm93Lmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKGVuZEluZm8uZW5kLCB0cmFpbGluZ1doaXRlc3BhY2VFbmQsIDApKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9maW5kRW5kID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgZW5kSW5mbyxcclxuICAgICAgICB0bXA7XHJcblxyXG4gICAgc2VsZi5fcm93LnJldmVyc2UoKTtcclxuICAgIGVuZEluZm8gPSBzZWxmLl9maW5kUGF0dGVybihzZWxmLlNUT1BfUEFUVEVSTik7XHJcbiAgICBzZWxmLl9yb3cucmV2ZXJzZSgpO1xyXG5cclxuICAgIGlmIChlbmRJbmZvID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmV2ZXJzZSBudW1iZXJzXHJcbiAgICB0bXAgPSBlbmRJbmZvLnN0YXJ0O1xyXG4gICAgZW5kSW5mby5zdGFydCA9IHNlbGYuX3Jvdy5sZW5ndGggLSBlbmRJbmZvLmVuZDtcclxuICAgIGVuZEluZm8uZW5kID0gc2VsZi5fcm93Lmxlbmd0aCAtIHRtcDtcclxuXHJcbiAgICByZXR1cm4gZW5kSW5mbyAhPT0gbnVsbCA/IHNlbGYuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZShlbmRJbmZvKSA6IG51bGw7XHJcbn07XHJcblxyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2RlY29kZVBhaXIgPSBmdW5jdGlvbihjb3VudGVyUGFpcikge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgY29kZSxcclxuICAgICAgICBjb2RlcyA9IFtdLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVyUGFpci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvdW50ZXJQYWlyW2ldKTtcclxuICAgICAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvZGVzLnB1c2goY29kZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29kZXM7XHJcbn07XHJcblxyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2RlY29kZUNvZGUgPSBmdW5jdGlvbihjb3VudGVyKSB7XHJcbiAgICB2YXIgaixcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBzdW0gPSAwLFxyXG4gICAgICAgIG5vcm1hbGl6ZWQsXHJcbiAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgZXBzaWxvbiA9IHNlbGYuQVZHX0NPREVfRVJST1IsXHJcbiAgICAgICAgY29kZSxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IDAsXHJcbiAgICAgICAgICAgIGVuZDogMFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgZm9yICggaiA9IDA7IGogPCBjb3VudGVyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgc3VtICs9IGNvdW50ZXJbal07XHJcbiAgICB9XHJcbiAgICBub3JtYWxpemVkID0gc2VsZi5fbm9ybWFsaXplKGNvdW50ZXIpO1xyXG4gICAgaWYgKG5vcm1hbGl6ZWQpIHtcclxuICAgICAgICBmb3IgKGNvZGUgPSAwOyBjb2RlIDwgc2VsZi5DT0RFX1BBVFRFUk4ubGVuZ3RoOyBjb2RlKyspIHtcclxuICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4obm9ybWFsaXplZCwgc2VsZi5DT0RFX1BBVFRFUk5bY29kZV0pO1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IgPCBiZXN0TWF0Y2guZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb2RlID0gY29kZTtcclxuICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChiZXN0TWF0Y2guZXJyb3IgPCBlcHNpbG9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2RlY29kZVBheWxvYWQgPSBmdW5jdGlvbihjb3VudGVycywgcmVzdWx0LCBkZWNvZGVkQ29kZXMpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIHBvcyA9IDAsXHJcbiAgICAgICAgY291bnRlckxlbmd0aCA9IGNvdW50ZXJzLmxlbmd0aCxcclxuICAgICAgICBjb3VudGVyUGFpciA9IFtbMCwgMCwgMCwgMCwgMF0sIFswLCAwLCAwLCAwLCAwXV0sXHJcbiAgICAgICAgY29kZXM7XHJcblxyXG4gICAgd2hpbGUgKHBvcyA8IGNvdW50ZXJMZW5ndGgpIHtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJQYWlyWzBdW2ldID0gY291bnRlcnNbcG9zXSAqIHRoaXMuYmFyU3BhY2VSYXRpb1swXTtcclxuICAgICAgICAgICAgY291bnRlclBhaXJbMV1baV0gPSBjb3VudGVyc1twb3MgKyAxXSAqIHRoaXMuYmFyU3BhY2VSYXRpb1sxXTtcclxuICAgICAgICAgICAgcG9zICs9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvZGVzID0gc2VsZi5fZGVjb2RlUGFpcihjb3VudGVyUGFpcik7XHJcbiAgICAgICAgaWYgKCFjb2Rlcykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvZGVzW2ldLmNvZGUgKyBcIlwiKTtcclxuICAgICAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjb2RlcztcclxufTtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fdmVyaWZ5Q291bnRlckxlbmd0aCA9IGZ1bmN0aW9uKGNvdW50ZXJzKSB7XHJcbiAgICByZXR1cm4gKGNvdW50ZXJzLmxlbmd0aCAlIDEwID09PSAwKTtcclxufTtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc3RhcnRJbmZvLFxyXG4gICAgICAgIGVuZEluZm8sXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgY29kZSxcclxuICAgICAgICByZXN1bHQgPSBbXSxcclxuICAgICAgICBkZWNvZGVkQ29kZXMgPSBbXSxcclxuICAgICAgICBjb3VudGVycztcclxuXHJcbiAgICBzdGFydEluZm8gPSBzZWxmLl9maW5kU3RhcnQoKTtcclxuICAgIGlmICghc3RhcnRJbmZvKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBkZWNvZGVkQ29kZXMucHVzaChzdGFydEluZm8pO1xyXG5cclxuICAgIGVuZEluZm8gPSBzZWxmLl9maW5kRW5kKCk7XHJcbiAgICBpZiAoIWVuZEluZm8pIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb3VudGVycyA9IHNlbGYuX2ZpbGxDb3VudGVycyhzdGFydEluZm8uZW5kLCBlbmRJbmZvLnN0YXJ0LCBmYWxzZSk7XHJcbiAgICBpZiAoIXNlbGYuX3ZlcmlmeUNvdW50ZXJMZW5ndGgoY291bnRlcnMpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjb2RlID0gc2VsZi5fZGVjb2RlUGF5bG9hZChjb3VudGVycywgcmVzdWx0LCBkZWNvZGVkQ29kZXMpO1xyXG4gICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCAlIDIgIT09IDAgfHxcclxuICAgICAgICAgICAgcmVzdWx0Lmxlbmd0aCA8IDYpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBkZWNvZGVkQ29kZXMucHVzaChlbmRJbmZvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogcmVzdWx0LmpvaW4oXCJcIiksXHJcbiAgICAgICAgc3RhcnQ6IHN0YXJ0SW5mby5zdGFydCxcclxuICAgICAgICBlbmQ6IGVuZEluZm8uZW5kLFxyXG4gICAgICAgIHN0YXJ0SW5mbzogc3RhcnRJbmZvLFxyXG4gICAgICAgIGRlY29kZWRDb2RlczogZGVjb2RlZENvZGVzXHJcbiAgICB9O1xyXG59O1xyXG5cclxuSTJvZjVSZWFkZXIuQ09ORklHX0tFWVMgPSB7XHJcbiAgICBub3JtYWxpemVCYXJTcGFjZVdpZHRoOiB7XHJcbiAgICAgICAgJ3R5cGUnOiAnYm9vbGVhbicsXHJcbiAgICAgICAgJ2RlZmF1bHQnOiBmYWxzZSxcclxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnSWYgdHJ1ZSwgdGhlIHJlYWRlciB0cmllcyB0byBub3JtYWxpemUgdGhlJyArXHJcbiAgICAgICAgJ3dpZHRoLWRpZmZlcmVuY2UgYmV0d2VlbiBiYXJzIGFuZCBzcGFjZXMnXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJMm9mNVJlYWRlcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL2kyb2Y1X3JlYWRlci5qc1xuICoqLyIsInZhciBiYXNlTWVyZ2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlTWVyZ2UnKSxcbiAgICBjcmVhdGVBc3NpZ25lciA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2NyZWF0ZUFzc2lnbmVyJyk7XG5cbi8qKlxuICogUmVjdXJzaXZlbHkgbWVyZ2VzIG93biBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgdGhlIHNvdXJjZSBvYmplY3QocyksIHRoYXRcbiAqIGRvbid0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAgaW50byB0aGUgZGVzdGluYXRpb24gb2JqZWN0LiBTdWJzZXF1ZW50IHNvdXJjZXNcbiAqIG92ZXJ3cml0ZSBwcm9wZXJ0eSBhc3NpZ25tZW50cyBvZiBwcmV2aW91cyBzb3VyY2VzLiBJZiBgY3VzdG9taXplcmAgaXNcbiAqIHByb3ZpZGVkIGl0J3MgaW52b2tlZCB0byBwcm9kdWNlIHRoZSBtZXJnZWQgdmFsdWVzIG9mIHRoZSBkZXN0aW5hdGlvbiBhbmRcbiAqIHNvdXJjZSBwcm9wZXJ0aWVzLiBJZiBgY3VzdG9taXplcmAgcmV0dXJucyBgdW5kZWZpbmVkYCBtZXJnaW5nIGlzIGhhbmRsZWRcbiAqIGJ5IHRoZSBtZXRob2QgaW5zdGVhZC4gVGhlIGBjdXN0b21pemVyYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWRcbiAqIHdpdGggZml2ZSBhcmd1bWVudHM6IChvYmplY3RWYWx1ZSwgc291cmNlVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmVkIHZhbHVlcy5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY3VzdG9taXplcmAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSB7XG4gKiAgICdkYXRhJzogW3sgJ3VzZXInOiAnYmFybmV5JyB9LCB7ICd1c2VyJzogJ2ZyZWQnIH1dXG4gKiB9O1xuICpcbiAqIHZhciBhZ2VzID0ge1xuICogICAnZGF0YSc6IFt7ICdhZ2UnOiAzNiB9LCB7ICdhZ2UnOiA0MCB9XVxuICogfTtcbiAqXG4gKiBfLm1lcmdlKHVzZXJzLCBhZ2VzKTtcbiAqIC8vID0+IHsgJ2RhdGEnOiBbeyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYgfSwgeyAndXNlcic6ICdmcmVkJywgJ2FnZSc6IDQwIH1dIH1cbiAqXG4gKiAvLyB1c2luZyBhIGN1c3RvbWl6ZXIgY2FsbGJhY2tcbiAqIHZhciBvYmplY3QgPSB7XG4gKiAgICdmcnVpdHMnOiBbJ2FwcGxlJ10sXG4gKiAgICd2ZWdldGFibGVzJzogWydiZWV0J11cbiAqIH07XG4gKlxuICogdmFyIG90aGVyID0ge1xuICogICAnZnJ1aXRzJzogWydiYW5hbmEnXSxcbiAqICAgJ3ZlZ2V0YWJsZXMnOiBbJ2NhcnJvdCddXG4gKiB9O1xuICpcbiAqIF8ubWVyZ2Uob2JqZWN0LCBvdGhlciwgZnVuY3Rpb24oYSwgYikge1xuICogICBpZiAoXy5pc0FycmF5KGEpKSB7XG4gKiAgICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICogICB9XG4gKiB9KTtcbiAqIC8vID0+IHsgJ2ZydWl0cyc6IFsnYXBwbGUnLCAnYmFuYW5hJ10sICd2ZWdldGFibGVzJzogWydiZWV0JywgJ2NhcnJvdCddIH1cbiAqL1xudmFyIG1lcmdlID0gY3JlYXRlQXNzaWduZXIoYmFzZU1lcmdlKTtcblxubW9kdWxlLmV4cG9ydHMgPSBtZXJnZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9vYmplY3QvbWVyZ2UuanNcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFycmF5RWFjaCA9IHJlcXVpcmUoJy4vYXJyYXlFYWNoJyksXG4gICAgYmFzZU1lcmdlRGVlcCA9IHJlcXVpcmUoJy4vYmFzZU1lcmdlRGVlcCcpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNUeXBlZEFycmF5JyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWVyZ2VgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXJndW1lbnQganVnZ2xpbmcsXG4gKiBtdWx0aXBsZSBzb3VyY2VzLCBhbmQgYHRoaXNgIGJpbmRpbmcgYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdlZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBPVtdXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQj1bXV0gQXNzb2NpYXRlcyB2YWx1ZXMgd2l0aCBzb3VyY2UgY291bnRlcnBhcnRzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlKG9iamVjdCwgc291cmNlLCBjdXN0b21pemVyLCBzdGFja0EsIHN0YWNrQikge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIHZhciBpc1NyY0FyciA9IGlzQXJyYXlMaWtlKHNvdXJjZSkgJiYgKGlzQXJyYXkoc291cmNlKSB8fCBpc1R5cGVkQXJyYXkoc291cmNlKSksXG4gICAgICBwcm9wcyA9IGlzU3JjQXJyID8gdW5kZWZpbmVkIDoga2V5cyhzb3VyY2UpO1xuXG4gIGFycmF5RWFjaChwcm9wcyB8fCBzb3VyY2UsIGZ1bmN0aW9uKHNyY1ZhbHVlLCBrZXkpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGtleSA9IHNyY1ZhbHVlO1xuICAgICAgc3JjVmFsdWUgPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0TGlrZShzcmNWYWx1ZSkpIHtcbiAgICAgIHN0YWNrQSB8fCAoc3RhY2tBID0gW10pO1xuICAgICAgc3RhY2tCIHx8IChzdGFja0IgPSBbXSk7XG4gICAgICBiYXNlTWVyZ2VEZWVwKG9iamVjdCwgc291cmNlLCBrZXksIGJhc2VNZXJnZSwgY3VzdG9taXplciwgc3RhY2tBLCBzdGFja0IpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciB2YWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKHZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgaXNDb21tb24gPSByZXN1bHQgPT09IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKGlzQ29tbW9uKSB7XG4gICAgICAgIHJlc3VsdCA9IHNyY1ZhbHVlO1xuICAgICAgfVxuICAgICAgaWYgKChyZXN1bHQgIT09IHVuZGVmaW5lZCB8fCAoaXNTcmNBcnIgJiYgIShrZXkgaW4gb2JqZWN0KSkpICYmXG4gICAgICAgICAgKGlzQ29tbW9uIHx8IChyZXN1bHQgPT09IHJlc3VsdCA/IChyZXN1bHQgIT09IHZhbHVlKSA6ICh2YWx1ZSA9PT0gdmFsdWUpKSkpIHtcbiAgICAgICAgb2JqZWN0W2tleV0gPSByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlTWVyZ2U7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZU1lcmdlLmpzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZvckVhY2hgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUVhY2g7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvYXJyYXlFYWNoLmpzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhcnJheUNvcHkgPSByZXF1aXJlKCcuL2FycmF5Q29weScpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc1BsYWluT2JqZWN0JyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc1R5cGVkQXJyYXknKSxcbiAgICB0b1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy90b1BsYWluT2JqZWN0Jyk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlTWVyZ2VgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgbWVyZ2VzIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIG1lcmdlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gbWVyZ2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXJnZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1lcmdlIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdlZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBPVtdXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQj1bXV0gQXNzb2NpYXRlcyB2YWx1ZXMgd2l0aCBzb3VyY2UgY291bnRlcnBhcnRzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgbWVyZ2VGdW5jLCBjdXN0b21pemVyLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgbGVuZ3RoID0gc3RhY2tBLmxlbmd0aCxcbiAgICAgIHNyY1ZhbHVlID0gc291cmNlW2tleV07XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKHN0YWNrQVtsZW5ndGhdID09IHNyY1ZhbHVlKSB7XG4gICAgICBvYmplY3Rba2V5XSA9IHN0YWNrQltsZW5ndGhdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKHZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkgOiB1bmRlZmluZWQsXG4gICAgICBpc0NvbW1vbiA9IHJlc3VsdCA9PT0gdW5kZWZpbmVkO1xuXG4gIGlmIChpc0NvbW1vbikge1xuICAgIHJlc3VsdCA9IHNyY1ZhbHVlO1xuICAgIGlmIChpc0FycmF5TGlrZShzcmNWYWx1ZSkgJiYgKGlzQXJyYXkoc3JjVmFsdWUpIHx8IGlzVHlwZWRBcnJheShzcmNWYWx1ZSkpKSB7XG4gICAgICByZXN1bHQgPSBpc0FycmF5KHZhbHVlKVxuICAgICAgICA/IHZhbHVlXG4gICAgICAgIDogKGlzQXJyYXlMaWtlKHZhbHVlKSA/IGFycmF5Q29weSh2YWx1ZSkgOiBbXSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3Qoc3JjVmFsdWUpIHx8IGlzQXJndW1lbnRzKHNyY1ZhbHVlKSkge1xuICAgICAgcmVzdWx0ID0gaXNBcmd1bWVudHModmFsdWUpXG4gICAgICAgID8gdG9QbGFpbk9iamVjdCh2YWx1ZSlcbiAgICAgICAgOiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkgPyB2YWx1ZSA6IHt9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICAvLyBBZGQgdGhlIHNvdXJjZSB2YWx1ZSB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMgYW5kIGFzc29jaWF0ZVxuICAvLyBpdCB3aXRoIGl0cyBtZXJnZWQgdmFsdWUuXG4gIHN0YWNrQS5wdXNoKHNyY1ZhbHVlKTtcbiAgc3RhY2tCLnB1c2gocmVzdWx0KTtcblxuICBpZiAoaXNDb21tb24pIHtcbiAgICAvLyBSZWN1cnNpdmVseSBtZXJnZSBvYmplY3RzIGFuZCBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBvYmplY3Rba2V5XSA9IG1lcmdlRnVuYyhyZXN1bHQsIHNyY1ZhbHVlLCBjdXN0b21pemVyLCBzdGFja0EsIHN0YWNrQik7XG4gIH0gZWxzZSBpZiAocmVzdWx0ID09PSByZXN1bHQgPyAocmVzdWx0ICE9PSB2YWx1ZSkgOiAodmFsdWUgPT09IHZhbHVlKSkge1xuICAgIG9iamVjdFtrZXldID0gcmVzdWx0O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZU1lcmdlRGVlcDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlTWVyZ2VEZWVwLmpzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlDb3B5KHNvdXJjZSwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xuXG4gIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5Q29weTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9hcnJheUNvcHkuanNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNBcnJheUxpa2UnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSkgJiZcbiAgICBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiYgIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FyZ3VtZW50cztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL2lzQXJndW1lbnRzLmpzXG4gKiogbW9kdWxlIGlkID0gMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnZXRMZW5ndGggPSByZXF1aXJlKCcuL2dldExlbmd0aCcpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aChnZXRMZW5ndGgodmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5TGlrZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9pc0FycmF5TGlrZS5qc1xuICoqIG1vZHVsZSBpZCA9IDMyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYmFzZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9iYXNlUHJvcGVydHknKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBcImxlbmd0aFwiIHByb3BlcnR5IHZhbHVlIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXZvaWQgYSBbSklUIGJ1Z10oaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE0Mjc5MilcbiAqIHRoYXQgYWZmZWN0cyBTYWZhcmkgb24gYXQgbGVhc3QgaU9TIDguMS04LjMgQVJNNjQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBcImxlbmd0aFwiIHZhbHVlLlxuICovXG52YXIgZ2V0TGVuZ3RoID0gYmFzZVByb3BlcnR5KCdsZW5ndGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRMZW5ndGg7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvZ2V0TGVuZ3RoLmpzXG4gKiogbW9kdWxlIGlkID0gMzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVByb3BlcnR5O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2Jhc2VQcm9wZXJ0eS5qc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTGVuZ3RoO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2lzTGVuZ3RoLmpzXG4gKiogbW9kdWxlIGlkID0gMzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNPYmplY3RMaWtlLmpzXG4gKiogbW9kdWxlIGlkID0gMzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9nZXROYXRpdmUnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQXJyYXkgPSBnZXROYXRpdmUoQXJyYXksICdpc0FycmF5Jyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBuYXRpdmVJc0FycmF5IHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJyYXlUYWc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvbGFuZy9pc0FycmF5LmpzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc05hdGl2ZSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNOYXRpdmUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIHJldHVybiBpc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXROYXRpdmU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvZ2V0TmF0aXZlLmpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpID4gNSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZm5Ub1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZywgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIHJldHVybiByZUlzTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVJc0hvc3RDdG9yLnRlc3QodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTmF0aXZlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2xhbmcvaXNOYXRpdmUuanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaSB3aGljaCByZXR1cm4gJ2Z1bmN0aW9uJyBmb3IgcmVnZXhlc1xuICAvLyBhbmQgU2FmYXJpIDggd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgY29uc3RydWN0b3JzLlxuICByZXR1cm4gaXNPYmplY3QodmFsdWUpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL2lzRnVuY3Rpb24uanNcbiAqKiBtb2R1bGUgaWQgPSA0MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL2lzT2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiYXNlRm9ySW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlRm9ySW4nKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGFzc3VtZXMgb2JqZWN0cyBjcmVhdGVkIGJ5IHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3RvclxuICogaGF2ZSBubyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHZhciBDdG9yO1xuXG4gIC8vIEV4aXQgZWFybHkgZm9yIG5vbiBgT2JqZWN0YCBvYmplY3RzLlxuICBpZiAoIShpc09iamVjdExpa2UodmFsdWUpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IG9iamVjdFRhZyAmJiAhaXNBcmd1bWVudHModmFsdWUpKSB8fFxuICAgICAgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY29uc3RydWN0b3InKSAmJiAoQ3RvciA9IHZhbHVlLmNvbnN0cnVjdG9yLCB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmICEoQ3RvciBpbnN0YW5jZW9mIEN0b3IpKSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gSUUgPCA5IGl0ZXJhdGVzIGluaGVyaXRlZCBwcm9wZXJ0aWVzIGJlZm9yZSBvd24gcHJvcGVydGllcy4gSWYgdGhlIGZpcnN0XG4gIC8vIGl0ZXJhdGVkIHByb3BlcnR5IGlzIGFuIG9iamVjdCdzIG93biBwcm9wZXJ0eSB0aGVuIHRoZXJlIGFyZSBubyBpbmhlcml0ZWRcbiAgLy8gZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICB2YXIgcmVzdWx0O1xuICAvLyBJbiBtb3N0IGVudmlyb25tZW50cyBhbiBvYmplY3QncyBvd24gcHJvcGVydGllcyBhcmUgaXRlcmF0ZWQgYmVmb3JlXG4gIC8vIGl0cyBpbmhlcml0ZWQgcHJvcGVydGllcy4gSWYgdGhlIGxhc3QgaXRlcmF0ZWQgcHJvcGVydHkgaXMgYW4gb2JqZWN0J3NcbiAgLy8gb3duIHByb3BlcnR5IHRoZW4gdGhlcmUgYXJlIG5vIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gIGJhc2VGb3JJbih2YWx1ZSwgZnVuY3Rpb24oc3ViVmFsdWUsIGtleSkge1xuICAgIHJlc3VsdCA9IGtleTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQgPT09IHVuZGVmaW5lZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCByZXN1bHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUGxhaW5PYmplY3Q7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvbGFuZy9pc1BsYWluT2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiYXNlRm9yID0gcmVxdWlyZSgnLi9iYXNlRm9yJyksXG4gICAga2V5c0luID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXNJbicpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvckluYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9ySW4ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gYmFzZUZvcihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzSW4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGb3JJbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlRm9ySW4uanNcbiAqKiBtb2R1bGUgaWQgPSA0M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGNyZWF0ZUJhc2VGb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUJhc2VGb3InKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvckluYCBhbmQgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzXG4gKiBvdmVyIGBvYmplY3RgIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBpbnZva2luZyBgaXRlcmF0ZWVgIGZvclxuICogZWFjaCBwcm9wZXJ0eS4gSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5XG4gKiByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xudmFyIGJhc2VGb3IgPSBjcmVhdGVCYXNlRm9yKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZvcjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlRm9yLmpzXG4gKiogbW9kdWxlIGlkID0gNDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vdG9PYmplY3QnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgYmFzZSBmdW5jdGlvbiBmb3IgYF8uZm9ySW5gIG9yIGBfLmZvckluUmlnaHRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VGb3IoZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICAgIHZhciBpdGVyYWJsZSA9IHRvT2JqZWN0KG9iamVjdCksXG4gICAgICAgIHByb3BzID0ga2V5c0Z1bmMob2JqZWN0KSxcbiAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgICBpbmRleCA9IGZyb21SaWdodCA/IGxlbmd0aCA6IC0xO1xuXG4gICAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVba2V5XSwga2V5LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUJhc2VGb3I7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvY3JlYXRlQmFzZUZvci5qc1xuICoqIG1vZHVsZSBpZCA9IDQ1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhbiBvYmplY3QgaWYgaXQncyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgb2JqZWN0LlxuICovXG5mdW5jdGlvbiB0b09iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3QodmFsdWUpID8gdmFsdWUgOiBPYmplY3QodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvT2JqZWN0O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL3RvT2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzSW5kZXgnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICB9XG4gIHZhciBsZW5ndGggPSBvYmplY3QubGVuZ3RoO1xuICBsZW5ndGggPSAobGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpICYmIGxlbmd0aCkgfHwgMDtcblxuICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBpc1Byb3RvID0gdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0LFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKSxcbiAgICAgIHNraXBJbmRleGVzID0gbGVuZ3RoID4gMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSAoaW5kZXggKyAnJyk7XG4gIH1cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKHNraXBJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSAmJlxuICAgICAgICAhKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXNJbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9vYmplY3Qva2V5c0luLmpzXG4gKiogbW9kdWxlIGlkID0gNDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eXFxkKyQvO1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIHZhbHVlID0gKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgPyArdmFsdWUgOiAtMTtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0luZGV4O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2lzSW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA0OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPSB0eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPSB0eXBlZEFycmF5VGFnc1ttYXBUYWddID1cbnR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID1cbnR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzZXRUYWddID1cbnR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPSB0eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW29ialRvU3RyaW5nLmNhbGwodmFsdWUpXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1R5cGVkQXJyYXk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvbGFuZy9pc1R5cGVkQXJyYXkuanNcbiAqKiBtb2R1bGUgaWQgPSA0OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGJhc2VDb3B5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUNvcHknKSxcbiAgICBrZXlzSW4gPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5c0luJyk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHBsYWluIG9iamVjdCBmbGF0dGVuaW5nIGluaGVyaXRlZCBlbnVtZXJhYmxlXG4gKiBwcm9wZXJ0aWVzIG9mIGB2YWx1ZWAgdG8gb3duIHByb3BlcnRpZXMgb2YgdGhlIHBsYWluIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgcGxhaW4gb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBuZXcgRm9vKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIgfVxuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIF8udG9QbGFpbk9iamVjdChuZXcgRm9vKSk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyLCAnYyc6IDMgfVxuICovXG5mdW5jdGlvbiB0b1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBiYXNlQ29weSh2YWx1ZSwga2V5c0luKHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9QbGFpbk9iamVjdDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL3RvUGxhaW5PYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA1MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3BpZXMgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IG5hbWVzIHRvIGNvcHkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlQ29weShzb3VyY2UsIHByb3BzLCBvYmplY3QpIHtcbiAgb2JqZWN0IHx8IChvYmplY3QgPSB7fSk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIG9iamVjdFtrZXldID0gc291cmNlW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ29weTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlQ29weS5qc1xuICoqIG1vZHVsZSBpZCA9IDUxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvZ2V0TmF0aXZlJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0FycmF5TGlrZScpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpLFxuICAgIHNoaW1LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvc2hpbUtleXMnKTtcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2tleXMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xudmFyIGtleXMgPSAhbmF0aXZlS2V5cyA/IHNoaW1LZXlzIDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIHZhciBDdG9yID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3QuY29uc3RydWN0b3I7XG4gIGlmICgodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0KSB8fFxuICAgICAgKHR5cGVvZiBvYmplY3QgIT0gJ2Z1bmN0aW9uJyAmJiBpc0FycmF5TGlrZShvYmplY3QpKSkge1xuICAgIHJldHVybiBzaGltS2V5cyhvYmplY3QpO1xuICB9XG4gIHJldHVybiBpc09iamVjdChvYmplY3QpID8gbmF0aXZlS2V5cyhvYmplY3QpIDogW107XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvb2JqZWN0L2tleXMuanNcbiAqKiBtb2R1bGUgaWQgPSA1MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9pc0luZGV4JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAga2V5c0luID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXNJbicpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBIGZhbGxiYWNrIGltcGxlbWVudGF0aW9uIG9mIGBPYmplY3Qua2V5c2Agd2hpY2ggY3JlYXRlcyBhbiBhcnJheSBvZiB0aGVcbiAqIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBzaGltS2V5cyhvYmplY3QpIHtcbiAgdmFyIHByb3BzID0ga2V5c0luKG9iamVjdCksXG4gICAgICBwcm9wc0xlbmd0aCA9IHByb3BzLmxlbmd0aCxcbiAgICAgIGxlbmd0aCA9IHByb3BzTGVuZ3RoICYmIG9iamVjdC5sZW5ndGg7XG5cbiAgdmFyIGFsbG93SW5kZXhlcyA9ICEhbGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBwcm9wc0xlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKChhbGxvd0luZGV4ZXMgJiYgaXNJbmRleChrZXksIGxlbmd0aCkpIHx8IGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNoaW1LZXlzO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL3NoaW1LZXlzLmpzXG4gKiogbW9kdWxlIGlkID0gNTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCcuL2JpbmRDYWxsYmFjaycpLFxuICAgIGlzSXRlcmF0ZWVDYWxsID0gcmVxdWlyZSgnLi9pc0l0ZXJhdGVlQ2FsbCcpLFxuICAgIHJlc3RQYXJhbSA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9uL3Jlc3RQYXJhbScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBgXy5hc3NpZ25gLCBgXy5kZWZhdWx0c2AsIG9yIGBfLm1lcmdlYCBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIHJlc3RQYXJhbShmdW5jdGlvbihvYmplY3QsIHNvdXJjZXMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gb2JqZWN0ID09IG51bGwgPyAwIDogc291cmNlcy5sZW5ndGgsXG4gICAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPiAyID8gc291cmNlc1tsZW5ndGggLSAyXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgZ3VhcmQgPSBsZW5ndGggPiAyID8gc291cmNlc1syXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgdGhpc0FyZyA9IGxlbmd0aCA+IDEgPyBzb3VyY2VzW2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicpIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSBiaW5kQ2FsbGJhY2soY3VzdG9taXplciwgdGhpc0FyZywgNSk7XG4gICAgICBsZW5ndGggLT0gMjtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VzdG9taXplciA9IHR5cGVvZiB0aGlzQXJnID09ICdmdW5jdGlvbicgPyB0aGlzQXJnIDogdW5kZWZpbmVkO1xuICAgICAgbGVuZ3RoIC09IChjdXN0b21pemVyID8gMSA6IDApO1xuICAgIH1cbiAgICBpZiAoZ3VhcmQgJiYgaXNJdGVyYXRlZUNhbGwoc291cmNlc1swXSwgc291cmNlc1sxXSwgZ3VhcmQpKSB7XG4gICAgICBjdXN0b21pemVyID0gbGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IGN1c3RvbWl6ZXI7XG4gICAgICBsZW5ndGggPSAxO1xuICAgIH1cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBhc3NpZ25lcihvYmplY3QsIHNvdXJjZSwgY3VzdG9taXplcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUFzc2lnbmVyO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2NyZWF0ZUFzc2lnbmVyLmpzXG4gKiogbW9kdWxlIGlkID0gNTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpZGVudGl0eSA9IHJlcXVpcmUoJy4uL3V0aWxpdHkvaWRlbnRpdHknKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VDYWxsYmFja2Agd2hpY2ggb25seSBzdXBwb3J0cyBgdGhpc2AgYmluZGluZ1xuICogYW5kIHNwZWNpZnlpbmcgdGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGJpbmQuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJnQ291bnRdIFRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjYWxsYmFjay5cbiAqL1xuZnVuY3Rpb24gYmluZENhbGxiYWNrKGZ1bmMsIHRoaXNBcmcsIGFyZ0NvdW50KSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5O1xuICB9XG4gIGlmICh0aGlzQXJnID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZnVuYztcbiAgfVxuICBzd2l0Y2ggKGFyZ0NvdW50KSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDQ6IHJldHVybiBmdW5jdGlvbihhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH07XG4gICAgY2FzZSA1OiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBvdGhlciwga2V5LCBvYmplY3QsIHNvdXJjZSk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kQ2FsbGJhY2s7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvYmluZENhbGxiYWNrLmpzXG4gKiogbW9kdWxlIGlkID0gNTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgcHJvdmlkZWQgdG8gaXQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsaXR5XG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKlxuICogXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3Q7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpZGVudGl0eTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC91dGlsaXR5L2lkZW50aXR5LmpzXG4gKiogbW9kdWxlIGlkID0gNTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9pc0luZGV4JyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBwcm92aWRlZCBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0l0ZXJhdGVlQ2FsbCh2YWx1ZSwgaW5kZXgsIG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgaW5kZXg7XG4gIGlmICh0eXBlID09ICdudW1iZXInXG4gICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgOiAodHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3QpKSB7XG4gICAgdmFyIG90aGVyID0gb2JqZWN0W2luZGV4XTtcbiAgICByZXR1cm4gdmFsdWUgPT09IHZhbHVlID8gKHZhbHVlID09PSBvdGhlcikgOiAob3RoZXIgIT09IG90aGVyKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJdGVyYXRlZUNhbGw7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNJdGVyYXRlZUNhbGwuanNcbiAqKiBtb2R1bGUgaWQgPSA1N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXg7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlXG4gKiBjcmVhdGVkIGZ1bmN0aW9uIGFuZCBhcmd1bWVudHMgZnJvbSBgc3RhcnRgIGFuZCBiZXlvbmQgcHJvdmlkZWQgYXMgYW4gYXJyYXkuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGJhc2VkIG9uIHRoZSBbcmVzdCBwYXJhbWV0ZXJdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9GdW5jdGlvbnMvcmVzdF9wYXJhbWV0ZXJzKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBzYXkgPSBfLnJlc3RQYXJhbShmdW5jdGlvbih3aGF0LCBuYW1lcykge1xuICogICByZXR1cm4gd2hhdCArICcgJyArIF8uaW5pdGlhbChuYW1lcykuam9pbignLCAnKSArXG4gKiAgICAgKF8uc2l6ZShuYW1lcykgPiAxID8gJywgJiAnIDogJycpICsgXy5sYXN0KG5hbWVzKTtcbiAqIH0pO1xuICpcbiAqIHNheSgnaGVsbG8nLCAnZnJlZCcsICdiYXJuZXknLCAncGViYmxlcycpO1xuICogLy8gPT4gJ2hlbGxvIGZyZWQsIGJhcm5leSwgJiBwZWJibGVzJ1xuICovXG5mdW5jdGlvbiByZXN0UGFyYW0oZnVuYywgc3RhcnQpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogKCtzdGFydCB8fCAwKSwgMCk7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWF4KGFyZ3MubGVuZ3RoIC0gc3RhcnQsIDApLFxuICAgICAgICByZXN0ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICByZXN0W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIHN3aXRjaCAoc3RhcnQpIHtcbiAgICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCByZXN0KTtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcmdzWzBdLCByZXN0KTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcmdzWzBdLCBhcmdzWzFdLCByZXN0KTtcbiAgICB9XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgaW5kZXggPSAtMTtcbiAgICB3aGlsZSAoKytpbmRleCA8IHN0YXJ0KSB7XG4gICAgICBvdGhlckFyZ3NbaW5kZXhdID0gYXJnc1tpbmRleF07XG4gICAgfVxuICAgIG90aGVyQXJnc1tzdGFydF0gPSByZXN0O1xuICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzdFBhcmFtO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2Z1bmN0aW9uL3Jlc3RQYXJhbS5qc1xuICoqIG1vZHVsZSBpZCA9IDU4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgZXZlbnRzID0ge307XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RXZlbnQoZXZlbnROYW1lKSB7XHJcbiAgICAgICAgaWYgKCFldmVudHNbZXZlbnROYW1lXSkge1xyXG4gICAgICAgICAgICBldmVudHNbZXZlbnROYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgIHN1YnNjcmliZXJzOiBbXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZXZlbnRzW2V2ZW50TmFtZV07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xlYXJFdmVudHMoKXtcclxuICAgICAgICBldmVudHMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwdWJsaXNoU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbiwgZGF0YSkge1xyXG4gICAgICAgIGlmIChzdWJzY3JpcHRpb24uYXN5bmMpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5jYWxsYmFjayhkYXRhKTtcclxuICAgICAgICAgICAgfSwgNCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uLmNhbGxiYWNrKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdWJzY3JpYmUoZXZlbnQsIGNhbGxiYWNrLCBhc3luYykge1xyXG4gICAgICAgIHZhciBzdWJzY3JpcHRpb247XHJcblxyXG4gICAgICAgIGlmICggdHlwZW9mIGNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IGFzeW5jXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgIGlmICghc3Vic2NyaXB0aW9uLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkNhbGxiYWNrIHdhcyBub3Qgc3BlY2lmaWVkIG9uIG9wdGlvbnNcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0RXZlbnQoZXZlbnQpLnN1YnNjcmliZXJzLnB1c2goc3Vic2NyaXB0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrLCBhc3luYykge1xyXG4gICAgICAgICAgICByZXR1cm4gc3Vic2NyaWJlKGV2ZW50LCBjYWxsYmFjaywgYXN5bmMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHVibGlzaDogZnVuY3Rpb24oZXZlbnROYW1lLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudCA9IGdldEV2ZW50KGV2ZW50TmFtZSksXHJcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVycyA9IGV2ZW50LnN1YnNjcmliZXJzO1xyXG5cclxuICAgICAgICAgICAgZXZlbnQuc3Vic2NyaWJlcnMgPSBzdWJzY3JpYmVycy5maWx0ZXIoZnVuY3Rpb24oc3Vic2NyaWJlcikge1xyXG4gICAgICAgICAgICAgICAgcHVibGlzaFN1YnNjcmlwdGlvbihzdWJzY3JpYmVyLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhc3Vic2NyaWJlci5vbmNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uY2U6IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaywgYXN5bmMpIHtcclxuICAgICAgICAgICAgc3Vic2NyaWJlKGV2ZW50LCB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXHJcbiAgICAgICAgICAgICAgICBhc3luYzogYXN5bmMsXHJcbiAgICAgICAgICAgICAgICBvbmNlOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50O1xyXG5cclxuICAgICAgICAgICAgaWYgKGV2ZW50TmFtZSkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBnZXRFdmVudChldmVudE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50ICYmIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3Vic2NyaWJlcnMgPSBldmVudC5zdWJzY3JpYmVycy5maWx0ZXIoZnVuY3Rpb24oc3Vic2NyaWJlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJzY3JpYmVyLmNhbGxiYWNrICE9PSBjYWxsYmFjaztcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3Vic2NyaWJlcnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyRXZlbnRzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59KSgpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vZXZlbnRzLmpzXG4gKiovIiwiY29uc3QgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L21lcmdlJyk7XHJcblxyXG52YXIgc3RyZWFtUmVmLFxyXG4gICAgbG9hZGVkRGF0YUhhbmRsZXI7XHJcblxyXG4vKipcclxuICogV3JhcHMgYnJvd3Nlci1zcGVjaWZpYyBnZXRVc2VyTWVkaWFcclxuICogQHBhcmFtIHtPYmplY3R9IGNvbnN0cmFpbnRzXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdWNjZXNzIENhbGxiYWNrXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBmYWlsdXJlIENhbGxiYWNrXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRVc2VyTWVkaWEoY29uc3RyYWludHMsIHN1Y2Nlc3MsIGZhaWx1cmUpIHtcclxuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzLCBmdW5jdGlvbiAoc3RyZWFtKSB7XHJcbiAgICAgICAgICAgIHN0cmVhbVJlZiA9IHN0cmVhbTtcclxuICAgICAgICAgICAgdmFyIHZpZGVvU3JjID0gKHdpbmRvdy5VUkwgJiYgd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKSkgfHwgc3RyZWFtO1xyXG4gICAgICAgICAgICBzdWNjZXNzLmFwcGx5KG51bGwsIFt2aWRlb1NyY10pO1xyXG4gICAgICAgIH0sIGZhaWx1cmUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBmYWlsdXJlKG5ldyBUeXBlRXJyb3IoXCJnZXRVc2VyTWVkaWEgbm90IGF2YWlsYWJsZVwiKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRlZERhdGEodmlkZW8sIGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgYXR0ZW1wdHMgPSAxMDtcclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja1ZpZGVvKCkge1xyXG4gICAgICAgIGlmIChhdHRlbXB0cyA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHZpZGVvLnZpZGVvV2lkdGggPiAwICYmIHZpZGVvLnZpZGVvSGVpZ2h0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHZpZGVvLnZpZGVvV2lkdGggKyBcInB4IHggXCIgKyB2aWRlby52aWRlb0hlaWdodCArIFwicHhcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2hlY2tWaWRlbywgNTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCdVbmFibGUgdG8gcGxheSB2aWRlbyBzdHJlYW0uIElzIHdlYmNhbSB3b3JraW5nPycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhdHRlbXB0cy0tO1xyXG4gICAgfVxyXG4gICAgY2hlY2tWaWRlbygpO1xyXG59XHJcblxyXG4vKipcclxuICogVHJpZXMgdG8gYXR0YWNoIHRoZSBjYW1lcmEtc3RyZWFtIHRvIGEgZ2l2ZW4gdmlkZW8tZWxlbWVudFxyXG4gKiBhbmQgY2FsbHMgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gdGhlIGNvbnRlbnQgaXMgcmVhZHlcclxuICogQHBhcmFtIHtPYmplY3R9IGNvbnN0cmFpbnRzXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB2aWRlb1xyXG4gKiBAcGFyYW0ge09iamVjdH0gY2FsbGJhY2tcclxuICovXHJcbmZ1bmN0aW9uIGluaXRDYW1lcmEoY29uc3RyYWludHMsIHZpZGVvLCBjYWxsYmFjaykge1xyXG4gICAgZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzLCBmdW5jdGlvbihzcmMpIHtcclxuICAgICAgICB2aWRlby5zcmMgPSBzcmM7XHJcbiAgICAgICAgaWYgKGxvYWRlZERhdGFIYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIHZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkZWRkYXRhXCIsIGxvYWRlZERhdGFIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvYWRlZERhdGFIYW5kbGVyID0gbG9hZGVkRGF0YS5iaW5kKG51bGwsIHZpZGVvLCBjYWxsYmFjayk7XHJcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkZGF0YScsIGxvYWRlZERhdGFIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICAgICAgdmlkZW8ucGxheSgpO1xyXG4gICAgfSwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGNhbGxiYWNrKGUpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBOb3JtYWxpemVzIHRoZSBpbmNvbWluZyBjb25zdHJhaW50cyB0byBzYXRpc2Z5IHRoZSBjdXJyZW50IGJyb3dzZXJcclxuICogQHBhcmFtIGNvbmZpZ1xyXG4gKiBAcGFyYW0gY2IgQ2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIHdoZW5ldmVyIGNvbnN0cmFpbnRzIGFyZSBjcmVhdGVkXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZnVuY3Rpb24gbm9ybWFsaXplQ29uc3RyYWludHMoY29uZmlnLCBjYikge1xyXG4gICAgdmFyIGNvbnN0cmFpbnRzID0ge1xyXG4gICAgICAgICAgICBhdWRpbzogZmFsc2UsXHJcbiAgICAgICAgICAgIHZpZGVvOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB2aWRlb0NvbnN0cmFpbnRzID0gbWVyZ2Uoe1xyXG4gICAgICAgICAgICB3aWR0aDogNjQwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDQ4MCxcclxuICAgICAgICAgICAgbWluQXNwZWN0UmF0aW86IDAsXHJcbiAgICAgICAgICAgIG1heEFzcGVjdFJhdGlvOiAxMDAsXHJcbiAgICAgICAgICAgIGZhY2luZzogXCJlbnZpcm9ubWVudFwiXHJcbiAgICAgICAgfSwgY29uZmlnKTtcclxuXHJcbiAgICBpZiAoIHR5cGVvZiBNZWRpYVN0cmVhbVRyYWNrICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgTWVkaWFTdHJlYW1UcmFjay5nZXRTb3VyY2VzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIE1lZGlhU3RyZWFtVHJhY2suZ2V0U291cmNlcyhmdW5jdGlvbihzb3VyY2VJbmZvcykge1xyXG4gICAgICAgICAgICB2YXIgdmlkZW9Tb3VyY2VJZDtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VJbmZvcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNvdXJjZUluZm8gPSBzb3VyY2VJbmZvc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2VJbmZvLmtpbmQgPT09IFwidmlkZW9cIiAmJiBzb3VyY2VJbmZvLmZhY2luZyA9PT0gdmlkZW9Db25zdHJhaW50cy5mYWNpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICB2aWRlb1NvdXJjZUlkID0gc291cmNlSW5mby5pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdHJhaW50cy52aWRlbyA9IHtcclxuICAgICAgICAgICAgICAgIG1hbmRhdG9yeToge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbldpZHRoOiB2aWRlb0NvbnN0cmFpbnRzLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pbkhlaWdodDogdmlkZW9Db25zdHJhaW50cy5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluQXNwZWN0UmF0aW86IHZpZGVvQ29uc3RyYWludHMubWluQXNwZWN0UmF0aW8sXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4QXNwZWN0UmF0aW86IHZpZGVvQ29uc3RyYWludHMubWF4QXNwZWN0UmF0aW9cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvcHRpb25hbDogW3tcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VJZDogdmlkZW9Tb3VyY2VJZFxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIGNiKGNvbnN0cmFpbnRzKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3RyYWludHMudmlkZW8gPSB7XHJcbiAgICAgICAgICAgIG1lZGlhU291cmNlOiBcImNhbWVyYVwiLFxyXG4gICAgICAgICAgICB3aWR0aDogeyBtaW46IHZpZGVvQ29uc3RyYWludHMud2lkdGgsIG1heDogdmlkZW9Db25zdHJhaW50cy53aWR0aCB9LFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHsgbWluOiB2aWRlb0NvbnN0cmFpbnRzLmhlaWdodCwgbWF4OiB2aWRlb0NvbnN0cmFpbnRzLmhlaWdodCB9LFxyXG4gICAgICAgICAgICByZXF1aXJlOiBbXCJ3aWR0aFwiLCBcImhlaWdodFwiXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGNiKGNvbnN0cmFpbnRzKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcXVlc3RzIHRoZSBiYWNrLWZhY2luZyBjYW1lcmEgb2YgdGhlIHVzZXIuIFRoZSBjYWxsYmFjayBpcyBjYWxsZWRcclxuICogd2hlbmV2ZXIgdGhlIHN0cmVhbSBpcyByZWFkeSB0byBiZSBjb25zdW1lZCwgb3IgaWYgYW4gZXJyb3Igb2NjdXJlcy5cclxuICogQHBhcmFtIHtPYmplY3R9IHZpZGVvXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjYWxsYmFja1xyXG4gKi9cclxuZnVuY3Rpb24gcmVxdWVzdCh2aWRlbywgdmlkZW9Db25zdHJhaW50cywgY2FsbGJhY2spIHtcclxuICAgIG5vcm1hbGl6ZUNvbnN0cmFpbnRzKHZpZGVvQ29uc3RyYWludHMsIGZ1bmN0aW9uKGNvbnN0cmFpbnRzKSB7XHJcbiAgICAgICAgaW5pdENhbWVyYShjb25zdHJhaW50cywgdmlkZW8sIGNhbGxiYWNrKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICByZXF1ZXN0OiBmdW5jdGlvbih2aWRlbywgY29uc3RyYWludHMsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmVxdWVzdCh2aWRlbywgY29uc3RyYWludHMsIGNhbGxiYWNrKTtcclxuICAgIH0sXHJcbiAgICByZWxlYXNlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgdHJhY2tzID0gc3RyZWFtUmVmICYmIHN0cmVhbVJlZi5nZXRWaWRlb1RyYWNrcygpO1xyXG4gICAgICAgIGlmICh0cmFja3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRyYWNrc1swXS5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0cmVhbVJlZiA9IG51bGw7XHJcbiAgICB9XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2lucHV0L2NhbWVyYV9hY2Nlc3MuanNcbiAqKi8iLCJpbXBvcnQgSW1hZ2VEZWJ1ZyBmcm9tICcuLi9jb21tb24vaW1hZ2VfZGVidWcnO1xyXG5cclxuZnVuY3Rpb24gY29udGFpbnMoY29kZVJlc3VsdCwgbGlzdCkge1xyXG4gICAgaWYgKGxpc3QpIHtcclxuICAgICAgICByZXR1cm4gbGlzdC5zb21lKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhpdGVtKS5ldmVyeShmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbVtrZXldID09PSBjb2RlUmVzdWx0W2tleV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXNzZXNGaWx0ZXIoY29kZVJlc3VsdCwgZmlsdGVyKSB7XHJcbiAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHJldHVybiBmaWx0ZXIoY29kZVJlc3VsdCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihjb25maWcpIHtcclxuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSxcclxuICAgICAgICAgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSxcclxuICAgICAgICAgICAgcmVzdWx0cyA9IFtdLFxyXG4gICAgICAgICAgICBjYXBhY2l0eSA9IGNvbmZpZy5jYXBhY2l0eSB8fCAyMCxcclxuICAgICAgICAgICAgY2FwdHVyZSA9IGNvbmZpZy5jYXB0dXJlID09PSB0cnVlO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBtYXRjaGVzQ29uc3RyYWludHMoY29kZVJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2FwYWNpdHlcclxuICAgICAgICAgICAgICAgICYmIGNvZGVSZXN1bHRcclxuICAgICAgICAgICAgICAgICYmICFjb250YWlucyhjb2RlUmVzdWx0LCBjb25maWcuYmxhY2tsaXN0KVxyXG4gICAgICAgICAgICAgICAgJiYgcGFzc2VzRmlsdGVyKGNvZGVSZXN1bHQsIGNvbmZpZy5maWx0ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWRkUmVzdWx0OiBmdW5jdGlvbihkYXRhLCBpbWFnZVNpemUsIGNvZGVSZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlc0NvbnN0cmFpbnRzKGNvZGVSZXN1bHQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwYWNpdHktLTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuY29kZVJlc3VsdCA9IGNvZGVSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhcHR1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gaW1hZ2VTaXplLng7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBpbWFnZVNpemUueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3SW1hZ2UoZGF0YSwgaW1hZ2VTaXplLCBjdHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZnJhbWUgPSBjYW52YXMudG9EYXRhVVJMKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRSZXN1bHRzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvYW5hbHl0aWNzL3Jlc3VsdF9jb2xsZWN0b3IuanNcbiAqKi8iLCJsZXQgY29uZmlnO1xyXG5cclxuaWYgKEVOVi5kZXZlbG9wbWVudCl7XHJcbiAgICBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZy5kZXYuanMnKTtcclxufSBlbHNlIGlmIChFTlYubm9kZSkge1xyXG4gICAgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcubm9kZS5qcycpO1xyXG59IGVsc2Uge1xyXG4gICAgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcucHJvZC5qcycpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvbmZpZy9jb25maWcuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGlucHV0U3RyZWFtOiB7XHJcbiAgICAgICAgdHlwZTogXCJJbWFnZVN0cmVhbVwiLFxyXG4gICAgICAgIHNlcXVlbmNlOiBmYWxzZSxcclxuICAgICAgICBzaXplOiA4MDAsXHJcbiAgICAgICAgYXJlYToge1xyXG4gICAgICAgICAgICB0b3A6IFwiMCVcIixcclxuICAgICAgICAgICAgcmlnaHQ6IFwiMCVcIixcclxuICAgICAgICAgICAgbGVmdDogXCIwJVwiLFxyXG4gICAgICAgICAgICBib3R0b206IFwiMCVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2luZ2xlQ2hhbm5lbDogZmFsc2UgLy8gdHJ1ZTogb25seSB0aGUgcmVkIGNvbG9yLWNoYW5uZWwgaXMgcmVhZFxyXG4gICAgfSxcclxuICAgIGxvY2F0ZTogdHJ1ZSxcclxuICAgIG51bU9mV29ya2VyczogMCxcclxuICAgIGRlY29kZXI6IHtcclxuICAgICAgICByZWFkZXJzOiBbXHJcbiAgICAgICAgICAgICdjb2RlXzEyOF9yZWFkZXInXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIGxvY2F0b3I6IHtcclxuICAgICAgICBoYWxmU2FtcGxlOiB0cnVlLFxyXG4gICAgICAgIHBhdGNoU2l6ZTogXCJtZWRpdW1cIiAvLyB4LXNtYWxsLCBzbWFsbCwgbWVkaXVtLCBsYXJnZSwgeC1sYXJnZVxyXG4gICAgfVxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9jb25maWcvY29uZmlnLm5vZGUuanNcbiAqKi8iLCJjb25zdCBHZXRQaXhlbHMgPSByZXF1aXJlKFwiZ2V0LXBpeGVsc1wiKTtcclxuXHJcbnZhciBJbnB1dFN0cmVhbSA9IHt9O1xyXG5cclxuSW5wdXRTdHJlYW0uY3JlYXRlSW1hZ2VTdHJlYW0gPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciB0aGF0ID0ge307XHJcbiAgICB2YXIgX2NvbmZpZyA9IG51bGw7XHJcblxyXG4gICAgdmFyIHdpZHRoID0gMCxcclxuICAgICAgICBoZWlnaHQgPSAwLFxyXG4gICAgICAgIGZyYW1lSWR4ID0gMCxcclxuICAgICAgICBwYXVzZWQgPSB0cnVlLFxyXG4gICAgICAgIGxvYWRlZCA9IGZhbHNlLFxyXG4gICAgICAgIGZyYW1lID0gbnVsbCxcclxuICAgICAgICBiYXNlVXJsLFxyXG4gICAgICAgIGVuZGVkID0gZmFsc2UsXHJcbiAgICAgICAgc2l6ZSxcclxuICAgICAgICBjYWxjdWxhdGVkV2lkdGgsXHJcbiAgICAgICAgY2FsY3VsYXRlZEhlaWdodCxcclxuICAgICAgICBfZXZlbnROYW1lcyA9IFsnY2FucmVjb3JkJywgJ2VuZGVkJ10sXHJcbiAgICAgICAgX2V2ZW50SGFuZGxlcnMgPSB7fSxcclxuICAgICAgICBfdG9wUmlnaHQgPSB7eDogMCwgeTogMH0sXHJcbiAgICAgICAgX2NhbnZhc1NpemUgPSB7eDogMCwgeTogMH07XHJcblxyXG4gICAgZnVuY3Rpb24gbG9hZEltYWdlcygpIHtcclxuICAgICAgICBsb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICBHZXRQaXhlbHMoYmFzZVVybCwgZnVuY3Rpb24oZXJyLCBwaXhlbHMpIHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgIGV4aXQoMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocGl4ZWxzLnNoYXBlKTtcclxuICAgICAgICAgICAgZnJhbWUgPSBwaXhlbHM7XHJcbiAgICAgICAgICAgIHdpZHRoID0gcGl4ZWxzLnNoYXBlWzBdO1xyXG4gICAgICAgICAgICBoZWlnaHQgPSBwaXhlbHMuc2hhcGVbMV07XHJcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRXaWR0aCA9IF9jb25maWcuc2l6ZSA/IHdpZHRoL2hlaWdodCA+IDEgPyBfY29uZmlnLnNpemUgOiBNYXRoLmZsb29yKCh3aWR0aC9oZWlnaHQpICogX2NvbmZpZy5zaXplKSA6IHdpZHRoO1xyXG4gICAgICAgICAgICBjYWxjdWxhdGVkSGVpZ2h0ID0gX2NvbmZpZy5zaXplID8gd2lkdGgvaGVpZ2h0ID4gMSA/IE1hdGguZmxvb3IoKGhlaWdodC93aWR0aCkgKiBfY29uZmlnLnNpemUpIDogX2NvbmZpZy5zaXplIDogaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgX2NhbnZhc1NpemUueCA9IGNhbGN1bGF0ZWRXaWR0aDtcclxuICAgICAgICAgICAgX2NhbnZhc1NpemUueSA9IGNhbGN1bGF0ZWRIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcHVibGlzaEV2ZW50KFwiY2FucmVjb3JkXCIsIFtdKTtcclxuICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHVibGlzaEV2ZW50KGV2ZW50TmFtZSwgYXJncykge1xyXG4gICAgICAgIHZhciBqLFxyXG4gICAgICAgICAgICBoYW5kbGVycyA9IF9ldmVudEhhbmRsZXJzW2V2ZW50TmFtZV07XHJcblxyXG4gICAgICAgIGlmIChoYW5kbGVycyAmJiBoYW5kbGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgaGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZXJzW2pdLmFwcGx5KHRoYXQsIGFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICB0aGF0LnRyaWdnZXIgPSBwdWJsaXNoRXZlbnQ7XHJcblxyXG4gICAgdGhhdC5nZXRXaWR0aCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBjYWxjdWxhdGVkV2lkdGg7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGN1bGF0ZWRIZWlnaHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2V0V2lkdGggPSBmdW5jdGlvbih3aWR0aCkge1xyXG4gICAgICAgIGNhbGN1bGF0ZWRXaWR0aCA9IHdpZHRoO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldEhlaWdodCA9IGZ1bmN0aW9uKGhlaWdodCkge1xyXG4gICAgICAgIGNhbGN1bGF0ZWRIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0UmVhbFdpZHRoID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHdpZHRoO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFJlYWxIZWlnaHQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gaGVpZ2h0O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldElucHV0U3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgX2NvbmZpZyA9IHN0cmVhbTtcclxuICAgICAgICBiYXNlVXJsID0gX2NvbmZpZy5zcmM7XHJcbiAgICAgICAgc2l6ZSA9IDE7XHJcbiAgICAgICAgbG9hZEltYWdlcygpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmVuZGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGVuZGVkO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldEF0dHJpYnV0ZSA9IGZ1bmN0aW9uKCkge307XHJcblxyXG4gICAgdGhhdC5nZXRDb25maWcgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gX2NvbmZpZztcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5wYXVzZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHBhdXNlZCA9IHRydWU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucGxheSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHBhdXNlZCA9IGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24odGltZSkge1xyXG4gICAgICAgIGZyYW1lSWR4ID0gdGltZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGYpIHtcclxuICAgICAgICBpZiAoX2V2ZW50TmFtZXMuaW5kZXhPZihldmVudCkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIGlmICghX2V2ZW50SGFuZGxlcnNbZXZlbnRdKSB7XHJcbiAgICAgICAgICAgICAgICBfZXZlbnRIYW5kbGVyc1tldmVudF0gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfZXZlbnRIYW5kbGVyc1tldmVudF0ucHVzaChmKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2V0VG9wUmlnaHQgPSBmdW5jdGlvbih0b3BSaWdodCkge1xyXG4gICAgICAgIF90b3BSaWdodC54ID0gdG9wUmlnaHQueDtcclxuICAgICAgICBfdG9wUmlnaHQueSA9IHRvcFJpZ2h0Lnk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0VG9wUmlnaHQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gX3RvcFJpZ2h0O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldENhbnZhc1NpemUgPSBmdW5jdGlvbihzaXplKSB7XHJcbiAgICAgICAgX2NhbnZhc1NpemUueCA9IHNpemUueDtcclxuICAgICAgICBfY2FudmFzU2l6ZS55ID0gc2l6ZS55O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldENhbnZhc1NpemUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gX2NhbnZhc1NpemU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0RnJhbWUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoIWxvYWRlZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZnJhbWU7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dFN0cmVhbTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9saWIvaW5wdXRfc3RyZWFtLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ2V0LXBpeGVsc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZ2V0LXBpeGVsc1wiXG4gKiogbW9kdWxlIGlkID0gNjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImNvbnN0IENWVXRpbHMgPSByZXF1aXJlKCcuLi9zcmMvY29tbW9uL2N2X3V0aWxzJyksXHJcbiAgICAgIE5kYXJyYXkgPSByZXF1aXJlKFwibmRhcnJheVwiKSxcclxuICAgICAgSW50ZXJwMkQgPSByZXF1aXJlKFwibmRhcnJheS1saW5lYXItaW50ZXJwb2xhdGVcIikuZDI7XHJcblxyXG52YXIgRnJhbWVHcmFiYmVyID0ge307XHJcblxyXG5GcmFtZUdyYWJiZXIuY3JlYXRlID0gZnVuY3Rpb24oaW5wdXRTdHJlYW0pIHtcclxuICAgIHZhciBfdGhhdCA9IHt9LFxyXG4gICAgICAgIF9zdHJlYW1Db25maWcgPSBpbnB1dFN0cmVhbS5nZXRDb25maWcoKSxcclxuICAgICAgICBfdmlkZW9fc2l6ZSA9IENWVXRpbHMuaW1hZ2VSZWYoaW5wdXRTdHJlYW0uZ2V0UmVhbFdpZHRoKCksIGlucHV0U3RyZWFtLmdldFJlYWxIZWlnaHQoKSksXHJcbiAgICAgICAgX2NhbnZhc1NpemUgPSBpbnB1dFN0cmVhbS5nZXRDYW52YXNTaXplKCksXHJcbiAgICAgICAgX3NpemUgPSBDVlV0aWxzLmltYWdlUmVmKGlucHV0U3RyZWFtLmdldFdpZHRoKCksIGlucHV0U3RyZWFtLmdldEhlaWdodCgpKSxcclxuICAgICAgICBfdG9wUmlnaHQgPSBpbnB1dFN0cmVhbS5nZXRUb3BSaWdodCgpLFxyXG4gICAgICAgIF9kYXRhID0gbmV3IFVpbnQ4QXJyYXkoX3NpemUueCAqIF9zaXplLnkpLFxyXG4gICAgICAgIF9ncmF5RGF0YSA9IG5ldyBVaW50OEFycmF5KF92aWRlb19zaXplLnggKiBfdmlkZW9fc2l6ZS55KSxcclxuICAgICAgICBfY2FudmFzRGF0YSA9IG5ldyBVaW50OEFycmF5KF9jYW52YXNTaXplLnggKiBfY2FudmFzU2l6ZS55KSxcclxuICAgICAgICBfZ3JheUltYWdlQXJyYXkgPSBOZGFycmF5KF9ncmF5RGF0YSwgW192aWRlb19zaXplLnksIF92aWRlb19zaXplLnhdKS50cmFuc3Bvc2UoMSwgMCksXHJcbiAgICAgICAgX2NhbnZhc0ltYWdlQXJyYXkgPSBOZGFycmF5KF9jYW52YXNEYXRhLCBbX2NhbnZhc1NpemUueSwgX2NhbnZhc1NpemUueF0pLnRyYW5zcG9zZSgxLCAwKSxcclxuICAgICAgICBfdGFyZ2V0SW1hZ2VBcnJheSA9IF9jYW52YXNJbWFnZUFycmF5LmhpKF90b3BSaWdodC54ICsgX3NpemUueCwgX3RvcFJpZ2h0LnkgKyBfc2l6ZS55KS5sbyhfdG9wUmlnaHQueCwgX3RvcFJpZ2h0LnkpLFxyXG4gICAgICAgIF9zdGVwU2l6ZVggPSBfdmlkZW9fc2l6ZS54L19jYW52YXNTaXplLngsXHJcbiAgICAgICAgX3N0ZXBTaXplWSA9IF92aWRlb19zaXplLnkvX2NhbnZhc1NpemUueTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIkZyYW1lR3JhYmJlclwiLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgdmlkZW9TaXplOiBfZ3JheUltYWdlQXJyYXkuc2hhcGUsXHJcbiAgICAgICAgY2FudmFzU2l6ZTogX2NhbnZhc0ltYWdlQXJyYXkuc2hhcGUsXHJcbiAgICAgICAgc3RlcFNpemU6IFtfc3RlcFNpemVYLCBfc3RlcFNpemVZXSxcclxuICAgICAgICBzaXplOiBfdGFyZ2V0SW1hZ2VBcnJheS5zaGFwZSxcclxuICAgICAgICB0b3BSaWdodDogX3RvcFJpZ2h0XHJcbiAgICB9KSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VzIHRoZSBnaXZlbiBhcnJheSBhcyBmcmFtZS1idWZmZXJcclxuICAgICAqL1xyXG4gICAgX3RoYXQuYXR0YWNoRGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBfZGF0YSA9IGRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdXNlZCBmcmFtZS1idWZmZXJcclxuICAgICAqL1xyXG4gICAgX3RoYXQuZ2V0RGF0YSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBfZGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGZXRjaGVzIGEgZnJhbWUgZnJvbSB0aGUgaW5wdXQtc3RyZWFtIGFuZCBwdXRzIGludG8gdGhlIGZyYW1lLWJ1ZmZlci5cclxuICAgICAqIFRoZSBpbWFnZS1kYXRhIGlzIGNvbnZlcnRlZCB0byBncmF5LXNjYWxlIGFuZCB0aGVuIGhhbGYtc2FtcGxlZCBpZiBjb25maWd1cmVkLlxyXG4gICAgICovXHJcbiAgICBfdGhhdC5ncmFiID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGZyYW1lID0gaW5wdXRTdHJlYW0uZ2V0RnJhbWUoKTtcclxuXHJcbiAgICAgICAgaWYgKGZyYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGVBbmRDcm9wKGZyYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgX3RoYXQuc2NhbGVBbmRDcm9wID0gZnVuY3Rpb24oZnJhbWUpIHtcclxuICAgICAgICB2YXIgeCxcclxuICAgICAgICAgICAgeTtcclxuXHJcbiAgICAgICAgLy8gMS4gY29tcHV0ZSBmdWxsLXNpemVkIGdyYXkgaW1hZ2VcclxuICAgICAgICBDVlV0aWxzLmNvbXB1dGVHcmF5KGZyYW1lLmRhdGEsIF9ncmF5RGF0YSk7XHJcblxyXG4gICAgICAgIC8vIDIuIGludGVycG9sYXRlXHJcbiAgICAgICAgZm9yICh5ID0gMDsgeSA8IF9jYW52YXNTaXplLnk7IHkrKykge1xyXG4gICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgX2NhbnZhc1NpemUueDsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICBfY2FudmFzSW1hZ2VBcnJheS5zZXQoeCwgeSwgKEludGVycDJEKF9ncmF5SW1hZ2VBcnJheSwgeCAqIF9zdGVwU2l6ZVgsIHkgKiBfc3RlcFNpemVZKSkgfCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdGFyZ2V0SW1hZ2VBcnJheSBtdXN0IGJlIGVxdWFsIHRvIHRhcmdldFNpemVcclxuICAgICAgICBpZiAoX3RhcmdldEltYWdlQXJyYXkuc2hhcGVbMF0gIT09IF9zaXplLnggfHxcclxuICAgICAgICAgICAgX3RhcmdldEltYWdlQXJyYXkuc2hhcGVbMV0gIT09IF9zaXplLnkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hhcGVzIGRvIG5vdCBtYXRjaCFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAzLiBjcm9wXHJcbiAgICAgICAgZm9yICh5ID0gMDsgeSA8IF9zaXplLnk7IHkrKykge1xyXG4gICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgX3NpemUueDsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICBfZGF0YVt5ICogX3NpemUueCArIHhdID0gX3RhcmdldEltYWdlQXJyYXkuZ2V0KHgsIHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfdGhhdC5nZXRTaXplID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zaXplO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gX3RoYXQ7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZyYW1lR3JhYmJlcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9saWIvZnJhbWVfZ3JhYmJlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5kYXJyYXlcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIm5kYXJyYXlcIlxuICoqIG1vZHVsZSBpZCA9IDY3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZGFycmF5LWxpbmVhci1pbnRlcnBvbGF0ZVwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwibmRhcnJheS1saW5lYXItaW50ZXJwb2xhdGVcIlxuICoqIG1vZHVsZSBpZCA9IDY4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9