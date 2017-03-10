(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("get-pixels"), require("ndarray"), require("ndarray-linear-interpolate"));
	else if(typeof define === 'function' && define.amd)
		define(["get-pixels", "ndarray", "ndarray-linear-interpolate"], factory);
	else if(typeof exports === 'object')
		exports["Quagga"] = factory(require("get-pixels"), require("ndarray"), require("ndarray-linear-interpolate"));
	else
		root["Quagga"] = factory(root["get-pixels"], root["ndarray"], root["ndarray-linear-interpolate"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_162__, __WEBPACK_EXTERNAL_MODULE_163__, __WEBPACK_EXTERNAL_MODULE_164__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 165);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
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
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _merge2 = __webpack_require__(28);

var _merge3 = _interopRequireDefault(_merge2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _barcode_reader = __webpack_require__(5);

var _barcode_reader2 = _interopRequireDefault(_barcode_reader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EANReader(opts, supplements) {
    opts = (0, _merge3.default)(getDefaulConfig(), opts);
    _barcode_reader2.default.call(this, opts, supplements);
}

function getDefaulConfig() {
    var config = {};

    Object.keys(EANReader.CONFIG_KEYS).forEach(function (key) {
        config[key] = EANReader.CONFIG_KEYS[key].default;
    });
    return config;
}

var properties = {
    CODE_L_START: { value: 0 },
    CODE_G_START: { value: 10 },
    START_PATTERN: { value: [1, 1, 1] },
    STOP_PATTERN: { value: [1, 1, 1] },
    MIDDLE_PATTERN: { value: [1, 1, 1, 1, 1] },
    EXTENSION_START_PATTERN: { value: [1, 1, 2] },
    CODE_PATTERN: { value: [[3, 2, 1, 1], [2, 2, 2, 1], [2, 1, 2, 2], [1, 4, 1, 1], [1, 1, 3, 2], [1, 2, 3, 1], [1, 1, 1, 4], [1, 3, 1, 2], [1, 2, 1, 3], [3, 1, 1, 2], [1, 1, 2, 3], [1, 2, 2, 2], [2, 2, 1, 2], [1, 1, 4, 1], [2, 3, 1, 1], [1, 3, 2, 1], [4, 1, 1, 1], [2, 1, 3, 1], [3, 1, 2, 1], [2, 1, 1, 3]] },
    CODE_FREQUENCY: { value: [0, 11, 13, 14, 19, 25, 28, 21, 22, 26] },
    SINGLE_CODE_ERROR: { value: 0.70 },
    AVG_CODE_ERROR: { value: 0.48 },
    FORMAT: { value: "ean_13", writeable: false }
};

EANReader.prototype = Object.create(_barcode_reader2.default.prototype, properties);
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
        error;

    if (!coderange) {
        coderange = self.CODE_PATTERN.length;
    }

    for (i = offset; i < self._row.length; i++) {
        if (self._row[i] ^ isWhite) {
            counter[counterPos]++;
        } else {
            if (counterPos === counter.length - 1) {
                for (code = 0; code < coderange; code++) {
                    error = self._matchPattern(counter, self.CODE_PATTERN[code]);
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
        sum;

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
                error = self._matchPattern(counter, pattern);

                if (error < epsilon) {
                    bestMatch.error = error;
                    bestMatch.start = i - sum;
                    bestMatch.end = i;
                    return bestMatch;
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
        decodedCodes = [],
        resultInfo = {};

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

    if (this.supplements.length > 0) {
        var ext = this._decodeExtensions(code.end);
        if (!ext) {
            return null;
        }
        var lastCode = ext.decodedCodes[ext.decodedCodes.length - 1],
            endInfo = {
            start: lastCode.start + ((lastCode.end - lastCode.start) / 2 | 0),
            end: lastCode.end
        };
        if (!self._verifyTrailingWhitespace(endInfo)) {
            return null;
        }
        resultInfo = {
            supplement: ext,
            code: result.join("") + ext.code
        };
    }

    return _extends({
        code: result.join(""),
        start: startInfo.start,
        end: code.end,
        codeset: "",
        startInfo: startInfo,
        decodedCodes: decodedCodes
    }, resultInfo);
};

EANReader.prototype._decodeExtensions = function (offset) {
    var i,
        start = this._nextSet(this._row, offset),
        startInfo = this._findPattern(this.EXTENSION_START_PATTERN, start, false, false),
        result;

    if (startInfo === null) {
        return null;
    }

    for (i = 0; i < this.supplements.length; i++) {
        result = this.supplements[i].decode(this._row, startInfo.end);
        if (result !== null) {
            return {
                code: result.code,
                start: start,
                startInfo: startInfo,
                end: result.end,
                codeset: "",
                decodedCodes: result.decodedCodes
            };
        }
    }
    return null;
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

EANReader.CONFIG_KEYS = {
    supplements: {
        'type': 'arrayOf(string)',
        'default': [],
        'description': 'Allowed extensions to be decoded (2 and/or 5)'
    }
};

exports.default = EANReader;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(38);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function BarcodeReader(config, supplements) {
    this._row = [];
    this.config = config || {};
    this.supplements = supplements;
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

BarcodeReader.prototype._matchPattern = function (counter, code, maxSingleError) {
    var i,
        error = 0,
        singleError = 0,
        sum = 0,
        modulo = 0,
        barWidth,
        count,
        scaled;

    maxSingleError = maxSingleError || this.SINGLE_CODE_ERROR || 1;

    for (i = 0; i < counter.length; i++) {
        sum += counter[i];
        modulo += code[i];
    }
    if (sum < modulo) {
        return Number.MAX_VALUE;
    }
    barWidth = sum / modulo;
    maxSingleError *= barWidth;

    for (i = 0; i < counter.length; i++) {
        count = counter[i];
        scaled = code[i] * barWidth;
        singleError = Math.abs(count - scaled) / scaled;
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

BarcodeReader.prototype._correctBars = function (counter, correction, indices) {
    var length = indices.length,
        tmp = 0;
    while (length--) {
        tmp = counter[indices[length]] * (1 - (1 - correction) / 2);
        if (tmp > 1) {
            counter[indices[length]] = tmp;
        }
    }
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

exports.default = BarcodeReader;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = clone

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
function clone(a) {
    var out = new Float32Array(2)
    out[0] = a[0]
    out[1] = a[1]
    return out
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(11),
    getRawTag = __webpack_require__(115),
    objectToString = __webpack_require__(142);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = {
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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = {
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

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(129),
    listCacheDelete = __webpack_require__(130),
    listCacheGet = __webpack_require__(131),
    listCacheHas = __webpack_require__(132),
    listCacheSet = __webpack_require__(133);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(3);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(17);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(1),
    isKey = __webpack_require__(126),
    stringToPath = __webpack_require__(150),
    toString = __webpack_require__(161);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(127);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(22);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(92),
    isObjectLike = __webpack_require__(4);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports._dimensionsConverters = exports.ERODE = exports.DILATE = exports.Tracer = undefined;
exports.imageRef = imageRef;
exports.computeIntegralImage2 = computeIntegralImage2;
exports.computeIntegralImage = computeIntegralImage;
exports.thresholdImage = thresholdImage;
exports.computeHistogram = computeHistogram;
exports.sharpenLine = sharpenLine;
exports.determineOtsuThreshold = determineOtsuThreshold;
exports.otsuThreshold = otsuThreshold;
exports.computeBinaryImage = computeBinaryImage;
exports.cluster = cluster;
exports.dilate = dilate;
exports.erode = erode;
exports.subtract = subtract;
exports.bitwiseOr = bitwiseOr;
exports.countNonZero = countNonZero;
exports.topGeneric = topGeneric;
exports.grayArrayFromImage = grayArrayFromImage;
exports.grayArrayFromContext = grayArrayFromContext;
exports.grayAndHalfSampleFromCanvasData = grayAndHalfSampleFromCanvasData;
exports.computeGray = computeGray;
exports.loadImageArray = loadImageArray;
exports.halfSample = halfSample;
exports.hsv2rgb = hsv2rgb;
exports._computeDivisors = _computeDivisors;
exports.calculatePatchSize = calculatePatchSize;
exports._parseCSSDimensionValues = _parseCSSDimensionValues;
exports.computeImageArea = computeImageArea;

var _cluster = __webpack_require__(52);

var _cluster2 = _interopRequireDefault(_cluster);

var _array_helper = __webpack_require__(8);

var _array_helper2 = _interopRequireDefault(_array_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vec2 = {
    clone: __webpack_require__(6)
};
var vec3 = {
    clone: __webpack_require__(79)
};

/**
 * @param x x-coordinate
 * @param y y-coordinate
 * @return ImageReference {x,y} Coordinate
 */
function imageRef(x, y) {
    var that = {
        x: x,
        y: y,
        toVec2: function toVec2() {
            return vec2.clone([this.x, this.y]);
        },
        toVec3: function toVec3() {
            return vec3.clone([this.x, this.y, 1]);
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
function computeIntegralImage2(imageWrapper, integralWrapper) {
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

function computeIntegralImage(imageWrapper, integralWrapper) {
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

function thresholdImage(imageWrapper, threshold, targetWrapper) {
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

function computeHistogram(imageWrapper, bitsPerPixel) {
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

function sharpenLine(line) {
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

function determineOtsuThreshold(imageWrapper, bitsPerPixel) {
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

        hist = computeHistogram(imageWrapper, bitsPerPixel);
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
        return _array_helper2.default.maxIndex(vet);
    }

    threshold = determineThreshold();
    return threshold << bitShift;
};

function otsuThreshold(imageWrapper, targetWrapper) {
    var threshold = determineOtsuThreshold(imageWrapper);

    thresholdImage(imageWrapper, threshold, targetWrapper);
    return threshold;
};

// local thresholding
function computeBinaryImage(imageWrapper, integralWrapper, targetWrapper) {
    computeIntegralImage(imageWrapper, integralWrapper);

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

function cluster(points, threshold, property) {
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
        point = _cluster2.default.createPoint(points[i], i, property);
        if (!addToCluster(point)) {
            clusters.push(_cluster2.default.create(point, threshold));
        }
    }
    return clusters;
};

var Tracer = exports.Tracer = {
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

var DILATE = exports.DILATE = 1;
var ERODE = exports.ERODE = 2;

function dilate(inImageWrapper, outImageWrapper) {
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

function erode(inImageWrapper, outImageWrapper) {
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

function subtract(aImageWrapper, bImageWrapper, resultImageWrapper) {
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

function bitwiseOr(aImageWrapper, bImageWrapper, resultImageWrapper) {
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

function countNonZero(imageWrapper) {
    var length = imageWrapper.data.length,
        data = imageWrapper.data,
        sum = 0;

    while (length--) {
        sum += data[length];
    }
    return sum;
};

function topGeneric(list, top, scoreFunc) {
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

function grayArrayFromImage(htmlImage, offsetX, ctx, array) {
    ctx.drawImage(htmlImage, offsetX, 0, htmlImage.width, htmlImage.height);
    var ctxData = ctx.getImageData(offsetX, 0, htmlImage.width, htmlImage.height).data;
    computeGray(ctxData, array);
};

function grayArrayFromContext(ctx, size, offset, array) {
    var ctxData = ctx.getImageData(offset.x, offset.y, size.x, size.y).data;
    computeGray(ctxData, array);
};

function grayAndHalfSampleFromCanvasData(canvasData, size, outArray) {
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

function computeGray(imageData, outArray, config) {
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

function loadImageArray(src, callback, canvas) {
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
        computeGray(data, array);
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
function halfSample(inImgWrapper, outImgWrapper) {
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

function hsv2rgb(hsv, rgb) {
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

function _computeDivisors(n) {
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

function _computeIntersection(arr1, arr2) {
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

function calculatePatchSize(patchSize, imgSize) {
    var divisorsX = _computeDivisors(imgSize.x),
        divisorsY = _computeDivisors(imgSize.y),
        wideSide = Math.max(imgSize.x, imgSize.y),
        common = _computeIntersection(divisorsX, divisorsY),
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
        optimalPatchSize = findPatchSizeForDivisors(_computeDivisors(wideSide));
        if (!optimalPatchSize) {
            optimalPatchSize = findPatchSizeForDivisors(_computeDivisors(desiredPatchSize * nrOfPatches));
        }
    }
    return optimalPatchSize;
};

function _parseCSSDimensionValues(value) {
    var dimension = {
        value: parseFloat(value),
        unit: value.indexOf("%") === value.length - 1 ? "%" : "%"
    };

    return dimension;
};

var _dimensionsConverters = exports._dimensionsConverters = {
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

function computeImageArea(inputWidth, inputHeight, area) {
    var context = { width: inputWidth, height: inputHeight };

    var parsedArea = Object.keys(area).reduce(function (result, key) {
        var value = area[key],
            parsed = _parseCSSDimensionValues(value),
            calculated = _dimensionsConverters[key](parsed, context);

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

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _subImage = __webpack_require__(55);

var _subImage2 = _interopRequireDefault(_subImage);

var _cv_utils = __webpack_require__(19);

var _array_helper = __webpack_require__(8);

var _array_helper2 = _interopRequireDefault(_array_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vec2 = {
    clone: __webpack_require__(6)
};

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
                _array_helper2.default.init(this.data, 0);
            }
        } else {
            this.data = new Uint8Array(size.x * size.y);
            if (Uint8Array === Array && initialize) {
                _array_helper2.default.init(this.data, 0);
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
    return new _subImage2.default(from, size, this);
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
            label.vec = vec2.clone([Math.cos(tmp), Math.sin(tmp)]);
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
        result = hsv[0] <= 0 ? whiteRgb : hsv[0] >= 360 ? blackRgb : (0, _cv_utils.hsv2rgb)(hsv, rgb);
        data[length * 4 + 0] = result[0];
        data[length * 4 + 1] = result[1];
        data[length * 4 + 2] = result[2];
        data[length * 4 + 3] = 255;
    }
    ctx.putImageData(frame, from.x, from.y);
};

exports.default = ImageWrapper;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(37);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(93),
    getValue = __webpack_require__(116);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(27);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(25),
    isLength = __webpack_require__(26);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(7),
    isObject = __webpack_require__(0);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(7),
    isObjectLike = __webpack_require__(4);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var baseMerge = __webpack_require__(96),
    createAssigner = __webpack_require__(112);

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

module.exports = merge;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * http://www.codeproject.com/Tips/407172/Connected-Component-Labeling-and-Vectorization
 */
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

exports.default = Tracer;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _barcode_reader = __webpack_require__(5);

var _barcode_reader2 = _interopRequireDefault(_barcode_reader);

var _array_helper = __webpack_require__(8);

var _array_helper2 = _interopRequireDefault(_array_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Code39Reader() {
    _barcode_reader2.default.call(this);
}

var properties = {
    ALPHABETH_STRING: { value: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. *$/+%" },
    ALPHABET: { value: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 45, 46, 32, 42, 36, 47, 43, 37] },
    CHARACTER_ENCODINGS: { value: [0x034, 0x121, 0x061, 0x160, 0x031, 0x130, 0x070, 0x025, 0x124, 0x064, 0x109, 0x049, 0x148, 0x019, 0x118, 0x058, 0x00D, 0x10C, 0x04C, 0x01C, 0x103, 0x043, 0x142, 0x013, 0x112, 0x052, 0x007, 0x106, 0x046, 0x016, 0x181, 0x0C1, 0x1C0, 0x091, 0x190, 0x0D0, 0x085, 0x184, 0x0C4, 0x094, 0x0A8, 0x0A2, 0x08A, 0x02A] },
    ASTERISK: { value: 0x094 },
    FORMAT: { value: "code_39", writeable: false }
};

Code39Reader.prototype = Object.create(_barcode_reader2.default.prototype, properties);
Code39Reader.prototype.constructor = Code39Reader;

Code39Reader.prototype._toCounters = function (start, counter) {
    var self = this,
        numCounters = counter.length,
        end = self._row.length,
        isWhite = !self._row[start],
        i,
        counterPos = 0;

    _array_helper2.default.init(counter, 0);

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
        nextStart += _array_helper2.default.sum(counters);
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
        patternSize = _array_helper2.default.sum(counters);

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

exports.default = Code39Reader;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = dot

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1]
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(22),
    root = __webpack_require__(3);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(134),
    mapCacheDelete = __webpack_require__(135),
    mapCacheGet = __webpack_require__(136),
    mapCacheHas = __webpack_require__(137),
    mapCacheSet = __webpack_require__(138);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(21),
    eq = __webpack_require__(17);

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignMergeValue;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(21),
    eq = __webpack_require__(17);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(22);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(47)))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(143);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),
/* 40 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(83);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__(102),
    shortOut = __webpack_require__(144);

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),
/* 43 */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(3),
    stubFalse = __webpack_require__(159);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)(module)))

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(94),
    baseUnary = __webpack_require__(105),
    nodeUtil = __webpack_require__(141);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(84),
    baseKeysIn = __webpack_require__(95),
    isArrayLike = __webpack_require__(24);

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
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
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),
/* 47 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _merge2 = __webpack_require__(28);

var _merge3 = _interopRequireDefault(_merge2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // eslint-disable-line no-unused-vars


var _typedefs = __webpack_require__(56);

var _typedefs2 = _interopRequireDefault(_typedefs);

var _image_wrapper = __webpack_require__(20);

var _image_wrapper2 = _interopRequireDefault(_image_wrapper);

var _barcode_locator = __webpack_require__(62);

var _barcode_locator2 = _interopRequireDefault(_barcode_locator);

var _barcode_decoder = __webpack_require__(59);

var _barcode_decoder2 = _interopRequireDefault(_barcode_decoder);

var _events = __webpack_require__(53);

var _events2 = _interopRequireDefault(_events);

var _camera_access = __webpack_require__(61);

var _camera_access2 = _interopRequireDefault(_camera_access);

var _image_debug = __webpack_require__(9);

var _image_debug2 = _interopRequireDefault(_image_debug);

var _result_collector = __webpack_require__(51);

var _result_collector2 = _interopRequireDefault(_result_collector);

var _config2 = __webpack_require__(57);

var _config3 = _interopRequireDefault(_config2);

var _input_stream = __webpack_require__(50);

var _input_stream2 = _interopRequireDefault(_input_stream);

var _frame_grabber = __webpack_require__(49);

var _frame_grabber2 = _interopRequireDefault(_frame_grabber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vec2 = {
    clone: __webpack_require__(6)
};

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
    _decoder = _barcode_decoder2.default.create(_config.decoder, _inputImageWrapper);
}

function initInputStream(cb) {
    var video;
    if (_config.inputStream.type === "VideoStream") {
        video = document.createElement("video");
        _inputStream = _input_stream2.default.createVideoStream(video);
    } else if (_config.inputStream.type === "ImageStream") {
        _inputStream = _input_stream2.default.createImageStream();
    } else if (_config.inputStream.type === "LiveStream") {
        var $viewport = getViewPort();
        if ($viewport) {
            video = $viewport.querySelector("video");
            if (!video) {
                video = document.createElement("video");
                $viewport.appendChild(video);
            }
        }
        _inputStream = _input_stream2.default.createLiveStream(video);
        _camera_access2.default.request(video, _config.inputStream.constraints).then(function () {
            _inputStream.trigger("canrecord");
        }).catch(function (err) {
            return cb(err);
        });
    }

    _inputStream.setAttribute("preload", "auto");
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
    _barcode_locator2.default.checkImageConstraints(_inputStream, _config.locator);
    initCanvas(_config);
    _framegrabber = _frame_grabber2.default.create(_inputStream, _canvasContainer.dom.image);

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
        _inputImageWrapper = new _image_wrapper2.default({
            x: _inputStream.getWidth(),
            y: _inputStream.getHeight()
        });
    }

    if (false) {
        console.log(_inputImageWrapper.size);
    }
    _boxSize = [vec2.clone([0, 0]), vec2.clone([0, _inputImageWrapper.size.y]), vec2.clone([_inputImageWrapper.size.x, _inputImageWrapper.size.y]), vec2.clone([_inputImageWrapper.size.x, 0])];
    _barcode_locator2.default.init(_inputImageWrapper, _config.locator);
}

function getBoundingBoxes() {
    if (_config.locate) {
        return _barcode_locator2.default.locate();
    } else {
        return [[vec2.clone(_boxSize[0]), vec2.clone(_boxSize[1]), vec2.clone(_boxSize[2]), vec2.clone(_boxSize[3])]];
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
    var resultToPublish = result;

    if (result && _onUIThread) {
        transformResult(result);
        addResult(result, imageData);
        resultToPublish = result.barcodes || result;
    }

    _events2.default.publish("processed", resultToPublish);
    if (hasCodeResult(result)) {
        _events2.default.publish("detected", resultToPublish);
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
        config: configForWorker(_config)
    }, [workerThread.imageData.buffer]);
}

function configForWorker(config) {
    return _extends({}, config, {
        inputStream: _extends({}, config.inputStream, {
            target: null
        })
    });
}

function workerInterface(factory) {
    /* eslint-disable no-undef*/
    if (factory) {
        var Quagga = factory().default;
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

exports.default = {
    init: function init(config, cb, imageWrapper) {
        _config = (0, _merge3.default)({}, _config3.default, config);
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
            _camera_access2.default.release();
            _inputStream.clearEventHandlers();
        }
    },
    pause: function pause() {
        _stopped = true;
    },
    onDetected: function onDetected(callback) {
        _events2.default.subscribe("detected", callback);
    },
    offDetected: function offDetected(callback) {
        _events2.default.unsubscribe("detected", callback);
    },
    onProcessed: function onProcessed(callback) {
        _events2.default.subscribe("processed", callback);
    },
    offProcessed: function offProcessed(callback) {
        _events2.default.unsubscribe("processed", callback);
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
        var _this = this;

        config = (0, _merge3.default)({
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
            _events2.default.once("processed", function (result) {
                _this.stop();
                resultCallback.call(null, result);
            }, true);
            _start();
        });
    },
    ImageWrapper: _image_wrapper2.default,
    ImageDebug: _image_debug2.default,
    ResultCollector: _result_collector2.default,
    CameraAccess: _camera_access2.default
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CVUtils = __webpack_require__(19),
    Ndarray = __webpack_require__(163),
    Interp2D = __webpack_require__(164).d2;

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

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetPixels = __webpack_require__(162);

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

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _image_debug = __webpack_require__(9);

var _image_debug2 = _interopRequireDefault(_image_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

exports.default = {
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
                        _image_debug2.default.drawImage(data, imageSize, ctx);
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

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var vec2 = {
    clone: __webpack_require__(6),
    dot: __webpack_require__(32)
};
/**
 * Creates a cluster for grouping similar orientations of datapoints
 */
exports.default = {
    create: function create(point, threshold) {
        var points = [],
            center = {
            rad: 0,
            vec: vec2.clone([0, 0])
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
            center.vec = vec2.clone([Math.cos(center.rad), Math.sin(center.rad)]);
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
                var similarity = Math.abs(vec2.dot(otherPoint.point.vec, center.vec));
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

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function () {
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

            // Publish one-time subscriptions
            subscribers.filter(function (subscriber) {
                return !!subscriber.once;
            }).forEach(function (subscriber) {
                publishSubscription(subscriber, data);
            });

            // remove them from the subscriber
            event.subscribers = subscribers.filter(function (subscriber) {
                return !subscriber.once;
            });

            // publish the rest
            event.subscribers.forEach(function (subscriber) {
                publishSubscription(subscriber, data);
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
}();

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.enumerateDevices = enumerateDevices;
exports.getUserMedia = getUserMedia;
function enumerateDevices() {
    if (navigator.mediaDevices && typeof navigator.mediaDevices.enumerateDevices === 'function') {
        return navigator.mediaDevices.enumerateDevices();
    }
    return Promise.reject(new Error('enumerateDevices is not defined'));
};

function getUserMedia(constraints) {
    if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
        return navigator.mediaDevices.getUserMedia(constraints);
    }
    return Promise.reject(new Error('getUserMedia is not defined'));
}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * Construct representing a part of another {ImageWrapper}. Shares data
 * between the parent and the child.
 * @param from {ImageRef} The position where to start the {SubImage} from. (top-left corner)
 * @param size {ImageRef} The size of the resulting image
 * @param I {ImageWrapper} The {ImageWrapper} to share from
 * @returns {SubImage} A shared part of the original image
 */
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

exports.default = SubImage;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * typedefs.js
 * Normalizes browser-specific prefixes
 */

if (typeof window !== 'undefined') {
    window.requestAnimFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function ( /* function FrameRequestCallback */callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    }();
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

if (typeof Object.assign !== 'function') {
    Object.assign = function (target) {
        // .length of function is 2
        'use strict';

        if (target === null) {
            // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];

            if (nextSource !== null) {
                // Skip over if undefined or null
                for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var config = void 0;

if (false) {
    config = require('./config.dev.js');
} else if (true) {
    config = __webpack_require__(58);
} else {
    config = require('./config.prod.js');
}

exports.default = config;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _bresenham = __webpack_require__(60);

var _bresenham2 = _interopRequireDefault(_bresenham);

var _image_debug = __webpack_require__(9);

var _image_debug2 = _interopRequireDefault(_image_debug);

var _code_128_reader = __webpack_require__(66);

var _code_128_reader2 = _interopRequireDefault(_code_128_reader);

var _ean_reader = __webpack_require__(2);

var _ean_reader2 = _interopRequireDefault(_ean_reader);

var _code_39_reader = __webpack_require__(31);

var _code_39_reader2 = _interopRequireDefault(_code_39_reader);

var _code_39_vin_reader = __webpack_require__(67);

var _code_39_vin_reader2 = _interopRequireDefault(_code_39_vin_reader);

var _codabar_reader = __webpack_require__(65);

var _codabar_reader2 = _interopRequireDefault(_codabar_reader);

var _upc_reader = __webpack_require__(73);

var _upc_reader2 = _interopRequireDefault(_upc_reader);

var _ean_8_reader = __webpack_require__(70);

var _ean_8_reader2 = _interopRequireDefault(_ean_8_reader);

var _ean_2_reader = __webpack_require__(68);

var _ean_2_reader2 = _interopRequireDefault(_ean_2_reader);

var _ean_5_reader = __webpack_require__(69);

var _ean_5_reader2 = _interopRequireDefault(_ean_5_reader);

var _upc_e_reader = __webpack_require__(72);

var _upc_e_reader2 = _interopRequireDefault(_upc_e_reader);

var _i2of5_reader = __webpack_require__(71);

var _i2of5_reader2 = _interopRequireDefault(_i2of5_reader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var READERS = {
    code_128_reader: _code_128_reader2.default,
    ean_reader: _ean_reader2.default,
    ean_5_reader: _ean_5_reader2.default,
    ean_2_reader: _ean_2_reader2.default,
    ean_8_reader: _ean_8_reader2.default,
    code_39_reader: _code_39_reader2.default,
    code_39_vin_reader: _code_39_vin_reader2.default,
    codabar_reader: _codabar_reader2.default,
    upc_reader: _upc_reader2.default,
    upc_e_reader: _upc_e_reader2.default,
    i2of5_reader: _i2of5_reader2.default
};
exports.default = {
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
                    configuration = {},
                    supplements = [];

                if ((typeof readerConfig === 'undefined' ? 'undefined' : _typeof(readerConfig)) === 'object') {
                    reader = readerConfig.format;
                    configuration = readerConfig.config;
                } else if (typeof readerConfig === 'string') {
                    reader = readerConfig;
                }
                if (false) {
                    console.log("Before registering reader: ", reader);
                }
                if (configuration.supplements) {
                    supplements = configuration.supplements.map(function (supplement) {
                        return new READERS[supplement]();
                    });
                }
                _barcodeReaders.push(new READERS[reader](configuration, supplements));
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
                barcodeLine = _bresenham2.default.getBarcodeLine(inputImageWrapper, line[0], line[1]);

            if (false) {
                _image_debug2.default.drawPath(line, { x: 'x', y: 'y' }, _canvas.ctx.overlay, { color: 'red', lineWidth: 3 });
                _bresenham2.default.debug.printFrequency(barcodeLine.line, _canvas.dom.frequency);
            }

            _bresenham2.default.toBinaryLine(barcodeLine);

            if (false) {
                _bresenham2.default.debug.printPattern(barcodeLine.line, _canvas.dom.pattern);
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
                    _image_debug2.default.drawPath(box, { x: 0, y: 1 }, ctx, { color: "blue", lineWidth: 2 });
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
                _image_debug2.default.drawPath(line, { x: 'x', y: 'y' }, ctx, { color: 'red', lineWidth: 3 });
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

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _image_wrapper = __webpack_require__(20);

var _image_wrapper2 = _interopRequireDefault(_image_wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

exports.default = Bresenham;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _pick2 = __webpack_require__(158);

var _pick3 = _interopRequireDefault(_pick2);

exports.pickConstraints = pickConstraints;

var _mediaDevices = __webpack_require__(54);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var facingMatching = {
    "user": /front/i,
    "environment": /back/i
};

var streamRef;

function waitForVideo(video) {
    return new Promise(function (resolve, reject) {
        var attempts = 10;

        function checkVideo() {
            if (attempts > 0) {
                if (video.videoWidth > 0 && video.videoHeight > 0) {
                    if (false) {
                        console.log(video.videoWidth + "px x " + video.videoHeight + "px");
                    }
                    resolve();
                } else {
                    window.setTimeout(checkVideo, 500);
                }
            } else {
                reject('Unable to play video stream. Is webcam working?');
            }
            attempts--;
        }
        checkVideo();
    });
}

/**
 * Tries to attach the camera-stream to a given video-element
 * and calls the callback function when the content is ready
 * @param {Object} constraints
 * @param {Object} video
 */
function initCamera(video, constraints) {
    return (0, _mediaDevices.getUserMedia)(constraints).then(function (stream) {
        return new Promise(function (resolve) {
            streamRef = stream;
            video.setAttribute("autoplay", 'true');
            video.srcObject = stream;
            video.addEventListener('loadedmetadata', function () {
                video.play();
                resolve();
            });
        });
    }).then(waitForVideo.bind(null, video));
}

function deprecatedConstraints(videoConstraints) {
    var normalized = (0, _pick3.default)(videoConstraints, ["width", "height", "facingMode", "aspectRatio", "deviceId"]);

    if (typeof videoConstraints.minAspectRatio !== 'undefined' && videoConstraints.minAspectRatio > 0) {
        normalized.aspectRatio = videoConstraints.minAspectRatio;
        console.log("WARNING: Constraint 'minAspectRatio' is deprecated; Use 'aspectRatio' instead");
    }
    if (typeof videoConstraints.facing !== 'undefined') {
        normalized.facingMode = videoConstraints.facing;
        console.log("WARNING: Constraint 'facing' is deprecated. Use 'facingMode' instead'");
    }
    return normalized;
}

function pickConstraints(videoConstraints) {
    var normalizedConstraints = {
        audio: false,
        video: deprecatedConstraints(videoConstraints)
    };

    if (normalizedConstraints.video.deviceId && normalizedConstraints.video.facingMode) {
        delete normalizedConstraints.video.facingMode;
    }
    return Promise.resolve(normalizedConstraints);
}

function enumerateVideoDevices() {
    return (0, _mediaDevices.enumerateDevices)().then(function (devices) {
        return devices.filter(function (device) {
            return device.kind === 'videoinput';
        });
    });
}

exports.default = {
    request: function request(video, videoConstraints) {
        return pickConstraints(videoConstraints).then(initCamera.bind(null, video));
    },
    release: function release() {
        var tracks = streamRef && streamRef.getVideoTracks();
        if (tracks && tracks.length) {
            tracks[0].stop();
        }
        streamRef = null;
    },
    enumerateVideoDevices: enumerateVideoDevices,
    getActiveStreamLabel: function getActiveStreamLabel() {
        if (streamRef) {
            var tracks = streamRef.getVideoTracks();
            if (tracks && tracks.length) {
                return tracks[0].label;
            }
        }
    }
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

exports.__esModule = true;

var _image_wrapper = __webpack_require__(20);

var _image_wrapper2 = _interopRequireDefault(_image_wrapper);

var _cv_utils = __webpack_require__(19);

var _array_helper = __webpack_require__(8);

var _array_helper2 = _interopRequireDefault(_array_helper);

var _image_debug = __webpack_require__(9);

var _image_debug2 = _interopRequireDefault(_image_debug);

var _rasterizer = __webpack_require__(63);

var _rasterizer2 = _interopRequireDefault(_rasterizer);

var _tracer = __webpack_require__(30);

var _tracer2 = _interopRequireDefault(_tracer);

var _skeletonizer2 = __webpack_require__(64);

var _skeletonizer3 = _interopRequireDefault(_skeletonizer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vec2 = {
    clone: __webpack_require__(6),
    dot: __webpack_require__(32),
    scale: __webpack_require__(77),
    transformMat2: __webpack_require__(78)
};
var mat2 = {
    copy: __webpack_require__(74),
    create: __webpack_require__(75),
    invert: __webpack_require__(76)
};

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
        _currentImageWrapper = new _image_wrapper2.default({
            x: _inputImageWrapper.size.x / 2 | 0,
            y: _inputImageWrapper.size.y / 2 | 0
        });
    } else {
        _currentImageWrapper = _inputImageWrapper;
    }

    _patchSize = (0, _cv_utils.calculatePatchSize)(_config.patchSize, _currentImageWrapper.size);

    _numPatches.x = _currentImageWrapper.size.x / _patchSize.x | 0;
    _numPatches.y = _currentImageWrapper.size.y / _patchSize.y | 0;

    _binaryImageWrapper = new _image_wrapper2.default(_currentImageWrapper.size, undefined, Uint8Array, false);

    _labelImageWrapper = new _image_wrapper2.default(_patchSize, undefined, Array, true);

    skeletonImageData = new ArrayBuffer(64 * 1024);
    _subImageWrapper = new _image_wrapper2.default(_patchSize, new Uint8Array(skeletonImageData, 0, _patchSize.x * _patchSize.y));
    _skelImageWrapper = new _image_wrapper2.default(_patchSize, new Uint8Array(skeletonImageData, _patchSize.x * _patchSize.y * 3, _patchSize.x * _patchSize.y), undefined, true);
    _skeletonizer = (0, _skeletonizer3.default)(typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : global, {
        size: _patchSize.x
    }, skeletonImageData);

    _imageToPatchGrid = new _image_wrapper2.default({
        x: _currentImageWrapper.size.x / _subImageWrapper.size.x | 0,
        y: _currentImageWrapper.size.y / _subImageWrapper.size.y | 0
    }, undefined, Array, true);
    _patchGrid = new _image_wrapper2.default(_imageToPatchGrid.size, undefined, undefined, true);
    _patchLabelGrid = new _image_wrapper2.default(_imageToPatchGrid.size, undefined, Int32Array, true);
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
            _image_debug2.default.drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, { color: "red" });
        }
    }

    overAvg /= patches.length;
    overAvg = (overAvg * 180 / Math.PI + 90) % 180 - 90;
    if (overAvg < 0) {
        overAvg += 180;
    }

    overAvg = (180 - overAvg) * Math.PI / 180;
    transMat = mat2.copy(mat2.create(), [Math.cos(overAvg), Math.sin(overAvg), -Math.sin(overAvg), Math.cos(overAvg)]);

    // iterate over patches and rotate by angle
    for (i = 0; i < patches.length; i++) {
        patch = patches[i];
        for (j = 0; j < 4; j++) {
            vec2.transformMat2(patch.box[j], patch.box[j], transMat);
        }

        if (false) {
            _image_debug2.default.drawPath(patch.box, { x: 0, y: 1 }, _canvasContainer.ctx.binary, { color: '#99ff00', lineWidth: 2 });
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
        _image_debug2.default.drawPath(box, { x: 0, y: 1 }, _canvasContainer.ctx.binary, { color: '#ff0000', lineWidth: 2 });
    }

    scale = _config.halfSample ? 2 : 1;
    // reverse rotation;
    transMat = mat2.invert(transMat, transMat);
    for (j = 0; j < 4; j++) {
        vec2.transformMat2(box[j], box[j], transMat);
    }

    if (false) {
        _image_debug2.default.drawPath(box, { x: 0, y: 1 }, _canvasContainer.ctx.binary, { color: '#ff0000', lineWidth: 2 });
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
    (0, _cv_utils.otsuThreshold)(_currentImageWrapper, _binaryImageWrapper);
    _binaryImageWrapper.zeroBorder();
    if (false) {
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
            _array_helper2.default.init(_labelImageWrapper.data, 0);
            rasterizer = _rasterizer2.default.create(_skelImageWrapper, _labelImageWrapper);
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
            _image_debug2.default.drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, { color: "#99ff00", lineWidth: 2 });
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
                    (0, _cv_utils.hsv2rgb)(hsv, rgb);
                    _image_debug2.default.drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, { color: "rgb(" + rgb.join(",") + ")", lineWidth: 2 });
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
    var clusters = (0, _cv_utils.cluster)(moments, 0.90);
    var topCluster = (0, _cv_utils.topGeneric)(clusters, 1, function (e) {
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
    _binaryImageWrapper.subImageAsCopy(_subImageWrapper, (0, _cv_utils.imageRef)(x, y));
    _skeletonizer.skeletonize();

    // Show skeleton if requested
    if (false) {
        _skelImageWrapper.overlay(_canvasContainer.dom.binary, 360, (0, _cv_utils.imageRef)(x, y));
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
            for (dir = 0; dir < _tracer2.default.searchDirections.length; dir++) {
                y = current.y + _tracer2.default.searchDirections[dir][0];
                x = current.x + _tracer2.default.searchDirections[dir][1];
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
    _array_helper2.default.init(_patchGrid.data, 0);
    _array_helper2.default.init(_patchLabelGrid.data, 0);
    _array_helper2.default.init(_imageToPatchGrid.data, null);

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
                (0, _cv_utils.hsv2rgb)(hsv, rgb);
                _image_debug2.default.drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, { color: "rgb(" + rgb.join(",") + ")", lineWidth: 2 });
            }
        }
    }

    return label;
}

exports.default = {
    init: function init(inputImageWrapper, config) {
        _config = config;
        _inputImageWrapper = inputImageWrapper;

        initBuffers();
        initCanvas();
    },

    locate: function locate() {
        var patchesFound, topLabels, boxes;

        if (_config.halfSample) {
            (0, _cv_utils.halfSample)(_inputImageWrapper, _currentImageWrapper);
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
            area = (0, _cv_utils.computeImageArea)(width, height, inputStream.getConfig().area);
            inputStream.setTopRight({ x: area.sx, y: area.sy });
            inputStream.setCanvasSize({ x: width, y: height });
            width = area.sw;
            height = area.sh;
        }

        size = {
            x: Math.floor(width * halfSample),
            y: Math.floor(height * halfSample)
        };

        patchSize = (0, _cv_utils.calculatePatchSize)(config.patchSize, size);
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(47)))

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _tracer = __webpack_require__(30);

var _tracer2 = _interopRequireDefault(_tracer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            tracer = _tracer2.default.create(imageWrapper, labelWrapper);

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

exports.default = Rasterizer;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/* @preserve ASM BEGIN */
/* eslint-disable eqeqeq*/
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
/* @preserve ASM END */
exports.default = Skeletonizer;
/* eslint-enable eqeqeq*/

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _barcode_reader = __webpack_require__(5);

var _barcode_reader2 = _interopRequireDefault(_barcode_reader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CodabarReader() {
    _barcode_reader2.default.call(this);
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

CodabarReader.prototype = Object.create(_barcode_reader2.default.prototype, properties);
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

exports.default = CodabarReader;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _barcode_reader = __webpack_require__(5);

var _barcode_reader2 = _interopRequireDefault(_barcode_reader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Code128Reader() {
    _barcode_reader2.default.call(this);
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
    CODE_PATTERN: { value: [[2, 1, 2, 2, 2, 2], [2, 2, 2, 1, 2, 2], [2, 2, 2, 2, 2, 1], [1, 2, 1, 2, 2, 3], [1, 2, 1, 3, 2, 2], [1, 3, 1, 2, 2, 2], [1, 2, 2, 2, 1, 3], [1, 2, 2, 3, 1, 2], [1, 3, 2, 2, 1, 2], [2, 2, 1, 2, 1, 3], [2, 2, 1, 3, 1, 2], [2, 3, 1, 2, 1, 2], [1, 1, 2, 2, 3, 2], [1, 2, 2, 1, 3, 2], [1, 2, 2, 2, 3, 1], [1, 1, 3, 2, 2, 2], [1, 2, 3, 1, 2, 2], [1, 2, 3, 2, 2, 1], [2, 2, 3, 2, 1, 1], [2, 2, 1, 1, 3, 2], [2, 2, 1, 2, 3, 1], [2, 1, 3, 2, 1, 2], [2, 2, 3, 1, 1, 2], [3, 1, 2, 1, 3, 1], [3, 1, 1, 2, 2, 2], [3, 2, 1, 1, 2, 2], [3, 2, 1, 2, 2, 1], [3, 1, 2, 2, 1, 2], [3, 2, 2, 1, 1, 2], [3, 2, 2, 2, 1, 1], [2, 1, 2, 1, 2, 3], [2, 1, 2, 3, 2, 1], [2, 3, 2, 1, 2, 1], [1, 1, 1, 3, 2, 3], [1, 3, 1, 1, 2, 3], [1, 3, 1, 3, 2, 1], [1, 1, 2, 3, 1, 3], [1, 3, 2, 1, 1, 3], [1, 3, 2, 3, 1, 1], [2, 1, 1, 3, 1, 3], [2, 3, 1, 1, 1, 3], [2, 3, 1, 3, 1, 1], [1, 1, 2, 1, 3, 3], [1, 1, 2, 3, 3, 1], [1, 3, 2, 1, 3, 1], [1, 1, 3, 1, 2, 3], [1, 1, 3, 3, 2, 1], [1, 3, 3, 1, 2, 1], [3, 1, 3, 1, 2, 1], [2, 1, 1, 3, 3, 1], [2, 3, 1, 1, 3, 1], [2, 1, 3, 1, 1, 3], [2, 1, 3, 3, 1, 1], [2, 1, 3, 1, 3, 1], [3, 1, 1, 1, 2, 3], [3, 1, 1, 3, 2, 1], [3, 3, 1, 1, 2, 1], [3, 1, 2, 1, 1, 3], [3, 1, 2, 3, 1, 1], [3, 3, 2, 1, 1, 1], [3, 1, 4, 1, 1, 1], [2, 2, 1, 4, 1, 1], [4, 3, 1, 1, 1, 1], [1, 1, 1, 2, 2, 4], [1, 1, 1, 4, 2, 2], [1, 2, 1, 1, 2, 4], [1, 2, 1, 4, 2, 1], [1, 4, 1, 1, 2, 2], [1, 4, 1, 2, 2, 1], [1, 1, 2, 2, 1, 4], [1, 1, 2, 4, 1, 2], [1, 2, 2, 1, 1, 4], [1, 2, 2, 4, 1, 1], [1, 4, 2, 1, 1, 2], [1, 4, 2, 2, 1, 1], [2, 4, 1, 2, 1, 1], [2, 2, 1, 1, 1, 4], [4, 1, 3, 1, 1, 1], [2, 4, 1, 1, 1, 2], [1, 3, 4, 1, 1, 1], [1, 1, 1, 2, 4, 2], [1, 2, 1, 1, 4, 2], [1, 2, 1, 2, 4, 1], [1, 1, 4, 2, 1, 2], [1, 2, 4, 1, 1, 2], [1, 2, 4, 2, 1, 1], [4, 1, 1, 2, 1, 2], [4, 2, 1, 1, 1, 2], [4, 2, 1, 2, 1, 1], [2, 1, 2, 1, 4, 1], [2, 1, 4, 1, 2, 1], [4, 1, 2, 1, 2, 1], [1, 1, 1, 1, 4, 3], [1, 1, 1, 3, 4, 1], [1, 3, 1, 1, 4, 1], [1, 1, 4, 1, 1, 3], [1, 1, 4, 3, 1, 1], [4, 1, 1, 1, 1, 3], [4, 1, 1, 3, 1, 1], [1, 1, 3, 1, 4, 1], [1, 1, 4, 1, 3, 1], [3, 1, 1, 1, 4, 1], [4, 1, 1, 1, 3, 1], [2, 1, 1, 4, 1, 2], [2, 1, 1, 2, 1, 4], [2, 1, 1, 2, 3, 2], [2, 3, 3, 1, 1, 1, 2]] },
    SINGLE_CODE_ERROR: { value: 0.64 },
    AVG_CODE_ERROR: { value: 0.30 },
    FORMAT: { value: "code_128", writeable: false },
    MODULE_INDICES: { value: { bar: [0, 2, 4], space: [1, 3, 5] } }
};

Code128Reader.prototype = Object.create(_barcode_reader2.default.prototype, properties);
Code128Reader.prototype.constructor = Code128Reader;

Code128Reader.prototype._decodeCode = function (start, correction) {
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
        end: start,
        correction: {
            bar: 1,
            space: 1
        }
    },
        code,
        error;

    for (i = offset; i < self._row.length; i++) {
        if (self._row[i] ^ isWhite) {
            counter[counterPos]++;
        } else {
            if (counterPos === counter.length - 1) {
                if (correction) {
                    self._correct(counter, correction);
                }
                for (code = 0; code < self.CODE_PATTERN.length; code++) {
                    error = self._matchPattern(counter, self.CODE_PATTERN[code]);
                    if (error < bestMatch.error) {
                        bestMatch.code = code;
                        bestMatch.error = error;
                    }
                }
                bestMatch.end = i;
                if (bestMatch.code === -1 || bestMatch.error > self.AVG_CODE_ERROR) {
                    return null;
                }
                if (self.CODE_PATTERN[bestMatch.code]) {
                    bestMatch.correction.bar = calculateCorrection(self.CODE_PATTERN[bestMatch.code], counter, this.MODULE_INDICES.bar);
                    bestMatch.correction.space = calculateCorrection(self.CODE_PATTERN[bestMatch.code], counter, this.MODULE_INDICES.space);
                }
                return bestMatch;
            } else {
                counterPos++;
            }
            counter[counterPos] = 1;
            isWhite = !isWhite;
        }
    }
    return null;
};

Code128Reader.prototype._correct = function (counter, correction) {
    this._correctBars(counter, correction.bar, this.MODULE_INDICES.bar);
    this._correctBars(counter, correction.space, this.MODULE_INDICES.space);
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
        end: 0,
        correction: {
            bar: 1,
            space: 1
        }
    },
        code,
        error,
        j,
        sum;

    for (i = offset; i < self._row.length; i++) {
        if (self._row[i] ^ isWhite) {
            counter[counterPos]++;
        } else {
            if (counterPos === counter.length - 1) {
                sum = 0;
                for (j = 0; j < counter.length; j++) {
                    sum += counter[j];
                }
                for (code = self.START_CODE_A; code <= self.START_CODE_C; code++) {
                    error = self._matchPattern(counter, self.CODE_PATTERN[code]);
                    if (error < bestMatch.error) {
                        bestMatch.code = code;
                        bestMatch.error = error;
                    }
                }
                if (bestMatch.error < self.AVG_CODE_ERROR) {
                    bestMatch.start = i - sum;
                    bestMatch.end = i;
                    bestMatch.correction.bar = calculateCorrection(self.CODE_PATTERN[bestMatch.code], counter, this.MODULE_INDICES.bar);
                    bestMatch.correction.space = calculateCorrection(self.CODE_PATTERN[bestMatch.code], counter, this.MODULE_INDICES.space);
                    return bestMatch;
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
        end: startInfo.end,
        correction: {
            bar: startInfo.correction.bar,
            space: startInfo.correction.space
        }
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
        code = self._decodeCode(code.end, code.correction);
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

_barcode_reader2.default.prototype._verifyTrailingWhitespace = function (endInfo) {
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

function calculateCorrection(expected, normalized, indices) {
    var length = indices.length,
        sumNormalized = 0,
        sumExpected = 0;

    while (length--) {
        sumExpected += expected[indices[length]];
        sumNormalized += normalized[indices[length]];
    }
    return sumExpected / sumNormalized;
}

exports.default = Code128Reader;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _code_39_reader = __webpack_require__(31);

var _code_39_reader2 = _interopRequireDefault(_code_39_reader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Code39VINReader() {
    _code_39_reader2.default.call(this);
}

var patterns = {
    IOQ: /[IOQ]/g,
    AZ09: /[A-Z0-9]{17}/
};

Code39VINReader.prototype = Object.create(_code_39_reader2.default.prototype);
Code39VINReader.prototype.constructor = Code39VINReader;

// Cribbed from:
// https://github.com/zxing/zxing/blob/master/core/src/main/java/com/google/zxing/client/result/VINResultParser.java
Code39VINReader.prototype._decode = function () {
    var result = _code_39_reader2.default.prototype._decode.apply(this);
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

exports.default = Code39VINReader;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _ean_reader = __webpack_require__(2);

var _ean_reader2 = _interopRequireDefault(_ean_reader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EAN2Reader() {
    _ean_reader2.default.call(this);
}

var properties = {
    FORMAT: { value: "ean_2", writeable: false }
};

EAN2Reader.prototype = Object.create(_ean_reader2.default.prototype, properties);
EAN2Reader.prototype.constructor = EAN2Reader;

EAN2Reader.prototype.decode = function (row, start) {
    this._row = row;
    var counters = [0, 0, 0, 0],
        codeFrequency = 0,
        i = 0,
        offset = start,
        end = this._row.length,
        code,
        result = [],
        decodedCodes = [];

    for (i = 0; i < 2 && offset < end; i++) {
        code = this._decodeCode(offset);
        if (!code) {
            return null;
        }
        decodedCodes.push(code);
        result.push(code.code % 10);
        if (code.code >= this.CODE_G_START) {
            codeFrequency |= 1 << 1 - i;
        }
        if (i != 1) {
            offset = this._nextSet(this._row, code.end);
            offset = this._nextUnset(this._row, offset);
        }
    }

    if (result.length != 2 || parseInt(result.join("")) % 4 !== codeFrequency) {
        return null;
    }
    return {
        code: result.join(""),
        decodedCodes: decodedCodes,
        end: code.end
    };
};

exports.default = EAN2Reader;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _ean_reader = __webpack_require__(2);

var _ean_reader2 = _interopRequireDefault(_ean_reader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EAN5Reader() {
    _ean_reader2.default.call(this);
}

var properties = {
    FORMAT: { value: "ean_5", writeable: false }
};

var CHECK_DIGIT_ENCODINGS = [24, 20, 18, 17, 12, 6, 3, 10, 9, 5];

EAN5Reader.prototype = Object.create(_ean_reader2.default.prototype, properties);
EAN5Reader.prototype.constructor = EAN5Reader;

EAN5Reader.prototype.decode = function (row, start) {
    this._row = row;
    var counters = [0, 0, 0, 0],
        codeFrequency = 0,
        i = 0,
        offset = start,
        end = this._row.length,
        code,
        result = [],
        decodedCodes = [];

    for (i = 0; i < 5 && offset < end; i++) {
        code = this._decodeCode(offset);
        if (!code) {
            return null;
        }
        decodedCodes.push(code);
        result.push(code.code % 10);
        if (code.code >= this.CODE_G_START) {
            codeFrequency |= 1 << 4 - i;
        }
        if (i != 4) {
            offset = this._nextSet(this._row, code.end);
            offset = this._nextUnset(this._row, offset);
        }
    }

    if (result.length != 5) {
        return null;
    }

    if (extensionChecksum(result) !== determineCheckDigit(codeFrequency)) {
        return null;
    }
    return {
        code: result.join(""),
        decodedCodes: decodedCodes,
        end: code.end
    };
};

function determineCheckDigit(codeFrequency) {
    var i;
    for (i = 0; i < 10; i++) {
        if (codeFrequency === CHECK_DIGIT_ENCODINGS[i]) {
            return i;
        }
    }
    return null;
}

function extensionChecksum(result) {
    var length = result.length,
        sum = 0,
        i;

    for (i = length - 2; i >= 0; i -= 2) {
        sum += result[i];
    }
    sum *= 3;
    for (i = length - 1; i >= 0; i -= 2) {
        sum += result[i];
    }
    sum *= 3;
    return sum % 10;
}

exports.default = EAN5Reader;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _ean_reader = __webpack_require__(2);

var _ean_reader2 = _interopRequireDefault(_ean_reader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EAN8Reader(opts, supplements) {
    _ean_reader2.default.call(this, opts, supplements);
}

var properties = {
    FORMAT: { value: "ean_8", writeable: false }
};

EAN8Reader.prototype = Object.create(_ean_reader2.default.prototype, properties);
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

exports.default = EAN8Reader;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _merge2 = __webpack_require__(28);

var _merge3 = _interopRequireDefault(_merge2);

var _barcode_reader = __webpack_require__(5);

var _barcode_reader2 = _interopRequireDefault(_barcode_reader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function I2of5Reader(opts) {
    opts = (0, _merge3.default)(getDefaulConfig(), opts);
    _barcode_reader2.default.call(this, opts);
    this.barSpaceRatio = [1, 1];
    if (opts.normalizeBarSpaceWidth) {
        this.SINGLE_CODE_ERROR = 0.38;
        this.AVG_CODE_ERROR = 0.09;
    }
}

function getDefaulConfig() {
    var config = {};

    Object.keys(I2of5Reader.CONFIG_KEYS).forEach(function (key) {
        config[key] = I2of5Reader.CONFIG_KEYS[key].default;
    });
    return config;
}

var N = 1,
    W = 3,
    properties = {
    START_PATTERN: { value: [N, N, N, N] },
    STOP_PATTERN: { value: [N, N, W] },
    CODE_PATTERN: { value: [[N, N, W, W, N], [W, N, N, N, W], [N, W, N, N, W], [W, W, N, N, N], [N, N, W, N, W], [W, N, W, N, N], [N, W, W, N, N], [N, N, N, W, W], [W, N, N, W, N], [N, W, N, W, N]] },
    SINGLE_CODE_ERROR: { value: 0.78, writable: true },
    AVG_CODE_ERROR: { value: 0.38, writable: true },
    MAX_CORRECTION_FACTOR: { value: 5 },
    FORMAT: { value: "i2of5" }
};

I2of5Reader.prototype = Object.create(_barcode_reader2.default.prototype, properties);
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
    return _barcode_reader2.default.prototype._matchPattern.call(this, counter, code);
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
                error = self._matchPattern(counter, pattern);
                if (error < epsilon) {
                    bestMatch.error = error;
                    bestMatch.start = i - sum;
                    bestMatch.end = i;
                    return bestMatch;
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
    for (code = 0; code < self.CODE_PATTERN.length; code++) {
        error = self._matchPattern(counter, self.CODE_PATTERN[code]);
        if (error < bestMatch.error) {
            bestMatch.code = code;
            bestMatch.error = error;
        }
    }
    if (bestMatch.error < epsilon) {
        return bestMatch;
    }
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

exports.default = I2of5Reader;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _ean_reader = __webpack_require__(2);

var _ean_reader2 = _interopRequireDefault(_ean_reader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function UPCEReader(opts, supplements) {
    _ean_reader2.default.call(this, opts, supplements);
}

var properties = {
    CODE_FREQUENCY: { value: [[56, 52, 50, 49, 44, 38, 35, 42, 41, 37], [7, 11, 13, 14, 19, 25, 28, 21, 22, 26]] },
    STOP_PATTERN: { value: [1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7] },
    FORMAT: { value: "upc_e", writeable: false }
};

UPCEReader.prototype = Object.create(_ean_reader2.default.prototype, properties);
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
    return _ean_reader2.default.prototype._checksum.call(this, this._convertToUPCA(result));
};

UPCEReader.prototype._findEnd = function (offset, isWhite) {
    isWhite = true;
    return _ean_reader2.default.prototype._findEnd.call(this, offset, isWhite);
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

exports.default = UPCEReader;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _ean_reader = __webpack_require__(2);

var _ean_reader2 = _interopRequireDefault(_ean_reader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function UPCReader(opts, supplements) {
    _ean_reader2.default.call(this, opts, supplements);
}

var properties = {
    FORMAT: { value: "upc_a", writeable: false }
};

UPCReader.prototype = Object.create(_ean_reader2.default.prototype, properties);
UPCReader.prototype.constructor = UPCReader;

UPCReader.prototype._decode = function () {
    var result = _ean_reader2.default.prototype._decode.call(this);

    if (result && result.code && result.code.length === 13 && result.code.charAt(0) === "0") {
        result.code = result.code.substring(1);
        return result;
    }
    return null;
};

exports.default = UPCReader;

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = copy

/**
 * Copy the values from one mat2 to another
 *
 * @alias mat2.copy
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
function copy(out, a) {
  out[0] = a[0]
  out[1] = a[1]
  out[2] = a[2]
  out[3] = a[3]
  return out
}


/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = create

/**
 * Creates a new identity mat2
 *
 * @alias mat2.create
 * @returns {mat2} a new 2x2 matrix
 */
function create() {
  var out = new Float32Array(4)
  out[0] = 1
  out[1] = 0
  out[2] = 0
  out[3] = 1
  return out
}


/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = invert

/**
 * Inverts a mat2
 *
 * @alias mat2.invert
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
function invert(out, a) {
  var a0 = a[0]
  var a1 = a[1]
  var a2 = a[2]
  var a3 = a[3]
  var det = a0 * a3 - a2 * a1

  if (!det) return null
  det = 1.0 / det

  out[0] =  a3 * det
  out[1] = -a1 * det
  out[2] = -a2 * det
  out[3] =  a0 * det

  return out
}


/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = scale

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
function scale(out, a, b) {
    out[0] = a[0] * b
    out[1] = a[1] * b
    return out
}

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = transformMat2

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat2(out, a, m) {
    var x = a[0],
        y = a[1]
    out[0] = m[0] * x + m[2] * y
    out[1] = m[1] * x + m[3] * y
    return out
}

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = clone;

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
function clone(a) {
    var out = new Float32Array(3)
    out[0] = a[0]
    out[1] = a[1]
    out[2] = a[2]
    return out
}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(118),
    hashDelete = __webpack_require__(119),
    hashGet = __webpack_require__(120),
    hashHas = __webpack_require__(121),
    hashSet = __webpack_require__(122);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(10),
    stackClear = __webpack_require__(145),
    stackDelete = __webpack_require__(146),
    stackGet = __webpack_require__(147),
    stackHas = __webpack_require__(148),
    stackSet = __webpack_require__(149);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(3);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),
/* 83 */
/***/ (function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(103),
    isArguments = __webpack_require__(18),
    isArray = __webpack_require__(1),
    isBuffer = __webpack_require__(44),
    isIndex = __webpack_require__(15),
    isTypedArray = __webpack_require__(45);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),
/* 85 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),
/* 86 */
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(0);

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(86),
    isFlattenable = __webpack_require__(124);

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var createBaseFor = __webpack_require__(113);

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(13),
    toKey = __webpack_require__(23);

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),
/* 91 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(7),
    isObjectLike = __webpack_require__(4);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(25),
    isMasked = __webpack_require__(128),
    isObject = __webpack_require__(0),
    toSource = __webpack_require__(151);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(7),
    isLength = __webpack_require__(26),
    isObjectLike = __webpack_require__(4);

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
    dataViewTag = '[object DataView]',
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
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(0),
    isPrototype = __webpack_require__(40),
    nativeKeysIn = __webpack_require__(140);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(81),
    assignMergeValue = __webpack_require__(35),
    baseFor = __webpack_require__(89),
    baseMergeDeep = __webpack_require__(97),
    isObject = __webpack_require__(0),
    keysIn = __webpack_require__(46);

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    if (isObject(srcValue)) {
      stack || (stack = new Stack);
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

module.exports = baseMerge;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var assignMergeValue = __webpack_require__(35),
    cloneBuffer = __webpack_require__(107),
    cloneTypedArray = __webpack_require__(108),
    copyArray = __webpack_require__(109),
    initCloneObject = __webpack_require__(123),
    isArguments = __webpack_require__(18),
    isArray = __webpack_require__(1),
    isArrayLikeObject = __webpack_require__(155),
    isBuffer = __webpack_require__(44),
    isFunction = __webpack_require__(25),
    isObject = __webpack_require__(0),
    isPlainObject = __webpack_require__(156),
    isTypedArray = __webpack_require__(45),
    toPlainObject = __webpack_require__(160);

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = object[key],
      srcValue = source[key],
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

module.exports = baseMergeDeep;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var basePickBy = __webpack_require__(99),
    hasIn = __webpack_require__(154);

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, paths) {
  return basePickBy(object, paths, function(value, path) {
    return hasIn(object, path);
  });
}

module.exports = basePick;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(90),
    baseSet = __webpack_require__(101),
    castPath = __webpack_require__(13);

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, paths, predicate) {
  var index = -1,
      length = paths.length,
      result = {};

  while (++index < length) {
    var path = paths[index],
        value = baseGet(object, path);

    if (predicate(value, path)) {
      baseSet(result, castPath(path, object), value);
    }
  }
  return result;
}

module.exports = basePickBy;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(43),
    overRest = __webpack_require__(41),
    setToString = __webpack_require__(42);

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(36),
    castPath = __webpack_require__(13),
    isIndex = __webpack_require__(15),
    isObject = __webpack_require__(0),
    toKey = __webpack_require__(23);

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {});
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

module.exports = baseSet;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var constant = __webpack_require__(152),
    defineProperty = __webpack_require__(37),
    identity = __webpack_require__(43);

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),
/* 103 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(11),
    arrayMap = __webpack_require__(85),
    isArray = __webpack_require__(1),
    isSymbol = __webpack_require__(27);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),
/* 105 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var Uint8Array = __webpack_require__(82);

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(3);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)(module)))

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(106);

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ }),
/* 109 */
/***/ (function(module, exports) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(36),
    baseAssignValue = __webpack_require__(21);

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(3);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var baseRest = __webpack_require__(100),
    isIterateeCall = __webpack_require__(125);

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;


/***/ }),
/* 113 */
/***/ (function(module, exports) {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var flatten = __webpack_require__(153),
    overRest = __webpack_require__(41),
    setToString = __webpack_require__(42);

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

module.exports = flatRest;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(11);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 116 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(13),
    isArguments = __webpack_require__(18),
    isArray = __webpack_require__(1),
    isIndex = __webpack_require__(15),
    isLength = __webpack_require__(26),
    toKey = __webpack_require__(23);

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(16);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),
/* 119 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(16);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(16);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(16);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(87),
    getPrototype = __webpack_require__(39),
    isPrototype = __webpack_require__(40);

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(11),
    isArguments = __webpack_require__(18),
    isArray = __webpack_require__(1);

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(17),
    isArrayLike = __webpack_require__(24),
    isIndex = __webpack_require__(15),
    isObject = __webpack_require__(0);

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(1),
    isSymbol = __webpack_require__(27);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),
/* 127 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(111);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 129 */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(12);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(12);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(12);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(12);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(80),
    ListCache = __webpack_require__(10),
    Map = __webpack_require__(33);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(14);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(14);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(14);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(14);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var memoize = __webpack_require__(157);

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),
/* 140 */
/***/ (function(module, exports) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(38);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)(module)))

/***/ }),
/* 142 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 143 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 144 */
/***/ (function(module, exports) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(10);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),
/* 146 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),
/* 147 */
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),
/* 148 */
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(10),
    Map = __webpack_require__(33),
    MapCache = __webpack_require__(34);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(139);

/** Used to match property names within property paths. */
var reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),
/* 151 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 152 */
/***/ (function(module, exports) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var baseFlatten = __webpack_require__(88);

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var baseHasIn = __webpack_require__(91),
    hasPath = __webpack_require__(117);

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(24),
    isObjectLike = __webpack_require__(4);

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(7),
    getPrototype = __webpack_require__(39),
    isObjectLike = __webpack_require__(4);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
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
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(34);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var basePick = __webpack_require__(98),
    flatRest = __webpack_require__(114);

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
var pick = flatRest(function(object, paths) {
  return object == null ? {} : basePick(object, paths);
});

module.exports = pick;


/***/ }),
/* 159 */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(110),
    keysIn = __webpack_require__(46);

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
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
  return copyObject(value, keysIn(value));
}

module.exports = toPlainObject;


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(104);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),
/* 162 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_162__;

/***/ }),
/* 163 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_163__;

/***/ }),
/* 164 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_164__;

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(48);


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4Y2Q1NWE5MTViMjQxYjVhMTk5MiIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc09iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc0FycmF5LmpzIiwid2VicGFjazovLy8uL3NyYy9yZWFkZXIvZWFuX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fcm9vdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWRlci9iYXJjb2RlX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2dsLXZlYzIvY2xvbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VHZXRUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9hcnJheV9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9pbWFnZV9kZWJ1Zy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fTGlzdENhY2hlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19TeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Fzc29jSW5kZXhPZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fY2FzdFBhdGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2dldE1hcERhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2lzSW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX25hdGl2ZUNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9lcS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc0FyZ3VtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2N2X3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vaW1hZ2Vfd3JhcHBlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYmFzZUFzc2lnblZhbHVlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19nZXROYXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX3RvS2V5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2lzQXJyYXlMaWtlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2lzRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaXNMZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaXNTeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbWVyZ2UuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9jYXRvci90cmFjZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWRlci9jb2RlXzM5X3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2dsLXZlYzIvZG90LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19NYXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX01hcENhY2hlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19hc3NpZ25NZXJnZVZhbHVlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19hc3NpZ25WYWx1ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2ZyZWVHbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2dldFByb3RvdHlwZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9faXNQcm90b3R5cGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX292ZXJSZXN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19zZXRUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pZGVudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc0J1ZmZlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc1R5cGVkQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gva2V5c0luLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1YWdnYS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvZnJhbWVfZ3JhYmJlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW5wdXRfc3RyZWFtLmpzIiwid2VicGFjazovLy8uL3NyYy9hbmFseXRpY3MvcmVzdWx0X2NvbGxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2NsdXN0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9tZWRpYURldmljZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9zdWJJbWFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL3R5cGVkZWZzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25maWcvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25maWcvY29uZmlnLm5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlY29kZXIvYmFyY29kZV9kZWNvZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9kZWNvZGVyL2JyZXNlbmhhbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5wdXQvY2FtZXJhX2FjY2Vzcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9jYXRvci9iYXJjb2RlX2xvY2F0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvY2F0b3IvcmFzdGVyaXplci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9jYXRvci9za2VsZXRvbml6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWRlci9jb2RhYmFyX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZGVyL2NvZGVfMTI4X3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZGVyL2NvZGVfMzlfdmluX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZGVyL2Vhbl8yX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZGVyL2Vhbl81X3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZGVyL2Vhbl84X3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZGVyL2kyb2Y1X3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZGVyL3VwY19lX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZGVyL3VwY19yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9nbC1tYXQyL2NvcHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9nbC1tYXQyL2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2dsLW1hdDIvaW52ZXJ0LmpzIiwid2VicGFjazovLy8uL34vZ2wtdmVjMi9zY2FsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2dsLXZlYzIvdHJhbnNmb3JtTWF0Mi5qcyIsIndlYnBhY2s6Ly8vLi9+L2dsLXZlYzMvY2xvbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX0hhc2guanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX1N0YWNrLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19VaW50OEFycmF5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19hcHBseS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYXJyYXlMaWtlS2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYXJyYXlNYXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2FycmF5UHVzaC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYmFzZUNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYmFzZUZsYXR0ZW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VGb3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VHZXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VIYXNJbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYmFzZUlzQXJndW1lbnRzLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19iYXNlSXNOYXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VJc1R5cGVkQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VLZXlzSW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VNZXJnZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYmFzZU1lcmdlRGVlcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYmFzZVBpY2suanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VQaWNrQnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VSZXN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19iYXNlU2V0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19iYXNlU2V0VG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VUaW1lcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYmFzZVRvU3RyaW5nLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19iYXNlVW5hcnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Nsb25lQXJyYXlCdWZmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Nsb25lQnVmZmVyLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19jbG9uZVR5cGVkQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2NvcHlBcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fY29weU9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fY29yZUpzRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fY3JlYXRlQXNzaWduZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2NyZWF0ZUJhc2VGb3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2ZsYXRSZXN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19nZXRSYXdUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2dldFZhbHVlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19oYXNQYXRoLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19oYXNoQ2xlYXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2hhc2hEZWxldGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2hhc2hHZXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2hhc2hIYXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2hhc2hTZXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2luaXRDbG9uZU9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9faXNGbGF0dGVuYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9faXNJdGVyYXRlZUNhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2lzS2V5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19pc0tleWFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2lzTWFza2VkLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19saXN0Q2FjaGVDbGVhci5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fbGlzdENhY2hlRGVsZXRlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19saXN0Q2FjaGVHZXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2xpc3RDYWNoZUhhcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fbGlzdENhY2hlU2V0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19tYXBDYWNoZUNsZWFyLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19tYXBDYWNoZURlbGV0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fbWFwQ2FjaGVHZXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX21hcENhY2hlSGFzLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19tYXBDYWNoZVNldC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fbWVtb2l6ZUNhcHBlZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fbmF0aXZlS2V5c0luLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19ub2RlVXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fb2JqZWN0VG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX292ZXJBcmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX3Nob3J0T3V0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19zdGFja0NsZWFyLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19zdGFja0RlbGV0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fc3RhY2tHZXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX3N0YWNrSGFzLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19zdGFja1NldC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fc3RyaW5nVG9QYXRoLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL190b1NvdXJjZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9jb25zdGFudC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9mbGF0dGVuLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2hhc0luLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2lzQXJyYXlMaWtlT2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2lzUGxhaW5PYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbWVtb2l6ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9waWNrLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL3N0dWJGYWxzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC90b1BsYWluT2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL3RvU3RyaW5nLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImdldC1waXhlbHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZGFycmF5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmRhcnJheS1saW5lYXItaW50ZXJwb2xhdGVcIiJdLCJuYW1lcyI6WyJFQU5SZWFkZXIiLCJvcHRzIiwic3VwcGxlbWVudHMiLCJnZXREZWZhdWxDb25maWciLCJjYWxsIiwiY29uZmlnIiwiT2JqZWN0Iiwia2V5cyIsIkNPTkZJR19LRVlTIiwiZm9yRWFjaCIsImtleSIsImRlZmF1bHQiLCJwcm9wZXJ0aWVzIiwiQ09ERV9MX1NUQVJUIiwidmFsdWUiLCJDT0RFX0dfU1RBUlQiLCJTVEFSVF9QQVRURVJOIiwiU1RPUF9QQVRURVJOIiwiTUlERExFX1BBVFRFUk4iLCJFWFRFTlNJT05fU1RBUlRfUEFUVEVSTiIsIkNPREVfUEFUVEVSTiIsIkNPREVfRlJFUVVFTkNZIiwiU0lOR0xFX0NPREVfRVJST1IiLCJBVkdfQ09ERV9FUlJPUiIsIkZPUk1BVCIsIndyaXRlYWJsZSIsInByb3RvdHlwZSIsImNyZWF0ZSIsImNvbnN0cnVjdG9yIiwiX2RlY29kZUNvZGUiLCJzdGFydCIsImNvZGVyYW5nZSIsImNvdW50ZXIiLCJpIiwic2VsZiIsIm9mZnNldCIsImlzV2hpdGUiLCJfcm93IiwiY291bnRlclBvcyIsImJlc3RNYXRjaCIsImVycm9yIiwiTnVtYmVyIiwiTUFYX1ZBTFVFIiwiY29kZSIsImVuZCIsImxlbmd0aCIsIl9tYXRjaFBhdHRlcm4iLCJfZmluZFBhdHRlcm4iLCJwYXR0ZXJuIiwidHJ5SGFyZGVyIiwiZXBzaWxvbiIsImoiLCJzdW0iLCJfbmV4dFNldCIsInVuZGVmaW5lZCIsIl9maW5kU3RhcnQiLCJsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0Iiwic3RhcnRJbmZvIiwiX21hdGNoUmFuZ2UiLCJfdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlIiwiZW5kSW5mbyIsInRyYWlsaW5nV2hpdGVzcGFjZUVuZCIsIl9maW5kRW5kIiwiX2NhbGN1bGF0ZUZpcnN0RGlnaXQiLCJjb2RlRnJlcXVlbmN5IiwiX2RlY29kZVBheWxvYWQiLCJyZXN1bHQiLCJkZWNvZGVkQ29kZXMiLCJmaXJzdERpZ2l0IiwicHVzaCIsInVuc2hpZnQiLCJfZGVjb2RlIiwicmVzdWx0SW5mbyIsIl9jaGVja3N1bSIsImV4dCIsIl9kZWNvZGVFeHRlbnNpb25zIiwibGFzdENvZGUiLCJzdXBwbGVtZW50Iiwiam9pbiIsImNvZGVzZXQiLCJkZWNvZGUiLCJCYXJjb2RlUmVhZGVyIiwiX25leHRVbnNldCIsImxpbmUiLCJtYXhTaW5nbGVFcnJvciIsInNpbmdsZUVycm9yIiwibW9kdWxvIiwiYmFyV2lkdGgiLCJjb3VudCIsInNjYWxlZCIsIk1hdGgiLCJhYnMiLCJfY29ycmVjdEJhcnMiLCJjb3JyZWN0aW9uIiwiaW5kaWNlcyIsInRtcCIsIl9tYXRjaFRyYWNlIiwiY21wQ291bnRlciIsImRlY29kZVBhdHRlcm4iLCJyZXZlcnNlIiwiZGlyZWN0aW9uIiwiRElSRUNUSU9OIiwiUkVWRVJTRSIsIkZPUldBUkQiLCJmb3JtYXQiLCJfZmlsbENvdW50ZXJzIiwiY291bnRlcnMiLCJkZWZpbmVQcm9wZXJ0eSIsIkV4Y2VwdGlvbiIsIlN0YXJ0Tm90Rm91bmRFeGNlcHRpb24iLCJDb2RlTm90Rm91bmRFeGNlcHRpb24iLCJQYXR0ZXJuTm90Rm91bmRFeGNlcHRpb24iLCJpbml0IiwiYXJyIiwidmFsIiwibCIsInNodWZmbGUiLCJ4IiwiZmxvb3IiLCJyYW5kb20iLCJ0b1BvaW50TGlzdCIsInJvdyIsInJvd3MiLCJ0aHJlc2hvbGQiLCJzY29yZUZ1bmMiLCJxdWV1ZSIsImFwcGx5IiwibWF4SW5kZXgiLCJtYXgiLCJkcmF3UmVjdCIsInBvcyIsInNpemUiLCJjdHgiLCJzdHlsZSIsInN0cm9rZVN0eWxlIiwiY29sb3IiLCJmaWxsU3R5bGUiLCJsaW5lV2lkdGgiLCJiZWdpblBhdGgiLCJzdHJva2VSZWN0IiwieSIsImRyYXdQYXRoIiwicGF0aCIsImRlZiIsIm1vdmVUbyIsImxpbmVUbyIsImNsb3NlUGF0aCIsInN0cm9rZSIsImRyYXdJbWFnZSIsImltYWdlRGF0YSIsImNhbnZhc0RhdGEiLCJnZXRJbWFnZURhdGEiLCJkYXRhIiwiaW1hZ2VEYXRhUG9zIiwiY2FudmFzRGF0YVBvcyIsInB1dEltYWdlRGF0YSIsImltYWdlUmVmIiwiY29tcHV0ZUludGVncmFsSW1hZ2UyIiwiY29tcHV0ZUludGVncmFsSW1hZ2UiLCJ0aHJlc2hvbGRJbWFnZSIsImNvbXB1dGVIaXN0b2dyYW0iLCJzaGFycGVuTGluZSIsImRldGVybWluZU90c3VUaHJlc2hvbGQiLCJvdHN1VGhyZXNob2xkIiwiY29tcHV0ZUJpbmFyeUltYWdlIiwiY2x1c3RlciIsImRpbGF0ZSIsImVyb2RlIiwic3VidHJhY3QiLCJiaXR3aXNlT3IiLCJjb3VudE5vblplcm8iLCJ0b3BHZW5lcmljIiwiZ3JheUFycmF5RnJvbUltYWdlIiwiZ3JheUFycmF5RnJvbUNvbnRleHQiLCJncmF5QW5kSGFsZlNhbXBsZUZyb21DYW52YXNEYXRhIiwiY29tcHV0ZUdyYXkiLCJsb2FkSW1hZ2VBcnJheSIsImhhbGZTYW1wbGUiLCJoc3YycmdiIiwiX2NvbXB1dGVEaXZpc29ycyIsImNhbGN1bGF0ZVBhdGNoU2l6ZSIsIl9wYXJzZUNTU0RpbWVuc2lvblZhbHVlcyIsImNvbXB1dGVJbWFnZUFyZWEiLCJ2ZWMyIiwiY2xvbmUiLCJyZXF1aXJlIiwidmVjMyIsInRoYXQiLCJ0b1ZlYzIiLCJ0b1ZlYzMiLCJyb3VuZCIsImltYWdlV3JhcHBlciIsImludGVncmFsV3JhcHBlciIsIndpZHRoIiwiaGVpZ2h0IiwiaW50ZWdyYWxJbWFnZURhdGEiLCJwb3NBIiwicG9zQiIsInBvc0MiLCJwb3NEIiwidiIsInUiLCJ0YXJnZXRXcmFwcGVyIiwidGFyZ2V0RGF0YSIsImJpdHNQZXJQaXhlbCIsImJpdFNoaWZ0IiwiYnVja2V0Q250IiwiaGlzdCIsIkludDMyQXJyYXkiLCJsZWZ0IiwiY2VudGVyIiwicmlnaHQiLCJweCIsIm14IiwiZGV0ZXJtaW5lVGhyZXNob2xkIiwidmV0IiwicDEiLCJwMiIsInAxMiIsImsiLCJtMSIsIm0yIiwibTEyIiwia2VybmVsIiwiQSIsIkIiLCJDIiwiRCIsImF2ZyIsInBvaW50cyIsInByb3BlcnR5IiwicG9pbnQiLCJjbHVzdGVycyIsImFkZFRvQ2x1c3RlciIsIm5ld1BvaW50IiwiZm91bmQiLCJmaXRzIiwiYWRkIiwiY3JlYXRlUG9pbnQiLCJUcmFjZXIiLCJ0cmFjZSIsInZlYyIsIml0ZXJhdGlvbiIsIm1heEl0ZXJhdGlvbnMiLCJ0b3AiLCJjZW50ZXJQb3MiLCJjdXJyZW50UG9zIiwiaWR4IiwiZm9yd2FyZCIsImZyb20iLCJ0byIsInRvSWR4IiwicHJlZGljdGVkUG9zIiwidGhyZXNob2xkWCIsInRocmVzaG9sZFkiLCJtYXRjaCIsInByZWRpY3RlZCIsIkRJTEFURSIsIkVST0RFIiwiaW5JbWFnZVdyYXBwZXIiLCJvdXRJbWFnZVdyYXBwZXIiLCJpbkltYWdlRGF0YSIsIm91dEltYWdlRGF0YSIsInlTdGFydDEiLCJ5U3RhcnQyIiwieFN0YXJ0MSIsInhTdGFydDIiLCJhSW1hZ2VXcmFwcGVyIiwiYkltYWdlV3JhcHBlciIsInJlc3VsdEltYWdlV3JhcHBlciIsImFJbWFnZURhdGEiLCJiSW1hZ2VEYXRhIiwiY0ltYWdlRGF0YSIsImxpc3QiLCJtaW5JZHgiLCJtaW4iLCJzY29yZSIsImhpdCIsIml0ZW0iLCJodG1sSW1hZ2UiLCJvZmZzZXRYIiwiYXJyYXkiLCJjdHhEYXRhIiwib3V0QXJyYXkiLCJ0b3BSb3dJZHgiLCJib3R0b21Sb3dJZHgiLCJlbmRJZHgiLCJvdXRXaWR0aCIsIm91dEltZ0lkeCIsImluV2lkdGgiLCJzaW5nbGVDaGFubmVsIiwic3JjIiwiY2FsbGJhY2siLCJjYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbWciLCJJbWFnZSIsIm9ubG9hZCIsImdldENvbnRleHQiLCJVaW50OEFycmF5IiwiaW5JbWdXcmFwcGVyIiwib3V0SW1nV3JhcHBlciIsImluSW1nIiwib3V0SW1nIiwiaHN2IiwicmdiIiwiaCIsInMiLCJjIiwibSIsInIiLCJnIiwiYiIsIm4iLCJsYXJnZURpdmlzb3JzIiwiZGl2aXNvcnMiLCJzcXJ0IiwiY29uY2F0IiwiX2NvbXB1dGVJbnRlcnNlY3Rpb24iLCJhcnIxIiwiYXJyMiIsInBhdGNoU2l6ZSIsImltZ1NpemUiLCJkaXZpc29yc1giLCJkaXZpc29yc1kiLCJ3aWRlU2lkZSIsImNvbW1vbiIsIm5yT2ZQYXRjaGVzTGlzdCIsIm5yT2ZQYXRjaGVzTWFwIiwibnJPZlBhdGNoZXNJZHgiLCJtZWRpdW0iLCJuck9mUGF0Y2hlcyIsImRlc2lyZWRQYXRjaFNpemUiLCJvcHRpbWFsUGF0Y2hTaXplIiwiZmluZFBhdGNoU2l6ZUZvckRpdmlzb3JzIiwiZGltZW5zaW9uIiwicGFyc2VGbG9hdCIsInVuaXQiLCJpbmRleE9mIiwiX2RpbWVuc2lvbnNDb252ZXJ0ZXJzIiwiY29udGV4dCIsImJvdHRvbSIsImlucHV0V2lkdGgiLCJpbnB1dEhlaWdodCIsImFyZWEiLCJwYXJzZWRBcmVhIiwicmVkdWNlIiwicGFyc2VkIiwiY2FsY3VsYXRlZCIsInN4Iiwic3kiLCJzdyIsInNoIiwiSW1hZ2VXcmFwcGVyIiwiQXJyYXlUeXBlIiwiaW5pdGlhbGl6ZSIsIkFycmF5IiwiaW5JbWFnZVdpdGhCb3JkZXIiLCJpbWdSZWYiLCJib3JkZXIiLCJzYW1wbGUiLCJseCIsImx5IiwidyIsImJhc2UiLCJhIiwiZCIsImUiLCJjbGVhckFycmF5Iiwic3ViSW1hZ2UiLCJzdWJJbWFnZUFzQ29weSIsInNpemVZIiwic2l6ZVgiLCJjb3B5VG8iLCJzcmNEYXRhIiwiZHN0RGF0YSIsImdldCIsImdldFNhZmUiLCJpbmRleE1hcHBpbmciLCJzZXQiLCJ6ZXJvQm9yZGVyIiwiaW52ZXJ0IiwiY29udm9sdmUiLCJreCIsImt5Iiwia1NpemUiLCJhY2N1IiwibW9tZW50cyIsImxhYmVsY291bnQiLCJ5c3EiLCJsYWJlbHN1bSIsImxhYmVsIiwibXUxMSIsIm11MDIiLCJtdTIwIiwieF8iLCJ5XyIsIlBJIiwiUElfNCIsIm0wMCIsIm0wMSIsIm0xMCIsIm0xMSIsIm0wMiIsIm0yMCIsInRoZXRhIiwicmFkIiwiaXNOYU4iLCJhdGFuIiwiY29zIiwic2luIiwic2hvdyIsInNjYWxlIiwiZnJhbWUiLCJjdXJyZW50IiwicGl4ZWwiLCJvdmVybGF5Iiwid2hpdGVSZ2IiLCJibGFja1JnYiIsInNlYXJjaERpcmVjdGlvbnMiLCJsYWJlbFdyYXBwZXIiLCJsYWJlbERhdGEiLCJlZGdlbGFiZWwiLCJjeSIsImRpciIsImN4IiwidmVydGV4MkQiLCJuZXh0IiwicHJldiIsImNvbnRvdXJUcmFjaW5nIiwiRnYiLCJDdiIsIlAiLCJsZGlyIiwiQ29kZTM5UmVhZGVyIiwiQUxQSEFCRVRIX1NUUklORyIsIkFMUEhBQkVUIiwiQ0hBUkFDVEVSX0VOQ09ESU5HUyIsIkFTVEVSSVNLIiwiX3RvQ291bnRlcnMiLCJudW1Db3VudGVycyIsImRlY29kZWRDaGFyIiwibGFzdFN0YXJ0IiwibmV4dFN0YXJ0IiwiX3RvUGF0dGVybiIsIl9wYXR0ZXJuVG9DaGFyIiwicG9wIiwicGF0dGVyblNpemUiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJfZmluZE5leHRXaWR0aCIsIm1pbldpZHRoIiwibWF4TmFycm93V2lkdGgiLCJudW1XaWRlQmFycyIsIndpZGVCYXJXaWR0aCIsInBhdHRlcm5TdGFydCIsIndoaXRlU3BhY2VNdXN0U3RhcnQiLCJfaW5wdXRTdHJlYW0iLCJfZnJhbWVncmFiYmVyIiwiX3N0b3BwZWQiLCJfY2FudmFzQ29udGFpbmVyIiwiaW1hZ2UiLCJkb20iLCJfaW5wdXRJbWFnZVdyYXBwZXIiLCJfYm94U2l6ZSIsIl9kZWNvZGVyIiwiX3dvcmtlclBvb2wiLCJfb25VSVRocmVhZCIsIl9yZXN1bHRDb2xsZWN0b3IiLCJfY29uZmlnIiwiaW5pdGlhbGl6ZURhdGEiLCJpbml0QnVmZmVycyIsImRlY29kZXIiLCJpbml0SW5wdXRTdHJlYW0iLCJjYiIsInZpZGVvIiwiaW5wdXRTdHJlYW0iLCJ0eXBlIiwiY3JlYXRlVmlkZW9TdHJlYW0iLCJjcmVhdGVJbWFnZVN0cmVhbSIsIiR2aWV3cG9ydCIsImdldFZpZXdQb3J0IiwicXVlcnlTZWxlY3RvciIsImFwcGVuZENoaWxkIiwiY3JlYXRlTGl2ZVN0cmVhbSIsInJlcXVlc3QiLCJjb25zdHJhaW50cyIsInRoZW4iLCJ0cmlnZ2VyIiwiY2F0Y2giLCJlcnIiLCJzZXRBdHRyaWJ1dGUiLCJzZXRJbnB1dFN0cmVhbSIsImFkZEV2ZW50TGlzdGVuZXIiLCJjYW5SZWNvcmQiLCJiaW5kIiwidGFyZ2V0Iiwibm9kZU5hbWUiLCJub2RlVHlwZSIsInNlbGVjdG9yIiwiY2hlY2tJbWFnZUNvbnN0cmFpbnRzIiwibG9jYXRvciIsImluaXRDYW52YXMiLCJhZGp1c3RXb3JrZXJQb29sIiwibnVtT2ZXb3JrZXJzIiwicmVhZHkiLCJwbGF5IiwiY2xhc3NOYW1lIiwiZ2V0Q2FudmFzU2l6ZSIsImNsZWFyRml4IiwiZ2V0V2lkdGgiLCJnZXRIZWlnaHQiLCJjb25zb2xlIiwibG9nIiwiZ2V0Qm91bmRpbmdCb3hlcyIsImxvY2F0ZSIsInRyYW5zZm9ybVJlc3VsdCIsInRvcFJpZ2h0IiwiZ2V0VG9wUmlnaHQiLCJ4T2Zmc2V0IiwieU9mZnNldCIsImJhcmNvZGVzIiwibW92ZUxpbmUiLCJib3giLCJtb3ZlQm94IiwiYm94ZXMiLCJjb3JuZXIiLCJhZGRSZXN1bHQiLCJmaWx0ZXIiLCJiYXJjb2RlIiwiY29kZVJlc3VsdCIsImhhc0NvZGVSZXN1bHQiLCJzb21lIiwicHVibGlzaFJlc3VsdCIsInJlc3VsdFRvUHVibGlzaCIsInB1Ymxpc2giLCJsb2NhdGVBbmREZWNvZGUiLCJkZWNvZGVGcm9tQm91bmRpbmdCb3hlcyIsInVwZGF0ZSIsImF2YWlsYWJsZVdvcmtlciIsIndvcmtlclRocmVhZCIsImJ1c3kiLCJhdHRhY2hEYXRhIiwiZ3JhYiIsIndvcmtlciIsInBvc3RNZXNzYWdlIiwiY21kIiwiYnVmZmVyIiwic3RhcnRDb250aW51b3VzVXBkYXRlIiwiZGVsYXkiLCJmcmVxdWVuY3kiLCJ0aW1lc3RhbXAiLCJ3aW5kb3ciLCJyZXF1ZXN0QW5pbUZyYW1lIiwicGVyZm9ybWFuY2UiLCJub3ciLCJpbml0V29ya2VyIiwiYmxvYlVSTCIsImdlbmVyYXRlV29ya2VyQmxvYiIsIldvcmtlciIsIm9ubWVzc2FnZSIsImV2ZW50IiwiVVJMIiwicmV2b2tlT2JqZWN0VVJMIiwibWVzc2FnZSIsImNvbmZpZ0ZvcldvcmtlciIsIndvcmtlckludGVyZmFjZSIsImZhY3RvcnkiLCJRdWFnZ2EiLCJvblByb2Nlc3NlZCIsInNldFJlYWRlcnMiLCJyZWFkZXJzIiwiYmxvYiIsImZhY3RvcnlTb3VyY2UiLCJfX2ZhY3RvcnlTb3VyY2VfXyIsIkJsb2IiLCJ0b1N0cmluZyIsImNyZWF0ZU9iamVjdFVSTCIsImNhcGFjaXR5IiwiaW5jcmVhc2VCeSIsIndvcmtlcnNUb1Rlcm1pbmF0ZSIsInNsaWNlIiwidGVybWluYXRlIiwid29ya2VySW5pdGlhbGl6ZWQiLCJzdG9wIiwicmVsZWFzZSIsImNsZWFyRXZlbnRIYW5kbGVycyIsInBhdXNlIiwib25EZXRlY3RlZCIsInN1YnNjcmliZSIsIm9mZkRldGVjdGVkIiwidW5zdWJzY3JpYmUiLCJvZmZQcm9jZXNzZWQiLCJyZWdpc3RlclJlc3VsdENvbGxlY3RvciIsInJlc3VsdENvbGxlY3RvciIsImRlY29kZVNpbmdsZSIsInJlc3VsdENhbGxiYWNrIiwic2VxdWVuY2UiLCJvbmNlIiwiSW1hZ2VEZWJ1ZyIsIlJlc3VsdENvbGxlY3RvciIsIkNhbWVyYUFjY2VzcyIsIkNWVXRpbHMiLCJOZGFycmF5IiwiSW50ZXJwMkQiLCJkMiIsIkZyYW1lR3JhYmJlciIsIl90aGF0IiwiX3N0cmVhbUNvbmZpZyIsImdldENvbmZpZyIsIl92aWRlb19zaXplIiwiZ2V0UmVhbFdpZHRoIiwiZ2V0UmVhbEhlaWdodCIsIl9jYW52YXNTaXplIiwiX3NpemUiLCJfdG9wUmlnaHQiLCJfZGF0YSIsIl9ncmF5RGF0YSIsIl9jYW52YXNEYXRhIiwiX2dyYXlJbWFnZUFycmF5IiwidHJhbnNwb3NlIiwiX2NhbnZhc0ltYWdlQXJyYXkiLCJfdGFyZ2V0SW1hZ2VBcnJheSIsImhpIiwibG8iLCJfc3RlcFNpemVYIiwiX3N0ZXBTaXplWSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ2aWRlb1NpemUiLCJzaGFwZSIsImNhbnZhc1NpemUiLCJzdGVwU2l6ZSIsImdldERhdGEiLCJnZXRGcmFtZSIsInNjYWxlQW5kQ3JvcCIsIkVycm9yIiwiZ2V0U2l6ZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJHZXRQaXhlbHMiLCJJbnB1dFN0cmVhbSIsImZyYW1lSWR4IiwicGF1c2VkIiwibG9hZGVkIiwiYmFzZVVybCIsImVuZGVkIiwiY2FsY3VsYXRlZFdpZHRoIiwiY2FsY3VsYXRlZEhlaWdodCIsIl9ldmVudE5hbWVzIiwiX2V2ZW50SGFuZGxlcnMiLCJsb2FkSW1hZ2VzIiwicGl4ZWxzIiwiZXhpdCIsInNldFRpbWVvdXQiLCJwdWJsaXNoRXZlbnQiLCJldmVudE5hbWUiLCJhcmdzIiwiaGFuZGxlcnMiLCJzZXRXaWR0aCIsInNldEhlaWdodCIsInN0cmVhbSIsInNldEN1cnJlbnRUaW1lIiwidGltZSIsImYiLCJzZXRUb3BSaWdodCIsInNldENhbnZhc1NpemUiLCJjb250YWlucyIsImV2ZXJ5IiwicGFzc2VzRmlsdGVyIiwicmVzdWx0cyIsImNhcHR1cmUiLCJtYXRjaGVzQ29uc3RyYWludHMiLCJibGFja2xpc3QiLCJpbWFnZVNpemUiLCJ0b0RhdGFVUkwiLCJnZXRSZXN1bHRzIiwiZG90IiwicG9pbnRNYXAiLCJ1cGRhdGVDZW50ZXIiLCJwb2ludFRvQWRkIiwiaWQiLCJvdGhlclBvaW50Iiwic2ltaWxhcml0eSIsImdldFBvaW50cyIsImdldENlbnRlciIsImV2ZW50cyIsImdldEV2ZW50Iiwic3Vic2NyaWJlcnMiLCJjbGVhckV2ZW50cyIsInB1Ymxpc2hTdWJzY3JpcHRpb24iLCJzdWJzY3JpcHRpb24iLCJhc3luYyIsInN1YnNjcmliZXIiLCJlbnVtZXJhdGVEZXZpY2VzIiwiZ2V0VXNlck1lZGlhIiwibmF2aWdhdG9yIiwibWVkaWFEZXZpY2VzIiwiUHJvbWlzZSIsInJlamVjdCIsIlN1YkltYWdlIiwiSSIsIm9yaWdpbmFsU2l6ZSIsInVwZGF0ZURhdGEiLCJ1cGRhdGVGcm9tIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwib1JlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiaW11bCIsImFoIiwiYWwiLCJiaCIsImJsIiwiYXNzaWduIiwiVHlwZUVycm9yIiwiaW5kZXgiLCJhcmd1bWVudHMiLCJuZXh0U291cmNlIiwibmV4dEtleSIsImhhc093blByb3BlcnR5IiwiUkVBREVSUyIsImNvZGVfMTI4X3JlYWRlciIsImVhbl9yZWFkZXIiLCJlYW5fNV9yZWFkZXIiLCJlYW5fMl9yZWFkZXIiLCJlYW5fOF9yZWFkZXIiLCJjb2RlXzM5X3JlYWRlciIsImNvZGVfMzlfdmluX3JlYWRlciIsImNvZGFiYXJfcmVhZGVyIiwidXBjX3JlYWRlciIsInVwY19lX3JlYWRlciIsImkyb2Y1X3JlYWRlciIsImlucHV0SW1hZ2VXcmFwcGVyIiwiX2NhbnZhcyIsIl9iYXJjb2RlUmVhZGVycyIsImluaXRSZWFkZXJzIiwiaW5pdENvbmZpZyIsIiRkZWJ1ZyIsInJlYWRlckNvbmZpZyIsInJlYWRlciIsImNvbmZpZ3VyYXRpb24iLCJtYXAiLCJ2aXMiLCJub2RlIiwicHJvcCIsImRlYnVnIiwic2hvd0ZyZXF1ZW5jeSIsInNob3dQYXR0ZXJuIiwiZGlzcGxheSIsImdldEV4dGVuZGVkTGluZSIsImFuZ2xlIiwiZXh0ZW5kTGluZSIsImFtb3VudCIsImV4dGVuc2lvbiIsImNlaWwiLCJnZXRMaW5lIiwidHJ5RGVjb2RlIiwiYmFyY29kZUxpbmUiLCJnZXRCYXJjb2RlTGluZSIsInByaW50RnJlcXVlbmN5IiwidG9CaW5hcnlMaW5lIiwicHJpbnRQYXR0ZXJuIiwidHJ5RGVjb2RlQnJ1dGVGb3JjZSIsImxpbmVBbmdsZSIsInNpZGVMZW5ndGgiLCJwb3ciLCJzbGljZXMiLCJ4ZGlyIiwieWRpciIsImdldExpbmVMZW5ndGgiLCJkZWNvZGVGcm9tQm91bmRpbmdCb3giLCJsaW5lTGVuZ3RoIiwiZHJhd0JvdW5kaW5nQm94IiwiYXRhbjIiLCJtdWx0aXBsZSIsIkJyZXNlbmhhbSIsIlNsb3BlIiwiRElSIiwiVVAiLCJET1dOIiwieDAiLCJ5MCIsIngxIiwieTEiLCJzdGVlcCIsImRlbHRheCIsImRlbHRheSIsInlzdGVwIiwicmVhZCIsInNsb3BlIiwic2xvcGUyIiwiZXh0cmVtYSIsImN1cnJlbnREaXIiLCJyVGhyZXNob2xkIiwiZmlsbENvbG9yIiwiZmlsbFJlY3QiLCJwaWNrQ29uc3RyYWludHMiLCJmYWNpbmdNYXRjaGluZyIsInN0cmVhbVJlZiIsIndhaXRGb3JWaWRlbyIsInJlc29sdmUiLCJhdHRlbXB0cyIsImNoZWNrVmlkZW8iLCJ2aWRlb1dpZHRoIiwidmlkZW9IZWlnaHQiLCJpbml0Q2FtZXJhIiwic3JjT2JqZWN0IiwiZGVwcmVjYXRlZENvbnN0cmFpbnRzIiwidmlkZW9Db25zdHJhaW50cyIsIm5vcm1hbGl6ZWQiLCJtaW5Bc3BlY3RSYXRpbyIsImFzcGVjdFJhdGlvIiwiZmFjaW5nIiwiZmFjaW5nTW9kZSIsIm5vcm1hbGl6ZWRDb25zdHJhaW50cyIsImF1ZGlvIiwiZGV2aWNlSWQiLCJlbnVtZXJhdGVWaWRlb0RldmljZXMiLCJkZXZpY2VzIiwiZGV2aWNlIiwia2luZCIsInRyYWNrcyIsImdldFZpZGVvVHJhY2tzIiwiZ2V0QWN0aXZlU3RyZWFtTGFiZWwiLCJ0cmFuc2Zvcm1NYXQyIiwibWF0MiIsImNvcHkiLCJfY3VycmVudEltYWdlV3JhcHBlciIsIl9za2VsSW1hZ2VXcmFwcGVyIiwiX3N1YkltYWdlV3JhcHBlciIsIl9sYWJlbEltYWdlV3JhcHBlciIsIl9wYXRjaEdyaWQiLCJfcGF0Y2hMYWJlbEdyaWQiLCJfaW1hZ2VUb1BhdGNoR3JpZCIsIl9iaW5hcnlJbWFnZVdyYXBwZXIiLCJfcGF0Y2hTaXplIiwiYmluYXJ5IiwiX251bVBhdGNoZXMiLCJfc2tlbGV0b25pemVyIiwic2tlbGV0b25JbWFnZURhdGEiLCJBcnJheUJ1ZmZlciIsImdsb2JhbCIsInVzZVdvcmtlciIsImJveEZyb21QYXRjaGVzIiwicGF0Y2hlcyIsIm92ZXJBdmciLCJwYXRjaCIsInRyYW5zTWF0IiwibWlueCIsIm1pbnkiLCJtYXh4IiwibWF4eSIsImJpbmFyaXplSW1hZ2UiLCJmaW5kUGF0Y2hlcyIsInBhdGNoZXNGb3VuZCIsInJhc3Rlcml6ZXIiLCJyYXN0ZXJSZXN1bHQiLCJza2VsZXRvbml6ZSIsInJhc3Rlcml6ZSIsImRlc2NyaWJlUGF0Y2giLCJmaW5kQmlnZ2VzdENvbm5lY3RlZEFyZWFzIiwibWF4TGFiZWwiLCJsYWJlbEhpc3QiLCJ0b3BMYWJlbHMiLCJzb3J0IiwiZWwiLCJmaW5kQm94ZXMiLCJzaW1pbGFyTW9tZW50cyIsInRvcENsdXN0ZXIiLCJwYXRjaFBvcyIsImVsaWdpYmxlTW9tZW50cyIsIm1hdGNoaW5nTW9tZW50cyIsIm1pbkNvbXBvbmVudFdlaWdodCIsInJhc3Rlcml6ZUFuZ3VsYXJTaW1pbGFyaXR5IiwiY3VycklkeCIsIm5vdFlldFByb2Nlc3NlZCIsImN1cnJlbnRJZHgiLCJjdXJyZW50UGF0Y2giLCJSYXN0ZXJpemVyIiwiY3JlYXRlQ29udG91cjJEIiwiZmlyc3RWZXJ0ZXgiLCJpbnNpZGVDb250b3VycyIsIm5leHRwZWVyIiwicHJldnBlZXIiLCJDT05UT1VSX0RJUiIsIkNXX0RJUiIsIkNDV19ESVIiLCJVTktOT1dOX0RJUiIsIk9VVFNJREVfRURHRSIsIklOU0lERV9FREdFIiwidHJhY2VyIiwiZGVwdGhsYWJlbCIsImJjIiwibGMiLCJsYWJlbGluZGV4IiwiY29sb3JNYXAiLCJ2ZXJ0ZXgiLCJwIiwiY2MiLCJzYyIsImNvbm5lY3RlZENvdW50IiwiZHJhd0NvbnRvdXIiLCJmaXJzdENvbnRvdXIiLCJwcSIsImlxIiwicSIsIlNrZWxldG9uaXplciIsInN0ZGxpYiIsImZvcmVpZ24iLCJpbWFnZXMiLCJpbkltYWdlUHRyIiwib3V0SW1hZ2VQdHIiLCJhSW1hZ2VQdHIiLCJiSW1hZ2VQdHIiLCJpbWFnZVB0ciIsIm1lbWNweSIsInNyY0ltYWdlUHRyIiwiZHN0SW1hZ2VQdHIiLCJzdWJJbWFnZVB0ciIsImVyb2RlZEltYWdlUHRyIiwidGVtcEltYWdlUHRyIiwic2tlbEltYWdlUHRyIiwiZG9uZSIsIkNvZGFiYXJSZWFkZXIiLCJfY291bnRlcnMiLCJTVEFSVF9FTkQiLCJNSU5fRU5DT0RFRF9DSEFSUyIsIk1BWF9BQ0NFUFRBQkxFIiwiUEFERElORyIsInN0YXJ0Q291bnRlciIsIl9pc1N0YXJ0RW5kIiwiX3ZlcmlmeVdoaXRlc3BhY2UiLCJfdmFsaWRhdGVSZXN1bHQiLCJfc3VtQ291bnRlcnMiLCJlbmRDb3VudGVyIiwiX2NhbGN1bGF0ZVBhdHRlcm5MZW5ndGgiLCJfdGhyZXNob2xkUmVzdWx0UGF0dGVybiIsImNhdGVnb3JpemF0aW9uIiwic3BhY2UiLCJuYXJyb3ciLCJjb3VudHMiLCJ3aWRlIiwiYmFyIiwiY2F0IiwiX2NoYXJUb1BhdHRlcm4iLCJuZXdraW5kIiwiY2hhciIsImNoYXJDb2RlIiwiY2hhckNvZGVBdCIsInRocmVzaG9sZHMiLCJfY29tcHV0ZUFsdGVybmF0aW5nVGhyZXNob2xkIiwiYmFyVGhyZXNob2xkIiwic3BhY2VUaHJlc2hvbGQiLCJiaXRtYXNrIiwiQ29kZTEyOFJlYWRlciIsIkNPREVfU0hJRlQiLCJDT0RFX0MiLCJDT0RFX0IiLCJDT0RFX0EiLCJTVEFSVF9DT0RFX0EiLCJTVEFSVF9DT0RFX0IiLCJTVEFSVF9DT0RFX0MiLCJTVE9QX0NPREUiLCJNT0RVTEVfSU5ESUNFUyIsIl9jb3JyZWN0IiwiY2FsY3VsYXRlQ29ycmVjdGlvbiIsIm11bHRpcGxpZXIiLCJjaGVja3N1bSIsInJhd1Jlc3VsdCIsInNoaWZ0TmV4dCIsInJlbW92ZUxhc3RDaGFyYWN0ZXIiLCJzcGxpY2UiLCJleHBlY3RlZCIsInN1bU5vcm1hbGl6ZWQiLCJzdW1FeHBlY3RlZCIsIkNvZGUzOVZJTlJlYWRlciIsInBhdHRlcm5zIiwiSU9RIiwiQVowOSIsInJlcGxhY2UiLCJfY2hlY2tDaGVja3N1bSIsIkVBTjJSZWFkZXIiLCJwYXJzZUludCIsIkVBTjVSZWFkZXIiLCJDSEVDS19ESUdJVF9FTkNPRElOR1MiLCJleHRlbnNpb25DaGVja3N1bSIsImRldGVybWluZUNoZWNrRGlnaXQiLCJFQU44UmVhZGVyIiwiSTJvZjVSZWFkZXIiLCJiYXJTcGFjZVJhdGlvIiwibm9ybWFsaXplQmFyU3BhY2VXaWR0aCIsIk4iLCJXIiwid3JpdGFibGUiLCJNQVhfQ09SUkVDVElPTl9GQUNUT1IiLCJjb3VudGVyU3VtIiwiY29kZVN1bSIsImNvcnJlY3Rpb25SYXRpbyIsImNvcnJlY3Rpb25SYXRpb0ludmVyc2UiLCJuYXJyb3dCYXJXaWR0aCIsIl9kZWNvZGVQYWlyIiwiY291bnRlclBhaXIiLCJjb2RlcyIsImNvdW50ZXJMZW5ndGgiLCJfdmVyaWZ5Q291bnRlckxlbmd0aCIsIlVQQ0VSZWFkZXIiLCJfZGV0ZXJtaW5lUGFyaXR5IiwibnJTeXN0ZW0iLCJfY29udmVydFRvVVBDQSIsInVwY2EiLCJsYXN0RGlnaXQiLCJVUENSZWFkZXIiLCJjaGFyQXQiLCJzdWJzdHJpbmciXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOzs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsU0FBUztBQUNwQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDNUZBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOzs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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O0FDakJBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCLFVBQVU7QUFDVjtBQUNBLGFBQWEsU0FBUztBQUN0QixVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUMvQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDM0JBLGlEOzs7Ozs7QUNBQSxpRDs7Ozs7O0FDQUEsaUQiLCJmaWxlIjoicXVhZ2dhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiZ2V0LXBpeGVsc1wiKSwgcmVxdWlyZShcIm5kYXJyYXlcIiksIHJlcXVpcmUoXCJuZGFycmF5LWxpbmVhci1pbnRlcnBvbGF0ZVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJnZXQtcGl4ZWxzXCIsIFwibmRhcnJheVwiLCBcIm5kYXJyYXktbGluZWFyLWludGVycG9sYXRlXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlF1YWdnYVwiXSA9IGZhY3RvcnkocmVxdWlyZShcImdldC1waXhlbHNcIiksIHJlcXVpcmUoXCJuZGFycmF5XCIpLCByZXF1aXJlKFwibmRhcnJheS1saW5lYXItaW50ZXJwb2xhdGVcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlF1YWdnYVwiXSA9IGZhY3Rvcnkocm9vdFtcImdldC1waXhlbHNcIl0sIHJvb3RbXCJuZGFycmF5XCJdLCByb290W1wibmRhcnJheS1saW5lYXItaW50ZXJwb2xhdGVcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNjJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNjNfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNjRfXykge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTY1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA4Y2Q1NWE5MTViMjQxYjVhMTk5MiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9pc09iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9pc0FycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBCYXJjb2RlUmVhZGVyIGZyb20gJy4vYmFyY29kZV9yZWFkZXInO1xuaW1wb3J0IHttZXJnZX0gZnJvbSAnbG9kYXNoJztcblxuZnVuY3Rpb24gRUFOUmVhZGVyKG9wdHMsIHN1cHBsZW1lbnRzKSB7XG4gICAgb3B0cyA9IG1lcmdlKGdldERlZmF1bENvbmZpZygpLCBvcHRzKTtcbiAgICBCYXJjb2RlUmVhZGVyLmNhbGwodGhpcywgb3B0cywgc3VwcGxlbWVudHMpO1xufVxuXG5mdW5jdGlvbiBnZXREZWZhdWxDb25maWcoKSB7XG4gICAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gICAgT2JqZWN0LmtleXMoRUFOUmVhZGVyLkNPTkZJR19LRVlTKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICBjb25maWdba2V5XSA9IEVBTlJlYWRlci5DT05GSUdfS0VZU1trZXldLmRlZmF1bHQ7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbmZpZztcbn1cblxudmFyIHByb3BlcnRpZXMgPSB7XG4gICAgQ09ERV9MX1NUQVJUOiB7dmFsdWU6IDB9LFxuICAgIENPREVfR19TVEFSVDoge3ZhbHVlOiAxMH0sXG4gICAgU1RBUlRfUEFUVEVSTjoge3ZhbHVlOiBbMSwgMSwgMV19LFxuICAgIFNUT1BfUEFUVEVSTjoge3ZhbHVlOiBbMSwgMSwgMV19LFxuICAgIE1JRERMRV9QQVRURVJOOiB7dmFsdWU6IFsxLCAxLCAxLCAxLCAxXX0sXG4gICAgRVhURU5TSU9OX1NUQVJUX1BBVFRFUk46IHt2YWx1ZTogWzEsIDEsIDJdfSxcbiAgICBDT0RFX1BBVFRFUk46IHt2YWx1ZTogW1xuICAgICAgICBbMywgMiwgMSwgMV0sXG4gICAgICAgIFsyLCAyLCAyLCAxXSxcbiAgICAgICAgWzIsIDEsIDIsIDJdLFxuICAgICAgICBbMSwgNCwgMSwgMV0sXG4gICAgICAgIFsxLCAxLCAzLCAyXSxcbiAgICAgICAgWzEsIDIsIDMsIDFdLFxuICAgICAgICBbMSwgMSwgMSwgNF0sXG4gICAgICAgIFsxLCAzLCAxLCAyXSxcbiAgICAgICAgWzEsIDIsIDEsIDNdLFxuICAgICAgICBbMywgMSwgMSwgMl0sXG4gICAgICAgIFsxLCAxLCAyLCAzXSxcbiAgICAgICAgWzEsIDIsIDIsIDJdLFxuICAgICAgICBbMiwgMiwgMSwgMl0sXG4gICAgICAgIFsxLCAxLCA0LCAxXSxcbiAgICAgICAgWzIsIDMsIDEsIDFdLFxuICAgICAgICBbMSwgMywgMiwgMV0sXG4gICAgICAgIFs0LCAxLCAxLCAxXSxcbiAgICAgICAgWzIsIDEsIDMsIDFdLFxuICAgICAgICBbMywgMSwgMiwgMV0sXG4gICAgICAgIFsyLCAxLCAxLCAzXVxuICAgIF19LFxuICAgIENPREVfRlJFUVVFTkNZOiB7dmFsdWU6IFswLCAxMSwgMTMsIDE0LCAxOSwgMjUsIDI4LCAyMSwgMjIsIDI2XX0sXG4gICAgU0lOR0xFX0NPREVfRVJST1I6IHt2YWx1ZTogMC43MH0sXG4gICAgQVZHX0NPREVfRVJST1I6IHt2YWx1ZTogMC40OH0sXG4gICAgRk9STUFUOiB7dmFsdWU6IFwiZWFuXzEzXCIsIHdyaXRlYWJsZTogZmFsc2V9XG59O1xuXG5FQU5SZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XG5FQU5SZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRUFOUmVhZGVyO1xuXG5FQU5SZWFkZXIucHJvdG90eXBlLl9kZWNvZGVDb2RlID0gZnVuY3Rpb24oc3RhcnQsIGNvZGVyYW5nZSkge1xuICAgIHZhciBjb3VudGVyID0gWzAsIDAsIDAsIDBdLFxuICAgICAgICBpLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgb2Zmc2V0ID0gc3RhcnQsXG4gICAgICAgIGlzV2hpdGUgPSAhc2VsZi5fcm93W29mZnNldF0sXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxuICAgICAgICBiZXN0TWF0Y2ggPSB7XG4gICAgICAgICAgICBlcnJvcjogTnVtYmVyLk1BWF9WQUxVRSxcbiAgICAgICAgICAgIGNvZGU6IC0xLFxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgICAgZW5kOiBzdGFydFxuICAgICAgICB9LFxuICAgICAgICBjb2RlLFxuICAgICAgICBlcnJvcjtcblxuICAgIGlmICghY29kZXJhbmdlKSB7XG4gICAgICAgIGNvZGVyYW5nZSA9IHNlbGYuQ09ERV9QQVRURVJOLmxlbmd0aDtcbiAgICB9XG5cbiAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb2RlID0gMDsgY29kZSA8IGNvZGVyYW5nZTsgY29kZSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKGNvdW50ZXIsIHNlbGYuQ09ERV9QQVRURVJOW2NvZGVdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIDwgYmVzdE1hdGNoLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guY29kZSA9IGNvZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZW5kID0gaTtcbiAgICAgICAgICAgICAgICBpZiAoYmVzdE1hdGNoLmVycm9yID4gc2VsZi5BVkdfQ09ERV9FUlJPUikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJlc3RNYXRjaDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XG4gICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5FQU5SZWFkZXIucHJvdG90eXBlLl9maW5kUGF0dGVybiA9IGZ1bmN0aW9uKHBhdHRlcm4sIG9mZnNldCwgaXNXaGl0ZSwgdHJ5SGFyZGVyLCBlcHNpbG9uKSB7XG4gICAgdmFyIGNvdW50ZXIgPSBbXSxcbiAgICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICAgIGksXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxuICAgICAgICBiZXN0TWF0Y2ggPSB7XG4gICAgICAgICAgICBlcnJvcjogTnVtYmVyLk1BWF9WQUxVRSxcbiAgICAgICAgICAgIGNvZGU6IC0xLFxuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICBlbmQ6IDBcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIGosXG4gICAgICAgIHN1bTtcblxuICAgIGlmICghb2Zmc2V0KSB7XG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KTtcbiAgICB9XG5cbiAgICBpZiAoaXNXaGl0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlzV2hpdGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodHJ5SGFyZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdHJ5SGFyZGVyID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIGVwc2lsb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBlcHNpbG9uID0gc2VsZi5BVkdfQ09ERV9FUlJPUjtcbiAgICB9XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8IHBhdHRlcm4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY291bnRlcltpXSA9IDA7XG4gICAgfVxuXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIHN1bSA9IDA7XG4gICAgICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBjb3VudGVyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBjb3VudGVyW2pdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlcnJvciA9IHNlbGYuX21hdGNoUGF0dGVybihjb3VudGVyLCBwYXR0ZXJuKTtcblxuICAgICAgICAgICAgICAgIGlmIChlcnJvciA8IGVwc2lsb24pIHtcbiAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5zdGFydCA9IGkgLSBzdW07XG4gICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHJ5SGFyZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgY291bnRlci5sZW5ndGggLSAyOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbal0gPSBjb3VudGVyW2ogKyAyXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXIubGVuZ3RoIC0gMl0gPSAwO1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXIubGVuZ3RoIC0gMV0gPSAwO1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyUG9zLS07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcbiAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbkVBTlJlYWRlci5wcm90b3R5cGUuX2ZpbmRTdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgbGVhZGluZ1doaXRlc3BhY2VTdGFydCxcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpLFxuICAgICAgICBzdGFydEluZm87XG5cbiAgICB3aGlsZSAoIXN0YXJ0SW5mbykge1xuICAgICAgICBzdGFydEluZm8gPSBzZWxmLl9maW5kUGF0dGVybihzZWxmLlNUQVJUX1BBVFRFUk4sIG9mZnNldCk7XG4gICAgICAgIGlmICghc3RhcnRJbmZvKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0ID0gc3RhcnRJbmZvLnN0YXJ0IC0gKHN0YXJ0SW5mby5lbmQgLSBzdGFydEluZm8uc3RhcnQpO1xuICAgICAgICBpZiAobGVhZGluZ1doaXRlc3BhY2VTdGFydCA+PSAwKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5fbWF0Y2hSYW5nZShsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0LCBzdGFydEluZm8uc3RhcnQsIDApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXJ0SW5mbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvZmZzZXQgPSBzdGFydEluZm8uZW5kO1xuICAgICAgICBzdGFydEluZm8gPSBudWxsO1xuICAgIH1cbn07XG5cbkVBTlJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZSA9IGZ1bmN0aW9uKGVuZEluZm8pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZDtcblxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IGVuZEluZm8uZW5kICsgKGVuZEluZm8uZW5kIC0gZW5kSW5mby5zdGFydCk7XG4gICAgaWYgKHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA8IHNlbGYuX3Jvdy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UoZW5kSW5mby5lbmQsIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCwgMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZmluZEVuZCA9IGZ1bmN0aW9uKG9mZnNldCwgaXNXaGl0ZSkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgZW5kSW5mbyA9IHNlbGYuX2ZpbmRQYXR0ZXJuKHNlbGYuU1RPUF9QQVRURVJOLCBvZmZzZXQsIGlzV2hpdGUsIGZhbHNlKTtcblxuICAgIHJldHVybiBlbmRJbmZvICE9PSBudWxsID8gc2VsZi5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlKGVuZEluZm8pIDogbnVsbDtcbn07XG5cbkVBTlJlYWRlci5wcm90b3R5cGUuX2NhbGN1bGF0ZUZpcnN0RGlnaXQgPSBmdW5jdGlvbihjb2RlRnJlcXVlbmN5KSB7XG4gICAgdmFyIGksXG4gICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgZm9yICggaSA9IDA7IGkgPCBzZWxmLkNPREVfRlJFUVVFTkNZLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChjb2RlRnJlcXVlbmN5ID09PSBzZWxmLkNPREVfRlJFUVVFTkNZW2ldKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbkVBTlJlYWRlci5wcm90b3R5cGUuX2RlY29kZVBheWxvYWQgPSBmdW5jdGlvbihjb2RlLCByZXN1bHQsIGRlY29kZWRDb2Rlcykge1xuICAgIHZhciBpLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgY29kZUZyZXF1ZW5jeSA9IDB4MCxcbiAgICAgICAgZmlyc3REaWdpdDtcblxuICAgIGZvciAoIGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kKTtcbiAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29kZS5jb2RlID49IHNlbGYuQ09ERV9HX1NUQVJUKSB7XG4gICAgICAgICAgICBjb2RlLmNvZGUgPSBjb2RlLmNvZGUgLSBzZWxmLkNPREVfR19TVEFSVDtcbiAgICAgICAgICAgIGNvZGVGcmVxdWVuY3kgfD0gMSA8PCAoNSAtIGkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29kZUZyZXF1ZW5jeSB8PSAwIDw8ICg1IC0gaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0LnB1c2goY29kZS5jb2RlKTtcbiAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XG4gICAgfVxuXG4gICAgZmlyc3REaWdpdCA9IHNlbGYuX2NhbGN1bGF0ZUZpcnN0RGlnaXQoY29kZUZyZXF1ZW5jeSk7XG4gICAgaWYgKGZpcnN0RGlnaXQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJlc3VsdC51bnNoaWZ0KGZpcnN0RGlnaXQpO1xuXG4gICAgY29kZSA9IHNlbGYuX2ZpbmRQYXR0ZXJuKHNlbGYuTUlERExFX1BBVFRFUk4sIGNvZGUuZW5kLCB0cnVlLCBmYWxzZSk7XG4gICAgaWYgKGNvZGUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xuXG4gICAgZm9yICggaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICAgICAgY29kZSA9IHNlbGYuX2RlY29kZUNvZGUoY29kZS5lbmQsIHNlbGYuQ09ERV9HX1NUQVJUKTtcbiAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcbiAgICAgICAgcmVzdWx0LnB1c2goY29kZS5jb2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29kZTtcbn07XG5cbkVBTlJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdGFydEluZm8sXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBjb2RlLFxuICAgICAgICByZXN1bHQgPSBbXSxcbiAgICAgICAgZGVjb2RlZENvZGVzID0gW10sXG4gICAgICAgIHJlc3VsdEluZm8gPSB7fTtcblxuICAgIHN0YXJ0SW5mbyA9IHNlbGYuX2ZpbmRTdGFydCgpO1xuICAgIGlmICghc3RhcnRJbmZvKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb2RlID0ge1xuICAgICAgICBjb2RlOiBzdGFydEluZm8uY29kZSxcbiAgICAgICAgc3RhcnQ6IHN0YXJ0SW5mby5zdGFydCxcbiAgICAgICAgZW5kOiBzdGFydEluZm8uZW5kXG4gICAgfTtcbiAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcbiAgICBjb2RlID0gc2VsZi5fZGVjb2RlUGF5bG9hZChjb2RlLCByZXN1bHQsIGRlY29kZWRDb2Rlcyk7XG4gICAgaWYgKCFjb2RlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb2RlID0gc2VsZi5fZmluZEVuZChjb2RlLmVuZCwgZmFsc2UpO1xuICAgIGlmICghY29kZSl7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xuXG4gICAgLy8gQ2hlY2tzdW1cbiAgICBpZiAoIXNlbGYuX2NoZWNrc3VtKHJlc3VsdCkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3VwcGxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgZXh0ID0gdGhpcy5fZGVjb2RlRXh0ZW5zaW9ucyhjb2RlLmVuZCk7XG4gICAgICAgIGlmICghZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbGFzdENvZGUgPSBleHQuZGVjb2RlZENvZGVzW2V4dC5kZWNvZGVkQ29kZXMubGVuZ3RoLTFdLFxuICAgICAgICAgICAgZW5kSW5mbyA9IHtcbiAgICAgICAgICAgICAgICBzdGFydDogbGFzdENvZGUuc3RhcnQgKyAoKChsYXN0Q29kZS5lbmQgLSBsYXN0Q29kZS5zdGFydCkgLyAyKSB8IDApLFxuICAgICAgICAgICAgICAgIGVuZDogbGFzdENvZGUuZW5kXG4gICAgICAgICAgICB9O1xuICAgICAgICBpZighc2VsZi5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlKGVuZEluZm8pKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHRJbmZvID0ge1xuICAgICAgICAgICAgc3VwcGxlbWVudDogZXh0LFxuICAgICAgICAgICAgY29kZTogcmVzdWx0LmpvaW4oXCJcIikgKyBleHQuY29kZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29kZTogcmVzdWx0LmpvaW4oXCJcIiksXG4gICAgICAgIHN0YXJ0OiBzdGFydEluZm8uc3RhcnQsXG4gICAgICAgIGVuZDogY29kZS5lbmQsXG4gICAgICAgIGNvZGVzZXQ6IFwiXCIsXG4gICAgICAgIHN0YXJ0SW5mbzogc3RhcnRJbmZvLFxuICAgICAgICBkZWNvZGVkQ29kZXM6IGRlY29kZWRDb2RlcyxcbiAgICAgICAgLi4ucmVzdWx0SW5mb1xuICAgIH07XG59O1xuXG5FQU5SZWFkZXIucHJvdG90eXBlLl9kZWNvZGVFeHRlbnNpb25zID0gZnVuY3Rpb24ob2Zmc2V0KSB7XG4gICAgdmFyIGksXG4gICAgICAgIHN0YXJ0ID0gdGhpcy5fbmV4dFNldCh0aGlzLl9yb3csIG9mZnNldCksXG4gICAgICAgIHN0YXJ0SW5mbyA9IHRoaXMuX2ZpbmRQYXR0ZXJuKHRoaXMuRVhURU5TSU9OX1NUQVJUX1BBVFRFUk4sIHN0YXJ0LCBmYWxzZSwgZmFsc2UpLFxuICAgICAgICByZXN1bHQ7XG5cbiAgICBpZiAoc3RhcnRJbmZvID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnN1cHBsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuc3VwcGxlbWVudHNbaV0uZGVjb2RlKHRoaXMuX3Jvdywgc3RhcnRJbmZvLmVuZCk7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY29kZTogcmVzdWx0LmNvZGUsXG4gICAgICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICAgICAgc3RhcnRJbmZvLFxuICAgICAgICAgICAgICAgIGVuZDogcmVzdWx0LmVuZCxcbiAgICAgICAgICAgICAgICBjb2Rlc2V0OiBcIlwiLFxuICAgICAgICAgICAgICAgIGRlY29kZWRDb2RlczogcmVzdWx0LmRlY29kZWRDb2Rlc1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuRUFOUmVhZGVyLnByb3RvdHlwZS5fY2hlY2tzdW0gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICB2YXIgc3VtID0gMCwgaTtcblxuICAgIGZvciAoIGkgPSByZXN1bHQubGVuZ3RoIC0gMjsgaSA+PSAwOyBpIC09IDIpIHtcbiAgICAgICAgc3VtICs9IHJlc3VsdFtpXTtcbiAgICB9XG4gICAgc3VtICo9IDM7XG4gICAgZm9yICggaSA9IHJlc3VsdC5sZW5ndGggLSAxOyBpID49IDA7IGkgLT0gMikge1xuICAgICAgICBzdW0gKz0gcmVzdWx0W2ldO1xuICAgIH1cbiAgICByZXR1cm4gc3VtICUgMTAgPT09IDA7XG59O1xuXG5FQU5SZWFkZXIuQ09ORklHX0tFWVMgPSB7XG4gICAgc3VwcGxlbWVudHM6IHtcbiAgICAgICAgJ3R5cGUnOiAnYXJyYXlPZihzdHJpbmcpJyxcbiAgICAgICAgJ2RlZmF1bHQnOiBbXSxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0FsbG93ZWQgZXh0ZW5zaW9ucyB0byBiZSBkZWNvZGVkICgyIGFuZC9vciA1KSdcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCAoRUFOUmVhZGVyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yZWFkZXIvZWFuX3JlYWRlci5qcyIsInZhciBmcmVlR2xvYmFsID0gcmVxdWlyZSgnLi9fZnJlZUdsb2JhbCcpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm9vdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX3Jvb3QuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9pc09iamVjdExpa2UuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gQmFyY29kZVJlYWRlcihjb25maWcsIHN1cHBsZW1lbnRzKSB7XG4gICAgdGhpcy5fcm93ID0gW107XG4gICAgdGhpcy5jb25maWcgPSBjb25maWcgfHwge307XG4gICAgdGhpcy5zdXBwbGVtZW50cyA9IHN1cHBsZW1lbnRzO1xuICAgIHJldHVybiB0aGlzO1xufVxuXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbmV4dFVuc2V0ID0gZnVuY3Rpb24obGluZSwgc3RhcnQpIHtcbiAgICB2YXIgaTtcblxuICAgIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN0YXJ0ID0gMDtcbiAgICB9XG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBsaW5lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghbGluZVtpXSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxpbmUubGVuZ3RoO1xufTtcblxuQmFyY29kZVJlYWRlci5wcm90b3R5cGUuX21hdGNoUGF0dGVybiA9IGZ1bmN0aW9uKGNvdW50ZXIsIGNvZGUsIG1heFNpbmdsZUVycm9yKSB7XG4gICAgdmFyIGksXG4gICAgICAgIGVycm9yID0gMCxcbiAgICAgICAgc2luZ2xlRXJyb3IgPSAwLFxuICAgICAgICBzdW0gPSAwLFxuICAgICAgICBtb2R1bG8gPSAwLFxuICAgICAgICBiYXJXaWR0aCxcbiAgICAgICAgY291bnQsXG4gICAgICAgIHNjYWxlZDtcblxuICAgIG1heFNpbmdsZUVycm9yID0gbWF4U2luZ2xlRXJyb3IgfHwgdGhpcy5TSU5HTEVfQ09ERV9FUlJPUiB8fCAxO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc3VtICs9IGNvdW50ZXJbaV07XG4gICAgICAgIG1vZHVsbyArPSBjb2RlW2ldO1xuICAgIH1cbiAgICBpZiAoc3VtIDwgbW9kdWxvKSB7XG4gICAgICAgIHJldHVybiBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgIH1cbiAgICBiYXJXaWR0aCA9IHN1bSAvIG1vZHVsbztcbiAgICBtYXhTaW5nbGVFcnJvciAqPSBiYXJXaWR0aDtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvdW50ID0gY291bnRlcltpXTtcbiAgICAgICAgc2NhbGVkID0gY29kZVtpXSAqIGJhcldpZHRoO1xuICAgICAgICBzaW5nbGVFcnJvciA9IE1hdGguYWJzKGNvdW50IC0gc2NhbGVkKSAvIHNjYWxlZDtcbiAgICAgICAgaWYgKHNpbmdsZUVycm9yID4gbWF4U2luZ2xlRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICB9XG4gICAgICAgIGVycm9yICs9IHNpbmdsZUVycm9yO1xuICAgIH1cbiAgICByZXR1cm4gZXJyb3IgLyBtb2R1bG87XG59O1xuXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbmV4dFNldCA9IGZ1bmN0aW9uKGxpbmUsIG9mZnNldCkge1xuICAgIHZhciBpO1xuXG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG4gICAgZm9yIChpID0gb2Zmc2V0OyBpIDwgbGluZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobGluZVtpXSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxpbmUubGVuZ3RoO1xufTtcblxuQmFyY29kZVJlYWRlci5wcm90b3R5cGUuX2NvcnJlY3RCYXJzID0gZnVuY3Rpb24oY291bnRlciwgY29ycmVjdGlvbiwgaW5kaWNlcykge1xuICAgIHZhciBsZW5ndGggPSBpbmRpY2VzLmxlbmd0aCxcbiAgICAgICAgdG1wID0gMDtcbiAgICB3aGlsZShsZW5ndGgtLSkge1xuICAgICAgICB0bXAgPSBjb3VudGVyW2luZGljZXNbbGVuZ3RoXV0gKiAoMSAtICgoMSAtIGNvcnJlY3Rpb24pIC8gMikpO1xuICAgICAgICBpZiAodG1wID4gMSkge1xuICAgICAgICAgICAgY291bnRlcltpbmRpY2VzW2xlbmd0aF1dID0gdG1wO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hUcmFjZSA9IGZ1bmN0aW9uKGNtcENvdW50ZXIsIGVwc2lsb24pIHtcbiAgICB2YXIgY291bnRlciA9IFtdLFxuICAgICAgICBpLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpLFxuICAgICAgICBpc1doaXRlID0gIXNlbGYuX3Jvd1tvZmZzZXRdLFxuICAgICAgICBjb3VudGVyUG9zID0gMCxcbiAgICAgICAgYmVzdE1hdGNoID0ge1xuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXG4gICAgICAgICAgICBjb2RlOiAtMSxcbiAgICAgICAgICAgIHN0YXJ0OiAwXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yO1xuXG4gICAgaWYgKGNtcENvdW50ZXIpIHtcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBjbXBDb3VudGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb3VudGVyLnB1c2goMCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcbiAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBjb3VudGVyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4oY291bnRlciwgY21wQ291bnRlcik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIDwgZXBzaWxvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLnN0YXJ0ID0gaSAtIG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmNvdW50ZXIgPSBjb3VudGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJlc3RNYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcbiAgICAgICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudGVyLnB1c2goMCk7XG4gICAgICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XG4gICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XG4gICAgICAgICAgICAgICAgY291bnRlci5wdXNoKDApO1xuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xuICAgICAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIGNtcENvdW50ZXIgd2FzIG5vdCBnaXZlblxuICAgIGJlc3RNYXRjaC5zdGFydCA9IG9mZnNldDtcbiAgICBiZXN0TWF0Y2guZW5kID0gc2VsZi5fcm93Lmxlbmd0aCAtIDE7XG4gICAgYmVzdE1hdGNoLmNvdW50ZXIgPSBjb3VudGVyO1xuICAgIHJldHVybiBiZXN0TWF0Y2g7XG59O1xuXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5kZWNvZGVQYXR0ZXJuID0gZnVuY3Rpb24ocGF0dGVybikge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgcmVzdWx0O1xuXG4gICAgc2VsZi5fcm93ID0gcGF0dGVybjtcbiAgICByZXN1bHQgPSBzZWxmLl9kZWNvZGUoKTtcbiAgICBpZiAocmVzdWx0ID09PSBudWxsKSB7XG4gICAgICAgIHNlbGYuX3Jvdy5yZXZlcnNlKCk7XG4gICAgICAgIHJlc3VsdCA9IHNlbGYuX2RlY29kZSgpO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXN1bHQuZGlyZWN0aW9uID0gQmFyY29kZVJlYWRlci5ESVJFQ1RJT04uUkVWRVJTRTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydCA9IHNlbGYuX3Jvdy5sZW5ndGggLSByZXN1bHQuc3RhcnQ7XG4gICAgICAgICAgICByZXN1bHQuZW5kID0gc2VsZi5fcm93Lmxlbmd0aCAtIHJlc3VsdC5lbmQ7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQuZGlyZWN0aW9uID0gQmFyY29kZVJlYWRlci5ESVJFQ1RJT04uRk9SV0FSRDtcbiAgICB9XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgICByZXN1bHQuZm9ybWF0ID0gc2VsZi5GT1JNQVQ7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hSYW5nZSA9IGZ1bmN0aW9uKHN0YXJ0LCBlbmQsIHZhbHVlKSB7XG4gICAgdmFyIGk7XG5cbiAgICBzdGFydCA9IHN0YXJ0IDwgMCA/IDAgOiBzdGFydDtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLl9yb3dbaV0gIT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fZmlsbENvdW50ZXJzID0gZnVuY3Rpb24ob2Zmc2V0LCBlbmQsIGlzV2hpdGUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxuICAgICAgICBpLFxuICAgICAgICBjb3VudGVycyA9IFtdO1xuXG4gICAgaXNXaGl0ZSA9ICh0eXBlb2YgaXNXaGl0ZSAhPT0gJ3VuZGVmaW5lZCcpID8gaXNXaGl0ZSA6IHRydWU7XG4gICAgb2Zmc2V0ID0gKHR5cGVvZiBvZmZzZXQgIT09ICd1bmRlZmluZWQnKSA/IG9mZnNldCA6IHNlbGYuX25leHRVbnNldChzZWxmLl9yb3cpO1xuICAgIGVuZCA9IGVuZCB8fCBzZWxmLl9yb3cubGVuZ3RoO1xuXG4gICAgY291bnRlcnNbY291bnRlclBvc10gPSAwO1xuICAgIGZvciAoaSA9IG9mZnNldDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XG4gICAgICAgICAgICBjb3VudGVyc1tjb3VudGVyUG9zXSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY291bnRlclBvcysrO1xuICAgICAgICAgICAgY291bnRlcnNbY291bnRlclBvc10gPSAxO1xuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb3VudGVycztcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgXCJGT1JNQVRcIiwge1xuICAgIHZhbHVlOiAndW5rbm93bicsXG4gICAgd3JpdGVhYmxlOiBmYWxzZVxufSk7XG5cbkJhcmNvZGVSZWFkZXIuRElSRUNUSU9OID0ge1xuICAgIEZPUldBUkQ6IDEsXG4gICAgUkVWRVJTRTogLTFcbn07XG5cbkJhcmNvZGVSZWFkZXIuRXhjZXB0aW9uID0ge1xuICAgIFN0YXJ0Tm90Rm91bmRFeGNlcHRpb246IFwiU3RhcnQtSW5mbyB3YXMgbm90IGZvdW5kIVwiLFxuICAgIENvZGVOb3RGb3VuZEV4Y2VwdGlvbjogXCJDb2RlIGNvdWxkIG5vdCBiZSBmb3VuZCFcIixcbiAgICBQYXR0ZXJuTm90Rm91bmRFeGNlcHRpb246IFwiUGF0dGVybiBjb3VsZCBub3QgYmUgZm91bmQhXCJcbn07XG5cbkJhcmNvZGVSZWFkZXIuQ09ORklHX0tFWVMgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgQmFyY29kZVJlYWRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yZWFkZXIvYmFyY29kZV9yZWFkZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IGNsb25lXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWMyIGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgdmVjdG9yXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBhIHZlY3RvciB0byBjbG9uZVxuICogQHJldHVybnMge3ZlYzJ9IGEgbmV3IDJEIHZlY3RvclxuICovXG5mdW5jdGlvbiBjbG9uZShhKSB7XG4gICAgdmFyIG91dCA9IG5ldyBGbG9hdDMyQXJyYXkoMilcbiAgICBvdXRbMF0gPSBhWzBdXG4gICAgb3V0WzFdID0gYVsxXVxuICAgIHJldHVybiBvdXRcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZ2wtdmVjMi9jbG9uZS5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgZ2V0UmF3VGFnID0gcmVxdWlyZSgnLi9fZ2V0UmF3VGFnJyksXG4gICAgb2JqZWN0VG9TdHJpbmcgPSByZXF1aXJlKCcuL19vYmplY3RUb1N0cmluZycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlR2V0VGFnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fYmFzZUdldFRhZy5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgaW5pdDogZnVuY3Rpb24oYXJyLCB2YWwpIHtcbiAgICAgICAgdmFyIGwgPSBhcnIubGVuZ3RoO1xuICAgICAgICB3aGlsZSAobC0tKSB7XG4gICAgICAgICAgICBhcnJbbF0gPSB2YWw7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2h1ZmZsZXMgdGhlIGNvbnRlbnQgb2YgYW4gYXJyYXlcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gdGhlIGFycmF5IGl0c2VsZiBzaHVmZmxlZFxuICAgICAqL1xuICAgIHNodWZmbGU6IGZ1bmN0aW9uKGFycikge1xuICAgICAgICB2YXIgaSA9IGFyci5sZW5ndGggLSAxLCBqLCB4O1xuICAgICAgICBmb3IgKGk7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSk7XG4gICAgICAgICAgICB4ID0gYXJyW2ldO1xuICAgICAgICAgICAgYXJyW2ldID0gYXJyW2pdO1xuICAgICAgICAgICAgYXJyW2pdID0geDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH0sXG5cbiAgICB0b1BvaW50TGlzdDogZnVuY3Rpb24oYXJyKSB7XG4gICAgICAgIHZhciBpLCBqLCByb3cgPSBbXSwgcm93cyA9IFtdO1xuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcm93ID0gW107XG4gICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IGFycltpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHJvd1tqXSA9IGFycltpXVtqXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvd3NbaV0gPSBcIltcIiArIHJvdy5qb2luKFwiLFwiKSArIFwiXVwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIltcIiArIHJvd3Muam9pbihcIixcXHJcXG5cIikgKyBcIl1cIjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyB0aGUgZWxlbWVudHMgd2hpY2gncyBzY29yZSBpcyBiaWdnZXIgdGhhbiB0aGUgdGhyZXNob2xkXG4gICAgICogQHJldHVybiB7QXJyYXl9IHRoZSByZWR1Y2VkIGFycmF5XG4gICAgICovXG4gICAgdGhyZXNob2xkOiBmdW5jdGlvbihhcnIsIHRocmVzaG9sZCwgc2NvcmVGdW5jKSB7XG4gICAgICAgIHZhciBpLCBxdWV1ZSA9IFtdO1xuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNjb3JlRnVuYy5hcHBseShhcnIsIFthcnJbaV1dKSA+PSB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKGFycltpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHF1ZXVlO1xuICAgIH0sXG5cbiAgICBtYXhJbmRleDogZnVuY3Rpb24oYXJyKSB7XG4gICAgICAgIHZhciBpLCBtYXggPSAwO1xuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGFycltpXSA+IGFyclttYXhdKSB7XG4gICAgICAgICAgICAgICAgbWF4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF4O1xuICAgIH0sXG5cbiAgICBtYXg6IGZ1bmN0aW9uKGFycikge1xuICAgICAgICB2YXIgaSwgbWF4ID0gMDtcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhcnJbaV0gPiBtYXgpIHtcbiAgICAgICAgICAgICAgICBtYXggPSBhcnJbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1heDtcbiAgICB9LFxuXG4gICAgc3VtOiBmdW5jdGlvbihhcnIpIHtcbiAgICAgICAgdmFyIGxlbmd0aCA9IGFyci5sZW5ndGgsXG4gICAgICAgICAgICBzdW0gPSAwO1xuXG4gICAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICAgICAgc3VtICs9IGFycltsZW5ndGhdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdW07XG4gICAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24vYXJyYXlfaGVscGVyLmpzIiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIGRyYXdSZWN0OiBmdW5jdGlvbihwb3MsIHNpemUsIGN0eCwgc3R5bGUpe1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdHlsZS5jb2xvcjtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0eWxlLmNvbG9yO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlUmVjdChwb3MueCwgcG9zLnksIHNpemUueCwgc2l6ZS55KTtcbiAgICB9LFxuICAgIGRyYXdQYXRoOiBmdW5jdGlvbihwYXRoLCBkZWYsIGN0eCwgc3R5bGUpIHtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3R5bGUuY29sb3I7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdHlsZS5jb2xvcjtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0eWxlLmxpbmVXaWR0aDtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKHBhdGhbMF1bZGVmLnhdLCBwYXRoWzBdW2RlZi55XSk7XG4gICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgcGF0aC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhwYXRoW2pdW2RlZi54XSwgcGF0aFtqXVtkZWYueV0pO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH0sXG4gICAgZHJhd0ltYWdlOiBmdW5jdGlvbihpbWFnZURhdGEsIHNpemUsIGN0eCkge1xuICAgICAgICB2YXIgY2FudmFzRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgc2l6ZS54LCBzaXplLnkpLFxuICAgICAgICAgICAgZGF0YSA9IGNhbnZhc0RhdGEuZGF0YSxcbiAgICAgICAgICAgIGltYWdlRGF0YVBvcyA9IGltYWdlRGF0YS5sZW5ndGgsXG4gICAgICAgICAgICBjYW52YXNEYXRhUG9zID0gZGF0YS5sZW5ndGgsXG4gICAgICAgICAgICB2YWx1ZTtcblxuICAgICAgICBpZiAoY2FudmFzRGF0YVBvcyAvIGltYWdlRGF0YVBvcyAhPT0gNCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChpbWFnZURhdGFQb3MtLSl7XG4gICAgICAgICAgICB2YWx1ZSA9IGltYWdlRGF0YVtpbWFnZURhdGFQb3NdO1xuICAgICAgICAgICAgZGF0YVstLWNhbnZhc0RhdGFQb3NdID0gMjU1O1xuICAgICAgICAgICAgZGF0YVstLWNhbnZhc0RhdGFQb3NdID0gdmFsdWU7XG4gICAgICAgICAgICBkYXRhWy0tY2FudmFzRGF0YVBvc10gPSB2YWx1ZTtcbiAgICAgICAgICAgIGRhdGFbLS1jYW52YXNEYXRhUG9zXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5wdXRJbWFnZURhdGEoY2FudmFzRGF0YSwgMCwgMCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uL2ltYWdlX2RlYnVnLmpzIiwidmFyIGxpc3RDYWNoZUNsZWFyID0gcmVxdWlyZSgnLi9fbGlzdENhY2hlQ2xlYXInKSxcbiAgICBsaXN0Q2FjaGVEZWxldGUgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVEZWxldGUnKSxcbiAgICBsaXN0Q2FjaGVHZXQgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVHZXQnKSxcbiAgICBsaXN0Q2FjaGVIYXMgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVIYXMnKSxcbiAgICBsaXN0Q2FjaGVTZXQgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVTZXQnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPT0gbnVsbCA/IDAgOiBlbnRyaWVzLmxlbmd0aDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbkxpc3RDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBsaXN0Q2FjaGVDbGVhcjtcbkxpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmhhcyA9IGxpc3RDYWNoZUhhcztcbkxpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpc3RDYWNoZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX0xpc3RDYWNoZS5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX1N5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGVxID0gcmVxdWlyZSgnLi9lcScpO1xuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc29jSW5kZXhPZjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2Fzc29jSW5kZXhPZi5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc0tleSA9IHJlcXVpcmUoJy4vX2lzS2V5JyksXG4gICAgc3RyaW5nVG9QYXRoID0gcmVxdWlyZSgnLi9fc3RyaW5nVG9QYXRoJyksXG4gICAgdG9TdHJpbmcgPSByZXF1aXJlKCcuL3RvU3RyaW5nJyk7XG5cbi8qKlxuICogQ2FzdHMgYHZhbHVlYCB0byBhIHBhdGggYXJyYXkgaWYgaXQncyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkga2V5cyBvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY2FzdCBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICovXG5mdW5jdGlvbiBjYXN0UGF0aCh2YWx1ZSwgb2JqZWN0KSB7XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZXR1cm4gaXNLZXkodmFsdWUsIG9iamVjdCkgPyBbdmFsdWVdIDogc3RyaW5nVG9QYXRoKHRvU3RyaW5nKHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FzdFBhdGg7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19jYXN0UGF0aC5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzS2V5YWJsZSA9IHJlcXVpcmUoJy4vX2lzS2V5YWJsZScpO1xuXG4vKipcbiAqIEdldHMgdGhlIGRhdGEgZm9yIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSByZWZlcmVuY2Uga2V5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1hcCBkYXRhLlxuICovXG5mdW5jdGlvbiBnZXRNYXBEYXRhKG1hcCwga2V5KSB7XG4gIHZhciBkYXRhID0gbWFwLl9fZGF0YV9fO1xuICByZXR1cm4gaXNLZXlhYmxlKGtleSlcbiAgICA/IGRhdGFbdHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/ICdzdHJpbmcnIDogJ2hhc2gnXVxuICAgIDogZGF0YS5tYXA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TWFwRGF0YTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2dldE1hcERhdGEuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpICYmXG4gICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSW5kZXg7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19pc0luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF0aXZlQ3JlYXRlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fbmF0aXZlQ3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlcTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvZXEuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBiYXNlSXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL19iYXNlSXNBcmd1bWVudHMnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcmd1bWVudHMgPSBiYXNlSXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPyBiYXNlSXNBcmd1bWVudHMgOiBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAhcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0FyZ3VtZW50cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvaXNBcmd1bWVudHMuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBDbHVzdGVyMiBmcm9tICcuL2NsdXN0ZXInO1xuaW1wb3J0IEFycmF5SGVscGVyIGZyb20gJy4vYXJyYXlfaGVscGVyJztcbmNvbnN0IHZlYzIgPSB7XG4gICAgY2xvbmU6IHJlcXVpcmUoJ2dsLXZlYzIvY2xvbmUnKSxcbn07XG5jb25zdCB2ZWMzID0ge1xuICAgIGNsb25lOiByZXF1aXJlKCdnbC12ZWMzL2Nsb25lJyksXG59O1xuXG4vKipcbiAqIEBwYXJhbSB4IHgtY29vcmRpbmF0ZVxuICogQHBhcmFtIHkgeS1jb29yZGluYXRlXG4gKiBAcmV0dXJuIEltYWdlUmVmZXJlbmNlIHt4LHl9IENvb3JkaW5hdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGltYWdlUmVmKHgsIHkpIHtcbiAgICB2YXIgdGhhdCA9IHtcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeSxcbiAgICAgICAgdG9WZWMyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB2ZWMyLmNsb25lKFt0aGlzLngsIHRoaXMueV0pO1xuICAgICAgICB9LFxuICAgICAgICB0b1ZlYzM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHZlYzMuY2xvbmUoW3RoaXMueCwgdGhpcy55LCAxXSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJvdW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHRoaXMueCA+IDAuMCA/IE1hdGguZmxvb3IodGhpcy54ICsgMC41KSA6IE1hdGguZmxvb3IodGhpcy54IC0gMC41KTtcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMueSA+IDAuMCA/IE1hdGguZmxvb3IodGhpcy55ICsgMC41KSA6IE1hdGguZmxvb3IodGhpcy55IC0gMC41KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbi8qKlxuICogQ29tcHV0ZXMgYW4gaW50ZWdyYWwgaW1hZ2Ugb2YgYSBnaXZlbiBncmF5c2NhbGUgaW1hZ2UuXG4gKiBAcGFyYW0gaW1hZ2VEYXRhQ29udGFpbmVyIHtJbWFnZURhdGFDb250YWluZXJ9IHRoZSBpbWFnZSB0byBiZSBpbnRlZ3JhdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlSW50ZWdyYWxJbWFnZTIoaW1hZ2VXcmFwcGVyLCBpbnRlZ3JhbFdyYXBwZXIpIHtcbiAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGE7XG4gICAgdmFyIHdpZHRoID0gaW1hZ2VXcmFwcGVyLnNpemUueDtcbiAgICB2YXIgaGVpZ2h0ID0gaW1hZ2VXcmFwcGVyLnNpemUueTtcbiAgICB2YXIgaW50ZWdyYWxJbWFnZURhdGEgPSBpbnRlZ3JhbFdyYXBwZXIuZGF0YTtcbiAgICB2YXIgc3VtID0gMCwgcG9zQSA9IDAsIHBvc0IgPSAwLCBwb3NDID0gMCwgcG9zRCA9IDAsIHgsIHk7XG5cbiAgICAvLyBzdW0gdXAgZmlyc3QgY29sdW1uXG4gICAgcG9zQiA9IHdpZHRoO1xuICAgIHN1bSA9IDA7XG4gICAgZm9yICggeSA9IDE7IHkgPCBoZWlnaHQ7IHkrKykge1xuICAgICAgICBzdW0gKz0gaW1hZ2VEYXRhW3Bvc0FdO1xuICAgICAgICBpbnRlZ3JhbEltYWdlRGF0YVtwb3NCXSArPSBzdW07XG4gICAgICAgIHBvc0EgKz0gd2lkdGg7XG4gICAgICAgIHBvc0IgKz0gd2lkdGg7XG4gICAgfVxuXG4gICAgcG9zQSA9IDA7XG4gICAgcG9zQiA9IDE7XG4gICAgc3VtID0gMDtcbiAgICBmb3IgKCB4ID0gMTsgeCA8IHdpZHRoOyB4KyspIHtcbiAgICAgICAgc3VtICs9IGltYWdlRGF0YVtwb3NBXTtcbiAgICAgICAgaW50ZWdyYWxJbWFnZURhdGFbcG9zQl0gKz0gc3VtO1xuICAgICAgICBwb3NBKys7XG4gICAgICAgIHBvc0IrKztcbiAgICB9XG5cbiAgICBmb3IgKCB5ID0gMTsgeSA8IGhlaWdodDsgeSsrKSB7XG4gICAgICAgIHBvc0EgPSB5ICogd2lkdGggKyAxO1xuICAgICAgICBwb3NCID0gKHkgLSAxKSAqIHdpZHRoICsgMTtcbiAgICAgICAgcG9zQyA9IHkgKiB3aWR0aDtcbiAgICAgICAgcG9zRCA9ICh5IC0gMSkgKiB3aWR0aDtcbiAgICAgICAgZm9yICggeCA9IDE7IHggPCB3aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICBpbnRlZ3JhbEltYWdlRGF0YVtwb3NBXSArPVxuICAgICAgICAgICAgICAgIGltYWdlRGF0YVtwb3NBXSArIGludGVncmFsSW1hZ2VEYXRhW3Bvc0JdICsgaW50ZWdyYWxJbWFnZURhdGFbcG9zQ10gLSBpbnRlZ3JhbEltYWdlRGF0YVtwb3NEXTtcbiAgICAgICAgICAgIHBvc0ErKztcbiAgICAgICAgICAgIHBvc0IrKztcbiAgICAgICAgICAgIHBvc0MrKztcbiAgICAgICAgICAgIHBvc0QrKztcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlSW50ZWdyYWxJbWFnZShpbWFnZVdyYXBwZXIsIGludGVncmFsV3JhcHBlcikge1xuICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YTtcbiAgICB2YXIgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54O1xuICAgIHZhciBoZWlnaHQgPSBpbWFnZVdyYXBwZXIuc2l6ZS55O1xuICAgIHZhciBpbnRlZ3JhbEltYWdlRGF0YSA9IGludGVncmFsV3JhcHBlci5kYXRhO1xuICAgIHZhciBzdW0gPSAwO1xuXG4gICAgLy8gc3VtIHVwIGZpcnN0IHJvd1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2lkdGg7IGkrKykge1xuICAgICAgICBzdW0gKz0gaW1hZ2VEYXRhW2ldO1xuICAgICAgICBpbnRlZ3JhbEltYWdlRGF0YVtpXSA9IHN1bTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciB2ID0gMTsgdiA8IGhlaWdodDsgdisrKSB7XG4gICAgICAgIHN1bSA9IDA7XG4gICAgICAgIGZvciAodmFyIHUgPSAwOyB1IDwgd2lkdGg7IHUrKykge1xuICAgICAgICAgICAgc3VtICs9IGltYWdlRGF0YVt2ICogd2lkdGggKyB1XTtcbiAgICAgICAgICAgIGludGVncmFsSW1hZ2VEYXRhWygodikgKiB3aWR0aCkgKyB1XSA9IHN1bSArIGludGVncmFsSW1hZ2VEYXRhWyh2IC0gMSkgKiB3aWR0aCArIHVdO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRocmVzaG9sZEltYWdlKGltYWdlV3JhcHBlciwgdGhyZXNob2xkLCB0YXJnZXRXcmFwcGVyKSB7XG4gICAgaWYgKCF0YXJnZXRXcmFwcGVyKSB7XG4gICAgICAgIHRhcmdldFdyYXBwZXIgPSBpbWFnZVdyYXBwZXI7XG4gICAgfVxuICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YSwgbGVuZ3RoID0gaW1hZ2VEYXRhLmxlbmd0aCwgdGFyZ2V0RGF0YSA9IHRhcmdldFdyYXBwZXIuZGF0YTtcblxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICB0YXJnZXREYXRhW2xlbmd0aF0gPSBpbWFnZURhdGFbbGVuZ3RoXSA8IHRocmVzaG9sZCA/IDEgOiAwO1xuICAgIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlSGlzdG9ncmFtKGltYWdlV3JhcHBlciwgYml0c1BlclBpeGVsKSB7XG4gICAgaWYgKCFiaXRzUGVyUGl4ZWwpIHtcbiAgICAgICAgYml0c1BlclBpeGVsID0gODtcbiAgICB9XG4gICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhLFxuICAgICAgICBsZW5ndGggPSBpbWFnZURhdGEubGVuZ3RoLFxuICAgICAgICBiaXRTaGlmdCA9IDggLSBiaXRzUGVyUGl4ZWwsXG4gICAgICAgIGJ1Y2tldENudCA9IDEgPDwgYml0c1BlclBpeGVsLFxuICAgICAgICBoaXN0ID0gbmV3IEludDMyQXJyYXkoYnVja2V0Q250KTtcblxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICBoaXN0W2ltYWdlRGF0YVtsZW5ndGhdID4+IGJpdFNoaWZ0XSsrO1xuICAgIH1cbiAgICByZXR1cm4gaGlzdDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGFycGVuTGluZShsaW5lKSB7XG4gICAgdmFyIGksXG4gICAgICAgIGxlbmd0aCA9IGxpbmUubGVuZ3RoLFxuICAgICAgICBsZWZ0ID0gbGluZVswXSxcbiAgICAgICAgY2VudGVyID0gbGluZVsxXSxcbiAgICAgICAgcmlnaHQ7XG5cbiAgICBmb3IgKGkgPSAxOyBpIDwgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIHJpZ2h0ID0gbGluZVtpICsgMV07XG4gICAgICAgIC8vICAtMSA0IC0xIGtlcm5lbFxuICAgICAgICBsaW5lW2kgLSAxXSA9ICgoKGNlbnRlciAqIDIpIC0gbGVmdCAtIHJpZ2h0KSkgJiAyNTU7XG4gICAgICAgIGxlZnQgPSBjZW50ZXI7XG4gICAgICAgIGNlbnRlciA9IHJpZ2h0O1xuICAgIH1cbiAgICByZXR1cm4gbGluZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXRlcm1pbmVPdHN1VGhyZXNob2xkKGltYWdlV3JhcHBlciwgYml0c1BlclBpeGVsKSB7XG4gICAgaWYgKCFiaXRzUGVyUGl4ZWwpIHtcbiAgICAgICAgYml0c1BlclBpeGVsID0gODtcbiAgICB9XG4gICAgdmFyIGhpc3QsXG4gICAgICAgIHRocmVzaG9sZCxcbiAgICAgICAgYml0U2hpZnQgPSA4IC0gYml0c1BlclBpeGVsO1xuXG4gICAgZnVuY3Rpb24gcHgoaW5pdCwgZW5kKSB7XG4gICAgICAgIHZhciBzdW0gPSAwLCBpO1xuICAgICAgICBmb3IgKCBpID0gaW5pdDsgaSA8PSBlbmQ7IGkrKykge1xuICAgICAgICAgICAgc3VtICs9IGhpc3RbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1bTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBteChpbml0LCBlbmQpIHtcbiAgICAgICAgdmFyIGksIHN1bSA9IDA7XG5cbiAgICAgICAgZm9yICggaSA9IGluaXQ7IGkgPD0gZW5kOyBpKyspIHtcbiAgICAgICAgICAgIHN1bSArPSBpICogaGlzdFtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdW07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGV0ZXJtaW5lVGhyZXNob2xkKCkge1xuICAgICAgICB2YXIgdmV0ID0gWzBdLCBwMSwgcDIsIHAxMiwgaywgbTEsIG0yLCBtMTIsXG4gICAgICAgICAgICBtYXggPSAoMSA8PCBiaXRzUGVyUGl4ZWwpIC0gMTtcblxuICAgICAgICBoaXN0ID0gY29tcHV0ZUhpc3RvZ3JhbShpbWFnZVdyYXBwZXIsIGJpdHNQZXJQaXhlbCk7XG4gICAgICAgIGZvciAoIGsgPSAxOyBrIDwgbWF4OyBrKyspIHtcbiAgICAgICAgICAgIHAxID0gcHgoMCwgayk7XG4gICAgICAgICAgICBwMiA9IHB4KGsgKyAxLCBtYXgpO1xuICAgICAgICAgICAgcDEyID0gcDEgKiBwMjtcbiAgICAgICAgICAgIGlmIChwMTIgPT09IDApIHtcbiAgICAgICAgICAgICAgICBwMTIgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbTEgPSBteCgwLCBrKSAqIHAyO1xuICAgICAgICAgICAgbTIgPSBteChrICsgMSwgbWF4KSAqIHAxO1xuICAgICAgICAgICAgbTEyID0gbTEgLSBtMjtcbiAgICAgICAgICAgIHZldFtrXSA9IG0xMiAqIG0xMiAvIHAxMjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQXJyYXlIZWxwZXIubWF4SW5kZXgodmV0KTtcbiAgICB9XG5cbiAgICB0aHJlc2hvbGQgPSBkZXRlcm1pbmVUaHJlc2hvbGQoKTtcbiAgICByZXR1cm4gdGhyZXNob2xkIDw8IGJpdFNoaWZ0O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG90c3VUaHJlc2hvbGQoaW1hZ2VXcmFwcGVyLCB0YXJnZXRXcmFwcGVyKSB7XG4gICAgdmFyIHRocmVzaG9sZCA9IGRldGVybWluZU90c3VUaHJlc2hvbGQoaW1hZ2VXcmFwcGVyKTtcblxuICAgIHRocmVzaG9sZEltYWdlKGltYWdlV3JhcHBlciwgdGhyZXNob2xkLCB0YXJnZXRXcmFwcGVyKTtcbiAgICByZXR1cm4gdGhyZXNob2xkO1xufTtcblxuLy8gbG9jYWwgdGhyZXNob2xkaW5nXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZUJpbmFyeUltYWdlKGltYWdlV3JhcHBlciwgaW50ZWdyYWxXcmFwcGVyLCB0YXJnZXRXcmFwcGVyKSB7XG4gICAgY29tcHV0ZUludGVncmFsSW1hZ2UoaW1hZ2VXcmFwcGVyLCBpbnRlZ3JhbFdyYXBwZXIpO1xuXG4gICAgaWYgKCF0YXJnZXRXcmFwcGVyKSB7XG4gICAgICAgIHRhcmdldFdyYXBwZXIgPSBpbWFnZVdyYXBwZXI7XG4gICAgfVxuICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YTtcbiAgICB2YXIgdGFyZ2V0RGF0YSA9IHRhcmdldFdyYXBwZXIuZGF0YTtcbiAgICB2YXIgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54O1xuICAgIHZhciBoZWlnaHQgPSBpbWFnZVdyYXBwZXIuc2l6ZS55O1xuICAgIHZhciBpbnRlZ3JhbEltYWdlRGF0YSA9IGludGVncmFsV3JhcHBlci5kYXRhO1xuICAgIHZhciBzdW0gPSAwLCB2LCB1LCBrZXJuZWwgPSAzLCBBLCBCLCBDLCBELCBhdmcsIHNpemUgPSAoa2VybmVsICogMiArIDEpICogKGtlcm5lbCAqIDIgKyAxKTtcblxuICAgIC8vIGNsZWFyIG91dCB0b3AgJiBib3R0b20tYm9yZGVyXG4gICAgZm9yICggdiA9IDA7IHYgPD0ga2VybmVsOyB2KyspIHtcbiAgICAgICAgZm9yICggdSA9IDA7IHUgPCB3aWR0aDsgdSsrKSB7XG4gICAgICAgICAgICB0YXJnZXREYXRhWygodikgKiB3aWR0aCkgKyB1XSA9IDA7XG4gICAgICAgICAgICB0YXJnZXREYXRhWygoKGhlaWdodCAtIDEpIC0gdikgKiB3aWR0aCkgKyB1XSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjbGVhciBvdXQgbGVmdCAmIHJpZ2h0IGJvcmRlclxuICAgIGZvciAoIHYgPSBrZXJuZWw7IHYgPCBoZWlnaHQgLSBrZXJuZWw7IHYrKykge1xuICAgICAgICBmb3IgKCB1ID0gMDsgdSA8PSBrZXJuZWw7IHUrKykge1xuICAgICAgICAgICAgdGFyZ2V0RGF0YVsoKHYpICogd2lkdGgpICsgdV0gPSAwO1xuICAgICAgICAgICAgdGFyZ2V0RGF0YVsoKHYpICogd2lkdGgpICsgKHdpZHRoIC0gMSAtIHUpXSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKCB2ID0ga2VybmVsICsgMTsgdiA8IGhlaWdodCAtIGtlcm5lbCAtIDE7IHYrKykge1xuICAgICAgICBmb3IgKCB1ID0ga2VybmVsICsgMTsgdSA8IHdpZHRoIC0ga2VybmVsOyB1KyspIHtcbiAgICAgICAgICAgIEEgPSBpbnRlZ3JhbEltYWdlRGF0YVsodiAtIGtlcm5lbCAtIDEpICogd2lkdGggKyAodSAtIGtlcm5lbCAtIDEpXTtcbiAgICAgICAgICAgIEIgPSBpbnRlZ3JhbEltYWdlRGF0YVsodiAtIGtlcm5lbCAtIDEpICogd2lkdGggKyAodSArIGtlcm5lbCldO1xuICAgICAgICAgICAgQyA9IGludGVncmFsSW1hZ2VEYXRhWyh2ICsga2VybmVsKSAqIHdpZHRoICsgKHUgLSBrZXJuZWwgLSAxKV07XG4gICAgICAgICAgICBEID0gaW50ZWdyYWxJbWFnZURhdGFbKHYgKyBrZXJuZWwpICogd2lkdGggKyAodSArIGtlcm5lbCldO1xuICAgICAgICAgICAgc3VtID0gRCAtIEMgLSBCICsgQTtcbiAgICAgICAgICAgIGF2ZyA9IHN1bSAvIChzaXplKTtcbiAgICAgICAgICAgIHRhcmdldERhdGFbdiAqIHdpZHRoICsgdV0gPSBpbWFnZURhdGFbdiAqIHdpZHRoICsgdV0gPiAoYXZnICsgNSkgPyAwIDogMTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjbHVzdGVyKHBvaW50cywgdGhyZXNob2xkLCBwcm9wZXJ0eSkge1xuICAgIHZhciBpLCBrLCBjbHVzdGVyLCBwb2ludCwgY2x1c3RlcnMgPSBbXTtcblxuICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgICAgcHJvcGVydHkgPSBcInJhZFwiO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRvQ2x1c3RlcihuZXdQb2ludCkge1xuICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgZm9yICggayA9IDA7IGsgPCBjbHVzdGVycy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgY2x1c3RlciA9IGNsdXN0ZXJzW2tdO1xuICAgICAgICAgICAgaWYgKGNsdXN0ZXIuZml0cyhuZXdQb2ludCkpIHtcbiAgICAgICAgICAgICAgICBjbHVzdGVyLmFkZChuZXdQb2ludCk7XG4gICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG5cbiAgICAvLyBpdGVyYXRlIG92ZXIgZWFjaCBjbG91ZFxuICAgIGZvciAoIGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBvaW50ID0gQ2x1c3RlcjIuY3JlYXRlUG9pbnQocG9pbnRzW2ldLCBpLCBwcm9wZXJ0eSk7XG4gICAgICAgIGlmICghYWRkVG9DbHVzdGVyKHBvaW50KSkge1xuICAgICAgICAgICAgY2x1c3RlcnMucHVzaChDbHVzdGVyMi5jcmVhdGUocG9pbnQsIHRocmVzaG9sZCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjbHVzdGVycztcbn07XG5cbmV4cG9ydCBjb25zdCBUcmFjZXIgPSB7XG4gICAgdHJhY2U6IGZ1bmN0aW9uKHBvaW50cywgdmVjKSB7XG4gICAgICAgIHZhciBpdGVyYXRpb24sIG1heEl0ZXJhdGlvbnMgPSAxMCwgdG9wID0gW10sIHJlc3VsdCA9IFtdLCBjZW50ZXJQb3MgPSAwLCBjdXJyZW50UG9zID0gMDtcblxuICAgICAgICBmdW5jdGlvbiB0cmFjZShpZHgsIGZvcndhcmQpIHtcbiAgICAgICAgICAgIHZhciBmcm9tLCB0bywgdG9JZHgsIHByZWRpY3RlZFBvcywgdGhyZXNob2xkWCA9IDEsIHRocmVzaG9sZFkgPSBNYXRoLmFicyh2ZWNbMV0gLyAxMCksIGZvdW5kID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG1hdGNoKHBvcywgcHJlZGljdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBvcy54ID4gKHByZWRpY3RlZC54IC0gdGhyZXNob2xkWClcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHBvcy54IDwgKHByZWRpY3RlZC54ICsgdGhyZXNob2xkWClcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHBvcy55ID4gKHByZWRpY3RlZC55IC0gdGhyZXNob2xkWSlcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHBvcy55IDwgKHByZWRpY3RlZC55ICsgdGhyZXNob2xkWSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIG5leHQgaW5kZXggaXMgd2l0aGluIHRoZSB2ZWMgc3BlY2lmaWNhdGlvbnNcbiAgICAgICAgICAgIC8vIGlmIG5vdCwgY2hlY2sgYXMgbG9uZyBhcyB0aGUgdGhyZXNob2xkIGlzIG1ldFxuXG4gICAgICAgICAgICBmcm9tID0gcG9pbnRzW2lkeF07XG4gICAgICAgICAgICBpZiAoZm9yd2FyZCkge1xuICAgICAgICAgICAgICAgIHByZWRpY3RlZFBvcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogZnJvbS54ICsgdmVjWzBdLFxuICAgICAgICAgICAgICAgICAgICB5OiBmcm9tLnkgKyB2ZWNbMV1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcmVkaWN0ZWRQb3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGZyb20ueCAtIHZlY1swXSxcbiAgICAgICAgICAgICAgICAgICAgeTogZnJvbS55IC0gdmVjWzFdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG9JZHggPSBmb3J3YXJkID8gaWR4ICsgMSA6IGlkeCAtIDE7XG4gICAgICAgICAgICB0byA9IHBvaW50c1t0b0lkeF07XG4gICAgICAgICAgICB3aGlsZSAodG8gJiYgKCBmb3VuZCA9IG1hdGNoKHRvLCBwcmVkaWN0ZWRQb3MpKSAhPT0gdHJ1ZSAmJiAoTWF0aC5hYnModG8ueSAtIGZyb20ueSkgPCB2ZWNbMV0pKSB7XG4gICAgICAgICAgICAgICAgdG9JZHggPSBmb3J3YXJkID8gdG9JZHggKyAxIDogdG9JZHggLSAxO1xuICAgICAgICAgICAgICAgIHRvID0gcG9pbnRzW3RvSWR4XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZvdW5kID8gdG9JZHggOiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICggaXRlcmF0aW9uID0gMDsgaXRlcmF0aW9uIDwgbWF4SXRlcmF0aW9uczsgaXRlcmF0aW9uKyspIHtcbiAgICAgICAgICAgIC8vIHJhbmRvbWx5IHNlbGVjdCBwb2ludCB0byBzdGFydCB3aXRoXG4gICAgICAgICAgICBjZW50ZXJQb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb2ludHMubGVuZ3RoKTtcblxuICAgICAgICAgICAgLy8gdHJhY2UgZm9yd2FyZFxuICAgICAgICAgICAgdG9wID0gW107XG4gICAgICAgICAgICBjdXJyZW50UG9zID0gY2VudGVyUG9zO1xuICAgICAgICAgICAgdG9wLnB1c2gocG9pbnRzW2N1cnJlbnRQb3NdKTtcbiAgICAgICAgICAgIHdoaWxlICgoIGN1cnJlbnRQb3MgPSB0cmFjZShjdXJyZW50UG9zLCB0cnVlKSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0b3AucHVzaChwb2ludHNbY3VycmVudFBvc10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNlbnRlclBvcyA+IDApIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UG9zID0gY2VudGVyUG9zO1xuICAgICAgICAgICAgICAgIHdoaWxlICgoIGN1cnJlbnRQb3MgPSB0cmFjZShjdXJyZW50UG9zLCBmYWxzZSkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcC5wdXNoKHBvaW50c1tjdXJyZW50UG9zXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodG9wLmxlbmd0aCA+IHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0b3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgRElMQVRFID0gMTtcbmV4cG9ydCBjb25zdCBFUk9ERSA9IDI7XG5cbmV4cG9ydCBmdW5jdGlvbiBkaWxhdGUoaW5JbWFnZVdyYXBwZXIsIG91dEltYWdlV3JhcHBlcikge1xuICAgIHZhciB2LFxuICAgICAgICB1LFxuICAgICAgICBpbkltYWdlRGF0YSA9IGluSW1hZ2VXcmFwcGVyLmRhdGEsXG4gICAgICAgIG91dEltYWdlRGF0YSA9IG91dEltYWdlV3JhcHBlci5kYXRhLFxuICAgICAgICBoZWlnaHQgPSBpbkltYWdlV3JhcHBlci5zaXplLnksXG4gICAgICAgIHdpZHRoID0gaW5JbWFnZVdyYXBwZXIuc2l6ZS54LFxuICAgICAgICBzdW0sXG4gICAgICAgIHlTdGFydDEsXG4gICAgICAgIHlTdGFydDIsXG4gICAgICAgIHhTdGFydDEsXG4gICAgICAgIHhTdGFydDI7XG5cbiAgICBmb3IgKCB2ID0gMTsgdiA8IGhlaWdodCAtIDE7IHYrKykge1xuICAgICAgICBmb3IgKCB1ID0gMTsgdSA8IHdpZHRoIC0gMTsgdSsrKSB7XG4gICAgICAgICAgICB5U3RhcnQxID0gdiAtIDE7XG4gICAgICAgICAgICB5U3RhcnQyID0gdiArIDE7XG4gICAgICAgICAgICB4U3RhcnQxID0gdSAtIDE7XG4gICAgICAgICAgICB4U3RhcnQyID0gdSArIDE7XG4gICAgICAgICAgICBzdW0gPSBpbkltYWdlRGF0YVt5U3RhcnQxICogd2lkdGggKyB4U3RhcnQxXSArIGluSW1hZ2VEYXRhW3lTdGFydDEgKiB3aWR0aCArIHhTdGFydDJdICtcbiAgICAgICAgICAgIGluSW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdICtcbiAgICAgICAgICAgIGluSW1hZ2VEYXRhW3lTdGFydDIgKiB3aWR0aCArIHhTdGFydDFdICsgaW5JbWFnZURhdGFbeVN0YXJ0MiAqIHdpZHRoICsgeFN0YXJ0Ml07XG4gICAgICAgICAgICBvdXRJbWFnZURhdGFbdiAqIHdpZHRoICsgdV0gPSBzdW0gPiAwID8gMSA6IDA7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZXJvZGUoaW5JbWFnZVdyYXBwZXIsIG91dEltYWdlV3JhcHBlcikge1xuICAgIHZhciB2LFxuICAgICAgICB1LFxuICAgICAgICBpbkltYWdlRGF0YSA9IGluSW1hZ2VXcmFwcGVyLmRhdGEsXG4gICAgICAgIG91dEltYWdlRGF0YSA9IG91dEltYWdlV3JhcHBlci5kYXRhLFxuICAgICAgICBoZWlnaHQgPSBpbkltYWdlV3JhcHBlci5zaXplLnksXG4gICAgICAgIHdpZHRoID0gaW5JbWFnZVdyYXBwZXIuc2l6ZS54LFxuICAgICAgICBzdW0sXG4gICAgICAgIHlTdGFydDEsXG4gICAgICAgIHlTdGFydDIsXG4gICAgICAgIHhTdGFydDEsXG4gICAgICAgIHhTdGFydDI7XG5cbiAgICBmb3IgKCB2ID0gMTsgdiA8IGhlaWdodCAtIDE7IHYrKykge1xuICAgICAgICBmb3IgKCB1ID0gMTsgdSA8IHdpZHRoIC0gMTsgdSsrKSB7XG4gICAgICAgICAgICB5U3RhcnQxID0gdiAtIDE7XG4gICAgICAgICAgICB5U3RhcnQyID0gdiArIDE7XG4gICAgICAgICAgICB4U3RhcnQxID0gdSAtIDE7XG4gICAgICAgICAgICB4U3RhcnQyID0gdSArIDE7XG4gICAgICAgICAgICBzdW0gPSBpbkltYWdlRGF0YVt5U3RhcnQxICogd2lkdGggKyB4U3RhcnQxXSArIGluSW1hZ2VEYXRhW3lTdGFydDEgKiB3aWR0aCArIHhTdGFydDJdICtcbiAgICAgICAgICAgIGluSW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdICtcbiAgICAgICAgICAgIGluSW1hZ2VEYXRhW3lTdGFydDIgKiB3aWR0aCArIHhTdGFydDFdICsgaW5JbWFnZURhdGFbeVN0YXJ0MiAqIHdpZHRoICsgeFN0YXJ0Ml07XG4gICAgICAgICAgICBvdXRJbWFnZURhdGFbdiAqIHdpZHRoICsgdV0gPSBzdW0gPT09IDUgPyAxIDogMDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJ0cmFjdChhSW1hZ2VXcmFwcGVyLCBiSW1hZ2VXcmFwcGVyLCByZXN1bHRJbWFnZVdyYXBwZXIpIHtcbiAgICBpZiAoIXJlc3VsdEltYWdlV3JhcHBlcikge1xuICAgICAgICByZXN1bHRJbWFnZVdyYXBwZXIgPSBhSW1hZ2VXcmFwcGVyO1xuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gYUltYWdlV3JhcHBlci5kYXRhLmxlbmd0aCxcbiAgICAgICAgYUltYWdlRGF0YSA9IGFJbWFnZVdyYXBwZXIuZGF0YSxcbiAgICAgICAgYkltYWdlRGF0YSA9IGJJbWFnZVdyYXBwZXIuZGF0YSxcbiAgICAgICAgY0ltYWdlRGF0YSA9IHJlc3VsdEltYWdlV3JhcHBlci5kYXRhO1xuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIGNJbWFnZURhdGFbbGVuZ3RoXSA9IGFJbWFnZURhdGFbbGVuZ3RoXSAtIGJJbWFnZURhdGFbbGVuZ3RoXTtcbiAgICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gYml0d2lzZU9yKGFJbWFnZVdyYXBwZXIsIGJJbWFnZVdyYXBwZXIsIHJlc3VsdEltYWdlV3JhcHBlcikge1xuICAgIGlmICghcmVzdWx0SW1hZ2VXcmFwcGVyKSB7XG4gICAgICAgIHJlc3VsdEltYWdlV3JhcHBlciA9IGFJbWFnZVdyYXBwZXI7XG4gICAgfVxuICAgIHZhciBsZW5ndGggPSBhSW1hZ2VXcmFwcGVyLmRhdGEubGVuZ3RoLFxuICAgICAgICBhSW1hZ2VEYXRhID0gYUltYWdlV3JhcHBlci5kYXRhLFxuICAgICAgICBiSW1hZ2VEYXRhID0gYkltYWdlV3JhcHBlci5kYXRhLFxuICAgICAgICBjSW1hZ2VEYXRhID0gcmVzdWx0SW1hZ2VXcmFwcGVyLmRhdGE7XG5cbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgY0ltYWdlRGF0YVtsZW5ndGhdID0gYUltYWdlRGF0YVtsZW5ndGhdIHx8IGJJbWFnZURhdGFbbGVuZ3RoXTtcbiAgICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY291bnROb25aZXJvKGltYWdlV3JhcHBlcikge1xuICAgIHZhciBsZW5ndGggPSBpbWFnZVdyYXBwZXIuZGF0YS5sZW5ndGgsIGRhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YSwgc3VtID0gMDtcblxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICBzdW0gKz0gZGF0YVtsZW5ndGhdO1xuICAgIH1cbiAgICByZXR1cm4gc3VtO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvcEdlbmVyaWMobGlzdCwgdG9wLCBzY29yZUZ1bmMpIHtcbiAgICB2YXIgaSwgbWluSWR4ID0gMCwgbWluID0gMCwgcXVldWUgPSBbXSwgc2NvcmUsIGhpdCwgcG9zO1xuXG4gICAgZm9yICggaSA9IDA7IGkgPCB0b3A7IGkrKykge1xuICAgICAgICBxdWV1ZVtpXSA9IHtcbiAgICAgICAgICAgIHNjb3JlOiAwLFxuICAgICAgICAgICAgaXRlbTogbnVsbFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZvciAoIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBzY29yZSA9IHNjb3JlRnVuYy5hcHBseSh0aGlzLCBbbGlzdFtpXV0pO1xuICAgICAgICBpZiAoc2NvcmUgPiBtaW4pIHtcbiAgICAgICAgICAgIGhpdCA9IHF1ZXVlW21pbklkeF07XG4gICAgICAgICAgICBoaXQuc2NvcmUgPSBzY29yZTtcbiAgICAgICAgICAgIGhpdC5pdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgIG1pbiA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICAgICAgICBmb3IgKCBwb3MgPSAwOyBwb3MgPCB0b3A7IHBvcysrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlW3Bvc10uc2NvcmUgPCBtaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgbWluID0gcXVldWVbcG9zXS5zY29yZTtcbiAgICAgICAgICAgICAgICAgICAgbWluSWR4ID0gcG9zO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBxdWV1ZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBncmF5QXJyYXlGcm9tSW1hZ2UoaHRtbEltYWdlLCBvZmZzZXRYLCBjdHgsIGFycmF5KSB7XG4gICAgY3R4LmRyYXdJbWFnZShodG1sSW1hZ2UsIG9mZnNldFgsIDAsIGh0bWxJbWFnZS53aWR0aCwgaHRtbEltYWdlLmhlaWdodCk7XG4gICAgdmFyIGN0eERhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKG9mZnNldFgsIDAsIGh0bWxJbWFnZS53aWR0aCwgaHRtbEltYWdlLmhlaWdodCkuZGF0YTtcbiAgICBjb21wdXRlR3JheShjdHhEYXRhLCBhcnJheSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ3JheUFycmF5RnJvbUNvbnRleHQoY3R4LCBzaXplLCBvZmZzZXQsIGFycmF5KSB7XG4gICAgdmFyIGN0eERhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKG9mZnNldC54LCBvZmZzZXQueSwgc2l6ZS54LCBzaXplLnkpLmRhdGE7XG4gICAgY29tcHV0ZUdyYXkoY3R4RGF0YSwgYXJyYXkpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdyYXlBbmRIYWxmU2FtcGxlRnJvbUNhbnZhc0RhdGEoY2FudmFzRGF0YSwgc2l6ZSwgb3V0QXJyYXkpIHtcbiAgICB2YXIgdG9wUm93SWR4ID0gMDtcbiAgICB2YXIgYm90dG9tUm93SWR4ID0gc2l6ZS54O1xuICAgIHZhciBlbmRJZHggPSBNYXRoLmZsb29yKGNhbnZhc0RhdGEubGVuZ3RoIC8gNCk7XG4gICAgdmFyIG91dFdpZHRoID0gc2l6ZS54IC8gMjtcbiAgICB2YXIgb3V0SW1nSWR4ID0gMDtcbiAgICB2YXIgaW5XaWR0aCA9IHNpemUueDtcbiAgICB2YXIgaTtcblxuICAgIHdoaWxlIChib3R0b21Sb3dJZHggPCBlbmRJZHgpIHtcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBvdXRXaWR0aDsgaSsrKSB7XG4gICAgICAgICAgICBvdXRBcnJheVtvdXRJbWdJZHhdID0gTWF0aC5mbG9vcigoXG4gICAgICAgICAgICAgICAgKDAuMjk5ICogY2FudmFzRGF0YVt0b3BSb3dJZHggKiA0ICsgMF0gK1xuICAgICAgICAgICAgICAgICAwLjU4NyAqIGNhbnZhc0RhdGFbdG9wUm93SWR4ICogNCArIDFdICtcbiAgICAgICAgICAgICAgICAgMC4xMTQgKiBjYW52YXNEYXRhW3RvcFJvd0lkeCAqIDQgKyAyXSkgK1xuICAgICAgICAgICAgICAgICgwLjI5OSAqIGNhbnZhc0RhdGFbKHRvcFJvd0lkeCArIDEpICogNCArIDBdICtcbiAgICAgICAgICAgICAgICAgMC41ODcgKiBjYW52YXNEYXRhWyh0b3BSb3dJZHggKyAxKSAqIDQgKyAxXSArXG4gICAgICAgICAgICAgICAgIDAuMTE0ICogY2FudmFzRGF0YVsodG9wUm93SWR4ICsgMSkgKiA0ICsgMl0pICtcbiAgICAgICAgICAgICAgICAoMC4yOTkgKiBjYW52YXNEYXRhWyhib3R0b21Sb3dJZHgpICogNCArIDBdICtcbiAgICAgICAgICAgICAgICAgMC41ODcgKiBjYW52YXNEYXRhWyhib3R0b21Sb3dJZHgpICogNCArIDFdICtcbiAgICAgICAgICAgICAgICAgMC4xMTQgKiBjYW52YXNEYXRhWyhib3R0b21Sb3dJZHgpICogNCArIDJdKSArXG4gICAgICAgICAgICAgICAgKDAuMjk5ICogY2FudmFzRGF0YVsoYm90dG9tUm93SWR4ICsgMSkgKiA0ICsgMF0gK1xuICAgICAgICAgICAgICAgICAwLjU4NyAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCArIDEpICogNCArIDFdICtcbiAgICAgICAgICAgICAgICAgMC4xMTQgKiBjYW52YXNEYXRhWyhib3R0b21Sb3dJZHggKyAxKSAqIDQgKyAyXSkpIC8gNCk7XG4gICAgICAgICAgICBvdXRJbWdJZHgrKztcbiAgICAgICAgICAgIHRvcFJvd0lkeCA9IHRvcFJvd0lkeCArIDI7XG4gICAgICAgICAgICBib3R0b21Sb3dJZHggPSBib3R0b21Sb3dJZHggKyAyO1xuICAgICAgICB9XG4gICAgICAgIHRvcFJvd0lkeCA9IHRvcFJvd0lkeCArIGluV2lkdGg7XG4gICAgICAgIGJvdHRvbVJvd0lkeCA9IGJvdHRvbVJvd0lkeCArIGluV2lkdGg7XG4gICAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVHcmF5KGltYWdlRGF0YSwgb3V0QXJyYXksIGNvbmZpZykge1xuICAgIHZhciBsID0gKGltYWdlRGF0YS5sZW5ndGggLyA0KSB8IDAsXG4gICAgICAgIGksXG4gICAgICAgIHNpbmdsZUNoYW5uZWwgPSBjb25maWcgJiYgY29uZmlnLnNpbmdsZUNoYW5uZWwgPT09IHRydWU7XG5cbiAgICBpZiAoc2luZ2xlQ2hhbm5lbCkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBvdXRBcnJheVtpXSA9IGltYWdlRGF0YVtpICogNCArIDBdO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgb3V0QXJyYXlbaV0gPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgICAgIDAuMjk5ICogaW1hZ2VEYXRhW2kgKiA0ICsgMF0gKyAwLjU4NyAqIGltYWdlRGF0YVtpICogNCArIDFdICsgMC4xMTQgKiBpbWFnZURhdGFbaSAqIDQgKyAyXSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEltYWdlQXJyYXkoc3JjLCBjYWxsYmFjaywgY2FudmFzKSB7XG4gICAgaWYgKCFjYW52YXMpIHtcbiAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgfVxuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICBpbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICAgICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMsIDAsIDApO1xuICAgICAgICB2YXIgYXJyYXkgPSBuZXcgVWludDhBcnJheSh0aGlzLndpZHRoICogdGhpcy5oZWlnaHQpO1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMsIDAsIDApO1xuICAgICAgICB2YXIgZGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpLmRhdGE7XG4gICAgICAgIGNvbXB1dGVHcmF5KGRhdGEsIGFycmF5KTtcbiAgICAgICAgdGhpcy5jYWxsYmFjayhhcnJheSwge1xuICAgICAgICAgICAgeDogdGhpcy53aWR0aCxcbiAgICAgICAgICAgIHk6IHRoaXMuaGVpZ2h0XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH07XG4gICAgaW1nLnNyYyA9IHNyYztcbn07XG5cbi8qKlxuICogQHBhcmFtIGluSW1nIHtJbWFnZVdyYXBwZXJ9IGlucHV0IGltYWdlIHRvIGJlIHNhbXBsZWRcbiAqIEBwYXJhbSBvdXRJbWcge0ltYWdlV3JhcHBlcn0gdG8gYmUgc3RvcmVkIGluXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYWxmU2FtcGxlKGluSW1nV3JhcHBlciwgb3V0SW1nV3JhcHBlcikge1xuICAgIHZhciBpbkltZyA9IGluSW1nV3JhcHBlci5kYXRhO1xuICAgIHZhciBpbldpZHRoID0gaW5JbWdXcmFwcGVyLnNpemUueDtcbiAgICB2YXIgb3V0SW1nID0gb3V0SW1nV3JhcHBlci5kYXRhO1xuICAgIHZhciB0b3BSb3dJZHggPSAwO1xuICAgIHZhciBib3R0b21Sb3dJZHggPSBpbldpZHRoO1xuICAgIHZhciBlbmRJZHggPSBpbkltZy5sZW5ndGg7XG4gICAgdmFyIG91dFdpZHRoID0gaW5XaWR0aCAvIDI7XG4gICAgdmFyIG91dEltZ0lkeCA9IDA7XG4gICAgd2hpbGUgKGJvdHRvbVJvd0lkeCA8IGVuZElkeCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG91dFdpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIG91dEltZ1tvdXRJbWdJZHhdID0gTWF0aC5mbG9vcihcbiAgICAgICAgICAgICAgICAoaW5JbWdbdG9wUm93SWR4XSArIGluSW1nW3RvcFJvd0lkeCArIDFdICsgaW5JbWdbYm90dG9tUm93SWR4XSArIGluSW1nW2JvdHRvbVJvd0lkeCArIDFdKSAvIDQpO1xuICAgICAgICAgICAgb3V0SW1nSWR4Kys7XG4gICAgICAgICAgICB0b3BSb3dJZHggPSB0b3BSb3dJZHggKyAyO1xuICAgICAgICAgICAgYm90dG9tUm93SWR4ID0gYm90dG9tUm93SWR4ICsgMjtcbiAgICAgICAgfVxuICAgICAgICB0b3BSb3dJZHggPSB0b3BSb3dJZHggKyBpbldpZHRoO1xuICAgICAgICBib3R0b21Sb3dJZHggPSBib3R0b21Sb3dJZHggKyBpbldpZHRoO1xuICAgIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBoc3YycmdiKGhzdiwgcmdiKSB7XG4gICAgdmFyIGggPSBoc3ZbMF0sXG4gICAgICAgIHMgPSBoc3ZbMV0sXG4gICAgICAgIHYgPSBoc3ZbMl0sXG4gICAgICAgIGMgPSB2ICogcyxcbiAgICAgICAgeCA9IGMgKiAoMSAtIE1hdGguYWJzKChoIC8gNjApICUgMiAtIDEpKSxcbiAgICAgICAgbSA9IHYgLSBjLFxuICAgICAgICByID0gMCxcbiAgICAgICAgZyA9IDAsXG4gICAgICAgIGIgPSAwO1xuXG4gICAgcmdiID0gcmdiIHx8IFswLCAwLCAwXTtcblxuICAgIGlmIChoIDwgNjApIHtcbiAgICAgICAgciA9IGM7XG4gICAgICAgIGcgPSB4O1xuICAgIH0gZWxzZSBpZiAoaCA8IDEyMCkge1xuICAgICAgICByID0geDtcbiAgICAgICAgZyA9IGM7XG4gICAgfSBlbHNlIGlmIChoIDwgMTgwKSB7XG4gICAgICAgIGcgPSBjO1xuICAgICAgICBiID0geDtcbiAgICB9IGVsc2UgaWYgKGggPCAyNDApIHtcbiAgICAgICAgZyA9IHg7XG4gICAgICAgIGIgPSBjO1xuICAgIH0gZWxzZSBpZiAoaCA8IDMwMCkge1xuICAgICAgICByID0geDtcbiAgICAgICAgYiA9IGM7XG4gICAgfSBlbHNlIGlmIChoIDwgMzYwKSB7XG4gICAgICAgIHIgPSBjO1xuICAgICAgICBiID0geDtcbiAgICB9XG4gICAgcmdiWzBdID0gKChyICsgbSkgKiAyNTUpIHwgMDtcbiAgICByZ2JbMV0gPSAoKGcgKyBtKSAqIDI1NSkgfCAwO1xuICAgIHJnYlsyXSA9ICgoYiArIG0pICogMjU1KSB8IDA7XG4gICAgcmV0dXJuIHJnYjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfY29tcHV0ZURpdmlzb3JzKG4pIHtcbiAgICB2YXIgbGFyZ2VEaXZpc29ycyA9IFtdLFxuICAgICAgICBkaXZpc29ycyA9IFtdLFxuICAgICAgICBpO1xuXG4gICAgZm9yIChpID0gMTsgaSA8IE1hdGguc3FydChuKSArIDE7IGkrKykge1xuICAgICAgICBpZiAobiAlIGkgPT09IDApIHtcbiAgICAgICAgICAgIGRpdmlzb3JzLnB1c2goaSk7XG4gICAgICAgICAgICBpZiAoaSAhPT0gbiAvIGkpIHtcbiAgICAgICAgICAgICAgICBsYXJnZURpdmlzb3JzLnVuc2hpZnQoTWF0aC5mbG9vcihuIC8gaSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkaXZpc29ycy5jb25jYXQobGFyZ2VEaXZpc29ycyk7XG59O1xuXG5mdW5jdGlvbiBfY29tcHV0ZUludGVyc2VjdGlvbihhcnIxLCBhcnIyKSB7XG4gICAgdmFyIGkgPSAwLFxuICAgICAgICBqID0gMCxcbiAgICAgICAgcmVzdWx0ID0gW107XG5cbiAgICB3aGlsZSAoaSA8IGFycjEubGVuZ3RoICYmIGogPCBhcnIyLmxlbmd0aCkge1xuICAgICAgICBpZiAoYXJyMVtpXSA9PT0gYXJyMltqXSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goYXJyMVtpXSk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBqKys7XG4gICAgICAgIH0gZWxzZSBpZiAoYXJyMVtpXSA+IGFycjJbal0pIHtcbiAgICAgICAgICAgIGorKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVBhdGNoU2l6ZShwYXRjaFNpemUsIGltZ1NpemUpIHtcbiAgICB2YXIgZGl2aXNvcnNYID0gX2NvbXB1dGVEaXZpc29ycyhpbWdTaXplLngpLFxuICAgICAgICBkaXZpc29yc1kgPSBfY29tcHV0ZURpdmlzb3JzKGltZ1NpemUueSksXG4gICAgICAgIHdpZGVTaWRlID0gTWF0aC5tYXgoaW1nU2l6ZS54LCBpbWdTaXplLnkpLFxuICAgICAgICBjb21tb24gPSBfY29tcHV0ZUludGVyc2VjdGlvbihkaXZpc29yc1gsIGRpdmlzb3JzWSksXG4gICAgICAgIG5yT2ZQYXRjaGVzTGlzdCA9IFs4LCAxMCwgMTUsIDIwLCAzMiwgNjAsIDgwXSxcbiAgICAgICAgbnJPZlBhdGNoZXNNYXAgPSB7XG4gICAgICAgICAgICBcIngtc21hbGxcIjogNSxcbiAgICAgICAgICAgIFwic21hbGxcIjogNCxcbiAgICAgICAgICAgIFwibWVkaXVtXCI6IDMsXG4gICAgICAgICAgICBcImxhcmdlXCI6IDIsXG4gICAgICAgICAgICBcIngtbGFyZ2VcIjogMVxuICAgICAgICB9LFxuICAgICAgICBuck9mUGF0Y2hlc0lkeCA9IG5yT2ZQYXRjaGVzTWFwW3BhdGNoU2l6ZV0gfHwgbnJPZlBhdGNoZXNNYXAubWVkaXVtLFxuICAgICAgICBuck9mUGF0Y2hlcyA9IG5yT2ZQYXRjaGVzTGlzdFtuck9mUGF0Y2hlc0lkeF0sXG4gICAgICAgIGRlc2lyZWRQYXRjaFNpemUgPSBNYXRoLmZsb29yKHdpZGVTaWRlIC8gbnJPZlBhdGNoZXMpLFxuICAgICAgICBvcHRpbWFsUGF0Y2hTaXplO1xuXG4gICAgZnVuY3Rpb24gZmluZFBhdGNoU2l6ZUZvckRpdmlzb3JzKGRpdmlzb3JzKSB7XG4gICAgICAgIHZhciBpID0gMCxcbiAgICAgICAgICAgIGZvdW5kID0gZGl2aXNvcnNbTWF0aC5mbG9vcihkaXZpc29ycy5sZW5ndGggLyAyKV07XG5cbiAgICAgICAgd2hpbGUgKGkgPCAoZGl2aXNvcnMubGVuZ3RoIC0gMSkgJiYgZGl2aXNvcnNbaV0gPCBkZXNpcmVkUGF0Y2hTaXplKSB7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGl2aXNvcnNbaV0gLSBkZXNpcmVkUGF0Y2hTaXplKSA+IE1hdGguYWJzKGRpdmlzb3JzW2kgLSAxXSAtIGRlc2lyZWRQYXRjaFNpemUpKSB7XG4gICAgICAgICAgICAgICAgZm91bmQgPSBkaXZpc29yc1tpIC0gMV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvdW5kID0gZGl2aXNvcnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlc2lyZWRQYXRjaFNpemUgLyBmb3VuZCA8IG5yT2ZQYXRjaGVzTGlzdFtuck9mUGF0Y2hlc0lkeCArIDFdIC8gbnJPZlBhdGNoZXNMaXN0W25yT2ZQYXRjaGVzSWR4XSAmJlxuICAgICAgICAgICAgZGVzaXJlZFBhdGNoU2l6ZSAvIGZvdW5kID4gbnJPZlBhdGNoZXNMaXN0W25yT2ZQYXRjaGVzSWR4IC0gMV0gLyBuck9mUGF0Y2hlc0xpc3RbbnJPZlBhdGNoZXNJZHhdICkge1xuICAgICAgICAgICAgcmV0dXJuIHt4OiBmb3VuZCwgeTogZm91bmR9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIG9wdGltYWxQYXRjaFNpemUgPSBmaW5kUGF0Y2hTaXplRm9yRGl2aXNvcnMoY29tbW9uKTtcbiAgICBpZiAoIW9wdGltYWxQYXRjaFNpemUpIHtcbiAgICAgICAgb3B0aW1hbFBhdGNoU2l6ZSA9IGZpbmRQYXRjaFNpemVGb3JEaXZpc29ycyhfY29tcHV0ZURpdmlzb3JzKHdpZGVTaWRlKSk7XG4gICAgICAgIGlmICghb3B0aW1hbFBhdGNoU2l6ZSkge1xuICAgICAgICAgICAgb3B0aW1hbFBhdGNoU2l6ZSA9IGZpbmRQYXRjaFNpemVGb3JEaXZpc29ycygoX2NvbXB1dGVEaXZpc29ycyhkZXNpcmVkUGF0Y2hTaXplICogbnJPZlBhdGNoZXMpKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9wdGltYWxQYXRjaFNpemU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX3BhcnNlQ1NTRGltZW5zaW9uVmFsdWVzKHZhbHVlKSB7XG4gICAgdmFyIGRpbWVuc2lvbiA9IHtcbiAgICAgICAgdmFsdWU6IHBhcnNlRmxvYXQodmFsdWUpLFxuICAgICAgICB1bml0OiB2YWx1ZS5pbmRleE9mKFwiJVwiKSA9PT0gdmFsdWUubGVuZ3RoIC0gMSA/IFwiJVwiIDogXCIlXCJcbiAgICB9O1xuXG4gICAgcmV0dXJuIGRpbWVuc2lvbjtcbn07XG5cbmV4cG9ydCBjb25zdCBfZGltZW5zaW9uc0NvbnZlcnRlcnMgPSB7XG4gICAgdG9wOiBmdW5jdGlvbihkaW1lbnNpb24sIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKGRpbWVuc2lvbi51bml0ID09PSBcIiVcIikge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoY29udGV4dC5oZWlnaHQgKiAoZGltZW5zaW9uLnZhbHVlIC8gMTAwKSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJpZ2h0OiBmdW5jdGlvbihkaW1lbnNpb24sIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKGRpbWVuc2lvbi51bml0ID09PSBcIiVcIikge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoY29udGV4dC53aWR0aCAtIChjb250ZXh0LndpZHRoICogKGRpbWVuc2lvbi52YWx1ZSAvIDEwMCkpKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYm90dG9tOiBmdW5jdGlvbihkaW1lbnNpb24sIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKGRpbWVuc2lvbi51bml0ID09PSBcIiVcIikge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoY29udGV4dC5oZWlnaHQgLSAoY29udGV4dC5oZWlnaHQgKiAoZGltZW5zaW9uLnZhbHVlIC8gMTAwKSkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBsZWZ0OiBmdW5jdGlvbihkaW1lbnNpb24sIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKGRpbWVuc2lvbi51bml0ID09PSBcIiVcIikge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoY29udGV4dC53aWR0aCAqIChkaW1lbnNpb24udmFsdWUgLyAxMDApKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlSW1hZ2VBcmVhKGlucHV0V2lkdGgsIGlucHV0SGVpZ2h0LCBhcmVhKSB7XG4gICAgdmFyIGNvbnRleHQgPSB7d2lkdGg6IGlucHV0V2lkdGgsIGhlaWdodDogaW5wdXRIZWlnaHR9O1xuXG4gICAgdmFyIHBhcnNlZEFyZWEgPSBPYmplY3Qua2V5cyhhcmVhKS5yZWR1Y2UoZnVuY3Rpb24ocmVzdWx0LCBrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gYXJlYVtrZXldLFxuICAgICAgICAgICAgcGFyc2VkID0gX3BhcnNlQ1NTRGltZW5zaW9uVmFsdWVzKHZhbHVlKSxcbiAgICAgICAgICAgIGNhbGN1bGF0ZWQgPSBfZGltZW5zaW9uc0NvbnZlcnRlcnNba2V5XShwYXJzZWQsIGNvbnRleHQpO1xuXG4gICAgICAgIHJlc3VsdFtrZXldID0gY2FsY3VsYXRlZDtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCB7fSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzeDogcGFyc2VkQXJlYS5sZWZ0LFxuICAgICAgICBzeTogcGFyc2VkQXJlYS50b3AsXG4gICAgICAgIHN3OiBwYXJzZWRBcmVhLnJpZ2h0IC0gcGFyc2VkQXJlYS5sZWZ0LFxuICAgICAgICBzaDogcGFyc2VkQXJlYS5ib3R0b20gLSBwYXJzZWRBcmVhLnRvcFxuICAgIH07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi9jdl91dGlscy5qcyIsImltcG9ydCBTdWJJbWFnZSBmcm9tICcuL3N1YkltYWdlJztcbmltcG9ydCB7aHN2MnJnYn0gZnJvbSAnLi4vY29tbW9uL2N2X3V0aWxzJztcbmltcG9ydCBBcnJheUhlbHBlciBmcm9tICcuLi9jb21tb24vYXJyYXlfaGVscGVyJztcbmNvbnN0IHZlYzIgPSB7XG4gICAgY2xvbmU6IHJlcXVpcmUoJ2dsLXZlYzIvY2xvbmUnKSxcbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGJhc2ljIGltYWdlIGNvbWJpbmluZyB0aGUgZGF0YSBhbmQgc2l6ZS5cbiAqIEluIGFkZGl0aW9uLCBzb21lIG1ldGhvZHMgZm9yIG1hbmlwdWxhdGlvbiBhcmUgY29udGFpbmVkLlxuICogQHBhcmFtIHNpemUge3gseX0gVGhlIHNpemUgb2YgdGhlIGltYWdlIGluIHBpeGVsXG4gKiBAcGFyYW0gZGF0YSB7QXJyYXl9IElmIGdpdmVuLCBhIGZsYXQgYXJyYXkgY29udGFpbmluZyB0aGUgcGl4ZWwgZGF0YVxuICogQHBhcmFtIEFycmF5VHlwZSB7VHlwZX0gSWYgZ2l2ZW4sIHRoZSBkZXNpcmVkIERhdGFUeXBlIG9mIHRoZSBBcnJheSAobWF5IGJlIHR5cGVkL25vbi10eXBlZClcbiAqIEBwYXJhbSBpbml0aWFsaXplIHtCb29sZWFufSBJbmRpY2F0aW5nIGlmIHRoZSBhcnJheSBzaG91bGQgYmUgaW5pdGlhbGl6ZWQgb24gY3JlYXRpb24uXG4gKiBAcmV0dXJucyB7SW1hZ2VXcmFwcGVyfVxuICovXG5mdW5jdGlvbiBJbWFnZVdyYXBwZXIoc2l6ZSwgZGF0YSwgQXJyYXlUeXBlLCBpbml0aWFsaXplKSB7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIGlmIChBcnJheVR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IG5ldyBBcnJheVR5cGUoc2l6ZS54ICogc2l6ZS55KTtcbiAgICAgICAgICAgIGlmIChBcnJheVR5cGUgPT09IEFycmF5ICYmIGluaXRpYWxpemUpIHtcbiAgICAgICAgICAgICAgICBBcnJheUhlbHBlci5pbml0KHRoaXMuZGF0YSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBuZXcgVWludDhBcnJheShzaXplLnggKiBzaXplLnkpO1xuICAgICAgICAgICAgaWYgKFVpbnQ4QXJyYXkgPT09IEFycmF5ICYmIGluaXRpYWxpemUpIHtcbiAgICAgICAgICAgICAgICBBcnJheUhlbHBlci5pbml0KHRoaXMuZGF0YSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIH1cbiAgICB0aGlzLnNpemUgPSBzaXplO1xufVxuXG4vKipcbiAqIHRlc3RzIGlmIGEgcG9zaXRpb24gaXMgd2l0aGluIHRoZSBpbWFnZSB3aXRoIGEgZ2l2ZW4gb2Zmc2V0XG4gKiBAcGFyYW0gaW1nUmVmIHt4LCB5fSBUaGUgbG9jYXRpb24gdG8gdGVzdFxuICogQHBhcmFtIGJvcmRlciBOdW1iZXIgdGhlIHBhZGRpbmcgdmFsdWUgaW4gcGl4ZWxcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0cnVlIGlmIGxvY2F0aW9uIGluc2lkZSB0aGUgaW1hZ2UncyBib3JkZXIsIGZhbHNlIG90aGVyd2lzZVxuICogQHNlZSBjdmQvaW1hZ2UuaFxuICovXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLmluSW1hZ2VXaXRoQm9yZGVyID0gZnVuY3Rpb24oaW1nUmVmLCBib3JkZXIpIHtcbiAgICByZXR1cm4gKGltZ1JlZi54ID49IGJvcmRlcilcbiAgICAgICAgJiYgKGltZ1JlZi55ID49IGJvcmRlcilcbiAgICAgICAgJiYgKGltZ1JlZi54IDwgKHRoaXMuc2l6ZS54IC0gYm9yZGVyKSlcbiAgICAgICAgJiYgKGltZ1JlZi55IDwgKHRoaXMuc2l6ZS55IC0gYm9yZGVyKSk7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGJpbGluZWFyIHNhbXBsaW5nXG4gKiBAcGFyYW0gaW5JbWcgSW1hZ2UgdG8gZXh0cmFjdCBzYW1wbGUgZnJvbVxuICogQHBhcmFtIHggdGhlIHgtY29vcmRpbmF0ZVxuICogQHBhcmFtIHkgdGhlIHktY29vcmRpbmF0ZVxuICogQHJldHVybnMgdGhlIHNhbXBsZWQgdmFsdWVcbiAqIEBzZWUgY3ZkL3Zpc2lvbi5oXG4gKi9cbkltYWdlV3JhcHBlci5zYW1wbGUgPSBmdW5jdGlvbihpbkltZywgeCwgeSkge1xuICAgIHZhciBseCA9IE1hdGguZmxvb3IoeCk7XG4gICAgdmFyIGx5ID0gTWF0aC5mbG9vcih5KTtcbiAgICB2YXIgdyA9IGluSW1nLnNpemUueDtcbiAgICB2YXIgYmFzZSA9IGx5ICogaW5JbWcuc2l6ZS54ICsgbHg7XG4gICAgdmFyIGEgPSBpbkltZy5kYXRhW2Jhc2UgKyAwXTtcbiAgICB2YXIgYiA9IGluSW1nLmRhdGFbYmFzZSArIDFdO1xuICAgIHZhciBjID0gaW5JbWcuZGF0YVtiYXNlICsgd107XG4gICAgdmFyIGQgPSBpbkltZy5kYXRhW2Jhc2UgKyB3ICsgMV07XG4gICAgdmFyIGUgPSBhIC0gYjtcbiAgICB4IC09IGx4O1xuICAgIHkgLT0gbHk7XG5cbiAgICB2YXIgcmVzdWx0ID0gTWF0aC5mbG9vcih4ICogKHkgKiAoZSAtIGMgKyBkKSAtIGUpICsgeSAqIChjIC0gYSkgKyBhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhIGdpdmVuIGFycmF5LiBTZXRzIGVhY2ggZWxlbWVudCB0byB6ZXJvLlxuICogQHBhcmFtIGFycmF5IHtBcnJheX0gVGhlIGFycmF5IHRvIGluaXRpYWxpemVcbiAqL1xuSW1hZ2VXcmFwcGVyLmNsZWFyQXJyYXkgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIHZhciBsID0gYXJyYXkubGVuZ3RoO1xuICAgIHdoaWxlIChsLS0pIHtcbiAgICAgICAgYXJyYXlbbF0gPSAwO1xuICAgIH1cbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIHtTdWJJbWFnZX0gZnJvbSB0aGUgY3VycmVudCBpbWFnZSAoe3RoaXN9KS5cbiAqIEBwYXJhbSBmcm9tIHtJbWFnZVJlZn0gVGhlIHBvc2l0aW9uIHdoZXJlIHRvIHN0YXJ0IHRoZSB7U3ViSW1hZ2V9IGZyb20uICh0b3AtbGVmdCBjb3JuZXIpXG4gKiBAcGFyYW0gc2l6ZSB7SW1hZ2VSZWZ9IFRoZSBzaXplIG9mIHRoZSByZXN1bHRpbmcgaW1hZ2VcbiAqIEByZXR1cm5zIHtTdWJJbWFnZX0gQSBzaGFyZWQgcGFydCBvZiB0aGUgb3JpZ2luYWwgaW1hZ2VcbiAqL1xuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5zdWJJbWFnZSA9IGZ1bmN0aW9uKGZyb20sIHNpemUpIHtcbiAgICByZXR1cm4gbmV3IFN1YkltYWdlKGZyb20sIHNpemUsIHRoaXMpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIHtJbWFnZVdyYXBwZXIpIGFuZCBjb3BpZXMgdGhlIG5lZWRlZCB1bmRlcmx5aW5nIGltYWdlLWRhdGEgYXJlYVxuICogQHBhcmFtIGltYWdlV3JhcHBlciB7SW1hZ2VXcmFwcGVyfSBUaGUgdGFyZ2V0IHtJbWFnZVdyYXBwZXJ9IHdoZXJlIHRoZSBkYXRhIHNob3VsZCBiZSBjb3BpZWRcbiAqIEBwYXJhbSBmcm9tIHtJbWFnZVJlZn0gVGhlIGxvY2F0aW9uIHdoZXJlIHRvIGNvcHkgZnJvbSAodG9wLWxlZnQgbG9jYXRpb24pXG4gKi9cbkltYWdlV3JhcHBlci5wcm90b3R5cGUuc3ViSW1hZ2VBc0NvcHkgPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGZyb20pIHtcbiAgICB2YXIgc2l6ZVkgPSBpbWFnZVdyYXBwZXIuc2l6ZS55LCBzaXplWCA9IGltYWdlV3JhcHBlci5zaXplLng7XG4gICAgdmFyIHgsIHk7XG4gICAgZm9yICggeCA9IDA7IHggPCBzaXplWDsgeCsrKSB7XG4gICAgICAgIGZvciAoIHkgPSAwOyB5IDwgc2l6ZVk7IHkrKykge1xuICAgICAgICAgICAgaW1hZ2VXcmFwcGVyLmRhdGFbeSAqIHNpemVYICsgeF0gPSB0aGlzLmRhdGFbKGZyb20ueSArIHkpICogdGhpcy5zaXplLnggKyBmcm9tLnggKyB4XTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbkltYWdlV3JhcHBlci5wcm90b3R5cGUuY29weVRvID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyKSB7XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMuZGF0YS5sZW5ndGgsIHNyY0RhdGEgPSB0aGlzLmRhdGEsIGRzdERhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YTtcblxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICBkc3REYXRhW2xlbmd0aF0gPSBzcmNEYXRhW2xlbmd0aF07XG4gICAgfVxufTtcblxuLyoqXG4gKiBSZXRyaWV2ZXMgYSBnaXZlbiBwaXhlbCBwb3NpdGlvbiBmcm9tIHRoZSBpbWFnZVxuICogQHBhcmFtIHgge051bWJlcn0gVGhlIHgtcG9zaXRpb25cbiAqIEBwYXJhbSB5IHtOdW1iZXJ9IFRoZSB5LXBvc2l0aW9uXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgZ3JheXNjYWxlIHZhbHVlIGF0IHRoZSBwaXhlbC1wb3NpdGlvblxuICovXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhW3kgKiB0aGlzLnNpemUueCArIHhdO1xufTtcblxuLyoqXG4gKiBSZXRyaWV2ZXMgYSBnaXZlbiBwaXhlbCBwb3NpdGlvbiBmcm9tIHRoZSBpbWFnZVxuICogQHBhcmFtIHgge051bWJlcn0gVGhlIHgtcG9zaXRpb25cbiAqIEBwYXJhbSB5IHtOdW1iZXJ9IFRoZSB5LXBvc2l0aW9uXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgZ3JheXNjYWxlIHZhbHVlIGF0IHRoZSBwaXhlbC1wb3NpdGlvblxuICovXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLmdldFNhZmUgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgdmFyIGk7XG5cbiAgICBpZiAoIXRoaXMuaW5kZXhNYXBwaW5nKSB7XG4gICAgICAgIHRoaXMuaW5kZXhNYXBwaW5nID0ge1xuICAgICAgICAgICAgeDogW10sXG4gICAgICAgICAgICB5OiBbXVxuICAgICAgICB9O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5zaXplLng7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5pbmRleE1hcHBpbmcueFtpXSA9IGk7XG4gICAgICAgICAgICB0aGlzLmluZGV4TWFwcGluZy54W2kgKyB0aGlzLnNpemUueF0gPSBpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnNpemUueTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmluZGV4TWFwcGluZy55W2ldID0gaTtcbiAgICAgICAgICAgIHRoaXMuaW5kZXhNYXBwaW5nLnlbaSArIHRoaXMuc2l6ZS55XSA9IGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGF0YVsodGhpcy5pbmRleE1hcHBpbmcueVt5ICsgdGhpcy5zaXplLnldKSAqIHRoaXMuc2l6ZS54ICsgdGhpcy5pbmRleE1hcHBpbmcueFt4ICsgdGhpcy5zaXplLnhdXTtcbn07XG5cbi8qKlxuICogU2V0cyBhIGdpdmVuIHBpeGVsIHBvc2l0aW9uIGluIHRoZSBpbWFnZVxuICogQHBhcmFtIHgge051bWJlcn0gVGhlIHgtcG9zaXRpb25cbiAqIEBwYXJhbSB5IHtOdW1iZXJ9IFRoZSB5LXBvc2l0aW9uXG4gKiBAcGFyYW0gdmFsdWUge051bWJlcn0gVGhlIGdyYXlzY2FsZSB2YWx1ZSB0byBzZXRcbiAqIEByZXR1cm5zIHtJbWFnZVdyYXBwZXJ9IFRoZSBJbWFnZSBpdHNlbGYgKGZvciBwb3NzaWJsZSBjaGFpbmluZylcbiAqL1xuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbih4LCB5LCB2YWx1ZSkge1xuICAgIHRoaXMuZGF0YVt5ICogdGhpcy5zaXplLnggKyB4XSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBib3JkZXIgb2YgdGhlIGltYWdlICgxIHBpeGVsKSB0byB6ZXJvXG4gKi9cbkltYWdlV3JhcHBlci5wcm90b3R5cGUuemVyb0JvcmRlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpLCB3aWR0aCA9IHRoaXMuc2l6ZS54LCBoZWlnaHQgPSB0aGlzLnNpemUueSwgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICBmb3IgKCBpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICAgICAgZGF0YVtpXSA9IGRhdGFbKGhlaWdodCAtIDEpICogd2lkdGggKyBpXSA9IDA7XG4gICAgfVxuICAgIGZvciAoIGkgPSAxOyBpIDwgaGVpZ2h0IC0gMTsgaSsrKSB7XG4gICAgICAgIGRhdGFbaSAqIHdpZHRoXSA9IGRhdGFbaSAqIHdpZHRoICsgKHdpZHRoIC0gMSldID0gMDtcbiAgICB9XG59O1xuXG4vKipcbiAqIEludmVydHMgYSBiaW5hcnkgaW1hZ2UgaW4gcGxhY2VcbiAqL1xuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5pbnZlcnQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGF0YSA9IHRoaXMuZGF0YSwgbGVuZ3RoID0gZGF0YS5sZW5ndGg7XG5cbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgZGF0YVtsZW5ndGhdID0gZGF0YVtsZW5ndGhdID8gMCA6IDE7XG4gICAgfVxufTtcblxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5jb252b2x2ZSA9IGZ1bmN0aW9uKGtlcm5lbCkge1xuICAgIHZhciB4LCB5LCBreCwga3ksIGtTaXplID0gKGtlcm5lbC5sZW5ndGggLyAyKSB8IDAsIGFjY3UgPSAwO1xuICAgIGZvciAoIHkgPSAwOyB5IDwgdGhpcy5zaXplLnk7IHkrKykge1xuICAgICAgICBmb3IgKCB4ID0gMDsgeCA8IHRoaXMuc2l6ZS54OyB4KyspIHtcbiAgICAgICAgICAgIGFjY3UgPSAwO1xuICAgICAgICAgICAgZm9yICgga3kgPSAta1NpemU7IGt5IDw9IGtTaXplOyBreSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICgga3ggPSAta1NpemU7IGt4IDw9IGtTaXplOyBreCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjY3UgKz0ga2VybmVsW2t5ICsga1NpemVdW2t4ICsga1NpemVdICogdGhpcy5nZXRTYWZlKHggKyBreCwgeSArIGt5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRhdGFbeSAqIHRoaXMuc2l6ZS54ICsgeF0gPSBhY2N1O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5tb21lbnRzID0gZnVuY3Rpb24obGFiZWxjb3VudCkge1xuICAgIHZhciBkYXRhID0gdGhpcy5kYXRhLFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICBoZWlnaHQgPSB0aGlzLnNpemUueSxcbiAgICAgICAgd2lkdGggPSB0aGlzLnNpemUueCxcbiAgICAgICAgdmFsLFxuICAgICAgICB5c3EsXG4gICAgICAgIGxhYmVsc3VtID0gW10sXG4gICAgICAgIGksXG4gICAgICAgIGxhYmVsLFxuICAgICAgICBtdTExLFxuICAgICAgICBtdTAyLFxuICAgICAgICBtdTIwLFxuICAgICAgICB4XyxcbiAgICAgICAgeV8sXG4gICAgICAgIHRtcCxcbiAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgIFBJID0gTWF0aC5QSSxcbiAgICAgICAgUElfNCA9IFBJIC8gNDtcblxuICAgIGlmIChsYWJlbGNvdW50IDw9IDApIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8IGxhYmVsY291bnQ7IGkrKykge1xuICAgICAgICBsYWJlbHN1bVtpXSA9IHtcbiAgICAgICAgICAgIG0wMDogMCxcbiAgICAgICAgICAgIG0wMTogMCxcbiAgICAgICAgICAgIG0xMDogMCxcbiAgICAgICAgICAgIG0xMTogMCxcbiAgICAgICAgICAgIG0wMjogMCxcbiAgICAgICAgICAgIG0yMDogMCxcbiAgICAgICAgICAgIHRoZXRhOiAwLFxuICAgICAgICAgICAgcmFkOiAwXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZm9yICggeSA9IDA7IHkgPCBoZWlnaHQ7IHkrKykge1xuICAgICAgICB5c3EgPSB5ICogeTtcbiAgICAgICAgZm9yICggeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICB2YWwgPSBkYXRhW3kgKiB3aWR0aCArIHhdO1xuICAgICAgICAgICAgaWYgKHZhbCA+IDApIHtcbiAgICAgICAgICAgICAgICBsYWJlbCA9IGxhYmVsc3VtW3ZhbCAtIDFdO1xuICAgICAgICAgICAgICAgIGxhYmVsLm0wMCArPSAxO1xuICAgICAgICAgICAgICAgIGxhYmVsLm0wMSArPSB5O1xuICAgICAgICAgICAgICAgIGxhYmVsLm0xMCArPSB4O1xuICAgICAgICAgICAgICAgIGxhYmVsLm0xMSArPSB4ICogeTtcbiAgICAgICAgICAgICAgICBsYWJlbC5tMDIgKz0geXNxO1xuICAgICAgICAgICAgICAgIGxhYmVsLm0yMCArPSB4ICogeDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoIGkgPSAwOyBpIDwgbGFiZWxjb3VudDsgaSsrKSB7XG4gICAgICAgIGxhYmVsID0gbGFiZWxzdW1baV07XG4gICAgICAgIGlmICghaXNOYU4obGFiZWwubTAwKSAmJiBsYWJlbC5tMDAgIT09IDApIHtcbiAgICAgICAgICAgIHhfID0gbGFiZWwubTEwIC8gbGFiZWwubTAwO1xuICAgICAgICAgICAgeV8gPSBsYWJlbC5tMDEgLyBsYWJlbC5tMDA7XG4gICAgICAgICAgICBtdTExID0gbGFiZWwubTExIC8gbGFiZWwubTAwIC0geF8gKiB5XztcbiAgICAgICAgICAgIG11MDIgPSBsYWJlbC5tMDIgLyBsYWJlbC5tMDAgLSB5XyAqIHlfO1xuICAgICAgICAgICAgbXUyMCA9IGxhYmVsLm0yMCAvIGxhYmVsLm0wMCAtIHhfICogeF87XG4gICAgICAgICAgICB0bXAgPSAobXUwMiAtIG11MjApIC8gKDIgKiBtdTExKTtcbiAgICAgICAgICAgIHRtcCA9IDAuNSAqIE1hdGguYXRhbih0bXApICsgKG11MTEgPj0gMCA/IFBJXzQgOiAtUElfNCApICsgUEk7XG4gICAgICAgICAgICBsYWJlbC50aGV0YSA9ICh0bXAgKiAxODAgLyBQSSArIDkwKSAlIDE4MCAtIDkwO1xuICAgICAgICAgICAgaWYgKGxhYmVsLnRoZXRhIDwgMCkge1xuICAgICAgICAgICAgICAgIGxhYmVsLnRoZXRhICs9IDE4MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhYmVsLnJhZCA9IHRtcCA+IFBJID8gdG1wIC0gUEkgOiB0bXA7XG4gICAgICAgICAgICBsYWJlbC52ZWMgPSB2ZWMyLmNsb25lKFtNYXRoLmNvcyh0bXApLCBNYXRoLnNpbih0bXApXSk7XG4gICAgICAgICAgICByZXN1bHQucHVzaChsYWJlbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBEaXNwbGF5cyB0aGUge0ltYWdlV3JhcHBlcn0gaW4gYSBnaXZlbiBjYW52YXNcbiAqIEBwYXJhbSBjYW52YXMge0NhbnZhc30gVGhlIGNhbnZhcyBlbGVtZW50IHRvIHdyaXRlIHRvXG4gKiBAcGFyYW0gc2NhbGUge051bWJlcn0gU2NhbGUgd2hpY2ggaXMgYXBwbGllZCB0byBlYWNoIHBpeGVsLXZhbHVlXG4gKi9cbkltYWdlV3JhcHBlci5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKGNhbnZhcywgc2NhbGUpIHtcbiAgICB2YXIgY3R4LFxuICAgICAgICBmcmFtZSxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgY3VycmVudCxcbiAgICAgICAgcGl4ZWwsXG4gICAgICAgIHgsXG4gICAgICAgIHk7XG5cbiAgICBpZiAoIXNjYWxlKSB7XG4gICAgICAgIHNjYWxlID0gMS4wO1xuICAgIH1cbiAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjYW52YXMud2lkdGggPSB0aGlzLnNpemUueDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gdGhpcy5zaXplLnk7XG4gICAgZnJhbWUgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgZGF0YSA9IGZyYW1lLmRhdGE7XG4gICAgY3VycmVudCA9IDA7XG4gICAgZm9yICh5ID0gMDsgeSA8IHRoaXMuc2l6ZS55OyB5KyspIHtcbiAgICAgICAgZm9yICh4ID0gMDsgeCA8IHRoaXMuc2l6ZS54OyB4KyspIHtcbiAgICAgICAgICAgIHBpeGVsID0geSAqIHRoaXMuc2l6ZS54ICsgeDtcbiAgICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLmdldCh4LCB5KSAqIHNjYWxlO1xuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAwXSA9IGN1cnJlbnQ7XG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDFdID0gY3VycmVudDtcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMl0gPSBjdXJyZW50O1xuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAzXSA9IDI1NTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL2ZyYW1lLmRhdGEgPSBkYXRhO1xuICAgIGN0eC5wdXRJbWFnZURhdGEoZnJhbWUsIDAsIDApO1xufTtcblxuLyoqXG4gKiBEaXNwbGF5cyB0aGUge1N1YkltYWdlfSBpbiBhIGdpdmVuIGNhbnZhc1xuICogQHBhcmFtIGNhbnZhcyB7Q2FudmFzfSBUaGUgY2FudmFzIGVsZW1lbnQgdG8gd3JpdGUgdG9cbiAqIEBwYXJhbSBzY2FsZSB7TnVtYmVyfSBTY2FsZSB3aGljaCBpcyBhcHBsaWVkIHRvIGVhY2ggcGl4ZWwtdmFsdWVcbiAqL1xuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5vdmVybGF5ID0gZnVuY3Rpb24oY2FudmFzLCBzY2FsZSwgZnJvbSkge1xuICAgIGlmICghc2NhbGUgfHwgc2NhbGUgPCAwIHx8IHNjYWxlID4gMzYwKSB7XG4gICAgICAgIHNjYWxlID0gMzYwO1xuICAgIH1cbiAgICB2YXIgaHN2ID0gWzAsIDEsIDFdO1xuICAgIHZhciByZ2IgPSBbMCwgMCwgMF07XG4gICAgdmFyIHdoaXRlUmdiID0gWzI1NSwgMjU1LCAyNTVdO1xuICAgIHZhciBibGFja1JnYiA9IFswLCAwLCAwXTtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHZhciBmcmFtZSA9IGN0eC5nZXRJbWFnZURhdGEoZnJvbS54LCBmcm9tLnksIHRoaXMuc2l6ZS54LCB0aGlzLnNpemUueSk7XG4gICAgdmFyIGRhdGEgPSBmcmFtZS5kYXRhO1xuICAgIHZhciBsZW5ndGggPSB0aGlzLmRhdGEubGVuZ3RoO1xuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICBoc3ZbMF0gPSB0aGlzLmRhdGFbbGVuZ3RoXSAqIHNjYWxlO1xuICAgICAgICByZXN1bHQgPSBoc3ZbMF0gPD0gMCA/IHdoaXRlUmdiIDogaHN2WzBdID49IDM2MCA/IGJsYWNrUmdiIDogaHN2MnJnYihoc3YsIHJnYik7XG4gICAgICAgIGRhdGFbbGVuZ3RoICogNCArIDBdID0gcmVzdWx0WzBdO1xuICAgICAgICBkYXRhW2xlbmd0aCAqIDQgKyAxXSA9IHJlc3VsdFsxXTtcbiAgICAgICAgZGF0YVtsZW5ndGggKiA0ICsgMl0gPSByZXN1bHRbMl07XG4gICAgICAgIGRhdGFbbGVuZ3RoICogNCArIDNdID0gMjU1O1xuICAgIH1cbiAgICBjdHgucHV0SW1hZ2VEYXRhKGZyYW1lLCBmcm9tLngsIGZyb20ueSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbWFnZVdyYXBwZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uL2ltYWdlX3dyYXBwZXIuanMiLCJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19kZWZpbmVQcm9wZXJ0eScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBhc3NpZ25WYWx1ZWAgYW5kIGBhc3NpZ25NZXJnZVZhbHVlYCB3aXRob3V0XG4gKiB2YWx1ZSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYmFzZUFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5ID09ICdfX3Byb3RvX18nICYmIGRlZmluZVByb3BlcnR5KSB7XG4gICAgZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcbiAgICAgICdjb25maWd1cmFibGUnOiB0cnVlLFxuICAgICAgJ2VudW1lcmFibGUnOiB0cnVlLFxuICAgICAgJ3ZhbHVlJzogdmFsdWUsXG4gICAgICAnd3JpdGFibGUnOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VBc3NpZ25WYWx1ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2Jhc2VBc3NpZ25WYWx1ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGJhc2VJc05hdGl2ZSA9IHJlcXVpcmUoJy4vX2Jhc2VJc05hdGl2ZScpLFxuICAgIGdldFZhbHVlID0gcmVxdWlyZSgnLi9fZ2V0VmFsdWUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXROYXRpdmU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19nZXROYXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGtleSBpZiBpdCdzIG5vdCBhIHN0cmluZyBvciBzeW1ib2wuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nfHN5bWJvbH0gUmV0dXJucyB0aGUga2V5LlxuICovXG5mdW5jdGlvbiB0b0tleSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9LZXk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL190b0tleS5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuL2lzRnVuY3Rpb24nKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheUxpa2U7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL2lzQXJyYXlMaWtlLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFzeW5jVGFnID0gJ1tvYmplY3QgQXN5bmNGdW5jdGlvbl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgcHJveHlUYWcgPSAnW29iamVjdCBQcm94eV0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXlzIGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBiYXNlR2V0VGFnKHZhbHVlKTtcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWcgfHwgdGFnID09IGFzeW5jVGFnIHx8IHRhZyA9PSBwcm94eVRhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9pc0Z1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNMZW5ndGg7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL2lzTGVuZ3RoLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTeW1ib2w7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL2lzU3ltYm9sLmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYmFzZU1lcmdlID0gcmVxdWlyZSgnLi9fYmFzZU1lcmdlJyksXG4gICAgY3JlYXRlQXNzaWduZXIgPSByZXF1aXJlKCcuL19jcmVhdGVBc3NpZ25lcicpO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uYXNzaWduYCBleGNlcHQgdGhhdCBpdCByZWN1cnNpdmVseSBtZXJnZXMgb3duIGFuZFxuICogaW5oZXJpdGVkIGVudW1lcmFibGUgc3RyaW5nIGtleWVkIHByb3BlcnRpZXMgb2Ygc291cmNlIG9iamVjdHMgaW50byB0aGVcbiAqIGRlc3RpbmF0aW9uIG9iamVjdC4gU291cmNlIHByb3BlcnRpZXMgdGhhdCByZXNvbHZlIHRvIGB1bmRlZmluZWRgIGFyZVxuICogc2tpcHBlZCBpZiBhIGRlc3RpbmF0aW9uIHZhbHVlIGV4aXN0cy4gQXJyYXkgYW5kIHBsYWluIG9iamVjdCBwcm9wZXJ0aWVzXG4gKiBhcmUgbWVyZ2VkIHJlY3Vyc2l2ZWx5LiBPdGhlciBvYmplY3RzIGFuZCB2YWx1ZSB0eXBlcyBhcmUgb3ZlcnJpZGRlbiBieVxuICogYXNzaWdubWVudC4gU291cmNlIG9iamVjdHMgYXJlIGFwcGxpZWQgZnJvbSBsZWZ0IHRvIHJpZ2h0LiBTdWJzZXF1ZW50XG4gKiBzb3VyY2VzIG92ZXJ3cml0ZSBwcm9wZXJ0eSBhc3NpZ25tZW50cyBvZiBwcmV2aW91cyBzb3VyY2VzLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBtdXRhdGVzIGBvYmplY3RgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC41LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHtcbiAqICAgJ2EnOiBbeyAnYic6IDIgfSwgeyAnZCc6IDQgfV1cbiAqIH07XG4gKlxuICogdmFyIG90aGVyID0ge1xuICogICAnYSc6IFt7ICdjJzogMyB9LCB7ICdlJzogNSB9XVxuICogfTtcbiAqXG4gKiBfLm1lcmdlKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4geyAnYSc6IFt7ICdiJzogMiwgJ2MnOiAzIH0sIHsgJ2QnOiA0LCAnZSc6IDUgfV0gfVxuICovXG52YXIgbWVyZ2UgPSBjcmVhdGVBc3NpZ25lcihmdW5jdGlvbihvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgpIHtcbiAgYmFzZU1lcmdlKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBtZXJnZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvbWVyZ2UuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0bW9kdWxlLnBhdGhzID0gW107XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdGlmKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0fVxyXG5cdHJldHVybiBtb2R1bGU7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBodHRwOi8vd3d3LmNvZGVwcm9qZWN0LmNvbS9UaXBzLzQwNzE3Mi9Db25uZWN0ZWQtQ29tcG9uZW50LUxhYmVsaW5nLWFuZC1WZWN0b3JpemF0aW9uXG4gKi9cbnZhciBUcmFjZXIgPSB7XG4gICAgc2VhcmNoRGlyZWN0aW9uczogW1swLCAxXSwgWzEsIDFdLCBbMSwgMF0sIFsxLCAtMV0sIFswLCAtMV0sIFstMSwgLTFdLCBbLTEsIDBdLCBbLTEsIDFdXSxcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgbGFiZWxXcmFwcGVyKSB7XG4gICAgICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YSxcbiAgICAgICAgICAgIGxhYmVsRGF0YSA9IGxhYmVsV3JhcHBlci5kYXRhLFxuICAgICAgICAgICAgc2VhcmNoRGlyZWN0aW9ucyA9IHRoaXMuc2VhcmNoRGlyZWN0aW9ucyxcbiAgICAgICAgICAgIHdpZHRoID0gaW1hZ2VXcmFwcGVyLnNpemUueCxcbiAgICAgICAgICAgIHBvcztcblxuICAgICAgICBmdW5jdGlvbiB0cmFjZShjdXJyZW50LCBjb2xvciwgbGFiZWwsIGVkZ2VsYWJlbCkge1xuICAgICAgICAgICAgdmFyIGksXG4gICAgICAgICAgICAgICAgeSxcbiAgICAgICAgICAgICAgICB4O1xuXG4gICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgICAgIHkgPSBjdXJyZW50LmN5ICsgc2VhcmNoRGlyZWN0aW9uc1tjdXJyZW50LmRpcl1bMF07XG4gICAgICAgICAgICAgICAgeCA9IGN1cnJlbnQuY3ggKyBzZWFyY2hEaXJlY3Rpb25zW2N1cnJlbnQuZGlyXVsxXTtcbiAgICAgICAgICAgICAgICBwb3MgPSB5ICogd2lkdGggKyB4O1xuICAgICAgICAgICAgICAgIGlmICgoaW1hZ2VEYXRhW3Bvc10gPT09IGNvbG9yKSAmJiAoKGxhYmVsRGF0YVtwb3NdID09PSAwKSB8fCAobGFiZWxEYXRhW3Bvc10gPT09IGxhYmVsKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxEYXRhW3Bvc10gPSBsYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudC5jeSA9IHk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuY3ggPSB4O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWxEYXRhW3Bvc10gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsRGF0YVtwb3NdID0gZWRnZWxhYmVsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuZGlyID0gKGN1cnJlbnQuZGlyICsgMSkgJSA4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHZlcnRleDJEKHgsIHksIGRpcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBkaXI6IGRpcixcbiAgICAgICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgICAgIHk6IHksXG4gICAgICAgICAgICAgICAgbmV4dDogbnVsbCxcbiAgICAgICAgICAgICAgICBwcmV2OiBudWxsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY29udG91clRyYWNpbmcoc3ksIHN4LCBsYWJlbCwgY29sb3IsIGVkZ2VsYWJlbCkge1xuICAgICAgICAgICAgdmFyIEZ2ID0gbnVsbCxcbiAgICAgICAgICAgICAgICBDdixcbiAgICAgICAgICAgICAgICBQLFxuICAgICAgICAgICAgICAgIGxkaXIsXG4gICAgICAgICAgICAgICAgY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAgY3g6IHN4LFxuICAgICAgICAgICAgICAgICAgICBjeTogc3ksXG4gICAgICAgICAgICAgICAgICAgIGRpcjogMFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0cmFjZShjdXJyZW50LCBjb2xvciwgbGFiZWwsIGVkZ2VsYWJlbCkpIHtcbiAgICAgICAgICAgICAgICBGdiA9IHZlcnRleDJEKHN4LCBzeSwgY3VycmVudC5kaXIpO1xuICAgICAgICAgICAgICAgIEN2ID0gRnY7XG4gICAgICAgICAgICAgICAgbGRpciA9IGN1cnJlbnQuZGlyO1xuICAgICAgICAgICAgICAgIFAgPSB2ZXJ0ZXgyRChjdXJyZW50LmN4LCBjdXJyZW50LmN5LCAwKTtcbiAgICAgICAgICAgICAgICBQLnByZXYgPSBDdjtcbiAgICAgICAgICAgICAgICBDdi5uZXh0ID0gUDtcbiAgICAgICAgICAgICAgICBQLm5leHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIEN2ID0gUDtcbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuZGlyID0gKGN1cnJlbnQuZGlyICsgNikgJSA4O1xuICAgICAgICAgICAgICAgICAgICB0cmFjZShjdXJyZW50LCBjb2xvciwgbGFiZWwsIGVkZ2VsYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsZGlyICE9PSBjdXJyZW50LmRpcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgQ3YuZGlyID0gY3VycmVudC5kaXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBQID0gdmVydGV4MkQoY3VycmVudC5jeCwgY3VycmVudC5jeSwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBQLnByZXYgPSBDdjtcbiAgICAgICAgICAgICAgICAgICAgICAgIEN2Lm5leHQgPSBQO1xuICAgICAgICAgICAgICAgICAgICAgICAgUC5uZXh0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIEN2ID0gUDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEN2LmRpciA9IGxkaXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBDdi54ID0gY3VycmVudC5jeDtcbiAgICAgICAgICAgICAgICAgICAgICAgIEN2LnkgPSBjdXJyZW50LmN5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxkaXIgPSBjdXJyZW50LmRpcjtcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChjdXJyZW50LmN4ICE9PSBzeCB8fCBjdXJyZW50LmN5ICE9PSBzeSk7XG4gICAgICAgICAgICAgICAgRnYucHJldiA9IEN2LnByZXY7XG4gICAgICAgICAgICAgICAgQ3YucHJldi5uZXh0ID0gRnY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gRnY7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHJhY2U6IGZ1bmN0aW9uKGN1cnJlbnQsIGNvbG9yLCBsYWJlbCwgZWRnZWxhYmVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYWNlKGN1cnJlbnQsIGNvbG9yLCBsYWJlbCwgZWRnZWxhYmVsKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250b3VyVHJhY2luZzogZnVuY3Rpb24oc3ksIHN4LCBsYWJlbCwgY29sb3IsIGVkZ2VsYWJlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250b3VyVHJhY2luZyhzeSwgc3gsIGxhYmVsLCBjb2xvciwgZWRnZWxhYmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCAoVHJhY2VyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sb2NhdG9yL3RyYWNlci5qcyIsImltcG9ydCBCYXJjb2RlUmVhZGVyIGZyb20gJy4vYmFyY29kZV9yZWFkZXInO1xuaW1wb3J0IEFycmF5SGVscGVyIGZyb20gJy4uL2NvbW1vbi9hcnJheV9oZWxwZXInO1xuXG5mdW5jdGlvbiBDb2RlMzlSZWFkZXIoKSB7XG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMpO1xufVxuXG52YXIgcHJvcGVydGllcyA9IHtcbiAgICBBTFBIQUJFVEhfU1RSSU5HOiB7dmFsdWU6IFwiMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaLS4gKiQvKyVcIn0sXG4gICAgQUxQSEFCRVQ6IHt2YWx1ZTogWzQ4LCA0OSwgNTAsIDUxLCA1MiwgNTMsIDU0LCA1NSwgNTYsIDU3LCA2NSwgNjYsIDY3LCA2OCwgNjksIDcwLCA3MSwgNzIsIDczLCA3NCwgNzUsIDc2LCA3NywgNzgsXG4gICAgICAgIDc5LCA4MCwgODEsIDgyLCA4MywgODQsIDg1LCA4NiwgODcsIDg4LCA4OSwgOTAsIDQ1LCA0NiwgMzIsIDQyLCAzNiwgNDcsIDQzLCAzN119LFxuICAgIENIQVJBQ1RFUl9FTkNPRElOR1M6IHt2YWx1ZTogWzB4MDM0LCAweDEyMSwgMHgwNjEsIDB4MTYwLCAweDAzMSwgMHgxMzAsIDB4MDcwLCAweDAyNSwgMHgxMjQsIDB4MDY0LCAweDEwOSwgMHgwNDksXG4gICAgICAgIDB4MTQ4LCAweDAxOSwgMHgxMTgsIDB4MDU4LCAweDAwRCwgMHgxMEMsIDB4MDRDLCAweDAxQywgMHgxMDMsIDB4MDQzLCAweDE0MiwgMHgwMTMsIDB4MTEyLCAweDA1MiwgMHgwMDcsIDB4MTA2LFxuICAgICAgICAweDA0NiwgMHgwMTYsIDB4MTgxLCAweDBDMSwgMHgxQzAsIDB4MDkxLCAweDE5MCwgMHgwRDAsIDB4MDg1LCAweDE4NCwgMHgwQzQsIDB4MDk0LCAweDBBOCwgMHgwQTIsIDB4MDhBLCAweDAyQVxuICAgIF19LFxuICAgIEFTVEVSSVNLOiB7dmFsdWU6IDB4MDk0fSxcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJjb2RlXzM5XCIsIHdyaXRlYWJsZTogZmFsc2V9XG59O1xuXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29kZTM5UmVhZGVyO1xuXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl90b0NvdW50ZXJzID0gZnVuY3Rpb24oc3RhcnQsIGNvdW50ZXIpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIG51bUNvdW50ZXJzID0gY291bnRlci5sZW5ndGgsXG4gICAgICAgIGVuZCA9IHNlbGYuX3Jvdy5sZW5ndGgsXG4gICAgICAgIGlzV2hpdGUgPSAhc2VsZi5fcm93W3N0YXJ0XSxcbiAgICAgICAgaSxcbiAgICAgICAgY291bnRlclBvcyA9IDA7XG5cbiAgICBBcnJheUhlbHBlci5pbml0KGNvdW50ZXIsIDApO1xuXG4gICAgZm9yICggaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBudW1Db3VudGVycykge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcbiAgICAgICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY291bnRlcjtcbn07XG5cbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgY291bnRlcnMgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgICBzdGFydCA9IHNlbGYuX2ZpbmRTdGFydCgpLFxuICAgICAgICBkZWNvZGVkQ2hhcixcbiAgICAgICAgbGFzdFN0YXJ0LFxuICAgICAgICBwYXR0ZXJuLFxuICAgICAgICBuZXh0U3RhcnQ7XG5cbiAgICBpZiAoIXN0YXJ0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBuZXh0U3RhcnQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3Jvdywgc3RhcnQuZW5kKTtcblxuICAgIGRvIHtcbiAgICAgICAgY291bnRlcnMgPSBzZWxmLl90b0NvdW50ZXJzKG5leHRTdGFydCwgY291bnRlcnMpO1xuICAgICAgICBwYXR0ZXJuID0gc2VsZi5fdG9QYXR0ZXJuKGNvdW50ZXJzKTtcbiAgICAgICAgaWYgKHBhdHRlcm4gPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBkZWNvZGVkQ2hhciA9IHNlbGYuX3BhdHRlcm5Ub0NoYXIocGF0dGVybik7XG4gICAgICAgIGlmIChkZWNvZGVkQ2hhciA8IDApe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0LnB1c2goZGVjb2RlZENoYXIpO1xuICAgICAgICBsYXN0U3RhcnQgPSBuZXh0U3RhcnQ7XG4gICAgICAgIG5leHRTdGFydCArPSBBcnJheUhlbHBlci5zdW0oY291bnRlcnMpO1xuICAgICAgICBuZXh0U3RhcnQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3JvdywgbmV4dFN0YXJ0KTtcbiAgICB9IHdoaWxlIChkZWNvZGVkQ2hhciAhPT0gJyonKTtcbiAgICByZXN1bHQucG9wKCk7XG5cbiAgICBpZiAoIXJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCFzZWxmLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UobGFzdFN0YXJ0LCBuZXh0U3RhcnQsIGNvdW50ZXJzKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LnN0YXJ0LFxuICAgICAgICBlbmQ6IG5leHRTdGFydCxcbiAgICAgICAgc3RhcnRJbmZvOiBzdGFydCxcbiAgICAgICAgZGVjb2RlZENvZGVzOiByZXN1bHRcbiAgICB9O1xufTtcblxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlID0gZnVuY3Rpb24obGFzdFN0YXJ0LCBuZXh0U3RhcnQsIGNvdW50ZXJzKSB7XG4gICAgdmFyIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCxcbiAgICAgICAgcGF0dGVyblNpemUgPSBBcnJheUhlbHBlci5zdW0oY291bnRlcnMpO1xuXG4gICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kID0gbmV4dFN0YXJ0IC0gbGFzdFN0YXJ0IC0gcGF0dGVyblNpemU7XG4gICAgaWYgKCh0cmFpbGluZ1doaXRlc3BhY2VFbmQgKiAzKSA+PSBwYXR0ZXJuU2l6ZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fcGF0dGVyblRvQ2hhciA9IGZ1bmN0aW9uKHBhdHRlcm4pIHtcbiAgICB2YXIgaSxcbiAgICAgICAgc2VsZiA9IHRoaXM7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc2VsZi5DSEFSQUNURVJfRU5DT0RJTkdTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1NbaV0gPT09IHBhdHRlcm4pIHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHNlbGYuQUxQSEFCRVRbaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn07XG5cbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX2ZpbmROZXh0V2lkdGggPSBmdW5jdGlvbihjb3VudGVycywgY3VycmVudCkge1xuICAgIHZhciBpLFxuICAgICAgICBtaW5XaWR0aCA9IE51bWJlci5NQVhfVkFMVUU7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNvdW50ZXJzW2ldIDwgbWluV2lkdGggJiYgY291bnRlcnNbaV0gPiBjdXJyZW50KSB7XG4gICAgICAgICAgICBtaW5XaWR0aCA9IGNvdW50ZXJzW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1pbldpZHRoO1xufTtcblxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fdG9QYXR0ZXJuID0gZnVuY3Rpb24oY291bnRlcnMpIHtcbiAgICB2YXIgbnVtQ291bnRlcnMgPSBjb3VudGVycy5sZW5ndGgsXG4gICAgICAgIG1heE5hcnJvd1dpZHRoID0gMCxcbiAgICAgICAgbnVtV2lkZUJhcnMgPSBudW1Db3VudGVycyxcbiAgICAgICAgd2lkZUJhcldpZHRoID0gMCxcbiAgICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICAgIHBhdHRlcm4sXG4gICAgICAgIGk7XG5cbiAgICB3aGlsZSAobnVtV2lkZUJhcnMgPiAzKSB7XG4gICAgICAgIG1heE5hcnJvd1dpZHRoID0gc2VsZi5fZmluZE5leHRXaWR0aChjb3VudGVycywgbWF4TmFycm93V2lkdGgpO1xuICAgICAgICBudW1XaWRlQmFycyA9IDA7XG4gICAgICAgIHBhdHRlcm4gPSAwO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbnVtQ291bnRlcnM7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNvdW50ZXJzW2ldID4gbWF4TmFycm93V2lkdGgpIHtcbiAgICAgICAgICAgICAgICBwYXR0ZXJuIHw9IDEgPDwgKG51bUNvdW50ZXJzIC0gMSAtIGkpO1xuICAgICAgICAgICAgICAgIG51bVdpZGVCYXJzKys7XG4gICAgICAgICAgICAgICAgd2lkZUJhcldpZHRoICs9IGNvdW50ZXJzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG51bVdpZGVCYXJzID09PSAzKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbnVtQ291bnRlcnMgJiYgbnVtV2lkZUJhcnMgPiAwOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoY291bnRlcnNbaV0gPiBtYXhOYXJyb3dXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBudW1XaWRlQmFycy0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKGNvdW50ZXJzW2ldICogMikgPj0gd2lkZUJhcldpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcGF0dGVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG59O1xuXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl9maW5kU3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KSxcbiAgICAgICAgcGF0dGVyblN0YXJ0ID0gb2Zmc2V0LFxuICAgICAgICBjb3VudGVyID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICBjb3VudGVyUG9zID0gMCxcbiAgICAgICAgaXNXaGl0ZSA9IGZhbHNlLFxuICAgICAgICBpLFxuICAgICAgICBqLFxuICAgICAgICB3aGl0ZVNwYWNlTXVzdFN0YXJ0O1xuXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIC8vIGZpbmQgc3RhcnQgcGF0dGVyblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLl90b1BhdHRlcm4oY291bnRlcikgPT09IHNlbGYuQVNURVJJU0spIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpdGVTcGFjZU11c3RTdGFydCA9IE1hdGguZmxvb3IoTWF0aC5tYXgoMCwgcGF0dGVyblN0YXJ0IC0gKChpIC0gcGF0dGVyblN0YXJ0KSAvIDQpKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKHdoaXRlU3BhY2VNdXN0U3RhcnQsIHBhdHRlcm5TdGFydCwgMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHBhdHRlcm5TdGFydCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IGlcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwYXR0ZXJuU3RhcnQgKz0gY291bnRlclswXSArIGNvdW50ZXJbMV07XG4gICAgICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCA3OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltqXSA9IGNvdW50ZXJbaiArIDJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb3VudGVyWzddID0gMDtcbiAgICAgICAgICAgICAgICBjb3VudGVyWzhdID0gMDtcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zLS07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29kZTM5UmVhZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JlYWRlci9jb2RlXzM5X3JlYWRlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gZG90XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZG90IHByb2R1Y3Qgb2YgYSBhbmQgYlxuICovXG5mdW5jdGlvbiBkb3QoYSwgYikge1xuICAgIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2dsLXZlYzIvZG90LmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fTWFwLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbWFwQ2FjaGVDbGVhciA9IHJlcXVpcmUoJy4vX21hcENhY2hlQ2xlYXInKSxcbiAgICBtYXBDYWNoZURlbGV0ZSA9IHJlcXVpcmUoJy4vX21hcENhY2hlRGVsZXRlJyksXG4gICAgbWFwQ2FjaGVHZXQgPSByZXF1aXJlKCcuL19tYXBDYWNoZUdldCcpLFxuICAgIG1hcENhY2hlSGFzID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVIYXMnKSxcbiAgICBtYXBDYWNoZVNldCA9IHJlcXVpcmUoJy4vX21hcENhY2hlU2V0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA9PSBudWxsID8gMCA6IGVudHJpZXMubGVuZ3RoO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcENhY2hlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fTWFwQ2FjaGUuanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBiYXNlQXNzaWduVmFsdWUgPSByZXF1aXJlKCcuL19iYXNlQXNzaWduVmFsdWUnKSxcbiAgICBlcSA9IHJlcXVpcmUoJy4vZXEnKTtcblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgYGFzc2lnblZhbHVlYCBleGNlcHQgdGhhdCBpdCBkb2Vzbid0IGFzc2lnblxuICogYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIGlmICgodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhZXEob2JqZWN0W2tleV0sIHZhbHVlKSkgfHxcbiAgICAgICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpKSB7XG4gICAgYmFzZUFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ25NZXJnZVZhbHVlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fYXNzaWduTWVyZ2VWYWx1ZS5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGJhc2VBc3NpZ25WYWx1ZSA9IHJlcXVpcmUoJy4vX2Jhc2VBc3NpZ25WYWx1ZScpLFxuICAgIGVxID0gcmVxdWlyZSgnLi9lcScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEFzc2lnbnMgYHZhbHVlYCB0byBga2V5YCBvZiBgb2JqZWN0YCBpZiB0aGUgZXhpc3RpbmcgdmFsdWUgaXMgbm90IGVxdWl2YWxlbnRcbiAqIHVzaW5nIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldO1xuICBpZiAoIShoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBlcShvYmpWYWx1ZSwgdmFsdWUpKSB8fFxuICAgICAgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnblZhbHVlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fYXNzaWduVmFsdWUuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKTtcblxudmFyIGRlZmluZVByb3BlcnR5ID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHZhciBmdW5jID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2RlZmluZVByb3BlcnR5Jyk7XG4gICAgZnVuYyh7fSwgJycsIHt9KTtcbiAgICByZXR1cm4gZnVuYztcbiAgfSBjYXRjaCAoZSkge31cbn0oKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmaW5lUHJvcGVydHk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19kZWZpbmVQcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxubW9kdWxlLmV4cG9ydHMgPSBmcmVlR2xvYmFsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fZnJlZUdsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIG92ZXJBcmcgPSByZXF1aXJlKCcuL19vdmVyQXJnJyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIGdldFByb3RvdHlwZSA9IG92ZXJBcmcoT2JqZWN0LmdldFByb3RvdHlwZU9mLCBPYmplY3QpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFByb3RvdHlwZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2dldFByb3RvdHlwZS5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUHJvdG90eXBlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9faXNQcm90b3R5cGUuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhcHBseSA9IHJlcXVpcmUoJy4vX2FwcGx5Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VSZXN0YCB3aGljaCB0cmFuc2Zvcm1zIHRoZSByZXN0IGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSByZXN0IGFycmF5IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyUmVzdChmdW5jLCBzdGFydCwgdHJhbnNmb3JtKSB7XG4gIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6IHN0YXJ0LCAwKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgIGFycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBhcnJheVtpbmRleF0gPSBhcmdzW3N0YXJ0ICsgaW5kZXhdO1xuICAgIH1cbiAgICBpbmRleCA9IC0xO1xuICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IHRyYW5zZm9ybShhcnJheSk7XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb3ZlclJlc3Q7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19vdmVyUmVzdC5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGJhc2VTZXRUb1N0cmluZyA9IHJlcXVpcmUoJy4vX2Jhc2VTZXRUb1N0cmluZycpLFxuICAgIHNob3J0T3V0ID0gcmVxdWlyZSgnLi9fc2hvcnRPdXQnKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBgdG9TdHJpbmdgIG1ldGhvZCBvZiBgZnVuY2AgdG8gcmV0dXJuIGBzdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdHJpbmcgVGhlIGB0b1N0cmluZ2AgcmVzdWx0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGBmdW5jYC5cbiAqL1xudmFyIHNldFRvU3RyaW5nID0gc2hvcnRPdXQoYmFzZVNldFRvU3RyaW5nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZXRUb1N0cmluZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX3NldFRvU3RyaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IGl0IHJlY2VpdmVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICpcbiAqIGNvbnNvbGUubG9nKF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlkZW50aXR5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9pZGVudGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290JyksXG4gICAgc3R1YkZhbHNlID0gcmVxdWlyZSgnLi9zdHViRmFsc2UnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQ7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVJc0J1ZmZlciA9IEJ1ZmZlciA/IEJ1ZmZlci5pc0J1ZmZlciA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlciwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBCdWZmZXIoMikpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IFVpbnQ4QXJyYXkoMikpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQnVmZmVyID0gbmF0aXZlSXNCdWZmZXIgfHwgc3R1YkZhbHNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQnVmZmVyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9pc0J1ZmZlci5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGJhc2VJc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuL19iYXNlSXNUeXBlZEFycmF5JyksXG4gICAgYmFzZVVuYXJ5ID0gcmVxdWlyZSgnLi9fYmFzZVVuYXJ5JyksXG4gICAgbm9kZVV0aWwgPSByZXF1aXJlKCcuL19ub2RlVXRpbCcpO1xuXG4vKiBOb2RlLmpzIGhlbHBlciByZWZlcmVuY2VzLiAqL1xudmFyIG5vZGVJc1R5cGVkQXJyYXkgPSBub2RlVXRpbCAmJiBub2RlVXRpbC5pc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc1R5cGVkQXJyYXkgPSBub2RlSXNUeXBlZEFycmF5ID8gYmFzZVVuYXJ5KG5vZGVJc1R5cGVkQXJyYXkpIDogYmFzZUlzVHlwZWRBcnJheTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc1R5cGVkQXJyYXk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL2lzVHlwZWRBcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFycmF5TGlrZUtleXMgPSByZXF1aXJlKCcuL19hcnJheUxpa2VLZXlzJyksXG4gICAgYmFzZUtleXNJbiA9IHJlcXVpcmUoJy4vX2Jhc2VLZXlzSW4nKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCwgdHJ1ZSkgOiBiYXNlS2V5c0luKG9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5c0luO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9rZXlzSW4uanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFR5cGVEZWZzIGZyb20gJy4vY29tbW9uL3R5cGVkZWZzJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IEltYWdlV3JhcHBlciBmcm9tICcuL2NvbW1vbi9pbWFnZV93cmFwcGVyJztcbmltcG9ydCBCYXJjb2RlTG9jYXRvciBmcm9tICcuL2xvY2F0b3IvYmFyY29kZV9sb2NhdG9yJztcbmltcG9ydCBCYXJjb2RlRGVjb2RlciBmcm9tICcuL2RlY29kZXIvYmFyY29kZV9kZWNvZGVyJztcbmltcG9ydCBFdmVudHMgZnJvbSAnLi9jb21tb24vZXZlbnRzJztcbmltcG9ydCBDYW1lcmFBY2Nlc3MgZnJvbSAnLi9pbnB1dC9jYW1lcmFfYWNjZXNzJztcbmltcG9ydCBJbWFnZURlYnVnIGZyb20gJy4vY29tbW9uL2ltYWdlX2RlYnVnJztcbmltcG9ydCBSZXN1bHRDb2xsZWN0b3IgZnJvbSAnLi9hbmFseXRpY3MvcmVzdWx0X2NvbGxlY3Rvcic7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uZmlnL2NvbmZpZyc7XG5pbXBvcnQgSW5wdXRTdHJlYW0gZnJvbSAnaW5wdXRfc3RyZWFtJztcbmltcG9ydCBGcmFtZUdyYWJiZXIgZnJvbSAnZnJhbWVfZ3JhYmJlcic7XG5pbXBvcnQge21lcmdlfSBmcm9tICdsb2Rhc2gnO1xuY29uc3QgdmVjMiA9IHtcbiAgICBjbG9uZTogcmVxdWlyZSgnZ2wtdmVjMi9jbG9uZScpXG59O1xuXG52YXIgX2lucHV0U3RyZWFtLFxuICAgIF9mcmFtZWdyYWJiZXIsXG4gICAgX3N0b3BwZWQsXG4gICAgX2NhbnZhc0NvbnRhaW5lciA9IHtcbiAgICAgICAgY3R4OiB7XG4gICAgICAgICAgICBpbWFnZTogbnVsbCxcbiAgICAgICAgICAgIG92ZXJsYXk6IG51bGxcbiAgICAgICAgfSxcbiAgICAgICAgZG9tOiB7XG4gICAgICAgICAgICBpbWFnZTogbnVsbCxcbiAgICAgICAgICAgIG92ZXJsYXk6IG51bGxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX2lucHV0SW1hZ2VXcmFwcGVyLFxuICAgIF9ib3hTaXplLFxuICAgIF9kZWNvZGVyLFxuICAgIF93b3JrZXJQb29sID0gW10sXG4gICAgX29uVUlUaHJlYWQgPSB0cnVlLFxuICAgIF9yZXN1bHRDb2xsZWN0b3IsXG4gICAgX2NvbmZpZyA9IHt9O1xuXG5mdW5jdGlvbiBpbml0aWFsaXplRGF0YShpbWFnZVdyYXBwZXIpIHtcbiAgICBpbml0QnVmZmVycyhpbWFnZVdyYXBwZXIpO1xuICAgIF9kZWNvZGVyID0gQmFyY29kZURlY29kZXIuY3JlYXRlKF9jb25maWcuZGVjb2RlciwgX2lucHV0SW1hZ2VXcmFwcGVyKTtcbn1cblxuZnVuY3Rpb24gaW5pdElucHV0U3RyZWFtKGNiKSB7XG4gICAgdmFyIHZpZGVvO1xuICAgIGlmIChfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09IFwiVmlkZW9TdHJlYW1cIikge1xuICAgICAgICB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ2aWRlb1wiKTtcbiAgICAgICAgX2lucHV0U3RyZWFtID0gSW5wdXRTdHJlYW0uY3JlYXRlVmlkZW9TdHJlYW0odmlkZW8pO1xuICAgIH0gZWxzZSBpZiAoX2NvbmZpZy5pbnB1dFN0cmVhbS50eXBlID09PSBcIkltYWdlU3RyZWFtXCIpIHtcbiAgICAgICAgX2lucHV0U3RyZWFtID0gSW5wdXRTdHJlYW0uY3JlYXRlSW1hZ2VTdHJlYW0oKTtcbiAgICB9IGVsc2UgaWYgKF9jb25maWcuaW5wdXRTdHJlYW0udHlwZSA9PT0gXCJMaXZlU3RyZWFtXCIpIHtcbiAgICAgICAgdmFyICR2aWV3cG9ydCA9IGdldFZpZXdQb3J0KCk7XG4gICAgICAgIGlmICgkdmlld3BvcnQpIHtcbiAgICAgICAgICAgIHZpZGVvID0gJHZpZXdwb3J0LnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKTtcbiAgICAgICAgICAgIGlmICghdmlkZW8pIHtcbiAgICAgICAgICAgICAgICB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ2aWRlb1wiKTtcbiAgICAgICAgICAgICAgICAkdmlld3BvcnQuYXBwZW5kQ2hpbGQodmlkZW8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9pbnB1dFN0cmVhbSA9IElucHV0U3RyZWFtLmNyZWF0ZUxpdmVTdHJlYW0odmlkZW8pO1xuICAgICAgICBDYW1lcmFBY2Nlc3MucmVxdWVzdCh2aWRlbywgX2NvbmZpZy5pbnB1dFN0cmVhbS5jb25zdHJhaW50cylcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgX2lucHV0U3RyZWFtLnRyaWdnZXIoXCJjYW5yZWNvcmRcIik7XG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjYihlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfaW5wdXRTdHJlYW0uc2V0QXR0cmlidXRlKFwicHJlbG9hZFwiLCBcImF1dG9cIik7XG4gICAgX2lucHV0U3RyZWFtLnNldElucHV0U3RyZWFtKF9jb25maWcuaW5wdXRTdHJlYW0pO1xuICAgIF9pbnB1dFN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFwiY2FucmVjb3JkXCIsIGNhblJlY29yZC5iaW5kKHVuZGVmaW5lZCwgY2IpKTtcbn1cblxuZnVuY3Rpb24gZ2V0Vmlld1BvcnQoKSB7XG4gICAgdmFyIHRhcmdldCA9IF9jb25maWcuaW5wdXRTdHJlYW0udGFyZ2V0O1xuICAgIC8vIENoZWNrIGlmIHRhcmdldCBpcyBhbHJlYWR5IGEgRE9NIGVsZW1lbnRcbiAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5ub2RlTmFtZSAmJiB0YXJnZXQubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBVc2UgJyNpbnRlcmFjdGl2ZS52aWV3cG9ydCcgYXMgYSBmYWxsYmFjayBzZWxlY3RvciAoYmFja3dhcmRzIGNvbXBhdGliaWxpdHkpXG4gICAgICAgIHZhciBzZWxlY3RvciA9IHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnID8gdGFyZ2V0IDogJyNpbnRlcmFjdGl2ZS52aWV3cG9ydCc7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNhblJlY29yZChjYikge1xuICAgIEJhcmNvZGVMb2NhdG9yLmNoZWNrSW1hZ2VDb25zdHJhaW50cyhfaW5wdXRTdHJlYW0sIF9jb25maWcubG9jYXRvcik7XG4gICAgaW5pdENhbnZhcyhfY29uZmlnKTtcbiAgICBfZnJhbWVncmFiYmVyID0gRnJhbWVHcmFiYmVyLmNyZWF0ZShfaW5wdXRTdHJlYW0sIF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlKTtcblxuICAgIGFkanVzdFdvcmtlclBvb2woX2NvbmZpZy5udW1PZldvcmtlcnMsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoX2NvbmZpZy5udW1PZldvcmtlcnMgPT09IDApIHtcbiAgICAgICAgICAgIGluaXRpYWxpemVEYXRhKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVhZHkoY2IpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByZWFkeShjYil7XG4gICAgX2lucHV0U3RyZWFtLnBsYXkoKTtcbiAgICBjYigpO1xufVxuXG5mdW5jdGlvbiBpbml0Q2FudmFzKCkge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgdmFyICR2aWV3cG9ydCA9IGdldFZpZXdQb3J0KCk7XG4gICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhcy5pbWdCdWZmZXJcIik7XG4gICAgICAgIGlmICghX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UpIHtcbiAgICAgICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlLmNsYXNzTmFtZSA9IFwiaW1nQnVmZmVyXCI7XG4gICAgICAgICAgICBpZiAoJHZpZXdwb3J0ICYmIF9jb25maWcuaW5wdXRTdHJlYW0udHlwZSA9PT0gXCJJbWFnZVN0cmVhbVwiKSB7XG4gICAgICAgICAgICAgICAgJHZpZXdwb3J0LmFwcGVuZENoaWxkKF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmN0eC5pbWFnZSA9IF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2Uud2lkdGggPSBfaW5wdXRTdHJlYW0uZ2V0Q2FudmFzU2l6ZSgpLng7XG4gICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlLmhlaWdodCA9IF9pbnB1dFN0cmVhbS5nZXRDYW52YXNTaXplKCkueTtcblxuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhcy5kcmF3aW5nQnVmZmVyXCIpO1xuICAgICAgICBpZiAoIV9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkpIHtcbiAgICAgICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheS5jbGFzc05hbWUgPSBcImRyYXdpbmdCdWZmZXJcIjtcbiAgICAgICAgICAgIGlmICgkdmlld3BvcnQpIHtcbiAgICAgICAgICAgICAgICAkdmlld3BvcnQuYXBwZW5kQ2hpbGQoX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY2xlYXJGaXggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIik7XG4gICAgICAgICAgICBjbGVhckZpeC5zZXRBdHRyaWJ1dGUoXCJjbGVhclwiLCBcImFsbFwiKTtcbiAgICAgICAgICAgIGlmICgkdmlld3BvcnQpIHtcbiAgICAgICAgICAgICAgICAkdmlld3BvcnQuYXBwZW5kQ2hpbGQoY2xlYXJGaXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9jYW52YXNDb250YWluZXIuY3R4Lm92ZXJsYXkgPSBfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheS53aWR0aCA9IF9pbnB1dFN0cmVhbS5nZXRDYW52YXNTaXplKCkueDtcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheS5oZWlnaHQgPSBfaW5wdXRTdHJlYW0uZ2V0Q2FudmFzU2l6ZSgpLnk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbml0QnVmZmVycyhpbWFnZVdyYXBwZXIpIHtcbiAgICBpZiAoaW1hZ2VXcmFwcGVyKSB7XG4gICAgICAgIF9pbnB1dEltYWdlV3JhcHBlciA9IGltYWdlV3JhcHBlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBfaW5wdXRJbWFnZVdyYXBwZXIgPSBuZXcgSW1hZ2VXcmFwcGVyKHtcbiAgICAgICAgICAgIHg6IF9pbnB1dFN0cmVhbS5nZXRXaWR0aCgpLFxuICAgICAgICAgICAgeTogX2lucHV0U3RyZWFtLmdldEhlaWdodCgpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUpO1xuICAgIH1cbiAgICBfYm94U2l6ZSA9IFtcbiAgICAgICAgdmVjMi5jbG9uZShbMCwgMF0pLFxuICAgICAgICB2ZWMyLmNsb25lKFswLCBfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS55XSksXG4gICAgICAgIHZlYzIuY2xvbmUoW19pbnB1dEltYWdlV3JhcHBlci5zaXplLngsIF9pbnB1dEltYWdlV3JhcHBlci5zaXplLnldKSxcbiAgICAgICAgdmVjMi5jbG9uZShbX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUueCwgMF0pXG4gICAgXTtcbiAgICBCYXJjb2RlTG9jYXRvci5pbml0KF9pbnB1dEltYWdlV3JhcHBlciwgX2NvbmZpZy5sb2NhdG9yKTtcbn1cblxuZnVuY3Rpb24gZ2V0Qm91bmRpbmdCb3hlcygpIHtcbiAgICBpZiAoX2NvbmZpZy5sb2NhdGUpIHtcbiAgICAgICAgcmV0dXJuIEJhcmNvZGVMb2NhdG9yLmxvY2F0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbW1xuICAgICAgICAgICAgdmVjMi5jbG9uZShfYm94U2l6ZVswXSksXG4gICAgICAgICAgICB2ZWMyLmNsb25lKF9ib3hTaXplWzFdKSxcbiAgICAgICAgICAgIHZlYzIuY2xvbmUoX2JveFNpemVbMl0pLFxuICAgICAgICAgICAgdmVjMi5jbG9uZShfYm94U2l6ZVszXSldXTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybVJlc3VsdChyZXN1bHQpIHtcbiAgICB2YXIgdG9wUmlnaHQgPSBfaW5wdXRTdHJlYW0uZ2V0VG9wUmlnaHQoKSxcbiAgICAgICAgeE9mZnNldCA9IHRvcFJpZ2h0LngsXG4gICAgICAgIHlPZmZzZXQgPSB0b3BSaWdodC55LFxuICAgICAgICBpO1xuXG4gICAgaWYgKHhPZmZzZXQgPT09IDAgJiYgeU9mZnNldCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdC5iYXJjb2Rlcykge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcmVzdWx0LmJhcmNvZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm1SZXN1bHQocmVzdWx0LmJhcmNvZGVzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZXN1bHQubGluZSAmJiByZXN1bHQubGluZS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgbW92ZUxpbmUocmVzdWx0LmxpbmUpO1xuICAgIH1cblxuICAgIGlmIChyZXN1bHQuYm94KSB7XG4gICAgICAgIG1vdmVCb3gocmVzdWx0LmJveCk7XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdC5ib3hlcyAmJiByZXN1bHQuYm94ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcmVzdWx0LmJveGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBtb3ZlQm94KHJlc3VsdC5ib3hlc1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3ZlQm94KGJveCkge1xuICAgICAgICB2YXIgY29ybmVyID0gYm94Lmxlbmd0aDtcblxuICAgICAgICB3aGlsZSAoY29ybmVyLS0pIHtcbiAgICAgICAgICAgIGJveFtjb3JuZXJdWzBdICs9IHhPZmZzZXQ7XG4gICAgICAgICAgICBib3hbY29ybmVyXVsxXSArPSB5T2Zmc2V0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW92ZUxpbmUobGluZSkge1xuICAgICAgICBsaW5lWzBdLnggKz0geE9mZnNldDtcbiAgICAgICAgbGluZVswXS55ICs9IHlPZmZzZXQ7XG4gICAgICAgIGxpbmVbMV0ueCArPSB4T2Zmc2V0O1xuICAgICAgICBsaW5lWzFdLnkgKz0geU9mZnNldDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFkZFJlc3VsdCAocmVzdWx0LCBpbWFnZURhdGEpIHtcbiAgICBpZiAoIWltYWdlRGF0YSB8fCAhX3Jlc3VsdENvbGxlY3Rvcikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdC5iYXJjb2Rlcykge1xuICAgICAgICByZXN1bHQuYmFyY29kZXMuZmlsdGVyKGJhcmNvZGUgPT4gYmFyY29kZS5jb2RlUmVzdWx0KVxuICAgICAgICAgICAgLmZvckVhY2goYmFyY29kZSA9PiBhZGRSZXN1bHQoYmFyY29kZSwgaW1hZ2VEYXRhKSk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQuY29kZVJlc3VsdCkge1xuICAgICAgICBfcmVzdWx0Q29sbGVjdG9yLmFkZFJlc3VsdChpbWFnZURhdGEsIF9pbnB1dFN0cmVhbS5nZXRDYW52YXNTaXplKCksIHJlc3VsdC5jb2RlUmVzdWx0KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGhhc0NvZGVSZXN1bHQgKHJlc3VsdCkge1xuICAgIHJldHVybiByZXN1bHQgJiYgKHJlc3VsdC5iYXJjb2RlcyA/XG4gICAgICByZXN1bHQuYmFyY29kZXMuc29tZShiYXJjb2RlID0+IGJhcmNvZGUuY29kZVJlc3VsdCkgOlxuICAgICAgcmVzdWx0LmNvZGVSZXN1bHQpO1xufVxuXG5mdW5jdGlvbiBwdWJsaXNoUmVzdWx0KHJlc3VsdCwgaW1hZ2VEYXRhKSB7XG4gICAgbGV0IHJlc3VsdFRvUHVibGlzaCA9IHJlc3VsdDtcblxuICAgIGlmIChyZXN1bHQgJiYgX29uVUlUaHJlYWQpIHtcbiAgICAgICAgdHJhbnNmb3JtUmVzdWx0KHJlc3VsdCk7XG4gICAgICAgIGFkZFJlc3VsdChyZXN1bHQsIGltYWdlRGF0YSk7XG4gICAgICAgIHJlc3VsdFRvUHVibGlzaCA9IHJlc3VsdC5iYXJjb2RlcyB8fCByZXN1bHQ7XG4gICAgfVxuXG4gICAgRXZlbnRzLnB1Ymxpc2goXCJwcm9jZXNzZWRcIiwgcmVzdWx0VG9QdWJsaXNoKTtcbiAgICBpZiAoaGFzQ29kZVJlc3VsdChyZXN1bHQpKSB7XG4gICAgICAgIEV2ZW50cy5wdWJsaXNoKFwiZGV0ZWN0ZWRcIiwgcmVzdWx0VG9QdWJsaXNoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGxvY2F0ZUFuZERlY29kZSgpIHtcbiAgICB2YXIgcmVzdWx0LFxuICAgICAgICBib3hlcztcblxuICAgIGJveGVzID0gZ2V0Qm91bmRpbmdCb3hlcygpO1xuICAgIGlmIChib3hlcykge1xuICAgICAgICByZXN1bHQgPSBfZGVjb2Rlci5kZWNvZGVGcm9tQm91bmRpbmdCb3hlcyhib3hlcyk7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCB7fTtcbiAgICAgICAgcmVzdWx0LmJveGVzID0gYm94ZXM7XG4gICAgICAgIHB1Ymxpc2hSZXN1bHQocmVzdWx0LCBfaW5wdXRJbWFnZVdyYXBwZXIuZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcHVibGlzaFJlc3VsdCgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIHZhciBhdmFpbGFibGVXb3JrZXI7XG5cbiAgICBpZiAoX29uVUlUaHJlYWQpIHtcbiAgICAgICAgaWYgKF93b3JrZXJQb29sLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGF2YWlsYWJsZVdvcmtlciA9IF93b3JrZXJQb29sLmZpbHRlcihmdW5jdGlvbih3b3JrZXJUaHJlYWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXdvcmtlclRocmVhZC5idXN5O1xuICAgICAgICAgICAgfSlbMF07XG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlV29ya2VyKSB7XG4gICAgICAgICAgICAgICAgX2ZyYW1lZ3JhYmJlci5hdHRhY2hEYXRhKGF2YWlsYWJsZVdvcmtlci5pbWFnZURhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIGFsbCB3b3JrZXJzIGFyZSBidXN5XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfZnJhbWVncmFiYmVyLmF0dGFjaERhdGEoX2lucHV0SW1hZ2VXcmFwcGVyLmRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChfZnJhbWVncmFiYmVyLmdyYWIoKSkge1xuICAgICAgICAgICAgaWYgKGF2YWlsYWJsZVdvcmtlcikge1xuICAgICAgICAgICAgICAgIGF2YWlsYWJsZVdvcmtlci5idXN5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVXb3JrZXIud29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgY21kOiAncHJvY2VzcycsXG4gICAgICAgICAgICAgICAgICAgIGltYWdlRGF0YTogYXZhaWxhYmxlV29ya2VyLmltYWdlRGF0YVxuICAgICAgICAgICAgICAgIH0sIFthdmFpbGFibGVXb3JrZXIuaW1hZ2VEYXRhLmJ1ZmZlcl0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2NhdGVBbmREZWNvZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGxvY2F0ZUFuZERlY29kZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc3RhcnRDb250aW51b3VzVXBkYXRlKCkge1xuICAgIHZhciBuZXh0ID0gbnVsbCxcbiAgICAgICAgZGVsYXkgPSAxMDAwIC8gKF9jb25maWcuZnJlcXVlbmN5IHx8IDYwKTtcblxuICAgIF9zdG9wcGVkID0gZmFsc2U7XG4gICAgKGZ1bmN0aW9uIGZyYW1lKHRpbWVzdGFtcCkge1xuICAgICAgICBuZXh0ID0gbmV4dCB8fCB0aW1lc3RhbXA7XG4gICAgICAgIGlmICghX3N0b3BwZWQpIHtcbiAgICAgICAgICAgIGlmICh0aW1lc3RhbXAgPj0gbmV4dCkge1xuICAgICAgICAgICAgICAgIG5leHQgKz0gZGVsYXk7XG4gICAgICAgICAgICAgICAgdXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1GcmFtZShmcmFtZSk7XG4gICAgICAgIH1cbiAgICB9KHBlcmZvcm1hbmNlLm5vdygpKSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgIGlmIChfb25VSVRocmVhZCAmJiBfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09IFwiTGl2ZVN0cmVhbVwiKSB7XG4gICAgICAgIHN0YXJ0Q29udGludW91c1VwZGF0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHVwZGF0ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5pdFdvcmtlcihjYikge1xuICAgIHZhciBibG9iVVJMLFxuICAgICAgICB3b3JrZXJUaHJlYWQgPSB7XG4gICAgICAgICAgICB3b3JrZXI6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGltYWdlRGF0YTogbmV3IFVpbnQ4QXJyYXkoX2lucHV0U3RyZWFtLmdldFdpZHRoKCkgKiBfaW5wdXRTdHJlYW0uZ2V0SGVpZ2h0KCkpLFxuICAgICAgICAgICAgYnVzeTogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgYmxvYlVSTCA9IGdlbmVyYXRlV29ya2VyQmxvYigpO1xuICAgIHdvcmtlclRocmVhZC53b3JrZXIgPSBuZXcgV29ya2VyKGJsb2JVUkwpO1xuXG4gICAgd29ya2VyVGhyZWFkLndvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLmRhdGEuZXZlbnQgPT09ICdpbml0aWFsaXplZCcpIHtcbiAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoYmxvYlVSTCk7XG4gICAgICAgICAgICB3b3JrZXJUaHJlYWQuYnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgd29ya2VyVGhyZWFkLmltYWdlRGF0YSA9IG5ldyBVaW50OEFycmF5KGUuZGF0YS5pbWFnZURhdGEpO1xuICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV29ya2VyIGluaXRpYWxpemVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNiKHdvcmtlclRocmVhZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5kYXRhLmV2ZW50ID09PSAncHJvY2Vzc2VkJykge1xuICAgICAgICAgICAgd29ya2VyVGhyZWFkLmltYWdlRGF0YSA9IG5ldyBVaW50OEFycmF5KGUuZGF0YS5pbWFnZURhdGEpO1xuICAgICAgICAgICAgd29ya2VyVGhyZWFkLmJ1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgIHB1Ymxpc2hSZXN1bHQoZS5kYXRhLnJlc3VsdCwgd29ya2VyVGhyZWFkLmltYWdlRGF0YSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5kYXRhLmV2ZW50ID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXb3JrZXIgZXJyb3I6IFwiICsgZS5kYXRhLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHdvcmtlclRocmVhZC53b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBjbWQ6ICdpbml0JyxcbiAgICAgICAgc2l6ZToge3g6IF9pbnB1dFN0cmVhbS5nZXRXaWR0aCgpLCB5OiBfaW5wdXRTdHJlYW0uZ2V0SGVpZ2h0KCl9LFxuICAgICAgICBpbWFnZURhdGE6IHdvcmtlclRocmVhZC5pbWFnZURhdGEsXG4gICAgICAgIGNvbmZpZzogY29uZmlnRm9yV29ya2VyKF9jb25maWcpXG4gICAgfSwgW3dvcmtlclRocmVhZC5pbWFnZURhdGEuYnVmZmVyXSk7XG59XG5cbmZ1bmN0aW9uIGNvbmZpZ0Zvcldvcmtlcihjb25maWcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5jb25maWcsXG4gICAgICAgIGlucHV0U3RyZWFtOiB7XG4gICAgICAgICAgICAuLi5jb25maWcuaW5wdXRTdHJlYW0sXG4gICAgICAgICAgICB0YXJnZXQ6IG51bGxcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIHdvcmtlckludGVyZmFjZShmYWN0b3J5KSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYqL1xuICAgIGlmIChmYWN0b3J5KSB7XG4gICAgICAgIHZhciBRdWFnZ2EgPSBmYWN0b3J5KCkuZGVmYXVsdDtcbiAgICAgICAgaWYgKCFRdWFnZ2EpIHtcbiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeydldmVudCc6ICdlcnJvcicsIG1lc3NhZ2U6ICdRdWFnZ2EgY291bGQgbm90IGJlIGNyZWF0ZWQnfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGltYWdlV3JhcHBlcjtcblxuICAgIHNlbGYub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS5kYXRhLmNtZCA9PT0gJ2luaXQnKSB7XG4gICAgICAgICAgICB2YXIgY29uZmlnID0gZS5kYXRhLmNvbmZpZztcbiAgICAgICAgICAgIGNvbmZpZy5udW1PZldvcmtlcnMgPSAwO1xuICAgICAgICAgICAgaW1hZ2VXcmFwcGVyID0gbmV3IFF1YWdnYS5JbWFnZVdyYXBwZXIoe1xuICAgICAgICAgICAgICAgIHg6IGUuZGF0YS5zaXplLngsXG4gICAgICAgICAgICAgICAgeTogZS5kYXRhLnNpemUueVxuICAgICAgICAgICAgfSwgbmV3IFVpbnQ4QXJyYXkoZS5kYXRhLmltYWdlRGF0YSkpO1xuICAgICAgICAgICAgUXVhZ2dhLmluaXQoY29uZmlnLCByZWFkeSwgaW1hZ2VXcmFwcGVyKTtcbiAgICAgICAgICAgIFF1YWdnYS5vblByb2Nlc3NlZChvblByb2Nlc3NlZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5kYXRhLmNtZCA9PT0gJ3Byb2Nlc3MnKSB7XG4gICAgICAgICAgICBpbWFnZVdyYXBwZXIuZGF0YSA9IG5ldyBVaW50OEFycmF5KGUuZGF0YS5pbWFnZURhdGEpO1xuICAgICAgICAgICAgUXVhZ2dhLnN0YXJ0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5kYXRhLmNtZCA9PT0gJ3NldFJlYWRlcnMnKSB7XG4gICAgICAgICAgICBRdWFnZ2Euc2V0UmVhZGVycyhlLmRhdGEucmVhZGVycyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gb25Qcm9jZXNzZWQocmVzdWx0KSB7XG4gICAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgJ2V2ZW50JzogJ3Byb2Nlc3NlZCcsXG4gICAgICAgICAgICBpbWFnZURhdGE6IGltYWdlV3JhcHBlci5kYXRhLFxuICAgICAgICAgICAgcmVzdWx0OiByZXN1bHRcbiAgICAgICAgfSwgW2ltYWdlV3JhcHBlci5kYXRhLmJ1ZmZlcl0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlYWR5KCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeydldmVudCc6ICdpbml0aWFsaXplZCcsIGltYWdlRGF0YTogaW1hZ2VXcmFwcGVyLmRhdGF9LCBbaW1hZ2VXcmFwcGVyLmRhdGEuYnVmZmVyXSk7XG4gICAgfVxuXG4gICAgLyogZXNsaW50LWVuYWJsZSAqL1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVdvcmtlckJsb2IoKSB7XG4gICAgdmFyIGJsb2IsXG4gICAgICAgIGZhY3RvcnlTb3VyY2U7XG5cbiAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4gICAgaWYgKHR5cGVvZiBfX2ZhY3RvcnlTb3VyY2VfXyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZmFjdG9yeVNvdXJjZSA9IF9fZmFjdG9yeVNvdXJjZV9fOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4gICAgfVxuICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG5cbiAgICBibG9iID0gbmV3IEJsb2IoWycoJyArIHdvcmtlckludGVyZmFjZS50b1N0cmluZygpICsgJykoJyArIGZhY3RvcnlTb3VyY2UgKyAnKTsnXSxcbiAgICAgICAge3R5cGU6ICd0ZXh0L2phdmFzY3JpcHQnfSk7XG5cbiAgICByZXR1cm4gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG59XG5cbmZ1bmN0aW9uIHNldFJlYWRlcnMocmVhZGVycykge1xuICAgIGlmIChfZGVjb2Rlcikge1xuICAgICAgICBfZGVjb2Rlci5zZXRSZWFkZXJzKHJlYWRlcnMpO1xuICAgIH0gZWxzZSBpZiAoX29uVUlUaHJlYWQgJiYgX3dvcmtlclBvb2wubGVuZ3RoID4gMCkge1xuICAgICAgICBfd29ya2VyUG9vbC5mb3JFYWNoKGZ1bmN0aW9uKHdvcmtlclRocmVhZCkge1xuICAgICAgICAgICAgd29ya2VyVGhyZWFkLndvcmtlci5wb3N0TWVzc2FnZSh7Y21kOiAnc2V0UmVhZGVycycsIHJlYWRlcnM6IHJlYWRlcnN9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBhZGp1c3RXb3JrZXJQb29sKGNhcGFjaXR5LCBjYikge1xuICAgIGNvbnN0IGluY3JlYXNlQnkgPSBjYXBhY2l0eSAtIF93b3JrZXJQb29sLmxlbmd0aDtcbiAgICBpZiAoaW5jcmVhc2VCeSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gY2IgJiYgY2IoKTtcbiAgICB9XG4gICAgaWYgKGluY3JlYXNlQnkgPCAwKSB7XG4gICAgICAgIGNvbnN0IHdvcmtlcnNUb1Rlcm1pbmF0ZSA9IF93b3JrZXJQb29sLnNsaWNlKGluY3JlYXNlQnkpO1xuICAgICAgICB3b3JrZXJzVG9UZXJtaW5hdGUuZm9yRWFjaChmdW5jdGlvbih3b3JrZXJUaHJlYWQpIHtcbiAgICAgICAgICAgIHdvcmtlclRocmVhZC53b3JrZXIudGVybWluYXRlKCk7XG4gICAgICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXb3JrZXIgdGVybWluYXRlZCFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBfd29ya2VyUG9vbCA9IF93b3JrZXJQb29sLnNsaWNlKDAsIGluY3JlYXNlQnkpO1xuICAgICAgICByZXR1cm4gY2IgJiYgY2IoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluY3JlYXNlQnk7IGkrKykge1xuICAgICAgICAgICAgaW5pdFdvcmtlcih3b3JrZXJJbml0aWFsaXplZCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB3b3JrZXJJbml0aWFsaXplZCh3b3JrZXJUaHJlYWQpIHtcbiAgICAgICAgICAgIF93b3JrZXJQb29sLnB1c2god29ya2VyVGhyZWFkKTtcbiAgICAgICAgICAgIGlmIChfd29ya2VyUG9vbC5sZW5ndGggPj0gY2FwYWNpdHkpe1xuICAgICAgICAgICAgICAgIGNiICYmIGNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbml0OiBmdW5jdGlvbihjb25maWcsIGNiLCBpbWFnZVdyYXBwZXIpIHtcbiAgICAgICAgX2NvbmZpZyA9IG1lcmdlKHt9LCBDb25maWcsIGNvbmZpZyk7XG4gICAgICAgIGlmIChpbWFnZVdyYXBwZXIpIHtcbiAgICAgICAgICAgIF9vblVJVGhyZWFkID0gZmFsc2U7XG4gICAgICAgICAgICBpbml0aWFsaXplRGF0YShpbWFnZVdyYXBwZXIpO1xuICAgICAgICAgICAgcmV0dXJuIGNiKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbml0SW5wdXRTdHJlYW0oY2IpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBzdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHN0YXJ0KCk7XG4gICAgfSxcbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgICAgX3N0b3BwZWQgPSB0cnVlO1xuICAgICAgICBhZGp1c3RXb3JrZXJQb29sKDApO1xuICAgICAgICBpZiAoX2NvbmZpZy5pbnB1dFN0cmVhbS50eXBlID09PSBcIkxpdmVTdHJlYW1cIikge1xuICAgICAgICAgICAgQ2FtZXJhQWNjZXNzLnJlbGVhc2UoKTtcbiAgICAgICAgICAgIF9pbnB1dFN0cmVhbS5jbGVhckV2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcGF1c2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfc3RvcHBlZCA9IHRydWU7XG4gICAgfSxcbiAgICBvbkRldGVjdGVkOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICBFdmVudHMuc3Vic2NyaWJlKFwiZGV0ZWN0ZWRcIiwgY2FsbGJhY2spO1xuICAgIH0sXG4gICAgb2ZmRGV0ZWN0ZWQ6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIEV2ZW50cy51bnN1YnNjcmliZShcImRldGVjdGVkXCIsIGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIG9uUHJvY2Vzc2VkOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICBFdmVudHMuc3Vic2NyaWJlKFwicHJvY2Vzc2VkXCIsIGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIG9mZlByb2Nlc3NlZDogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgRXZlbnRzLnVuc3Vic2NyaWJlKFwicHJvY2Vzc2VkXCIsIGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIHNldFJlYWRlcnM6IGZ1bmN0aW9uKHJlYWRlcnMpIHtcbiAgICAgICAgc2V0UmVhZGVycyhyZWFkZXJzKTtcbiAgICB9LFxuICAgIHJlZ2lzdGVyUmVzdWx0Q29sbGVjdG9yOiBmdW5jdGlvbihyZXN1bHRDb2xsZWN0b3IpIHtcbiAgICAgICAgaWYgKHJlc3VsdENvbGxlY3RvciAmJiB0eXBlb2YgcmVzdWx0Q29sbGVjdG9yLmFkZFJlc3VsdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgX3Jlc3VsdENvbGxlY3RvciA9IHJlc3VsdENvbGxlY3RvcjtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY2FudmFzOiBfY2FudmFzQ29udGFpbmVyLFxuICAgIGRlY29kZVNpbmdsZTogZnVuY3Rpb24oY29uZmlnLCByZXN1bHRDYWxsYmFjaykge1xuICAgICAgICBjb25maWcgPSBtZXJnZSh7XG4gICAgICAgICAgICBpbnB1dFN0cmVhbToge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiSW1hZ2VTdHJlYW1cIixcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2l6ZTogODAwLFxuICAgICAgICAgICAgICAgIHNyYzogY29uZmlnLnNyY1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG51bU9mV29ya2VyczogKEVOVi5kZXZlbG9wbWVudCAmJiBjb25maWcuZGVidWcpID8gMCA6IDEsXG4gICAgICAgICAgICBsb2NhdG9yOiB7XG4gICAgICAgICAgICAgICAgaGFsZlNhbXBsZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY29uZmlnKTtcbiAgICAgICAgdGhpcy5pbml0KGNvbmZpZywgKCkgPT4ge1xuICAgICAgICAgICAgRXZlbnRzLm9uY2UoXCJwcm9jZXNzZWRcIiwgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgICAgIHJlc3VsdENhbGxiYWNrLmNhbGwobnVsbCwgcmVzdWx0KTtcbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgICAgc3RhcnQoKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBJbWFnZVdyYXBwZXI6IEltYWdlV3JhcHBlcixcbiAgICBJbWFnZURlYnVnOiBJbWFnZURlYnVnLFxuICAgIFJlc3VsdENvbGxlY3RvcjogUmVzdWx0Q29sbGVjdG9yLFxuICAgIENhbWVyYUFjY2VzczogQ2FtZXJhQWNjZXNzLFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9xdWFnZ2EuanMiLCJjb25zdCBDVlV0aWxzID0gcmVxdWlyZSgnLi4vc3JjL2NvbW1vbi9jdl91dGlscycpLFxuICAgICAgTmRhcnJheSA9IHJlcXVpcmUoXCJuZGFycmF5XCIpLFxuICAgICAgSW50ZXJwMkQgPSByZXF1aXJlKFwibmRhcnJheS1saW5lYXItaW50ZXJwb2xhdGVcIikuZDI7XG5cbnZhciBGcmFtZUdyYWJiZXIgPSB7fTtcblxuRnJhbWVHcmFiYmVyLmNyZWF0ZSA9IGZ1bmN0aW9uKGlucHV0U3RyZWFtKSB7XG4gICAgdmFyIF90aGF0ID0ge30sXG4gICAgICAgIF9zdHJlYW1Db25maWcgPSBpbnB1dFN0cmVhbS5nZXRDb25maWcoKSxcbiAgICAgICAgX3ZpZGVvX3NpemUgPSBDVlV0aWxzLmltYWdlUmVmKGlucHV0U3RyZWFtLmdldFJlYWxXaWR0aCgpLCBpbnB1dFN0cmVhbS5nZXRSZWFsSGVpZ2h0KCkpLFxuICAgICAgICBfY2FudmFzU2l6ZSA9IGlucHV0U3RyZWFtLmdldENhbnZhc1NpemUoKSxcbiAgICAgICAgX3NpemUgPSBDVlV0aWxzLmltYWdlUmVmKGlucHV0U3RyZWFtLmdldFdpZHRoKCksIGlucHV0U3RyZWFtLmdldEhlaWdodCgpKSxcbiAgICAgICAgX3RvcFJpZ2h0ID0gaW5wdXRTdHJlYW0uZ2V0VG9wUmlnaHQoKSxcbiAgICAgICAgX2RhdGEgPSBuZXcgVWludDhBcnJheShfc2l6ZS54ICogX3NpemUueSksXG4gICAgICAgIF9ncmF5RGF0YSA9IG5ldyBVaW50OEFycmF5KF92aWRlb19zaXplLnggKiBfdmlkZW9fc2l6ZS55KSxcbiAgICAgICAgX2NhbnZhc0RhdGEgPSBuZXcgVWludDhBcnJheShfY2FudmFzU2l6ZS54ICogX2NhbnZhc1NpemUueSksXG4gICAgICAgIF9ncmF5SW1hZ2VBcnJheSA9IE5kYXJyYXkoX2dyYXlEYXRhLCBbX3ZpZGVvX3NpemUueSwgX3ZpZGVvX3NpemUueF0pLnRyYW5zcG9zZSgxLCAwKSxcbiAgICAgICAgX2NhbnZhc0ltYWdlQXJyYXkgPSBOZGFycmF5KF9jYW52YXNEYXRhLCBbX2NhbnZhc1NpemUueSwgX2NhbnZhc1NpemUueF0pLnRyYW5zcG9zZSgxLCAwKSxcbiAgICAgICAgX3RhcmdldEltYWdlQXJyYXkgPSBfY2FudmFzSW1hZ2VBcnJheS5oaShfdG9wUmlnaHQueCArIF9zaXplLngsIF90b3BSaWdodC55ICsgX3NpemUueSkubG8oX3RvcFJpZ2h0LngsIF90b3BSaWdodC55KSxcbiAgICAgICAgX3N0ZXBTaXplWCA9IF92aWRlb19zaXplLngvX2NhbnZhc1NpemUueCxcbiAgICAgICAgX3N0ZXBTaXplWSA9IF92aWRlb19zaXplLnkvX2NhbnZhc1NpemUueTtcblxuICAgIGNvbnNvbGUubG9nKFwiRnJhbWVHcmFiYmVyXCIsIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdmlkZW9TaXplOiBfZ3JheUltYWdlQXJyYXkuc2hhcGUsXG4gICAgICAgIGNhbnZhc1NpemU6IF9jYW52YXNJbWFnZUFycmF5LnNoYXBlLFxuICAgICAgICBzdGVwU2l6ZTogW19zdGVwU2l6ZVgsIF9zdGVwU2l6ZVldLFxuICAgICAgICBzaXplOiBfdGFyZ2V0SW1hZ2VBcnJheS5zaGFwZSxcbiAgICAgICAgdG9wUmlnaHQ6IF90b3BSaWdodFxuICAgIH0pKTtcblxuICAgIC8qKlxuICAgICAqIFVzZXMgdGhlIGdpdmVuIGFycmF5IGFzIGZyYW1lLWJ1ZmZlclxuICAgICAqL1xuICAgIF90aGF0LmF0dGFjaERhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIF9kYXRhID0gZGF0YTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdXNlZCBmcmFtZS1idWZmZXJcbiAgICAgKi9cbiAgICBfdGhhdC5nZXREYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfZGF0YTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmV0Y2hlcyBhIGZyYW1lIGZyb20gdGhlIGlucHV0LXN0cmVhbSBhbmQgcHV0cyBpbnRvIHRoZSBmcmFtZS1idWZmZXIuXG4gICAgICogVGhlIGltYWdlLWRhdGEgaXMgY29udmVydGVkIHRvIGdyYXktc2NhbGUgYW5kIHRoZW4gaGFsZi1zYW1wbGVkIGlmIGNvbmZpZ3VyZWQuXG4gICAgICovXG4gICAgX3RoYXQuZ3JhYiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZnJhbWUgPSBpbnB1dFN0cmVhbS5nZXRGcmFtZSgpO1xuXG4gICAgICAgIGlmIChmcmFtZSkge1xuICAgICAgICAgICAgdGhpcy5zY2FsZUFuZENyb3AoZnJhbWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgX3RoYXQuc2NhbGVBbmRDcm9wID0gZnVuY3Rpb24oZnJhbWUpIHtcbiAgICAgICAgdmFyIHgsXG4gICAgICAgICAgICB5O1xuXG4gICAgICAgIC8vIDEuIGNvbXB1dGUgZnVsbC1zaXplZCBncmF5IGltYWdlXG4gICAgICAgIENWVXRpbHMuY29tcHV0ZUdyYXkoZnJhbWUuZGF0YSwgX2dyYXlEYXRhKTtcblxuICAgICAgICAvLyAyLiBpbnRlcnBvbGF0ZVxuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgX2NhbnZhc1NpemUueTsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgX2NhbnZhc1NpemUueDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgX2NhbnZhc0ltYWdlQXJyYXkuc2V0KHgsIHksIChJbnRlcnAyRChfZ3JheUltYWdlQXJyYXksIHggKiBfc3RlcFNpemVYLCB5ICogX3N0ZXBTaXplWSkpIHwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0YXJnZXRJbWFnZUFycmF5IG11c3QgYmUgZXF1YWwgdG8gdGFyZ2V0U2l6ZVxuICAgICAgICBpZiAoX3RhcmdldEltYWdlQXJyYXkuc2hhcGVbMF0gIT09IF9zaXplLnggfHxcbiAgICAgICAgICAgIF90YXJnZXRJbWFnZUFycmF5LnNoYXBlWzFdICE9PSBfc2l6ZS55KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGFwZXMgZG8gbm90IG1hdGNoIVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDMuIGNyb3BcbiAgICAgICAgZm9yICh5ID0gMDsgeSA8IF9zaXplLnk7IHkrKykge1xuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IF9zaXplLng7IHgrKykge1xuICAgICAgICAgICAgICAgIF9kYXRhW3kgKiBfc2l6ZS54ICsgeF0gPSBfdGFyZ2V0SW1hZ2VBcnJheS5nZXQoeCwgeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3RoYXQuZ2V0U2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX3NpemU7XG4gICAgfTtcblxuICAgIHJldHVybiBfdGhhdDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRnJhbWVHcmFiYmVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2ZyYW1lX2dyYWJiZXIuanMiLCJjb25zdCBHZXRQaXhlbHMgPSByZXF1aXJlKFwiZ2V0LXBpeGVsc1wiKTtcblxudmFyIElucHV0U3RyZWFtID0ge307XG5cbklucHV0U3RyZWFtLmNyZWF0ZUltYWdlU3RyZWFtID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRoYXQgPSB7fTtcbiAgICB2YXIgX2NvbmZpZyA9IG51bGw7XG5cbiAgICB2YXIgd2lkdGggPSAwLFxuICAgICAgICBoZWlnaHQgPSAwLFxuICAgICAgICBmcmFtZUlkeCA9IDAsXG4gICAgICAgIHBhdXNlZCA9IHRydWUsXG4gICAgICAgIGxvYWRlZCA9IGZhbHNlLFxuICAgICAgICBmcmFtZSA9IG51bGwsXG4gICAgICAgIGJhc2VVcmwsXG4gICAgICAgIGVuZGVkID0gZmFsc2UsXG4gICAgICAgIHNpemUsXG4gICAgICAgIGNhbGN1bGF0ZWRXaWR0aCxcbiAgICAgICAgY2FsY3VsYXRlZEhlaWdodCxcbiAgICAgICAgX2V2ZW50TmFtZXMgPSBbJ2NhbnJlY29yZCcsICdlbmRlZCddLFxuICAgICAgICBfZXZlbnRIYW5kbGVycyA9IHt9LFxuICAgICAgICBfdG9wUmlnaHQgPSB7eDogMCwgeTogMH0sXG4gICAgICAgIF9jYW52YXNTaXplID0ge3g6IDAsIHk6IDB9O1xuXG4gICAgZnVuY3Rpb24gbG9hZEltYWdlcygpIHtcbiAgICAgICAgbG9hZGVkID0gZmFsc2U7XG4gICAgICAgIEdldFBpeGVscyhiYXNlVXJsLCBmdW5jdGlvbihlcnIsIHBpeGVscykge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgZXhpdCgxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwaXhlbHMuc2hhcGUpO1xuICAgICAgICAgICAgZnJhbWUgPSBwaXhlbHM7XG4gICAgICAgICAgICB3aWR0aCA9IHBpeGVscy5zaGFwZVswXTtcbiAgICAgICAgICAgIGhlaWdodCA9IHBpeGVscy5zaGFwZVsxXTtcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRXaWR0aCA9IF9jb25maWcuc2l6ZSA/IHdpZHRoL2hlaWdodCA+IDEgPyBfY29uZmlnLnNpemUgOiBNYXRoLmZsb29yKCh3aWR0aC9oZWlnaHQpICogX2NvbmZpZy5zaXplKSA6IHdpZHRoO1xuICAgICAgICAgICAgY2FsY3VsYXRlZEhlaWdodCA9IF9jb25maWcuc2l6ZSA/IHdpZHRoL2hlaWdodCA+IDEgPyBNYXRoLmZsb29yKChoZWlnaHQvd2lkdGgpICogX2NvbmZpZy5zaXplKSA6IF9jb25maWcuc2l6ZSA6IGhlaWdodDtcblxuICAgICAgICAgICAgX2NhbnZhc1NpemUueCA9IGNhbGN1bGF0ZWRXaWR0aDtcbiAgICAgICAgICAgIF9jYW52YXNTaXplLnkgPSBjYWxjdWxhdGVkSGVpZ2h0O1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHB1Ymxpc2hFdmVudChcImNhbnJlY29yZFwiLCBbXSk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHVibGlzaEV2ZW50KGV2ZW50TmFtZSwgYXJncykge1xuICAgICAgICB2YXIgaixcbiAgICAgICAgICAgIGhhbmRsZXJzID0gX2V2ZW50SGFuZGxlcnNbZXZlbnROYW1lXTtcblxuICAgICAgICBpZiAoaGFuZGxlcnMgJiYgaGFuZGxlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBoYW5kbGVycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJzW2pdLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICB0aGF0LnRyaWdnZXIgPSBwdWJsaXNoRXZlbnQ7XG5cbiAgICB0aGF0LmdldFdpZHRoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBjYWxjdWxhdGVkV2lkdGg7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBjYWxjdWxhdGVkSGVpZ2h0O1xuICAgIH07XG5cbiAgICB0aGF0LnNldFdpZHRoID0gZnVuY3Rpb24od2lkdGgpIHtcbiAgICAgICAgY2FsY3VsYXRlZFdpZHRoID0gd2lkdGg7XG4gICAgfTtcblxuICAgIHRoYXQuc2V0SGVpZ2h0ID0gZnVuY3Rpb24oaGVpZ2h0KSB7XG4gICAgICAgIGNhbGN1bGF0ZWRIZWlnaHQgPSBoZWlnaHQ7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UmVhbFdpZHRoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB3aWR0aDtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRSZWFsSGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBoZWlnaHQ7XG4gICAgfTtcblxuICAgIHRoYXQuc2V0SW5wdXRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgX2NvbmZpZyA9IHN0cmVhbTtcbiAgICAgICAgYmFzZVVybCA9IF9jb25maWcuc3JjO1xuICAgICAgICBzaXplID0gMTtcbiAgICAgICAgbG9hZEltYWdlcygpO1xuICAgIH07XG5cbiAgICB0aGF0LmVuZGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBlbmRlZDtcbiAgICB9O1xuXG4gICAgdGhhdC5zZXRBdHRyaWJ1dGUgPSBmdW5jdGlvbigpIHt9O1xuXG4gICAgdGhhdC5nZXRDb25maWcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9jb25maWc7XG4gICAgfTtcblxuICAgIHRoYXQucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcGF1c2VkID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdGhhdC5wbGF5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgIH07XG5cbiAgICB0aGF0LnNldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24odGltZSkge1xuICAgICAgICBmcmFtZUlkeCA9IHRpbWU7XG4gICAgfTtcblxuICAgIHRoYXQuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmKSB7XG4gICAgICAgIGlmIChfZXZlbnROYW1lcy5pbmRleE9mKGV2ZW50KSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGlmICghX2V2ZW50SGFuZGxlcnNbZXZlbnRdKSB7XG4gICAgICAgICAgICAgICAgX2V2ZW50SGFuZGxlcnNbZXZlbnRdID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfZXZlbnRIYW5kbGVyc1tldmVudF0ucHVzaChmKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LnNldFRvcFJpZ2h0ID0gZnVuY3Rpb24odG9wUmlnaHQpIHtcbiAgICAgICAgX3RvcFJpZ2h0LnggPSB0b3BSaWdodC54O1xuICAgICAgICBfdG9wUmlnaHQueSA9IHRvcFJpZ2h0Lnk7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0VG9wUmlnaHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF90b3BSaWdodDtcbiAgICB9O1xuXG4gICAgdGhhdC5zZXRDYW52YXNTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgICBfY2FudmFzU2l6ZS54ID0gc2l6ZS54O1xuICAgICAgICBfY2FudmFzU2l6ZS55ID0gc2l6ZS55O1xuICAgIH07XG5cbiAgICB0aGF0LmdldENhbnZhc1NpemUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9jYW52YXNTaXplO1xuICAgIH07XG5cbiAgICB0aGF0LmdldEZyYW1lID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghbG9hZGVkKXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmcmFtZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0U3RyZWFtO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2lucHV0X3N0cmVhbS5qcyIsImltcG9ydCBJbWFnZURlYnVnIGZyb20gJy4uL2NvbW1vbi9pbWFnZV9kZWJ1Zyc7XG5cbmZ1bmN0aW9uIGNvbnRhaW5zKGNvZGVSZXN1bHQsIGxpc3QpIHtcbiAgICBpZiAobGlzdCkge1xuICAgICAgICByZXR1cm4gbGlzdC5zb21lKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoaXRlbSkuZXZlcnkoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtW2tleV0gPT09IGNvZGVSZXN1bHRba2V5XTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBwYXNzZXNGaWx0ZXIoY29kZVJlc3VsdCwgZmlsdGVyKSB7XG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGZpbHRlcihjb2RlUmVzdWx0KTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGNvbmZpZykge1xuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSxcbiAgICAgICAgICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiksXG4gICAgICAgICAgICByZXN1bHRzID0gW10sXG4gICAgICAgICAgICBjYXBhY2l0eSA9IGNvbmZpZy5jYXBhY2l0eSB8fCAyMCxcbiAgICAgICAgICAgIGNhcHR1cmUgPSBjb25maWcuY2FwdHVyZSA9PT0gdHJ1ZTtcblxuICAgICAgICBmdW5jdGlvbiBtYXRjaGVzQ29uc3RyYWludHMoY29kZVJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhcGFjaXR5XG4gICAgICAgICAgICAgICAgJiYgY29kZVJlc3VsdFxuICAgICAgICAgICAgICAgICYmICFjb250YWlucyhjb2RlUmVzdWx0LCBjb25maWcuYmxhY2tsaXN0KVxuICAgICAgICAgICAgICAgICYmIHBhc3Nlc0ZpbHRlcihjb2RlUmVzdWx0LCBjb25maWcuZmlsdGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhZGRSZXN1bHQ6IGZ1bmN0aW9uKGRhdGEsIGltYWdlU2l6ZSwgY29kZVJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB7fTtcblxuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzQ29uc3RyYWludHMoY29kZVJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FwYWNpdHktLTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmNvZGVSZXN1bHQgPSBjb2RlUmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FwdHVyZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gaW1hZ2VTaXplLng7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2VTaXplLnk7XG4gICAgICAgICAgICAgICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdJbWFnZShkYXRhLCBpbWFnZVNpemUsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZnJhbWUgPSBjYW52YXMudG9EYXRhVVJMKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFJlc3VsdHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYW5hbHl0aWNzL3Jlc3VsdF9jb2xsZWN0b3IuanMiLCJjb25zdCB2ZWMyID0ge1xuICAgIGNsb25lOiByZXF1aXJlKCdnbC12ZWMyL2Nsb25lJyksXG4gICAgZG90OiByZXF1aXJlKCdnbC12ZWMyL2RvdCcpXG59XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGNsdXN0ZXIgZm9yIGdyb3VwaW5nIHNpbWlsYXIgb3JpZW50YXRpb25zIG9mIGRhdGFwb2ludHNcbiAgICAgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKHBvaW50LCB0aHJlc2hvbGQpIHtcbiAgICAgICAgdmFyIHBvaW50cyA9IFtdLFxuICAgICAgICAgICAgY2VudGVyID0ge1xuICAgICAgICAgICAgICAgIHJhZDogMCxcbiAgICAgICAgICAgICAgICB2ZWM6IHZlYzIuY2xvbmUoWzAsIDBdKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBvaW50TWFwID0ge307XG5cbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgICAgIGFkZChwb2ludCk7XG4gICAgICAgICAgICB1cGRhdGVDZW50ZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZChwb2ludFRvQWRkKSB7XG4gICAgICAgICAgICBwb2ludE1hcFtwb2ludFRvQWRkLmlkXSA9IHBvaW50VG9BZGQ7XG4gICAgICAgICAgICBwb2ludHMucHVzaChwb2ludFRvQWRkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZUNlbnRlcigpIHtcbiAgICAgICAgICAgIHZhciBpLCBzdW0gPSAwO1xuICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzdW0gKz0gcG9pbnRzW2ldLnJhZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNlbnRlci5yYWQgPSBzdW0gLyBwb2ludHMubGVuZ3RoO1xuICAgICAgICAgICAgY2VudGVyLnZlYyA9IHZlYzIuY2xvbmUoW01hdGguY29zKGNlbnRlci5yYWQpLCBNYXRoLnNpbihjZW50ZXIucmFkKV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5pdCgpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhZGQ6IGZ1bmN0aW9uKHBvaW50VG9BZGQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXBvaW50TWFwW3BvaW50VG9BZGQuaWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZChwb2ludFRvQWRkKTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQ2VudGVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpdHM6IGZ1bmN0aW9uKG90aGVyUG9pbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBjb3NpbmUgc2ltaWxhcml0eSB0byBjZW50ZXItYW5nbGVcbiAgICAgICAgICAgICAgICB2YXIgc2ltaWxhcml0eSA9IE1hdGguYWJzKHZlYzIuZG90KG90aGVyUG9pbnQucG9pbnQudmVjLCBjZW50ZXIudmVjKSk7XG4gICAgICAgICAgICAgICAgaWYgKHNpbWlsYXJpdHkgPiB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRQb2ludHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwb2ludHM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0Q2VudGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2VudGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgY3JlYXRlUG9pbnQ6IGZ1bmN0aW9uKG5ld1BvaW50LCBpZCwgcHJvcGVydHkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJhZDogbmV3UG9pbnRbcHJvcGVydHldLFxuICAgICAgICAgICAgcG9pbnQ6IG5ld1BvaW50LFxuICAgICAgICAgICAgaWQ6IGlkXG4gICAgICAgIH07XG4gICAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24vY2x1c3Rlci5qcyIsImV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbigpIHtcbiAgICB2YXIgZXZlbnRzID0ge307XG5cbiAgICBmdW5jdGlvbiBnZXRFdmVudChldmVudE5hbWUpIHtcbiAgICAgICAgaWYgKCFldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlcnM6IFtdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBldmVudHNbZXZlbnROYW1lXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckV2ZW50cygpe1xuICAgICAgICBldmVudHMgPSB7fTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwdWJsaXNoU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbiwgZGF0YSkge1xuICAgICAgICBpZiAoc3Vic2NyaXB0aW9uLmFzeW5jKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5jYWxsYmFjayhkYXRhKTtcbiAgICAgICAgICAgIH0sIDQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uLmNhbGxiYWNrKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3Vic2NyaWJlKGV2ZW50LCBjYWxsYmFjaywgYXN5bmMpIHtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbjtcblxuICAgICAgICBpZiAoIHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24gPSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgIGFzeW5jOiBhc3luY1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgaWYgKCFzdWJzY3JpcHRpb24uY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkNhbGxiYWNrIHdhcyBub3Qgc3BlY2lmaWVkIG9uIG9wdGlvbnNcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGdldEV2ZW50KGV2ZW50KS5zdWJzY3JpYmVycy5wdXNoKHN1YnNjcmlwdGlvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3Vic2NyaWJlOiBmdW5jdGlvbihldmVudCwgY2FsbGJhY2ssIGFzeW5jKSB7XG4gICAgICAgICAgICByZXR1cm4gc3Vic2NyaWJlKGV2ZW50LCBjYWxsYmFjaywgYXN5bmMpO1xuICAgICAgICB9LFxuICAgICAgICBwdWJsaXNoOiBmdW5jdGlvbihldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBldmVudCA9IGdldEV2ZW50KGV2ZW50TmFtZSksXG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlcnMgPSBldmVudC5zdWJzY3JpYmVycztcblxuICAgICAgICAgICAgLy8gUHVibGlzaCBvbmUtdGltZSBzdWJzY3JpcHRpb25zXG4gICAgICAgICAgICBzdWJzY3JpYmVycy5maWx0ZXIoZnVuY3Rpb24oc3Vic2NyaWJlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiAhIXN1YnNjcmliZXIub25jZTtcbiAgICAgICAgICAgIH0pLmZvckVhY2goKHN1YnNjcmliZXIpID0+IHtcbiAgICAgICAgICAgICAgICBwdWJsaXNoU3Vic2NyaXB0aW9uKHN1YnNjcmliZXIsIGRhdGEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGVtIGZyb20gdGhlIHN1YnNjcmliZXJcbiAgICAgICAgICAgIGV2ZW50LnN1YnNjcmliZXJzID0gc3Vic2NyaWJlcnMuZmlsdGVyKGZ1bmN0aW9uKHN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXN1YnNjcmliZXIub25jZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBwdWJsaXNoIHRoZSByZXN0XG4gICAgICAgICAgICBldmVudC5zdWJzY3JpYmVycy5mb3JFYWNoKChzdWJzY3JpYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgcHVibGlzaFN1YnNjcmlwdGlvbihzdWJzY3JpYmVyLCBkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbmNlOiBmdW5jdGlvbihldmVudCwgY2FsbGJhY2ssIGFzeW5jKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmUoZXZlbnQsIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgYXN5bmM6IGFzeW5jLFxuICAgICAgICAgICAgICAgIG9uY2U6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICB1bnN1YnNjcmliZTogZnVuY3Rpb24oZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGV2ZW50O1xuXG4gICAgICAgICAgICBpZiAoZXZlbnROYW1lKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQgPSBnZXRFdmVudChldmVudE5hbWUpO1xuICAgICAgICAgICAgICAgIGlmIChldmVudCAmJiBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdWJzY3JpYmVycyA9IGV2ZW50LnN1YnNjcmliZXJzLmZpbHRlcihmdW5jdGlvbihzdWJzY3JpYmVyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJzY3JpYmVyLmNhbGxiYWNrICE9PSBjYWxsYmFjaztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3Vic2NyaWJlcnMgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsZWFyRXZlbnRzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24vZXZlbnRzLmpzIiwiXG5leHBvcnQgZnVuY3Rpb24gZW51bWVyYXRlRGV2aWNlcygpIHtcbiAgICBpZiAobmF2aWdhdG9yLm1lZGlhRGV2aWNlc1xuICAgICAgICAgICAgJiYgdHlwZW9mIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKCk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ2VudW1lcmF0ZURldmljZXMgaXMgbm90IGRlZmluZWQnKSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKSB7XG4gICAgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXNcbiAgICAgICAgICAgICYmIHR5cGVvZiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLm1lZGlhRGV2aWNlc1xuICAgICAgICAgICAgLmdldFVzZXJNZWRpYShjb25zdHJhaW50cyk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ2dldFVzZXJNZWRpYSBpcyBub3QgZGVmaW5lZCcpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24vbWVkaWFEZXZpY2VzLmpzIiwiLyoqXG4gKiBDb25zdHJ1Y3QgcmVwcmVzZW50aW5nIGEgcGFydCBvZiBhbm90aGVyIHtJbWFnZVdyYXBwZXJ9LiBTaGFyZXMgZGF0YVxuICogYmV0d2VlbiB0aGUgcGFyZW50IGFuZCB0aGUgY2hpbGQuXG4gKiBAcGFyYW0gZnJvbSB7SW1hZ2VSZWZ9IFRoZSBwb3NpdGlvbiB3aGVyZSB0byBzdGFydCB0aGUge1N1YkltYWdlfSBmcm9tLiAodG9wLWxlZnQgY29ybmVyKVxuICogQHBhcmFtIHNpemUge0ltYWdlUmVmfSBUaGUgc2l6ZSBvZiB0aGUgcmVzdWx0aW5nIGltYWdlXG4gKiBAcGFyYW0gSSB7SW1hZ2VXcmFwcGVyfSBUaGUge0ltYWdlV3JhcHBlcn0gdG8gc2hhcmUgZnJvbVxuICogQHJldHVybnMge1N1YkltYWdlfSBBIHNoYXJlZCBwYXJ0IG9mIHRoZSBvcmlnaW5hbCBpbWFnZVxuICovXG5mdW5jdGlvbiBTdWJJbWFnZShmcm9tLCBzaXplLCBJKSB7XG4gICAgaWYgKCFJKSB7XG4gICAgICAgIEkgPSB7XG4gICAgICAgICAgICBkYXRhOiBudWxsLFxuICAgICAgICAgICAgc2l6ZTogc2l6ZVxuICAgICAgICB9O1xuICAgIH1cbiAgICB0aGlzLmRhdGEgPSBJLmRhdGE7XG4gICAgdGhpcy5vcmlnaW5hbFNpemUgPSBJLnNpemU7XG4gICAgdGhpcy5JID0gSTtcblxuICAgIHRoaXMuZnJvbSA9IGZyb207XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbn1cblxuLyoqXG4gKiBEaXNwbGF5cyB0aGUge1N1YkltYWdlfSBpbiBhIGdpdmVuIGNhbnZhc1xuICogQHBhcmFtIGNhbnZhcyB7Q2FudmFzfSBUaGUgY2FudmFzIGVsZW1lbnQgdG8gd3JpdGUgdG9cbiAqIEBwYXJhbSBzY2FsZSB7TnVtYmVyfSBTY2FsZSB3aGljaCBpcyBhcHBsaWVkIHRvIGVhY2ggcGl4ZWwtdmFsdWVcbiAqL1xuU3ViSW1hZ2UucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbihjYW52YXMsIHNjYWxlKSB7XG4gICAgdmFyIGN0eCxcbiAgICAgICAgZnJhbWUsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGN1cnJlbnQsXG4gICAgICAgIHksXG4gICAgICAgIHgsXG4gICAgICAgIHBpeGVsO1xuXG4gICAgaWYgKCFzY2FsZSkge1xuICAgICAgICBzY2FsZSA9IDEuMDtcbiAgICB9XG4gICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgY2FudmFzLndpZHRoID0gdGhpcy5zaXplLng7XG4gICAgY2FudmFzLmhlaWdodCA9IHRoaXMuc2l6ZS55O1xuICAgIGZyYW1lID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGRhdGEgPSBmcmFtZS5kYXRhO1xuICAgIGN1cnJlbnQgPSAwO1xuICAgIGZvciAoeSA9IDA7IHkgPCB0aGlzLnNpemUueTsgeSsrKSB7XG4gICAgICAgIGZvciAoeCA9IDA7IHggPCB0aGlzLnNpemUueDsgeCsrKSB7XG4gICAgICAgICAgICBwaXhlbCA9IHkgKiB0aGlzLnNpemUueCArIHg7XG4gICAgICAgICAgICBjdXJyZW50ID0gdGhpcy5nZXQoeCwgeSkgKiBzY2FsZTtcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMF0gPSBjdXJyZW50O1xuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAxXSA9IGN1cnJlbnQ7XG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDJdID0gY3VycmVudDtcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgM10gPSAyNTU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnJhbWUuZGF0YSA9IGRhdGE7XG4gICAgY3R4LnB1dEltYWdlRGF0YShmcmFtZSwgMCwgMCk7XG59O1xuXG4vKipcbiAqIFJldHJpZXZlcyBhIGdpdmVuIHBpeGVsIHBvc2l0aW9uIGZyb20gdGhlIHtTdWJJbWFnZX1cbiAqIEBwYXJhbSB4IHtOdW1iZXJ9IFRoZSB4LXBvc2l0aW9uXG4gKiBAcGFyYW0geSB7TnVtYmVyfSBUaGUgeS1wb3NpdGlvblxuICogQHJldHVybnMge051bWJlcn0gVGhlIGdyYXlzY2FsZSB2YWx1ZSBhdCB0aGUgcGl4ZWwtcG9zaXRpb25cbiAqL1xuU3ViSW1hZ2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhWyh0aGlzLmZyb20ueSArIHkpICogdGhpcy5vcmlnaW5hbFNpemUueCArIHRoaXMuZnJvbS54ICsgeF07XG59O1xuXG4vKipcbiAqIFVwZGF0ZXMgdGhlIHVuZGVybHlpbmcgZGF0YSBmcm9tIGEgZ2l2ZW4ge0ltYWdlV3JhcHBlcn1cbiAqIEBwYXJhbSBpbWFnZSB7SW1hZ2VXcmFwcGVyfSBUaGUgdXBkYXRlZCBpbWFnZVxuICovXG5TdWJJbWFnZS5wcm90b3R5cGUudXBkYXRlRGF0YSA9IGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgdGhpcy5vcmlnaW5hbFNpemUgPSBpbWFnZS5zaXplO1xuICAgIHRoaXMuZGF0YSA9IGltYWdlLmRhdGE7XG59O1xuXG4vKipcbiAqIFVwZGF0ZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBzaGFyZWQgYXJlYVxuICogQHBhcmFtIGZyb20ge3gseX0gVGhlIG5ldyBsb2NhdGlvblxuICogQHJldHVybnMge1N1YkltYWdlfSByZXR1cm5zIHt0aGlzfSBmb3IgcG9zc2libGUgY2hhaW5pbmdcbiAqL1xuU3ViSW1hZ2UucHJvdG90eXBlLnVwZGF0ZUZyb20gPSBmdW5jdGlvbihmcm9tKSB7XG4gICAgdGhpcy5mcm9tID0gZnJvbTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IChTdWJJbWFnZSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uL3N1YkltYWdlLmpzIiwiLypcbiAqIHR5cGVkZWZzLmpzXG4gKiBOb3JtYWxpemVzIGJyb3dzZXItc3BlY2lmaWMgcHJlZml4ZXNcbiAqL1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoLyogZnVuY3Rpb24gRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgKi8gY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgICAgIH07XG4gICAgfSkoKTtcbn1cbk1hdGguaW11bCA9IE1hdGguaW11bCB8fCBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIGFoID0gKGEgPj4+IDE2KSAmIDB4ZmZmZixcbiAgICAgICAgYWwgPSBhICYgMHhmZmZmLFxuICAgICAgICBiaCA9IChiID4+PiAxNikgJiAweGZmZmYsXG4gICAgICAgIGJsID0gYiAmIDB4ZmZmZjtcbiAgICAvLyB0aGUgc2hpZnQgYnkgMCBmaXhlcyB0aGUgc2lnbiBvbiB0aGUgaGlnaCBwYXJ0XG4gICAgLy8gdGhlIGZpbmFsIHwwIGNvbnZlcnRzIHRoZSB1bnNpZ25lZCB2YWx1ZSBpbnRvIGEgc2lnbmVkIHZhbHVlXG4gICAgcmV0dXJuICgoYWwgKiBibCkgKyAoKChhaCAqIGJsICsgYWwgKiBiaCkgPDwgMTYpID4+PiAwKSB8IDApO1xufTtcblxuaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgT2JqZWN0LmFzc2lnbiA9IGZ1bmN0aW9uKHRhcmdldCkgeyAvLyAubGVuZ3RoIG9mIGZ1bmN0aW9uIGlzIDJcbiAgICAgICAgJ3VzZSBzdHJpY3QnO1xuICAgICAgICBpZiAodGFyZ2V0ID09PSBudWxsKSB7IC8vIFR5cGVFcnJvciBpZiB1bmRlZmluZWQgb3IgbnVsbFxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcblxuICAgICAgICBmb3IgKHZhciBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuXG4gICAgICAgICAgICBpZiAobmV4dFNvdXJjZSAhPT0gbnVsbCkgeyAvLyBTa2lwIG92ZXIgaWYgdW5kZWZpbmVkIG9yIG51bGxcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuZXh0S2V5IGluIG5leHRTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXZvaWQgYnVncyB3aGVuIGhhc093blByb3BlcnR5IGlzIHNoYWRvd2VkXG4gICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV4dFNvdXJjZSwgbmV4dEtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG87XG4gICAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24vdHlwZWRlZnMuanMiLCJsZXQgY29uZmlnO1xuXG5pZiAoRU5WLmRldmVsb3BtZW50KXtcbiAgICBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZy5kZXYuanMnKTtcbn0gZWxzZSBpZiAoRU5WLm5vZGUpIHtcbiAgICBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZy5ub2RlLmpzJyk7XG59IGVsc2Uge1xuICAgIGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnLnByb2QuanMnKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbmZpZy9jb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbnB1dFN0cmVhbToge1xuICAgICAgICB0eXBlOiBcIkltYWdlU3RyZWFtXCIsXG4gICAgICAgIHNlcXVlbmNlOiBmYWxzZSxcbiAgICAgICAgc2l6ZTogODAwLFxuICAgICAgICBhcmVhOiB7XG4gICAgICAgICAgICB0b3A6IFwiMCVcIixcbiAgICAgICAgICAgIHJpZ2h0OiBcIjAlXCIsXG4gICAgICAgICAgICBsZWZ0OiBcIjAlXCIsXG4gICAgICAgICAgICBib3R0b206IFwiMCVcIlxuICAgICAgICB9LFxuICAgICAgICBzaW5nbGVDaGFubmVsOiBmYWxzZSAvLyB0cnVlOiBvbmx5IHRoZSByZWQgY29sb3ItY2hhbm5lbCBpcyByZWFkXG4gICAgfSxcbiAgICBsb2NhdGU6IHRydWUsXG4gICAgbnVtT2ZXb3JrZXJzOiAwLFxuICAgIGRlY29kZXI6IHtcbiAgICAgICAgcmVhZGVyczogW1xuICAgICAgICAgICAgJ2NvZGVfMTI4X3JlYWRlcidcbiAgICAgICAgXVxuICAgIH0sXG4gICAgbG9jYXRvcjoge1xuICAgICAgICBoYWxmU2FtcGxlOiB0cnVlLFxuICAgICAgICBwYXRjaFNpemU6IFwibWVkaXVtXCIgLy8geC1zbWFsbCwgc21hbGwsIG1lZGl1bSwgbGFyZ2UsIHgtbGFyZ2VcbiAgICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbmZpZy9jb25maWcubm9kZS5qcyIsImltcG9ydCBCcmVzZW5oYW0gZnJvbSAnLi9icmVzZW5oYW0nO1xuaW1wb3J0IEltYWdlRGVidWcgZnJvbSAnLi4vY29tbW9uL2ltYWdlX2RlYnVnJztcbmltcG9ydCBDb2RlMTI4UmVhZGVyIGZyb20gJy4uL3JlYWRlci9jb2RlXzEyOF9yZWFkZXInO1xuaW1wb3J0IEVBTlJlYWRlciBmcm9tICcuLi9yZWFkZXIvZWFuX3JlYWRlcic7XG5pbXBvcnQgQ29kZTM5UmVhZGVyIGZyb20gJy4uL3JlYWRlci9jb2RlXzM5X3JlYWRlcic7XG5pbXBvcnQgQ29kZTM5VklOUmVhZGVyIGZyb20gJy4uL3JlYWRlci9jb2RlXzM5X3Zpbl9yZWFkZXInO1xuaW1wb3J0IENvZGFiYXJSZWFkZXIgZnJvbSAnLi4vcmVhZGVyL2NvZGFiYXJfcmVhZGVyJztcbmltcG9ydCBVUENSZWFkZXIgZnJvbSAnLi4vcmVhZGVyL3VwY19yZWFkZXInO1xuaW1wb3J0IEVBTjhSZWFkZXIgZnJvbSAnLi4vcmVhZGVyL2Vhbl84X3JlYWRlcic7XG5pbXBvcnQgRUFOMlJlYWRlciBmcm9tICcuLi9yZWFkZXIvZWFuXzJfcmVhZGVyJztcbmltcG9ydCBFQU41UmVhZGVyIGZyb20gJy4uL3JlYWRlci9lYW5fNV9yZWFkZXInO1xuaW1wb3J0IFVQQ0VSZWFkZXIgZnJvbSAnLi4vcmVhZGVyL3VwY19lX3JlYWRlcic7XG5pbXBvcnQgSTJvZjVSZWFkZXIgZnJvbSAnLi4vcmVhZGVyL2kyb2Y1X3JlYWRlcic7XG5cbmNvbnN0IFJFQURFUlMgPSB7XG4gICAgY29kZV8xMjhfcmVhZGVyOiBDb2RlMTI4UmVhZGVyLFxuICAgIGVhbl9yZWFkZXI6IEVBTlJlYWRlcixcbiAgICBlYW5fNV9yZWFkZXI6IEVBTjVSZWFkZXIsXG4gICAgZWFuXzJfcmVhZGVyOiBFQU4yUmVhZGVyLFxuICAgIGVhbl84X3JlYWRlcjogRUFOOFJlYWRlcixcbiAgICBjb2RlXzM5X3JlYWRlcjogQ29kZTM5UmVhZGVyLFxuICAgIGNvZGVfMzlfdmluX3JlYWRlcjogQ29kZTM5VklOUmVhZGVyLFxuICAgIGNvZGFiYXJfcmVhZGVyOiBDb2RhYmFyUmVhZGVyLFxuICAgIHVwY19yZWFkZXI6IFVQQ1JlYWRlcixcbiAgICB1cGNfZV9yZWFkZXI6IFVQQ0VSZWFkZXIsXG4gICAgaTJvZjVfcmVhZGVyOiBJMm9mNVJlYWRlclxufTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGNvbmZpZywgaW5wdXRJbWFnZVdyYXBwZXIpIHtcbiAgICAgICAgdmFyIF9jYW52YXMgPSB7XG4gICAgICAgICAgICAgICAgY3R4OiB7XG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheTogbnVsbFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZG9tOiB7XG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheTogbnVsbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfYmFyY29kZVJlYWRlcnMgPSBbXTtcblxuICAgICAgICBpbml0Q2FudmFzKCk7XG4gICAgICAgIGluaXRSZWFkZXJzKCk7XG4gICAgICAgIGluaXRDb25maWcoKTtcblxuICAgICAgICBmdW5jdGlvbiBpbml0Q2FudmFzKCkge1xuICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdmFyICRkZWJ1ZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVidWcuZGV0ZWN0aW9uXCIpO1xuICAgICAgICAgICAgICAgIF9jYW52YXMuZG9tLmZyZXF1ZW5jeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjYW52YXMuZnJlcXVlbmN5XCIpO1xuICAgICAgICAgICAgICAgIGlmICghX2NhbnZhcy5kb20uZnJlcXVlbmN5KSB7XG4gICAgICAgICAgICAgICAgICAgIF9jYW52YXMuZG9tLmZyZXF1ZW5jeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgICAgICAgICAgICAgIF9jYW52YXMuZG9tLmZyZXF1ZW5jeS5jbGFzc05hbWUgPSBcImZyZXF1ZW5jeVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAoJGRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZGVidWcuYXBwZW5kQ2hpbGQoX2NhbnZhcy5kb20uZnJlcXVlbmN5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfY2FudmFzLmN0eC5mcmVxdWVuY3kgPSBfY2FudmFzLmRvbS5mcmVxdWVuY3kuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICAgICAgICAgICAgX2NhbnZhcy5kb20ucGF0dGVybiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjYW52YXMucGF0dGVybkJ1ZmZlclwiKTtcbiAgICAgICAgICAgICAgICBpZiAoIV9jYW52YXMuZG9tLnBhdHRlcm4pIHtcbiAgICAgICAgICAgICAgICAgICAgX2NhbnZhcy5kb20ucGF0dGVybiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgICAgICAgICAgICAgIF9jYW52YXMuZG9tLnBhdHRlcm4uY2xhc3NOYW1lID0gXCJwYXR0ZXJuQnVmZmVyXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRkZWJ1Zy5hcHBlbmRDaGlsZChfY2FudmFzLmRvbS5wYXR0ZXJuKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfY2FudmFzLmN0eC5wYXR0ZXJuID0gX2NhbnZhcy5kb20ucGF0dGVybi5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5vdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhcy5kcmF3aW5nQnVmZmVyXCIpO1xuICAgICAgICAgICAgICAgIGlmIChfY2FudmFzLmRvbS5vdmVybGF5KSB7XG4gICAgICAgICAgICAgICAgICAgIF9jYW52YXMuY3R4Lm92ZXJsYXkgPSBfY2FudmFzLmRvbS5vdmVybGF5LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpbml0UmVhZGVycygpIHtcbiAgICAgICAgICAgIGNvbmZpZy5yZWFkZXJzLmZvckVhY2goZnVuY3Rpb24ocmVhZGVyQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlYWRlcixcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbiA9IHt9LFxuICAgICAgICAgICAgICAgICAgICBzdXBwbGVtZW50cyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZWFkZXJDb25maWcgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlciA9IHJlYWRlckNvbmZpZy5mb3JtYXQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24gPSByZWFkZXJDb25maWcuY29uZmlnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlYWRlckNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyID0gcmVhZGVyQ29uZmlnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmVmb3JlIHJlZ2lzdGVyaW5nIHJlYWRlcjogXCIsIHJlYWRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjb25maWd1cmF0aW9uLnN1cHBsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1cHBsZW1lbnRzID0gY29uZmlndXJhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1cHBsZW1lbnRzLm1hcCgoc3VwcGxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUkVBREVSU1tzdXBwbGVtZW50XSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9iYXJjb2RlUmVhZGVycy5wdXNoKG5ldyBSRUFERVJTW3JlYWRlcl0oY29uZmlndXJhdGlvbiwgc3VwcGxlbWVudHMpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXJlZCBSZWFkZXJzOiBcIiArIF9iYXJjb2RlUmVhZGVyc1xuICAgICAgICAgICAgICAgICAgICAubWFwKChyZWFkZXIpID0+IEpTT04uc3RyaW5naWZ5KHtmb3JtYXQ6IHJlYWRlci5GT1JNQVQsIGNvbmZpZzogcmVhZGVyLmNvbmZpZ30pKVxuICAgICAgICAgICAgICAgICAgICAuam9pbignLCAnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpbml0Q29uZmlnKCkge1xuICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGksXG4gICAgICAgICAgICAgICAgICAgIHZpcyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlOiBfY2FudmFzLmRvbS5mcmVxdWVuY3ksXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBjb25maWcuZGVidWcuc2hvd0ZyZXF1ZW5jeVxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlOiBfY2FudmFzLmRvbS5wYXR0ZXJuLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogY29uZmlnLmRlYnVnLnNob3dQYXR0ZXJuXG4gICAgICAgICAgICAgICAgICAgIH1dO1xuXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHZpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmlzW2ldLnByb3AgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc1tpXS5ub2RlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNbaV0ubm9kZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogZXh0ZW5kIHRoZSBsaW5lIG9uIGJvdGggZW5kc1xuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBsaW5lXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZ2V0RXh0ZW5kZWRMaW5lKGxpbmUsIGFuZ2xlLCBleHQpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGV4dGVuZExpbmUoYW1vdW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGV4dGVuc2lvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgeTogYW1vdW50ICogTWF0aC5zaW4oYW5nbGUpLFxuICAgICAgICAgICAgICAgICAgICB4OiBhbW91bnQgKiBNYXRoLmNvcyhhbmdsZSlcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgbGluZVswXS55IC09IGV4dGVuc2lvbi55O1xuICAgICAgICAgICAgICAgIGxpbmVbMF0ueCAtPSBleHRlbnNpb24ueDtcbiAgICAgICAgICAgICAgICBsaW5lWzFdLnkgKz0gZXh0ZW5zaW9uLnk7XG4gICAgICAgICAgICAgICAgbGluZVsxXS54ICs9IGV4dGVuc2lvbi54O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjaGVjayBpZiBpbnNpZGUgaW1hZ2VcbiAgICAgICAgICAgIGV4dGVuZExpbmUoZXh0KTtcbiAgICAgICAgICAgIHdoaWxlIChleHQgPiAxICYmICghaW5wdXRJbWFnZVdyYXBwZXIuaW5JbWFnZVdpdGhCb3JkZXIobGluZVswXSwgMClcbiAgICAgICAgICAgICAgICAgICAgfHwgIWlucHV0SW1hZ2VXcmFwcGVyLmluSW1hZ2VXaXRoQm9yZGVyKGxpbmVbMV0sIDApKSkge1xuICAgICAgICAgICAgICAgIGV4dCAtPSBNYXRoLmNlaWwoZXh0IC8gMik7XG4gICAgICAgICAgICAgICAgZXh0ZW5kTGluZSgtZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsaW5lO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0TGluZShib3gpIHtcbiAgICAgICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAgICAgIHg6IChib3hbMV1bMF0gLSBib3hbMF1bMF0pIC8gMiArIGJveFswXVswXSxcbiAgICAgICAgICAgICAgICB5OiAoYm94WzFdWzFdIC0gYm94WzBdWzFdKSAvIDIgKyBib3hbMF1bMV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB4OiAoYm94WzNdWzBdIC0gYm94WzJdWzBdKSAvIDIgKyBib3hbMl1bMF0sXG4gICAgICAgICAgICAgICAgeTogKGJveFszXVsxXSAtIGJveFsyXVsxXSkgLyAyICsgYm94WzJdWzFdXG4gICAgICAgICAgICB9XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHRyeURlY29kZShsaW5lKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gbnVsbCxcbiAgICAgICAgICAgICAgICBpLFxuICAgICAgICAgICAgICAgIGJhcmNvZGVMaW5lID0gQnJlc2VuaGFtLmdldEJhcmNvZGVMaW5lKGlucHV0SW1hZ2VXcmFwcGVyLCBsaW5lWzBdLCBsaW5lWzFdKTtcblxuICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiBjb25maWcuZGVidWcuc2hvd0ZyZXF1ZW5jeSkge1xuICAgICAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgobGluZSwge3g6ICd4JywgeTogJ3knfSwgX2NhbnZhcy5jdHgub3ZlcmxheSwge2NvbG9yOiAncmVkJywgbGluZVdpZHRoOiAzfSk7XG4gICAgICAgICAgICAgICAgQnJlc2VuaGFtLmRlYnVnLnByaW50RnJlcXVlbmN5KGJhcmNvZGVMaW5lLmxpbmUsIF9jYW52YXMuZG9tLmZyZXF1ZW5jeSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIEJyZXNlbmhhbS50b0JpbmFyeUxpbmUoYmFyY29kZUxpbmUpO1xuXG4gICAgICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIGNvbmZpZy5kZWJ1Zy5zaG93UGF0dGVybikge1xuICAgICAgICAgICAgICAgIEJyZXNlbmhhbS5kZWJ1Zy5wcmludFBhdHRlcm4oYmFyY29kZUxpbmUubGluZSwgX2NhbnZhcy5kb20ucGF0dGVybik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgX2JhcmNvZGVSZWFkZXJzLmxlbmd0aCAmJiByZXN1bHQgPT09IG51bGw7IGkrKykge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9iYXJjb2RlUmVhZGVyc1tpXS5kZWNvZGVQYXR0ZXJuKGJhcmNvZGVMaW5lLmxpbmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNvZGVSZXN1bHQ6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICBiYXJjb2RlTGluZTogYmFyY29kZUxpbmVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBtZXRob2Qgc2xpY2VzIHRoZSBnaXZlbiBhcmVhIGFwYXJ0IGFuZCB0cmllcyB0byBkZXRlY3QgYSBiYXJjb2RlLXBhdHRlcm5cbiAgICAgICAgICogZm9yIGVhY2ggc2xpY2UuIEl0IHJldHVybnMgdGhlIGRlY29kZWQgYmFyY29kZSwgb3IgbnVsbCBpZiBub3RoaW5nIHdhcyBmb3VuZFxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBib3hcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gbGluZVxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gbGluZUFuZ2xlXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiB0cnlEZWNvZGVCcnV0ZUZvcmNlKGJveCwgbGluZSwgbGluZUFuZ2xlKSB7XG4gICAgICAgICAgICB2YXIgc2lkZUxlbmd0aCA9IE1hdGguc3FydChNYXRoLnBvdyhib3hbMV1bMF0gLSBib3hbMF1bMF0sIDIpICsgTWF0aC5wb3coKGJveFsxXVsxXSAtIGJveFswXVsxXSksIDIpKSxcbiAgICAgICAgICAgICAgICBpLFxuICAgICAgICAgICAgICAgIHNsaWNlcyA9IDE2LFxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG51bGwsXG4gICAgICAgICAgICAgICAgZGlyLFxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbixcbiAgICAgICAgICAgICAgICB4ZGlyID0gTWF0aC5zaW4obGluZUFuZ2xlKSxcbiAgICAgICAgICAgICAgICB5ZGlyID0gTWF0aC5jb3MobGluZUFuZ2xlKTtcblxuICAgICAgICAgICAgZm9yICggaSA9IDE7IGkgPCBzbGljZXMgJiYgcmVzdWx0ID09PSBudWxsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvLyBtb3ZlIGxpbmUgcGVycGVuZGljdWxhciB0byBhbmdsZVxuICAgICAgICAgICAgICAgIGRpciA9IHNpZGVMZW5ndGggLyBzbGljZXMgKiBpICogKGkgJSAyID09PSAwID8gLTEgOiAxKTtcbiAgICAgICAgICAgICAgICBleHRlbnNpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIHk6IGRpciAqIHhkaXIsXG4gICAgICAgICAgICAgICAgICAgIHg6IGRpciAqIHlkaXJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGxpbmVbMF0ueSArPSBleHRlbnNpb24ueDtcbiAgICAgICAgICAgICAgICBsaW5lWzBdLnggLT0gZXh0ZW5zaW9uLnk7XG4gICAgICAgICAgICAgICAgbGluZVsxXS55ICs9IGV4dGVuc2lvbi54O1xuICAgICAgICAgICAgICAgIGxpbmVbMV0ueCAtPSBleHRlbnNpb24ueTtcblxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRyeURlY29kZShsaW5lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRMaW5lTGVuZ3RoKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQoXG4gICAgICAgICAgICAgICAgTWF0aC5wb3coTWF0aC5hYnMobGluZVsxXS55IC0gbGluZVswXS55KSwgMikgK1xuICAgICAgICAgICAgICAgIE1hdGgucG93KE1hdGguYWJzKGxpbmVbMV0ueCAtIGxpbmVbMF0ueCksIDIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaXRoIHRoZSBoZWxwIG9mIHRoZSBjb25maWd1cmVkIHJlYWRlcnMgKENvZGUxMjggb3IgRUFOKSB0aGlzIGZ1bmN0aW9uIHRyaWVzIHRvIGRldGVjdCBhXG4gICAgICAgICAqIHZhbGlkIGJhcmNvZGUgcGF0dGVybiB3aXRoaW4gdGhlIGdpdmVuIGFyZWEuXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBib3ggVGhlIGFyZWEgdG8gc2VhcmNoIGluXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSByZXN1bHQge2NvZGVSZXN1bHQsIGxpbmUsIGFuZ2xlLCBwYXR0ZXJuLCB0aHJlc2hvbGR9XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBkZWNvZGVGcm9tQm91bmRpbmdCb3goYm94KSB7XG4gICAgICAgICAgICB2YXIgbGluZSxcbiAgICAgICAgICAgICAgICBsaW5lQW5nbGUsXG4gICAgICAgICAgICAgICAgY3R4ID0gX2NhbnZhcy5jdHgub3ZlcmxheSxcbiAgICAgICAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgICAgICAgbGluZUxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCkge1xuICAgICAgICAgICAgICAgIGlmIChjb25maWcuZGVidWcuZHJhd0JvdW5kaW5nQm94ICYmIGN0eCkge1xuICAgICAgICAgICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdQYXRoKGJveCwge3g6IDAsIHk6IDF9LCBjdHgsIHtjb2xvcjogXCJibHVlXCIsIGxpbmVXaWR0aDogMn0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGluZSA9IGdldExpbmUoYm94KTtcbiAgICAgICAgICAgIGxpbmVMZW5ndGggPSBnZXRMaW5lTGVuZ3RoKGxpbmUpO1xuICAgICAgICAgICAgbGluZUFuZ2xlID0gTWF0aC5hdGFuMihsaW5lWzFdLnkgLSBsaW5lWzBdLnksIGxpbmVbMV0ueCAtIGxpbmVbMF0ueCk7XG4gICAgICAgICAgICBsaW5lID0gZ2V0RXh0ZW5kZWRMaW5lKGxpbmUsIGxpbmVBbmdsZSwgTWF0aC5mbG9vcihsaW5lTGVuZ3RoICogMC4xKSk7XG4gICAgICAgICAgICBpZiAobGluZSA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdCA9IHRyeURlY29kZShsaW5lKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnlEZWNvZGVCcnV0ZUZvcmNlKGJveCwgbGluZSwgbGluZUFuZ2xlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIHJlc3VsdCAmJiBjb25maWcuZGVidWcuZHJhd1NjYW5saW5lICYmIGN0eCkge1xuICAgICAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgobGluZSwge3g6ICd4JywgeTogJ3knfSwgY3R4LCB7Y29sb3I6ICdyZWQnLCBsaW5lV2lkdGg6IDN9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjb2RlUmVzdWx0OiByZXN1bHQuY29kZVJlc3VsdCxcbiAgICAgICAgICAgICAgICBsaW5lOiBsaW5lLFxuICAgICAgICAgICAgICAgIGFuZ2xlOiBsaW5lQW5nbGUsXG4gICAgICAgICAgICAgICAgcGF0dGVybjogcmVzdWx0LmJhcmNvZGVMaW5lLmxpbmUsXG4gICAgICAgICAgICAgICAgdGhyZXNob2xkOiByZXN1bHQuYmFyY29kZUxpbmUudGhyZXNob2xkXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRlY29kZUZyb21Cb3VuZGluZ0JveDogZnVuY3Rpb24oYm94KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZUZyb21Cb3VuZGluZ0JveChib3gpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlY29kZUZyb21Cb3VuZGluZ0JveGVzOiBmdW5jdGlvbihib3hlcykge1xuICAgICAgICAgICAgICAgIHZhciBpLCByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIGJhcmNvZGVzID0gW10sXG4gICAgICAgICAgICAgICAgICAgIG11bHRpcGxlID0gY29uZmlnLm11bHRpcGxlO1xuXG4gICAgICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCBib3hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBib3ggPSBib3hlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZGVjb2RlRnJvbUJvdW5kaW5nQm94KGJveCkgfHwge307XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ib3ggPSBib3g7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYXJjb2Rlcy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LmNvZGVSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhcmNvZGVzXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFJlYWRlcnM6IGZ1bmN0aW9uKHJlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICBjb25maWcucmVhZGVycyA9IHJlYWRlcnM7XG4gICAgICAgICAgICAgICAgX2JhcmNvZGVSZWFkZXJzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgaW5pdFJlYWRlcnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RlY29kZXIvYmFyY29kZV9kZWNvZGVyLmpzIiwiaW1wb3J0IEltYWdlV3JhcHBlciBmcm9tICcuLi9jb21tb24vaW1hZ2Vfd3JhcHBlcic7XG5cbnZhciBCcmVzZW5oYW0gPSB7fTtcblxudmFyIFNsb3BlID0ge1xuICAgIERJUjoge1xuICAgICAgICBVUDogMSxcbiAgICAgICAgRE9XTjogLTFcbiAgICB9XG59O1xuLyoqXG4gKiBTY2FucyBhIGxpbmUgb2YgdGhlIGdpdmVuIGltYWdlIGZyb20gcG9pbnQgcDEgdG8gcDIgYW5kIHJldHVybnMgYSByZXN1bHQgb2JqZWN0IGNvbnRhaW5pbmdcbiAqIGdyYXktc2NhbGUgdmFsdWVzICgwLTI1NSkgb2YgdGhlIHVuZGVybHlpbmcgcGl4ZWxzIGluIGFkZGl0aW9uIHRvIHRoZSBtaW5cbiAqIGFuZCBtYXggdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IGltYWdlV3JhcHBlclxuICogQHBhcmFtIHtPYmplY3R9IHAxIFRoZSBzdGFydCBwb2ludCB7eCx5fVxuICogQHBhcmFtIHtPYmplY3R9IHAyIFRoZSBlbmQgcG9pbnQge3gseX1cbiAqIEByZXR1cm5zIHtsaW5lLCBtaW4sIG1heH1cbiAqL1xuQnJlc2VuaGFtLmdldEJhcmNvZGVMaW5lID0gZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCBwMSwgcDIpIHtcbiAgICB2YXIgeDAgPSBwMS54IHwgMCxcbiAgICAgICAgeTAgPSBwMS55IHwgMCxcbiAgICAgICAgeDEgPSBwMi54IHwgMCxcbiAgICAgICAgeTEgPSBwMi55IHwgMCxcbiAgICAgICAgc3RlZXAgPSBNYXRoLmFicyh5MSAtIHkwKSA+IE1hdGguYWJzKHgxIC0geDApLFxuICAgICAgICBkZWx0YXgsXG4gICAgICAgIGRlbHRheSxcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIHlzdGVwLFxuICAgICAgICB5LFxuICAgICAgICB0bXAsXG4gICAgICAgIHgsXG4gICAgICAgIGxpbmUgPSBbXSxcbiAgICAgICAgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGEsXG4gICAgICAgIHdpZHRoID0gaW1hZ2VXcmFwcGVyLnNpemUueCxcbiAgICAgICAgc3VtID0gMCxcbiAgICAgICAgdmFsLFxuICAgICAgICBtaW4gPSAyNTUsXG4gICAgICAgIG1heCA9IDA7XG5cbiAgICBmdW5jdGlvbiByZWFkKGEsIGIpIHtcbiAgICAgICAgdmFsID0gaW1hZ2VEYXRhW2IgKiB3aWR0aCArIGFdO1xuICAgICAgICBzdW0gKz0gdmFsO1xuICAgICAgICBtaW4gPSB2YWwgPCBtaW4gPyB2YWwgOiBtaW47XG4gICAgICAgIG1heCA9IHZhbCA+IG1heCA/IHZhbCA6IG1heDtcbiAgICAgICAgbGluZS5wdXNoKHZhbCk7XG4gICAgfVxuXG4gICAgaWYgKHN0ZWVwKSB7XG4gICAgICAgIHRtcCA9IHgwO1xuICAgICAgICB4MCA9IHkwO1xuICAgICAgICB5MCA9IHRtcDtcblxuICAgICAgICB0bXAgPSB4MTtcbiAgICAgICAgeDEgPSB5MTtcbiAgICAgICAgeTEgPSB0bXA7XG4gICAgfVxuICAgIGlmICh4MCA+IHgxKSB7XG4gICAgICAgIHRtcCA9IHgwO1xuICAgICAgICB4MCA9IHgxO1xuICAgICAgICB4MSA9IHRtcDtcblxuICAgICAgICB0bXAgPSB5MDtcbiAgICAgICAgeTAgPSB5MTtcbiAgICAgICAgeTEgPSB0bXA7XG4gICAgfVxuICAgIGRlbHRheCA9IHgxIC0geDA7XG4gICAgZGVsdGF5ID0gTWF0aC5hYnMoeTEgLSB5MCk7XG4gICAgZXJyb3IgPSAoZGVsdGF4IC8gMikgfCAwO1xuICAgIHkgPSB5MDtcbiAgICB5c3RlcCA9IHkwIDwgeTEgPyAxIDogLTE7XG4gICAgZm9yICggeCA9IHgwOyB4IDwgeDE7IHgrKykge1xuICAgICAgICBpZiAoc3RlZXApe1xuICAgICAgICAgICAgcmVhZCh5LCB4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlYWQoeCwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgZXJyb3IgPSBlcnJvciAtIGRlbHRheTtcbiAgICAgICAgaWYgKGVycm9yIDwgMCkge1xuICAgICAgICAgICAgeSA9IHkgKyB5c3RlcDtcbiAgICAgICAgICAgIGVycm9yID0gZXJyb3IgKyBkZWx0YXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBsaW5lOiBsaW5lLFxuICAgICAgICBtaW46IG1pbixcbiAgICAgICAgbWF4OiBtYXhcbiAgICB9O1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgcmVzdWx0IGZyb20gZ2V0QmFyY29kZUxpbmUgaW50byBhIGJpbmFyeSByZXByZXNlbnRhdGlvblxuICogYWxzbyBjb25zaWRlcmluZyB0aGUgZnJlcXVlbmN5IGFuZCBzbG9wZSBvZiB0aGUgc2lnbmFsIGZvciBtb3JlIHJvYnVzdCByZXN1bHRzXG4gKiBAcGFyYW0ge09iamVjdH0gcmVzdWx0IHtsaW5lLCBtaW4sIG1heH1cbiAqL1xuQnJlc2VuaGFtLnRvQmluYXJ5TGluZSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgIHZhciBtaW4gPSByZXN1bHQubWluLFxuICAgICAgICBtYXggPSByZXN1bHQubWF4LFxuICAgICAgICBsaW5lID0gcmVzdWx0LmxpbmUsXG4gICAgICAgIHNsb3BlLFxuICAgICAgICBzbG9wZTIsXG4gICAgICAgIGNlbnRlciA9IG1pbiArIChtYXggLSBtaW4pIC8gMixcbiAgICAgICAgZXh0cmVtYSA9IFtdLFxuICAgICAgICBjdXJyZW50RGlyLFxuICAgICAgICBkaXIsXG4gICAgICAgIHRocmVzaG9sZCA9IChtYXggLSBtaW4pIC8gMTIsXG4gICAgICAgIHJUaHJlc2hvbGQgPSAtdGhyZXNob2xkLFxuICAgICAgICBpLFxuICAgICAgICBqO1xuXG4gICAgLy8gMS4gZmluZCBleHRyZW1hXG4gICAgY3VycmVudERpciA9IGxpbmVbMF0gPiBjZW50ZXIgPyBTbG9wZS5ESVIuVVAgOiBTbG9wZS5ESVIuRE9XTjtcbiAgICBleHRyZW1hLnB1c2goe1xuICAgICAgICBwb3M6IDAsXG4gICAgICAgIHZhbDogbGluZVswXVxuICAgIH0pO1xuICAgIGZvciAoIGkgPSAwOyBpIDwgbGluZS5sZW5ndGggLSAyOyBpKyspIHtcbiAgICAgICAgc2xvcGUgPSAobGluZVtpICsgMV0gLSBsaW5lW2ldKTtcbiAgICAgICAgc2xvcGUyID0gKGxpbmVbaSArIDJdIC0gbGluZVtpICsgMV0pO1xuICAgICAgICBpZiAoKHNsb3BlICsgc2xvcGUyKSA8IHJUaHJlc2hvbGQgJiYgbGluZVtpICsgMV0gPCAoY2VudGVyICogMS41KSkge1xuICAgICAgICAgICAgZGlyID0gU2xvcGUuRElSLkRPV047XG4gICAgICAgIH0gZWxzZSBpZiAoKHNsb3BlICsgc2xvcGUyKSA+IHRocmVzaG9sZCAmJiBsaW5lW2kgKyAxXSA+IChjZW50ZXIgKiAwLjUpKSB7XG4gICAgICAgICAgICBkaXIgPSBTbG9wZS5ESVIuVVA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaXIgPSBjdXJyZW50RGlyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnJlbnREaXIgIT09IGRpcikge1xuICAgICAgICAgICAgZXh0cmVtYS5wdXNoKHtcbiAgICAgICAgICAgICAgICBwb3M6IGksXG4gICAgICAgICAgICAgICAgdmFsOiBsaW5lW2ldXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGN1cnJlbnREaXIgPSBkaXI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZXh0cmVtYS5wdXNoKHtcbiAgICAgICAgcG9zOiBsaW5lLmxlbmd0aCxcbiAgICAgICAgdmFsOiBsaW5lW2xpbmUubGVuZ3RoIC0gMV1cbiAgICB9KTtcblxuICAgIGZvciAoIGogPSBleHRyZW1hWzBdLnBvczsgaiA8IGV4dHJlbWFbMV0ucG9zOyBqKyspIHtcbiAgICAgICAgbGluZVtqXSA9IGxpbmVbal0gPiBjZW50ZXIgPyAwIDogMTtcbiAgICB9XG5cbiAgICAvLyBpdGVyYXRlIG92ZXIgZXh0cmVtYSBhbmQgY29udmVydCB0byBiaW5hcnkgYmFzZWQgb24gYXZnIGJldHdlZW4gbWlubWF4XG4gICAgZm9yICggaSA9IDE7IGkgPCBleHRyZW1hLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBpZiAoZXh0cmVtYVtpICsgMV0udmFsID4gZXh0cmVtYVtpXS52YWwpIHtcbiAgICAgICAgICAgIHRocmVzaG9sZCA9IChleHRyZW1hW2ldLnZhbCArICgoZXh0cmVtYVtpICsgMV0udmFsIC0gZXh0cmVtYVtpXS52YWwpIC8gMykgKiAyKSB8IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJlc2hvbGQgPSAoZXh0cmVtYVtpICsgMV0udmFsICsgKChleHRyZW1hW2ldLnZhbCAtIGV4dHJlbWFbaSArIDFdLnZhbCkgLyAzKSkgfCAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICggaiA9IGV4dHJlbWFbaV0ucG9zOyBqIDwgZXh0cmVtYVtpICsgMV0ucG9zOyBqKyspIHtcbiAgICAgICAgICAgIGxpbmVbal0gPSBsaW5lW2pdID4gdGhyZXNob2xkID8gMCA6IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBsaW5lOiBsaW5lLFxuICAgICAgICB0aHJlc2hvbGQ6IHRocmVzaG9sZFxuICAgIH07XG59O1xuXG4vKipcbiAqIFVzZWQgZm9yIGRldmVsb3BtZW50IG9ubHlcbiAqL1xuQnJlc2VuaGFtLmRlYnVnID0ge1xuICAgIHByaW50RnJlcXVlbmN5OiBmdW5jdGlvbihsaW5lLCBjYW52YXMpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICBjYW52YXMud2lkdGggPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IDI1NjtcblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmx1ZVwiO1xuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8oaSwgMjU1KTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oaSwgMjU1IC0gbGluZVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfSxcblxuICAgIHByaW50UGF0dGVybjogZnVuY3Rpb24obGluZSwgY2FudmFzKSB7XG4gICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLCBpO1xuXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGxpbmUubGVuZ3RoO1xuICAgICAgICBjdHguZmlsbENvbG9yID0gXCJibGFja1wiO1xuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChsaW5lW2ldID09PSAxKSB7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KGksIDAsIDEsIDEwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBCcmVzZW5oYW07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGVjb2Rlci9icmVzZW5oYW0uanMiLCJpbXBvcnQge29taXQsIHBpY2t9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQge2dldFVzZXJNZWRpYSwgZW51bWVyYXRlRGV2aWNlc30gZnJvbSAnbWVkaWFEZXZpY2VzJztcblxuY29uc3QgZmFjaW5nTWF0Y2hpbmcgPSB7XG4gICAgXCJ1c2VyXCI6IC9mcm9udC9pLFxuICAgIFwiZW52aXJvbm1lbnRcIjogL2JhY2svaVxufTtcblxudmFyIHN0cmVhbVJlZjtcblxuZnVuY3Rpb24gd2FpdEZvclZpZGVvKHZpZGVvKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgbGV0IGF0dGVtcHRzID0gMTA7XG5cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tWaWRlbygpIHtcbiAgICAgICAgICAgIGlmIChhdHRlbXB0cyA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAodmlkZW8udmlkZW9XaWR0aCA+IDAgJiYgdmlkZW8udmlkZW9IZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHZpZGVvLnZpZGVvV2lkdGggKyBcInB4IHggXCIgKyB2aWRlby52aWRlb0hlaWdodCArIFwicHhcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNoZWNrVmlkZW8sIDUwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWplY3QoJ1VuYWJsZSB0byBwbGF5IHZpZGVvIHN0cmVhbS4gSXMgd2ViY2FtIHdvcmtpbmc/Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdHRlbXB0cy0tO1xuICAgICAgICB9XG4gICAgICAgIGNoZWNrVmlkZW8oKTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBUcmllcyB0byBhdHRhY2ggdGhlIGNhbWVyYS1zdHJlYW0gdG8gYSBnaXZlbiB2aWRlby1lbGVtZW50XG4gKiBhbmQgY2FsbHMgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gdGhlIGNvbnRlbnQgaXMgcmVhZHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25zdHJhaW50c1xuICogQHBhcmFtIHtPYmplY3R9IHZpZGVvXG4gKi9cbmZ1bmN0aW9uIGluaXRDYW1lcmEodmlkZW8sIGNvbnN0cmFpbnRzKSB7XG4gICAgcmV0dXJuIGdldFVzZXJNZWRpYShjb25zdHJhaW50cylcbiAgICAudGhlbigoc3RyZWFtKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgc3RyZWFtUmVmID0gc3RyZWFtO1xuICAgICAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKFwiYXV0b3BsYXlcIiwgJ3RydWUnKTtcbiAgICAgICAgICAgIHZpZGVvLnNyY09iamVjdCA9IHN0cmVhbTtcbiAgICAgICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSlcbiAgICAudGhlbih3YWl0Rm9yVmlkZW8uYmluZChudWxsLCB2aWRlbykpO1xufVxuXG5mdW5jdGlvbiBkZXByZWNhdGVkQ29uc3RyYWludHModmlkZW9Db25zdHJhaW50cykge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBwaWNrKHZpZGVvQ29uc3RyYWludHMsIFtcIndpZHRoXCIsIFwiaGVpZ2h0XCIsIFwiZmFjaW5nTW9kZVwiLFxuICAgICAgICAgICAgXCJhc3BlY3RSYXRpb1wiLCBcImRldmljZUlkXCJdKTtcblxuICAgIGlmICh0eXBlb2YgdmlkZW9Db25zdHJhaW50cy5taW5Bc3BlY3RSYXRpbyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgIHZpZGVvQ29uc3RyYWludHMubWluQXNwZWN0UmF0aW8gPiAwKSB7XG4gICAgICAgIG5vcm1hbGl6ZWQuYXNwZWN0UmF0aW8gPSB2aWRlb0NvbnN0cmFpbnRzLm1pbkFzcGVjdFJhdGlvO1xuICAgICAgICBjb25zb2xlLmxvZyhcIldBUk5JTkc6IENvbnN0cmFpbnQgJ21pbkFzcGVjdFJhdGlvJyBpcyBkZXByZWNhdGVkOyBVc2UgJ2FzcGVjdFJhdGlvJyBpbnN0ZWFkXCIpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZpZGVvQ29uc3RyYWludHMuZmFjaW5nICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBub3JtYWxpemVkLmZhY2luZ01vZGUgPSB2aWRlb0NvbnN0cmFpbnRzLmZhY2luZztcbiAgICAgICAgY29uc29sZS5sb2coXCJXQVJOSU5HOiBDb25zdHJhaW50ICdmYWNpbmcnIGlzIGRlcHJlY2F0ZWQuIFVzZSAnZmFjaW5nTW9kZScgaW5zdGVhZCdcIik7XG4gICAgfVxuICAgIHJldHVybiBub3JtYWxpemVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGlja0NvbnN0cmFpbnRzKHZpZGVvQ29uc3RyYWludHMpIHtcbiAgICBjb25zdCBub3JtYWxpemVkQ29uc3RyYWludHMgPSB7XG4gICAgICAgIGF1ZGlvOiBmYWxzZSxcbiAgICAgICAgdmlkZW86IGRlcHJlY2F0ZWRDb25zdHJhaW50cyh2aWRlb0NvbnN0cmFpbnRzKVxuICAgIH07XG5cbiAgICBpZiAobm9ybWFsaXplZENvbnN0cmFpbnRzLnZpZGVvLmRldmljZUlkXG4gICAgICAgICAgICAmJiBub3JtYWxpemVkQ29uc3RyYWludHMudmlkZW8uZmFjaW5nTW9kZSkge1xuICAgICAgICBkZWxldGUgbm9ybWFsaXplZENvbnN0cmFpbnRzLnZpZGVvLmZhY2luZ01vZGU7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobm9ybWFsaXplZENvbnN0cmFpbnRzKTtcbn1cblxuZnVuY3Rpb24gZW51bWVyYXRlVmlkZW9EZXZpY2VzKCkge1xuICAgIHJldHVybiBlbnVtZXJhdGVEZXZpY2VzKClcbiAgICAudGhlbihkZXZpY2VzID0+IGRldmljZXMuZmlsdGVyKGRldmljZSA9PiBkZXZpY2Uua2luZCA9PT0gJ3ZpZGVvaW5wdXQnKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICByZXF1ZXN0OiBmdW5jdGlvbih2aWRlbywgdmlkZW9Db25zdHJhaW50cykge1xuICAgICAgICByZXR1cm4gcGlja0NvbnN0cmFpbnRzKHZpZGVvQ29uc3RyYWludHMpXG4gICAgICAgICAgICAudGhlbihpbml0Q2FtZXJhLmJpbmQobnVsbCwgdmlkZW8pKTtcbiAgICB9LFxuICAgIHJlbGVhc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdHJhY2tzID0gc3RyZWFtUmVmICYmIHN0cmVhbVJlZi5nZXRWaWRlb1RyYWNrcygpO1xuICAgICAgICBpZiAodHJhY2tzICYmIHRyYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRyYWNrc1swXS5zdG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3RyZWFtUmVmID0gbnVsbDtcbiAgICB9LFxuICAgIGVudW1lcmF0ZVZpZGVvRGV2aWNlcyxcbiAgICBnZXRBY3RpdmVTdHJlYW1MYWJlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChzdHJlYW1SZWYpIHtcbiAgICAgICAgICAgIGNvbnN0IHRyYWNrcyA9IHN0cmVhbVJlZi5nZXRWaWRlb1RyYWNrcygpO1xuICAgICAgICAgICAgaWYgKHRyYWNrcyAmJiB0cmFja3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYWNrc1swXS5sYWJlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5wdXQvY2FtZXJhX2FjY2Vzcy5qcyIsImltcG9ydCBJbWFnZVdyYXBwZXIgZnJvbSAnLi4vY29tbW9uL2ltYWdlX3dyYXBwZXInO1xuaW1wb3J0IHtcbiAgICBjYWxjdWxhdGVQYXRjaFNpemUsXG4gICAgb3RzdVRocmVzaG9sZCxcbiAgICBoc3YycmdiLFxuICAgIGNsdXN0ZXIsXG4gICAgdG9wR2VuZXJpYyxcbiAgICBpbWFnZVJlZixcbiAgICBoYWxmU2FtcGxlLFxuICAgIGNvbXB1dGVJbWFnZUFyZWFcbn0gZnJvbSAnLi4vY29tbW9uL2N2X3V0aWxzJztcbmltcG9ydCBBcnJheUhlbHBlciBmcm9tICcuLi9jb21tb24vYXJyYXlfaGVscGVyJztcbmltcG9ydCBJbWFnZURlYnVnIGZyb20gJy4uL2NvbW1vbi9pbWFnZV9kZWJ1Zyc7XG5pbXBvcnQgUmFzdGVyaXplciBmcm9tICcuL3Jhc3Rlcml6ZXInO1xuaW1wb3J0IFRyYWNlciBmcm9tICcuL3RyYWNlcic7XG5pbXBvcnQgc2tlbGV0b25pemVyIGZyb20gJy4vc2tlbGV0b25pemVyJztcbmNvbnN0IHZlYzIgPSB7XG4gICAgY2xvbmU6IHJlcXVpcmUoJ2dsLXZlYzIvY2xvbmUnKSxcbiAgICBkb3Q6ICByZXF1aXJlKCdnbC12ZWMyL2RvdCcpLFxuICAgIHNjYWxlOiByZXF1aXJlKCdnbC12ZWMyL3NjYWxlJyksXG4gICAgdHJhbnNmb3JtTWF0MjogcmVxdWlyZSgnZ2wtdmVjMi90cmFuc2Zvcm1NYXQyJylcbn07XG5jb25zdCBtYXQyID0ge1xuICAgIGNvcHk6IHJlcXVpcmUoJ2dsLW1hdDIvY29weScpLFxuICAgIGNyZWF0ZTogcmVxdWlyZSgnZ2wtbWF0Mi9jcmVhdGUnKSxcbiAgICBpbnZlcnQ6IHJlcXVpcmUoJ2dsLW1hdDIvaW52ZXJ0Jylcbn1cblxudmFyIF9jb25maWcsXG4gICAgX2N1cnJlbnRJbWFnZVdyYXBwZXIsXG4gICAgX3NrZWxJbWFnZVdyYXBwZXIsXG4gICAgX3N1YkltYWdlV3JhcHBlcixcbiAgICBfbGFiZWxJbWFnZVdyYXBwZXIsXG4gICAgX3BhdGNoR3JpZCxcbiAgICBfcGF0Y2hMYWJlbEdyaWQsXG4gICAgX2ltYWdlVG9QYXRjaEdyaWQsXG4gICAgX2JpbmFyeUltYWdlV3JhcHBlcixcbiAgICBfcGF0Y2hTaXplLFxuICAgIF9jYW52YXNDb250YWluZXIgPSB7XG4gICAgICAgIGN0eDoge1xuICAgICAgICAgICAgYmluYXJ5OiBudWxsXG4gICAgICAgIH0sXG4gICAgICAgIGRvbToge1xuICAgICAgICAgICAgYmluYXJ5OiBudWxsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9udW1QYXRjaGVzID0ge3g6IDAsIHk6IDB9LFxuICAgIF9pbnB1dEltYWdlV3JhcHBlcixcbiAgICBfc2tlbGV0b25pemVyO1xuXG5mdW5jdGlvbiBpbml0QnVmZmVycygpIHtcbiAgICB2YXIgc2tlbGV0b25JbWFnZURhdGE7XG5cbiAgICBpZiAoX2NvbmZpZy5oYWxmU2FtcGxlKSB7XG4gICAgICAgIF9jdXJyZW50SW1hZ2VXcmFwcGVyID0gbmV3IEltYWdlV3JhcHBlcih7XG4gICAgICAgICAgICB4OiBfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS54IC8gMiB8IDAsXG4gICAgICAgICAgICB5OiBfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS55IC8gMiB8IDBcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgX2N1cnJlbnRJbWFnZVdyYXBwZXIgPSBfaW5wdXRJbWFnZVdyYXBwZXI7XG4gICAgfVxuXG4gICAgX3BhdGNoU2l6ZSA9IGNhbGN1bGF0ZVBhdGNoU2l6ZShfY29uZmlnLnBhdGNoU2l6ZSwgX2N1cnJlbnRJbWFnZVdyYXBwZXIuc2l6ZSk7XG5cbiAgICBfbnVtUGF0Y2hlcy54ID0gX2N1cnJlbnRJbWFnZVdyYXBwZXIuc2l6ZS54IC8gX3BhdGNoU2l6ZS54IHwgMDtcbiAgICBfbnVtUGF0Y2hlcy55ID0gX2N1cnJlbnRJbWFnZVdyYXBwZXIuc2l6ZS55IC8gX3BhdGNoU2l6ZS55IHwgMDtcblxuICAgIF9iaW5hcnlJbWFnZVdyYXBwZXIgPSBuZXcgSW1hZ2VXcmFwcGVyKF9jdXJyZW50SW1hZ2VXcmFwcGVyLnNpemUsIHVuZGVmaW5lZCwgVWludDhBcnJheSwgZmFsc2UpO1xuXG4gICAgX2xhYmVsSW1hZ2VXcmFwcGVyID0gbmV3IEltYWdlV3JhcHBlcihfcGF0Y2hTaXplLCB1bmRlZmluZWQsIEFycmF5LCB0cnVlKTtcblxuICAgIHNrZWxldG9uSW1hZ2VEYXRhID0gbmV3IEFycmF5QnVmZmVyKDY0ICogMTAyNCk7XG4gICAgX3N1YkltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoX3BhdGNoU2l6ZSxcbiAgICAgICAgbmV3IFVpbnQ4QXJyYXkoc2tlbGV0b25JbWFnZURhdGEsIDAsIF9wYXRjaFNpemUueCAqIF9wYXRjaFNpemUueSkpO1xuICAgIF9za2VsSW1hZ2VXcmFwcGVyID0gbmV3IEltYWdlV3JhcHBlcihfcGF0Y2hTaXplLFxuICAgICAgICBuZXcgVWludDhBcnJheShza2VsZXRvbkltYWdlRGF0YSwgX3BhdGNoU2l6ZS54ICogX3BhdGNoU2l6ZS55ICogMywgX3BhdGNoU2l6ZS54ICogX3BhdGNoU2l6ZS55KSxcbiAgICAgICAgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICBfc2tlbGV0b25pemVyID0gc2tlbGV0b25pemVyKCh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgPyB3aW5kb3cgOiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSA/IHNlbGYgOiBnbG9iYWwsIHtcbiAgICAgICAgc2l6ZTogX3BhdGNoU2l6ZS54XG4gICAgfSwgc2tlbGV0b25JbWFnZURhdGEpO1xuXG4gICAgX2ltYWdlVG9QYXRjaEdyaWQgPSBuZXcgSW1hZ2VXcmFwcGVyKHtcbiAgICAgICAgeDogKF9jdXJyZW50SW1hZ2VXcmFwcGVyLnNpemUueCAvIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS54KSB8IDAsXG4gICAgICAgIHk6IChfY3VycmVudEltYWdlV3JhcHBlci5zaXplLnkgLyBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueSkgfCAwXG4gICAgfSwgdW5kZWZpbmVkLCBBcnJheSwgdHJ1ZSk7XG4gICAgX3BhdGNoR3JpZCA9IG5ldyBJbWFnZVdyYXBwZXIoX2ltYWdlVG9QYXRjaEdyaWQuc2l6ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xuICAgIF9wYXRjaExhYmVsR3JpZCA9IG5ldyBJbWFnZVdyYXBwZXIoX2ltYWdlVG9QYXRjaEdyaWQuc2l6ZSwgdW5kZWZpbmVkLCBJbnQzMkFycmF5LCB0cnVlKTtcbn1cblxuZnVuY3Rpb24gaW5pdENhbnZhcygpIHtcbiAgICBpZiAoX2NvbmZpZy51c2VXb3JrZXIgfHwgdHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5LmNsYXNzTmFtZSA9IFwiYmluYXJ5QnVmZmVyXCI7XG4gICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiBfY29uZmlnLmRlYnVnLnNob3dDYW52YXMgPT09IHRydWUpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZWJ1Z1wiKS5hcHBlbmRDaGlsZChfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkpO1xuICAgIH1cbiAgICBfY2FudmFzQ29udGFpbmVyLmN0eC5iaW5hcnkgPSBfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeS53aWR0aCA9IF9iaW5hcnlJbWFnZVdyYXBwZXIuc2l6ZS54O1xuICAgIF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeS5oZWlnaHQgPSBfYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgYm91bmRpbmcgYm94IHdoaWNoIGVuY2xvc2VzIGFsbCB0aGUgZ2l2ZW4gcGF0Y2hlc1xuICogQHJldHVybnMge0FycmF5fSBUaGUgbWluaW1hbCBib3VuZGluZyBib3hcbiAqL1xuZnVuY3Rpb24gYm94RnJvbVBhdGNoZXMocGF0Y2hlcykge1xuICAgIHZhciBvdmVyQXZnLFxuICAgICAgICBpLFxuICAgICAgICBqLFxuICAgICAgICBwYXRjaCxcbiAgICAgICAgdHJhbnNNYXQsXG4gICAgICAgIG1pbnggPVxuICAgICAgICBfYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueCxcbiAgICAgICAgbWlueSA9IF9iaW5hcnlJbWFnZVdyYXBwZXIuc2l6ZS55LFxuICAgICAgICBtYXh4ID0gLV9iaW5hcnlJbWFnZVdyYXBwZXIuc2l6ZS54LFxuICAgICAgICBtYXh5ID0gLV9iaW5hcnlJbWFnZVdyYXBwZXIuc2l6ZS55LFxuICAgICAgICBib3gsXG4gICAgICAgIHNjYWxlO1xuXG4gICAgLy8gZHJhdyBhbGwgcGF0Y2hlcyB3aGljaCBhcmUgdG8gYmUgdGFrZW4gaW50byBjb25zaWRlcmF0aW9uXG4gICAgb3ZlckF2ZyA9IDA7XG4gICAgZm9yICggaSA9IDA7IGkgPCBwYXRjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBhdGNoID0gcGF0Y2hlc1tpXTtcbiAgICAgICAgb3ZlckF2ZyArPSBwYXRjaC5yYWQ7XG4gICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgX2NvbmZpZy5kZWJ1Zy5zaG93UGF0Y2hlcykge1xuICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UmVjdChwYXRjaC5wb3MsIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LCB7Y29sb3I6IFwicmVkXCJ9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG92ZXJBdmcgLz0gcGF0Y2hlcy5sZW5ndGg7XG4gICAgb3ZlckF2ZyA9IChvdmVyQXZnICogMTgwIC8gTWF0aC5QSSArIDkwKSAlIDE4MCAtIDkwO1xuICAgIGlmIChvdmVyQXZnIDwgMCkge1xuICAgICAgICBvdmVyQXZnICs9IDE4MDtcbiAgICB9XG5cbiAgICBvdmVyQXZnID0gKDE4MCAtIG92ZXJBdmcpICogTWF0aC5QSSAvIDE4MDtcbiAgICB0cmFuc01hdCA9IG1hdDIuY29weShtYXQyLmNyZWF0ZSgpLCBbTWF0aC5jb3Mob3ZlckF2ZyksIE1hdGguc2luKG92ZXJBdmcpLCAtTWF0aC5zaW4ob3ZlckF2ZyksIE1hdGguY29zKG92ZXJBdmcpXSk7XG5cbiAgICAvLyBpdGVyYXRlIG92ZXIgcGF0Y2hlcyBhbmQgcm90YXRlIGJ5IGFuZ2xlXG4gICAgZm9yICggaSA9IDA7IGkgPCBwYXRjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBhdGNoID0gcGF0Y2hlc1tpXTtcbiAgICAgICAgZm9yICggaiA9IDA7IGogPCA0OyBqKyspIHtcbiAgICAgICAgICAgIHZlYzIudHJhbnNmb3JtTWF0MihwYXRjaC5ib3hbal0sIHBhdGNoLmJveFtqXSwgdHJhbnNNYXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiBfY29uZmlnLmRlYnVnLmJveEZyb21QYXRjaGVzLnNob3dUcmFuc2Zvcm1lZCkge1xuICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UGF0aChwYXRjaC5ib3gsIHt4OiAwLCB5OiAxfSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LCB7Y29sb3I6ICcjOTlmZjAwJywgbGluZVdpZHRoOiAyfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmaW5kIGJvdW5kaW5nIGJveFxuICAgIGZvciAoIGkgPSAwOyBpIDwgcGF0Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXRjaCA9IHBhdGNoZXNbaV07XG4gICAgICAgIGZvciAoIGogPSAwOyBqIDwgNDsgaisrKSB7XG4gICAgICAgICAgICBpZiAocGF0Y2guYm94W2pdWzBdIDwgbWlueCkge1xuICAgICAgICAgICAgICAgIG1pbnggPSBwYXRjaC5ib3hbal1bMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGF0Y2guYm94W2pdWzBdID4gbWF4eCkge1xuICAgICAgICAgICAgICAgIG1heHggPSBwYXRjaC5ib3hbal1bMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGF0Y2guYm94W2pdWzFdIDwgbWlueSkge1xuICAgICAgICAgICAgICAgIG1pbnkgPSBwYXRjaC5ib3hbal1bMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGF0Y2guYm94W2pdWzFdID4gbWF4eSkge1xuICAgICAgICAgICAgICAgIG1heHkgPSBwYXRjaC5ib3hbal1bMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBib3ggPSBbW21pbngsIG1pbnldLCBbbWF4eCwgbWlueV0sIFttYXh4LCBtYXh5XSwgW21pbngsIG1heHldXTtcblxuICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgX2NvbmZpZy5kZWJ1Zy5ib3hGcm9tUGF0Y2hlcy5zaG93VHJhbnNmb3JtZWRCb3gpIHtcbiAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UGF0aChib3gsIHt4OiAwLCB5OiAxfSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LCB7Y29sb3I6ICcjZmYwMDAwJywgbGluZVdpZHRoOiAyfSk7XG4gICAgfVxuXG4gICAgc2NhbGUgPSBfY29uZmlnLmhhbGZTYW1wbGUgPyAyIDogMTtcbiAgICAvLyByZXZlcnNlIHJvdGF0aW9uO1xuICAgIHRyYW5zTWF0ID0gbWF0Mi5pbnZlcnQodHJhbnNNYXQsIHRyYW5zTWF0KTtcbiAgICBmb3IgKCBqID0gMDsgaiA8IDQ7IGorKykge1xuICAgICAgICB2ZWMyLnRyYW5zZm9ybU1hdDIoYm94W2pdLCBib3hbal0sIHRyYW5zTWF0KTtcbiAgICB9XG5cbiAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIF9jb25maWcuZGVidWcuYm94RnJvbVBhdGNoZXMuc2hvd0JCKSB7XG4gICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgoYm94LCB7eDogMCwgeTogMX0sIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSwge2NvbG9yOiAnI2ZmMDAwMCcsIGxpbmVXaWR0aDogMn0pO1xuICAgIH1cblxuICAgIGZvciAoIGogPSAwOyBqIDwgNDsgaisrKSB7XG4gICAgICAgIHZlYzIuc2NhbGUoYm94W2pdLCBib3hbal0sIHNjYWxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYm94O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBiaW5hcnkgaW1hZ2Ugb2YgdGhlIGN1cnJlbnQgaW1hZ2VcbiAqL1xuZnVuY3Rpb24gYmluYXJpemVJbWFnZSgpIHtcbiAgICBvdHN1VGhyZXNob2xkKF9jdXJyZW50SW1hZ2VXcmFwcGVyLCBfYmluYXJ5SW1hZ2VXcmFwcGVyKTtcbiAgICBfYmluYXJ5SW1hZ2VXcmFwcGVyLnplcm9Cb3JkZXIoKTtcbiAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIF9jb25maWcuZGVidWcuc2hvd0NhbnZhcykge1xuICAgICAgICBfYmluYXJ5SW1hZ2VXcmFwcGVyLnNob3coX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5LCAyNTUpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgdGhlIGVudGlyZSBpbWFnZVxuICogZXh0cmFjdCBwYXRjaGVzXG4gKi9cbmZ1bmN0aW9uIGZpbmRQYXRjaGVzKCkge1xuICAgIHZhciBpLFxuICAgICAgICBqLFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICBtb21lbnRzLFxuICAgICAgICBwYXRjaGVzRm91bmQgPSBbXSxcbiAgICAgICAgcmFzdGVyaXplcixcbiAgICAgICAgcmFzdGVyUmVzdWx0LFxuICAgICAgICBwYXRjaDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgX251bVBhdGNoZXMueDsgaSsrKSB7XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBfbnVtUGF0Y2hlcy55OyBqKyspIHtcbiAgICAgICAgICAgIHggPSBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueCAqIGk7XG4gICAgICAgICAgICB5ID0gX3N1YkltYWdlV3JhcHBlci5zaXplLnkgKiBqO1xuXG4gICAgICAgICAgICAvLyBzZXBlcmF0ZSBwYXJ0c1xuICAgICAgICAgICAgc2tlbGV0b25pemUoeCwgeSk7XG5cbiAgICAgICAgICAgIC8vIFJhc3Rlcml6ZSwgZmluZCBpbmRpdmlkdWFsIGJhcnNcbiAgICAgICAgICAgIF9za2VsSW1hZ2VXcmFwcGVyLnplcm9Cb3JkZXIoKTtcbiAgICAgICAgICAgIEFycmF5SGVscGVyLmluaXQoX2xhYmVsSW1hZ2VXcmFwcGVyLmRhdGEsIDApO1xuICAgICAgICAgICAgcmFzdGVyaXplciA9IFJhc3Rlcml6ZXIuY3JlYXRlKF9za2VsSW1hZ2VXcmFwcGVyLCBfbGFiZWxJbWFnZVdyYXBwZXIpO1xuICAgICAgICAgICAgcmFzdGVyUmVzdWx0ID0gcmFzdGVyaXplci5yYXN0ZXJpemUoMCk7XG5cbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgX2NvbmZpZy5kZWJ1Zy5zaG93TGFiZWxzKSB7XG4gICAgICAgICAgICAgICAgX2xhYmVsSW1hZ2VXcmFwcGVyLm92ZXJsYXkoX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5LCBNYXRoLmZsb29yKDM2MCAvIHJhc3RlclJlc3VsdC5jb3VudCksXG4gICAgICAgICAgICAgICAgICAgIHt4OiB4LCB5OiB5fSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSBtb21lbnRzIGZyb20gdGhlIHNrZWxldG9uaXplZCBwYXRjaFxuICAgICAgICAgICAgbW9tZW50cyA9IF9sYWJlbEltYWdlV3JhcHBlci5tb21lbnRzKHJhc3RlclJlc3VsdC5jb3VudCk7XG5cbiAgICAgICAgICAgIC8vIGV4dHJhY3QgZWxpZ2libGUgcGF0Y2hlc1xuICAgICAgICAgICAgcGF0Y2hlc0ZvdW5kID0gcGF0Y2hlc0ZvdW5kLmNvbmNhdChkZXNjcmliZVBhdGNoKG1vbWVudHMsIFtpLCBqXSwgeCwgeSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiBfY29uZmlnLmRlYnVnLnNob3dGb3VuZFBhdGNoZXMpIHtcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBwYXRjaGVzRm91bmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhdGNoID0gcGF0Y2hlc0ZvdW5kW2ldO1xuICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UmVjdChwYXRjaC5wb3MsIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LFxuICAgICAgICAgICAgICAgIHtjb2xvcjogXCIjOTlmZjAwXCIsIGxpbmVXaWR0aDogMn0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdGNoZXNGb3VuZDtcbn1cblxuLyoqXG4gKiBGaW5kcyB0aG9zZSBjb25uZWN0ZWQgYXJlYXMgd2hpY2ggY29udGFpbiBhdCBsZWFzdCA2IHBhdGNoZXNcbiAqIGFuZCByZXR1cm5zIHRoZW0gb3JkZXJlZCBERVNDIGJ5IHRoZSBudW1iZXIgb2YgY29udGFpbmVkIHBhdGNoZXNcbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXhMYWJlbFxuICovXG5mdW5jdGlvbiBmaW5kQmlnZ2VzdENvbm5lY3RlZEFyZWFzKG1heExhYmVsKXtcbiAgICB2YXIgaSxcbiAgICAgICAgc3VtLFxuICAgICAgICBsYWJlbEhpc3QgPSBbXSxcbiAgICAgICAgdG9wTGFiZWxzID0gW107XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8IG1heExhYmVsOyBpKyspIHtcbiAgICAgICAgbGFiZWxIaXN0LnB1c2goMCk7XG4gICAgfVxuICAgIHN1bSA9IF9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aDtcbiAgICB3aGlsZSAoc3VtLS0pIHtcbiAgICAgICAgaWYgKF9wYXRjaExhYmVsR3JpZC5kYXRhW3N1bV0gPiAwKSB7XG4gICAgICAgICAgICBsYWJlbEhpc3RbX3BhdGNoTGFiZWxHcmlkLmRhdGFbc3VtXSAtIDFdKys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsYWJlbEhpc3QgPSBsYWJlbEhpc3QubWFwKGZ1bmN0aW9uKHZhbCwgaWR4KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWw6IHZhbCxcbiAgICAgICAgICAgIGxhYmVsOiBpZHggKyAxXG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICBsYWJlbEhpc3Quc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHJldHVybiBiLnZhbCAtIGEudmFsO1xuICAgIH0pO1xuXG4gICAgLy8gZXh0cmFjdCB0b3AgYXJlYXMgd2l0aCBhdCBsZWFzdCA2IHBhdGNoZXMgcHJlc2VudFxuICAgIHRvcExhYmVscyA9IGxhYmVsSGlzdC5maWx0ZXIoZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgcmV0dXJuIGVsLnZhbCA+PSA1O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvcExhYmVscztcbn1cblxuLyoqXG4gKlxuICovXG5mdW5jdGlvbiBmaW5kQm94ZXModG9wTGFiZWxzLCBtYXhMYWJlbCkge1xuICAgIHZhciBpLFxuICAgICAgICBqLFxuICAgICAgICBzdW0sXG4gICAgICAgIHBhdGNoZXMgPSBbXSxcbiAgICAgICAgcGF0Y2gsXG4gICAgICAgIGJveCxcbiAgICAgICAgYm94ZXMgPSBbXSxcbiAgICAgICAgaHN2ID0gWzAsIDEsIDFdLFxuICAgICAgICByZ2IgPSBbMCwgMCwgMF07XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8IHRvcExhYmVscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzdW0gPSBfcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGg7XG4gICAgICAgIHBhdGNoZXMubGVuZ3RoID0gMDtcbiAgICAgICAgd2hpbGUgKHN1bS0tKSB7XG4gICAgICAgICAgICBpZiAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbc3VtXSA9PT0gdG9wTGFiZWxzW2ldLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2ggPSBfaW1hZ2VUb1BhdGNoR3JpZC5kYXRhW3N1bV07XG4gICAgICAgICAgICAgICAgcGF0Y2hlcy5wdXNoKHBhdGNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBib3ggPSBib3hGcm9tUGF0Y2hlcyhwYXRjaGVzKTtcbiAgICAgICAgaWYgKGJveCkge1xuICAgICAgICAgICAgYm94ZXMucHVzaChib3gpO1xuXG4gICAgICAgICAgICAvLyBkcmF3IHBhdGNoLWxhYmVscyBpZiByZXF1ZXN0ZWRcbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgX2NvbmZpZy5kZWJ1Zy5zaG93UmVtYWluaW5nUGF0Y2hMYWJlbHMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IHBhdGNoZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0Y2ggPSBwYXRjaGVzW2pdO1xuICAgICAgICAgICAgICAgICAgICBoc3ZbMF0gPSAodG9wTGFiZWxzW2ldLmxhYmVsIC8gKG1heExhYmVsICsgMSkpICogMzYwO1xuICAgICAgICAgICAgICAgICAgICBoc3YycmdiKGhzdiwgcmdiKTtcbiAgICAgICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UmVjdChwYXRjaC5wb3MsIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAge2NvbG9yOiBcInJnYihcIiArIHJnYi5qb2luKFwiLFwiKSArIFwiKVwiLCBsaW5lV2lkdGg6IDJ9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGJveGVzO1xufVxuXG4vKipcbiAqIEZpbmQgc2ltaWxhciBtb21lbnRzICh2aWEgY2x1c3RlcilcbiAqIEBwYXJhbSB7T2JqZWN0fSBtb21lbnRzXG4gKi9cbmZ1bmN0aW9uIHNpbWlsYXJNb21lbnRzKG1vbWVudHMpIHtcbiAgICB2YXIgY2x1c3RlcnMgPSBjbHVzdGVyKG1vbWVudHMsIDAuOTApO1xuICAgIHZhciB0b3BDbHVzdGVyID0gdG9wR2VuZXJpYyhjbHVzdGVycywgMSwgZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gZS5nZXRQb2ludHMoKS5sZW5ndGg7XG4gICAgfSk7XG4gICAgdmFyIHBvaW50cyA9IFtdLCByZXN1bHQgPSBbXTtcbiAgICBpZiAodG9wQ2x1c3Rlci5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcG9pbnRzID0gdG9wQ2x1c3RlclswXS5pdGVtLmdldFBvaW50cygpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gocG9pbnRzW2ldLnBvaW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBza2VsZXRvbml6ZSh4LCB5KSB7XG4gICAgX2JpbmFyeUltYWdlV3JhcHBlci5zdWJJbWFnZUFzQ29weShfc3ViSW1hZ2VXcmFwcGVyLCBpbWFnZVJlZih4LCB5KSk7XG4gICAgX3NrZWxldG9uaXplci5za2VsZXRvbml6ZSgpO1xuXG4gICAgLy8gU2hvdyBza2VsZXRvbiBpZiByZXF1ZXN0ZWRcbiAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIF9jb25maWcuZGVidWcuc2hvd1NrZWxldG9uKSB7XG4gICAgICAgIF9za2VsSW1hZ2VXcmFwcGVyLm92ZXJsYXkoX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5LCAzNjAsIGltYWdlUmVmKHgsIHkpKTtcbiAgICB9XG59XG5cbi8qKlxuICogRXh0cmFjdHMgYW5kIGRlc2NyaWJlcyB0aG9zZSBwYXRjaGVzIHdoaWNoIHNlZW0gdG8gY29udGFpbiBhIGJhcmNvZGUgcGF0dGVyblxuICogQHBhcmFtIHtBcnJheX0gbW9tZW50c1xuICogQHBhcmFtIHtPYmplY3R9IHBhdGNoUG9zLFxuICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gKiBAcmV0dXJucyB7QXJyYXl9IGxpc3Qgb2YgcGF0Y2hlc1xuICovXG5mdW5jdGlvbiBkZXNjcmliZVBhdGNoKG1vbWVudHMsIHBhdGNoUG9zLCB4LCB5KSB7XG4gICAgdmFyIGssXG4gICAgICAgIGF2ZyxcbiAgICAgICAgZWxpZ2libGVNb21lbnRzID0gW10sXG4gICAgICAgIG1hdGNoaW5nTW9tZW50cyxcbiAgICAgICAgcGF0Y2gsXG4gICAgICAgIHBhdGNoZXNGb3VuZCA9IFtdLFxuICAgICAgICBtaW5Db21wb25lbnRXZWlnaHQgPSBNYXRoLmNlaWwoX3BhdGNoU2l6ZS54IC8gMyk7XG5cbiAgICBpZiAobW9tZW50cy5sZW5ndGggPj0gMikge1xuICAgICAgICAvLyBvbmx5IGNvbGxlY3QgbW9tZW50cyB3aGljaCdzIGFyZWEgY292ZXJzIGF0IGxlYXN0IG1pbkNvbXBvbmVudFdlaWdodCBwaXhlbHMuXG4gICAgICAgIGZvciAoIGsgPSAwOyBrIDwgbW9tZW50cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgaWYgKG1vbWVudHNba10ubTAwID4gbWluQ29tcG9uZW50V2VpZ2h0KSB7XG4gICAgICAgICAgICAgICAgZWxpZ2libGVNb21lbnRzLnB1c2gobW9tZW50c1trXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBhdCBsZWFzdCAyIG1vbWVudHMgYXJlIGZvdW5kIHdoaWNoIGhhdmUgYXQgbGVhc3QgbWluQ29tcG9uZW50V2VpZ2h0cyBjb3ZlcmVkXG4gICAgICAgIGlmIChlbGlnaWJsZU1vbWVudHMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgIG1hdGNoaW5nTW9tZW50cyA9IHNpbWlsYXJNb21lbnRzKGVsaWdpYmxlTW9tZW50cyk7XG4gICAgICAgICAgICBhdmcgPSAwO1xuICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIHRoZSBzaW1pbGFyaXR5IG9mIHRoZSBtb21lbnRzXG4gICAgICAgICAgICBmb3IgKCBrID0gMDsgayA8IG1hdGNoaW5nTW9tZW50cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgIGF2ZyArPSBtYXRjaGluZ01vbWVudHNba10ucmFkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBPbmx5IHR3byBvZiB0aGUgbW9tZW50cyBhcmUgYWxsb3dlZCBub3QgdG8gZml0IGludG8gdGhlIGVxdWF0aW9uXG4gICAgICAgICAgICAvLyBhZGQgdGhlIHBhdGNoIHRvIHRoZSBzZXRcbiAgICAgICAgICAgIGlmIChtYXRjaGluZ01vbWVudHMubGVuZ3RoID4gMVxuICAgICAgICAgICAgICAgICAgICAmJiBtYXRjaGluZ01vbWVudHMubGVuZ3RoID49IChlbGlnaWJsZU1vbWVudHMubGVuZ3RoIC8gNCkgKiAzXG4gICAgICAgICAgICAgICAgICAgICYmIG1hdGNoaW5nTW9tZW50cy5sZW5ndGggPiBtb21lbnRzLmxlbmd0aCAvIDQpIHtcbiAgICAgICAgICAgICAgICBhdmcgLz0gbWF0Y2hpbmdNb21lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBwYXRjaCA9IHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHBhdGNoUG9zWzFdICogX251bVBhdGNoZXMueCArIHBhdGNoUG9zWzBdLFxuICAgICAgICAgICAgICAgICAgICBwb3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB5XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGJveDogW1xuICAgICAgICAgICAgICAgICAgICAgICAgdmVjMi5jbG9uZShbeCwgeV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmVjMi5jbG9uZShbeCArIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS54LCB5XSksXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZWMyLmNsb25lKFt4ICsgX3N1YkltYWdlV3JhcHBlci5zaXplLngsIHkgKyBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmVjMi5jbG9uZShbeCwgeSArIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS55XSlcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50czogbWF0Y2hpbmdNb21lbnRzLFxuICAgICAgICAgICAgICAgICAgICByYWQ6IGF2ZyxcbiAgICAgICAgICAgICAgICAgICAgdmVjOiB2ZWMyLmNsb25lKFtNYXRoLmNvcyhhdmcpLCBNYXRoLnNpbihhdmcpXSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHBhdGNoZXNGb3VuZC5wdXNoKHBhdGNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGF0Y2hlc0ZvdW5kO1xufVxuXG4vKipcbiAqIGZpbmRzIHBhdGNoZXMgd2hpY2ggYXJlIGNvbm5lY3RlZCBhbmQgc2hhcmUgdGhlIHNhbWUgb3JpZW50YXRpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXRjaGVzRm91bmRcbiAqL1xuZnVuY3Rpb24gcmFzdGVyaXplQW5ndWxhclNpbWlsYXJpdHkocGF0Y2hlc0ZvdW5kKSB7XG4gICAgdmFyIGxhYmVsID0gMCxcbiAgICAgICAgdGhyZXNob2xkID0gMC45NSxcbiAgICAgICAgY3VycklkeCA9IDAsXG4gICAgICAgIGosXG4gICAgICAgIHBhdGNoLFxuICAgICAgICBoc3YgPSBbMCwgMSwgMV0sXG4gICAgICAgIHJnYiA9IFswLCAwLCAwXTtcblxuICAgIGZ1bmN0aW9uIG5vdFlldFByb2Nlc3NlZCgpIHtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgX3BhdGNoTGFiZWxHcmlkLmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChfcGF0Y2hMYWJlbEdyaWQuZGF0YVtpXSA9PT0gMCAmJiBfcGF0Y2hHcmlkLmRhdGFbaV0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3BhdGNoTGFiZWxHcmlkLmxlbmd0aDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFjZShjdXJyZW50SWR4KSB7XG4gICAgICAgIHZhciB4LFxuICAgICAgICAgICAgeSxcbiAgICAgICAgICAgIGN1cnJlbnRQYXRjaCxcbiAgICAgICAgICAgIGlkeCxcbiAgICAgICAgICAgIGRpcixcbiAgICAgICAgICAgIGN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgeDogY3VycmVudElkeCAlIF9wYXRjaExhYmVsR3JpZC5zaXplLngsXG4gICAgICAgICAgICAgICAgeTogKGN1cnJlbnRJZHggLyBfcGF0Y2hMYWJlbEdyaWQuc2l6ZS54KSB8IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaW1pbGFyaXR5O1xuXG4gICAgICAgIGlmIChjdXJyZW50SWR4IDwgX3BhdGNoTGFiZWxHcmlkLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICBjdXJyZW50UGF0Y2ggPSBfaW1hZ2VUb1BhdGNoR3JpZC5kYXRhW2N1cnJlbnRJZHhdO1xuICAgICAgICAgICAgLy8gYXNzaWduIGxhYmVsXG4gICAgICAgICAgICBfcGF0Y2hMYWJlbEdyaWQuZGF0YVtjdXJyZW50SWR4XSA9IGxhYmVsO1xuICAgICAgICAgICAgZm9yICggZGlyID0gMDsgZGlyIDwgVHJhY2VyLnNlYXJjaERpcmVjdGlvbnMubGVuZ3RoOyBkaXIrKykge1xuICAgICAgICAgICAgICAgIHkgPSBjdXJyZW50LnkgKyBUcmFjZXIuc2VhcmNoRGlyZWN0aW9uc1tkaXJdWzBdO1xuICAgICAgICAgICAgICAgIHggPSBjdXJyZW50LnggKyBUcmFjZXIuc2VhcmNoRGlyZWN0aW9uc1tkaXJdWzFdO1xuICAgICAgICAgICAgICAgIGlkeCA9IHkgKiBfcGF0Y2hMYWJlbEdyaWQuc2l6ZS54ICsgeDtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnRpbnVlIGlmIHBhdGNoIGVtcHR5XG4gICAgICAgICAgICAgICAgaWYgKF9wYXRjaEdyaWQuZGF0YVtpZHhdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIF9wYXRjaExhYmVsR3JpZC5kYXRhW2lkeF0gPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbaWR4XSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBzaW1pbGFyaXR5ID0gTWF0aC5hYnModmVjMi5kb3QoX2ltYWdlVG9QYXRjaEdyaWQuZGF0YVtpZHhdLnZlYywgY3VycmVudFBhdGNoLnZlYykpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2ltaWxhcml0eSA+IHRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2UoaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHByZXBhcmUgZm9yIGZpbmRpbmcgdGhlIHJpZ2h0IHBhdGNoZXNcbiAgICBBcnJheUhlbHBlci5pbml0KF9wYXRjaEdyaWQuZGF0YSwgMCk7XG4gICAgQXJyYXlIZWxwZXIuaW5pdChfcGF0Y2hMYWJlbEdyaWQuZGF0YSwgMCk7XG4gICAgQXJyYXlIZWxwZXIuaW5pdChfaW1hZ2VUb1BhdGNoR3JpZC5kYXRhLCBudWxsKTtcblxuICAgIGZvciAoIGogPSAwOyBqIDwgcGF0Y2hlc0ZvdW5kLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHBhdGNoID0gcGF0Y2hlc0ZvdW5kW2pdO1xuICAgICAgICBfaW1hZ2VUb1BhdGNoR3JpZC5kYXRhW3BhdGNoLmluZGV4XSA9IHBhdGNoO1xuICAgICAgICBfcGF0Y2hHcmlkLmRhdGFbcGF0Y2guaW5kZXhdID0gMTtcbiAgICB9XG5cbiAgICAvLyByYXN0ZXJpemUgdGhlIHBhdGNoZXMgZm91bmQgdG8gZGV0ZXJtaW5lIGFyZWFcbiAgICBfcGF0Y2hHcmlkLnplcm9Cb3JkZXIoKTtcblxuICAgIHdoaWxlICgoIGN1cnJJZHggPSBub3RZZXRQcm9jZXNzZWQoKSkgPCBfcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgbGFiZWwrKztcbiAgICAgICAgdHJhY2UoY3VycklkeCk7XG4gICAgfVxuXG4gICAgLy8gZHJhdyBwYXRjaC1sYWJlbHMgaWYgcmVxdWVzdGVkXG4gICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiBfY29uZmlnLmRlYnVnLnNob3dQYXRjaExhYmVscykge1xuICAgICAgICBmb3IgKCBqID0gMDsgaiA8IF9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbal0gPiAwICYmIF9wYXRjaExhYmVsR3JpZC5kYXRhW2pdIDw9IGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2ggPSBfaW1hZ2VUb1BhdGNoR3JpZC5kYXRhW2pdO1xuICAgICAgICAgICAgICAgIGhzdlswXSA9IChfcGF0Y2hMYWJlbEdyaWQuZGF0YVtqXSAvIChsYWJlbCArIDEpKSAqIDM2MDtcbiAgICAgICAgICAgICAgICBoc3YycmdiKGhzdiwgcmdiKTtcbiAgICAgICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdSZWN0KHBhdGNoLnBvcywgX3N1YkltYWdlV3JhcHBlci5zaXplLCBfY2FudmFzQ29udGFpbmVyLmN0eC5iaW5hcnksXG4gICAgICAgICAgICAgICAgICAgIHtjb2xvcjogXCJyZ2IoXCIgKyByZ2Iuam9pbihcIixcIikgKyBcIilcIiwgbGluZVdpZHRoOiAyfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGFiZWw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbml0OiBmdW5jdGlvbihpbnB1dEltYWdlV3JhcHBlciwgY29uZmlnKSB7XG4gICAgICAgIF9jb25maWcgPSBjb25maWc7XG4gICAgICAgIF9pbnB1dEltYWdlV3JhcHBlciA9IGlucHV0SW1hZ2VXcmFwcGVyO1xuXG4gICAgICAgIGluaXRCdWZmZXJzKCk7XG4gICAgICAgIGluaXRDYW52YXMoKTtcbiAgICB9LFxuXG4gICAgbG9jYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBhdGNoZXNGb3VuZCxcbiAgICAgICAgICAgIHRvcExhYmVscyxcbiAgICAgICAgICAgIGJveGVzO1xuXG4gICAgICAgIGlmIChfY29uZmlnLmhhbGZTYW1wbGUpIHtcbiAgICAgICAgICAgIGhhbGZTYW1wbGUoX2lucHV0SW1hZ2VXcmFwcGVyLCBfY3VycmVudEltYWdlV3JhcHBlcik7XG4gICAgICAgIH1cblxuICAgICAgICBiaW5hcml6ZUltYWdlKCk7XG4gICAgICAgIHBhdGNoZXNGb3VuZCA9IGZpbmRQYXRjaGVzKCk7XG4gICAgICAgIC8vIHJldHVybiB1bmxlc3MgNSUgb3IgbW9yZSBwYXRjaGVzIGFyZSBmb3VuZFxuICAgICAgICBpZiAocGF0Y2hlc0ZvdW5kLmxlbmd0aCA8IF9udW1QYXRjaGVzLnggKiBfbnVtUGF0Y2hlcy55ICogMC4wNSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByYXN0ZXJyaXplIGFyZWEgYnkgY29tcGFyaW5nIGFuZ3VsYXIgc2ltaWxhcml0eTtcbiAgICAgICAgdmFyIG1heExhYmVsID0gcmFzdGVyaXplQW5ndWxhclNpbWlsYXJpdHkocGF0Y2hlc0ZvdW5kKTtcbiAgICAgICAgaWYgKG1heExhYmVsIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZWFyY2ggZm9yIGFyZWEgd2l0aCB0aGUgbW9zdCBwYXRjaGVzIChiaWdnZXN0IGNvbm5lY3RlZCBhcmVhKVxuICAgICAgICB0b3BMYWJlbHMgPSBmaW5kQmlnZ2VzdENvbm5lY3RlZEFyZWFzKG1heExhYmVsKTtcbiAgICAgICAgaWYgKHRvcExhYmVscy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgYm94ZXMgPSBmaW5kQm94ZXModG9wTGFiZWxzLCBtYXhMYWJlbCk7XG4gICAgICAgIHJldHVybiBib3hlcztcbiAgICB9LFxuXG4gICAgY2hlY2tJbWFnZUNvbnN0cmFpbnRzOiBmdW5jdGlvbihpbnB1dFN0cmVhbSwgY29uZmlnKSB7XG4gICAgICAgIHZhciBwYXRjaFNpemUsXG4gICAgICAgICAgICB3aWR0aCA9IGlucHV0U3RyZWFtLmdldFdpZHRoKCksXG4gICAgICAgICAgICBoZWlnaHQgPSBpbnB1dFN0cmVhbS5nZXRIZWlnaHQoKSxcbiAgICAgICAgICAgIGhhbGZTYW1wbGUgPSBjb25maWcuaGFsZlNhbXBsZSA/IDAuNSA6IDEsXG4gICAgICAgICAgICBzaXplLFxuICAgICAgICAgICAgYXJlYTtcblxuICAgICAgICAvLyBjYWxjdWxhdGUgd2lkdGggYW5kIGhlaWdodCBiYXNlZCBvbiBhcmVhXG4gICAgICAgIGlmIChpbnB1dFN0cmVhbS5nZXRDb25maWcoKS5hcmVhKSB7XG4gICAgICAgICAgICBhcmVhID0gY29tcHV0ZUltYWdlQXJlYSh3aWR0aCwgaGVpZ2h0LCBpbnB1dFN0cmVhbS5nZXRDb25maWcoKS5hcmVhKTtcbiAgICAgICAgICAgIGlucHV0U3RyZWFtLnNldFRvcFJpZ2h0KHt4OiBhcmVhLnN4LCB5OiBhcmVhLnN5fSk7XG4gICAgICAgICAgICBpbnB1dFN0cmVhbS5zZXRDYW52YXNTaXplKHt4OiB3aWR0aCwgeTogaGVpZ2h0fSk7XG4gICAgICAgICAgICB3aWR0aCA9IGFyZWEuc3c7XG4gICAgICAgICAgICBoZWlnaHQgPSBhcmVhLnNoO1xuICAgICAgICB9XG5cbiAgICAgICAgc2l6ZSA9IHtcbiAgICAgICAgICAgIHg6IE1hdGguZmxvb3Iod2lkdGggKiBoYWxmU2FtcGxlKSxcbiAgICAgICAgICAgIHk6IE1hdGguZmxvb3IoaGVpZ2h0ICogaGFsZlNhbXBsZSlcbiAgICAgICAgfTtcblxuICAgICAgICBwYXRjaFNpemUgPSBjYWxjdWxhdGVQYXRjaFNpemUoY29uZmlnLnBhdGNoU2l6ZSwgc2l6ZSk7XG4gICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGF0Y2gtU2l6ZTogXCIgKyBKU09OLnN0cmluZ2lmeShwYXRjaFNpemUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlucHV0U3RyZWFtLnNldFdpZHRoKE1hdGguZmxvb3IoTWF0aC5mbG9vcihzaXplLnggLyBwYXRjaFNpemUueCkgKiAoMSAvIGhhbGZTYW1wbGUpICogcGF0Y2hTaXplLngpKTtcbiAgICAgICAgaW5wdXRTdHJlYW0uc2V0SGVpZ2h0KE1hdGguZmxvb3IoTWF0aC5mbG9vcihzaXplLnkgLyBwYXRjaFNpemUueSkgKiAoMSAvIGhhbGZTYW1wbGUpICogcGF0Y2hTaXplLnkpKTtcblxuICAgICAgICBpZiAoKGlucHV0U3RyZWFtLmdldFdpZHRoKCkgJSBwYXRjaFNpemUueCkgPT09IDAgJiYgKGlucHV0U3RyZWFtLmdldEhlaWdodCgpICUgcGF0Y2hTaXplLnkpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkltYWdlIGRpbWVuc2lvbnMgZG8gbm90IGNvbXBseSB3aXRoIHRoZSBjdXJyZW50IHNldHRpbmdzOiBXaWR0aCAoXCIgK1xuICAgICAgICAgICAgd2lkdGggKyBcIiApYW5kIGhlaWdodCAoXCIgKyBoZWlnaHQgK1xuICAgICAgICAgICAgXCIpIG11c3QgYSBtdWx0aXBsZSBvZiBcIiArIHBhdGNoU2l6ZS54KTtcbiAgICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xvY2F0b3IvYmFyY29kZV9sb2NhdG9yLmpzIiwiaW1wb3J0IFRyYWNlciBmcm9tICcuL3RyYWNlcic7XG5cbi8qKlxuICogaHR0cDovL3d3dy5jb2RlcHJvamVjdC5jb20vVGlwcy80MDcxNzIvQ29ubmVjdGVkLUNvbXBvbmVudC1MYWJlbGluZy1hbmQtVmVjdG9yaXphdGlvblxuICovXG52YXIgUmFzdGVyaXplciA9IHtcbiAgICBjcmVhdGVDb250b3VyMkQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlyOiBudWxsLFxuICAgICAgICAgICAgaW5kZXg6IG51bGwsXG4gICAgICAgICAgICBmaXJzdFZlcnRleDogbnVsbCxcbiAgICAgICAgICAgIGluc2lkZUNvbnRvdXJzOiBudWxsLFxuICAgICAgICAgICAgbmV4dHBlZXI6IG51bGwsXG4gICAgICAgICAgICBwcmV2cGVlcjogbnVsbFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgQ09OVE9VUl9ESVI6IHtcbiAgICAgICAgQ1dfRElSOiAwLFxuICAgICAgICBDQ1dfRElSOiAxLFxuICAgICAgICBVTktOT1dOX0RJUjogMlxuICAgIH0sXG4gICAgRElSOiB7XG4gICAgICAgIE9VVFNJREVfRURHRTogLTMyNzY3LFxuICAgICAgICBJTlNJREVfRURHRTogLTMyNzY2XG4gICAgfSxcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgbGFiZWxXcmFwcGVyKSB7XG4gICAgICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YSxcbiAgICAgICAgICAgIGxhYmVsRGF0YSA9IGxhYmVsV3JhcHBlci5kYXRhLFxuICAgICAgICAgICAgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54LFxuICAgICAgICAgICAgaGVpZ2h0ID0gaW1hZ2VXcmFwcGVyLnNpemUueSxcbiAgICAgICAgICAgIHRyYWNlciA9IFRyYWNlci5jcmVhdGUoaW1hZ2VXcmFwcGVyLCBsYWJlbFdyYXBwZXIpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByYXN0ZXJpemU6IGZ1bmN0aW9uKGRlcHRobGFiZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIGJjLFxuICAgICAgICAgICAgICAgICAgICBsYyxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgY3gsXG4gICAgICAgICAgICAgICAgICAgIGN5LFxuICAgICAgICAgICAgICAgICAgICBjb2xvck1hcCA9IFtdLFxuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXgsXG4gICAgICAgICAgICAgICAgICAgIHAsXG4gICAgICAgICAgICAgICAgICAgIGNjLFxuICAgICAgICAgICAgICAgICAgICBzYyxcbiAgICAgICAgICAgICAgICAgICAgcG9zLFxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0ZWRDb3VudCA9IDAsXG4gICAgICAgICAgICAgICAgICAgIGk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IDQwMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yTWFwW2ldID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb2xvck1hcFswXSA9IGltYWdlRGF0YVswXTtcbiAgICAgICAgICAgICAgICBjYyA9IG51bGw7XG4gICAgICAgICAgICAgICAgZm9yICggY3kgPSAxOyBjeSA8IGhlaWdodCAtIDE7IGN5KyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGJjID0gY29sb3JNYXBbMF07XG4gICAgICAgICAgICAgICAgICAgIGZvciAoIGN4ID0gMTsgY3ggPCB3aWR0aCAtIDE7IGN4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcyA9IGN5ICogd2lkdGggKyBjeDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbERhdGFbcG9zXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gaW1hZ2VEYXRhW3Bvc107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9yICE9PSBiYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWxpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGMgPSBjb25uZWN0ZWRDb3VudCArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvck1hcFtsY10gPSBjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJjID0gY29sb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXggPSB0cmFjZXIuY29udG91clRyYWNpbmcoY3ksIGN4LCBsYywgY29sb3IsIFJhc3Rlcml6ZXIuRElSLk9VVFNJREVfRURHRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmVydGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGVkQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbGluZGV4ID0gbGM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcCA9IFJhc3Rlcml6ZXIuY3JlYXRlQ29udG91cjJEKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5kaXIgPSBSYXN0ZXJpemVyLkNPTlRPVVJfRElSLkNXX0RJUjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmluZGV4ID0gbGFiZWxpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmZpcnN0VmVydGV4ID0gdmVydGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubmV4dHBlZXIgPSBjYztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmluc2lkZUNvbnRvdXJzID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2MgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MucHJldnBlZXIgPSBwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYyA9IHA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXggPSB0cmFjZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY29udG91clRyYWNpbmcoY3ksIGN4LCBSYXN0ZXJpemVyLkRJUi5JTlNJREVfRURHRSwgY29sb3IsIGxhYmVsaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZlcnRleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBSYXN0ZXJpemVyLmNyZWF0ZUNvbnRvdXIyRCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuZmlyc3RWZXJ0ZXggPSB2ZXJ0ZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5pbnNpZGVDb250b3VycyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlcHRobGFiZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5kaXIgPSBSYXN0ZXJpemVyLkNPTlRPVVJfRElSLkNDV19ESVI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5kaXIgPSBSYXN0ZXJpemVyLkNPTlRPVVJfRElSLkNXX0RJUjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5pbmRleCA9IGRlcHRobGFiZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2MgPSBjYztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKHNjICE9PSBudWxsKSAmJiBzYy5pbmRleCAhPT0gbGFiZWxpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYyA9IHNjLm5leHRwZWVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2MgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5uZXh0cGVlciA9IHNjLmluc2lkZUNvbnRvdXJzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2MuaW5zaWRlQ29udG91cnMgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjLmluc2lkZUNvbnRvdXJzLnByZXZwZWVyID0gcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYy5pbnNpZGVDb250b3VycyA9IHA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxEYXRhW3Bvc10gPSBsYWJlbGluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGFiZWxEYXRhW3Bvc10gPT09IFJhc3Rlcml6ZXIuRElSLk9VVFNJREVfRURHRVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBsYWJlbERhdGFbcG9zXSA9PT0gUmFzdGVyaXplci5ESVIuSU5TSURFX0VER0UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWxEYXRhW3Bvc10gPT09IFJhc3Rlcml6ZXIuRElSLklOU0lERV9FREdFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJjID0gaW1hZ2VEYXRhW3Bvc107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmMgPSBjb2xvck1hcFswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsaW5kZXggPSBsYWJlbERhdGFbcG9zXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYyA9IGNvbG9yTWFwW2xhYmVsaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNjID0gY2M7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHNjICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjLmluZGV4ID0gZGVwdGhsYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgc2MgPSBzYy5uZXh0cGVlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY2M6IGNjLFxuICAgICAgICAgICAgICAgICAgICBjb3VudDogY29ubmVjdGVkQ291bnRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlYnVnOiB7XG4gICAgICAgICAgICAgICAgZHJhd0NvbnRvdXI6IGZ1bmN0aW9uKGNhbnZhcywgZmlyc3RDb250b3VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHEgPSBmaXJzdENvbnRvdXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpcSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHEsXG4gICAgICAgICAgICAgICAgICAgICAgICBwO1xuXG4gICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwicmVkXCI7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJlZFwiO1xuICAgICAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocHEgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlxID0gcHEuaW5zaWRlQ29udG91cnM7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpcSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAocHEgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpcSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHEgPSBpcTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcSA9IGlxLm5leHRwZWVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxID0gcHE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHEgPSBwcS5uZXh0cGVlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHEgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXEgPSBwcS5pbnNpZGVDb250b3VycztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHEuZGlyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFJhc3Rlcml6ZXIuQ09OVE9VUl9ESVIuQ1dfRElSOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwicmVkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFJhc3Rlcml6ZXIuQ09OVE9VUl9ESVIuQ0NXX0RJUjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsdWVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUmFzdGVyaXplci5DT05UT1VSX0RJUi5VTktOT1dOX0RJUjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBxLmZpcnN0VmVydGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4Lm1vdmVUbyhwLngsIHAueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcCA9IHAubmV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHgubGluZVRvKHAueCwgcC55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKHAgIT09IHEuZmlyc3RWZXJ0ZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJhc3Rlcml6ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbG9jYXRvci9yYXN0ZXJpemVyLmpzIiwiLyogQHByZXNlcnZlIEFTTSBCRUdJTiAqL1xuLyogZXNsaW50LWRpc2FibGUgZXFlcWVxKi9cbmZ1bmN0aW9uIFNrZWxldG9uaXplcihzdGRsaWIsIGZvcmVpZ24sIGJ1ZmZlcikge1xuICAgIFwidXNlIGFzbVwiO1xuXG4gICAgdmFyIGltYWdlcyA9IG5ldyBzdGRsaWIuVWludDhBcnJheShidWZmZXIpLFxuICAgICAgICBzaXplID0gZm9yZWlnbi5zaXplIHwgMCxcbiAgICAgICAgaW11bCA9IHN0ZGxpYi5NYXRoLmltdWw7XG5cbiAgICBmdW5jdGlvbiBlcm9kZShpbkltYWdlUHRyLCBvdXRJbWFnZVB0cikge1xuICAgICAgICBpbkltYWdlUHRyID0gaW5JbWFnZVB0ciB8IDA7XG4gICAgICAgIG91dEltYWdlUHRyID0gb3V0SW1hZ2VQdHIgfCAwO1xuXG4gICAgICAgIHZhciB2ID0gMCxcbiAgICAgICAgICAgIHUgPSAwLFxuICAgICAgICAgICAgc3VtID0gMCxcbiAgICAgICAgICAgIHlTdGFydDEgPSAwLFxuICAgICAgICAgICAgeVN0YXJ0MiA9IDAsXG4gICAgICAgICAgICB4U3RhcnQxID0gMCxcbiAgICAgICAgICAgIHhTdGFydDIgPSAwLFxuICAgICAgICAgICAgb2Zmc2V0ID0gMDtcblxuICAgICAgICBmb3IgKCB2ID0gMTsgKHYgfCAwKSA8ICgoc2l6ZSAtIDEpIHwgMCk7IHYgPSAodiArIDEpIHwgMCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gKG9mZnNldCArIHNpemUpIHwgMDtcbiAgICAgICAgICAgIGZvciAoIHUgPSAxOyAodSB8IDApIDwgKChzaXplIC0gMSkgfCAwKTsgdSA9ICh1ICsgMSkgfCAwKSB7XG4gICAgICAgICAgICAgICAgeVN0YXJ0MSA9IChvZmZzZXQgLSBzaXplKSB8IDA7XG4gICAgICAgICAgICAgICAgeVN0YXJ0MiA9IChvZmZzZXQgKyBzaXplKSB8IDA7XG4gICAgICAgICAgICAgICAgeFN0YXJ0MSA9ICh1IC0gMSkgfCAwO1xuICAgICAgICAgICAgICAgIHhTdGFydDIgPSAodSArIDEpIHwgMDtcbiAgICAgICAgICAgICAgICBzdW0gPSAoKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDEgKyB4U3RhcnQxKSB8IDBdIHwgMClcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MSArIHhTdGFydDIpIHwgMF0gfCAwKVxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyBvZmZzZXQgKyB1KSB8IDBdIHwgMClcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MiArIHhTdGFydDEpIHwgMF0gfCAwKVxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQyICsgeFN0YXJ0MikgfCAwXSB8IDApKSB8IDA7XG4gICAgICAgICAgICAgICAgaWYgKChzdW0gfCAwKSA9PSAoNSB8IDApKSB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlc1sob3V0SW1hZ2VQdHIgKyBvZmZzZXQgKyB1KSB8IDBdID0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZXNbKG91dEltYWdlUHRyICsgb2Zmc2V0ICsgdSkgfCAwXSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdWJ0cmFjdChhSW1hZ2VQdHIsIGJJbWFnZVB0ciwgb3V0SW1hZ2VQdHIpIHtcbiAgICAgICAgYUltYWdlUHRyID0gYUltYWdlUHRyIHwgMDtcbiAgICAgICAgYkltYWdlUHRyID0gYkltYWdlUHRyIHwgMDtcbiAgICAgICAgb3V0SW1hZ2VQdHIgPSBvdXRJbWFnZVB0ciB8IDA7XG5cbiAgICAgICAgdmFyIGxlbmd0aCA9IDA7XG5cbiAgICAgICAgbGVuZ3RoID0gaW11bChzaXplLCBzaXplKSB8IDA7XG5cbiAgICAgICAgd2hpbGUgKChsZW5ndGggfCAwKSA+IDApIHtcbiAgICAgICAgICAgIGxlbmd0aCA9IChsZW5ndGggLSAxKSB8IDA7XG4gICAgICAgICAgICBpbWFnZXNbKG91dEltYWdlUHRyICsgbGVuZ3RoKSB8IDBdID1cbiAgICAgICAgICAgICAgICAoKGltYWdlc1soYUltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCkgLSAoaW1hZ2VzWyhiSW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKSkgfCAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYml0d2lzZU9yKGFJbWFnZVB0ciwgYkltYWdlUHRyLCBvdXRJbWFnZVB0cikge1xuICAgICAgICBhSW1hZ2VQdHIgPSBhSW1hZ2VQdHIgfCAwO1xuICAgICAgICBiSW1hZ2VQdHIgPSBiSW1hZ2VQdHIgfCAwO1xuICAgICAgICBvdXRJbWFnZVB0ciA9IG91dEltYWdlUHRyIHwgMDtcblxuICAgICAgICB2YXIgbGVuZ3RoID0gMDtcblxuICAgICAgICBsZW5ndGggPSBpbXVsKHNpemUsIHNpemUpIHwgMDtcblxuICAgICAgICB3aGlsZSAoKGxlbmd0aCB8IDApID4gMCkge1xuICAgICAgICAgICAgbGVuZ3RoID0gKGxlbmd0aCAtIDEpIHwgMDtcbiAgICAgICAgICAgIGltYWdlc1sob3V0SW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gPVxuICAgICAgICAgICAgICAgICgoaW1hZ2VzWyhhSW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKSB8IChpbWFnZXNbKGJJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSB8IDApKSB8IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb3VudE5vblplcm8oaW1hZ2VQdHIpIHtcbiAgICAgICAgaW1hZ2VQdHIgPSBpbWFnZVB0ciB8IDA7XG5cbiAgICAgICAgdmFyIHN1bSA9IDAsXG4gICAgICAgICAgICBsZW5ndGggPSAwO1xuXG4gICAgICAgIGxlbmd0aCA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xuXG4gICAgICAgIHdoaWxlICgobGVuZ3RoIHwgMCkgPiAwKSB7XG4gICAgICAgICAgICBsZW5ndGggPSAobGVuZ3RoIC0gMSkgfCAwO1xuICAgICAgICAgICAgc3VtID0gKChzdW0gfCAwKSArIChpbWFnZXNbKGltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCkpIHwgMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoc3VtIHwgMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdChpbWFnZVB0ciwgdmFsdWUpIHtcbiAgICAgICAgaW1hZ2VQdHIgPSBpbWFnZVB0ciB8IDA7XG4gICAgICAgIHZhbHVlID0gdmFsdWUgfCAwO1xuXG4gICAgICAgIHZhciBsZW5ndGggPSAwO1xuXG4gICAgICAgIGxlbmd0aCA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xuXG4gICAgICAgIHdoaWxlICgobGVuZ3RoIHwgMCkgPiAwKSB7XG4gICAgICAgICAgICBsZW5ndGggPSAobGVuZ3RoIC0gMSkgfCAwO1xuICAgICAgICAgICAgaW1hZ2VzWyhpbWFnZVB0ciArIGxlbmd0aCkgfCAwXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlsYXRlKGluSW1hZ2VQdHIsIG91dEltYWdlUHRyKSB7XG4gICAgICAgIGluSW1hZ2VQdHIgPSBpbkltYWdlUHRyIHwgMDtcbiAgICAgICAgb3V0SW1hZ2VQdHIgPSBvdXRJbWFnZVB0ciB8IDA7XG5cbiAgICAgICAgdmFyIHYgPSAwLFxuICAgICAgICAgICAgdSA9IDAsXG4gICAgICAgICAgICBzdW0gPSAwLFxuICAgICAgICAgICAgeVN0YXJ0MSA9IDAsXG4gICAgICAgICAgICB5U3RhcnQyID0gMCxcbiAgICAgICAgICAgIHhTdGFydDEgPSAwLFxuICAgICAgICAgICAgeFN0YXJ0MiA9IDAsXG4gICAgICAgICAgICBvZmZzZXQgPSAwO1xuXG4gICAgICAgIGZvciAoIHYgPSAxOyAodiB8IDApIDwgKChzaXplIC0gMSkgfCAwKTsgdiA9ICh2ICsgMSkgfCAwKSB7XG4gICAgICAgICAgICBvZmZzZXQgPSAob2Zmc2V0ICsgc2l6ZSkgfCAwO1xuICAgICAgICAgICAgZm9yICggdSA9IDE7ICh1IHwgMCkgPCAoKHNpemUgLSAxKSB8IDApOyB1ID0gKHUgKyAxKSB8IDApIHtcbiAgICAgICAgICAgICAgICB5U3RhcnQxID0gKG9mZnNldCAtIHNpemUpIHwgMDtcbiAgICAgICAgICAgICAgICB5U3RhcnQyID0gKG9mZnNldCArIHNpemUpIHwgMDtcbiAgICAgICAgICAgICAgICB4U3RhcnQxID0gKHUgLSAxKSB8IDA7XG4gICAgICAgICAgICAgICAgeFN0YXJ0MiA9ICh1ICsgMSkgfCAwO1xuICAgICAgICAgICAgICAgIHN1bSA9ICgoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MSArIHhTdGFydDEpIHwgMF0gfCAwKVxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQxICsgeFN0YXJ0MikgfCAwXSB8IDApXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIG9mZnNldCArIHUpIHwgMF0gfCAwKVxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQyICsgeFN0YXJ0MSkgfCAwXSB8IDApXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDIgKyB4U3RhcnQyKSB8IDBdIHwgMCkpIHwgMDtcbiAgICAgICAgICAgICAgICBpZiAoKHN1bSB8IDApID4gKDAgfCAwKSkge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZXNbKG91dEltYWdlUHRyICsgb2Zmc2V0ICsgdSkgfCAwXSA9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIG9mZnNldCArIHUpIHwgMF0gPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWVtY3B5KHNyY0ltYWdlUHRyLCBkc3RJbWFnZVB0cikge1xuICAgICAgICBzcmNJbWFnZVB0ciA9IHNyY0ltYWdlUHRyIHwgMDtcbiAgICAgICAgZHN0SW1hZ2VQdHIgPSBkc3RJbWFnZVB0ciB8IDA7XG5cbiAgICAgICAgdmFyIGxlbmd0aCA9IDA7XG5cbiAgICAgICAgbGVuZ3RoID0gaW11bChzaXplLCBzaXplKSB8IDA7XG5cbiAgICAgICAgd2hpbGUgKChsZW5ndGggfCAwKSA+IDApIHtcbiAgICAgICAgICAgIGxlbmd0aCA9IChsZW5ndGggLSAxKSB8IDA7XG4gICAgICAgICAgICBpbWFnZXNbKGRzdEltYWdlUHRyICsgbGVuZ3RoKSB8IDBdID0gKGltYWdlc1soc3JjSW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHplcm9Cb3JkZXIoaW1hZ2VQdHIpIHtcbiAgICAgICAgaW1hZ2VQdHIgPSBpbWFnZVB0ciB8IDA7XG5cbiAgICAgICAgdmFyIHggPSAwLFxuICAgICAgICAgICAgeSA9IDA7XG5cbiAgICAgICAgZm9yICggeCA9IDA7ICh4IHwgMCkgPCAoKHNpemUgLSAxKSB8IDApOyB4ID0gKHggKyAxKSB8IDApIHtcbiAgICAgICAgICAgIGltYWdlc1soaW1hZ2VQdHIgKyB4KSB8IDBdID0gMDtcbiAgICAgICAgICAgIGltYWdlc1soaW1hZ2VQdHIgKyB5KSB8IDBdID0gMDtcbiAgICAgICAgICAgIHkgPSAoKHkgKyBzaXplKSAtIDEpIHwgMDtcbiAgICAgICAgICAgIGltYWdlc1soaW1hZ2VQdHIgKyB5KSB8IDBdID0gMDtcbiAgICAgICAgICAgIHkgPSAoeSArIDEpIHwgMDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKCB4ID0gMDsgKHggfCAwKSA8IChzaXplIHwgMCk7IHggPSAoeCArIDEpIHwgMCkge1xuICAgICAgICAgICAgaW1hZ2VzWyhpbWFnZVB0ciArIHkpIHwgMF0gPSAwO1xuICAgICAgICAgICAgeSA9ICh5ICsgMSkgfCAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2tlbGV0b25pemUoKSB7XG4gICAgICAgIHZhciBzdWJJbWFnZVB0ciA9IDAsXG4gICAgICAgICAgICBlcm9kZWRJbWFnZVB0ciA9IDAsXG4gICAgICAgICAgICB0ZW1wSW1hZ2VQdHIgPSAwLFxuICAgICAgICAgICAgc2tlbEltYWdlUHRyID0gMCxcbiAgICAgICAgICAgIHN1bSA9IDAsXG4gICAgICAgICAgICBkb25lID0gMDtcblxuICAgICAgICBlcm9kZWRJbWFnZVB0ciA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xuICAgICAgICB0ZW1wSW1hZ2VQdHIgPSAoZXJvZGVkSW1hZ2VQdHIgKyBlcm9kZWRJbWFnZVB0cikgfCAwO1xuICAgICAgICBza2VsSW1hZ2VQdHIgPSAodGVtcEltYWdlUHRyICsgZXJvZGVkSW1hZ2VQdHIpIHwgMDtcblxuICAgICAgICAvLyBpbml0IHNrZWwtaW1hZ2VcbiAgICAgICAgaW5pdChza2VsSW1hZ2VQdHIsIDApO1xuICAgICAgICB6ZXJvQm9yZGVyKHN1YkltYWdlUHRyKTtcblxuICAgICAgICBkbyB7XG4gICAgICAgICAgICBlcm9kZShzdWJJbWFnZVB0ciwgZXJvZGVkSW1hZ2VQdHIpO1xuICAgICAgICAgICAgZGlsYXRlKGVyb2RlZEltYWdlUHRyLCB0ZW1wSW1hZ2VQdHIpO1xuICAgICAgICAgICAgc3VidHJhY3Qoc3ViSW1hZ2VQdHIsIHRlbXBJbWFnZVB0ciwgdGVtcEltYWdlUHRyKTtcbiAgICAgICAgICAgIGJpdHdpc2VPcihza2VsSW1hZ2VQdHIsIHRlbXBJbWFnZVB0ciwgc2tlbEltYWdlUHRyKTtcbiAgICAgICAgICAgIG1lbWNweShlcm9kZWRJbWFnZVB0ciwgc3ViSW1hZ2VQdHIpO1xuICAgICAgICAgICAgc3VtID0gY291bnROb25aZXJvKHN1YkltYWdlUHRyKSB8IDA7XG4gICAgICAgICAgICBkb25lID0gKChzdW0gfCAwKSA9PSAwIHwgMCk7XG4gICAgICAgIH0gd2hpbGUgKCFkb25lKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2tlbGV0b25pemU6IHNrZWxldG9uaXplXG4gICAgfTtcbn1cbi8qIEBwcmVzZXJ2ZSBBU00gRU5EICovXG5leHBvcnQgZGVmYXVsdCBTa2VsZXRvbml6ZXI7XG4vKiBlc2xpbnQtZW5hYmxlIGVxZXFlcSovXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbG9jYXRvci9za2VsZXRvbml6ZXIuanMiLCJpbXBvcnQgQmFyY29kZVJlYWRlciBmcm9tICcuL2JhcmNvZGVfcmVhZGVyJztcblxuZnVuY3Rpb24gQ29kYWJhclJlYWRlcigpIHtcbiAgICBCYXJjb2RlUmVhZGVyLmNhbGwodGhpcyk7XG4gICAgdGhpcy5fY291bnRlcnMgPSBbXTtcbn1cblxudmFyIHByb3BlcnRpZXMgPSB7XG4gICAgQUxQSEFCRVRIX1NUUklORzoge3ZhbHVlOiBcIjAxMjM0NTY3ODktJDovLitBQkNEXCJ9LFxuICAgIEFMUEhBQkVUOiB7dmFsdWU6IFs0OCwgNDksIDUwLCA1MSwgNTIsIDUzLCA1NCwgNTUsIDU2LCA1NywgNDUsIDM2LCA1OCwgNDcsIDQ2LCA0MywgNjUsIDY2LCA2NywgNjhdfSxcbiAgICBDSEFSQUNURVJfRU5DT0RJTkdTOiB7dmFsdWU6IFsweDAwMywgMHgwMDYsIDB4MDA5LCAweDA2MCwgMHgwMTIsIDB4MDQyLCAweDAyMSwgMHgwMjQsIDB4MDMwLCAweDA0OCwgMHgwMGMsIDB4MDE4LFxuICAgICAgICAweDA0NSwgMHgwNTEsIDB4MDU0LCAweDAxNSwgMHgwMUEsIDB4MDI5LCAweDAwQiwgMHgwMEVdfSxcbiAgICBTVEFSVF9FTkQ6IHt2YWx1ZTogWzB4MDFBLCAweDAyOSwgMHgwMEIsIDB4MDBFXX0sXG4gICAgTUlOX0VOQ09ERURfQ0hBUlM6IHt2YWx1ZTogNH0sXG4gICAgTUFYX0FDQ0VQVEFCTEU6IHt2YWx1ZTogMi4wfSxcbiAgICBQQURESU5HOiB7dmFsdWU6IDEuNX0sXG4gICAgRk9STUFUOiB7dmFsdWU6IFwiY29kYWJhclwiLCB3cml0ZWFibGU6IGZhbHNlfVxufTtcblxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29kYWJhclJlYWRlcjtcblxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgIHN0YXJ0LFxuICAgICAgICBkZWNvZGVkQ2hhcixcbiAgICAgICAgcGF0dGVybixcbiAgICAgICAgbmV4dFN0YXJ0LFxuICAgICAgICBlbmQ7XG5cbiAgICB0aGlzLl9jb3VudGVycyA9IHNlbGYuX2ZpbGxDb3VudGVycygpO1xuICAgIHN0YXJ0ID0gc2VsZi5fZmluZFN0YXJ0KCk7XG4gICAgaWYgKCFzdGFydCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgbmV4dFN0YXJ0ID0gc3RhcnQuc3RhcnRDb3VudGVyO1xuXG4gICAgZG8ge1xuICAgICAgICBwYXR0ZXJuID0gc2VsZi5fdG9QYXR0ZXJuKG5leHRTdGFydCk7XG4gICAgICAgIGlmIChwYXR0ZXJuIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZGVjb2RlZENoYXIgPSBzZWxmLl9wYXR0ZXJuVG9DaGFyKHBhdHRlcm4pO1xuICAgICAgICBpZiAoZGVjb2RlZENoYXIgPCAwKXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdC5wdXNoKGRlY29kZWRDaGFyKTtcbiAgICAgICAgbmV4dFN0YXJ0ICs9IDg7XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMSAmJiBzZWxmLl9pc1N0YXJ0RW5kKHBhdHRlcm4pKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0gd2hpbGUgKG5leHRTdGFydCA8IHNlbGYuX2NvdW50ZXJzLmxlbmd0aCk7XG5cbiAgICAvLyB2ZXJpZnkgZW5kXG4gICAgaWYgKChyZXN1bHQubGVuZ3RoIC0gMikgPCBzZWxmLk1JTl9FTkNPREVEX0NIQVJTIHx8ICFzZWxmLl9pc1N0YXJ0RW5kKHBhdHRlcm4pKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHZlcmlmeSBlbmQgd2hpdGUgc3BhY2VcbiAgICBpZiAoIXNlbGYuX3ZlcmlmeVdoaXRlc3BhY2Uoc3RhcnQuc3RhcnRDb3VudGVyLCBuZXh0U3RhcnQgLSA4KSl7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICghc2VsZi5fdmFsaWRhdGVSZXN1bHQocmVzdWx0LCBzdGFydC5zdGFydENvdW50ZXIpKXtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbmV4dFN0YXJ0ID0gbmV4dFN0YXJ0ID4gc2VsZi5fY291bnRlcnMubGVuZ3RoID8gc2VsZi5fY291bnRlcnMubGVuZ3RoIDogbmV4dFN0YXJ0O1xuICAgIGVuZCA9IHN0YXJ0LnN0YXJ0ICsgc2VsZi5fc3VtQ291bnRlcnMoc3RhcnQuc3RhcnRDb3VudGVyLCBuZXh0U3RhcnQgLSA4KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGNvZGU6IHJlc3VsdC5qb2luKFwiXCIpLFxuICAgICAgICBzdGFydDogc3RhcnQuc3RhcnQsXG4gICAgICAgIGVuZDogZW5kLFxuICAgICAgICBzdGFydEluZm86IHN0YXJ0LFxuICAgICAgICBkZWNvZGVkQ29kZXM6IHJlc3VsdFxuICAgIH07XG59O1xuXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fdmVyaWZ5V2hpdGVzcGFjZSA9IGZ1bmN0aW9uKHN0YXJ0Q291bnRlciwgZW5kQ291bnRlcikge1xuICAgIGlmICgoc3RhcnRDb3VudGVyIC0gMSA8PSAwKVxuICAgICAgICAgICAgfHwgdGhpcy5fY291bnRlcnNbc3RhcnRDb3VudGVyIC0gMV0gPj0gKHRoaXMuX2NhbGN1bGF0ZVBhdHRlcm5MZW5ndGgoc3RhcnRDb3VudGVyKSAvIDIuMCkpIHtcbiAgICAgICAgaWYgKChlbmRDb3VudGVyICsgOCA+PSB0aGlzLl9jb3VudGVycy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5fY291bnRlcnNbZW5kQ291bnRlciArIDddID49ICh0aGlzLl9jYWxjdWxhdGVQYXR0ZXJuTGVuZ3RoKGVuZENvdW50ZXIpIC8gMi4wKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2NhbGN1bGF0ZVBhdHRlcm5MZW5ndGggPSBmdW5jdGlvbihvZmZzZXQpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgc3VtID0gMDtcblxuICAgIGZvciAoaSA9IG9mZnNldDsgaSA8IG9mZnNldCArIDc7IGkrKykge1xuICAgICAgICBzdW0gKz0gdGhpcy5fY291bnRlcnNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1bTtcbn07XG5cbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl90aHJlc2hvbGRSZXN1bHRQYXR0ZXJuID0gZnVuY3Rpb24ocmVzdWx0LCBzdGFydENvdW50ZXIpe1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgY2F0ZWdvcml6YXRpb24gPSB7XG4gICAgICAgICAgICBzcGFjZToge1xuICAgICAgICAgICAgICAgIG5hcnJvdzogeyBzaXplOiAwLCBjb3VudHM6IDAsIG1pbjogMCwgbWF4OiBOdW1iZXIuTUFYX1ZBTFVFfSxcbiAgICAgICAgICAgICAgICB3aWRlOiB7c2l6ZTogMCwgY291bnRzOiAwLCBtaW46IDAsIG1heDogTnVtYmVyLk1BWF9WQUxVRX1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXI6IHtcbiAgICAgICAgICAgICAgICBuYXJyb3c6IHsgc2l6ZTogMCwgY291bnRzOiAwLCBtaW46IDAsIG1heDogTnVtYmVyLk1BWF9WQUxVRX0sXG4gICAgICAgICAgICAgICAgd2lkZTogeyBzaXplOiAwLCBjb3VudHM6IDAsIG1pbjogMCwgbWF4OiBOdW1iZXIuTUFYX1ZBTFVFfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBraW5kLFxuICAgICAgICBjYXQsXG4gICAgICAgIGksXG4gICAgICAgIGosXG4gICAgICAgIHBvcyA9IHN0YXJ0Q291bnRlcixcbiAgICAgICAgcGF0dGVybjtcblxuICAgIGZvciAoaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspe1xuICAgICAgICBwYXR0ZXJuID0gc2VsZi5fY2hhclRvUGF0dGVybihyZXN1bHRbaV0pO1xuICAgICAgICBmb3IgKGogPSA2OyBqID49IDA7IGotLSkge1xuICAgICAgICAgICAga2luZCA9IChqICYgMSkgPT09IDIgPyBjYXRlZ29yaXphdGlvbi5iYXIgOiBjYXRlZ29yaXphdGlvbi5zcGFjZTtcbiAgICAgICAgICAgIGNhdCA9IChwYXR0ZXJuICYgMSkgPT09IDEgPyBraW5kLndpZGUgOiBraW5kLm5hcnJvdztcbiAgICAgICAgICAgIGNhdC5zaXplICs9IHNlbGYuX2NvdW50ZXJzW3BvcyArIGpdO1xuICAgICAgICAgICAgY2F0LmNvdW50cysrO1xuICAgICAgICAgICAgcGF0dGVybiA+Pj0gMTtcbiAgICAgICAgfVxuICAgICAgICBwb3MgKz0gODtcbiAgICB9XG5cbiAgICBbXCJzcGFjZVwiLCBcImJhclwiXS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICB2YXIgbmV3a2luZCA9IGNhdGVnb3JpemF0aW9uW2tleV07XG4gICAgICAgIG5ld2tpbmQud2lkZS5taW4gPVxuICAgICAgICAgICAgTWF0aC5mbG9vcigobmV3a2luZC5uYXJyb3cuc2l6ZSAvIG5ld2tpbmQubmFycm93LmNvdW50cyArIG5ld2tpbmQud2lkZS5zaXplIC8gbmV3a2luZC53aWRlLmNvdW50cykgLyAyKTtcbiAgICAgICAgbmV3a2luZC5uYXJyb3cubWF4ID0gTWF0aC5jZWlsKG5ld2tpbmQud2lkZS5taW4pO1xuICAgICAgICBuZXdraW5kLndpZGUubWF4ID0gTWF0aC5jZWlsKChuZXdraW5kLndpZGUuc2l6ZSAqIHNlbGYuTUFYX0FDQ0VQVEFCTEUgKyBzZWxmLlBBRERJTkcpIC8gbmV3a2luZC53aWRlLmNvdW50cyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY2F0ZWdvcml6YXRpb247XG59O1xuXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fY2hhclRvUGF0dGVybiA9IGZ1bmN0aW9uKGNoYXIpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGNoYXJDb2RlID0gY2hhci5jaGFyQ29kZUF0KDApLFxuICAgICAgICBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHNlbGYuQUxQSEFCRVQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuQUxQSEFCRVRbaV0gPT09IGNoYXJDb2RlKXtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1NbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDB4MDtcbn07XG5cbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl92YWxpZGF0ZVJlc3VsdCA9IGZ1bmN0aW9uKHJlc3VsdCwgc3RhcnRDb3VudGVyKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICB0aHJlc2hvbGRzID0gc2VsZi5fdGhyZXNob2xkUmVzdWx0UGF0dGVybihyZXN1bHQsIHN0YXJ0Q291bnRlciksXG4gICAgICAgIGksXG4gICAgICAgIGosXG4gICAgICAgIGtpbmQsXG4gICAgICAgIGNhdCxcbiAgICAgICAgc2l6ZSxcbiAgICAgICAgcG9zID0gc3RhcnRDb3VudGVyLFxuICAgICAgICBwYXR0ZXJuO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXR0ZXJuID0gc2VsZi5fY2hhclRvUGF0dGVybihyZXN1bHRbaV0pO1xuICAgICAgICBmb3IgKGogPSA2OyBqID49IDA7IGotLSkge1xuICAgICAgICAgICAga2luZCA9IChqICYgMSkgPT09IDAgPyB0aHJlc2hvbGRzLmJhciA6IHRocmVzaG9sZHMuc3BhY2U7XG4gICAgICAgICAgICBjYXQgPSAocGF0dGVybiAmIDEpID09PSAxID8ga2luZC53aWRlIDoga2luZC5uYXJyb3c7XG4gICAgICAgICAgICBzaXplID0gc2VsZi5fY291bnRlcnNbcG9zICsgal07XG4gICAgICAgICAgICBpZiAoc2l6ZSA8IGNhdC5taW4gfHwgc2l6ZSA+IGNhdC5tYXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXR0ZXJuID4+PSAxO1xuICAgICAgICB9XG4gICAgICAgIHBvcyArPSA4O1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl9wYXR0ZXJuVG9DaGFyID0gZnVuY3Rpb24ocGF0dGVybikge1xuICAgIHZhciBpLFxuICAgICAgICBzZWxmID0gdGhpcztcblxuICAgIGZvciAoaSA9IDA7IGkgPCBzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuQ0hBUkFDVEVSX0VOQ09ESU5HU1tpXSA9PT0gcGF0dGVybikge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoc2VsZi5BTFBIQUJFVFtpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufTtcblxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2NvbXB1dGVBbHRlcm5hdGluZ1RocmVzaG9sZCA9IGZ1bmN0aW9uKG9mZnNldCwgZW5kKSB7XG4gICAgdmFyIGksXG4gICAgICAgIG1pbiA9IE51bWJlci5NQVhfVkFMVUUsXG4gICAgICAgIG1heCA9IDAsXG4gICAgICAgIGNvdW50ZXI7XG5cbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBlbmQ7IGkgKz0gMil7XG4gICAgICAgIGNvdW50ZXIgPSB0aGlzLl9jb3VudGVyc1tpXTtcbiAgICAgICAgaWYgKGNvdW50ZXIgPiBtYXgpIHtcbiAgICAgICAgICAgIG1heCA9IGNvdW50ZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvdW50ZXIgPCBtaW4pIHtcbiAgICAgICAgICAgIG1pbiA9IGNvdW50ZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKChtaW4gKyBtYXgpIC8gMi4wKSB8IDA7XG59O1xuXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fdG9QYXR0ZXJuID0gZnVuY3Rpb24ob2Zmc2V0KSB7XG4gICAgdmFyIG51bUNvdW50ZXJzID0gNyxcbiAgICAgICAgZW5kID0gb2Zmc2V0ICsgbnVtQ291bnRlcnMsXG4gICAgICAgIGJhclRocmVzaG9sZCxcbiAgICAgICAgc3BhY2VUaHJlc2hvbGQsXG4gICAgICAgIGJpdG1hc2sgPSAxIDw8IChudW1Db3VudGVycyAtIDEpLFxuICAgICAgICBwYXR0ZXJuID0gMCxcbiAgICAgICAgaSxcbiAgICAgICAgdGhyZXNob2xkO1xuXG4gICAgaWYgKGVuZCA+IHRoaXMuX2NvdW50ZXJzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgYmFyVGhyZXNob2xkID0gdGhpcy5fY29tcHV0ZUFsdGVybmF0aW5nVGhyZXNob2xkKG9mZnNldCwgZW5kKTtcbiAgICBzcGFjZVRocmVzaG9sZCA9IHRoaXMuX2NvbXB1dGVBbHRlcm5hdGluZ1RocmVzaG9sZChvZmZzZXQgKyAxLCBlbmQpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IG51bUNvdW50ZXJzOyBpKyspe1xuICAgICAgICB0aHJlc2hvbGQgPSAoaSAmIDEpID09PSAwID8gYmFyVGhyZXNob2xkIDogc3BhY2VUaHJlc2hvbGQ7XG4gICAgICAgIGlmICh0aGlzLl9jb3VudGVyc1tvZmZzZXQgKyBpXSA+IHRocmVzaG9sZCkge1xuICAgICAgICAgICAgcGF0dGVybiB8PSBiaXRtYXNrO1xuICAgICAgICB9XG4gICAgICAgIGJpdG1hc2sgPj49IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdHRlcm47XG59O1xuXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5faXNTdGFydEVuZCA9IGZ1bmN0aW9uKHBhdHRlcm4pIHtcbiAgICB2YXIgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLlNUQVJUX0VORC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5TVEFSVF9FTkRbaV0gPT09IHBhdHRlcm4pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl9zdW1Db3VudGVycyA9IGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgc3VtID0gMDtcblxuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgc3VtICs9IHRoaXMuX2NvdW50ZXJzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gc3VtO1xufTtcblxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2ZpbmRTdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgaSxcbiAgICAgICAgcGF0dGVybixcbiAgICAgICAgc3RhcnQgPSBzZWxmLl9uZXh0VW5zZXQoc2VsZi5fcm93KSxcbiAgICAgICAgZW5kO1xuXG4gICAgZm9yIChpID0gMTsgaSA8IHRoaXMuX2NvdW50ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBhdHRlcm4gPSBzZWxmLl90b1BhdHRlcm4oaSk7XG4gICAgICAgIGlmIChwYXR0ZXJuICE9PSAtMSAmJiBzZWxmLl9pc1N0YXJ0RW5kKHBhdHRlcm4pKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBMb29rIGZvciB3aGl0ZXNwYWNlIGFoZWFkXG4gICAgICAgICAgICBzdGFydCArPSBzZWxmLl9zdW1Db3VudGVycygwLCBpKTtcbiAgICAgICAgICAgIGVuZCA9IHN0YXJ0ICsgc2VsZi5fc3VtQ291bnRlcnMoaSwgaSArIDgpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICAgICAgZW5kOiBlbmQsXG4gICAgICAgICAgICAgICAgc3RhcnRDb3VudGVyOiBpLFxuICAgICAgICAgICAgICAgIGVuZENvdW50ZXI6IGkgKyA4XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29kYWJhclJlYWRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yZWFkZXIvY29kYWJhcl9yZWFkZXIuanMiLCJpbXBvcnQgQmFyY29kZVJlYWRlciBmcm9tICcuL2JhcmNvZGVfcmVhZGVyJztcblxuZnVuY3Rpb24gQ29kZTEyOFJlYWRlcigpIHtcbiAgICBCYXJjb2RlUmVhZGVyLmNhbGwodGhpcyk7XG59XG5cbnZhciBwcm9wZXJ0aWVzID0ge1xuICAgIENPREVfU0hJRlQ6IHt2YWx1ZTogOTh9LFxuICAgIENPREVfQzoge3ZhbHVlOiA5OX0sXG4gICAgQ09ERV9COiB7dmFsdWU6IDEwMH0sXG4gICAgQ09ERV9BOiB7dmFsdWU6IDEwMX0sXG4gICAgU1RBUlRfQ09ERV9BOiB7dmFsdWU6IDEwM30sXG4gICAgU1RBUlRfQ09ERV9COiB7dmFsdWU6IDEwNH0sXG4gICAgU1RBUlRfQ09ERV9DOiB7dmFsdWU6IDEwNX0sXG4gICAgU1RPUF9DT0RFOiB7dmFsdWU6IDEwNn0sXG4gICAgQ09ERV9QQVRURVJOOiB7dmFsdWU6IFtcbiAgICAgICAgWzIsIDEsIDIsIDIsIDIsIDJdLFxuICAgICAgICBbMiwgMiwgMiwgMSwgMiwgMl0sXG4gICAgICAgIFsyLCAyLCAyLCAyLCAyLCAxXSxcbiAgICAgICAgWzEsIDIsIDEsIDIsIDIsIDNdLFxuICAgICAgICBbMSwgMiwgMSwgMywgMiwgMl0sXG4gICAgICAgIFsxLCAzLCAxLCAyLCAyLCAyXSxcbiAgICAgICAgWzEsIDIsIDIsIDIsIDEsIDNdLFxuICAgICAgICBbMSwgMiwgMiwgMywgMSwgMl0sXG4gICAgICAgIFsxLCAzLCAyLCAyLCAxLCAyXSxcbiAgICAgICAgWzIsIDIsIDEsIDIsIDEsIDNdLFxuICAgICAgICBbMiwgMiwgMSwgMywgMSwgMl0sXG4gICAgICAgIFsyLCAzLCAxLCAyLCAxLCAyXSxcbiAgICAgICAgWzEsIDEsIDIsIDIsIDMsIDJdLFxuICAgICAgICBbMSwgMiwgMiwgMSwgMywgMl0sXG4gICAgICAgIFsxLCAyLCAyLCAyLCAzLCAxXSxcbiAgICAgICAgWzEsIDEsIDMsIDIsIDIsIDJdLFxuICAgICAgICBbMSwgMiwgMywgMSwgMiwgMl0sXG4gICAgICAgIFsxLCAyLCAzLCAyLCAyLCAxXSxcbiAgICAgICAgWzIsIDIsIDMsIDIsIDEsIDFdLFxuICAgICAgICBbMiwgMiwgMSwgMSwgMywgMl0sXG4gICAgICAgIFsyLCAyLCAxLCAyLCAzLCAxXSxcbiAgICAgICAgWzIsIDEsIDMsIDIsIDEsIDJdLFxuICAgICAgICBbMiwgMiwgMywgMSwgMSwgMl0sXG4gICAgICAgIFszLCAxLCAyLCAxLCAzLCAxXSxcbiAgICAgICAgWzMsIDEsIDEsIDIsIDIsIDJdLFxuICAgICAgICBbMywgMiwgMSwgMSwgMiwgMl0sXG4gICAgICAgIFszLCAyLCAxLCAyLCAyLCAxXSxcbiAgICAgICAgWzMsIDEsIDIsIDIsIDEsIDJdLFxuICAgICAgICBbMywgMiwgMiwgMSwgMSwgMl0sXG4gICAgICAgIFszLCAyLCAyLCAyLCAxLCAxXSxcbiAgICAgICAgWzIsIDEsIDIsIDEsIDIsIDNdLFxuICAgICAgICBbMiwgMSwgMiwgMywgMiwgMV0sXG4gICAgICAgIFsyLCAzLCAyLCAxLCAyLCAxXSxcbiAgICAgICAgWzEsIDEsIDEsIDMsIDIsIDNdLFxuICAgICAgICBbMSwgMywgMSwgMSwgMiwgM10sXG4gICAgICAgIFsxLCAzLCAxLCAzLCAyLCAxXSxcbiAgICAgICAgWzEsIDEsIDIsIDMsIDEsIDNdLFxuICAgICAgICBbMSwgMywgMiwgMSwgMSwgM10sXG4gICAgICAgIFsxLCAzLCAyLCAzLCAxLCAxXSxcbiAgICAgICAgWzIsIDEsIDEsIDMsIDEsIDNdLFxuICAgICAgICBbMiwgMywgMSwgMSwgMSwgM10sXG4gICAgICAgIFsyLCAzLCAxLCAzLCAxLCAxXSxcbiAgICAgICAgWzEsIDEsIDIsIDEsIDMsIDNdLFxuICAgICAgICBbMSwgMSwgMiwgMywgMywgMV0sXG4gICAgICAgIFsxLCAzLCAyLCAxLCAzLCAxXSxcbiAgICAgICAgWzEsIDEsIDMsIDEsIDIsIDNdLFxuICAgICAgICBbMSwgMSwgMywgMywgMiwgMV0sXG4gICAgICAgIFsxLCAzLCAzLCAxLCAyLCAxXSxcbiAgICAgICAgWzMsIDEsIDMsIDEsIDIsIDFdLFxuICAgICAgICBbMiwgMSwgMSwgMywgMywgMV0sXG4gICAgICAgIFsyLCAzLCAxLCAxLCAzLCAxXSxcbiAgICAgICAgWzIsIDEsIDMsIDEsIDEsIDNdLFxuICAgICAgICBbMiwgMSwgMywgMywgMSwgMV0sXG4gICAgICAgIFsyLCAxLCAzLCAxLCAzLCAxXSxcbiAgICAgICAgWzMsIDEsIDEsIDEsIDIsIDNdLFxuICAgICAgICBbMywgMSwgMSwgMywgMiwgMV0sXG4gICAgICAgIFszLCAzLCAxLCAxLCAyLCAxXSxcbiAgICAgICAgWzMsIDEsIDIsIDEsIDEsIDNdLFxuICAgICAgICBbMywgMSwgMiwgMywgMSwgMV0sXG4gICAgICAgIFszLCAzLCAyLCAxLCAxLCAxXSxcbiAgICAgICAgWzMsIDEsIDQsIDEsIDEsIDFdLFxuICAgICAgICBbMiwgMiwgMSwgNCwgMSwgMV0sXG4gICAgICAgIFs0LCAzLCAxLCAxLCAxLCAxXSxcbiAgICAgICAgWzEsIDEsIDEsIDIsIDIsIDRdLFxuICAgICAgICBbMSwgMSwgMSwgNCwgMiwgMl0sXG4gICAgICAgIFsxLCAyLCAxLCAxLCAyLCA0XSxcbiAgICAgICAgWzEsIDIsIDEsIDQsIDIsIDFdLFxuICAgICAgICBbMSwgNCwgMSwgMSwgMiwgMl0sXG4gICAgICAgIFsxLCA0LCAxLCAyLCAyLCAxXSxcbiAgICAgICAgWzEsIDEsIDIsIDIsIDEsIDRdLFxuICAgICAgICBbMSwgMSwgMiwgNCwgMSwgMl0sXG4gICAgICAgIFsxLCAyLCAyLCAxLCAxLCA0XSxcbiAgICAgICAgWzEsIDIsIDIsIDQsIDEsIDFdLFxuICAgICAgICBbMSwgNCwgMiwgMSwgMSwgMl0sXG4gICAgICAgIFsxLCA0LCAyLCAyLCAxLCAxXSxcbiAgICAgICAgWzIsIDQsIDEsIDIsIDEsIDFdLFxuICAgICAgICBbMiwgMiwgMSwgMSwgMSwgNF0sXG4gICAgICAgIFs0LCAxLCAzLCAxLCAxLCAxXSxcbiAgICAgICAgWzIsIDQsIDEsIDEsIDEsIDJdLFxuICAgICAgICBbMSwgMywgNCwgMSwgMSwgMV0sXG4gICAgICAgIFsxLCAxLCAxLCAyLCA0LCAyXSxcbiAgICAgICAgWzEsIDIsIDEsIDEsIDQsIDJdLFxuICAgICAgICBbMSwgMiwgMSwgMiwgNCwgMV0sXG4gICAgICAgIFsxLCAxLCA0LCAyLCAxLCAyXSxcbiAgICAgICAgWzEsIDIsIDQsIDEsIDEsIDJdLFxuICAgICAgICBbMSwgMiwgNCwgMiwgMSwgMV0sXG4gICAgICAgIFs0LCAxLCAxLCAyLCAxLCAyXSxcbiAgICAgICAgWzQsIDIsIDEsIDEsIDEsIDJdLFxuICAgICAgICBbNCwgMiwgMSwgMiwgMSwgMV0sXG4gICAgICAgIFsyLCAxLCAyLCAxLCA0LCAxXSxcbiAgICAgICAgWzIsIDEsIDQsIDEsIDIsIDFdLFxuICAgICAgICBbNCwgMSwgMiwgMSwgMiwgMV0sXG4gICAgICAgIFsxLCAxLCAxLCAxLCA0LCAzXSxcbiAgICAgICAgWzEsIDEsIDEsIDMsIDQsIDFdLFxuICAgICAgICBbMSwgMywgMSwgMSwgNCwgMV0sXG4gICAgICAgIFsxLCAxLCA0LCAxLCAxLCAzXSxcbiAgICAgICAgWzEsIDEsIDQsIDMsIDEsIDFdLFxuICAgICAgICBbNCwgMSwgMSwgMSwgMSwgM10sXG4gICAgICAgIFs0LCAxLCAxLCAzLCAxLCAxXSxcbiAgICAgICAgWzEsIDEsIDMsIDEsIDQsIDFdLFxuICAgICAgICBbMSwgMSwgNCwgMSwgMywgMV0sXG4gICAgICAgIFszLCAxLCAxLCAxLCA0LCAxXSxcbiAgICAgICAgWzQsIDEsIDEsIDEsIDMsIDFdLFxuICAgICAgICBbMiwgMSwgMSwgNCwgMSwgMl0sXG4gICAgICAgIFsyLCAxLCAxLCAyLCAxLCA0XSxcbiAgICAgICAgWzIsIDEsIDEsIDIsIDMsIDJdLFxuICAgICAgICBbMiwgMywgMywgMSwgMSwgMSwgMl1cbiAgICBdfSxcbiAgICBTSU5HTEVfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjY0fSxcbiAgICBBVkdfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjMwfSxcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJjb2RlXzEyOFwiLCB3cml0ZWFibGU6IGZhbHNlfSxcbiAgICBNT0RVTEVfSU5ESUNFUzoge3ZhbHVlOiB7YmFyOiBbMCwgMiwgNF0sIHNwYWNlOiBbMSwgMywgNV19fVxufTtcblxuQ29kZTEyOFJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29kZTEyOFJlYWRlcjtcblxuQ29kZTEyOFJlYWRlci5wcm90b3R5cGUuX2RlY29kZUNvZGUgPSBmdW5jdGlvbihzdGFydCwgY29ycmVjdGlvbikge1xuICAgIHZhciBjb3VudGVyID0gWzAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICBpLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgb2Zmc2V0ID0gc3RhcnQsXG4gICAgICAgIGlzV2hpdGUgPSAhc2VsZi5fcm93W29mZnNldF0sXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxuICAgICAgICBiZXN0TWF0Y2ggPSB7XG4gICAgICAgICAgICBlcnJvcjogTnVtYmVyLk1BWF9WQUxVRSxcbiAgICAgICAgICAgIGNvZGU6IC0xLFxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgICAgZW5kOiBzdGFydCxcbiAgICAgICAgICAgIGNvcnJlY3Rpb246IHtcbiAgICAgICAgICAgICAgICBiYXI6IDEsXG4gICAgICAgICAgICAgICAgc3BhY2U6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29kZSxcbiAgICAgICAgZXJyb3I7XG5cbiAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvcnJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fY29ycmVjdChjb3VudGVyLCBjb3JyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChjb2RlID0gMDsgY29kZSA8IHNlbGYuQ09ERV9QQVRURVJOLmxlbmd0aDsgY29kZSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKGNvdW50ZXIsIHNlbGYuQ09ERV9QQVRURVJOW2NvZGVdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIDwgYmVzdE1hdGNoLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guY29kZSA9IGNvZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZW5kID0gaTtcbiAgICAgICAgICAgICAgICBpZiAoYmVzdE1hdGNoLmNvZGUgPT09IC0xIHx8IGJlc3RNYXRjaC5lcnJvciA+IHNlbGYuQVZHX0NPREVfRVJST1IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZWxmLkNPREVfUEFUVEVSTltiZXN0TWF0Y2guY29kZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmNvcnJlY3Rpb24uYmFyID0gY2FsY3VsYXRlQ29ycmVjdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuQ09ERV9QQVRURVJOW2Jlc3RNYXRjaC5jb2RlXSwgY291bnRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTU9EVUxFX0lORElDRVMuYmFyKTtcbiAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmNvcnJlY3Rpb24uc3BhY2UgPSBjYWxjdWxhdGVDb3JyZWN0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5DT0RFX1BBVFRFUk5bYmVzdE1hdGNoLmNvZGVdLCBjb3VudGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NT0RVTEVfSU5ESUNFUy5zcGFjZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuQ29kZTEyOFJlYWRlci5wcm90b3R5cGUuX2NvcnJlY3QgPSBmdW5jdGlvbihjb3VudGVyLCBjb3JyZWN0aW9uKSB7XG4gICAgdGhpcy5fY29ycmVjdEJhcnMoY291bnRlciwgY29ycmVjdGlvbi5iYXIsIHRoaXMuTU9EVUxFX0lORElDRVMuYmFyKTtcbiAgICB0aGlzLl9jb3JyZWN0QmFycyhjb3VudGVyLCBjb3JyZWN0aW9uLnNwYWNlLCB0aGlzLk1PRFVMRV9JTkRJQ0VTLnNwYWNlKTtcbn07XG5cbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlLl9maW5kU3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY291bnRlciA9IFswLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgaSxcbiAgICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KSxcbiAgICAgICAgaXNXaGl0ZSA9IGZhbHNlLFxuICAgICAgICBjb3VudGVyUG9zID0gMCxcbiAgICAgICAgYmVzdE1hdGNoID0ge1xuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXG4gICAgICAgICAgICBjb2RlOiAtMSxcbiAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICAgICAgZW5kOiAwLFxuICAgICAgICAgICAgY29ycmVjdGlvbjoge1xuICAgICAgICAgICAgICAgIGJhcjogMSxcbiAgICAgICAgICAgICAgICBzcGFjZTogMVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb2RlLFxuICAgICAgICBlcnJvcixcbiAgICAgICAgaixcbiAgICAgICAgc3VtO1xuXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIHN1bSA9IDA7XG4gICAgICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBjb3VudGVyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBjb3VudGVyW2pdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKGNvZGUgPSBzZWxmLlNUQVJUX0NPREVfQTsgY29kZSA8PSBzZWxmLlNUQVJUX0NPREVfQzsgY29kZSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKGNvdW50ZXIsIHNlbGYuQ09ERV9QQVRURVJOW2NvZGVdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIDwgYmVzdE1hdGNoLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guY29kZSA9IGNvZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYmVzdE1hdGNoLmVycm9yIDwgc2VsZi5BVkdfQ09ERV9FUlJPUikge1xuICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guc3RhcnQgPSBpIC0gc3VtO1xuICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZW5kID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmNvcnJlY3Rpb24uYmFyID0gY2FsY3VsYXRlQ29ycmVjdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuQ09ERV9QQVRURVJOW2Jlc3RNYXRjaC5jb2RlXSwgY291bnRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTU9EVUxFX0lORElDRVMuYmFyKTtcbiAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmNvcnJlY3Rpb24uc3BhY2UgPSBjYWxjdWxhdGVDb3JyZWN0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5DT0RFX1BBVFRFUk5bYmVzdE1hdGNoLmNvZGVdLCBjb3VudGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NT0RVTEVfSU5ESUNFUy5zcGFjZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCA0OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltqXSA9IGNvdW50ZXJbaiArIDJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb3VudGVyWzRdID0gMDtcbiAgICAgICAgICAgICAgICBjb3VudGVyWzVdID0gMDtcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zLS07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuQ29kZTEyOFJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgc3RhcnRJbmZvID0gc2VsZi5fZmluZFN0YXJ0KCksXG4gICAgICAgIGNvZGUgPSBudWxsLFxuICAgICAgICBkb25lID0gZmFsc2UsXG4gICAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgICBtdWx0aXBsaWVyID0gMCxcbiAgICAgICAgY2hlY2tzdW0gPSAwLFxuICAgICAgICBjb2Rlc2V0LFxuICAgICAgICByYXdSZXN1bHQgPSBbXSxcbiAgICAgICAgZGVjb2RlZENvZGVzID0gW10sXG4gICAgICAgIHNoaWZ0TmV4dCA9IGZhbHNlLFxuICAgICAgICB1bnNoaWZ0LFxuICAgICAgICByZW1vdmVMYXN0Q2hhcmFjdGVyID0gdHJ1ZTtcblxuICAgIGlmIChzdGFydEluZm8gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvZGUgPSB7XG4gICAgICAgIGNvZGU6IHN0YXJ0SW5mby5jb2RlLFxuICAgICAgICBzdGFydDogc3RhcnRJbmZvLnN0YXJ0LFxuICAgICAgICBlbmQ6IHN0YXJ0SW5mby5lbmQsXG4gICAgICAgIGNvcnJlY3Rpb246IHtcbiAgICAgICAgICAgIGJhcjogc3RhcnRJbmZvLmNvcnJlY3Rpb24uYmFyLFxuICAgICAgICAgICAgc3BhY2U6IHN0YXJ0SW5mby5jb3JyZWN0aW9uLnNwYWNlXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xuICAgIGNoZWNrc3VtID0gY29kZS5jb2RlO1xuICAgIHN3aXRjaCAoY29kZS5jb2RlKSB7XG4gICAgY2FzZSBzZWxmLlNUQVJUX0NPREVfQTpcbiAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9BO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIHNlbGYuU1RBUlRfQ09ERV9COlxuICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0I7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2Ugc2VsZi5TVEFSVF9DT0RFX0M6XG4gICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQztcbiAgICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgd2hpbGUgKCFkb25lKSB7XG4gICAgICAgIHVuc2hpZnQgPSBzaGlmdE5leHQ7XG4gICAgICAgIHNoaWZ0TmV4dCA9IGZhbHNlO1xuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb2RlLmVuZCwgY29kZS5jb3JyZWN0aW9uKTtcbiAgICAgICAgaWYgKGNvZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgIT09IHNlbGYuU1RPUF9DT0RFKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlTGFzdENoYXJhY3RlciA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgIT09IHNlbGYuU1RPUF9DT0RFKSB7XG4gICAgICAgICAgICAgICAgcmF3UmVzdWx0LnB1c2goY29kZS5jb2RlKTtcbiAgICAgICAgICAgICAgICBtdWx0aXBsaWVyKys7XG4gICAgICAgICAgICAgICAgY2hlY2tzdW0gKz0gbXVsdGlwbGllciAqIGNvZGUuY29kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGNvZGVzZXQpIHtcbiAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0E6XG4gICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSA8IDY0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoMzIgKyBjb2RlLmNvZGUpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvZGUuY29kZSA8IDk2KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZS5jb2RlIC0gNjQpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29kZS5jb2RlICE9PSBzZWxmLlNUT1BfQ09ERSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTGFzdENoYXJhY3RlciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY29kZS5jb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX1NISUZUOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnROZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9COlxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9CO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0M6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0M7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLlNUT1BfQ09ERTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9COlxuICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgPCA5Nikge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKDMyICsgY29kZS5jb2RlKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSAhPT0gc2VsZi5TVE9QX0NPREUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUxhc3RDaGFyYWN0ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvZGUuY29kZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9TSElGVDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0TmV4dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0E7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9DOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9DO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5TVE9QX0NPREU6XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQzpcbiAgICAgICAgICAgICAgICBpZiAoY29kZS5jb2RlIDwgMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSA8IDEwID8gXCIwXCIgKyBjb2RlLmNvZGUgOiBjb2RlLmNvZGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgIT09IHNlbGYuU1RPUF9DT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVMYXN0Q2hhcmFjdGVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjb2RlLmNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9COlxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9CO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5TVE9QX0NPREU6XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVuc2hpZnQpIHtcbiAgICAgICAgICAgIGNvZGVzZXQgPSBjb2Rlc2V0ID09PSBzZWxmLkNPREVfQSA/IHNlbGYuQ09ERV9CIDogc2VsZi5DT0RFX0E7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb2RlLmVuZCA9IHNlbGYuX25leHRVbnNldChzZWxmLl9yb3csIGNvZGUuZW5kKTtcbiAgICBpZiAoIXNlbGYuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZShjb2RlKSl7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNoZWNrc3VtIC09IG11bHRpcGxpZXIgKiByYXdSZXN1bHRbcmF3UmVzdWx0Lmxlbmd0aCAtIDFdO1xuICAgIGlmIChjaGVja3N1bSAlIDEwMyAhPT0gcmF3UmVzdWx0W3Jhd1Jlc3VsdC5sZW5ndGggLSAxXSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoIXJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIGxhc3QgY29kZSBmcm9tIHJlc3VsdCAoY2hlY2tzdW0pXG4gICAgaWYgKHJlbW92ZUxhc3RDaGFyYWN0ZXIpIHtcbiAgICAgICAgcmVzdWx0LnNwbGljZShyZXN1bHQubGVuZ3RoIC0gMSwgMSk7XG4gICAgfVxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcbiAgICAgICAgc3RhcnQ6IHN0YXJ0SW5mby5zdGFydCxcbiAgICAgICAgZW5kOiBjb2RlLmVuZCxcbiAgICAgICAgY29kZXNldDogY29kZXNldCxcbiAgICAgICAgc3RhcnRJbmZvOiBzdGFydEluZm8sXG4gICAgICAgIGRlY29kZWRDb2RlczogZGVjb2RlZENvZGVzLFxuICAgICAgICBlbmRJbmZvOiBjb2RlXG4gICAgfTtcbn07XG5cblxuQmFyY29kZVJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZSA9IGZ1bmN0aW9uKGVuZEluZm8pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZDtcblxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IGVuZEluZm8uZW5kICsgKChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpIC8gMik7XG4gICAgaWYgKHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA8IHNlbGYuX3Jvdy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UoZW5kSW5mby5lbmQsIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCwgMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuZnVuY3Rpb24gY2FsY3VsYXRlQ29ycmVjdGlvbihleHBlY3RlZCwgbm9ybWFsaXplZCwgaW5kaWNlcykge1xuICAgIHZhciBsZW5ndGggPSBpbmRpY2VzLmxlbmd0aCxcbiAgICAgICAgc3VtTm9ybWFsaXplZCA9IDAsXG4gICAgICAgIHN1bUV4cGVjdGVkID0gMDtcblxuICAgIHdoaWxlKGxlbmd0aC0tKSB7XG4gICAgICAgIHN1bUV4cGVjdGVkICs9IGV4cGVjdGVkW2luZGljZXNbbGVuZ3RoXV07XG4gICAgICAgIHN1bU5vcm1hbGl6ZWQgKz0gbm9ybWFsaXplZFtpbmRpY2VzW2xlbmd0aF1dO1xuICAgIH1cbiAgICByZXR1cm4gc3VtRXhwZWN0ZWQvc3VtTm9ybWFsaXplZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29kZTEyOFJlYWRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yZWFkZXIvY29kZV8xMjhfcmVhZGVyLmpzIiwiaW1wb3J0IENvZGUzOVJlYWRlciBmcm9tICcuL2NvZGVfMzlfcmVhZGVyJztcblxuZnVuY3Rpb24gQ29kZTM5VklOUmVhZGVyKCkge1xuICAgIENvZGUzOVJlYWRlci5jYWxsKHRoaXMpO1xufVxuXG52YXIgcGF0dGVybnMgPSB7XG4gICAgSU9ROiAvW0lPUV0vZyxcbiAgICBBWjA5OiAvW0EtWjAtOV17MTd9L1xufTtcblxuQ29kZTM5VklOUmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ29kZTM5UmVhZGVyLnByb3RvdHlwZSk7XG5Db2RlMzlWSU5SZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29kZTM5VklOUmVhZGVyO1xuXG4vLyBDcmliYmVkIGZyb206XG4vLyBodHRwczovL2dpdGh1Yi5jb20venhpbmcvenhpbmcvYmxvYi9tYXN0ZXIvY29yZS9zcmMvbWFpbi9qYXZhL2NvbS9nb29nbGUvenhpbmcvY2xpZW50L3Jlc3VsdC9WSU5SZXN1bHRQYXJzZXIuamF2YVxuQ29kZTM5VklOUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3VsdCA9IENvZGUzOVJlYWRlci5wcm90b3R5cGUuX2RlY29kZS5hcHBseSh0aGlzKTtcbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgY29kZSA9IHJlc3VsdC5jb2RlO1xuXG4gICAgaWYgKCFjb2RlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UocGF0dGVybnMuSU9RLCAnJyk7XG5cbiAgICBpZiAoIWNvZGUubWF0Y2gocGF0dGVybnMuQVowOSkpIHtcbiAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCBBWjA5IHBhdHRlcm4gY29kZTonLCBjb2RlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2NoZWNrQ2hlY2tzdW0oY29kZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmVzdWx0LmNvZGUgPSBjb2RlO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5Db2RlMzlWSU5SZWFkZXIucHJvdG90eXBlLl9jaGVja0NoZWNrc3VtID0gZnVuY3Rpb24oY29kZSkge1xuICAgIC8vIFRPRE9cbiAgICByZXR1cm4gISFjb2RlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29kZTM5VklOUmVhZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JlYWRlci9jb2RlXzM5X3Zpbl9yZWFkZXIuanMiLCJpbXBvcnQgRUFOUmVhZGVyIGZyb20gJy4vZWFuX3JlYWRlcic7XG5cbmZ1bmN0aW9uIEVBTjJSZWFkZXIoKSB7XG4gICAgRUFOUmVhZGVyLmNhbGwodGhpcyk7XG59XG5cbnZhciBwcm9wZXJ0aWVzID0ge1xuICAgIEZPUk1BVDoge3ZhbHVlOiBcImVhbl8yXCIsIHdyaXRlYWJsZTogZmFsc2V9XG59O1xuXG5FQU4yUmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRUFOUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XG5FQU4yUmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEVBTjJSZWFkZXI7XG5cbkVBTjJSZWFkZXIucHJvdG90eXBlLmRlY29kZSA9IGZ1bmN0aW9uKHJvdywgc3RhcnQpIHtcbiAgICB0aGlzLl9yb3cgPSByb3c7XG4gICAgdmFyIGNvdW50ZXJzID0gWzAsIDAsIDAsIDBdLFxuICAgICAgICBjb2RlRnJlcXVlbmN5ID0gMCxcbiAgICAgICAgaSA9IDAsXG4gICAgICAgIG9mZnNldCA9IHN0YXJ0LFxuICAgICAgICBlbmQgPSB0aGlzLl9yb3cubGVuZ3RoLFxuICAgICAgICBjb2RlLFxuICAgICAgICByZXN1bHQgPSBbXSxcbiAgICAgICAgZGVjb2RlZENvZGVzID0gW107XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgMiAmJiBvZmZzZXQgPCBlbmQ7IGkrKykge1xuICAgICAgICBjb2RlID0gdGhpcy5fZGVjb2RlQ29kZShvZmZzZXQpO1xuICAgICAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xuICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUgJSAxMCk7XG4gICAgICAgIGlmIChjb2RlLmNvZGUgPj0gdGhpcy5DT0RFX0dfU1RBUlQpIHtcbiAgICAgICAgICAgIGNvZGVGcmVxdWVuY3kgfD0gMSA8PCAoMSAtIGkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpICE9IDEpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IHRoaXMuX25leHRTZXQodGhpcy5fcm93LCBjb2RlLmVuZCk7XG4gICAgICAgICAgICBvZmZzZXQgPSB0aGlzLl9uZXh0VW5zZXQodGhpcy5fcm93LCBvZmZzZXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdC5sZW5ndGggIT0gMiB8fCAocGFyc2VJbnQocmVzdWx0LmpvaW4oXCJcIikpICUgNCkgICE9PSBjb2RlRnJlcXVlbmN5KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcbiAgICAgICAgZGVjb2RlZENvZGVzLFxuICAgICAgICBlbmQ6IGNvZGUuZW5kXG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEVBTjJSZWFkZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmVhZGVyL2Vhbl8yX3JlYWRlci5qcyIsImltcG9ydCBFQU5SZWFkZXIgZnJvbSAnLi9lYW5fcmVhZGVyJztcblxuZnVuY3Rpb24gRUFONVJlYWRlcigpIHtcbiAgICBFQU5SZWFkZXIuY2FsbCh0aGlzKTtcbn1cblxudmFyIHByb3BlcnRpZXMgPSB7XG4gICAgRk9STUFUOiB7dmFsdWU6IFwiZWFuXzVcIiwgd3JpdGVhYmxlOiBmYWxzZX1cbn07XG5cbmNvbnN0IENIRUNLX0RJR0lUX0VOQ09ESU5HUyA9IFsyNCwgMjAsIDE4LCAxNywgMTIsIDYsIDMsIDEwLCA5LCA1XTtcblxuRUFONVJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVBTlJlYWRlci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xuRUFONVJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFQU41UmVhZGVyO1xuXG5FQU41UmVhZGVyLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbihyb3csIHN0YXJ0KSB7XG4gICAgdGhpcy5fcm93ID0gcm93O1xuICAgIHZhciBjb3VudGVycyA9IFswLCAwLCAwLCAwXSxcbiAgICAgICAgY29kZUZyZXF1ZW5jeSA9IDAsXG4gICAgICAgIGkgPSAwLFxuICAgICAgICBvZmZzZXQgPSBzdGFydCxcbiAgICAgICAgZW5kID0gdGhpcy5fcm93Lmxlbmd0aCxcbiAgICAgICAgY29kZSxcbiAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgIGRlY29kZWRDb2RlcyA9IFtdO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IDUgJiYgb2Zmc2V0IDwgZW5kOyBpKyspIHtcbiAgICAgICAgY29kZSA9IHRoaXMuX2RlY29kZUNvZGUob2Zmc2V0KTtcbiAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcbiAgICAgICAgcmVzdWx0LnB1c2goY29kZS5jb2RlICUgMTApO1xuICAgICAgICBpZiAoY29kZS5jb2RlID49IHRoaXMuQ09ERV9HX1NUQVJUKSB7XG4gICAgICAgICAgICBjb2RlRnJlcXVlbmN5IHw9IDEgPDwgKDQgLSBpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSAhPSA0KSB7XG4gICAgICAgICAgICBvZmZzZXQgPSB0aGlzLl9uZXh0U2V0KHRoaXMuX3JvdywgY29kZS5lbmQpO1xuICAgICAgICAgICAgb2Zmc2V0ID0gdGhpcy5fbmV4dFVuc2V0KHRoaXMuX3Jvdywgb2Zmc2V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZXN1bHQubGVuZ3RoICE9IDUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKGV4dGVuc2lvbkNoZWNrc3VtKHJlc3VsdCkgIT09IGRldGVybWluZUNoZWNrRGlnaXQoY29kZUZyZXF1ZW5jeSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGNvZGU6IHJlc3VsdC5qb2luKFwiXCIpLFxuICAgICAgICBkZWNvZGVkQ29kZXMsXG4gICAgICAgIGVuZDogY29kZS5lbmRcbiAgICB9O1xufTtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lQ2hlY2tEaWdpdChjb2RlRnJlcXVlbmN5KSB7XG4gICAgdmFyIGk7XG4gICAgZm9yIChpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgaWYgKGNvZGVGcmVxdWVuY3kgPT09IENIRUNLX0RJR0lUX0VOQ09ESU5HU1tpXSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cblxuZnVuY3Rpb24gZXh0ZW5zaW9uQ2hlY2tzdW0ocmVzdWx0KSB7XG4gICAgdmFyIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGgsXG4gICAgICAgIHN1bSA9IDAsXG4gICAgICAgIGk7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGggLSAyOyBpID49IDA7IGkgLT0gMikge1xuICAgICAgICBzdW0gKz0gcmVzdWx0W2ldO1xuICAgIH1cbiAgICBzdW0gKj0gMztcbiAgICBmb3IgKGkgPSBsZW5ndGggLSAxOyBpID49IDA7IGkgLT0gMikge1xuICAgICAgICBzdW0gKz0gcmVzdWx0W2ldO1xuICAgIH1cbiAgICBzdW0gKj0gMztcbiAgICByZXR1cm4gc3VtICUgMTA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVBTjVSZWFkZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmVhZGVyL2Vhbl81X3JlYWRlci5qcyIsImltcG9ydCBFQU5SZWFkZXIgZnJvbSAnLi9lYW5fcmVhZGVyJztcblxuZnVuY3Rpb24gRUFOOFJlYWRlcihvcHRzLCBzdXBwbGVtZW50cykge1xuICAgIEVBTlJlYWRlci5jYWxsKHRoaXMsIG9wdHMsIHN1cHBsZW1lbnRzKTtcbn1cblxudmFyIHByb3BlcnRpZXMgPSB7XG4gICAgRk9STUFUOiB7dmFsdWU6IFwiZWFuXzhcIiwgd3JpdGVhYmxlOiBmYWxzZX1cbn07XG5cbkVBTjhSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFQU5SZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcbkVBTjhSZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRUFOOFJlYWRlcjtcblxuRUFOOFJlYWRlci5wcm90b3R5cGUuX2RlY29kZVBheWxvYWQgPSBmdW5jdGlvbihjb2RlLCByZXN1bHQsIGRlY29kZWRDb2Rlcykge1xuICAgIHZhciBpLFxuICAgICAgICBzZWxmID0gdGhpcztcblxuICAgIGZvciAoIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kLCBzZWxmLkNPREVfR19TVEFSVCk7XG4gICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0LnB1c2goY29kZS5jb2RlKTtcbiAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XG4gICAgfVxuXG4gICAgY29kZSA9IHNlbGYuX2ZpbmRQYXR0ZXJuKHNlbGYuTUlERExFX1BBVFRFUk4sIGNvZGUuZW5kLCB0cnVlLCBmYWxzZSk7XG4gICAgaWYgKGNvZGUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xuXG4gICAgZm9yICggaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgY29kZSA9IHNlbGYuX2RlY29kZUNvZGUoY29kZS5lbmQsIHNlbGYuQ09ERV9HX1NUQVJUKTtcbiAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcbiAgICAgICAgcmVzdWx0LnB1c2goY29kZS5jb2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29kZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEVBTjhSZWFkZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmVhZGVyL2Vhbl84X3JlYWRlci5qcyIsImltcG9ydCBCYXJjb2RlUmVhZGVyIGZyb20gJy4vYmFyY29kZV9yZWFkZXInO1xuaW1wb3J0IHttZXJnZX0gZnJvbSAnbG9kYXNoJztcblxuZnVuY3Rpb24gSTJvZjVSZWFkZXIob3B0cykge1xuICAgIG9wdHMgPSBtZXJnZShnZXREZWZhdWxDb25maWcoKSwgb3B0cyk7XG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMsIG9wdHMpO1xuICAgIHRoaXMuYmFyU3BhY2VSYXRpbyA9IFsxLCAxXTtcbiAgICBpZiAob3B0cy5ub3JtYWxpemVCYXJTcGFjZVdpZHRoKSB7XG4gICAgICAgIHRoaXMuU0lOR0xFX0NPREVfRVJST1IgPSAwLjM4O1xuICAgICAgICB0aGlzLkFWR19DT0RFX0VSUk9SID0gMC4wOTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bENvbmZpZygpIHtcbiAgICB2YXIgY29uZmlnID0ge307XG5cbiAgICBPYmplY3Qua2V5cyhJMm9mNVJlYWRlci5DT05GSUdfS0VZUykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgY29uZmlnW2tleV0gPSBJMm9mNVJlYWRlci5DT05GSUdfS0VZU1trZXldLmRlZmF1bHQ7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbmZpZztcbn1cblxudmFyIE4gPSAxLFxuICAgIFcgPSAzLFxuICAgIHByb3BlcnRpZXMgPSB7XG4gICAgICAgIFNUQVJUX1BBVFRFUk46IHt2YWx1ZTogW04sIE4sIE4sIE5dfSxcbiAgICAgICAgU1RPUF9QQVRURVJOOiB7dmFsdWU6IFtOLCBOLCBXXX0sXG4gICAgICAgIENPREVfUEFUVEVSTjoge3ZhbHVlOiBbXG4gICAgICAgICAgICBbTiwgTiwgVywgVywgTl0sXG4gICAgICAgICAgICBbVywgTiwgTiwgTiwgV10sXG4gICAgICAgICAgICBbTiwgVywgTiwgTiwgV10sXG4gICAgICAgICAgICBbVywgVywgTiwgTiwgTl0sXG4gICAgICAgICAgICBbTiwgTiwgVywgTiwgV10sXG4gICAgICAgICAgICBbVywgTiwgVywgTiwgTl0sXG4gICAgICAgICAgICBbTiwgVywgVywgTiwgTl0sXG4gICAgICAgICAgICBbTiwgTiwgTiwgVywgV10sXG4gICAgICAgICAgICBbVywgTiwgTiwgVywgTl0sXG4gICAgICAgICAgICBbTiwgVywgTiwgVywgTl1cbiAgICAgICAgXX0sXG4gICAgICAgIFNJTkdMRV9DT0RFX0VSUk9SOiB7dmFsdWU6IDAuNzgsIHdyaXRhYmxlOiB0cnVlfSxcbiAgICAgICAgQVZHX0NPREVfRVJST1I6IHt2YWx1ZTogMC4zOCwgd3JpdGFibGU6IHRydWV9LFxuICAgICAgICBNQVhfQ09SUkVDVElPTl9GQUNUT1I6IHt2YWx1ZTogNX0sXG4gICAgICAgIEZPUk1BVDoge3ZhbHVlOiBcImkyb2Y1XCJ9XG4gICAgfTtcblxuSTJvZjVSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XG5JMm9mNVJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBJMm9mNVJlYWRlcjtcblxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9tYXRjaFBhdHRlcm4gPSBmdW5jdGlvbihjb3VudGVyLCBjb2RlKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLm5vcm1hbGl6ZUJhclNwYWNlV2lkdGgpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBjb3VudGVyU3VtID0gWzAsIDBdLFxuICAgICAgICAgICAgY29kZVN1bSA9IFswLCAwXSxcbiAgICAgICAgICAgIGNvcnJlY3Rpb24gPSBbMCwgMF0sXG4gICAgICAgICAgICBjb3JyZWN0aW9uUmF0aW8gPSB0aGlzLk1BWF9DT1JSRUNUSU9OX0ZBQ1RPUixcbiAgICAgICAgICAgIGNvcnJlY3Rpb25SYXRpb0ludmVyc2UgPSAxIC8gY29ycmVjdGlvblJhdGlvO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb3VudGVyU3VtW2kgJSAyXSArPSBjb3VudGVyW2ldO1xuICAgICAgICAgICAgY29kZVN1bVtpICUgMl0gKz0gY29kZVtpXTtcbiAgICAgICAgfVxuICAgICAgICBjb3JyZWN0aW9uWzBdID0gY29kZVN1bVswXSAvIGNvdW50ZXJTdW1bMF07XG4gICAgICAgIGNvcnJlY3Rpb25bMV0gPSBjb2RlU3VtWzFdIC8gY291bnRlclN1bVsxXTtcblxuICAgICAgICBjb3JyZWN0aW9uWzBdID0gTWF0aC5tYXgoTWF0aC5taW4oY29ycmVjdGlvblswXSwgY29ycmVjdGlvblJhdGlvKSwgY29ycmVjdGlvblJhdGlvSW52ZXJzZSk7XG4gICAgICAgIGNvcnJlY3Rpb25bMV0gPSBNYXRoLm1heChNYXRoLm1pbihjb3JyZWN0aW9uWzFdLCBjb3JyZWN0aW9uUmF0aW8pLCBjb3JyZWN0aW9uUmF0aW9JbnZlcnNlKTtcbiAgICAgICAgdGhpcy5iYXJTcGFjZVJhdGlvID0gY29ycmVjdGlvbjtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvdW50ZXJbaV0gKj0gdGhpcy5iYXJTcGFjZVJhdGlvW2kgJSAyXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gQmFyY29kZVJlYWRlci5wcm90b3R5cGUuX21hdGNoUGF0dGVybi5jYWxsKHRoaXMsIGNvdW50ZXIsIGNvZGUpO1xufTtcblxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9maW5kUGF0dGVybiA9IGZ1bmN0aW9uKHBhdHRlcm4sIG9mZnNldCwgaXNXaGl0ZSwgdHJ5SGFyZGVyKSB7XG4gICAgdmFyIGNvdW50ZXIgPSBbXSxcbiAgICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICAgIGksXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxuICAgICAgICBiZXN0TWF0Y2ggPSB7XG4gICAgICAgICAgICBlcnJvcjogTnVtYmVyLk1BWF9WQUxVRSxcbiAgICAgICAgICAgIGNvZGU6IC0xLFxuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICBlbmQ6IDBcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIGosXG4gICAgICAgIHN1bSxcbiAgICAgICAgbm9ybWFsaXplZCxcbiAgICAgICAgZXBzaWxvbiA9IHNlbGYuQVZHX0NPREVfRVJST1I7XG5cbiAgICBpc1doaXRlID0gaXNXaGl0ZSB8fCBmYWxzZTtcbiAgICB0cnlIYXJkZXIgPSB0cnlIYXJkZXIgfHwgZmFsc2U7XG5cbiAgICBpZiAoIW9mZnNldCkge1xuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3Jvdyk7XG4gICAgfVxuXG4gICAgZm9yICggaSA9IDA7IGkgPCBwYXR0ZXJuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvdW50ZXJbaV0gPSAwO1xuICAgIH1cblxuICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBjb3VudGVyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBzdW0gPSAwO1xuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgY291bnRlci5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gY291bnRlcltqXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4oY291bnRlciwgcGF0dGVybik7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yIDwgZXBzaWxvbikge1xuICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLnN0YXJ0ID0gaSAtIHN1bTtcbiAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVuZCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0cnlIYXJkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGNvdW50ZXIubGVuZ3RoIC0gMjsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2pdID0gY291bnRlcltqICsgMl07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyLmxlbmd0aCAtIDJdID0gMDtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyLmxlbmd0aCAtIDFdID0gMDtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlclBvcy0tO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XG4gICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2ZpbmRTdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgbGVhZGluZ1doaXRlc3BhY2VTdGFydCxcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpLFxuICAgICAgICBzdGFydEluZm8sXG4gICAgICAgIG5hcnJvd0JhcldpZHRoID0gMTtcblxuICAgIHdoaWxlICghc3RhcnRJbmZvKSB7XG4gICAgICAgIHN0YXJ0SW5mbyA9IHNlbGYuX2ZpbmRQYXR0ZXJuKHNlbGYuU1RBUlRfUEFUVEVSTiwgb2Zmc2V0LCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIGlmICghc3RhcnRJbmZvKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBuYXJyb3dCYXJXaWR0aCA9IE1hdGguZmxvb3IoKHN0YXJ0SW5mby5lbmQgLSBzdGFydEluZm8uc3RhcnQpIC8gNCk7XG4gICAgICAgIGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQgPSBzdGFydEluZm8uc3RhcnQgLSBuYXJyb3dCYXJXaWR0aCAqIDEwO1xuICAgICAgICBpZiAobGVhZGluZ1doaXRlc3BhY2VTdGFydCA+PSAwKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5fbWF0Y2hSYW5nZShsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0LCBzdGFydEluZm8uc3RhcnQsIDApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXJ0SW5mbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvZmZzZXQgPSBzdGFydEluZm8uZW5kO1xuICAgICAgICBzdGFydEluZm8gPSBudWxsO1xuICAgIH1cbn07XG5cbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlID0gZnVuY3Rpb24oZW5kSW5mbykge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kO1xuXG4gICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kID0gZW5kSW5mby5lbmQgKyAoKGVuZEluZm8uZW5kIC0gZW5kSW5mby5zdGFydCkgLyAyKTtcbiAgICBpZiAodHJhaWxpbmdXaGl0ZXNwYWNlRW5kIDwgc2VsZi5fcm93Lmxlbmd0aCkge1xuICAgICAgICBpZiAoc2VsZi5fbWF0Y2hSYW5nZShlbmRJbmZvLmVuZCwgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kLCAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIGVuZEluZm87XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2ZpbmRFbmQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGVuZEluZm8sXG4gICAgICAgIHRtcDtcblxuICAgIHNlbGYuX3Jvdy5yZXZlcnNlKCk7XG4gICAgZW5kSW5mbyA9IHNlbGYuX2ZpbmRQYXR0ZXJuKHNlbGYuU1RPUF9QQVRURVJOKTtcbiAgICBzZWxmLl9yb3cucmV2ZXJzZSgpO1xuXG4gICAgaWYgKGVuZEluZm8gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gcmV2ZXJzZSBudW1iZXJzXG4gICAgdG1wID0gZW5kSW5mby5zdGFydDtcbiAgICBlbmRJbmZvLnN0YXJ0ID0gc2VsZi5fcm93Lmxlbmd0aCAtIGVuZEluZm8uZW5kO1xuICAgIGVuZEluZm8uZW5kID0gc2VsZi5fcm93Lmxlbmd0aCAtIHRtcDtcblxuICAgIHJldHVybiBlbmRJbmZvICE9PSBudWxsID8gc2VsZi5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlKGVuZEluZm8pIDogbnVsbDtcbn07XG5cbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlUGFpciA9IGZ1bmN0aW9uKGNvdW50ZXJQYWlyKSB7XG4gICAgdmFyIGksXG4gICAgICAgIGNvZGUsXG4gICAgICAgIGNvZGVzID0gW10sXG4gICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXJQYWlyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvdW50ZXJQYWlyW2ldKTtcbiAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb2Rlcy5wdXNoKGNvZGUpO1xuICAgIH1cbiAgICByZXR1cm4gY29kZXM7XG59O1xuXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2RlY29kZUNvZGUgPSBmdW5jdGlvbihjb3VudGVyKSB7XG4gICAgdmFyIGosXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBzdW0gPSAwLFxuICAgICAgICBub3JtYWxpemVkLFxuICAgICAgICBlcnJvcixcbiAgICAgICAgZXBzaWxvbiA9IHNlbGYuQVZHX0NPREVfRVJST1IsXG4gICAgICAgIGNvZGUsXG4gICAgICAgIGJlc3RNYXRjaCA9IHtcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgICAgICAgY29kZTogLTEsXG4gICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgIGVuZDogMFxuICAgICAgICB9O1xuXG4gICAgZm9yICggaiA9IDA7IGogPCBjb3VudGVyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHN1bSArPSBjb3VudGVyW2pdO1xuICAgIH1cbiAgICBmb3IgKGNvZGUgPSAwOyBjb2RlIDwgc2VsZi5DT0RFX1BBVFRFUk4ubGVuZ3RoOyBjb2RlKyspIHtcbiAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4oY291bnRlciwgc2VsZi5DT0RFX1BBVFRFUk5bY29kZV0pO1xuICAgICAgICBpZiAoZXJyb3IgPCBiZXN0TWF0Y2guZXJyb3IpIHtcbiAgICAgICAgICAgIGJlc3RNYXRjaC5jb2RlID0gY29kZTtcbiAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChiZXN0TWF0Y2guZXJyb3IgPCBlcHNpbG9uKSB7XG4gICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XG4gICAgfVxufTtcblxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9kZWNvZGVQYXlsb2FkID0gZnVuY3Rpb24oY291bnRlcnMsIHJlc3VsdCwgZGVjb2RlZENvZGVzKSB7XG4gICAgdmFyIGksXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBwb3MgPSAwLFxuICAgICAgICBjb3VudGVyTGVuZ3RoID0gY291bnRlcnMubGVuZ3RoLFxuICAgICAgICBjb3VudGVyUGFpciA9IFtbMCwgMCwgMCwgMCwgMF0sIFswLCAwLCAwLCAwLCAwXV0sXG4gICAgICAgIGNvZGVzO1xuXG4gICAgd2hpbGUgKHBvcyA8IGNvdW50ZXJMZW5ndGgpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICAgICAgY291bnRlclBhaXJbMF1baV0gPSBjb3VudGVyc1twb3NdICogdGhpcy5iYXJTcGFjZVJhdGlvWzBdO1xuICAgICAgICAgICAgY291bnRlclBhaXJbMV1baV0gPSBjb3VudGVyc1twb3MgKyAxXSAqIHRoaXMuYmFyU3BhY2VSYXRpb1sxXTtcbiAgICAgICAgICAgIHBvcyArPSAyO1xuICAgICAgICB9XG4gICAgICAgIGNvZGVzID0gc2VsZi5fZGVjb2RlUGFpcihjb3VudGVyUGFpcik7XG4gICAgICAgIGlmICghY29kZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goY29kZXNbaV0uY29kZSArIFwiXCIpO1xuICAgICAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZXNbaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb2Rlcztcbn07XG5cbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fdmVyaWZ5Q291bnRlckxlbmd0aCA9IGZ1bmN0aW9uKGNvdW50ZXJzKSB7XG4gICAgcmV0dXJuIChjb3VudGVycy5sZW5ndGggJSAxMCA9PT0gMCk7XG59O1xuXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdGFydEluZm8sXG4gICAgICAgIGVuZEluZm8sXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBjb2RlLFxuICAgICAgICByZXN1bHQgPSBbXSxcbiAgICAgICAgZGVjb2RlZENvZGVzID0gW10sXG4gICAgICAgIGNvdW50ZXJzO1xuXG4gICAgc3RhcnRJbmZvID0gc2VsZi5fZmluZFN0YXJ0KCk7XG4gICAgaWYgKCFzdGFydEluZm8pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGRlY29kZWRDb2Rlcy5wdXNoKHN0YXJ0SW5mbyk7XG5cbiAgICBlbmRJbmZvID0gc2VsZi5fZmluZEVuZCgpO1xuICAgIGlmICghZW5kSW5mbykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb3VudGVycyA9IHNlbGYuX2ZpbGxDb3VudGVycyhzdGFydEluZm8uZW5kLCBlbmRJbmZvLnN0YXJ0LCBmYWxzZSk7XG4gICAgaWYgKCFzZWxmLl92ZXJpZnlDb3VudGVyTGVuZ3RoKGNvdW50ZXJzKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29kZSA9IHNlbGYuX2RlY29kZVBheWxvYWQoY291bnRlcnMsIHJlc3VsdCwgZGVjb2RlZENvZGVzKTtcbiAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChyZXN1bHQubGVuZ3RoICUgMiAhPT0gMCB8fFxuICAgICAgICAgICAgcmVzdWx0Lmxlbmd0aCA8IDYpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZGVjb2RlZENvZGVzLnB1c2goZW5kSW5mbyk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29kZTogcmVzdWx0LmpvaW4oXCJcIiksXG4gICAgICAgIHN0YXJ0OiBzdGFydEluZm8uc3RhcnQsXG4gICAgICAgIGVuZDogZW5kSW5mby5lbmQsXG4gICAgICAgIHN0YXJ0SW5mbzogc3RhcnRJbmZvLFxuICAgICAgICBkZWNvZGVkQ29kZXM6IGRlY29kZWRDb2Rlc1xuICAgIH07XG59O1xuXG5JMm9mNVJlYWRlci5DT05GSUdfS0VZUyA9IHtcbiAgICBub3JtYWxpemVCYXJTcGFjZVdpZHRoOiB7XG4gICAgICAgICd0eXBlJzogJ2Jvb2xlYW4nLFxuICAgICAgICAnZGVmYXVsdCc6IGZhbHNlLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnSWYgdHJ1ZSwgdGhlIHJlYWRlciB0cmllcyB0byBub3JtYWxpemUgdGhlJyArXG4gICAgICAgICd3aWR0aC1kaWZmZXJlbmNlIGJldHdlZW4gYmFycyBhbmQgc3BhY2VzJ1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEkyb2Y1UmVhZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JlYWRlci9pMm9mNV9yZWFkZXIuanMiLCJpbXBvcnQgRUFOUmVhZGVyIGZyb20gJy4vZWFuX3JlYWRlcic7XG5cbmZ1bmN0aW9uIFVQQ0VSZWFkZXIob3B0cywgc3VwcGxlbWVudHMpIHtcbiAgICBFQU5SZWFkZXIuY2FsbCh0aGlzLCBvcHRzLCBzdXBwbGVtZW50cyk7XG59XG5cbnZhciBwcm9wZXJ0aWVzID0ge1xuICAgIENPREVfRlJFUVVFTkNZOiB7dmFsdWU6IFtcbiAgICAgICAgWyA1NiwgNTIsIDUwLCA0OSwgNDQsIDM4LCAzNSwgNDIsIDQxLCAzNyBdLFxuICAgICAgICBbNywgMTEsIDEzLCAxNCwgMTksIDI1LCAyOCwgMjEsIDIyLCAyNl1dfSxcbiAgICBTVE9QX1BBVFRFUk46IHsgdmFsdWU6IFsxIC8gNiAqIDcsIDEgLyA2ICogNywgMSAvIDYgKiA3LCAxIC8gNiAqIDcsIDEgLyA2ICogNywgMSAvIDYgKiA3XX0sXG4gICAgRk9STUFUOiB7dmFsdWU6IFwidXBjX2VcIiwgd3JpdGVhYmxlOiBmYWxzZX1cbn07XG5cblVQQ0VSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFQU5SZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcblVQQ0VSZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVVBDRVJlYWRlcjtcblxuVVBDRVJlYWRlci5wcm90b3R5cGUuX2RlY29kZVBheWxvYWQgPSBmdW5jdGlvbihjb2RlLCByZXN1bHQsIGRlY29kZWRDb2Rlcykge1xuICAgIHZhciBpLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgY29kZUZyZXF1ZW5jeSA9IDB4MDtcblxuICAgIGZvciAoIGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kKTtcbiAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29kZS5jb2RlID49IHNlbGYuQ09ERV9HX1NUQVJUKSB7XG4gICAgICAgICAgICBjb2RlLmNvZGUgPSBjb2RlLmNvZGUgLSBzZWxmLkNPREVfR19TVEFSVDtcbiAgICAgICAgICAgIGNvZGVGcmVxdWVuY3kgfD0gMSA8PCAoNSAtIGkpO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSk7XG4gICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xuICAgIH1cbiAgICBpZiAoIXNlbGYuX2RldGVybWluZVBhcml0eShjb2RlRnJlcXVlbmN5LCByZXN1bHQpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjb2RlO1xufTtcblxuVVBDRVJlYWRlci5wcm90b3R5cGUuX2RldGVybWluZVBhcml0eSA9IGZ1bmN0aW9uKGNvZGVGcmVxdWVuY3ksIHJlc3VsdCkge1xuICAgIHZhciBpLFxuICAgICAgICBuclN5c3RlbTtcblxuICAgIGZvciAobnJTeXN0ZW0gPSAwOyBuclN5c3RlbSA8IHRoaXMuQ09ERV9GUkVRVUVOQ1kubGVuZ3RoOyBuclN5c3RlbSsrKXtcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCB0aGlzLkNPREVfRlJFUVVFTkNZW25yU3lzdGVtXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNvZGVGcmVxdWVuY3kgPT09IHRoaXMuQ09ERV9GUkVRVUVOQ1lbbnJTeXN0ZW1dW2ldKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVuc2hpZnQobnJTeXN0ZW0pO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cblVQQ0VSZWFkZXIucHJvdG90eXBlLl9jb252ZXJ0VG9VUENBID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgdmFyIHVwY2EgPSBbcmVzdWx0WzBdXSxcbiAgICAgICAgbGFzdERpZ2l0ID0gcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAyXTtcblxuICAgIGlmIChsYXN0RGlnaXQgPD0gMikge1xuICAgICAgICB1cGNhID0gdXBjYS5jb25jYXQocmVzdWx0LnNsaWNlKDEsIDMpKVxuICAgICAgICAgICAgLmNvbmNhdChbbGFzdERpZ2l0LCAwLCAwLCAwLCAwXSlcbiAgICAgICAgICAgIC5jb25jYXQocmVzdWx0LnNsaWNlKDMsIDYpKTtcbiAgICB9IGVsc2UgaWYgKGxhc3REaWdpdCA9PT0gMykge1xuICAgICAgICB1cGNhID0gdXBjYS5jb25jYXQocmVzdWx0LnNsaWNlKDEsIDQpKVxuICAgICAgICAgICAgLmNvbmNhdChbMCwgMCwgMCwgMCwgMF0pXG4gICAgICAgICAgICAuY29uY2F0KHJlc3VsdC5zbGljZSg0LCA2KSk7XG4gICAgfSBlbHNlIGlmIChsYXN0RGlnaXQgPT09IDQpIHtcbiAgICAgICAgdXBjYSA9IHVwY2EuY29uY2F0KHJlc3VsdC5zbGljZSgxLCA1KSlcbiAgICAgICAgICAgIC5jb25jYXQoWzAsIDAsIDAsIDAsIDAsIHJlc3VsdFs1XV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHVwY2EgPSB1cGNhLmNvbmNhdChyZXN1bHQuc2xpY2UoMSwgNikpXG4gICAgICAgICAgICAuY29uY2F0KFswLCAwLCAwLCAwLCBsYXN0RGlnaXRdKTtcbiAgICB9XG5cbiAgICB1cGNhLnB1c2gocmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXSk7XG4gICAgcmV0dXJuIHVwY2E7XG59O1xuXG5VUENFUmVhZGVyLnByb3RvdHlwZS5fY2hlY2tzdW0gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICByZXR1cm4gRUFOUmVhZGVyLnByb3RvdHlwZS5fY2hlY2tzdW0uY2FsbCh0aGlzLCB0aGlzLl9jb252ZXJ0VG9VUENBKHJlc3VsdCkpO1xufTtcblxuVVBDRVJlYWRlci5wcm90b3R5cGUuX2ZpbmRFbmQgPSBmdW5jdGlvbihvZmZzZXQsIGlzV2hpdGUpIHtcbiAgICBpc1doaXRlID0gdHJ1ZTtcbiAgICByZXR1cm4gRUFOUmVhZGVyLnByb3RvdHlwZS5fZmluZEVuZC5jYWxsKHRoaXMsIG9mZnNldCwgaXNXaGl0ZSk7XG59O1xuXG5VUENFUmVhZGVyLnByb3RvdHlwZS5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlID0gZnVuY3Rpb24oZW5kSW5mbykge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kO1xuXG4gICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kID0gZW5kSW5mby5lbmQgKyAoKGVuZEluZm8uZW5kIC0gZW5kSW5mby5zdGFydCkgLyAyKTtcbiAgICBpZiAodHJhaWxpbmdXaGl0ZXNwYWNlRW5kIDwgc2VsZi5fcm93Lmxlbmd0aCkge1xuICAgICAgICBpZiAoc2VsZi5fbWF0Y2hSYW5nZShlbmRJbmZvLmVuZCwgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kLCAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIGVuZEluZm87XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBVUENFUmVhZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JlYWRlci91cGNfZV9yZWFkZXIuanMiLCJpbXBvcnQgRUFOUmVhZGVyIGZyb20gJy4vZWFuX3JlYWRlcic7XG5cbmZ1bmN0aW9uIFVQQ1JlYWRlcihvcHRzLCBzdXBwbGVtZW50cykge1xuICAgIEVBTlJlYWRlci5jYWxsKHRoaXMsIG9wdHMsIHN1cHBsZW1lbnRzKTtcbn1cblxudmFyIHByb3BlcnRpZXMgPSB7XG4gICAgRk9STUFUOiB7dmFsdWU6IFwidXBjX2FcIiwgd3JpdGVhYmxlOiBmYWxzZX1cbn07XG5cblVQQ1JlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVBTlJlYWRlci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xuVVBDUmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFVQQ1JlYWRlcjtcblxuVVBDUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3VsdCA9IEVBTlJlYWRlci5wcm90b3R5cGUuX2RlY29kZS5jYWxsKHRoaXMpO1xuXG4gICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuY29kZSAmJiByZXN1bHQuY29kZS5sZW5ndGggPT09IDEzICYmIHJlc3VsdC5jb2RlLmNoYXJBdCgwKSA9PT0gXCIwXCIpIHtcbiAgICAgICAgcmVzdWx0LmNvZGUgPSByZXN1bHQuY29kZS5zdWJzdHJpbmcoMSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVVBDUmVhZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JlYWRlci91cGNfcmVhZGVyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBjb3B5XG5cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIG1hdDIgdG8gYW5vdGhlclxuICpcbiAqIEBhbGlhcyBtYXQyLmNvcHlcbiAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJ9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAqL1xuZnVuY3Rpb24gY29weShvdXQsIGEpIHtcbiAgb3V0WzBdID0gYVswXVxuICBvdXRbMV0gPSBhWzFdXG4gIG91dFsyXSA9IGFbMl1cbiAgb3V0WzNdID0gYVszXVxuICByZXR1cm4gb3V0XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZ2wtbWF0Mi9jb3B5LmpzXG4vLyBtb2R1bGUgaWQgPSA3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaWRlbnRpdHkgbWF0MlxuICpcbiAqIEBhbGlhcyBtYXQyLmNyZWF0ZVxuICogQHJldHVybnMge21hdDJ9IGEgbmV3IDJ4MiBtYXRyaXhcbiAqL1xuZnVuY3Rpb24gY3JlYXRlKCkge1xuICB2YXIgb3V0ID0gbmV3IEZsb2F0MzJBcnJheSg0KVxuICBvdXRbMF0gPSAxXG4gIG91dFsxXSA9IDBcbiAgb3V0WzJdID0gMFxuICBvdXRbM10gPSAxXG4gIHJldHVybiBvdXRcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9nbC1tYXQyL2NyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gNzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBpbnZlcnRcblxuLyoqXG4gKiBJbnZlcnRzIGEgbWF0MlxuICpcbiAqIEBhbGlhcyBtYXQyLmludmVydFxuICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0Mn0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDJ9IG91dFxuICovXG5mdW5jdGlvbiBpbnZlcnQob3V0LCBhKSB7XG4gIHZhciBhMCA9IGFbMF1cbiAgdmFyIGExID0gYVsxXVxuICB2YXIgYTIgPSBhWzJdXG4gIHZhciBhMyA9IGFbM11cbiAgdmFyIGRldCA9IGEwICogYTMgLSBhMiAqIGExXG5cbiAgaWYgKCFkZXQpIHJldHVybiBudWxsXG4gIGRldCA9IDEuMCAvIGRldFxuXG4gIG91dFswXSA9ICBhMyAqIGRldFxuICBvdXRbMV0gPSAtYTEgKiBkZXRcbiAgb3V0WzJdID0gLWEyICogZGV0XG4gIG91dFszXSA9ICBhMCAqIGRldFxuXG4gIHJldHVybiBvdXRcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9nbC1tYXQyL2ludmVydC5qc1xuLy8gbW9kdWxlIGlkID0gNzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBzY2FsZVxuXG4vKipcbiAqIFNjYWxlcyBhIHZlYzIgYnkgYSBzY2FsYXIgbnVtYmVyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5mdW5jdGlvbiBzY2FsZShvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYlxuICAgIG91dFsxXSA9IGFbMV0gKiBiXG4gICAgcmV0dXJuIG91dFxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9nbC12ZWMyL3NjYWxlLmpzXG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHRyYW5zZm9ybU1hdDJcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHttYXQyfSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5mdW5jdGlvbiB0cmFuc2Zvcm1NYXQyKG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV1cbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bMl0gKiB5XG4gICAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzNdICogeVxuICAgIHJldHVybiBvdXRcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZ2wtdmVjMi90cmFuc2Zvcm1NYXQyLmpzXG4vLyBtb2R1bGUgaWQgPSA3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGNsb25lO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjMyBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gY2xvbmVcbiAqIEByZXR1cm5zIHt2ZWMzfSBhIG5ldyAzRCB2ZWN0b3JcbiAqL1xuZnVuY3Rpb24gY2xvbmUoYSkge1xuICAgIHZhciBvdXQgPSBuZXcgRmxvYXQzMkFycmF5KDMpXG4gICAgb3V0WzBdID0gYVswXVxuICAgIG91dFsxXSA9IGFbMV1cbiAgICBvdXRbMl0gPSBhWzJdXG4gICAgcmV0dXJuIG91dFxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9nbC12ZWMzL2Nsb25lLmpzXG4vLyBtb2R1bGUgaWQgPSA3OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzaENsZWFyID0gcmVxdWlyZSgnLi9faGFzaENsZWFyJyksXG4gICAgaGFzaERlbGV0ZSA9IHJlcXVpcmUoJy4vX2hhc2hEZWxldGUnKSxcbiAgICBoYXNoR2V0ID0gcmVxdWlyZSgnLi9faGFzaEdldCcpLFxuICAgIGhhc2hIYXMgPSByZXF1aXJlKCcuL19oYXNoSGFzJyksXG4gICAgaGFzaFNldCA9IHJlcXVpcmUoJy4vX2hhc2hTZXQnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPT0gbnVsbCA/IDAgOiBlbnRyaWVzLmxlbmd0aDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgSGFzaGAuXG5IYXNoLnByb3RvdHlwZS5jbGVhciA9IGhhc2hDbGVhcjtcbkhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG5IYXNoLnByb3RvdHlwZS5nZXQgPSBoYXNoR2V0O1xuSGFzaC5wcm90b3R5cGUuaGFzID0gaGFzaEhhcztcbkhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gSGFzaDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX0hhc2guanNcbi8vIG1vZHVsZSBpZCA9IDgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBMaXN0Q2FjaGUgPSByZXF1aXJlKCcuL19MaXN0Q2FjaGUnKSxcbiAgICBzdGFja0NsZWFyID0gcmVxdWlyZSgnLi9fc3RhY2tDbGVhcicpLFxuICAgIHN0YWNrRGVsZXRlID0gcmVxdWlyZSgnLi9fc3RhY2tEZWxldGUnKSxcbiAgICBzdGFja0dldCA9IHJlcXVpcmUoJy4vX3N0YWNrR2V0JyksXG4gICAgc3RhY2tIYXMgPSByZXF1aXJlKCcuL19zdGFja0hhcycpLFxuICAgIHN0YWNrU2V0ID0gcmVxdWlyZSgnLi9fc3RhY2tTZXQnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RhY2sgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU3RhY2soZW50cmllcykge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlKGVudHJpZXMpO1xuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTdGFja2AuXG5TdGFjay5wcm90b3R5cGUuY2xlYXIgPSBzdGFja0NsZWFyO1xuU3RhY2sucHJvdG90eXBlWydkZWxldGUnXSA9IHN0YWNrRGVsZXRlO1xuU3RhY2sucHJvdG90eXBlLmdldCA9IHN0YWNrR2V0O1xuU3RhY2sucHJvdG90eXBlLmhhcyA9IHN0YWNrSGFzO1xuU3RhY2sucHJvdG90eXBlLnNldCA9IHN0YWNrU2V0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YWNrO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fU3RhY2suanNcbi8vIG1vZHVsZSBpZCA9IDgxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBVaW50OEFycmF5ID0gcm9vdC5VaW50OEFycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVpbnQ4QXJyYXk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19VaW50OEFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA4MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEEgZmFzdGVyIGFsdGVybmF0aXZlIHRvIGBGdW5jdGlvbiNhcHBseWAsIHRoaXMgZnVuY3Rpb24gaW52b2tlcyBgZnVuY2BcbiAqIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIGB0aGlzQXJnYCBhbmQgdGhlIGFyZ3VtZW50cyBvZiBgYXJnc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGludm9rZS5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtBcnJheX0gYXJncyBUaGUgYXJndW1lbnRzIHRvIGludm9rZSBgZnVuY2Agd2l0aC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXN1bHQgb2YgYGZ1bmNgLlxuICovXG5mdW5jdGlvbiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKSB7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZyk7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXBwbHk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19hcHBseS5qc1xuLy8gbW9kdWxlIGlkID0gODNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGJhc2VUaW1lcyA9IHJlcXVpcmUoJy4vX2Jhc2VUaW1lcycpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc0J1ZmZlciA9IHJlcXVpcmUoJy4vaXNCdWZmZXInKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9faXNJbmRleCcpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4vaXNUeXBlZEFycmF5Jyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiB0aGUgYXJyYXktbGlrZSBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5oZXJpdGVkIFNwZWNpZnkgcmV0dXJuaW5nIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TGlrZUtleXModmFsdWUsIGluaGVyaXRlZCkge1xuICB2YXIgaXNBcnIgPSBpc0FycmF5KHZhbHVlKSxcbiAgICAgIGlzQXJnID0gIWlzQXJyICYmIGlzQXJndW1lbnRzKHZhbHVlKSxcbiAgICAgIGlzQnVmZiA9ICFpc0FyciAmJiAhaXNBcmcgJiYgaXNCdWZmZXIodmFsdWUpLFxuICAgICAgaXNUeXBlID0gIWlzQXJyICYmICFpc0FyZyAmJiAhaXNCdWZmICYmIGlzVHlwZWRBcnJheSh2YWx1ZSksXG4gICAgICBza2lwSW5kZXhlcyA9IGlzQXJyIHx8IGlzQXJnIHx8IGlzQnVmZiB8fCBpc1R5cGUsXG4gICAgICByZXN1bHQgPSBza2lwSW5kZXhlcyA/IGJhc2VUaW1lcyh2YWx1ZS5sZW5ndGgsIFN0cmluZykgOiBbXSxcbiAgICAgIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGg7XG5cbiAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKChpbmhlcml0ZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkgJiZcbiAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoXG4gICAgICAgICAgIC8vIFNhZmFyaSA5IGhhcyBlbnVtZXJhYmxlIGBhcmd1bWVudHMubGVuZ3RoYCBpbiBzdHJpY3QgbW9kZS5cbiAgICAgICAgICAga2V5ID09ICdsZW5ndGgnIHx8XG4gICAgICAgICAgIC8vIE5vZGUuanMgMC4xMCBoYXMgZW51bWVyYWJsZSBub24taW5kZXggcHJvcGVydGllcyBvbiBidWZmZXJzLlxuICAgICAgICAgICAoaXNCdWZmICYmIChrZXkgPT0gJ29mZnNldCcgfHwga2V5ID09ICdwYXJlbnQnKSkgfHxcbiAgICAgICAgICAgLy8gUGhhbnRvbUpTIDIgaGFzIGVudW1lcmFibGUgbm9uLWluZGV4IHByb3BlcnRpZXMgb24gdHlwZWQgYXJyYXlzLlxuICAgICAgICAgICAoaXNUeXBlICYmIChrZXkgPT0gJ2J1ZmZlcicgfHwga2V5ID09ICdieXRlTGVuZ3RoJyB8fCBrZXkgPT0gJ2J5dGVPZmZzZXQnKSkgfHxcbiAgICAgICAgICAgLy8gU2tpcCBpbmRleCBwcm9wZXJ0aWVzLlxuICAgICAgICAgICBpc0luZGV4KGtleSwgbGVuZ3RoKVxuICAgICAgICApKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUxpa2VLZXlzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fYXJyYXlMaWtlS2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gODRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ubWFwYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWVcbiAqIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBtYXBwZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TWFwKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheU1hcDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2FycmF5TWFwLmpzXG4vLyBtb2R1bGUgaWQgPSA4NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEFwcGVuZHMgdGhlIGVsZW1lbnRzIG9mIGB2YWx1ZXNgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBhcHBlbmQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlQdXNoKGFycmF5LCB2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgb2Zmc2V0ID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbb2Zmc2V0ICsgaW5kZXhdID0gdmFsdWVzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlQdXNoO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fYXJyYXlQdXNoLmpzXG4vLyBtb2R1bGUgaWQgPSA4NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdENyZWF0ZSA9IE9iamVjdC5jcmVhdGU7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uY3JlYXRlYCB3aXRob3V0IHN1cHBvcnQgZm9yIGFzc2lnbmluZ1xuICogcHJvcGVydGllcyB0byB0aGUgY3JlYXRlZCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm90byBUaGUgb2JqZWN0IHRvIGluaGVyaXQgZnJvbS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKi9cbnZhciBiYXNlQ3JlYXRlID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBvYmplY3QoKSB7fVxuICByZXR1cm4gZnVuY3Rpb24ocHJvdG8pIHtcbiAgICBpZiAoIWlzT2JqZWN0KHByb3RvKSkge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICBpZiAob2JqZWN0Q3JlYXRlKSB7XG4gICAgICByZXR1cm4gb2JqZWN0Q3JlYXRlKHByb3RvKTtcbiAgICB9XG4gICAgb2JqZWN0LnByb3RvdHlwZSA9IHByb3RvO1xuICAgIHZhciByZXN1bHQgPSBuZXcgb2JqZWN0O1xuICAgIG9iamVjdC5wcm90b3R5cGUgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn0oKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUNyZWF0ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2Jhc2VDcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDg3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhcnJheVB1c2ggPSByZXF1aXJlKCcuL19hcnJheVB1c2gnKSxcbiAgICBpc0ZsYXR0ZW5hYmxlID0gcmVxdWlyZSgnLi9faXNGbGF0dGVuYWJsZScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZsYXR0ZW5gIHdpdGggc3VwcG9ydCBmb3IgcmVzdHJpY3RpbmcgZmxhdHRlbmluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGZsYXR0ZW4uXG4gKiBAcGFyYW0ge251bWJlcn0gZGVwdGggVGhlIG1heGltdW0gcmVjdXJzaW9uIGRlcHRoLlxuICogQHBhcmFtIHtib29sZWFufSBbcHJlZGljYXRlPWlzRmxhdHRlbmFibGVdIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1N0cmljdF0gUmVzdHJpY3QgdG8gdmFsdWVzIHRoYXQgcGFzcyBgcHJlZGljYXRlYCBjaGVja3MuXG4gKiBAcGFyYW0ge0FycmF5fSBbcmVzdWx0PVtdXSBUaGUgaW5pdGlhbCByZXN1bHQgdmFsdWUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBmbGF0dGVuZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGbGF0dGVuKGFycmF5LCBkZXB0aCwgcHJlZGljYXRlLCBpc1N0cmljdCwgcmVzdWx0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHByZWRpY2F0ZSB8fCAocHJlZGljYXRlID0gaXNGbGF0dGVuYWJsZSk7XG4gIHJlc3VsdCB8fCAocmVzdWx0ID0gW10pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdO1xuICAgIGlmIChkZXB0aCA+IDAgJiYgcHJlZGljYXRlKHZhbHVlKSkge1xuICAgICAgaWYgKGRlcHRoID4gMSkge1xuICAgICAgICAvLyBSZWN1cnNpdmVseSBmbGF0dGVuIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgICBiYXNlRmxhdHRlbih2YWx1ZSwgZGVwdGggLSAxLCBwcmVkaWNhdGUsIGlzU3RyaWN0LCByZXN1bHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJyYXlQdXNoKHJlc3VsdCwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWlzU3RyaWN0KSB7XG4gICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRmxhdHRlbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2Jhc2VGbGF0dGVuLmpzXG4vLyBtb2R1bGUgaWQgPSA4OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgY3JlYXRlQmFzZUZvciA9IHJlcXVpcmUoJy4vX2NyZWF0ZUJhc2VGb3InKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvck93bmAgd2hpY2ggaXRlcmF0ZXMgb3ZlciBgb2JqZWN0YFxuICogcHJvcGVydGllcyByZXR1cm5lZCBieSBga2V5c0Z1bmNgIGFuZCBpbnZva2VzIGBpdGVyYXRlZWAgZm9yIGVhY2ggcHJvcGVydHkuXG4gKiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbnZhciBiYXNlRm9yID0gY3JlYXRlQmFzZUZvcigpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGb3I7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19iYXNlRm9yLmpzXG4vLyBtb2R1bGUgaWQgPSA4OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgY2FzdFBhdGggPSByZXF1aXJlKCcuL19jYXN0UGF0aCcpLFxuICAgIHRvS2V5ID0gcmVxdWlyZSgnLi9fdG9LZXknKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5nZXRgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVmYXVsdCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXQob2JqZWN0LCBwYXRoKSB7XG4gIHBhdGggPSBjYXN0UGF0aChwYXRoLCBvYmplY3QpO1xuXG4gIHZhciBpbmRleCA9IDAsXG4gICAgICBsZW5ndGggPSBwYXRoLmxlbmd0aDtcblxuICB3aGlsZSAob2JqZWN0ICE9IG51bGwgJiYgaW5kZXggPCBsZW5ndGgpIHtcbiAgICBvYmplY3QgPSBvYmplY3RbdG9LZXkocGF0aFtpbmRleCsrXSldO1xuICB9XG4gIHJldHVybiAoaW5kZXggJiYgaW5kZXggPT0gbGVuZ3RoKSA/IG9iamVjdCA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlR2V0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fYmFzZUdldC5qc1xuLy8gbW9kdWxlIGlkID0gOTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5oYXNJbmAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBrZXkgVGhlIGtleSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUhhc0luKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBrZXkgaW4gT2JqZWN0KG9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUhhc0luO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fYmFzZUhhc0luLmpzXG4vLyBtb2R1bGUgaWQgPSA5MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzQXJndW1lbnRzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0FyZ3VtZW50cyh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBhcmdzVGFnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc0FyZ3VtZW50cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2Jhc2VJc0FyZ3VtZW50cy5qc1xuLy8gbW9kdWxlIGlkID0gOTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuL2lzRnVuY3Rpb24nKSxcbiAgICBpc01hc2tlZCA9IHJlcXVpcmUoJy4vX2lzTWFza2VkJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgdG9Tb3VyY2UgPSByZXF1aXJlKCcuL190b1NvdXJjZScpO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmdW5jVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IGlzRnVuY3Rpb24odmFsdWUpID8gcmVJc05hdGl2ZSA6IHJlSXNIb3N0Q3RvcjtcbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc05hdGl2ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2Jhc2VJc05hdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gOTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGFWaWV3VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID1cbnR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPSB0eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID1cbnR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPSB0eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID1cbnR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID1cbnR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNUeXBlZEFycmF5YCB3aXRob3V0IE5vZGUuanMgb3B0aW1pemF0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiZcbiAgICBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3NbYmFzZUdldFRhZyh2YWx1ZSldO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc1R5cGVkQXJyYXk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19iYXNlSXNUeXBlZEFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA5NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgaXNQcm90b3R5cGUgPSByZXF1aXJlKCcuL19pc1Byb3RvdHlwZScpLFxuICAgIG5hdGl2ZUtleXNJbiA9IHJlcXVpcmUoJy4vX25hdGl2ZUtleXNJbicpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNJbmAgd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5c0luKG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5c0luKG9iamVjdCk7XG4gIH1cbiAgdmFyIGlzUHJvdG8gPSBpc1Byb3RvdHlwZShvYmplY3QpLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VLZXlzSW47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19iYXNlS2V5c0luLmpzXG4vLyBtb2R1bGUgaWQgPSA5NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgU3RhY2sgPSByZXF1aXJlKCcuL19TdGFjaycpLFxuICAgIGFzc2lnbk1lcmdlVmFsdWUgPSByZXF1aXJlKCcuL19hc3NpZ25NZXJnZVZhbHVlJyksXG4gICAgYmFzZUZvciA9IHJlcXVpcmUoJy4vX2Jhc2VGb3InKSxcbiAgICBiYXNlTWVyZ2VEZWVwID0gcmVxdWlyZSgnLi9fYmFzZU1lcmdlRGVlcCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIGtleXNJbiA9IHJlcXVpcmUoJy4va2V5c0luJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWVyZ2VgIHdpdGhvdXQgc3VwcG9ydCBmb3IgbXVsdGlwbGUgc291cmNlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzcmNJbmRleCBUaGUgaW5kZXggb2YgYHNvdXJjZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBtZXJnZWQgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2UgdmFsdWVzIGFuZCB0aGVpciBtZXJnZWRcbiAqICBjb3VudGVycGFydHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgsIGN1c3RvbWl6ZXIsIHN0YWNrKSB7XG4gIGlmIChvYmplY3QgPT09IHNvdXJjZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBiYXNlRm9yKHNvdXJjZSwgZnVuY3Rpb24oc3JjVmFsdWUsIGtleSkge1xuICAgIGlmIChpc09iamVjdChzcmNWYWx1ZSkpIHtcbiAgICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgICBiYXNlTWVyZ2VEZWVwKG9iamVjdCwgc291cmNlLCBrZXksIHNyY0luZGV4LCBiYXNlTWVyZ2UsIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgICAgID8gY3VzdG9taXplcihvYmplY3Rba2V5XSwgc3JjVmFsdWUsIChrZXkgKyAnJyksIG9iamVjdCwgc291cmNlLCBzdGFjaylcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gc3JjVmFsdWU7XG4gICAgICB9XG4gICAgICBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG4gICAgfVxuICB9LCBrZXlzSW4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VNZXJnZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2Jhc2VNZXJnZS5qc1xuLy8gbW9kdWxlIGlkID0gOTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFzc2lnbk1lcmdlVmFsdWUgPSByZXF1aXJlKCcuL19hc3NpZ25NZXJnZVZhbHVlJyksXG4gICAgY2xvbmVCdWZmZXIgPSByZXF1aXJlKCcuL19jbG9uZUJ1ZmZlcicpLFxuICAgIGNsb25lVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4vX2Nsb25lVHlwZWRBcnJheScpLFxuICAgIGNvcHlBcnJheSA9IHJlcXVpcmUoJy4vX2NvcHlBcnJheScpLFxuICAgIGluaXRDbG9uZU9iamVjdCA9IHJlcXVpcmUoJy4vX2luaXRDbG9uZU9iamVjdCcpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc0FycmF5TGlrZU9iamVjdCA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2VPYmplY3QnKSxcbiAgICBpc0J1ZmZlciA9IHJlcXVpcmUoJy4vaXNCdWZmZXInKSxcbiAgICBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgaXNQbGFpbk9iamVjdCA9IHJlcXVpcmUoJy4vaXNQbGFpbk9iamVjdCcpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4vaXNUeXBlZEFycmF5JyksXG4gICAgdG9QbGFpbk9iamVjdCA9IHJlcXVpcmUoJy4vdG9QbGFpbk9iamVjdCcpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZU1lcmdlYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIG1lcmdlcyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBtZXJnZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIG1lcmdlLlxuICogQHBhcmFtIHtudW1iZXJ9IHNyY0luZGV4IFRoZSBpbmRleCBvZiBgc291cmNlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1lcmdlRnVuYyBUaGUgZnVuY3Rpb24gdG8gbWVyZ2UgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduZWQgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2UgdmFsdWVzIGFuZCB0aGVpciBtZXJnZWRcbiAqICBjb3VudGVycGFydHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgc3JjSW5kZXgsIG1lcmdlRnVuYywgY3VzdG9taXplciwgc3RhY2spIHtcbiAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICBzcmNWYWx1ZSA9IHNvdXJjZVtrZXldLFxuICAgICAgc3RhY2tlZCA9IHN0YWNrLmdldChzcmNWYWx1ZSk7XG5cbiAgaWYgKHN0YWNrZWQpIHtcbiAgICBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCBzdGFja2VkKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgID8gY3VzdG9taXplcihvYmpWYWx1ZSwgc3JjVmFsdWUsIChrZXkgKyAnJyksIG9iamVjdCwgc291cmNlLCBzdGFjaylcbiAgICA6IHVuZGVmaW5lZDtcblxuICB2YXIgaXNDb21tb24gPSBuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkO1xuXG4gIGlmIChpc0NvbW1vbikge1xuICAgIHZhciBpc0FyciA9IGlzQXJyYXkoc3JjVmFsdWUpLFxuICAgICAgICBpc0J1ZmYgPSAhaXNBcnIgJiYgaXNCdWZmZXIoc3JjVmFsdWUpLFxuICAgICAgICBpc1R5cGVkID0gIWlzQXJyICYmICFpc0J1ZmYgJiYgaXNUeXBlZEFycmF5KHNyY1ZhbHVlKTtcblxuICAgIG5ld1ZhbHVlID0gc3JjVmFsdWU7XG4gICAgaWYgKGlzQXJyIHx8IGlzQnVmZiB8fCBpc1R5cGVkKSB7XG4gICAgICBpZiAoaXNBcnJheShvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBvYmpWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzQXJyYXlMaWtlT2JqZWN0KG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IGNvcHlBcnJheShvYmpWYWx1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc0J1ZmYpIHtcbiAgICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICAgICAgbmV3VmFsdWUgPSBjbG9uZUJ1ZmZlcihzcmNWYWx1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc1R5cGVkKSB7XG4gICAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgICAgIG5ld1ZhbHVlID0gY2xvbmVUeXBlZEFycmF5KHNyY1ZhbHVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBuZXdWYWx1ZSA9IFtdO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHNyY1ZhbHVlKSB8fCBpc0FyZ3VtZW50cyhzcmNWYWx1ZSkpIHtcbiAgICAgIG5ld1ZhbHVlID0gb2JqVmFsdWU7XG4gICAgICBpZiAoaXNBcmd1bWVudHMob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gdG9QbGFpbk9iamVjdChvYmpWYWx1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghaXNPYmplY3Qob2JqVmFsdWUpIHx8IChzcmNJbmRleCAmJiBpc0Z1bmN0aW9uKG9ialZhbHVlKSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBpbml0Q2xvbmVPYmplY3Qoc3JjVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGlmIChpc0NvbW1vbikge1xuICAgIC8vIFJlY3Vyc2l2ZWx5IG1lcmdlIG9iamVjdHMgYW5kIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIHN0YWNrLnNldChzcmNWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIG1lcmdlRnVuYyhuZXdWYWx1ZSwgc3JjVmFsdWUsIHNyY0luZGV4LCBjdXN0b21pemVyLCBzdGFjayk7XG4gICAgc3RhY2tbJ2RlbGV0ZSddKHNyY1ZhbHVlKTtcbiAgfVxuICBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZU1lcmdlRGVlcDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2Jhc2VNZXJnZURlZXAuanNcbi8vIG1vZHVsZSBpZCA9IDk3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBiYXNlUGlja0J5ID0gcmVxdWlyZSgnLi9fYmFzZVBpY2tCeScpLFxuICAgIGhhc0luID0gcmVxdWlyZSgnLi9oYXNJbicpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnBpY2tgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaW5kaXZpZHVhbFxuICogcHJvcGVydHkgaWRlbnRpZmllcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBwYXRocyBUaGUgcHJvcGVydHkgcGF0aHMgdG8gcGljay5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGJhc2VQaWNrKG9iamVjdCwgcGF0aHMpIHtcbiAgcmV0dXJuIGJhc2VQaWNrQnkob2JqZWN0LCBwYXRocywgZnVuY3Rpb24odmFsdWUsIHBhdGgpIHtcbiAgICByZXR1cm4gaGFzSW4ob2JqZWN0LCBwYXRoKTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVBpY2s7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19iYXNlUGljay5qc1xuLy8gbW9kdWxlIGlkID0gOThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGJhc2VHZXQgPSByZXF1aXJlKCcuL19iYXNlR2V0JyksXG4gICAgYmFzZVNldCA9IHJlcXVpcmUoJy4vX2Jhc2VTZXQnKSxcbiAgICBjYXN0UGF0aCA9IHJlcXVpcmUoJy4vX2Nhc3RQYXRoJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgIGBfLnBpY2tCeWAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmdbXX0gcGF0aHMgVGhlIHByb3BlcnR5IHBhdGhzIHRvIHBpY2suXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIHByb3BlcnR5LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYmFzZVBpY2tCeShvYmplY3QsIHBhdGhzLCBwcmVkaWNhdGUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwYXRocy5sZW5ndGgsXG4gICAgICByZXN1bHQgPSB7fTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBwYXRoID0gcGF0aHNbaW5kZXhdLFxuICAgICAgICB2YWx1ZSA9IGJhc2VHZXQob2JqZWN0LCBwYXRoKTtcblxuICAgIGlmIChwcmVkaWNhdGUodmFsdWUsIHBhdGgpKSB7XG4gICAgICBiYXNlU2V0KHJlc3VsdCwgY2FzdFBhdGgocGF0aCwgb2JqZWN0KSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VQaWNrQnk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19iYXNlUGlja0J5LmpzXG4vLyBtb2R1bGUgaWQgPSA5OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5JyksXG4gICAgb3ZlclJlc3QgPSByZXF1aXJlKCcuL19vdmVyUmVzdCcpLFxuICAgIHNldFRvU3RyaW5nID0gcmVxdWlyZSgnLi9fc2V0VG9TdHJpbmcnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5yZXN0YCB3aGljaCBkb2Vzbid0IHZhbGlkYXRlIG9yIGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVJlc3QoZnVuYywgc3RhcnQpIHtcbiAgcmV0dXJuIHNldFRvU3RyaW5nKG92ZXJSZXN0KGZ1bmMsIHN0YXJ0LCBpZGVudGl0eSksIGZ1bmMgKyAnJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVJlc3Q7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19iYXNlUmVzdC5qc1xuLy8gbW9kdWxlIGlkID0gMTAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhc3NpZ25WYWx1ZSA9IHJlcXVpcmUoJy4vX2Fzc2lnblZhbHVlJyksXG4gICAgY2FzdFBhdGggPSByZXF1aXJlKCcuL19jYXN0UGF0aCcpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuL19pc0luZGV4JyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgdG9LZXkgPSByZXF1aXJlKCcuL190b0tleScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnNldGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgcGF0aCBjcmVhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VTZXQob2JqZWN0LCBwYXRoLCB2YWx1ZSwgY3VzdG9taXplcikge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIHBhdGggPSBjYXN0UGF0aChwYXRoLCBvYmplY3QpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGgsXG4gICAgICBsYXN0SW5kZXggPSBsZW5ndGggLSAxLFxuICAgICAgbmVzdGVkID0gb2JqZWN0O1xuXG4gIHdoaWxlIChuZXN0ZWQgIT0gbnVsbCAmJiArK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHRvS2V5KHBhdGhbaW5kZXhdKSxcbiAgICAgICAgbmV3VmFsdWUgPSB2YWx1ZTtcblxuICAgIGlmIChpbmRleCAhPSBsYXN0SW5kZXgpIHtcbiAgICAgIHZhciBvYmpWYWx1ZSA9IG5lc3RlZFtrZXldO1xuICAgICAgbmV3VmFsdWUgPSBjdXN0b21pemVyID8gY3VzdG9taXplcihvYmpWYWx1ZSwga2V5LCBuZXN0ZWQpIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBpc09iamVjdChvYmpWYWx1ZSlcbiAgICAgICAgICA/IG9ialZhbHVlXG4gICAgICAgICAgOiAoaXNJbmRleChwYXRoW2luZGV4ICsgMV0pID8gW10gOiB7fSk7XG4gICAgICB9XG4gICAgfVxuICAgIGFzc2lnblZhbHVlKG5lc3RlZCwga2V5LCBuZXdWYWx1ZSk7XG4gICAgbmVzdGVkID0gbmVzdGVkW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlU2V0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fYmFzZVNldC5qc1xuLy8gbW9kdWxlIGlkID0gMTAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBjb25zdGFudCA9IHJlcXVpcmUoJy4vY29uc3RhbnQnKSxcbiAgICBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2RlZmluZVByb3BlcnR5JyksXG4gICAgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5Jyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYHNldFRvU3RyaW5nYCB3aXRob3V0IHN1cHBvcnQgZm9yIGhvdCBsb29wIHNob3J0aW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdHJpbmcgVGhlIGB0b1N0cmluZ2AgcmVzdWx0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGBmdW5jYC5cbiAqL1xudmFyIGJhc2VTZXRUb1N0cmluZyA9ICFkZWZpbmVQcm9wZXJ0eSA/IGlkZW50aXR5IDogZnVuY3Rpb24oZnVuYywgc3RyaW5nKSB7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eShmdW5jLCAndG9TdHJpbmcnLCB7XG4gICAgJ2NvbmZpZ3VyYWJsZSc6IHRydWUsXG4gICAgJ2VudW1lcmFibGUnOiBmYWxzZSxcbiAgICAndmFsdWUnOiBjb25zdGFudChzdHJpbmcpLFxuICAgICd3cml0YWJsZSc6IHRydWVcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VTZXRUb1N0cmluZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2Jhc2VTZXRUb1N0cmluZy5qc1xuLy8gbW9kdWxlIGlkID0gMTAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVRpbWVzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fYmFzZVRpbWVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpLFxuICAgIGFycmF5TWFwID0gcmVxdWlyZSgnLi9fYXJyYXlNYXAnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNTeW1ib2wgPSByZXF1aXJlKCcuL2lzU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xUb1N0cmluZyA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udG9TdHJpbmcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udG9TdHJpbmdgIHdoaWNoIGRvZXNuJ3QgY29udmVydCBudWxsaXNoXG4gKiB2YWx1ZXMgdG8gZW1wdHkgc3RyaW5ncy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgLy8gUmVjdXJzaXZlbHkgY29udmVydCB2YWx1ZXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICByZXR1cm4gYXJyYXlNYXAodmFsdWUsIGJhc2VUb1N0cmluZykgKyAnJztcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHN5bWJvbFRvU3RyaW5nID8gc3ltYm9sVG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVRvU3RyaW5nO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fYmFzZVRvU3RyaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmFyeWAgd2l0aG91dCBzdXBwb3J0IGZvciBzdG9yaW5nIG1ldGFkYXRhLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgYXJndW1lbnRzIGZvci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNhcHBlZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuYXJ5KGZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmModmFsdWUpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VVbmFyeTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2Jhc2VVbmFyeS5qc1xuLy8gbW9kdWxlIGlkID0gMTA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBVaW50OEFycmF5ID0gcmVxdWlyZSgnLi9fVWludDhBcnJheScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgYXJyYXlCdWZmZXJgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBhcnJheUJ1ZmZlciBUaGUgYXJyYXkgYnVmZmVyIHRvIGNsb25lLlxuICogQHJldHVybnMge0FycmF5QnVmZmVyfSBSZXR1cm5zIHRoZSBjbG9uZWQgYXJyYXkgYnVmZmVyLlxuICovXG5mdW5jdGlvbiBjbG9uZUFycmF5QnVmZmVyKGFycmF5QnVmZmVyKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgYXJyYXlCdWZmZXIuY29uc3RydWN0b3IoYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCk7XG4gIG5ldyBVaW50OEFycmF5KHJlc3VsdCkuc2V0KG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvbmVBcnJheUJ1ZmZlcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2Nsb25lQXJyYXlCdWZmZXIuanNcbi8vIG1vZHVsZSBpZCA9IDEwNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQsXG4gICAgYWxsb2NVbnNhZmUgPSBCdWZmZXIgPyBCdWZmZXIuYWxsb2NVbnNhZmUgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mICBgYnVmZmVyYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlciBUaGUgYnVmZmVyIHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQnVmZmVyKGJ1ZmZlciwgaXNEZWVwKSB7XG4gIGlmIChpc0RlZXApIHtcbiAgICByZXR1cm4gYnVmZmVyLnNsaWNlKCk7XG4gIH1cbiAgdmFyIGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBhbGxvY1Vuc2FmZSA/IGFsbG9jVW5zYWZlKGxlbmd0aCkgOiBuZXcgYnVmZmVyLmNvbnN0cnVjdG9yKGxlbmd0aCk7XG5cbiAgYnVmZmVyLmNvcHkocmVzdWx0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9uZUJ1ZmZlcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2Nsb25lQnVmZmVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGNsb25lQXJyYXlCdWZmZXIgPSByZXF1aXJlKCcuL19jbG9uZUFycmF5QnVmZmVyJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGB0eXBlZEFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHR5cGVkQXJyYXkgVGhlIHR5cGVkIGFycmF5IHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCB0eXBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gY2xvbmVUeXBlZEFycmF5KHR5cGVkQXJyYXksIGlzRGVlcCkge1xuICB2YXIgYnVmZmVyID0gaXNEZWVwID8gY2xvbmVBcnJheUJ1ZmZlcih0eXBlZEFycmF5LmJ1ZmZlcikgOiB0eXBlZEFycmF5LmJ1ZmZlcjtcbiAgcmV0dXJuIG5ldyB0eXBlZEFycmF5LmNvbnN0cnVjdG9yKGJ1ZmZlciwgdHlwZWRBcnJheS5ieXRlT2Zmc2V0LCB0eXBlZEFycmF5Lmxlbmd0aCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvbmVUeXBlZEFycmF5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fY2xvbmVUeXBlZEFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSAxMDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3BpZXMgdGhlIHZhbHVlcyBvZiBgc291cmNlYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBzb3VyY2UgVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXk9W11dIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyB0by5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBjb3B5QXJyYXkoc291cmNlLCBhcnJheSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHNvdXJjZS5sZW5ndGg7XG5cbiAgYXJyYXkgfHwgKGFycmF5ID0gQXJyYXkobGVuZ3RoKSk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbaW5kZXhdID0gc291cmNlW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29weUFycmF5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fY29weUFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSAxMDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFzc2lnblZhbHVlID0gcmVxdWlyZSgnLi9fYXNzaWduVmFsdWUnKSxcbiAgICBiYXNlQXNzaWduVmFsdWUgPSByZXF1aXJlKCcuL19iYXNlQXNzaWduVmFsdWUnKTtcblxuLyoqXG4gKiBDb3BpZXMgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IGlkZW50aWZpZXJzIHRvIGNvcHkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb3BpZWQgdmFsdWVzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gY29weU9iamVjdChzb3VyY2UsIHByb3BzLCBvYmplY3QsIGN1c3RvbWl6ZXIpIHtcbiAgdmFyIGlzTmV3ID0gIW9iamVjdDtcbiAgb2JqZWN0IHx8IChvYmplY3QgPSB7fSk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuXG4gICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgPyBjdXN0b21pemVyKG9iamVjdFtrZXldLCBzb3VyY2Vba2V5XSwga2V5LCBvYmplY3QsIHNvdXJjZSlcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5ld1ZhbHVlID0gc291cmNlW2tleV07XG4gICAgfVxuICAgIGlmIChpc05ldykge1xuICAgICAgYmFzZUFzc2lnblZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29weU9iamVjdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2NvcHlPYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDExMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb3JlSnNEYXRhO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fY29yZUpzRGF0YS5qc1xuLy8gbW9kdWxlIGlkID0gMTExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBiYXNlUmVzdCA9IHJlcXVpcmUoJy4vX2Jhc2VSZXN0JyksXG4gICAgaXNJdGVyYXRlZUNhbGwgPSByZXF1aXJlKCcuL19pc0l0ZXJhdGVlQ2FsbCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiBsaWtlIGBfLmFzc2lnbmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFzc2lnbmVyIFRoZSBmdW5jdGlvbiB0byBhc3NpZ24gdmFsdWVzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYXNzaWduZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUFzc2lnbmVyKGFzc2lnbmVyKSB7XG4gIHJldHVybiBiYXNlUmVzdChmdW5jdGlvbihvYmplY3QsIHNvdXJjZXMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gc291cmNlcy5sZW5ndGgsXG4gICAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPiAxID8gc291cmNlc1tsZW5ndGggLSAxXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgZ3VhcmQgPSBsZW5ndGggPiAyID8gc291cmNlc1syXSA6IHVuZGVmaW5lZDtcblxuICAgIGN1c3RvbWl6ZXIgPSAoYXNzaWduZXIubGVuZ3RoID4gMyAmJiB0eXBlb2YgY3VzdG9taXplciA9PSAnZnVuY3Rpb24nKVxuICAgICAgPyAobGVuZ3RoLS0sIGN1c3RvbWl6ZXIpXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChndWFyZCAmJiBpc0l0ZXJhdGVlQ2FsbChzb3VyY2VzWzBdLCBzb3VyY2VzWzFdLCBndWFyZCkpIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPCAzID8gdW5kZWZpbmVkIDogY3VzdG9taXplcjtcbiAgICAgIGxlbmd0aCA9IDE7XG4gICAgfVxuICAgIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgc291cmNlID0gc291cmNlc1tpbmRleF07XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIGFzc2lnbmVyKG9iamVjdCwgc291cmNlLCBpbmRleCwgY3VzdG9taXplcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUFzc2lnbmVyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fY3JlYXRlQXNzaWduZXIuanNcbi8vIG1vZHVsZSBpZCA9IDExMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENyZWF0ZXMgYSBiYXNlIGZ1bmN0aW9uIGZvciBtZXRob2RzIGxpa2UgYF8uZm9ySW5gIGFuZCBgXy5mb3JPd25gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VGb3IoZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBpdGVyYWJsZSA9IE9iamVjdChvYmplY3QpLFxuICAgICAgICBwcm9wcyA9IGtleXNGdW5jKG9iamVjdCksXG4gICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzW2Zyb21SaWdodCA/IGxlbmd0aCA6ICsraW5kZXhdO1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2tleV0sIGtleSwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVCYXNlRm9yO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fY3JlYXRlQmFzZUZvci5qc1xuLy8gbW9kdWxlIGlkID0gMTEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBmbGF0dGVuID0gcmVxdWlyZSgnLi9mbGF0dGVuJyksXG4gICAgb3ZlclJlc3QgPSByZXF1aXJlKCcuL19vdmVyUmVzdCcpLFxuICAgIHNldFRvU3RyaW5nID0gcmVxdWlyZSgnLi9fc2V0VG9TdHJpbmcnKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VSZXN0YCB3aGljaCBmbGF0dGVucyB0aGUgcmVzdCBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYXBwbHkgYSByZXN0IHBhcmFtZXRlciB0by5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBmbGF0UmVzdChmdW5jKSB7XG4gIHJldHVybiBzZXRUb1N0cmluZyhvdmVyUmVzdChmdW5jLCB1bmRlZmluZWQsIGZsYXR0ZW4pLCBmdW5jICsgJycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZsYXRSZXN0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fZmxhdFJlc3QuanNcbi8vIG1vZHVsZSBpZCA9IDExNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSYXdUYWc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19nZXRSYXdUYWcuanNcbi8vIG1vZHVsZSBpZCA9IDExNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRWYWx1ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2dldFZhbHVlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGNhc3RQYXRoID0gcmVxdWlyZSgnLi9fY2FzdFBhdGgnKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4vX2lzSW5kZXgnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKSxcbiAgICB0b0tleSA9IHJlcXVpcmUoJy4vX3RvS2V5Jyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBwYXRoYCBleGlzdHMgb24gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGNoZWNrLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFzRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2sgcHJvcGVydGllcy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgcGF0aGAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc1BhdGgob2JqZWN0LCBwYXRoLCBoYXNGdW5jKSB7XG4gIHBhdGggPSBjYXN0UGF0aChwYXRoLCBvYmplY3QpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBmYWxzZTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSB0b0tleShwYXRoW2luZGV4XSk7XG4gICAgaWYgKCEocmVzdWx0ID0gb2JqZWN0ICE9IG51bGwgJiYgaGFzRnVuYyhvYmplY3QsIGtleSkpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgb2JqZWN0ID0gb2JqZWN0W2tleV07XG4gIH1cbiAgaWYgKHJlc3VsdCB8fCArK2luZGV4ICE9IGxlbmd0aCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgbGVuZ3RoID0gb2JqZWN0ID09IG51bGwgPyAwIDogb2JqZWN0Lmxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiYgaXNJbmRleChrZXksIGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc1BhdGg7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19oYXNQYXRoLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIG5hdGl2ZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX25hdGl2ZUNyZWF0ZScpO1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgSGFzaFxuICovXG5mdW5jdGlvbiBoYXNoQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuYXRpdmVDcmVhdGUgPyBuYXRpdmVDcmVhdGUobnVsbCkgOiB7fTtcbiAgdGhpcy5zaXplID0gMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoQ2xlYXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19oYXNoQ2xlYXIuanNcbi8vIG1vZHVsZSBpZCA9IDExOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgdmFyIHJlc3VsdCA9IHRoaXMuaGFzKGtleSkgJiYgZGVsZXRlIHRoaXMuX19kYXRhX19ba2V5XTtcbiAgdGhpcy5zaXplIC09IHJlc3VsdCA/IDEgOiAwO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hEZWxldGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19oYXNoRGVsZXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIG5hdGl2ZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX25hdGl2ZUNyZWF0ZScpO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBoYXNoR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YVtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaEdldDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2hhc2hHZXQuanNcbi8vIG1vZHVsZSBpZCA9IDEyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbmF0aXZlQ3JlYXRlID0gcmVxdWlyZSgnLi9fbmF0aXZlQ3JlYXRlJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgaGFzaCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICByZXR1cm4gbmF0aXZlQ3JlYXRlID8gKGRhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSA6IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoSGFzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9faGFzaEhhcy5qc1xuLy8gbW9kdWxlIGlkID0gMTIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICB0aGlzLnNpemUgKz0gdGhpcy5oYXMoa2V5KSA/IDAgOiAxO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaFNldDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2hhc2hTZXQuanNcbi8vIG1vZHVsZSBpZCA9IDEyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYmFzZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX2Jhc2VDcmVhdGUnKSxcbiAgICBnZXRQcm90b3R5cGUgPSByZXF1aXJlKCcuL19nZXRQcm90b3R5cGUnKSxcbiAgICBpc1Byb3RvdHlwZSA9IHJlcXVpcmUoJy4vX2lzUHJvdG90eXBlJyk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gb2JqZWN0IGNsb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBpbml0aWFsaXplZCBjbG9uZS5cbiAqL1xuZnVuY3Rpb24gaW5pdENsb25lT2JqZWN0KG9iamVjdCkge1xuICByZXR1cm4gKHR5cGVvZiBvYmplY3QuY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNQcm90b3R5cGUob2JqZWN0KSlcbiAgICA/IGJhc2VDcmVhdGUoZ2V0UHJvdG90eXBlKG9iamVjdCkpXG4gICAgOiB7fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbml0Q2xvbmVPYmplY3Q7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19pbml0Q2xvbmVPYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDEyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzcHJlYWRhYmxlU3ltYm9sID0gU3ltYm9sID8gU3ltYm9sLmlzQ29uY2F0U3ByZWFkYWJsZSA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGZsYXR0ZW5hYmxlIGBhcmd1bWVudHNgIG9iamVjdCBvciBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBmbGF0dGVuYWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0ZsYXR0ZW5hYmxlKHZhbHVlKSB7XG4gIHJldHVybiBpc0FycmF5KHZhbHVlKSB8fCBpc0FyZ3VtZW50cyh2YWx1ZSkgfHxcbiAgICAhIShzcHJlYWRhYmxlU3ltYm9sICYmIHZhbHVlICYmIHZhbHVlW3NwcmVhZGFibGVTeW1ib2xdKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0ZsYXR0ZW5hYmxlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9faXNGbGF0dGVuYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBlcSA9IHJlcXVpcmUoJy4vZXEnKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9faXNJbmRleCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSB2YWx1ZSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gaW5kZXggVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBpbmRleCBvciBrZXkgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IG9iamVjdCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIG9iamVjdCBhcmd1bWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0l0ZXJhdGVlQ2FsbCh2YWx1ZSwgaW5kZXgsIG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgaW5kZXg7XG4gIGlmICh0eXBlID09ICdudW1iZXInXG4gICAgICAgID8gKGlzQXJyYXlMaWtlKG9iamVjdCkgJiYgaXNJbmRleChpbmRleCwgb2JqZWN0Lmxlbmd0aCkpXG4gICAgICAgIDogKHR5cGUgPT0gJ3N0cmluZycgJiYgaW5kZXggaW4gb2JqZWN0KVxuICAgICAgKSB7XG4gICAgcmV0dXJuIGVxKG9iamVjdFtpbmRleF0sIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJdGVyYXRlZUNhbGw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19pc0l0ZXJhdGVlQ2FsbC5qc1xuLy8gbW9kdWxlIGlkID0gMTI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNTeW1ib2wgPSByZXF1aXJlKCcuL2lzU3ltYm9sJyk7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIHByb3BlcnR5IG5hbWVzIHdpdGhpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUlzRGVlcFByb3AgPSAvXFwufFxcWyg/OlteW1xcXV0qfChbXCInXSkoPzooPyFcXDEpW15cXFxcXXxcXFxcLikqP1xcMSlcXF0vLFxuICAgIHJlSXNQbGFpblByb3AgPSAvXlxcdyokLztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUgYW5kIG5vdCBhIHByb3BlcnR5IHBhdGguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkga2V5cyBvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleSh2YWx1ZSwgb2JqZWN0KSB7XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJyB8fFxuICAgICAgdmFsdWUgPT0gbnVsbCB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gcmVJc1BsYWluUHJvcC50ZXN0KHZhbHVlKSB8fCAhcmVJc0RlZXBQcm9wLnRlc3QodmFsdWUpIHx8XG4gICAgKG9iamVjdCAhPSBudWxsICYmIHZhbHVlIGluIE9iamVjdChvYmplY3QpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0tleTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2lzS2V5LmpzXG4vLyBtb2R1bGUgaWQgPSAxMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICA/ICh2YWx1ZSAhPT0gJ19fcHJvdG9fXycpXG4gICAgOiAodmFsdWUgPT09IG51bGwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzS2V5YWJsZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2lzS2V5YWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBjb3JlSnNEYXRhID0gcmVxdWlyZSgnLi9fY29yZUpzRGF0YScpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTWFza2VkO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9faXNNYXNrZWQuanNcbi8vIG1vZHVsZSBpZCA9IDEyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdENhY2hlQ2xlYXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19saXN0Q2FjaGVDbGVhci5qc1xuLy8gbW9kdWxlIGlkID0gMTI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhc3NvY0luZGV4T2YgPSByZXF1aXJlKCcuL19hc3NvY0luZGV4T2YnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlO1xuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICBpZiAoaW5kZXggPT0gbGFzdEluZGV4KSB7XG4gICAgZGF0YS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChkYXRhLCBpbmRleCwgMSk7XG4gIH1cbiAgLS10aGlzLnNpemU7XG4gIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RDYWNoZURlbGV0ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2xpc3RDYWNoZURlbGV0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhc3NvY0luZGV4T2YgPSByZXF1aXJlKCcuL19hc3NvY0luZGV4T2YnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVHZXQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19saXN0Q2FjaGVHZXQuanNcbi8vIG1vZHVsZSBpZCA9IDEzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RDYWNoZUhhcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2xpc3RDYWNoZUhhcy5qc1xuLy8gbW9kdWxlIGlkID0gMTMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhc3NvY0luZGV4T2YgPSByZXF1aXJlKCcuL19hc3NvY0luZGV4T2YnKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBsaXN0IGNhY2hlIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBsaXN0IGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICArK3RoaXMuc2l6ZTtcbiAgICBkYXRhLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhW2luZGV4XVsxXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RDYWNoZVNldDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2xpc3RDYWNoZVNldC5qc1xuLy8gbW9kdWxlIGlkID0gMTMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBIYXNoID0gcmVxdWlyZSgnLi9fSGFzaCcpLFxuICAgIExpc3RDYWNoZSA9IHJlcXVpcmUoJy4vX0xpc3RDYWNoZScpLFxuICAgIE1hcCA9IHJlcXVpcmUoJy4vX01hcCcpO1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLnNpemUgPSAwO1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVDbGVhcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX21hcENhY2hlQ2xlYXIuanNcbi8vIG1vZHVsZSBpZCA9IDEzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2V0TWFwRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hcERhdGEnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgcmVzdWx0ID0gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xuICB0aGlzLnNpemUgLT0gcmVzdWx0ID8gMSA6IDA7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVEZWxldGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19tYXBDYWNoZURlbGV0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnZXRNYXBEYXRhID0gcmVxdWlyZSgnLi9fZ2V0TWFwRGF0YScpO1xuXG4vKipcbiAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVHZXQoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuZ2V0KGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVHZXQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19tYXBDYWNoZUdldC5qc1xuLy8gbW9kdWxlIGlkID0gMTM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnZXRNYXBEYXRhID0gcmVxdWlyZSgnLi9fZ2V0TWFwRGF0YScpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlSGFzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fbWFwQ2FjaGVIYXMuanNcbi8vIG1vZHVsZSBpZCA9IDEzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2V0TWFwRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hcERhdGEnKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLFxuICAgICAgc2l6ZSA9IGRhdGEuc2l6ZTtcblxuICBkYXRhLnNldChrZXksIHZhbHVlKTtcbiAgdGhpcy5zaXplICs9IGRhdGEuc2l6ZSA9PSBzaXplID8gMCA6IDE7XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlU2V0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fbWFwQ2FjaGVTZXQuanNcbi8vIG1vZHVsZSBpZCA9IDEzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbWVtb2l6ZSA9IHJlcXVpcmUoJy4vbWVtb2l6ZScpO1xuXG4vKiogVXNlZCBhcyB0aGUgbWF4aW11bSBtZW1vaXplIGNhY2hlIHNpemUuICovXG52YXIgTUFYX01FTU9JWkVfU0laRSA9IDUwMDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ubWVtb2l6ZWAgd2hpY2ggY2xlYXJzIHRoZSBtZW1vaXplZCBmdW5jdGlvbidzXG4gKiBjYWNoZSB3aGVuIGl0IGV4Y2VlZHMgYE1BWF9NRU1PSVpFX1NJWkVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBoYXZlIGl0cyBvdXRwdXQgbWVtb2l6ZWQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBtZW1vaXplZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gbWVtb2l6ZUNhcHBlZChmdW5jKSB7XG4gIHZhciByZXN1bHQgPSBtZW1vaXplKGZ1bmMsIGZ1bmN0aW9uKGtleSkge1xuICAgIGlmIChjYWNoZS5zaXplID09PSBNQVhfTUVNT0laRV9TSVpFKSB7XG4gICAgICBjYWNoZS5jbGVhcigpO1xuICAgIH1cbiAgICByZXR1cm4ga2V5O1xuICB9KTtcblxuICB2YXIgY2FjaGUgPSByZXN1bHQuY2FjaGU7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWVtb2l6ZUNhcHBlZDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX21lbW9pemVDYXBwZWQuanNcbi8vIG1vZHVsZSBpZCA9IDEzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZVxuICogW2BPYmplY3Qua2V5c2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZXhjZXB0IHRoYXQgaXQgaW5jbHVkZXMgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gbmF0aXZlS2V5c0luKG9iamVjdCkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmIChvYmplY3QgIT0gbnVsbCkge1xuICAgIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuYXRpdmVLZXlzSW47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19uYXRpdmVLZXlzSW4uanNcbi8vIG1vZHVsZSBpZCA9IDE0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHByb2Nlc3NgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlUHJvY2VzcyA9IG1vZHVsZUV4cG9ydHMgJiYgZnJlZUdsb2JhbC5wcm9jZXNzO1xuXG4vKiogVXNlZCB0byBhY2Nlc3MgZmFzdGVyIE5vZGUuanMgaGVscGVycy4gKi9cbnZhciBub2RlVXRpbCA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZnJlZVByb2Nlc3MgJiYgZnJlZVByb2Nlc3MuYmluZGluZyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nKCd1dGlsJyk7XG4gIH0gY2F0Y2ggKGUpIHt9XG59KCkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5vZGVVdGlsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fbm9kZVV0aWwuanNcbi8vIG1vZHVsZSBpZCA9IDE0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvYmplY3RUb1N0cmluZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX29iamVjdFRvU3RyaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb3ZlckFyZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX292ZXJBcmcuanNcbi8vIG1vZHVsZSBpZCA9IDE0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogVXNlZCB0byBkZXRlY3QgaG90IGZ1bmN0aW9ucyBieSBudW1iZXIgb2YgY2FsbHMgd2l0aGluIGEgc3BhbiBvZiBtaWxsaXNlY29uZHMuICovXG52YXIgSE9UX0NPVU5UID0gODAwLFxuICAgIEhPVF9TUEFOID0gMTY7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVOb3cgPSBEYXRlLm5vdztcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCdsbCBzaG9ydCBvdXQgYW5kIGludm9rZSBgaWRlbnRpdHlgIGluc3RlYWRcbiAqIG9mIGBmdW5jYCB3aGVuIGl0J3MgY2FsbGVkIGBIT1RfQ09VTlRgIG9yIG1vcmUgdGltZXMgaW4gYEhPVF9TUEFOYFxuICogbWlsbGlzZWNvbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byByZXN0cmljdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHNob3J0YWJsZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gc2hvcnRPdXQoZnVuYykge1xuICB2YXIgY291bnQgPSAwLFxuICAgICAgbGFzdENhbGxlZCA9IDA7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdGFtcCA9IG5hdGl2ZU5vdygpLFxuICAgICAgICByZW1haW5pbmcgPSBIT1RfU1BBTiAtIChzdGFtcCAtIGxhc3RDYWxsZWQpO1xuXG4gICAgbGFzdENhbGxlZCA9IHN0YW1wO1xuICAgIGlmIChyZW1haW5pbmcgPiAwKSB7XG4gICAgICBpZiAoKytjb3VudCA+PSBIT1RfQ09VTlQpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3VtZW50c1swXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY291bnQgPSAwO1xuICAgIH1cbiAgICByZXR1cm4gZnVuYy5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvcnRPdXQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19zaG9ydE91dC5qc1xuLy8gbW9kdWxlIGlkID0gMTQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBMaXN0Q2FjaGUgPSByZXF1aXJlKCcuL19MaXN0Q2FjaGUnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBTdGFja1xuICovXG5mdW5jdGlvbiBzdGFja0NsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZTtcbiAgdGhpcy5zaXplID0gMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFja0NsZWFyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fc3RhY2tDbGVhci5qc1xuLy8gbW9kdWxlIGlkID0gMTQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICByZXN1bHQgPSBkYXRhWydkZWxldGUnXShrZXkpO1xuXG4gIHRoaXMuc2l6ZSA9IGRhdGEuc2l6ZTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFja0RlbGV0ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX3N0YWNrRGVsZXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBHZXRzIHRoZSBzdGFjayB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tHZXQoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmdldChrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YWNrR2V0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fc3RhY2tHZXQuanNcbi8vIG1vZHVsZSBpZCA9IDE0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENoZWNrcyBpZiBhIHN0YWNrIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tIYXMoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyhrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YWNrSGFzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fc3RhY2tIYXMuanNcbi8vIG1vZHVsZSBpZCA9IDE0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgTGlzdENhY2hlID0gcmVxdWlyZSgnLi9fTGlzdENhY2hlJyksXG4gICAgTWFwID0gcmVxdWlyZSgnLi9fTWFwJyksXG4gICAgTWFwQ2FjaGUgPSByZXF1aXJlKCcuL19NYXBDYWNoZScpO1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSB0byBlbmFibGUgbGFyZ2UgYXJyYXkgb3B0aW1pemF0aW9ucy4gKi9cbnZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4vKipcbiAqIFNldHMgdGhlIHN0YWNrIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIHN0YWNrIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzdGFja1NldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKGRhdGEgaW5zdGFuY2VvZiBMaXN0Q2FjaGUpIHtcbiAgICB2YXIgcGFpcnMgPSBkYXRhLl9fZGF0YV9fO1xuICAgIGlmICghTWFwIHx8IChwYWlycy5sZW5ndGggPCBMQVJHRV9BUlJBWV9TSVpFIC0gMSkpIHtcbiAgICAgIHBhaXJzLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICAgIHRoaXMuc2l6ZSA9ICsrZGF0YS5zaXplO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGRhdGEgPSB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlKHBhaXJzKTtcbiAgfVxuICBkYXRhLnNldChrZXksIHZhbHVlKTtcbiAgdGhpcy5zaXplID0gZGF0YS5zaXplO1xuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFja1NldDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX3N0YWNrU2V0LmpzXG4vLyBtb2R1bGUgaWQgPSAxNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIG1lbW9pemVDYXBwZWQgPSByZXF1aXJlKCcuL19tZW1vaXplQ2FwcGVkJyk7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIHByb3BlcnR5IG5hbWVzIHdpdGhpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUxlYWRpbmdEb3QgPSAvXlxcLi8sXG4gICAgcmVQcm9wTmFtZSA9IC9bXi5bXFxdXSt8XFxbKD86KC0/XFxkKyg/OlxcLlxcZCspPyl8KFtcIiddKSgoPzooPyFcXDIpW15cXFxcXXxcXFxcLikqPylcXDIpXFxdfCg/PSg/OlxcLnxcXFtcXF0pKD86XFwufFxcW1xcXXwkKSkvZztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVFc2NhcGVDaGFyID0gL1xcXFwoXFxcXCk/L2c7XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG8gYSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xudmFyIHN0cmluZ1RvUGF0aCA9IG1lbW9pemVDYXBwZWQoZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKHJlTGVhZGluZ0RvdC50ZXN0KHN0cmluZykpIHtcbiAgICByZXN1bHQucHVzaCgnJyk7XG4gIH1cbiAgc3RyaW5nLnJlcGxhY2UocmVQcm9wTmFtZSwgZnVuY3Rpb24obWF0Y2gsIG51bWJlciwgcXVvdGUsIHN0cmluZykge1xuICAgIHJlc3VsdC5wdXNoKHF1b3RlID8gc3RyaW5nLnJlcGxhY2UocmVFc2NhcGVDaGFyLCAnJDEnKSA6IChudW1iZXIgfHwgbWF0Y2gpKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBzdHJpbmdUb1BhdGg7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19zdHJpbmdUb1BhdGguanNcbi8vIG1vZHVsZSBpZCA9IDE1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9Tb3VyY2U7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL190b1NvdXJjZS5qc1xuLy8gbW9kdWxlIGlkID0gMTUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBgdmFsdWVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byByZXR1cm4gZnJvbSB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY29uc3RhbnQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3RzID0gXy50aW1lcygyLCBfLmNvbnN0YW50KHsgJ2EnOiAxIH0pKTtcbiAqXG4gKiBjb25zb2xlLmxvZyhvYmplY3RzKTtcbiAqIC8vID0+IFt7ICdhJzogMSB9LCB7ICdhJzogMSB9XVxuICpcbiAqIGNvbnNvbGUubG9nKG9iamVjdHNbMF0gPT09IG9iamVjdHNbMV0pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBjb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnN0YW50O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9jb25zdGFudC5qc1xuLy8gbW9kdWxlIGlkID0gMTUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBiYXNlRmxhdHRlbiA9IHJlcXVpcmUoJy4vX2Jhc2VGbGF0dGVuJyk7XG5cbi8qKlxuICogRmxhdHRlbnMgYGFycmF5YCBhIHNpbmdsZSBsZXZlbCBkZWVwLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGZsYXR0ZW4uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBmbGF0dGVuZWQgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZmxhdHRlbihbMSwgWzIsIFszLCBbNF1dLCA1XV0pO1xuICogLy8gPT4gWzEsIDIsIFszLCBbNF1dLCA1XVxuICovXG5mdW5jdGlvbiBmbGF0dGVuKGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcbiAgcmV0dXJuIGxlbmd0aCA/IGJhc2VGbGF0dGVuKGFycmF5LCAxKSA6IFtdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZsYXR0ZW47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL2ZsYXR0ZW4uanNcbi8vIG1vZHVsZSBpZCA9IDE1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYmFzZUhhc0luID0gcmVxdWlyZSgnLi9fYmFzZUhhc0luJyksXG4gICAgaGFzUGF0aCA9IHJlcXVpcmUoJy4vX2hhc1BhdGgnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHBhdGhgIGlzIGEgZGlyZWN0IG9yIGluaGVyaXRlZCBwcm9wZXJ0eSBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgcGF0aGAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSBfLmNyZWF0ZSh7ICdhJzogXy5jcmVhdGUoeyAnYic6IDIgfSkgfSk7XG4gKlxuICogXy5oYXNJbihvYmplY3QsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5oYXNJbihvYmplY3QsICdhLmInKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgWydhJywgJ2InXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5oYXNJbihvYmplY3QsICdiJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBoYXNJbihvYmplY3QsIHBhdGgpIHtcbiAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIGhhc1BhdGgob2JqZWN0LCBwYXRoLCBiYXNlSGFzSW4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc0luO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9oYXNJbi5qc1xuLy8gbW9kdWxlIGlkID0gMTU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheS1saWtlIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheUxpa2VPYmplY3Q7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL2lzQXJyYXlMaWtlT2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgZ2V0UHJvdG90eXBlID0gcmVxdWlyZSgnLi9fZ2V0UHJvdG90eXBlJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xudmFyIG9iamVjdEN0b3JTdHJpbmcgPSBmdW5jVG9TdHJpbmcuY2FsbChPYmplY3QpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fCBiYXNlR2V0VGFnKHZhbHVlKSAhPSBvYmplY3RUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuIHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiZcbiAgICBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUGxhaW5PYmplY3Q7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL2lzUGxhaW5PYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDE1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgTWFwQ2FjaGUgPSByZXF1aXJlKCcuL19NYXBDYWNoZScpO1xuXG4vKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IG1lbW9pemVzIHRoZSByZXN1bHQgb2YgYGZ1bmNgLiBJZiBgcmVzb2x2ZXJgIGlzXG4gKiBwcm92aWRlZCwgaXQgZGV0ZXJtaW5lcyB0aGUgY2FjaGUga2V5IGZvciBzdG9yaW5nIHRoZSByZXN1bHQgYmFzZWQgb24gdGhlXG4gKiBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uLiBCeSBkZWZhdWx0LCB0aGUgZmlyc3QgYXJndW1lbnRcbiAqIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbiBpcyB1c2VkIGFzIHRoZSBtYXAgY2FjaGUga2V5LiBUaGUgYGZ1bmNgXG4gKiBpcyBpbnZva2VkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBtZW1vaXplZCBmdW5jdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogVGhlIGNhY2hlIGlzIGV4cG9zZWQgYXMgdGhlIGBjYWNoZWAgcHJvcGVydHkgb24gdGhlIG1lbW9pemVkXG4gKiBmdW5jdGlvbi4gSXRzIGNyZWF0aW9uIG1heSBiZSBjdXN0b21pemVkIGJ5IHJlcGxhY2luZyB0aGUgYF8ubWVtb2l6ZS5DYWNoZWBcbiAqIGNvbnN0cnVjdG9yIHdpdGggb25lIHdob3NlIGluc3RhbmNlcyBpbXBsZW1lbnQgdGhlXG4gKiBbYE1hcGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXByb3BlcnRpZXMtb2YtdGhlLW1hcC1wcm90b3R5cGUtb2JqZWN0KVxuICogbWV0aG9kIGludGVyZmFjZSBvZiBgY2xlYXJgLCBgZGVsZXRlYCwgYGdldGAsIGBoYXNgLCBhbmQgYHNldGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBoYXZlIGl0cyBvdXRwdXQgbWVtb2l6ZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmVzb2x2ZXJdIFRoZSBmdW5jdGlvbiB0byByZXNvbHZlIHRoZSBjYWNoZSBrZXkuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBtZW1vaXplZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxLCAnYic6IDIgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2MnOiAzLCAnZCc6IDQgfTtcbiAqXG4gKiB2YXIgdmFsdWVzID0gXy5tZW1vaXplKF8udmFsdWVzKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogdmFsdWVzKG90aGVyKTtcbiAqIC8vID0+IFszLCA0XVxuICpcbiAqIG9iamVjdC5hID0gMjtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogLy8gTW9kaWZ5IHRoZSByZXN1bHQgY2FjaGUuXG4gKiB2YWx1ZXMuY2FjaGUuc2V0KG9iamVjdCwgWydhJywgJ2InXSk7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsnYScsICdiJ11cbiAqXG4gKiAvLyBSZXBsYWNlIGBfLm1lbW9pemUuQ2FjaGVgLlxuICogXy5tZW1vaXplLkNhY2hlID0gV2Vha01hcDtcbiAqL1xuZnVuY3Rpb24gbWVtb2l6ZShmdW5jLCByZXNvbHZlcikge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJyB8fCAocmVzb2x2ZXIgIT0gbnVsbCAmJiB0eXBlb2YgcmVzb2x2ZXIgIT0gJ2Z1bmN0aW9uJykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgdmFyIG1lbW9pemVkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGtleSA9IHJlc29sdmVyID8gcmVzb2x2ZXIuYXBwbHkodGhpcywgYXJncykgOiBhcmdzWzBdLFxuICAgICAgICBjYWNoZSA9IG1lbW9pemVkLmNhY2hlO1xuXG4gICAgaWYgKGNhY2hlLmhhcyhrZXkpKSB7XG4gICAgICByZXR1cm4gY2FjaGUuZ2V0KGtleSk7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIG1lbW9pemVkLmNhY2hlID0gY2FjaGUuc2V0KGtleSwgcmVzdWx0KSB8fCBjYWNoZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBtZW1vaXplZC5jYWNoZSA9IG5ldyAobWVtb2l6ZS5DYWNoZSB8fCBNYXBDYWNoZSk7XG4gIHJldHVybiBtZW1vaXplZDtcbn1cblxuLy8gRXhwb3NlIGBNYXBDYWNoZWAuXG5tZW1vaXplLkNhY2hlID0gTWFwQ2FjaGU7XG5cbm1vZHVsZS5leHBvcnRzID0gbWVtb2l6ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvbWVtb2l6ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBiYXNlUGljayA9IHJlcXVpcmUoJy4vX2Jhc2VQaWNrJyksXG4gICAgZmxhdFJlc3QgPSByZXF1aXJlKCcuL19mbGF0UmVzdCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mIHRoZSBwaWNrZWQgYG9iamVjdGAgcHJvcGVydGllcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHsuLi4oc3RyaW5nfHN0cmluZ1tdKX0gW3BhdGhzXSBUaGUgcHJvcGVydHkgcGF0aHMgdG8gcGljay5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSwgJ2InOiAnMicsICdjJzogMyB9O1xuICpcbiAqIF8ucGljayhvYmplY3QsIFsnYScsICdjJ10pO1xuICogLy8gPT4geyAnYSc6IDEsICdjJzogMyB9XG4gKi9cbnZhciBwaWNrID0gZmxhdFJlc3QoZnVuY3Rpb24ob2JqZWN0LCBwYXRocykge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB7fSA6IGJhc2VQaWNrKG9iamVjdCwgcGF0aHMpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGljaztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvcGljay5qc1xuLy8gbW9kdWxlIGlkID0gMTU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50aW1lcygyLCBfLnN0dWJGYWxzZSk7XG4gKiAvLyA9PiBbZmFsc2UsIGZhbHNlXVxuICovXG5mdW5jdGlvbiBzdHViRmFsc2UoKSB7XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHViRmFsc2U7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL3N0dWJGYWxzZS5qc1xuLy8gbW9kdWxlIGlkID0gMTU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBjb3B5T2JqZWN0ID0gcmVxdWlyZSgnLi9fY29weU9iamVjdCcpLFxuICAgIGtleXNJbiA9IHJlcXVpcmUoJy4va2V5c0luJyk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHBsYWluIG9iamVjdCBmbGF0dGVuaW5nIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN0cmluZ1xuICoga2V5ZWQgcHJvcGVydGllcyBvZiBgdmFsdWVgIHRvIG93biBwcm9wZXJ0aWVzIG9mIHRoZSBwbGFpbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgcGxhaW4gb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBuZXcgRm9vKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIgfVxuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIF8udG9QbGFpbk9iamVjdChuZXcgRm9vKSk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyLCAnYyc6IDMgfVxuICovXG5mdW5jdGlvbiB0b1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBjb3B5T2JqZWN0KHZhbHVlLCBrZXlzSW4odmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1BsYWluT2JqZWN0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC90b1BsYWluT2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGJhc2VUb1N0cmluZyA9IHJlcXVpcmUoJy4vX2Jhc2VUb1N0cmluZycpO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZCBmb3IgYG51bGxgXG4gKiBhbmQgYHVuZGVmaW5lZGAgdmFsdWVzLiBUaGUgc2lnbiBvZiBgLTBgIGlzIHByZXNlcnZlZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9TdHJpbmcobnVsbCk7XG4gKiAvLyA9PiAnJ1xuICpcbiAqIF8udG9TdHJpbmcoLTApO1xuICogLy8gPT4gJy0wJ1xuICpcbiAqIF8udG9TdHJpbmcoWzEsIDIsIDNdKTtcbiAqIC8vID0+ICcxLDIsMydcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IGJhc2VUb1N0cmluZyh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9TdHJpbmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL3RvU3RyaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE2Ml9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZ2V0LXBpeGVsc1wiXG4vLyBtb2R1bGUgaWQgPSAxNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE2M19fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibmRhcnJheVwiXG4vLyBtb2R1bGUgaWQgPSAxNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE2NF9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibmRhcnJheS1saW5lYXItaW50ZXJwb2xhdGVcIlxuLy8gbW9kdWxlIGlkID0gMTY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=