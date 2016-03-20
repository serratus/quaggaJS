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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDI0OTY0NjVhYWRmNWQ0NDcwMmEiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3F1YWdnYS5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvY29tbW9uL3R5cGVkZWZzLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vaW1hZ2Vfd3JhcHBlci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvY29tbW9uL3N1YkltYWdlLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vY3ZfdXRpbHMuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvbW1vbi9jbHVzdGVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImdsLW1hdHJpeFwiIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vYXJyYXlfaGVscGVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9sb2NhdG9yL2JhcmNvZGVfbG9jYXRvci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvY29tbW9uL2ltYWdlX2RlYnVnLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9sb2NhdG9yL3Jhc3Rlcml6ZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2xvY2F0b3IvdHJhY2VyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9sb2NhdG9yL3NrZWxldG9uaXplci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvZGVjb2Rlci9iYXJjb2RlX2RlY29kZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2RlY29kZXIvYnJlc2VuaGFtLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvY29kZV8xMjhfcmVhZGVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvYmFyY29kZV9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9lYW5fcmVhZGVyLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvY29kZV8zOV9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9jb2RlXzM5X3Zpbl9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9jb2RhYmFyX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL3VwY19yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9lYW5fOF9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci91cGNfZV9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9pMm9mNV9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvb2JqZWN0L21lcmdlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2Jhc2VNZXJnZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9hcnJheUVhY2guanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZU1lcmdlRGVlcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9hcnJheUNvcHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbGFuZy9pc0FyZ3VtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9pc0FycmF5TGlrZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9nZXRMZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2lzTGVuZ3RoLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2lzT2JqZWN0TGlrZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9sYW5nL2lzQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvZ2V0TmF0aXZlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvaXNOYXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbGFuZy9pc0Z1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvaXNPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbGFuZy9pc1BsYWluT2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2Jhc2VGb3JJbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlRm9yLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2ludGVybmFsL2NyZWF0ZUJhc2VGb3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaW50ZXJuYWwvdG9PYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvb2JqZWN0L2tleXNJbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9pc0luZGV4LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvaXNUeXBlZEFycmF5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2xhbmcvdG9QbGFpbk9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlQ29weS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9zaGltS2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9jcmVhdGVBc3NpZ25lci5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9iaW5kQ2FsbGJhY2suanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvdXRpbGl0eS9pZGVudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pbnRlcm5hbC9pc0l0ZXJhdGVlQ2FsbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9mdW5jdGlvbi9yZXN0UGFyYW0uanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvbW1vbi9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2lucHV0L2NhbWVyYV9hY2Nlc3MuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvc3JjL2FuYWx5dGljcy9yZXN1bHRfY29sbGVjdG9yLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jb25maWcvY29uZmlnLmpzIiwid2VicGFjazovLy9EOi93b3JrL3F1YWdnYUpTL3NyYy9jb25maWcvY29uZmlnLm5vZGUuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvbGliL2lucHV0X3N0cmVhbS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJnZXQtcGl4ZWxzXCIiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvcXVhZ2dhSlMvbGliL2ZyYW1lX2dyYWJiZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmRhcnJheVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5kYXJyYXktbGluZWFyLWludGVycG9sYXRlXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUs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LENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDZixFQUFD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RyxHQUFHLENBQUMsRUFBQztBQUM1RCxpQkFBWSxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQztBQUM1QyxpQkFBWSxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNmLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNmLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNmLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNmLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNmLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNmLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNmLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNmLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNmLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUNsQixFQUFDO0FBQ0Ysc0JBQWlCLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7QUFDaEQsbUJBQWMsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztBQUM3QywwQkFBcUIs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LEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDMUIsc0JBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2NBQ3hEO1VBQ0o7TUFDSixFQUVELEtBQUssQ0FBQyxPQUFPLEdBQUcsWUFBVztBQUN2QixnQkFBTyxLQUFLLENBQUM7TUFDaEIsQ0FBQzs7QUFFRixZQUFPLEtBQUssQ0FBQztFQUNoQixDQUFDOztBQUVGLE9BQU0sQ0FBQyxPQUFPLEdBQUcsWUFBWSxDOzs7Ozs7QUM5RjdCLHFDOzs7Ozs7QUNBQSx3RCIsImZpbGUiOiJxdWFnZ2EuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAwMjQ5NjQ2NWFhZGY1ZDQ0NzAyYVxuICoqLyIsImltcG9ydCBUeXBlRGVmcyBmcm9tICcuL2NvbW1vbi90eXBlZGVmcyc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuaW1wb3J0IEltYWdlV3JhcHBlciBmcm9tICcuL2NvbW1vbi9pbWFnZV93cmFwcGVyJztcclxuaW1wb3J0IEJhcmNvZGVMb2NhdG9yIGZyb20gJy4vbG9jYXRvci9iYXJjb2RlX2xvY2F0b3InO1xyXG5pbXBvcnQgQmFyY29kZURlY29kZXIgZnJvbSAnLi9kZWNvZGVyL2JhcmNvZGVfZGVjb2Rlcic7XHJcbmltcG9ydCBFdmVudHMgZnJvbSAnLi9jb21tb24vZXZlbnRzJztcclxuaW1wb3J0IENhbWVyYUFjY2VzcyBmcm9tICcuL2lucHV0L2NhbWVyYV9hY2Nlc3MnO1xyXG5pbXBvcnQgSW1hZ2VEZWJ1ZyBmcm9tICcuL2NvbW1vbi9pbWFnZV9kZWJ1Zyc7XHJcbmltcG9ydCB7dmVjMn0gZnJvbSAnZ2wtbWF0cml4JztcclxuaW1wb3J0IFJlc3VsdENvbGxlY3RvciBmcm9tICcuL2FuYWx5dGljcy9yZXN1bHRfY29sbGVjdG9yJztcclxuaW1wb3J0IENvbmZpZyBmcm9tICcuL2NvbmZpZy9jb25maWcnO1xyXG5pbXBvcnQgSW5wdXRTdHJlYW0gZnJvbSAnaW5wdXRfc3RyZWFtJztcclxuaW1wb3J0IEZyYW1lR3JhYmJlciBmcm9tICdmcmFtZV9ncmFiYmVyJztcclxuXHJcbmNvbnN0IG1lcmdlID0gcmVxdWlyZSgnbG9kYXNoL29iamVjdC9tZXJnZScpO1xyXG5cclxudmFyIF9pbnB1dFN0cmVhbSxcclxuICAgIF9mcmFtZWdyYWJiZXIsXHJcbiAgICBfc3RvcHBlZCxcclxuICAgIF9jYW52YXNDb250YWluZXIgPSB7XHJcbiAgICAgICAgY3R4OiB7XHJcbiAgICAgICAgICAgIGltYWdlOiBudWxsLFxyXG4gICAgICAgICAgICBvdmVybGF5OiBudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkb206IHtcclxuICAgICAgICAgICAgaW1hZ2U6IG51bGwsXHJcbiAgICAgICAgICAgIG92ZXJsYXk6IG51bGxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgX2lucHV0SW1hZ2VXcmFwcGVyLFxyXG4gICAgX2JveFNpemUsXHJcbiAgICBfZGVjb2RlcixcclxuICAgIF93b3JrZXJQb29sID0gW10sXHJcbiAgICBfb25VSVRocmVhZCA9IHRydWUsXHJcbiAgICBfcmVzdWx0Q29sbGVjdG9yLFxyXG4gICAgX2NvbmZpZyA9IHt9O1xyXG5cclxuZnVuY3Rpb24gaW5pdGlhbGl6ZURhdGEoaW1hZ2VXcmFwcGVyKSB7XHJcbiAgICBpbml0QnVmZmVycyhpbWFnZVdyYXBwZXIpO1xyXG4gICAgX2RlY29kZXIgPSBCYXJjb2RlRGVjb2Rlci5jcmVhdGUoX2NvbmZpZy5kZWNvZGVyLCBfaW5wdXRJbWFnZVdyYXBwZXIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0SW5wdXRTdHJlYW0oY2IpIHtcclxuICAgIHZhciB2aWRlbztcclxuICAgIGlmIChfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09IFwiVmlkZW9TdHJlYW1cIikge1xyXG4gICAgICAgIHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInZpZGVvXCIpO1xyXG4gICAgICAgIF9pbnB1dFN0cmVhbSA9IElucHV0U3RyZWFtLmNyZWF0ZVZpZGVvU3RyZWFtKHZpZGVvKTtcclxuICAgIH0gZWxzZSBpZiAoX2NvbmZpZy5pbnB1dFN0cmVhbS50eXBlID09PSBcIkltYWdlU3RyZWFtXCIpIHtcclxuICAgICAgICBfaW5wdXRTdHJlYW0gPSBJbnB1dFN0cmVhbS5jcmVhdGVJbWFnZVN0cmVhbSgpO1xyXG4gICAgfSBlbHNlIGlmIChfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09IFwiTGl2ZVN0cmVhbVwiKSB7XHJcbiAgICAgICAgdmFyICR2aWV3cG9ydCA9IGdldFZpZXdQb3J0KCk7XHJcbiAgICAgICAgaWYgKCR2aWV3cG9ydCkge1xyXG4gICAgICAgICAgICB2aWRlbyA9ICR2aWV3cG9ydC5xdWVyeVNlbGVjdG9yKFwidmlkZW9cIik7XHJcbiAgICAgICAgICAgIGlmICghdmlkZW8pIHtcclxuICAgICAgICAgICAgICAgIHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInZpZGVvXCIpO1xyXG4gICAgICAgICAgICAgICAgJHZpZXdwb3J0LmFwcGVuZENoaWxkKHZpZGVvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBfaW5wdXRTdHJlYW0gPSBJbnB1dFN0cmVhbS5jcmVhdGVMaXZlU3RyZWFtKHZpZGVvKTtcclxuICAgICAgICBDYW1lcmFBY2Nlc3MucmVxdWVzdCh2aWRlbywgX2NvbmZpZy5pbnB1dFN0cmVhbS5jb25zdHJhaW50cywgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgIGlmICghZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBfaW5wdXRTdHJlYW0udHJpZ2dlcihcImNhbnJlY29yZFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYihlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2lucHV0U3RyZWFtLnNldEF0dHJpYnV0ZShcInByZWxvYWRcIiwgXCJhdXRvXCIpO1xyXG4gICAgX2lucHV0U3RyZWFtLnNldEF0dHJpYnV0ZShcImF1dG9wbGF5XCIsIHRydWUpO1xyXG4gICAgX2lucHV0U3RyZWFtLnNldElucHV0U3RyZWFtKF9jb25maWcuaW5wdXRTdHJlYW0pO1xyXG4gICAgX2lucHV0U3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5yZWNvcmRcIiwgY2FuUmVjb3JkLmJpbmQodW5kZWZpbmVkLCBjYikpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRWaWV3UG9ydCgpIHtcclxuICAgIHZhciB0YXJnZXQgPSBfY29uZmlnLmlucHV0U3RyZWFtLnRhcmdldDtcclxuICAgIC8vIENoZWNrIGlmIHRhcmdldCBpcyBhbHJlYWR5IGEgRE9NIGVsZW1lbnRcclxuICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0Lm5vZGVOYW1lICYmIHRhcmdldC5ub2RlVHlwZSA9PT0gMSkge1xyXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFVzZSAnI2ludGVyYWN0aXZlLnZpZXdwb3J0JyBhcyBhIGZhbGxiYWNrIHNlbGVjdG9yIChiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSlcclxuICAgICAgICB2YXIgc2VsZWN0b3IgPSB0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJyA/IHRhcmdldCA6ICcjaW50ZXJhY3RpdmUudmlld3BvcnQnO1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2FuUmVjb3JkKGNiKSB7XHJcbiAgICBCYXJjb2RlTG9jYXRvci5jaGVja0ltYWdlQ29uc3RyYWludHMoX2lucHV0U3RyZWFtLCBfY29uZmlnLmxvY2F0b3IpO1xyXG4gICAgaW5pdENhbnZhcyhfY29uZmlnKTtcclxuICAgIF9mcmFtZWdyYWJiZXIgPSBGcmFtZUdyYWJiZXIuY3JlYXRlKF9pbnB1dFN0cmVhbSwgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UpO1xyXG5cclxuICAgIGFkanVzdFdvcmtlclBvb2woX2NvbmZpZy5udW1PZldvcmtlcnMsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChfY29uZmlnLm51bU9mV29ya2VycyA9PT0gMCkge1xyXG4gICAgICAgICAgICBpbml0aWFsaXplRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZWFkeShjYik7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVhZHkoY2Ipe1xyXG4gICAgX2lucHV0U3RyZWFtLnBsYXkoKTtcclxuICAgIGNiKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRDYW52YXMoKSB7XHJcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgdmFyICR2aWV3cG9ydCA9IGdldFZpZXdQb3J0KCk7XHJcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzLmltZ0J1ZmZlclwiKTtcclxuICAgICAgICBpZiAoIV9jYW52YXNDb250YWluZXIuZG9tLmltYWdlKSB7XHJcbiAgICAgICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UuY2xhc3NOYW1lID0gXCJpbWdCdWZmZXJcIjtcclxuICAgICAgICAgICAgaWYgKCR2aWV3cG9ydCAmJiBfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09IFwiSW1hZ2VTdHJlYW1cIikge1xyXG4gICAgICAgICAgICAgICAgJHZpZXdwb3J0LmFwcGVuZENoaWxkKF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmN0eC5pbWFnZSA9IF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZS53aWR0aCA9IF9pbnB1dFN0cmVhbS5nZXRDYW52YXNTaXplKCkueDtcclxuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZS5oZWlnaHQgPSBfaW5wdXRTdHJlYW0uZ2V0Q2FudmFzU2l6ZSgpLnk7XHJcblxyXG4gICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzLmRyYXdpbmdCdWZmZXJcIik7XHJcbiAgICAgICAgaWYgKCFfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5KSB7XHJcbiAgICAgICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5LmNsYXNzTmFtZSA9IFwiZHJhd2luZ0J1ZmZlclwiO1xyXG4gICAgICAgICAgICBpZiAoJHZpZXdwb3J0KSB7XHJcbiAgICAgICAgICAgICAgICAkdmlld3BvcnQuYXBwZW5kQ2hpbGQoX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGNsZWFyRml4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpO1xyXG4gICAgICAgICAgICBjbGVhckZpeC5zZXRBdHRyaWJ1dGUoXCJjbGVhclwiLCBcImFsbFwiKTtcclxuICAgICAgICAgICAgaWYgKCR2aWV3cG9ydCkge1xyXG4gICAgICAgICAgICAgICAgJHZpZXdwb3J0LmFwcGVuZENoaWxkKGNsZWFyRml4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmN0eC5vdmVybGF5ID0gX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheS53aWR0aCA9IF9pbnB1dFN0cmVhbS5nZXRDYW52YXNTaXplKCkueDtcclxuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5LmhlaWdodCA9IF9pbnB1dFN0cmVhbS5nZXRDYW52YXNTaXplKCkueTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdEJ1ZmZlcnMoaW1hZ2VXcmFwcGVyKSB7XHJcbiAgICBpZiAoaW1hZ2VXcmFwcGVyKSB7XHJcbiAgICAgICAgX2lucHV0SW1hZ2VXcmFwcGVyID0gaW1hZ2VXcmFwcGVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBfaW5wdXRJbWFnZVdyYXBwZXIgPSBuZXcgSW1hZ2VXcmFwcGVyKHtcclxuICAgICAgICAgICAgeDogX2lucHV0U3RyZWFtLmdldFdpZHRoKCksXHJcbiAgICAgICAgICAgIHk6IF9pbnB1dFN0cmVhbS5nZXRIZWlnaHQoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZSk7XHJcbiAgICB9XHJcbiAgICBfYm94U2l6ZSA9IFtcclxuICAgICAgICB2ZWMyLmNsb25lKFswLCAwXSksXHJcbiAgICAgICAgdmVjMi5jbG9uZShbMCwgX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUueV0pLFxyXG4gICAgICAgIHZlYzIuY2xvbmUoW19pbnB1dEltYWdlV3JhcHBlci5zaXplLngsIF9pbnB1dEltYWdlV3JhcHBlci5zaXplLnldKSxcclxuICAgICAgICB2ZWMyLmNsb25lKFtfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS54LCAwXSlcclxuICAgIF07XHJcbiAgICBCYXJjb2RlTG9jYXRvci5pbml0KF9pbnB1dEltYWdlV3JhcHBlciwgX2NvbmZpZy5sb2NhdG9yKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Qm91bmRpbmdCb3hlcygpIHtcclxuICAgIGlmIChfY29uZmlnLmxvY2F0ZSkge1xyXG4gICAgICAgIHJldHVybiBCYXJjb2RlTG9jYXRvci5sb2NhdGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFtbXHJcbiAgICAgICAgICAgIHZlYzIuY2xvbmUoX2JveFNpemVbMF0pLFxyXG4gICAgICAgICAgICB2ZWMyLmNsb25lKF9ib3hTaXplWzFdKSxcclxuICAgICAgICAgICAgdmVjMi5jbG9uZShfYm94U2l6ZVsyXSksXHJcbiAgICAgICAgICAgIHZlYzIuY2xvbmUoX2JveFNpemVbM10pXV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRyYW5zZm9ybVJlc3VsdChyZXN1bHQpIHtcclxuICAgIHZhciB0b3BSaWdodCA9IF9pbnB1dFN0cmVhbS5nZXRUb3BSaWdodCgpLFxyXG4gICAgICAgIHhPZmZzZXQgPSB0b3BSaWdodC54LFxyXG4gICAgICAgIHlPZmZzZXQgPSB0b3BSaWdodC55LFxyXG4gICAgICAgIGk7XHJcblxyXG4gICAgaWYgKHhPZmZzZXQgPT09IDAgJiYgeU9mZnNldCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzdWx0LmJhcmNvZGVzKSB7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHJlc3VsdC5iYXJjb2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm1SZXN1bHQocmVzdWx0LmJhcmNvZGVzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlc3VsdC5saW5lICYmIHJlc3VsdC5saW5lLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgIG1vdmVMaW5lKHJlc3VsdC5saW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzdWx0LmJveCkge1xyXG4gICAgICAgIG1vdmVCb3gocmVzdWx0LmJveCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlc3VsdC5ib3hlcyAmJiByZXN1bHQuYm94ZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCByZXN1bHQuYm94ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbW92ZUJveChyZXN1bHQuYm94ZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb3ZlQm94KGJveCkge1xyXG4gICAgICAgIHZhciBjb3JuZXIgPSBib3gubGVuZ3RoO1xyXG5cclxuICAgICAgICB3aGlsZSAoY29ybmVyLS0pIHtcclxuICAgICAgICAgICAgYm94W2Nvcm5lcl1bMF0gKz0geE9mZnNldDtcclxuICAgICAgICAgICAgYm94W2Nvcm5lcl1bMV0gKz0geU9mZnNldDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW92ZUxpbmUobGluZSkge1xyXG4gICAgICAgIGxpbmVbMF0ueCArPSB4T2Zmc2V0O1xyXG4gICAgICAgIGxpbmVbMF0ueSArPSB5T2Zmc2V0O1xyXG4gICAgICAgIGxpbmVbMV0ueCArPSB4T2Zmc2V0O1xyXG4gICAgICAgIGxpbmVbMV0ueSArPSB5T2Zmc2V0O1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRSZXN1bHQgKHJlc3VsdCwgaW1hZ2VEYXRhKSB7XHJcbiAgICBpZiAoIWltYWdlRGF0YSB8fCAhX3Jlc3VsdENvbGxlY3Rvcikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzdWx0LmJhcmNvZGVzKSB7XHJcbiAgICAgICAgcmVzdWx0LmJhcmNvZGVzLmZpbHRlcihiYXJjb2RlID0+IGJhcmNvZGUuY29kZVJlc3VsdClcclxuICAgICAgICAgICAgLmZvckVhY2goYmFyY29kZSA9PiBhZGRSZXN1bHQoYmFyY29kZSwgaW1hZ2VEYXRhKSk7XHJcbiAgICB9IGVsc2UgaWYgKHJlc3VsdC5jb2RlUmVzdWx0KSB7XHJcbiAgICAgICAgX3Jlc3VsdENvbGxlY3Rvci5hZGRSZXN1bHQoaW1hZ2VEYXRhLCBfaW5wdXRTdHJlYW0uZ2V0Q2FudmFzU2l6ZSgpLCByZXN1bHQuY29kZVJlc3VsdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhc0NvZGVSZXN1bHQgKHJlc3VsdCkge1xyXG4gICAgcmV0dXJuIHJlc3VsdCAmJiAocmVzdWx0LmJhcmNvZGVzID9cclxuICAgICAgcmVzdWx0LmJhcmNvZGVzLnNvbWUoYmFyY29kZSA9PiBiYXJjb2RlLmNvZGVSZXN1bHQpIDpcclxuICAgICAgcmVzdWx0LmNvZGVSZXN1bHQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwdWJsaXNoUmVzdWx0KHJlc3VsdCwgaW1hZ2VEYXRhKSB7XHJcbiAgICBjb25zdCByZXN1bHRUb1B1Ymxpc2ggPSByZXN1bHQgJiYgKHJlc3VsdC5iYXJjb2RlcyB8fCByZXN1bHQpO1xyXG5cclxuICAgIGlmIChyZXN1bHQgJiYgX29uVUlUaHJlYWQpIHtcclxuICAgICAgICB0cmFuc2Zvcm1SZXN1bHQocmVzdWx0KTtcclxuICAgICAgICBhZGRSZXN1bHQocmVzdWx0LCBpbWFnZURhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIEV2ZW50cy5wdWJsaXNoKFwicHJvY2Vzc2VkXCIsIHJlc3VsdFRvUHVibGlzaCk7XHJcbiAgICBpZiAoaGFzQ29kZVJlc3VsdChyZXN1bHQpKSB7XHJcbiAgICAgICAgRXZlbnRzLnB1Ymxpc2goXCJkZXRlY3RlZFwiLCByZXN1bHRUb1B1Ymxpc2gpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsb2NhdGVBbmREZWNvZGUoKSB7XHJcbiAgICB2YXIgcmVzdWx0LFxyXG4gICAgICAgIGJveGVzO1xyXG5cclxuICAgIGJveGVzID0gZ2V0Qm91bmRpbmdCb3hlcygpO1xyXG4gICAgaWYgKGJveGVzKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gX2RlY29kZXIuZGVjb2RlRnJvbUJvdW5kaW5nQm94ZXMoYm94ZXMpO1xyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCB7fTtcclxuICAgICAgICByZXN1bHQuYm94ZXMgPSBib3hlcztcclxuICAgICAgICBwdWJsaXNoUmVzdWx0KHJlc3VsdCwgX2lucHV0SW1hZ2VXcmFwcGVyLmRhdGEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwdWJsaXNoUmVzdWx0KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZSgpIHtcclxuICAgIHZhciBhdmFpbGFibGVXb3JrZXI7XHJcblxyXG4gICAgaWYgKF9vblVJVGhyZWFkKSB7XHJcbiAgICAgICAgaWYgKF93b3JrZXJQb29sLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgYXZhaWxhYmxlV29ya2VyID0gX3dvcmtlclBvb2wuZmlsdGVyKGZ1bmN0aW9uKHdvcmtlclRocmVhZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICF3b3JrZXJUaHJlYWQuYnVzeTtcclxuICAgICAgICAgICAgfSlbMF07XHJcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGVXb3JrZXIpIHtcclxuICAgICAgICAgICAgICAgIF9mcmFtZWdyYWJiZXIuYXR0YWNoRGF0YShhdmFpbGFibGVXb3JrZXIuaW1hZ2VEYXRhKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gYWxsIHdvcmtlcnMgYXJlIGJ1c3lcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIF9mcmFtZWdyYWJiZXIuYXR0YWNoRGF0YShfaW5wdXRJbWFnZVdyYXBwZXIuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChfZnJhbWVncmFiYmVyLmdyYWIoKSkge1xyXG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlV29ya2VyKSB7XHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVXb3JrZXIuYnVzeSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVXb3JrZXIud29ya2VyLnBvc3RNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICBjbWQ6ICdwcm9jZXNzJyxcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZURhdGE6IGF2YWlsYWJsZVdvcmtlci5pbWFnZURhdGFcclxuICAgICAgICAgICAgICAgIH0sIFthdmFpbGFibGVXb3JrZXIuaW1hZ2VEYXRhLmJ1ZmZlcl0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRlQW5kRGVjb2RlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxvY2F0ZUFuZERlY29kZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFydCgpIHtcclxuICAgIF9zdG9wcGVkID0gZmFsc2U7XHJcbiAgICAoIGZ1bmN0aW9uIGZyYW1lKCkge1xyXG4gICAgICAgIGlmICghX3N0b3BwZWQpIHtcclxuICAgICAgICAgICAgdXBkYXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChfb25VSVRocmVhZCAmJiBfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09IFwiTGl2ZVN0cmVhbVwiKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1GcmFtZShmcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0V29ya2VyKGNiKSB7XHJcbiAgICB2YXIgYmxvYlVSTCxcclxuICAgICAgICB3b3JrZXJUaHJlYWQgPSB7XHJcbiAgICAgICAgICAgIHdvcmtlcjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBpbWFnZURhdGE6IG5ldyBVaW50OEFycmF5KF9pbnB1dFN0cmVhbS5nZXRXaWR0aCgpICogX2lucHV0U3RyZWFtLmdldEhlaWdodCgpKSxcclxuICAgICAgICAgICAgYnVzeTogdHJ1ZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgYmxvYlVSTCA9IGdlbmVyYXRlV29ya2VyQmxvYigpO1xyXG4gICAgd29ya2VyVGhyZWFkLndvcmtlciA9IG5ldyBXb3JrZXIoYmxvYlVSTCk7XHJcblxyXG4gICAgd29ya2VyVGhyZWFkLndvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKGUuZGF0YS5ldmVudCA9PT0gJ2luaXRpYWxpemVkJykge1xyXG4gICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGJsb2JVUkwpO1xyXG4gICAgICAgICAgICB3b3JrZXJUaHJlYWQuYnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB3b3JrZXJUaHJlYWQuaW1hZ2VEYXRhID0gbmV3IFVpbnQ4QXJyYXkoZS5kYXRhLmltYWdlRGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV29ya2VyIGluaXRpYWxpemVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjYih3b3JrZXJUaHJlYWQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZS5kYXRhLmV2ZW50ID09PSAncHJvY2Vzc2VkJykge1xyXG4gICAgICAgICAgICB3b3JrZXJUaHJlYWQuaW1hZ2VEYXRhID0gbmV3IFVpbnQ4QXJyYXkoZS5kYXRhLmltYWdlRGF0YSk7XHJcbiAgICAgICAgICAgIHdvcmtlclRocmVhZC5idXN5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHB1Ymxpc2hSZXN1bHQoZS5kYXRhLnJlc3VsdCwgd29ya2VyVGhyZWFkLmltYWdlRGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlLmRhdGEuZXZlbnQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXb3JrZXIgZXJyb3I6IFwiICsgZS5kYXRhLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB3b3JrZXJUaHJlYWQud29ya2VyLnBvc3RNZXNzYWdlKHtcclxuICAgICAgICBjbWQ6ICdpbml0JyxcclxuICAgICAgICBzaXplOiB7eDogX2lucHV0U3RyZWFtLmdldFdpZHRoKCksIHk6IF9pbnB1dFN0cmVhbS5nZXRIZWlnaHQoKX0sXHJcbiAgICAgICAgaW1hZ2VEYXRhOiB3b3JrZXJUaHJlYWQuaW1hZ2VEYXRhLFxyXG4gICAgICAgIGNvbmZpZzogX2NvbmZpZ1xyXG4gICAgfSwgW3dvcmtlclRocmVhZC5pbWFnZURhdGEuYnVmZmVyXSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiB3b3JrZXJJbnRlcmZhY2UoZmFjdG9yeSkge1xyXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYqL1xyXG4gICAgaWYgKGZhY3RvcnkpIHtcclxuICAgICAgICB2YXIgUXVhZ2dhID0gZmFjdG9yeSgpO1xyXG4gICAgICAgIGlmICghUXVhZ2dhKSB7XHJcbiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeydldmVudCc6ICdlcnJvcicsIG1lc3NhZ2U6ICdRdWFnZ2EgY291bGQgbm90IGJlIGNyZWF0ZWQnfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgaW1hZ2VXcmFwcGVyO1xyXG5cclxuICAgIHNlbGYub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmIChlLmRhdGEuY21kID09PSAnaW5pdCcpIHtcclxuICAgICAgICAgICAgdmFyIGNvbmZpZyA9IGUuZGF0YS5jb25maWc7XHJcbiAgICAgICAgICAgIGNvbmZpZy5udW1PZldvcmtlcnMgPSAwO1xyXG4gICAgICAgICAgICBpbWFnZVdyYXBwZXIgPSBuZXcgUXVhZ2dhLkltYWdlV3JhcHBlcih7XHJcbiAgICAgICAgICAgICAgICB4OiBlLmRhdGEuc2l6ZS54LFxyXG4gICAgICAgICAgICAgICAgeTogZS5kYXRhLnNpemUueVxyXG4gICAgICAgICAgICB9LCBuZXcgVWludDhBcnJheShlLmRhdGEuaW1hZ2VEYXRhKSk7XHJcbiAgICAgICAgICAgIFF1YWdnYS5pbml0KGNvbmZpZywgcmVhZHksIGltYWdlV3JhcHBlcik7XHJcbiAgICAgICAgICAgIFF1YWdnYS5vblByb2Nlc3NlZChvblByb2Nlc3NlZCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlLmRhdGEuY21kID09PSAncHJvY2VzcycpIHtcclxuICAgICAgICAgICAgaW1hZ2VXcmFwcGVyLmRhdGEgPSBuZXcgVWludDhBcnJheShlLmRhdGEuaW1hZ2VEYXRhKTtcclxuICAgICAgICAgICAgUXVhZ2dhLnN0YXJ0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlLmRhdGEuY21kID09PSAnc2V0UmVhZGVycycpIHtcclxuICAgICAgICAgICAgUXVhZ2dhLnNldFJlYWRlcnMoZS5kYXRhLnJlYWRlcnMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gb25Qcm9jZXNzZWQocmVzdWx0KSB7XHJcbiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgICdldmVudCc6ICdwcm9jZXNzZWQnLFxyXG4gICAgICAgICAgICBpbWFnZURhdGE6IGltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgICAgICByZXN1bHQ6IHJlc3VsdFxyXG4gICAgICAgIH0sIFtpbWFnZVdyYXBwZXIuZGF0YS5idWZmZXJdKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZWFkeSgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeydldmVudCc6ICdpbml0aWFsaXplZCcsIGltYWdlRGF0YTogaW1hZ2VXcmFwcGVyLmRhdGF9LCBbaW1hZ2VXcmFwcGVyLmRhdGEuYnVmZmVyXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogZXNsaW50LWVuYWJsZSAqL1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZVdvcmtlckJsb2IoKSB7XHJcbiAgICB2YXIgYmxvYixcclxuICAgICAgICBmYWN0b3J5U291cmNlO1xyXG5cclxuICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cclxuICAgIGlmICh0eXBlb2YgX19mYWN0b3J5U291cmNlX18gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgZmFjdG9yeVNvdXJjZSA9IF9fZmFjdG9yeVNvdXJjZV9fOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXHJcbiAgICB9XHJcbiAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xyXG5cclxuICAgIGJsb2IgPSBuZXcgQmxvYihbJygnICsgd29ya2VySW50ZXJmYWNlLnRvU3RyaW5nKCkgKyAnKSgnICsgZmFjdG9yeVNvdXJjZSArICcpOyddLFxyXG4gICAgICAgIHt0eXBlOiAndGV4dC9qYXZhc2NyaXB0J30pO1xyXG5cclxuICAgIHJldHVybiB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0UmVhZGVycyhyZWFkZXJzKSB7XHJcbiAgICBpZiAoX2RlY29kZXIpIHtcclxuICAgICAgICBfZGVjb2Rlci5zZXRSZWFkZXJzKHJlYWRlcnMpO1xyXG4gICAgfSBlbHNlIGlmIChfb25VSVRocmVhZCAmJiBfd29ya2VyUG9vbC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgX3dvcmtlclBvb2wuZm9yRWFjaChmdW5jdGlvbih3b3JrZXJUaHJlYWQpIHtcclxuICAgICAgICAgICAgd29ya2VyVGhyZWFkLndvcmtlci5wb3N0TWVzc2FnZSh7Y21kOiAnc2V0UmVhZGVycycsIHJlYWRlcnM6IHJlYWRlcnN9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWRqdXN0V29ya2VyUG9vbChjYXBhY2l0eSwgY2IpIHtcclxuICAgIGNvbnN0IGluY3JlYXNlQnkgPSBjYXBhY2l0eSAtIF93b3JrZXJQb29sLmxlbmd0aDtcclxuICAgIGlmIChpbmNyZWFzZUJ5ID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGNiICYmIGNiKCk7XHJcbiAgICB9XHJcbiAgICBpZiAoaW5jcmVhc2VCeSA8IDApIHtcclxuICAgICAgICBjb25zdCB3b3JrZXJzVG9UZXJtaW5hdGUgPSBfd29ya2VyUG9vbC5zbGljZShpbmNyZWFzZUJ5KTtcclxuICAgICAgICB3b3JrZXJzVG9UZXJtaW5hdGUuZm9yRWFjaChmdW5jdGlvbih3b3JrZXJUaHJlYWQpIHtcclxuICAgICAgICAgICAgd29ya2VyVGhyZWFkLndvcmtlci50ZXJtaW5hdGUoKTtcclxuICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXb3JrZXIgdGVybWluYXRlZCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBfd29ya2VyUG9vbCA9IF93b3JrZXJQb29sLnNsaWNlKDAsIGluY3JlYXNlQnkpO1xyXG4gICAgICAgIHJldHVybiBjYiAmJiBjYigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluY3JlYXNlQnk7IGkrKykge1xyXG4gICAgICAgICAgICBpbml0V29ya2VyKHdvcmtlckluaXRpYWxpemVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdvcmtlckluaXRpYWxpemVkKHdvcmtlclRocmVhZCkge1xyXG4gICAgICAgICAgICBfd29ya2VyUG9vbC5wdXNoKHdvcmtlclRocmVhZCk7XHJcbiAgICAgICAgICAgIGlmIChfd29ya2VyUG9vbC5sZW5ndGggPj0gY2FwYWNpdHkpe1xyXG4gICAgICAgICAgICAgICAgY2IgJiYgY2IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oY29uZmlnLCBjYiwgaW1hZ2VXcmFwcGVyKSB7XHJcbiAgICAgICAgX2NvbmZpZyA9IG1lcmdlKHt9LCBDb25maWcsIGNvbmZpZyk7XHJcbiAgICAgICAgaWYgKGltYWdlV3JhcHBlcikge1xyXG4gICAgICAgICAgICBfb25VSVRocmVhZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpbml0aWFsaXplRGF0YShpbWFnZVdyYXBwZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2IoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbml0SW5wdXRTdHJlYW0oY2IpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzdGFydDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc3RhcnQoKTtcclxuICAgIH0sXHJcbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBfc3RvcHBlZCA9IHRydWU7XHJcbiAgICAgICAgYWRqdXN0V29ya2VyUG9vbCgwKTtcclxuICAgICAgICBpZiAoX2NvbmZpZy5pbnB1dFN0cmVhbS50eXBlID09PSBcIkxpdmVTdHJlYW1cIikge1xyXG4gICAgICAgICAgICBDYW1lcmFBY2Nlc3MucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICBfaW5wdXRTdHJlYW0uY2xlYXJFdmVudEhhbmRsZXJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhdXNlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBfc3RvcHBlZCA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgb25EZXRlY3RlZDogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuICAgICAgICBFdmVudHMuc3Vic2NyaWJlKFwiZGV0ZWN0ZWRcIiwgY2FsbGJhY2spO1xyXG4gICAgfSxcclxuICAgIG9mZkRldGVjdGVkOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgIEV2ZW50cy51bnN1YnNjcmliZShcImRldGVjdGVkXCIsIGNhbGxiYWNrKTtcclxuICAgIH0sXHJcbiAgICBvblByb2Nlc3NlZDogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuICAgICAgICBFdmVudHMuc3Vic2NyaWJlKFwicHJvY2Vzc2VkXCIsIGNhbGxiYWNrKTtcclxuICAgIH0sXHJcbiAgICBvZmZQcm9jZXNzZWQ6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgRXZlbnRzLnVuc3Vic2NyaWJlKFwicHJvY2Vzc2VkXCIsIGNhbGxiYWNrKTtcclxuICAgIH0sXHJcbiAgICBzZXRSZWFkZXJzOiBmdW5jdGlvbihyZWFkZXJzKSB7XHJcbiAgICAgICAgc2V0UmVhZGVycyhyZWFkZXJzKTtcclxuICAgIH0sXHJcbiAgICByZWdpc3RlclJlc3VsdENvbGxlY3RvcjogZnVuY3Rpb24ocmVzdWx0Q29sbGVjdG9yKSB7XHJcbiAgICAgICAgaWYgKHJlc3VsdENvbGxlY3RvciAmJiB0eXBlb2YgcmVzdWx0Q29sbGVjdG9yLmFkZFJlc3VsdCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBfcmVzdWx0Q29sbGVjdG9yID0gcmVzdWx0Q29sbGVjdG9yO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjYW52YXM6IF9jYW52YXNDb250YWluZXIsXHJcbiAgICBkZWNvZGVTaW5nbGU6IGZ1bmN0aW9uKGNvbmZpZywgcmVzdWx0Q2FsbGJhY2spIHtcclxuICAgICAgICBjb25maWcgPSBtZXJnZSh7XHJcbiAgICAgICAgICAgIGlucHV0U3RyZWFtOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkltYWdlU3RyZWFtXCIsXHJcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzaXplOiA4MDAsXHJcbiAgICAgICAgICAgICAgICBzcmM6IGNvbmZpZy5zcmNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbnVtT2ZXb3JrZXJzOiAoRU5WLmRldmVsb3BtZW50ICYmIGNvbmZpZy5kZWJ1ZykgPyAwIDogMSxcclxuICAgICAgICAgICAgbG9jYXRvcjoge1xyXG4gICAgICAgICAgICAgICAgaGFsZlNhbXBsZTogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5pbml0KGNvbmZpZywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIEV2ZW50cy5vbmNlKFwicHJvY2Vzc2VkXCIsIGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgX3N0b3BwZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0Q2FsbGJhY2suY2FsbChudWxsLCByZXN1bHQpO1xyXG4gICAgICAgICAgICB9LCB0cnVlKTtcclxuICAgICAgICAgICAgc3RhcnQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBJbWFnZVdyYXBwZXI6IEltYWdlV3JhcHBlcixcclxuICAgIEltYWdlRGVidWc6IEltYWdlRGVidWcsXHJcbiAgICBSZXN1bHRDb2xsZWN0b3I6IFJlc3VsdENvbGxlY3RvclxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9xdWFnZ2EuanNcbiAqKi8iLCIvKlxyXG4gKiB0eXBlZGVmcy5qc1xyXG4gKiBOb3JtYWxpemVzIGJyb3dzZXItc3BlY2lmaWMgcHJlZml4ZXNcclxuICovXHJcblxyXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICgvKiBmdW5jdGlvbiBGcmFtZVJlcXVlc3RDYWxsYmFjayAqLyBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhIHx8XHJcbiAgICAgICAgbmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhIHx8IG5hdmlnYXRvci5tc0dldFVzZXJNZWRpYTtcclxuICAgIHdpbmRvdy5VUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkwgfHwgd2luZG93Lm1velVSTCB8fCB3aW5kb3cubXNVUkw7XHJcbn1cclxuTWF0aC5pbXVsID0gTWF0aC5pbXVsIHx8IGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgIHZhciBhaCA9IChhID4+PiAxNikgJiAweGZmZmYsXHJcbiAgICAgICAgYWwgPSBhICYgMHhmZmZmLFxyXG4gICAgICAgIGJoID0gKGIgPj4+IDE2KSAmIDB4ZmZmZixcclxuICAgICAgICBibCA9IGIgJiAweGZmZmY7XHJcbiAgICAvLyB0aGUgc2hpZnQgYnkgMCBmaXhlcyB0aGUgc2lnbiBvbiB0aGUgaGlnaCBwYXJ0XHJcbiAgICAvLyB0aGUgZmluYWwgfDAgY29udmVydHMgdGhlIHVuc2lnbmVkIHZhbHVlIGludG8gYSBzaWduZWQgdmFsdWVcclxuICAgIHJldHVybiAoKGFsICogYmwpICsgKCgoYWggKiBibCArIGFsICogYmgpIDw8IDE2KSA+Pj4gMCkgfCAwKTtcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvY29tbW9uL3R5cGVkZWZzLmpzXG4gKiovIiwiaW1wb3J0IFN1YkltYWdlIGZyb20gJy4vc3ViSW1hZ2UnO1xyXG5pbXBvcnQgQ1ZVdGlscyBmcm9tICcuLi9jb21tb24vY3ZfdXRpbHMnO1xyXG5pbXBvcnQgQXJyYXlIZWxwZXIgZnJvbSAnLi4vY29tbW9uL2FycmF5X2hlbHBlcic7XHJcbmltcG9ydCB7dmVjMn0gZnJvbSAnZ2wtbWF0cml4JztcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGEgYmFzaWMgaW1hZ2UgY29tYmluaW5nIHRoZSBkYXRhIGFuZCBzaXplLlxyXG4gKiBJbiBhZGRpdGlvbiwgc29tZSBtZXRob2RzIGZvciBtYW5pcHVsYXRpb24gYXJlIGNvbnRhaW5lZC5cclxuICogQHBhcmFtIHNpemUge3gseX0gVGhlIHNpemUgb2YgdGhlIGltYWdlIGluIHBpeGVsXHJcbiAqIEBwYXJhbSBkYXRhIHtBcnJheX0gSWYgZ2l2ZW4sIGEgZmxhdCBhcnJheSBjb250YWluaW5nIHRoZSBwaXhlbCBkYXRhXHJcbiAqIEBwYXJhbSBBcnJheVR5cGUge1R5cGV9IElmIGdpdmVuLCB0aGUgZGVzaXJlZCBEYXRhVHlwZSBvZiB0aGUgQXJyYXkgKG1heSBiZSB0eXBlZC9ub24tdHlwZWQpXHJcbiAqIEBwYXJhbSBpbml0aWFsaXplIHtCb29sZWFufSBJbmRpY2F0aW5nIGlmIHRoZSBhcnJheSBzaG91bGQgYmUgaW5pdGlhbGl6ZWQgb24gY3JlYXRpb24uXHJcbiAqIEByZXR1cm5zIHtJbWFnZVdyYXBwZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiBJbWFnZVdyYXBwZXIoc2l6ZSwgZGF0YSwgQXJyYXlUeXBlLCBpbml0aWFsaXplKSB7XHJcbiAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICBpZiAoQXJyYXlUeXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IG5ldyBBcnJheVR5cGUoc2l6ZS54ICogc2l6ZS55KTtcclxuICAgICAgICAgICAgaWYgKEFycmF5VHlwZSA9PT0gQXJyYXkgJiYgaW5pdGlhbGl6ZSkge1xyXG4gICAgICAgICAgICAgICAgQXJyYXlIZWxwZXIuaW5pdCh0aGlzLmRhdGEsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZS54ICogc2l6ZS55KTtcclxuICAgICAgICAgICAgaWYgKFVpbnQ4QXJyYXkgPT09IEFycmF5ICYmIGluaXRpYWxpemUpIHtcclxuICAgICAgICAgICAgICAgIEFycmF5SGVscGVyLmluaXQodGhpcy5kYXRhLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgIH1cclxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiB0ZXN0cyBpZiBhIHBvc2l0aW9uIGlzIHdpdGhpbiB0aGUgaW1hZ2Ugd2l0aCBhIGdpdmVuIG9mZnNldFxyXG4gKiBAcGFyYW0gaW1nUmVmIHt4LCB5fSBUaGUgbG9jYXRpb24gdG8gdGVzdFxyXG4gKiBAcGFyYW0gYm9yZGVyIE51bWJlciB0aGUgcGFkZGluZyB2YWx1ZSBpbiBwaXhlbFxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpZiBsb2NhdGlvbiBpbnNpZGUgdGhlIGltYWdlJ3MgYm9yZGVyLCBmYWxzZSBvdGhlcndpc2VcclxuICogQHNlZSBjdmQvaW1hZ2UuaFxyXG4gKi9cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5pbkltYWdlV2l0aEJvcmRlciA9IGZ1bmN0aW9uKGltZ1JlZiwgYm9yZGVyKSB7XHJcbiAgICByZXR1cm4gKGltZ1JlZi54ID49IGJvcmRlcilcclxuICAgICAgICAmJiAoaW1nUmVmLnkgPj0gYm9yZGVyKVxyXG4gICAgICAgICYmIChpbWdSZWYueCA8ICh0aGlzLnNpemUueCAtIGJvcmRlcikpXHJcbiAgICAgICAgJiYgKGltZ1JlZi55IDwgKHRoaXMuc2l6ZS55IC0gYm9yZGVyKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUGVyZm9ybXMgYmlsaW5lYXIgc2FtcGxpbmdcclxuICogQHBhcmFtIGluSW1nIEltYWdlIHRvIGV4dHJhY3Qgc2FtcGxlIGZyb21cclxuICogQHBhcmFtIHggdGhlIHgtY29vcmRpbmF0ZVxyXG4gKiBAcGFyYW0geSB0aGUgeS1jb29yZGluYXRlXHJcbiAqIEByZXR1cm5zIHRoZSBzYW1wbGVkIHZhbHVlXHJcbiAqIEBzZWUgY3ZkL3Zpc2lvbi5oXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIuc2FtcGxlID0gZnVuY3Rpb24oaW5JbWcsIHgsIHkpIHtcclxuICAgIHZhciBseCA9IE1hdGguZmxvb3IoeCk7XHJcbiAgICB2YXIgbHkgPSBNYXRoLmZsb29yKHkpO1xyXG4gICAgdmFyIHcgPSBpbkltZy5zaXplLng7XHJcbiAgICB2YXIgYmFzZSA9IGx5ICogaW5JbWcuc2l6ZS54ICsgbHg7XHJcbiAgICB2YXIgYSA9IGluSW1nLmRhdGFbYmFzZSArIDBdO1xyXG4gICAgdmFyIGIgPSBpbkltZy5kYXRhW2Jhc2UgKyAxXTtcclxuICAgIHZhciBjID0gaW5JbWcuZGF0YVtiYXNlICsgd107XHJcbiAgICB2YXIgZCA9IGluSW1nLmRhdGFbYmFzZSArIHcgKyAxXTtcclxuICAgIHZhciBlID0gYSAtIGI7XHJcbiAgICB4IC09IGx4O1xyXG4gICAgeSAtPSBseTtcclxuXHJcbiAgICB2YXIgcmVzdWx0ID0gTWF0aC5mbG9vcih4ICogKHkgKiAoZSAtIGMgKyBkKSAtIGUpICsgeSAqIChjIC0gYSkgKyBhKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZXMgYSBnaXZlbiBhcnJheS4gU2V0cyBlYWNoIGVsZW1lbnQgdG8gemVyby5cclxuICogQHBhcmFtIGFycmF5IHtBcnJheX0gVGhlIGFycmF5IHRvIGluaXRpYWxpemVcclxuICovXHJcbkltYWdlV3JhcHBlci5jbGVhckFycmF5ID0gZnVuY3Rpb24oYXJyYXkpIHtcclxuICAgIHZhciBsID0gYXJyYXkubGVuZ3RoO1xyXG4gICAgd2hpbGUgKGwtLSkge1xyXG4gICAgICAgIGFycmF5W2xdID0gMDtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEge1N1YkltYWdlfSBmcm9tIHRoZSBjdXJyZW50IGltYWdlICh7dGhpc30pLlxyXG4gKiBAcGFyYW0gZnJvbSB7SW1hZ2VSZWZ9IFRoZSBwb3NpdGlvbiB3aGVyZSB0byBzdGFydCB0aGUge1N1YkltYWdlfSBmcm9tLiAodG9wLWxlZnQgY29ybmVyKVxyXG4gKiBAcGFyYW0gc2l6ZSB7SW1hZ2VSZWZ9IFRoZSBzaXplIG9mIHRoZSByZXN1bHRpbmcgaW1hZ2VcclxuICogQHJldHVybnMge1N1YkltYWdlfSBBIHNoYXJlZCBwYXJ0IG9mIHRoZSBvcmlnaW5hbCBpbWFnZVxyXG4gKi9cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5zdWJJbWFnZSA9IGZ1bmN0aW9uKGZyb20sIHNpemUpIHtcclxuICAgIHJldHVybiBuZXcgU3ViSW1hZ2UoZnJvbSwgc2l6ZSwgdGhpcyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhbiB7SW1hZ2VXcmFwcGVyKSBhbmQgY29waWVzIHRoZSBuZWVkZWQgdW5kZXJseWluZyBpbWFnZS1kYXRhIGFyZWFcclxuICogQHBhcmFtIGltYWdlV3JhcHBlciB7SW1hZ2VXcmFwcGVyfSBUaGUgdGFyZ2V0IHtJbWFnZVdyYXBwZXJ9IHdoZXJlIHRoZSBkYXRhIHNob3VsZCBiZSBjb3BpZWRcclxuICogQHBhcmFtIGZyb20ge0ltYWdlUmVmfSBUaGUgbG9jYXRpb24gd2hlcmUgdG8gY29weSBmcm9tICh0b3AtbGVmdCBsb2NhdGlvbilcclxuICovXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuc3ViSW1hZ2VBc0NvcHkgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGZyb20pIHtcclxuICAgIHZhciBzaXplWSA9IGltYWdlV3JhcHBlci5zaXplLnksIHNpemVYID0gaW1hZ2VXcmFwcGVyLnNpemUueDtcclxuICAgIHZhciB4LCB5O1xyXG4gICAgZm9yICggeCA9IDA7IHggPCBzaXplWDsgeCsrKSB7XHJcbiAgICAgICAgZm9yICggeSA9IDA7IHkgPCBzaXplWTsgeSsrKSB7XHJcbiAgICAgICAgICAgIGltYWdlV3JhcHBlci5kYXRhW3kgKiBzaXplWCArIHhdID0gdGhpcy5kYXRhWyhmcm9tLnkgKyB5KSAqIHRoaXMuc2l6ZS54ICsgZnJvbS54ICsgeF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5jb3B5VG8gPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIpIHtcclxuICAgIHZhciBsZW5ndGggPSB0aGlzLmRhdGEubGVuZ3RoLCBzcmNEYXRhID0gdGhpcy5kYXRhLCBkc3REYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGE7XHJcblxyXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XHJcbiAgICAgICAgZHN0RGF0YVtsZW5ndGhdID0gc3JjRGF0YVtsZW5ndGhdO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlcyBhIGdpdmVuIHBpeGVsIHBvc2l0aW9uIGZyb20gdGhlIGltYWdlXHJcbiAqIEBwYXJhbSB4IHtOdW1iZXJ9IFRoZSB4LXBvc2l0aW9uXHJcbiAqIEBwYXJhbSB5IHtOdW1iZXJ9IFRoZSB5LXBvc2l0aW9uXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBncmF5c2NhbGUgdmFsdWUgYXQgdGhlIHBpeGVsLXBvc2l0aW9uXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGFbeSAqIHRoaXMuc2l6ZS54ICsgeF07XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0cmlldmVzIGEgZ2l2ZW4gcGl4ZWwgcG9zaXRpb24gZnJvbSB0aGUgaW1hZ2VcclxuICogQHBhcmFtIHgge051bWJlcn0gVGhlIHgtcG9zaXRpb25cclxuICogQHBhcmFtIHkge051bWJlcn0gVGhlIHktcG9zaXRpb25cclxuICogQHJldHVybnMge051bWJlcn0gVGhlIGdyYXlzY2FsZSB2YWx1ZSBhdCB0aGUgcGl4ZWwtcG9zaXRpb25cclxuICovXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuZ2V0U2FmZSA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgIHZhciBpO1xyXG5cclxuICAgIGlmICghdGhpcy5pbmRleE1hcHBpbmcpIHtcclxuICAgICAgICB0aGlzLmluZGV4TWFwcGluZyA9IHtcclxuICAgICAgICAgICAgeDogW10sXHJcbiAgICAgICAgICAgIHk6IFtdXHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5zaXplLng7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4TWFwcGluZy54W2ldID0gaTtcclxuICAgICAgICAgICAgdGhpcy5pbmRleE1hcHBpbmcueFtpICsgdGhpcy5zaXplLnhdID0gaTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuc2l6ZS55OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5pbmRleE1hcHBpbmcueVtpXSA9IGk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXhNYXBwaW5nLnlbaSArIHRoaXMuc2l6ZS55XSA9IGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZGF0YVsodGhpcy5pbmRleE1hcHBpbmcueVt5ICsgdGhpcy5zaXplLnldKSAqIHRoaXMuc2l6ZS54ICsgdGhpcy5pbmRleE1hcHBpbmcueFt4ICsgdGhpcy5zaXplLnhdXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXRzIGEgZ2l2ZW4gcGl4ZWwgcG9zaXRpb24gaW4gdGhlIGltYWdlXHJcbiAqIEBwYXJhbSB4IHtOdW1iZXJ9IFRoZSB4LXBvc2l0aW9uXHJcbiAqIEBwYXJhbSB5IHtOdW1iZXJ9IFRoZSB5LXBvc2l0aW9uXHJcbiAqIEBwYXJhbSB2YWx1ZSB7TnVtYmVyfSBUaGUgZ3JheXNjYWxlIHZhbHVlIHRvIHNldFxyXG4gKiBAcmV0dXJucyB7SW1hZ2VXcmFwcGVyfSBUaGUgSW1hZ2UgaXRzZWxmIChmb3IgcG9zc2libGUgY2hhaW5pbmcpXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKHgsIHksIHZhbHVlKSB7XHJcbiAgICB0aGlzLmRhdGFbeSAqIHRoaXMuc2l6ZS54ICsgeF0gPSB2YWx1ZTtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldHMgdGhlIGJvcmRlciBvZiB0aGUgaW1hZ2UgKDEgcGl4ZWwpIHRvIHplcm9cclxuICovXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUuemVyb0JvcmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGksIHdpZHRoID0gdGhpcy5zaXplLngsIGhlaWdodCA9IHRoaXMuc2l6ZS55LCBkYXRhID0gdGhpcy5kYXRhO1xyXG4gICAgZm9yICggaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XHJcbiAgICAgICAgZGF0YVtpXSA9IGRhdGFbKGhlaWdodCAtIDEpICogd2lkdGggKyBpXSA9IDA7XHJcbiAgICB9XHJcbiAgICBmb3IgKCBpID0gMTsgaSA8IGhlaWdodCAtIDE7IGkrKykge1xyXG4gICAgICAgIGRhdGFbaSAqIHdpZHRoXSA9IGRhdGFbaSAqIHdpZHRoICsgKHdpZHRoIC0gMSldID0gMDtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbnZlcnRzIGEgYmluYXJ5IGltYWdlIGluIHBsYWNlXHJcbiAqL1xyXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLmludmVydCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGRhdGEgPSB0aGlzLmRhdGEsIGxlbmd0aCA9IGRhdGEubGVuZ3RoO1xyXG5cclxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgIGRhdGFbbGVuZ3RoXSA9IGRhdGFbbGVuZ3RoXSA/IDAgOiAxO1xyXG4gICAgfVxyXG59O1xyXG5cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5jb252b2x2ZSA9IGZ1bmN0aW9uKGtlcm5lbCkge1xyXG4gICAgdmFyIHgsIHksIGt4LCBreSwga1NpemUgPSAoa2VybmVsLmxlbmd0aCAvIDIpIHwgMCwgYWNjdSA9IDA7XHJcbiAgICBmb3IgKCB5ID0gMDsgeSA8IHRoaXMuc2l6ZS55OyB5KyspIHtcclxuICAgICAgICBmb3IgKCB4ID0gMDsgeCA8IHRoaXMuc2l6ZS54OyB4KyspIHtcclxuICAgICAgICAgICAgYWNjdSA9IDA7XHJcbiAgICAgICAgICAgIGZvciAoIGt5ID0gLWtTaXplOyBreSA8PSBrU2l6ZTsga3krKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICgga3ggPSAta1NpemU7IGt4IDw9IGtTaXplOyBreCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdSArPSBrZXJuZWxba3kgKyBrU2l6ZV1ba3ggKyBrU2l6ZV0gKiB0aGlzLmdldFNhZmUoeCArIGt4LCB5ICsga3kpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVt5ICogdGhpcy5zaXplLnggKyB4XSA9IGFjY3U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5tb21lbnRzID0gZnVuY3Rpb24obGFiZWxjb3VudCkge1xyXG4gICAgdmFyIGRhdGEgPSB0aGlzLmRhdGEsXHJcbiAgICAgICAgeCxcclxuICAgICAgICB5LFxyXG4gICAgICAgIGhlaWdodCA9IHRoaXMuc2l6ZS55LFxyXG4gICAgICAgIHdpZHRoID0gdGhpcy5zaXplLngsXHJcbiAgICAgICAgdmFsLFxyXG4gICAgICAgIHlzcSxcclxuICAgICAgICBsYWJlbHN1bSA9IFtdLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgbGFiZWwsXHJcbiAgICAgICAgbXUxMSxcclxuICAgICAgICBtdTAyLFxyXG4gICAgICAgIG11MjAsXHJcbiAgICAgICAgeF8sXHJcbiAgICAgICAgeV8sXHJcbiAgICAgICAgdG1wLFxyXG4gICAgICAgIHJlc3VsdCA9IFtdLFxyXG4gICAgICAgIFBJID0gTWF0aC5QSSxcclxuICAgICAgICBQSV80ID0gUEkgLyA0O1xyXG5cclxuICAgIGlmIChsYWJlbGNvdW50IDw9IDApIHtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgbGFiZWxjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgbGFiZWxzdW1baV0gPSB7XHJcbiAgICAgICAgICAgIG0wMDogMCxcclxuICAgICAgICAgICAgbTAxOiAwLFxyXG4gICAgICAgICAgICBtMTA6IDAsXHJcbiAgICAgICAgICAgIG0xMTogMCxcclxuICAgICAgICAgICAgbTAyOiAwLFxyXG4gICAgICAgICAgICBtMjA6IDAsXHJcbiAgICAgICAgICAgIHRoZXRhOiAwLFxyXG4gICAgICAgICAgICByYWQ6IDBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcclxuICAgICAgICB5c3EgPSB5ICogeTtcclxuICAgICAgICBmb3IgKCB4ID0gMDsgeCA8IHdpZHRoOyB4KyspIHtcclxuICAgICAgICAgICAgdmFsID0gZGF0YVt5ICogd2lkdGggKyB4XTtcclxuICAgICAgICAgICAgaWYgKHZhbCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsID0gbGFiZWxzdW1bdmFsIC0gMV07XHJcbiAgICAgICAgICAgICAgICBsYWJlbC5tMDAgKz0gMTtcclxuICAgICAgICAgICAgICAgIGxhYmVsLm0wMSArPSB5O1xyXG4gICAgICAgICAgICAgICAgbGFiZWwubTEwICs9IHg7XHJcbiAgICAgICAgICAgICAgICBsYWJlbC5tMTEgKz0geCAqIHk7XHJcbiAgICAgICAgICAgICAgICBsYWJlbC5tMDIgKz0geXNxO1xyXG4gICAgICAgICAgICAgICAgbGFiZWwubTIwICs9IHggKiB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgbGFiZWxjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgbGFiZWwgPSBsYWJlbHN1bVtpXTtcclxuICAgICAgICBpZiAoIWlzTmFOKGxhYmVsLm0wMCkgJiYgbGFiZWwubTAwICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHhfID0gbGFiZWwubTEwIC8gbGFiZWwubTAwO1xyXG4gICAgICAgICAgICB5XyA9IGxhYmVsLm0wMSAvIGxhYmVsLm0wMDtcclxuICAgICAgICAgICAgbXUxMSA9IGxhYmVsLm0xMSAvIGxhYmVsLm0wMCAtIHhfICogeV87XHJcbiAgICAgICAgICAgIG11MDIgPSBsYWJlbC5tMDIgLyBsYWJlbC5tMDAgLSB5XyAqIHlfO1xyXG4gICAgICAgICAgICBtdTIwID0gbGFiZWwubTIwIC8gbGFiZWwubTAwIC0geF8gKiB4XztcclxuICAgICAgICAgICAgdG1wID0gKG11MDIgLSBtdTIwKSAvICgyICogbXUxMSk7XHJcbiAgICAgICAgICAgIHRtcCA9IDAuNSAqIE1hdGguYXRhbih0bXApICsgKG11MTEgPj0gMCA/IFBJXzQgOiAtUElfNCApICsgUEk7XHJcbiAgICAgICAgICAgIGxhYmVsLnRoZXRhID0gKHRtcCAqIDE4MCAvIFBJICsgOTApICUgMTgwIC0gOTA7XHJcbiAgICAgICAgICAgIGlmIChsYWJlbC50aGV0YSA8IDApIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsLnRoZXRhICs9IDE4MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsYWJlbC5yYWQgPSB0bXAgPiBQSSA/IHRtcCAtIFBJIDogdG1wO1xyXG4gICAgICAgICAgICBsYWJlbC52ZWMgPSB2ZWMyLmNsb25lKFtNYXRoLmNvcyh0bXApLCBNYXRoLnNpbih0bXApXSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGxhYmVsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEaXNwbGF5cyB0aGUge0ltYWdlV3JhcHBlcn0gaW4gYSBnaXZlbiBjYW52YXNcclxuICogQHBhcmFtIGNhbnZhcyB7Q2FudmFzfSBUaGUgY2FudmFzIGVsZW1lbnQgdG8gd3JpdGUgdG9cclxuICogQHBhcmFtIHNjYWxlIHtOdW1iZXJ9IFNjYWxlIHdoaWNoIGlzIGFwcGxpZWQgdG8gZWFjaCBwaXhlbC12YWx1ZVxyXG4gKi9cclxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oY2FudmFzLCBzY2FsZSkge1xyXG4gICAgdmFyIGN0eCxcclxuICAgICAgICBmcmFtZSxcclxuICAgICAgICBkYXRhLFxyXG4gICAgICAgIGN1cnJlbnQsXHJcbiAgICAgICAgcGl4ZWwsXHJcbiAgICAgICAgeCxcclxuICAgICAgICB5O1xyXG5cclxuICAgIGlmICghc2NhbGUpIHtcclxuICAgICAgICBzY2FsZSA9IDEuMDtcclxuICAgIH1cclxuICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgY2FudmFzLndpZHRoID0gdGhpcy5zaXplLng7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gdGhpcy5zaXplLnk7XHJcbiAgICBmcmFtZSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgIGRhdGEgPSBmcmFtZS5kYXRhO1xyXG4gICAgY3VycmVudCA9IDA7XHJcbiAgICBmb3IgKHkgPSAwOyB5IDwgdGhpcy5zaXplLnk7IHkrKykge1xyXG4gICAgICAgIGZvciAoeCA9IDA7IHggPCB0aGlzLnNpemUueDsgeCsrKSB7XHJcbiAgICAgICAgICAgIHBpeGVsID0geSAqIHRoaXMuc2l6ZS54ICsgeDtcclxuICAgICAgICAgICAgY3VycmVudCA9IHRoaXMuZ2V0KHgsIHkpICogc2NhbGU7XHJcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMF0gPSBjdXJyZW50O1xyXG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDFdID0gY3VycmVudDtcclxuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAyXSA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgM10gPSAyNTU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9mcmFtZS5kYXRhID0gZGF0YTtcclxuICAgIGN0eC5wdXRJbWFnZURhdGEoZnJhbWUsIDAsIDApO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERpc3BsYXlzIHRoZSB7U3ViSW1hZ2V9IGluIGEgZ2l2ZW4gY2FudmFzXHJcbiAqIEBwYXJhbSBjYW52YXMge0NhbnZhc30gVGhlIGNhbnZhcyBlbGVtZW50IHRvIHdyaXRlIHRvXHJcbiAqIEBwYXJhbSBzY2FsZSB7TnVtYmVyfSBTY2FsZSB3aGljaCBpcyBhcHBsaWVkIHRvIGVhY2ggcGl4ZWwtdmFsdWVcclxuICovXHJcbkltYWdlV3JhcHBlci5wcm90b3R5cGUub3ZlcmxheSA9IGZ1bmN0aW9uKGNhbnZhcywgc2NhbGUsIGZyb20pIHtcclxuICAgIGlmICghc2NhbGUgfHwgc2NhbGUgPCAwIHx8IHNjYWxlID4gMzYwKSB7XHJcbiAgICAgICAgc2NhbGUgPSAzNjA7XHJcbiAgICB9XHJcbiAgICB2YXIgaHN2ID0gWzAsIDEsIDFdO1xyXG4gICAgdmFyIHJnYiA9IFswLCAwLCAwXTtcclxuICAgIHZhciB3aGl0ZVJnYiA9IFsyNTUsIDI1NSwgMjU1XTtcclxuICAgIHZhciBibGFja1JnYiA9IFswLCAwLCAwXTtcclxuICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIHZhciBmcmFtZSA9IGN0eC5nZXRJbWFnZURhdGEoZnJvbS54LCBmcm9tLnksIHRoaXMuc2l6ZS54LCB0aGlzLnNpemUueSk7XHJcbiAgICB2YXIgZGF0YSA9IGZyYW1lLmRhdGE7XHJcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5kYXRhLmxlbmd0aDtcclxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgIGhzdlswXSA9IHRoaXMuZGF0YVtsZW5ndGhdICogc2NhbGU7XHJcbiAgICAgICAgcmVzdWx0ID0gaHN2WzBdIDw9IDAgPyB3aGl0ZVJnYiA6IGhzdlswXSA+PSAzNjAgPyBibGFja1JnYiA6IENWVXRpbHMuaHN2MnJnYihoc3YsIHJnYik7XHJcbiAgICAgICAgZGF0YVtsZW5ndGggKiA0ICsgMF0gPSByZXN1bHRbMF07XHJcbiAgICAgICAgZGF0YVtsZW5ndGggKiA0ICsgMV0gPSByZXN1bHRbMV07XHJcbiAgICAgICAgZGF0YVtsZW5ndGggKiA0ICsgMl0gPSByZXN1bHRbMl07XHJcbiAgICAgICAgZGF0YVtsZW5ndGggKiA0ICsgM10gPSAyNTU7XHJcbiAgICB9XHJcbiAgICBjdHgucHV0SW1hZ2VEYXRhKGZyYW1lLCBmcm9tLngsIGZyb20ueSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbWFnZVdyYXBwZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvbW1vbi9pbWFnZV93cmFwcGVyLmpzXG4gKiovIiwiLyoqXHJcbiAqIENvbnN0cnVjdCByZXByZXNlbnRpbmcgYSBwYXJ0IG9mIGFub3RoZXIge0ltYWdlV3JhcHBlcn0uIFNoYXJlcyBkYXRhXHJcbiAqIGJldHdlZW4gdGhlIHBhcmVudCBhbmQgdGhlIGNoaWxkLlxyXG4gKiBAcGFyYW0gZnJvbSB7SW1hZ2VSZWZ9IFRoZSBwb3NpdGlvbiB3aGVyZSB0byBzdGFydCB0aGUge1N1YkltYWdlfSBmcm9tLiAodG9wLWxlZnQgY29ybmVyKVxyXG4gKiBAcGFyYW0gc2l6ZSB7SW1hZ2VSZWZ9IFRoZSBzaXplIG9mIHRoZSByZXN1bHRpbmcgaW1hZ2VcclxuICogQHBhcmFtIEkge0ltYWdlV3JhcHBlcn0gVGhlIHtJbWFnZVdyYXBwZXJ9IHRvIHNoYXJlIGZyb21cclxuICogQHJldHVybnMge1N1YkltYWdlfSBBIHNoYXJlZCBwYXJ0IG9mIHRoZSBvcmlnaW5hbCBpbWFnZVxyXG4gKi9cclxuZnVuY3Rpb24gU3ViSW1hZ2UoZnJvbSwgc2l6ZSwgSSkge1xyXG4gICAgaWYgKCFJKSB7XHJcbiAgICAgICAgSSA9IHtcclxuICAgICAgICAgICAgZGF0YTogbnVsbCxcclxuICAgICAgICAgICAgc2l6ZTogc2l6ZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICB0aGlzLmRhdGEgPSBJLmRhdGE7XHJcbiAgICB0aGlzLm9yaWdpbmFsU2l6ZSA9IEkuc2l6ZTtcclxuICAgIHRoaXMuSSA9IEk7XHJcblxyXG4gICAgdGhpcy5mcm9tID0gZnJvbTtcclxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEaXNwbGF5cyB0aGUge1N1YkltYWdlfSBpbiBhIGdpdmVuIGNhbnZhc1xyXG4gKiBAcGFyYW0gY2FudmFzIHtDYW52YXN9IFRoZSBjYW52YXMgZWxlbWVudCB0byB3cml0ZSB0b1xyXG4gKiBAcGFyYW0gc2NhbGUge051bWJlcn0gU2NhbGUgd2hpY2ggaXMgYXBwbGllZCB0byBlYWNoIHBpeGVsLXZhbHVlXHJcbiAqL1xyXG5TdWJJbWFnZS5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKGNhbnZhcywgc2NhbGUpIHtcclxuICAgIHZhciBjdHgsXHJcbiAgICAgICAgZnJhbWUsXHJcbiAgICAgICAgZGF0YSxcclxuICAgICAgICBjdXJyZW50LFxyXG4gICAgICAgIHksXHJcbiAgICAgICAgeCxcclxuICAgICAgICBwaXhlbDtcclxuXHJcbiAgICBpZiAoIXNjYWxlKSB7XHJcbiAgICAgICAgc2NhbGUgPSAxLjA7XHJcbiAgICB9XHJcbiAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIGNhbnZhcy53aWR0aCA9IHRoaXMuc2l6ZS54O1xyXG4gICAgY2FudmFzLmhlaWdodCA9IHRoaXMuc2l6ZS55O1xyXG4gICAgZnJhbWUgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgICBkYXRhID0gZnJhbWUuZGF0YTtcclxuICAgIGN1cnJlbnQgPSAwO1xyXG4gICAgZm9yICh5ID0gMDsgeSA8IHRoaXMuc2l6ZS55OyB5KyspIHtcclxuICAgICAgICBmb3IgKHggPSAwOyB4IDwgdGhpcy5zaXplLng7IHgrKykge1xyXG4gICAgICAgICAgICBwaXhlbCA9IHkgKiB0aGlzLnNpemUueCArIHg7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLmdldCh4LCB5KSAqIHNjYWxlO1xyXG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDBdID0gY3VycmVudDtcclxuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAxXSA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMl0gPSBjdXJyZW50O1xyXG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDNdID0gMjU1O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZyYW1lLmRhdGEgPSBkYXRhO1xyXG4gICAgY3R4LnB1dEltYWdlRGF0YShmcmFtZSwgMCwgMCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0cmlldmVzIGEgZ2l2ZW4gcGl4ZWwgcG9zaXRpb24gZnJvbSB0aGUge1N1YkltYWdlfVxyXG4gKiBAcGFyYW0geCB7TnVtYmVyfSBUaGUgeC1wb3NpdGlvblxyXG4gKiBAcGFyYW0geSB7TnVtYmVyfSBUaGUgeS1wb3NpdGlvblxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgZ3JheXNjYWxlIHZhbHVlIGF0IHRoZSBwaXhlbC1wb3NpdGlvblxyXG4gKi9cclxuU3ViSW1hZ2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGFbKHRoaXMuZnJvbS55ICsgeSkgKiB0aGlzLm9yaWdpbmFsU2l6ZS54ICsgdGhpcy5mcm9tLnggKyB4XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBVcGRhdGVzIHRoZSB1bmRlcmx5aW5nIGRhdGEgZnJvbSBhIGdpdmVuIHtJbWFnZVdyYXBwZXJ9XHJcbiAqIEBwYXJhbSBpbWFnZSB7SW1hZ2VXcmFwcGVyfSBUaGUgdXBkYXRlZCBpbWFnZVxyXG4gKi9cclxuU3ViSW1hZ2UucHJvdG90eXBlLnVwZGF0ZURhdGEgPSBmdW5jdGlvbihpbWFnZSkge1xyXG4gICAgdGhpcy5vcmlnaW5hbFNpemUgPSBpbWFnZS5zaXplO1xyXG4gICAgdGhpcy5kYXRhID0gaW1hZ2UuZGF0YTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgc2hhcmVkIGFyZWFcclxuICogQHBhcmFtIGZyb20ge3gseX0gVGhlIG5ldyBsb2NhdGlvblxyXG4gKiBAcmV0dXJucyB7U3ViSW1hZ2V9IHJldHVybnMge3RoaXN9IGZvciBwb3NzaWJsZSBjaGFpbmluZ1xyXG4gKi9cclxuU3ViSW1hZ2UucHJvdG90eXBlLnVwZGF0ZUZyb20gPSBmdW5jdGlvbihmcm9tKSB7XHJcbiAgICB0aGlzLmZyb20gPSBmcm9tO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoU3ViSW1hZ2UpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vc3ViSW1hZ2UuanNcbiAqKi8iLCJpbXBvcnQgQ2x1c3RlcjIgZnJvbSAnLi9jbHVzdGVyJztcclxuaW1wb3J0IEFycmF5SGVscGVyIGZyb20gJy4vYXJyYXlfaGVscGVyJztcclxuaW1wb3J0IHt2ZWMyLCB2ZWMzfSBmcm9tICdnbC1tYXRyaXgnO1xyXG5cclxudmFyIENWVXRpbHMgPSB7fTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0geCB4LWNvb3JkaW5hdGVcclxuICogQHBhcmFtIHkgeS1jb29yZGluYXRlXHJcbiAqIEByZXR1cm4gSW1hZ2VSZWZlcmVuY2Uge3gseX0gQ29vcmRpbmF0ZVxyXG4gKi9cclxuQ1ZVdGlscy5pbWFnZVJlZiA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgIHZhciB0aGF0ID0ge1xyXG4gICAgICAgIHg6IHgsXHJcbiAgICAgICAgeTogeSxcclxuICAgICAgICB0b1ZlYzI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmVjMi5jbG9uZShbdGhpcy54LCB0aGlzLnldKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvVmVjMzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2ZWMzLmNsb25lKFt0aGlzLngsIHRoaXMueSwgMV0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm91bmQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnggPSB0aGlzLnggPiAwLjAgPyBNYXRoLmZsb29yKHRoaXMueCArIDAuNSkgOiBNYXRoLmZsb29yKHRoaXMueCAtIDAuNSk7XHJcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMueSA+IDAuMCA/IE1hdGguZmxvb3IodGhpcy55ICsgMC41KSA6IE1hdGguZmxvb3IodGhpcy55IC0gMC41KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbXB1dGVzIGFuIGludGVncmFsIGltYWdlIG9mIGEgZ2l2ZW4gZ3JheXNjYWxlIGltYWdlLlxyXG4gKiBAcGFyYW0gaW1hZ2VEYXRhQ29udGFpbmVyIHtJbWFnZURhdGFDb250YWluZXJ9IHRoZSBpbWFnZSB0byBiZSBpbnRlZ3JhdGVkXHJcbiAqL1xyXG5DVlV0aWxzLmNvbXB1dGVJbnRlZ3JhbEltYWdlMiA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgaW50ZWdyYWxXcmFwcGVyKSB7XHJcbiAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGE7XHJcbiAgICB2YXIgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54O1xyXG4gICAgdmFyIGhlaWdodCA9IGltYWdlV3JhcHBlci5zaXplLnk7XHJcbiAgICB2YXIgaW50ZWdyYWxJbWFnZURhdGEgPSBpbnRlZ3JhbFdyYXBwZXIuZGF0YTtcclxuICAgIHZhciBzdW0gPSAwLCBwb3NBID0gMCwgcG9zQiA9IDAsIHBvc0MgPSAwLCBwb3NEID0gMCwgeCwgeTtcclxuXHJcbiAgICAvLyBzdW0gdXAgZmlyc3QgY29sdW1uXHJcbiAgICBwb3NCID0gd2lkdGg7XHJcbiAgICBzdW0gPSAwO1xyXG4gICAgZm9yICggeSA9IDE7IHkgPCBoZWlnaHQ7IHkrKykge1xyXG4gICAgICAgIHN1bSArPSBpbWFnZURhdGFbcG9zQV07XHJcbiAgICAgICAgaW50ZWdyYWxJbWFnZURhdGFbcG9zQl0gKz0gc3VtO1xyXG4gICAgICAgIHBvc0EgKz0gd2lkdGg7XHJcbiAgICAgICAgcG9zQiArPSB3aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwb3NBID0gMDtcclxuICAgIHBvc0IgPSAxO1xyXG4gICAgc3VtID0gMDtcclxuICAgIGZvciAoIHggPSAxOyB4IDwgd2lkdGg7IHgrKykge1xyXG4gICAgICAgIHN1bSArPSBpbWFnZURhdGFbcG9zQV07XHJcbiAgICAgICAgaW50ZWdyYWxJbWFnZURhdGFbcG9zQl0gKz0gc3VtO1xyXG4gICAgICAgIHBvc0ErKztcclxuICAgICAgICBwb3NCKys7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICggeSA9IDE7IHkgPCBoZWlnaHQ7IHkrKykge1xyXG4gICAgICAgIHBvc0EgPSB5ICogd2lkdGggKyAxO1xyXG4gICAgICAgIHBvc0IgPSAoeSAtIDEpICogd2lkdGggKyAxO1xyXG4gICAgICAgIHBvc0MgPSB5ICogd2lkdGg7XHJcbiAgICAgICAgcG9zRCA9ICh5IC0gMSkgKiB3aWR0aDtcclxuICAgICAgICBmb3IgKCB4ID0gMTsgeCA8IHdpZHRoOyB4KyspIHtcclxuICAgICAgICAgICAgaW50ZWdyYWxJbWFnZURhdGFbcG9zQV0gKz1cclxuICAgICAgICAgICAgICAgIGltYWdlRGF0YVtwb3NBXSArIGludGVncmFsSW1hZ2VEYXRhW3Bvc0JdICsgaW50ZWdyYWxJbWFnZURhdGFbcG9zQ10gLSBpbnRlZ3JhbEltYWdlRGF0YVtwb3NEXTtcclxuICAgICAgICAgICAgcG9zQSsrO1xyXG4gICAgICAgICAgICBwb3NCKys7XHJcbiAgICAgICAgICAgIHBvc0MrKztcclxuICAgICAgICAgICAgcG9zRCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMuY29tcHV0ZUludGVncmFsSW1hZ2UgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGludGVncmFsV3JhcHBlcikge1xyXG4gICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhO1xyXG4gICAgdmFyIHdpZHRoID0gaW1hZ2VXcmFwcGVyLnNpemUueDtcclxuICAgIHZhciBoZWlnaHQgPSBpbWFnZVdyYXBwZXIuc2l6ZS55O1xyXG4gICAgdmFyIGludGVncmFsSW1hZ2VEYXRhID0gaW50ZWdyYWxXcmFwcGVyLmRhdGE7XHJcbiAgICB2YXIgc3VtID0gMDtcclxuXHJcbiAgICAvLyBzdW0gdXAgZmlyc3Qgcm93XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcclxuICAgICAgICBzdW0gKz0gaW1hZ2VEYXRhW2ldO1xyXG4gICAgICAgIGludGVncmFsSW1hZ2VEYXRhW2ldID0gc3VtO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIHYgPSAxOyB2IDwgaGVpZ2h0OyB2KyspIHtcclxuICAgICAgICBzdW0gPSAwO1xyXG4gICAgICAgIGZvciAodmFyIHUgPSAwOyB1IDwgd2lkdGg7IHUrKykge1xyXG4gICAgICAgICAgICBzdW0gKz0gaW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdO1xyXG4gICAgICAgICAgICBpbnRlZ3JhbEltYWdlRGF0YVsoKHYpICogd2lkdGgpICsgdV0gPSBzdW0gKyBpbnRlZ3JhbEltYWdlRGF0YVsodiAtIDEpICogd2lkdGggKyB1XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLnRocmVzaG9sZEltYWdlID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCB0aHJlc2hvbGQsIHRhcmdldFdyYXBwZXIpIHtcclxuICAgIGlmICghdGFyZ2V0V3JhcHBlcikge1xyXG4gICAgICAgIHRhcmdldFdyYXBwZXIgPSBpbWFnZVdyYXBwZXI7XHJcbiAgICB9XHJcbiAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGEsIGxlbmd0aCA9IGltYWdlRGF0YS5sZW5ndGgsIHRhcmdldERhdGEgPSB0YXJnZXRXcmFwcGVyLmRhdGE7XHJcblxyXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XHJcbiAgICAgICAgdGFyZ2V0RGF0YVtsZW5ndGhdID0gaW1hZ2VEYXRhW2xlbmd0aF0gPCB0aHJlc2hvbGQgPyAxIDogMDtcclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMuY29tcHV0ZUhpc3RvZ3JhbSA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgYml0c1BlclBpeGVsKSB7XHJcbiAgICBpZiAoIWJpdHNQZXJQaXhlbCkge1xyXG4gICAgICAgIGJpdHNQZXJQaXhlbCA9IDg7XHJcbiAgICB9XHJcbiAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgbGVuZ3RoID0gaW1hZ2VEYXRhLmxlbmd0aCxcclxuICAgICAgICBiaXRTaGlmdCA9IDggLSBiaXRzUGVyUGl4ZWwsXHJcbiAgICAgICAgYnVja2V0Q250ID0gMSA8PCBiaXRzUGVyUGl4ZWwsXHJcbiAgICAgICAgaGlzdCA9IG5ldyBJbnQzMkFycmF5KGJ1Y2tldENudCk7XHJcblxyXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XHJcbiAgICAgICAgaGlzdFtpbWFnZURhdGFbbGVuZ3RoXSA+PiBiaXRTaGlmdF0rKztcclxuICAgIH1cclxuICAgIHJldHVybiBoaXN0O1xyXG59O1xyXG5cclxuQ1ZVdGlscy5zaGFycGVuTGluZSA9IGZ1bmN0aW9uKGxpbmUpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIGxlbmd0aCA9IGxpbmUubGVuZ3RoLFxyXG4gICAgICAgIGxlZnQgPSBsaW5lWzBdLFxyXG4gICAgICAgIGNlbnRlciA9IGxpbmVbMV0sXHJcbiAgICAgICAgcmlnaHQ7XHJcblxyXG4gICAgZm9yIChpID0gMTsgaSA8IGxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgIHJpZ2h0ID0gbGluZVtpICsgMV07XHJcbiAgICAgICAgLy8gIC0xIDQgLTEga2VybmVsXHJcbiAgICAgICAgbGluZVtpIC0gMV0gPSAoKChjZW50ZXIgKiAyKSAtIGxlZnQgLSByaWdodCkpICYgMjU1O1xyXG4gICAgICAgIGxlZnQgPSBjZW50ZXI7XHJcbiAgICAgICAgY2VudGVyID0gcmlnaHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGluZTtcclxufTtcclxuXHJcbkNWVXRpbHMuZGV0ZXJtaW5lT3RzdVRocmVzaG9sZCA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgYml0c1BlclBpeGVsKSB7XHJcbiAgICBpZiAoIWJpdHNQZXJQaXhlbCkge1xyXG4gICAgICAgIGJpdHNQZXJQaXhlbCA9IDg7XHJcbiAgICB9XHJcbiAgICB2YXIgaGlzdCxcclxuICAgICAgICB0aHJlc2hvbGQsXHJcbiAgICAgICAgYml0U2hpZnQgPSA4IC0gYml0c1BlclBpeGVsO1xyXG5cclxuICAgIGZ1bmN0aW9uIHB4KGluaXQsIGVuZCkge1xyXG4gICAgICAgIHZhciBzdW0gPSAwLCBpO1xyXG4gICAgICAgIGZvciAoIGkgPSBpbml0OyBpIDw9IGVuZDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHN1bSArPSBoaXN0W2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3VtO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG14KGluaXQsIGVuZCkge1xyXG4gICAgICAgIHZhciBpLCBzdW0gPSAwO1xyXG5cclxuICAgICAgICBmb3IgKCBpID0gaW5pdDsgaSA8PSBlbmQ7IGkrKykge1xyXG4gICAgICAgICAgICBzdW0gKz0gaSAqIGhpc3RbaV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3VtO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRldGVybWluZVRocmVzaG9sZCgpIHtcclxuICAgICAgICB2YXIgdmV0ID0gWzBdLCBwMSwgcDIsIHAxMiwgaywgbTEsIG0yLCBtMTIsXHJcbiAgICAgICAgICAgIG1heCA9ICgxIDw8IGJpdHNQZXJQaXhlbCkgLSAxO1xyXG5cclxuICAgICAgICBoaXN0ID0gQ1ZVdGlscy5jb21wdXRlSGlzdG9ncmFtKGltYWdlV3JhcHBlciwgYml0c1BlclBpeGVsKTtcclxuICAgICAgICBmb3IgKCBrID0gMTsgayA8IG1heDsgaysrKSB7XHJcbiAgICAgICAgICAgIHAxID0gcHgoMCwgayk7XHJcbiAgICAgICAgICAgIHAyID0gcHgoayArIDEsIG1heCk7XHJcbiAgICAgICAgICAgIHAxMiA9IHAxICogcDI7XHJcbiAgICAgICAgICAgIGlmIChwMTIgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHAxMiA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbTEgPSBteCgwLCBrKSAqIHAyO1xyXG4gICAgICAgICAgICBtMiA9IG14KGsgKyAxLCBtYXgpICogcDE7XHJcbiAgICAgICAgICAgIG0xMiA9IG0xIC0gbTI7XHJcbiAgICAgICAgICAgIHZldFtrXSA9IG0xMiAqIG0xMiAvIHAxMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEFycmF5SGVscGVyLm1heEluZGV4KHZldCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhyZXNob2xkID0gZGV0ZXJtaW5lVGhyZXNob2xkKCk7XHJcbiAgICByZXR1cm4gdGhyZXNob2xkIDw8IGJpdFNoaWZ0O1xyXG59O1xyXG5cclxuQ1ZVdGlscy5vdHN1VGhyZXNob2xkID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCB0YXJnZXRXcmFwcGVyKSB7XHJcbiAgICB2YXIgdGhyZXNob2xkID0gQ1ZVdGlscy5kZXRlcm1pbmVPdHN1VGhyZXNob2xkKGltYWdlV3JhcHBlcik7XHJcblxyXG4gICAgQ1ZVdGlscy50aHJlc2hvbGRJbWFnZShpbWFnZVdyYXBwZXIsIHRocmVzaG9sZCwgdGFyZ2V0V3JhcHBlcik7XHJcbiAgICByZXR1cm4gdGhyZXNob2xkO1xyXG59O1xyXG5cclxuLy8gbG9jYWwgdGhyZXNob2xkaW5nXHJcbkNWVXRpbHMuY29tcHV0ZUJpbmFyeUltYWdlID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCBpbnRlZ3JhbFdyYXBwZXIsIHRhcmdldFdyYXBwZXIpIHtcclxuICAgIENWVXRpbHMuY29tcHV0ZUludGVncmFsSW1hZ2UoaW1hZ2VXcmFwcGVyLCBpbnRlZ3JhbFdyYXBwZXIpO1xyXG5cclxuICAgIGlmICghdGFyZ2V0V3JhcHBlcikge1xyXG4gICAgICAgIHRhcmdldFdyYXBwZXIgPSBpbWFnZVdyYXBwZXI7XHJcbiAgICB9XHJcbiAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGE7XHJcbiAgICB2YXIgdGFyZ2V0RGF0YSA9IHRhcmdldFdyYXBwZXIuZGF0YTtcclxuICAgIHZhciB3aWR0aCA9IGltYWdlV3JhcHBlci5zaXplLng7XHJcbiAgICB2YXIgaGVpZ2h0ID0gaW1hZ2VXcmFwcGVyLnNpemUueTtcclxuICAgIHZhciBpbnRlZ3JhbEltYWdlRGF0YSA9IGludGVncmFsV3JhcHBlci5kYXRhO1xyXG4gICAgdmFyIHN1bSA9IDAsIHYsIHUsIGtlcm5lbCA9IDMsIEEsIEIsIEMsIEQsIGF2Zywgc2l6ZSA9IChrZXJuZWwgKiAyICsgMSkgKiAoa2VybmVsICogMiArIDEpO1xyXG5cclxuICAgIC8vIGNsZWFyIG91dCB0b3AgJiBib3R0b20tYm9yZGVyXHJcbiAgICBmb3IgKCB2ID0gMDsgdiA8PSBrZXJuZWw7IHYrKykge1xyXG4gICAgICAgIGZvciAoIHUgPSAwOyB1IDwgd2lkdGg7IHUrKykge1xyXG4gICAgICAgICAgICB0YXJnZXREYXRhWygodikgKiB3aWR0aCkgKyB1XSA9IDA7XHJcbiAgICAgICAgICAgIHRhcmdldERhdGFbKCgoaGVpZ2h0IC0gMSkgLSB2KSAqIHdpZHRoKSArIHVdID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2xlYXIgb3V0IGxlZnQgJiByaWdodCBib3JkZXJcclxuICAgIGZvciAoIHYgPSBrZXJuZWw7IHYgPCBoZWlnaHQgLSBrZXJuZWw7IHYrKykge1xyXG4gICAgICAgIGZvciAoIHUgPSAwOyB1IDw9IGtlcm5lbDsgdSsrKSB7XHJcbiAgICAgICAgICAgIHRhcmdldERhdGFbKCh2KSAqIHdpZHRoKSArIHVdID0gMDtcclxuICAgICAgICAgICAgdGFyZ2V0RGF0YVsoKHYpICogd2lkdGgpICsgKHdpZHRoIC0gMSAtIHUpXSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIHYgPSBrZXJuZWwgKyAxOyB2IDwgaGVpZ2h0IC0ga2VybmVsIC0gMTsgdisrKSB7XHJcbiAgICAgICAgZm9yICggdSA9IGtlcm5lbCArIDE7IHUgPCB3aWR0aCAtIGtlcm5lbDsgdSsrKSB7XHJcbiAgICAgICAgICAgIEEgPSBpbnRlZ3JhbEltYWdlRGF0YVsodiAtIGtlcm5lbCAtIDEpICogd2lkdGggKyAodSAtIGtlcm5lbCAtIDEpXTtcclxuICAgICAgICAgICAgQiA9IGludGVncmFsSW1hZ2VEYXRhWyh2IC0ga2VybmVsIC0gMSkgKiB3aWR0aCArICh1ICsga2VybmVsKV07XHJcbiAgICAgICAgICAgIEMgPSBpbnRlZ3JhbEltYWdlRGF0YVsodiArIGtlcm5lbCkgKiB3aWR0aCArICh1IC0ga2VybmVsIC0gMSldO1xyXG4gICAgICAgICAgICBEID0gaW50ZWdyYWxJbWFnZURhdGFbKHYgKyBrZXJuZWwpICogd2lkdGggKyAodSArIGtlcm5lbCldO1xyXG4gICAgICAgICAgICBzdW0gPSBEIC0gQyAtIEIgKyBBO1xyXG4gICAgICAgICAgICBhdmcgPSBzdW0gLyAoc2l6ZSk7XHJcbiAgICAgICAgICAgIHRhcmdldERhdGFbdiAqIHdpZHRoICsgdV0gPSBpbWFnZURhdGFbdiAqIHdpZHRoICsgdV0gPiAoYXZnICsgNSkgPyAwIDogMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLmNsdXN0ZXIgPSBmdW5jdGlvbihwb2ludHMsIHRocmVzaG9sZCwgcHJvcGVydHkpIHtcclxuICAgIHZhciBpLCBrLCBjbHVzdGVyLCBwb2ludCwgY2x1c3RlcnMgPSBbXTtcclxuXHJcbiAgICBpZiAoIXByb3BlcnR5KSB7XHJcbiAgICAgICAgcHJvcGVydHkgPSBcInJhZFwiO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFRvQ2x1c3RlcihuZXdQb2ludCkge1xyXG4gICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAoIGsgPSAwOyBrIDwgY2x1c3RlcnMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgY2x1c3RlciA9IGNsdXN0ZXJzW2tdO1xyXG4gICAgICAgICAgICBpZiAoY2x1c3Rlci5maXRzKG5ld1BvaW50KSkge1xyXG4gICAgICAgICAgICAgICAgY2x1c3Rlci5hZGQobmV3UG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmb3VuZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpdGVyYXRlIG92ZXIgZWFjaCBjbG91ZFxyXG4gICAgZm9yICggaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwb2ludCA9IENsdXN0ZXIyLmNyZWF0ZVBvaW50KHBvaW50c1tpXSwgaSwgcHJvcGVydHkpO1xyXG4gICAgICAgIGlmICghYWRkVG9DbHVzdGVyKHBvaW50KSkge1xyXG4gICAgICAgICAgICBjbHVzdGVycy5wdXNoKENsdXN0ZXIyLmNyZWF0ZShwb2ludCwgdGhyZXNob2xkKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNsdXN0ZXJzO1xyXG59O1xyXG5cclxuQ1ZVdGlscy5UcmFjZXIgPSB7XHJcbiAgICB0cmFjZTogZnVuY3Rpb24ocG9pbnRzLCB2ZWMpIHtcclxuICAgICAgICB2YXIgaXRlcmF0aW9uLCBtYXhJdGVyYXRpb25zID0gMTAsIHRvcCA9IFtdLCByZXN1bHQgPSBbXSwgY2VudGVyUG9zID0gMCwgY3VycmVudFBvcyA9IDA7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRyYWNlKGlkeCwgZm9yd2FyZCkge1xyXG4gICAgICAgICAgICB2YXIgZnJvbSwgdG8sIHRvSWR4LCBwcmVkaWN0ZWRQb3MsIHRocmVzaG9sZFggPSAxLCB0aHJlc2hvbGRZID0gTWF0aC5hYnModmVjWzFdIC8gMTApLCBmb3VuZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gbWF0Y2gocG9zLCBwcmVkaWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwb3MueCA+IChwcmVkaWN0ZWQueCAtIHRocmVzaG9sZFgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHBvcy54IDwgKHByZWRpY3RlZC54ICsgdGhyZXNob2xkWClcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgcG9zLnkgPiAocHJlZGljdGVkLnkgLSB0aHJlc2hvbGRZKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBwb3MueSA8IChwcmVkaWN0ZWQueSArIHRocmVzaG9sZFkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIG5leHQgaW5kZXggaXMgd2l0aGluIHRoZSB2ZWMgc3BlY2lmaWNhdGlvbnNcclxuICAgICAgICAgICAgLy8gaWYgbm90LCBjaGVjayBhcyBsb25nIGFzIHRoZSB0aHJlc2hvbGQgaXMgbWV0XHJcblxyXG4gICAgICAgICAgICBmcm9tID0gcG9pbnRzW2lkeF07XHJcbiAgICAgICAgICAgIGlmIChmb3J3YXJkKSB7XHJcbiAgICAgICAgICAgICAgICBwcmVkaWN0ZWRQb3MgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogZnJvbS54ICsgdmVjWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IGZyb20ueSArIHZlY1sxXVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHByZWRpY3RlZFBvcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBmcm9tLnggLSB2ZWNbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgeTogZnJvbS55IC0gdmVjWzFdXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0b0lkeCA9IGZvcndhcmQgPyBpZHggKyAxIDogaWR4IC0gMTtcclxuICAgICAgICAgICAgdG8gPSBwb2ludHNbdG9JZHhdO1xyXG4gICAgICAgICAgICB3aGlsZSAodG8gJiYgKCBmb3VuZCA9IG1hdGNoKHRvLCBwcmVkaWN0ZWRQb3MpKSAhPT0gdHJ1ZSAmJiAoTWF0aC5hYnModG8ueSAtIGZyb20ueSkgPCB2ZWNbMV0pKSB7XHJcbiAgICAgICAgICAgICAgICB0b0lkeCA9IGZvcndhcmQgPyB0b0lkeCArIDEgOiB0b0lkeCAtIDE7XHJcbiAgICAgICAgICAgICAgICB0byA9IHBvaW50c1t0b0lkeF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmb3VuZCA/IHRvSWR4IDogbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoIGl0ZXJhdGlvbiA9IDA7IGl0ZXJhdGlvbiA8IG1heEl0ZXJhdGlvbnM7IGl0ZXJhdGlvbisrKSB7XHJcbiAgICAgICAgICAgIC8vIHJhbmRvbWx5IHNlbGVjdCBwb2ludCB0byBzdGFydCB3aXRoXHJcbiAgICAgICAgICAgIGNlbnRlclBvcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvaW50cy5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgLy8gdHJhY2UgZm9yd2FyZFxyXG4gICAgICAgICAgICB0b3AgPSBbXTtcclxuICAgICAgICAgICAgY3VycmVudFBvcyA9IGNlbnRlclBvcztcclxuICAgICAgICAgICAgdG9wLnB1c2gocG9pbnRzW2N1cnJlbnRQb3NdKTtcclxuICAgICAgICAgICAgd2hpbGUgKCggY3VycmVudFBvcyA9IHRyYWNlKGN1cnJlbnRQb3MsIHRydWUpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdG9wLnB1c2gocG9pbnRzW2N1cnJlbnRQb3NdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2VudGVyUG9zID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFBvcyA9IGNlbnRlclBvcztcclxuICAgICAgICAgICAgICAgIHdoaWxlICgoIGN1cnJlbnRQb3MgPSB0cmFjZShjdXJyZW50UG9zLCBmYWxzZSkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wLnB1c2gocG9pbnRzW2N1cnJlbnRQb3NdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRvcC5sZW5ndGggPiByZXN1bHQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0b3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMuRElMQVRFID0gMTtcclxuQ1ZVdGlscy5FUk9ERSA9IDI7XHJcblxyXG5DVlV0aWxzLmRpbGF0ZSA9IGZ1bmN0aW9uKGluSW1hZ2VXcmFwcGVyLCBvdXRJbWFnZVdyYXBwZXIpIHtcclxuICAgIHZhciB2LFxyXG4gICAgICAgIHUsXHJcbiAgICAgICAgaW5JbWFnZURhdGEgPSBpbkltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgIG91dEltYWdlRGF0YSA9IG91dEltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgIGhlaWdodCA9IGluSW1hZ2VXcmFwcGVyLnNpemUueSxcclxuICAgICAgICB3aWR0aCA9IGluSW1hZ2VXcmFwcGVyLnNpemUueCxcclxuICAgICAgICBzdW0sXHJcbiAgICAgICAgeVN0YXJ0MSxcclxuICAgICAgICB5U3RhcnQyLFxyXG4gICAgICAgIHhTdGFydDEsXHJcbiAgICAgICAgeFN0YXJ0MjtcclxuXHJcbiAgICBmb3IgKCB2ID0gMTsgdiA8IGhlaWdodCAtIDE7IHYrKykge1xyXG4gICAgICAgIGZvciAoIHUgPSAxOyB1IDwgd2lkdGggLSAxOyB1KyspIHtcclxuICAgICAgICAgICAgeVN0YXJ0MSA9IHYgLSAxO1xyXG4gICAgICAgICAgICB5U3RhcnQyID0gdiArIDE7XHJcbiAgICAgICAgICAgIHhTdGFydDEgPSB1IC0gMTtcclxuICAgICAgICAgICAgeFN0YXJ0MiA9IHUgKyAxO1xyXG4gICAgICAgICAgICBzdW0gPSBpbkltYWdlRGF0YVt5U3RhcnQxICogd2lkdGggKyB4U3RhcnQxXSArIGluSW1hZ2VEYXRhW3lTdGFydDEgKiB3aWR0aCArIHhTdGFydDJdICtcclxuICAgICAgICAgICAgaW5JbWFnZURhdGFbdiAqIHdpZHRoICsgdV0gK1xyXG4gICAgICAgICAgICBpbkltYWdlRGF0YVt5U3RhcnQyICogd2lkdGggKyB4U3RhcnQxXSArIGluSW1hZ2VEYXRhW3lTdGFydDIgKiB3aWR0aCArIHhTdGFydDJdO1xyXG4gICAgICAgICAgICBvdXRJbWFnZURhdGFbdiAqIHdpZHRoICsgdV0gPSBzdW0gPiAwID8gMSA6IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5lcm9kZSA9IGZ1bmN0aW9uKGluSW1hZ2VXcmFwcGVyLCBvdXRJbWFnZVdyYXBwZXIpIHtcclxuICAgIHZhciB2LFxyXG4gICAgICAgIHUsXHJcbiAgICAgICAgaW5JbWFnZURhdGEgPSBpbkltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgIG91dEltYWdlRGF0YSA9IG91dEltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgIGhlaWdodCA9IGluSW1hZ2VXcmFwcGVyLnNpemUueSxcclxuICAgICAgICB3aWR0aCA9IGluSW1hZ2VXcmFwcGVyLnNpemUueCxcclxuICAgICAgICBzdW0sXHJcbiAgICAgICAgeVN0YXJ0MSxcclxuICAgICAgICB5U3RhcnQyLFxyXG4gICAgICAgIHhTdGFydDEsXHJcbiAgICAgICAgeFN0YXJ0MjtcclxuXHJcbiAgICBmb3IgKCB2ID0gMTsgdiA8IGhlaWdodCAtIDE7IHYrKykge1xyXG4gICAgICAgIGZvciAoIHUgPSAxOyB1IDwgd2lkdGggLSAxOyB1KyspIHtcclxuICAgICAgICAgICAgeVN0YXJ0MSA9IHYgLSAxO1xyXG4gICAgICAgICAgICB5U3RhcnQyID0gdiArIDE7XHJcbiAgICAgICAgICAgIHhTdGFydDEgPSB1IC0gMTtcclxuICAgICAgICAgICAgeFN0YXJ0MiA9IHUgKyAxO1xyXG4gICAgICAgICAgICBzdW0gPSBpbkltYWdlRGF0YVt5U3RhcnQxICogd2lkdGggKyB4U3RhcnQxXSArIGluSW1hZ2VEYXRhW3lTdGFydDEgKiB3aWR0aCArIHhTdGFydDJdICtcclxuICAgICAgICAgICAgaW5JbWFnZURhdGFbdiAqIHdpZHRoICsgdV0gK1xyXG4gICAgICAgICAgICBpbkltYWdlRGF0YVt5U3RhcnQyICogd2lkdGggKyB4U3RhcnQxXSArIGluSW1hZ2VEYXRhW3lTdGFydDIgKiB3aWR0aCArIHhTdGFydDJdO1xyXG4gICAgICAgICAgICBvdXRJbWFnZURhdGFbdiAqIHdpZHRoICsgdV0gPSBzdW0gPT09IDUgPyAxIDogMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLnN1YnRyYWN0ID0gZnVuY3Rpb24oYUltYWdlV3JhcHBlciwgYkltYWdlV3JhcHBlciwgcmVzdWx0SW1hZ2VXcmFwcGVyKSB7XHJcbiAgICBpZiAoIXJlc3VsdEltYWdlV3JhcHBlcikge1xyXG4gICAgICAgIHJlc3VsdEltYWdlV3JhcHBlciA9IGFJbWFnZVdyYXBwZXI7XHJcbiAgICB9XHJcbiAgICB2YXIgbGVuZ3RoID0gYUltYWdlV3JhcHBlci5kYXRhLmxlbmd0aCxcclxuICAgICAgICBhSW1hZ2VEYXRhID0gYUltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgIGJJbWFnZURhdGEgPSBiSW1hZ2VXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgY0ltYWdlRGF0YSA9IHJlc3VsdEltYWdlV3JhcHBlci5kYXRhO1xyXG5cclxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgIGNJbWFnZURhdGFbbGVuZ3RoXSA9IGFJbWFnZURhdGFbbGVuZ3RoXSAtIGJJbWFnZURhdGFbbGVuZ3RoXTtcclxuICAgIH1cclxufTtcclxuXHJcbkNWVXRpbHMuYml0d2lzZU9yID0gZnVuY3Rpb24oYUltYWdlV3JhcHBlciwgYkltYWdlV3JhcHBlciwgcmVzdWx0SW1hZ2VXcmFwcGVyKSB7XHJcbiAgICBpZiAoIXJlc3VsdEltYWdlV3JhcHBlcikge1xyXG4gICAgICAgIHJlc3VsdEltYWdlV3JhcHBlciA9IGFJbWFnZVdyYXBwZXI7XHJcbiAgICB9XHJcbiAgICB2YXIgbGVuZ3RoID0gYUltYWdlV3JhcHBlci5kYXRhLmxlbmd0aCxcclxuICAgICAgICBhSW1hZ2VEYXRhID0gYUltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgIGJJbWFnZURhdGEgPSBiSW1hZ2VXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgY0ltYWdlRGF0YSA9IHJlc3VsdEltYWdlV3JhcHBlci5kYXRhO1xyXG5cclxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgIGNJbWFnZURhdGFbbGVuZ3RoXSA9IGFJbWFnZURhdGFbbGVuZ3RoXSB8fCBiSW1hZ2VEYXRhW2xlbmd0aF07XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLmNvdW50Tm9uWmVybyA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlcikge1xyXG4gICAgdmFyIGxlbmd0aCA9IGltYWdlV3JhcHBlci5kYXRhLmxlbmd0aCwgZGF0YSA9IGltYWdlV3JhcHBlci5kYXRhLCBzdW0gPSAwO1xyXG5cclxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgIHN1bSArPSBkYXRhW2xlbmd0aF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VtO1xyXG59O1xyXG5cclxuQ1ZVdGlscy50b3BHZW5lcmljID0gZnVuY3Rpb24obGlzdCwgdG9wLCBzY29yZUZ1bmMpIHtcclxuICAgIHZhciBpLCBtaW5JZHggPSAwLCBtaW4gPSAwLCBxdWV1ZSA9IFtdLCBzY29yZSwgaGl0LCBwb3M7XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCB0b3A7IGkrKykge1xyXG4gICAgICAgIHF1ZXVlW2ldID0ge1xyXG4gICAgICAgICAgICBzY29yZTogMCxcclxuICAgICAgICAgICAgaXRlbTogbnVsbFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgc2NvcmUgPSBzY29yZUZ1bmMuYXBwbHkodGhpcywgW2xpc3RbaV1dKTtcclxuICAgICAgICBpZiAoc2NvcmUgPiBtaW4pIHtcclxuICAgICAgICAgICAgaGl0ID0gcXVldWVbbWluSWR4XTtcclxuICAgICAgICAgICAgaGl0LnNjb3JlID0gc2NvcmU7XHJcbiAgICAgICAgICAgIGhpdC5pdGVtID0gbGlzdFtpXTtcclxuICAgICAgICAgICAgbWluID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuICAgICAgICAgICAgZm9yICggcG9zID0gMDsgcG9zIDwgdG9wOyBwb3MrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlW3Bvc10uc2NvcmUgPCBtaW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBtaW4gPSBxdWV1ZVtwb3NdLnNjb3JlO1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbklkeCA9IHBvcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcXVldWU7XHJcbn07XHJcblxyXG5DVlV0aWxzLmdyYXlBcnJheUZyb21JbWFnZSA9IGZ1bmN0aW9uKGh0bWxJbWFnZSwgb2Zmc2V0WCwgY3R4LCBhcnJheSkge1xyXG4gICAgY3R4LmRyYXdJbWFnZShodG1sSW1hZ2UsIG9mZnNldFgsIDAsIGh0bWxJbWFnZS53aWR0aCwgaHRtbEltYWdlLmhlaWdodCk7XHJcbiAgICB2YXIgY3R4RGF0YSA9IGN0eC5nZXRJbWFnZURhdGEob2Zmc2V0WCwgMCwgaHRtbEltYWdlLndpZHRoLCBodG1sSW1hZ2UuaGVpZ2h0KS5kYXRhO1xyXG4gICAgQ1ZVdGlscy5jb21wdXRlR3JheShjdHhEYXRhLCBhcnJheSk7XHJcbn07XHJcblxyXG5DVlV0aWxzLmdyYXlBcnJheUZyb21Db250ZXh0ID0gZnVuY3Rpb24oY3R4LCBzaXplLCBvZmZzZXQsIGFycmF5KSB7XHJcbiAgICB2YXIgY3R4RGF0YSA9IGN0eC5nZXRJbWFnZURhdGEob2Zmc2V0LngsIG9mZnNldC55LCBzaXplLngsIHNpemUueSkuZGF0YTtcclxuICAgIENWVXRpbHMuY29tcHV0ZUdyYXkoY3R4RGF0YSwgYXJyYXkpO1xyXG59O1xyXG5cclxuQ1ZVdGlscy5ncmF5QW5kSGFsZlNhbXBsZUZyb21DYW52YXNEYXRhID0gZnVuY3Rpb24oY2FudmFzRGF0YSwgc2l6ZSwgb3V0QXJyYXkpIHtcclxuICAgIHZhciB0b3BSb3dJZHggPSAwO1xyXG4gICAgdmFyIGJvdHRvbVJvd0lkeCA9IHNpemUueDtcclxuICAgIHZhciBlbmRJZHggPSBNYXRoLmZsb29yKGNhbnZhc0RhdGEubGVuZ3RoIC8gNCk7XHJcbiAgICB2YXIgb3V0V2lkdGggPSBzaXplLnggLyAyO1xyXG4gICAgdmFyIG91dEltZ0lkeCA9IDA7XHJcbiAgICB2YXIgaW5XaWR0aCA9IHNpemUueDtcclxuICAgIHZhciBpO1xyXG5cclxuICAgIHdoaWxlIChib3R0b21Sb3dJZHggPCBlbmRJZHgpIHtcclxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IG91dFdpZHRoOyBpKyspIHtcclxuICAgICAgICAgICAgb3V0QXJyYXlbb3V0SW1nSWR4XSA9IE1hdGguZmxvb3IoKFxyXG4gICAgICAgICAgICAgICAgKDAuMjk5ICogY2FudmFzRGF0YVt0b3BSb3dJZHggKiA0ICsgMF0gK1xyXG4gICAgICAgICAgICAgICAgIDAuNTg3ICogY2FudmFzRGF0YVt0b3BSb3dJZHggKiA0ICsgMV0gK1xyXG4gICAgICAgICAgICAgICAgIDAuMTE0ICogY2FudmFzRGF0YVt0b3BSb3dJZHggKiA0ICsgMl0pICtcclxuICAgICAgICAgICAgICAgICgwLjI5OSAqIGNhbnZhc0RhdGFbKHRvcFJvd0lkeCArIDEpICogNCArIDBdICtcclxuICAgICAgICAgICAgICAgICAwLjU4NyAqIGNhbnZhc0RhdGFbKHRvcFJvd0lkeCArIDEpICogNCArIDFdICtcclxuICAgICAgICAgICAgICAgICAwLjExNCAqIGNhbnZhc0RhdGFbKHRvcFJvd0lkeCArIDEpICogNCArIDJdKSArXHJcbiAgICAgICAgICAgICAgICAoMC4yOTkgKiBjYW52YXNEYXRhWyhib3R0b21Sb3dJZHgpICogNCArIDBdICtcclxuICAgICAgICAgICAgICAgICAwLjU4NyAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCkgKiA0ICsgMV0gK1xyXG4gICAgICAgICAgICAgICAgIDAuMTE0ICogY2FudmFzRGF0YVsoYm90dG9tUm93SWR4KSAqIDQgKyAyXSkgK1xyXG4gICAgICAgICAgICAgICAgKDAuMjk5ICogY2FudmFzRGF0YVsoYm90dG9tUm93SWR4ICsgMSkgKiA0ICsgMF0gK1xyXG4gICAgICAgICAgICAgICAgIDAuNTg3ICogY2FudmFzRGF0YVsoYm90dG9tUm93SWR4ICsgMSkgKiA0ICsgMV0gK1xyXG4gICAgICAgICAgICAgICAgIDAuMTE0ICogY2FudmFzRGF0YVsoYm90dG9tUm93SWR4ICsgMSkgKiA0ICsgMl0pKSAvIDQpO1xyXG4gICAgICAgICAgICBvdXRJbWdJZHgrKztcclxuICAgICAgICAgICAgdG9wUm93SWR4ID0gdG9wUm93SWR4ICsgMjtcclxuICAgICAgICAgICAgYm90dG9tUm93SWR4ID0gYm90dG9tUm93SWR4ICsgMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdG9wUm93SWR4ID0gdG9wUm93SWR4ICsgaW5XaWR0aDtcclxuICAgICAgICBib3R0b21Sb3dJZHggPSBib3R0b21Sb3dJZHggKyBpbldpZHRoO1xyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5jb21wdXRlR3JheSA9IGZ1bmN0aW9uKGltYWdlRGF0YSwgb3V0QXJyYXksIGNvbmZpZykge1xyXG4gICAgdmFyIGwgPSAoaW1hZ2VEYXRhLmxlbmd0aCAvIDQpIHwgMCxcclxuICAgICAgICBpLFxyXG4gICAgICAgIHNpbmdsZUNoYW5uZWwgPSBjb25maWcgJiYgY29uZmlnLnNpbmdsZUNoYW5uZWwgPT09IHRydWU7XHJcblxyXG4gICAgaWYgKHNpbmdsZUNoYW5uZWwpIHtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG91dEFycmF5W2ldID0gaW1hZ2VEYXRhW2kgKiA0ICsgMF07XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG91dEFycmF5W2ldID0gTWF0aC5mbG9vcihcclxuICAgICAgICAgICAgICAgIDAuMjk5ICogaW1hZ2VEYXRhW2kgKiA0ICsgMF0gKyAwLjU4NyAqIGltYWdlRGF0YVtpICogNCArIDFdICsgMC4xMTQgKiBpbWFnZURhdGFbaSAqIDQgKyAyXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5sb2FkSW1hZ2VBcnJheSA9IGZ1bmN0aW9uKHNyYywgY2FsbGJhY2ssIGNhbnZhcykge1xyXG4gICAgaWYgKCFjYW52YXMpIHtcclxuICAgICAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgIH1cclxuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgIGltZy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHRoaXMud2lkdGg7XHJcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG4gICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMsIDAsIDApO1xyXG4gICAgICAgIHZhciBhcnJheSA9IG5ldyBVaW50OEFycmF5KHRoaXMud2lkdGggKiB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLCAwLCAwKTtcclxuICAgICAgICB2YXIgZGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpLmRhdGE7XHJcbiAgICAgICAgQ1ZVdGlscy5jb21wdXRlR3JheShkYXRhLCBhcnJheSk7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayhhcnJheSwge1xyXG4gICAgICAgICAgICB4OiB0aGlzLndpZHRoLFxyXG4gICAgICAgICAgICB5OiB0aGlzLmhlaWdodFxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfTtcclxuICAgIGltZy5zcmMgPSBzcmM7XHJcbn07XHJcblxyXG4vKipcclxuICogQHBhcmFtIGluSW1nIHtJbWFnZVdyYXBwZXJ9IGlucHV0IGltYWdlIHRvIGJlIHNhbXBsZWRcclxuICogQHBhcmFtIG91dEltZyB7SW1hZ2VXcmFwcGVyfSB0byBiZSBzdG9yZWQgaW5cclxuICovXHJcbkNWVXRpbHMuaGFsZlNhbXBsZSA9IGZ1bmN0aW9uKGluSW1nV3JhcHBlciwgb3V0SW1nV3JhcHBlcikge1xyXG4gICAgdmFyIGluSW1nID0gaW5JbWdXcmFwcGVyLmRhdGE7XHJcbiAgICB2YXIgaW5XaWR0aCA9IGluSW1nV3JhcHBlci5zaXplLng7XHJcbiAgICB2YXIgb3V0SW1nID0gb3V0SW1nV3JhcHBlci5kYXRhO1xyXG4gICAgdmFyIHRvcFJvd0lkeCA9IDA7XHJcbiAgICB2YXIgYm90dG9tUm93SWR4ID0gaW5XaWR0aDtcclxuICAgIHZhciBlbmRJZHggPSBpbkltZy5sZW5ndGg7XHJcbiAgICB2YXIgb3V0V2lkdGggPSBpbldpZHRoIC8gMjtcclxuICAgIHZhciBvdXRJbWdJZHggPSAwO1xyXG4gICAgd2hpbGUgKGJvdHRvbVJvd0lkeCA8IGVuZElkeCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3V0V2lkdGg7IGkrKykge1xyXG4gICAgICAgICAgICBvdXRJbWdbb3V0SW1nSWR4XSA9IE1hdGguZmxvb3IoXHJcbiAgICAgICAgICAgICAgICAoaW5JbWdbdG9wUm93SWR4XSArIGluSW1nW3RvcFJvd0lkeCArIDFdICsgaW5JbWdbYm90dG9tUm93SWR4XSArIGluSW1nW2JvdHRvbVJvd0lkeCArIDFdKSAvIDQpO1xyXG4gICAgICAgICAgICBvdXRJbWdJZHgrKztcclxuICAgICAgICAgICAgdG9wUm93SWR4ID0gdG9wUm93SWR4ICsgMjtcclxuICAgICAgICAgICAgYm90dG9tUm93SWR4ID0gYm90dG9tUm93SWR4ICsgMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdG9wUm93SWR4ID0gdG9wUm93SWR4ICsgaW5XaWR0aDtcclxuICAgICAgICBib3R0b21Sb3dJZHggPSBib3R0b21Sb3dJZHggKyBpbldpZHRoO1xyXG4gICAgfVxyXG59O1xyXG5cclxuQ1ZVdGlscy5oc3YycmdiID0gZnVuY3Rpb24oaHN2LCByZ2IpIHtcclxuICAgIHZhciBoID0gaHN2WzBdLFxyXG4gICAgICAgIHMgPSBoc3ZbMV0sXHJcbiAgICAgICAgdiA9IGhzdlsyXSxcclxuICAgICAgICBjID0gdiAqIHMsXHJcbiAgICAgICAgeCA9IGMgKiAoMSAtIE1hdGguYWJzKChoIC8gNjApICUgMiAtIDEpKSxcclxuICAgICAgICBtID0gdiAtIGMsXHJcbiAgICAgICAgciA9IDAsXHJcbiAgICAgICAgZyA9IDAsXHJcbiAgICAgICAgYiA9IDA7XHJcblxyXG4gICAgcmdiID0gcmdiIHx8IFswLCAwLCAwXTtcclxuXHJcbiAgICBpZiAoaCA8IDYwKSB7XHJcbiAgICAgICAgciA9IGM7XHJcbiAgICAgICAgZyA9IHg7XHJcbiAgICB9IGVsc2UgaWYgKGggPCAxMjApIHtcclxuICAgICAgICByID0geDtcclxuICAgICAgICBnID0gYztcclxuICAgIH0gZWxzZSBpZiAoaCA8IDE4MCkge1xyXG4gICAgICAgIGcgPSBjO1xyXG4gICAgICAgIGIgPSB4O1xyXG4gICAgfSBlbHNlIGlmIChoIDwgMjQwKSB7XHJcbiAgICAgICAgZyA9IHg7XHJcbiAgICAgICAgYiA9IGM7XHJcbiAgICB9IGVsc2UgaWYgKGggPCAzMDApIHtcclxuICAgICAgICByID0geDtcclxuICAgICAgICBiID0gYztcclxuICAgIH0gZWxzZSBpZiAoaCA8IDM2MCkge1xyXG4gICAgICAgIHIgPSBjO1xyXG4gICAgICAgIGIgPSB4O1xyXG4gICAgfVxyXG4gICAgcmdiWzBdID0gKChyICsgbSkgKiAyNTUpIHwgMDtcclxuICAgIHJnYlsxXSA9ICgoZyArIG0pICogMjU1KSB8IDA7XHJcbiAgICByZ2JbMl0gPSAoKGIgKyBtKSAqIDI1NSkgfCAwO1xyXG4gICAgcmV0dXJuIHJnYjtcclxufTtcclxuXHJcbkNWVXRpbHMuX2NvbXB1dGVEaXZpc29ycyA9IGZ1bmN0aW9uKG4pIHtcclxuICAgIHZhciBsYXJnZURpdmlzb3JzID0gW10sXHJcbiAgICAgICAgZGl2aXNvcnMgPSBbXSxcclxuICAgICAgICBpO1xyXG5cclxuICAgIGZvciAoaSA9IDE7IGkgPCBNYXRoLnNxcnQobikgKyAxOyBpKyspIHtcclxuICAgICAgICBpZiAobiAlIGkgPT09IDApIHtcclxuICAgICAgICAgICAgZGl2aXNvcnMucHVzaChpKTtcclxuICAgICAgICAgICAgaWYgKGkgIT09IG4gLyBpKSB7XHJcbiAgICAgICAgICAgICAgICBsYXJnZURpdmlzb3JzLnVuc2hpZnQoTWF0aC5mbG9vcihuIC8gaSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRpdmlzb3JzLmNvbmNhdChsYXJnZURpdmlzb3JzKTtcclxufTtcclxuXHJcbkNWVXRpbHMuX2NvbXB1dGVJbnRlcnNlY3Rpb24gPSBmdW5jdGlvbihhcnIxLCBhcnIyKSB7XHJcbiAgICB2YXIgaSA9IDAsXHJcbiAgICAgICAgaiA9IDAsXHJcbiAgICAgICAgcmVzdWx0ID0gW107XHJcblxyXG4gICAgd2hpbGUgKGkgPCBhcnIxLmxlbmd0aCAmJiBqIDwgYXJyMi5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoYXJyMVtpXSA9PT0gYXJyMltqXSkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChhcnIxW2ldKTtcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICBqKys7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcnIxW2ldID4gYXJyMltqXSkge1xyXG4gICAgICAgICAgICBqKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5DVlV0aWxzLmNhbGN1bGF0ZVBhdGNoU2l6ZSA9IGZ1bmN0aW9uKHBhdGNoU2l6ZSwgaW1nU2l6ZSkge1xyXG4gICAgdmFyIGRpdmlzb3JzWCA9IHRoaXMuX2NvbXB1dGVEaXZpc29ycyhpbWdTaXplLngpLFxyXG4gICAgICAgIGRpdmlzb3JzWSA9IHRoaXMuX2NvbXB1dGVEaXZpc29ycyhpbWdTaXplLnkpLFxyXG4gICAgICAgIHdpZGVTaWRlID0gTWF0aC5tYXgoaW1nU2l6ZS54LCBpbWdTaXplLnkpLFxyXG4gICAgICAgIGNvbW1vbiA9IHRoaXMuX2NvbXB1dGVJbnRlcnNlY3Rpb24oZGl2aXNvcnNYLCBkaXZpc29yc1kpLFxyXG4gICAgICAgIG5yT2ZQYXRjaGVzTGlzdCA9IFs4LCAxMCwgMTUsIDIwLCAzMiwgNjAsIDgwXSxcclxuICAgICAgICBuck9mUGF0Y2hlc01hcCA9IHtcclxuICAgICAgICAgICAgXCJ4LXNtYWxsXCI6IDUsXHJcbiAgICAgICAgICAgIFwic21hbGxcIjogNCxcclxuICAgICAgICAgICAgXCJtZWRpdW1cIjogMyxcclxuICAgICAgICAgICAgXCJsYXJnZVwiOiAyLFxyXG4gICAgICAgICAgICBcIngtbGFyZ2VcIjogMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbnJPZlBhdGNoZXNJZHggPSBuck9mUGF0Y2hlc01hcFtwYXRjaFNpemVdIHx8IG5yT2ZQYXRjaGVzTWFwLm1lZGl1bSxcclxuICAgICAgICBuck9mUGF0Y2hlcyA9IG5yT2ZQYXRjaGVzTGlzdFtuck9mUGF0Y2hlc0lkeF0sXHJcbiAgICAgICAgZGVzaXJlZFBhdGNoU2l6ZSA9IE1hdGguZmxvb3Iod2lkZVNpZGUgLyBuck9mUGF0Y2hlcyksXHJcbiAgICAgICAgb3B0aW1hbFBhdGNoU2l6ZTtcclxuXHJcbiAgICBmdW5jdGlvbiBmaW5kUGF0Y2hTaXplRm9yRGl2aXNvcnMoZGl2aXNvcnMpIHtcclxuICAgICAgICB2YXIgaSA9IDAsXHJcbiAgICAgICAgICAgIGZvdW5kID0gZGl2aXNvcnNbTWF0aC5mbG9vcihkaXZpc29ycy5sZW5ndGggLyAyKV07XHJcblxyXG4gICAgICAgIHdoaWxlIChpIDwgKGRpdmlzb3JzLmxlbmd0aCAtIDEpICYmIGRpdmlzb3JzW2ldIDwgZGVzaXJlZFBhdGNoU2l6ZSkge1xyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpID4gMCkge1xyXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGl2aXNvcnNbaV0gLSBkZXNpcmVkUGF0Y2hTaXplKSA+IE1hdGguYWJzKGRpdmlzb3JzW2kgLSAxXSAtIGRlc2lyZWRQYXRjaFNpemUpKSB7XHJcbiAgICAgICAgICAgICAgICBmb3VuZCA9IGRpdmlzb3JzW2kgLSAxXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvdW5kID0gZGl2aXNvcnNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRlc2lyZWRQYXRjaFNpemUgLyBmb3VuZCA8IG5yT2ZQYXRjaGVzTGlzdFtuck9mUGF0Y2hlc0lkeCArIDFdIC8gbnJPZlBhdGNoZXNMaXN0W25yT2ZQYXRjaGVzSWR4XSAmJlxyXG4gICAgICAgICAgICBkZXNpcmVkUGF0Y2hTaXplIC8gZm91bmQgPiBuck9mUGF0Y2hlc0xpc3RbbnJPZlBhdGNoZXNJZHggLSAxXSAvIG5yT2ZQYXRjaGVzTGlzdFtuck9mUGF0Y2hlc0lkeF0gKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7eDogZm91bmQsIHk6IGZvdW5kfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgb3B0aW1hbFBhdGNoU2l6ZSA9IGZpbmRQYXRjaFNpemVGb3JEaXZpc29ycyhjb21tb24pO1xyXG4gICAgaWYgKCFvcHRpbWFsUGF0Y2hTaXplKSB7XHJcbiAgICAgICAgb3B0aW1hbFBhdGNoU2l6ZSA9IGZpbmRQYXRjaFNpemVGb3JEaXZpc29ycyh0aGlzLl9jb21wdXRlRGl2aXNvcnMod2lkZVNpZGUpKTtcclxuICAgICAgICBpZiAoIW9wdGltYWxQYXRjaFNpemUpIHtcclxuICAgICAgICAgICAgb3B0aW1hbFBhdGNoU2l6ZSA9IGZpbmRQYXRjaFNpemVGb3JEaXZpc29ycygodGhpcy5fY29tcHV0ZURpdmlzb3JzKGRlc2lyZWRQYXRjaFNpemUgKiBuck9mUGF0Y2hlcykpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3B0aW1hbFBhdGNoU2l6ZTtcclxufTtcclxuXHJcbkNWVXRpbHMuX3BhcnNlQ1NTRGltZW5zaW9uVmFsdWVzID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICAgIHZhciBkaW1lbnNpb24gPSB7XHJcbiAgICAgICAgdmFsdWU6IHBhcnNlRmxvYXQodmFsdWUpLFxyXG4gICAgICAgIHVuaXQ6IHZhbHVlLmluZGV4T2YoXCIlXCIpID09PSB2YWx1ZS5sZW5ndGggLSAxID8gXCIlXCIgOiBcIiVcIlxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZGltZW5zaW9uO1xyXG59O1xyXG5cclxuQ1ZVdGlscy5fZGltZW5zaW9uc0NvbnZlcnRlcnMgPSB7XHJcbiAgICB0b3A6IGZ1bmN0aW9uKGRpbWVuc2lvbiwgY29udGV4dCkge1xyXG4gICAgICAgIGlmIChkaW1lbnNpb24udW5pdCA9PT0gXCIlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoY29udGV4dC5oZWlnaHQgKiAoZGltZW5zaW9uLnZhbHVlIC8gMTAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJpZ2h0OiBmdW5jdGlvbihkaW1lbnNpb24sIGNvbnRleHQpIHtcclxuICAgICAgICBpZiAoZGltZW5zaW9uLnVuaXQgPT09IFwiJVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKGNvbnRleHQud2lkdGggLSAoY29udGV4dC53aWR0aCAqIChkaW1lbnNpb24udmFsdWUgLyAxMDApKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJvdHRvbTogZnVuY3Rpb24oZGltZW5zaW9uLCBjb250ZXh0KSB7XHJcbiAgICAgICAgaWYgKGRpbWVuc2lvbi51bml0ID09PSBcIiVcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihjb250ZXh0LmhlaWdodCAtIChjb250ZXh0LmhlaWdodCAqIChkaW1lbnNpb24udmFsdWUgLyAxMDApKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGxlZnQ6IGZ1bmN0aW9uKGRpbWVuc2lvbiwgY29udGV4dCkge1xyXG4gICAgICAgIGlmIChkaW1lbnNpb24udW5pdCA9PT0gXCIlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoY29udGV4dC53aWR0aCAqIChkaW1lbnNpb24udmFsdWUgLyAxMDApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5DVlV0aWxzLmNvbXB1dGVJbWFnZUFyZWEgPSBmdW5jdGlvbihpbnB1dFdpZHRoLCBpbnB1dEhlaWdodCwgYXJlYSkge1xyXG4gICAgdmFyIGNvbnRleHQgPSB7d2lkdGg6IGlucHV0V2lkdGgsIGhlaWdodDogaW5wdXRIZWlnaHR9O1xyXG5cclxuICAgIHZhciBwYXJzZWRBcmVhID0gT2JqZWN0LmtleXMoYXJlYSkucmVkdWNlKGZ1bmN0aW9uKHJlc3VsdCwga2V5KSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gYXJlYVtrZXldLFxyXG4gICAgICAgICAgICBwYXJzZWQgPSBDVlV0aWxzLl9wYXJzZUNTU0RpbWVuc2lvblZhbHVlcyh2YWx1ZSksXHJcbiAgICAgICAgICAgIGNhbGN1bGF0ZWQgPSBDVlV0aWxzLl9kaW1lbnNpb25zQ29udmVydGVyc1trZXldKHBhcnNlZCwgY29udGV4dCk7XHJcblxyXG4gICAgICAgIHJlc3VsdFtrZXldID0gY2FsY3VsYXRlZDtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSwge30pO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc3g6IHBhcnNlZEFyZWEubGVmdCxcclxuICAgICAgICBzeTogcGFyc2VkQXJlYS50b3AsXHJcbiAgICAgICAgc3c6IHBhcnNlZEFyZWEucmlnaHQgLSBwYXJzZWRBcmVhLmxlZnQsXHJcbiAgICAgICAgc2g6IHBhcnNlZEFyZWEuYm90dG9tIC0gcGFyc2VkQXJlYS50b3BcclxuICAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDVlV0aWxzO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vY3ZfdXRpbHMuanNcbiAqKi8iLCJpbXBvcnQge3ZlYzJ9IGZyb20gJ2dsLW1hdHJpeCc7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBjbHVzdGVyIGZvciBncm91cGluZyBzaW1pbGFyIG9yaWVudGF0aW9ucyBvZiBkYXRhcG9pbnRzXHJcbiAgICAgKi9cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihwb2ludCwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgdmFyIHBvaW50cyA9IFtdLFxyXG4gICAgICAgICAgICBjZW50ZXIgPSB7XHJcbiAgICAgICAgICAgICAgICByYWQ6IDAsXHJcbiAgICAgICAgICAgICAgICB2ZWM6IHZlYzIuY2xvbmUoWzAsIDBdKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwb2ludE1hcCA9IHt9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgICAgICBhZGQocG9pbnQpO1xyXG4gICAgICAgICAgICB1cGRhdGVDZW50ZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZChwb2ludFRvQWRkKSB7XHJcbiAgICAgICAgICAgIHBvaW50TWFwW3BvaW50VG9BZGQuaWRdID0gcG9pbnRUb0FkZDtcclxuICAgICAgICAgICAgcG9pbnRzLnB1c2gocG9pbnRUb0FkZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVDZW50ZXIoKSB7XHJcbiAgICAgICAgICAgIHZhciBpLCBzdW0gPSAwO1xyXG4gICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc3VtICs9IHBvaW50c1tpXS5yYWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2VudGVyLnJhZCA9IHN1bSAvIHBvaW50cy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGNlbnRlci52ZWMgPSB2ZWMyLmNsb25lKFtNYXRoLmNvcyhjZW50ZXIucmFkKSwgTWF0aC5zaW4oY2VudGVyLnJhZCldKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWRkOiBmdW5jdGlvbihwb2ludFRvQWRkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBvaW50TWFwW3BvaW50VG9BZGQuaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkKHBvaW50VG9BZGQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUNlbnRlcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmaXRzOiBmdW5jdGlvbihvdGhlclBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBjb3NpbmUgc2ltaWxhcml0eSB0byBjZW50ZXItYW5nbGVcclxuICAgICAgICAgICAgICAgIHZhciBzaW1pbGFyaXR5ID0gTWF0aC5hYnModmVjMi5kb3Qob3RoZXJQb2ludC5wb2ludC52ZWMsIGNlbnRlci52ZWMpKTtcclxuICAgICAgICAgICAgICAgIGlmIChzaW1pbGFyaXR5ID4gdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFBvaW50czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9pbnRzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRDZW50ZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNlbnRlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlUG9pbnQ6IGZ1bmN0aW9uKG5ld1BvaW50LCBpZCwgcHJvcGVydHkpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByYWQ6IG5ld1BvaW50W3Byb3BlcnR5XSxcclxuICAgICAgICAgICAgcG9pbnQ6IG5ld1BvaW50LFxyXG4gICAgICAgICAgICBpZDogaWRcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9jb21tb24vY2x1c3Rlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdsLW1hdHJpeFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZ2wtbWF0cml4XCJcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBpbml0OiBmdW5jdGlvbihhcnIsIHZhbCkge1xyXG4gICAgICAgIHZhciBsID0gYXJyLmxlbmd0aDtcclxuICAgICAgICB3aGlsZSAobC0tKSB7XHJcbiAgICAgICAgICAgIGFycltsXSA9IHZhbDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2h1ZmZsZXMgdGhlIGNvbnRlbnQgb2YgYW4gYXJyYXlcclxuICAgICAqIEByZXR1cm4ge0FycmF5fSB0aGUgYXJyYXkgaXRzZWxmIHNodWZmbGVkXHJcbiAgICAgKi9cclxuICAgIHNodWZmbGU6IGZ1bmN0aW9uKGFycikge1xyXG4gICAgICAgIHZhciBpID0gYXJyLmxlbmd0aCAtIDEsIGosIHg7XHJcbiAgICAgICAgZm9yIChpOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSk7XHJcbiAgICAgICAgICAgIHggPSBhcnJbaV07XHJcbiAgICAgICAgICAgIGFycltpXSA9IGFycltqXTtcclxuICAgICAgICAgICAgYXJyW2pdID0geDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH0sXHJcblxyXG4gICAgdG9Qb2ludExpc3Q6IGZ1bmN0aW9uKGFycikge1xyXG4gICAgICAgIHZhciBpLCBqLCByb3cgPSBbXSwgcm93cyA9IFtdO1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJvdyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IGFycltpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgcm93W2pdID0gYXJyW2ldW2pdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJvd3NbaV0gPSBcIltcIiArIHJvdy5qb2luKFwiLFwiKSArIFwiXVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJbXCIgKyByb3dzLmpvaW4oXCIsXFxyXFxuXCIpICsgXCJdXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0dXJucyB0aGUgZWxlbWVudHMgd2hpY2gncyBzY29yZSBpcyBiaWdnZXIgdGhhbiB0aGUgdGhyZXNob2xkXHJcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gdGhlIHJlZHVjZWQgYXJyYXlcclxuICAgICAqL1xyXG4gICAgdGhyZXNob2xkOiBmdW5jdGlvbihhcnIsIHRocmVzaG9sZCwgc2NvcmVGdW5jKSB7XHJcbiAgICAgICAgdmFyIGksIHF1ZXVlID0gW107XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHNjb3JlRnVuYy5hcHBseShhcnIsIFthcnJbaV1dKSA+PSB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goYXJyW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcXVldWU7XHJcbiAgICB9LFxyXG5cclxuICAgIG1heEluZGV4OiBmdW5jdGlvbihhcnIpIHtcclxuICAgICAgICB2YXIgaSwgbWF4ID0gMDtcclxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYXJyW2ldID4gYXJyW21heF0pIHtcclxuICAgICAgICAgICAgICAgIG1heCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1heDtcclxuICAgIH0sXHJcblxyXG4gICAgbWF4OiBmdW5jdGlvbihhcnIpIHtcclxuICAgICAgICB2YXIgaSwgbWF4ID0gMDtcclxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYXJyW2ldID4gbWF4KSB7XHJcbiAgICAgICAgICAgICAgICBtYXggPSBhcnJbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1heDtcclxuICAgIH0sXHJcblxyXG4gICAgc3VtOiBmdW5jdGlvbihhcnIpIHtcclxuICAgICAgICB2YXIgbGVuZ3RoID0gYXJyLmxlbmd0aCxcclxuICAgICAgICAgICAgc3VtID0gMDtcclxuXHJcbiAgICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XHJcbiAgICAgICAgICAgIHN1bSArPSBhcnJbbGVuZ3RoXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1bTtcclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvY29tbW9uL2FycmF5X2hlbHBlci5qc1xuICoqLyIsImltcG9ydCBJbWFnZVdyYXBwZXIgZnJvbSAnLi4vY29tbW9uL2ltYWdlX3dyYXBwZXInO1xyXG5pbXBvcnQgQ1ZVdGlscyBmcm9tICcuLi9jb21tb24vY3ZfdXRpbHMnO1xyXG5pbXBvcnQgQXJyYXlIZWxwZXIgZnJvbSAnLi4vY29tbW9uL2FycmF5X2hlbHBlcic7XHJcbmltcG9ydCBJbWFnZURlYnVnIGZyb20gJy4uL2NvbW1vbi9pbWFnZV9kZWJ1Zyc7XHJcbmltcG9ydCBSYXN0ZXJpemVyIGZyb20gJy4vcmFzdGVyaXplcic7XHJcbmltcG9ydCBUcmFjZXIgZnJvbSAnLi90cmFjZXInO1xyXG5pbXBvcnQgc2tlbGV0b25pemVyIGZyb20gJy4vc2tlbGV0b25pemVyJztcclxuaW1wb3J0IHt2ZWMyLCBtYXQyfSBmcm9tICdnbC1tYXRyaXgnO1xyXG5cclxudmFyIF9jb25maWcsXHJcbiAgICBfY3VycmVudEltYWdlV3JhcHBlcixcclxuICAgIF9za2VsSW1hZ2VXcmFwcGVyLFxyXG4gICAgX3N1YkltYWdlV3JhcHBlcixcclxuICAgIF9sYWJlbEltYWdlV3JhcHBlcixcclxuICAgIF9wYXRjaEdyaWQsXHJcbiAgICBfcGF0Y2hMYWJlbEdyaWQsXHJcbiAgICBfaW1hZ2VUb1BhdGNoR3JpZCxcclxuICAgIF9iaW5hcnlJbWFnZVdyYXBwZXIsXHJcbiAgICBfcGF0Y2hTaXplLFxyXG4gICAgX2NhbnZhc0NvbnRhaW5lciA9IHtcclxuICAgICAgICBjdHg6IHtcclxuICAgICAgICAgICAgYmluYXJ5OiBudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkb206IHtcclxuICAgICAgICAgICAgYmluYXJ5OiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIF9udW1QYXRjaGVzID0ge3g6IDAsIHk6IDB9LFxyXG4gICAgX2lucHV0SW1hZ2VXcmFwcGVyLFxyXG4gICAgX3NrZWxldG9uaXplcjtcclxuXHJcbmZ1bmN0aW9uIGluaXRCdWZmZXJzKCkge1xyXG4gICAgdmFyIHNrZWxldG9uSW1hZ2VEYXRhO1xyXG5cclxuICAgIGlmIChfY29uZmlnLmhhbGZTYW1wbGUpIHtcclxuICAgICAgICBfY3VycmVudEltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoe1xyXG4gICAgICAgICAgICB4OiBfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS54IC8gMiB8IDAsXHJcbiAgICAgICAgICAgIHk6IF9pbnB1dEltYWdlV3JhcHBlci5zaXplLnkgLyAyIHwgMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBfY3VycmVudEltYWdlV3JhcHBlciA9IF9pbnB1dEltYWdlV3JhcHBlcjtcclxuICAgIH1cclxuXHJcbiAgICBfcGF0Y2hTaXplID0gQ1ZVdGlscy5jYWxjdWxhdGVQYXRjaFNpemUoX2NvbmZpZy5wYXRjaFNpemUsIF9jdXJyZW50SW1hZ2VXcmFwcGVyLnNpemUpO1xyXG5cclxuICAgIF9udW1QYXRjaGVzLnggPSBfY3VycmVudEltYWdlV3JhcHBlci5zaXplLnggLyBfcGF0Y2hTaXplLnggfCAwO1xyXG4gICAgX251bVBhdGNoZXMueSA9IF9jdXJyZW50SW1hZ2VXcmFwcGVyLnNpemUueSAvIF9wYXRjaFNpemUueSB8IDA7XHJcblxyXG4gICAgX2JpbmFyeUltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoX2N1cnJlbnRJbWFnZVdyYXBwZXIuc2l6ZSwgdW5kZWZpbmVkLCBVaW50OEFycmF5LCBmYWxzZSk7XHJcblxyXG4gICAgX2xhYmVsSW1hZ2VXcmFwcGVyID0gbmV3IEltYWdlV3JhcHBlcihfcGF0Y2hTaXplLCB1bmRlZmluZWQsIEFycmF5LCB0cnVlKTtcclxuXHJcbiAgICBza2VsZXRvbkltYWdlRGF0YSA9IG5ldyBBcnJheUJ1ZmZlcig2NCAqIDEwMjQpO1xyXG4gICAgX3N1YkltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoX3BhdGNoU2l6ZSxcclxuICAgICAgICBuZXcgVWludDhBcnJheShza2VsZXRvbkltYWdlRGF0YSwgMCwgX3BhdGNoU2l6ZS54ICogX3BhdGNoU2l6ZS55KSk7XHJcbiAgICBfc2tlbEltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoX3BhdGNoU2l6ZSxcclxuICAgICAgICBuZXcgVWludDhBcnJheShza2VsZXRvbkltYWdlRGF0YSwgX3BhdGNoU2l6ZS54ICogX3BhdGNoU2l6ZS55ICogMywgX3BhdGNoU2l6ZS54ICogX3BhdGNoU2l6ZS55KSxcclxuICAgICAgICB1bmRlZmluZWQsIHRydWUpO1xyXG4gICAgX3NrZWxldG9uaXplciA9IHNrZWxldG9uaXplcigodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpID8gd2luZG93IDogKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgPyBzZWxmIDogZ2xvYmFsLCB7XHJcbiAgICAgICAgc2l6ZTogX3BhdGNoU2l6ZS54XHJcbiAgICB9LCBza2VsZXRvbkltYWdlRGF0YSk7XHJcblxyXG4gICAgX2ltYWdlVG9QYXRjaEdyaWQgPSBuZXcgSW1hZ2VXcmFwcGVyKHtcclxuICAgICAgICB4OiAoX2N1cnJlbnRJbWFnZVdyYXBwZXIuc2l6ZS54IC8gX3N1YkltYWdlV3JhcHBlci5zaXplLngpIHwgMCxcclxuICAgICAgICB5OiAoX2N1cnJlbnRJbWFnZVdyYXBwZXIuc2l6ZS55IC8gX3N1YkltYWdlV3JhcHBlci5zaXplLnkpIHwgMFxyXG4gICAgfSwgdW5kZWZpbmVkLCBBcnJheSwgdHJ1ZSk7XHJcbiAgICBfcGF0Y2hHcmlkID0gbmV3IEltYWdlV3JhcHBlcihfaW1hZ2VUb1BhdGNoR3JpZC5zaXplLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSk7XHJcbiAgICBfcGF0Y2hMYWJlbEdyaWQgPSBuZXcgSW1hZ2VXcmFwcGVyKF9pbWFnZVRvUGF0Y2hHcmlkLnNpemUsIHVuZGVmaW5lZCwgSW50MzJBcnJheSwgdHJ1ZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRDYW52YXMoKSB7XHJcbiAgICBpZiAoX2NvbmZpZy51c2VXb3JrZXIgfHwgdHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkuY2xhc3NOYW1lID0gXCJiaW5hcnlCdWZmZXJcIjtcclxuICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgX2NvbmZpZy5kZWJ1Zy5zaG93Q2FudmFzID09PSB0cnVlKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZWJ1Z1wiKS5hcHBlbmRDaGlsZChfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkpO1xyXG4gICAgfVxyXG4gICAgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5ID0gX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5LmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgIF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeS53aWR0aCA9IF9iaW5hcnlJbWFnZVdyYXBwZXIuc2l6ZS54O1xyXG4gICAgX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5LmhlaWdodCA9IF9iaW5hcnlJbWFnZVdyYXBwZXIuc2l6ZS55O1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIGJvdW5kaW5nIGJveCB3aGljaCBlbmNsb3NlcyBhbGwgdGhlIGdpdmVuIHBhdGNoZXNcclxuICogQHJldHVybnMge0FycmF5fSBUaGUgbWluaW1hbCBib3VuZGluZyBib3hcclxuICovXHJcbmZ1bmN0aW9uIGJveEZyb21QYXRjaGVzKHBhdGNoZXMpIHtcclxuICAgIHZhciBvdmVyQXZnLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgaixcclxuICAgICAgICBwYXRjaCxcclxuICAgICAgICB0cmFuc01hdCxcclxuICAgICAgICBtaW54ID1cclxuICAgICAgICBfYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueCxcclxuICAgICAgICBtaW55ID0gX2JpbmFyeUltYWdlV3JhcHBlci5zaXplLnksXHJcbiAgICAgICAgbWF4eCA9IC1fYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueCxcclxuICAgICAgICBtYXh5ID0gLV9iaW5hcnlJbWFnZVdyYXBwZXIuc2l6ZS55LFxyXG4gICAgICAgIGJveCxcclxuICAgICAgICBzY2FsZTtcclxuXHJcbiAgICAvLyBkcmF3IGFsbCBwYXRjaGVzIHdoaWNoIGFyZSB0byBiZSB0YWtlbiBpbnRvIGNvbnNpZGVyYXRpb25cclxuICAgIG92ZXJBdmcgPSAwO1xyXG4gICAgZm9yICggaSA9IDA7IGkgPCBwYXRjaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcGF0Y2ggPSBwYXRjaGVzW2ldO1xyXG4gICAgICAgIG92ZXJBdmcgKz0gcGF0Y2gucmFkO1xyXG4gICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgX2NvbmZpZy5kZWJ1Zy5zaG93UGF0Y2hlcykge1xyXG4gICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdSZWN0KHBhdGNoLnBvcywgX3N1YkltYWdlV3JhcHBlci5zaXplLCBfY2FudmFzQ29udGFpbmVyLmN0eC5iaW5hcnksIHtjb2xvcjogXCJyZWRcIn0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvdmVyQXZnIC89IHBhdGNoZXMubGVuZ3RoO1xyXG4gICAgb3ZlckF2ZyA9IChvdmVyQXZnICogMTgwIC8gTWF0aC5QSSArIDkwKSAlIDE4MCAtIDkwO1xyXG4gICAgaWYgKG92ZXJBdmcgPCAwKSB7XHJcbiAgICAgICAgb3ZlckF2ZyArPSAxODA7XHJcbiAgICB9XHJcblxyXG4gICAgb3ZlckF2ZyA9ICgxODAgLSBvdmVyQXZnKSAqIE1hdGguUEkgLyAxODA7XHJcbiAgICB0cmFuc01hdCA9IG1hdDIuY2xvbmUoW01hdGguY29zKG92ZXJBdmcpLCBNYXRoLnNpbihvdmVyQXZnKSwgLU1hdGguc2luKG92ZXJBdmcpLCBNYXRoLmNvcyhvdmVyQXZnKV0pO1xyXG5cclxuICAgIC8vIGl0ZXJhdGUgb3ZlciBwYXRjaGVzIGFuZCByb3RhdGUgYnkgYW5nbGVcclxuICAgIGZvciAoIGkgPSAwOyBpIDwgcGF0Y2hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHBhdGNoID0gcGF0Y2hlc1tpXTtcclxuICAgICAgICBmb3IgKCBqID0gMDsgaiA8IDQ7IGorKykge1xyXG4gICAgICAgICAgICB2ZWMyLnRyYW5zZm9ybU1hdDIocGF0Y2guYm94W2pdLCBwYXRjaC5ib3hbal0sIHRyYW5zTWF0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgX2NvbmZpZy5kZWJ1Zy5ib3hGcm9tUGF0Y2hlcy5zaG93VHJhbnNmb3JtZWQpIHtcclxuICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UGF0aChwYXRjaC5ib3gsIHt4OiAwLCB5OiAxfSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LCB7Y29sb3I6ICcjOTlmZjAwJywgbGluZVdpZHRoOiAyfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGZpbmQgYm91bmRpbmcgYm94XHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IHBhdGNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwYXRjaCA9IHBhdGNoZXNbaV07XHJcbiAgICAgICAgZm9yICggaiA9IDA7IGogPCA0OyBqKyspIHtcclxuICAgICAgICAgICAgaWYgKHBhdGNoLmJveFtqXVswXSA8IG1pbngpIHtcclxuICAgICAgICAgICAgICAgIG1pbnggPSBwYXRjaC5ib3hbal1bMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhdGNoLmJveFtqXVswXSA+IG1heHgpIHtcclxuICAgICAgICAgICAgICAgIG1heHggPSBwYXRjaC5ib3hbal1bMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhdGNoLmJveFtqXVsxXSA8IG1pbnkpIHtcclxuICAgICAgICAgICAgICAgIG1pbnkgPSBwYXRjaC5ib3hbal1bMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhdGNoLmJveFtqXVsxXSA+IG1heHkpIHtcclxuICAgICAgICAgICAgICAgIG1heHkgPSBwYXRjaC5ib3hbal1bMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYm94ID0gW1ttaW54LCBtaW55XSwgW21heHgsIG1pbnldLCBbbWF4eCwgbWF4eV0sIFttaW54LCBtYXh5XV07XHJcblxyXG4gICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiBfY29uZmlnLmRlYnVnLmJveEZyb21QYXRjaGVzLnNob3dUcmFuc2Zvcm1lZEJveCkge1xyXG4gICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgoYm94LCB7eDogMCwgeTogMX0sIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSwge2NvbG9yOiAnI2ZmMDAwMCcsIGxpbmVXaWR0aDogMn0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNjYWxlID0gX2NvbmZpZy5oYWxmU2FtcGxlID8gMiA6IDE7XHJcbiAgICAvLyByZXZlcnNlIHJvdGF0aW9uO1xyXG4gICAgdHJhbnNNYXQgPSBtYXQyLmludmVydCh0cmFuc01hdCwgdHJhbnNNYXQpO1xyXG4gICAgZm9yICggaiA9IDA7IGogPCA0OyBqKyspIHtcclxuICAgICAgICB2ZWMyLnRyYW5zZm9ybU1hdDIoYm94W2pdLCBib3hbal0sIHRyYW5zTWF0KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIF9jb25maWcuZGVidWcuYm94RnJvbVBhdGNoZXMuc2hvd0JCKSB7XHJcbiAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UGF0aChib3gsIHt4OiAwLCB5OiAxfSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LCB7Y29sb3I6ICcjZmYwMDAwJywgbGluZVdpZHRoOiAyfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICggaiA9IDA7IGogPCA0OyBqKyspIHtcclxuICAgICAgICB2ZWMyLnNjYWxlKGJveFtqXSwgYm94W2pdLCBzY2FsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGJveDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBiaW5hcnkgaW1hZ2Ugb2YgdGhlIGN1cnJlbnQgaW1hZ2VcclxuICovXHJcbmZ1bmN0aW9uIGJpbmFyaXplSW1hZ2UoKSB7XHJcbiAgICBDVlV0aWxzLm90c3VUaHJlc2hvbGQoX2N1cnJlbnRJbWFnZVdyYXBwZXIsIF9iaW5hcnlJbWFnZVdyYXBwZXIpO1xyXG4gICAgX2JpbmFyeUltYWdlV3JhcHBlci56ZXJvQm9yZGVyKCk7XHJcbiAgICBpZiAoX2NvbmZpZy5zaG93Q2FudmFzKSB7XHJcbiAgICAgICAgX2JpbmFyeUltYWdlV3JhcHBlci5zaG93KF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeSwgMjU1KTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEl0ZXJhdGUgb3ZlciB0aGUgZW50aXJlIGltYWdlXHJcbiAqIGV4dHJhY3QgcGF0Y2hlc1xyXG4gKi9cclxuZnVuY3Rpb24gZmluZFBhdGNoZXMoKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBqLFxyXG4gICAgICAgIHgsXHJcbiAgICAgICAgeSxcclxuICAgICAgICBtb21lbnRzLFxyXG4gICAgICAgIHBhdGNoZXNGb3VuZCA9IFtdLFxyXG4gICAgICAgIHJhc3Rlcml6ZXIsXHJcbiAgICAgICAgcmFzdGVyUmVzdWx0LFxyXG4gICAgICAgIHBhdGNoO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IF9udW1QYXRjaGVzLng7IGkrKykge1xyXG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBfbnVtUGF0Y2hlcy55OyBqKyspIHtcclxuICAgICAgICAgICAgeCA9IF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS54ICogaTtcclxuICAgICAgICAgICAgeSA9IF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS55ICogajtcclxuXHJcbiAgICAgICAgICAgIC8vIHNlcGVyYXRlIHBhcnRzXHJcbiAgICAgICAgICAgIHNrZWxldG9uaXplKHgsIHkpO1xyXG5cclxuICAgICAgICAgICAgLy8gUmFzdGVyaXplLCBmaW5kIGluZGl2aWR1YWwgYmFyc1xyXG4gICAgICAgICAgICBfc2tlbEltYWdlV3JhcHBlci56ZXJvQm9yZGVyKCk7XHJcbiAgICAgICAgICAgIEFycmF5SGVscGVyLmluaXQoX2xhYmVsSW1hZ2VXcmFwcGVyLmRhdGEsIDApO1xyXG4gICAgICAgICAgICByYXN0ZXJpemVyID0gUmFzdGVyaXplci5jcmVhdGUoX3NrZWxJbWFnZVdyYXBwZXIsIF9sYWJlbEltYWdlV3JhcHBlcik7XHJcbiAgICAgICAgICAgIHJhc3RlclJlc3VsdCA9IHJhc3Rlcml6ZXIucmFzdGVyaXplKDApO1xyXG5cclxuICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiBfY29uZmlnLmRlYnVnLnNob3dMYWJlbHMpIHtcclxuICAgICAgICAgICAgICAgIF9sYWJlbEltYWdlV3JhcHBlci5vdmVybGF5KF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeSwgTWF0aC5mbG9vcigzNjAgLyByYXN0ZXJSZXN1bHQuY291bnQpLFxyXG4gICAgICAgICAgICAgICAgICAgIHt4OiB4LCB5OiB5fSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSBtb21lbnRzIGZyb20gdGhlIHNrZWxldG9uaXplZCBwYXRjaFxyXG4gICAgICAgICAgICBtb21lbnRzID0gX2xhYmVsSW1hZ2VXcmFwcGVyLm1vbWVudHMocmFzdGVyUmVzdWx0LmNvdW50KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGV4dHJhY3QgZWxpZ2libGUgcGF0Y2hlc1xyXG4gICAgICAgICAgICBwYXRjaGVzRm91bmQgPSBwYXRjaGVzRm91bmQuY29uY2F0KGRlc2NyaWJlUGF0Y2gobW9tZW50cywgW2ksIGpdLCB4LCB5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgX2NvbmZpZy5kZWJ1Zy5zaG93Rm91bmRQYXRjaGVzKSB7XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBwYXRjaGVzRm91bmQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcGF0Y2ggPSBwYXRjaGVzRm91bmRbaV07XHJcbiAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1JlY3QocGF0Y2gucG9zLCBfc3ViSW1hZ2VXcmFwcGVyLnNpemUsIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSxcclxuICAgICAgICAgICAgICAgIHtjb2xvcjogXCIjOTlmZjAwXCIsIGxpbmVXaWR0aDogMn0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcGF0Y2hlc0ZvdW5kO1xyXG59XHJcblxyXG4vKipcclxuICogRmluZHMgdGhvc2UgY29ubmVjdGVkIGFyZWFzIHdoaWNoIGNvbnRhaW4gYXQgbGVhc3QgNiBwYXRjaGVzXHJcbiAqIGFuZCByZXR1cm5zIHRoZW0gb3JkZXJlZCBERVNDIGJ5IHRoZSBudW1iZXIgb2YgY29udGFpbmVkIHBhdGNoZXNcclxuICogQHBhcmFtIHtOdW1iZXJ9IG1heExhYmVsXHJcbiAqL1xyXG5mdW5jdGlvbiBmaW5kQmlnZ2VzdENvbm5lY3RlZEFyZWFzKG1heExhYmVsKXtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIHN1bSxcclxuICAgICAgICBsYWJlbEhpc3QgPSBbXSxcclxuICAgICAgICB0b3BMYWJlbHMgPSBbXTtcclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IG1heExhYmVsOyBpKyspIHtcclxuICAgICAgICBsYWJlbEhpc3QucHVzaCgwKTtcclxuICAgIH1cclxuICAgIHN1bSA9IF9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aDtcclxuICAgIHdoaWxlIChzdW0tLSkge1xyXG4gICAgICAgIGlmIChfcGF0Y2hMYWJlbEdyaWQuZGF0YVtzdW1dID4gMCkge1xyXG4gICAgICAgICAgICBsYWJlbEhpc3RbX3BhdGNoTGFiZWxHcmlkLmRhdGFbc3VtXSAtIDFdKys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxhYmVsSGlzdCA9IGxhYmVsSGlzdC5tYXAoZnVuY3Rpb24odmFsLCBpZHgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWw6IHZhbCxcclxuICAgICAgICAgICAgbGFiZWw6IGlkeCArIDFcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGFiZWxIaXN0LnNvcnQoZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgIHJldHVybiBiLnZhbCAtIGEudmFsO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gZXh0cmFjdCB0b3AgYXJlYXMgd2l0aCBhdCBsZWFzdCA2IHBhdGNoZXMgcHJlc2VudFxyXG4gICAgdG9wTGFiZWxzID0gbGFiZWxIaXN0LmZpbHRlcihmdW5jdGlvbihlbCkge1xyXG4gICAgICAgIHJldHVybiBlbC52YWwgPj0gNTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0b3BMYWJlbHM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gZmluZEJveGVzKHRvcExhYmVscywgbWF4TGFiZWwpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIGosXHJcbiAgICAgICAgc3VtLFxyXG4gICAgICAgIHBhdGNoZXMgPSBbXSxcclxuICAgICAgICBwYXRjaCxcclxuICAgICAgICBib3gsXHJcbiAgICAgICAgYm94ZXMgPSBbXSxcclxuICAgICAgICBoc3YgPSBbMCwgMSwgMV0sXHJcbiAgICAgICAgcmdiID0gWzAsIDAsIDBdO1xyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgdG9wTGFiZWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgc3VtID0gX3BhdGNoTGFiZWxHcmlkLmRhdGEubGVuZ3RoO1xyXG4gICAgICAgIHBhdGNoZXMubGVuZ3RoID0gMDtcclxuICAgICAgICB3aGlsZSAoc3VtLS0pIHtcclxuICAgICAgICAgICAgaWYgKF9wYXRjaExhYmVsR3JpZC5kYXRhW3N1bV0gPT09IHRvcExhYmVsc1tpXS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgcGF0Y2ggPSBfaW1hZ2VUb1BhdGNoR3JpZC5kYXRhW3N1bV07XHJcbiAgICAgICAgICAgICAgICBwYXRjaGVzLnB1c2gocGF0Y2gpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJveCA9IGJveEZyb21QYXRjaGVzKHBhdGNoZXMpO1xyXG4gICAgICAgIGlmIChib3gpIHtcclxuICAgICAgICAgICAgYm94ZXMucHVzaChib3gpO1xyXG5cclxuICAgICAgICAgICAgLy8gZHJhdyBwYXRjaC1sYWJlbHMgaWYgcmVxdWVzdGVkXHJcbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgX2NvbmZpZy5kZWJ1Zy5zaG93UmVtYWluaW5nUGF0Y2hMYWJlbHMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgcGF0Y2hlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGNoID0gcGF0Y2hlc1tqXTtcclxuICAgICAgICAgICAgICAgICAgICBoc3ZbMF0gPSAodG9wTGFiZWxzW2ldLmxhYmVsIC8gKG1heExhYmVsICsgMSkpICogMzYwO1xyXG4gICAgICAgICAgICAgICAgICAgIENWVXRpbHMuaHN2MnJnYihoc3YsIHJnYik7XHJcbiAgICAgICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UmVjdChwYXRjaC5wb3MsIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Y29sb3I6IFwicmdiKFwiICsgcmdiLmpvaW4oXCIsXCIpICsgXCIpXCIsIGxpbmVXaWR0aDogMn0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJveGVzO1xyXG59XHJcblxyXG4vKipcclxuICogRmluZCBzaW1pbGFyIG1vbWVudHMgKHZpYSBjbHVzdGVyKVxyXG4gKiBAcGFyYW0ge09iamVjdH0gbW9tZW50c1xyXG4gKi9cclxuZnVuY3Rpb24gc2ltaWxhck1vbWVudHMobW9tZW50cykge1xyXG4gICAgdmFyIGNsdXN0ZXJzID0gQ1ZVdGlscy5jbHVzdGVyKG1vbWVudHMsIDAuOTApO1xyXG4gICAgdmFyIHRvcENsdXN0ZXIgPSBDVlV0aWxzLnRvcEdlbmVyaWMoY2x1c3RlcnMsIDEsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICByZXR1cm4gZS5nZXRQb2ludHMoKS5sZW5ndGg7XHJcbiAgICB9KTtcclxuICAgIHZhciBwb2ludHMgPSBbXSwgcmVzdWx0ID0gW107XHJcbiAgICBpZiAodG9wQ2x1c3Rlci5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICBwb2ludHMgPSB0b3BDbHVzdGVyWzBdLml0ZW0uZ2V0UG9pbnRzKCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2gocG9pbnRzW2ldLnBvaW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBza2VsZXRvbml6ZSh4LCB5KSB7XHJcbiAgICBfYmluYXJ5SW1hZ2VXcmFwcGVyLnN1YkltYWdlQXNDb3B5KF9zdWJJbWFnZVdyYXBwZXIsIENWVXRpbHMuaW1hZ2VSZWYoeCwgeSkpO1xyXG4gICAgX3NrZWxldG9uaXplci5za2VsZXRvbml6ZSgpO1xyXG5cclxuICAgIC8vIFNob3cgc2tlbGV0b24gaWYgcmVxdWVzdGVkXHJcbiAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIF9jb25maWcuZGVidWcuc2hvd1NrZWxldG9uKSB7XHJcbiAgICAgICAgX3NrZWxJbWFnZVdyYXBwZXIub3ZlcmxheShfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnksIDM2MCwgQ1ZVdGlscy5pbWFnZVJlZih4LCB5KSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeHRyYWN0cyBhbmQgZGVzY3JpYmVzIHRob3NlIHBhdGNoZXMgd2hpY2ggc2VlbSB0byBjb250YWluIGEgYmFyY29kZSBwYXR0ZXJuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IG1vbWVudHNcclxuICogQHBhcmFtIHtPYmplY3R9IHBhdGNoUG9zLFxyXG4gKiBAcGFyYW0ge051bWJlcn0geFxyXG4gKiBAcGFyYW0ge051bWJlcn0geVxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IGxpc3Qgb2YgcGF0Y2hlc1xyXG4gKi9cclxuZnVuY3Rpb24gZGVzY3JpYmVQYXRjaChtb21lbnRzLCBwYXRjaFBvcywgeCwgeSkge1xyXG4gICAgdmFyIGssXHJcbiAgICAgICAgYXZnLFxyXG4gICAgICAgIGVsaWdpYmxlTW9tZW50cyA9IFtdLFxyXG4gICAgICAgIG1hdGNoaW5nTW9tZW50cyxcclxuICAgICAgICBwYXRjaCxcclxuICAgICAgICBwYXRjaGVzRm91bmQgPSBbXSxcclxuICAgICAgICBtaW5Db21wb25lbnRXZWlnaHQgPSBNYXRoLmNlaWwoX3BhdGNoU2l6ZS54IC8gMyk7XHJcblxyXG4gICAgaWYgKG1vbWVudHMubGVuZ3RoID49IDIpIHtcclxuICAgICAgICAvLyBvbmx5IGNvbGxlY3QgbW9tZW50cyB3aGljaCdzIGFyZWEgY292ZXJzIGF0IGxlYXN0IG1pbkNvbXBvbmVudFdlaWdodCBwaXhlbHMuXHJcbiAgICAgICAgZm9yICggayA9IDA7IGsgPCBtb21lbnRzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIGlmIChtb21lbnRzW2tdLm0wMCA+IG1pbkNvbXBvbmVudFdlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgZWxpZ2libGVNb21lbnRzLnB1c2gobW9tZW50c1trXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmIGF0IGxlYXN0IDIgbW9tZW50cyBhcmUgZm91bmQgd2hpY2ggaGF2ZSBhdCBsZWFzdCBtaW5Db21wb25lbnRXZWlnaHRzIGNvdmVyZWRcclxuICAgICAgICBpZiAoZWxpZ2libGVNb21lbnRzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgICAgIG1hdGNoaW5nTW9tZW50cyA9IHNpbWlsYXJNb21lbnRzKGVsaWdpYmxlTW9tZW50cyk7XHJcbiAgICAgICAgICAgIGF2ZyA9IDA7XHJcbiAgICAgICAgICAgIC8vIGRldGVybWluZSB0aGUgc2ltaWxhcml0eSBvZiB0aGUgbW9tZW50c1xyXG4gICAgICAgICAgICBmb3IgKCBrID0gMDsgayA8IG1hdGNoaW5nTW9tZW50cy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgYXZnICs9IG1hdGNoaW5nTW9tZW50c1trXS5yYWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIE9ubHkgdHdvIG9mIHRoZSBtb21lbnRzIGFyZSBhbGxvd2VkIG5vdCB0byBmaXQgaW50byB0aGUgZXF1YXRpb25cclxuICAgICAgICAgICAgLy8gYWRkIHRoZSBwYXRjaCB0byB0aGUgc2V0XHJcbiAgICAgICAgICAgIGlmIChtYXRjaGluZ01vbWVudHMubGVuZ3RoID4gMVxyXG4gICAgICAgICAgICAgICAgICAgICYmIG1hdGNoaW5nTW9tZW50cy5sZW5ndGggPj0gKGVsaWdpYmxlTW9tZW50cy5sZW5ndGggLyA0KSAqIDNcclxuICAgICAgICAgICAgICAgICAgICAmJiBtYXRjaGluZ01vbWVudHMubGVuZ3RoID4gbW9tZW50cy5sZW5ndGggLyA0KSB7XHJcbiAgICAgICAgICAgICAgICBhdmcgLz0gbWF0Y2hpbmdNb21lbnRzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHBhdGNoID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBwYXRjaFBvc1sxXSAqIF9udW1QYXRjaGVzLnggKyBwYXRjaFBvc1swXSxcclxuICAgICAgICAgICAgICAgICAgICBwb3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogeVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYm94OiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlYzIuY2xvbmUoW3gsIHldKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmVjMi5jbG9uZShbeCArIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS54LCB5XSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlYzIuY2xvbmUoW3ggKyBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueCwgeSArIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS55XSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlYzIuY2xvbmUoW3gsIHkgKyBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueV0pXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBtb21lbnRzOiBtYXRjaGluZ01vbWVudHMsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkOiBhdmcsXHJcbiAgICAgICAgICAgICAgICAgICAgdmVjOiB2ZWMyLmNsb25lKFtNYXRoLmNvcyhhdmcpLCBNYXRoLnNpbihhdmcpXSlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBwYXRjaGVzRm91bmQucHVzaChwYXRjaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGF0Y2hlc0ZvdW5kO1xyXG59XHJcblxyXG4vKipcclxuICogZmluZHMgcGF0Y2hlcyB3aGljaCBhcmUgY29ubmVjdGVkIGFuZCBzaGFyZSB0aGUgc2FtZSBvcmllbnRhdGlvblxyXG4gKiBAcGFyYW0ge09iamVjdH0gcGF0Y2hlc0ZvdW5kXHJcbiAqL1xyXG5mdW5jdGlvbiByYXN0ZXJpemVBbmd1bGFyU2ltaWxhcml0eShwYXRjaGVzRm91bmQpIHtcclxuICAgIHZhciBsYWJlbCA9IDAsXHJcbiAgICAgICAgdGhyZXNob2xkID0gMC45NSxcclxuICAgICAgICBjdXJySWR4ID0gMCxcclxuICAgICAgICBqLFxyXG4gICAgICAgIHBhdGNoLFxyXG4gICAgICAgIGhzdiA9IFswLCAxLCAxXSxcclxuICAgICAgICByZ2IgPSBbMCwgMCwgMF07XHJcblxyXG4gICAgZnVuY3Rpb24gbm90WWV0UHJvY2Vzc2VkKCkge1xyXG4gICAgICAgIHZhciBpO1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgX3BhdGNoTGFiZWxHcmlkLmRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKF9wYXRjaExhYmVsR3JpZC5kYXRhW2ldID09PSAwICYmIF9wYXRjaEdyaWQuZGF0YVtpXSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF9wYXRjaExhYmVsR3JpZC5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdHJhY2UoY3VycmVudElkeCkge1xyXG4gICAgICAgIHZhciB4LFxyXG4gICAgICAgICAgICB5LFxyXG4gICAgICAgICAgICBjdXJyZW50UGF0Y2gsXHJcbiAgICAgICAgICAgIGlkeCxcclxuICAgICAgICAgICAgZGlyLFxyXG4gICAgICAgICAgICBjdXJyZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgeDogY3VycmVudElkeCAlIF9wYXRjaExhYmVsR3JpZC5zaXplLngsXHJcbiAgICAgICAgICAgICAgICB5OiAoY3VycmVudElkeCAvIF9wYXRjaExhYmVsR3JpZC5zaXplLngpIHwgMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzaW1pbGFyaXR5O1xyXG5cclxuICAgICAgICBpZiAoY3VycmVudElkeCA8IF9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjdXJyZW50UGF0Y2ggPSBfaW1hZ2VUb1BhdGNoR3JpZC5kYXRhW2N1cnJlbnRJZHhdO1xyXG4gICAgICAgICAgICAvLyBhc3NpZ24gbGFiZWxcclxuICAgICAgICAgICAgX3BhdGNoTGFiZWxHcmlkLmRhdGFbY3VycmVudElkeF0gPSBsYWJlbDtcclxuICAgICAgICAgICAgZm9yICggZGlyID0gMDsgZGlyIDwgVHJhY2VyLnNlYXJjaERpcmVjdGlvbnMubGVuZ3RoOyBkaXIrKykge1xyXG4gICAgICAgICAgICAgICAgeSA9IGN1cnJlbnQueSArIFRyYWNlci5zZWFyY2hEaXJlY3Rpb25zW2Rpcl1bMF07XHJcbiAgICAgICAgICAgICAgICB4ID0gY3VycmVudC54ICsgVHJhY2VyLnNlYXJjaERpcmVjdGlvbnNbZGlyXVsxXTtcclxuICAgICAgICAgICAgICAgIGlkeCA9IHkgKiBfcGF0Y2hMYWJlbEdyaWQuc2l6ZS54ICsgeDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjb250aW51ZSBpZiBwYXRjaCBlbXB0eVxyXG4gICAgICAgICAgICAgICAgaWYgKF9wYXRjaEdyaWQuZGF0YVtpZHhdID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3BhdGNoTGFiZWxHcmlkLmRhdGFbaWR4XSA9IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKF9wYXRjaExhYmVsR3JpZC5kYXRhW2lkeF0gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzaW1pbGFyaXR5ID0gTWF0aC5hYnModmVjMi5kb3QoX2ltYWdlVG9QYXRjaEdyaWQuZGF0YVtpZHhdLnZlYywgY3VycmVudFBhdGNoLnZlYykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaW1pbGFyaXR5ID4gdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNlKGlkeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHByZXBhcmUgZm9yIGZpbmRpbmcgdGhlIHJpZ2h0IHBhdGNoZXNcclxuICAgIEFycmF5SGVscGVyLmluaXQoX3BhdGNoR3JpZC5kYXRhLCAwKTtcclxuICAgIEFycmF5SGVscGVyLmluaXQoX3BhdGNoTGFiZWxHcmlkLmRhdGEsIDApO1xyXG4gICAgQXJyYXlIZWxwZXIuaW5pdChfaW1hZ2VUb1BhdGNoR3JpZC5kYXRhLCBudWxsKTtcclxuXHJcbiAgICBmb3IgKCBqID0gMDsgaiA8IHBhdGNoZXNGb3VuZC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIHBhdGNoID0gcGF0Y2hlc0ZvdW5kW2pdO1xyXG4gICAgICAgIF9pbWFnZVRvUGF0Y2hHcmlkLmRhdGFbcGF0Y2guaW5kZXhdID0gcGF0Y2g7XHJcbiAgICAgICAgX3BhdGNoR3JpZC5kYXRhW3BhdGNoLmluZGV4XSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmFzdGVyaXplIHRoZSBwYXRjaGVzIGZvdW5kIHRvIGRldGVybWluZSBhcmVhXHJcbiAgICBfcGF0Y2hHcmlkLnplcm9Cb3JkZXIoKTtcclxuXHJcbiAgICB3aGlsZSAoKCBjdXJySWR4ID0gbm90WWV0UHJvY2Vzc2VkKCkpIDwgX3BhdGNoTGFiZWxHcmlkLmRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgbGFiZWwrKztcclxuICAgICAgICB0cmFjZShjdXJySWR4KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBkcmF3IHBhdGNoLWxhYmVscyBpZiByZXF1ZXN0ZWRcclxuICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgX2NvbmZpZy5kZWJ1Zy5zaG93UGF0Y2hMYWJlbHMpIHtcclxuICAgICAgICBmb3IgKCBqID0gMDsgaiA8IF9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGlmIChfcGF0Y2hMYWJlbEdyaWQuZGF0YVtqXSA+IDAgJiYgX3BhdGNoTGFiZWxHcmlkLmRhdGFbal0gPD0gbGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIHBhdGNoID0gX2ltYWdlVG9QYXRjaEdyaWQuZGF0YVtqXTtcclxuICAgICAgICAgICAgICAgIGhzdlswXSA9IChfcGF0Y2hMYWJlbEdyaWQuZGF0YVtqXSAvIChsYWJlbCArIDEpKSAqIDM2MDtcclxuICAgICAgICAgICAgICAgIENWVXRpbHMuaHN2MnJnYihoc3YsIHJnYik7XHJcbiAgICAgICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdSZWN0KHBhdGNoLnBvcywgX3N1YkltYWdlV3JhcHBlci5zaXplLCBfY2FudmFzQ29udGFpbmVyLmN0eC5iaW5hcnksXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbG9yOiBcInJnYihcIiArIHJnYi5qb2luKFwiLFwiKSArIFwiKVwiLCBsaW5lV2lkdGg6IDJ9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGFiZWw7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKGlucHV0SW1hZ2VXcmFwcGVyLCBjb25maWcpIHtcclxuICAgICAgICBfY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIF9pbnB1dEltYWdlV3JhcHBlciA9IGlucHV0SW1hZ2VXcmFwcGVyO1xyXG5cclxuICAgICAgICBpbml0QnVmZmVycygpO1xyXG4gICAgICAgIGluaXRDYW52YXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgbG9jYXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcGF0Y2hlc0ZvdW5kLFxyXG4gICAgICAgICAgICB0b3BMYWJlbHMsXHJcbiAgICAgICAgICAgIGJveGVzO1xyXG5cclxuICAgICAgICBpZiAoX2NvbmZpZy5oYWxmU2FtcGxlKSB7XHJcbiAgICAgICAgICAgIENWVXRpbHMuaGFsZlNhbXBsZShfaW5wdXRJbWFnZVdyYXBwZXIsIF9jdXJyZW50SW1hZ2VXcmFwcGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJpbmFyaXplSW1hZ2UoKTtcclxuICAgICAgICBwYXRjaGVzRm91bmQgPSBmaW5kUGF0Y2hlcygpO1xyXG4gICAgICAgIC8vIHJldHVybiB1bmxlc3MgNSUgb3IgbW9yZSBwYXRjaGVzIGFyZSBmb3VuZFxyXG4gICAgICAgIGlmIChwYXRjaGVzRm91bmQubGVuZ3RoIDwgX251bVBhdGNoZXMueCAqIF9udW1QYXRjaGVzLnkgKiAwLjA1KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcmFzdGVycml6ZSBhcmVhIGJ5IGNvbXBhcmluZyBhbmd1bGFyIHNpbWlsYXJpdHk7XHJcbiAgICAgICAgdmFyIG1heExhYmVsID0gcmFzdGVyaXplQW5ndWxhclNpbWlsYXJpdHkocGF0Y2hlc0ZvdW5kKTtcclxuICAgICAgICBpZiAobWF4TGFiZWwgPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc2VhcmNoIGZvciBhcmVhIHdpdGggdGhlIG1vc3QgcGF0Y2hlcyAoYmlnZ2VzdCBjb25uZWN0ZWQgYXJlYSlcclxuICAgICAgICB0b3BMYWJlbHMgPSBmaW5kQmlnZ2VzdENvbm5lY3RlZEFyZWFzKG1heExhYmVsKTtcclxuICAgICAgICBpZiAodG9wTGFiZWxzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJveGVzID0gZmluZEJveGVzKHRvcExhYmVscywgbWF4TGFiZWwpO1xyXG4gICAgICAgIHJldHVybiBib3hlcztcclxuICAgIH0sXHJcblxyXG4gICAgY2hlY2tJbWFnZUNvbnN0cmFpbnRzOiBmdW5jdGlvbihpbnB1dFN0cmVhbSwgY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIHBhdGNoU2l6ZSxcclxuICAgICAgICAgICAgd2lkdGggPSBpbnB1dFN0cmVhbS5nZXRXaWR0aCgpLFxyXG4gICAgICAgICAgICBoZWlnaHQgPSBpbnB1dFN0cmVhbS5nZXRIZWlnaHQoKSxcclxuICAgICAgICAgICAgaGFsZlNhbXBsZSA9IGNvbmZpZy5oYWxmU2FtcGxlID8gMC41IDogMSxcclxuICAgICAgICAgICAgc2l6ZSxcclxuICAgICAgICAgICAgYXJlYTtcclxuXHJcbiAgICAgICAgLy8gY2FsY3VsYXRlIHdpZHRoIGFuZCBoZWlnaHQgYmFzZWQgb24gYXJlYVxyXG4gICAgICAgIGlmIChpbnB1dFN0cmVhbS5nZXRDb25maWcoKS5hcmVhKSB7XHJcbiAgICAgICAgICAgIGFyZWEgPSBDVlV0aWxzLmNvbXB1dGVJbWFnZUFyZWEod2lkdGgsIGhlaWdodCwgaW5wdXRTdHJlYW0uZ2V0Q29uZmlnKCkuYXJlYSk7XHJcbiAgICAgICAgICAgIGlucHV0U3RyZWFtLnNldFRvcFJpZ2h0KHt4OiBhcmVhLnN4LCB5OiBhcmVhLnN5fSk7XHJcbiAgICAgICAgICAgIGlucHV0U3RyZWFtLnNldENhbnZhc1NpemUoe3g6IHdpZHRoLCB5OiBoZWlnaHR9KTtcclxuICAgICAgICAgICAgd2lkdGggPSBhcmVhLnN3O1xyXG4gICAgICAgICAgICBoZWlnaHQgPSBhcmVhLnNoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2l6ZSA9IHtcclxuICAgICAgICAgICAgeDogTWF0aC5mbG9vcih3aWR0aCAqIGhhbGZTYW1wbGUpLFxyXG4gICAgICAgICAgICB5OiBNYXRoLmZsb29yKGhlaWdodCAqIGhhbGZTYW1wbGUpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcGF0Y2hTaXplID0gQ1ZVdGlscy5jYWxjdWxhdGVQYXRjaFNpemUoY29uZmlnLnBhdGNoU2l6ZSwgc2l6ZSk7XHJcbiAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBhdGNoLVNpemU6IFwiICsgSlNPTi5zdHJpbmdpZnkocGF0Y2hTaXplKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnB1dFN0cmVhbS5zZXRXaWR0aChNYXRoLmZsb29yKE1hdGguZmxvb3Ioc2l6ZS54IC8gcGF0Y2hTaXplLngpICogKDEgLyBoYWxmU2FtcGxlKSAqIHBhdGNoU2l6ZS54KSk7XHJcbiAgICAgICAgaW5wdXRTdHJlYW0uc2V0SGVpZ2h0KE1hdGguZmxvb3IoTWF0aC5mbG9vcihzaXplLnkgLyBwYXRjaFNpemUueSkgKiAoMSAvIGhhbGZTYW1wbGUpICogcGF0Y2hTaXplLnkpKTtcclxuXHJcbiAgICAgICAgaWYgKChpbnB1dFN0cmVhbS5nZXRXaWR0aCgpICUgcGF0Y2hTaXplLngpID09PSAwICYmIChpbnB1dFN0cmVhbS5nZXRIZWlnaHQoKSAlIHBhdGNoU2l6ZS55KSA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkltYWdlIGRpbWVuc2lvbnMgZG8gbm90IGNvbXBseSB3aXRoIHRoZSBjdXJyZW50IHNldHRpbmdzOiBXaWR0aCAoXCIgK1xyXG4gICAgICAgICAgICB3aWR0aCArIFwiIClhbmQgaGVpZ2h0IChcIiArIGhlaWdodCArXHJcbiAgICAgICAgICAgIFwiKSBtdXN0IGEgbXVsdGlwbGUgb2YgXCIgKyBwYXRjaFNpemUueCk7XHJcbiAgICB9XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2xvY2F0b3IvYmFyY29kZV9sb2NhdG9yLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgZHJhd1JlY3Q6IGZ1bmN0aW9uKHBvcywgc2l6ZSwgY3R4LCBzdHlsZSl7XHJcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3R5bGUuY29sb3I7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0eWxlLmNvbG9yO1xyXG4gICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHguc3Ryb2tlUmVjdChwb3MueCwgcG9zLnksIHNpemUueCwgc2l6ZS55KTtcclxuICAgIH0sXHJcbiAgICBkcmF3UGF0aDogZnVuY3Rpb24ocGF0aCwgZGVmLCBjdHgsIHN0eWxlKSB7XHJcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3R5bGUuY29sb3I7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0eWxlLmNvbG9yO1xyXG4gICAgICAgIGN0eC5saW5lV2lkdGggPSBzdHlsZS5saW5lV2lkdGg7XHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGN0eC5tb3ZlVG8ocGF0aFswXVtkZWYueF0sIHBhdGhbMF1bZGVmLnldKTtcclxuICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IHBhdGgubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgY3R4LmxpbmVUbyhwYXRoW2pdW2RlZi54XSwgcGF0aFtqXVtkZWYueV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgfSxcclxuICAgIGRyYXdJbWFnZTogZnVuY3Rpb24oaW1hZ2VEYXRhLCBzaXplLCBjdHgpIHtcclxuICAgICAgICB2YXIgY2FudmFzRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgc2l6ZS54LCBzaXplLnkpLFxyXG4gICAgICAgICAgICBkYXRhID0gY2FudmFzRGF0YS5kYXRhLFxyXG4gICAgICAgICAgICBpbWFnZURhdGFQb3MgPSBpbWFnZURhdGEubGVuZ3RoLFxyXG4gICAgICAgICAgICBjYW52YXNEYXRhUG9zID0gZGF0YS5sZW5ndGgsXHJcbiAgICAgICAgICAgIHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoY2FudmFzRGF0YVBvcyAvIGltYWdlRGF0YVBvcyAhPT0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlIChpbWFnZURhdGFQb3MtLSl7XHJcbiAgICAgICAgICAgIHZhbHVlID0gaW1hZ2VEYXRhW2ltYWdlRGF0YVBvc107XHJcbiAgICAgICAgICAgIGRhdGFbLS1jYW52YXNEYXRhUG9zXSA9IDI1NTtcclxuICAgICAgICAgICAgZGF0YVstLWNhbnZhc0RhdGFQb3NdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGRhdGFbLS1jYW52YXNEYXRhUG9zXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBkYXRhWy0tY2FudmFzRGF0YVBvc10gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4LnB1dEltYWdlRGF0YShjYW52YXNEYXRhLCAwLCAwKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvY29tbW9uL2ltYWdlX2RlYnVnLmpzXG4gKiovIiwiaW1wb3J0IFRyYWNlciBmcm9tICcuL3RyYWNlcic7XHJcblxyXG4vKipcclxuICogaHR0cDovL3d3dy5jb2RlcHJvamVjdC5jb20vVGlwcy80MDcxNzIvQ29ubmVjdGVkLUNvbXBvbmVudC1MYWJlbGluZy1hbmQtVmVjdG9yaXphdGlvblxyXG4gKi9cclxudmFyIFJhc3Rlcml6ZXIgPSB7XHJcbiAgICBjcmVhdGVDb250b3VyMkQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRpcjogbnVsbCxcclxuICAgICAgICAgICAgaW5kZXg6IG51bGwsXHJcbiAgICAgICAgICAgIGZpcnN0VmVydGV4OiBudWxsLFxyXG4gICAgICAgICAgICBpbnNpZGVDb250b3VyczogbnVsbCxcclxuICAgICAgICAgICAgbmV4dHBlZXI6IG51bGwsXHJcbiAgICAgICAgICAgIHByZXZwZWVyOiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBDT05UT1VSX0RJUjoge1xyXG4gICAgICAgIENXX0RJUjogMCxcclxuICAgICAgICBDQ1dfRElSOiAxLFxyXG4gICAgICAgIFVOS05PV05fRElSOiAyXHJcbiAgICB9LFxyXG4gICAgRElSOiB7XHJcbiAgICAgICAgT1VUU0lERV9FREdFOiAtMzI3NjcsXHJcbiAgICAgICAgSU5TSURFX0VER0U6IC0zMjc2NlxyXG4gICAgfSxcclxuICAgIGNyZWF0ZTogZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCBsYWJlbFdyYXBwZXIpIHtcclxuICAgICAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGEsXHJcbiAgICAgICAgICAgIGxhYmVsRGF0YSA9IGxhYmVsV3JhcHBlci5kYXRhLFxyXG4gICAgICAgICAgICB3aWR0aCA9IGltYWdlV3JhcHBlci5zaXplLngsXHJcbiAgICAgICAgICAgIGhlaWdodCA9IGltYWdlV3JhcHBlci5zaXplLnksXHJcbiAgICAgICAgICAgIHRyYWNlciA9IFRyYWNlci5jcmVhdGUoaW1hZ2VXcmFwcGVyLCBsYWJlbFdyYXBwZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByYXN0ZXJpemU6IGZ1bmN0aW9uKGRlcHRobGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb2xvcixcclxuICAgICAgICAgICAgICAgICAgICBiYyxcclxuICAgICAgICAgICAgICAgICAgICBsYyxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIGN4LFxyXG4gICAgICAgICAgICAgICAgICAgIGN5LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yTWFwID0gW10sXHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIHAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2MsXHJcbiAgICAgICAgICAgICAgICAgICAgc2MsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3RlZENvdW50ID0gMCxcclxuICAgICAgICAgICAgICAgICAgICBpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgNDAwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvck1hcFtpXSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29sb3JNYXBbMF0gPSBpbWFnZURhdGFbMF07XHJcbiAgICAgICAgICAgICAgICBjYyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBjeSA9IDE7IGN5IDwgaGVpZ2h0IC0gMTsgY3krKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJjID0gY29sb3JNYXBbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICggY3ggPSAxOyBjeCA8IHdpZHRoIC0gMTsgY3grKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSBjeSAqIHdpZHRoICsgY3g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbERhdGFbcG9zXSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgPSBpbWFnZURhdGFbcG9zXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xvciAhPT0gYmMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWxpbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYyA9IGNvbm5lY3RlZENvdW50ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JNYXBbbGNdID0gY29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJjID0gY29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRleCA9IHRyYWNlci5jb250b3VyVHJhY2luZyhjeSwgY3gsIGxjLCBjb2xvciwgUmFzdGVyaXplci5ESVIuT1VUU0lERV9FREdFKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZlcnRleCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGVkQ291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsaW5kZXggPSBsYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBSYXN0ZXJpemVyLmNyZWF0ZUNvbnRvdXIyRCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5kaXIgPSBSYXN0ZXJpemVyLkNPTlRPVVJfRElSLkNXX0RJUjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuaW5kZXggPSBsYWJlbGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5maXJzdFZlcnRleCA9IHZlcnRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubmV4dHBlZXIgPSBjYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuaW5zaWRlQ29udG91cnMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNjICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MucHJldnBlZXIgPSBwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MgPSBwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVydGV4ID0gdHJhY2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY29udG91clRyYWNpbmcoY3ksIGN4LCBSYXN0ZXJpemVyLkRJUi5JTlNJREVfRURHRSwgY29sb3IsIGxhYmVsaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmVydGV4ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwID0gUmFzdGVyaXplci5jcmVhdGVDb250b3VyMkQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuZmlyc3RWZXJ0ZXggPSB2ZXJ0ZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmluc2lkZUNvbnRvdXJzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXB0aGxhYmVsID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5kaXIgPSBSYXN0ZXJpemVyLkNPTlRPVVJfRElSLkNDV19ESVI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuZGlyID0gUmFzdGVyaXplci5DT05UT1VSX0RJUi5DV19ESVI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmluZGV4ID0gZGVwdGhsYWJlbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjID0gY2M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKHNjICE9PSBudWxsKSAmJiBzYy5pbmRleCAhPT0gbGFiZWxpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjID0gc2MubmV4dHBlZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2MgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLm5leHRwZWVyID0gc2MuaW5zaWRlQ29udG91cnM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjLmluc2lkZUNvbnRvdXJzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjLmluc2lkZUNvbnRvdXJzLnByZXZwZWVyID0gcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2MuaW5zaWRlQ29udG91cnMgPSBwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbERhdGFbcG9zXSA9IGxhYmVsaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGFiZWxEYXRhW3Bvc10gPT09IFJhc3Rlcml6ZXIuRElSLk9VVFNJREVfRURHRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IGxhYmVsRGF0YVtwb3NdID09PSBSYXN0ZXJpemVyLkRJUi5JTlNJREVfRURHRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxpbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWxEYXRhW3Bvc10gPT09IFJhc3Rlcml6ZXIuRElSLklOU0lERV9FREdFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmMgPSBpbWFnZURhdGFbcG9zXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmMgPSBjb2xvck1hcFswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsaW5kZXggPSBsYWJlbERhdGFbcG9zXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJjID0gY29sb3JNYXBbbGFiZWxpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzYyA9IGNjO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKHNjICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2MuaW5kZXggPSBkZXB0aGxhYmVsO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjID0gc2MubmV4dHBlZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjOiBjYyxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogY29ubmVjdGVkQ291bnRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlYnVnOiB7XHJcbiAgICAgICAgICAgICAgICBkcmF3Q29udG91cjogZnVuY3Rpb24oY2FudmFzLCBmaXJzdENvbnRvdXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHEgPSBmaXJzdENvbnRvdXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcInJlZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJlZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocHEgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXEgPSBwcS5pbnNpZGVDb250b3VycztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpcSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAocHEgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlxICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxID0gaXE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcSA9IGlxLm5leHRwZWVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcSA9IHBxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHEgPSBwcS5uZXh0cGVlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlxID0gcHEuaW5zaWRlQ29udG91cnM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlxID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChxLmRpcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFJhc3Rlcml6ZXIuQ09OVE9VUl9ESVIuQ1dfRElSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJyZWRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFJhc3Rlcml6ZXIuQ09OVE9VUl9ESVIuQ0NXX0RJUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmx1ZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUmFzdGVyaXplci5DT05UT1VSX0RJUi5VTktOT1dOX0RJUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwID0gcS5maXJzdFZlcnRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgubW92ZVRvKHAueCwgcC55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcCA9IHAubmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5saW5lVG8ocC54LCBwLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IHdoaWxlIChwICE9PSBxLmZpcnN0VmVydGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSYXN0ZXJpemVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9sb2NhdG9yL3Jhc3Rlcml6ZXIuanNcbiAqKi8iLCIvKipcclxuICogaHR0cDovL3d3dy5jb2RlcHJvamVjdC5jb20vVGlwcy80MDcxNzIvQ29ubmVjdGVkLUNvbXBvbmVudC1MYWJlbGluZy1hbmQtVmVjdG9yaXphdGlvblxyXG4gKi9cclxudmFyIFRyYWNlciA9IHtcclxuICAgIHNlYXJjaERpcmVjdGlvbnM6IFtbMCwgMV0sIFsxLCAxXSwgWzEsIDBdLCBbMSwgLTFdLCBbMCwgLTFdLCBbLTEsIC0xXSwgWy0xLCAwXSwgWy0xLCAxXV0sXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgbGFiZWxXcmFwcGVyKSB7XHJcbiAgICAgICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhLFxyXG4gICAgICAgICAgICBsYWJlbERhdGEgPSBsYWJlbFdyYXBwZXIuZGF0YSxcclxuICAgICAgICAgICAgc2VhcmNoRGlyZWN0aW9ucyA9IHRoaXMuc2VhcmNoRGlyZWN0aW9ucyxcclxuICAgICAgICAgICAgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54LFxyXG4gICAgICAgICAgICBwb3M7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRyYWNlKGN1cnJlbnQsIGNvbG9yLCBsYWJlbCwgZWRnZWxhYmVsKSB7XHJcbiAgICAgICAgICAgIHZhciBpLFxyXG4gICAgICAgICAgICAgICAgeSxcclxuICAgICAgICAgICAgICAgIHg7XHJcblxyXG4gICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgeSA9IGN1cnJlbnQuY3kgKyBzZWFyY2hEaXJlY3Rpb25zW2N1cnJlbnQuZGlyXVswXTtcclxuICAgICAgICAgICAgICAgIHggPSBjdXJyZW50LmN4ICsgc2VhcmNoRGlyZWN0aW9uc1tjdXJyZW50LmRpcl1bMV07XHJcbiAgICAgICAgICAgICAgICBwb3MgPSB5ICogd2lkdGggKyB4O1xyXG4gICAgICAgICAgICAgICAgaWYgKChpbWFnZURhdGFbcG9zXSA9PT0gY29sb3IpICYmICgobGFiZWxEYXRhW3Bvc10gPT09IDApIHx8IChsYWJlbERhdGFbcG9zXSA9PT0gbGFiZWwpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsRGF0YVtwb3NdID0gbGFiZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudC5jeSA9IHk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudC5jeCA9IHg7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbERhdGFbcG9zXSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbERhdGFbcG9zXSA9IGVkZ2VsYWJlbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudC5kaXIgPSAoY3VycmVudC5kaXIgKyAxKSAlIDg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdmVydGV4MkQoeCwgeSwgZGlyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkaXI6IGRpcixcclxuICAgICAgICAgICAgICAgIHg6IHgsXHJcbiAgICAgICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICAgICAgbmV4dDogbnVsbCxcclxuICAgICAgICAgICAgICAgIHByZXY6IG51bGxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNvbnRvdXJUcmFjaW5nKHN5LCBzeCwgbGFiZWwsIGNvbG9yLCBlZGdlbGFiZWwpIHtcclxuICAgICAgICAgICAgdmFyIEZ2ID0gbnVsbCxcclxuICAgICAgICAgICAgICAgIEN2LFxyXG4gICAgICAgICAgICAgICAgUCxcclxuICAgICAgICAgICAgICAgIGxkaXIsXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGN4OiBzeCxcclxuICAgICAgICAgICAgICAgICAgICBjeTogc3ksXHJcbiAgICAgICAgICAgICAgICAgICAgZGlyOiAwXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRyYWNlKGN1cnJlbnQsIGNvbG9yLCBsYWJlbCwgZWRnZWxhYmVsKSkge1xyXG4gICAgICAgICAgICAgICAgRnYgPSB2ZXJ0ZXgyRChzeCwgc3ksIGN1cnJlbnQuZGlyKTtcclxuICAgICAgICAgICAgICAgIEN2ID0gRnY7XHJcbiAgICAgICAgICAgICAgICBsZGlyID0gY3VycmVudC5kaXI7XHJcbiAgICAgICAgICAgICAgICBQID0gdmVydGV4MkQoY3VycmVudC5jeCwgY3VycmVudC5jeSwgMCk7XHJcbiAgICAgICAgICAgICAgICBQLnByZXYgPSBDdjtcclxuICAgICAgICAgICAgICAgIEN2Lm5leHQgPSBQO1xyXG4gICAgICAgICAgICAgICAgUC5uZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIEN2ID0gUDtcclxuICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50LmRpciA9IChjdXJyZW50LmRpciArIDYpICUgODtcclxuICAgICAgICAgICAgICAgICAgICB0cmFjZShjdXJyZW50LCBjb2xvciwgbGFiZWwsIGVkZ2VsYWJlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxkaXIgIT09IGN1cnJlbnQuZGlyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEN2LmRpciA9IGN1cnJlbnQuZGlyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQID0gdmVydGV4MkQoY3VycmVudC5jeCwgY3VycmVudC5jeSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFAucHJldiA9IEN2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDdi5uZXh0ID0gUDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUC5uZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ3YgPSBQO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEN2LmRpciA9IGxkaXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEN2LnggPSBjdXJyZW50LmN4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDdi55ID0gY3VycmVudC5jeTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGRpciA9IGN1cnJlbnQuZGlyO1xyXG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoY3VycmVudC5jeCAhPT0gc3ggfHwgY3VycmVudC5jeSAhPT0gc3kpO1xyXG4gICAgICAgICAgICAgICAgRnYucHJldiA9IEN2LnByZXY7XHJcbiAgICAgICAgICAgICAgICBDdi5wcmV2Lm5leHQgPSBGdjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gRnY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0cmFjZTogZnVuY3Rpb24oY3VycmVudCwgY29sb3IsIGxhYmVsLCBlZGdlbGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cmFjZShjdXJyZW50LCBjb2xvciwgbGFiZWwsIGVkZ2VsYWJlbCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbnRvdXJUcmFjaW5nOiBmdW5jdGlvbihzeSwgc3gsIGxhYmVsLCBjb2xvciwgZWRnZWxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udG91clRyYWNpbmcoc3ksIHN4LCBsYWJlbCwgY29sb3IsIGVkZ2VsYWJlbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKFRyYWNlcik7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2xvY2F0b3IvdHJhY2VyLmpzXG4gKiovIiwiLyogQHByZXNlcnZlIEFTTSBCRUdJTiAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBlcWVxZXEqL1xyXG5mdW5jdGlvbiBTa2VsZXRvbml6ZXIoc3RkbGliLCBmb3JlaWduLCBidWZmZXIpIHtcclxuICAgIFwidXNlIGFzbVwiO1xyXG5cclxuICAgIHZhciBpbWFnZXMgPSBuZXcgc3RkbGliLlVpbnQ4QXJyYXkoYnVmZmVyKSxcclxuICAgICAgICBzaXplID0gZm9yZWlnbi5zaXplIHwgMCxcclxuICAgICAgICBpbXVsID0gc3RkbGliLk1hdGguaW11bDtcclxuXHJcbiAgICBmdW5jdGlvbiBlcm9kZShpbkltYWdlUHRyLCBvdXRJbWFnZVB0cikge1xyXG4gICAgICAgIGluSW1hZ2VQdHIgPSBpbkltYWdlUHRyIHwgMDtcclxuICAgICAgICBvdXRJbWFnZVB0ciA9IG91dEltYWdlUHRyIHwgMDtcclxuXHJcbiAgICAgICAgdmFyIHYgPSAwLFxyXG4gICAgICAgICAgICB1ID0gMCxcclxuICAgICAgICAgICAgc3VtID0gMCxcclxuICAgICAgICAgICAgeVN0YXJ0MSA9IDAsXHJcbiAgICAgICAgICAgIHlTdGFydDIgPSAwLFxyXG4gICAgICAgICAgICB4U3RhcnQxID0gMCxcclxuICAgICAgICAgICAgeFN0YXJ0MiA9IDAsXHJcbiAgICAgICAgICAgIG9mZnNldCA9IDA7XHJcblxyXG4gICAgICAgIGZvciAoIHYgPSAxOyAodiB8IDApIDwgKChzaXplIC0gMSkgfCAwKTsgdiA9ICh2ICsgMSkgfCAwKSB7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IChvZmZzZXQgKyBzaXplKSB8IDA7XHJcbiAgICAgICAgICAgIGZvciAoIHUgPSAxOyAodSB8IDApIDwgKChzaXplIC0gMSkgfCAwKTsgdSA9ICh1ICsgMSkgfCAwKSB7XHJcbiAgICAgICAgICAgICAgICB5U3RhcnQxID0gKG9mZnNldCAtIHNpemUpIHwgMDtcclxuICAgICAgICAgICAgICAgIHlTdGFydDIgPSAob2Zmc2V0ICsgc2l6ZSkgfCAwO1xyXG4gICAgICAgICAgICAgICAgeFN0YXJ0MSA9ICh1IC0gMSkgfCAwO1xyXG4gICAgICAgICAgICAgICAgeFN0YXJ0MiA9ICh1ICsgMSkgfCAwO1xyXG4gICAgICAgICAgICAgICAgc3VtID0gKChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQxICsgeFN0YXJ0MSkgfCAwXSB8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MSArIHhTdGFydDIpIHwgMF0gfCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIG9mZnNldCArIHUpIHwgMF0gfCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDIgKyB4U3RhcnQxKSB8IDBdIHwgMClcclxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQyICsgeFN0YXJ0MikgfCAwXSB8IDApKSB8IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHN1bSB8IDApID09ICg1IHwgMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZXNbKG91dEltYWdlUHRyICsgb2Zmc2V0ICsgdSkgfCAwXSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlc1sob3V0SW1hZ2VQdHIgKyBvZmZzZXQgKyB1KSB8IDBdID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3VidHJhY3QoYUltYWdlUHRyLCBiSW1hZ2VQdHIsIG91dEltYWdlUHRyKSB7XHJcbiAgICAgICAgYUltYWdlUHRyID0gYUltYWdlUHRyIHwgMDtcclxuICAgICAgICBiSW1hZ2VQdHIgPSBiSW1hZ2VQdHIgfCAwO1xyXG4gICAgICAgIG91dEltYWdlUHRyID0gb3V0SW1hZ2VQdHIgfCAwO1xyXG5cclxuICAgICAgICB2YXIgbGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgbGVuZ3RoID0gaW11bChzaXplLCBzaXplKSB8IDA7XHJcblxyXG4gICAgICAgIHdoaWxlICgobGVuZ3RoIHwgMCkgPiAwKSB7XHJcbiAgICAgICAgICAgIGxlbmd0aCA9IChsZW5ndGggLSAxKSB8IDA7XHJcbiAgICAgICAgICAgIGltYWdlc1sob3V0SW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gPVxyXG4gICAgICAgICAgICAgICAgKChpbWFnZXNbKGFJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSB8IDApIC0gKGltYWdlc1soYkltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCkpIHwgMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYml0d2lzZU9yKGFJbWFnZVB0ciwgYkltYWdlUHRyLCBvdXRJbWFnZVB0cikge1xyXG4gICAgICAgIGFJbWFnZVB0ciA9IGFJbWFnZVB0ciB8IDA7XHJcbiAgICAgICAgYkltYWdlUHRyID0gYkltYWdlUHRyIHwgMDtcclxuICAgICAgICBvdXRJbWFnZVB0ciA9IG91dEltYWdlUHRyIHwgMDtcclxuXHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIGxlbmd0aCA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xyXG5cclxuICAgICAgICB3aGlsZSAoKGxlbmd0aCB8IDApID4gMCkge1xyXG4gICAgICAgICAgICBsZW5ndGggPSAobGVuZ3RoIC0gMSkgfCAwO1xyXG4gICAgICAgICAgICBpbWFnZXNbKG91dEltYWdlUHRyICsgbGVuZ3RoKSB8IDBdID1cclxuICAgICAgICAgICAgICAgICgoaW1hZ2VzWyhhSW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKSB8IChpbWFnZXNbKGJJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSB8IDApKSB8IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvdW50Tm9uWmVybyhpbWFnZVB0cikge1xyXG4gICAgICAgIGltYWdlUHRyID0gaW1hZ2VQdHIgfCAwO1xyXG5cclxuICAgICAgICB2YXIgc3VtID0gMCxcclxuICAgICAgICAgICAgbGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgbGVuZ3RoID0gaW11bChzaXplLCBzaXplKSB8IDA7XHJcblxyXG4gICAgICAgIHdoaWxlICgobGVuZ3RoIHwgMCkgPiAwKSB7XHJcbiAgICAgICAgICAgIGxlbmd0aCA9IChsZW5ndGggLSAxKSB8IDA7XHJcbiAgICAgICAgICAgIHN1bSA9ICgoc3VtIHwgMCkgKyAoaW1hZ2VzWyhpbWFnZVB0ciArIGxlbmd0aCkgfCAwXSB8IDApKSB8IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gKHN1bSB8IDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoaW1hZ2VQdHIsIHZhbHVlKSB7XHJcbiAgICAgICAgaW1hZ2VQdHIgPSBpbWFnZVB0ciB8IDA7XHJcbiAgICAgICAgdmFsdWUgPSB2YWx1ZSB8IDA7XHJcblxyXG4gICAgICAgIHZhciBsZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBsZW5ndGggPSBpbXVsKHNpemUsIHNpemUpIHwgMDtcclxuXHJcbiAgICAgICAgd2hpbGUgKChsZW5ndGggfCAwKSA+IDApIHtcclxuICAgICAgICAgICAgbGVuZ3RoID0gKGxlbmd0aCAtIDEpIHwgMDtcclxuICAgICAgICAgICAgaW1hZ2VzWyhpbWFnZVB0ciArIGxlbmd0aCkgfCAwXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkaWxhdGUoaW5JbWFnZVB0ciwgb3V0SW1hZ2VQdHIpIHtcclxuICAgICAgICBpbkltYWdlUHRyID0gaW5JbWFnZVB0ciB8IDA7XHJcbiAgICAgICAgb3V0SW1hZ2VQdHIgPSBvdXRJbWFnZVB0ciB8IDA7XHJcblxyXG4gICAgICAgIHZhciB2ID0gMCxcclxuICAgICAgICAgICAgdSA9IDAsXHJcbiAgICAgICAgICAgIHN1bSA9IDAsXHJcbiAgICAgICAgICAgIHlTdGFydDEgPSAwLFxyXG4gICAgICAgICAgICB5U3RhcnQyID0gMCxcclxuICAgICAgICAgICAgeFN0YXJ0MSA9IDAsXHJcbiAgICAgICAgICAgIHhTdGFydDIgPSAwLFxyXG4gICAgICAgICAgICBvZmZzZXQgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKCB2ID0gMTsgKHYgfCAwKSA8ICgoc2l6ZSAtIDEpIHwgMCk7IHYgPSAodiArIDEpIHwgMCkge1xyXG4gICAgICAgICAgICBvZmZzZXQgPSAob2Zmc2V0ICsgc2l6ZSkgfCAwO1xyXG4gICAgICAgICAgICBmb3IgKCB1ID0gMTsgKHUgfCAwKSA8ICgoc2l6ZSAtIDEpIHwgMCk7IHUgPSAodSArIDEpIHwgMCkge1xyXG4gICAgICAgICAgICAgICAgeVN0YXJ0MSA9IChvZmZzZXQgLSBzaXplKSB8IDA7XHJcbiAgICAgICAgICAgICAgICB5U3RhcnQyID0gKG9mZnNldCArIHNpemUpIHwgMDtcclxuICAgICAgICAgICAgICAgIHhTdGFydDEgPSAodSAtIDEpIHwgMDtcclxuICAgICAgICAgICAgICAgIHhTdGFydDIgPSAodSArIDEpIHwgMDtcclxuICAgICAgICAgICAgICAgIHN1bSA9ICgoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MSArIHhTdGFydDEpIHwgMF0gfCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDEgKyB4U3RhcnQyKSB8IDBdIHwgMClcclxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyBvZmZzZXQgKyB1KSB8IDBdIHwgMClcclxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQyICsgeFN0YXJ0MSkgfCAwXSB8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MiArIHhTdGFydDIpIHwgMF0gfCAwKSkgfCAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKChzdW0gfCAwKSA+ICgwIHwgMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZXNbKG91dEltYWdlUHRyICsgb2Zmc2V0ICsgdSkgfCAwXSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlc1sob3V0SW1hZ2VQdHIgKyBvZmZzZXQgKyB1KSB8IDBdID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbWVtY3B5KHNyY0ltYWdlUHRyLCBkc3RJbWFnZVB0cikge1xyXG4gICAgICAgIHNyY0ltYWdlUHRyID0gc3JjSW1hZ2VQdHIgfCAwO1xyXG4gICAgICAgIGRzdEltYWdlUHRyID0gZHN0SW1hZ2VQdHIgfCAwO1xyXG5cclxuICAgICAgICB2YXIgbGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgbGVuZ3RoID0gaW11bChzaXplLCBzaXplKSB8IDA7XHJcblxyXG4gICAgICAgIHdoaWxlICgobGVuZ3RoIHwgMCkgPiAwKSB7XHJcbiAgICAgICAgICAgIGxlbmd0aCA9IChsZW5ndGggLSAxKSB8IDA7XHJcbiAgICAgICAgICAgIGltYWdlc1soZHN0SW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gPSAoaW1hZ2VzWyhzcmNJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSB8IDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB6ZXJvQm9yZGVyKGltYWdlUHRyKSB7XHJcbiAgICAgICAgaW1hZ2VQdHIgPSBpbWFnZVB0ciB8IDA7XHJcblxyXG4gICAgICAgIHZhciB4ID0gMCxcclxuICAgICAgICAgICAgeSA9IDA7XHJcblxyXG4gICAgICAgIGZvciAoIHggPSAwOyAoeCB8IDApIDwgKChzaXplIC0gMSkgfCAwKTsgeCA9ICh4ICsgMSkgfCAwKSB7XHJcbiAgICAgICAgICAgIGltYWdlc1soaW1hZ2VQdHIgKyB4KSB8IDBdID0gMDtcclxuICAgICAgICAgICAgaW1hZ2VzWyhpbWFnZVB0ciArIHkpIHwgMF0gPSAwO1xyXG4gICAgICAgICAgICB5ID0gKCh5ICsgc2l6ZSkgLSAxKSB8IDA7XHJcbiAgICAgICAgICAgIGltYWdlc1soaW1hZ2VQdHIgKyB5KSB8IDBdID0gMDtcclxuICAgICAgICAgICAgeSA9ICh5ICsgMSkgfCAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKCB4ID0gMDsgKHggfCAwKSA8IChzaXplIHwgMCk7IHggPSAoeCArIDEpIHwgMCkge1xyXG4gICAgICAgICAgICBpbWFnZXNbKGltYWdlUHRyICsgeSkgfCAwXSA9IDA7XHJcbiAgICAgICAgICAgIHkgPSAoeSArIDEpIHwgMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2tlbGV0b25pemUoKSB7XHJcbiAgICAgICAgdmFyIHN1YkltYWdlUHRyID0gMCxcclxuICAgICAgICAgICAgZXJvZGVkSW1hZ2VQdHIgPSAwLFxyXG4gICAgICAgICAgICB0ZW1wSW1hZ2VQdHIgPSAwLFxyXG4gICAgICAgICAgICBza2VsSW1hZ2VQdHIgPSAwLFxyXG4gICAgICAgICAgICBzdW0gPSAwLFxyXG4gICAgICAgICAgICBkb25lID0gMDtcclxuXHJcbiAgICAgICAgZXJvZGVkSW1hZ2VQdHIgPSBpbXVsKHNpemUsIHNpemUpIHwgMDtcclxuICAgICAgICB0ZW1wSW1hZ2VQdHIgPSAoZXJvZGVkSW1hZ2VQdHIgKyBlcm9kZWRJbWFnZVB0cikgfCAwO1xyXG4gICAgICAgIHNrZWxJbWFnZVB0ciA9ICh0ZW1wSW1hZ2VQdHIgKyBlcm9kZWRJbWFnZVB0cikgfCAwO1xyXG5cclxuICAgICAgICAvLyBpbml0IHNrZWwtaW1hZ2VcclxuICAgICAgICBpbml0KHNrZWxJbWFnZVB0ciwgMCk7XHJcbiAgICAgICAgemVyb0JvcmRlcihzdWJJbWFnZVB0cik7XHJcblxyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgZXJvZGUoc3ViSW1hZ2VQdHIsIGVyb2RlZEltYWdlUHRyKTtcclxuICAgICAgICAgICAgZGlsYXRlKGVyb2RlZEltYWdlUHRyLCB0ZW1wSW1hZ2VQdHIpO1xyXG4gICAgICAgICAgICBzdWJ0cmFjdChzdWJJbWFnZVB0ciwgdGVtcEltYWdlUHRyLCB0ZW1wSW1hZ2VQdHIpO1xyXG4gICAgICAgICAgICBiaXR3aXNlT3Ioc2tlbEltYWdlUHRyLCB0ZW1wSW1hZ2VQdHIsIHNrZWxJbWFnZVB0cik7XHJcbiAgICAgICAgICAgIG1lbWNweShlcm9kZWRJbWFnZVB0ciwgc3ViSW1hZ2VQdHIpO1xyXG4gICAgICAgICAgICBzdW0gPSBjb3VudE5vblplcm8oc3ViSW1hZ2VQdHIpIHwgMDtcclxuICAgICAgICAgICAgZG9uZSA9ICgoc3VtIHwgMCkgPT0gMCB8IDApO1xyXG4gICAgICAgIH0gd2hpbGUgKCFkb25lKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNrZWxldG9uaXplOiBza2VsZXRvbml6ZVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2tlbGV0b25pemVyO1xyXG4vKiBlc2xpbnQtZW5hYmxlIGVxZXFlcSovXHJcbi8qIEBwcmVzZXJ2ZSBBU00gRU5EICovXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2xvY2F0b3Ivc2tlbGV0b25pemVyLmpzXG4gKiovIiwiaW1wb3J0IEJyZXNlbmhhbSBmcm9tICcuL2JyZXNlbmhhbSc7XHJcbmltcG9ydCBJbWFnZURlYnVnIGZyb20gJy4uL2NvbW1vbi9pbWFnZV9kZWJ1Zyc7XHJcbmltcG9ydCBDb2RlMTI4UmVhZGVyIGZyb20gJy4uL3JlYWRlci9jb2RlXzEyOF9yZWFkZXInO1xyXG5pbXBvcnQgRUFOUmVhZGVyIGZyb20gJy4uL3JlYWRlci9lYW5fcmVhZGVyJztcclxuaW1wb3J0IENvZGUzOVJlYWRlciBmcm9tICcuLi9yZWFkZXIvY29kZV8zOV9yZWFkZXInO1xyXG5pbXBvcnQgQ29kZTM5VklOUmVhZGVyIGZyb20gJy4uL3JlYWRlci9jb2RlXzM5X3Zpbl9yZWFkZXInO1xyXG5pbXBvcnQgQ29kYWJhclJlYWRlciBmcm9tICcuLi9yZWFkZXIvY29kYWJhcl9yZWFkZXInO1xyXG5pbXBvcnQgVVBDUmVhZGVyIGZyb20gJy4uL3JlYWRlci91cGNfcmVhZGVyJztcclxuaW1wb3J0IEVBTjhSZWFkZXIgZnJvbSAnLi4vcmVhZGVyL2Vhbl84X3JlYWRlcic7XHJcbmltcG9ydCBVUENFUmVhZGVyIGZyb20gJy4uL3JlYWRlci91cGNfZV9yZWFkZXInO1xyXG5pbXBvcnQgSTJvZjVSZWFkZXIgZnJvbSAnLi4vcmVhZGVyL2kyb2Y1X3JlYWRlcic7XHJcblxyXG5jb25zdCBSRUFERVJTID0ge1xyXG4gICAgY29kZV8xMjhfcmVhZGVyOiBDb2RlMTI4UmVhZGVyLFxyXG4gICAgZWFuX3JlYWRlcjogRUFOUmVhZGVyLFxyXG4gICAgZWFuXzhfcmVhZGVyOiBFQU44UmVhZGVyLFxyXG4gICAgY29kZV8zOV9yZWFkZXI6IENvZGUzOVJlYWRlcixcclxuICAgIGNvZGVfMzlfdmluX3JlYWRlcjogQ29kZTM5VklOUmVhZGVyLFxyXG4gICAgY29kYWJhcl9yZWFkZXI6IENvZGFiYXJSZWFkZXIsXHJcbiAgICB1cGNfcmVhZGVyOiBVUENSZWFkZXIsXHJcbiAgICB1cGNfZV9yZWFkZXI6IFVQQ0VSZWFkZXIsXHJcbiAgICBpMm9mNV9yZWFkZXI6IEkyb2Y1UmVhZGVyXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNyZWF0ZTogZnVuY3Rpb24oY29uZmlnLCBpbnB1dEltYWdlV3JhcHBlcikge1xyXG4gICAgICAgIHZhciBfY2FudmFzID0ge1xyXG4gICAgICAgICAgICAgICAgY3R4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheTogbnVsbFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRvbToge1xyXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IG51bGxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgX2JhcmNvZGVSZWFkZXJzID0gW107XHJcblxyXG4gICAgICAgIGluaXRDYW52YXMoKTtcclxuICAgICAgICBpbml0UmVhZGVycygpO1xyXG4gICAgICAgIGluaXRDb25maWcoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdENhbnZhcygpIHtcclxuICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGRlYnVnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZWJ1Zy5kZXRlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5mcmVxdWVuY3kgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzLmZyZXF1ZW5jeVwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghX2NhbnZhcy5kb20uZnJlcXVlbmN5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2NhbnZhcy5kb20uZnJlcXVlbmN5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5mcmVxdWVuY3kuY2xhc3NOYW1lID0gXCJmcmVxdWVuY3lcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJGRlYnVnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRkZWJ1Zy5hcHBlbmRDaGlsZChfY2FudmFzLmRvbS5mcmVxdWVuY3kpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF9jYW52YXMuY3R4LmZyZXF1ZW5jeSA9IF9jYW52YXMuZG9tLmZyZXF1ZW5jeS5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgX2NhbnZhcy5kb20ucGF0dGVybiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjYW52YXMucGF0dGVybkJ1ZmZlclwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghX2NhbnZhcy5kb20ucGF0dGVybikge1xyXG4gICAgICAgICAgICAgICAgICAgIF9jYW52YXMuZG9tLnBhdHRlcm4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9jYW52YXMuZG9tLnBhdHRlcm4uY2xhc3NOYW1lID0gXCJwYXR0ZXJuQnVmZmVyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRkZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZGVidWcuYXBwZW5kQ2hpbGQoX2NhbnZhcy5kb20ucGF0dGVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX2NhbnZhcy5jdHgucGF0dGVybiA9IF9jYW52YXMuZG9tLnBhdHRlcm4uZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIF9jYW52YXMuZG9tLm92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzLmRyYXdpbmdCdWZmZXJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoX2NhbnZhcy5kb20ub3ZlcmxheSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9jYW52YXMuY3R4Lm92ZXJsYXkgPSBfY2FudmFzLmRvbS5vdmVybGF5LmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdFJlYWRlcnMoKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5yZWFkZXJzLmZvckVhY2goZnVuY3Rpb24ocmVhZGVyQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVhZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24gPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlYWRlckNvbmZpZyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWFkZXIgPSByZWFkZXJDb25maWcuZm9ybWF0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24gPSByZWFkZXJDb25maWcuY29uZmlnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVhZGVyQ29uZmlnID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRlciA9IHJlYWRlckNvbmZpZztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJlZm9yZSByZWdpc3RlcmluZyByZWFkZXI6IFwiLCByZWFkZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX2JhcmNvZGVSZWFkZXJzLnB1c2gobmV3IFJFQURFUlNbcmVhZGVyXShjb25maWd1cmF0aW9uKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyZWQgUmVhZGVyczogXCIgKyBfYmFyY29kZVJlYWRlcnNcclxuICAgICAgICAgICAgICAgICAgICAubWFwKChyZWFkZXIpID0+IEpTT04uc3RyaW5naWZ5KHtmb3JtYXQ6IHJlYWRlci5GT1JNQVQsIGNvbmZpZzogcmVhZGVyLmNvbmZpZ30pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKCcsICcpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdENvbmZpZygpIHtcclxuICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaSxcclxuICAgICAgICAgICAgICAgICAgICB2aXMgPSBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlOiBfY2FudmFzLmRvbS5mcmVxdWVuY3ksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IGNvbmZpZy5kZWJ1Zy5zaG93RnJlcXVlbmN5XHJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlOiBfY2FudmFzLmRvbS5wYXR0ZXJuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBjb25maWcuZGVidWcuc2hvd1BhdHRlcm5cclxuICAgICAgICAgICAgICAgICAgICB9XTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdmlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpc1tpXS5wcm9wID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc1tpXS5ub2RlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlzW2ldLm5vZGUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogZXh0ZW5kIHRoZSBsaW5lIG9uIGJvdGggZW5kc1xyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpbmVcclxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gYW5nbGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBnZXRFeHRlbmRlZExpbmUobGluZSwgYW5nbGUsIGV4dCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBleHRlbmRMaW5lKGFtb3VudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGV4dGVuc2lvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICB5OiBhbW91bnQgKiBNYXRoLnNpbihhbmdsZSksXHJcbiAgICAgICAgICAgICAgICAgICAgeDogYW1vdW50ICogTWF0aC5jb3MoYW5nbGUpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGxpbmVbMF0ueSAtPSBleHRlbnNpb24ueTtcclxuICAgICAgICAgICAgICAgIGxpbmVbMF0ueCAtPSBleHRlbnNpb24ueDtcclxuICAgICAgICAgICAgICAgIGxpbmVbMV0ueSArPSBleHRlbnNpb24ueTtcclxuICAgICAgICAgICAgICAgIGxpbmVbMV0ueCArPSBleHRlbnNpb24ueDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgaW5zaWRlIGltYWdlXHJcbiAgICAgICAgICAgIGV4dGVuZExpbmUoZXh0KTtcclxuICAgICAgICAgICAgd2hpbGUgKGV4dCA+IDEgJiYgKCFpbnB1dEltYWdlV3JhcHBlci5pbkltYWdlV2l0aEJvcmRlcihsaW5lWzBdLCAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHx8ICFpbnB1dEltYWdlV3JhcHBlci5pbkltYWdlV2l0aEJvcmRlcihsaW5lWzFdLCAwKSkpIHtcclxuICAgICAgICAgICAgICAgIGV4dCAtPSBNYXRoLmNlaWwoZXh0IC8gMik7XHJcbiAgICAgICAgICAgICAgICBleHRlbmRMaW5lKC1leHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBsaW5lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0TGluZShib3gpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFt7XHJcbiAgICAgICAgICAgICAgICB4OiAoYm94WzFdWzBdIC0gYm94WzBdWzBdKSAvIDIgKyBib3hbMF1bMF0sXHJcbiAgICAgICAgICAgICAgICB5OiAoYm94WzFdWzFdIC0gYm94WzBdWzFdKSAvIDIgKyBib3hbMF1bMV1cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgeDogKGJveFszXVswXSAtIGJveFsyXVswXSkgLyAyICsgYm94WzJdWzBdLFxyXG4gICAgICAgICAgICAgICAgeTogKGJveFszXVsxXSAtIGJveFsyXVsxXSkgLyAyICsgYm94WzJdWzFdXHJcbiAgICAgICAgICAgIH1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdHJ5RGVjb2RlKGxpbmUpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG51bGwsXHJcbiAgICAgICAgICAgICAgICBpLFxyXG4gICAgICAgICAgICAgICAgYmFyY29kZUxpbmUgPSBCcmVzZW5oYW0uZ2V0QmFyY29kZUxpbmUoaW5wdXRJbWFnZVdyYXBwZXIsIGxpbmVbMF0sIGxpbmVbMV0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiBjb25maWcuZGVidWcuc2hvd0ZyZXF1ZW5jeSkge1xyXG4gICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UGF0aChsaW5lLCB7eDogJ3gnLCB5OiAneSd9LCBfY2FudmFzLmN0eC5vdmVybGF5LCB7Y29sb3I6ICdyZWQnLCBsaW5lV2lkdGg6IDN9KTtcclxuICAgICAgICAgICAgICAgIEJyZXNlbmhhbS5kZWJ1Zy5wcmludEZyZXF1ZW5jeShiYXJjb2RlTGluZS5saW5lLCBfY2FudmFzLmRvbS5mcmVxdWVuY3kpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBCcmVzZW5oYW0udG9CaW5hcnlMaW5lKGJhcmNvZGVMaW5lKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgY29uZmlnLmRlYnVnLnNob3dQYXR0ZXJuKSB7XHJcbiAgICAgICAgICAgICAgICBCcmVzZW5oYW0uZGVidWcucHJpbnRQYXR0ZXJuKGJhcmNvZGVMaW5lLmxpbmUsIF9jYW52YXMuZG9tLnBhdHRlcm4pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IF9iYXJjb2RlUmVhZGVycy5sZW5ndGggJiYgcmVzdWx0ID09PSBudWxsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9iYXJjb2RlUmVhZGVyc1tpXS5kZWNvZGVQYXR0ZXJuKGJhcmNvZGVMaW5lLmxpbmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGNvZGVSZXN1bHQ6IHJlc3VsdCxcclxuICAgICAgICAgICAgICAgIGJhcmNvZGVMaW5lOiBiYXJjb2RlTGluZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhpcyBtZXRob2Qgc2xpY2VzIHRoZSBnaXZlbiBhcmVhIGFwYXJ0IGFuZCB0cmllcyB0byBkZXRlY3QgYSBiYXJjb2RlLXBhdHRlcm5cclxuICAgICAgICAgKiBmb3IgZWFjaCBzbGljZS4gSXQgcmV0dXJucyB0aGUgZGVjb2RlZCBiYXJjb2RlLCBvciBudWxsIGlmIG5vdGhpbmcgd2FzIGZvdW5kXHJcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gYm94XHJcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gbGluZVxyXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsaW5lQW5nbGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB0cnlEZWNvZGVCcnV0ZUZvcmNlKGJveCwgbGluZSwgbGluZUFuZ2xlKSB7XHJcbiAgICAgICAgICAgIHZhciBzaWRlTGVuZ3RoID0gTWF0aC5zcXJ0KE1hdGgucG93KGJveFsxXVswXSAtIGJveFswXVswXSwgMikgKyBNYXRoLnBvdygoYm94WzFdWzFdIC0gYm94WzBdWzFdKSwgMikpLFxyXG4gICAgICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgICAgIHNsaWNlcyA9IDE2LFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbnVsbCxcclxuICAgICAgICAgICAgICAgIGRpcixcclxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbixcclxuICAgICAgICAgICAgICAgIHhkaXIgPSBNYXRoLnNpbihsaW5lQW5nbGUpLFxyXG4gICAgICAgICAgICAgICAgeWRpciA9IE1hdGguY29zKGxpbmVBbmdsZSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKCBpID0gMTsgaSA8IHNsaWNlcyAmJiByZXN1bHQgPT09IG51bGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gbW92ZSBsaW5lIHBlcnBlbmRpY3VsYXIgdG8gYW5nbGVcclxuICAgICAgICAgICAgICAgIGRpciA9IHNpZGVMZW5ndGggLyBzbGljZXMgKiBpICogKGkgJSAyID09PSAwID8gLTEgOiAxKTtcclxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICB5OiBkaXIgKiB4ZGlyLFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IGRpciAqIHlkaXJcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBsaW5lWzBdLnkgKz0gZXh0ZW5zaW9uLng7XHJcbiAgICAgICAgICAgICAgICBsaW5lWzBdLnggLT0gZXh0ZW5zaW9uLnk7XHJcbiAgICAgICAgICAgICAgICBsaW5lWzFdLnkgKz0gZXh0ZW5zaW9uLng7XHJcbiAgICAgICAgICAgICAgICBsaW5lWzFdLnggLT0gZXh0ZW5zaW9uLnk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ5RGVjb2RlKGxpbmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRMaW5lTGVuZ3RoKGxpbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydChcclxuICAgICAgICAgICAgICAgIE1hdGgucG93KE1hdGguYWJzKGxpbmVbMV0ueSAtIGxpbmVbMF0ueSksIDIpICtcclxuICAgICAgICAgICAgICAgIE1hdGgucG93KE1hdGguYWJzKGxpbmVbMV0ueCAtIGxpbmVbMF0ueCksIDIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFdpdGggdGhlIGhlbHAgb2YgdGhlIGNvbmZpZ3VyZWQgcmVhZGVycyAoQ29kZTEyOCBvciBFQU4pIHRoaXMgZnVuY3Rpb24gdHJpZXMgdG8gZGV0ZWN0IGFcclxuICAgICAgICAgKiB2YWxpZCBiYXJjb2RlIHBhdHRlcm4gd2l0aGluIHRoZSBnaXZlbiBhcmVhLlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBib3ggVGhlIGFyZWEgdG8gc2VhcmNoIGluXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdH0gdGhlIHJlc3VsdCB7Y29kZVJlc3VsdCwgbGluZSwgYW5nbGUsIHBhdHRlcm4sIHRocmVzaG9sZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBkZWNvZGVGcm9tQm91bmRpbmdCb3goYm94KSB7XHJcbiAgICAgICAgICAgIHZhciBsaW5lLFxyXG4gICAgICAgICAgICAgICAgbGluZUFuZ2xlLFxyXG4gICAgICAgICAgICAgICAgY3R4ID0gX2NhbnZhcy5jdHgub3ZlcmxheSxcclxuICAgICAgICAgICAgICAgIHJlc3VsdCxcclxuICAgICAgICAgICAgICAgIGxpbmVMZW5ndGg7XHJcblxyXG4gICAgICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmRlYnVnLmRyYXdCb3VuZGluZ0JveCAmJiBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdQYXRoKGJveCwge3g6IDAsIHk6IDF9LCBjdHgsIHtjb2xvcjogXCJibHVlXCIsIGxpbmVXaWR0aDogMn0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsaW5lID0gZ2V0TGluZShib3gpO1xyXG4gICAgICAgICAgICBsaW5lTGVuZ3RoID0gZ2V0TGluZUxlbmd0aChsaW5lKTtcclxuICAgICAgICAgICAgbGluZUFuZ2xlID0gTWF0aC5hdGFuMihsaW5lWzFdLnkgLSBsaW5lWzBdLnksIGxpbmVbMV0ueCAtIGxpbmVbMF0ueCk7XHJcbiAgICAgICAgICAgIGxpbmUgPSBnZXRFeHRlbmRlZExpbmUobGluZSwgbGluZUFuZ2xlLCBNYXRoLmZsb29yKGxpbmVMZW5ndGggKiAwLjEpKTtcclxuICAgICAgICAgICAgaWYgKGxpbmUgPT09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRyeURlY29kZShsaW5lKTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ5RGVjb2RlQnJ1dGVGb3JjZShib3gsIGxpbmUsIGxpbmVBbmdsZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIHJlc3VsdCAmJiBjb25maWcuZGVidWcuZHJhd1NjYW5saW5lICYmIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UGF0aChsaW5lLCB7eDogJ3gnLCB5OiAneSd9LCBjdHgsIHtjb2xvcjogJ3JlZCcsIGxpbmVXaWR0aDogM30pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgY29kZVJlc3VsdDogcmVzdWx0LmNvZGVSZXN1bHQsXHJcbiAgICAgICAgICAgICAgICBsaW5lOiBsaW5lLFxyXG4gICAgICAgICAgICAgICAgYW5nbGU6IGxpbmVBbmdsZSxcclxuICAgICAgICAgICAgICAgIHBhdHRlcm46IHJlc3VsdC5iYXJjb2RlTGluZS5saW5lLFxyXG4gICAgICAgICAgICAgICAgdGhyZXNob2xkOiByZXN1bHQuYmFyY29kZUxpbmUudGhyZXNob2xkXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkZWNvZGVGcm9tQm91bmRpbmdCb3g6IGZ1bmN0aW9uKGJveCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZUZyb21Cb3VuZGluZ0JveChib3gpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZWNvZGVGcm9tQm91bmRpbmdCb3hlczogZnVuY3Rpb24oYm94ZXMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpLCByZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFyY29kZXMgPSBbXSxcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aXBsZSA9IGNvbmZpZy5tdWx0aXBsZTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGJveGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm94ID0gYm94ZXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZGVjb2RlRnJvbUJvdW5kaW5nQm94KGJveCkgfHwge307XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmJveCA9IGJveDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG11bHRpcGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhcmNvZGVzLnB1c2gocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5jb2RlUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhcmNvZGVzXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0UmVhZGVyczogZnVuY3Rpb24ocmVhZGVycykge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLnJlYWRlcnMgPSByZWFkZXJzO1xyXG4gICAgICAgICAgICAgICAgX2JhcmNvZGVSZWFkZXJzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICBpbml0UmVhZGVycygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvZGVjb2Rlci9iYXJjb2RlX2RlY29kZXIuanNcbiAqKi8iLCJpbXBvcnQgQ1ZVdGlscyBmcm9tICcuLi9jb21tb24vY3ZfdXRpbHMnO1xyXG5pbXBvcnQgSW1hZ2VXcmFwcGVyIGZyb20gJy4uL2NvbW1vbi9pbWFnZV93cmFwcGVyJztcclxuXHJcbnZhciBCcmVzZW5oYW0gPSB7fTtcclxuXHJcbnZhciBTbG9wZSA9IHtcclxuICAgIERJUjoge1xyXG4gICAgICAgIFVQOiAxLFxyXG4gICAgICAgIERPV046IC0xXHJcbiAgICB9XHJcbn07XHJcbi8qKlxyXG4gKiBTY2FucyBhIGxpbmUgb2YgdGhlIGdpdmVuIGltYWdlIGZyb20gcG9pbnQgcDEgdG8gcDIgYW5kIHJldHVybnMgYSByZXN1bHQgb2JqZWN0IGNvbnRhaW5pbmdcclxuICogZ3JheS1zY2FsZSB2YWx1ZXMgKDAtMjU1KSBvZiB0aGUgdW5kZXJseWluZyBwaXhlbHMgaW4gYWRkaXRpb24gdG8gdGhlIG1pblxyXG4gKiBhbmQgbWF4IHZhbHVlcy5cclxuICogQHBhcmFtIHtPYmplY3R9IGltYWdlV3JhcHBlclxyXG4gKiBAcGFyYW0ge09iamVjdH0gcDEgVGhlIHN0YXJ0IHBvaW50IHt4LHl9XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwMiBUaGUgZW5kIHBvaW50IHt4LHl9XHJcbiAqIEByZXR1cm5zIHtsaW5lLCBtaW4sIG1heH1cclxuICovXHJcbkJyZXNlbmhhbS5nZXRCYXJjb2RlTGluZSA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgcDEsIHAyKSB7XHJcbiAgICB2YXIgeDAgPSBwMS54IHwgMCxcclxuICAgICAgICB5MCA9IHAxLnkgfCAwLFxyXG4gICAgICAgIHgxID0gcDIueCB8IDAsXHJcbiAgICAgICAgeTEgPSBwMi55IHwgMCxcclxuICAgICAgICBzdGVlcCA9IE1hdGguYWJzKHkxIC0geTApID4gTWF0aC5hYnMoeDEgLSB4MCksXHJcbiAgICAgICAgZGVsdGF4LFxyXG4gICAgICAgIGRlbHRheSxcclxuICAgICAgICBlcnJvcixcclxuICAgICAgICB5c3RlcCxcclxuICAgICAgICB5LFxyXG4gICAgICAgIHRtcCxcclxuICAgICAgICB4LFxyXG4gICAgICAgIGxpbmUgPSBbXSxcclxuICAgICAgICBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YSxcclxuICAgICAgICB3aWR0aCA9IGltYWdlV3JhcHBlci5zaXplLngsXHJcbiAgICAgICAgc3VtID0gMCxcclxuICAgICAgICB2YWwsXHJcbiAgICAgICAgbWluID0gMjU1LFxyXG4gICAgICAgIG1heCA9IDA7XHJcblxyXG4gICAgZnVuY3Rpb24gcmVhZChhLCBiKSB7XHJcbiAgICAgICAgdmFsID0gaW1hZ2VEYXRhW2IgKiB3aWR0aCArIGFdO1xyXG4gICAgICAgIHN1bSArPSB2YWw7XHJcbiAgICAgICAgbWluID0gdmFsIDwgbWluID8gdmFsIDogbWluO1xyXG4gICAgICAgIG1heCA9IHZhbCA+IG1heCA/IHZhbCA6IG1heDtcclxuICAgICAgICBsaW5lLnB1c2godmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc3RlZXApIHtcclxuICAgICAgICB0bXAgPSB4MDtcclxuICAgICAgICB4MCA9IHkwO1xyXG4gICAgICAgIHkwID0gdG1wO1xyXG5cclxuICAgICAgICB0bXAgPSB4MTtcclxuICAgICAgICB4MSA9IHkxO1xyXG4gICAgICAgIHkxID0gdG1wO1xyXG4gICAgfVxyXG4gICAgaWYgKHgwID4geDEpIHtcclxuICAgICAgICB0bXAgPSB4MDtcclxuICAgICAgICB4MCA9IHgxO1xyXG4gICAgICAgIHgxID0gdG1wO1xyXG5cclxuICAgICAgICB0bXAgPSB5MDtcclxuICAgICAgICB5MCA9IHkxO1xyXG4gICAgICAgIHkxID0gdG1wO1xyXG4gICAgfVxyXG4gICAgZGVsdGF4ID0geDEgLSB4MDtcclxuICAgIGRlbHRheSA9IE1hdGguYWJzKHkxIC0geTApO1xyXG4gICAgZXJyb3IgPSAoZGVsdGF4IC8gMikgfCAwO1xyXG4gICAgeSA9IHkwO1xyXG4gICAgeXN0ZXAgPSB5MCA8IHkxID8gMSA6IC0xO1xyXG4gICAgZm9yICggeCA9IHgwOyB4IDwgeDE7IHgrKykge1xyXG4gICAgICAgIGlmIChzdGVlcCl7XHJcbiAgICAgICAgICAgIHJlYWQoeSwgeCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVhZCh4LCB5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXJyb3IgPSBlcnJvciAtIGRlbHRheTtcclxuICAgICAgICBpZiAoZXJyb3IgPCAwKSB7XHJcbiAgICAgICAgICAgIHkgPSB5ICsgeXN0ZXA7XHJcbiAgICAgICAgICAgIGVycm9yID0gZXJyb3IgKyBkZWx0YXg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbGluZTogbGluZSxcclxuICAgICAgICBtaW46IG1pbixcclxuICAgICAgICBtYXg6IG1heFxyXG4gICAgfTtcclxufTtcclxuXHJcbkJyZXNlbmhhbS50b090c3VCaW5hcnlMaW5lID0gZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICB2YXIgbGluZSA9IHJlc3VsdC5saW5lLFxyXG4gICAgICAgIGltYWdlID0gbmV3IEltYWdlV3JhcHBlcih7eDogbGluZS5sZW5ndGggLSAxLCB5OiAxfSwgbGluZSksXHJcbiAgICAgICAgdGhyZXNob2xkID0gQ1ZVdGlscy5kZXRlcm1pbmVPdHN1VGhyZXNob2xkKGltYWdlLCA1KTtcclxuXHJcbiAgICBsaW5lID0gQ1ZVdGlscy5zaGFycGVuTGluZShsaW5lKTtcclxuICAgIENWVXRpbHMudGhyZXNob2xkSW1hZ2UoaW1hZ2UsIHRocmVzaG9sZCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsaW5lOiBsaW5lLFxyXG4gICAgICAgIHRocmVzaG9sZDogdGhyZXNob2xkXHJcbiAgICB9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoZSByZXN1bHQgZnJvbSBnZXRCYXJjb2RlTGluZSBpbnRvIGEgYmluYXJ5IHJlcHJlc2VudGF0aW9uXHJcbiAqIGFsc28gY29uc2lkZXJpbmcgdGhlIGZyZXF1ZW5jeSBhbmQgc2xvcGUgb2YgdGhlIHNpZ25hbCBmb3IgbW9yZSByb2J1c3QgcmVzdWx0c1xyXG4gKiBAcGFyYW0ge09iamVjdH0gcmVzdWx0IHtsaW5lLCBtaW4sIG1heH1cclxuICovXHJcbkJyZXNlbmhhbS50b0JpbmFyeUxpbmUgPSBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgIHZhciBtaW4gPSByZXN1bHQubWluLFxyXG4gICAgICAgIG1heCA9IHJlc3VsdC5tYXgsXHJcbiAgICAgICAgbGluZSA9IHJlc3VsdC5saW5lLFxyXG4gICAgICAgIHNsb3BlLFxyXG4gICAgICAgIHNsb3BlMixcclxuICAgICAgICBjZW50ZXIgPSBtaW4gKyAobWF4IC0gbWluKSAvIDIsXHJcbiAgICAgICAgZXh0cmVtYSA9IFtdLFxyXG4gICAgICAgIGN1cnJlbnREaXIsXHJcbiAgICAgICAgZGlyLFxyXG4gICAgICAgIHRocmVzaG9sZCA9IChtYXggLSBtaW4pIC8gMTIsXHJcbiAgICAgICAgclRocmVzaG9sZCA9IC10aHJlc2hvbGQsXHJcbiAgICAgICAgaSxcclxuICAgICAgICBqO1xyXG5cclxuICAgIC8vIDEuIGZpbmQgZXh0cmVtYVxyXG4gICAgY3VycmVudERpciA9IGxpbmVbMF0gPiBjZW50ZXIgPyBTbG9wZS5ESVIuVVAgOiBTbG9wZS5ESVIuRE9XTjtcclxuICAgIGV4dHJlbWEucHVzaCh7XHJcbiAgICAgICAgcG9zOiAwLFxyXG4gICAgICAgIHZhbDogbGluZVswXVxyXG4gICAgfSk7XHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IGxpbmUubGVuZ3RoIC0gMjsgaSsrKSB7XHJcbiAgICAgICAgc2xvcGUgPSAobGluZVtpICsgMV0gLSBsaW5lW2ldKTtcclxuICAgICAgICBzbG9wZTIgPSAobGluZVtpICsgMl0gLSBsaW5lW2kgKyAxXSk7XHJcbiAgICAgICAgaWYgKChzbG9wZSArIHNsb3BlMikgPCByVGhyZXNob2xkICYmIGxpbmVbaSArIDFdIDwgKGNlbnRlciAqIDEuNSkpIHtcclxuICAgICAgICAgICAgZGlyID0gU2xvcGUuRElSLkRPV047XHJcbiAgICAgICAgfSBlbHNlIGlmICgoc2xvcGUgKyBzbG9wZTIpID4gdGhyZXNob2xkICYmIGxpbmVbaSArIDFdID4gKGNlbnRlciAqIDAuNSkpIHtcclxuICAgICAgICAgICAgZGlyID0gU2xvcGUuRElSLlVQO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRpciA9IGN1cnJlbnREaXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY3VycmVudERpciAhPT0gZGlyKSB7XHJcbiAgICAgICAgICAgIGV4dHJlbWEucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBwb3M6IGksXHJcbiAgICAgICAgICAgICAgICB2YWw6IGxpbmVbaV1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnREaXIgPSBkaXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXh0cmVtYS5wdXNoKHtcclxuICAgICAgICBwb3M6IGxpbmUubGVuZ3RoLFxyXG4gICAgICAgIHZhbDogbGluZVtsaW5lLmxlbmd0aCAtIDFdXHJcbiAgICB9KTtcclxuXHJcbiAgICBmb3IgKCBqID0gZXh0cmVtYVswXS5wb3M7IGogPCBleHRyZW1hWzFdLnBvczsgaisrKSB7XHJcbiAgICAgICAgbGluZVtqXSA9IGxpbmVbal0gPiBjZW50ZXIgPyAwIDogMTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpdGVyYXRlIG92ZXIgZXh0cmVtYSBhbmQgY29udmVydCB0byBiaW5hcnkgYmFzZWQgb24gYXZnIGJldHdlZW4gbWlubWF4XHJcbiAgICBmb3IgKCBpID0gMTsgaSA8IGV4dHJlbWEubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGV4dHJlbWFbaSArIDFdLnZhbCA+IGV4dHJlbWFbaV0udmFsKSB7XHJcbiAgICAgICAgICAgIHRocmVzaG9sZCA9IChleHRyZW1hW2ldLnZhbCArICgoZXh0cmVtYVtpICsgMV0udmFsIC0gZXh0cmVtYVtpXS52YWwpIC8gMykgKiAyKSB8IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyZXNob2xkID0gKGV4dHJlbWFbaSArIDFdLnZhbCArICgoZXh0cmVtYVtpXS52YWwgLSBleHRyZW1hW2kgKyAxXS52YWwpIC8gMykpIHwgMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoIGogPSBleHRyZW1hW2ldLnBvczsgaiA8IGV4dHJlbWFbaSArIDFdLnBvczsgaisrKSB7XHJcbiAgICAgICAgICAgIGxpbmVbal0gPSBsaW5lW2pdID4gdGhyZXNob2xkID8gMCA6IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbGluZTogbGluZSxcclxuICAgICAgICB0aHJlc2hvbGQ6IHRocmVzaG9sZFxyXG4gICAgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBVc2VkIGZvciBkZXZlbG9wbWVudCBvbmx5XHJcbiAqL1xyXG5CcmVzZW5oYW0uZGVidWcgPSB7XHJcbiAgICBwcmludEZyZXF1ZW5jeTogZnVuY3Rpb24obGluZSwgY2FudmFzKSB7XHJcbiAgICAgICAgdmFyIGksXHJcbiAgICAgICAgICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgY2FudmFzLndpZHRoID0gbGluZS5sZW5ndGg7XHJcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IDI1NjtcclxuXHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmx1ZVwiO1xyXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgbGluZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjdHgubW92ZVRvKGksIDI1NSk7XHJcbiAgICAgICAgICAgIGN0eC5saW5lVG8oaSwgMjU1IC0gbGluZVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHByaW50UGF0dGVybjogZnVuY3Rpb24obGluZSwgY2FudmFzKSB7XHJcbiAgICAgICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiksIGk7XHJcblxyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGxpbmUubGVuZ3RoO1xyXG4gICAgICAgIGN0eC5maWxsQ29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBsaW5lLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChsaW5lW2ldID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoaSwgMCwgMSwgMTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJyZXNlbmhhbTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvZGVjb2Rlci9icmVzZW5oYW0uanNcbiAqKi8iLCJpbXBvcnQgQmFyY29kZVJlYWRlciBmcm9tICcuL2JhcmNvZGVfcmVhZGVyJztcclxuXHJcbmZ1bmN0aW9uIENvZGUxMjhSZWFkZXIoKSB7XHJcbiAgICBCYXJjb2RlUmVhZGVyLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbnZhciBwcm9wZXJ0aWVzID0ge1xyXG4gICAgQ09ERV9TSElGVDoge3ZhbHVlOiA5OH0sXHJcbiAgICBDT0RFX0M6IHt2YWx1ZTogOTl9LFxyXG4gICAgQ09ERV9COiB7dmFsdWU6IDEwMH0sXHJcbiAgICBDT0RFX0E6IHt2YWx1ZTogMTAxfSxcclxuICAgIFNUQVJUX0NPREVfQToge3ZhbHVlOiAxMDN9LFxyXG4gICAgU1RBUlRfQ09ERV9COiB7dmFsdWU6IDEwNH0sXHJcbiAgICBTVEFSVF9DT0RFX0M6IHt2YWx1ZTogMTA1fSxcclxuICAgIFNUT1BfQ09ERToge3ZhbHVlOiAxMDZ9LFxyXG4gICAgTU9EVUxPOiB7dmFsdWU6IDExfSxcclxuICAgIENPREVfUEFUVEVSTjoge3ZhbHVlOiBbXHJcbiAgICAgICAgWzIsIDEsIDIsIDIsIDIsIDJdLFxyXG4gICAgICAgIFsyLCAyLCAyLCAxLCAyLCAyXSxcclxuICAgICAgICBbMiwgMiwgMiwgMiwgMiwgMV0sXHJcbiAgICAgICAgWzEsIDIsIDEsIDIsIDIsIDNdLFxyXG4gICAgICAgIFsxLCAyLCAxLCAzLCAyLCAyXSxcclxuICAgICAgICBbMSwgMywgMSwgMiwgMiwgMl0sXHJcbiAgICAgICAgWzEsIDIsIDIsIDIsIDEsIDNdLFxyXG4gICAgICAgIFsxLCAyLCAyLCAzLCAxLCAyXSxcclxuICAgICAgICBbMSwgMywgMiwgMiwgMSwgMl0sXHJcbiAgICAgICAgWzIsIDIsIDEsIDIsIDEsIDNdLFxyXG4gICAgICAgIFsyLCAyLCAxLCAzLCAxLCAyXSxcclxuICAgICAgICBbMiwgMywgMSwgMiwgMSwgMl0sXHJcbiAgICAgICAgWzEsIDEsIDIsIDIsIDMsIDJdLFxyXG4gICAgICAgIFsxLCAyLCAyLCAxLCAzLCAyXSxcclxuICAgICAgICBbMSwgMiwgMiwgMiwgMywgMV0sXHJcbiAgICAgICAgWzEsIDEsIDMsIDIsIDIsIDJdLFxyXG4gICAgICAgIFsxLCAyLCAzLCAxLCAyLCAyXSxcclxuICAgICAgICBbMSwgMiwgMywgMiwgMiwgMV0sXHJcbiAgICAgICAgWzIsIDIsIDMsIDIsIDEsIDFdLFxyXG4gICAgICAgIFsyLCAyLCAxLCAxLCAzLCAyXSxcclxuICAgICAgICBbMiwgMiwgMSwgMiwgMywgMV0sXHJcbiAgICAgICAgWzIsIDEsIDMsIDIsIDEsIDJdLFxyXG4gICAgICAgIFsyLCAyLCAzLCAxLCAxLCAyXSxcclxuICAgICAgICBbMywgMSwgMiwgMSwgMywgMV0sXHJcbiAgICAgICAgWzMsIDEsIDEsIDIsIDIsIDJdLFxyXG4gICAgICAgIFszLCAyLCAxLCAxLCAyLCAyXSxcclxuICAgICAgICBbMywgMiwgMSwgMiwgMiwgMV0sXHJcbiAgICAgICAgWzMsIDEsIDIsIDIsIDEsIDJdLFxyXG4gICAgICAgIFszLCAyLCAyLCAxLCAxLCAyXSxcclxuICAgICAgICBbMywgMiwgMiwgMiwgMSwgMV0sXHJcbiAgICAgICAgWzIsIDEsIDIsIDEsIDIsIDNdLFxyXG4gICAgICAgIFsyLCAxLCAyLCAzLCAyLCAxXSxcclxuICAgICAgICBbMiwgMywgMiwgMSwgMiwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDEsIDMsIDIsIDNdLFxyXG4gICAgICAgIFsxLCAzLCAxLCAxLCAyLCAzXSxcclxuICAgICAgICBbMSwgMywgMSwgMywgMiwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDIsIDMsIDEsIDNdLFxyXG4gICAgICAgIFsxLCAzLCAyLCAxLCAxLCAzXSxcclxuICAgICAgICBbMSwgMywgMiwgMywgMSwgMV0sXHJcbiAgICAgICAgWzIsIDEsIDEsIDMsIDEsIDNdLFxyXG4gICAgICAgIFsyLCAzLCAxLCAxLCAxLCAzXSxcclxuICAgICAgICBbMiwgMywgMSwgMywgMSwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDIsIDEsIDMsIDNdLFxyXG4gICAgICAgIFsxLCAxLCAyLCAzLCAzLCAxXSxcclxuICAgICAgICBbMSwgMywgMiwgMSwgMywgMV0sXHJcbiAgICAgICAgWzEsIDEsIDMsIDEsIDIsIDNdLFxyXG4gICAgICAgIFsxLCAxLCAzLCAzLCAyLCAxXSxcclxuICAgICAgICBbMSwgMywgMywgMSwgMiwgMV0sXHJcbiAgICAgICAgWzMsIDEsIDMsIDEsIDIsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAxLCAzLCAzLCAxXSxcclxuICAgICAgICBbMiwgMywgMSwgMSwgMywgMV0sXHJcbiAgICAgICAgWzIsIDEsIDMsIDEsIDEsIDNdLFxyXG4gICAgICAgIFsyLCAxLCAzLCAzLCAxLCAxXSxcclxuICAgICAgICBbMiwgMSwgMywgMSwgMywgMV0sXHJcbiAgICAgICAgWzMsIDEsIDEsIDEsIDIsIDNdLFxyXG4gICAgICAgIFszLCAxLCAxLCAzLCAyLCAxXSxcclxuICAgICAgICBbMywgMywgMSwgMSwgMiwgMV0sXHJcbiAgICAgICAgWzMsIDEsIDIsIDEsIDEsIDNdLFxyXG4gICAgICAgIFszLCAxLCAyLCAzLCAxLCAxXSxcclxuICAgICAgICBbMywgMywgMiwgMSwgMSwgMV0sXHJcbiAgICAgICAgWzMsIDEsIDQsIDEsIDEsIDFdLFxyXG4gICAgICAgIFsyLCAyLCAxLCA0LCAxLCAxXSxcclxuICAgICAgICBbNCwgMywgMSwgMSwgMSwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDEsIDIsIDIsIDRdLFxyXG4gICAgICAgIFsxLCAxLCAxLCA0LCAyLCAyXSxcclxuICAgICAgICBbMSwgMiwgMSwgMSwgMiwgNF0sXHJcbiAgICAgICAgWzEsIDIsIDEsIDQsIDIsIDFdLFxyXG4gICAgICAgIFsxLCA0LCAxLCAxLCAyLCAyXSxcclxuICAgICAgICBbMSwgNCwgMSwgMiwgMiwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDIsIDIsIDEsIDRdLFxyXG4gICAgICAgIFsxLCAxLCAyLCA0LCAxLCAyXSxcclxuICAgICAgICBbMSwgMiwgMiwgMSwgMSwgNF0sXHJcbiAgICAgICAgWzEsIDIsIDIsIDQsIDEsIDFdLFxyXG4gICAgICAgIFsxLCA0LCAyLCAxLCAxLCAyXSxcclxuICAgICAgICBbMSwgNCwgMiwgMiwgMSwgMV0sXHJcbiAgICAgICAgWzIsIDQsIDEsIDIsIDEsIDFdLFxyXG4gICAgICAgIFsyLCAyLCAxLCAxLCAxLCA0XSxcclxuICAgICAgICBbNCwgMSwgMywgMSwgMSwgMV0sXHJcbiAgICAgICAgWzIsIDQsIDEsIDEsIDEsIDJdLFxyXG4gICAgICAgIFsxLCAzLCA0LCAxLCAxLCAxXSxcclxuICAgICAgICBbMSwgMSwgMSwgMiwgNCwgMl0sXHJcbiAgICAgICAgWzEsIDIsIDEsIDEsIDQsIDJdLFxyXG4gICAgICAgIFsxLCAyLCAxLCAyLCA0LCAxXSxcclxuICAgICAgICBbMSwgMSwgNCwgMiwgMSwgMl0sXHJcbiAgICAgICAgWzEsIDIsIDQsIDEsIDEsIDJdLFxyXG4gICAgICAgIFsxLCAyLCA0LCAyLCAxLCAxXSxcclxuICAgICAgICBbNCwgMSwgMSwgMiwgMSwgMl0sXHJcbiAgICAgICAgWzQsIDIsIDEsIDEsIDEsIDJdLFxyXG4gICAgICAgIFs0LCAyLCAxLCAyLCAxLCAxXSxcclxuICAgICAgICBbMiwgMSwgMiwgMSwgNCwgMV0sXHJcbiAgICAgICAgWzIsIDEsIDQsIDEsIDIsIDFdLFxyXG4gICAgICAgIFs0LCAxLCAyLCAxLCAyLCAxXSxcclxuICAgICAgICBbMSwgMSwgMSwgMSwgNCwgM10sXHJcbiAgICAgICAgWzEsIDEsIDEsIDMsIDQsIDFdLFxyXG4gICAgICAgIFsxLCAzLCAxLCAxLCA0LCAxXSxcclxuICAgICAgICBbMSwgMSwgNCwgMSwgMSwgM10sXHJcbiAgICAgICAgWzEsIDEsIDQsIDMsIDEsIDFdLFxyXG4gICAgICAgIFs0LCAxLCAxLCAxLCAxLCAzXSxcclxuICAgICAgICBbNCwgMSwgMSwgMywgMSwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDMsIDEsIDQsIDFdLFxyXG4gICAgICAgIFsxLCAxLCA0LCAxLCAzLCAxXSxcclxuICAgICAgICBbMywgMSwgMSwgMSwgNCwgMV0sXHJcbiAgICAgICAgWzQsIDEsIDEsIDEsIDMsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAxLCA0LCAxLCAyXSxcclxuICAgICAgICBbMiwgMSwgMSwgMiwgMSwgNF0sXHJcbiAgICAgICAgWzIsIDEsIDEsIDIsIDMsIDJdLFxyXG4gICAgICAgIFsyLCAzLCAzLCAxLCAxLCAxLCAyXVxyXG4gICAgXX0sXHJcbiAgICBTSU5HTEVfQ09ERV9FUlJPUjoge3ZhbHVlOiAxfSxcclxuICAgIEFWR19DT0RFX0VSUk9SOiB7dmFsdWU6IDAuNX0sXHJcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJjb2RlXzEyOFwiLCB3cml0ZWFibGU6IGZhbHNlfVxyXG59O1xyXG5cclxuQ29kZTEyOFJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcclxuQ29kZTEyOFJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb2RlMTI4UmVhZGVyO1xyXG5cclxuQ29kZTEyOFJlYWRlci5wcm90b3R5cGUuX2RlY29kZUNvZGUgPSBmdW5jdGlvbihzdGFydCkge1xyXG4gICAgdmFyIGNvdW50ZXIgPSBbMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgaSxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBvZmZzZXQgPSBzdGFydCxcclxuICAgICAgICBpc1doaXRlID0gIXNlbGYuX3Jvd1tvZmZzZXRdLFxyXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxyXG4gICAgICAgIGJlc3RNYXRjaCA9IHtcclxuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXHJcbiAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXHJcbiAgICAgICAgICAgIGVuZDogc3RhcnRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvZGUsXHJcbiAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgbm9ybWFsaXplZDtcclxuXHJcbiAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBjb3VudGVyLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWQgPSBzZWxmLl9ub3JtYWxpemUoY291bnRlcik7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29kZSA9IDA7IGNvZGUgPCBzZWxmLkNPREVfUEFUVEVSTi5sZW5ndGg7IGNvZGUrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHNlbGYuX21hdGNoUGF0dGVybihub3JtYWxpemVkLCBzZWxmLkNPREVfUEFUVEVSTltjb2RlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciA8IGJlc3RNYXRjaC5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmNvZGUgPSBjb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVuZCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJlc3RNYXRjaDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuQ29kZTEyOFJlYWRlci5wcm90b3R5cGUuX2ZpbmRTdGFydCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGNvdW50ZXIgPSBbMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgaSxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3JvdyksXHJcbiAgICAgICAgaXNXaGl0ZSA9IGZhbHNlLFxyXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxyXG4gICAgICAgIGJlc3RNYXRjaCA9IHtcclxuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXHJcbiAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICBzdGFydDogMCxcclxuICAgICAgICAgICAgZW5kOiAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb2RlLFxyXG4gICAgICAgIGVycm9yLFxyXG4gICAgICAgIGosXHJcbiAgICAgICAgc3VtLFxyXG4gICAgICAgIG5vcm1hbGl6ZWQ7XHJcblxyXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBzdW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBjb3VudGVyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGNvdW50ZXJbal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkID0gc2VsZi5fbm9ybWFsaXplKGNvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvZGUgPSBzZWxmLlNUQVJUX0NPREVfQTsgY29kZSA8PSBzZWxmLlNUQVJUX0NPREVfQzsgY29kZSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKG5vcm1hbGl6ZWQsIHNlbGYuQ09ERV9QQVRURVJOW2NvZGVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIDwgYmVzdE1hdGNoLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guY29kZSA9IGNvZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYmVzdE1hdGNoLmVycm9yIDwgc2VsZi5BVkdfQ09ERV9FUlJPUikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guc3RhcnQgPSBpIC0gc3VtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZW5kID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJlc3RNYXRjaDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCA0OyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2pdID0gY291bnRlcltqICsgMl07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyWzRdID0gMDtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJbNV0gPSAwO1xyXG4gICAgICAgICAgICAgICAgY291bnRlclBvcy0tO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xyXG4gICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5Db2RlMTI4UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgc3RhcnRJbmZvID0gc2VsZi5fZmluZFN0YXJ0KCksXHJcbiAgICAgICAgY29kZSA9IG51bGwsXHJcbiAgICAgICAgZG9uZSA9IGZhbHNlLFxyXG4gICAgICAgIHJlc3VsdCA9IFtdLFxyXG4gICAgICAgIG11bHRpcGxpZXIgPSAwLFxyXG4gICAgICAgIGNoZWNrc3VtID0gMCxcclxuICAgICAgICBjb2Rlc2V0LFxyXG4gICAgICAgIHJhd1Jlc3VsdCA9IFtdLFxyXG4gICAgICAgIGRlY29kZWRDb2RlcyA9IFtdLFxyXG4gICAgICAgIHNoaWZ0TmV4dCA9IGZhbHNlLFxyXG4gICAgICAgIHVuc2hpZnQsXHJcbiAgICAgICAgcmVtb3ZlTGFzdENoYXJhY3RlciA9IHRydWU7XHJcblxyXG4gICAgaWYgKHN0YXJ0SW5mbyA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY29kZSA9IHtcclxuICAgICAgICBjb2RlOiBzdGFydEluZm8uY29kZSxcclxuICAgICAgICBzdGFydDogc3RhcnRJbmZvLnN0YXJ0LFxyXG4gICAgICAgIGVuZDogc3RhcnRJbmZvLmVuZFxyXG4gICAgfTtcclxuICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xyXG4gICAgY2hlY2tzdW0gPSBjb2RlLmNvZGU7XHJcbiAgICBzd2l0Y2ggKGNvZGUuY29kZSkge1xyXG4gICAgY2FzZSBzZWxmLlNUQVJUX0NPREVfQTpcclxuICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0E7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIHNlbGYuU1RBUlRfQ09ERV9COlxyXG4gICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQjtcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2Ugc2VsZi5TVEFSVF9DT0RFX0M6XHJcbiAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9DO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICB3aGlsZSAoIWRvbmUpIHtcclxuICAgICAgICB1bnNoaWZ0ID0gc2hpZnROZXh0O1xyXG4gICAgICAgIHNoaWZ0TmV4dCA9IGZhbHNlO1xyXG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kKTtcclxuICAgICAgICBpZiAoY29kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoY29kZS5jb2RlICE9PSBzZWxmLlNUT1BfQ09ERSkge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlTGFzdENoYXJhY3RlciA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgIT09IHNlbGYuU1RPUF9DT0RFKSB7XHJcbiAgICAgICAgICAgICAgICByYXdSZXN1bHQucHVzaChjb2RlLmNvZGUpO1xyXG4gICAgICAgICAgICAgICAgbXVsdGlwbGllcisrO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tzdW0gKz0gbXVsdGlwbGllciAqIGNvZGUuY29kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAoY29kZXNldCkge1xyXG4gICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9BOlxyXG4gICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSA8IDY0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgzMiArIGNvZGUuY29kZSkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb2RlLmNvZGUgPCA5Nikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZS5jb2RlIC0gNjQpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSAhPT0gc2VsZi5TVE9QX0NPREUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTGFzdENoYXJhY3RlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvZGUuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX1NISUZUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlmdE5leHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0I6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9DO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuU1RPUF9DT0RFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0I6XHJcbiAgICAgICAgICAgICAgICBpZiAoY29kZS5jb2RlIDwgOTYpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKDMyICsgY29kZS5jb2RlKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgIT09IHNlbGYuU1RPUF9DT0RFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUxhc3RDaGFyYWN0ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjb2RlLmNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9TSElGVDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnROZXh0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9BO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9BOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0E7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0M6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLlNUT1BfQ09ERTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9DOlxyXG4gICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSA8IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSA8IDEwID8gXCIwXCIgKyBjb2RlLmNvZGUgOiBjb2RlLmNvZGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29kZS5jb2RlICE9PSBzZWxmLlNUT1BfQ09ERSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVMYXN0Q2hhcmFjdGVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY29kZS5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9BO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9COlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5TVE9QX0NPREU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodW5zaGlmdCkge1xyXG4gICAgICAgICAgICBjb2Rlc2V0ID0gY29kZXNldCA9PT0gc2VsZi5DT0RFX0EgPyBzZWxmLkNPREVfQiA6IHNlbGYuQ09ERV9BO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoY29kZSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvZGUuZW5kID0gc2VsZi5fbmV4dFVuc2V0KHNlbGYuX3JvdywgY29kZS5lbmQpO1xyXG4gICAgaWYgKCFzZWxmLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UoY29kZSkpe1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrc3VtIC09IG11bHRpcGxpZXIgKiByYXdSZXN1bHRbcmF3UmVzdWx0Lmxlbmd0aCAtIDFdO1xyXG4gICAgaWYgKGNoZWNrc3VtICUgMTAzICE9PSByYXdSZXN1bHRbcmF3UmVzdWx0Lmxlbmd0aCAtIDFdKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFyZXN1bHQubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmVtb3ZlIGxhc3QgY29kZSBmcm9tIHJlc3VsdCAoY2hlY2tzdW0pXHJcbiAgICBpZiAocmVtb3ZlTGFzdENoYXJhY3Rlcikge1xyXG4gICAgICAgIHJlc3VsdC5zcGxpY2UocmVzdWx0Lmxlbmd0aCAtIDEsIDEpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvZGU6IHJlc3VsdC5qb2luKFwiXCIpLFxyXG4gICAgICAgIHN0YXJ0OiBzdGFydEluZm8uc3RhcnQsXHJcbiAgICAgICAgZW5kOiBjb2RlLmVuZCxcclxuICAgICAgICBjb2Rlc2V0OiBjb2Rlc2V0LFxyXG4gICAgICAgIHN0YXJ0SW5mbzogc3RhcnRJbmZvLFxyXG4gICAgICAgIGRlY29kZWRDb2RlczogZGVjb2RlZENvZGVzLFxyXG4gICAgICAgIGVuZEluZm86IGNvZGVcclxuICAgIH07XHJcbn07XHJcblxyXG5cclxuQmFyY29kZVJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZSA9IGZ1bmN0aW9uKGVuZEluZm8pIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICB0cmFpbGluZ1doaXRlc3BhY2VFbmQ7XHJcblxyXG4gICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kID0gZW5kSW5mby5lbmQgKyAoKGVuZEluZm8uZW5kIC0gZW5kSW5mby5zdGFydCkgLyAyKTtcclxuICAgIGlmICh0cmFpbGluZ1doaXRlc3BhY2VFbmQgPCBzZWxmLl9yb3cubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UoZW5kSW5mby5lbmQsIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCwgMCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVuZEluZm87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb2RlMTI4UmVhZGVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvY29kZV8xMjhfcmVhZGVyLmpzXG4gKiovIiwiZnVuY3Rpb24gQmFyY29kZVJlYWRlcihjb25maWcpIHtcclxuICAgIHRoaXMuX3JvdyA9IFtdO1xyXG4gICAgdGhpcy5jb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICByZXR1cm4gdGhpcztcclxufVxyXG5cclxuQmFyY29kZVJlYWRlci5wcm90b3R5cGUuX25leHRVbnNldCA9IGZ1bmN0aW9uKGxpbmUsIHN0YXJ0KSB7XHJcbiAgICB2YXIgaTtcclxuXHJcbiAgICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHN0YXJ0ID0gMDtcclxuICAgIH1cclxuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgbGluZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghbGluZVtpXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGluZS5sZW5ndGg7XHJcbn07XHJcblxyXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hQYXR0ZXJuID0gZnVuY3Rpb24oY291bnRlciwgY29kZSkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgZXJyb3IgPSAwLFxyXG4gICAgICAgIHNpbmdsZUVycm9yID0gMCxcclxuICAgICAgICBtb2R1bG8gPSB0aGlzLk1PRFVMTyxcclxuICAgICAgICBtYXhTaW5nbGVFcnJvciA9IHRoaXMuU0lOR0xFX0NPREVfRVJST1IgfHwgMTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHNpbmdsZUVycm9yID0gTWF0aC5hYnMoY29kZVtpXSAtIGNvdW50ZXJbaV0pO1xyXG4gICAgICAgIGlmIChzaW5nbGVFcnJvciA+IG1heFNpbmdsZUVycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIuTUFYX1ZBTFVFO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlcnJvciArPSBzaW5nbGVFcnJvcjtcclxuICAgIH1cclxuICAgIHJldHVybiBlcnJvciAvIG1vZHVsbztcclxufTtcclxuXHJcbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9uZXh0U2V0ID0gZnVuY3Rpb24obGluZSwgb2Zmc2V0KSB7XHJcbiAgICB2YXIgaTtcclxuXHJcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcclxuICAgIGZvciAoaSA9IG9mZnNldDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAobGluZVtpXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGluZS5sZW5ndGg7XHJcbn07XHJcblxyXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbm9ybWFsaXplID0gZnVuY3Rpb24oY291bnRlciwgbW9kdWxvKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBzdW0gPSAwLFxyXG4gICAgICAgIHJhdGlvLFxyXG4gICAgICAgIG51bU9uZXMgPSAwLFxyXG4gICAgICAgIG5vcm1hbGl6ZWQgPSBbXSxcclxuICAgICAgICBub3JtID0gMDtcclxuXHJcbiAgICBpZiAoIW1vZHVsbykge1xyXG4gICAgICAgIG1vZHVsbyA9IHNlbGYuTU9EVUxPO1xyXG4gICAgfVxyXG4gICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoY291bnRlcltpXSA9PT0gMSkge1xyXG4gICAgICAgICAgICBudW1PbmVzKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3VtICs9IGNvdW50ZXJbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmF0aW8gPSBzdW0gLyAobW9kdWxvIC0gbnVtT25lcyk7XHJcbiAgICBpZiAocmF0aW8gPiAxLjApIHtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBub3JtID0gY291bnRlcltpXSA9PT0gMSA/IGNvdW50ZXJbaV0gOiBjb3VudGVyW2ldIC8gcmF0aW87XHJcbiAgICAgICAgICAgIG5vcm1hbGl6ZWQucHVzaChub3JtKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJhdGlvID0gKHN1bSArIG51bU9uZXMpIC8gbW9kdWxvO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5vcm0gPSBjb3VudGVyW2ldIC8gcmF0aW87XHJcbiAgICAgICAgICAgIG5vcm1hbGl6ZWQucHVzaChub3JtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbm9ybWFsaXplZDtcclxufTtcclxuXHJcbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9tYXRjaFRyYWNlID0gZnVuY3Rpb24oY21wQ291bnRlciwgZXBzaWxvbikge1xyXG4gICAgdmFyIGNvdW50ZXIgPSBbXSxcclxuICAgICAgICBpLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KSxcclxuICAgICAgICBpc1doaXRlID0gIXNlbGYuX3Jvd1tvZmZzZXRdLFxyXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxyXG4gICAgICAgIGJlc3RNYXRjaCA9IHtcclxuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXHJcbiAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICBzdGFydDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I7XHJcblxyXG4gICAgaWYgKGNtcENvdW50ZXIpIHtcclxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGNtcENvdW50ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY291bnRlci5wdXNoKDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4oY291bnRlciwgY21wQ291bnRlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciA8IGVwc2lsb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLnN0YXJ0ID0gaSAtIG9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVuZCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb3VudGVyID0gY291bnRlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJlc3RNYXRjaDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xyXG4gICAgICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb3VudGVyLnB1c2goMCk7XHJcbiAgICAgICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xyXG4gICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xyXG4gICAgICAgICAgICAgICAgY291bnRlci5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XHJcbiAgICAgICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgY21wQ291bnRlciB3YXMgbm90IGdpdmVuXHJcbiAgICBiZXN0TWF0Y2guc3RhcnQgPSBvZmZzZXQ7XHJcbiAgICBiZXN0TWF0Y2guZW5kID0gc2VsZi5fcm93Lmxlbmd0aCAtIDE7XHJcbiAgICBiZXN0TWF0Y2guY291bnRlciA9IGNvdW50ZXI7XHJcbiAgICByZXR1cm4gYmVzdE1hdGNoO1xyXG59O1xyXG5cclxuQmFyY29kZVJlYWRlci5wcm90b3R5cGUuZGVjb2RlUGF0dGVybiA9IGZ1bmN0aW9uKHBhdHRlcm4pIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICByZXN1bHQ7XHJcblxyXG4gICAgc2VsZi5fcm93ID0gcGF0dGVybjtcclxuICAgIHJlc3VsdCA9IHNlbGYuX2RlY29kZSgpO1xyXG4gICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkge1xyXG4gICAgICAgIHNlbGYuX3Jvdy5yZXZlcnNlKCk7XHJcbiAgICAgICAgcmVzdWx0ID0gc2VsZi5fZGVjb2RlKCk7XHJcbiAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXN1bHQuZGlyZWN0aW9uID0gQmFyY29kZVJlYWRlci5ESVJFQ1RJT04uUkVWRVJTRTtcclxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0ID0gc2VsZi5fcm93Lmxlbmd0aCAtIHJlc3VsdC5zdGFydDtcclxuICAgICAgICAgICAgcmVzdWx0LmVuZCA9IHNlbGYuX3Jvdy5sZW5ndGggLSByZXN1bHQuZW5kO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzdWx0LmRpcmVjdGlvbiA9IEJhcmNvZGVSZWFkZXIuRElSRUNUSU9OLkZPUldBUkQ7XHJcbiAgICB9XHJcbiAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgcmVzdWx0LmZvcm1hdCA9IHNlbGYuRk9STUFUO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9tYXRjaFJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIGVuZCwgdmFsdWUpIHtcclxuICAgIHZhciBpO1xyXG5cclxuICAgIHN0YXJ0ID0gc3RhcnQgPCAwID8gMCA6IHN0YXJ0O1xyXG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xyXG4gICAgICAgIGlmICh0aGlzLl9yb3dbaV0gIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9maWxsQ291bnRlcnMgPSBmdW5jdGlvbihvZmZzZXQsIGVuZCwgaXNXaGl0ZSkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgY291bnRlcnMgPSBbXTtcclxuXHJcbiAgICBpc1doaXRlID0gKHR5cGVvZiBpc1doaXRlICE9PSAndW5kZWZpbmVkJykgPyBpc1doaXRlIDogdHJ1ZTtcclxuICAgIG9mZnNldCA9ICh0eXBlb2Ygb2Zmc2V0ICE9PSAndW5kZWZpbmVkJykgPyBvZmZzZXQgOiBzZWxmLl9uZXh0VW5zZXQoc2VsZi5fcm93KTtcclxuICAgIGVuZCA9IGVuZCB8fCBzZWxmLl9yb3cubGVuZ3RoO1xyXG5cclxuICAgIGNvdW50ZXJzW2NvdW50ZXJQb3NdID0gMDtcclxuICAgIGZvciAoaSA9IG9mZnNldDsgaSA8IGVuZDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcclxuICAgICAgICAgICAgY291bnRlcnNbY291bnRlclBvc10rKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb3VudGVyUG9zKys7XHJcbiAgICAgICAgICAgIGNvdW50ZXJzW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjb3VudGVycztcclxufTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgXCJGT1JNQVRcIiwge1xyXG4gICAgdmFsdWU6ICd1bmtub3duJyxcclxuICAgIHdyaXRlYWJsZTogZmFsc2VcclxufSk7XHJcblxyXG5CYXJjb2RlUmVhZGVyLkRJUkVDVElPTiA9IHtcclxuICAgIEZPUldBUkQ6IDEsXHJcbiAgICBSRVZFUlNFOiAtMVxyXG59O1xyXG5cclxuQmFyY29kZVJlYWRlci5FeGNlcHRpb24gPSB7XHJcbiAgICBTdGFydE5vdEZvdW5kRXhjZXB0aW9uOiBcIlN0YXJ0LUluZm8gd2FzIG5vdCBmb3VuZCFcIixcclxuICAgIENvZGVOb3RGb3VuZEV4Y2VwdGlvbjogXCJDb2RlIGNvdWxkIG5vdCBiZSBmb3VuZCFcIixcclxuICAgIFBhdHRlcm5Ob3RGb3VuZEV4Y2VwdGlvbjogXCJQYXR0ZXJuIGNvdWxkIG5vdCBiZSBmb3VuZCFcIlxyXG59O1xyXG5cclxuQmFyY29kZVJlYWRlci5DT05GSUdfS0VZUyA9IHt9O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFyY29kZVJlYWRlcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL2JhcmNvZGVfcmVhZGVyLmpzXG4gKiovIiwiaW1wb3J0IEJhcmNvZGVSZWFkZXIgZnJvbSAnLi9iYXJjb2RlX3JlYWRlcic7XHJcblxyXG5mdW5jdGlvbiBFQU5SZWFkZXIob3B0cykge1xyXG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMsIG9wdHMpO1xyXG59XHJcblxyXG52YXIgcHJvcGVydGllcyA9IHtcclxuICAgIENPREVfTF9TVEFSVDoge3ZhbHVlOiAwfSxcclxuICAgIE1PRFVMTzoge3ZhbHVlOiA3fSxcclxuICAgIENPREVfR19TVEFSVDoge3ZhbHVlOiAxMH0sXHJcbiAgICBTVEFSVF9QQVRURVJOOiB7dmFsdWU6IFsxIC8gMyAqIDcsIDEgLyAzICogNywgMSAvIDMgKiA3XX0sXHJcbiAgICBTVE9QX1BBVFRFUk46IHt2YWx1ZTogWzEgLyAzICogNywgMSAvIDMgKiA3LCAxIC8gMyAqIDddfSxcclxuICAgIE1JRERMRV9QQVRURVJOOiB7dmFsdWU6IFsxIC8gNSAqIDcsIDEgLyA1ICogNywgMSAvIDUgKiA3LCAxIC8gNSAqIDcsIDEgLyA1ICogN119LFxyXG4gICAgQ09ERV9QQVRURVJOOiB7dmFsdWU6IFtcclxuICAgICAgICBbMywgMiwgMSwgMV0sXHJcbiAgICAgICAgWzIsIDIsIDIsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAyLCAyXSxcclxuICAgICAgICBbMSwgNCwgMSwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDMsIDJdLFxyXG4gICAgICAgIFsxLCAyLCAzLCAxXSxcclxuICAgICAgICBbMSwgMSwgMSwgNF0sXHJcbiAgICAgICAgWzEsIDMsIDEsIDJdLFxyXG4gICAgICAgIFsxLCAyLCAxLCAzXSxcclxuICAgICAgICBbMywgMSwgMSwgMl0sXHJcbiAgICAgICAgWzEsIDEsIDIsIDNdLFxyXG4gICAgICAgIFsxLCAyLCAyLCAyXSxcclxuICAgICAgICBbMiwgMiwgMSwgMl0sXHJcbiAgICAgICAgWzEsIDEsIDQsIDFdLFxyXG4gICAgICAgIFsyLCAzLCAxLCAxXSxcclxuICAgICAgICBbMSwgMywgMiwgMV0sXHJcbiAgICAgICAgWzQsIDEsIDEsIDFdLFxyXG4gICAgICAgIFsyLCAxLCAzLCAxXSxcclxuICAgICAgICBbMywgMSwgMiwgMV0sXHJcbiAgICAgICAgWzIsIDEsIDEsIDNdXHJcbiAgICBdfSxcclxuICAgIENPREVfRlJFUVVFTkNZOiB7dmFsdWU6IFswLCAxMSwgMTMsIDE0LCAxOSwgMjUsIDI4LCAyMSwgMjIsIDI2XX0sXHJcbiAgICBTSU5HTEVfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjY3fSxcclxuICAgIEFWR19DT0RFX0VSUk9SOiB7dmFsdWU6IDAuMjd9LFxyXG4gICAgRk9STUFUOiB7dmFsdWU6IFwiZWFuXzEzXCIsIHdyaXRlYWJsZTogZmFsc2V9XHJcbn07XHJcblxyXG5FQU5SZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XHJcbkVBTlJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFQU5SZWFkZXI7XHJcblxyXG5FQU5SZWFkZXIucHJvdG90eXBlLl9kZWNvZGVDb2RlID0gZnVuY3Rpb24oc3RhcnQsIGNvZGVyYW5nZSkge1xyXG4gICAgdmFyIGNvdW50ZXIgPSBbMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgaSxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBvZmZzZXQgPSBzdGFydCxcclxuICAgICAgICBpc1doaXRlID0gIXNlbGYuX3Jvd1tvZmZzZXRdLFxyXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxyXG4gICAgICAgIGJlc3RNYXRjaCA9IHtcclxuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXHJcbiAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXHJcbiAgICAgICAgICAgIGVuZDogc3RhcnRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvZGUsXHJcbiAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgbm9ybWFsaXplZDtcclxuXHJcbiAgICBpZiAoIWNvZGVyYW5nZSkge1xyXG4gICAgICAgIGNvZGVyYW5nZSA9IHNlbGYuQ09ERV9QQVRURVJOLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBjb3VudGVyLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWQgPSBzZWxmLl9ub3JtYWxpemUoY291bnRlcik7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29kZSA9IDA7IGNvZGUgPCBjb2RlcmFuZ2U7IGNvZGUrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHNlbGYuX21hdGNoUGF0dGVybihub3JtYWxpemVkLCBzZWxmLkNPREVfUEFUVEVSTltjb2RlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciA8IGJlc3RNYXRjaC5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmNvZGUgPSBjb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVuZCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJlc3RNYXRjaC5lcnJvciA+IHNlbGYuQVZHX0NPREVfRVJST1IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XHJcbiAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbkVBTlJlYWRlci5wcm90b3R5cGUuX2ZpbmRQYXR0ZXJuID0gZnVuY3Rpb24ocGF0dGVybiwgb2Zmc2V0LCBpc1doaXRlLCB0cnlIYXJkZXIsIGVwc2lsb24pIHtcclxuICAgIHZhciBjb3VudGVyID0gW10sXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgaSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMCxcclxuICAgICAgICBiZXN0TWF0Y2ggPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnQ6IDAsXHJcbiAgICAgICAgICAgIGVuZDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgaixcclxuICAgICAgICBzdW0sXHJcbiAgICAgICAgbm9ybWFsaXplZDtcclxuXHJcbiAgICBpZiAoIW9mZnNldCkge1xyXG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNXaGl0ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaXNXaGl0ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0cnlIYXJkZXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRyeUhhcmRlciA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCBlcHNpbG9uID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBlcHNpbG9uID0gc2VsZi5BVkdfQ09ERV9FUlJPUjtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IHBhdHRlcm4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb3VudGVyW2ldID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBjb3VudGVyLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHN1bSA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IGNvdW50ZXIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gY291bnRlcltqXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWQgPSBzZWxmLl9ub3JtYWxpemUoY291bnRlcik7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKG5vcm1hbGl6ZWQsIHBhdHRlcm4pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBlcHNpbG9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guc3RhcnQgPSBpIC0gc3VtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZW5kID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJlc3RNYXRjaDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodHJ5SGFyZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBjb3VudGVyLmxlbmd0aCAtIDI7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2pdID0gY291bnRlcltqICsgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlci5sZW5ndGggLSAyXSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyLmxlbmd0aCAtIDFdID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyUG9zLS07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xyXG4gICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5FQU5SZWFkZXIucHJvdG90eXBlLl9maW5kU3RhcnQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0LFxyXG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KSxcclxuICAgICAgICBzdGFydEluZm87XHJcblxyXG4gICAgd2hpbGUgKCFzdGFydEluZm8pIHtcclxuICAgICAgICBzdGFydEluZm8gPSBzZWxmLl9maW5kUGF0dGVybihzZWxmLlNUQVJUX1BBVFRFUk4sIG9mZnNldCk7XHJcbiAgICAgICAgaWYgKCFzdGFydEluZm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQgPSBzdGFydEluZm8uc3RhcnQgLSAoc3RhcnRJbmZvLmVuZCAtIHN0YXJ0SW5mby5zdGFydCk7XHJcbiAgICAgICAgaWYgKGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQgPj0gMCkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5fbWF0Y2hSYW5nZShsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0LCBzdGFydEluZm8uc3RhcnQsIDApKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhcnRJbmZvO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9mZnNldCA9IHN0YXJ0SW5mby5lbmQ7XHJcbiAgICAgICAgc3RhcnRJbmZvID0gbnVsbDtcclxuICAgIH1cclxufTtcclxuXHJcbkVBTlJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZSA9IGZ1bmN0aW9uKGVuZEluZm8pIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICB0cmFpbGluZ1doaXRlc3BhY2VFbmQ7XHJcblxyXG4gICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kID0gZW5kSW5mby5lbmQgKyAoZW5kSW5mby5lbmQgLSBlbmRJbmZvLnN0YXJ0KTtcclxuICAgIGlmICh0cmFpbGluZ1doaXRlc3BhY2VFbmQgPCBzZWxmLl9yb3cubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UoZW5kSW5mby5lbmQsIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCwgMCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVuZEluZm87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5FQU5SZWFkZXIucHJvdG90eXBlLl9maW5kRW5kID0gZnVuY3Rpb24ob2Zmc2V0LCBpc1doaXRlKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgZW5kSW5mbyA9IHNlbGYuX2ZpbmRQYXR0ZXJuKHNlbGYuU1RPUF9QQVRURVJOLCBvZmZzZXQsIGlzV2hpdGUsIGZhbHNlKTtcclxuXHJcbiAgICByZXR1cm4gZW5kSW5mbyAhPT0gbnVsbCA/IHNlbGYuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZShlbmRJbmZvKSA6IG51bGw7XHJcbn07XHJcblxyXG5FQU5SZWFkZXIucHJvdG90eXBlLl9jYWxjdWxhdGVGaXJzdERpZ2l0ID0gZnVuY3Rpb24oY29kZUZyZXF1ZW5jeSkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgZm9yICggaSA9IDA7IGkgPCBzZWxmLkNPREVfRlJFUVVFTkNZLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGNvZGVGcmVxdWVuY3kgPT09IHNlbGYuQ09ERV9GUkVRVUVOQ1lbaV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5FQU5SZWFkZXIucHJvdG90eXBlLl9kZWNvZGVQYXlsb2FkID0gZnVuY3Rpb24oY29kZSwgcmVzdWx0LCBkZWNvZGVkQ29kZXMpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGNvZGVGcmVxdWVuY3kgPSAweDAsXHJcbiAgICAgICAgZmlyc3REaWdpdDtcclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kKTtcclxuICAgICAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb2RlLmNvZGUgPj0gc2VsZi5DT0RFX0dfU1RBUlQpIHtcclxuICAgICAgICAgICAgY29kZS5jb2RlID0gY29kZS5jb2RlIC0gc2VsZi5DT0RFX0dfU1RBUlQ7XHJcbiAgICAgICAgICAgIGNvZGVGcmVxdWVuY3kgfD0gMSA8PCAoNSAtIGkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvZGVGcmVxdWVuY3kgfD0gMCA8PCAoNSAtIGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUpO1xyXG4gICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZpcnN0RGlnaXQgPSBzZWxmLl9jYWxjdWxhdGVGaXJzdERpZ2l0KGNvZGVGcmVxdWVuY3kpO1xyXG4gICAgaWYgKGZpcnN0RGlnaXQgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJlc3VsdC51bnNoaWZ0KGZpcnN0RGlnaXQpO1xyXG5cclxuICAgIGNvZGUgPSBzZWxmLl9maW5kUGF0dGVybihzZWxmLk1JRERMRV9QQVRURVJOLCBjb2RlLmVuZCwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgaWYgKGNvZGUgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAgICAgY29kZSA9IHNlbGYuX2RlY29kZUNvZGUoY29kZS5lbmQsIHNlbGYuQ09ERV9HX1NUQVJUKTtcclxuICAgICAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xyXG4gICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvZGU7XHJcbn07XHJcblxyXG5FQU5SZWFkZXIucHJvdG90eXBlLl9kZWNvZGUgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzdGFydEluZm8sXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgY29kZSxcclxuICAgICAgICByZXN1bHQgPSBbXSxcclxuICAgICAgICBkZWNvZGVkQ29kZXMgPSBbXTtcclxuXHJcbiAgICBzdGFydEluZm8gPSBzZWxmLl9maW5kU3RhcnQoKTtcclxuICAgIGlmICghc3RhcnRJbmZvKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjb2RlID0ge1xyXG4gICAgICAgIGNvZGU6IHN0YXJ0SW5mby5jb2RlLFxyXG4gICAgICAgIHN0YXJ0OiBzdGFydEluZm8uc3RhcnQsXHJcbiAgICAgICAgZW5kOiBzdGFydEluZm8uZW5kXHJcbiAgICB9O1xyXG4gICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XHJcbiAgICBjb2RlID0gc2VsZi5fZGVjb2RlUGF5bG9hZChjb2RlLCByZXN1bHQsIGRlY29kZWRDb2Rlcyk7XHJcbiAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvZGUgPSBzZWxmLl9maW5kRW5kKGNvZGUuZW5kLCBmYWxzZSk7XHJcbiAgICBpZiAoIWNvZGUpe1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xyXG5cclxuICAgIC8vIENoZWNrc3VtXHJcbiAgICBpZiAoIXNlbGYuX2NoZWNrc3VtKHJlc3VsdCkpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvZGU6IHJlc3VsdC5qb2luKFwiXCIpLFxyXG4gICAgICAgIHN0YXJ0OiBzdGFydEluZm8uc3RhcnQsXHJcbiAgICAgICAgZW5kOiBjb2RlLmVuZCxcclxuICAgICAgICBjb2Rlc2V0OiBcIlwiLFxyXG4gICAgICAgIHN0YXJ0SW5mbzogc3RhcnRJbmZvLFxyXG4gICAgICAgIGRlY29kZWRDb2RlczogZGVjb2RlZENvZGVzXHJcbiAgICB9O1xyXG59O1xyXG5cclxuRUFOUmVhZGVyLnByb3RvdHlwZS5fY2hlY2tzdW0gPSBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgIHZhciBzdW0gPSAwLCBpO1xyXG5cclxuICAgIGZvciAoIGkgPSByZXN1bHQubGVuZ3RoIC0gMjsgaSA+PSAwOyBpIC09IDIpIHtcclxuICAgICAgICBzdW0gKz0gcmVzdWx0W2ldO1xyXG4gICAgfVxyXG4gICAgc3VtICo9IDM7XHJcbiAgICBmb3IgKCBpID0gcmVzdWx0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaSAtPSAyKSB7XHJcbiAgICAgICAgc3VtICs9IHJlc3VsdFtpXTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdW0gJSAxMCA9PT0gMDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChFQU5SZWFkZXIpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvZWFuX3JlYWRlci5qc1xuICoqLyIsImltcG9ydCBCYXJjb2RlUmVhZGVyIGZyb20gJy4vYmFyY29kZV9yZWFkZXInO1xyXG5pbXBvcnQgQXJyYXlIZWxwZXIgZnJvbSAnLi4vY29tbW9uL2FycmF5X2hlbHBlcic7XHJcblxyXG5mdW5jdGlvbiBDb2RlMzlSZWFkZXIoKSB7XHJcbiAgICBCYXJjb2RlUmVhZGVyLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbnZhciBwcm9wZXJ0aWVzID0ge1xyXG4gICAgQUxQSEFCRVRIX1NUUklORzoge3ZhbHVlOiBcIjAxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWi0uICokLyslXCJ9LFxyXG4gICAgQUxQSEFCRVQ6IHt2YWx1ZTogWzQ4LCA0OSwgNTAsIDUxLCA1MiwgNTMsIDU0LCA1NSwgNTYsIDU3LCA2NSwgNjYsIDY3LCA2OCwgNjksIDcwLCA3MSwgNzIsIDczLCA3NCwgNzUsIDc2LCA3NywgNzgsXHJcbiAgICAgICAgNzksIDgwLCA4MSwgODIsIDgzLCA4NCwgODUsIDg2LCA4NywgODgsIDg5LCA5MCwgNDUsIDQ2LCAzMiwgNDIsIDM2LCA0NywgNDMsIDM3XX0sXHJcbiAgICBDSEFSQUNURVJfRU5DT0RJTkdTOiB7dmFsdWU6IFsweDAzNCwgMHgxMjEsIDB4MDYxLCAweDE2MCwgMHgwMzEsIDB4MTMwLCAweDA3MCwgMHgwMjUsIDB4MTI0LCAweDA2NCwgMHgxMDksIDB4MDQ5LFxyXG4gICAgICAgIDB4MTQ4LCAweDAxOSwgMHgxMTgsIDB4MDU4LCAweDAwRCwgMHgxMEMsIDB4MDRDLCAweDAxQywgMHgxMDMsIDB4MDQzLCAweDE0MiwgMHgwMTMsIDB4MTEyLCAweDA1MiwgMHgwMDcsIDB4MTA2LFxyXG4gICAgICAgIDB4MDQ2LCAweDAxNiwgMHgxODEsIDB4MEMxLCAweDFDMCwgMHgwOTEsIDB4MTkwLCAweDBEMCwgMHgwODUsIDB4MTg0LCAweDBDNCwgMHgwOTQsIDB4MEE4LCAweDBBMiwgMHgwOEEsIDB4MDJBXHJcbiAgICBdfSxcclxuICAgIEFTVEVSSVNLOiB7dmFsdWU6IDB4MDk0fSxcclxuICAgIEZPUk1BVDoge3ZhbHVlOiBcImNvZGVfMzlcIiwgd3JpdGVhYmxlOiBmYWxzZX1cclxufTtcclxuXHJcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcclxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvZGUzOVJlYWRlcjtcclxuXHJcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX3RvQ291bnRlcnMgPSBmdW5jdGlvbihzdGFydCwgY291bnRlcikge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIG51bUNvdW50ZXJzID0gY291bnRlci5sZW5ndGgsXHJcbiAgICAgICAgZW5kID0gc2VsZi5fcm93Lmxlbmd0aCxcclxuICAgICAgICBpc1doaXRlID0gIXNlbGYuX3Jvd1tzdGFydF0sXHJcbiAgICAgICAgaSxcclxuICAgICAgICBjb3VudGVyUG9zID0gMDtcclxuXHJcbiAgICBBcnJheUhlbHBlci5pbml0KGNvdW50ZXIsIDApO1xyXG5cclxuICAgIGZvciAoIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcclxuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IG51bUNvdW50ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xyXG4gICAgICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb3VudGVyO1xyXG59O1xyXG5cclxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgY291bnRlcnMgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgcmVzdWx0ID0gW10sXHJcbiAgICAgICAgc3RhcnQgPSBzZWxmLl9maW5kU3RhcnQoKSxcclxuICAgICAgICBkZWNvZGVkQ2hhcixcclxuICAgICAgICBsYXN0U3RhcnQsXHJcbiAgICAgICAgcGF0dGVybixcclxuICAgICAgICBuZXh0U3RhcnQ7XHJcblxyXG4gICAgaWYgKCFzdGFydCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgbmV4dFN0YXJ0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3csIHN0YXJ0LmVuZCk7XHJcblxyXG4gICAgZG8ge1xyXG4gICAgICAgIGNvdW50ZXJzID0gc2VsZi5fdG9Db3VudGVycyhuZXh0U3RhcnQsIGNvdW50ZXJzKTtcclxuICAgICAgICBwYXR0ZXJuID0gc2VsZi5fdG9QYXR0ZXJuKGNvdW50ZXJzKTtcclxuICAgICAgICBpZiAocGF0dGVybiA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlY29kZWRDaGFyID0gc2VsZi5fcGF0dGVyblRvQ2hhcihwYXR0ZXJuKTtcclxuICAgICAgICBpZiAoZGVjb2RlZENoYXIgPCAwKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdC5wdXNoKGRlY29kZWRDaGFyKTtcclxuICAgICAgICBsYXN0U3RhcnQgPSBuZXh0U3RhcnQ7XHJcbiAgICAgICAgbmV4dFN0YXJ0ICs9IEFycmF5SGVscGVyLnN1bShjb3VudGVycyk7XHJcbiAgICAgICAgbmV4dFN0YXJ0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3csIG5leHRTdGFydCk7XHJcbiAgICB9IHdoaWxlIChkZWNvZGVkQ2hhciAhPT0gJyonKTtcclxuICAgIHJlc3VsdC5wb3AoKTtcclxuXHJcbiAgICBpZiAoIXJlc3VsdC5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXNlbGYuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZShsYXN0U3RhcnQsIG5leHRTdGFydCwgY291bnRlcnMpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcclxuICAgICAgICBzdGFydDogc3RhcnQuc3RhcnQsXHJcbiAgICAgICAgZW5kOiBuZXh0U3RhcnQsXHJcbiAgICAgICAgc3RhcnRJbmZvOiBzdGFydCxcclxuICAgICAgICBkZWNvZGVkQ29kZXM6IHJlc3VsdFxyXG4gICAgfTtcclxufTtcclxuXHJcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZSA9IGZ1bmN0aW9uKGxhc3RTdGFydCwgbmV4dFN0YXJ0LCBjb3VudGVycykge1xyXG4gICAgdmFyIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCxcclxuICAgICAgICBwYXR0ZXJuU2l6ZSA9IEFycmF5SGVscGVyLnN1bShjb3VudGVycyk7XHJcblxyXG4gICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kID0gbmV4dFN0YXJ0IC0gbGFzdFN0YXJ0IC0gcGF0dGVyblNpemU7XHJcbiAgICBpZiAoKHRyYWlsaW5nV2hpdGVzcGFjZUVuZCAqIDMpID49IHBhdHRlcm5TaXplKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl9wYXR0ZXJuVG9DaGFyID0gZnVuY3Rpb24ocGF0dGVybikge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHNlbGYuQ0hBUkFDVEVSX0VOQ09ESU5HUy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1NbaV0gPT09IHBhdHRlcm4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoc2VsZi5BTFBIQUJFVFtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG59O1xyXG5cclxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fZmluZE5leHRXaWR0aCA9IGZ1bmN0aW9uKGNvdW50ZXJzLCBjdXJyZW50KSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBtaW5XaWR0aCA9IE51bWJlci5NQVhfVkFMVUU7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGNvdW50ZXJzW2ldIDwgbWluV2lkdGggJiYgY291bnRlcnNbaV0gPiBjdXJyZW50KSB7XHJcbiAgICAgICAgICAgIG1pbldpZHRoID0gY291bnRlcnNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtaW5XaWR0aDtcclxufTtcclxuXHJcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX3RvUGF0dGVybiA9IGZ1bmN0aW9uKGNvdW50ZXJzKSB7XHJcbiAgICB2YXIgbnVtQ291bnRlcnMgPSBjb3VudGVycy5sZW5ndGgsXHJcbiAgICAgICAgbWF4TmFycm93V2lkdGggPSAwLFxyXG4gICAgICAgIG51bVdpZGVCYXJzID0gbnVtQ291bnRlcnMsXHJcbiAgICAgICAgd2lkZUJhcldpZHRoID0gMCxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBwYXR0ZXJuLFxyXG4gICAgICAgIGk7XHJcblxyXG4gICAgd2hpbGUgKG51bVdpZGVCYXJzID4gMykge1xyXG4gICAgICAgIG1heE5hcnJvd1dpZHRoID0gc2VsZi5fZmluZE5leHRXaWR0aChjb3VudGVycywgbWF4TmFycm93V2lkdGgpO1xyXG4gICAgICAgIG51bVdpZGVCYXJzID0gMDtcclxuICAgICAgICBwYXR0ZXJuID0gMDtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbnVtQ291bnRlcnM7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoY291bnRlcnNbaV0gPiBtYXhOYXJyb3dXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgcGF0dGVybiB8PSAxIDw8IChudW1Db3VudGVycyAtIDEgLSBpKTtcclxuICAgICAgICAgICAgICAgIG51bVdpZGVCYXJzKys7XHJcbiAgICAgICAgICAgICAgICB3aWRlQmFyV2lkdGggKz0gY291bnRlcnNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChudW1XaWRlQmFycyA9PT0gMykge1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbnVtQ291bnRlcnMgJiYgbnVtV2lkZUJhcnMgPiAwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb3VudGVyc1tpXSA+IG1heE5hcnJvd1dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtV2lkZUJhcnMtLTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGNvdW50ZXJzW2ldICogMikgPj0gd2lkZUJhcldpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHBhdHRlcm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG59O1xyXG5cclxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fZmluZFN0YXJ0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpLFxyXG4gICAgICAgIHBhdHRlcm5TdGFydCA9IG9mZnNldCxcclxuICAgICAgICBjb3VudGVyID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxyXG4gICAgICAgIGlzV2hpdGUgPSBmYWxzZSxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGosXHJcbiAgICAgICAgd2hpdGVTcGFjZU11c3RTdGFydDtcclxuXHJcbiAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcclxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBjb3VudGVyLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIC8vIGZpbmQgc3RhcnQgcGF0dGVyblxyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuX3RvUGF0dGVybihjb3VudGVyKSA9PT0gc2VsZi5BU1RFUklTSykge1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaXRlU3BhY2VNdXN0U3RhcnQgPSBNYXRoLmZsb29yKE1hdGgubWF4KDAsIHBhdHRlcm5TdGFydCAtICgoaSAtIHBhdHRlcm5TdGFydCkgLyA0KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKHdoaXRlU3BhY2VNdXN0U3RhcnQsIHBhdHRlcm5TdGFydCwgMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBwYXR0ZXJuU3RhcnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcGF0dGVyblN0YXJ0ICs9IGNvdW50ZXJbMF0gKyBjb3VudGVyWzFdO1xyXG4gICAgICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCA3OyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2pdID0gY291bnRlcltqICsgMl07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyWzddID0gMDtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJbOF0gPSAwO1xyXG4gICAgICAgICAgICAgICAgY291bnRlclBvcy0tO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xyXG4gICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb2RlMzlSZWFkZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9jb2RlXzM5X3JlYWRlci5qc1xuICoqLyIsImltcG9ydCBDb2RlMzlSZWFkZXIgZnJvbSAnLi9jb2RlXzM5X3JlYWRlcic7XHJcblxyXG5mdW5jdGlvbiBDb2RlMzlWSU5SZWFkZXIoKSB7XHJcbiAgICBDb2RlMzlSZWFkZXIuY2FsbCh0aGlzKTtcclxufVxyXG5cclxudmFyIHBhdHRlcm5zID0ge1xyXG4gICAgSU9ROiAvW0lPUV0vZyxcclxuICAgIEFaMDk6IC9bQS1aMC05XXsxN30vXHJcbn07XHJcblxyXG5Db2RlMzlWSU5SZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDb2RlMzlSZWFkZXIucHJvdG90eXBlKTtcclxuQ29kZTM5VklOUmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvZGUzOVZJTlJlYWRlcjtcclxuXHJcbi8vIENyaWJiZWQgZnJvbTpcclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3p4aW5nL3p4aW5nL2Jsb2IvbWFzdGVyL2NvcmUvc3JjL21haW4vamF2YS9jb20vZ29vZ2xlL3p4aW5nL2NsaWVudC9yZXN1bHQvVklOUmVzdWx0UGFyc2VyLmphdmFcclxuQ29kZTM5VklOUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcmVzdWx0ID0gQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlLmFwcGx5KHRoaXMpO1xyXG4gICAgaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY29kZSA9IHJlc3VsdC5jb2RlO1xyXG5cclxuICAgIGlmICghY29kZSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UocGF0dGVybnMuSU9RLCAnJyk7XHJcblxyXG4gICAgaWYgKCFjb2RlLm1hdGNoKHBhdHRlcm5zLkFaMDkpKSB7XHJcbiAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRmFpbGVkIEFaMDkgcGF0dGVybiBjb2RlOicsIGNvZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuX2NoZWNrQ2hlY2tzdW0oY29kZSkpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXN1bHQuY29kZSA9IGNvZGU7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuQ29kZTM5VklOUmVhZGVyLnByb3RvdHlwZS5fY2hlY2tDaGVja3N1bSA9IGZ1bmN0aW9uKGNvZGUpIHtcclxuICAgIC8vIFRPRE9cclxuICAgIHJldHVybiAhIWNvZGU7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb2RlMzlWSU5SZWFkZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9jb2RlXzM5X3Zpbl9yZWFkZXIuanNcbiAqKi8iLCJpbXBvcnQgQmFyY29kZVJlYWRlciBmcm9tICcuL2JhcmNvZGVfcmVhZGVyJztcclxuXHJcbmZ1bmN0aW9uIENvZGFiYXJSZWFkZXIoKSB7XHJcbiAgICBCYXJjb2RlUmVhZGVyLmNhbGwodGhpcyk7XHJcbiAgICB0aGlzLl9jb3VudGVycyA9IFtdO1xyXG59XHJcblxyXG52YXIgcHJvcGVydGllcyA9IHtcclxuICAgIEFMUEhBQkVUSF9TVFJJTkc6IHt2YWx1ZTogXCIwMTIzNDU2Nzg5LSQ6Ly4rQUJDRFwifSxcclxuICAgIEFMUEhBQkVUOiB7dmFsdWU6IFs0OCwgNDksIDUwLCA1MSwgNTIsIDUzLCA1NCwgNTUsIDU2LCA1NywgNDUsIDM2LCA1OCwgNDcsIDQ2LCA0MywgNjUsIDY2LCA2NywgNjhdfSxcclxuICAgIENIQVJBQ1RFUl9FTkNPRElOR1M6IHt2YWx1ZTogWzB4MDAzLCAweDAwNiwgMHgwMDksIDB4MDYwLCAweDAxMiwgMHgwNDIsIDB4MDIxLCAweDAyNCwgMHgwMzAsIDB4MDQ4LCAweDAwYywgMHgwMTgsXHJcbiAgICAgICAgMHgwNDUsIDB4MDUxLCAweDA1NCwgMHgwMTUsIDB4MDFBLCAweDAyOSwgMHgwMEIsIDB4MDBFXX0sXHJcbiAgICBTVEFSVF9FTkQ6IHt2YWx1ZTogWzB4MDFBLCAweDAyOSwgMHgwMEIsIDB4MDBFXX0sXHJcbiAgICBNSU5fRU5DT0RFRF9DSEFSUzoge3ZhbHVlOiA0fSxcclxuICAgIE1BWF9BQ0NFUFRBQkxFOiB7dmFsdWU6IDIuMH0sXHJcbiAgICBQQURESU5HOiB7dmFsdWU6IDEuNX0sXHJcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJjb2RhYmFyXCIsIHdyaXRlYWJsZTogZmFsc2V9XHJcbn07XHJcblxyXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFyY29kZVJlYWRlci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xyXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvZGFiYXJSZWFkZXI7XHJcblxyXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgcmVzdWx0ID0gW10sXHJcbiAgICAgICAgc3RhcnQsXHJcbiAgICAgICAgZGVjb2RlZENoYXIsXHJcbiAgICAgICAgcGF0dGVybixcclxuICAgICAgICBuZXh0U3RhcnQsXHJcbiAgICAgICAgZW5kO1xyXG5cclxuICAgIHRoaXMuX2NvdW50ZXJzID0gc2VsZi5fZmlsbENvdW50ZXJzKCk7XHJcbiAgICBzdGFydCA9IHNlbGYuX2ZpbmRTdGFydCgpO1xyXG4gICAgaWYgKCFzdGFydCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgbmV4dFN0YXJ0ID0gc3RhcnQuc3RhcnRDb3VudGVyO1xyXG5cclxuICAgIGRvIHtcclxuICAgICAgICBwYXR0ZXJuID0gc2VsZi5fdG9QYXR0ZXJuKG5leHRTdGFydCk7XHJcbiAgICAgICAgaWYgKHBhdHRlcm4gPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWNvZGVkQ2hhciA9IHNlbGYuX3BhdHRlcm5Ub0NoYXIocGF0dGVybik7XHJcbiAgICAgICAgaWYgKGRlY29kZWRDaGFyIDwgMCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQucHVzaChkZWNvZGVkQ2hhcik7XHJcbiAgICAgICAgbmV4dFN0YXJ0ICs9IDg7XHJcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAxICYmIHNlbGYuX2lzU3RhcnRFbmQocGF0dGVybikpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSB3aGlsZSAobmV4dFN0YXJ0IDwgc2VsZi5fY291bnRlcnMubGVuZ3RoKTtcclxuXHJcbiAgICAvLyB2ZXJpZnkgZW5kXHJcbiAgICBpZiAoKHJlc3VsdC5sZW5ndGggLSAyKSA8IHNlbGYuTUlOX0VOQ09ERURfQ0hBUlMgfHwgIXNlbGYuX2lzU3RhcnRFbmQocGF0dGVybikpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyB2ZXJpZnkgZW5kIHdoaXRlIHNwYWNlXHJcbiAgICBpZiAoIXNlbGYuX3ZlcmlmeVdoaXRlc3BhY2Uoc3RhcnQuc3RhcnRDb3VudGVyLCBuZXh0U3RhcnQgLSA4KSl7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFzZWxmLl92YWxpZGF0ZVJlc3VsdChyZXN1bHQsIHN0YXJ0LnN0YXJ0Q291bnRlcikpe1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIG5leHRTdGFydCA9IG5leHRTdGFydCA+IHNlbGYuX2NvdW50ZXJzLmxlbmd0aCA/IHNlbGYuX2NvdW50ZXJzLmxlbmd0aCA6IG5leHRTdGFydDtcclxuICAgIGVuZCA9IHN0YXJ0LnN0YXJ0ICsgc2VsZi5fc3VtQ291bnRlcnMoc3RhcnQuc3RhcnRDb3VudGVyLCBuZXh0U3RhcnQgLSA4KTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvZGU6IHJlc3VsdC5qb2luKFwiXCIpLFxyXG4gICAgICAgIHN0YXJ0OiBzdGFydC5zdGFydCxcclxuICAgICAgICBlbmQ6IGVuZCxcclxuICAgICAgICBzdGFydEluZm86IHN0YXJ0LFxyXG4gICAgICAgIGRlY29kZWRDb2RlczogcmVzdWx0XHJcbiAgICB9O1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeVdoaXRlc3BhY2UgPSBmdW5jdGlvbihzdGFydENvdW50ZXIsIGVuZENvdW50ZXIpIHtcclxuICAgIGlmICgoc3RhcnRDb3VudGVyIC0gMSA8PSAwKVxyXG4gICAgICAgICAgICB8fCB0aGlzLl9jb3VudGVyc1tzdGFydENvdW50ZXIgLSAxXSA+PSAodGhpcy5fY2FsY3VsYXRlUGF0dGVybkxlbmd0aChzdGFydENvdW50ZXIpIC8gMi4wKSkge1xyXG4gICAgICAgIGlmICgoZW5kQ291bnRlciArIDggPj0gdGhpcy5fY291bnRlcnMubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5fY291bnRlcnNbZW5kQ291bnRlciArIDddID49ICh0aGlzLl9jYWxjdWxhdGVQYXR0ZXJuTGVuZ3RoKGVuZENvdW50ZXIpIC8gMi4wKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fY2FsY3VsYXRlUGF0dGVybkxlbmd0aCA9IGZ1bmN0aW9uKG9mZnNldCkge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc3VtID0gMDtcclxuXHJcbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBvZmZzZXQgKyA3OyBpKyspIHtcclxuICAgICAgICBzdW0gKz0gdGhpcy5fY291bnRlcnNbaV07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN1bTtcclxufTtcclxuXHJcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl90aHJlc2hvbGRSZXN1bHRQYXR0ZXJuID0gZnVuY3Rpb24ocmVzdWx0LCBzdGFydENvdW50ZXIpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGNhdGVnb3JpemF0aW9uID0ge1xyXG4gICAgICAgICAgICBzcGFjZToge1xyXG4gICAgICAgICAgICAgICAgbmFycm93OiB7IHNpemU6IDAsIGNvdW50czogMCwgbWluOiAwLCBtYXg6IE51bWJlci5NQVhfVkFMVUV9LFxyXG4gICAgICAgICAgICAgICAgd2lkZToge3NpemU6IDAsIGNvdW50czogMCwgbWluOiAwLCBtYXg6IE51bWJlci5NQVhfVkFMVUV9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJhcjoge1xyXG4gICAgICAgICAgICAgICAgbmFycm93OiB7IHNpemU6IDAsIGNvdW50czogMCwgbWluOiAwLCBtYXg6IE51bWJlci5NQVhfVkFMVUV9LFxyXG4gICAgICAgICAgICAgICAgd2lkZTogeyBzaXplOiAwLCBjb3VudHM6IDAsIG1pbjogMCwgbWF4OiBOdW1iZXIuTUFYX1ZBTFVFfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBraW5kLFxyXG4gICAgICAgIGNhdCxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGosXHJcbiAgICAgICAgcG9zID0gc3RhcnRDb3VudGVyLFxyXG4gICAgICAgIHBhdHRlcm47XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgcGF0dGVybiA9IHNlbGYuX2NoYXJUb1BhdHRlcm4ocmVzdWx0W2ldKTtcclxuICAgICAgICBmb3IgKGogPSA2OyBqID49IDA7IGotLSkge1xyXG4gICAgICAgICAgICBraW5kID0gKGogJiAxKSA9PT0gMiA/IGNhdGVnb3JpemF0aW9uLmJhciA6IGNhdGVnb3JpemF0aW9uLnNwYWNlO1xyXG4gICAgICAgICAgICBjYXQgPSAocGF0dGVybiAmIDEpID09PSAxID8ga2luZC53aWRlIDoga2luZC5uYXJyb3c7XHJcbiAgICAgICAgICAgIGNhdC5zaXplICs9IHNlbGYuX2NvdW50ZXJzW3BvcyArIGpdO1xyXG4gICAgICAgICAgICBjYXQuY291bnRzKys7XHJcbiAgICAgICAgICAgIHBhdHRlcm4gPj49IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBvcyArPSA4O1xyXG4gICAgfVxyXG5cclxuICAgIFtcInNwYWNlXCIsIFwiYmFyXCJdLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgdmFyIG5ld2tpbmQgPSBjYXRlZ29yaXphdGlvbltrZXldO1xyXG4gICAgICAgIG5ld2tpbmQud2lkZS5taW4gPVxyXG4gICAgICAgICAgICBNYXRoLmZsb29yKChuZXdraW5kLm5hcnJvdy5zaXplIC8gbmV3a2luZC5uYXJyb3cuY291bnRzICsgbmV3a2luZC53aWRlLnNpemUgLyBuZXdraW5kLndpZGUuY291bnRzKSAvIDIpO1xyXG4gICAgICAgIG5ld2tpbmQubmFycm93Lm1heCA9IE1hdGguY2VpbChuZXdraW5kLndpZGUubWluKTtcclxuICAgICAgICBuZXdraW5kLndpZGUubWF4ID0gTWF0aC5jZWlsKChuZXdraW5kLndpZGUuc2l6ZSAqIHNlbGYuTUFYX0FDQ0VQVEFCTEUgKyBzZWxmLlBBRERJTkcpIC8gbmV3a2luZC53aWRlLmNvdW50cyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gY2F0ZWdvcml6YXRpb247XHJcbn07XHJcblxyXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fY2hhclRvUGF0dGVybiA9IGZ1bmN0aW9uKGNoYXIpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBjaGFyQ29kZSA9IGNoYXIuY2hhckNvZGVBdCgwKSxcclxuICAgICAgICBpO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBzZWxmLkFMUEhBQkVULmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuQUxQSEFCRVRbaV0gPT09IGNoYXJDb2RlKXtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGYuQ0hBUkFDVEVSX0VOQ09ESU5HU1tpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gMHgwO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX3ZhbGlkYXRlUmVzdWx0ID0gZnVuY3Rpb24ocmVzdWx0LCBzdGFydENvdW50ZXIpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICB0aHJlc2hvbGRzID0gc2VsZi5fdGhyZXNob2xkUmVzdWx0UGF0dGVybihyZXN1bHQsIHN0YXJ0Q291bnRlciksXHJcbiAgICAgICAgaSxcclxuICAgICAgICBqLFxyXG4gICAgICAgIGtpbmQsXHJcbiAgICAgICAgY2F0LFxyXG4gICAgICAgIHNpemUsXHJcbiAgICAgICAgcG9zID0gc3RhcnRDb3VudGVyLFxyXG4gICAgICAgIHBhdHRlcm47XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHBhdHRlcm4gPSBzZWxmLl9jaGFyVG9QYXR0ZXJuKHJlc3VsdFtpXSk7XHJcbiAgICAgICAgZm9yIChqID0gNjsgaiA+PSAwOyBqLS0pIHtcclxuICAgICAgICAgICAga2luZCA9IChqICYgMSkgPT09IDAgPyB0aHJlc2hvbGRzLmJhciA6IHRocmVzaG9sZHMuc3BhY2U7XHJcbiAgICAgICAgICAgIGNhdCA9IChwYXR0ZXJuICYgMSkgPT09IDEgPyBraW5kLndpZGUgOiBraW5kLm5hcnJvdztcclxuICAgICAgICAgICAgc2l6ZSA9IHNlbGYuX2NvdW50ZXJzW3BvcyArIGpdO1xyXG4gICAgICAgICAgICBpZiAoc2l6ZSA8IGNhdC5taW4gfHwgc2l6ZSA+IGNhdC5tYXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwYXR0ZXJuID4+PSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwb3MgKz0gODtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX3BhdHRlcm5Ub0NoYXIgPSBmdW5jdGlvbihwYXR0ZXJuKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBzZWxmID0gdGhpcztcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgc2VsZi5DSEFSQUNURVJfRU5DT0RJTkdTLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuQ0hBUkFDVEVSX0VOQ09ESU5HU1tpXSA9PT0gcGF0dGVybikge1xyXG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShzZWxmLkFMUEhBQkVUW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLTE7XHJcbn07XHJcblxyXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fY29tcHV0ZUFsdGVybmF0aW5nVGhyZXNob2xkID0gZnVuY3Rpb24ob2Zmc2V0LCBlbmQpIHtcclxuICAgIHZhciBpLFxyXG4gICAgICAgIG1pbiA9IE51bWJlci5NQVhfVkFMVUUsXHJcbiAgICAgICAgbWF4ID0gMCxcclxuICAgICAgICBjb3VudGVyO1xyXG5cclxuICAgIGZvciAoaSA9IG9mZnNldDsgaSA8IGVuZDsgaSArPSAyKXtcclxuICAgICAgICBjb3VudGVyID0gdGhpcy5fY291bnRlcnNbaV07XHJcbiAgICAgICAgaWYgKGNvdW50ZXIgPiBtYXgpIHtcclxuICAgICAgICAgICAgbWF4ID0gY291bnRlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvdW50ZXIgPCBtaW4pIHtcclxuICAgICAgICAgICAgbWluID0gY291bnRlcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICgobWluICsgbWF4KSAvIDIuMCkgfCAwO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX3RvUGF0dGVybiA9IGZ1bmN0aW9uKG9mZnNldCkge1xyXG4gICAgdmFyIG51bUNvdW50ZXJzID0gNyxcclxuICAgICAgICBlbmQgPSBvZmZzZXQgKyBudW1Db3VudGVycyxcclxuICAgICAgICBiYXJUaHJlc2hvbGQsXHJcbiAgICAgICAgc3BhY2VUaHJlc2hvbGQsXHJcbiAgICAgICAgYml0bWFzayA9IDEgPDwgKG51bUNvdW50ZXJzIC0gMSksXHJcbiAgICAgICAgcGF0dGVybiA9IDAsXHJcbiAgICAgICAgaSxcclxuICAgICAgICB0aHJlc2hvbGQ7XHJcblxyXG4gICAgaWYgKGVuZCA+IHRoaXMuX2NvdW50ZXJzLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICBiYXJUaHJlc2hvbGQgPSB0aGlzLl9jb21wdXRlQWx0ZXJuYXRpbmdUaHJlc2hvbGQob2Zmc2V0LCBlbmQpO1xyXG4gICAgc3BhY2VUaHJlc2hvbGQgPSB0aGlzLl9jb21wdXRlQWx0ZXJuYXRpbmdUaHJlc2hvbGQob2Zmc2V0ICsgMSwgZW5kKTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbnVtQ291bnRlcnM7IGkrKyl7XHJcbiAgICAgICAgdGhyZXNob2xkID0gKGkgJiAxKSA9PT0gMCA/IGJhclRocmVzaG9sZCA6IHNwYWNlVGhyZXNob2xkO1xyXG4gICAgICAgIGlmICh0aGlzLl9jb3VudGVyc1tvZmZzZXQgKyBpXSA+IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICBwYXR0ZXJuIHw9IGJpdG1hc2s7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJpdG1hc2sgPj49IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBhdHRlcm47XHJcbn07XHJcblxyXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5faXNTdGFydEVuZCA9IGZ1bmN0aW9uKHBhdHRlcm4pIHtcclxuICAgIHZhciBpO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLlNUQVJUX0VORC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICh0aGlzLlNUQVJUX0VORFtpXSA9PT0gcGF0dGVybikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fc3VtQ291bnRlcnMgPSBmdW5jdGlvbihzdGFydCwgZW5kKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBzdW0gPSAwO1xyXG5cclxuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcclxuICAgICAgICBzdW0gKz0gdGhpcy5fY291bnRlcnNbaV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VtO1xyXG59O1xyXG5cclxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2ZpbmRTdGFydCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgcGF0dGVybixcclxuICAgICAgICBzdGFydCA9IHNlbGYuX25leHRVbnNldChzZWxmLl9yb3cpLFxyXG4gICAgICAgIGVuZDtcclxuXHJcbiAgICBmb3IgKGkgPSAxOyBpIDwgdGhpcy5fY291bnRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwYXR0ZXJuID0gc2VsZi5fdG9QYXR0ZXJuKGkpO1xyXG4gICAgICAgIGlmIChwYXR0ZXJuICE9PSAtMSAmJiBzZWxmLl9pc1N0YXJ0RW5kKHBhdHRlcm4pKSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IExvb2sgZm9yIHdoaXRlc3BhY2UgYWhlYWRcclxuICAgICAgICAgICAgc3RhcnQgKz0gc2VsZi5fc3VtQ291bnRlcnMoMCwgaSk7XHJcbiAgICAgICAgICAgIGVuZCA9IHN0YXJ0ICsgc2VsZi5fc3VtQ291bnRlcnMoaSwgaSArIDgpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxyXG4gICAgICAgICAgICAgICAgZW5kOiBlbmQsXHJcbiAgICAgICAgICAgICAgICBzdGFydENvdW50ZXI6IGksXHJcbiAgICAgICAgICAgICAgICBlbmRDb3VudGVyOiBpICsgOFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvZGFiYXJSZWFkZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL3JlYWRlci9jb2RhYmFyX3JlYWRlci5qc1xuICoqLyIsImltcG9ydCBFQU5SZWFkZXIgZnJvbSAnLi9lYW5fcmVhZGVyJztcclxuXHJcbmZ1bmN0aW9uIFVQQ1JlYWRlcigpIHtcclxuICAgIEVBTlJlYWRlci5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG52YXIgcHJvcGVydGllcyA9IHtcclxuICAgIEZPUk1BVDoge3ZhbHVlOiBcInVwY19hXCIsIHdyaXRlYWJsZTogZmFsc2V9XHJcbn07XHJcblxyXG5VUENSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFQU5SZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcclxuVVBDUmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFVQQ1JlYWRlcjtcclxuXHJcblVQQ1JlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHJlc3VsdCA9IEVBTlJlYWRlci5wcm90b3R5cGUuX2RlY29kZS5jYWxsKHRoaXMpO1xyXG5cclxuICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LmNvZGUgJiYgcmVzdWx0LmNvZGUubGVuZ3RoID09PSAxMyAmJiByZXN1bHQuY29kZS5jaGFyQXQoMCkgPT09IFwiMFwiKSB7XHJcbiAgICAgICAgcmVzdWx0LmNvZGUgPSByZXN1bHQuY29kZS5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVVBDUmVhZGVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvdXBjX3JlYWRlci5qc1xuICoqLyIsImltcG9ydCBFQU5SZWFkZXIgZnJvbSAnLi9lYW5fcmVhZGVyJztcclxuXHJcbmZ1bmN0aW9uIEVBTjhSZWFkZXIoKSB7XHJcbiAgICBFQU5SZWFkZXIuY2FsbCh0aGlzKTtcclxufVxyXG5cclxudmFyIHByb3BlcnRpZXMgPSB7XHJcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJlYW5fOFwiLCB3cml0ZWFibGU6IGZhbHNlfVxyXG59O1xyXG5cclxuRUFOOFJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVBTlJlYWRlci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xyXG5FQU44UmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEVBTjhSZWFkZXI7XHJcblxyXG5FQU44UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlUGF5bG9hZCA9IGZ1bmN0aW9uKGNvZGUsIHJlc3VsdCwgZGVjb2RlZENvZGVzKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBzZWxmID0gdGhpcztcclxuXHJcbiAgICBmb3IgKCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kLCBzZWxmLkNPREVfR19TVEFSVCk7XHJcbiAgICAgICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUpO1xyXG4gICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvZGUgPSBzZWxmLl9maW5kUGF0dGVybihzZWxmLk1JRERMRV9QQVRURVJOLCBjb2RlLmVuZCwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgaWYgKGNvZGUgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgY29kZSA9IHNlbGYuX2RlY29kZUNvZGUoY29kZS5lbmQsIHNlbGYuQ09ERV9HX1NUQVJUKTtcclxuICAgICAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xyXG4gICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvZGU7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFQU44UmVhZGVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvZWFuXzhfcmVhZGVyLmpzXG4gKiovIiwiaW1wb3J0IEVBTlJlYWRlciBmcm9tICcuL2Vhbl9yZWFkZXInO1xyXG5cclxuZnVuY3Rpb24gVVBDRVJlYWRlcigpIHtcclxuICAgIEVBTlJlYWRlci5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG52YXIgcHJvcGVydGllcyA9IHtcclxuICAgIENPREVfRlJFUVVFTkNZOiB7dmFsdWU6IFtcclxuICAgICAgICBbIDU2LCA1MiwgNTAsIDQ5LCA0NCwgMzgsIDM1LCA0MiwgNDEsIDM3IF0sXHJcbiAgICAgICAgWzcsIDExLCAxMywgMTQsIDE5LCAyNSwgMjgsIDIxLCAyMiwgMjZdXX0sXHJcbiAgICBTVE9QX1BBVFRFUk46IHsgdmFsdWU6IFsxIC8gNiAqIDcsIDEgLyA2ICogNywgMSAvIDYgKiA3LCAxIC8gNiAqIDcsIDEgLyA2ICogNywgMSAvIDYgKiA3XX0sXHJcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJ1cGNfZVwiLCB3cml0ZWFibGU6IGZhbHNlfVxyXG59O1xyXG5cclxuVVBDRVJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVBTlJlYWRlci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xyXG5VUENFUmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFVQQ0VSZWFkZXI7XHJcblxyXG5VUENFUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlUGF5bG9hZCA9IGZ1bmN0aW9uKGNvZGUsIHJlc3VsdCwgZGVjb2RlZENvZGVzKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBjb2RlRnJlcXVlbmN5ID0gMHgwO1xyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAgICAgY29kZSA9IHNlbGYuX2RlY29kZUNvZGUoY29kZS5lbmQpO1xyXG4gICAgICAgIGlmICghY29kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvZGUuY29kZSA+PSBzZWxmLkNPREVfR19TVEFSVCkge1xyXG4gICAgICAgICAgICBjb2RlLmNvZGUgPSBjb2RlLmNvZGUgLSBzZWxmLkNPREVfR19TVEFSVDtcclxuICAgICAgICAgICAgY29kZUZyZXF1ZW5jeSB8PSAxIDw8ICg1IC0gaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSk7XHJcbiAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXNlbGYuX2RldGVybWluZVBhcml0eShjb2RlRnJlcXVlbmN5LCByZXN1bHQpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvZGU7XHJcbn07XHJcblxyXG5VUENFUmVhZGVyLnByb3RvdHlwZS5fZGV0ZXJtaW5lUGFyaXR5ID0gZnVuY3Rpb24oY29kZUZyZXF1ZW5jeSwgcmVzdWx0KSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBuclN5c3RlbTtcclxuXHJcbiAgICBmb3IgKG5yU3lzdGVtID0gMDsgbnJTeXN0ZW0gPCB0aGlzLkNPREVfRlJFUVVFTkNZLmxlbmd0aDsgbnJTeXN0ZW0rKyl7XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCB0aGlzLkNPREVfRlJFUVVFTkNZW25yU3lzdGVtXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoY29kZUZyZXF1ZW5jeSA9PT0gdGhpcy5DT0RFX0ZSRVFVRU5DWVtuclN5c3RlbV1baV0pIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC51bnNoaWZ0KG5yU3lzdGVtKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5VUENFUmVhZGVyLnByb3RvdHlwZS5fY29udmVydFRvVVBDQSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgdmFyIHVwY2EgPSBbcmVzdWx0WzBdXSxcclxuICAgICAgICBsYXN0RGlnaXQgPSByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDJdO1xyXG5cclxuICAgIGlmIChsYXN0RGlnaXQgPD0gMikge1xyXG4gICAgICAgIHVwY2EgPSB1cGNhLmNvbmNhdChyZXN1bHQuc2xpY2UoMSwgMykpXHJcbiAgICAgICAgICAgIC5jb25jYXQoW2xhc3REaWdpdCwgMCwgMCwgMCwgMF0pXHJcbiAgICAgICAgICAgIC5jb25jYXQocmVzdWx0LnNsaWNlKDMsIDYpKTtcclxuICAgIH0gZWxzZSBpZiAobGFzdERpZ2l0ID09PSAzKSB7XHJcbiAgICAgICAgdXBjYSA9IHVwY2EuY29uY2F0KHJlc3VsdC5zbGljZSgxLCA0KSlcclxuICAgICAgICAgICAgLmNvbmNhdChbMCwgMCwgMCwgMCwgMF0pXHJcbiAgICAgICAgICAgIC5jb25jYXQocmVzdWx0LnNsaWNlKDQsIDYpKTtcclxuICAgIH0gZWxzZSBpZiAobGFzdERpZ2l0ID09PSA0KSB7XHJcbiAgICAgICAgdXBjYSA9IHVwY2EuY29uY2F0KHJlc3VsdC5zbGljZSgxLCA1KSlcclxuICAgICAgICAgICAgLmNvbmNhdChbMCwgMCwgMCwgMCwgMCwgcmVzdWx0WzVdXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHVwY2EgPSB1cGNhLmNvbmNhdChyZXN1bHQuc2xpY2UoMSwgNikpXHJcbiAgICAgICAgICAgIC5jb25jYXQoWzAsIDAsIDAsIDAsIGxhc3REaWdpdF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwY2EucHVzaChyZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdKTtcclxuICAgIHJldHVybiB1cGNhO1xyXG59O1xyXG5cclxuVVBDRVJlYWRlci5wcm90b3R5cGUuX2NoZWNrc3VtID0gZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICByZXR1cm4gRUFOUmVhZGVyLnByb3RvdHlwZS5fY2hlY2tzdW0uY2FsbCh0aGlzLCB0aGlzLl9jb252ZXJ0VG9VUENBKHJlc3VsdCkpO1xyXG59O1xyXG5cclxuVVBDRVJlYWRlci5wcm90b3R5cGUuX2ZpbmRFbmQgPSBmdW5jdGlvbihvZmZzZXQsIGlzV2hpdGUpIHtcclxuICAgIGlzV2hpdGUgPSB0cnVlO1xyXG4gICAgcmV0dXJuIEVBTlJlYWRlci5wcm90b3R5cGUuX2ZpbmRFbmQuY2FsbCh0aGlzLCBvZmZzZXQsIGlzV2hpdGUpO1xyXG59O1xyXG5cclxuVVBDRVJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZSA9IGZ1bmN0aW9uKGVuZEluZm8pIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICB0cmFpbGluZ1doaXRlc3BhY2VFbmQ7XHJcblxyXG4gICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kID0gZW5kSW5mby5lbmQgKyAoKGVuZEluZm8uZW5kIC0gZW5kSW5mby5zdGFydCkgLyAyKTtcclxuICAgIGlmICh0cmFpbGluZ1doaXRlc3BhY2VFbmQgPCBzZWxmLl9yb3cubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UoZW5kSW5mby5lbmQsIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCwgMCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVuZEluZm87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVVBDRVJlYWRlcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvcmVhZGVyL3VwY19lX3JlYWRlci5qc1xuICoqLyIsImltcG9ydCBCYXJjb2RlUmVhZGVyIGZyb20gJy4vYmFyY29kZV9yZWFkZXInO1xyXG5jb25zdCBtZXJnZSA9IHJlcXVpcmUoJ2xvZGFzaC9vYmplY3QvbWVyZ2UnKTtcclxuXHJcbmZ1bmN0aW9uIEkyb2Y1UmVhZGVyKG9wdHMpIHtcclxuICAgIG9wdHMgPSBtZXJnZShnZXREZWZhdWxDb25maWcoKSwgb3B0cyk7XHJcbiAgICBCYXJjb2RlUmVhZGVyLmNhbGwodGhpcywgb3B0cyk7XHJcbiAgICB0aGlzLmJhclNwYWNlUmF0aW8gPSBbMSwgMV07XHJcbiAgICBpZiAob3B0cy5ub3JtYWxpemVCYXJTcGFjZVdpZHRoKSB7XHJcbiAgICAgICAgdGhpcy5TSU5HTEVfQ09ERV9FUlJPUiA9IDAuMzg7XHJcbiAgICAgICAgdGhpcy5BVkdfQ09ERV9FUlJPUiA9IDAuMDk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERlZmF1bENvbmZpZygpIHtcclxuICAgIHZhciBjb25maWcgPSB7fTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhJMm9mNVJlYWRlci5DT05GSUdfS0VZUykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICBjb25maWdba2V5XSA9IEkyb2Y1UmVhZGVyLkNPTkZJR19LRVlTW2tleV0uZGVmYXVsdDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNvbmZpZztcclxufVxyXG5cclxudmFyIE4gPSAxLFxyXG4gICAgVyA9IDMsXHJcbiAgICBwcm9wZXJ0aWVzID0ge1xyXG4gICAgICAgIE1PRFVMTzoge3ZhbHVlOiAxMH0sXHJcbiAgICAgICAgU1RBUlRfUEFUVEVSTjoge3ZhbHVlOiBbTiAqIDIuNSwgTiAqIDIuNSwgTiAqIDIuNSwgTiAqIDIuNV19LFxyXG4gICAgICAgIFNUT1BfUEFUVEVSTjoge3ZhbHVlOiBbTiAqIDIsIE4gKiAyLCBXICogMl19LFxyXG4gICAgICAgIENPREVfUEFUVEVSTjoge3ZhbHVlOiBbXHJcbiAgICAgICAgICAgIFtOLCBOLCBXLCBXLCBOXSxcclxuICAgICAgICAgICAgW1csIE4sIE4sIE4sIFddLFxyXG4gICAgICAgICAgICBbTiwgVywgTiwgTiwgV10sXHJcbiAgICAgICAgICAgIFtXLCBXLCBOLCBOLCBOXSxcclxuICAgICAgICAgICAgW04sIE4sIFcsIE4sIFddLFxyXG4gICAgICAgICAgICBbVywgTiwgVywgTiwgTl0sXHJcbiAgICAgICAgICAgIFtOLCBXLCBXLCBOLCBOXSxcclxuICAgICAgICAgICAgW04sIE4sIE4sIFcsIFddLFxyXG4gICAgICAgICAgICBbVywgTiwgTiwgVywgTl0sXHJcbiAgICAgICAgICAgIFtOLCBXLCBOLCBXLCBOXVxyXG4gICAgICAgIF19LFxyXG4gICAgICAgIFNJTkdMRV9DT0RFX0VSUk9SOiB7dmFsdWU6IDAuNzgsIHdyaXRhYmxlOiB0cnVlfSxcclxuICAgICAgICBBVkdfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjM4LCB3cml0YWJsZTogdHJ1ZX0sXHJcbiAgICAgICAgTUFYX0NPUlJFQ1RJT05fRkFDVE9SOiB7dmFsdWU6IDV9LFxyXG4gICAgICAgIEZPUk1BVDoge3ZhbHVlOiBcImkyb2Y1XCJ9XHJcbiAgICB9O1xyXG5cclxuSTJvZjVSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEkyb2Y1UmVhZGVyO1xyXG5cclxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9tYXRjaFBhdHRlcm4gPSBmdW5jdGlvbihjb3VudGVyLCBjb2RlKSB7XHJcbiAgICBpZiAodGhpcy5jb25maWcubm9ybWFsaXplQmFyU3BhY2VXaWR0aCkge1xyXG4gICAgICAgIHZhciBpLFxyXG4gICAgICAgICAgICBjb3VudGVyU3VtID0gWzAsIDBdLFxyXG4gICAgICAgICAgICBjb2RlU3VtID0gWzAsIDBdLFxyXG4gICAgICAgICAgICBjb3JyZWN0aW9uID0gWzAsIDBdLFxyXG4gICAgICAgICAgICBjb3JyZWN0aW9uUmF0aW8gPSB0aGlzLk1BWF9DT1JSRUNUSU9OX0ZBQ1RPUixcclxuICAgICAgICAgICAgY29ycmVjdGlvblJhdGlvSW52ZXJzZSA9IDEgLyBjb3JyZWN0aW9uUmF0aW87XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJTdW1baSAlIDJdICs9IGNvdW50ZXJbaV07XHJcbiAgICAgICAgICAgIGNvZGVTdW1baSAlIDJdICs9IGNvZGVbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvcnJlY3Rpb25bMF0gPSBjb2RlU3VtWzBdIC8gY291bnRlclN1bVswXTtcclxuICAgICAgICBjb3JyZWN0aW9uWzFdID0gY29kZVN1bVsxXSAvIGNvdW50ZXJTdW1bMV07XHJcblxyXG4gICAgICAgIGNvcnJlY3Rpb25bMF0gPSBNYXRoLm1heChNYXRoLm1pbihjb3JyZWN0aW9uWzBdLCBjb3JyZWN0aW9uUmF0aW8pLCBjb3JyZWN0aW9uUmF0aW9JbnZlcnNlKTtcclxuICAgICAgICBjb3JyZWN0aW9uWzFdID0gTWF0aC5tYXgoTWF0aC5taW4oY29ycmVjdGlvblsxXSwgY29ycmVjdGlvblJhdGlvKSwgY29ycmVjdGlvblJhdGlvSW52ZXJzZSk7XHJcbiAgICAgICAgdGhpcy5iYXJTcGFjZVJhdGlvID0gY29ycmVjdGlvbjtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb3VudGVyW2ldICo9IHRoaXMuYmFyU3BhY2VSYXRpb1tpICUgMl07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9tYXRjaFBhdHRlcm4uY2FsbCh0aGlzLCBjb3VudGVyLCBjb2RlKTtcclxufTtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fZmluZFBhdHRlcm4gPSBmdW5jdGlvbihwYXR0ZXJuLCBvZmZzZXQsIGlzV2hpdGUsIHRyeUhhcmRlcikge1xyXG4gICAgdmFyIGNvdW50ZXIgPSBbXSxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxyXG4gICAgICAgIGJlc3RNYXRjaCA9IHtcclxuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXHJcbiAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICBzdGFydDogMCxcclxuICAgICAgICAgICAgZW5kOiAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcixcclxuICAgICAgICBqLFxyXG4gICAgICAgIHN1bSxcclxuICAgICAgICBub3JtYWxpemVkLFxyXG4gICAgICAgIGVwc2lsb24gPSBzZWxmLkFWR19DT0RFX0VSUk9SO1xyXG5cclxuICAgIGlzV2hpdGUgPSBpc1doaXRlIHx8IGZhbHNlO1xyXG4gICAgdHJ5SGFyZGVyID0gdHJ5SGFyZGVyIHx8IGZhbHNlO1xyXG5cclxuICAgIGlmICghb2Zmc2V0KSB7XHJcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIGkgPSAwOyBpIDwgcGF0dGVybi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvdW50ZXJbaV0gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgc3VtID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgY291bnRlci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBjb3VudGVyW2pdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZCA9IHNlbGYuX25vcm1hbGl6ZShjb3VudGVyKTtcclxuICAgICAgICAgICAgICAgIGlmIChub3JtYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4obm9ybWFsaXplZCwgcGF0dGVybik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciA8IGVwc2lsb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5zdGFydCA9IGkgLSBzdW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0cnlIYXJkZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgY291bnRlci5sZW5ndGggLSAyOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcltqXSA9IGNvdW50ZXJbaiArIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXIubGVuZ3RoIC0gMl0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlci5sZW5ndGggLSAxXSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlclBvcy0tO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcclxuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9maW5kU3RhcnQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0LFxyXG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KSxcclxuICAgICAgICBzdGFydEluZm8sXHJcbiAgICAgICAgbmFycm93QmFyV2lkdGggPSAxO1xyXG5cclxuICAgIHdoaWxlICghc3RhcnRJbmZvKSB7XHJcbiAgICAgICAgc3RhcnRJbmZvID0gc2VsZi5fZmluZFBhdHRlcm4oc2VsZi5TVEFSVF9QQVRURVJOLCBvZmZzZXQsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICBpZiAoIXN0YXJ0SW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmFycm93QmFyV2lkdGggPSBNYXRoLmZsb29yKChzdGFydEluZm8uZW5kIC0gc3RhcnRJbmZvLnN0YXJ0KSAvIDQpO1xyXG4gICAgICAgIGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQgPSBzdGFydEluZm8uc3RhcnQgLSBuYXJyb3dCYXJXaWR0aCAqIDEwO1xyXG4gICAgICAgIGlmIChsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0ID49IDApIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UobGVhZGluZ1doaXRlc3BhY2VTdGFydCwgc3RhcnRJbmZvLnN0YXJ0LCAwKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXJ0SW5mbztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBvZmZzZXQgPSBzdGFydEluZm8uZW5kO1xyXG4gICAgICAgIHN0YXJ0SW5mbyA9IG51bGw7XHJcbiAgICB9XHJcbn07XHJcblxyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZSA9IGZ1bmN0aW9uKGVuZEluZm8pIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICB0cmFpbGluZ1doaXRlc3BhY2VFbmQ7XHJcblxyXG4gICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kID0gZW5kSW5mby5lbmQgKyAoKGVuZEluZm8uZW5kIC0gZW5kSW5mby5zdGFydCkgLyAyKTtcclxuICAgIGlmICh0cmFpbGluZ1doaXRlc3BhY2VFbmQgPCBzZWxmLl9yb3cubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UoZW5kSW5mby5lbmQsIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCwgMCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVuZEluZm87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2ZpbmRFbmQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBlbmRJbmZvLFxyXG4gICAgICAgIHRtcDtcclxuXHJcbiAgICBzZWxmLl9yb3cucmV2ZXJzZSgpO1xyXG4gICAgZW5kSW5mbyA9IHNlbGYuX2ZpbmRQYXR0ZXJuKHNlbGYuU1RPUF9QQVRURVJOKTtcclxuICAgIHNlbGYuX3Jvdy5yZXZlcnNlKCk7XHJcblxyXG4gICAgaWYgKGVuZEluZm8gPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyByZXZlcnNlIG51bWJlcnNcclxuICAgIHRtcCA9IGVuZEluZm8uc3RhcnQ7XHJcbiAgICBlbmRJbmZvLnN0YXJ0ID0gc2VsZi5fcm93Lmxlbmd0aCAtIGVuZEluZm8uZW5kO1xyXG4gICAgZW5kSW5mby5lbmQgPSBzZWxmLl9yb3cubGVuZ3RoIC0gdG1wO1xyXG5cclxuICAgIHJldHVybiBlbmRJbmZvICE9PSBudWxsID8gc2VsZi5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlKGVuZEluZm8pIDogbnVsbDtcclxufTtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlUGFpciA9IGZ1bmN0aW9uKGNvdW50ZXJQYWlyKSB7XHJcbiAgICB2YXIgaSxcclxuICAgICAgICBjb2RlLFxyXG4gICAgICAgIGNvZGVzID0gW10sXHJcbiAgICAgICAgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXJQYWlyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29kZSA9IHNlbGYuX2RlY29kZUNvZGUoY291bnRlclBhaXJbaV0pO1xyXG4gICAgICAgIGlmICghY29kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29kZXMucHVzaChjb2RlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb2RlcztcclxufTtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlQ29kZSA9IGZ1bmN0aW9uKGNvdW50ZXIpIHtcclxuICAgIHZhciBqLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIHN1bSA9IDAsXHJcbiAgICAgICAgbm9ybWFsaXplZCxcclxuICAgICAgICBlcnJvcixcclxuICAgICAgICBlcHNpbG9uID0gc2VsZi5BVkdfQ09ERV9FUlJPUixcclxuICAgICAgICBjb2RlLFxyXG4gICAgICAgIGJlc3RNYXRjaCA9IHtcclxuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXHJcbiAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICBzdGFydDogMCxcclxuICAgICAgICAgICAgZW5kOiAwXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICBmb3IgKCBqID0gMDsgaiA8IGNvdW50ZXIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBzdW0gKz0gY291bnRlcltqXTtcclxuICAgIH1cclxuICAgIG5vcm1hbGl6ZWQgPSBzZWxmLl9ub3JtYWxpemUoY291bnRlcik7XHJcbiAgICBpZiAobm9ybWFsaXplZCkge1xyXG4gICAgICAgIGZvciAoY29kZSA9IDA7IGNvZGUgPCBzZWxmLkNPREVfUEFUVEVSTi5sZW5ndGg7IGNvZGUrKykge1xyXG4gICAgICAgICAgICBlcnJvciA9IHNlbGYuX21hdGNoUGF0dGVybihub3JtYWxpemVkLCBzZWxmLkNPREVfUEFUVEVSTltjb2RlXSk7XHJcbiAgICAgICAgICAgIGlmIChlcnJvciA8IGJlc3RNYXRjaC5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgYmVzdE1hdGNoLmNvZGUgPSBjb2RlO1xyXG4gICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJlc3RNYXRjaC5lcnJvciA8IGVwc2lsb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGJlc3RNYXRjaDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlUGF5bG9hZCA9IGZ1bmN0aW9uKGNvdW50ZXJzLCByZXN1bHQsIGRlY29kZWRDb2Rlcykge1xyXG4gICAgdmFyIGksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgcG9zID0gMCxcclxuICAgICAgICBjb3VudGVyTGVuZ3RoID0gY291bnRlcnMubGVuZ3RoLFxyXG4gICAgICAgIGNvdW50ZXJQYWlyID0gW1swLCAwLCAwLCAwLCAwXSwgWzAsIDAsIDAsIDAsIDBdXSxcclxuICAgICAgICBjb2RlcztcclxuXHJcbiAgICB3aGlsZSAocG9zIDwgY291bnRlckxlbmd0aCkge1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgY291bnRlclBhaXJbMF1baV0gPSBjb3VudGVyc1twb3NdICogdGhpcy5iYXJTcGFjZVJhdGlvWzBdO1xyXG4gICAgICAgICAgICBjb3VudGVyUGFpclsxXVtpXSA9IGNvdW50ZXJzW3BvcyArIDFdICogdGhpcy5iYXJTcGFjZVJhdGlvWzFdO1xyXG4gICAgICAgICAgICBwb3MgKz0gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29kZXMgPSBzZWxmLl9kZWNvZGVQYWlyKGNvdW50ZXJQYWlyKTtcclxuICAgICAgICBpZiAoIWNvZGVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goY29kZXNbaV0uY29kZSArIFwiXCIpO1xyXG4gICAgICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2Rlc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvZGVzO1xyXG59O1xyXG5cclxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlDb3VudGVyTGVuZ3RoID0gZnVuY3Rpb24oY291bnRlcnMpIHtcclxuICAgIHJldHVybiAoY291bnRlcnMubGVuZ3RoICUgMTAgPT09IDApO1xyXG59O1xyXG5cclxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9kZWNvZGUgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzdGFydEluZm8sXHJcbiAgICAgICAgZW5kSW5mbyxcclxuICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICBjb2RlLFxyXG4gICAgICAgIHJlc3VsdCA9IFtdLFxyXG4gICAgICAgIGRlY29kZWRDb2RlcyA9IFtdLFxyXG4gICAgICAgIGNvdW50ZXJzO1xyXG5cclxuICAgIHN0YXJ0SW5mbyA9IHNlbGYuX2ZpbmRTdGFydCgpO1xyXG4gICAgaWYgKCFzdGFydEluZm8pIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGRlY29kZWRDb2Rlcy5wdXNoKHN0YXJ0SW5mbyk7XHJcblxyXG4gICAgZW5kSW5mbyA9IHNlbGYuX2ZpbmRFbmQoKTtcclxuICAgIGlmICghZW5kSW5mbykge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvdW50ZXJzID0gc2VsZi5fZmlsbENvdW50ZXJzKHN0YXJ0SW5mby5lbmQsIGVuZEluZm8uc3RhcnQsIGZhbHNlKTtcclxuICAgIGlmICghc2VsZi5fdmVyaWZ5Q291bnRlckxlbmd0aChjb3VudGVycykpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVQYXlsb2FkKGNvdW50ZXJzLCByZXN1bHQsIGRlY29kZWRDb2Rlcyk7XHJcbiAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGlmIChyZXN1bHQubGVuZ3RoICUgMiAhPT0gMCB8fFxyXG4gICAgICAgICAgICByZXN1bHQubGVuZ3RoIDwgNikge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGRlY29kZWRDb2Rlcy5wdXNoKGVuZEluZm8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcclxuICAgICAgICBzdGFydDogc3RhcnRJbmZvLnN0YXJ0LFxyXG4gICAgICAgIGVuZDogZW5kSW5mby5lbmQsXHJcbiAgICAgICAgc3RhcnRJbmZvOiBzdGFydEluZm8sXHJcbiAgICAgICAgZGVjb2RlZENvZGVzOiBkZWNvZGVkQ29kZXNcclxuICAgIH07XHJcbn07XHJcblxyXG5JMm9mNVJlYWRlci5DT05GSUdfS0VZUyA9IHtcclxuICAgIG5vcm1hbGl6ZUJhclNwYWNlV2lkdGg6IHtcclxuICAgICAgICAndHlwZSc6ICdib29sZWFuJyxcclxuICAgICAgICAnZGVmYXVsdCc6IGZhbHNlLFxyXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdJZiB0cnVlLCB0aGUgcmVhZGVyIHRyaWVzIHRvIG5vcm1hbGl6ZSB0aGUnICtcclxuICAgICAgICAnd2lkdGgtZGlmZmVyZW5jZSBiZXR3ZWVuIGJhcnMgYW5kIHNwYWNlcydcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEkyb2Y1UmVhZGVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9yZWFkZXIvaTJvZjVfcmVhZGVyLmpzXG4gKiovIiwidmFyIGJhc2VNZXJnZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Jhc2VNZXJnZScpLFxuICAgIGNyZWF0ZUFzc2lnbmVyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvY3JlYXRlQXNzaWduZXInKTtcblxuLyoqXG4gKiBSZWN1cnNpdmVseSBtZXJnZXMgb3duIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiB0aGUgc291cmNlIG9iamVjdChzKSwgdGhhdFxuICogZG9uJ3QgcmVzb2x2ZSB0byBgdW5kZWZpbmVkYCBpbnRvIHRoZSBkZXN0aW5hdGlvbiBvYmplY3QuIFN1YnNlcXVlbnQgc291cmNlc1xuICogb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuIElmIGBjdXN0b21pemVyYCBpc1xuICogcHJvdmlkZWQgaXQncyBpbnZva2VkIHRvIHByb2R1Y2UgdGhlIG1lcmdlZCB2YWx1ZXMgb2YgdGhlIGRlc3RpbmF0aW9uIGFuZFxuICogc291cmNlIHByb3BlcnRpZXMuIElmIGBjdXN0b21pemVyYCByZXR1cm5zIGB1bmRlZmluZWRgIG1lcmdpbmcgaXMgaGFuZGxlZFxuICogYnkgdGhlIG1ldGhvZCBpbnN0ZWFkLiBUaGUgYGN1c3RvbWl6ZXJgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZFxuICogd2l0aCBmaXZlIGFyZ3VtZW50czogKG9iamVjdFZhbHVlLCBzb3VyY2VWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduZWQgdmFsdWVzLlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjdXN0b21pemVyYC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB1c2VycyA9IHtcbiAqICAgJ2RhdGEnOiBbeyAndXNlcic6ICdiYXJuZXknIH0sIHsgJ3VzZXInOiAnZnJlZCcgfV1cbiAqIH07XG4gKlxuICogdmFyIGFnZXMgPSB7XG4gKiAgICdkYXRhJzogW3sgJ2FnZSc6IDM2IH0sIHsgJ2FnZSc6IDQwIH1dXG4gKiB9O1xuICpcbiAqIF8ubWVyZ2UodXNlcnMsIGFnZXMpO1xuICogLy8gPT4geyAnZGF0YSc6IFt7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiB9LCB7ICd1c2VyJzogJ2ZyZWQnLCAnYWdlJzogNDAgfV0gfVxuICpcbiAqIC8vIHVzaW5nIGEgY3VzdG9taXplciBjYWxsYmFja1xuICogdmFyIG9iamVjdCA9IHtcbiAqICAgJ2ZydWl0cyc6IFsnYXBwbGUnXSxcbiAqICAgJ3ZlZ2V0YWJsZXMnOiBbJ2JlZXQnXVxuICogfTtcbiAqXG4gKiB2YXIgb3RoZXIgPSB7XG4gKiAgICdmcnVpdHMnOiBbJ2JhbmFuYSddLFxuICogICAndmVnZXRhYmxlcyc6IFsnY2Fycm90J11cbiAqIH07XG4gKlxuICogXy5tZXJnZShvYmplY3QsIG90aGVyLCBmdW5jdGlvbihhLCBiKSB7XG4gKiAgIGlmIChfLmlzQXJyYXkoYSkpIHtcbiAqICAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gKiAgIH1cbiAqIH0pO1xuICogLy8gPT4geyAnZnJ1aXRzJzogWydhcHBsZScsICdiYW5hbmEnXSwgJ3ZlZ2V0YWJsZXMnOiBbJ2JlZXQnLCAnY2Fycm90J10gfVxuICovXG52YXIgbWVyZ2UgPSBjcmVhdGVBc3NpZ25lcihiYXNlTWVyZ2UpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1lcmdlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL29iamVjdC9tZXJnZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYXJyYXlFYWNoID0gcmVxdWlyZSgnLi9hcnJheUVhY2gnKSxcbiAgICBiYXNlTWVyZ2VEZWVwID0gcmVxdWlyZSgnLi9iYXNlTWVyZ2VEZWVwJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc1R5cGVkQXJyYXknKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXMnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tZXJnZWAgd2l0aG91dCBzdXBwb3J0IGZvciBhcmd1bWVudCBqdWdnbGluZyxcbiAqIG11bHRpcGxlIHNvdXJjZXMsIGFuZCBgdGhpc2AgYmluZGluZyBgY3VzdG9taXplcmAgZnVuY3Rpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgbWVyZ2VkIHZhbHVlcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0E9W11dIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCPVtdXSBBc3NvY2lhdGVzIHZhbHVlcyB3aXRoIHNvdXJjZSBjb3VudGVycGFydHMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlTWVyZ2Uob2JqZWN0LCBzb3VyY2UsIGN1c3RvbWl6ZXIsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbiAgdmFyIGlzU3JjQXJyID0gaXNBcnJheUxpa2Uoc291cmNlKSAmJiAoaXNBcnJheShzb3VyY2UpIHx8IGlzVHlwZWRBcnJheShzb3VyY2UpKSxcbiAgICAgIHByb3BzID0gaXNTcmNBcnIgPyB1bmRlZmluZWQgOiBrZXlzKHNvdXJjZSk7XG5cbiAgYXJyYXlFYWNoKHByb3BzIHx8IHNvdXJjZSwgZnVuY3Rpb24oc3JjVmFsdWUsIGtleSkge1xuICAgIGlmIChwcm9wcykge1xuICAgICAga2V5ID0gc3JjVmFsdWU7XG4gICAgICBzcmNWYWx1ZSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3RMaWtlKHNyY1ZhbHVlKSkge1xuICAgICAgc3RhY2tBIHx8IChzdGFja0EgPSBbXSk7XG4gICAgICBzdGFja0IgfHwgKHN0YWNrQiA9IFtdKTtcbiAgICAgIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgYmFzZU1lcmdlLCBjdXN0b21pemVyLCBzdGFja0EsIHN0YWNrQik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgICAgcmVzdWx0ID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIodmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICBpc0NvbW1vbiA9IHJlc3VsdCA9PT0gdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoaXNDb21tb24pIHtcbiAgICAgICAgcmVzdWx0ID0gc3JjVmFsdWU7XG4gICAgICB9XG4gICAgICBpZiAoKHJlc3VsdCAhPT0gdW5kZWZpbmVkIHx8IChpc1NyY0FyciAmJiAhKGtleSBpbiBvYmplY3QpKSkgJiZcbiAgICAgICAgICAoaXNDb21tb24gfHwgKHJlc3VsdCA9PT0gcmVzdWx0ID8gKHJlc3VsdCAhPT0gdmFsdWUpIDogKHZhbHVlID09PSB2YWx1ZSkpKSkge1xuICAgICAgICBvYmplY3Rba2V5XSA9IHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VNZXJnZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iYXNlTWVyZ2UuanNcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZm9yRWFjaGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlFYWNoKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkgPT09IGZhbHNlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5RWFjaDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9hcnJheUVhY2guanNcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFycmF5Q29weSA9IHJlcXVpcmUoJy4vYXJyYXlDb3B5JyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpLFxuICAgIGlzUGxhaW5PYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzUGxhaW5PYmplY3QnKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzVHlwZWRBcnJheScpLFxuICAgIHRvUGxhaW5PYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL3RvUGxhaW5PYmplY3QnKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VNZXJnZWAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBtZXJnZXMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgbWVyZ2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBtZXJnZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1lcmdlRnVuYyBUaGUgZnVuY3Rpb24gdG8gbWVyZ2UgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgbWVyZ2VkIHZhbHVlcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0E9W11dIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCPVtdXSBBc3NvY2lhdGVzIHZhbHVlcyB3aXRoIHNvdXJjZSBjb3VudGVycGFydHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBtZXJnZUZ1bmMsIGN1c3RvbWl6ZXIsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBsZW5ndGggPSBzdGFja0EubGVuZ3RoLFxuICAgICAgc3JjVmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoc3RhY2tBW2xlbmd0aF0gPT0gc3JjVmFsdWUpIHtcbiAgICAgIG9iamVjdFtrZXldID0gc3RhY2tCW2xlbmd0aF07XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIHZhciB2YWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgcmVzdWx0ID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIodmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlKSA6IHVuZGVmaW5lZCxcbiAgICAgIGlzQ29tbW9uID0gcmVzdWx0ID09PSB1bmRlZmluZWQ7XG5cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgcmVzdWx0ID0gc3JjVmFsdWU7XG4gICAgaWYgKGlzQXJyYXlMaWtlKHNyY1ZhbHVlKSAmJiAoaXNBcnJheShzcmNWYWx1ZSkgfHwgaXNUeXBlZEFycmF5KHNyY1ZhbHVlKSkpIHtcbiAgICAgIHJlc3VsdCA9IGlzQXJyYXkodmFsdWUpXG4gICAgICAgID8gdmFsdWVcbiAgICAgICAgOiAoaXNBcnJheUxpa2UodmFsdWUpID8gYXJyYXlDb3B5KHZhbHVlKSA6IFtdKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChzcmNWYWx1ZSkgfHwgaXNBcmd1bWVudHMoc3JjVmFsdWUpKSB7XG4gICAgICByZXN1bHQgPSBpc0FyZ3VtZW50cyh2YWx1ZSlcbiAgICAgICAgPyB0b1BsYWluT2JqZWN0KHZhbHVlKVxuICAgICAgICA6IChpc1BsYWluT2JqZWN0KHZhbHVlKSA/IHZhbHVlIDoge30pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8vIEFkZCB0aGUgc291cmNlIHZhbHVlIHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cyBhbmQgYXNzb2NpYXRlXG4gIC8vIGl0IHdpdGggaXRzIG1lcmdlZCB2YWx1ZS5cbiAgc3RhY2tBLnB1c2goc3JjVmFsdWUpO1xuICBzdGFja0IucHVzaChyZXN1bHQpO1xuXG4gIGlmIChpc0NvbW1vbikge1xuICAgIC8vIFJlY3Vyc2l2ZWx5IG1lcmdlIG9iamVjdHMgYW5kIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIG9iamVjdFtrZXldID0gbWVyZ2VGdW5jKHJlc3VsdCwgc3JjVmFsdWUsIGN1c3RvbWl6ZXIsIHN0YWNrQSwgc3RhY2tCKTtcbiAgfSBlbHNlIGlmIChyZXN1bHQgPT09IHJlc3VsdCA/IChyZXN1bHQgIT09IHZhbHVlKSA6ICh2YWx1ZSA9PT0gdmFsdWUpKSB7XG4gICAgb2JqZWN0W2tleV0gPSByZXN1bHQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlTWVyZ2VEZWVwO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2Jhc2VNZXJnZURlZXAuanNcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3BpZXMgdGhlIHZhbHVlcyBvZiBgc291cmNlYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBzb3VyY2UgVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXk9W11dIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyB0by5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheUNvcHkoc291cmNlLCBhcnJheSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHNvdXJjZS5sZW5ndGg7XG5cbiAgYXJyYXkgfHwgKGFycmF5ID0gQXJyYXkobGVuZ3RoKSk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbaW5kZXhdID0gc291cmNlW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlDb3B5O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2FycmF5Q29weS5qc1xuICoqIG1vZHVsZSBpZCA9IDMwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0FycmF5TGlrZScpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKSAmJlxuICAgIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJiAhcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJndW1lbnRzO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2xhbmcvaXNBcmd1bWVudHMuanNcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGdldExlbmd0aCA9IHJlcXVpcmUoJy4vZ2V0TGVuZ3RoJyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKGdldExlbmd0aCh2YWx1ZSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXlMaWtlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2lzQXJyYXlMaWtlLmpzXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiYXNlUHJvcGVydHkgPSByZXF1aXJlKCcuL2Jhc2VQcm9wZXJ0eScpO1xuXG4vKipcbiAqIEdldHMgdGhlIFwibGVuZ3RoXCIgcHJvcGVydHkgdmFsdWUgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBhdm9pZCBhIFtKSVQgYnVnXShodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNzkyKVxuICogdGhhdCBhZmZlY3RzIFNhZmFyaSBvbiBhdCBsZWFzdCBpT1MgOC4xLTguMyBBUk02NC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIFwibGVuZ3RoXCIgdmFsdWUuXG4gKi9cbnZhciBnZXRMZW5ndGggPSBiYXNlUHJvcGVydHkoJ2xlbmd0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldExlbmd0aDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9nZXRMZW5ndGguanNcbiAqKiBtb2R1bGUgaWQgPSAzM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eWAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHkoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlUHJvcGVydHk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvYmFzZVByb3BlcnR5LmpzXG4gKiogbW9kdWxlIGlkID0gMzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVXNlZCBhcyB0aGUgW21heGltdW0gbGVuZ3RoXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGJhc2VkIG9uIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNMZW5ndGg7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNMZW5ndGguanNcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9pc09iamVjdExpa2UuanNcbiAqKiBtb2R1bGUgaWQgPSAzNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2dldE5hdGl2ZScpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlSXNBcnJheSA9IGdldE5hdGl2ZShBcnJheSwgJ2lzQXJyYXknKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IG5hdGl2ZUlzQXJyYXkgfHwgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcnJheVRhZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL2lzQXJyYXkuanNcbiAqKiBtb2R1bGUgaWQgPSAzN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzTmF0aXZlID0gcmVxdWlyZSgnLi4vbGFuZy9pc05hdGl2ZScpO1xuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgcmV0dXJuIGlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE5hdGl2ZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9nZXROYXRpdmUuanNcbiAqKiBtb2R1bGUgaWQgPSAzOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuL2lzRnVuY3Rpb24nKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkgPiA1KS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZuVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmblRvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UoL1tcXFxcXiQuKis/KClbXFxde318XS9nLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTmF0aXZlKEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTmF0aXZlKF8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgcmV0dXJuIHJlSXNOYXRpdmUudGVzdChmblRvU3RyaW5nLmNhbGwodmFsdWUpKTtcbiAgfVxuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiByZUlzSG9zdEN0b3IudGVzdCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNOYXRpdmU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvbGFuZy9pc05hdGl2ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIG9sZGVyIHZlcnNpb25zIG9mIENocm9tZSBhbmQgU2FmYXJpIHdoaWNoIHJldHVybiAnZnVuY3Rpb24nIGZvciByZWdleGVzXG4gIC8vIGFuZCBTYWZhcmkgOCB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBjb25zdHJ1Y3RvcnMuXG4gIHJldHVybiBpc09iamVjdCh2YWx1ZSkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gZnVuY1RhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2xhbmcvaXNGdW5jdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDQwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBbbGFuZ3VhZ2UgdHlwZV0oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2xhbmcvaXNPYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA0MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGJhc2VGb3JJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Jhc2VGb3JJbicpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgYXNzdW1lcyBvYmplY3RzIGNyZWF0ZWQgYnkgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yXG4gKiBoYXZlIG5vIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqIH1cbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QobmV3IEZvbyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoeyAneCc6IDAsICd5JzogMCB9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgdmFyIEN0b3I7XG5cbiAgLy8gRXhpdCBlYXJseSBmb3Igbm9uIGBPYmplY3RgIG9iamVjdHMuXG4gIGlmICghKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gb2JqZWN0VGFnICYmICFpc0FyZ3VtZW50cyh2YWx1ZSkpIHx8XG4gICAgICAoIWhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjb25zdHJ1Y3RvcicpICYmIChDdG9yID0gdmFsdWUuY29uc3RydWN0b3IsIHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgIShDdG9yIGluc3RhbmNlb2YgQ3RvcikpKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBJRSA8IDkgaXRlcmF0ZXMgaW5oZXJpdGVkIHByb3BlcnRpZXMgYmVmb3JlIG93biBwcm9wZXJ0aWVzLiBJZiB0aGUgZmlyc3RcbiAgLy8gaXRlcmF0ZWQgcHJvcGVydHkgaXMgYW4gb2JqZWN0J3Mgb3duIHByb3BlcnR5IHRoZW4gdGhlcmUgYXJlIG5vIGluaGVyaXRlZFxuICAvLyBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gIHZhciByZXN1bHQ7XG4gIC8vIEluIG1vc3QgZW52aXJvbm1lbnRzIGFuIG9iamVjdCdzIG93biBwcm9wZXJ0aWVzIGFyZSBpdGVyYXRlZCBiZWZvcmVcbiAgLy8gaXRzIGluaGVyaXRlZCBwcm9wZXJ0aWVzLiBJZiB0aGUgbGFzdCBpdGVyYXRlZCBwcm9wZXJ0eSBpcyBhbiBvYmplY3Qnc1xuICAvLyBvd24gcHJvcGVydHkgdGhlbiB0aGVyZSBhcmUgbm8gaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydGllcy5cbiAgYmFzZUZvckluKHZhbHVlLCBmdW5jdGlvbihzdWJWYWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0ID0ga2V5O1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdCA9PT0gdW5kZWZpbmVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHJlc3VsdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNQbGFpbk9iamVjdDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL2lzUGxhaW5PYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA0MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGJhc2VGb3IgPSByZXF1aXJlKCcuL2Jhc2VGb3InKSxcbiAgICBrZXlzSW4gPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5c0luJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9ySW5gIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2tcbiAqIHNob3J0aGFuZHMgYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGb3JJbihvYmplY3QsIGl0ZXJhdGVlKSB7XG4gIHJldHVybiBiYXNlRm9yKG9iamVjdCwgaXRlcmF0ZWUsIGtleXNJbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZvckluO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2Jhc2VGb3JJbi5qc1xuICoqIG1vZHVsZSBpZCA9IDQzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgY3JlYXRlQmFzZUZvciA9IHJlcXVpcmUoJy4vY3JlYXRlQmFzZUZvcicpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBiYXNlRm9ySW5gIGFuZCBgYmFzZUZvck93bmAgd2hpY2ggaXRlcmF0ZXNcbiAqIG92ZXIgYG9iamVjdGAgcHJvcGVydGllcyByZXR1cm5lZCBieSBga2V5c0Z1bmNgIGludm9raW5nIGBpdGVyYXRlZWAgZm9yXG4gKiBlYWNoIHByb3BlcnR5LiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHlcbiAqIHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGtleXNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGtleXMgb2YgYG9iamVjdGAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG52YXIgYmFzZUZvciA9IGNyZWF0ZUJhc2VGb3IoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRm9yO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2Jhc2VGb3IuanNcbiAqKiBtb2R1bGUgaWQgPSA0NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi90b09iamVjdCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBiYXNlIGZ1bmN0aW9uIGZvciBgXy5mb3JJbmAgb3IgYF8uZm9ySW5SaWdodGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYmFzZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmFzZUZvcihmcm9tUmlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCwgaXRlcmF0ZWUsIGtleXNGdW5jKSB7XG4gICAgdmFyIGl0ZXJhYmxlID0gdG9PYmplY3Qob2JqZWN0KSxcbiAgICAgICAgcHJvcHMgPSBrZXlzRnVuYyhvYmplY3QpLFxuICAgICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICAgIGluZGV4ID0gZnJvbVJpZ2h0ID8gbGVuZ3RoIDogLTE7XG5cbiAgICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtrZXldLCBrZXksIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQmFzZUZvcjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9jcmVhdGVCYXNlRm9yLmpzXG4gKiogbW9kdWxlIGlkID0gNDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGFuIG9iamVjdCBpZiBpdCdzIG5vdCBvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWx1ZSkgPyB2YWx1ZSA6IE9iamVjdCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9PYmplY3Q7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvdG9PYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA0NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNJbmRleCcpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKTtcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gIH1cbiAgdmFyIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7XG4gIGxlbmd0aCA9IChsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgaXNBcmd1bWVudHMob2JqZWN0KSkgJiYgbGVuZ3RoKSB8fCAwO1xuXG4gIHZhciBDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgaW5kZXggPSAtMSxcbiAgICAgIGlzUHJvdG8gPSB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlID09PSBvYmplY3QsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpLFxuICAgICAgc2tpcEluZGV4ZXMgPSBsZW5ndGggPiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IChpbmRleCArICcnKTtcbiAgfVxuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKCEoc2tpcEluZGV4ZXMgJiYgaXNJbmRleChrZXksIGxlbmd0aCkpICYmXG4gICAgICAgICEoa2V5ID09ICdjb25zdHJ1Y3RvcicgJiYgKGlzUHJvdG8gfHwgIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5c0luO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL29iamVjdC9rZXlzSW4uanNcbiAqKiBtb2R1bGUgaWQgPSA0N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL15cXGQrJC87XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgW21heGltdW0gbGVuZ3RoXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFsdWUgPSAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSA/ICt2YWx1ZSA6IC0xO1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSW5kZXg7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvaXNJbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDQ4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9XG50eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9IHR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3Nbb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSldO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVHlwZWRBcnJheTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9sYW5nL2lzVHlwZWRBcnJheS5qc1xuICoqIG1vZHVsZSBpZCA9IDQ5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYmFzZUNvcHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlQ29weScpLFxuICAgIGtleXNJbiA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzSW4nKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgcGxhaW4gb2JqZWN0IGZsYXR0ZW5pbmcgaW5oZXJpdGVkIGVudW1lcmFibGVcbiAqIHByb3BlcnRpZXMgb2YgYHZhbHVlYCB0byBvd24gcHJvcGVydGllcyBvZiB0aGUgcGxhaW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBwbGFpbiBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIG5ldyBGb28pO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiB9XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgXy50b1BsYWluT2JqZWN0KG5ldyBGb28pKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIsICdjJzogMyB9XG4gKi9cbmZ1bmN0aW9uIHRvUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGJhc2VDb3B5KHZhbHVlLCBrZXlzSW4odmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1BsYWluT2JqZWN0O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2xhbmcvdG9QbGFpbk9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDUwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcGllcyBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gY29weS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDb3B5KHNvdXJjZSwgcHJvcHMsIG9iamVjdCkge1xuICBvYmplY3QgfHwgKG9iamVjdCA9IHt9KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgb2JqZWN0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VDb3B5O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2ludGVybmFsL2Jhc2VDb3B5LmpzXG4gKiogbW9kdWxlIGlkID0gNTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9nZXROYXRpdmUnKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzQXJyYXlMaWtlJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0JyksXG4gICAgc2hpbUtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9zaGltS2V5cycpO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBnZXROYXRpdmUoT2JqZWN0LCAna2V5cycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG52YXIga2V5cyA9ICFuYXRpdmVLZXlzID8gc2hpbUtleXMgOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgdmFyIEN0b3IgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdC5jb25zdHJ1Y3RvcjtcbiAgaWYgKCh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlID09PSBvYmplY3QpIHx8XG4gICAgICAodHlwZW9mIG9iamVjdCAhPSAnZnVuY3Rpb24nICYmIGlzQXJyYXlMaWtlKG9iamVjdCkpKSB7XG4gICAgcmV0dXJuIHNoaW1LZXlzKG9iamVjdCk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0KG9iamVjdCkgPyBuYXRpdmVLZXlzKG9iamVjdCkgOiBbXTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5cztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9vYmplY3Qva2V5cy5qc1xuICoqIG1vZHVsZSBpZCA9IDUyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuL2lzSW5kZXgnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKSxcbiAgICBrZXlzSW4gPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5c0luJyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEEgZmFsbGJhY2sgaW1wbGVtZW50YXRpb24gb2YgYE9iamVjdC5rZXlzYCB3aGljaCBjcmVhdGVzIGFuIGFycmF5IG9mIHRoZVxuICogb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIHNoaW1LZXlzKG9iamVjdCkge1xuICB2YXIgcHJvcHMgPSBrZXlzSW4ob2JqZWN0KSxcbiAgICAgIHByb3BzTGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgbGVuZ3RoID0gcHJvcHNMZW5ndGggJiYgb2JqZWN0Lmxlbmd0aDtcblxuICB2YXIgYWxsb3dJbmRleGVzID0gISFsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgaXNBcmd1bWVudHMob2JqZWN0KSk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoKytpbmRleCA8IHByb3BzTGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICBpZiAoKGFsbG93SW5kZXhlcyAmJiBpc0luZGV4KGtleSwgbGVuZ3RoKSkgfHwgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hpbUtleXM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvc2hpbUtleXMuanNcbiAqKiBtb2R1bGUgaWQgPSA1M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGJpbmRDYWxsYmFjayA9IHJlcXVpcmUoJy4vYmluZENhbGxiYWNrJyksXG4gICAgaXNJdGVyYXRlZUNhbGwgPSByZXF1aXJlKCcuL2lzSXRlcmF0ZWVDYWxsJyksXG4gICAgcmVzdFBhcmFtID0gcmVxdWlyZSgnLi4vZnVuY3Rpb24vcmVzdFBhcmFtJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGBfLmFzc2lnbmAsIGBfLmRlZmF1bHRzYCwgb3IgYF8ubWVyZ2VgIGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhc3NpZ25lciBUaGUgZnVuY3Rpb24gdG8gYXNzaWduIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFzc2lnbmVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVBc3NpZ25lcihhc3NpZ25lcikge1xuICByZXR1cm4gcmVzdFBhcmFtKGZ1bmN0aW9uKG9iamVjdCwgc291cmNlcykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBvYmplY3QgPT0gbnVsbCA/IDAgOiBzb3VyY2VzLmxlbmd0aCxcbiAgICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA+IDIgPyBzb3VyY2VzW2xlbmd0aCAtIDJdIDogdW5kZWZpbmVkLFxuICAgICAgICBndWFyZCA9IGxlbmd0aCA+IDIgPyBzb3VyY2VzWzJdIDogdW5kZWZpbmVkLFxuICAgICAgICB0aGlzQXJnID0gbGVuZ3RoID4gMSA/IHNvdXJjZXNbbGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAodHlwZW9mIGN1c3RvbWl6ZXIgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY3VzdG9taXplciA9IGJpbmRDYWxsYmFjayhjdXN0b21pemVyLCB0aGlzQXJnLCA1KTtcbiAgICAgIGxlbmd0aCAtPSAyO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXN0b21pemVyID0gdHlwZW9mIHRoaXNBcmcgPT0gJ2Z1bmN0aW9uJyA/IHRoaXNBcmcgOiB1bmRlZmluZWQ7XG4gICAgICBsZW5ndGggLT0gKGN1c3RvbWl6ZXIgPyAxIDogMCk7XG4gICAgfVxuICAgIGlmIChndWFyZCAmJiBpc0l0ZXJhdGVlQ2FsbChzb3VyY2VzWzBdLCBzb3VyY2VzWzFdLCBndWFyZCkpIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPCAzID8gdW5kZWZpbmVkIDogY3VzdG9taXplcjtcbiAgICAgIGxlbmd0aCA9IDE7XG4gICAgfVxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgc291cmNlID0gc291cmNlc1tpbmRleF07XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIGFzc2lnbmVyKG9iamVjdCwgc291cmNlLCBjdXN0b21pemVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQXNzaWduZXI7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaW50ZXJuYWwvY3JlYXRlQXNzaWduZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA1NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlkZW50aXR5ID0gcmVxdWlyZSgnLi4vdXRpbGl0eS9pZGVudGl0eScpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUNhbGxiYWNrYCB3aGljaCBvbmx5IHN1cHBvcnRzIGB0aGlzYCBiaW5kaW5nXG4gKiBhbmQgc3BlY2lmeWluZyB0aGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYmluZC5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtudW1iZXJ9IFthcmdDb3VudF0gVGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGNhbGxiYWNrLlxuICovXG5mdW5jdGlvbiBiaW5kQ2FsbGJhY2soZnVuYywgdGhpc0FyZywgYXJnQ291bnQpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gaWRlbnRpdHk7XG4gIH1cbiAgaWYgKHRoaXNBcmcgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmdW5jO1xuICB9XG4gIHN3aXRjaCAoYXJnQ291bnQpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICB9O1xuICAgIGNhc2UgNDogcmV0dXJuIGZ1bmN0aW9uKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDU6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgb3RoZXIsIGtleSwgb2JqZWN0LCBzb3VyY2UpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmRDYWxsYmFjaztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9iaW5kQ2FsbGJhY2suanNcbiAqKiBtb2R1bGUgaWQgPSA1NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBwcm92aWRlZCB0byBpdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxpdHlcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqXG4gKiBfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdDtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlkZW50aXR5O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL3V0aWxpdHkvaWRlbnRpdHkuanNcbiAqKiBtb2R1bGUgaWQgPSA1NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuL2lzSW5kZXgnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHByb3ZpZGVkIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgdmFsdWUgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IGluZGV4IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgaW5kZXggb3Iga2V5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBvYmplY3QgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBvYmplY3QgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSXRlcmF0ZWVDYWxsKHZhbHVlLCBpbmRleCwgb2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiBpbmRleDtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcidcbiAgICAgID8gKGlzQXJyYXlMaWtlKG9iamVjdCkgJiYgaXNJbmRleChpbmRleCwgb2JqZWN0Lmxlbmd0aCkpXG4gICAgICA6ICh0eXBlID09ICdzdHJpbmcnICYmIGluZGV4IGluIG9iamVjdCkpIHtcbiAgICB2YXIgb3RoZXIgPSBvYmplY3RbaW5kZXhdO1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgPyAodmFsdWUgPT09IG90aGVyKSA6IChvdGhlciAhPT0gb3RoZXIpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0l0ZXJhdGVlQ2FsbDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pbnRlcm5hbC9pc0l0ZXJhdGVlQ2FsbC5qc1xuICoqIG1vZHVsZSBpZCA9IDU3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGVcbiAqIGNyZWF0ZWQgZnVuY3Rpb24gYW5kIGFyZ3VtZW50cyBmcm9tIGBzdGFydGAgYW5kIGJleW9uZCBwcm92aWRlZCBhcyBhbiBhcnJheS5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgYmFzZWQgb24gdGhlIFtyZXN0IHBhcmFtZXRlcl0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0Z1bmN0aW9ucy9yZXN0X3BhcmFtZXRlcnMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIHNheSA9IF8ucmVzdFBhcmFtKGZ1bmN0aW9uKHdoYXQsIG5hbWVzKSB7XG4gKiAgIHJldHVybiB3aGF0ICsgJyAnICsgXy5pbml0aWFsKG5hbWVzKS5qb2luKCcsICcpICtcbiAqICAgICAoXy5zaXplKG5hbWVzKSA+IDEgPyAnLCAmICcgOiAnJykgKyBfLmxhc3QobmFtZXMpO1xuICogfSk7XG4gKlxuICogc2F5KCdoZWxsbycsICdmcmVkJywgJ2Jhcm5leScsICdwZWJibGVzJyk7XG4gKiAvLyA9PiAnaGVsbG8gZnJlZCwgYmFybmV5LCAmIHBlYmJsZXMnXG4gKi9cbmZ1bmN0aW9uIHJlc3RQYXJhbShmdW5jLCBzdGFydCkge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICBzdGFydCA9IG5hdGl2ZU1heChzdGFydCA9PT0gdW5kZWZpbmVkID8gKGZ1bmMubGVuZ3RoIC0gMSkgOiAoK3N0YXJ0IHx8IDApLCAwKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgIHJlc3QgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHJlc3RbaW5kZXhdID0gYXJnc1tzdGFydCArIGluZGV4XTtcbiAgICB9XG4gICAgc3dpdGNoIChzdGFydCkge1xuICAgICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXMsIHJlc3QpO1xuICAgICAgY2FzZSAxOiByZXR1cm4gZnVuYy5jYWxsKHRoaXMsIGFyZ3NbMF0sIHJlc3QpO1xuICAgICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXMsIGFyZ3NbMF0sIGFyZ3NbMV0sIHJlc3QpO1xuICAgIH1cbiAgICB2YXIgb3RoZXJBcmdzID0gQXJyYXkoc3RhcnQgKyAxKTtcbiAgICBpbmRleCA9IC0xO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IHJlc3Q7XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgb3RoZXJBcmdzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZXN0UGFyYW07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvZnVuY3Rpb24vcmVzdFBhcmFtLmpzXG4gKiogbW9kdWxlIGlkID0gNThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbigpIHtcclxuICAgIHZhciBldmVudHMgPSB7fTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRFdmVudChldmVudE5hbWUpIHtcclxuICAgICAgICBpZiAoIWV2ZW50c1tldmVudE5hbWVdKSB7XHJcbiAgICAgICAgICAgIGV2ZW50c1tldmVudE5hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlcnM6IFtdXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBldmVudHNbZXZlbnROYW1lXTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbGVhckV2ZW50cygpe1xyXG4gICAgICAgIGV2ZW50cyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHB1Ymxpc2hTdWJzY3JpcHRpb24oc3Vic2NyaXB0aW9uLCBkYXRhKSB7XHJcbiAgICAgICAgaWYgKHN1YnNjcmlwdGlvbi5hc3luYykge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLmNhbGxiYWNrKGRhdGEpO1xyXG4gICAgICAgICAgICB9LCA0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdWJzY3JpcHRpb24uY2FsbGJhY2soZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN1YnNjcmliZShldmVudCwgY2FsbGJhY2ssIGFzeW5jKSB7XHJcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbjtcclxuXHJcbiAgICAgICAgaWYgKCB0eXBlb2YgY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBzdWJzY3JpcHRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXHJcbiAgICAgICAgICAgICAgICBhc3luYzogYXN5bmNcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdWJzY3JpcHRpb24gPSBjYWxsYmFjaztcclxuICAgICAgICAgICAgaWYgKCFzdWJzY3JpcHRpb24uY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRocm93IFwiQ2FsbGJhY2sgd2FzIG5vdCBzcGVjaWZpZWQgb24gb3B0aW9uc1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRFdmVudChldmVudCkuc3Vic2NyaWJlcnMucHVzaChzdWJzY3JpcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc3Vic2NyaWJlOiBmdW5jdGlvbihldmVudCwgY2FsbGJhY2ssIGFzeW5jKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdWJzY3JpYmUoZXZlbnQsIGNhbGxiYWNrLCBhc3luYyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwdWJsaXNoOiBmdW5jdGlvbihldmVudE5hbWUsIGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50ID0gZ2V0RXZlbnQoZXZlbnROYW1lKSxcclxuICAgICAgICAgICAgICAgIHN1YnNjcmliZXJzID0gZXZlbnQuc3Vic2NyaWJlcnM7XHJcblxyXG4gICAgICAgICAgICBldmVudC5zdWJzY3JpYmVycyA9IHN1YnNjcmliZXJzLmZpbHRlcihmdW5jdGlvbihzdWJzY3JpYmVyKSB7XHJcbiAgICAgICAgICAgICAgICBwdWJsaXNoU3Vic2NyaXB0aW9uKHN1YnNjcmliZXIsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICFzdWJzY3JpYmVyLm9uY2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25jZTogZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrLCBhc3luYykge1xyXG4gICAgICAgICAgICBzdWJzY3JpYmUoZXZlbnQsIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcclxuICAgICAgICAgICAgICAgIGFzeW5jOiBhc3luYyxcclxuICAgICAgICAgICAgICAgIG9uY2U6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1bnN1YnNjcmliZTogZnVuY3Rpb24oZXZlbnROYW1lLCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IGdldEV2ZW50KGV2ZW50TmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQgJiYgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5zdWJzY3JpYmVycyA9IGV2ZW50LnN1YnNjcmliZXJzLmZpbHRlcihmdW5jdGlvbihzdWJzY3JpYmVyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1YnNjcmliZXIuY2FsbGJhY2sgIT09IGNhbGxiYWNrO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5zdWJzY3JpYmVycyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJFdmVudHMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn0pKCk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvbW1vbi9ldmVudHMuanNcbiAqKi8iLCJjb25zdCBtZXJnZSA9IHJlcXVpcmUoJ2xvZGFzaC9vYmplY3QvbWVyZ2UnKTtcclxuXHJcbnZhciBzdHJlYW1SZWYsXHJcbiAgICBsb2FkZWREYXRhSGFuZGxlcjtcclxuXHJcbi8qKlxyXG4gKiBXcmFwcyBicm93c2VyLXNwZWNpZmljIGdldFVzZXJNZWRpYVxyXG4gKiBAcGFyYW0ge09iamVjdH0gY29uc3RyYWludHNcclxuICogQHBhcmFtIHtPYmplY3R9IHN1Y2Nlc3MgQ2FsbGJhY2tcclxuICogQHBhcmFtIHtPYmplY3R9IGZhaWx1cmUgQ2FsbGJhY2tcclxuICovXHJcbmZ1bmN0aW9uIGdldFVzZXJNZWRpYShjb25zdHJhaW50cywgc3VjY2VzcywgZmFpbHVyZSkge1xyXG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIG5hdmlnYXRvci5nZXRVc2VyTWVkaWEoY29uc3RyYWludHMsIGZ1bmN0aW9uIChzdHJlYW0pIHtcclxuICAgICAgICAgICAgc3RyZWFtUmVmID0gc3RyZWFtO1xyXG4gICAgICAgICAgICB2YXIgdmlkZW9TcmMgPSAod2luZG93LlVSTCAmJiB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pKSB8fCBzdHJlYW07XHJcbiAgICAgICAgICAgIHN1Y2Nlc3MuYXBwbHkobnVsbCwgW3ZpZGVvU3JjXSk7XHJcbiAgICAgICAgfSwgZmFpbHVyZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZhaWx1cmUobmV3IFR5cGVFcnJvcihcImdldFVzZXJNZWRpYSBub3QgYXZhaWxhYmxlXCIpKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZGVkRGF0YSh2aWRlbywgY2FsbGJhY2spIHtcclxuICAgIHZhciBhdHRlbXB0cyA9IDEwO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrVmlkZW8oKSB7XHJcbiAgICAgICAgaWYgKGF0dGVtcHRzID4gMCkge1xyXG4gICAgICAgICAgICBpZiAodmlkZW8udmlkZW9XaWR0aCA+IDAgJiYgdmlkZW8udmlkZW9IZWlnaHQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codmlkZW8udmlkZW9XaWR0aCArIFwicHggeCBcIiArIHZpZGVvLnZpZGVvSGVpZ2h0ICsgXCJweFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjaGVja1ZpZGVvLCA1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soJ1VuYWJsZSB0byBwbGF5IHZpZGVvIHN0cmVhbS4gSXMgd2ViY2FtIHdvcmtpbmc/Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF0dGVtcHRzLS07XHJcbiAgICB9XHJcbiAgICBjaGVja1ZpZGVvKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcmllcyB0byBhdHRhY2ggdGhlIGNhbWVyYS1zdHJlYW0gdG8gYSBnaXZlbiB2aWRlby1lbGVtZW50XHJcbiAqIGFuZCBjYWxscyB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gd2hlbiB0aGUgY29udGVudCBpcyByZWFkeVxyXG4gKiBAcGFyYW0ge09iamVjdH0gY29uc3RyYWludHNcclxuICogQHBhcmFtIHtPYmplY3R9IHZpZGVvXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjYWxsYmFja1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdENhbWVyYShjb25zdHJhaW50cywgdmlkZW8sIGNhbGxiYWNrKSB7XHJcbiAgICBnZXRVc2VyTWVkaWEoY29uc3RyYWludHMsIGZ1bmN0aW9uKHNyYykge1xyXG4gICAgICAgIHZpZGVvLnNyYyA9IHNyYztcclxuICAgICAgICBpZiAobG9hZGVkRGF0YUhhbmRsZXIpIHtcclxuICAgICAgICAgICAgdmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRlZGRhdGFcIiwgbG9hZGVkRGF0YUhhbmRsZXIsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9hZGVkRGF0YUhhbmRsZXIgPSBsb2FkZWREYXRhLmJpbmQobnVsbCwgdmlkZW8sIGNhbGxiYWNrKTtcclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRkYXRhJywgbG9hZGVkRGF0YUhhbmRsZXIsIGZhbHNlKTtcclxuICAgICAgICB2aWRlby5wbGF5KCk7XHJcbiAgICB9LCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY2FsbGJhY2soZSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE5vcm1hbGl6ZXMgdGhlIGluY29taW5nIGNvbnN0cmFpbnRzIHRvIHNhdGlzZnkgdGhlIGN1cnJlbnQgYnJvd3NlclxyXG4gKiBAcGFyYW0gY29uZmlnXHJcbiAqIEBwYXJhbSBjYiBDYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbmV2ZXIgY29uc3RyYWludHMgYXJlIGNyZWF0ZWRcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5mdW5jdGlvbiBub3JtYWxpemVDb25zdHJhaW50cyhjb25maWcsIGNiKSB7XHJcbiAgICB2YXIgY29uc3RyYWludHMgPSB7XHJcbiAgICAgICAgICAgIGF1ZGlvOiBmYWxzZSxcclxuICAgICAgICAgICAgdmlkZW86IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHZpZGVvQ29uc3RyYWludHMgPSBtZXJnZSh7XHJcbiAgICAgICAgICAgIHdpZHRoOiA2NDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogNDgwLFxyXG4gICAgICAgICAgICBtaW5Bc3BlY3RSYXRpbzogMCxcclxuICAgICAgICAgICAgbWF4QXNwZWN0UmF0aW86IDEwMCxcclxuICAgICAgICAgICAgZmFjaW5nOiBcImVudmlyb25tZW50XCJcclxuICAgICAgICB9LCBjb25maWcpO1xyXG5cclxuICAgIGlmICggdHlwZW9mIE1lZGlhU3RyZWFtVHJhY2sgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBNZWRpYVN0cmVhbVRyYWNrLmdldFNvdXJjZXMgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgTWVkaWFTdHJlYW1UcmFjay5nZXRTb3VyY2VzKGZ1bmN0aW9uKHNvdXJjZUluZm9zKSB7XHJcbiAgICAgICAgICAgIHZhciB2aWRlb1NvdXJjZUlkO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZUluZm9zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc291cmNlSW5mbyA9IHNvdXJjZUluZm9zW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZUluZm8ua2luZCA9PT0gXCJ2aWRlb1wiICYmIHNvdXJjZUluZm8uZmFjaW5nID09PSB2aWRlb0NvbnN0cmFpbnRzLmZhY2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZGVvU291cmNlSWQgPSBzb3VyY2VJbmZvLmlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0ge1xyXG4gICAgICAgICAgICAgICAgbWFuZGF0b3J5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluV2lkdGg6IHZpZGVvQ29uc3RyYWludHMud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluSGVpZ2h0OiB2aWRlb0NvbnN0cmFpbnRzLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICBtaW5Bc3BlY3RSYXRpbzogdmlkZW9Db25zdHJhaW50cy5taW5Bc3BlY3RSYXRpbyxcclxuICAgICAgICAgICAgICAgICAgICBtYXhBc3BlY3RSYXRpbzogdmlkZW9Db25zdHJhaW50cy5tYXhBc3BlY3RSYXRpb1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9wdGlvbmFsOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUlkOiB2aWRlb1NvdXJjZUlkXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gY2IoY29uc3RyYWludHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdHJhaW50cy52aWRlbyA9IHtcclxuICAgICAgICAgICAgbWVkaWFTb3VyY2U6IFwiY2FtZXJhXCIsXHJcbiAgICAgICAgICAgIHdpZHRoOiB7IG1pbjogdmlkZW9Db25zdHJhaW50cy53aWR0aCwgbWF4OiB2aWRlb0NvbnN0cmFpbnRzLndpZHRoIH0sXHJcbiAgICAgICAgICAgIGhlaWdodDogeyBtaW46IHZpZGVvQ29uc3RyYWludHMuaGVpZ2h0LCBtYXg6IHZpZGVvQ29uc3RyYWludHMuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgIHJlcXVpcmU6IFtcIndpZHRoXCIsIFwiaGVpZ2h0XCJdXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gY2IoY29uc3RyYWludHMpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVxdWVzdHMgdGhlIGJhY2stZmFjaW5nIGNhbWVyYSBvZiB0aGUgdXNlci4gVGhlIGNhbGxiYWNrIGlzIGNhbGxlZFxyXG4gKiB3aGVuZXZlciB0aGUgc3RyZWFtIGlzIHJlYWR5IHRvIGJlIGNvbnN1bWVkLCBvciBpZiBhbiBlcnJvciBvY2N1cmVzLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdmlkZW9cclxuICogQHBhcmFtIHtPYmplY3R9IGNhbGxiYWNrXHJcbiAqL1xyXG5mdW5jdGlvbiByZXF1ZXN0KHZpZGVvLCB2aWRlb0NvbnN0cmFpbnRzLCBjYWxsYmFjaykge1xyXG4gICAgbm9ybWFsaXplQ29uc3RyYWludHModmlkZW9Db25zdHJhaW50cywgZnVuY3Rpb24oY29uc3RyYWludHMpIHtcclxuICAgICAgICBpbml0Q2FtZXJhKGNvbnN0cmFpbnRzLCB2aWRlbywgY2FsbGJhY2spO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHJlcXVlc3Q6IGZ1bmN0aW9uKHZpZGVvLCBjb25zdHJhaW50cywgY2FsbGJhY2spIHtcclxuICAgICAgICByZXF1ZXN0KHZpZGVvLCBjb25zdHJhaW50cywgY2FsbGJhY2spO1xyXG4gICAgfSxcclxuICAgIHJlbGVhc2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB0cmFja3MgPSBzdHJlYW1SZWYgJiYgc3RyZWFtUmVmLmdldFZpZGVvVHJhY2tzKCk7XHJcbiAgICAgICAgaWYgKHRyYWNrcyAmJiB0cmFja3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRyYWNrc1swXS5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0cmVhbVJlZiA9IG51bGw7XHJcbiAgICB9XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2lucHV0L2NhbWVyYV9hY2Nlc3MuanNcbiAqKi8iLCJpbXBvcnQgSW1hZ2VEZWJ1ZyBmcm9tICcuLi9jb21tb24vaW1hZ2VfZGVidWcnO1xyXG5cclxuZnVuY3Rpb24gY29udGFpbnMoY29kZVJlc3VsdCwgbGlzdCkge1xyXG4gICAgaWYgKGxpc3QpIHtcclxuICAgICAgICByZXR1cm4gbGlzdC5zb21lKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhpdGVtKS5ldmVyeShmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbVtrZXldID09PSBjb2RlUmVzdWx0W2tleV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXNzZXNGaWx0ZXIoY29kZVJlc3VsdCwgZmlsdGVyKSB7XHJcbiAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHJldHVybiBmaWx0ZXIoY29kZVJlc3VsdCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihjb25maWcpIHtcclxuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSxcclxuICAgICAgICAgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSxcclxuICAgICAgICAgICAgcmVzdWx0cyA9IFtdLFxyXG4gICAgICAgICAgICBjYXBhY2l0eSA9IGNvbmZpZy5jYXBhY2l0eSB8fCAyMCxcclxuICAgICAgICAgICAgY2FwdHVyZSA9IGNvbmZpZy5jYXB0dXJlID09PSB0cnVlO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBtYXRjaGVzQ29uc3RyYWludHMoY29kZVJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2FwYWNpdHlcclxuICAgICAgICAgICAgICAgICYmIGNvZGVSZXN1bHRcclxuICAgICAgICAgICAgICAgICYmICFjb250YWlucyhjb2RlUmVzdWx0LCBjb25maWcuYmxhY2tsaXN0KVxyXG4gICAgICAgICAgICAgICAgJiYgcGFzc2VzRmlsdGVyKGNvZGVSZXN1bHQsIGNvbmZpZy5maWx0ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWRkUmVzdWx0OiBmdW5jdGlvbihkYXRhLCBpbWFnZVNpemUsIGNvZGVSZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlc0NvbnN0cmFpbnRzKGNvZGVSZXN1bHQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwYWNpdHktLTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuY29kZVJlc3VsdCA9IGNvZGVSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhcHR1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gaW1hZ2VTaXplLng7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBpbWFnZVNpemUueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3SW1hZ2UoZGF0YSwgaW1hZ2VTaXplLCBjdHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZnJhbWUgPSBjYW52YXMudG9EYXRhVVJMKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRSZXN1bHRzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9zcmMvYW5hbHl0aWNzL3Jlc3VsdF9jb2xsZWN0b3IuanNcbiAqKi8iLCJsZXQgY29uZmlnO1xyXG5cclxuaWYgKEVOVi5kZXZlbG9wbWVudCl7XHJcbiAgICBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZy5kZXYuanMnKTtcclxufSBlbHNlIGlmIChFTlYubm9kZSkge1xyXG4gICAgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcubm9kZS5qcycpO1xyXG59IGVsc2Uge1xyXG4gICAgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcucHJvZC5qcycpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmsvcXVhZ2dhSlMvc3JjL2NvbmZpZy9jb25maWcuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGlucHV0U3RyZWFtOiB7XHJcbiAgICAgICAgdHlwZTogXCJJbWFnZVN0cmVhbVwiLFxyXG4gICAgICAgIHNlcXVlbmNlOiBmYWxzZSxcclxuICAgICAgICBzaXplOiA4MDAsXHJcbiAgICAgICAgYXJlYToge1xyXG4gICAgICAgICAgICB0b3A6IFwiMCVcIixcclxuICAgICAgICAgICAgcmlnaHQ6IFwiMCVcIixcclxuICAgICAgICAgICAgbGVmdDogXCIwJVwiLFxyXG4gICAgICAgICAgICBib3R0b206IFwiMCVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2luZ2xlQ2hhbm5lbDogZmFsc2UgLy8gdHJ1ZTogb25seSB0aGUgcmVkIGNvbG9yLWNoYW5uZWwgaXMgcmVhZFxyXG4gICAgfSxcclxuICAgIGxvY2F0ZTogdHJ1ZSxcclxuICAgIG51bU9mV29ya2VyczogMCxcclxuICAgIGRlY29kZXI6IHtcclxuICAgICAgICByZWFkZXJzOiBbXHJcbiAgICAgICAgICAgICdjb2RlXzEyOF9yZWFkZXInXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIGxvY2F0b3I6IHtcclxuICAgICAgICBoYWxmU2FtcGxlOiB0cnVlLFxyXG4gICAgICAgIHBhdGNoU2l6ZTogXCJtZWRpdW1cIiAvLyB4LXNtYWxsLCBzbWFsbCwgbWVkaXVtLCBsYXJnZSwgeC1sYXJnZVxyXG4gICAgfVxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3JrL3F1YWdnYUpTL3NyYy9jb25maWcvY29uZmlnLm5vZGUuanNcbiAqKi8iLCJjb25zdCBHZXRQaXhlbHMgPSByZXF1aXJlKFwiZ2V0LXBpeGVsc1wiKTtcclxuXHJcbnZhciBJbnB1dFN0cmVhbSA9IHt9O1xyXG5cclxuSW5wdXRTdHJlYW0uY3JlYXRlSW1hZ2VTdHJlYW0gPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciB0aGF0ID0ge307XHJcbiAgICB2YXIgX2NvbmZpZyA9IG51bGw7XHJcblxyXG4gICAgdmFyIHdpZHRoID0gMCxcclxuICAgICAgICBoZWlnaHQgPSAwLFxyXG4gICAgICAgIGZyYW1lSWR4ID0gMCxcclxuICAgICAgICBwYXVzZWQgPSB0cnVlLFxyXG4gICAgICAgIGxvYWRlZCA9IGZhbHNlLFxyXG4gICAgICAgIGZyYW1lID0gbnVsbCxcclxuICAgICAgICBiYXNlVXJsLFxyXG4gICAgICAgIGVuZGVkID0gZmFsc2UsXHJcbiAgICAgICAgc2l6ZSxcclxuICAgICAgICBjYWxjdWxhdGVkV2lkdGgsXHJcbiAgICAgICAgY2FsY3VsYXRlZEhlaWdodCxcclxuICAgICAgICBfZXZlbnROYW1lcyA9IFsnY2FucmVjb3JkJywgJ2VuZGVkJ10sXHJcbiAgICAgICAgX2V2ZW50SGFuZGxlcnMgPSB7fSxcclxuICAgICAgICBfdG9wUmlnaHQgPSB7eDogMCwgeTogMH0sXHJcbiAgICAgICAgX2NhbnZhc1NpemUgPSB7eDogMCwgeTogMH07XHJcblxyXG4gICAgZnVuY3Rpb24gbG9hZEltYWdlcygpIHtcclxuICAgICAgICBsb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICBHZXRQaXhlbHMoYmFzZVVybCwgZnVuY3Rpb24oZXJyLCBwaXhlbHMpIHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgIGV4aXQoMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocGl4ZWxzLnNoYXBlKTtcclxuICAgICAgICAgICAgZnJhbWUgPSBwaXhlbHM7XHJcbiAgICAgICAgICAgIHdpZHRoID0gcGl4ZWxzLnNoYXBlWzBdO1xyXG4gICAgICAgICAgICBoZWlnaHQgPSBwaXhlbHMuc2hhcGVbMV07XHJcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRXaWR0aCA9IF9jb25maWcuc2l6ZSA/IHdpZHRoL2hlaWdodCA+IDEgPyBfY29uZmlnLnNpemUgOiBNYXRoLmZsb29yKCh3aWR0aC9oZWlnaHQpICogX2NvbmZpZy5zaXplKSA6IHdpZHRoO1xyXG4gICAgICAgICAgICBjYWxjdWxhdGVkSGVpZ2h0ID0gX2NvbmZpZy5zaXplID8gd2lkdGgvaGVpZ2h0ID4gMSA/IE1hdGguZmxvb3IoKGhlaWdodC93aWR0aCkgKiBfY29uZmlnLnNpemUpIDogX2NvbmZpZy5zaXplIDogaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgX2NhbnZhc1NpemUueCA9IGNhbGN1bGF0ZWRXaWR0aDtcclxuICAgICAgICAgICAgX2NhbnZhc1NpemUueSA9IGNhbGN1bGF0ZWRIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcHVibGlzaEV2ZW50KFwiY2FucmVjb3JkXCIsIFtdKTtcclxuICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHVibGlzaEV2ZW50KGV2ZW50TmFtZSwgYXJncykge1xyXG4gICAgICAgIHZhciBqLFxyXG4gICAgICAgICAgICBoYW5kbGVycyA9IF9ldmVudEhhbmRsZXJzW2V2ZW50TmFtZV07XHJcblxyXG4gICAgICAgIGlmIChoYW5kbGVycyAmJiBoYW5kbGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgaGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZXJzW2pdLmFwcGx5KHRoYXQsIGFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICB0aGF0LnRyaWdnZXIgPSBwdWJsaXNoRXZlbnQ7XHJcblxyXG4gICAgdGhhdC5nZXRXaWR0aCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBjYWxjdWxhdGVkV2lkdGg7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGN1bGF0ZWRIZWlnaHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2V0V2lkdGggPSBmdW5jdGlvbih3aWR0aCkge1xyXG4gICAgICAgIGNhbGN1bGF0ZWRXaWR0aCA9IHdpZHRoO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldEhlaWdodCA9IGZ1bmN0aW9uKGhlaWdodCkge1xyXG4gICAgICAgIGNhbGN1bGF0ZWRIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0UmVhbFdpZHRoID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHdpZHRoO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFJlYWxIZWlnaHQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gaGVpZ2h0O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldElucHV0U3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgX2NvbmZpZyA9IHN0cmVhbTtcclxuICAgICAgICBiYXNlVXJsID0gX2NvbmZpZy5zcmM7XHJcbiAgICAgICAgc2l6ZSA9IDE7XHJcbiAgICAgICAgbG9hZEltYWdlcygpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmVuZGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGVuZGVkO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldEF0dHJpYnV0ZSA9IGZ1bmN0aW9uKCkge307XHJcblxyXG4gICAgdGhhdC5nZXRDb25maWcgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gX2NvbmZpZztcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5wYXVzZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHBhdXNlZCA9IHRydWU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucGxheSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHBhdXNlZCA9IGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24odGltZSkge1xyXG4gICAgICAgIGZyYW1lSWR4ID0gdGltZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGYpIHtcclxuICAgICAgICBpZiAoX2V2ZW50TmFtZXMuaW5kZXhPZihldmVudCkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIGlmICghX2V2ZW50SGFuZGxlcnNbZXZlbnRdKSB7XHJcbiAgICAgICAgICAgICAgICBfZXZlbnRIYW5kbGVyc1tldmVudF0gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfZXZlbnRIYW5kbGVyc1tldmVudF0ucHVzaChmKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2V0VG9wUmlnaHQgPSBmdW5jdGlvbih0b3BSaWdodCkge1xyXG4gICAgICAgIF90b3BSaWdodC54ID0gdG9wUmlnaHQueDtcclxuICAgICAgICBfdG9wUmlnaHQueSA9IHRvcFJpZ2h0Lnk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0VG9wUmlnaHQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gX3RvcFJpZ2h0O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldENhbnZhc1NpemUgPSBmdW5jdGlvbihzaXplKSB7XHJcbiAgICAgICAgX2NhbnZhc1NpemUueCA9IHNpemUueDtcclxuICAgICAgICBfY2FudmFzU2l6ZS55ID0gc2l6ZS55O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldENhbnZhc1NpemUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gX2NhbnZhc1NpemU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0RnJhbWUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoIWxvYWRlZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZnJhbWU7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dFN0cmVhbTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9saWIvaW5wdXRfc3RyZWFtLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ2V0LXBpeGVsc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZ2V0LXBpeGVsc1wiXG4gKiogbW9kdWxlIGlkID0gNjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImNvbnN0IENWVXRpbHMgPSByZXF1aXJlKCcuLi9zcmMvY29tbW9uL2N2X3V0aWxzJyksXHJcbiAgICAgIE5kYXJyYXkgPSByZXF1aXJlKFwibmRhcnJheVwiKSxcclxuICAgICAgSW50ZXJwMkQgPSByZXF1aXJlKFwibmRhcnJheS1saW5lYXItaW50ZXJwb2xhdGVcIikuZDI7XHJcblxyXG52YXIgRnJhbWVHcmFiYmVyID0ge307XHJcblxyXG5GcmFtZUdyYWJiZXIuY3JlYXRlID0gZnVuY3Rpb24oaW5wdXRTdHJlYW0pIHtcclxuICAgIHZhciBfdGhhdCA9IHt9LFxyXG4gICAgICAgIF9zdHJlYW1Db25maWcgPSBpbnB1dFN0cmVhbS5nZXRDb25maWcoKSxcclxuICAgICAgICBfdmlkZW9fc2l6ZSA9IENWVXRpbHMuaW1hZ2VSZWYoaW5wdXRTdHJlYW0uZ2V0UmVhbFdpZHRoKCksIGlucHV0U3RyZWFtLmdldFJlYWxIZWlnaHQoKSksXHJcbiAgICAgICAgX2NhbnZhc1NpemUgPSBpbnB1dFN0cmVhbS5nZXRDYW52YXNTaXplKCksXHJcbiAgICAgICAgX3NpemUgPSBDVlV0aWxzLmltYWdlUmVmKGlucHV0U3RyZWFtLmdldFdpZHRoKCksIGlucHV0U3RyZWFtLmdldEhlaWdodCgpKSxcclxuICAgICAgICBfdG9wUmlnaHQgPSBpbnB1dFN0cmVhbS5nZXRUb3BSaWdodCgpLFxyXG4gICAgICAgIF9kYXRhID0gbmV3IFVpbnQ4QXJyYXkoX3NpemUueCAqIF9zaXplLnkpLFxyXG4gICAgICAgIF9ncmF5RGF0YSA9IG5ldyBVaW50OEFycmF5KF92aWRlb19zaXplLnggKiBfdmlkZW9fc2l6ZS55KSxcclxuICAgICAgICBfY2FudmFzRGF0YSA9IG5ldyBVaW50OEFycmF5KF9jYW52YXNTaXplLnggKiBfY2FudmFzU2l6ZS55KSxcclxuICAgICAgICBfZ3JheUltYWdlQXJyYXkgPSBOZGFycmF5KF9ncmF5RGF0YSwgW192aWRlb19zaXplLnksIF92aWRlb19zaXplLnhdKS50cmFuc3Bvc2UoMSwgMCksXHJcbiAgICAgICAgX2NhbnZhc0ltYWdlQXJyYXkgPSBOZGFycmF5KF9jYW52YXNEYXRhLCBbX2NhbnZhc1NpemUueSwgX2NhbnZhc1NpemUueF0pLnRyYW5zcG9zZSgxLCAwKSxcclxuICAgICAgICBfdGFyZ2V0SW1hZ2VBcnJheSA9IF9jYW52YXNJbWFnZUFycmF5LmhpKF90b3BSaWdodC54ICsgX3NpemUueCwgX3RvcFJpZ2h0LnkgKyBfc2l6ZS55KS5sbyhfdG9wUmlnaHQueCwgX3RvcFJpZ2h0LnkpLFxyXG4gICAgICAgIF9zdGVwU2l6ZVggPSBfdmlkZW9fc2l6ZS54L19jYW52YXNTaXplLngsXHJcbiAgICAgICAgX3N0ZXBTaXplWSA9IF92aWRlb19zaXplLnkvX2NhbnZhc1NpemUueTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIkZyYW1lR3JhYmJlclwiLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgdmlkZW9TaXplOiBfZ3JheUltYWdlQXJyYXkuc2hhcGUsXHJcbiAgICAgICAgY2FudmFzU2l6ZTogX2NhbnZhc0ltYWdlQXJyYXkuc2hhcGUsXHJcbiAgICAgICAgc3RlcFNpemU6IFtfc3RlcFNpemVYLCBfc3RlcFNpemVZXSxcclxuICAgICAgICBzaXplOiBfdGFyZ2V0SW1hZ2VBcnJheS5zaGFwZSxcclxuICAgICAgICB0b3BSaWdodDogX3RvcFJpZ2h0XHJcbiAgICB9KSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VzIHRoZSBnaXZlbiBhcnJheSBhcyBmcmFtZS1idWZmZXJcclxuICAgICAqL1xyXG4gICAgX3RoYXQuYXR0YWNoRGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBfZGF0YSA9IGRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdXNlZCBmcmFtZS1idWZmZXJcclxuICAgICAqL1xyXG4gICAgX3RoYXQuZ2V0RGF0YSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBfZGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGZXRjaGVzIGEgZnJhbWUgZnJvbSB0aGUgaW5wdXQtc3RyZWFtIGFuZCBwdXRzIGludG8gdGhlIGZyYW1lLWJ1ZmZlci5cclxuICAgICAqIFRoZSBpbWFnZS1kYXRhIGlzIGNvbnZlcnRlZCB0byBncmF5LXNjYWxlIGFuZCB0aGVuIGhhbGYtc2FtcGxlZCBpZiBjb25maWd1cmVkLlxyXG4gICAgICovXHJcbiAgICBfdGhhdC5ncmFiID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGZyYW1lID0gaW5wdXRTdHJlYW0uZ2V0RnJhbWUoKTtcclxuXHJcbiAgICAgICAgaWYgKGZyYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGVBbmRDcm9wKGZyYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgX3RoYXQuc2NhbGVBbmRDcm9wID0gZnVuY3Rpb24oZnJhbWUpIHtcclxuICAgICAgICB2YXIgeCxcclxuICAgICAgICAgICAgeTtcclxuXHJcbiAgICAgICAgLy8gMS4gY29tcHV0ZSBmdWxsLXNpemVkIGdyYXkgaW1hZ2VcclxuICAgICAgICBDVlV0aWxzLmNvbXB1dGVHcmF5KGZyYW1lLmRhdGEsIF9ncmF5RGF0YSk7XHJcblxyXG4gICAgICAgIC8vIDIuIGludGVycG9sYXRlXHJcbiAgICAgICAgZm9yICh5ID0gMDsgeSA8IF9jYW52YXNTaXplLnk7IHkrKykge1xyXG4gICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgX2NhbnZhc1NpemUueDsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICBfY2FudmFzSW1hZ2VBcnJheS5zZXQoeCwgeSwgKEludGVycDJEKF9ncmF5SW1hZ2VBcnJheSwgeCAqIF9zdGVwU2l6ZVgsIHkgKiBfc3RlcFNpemVZKSkgfCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdGFyZ2V0SW1hZ2VBcnJheSBtdXN0IGJlIGVxdWFsIHRvIHRhcmdldFNpemVcclxuICAgICAgICBpZiAoX3RhcmdldEltYWdlQXJyYXkuc2hhcGVbMF0gIT09IF9zaXplLnggfHxcclxuICAgICAgICAgICAgX3RhcmdldEltYWdlQXJyYXkuc2hhcGVbMV0gIT09IF9zaXplLnkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hhcGVzIGRvIG5vdCBtYXRjaCFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAzLiBjcm9wXHJcbiAgICAgICAgZm9yICh5ID0gMDsgeSA8IF9zaXplLnk7IHkrKykge1xyXG4gICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgX3NpemUueDsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICBfZGF0YVt5ICogX3NpemUueCArIHhdID0gX3RhcmdldEltYWdlQXJyYXkuZ2V0KHgsIHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfdGhhdC5nZXRTaXplID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zaXplO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gX3RoYXQ7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZyYW1lR3JhYmJlcjtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29yay9xdWFnZ2FKUy9saWIvZnJhbWVfZ3JhYmJlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5kYXJyYXlcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIm5kYXJyYXlcIlxuICoqIG1vZHVsZSBpZCA9IDY3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZGFycmF5LWxpbmVhci1pbnRlcnBvbGF0ZVwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwibmRhcnJheS1saW5lYXItaW50ZXJwb2xhdGVcIlxuICoqIG1vZHVsZSBpZCA9IDY4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9