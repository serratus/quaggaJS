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
        GetPixels(baseUrl, _config.mime, function (err, pixels) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5MDcyYjBjYTRhY2UyNTI5MTBhMSIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc09iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc0FycmF5LmpzIiwid2VicGFjazovLy8uL3NyYy9yZWFkZXIvZWFuX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fcm9vdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWRlci9iYXJjb2RlX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2dsLXZlYzIvY2xvbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VHZXRUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9hcnJheV9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9pbWFnZV9kZWJ1Zy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fTGlzdENhY2hlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19TeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Fzc29jSW5kZXhPZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fY2FzdFBhdGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2dldE1hcERhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2lzSW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX25hdGl2ZUNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9lcS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc0FyZ3VtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2N2X3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vaW1hZ2Vfd3JhcHBlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYmFzZUFzc2lnblZhbHVlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19nZXROYXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX3RvS2V5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2lzQXJyYXlMaWtlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2lzRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaXNMZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaXNTeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbWVyZ2UuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9jYXRvci90cmFjZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWRlci9jb2RlXzM5X3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2dsLXZlYzIvZG90LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19NYXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX01hcENhY2hlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19hc3NpZ25NZXJnZVZhbHVlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19hc3NpZ25WYWx1ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2ZyZWVHbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2dldFByb3RvdHlwZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9faXNQcm90b3R5cGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX292ZXJSZXN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19zZXRUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pZGVudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc0J1ZmZlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc1R5cGVkQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gva2V5c0luLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1YWdnYS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvZnJhbWVfZ3JhYmJlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW5wdXRfc3RyZWFtLmpzIiwid2VicGFjazovLy8uL3NyYy9hbmFseXRpY3MvcmVzdWx0X2NvbGxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2NsdXN0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9tZWRpYURldmljZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9zdWJJbWFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL3R5cGVkZWZzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25maWcvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25maWcvY29uZmlnLm5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlY29kZXIvYmFyY29kZV9kZWNvZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9kZWNvZGVyL2JyZXNlbmhhbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5wdXQvY2FtZXJhX2FjY2Vzcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9jYXRvci9iYXJjb2RlX2xvY2F0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvY2F0b3IvcmFzdGVyaXplci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9jYXRvci9za2VsZXRvbml6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWRlci9jb2RhYmFyX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZGVyL2NvZGVfMTI4X3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZGVyL2NvZGVfMzlfdmluX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZGVyL2Vhbl8yX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZGVyL2Vhbl81X3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZGVyL2Vhbl84X3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZGVyL2kyb2Y1X3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZGVyL3VwY19lX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZGVyL3VwY19yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9nbC1tYXQyL2NvcHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9nbC1tYXQyL2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2dsLW1hdDIvaW52ZXJ0LmpzIiwid2VicGFjazovLy8uL34vZ2wtdmVjMi9zY2FsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2dsLXZlYzIvdHJhbnNmb3JtTWF0Mi5qcyIsIndlYnBhY2s6Ly8vLi9+L2dsLXZlYzMvY2xvbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX0hhc2guanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX1N0YWNrLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19VaW50OEFycmF5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19hcHBseS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYXJyYXlMaWtlS2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYXJyYXlNYXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2FycmF5UHVzaC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYmFzZUNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYmFzZUZsYXR0ZW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VGb3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VHZXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VIYXNJbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYmFzZUlzQXJndW1lbnRzLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19iYXNlSXNOYXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VJc1R5cGVkQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VLZXlzSW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VNZXJnZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYmFzZU1lcmdlRGVlcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYmFzZVBpY2suanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VQaWNrQnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VSZXN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19iYXNlU2V0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19iYXNlU2V0VG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VUaW1lcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYmFzZVRvU3RyaW5nLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19iYXNlVW5hcnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Nsb25lQXJyYXlCdWZmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Nsb25lQnVmZmVyLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19jbG9uZVR5cGVkQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2NvcHlBcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fY29weU9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fY29yZUpzRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fY3JlYXRlQXNzaWduZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2NyZWF0ZUJhc2VGb3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2ZsYXRSZXN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19nZXRSYXdUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2dldFZhbHVlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19oYXNQYXRoLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19oYXNoQ2xlYXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2hhc2hEZWxldGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2hhc2hHZXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2hhc2hIYXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2hhc2hTZXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2luaXRDbG9uZU9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9faXNGbGF0dGVuYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9faXNJdGVyYXRlZUNhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2lzS2V5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19pc0tleWFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2lzTWFza2VkLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19saXN0Q2FjaGVDbGVhci5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fbGlzdENhY2hlRGVsZXRlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19saXN0Q2FjaGVHZXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2xpc3RDYWNoZUhhcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fbGlzdENhY2hlU2V0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19tYXBDYWNoZUNsZWFyLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19tYXBDYWNoZURlbGV0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fbWFwQ2FjaGVHZXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX21hcENhY2hlSGFzLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19tYXBDYWNoZVNldC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fbWVtb2l6ZUNhcHBlZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fbmF0aXZlS2V5c0luLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19ub2RlVXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fb2JqZWN0VG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX292ZXJBcmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX3Nob3J0T3V0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19zdGFja0NsZWFyLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19zdGFja0RlbGV0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fc3RhY2tHZXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX3N0YWNrSGFzLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19zdGFja1NldC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fc3RyaW5nVG9QYXRoLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL190b1NvdXJjZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9jb25zdGFudC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9mbGF0dGVuLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2hhc0luLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2lzQXJyYXlMaWtlT2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2lzUGxhaW5PYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbWVtb2l6ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9waWNrLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL3N0dWJGYWxzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC90b1BsYWluT2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL3RvU3RyaW5nLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImdldC1waXhlbHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZGFycmF5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmRhcnJheS1saW5lYXItaW50ZXJwb2xhdGVcIiJdLCJuYW1lcyI6WyJFQU5SZWFkZXIiLCJvcHRzIiwic3VwcGxlbWVudHMiLCJnZXREZWZhdWxDb25maWciLCJjYWxsIiwiY29uZmlnIiwiT2JqZWN0Iiwia2V5cyIsIkNPTkZJR19LRVlTIiwiZm9yRWFjaCIsImtleSIsImRlZmF1bHQiLCJwcm9wZXJ0aWVzIiwiQ09ERV9MX1NUQVJUIiwidmFsdWUiLCJDT0RFX0dfU1RBUlQiLCJTVEFSVF9QQVRURVJOIiwiU1RPUF9QQVRURVJOIiwiTUlERExFX1BBVFRFUk4iLCJFWFRFTlNJT05fU1RBUlRfUEFUVEVSTiIsIkNPREVfUEFUVEVSTiIsIkNPREVfRlJFUVVFTkNZIiwiU0lOR0xFX0NPREVfRVJST1IiLCJBVkdfQ09ERV9FUlJPUiIsIkZPUk1BVCIsIndyaXRlYWJsZSIsInByb3RvdHlwZSIsImNyZWF0ZSIsImNvbnN0cnVjdG9yIiwiX2RlY29kZUNvZGUiLCJzdGFydCIsImNvZGVyYW5nZSIsImNvdW50ZXIiLCJpIiwic2VsZiIsIm9mZnNldCIsImlzV2hpdGUiLCJfcm93IiwiY291bnRlclBvcyIsImJlc3RNYXRjaCIsImVycm9yIiwiTnVtYmVyIiwiTUFYX1ZBTFVFIiwiY29kZSIsImVuZCIsImxlbmd0aCIsIl9tYXRjaFBhdHRlcm4iLCJfZmluZFBhdHRlcm4iLCJwYXR0ZXJuIiwidHJ5SGFyZGVyIiwiZXBzaWxvbiIsImoiLCJzdW0iLCJfbmV4dFNldCIsInVuZGVmaW5lZCIsIl9maW5kU3RhcnQiLCJsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0Iiwic3RhcnRJbmZvIiwiX21hdGNoUmFuZ2UiLCJfdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlIiwiZW5kSW5mbyIsInRyYWlsaW5nV2hpdGVzcGFjZUVuZCIsIl9maW5kRW5kIiwiX2NhbGN1bGF0ZUZpcnN0RGlnaXQiLCJjb2RlRnJlcXVlbmN5IiwiX2RlY29kZVBheWxvYWQiLCJyZXN1bHQiLCJkZWNvZGVkQ29kZXMiLCJmaXJzdERpZ2l0IiwicHVzaCIsInVuc2hpZnQiLCJfZGVjb2RlIiwicmVzdWx0SW5mbyIsIl9jaGVja3N1bSIsImV4dCIsIl9kZWNvZGVFeHRlbnNpb25zIiwibGFzdENvZGUiLCJzdXBwbGVtZW50Iiwiam9pbiIsImNvZGVzZXQiLCJkZWNvZGUiLCJCYXJjb2RlUmVhZGVyIiwiX25leHRVbnNldCIsImxpbmUiLCJtYXhTaW5nbGVFcnJvciIsInNpbmdsZUVycm9yIiwibW9kdWxvIiwiYmFyV2lkdGgiLCJjb3VudCIsInNjYWxlZCIsIk1hdGgiLCJhYnMiLCJfY29ycmVjdEJhcnMiLCJjb3JyZWN0aW9uIiwiaW5kaWNlcyIsInRtcCIsIl9tYXRjaFRyYWNlIiwiY21wQ291bnRlciIsImRlY29kZVBhdHRlcm4iLCJyZXZlcnNlIiwiZGlyZWN0aW9uIiwiRElSRUNUSU9OIiwiUkVWRVJTRSIsIkZPUldBUkQiLCJmb3JtYXQiLCJfZmlsbENvdW50ZXJzIiwiY291bnRlcnMiLCJkZWZpbmVQcm9wZXJ0eSIsIkV4Y2VwdGlvbiIsIlN0YXJ0Tm90Rm91bmRFeGNlcHRpb24iLCJDb2RlTm90Rm91bmRFeGNlcHRpb24iLCJQYXR0ZXJuTm90Rm91bmRFeGNlcHRpb24iLCJpbml0IiwiYXJyIiwidmFsIiwibCIsInNodWZmbGUiLCJ4IiwiZmxvb3IiLCJyYW5kb20iLCJ0b1BvaW50TGlzdCIsInJvdyIsInJvd3MiLCJ0aHJlc2hvbGQiLCJzY29yZUZ1bmMiLCJxdWV1ZSIsImFwcGx5IiwibWF4SW5kZXgiLCJtYXgiLCJkcmF3UmVjdCIsInBvcyIsInNpemUiLCJjdHgiLCJzdHlsZSIsInN0cm9rZVN0eWxlIiwiY29sb3IiLCJmaWxsU3R5bGUiLCJsaW5lV2lkdGgiLCJiZWdpblBhdGgiLCJzdHJva2VSZWN0IiwieSIsImRyYXdQYXRoIiwicGF0aCIsImRlZiIsIm1vdmVUbyIsImxpbmVUbyIsImNsb3NlUGF0aCIsInN0cm9rZSIsImRyYXdJbWFnZSIsImltYWdlRGF0YSIsImNhbnZhc0RhdGEiLCJnZXRJbWFnZURhdGEiLCJkYXRhIiwiaW1hZ2VEYXRhUG9zIiwiY2FudmFzRGF0YVBvcyIsInB1dEltYWdlRGF0YSIsImltYWdlUmVmIiwiY29tcHV0ZUludGVncmFsSW1hZ2UyIiwiY29tcHV0ZUludGVncmFsSW1hZ2UiLCJ0aHJlc2hvbGRJbWFnZSIsImNvbXB1dGVIaXN0b2dyYW0iLCJzaGFycGVuTGluZSIsImRldGVybWluZU90c3VUaHJlc2hvbGQiLCJvdHN1VGhyZXNob2xkIiwiY29tcHV0ZUJpbmFyeUltYWdlIiwiY2x1c3RlciIsImRpbGF0ZSIsImVyb2RlIiwic3VidHJhY3QiLCJiaXR3aXNlT3IiLCJjb3VudE5vblplcm8iLCJ0b3BHZW5lcmljIiwiZ3JheUFycmF5RnJvbUltYWdlIiwiZ3JheUFycmF5RnJvbUNvbnRleHQiLCJncmF5QW5kSGFsZlNhbXBsZUZyb21DYW52YXNEYXRhIiwiY29tcHV0ZUdyYXkiLCJsb2FkSW1hZ2VBcnJheSIsImhhbGZTYW1wbGUiLCJoc3YycmdiIiwiX2NvbXB1dGVEaXZpc29ycyIsImNhbGN1bGF0ZVBhdGNoU2l6ZSIsIl9wYXJzZUNTU0RpbWVuc2lvblZhbHVlcyIsImNvbXB1dGVJbWFnZUFyZWEiLCJ2ZWMyIiwiY2xvbmUiLCJyZXF1aXJlIiwidmVjMyIsInRoYXQiLCJ0b1ZlYzIiLCJ0b1ZlYzMiLCJyb3VuZCIsImltYWdlV3JhcHBlciIsImludGVncmFsV3JhcHBlciIsIndpZHRoIiwiaGVpZ2h0IiwiaW50ZWdyYWxJbWFnZURhdGEiLCJwb3NBIiwicG9zQiIsInBvc0MiLCJwb3NEIiwidiIsInUiLCJ0YXJnZXRXcmFwcGVyIiwidGFyZ2V0RGF0YSIsImJpdHNQZXJQaXhlbCIsImJpdFNoaWZ0IiwiYnVja2V0Q250IiwiaGlzdCIsIkludDMyQXJyYXkiLCJsZWZ0IiwiY2VudGVyIiwicmlnaHQiLCJweCIsIm14IiwiZGV0ZXJtaW5lVGhyZXNob2xkIiwidmV0IiwicDEiLCJwMiIsInAxMiIsImsiLCJtMSIsIm0yIiwibTEyIiwia2VybmVsIiwiQSIsIkIiLCJDIiwiRCIsImF2ZyIsInBvaW50cyIsInByb3BlcnR5IiwicG9pbnQiLCJjbHVzdGVycyIsImFkZFRvQ2x1c3RlciIsIm5ld1BvaW50IiwiZm91bmQiLCJmaXRzIiwiYWRkIiwiY3JlYXRlUG9pbnQiLCJUcmFjZXIiLCJ0cmFjZSIsInZlYyIsIml0ZXJhdGlvbiIsIm1heEl0ZXJhdGlvbnMiLCJ0b3AiLCJjZW50ZXJQb3MiLCJjdXJyZW50UG9zIiwiaWR4IiwiZm9yd2FyZCIsImZyb20iLCJ0byIsInRvSWR4IiwicHJlZGljdGVkUG9zIiwidGhyZXNob2xkWCIsInRocmVzaG9sZFkiLCJtYXRjaCIsInByZWRpY3RlZCIsIkRJTEFURSIsIkVST0RFIiwiaW5JbWFnZVdyYXBwZXIiLCJvdXRJbWFnZVdyYXBwZXIiLCJpbkltYWdlRGF0YSIsIm91dEltYWdlRGF0YSIsInlTdGFydDEiLCJ5U3RhcnQyIiwieFN0YXJ0MSIsInhTdGFydDIiLCJhSW1hZ2VXcmFwcGVyIiwiYkltYWdlV3JhcHBlciIsInJlc3VsdEltYWdlV3JhcHBlciIsImFJbWFnZURhdGEiLCJiSW1hZ2VEYXRhIiwiY0ltYWdlRGF0YSIsImxpc3QiLCJtaW5JZHgiLCJtaW4iLCJzY29yZSIsImhpdCIsIml0ZW0iLCJodG1sSW1hZ2UiLCJvZmZzZXRYIiwiYXJyYXkiLCJjdHhEYXRhIiwib3V0QXJyYXkiLCJ0b3BSb3dJZHgiLCJib3R0b21Sb3dJZHgiLCJlbmRJZHgiLCJvdXRXaWR0aCIsIm91dEltZ0lkeCIsImluV2lkdGgiLCJzaW5nbGVDaGFubmVsIiwic3JjIiwiY2FsbGJhY2siLCJjYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbWciLCJJbWFnZSIsIm9ubG9hZCIsImdldENvbnRleHQiLCJVaW50OEFycmF5IiwiaW5JbWdXcmFwcGVyIiwib3V0SW1nV3JhcHBlciIsImluSW1nIiwib3V0SW1nIiwiaHN2IiwicmdiIiwiaCIsInMiLCJjIiwibSIsInIiLCJnIiwiYiIsIm4iLCJsYXJnZURpdmlzb3JzIiwiZGl2aXNvcnMiLCJzcXJ0IiwiY29uY2F0IiwiX2NvbXB1dGVJbnRlcnNlY3Rpb24iLCJhcnIxIiwiYXJyMiIsInBhdGNoU2l6ZSIsImltZ1NpemUiLCJkaXZpc29yc1giLCJkaXZpc29yc1kiLCJ3aWRlU2lkZSIsImNvbW1vbiIsIm5yT2ZQYXRjaGVzTGlzdCIsIm5yT2ZQYXRjaGVzTWFwIiwibnJPZlBhdGNoZXNJZHgiLCJtZWRpdW0iLCJuck9mUGF0Y2hlcyIsImRlc2lyZWRQYXRjaFNpemUiLCJvcHRpbWFsUGF0Y2hTaXplIiwiZmluZFBhdGNoU2l6ZUZvckRpdmlzb3JzIiwiZGltZW5zaW9uIiwicGFyc2VGbG9hdCIsInVuaXQiLCJpbmRleE9mIiwiX2RpbWVuc2lvbnNDb252ZXJ0ZXJzIiwiY29udGV4dCIsImJvdHRvbSIsImlucHV0V2lkdGgiLCJpbnB1dEhlaWdodCIsImFyZWEiLCJwYXJzZWRBcmVhIiwicmVkdWNlIiwicGFyc2VkIiwiY2FsY3VsYXRlZCIsInN4Iiwic3kiLCJzdyIsInNoIiwiSW1hZ2VXcmFwcGVyIiwiQXJyYXlUeXBlIiwiaW5pdGlhbGl6ZSIsIkFycmF5IiwiaW5JbWFnZVdpdGhCb3JkZXIiLCJpbWdSZWYiLCJib3JkZXIiLCJzYW1wbGUiLCJseCIsImx5IiwidyIsImJhc2UiLCJhIiwiZCIsImUiLCJjbGVhckFycmF5Iiwic3ViSW1hZ2UiLCJzdWJJbWFnZUFzQ29weSIsInNpemVZIiwic2l6ZVgiLCJjb3B5VG8iLCJzcmNEYXRhIiwiZHN0RGF0YSIsImdldCIsImdldFNhZmUiLCJpbmRleE1hcHBpbmciLCJzZXQiLCJ6ZXJvQm9yZGVyIiwiaW52ZXJ0IiwiY29udm9sdmUiLCJreCIsImt5Iiwia1NpemUiLCJhY2N1IiwibW9tZW50cyIsImxhYmVsY291bnQiLCJ5c3EiLCJsYWJlbHN1bSIsImxhYmVsIiwibXUxMSIsIm11MDIiLCJtdTIwIiwieF8iLCJ5XyIsIlBJIiwiUElfNCIsIm0wMCIsIm0wMSIsIm0xMCIsIm0xMSIsIm0wMiIsIm0yMCIsInRoZXRhIiwicmFkIiwiaXNOYU4iLCJhdGFuIiwiY29zIiwic2luIiwic2hvdyIsInNjYWxlIiwiZnJhbWUiLCJjdXJyZW50IiwicGl4ZWwiLCJvdmVybGF5Iiwid2hpdGVSZ2IiLCJibGFja1JnYiIsInNlYXJjaERpcmVjdGlvbnMiLCJsYWJlbFdyYXBwZXIiLCJsYWJlbERhdGEiLCJlZGdlbGFiZWwiLCJjeSIsImRpciIsImN4IiwidmVydGV4MkQiLCJuZXh0IiwicHJldiIsImNvbnRvdXJUcmFjaW5nIiwiRnYiLCJDdiIsIlAiLCJsZGlyIiwiQ29kZTM5UmVhZGVyIiwiQUxQSEFCRVRIX1NUUklORyIsIkFMUEhBQkVUIiwiQ0hBUkFDVEVSX0VOQ09ESU5HUyIsIkFTVEVSSVNLIiwiX3RvQ291bnRlcnMiLCJudW1Db3VudGVycyIsImRlY29kZWRDaGFyIiwibGFzdFN0YXJ0IiwibmV4dFN0YXJ0IiwiX3RvUGF0dGVybiIsIl9wYXR0ZXJuVG9DaGFyIiwicG9wIiwicGF0dGVyblNpemUiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJfZmluZE5leHRXaWR0aCIsIm1pbldpZHRoIiwibWF4TmFycm93V2lkdGgiLCJudW1XaWRlQmFycyIsIndpZGVCYXJXaWR0aCIsInBhdHRlcm5TdGFydCIsIndoaXRlU3BhY2VNdXN0U3RhcnQiLCJfaW5wdXRTdHJlYW0iLCJfZnJhbWVncmFiYmVyIiwiX3N0b3BwZWQiLCJfY2FudmFzQ29udGFpbmVyIiwiaW1hZ2UiLCJkb20iLCJfaW5wdXRJbWFnZVdyYXBwZXIiLCJfYm94U2l6ZSIsIl9kZWNvZGVyIiwiX3dvcmtlclBvb2wiLCJfb25VSVRocmVhZCIsIl9yZXN1bHRDb2xsZWN0b3IiLCJfY29uZmlnIiwiaW5pdGlhbGl6ZURhdGEiLCJpbml0QnVmZmVycyIsImRlY29kZXIiLCJpbml0SW5wdXRTdHJlYW0iLCJjYiIsInZpZGVvIiwiaW5wdXRTdHJlYW0iLCJ0eXBlIiwiY3JlYXRlVmlkZW9TdHJlYW0iLCJjcmVhdGVJbWFnZVN0cmVhbSIsIiR2aWV3cG9ydCIsImdldFZpZXdQb3J0IiwicXVlcnlTZWxlY3RvciIsImFwcGVuZENoaWxkIiwiY3JlYXRlTGl2ZVN0cmVhbSIsInJlcXVlc3QiLCJjb25zdHJhaW50cyIsInRoZW4iLCJ0cmlnZ2VyIiwiY2F0Y2giLCJlcnIiLCJzZXRBdHRyaWJ1dGUiLCJzZXRJbnB1dFN0cmVhbSIsImFkZEV2ZW50TGlzdGVuZXIiLCJjYW5SZWNvcmQiLCJiaW5kIiwidGFyZ2V0Iiwibm9kZU5hbWUiLCJub2RlVHlwZSIsInNlbGVjdG9yIiwiY2hlY2tJbWFnZUNvbnN0cmFpbnRzIiwibG9jYXRvciIsImluaXRDYW52YXMiLCJhZGp1c3RXb3JrZXJQb29sIiwibnVtT2ZXb3JrZXJzIiwicmVhZHkiLCJwbGF5IiwiY2xhc3NOYW1lIiwiZ2V0Q2FudmFzU2l6ZSIsImNsZWFyRml4IiwiZ2V0V2lkdGgiLCJnZXRIZWlnaHQiLCJjb25zb2xlIiwibG9nIiwiZ2V0Qm91bmRpbmdCb3hlcyIsImxvY2F0ZSIsInRyYW5zZm9ybVJlc3VsdCIsInRvcFJpZ2h0IiwiZ2V0VG9wUmlnaHQiLCJ4T2Zmc2V0IiwieU9mZnNldCIsImJhcmNvZGVzIiwibW92ZUxpbmUiLCJib3giLCJtb3ZlQm94IiwiYm94ZXMiLCJjb3JuZXIiLCJhZGRSZXN1bHQiLCJmaWx0ZXIiLCJiYXJjb2RlIiwiY29kZVJlc3VsdCIsImhhc0NvZGVSZXN1bHQiLCJzb21lIiwicHVibGlzaFJlc3VsdCIsInJlc3VsdFRvUHVibGlzaCIsInB1Ymxpc2giLCJsb2NhdGVBbmREZWNvZGUiLCJkZWNvZGVGcm9tQm91bmRpbmdCb3hlcyIsInVwZGF0ZSIsImF2YWlsYWJsZVdvcmtlciIsIndvcmtlclRocmVhZCIsImJ1c3kiLCJhdHRhY2hEYXRhIiwiZ3JhYiIsIndvcmtlciIsInBvc3RNZXNzYWdlIiwiY21kIiwiYnVmZmVyIiwic3RhcnRDb250aW51b3VzVXBkYXRlIiwiZGVsYXkiLCJmcmVxdWVuY3kiLCJ0aW1lc3RhbXAiLCJ3aW5kb3ciLCJyZXF1ZXN0QW5pbUZyYW1lIiwicGVyZm9ybWFuY2UiLCJub3ciLCJpbml0V29ya2VyIiwiYmxvYlVSTCIsImdlbmVyYXRlV29ya2VyQmxvYiIsIldvcmtlciIsIm9ubWVzc2FnZSIsImV2ZW50IiwiVVJMIiwicmV2b2tlT2JqZWN0VVJMIiwibWVzc2FnZSIsImNvbmZpZ0ZvcldvcmtlciIsIndvcmtlckludGVyZmFjZSIsImZhY3RvcnkiLCJRdWFnZ2EiLCJvblByb2Nlc3NlZCIsInNldFJlYWRlcnMiLCJyZWFkZXJzIiwiYmxvYiIsImZhY3RvcnlTb3VyY2UiLCJfX2ZhY3RvcnlTb3VyY2VfXyIsIkJsb2IiLCJ0b1N0cmluZyIsImNyZWF0ZU9iamVjdFVSTCIsImNhcGFjaXR5IiwiaW5jcmVhc2VCeSIsIndvcmtlcnNUb1Rlcm1pbmF0ZSIsInNsaWNlIiwidGVybWluYXRlIiwid29ya2VySW5pdGlhbGl6ZWQiLCJzdG9wIiwicmVsZWFzZSIsImNsZWFyRXZlbnRIYW5kbGVycyIsInBhdXNlIiwib25EZXRlY3RlZCIsInN1YnNjcmliZSIsIm9mZkRldGVjdGVkIiwidW5zdWJzY3JpYmUiLCJvZmZQcm9jZXNzZWQiLCJyZWdpc3RlclJlc3VsdENvbGxlY3RvciIsInJlc3VsdENvbGxlY3RvciIsImRlY29kZVNpbmdsZSIsInJlc3VsdENhbGxiYWNrIiwic2VxdWVuY2UiLCJvbmNlIiwiSW1hZ2VEZWJ1ZyIsIlJlc3VsdENvbGxlY3RvciIsIkNhbWVyYUFjY2VzcyIsIkNWVXRpbHMiLCJOZGFycmF5IiwiSW50ZXJwMkQiLCJkMiIsIkZyYW1lR3JhYmJlciIsIl90aGF0IiwiX3N0cmVhbUNvbmZpZyIsImdldENvbmZpZyIsIl92aWRlb19zaXplIiwiZ2V0UmVhbFdpZHRoIiwiZ2V0UmVhbEhlaWdodCIsIl9jYW52YXNTaXplIiwiX3NpemUiLCJfdG9wUmlnaHQiLCJfZGF0YSIsIl9ncmF5RGF0YSIsIl9jYW52YXNEYXRhIiwiX2dyYXlJbWFnZUFycmF5IiwidHJhbnNwb3NlIiwiX2NhbnZhc0ltYWdlQXJyYXkiLCJfdGFyZ2V0SW1hZ2VBcnJheSIsImhpIiwibG8iLCJfc3RlcFNpemVYIiwiX3N0ZXBTaXplWSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ2aWRlb1NpemUiLCJzaGFwZSIsImNhbnZhc1NpemUiLCJzdGVwU2l6ZSIsImdldERhdGEiLCJnZXRGcmFtZSIsInNjYWxlQW5kQ3JvcCIsIkVycm9yIiwiZ2V0U2l6ZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJHZXRQaXhlbHMiLCJJbnB1dFN0cmVhbSIsImZyYW1lSWR4IiwicGF1c2VkIiwibG9hZGVkIiwiYmFzZVVybCIsImVuZGVkIiwiY2FsY3VsYXRlZFdpZHRoIiwiY2FsY3VsYXRlZEhlaWdodCIsIl9ldmVudE5hbWVzIiwiX2V2ZW50SGFuZGxlcnMiLCJsb2FkSW1hZ2VzIiwibWltZSIsInBpeGVscyIsImV4aXQiLCJzZXRUaW1lb3V0IiwicHVibGlzaEV2ZW50IiwiZXZlbnROYW1lIiwiYXJncyIsImhhbmRsZXJzIiwic2V0V2lkdGgiLCJzZXRIZWlnaHQiLCJzdHJlYW0iLCJzZXRDdXJyZW50VGltZSIsInRpbWUiLCJmIiwic2V0VG9wUmlnaHQiLCJzZXRDYW52YXNTaXplIiwiY29udGFpbnMiLCJldmVyeSIsInBhc3Nlc0ZpbHRlciIsInJlc3VsdHMiLCJjYXB0dXJlIiwibWF0Y2hlc0NvbnN0cmFpbnRzIiwiYmxhY2tsaXN0IiwiaW1hZ2VTaXplIiwidG9EYXRhVVJMIiwiZ2V0UmVzdWx0cyIsImRvdCIsInBvaW50TWFwIiwidXBkYXRlQ2VudGVyIiwicG9pbnRUb0FkZCIsImlkIiwib3RoZXJQb2ludCIsInNpbWlsYXJpdHkiLCJnZXRQb2ludHMiLCJnZXRDZW50ZXIiLCJldmVudHMiLCJnZXRFdmVudCIsInN1YnNjcmliZXJzIiwiY2xlYXJFdmVudHMiLCJwdWJsaXNoU3Vic2NyaXB0aW9uIiwic3Vic2NyaXB0aW9uIiwiYXN5bmMiLCJzdWJzY3JpYmVyIiwiZW51bWVyYXRlRGV2aWNlcyIsImdldFVzZXJNZWRpYSIsIm5hdmlnYXRvciIsIm1lZGlhRGV2aWNlcyIsIlByb21pc2UiLCJyZWplY3QiLCJTdWJJbWFnZSIsIkkiLCJvcmlnaW5hbFNpemUiLCJ1cGRhdGVEYXRhIiwidXBkYXRlRnJvbSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1velJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtc1JlcXVlc3RBbmltYXRpb25GcmFtZSIsImltdWwiLCJhaCIsImFsIiwiYmgiLCJibCIsImFzc2lnbiIsIlR5cGVFcnJvciIsImluZGV4IiwiYXJndW1lbnRzIiwibmV4dFNvdXJjZSIsIm5leHRLZXkiLCJoYXNPd25Qcm9wZXJ0eSIsIlJFQURFUlMiLCJjb2RlXzEyOF9yZWFkZXIiLCJlYW5fcmVhZGVyIiwiZWFuXzVfcmVhZGVyIiwiZWFuXzJfcmVhZGVyIiwiZWFuXzhfcmVhZGVyIiwiY29kZV8zOV9yZWFkZXIiLCJjb2RlXzM5X3Zpbl9yZWFkZXIiLCJjb2RhYmFyX3JlYWRlciIsInVwY19yZWFkZXIiLCJ1cGNfZV9yZWFkZXIiLCJpMm9mNV9yZWFkZXIiLCJpbnB1dEltYWdlV3JhcHBlciIsIl9jYW52YXMiLCJfYmFyY29kZVJlYWRlcnMiLCJpbml0UmVhZGVycyIsImluaXRDb25maWciLCIkZGVidWciLCJyZWFkZXJDb25maWciLCJyZWFkZXIiLCJjb25maWd1cmF0aW9uIiwibWFwIiwidmlzIiwibm9kZSIsInByb3AiLCJkZWJ1ZyIsInNob3dGcmVxdWVuY3kiLCJzaG93UGF0dGVybiIsImRpc3BsYXkiLCJnZXRFeHRlbmRlZExpbmUiLCJhbmdsZSIsImV4dGVuZExpbmUiLCJhbW91bnQiLCJleHRlbnNpb24iLCJjZWlsIiwiZ2V0TGluZSIsInRyeURlY29kZSIsImJhcmNvZGVMaW5lIiwiZ2V0QmFyY29kZUxpbmUiLCJwcmludEZyZXF1ZW5jeSIsInRvQmluYXJ5TGluZSIsInByaW50UGF0dGVybiIsInRyeURlY29kZUJydXRlRm9yY2UiLCJsaW5lQW5nbGUiLCJzaWRlTGVuZ3RoIiwicG93Iiwic2xpY2VzIiwieGRpciIsInlkaXIiLCJnZXRMaW5lTGVuZ3RoIiwiZGVjb2RlRnJvbUJvdW5kaW5nQm94IiwibGluZUxlbmd0aCIsImRyYXdCb3VuZGluZ0JveCIsImF0YW4yIiwibXVsdGlwbGUiLCJCcmVzZW5oYW0iLCJTbG9wZSIsIkRJUiIsIlVQIiwiRE9XTiIsIngwIiwieTAiLCJ4MSIsInkxIiwic3RlZXAiLCJkZWx0YXgiLCJkZWx0YXkiLCJ5c3RlcCIsInJlYWQiLCJzbG9wZSIsInNsb3BlMiIsImV4dHJlbWEiLCJjdXJyZW50RGlyIiwiclRocmVzaG9sZCIsImZpbGxDb2xvciIsImZpbGxSZWN0IiwicGlja0NvbnN0cmFpbnRzIiwiZmFjaW5nTWF0Y2hpbmciLCJzdHJlYW1SZWYiLCJ3YWl0Rm9yVmlkZW8iLCJyZXNvbHZlIiwiYXR0ZW1wdHMiLCJjaGVja1ZpZGVvIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0IiwiaW5pdENhbWVyYSIsInNyY09iamVjdCIsImRlcHJlY2F0ZWRDb25zdHJhaW50cyIsInZpZGVvQ29uc3RyYWludHMiLCJub3JtYWxpemVkIiwibWluQXNwZWN0UmF0aW8iLCJhc3BlY3RSYXRpbyIsImZhY2luZyIsImZhY2luZ01vZGUiLCJub3JtYWxpemVkQ29uc3RyYWludHMiLCJhdWRpbyIsImRldmljZUlkIiwiZW51bWVyYXRlVmlkZW9EZXZpY2VzIiwiZGV2aWNlcyIsImRldmljZSIsImtpbmQiLCJ0cmFja3MiLCJnZXRWaWRlb1RyYWNrcyIsImdldEFjdGl2ZVN0cmVhbUxhYmVsIiwidHJhbnNmb3JtTWF0MiIsIm1hdDIiLCJjb3B5IiwiX2N1cnJlbnRJbWFnZVdyYXBwZXIiLCJfc2tlbEltYWdlV3JhcHBlciIsIl9zdWJJbWFnZVdyYXBwZXIiLCJfbGFiZWxJbWFnZVdyYXBwZXIiLCJfcGF0Y2hHcmlkIiwiX3BhdGNoTGFiZWxHcmlkIiwiX2ltYWdlVG9QYXRjaEdyaWQiLCJfYmluYXJ5SW1hZ2VXcmFwcGVyIiwiX3BhdGNoU2l6ZSIsImJpbmFyeSIsIl9udW1QYXRjaGVzIiwiX3NrZWxldG9uaXplciIsInNrZWxldG9uSW1hZ2VEYXRhIiwiQXJyYXlCdWZmZXIiLCJnbG9iYWwiLCJ1c2VXb3JrZXIiLCJib3hGcm9tUGF0Y2hlcyIsInBhdGNoZXMiLCJvdmVyQXZnIiwicGF0Y2giLCJ0cmFuc01hdCIsIm1pbngiLCJtaW55IiwibWF4eCIsIm1heHkiLCJiaW5hcml6ZUltYWdlIiwiZmluZFBhdGNoZXMiLCJwYXRjaGVzRm91bmQiLCJyYXN0ZXJpemVyIiwicmFzdGVyUmVzdWx0Iiwic2tlbGV0b25pemUiLCJyYXN0ZXJpemUiLCJkZXNjcmliZVBhdGNoIiwiZmluZEJpZ2dlc3RDb25uZWN0ZWRBcmVhcyIsIm1heExhYmVsIiwibGFiZWxIaXN0IiwidG9wTGFiZWxzIiwic29ydCIsImVsIiwiZmluZEJveGVzIiwic2ltaWxhck1vbWVudHMiLCJ0b3BDbHVzdGVyIiwicGF0Y2hQb3MiLCJlbGlnaWJsZU1vbWVudHMiLCJtYXRjaGluZ01vbWVudHMiLCJtaW5Db21wb25lbnRXZWlnaHQiLCJyYXN0ZXJpemVBbmd1bGFyU2ltaWxhcml0eSIsImN1cnJJZHgiLCJub3RZZXRQcm9jZXNzZWQiLCJjdXJyZW50SWR4IiwiY3VycmVudFBhdGNoIiwiUmFzdGVyaXplciIsImNyZWF0ZUNvbnRvdXIyRCIsImZpcnN0VmVydGV4IiwiaW5zaWRlQ29udG91cnMiLCJuZXh0cGVlciIsInByZXZwZWVyIiwiQ09OVE9VUl9ESVIiLCJDV19ESVIiLCJDQ1dfRElSIiwiVU5LTk9XTl9ESVIiLCJPVVRTSURFX0VER0UiLCJJTlNJREVfRURHRSIsInRyYWNlciIsImRlcHRobGFiZWwiLCJiYyIsImxjIiwibGFiZWxpbmRleCIsImNvbG9yTWFwIiwidmVydGV4IiwicCIsImNjIiwic2MiLCJjb25uZWN0ZWRDb3VudCIsImRyYXdDb250b3VyIiwiZmlyc3RDb250b3VyIiwicHEiLCJpcSIsInEiLCJTa2VsZXRvbml6ZXIiLCJzdGRsaWIiLCJmb3JlaWduIiwiaW1hZ2VzIiwiaW5JbWFnZVB0ciIsIm91dEltYWdlUHRyIiwiYUltYWdlUHRyIiwiYkltYWdlUHRyIiwiaW1hZ2VQdHIiLCJtZW1jcHkiLCJzcmNJbWFnZVB0ciIsImRzdEltYWdlUHRyIiwic3ViSW1hZ2VQdHIiLCJlcm9kZWRJbWFnZVB0ciIsInRlbXBJbWFnZVB0ciIsInNrZWxJbWFnZVB0ciIsImRvbmUiLCJDb2RhYmFyUmVhZGVyIiwiX2NvdW50ZXJzIiwiU1RBUlRfRU5EIiwiTUlOX0VOQ09ERURfQ0hBUlMiLCJNQVhfQUNDRVBUQUJMRSIsIlBBRERJTkciLCJzdGFydENvdW50ZXIiLCJfaXNTdGFydEVuZCIsIl92ZXJpZnlXaGl0ZXNwYWNlIiwiX3ZhbGlkYXRlUmVzdWx0IiwiX3N1bUNvdW50ZXJzIiwiZW5kQ291bnRlciIsIl9jYWxjdWxhdGVQYXR0ZXJuTGVuZ3RoIiwiX3RocmVzaG9sZFJlc3VsdFBhdHRlcm4iLCJjYXRlZ29yaXphdGlvbiIsInNwYWNlIiwibmFycm93IiwiY291bnRzIiwid2lkZSIsImJhciIsImNhdCIsIl9jaGFyVG9QYXR0ZXJuIiwibmV3a2luZCIsImNoYXIiLCJjaGFyQ29kZSIsImNoYXJDb2RlQXQiLCJ0aHJlc2hvbGRzIiwiX2NvbXB1dGVBbHRlcm5hdGluZ1RocmVzaG9sZCIsImJhclRocmVzaG9sZCIsInNwYWNlVGhyZXNob2xkIiwiYml0bWFzayIsIkNvZGUxMjhSZWFkZXIiLCJDT0RFX1NISUZUIiwiQ09ERV9DIiwiQ09ERV9CIiwiQ09ERV9BIiwiU1RBUlRfQ09ERV9BIiwiU1RBUlRfQ09ERV9CIiwiU1RBUlRfQ09ERV9DIiwiU1RPUF9DT0RFIiwiTU9EVUxFX0lORElDRVMiLCJfY29ycmVjdCIsImNhbGN1bGF0ZUNvcnJlY3Rpb24iLCJtdWx0aXBsaWVyIiwiY2hlY2tzdW0iLCJyYXdSZXN1bHQiLCJzaGlmdE5leHQiLCJyZW1vdmVMYXN0Q2hhcmFjdGVyIiwic3BsaWNlIiwiZXhwZWN0ZWQiLCJzdW1Ob3JtYWxpemVkIiwic3VtRXhwZWN0ZWQiLCJDb2RlMzlWSU5SZWFkZXIiLCJwYXR0ZXJucyIsIklPUSIsIkFaMDkiLCJyZXBsYWNlIiwiX2NoZWNrQ2hlY2tzdW0iLCJFQU4yUmVhZGVyIiwicGFyc2VJbnQiLCJFQU41UmVhZGVyIiwiQ0hFQ0tfRElHSVRfRU5DT0RJTkdTIiwiZXh0ZW5zaW9uQ2hlY2tzdW0iLCJkZXRlcm1pbmVDaGVja0RpZ2l0IiwiRUFOOFJlYWRlciIsIkkyb2Y1UmVhZGVyIiwiYmFyU3BhY2VSYXRpbyIsIm5vcm1hbGl6ZUJhclNwYWNlV2lkdGgiLCJOIiwiVyIsIndyaXRhYmxlIiwiTUFYX0NPUlJFQ1RJT05fRkFDVE9SIiwiY291bnRlclN1bSIsImNvZGVTdW0iLCJjb3JyZWN0aW9uUmF0aW8iLCJjb3JyZWN0aW9uUmF0aW9JbnZlcnNlIiwibmFycm93QmFyV2lkdGgiLCJfZGVjb2RlUGFpciIsImNvdW50ZXJQYWlyIiwiY29kZXMiLCJjb3VudGVyTGVuZ3RoIiwiX3ZlcmlmeUNvdW50ZXJMZW5ndGgiLCJVUENFUmVhZGVyIiwiX2RldGVybWluZVBhcml0eSIsIm5yU3lzdGVtIiwiX2NvbnZlcnRUb1VQQ0EiLCJ1cGNhIiwibGFzdERpZ2l0IiwiVVBDUmVhZGVyIiwiY2hhckF0Iiwic3Vic3RyaW5nIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ2hDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ3BDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2IsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ2xDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDNUJBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsVUFBVTtBQUNyQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0EsWUFBWSxTQUFTLEdBQUcsU0FBUztBQUNqQztBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNqQkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2IsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEIsVUFBVTtBQUNWO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQy9CQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2IsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUMzQkEsaUQ7Ozs7OztBQ0FBLGlEOzs7Ozs7QUNBQSxpRCIsImZpbGUiOiJxdWFnZ2EuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJnZXQtcGl4ZWxzXCIpLCByZXF1aXJlKFwibmRhcnJheVwiKSwgcmVxdWlyZShcIm5kYXJyYXktbGluZWFyLWludGVycG9sYXRlXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImdldC1waXhlbHNcIiwgXCJuZGFycmF5XCIsIFwibmRhcnJheS1saW5lYXItaW50ZXJwb2xhdGVcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUXVhZ2dhXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiZ2V0LXBpeGVsc1wiKSwgcmVxdWlyZShcIm5kYXJyYXlcIiksIHJlcXVpcmUoXCJuZGFycmF5LWxpbmVhci1pbnRlcnBvbGF0ZVwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiUXVhZ2dhXCJdID0gZmFjdG9yeShyb290W1wiZ2V0LXBpeGVsc1wiXSwgcm9vdFtcIm5kYXJyYXlcIl0sIHJvb3RbXCJuZGFycmF5LWxpbmVhci1pbnRlcnBvbGF0ZVwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE2Ml9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE2M19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE2NF9fKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNjUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDkwNzJiMGNhNGFjZTI1MjkxMGExIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3Q7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL2lzT2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL2lzQXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEJhcmNvZGVSZWFkZXIgZnJvbSAnLi9iYXJjb2RlX3JlYWRlcic7XG5pbXBvcnQge21lcmdlfSBmcm9tICdsb2Rhc2gnO1xuXG5mdW5jdGlvbiBFQU5SZWFkZXIob3B0cywgc3VwcGxlbWVudHMpIHtcbiAgICBvcHRzID0gbWVyZ2UoZ2V0RGVmYXVsQ29uZmlnKCksIG9wdHMpO1xuICAgIEJhcmNvZGVSZWFkZXIuY2FsbCh0aGlzLCBvcHRzLCBzdXBwbGVtZW50cyk7XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bENvbmZpZygpIHtcbiAgICB2YXIgY29uZmlnID0ge307XG5cbiAgICBPYmplY3Qua2V5cyhFQU5SZWFkZXIuQ09ORklHX0tFWVMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIGNvbmZpZ1trZXldID0gRUFOUmVhZGVyLkNPTkZJR19LRVlTW2tleV0uZGVmYXVsdDtcbiAgICB9KTtcbiAgICByZXR1cm4gY29uZmlnO1xufVxuXG52YXIgcHJvcGVydGllcyA9IHtcbiAgICBDT0RFX0xfU1RBUlQ6IHt2YWx1ZTogMH0sXG4gICAgQ09ERV9HX1NUQVJUOiB7dmFsdWU6IDEwfSxcbiAgICBTVEFSVF9QQVRURVJOOiB7dmFsdWU6IFsxLCAxLCAxXX0sXG4gICAgU1RPUF9QQVRURVJOOiB7dmFsdWU6IFsxLCAxLCAxXX0sXG4gICAgTUlERExFX1BBVFRFUk46IHt2YWx1ZTogWzEsIDEsIDEsIDEsIDFdfSxcbiAgICBFWFRFTlNJT05fU1RBUlRfUEFUVEVSTjoge3ZhbHVlOiBbMSwgMSwgMl19LFxuICAgIENPREVfUEFUVEVSTjoge3ZhbHVlOiBbXG4gICAgICAgIFszLCAyLCAxLCAxXSxcbiAgICAgICAgWzIsIDIsIDIsIDFdLFxuICAgICAgICBbMiwgMSwgMiwgMl0sXG4gICAgICAgIFsxLCA0LCAxLCAxXSxcbiAgICAgICAgWzEsIDEsIDMsIDJdLFxuICAgICAgICBbMSwgMiwgMywgMV0sXG4gICAgICAgIFsxLCAxLCAxLCA0XSxcbiAgICAgICAgWzEsIDMsIDEsIDJdLFxuICAgICAgICBbMSwgMiwgMSwgM10sXG4gICAgICAgIFszLCAxLCAxLCAyXSxcbiAgICAgICAgWzEsIDEsIDIsIDNdLFxuICAgICAgICBbMSwgMiwgMiwgMl0sXG4gICAgICAgIFsyLCAyLCAxLCAyXSxcbiAgICAgICAgWzEsIDEsIDQsIDFdLFxuICAgICAgICBbMiwgMywgMSwgMV0sXG4gICAgICAgIFsxLCAzLCAyLCAxXSxcbiAgICAgICAgWzQsIDEsIDEsIDFdLFxuICAgICAgICBbMiwgMSwgMywgMV0sXG4gICAgICAgIFszLCAxLCAyLCAxXSxcbiAgICAgICAgWzIsIDEsIDEsIDNdXG4gICAgXX0sXG4gICAgQ09ERV9GUkVRVUVOQ1k6IHt2YWx1ZTogWzAsIDExLCAxMywgMTQsIDE5LCAyNSwgMjgsIDIxLCAyMiwgMjZdfSxcbiAgICBTSU5HTEVfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjcwfSxcbiAgICBBVkdfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjQ4fSxcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJlYW5fMTNcIiwgd3JpdGVhYmxlOiBmYWxzZX1cbn07XG5cbkVBTlJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcbkVBTlJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFQU5SZWFkZXI7XG5cbkVBTlJlYWRlci5wcm90b3R5cGUuX2RlY29kZUNvZGUgPSBmdW5jdGlvbihzdGFydCwgY29kZXJhbmdlKSB7XG4gICAgdmFyIGNvdW50ZXIgPSBbMCwgMCwgMCwgMF0sXG4gICAgICAgIGksXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBvZmZzZXQgPSBzdGFydCxcbiAgICAgICAgaXNXaGl0ZSA9ICFzZWxmLl9yb3dbb2Zmc2V0XSxcbiAgICAgICAgY291bnRlclBvcyA9IDAsXG4gICAgICAgIGJlc3RNYXRjaCA9IHtcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgICAgICAgY29kZTogLTEsXG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICBlbmQ6IHN0YXJ0XG4gICAgICAgIH0sXG4gICAgICAgIGNvZGUsXG4gICAgICAgIGVycm9yO1xuXG4gICAgaWYgKCFjb2RlcmFuZ2UpIHtcbiAgICAgICAgY29kZXJhbmdlID0gc2VsZi5DT0RFX1BBVFRFUk4ubGVuZ3RoO1xuICAgIH1cblxuICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBjb3VudGVyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvZGUgPSAwOyBjb2RlIDwgY29kZXJhbmdlOyBjb2RlKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBzZWxmLl9tYXRjaFBhdHRlcm4oY291bnRlciwgc2VsZi5DT0RFX1BBVFRFUk5bY29kZV0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBiZXN0TWF0Y2guZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb2RlID0gY29kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xuICAgICAgICAgICAgICAgIGlmIChiZXN0TWF0Y2guZXJyb3IgPiBzZWxmLkFWR19DT0RFX0VSUk9SKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcbiAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbkVBTlJlYWRlci5wcm90b3R5cGUuX2ZpbmRQYXR0ZXJuID0gZnVuY3Rpb24ocGF0dGVybiwgb2Zmc2V0LCBpc1doaXRlLCB0cnlIYXJkZXIsIGVwc2lsb24pIHtcbiAgICB2YXIgY291bnRlciA9IFtdLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgaSxcbiAgICAgICAgY291bnRlclBvcyA9IDAsXG4gICAgICAgIGJlc3RNYXRjaCA9IHtcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgICAgICAgY29kZTogLTEsXG4gICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgIGVuZDogMFxuICAgICAgICB9LFxuICAgICAgICBlcnJvcixcbiAgICAgICAgaixcbiAgICAgICAgc3VtO1xuXG4gICAgaWYgKCFvZmZzZXQpIHtcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpO1xuICAgIH1cblxuICAgIGlmIChpc1doaXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaXNXaGl0ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0cnlIYXJkZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0cnlIYXJkZXIgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICggZXBzaWxvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGVwc2lsb24gPSBzZWxmLkFWR19DT0RFX0VSUk9SO1xuICAgIH1cblxuICAgIGZvciAoIGkgPSAwOyBpIDwgcGF0dGVybi5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb3VudGVyW2ldID0gMDtcbiAgICB9XG5cbiAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgc3VtID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IGNvdW50ZXIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGNvdW50ZXJbal07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKGNvdW50ZXIsIHBhdHRlcm4pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yIDwgZXBzaWxvbikge1xuICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLnN0YXJ0ID0gaSAtIHN1bTtcbiAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVuZCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0cnlIYXJkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBjb3VudGVyLmxlbmd0aCAtIDI7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcltqXSA9IGNvdW50ZXJbaiArIDJdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlci5sZW5ndGggLSAyXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlci5sZW5ndGggLSAxXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MtLTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZmluZFN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0LFxuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3JvdyksXG4gICAgICAgIHN0YXJ0SW5mbztcblxuICAgIHdoaWxlICghc3RhcnRJbmZvKSB7XG4gICAgICAgIHN0YXJ0SW5mbyA9IHNlbGYuX2ZpbmRQYXR0ZXJuKHNlbGYuU1RBUlRfUEFUVEVSTiwgb2Zmc2V0KTtcbiAgICAgICAgaWYgKCFzdGFydEluZm8pIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQgPSBzdGFydEluZm8uc3RhcnQgLSAoc3RhcnRJbmZvLmVuZCAtIHN0YXJ0SW5mby5zdGFydCk7XG4gICAgICAgIGlmIChsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0ID49IDApIHtcbiAgICAgICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQsIHN0YXJ0SW5mby5zdGFydCwgMCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhcnRJbmZvO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG9mZnNldCA9IHN0YXJ0SW5mby5lbmQ7XG4gICAgICAgIHN0YXJ0SW5mbyA9IG51bGw7XG4gICAgfVxufTtcblxuRUFOUmVhZGVyLnByb3RvdHlwZS5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlID0gZnVuY3Rpb24oZW5kSW5mbykge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kO1xuXG4gICAgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kID0gZW5kSW5mby5lbmQgKyAoZW5kSW5mby5lbmQgLSBlbmRJbmZvLnN0YXJ0KTtcbiAgICBpZiAodHJhaWxpbmdXaGl0ZXNwYWNlRW5kIDwgc2VsZi5fcm93Lmxlbmd0aCkge1xuICAgICAgICBpZiAoc2VsZi5fbWF0Y2hSYW5nZShlbmRJbmZvLmVuZCwgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kLCAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIGVuZEluZm87XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5FQU5SZWFkZXIucHJvdG90eXBlLl9maW5kRW5kID0gZnVuY3Rpb24ob2Zmc2V0LCBpc1doaXRlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBlbmRJbmZvID0gc2VsZi5fZmluZFBhdHRlcm4oc2VsZi5TVE9QX1BBVFRFUk4sIG9mZnNldCwgaXNXaGl0ZSwgZmFsc2UpO1xuXG4gICAgcmV0dXJuIGVuZEluZm8gIT09IG51bGwgPyBzZWxmLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UoZW5kSW5mbykgOiBudWxsO1xufTtcblxuRUFOUmVhZGVyLnByb3RvdHlwZS5fY2FsY3VsYXRlRmlyc3REaWdpdCA9IGZ1bmN0aW9uKGNvZGVGcmVxdWVuY3kpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgc2VsZiA9IHRoaXM7XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8IHNlbGYuQ09ERV9GUkVRVUVOQ1kubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNvZGVGcmVxdWVuY3kgPT09IHNlbGYuQ09ERV9GUkVRVUVOQ1lbaV0pIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlUGF5bG9hZCA9IGZ1bmN0aW9uKGNvZGUsIHJlc3VsdCwgZGVjb2RlZENvZGVzKSB7XG4gICAgdmFyIGksXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBjb2RlRnJlcXVlbmN5ID0gMHgwLFxuICAgICAgICBmaXJzdERpZ2l0O1xuXG4gICAgZm9yICggaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICAgICAgY29kZSA9IHNlbGYuX2RlY29kZUNvZGUoY29kZS5lbmQpO1xuICAgICAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2RlLmNvZGUgPj0gc2VsZi5DT0RFX0dfU1RBUlQpIHtcbiAgICAgICAgICAgIGNvZGUuY29kZSA9IGNvZGUuY29kZSAtIHNlbGYuQ09ERV9HX1NUQVJUO1xuICAgICAgICAgICAgY29kZUZyZXF1ZW5jeSB8PSAxIDw8ICg1IC0gaSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2RlRnJlcXVlbmN5IHw9IDAgPDwgKDUgLSBpKTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUpO1xuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcbiAgICB9XG5cbiAgICBmaXJzdERpZ2l0ID0gc2VsZi5fY2FsY3VsYXRlRmlyc3REaWdpdChjb2RlRnJlcXVlbmN5KTtcbiAgICBpZiAoZmlyc3REaWdpdCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmVzdWx0LnVuc2hpZnQoZmlyc3REaWdpdCk7XG5cbiAgICBjb2RlID0gc2VsZi5fZmluZFBhdHRlcm4oc2VsZi5NSURETEVfUEFUVEVSTiwgY29kZS5lbmQsIHRydWUsIGZhbHNlKTtcbiAgICBpZiAoY29kZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb2RlLmVuZCwgc2VsZi5DT0RFX0dfU1RBUlQpO1xuICAgICAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xuICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUpO1xuICAgIH1cblxuICAgIHJldHVybiBjb2RlO1xufTtcblxuRUFOUmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0YXJ0SW5mbyxcbiAgICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICAgIGNvZGUsXG4gICAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgICBkZWNvZGVkQ29kZXMgPSBbXSxcbiAgICAgICAgcmVzdWx0SW5mbyA9IHt9O1xuXG4gICAgc3RhcnRJbmZvID0gc2VsZi5fZmluZFN0YXJ0KCk7XG4gICAgaWYgKCFzdGFydEluZm8pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvZGUgPSB7XG4gICAgICAgIGNvZGU6IHN0YXJ0SW5mby5jb2RlLFxuICAgICAgICBzdGFydDogc3RhcnRJbmZvLnN0YXJ0LFxuICAgICAgICBlbmQ6IHN0YXJ0SW5mby5lbmRcbiAgICB9O1xuICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xuICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVQYXlsb2FkKGNvZGUsIHJlc3VsdCwgZGVjb2RlZENvZGVzKTtcbiAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvZGUgPSBzZWxmLl9maW5kRW5kKGNvZGUuZW5kLCBmYWxzZSk7XG4gICAgaWYgKCFjb2RlKXtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XG5cbiAgICAvLyBDaGVja3N1bVxuICAgIGlmICghc2VsZi5fY2hlY2tzdW0ocmVzdWx0KSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdXBwbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBleHQgPSB0aGlzLl9kZWNvZGVFeHRlbnNpb25zKGNvZGUuZW5kKTtcbiAgICAgICAgaWYgKCFleHQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsYXN0Q29kZSA9IGV4dC5kZWNvZGVkQ29kZXNbZXh0LmRlY29kZWRDb2Rlcy5sZW5ndGgtMV0sXG4gICAgICAgICAgICBlbmRJbmZvID0ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBsYXN0Q29kZS5zdGFydCArICgoKGxhc3RDb2RlLmVuZCAtIGxhc3RDb2RlLnN0YXJ0KSAvIDIpIHwgMCksXG4gICAgICAgICAgICAgICAgZW5kOiBsYXN0Q29kZS5lbmRcbiAgICAgICAgICAgIH07XG4gICAgICAgIGlmKCFzZWxmLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UoZW5kSW5mbykpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdEluZm8gPSB7XG4gICAgICAgICAgICBzdXBwbGVtZW50OiBleHQsXG4gICAgICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSArIGV4dC5jb2RlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcbiAgICAgICAgc3RhcnQ6IHN0YXJ0SW5mby5zdGFydCxcbiAgICAgICAgZW5kOiBjb2RlLmVuZCxcbiAgICAgICAgY29kZXNldDogXCJcIixcbiAgICAgICAgc3RhcnRJbmZvOiBzdGFydEluZm8sXG4gICAgICAgIGRlY29kZWRDb2RlczogZGVjb2RlZENvZGVzLFxuICAgICAgICAuLi5yZXN1bHRJbmZvXG4gICAgfTtcbn07XG5cbkVBTlJlYWRlci5wcm90b3R5cGUuX2RlY29kZUV4dGVuc2lvbnMgPSBmdW5jdGlvbihvZmZzZXQpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgc3RhcnQgPSB0aGlzLl9uZXh0U2V0KHRoaXMuX3Jvdywgb2Zmc2V0KSxcbiAgICAgICAgc3RhcnRJbmZvID0gdGhpcy5fZmluZFBhdHRlcm4odGhpcy5FWFRFTlNJT05fU1RBUlRfUEFUVEVSTiwgc3RhcnQsIGZhbHNlLCBmYWxzZSksXG4gICAgICAgIHJlc3VsdDtcblxuICAgIGlmIChzdGFydEluZm8gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMuc3VwcGxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5zdXBwbGVtZW50c1tpXS5kZWNvZGUodGhpcy5fcm93LCBzdGFydEluZm8uZW5kKTtcbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjb2RlOiByZXN1bHQuY29kZSxcbiAgICAgICAgICAgICAgICBzdGFydCxcbiAgICAgICAgICAgICAgICBzdGFydEluZm8sXG4gICAgICAgICAgICAgICAgZW5kOiByZXN1bHQuZW5kLFxuICAgICAgICAgICAgICAgIGNvZGVzZXQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgZGVjb2RlZENvZGVzOiByZXN1bHQuZGVjb2RlZENvZGVzXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5FQU5SZWFkZXIucHJvdG90eXBlLl9jaGVja3N1bSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgIHZhciBzdW0gPSAwLCBpO1xuXG4gICAgZm9yICggaSA9IHJlc3VsdC5sZW5ndGggLSAyOyBpID49IDA7IGkgLT0gMikge1xuICAgICAgICBzdW0gKz0gcmVzdWx0W2ldO1xuICAgIH1cbiAgICBzdW0gKj0gMztcbiAgICBmb3IgKCBpID0gcmVzdWx0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaSAtPSAyKSB7XG4gICAgICAgIHN1bSArPSByZXN1bHRbaV07XG4gICAgfVxuICAgIHJldHVybiBzdW0gJSAxMCA9PT0gMDtcbn07XG5cbkVBTlJlYWRlci5DT05GSUdfS0VZUyA9IHtcbiAgICBzdXBwbGVtZW50czoge1xuICAgICAgICAndHlwZSc6ICdhcnJheU9mKHN0cmluZyknLFxuICAgICAgICAnZGVmYXVsdCc6IFtdLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnQWxsb3dlZCBleHRlbnNpb25zIHRvIGJlIGRlY29kZWQgKDIgYW5kL29yIDUpJ1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IChFQU5SZWFkZXIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JlYWRlci9lYW5fcmVhZGVyLmpzIiwidmFyIGZyZWVHbG9iYWwgPSByZXF1aXJlKCcuL19mcmVlR2xvYmFsJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxubW9kdWxlLmV4cG9ydHMgPSByb290O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fcm9vdC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL2lzT2JqZWN0TGlrZS5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBCYXJjb2RlUmVhZGVyKGNvbmZpZywgc3VwcGxlbWVudHMpIHtcbiAgICB0aGlzLl9yb3cgPSBbXTtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICB0aGlzLnN1cHBsZW1lbnRzID0gc3VwcGxlbWVudHM7XG4gICAgcmV0dXJuIHRoaXM7XG59XG5cbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9uZXh0VW5zZXQgPSBmdW5jdGlvbihsaW5lLCBzdGFydCkge1xuICAgIHZhciBpO1xuXG4gICAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3RhcnQgPSAwO1xuICAgIH1cbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFsaW5lW2ldKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbGluZS5sZW5ndGg7XG59O1xuXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hQYXR0ZXJuID0gZnVuY3Rpb24oY291bnRlciwgY29kZSwgbWF4U2luZ2xlRXJyb3IpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgZXJyb3IgPSAwLFxuICAgICAgICBzaW5nbGVFcnJvciA9IDAsXG4gICAgICAgIHN1bSA9IDAsXG4gICAgICAgIG1vZHVsbyA9IDAsXG4gICAgICAgIGJhcldpZHRoLFxuICAgICAgICBjb3VudCxcbiAgICAgICAgc2NhbGVkO1xuXG4gICAgbWF4U2luZ2xlRXJyb3IgPSBtYXhTaW5nbGVFcnJvciB8fCB0aGlzLlNJTkdMRV9DT0RFX0VSUk9SIHx8IDE7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICBzdW0gKz0gY291bnRlcltpXTtcbiAgICAgICAgbW9kdWxvICs9IGNvZGVbaV07XG4gICAgfVxuICAgIGlmIChzdW0gPCBtb2R1bG8pIHtcbiAgICAgICAgcmV0dXJuIE51bWJlci5NQVhfVkFMVUU7XG4gICAgfVxuICAgIGJhcldpZHRoID0gc3VtIC8gbW9kdWxvO1xuICAgIG1heFNpbmdsZUVycm9yICo9IGJhcldpZHRoO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY291bnQgPSBjb3VudGVyW2ldO1xuICAgICAgICBzY2FsZWQgPSBjb2RlW2ldICogYmFyV2lkdGg7XG4gICAgICAgIHNpbmdsZUVycm9yID0gTWF0aC5hYnMoY291bnQgLSBzY2FsZWQpIC8gc2NhbGVkO1xuICAgICAgICBpZiAoc2luZ2xlRXJyb3IgPiBtYXhTaW5nbGVFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIE51bWJlci5NQVhfVkFMVUU7XG4gICAgICAgIH1cbiAgICAgICAgZXJyb3IgKz0gc2luZ2xlRXJyb3I7XG4gICAgfVxuICAgIHJldHVybiBlcnJvciAvIG1vZHVsbztcbn07XG5cbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9uZXh0U2V0ID0gZnVuY3Rpb24obGluZSwgb2Zmc2V0KSB7XG4gICAgdmFyIGk7XG5cbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBsaW5lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChsaW5lW2ldKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbGluZS5sZW5ndGg7XG59O1xuXG5CYXJjb2RlUmVhZGVyLnByb3RvdHlwZS5fY29ycmVjdEJhcnMgPSBmdW5jdGlvbihjb3VudGVyLCBjb3JyZWN0aW9uLCBpbmRpY2VzKSB7XG4gICAgdmFyIGxlbmd0aCA9IGluZGljZXMubGVuZ3RoLFxuICAgICAgICB0bXAgPSAwO1xuICAgIHdoaWxlKGxlbmd0aC0tKSB7XG4gICAgICAgIHRtcCA9IGNvdW50ZXJbaW5kaWNlc1tsZW5ndGhdXSAqICgxIC0gKCgxIC0gY29ycmVjdGlvbikgLyAyKSk7XG4gICAgICAgIGlmICh0bXAgPiAxKSB7XG4gICAgICAgICAgICBjb3VudGVyW2luZGljZXNbbGVuZ3RoXV0gPSB0bXA7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9tYXRjaFRyYWNlID0gZnVuY3Rpb24oY21wQ291bnRlciwgZXBzaWxvbikge1xuICAgIHZhciBjb3VudGVyID0gW10sXG4gICAgICAgIGksXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3JvdyksXG4gICAgICAgIGlzV2hpdGUgPSAhc2VsZi5fcm93W29mZnNldF0sXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxuICAgICAgICBiZXN0TWF0Y2ggPSB7XG4gICAgICAgICAgICBlcnJvcjogTnVtYmVyLk1BWF9WQUxVRSxcbiAgICAgICAgICAgIGNvZGU6IC0xLFxuICAgICAgICAgICAgc3RhcnQ6IDBcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I7XG5cbiAgICBpZiAoY21wQ291bnRlcikge1xuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGNtcENvdW50ZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvdW50ZXIucHVzaCgwKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHNlbGYuX21hdGNoUGF0dGVybihjb3VudGVyLCBjbXBDb3VudGVyKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBlcHNpbG9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guc3RhcnQgPSBpIC0gb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVuZCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guY291bnRlciA9IGNvdW50ZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xuICAgICAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvdW50ZXIucHVzaCgwKTtcbiAgICAgICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcbiAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcbiAgICAgICAgICAgICAgICBjb3VudGVyLnB1c2goMCk7XG4gICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XG4gICAgICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgY21wQ291bnRlciB3YXMgbm90IGdpdmVuXG4gICAgYmVzdE1hdGNoLnN0YXJ0ID0gb2Zmc2V0O1xuICAgIGJlc3RNYXRjaC5lbmQgPSBzZWxmLl9yb3cubGVuZ3RoIC0gMTtcbiAgICBiZXN0TWF0Y2guY291bnRlciA9IGNvdW50ZXI7XG4gICAgcmV0dXJuIGJlc3RNYXRjaDtcbn07XG5cbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLmRlY29kZVBhdHRlcm4gPSBmdW5jdGlvbihwYXR0ZXJuKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICByZXN1bHQ7XG5cbiAgICBzZWxmLl9yb3cgPSBwYXR0ZXJuO1xuICAgIHJlc3VsdCA9IHNlbGYuX2RlY29kZSgpO1xuICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHtcbiAgICAgICAgc2VsZi5fcm93LnJldmVyc2UoKTtcbiAgICAgICAgcmVzdWx0ID0gc2VsZi5fZGVjb2RlKCk7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5kaXJlY3Rpb24gPSBCYXJjb2RlUmVhZGVyLkRJUkVDVElPTi5SRVZFUlNFO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0ID0gc2VsZi5fcm93Lmxlbmd0aCAtIHJlc3VsdC5zdGFydDtcbiAgICAgICAgICAgIHJlc3VsdC5lbmQgPSBzZWxmLl9yb3cubGVuZ3RoIC0gcmVzdWx0LmVuZDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdC5kaXJlY3Rpb24gPSBCYXJjb2RlUmVhZGVyLkRJUkVDVElPTi5GT1JXQVJEO1xuICAgIH1cbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIHJlc3VsdC5mb3JtYXQgPSBzZWxmLkZPUk1BVDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9tYXRjaFJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIGVuZCwgdmFsdWUpIHtcbiAgICB2YXIgaTtcblxuICAgIHN0YXJ0ID0gc3RhcnQgPCAwID8gMCA6IHN0YXJ0O1xuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuX3Jvd1tpXSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9maWxsQ291bnRlcnMgPSBmdW5jdGlvbihvZmZzZXQsIGVuZCwgaXNXaGl0ZSkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgY291bnRlclBvcyA9IDAsXG4gICAgICAgIGksXG4gICAgICAgIGNvdW50ZXJzID0gW107XG5cbiAgICBpc1doaXRlID0gKHR5cGVvZiBpc1doaXRlICE9PSAndW5kZWZpbmVkJykgPyBpc1doaXRlIDogdHJ1ZTtcbiAgICBvZmZzZXQgPSAodHlwZW9mIG9mZnNldCAhPT0gJ3VuZGVmaW5lZCcpID8gb2Zmc2V0IDogc2VsZi5fbmV4dFVuc2V0KHNlbGYuX3Jvdyk7XG4gICAgZW5kID0gZW5kIHx8IHNlbGYuX3Jvdy5sZW5ndGg7XG5cbiAgICBjb3VudGVyc1tjb3VudGVyUG9zXSA9IDA7XG4gICAgZm9yIChpID0gb2Zmc2V0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcbiAgICAgICAgICAgIGNvdW50ZXJzW2NvdW50ZXJQb3NdKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb3VudGVyUG9zKys7XG4gICAgICAgICAgICBjb3VudGVyc1tjb3VudGVyUG9zXSA9IDE7XG4gICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdW50ZXJzO1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLCBcIkZPUk1BVFwiLCB7XG4gICAgdmFsdWU6ICd1bmtub3duJyxcbiAgICB3cml0ZWFibGU6IGZhbHNlXG59KTtcblxuQmFyY29kZVJlYWRlci5ESVJFQ1RJT04gPSB7XG4gICAgRk9SV0FSRDogMSxcbiAgICBSRVZFUlNFOiAtMVxufTtcblxuQmFyY29kZVJlYWRlci5FeGNlcHRpb24gPSB7XG4gICAgU3RhcnROb3RGb3VuZEV4Y2VwdGlvbjogXCJTdGFydC1JbmZvIHdhcyBub3QgZm91bmQhXCIsXG4gICAgQ29kZU5vdEZvdW5kRXhjZXB0aW9uOiBcIkNvZGUgY291bGQgbm90IGJlIGZvdW5kIVwiLFxuICAgIFBhdHRlcm5Ob3RGb3VuZEV4Y2VwdGlvbjogXCJQYXR0ZXJuIGNvdWxkIG5vdCBiZSBmb3VuZCFcIlxufTtcblxuQmFyY29kZVJlYWRlci5DT05GSUdfS0VZUyA9IHt9O1xuXG5leHBvcnQgZGVmYXVsdCBCYXJjb2RlUmVhZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JlYWRlci9iYXJjb2RlX3JlYWRlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gY2xvbmVcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzIgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdmVjdG9yIHRvIGNsb25lXG4gKiBAcmV0dXJucyB7dmVjMn0gYSBuZXcgMkQgdmVjdG9yXG4gKi9cbmZ1bmN0aW9uIGNsb25lKGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEZsb2F0MzJBcnJheSgyKVxuICAgIG91dFswXSA9IGFbMF1cbiAgICBvdXRbMV0gPSBhWzFdXG4gICAgcmV0dXJuIG91dFxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9nbC12ZWMyL2Nsb25lLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBnZXRSYXdUYWcgPSByZXF1aXJlKCcuL19nZXRSYXdUYWcnKSxcbiAgICBvYmplY3RUb1N0cmluZyA9IHJlcXVpcmUoJy4vX29iamVjdFRvU3RyaW5nJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRUYWc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19iYXNlR2V0VGFnLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbml0OiBmdW5jdGlvbihhcnIsIHZhbCkge1xuICAgICAgICB2YXIgbCA9IGFyci5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChsLS0pIHtcbiAgICAgICAgICAgIGFycltsXSA9IHZhbDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTaHVmZmxlcyB0aGUgY29udGVudCBvZiBhbiBhcnJheVxuICAgICAqIEByZXR1cm4ge0FycmF5fSB0aGUgYXJyYXkgaXRzZWxmIHNodWZmbGVkXG4gICAgICovXG4gICAgc2h1ZmZsZTogZnVuY3Rpb24oYXJyKSB7XG4gICAgICAgIHZhciBpID0gYXJyLmxlbmd0aCAtIDEsIGosIHg7XG4gICAgICAgIGZvciAoaTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKTtcbiAgICAgICAgICAgIHggPSBhcnJbaV07XG4gICAgICAgICAgICBhcnJbaV0gPSBhcnJbal07XG4gICAgICAgICAgICBhcnJbal0gPSB4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfSxcblxuICAgIHRvUG9pbnRMaXN0OiBmdW5jdGlvbihhcnIpIHtcbiAgICAgICAgdmFyIGksIGosIHJvdyA9IFtdLCByb3dzID0gW107XG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByb3cgPSBbXTtcbiAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgYXJyW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgcm93W2pdID0gYXJyW2ldW2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm93c1tpXSA9IFwiW1wiICsgcm93LmpvaW4oXCIsXCIpICsgXCJdXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiW1wiICsgcm93cy5qb2luKFwiLFxcclxcblwiKSArIFwiXVwiO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIHRoZSBlbGVtZW50cyB3aGljaCdzIHNjb3JlIGlzIGJpZ2dlciB0aGFuIHRoZSB0aHJlc2hvbGRcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gdGhlIHJlZHVjZWQgYXJyYXlcbiAgICAgKi9cbiAgICB0aHJlc2hvbGQ6IGZ1bmN0aW9uKGFyciwgdGhyZXNob2xkLCBzY29yZUZ1bmMpIHtcbiAgICAgICAgdmFyIGksIHF1ZXVlID0gW107XG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc2NvcmVGdW5jLmFwcGx5KGFyciwgW2FycltpXV0pID49IHRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goYXJyW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcXVldWU7XG4gICAgfSxcblxuICAgIG1heEluZGV4OiBmdW5jdGlvbihhcnIpIHtcbiAgICAgICAgdmFyIGksIG1heCA9IDA7XG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYXJyW2ldID4gYXJyW21heF0pIHtcbiAgICAgICAgICAgICAgICBtYXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXg7XG4gICAgfSxcblxuICAgIG1heDogZnVuY3Rpb24oYXJyKSB7XG4gICAgICAgIHZhciBpLCBtYXggPSAwO1xuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGFycltpXSA+IG1heCkge1xuICAgICAgICAgICAgICAgIG1heCA9IGFycltpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF4O1xuICAgIH0sXG5cbiAgICBzdW06IGZ1bmN0aW9uKGFycikge1xuICAgICAgICB2YXIgbGVuZ3RoID0gYXJyLmxlbmd0aCxcbiAgICAgICAgICAgIHN1bSA9IDA7XG5cbiAgICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgICAgICBzdW0gKz0gYXJyW2xlbmd0aF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1bTtcbiAgICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi9hcnJheV9oZWxwZXIuanMiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgZHJhd1JlY3Q6IGZ1bmN0aW9uKHBvcywgc2l6ZSwgY3R4LCBzdHlsZSl7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0eWxlLmNvbG9yO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gc3R5bGUuY29sb3I7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VSZWN0KHBvcy54LCBwb3MueSwgc2l6ZS54LCBzaXplLnkpO1xuICAgIH0sXG4gICAgZHJhd1BhdGg6IGZ1bmN0aW9uKHBhdGgsIGRlZiwgY3R4LCBzdHlsZSkge1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdHlsZS5jb2xvcjtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0eWxlLmNvbG9yO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gc3R5bGUubGluZVdpZHRoO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8ocGF0aFswXVtkZWYueF0sIHBhdGhbMF1bZGVmLnldKTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCBwYXRoLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBjdHgubGluZVRvKHBhdGhbal1bZGVmLnhdLCBwYXRoW2pdW2RlZi55XSk7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfSxcbiAgICBkcmF3SW1hZ2U6IGZ1bmN0aW9uKGltYWdlRGF0YSwgc2l6ZSwgY3R4KSB7XG4gICAgICAgIHZhciBjYW52YXNEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBzaXplLngsIHNpemUueSksXG4gICAgICAgICAgICBkYXRhID0gY2FudmFzRGF0YS5kYXRhLFxuICAgICAgICAgICAgaW1hZ2VEYXRhUG9zID0gaW1hZ2VEYXRhLmxlbmd0aCxcbiAgICAgICAgICAgIGNhbnZhc0RhdGFQb3MgPSBkYXRhLmxlbmd0aCxcbiAgICAgICAgICAgIHZhbHVlO1xuXG4gICAgICAgIGlmIChjYW52YXNEYXRhUG9zIC8gaW1hZ2VEYXRhUG9zICE9PSA0KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGltYWdlRGF0YVBvcy0tKXtcbiAgICAgICAgICAgIHZhbHVlID0gaW1hZ2VEYXRhW2ltYWdlRGF0YVBvc107XG4gICAgICAgICAgICBkYXRhWy0tY2FudmFzRGF0YVBvc10gPSAyNTU7XG4gICAgICAgICAgICBkYXRhWy0tY2FudmFzRGF0YVBvc10gPSB2YWx1ZTtcbiAgICAgICAgICAgIGRhdGFbLS1jYW52YXNEYXRhUG9zXSA9IHZhbHVlO1xuICAgICAgICAgICAgZGF0YVstLWNhbnZhc0RhdGFQb3NdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LnB1dEltYWdlRGF0YShjYW52YXNEYXRhLCAwLCAwKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24vaW1hZ2VfZGVidWcuanMiLCJ2YXIgbGlzdENhY2hlQ2xlYXIgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVDbGVhcicpLFxuICAgIGxpc3RDYWNoZURlbGV0ZSA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZURlbGV0ZScpLFxuICAgIGxpc3RDYWNoZUdldCA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZUdldCcpLFxuICAgIGxpc3RDYWNoZUhhcyA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZUhhcycpLFxuICAgIGxpc3RDYWNoZVNldCA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZVNldCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gbGlzdCBjYWNoZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIExpc3RDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA9PSBudWxsID8gMCA6IGVudHJpZXMubGVuZ3RoO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBMaXN0Q2FjaGVgLlxuTGlzdENhY2hlLnByb3RvdHlwZS5jbGVhciA9IGxpc3RDYWNoZUNsZWFyO1xuTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmdldCA9IGxpc3RDYWNoZUdldDtcbkxpc3RDYWNoZS5wcm90b3R5cGUuaGFzID0gbGlzdENhY2hlSGFzO1xuTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gTGlzdENhY2hlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fTGlzdENhY2hlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbm1vZHVsZS5leHBvcnRzID0gU3ltYm9sO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fU3ltYm9sLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZXEgPSByZXF1aXJlKCcuL2VxJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGBrZXlgIGlzIGZvdW5kIGluIGBhcnJheWAgb2Yga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0ga2V5IFRoZSBrZXkgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGFzc29jSW5kZXhPZihhcnJheSwga2V5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChlcShhcnJheVtsZW5ndGhdWzBdLCBrZXkpKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzb2NJbmRleE9mO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fYXNzb2NJbmRleE9mLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzS2V5ID0gcmVxdWlyZSgnLi9faXNLZXknKSxcbiAgICBzdHJpbmdUb1BhdGggPSByZXF1aXJlKCcuL19zdHJpbmdUb1BhdGgnKSxcbiAgICB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdG9TdHJpbmcnKTtcblxuLyoqXG4gKiBDYXN0cyBgdmFsdWVgIHRvIGEgcGF0aCBhcnJheSBpZiBpdCdzIG5vdCBvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeSBrZXlzIG9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjYXN0IHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGNhc3RQYXRoKHZhbHVlLCBvYmplY3QpIHtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiBpc0tleSh2YWx1ZSwgb2JqZWN0KSA/IFt2YWx1ZV0gOiBzdHJpbmdUb1BhdGgodG9TdHJpbmcodmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYXN0UGF0aDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2Nhc3RQYXRoLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNLZXlhYmxlID0gcmVxdWlyZSgnLi9faXNLZXlhYmxlJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRNYXBEYXRhO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fZ2V0TWFwRGF0YS5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJbmRleDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2lzSW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIG5hdGl2ZUNyZWF0ZSA9IGdldE5hdGl2ZShPYmplY3QsICdjcmVhdGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuYXRpdmVDcmVhdGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19uYXRpdmVDcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9lcS5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGJhc2VJc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vX2Jhc2VJc0FyZ3VtZW50cycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FyZ3VtZW50cyA9IGJhc2VJc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA/IGJhc2VJc0FyZ3VtZW50cyA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJndW1lbnRzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9pc0FyZ3VtZW50cy5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IENsdXN0ZXIyIGZyb20gJy4vY2x1c3Rlcic7XG5pbXBvcnQgQXJyYXlIZWxwZXIgZnJvbSAnLi9hcnJheV9oZWxwZXInO1xuY29uc3QgdmVjMiA9IHtcbiAgICBjbG9uZTogcmVxdWlyZSgnZ2wtdmVjMi9jbG9uZScpLFxufTtcbmNvbnN0IHZlYzMgPSB7XG4gICAgY2xvbmU6IHJlcXVpcmUoJ2dsLXZlYzMvY2xvbmUnKSxcbn07XG5cbi8qKlxuICogQHBhcmFtIHggeC1jb29yZGluYXRlXG4gKiBAcGFyYW0geSB5LWNvb3JkaW5hdGVcbiAqIEByZXR1cm4gSW1hZ2VSZWZlcmVuY2Uge3gseX0gQ29vcmRpbmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW1hZ2VSZWYoeCwgeSkge1xuICAgIHZhciB0aGF0ID0ge1xuICAgICAgICB4OiB4LFxuICAgICAgICB5OiB5LFxuICAgICAgICB0b1ZlYzI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHZlYzIuY2xvbmUoW3RoaXMueCwgdGhpcy55XSk7XG4gICAgICAgIH0sXG4gICAgICAgIHRvVmVjMzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdmVjMy5jbG9uZShbdGhpcy54LCB0aGlzLnksIDFdKTtcbiAgICAgICAgfSxcbiAgICAgICAgcm91bmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy54ID0gdGhpcy54ID4gMC4wID8gTWF0aC5mbG9vcih0aGlzLnggKyAwLjUpIDogTWF0aC5mbG9vcih0aGlzLnggLSAwLjUpO1xuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy55ID4gMC4wID8gTWF0aC5mbG9vcih0aGlzLnkgKyAwLjUpIDogTWF0aC5mbG9vcih0aGlzLnkgLSAwLjUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xufTtcblxuLyoqXG4gKiBDb21wdXRlcyBhbiBpbnRlZ3JhbCBpbWFnZSBvZiBhIGdpdmVuIGdyYXlzY2FsZSBpbWFnZS5cbiAqIEBwYXJhbSBpbWFnZURhdGFDb250YWluZXIge0ltYWdlRGF0YUNvbnRhaW5lcn0gdGhlIGltYWdlIHRvIGJlIGludGVncmF0ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVJbnRlZ3JhbEltYWdlMihpbWFnZVdyYXBwZXIsIGludGVncmFsV3JhcHBlcikge1xuICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZVdyYXBwZXIuZGF0YTtcbiAgICB2YXIgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54O1xuICAgIHZhciBoZWlnaHQgPSBpbWFnZVdyYXBwZXIuc2l6ZS55O1xuICAgIHZhciBpbnRlZ3JhbEltYWdlRGF0YSA9IGludGVncmFsV3JhcHBlci5kYXRhO1xuICAgIHZhciBzdW0gPSAwLCBwb3NBID0gMCwgcG9zQiA9IDAsIHBvc0MgPSAwLCBwb3NEID0gMCwgeCwgeTtcblxuICAgIC8vIHN1bSB1cCBmaXJzdCBjb2x1bW5cbiAgICBwb3NCID0gd2lkdGg7XG4gICAgc3VtID0gMDtcbiAgICBmb3IgKCB5ID0gMTsgeSA8IGhlaWdodDsgeSsrKSB7XG4gICAgICAgIHN1bSArPSBpbWFnZURhdGFbcG9zQV07XG4gICAgICAgIGludGVncmFsSW1hZ2VEYXRhW3Bvc0JdICs9IHN1bTtcbiAgICAgICAgcG9zQSArPSB3aWR0aDtcbiAgICAgICAgcG9zQiArPSB3aWR0aDtcbiAgICB9XG5cbiAgICBwb3NBID0gMDtcbiAgICBwb3NCID0gMTtcbiAgICBzdW0gPSAwO1xuICAgIGZvciAoIHggPSAxOyB4IDwgd2lkdGg7IHgrKykge1xuICAgICAgICBzdW0gKz0gaW1hZ2VEYXRhW3Bvc0FdO1xuICAgICAgICBpbnRlZ3JhbEltYWdlRGF0YVtwb3NCXSArPSBzdW07XG4gICAgICAgIHBvc0ErKztcbiAgICAgICAgcG9zQisrO1xuICAgIH1cblxuICAgIGZvciAoIHkgPSAxOyB5IDwgaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgcG9zQSA9IHkgKiB3aWR0aCArIDE7XG4gICAgICAgIHBvc0IgPSAoeSAtIDEpICogd2lkdGggKyAxO1xuICAgICAgICBwb3NDID0geSAqIHdpZHRoO1xuICAgICAgICBwb3NEID0gKHkgLSAxKSAqIHdpZHRoO1xuICAgICAgICBmb3IgKCB4ID0gMTsgeCA8IHdpZHRoOyB4KyspIHtcbiAgICAgICAgICAgIGludGVncmFsSW1hZ2VEYXRhW3Bvc0FdICs9XG4gICAgICAgICAgICAgICAgaW1hZ2VEYXRhW3Bvc0FdICsgaW50ZWdyYWxJbWFnZURhdGFbcG9zQl0gKyBpbnRlZ3JhbEltYWdlRGF0YVtwb3NDXSAtIGludGVncmFsSW1hZ2VEYXRhW3Bvc0RdO1xuICAgICAgICAgICAgcG9zQSsrO1xuICAgICAgICAgICAgcG9zQisrO1xuICAgICAgICAgICAgcG9zQysrO1xuICAgICAgICAgICAgcG9zRCsrO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVJbnRlZ3JhbEltYWdlKGltYWdlV3JhcHBlciwgaW50ZWdyYWxXcmFwcGVyKSB7XG4gICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhO1xuICAgIHZhciB3aWR0aCA9IGltYWdlV3JhcHBlci5zaXplLng7XG4gICAgdmFyIGhlaWdodCA9IGltYWdlV3JhcHBlci5zaXplLnk7XG4gICAgdmFyIGludGVncmFsSW1hZ2VEYXRhID0gaW50ZWdyYWxXcmFwcGVyLmRhdGE7XG4gICAgdmFyIHN1bSA9IDA7XG5cbiAgICAvLyBzdW0gdXAgZmlyc3Qgcm93XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICAgIHN1bSArPSBpbWFnZURhdGFbaV07XG4gICAgICAgIGludGVncmFsSW1hZ2VEYXRhW2ldID0gc3VtO1xuICAgIH1cblxuICAgIGZvciAodmFyIHYgPSAxOyB2IDwgaGVpZ2h0OyB2KyspIHtcbiAgICAgICAgc3VtID0gMDtcbiAgICAgICAgZm9yICh2YXIgdSA9IDA7IHUgPCB3aWR0aDsgdSsrKSB7XG4gICAgICAgICAgICBzdW0gKz0gaW1hZ2VEYXRhW3YgKiB3aWR0aCArIHVdO1xuICAgICAgICAgICAgaW50ZWdyYWxJbWFnZURhdGFbKCh2KSAqIHdpZHRoKSArIHVdID0gc3VtICsgaW50ZWdyYWxJbWFnZURhdGFbKHYgLSAxKSAqIHdpZHRoICsgdV07XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdGhyZXNob2xkSW1hZ2UoaW1hZ2VXcmFwcGVyLCB0aHJlc2hvbGQsIHRhcmdldFdyYXBwZXIpIHtcbiAgICBpZiAoIXRhcmdldFdyYXBwZXIpIHtcbiAgICAgICAgdGFyZ2V0V3JhcHBlciA9IGltYWdlV3JhcHBlcjtcbiAgICB9XG4gICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhLCBsZW5ndGggPSBpbWFnZURhdGEubGVuZ3RoLCB0YXJnZXREYXRhID0gdGFyZ2V0V3JhcHBlci5kYXRhO1xuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIHRhcmdldERhdGFbbGVuZ3RoXSA9IGltYWdlRGF0YVtsZW5ndGhdIDwgdGhyZXNob2xkID8gMSA6IDA7XG4gICAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVIaXN0b2dyYW0oaW1hZ2VXcmFwcGVyLCBiaXRzUGVyUGl4ZWwpIHtcbiAgICBpZiAoIWJpdHNQZXJQaXhlbCkge1xuICAgICAgICBiaXRzUGVyUGl4ZWwgPSA4O1xuICAgIH1cbiAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGEsXG4gICAgICAgIGxlbmd0aCA9IGltYWdlRGF0YS5sZW5ndGgsXG4gICAgICAgIGJpdFNoaWZ0ID0gOCAtIGJpdHNQZXJQaXhlbCxcbiAgICAgICAgYnVja2V0Q250ID0gMSA8PCBiaXRzUGVyUGl4ZWwsXG4gICAgICAgIGhpc3QgPSBuZXcgSW50MzJBcnJheShidWNrZXRDbnQpO1xuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIGhpc3RbaW1hZ2VEYXRhW2xlbmd0aF0gPj4gYml0U2hpZnRdKys7XG4gICAgfVxuICAgIHJldHVybiBoaXN0O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNoYXJwZW5MaW5lKGxpbmUpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgbGVuZ3RoID0gbGluZS5sZW5ndGgsXG4gICAgICAgIGxlZnQgPSBsaW5lWzBdLFxuICAgICAgICBjZW50ZXIgPSBsaW5lWzFdLFxuICAgICAgICByaWdodDtcblxuICAgIGZvciAoaSA9IDE7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgcmlnaHQgPSBsaW5lW2kgKyAxXTtcbiAgICAgICAgLy8gIC0xIDQgLTEga2VybmVsXG4gICAgICAgIGxpbmVbaSAtIDFdID0gKCgoY2VudGVyICogMikgLSBsZWZ0IC0gcmlnaHQpKSAmIDI1NTtcbiAgICAgICAgbGVmdCA9IGNlbnRlcjtcbiAgICAgICAgY2VudGVyID0gcmlnaHQ7XG4gICAgfVxuICAgIHJldHVybiBsaW5lO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRldGVybWluZU90c3VUaHJlc2hvbGQoaW1hZ2VXcmFwcGVyLCBiaXRzUGVyUGl4ZWwpIHtcbiAgICBpZiAoIWJpdHNQZXJQaXhlbCkge1xuICAgICAgICBiaXRzUGVyUGl4ZWwgPSA4O1xuICAgIH1cbiAgICB2YXIgaGlzdCxcbiAgICAgICAgdGhyZXNob2xkLFxuICAgICAgICBiaXRTaGlmdCA9IDggLSBiaXRzUGVyUGl4ZWw7XG5cbiAgICBmdW5jdGlvbiBweChpbml0LCBlbmQpIHtcbiAgICAgICAgdmFyIHN1bSA9IDAsIGk7XG4gICAgICAgIGZvciAoIGkgPSBpbml0OyBpIDw9IGVuZDsgaSsrKSB7XG4gICAgICAgICAgICBzdW0gKz0gaGlzdFtpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VtO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG14KGluaXQsIGVuZCkge1xuICAgICAgICB2YXIgaSwgc3VtID0gMDtcblxuICAgICAgICBmb3IgKCBpID0gaW5pdDsgaSA8PSBlbmQ7IGkrKykge1xuICAgICAgICAgICAgc3VtICs9IGkgKiBoaXN0W2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN1bTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXRlcm1pbmVUaHJlc2hvbGQoKSB7XG4gICAgICAgIHZhciB2ZXQgPSBbMF0sIHAxLCBwMiwgcDEyLCBrLCBtMSwgbTIsIG0xMixcbiAgICAgICAgICAgIG1heCA9ICgxIDw8IGJpdHNQZXJQaXhlbCkgLSAxO1xuXG4gICAgICAgIGhpc3QgPSBjb21wdXRlSGlzdG9ncmFtKGltYWdlV3JhcHBlciwgYml0c1BlclBpeGVsKTtcbiAgICAgICAgZm9yICggayA9IDE7IGsgPCBtYXg7IGsrKykge1xuICAgICAgICAgICAgcDEgPSBweCgwLCBrKTtcbiAgICAgICAgICAgIHAyID0gcHgoayArIDEsIG1heCk7XG4gICAgICAgICAgICBwMTIgPSBwMSAqIHAyO1xuICAgICAgICAgICAgaWYgKHAxMiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHAxMiA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtMSA9IG14KDAsIGspICogcDI7XG4gICAgICAgICAgICBtMiA9IG14KGsgKyAxLCBtYXgpICogcDE7XG4gICAgICAgICAgICBtMTIgPSBtMSAtIG0yO1xuICAgICAgICAgICAgdmV0W2tdID0gbTEyICogbTEyIC8gcDEyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBBcnJheUhlbHBlci5tYXhJbmRleCh2ZXQpO1xuICAgIH1cblxuICAgIHRocmVzaG9sZCA9IGRldGVybWluZVRocmVzaG9sZCgpO1xuICAgIHJldHVybiB0aHJlc2hvbGQgPDwgYml0U2hpZnQ7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb3RzdVRocmVzaG9sZChpbWFnZVdyYXBwZXIsIHRhcmdldFdyYXBwZXIpIHtcbiAgICB2YXIgdGhyZXNob2xkID0gZGV0ZXJtaW5lT3RzdVRocmVzaG9sZChpbWFnZVdyYXBwZXIpO1xuXG4gICAgdGhyZXNob2xkSW1hZ2UoaW1hZ2VXcmFwcGVyLCB0aHJlc2hvbGQsIHRhcmdldFdyYXBwZXIpO1xuICAgIHJldHVybiB0aHJlc2hvbGQ7XG59O1xuXG4vLyBsb2NhbCB0aHJlc2hvbGRpbmdcbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlQmluYXJ5SW1hZ2UoaW1hZ2VXcmFwcGVyLCBpbnRlZ3JhbFdyYXBwZXIsIHRhcmdldFdyYXBwZXIpIHtcbiAgICBjb21wdXRlSW50ZWdyYWxJbWFnZShpbWFnZVdyYXBwZXIsIGludGVncmFsV3JhcHBlcik7XG5cbiAgICBpZiAoIXRhcmdldFdyYXBwZXIpIHtcbiAgICAgICAgdGFyZ2V0V3JhcHBlciA9IGltYWdlV3JhcHBlcjtcbiAgICB9XG4gICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhO1xuICAgIHZhciB0YXJnZXREYXRhID0gdGFyZ2V0V3JhcHBlci5kYXRhO1xuICAgIHZhciB3aWR0aCA9IGltYWdlV3JhcHBlci5zaXplLng7XG4gICAgdmFyIGhlaWdodCA9IGltYWdlV3JhcHBlci5zaXplLnk7XG4gICAgdmFyIGludGVncmFsSW1hZ2VEYXRhID0gaW50ZWdyYWxXcmFwcGVyLmRhdGE7XG4gICAgdmFyIHN1bSA9IDAsIHYsIHUsIGtlcm5lbCA9IDMsIEEsIEIsIEMsIEQsIGF2Zywgc2l6ZSA9IChrZXJuZWwgKiAyICsgMSkgKiAoa2VybmVsICogMiArIDEpO1xuXG4gICAgLy8gY2xlYXIgb3V0IHRvcCAmIGJvdHRvbS1ib3JkZXJcbiAgICBmb3IgKCB2ID0gMDsgdiA8PSBrZXJuZWw7IHYrKykge1xuICAgICAgICBmb3IgKCB1ID0gMDsgdSA8IHdpZHRoOyB1KyspIHtcbiAgICAgICAgICAgIHRhcmdldERhdGFbKCh2KSAqIHdpZHRoKSArIHVdID0gMDtcbiAgICAgICAgICAgIHRhcmdldERhdGFbKCgoaGVpZ2h0IC0gMSkgLSB2KSAqIHdpZHRoKSArIHVdID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNsZWFyIG91dCBsZWZ0ICYgcmlnaHQgYm9yZGVyXG4gICAgZm9yICggdiA9IGtlcm5lbDsgdiA8IGhlaWdodCAtIGtlcm5lbDsgdisrKSB7XG4gICAgICAgIGZvciAoIHUgPSAwOyB1IDw9IGtlcm5lbDsgdSsrKSB7XG4gICAgICAgICAgICB0YXJnZXREYXRhWygodikgKiB3aWR0aCkgKyB1XSA9IDA7XG4gICAgICAgICAgICB0YXJnZXREYXRhWygodikgKiB3aWR0aCkgKyAod2lkdGggLSAxIC0gdSldID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoIHYgPSBrZXJuZWwgKyAxOyB2IDwgaGVpZ2h0IC0ga2VybmVsIC0gMTsgdisrKSB7XG4gICAgICAgIGZvciAoIHUgPSBrZXJuZWwgKyAxOyB1IDwgd2lkdGggLSBrZXJuZWw7IHUrKykge1xuICAgICAgICAgICAgQSA9IGludGVncmFsSW1hZ2VEYXRhWyh2IC0ga2VybmVsIC0gMSkgKiB3aWR0aCArICh1IC0ga2VybmVsIC0gMSldO1xuICAgICAgICAgICAgQiA9IGludGVncmFsSW1hZ2VEYXRhWyh2IC0ga2VybmVsIC0gMSkgKiB3aWR0aCArICh1ICsga2VybmVsKV07XG4gICAgICAgICAgICBDID0gaW50ZWdyYWxJbWFnZURhdGFbKHYgKyBrZXJuZWwpICogd2lkdGggKyAodSAtIGtlcm5lbCAtIDEpXTtcbiAgICAgICAgICAgIEQgPSBpbnRlZ3JhbEltYWdlRGF0YVsodiArIGtlcm5lbCkgKiB3aWR0aCArICh1ICsga2VybmVsKV07XG4gICAgICAgICAgICBzdW0gPSBEIC0gQyAtIEIgKyBBO1xuICAgICAgICAgICAgYXZnID0gc3VtIC8gKHNpemUpO1xuICAgICAgICAgICAgdGFyZ2V0RGF0YVt2ICogd2lkdGggKyB1XSA9IGltYWdlRGF0YVt2ICogd2lkdGggKyB1XSA+IChhdmcgKyA1KSA/IDAgOiAxO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNsdXN0ZXIocG9pbnRzLCB0aHJlc2hvbGQsIHByb3BlcnR5KSB7XG4gICAgdmFyIGksIGssIGNsdXN0ZXIsIHBvaW50LCBjbHVzdGVycyA9IFtdO1xuXG4gICAgaWYgKCFwcm9wZXJ0eSkge1xuICAgICAgICBwcm9wZXJ0eSA9IFwicmFkXCI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVG9DbHVzdGVyKG5ld1BvaW50KSB7XG4gICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKCBrID0gMDsgayA8IGNsdXN0ZXJzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBjbHVzdGVyID0gY2x1c3RlcnNba107XG4gICAgICAgICAgICBpZiAoY2x1c3Rlci5maXRzKG5ld1BvaW50KSkge1xuICAgICAgICAgICAgICAgIGNsdXN0ZXIuYWRkKG5ld1BvaW50KTtcbiAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH1cblxuICAgIC8vIGl0ZXJhdGUgb3ZlciBlYWNoIGNsb3VkXG4gICAgZm9yICggaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcG9pbnQgPSBDbHVzdGVyMi5jcmVhdGVQb2ludChwb2ludHNbaV0sIGksIHByb3BlcnR5KTtcbiAgICAgICAgaWYgKCFhZGRUb0NsdXN0ZXIocG9pbnQpKSB7XG4gICAgICAgICAgICBjbHVzdGVycy5wdXNoKENsdXN0ZXIyLmNyZWF0ZShwb2ludCwgdGhyZXNob2xkKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNsdXN0ZXJzO1xufTtcblxuZXhwb3J0IGNvbnN0IFRyYWNlciA9IHtcbiAgICB0cmFjZTogZnVuY3Rpb24ocG9pbnRzLCB2ZWMpIHtcbiAgICAgICAgdmFyIGl0ZXJhdGlvbiwgbWF4SXRlcmF0aW9ucyA9IDEwLCB0b3AgPSBbXSwgcmVzdWx0ID0gW10sIGNlbnRlclBvcyA9IDAsIGN1cnJlbnRQb3MgPSAwO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRyYWNlKGlkeCwgZm9yd2FyZCkge1xuICAgICAgICAgICAgdmFyIGZyb20sIHRvLCB0b0lkeCwgcHJlZGljdGVkUG9zLCB0aHJlc2hvbGRYID0gMSwgdGhyZXNob2xkWSA9IE1hdGguYWJzKHZlY1sxXSAvIDEwKSwgZm91bmQgPSBmYWxzZTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gbWF0Y2gocG9zLCBwcmVkaWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zLnggPiAocHJlZGljdGVkLnggLSB0aHJlc2hvbGRYKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgcG9zLnggPCAocHJlZGljdGVkLnggKyB0aHJlc2hvbGRYKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgcG9zLnkgPiAocHJlZGljdGVkLnkgLSB0aHJlc2hvbGRZKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgcG9zLnkgPCAocHJlZGljdGVkLnkgKyB0aHJlc2hvbGRZKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgbmV4dCBpbmRleCBpcyB3aXRoaW4gdGhlIHZlYyBzcGVjaWZpY2F0aW9uc1xuICAgICAgICAgICAgLy8gaWYgbm90LCBjaGVjayBhcyBsb25nIGFzIHRoZSB0aHJlc2hvbGQgaXMgbWV0XG5cbiAgICAgICAgICAgIGZyb20gPSBwb2ludHNbaWR4XTtcbiAgICAgICAgICAgIGlmIChmb3J3YXJkKSB7XG4gICAgICAgICAgICAgICAgcHJlZGljdGVkUG9zID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBmcm9tLnggKyB2ZWNbMF0sXG4gICAgICAgICAgICAgICAgICAgIHk6IGZyb20ueSArIHZlY1sxXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByZWRpY3RlZFBvcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogZnJvbS54IC0gdmVjWzBdLFxuICAgICAgICAgICAgICAgICAgICB5OiBmcm9tLnkgLSB2ZWNbMV1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b0lkeCA9IGZvcndhcmQgPyBpZHggKyAxIDogaWR4IC0gMTtcbiAgICAgICAgICAgIHRvID0gcG9pbnRzW3RvSWR4XTtcbiAgICAgICAgICAgIHdoaWxlICh0byAmJiAoIGZvdW5kID0gbWF0Y2godG8sIHByZWRpY3RlZFBvcykpICE9PSB0cnVlICYmIChNYXRoLmFicyh0by55IC0gZnJvbS55KSA8IHZlY1sxXSkpIHtcbiAgICAgICAgICAgICAgICB0b0lkeCA9IGZvcndhcmQgPyB0b0lkeCArIDEgOiB0b0lkeCAtIDE7XG4gICAgICAgICAgICAgICAgdG8gPSBwb2ludHNbdG9JZHhdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZm91bmQgPyB0b0lkeCA6IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKCBpdGVyYXRpb24gPSAwOyBpdGVyYXRpb24gPCBtYXhJdGVyYXRpb25zOyBpdGVyYXRpb24rKykge1xuICAgICAgICAgICAgLy8gcmFuZG9tbHkgc2VsZWN0IHBvaW50IHRvIHN0YXJ0IHdpdGhcbiAgICAgICAgICAgIGNlbnRlclBvcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvaW50cy5sZW5ndGgpO1xuXG4gICAgICAgICAgICAvLyB0cmFjZSBmb3J3YXJkXG4gICAgICAgICAgICB0b3AgPSBbXTtcbiAgICAgICAgICAgIGN1cnJlbnRQb3MgPSBjZW50ZXJQb3M7XG4gICAgICAgICAgICB0b3AucHVzaChwb2ludHNbY3VycmVudFBvc10pO1xuICAgICAgICAgICAgd2hpbGUgKCggY3VycmVudFBvcyA9IHRyYWNlKGN1cnJlbnRQb3MsIHRydWUpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRvcC5wdXNoKHBvaW50c1tjdXJyZW50UG9zXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2VudGVyUG9zID4gMCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQb3MgPSBjZW50ZXJQb3M7XG4gICAgICAgICAgICAgICAgd2hpbGUgKCggY3VycmVudFBvcyA9IHRyYWNlKGN1cnJlbnRQb3MsIGZhbHNlKSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9wLnB1c2gocG9pbnRzW2N1cnJlbnRQb3NdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0b3AubGVuZ3RoID4gcmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBESUxBVEUgPSAxO1xuZXhwb3J0IGNvbnN0IEVST0RFID0gMjtcblxuZXhwb3J0IGZ1bmN0aW9uIGRpbGF0ZShpbkltYWdlV3JhcHBlciwgb3V0SW1hZ2VXcmFwcGVyKSB7XG4gICAgdmFyIHYsXG4gICAgICAgIHUsXG4gICAgICAgIGluSW1hZ2VEYXRhID0gaW5JbWFnZVdyYXBwZXIuZGF0YSxcbiAgICAgICAgb3V0SW1hZ2VEYXRhID0gb3V0SW1hZ2VXcmFwcGVyLmRhdGEsXG4gICAgICAgIGhlaWdodCA9IGluSW1hZ2VXcmFwcGVyLnNpemUueSxcbiAgICAgICAgd2lkdGggPSBpbkltYWdlV3JhcHBlci5zaXplLngsXG4gICAgICAgIHN1bSxcbiAgICAgICAgeVN0YXJ0MSxcbiAgICAgICAgeVN0YXJ0MixcbiAgICAgICAgeFN0YXJ0MSxcbiAgICAgICAgeFN0YXJ0MjtcblxuICAgIGZvciAoIHYgPSAxOyB2IDwgaGVpZ2h0IC0gMTsgdisrKSB7XG4gICAgICAgIGZvciAoIHUgPSAxOyB1IDwgd2lkdGggLSAxOyB1KyspIHtcbiAgICAgICAgICAgIHlTdGFydDEgPSB2IC0gMTtcbiAgICAgICAgICAgIHlTdGFydDIgPSB2ICsgMTtcbiAgICAgICAgICAgIHhTdGFydDEgPSB1IC0gMTtcbiAgICAgICAgICAgIHhTdGFydDIgPSB1ICsgMTtcbiAgICAgICAgICAgIHN1bSA9IGluSW1hZ2VEYXRhW3lTdGFydDEgKiB3aWR0aCArIHhTdGFydDFdICsgaW5JbWFnZURhdGFbeVN0YXJ0MSAqIHdpZHRoICsgeFN0YXJ0Ml0gK1xuICAgICAgICAgICAgaW5JbWFnZURhdGFbdiAqIHdpZHRoICsgdV0gK1xuICAgICAgICAgICAgaW5JbWFnZURhdGFbeVN0YXJ0MiAqIHdpZHRoICsgeFN0YXJ0MV0gKyBpbkltYWdlRGF0YVt5U3RhcnQyICogd2lkdGggKyB4U3RhcnQyXTtcbiAgICAgICAgICAgIG91dEltYWdlRGF0YVt2ICogd2lkdGggKyB1XSA9IHN1bSA+IDAgPyAxIDogMDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBlcm9kZShpbkltYWdlV3JhcHBlciwgb3V0SW1hZ2VXcmFwcGVyKSB7XG4gICAgdmFyIHYsXG4gICAgICAgIHUsXG4gICAgICAgIGluSW1hZ2VEYXRhID0gaW5JbWFnZVdyYXBwZXIuZGF0YSxcbiAgICAgICAgb3V0SW1hZ2VEYXRhID0gb3V0SW1hZ2VXcmFwcGVyLmRhdGEsXG4gICAgICAgIGhlaWdodCA9IGluSW1hZ2VXcmFwcGVyLnNpemUueSxcbiAgICAgICAgd2lkdGggPSBpbkltYWdlV3JhcHBlci5zaXplLngsXG4gICAgICAgIHN1bSxcbiAgICAgICAgeVN0YXJ0MSxcbiAgICAgICAgeVN0YXJ0MixcbiAgICAgICAgeFN0YXJ0MSxcbiAgICAgICAgeFN0YXJ0MjtcblxuICAgIGZvciAoIHYgPSAxOyB2IDwgaGVpZ2h0IC0gMTsgdisrKSB7XG4gICAgICAgIGZvciAoIHUgPSAxOyB1IDwgd2lkdGggLSAxOyB1KyspIHtcbiAgICAgICAgICAgIHlTdGFydDEgPSB2IC0gMTtcbiAgICAgICAgICAgIHlTdGFydDIgPSB2ICsgMTtcbiAgICAgICAgICAgIHhTdGFydDEgPSB1IC0gMTtcbiAgICAgICAgICAgIHhTdGFydDIgPSB1ICsgMTtcbiAgICAgICAgICAgIHN1bSA9IGluSW1hZ2VEYXRhW3lTdGFydDEgKiB3aWR0aCArIHhTdGFydDFdICsgaW5JbWFnZURhdGFbeVN0YXJ0MSAqIHdpZHRoICsgeFN0YXJ0Ml0gK1xuICAgICAgICAgICAgaW5JbWFnZURhdGFbdiAqIHdpZHRoICsgdV0gK1xuICAgICAgICAgICAgaW5JbWFnZURhdGFbeVN0YXJ0MiAqIHdpZHRoICsgeFN0YXJ0MV0gKyBpbkltYWdlRGF0YVt5U3RhcnQyICogd2lkdGggKyB4U3RhcnQyXTtcbiAgICAgICAgICAgIG91dEltYWdlRGF0YVt2ICogd2lkdGggKyB1XSA9IHN1bSA9PT0gNSA/IDEgOiAwO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHN1YnRyYWN0KGFJbWFnZVdyYXBwZXIsIGJJbWFnZVdyYXBwZXIsIHJlc3VsdEltYWdlV3JhcHBlcikge1xuICAgIGlmICghcmVzdWx0SW1hZ2VXcmFwcGVyKSB7XG4gICAgICAgIHJlc3VsdEltYWdlV3JhcHBlciA9IGFJbWFnZVdyYXBwZXI7XG4gICAgfVxuICAgIHZhciBsZW5ndGggPSBhSW1hZ2VXcmFwcGVyLmRhdGEubGVuZ3RoLFxuICAgICAgICBhSW1hZ2VEYXRhID0gYUltYWdlV3JhcHBlci5kYXRhLFxuICAgICAgICBiSW1hZ2VEYXRhID0gYkltYWdlV3JhcHBlci5kYXRhLFxuICAgICAgICBjSW1hZ2VEYXRhID0gcmVzdWx0SW1hZ2VXcmFwcGVyLmRhdGE7XG5cbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgY0ltYWdlRGF0YVtsZW5ndGhdID0gYUltYWdlRGF0YVtsZW5ndGhdIC0gYkltYWdlRGF0YVtsZW5ndGhdO1xuICAgIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBiaXR3aXNlT3IoYUltYWdlV3JhcHBlciwgYkltYWdlV3JhcHBlciwgcmVzdWx0SW1hZ2VXcmFwcGVyKSB7XG4gICAgaWYgKCFyZXN1bHRJbWFnZVdyYXBwZXIpIHtcbiAgICAgICAgcmVzdWx0SW1hZ2VXcmFwcGVyID0gYUltYWdlV3JhcHBlcjtcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IGFJbWFnZVdyYXBwZXIuZGF0YS5sZW5ndGgsXG4gICAgICAgIGFJbWFnZURhdGEgPSBhSW1hZ2VXcmFwcGVyLmRhdGEsXG4gICAgICAgIGJJbWFnZURhdGEgPSBiSW1hZ2VXcmFwcGVyLmRhdGEsXG4gICAgICAgIGNJbWFnZURhdGEgPSByZXN1bHRJbWFnZVdyYXBwZXIuZGF0YTtcblxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICBjSW1hZ2VEYXRhW2xlbmd0aF0gPSBhSW1hZ2VEYXRhW2xlbmd0aF0gfHwgYkltYWdlRGF0YVtsZW5ndGhdO1xuICAgIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3VudE5vblplcm8oaW1hZ2VXcmFwcGVyKSB7XG4gICAgdmFyIGxlbmd0aCA9IGltYWdlV3JhcHBlci5kYXRhLmxlbmd0aCwgZGF0YSA9IGltYWdlV3JhcHBlci5kYXRhLCBzdW0gPSAwO1xuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIHN1bSArPSBkYXRhW2xlbmd0aF07XG4gICAgfVxuICAgIHJldHVybiBzdW07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdG9wR2VuZXJpYyhsaXN0LCB0b3AsIHNjb3JlRnVuYykge1xuICAgIHZhciBpLCBtaW5JZHggPSAwLCBtaW4gPSAwLCBxdWV1ZSA9IFtdLCBzY29yZSwgaGl0LCBwb3M7XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8IHRvcDsgaSsrKSB7XG4gICAgICAgIHF1ZXVlW2ldID0ge1xuICAgICAgICAgICAgc2NvcmU6IDAsXG4gICAgICAgICAgICBpdGVtOiBudWxsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZm9yICggaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNjb3JlID0gc2NvcmVGdW5jLmFwcGx5KHRoaXMsIFtsaXN0W2ldXSk7XG4gICAgICAgIGlmIChzY29yZSA+IG1pbikge1xuICAgICAgICAgICAgaGl0ID0gcXVldWVbbWluSWR4XTtcbiAgICAgICAgICAgIGhpdC5zY29yZSA9IHNjb3JlO1xuICAgICAgICAgICAgaGl0Lml0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgbWluID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgICAgIGZvciAoIHBvcyA9IDA7IHBvcyA8IHRvcDsgcG9zKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocXVldWVbcG9zXS5zY29yZSA8IG1pbikge1xuICAgICAgICAgICAgICAgICAgICBtaW4gPSBxdWV1ZVtwb3NdLnNjb3JlO1xuICAgICAgICAgICAgICAgICAgICBtaW5JZHggPSBwb3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHF1ZXVlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdyYXlBcnJheUZyb21JbWFnZShodG1sSW1hZ2UsIG9mZnNldFgsIGN0eCwgYXJyYXkpIHtcbiAgICBjdHguZHJhd0ltYWdlKGh0bWxJbWFnZSwgb2Zmc2V0WCwgMCwgaHRtbEltYWdlLndpZHRoLCBodG1sSW1hZ2UuaGVpZ2h0KTtcbiAgICB2YXIgY3R4RGF0YSA9IGN0eC5nZXRJbWFnZURhdGEob2Zmc2V0WCwgMCwgaHRtbEltYWdlLndpZHRoLCBodG1sSW1hZ2UuaGVpZ2h0KS5kYXRhO1xuICAgIGNvbXB1dGVHcmF5KGN0eERhdGEsIGFycmF5KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBncmF5QXJyYXlGcm9tQ29udGV4dChjdHgsIHNpemUsIG9mZnNldCwgYXJyYXkpIHtcbiAgICB2YXIgY3R4RGF0YSA9IGN0eC5nZXRJbWFnZURhdGEob2Zmc2V0LngsIG9mZnNldC55LCBzaXplLngsIHNpemUueSkuZGF0YTtcbiAgICBjb21wdXRlR3JheShjdHhEYXRhLCBhcnJheSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ3JheUFuZEhhbGZTYW1wbGVGcm9tQ2FudmFzRGF0YShjYW52YXNEYXRhLCBzaXplLCBvdXRBcnJheSkge1xuICAgIHZhciB0b3BSb3dJZHggPSAwO1xuICAgIHZhciBib3R0b21Sb3dJZHggPSBzaXplLng7XG4gICAgdmFyIGVuZElkeCA9IE1hdGguZmxvb3IoY2FudmFzRGF0YS5sZW5ndGggLyA0KTtcbiAgICB2YXIgb3V0V2lkdGggPSBzaXplLnggLyAyO1xuICAgIHZhciBvdXRJbWdJZHggPSAwO1xuICAgIHZhciBpbldpZHRoID0gc2l6ZS54O1xuICAgIHZhciBpO1xuXG4gICAgd2hpbGUgKGJvdHRvbVJvd0lkeCA8IGVuZElkeCkge1xuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IG91dFdpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIG91dEFycmF5W291dEltZ0lkeF0gPSBNYXRoLmZsb29yKChcbiAgICAgICAgICAgICAgICAoMC4yOTkgKiBjYW52YXNEYXRhW3RvcFJvd0lkeCAqIDQgKyAwXSArXG4gICAgICAgICAgICAgICAgIDAuNTg3ICogY2FudmFzRGF0YVt0b3BSb3dJZHggKiA0ICsgMV0gK1xuICAgICAgICAgICAgICAgICAwLjExNCAqIGNhbnZhc0RhdGFbdG9wUm93SWR4ICogNCArIDJdKSArXG4gICAgICAgICAgICAgICAgKDAuMjk5ICogY2FudmFzRGF0YVsodG9wUm93SWR4ICsgMSkgKiA0ICsgMF0gK1xuICAgICAgICAgICAgICAgICAwLjU4NyAqIGNhbnZhc0RhdGFbKHRvcFJvd0lkeCArIDEpICogNCArIDFdICtcbiAgICAgICAgICAgICAgICAgMC4xMTQgKiBjYW52YXNEYXRhWyh0b3BSb3dJZHggKyAxKSAqIDQgKyAyXSkgK1xuICAgICAgICAgICAgICAgICgwLjI5OSAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCkgKiA0ICsgMF0gK1xuICAgICAgICAgICAgICAgICAwLjU4NyAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCkgKiA0ICsgMV0gK1xuICAgICAgICAgICAgICAgICAwLjExNCAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCkgKiA0ICsgMl0pICtcbiAgICAgICAgICAgICAgICAoMC4yOTkgKiBjYW52YXNEYXRhWyhib3R0b21Sb3dJZHggKyAxKSAqIDQgKyAwXSArXG4gICAgICAgICAgICAgICAgIDAuNTg3ICogY2FudmFzRGF0YVsoYm90dG9tUm93SWR4ICsgMSkgKiA0ICsgMV0gK1xuICAgICAgICAgICAgICAgICAwLjExNCAqIGNhbnZhc0RhdGFbKGJvdHRvbVJvd0lkeCArIDEpICogNCArIDJdKSkgLyA0KTtcbiAgICAgICAgICAgIG91dEltZ0lkeCsrO1xuICAgICAgICAgICAgdG9wUm93SWR4ID0gdG9wUm93SWR4ICsgMjtcbiAgICAgICAgICAgIGJvdHRvbVJvd0lkeCA9IGJvdHRvbVJvd0lkeCArIDI7XG4gICAgICAgIH1cbiAgICAgICAgdG9wUm93SWR4ID0gdG9wUm93SWR4ICsgaW5XaWR0aDtcbiAgICAgICAgYm90dG9tUm93SWR4ID0gYm90dG9tUm93SWR4ICsgaW5XaWR0aDtcbiAgICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZUdyYXkoaW1hZ2VEYXRhLCBvdXRBcnJheSwgY29uZmlnKSB7XG4gICAgdmFyIGwgPSAoaW1hZ2VEYXRhLmxlbmd0aCAvIDQpIHwgMCxcbiAgICAgICAgaSxcbiAgICAgICAgc2luZ2xlQ2hhbm5lbCA9IGNvbmZpZyAmJiBjb25maWcuc2luZ2xlQ2hhbm5lbCA9PT0gdHJ1ZTtcblxuICAgIGlmIChzaW5nbGVDaGFubmVsKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIG91dEFycmF5W2ldID0gaW1hZ2VEYXRhW2kgKiA0ICsgMF07XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBvdXRBcnJheVtpXSA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgICAgMC4yOTkgKiBpbWFnZURhdGFbaSAqIDQgKyAwXSArIDAuNTg3ICogaW1hZ2VEYXRhW2kgKiA0ICsgMV0gKyAwLjExNCAqIGltYWdlRGF0YVtpICogNCArIDJdKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkSW1hZ2VBcnJheShzcmMsIGNhbGxiYWNrLCBjYW52YXMpIHtcbiAgICBpZiAoIWNhbnZhcykge1xuICAgICAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB9XG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY2FudmFzLndpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcywgMCwgMCk7XG4gICAgICAgIHZhciBhcnJheSA9IG5ldyBVaW50OEFycmF5KHRoaXMud2lkdGggKiB0aGlzLmhlaWdodCk7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcywgMCwgMCk7XG4gICAgICAgIHZhciBkYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkuZGF0YTtcbiAgICAgICAgY29tcHV0ZUdyYXkoZGF0YSwgYXJyYXkpO1xuICAgICAgICB0aGlzLmNhbGxiYWNrKGFycmF5LCB7XG4gICAgICAgICAgICB4OiB0aGlzLndpZHRoLFxuICAgICAgICAgICAgeTogdGhpcy5oZWlnaHRcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfTtcbiAgICBpbWcuc3JjID0gc3JjO1xufTtcblxuLyoqXG4gKiBAcGFyYW0gaW5JbWcge0ltYWdlV3JhcHBlcn0gaW5wdXQgaW1hZ2UgdG8gYmUgc2FtcGxlZFxuICogQHBhcmFtIG91dEltZyB7SW1hZ2VXcmFwcGVyfSB0byBiZSBzdG9yZWQgaW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhbGZTYW1wbGUoaW5JbWdXcmFwcGVyLCBvdXRJbWdXcmFwcGVyKSB7XG4gICAgdmFyIGluSW1nID0gaW5JbWdXcmFwcGVyLmRhdGE7XG4gICAgdmFyIGluV2lkdGggPSBpbkltZ1dyYXBwZXIuc2l6ZS54O1xuICAgIHZhciBvdXRJbWcgPSBvdXRJbWdXcmFwcGVyLmRhdGE7XG4gICAgdmFyIHRvcFJvd0lkeCA9IDA7XG4gICAgdmFyIGJvdHRvbVJvd0lkeCA9IGluV2lkdGg7XG4gICAgdmFyIGVuZElkeCA9IGluSW1nLmxlbmd0aDtcbiAgICB2YXIgb3V0V2lkdGggPSBpbldpZHRoIC8gMjtcbiAgICB2YXIgb3V0SW1nSWR4ID0gMDtcbiAgICB3aGlsZSAoYm90dG9tUm93SWR4IDwgZW5kSWR4KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3V0V2lkdGg7IGkrKykge1xuICAgICAgICAgICAgb3V0SW1nW291dEltZ0lkeF0gPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgICAgIChpbkltZ1t0b3BSb3dJZHhdICsgaW5JbWdbdG9wUm93SWR4ICsgMV0gKyBpbkltZ1tib3R0b21Sb3dJZHhdICsgaW5JbWdbYm90dG9tUm93SWR4ICsgMV0pIC8gNCk7XG4gICAgICAgICAgICBvdXRJbWdJZHgrKztcbiAgICAgICAgICAgIHRvcFJvd0lkeCA9IHRvcFJvd0lkeCArIDI7XG4gICAgICAgICAgICBib3R0b21Sb3dJZHggPSBib3R0b21Sb3dJZHggKyAyO1xuICAgICAgICB9XG4gICAgICAgIHRvcFJvd0lkeCA9IHRvcFJvd0lkeCArIGluV2lkdGg7XG4gICAgICAgIGJvdHRvbVJvd0lkeCA9IGJvdHRvbVJvd0lkeCArIGluV2lkdGg7XG4gICAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGhzdjJyZ2IoaHN2LCByZ2IpIHtcbiAgICB2YXIgaCA9IGhzdlswXSxcbiAgICAgICAgcyA9IGhzdlsxXSxcbiAgICAgICAgdiA9IGhzdlsyXSxcbiAgICAgICAgYyA9IHYgKiBzLFxuICAgICAgICB4ID0gYyAqICgxIC0gTWF0aC5hYnMoKGggLyA2MCkgJSAyIC0gMSkpLFxuICAgICAgICBtID0gdiAtIGMsXG4gICAgICAgIHIgPSAwLFxuICAgICAgICBnID0gMCxcbiAgICAgICAgYiA9IDA7XG5cbiAgICByZ2IgPSByZ2IgfHwgWzAsIDAsIDBdO1xuXG4gICAgaWYgKGggPCA2MCkge1xuICAgICAgICByID0gYztcbiAgICAgICAgZyA9IHg7XG4gICAgfSBlbHNlIGlmIChoIDwgMTIwKSB7XG4gICAgICAgIHIgPSB4O1xuICAgICAgICBnID0gYztcbiAgICB9IGVsc2UgaWYgKGggPCAxODApIHtcbiAgICAgICAgZyA9IGM7XG4gICAgICAgIGIgPSB4O1xuICAgIH0gZWxzZSBpZiAoaCA8IDI0MCkge1xuICAgICAgICBnID0geDtcbiAgICAgICAgYiA9IGM7XG4gICAgfSBlbHNlIGlmIChoIDwgMzAwKSB7XG4gICAgICAgIHIgPSB4O1xuICAgICAgICBiID0gYztcbiAgICB9IGVsc2UgaWYgKGggPCAzNjApIHtcbiAgICAgICAgciA9IGM7XG4gICAgICAgIGIgPSB4O1xuICAgIH1cbiAgICByZ2JbMF0gPSAoKHIgKyBtKSAqIDI1NSkgfCAwO1xuICAgIHJnYlsxXSA9ICgoZyArIG0pICogMjU1KSB8IDA7XG4gICAgcmdiWzJdID0gKChiICsgbSkgKiAyNTUpIHwgMDtcbiAgICByZXR1cm4gcmdiO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9jb21wdXRlRGl2aXNvcnMobikge1xuICAgIHZhciBsYXJnZURpdmlzb3JzID0gW10sXG4gICAgICAgIGRpdmlzb3JzID0gW10sXG4gICAgICAgIGk7XG5cbiAgICBmb3IgKGkgPSAxOyBpIDwgTWF0aC5zcXJ0KG4pICsgMTsgaSsrKSB7XG4gICAgICAgIGlmIChuICUgaSA9PT0gMCkge1xuICAgICAgICAgICAgZGl2aXNvcnMucHVzaChpKTtcbiAgICAgICAgICAgIGlmIChpICE9PSBuIC8gaSkge1xuICAgICAgICAgICAgICAgIGxhcmdlRGl2aXNvcnMudW5zaGlmdChNYXRoLmZsb29yKG4gLyBpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRpdmlzb3JzLmNvbmNhdChsYXJnZURpdmlzb3JzKTtcbn07XG5cbmZ1bmN0aW9uIF9jb21wdXRlSW50ZXJzZWN0aW9uKGFycjEsIGFycjIpIHtcbiAgICB2YXIgaSA9IDAsXG4gICAgICAgIGogPSAwLFxuICAgICAgICByZXN1bHQgPSBbXTtcblxuICAgIHdoaWxlIChpIDwgYXJyMS5sZW5ndGggJiYgaiA8IGFycjIubGVuZ3RoKSB7XG4gICAgICAgIGlmIChhcnIxW2ldID09PSBhcnIyW2pdKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChhcnIxW2ldKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGorKztcbiAgICAgICAgfSBlbHNlIGlmIChhcnIxW2ldID4gYXJyMltqXSkge1xuICAgICAgICAgICAgaisrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlUGF0Y2hTaXplKHBhdGNoU2l6ZSwgaW1nU2l6ZSkge1xuICAgIHZhciBkaXZpc29yc1ggPSBfY29tcHV0ZURpdmlzb3JzKGltZ1NpemUueCksXG4gICAgICAgIGRpdmlzb3JzWSA9IF9jb21wdXRlRGl2aXNvcnMoaW1nU2l6ZS55KSxcbiAgICAgICAgd2lkZVNpZGUgPSBNYXRoLm1heChpbWdTaXplLngsIGltZ1NpemUueSksXG4gICAgICAgIGNvbW1vbiA9IF9jb21wdXRlSW50ZXJzZWN0aW9uKGRpdmlzb3JzWCwgZGl2aXNvcnNZKSxcbiAgICAgICAgbnJPZlBhdGNoZXNMaXN0ID0gWzgsIDEwLCAxNSwgMjAsIDMyLCA2MCwgODBdLFxuICAgICAgICBuck9mUGF0Y2hlc01hcCA9IHtcbiAgICAgICAgICAgIFwieC1zbWFsbFwiOiA1LFxuICAgICAgICAgICAgXCJzbWFsbFwiOiA0LFxuICAgICAgICAgICAgXCJtZWRpdW1cIjogMyxcbiAgICAgICAgICAgIFwibGFyZ2VcIjogMixcbiAgICAgICAgICAgIFwieC1sYXJnZVwiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIG5yT2ZQYXRjaGVzSWR4ID0gbnJPZlBhdGNoZXNNYXBbcGF0Y2hTaXplXSB8fCBuck9mUGF0Y2hlc01hcC5tZWRpdW0sXG4gICAgICAgIG5yT2ZQYXRjaGVzID0gbnJPZlBhdGNoZXNMaXN0W25yT2ZQYXRjaGVzSWR4XSxcbiAgICAgICAgZGVzaXJlZFBhdGNoU2l6ZSA9IE1hdGguZmxvb3Iod2lkZVNpZGUgLyBuck9mUGF0Y2hlcyksXG4gICAgICAgIG9wdGltYWxQYXRjaFNpemU7XG5cbiAgICBmdW5jdGlvbiBmaW5kUGF0Y2hTaXplRm9yRGl2aXNvcnMoZGl2aXNvcnMpIHtcbiAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgICAgZm91bmQgPSBkaXZpc29yc1tNYXRoLmZsb29yKGRpdmlzb3JzLmxlbmd0aCAvIDIpXTtcblxuICAgICAgICB3aGlsZSAoaSA8IChkaXZpc29ycy5sZW5ndGggLSAxKSAmJiBkaXZpc29yc1tpXSA8IGRlc2lyZWRQYXRjaFNpemUpIHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhkaXZpc29yc1tpXSAtIGRlc2lyZWRQYXRjaFNpemUpID4gTWF0aC5hYnMoZGl2aXNvcnNbaSAtIDFdIC0gZGVzaXJlZFBhdGNoU2l6ZSkpIHtcbiAgICAgICAgICAgICAgICBmb3VuZCA9IGRpdmlzb3JzW2kgLSAxXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm91bmQgPSBkaXZpc29yc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVzaXJlZFBhdGNoU2l6ZSAvIGZvdW5kIDwgbnJPZlBhdGNoZXNMaXN0W25yT2ZQYXRjaGVzSWR4ICsgMV0gLyBuck9mUGF0Y2hlc0xpc3RbbnJPZlBhdGNoZXNJZHhdICYmXG4gICAgICAgICAgICBkZXNpcmVkUGF0Y2hTaXplIC8gZm91bmQgPiBuck9mUGF0Y2hlc0xpc3RbbnJPZlBhdGNoZXNJZHggLSAxXSAvIG5yT2ZQYXRjaGVzTGlzdFtuck9mUGF0Y2hlc0lkeF0gKSB7XG4gICAgICAgICAgICByZXR1cm4ge3g6IGZvdW5kLCB5OiBmb3VuZH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgb3B0aW1hbFBhdGNoU2l6ZSA9IGZpbmRQYXRjaFNpemVGb3JEaXZpc29ycyhjb21tb24pO1xuICAgIGlmICghb3B0aW1hbFBhdGNoU2l6ZSkge1xuICAgICAgICBvcHRpbWFsUGF0Y2hTaXplID0gZmluZFBhdGNoU2l6ZUZvckRpdmlzb3JzKF9jb21wdXRlRGl2aXNvcnMod2lkZVNpZGUpKTtcbiAgICAgICAgaWYgKCFvcHRpbWFsUGF0Y2hTaXplKSB7XG4gICAgICAgICAgICBvcHRpbWFsUGF0Y2hTaXplID0gZmluZFBhdGNoU2l6ZUZvckRpdmlzb3JzKChfY29tcHV0ZURpdmlzb3JzKGRlc2lyZWRQYXRjaFNpemUgKiBuck9mUGF0Y2hlcykpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3B0aW1hbFBhdGNoU2l6ZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfcGFyc2VDU1NEaW1lbnNpb25WYWx1ZXModmFsdWUpIHtcbiAgICB2YXIgZGltZW5zaW9uID0ge1xuICAgICAgICB2YWx1ZTogcGFyc2VGbG9hdCh2YWx1ZSksXG4gICAgICAgIHVuaXQ6IHZhbHVlLmluZGV4T2YoXCIlXCIpID09PSB2YWx1ZS5sZW5ndGggLSAxID8gXCIlXCIgOiBcIiVcIlxuICAgIH07XG5cbiAgICByZXR1cm4gZGltZW5zaW9uO1xufTtcblxuZXhwb3J0IGNvbnN0IF9kaW1lbnNpb25zQ29udmVydGVycyA9IHtcbiAgICB0b3A6IGZ1bmN0aW9uKGRpbWVuc2lvbiwgY29udGV4dCkge1xuICAgICAgICBpZiAoZGltZW5zaW9uLnVuaXQgPT09IFwiJVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihjb250ZXh0LmhlaWdodCAqIChkaW1lbnNpb24udmFsdWUgLyAxMDApKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmlnaHQ6IGZ1bmN0aW9uKGRpbWVuc2lvbiwgY29udGV4dCkge1xuICAgICAgICBpZiAoZGltZW5zaW9uLnVuaXQgPT09IFwiJVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihjb250ZXh0LndpZHRoIC0gKGNvbnRleHQud2lkdGggKiAoZGltZW5zaW9uLnZhbHVlIC8gMTAwKSkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBib3R0b206IGZ1bmN0aW9uKGRpbWVuc2lvbiwgY29udGV4dCkge1xuICAgICAgICBpZiAoZGltZW5zaW9uLnVuaXQgPT09IFwiJVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihjb250ZXh0LmhlaWdodCAtIChjb250ZXh0LmhlaWdodCAqIChkaW1lbnNpb24udmFsdWUgLyAxMDApKSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGxlZnQ6IGZ1bmN0aW9uKGRpbWVuc2lvbiwgY29udGV4dCkge1xuICAgICAgICBpZiAoZGltZW5zaW9uLnVuaXQgPT09IFwiJVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihjb250ZXh0LndpZHRoICogKGRpbWVuc2lvbi52YWx1ZSAvIDEwMCkpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVJbWFnZUFyZWEoaW5wdXRXaWR0aCwgaW5wdXRIZWlnaHQsIGFyZWEpIHtcbiAgICB2YXIgY29udGV4dCA9IHt3aWR0aDogaW5wdXRXaWR0aCwgaGVpZ2h0OiBpbnB1dEhlaWdodH07XG5cbiAgICB2YXIgcGFyc2VkQXJlYSA9IE9iamVjdC5rZXlzKGFyZWEpLnJlZHVjZShmdW5jdGlvbihyZXN1bHQsIGtleSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBhcmVhW2tleV0sXG4gICAgICAgICAgICBwYXJzZWQgPSBfcGFyc2VDU1NEaW1lbnNpb25WYWx1ZXModmFsdWUpLFxuICAgICAgICAgICAgY2FsY3VsYXRlZCA9IF9kaW1lbnNpb25zQ29udmVydGVyc1trZXldKHBhcnNlZCwgY29udGV4dCk7XG5cbiAgICAgICAgcmVzdWx0W2tleV0gPSBjYWxjdWxhdGVkO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIHt9KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHN4OiBwYXJzZWRBcmVhLmxlZnQsXG4gICAgICAgIHN5OiBwYXJzZWRBcmVhLnRvcCxcbiAgICAgICAgc3c6IHBhcnNlZEFyZWEucmlnaHQgLSBwYXJzZWRBcmVhLmxlZnQsXG4gICAgICAgIHNoOiBwYXJzZWRBcmVhLmJvdHRvbSAtIHBhcnNlZEFyZWEudG9wXG4gICAgfTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uL2N2X3V0aWxzLmpzIiwiaW1wb3J0IFN1YkltYWdlIGZyb20gJy4vc3ViSW1hZ2UnO1xuaW1wb3J0IHtoc3YycmdifSBmcm9tICcuLi9jb21tb24vY3ZfdXRpbHMnO1xuaW1wb3J0IEFycmF5SGVscGVyIGZyb20gJy4uL2NvbW1vbi9hcnJheV9oZWxwZXInO1xuY29uc3QgdmVjMiA9IHtcbiAgICBjbG9uZTogcmVxdWlyZSgnZ2wtdmVjMi9jbG9uZScpLFxufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgYmFzaWMgaW1hZ2UgY29tYmluaW5nIHRoZSBkYXRhIGFuZCBzaXplLlxuICogSW4gYWRkaXRpb24sIHNvbWUgbWV0aG9kcyBmb3IgbWFuaXB1bGF0aW9uIGFyZSBjb250YWluZWQuXG4gKiBAcGFyYW0gc2l6ZSB7eCx5fSBUaGUgc2l6ZSBvZiB0aGUgaW1hZ2UgaW4gcGl4ZWxcbiAqIEBwYXJhbSBkYXRhIHtBcnJheX0gSWYgZ2l2ZW4sIGEgZmxhdCBhcnJheSBjb250YWluaW5nIHRoZSBwaXhlbCBkYXRhXG4gKiBAcGFyYW0gQXJyYXlUeXBlIHtUeXBlfSBJZiBnaXZlbiwgdGhlIGRlc2lyZWQgRGF0YVR5cGUgb2YgdGhlIEFycmF5IChtYXkgYmUgdHlwZWQvbm9uLXR5cGVkKVxuICogQHBhcmFtIGluaXRpYWxpemUge0Jvb2xlYW59IEluZGljYXRpbmcgaWYgdGhlIGFycmF5IHNob3VsZCBiZSBpbml0aWFsaXplZCBvbiBjcmVhdGlvbi5cbiAqIEByZXR1cm5zIHtJbWFnZVdyYXBwZXJ9XG4gKi9cbmZ1bmN0aW9uIEltYWdlV3JhcHBlcihzaXplLCBkYXRhLCBBcnJheVR5cGUsIGluaXRpYWxpemUpIHtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgaWYgKEFycmF5VHlwZSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gbmV3IEFycmF5VHlwZShzaXplLnggKiBzaXplLnkpO1xuICAgICAgICAgICAgaWYgKEFycmF5VHlwZSA9PT0gQXJyYXkgJiYgaW5pdGlhbGl6ZSkge1xuICAgICAgICAgICAgICAgIEFycmF5SGVscGVyLmluaXQodGhpcy5kYXRhLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IG5ldyBVaW50OEFycmF5KHNpemUueCAqIHNpemUueSk7XG4gICAgICAgICAgICBpZiAoVWludDhBcnJheSA9PT0gQXJyYXkgJiYgaW5pdGlhbGl6ZSkge1xuICAgICAgICAgICAgICAgIEFycmF5SGVscGVyLmluaXQodGhpcy5kYXRhLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgfVxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG59XG5cbi8qKlxuICogdGVzdHMgaWYgYSBwb3NpdGlvbiBpcyB3aXRoaW4gdGhlIGltYWdlIHdpdGggYSBnaXZlbiBvZmZzZXRcbiAqIEBwYXJhbSBpbWdSZWYge3gsIHl9IFRoZSBsb2NhdGlvbiB0byB0ZXN0XG4gKiBAcGFyYW0gYm9yZGVyIE51bWJlciB0aGUgcGFkZGluZyB2YWx1ZSBpbiBwaXhlbFxuICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgbG9jYXRpb24gaW5zaWRlIHRoZSBpbWFnZSdzIGJvcmRlciwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAc2VlIGN2ZC9pbWFnZS5oXG4gKi9cbkltYWdlV3JhcHBlci5wcm90b3R5cGUuaW5JbWFnZVdpdGhCb3JkZXIgPSBmdW5jdGlvbihpbWdSZWYsIGJvcmRlcikge1xuICAgIHJldHVybiAoaW1nUmVmLnggPj0gYm9yZGVyKVxuICAgICAgICAmJiAoaW1nUmVmLnkgPj0gYm9yZGVyKVxuICAgICAgICAmJiAoaW1nUmVmLnggPCAodGhpcy5zaXplLnggLSBib3JkZXIpKVxuICAgICAgICAmJiAoaW1nUmVmLnkgPCAodGhpcy5zaXplLnkgLSBib3JkZXIpKTtcbn07XG5cbi8qKlxuICogUGVyZm9ybXMgYmlsaW5lYXIgc2FtcGxpbmdcbiAqIEBwYXJhbSBpbkltZyBJbWFnZSB0byBleHRyYWN0IHNhbXBsZSBmcm9tXG4gKiBAcGFyYW0geCB0aGUgeC1jb29yZGluYXRlXG4gKiBAcGFyYW0geSB0aGUgeS1jb29yZGluYXRlXG4gKiBAcmV0dXJucyB0aGUgc2FtcGxlZCB2YWx1ZVxuICogQHNlZSBjdmQvdmlzaW9uLmhcbiAqL1xuSW1hZ2VXcmFwcGVyLnNhbXBsZSA9IGZ1bmN0aW9uKGluSW1nLCB4LCB5KSB7XG4gICAgdmFyIGx4ID0gTWF0aC5mbG9vcih4KTtcbiAgICB2YXIgbHkgPSBNYXRoLmZsb29yKHkpO1xuICAgIHZhciB3ID0gaW5JbWcuc2l6ZS54O1xuICAgIHZhciBiYXNlID0gbHkgKiBpbkltZy5zaXplLnggKyBseDtcbiAgICB2YXIgYSA9IGluSW1nLmRhdGFbYmFzZSArIDBdO1xuICAgIHZhciBiID0gaW5JbWcuZGF0YVtiYXNlICsgMV07XG4gICAgdmFyIGMgPSBpbkltZy5kYXRhW2Jhc2UgKyB3XTtcbiAgICB2YXIgZCA9IGluSW1nLmRhdGFbYmFzZSArIHcgKyAxXTtcbiAgICB2YXIgZSA9IGEgLSBiO1xuICAgIHggLT0gbHg7XG4gICAgeSAtPSBseTtcblxuICAgIHZhciByZXN1bHQgPSBNYXRoLmZsb29yKHggKiAoeSAqIChlIC0gYyArIGQpIC0gZSkgKyB5ICogKGMgLSBhKSArIGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGEgZ2l2ZW4gYXJyYXkuIFNldHMgZWFjaCBlbGVtZW50IHRvIHplcm8uXG4gKiBAcGFyYW0gYXJyYXkge0FycmF5fSBUaGUgYXJyYXkgdG8gaW5pdGlhbGl6ZVxuICovXG5JbWFnZVdyYXBwZXIuY2xlYXJBcnJheSA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgdmFyIGwgPSBhcnJheS5sZW5ndGg7XG4gICAgd2hpbGUgKGwtLSkge1xuICAgICAgICBhcnJheVtsXSA9IDA7XG4gICAgfVxufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEge1N1YkltYWdlfSBmcm9tIHRoZSBjdXJyZW50IGltYWdlICh7dGhpc30pLlxuICogQHBhcmFtIGZyb20ge0ltYWdlUmVmfSBUaGUgcG9zaXRpb24gd2hlcmUgdG8gc3RhcnQgdGhlIHtTdWJJbWFnZX0gZnJvbS4gKHRvcC1sZWZ0IGNvcm5lcilcbiAqIEBwYXJhbSBzaXplIHtJbWFnZVJlZn0gVGhlIHNpemUgb2YgdGhlIHJlc3VsdGluZyBpbWFnZVxuICogQHJldHVybnMge1N1YkltYWdlfSBBIHNoYXJlZCBwYXJ0IG9mIHRoZSBvcmlnaW5hbCBpbWFnZVxuICovXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLnN1YkltYWdlID0gZnVuY3Rpb24oZnJvbSwgc2l6ZSkge1xuICAgIHJldHVybiBuZXcgU3ViSW1hZ2UoZnJvbSwgc2l6ZSwgdGhpcyk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4ge0ltYWdlV3JhcHBlcikgYW5kIGNvcGllcyB0aGUgbmVlZGVkIHVuZGVybHlpbmcgaW1hZ2UtZGF0YSBhcmVhXG4gKiBAcGFyYW0gaW1hZ2VXcmFwcGVyIHtJbWFnZVdyYXBwZXJ9IFRoZSB0YXJnZXQge0ltYWdlV3JhcHBlcn0gd2hlcmUgdGhlIGRhdGEgc2hvdWxkIGJlIGNvcGllZFxuICogQHBhcmFtIGZyb20ge0ltYWdlUmVmfSBUaGUgbG9jYXRpb24gd2hlcmUgdG8gY29weSBmcm9tICh0b3AtbGVmdCBsb2NhdGlvbilcbiAqL1xuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5zdWJJbWFnZUFzQ29weSA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgZnJvbSkge1xuICAgIHZhciBzaXplWSA9IGltYWdlV3JhcHBlci5zaXplLnksIHNpemVYID0gaW1hZ2VXcmFwcGVyLnNpemUueDtcbiAgICB2YXIgeCwgeTtcbiAgICBmb3IgKCB4ID0gMDsgeCA8IHNpemVYOyB4KyspIHtcbiAgICAgICAgZm9yICggeSA9IDA7IHkgPCBzaXplWTsgeSsrKSB7XG4gICAgICAgICAgICBpbWFnZVdyYXBwZXIuZGF0YVt5ICogc2l6ZVggKyB4XSA9IHRoaXMuZGF0YVsoZnJvbS55ICsgeSkgKiB0aGlzLnNpemUueCArIGZyb20ueCArIHhdO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5jb3B5VG8gPSBmdW5jdGlvbihpbWFnZVdyYXBwZXIpIHtcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5kYXRhLmxlbmd0aCwgc3JjRGF0YSA9IHRoaXMuZGF0YSwgZHN0RGF0YSA9IGltYWdlV3JhcHBlci5kYXRhO1xuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIGRzdERhdGFbbGVuZ3RoXSA9IHNyY0RhdGFbbGVuZ3RoXTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFJldHJpZXZlcyBhIGdpdmVuIHBpeGVsIHBvc2l0aW9uIGZyb20gdGhlIGltYWdlXG4gKiBAcGFyYW0geCB7TnVtYmVyfSBUaGUgeC1wb3NpdGlvblxuICogQHBhcmFtIHkge051bWJlcn0gVGhlIHktcG9zaXRpb25cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBncmF5c2NhbGUgdmFsdWUgYXQgdGhlIHBpeGVsLXBvc2l0aW9uXG4gKi9cbkltYWdlV3JhcHBlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIHJldHVybiB0aGlzLmRhdGFbeSAqIHRoaXMuc2l6ZS54ICsgeF07XG59O1xuXG4vKipcbiAqIFJldHJpZXZlcyBhIGdpdmVuIHBpeGVsIHBvc2l0aW9uIGZyb20gdGhlIGltYWdlXG4gKiBAcGFyYW0geCB7TnVtYmVyfSBUaGUgeC1wb3NpdGlvblxuICogQHBhcmFtIHkge051bWJlcn0gVGhlIHktcG9zaXRpb25cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBncmF5c2NhbGUgdmFsdWUgYXQgdGhlIHBpeGVsLXBvc2l0aW9uXG4gKi9cbkltYWdlV3JhcHBlci5wcm90b3R5cGUuZ2V0U2FmZSA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICB2YXIgaTtcblxuICAgIGlmICghdGhpcy5pbmRleE1hcHBpbmcpIHtcbiAgICAgICAgdGhpcy5pbmRleE1hcHBpbmcgPSB7XG4gICAgICAgICAgICB4OiBbXSxcbiAgICAgICAgICAgIHk6IFtdXG4gICAgICAgIH07XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnNpemUueDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmluZGV4TWFwcGluZy54W2ldID0gaTtcbiAgICAgICAgICAgIHRoaXMuaW5kZXhNYXBwaW5nLnhbaSArIHRoaXMuc2l6ZS54XSA9IGk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuc2l6ZS55OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuaW5kZXhNYXBwaW5nLnlbaV0gPSBpO1xuICAgICAgICAgICAgdGhpcy5pbmRleE1hcHBpbmcueVtpICsgdGhpcy5zaXplLnldID0gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kYXRhWyh0aGlzLmluZGV4TWFwcGluZy55W3kgKyB0aGlzLnNpemUueV0pICogdGhpcy5zaXplLnggKyB0aGlzLmluZGV4TWFwcGluZy54W3ggKyB0aGlzLnNpemUueF1dO1xufTtcblxuLyoqXG4gKiBTZXRzIGEgZ2l2ZW4gcGl4ZWwgcG9zaXRpb24gaW4gdGhlIGltYWdlXG4gKiBAcGFyYW0geCB7TnVtYmVyfSBUaGUgeC1wb3NpdGlvblxuICogQHBhcmFtIHkge051bWJlcn0gVGhlIHktcG9zaXRpb25cbiAqIEBwYXJhbSB2YWx1ZSB7TnVtYmVyfSBUaGUgZ3JheXNjYWxlIHZhbHVlIHRvIHNldFxuICogQHJldHVybnMge0ltYWdlV3JhcHBlcn0gVGhlIEltYWdlIGl0c2VsZiAoZm9yIHBvc3NpYmxlIGNoYWluaW5nKVxuICovXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKHgsIHksIHZhbHVlKSB7XG4gICAgdGhpcy5kYXRhW3kgKiB0aGlzLnNpemUueCArIHhdID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGJvcmRlciBvZiB0aGUgaW1hZ2UgKDEgcGl4ZWwpIHRvIHplcm9cbiAqL1xuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS56ZXJvQm9yZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGksIHdpZHRoID0gdGhpcy5zaXplLngsIGhlaWdodCA9IHRoaXMuc2l6ZS55LCBkYXRhID0gdGhpcy5kYXRhO1xuICAgIGZvciAoIGkgPSAwOyBpIDwgd2lkdGg7IGkrKykge1xuICAgICAgICBkYXRhW2ldID0gZGF0YVsoaGVpZ2h0IC0gMSkgKiB3aWR0aCArIGldID0gMDtcbiAgICB9XG4gICAgZm9yICggaSA9IDE7IGkgPCBoZWlnaHQgLSAxOyBpKyspIHtcbiAgICAgICAgZGF0YVtpICogd2lkdGhdID0gZGF0YVtpICogd2lkdGggKyAod2lkdGggLSAxKV0gPSAwO1xuICAgIH1cbn07XG5cbi8qKlxuICogSW52ZXJ0cyBhIGJpbmFyeSBpbWFnZSBpbiBwbGFjZVxuICovXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLmludmVydCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXRhID0gdGhpcy5kYXRhLCBsZW5ndGggPSBkYXRhLmxlbmd0aDtcblxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICBkYXRhW2xlbmd0aF0gPSBkYXRhW2xlbmd0aF0gPyAwIDogMTtcbiAgICB9XG59O1xuXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLmNvbnZvbHZlID0gZnVuY3Rpb24oa2VybmVsKSB7XG4gICAgdmFyIHgsIHksIGt4LCBreSwga1NpemUgPSAoa2VybmVsLmxlbmd0aCAvIDIpIHwgMCwgYWNjdSA9IDA7XG4gICAgZm9yICggeSA9IDA7IHkgPCB0aGlzLnNpemUueTsgeSsrKSB7XG4gICAgICAgIGZvciAoIHggPSAwOyB4IDwgdGhpcy5zaXplLng7IHgrKykge1xuICAgICAgICAgICAgYWNjdSA9IDA7XG4gICAgICAgICAgICBmb3IgKCBreSA9IC1rU2l6ZTsga3kgPD0ga1NpemU7IGt5KyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKCBreCA9IC1rU2l6ZTsga3ggPD0ga1NpemU7IGt4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjdSArPSBrZXJuZWxba3kgKyBrU2l6ZV1ba3ggKyBrU2l6ZV0gKiB0aGlzLmdldFNhZmUoeCArIGt4LCB5ICsga3kpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGF0YVt5ICogdGhpcy5zaXplLnggKyB4XSA9IGFjY3U7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLm1vbWVudHMgPSBmdW5jdGlvbihsYWJlbGNvdW50KSB7XG4gICAgdmFyIGRhdGEgPSB0aGlzLmRhdGEsXG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIGhlaWdodCA9IHRoaXMuc2l6ZS55LFxuICAgICAgICB3aWR0aCA9IHRoaXMuc2l6ZS54LFxuICAgICAgICB2YWwsXG4gICAgICAgIHlzcSxcbiAgICAgICAgbGFiZWxzdW0gPSBbXSxcbiAgICAgICAgaSxcbiAgICAgICAgbGFiZWwsXG4gICAgICAgIG11MTEsXG4gICAgICAgIG11MDIsXG4gICAgICAgIG11MjAsXG4gICAgICAgIHhfLFxuICAgICAgICB5XyxcbiAgICAgICAgdG1wLFxuICAgICAgICByZXN1bHQgPSBbXSxcbiAgICAgICAgUEkgPSBNYXRoLlBJLFxuICAgICAgICBQSV80ID0gUEkgLyA0O1xuXG4gICAgaWYgKGxhYmVsY291bnQgPD0gMCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGZvciAoIGkgPSAwOyBpIDwgbGFiZWxjb3VudDsgaSsrKSB7XG4gICAgICAgIGxhYmVsc3VtW2ldID0ge1xuICAgICAgICAgICAgbTAwOiAwLFxuICAgICAgICAgICAgbTAxOiAwLFxuICAgICAgICAgICAgbTEwOiAwLFxuICAgICAgICAgICAgbTExOiAwLFxuICAgICAgICAgICAgbTAyOiAwLFxuICAgICAgICAgICAgbTIwOiAwLFxuICAgICAgICAgICAgdGhldGE6IDAsXG4gICAgICAgICAgICByYWQ6IDBcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmb3IgKCB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKSB7XG4gICAgICAgIHlzcSA9IHkgKiB5O1xuICAgICAgICBmb3IgKCB4ID0gMDsgeCA8IHdpZHRoOyB4KyspIHtcbiAgICAgICAgICAgIHZhbCA9IGRhdGFbeSAqIHdpZHRoICsgeF07XG4gICAgICAgICAgICBpZiAodmFsID4gMCkge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gbGFiZWxzdW1bdmFsIC0gMV07XG4gICAgICAgICAgICAgICAgbGFiZWwubTAwICs9IDE7XG4gICAgICAgICAgICAgICAgbGFiZWwubTAxICs9IHk7XG4gICAgICAgICAgICAgICAgbGFiZWwubTEwICs9IHg7XG4gICAgICAgICAgICAgICAgbGFiZWwubTExICs9IHggKiB5O1xuICAgICAgICAgICAgICAgIGxhYmVsLm0wMiArPSB5c3E7XG4gICAgICAgICAgICAgICAgbGFiZWwubTIwICs9IHggKiB4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yICggaSA9IDA7IGkgPCBsYWJlbGNvdW50OyBpKyspIHtcbiAgICAgICAgbGFiZWwgPSBsYWJlbHN1bVtpXTtcbiAgICAgICAgaWYgKCFpc05hTihsYWJlbC5tMDApICYmIGxhYmVsLm0wMCAhPT0gMCkge1xuICAgICAgICAgICAgeF8gPSBsYWJlbC5tMTAgLyBsYWJlbC5tMDA7XG4gICAgICAgICAgICB5XyA9IGxhYmVsLm0wMSAvIGxhYmVsLm0wMDtcbiAgICAgICAgICAgIG11MTEgPSBsYWJlbC5tMTEgLyBsYWJlbC5tMDAgLSB4XyAqIHlfO1xuICAgICAgICAgICAgbXUwMiA9IGxhYmVsLm0wMiAvIGxhYmVsLm0wMCAtIHlfICogeV87XG4gICAgICAgICAgICBtdTIwID0gbGFiZWwubTIwIC8gbGFiZWwubTAwIC0geF8gKiB4XztcbiAgICAgICAgICAgIHRtcCA9IChtdTAyIC0gbXUyMCkgLyAoMiAqIG11MTEpO1xuICAgICAgICAgICAgdG1wID0gMC41ICogTWF0aC5hdGFuKHRtcCkgKyAobXUxMSA+PSAwID8gUElfNCA6IC1QSV80ICkgKyBQSTtcbiAgICAgICAgICAgIGxhYmVsLnRoZXRhID0gKHRtcCAqIDE4MCAvIFBJICsgOTApICUgMTgwIC0gOTA7XG4gICAgICAgICAgICBpZiAobGFiZWwudGhldGEgPCAwKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwudGhldGEgKz0gMTgwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFiZWwucmFkID0gdG1wID4gUEkgPyB0bXAgLSBQSSA6IHRtcDtcbiAgICAgICAgICAgIGxhYmVsLnZlYyA9IHZlYzIuY2xvbmUoW01hdGguY29zKHRtcCksIE1hdGguc2luKHRtcCldKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGxhYmVsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIERpc3BsYXlzIHRoZSB7SW1hZ2VXcmFwcGVyfSBpbiBhIGdpdmVuIGNhbnZhc1xuICogQHBhcmFtIGNhbnZhcyB7Q2FudmFzfSBUaGUgY2FudmFzIGVsZW1lbnQgdG8gd3JpdGUgdG9cbiAqIEBwYXJhbSBzY2FsZSB7TnVtYmVyfSBTY2FsZSB3aGljaCBpcyBhcHBsaWVkIHRvIGVhY2ggcGl4ZWwtdmFsdWVcbiAqL1xuSW1hZ2VXcmFwcGVyLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oY2FudmFzLCBzY2FsZSkge1xuICAgIHZhciBjdHgsXG4gICAgICAgIGZyYW1lLFxuICAgICAgICBkYXRhLFxuICAgICAgICBjdXJyZW50LFxuICAgICAgICBwaXhlbCxcbiAgICAgICAgeCxcbiAgICAgICAgeTtcblxuICAgIGlmICghc2NhbGUpIHtcbiAgICAgICAgc2NhbGUgPSAxLjA7XG4gICAgfVxuICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGNhbnZhcy53aWR0aCA9IHRoaXMuc2l6ZS54O1xuICAgIGNhbnZhcy5oZWlnaHQgPSB0aGlzLnNpemUueTtcbiAgICBmcmFtZSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBkYXRhID0gZnJhbWUuZGF0YTtcbiAgICBjdXJyZW50ID0gMDtcbiAgICBmb3IgKHkgPSAwOyB5IDwgdGhpcy5zaXplLnk7IHkrKykge1xuICAgICAgICBmb3IgKHggPSAwOyB4IDwgdGhpcy5zaXplLng7IHgrKykge1xuICAgICAgICAgICAgcGl4ZWwgPSB5ICogdGhpcy5zaXplLnggKyB4O1xuICAgICAgICAgICAgY3VycmVudCA9IHRoaXMuZ2V0KHgsIHkpICogc2NhbGU7XG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDBdID0gY3VycmVudDtcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMV0gPSBjdXJyZW50O1xuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAyXSA9IGN1cnJlbnQ7XG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDNdID0gMjU1O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vZnJhbWUuZGF0YSA9IGRhdGE7XG4gICAgY3R4LnB1dEltYWdlRGF0YShmcmFtZSwgMCwgMCk7XG59O1xuXG4vKipcbiAqIERpc3BsYXlzIHRoZSB7U3ViSW1hZ2V9IGluIGEgZ2l2ZW4gY2FudmFzXG4gKiBAcGFyYW0gY2FudmFzIHtDYW52YXN9IFRoZSBjYW52YXMgZWxlbWVudCB0byB3cml0ZSB0b1xuICogQHBhcmFtIHNjYWxlIHtOdW1iZXJ9IFNjYWxlIHdoaWNoIGlzIGFwcGxpZWQgdG8gZWFjaCBwaXhlbC12YWx1ZVxuICovXG5JbWFnZVdyYXBwZXIucHJvdG90eXBlLm92ZXJsYXkgPSBmdW5jdGlvbihjYW52YXMsIHNjYWxlLCBmcm9tKSB7XG4gICAgaWYgKCFzY2FsZSB8fCBzY2FsZSA8IDAgfHwgc2NhbGUgPiAzNjApIHtcbiAgICAgICAgc2NhbGUgPSAzNjA7XG4gICAgfVxuICAgIHZhciBoc3YgPSBbMCwgMSwgMV07XG4gICAgdmFyIHJnYiA9IFswLCAwLCAwXTtcbiAgICB2YXIgd2hpdGVSZ2IgPSBbMjU1LCAyNTUsIDI1NV07XG4gICAgdmFyIGJsYWNrUmdiID0gWzAsIDAsIDBdO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdmFyIGZyYW1lID0gY3R4LmdldEltYWdlRGF0YShmcm9tLngsIGZyb20ueSwgdGhpcy5zaXplLngsIHRoaXMuc2l6ZS55KTtcbiAgICB2YXIgZGF0YSA9IGZyYW1lLmRhdGE7XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMuZGF0YS5sZW5ndGg7XG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIGhzdlswXSA9IHRoaXMuZGF0YVtsZW5ndGhdICogc2NhbGU7XG4gICAgICAgIHJlc3VsdCA9IGhzdlswXSA8PSAwID8gd2hpdGVSZ2IgOiBoc3ZbMF0gPj0gMzYwID8gYmxhY2tSZ2IgOiBoc3YycmdiKGhzdiwgcmdiKTtcbiAgICAgICAgZGF0YVtsZW5ndGggKiA0ICsgMF0gPSByZXN1bHRbMF07XG4gICAgICAgIGRhdGFbbGVuZ3RoICogNCArIDFdID0gcmVzdWx0WzFdO1xuICAgICAgICBkYXRhW2xlbmd0aCAqIDQgKyAyXSA9IHJlc3VsdFsyXTtcbiAgICAgICAgZGF0YVtsZW5ndGggKiA0ICsgM10gPSAyNTU7XG4gICAgfVxuICAgIGN0eC5wdXRJbWFnZURhdGEoZnJhbWUsIGZyb20ueCwgZnJvbS55KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEltYWdlV3JhcHBlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24vaW1hZ2Vfd3JhcHBlci5qcyIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2RlZmluZVByb3BlcnR5Jyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGFzc2lnblZhbHVlYCBhbmQgYGFzc2lnbk1lcmdlVmFsdWVgIHdpdGhvdXRcbiAqIHZhbHVlIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgPT0gJ19fcHJvdG9fXycgJiYgZGVmaW5lUHJvcGVydHkpIHtcbiAgICBkZWZpbmVQcm9wZXJ0eShvYmplY3QsIGtleSwge1xuICAgICAgJ2NvbmZpZ3VyYWJsZSc6IHRydWUsXG4gICAgICAnZW51bWVyYWJsZSc6IHRydWUsXG4gICAgICAndmFsdWUnOiB2YWx1ZSxcbiAgICAgICd3cml0YWJsZSc6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUFzc2lnblZhbHVlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fYmFzZUFzc2lnblZhbHVlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYmFzZUlzTmF0aXZlID0gcmVxdWlyZSgnLi9fYmFzZUlzTmF0aXZlJyksXG4gICAgZ2V0VmFsdWUgPSByZXF1aXJlKCcuL19nZXRWYWx1ZScpO1xuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE5hdGl2ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2dldE5hdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pc1N5bWJvbCcpO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcga2V5IGlmIGl0J3Mgbm90IGEgc3RyaW5nIG9yIHN5bWJvbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtzdHJpbmd8c3ltYm9sfSBSZXR1cm5zIHRoZSBrZXkuXG4gKi9cbmZ1bmN0aW9uIHRvS2V5KHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHwgaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b0tleTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX3RvS2V5LmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaXNGdW5jdGlvbicpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5TGlrZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvaXNBcnJheUxpa2UuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXN5bmNUYWcgPSAnW29iamVjdCBBc3luY0Z1bmN0aW9uXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBwcm94eVRhZyA9ICdbb2JqZWN0IFByb3h5XSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheXMgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGJhc2VHZXRUYWcodmFsdWUpO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZyB8fCB0YWcgPT0gYXN5bmNUYWcgfHwgdGFnID09IHByb3h5VGFnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb247XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL2lzRnVuY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0xlbmd0aDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvaXNMZW5ndGguanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N5bWJvbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvaXNTeW1ib2wuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBiYXNlTWVyZ2UgPSByZXF1aXJlKCcuL19iYXNlTWVyZ2UnKSxcbiAgICBjcmVhdGVBc3NpZ25lciA9IHJlcXVpcmUoJy4vX2NyZWF0ZUFzc2lnbmVyJyk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5hc3NpZ25gIGV4Y2VwdCB0aGF0IGl0IHJlY3Vyc2l2ZWx5IG1lcmdlcyBvd24gYW5kXG4gKiBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0cyBpbnRvIHRoZVxuICogZGVzdGluYXRpb24gb2JqZWN0LiBTb3VyY2UgcHJvcGVydGllcyB0aGF0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAgYXJlXG4gKiBza2lwcGVkIGlmIGEgZGVzdGluYXRpb24gdmFsdWUgZXhpc3RzLiBBcnJheSBhbmQgcGxhaW4gb2JqZWN0IHByb3BlcnRpZXNcbiAqIGFyZSBtZXJnZWQgcmVjdXJzaXZlbHkuIE90aGVyIG9iamVjdHMgYW5kIHZhbHVlIHR5cGVzIGFyZSBvdmVycmlkZGVuIGJ5XG4gKiBhc3NpZ25tZW50LiBTb3VyY2Ugb2JqZWN0cyBhcmUgYXBwbGllZCBmcm9tIGxlZnQgdG8gcmlnaHQuIFN1YnNlcXVlbnRcbiAqIHNvdXJjZXMgb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjUuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHsuLi5PYmplY3R9IFtzb3VyY2VzXSBUaGUgc291cmNlIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0ge1xuICogICAnYSc6IFt7ICdiJzogMiB9LCB7ICdkJzogNCB9XVxuICogfTtcbiAqXG4gKiB2YXIgb3RoZXIgPSB7XG4gKiAgICdhJzogW3sgJ2MnOiAzIH0sIHsgJ2UnOiA1IH1dXG4gKiB9O1xuICpcbiAqIF8ubWVyZ2Uob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiB7ICdhJzogW3sgJ2InOiAyLCAnYyc6IDMgfSwgeyAnZCc6IDQsICdlJzogNSB9XSB9XG4gKi9cbnZhciBtZXJnZSA9IGNyZWF0ZUFzc2lnbmVyKGZ1bmN0aW9uKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCkge1xuICBiYXNlTWVyZ2Uob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4KTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1lcmdlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9tZXJnZS5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcclxuXHRpZighbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcclxuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxyXG5cdFx0aWYoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIGh0dHA6Ly93d3cuY29kZXByb2plY3QuY29tL1RpcHMvNDA3MTcyL0Nvbm5lY3RlZC1Db21wb25lbnQtTGFiZWxpbmctYW5kLVZlY3Rvcml6YXRpb25cbiAqL1xudmFyIFRyYWNlciA9IHtcbiAgICBzZWFyY2hEaXJlY3Rpb25zOiBbWzAsIDFdLCBbMSwgMV0sIFsxLCAwXSwgWzEsIC0xXSwgWzAsIC0xXSwgWy0xLCAtMV0sIFstMSwgMF0sIFstMSwgMV1dLFxuICAgIGNyZWF0ZTogZnVuY3Rpb24oaW1hZ2VXcmFwcGVyLCBsYWJlbFdyYXBwZXIpIHtcbiAgICAgICAgdmFyIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhLFxuICAgICAgICAgICAgbGFiZWxEYXRhID0gbGFiZWxXcmFwcGVyLmRhdGEsXG4gICAgICAgICAgICBzZWFyY2hEaXJlY3Rpb25zID0gdGhpcy5zZWFyY2hEaXJlY3Rpb25zLFxuICAgICAgICAgICAgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54LFxuICAgICAgICAgICAgcG9zO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRyYWNlKGN1cnJlbnQsIGNvbG9yLCBsYWJlbCwgZWRnZWxhYmVsKSB7XG4gICAgICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgICAgICB5LFxuICAgICAgICAgICAgICAgIHg7XG5cbiAgICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgeSA9IGN1cnJlbnQuY3kgKyBzZWFyY2hEaXJlY3Rpb25zW2N1cnJlbnQuZGlyXVswXTtcbiAgICAgICAgICAgICAgICB4ID0gY3VycmVudC5jeCArIHNlYXJjaERpcmVjdGlvbnNbY3VycmVudC5kaXJdWzFdO1xuICAgICAgICAgICAgICAgIHBvcyA9IHkgKiB3aWR0aCArIHg7XG4gICAgICAgICAgICAgICAgaWYgKChpbWFnZURhdGFbcG9zXSA9PT0gY29sb3IpICYmICgobGFiZWxEYXRhW3Bvc10gPT09IDApIHx8IChsYWJlbERhdGFbcG9zXSA9PT0gbGFiZWwpKSkge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbERhdGFbcG9zXSA9IGxhYmVsO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50LmN5ID0geTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudC5jeCA9IHg7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbERhdGFbcG9zXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxEYXRhW3Bvc10gPSBlZGdlbGFiZWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY3VycmVudC5kaXIgPSAoY3VycmVudC5kaXIgKyAxKSAlIDg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdmVydGV4MkQoeCwgeSwgZGlyKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGRpcjogZGlyLFxuICAgICAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgICAgICBuZXh0OiBudWxsLFxuICAgICAgICAgICAgICAgIHByZXY6IG51bGxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjb250b3VyVHJhY2luZyhzeSwgc3gsIGxhYmVsLCBjb2xvciwgZWRnZWxhYmVsKSB7XG4gICAgICAgICAgICB2YXIgRnYgPSBudWxsLFxuICAgICAgICAgICAgICAgIEN2LFxuICAgICAgICAgICAgICAgIFAsXG4gICAgICAgICAgICAgICAgbGRpcixcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICBjeDogc3gsXG4gICAgICAgICAgICAgICAgICAgIGN5OiBzeSxcbiAgICAgICAgICAgICAgICAgICAgZGlyOiAwXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHRyYWNlKGN1cnJlbnQsIGNvbG9yLCBsYWJlbCwgZWRnZWxhYmVsKSkge1xuICAgICAgICAgICAgICAgIEZ2ID0gdmVydGV4MkQoc3gsIHN5LCBjdXJyZW50LmRpcik7XG4gICAgICAgICAgICAgICAgQ3YgPSBGdjtcbiAgICAgICAgICAgICAgICBsZGlyID0gY3VycmVudC5kaXI7XG4gICAgICAgICAgICAgICAgUCA9IHZlcnRleDJEKGN1cnJlbnQuY3gsIGN1cnJlbnQuY3ksIDApO1xuICAgICAgICAgICAgICAgIFAucHJldiA9IEN2O1xuICAgICAgICAgICAgICAgIEN2Lm5leHQgPSBQO1xuICAgICAgICAgICAgICAgIFAubmV4dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgQ3YgPSBQO1xuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudC5kaXIgPSAoY3VycmVudC5kaXIgKyA2KSAlIDg7XG4gICAgICAgICAgICAgICAgICAgIHRyYWNlKGN1cnJlbnQsIGNvbG9yLCBsYWJlbCwgZWRnZWxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxkaXIgIT09IGN1cnJlbnQuZGlyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBDdi5kaXIgPSBjdXJyZW50LmRpcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIFAgPSB2ZXJ0ZXgyRChjdXJyZW50LmN4LCBjdXJyZW50LmN5LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFAucHJldiA9IEN2O1xuICAgICAgICAgICAgICAgICAgICAgICAgQ3YubmV4dCA9IFA7XG4gICAgICAgICAgICAgICAgICAgICAgICBQLm5leHQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgQ3YgPSBQO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgQ3YuZGlyID0gbGRpcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIEN2LnggPSBjdXJyZW50LmN4O1xuICAgICAgICAgICAgICAgICAgICAgICAgQ3YueSA9IGN1cnJlbnQuY3k7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGRpciA9IGN1cnJlbnQuZGlyO1xuICAgICAgICAgICAgICAgIH0gd2hpbGUgKGN1cnJlbnQuY3ggIT09IHN4IHx8IGN1cnJlbnQuY3kgIT09IHN5KTtcbiAgICAgICAgICAgICAgICBGdi5wcmV2ID0gQ3YucHJldjtcbiAgICAgICAgICAgICAgICBDdi5wcmV2Lm5leHQgPSBGdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBGdjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0cmFjZTogZnVuY3Rpb24oY3VycmVudCwgY29sb3IsIGxhYmVsLCBlZGdlbGFiZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhY2UoY3VycmVudCwgY29sb3IsIGxhYmVsLCBlZGdlbGFiZWwpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRvdXJUcmFjaW5nOiBmdW5jdGlvbihzeSwgc3gsIGxhYmVsLCBjb2xvciwgZWRnZWxhYmVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRvdXJUcmFjaW5nKHN5LCBzeCwgbGFiZWwsIGNvbG9yLCBlZGdlbGFiZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IChUcmFjZXIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xvY2F0b3IvdHJhY2VyLmpzIiwiaW1wb3J0IEJhcmNvZGVSZWFkZXIgZnJvbSAnLi9iYXJjb2RlX3JlYWRlcic7XG5pbXBvcnQgQXJyYXlIZWxwZXIgZnJvbSAnLi4vY29tbW9uL2FycmF5X2hlbHBlcic7XG5cbmZ1bmN0aW9uIENvZGUzOVJlYWRlcigpIHtcbiAgICBCYXJjb2RlUmVhZGVyLmNhbGwodGhpcyk7XG59XG5cbnZhciBwcm9wZXJ0aWVzID0ge1xuICAgIEFMUEhBQkVUSF9TVFJJTkc6IHt2YWx1ZTogXCIwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVotLiAqJC8rJVwifSxcbiAgICBBTFBIQUJFVDoge3ZhbHVlOiBbNDgsIDQ5LCA1MCwgNTEsIDUyLCA1MywgNTQsIDU1LCA1NiwgNTcsIDY1LCA2NiwgNjcsIDY4LCA2OSwgNzAsIDcxLCA3MiwgNzMsIDc0LCA3NSwgNzYsIDc3LCA3OCxcbiAgICAgICAgNzksIDgwLCA4MSwgODIsIDgzLCA4NCwgODUsIDg2LCA4NywgODgsIDg5LCA5MCwgNDUsIDQ2LCAzMiwgNDIsIDM2LCA0NywgNDMsIDM3XX0sXG4gICAgQ0hBUkFDVEVSX0VOQ09ESU5HUzoge3ZhbHVlOiBbMHgwMzQsIDB4MTIxLCAweDA2MSwgMHgxNjAsIDB4MDMxLCAweDEzMCwgMHgwNzAsIDB4MDI1LCAweDEyNCwgMHgwNjQsIDB4MTA5LCAweDA0OSxcbiAgICAgICAgMHgxNDgsIDB4MDE5LCAweDExOCwgMHgwNTgsIDB4MDBELCAweDEwQywgMHgwNEMsIDB4MDFDLCAweDEwMywgMHgwNDMsIDB4MTQyLCAweDAxMywgMHgxMTIsIDB4MDUyLCAweDAwNywgMHgxMDYsXG4gICAgICAgIDB4MDQ2LCAweDAxNiwgMHgxODEsIDB4MEMxLCAweDFDMCwgMHgwOTEsIDB4MTkwLCAweDBEMCwgMHgwODUsIDB4MTg0LCAweDBDNCwgMHgwOTQsIDB4MEE4LCAweDBBMiwgMHgwOEEsIDB4MDJBXG4gICAgXX0sXG4gICAgQVNURVJJU0s6IHt2YWx1ZTogMHgwOTR9LFxuICAgIEZPUk1BVDoge3ZhbHVlOiBcImNvZGVfMzlcIiwgd3JpdGVhYmxlOiBmYWxzZX1cbn07XG5cbkNvZGUzOVJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb2RlMzlSZWFkZXI7XG5cbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX3RvQ291bnRlcnMgPSBmdW5jdGlvbihzdGFydCwgY291bnRlcikge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgbnVtQ291bnRlcnMgPSBjb3VudGVyLmxlbmd0aCxcbiAgICAgICAgZW5kID0gc2VsZi5fcm93Lmxlbmd0aCxcbiAgICAgICAgaXNXaGl0ZSA9ICFzZWxmLl9yb3dbc3RhcnRdLFxuICAgICAgICBpLFxuICAgICAgICBjb3VudGVyUG9zID0gMDtcblxuICAgIEFycmF5SGVscGVyLmluaXQoY291bnRlciwgMCk7XG5cbiAgICBmb3IgKCBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY291bnRlclBvcysrO1xuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IG51bUNvdW50ZXJzKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xuICAgICAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb3VudGVyO1xufTtcblxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBjb3VudGVycyA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgIHN0YXJ0ID0gc2VsZi5fZmluZFN0YXJ0KCksXG4gICAgICAgIGRlY29kZWRDaGFyLFxuICAgICAgICBsYXN0U3RhcnQsXG4gICAgICAgIHBhdHRlcm4sXG4gICAgICAgIG5leHRTdGFydDtcblxuICAgIGlmICghc3RhcnQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIG5leHRTdGFydCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93LCBzdGFydC5lbmQpO1xuXG4gICAgZG8ge1xuICAgICAgICBjb3VudGVycyA9IHNlbGYuX3RvQ291bnRlcnMobmV4dFN0YXJ0LCBjb3VudGVycyk7XG4gICAgICAgIHBhdHRlcm4gPSBzZWxmLl90b1BhdHRlcm4oY291bnRlcnMpO1xuICAgICAgICBpZiAocGF0dGVybiA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGRlY29kZWRDaGFyID0gc2VsZi5fcGF0dGVyblRvQ2hhcihwYXR0ZXJuKTtcbiAgICAgICAgaWYgKGRlY29kZWRDaGFyIDwgMCl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucHVzaChkZWNvZGVkQ2hhcik7XG4gICAgICAgIGxhc3RTdGFydCA9IG5leHRTdGFydDtcbiAgICAgICAgbmV4dFN0YXJ0ICs9IEFycmF5SGVscGVyLnN1bShjb3VudGVycyk7XG4gICAgICAgIG5leHRTdGFydCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93LCBuZXh0U3RhcnQpO1xuICAgIH0gd2hpbGUgKGRlY29kZWRDaGFyICE9PSAnKicpO1xuICAgIHJlc3VsdC5wb3AoKTtcblxuICAgIGlmICghcmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoIXNlbGYuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZShsYXN0U3RhcnQsIG5leHRTdGFydCwgY291bnRlcnMpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNvZGU6IHJlc3VsdC5qb2luKFwiXCIpLFxuICAgICAgICBzdGFydDogc3RhcnQuc3RhcnQsXG4gICAgICAgIGVuZDogbmV4dFN0YXJ0LFxuICAgICAgICBzdGFydEluZm86IHN0YXJ0LFxuICAgICAgICBkZWNvZGVkQ29kZXM6IHJlc3VsdFxuICAgIH07XG59O1xuXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbihsYXN0U3RhcnQsIG5leHRTdGFydCwgY291bnRlcnMpIHtcbiAgICB2YXIgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kLFxuICAgICAgICBwYXR0ZXJuU2l6ZSA9IEFycmF5SGVscGVyLnN1bShjb3VudGVycyk7XG5cbiAgICB0cmFpbGluZ1doaXRlc3BhY2VFbmQgPSBuZXh0U3RhcnQgLSBsYXN0U3RhcnQgLSBwYXR0ZXJuU2l6ZTtcbiAgICBpZiAoKHRyYWlsaW5nV2hpdGVzcGFjZUVuZCAqIDMpID49IHBhdHRlcm5TaXplKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl9wYXR0ZXJuVG9DaGFyID0gZnVuY3Rpb24ocGF0dGVybikge1xuICAgIHZhciBpLFxuICAgICAgICBzZWxmID0gdGhpcztcblxuICAgIGZvciAoaSA9IDA7IGkgPCBzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuQ0hBUkFDVEVSX0VOQ09ESU5HU1tpXSA9PT0gcGF0dGVybikge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoc2VsZi5BTFBIQUJFVFtpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufTtcblxuQ29kZTM5UmVhZGVyLnByb3RvdHlwZS5fZmluZE5leHRXaWR0aCA9IGZ1bmN0aW9uKGNvdW50ZXJzLCBjdXJyZW50KSB7XG4gICAgdmFyIGksXG4gICAgICAgIG1pbldpZHRoID0gTnVtYmVyLk1BWF9WQUxVRTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY291bnRlcnNbaV0gPCBtaW5XaWR0aCAmJiBjb3VudGVyc1tpXSA+IGN1cnJlbnQpIHtcbiAgICAgICAgICAgIG1pbldpZHRoID0gY291bnRlcnNbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWluV2lkdGg7XG59O1xuXG5Db2RlMzlSZWFkZXIucHJvdG90eXBlLl90b1BhdHRlcm4gPSBmdW5jdGlvbihjb3VudGVycykge1xuICAgIHZhciBudW1Db3VudGVycyA9IGNvdW50ZXJzLmxlbmd0aCxcbiAgICAgICAgbWF4TmFycm93V2lkdGggPSAwLFxuICAgICAgICBudW1XaWRlQmFycyA9IG51bUNvdW50ZXJzLFxuICAgICAgICB3aWRlQmFyV2lkdGggPSAwLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgcGF0dGVybixcbiAgICAgICAgaTtcblxuICAgIHdoaWxlIChudW1XaWRlQmFycyA+IDMpIHtcbiAgICAgICAgbWF4TmFycm93V2lkdGggPSBzZWxmLl9maW5kTmV4dFdpZHRoKGNvdW50ZXJzLCBtYXhOYXJyb3dXaWR0aCk7XG4gICAgICAgIG51bVdpZGVCYXJzID0gMDtcbiAgICAgICAgcGF0dGVybiA9IDA7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBudW1Db3VudGVyczsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY291bnRlcnNbaV0gPiBtYXhOYXJyb3dXaWR0aCkge1xuICAgICAgICAgICAgICAgIHBhdHRlcm4gfD0gMSA8PCAobnVtQ291bnRlcnMgLSAxIC0gaSk7XG4gICAgICAgICAgICAgICAgbnVtV2lkZUJhcnMrKztcbiAgICAgICAgICAgICAgICB3aWRlQmFyV2lkdGggKz0gY291bnRlcnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobnVtV2lkZUJhcnMgPT09IDMpIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBudW1Db3VudGVycyAmJiBudW1XaWRlQmFycyA+IDA7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChjb3VudGVyc1tpXSA+IG1heE5hcnJvd1dpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIG51bVdpZGVCYXJzLS07XG4gICAgICAgICAgICAgICAgICAgIGlmICgoY291bnRlcnNbaV0gKiAyKSA+PSB3aWRlQmFyV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwYXR0ZXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn07XG5cbkNvZGUzOVJlYWRlci5wcm90b3R5cGUuX2ZpbmRTdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpLFxuICAgICAgICBwYXR0ZXJuU3RhcnQgPSBvZmZzZXQsXG4gICAgICAgIGNvdW50ZXIgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICAgIGNvdW50ZXJQb3MgPSAwLFxuICAgICAgICBpc1doaXRlID0gZmFsc2UsXG4gICAgICAgIGksXG4gICAgICAgIGosXG4gICAgICAgIHdoaXRlU3BhY2VNdXN0U3RhcnQ7XG5cbiAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgLy8gZmluZCBzdGFydCBwYXR0ZXJuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuX3RvUGF0dGVybihjb3VudGVyKSA9PT0gc2VsZi5BU1RFUklTSykge1xuICAgICAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlTXVzdFN0YXJ0ID0gTWF0aC5mbG9vcihNYXRoLm1heCgwLCBwYXR0ZXJuU3RhcnQgLSAoKGkgLSBwYXR0ZXJuU3RhcnQpIC8gNCkpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2Uod2hpdGVTcGFjZU11c3RTdGFydCwgcGF0dGVyblN0YXJ0LCAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogcGF0dGVyblN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogaVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHBhdHRlcm5TdGFydCArPSBjb3VudGVyWzBdICsgY291bnRlclsxXTtcbiAgICAgICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IDc7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyW2pdID0gY291bnRlcltqICsgMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvdW50ZXJbN10gPSAwO1xuICAgICAgICAgICAgICAgIGNvdW50ZXJbOF0gPSAwO1xuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MtLTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XG4gICAgICAgICAgICBpc1doaXRlID0gIWlzV2hpdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb2RlMzlSZWFkZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmVhZGVyL2NvZGVfMzlfcmVhZGVyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBkb3RcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXG4gKi9cbmZ1bmN0aW9uIGRvdChhLCBiKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZ2wtdmVjMi9kb3QuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdNYXAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBNYXA7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19NYXAuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBtYXBDYWNoZUNsZWFyID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVDbGVhcicpLFxuICAgIG1hcENhY2hlRGVsZXRlID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVEZWxldGUnKSxcbiAgICBtYXBDYWNoZUdldCA9IHJlcXVpcmUoJy4vX21hcENhY2hlR2V0JyksXG4gICAgbWFwQ2FjaGVIYXMgPSByZXF1aXJlKCcuL19tYXBDYWNoZUhhcycpLFxuICAgIG1hcENhY2hlU2V0ID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVTZXQnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIE1hcENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID09IG51bGwgPyAwIDogZW50cmllcy5sZW5ndGg7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbk1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwQ2FjaGVEZWxldGU7XG5NYXBDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbWFwQ2FjaGVHZXQ7XG5NYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwQ2FjaGVTZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwQ2FjaGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19NYXBDYWNoZS5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGJhc2VBc3NpZ25WYWx1ZSA9IHJlcXVpcmUoJy4vX2Jhc2VBc3NpZ25WYWx1ZScpLFxuICAgIGVxID0gcmVxdWlyZSgnLi9lcScpO1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZSBgYXNzaWduVmFsdWVgIGV4Y2VwdCB0aGF0IGl0IGRvZXNuJ3QgYXNzaWduXG4gKiBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgaWYgKCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmICFlcShvYmplY3Rba2V5XSwgdmFsdWUpKSB8fFxuICAgICAgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbk1lcmdlVmFsdWU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19hc3NpZ25NZXJnZVZhbHVlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYmFzZUFzc2lnblZhbHVlID0gcmVxdWlyZSgnLi9fYmFzZUFzc2lnblZhbHVlJyksXG4gICAgZXEgPSByZXF1aXJlKCcuL2VxJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQXNzaWducyBgdmFsdWVgIHRvIGBrZXlgIG9mIGBvYmplY3RgIGlmIHRoZSBleGlzdGluZyB2YWx1ZSBpcyBub3QgZXF1aXZhbGVudFxuICogdXNpbmcgW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV07XG4gIGlmICghKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGVxKG9ialZhbHVlLCB2YWx1ZSkpIHx8XG4gICAgICAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgIGJhc2VBc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduVmFsdWU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19hc3NpZ25WYWx1ZS5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgdmFyIGZ1bmMgPSBnZXROYXRpdmUoT2JqZWN0LCAnZGVmaW5lUHJvcGVydHknKTtcbiAgICBmdW5jKHt9LCAnJywge30pO1xuICAgIHJldHVybiBmdW5jO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVQcm9wZXJ0eTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2RlZmluZVByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZyZWVHbG9iYWw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19mcmVlR2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgb3ZlckFyZyA9IHJlcXVpcmUoJy4vX292ZXJBcmcnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UHJvdG90eXBlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fZ2V0UHJvdG90eXBlLmpzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNQcm90b3R5cGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19pc1Byb3RvdHlwZS5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFwcGx5ID0gcmVxdWlyZSgnLi9fYXBwbHknKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZVJlc3RgIHdoaWNoIHRyYW5zZm9ybXMgdGhlIHJlc3QgYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIHJlc3QgYXJyYXkgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJSZXN0KGZ1bmMsIHN0YXJ0LCB0cmFuc2Zvcm0pIHtcbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogc3RhcnQsIDApO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIHN0YXJ0LCAwKSxcbiAgICAgICAgYXJyYXkgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGFycmF5W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIGluZGV4ID0gLTE7XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBzdGFydCkge1xuICAgICAgb3RoZXJBcmdzW2luZGV4XSA9IGFyZ3NbaW5kZXhdO1xuICAgIH1cbiAgICBvdGhlckFyZ3Nbc3RhcnRdID0gdHJhbnNmb3JtKGFycmF5KTtcbiAgICByZXR1cm4gYXBwbHkoZnVuYywgdGhpcywgb3RoZXJBcmdzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvdmVyUmVzdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX292ZXJSZXN0LmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYmFzZVNldFRvU3RyaW5nID0gcmVxdWlyZSgnLi9fYmFzZVNldFRvU3RyaW5nJyksXG4gICAgc2hvcnRPdXQgPSByZXF1aXJlKCcuL19zaG9ydE91dCcpO1xuXG4vKipcbiAqIFNldHMgdGhlIGB0b1N0cmluZ2AgbWV0aG9kIG9mIGBmdW5jYCB0byByZXR1cm4gYHN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN0cmluZyBUaGUgYHRvU3RyaW5nYCByZXN1bHQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgYGZ1bmNgLlxuICovXG52YXIgc2V0VG9TdHJpbmcgPSBzaG9ydE91dChiYXNlU2V0VG9TdHJpbmcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNldFRvU3RyaW5nO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fc2V0VG9TdHJpbmcuanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgaXQgcmVjZWl2ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKlxuICogY29uc29sZS5sb2coXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaWRlbnRpdHk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL2lkZW50aXR5LmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKSxcbiAgICBzdHViRmFsc2UgPSByZXF1aXJlKCcuL3N0dWJGYWxzZScpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIEJ1ZmZlciA9IG1vZHVsZUV4cG9ydHMgPyByb290LkJ1ZmZlciA6IHVuZGVmaW5lZDtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQnVmZmVyID0gQnVmZmVyID8gQnVmZmVyLmlzQnVmZmVyIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4zLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IEJ1ZmZlcigyKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgVWludDhBcnJheSgyKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNCdWZmZXIgPSBuYXRpdmVJc0J1ZmZlciB8fCBzdHViRmFsc2U7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNCdWZmZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL2lzQnVmZmVyLmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYmFzZUlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4vX2Jhc2VJc1R5cGVkQXJyYXknKSxcbiAgICBiYXNlVW5hcnkgPSByZXF1aXJlKCcuL19iYXNlVW5hcnknKSxcbiAgICBub2RlVXRpbCA9IHJlcXVpcmUoJy4vX25vZGVVdGlsJyk7XG5cbi8qIE5vZGUuanMgaGVscGVyIHJlZmVyZW5jZXMuICovXG52YXIgbm9kZUlzVHlwZWRBcnJheSA9IG5vZGVVdGlsICYmIG5vZGVVdGlsLmlzVHlwZWRBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzVHlwZWRBcnJheSA9IG5vZGVJc1R5cGVkQXJyYXkgPyBiYXNlVW5hcnkobm9kZUlzVHlwZWRBcnJheSkgOiBiYXNlSXNUeXBlZEFycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVHlwZWRBcnJheTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvaXNUeXBlZEFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYXJyYXlMaWtlS2V5cyA9IHJlcXVpcmUoJy4vX2FycmF5TGlrZUtleXMnKSxcbiAgICBiYXNlS2V5c0luID0gcmVxdWlyZSgnLi9fYmFzZUtleXNJbicpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0LCB0cnVlKSA6IGJhc2VLZXlzSW4ob2JqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzSW47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL2tleXNJbi5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgVHlwZURlZnMgZnJvbSAnLi9jb21tb24vdHlwZWRlZnMnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgSW1hZ2VXcmFwcGVyIGZyb20gJy4vY29tbW9uL2ltYWdlX3dyYXBwZXInO1xuaW1wb3J0IEJhcmNvZGVMb2NhdG9yIGZyb20gJy4vbG9jYXRvci9iYXJjb2RlX2xvY2F0b3InO1xuaW1wb3J0IEJhcmNvZGVEZWNvZGVyIGZyb20gJy4vZGVjb2Rlci9iYXJjb2RlX2RlY29kZXInO1xuaW1wb3J0IEV2ZW50cyBmcm9tICcuL2NvbW1vbi9ldmVudHMnO1xuaW1wb3J0IENhbWVyYUFjY2VzcyBmcm9tICcuL2lucHV0L2NhbWVyYV9hY2Nlc3MnO1xuaW1wb3J0IEltYWdlRGVidWcgZnJvbSAnLi9jb21tb24vaW1hZ2VfZGVidWcnO1xuaW1wb3J0IFJlc3VsdENvbGxlY3RvciBmcm9tICcuL2FuYWx5dGljcy9yZXN1bHRfY29sbGVjdG9yJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi9jb25maWcvY29uZmlnJztcbmltcG9ydCBJbnB1dFN0cmVhbSBmcm9tICdpbnB1dF9zdHJlYW0nO1xuaW1wb3J0IEZyYW1lR3JhYmJlciBmcm9tICdmcmFtZV9ncmFiYmVyJztcbmltcG9ydCB7bWVyZ2V9IGZyb20gJ2xvZGFzaCc7XG5jb25zdCB2ZWMyID0ge1xuICAgIGNsb25lOiByZXF1aXJlKCdnbC12ZWMyL2Nsb25lJylcbn07XG5cbnZhciBfaW5wdXRTdHJlYW0sXG4gICAgX2ZyYW1lZ3JhYmJlcixcbiAgICBfc3RvcHBlZCxcbiAgICBfY2FudmFzQ29udGFpbmVyID0ge1xuICAgICAgICBjdHg6IHtcbiAgICAgICAgICAgIGltYWdlOiBudWxsLFxuICAgICAgICAgICAgb3ZlcmxheTogbnVsbFxuICAgICAgICB9LFxuICAgICAgICBkb206IHtcbiAgICAgICAgICAgIGltYWdlOiBudWxsLFxuICAgICAgICAgICAgb3ZlcmxheTogbnVsbFxuICAgICAgICB9XG4gICAgfSxcbiAgICBfaW5wdXRJbWFnZVdyYXBwZXIsXG4gICAgX2JveFNpemUsXG4gICAgX2RlY29kZXIsXG4gICAgX3dvcmtlclBvb2wgPSBbXSxcbiAgICBfb25VSVRocmVhZCA9IHRydWUsXG4gICAgX3Jlc3VsdENvbGxlY3RvcixcbiAgICBfY29uZmlnID0ge307XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVEYXRhKGltYWdlV3JhcHBlcikge1xuICAgIGluaXRCdWZmZXJzKGltYWdlV3JhcHBlcik7XG4gICAgX2RlY29kZXIgPSBCYXJjb2RlRGVjb2Rlci5jcmVhdGUoX2NvbmZpZy5kZWNvZGVyLCBfaW5wdXRJbWFnZVdyYXBwZXIpO1xufVxuXG5mdW5jdGlvbiBpbml0SW5wdXRTdHJlYW0oY2IpIHtcbiAgICB2YXIgdmlkZW87XG4gICAgaWYgKF9jb25maWcuaW5wdXRTdHJlYW0udHlwZSA9PT0gXCJWaWRlb1N0cmVhbVwiKSB7XG4gICAgICAgIHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInZpZGVvXCIpO1xuICAgICAgICBfaW5wdXRTdHJlYW0gPSBJbnB1dFN0cmVhbS5jcmVhdGVWaWRlb1N0cmVhbSh2aWRlbyk7XG4gICAgfSBlbHNlIGlmIChfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09IFwiSW1hZ2VTdHJlYW1cIikge1xuICAgICAgICBfaW5wdXRTdHJlYW0gPSBJbnB1dFN0cmVhbS5jcmVhdGVJbWFnZVN0cmVhbSgpO1xuICAgIH0gZWxzZSBpZiAoX2NvbmZpZy5pbnB1dFN0cmVhbS50eXBlID09PSBcIkxpdmVTdHJlYW1cIikge1xuICAgICAgICB2YXIgJHZpZXdwb3J0ID0gZ2V0Vmlld1BvcnQoKTtcbiAgICAgICAgaWYgKCR2aWV3cG9ydCkge1xuICAgICAgICAgICAgdmlkZW8gPSAkdmlld3BvcnQucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpO1xuICAgICAgICAgICAgaWYgKCF2aWRlbykge1xuICAgICAgICAgICAgICAgIHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInZpZGVvXCIpO1xuICAgICAgICAgICAgICAgICR2aWV3cG9ydC5hcHBlbmRDaGlsZCh2aWRlbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX2lucHV0U3RyZWFtID0gSW5wdXRTdHJlYW0uY3JlYXRlTGl2ZVN0cmVhbSh2aWRlbyk7XG4gICAgICAgIENhbWVyYUFjY2Vzcy5yZXF1ZXN0KHZpZGVvLCBfY29uZmlnLmlucHV0U3RyZWFtLmNvbnN0cmFpbnRzKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBfaW5wdXRTdHJlYW0udHJpZ2dlcihcImNhbnJlY29yZFwiKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNiKGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9pbnB1dFN0cmVhbS5zZXRBdHRyaWJ1dGUoXCJwcmVsb2FkXCIsIFwiYXV0b1wiKTtcbiAgICBfaW5wdXRTdHJlYW0uc2V0SW5wdXRTdHJlYW0oX2NvbmZpZy5pbnB1dFN0cmVhbSk7XG4gICAgX2lucHV0U3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5yZWNvcmRcIiwgY2FuUmVjb3JkLmJpbmQodW5kZWZpbmVkLCBjYikpO1xufVxuXG5mdW5jdGlvbiBnZXRWaWV3UG9ydCgpIHtcbiAgICB2YXIgdGFyZ2V0ID0gX2NvbmZpZy5pbnB1dFN0cmVhbS50YXJnZXQ7XG4gICAgLy8gQ2hlY2sgaWYgdGFyZ2V0IGlzIGFscmVhZHkgYSBET00gZWxlbWVudFxuICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0Lm5vZGVOYW1lICYmIHRhcmdldC5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFVzZSAnI2ludGVyYWN0aXZlLnZpZXdwb3J0JyBhcyBhIGZhbGxiYWNrIHNlbGVjdG9yIChiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSlcbiAgICAgICAgdmFyIHNlbGVjdG9yID0gdHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycgPyB0YXJnZXQgOiAnI2ludGVyYWN0aXZlLnZpZXdwb3J0JztcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY2FuUmVjb3JkKGNiKSB7XG4gICAgQmFyY29kZUxvY2F0b3IuY2hlY2tJbWFnZUNvbnN0cmFpbnRzKF9pbnB1dFN0cmVhbSwgX2NvbmZpZy5sb2NhdG9yKTtcbiAgICBpbml0Q2FudmFzKF9jb25maWcpO1xuICAgIF9mcmFtZWdyYWJiZXIgPSBGcmFtZUdyYWJiZXIuY3JlYXRlKF9pbnB1dFN0cmVhbSwgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UpO1xuXG4gICAgYWRqdXN0V29ya2VyUG9vbChfY29uZmlnLm51bU9mV29ya2VycywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChfY29uZmlnLm51bU9mV29ya2VycyA9PT0gMCkge1xuICAgICAgICAgICAgaW5pdGlhbGl6ZURhdGEoKTtcbiAgICAgICAgfVxuICAgICAgICByZWFkeShjYik7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlYWR5KGNiKXtcbiAgICBfaW5wdXRTdHJlYW0ucGxheSgpO1xuICAgIGNiKCk7XG59XG5cbmZ1bmN0aW9uIGluaXRDYW52YXMoKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICB2YXIgJHZpZXdwb3J0ID0gZ2V0Vmlld1BvcnQoKTtcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzLmltZ0J1ZmZlclwiKTtcbiAgICAgICAgaWYgKCFfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZSkge1xuICAgICAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UuY2xhc3NOYW1lID0gXCJpbWdCdWZmZXJcIjtcbiAgICAgICAgICAgIGlmICgkdmlld3BvcnQgJiYgX2NvbmZpZy5pbnB1dFN0cmVhbS50eXBlID09PSBcIkltYWdlU3RyZWFtXCIpIHtcbiAgICAgICAgICAgICAgICAkdmlld3BvcnQuYXBwZW5kQ2hpbGQoX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9jYW52YXNDb250YWluZXIuY3R4LmltYWdlID0gX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZS53aWR0aCA9IF9pbnB1dFN0cmVhbS5nZXRDYW52YXNTaXplKCkueDtcbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UuaGVpZ2h0ID0gX2lucHV0U3RyZWFtLmdldENhbnZhc1NpemUoKS55O1xuXG4gICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzLmRyYXdpbmdCdWZmZXJcIik7XG4gICAgICAgIGlmICghX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheSkge1xuICAgICAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5LmNsYXNzTmFtZSA9IFwiZHJhd2luZ0J1ZmZlclwiO1xuICAgICAgICAgICAgaWYgKCR2aWV3cG9ydCkge1xuICAgICAgICAgICAgICAgICR2aWV3cG9ydC5hcHBlbmRDaGlsZChfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjbGVhckZpeCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKTtcbiAgICAgICAgICAgIGNsZWFyRml4LnNldEF0dHJpYnV0ZShcImNsZWFyXCIsIFwiYWxsXCIpO1xuICAgICAgICAgICAgaWYgKCR2aWV3cG9ydCkge1xuICAgICAgICAgICAgICAgICR2aWV3cG9ydC5hcHBlbmRDaGlsZChjbGVhckZpeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5jdHgub3ZlcmxheSA9IF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5LndpZHRoID0gX2lucHV0U3RyZWFtLmdldENhbnZhc1NpemUoKS54O1xuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5LmhlaWdodCA9IF9pbnB1dFN0cmVhbS5nZXRDYW52YXNTaXplKCkueTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGluaXRCdWZmZXJzKGltYWdlV3JhcHBlcikge1xuICAgIGlmIChpbWFnZVdyYXBwZXIpIHtcbiAgICAgICAgX2lucHV0SW1hZ2VXcmFwcGVyID0gaW1hZ2VXcmFwcGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIF9pbnB1dEltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoe1xuICAgICAgICAgICAgeDogX2lucHV0U3RyZWFtLmdldFdpZHRoKCksXG4gICAgICAgICAgICB5OiBfaW5wdXRTdHJlYW0uZ2V0SGVpZ2h0KClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKEVOVi5kZXZlbG9wbWVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZSk7XG4gICAgfVxuICAgIF9ib3hTaXplID0gW1xuICAgICAgICB2ZWMyLmNsb25lKFswLCAwXSksXG4gICAgICAgIHZlYzIuY2xvbmUoWzAsIF9pbnB1dEltYWdlV3JhcHBlci5zaXplLnldKSxcbiAgICAgICAgdmVjMi5jbG9uZShbX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUueCwgX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUueV0pLFxuICAgICAgICB2ZWMyLmNsb25lKFtfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS54LCAwXSlcbiAgICBdO1xuICAgIEJhcmNvZGVMb2NhdG9yLmluaXQoX2lucHV0SW1hZ2VXcmFwcGVyLCBfY29uZmlnLmxvY2F0b3IpO1xufVxuXG5mdW5jdGlvbiBnZXRCb3VuZGluZ0JveGVzKCkge1xuICAgIGlmIChfY29uZmlnLmxvY2F0ZSkge1xuICAgICAgICByZXR1cm4gQmFyY29kZUxvY2F0b3IubG9jYXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtbXG4gICAgICAgICAgICB2ZWMyLmNsb25lKF9ib3hTaXplWzBdKSxcbiAgICAgICAgICAgIHZlYzIuY2xvbmUoX2JveFNpemVbMV0pLFxuICAgICAgICAgICAgdmVjMi5jbG9uZShfYm94U2l6ZVsyXSksXG4gICAgICAgICAgICB2ZWMyLmNsb25lKF9ib3hTaXplWzNdKV1dO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdHJhbnNmb3JtUmVzdWx0KHJlc3VsdCkge1xuICAgIHZhciB0b3BSaWdodCA9IF9pbnB1dFN0cmVhbS5nZXRUb3BSaWdodCgpLFxuICAgICAgICB4T2Zmc2V0ID0gdG9wUmlnaHQueCxcbiAgICAgICAgeU9mZnNldCA9IHRvcFJpZ2h0LnksXG4gICAgICAgIGk7XG5cbiAgICBpZiAoeE9mZnNldCA9PT0gMCAmJiB5T2Zmc2V0ID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0LmJhcmNvZGVzKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCByZXN1bHQuYmFyY29kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybVJlc3VsdChyZXN1bHQuYmFyY29kZXNbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdC5saW5lICYmIHJlc3VsdC5saW5lLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBtb3ZlTGluZShyZXN1bHQubGluZSk7XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdC5ib3gpIHtcbiAgICAgICAgbW92ZUJveChyZXN1bHQuYm94KTtcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0LmJveGVzICYmIHJlc3VsdC5ib3hlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCByZXN1bHQuYm94ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG1vdmVCb3gocmVzdWx0LmJveGVzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdmVCb3goYm94KSB7XG4gICAgICAgIHZhciBjb3JuZXIgPSBib3gubGVuZ3RoO1xuXG4gICAgICAgIHdoaWxlIChjb3JuZXItLSkge1xuICAgICAgICAgICAgYm94W2Nvcm5lcl1bMF0gKz0geE9mZnNldDtcbiAgICAgICAgICAgIGJveFtjb3JuZXJdWzFdICs9IHlPZmZzZXQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3ZlTGluZShsaW5lKSB7XG4gICAgICAgIGxpbmVbMF0ueCArPSB4T2Zmc2V0O1xuICAgICAgICBsaW5lWzBdLnkgKz0geU9mZnNldDtcbiAgICAgICAgbGluZVsxXS54ICs9IHhPZmZzZXQ7XG4gICAgICAgIGxpbmVbMV0ueSArPSB5T2Zmc2V0O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYWRkUmVzdWx0IChyZXN1bHQsIGltYWdlRGF0YSkge1xuICAgIGlmICghaW1hZ2VEYXRhIHx8ICFfcmVzdWx0Q29sbGVjdG9yKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0LmJhcmNvZGVzKSB7XG4gICAgICAgIHJlc3VsdC5iYXJjb2Rlcy5maWx0ZXIoYmFyY29kZSA9PiBiYXJjb2RlLmNvZGVSZXN1bHQpXG4gICAgICAgICAgICAuZm9yRWFjaChiYXJjb2RlID0+IGFkZFJlc3VsdChiYXJjb2RlLCBpbWFnZURhdGEpKTtcbiAgICB9IGVsc2UgaWYgKHJlc3VsdC5jb2RlUmVzdWx0KSB7XG4gICAgICAgIF9yZXN1bHRDb2xsZWN0b3IuYWRkUmVzdWx0KGltYWdlRGF0YSwgX2lucHV0U3RyZWFtLmdldENhbnZhc1NpemUoKSwgcmVzdWx0LmNvZGVSZXN1bHQpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaGFzQ29kZVJlc3VsdCAocmVzdWx0KSB7XG4gICAgcmV0dXJuIHJlc3VsdCAmJiAocmVzdWx0LmJhcmNvZGVzID9cbiAgICAgIHJlc3VsdC5iYXJjb2Rlcy5zb21lKGJhcmNvZGUgPT4gYmFyY29kZS5jb2RlUmVzdWx0KSA6XG4gICAgICByZXN1bHQuY29kZVJlc3VsdCk7XG59XG5cbmZ1bmN0aW9uIHB1Ymxpc2hSZXN1bHQocmVzdWx0LCBpbWFnZURhdGEpIHtcbiAgICBsZXQgcmVzdWx0VG9QdWJsaXNoID0gcmVzdWx0O1xuXG4gICAgaWYgKHJlc3VsdCAmJiBfb25VSVRocmVhZCkge1xuICAgICAgICB0cmFuc2Zvcm1SZXN1bHQocmVzdWx0KTtcbiAgICAgICAgYWRkUmVzdWx0KHJlc3VsdCwgaW1hZ2VEYXRhKTtcbiAgICAgICAgcmVzdWx0VG9QdWJsaXNoID0gcmVzdWx0LmJhcmNvZGVzIHx8IHJlc3VsdDtcbiAgICB9XG5cbiAgICBFdmVudHMucHVibGlzaChcInByb2Nlc3NlZFwiLCByZXN1bHRUb1B1Ymxpc2gpO1xuICAgIGlmIChoYXNDb2RlUmVzdWx0KHJlc3VsdCkpIHtcbiAgICAgICAgRXZlbnRzLnB1Ymxpc2goXCJkZXRlY3RlZFwiLCByZXN1bHRUb1B1Ymxpc2gpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbG9jYXRlQW5kRGVjb2RlKCkge1xuICAgIHZhciByZXN1bHQsXG4gICAgICAgIGJveGVzO1xuXG4gICAgYm94ZXMgPSBnZXRCb3VuZGluZ0JveGVzKCk7XG4gICAgaWYgKGJveGVzKSB7XG4gICAgICAgIHJlc3VsdCA9IF9kZWNvZGVyLmRlY29kZUZyb21Cb3VuZGluZ0JveGVzKGJveGVzKTtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0IHx8IHt9O1xuICAgICAgICByZXN1bHQuYm94ZXMgPSBib3hlcztcbiAgICAgICAgcHVibGlzaFJlc3VsdChyZXN1bHQsIF9pbnB1dEltYWdlV3JhcHBlci5kYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBwdWJsaXNoUmVzdWx0KCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdmFyIGF2YWlsYWJsZVdvcmtlcjtcblxuICAgIGlmIChfb25VSVRocmVhZCkge1xuICAgICAgICBpZiAoX3dvcmtlclBvb2wubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgYXZhaWxhYmxlV29ya2VyID0gX3dvcmtlclBvb2wuZmlsdGVyKGZ1bmN0aW9uKHdvcmtlclRocmVhZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhd29ya2VyVGhyZWFkLmJ1c3k7XG4gICAgICAgICAgICB9KVswXTtcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGVXb3JrZXIpIHtcbiAgICAgICAgICAgICAgICBfZnJhbWVncmFiYmVyLmF0dGFjaERhdGEoYXZhaWxhYmxlV29ya2VyLmltYWdlRGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gYWxsIHdvcmtlcnMgYXJlIGJ1c3lcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9mcmFtZWdyYWJiZXIuYXR0YWNoRGF0YShfaW5wdXRJbWFnZVdyYXBwZXIuZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKF9mcmFtZWdyYWJiZXIuZ3JhYigpKSB7XG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlV29ya2VyKSB7XG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlV29ya2VyLmJ1c3kgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGF2YWlsYWJsZVdvcmtlci53b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBjbWQ6ICdwcm9jZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VEYXRhOiBhdmFpbGFibGVXb3JrZXIuaW1hZ2VEYXRhXG4gICAgICAgICAgICAgICAgfSwgW2F2YWlsYWJsZVdvcmtlci5pbWFnZURhdGEuYnVmZmVyXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvY2F0ZUFuZERlY29kZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbG9jYXRlQW5kRGVjb2RlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzdGFydENvbnRpbnVvdXNVcGRhdGUoKSB7XG4gICAgdmFyIG5leHQgPSBudWxsLFxuICAgICAgICBkZWxheSA9IDEwMDAgLyAoX2NvbmZpZy5mcmVxdWVuY3kgfHwgNjApO1xuXG4gICAgX3N0b3BwZWQgPSBmYWxzZTtcbiAgICAoZnVuY3Rpb24gZnJhbWUodGltZXN0YW1wKSB7XG4gICAgICAgIG5leHQgPSBuZXh0IHx8IHRpbWVzdGFtcDtcbiAgICAgICAgaWYgKCFfc3RvcHBlZCkge1xuICAgICAgICAgICAgaWYgKHRpbWVzdGFtcCA+PSBuZXh0KSB7XG4gICAgICAgICAgICAgICAgbmV4dCArPSBkZWxheTtcbiAgICAgICAgICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lKGZyYW1lKTtcbiAgICAgICAgfVxuICAgIH0ocGVyZm9ybWFuY2Uubm93KCkpKTtcbn1cblxuZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgaWYgKF9vblVJVGhyZWFkICYmIF9jb25maWcuaW5wdXRTdHJlYW0udHlwZSA9PT0gXCJMaXZlU3RyZWFtXCIpIHtcbiAgICAgICAgc3RhcnRDb250aW51b3VzVXBkYXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdXBkYXRlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbml0V29ya2VyKGNiKSB7XG4gICAgdmFyIGJsb2JVUkwsXG4gICAgICAgIHdvcmtlclRocmVhZCA9IHtcbiAgICAgICAgICAgIHdvcmtlcjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgaW1hZ2VEYXRhOiBuZXcgVWludDhBcnJheShfaW5wdXRTdHJlYW0uZ2V0V2lkdGgoKSAqIF9pbnB1dFN0cmVhbS5nZXRIZWlnaHQoKSksXG4gICAgICAgICAgICBidXN5OiB0cnVlXG4gICAgICAgIH07XG5cbiAgICBibG9iVVJMID0gZ2VuZXJhdGVXb3JrZXJCbG9iKCk7XG4gICAgd29ya2VyVGhyZWFkLndvcmtlciA9IG5ldyBXb3JrZXIoYmxvYlVSTCk7XG5cbiAgICB3b3JrZXJUaHJlYWQud29ya2VyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUuZGF0YS5ldmVudCA9PT0gJ2luaXRpYWxpemVkJykge1xuICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChibG9iVVJMKTtcbiAgICAgICAgICAgIHdvcmtlclRocmVhZC5idXN5ID0gZmFsc2U7XG4gICAgICAgICAgICB3b3JrZXJUaHJlYWQuaW1hZ2VEYXRhID0gbmV3IFVpbnQ4QXJyYXkoZS5kYXRhLmltYWdlRGF0YSk7XG4gICAgICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXb3JrZXIgaW5pdGlhbGl6ZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY2Iod29ya2VyVGhyZWFkKTtcbiAgICAgICAgfSBlbHNlIGlmIChlLmRhdGEuZXZlbnQgPT09ICdwcm9jZXNzZWQnKSB7XG4gICAgICAgICAgICB3b3JrZXJUaHJlYWQuaW1hZ2VEYXRhID0gbmV3IFVpbnQ4QXJyYXkoZS5kYXRhLmltYWdlRGF0YSk7XG4gICAgICAgICAgICB3b3JrZXJUaHJlYWQuYnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgcHVibGlzaFJlc3VsdChlLmRhdGEucmVzdWx0LCB3b3JrZXJUaHJlYWQuaW1hZ2VEYXRhKTtcbiAgICAgICAgfSBlbHNlIGlmIChlLmRhdGEuZXZlbnQgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldvcmtlciBlcnJvcjogXCIgKyBlLmRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgd29ya2VyVGhyZWFkLndvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGNtZDogJ2luaXQnLFxuICAgICAgICBzaXplOiB7eDogX2lucHV0U3RyZWFtLmdldFdpZHRoKCksIHk6IF9pbnB1dFN0cmVhbS5nZXRIZWlnaHQoKX0sXG4gICAgICAgIGltYWdlRGF0YTogd29ya2VyVGhyZWFkLmltYWdlRGF0YSxcbiAgICAgICAgY29uZmlnOiBjb25maWdGb3JXb3JrZXIoX2NvbmZpZylcbiAgICB9LCBbd29ya2VyVGhyZWFkLmltYWdlRGF0YS5idWZmZXJdKTtcbn1cblxuZnVuY3Rpb24gY29uZmlnRm9yV29ya2VyKGNvbmZpZykge1xuICAgIHJldHVybiB7XG4gICAgICAgIC4uLmNvbmZpZyxcbiAgICAgICAgaW5wdXRTdHJlYW06IHtcbiAgICAgICAgICAgIC4uLmNvbmZpZy5pbnB1dFN0cmVhbSxcbiAgICAgICAgICAgIHRhcmdldDogbnVsbFxuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gd29ya2VySW50ZXJmYWNlKGZhY3RvcnkpIHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiovXG4gICAgaWYgKGZhY3RvcnkpIHtcbiAgICAgICAgdmFyIFF1YWdnYSA9IGZhY3RvcnkoKS5kZWZhdWx0O1xuICAgICAgICBpZiAoIVF1YWdnYSkge1xuICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7J2V2ZW50JzogJ2Vycm9yJywgbWVzc2FnZTogJ1F1YWdnYSBjb3VsZCBub3QgYmUgY3JlYXRlZCd9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgaW1hZ2VXcmFwcGVyO1xuXG4gICAgc2VsZi5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLmRhdGEuY21kID09PSAnaW5pdCcpIHtcbiAgICAgICAgICAgIHZhciBjb25maWcgPSBlLmRhdGEuY29uZmlnO1xuICAgICAgICAgICAgY29uZmlnLm51bU9mV29ya2VycyA9IDA7XG4gICAgICAgICAgICBpbWFnZVdyYXBwZXIgPSBuZXcgUXVhZ2dhLkltYWdlV3JhcHBlcih7XG4gICAgICAgICAgICAgICAgeDogZS5kYXRhLnNpemUueCxcbiAgICAgICAgICAgICAgICB5OiBlLmRhdGEuc2l6ZS55XG4gICAgICAgICAgICB9LCBuZXcgVWludDhBcnJheShlLmRhdGEuaW1hZ2VEYXRhKSk7XG4gICAgICAgICAgICBRdWFnZ2EuaW5pdChjb25maWcsIHJlYWR5LCBpbWFnZVdyYXBwZXIpO1xuICAgICAgICAgICAgUXVhZ2dhLm9uUHJvY2Vzc2VkKG9uUHJvY2Vzc2VkKTtcbiAgICAgICAgfSBlbHNlIGlmIChlLmRhdGEuY21kID09PSAncHJvY2VzcycpIHtcbiAgICAgICAgICAgIGltYWdlV3JhcHBlci5kYXRhID0gbmV3IFVpbnQ4QXJyYXkoZS5kYXRhLmltYWdlRGF0YSk7XG4gICAgICAgICAgICBRdWFnZ2Euc3RhcnQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChlLmRhdGEuY21kID09PSAnc2V0UmVhZGVycycpIHtcbiAgICAgICAgICAgIFF1YWdnYS5zZXRSZWFkZXJzKGUuZGF0YS5yZWFkZXJzKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBvblByb2Nlc3NlZChyZXN1bHQpIHtcbiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAnZXZlbnQnOiAncHJvY2Vzc2VkJyxcbiAgICAgICAgICAgIGltYWdlRGF0YTogaW1hZ2VXcmFwcGVyLmRhdGEsXG4gICAgICAgICAgICByZXN1bHQ6IHJlc3VsdFxuICAgICAgICB9LCBbaW1hZ2VXcmFwcGVyLmRhdGEuYnVmZmVyXSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVhZHkoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7J2V2ZW50JzogJ2luaXRpYWxpemVkJywgaW1hZ2VEYXRhOiBpbWFnZVdyYXBwZXIuZGF0YX0sIFtpbWFnZVdyYXBwZXIuZGF0YS5idWZmZXJdKTtcbiAgICB9XG5cbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlV29ya2VyQmxvYigpIHtcbiAgICB2YXIgYmxvYixcbiAgICAgICAgZmFjdG9yeVNvdXJjZTtcblxuICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbiAgICBpZiAodHlwZW9mIF9fZmFjdG9yeVNvdXJjZV9fICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBmYWN0b3J5U291cmNlID0gX19mYWN0b3J5U291cmNlX187IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiAgICB9XG4gICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cblxuICAgIGJsb2IgPSBuZXcgQmxvYihbJygnICsgd29ya2VySW50ZXJmYWNlLnRvU3RyaW5nKCkgKyAnKSgnICsgZmFjdG9yeVNvdXJjZSArICcpOyddLFxuICAgICAgICB7dHlwZTogJ3RleHQvamF2YXNjcmlwdCd9KTtcblxuICAgIHJldHVybiB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbn1cblxuZnVuY3Rpb24gc2V0UmVhZGVycyhyZWFkZXJzKSB7XG4gICAgaWYgKF9kZWNvZGVyKSB7XG4gICAgICAgIF9kZWNvZGVyLnNldFJlYWRlcnMocmVhZGVycyk7XG4gICAgfSBlbHNlIGlmIChfb25VSVRocmVhZCAmJiBfd29ya2VyUG9vbC5sZW5ndGggPiAwKSB7XG4gICAgICAgIF93b3JrZXJQb29sLmZvckVhY2goZnVuY3Rpb24od29ya2VyVGhyZWFkKSB7XG4gICAgICAgICAgICB3b3JrZXJUaHJlYWQud29ya2VyLnBvc3RNZXNzYWdlKHtjbWQ6ICdzZXRSZWFkZXJzJywgcmVhZGVyczogcmVhZGVyc30pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFkanVzdFdvcmtlclBvb2woY2FwYWNpdHksIGNiKSB7XG4gICAgY29uc3QgaW5jcmVhc2VCeSA9IGNhcGFjaXR5IC0gX3dvcmtlclBvb2wubGVuZ3RoO1xuICAgIGlmIChpbmNyZWFzZUJ5ID09PSAwKSB7XG4gICAgICAgIHJldHVybiBjYiAmJiBjYigpO1xuICAgIH1cbiAgICBpZiAoaW5jcmVhc2VCeSA8IDApIHtcbiAgICAgICAgY29uc3Qgd29ya2Vyc1RvVGVybWluYXRlID0gX3dvcmtlclBvb2wuc2xpY2UoaW5jcmVhc2VCeSk7XG4gICAgICAgIHdvcmtlcnNUb1Rlcm1pbmF0ZS5mb3JFYWNoKGZ1bmN0aW9uKHdvcmtlclRocmVhZCkge1xuICAgICAgICAgICAgd29ya2VyVGhyZWFkLndvcmtlci50ZXJtaW5hdGUoKTtcbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldvcmtlciB0ZXJtaW5hdGVkIVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIF93b3JrZXJQb29sID0gX3dvcmtlclBvb2wuc2xpY2UoMCwgaW5jcmVhc2VCeSk7XG4gICAgICAgIHJldHVybiBjYiAmJiBjYigpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5jcmVhc2VCeTsgaSsrKSB7XG4gICAgICAgICAgICBpbml0V29ya2VyKHdvcmtlckluaXRpYWxpemVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHdvcmtlckluaXRpYWxpemVkKHdvcmtlclRocmVhZCkge1xuICAgICAgICAgICAgX3dvcmtlclBvb2wucHVzaCh3b3JrZXJUaHJlYWQpO1xuICAgICAgICAgICAgaWYgKF93b3JrZXJQb29sLmxlbmd0aCA+PSBjYXBhY2l0eSl7XG4gICAgICAgICAgICAgICAgY2IgJiYgY2IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGluaXQ6IGZ1bmN0aW9uKGNvbmZpZywgY2IsIGltYWdlV3JhcHBlcikge1xuICAgICAgICBfY29uZmlnID0gbWVyZ2Uoe30sIENvbmZpZywgY29uZmlnKTtcbiAgICAgICAgaWYgKGltYWdlV3JhcHBlcikge1xuICAgICAgICAgICAgX29uVUlUaHJlYWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGluaXRpYWxpemVEYXRhKGltYWdlV3JhcHBlcik7XG4gICAgICAgICAgICByZXR1cm4gY2IoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluaXRJbnB1dFN0cmVhbShjYik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgc3RhcnQoKTtcbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfc3RvcHBlZCA9IHRydWU7XG4gICAgICAgIGFkanVzdFdvcmtlclBvb2woMCk7XG4gICAgICAgIGlmIChfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09IFwiTGl2ZVN0cmVhbVwiKSB7XG4gICAgICAgICAgICBDYW1lcmFBY2Nlc3MucmVsZWFzZSgpO1xuICAgICAgICAgICAgX2lucHV0U3RyZWFtLmNsZWFyRXZlbnRIYW5kbGVycygpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBwYXVzZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIF9zdG9wcGVkID0gdHJ1ZTtcbiAgICB9LFxuICAgIG9uRGV0ZWN0ZWQ6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIEV2ZW50cy5zdWJzY3JpYmUoXCJkZXRlY3RlZFwiLCBjYWxsYmFjayk7XG4gICAgfSxcbiAgICBvZmZEZXRlY3RlZDogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgRXZlbnRzLnVuc3Vic2NyaWJlKFwiZGV0ZWN0ZWRcIiwgY2FsbGJhY2spO1xuICAgIH0sXG4gICAgb25Qcm9jZXNzZWQ6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIEV2ZW50cy5zdWJzY3JpYmUoXCJwcm9jZXNzZWRcIiwgY2FsbGJhY2spO1xuICAgIH0sXG4gICAgb2ZmUHJvY2Vzc2VkOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICBFdmVudHMudW5zdWJzY3JpYmUoXCJwcm9jZXNzZWRcIiwgY2FsbGJhY2spO1xuICAgIH0sXG4gICAgc2V0UmVhZGVyczogZnVuY3Rpb24ocmVhZGVycykge1xuICAgICAgICBzZXRSZWFkZXJzKHJlYWRlcnMpO1xuICAgIH0sXG4gICAgcmVnaXN0ZXJSZXN1bHRDb2xsZWN0b3I6IGZ1bmN0aW9uKHJlc3VsdENvbGxlY3Rvcikge1xuICAgICAgICBpZiAocmVzdWx0Q29sbGVjdG9yICYmIHR5cGVvZiByZXN1bHRDb2xsZWN0b3IuYWRkUmVzdWx0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBfcmVzdWx0Q29sbGVjdG9yID0gcmVzdWx0Q29sbGVjdG9yO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjYW52YXM6IF9jYW52YXNDb250YWluZXIsXG4gICAgZGVjb2RlU2luZ2xlOiBmdW5jdGlvbihjb25maWcsIHJlc3VsdENhbGxiYWNrKSB7XG4gICAgICAgIGNvbmZpZyA9IG1lcmdlKHtcbiAgICAgICAgICAgIGlucHV0U3RyZWFtOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJJbWFnZVN0cmVhbVwiLFxuICAgICAgICAgICAgICAgIHNlcXVlbmNlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaXplOiA4MDAsXG4gICAgICAgICAgICAgICAgc3JjOiBjb25maWcuc3JjXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbnVtT2ZXb3JrZXJzOiAoRU5WLmRldmVsb3BtZW50ICYmIGNvbmZpZy5kZWJ1ZykgPyAwIDogMSxcbiAgICAgICAgICAgIGxvY2F0b3I6IHtcbiAgICAgICAgICAgICAgICBoYWxmU2FtcGxlOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjb25maWcpO1xuICAgICAgICB0aGlzLmluaXQoY29uZmlnLCAoKSA9PiB7XG4gICAgICAgICAgICBFdmVudHMub25jZShcInByb2Nlc3NlZFwiLCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0Q2FsbGJhY2suY2FsbChudWxsLCByZXN1bHQpO1xuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgICBzdGFydCgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIEltYWdlV3JhcHBlcjogSW1hZ2VXcmFwcGVyLFxuICAgIEltYWdlRGVidWc6IEltYWdlRGVidWcsXG4gICAgUmVzdWx0Q29sbGVjdG9yOiBSZXN1bHRDb2xsZWN0b3IsXG4gICAgQ2FtZXJhQWNjZXNzOiBDYW1lcmFBY2Nlc3MsXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3F1YWdnYS5qcyIsImNvbnN0IENWVXRpbHMgPSByZXF1aXJlKCcuLi9zcmMvY29tbW9uL2N2X3V0aWxzJyksXG4gICAgICBOZGFycmF5ID0gcmVxdWlyZShcIm5kYXJyYXlcIiksXG4gICAgICBJbnRlcnAyRCA9IHJlcXVpcmUoXCJuZGFycmF5LWxpbmVhci1pbnRlcnBvbGF0ZVwiKS5kMjtcblxudmFyIEZyYW1lR3JhYmJlciA9IHt9O1xuXG5GcmFtZUdyYWJiZXIuY3JlYXRlID0gZnVuY3Rpb24oaW5wdXRTdHJlYW0pIHtcbiAgICB2YXIgX3RoYXQgPSB7fSxcbiAgICAgICAgX3N0cmVhbUNvbmZpZyA9IGlucHV0U3RyZWFtLmdldENvbmZpZygpLFxuICAgICAgICBfdmlkZW9fc2l6ZSA9IENWVXRpbHMuaW1hZ2VSZWYoaW5wdXRTdHJlYW0uZ2V0UmVhbFdpZHRoKCksIGlucHV0U3RyZWFtLmdldFJlYWxIZWlnaHQoKSksXG4gICAgICAgIF9jYW52YXNTaXplID0gaW5wdXRTdHJlYW0uZ2V0Q2FudmFzU2l6ZSgpLFxuICAgICAgICBfc2l6ZSA9IENWVXRpbHMuaW1hZ2VSZWYoaW5wdXRTdHJlYW0uZ2V0V2lkdGgoKSwgaW5wdXRTdHJlYW0uZ2V0SGVpZ2h0KCkpLFxuICAgICAgICBfdG9wUmlnaHQgPSBpbnB1dFN0cmVhbS5nZXRUb3BSaWdodCgpLFxuICAgICAgICBfZGF0YSA9IG5ldyBVaW50OEFycmF5KF9zaXplLnggKiBfc2l6ZS55KSxcbiAgICAgICAgX2dyYXlEYXRhID0gbmV3IFVpbnQ4QXJyYXkoX3ZpZGVvX3NpemUueCAqIF92aWRlb19zaXplLnkpLFxuICAgICAgICBfY2FudmFzRGF0YSA9IG5ldyBVaW50OEFycmF5KF9jYW52YXNTaXplLnggKiBfY2FudmFzU2l6ZS55KSxcbiAgICAgICAgX2dyYXlJbWFnZUFycmF5ID0gTmRhcnJheShfZ3JheURhdGEsIFtfdmlkZW9fc2l6ZS55LCBfdmlkZW9fc2l6ZS54XSkudHJhbnNwb3NlKDEsIDApLFxuICAgICAgICBfY2FudmFzSW1hZ2VBcnJheSA9IE5kYXJyYXkoX2NhbnZhc0RhdGEsIFtfY2FudmFzU2l6ZS55LCBfY2FudmFzU2l6ZS54XSkudHJhbnNwb3NlKDEsIDApLFxuICAgICAgICBfdGFyZ2V0SW1hZ2VBcnJheSA9IF9jYW52YXNJbWFnZUFycmF5LmhpKF90b3BSaWdodC54ICsgX3NpemUueCwgX3RvcFJpZ2h0LnkgKyBfc2l6ZS55KS5sbyhfdG9wUmlnaHQueCwgX3RvcFJpZ2h0LnkpLFxuICAgICAgICBfc3RlcFNpemVYID0gX3ZpZGVvX3NpemUueC9fY2FudmFzU2l6ZS54LFxuICAgICAgICBfc3RlcFNpemVZID0gX3ZpZGVvX3NpemUueS9fY2FudmFzU2l6ZS55O1xuXG4gICAgY29uc29sZS5sb2coXCJGcmFtZUdyYWJiZXJcIiwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB2aWRlb1NpemU6IF9ncmF5SW1hZ2VBcnJheS5zaGFwZSxcbiAgICAgICAgY2FudmFzU2l6ZTogX2NhbnZhc0ltYWdlQXJyYXkuc2hhcGUsXG4gICAgICAgIHN0ZXBTaXplOiBbX3N0ZXBTaXplWCwgX3N0ZXBTaXplWV0sXG4gICAgICAgIHNpemU6IF90YXJnZXRJbWFnZUFycmF5LnNoYXBlLFxuICAgICAgICB0b3BSaWdodDogX3RvcFJpZ2h0XG4gICAgfSkpO1xuXG4gICAgLyoqXG4gICAgICogVXNlcyB0aGUgZ2l2ZW4gYXJyYXkgYXMgZnJhbWUtYnVmZmVyXG4gICAgICovXG4gICAgX3RoYXQuYXR0YWNoRGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgX2RhdGEgPSBkYXRhO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB1c2VkIGZyYW1lLWJ1ZmZlclxuICAgICAqL1xuICAgIF90aGF0LmdldERhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9kYXRhO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGZXRjaGVzIGEgZnJhbWUgZnJvbSB0aGUgaW5wdXQtc3RyZWFtIGFuZCBwdXRzIGludG8gdGhlIGZyYW1lLWJ1ZmZlci5cbiAgICAgKiBUaGUgaW1hZ2UtZGF0YSBpcyBjb252ZXJ0ZWQgdG8gZ3JheS1zY2FsZSBhbmQgdGhlbiBoYWxmLXNhbXBsZWQgaWYgY29uZmlndXJlZC5cbiAgICAgKi9cbiAgICBfdGhhdC5ncmFiID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmcmFtZSA9IGlucHV0U3RyZWFtLmdldEZyYW1lKCk7XG5cbiAgICAgICAgaWYgKGZyYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnNjYWxlQW5kQ3JvcChmcmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBfdGhhdC5zY2FsZUFuZENyb3AgPSBmdW5jdGlvbihmcmFtZSkge1xuICAgICAgICB2YXIgeCxcbiAgICAgICAgICAgIHk7XG5cbiAgICAgICAgLy8gMS4gY29tcHV0ZSBmdWxsLXNpemVkIGdyYXkgaW1hZ2VcbiAgICAgICAgQ1ZVdGlscy5jb21wdXRlR3JheShmcmFtZS5kYXRhLCBfZ3JheURhdGEpO1xuXG4gICAgICAgIC8vIDIuIGludGVycG9sYXRlXG4gICAgICAgIGZvciAoeSA9IDA7IHkgPCBfY2FudmFzU2l6ZS55OyB5KyspIHtcbiAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCBfY2FudmFzU2l6ZS54OyB4KyspIHtcbiAgICAgICAgICAgICAgICBfY2FudmFzSW1hZ2VBcnJheS5zZXQoeCwgeSwgKEludGVycDJEKF9ncmF5SW1hZ2VBcnJheSwgeCAqIF9zdGVwU2l6ZVgsIHkgKiBfc3RlcFNpemVZKSkgfCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRhcmdldEltYWdlQXJyYXkgbXVzdCBiZSBlcXVhbCB0byB0YXJnZXRTaXplXG4gICAgICAgIGlmIChfdGFyZ2V0SW1hZ2VBcnJheS5zaGFwZVswXSAhPT0gX3NpemUueCB8fFxuICAgICAgICAgICAgX3RhcmdldEltYWdlQXJyYXkuc2hhcGVbMV0gIT09IF9zaXplLnkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoYXBlcyBkbyBub3QgbWF0Y2ghXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gMy4gY3JvcFxuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgX3NpemUueTsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgX3NpemUueDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgX2RhdGFbeSAqIF9zaXplLnggKyB4XSA9IF90YXJnZXRJbWFnZUFycmF5LmdldCh4LCB5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdGhhdC5nZXRTaXplID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfc2l6ZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIF90aGF0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBGcmFtZUdyYWJiZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvZnJhbWVfZ3JhYmJlci5qcyIsImNvbnN0IEdldFBpeGVscyA9IHJlcXVpcmUoXCJnZXQtcGl4ZWxzXCIpO1xuXG52YXIgSW5wdXRTdHJlYW0gPSB7fTtcblxuSW5wdXRTdHJlYW0uY3JlYXRlSW1hZ2VTdHJlYW0gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGhhdCA9IHt9O1xuICAgIHZhciBfY29uZmlnID0gbnVsbDtcblxuICAgIHZhciB3aWR0aCA9IDAsXG4gICAgICAgIGhlaWdodCA9IDAsXG4gICAgICAgIGZyYW1lSWR4ID0gMCxcbiAgICAgICAgcGF1c2VkID0gdHJ1ZSxcbiAgICAgICAgbG9hZGVkID0gZmFsc2UsXG4gICAgICAgIGZyYW1lID0gbnVsbCxcbiAgICAgICAgYmFzZVVybCxcbiAgICAgICAgZW5kZWQgPSBmYWxzZSxcbiAgICAgICAgc2l6ZSxcbiAgICAgICAgY2FsY3VsYXRlZFdpZHRoLFxuICAgICAgICBjYWxjdWxhdGVkSGVpZ2h0LFxuICAgICAgICBfZXZlbnROYW1lcyA9IFsnY2FucmVjb3JkJywgJ2VuZGVkJ10sXG4gICAgICAgIF9ldmVudEhhbmRsZXJzID0ge30sXG4gICAgICAgIF90b3BSaWdodCA9IHt4OiAwLCB5OiAwfSxcbiAgICAgICAgX2NhbnZhc1NpemUgPSB7eDogMCwgeTogMH07XG5cbiAgICBmdW5jdGlvbiBsb2FkSW1hZ2VzKCkge1xuICAgICAgICBsb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgR2V0UGl4ZWxzKGJhc2VVcmwsIF9jb25maWcubWltZSwgZnVuY3Rpb24oZXJyLCBwaXhlbHMpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgIGV4aXQoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocGl4ZWxzLnNoYXBlKTtcbiAgICAgICAgICAgIGZyYW1lID0gcGl4ZWxzO1xuICAgICAgICAgICAgd2lkdGggPSBwaXhlbHMuc2hhcGVbMF07XG4gICAgICAgICAgICBoZWlnaHQgPSBwaXhlbHMuc2hhcGVbMV07XG4gICAgICAgICAgICBjYWxjdWxhdGVkV2lkdGggPSBfY29uZmlnLnNpemUgPyB3aWR0aC9oZWlnaHQgPiAxID8gX2NvbmZpZy5zaXplIDogTWF0aC5mbG9vcigod2lkdGgvaGVpZ2h0KSAqIF9jb25maWcuc2l6ZSkgOiB3aWR0aDtcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRIZWlnaHQgPSBfY29uZmlnLnNpemUgPyB3aWR0aC9oZWlnaHQgPiAxID8gTWF0aC5mbG9vcigoaGVpZ2h0L3dpZHRoKSAqIF9jb25maWcuc2l6ZSkgOiBfY29uZmlnLnNpemUgOiBoZWlnaHQ7XG5cbiAgICAgICAgICAgIF9jYW52YXNTaXplLnggPSBjYWxjdWxhdGVkV2lkdGg7XG4gICAgICAgICAgICBfY2FudmFzU2l6ZS55ID0gY2FsY3VsYXRlZEhlaWdodDtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwdWJsaXNoRXZlbnQoXCJjYW5yZWNvcmRcIiwgW10pO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHB1Ymxpc2hFdmVudChldmVudE5hbWUsIGFyZ3MpIHtcbiAgICAgICAgdmFyIGosXG4gICAgICAgICAgICBoYW5kbGVycyA9IF9ldmVudEhhbmRsZXJzW2V2ZW50TmFtZV07XG5cbiAgICAgICAgaWYgKGhhbmRsZXJzICYmIGhhbmRsZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgaGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyc1tqXS5hcHBseSh0aGF0LCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgdGhhdC50cmlnZ2VyID0gcHVibGlzaEV2ZW50O1xuXG4gICAgdGhhdC5nZXRXaWR0aCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gY2FsY3VsYXRlZFdpZHRoO1xuICAgIH07XG5cbiAgICB0aGF0LmdldEhlaWdodCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gY2FsY3VsYXRlZEhlaWdodDtcbiAgICB9O1xuXG4gICAgdGhhdC5zZXRXaWR0aCA9IGZ1bmN0aW9uKHdpZHRoKSB7XG4gICAgICAgIGNhbGN1bGF0ZWRXaWR0aCA9IHdpZHRoO1xuICAgIH07XG5cbiAgICB0aGF0LnNldEhlaWdodCA9IGZ1bmN0aW9uKGhlaWdodCkge1xuICAgICAgICBjYWxjdWxhdGVkSGVpZ2h0ID0gaGVpZ2h0O1xuICAgIH07XG5cbiAgICB0aGF0LmdldFJlYWxXaWR0aCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gd2lkdGg7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UmVhbEhlaWdodCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaGVpZ2h0O1xuICAgIH07XG5cbiAgICB0aGF0LnNldElucHV0U3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgIF9jb25maWcgPSBzdHJlYW07XG4gICAgICAgIGJhc2VVcmwgPSBfY29uZmlnLnNyYztcbiAgICAgICAgc2l6ZSA9IDE7XG4gICAgICAgIGxvYWRJbWFnZXMoKTtcbiAgICB9O1xuXG4gICAgdGhhdC5lbmRlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZW5kZWQ7XG4gICAgfTtcblxuICAgIHRoYXQuc2V0QXR0cmlidXRlID0gZnVuY3Rpb24oKSB7fTtcblxuICAgIHRoYXQuZ2V0Q29uZmlnID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfY29uZmlnO1xuICAgIH07XG5cbiAgICB0aGF0LnBhdXNlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhdXNlZCA9IHRydWU7XG4gICAgfTtcblxuICAgIHRoYXQucGxheSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXVzZWQgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgdGhhdC5zZXRDdXJyZW50VGltZSA9IGZ1bmN0aW9uKHRpbWUpIHtcbiAgICAgICAgZnJhbWVJZHggPSB0aW1lO1xuICAgIH07XG5cbiAgICB0aGF0LmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZikge1xuICAgICAgICBpZiAoX2V2ZW50TmFtZXMuaW5kZXhPZihldmVudCkgIT09IC0xKSB7XG4gICAgICAgICAgICBpZiAoIV9ldmVudEhhbmRsZXJzW2V2ZW50XSkge1xuICAgICAgICAgICAgICAgIF9ldmVudEhhbmRsZXJzW2V2ZW50XSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2V2ZW50SGFuZGxlcnNbZXZlbnRdLnB1c2goZik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5zZXRUb3BSaWdodCA9IGZ1bmN0aW9uKHRvcFJpZ2h0KSB7XG4gICAgICAgIF90b3BSaWdodC54ID0gdG9wUmlnaHQueDtcbiAgICAgICAgX3RvcFJpZ2h0LnkgPSB0b3BSaWdodC55O1xuICAgIH07XG5cbiAgICB0aGF0LmdldFRvcFJpZ2h0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfdG9wUmlnaHQ7XG4gICAgfTtcblxuICAgIHRoYXQuc2V0Q2FudmFzU2l6ZSA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgICAgICAgX2NhbnZhc1NpemUueCA9IHNpemUueDtcbiAgICAgICAgX2NhbnZhc1NpemUueSA9IHNpemUueTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRDYW52YXNTaXplID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfY2FudmFzU2l6ZTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRGcmFtZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIWxvYWRlZCl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZnJhbWU7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dFN0cmVhbTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9pbnB1dF9zdHJlYW0uanMiLCJpbXBvcnQgSW1hZ2VEZWJ1ZyBmcm9tICcuLi9jb21tb24vaW1hZ2VfZGVidWcnO1xuXG5mdW5jdGlvbiBjb250YWlucyhjb2RlUmVzdWx0LCBsaXN0KSB7XG4gICAgaWYgKGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIGxpc3Quc29tZShmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGl0ZW0pLmV2ZXJ5KGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbVtrZXldID09PSBjb2RlUmVzdWx0W2tleV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcGFzc2VzRmlsdGVyKGNvZGVSZXN1bHQsIGZpbHRlcikge1xuICAgIGlmICh0eXBlb2YgZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBmaWx0ZXIoY29kZVJlc3VsdCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY3JlYXRlOiBmdW5jdGlvbihjb25maWcpIHtcbiAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksXG4gICAgICAgICAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLFxuICAgICAgICAgICAgcmVzdWx0cyA9IFtdLFxuICAgICAgICAgICAgY2FwYWNpdHkgPSBjb25maWcuY2FwYWNpdHkgfHwgMjAsXG4gICAgICAgICAgICBjYXB0dXJlID0gY29uZmlnLmNhcHR1cmUgPT09IHRydWU7XG5cbiAgICAgICAgZnVuY3Rpb24gbWF0Y2hlc0NvbnN0cmFpbnRzKGNvZGVSZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBjYXBhY2l0eVxuICAgICAgICAgICAgICAgICYmIGNvZGVSZXN1bHRcbiAgICAgICAgICAgICAgICAmJiAhY29udGFpbnMoY29kZVJlc3VsdCwgY29uZmlnLmJsYWNrbGlzdClcbiAgICAgICAgICAgICAgICAmJiBwYXNzZXNGaWx0ZXIoY29kZVJlc3VsdCwgY29uZmlnLmZpbHRlcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWRkUmVzdWx0OiBmdW5jdGlvbihkYXRhLCBpbWFnZVNpemUsIGNvZGVSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0ge307XG5cbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlc0NvbnN0cmFpbnRzKGNvZGVSZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhcGFjaXR5LS07XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5jb2RlUmVzdWx0ID0gY29kZVJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhcHR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IGltYWdlU2l6ZS54O1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IGltYWdlU2l6ZS55O1xuICAgICAgICAgICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3SW1hZ2UoZGF0YSwgaW1hZ2VTaXplLCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmZyYW1lID0gY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRSZXN1bHRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FuYWx5dGljcy9yZXN1bHRfY29sbGVjdG9yLmpzIiwiY29uc3QgdmVjMiA9IHtcbiAgICBjbG9uZTogcmVxdWlyZSgnZ2wtdmVjMi9jbG9uZScpLFxuICAgIGRvdDogcmVxdWlyZSgnZ2wtdmVjMi9kb3QnKVxufVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBjbHVzdGVyIGZvciBncm91cGluZyBzaW1pbGFyIG9yaWVudGF0aW9ucyBvZiBkYXRhcG9pbnRzXG4gICAgICovXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY3JlYXRlOiBmdW5jdGlvbihwb2ludCwgdGhyZXNob2xkKSB7XG4gICAgICAgIHZhciBwb2ludHMgPSBbXSxcbiAgICAgICAgICAgIGNlbnRlciA9IHtcbiAgICAgICAgICAgICAgICByYWQ6IDAsXG4gICAgICAgICAgICAgICAgdmVjOiB2ZWMyLmNsb25lKFswLCAwXSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwb2ludE1hcCA9IHt9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICBhZGQocG9pbnQpO1xuICAgICAgICAgICAgdXBkYXRlQ2VudGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGQocG9pbnRUb0FkZCkge1xuICAgICAgICAgICAgcG9pbnRNYXBbcG9pbnRUb0FkZC5pZF0gPSBwb2ludFRvQWRkO1xuICAgICAgICAgICAgcG9pbnRzLnB1c2gocG9pbnRUb0FkZCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVDZW50ZXIoKSB7XG4gICAgICAgICAgICB2YXIgaSwgc3VtID0gMDtcbiAgICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc3VtICs9IHBvaW50c1tpXS5yYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjZW50ZXIucmFkID0gc3VtIC8gcG9pbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIGNlbnRlci52ZWMgPSB2ZWMyLmNsb25lKFtNYXRoLmNvcyhjZW50ZXIucmFkKSwgTWF0aC5zaW4oY2VudGVyLnJhZCldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluaXQoKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWRkOiBmdW5jdGlvbihwb2ludFRvQWRkKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFwb2ludE1hcFtwb2ludFRvQWRkLmlkXSkge1xuICAgICAgICAgICAgICAgICAgICBhZGQocG9pbnRUb0FkZCk7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUNlbnRlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaXRzOiBmdW5jdGlvbihvdGhlclBvaW50KSB7XG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgY29zaW5lIHNpbWlsYXJpdHkgdG8gY2VudGVyLWFuZ2xlXG4gICAgICAgICAgICAgICAgdmFyIHNpbWlsYXJpdHkgPSBNYXRoLmFicyh2ZWMyLmRvdChvdGhlclBvaW50LnBvaW50LnZlYywgY2VudGVyLnZlYykpO1xuICAgICAgICAgICAgICAgIGlmIChzaW1pbGFyaXR5ID4gdGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0UG9pbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9pbnRzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldENlbnRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNlbnRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGNyZWF0ZVBvaW50OiBmdW5jdGlvbihuZXdQb2ludCwgaWQsIHByb3BlcnR5KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByYWQ6IG5ld1BvaW50W3Byb3BlcnR5XSxcbiAgICAgICAgICAgIHBvaW50OiBuZXdQb2ludCxcbiAgICAgICAgICAgIGlkOiBpZFxuICAgICAgICB9O1xuICAgIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uL2NsdXN0ZXIuanMiLCJleHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGV2ZW50cyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gZ2V0RXZlbnQoZXZlbnROYW1lKSB7XG4gICAgICAgIGlmICghZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgIGV2ZW50c1tldmVudE5hbWVdID0ge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXJzOiBbXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXZlbnRzW2V2ZW50TmFtZV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJFdmVudHMoKXtcbiAgICAgICAgZXZlbnRzID0ge307XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHVibGlzaFN1YnNjcmlwdGlvbihzdWJzY3JpcHRpb24sIGRhdGEpIHtcbiAgICAgICAgaWYgKHN1YnNjcmlwdGlvbi5hc3luYykge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24uY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgICB9LCA0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5jYWxsYmFjayhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN1YnNjcmliZShldmVudCwgY2FsbGJhY2ssIGFzeW5jKSB7XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb247XG5cbiAgICAgICAgaWYgKCB0eXBlb2YgY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgICAgICAgICAgICBhc3luYzogYXN5bmNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24gPSBjYWxsYmFjaztcbiAgICAgICAgICAgIGlmICghc3Vic2NyaXB0aW9uLmNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgXCJDYWxsYmFjayB3YXMgbm90IHNwZWNpZmllZCBvbiBvcHRpb25zXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBnZXRFdmVudChldmVudCkuc3Vic2NyaWJlcnMucHVzaChzdWJzY3JpcHRpb24pO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrLCBhc3luYykge1xuICAgICAgICAgICAgcmV0dXJuIHN1YnNjcmliZShldmVudCwgY2FsbGJhY2ssIGFzeW5jKTtcbiAgICAgICAgfSxcbiAgICAgICAgcHVibGlzaDogZnVuY3Rpb24oZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBnZXRFdmVudChldmVudE5hbWUpLFxuICAgICAgICAgICAgICAgIHN1YnNjcmliZXJzID0gZXZlbnQuc3Vic2NyaWJlcnM7XG5cbiAgICAgICAgICAgIC8vIFB1Ymxpc2ggb25lLXRpbWUgc3Vic2NyaXB0aW9uc1xuICAgICAgICAgICAgc3Vic2NyaWJlcnMuZmlsdGVyKGZ1bmN0aW9uKHN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFzdWJzY3JpYmVyLm9uY2U7XG4gICAgICAgICAgICB9KS5mb3JFYWNoKChzdWJzY3JpYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgcHVibGlzaFN1YnNjcmlwdGlvbihzdWJzY3JpYmVyLCBkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlbSBmcm9tIHRoZSBzdWJzY3JpYmVyXG4gICAgICAgICAgICBldmVudC5zdWJzY3JpYmVycyA9IHN1YnNjcmliZXJzLmZpbHRlcihmdW5jdGlvbihzdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFzdWJzY3JpYmVyLm9uY2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gcHVibGlzaCB0aGUgcmVzdFxuICAgICAgICAgICAgZXZlbnQuc3Vic2NyaWJlcnMuZm9yRWFjaCgoc3Vic2NyaWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIHB1Ymxpc2hTdWJzY3JpcHRpb24oc3Vic2NyaWJlciwgZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25jZTogZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrLCBhc3luYykge1xuICAgICAgICAgICAgc3Vic2NyaWJlKGV2ZW50LCB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgIGFzeW5jOiBhc3luYyxcbiAgICAgICAgICAgICAgICBvbmNlOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBldmVudDtcblxuICAgICAgICAgICAgaWYgKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgICAgIGV2ZW50ID0gZ2V0RXZlbnQoZXZlbnROYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQgJiYgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3Vic2NyaWJlcnMgPSBldmVudC5zdWJzY3JpYmVycy5maWx0ZXIoZnVuY3Rpb24oc3Vic2NyaWJlcil7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3Vic2NyaWJlci5jYWxsYmFjayAhPT0gY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN1YnNjcmliZXJzID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbGVhckV2ZW50cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn0pKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uL2V2ZW50cy5qcyIsIlxuZXhwb3J0IGZ1bmN0aW9uIGVudW1lcmF0ZURldmljZXMoKSB7XG4gICAgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXNcbiAgICAgICAgICAgICYmIHR5cGVvZiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdlbnVtZXJhdGVEZXZpY2VzIGlzIG5vdCBkZWZpbmVkJykpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJNZWRpYShjb25zdHJhaW50cykge1xuICAgIGlmIChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzXG4gICAgICAgICAgICAmJiB0eXBlb2YgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5tZWRpYURldmljZXNcbiAgICAgICAgICAgIC5nZXRVc2VyTWVkaWEoY29uc3RyYWludHMpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdnZXRVc2VyTWVkaWEgaXMgbm90IGRlZmluZWQnKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uL21lZGlhRGV2aWNlcy5qcyIsIi8qKlxuICogQ29uc3RydWN0IHJlcHJlc2VudGluZyBhIHBhcnQgb2YgYW5vdGhlciB7SW1hZ2VXcmFwcGVyfS4gU2hhcmVzIGRhdGFcbiAqIGJldHdlZW4gdGhlIHBhcmVudCBhbmQgdGhlIGNoaWxkLlxuICogQHBhcmFtIGZyb20ge0ltYWdlUmVmfSBUaGUgcG9zaXRpb24gd2hlcmUgdG8gc3RhcnQgdGhlIHtTdWJJbWFnZX0gZnJvbS4gKHRvcC1sZWZ0IGNvcm5lcilcbiAqIEBwYXJhbSBzaXplIHtJbWFnZVJlZn0gVGhlIHNpemUgb2YgdGhlIHJlc3VsdGluZyBpbWFnZVxuICogQHBhcmFtIEkge0ltYWdlV3JhcHBlcn0gVGhlIHtJbWFnZVdyYXBwZXJ9IHRvIHNoYXJlIGZyb21cbiAqIEByZXR1cm5zIHtTdWJJbWFnZX0gQSBzaGFyZWQgcGFydCBvZiB0aGUgb3JpZ2luYWwgaW1hZ2VcbiAqL1xuZnVuY3Rpb24gU3ViSW1hZ2UoZnJvbSwgc2l6ZSwgSSkge1xuICAgIGlmICghSSkge1xuICAgICAgICBJID0ge1xuICAgICAgICAgICAgZGF0YTogbnVsbCxcbiAgICAgICAgICAgIHNpemU6IHNpemVcbiAgICAgICAgfTtcbiAgICB9XG4gICAgdGhpcy5kYXRhID0gSS5kYXRhO1xuICAgIHRoaXMub3JpZ2luYWxTaXplID0gSS5zaXplO1xuICAgIHRoaXMuSSA9IEk7XG5cbiAgICB0aGlzLmZyb20gPSBmcm9tO1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG59XG5cbi8qKlxuICogRGlzcGxheXMgdGhlIHtTdWJJbWFnZX0gaW4gYSBnaXZlbiBjYW52YXNcbiAqIEBwYXJhbSBjYW52YXMge0NhbnZhc30gVGhlIGNhbnZhcyBlbGVtZW50IHRvIHdyaXRlIHRvXG4gKiBAcGFyYW0gc2NhbGUge051bWJlcn0gU2NhbGUgd2hpY2ggaXMgYXBwbGllZCB0byBlYWNoIHBpeGVsLXZhbHVlXG4gKi9cblN1YkltYWdlLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oY2FudmFzLCBzY2FsZSkge1xuICAgIHZhciBjdHgsXG4gICAgICAgIGZyYW1lLFxuICAgICAgICBkYXRhLFxuICAgICAgICBjdXJyZW50LFxuICAgICAgICB5LFxuICAgICAgICB4LFxuICAgICAgICBwaXhlbDtcblxuICAgIGlmICghc2NhbGUpIHtcbiAgICAgICAgc2NhbGUgPSAxLjA7XG4gICAgfVxuICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGNhbnZhcy53aWR0aCA9IHRoaXMuc2l6ZS54O1xuICAgIGNhbnZhcy5oZWlnaHQgPSB0aGlzLnNpemUueTtcbiAgICBmcmFtZSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBkYXRhID0gZnJhbWUuZGF0YTtcbiAgICBjdXJyZW50ID0gMDtcbiAgICBmb3IgKHkgPSAwOyB5IDwgdGhpcy5zaXplLnk7IHkrKykge1xuICAgICAgICBmb3IgKHggPSAwOyB4IDwgdGhpcy5zaXplLng7IHgrKykge1xuICAgICAgICAgICAgcGl4ZWwgPSB5ICogdGhpcy5zaXplLnggKyB4O1xuICAgICAgICAgICAgY3VycmVudCA9IHRoaXMuZ2V0KHgsIHkpICogc2NhbGU7XG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDBdID0gY3VycmVudDtcbiAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMV0gPSBjdXJyZW50O1xuICAgICAgICAgICAgZGF0YVtwaXhlbCAqIDQgKyAyXSA9IGN1cnJlbnQ7XG4gICAgICAgICAgICBkYXRhW3BpeGVsICogNCArIDNdID0gMjU1O1xuICAgICAgICB9XG4gICAgfVxuICAgIGZyYW1lLmRhdGEgPSBkYXRhO1xuICAgIGN0eC5wdXRJbWFnZURhdGEoZnJhbWUsIDAsIDApO1xufTtcblxuLyoqXG4gKiBSZXRyaWV2ZXMgYSBnaXZlbiBwaXhlbCBwb3NpdGlvbiBmcm9tIHRoZSB7U3ViSW1hZ2V9XG4gKiBAcGFyYW0geCB7TnVtYmVyfSBUaGUgeC1wb3NpdGlvblxuICogQHBhcmFtIHkge051bWJlcn0gVGhlIHktcG9zaXRpb25cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBncmF5c2NhbGUgdmFsdWUgYXQgdGhlIHBpeGVsLXBvc2l0aW9uXG4gKi9cblN1YkltYWdlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVsodGhpcy5mcm9tLnkgKyB5KSAqIHRoaXMub3JpZ2luYWxTaXplLnggKyB0aGlzLmZyb20ueCArIHhdO1xufTtcblxuLyoqXG4gKiBVcGRhdGVzIHRoZSB1bmRlcmx5aW5nIGRhdGEgZnJvbSBhIGdpdmVuIHtJbWFnZVdyYXBwZXJ9XG4gKiBAcGFyYW0gaW1hZ2Uge0ltYWdlV3JhcHBlcn0gVGhlIHVwZGF0ZWQgaW1hZ2VcbiAqL1xuU3ViSW1hZ2UucHJvdG90eXBlLnVwZGF0ZURhdGEgPSBmdW5jdGlvbihpbWFnZSkge1xuICAgIHRoaXMub3JpZ2luYWxTaXplID0gaW1hZ2Uuc2l6ZTtcbiAgICB0aGlzLmRhdGEgPSBpbWFnZS5kYXRhO1xufTtcblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgc2hhcmVkIGFyZWFcbiAqIEBwYXJhbSBmcm9tIHt4LHl9IFRoZSBuZXcgbG9jYXRpb25cbiAqIEByZXR1cm5zIHtTdWJJbWFnZX0gcmV0dXJucyB7dGhpc30gZm9yIHBvc3NpYmxlIGNoYWluaW5nXG4gKi9cblN1YkltYWdlLnByb3RvdHlwZS51cGRhdGVGcm9tID0gZnVuY3Rpb24oZnJvbSkge1xuICAgIHRoaXMuZnJvbSA9IGZyb207XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5leHBvcnQgZGVmYXVsdCAoU3ViSW1hZ2UpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi9zdWJJbWFnZS5qcyIsIi8qXG4gKiB0eXBlZGVmcy5qc1xuICogTm9ybWFsaXplcyBicm93c2VyLXNwZWNpZmljIHByZWZpeGVzXG4gKi9cblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2luZG93LnJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKC8qIGZ1bmN0aW9uIEZyYW1lUmVxdWVzdENhbGxiYWNrICovIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4gICAgICAgICAgICB9O1xuICAgIH0pKCk7XG59XG5NYXRoLmltdWwgPSBNYXRoLmltdWwgfHwgZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciBhaCA9IChhID4+PiAxNikgJiAweGZmZmYsXG4gICAgICAgIGFsID0gYSAmIDB4ZmZmZixcbiAgICAgICAgYmggPSAoYiA+Pj4gMTYpICYgMHhmZmZmLFxuICAgICAgICBibCA9IGIgJiAweGZmZmY7XG4gICAgLy8gdGhlIHNoaWZ0IGJ5IDAgZml4ZXMgdGhlIHNpZ24gb24gdGhlIGhpZ2ggcGFydFxuICAgIC8vIHRoZSBmaW5hbCB8MCBjb252ZXJ0cyB0aGUgdW5zaWduZWQgdmFsdWUgaW50byBhIHNpZ25lZCB2YWx1ZVxuICAgIHJldHVybiAoKGFsICogYmwpICsgKCgoYWggKiBibCArIGFsICogYmgpIDw8IDE2KSA+Pj4gMCkgfCAwKTtcbn07XG5cbmlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIE9iamVjdC5hc3NpZ24gPSBmdW5jdGlvbih0YXJnZXQpIHsgLy8gLmxlbmd0aCBvZiBmdW5jdGlvbiBpcyAyXG4gICAgICAgICd1c2Ugc3RyaWN0JztcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gbnVsbCkgeyAvLyBUeXBlRXJyb3IgaWYgdW5kZWZpbmVkIG9yIG51bGxcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG5cbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIHZhciBuZXh0U291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcblxuICAgICAgICAgICAgaWYgKG5leHRTb3VyY2UgIT09IG51bGwpIHsgLy8gU2tpcCBvdmVyIGlmIHVuZGVmaW5lZCBvciBudWxsXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbmV4dEtleSBpbiBuZXh0U291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEF2b2lkIGJ1Z3Mgd2hlbiBoYXNPd25Qcm9wZXJ0eSBpcyBzaGFkb3dlZFxuICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5leHRTb3VyY2UsIG5leHRLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvO1xuICAgIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uL3R5cGVkZWZzLmpzIiwibGV0IGNvbmZpZztcblxuaWYgKEVOVi5kZXZlbG9wbWVudCl7XG4gICAgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcuZGV2LmpzJyk7XG59IGVsc2UgaWYgKEVOVi5ub2RlKSB7XG4gICAgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcubm9kZS5qcycpO1xufSBlbHNlIHtcbiAgICBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZy5wcm9kLmpzJyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25maWcvY29uZmlnLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5wdXRTdHJlYW06IHtcbiAgICAgICAgdHlwZTogXCJJbWFnZVN0cmVhbVwiLFxuICAgICAgICBzZXF1ZW5jZTogZmFsc2UsXG4gICAgICAgIHNpemU6IDgwMCxcbiAgICAgICAgYXJlYToge1xuICAgICAgICAgICAgdG9wOiBcIjAlXCIsXG4gICAgICAgICAgICByaWdodDogXCIwJVwiLFxuICAgICAgICAgICAgbGVmdDogXCIwJVwiLFxuICAgICAgICAgICAgYm90dG9tOiBcIjAlXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2luZ2xlQ2hhbm5lbDogZmFsc2UgLy8gdHJ1ZTogb25seSB0aGUgcmVkIGNvbG9yLWNoYW5uZWwgaXMgcmVhZFxuICAgIH0sXG4gICAgbG9jYXRlOiB0cnVlLFxuICAgIG51bU9mV29ya2VyczogMCxcbiAgICBkZWNvZGVyOiB7XG4gICAgICAgIHJlYWRlcnM6IFtcbiAgICAgICAgICAgICdjb2RlXzEyOF9yZWFkZXInXG4gICAgICAgIF1cbiAgICB9LFxuICAgIGxvY2F0b3I6IHtcbiAgICAgICAgaGFsZlNhbXBsZTogdHJ1ZSxcbiAgICAgICAgcGF0Y2hTaXplOiBcIm1lZGl1bVwiIC8vIHgtc21hbGwsIHNtYWxsLCBtZWRpdW0sIGxhcmdlLCB4LWxhcmdlXG4gICAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25maWcvY29uZmlnLm5vZGUuanMiLCJpbXBvcnQgQnJlc2VuaGFtIGZyb20gJy4vYnJlc2VuaGFtJztcbmltcG9ydCBJbWFnZURlYnVnIGZyb20gJy4uL2NvbW1vbi9pbWFnZV9kZWJ1Zyc7XG5pbXBvcnQgQ29kZTEyOFJlYWRlciBmcm9tICcuLi9yZWFkZXIvY29kZV8xMjhfcmVhZGVyJztcbmltcG9ydCBFQU5SZWFkZXIgZnJvbSAnLi4vcmVhZGVyL2Vhbl9yZWFkZXInO1xuaW1wb3J0IENvZGUzOVJlYWRlciBmcm9tICcuLi9yZWFkZXIvY29kZV8zOV9yZWFkZXInO1xuaW1wb3J0IENvZGUzOVZJTlJlYWRlciBmcm9tICcuLi9yZWFkZXIvY29kZV8zOV92aW5fcmVhZGVyJztcbmltcG9ydCBDb2RhYmFyUmVhZGVyIGZyb20gJy4uL3JlYWRlci9jb2RhYmFyX3JlYWRlcic7XG5pbXBvcnQgVVBDUmVhZGVyIGZyb20gJy4uL3JlYWRlci91cGNfcmVhZGVyJztcbmltcG9ydCBFQU44UmVhZGVyIGZyb20gJy4uL3JlYWRlci9lYW5fOF9yZWFkZXInO1xuaW1wb3J0IEVBTjJSZWFkZXIgZnJvbSAnLi4vcmVhZGVyL2Vhbl8yX3JlYWRlcic7XG5pbXBvcnQgRUFONVJlYWRlciBmcm9tICcuLi9yZWFkZXIvZWFuXzVfcmVhZGVyJztcbmltcG9ydCBVUENFUmVhZGVyIGZyb20gJy4uL3JlYWRlci91cGNfZV9yZWFkZXInO1xuaW1wb3J0IEkyb2Y1UmVhZGVyIGZyb20gJy4uL3JlYWRlci9pMm9mNV9yZWFkZXInO1xuXG5jb25zdCBSRUFERVJTID0ge1xuICAgIGNvZGVfMTI4X3JlYWRlcjogQ29kZTEyOFJlYWRlcixcbiAgICBlYW5fcmVhZGVyOiBFQU5SZWFkZXIsXG4gICAgZWFuXzVfcmVhZGVyOiBFQU41UmVhZGVyLFxuICAgIGVhbl8yX3JlYWRlcjogRUFOMlJlYWRlcixcbiAgICBlYW5fOF9yZWFkZXI6IEVBTjhSZWFkZXIsXG4gICAgY29kZV8zOV9yZWFkZXI6IENvZGUzOVJlYWRlcixcbiAgICBjb2RlXzM5X3Zpbl9yZWFkZXI6IENvZGUzOVZJTlJlYWRlcixcbiAgICBjb2RhYmFyX3JlYWRlcjogQ29kYWJhclJlYWRlcixcbiAgICB1cGNfcmVhZGVyOiBVUENSZWFkZXIsXG4gICAgdXBjX2VfcmVhZGVyOiBVUENFUmVhZGVyLFxuICAgIGkyb2Y1X3JlYWRlcjogSTJvZjVSZWFkZXJcbn07XG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY3JlYXRlOiBmdW5jdGlvbihjb25maWcsIGlucHV0SW1hZ2VXcmFwcGVyKSB7XG4gICAgICAgIHZhciBfY2FudmFzID0ge1xuICAgICAgICAgICAgICAgIGN0eDoge1xuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IG51bGxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRvbToge1xuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IG51bGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2JhcmNvZGVSZWFkZXJzID0gW107XG5cbiAgICAgICAgaW5pdENhbnZhcygpO1xuICAgICAgICBpbml0UmVhZGVycygpO1xuICAgICAgICBpbml0Q29uZmlnKCk7XG5cbiAgICAgICAgZnVuY3Rpb24gaW5pdENhbnZhcygpIHtcbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHZhciAkZGVidWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlYnVnLmRldGVjdGlvblwiKTtcbiAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5mcmVxdWVuY3kgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzLmZyZXF1ZW5jeVwiKTtcbiAgICAgICAgICAgICAgICBpZiAoIV9jYW52YXMuZG9tLmZyZXF1ZW5jeSkge1xuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5mcmVxdWVuY3kgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5mcmVxdWVuY3kuY2xhc3NOYW1lID0gXCJmcmVxdWVuY3lcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRkZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGRlYnVnLmFwcGVuZENoaWxkKF9jYW52YXMuZG9tLmZyZXF1ZW5jeSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX2NhbnZhcy5jdHguZnJlcXVlbmN5ID0gX2NhbnZhcy5kb20uZnJlcXVlbmN5LmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgICAgICAgICAgIF9jYW52YXMuZG9tLnBhdHRlcm4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzLnBhdHRlcm5CdWZmZXJcIik7XG4gICAgICAgICAgICAgICAgaWYgKCFfY2FudmFzLmRvbS5wYXR0ZXJuKSB7XG4gICAgICAgICAgICAgICAgICAgIF9jYW52YXMuZG9tLnBhdHRlcm4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmRvbS5wYXR0ZXJuLmNsYXNzTmFtZSA9IFwicGF0dGVybkJ1ZmZlclwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAoJGRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZGVidWcuYXBwZW5kQ2hpbGQoX2NhbnZhcy5kb20ucGF0dGVybik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX2NhbnZhcy5jdHgucGF0dGVybiA9IF9jYW52YXMuZG9tLnBhdHRlcm4uZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICAgICAgICAgICAgX2NhbnZhcy5kb20ub3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjYW52YXMuZHJhd2luZ0J1ZmZlclwiKTtcbiAgICAgICAgICAgICAgICBpZiAoX2NhbnZhcy5kb20ub3ZlcmxheSkge1xuICAgICAgICAgICAgICAgICAgICBfY2FudmFzLmN0eC5vdmVybGF5ID0gX2NhbnZhcy5kb20ub3ZlcmxheS5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaW5pdFJlYWRlcnMoKSB7XG4gICAgICAgICAgICBjb25maWcucmVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHJlYWRlckNvbmZpZykge1xuICAgICAgICAgICAgICAgIHZhciByZWFkZXIsXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24gPSB7fSxcbiAgICAgICAgICAgICAgICAgICAgc3VwcGxlbWVudHMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVhZGVyQ29uZmlnID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICByZWFkZXIgPSByZWFkZXJDb25maWcuZm9ybWF0O1xuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uID0gcmVhZGVyQ29uZmlnLmNvbmZpZztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZWFkZXJDb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlciA9IHJlYWRlckNvbmZpZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJlZm9yZSByZWdpc3RlcmluZyByZWFkZXI6IFwiLCByZWFkZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY29uZmlndXJhdGlvbi5zdXBwbGVtZW50cykge1xuICAgICAgICAgICAgICAgICAgICBzdXBwbGVtZW50cyA9IGNvbmZpZ3VyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdXBwbGVtZW50cy5tYXAoKHN1cHBsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJFQURFUlNbc3VwcGxlbWVudF0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfYmFyY29kZVJlYWRlcnMucHVzaChuZXcgUkVBREVSU1tyZWFkZXJdKGNvbmZpZ3VyYXRpb24sIHN1cHBsZW1lbnRzKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyZWQgUmVhZGVyczogXCIgKyBfYmFyY29kZVJlYWRlcnNcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgocmVhZGVyKSA9PiBKU09OLnN0cmluZ2lmeSh7Zm9ybWF0OiByZWFkZXIuRk9STUFULCBjb25maWc6IHJlYWRlci5jb25maWd9KSlcbiAgICAgICAgICAgICAgICAgICAgLmpvaW4oJywgJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaW5pdENvbmZpZygpIHtcbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHZhciBpLFxuICAgICAgICAgICAgICAgICAgICB2aXMgPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZTogX2NhbnZhcy5kb20uZnJlcXVlbmN5LFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogY29uZmlnLmRlYnVnLnNob3dGcmVxdWVuY3lcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZTogX2NhbnZhcy5kb20ucGF0dGVybixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IGNvbmZpZy5kZWJ1Zy5zaG93UGF0dGVyblxuICAgICAgICAgICAgICAgICAgICB9XTtcblxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB2aXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpc1tpXS5wcm9wID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNbaV0ubm9kZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlzW2ldLm5vZGUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGV4dGVuZCB0aGUgbGluZSBvbiBib3RoIGVuZHNcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gbGluZVxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gYW5nbGVcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGdldEV4dGVuZGVkTGluZShsaW5lLCBhbmdsZSwgZXh0KSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBleHRlbmRMaW5lKGFtb3VudCkge1xuICAgICAgICAgICAgICAgIHZhciBleHRlbnNpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIHk6IGFtb3VudCAqIE1hdGguc2luKGFuZ2xlKSxcbiAgICAgICAgICAgICAgICAgICAgeDogYW1vdW50ICogTWF0aC5jb3MoYW5nbGUpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGxpbmVbMF0ueSAtPSBleHRlbnNpb24ueTtcbiAgICAgICAgICAgICAgICBsaW5lWzBdLnggLT0gZXh0ZW5zaW9uLng7XG4gICAgICAgICAgICAgICAgbGluZVsxXS55ICs9IGV4dGVuc2lvbi55O1xuICAgICAgICAgICAgICAgIGxpbmVbMV0ueCArPSBleHRlbnNpb24ueDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgaW5zaWRlIGltYWdlXG4gICAgICAgICAgICBleHRlbmRMaW5lKGV4dCk7XG4gICAgICAgICAgICB3aGlsZSAoZXh0ID4gMSAmJiAoIWlucHV0SW1hZ2VXcmFwcGVyLmluSW1hZ2VXaXRoQm9yZGVyKGxpbmVbMF0sIDApXG4gICAgICAgICAgICAgICAgICAgIHx8ICFpbnB1dEltYWdlV3JhcHBlci5pbkltYWdlV2l0aEJvcmRlcihsaW5lWzFdLCAwKSkpIHtcbiAgICAgICAgICAgICAgICBleHQgLT0gTWF0aC5jZWlsKGV4dCAvIDIpO1xuICAgICAgICAgICAgICAgIGV4dGVuZExpbmUoLWV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbGluZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldExpbmUoYm94KSB7XG4gICAgICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgICAgICB4OiAoYm94WzFdWzBdIC0gYm94WzBdWzBdKSAvIDIgKyBib3hbMF1bMF0sXG4gICAgICAgICAgICAgICAgeTogKGJveFsxXVsxXSAtIGJveFswXVsxXSkgLyAyICsgYm94WzBdWzFdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgeDogKGJveFszXVswXSAtIGJveFsyXVswXSkgLyAyICsgYm94WzJdWzBdLFxuICAgICAgICAgICAgICAgIHk6IChib3hbM11bMV0gLSBib3hbMl1bMV0pIC8gMiArIGJveFsyXVsxXVxuICAgICAgICAgICAgfV07XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB0cnlEZWNvZGUobGluZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG51bGwsXG4gICAgICAgICAgICAgICAgaSxcbiAgICAgICAgICAgICAgICBiYXJjb2RlTGluZSA9IEJyZXNlbmhhbS5nZXRCYXJjb2RlTGluZShpbnB1dEltYWdlV3JhcHBlciwgbGluZVswXSwgbGluZVsxXSk7XG5cbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgY29uZmlnLmRlYnVnLnNob3dGcmVxdWVuY3kpIHtcbiAgICAgICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdQYXRoKGxpbmUsIHt4OiAneCcsIHk6ICd5J30sIF9jYW52YXMuY3R4Lm92ZXJsYXksIHtjb2xvcjogJ3JlZCcsIGxpbmVXaWR0aDogM30pO1xuICAgICAgICAgICAgICAgIEJyZXNlbmhhbS5kZWJ1Zy5wcmludEZyZXF1ZW5jeShiYXJjb2RlTGluZS5saW5lLCBfY2FudmFzLmRvbS5mcmVxdWVuY3kpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBCcmVzZW5oYW0udG9CaW5hcnlMaW5lKGJhcmNvZGVMaW5lKTtcblxuICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiBjb25maWcuZGVidWcuc2hvd1BhdHRlcm4pIHtcbiAgICAgICAgICAgICAgICBCcmVzZW5oYW0uZGVidWcucHJpbnRQYXR0ZXJuKGJhcmNvZGVMaW5lLmxpbmUsIF9jYW52YXMuZG9tLnBhdHRlcm4pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IF9iYXJjb2RlUmVhZGVycy5sZW5ndGggJiYgcmVzdWx0ID09PSBudWxsOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBfYmFyY29kZVJlYWRlcnNbaV0uZGVjb2RlUGF0dGVybihiYXJjb2RlTGluZS5saW5lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjb2RlUmVzdWx0OiByZXN1bHQsXG4gICAgICAgICAgICAgICAgYmFyY29kZUxpbmU6IGJhcmNvZGVMaW5lXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgbWV0aG9kIHNsaWNlcyB0aGUgZ2l2ZW4gYXJlYSBhcGFydCBhbmQgdHJpZXMgdG8gZGV0ZWN0IGEgYmFyY29kZS1wYXR0ZXJuXG4gICAgICAgICAqIGZvciBlYWNoIHNsaWNlLiBJdCByZXR1cm5zIHRoZSBkZWNvZGVkIGJhcmNvZGUsIG9yIG51bGwgaWYgbm90aGluZyB3YXMgZm91bmRcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gYm94XG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpbmVcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGxpbmVBbmdsZVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gdHJ5RGVjb2RlQnJ1dGVGb3JjZShib3gsIGxpbmUsIGxpbmVBbmdsZSkge1xuICAgICAgICAgICAgdmFyIHNpZGVMZW5ndGggPSBNYXRoLnNxcnQoTWF0aC5wb3coYm94WzFdWzBdIC0gYm94WzBdWzBdLCAyKSArIE1hdGgucG93KChib3hbMV1bMV0gLSBib3hbMF1bMV0pLCAyKSksXG4gICAgICAgICAgICAgICAgaSxcbiAgICAgICAgICAgICAgICBzbGljZXMgPSAxNixcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBudWxsLFxuICAgICAgICAgICAgICAgIGRpcixcbiAgICAgICAgICAgICAgICBleHRlbnNpb24sXG4gICAgICAgICAgICAgICAgeGRpciA9IE1hdGguc2luKGxpbmVBbmdsZSksXG4gICAgICAgICAgICAgICAgeWRpciA9IE1hdGguY29zKGxpbmVBbmdsZSk7XG5cbiAgICAgICAgICAgIGZvciAoIGkgPSAxOyBpIDwgc2xpY2VzICYmIHJlc3VsdCA9PT0gbnVsbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gbW92ZSBsaW5lIHBlcnBlbmRpY3VsYXIgdG8gYW5nbGVcbiAgICAgICAgICAgICAgICBkaXIgPSBzaWRlTGVuZ3RoIC8gc2xpY2VzICogaSAqIChpICUgMiA9PT0gMCA/IC0xIDogMSk7XG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uID0ge1xuICAgICAgICAgICAgICAgICAgICB5OiBkaXIgKiB4ZGlyLFxuICAgICAgICAgICAgICAgICAgICB4OiBkaXIgKiB5ZGlyXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBsaW5lWzBdLnkgKz0gZXh0ZW5zaW9uLng7XG4gICAgICAgICAgICAgICAgbGluZVswXS54IC09IGV4dGVuc2lvbi55O1xuICAgICAgICAgICAgICAgIGxpbmVbMV0ueSArPSBleHRlbnNpb24ueDtcbiAgICAgICAgICAgICAgICBsaW5lWzFdLnggLT0gZXh0ZW5zaW9uLnk7XG5cbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnlEZWNvZGUobGluZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0TGluZUxlbmd0aChsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KFxuICAgICAgICAgICAgICAgIE1hdGgucG93KE1hdGguYWJzKGxpbmVbMV0ueSAtIGxpbmVbMF0ueSksIDIpICtcbiAgICAgICAgICAgICAgICBNYXRoLnBvdyhNYXRoLmFicyhsaW5lWzFdLnggLSBsaW5lWzBdLngpLCAyKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogV2l0aCB0aGUgaGVscCBvZiB0aGUgY29uZmlndXJlZCByZWFkZXJzIChDb2RlMTI4IG9yIEVBTikgdGhpcyBmdW5jdGlvbiB0cmllcyB0byBkZXRlY3QgYVxuICAgICAgICAgKiB2YWxpZCBiYXJjb2RlIHBhdHRlcm4gd2l0aGluIHRoZSBnaXZlbiBhcmVhLlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gYm94IFRoZSBhcmVhIHRvIHNlYXJjaCBpblxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgcmVzdWx0IHtjb2RlUmVzdWx0LCBsaW5lLCBhbmdsZSwgcGF0dGVybiwgdGhyZXNob2xkfVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZGVjb2RlRnJvbUJvdW5kaW5nQm94KGJveCkge1xuICAgICAgICAgICAgdmFyIGxpbmUsXG4gICAgICAgICAgICAgICAgbGluZUFuZ2xlLFxuICAgICAgICAgICAgICAgIGN0eCA9IF9jYW52YXMuY3R4Lm92ZXJsYXksXG4gICAgICAgICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgICAgICAgIGxpbmVMZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmRlYnVnLmRyYXdCb3VuZGluZ0JveCAmJiBjdHgpIHtcbiAgICAgICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UGF0aChib3gsIHt4OiAwLCB5OiAxfSwgY3R4LCB7Y29sb3I6IFwiYmx1ZVwiLCBsaW5lV2lkdGg6IDJ9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxpbmUgPSBnZXRMaW5lKGJveCk7XG4gICAgICAgICAgICBsaW5lTGVuZ3RoID0gZ2V0TGluZUxlbmd0aChsaW5lKTtcbiAgICAgICAgICAgIGxpbmVBbmdsZSA9IE1hdGguYXRhbjIobGluZVsxXS55IC0gbGluZVswXS55LCBsaW5lWzFdLnggLSBsaW5lWzBdLngpO1xuICAgICAgICAgICAgbGluZSA9IGdldEV4dGVuZGVkTGluZShsaW5lLCBsaW5lQW5nbGUsIE1hdGguZmxvb3IobGluZUxlbmd0aCAqIDAuMSkpO1xuICAgICAgICAgICAgaWYgKGxpbmUgPT09IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQgPSB0cnlEZWNvZGUobGluZSk7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ5RGVjb2RlQnJ1dGVGb3JjZShib3gsIGxpbmUsIGxpbmVBbmdsZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiByZXN1bHQgJiYgY29uZmlnLmRlYnVnLmRyYXdTY2FubGluZSAmJiBjdHgpIHtcbiAgICAgICAgICAgICAgICBJbWFnZURlYnVnLmRyYXdQYXRoKGxpbmUsIHt4OiAneCcsIHk6ICd5J30sIGN0eCwge2NvbG9yOiAncmVkJywgbGluZVdpZHRoOiAzfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY29kZVJlc3VsdDogcmVzdWx0LmNvZGVSZXN1bHQsXG4gICAgICAgICAgICAgICAgbGluZTogbGluZSxcbiAgICAgICAgICAgICAgICBhbmdsZTogbGluZUFuZ2xlLFxuICAgICAgICAgICAgICAgIHBhdHRlcm46IHJlc3VsdC5iYXJjb2RlTGluZS5saW5lLFxuICAgICAgICAgICAgICAgIHRocmVzaG9sZDogcmVzdWx0LmJhcmNvZGVMaW5lLnRocmVzaG9sZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkZWNvZGVGcm9tQm91bmRpbmdCb3g6IGZ1bmN0aW9uKGJveCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGVGcm9tQm91bmRpbmdCb3goYm94KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWNvZGVGcm9tQm91bmRpbmdCb3hlczogZnVuY3Rpb24oYm94ZXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwgcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBiYXJjb2RlcyA9IFtdLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXBsZSA9IGNvbmZpZy5tdWx0aXBsZTtcblxuICAgICAgICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgYm94ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm94ID0gYm94ZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRlY29kZUZyb21Cb3VuZGluZ0JveChib3gpIHx8IHt9O1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuYm94ID0gYm94O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChtdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFyY29kZXMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5jb2RlUmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYXJjb2Rlc1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRSZWFkZXJzOiBmdW5jdGlvbihyZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLnJlYWRlcnMgPSByZWFkZXJzO1xuICAgICAgICAgICAgICAgIF9iYXJjb2RlUmVhZGVycy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgIGluaXRSZWFkZXJzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kZWNvZGVyL2JhcmNvZGVfZGVjb2Rlci5qcyIsImltcG9ydCBJbWFnZVdyYXBwZXIgZnJvbSAnLi4vY29tbW9uL2ltYWdlX3dyYXBwZXInO1xuXG52YXIgQnJlc2VuaGFtID0ge307XG5cbnZhciBTbG9wZSA9IHtcbiAgICBESVI6IHtcbiAgICAgICAgVVA6IDEsXG4gICAgICAgIERPV046IC0xXG4gICAgfVxufTtcbi8qKlxuICogU2NhbnMgYSBsaW5lIG9mIHRoZSBnaXZlbiBpbWFnZSBmcm9tIHBvaW50IHAxIHRvIHAyIGFuZCByZXR1cm5zIGEgcmVzdWx0IG9iamVjdCBjb250YWluaW5nXG4gKiBncmF5LXNjYWxlIHZhbHVlcyAoMC0yNTUpIG9mIHRoZSB1bmRlcmx5aW5nIHBpeGVscyBpbiBhZGRpdGlvbiB0byB0aGUgbWluXG4gKiBhbmQgbWF4IHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpbWFnZVdyYXBwZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwMSBUaGUgc3RhcnQgcG9pbnQge3gseX1cbiAqIEBwYXJhbSB7T2JqZWN0fSBwMiBUaGUgZW5kIHBvaW50IHt4LHl9XG4gKiBAcmV0dXJucyB7bGluZSwgbWluLCBtYXh9XG4gKi9cbkJyZXNlbmhhbS5nZXRCYXJjb2RlTGluZSA9IGZ1bmN0aW9uKGltYWdlV3JhcHBlciwgcDEsIHAyKSB7XG4gICAgdmFyIHgwID0gcDEueCB8IDAsXG4gICAgICAgIHkwID0gcDEueSB8IDAsXG4gICAgICAgIHgxID0gcDIueCB8IDAsXG4gICAgICAgIHkxID0gcDIueSB8IDAsXG4gICAgICAgIHN0ZWVwID0gTWF0aC5hYnMoeTEgLSB5MCkgPiBNYXRoLmFicyh4MSAtIHgwKSxcbiAgICAgICAgZGVsdGF4LFxuICAgICAgICBkZWx0YXksXG4gICAgICAgIGVycm9yLFxuICAgICAgICB5c3RlcCxcbiAgICAgICAgeSxcbiAgICAgICAgdG1wLFxuICAgICAgICB4LFxuICAgICAgICBsaW5lID0gW10sXG4gICAgICAgIGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhLFxuICAgICAgICB3aWR0aCA9IGltYWdlV3JhcHBlci5zaXplLngsXG4gICAgICAgIHN1bSA9IDAsXG4gICAgICAgIHZhbCxcbiAgICAgICAgbWluID0gMjU1LFxuICAgICAgICBtYXggPSAwO1xuXG4gICAgZnVuY3Rpb24gcmVhZChhLCBiKSB7XG4gICAgICAgIHZhbCA9IGltYWdlRGF0YVtiICogd2lkdGggKyBhXTtcbiAgICAgICAgc3VtICs9IHZhbDtcbiAgICAgICAgbWluID0gdmFsIDwgbWluID8gdmFsIDogbWluO1xuICAgICAgICBtYXggPSB2YWwgPiBtYXggPyB2YWwgOiBtYXg7XG4gICAgICAgIGxpbmUucHVzaCh2YWwpO1xuICAgIH1cblxuICAgIGlmIChzdGVlcCkge1xuICAgICAgICB0bXAgPSB4MDtcbiAgICAgICAgeDAgPSB5MDtcbiAgICAgICAgeTAgPSB0bXA7XG5cbiAgICAgICAgdG1wID0geDE7XG4gICAgICAgIHgxID0geTE7XG4gICAgICAgIHkxID0gdG1wO1xuICAgIH1cbiAgICBpZiAoeDAgPiB4MSkge1xuICAgICAgICB0bXAgPSB4MDtcbiAgICAgICAgeDAgPSB4MTtcbiAgICAgICAgeDEgPSB0bXA7XG5cbiAgICAgICAgdG1wID0geTA7XG4gICAgICAgIHkwID0geTE7XG4gICAgICAgIHkxID0gdG1wO1xuICAgIH1cbiAgICBkZWx0YXggPSB4MSAtIHgwO1xuICAgIGRlbHRheSA9IE1hdGguYWJzKHkxIC0geTApO1xuICAgIGVycm9yID0gKGRlbHRheCAvIDIpIHwgMDtcbiAgICB5ID0geTA7XG4gICAgeXN0ZXAgPSB5MCA8IHkxID8gMSA6IC0xO1xuICAgIGZvciAoIHggPSB4MDsgeCA8IHgxOyB4KyspIHtcbiAgICAgICAgaWYgKHN0ZWVwKXtcbiAgICAgICAgICAgIHJlYWQoeSwgeCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWFkKHgsIHkpO1xuICAgICAgICB9XG4gICAgICAgIGVycm9yID0gZXJyb3IgLSBkZWx0YXk7XG4gICAgICAgIGlmIChlcnJvciA8IDApIHtcbiAgICAgICAgICAgIHkgPSB5ICsgeXN0ZXA7XG4gICAgICAgICAgICBlcnJvciA9IGVycm9yICsgZGVsdGF4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGluZTogbGluZSxcbiAgICAgICAgbWluOiBtaW4sXG4gICAgICAgIG1heDogbWF4XG4gICAgfTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgdGhlIHJlc3VsdCBmcm9tIGdldEJhcmNvZGVMaW5lIGludG8gYSBiaW5hcnkgcmVwcmVzZW50YXRpb25cbiAqIGFsc28gY29uc2lkZXJpbmcgdGhlIGZyZXF1ZW5jeSBhbmQgc2xvcGUgb2YgdGhlIHNpZ25hbCBmb3IgbW9yZSByb2J1c3QgcmVzdWx0c1xuICogQHBhcmFtIHtPYmplY3R9IHJlc3VsdCB7bGluZSwgbWluLCBtYXh9XG4gKi9cbkJyZXNlbmhhbS50b0JpbmFyeUxpbmUgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICB2YXIgbWluID0gcmVzdWx0Lm1pbixcbiAgICAgICAgbWF4ID0gcmVzdWx0Lm1heCxcbiAgICAgICAgbGluZSA9IHJlc3VsdC5saW5lLFxuICAgICAgICBzbG9wZSxcbiAgICAgICAgc2xvcGUyLFxuICAgICAgICBjZW50ZXIgPSBtaW4gKyAobWF4IC0gbWluKSAvIDIsXG4gICAgICAgIGV4dHJlbWEgPSBbXSxcbiAgICAgICAgY3VycmVudERpcixcbiAgICAgICAgZGlyLFxuICAgICAgICB0aHJlc2hvbGQgPSAobWF4IC0gbWluKSAvIDEyLFxuICAgICAgICByVGhyZXNob2xkID0gLXRocmVzaG9sZCxcbiAgICAgICAgaSxcbiAgICAgICAgajtcblxuICAgIC8vIDEuIGZpbmQgZXh0cmVtYVxuICAgIGN1cnJlbnREaXIgPSBsaW5lWzBdID4gY2VudGVyID8gU2xvcGUuRElSLlVQIDogU2xvcGUuRElSLkRPV047XG4gICAgZXh0cmVtYS5wdXNoKHtcbiAgICAgICAgcG9zOiAwLFxuICAgICAgICB2YWw6IGxpbmVbMF1cbiAgICB9KTtcbiAgICBmb3IgKCBpID0gMDsgaSA8IGxpbmUubGVuZ3RoIC0gMjsgaSsrKSB7XG4gICAgICAgIHNsb3BlID0gKGxpbmVbaSArIDFdIC0gbGluZVtpXSk7XG4gICAgICAgIHNsb3BlMiA9IChsaW5lW2kgKyAyXSAtIGxpbmVbaSArIDFdKTtcbiAgICAgICAgaWYgKChzbG9wZSArIHNsb3BlMikgPCByVGhyZXNob2xkICYmIGxpbmVbaSArIDFdIDwgKGNlbnRlciAqIDEuNSkpIHtcbiAgICAgICAgICAgIGRpciA9IFNsb3BlLkRJUi5ET1dOO1xuICAgICAgICB9IGVsc2UgaWYgKChzbG9wZSArIHNsb3BlMikgPiB0aHJlc2hvbGQgJiYgbGluZVtpICsgMV0gPiAoY2VudGVyICogMC41KSkge1xuICAgICAgICAgICAgZGlyID0gU2xvcGUuRElSLlVQO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGlyID0gY3VycmVudERpcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXJyZW50RGlyICE9PSBkaXIpIHtcbiAgICAgICAgICAgIGV4dHJlbWEucHVzaCh7XG4gICAgICAgICAgICAgICAgcG9zOiBpLFxuICAgICAgICAgICAgICAgIHZhbDogbGluZVtpXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjdXJyZW50RGlyID0gZGlyO1xuICAgICAgICB9XG4gICAgfVxuICAgIGV4dHJlbWEucHVzaCh7XG4gICAgICAgIHBvczogbGluZS5sZW5ndGgsXG4gICAgICAgIHZhbDogbGluZVtsaW5lLmxlbmd0aCAtIDFdXG4gICAgfSk7XG5cbiAgICBmb3IgKCBqID0gZXh0cmVtYVswXS5wb3M7IGogPCBleHRyZW1hWzFdLnBvczsgaisrKSB7XG4gICAgICAgIGxpbmVbal0gPSBsaW5lW2pdID4gY2VudGVyID8gMCA6IDE7XG4gICAgfVxuXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGV4dHJlbWEgYW5kIGNvbnZlcnQgdG8gYmluYXJ5IGJhc2VkIG9uIGF2ZyBiZXR3ZWVuIG1pbm1heFxuICAgIGZvciAoIGkgPSAxOyBpIDwgZXh0cmVtYS5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgaWYgKGV4dHJlbWFbaSArIDFdLnZhbCA+IGV4dHJlbWFbaV0udmFsKSB7XG4gICAgICAgICAgICB0aHJlc2hvbGQgPSAoZXh0cmVtYVtpXS52YWwgKyAoKGV4dHJlbWFbaSArIDFdLnZhbCAtIGV4dHJlbWFbaV0udmFsKSAvIDMpICogMikgfCAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyZXNob2xkID0gKGV4dHJlbWFbaSArIDFdLnZhbCArICgoZXh0cmVtYVtpXS52YWwgLSBleHRyZW1hW2kgKyAxXS52YWwpIC8gMykpIHwgMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoIGogPSBleHRyZW1hW2ldLnBvczsgaiA8IGV4dHJlbWFbaSArIDFdLnBvczsgaisrKSB7XG4gICAgICAgICAgICBsaW5lW2pdID0gbGluZVtqXSA+IHRocmVzaG9sZCA/IDAgOiAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGluZTogbGluZSxcbiAgICAgICAgdGhyZXNob2xkOiB0aHJlc2hvbGRcbiAgICB9O1xufTtcblxuLyoqXG4gKiBVc2VkIGZvciBkZXZlbG9wbWVudCBvbmx5XG4gKi9cbkJyZXNlbmhhbS5kZWJ1ZyA9IHtcbiAgICBwcmludEZyZXF1ZW5jeTogZnVuY3Rpb24obGluZSwgY2FudmFzKSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gbGluZS5sZW5ndGg7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSAyNTY7XG5cbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsdWVcIjtcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBsaW5lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjdHgubW92ZVRvKGksIDI1NSk7XG4gICAgICAgICAgICBjdHgubGluZVRvKGksIDI1NSAtIGxpbmVbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH0sXG5cbiAgICBwcmludFBhdHRlcm46IGZ1bmN0aW9uKGxpbmUsIGNhbnZhcykge1xuICAgICAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSwgaTtcblxuICAgICAgICBjYW52YXMud2lkdGggPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgY3R4LmZpbGxDb2xvciA9IFwiYmxhY2tcIjtcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBsaW5lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAobGluZVtpXSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdChpLCAwLCAxLCAxMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnJlc2VuaGFtO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RlY29kZXIvYnJlc2VuaGFtLmpzIiwiaW1wb3J0IHtvbWl0LCBwaWNrfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtnZXRVc2VyTWVkaWEsIGVudW1lcmF0ZURldmljZXN9IGZyb20gJ21lZGlhRGV2aWNlcyc7XG5cbmNvbnN0IGZhY2luZ01hdGNoaW5nID0ge1xuICAgIFwidXNlclwiOiAvZnJvbnQvaSxcbiAgICBcImVudmlyb25tZW50XCI6IC9iYWNrL2lcbn07XG5cbnZhciBzdHJlYW1SZWY7XG5cbmZ1bmN0aW9uIHdhaXRGb3JWaWRlbyh2aWRlbykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDEwO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrVmlkZW8oKSB7XG4gICAgICAgICAgICBpZiAoYXR0ZW1wdHMgPiAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZpZGVvLnZpZGVvV2lkdGggPiAwICYmIHZpZGVvLnZpZGVvSGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh2aWRlby52aWRlb1dpZHRoICsgXCJweCB4IFwiICsgdmlkZW8udmlkZW9IZWlnaHQgKyBcInB4XCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjaGVja1ZpZGVvLCA1MDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCdVbmFibGUgdG8gcGxheSB2aWRlbyBzdHJlYW0uIElzIHdlYmNhbSB3b3JraW5nPycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXR0ZW1wdHMtLTtcbiAgICAgICAgfVxuICAgICAgICBjaGVja1ZpZGVvKCk7XG4gICAgfSk7XG59XG5cbi8qKlxuICogVHJpZXMgdG8gYXR0YWNoIHRoZSBjYW1lcmEtc3RyZWFtIHRvIGEgZ2l2ZW4gdmlkZW8tZWxlbWVudFxuICogYW5kIGNhbGxzIHRoZSBjYWxsYmFjayBmdW5jdGlvbiB3aGVuIHRoZSBjb250ZW50IGlzIHJlYWR5XG4gKiBAcGFyYW0ge09iamVjdH0gY29uc3RyYWludHNcbiAqIEBwYXJhbSB7T2JqZWN0fSB2aWRlb1xuICovXG5mdW5jdGlvbiBpbml0Q2FtZXJhKHZpZGVvLCBjb25zdHJhaW50cykge1xuICAgIHJldHVybiBnZXRVc2VyTWVkaWEoY29uc3RyYWludHMpXG4gICAgLnRoZW4oKHN0cmVhbSkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHN0cmVhbVJlZiA9IHN0cmVhbTtcbiAgICAgICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZShcImF1dG9wbGF5XCIsICd0cnVlJyk7XG4gICAgICAgICAgICB2aWRlby5zcmNPYmplY3QgPSBzdHJlYW07XG4gICAgICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsICgpID0+IHtcbiAgICAgICAgICAgICAgICB2aWRlby5wbGF5KCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pXG4gICAgLnRoZW4od2FpdEZvclZpZGVvLmJpbmQobnVsbCwgdmlkZW8pKTtcbn1cblxuZnVuY3Rpb24gZGVwcmVjYXRlZENvbnN0cmFpbnRzKHZpZGVvQ29uc3RyYWludHMpIHtcbiAgICBjb25zdCBub3JtYWxpemVkID0gcGljayh2aWRlb0NvbnN0cmFpbnRzLCBbXCJ3aWR0aFwiLCBcImhlaWdodFwiLCBcImZhY2luZ01vZGVcIixcbiAgICAgICAgICAgIFwiYXNwZWN0UmF0aW9cIiwgXCJkZXZpY2VJZFwiXSk7XG5cbiAgICBpZiAodHlwZW9mIHZpZGVvQ29uc3RyYWludHMubWluQXNwZWN0UmF0aW8gIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICB2aWRlb0NvbnN0cmFpbnRzLm1pbkFzcGVjdFJhdGlvID4gMCkge1xuICAgICAgICBub3JtYWxpemVkLmFzcGVjdFJhdGlvID0gdmlkZW9Db25zdHJhaW50cy5taW5Bc3BlY3RSYXRpbztcbiAgICAgICAgY29uc29sZS5sb2coXCJXQVJOSU5HOiBDb25zdHJhaW50ICdtaW5Bc3BlY3RSYXRpbycgaXMgZGVwcmVjYXRlZDsgVXNlICdhc3BlY3RSYXRpbycgaW5zdGVhZFwiKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB2aWRlb0NvbnN0cmFpbnRzLmZhY2luZyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbm9ybWFsaXplZC5mYWNpbmdNb2RlID0gdmlkZW9Db25zdHJhaW50cy5mYWNpbmc7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiV0FSTklORzogQ29uc3RyYWludCAnZmFjaW5nJyBpcyBkZXByZWNhdGVkLiBVc2UgJ2ZhY2luZ01vZGUnIGluc3RlYWQnXCIpO1xuICAgIH1cbiAgICByZXR1cm4gbm9ybWFsaXplZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBpY2tDb25zdHJhaW50cyh2aWRlb0NvbnN0cmFpbnRzKSB7XG4gICAgY29uc3Qgbm9ybWFsaXplZENvbnN0cmFpbnRzID0ge1xuICAgICAgICBhdWRpbzogZmFsc2UsXG4gICAgICAgIHZpZGVvOiBkZXByZWNhdGVkQ29uc3RyYWludHModmlkZW9Db25zdHJhaW50cylcbiAgICB9O1xuXG4gICAgaWYgKG5vcm1hbGl6ZWRDb25zdHJhaW50cy52aWRlby5kZXZpY2VJZFxuICAgICAgICAgICAgJiYgbm9ybWFsaXplZENvbnN0cmFpbnRzLnZpZGVvLmZhY2luZ01vZGUpIHtcbiAgICAgICAgZGVsZXRlIG5vcm1hbGl6ZWRDb25zdHJhaW50cy52aWRlby5mYWNpbmdNb2RlO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5vcm1hbGl6ZWRDb25zdHJhaW50cyk7XG59XG5cbmZ1bmN0aW9uIGVudW1lcmF0ZVZpZGVvRGV2aWNlcygpIHtcbiAgICByZXR1cm4gZW51bWVyYXRlRGV2aWNlcygpXG4gICAgLnRoZW4oZGV2aWNlcyA9PiBkZXZpY2VzLmZpbHRlcihkZXZpY2UgPT4gZGV2aWNlLmtpbmQgPT09ICd2aWRlb2lucHV0JykpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcmVxdWVzdDogZnVuY3Rpb24odmlkZW8sIHZpZGVvQ29uc3RyYWludHMpIHtcbiAgICAgICAgcmV0dXJuIHBpY2tDb25zdHJhaW50cyh2aWRlb0NvbnN0cmFpbnRzKVxuICAgICAgICAgICAgLnRoZW4oaW5pdENhbWVyYS5iaW5kKG51bGwsIHZpZGVvKSk7XG4gICAgfSxcbiAgICByZWxlYXNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRyYWNrcyA9IHN0cmVhbVJlZiAmJiBzdHJlYW1SZWYuZ2V0VmlkZW9UcmFja3MoKTtcbiAgICAgICAgaWYgKHRyYWNrcyAmJiB0cmFja3MubGVuZ3RoKSB7XG4gICAgICAgICAgICB0cmFja3NbMF0uc3RvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHN0cmVhbVJlZiA9IG51bGw7XG4gICAgfSxcbiAgICBlbnVtZXJhdGVWaWRlb0RldmljZXMsXG4gICAgZ2V0QWN0aXZlU3RyZWFtTGFiZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoc3RyZWFtUmVmKSB7XG4gICAgICAgICAgICBjb25zdCB0cmFja3MgPSBzdHJlYW1SZWYuZ2V0VmlkZW9UcmFja3MoKTtcbiAgICAgICAgICAgIGlmICh0cmFja3MgJiYgdHJhY2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmFja3NbMF0ubGFiZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2lucHV0L2NhbWVyYV9hY2Nlc3MuanMiLCJpbXBvcnQgSW1hZ2VXcmFwcGVyIGZyb20gJy4uL2NvbW1vbi9pbWFnZV93cmFwcGVyJztcbmltcG9ydCB7XG4gICAgY2FsY3VsYXRlUGF0Y2hTaXplLFxuICAgIG90c3VUaHJlc2hvbGQsXG4gICAgaHN2MnJnYixcbiAgICBjbHVzdGVyLFxuICAgIHRvcEdlbmVyaWMsXG4gICAgaW1hZ2VSZWYsXG4gICAgaGFsZlNhbXBsZSxcbiAgICBjb21wdXRlSW1hZ2VBcmVhXG59IGZyb20gJy4uL2NvbW1vbi9jdl91dGlscyc7XG5pbXBvcnQgQXJyYXlIZWxwZXIgZnJvbSAnLi4vY29tbW9uL2FycmF5X2hlbHBlcic7XG5pbXBvcnQgSW1hZ2VEZWJ1ZyBmcm9tICcuLi9jb21tb24vaW1hZ2VfZGVidWcnO1xuaW1wb3J0IFJhc3Rlcml6ZXIgZnJvbSAnLi9yYXN0ZXJpemVyJztcbmltcG9ydCBUcmFjZXIgZnJvbSAnLi90cmFjZXInO1xuaW1wb3J0IHNrZWxldG9uaXplciBmcm9tICcuL3NrZWxldG9uaXplcic7XG5jb25zdCB2ZWMyID0ge1xuICAgIGNsb25lOiByZXF1aXJlKCdnbC12ZWMyL2Nsb25lJyksXG4gICAgZG90OiAgcmVxdWlyZSgnZ2wtdmVjMi9kb3QnKSxcbiAgICBzY2FsZTogcmVxdWlyZSgnZ2wtdmVjMi9zY2FsZScpLFxuICAgIHRyYW5zZm9ybU1hdDI6IHJlcXVpcmUoJ2dsLXZlYzIvdHJhbnNmb3JtTWF0MicpXG59O1xuY29uc3QgbWF0MiA9IHtcbiAgICBjb3B5OiByZXF1aXJlKCdnbC1tYXQyL2NvcHknKSxcbiAgICBjcmVhdGU6IHJlcXVpcmUoJ2dsLW1hdDIvY3JlYXRlJyksXG4gICAgaW52ZXJ0OiByZXF1aXJlKCdnbC1tYXQyL2ludmVydCcpXG59XG5cbnZhciBfY29uZmlnLFxuICAgIF9jdXJyZW50SW1hZ2VXcmFwcGVyLFxuICAgIF9za2VsSW1hZ2VXcmFwcGVyLFxuICAgIF9zdWJJbWFnZVdyYXBwZXIsXG4gICAgX2xhYmVsSW1hZ2VXcmFwcGVyLFxuICAgIF9wYXRjaEdyaWQsXG4gICAgX3BhdGNoTGFiZWxHcmlkLFxuICAgIF9pbWFnZVRvUGF0Y2hHcmlkLFxuICAgIF9iaW5hcnlJbWFnZVdyYXBwZXIsXG4gICAgX3BhdGNoU2l6ZSxcbiAgICBfY2FudmFzQ29udGFpbmVyID0ge1xuICAgICAgICBjdHg6IHtcbiAgICAgICAgICAgIGJpbmFyeTogbnVsbFxuICAgICAgICB9LFxuICAgICAgICBkb206IHtcbiAgICAgICAgICAgIGJpbmFyeTogbnVsbFxuICAgICAgICB9XG4gICAgfSxcbiAgICBfbnVtUGF0Y2hlcyA9IHt4OiAwLCB5OiAwfSxcbiAgICBfaW5wdXRJbWFnZVdyYXBwZXIsXG4gICAgX3NrZWxldG9uaXplcjtcblxuZnVuY3Rpb24gaW5pdEJ1ZmZlcnMoKSB7XG4gICAgdmFyIHNrZWxldG9uSW1hZ2VEYXRhO1xuXG4gICAgaWYgKF9jb25maWcuaGFsZlNhbXBsZSkge1xuICAgICAgICBfY3VycmVudEltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoe1xuICAgICAgICAgICAgeDogX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUueCAvIDIgfCAwLFxuICAgICAgICAgICAgeTogX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUueSAvIDIgfCAwXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIF9jdXJyZW50SW1hZ2VXcmFwcGVyID0gX2lucHV0SW1hZ2VXcmFwcGVyO1xuICAgIH1cblxuICAgIF9wYXRjaFNpemUgPSBjYWxjdWxhdGVQYXRjaFNpemUoX2NvbmZpZy5wYXRjaFNpemUsIF9jdXJyZW50SW1hZ2VXcmFwcGVyLnNpemUpO1xuXG4gICAgX251bVBhdGNoZXMueCA9IF9jdXJyZW50SW1hZ2VXcmFwcGVyLnNpemUueCAvIF9wYXRjaFNpemUueCB8IDA7XG4gICAgX251bVBhdGNoZXMueSA9IF9jdXJyZW50SW1hZ2VXcmFwcGVyLnNpemUueSAvIF9wYXRjaFNpemUueSB8IDA7XG5cbiAgICBfYmluYXJ5SW1hZ2VXcmFwcGVyID0gbmV3IEltYWdlV3JhcHBlcihfY3VycmVudEltYWdlV3JhcHBlci5zaXplLCB1bmRlZmluZWQsIFVpbnQ4QXJyYXksIGZhbHNlKTtcblxuICAgIF9sYWJlbEltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoX3BhdGNoU2l6ZSwgdW5kZWZpbmVkLCBBcnJheSwgdHJ1ZSk7XG5cbiAgICBza2VsZXRvbkltYWdlRGF0YSA9IG5ldyBBcnJheUJ1ZmZlcig2NCAqIDEwMjQpO1xuICAgIF9zdWJJbWFnZVdyYXBwZXIgPSBuZXcgSW1hZ2VXcmFwcGVyKF9wYXRjaFNpemUsXG4gICAgICAgIG5ldyBVaW50OEFycmF5KHNrZWxldG9uSW1hZ2VEYXRhLCAwLCBfcGF0Y2hTaXplLnggKiBfcGF0Y2hTaXplLnkpKTtcbiAgICBfc2tlbEltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIoX3BhdGNoU2l6ZSxcbiAgICAgICAgbmV3IFVpbnQ4QXJyYXkoc2tlbGV0b25JbWFnZURhdGEsIF9wYXRjaFNpemUueCAqIF9wYXRjaFNpemUueSAqIDMsIF9wYXRjaFNpemUueCAqIF9wYXRjaFNpemUueSksXG4gICAgICAgIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgX3NrZWxldG9uaXplciA9IHNrZWxldG9uaXplcigodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpID8gd2luZG93IDogKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgPyBzZWxmIDogZ2xvYmFsLCB7XG4gICAgICAgIHNpemU6IF9wYXRjaFNpemUueFxuICAgIH0sIHNrZWxldG9uSW1hZ2VEYXRhKTtcblxuICAgIF9pbWFnZVRvUGF0Y2hHcmlkID0gbmV3IEltYWdlV3JhcHBlcih7XG4gICAgICAgIHg6IChfY3VycmVudEltYWdlV3JhcHBlci5zaXplLnggLyBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueCkgfCAwLFxuICAgICAgICB5OiAoX2N1cnJlbnRJbWFnZVdyYXBwZXIuc2l6ZS55IC8gX3N1YkltYWdlV3JhcHBlci5zaXplLnkpIHwgMFxuICAgIH0sIHVuZGVmaW5lZCwgQXJyYXksIHRydWUpO1xuICAgIF9wYXRjaEdyaWQgPSBuZXcgSW1hZ2VXcmFwcGVyKF9pbWFnZVRvUGF0Y2hHcmlkLnNpemUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICBfcGF0Y2hMYWJlbEdyaWQgPSBuZXcgSW1hZ2VXcmFwcGVyKF9pbWFnZVRvUGF0Y2hHcmlkLnNpemUsIHVuZGVmaW5lZCwgSW50MzJBcnJheSwgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIGluaXRDYW52YXMoKSB7XG4gICAgaWYgKF9jb25maWcudXNlV29ya2VyIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeS5jbGFzc05hbWUgPSBcImJpbmFyeUJ1ZmZlclwiO1xuICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgX2NvbmZpZy5kZWJ1Zy5zaG93Q2FudmFzID09PSB0cnVlKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVidWdcIikuYXBwZW5kQ2hpbGQoX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5KTtcbiAgICB9XG4gICAgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5ID0gX2NhbnZhc0NvbnRhaW5lci5kb20uYmluYXJ5LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkud2lkdGggPSBfYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueDtcbiAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5iaW5hcnkuaGVpZ2h0ID0gX2JpbmFyeUltYWdlV3JhcHBlci5zaXplLnk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGJvdW5kaW5nIGJveCB3aGljaCBlbmNsb3NlcyBhbGwgdGhlIGdpdmVuIHBhdGNoZXNcbiAqIEByZXR1cm5zIHtBcnJheX0gVGhlIG1pbmltYWwgYm91bmRpbmcgYm94XG4gKi9cbmZ1bmN0aW9uIGJveEZyb21QYXRjaGVzKHBhdGNoZXMpIHtcbiAgICB2YXIgb3ZlckF2ZyxcbiAgICAgICAgaSxcbiAgICAgICAgaixcbiAgICAgICAgcGF0Y2gsXG4gICAgICAgIHRyYW5zTWF0LFxuICAgICAgICBtaW54ID1cbiAgICAgICAgX2JpbmFyeUltYWdlV3JhcHBlci5zaXplLngsXG4gICAgICAgIG1pbnkgPSBfYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueSxcbiAgICAgICAgbWF4eCA9IC1fYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueCxcbiAgICAgICAgbWF4eSA9IC1fYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueSxcbiAgICAgICAgYm94LFxuICAgICAgICBzY2FsZTtcblxuICAgIC8vIGRyYXcgYWxsIHBhdGNoZXMgd2hpY2ggYXJlIHRvIGJlIHRha2VuIGludG8gY29uc2lkZXJhdGlvblxuICAgIG92ZXJBdmcgPSAwO1xuICAgIGZvciAoIGkgPSAwOyBpIDwgcGF0Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXRjaCA9IHBhdGNoZXNbaV07XG4gICAgICAgIG92ZXJBdmcgKz0gcGF0Y2gucmFkO1xuICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIF9jb25maWcuZGVidWcuc2hvd1BhdGNoZXMpIHtcbiAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1JlY3QocGF0Y2gucG9zLCBfc3ViSW1hZ2VXcmFwcGVyLnNpemUsIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSwge2NvbG9yOiBcInJlZFwifSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvdmVyQXZnIC89IHBhdGNoZXMubGVuZ3RoO1xuICAgIG92ZXJBdmcgPSAob3ZlckF2ZyAqIDE4MCAvIE1hdGguUEkgKyA5MCkgJSAxODAgLSA5MDtcbiAgICBpZiAob3ZlckF2ZyA8IDApIHtcbiAgICAgICAgb3ZlckF2ZyArPSAxODA7XG4gICAgfVxuXG4gICAgb3ZlckF2ZyA9ICgxODAgLSBvdmVyQXZnKSAqIE1hdGguUEkgLyAxODA7XG4gICAgdHJhbnNNYXQgPSBtYXQyLmNvcHkobWF0Mi5jcmVhdGUoKSwgW01hdGguY29zKG92ZXJBdmcpLCBNYXRoLnNpbihvdmVyQXZnKSwgLU1hdGguc2luKG92ZXJBdmcpLCBNYXRoLmNvcyhvdmVyQXZnKV0pO1xuXG4gICAgLy8gaXRlcmF0ZSBvdmVyIHBhdGNoZXMgYW5kIHJvdGF0ZSBieSBhbmdsZVxuICAgIGZvciAoIGkgPSAwOyBpIDwgcGF0Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXRjaCA9IHBhdGNoZXNbaV07XG4gICAgICAgIGZvciAoIGogPSAwOyBqIDwgNDsgaisrKSB7XG4gICAgICAgICAgICB2ZWMyLnRyYW5zZm9ybU1hdDIocGF0Y2guYm94W2pdLCBwYXRjaC5ib3hbal0sIHRyYW5zTWF0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgX2NvbmZpZy5kZWJ1Zy5ib3hGcm9tUGF0Y2hlcy5zaG93VHJhbnNmb3JtZWQpIHtcbiAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgocGF0Y2guYm94LCB7eDogMCwgeTogMX0sIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSwge2NvbG9yOiAnIzk5ZmYwMCcsIGxpbmVXaWR0aDogMn0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmluZCBib3VuZGluZyBib3hcbiAgICBmb3IgKCBpID0gMDsgaSA8IHBhdGNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGF0Y2ggPSBwYXRjaGVzW2ldO1xuICAgICAgICBmb3IgKCBqID0gMDsgaiA8IDQ7IGorKykge1xuICAgICAgICAgICAgaWYgKHBhdGNoLmJveFtqXVswXSA8IG1pbngpIHtcbiAgICAgICAgICAgICAgICBtaW54ID0gcGF0Y2guYm94W2pdWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhdGNoLmJveFtqXVswXSA+IG1heHgpIHtcbiAgICAgICAgICAgICAgICBtYXh4ID0gcGF0Y2guYm94W2pdWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhdGNoLmJveFtqXVsxXSA8IG1pbnkpIHtcbiAgICAgICAgICAgICAgICBtaW55ID0gcGF0Y2guYm94W2pdWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhdGNoLmJveFtqXVsxXSA+IG1heHkpIHtcbiAgICAgICAgICAgICAgICBtYXh5ID0gcGF0Y2guYm94W2pdWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYm94ID0gW1ttaW54LCBtaW55XSwgW21heHgsIG1pbnldLCBbbWF4eCwgbWF4eV0sIFttaW54LCBtYXh5XV07XG5cbiAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIF9jb25maWcuZGVidWcuYm94RnJvbVBhdGNoZXMuc2hvd1RyYW5zZm9ybWVkQm94KSB7XG4gICAgICAgIEltYWdlRGVidWcuZHJhd1BhdGgoYm94LCB7eDogMCwgeTogMX0sIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSwge2NvbG9yOiAnI2ZmMDAwMCcsIGxpbmVXaWR0aDogMn0pO1xuICAgIH1cblxuICAgIHNjYWxlID0gX2NvbmZpZy5oYWxmU2FtcGxlID8gMiA6IDE7XG4gICAgLy8gcmV2ZXJzZSByb3RhdGlvbjtcbiAgICB0cmFuc01hdCA9IG1hdDIuaW52ZXJ0KHRyYW5zTWF0LCB0cmFuc01hdCk7XG4gICAgZm9yICggaiA9IDA7IGogPCA0OyBqKyspIHtcbiAgICAgICAgdmVjMi50cmFuc2Zvcm1NYXQyKGJveFtqXSwgYm94W2pdLCB0cmFuc01hdCk7XG4gICAgfVxuXG4gICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiBfY29uZmlnLmRlYnVnLmJveEZyb21QYXRjaGVzLnNob3dCQikge1xuICAgICAgICBJbWFnZURlYnVnLmRyYXdQYXRoKGJveCwge3g6IDAsIHk6IDF9LCBfY2FudmFzQ29udGFpbmVyLmN0eC5iaW5hcnksIHtjb2xvcjogJyNmZjAwMDAnLCBsaW5lV2lkdGg6IDJ9KTtcbiAgICB9XG5cbiAgICBmb3IgKCBqID0gMDsgaiA8IDQ7IGorKykge1xuICAgICAgICB2ZWMyLnNjYWxlKGJveFtqXSwgYm94W2pdLCBzY2FsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJveDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgYmluYXJ5IGltYWdlIG9mIHRoZSBjdXJyZW50IGltYWdlXG4gKi9cbmZ1bmN0aW9uIGJpbmFyaXplSW1hZ2UoKSB7XG4gICAgb3RzdVRocmVzaG9sZChfY3VycmVudEltYWdlV3JhcHBlciwgX2JpbmFyeUltYWdlV3JhcHBlcik7XG4gICAgX2JpbmFyeUltYWdlV3JhcHBlci56ZXJvQm9yZGVyKCk7XG4gICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiBfY29uZmlnLmRlYnVnLnNob3dDYW52YXMpIHtcbiAgICAgICAgX2JpbmFyeUltYWdlV3JhcHBlci5zaG93KF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeSwgMjU1KTtcbiAgICB9XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIHRoZSBlbnRpcmUgaW1hZ2VcbiAqIGV4dHJhY3QgcGF0Y2hlc1xuICovXG5mdW5jdGlvbiBmaW5kUGF0Y2hlcygpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgaixcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgbW9tZW50cyxcbiAgICAgICAgcGF0Y2hlc0ZvdW5kID0gW10sXG4gICAgICAgIHJhc3Rlcml6ZXIsXG4gICAgICAgIHJhc3RlclJlc3VsdCxcbiAgICAgICAgcGF0Y2g7XG4gICAgZm9yIChpID0gMDsgaSA8IF9udW1QYXRjaGVzLng7IGkrKykge1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgX251bVBhdGNoZXMueTsgaisrKSB7XG4gICAgICAgICAgICB4ID0gX3N1YkltYWdlV3JhcHBlci5zaXplLnggKiBpO1xuICAgICAgICAgICAgeSA9IF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS55ICogajtcblxuICAgICAgICAgICAgLy8gc2VwZXJhdGUgcGFydHNcbiAgICAgICAgICAgIHNrZWxldG9uaXplKHgsIHkpO1xuXG4gICAgICAgICAgICAvLyBSYXN0ZXJpemUsIGZpbmQgaW5kaXZpZHVhbCBiYXJzXG4gICAgICAgICAgICBfc2tlbEltYWdlV3JhcHBlci56ZXJvQm9yZGVyKCk7XG4gICAgICAgICAgICBBcnJheUhlbHBlci5pbml0KF9sYWJlbEltYWdlV3JhcHBlci5kYXRhLCAwKTtcbiAgICAgICAgICAgIHJhc3Rlcml6ZXIgPSBSYXN0ZXJpemVyLmNyZWF0ZShfc2tlbEltYWdlV3JhcHBlciwgX2xhYmVsSW1hZ2VXcmFwcGVyKTtcbiAgICAgICAgICAgIHJhc3RlclJlc3VsdCA9IHJhc3Rlcml6ZXIucmFzdGVyaXplKDApO1xuXG4gICAgICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIF9jb25maWcuZGVidWcuc2hvd0xhYmVscykge1xuICAgICAgICAgICAgICAgIF9sYWJlbEltYWdlV3JhcHBlci5vdmVybGF5KF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeSwgTWF0aC5mbG9vcigzNjAgLyByYXN0ZXJSZXN1bHQuY291bnQpLFxuICAgICAgICAgICAgICAgICAgICB7eDogeCwgeTogeX0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgbW9tZW50cyBmcm9tIHRoZSBza2VsZXRvbml6ZWQgcGF0Y2hcbiAgICAgICAgICAgIG1vbWVudHMgPSBfbGFiZWxJbWFnZVdyYXBwZXIubW9tZW50cyhyYXN0ZXJSZXN1bHQuY291bnQpO1xuXG4gICAgICAgICAgICAvLyBleHRyYWN0IGVsaWdpYmxlIHBhdGNoZXNcbiAgICAgICAgICAgIHBhdGNoZXNGb3VuZCA9IHBhdGNoZXNGb3VuZC5jb25jYXQoZGVzY3JpYmVQYXRjaChtb21lbnRzLCBbaSwgal0sIHgsIHkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgX2NvbmZpZy5kZWJ1Zy5zaG93Rm91bmRQYXRjaGVzKSB7XG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgcGF0Y2hlc0ZvdW5kLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwYXRjaCA9IHBhdGNoZXNGb3VuZFtpXTtcbiAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1JlY3QocGF0Y2gucG9zLCBfc3ViSW1hZ2VXcmFwcGVyLnNpemUsIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSxcbiAgICAgICAgICAgICAgICB7Y29sb3I6IFwiIzk5ZmYwMFwiLCBsaW5lV2lkdGg6IDJ9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwYXRjaGVzRm91bmQ7XG59XG5cbi8qKlxuICogRmluZHMgdGhvc2UgY29ubmVjdGVkIGFyZWFzIHdoaWNoIGNvbnRhaW4gYXQgbGVhc3QgNiBwYXRjaGVzXG4gKiBhbmQgcmV0dXJucyB0aGVtIG9yZGVyZWQgREVTQyBieSB0aGUgbnVtYmVyIG9mIGNvbnRhaW5lZCBwYXRjaGVzXG4gKiBAcGFyYW0ge051bWJlcn0gbWF4TGFiZWxcbiAqL1xuZnVuY3Rpb24gZmluZEJpZ2dlc3RDb25uZWN0ZWRBcmVhcyhtYXhMYWJlbCl7XG4gICAgdmFyIGksXG4gICAgICAgIHN1bSxcbiAgICAgICAgbGFiZWxIaXN0ID0gW10sXG4gICAgICAgIHRvcExhYmVscyA9IFtdO1xuXG4gICAgZm9yICggaSA9IDA7IGkgPCBtYXhMYWJlbDsgaSsrKSB7XG4gICAgICAgIGxhYmVsSGlzdC5wdXNoKDApO1xuICAgIH1cbiAgICBzdW0gPSBfcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGg7XG4gICAgd2hpbGUgKHN1bS0tKSB7XG4gICAgICAgIGlmIChfcGF0Y2hMYWJlbEdyaWQuZGF0YVtzdW1dID4gMCkge1xuICAgICAgICAgICAgbGFiZWxIaXN0W19wYXRjaExhYmVsR3JpZC5kYXRhW3N1bV0gLSAxXSsrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGFiZWxIaXN0ID0gbGFiZWxIaXN0Lm1hcChmdW5jdGlvbih2YWwsIGlkeCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsOiB2YWwsXG4gICAgICAgICAgICBsYWJlbDogaWR4ICsgMVxuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgbGFiZWxIaXN0LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gYi52YWwgLSBhLnZhbDtcbiAgICB9KTtcblxuICAgIC8vIGV4dHJhY3QgdG9wIGFyZWFzIHdpdGggYXQgbGVhc3QgNiBwYXRjaGVzIHByZXNlbnRcbiAgICB0b3BMYWJlbHMgPSBsYWJlbEhpc3QuZmlsdGVyKGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgIHJldHVybiBlbC52YWwgPj0gNTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0b3BMYWJlbHM7XG59XG5cbi8qKlxuICpcbiAqL1xuZnVuY3Rpb24gZmluZEJveGVzKHRvcExhYmVscywgbWF4TGFiZWwpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgaixcbiAgICAgICAgc3VtLFxuICAgICAgICBwYXRjaGVzID0gW10sXG4gICAgICAgIHBhdGNoLFxuICAgICAgICBib3gsXG4gICAgICAgIGJveGVzID0gW10sXG4gICAgICAgIGhzdiA9IFswLCAxLCAxXSxcbiAgICAgICAgcmdiID0gWzAsIDAsIDBdO1xuXG4gICAgZm9yICggaSA9IDA7IGkgPCB0b3BMYWJlbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc3VtID0gX3BhdGNoTGFiZWxHcmlkLmRhdGEubGVuZ3RoO1xuICAgICAgICBwYXRjaGVzLmxlbmd0aCA9IDA7XG4gICAgICAgIHdoaWxlIChzdW0tLSkge1xuICAgICAgICAgICAgaWYgKF9wYXRjaExhYmVsR3JpZC5kYXRhW3N1bV0gPT09IHRvcExhYmVsc1tpXS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIHBhdGNoID0gX2ltYWdlVG9QYXRjaEdyaWQuZGF0YVtzdW1dO1xuICAgICAgICAgICAgICAgIHBhdGNoZXMucHVzaChwYXRjaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYm94ID0gYm94RnJvbVBhdGNoZXMocGF0Y2hlcyk7XG4gICAgICAgIGlmIChib3gpIHtcbiAgICAgICAgICAgIGJveGVzLnB1c2goYm94KTtcblxuICAgICAgICAgICAgLy8gZHJhdyBwYXRjaC1sYWJlbHMgaWYgcmVxdWVzdGVkXG4gICAgICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50ICYmIF9jb25maWcuZGVidWcuc2hvd1JlbWFpbmluZ1BhdGNoTGFiZWxzKSB7XG4gICAgICAgICAgICAgICAgZm9yICggaiA9IDA7IGogPCBwYXRjaGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGNoID0gcGF0Y2hlc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgaHN2WzBdID0gKHRvcExhYmVsc1tpXS5sYWJlbCAvIChtYXhMYWJlbCArIDEpKSAqIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgaHN2MnJnYihoc3YsIHJnYik7XG4gICAgICAgICAgICAgICAgICAgIEltYWdlRGVidWcuZHJhd1JlY3QocGF0Y2gucG9zLCBfc3ViSW1hZ2VXcmFwcGVyLnNpemUsIF9jYW52YXNDb250YWluZXIuY3R4LmJpbmFyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtjb2xvcjogXCJyZ2IoXCIgKyByZ2Iuam9pbihcIixcIikgKyBcIilcIiwgbGluZVdpZHRoOiAyfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBib3hlcztcbn1cblxuLyoqXG4gKiBGaW5kIHNpbWlsYXIgbW9tZW50cyAodmlhIGNsdXN0ZXIpXG4gKiBAcGFyYW0ge09iamVjdH0gbW9tZW50c1xuICovXG5mdW5jdGlvbiBzaW1pbGFyTW9tZW50cyhtb21lbnRzKSB7XG4gICAgdmFyIGNsdXN0ZXJzID0gY2x1c3Rlcihtb21lbnRzLCAwLjkwKTtcbiAgICB2YXIgdG9wQ2x1c3RlciA9IHRvcEdlbmVyaWMoY2x1c3RlcnMsIDEsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIGUuZ2V0UG9pbnRzKCkubGVuZ3RoO1xuICAgIH0pO1xuICAgIHZhciBwb2ludHMgPSBbXSwgcmVzdWx0ID0gW107XG4gICAgaWYgKHRvcENsdXN0ZXIubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHBvaW50cyA9IHRvcENsdXN0ZXJbMF0uaXRlbS5nZXRQb2ludHMoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBvaW50c1tpXS5wb2ludCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gc2tlbGV0b25pemUoeCwgeSkge1xuICAgIF9iaW5hcnlJbWFnZVdyYXBwZXIuc3ViSW1hZ2VBc0NvcHkoX3N1YkltYWdlV3JhcHBlciwgaW1hZ2VSZWYoeCwgeSkpO1xuICAgIF9za2VsZXRvbml6ZXIuc2tlbGV0b25pemUoKTtcblxuICAgIC8vIFNob3cgc2tlbGV0b24gaWYgcmVxdWVzdGVkXG4gICAgaWYgKEVOVi5kZXZlbG9wbWVudCAmJiBfY29uZmlnLmRlYnVnLnNob3dTa2VsZXRvbikge1xuICAgICAgICBfc2tlbEltYWdlV3JhcHBlci5vdmVybGF5KF9jYW52YXNDb250YWluZXIuZG9tLmJpbmFyeSwgMzYwLCBpbWFnZVJlZih4LCB5KSk7XG4gICAgfVxufVxuXG4vKipcbiAqIEV4dHJhY3RzIGFuZCBkZXNjcmliZXMgdGhvc2UgcGF0Y2hlcyB3aGljaCBzZWVtIHRvIGNvbnRhaW4gYSBiYXJjb2RlIHBhdHRlcm5cbiAqIEBwYXJhbSB7QXJyYXl9IG1vbWVudHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXRjaFBvcyxcbiAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gKiBAcGFyYW0ge051bWJlcn0geVxuICogQHJldHVybnMge0FycmF5fSBsaXN0IG9mIHBhdGNoZXNcbiAqL1xuZnVuY3Rpb24gZGVzY3JpYmVQYXRjaChtb21lbnRzLCBwYXRjaFBvcywgeCwgeSkge1xuICAgIHZhciBrLFxuICAgICAgICBhdmcsXG4gICAgICAgIGVsaWdpYmxlTW9tZW50cyA9IFtdLFxuICAgICAgICBtYXRjaGluZ01vbWVudHMsXG4gICAgICAgIHBhdGNoLFxuICAgICAgICBwYXRjaGVzRm91bmQgPSBbXSxcbiAgICAgICAgbWluQ29tcG9uZW50V2VpZ2h0ID0gTWF0aC5jZWlsKF9wYXRjaFNpemUueCAvIDMpO1xuXG4gICAgaWYgKG1vbWVudHMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgLy8gb25seSBjb2xsZWN0IG1vbWVudHMgd2hpY2gncyBhcmVhIGNvdmVycyBhdCBsZWFzdCBtaW5Db21wb25lbnRXZWlnaHQgcGl4ZWxzLlxuICAgICAgICBmb3IgKCBrID0gMDsgayA8IG1vbWVudHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgIGlmIChtb21lbnRzW2tdLm0wMCA+IG1pbkNvbXBvbmVudFdlaWdodCkge1xuICAgICAgICAgICAgICAgIGVsaWdpYmxlTW9tZW50cy5wdXNoKG1vbWVudHNba10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgYXQgbGVhc3QgMiBtb21lbnRzIGFyZSBmb3VuZCB3aGljaCBoYXZlIGF0IGxlYXN0IG1pbkNvbXBvbmVudFdlaWdodHMgY292ZXJlZFxuICAgICAgICBpZiAoZWxpZ2libGVNb21lbnRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICBtYXRjaGluZ01vbWVudHMgPSBzaW1pbGFyTW9tZW50cyhlbGlnaWJsZU1vbWVudHMpO1xuICAgICAgICAgICAgYXZnID0gMDtcbiAgICAgICAgICAgIC8vIGRldGVybWluZSB0aGUgc2ltaWxhcml0eSBvZiB0aGUgbW9tZW50c1xuICAgICAgICAgICAgZm9yICggayA9IDA7IGsgPCBtYXRjaGluZ01vbWVudHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBhdmcgKz0gbWF0Y2hpbmdNb21lbnRzW2tdLnJhZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gT25seSB0d28gb2YgdGhlIG1vbWVudHMgYXJlIGFsbG93ZWQgbm90IHRvIGZpdCBpbnRvIHRoZSBlcXVhdGlvblxuICAgICAgICAgICAgLy8gYWRkIHRoZSBwYXRjaCB0byB0aGUgc2V0XG4gICAgICAgICAgICBpZiAobWF0Y2hpbmdNb21lbnRzLmxlbmd0aCA+IDFcbiAgICAgICAgICAgICAgICAgICAgJiYgbWF0Y2hpbmdNb21lbnRzLmxlbmd0aCA+PSAoZWxpZ2libGVNb21lbnRzLmxlbmd0aCAvIDQpICogM1xuICAgICAgICAgICAgICAgICAgICAmJiBtYXRjaGluZ01vbWVudHMubGVuZ3RoID4gbW9tZW50cy5sZW5ndGggLyA0KSB7XG4gICAgICAgICAgICAgICAgYXZnIC89IG1hdGNoaW5nTW9tZW50cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgcGF0Y2ggPSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBwYXRjaFBvc1sxXSAqIF9udW1QYXRjaGVzLnggKyBwYXRjaFBvc1swXSxcbiAgICAgICAgICAgICAgICAgICAgcG9zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogeVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBib3g6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlYzIuY2xvbmUoW3gsIHldKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlYzIuY2xvbmUoW3ggKyBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueCwgeV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmVjMi5jbG9uZShbeCArIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZS54LCB5ICsgX3N1YkltYWdlV3JhcHBlci5zaXplLnldKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlYzIuY2xvbmUoW3gsIHkgKyBfc3ViSW1hZ2VXcmFwcGVyLnNpemUueV0pXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIG1vbWVudHM6IG1hdGNoaW5nTW9tZW50cyxcbiAgICAgICAgICAgICAgICAgICAgcmFkOiBhdmcsXG4gICAgICAgICAgICAgICAgICAgIHZlYzogdmVjMi5jbG9uZShbTWF0aC5jb3MoYXZnKSwgTWF0aC5zaW4oYXZnKV0pXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBwYXRjaGVzRm91bmQucHVzaChwYXRjaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBhdGNoZXNGb3VuZDtcbn1cblxuLyoqXG4gKiBmaW5kcyBwYXRjaGVzIHdoaWNoIGFyZSBjb25uZWN0ZWQgYW5kIHNoYXJlIHRoZSBzYW1lIG9yaWVudGF0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gcGF0Y2hlc0ZvdW5kXG4gKi9cbmZ1bmN0aW9uIHJhc3Rlcml6ZUFuZ3VsYXJTaW1pbGFyaXR5KHBhdGNoZXNGb3VuZCkge1xuICAgIHZhciBsYWJlbCA9IDAsXG4gICAgICAgIHRocmVzaG9sZCA9IDAuOTUsXG4gICAgICAgIGN1cnJJZHggPSAwLFxuICAgICAgICBqLFxuICAgICAgICBwYXRjaCxcbiAgICAgICAgaHN2ID0gWzAsIDEsIDFdLFxuICAgICAgICByZ2IgPSBbMCwgMCwgMF07XG5cbiAgICBmdW5jdGlvbiBub3RZZXRQcm9jZXNzZWQoKSB7XG4gICAgICAgIHZhciBpO1xuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IF9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbaV0gPT09IDAgJiYgX3BhdGNoR3JpZC5kYXRhW2ldID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9wYXRjaExhYmVsR3JpZC5sZW5ndGg7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhY2UoY3VycmVudElkeCkge1xuICAgICAgICB2YXIgeCxcbiAgICAgICAgICAgIHksXG4gICAgICAgICAgICBjdXJyZW50UGF0Y2gsXG4gICAgICAgICAgICBpZHgsXG4gICAgICAgICAgICBkaXIsXG4gICAgICAgICAgICBjdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHg6IGN1cnJlbnRJZHggJSBfcGF0Y2hMYWJlbEdyaWQuc2l6ZS54LFxuICAgICAgICAgICAgICAgIHk6IChjdXJyZW50SWR4IC8gX3BhdGNoTGFiZWxHcmlkLnNpemUueCkgfCAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2ltaWxhcml0eTtcblxuICAgICAgICBpZiAoY3VycmVudElkeCA8IF9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgY3VycmVudFBhdGNoID0gX2ltYWdlVG9QYXRjaEdyaWQuZGF0YVtjdXJyZW50SWR4XTtcbiAgICAgICAgICAgIC8vIGFzc2lnbiBsYWJlbFxuICAgICAgICAgICAgX3BhdGNoTGFiZWxHcmlkLmRhdGFbY3VycmVudElkeF0gPSBsYWJlbDtcbiAgICAgICAgICAgIGZvciAoIGRpciA9IDA7IGRpciA8IFRyYWNlci5zZWFyY2hEaXJlY3Rpb25zLmxlbmd0aDsgZGlyKyspIHtcbiAgICAgICAgICAgICAgICB5ID0gY3VycmVudC55ICsgVHJhY2VyLnNlYXJjaERpcmVjdGlvbnNbZGlyXVswXTtcbiAgICAgICAgICAgICAgICB4ID0gY3VycmVudC54ICsgVHJhY2VyLnNlYXJjaERpcmVjdGlvbnNbZGlyXVsxXTtcbiAgICAgICAgICAgICAgICBpZHggPSB5ICogX3BhdGNoTGFiZWxHcmlkLnNpemUueCArIHg7XG5cbiAgICAgICAgICAgICAgICAvLyBjb250aW51ZSBpZiBwYXRjaCBlbXB0eVxuICAgICAgICAgICAgICAgIGlmIChfcGF0Y2hHcmlkLmRhdGFbaWR4XSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBfcGF0Y2hMYWJlbEdyaWQuZGF0YVtpZHhdID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKF9wYXRjaExhYmVsR3JpZC5kYXRhW2lkeF0gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2ltaWxhcml0eSA9IE1hdGguYWJzKHZlYzIuZG90KF9pbWFnZVRvUGF0Y2hHcmlkLmRhdGFbaWR4XS52ZWMsIGN1cnJlbnRQYXRjaC52ZWMpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpbWlsYXJpdHkgPiB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNlKGlkeCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwcmVwYXJlIGZvciBmaW5kaW5nIHRoZSByaWdodCBwYXRjaGVzXG4gICAgQXJyYXlIZWxwZXIuaW5pdChfcGF0Y2hHcmlkLmRhdGEsIDApO1xuICAgIEFycmF5SGVscGVyLmluaXQoX3BhdGNoTGFiZWxHcmlkLmRhdGEsIDApO1xuICAgIEFycmF5SGVscGVyLmluaXQoX2ltYWdlVG9QYXRjaEdyaWQuZGF0YSwgbnVsbCk7XG5cbiAgICBmb3IgKCBqID0gMDsgaiA8IHBhdGNoZXNGb3VuZC5sZW5ndGg7IGorKykge1xuICAgICAgICBwYXRjaCA9IHBhdGNoZXNGb3VuZFtqXTtcbiAgICAgICAgX2ltYWdlVG9QYXRjaEdyaWQuZGF0YVtwYXRjaC5pbmRleF0gPSBwYXRjaDtcbiAgICAgICAgX3BhdGNoR3JpZC5kYXRhW3BhdGNoLmluZGV4XSA9IDE7XG4gICAgfVxuXG4gICAgLy8gcmFzdGVyaXplIHRoZSBwYXRjaGVzIGZvdW5kIHRvIGRldGVybWluZSBhcmVhXG4gICAgX3BhdGNoR3JpZC56ZXJvQm9yZGVyKCk7XG5cbiAgICB3aGlsZSAoKCBjdXJySWR4ID0gbm90WWV0UHJvY2Vzc2VkKCkpIDwgX3BhdGNoTGFiZWxHcmlkLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgIGxhYmVsKys7XG4gICAgICAgIHRyYWNlKGN1cnJJZHgpO1xuICAgIH1cblxuICAgIC8vIGRyYXcgcGF0Y2gtbGFiZWxzIGlmIHJlcXVlc3RlZFxuICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQgJiYgX2NvbmZpZy5kZWJ1Zy5zaG93UGF0Y2hMYWJlbHMpIHtcbiAgICAgICAgZm9yICggaiA9IDA7IGogPCBfcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKF9wYXRjaExhYmVsR3JpZC5kYXRhW2pdID4gMCAmJiBfcGF0Y2hMYWJlbEdyaWQuZGF0YVtqXSA8PSBsYWJlbCkge1xuICAgICAgICAgICAgICAgIHBhdGNoID0gX2ltYWdlVG9QYXRjaEdyaWQuZGF0YVtqXTtcbiAgICAgICAgICAgICAgICBoc3ZbMF0gPSAoX3BhdGNoTGFiZWxHcmlkLmRhdGFbal0gLyAobGFiZWwgKyAxKSkgKiAzNjA7XG4gICAgICAgICAgICAgICAgaHN2MnJnYihoc3YsIHJnYik7XG4gICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3UmVjdChwYXRjaC5wb3MsIF9zdWJJbWFnZVdyYXBwZXIuc2l6ZSwgX2NhbnZhc0NvbnRhaW5lci5jdHguYmluYXJ5LFxuICAgICAgICAgICAgICAgICAgICB7Y29sb3I6IFwicmdiKFwiICsgcmdiLmpvaW4oXCIsXCIpICsgXCIpXCIsIGxpbmVXaWR0aDogMn0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGxhYmVsO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaW5pdDogZnVuY3Rpb24oaW5wdXRJbWFnZVdyYXBwZXIsIGNvbmZpZykge1xuICAgICAgICBfY29uZmlnID0gY29uZmlnO1xuICAgICAgICBfaW5wdXRJbWFnZVdyYXBwZXIgPSBpbnB1dEltYWdlV3JhcHBlcjtcblxuICAgICAgICBpbml0QnVmZmVycygpO1xuICAgICAgICBpbml0Q2FudmFzKCk7XG4gICAgfSxcblxuICAgIGxvY2F0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwYXRjaGVzRm91bmQsXG4gICAgICAgICAgICB0b3BMYWJlbHMsXG4gICAgICAgICAgICBib3hlcztcblxuICAgICAgICBpZiAoX2NvbmZpZy5oYWxmU2FtcGxlKSB7XG4gICAgICAgICAgICBoYWxmU2FtcGxlKF9pbnB1dEltYWdlV3JhcHBlciwgX2N1cnJlbnRJbWFnZVdyYXBwZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgYmluYXJpemVJbWFnZSgpO1xuICAgICAgICBwYXRjaGVzRm91bmQgPSBmaW5kUGF0Y2hlcygpO1xuICAgICAgICAvLyByZXR1cm4gdW5sZXNzIDUlIG9yIG1vcmUgcGF0Y2hlcyBhcmUgZm91bmRcbiAgICAgICAgaWYgKHBhdGNoZXNGb3VuZC5sZW5ndGggPCBfbnVtUGF0Y2hlcy54ICogX251bVBhdGNoZXMueSAqIDAuMDUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmFzdGVycml6ZSBhcmVhIGJ5IGNvbXBhcmluZyBhbmd1bGFyIHNpbWlsYXJpdHk7XG4gICAgICAgIHZhciBtYXhMYWJlbCA9IHJhc3Rlcml6ZUFuZ3VsYXJTaW1pbGFyaXR5KHBhdGNoZXNGb3VuZCk7XG4gICAgICAgIGlmIChtYXhMYWJlbCA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2VhcmNoIGZvciBhcmVhIHdpdGggdGhlIG1vc3QgcGF0Y2hlcyAoYmlnZ2VzdCBjb25uZWN0ZWQgYXJlYSlcbiAgICAgICAgdG9wTGFiZWxzID0gZmluZEJpZ2dlc3RDb25uZWN0ZWRBcmVhcyhtYXhMYWJlbCk7XG4gICAgICAgIGlmICh0b3BMYWJlbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGJveGVzID0gZmluZEJveGVzKHRvcExhYmVscywgbWF4TGFiZWwpO1xuICAgICAgICByZXR1cm4gYm94ZXM7XG4gICAgfSxcblxuICAgIGNoZWNrSW1hZ2VDb25zdHJhaW50czogZnVuY3Rpb24oaW5wdXRTdHJlYW0sIGNvbmZpZykge1xuICAgICAgICB2YXIgcGF0Y2hTaXplLFxuICAgICAgICAgICAgd2lkdGggPSBpbnB1dFN0cmVhbS5nZXRXaWR0aCgpLFxuICAgICAgICAgICAgaGVpZ2h0ID0gaW5wdXRTdHJlYW0uZ2V0SGVpZ2h0KCksXG4gICAgICAgICAgICBoYWxmU2FtcGxlID0gY29uZmlnLmhhbGZTYW1wbGUgPyAwLjUgOiAxLFxuICAgICAgICAgICAgc2l6ZSxcbiAgICAgICAgICAgIGFyZWE7XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIHdpZHRoIGFuZCBoZWlnaHQgYmFzZWQgb24gYXJlYVxuICAgICAgICBpZiAoaW5wdXRTdHJlYW0uZ2V0Q29uZmlnKCkuYXJlYSkge1xuICAgICAgICAgICAgYXJlYSA9IGNvbXB1dGVJbWFnZUFyZWEod2lkdGgsIGhlaWdodCwgaW5wdXRTdHJlYW0uZ2V0Q29uZmlnKCkuYXJlYSk7XG4gICAgICAgICAgICBpbnB1dFN0cmVhbS5zZXRUb3BSaWdodCh7eDogYXJlYS5zeCwgeTogYXJlYS5zeX0pO1xuICAgICAgICAgICAgaW5wdXRTdHJlYW0uc2V0Q2FudmFzU2l6ZSh7eDogd2lkdGgsIHk6IGhlaWdodH0pO1xuICAgICAgICAgICAgd2lkdGggPSBhcmVhLnN3O1xuICAgICAgICAgICAgaGVpZ2h0ID0gYXJlYS5zaDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNpemUgPSB7XG4gICAgICAgICAgICB4OiBNYXRoLmZsb29yKHdpZHRoICogaGFsZlNhbXBsZSksXG4gICAgICAgICAgICB5OiBNYXRoLmZsb29yKGhlaWdodCAqIGhhbGZTYW1wbGUpXG4gICAgICAgIH07XG5cbiAgICAgICAgcGF0Y2hTaXplID0gY2FsY3VsYXRlUGF0Y2hTaXplKGNvbmZpZy5wYXRjaFNpemUsIHNpemUpO1xuICAgICAgICBpZiAoRU5WLmRldmVsb3BtZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBhdGNoLVNpemU6IFwiICsgSlNPTi5zdHJpbmdpZnkocGF0Y2hTaXplKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpbnB1dFN0cmVhbS5zZXRXaWR0aChNYXRoLmZsb29yKE1hdGguZmxvb3Ioc2l6ZS54IC8gcGF0Y2hTaXplLngpICogKDEgLyBoYWxmU2FtcGxlKSAqIHBhdGNoU2l6ZS54KSk7XG4gICAgICAgIGlucHV0U3RyZWFtLnNldEhlaWdodChNYXRoLmZsb29yKE1hdGguZmxvb3Ioc2l6ZS55IC8gcGF0Y2hTaXplLnkpICogKDEgLyBoYWxmU2FtcGxlKSAqIHBhdGNoU2l6ZS55KSk7XG5cbiAgICAgICAgaWYgKChpbnB1dFN0cmVhbS5nZXRXaWR0aCgpICUgcGF0Y2hTaXplLngpID09PSAwICYmIChpbnB1dFN0cmVhbS5nZXRIZWlnaHQoKSAlIHBhdGNoU2l6ZS55KSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbWFnZSBkaW1lbnNpb25zIGRvIG5vdCBjb21wbHkgd2l0aCB0aGUgY3VycmVudCBzZXR0aW5nczogV2lkdGggKFwiICtcbiAgICAgICAgICAgIHdpZHRoICsgXCIgKWFuZCBoZWlnaHQgKFwiICsgaGVpZ2h0ICtcbiAgICAgICAgICAgIFwiKSBtdXN0IGEgbXVsdGlwbGUgb2YgXCIgKyBwYXRjaFNpemUueCk7XG4gICAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sb2NhdG9yL2JhcmNvZGVfbG9jYXRvci5qcyIsImltcG9ydCBUcmFjZXIgZnJvbSAnLi90cmFjZXInO1xuXG4vKipcbiAqIGh0dHA6Ly93d3cuY29kZXByb2plY3QuY29tL1RpcHMvNDA3MTcyL0Nvbm5lY3RlZC1Db21wb25lbnQtTGFiZWxpbmctYW5kLVZlY3Rvcml6YXRpb25cbiAqL1xudmFyIFJhc3Rlcml6ZXIgPSB7XG4gICAgY3JlYXRlQ29udG91cjJEOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpcjogbnVsbCxcbiAgICAgICAgICAgIGluZGV4OiBudWxsLFxuICAgICAgICAgICAgZmlyc3RWZXJ0ZXg6IG51bGwsXG4gICAgICAgICAgICBpbnNpZGVDb250b3VyczogbnVsbCxcbiAgICAgICAgICAgIG5leHRwZWVyOiBudWxsLFxuICAgICAgICAgICAgcHJldnBlZXI6IG51bGxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIENPTlRPVVJfRElSOiB7XG4gICAgICAgIENXX0RJUjogMCxcbiAgICAgICAgQ0NXX0RJUjogMSxcbiAgICAgICAgVU5LTk9XTl9ESVI6IDJcbiAgICB9LFxuICAgIERJUjoge1xuICAgICAgICBPVVRTSURFX0VER0U6IC0zMjc2NyxcbiAgICAgICAgSU5TSURFX0VER0U6IC0zMjc2NlxuICAgIH0sXG4gICAgY3JlYXRlOiBmdW5jdGlvbihpbWFnZVdyYXBwZXIsIGxhYmVsV3JhcHBlcikge1xuICAgICAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2VXcmFwcGVyLmRhdGEsXG4gICAgICAgICAgICBsYWJlbERhdGEgPSBsYWJlbFdyYXBwZXIuZGF0YSxcbiAgICAgICAgICAgIHdpZHRoID0gaW1hZ2VXcmFwcGVyLnNpemUueCxcbiAgICAgICAgICAgIGhlaWdodCA9IGltYWdlV3JhcHBlci5zaXplLnksXG4gICAgICAgICAgICB0cmFjZXIgPSBUcmFjZXIuY3JlYXRlKGltYWdlV3JhcHBlciwgbGFiZWxXcmFwcGVyKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmFzdGVyaXplOiBmdW5jdGlvbihkZXB0aGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbG9yLFxuICAgICAgICAgICAgICAgICAgICBiYyxcbiAgICAgICAgICAgICAgICAgICAgbGMsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGN4LFxuICAgICAgICAgICAgICAgICAgICBjeSxcbiAgICAgICAgICAgICAgICAgICAgY29sb3JNYXAgPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4LFxuICAgICAgICAgICAgICAgICAgICBwLFxuICAgICAgICAgICAgICAgICAgICBjYyxcbiAgICAgICAgICAgICAgICAgICAgc2MsXG4gICAgICAgICAgICAgICAgICAgIHBvcyxcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGVkQ291bnQgPSAwLFxuICAgICAgICAgICAgICAgICAgICBpO1xuXG4gICAgICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCA0MDA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb2xvck1hcFtpXSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29sb3JNYXBbMF0gPSBpbWFnZURhdGFbMF07XG4gICAgICAgICAgICAgICAgY2MgPSBudWxsO1xuICAgICAgICAgICAgICAgIGZvciAoIGN5ID0gMTsgY3kgPCBoZWlnaHQgLSAxOyBjeSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICBiYyA9IGNvbG9yTWFwWzBdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKCBjeCA9IDE7IGN4IDwgd2lkdGggLSAxOyBjeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSBjeSAqIHdpZHRoICsgY3g7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWxEYXRhW3Bvc10gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IGltYWdlRGF0YVtwb3NdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xvciAhPT0gYmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxjID0gY29ubmVjdGVkQ291bnQgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JNYXBbbGNdID0gY29sb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYyA9IGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVydGV4ID0gdHJhY2VyLmNvbnRvdXJUcmFjaW5nKGN5LCBjeCwgbGMsIGNvbG9yLCBSYXN0ZXJpemVyLkRJUi5PVVRTSURFX0VER0UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZlcnRleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3RlZENvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxpbmRleCA9IGxjO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBSYXN0ZXJpemVyLmNyZWF0ZUNvbnRvdXIyRCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuZGlyID0gUmFzdGVyaXplci5DT05UT1VSX0RJUi5DV19ESVI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5pbmRleCA9IGxhYmVsaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5maXJzdFZlcnRleCA9IHZlcnRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLm5leHRwZWVyID0gY2M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5pbnNpZGVDb250b3VycyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNjICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnByZXZwZWVyID0gcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MgPSBwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVydGV4ID0gdHJhY2VyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvbnRvdXJUcmFjaW5nKGN5LCBjeCwgUmFzdGVyaXplci5ESVIuSU5TSURFX0VER0UsIGNvbG9yLCBsYWJlbGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2ZXJ0ZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwID0gUmFzdGVyaXplci5jcmVhdGVDb250b3VyMkQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmZpcnN0VmVydGV4ID0gdmVydGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuaW5zaWRlQ29udG91cnMgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXB0aGxhYmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuZGlyID0gUmFzdGVyaXplci5DT05UT1VSX0RJUi5DQ1dfRElSO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuZGlyID0gUmFzdGVyaXplci5DT05UT1VSX0RJUi5DV19ESVI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuaW5kZXggPSBkZXB0aGxhYmVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjID0gY2M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKChzYyAhPT0gbnVsbCkgJiYgc2MuaW5kZXggIT09IGxhYmVsaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2MgPSBzYy5uZXh0cGVlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubmV4dHBlZXIgPSBzYy5pbnNpZGVDb250b3VycztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjLmluc2lkZUNvbnRvdXJzICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYy5pbnNpZGVDb250b3Vycy5wcmV2cGVlciA9IHA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2MuaW5zaWRlQ29udG91cnMgPSBwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsRGF0YVtwb3NdID0gbGFiZWxpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxhYmVsRGF0YVtwb3NdID09PSBSYXN0ZXJpemVyLkRJUi5PVVRTSURFX0VER0VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgbGFiZWxEYXRhW3Bvc10gPT09IFJhc3Rlcml6ZXIuRElSLklOU0lERV9FREdFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsRGF0YVtwb3NdID09PSBSYXN0ZXJpemVyLkRJUi5JTlNJREVfRURHRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYyA9IGltYWdlRGF0YVtwb3NdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJjID0gY29sb3JNYXBbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbGluZGV4ID0gbGFiZWxEYXRhW3Bvc107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmMgPSBjb2xvck1hcFtsYWJlbGluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzYyA9IGNjO1xuICAgICAgICAgICAgICAgIHdoaWxlIChzYyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBzYy5pbmRleCA9IGRlcHRobGFiZWw7XG4gICAgICAgICAgICAgICAgICAgIHNjID0gc2MubmV4dHBlZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGNjOiBjYyxcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IGNvbm5lY3RlZENvdW50XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWJ1Zzoge1xuICAgICAgICAgICAgICAgIGRyYXdDb250b3VyOiBmdW5jdGlvbihjYW52YXMsIGZpcnN0Q29udG91cikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBxID0gZmlyc3RDb250b3VyLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXEsXG4gICAgICAgICAgICAgICAgICAgICAgICBxLFxuICAgICAgICAgICAgICAgICAgICAgICAgcDtcblxuICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcInJlZFwiO1xuICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBxICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpcSA9IHBxLmluc2lkZUNvbnRvdXJzO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXEgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHBxICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXEgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxID0gaXE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXEgPSBpcS5uZXh0cGVlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcSA9IHBxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBxID0gcHEubmV4dHBlZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBxICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlxID0gcHEuaW5zaWRlQ29udG91cnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXEgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChxLmRpcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBSYXN0ZXJpemVyLkNPTlRPVVJfRElSLkNXX0RJUjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcInJlZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBSYXN0ZXJpemVyLkNPTlRPVVJfRElSLkNDV19ESVI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJibHVlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFJhc3Rlcml6ZXIuQ09OVE9VUl9ESVIuVU5LTk9XTl9ESVI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBwID0gcS5maXJzdFZlcnRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5tb3ZlVG8ocC54LCBwLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBwLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVUbyhwLngsIHAueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IHdoaWxlIChwICE9PSBxLmZpcnN0VmVydGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSYXN0ZXJpemVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xvY2F0b3IvcmFzdGVyaXplci5qcyIsIi8qIEBwcmVzZXJ2ZSBBU00gQkVHSU4gKi9cbi8qIGVzbGludC1kaXNhYmxlIGVxZXFlcSovXG5mdW5jdGlvbiBTa2VsZXRvbml6ZXIoc3RkbGliLCBmb3JlaWduLCBidWZmZXIpIHtcbiAgICBcInVzZSBhc21cIjtcblxuICAgIHZhciBpbWFnZXMgPSBuZXcgc3RkbGliLlVpbnQ4QXJyYXkoYnVmZmVyKSxcbiAgICAgICAgc2l6ZSA9IGZvcmVpZ24uc2l6ZSB8IDAsXG4gICAgICAgIGltdWwgPSBzdGRsaWIuTWF0aC5pbXVsO1xuXG4gICAgZnVuY3Rpb24gZXJvZGUoaW5JbWFnZVB0ciwgb3V0SW1hZ2VQdHIpIHtcbiAgICAgICAgaW5JbWFnZVB0ciA9IGluSW1hZ2VQdHIgfCAwO1xuICAgICAgICBvdXRJbWFnZVB0ciA9IG91dEltYWdlUHRyIHwgMDtcblxuICAgICAgICB2YXIgdiA9IDAsXG4gICAgICAgICAgICB1ID0gMCxcbiAgICAgICAgICAgIHN1bSA9IDAsXG4gICAgICAgICAgICB5U3RhcnQxID0gMCxcbiAgICAgICAgICAgIHlTdGFydDIgPSAwLFxuICAgICAgICAgICAgeFN0YXJ0MSA9IDAsXG4gICAgICAgICAgICB4U3RhcnQyID0gMCxcbiAgICAgICAgICAgIG9mZnNldCA9IDA7XG5cbiAgICAgICAgZm9yICggdiA9IDE7ICh2IHwgMCkgPCAoKHNpemUgLSAxKSB8IDApOyB2ID0gKHYgKyAxKSB8IDApIHtcbiAgICAgICAgICAgIG9mZnNldCA9IChvZmZzZXQgKyBzaXplKSB8IDA7XG4gICAgICAgICAgICBmb3IgKCB1ID0gMTsgKHUgfCAwKSA8ICgoc2l6ZSAtIDEpIHwgMCk7IHUgPSAodSArIDEpIHwgMCkge1xuICAgICAgICAgICAgICAgIHlTdGFydDEgPSAob2Zmc2V0IC0gc2l6ZSkgfCAwO1xuICAgICAgICAgICAgICAgIHlTdGFydDIgPSAob2Zmc2V0ICsgc2l6ZSkgfCAwO1xuICAgICAgICAgICAgICAgIHhTdGFydDEgPSAodSAtIDEpIHwgMDtcbiAgICAgICAgICAgICAgICB4U3RhcnQyID0gKHUgKyAxKSB8IDA7XG4gICAgICAgICAgICAgICAgc3VtID0gKChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQxICsgeFN0YXJ0MSkgfCAwXSB8IDApXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDEgKyB4U3RhcnQyKSB8IDBdIHwgMClcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgb2Zmc2V0ICsgdSkgfCAwXSB8IDApXG4gICAgICAgICAgICAgICAgICAgICsgKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDIgKyB4U3RhcnQxKSB8IDBdIHwgMClcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MiArIHhTdGFydDIpIHwgMF0gfCAwKSkgfCAwO1xuICAgICAgICAgICAgICAgIGlmICgoc3VtIHwgMCkgPT0gKDUgfCAwKSkge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZXNbKG91dEltYWdlUHRyICsgb2Zmc2V0ICsgdSkgfCAwXSA9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIG9mZnNldCArIHUpIHwgMF0gPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3VidHJhY3QoYUltYWdlUHRyLCBiSW1hZ2VQdHIsIG91dEltYWdlUHRyKSB7XG4gICAgICAgIGFJbWFnZVB0ciA9IGFJbWFnZVB0ciB8IDA7XG4gICAgICAgIGJJbWFnZVB0ciA9IGJJbWFnZVB0ciB8IDA7XG4gICAgICAgIG91dEltYWdlUHRyID0gb3V0SW1hZ2VQdHIgfCAwO1xuXG4gICAgICAgIHZhciBsZW5ndGggPSAwO1xuXG4gICAgICAgIGxlbmd0aCA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xuXG4gICAgICAgIHdoaWxlICgobGVuZ3RoIHwgMCkgPiAwKSB7XG4gICAgICAgICAgICBsZW5ndGggPSAobGVuZ3RoIC0gMSkgfCAwO1xuICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSA9XG4gICAgICAgICAgICAgICAgKChpbWFnZXNbKGFJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSB8IDApIC0gKGltYWdlc1soYkltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCkpIHwgMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJpdHdpc2VPcihhSW1hZ2VQdHIsIGJJbWFnZVB0ciwgb3V0SW1hZ2VQdHIpIHtcbiAgICAgICAgYUltYWdlUHRyID0gYUltYWdlUHRyIHwgMDtcbiAgICAgICAgYkltYWdlUHRyID0gYkltYWdlUHRyIHwgMDtcbiAgICAgICAgb3V0SW1hZ2VQdHIgPSBvdXRJbWFnZVB0ciB8IDA7XG5cbiAgICAgICAgdmFyIGxlbmd0aCA9IDA7XG5cbiAgICAgICAgbGVuZ3RoID0gaW11bChzaXplLCBzaXplKSB8IDA7XG5cbiAgICAgICAgd2hpbGUgKChsZW5ndGggfCAwKSA+IDApIHtcbiAgICAgICAgICAgIGxlbmd0aCA9IChsZW5ndGggLSAxKSB8IDA7XG4gICAgICAgICAgICBpbWFnZXNbKG91dEltYWdlUHRyICsgbGVuZ3RoKSB8IDBdID1cbiAgICAgICAgICAgICAgICAoKGltYWdlc1soYUltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCkgfCAoaW1hZ2VzWyhiSW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKSkgfCAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY291bnROb25aZXJvKGltYWdlUHRyKSB7XG4gICAgICAgIGltYWdlUHRyID0gaW1hZ2VQdHIgfCAwO1xuXG4gICAgICAgIHZhciBzdW0gPSAwLFxuICAgICAgICAgICAgbGVuZ3RoID0gMDtcblxuICAgICAgICBsZW5ndGggPSBpbXVsKHNpemUsIHNpemUpIHwgMDtcblxuICAgICAgICB3aGlsZSAoKGxlbmd0aCB8IDApID4gMCkge1xuICAgICAgICAgICAgbGVuZ3RoID0gKGxlbmd0aCAtIDEpIHwgMDtcbiAgICAgICAgICAgIHN1bSA9ICgoc3VtIHwgMCkgKyAoaW1hZ2VzWyhpbWFnZVB0ciArIGxlbmd0aCkgfCAwXSB8IDApKSB8IDA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKHN1bSB8IDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoaW1hZ2VQdHIsIHZhbHVlKSB7XG4gICAgICAgIGltYWdlUHRyID0gaW1hZ2VQdHIgfCAwO1xuICAgICAgICB2YWx1ZSA9IHZhbHVlIHwgMDtcblxuICAgICAgICB2YXIgbGVuZ3RoID0gMDtcblxuICAgICAgICBsZW5ndGggPSBpbXVsKHNpemUsIHNpemUpIHwgMDtcblxuICAgICAgICB3aGlsZSAoKGxlbmd0aCB8IDApID4gMCkge1xuICAgICAgICAgICAgbGVuZ3RoID0gKGxlbmd0aCAtIDEpIHwgMDtcbiAgICAgICAgICAgIGltYWdlc1soaW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpbGF0ZShpbkltYWdlUHRyLCBvdXRJbWFnZVB0cikge1xuICAgICAgICBpbkltYWdlUHRyID0gaW5JbWFnZVB0ciB8IDA7XG4gICAgICAgIG91dEltYWdlUHRyID0gb3V0SW1hZ2VQdHIgfCAwO1xuXG4gICAgICAgIHZhciB2ID0gMCxcbiAgICAgICAgICAgIHUgPSAwLFxuICAgICAgICAgICAgc3VtID0gMCxcbiAgICAgICAgICAgIHlTdGFydDEgPSAwLFxuICAgICAgICAgICAgeVN0YXJ0MiA9IDAsXG4gICAgICAgICAgICB4U3RhcnQxID0gMCxcbiAgICAgICAgICAgIHhTdGFydDIgPSAwLFxuICAgICAgICAgICAgb2Zmc2V0ID0gMDtcblxuICAgICAgICBmb3IgKCB2ID0gMTsgKHYgfCAwKSA8ICgoc2l6ZSAtIDEpIHwgMCk7IHYgPSAodiArIDEpIHwgMCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gKG9mZnNldCArIHNpemUpIHwgMDtcbiAgICAgICAgICAgIGZvciAoIHUgPSAxOyAodSB8IDApIDwgKChzaXplIC0gMSkgfCAwKTsgdSA9ICh1ICsgMSkgfCAwKSB7XG4gICAgICAgICAgICAgICAgeVN0YXJ0MSA9IChvZmZzZXQgLSBzaXplKSB8IDA7XG4gICAgICAgICAgICAgICAgeVN0YXJ0MiA9IChvZmZzZXQgKyBzaXplKSB8IDA7XG4gICAgICAgICAgICAgICAgeFN0YXJ0MSA9ICh1IC0gMSkgfCAwO1xuICAgICAgICAgICAgICAgIHhTdGFydDIgPSAodSArIDEpIHwgMDtcbiAgICAgICAgICAgICAgICBzdW0gPSAoKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDEgKyB4U3RhcnQxKSB8IDBdIHwgMClcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MSArIHhTdGFydDIpIHwgMF0gfCAwKVxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyBvZmZzZXQgKyB1KSB8IDBdIHwgMClcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MiArIHhTdGFydDEpIHwgMF0gfCAwKVxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQyICsgeFN0YXJ0MikgfCAwXSB8IDApKSB8IDA7XG4gICAgICAgICAgICAgICAgaWYgKChzdW0gfCAwKSA+ICgwIHwgMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIG9mZnNldCArIHUpIHwgMF0gPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlc1sob3V0SW1hZ2VQdHIgKyBvZmZzZXQgKyB1KSB8IDBdID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1lbWNweShzcmNJbWFnZVB0ciwgZHN0SW1hZ2VQdHIpIHtcbiAgICAgICAgc3JjSW1hZ2VQdHIgPSBzcmNJbWFnZVB0ciB8IDA7XG4gICAgICAgIGRzdEltYWdlUHRyID0gZHN0SW1hZ2VQdHIgfCAwO1xuXG4gICAgICAgIHZhciBsZW5ndGggPSAwO1xuXG4gICAgICAgIGxlbmd0aCA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xuXG4gICAgICAgIHdoaWxlICgobGVuZ3RoIHwgMCkgPiAwKSB7XG4gICAgICAgICAgICBsZW5ndGggPSAobGVuZ3RoIC0gMSkgfCAwO1xuICAgICAgICAgICAgaW1hZ2VzWyhkc3RJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSA9IChpbWFnZXNbKHNyY0ltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB6ZXJvQm9yZGVyKGltYWdlUHRyKSB7XG4gICAgICAgIGltYWdlUHRyID0gaW1hZ2VQdHIgfCAwO1xuXG4gICAgICAgIHZhciB4ID0gMCxcbiAgICAgICAgICAgIHkgPSAwO1xuXG4gICAgICAgIGZvciAoIHggPSAwOyAoeCB8IDApIDwgKChzaXplIC0gMSkgfCAwKTsgeCA9ICh4ICsgMSkgfCAwKSB7XG4gICAgICAgICAgICBpbWFnZXNbKGltYWdlUHRyICsgeCkgfCAwXSA9IDA7XG4gICAgICAgICAgICBpbWFnZXNbKGltYWdlUHRyICsgeSkgfCAwXSA9IDA7XG4gICAgICAgICAgICB5ID0gKCh5ICsgc2l6ZSkgLSAxKSB8IDA7XG4gICAgICAgICAgICBpbWFnZXNbKGltYWdlUHRyICsgeSkgfCAwXSA9IDA7XG4gICAgICAgICAgICB5ID0gKHkgKyAxKSB8IDA7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICggeCA9IDA7ICh4IHwgMCkgPCAoc2l6ZSB8IDApOyB4ID0gKHggKyAxKSB8IDApIHtcbiAgICAgICAgICAgIGltYWdlc1soaW1hZ2VQdHIgKyB5KSB8IDBdID0gMDtcbiAgICAgICAgICAgIHkgPSAoeSArIDEpIHwgMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNrZWxldG9uaXplKCkge1xuICAgICAgICB2YXIgc3ViSW1hZ2VQdHIgPSAwLFxuICAgICAgICAgICAgZXJvZGVkSW1hZ2VQdHIgPSAwLFxuICAgICAgICAgICAgdGVtcEltYWdlUHRyID0gMCxcbiAgICAgICAgICAgIHNrZWxJbWFnZVB0ciA9IDAsXG4gICAgICAgICAgICBzdW0gPSAwLFxuICAgICAgICAgICAgZG9uZSA9IDA7XG5cbiAgICAgICAgZXJvZGVkSW1hZ2VQdHIgPSBpbXVsKHNpemUsIHNpemUpIHwgMDtcbiAgICAgICAgdGVtcEltYWdlUHRyID0gKGVyb2RlZEltYWdlUHRyICsgZXJvZGVkSW1hZ2VQdHIpIHwgMDtcbiAgICAgICAgc2tlbEltYWdlUHRyID0gKHRlbXBJbWFnZVB0ciArIGVyb2RlZEltYWdlUHRyKSB8IDA7XG5cbiAgICAgICAgLy8gaW5pdCBza2VsLWltYWdlXG4gICAgICAgIGluaXQoc2tlbEltYWdlUHRyLCAwKTtcbiAgICAgICAgemVyb0JvcmRlcihzdWJJbWFnZVB0cik7XG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgZXJvZGUoc3ViSW1hZ2VQdHIsIGVyb2RlZEltYWdlUHRyKTtcbiAgICAgICAgICAgIGRpbGF0ZShlcm9kZWRJbWFnZVB0ciwgdGVtcEltYWdlUHRyKTtcbiAgICAgICAgICAgIHN1YnRyYWN0KHN1YkltYWdlUHRyLCB0ZW1wSW1hZ2VQdHIsIHRlbXBJbWFnZVB0cik7XG4gICAgICAgICAgICBiaXR3aXNlT3Ioc2tlbEltYWdlUHRyLCB0ZW1wSW1hZ2VQdHIsIHNrZWxJbWFnZVB0cik7XG4gICAgICAgICAgICBtZW1jcHkoZXJvZGVkSW1hZ2VQdHIsIHN1YkltYWdlUHRyKTtcbiAgICAgICAgICAgIHN1bSA9IGNvdW50Tm9uWmVybyhzdWJJbWFnZVB0cikgfCAwO1xuICAgICAgICAgICAgZG9uZSA9ICgoc3VtIHwgMCkgPT0gMCB8IDApO1xuICAgICAgICB9IHdoaWxlICghZG9uZSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHNrZWxldG9uaXplOiBza2VsZXRvbml6ZVxuICAgIH07XG59XG4vKiBAcHJlc2VydmUgQVNNIEVORCAqL1xuZXhwb3J0IGRlZmF1bHQgU2tlbGV0b25pemVyO1xuLyogZXNsaW50LWVuYWJsZSBlcWVxZXEqL1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xvY2F0b3Ivc2tlbGV0b25pemVyLmpzIiwiaW1wb3J0IEJhcmNvZGVSZWFkZXIgZnJvbSAnLi9iYXJjb2RlX3JlYWRlcic7XG5cbmZ1bmN0aW9uIENvZGFiYXJSZWFkZXIoKSB7XG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMpO1xuICAgIHRoaXMuX2NvdW50ZXJzID0gW107XG59XG5cbnZhciBwcm9wZXJ0aWVzID0ge1xuICAgIEFMUEhBQkVUSF9TVFJJTkc6IHt2YWx1ZTogXCIwMTIzNDU2Nzg5LSQ6Ly4rQUJDRFwifSxcbiAgICBBTFBIQUJFVDoge3ZhbHVlOiBbNDgsIDQ5LCA1MCwgNTEsIDUyLCA1MywgNTQsIDU1LCA1NiwgNTcsIDQ1LCAzNiwgNTgsIDQ3LCA0NiwgNDMsIDY1LCA2NiwgNjcsIDY4XX0sXG4gICAgQ0hBUkFDVEVSX0VOQ09ESU5HUzoge3ZhbHVlOiBbMHgwMDMsIDB4MDA2LCAweDAwOSwgMHgwNjAsIDB4MDEyLCAweDA0MiwgMHgwMjEsIDB4MDI0LCAweDAzMCwgMHgwNDgsIDB4MDBjLCAweDAxOCxcbiAgICAgICAgMHgwNDUsIDB4MDUxLCAweDA1NCwgMHgwMTUsIDB4MDFBLCAweDAyOSwgMHgwMEIsIDB4MDBFXX0sXG4gICAgU1RBUlRfRU5EOiB7dmFsdWU6IFsweDAxQSwgMHgwMjksIDB4MDBCLCAweDAwRV19LFxuICAgIE1JTl9FTkNPREVEX0NIQVJTOiB7dmFsdWU6IDR9LFxuICAgIE1BWF9BQ0NFUFRBQkxFOiB7dmFsdWU6IDIuMH0sXG4gICAgUEFERElORzoge3ZhbHVlOiAxLjV9LFxuICAgIEZPUk1BVDoge3ZhbHVlOiBcImNvZGFiYXJcIiwgd3JpdGVhYmxlOiBmYWxzZX1cbn07XG5cbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvZGFiYXJSZWFkZXI7XG5cbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl9kZWNvZGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgICBzdGFydCxcbiAgICAgICAgZGVjb2RlZENoYXIsXG4gICAgICAgIHBhdHRlcm4sXG4gICAgICAgIG5leHRTdGFydCxcbiAgICAgICAgZW5kO1xuXG4gICAgdGhpcy5fY291bnRlcnMgPSBzZWxmLl9maWxsQ291bnRlcnMoKTtcbiAgICBzdGFydCA9IHNlbGYuX2ZpbmRTdGFydCgpO1xuICAgIGlmICghc3RhcnQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIG5leHRTdGFydCA9IHN0YXJ0LnN0YXJ0Q291bnRlcjtcblxuICAgIGRvIHtcbiAgICAgICAgcGF0dGVybiA9IHNlbGYuX3RvUGF0dGVybihuZXh0U3RhcnQpO1xuICAgICAgICBpZiAocGF0dGVybiA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGRlY29kZWRDaGFyID0gc2VsZi5fcGF0dGVyblRvQ2hhcihwYXR0ZXJuKTtcbiAgICAgICAgaWYgKGRlY29kZWRDaGFyIDwgMCl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucHVzaChkZWNvZGVkQ2hhcik7XG4gICAgICAgIG5leHRTdGFydCArPSA4O1xuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+IDEgJiYgc2VsZi5faXNTdGFydEVuZChwYXR0ZXJuKSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9IHdoaWxlIChuZXh0U3RhcnQgPCBzZWxmLl9jb3VudGVycy5sZW5ndGgpO1xuXG4gICAgLy8gdmVyaWZ5IGVuZFxuICAgIGlmICgocmVzdWx0Lmxlbmd0aCAtIDIpIDwgc2VsZi5NSU5fRU5DT0RFRF9DSEFSUyB8fCAhc2VsZi5faXNTdGFydEVuZChwYXR0ZXJuKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyB2ZXJpZnkgZW5kIHdoaXRlIHNwYWNlXG4gICAgaWYgKCFzZWxmLl92ZXJpZnlXaGl0ZXNwYWNlKHN0YXJ0LnN0YXJ0Q291bnRlciwgbmV4dFN0YXJ0IC0gOCkpe1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoIXNlbGYuX3ZhbGlkYXRlUmVzdWx0KHJlc3VsdCwgc3RhcnQuc3RhcnRDb3VudGVyKSl7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIG5leHRTdGFydCA9IG5leHRTdGFydCA+IHNlbGYuX2NvdW50ZXJzLmxlbmd0aCA/IHNlbGYuX2NvdW50ZXJzLmxlbmd0aCA6IG5leHRTdGFydDtcbiAgICBlbmQgPSBzdGFydC5zdGFydCArIHNlbGYuX3N1bUNvdW50ZXJzKHN0YXJ0LnN0YXJ0Q291bnRlciwgbmV4dFN0YXJ0IC0gOCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LnN0YXJ0LFxuICAgICAgICBlbmQ6IGVuZCxcbiAgICAgICAgc3RhcnRJbmZvOiBzdGFydCxcbiAgICAgICAgZGVjb2RlZENvZGVzOiByZXN1bHRcbiAgICB9O1xufTtcblxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeVdoaXRlc3BhY2UgPSBmdW5jdGlvbihzdGFydENvdW50ZXIsIGVuZENvdW50ZXIpIHtcbiAgICBpZiAoKHN0YXJ0Q291bnRlciAtIDEgPD0gMClcbiAgICAgICAgICAgIHx8IHRoaXMuX2NvdW50ZXJzW3N0YXJ0Q291bnRlciAtIDFdID49ICh0aGlzLl9jYWxjdWxhdGVQYXR0ZXJuTGVuZ3RoKHN0YXJ0Q291bnRlcikgLyAyLjApKSB7XG4gICAgICAgIGlmICgoZW5kQ291bnRlciArIDggPj0gdGhpcy5fY291bnRlcnMubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHx8IHRoaXMuX2NvdW50ZXJzW2VuZENvdW50ZXIgKyA3XSA+PSAodGhpcy5fY2FsY3VsYXRlUGF0dGVybkxlbmd0aChlbmRDb3VudGVyKSAvIDIuMCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl9jYWxjdWxhdGVQYXR0ZXJuTGVuZ3RoID0gZnVuY3Rpb24ob2Zmc2V0KSB7XG4gICAgdmFyIGksXG4gICAgICAgIHN1bSA9IDA7XG5cbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBvZmZzZXQgKyA3OyBpKyspIHtcbiAgICAgICAgc3VtICs9IHRoaXMuX2NvdW50ZXJzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBzdW07XG59O1xuXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fdGhyZXNob2xkUmVzdWx0UGF0dGVybiA9IGZ1bmN0aW9uKHJlc3VsdCwgc3RhcnRDb3VudGVyKXtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGNhdGVnb3JpemF0aW9uID0ge1xuICAgICAgICAgICAgc3BhY2U6IHtcbiAgICAgICAgICAgICAgICBuYXJyb3c6IHsgc2l6ZTogMCwgY291bnRzOiAwLCBtaW46IDAsIG1heDogTnVtYmVyLk1BWF9WQUxVRX0sXG4gICAgICAgICAgICAgICAgd2lkZToge3NpemU6IDAsIGNvdW50czogMCwgbWluOiAwLCBtYXg6IE51bWJlci5NQVhfVkFMVUV9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFyOiB7XG4gICAgICAgICAgICAgICAgbmFycm93OiB7IHNpemU6IDAsIGNvdW50czogMCwgbWluOiAwLCBtYXg6IE51bWJlci5NQVhfVkFMVUV9LFxuICAgICAgICAgICAgICAgIHdpZGU6IHsgc2l6ZTogMCwgY291bnRzOiAwLCBtaW46IDAsIG1heDogTnVtYmVyLk1BWF9WQUxVRX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAga2luZCxcbiAgICAgICAgY2F0LFxuICAgICAgICBpLFxuICAgICAgICBqLFxuICAgICAgICBwb3MgPSBzdGFydENvdW50ZXIsXG4gICAgICAgIHBhdHRlcm47XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgcGF0dGVybiA9IHNlbGYuX2NoYXJUb1BhdHRlcm4ocmVzdWx0W2ldKTtcbiAgICAgICAgZm9yIChqID0gNjsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgICAgIGtpbmQgPSAoaiAmIDEpID09PSAyID8gY2F0ZWdvcml6YXRpb24uYmFyIDogY2F0ZWdvcml6YXRpb24uc3BhY2U7XG4gICAgICAgICAgICBjYXQgPSAocGF0dGVybiAmIDEpID09PSAxID8ga2luZC53aWRlIDoga2luZC5uYXJyb3c7XG4gICAgICAgICAgICBjYXQuc2l6ZSArPSBzZWxmLl9jb3VudGVyc1twb3MgKyBqXTtcbiAgICAgICAgICAgIGNhdC5jb3VudHMrKztcbiAgICAgICAgICAgIHBhdHRlcm4gPj49IDE7XG4gICAgICAgIH1cbiAgICAgICAgcG9zICs9IDg7XG4gICAgfVxuXG4gICAgW1wic3BhY2VcIiwgXCJiYXJcIl0uZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgdmFyIG5ld2tpbmQgPSBjYXRlZ29yaXphdGlvbltrZXldO1xuICAgICAgICBuZXdraW5kLndpZGUubWluID1cbiAgICAgICAgICAgIE1hdGguZmxvb3IoKG5ld2tpbmQubmFycm93LnNpemUgLyBuZXdraW5kLm5hcnJvdy5jb3VudHMgKyBuZXdraW5kLndpZGUuc2l6ZSAvIG5ld2tpbmQud2lkZS5jb3VudHMpIC8gMik7XG4gICAgICAgIG5ld2tpbmQubmFycm93Lm1heCA9IE1hdGguY2VpbChuZXdraW5kLndpZGUubWluKTtcbiAgICAgICAgbmV3a2luZC53aWRlLm1heCA9IE1hdGguY2VpbCgobmV3a2luZC53aWRlLnNpemUgKiBzZWxmLk1BWF9BQ0NFUFRBQkxFICsgc2VsZi5QQURESU5HKSAvIG5ld2tpbmQud2lkZS5jb3VudHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNhdGVnb3JpemF0aW9uO1xufTtcblxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2NoYXJUb1BhdHRlcm4gPSBmdW5jdGlvbihjaGFyKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBjaGFyQ29kZSA9IGNoYXIuY2hhckNvZGVBdCgwKSxcbiAgICAgICAgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBzZWxmLkFMUEhBQkVULmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLkFMUEhBQkVUW2ldID09PSBjaGFyQ29kZSl7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5DSEFSQUNURVJfRU5DT0RJTkdTW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAweDA7XG59O1xuXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fdmFsaWRhdGVSZXN1bHQgPSBmdW5jdGlvbihyZXN1bHQsIHN0YXJ0Q291bnRlcikge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgdGhyZXNob2xkcyA9IHNlbGYuX3RocmVzaG9sZFJlc3VsdFBhdHRlcm4ocmVzdWx0LCBzdGFydENvdW50ZXIpLFxuICAgICAgICBpLFxuICAgICAgICBqLFxuICAgICAgICBraW5kLFxuICAgICAgICBjYXQsXG4gICAgICAgIHNpemUsXG4gICAgICAgIHBvcyA9IHN0YXJ0Q291bnRlcixcbiAgICAgICAgcGF0dGVybjtcblxuICAgIGZvciAoaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGF0dGVybiA9IHNlbGYuX2NoYXJUb1BhdHRlcm4ocmVzdWx0W2ldKTtcbiAgICAgICAgZm9yIChqID0gNjsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgICAgIGtpbmQgPSAoaiAmIDEpID09PSAwID8gdGhyZXNob2xkcy5iYXIgOiB0aHJlc2hvbGRzLnNwYWNlO1xuICAgICAgICAgICAgY2F0ID0gKHBhdHRlcm4gJiAxKSA9PT0gMSA/IGtpbmQud2lkZSA6IGtpbmQubmFycm93O1xuICAgICAgICAgICAgc2l6ZSA9IHNlbGYuX2NvdW50ZXJzW3BvcyArIGpdO1xuICAgICAgICAgICAgaWYgKHNpemUgPCBjYXQubWluIHx8IHNpemUgPiBjYXQubWF4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGF0dGVybiA+Pj0gMTtcbiAgICAgICAgfVxuICAgICAgICBwb3MgKz0gODtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fcGF0dGVyblRvQ2hhciA9IGZ1bmN0aW9uKHBhdHRlcm4pIHtcbiAgICB2YXIgaSxcbiAgICAgICAgc2VsZiA9IHRoaXM7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc2VsZi5DSEFSQUNURVJfRU5DT0RJTkdTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLkNIQVJBQ1RFUl9FTkNPRElOR1NbaV0gPT09IHBhdHRlcm4pIHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHNlbGYuQUxQSEFCRVRbaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn07XG5cbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl9jb21wdXRlQWx0ZXJuYXRpbmdUaHJlc2hvbGQgPSBmdW5jdGlvbihvZmZzZXQsIGVuZCkge1xuICAgIHZhciBpLFxuICAgICAgICBtaW4gPSBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgICBtYXggPSAwLFxuICAgICAgICBjb3VudGVyO1xuXG4gICAgZm9yIChpID0gb2Zmc2V0OyBpIDwgZW5kOyBpICs9IDIpe1xuICAgICAgICBjb3VudGVyID0gdGhpcy5fY291bnRlcnNbaV07XG4gICAgICAgIGlmIChjb3VudGVyID4gbWF4KSB7XG4gICAgICAgICAgICBtYXggPSBjb3VudGVyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3VudGVyIDwgbWluKSB7XG4gICAgICAgICAgICBtaW4gPSBjb3VudGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICgobWluICsgbWF4KSAvIDIuMCkgfCAwO1xufTtcblxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX3RvUGF0dGVybiA9IGZ1bmN0aW9uKG9mZnNldCkge1xuICAgIHZhciBudW1Db3VudGVycyA9IDcsXG4gICAgICAgIGVuZCA9IG9mZnNldCArIG51bUNvdW50ZXJzLFxuICAgICAgICBiYXJUaHJlc2hvbGQsXG4gICAgICAgIHNwYWNlVGhyZXNob2xkLFxuICAgICAgICBiaXRtYXNrID0gMSA8PCAobnVtQ291bnRlcnMgLSAxKSxcbiAgICAgICAgcGF0dGVybiA9IDAsXG4gICAgICAgIGksXG4gICAgICAgIHRocmVzaG9sZDtcblxuICAgIGlmIChlbmQgPiB0aGlzLl9jb3VudGVycy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIGJhclRocmVzaG9sZCA9IHRoaXMuX2NvbXB1dGVBbHRlcm5hdGluZ1RocmVzaG9sZChvZmZzZXQsIGVuZCk7XG4gICAgc3BhY2VUaHJlc2hvbGQgPSB0aGlzLl9jb21wdXRlQWx0ZXJuYXRpbmdUaHJlc2hvbGQob2Zmc2V0ICsgMSwgZW5kKTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBudW1Db3VudGVyczsgaSsrKXtcbiAgICAgICAgdGhyZXNob2xkID0gKGkgJiAxKSA9PT0gMCA/IGJhclRocmVzaG9sZCA6IHNwYWNlVGhyZXNob2xkO1xuICAgICAgICBpZiAodGhpcy5fY291bnRlcnNbb2Zmc2V0ICsgaV0gPiB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIHBhdHRlcm4gfD0gYml0bWFzaztcbiAgICAgICAgfVxuICAgICAgICBiaXRtYXNrID4+PSAxO1xuICAgIH1cblxuICAgIHJldHVybiBwYXR0ZXJuO1xufTtcblxuQ29kYWJhclJlYWRlci5wcm90b3R5cGUuX2lzU3RhcnRFbmQgPSBmdW5jdGlvbihwYXR0ZXJuKSB7XG4gICAgdmFyIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5TVEFSVF9FTkQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuU1RBUlRfRU5EW2ldID09PSBwYXR0ZXJuKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5Db2RhYmFyUmVhZGVyLnByb3RvdHlwZS5fc3VtQ291bnRlcnMgPSBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgdmFyIGksXG4gICAgICAgIHN1bSA9IDA7XG5cbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICAgIHN1bSArPSB0aGlzLl9jb3VudGVyc1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIHN1bTtcbn07XG5cbkNvZGFiYXJSZWFkZXIucHJvdG90eXBlLl9maW5kU3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGksXG4gICAgICAgIHBhdHRlcm4sXG4gICAgICAgIHN0YXJ0ID0gc2VsZi5fbmV4dFVuc2V0KHNlbGYuX3JvdyksXG4gICAgICAgIGVuZDtcblxuICAgIGZvciAoaSA9IDE7IGkgPCB0aGlzLl9jb3VudGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXR0ZXJuID0gc2VsZi5fdG9QYXR0ZXJuKGkpO1xuICAgICAgICBpZiAocGF0dGVybiAhPT0gLTEgJiYgc2VsZi5faXNTdGFydEVuZChwYXR0ZXJuKSkge1xuICAgICAgICAgICAgLy8gVE9ETzogTG9vayBmb3Igd2hpdGVzcGFjZSBhaGVhZFxuICAgICAgICAgICAgc3RhcnQgKz0gc2VsZi5fc3VtQ291bnRlcnMoMCwgaSk7XG4gICAgICAgICAgICBlbmQgPSBzdGFydCArIHNlbGYuX3N1bUNvdW50ZXJzKGksIGkgKyA4KTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgICAgICAgIGVuZDogZW5kLFxuICAgICAgICAgICAgICAgIHN0YXJ0Q291bnRlcjogaSxcbiAgICAgICAgICAgICAgICBlbmRDb3VudGVyOiBpICsgOFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvZGFiYXJSZWFkZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmVhZGVyL2NvZGFiYXJfcmVhZGVyLmpzIiwiaW1wb3J0IEJhcmNvZGVSZWFkZXIgZnJvbSAnLi9iYXJjb2RlX3JlYWRlcic7XG5cbmZ1bmN0aW9uIENvZGUxMjhSZWFkZXIoKSB7XG4gICAgQmFyY29kZVJlYWRlci5jYWxsKHRoaXMpO1xufVxuXG52YXIgcHJvcGVydGllcyA9IHtcbiAgICBDT0RFX1NISUZUOiB7dmFsdWU6IDk4fSxcbiAgICBDT0RFX0M6IHt2YWx1ZTogOTl9LFxuICAgIENPREVfQjoge3ZhbHVlOiAxMDB9LFxuICAgIENPREVfQToge3ZhbHVlOiAxMDF9LFxuICAgIFNUQVJUX0NPREVfQToge3ZhbHVlOiAxMDN9LFxuICAgIFNUQVJUX0NPREVfQjoge3ZhbHVlOiAxMDR9LFxuICAgIFNUQVJUX0NPREVfQzoge3ZhbHVlOiAxMDV9LFxuICAgIFNUT1BfQ09ERToge3ZhbHVlOiAxMDZ9LFxuICAgIENPREVfUEFUVEVSTjoge3ZhbHVlOiBbXG4gICAgICAgIFsyLCAxLCAyLCAyLCAyLCAyXSxcbiAgICAgICAgWzIsIDIsIDIsIDEsIDIsIDJdLFxuICAgICAgICBbMiwgMiwgMiwgMiwgMiwgMV0sXG4gICAgICAgIFsxLCAyLCAxLCAyLCAyLCAzXSxcbiAgICAgICAgWzEsIDIsIDEsIDMsIDIsIDJdLFxuICAgICAgICBbMSwgMywgMSwgMiwgMiwgMl0sXG4gICAgICAgIFsxLCAyLCAyLCAyLCAxLCAzXSxcbiAgICAgICAgWzEsIDIsIDIsIDMsIDEsIDJdLFxuICAgICAgICBbMSwgMywgMiwgMiwgMSwgMl0sXG4gICAgICAgIFsyLCAyLCAxLCAyLCAxLCAzXSxcbiAgICAgICAgWzIsIDIsIDEsIDMsIDEsIDJdLFxuICAgICAgICBbMiwgMywgMSwgMiwgMSwgMl0sXG4gICAgICAgIFsxLCAxLCAyLCAyLCAzLCAyXSxcbiAgICAgICAgWzEsIDIsIDIsIDEsIDMsIDJdLFxuICAgICAgICBbMSwgMiwgMiwgMiwgMywgMV0sXG4gICAgICAgIFsxLCAxLCAzLCAyLCAyLCAyXSxcbiAgICAgICAgWzEsIDIsIDMsIDEsIDIsIDJdLFxuICAgICAgICBbMSwgMiwgMywgMiwgMiwgMV0sXG4gICAgICAgIFsyLCAyLCAzLCAyLCAxLCAxXSxcbiAgICAgICAgWzIsIDIsIDEsIDEsIDMsIDJdLFxuICAgICAgICBbMiwgMiwgMSwgMiwgMywgMV0sXG4gICAgICAgIFsyLCAxLCAzLCAyLCAxLCAyXSxcbiAgICAgICAgWzIsIDIsIDMsIDEsIDEsIDJdLFxuICAgICAgICBbMywgMSwgMiwgMSwgMywgMV0sXG4gICAgICAgIFszLCAxLCAxLCAyLCAyLCAyXSxcbiAgICAgICAgWzMsIDIsIDEsIDEsIDIsIDJdLFxuICAgICAgICBbMywgMiwgMSwgMiwgMiwgMV0sXG4gICAgICAgIFszLCAxLCAyLCAyLCAxLCAyXSxcbiAgICAgICAgWzMsIDIsIDIsIDEsIDEsIDJdLFxuICAgICAgICBbMywgMiwgMiwgMiwgMSwgMV0sXG4gICAgICAgIFsyLCAxLCAyLCAxLCAyLCAzXSxcbiAgICAgICAgWzIsIDEsIDIsIDMsIDIsIDFdLFxuICAgICAgICBbMiwgMywgMiwgMSwgMiwgMV0sXG4gICAgICAgIFsxLCAxLCAxLCAzLCAyLCAzXSxcbiAgICAgICAgWzEsIDMsIDEsIDEsIDIsIDNdLFxuICAgICAgICBbMSwgMywgMSwgMywgMiwgMV0sXG4gICAgICAgIFsxLCAxLCAyLCAzLCAxLCAzXSxcbiAgICAgICAgWzEsIDMsIDIsIDEsIDEsIDNdLFxuICAgICAgICBbMSwgMywgMiwgMywgMSwgMV0sXG4gICAgICAgIFsyLCAxLCAxLCAzLCAxLCAzXSxcbiAgICAgICAgWzIsIDMsIDEsIDEsIDEsIDNdLFxuICAgICAgICBbMiwgMywgMSwgMywgMSwgMV0sXG4gICAgICAgIFsxLCAxLCAyLCAxLCAzLCAzXSxcbiAgICAgICAgWzEsIDEsIDIsIDMsIDMsIDFdLFxuICAgICAgICBbMSwgMywgMiwgMSwgMywgMV0sXG4gICAgICAgIFsxLCAxLCAzLCAxLCAyLCAzXSxcbiAgICAgICAgWzEsIDEsIDMsIDMsIDIsIDFdLFxuICAgICAgICBbMSwgMywgMywgMSwgMiwgMV0sXG4gICAgICAgIFszLCAxLCAzLCAxLCAyLCAxXSxcbiAgICAgICAgWzIsIDEsIDEsIDMsIDMsIDFdLFxuICAgICAgICBbMiwgMywgMSwgMSwgMywgMV0sXG4gICAgICAgIFsyLCAxLCAzLCAxLCAxLCAzXSxcbiAgICAgICAgWzIsIDEsIDMsIDMsIDEsIDFdLFxuICAgICAgICBbMiwgMSwgMywgMSwgMywgMV0sXG4gICAgICAgIFszLCAxLCAxLCAxLCAyLCAzXSxcbiAgICAgICAgWzMsIDEsIDEsIDMsIDIsIDFdLFxuICAgICAgICBbMywgMywgMSwgMSwgMiwgMV0sXG4gICAgICAgIFszLCAxLCAyLCAxLCAxLCAzXSxcbiAgICAgICAgWzMsIDEsIDIsIDMsIDEsIDFdLFxuICAgICAgICBbMywgMywgMiwgMSwgMSwgMV0sXG4gICAgICAgIFszLCAxLCA0LCAxLCAxLCAxXSxcbiAgICAgICAgWzIsIDIsIDEsIDQsIDEsIDFdLFxuICAgICAgICBbNCwgMywgMSwgMSwgMSwgMV0sXG4gICAgICAgIFsxLCAxLCAxLCAyLCAyLCA0XSxcbiAgICAgICAgWzEsIDEsIDEsIDQsIDIsIDJdLFxuICAgICAgICBbMSwgMiwgMSwgMSwgMiwgNF0sXG4gICAgICAgIFsxLCAyLCAxLCA0LCAyLCAxXSxcbiAgICAgICAgWzEsIDQsIDEsIDEsIDIsIDJdLFxuICAgICAgICBbMSwgNCwgMSwgMiwgMiwgMV0sXG4gICAgICAgIFsxLCAxLCAyLCAyLCAxLCA0XSxcbiAgICAgICAgWzEsIDEsIDIsIDQsIDEsIDJdLFxuICAgICAgICBbMSwgMiwgMiwgMSwgMSwgNF0sXG4gICAgICAgIFsxLCAyLCAyLCA0LCAxLCAxXSxcbiAgICAgICAgWzEsIDQsIDIsIDEsIDEsIDJdLFxuICAgICAgICBbMSwgNCwgMiwgMiwgMSwgMV0sXG4gICAgICAgIFsyLCA0LCAxLCAyLCAxLCAxXSxcbiAgICAgICAgWzIsIDIsIDEsIDEsIDEsIDRdLFxuICAgICAgICBbNCwgMSwgMywgMSwgMSwgMV0sXG4gICAgICAgIFsyLCA0LCAxLCAxLCAxLCAyXSxcbiAgICAgICAgWzEsIDMsIDQsIDEsIDEsIDFdLFxuICAgICAgICBbMSwgMSwgMSwgMiwgNCwgMl0sXG4gICAgICAgIFsxLCAyLCAxLCAxLCA0LCAyXSxcbiAgICAgICAgWzEsIDIsIDEsIDIsIDQsIDFdLFxuICAgICAgICBbMSwgMSwgNCwgMiwgMSwgMl0sXG4gICAgICAgIFsxLCAyLCA0LCAxLCAxLCAyXSxcbiAgICAgICAgWzEsIDIsIDQsIDIsIDEsIDFdLFxuICAgICAgICBbNCwgMSwgMSwgMiwgMSwgMl0sXG4gICAgICAgIFs0LCAyLCAxLCAxLCAxLCAyXSxcbiAgICAgICAgWzQsIDIsIDEsIDIsIDEsIDFdLFxuICAgICAgICBbMiwgMSwgMiwgMSwgNCwgMV0sXG4gICAgICAgIFsyLCAxLCA0LCAxLCAyLCAxXSxcbiAgICAgICAgWzQsIDEsIDIsIDEsIDIsIDFdLFxuICAgICAgICBbMSwgMSwgMSwgMSwgNCwgM10sXG4gICAgICAgIFsxLCAxLCAxLCAzLCA0LCAxXSxcbiAgICAgICAgWzEsIDMsIDEsIDEsIDQsIDFdLFxuICAgICAgICBbMSwgMSwgNCwgMSwgMSwgM10sXG4gICAgICAgIFsxLCAxLCA0LCAzLCAxLCAxXSxcbiAgICAgICAgWzQsIDEsIDEsIDEsIDEsIDNdLFxuICAgICAgICBbNCwgMSwgMSwgMywgMSwgMV0sXG4gICAgICAgIFsxLCAxLCAzLCAxLCA0LCAxXSxcbiAgICAgICAgWzEsIDEsIDQsIDEsIDMsIDFdLFxuICAgICAgICBbMywgMSwgMSwgMSwgNCwgMV0sXG4gICAgICAgIFs0LCAxLCAxLCAxLCAzLCAxXSxcbiAgICAgICAgWzIsIDEsIDEsIDQsIDEsIDJdLFxuICAgICAgICBbMiwgMSwgMSwgMiwgMSwgNF0sXG4gICAgICAgIFsyLCAxLCAxLCAyLCAzLCAyXSxcbiAgICAgICAgWzIsIDMsIDMsIDEsIDEsIDEsIDJdXG4gICAgXX0sXG4gICAgU0lOR0xFX0NPREVfRVJST1I6IHt2YWx1ZTogMC42NH0sXG4gICAgQVZHX0NPREVfRVJST1I6IHt2YWx1ZTogMC4zMH0sXG4gICAgRk9STUFUOiB7dmFsdWU6IFwiY29kZV8xMjhcIiwgd3JpdGVhYmxlOiBmYWxzZX0sXG4gICAgTU9EVUxFX0lORElDRVM6IHt2YWx1ZToge2JhcjogWzAsIDIsIDRdLCBzcGFjZTogWzEsIDMsIDVdfX1cbn07XG5cbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXJjb2RlUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XG5Db2RlMTI4UmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvZGUxMjhSZWFkZXI7XG5cbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlLl9kZWNvZGVDb2RlID0gZnVuY3Rpb24oc3RhcnQsIGNvcnJlY3Rpb24pIHtcbiAgICB2YXIgY291bnRlciA9IFswLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgaSxcbiAgICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICAgIG9mZnNldCA9IHN0YXJ0LFxuICAgICAgICBpc1doaXRlID0gIXNlbGYuX3Jvd1tvZmZzZXRdLFxuICAgICAgICBjb3VudGVyUG9zID0gMCxcbiAgICAgICAgYmVzdE1hdGNoID0ge1xuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXG4gICAgICAgICAgICBjb2RlOiAtMSxcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgIGVuZDogc3RhcnQsXG4gICAgICAgICAgICBjb3JyZWN0aW9uOiB7XG4gICAgICAgICAgICAgICAgYmFyOiAxLFxuICAgICAgICAgICAgICAgIHNwYWNlOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvZGUsXG4gICAgICAgIGVycm9yO1xuXG4gICAgZm9yICggaSA9IG9mZnNldDsgaSA8IHNlbGYuX3Jvdy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc2VsZi5fcm93W2ldIF4gaXNXaGl0ZSkge1xuICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIGlmIChjb3JyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2NvcnJlY3QoY291bnRlciwgY29ycmVjdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoY29kZSA9IDA7IGNvZGUgPCBzZWxmLkNPREVfUEFUVEVSTi5sZW5ndGg7IGNvZGUrKykge1xuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHNlbGYuX21hdGNoUGF0dGVybihjb3VudGVyLCBzZWxmLkNPREVfUEFUVEVSTltjb2RlXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciA8IGJlc3RNYXRjaC5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmNvZGUgPSBjb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVuZCA9IGk7XG4gICAgICAgICAgICAgICAgaWYgKGJlc3RNYXRjaC5jb2RlID09PSAtMSB8fCBiZXN0TWF0Y2guZXJyb3IgPiBzZWxmLkFWR19DT0RFX0VSUk9SKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5DT0RFX1BBVFRFUk5bYmVzdE1hdGNoLmNvZGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb3JyZWN0aW9uLmJhciA9IGNhbGN1bGF0ZUNvcnJlY3Rpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkNPREVfUEFUVEVSTltiZXN0TWF0Y2guY29kZV0sIGNvdW50ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1PRFVMRV9JTkRJQ0VTLmJhcik7XG4gICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb3JyZWN0aW9uLnNwYWNlID0gY2FsY3VsYXRlQ29ycmVjdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuQ09ERV9QQVRURVJOW2Jlc3RNYXRjaC5jb2RlXSwgY291bnRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTU9EVUxFX0lORElDRVMuc3BhY2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcbiAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlLl9jb3JyZWN0ID0gZnVuY3Rpb24oY291bnRlciwgY29ycmVjdGlvbikge1xuICAgIHRoaXMuX2NvcnJlY3RCYXJzKGNvdW50ZXIsIGNvcnJlY3Rpb24uYmFyLCB0aGlzLk1PRFVMRV9JTkRJQ0VTLmJhcik7XG4gICAgdGhpcy5fY29ycmVjdEJhcnMoY291bnRlciwgY29ycmVjdGlvbi5zcGFjZSwgdGhpcy5NT0RVTEVfSU5ESUNFUy5zcGFjZSk7XG59O1xuXG5Db2RlMTI4UmVhZGVyLnByb3RvdHlwZS5fZmluZFN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvdW50ZXIgPSBbMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICAgIGksXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBvZmZzZXQgPSBzZWxmLl9uZXh0U2V0KHNlbGYuX3JvdyksXG4gICAgICAgIGlzV2hpdGUgPSBmYWxzZSxcbiAgICAgICAgY291bnRlclBvcyA9IDAsXG4gICAgICAgIGJlc3RNYXRjaCA9IHtcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgICAgICAgY29kZTogLTEsXG4gICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgIGVuZDogMCxcbiAgICAgICAgICAgIGNvcnJlY3Rpb246IHtcbiAgICAgICAgICAgICAgICBiYXI6IDEsXG4gICAgICAgICAgICAgICAgc3BhY2U6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29kZSxcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIGosXG4gICAgICAgIHN1bTtcblxuICAgIGZvciAoIGkgPSBvZmZzZXQ7IGkgPCBzZWxmLl9yb3cubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBjb3VudGVyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBzdW0gPSAwO1xuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgY291bnRlci5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gY291bnRlcltqXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChjb2RlID0gc2VsZi5TVEFSVF9DT0RFX0E7IGNvZGUgPD0gc2VsZi5TVEFSVF9DT0RFX0M7IGNvZGUrKykge1xuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHNlbGYuX21hdGNoUGF0dGVybihjb3VudGVyLCBzZWxmLkNPREVfUEFUVEVSTltjb2RlXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciA8IGJlc3RNYXRjaC5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmNvZGUgPSBjb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGJlc3RNYXRjaC5lcnJvciA8IHNlbGYuQVZHX0NPREVfRVJST1IpIHtcbiAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLnN0YXJ0ID0gaSAtIHN1bTtcbiAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVuZCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb3JyZWN0aW9uLmJhciA9IGNhbGN1bGF0ZUNvcnJlY3Rpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkNPREVfUEFUVEVSTltiZXN0TWF0Y2guY29kZV0sIGNvdW50ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1PRFVMRV9JTkRJQ0VTLmJhcik7XG4gICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb3JyZWN0aW9uLnNwYWNlID0gY2FsY3VsYXRlQ29ycmVjdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuQ09ERV9QQVRURVJOW2Jlc3RNYXRjaC5jb2RlXSwgY291bnRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTU9EVUxFX0lORElDRVMuc3BhY2UpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAoIGogPSAwOyBqIDwgNDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbal0gPSBjb3VudGVyW2ogKyAyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY291bnRlcls0XSA9IDA7XG4gICAgICAgICAgICAgICAgY291bnRlcls1XSA9IDA7XG4gICAgICAgICAgICAgICAgY291bnRlclBvcy0tO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdID0gMTtcbiAgICAgICAgICAgIGlzV2hpdGUgPSAhaXNXaGl0ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbkNvZGUxMjhSZWFkZXIucHJvdG90eXBlLl9kZWNvZGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIHN0YXJ0SW5mbyA9IHNlbGYuX2ZpbmRTdGFydCgpLFxuICAgICAgICBjb2RlID0gbnVsbCxcbiAgICAgICAgZG9uZSA9IGZhbHNlLFxuICAgICAgICByZXN1bHQgPSBbXSxcbiAgICAgICAgbXVsdGlwbGllciA9IDAsXG4gICAgICAgIGNoZWNrc3VtID0gMCxcbiAgICAgICAgY29kZXNldCxcbiAgICAgICAgcmF3UmVzdWx0ID0gW10sXG4gICAgICAgIGRlY29kZWRDb2RlcyA9IFtdLFxuICAgICAgICBzaGlmdE5leHQgPSBmYWxzZSxcbiAgICAgICAgdW5zaGlmdCxcbiAgICAgICAgcmVtb3ZlTGFzdENoYXJhY3RlciA9IHRydWU7XG5cbiAgICBpZiAoc3RhcnRJbmZvID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb2RlID0ge1xuICAgICAgICBjb2RlOiBzdGFydEluZm8uY29kZSxcbiAgICAgICAgc3RhcnQ6IHN0YXJ0SW5mby5zdGFydCxcbiAgICAgICAgZW5kOiBzdGFydEluZm8uZW5kLFxuICAgICAgICBjb3JyZWN0aW9uOiB7XG4gICAgICAgICAgICBiYXI6IHN0YXJ0SW5mby5jb3JyZWN0aW9uLmJhcixcbiAgICAgICAgICAgIHNwYWNlOiBzdGFydEluZm8uY29ycmVjdGlvbi5zcGFjZVxuICAgICAgICB9XG4gICAgfTtcbiAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcbiAgICBjaGVja3N1bSA9IGNvZGUuY29kZTtcbiAgICBzd2l0Y2ggKGNvZGUuY29kZSkge1xuICAgIGNhc2Ugc2VsZi5TVEFSVF9DT0RFX0E6XG4gICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBzZWxmLlNUQVJUX0NPREVfQjpcbiAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9CO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIHNlbGYuU1RBUlRfQ09ERV9DOlxuICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0M7XG4gICAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHdoaWxlICghZG9uZSkge1xuICAgICAgICB1bnNoaWZ0ID0gc2hpZnROZXh0O1xuICAgICAgICBzaGlmdE5leHQgPSBmYWxzZTtcbiAgICAgICAgY29kZSA9IHNlbGYuX2RlY29kZUNvZGUoY29kZS5lbmQsIGNvZGUuY29ycmVjdGlvbik7XG4gICAgICAgIGlmIChjb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoY29kZS5jb2RlICE9PSBzZWxmLlNUT1BfQ09ERSkge1xuICAgICAgICAgICAgICAgIHJlbW92ZUxhc3RDaGFyYWN0ZXIgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29kZS5jb2RlICE9PSBzZWxmLlNUT1BfQ09ERSkge1xuICAgICAgICAgICAgICAgIHJhd1Jlc3VsdC5wdXNoKGNvZGUuY29kZSk7XG4gICAgICAgICAgICAgICAgbXVsdGlwbGllcisrO1xuICAgICAgICAgICAgICAgIGNoZWNrc3VtICs9IG11bHRpcGxpZXIgKiBjb2RlLmNvZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcblxuICAgICAgICAgICAgc3dpdGNoIChjb2Rlc2V0KSB7XG4gICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9BOlxuICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgPCA2NCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKDMyICsgY29kZS5jb2RlKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb2RlLmNvZGUgPCA5Nikge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUuY29kZSAtIDY0KSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSAhPT0gc2VsZi5TVE9QX0NPREUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUxhc3RDaGFyYWN0ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvZGUuY29kZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9TSElGVDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0TmV4dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0I7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuQ09ERV9DOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9DO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5TVE9QX0NPREU6XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQjpcbiAgICAgICAgICAgICAgICBpZiAoY29kZS5jb2RlIDwgOTYpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgzMiArIGNvZGUuY29kZSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgIT09IHNlbGYuU1RPUF9DT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVMYXN0Q2hhcmFjdGVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjb2RlLmNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfU0hJRlQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlmdE5leHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IHNlbGYuQ09ERV9BO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0E6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0E7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuU1RPUF9DT0RFOlxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0M6XG4gICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSA8IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUgPCAxMCA/IFwiMFwiICsgY29kZS5jb2RlIDogY29kZS5jb2RlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29kZS5jb2RlICE9PSBzZWxmLlNUT1BfQ09ERSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTGFzdENoYXJhY3RlciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY29kZS5jb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5DT0RFX0E6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gc2VsZi5DT0RFX0E7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzZWxmLkNPREVfQjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBzZWxmLkNPREVfQjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNlbGYuU1RPUF9DT0RFOlxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1bnNoaWZ0KSB7XG4gICAgICAgICAgICBjb2Rlc2V0ID0gY29kZXNldCA9PT0gc2VsZi5DT0RFX0EgPyBzZWxmLkNPREVfQiA6IHNlbGYuQ09ERV9BO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvZGUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29kZS5lbmQgPSBzZWxmLl9uZXh0VW5zZXQoc2VsZi5fcm93LCBjb2RlLmVuZCk7XG4gICAgaWYgKCFzZWxmLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UoY29kZSkpe1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjaGVja3N1bSAtPSBtdWx0aXBsaWVyICogcmF3UmVzdWx0W3Jhd1Jlc3VsdC5sZW5ndGggLSAxXTtcbiAgICBpZiAoY2hlY2tzdW0gJSAxMDMgIT09IHJhd1Jlc3VsdFtyYXdSZXN1bHQubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCFyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBsYXN0IGNvZGUgZnJvbSByZXN1bHQgKGNoZWNrc3VtKVxuICAgIGlmIChyZW1vdmVMYXN0Q2hhcmFjdGVyKSB7XG4gICAgICAgIHJlc3VsdC5zcGxpY2UocmVzdWx0Lmxlbmd0aCAtIDEsIDEpO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29kZTogcmVzdWx0LmpvaW4oXCJcIiksXG4gICAgICAgIHN0YXJ0OiBzdGFydEluZm8uc3RhcnQsXG4gICAgICAgIGVuZDogY29kZS5lbmQsXG4gICAgICAgIGNvZGVzZXQ6IGNvZGVzZXQsXG4gICAgICAgIHN0YXJ0SW5mbzogc3RhcnRJbmZvLFxuICAgICAgICBkZWNvZGVkQ29kZXM6IGRlY29kZWRDb2RlcyxcbiAgICAgICAgZW5kSW5mbzogY29kZVxuICAgIH07XG59O1xuXG5cbkJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbihlbmRJbmZvKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICB0cmFpbGluZ1doaXRlc3BhY2VFbmQ7XG5cbiAgICB0cmFpbGluZ1doaXRlc3BhY2VFbmQgPSBlbmRJbmZvLmVuZCArICgoZW5kSW5mby5lbmQgLSBlbmRJbmZvLnN0YXJ0KSAvIDIpO1xuICAgIGlmICh0cmFpbGluZ1doaXRlc3BhY2VFbmQgPCBzZWxmLl9yb3cubGVuZ3RoKSB7XG4gICAgICAgIGlmIChzZWxmLl9tYXRjaFJhbmdlKGVuZEluZm8uZW5kLCB0cmFpbGluZ1doaXRlc3BhY2VFbmQsIDApKSB7XG4gICAgICAgICAgICByZXR1cm4gZW5kSW5mbztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZUNvcnJlY3Rpb24oZXhwZWN0ZWQsIG5vcm1hbGl6ZWQsIGluZGljZXMpIHtcbiAgICB2YXIgbGVuZ3RoID0gaW5kaWNlcy5sZW5ndGgsXG4gICAgICAgIHN1bU5vcm1hbGl6ZWQgPSAwLFxuICAgICAgICBzdW1FeHBlY3RlZCA9IDA7XG5cbiAgICB3aGlsZShsZW5ndGgtLSkge1xuICAgICAgICBzdW1FeHBlY3RlZCArPSBleHBlY3RlZFtpbmRpY2VzW2xlbmd0aF1dO1xuICAgICAgICBzdW1Ob3JtYWxpemVkICs9IG5vcm1hbGl6ZWRbaW5kaWNlc1tsZW5ndGhdXTtcbiAgICB9XG4gICAgcmV0dXJuIHN1bUV4cGVjdGVkL3N1bU5vcm1hbGl6ZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvZGUxMjhSZWFkZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmVhZGVyL2NvZGVfMTI4X3JlYWRlci5qcyIsImltcG9ydCBDb2RlMzlSZWFkZXIgZnJvbSAnLi9jb2RlXzM5X3JlYWRlcic7XG5cbmZ1bmN0aW9uIENvZGUzOVZJTlJlYWRlcigpIHtcbiAgICBDb2RlMzlSZWFkZXIuY2FsbCh0aGlzKTtcbn1cblxudmFyIHBhdHRlcm5zID0ge1xuICAgIElPUTogL1tJT1FdL2csXG4gICAgQVowOTogL1tBLVowLTldezE3fS9cbn07XG5cbkNvZGUzOVZJTlJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENvZGUzOVJlYWRlci5wcm90b3R5cGUpO1xuQ29kZTM5VklOUmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvZGUzOVZJTlJlYWRlcjtcblxuLy8gQ3JpYmJlZCBmcm9tOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3p4aW5nL3p4aW5nL2Jsb2IvbWFzdGVyL2NvcmUvc3JjL21haW4vamF2YS9jb20vZ29vZ2xlL3p4aW5nL2NsaWVudC9yZXN1bHQvVklOUmVzdWx0UGFyc2VyLmphdmFcbkNvZGUzOVZJTlJlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZXN1bHQgPSBDb2RlMzlSZWFkZXIucHJvdG90eXBlLl9kZWNvZGUuYXBwbHkodGhpcyk7XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGNvZGUgPSByZXN1bHQuY29kZTtcblxuICAgIGlmICghY29kZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKHBhdHRlcm5zLklPUSwgJycpO1xuXG4gICAgaWYgKCFjb2RlLm1hdGNoKHBhdHRlcm5zLkFaMDkpKSB7XG4gICAgICAgIGlmIChFTlYuZGV2ZWxvcG1lbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgQVowOSBwYXR0ZXJuIGNvZGU6JywgY29kZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9jaGVja0NoZWNrc3VtKGNvZGUpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJlc3VsdC5jb2RlID0gY29kZTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuQ29kZTM5VklOUmVhZGVyLnByb3RvdHlwZS5fY2hlY2tDaGVja3N1bSA9IGZ1bmN0aW9uKGNvZGUpIHtcbiAgICAvLyBUT0RPXG4gICAgcmV0dXJuICEhY29kZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvZGUzOVZJTlJlYWRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yZWFkZXIvY29kZV8zOV92aW5fcmVhZGVyLmpzIiwiaW1wb3J0IEVBTlJlYWRlciBmcm9tICcuL2Vhbl9yZWFkZXInO1xuXG5mdW5jdGlvbiBFQU4yUmVhZGVyKCkge1xuICAgIEVBTlJlYWRlci5jYWxsKHRoaXMpO1xufVxuXG52YXIgcHJvcGVydGllcyA9IHtcbiAgICBGT1JNQVQ6IHt2YWx1ZTogXCJlYW5fMlwiLCB3cml0ZWFibGU6IGZhbHNlfVxufTtcblxuRUFOMlJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVBTlJlYWRlci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xuRUFOMlJlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFQU4yUmVhZGVyO1xuXG5FQU4yUmVhZGVyLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbihyb3csIHN0YXJ0KSB7XG4gICAgdGhpcy5fcm93ID0gcm93O1xuICAgIHZhciBjb3VudGVycyA9IFswLCAwLCAwLCAwXSxcbiAgICAgICAgY29kZUZyZXF1ZW5jeSA9IDAsXG4gICAgICAgIGkgPSAwLFxuICAgICAgICBvZmZzZXQgPSBzdGFydCxcbiAgICAgICAgZW5kID0gdGhpcy5fcm93Lmxlbmd0aCxcbiAgICAgICAgY29kZSxcbiAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgIGRlY29kZWRDb2RlcyA9IFtdO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IDIgJiYgb2Zmc2V0IDwgZW5kOyBpKyspIHtcbiAgICAgICAgY29kZSA9IHRoaXMuX2RlY29kZUNvZGUob2Zmc2V0KTtcbiAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcbiAgICAgICAgcmVzdWx0LnB1c2goY29kZS5jb2RlICUgMTApO1xuICAgICAgICBpZiAoY29kZS5jb2RlID49IHRoaXMuQ09ERV9HX1NUQVJUKSB7XG4gICAgICAgICAgICBjb2RlRnJlcXVlbmN5IHw9IDEgPDwgKDEgLSBpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSAhPSAxKSB7XG4gICAgICAgICAgICBvZmZzZXQgPSB0aGlzLl9uZXh0U2V0KHRoaXMuX3JvdywgY29kZS5lbmQpO1xuICAgICAgICAgICAgb2Zmc2V0ID0gdGhpcy5fbmV4dFVuc2V0KHRoaXMuX3Jvdywgb2Zmc2V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZXN1bHQubGVuZ3RoICE9IDIgfHwgKHBhcnNlSW50KHJlc3VsdC5qb2luKFwiXCIpKSAlIDQpICAhPT0gY29kZUZyZXF1ZW5jeSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29kZTogcmVzdWx0LmpvaW4oXCJcIiksXG4gICAgICAgIGRlY29kZWRDb2RlcyxcbiAgICAgICAgZW5kOiBjb2RlLmVuZFxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFQU4yUmVhZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JlYWRlci9lYW5fMl9yZWFkZXIuanMiLCJpbXBvcnQgRUFOUmVhZGVyIGZyb20gJy4vZWFuX3JlYWRlcic7XG5cbmZ1bmN0aW9uIEVBTjVSZWFkZXIoKSB7XG4gICAgRUFOUmVhZGVyLmNhbGwodGhpcyk7XG59XG5cbnZhciBwcm9wZXJ0aWVzID0ge1xuICAgIEZPUk1BVDoge3ZhbHVlOiBcImVhbl81XCIsIHdyaXRlYWJsZTogZmFsc2V9XG59O1xuXG5jb25zdCBDSEVDS19ESUdJVF9FTkNPRElOR1MgPSBbMjQsIDIwLCAxOCwgMTcsIDEyLCA2LCAzLCAxMCwgOSwgNV07XG5cbkVBTjVSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFQU5SZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcbkVBTjVSZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRUFONVJlYWRlcjtcblxuRUFONVJlYWRlci5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24ocm93LCBzdGFydCkge1xuICAgIHRoaXMuX3JvdyA9IHJvdztcbiAgICB2YXIgY291bnRlcnMgPSBbMCwgMCwgMCwgMF0sXG4gICAgICAgIGNvZGVGcmVxdWVuY3kgPSAwLFxuICAgICAgICBpID0gMCxcbiAgICAgICAgb2Zmc2V0ID0gc3RhcnQsXG4gICAgICAgIGVuZCA9IHRoaXMuX3Jvdy5sZW5ndGgsXG4gICAgICAgIGNvZGUsXG4gICAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgICBkZWNvZGVkQ29kZXMgPSBbXTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCA1ICYmIG9mZnNldCA8IGVuZDsgaSsrKSB7XG4gICAgICAgIGNvZGUgPSB0aGlzLl9kZWNvZGVDb2RlKG9mZnNldCk7XG4gICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XG4gICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSAlIDEwKTtcbiAgICAgICAgaWYgKGNvZGUuY29kZSA+PSB0aGlzLkNPREVfR19TVEFSVCkge1xuICAgICAgICAgICAgY29kZUZyZXF1ZW5jeSB8PSAxIDw8ICg0IC0gaSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgIT0gNCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gdGhpcy5fbmV4dFNldCh0aGlzLl9yb3csIGNvZGUuZW5kKTtcbiAgICAgICAgICAgIG9mZnNldCA9IHRoaXMuX25leHRVbnNldCh0aGlzLl9yb3csIG9mZnNldCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVzdWx0Lmxlbmd0aCAhPSA1KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChleHRlbnNpb25DaGVja3N1bShyZXN1bHQpICE9PSBkZXRlcm1pbmVDaGVja0RpZ2l0KGNvZGVGcmVxdWVuY3kpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBjb2RlOiByZXN1bHQuam9pbihcIlwiKSxcbiAgICAgICAgZGVjb2RlZENvZGVzLFxuICAgICAgICBlbmQ6IGNvZGUuZW5kXG4gICAgfTtcbn07XG5cbmZ1bmN0aW9uIGRldGVybWluZUNoZWNrRGlnaXQoY29kZUZyZXF1ZW5jeSkge1xuICAgIHZhciBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgIGlmIChjb2RlRnJlcXVlbmN5ID09PSBDSEVDS19ESUdJVF9FTkNPRElOR1NbaV0pIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5cbmZ1bmN0aW9uIGV4dGVuc2lvbkNoZWNrc3VtKHJlc3VsdCkge1xuICAgIHZhciBsZW5ndGggPSByZXN1bHQubGVuZ3RoLFxuICAgICAgICBzdW0gPSAwLFxuICAgICAgICBpO1xuXG4gICAgZm9yIChpID0gbGVuZ3RoIC0gMjsgaSA+PSAwOyBpIC09IDIpIHtcbiAgICAgICAgc3VtICs9IHJlc3VsdFtpXTtcbiAgICB9XG4gICAgc3VtICo9IDM7XG4gICAgZm9yIChpID0gbGVuZ3RoIC0gMTsgaSA+PSAwOyBpIC09IDIpIHtcbiAgICAgICAgc3VtICs9IHJlc3VsdFtpXTtcbiAgICB9XG4gICAgc3VtICo9IDM7XG4gICAgcmV0dXJuIHN1bSAlIDEwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBFQU41UmVhZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JlYWRlci9lYW5fNV9yZWFkZXIuanMiLCJpbXBvcnQgRUFOUmVhZGVyIGZyb20gJy4vZWFuX3JlYWRlcic7XG5cbmZ1bmN0aW9uIEVBTjhSZWFkZXIob3B0cywgc3VwcGxlbWVudHMpIHtcbiAgICBFQU5SZWFkZXIuY2FsbCh0aGlzLCBvcHRzLCBzdXBwbGVtZW50cyk7XG59XG5cbnZhciBwcm9wZXJ0aWVzID0ge1xuICAgIEZPUk1BVDoge3ZhbHVlOiBcImVhbl84XCIsIHdyaXRlYWJsZTogZmFsc2V9XG59O1xuXG5FQU44UmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRUFOUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XG5FQU44UmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEVBTjhSZWFkZXI7XG5cbkVBTjhSZWFkZXIucHJvdG90eXBlLl9kZWNvZGVQYXlsb2FkID0gZnVuY3Rpb24oY29kZSwgcmVzdWx0LCBkZWNvZGVkQ29kZXMpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgc2VsZiA9IHRoaXM7XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb2RlLmVuZCwgc2VsZi5DT0RFX0dfU1RBUlQpO1xuICAgICAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSk7XG4gICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xuICAgIH1cblxuICAgIGNvZGUgPSBzZWxmLl9maW5kUGF0dGVybihzZWxmLk1JRERMRV9QQVRURVJOLCBjb2RlLmVuZCwgdHJ1ZSwgZmFsc2UpO1xuICAgIGlmIChjb2RlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcblxuICAgIGZvciAoIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVDb2RlKGNvZGUuZW5kLCBzZWxmLkNPREVfR19TVEFSVCk7XG4gICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XG4gICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvZGU7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFQU44UmVhZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JlYWRlci9lYW5fOF9yZWFkZXIuanMiLCJpbXBvcnQgQmFyY29kZVJlYWRlciBmcm9tICcuL2JhcmNvZGVfcmVhZGVyJztcbmltcG9ydCB7bWVyZ2V9IGZyb20gJ2xvZGFzaCc7XG5cbmZ1bmN0aW9uIEkyb2Y1UmVhZGVyKG9wdHMpIHtcbiAgICBvcHRzID0gbWVyZ2UoZ2V0RGVmYXVsQ29uZmlnKCksIG9wdHMpO1xuICAgIEJhcmNvZGVSZWFkZXIuY2FsbCh0aGlzLCBvcHRzKTtcbiAgICB0aGlzLmJhclNwYWNlUmF0aW8gPSBbMSwgMV07XG4gICAgaWYgKG9wdHMubm9ybWFsaXplQmFyU3BhY2VXaWR0aCkge1xuICAgICAgICB0aGlzLlNJTkdMRV9DT0RFX0VSUk9SID0gMC4zODtcbiAgICAgICAgdGhpcy5BVkdfQ09ERV9FUlJPUiA9IDAuMDk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWxDb25maWcoKSB7XG4gICAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gICAgT2JqZWN0LmtleXMoSTJvZjVSZWFkZXIuQ09ORklHX0tFWVMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIGNvbmZpZ1trZXldID0gSTJvZjVSZWFkZXIuQ09ORklHX0tFWVNba2V5XS5kZWZhdWx0O1xuICAgIH0pO1xuICAgIHJldHVybiBjb25maWc7XG59XG5cbnZhciBOID0gMSxcbiAgICBXID0gMyxcbiAgICBwcm9wZXJ0aWVzID0ge1xuICAgICAgICBTVEFSVF9QQVRURVJOOiB7dmFsdWU6IFtOLCBOLCBOLCBOXX0sXG4gICAgICAgIFNUT1BfUEFUVEVSTjoge3ZhbHVlOiBbTiwgTiwgV119LFxuICAgICAgICBDT0RFX1BBVFRFUk46IHt2YWx1ZTogW1xuICAgICAgICAgICAgW04sIE4sIFcsIFcsIE5dLFxuICAgICAgICAgICAgW1csIE4sIE4sIE4sIFddLFxuICAgICAgICAgICAgW04sIFcsIE4sIE4sIFddLFxuICAgICAgICAgICAgW1csIFcsIE4sIE4sIE5dLFxuICAgICAgICAgICAgW04sIE4sIFcsIE4sIFddLFxuICAgICAgICAgICAgW1csIE4sIFcsIE4sIE5dLFxuICAgICAgICAgICAgW04sIFcsIFcsIE4sIE5dLFxuICAgICAgICAgICAgW04sIE4sIE4sIFcsIFddLFxuICAgICAgICAgICAgW1csIE4sIE4sIFcsIE5dLFxuICAgICAgICAgICAgW04sIFcsIE4sIFcsIE5dXG4gICAgICAgIF19LFxuICAgICAgICBTSU5HTEVfQ09ERV9FUlJPUjoge3ZhbHVlOiAwLjc4LCB3cml0YWJsZTogdHJ1ZX0sXG4gICAgICAgIEFWR19DT0RFX0VSUk9SOiB7dmFsdWU6IDAuMzgsIHdyaXRhYmxlOiB0cnVlfSxcbiAgICAgICAgTUFYX0NPUlJFQ1RJT05fRkFDVE9SOiB7dmFsdWU6IDV9LFxuICAgICAgICBGT1JNQVQ6IHt2YWx1ZTogXCJpMm9mNVwifVxuICAgIH07XG5cbkkyb2Y1UmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFyY29kZVJlYWRlci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xuSTJvZjVSZWFkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSTJvZjVSZWFkZXI7XG5cbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fbWF0Y2hQYXR0ZXJuID0gZnVuY3Rpb24oY291bnRlciwgY29kZSkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5ub3JtYWxpemVCYXJTcGFjZVdpZHRoKSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgY291bnRlclN1bSA9IFswLCAwXSxcbiAgICAgICAgICAgIGNvZGVTdW0gPSBbMCwgMF0sXG4gICAgICAgICAgICBjb3JyZWN0aW9uID0gWzAsIDBdLFxuICAgICAgICAgICAgY29ycmVjdGlvblJhdGlvID0gdGhpcy5NQVhfQ09SUkVDVElPTl9GQUNUT1IsXG4gICAgICAgICAgICBjb3JyZWN0aW9uUmF0aW9JbnZlcnNlID0gMSAvIGNvcnJlY3Rpb25SYXRpbztcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY291bnRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY291bnRlclN1bVtpICUgMl0gKz0gY291bnRlcltpXTtcbiAgICAgICAgICAgIGNvZGVTdW1baSAlIDJdICs9IGNvZGVbaV07XG4gICAgICAgIH1cbiAgICAgICAgY29ycmVjdGlvblswXSA9IGNvZGVTdW1bMF0gLyBjb3VudGVyU3VtWzBdO1xuICAgICAgICBjb3JyZWN0aW9uWzFdID0gY29kZVN1bVsxXSAvIGNvdW50ZXJTdW1bMV07XG5cbiAgICAgICAgY29ycmVjdGlvblswXSA9IE1hdGgubWF4KE1hdGgubWluKGNvcnJlY3Rpb25bMF0sIGNvcnJlY3Rpb25SYXRpbyksIGNvcnJlY3Rpb25SYXRpb0ludmVyc2UpO1xuICAgICAgICBjb3JyZWN0aW9uWzFdID0gTWF0aC5tYXgoTWF0aC5taW4oY29ycmVjdGlvblsxXSwgY29ycmVjdGlvblJhdGlvKSwgY29ycmVjdGlvblJhdGlvSW52ZXJzZSk7XG4gICAgICAgIHRoaXMuYmFyU3BhY2VSYXRpbyA9IGNvcnJlY3Rpb247XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb3VudGVyW2ldICo9IHRoaXMuYmFyU3BhY2VSYXRpb1tpICUgMl07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIEJhcmNvZGVSZWFkZXIucHJvdG90eXBlLl9tYXRjaFBhdHRlcm4uY2FsbCh0aGlzLCBjb3VudGVyLCBjb2RlKTtcbn07XG5cbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fZmluZFBhdHRlcm4gPSBmdW5jdGlvbihwYXR0ZXJuLCBvZmZzZXQsIGlzV2hpdGUsIHRyeUhhcmRlcikge1xuICAgIHZhciBjb3VudGVyID0gW10sXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBpLFxuICAgICAgICBjb3VudGVyUG9zID0gMCxcbiAgICAgICAgYmVzdE1hdGNoID0ge1xuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXG4gICAgICAgICAgICBjb2RlOiAtMSxcbiAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICAgICAgZW5kOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yLFxuICAgICAgICBqLFxuICAgICAgICBzdW0sXG4gICAgICAgIG5vcm1hbGl6ZWQsXG4gICAgICAgIGVwc2lsb24gPSBzZWxmLkFWR19DT0RFX0VSUk9SO1xuXG4gICAgaXNXaGl0ZSA9IGlzV2hpdGUgfHwgZmFsc2U7XG4gICAgdHJ5SGFyZGVyID0gdHJ5SGFyZGVyIHx8IGZhbHNlO1xuXG4gICAgaWYgKCFvZmZzZXQpIHtcbiAgICAgICAgb2Zmc2V0ID0gc2VsZi5fbmV4dFNldChzZWxmLl9yb3cpO1xuICAgIH1cblxuICAgIGZvciAoIGkgPSAwOyBpIDwgcGF0dGVybi5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb3VudGVyW2ldID0gMDtcbiAgICB9XG5cbiAgICBmb3IgKCBpID0gb2Zmc2V0OyBpIDwgc2VsZi5fcm93Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLl9yb3dbaV0gXiBpc1doaXRlKSB7XG4gICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgc3VtID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKCBqID0gMDsgaiA8IGNvdW50ZXIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGNvdW50ZXJbal07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKGNvdW50ZXIsIHBhdHRlcm4pO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciA8IGVwc2lsb24pIHtcbiAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5zdGFydCA9IGkgLSBzdW07XG4gICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHJ5SGFyZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBjb3VudGVyLmxlbmd0aCAtIDI7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcltqXSA9IGNvdW50ZXJbaiArIDJdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlci5sZW5ndGggLSAyXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlci5sZW5ndGggLSAxXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MtLTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xuICAgICAgICAgICAgaXNXaGl0ZSA9ICFpc1doaXRlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9maW5kU3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQsXG4gICAgICAgIG9mZnNldCA9IHNlbGYuX25leHRTZXQoc2VsZi5fcm93KSxcbiAgICAgICAgc3RhcnRJbmZvLFxuICAgICAgICBuYXJyb3dCYXJXaWR0aCA9IDE7XG5cbiAgICB3aGlsZSAoIXN0YXJ0SW5mbykge1xuICAgICAgICBzdGFydEluZm8gPSBzZWxmLl9maW5kUGF0dGVybihzZWxmLlNUQVJUX1BBVFRFUk4sIG9mZnNldCwgZmFsc2UsIHRydWUpO1xuICAgICAgICBpZiAoIXN0YXJ0SW5mbykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbmFycm93QmFyV2lkdGggPSBNYXRoLmZsb29yKChzdGFydEluZm8uZW5kIC0gc3RhcnRJbmZvLnN0YXJ0KSAvIDQpO1xuICAgICAgICBsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0ID0gc3RhcnRJbmZvLnN0YXJ0IC0gbmFycm93QmFyV2lkdGggKiAxMDtcbiAgICAgICAgaWYgKGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQgPj0gMCkge1xuICAgICAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UobGVhZGluZ1doaXRlc3BhY2VTdGFydCwgc3RhcnRJbmZvLnN0YXJ0LCAwKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGFydEluZm87XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb2Zmc2V0ID0gc3RhcnRJbmZvLmVuZDtcbiAgICAgICAgc3RhcnRJbmZvID0gbnVsbDtcbiAgICB9XG59O1xuXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZSA9IGZ1bmN0aW9uKGVuZEluZm8pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZDtcblxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IGVuZEluZm8uZW5kICsgKChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpIC8gMik7XG4gICAgaWYgKHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA8IHNlbGYuX3Jvdy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UoZW5kSW5mby5lbmQsIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCwgMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9maW5kRW5kID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBlbmRJbmZvLFxuICAgICAgICB0bXA7XG5cbiAgICBzZWxmLl9yb3cucmV2ZXJzZSgpO1xuICAgIGVuZEluZm8gPSBzZWxmLl9maW5kUGF0dGVybihzZWxmLlNUT1BfUEFUVEVSTik7XG4gICAgc2VsZi5fcm93LnJldmVyc2UoKTtcblxuICAgIGlmIChlbmRJbmZvID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHJldmVyc2UgbnVtYmVyc1xuICAgIHRtcCA9IGVuZEluZm8uc3RhcnQ7XG4gICAgZW5kSW5mby5zdGFydCA9IHNlbGYuX3Jvdy5sZW5ndGggLSBlbmRJbmZvLmVuZDtcbiAgICBlbmRJbmZvLmVuZCA9IHNlbGYuX3Jvdy5sZW5ndGggLSB0bXA7XG5cbiAgICByZXR1cm4gZW5kSW5mbyAhPT0gbnVsbCA/IHNlbGYuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZShlbmRJbmZvKSA6IG51bGw7XG59O1xuXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX2RlY29kZVBhaXIgPSBmdW5jdGlvbihjb3VudGVyUGFpcikge1xuICAgIHZhciBpLFxuICAgICAgICBjb2RlLFxuICAgICAgICBjb2RlcyA9IFtdLFxuICAgICAgICBzZWxmID0gdGhpcztcblxuICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudGVyUGFpci5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb3VudGVyUGFpcltpXSk7XG4gICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29kZXMucHVzaChjb2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvZGVzO1xufTtcblxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9kZWNvZGVDb2RlID0gZnVuY3Rpb24oY291bnRlcikge1xuICAgIHZhciBqLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgc3VtID0gMCxcbiAgICAgICAgbm9ybWFsaXplZCxcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIGVwc2lsb24gPSBzZWxmLkFWR19DT0RFX0VSUk9SLFxuICAgICAgICBjb2RlLFxuICAgICAgICBiZXN0TWF0Y2ggPSB7XG4gICAgICAgICAgICBlcnJvcjogTnVtYmVyLk1BWF9WQUxVRSxcbiAgICAgICAgICAgIGNvZGU6IC0xLFxuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICBlbmQ6IDBcbiAgICAgICAgfTtcblxuICAgIGZvciAoIGogPSAwOyBqIDwgY291bnRlci5sZW5ndGg7IGorKykge1xuICAgICAgICBzdW0gKz0gY291bnRlcltqXTtcbiAgICB9XG4gICAgZm9yIChjb2RlID0gMDsgY29kZSA8IHNlbGYuQ09ERV9QQVRURVJOLmxlbmd0aDsgY29kZSsrKSB7XG4gICAgICAgIGVycm9yID0gc2VsZi5fbWF0Y2hQYXR0ZXJuKGNvdW50ZXIsIHNlbGYuQ09ERV9QQVRURVJOW2NvZGVdKTtcbiAgICAgICAgaWYgKGVycm9yIDwgYmVzdE1hdGNoLmVycm9yKSB7XG4gICAgICAgICAgICBiZXN0TWF0Y2guY29kZSA9IGNvZGU7XG4gICAgICAgICAgICBiZXN0TWF0Y2guZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoYmVzdE1hdGNoLmVycm9yIDwgZXBzaWxvbikge1xuICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xuICAgIH1cbn07XG5cbkkyb2Y1UmVhZGVyLnByb3RvdHlwZS5fZGVjb2RlUGF5bG9hZCA9IGZ1bmN0aW9uKGNvdW50ZXJzLCByZXN1bHQsIGRlY29kZWRDb2Rlcykge1xuICAgIHZhciBpLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgcG9zID0gMCxcbiAgICAgICAgY291bnRlckxlbmd0aCA9IGNvdW50ZXJzLmxlbmd0aCxcbiAgICAgICAgY291bnRlclBhaXIgPSBbWzAsIDAsIDAsIDAsIDBdLCBbMCwgMCwgMCwgMCwgMF1dLFxuICAgICAgICBjb2RlcztcblxuICAgIHdoaWxlIChwb3MgPCBjb3VudGVyTGVuZ3RoKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgICAgIGNvdW50ZXJQYWlyWzBdW2ldID0gY291bnRlcnNbcG9zXSAqIHRoaXMuYmFyU3BhY2VSYXRpb1swXTtcbiAgICAgICAgICAgIGNvdW50ZXJQYWlyWzFdW2ldID0gY291bnRlcnNbcG9zICsgMV0gKiB0aGlzLmJhclNwYWNlUmF0aW9bMV07XG4gICAgICAgICAgICBwb3MgKz0gMjtcbiAgICAgICAgfVxuICAgICAgICBjb2RlcyA9IHNlbGYuX2RlY29kZVBhaXIoY291bnRlclBhaXIpO1xuICAgICAgICBpZiAoIWNvZGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvZGVzW2ldLmNvZGUgKyBcIlwiKTtcbiAgICAgICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGVzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29kZXM7XG59O1xuXG5JMm9mNVJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeUNvdW50ZXJMZW5ndGggPSBmdW5jdGlvbihjb3VudGVycykge1xuICAgIHJldHVybiAoY291bnRlcnMubGVuZ3RoICUgMTAgPT09IDApO1xufTtcblxuSTJvZjVSZWFkZXIucHJvdG90eXBlLl9kZWNvZGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RhcnRJbmZvLFxuICAgICAgICBlbmRJbmZvLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgY29kZSxcbiAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgIGRlY29kZWRDb2RlcyA9IFtdLFxuICAgICAgICBjb3VudGVycztcblxuICAgIHN0YXJ0SW5mbyA9IHNlbGYuX2ZpbmRTdGFydCgpO1xuICAgIGlmICghc3RhcnRJbmZvKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZWNvZGVkQ29kZXMucHVzaChzdGFydEluZm8pO1xuXG4gICAgZW5kSW5mbyA9IHNlbGYuX2ZpbmRFbmQoKTtcbiAgICBpZiAoIWVuZEluZm8pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY291bnRlcnMgPSBzZWxmLl9maWxsQ291bnRlcnMoc3RhcnRJbmZvLmVuZCwgZW5kSW5mby5zdGFydCwgZmFsc2UpO1xuICAgIGlmICghc2VsZi5fdmVyaWZ5Q291bnRlckxlbmd0aChjb3VudGVycykpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvZGUgPSBzZWxmLl9kZWNvZGVQYXlsb2FkKGNvdW50ZXJzLCByZXN1bHQsIGRlY29kZWRDb2Rlcyk7XG4gICAgaWYgKCFjb2RlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAocmVzdWx0Lmxlbmd0aCAlIDIgIT09IDAgfHxcbiAgICAgICAgICAgIHJlc3VsdC5sZW5ndGggPCA2KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGRlY29kZWRDb2Rlcy5wdXNoKGVuZEluZm8pO1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvZGU6IHJlc3VsdC5qb2luKFwiXCIpLFxuICAgICAgICBzdGFydDogc3RhcnRJbmZvLnN0YXJ0LFxuICAgICAgICBlbmQ6IGVuZEluZm8uZW5kLFxuICAgICAgICBzdGFydEluZm86IHN0YXJ0SW5mbyxcbiAgICAgICAgZGVjb2RlZENvZGVzOiBkZWNvZGVkQ29kZXNcbiAgICB9O1xufTtcblxuSTJvZjVSZWFkZXIuQ09ORklHX0tFWVMgPSB7XG4gICAgbm9ybWFsaXplQmFyU3BhY2VXaWR0aDoge1xuICAgICAgICAndHlwZSc6ICdib29sZWFuJyxcbiAgICAgICAgJ2RlZmF1bHQnOiBmYWxzZSxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0lmIHRydWUsIHRoZSByZWFkZXIgdHJpZXMgdG8gbm9ybWFsaXplIHRoZScgK1xuICAgICAgICAnd2lkdGgtZGlmZmVyZW5jZSBiZXR3ZWVuIGJhcnMgYW5kIHNwYWNlcydcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJMm9mNVJlYWRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yZWFkZXIvaTJvZjVfcmVhZGVyLmpzIiwiaW1wb3J0IEVBTlJlYWRlciBmcm9tICcuL2Vhbl9yZWFkZXInO1xuXG5mdW5jdGlvbiBVUENFUmVhZGVyKG9wdHMsIHN1cHBsZW1lbnRzKSB7XG4gICAgRUFOUmVhZGVyLmNhbGwodGhpcywgb3B0cywgc3VwcGxlbWVudHMpO1xufVxuXG52YXIgcHJvcGVydGllcyA9IHtcbiAgICBDT0RFX0ZSRVFVRU5DWToge3ZhbHVlOiBbXG4gICAgICAgIFsgNTYsIDUyLCA1MCwgNDksIDQ0LCAzOCwgMzUsIDQyLCA0MSwgMzcgXSxcbiAgICAgICAgWzcsIDExLCAxMywgMTQsIDE5LCAyNSwgMjgsIDIxLCAyMiwgMjZdXX0sXG4gICAgU1RPUF9QQVRURVJOOiB7IHZhbHVlOiBbMSAvIDYgKiA3LCAxIC8gNiAqIDcsIDEgLyA2ICogNywgMSAvIDYgKiA3LCAxIC8gNiAqIDcsIDEgLyA2ICogN119LFxuICAgIEZPUk1BVDoge3ZhbHVlOiBcInVwY19lXCIsIHdyaXRlYWJsZTogZmFsc2V9XG59O1xuXG5VUENFUmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRUFOUmVhZGVyLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XG5VUENFUmVhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFVQQ0VSZWFkZXI7XG5cblVQQ0VSZWFkZXIucHJvdG90eXBlLl9kZWNvZGVQYXlsb2FkID0gZnVuY3Rpb24oY29kZSwgcmVzdWx0LCBkZWNvZGVkQ29kZXMpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICAgIGNvZGVGcmVxdWVuY3kgPSAweDA7XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICBjb2RlID0gc2VsZi5fZGVjb2RlQ29kZShjb2RlLmVuZCk7XG4gICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvZGUuY29kZSA+PSBzZWxmLkNPREVfR19TVEFSVCkge1xuICAgICAgICAgICAgY29kZS5jb2RlID0gY29kZS5jb2RlIC0gc2VsZi5DT0RFX0dfU1RBUlQ7XG4gICAgICAgICAgICBjb2RlRnJlcXVlbmN5IHw9IDEgPDwgKDUgLSBpKTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUpO1xuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcbiAgICB9XG4gICAgaWYgKCFzZWxmLl9kZXRlcm1pbmVQYXJpdHkoY29kZUZyZXF1ZW5jeSwgcmVzdWx0KSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gY29kZTtcbn07XG5cblVQQ0VSZWFkZXIucHJvdG90eXBlLl9kZXRlcm1pbmVQYXJpdHkgPSBmdW5jdGlvbihjb2RlRnJlcXVlbmN5LCByZXN1bHQpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgbnJTeXN0ZW07XG5cbiAgICBmb3IgKG5yU3lzdGVtID0gMDsgbnJTeXN0ZW0gPCB0aGlzLkNPREVfRlJFUVVFTkNZLmxlbmd0aDsgbnJTeXN0ZW0rKyl7XG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgdGhpcy5DT0RFX0ZSRVFVRU5DWVtuclN5c3RlbV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjb2RlRnJlcXVlbmN5ID09PSB0aGlzLkNPREVfRlJFUVVFTkNZW25yU3lzdGVtXVtpXSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC51bnNoaWZ0KG5yU3lzdGVtKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5VUENFUmVhZGVyLnByb3RvdHlwZS5fY29udmVydFRvVVBDQSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgIHZhciB1cGNhID0gW3Jlc3VsdFswXV0sXG4gICAgICAgIGxhc3REaWdpdCA9IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMl07XG5cbiAgICBpZiAobGFzdERpZ2l0IDw9IDIpIHtcbiAgICAgICAgdXBjYSA9IHVwY2EuY29uY2F0KHJlc3VsdC5zbGljZSgxLCAzKSlcbiAgICAgICAgICAgIC5jb25jYXQoW2xhc3REaWdpdCwgMCwgMCwgMCwgMF0pXG4gICAgICAgICAgICAuY29uY2F0KHJlc3VsdC5zbGljZSgzLCA2KSk7XG4gICAgfSBlbHNlIGlmIChsYXN0RGlnaXQgPT09IDMpIHtcbiAgICAgICAgdXBjYSA9IHVwY2EuY29uY2F0KHJlc3VsdC5zbGljZSgxLCA0KSlcbiAgICAgICAgICAgIC5jb25jYXQoWzAsIDAsIDAsIDAsIDBdKVxuICAgICAgICAgICAgLmNvbmNhdChyZXN1bHQuc2xpY2UoNCwgNikpO1xuICAgIH0gZWxzZSBpZiAobGFzdERpZ2l0ID09PSA0KSB7XG4gICAgICAgIHVwY2EgPSB1cGNhLmNvbmNhdChyZXN1bHQuc2xpY2UoMSwgNSkpXG4gICAgICAgICAgICAuY29uY2F0KFswLCAwLCAwLCAwLCAwLCByZXN1bHRbNV1dKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB1cGNhID0gdXBjYS5jb25jYXQocmVzdWx0LnNsaWNlKDEsIDYpKVxuICAgICAgICAgICAgLmNvbmNhdChbMCwgMCwgMCwgMCwgbGFzdERpZ2l0XSk7XG4gICAgfVxuXG4gICAgdXBjYS5wdXNoKHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV0pO1xuICAgIHJldHVybiB1cGNhO1xufTtcblxuVVBDRVJlYWRlci5wcm90b3R5cGUuX2NoZWNrc3VtID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgcmV0dXJuIEVBTlJlYWRlci5wcm90b3R5cGUuX2NoZWNrc3VtLmNhbGwodGhpcywgdGhpcy5fY29udmVydFRvVVBDQShyZXN1bHQpKTtcbn07XG5cblVQQ0VSZWFkZXIucHJvdG90eXBlLl9maW5kRW5kID0gZnVuY3Rpb24ob2Zmc2V0LCBpc1doaXRlKSB7XG4gICAgaXNXaGl0ZSA9IHRydWU7XG4gICAgcmV0dXJuIEVBTlJlYWRlci5wcm90b3R5cGUuX2ZpbmRFbmQuY2FsbCh0aGlzLCBvZmZzZXQsIGlzV2hpdGUpO1xufTtcblxuVVBDRVJlYWRlci5wcm90b3R5cGUuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZSA9IGZ1bmN0aW9uKGVuZEluZm8pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZDtcblxuICAgIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA9IGVuZEluZm8uZW5kICsgKChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpIC8gMik7XG4gICAgaWYgKHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA8IHNlbGYuX3Jvdy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHNlbGYuX21hdGNoUmFuZ2UoZW5kSW5mby5lbmQsIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCwgMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgVVBDRVJlYWRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yZWFkZXIvdXBjX2VfcmVhZGVyLmpzIiwiaW1wb3J0IEVBTlJlYWRlciBmcm9tICcuL2Vhbl9yZWFkZXInO1xuXG5mdW5jdGlvbiBVUENSZWFkZXIob3B0cywgc3VwcGxlbWVudHMpIHtcbiAgICBFQU5SZWFkZXIuY2FsbCh0aGlzLCBvcHRzLCBzdXBwbGVtZW50cyk7XG59XG5cbnZhciBwcm9wZXJ0aWVzID0ge1xuICAgIEZPUk1BVDoge3ZhbHVlOiBcInVwY19hXCIsIHdyaXRlYWJsZTogZmFsc2V9XG59O1xuXG5VUENSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFQU5SZWFkZXIucHJvdG90eXBlLCBwcm9wZXJ0aWVzKTtcblVQQ1JlYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBVUENSZWFkZXI7XG5cblVQQ1JlYWRlci5wcm90b3R5cGUuX2RlY29kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZXN1bHQgPSBFQU5SZWFkZXIucHJvdG90eXBlLl9kZWNvZGUuY2FsbCh0aGlzKTtcblxuICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LmNvZGUgJiYgcmVzdWx0LmNvZGUubGVuZ3RoID09PSAxMyAmJiByZXN1bHQuY29kZS5jaGFyQXQoMCkgPT09IFwiMFwiKSB7XG4gICAgICAgIHJlc3VsdC5jb2RlID0gcmVzdWx0LmNvZGUuc3Vic3RyaW5nKDEpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVQQ1JlYWRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yZWFkZXIvdXBjX3JlYWRlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gY29weVxuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSBtYXQyIHRvIGFub3RoZXJcbiAqXG4gKiBAYWxpYXMgbWF0Mi5jb3B5XG4gKiBAcGFyYW0ge21hdDJ9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gKi9cbmZ1bmN0aW9uIGNvcHkob3V0LCBhKSB7XG4gIG91dFswXSA9IGFbMF1cbiAgb3V0WzFdID0gYVsxXVxuICBvdXRbMl0gPSBhWzJdXG4gIG91dFszXSA9IGFbM11cbiAgcmV0dXJuIG91dFxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2dsLW1hdDIvY29weS5qc1xuLy8gbW9kdWxlIGlkID0gNzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IG1hdDJcbiAqXG4gKiBAYWxpYXMgbWF0Mi5jcmVhdGVcbiAqIEByZXR1cm5zIHttYXQyfSBhIG5ldyAyeDIgbWF0cml4XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgdmFyIG91dCA9IG5ldyBGbG9hdDMyQXJyYXkoNClcbiAgb3V0WzBdID0gMVxuICBvdXRbMV0gPSAwXG4gIG91dFsyXSA9IDBcbiAgb3V0WzNdID0gMVxuICByZXR1cm4gb3V0XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZ2wtbWF0Mi9jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gaW52ZXJ0XG5cbi8qKlxuICogSW52ZXJ0cyBhIG1hdDJcbiAqXG4gKiBAYWxpYXMgbWF0Mi5pbnZlcnRcbiAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJ9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAqL1xuZnVuY3Rpb24gaW52ZXJ0KG91dCwgYSkge1xuICB2YXIgYTAgPSBhWzBdXG4gIHZhciBhMSA9IGFbMV1cbiAgdmFyIGEyID0gYVsyXVxuICB2YXIgYTMgPSBhWzNdXG4gIHZhciBkZXQgPSBhMCAqIGEzIC0gYTIgKiBhMVxuXG4gIGlmICghZGV0KSByZXR1cm4gbnVsbFxuICBkZXQgPSAxLjAgLyBkZXRcblxuICBvdXRbMF0gPSAgYTMgKiBkZXRcbiAgb3V0WzFdID0gLWExICogZGV0XG4gIG91dFsyXSA9IC1hMiAqIGRldFxuICBvdXRbM10gPSAgYTAgKiBkZXRcblxuICByZXR1cm4gb3V0XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZ2wtbWF0Mi9pbnZlcnQuanNcbi8vIG1vZHVsZSBpZCA9IDc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gc2NhbGVcblxuLyoqXG4gKiBTY2FsZXMgYSB2ZWMyIGJ5IGEgc2NhbGFyIG51bWJlclxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIHZlY3RvciB0byBzY2FsZVxuICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSB2ZWN0b3IgYnlcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuZnVuY3Rpb24gc2NhbGUob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGJcbiAgICBvdXRbMV0gPSBhWzFdICogYlxuICAgIHJldHVybiBvdXRcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZ2wtdmVjMi9zY2FsZS5qc1xuLy8gbW9kdWxlIGlkID0gNzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB0cmFuc2Zvcm1NYXQyXG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0MlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0Mn0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuZnVuY3Rpb24gdHJhbnNmb3JtTWF0MihvdXQsIGEsIG0pIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdXG4gICAgb3V0WzBdID0gbVswXSAqIHggKyBtWzJdICogeVxuICAgIG91dFsxXSA9IG1bMV0gKiB4ICsgbVszXSAqIHlcbiAgICByZXR1cm4gb3V0XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2dsLXZlYzIvdHJhbnNmb3JtTWF0Mi5qc1xuLy8gbW9kdWxlIGlkID0gNzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBjbG9uZTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzMgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdmVjdG9yIHRvIGNsb25lXG4gKiBAcmV0dXJucyB7dmVjM30gYSBuZXcgM0QgdmVjdG9yXG4gKi9cbmZ1bmN0aW9uIGNsb25lKGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEZsb2F0MzJBcnJheSgzKVxuICAgIG91dFswXSA9IGFbMF1cbiAgICBvdXRbMV0gPSBhWzFdXG4gICAgb3V0WzJdID0gYVsyXVxuICAgIHJldHVybiBvdXRcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZ2wtdmVjMy9jbG9uZS5qc1xuLy8gbW9kdWxlIGlkID0gNzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGhhc2hDbGVhciA9IHJlcXVpcmUoJy4vX2hhc2hDbGVhcicpLFxuICAgIGhhc2hEZWxldGUgPSByZXF1aXJlKCcuL19oYXNoRGVsZXRlJyksXG4gICAgaGFzaEdldCA9IHJlcXVpcmUoJy4vX2hhc2hHZXQnKSxcbiAgICBoYXNoSGFzID0gcmVxdWlyZSgnLi9faGFzaEhhcycpLFxuICAgIGhhc2hTZXQgPSByZXF1aXJlKCcuL19oYXNoU2V0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID09IG51bGwgPyAwIDogZW50cmllcy5sZW5ndGg7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYEhhc2hgLlxuSGFzaC5wcm90b3R5cGUuY2xlYXIgPSBoYXNoQ2xlYXI7XG5IYXNoLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBoYXNoRGVsZXRlO1xuSGFzaC5wcm90b3R5cGUuZ2V0ID0gaGFzaEdldDtcbkhhc2gucHJvdG90eXBlLmhhcyA9IGhhc2hIYXM7XG5IYXNoLnByb3RvdHlwZS5zZXQgPSBoYXNoU2V0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhhc2g7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19IYXNoLmpzXG4vLyBtb2R1bGUgaWQgPSA4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgTGlzdENhY2hlID0gcmVxdWlyZSgnLi9fTGlzdENhY2hlJyksXG4gICAgc3RhY2tDbGVhciA9IHJlcXVpcmUoJy4vX3N0YWNrQ2xlYXInKSxcbiAgICBzdGFja0RlbGV0ZSA9IHJlcXVpcmUoJy4vX3N0YWNrRGVsZXRlJyksXG4gICAgc3RhY2tHZXQgPSByZXF1aXJlKCcuL19zdGFja0dldCcpLFxuICAgIHN0YWNrSGFzID0gcmVxdWlyZSgnLi9fc3RhY2tIYXMnKSxcbiAgICBzdGFja1NldCA9IHJlcXVpcmUoJy4vX3N0YWNrU2V0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0YWNrIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFN0YWNrKGVudHJpZXMpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZShlbnRyaWVzKTtcbiAgdGhpcy5zaXplID0gZGF0YS5zaXplO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU3RhY2tgLlxuU3RhY2sucHJvdG90eXBlLmNsZWFyID0gc3RhY2tDbGVhcjtcblN0YWNrLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBzdGFja0RlbGV0ZTtcblN0YWNrLnByb3RvdHlwZS5nZXQgPSBzdGFja0dldDtcblN0YWNrLnByb3RvdHlwZS5oYXMgPSBzdGFja0hhcztcblN0YWNrLnByb3RvdHlwZS5zZXQgPSBzdGFja1NldDtcblxubW9kdWxlLmV4cG9ydHMgPSBTdGFjaztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX1N0YWNrLmpzXG4vLyBtb2R1bGUgaWQgPSA4MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgVWludDhBcnJheSA9IHJvb3QuVWludDhBcnJheTtcblxubW9kdWxlLmV4cG9ydHMgPSBVaW50OEFycmF5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fVWludDhBcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gODJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBBIGZhc3RlciBhbHRlcm5hdGl2ZSB0byBgRnVuY3Rpb24jYXBwbHlgLCB0aGlzIGZ1bmN0aW9uIGludm9rZXMgYGZ1bmNgXG4gKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiBgdGhpc0FyZ2AgYW5kIHRoZSBhcmd1bWVudHMgb2YgYGFyZ3NgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBmdW5jYC5cbiAqL1xuZnVuY3Rpb24gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncykge1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcpO1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICB9XG4gIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFwcGx5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fYXBwbHkuanNcbi8vIG1vZHVsZSBpZCA9IDgzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBiYXNlVGltZXMgPSByZXF1aXJlKCcuL19iYXNlVGltZXMnKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNCdWZmZXIgPSByZXF1aXJlKCcuL2lzQnVmZmVyJyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4vX2lzSW5kZXgnKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuL2lzVHlwZWRBcnJheScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgdmFyIGlzQXJyID0gaXNBcnJheSh2YWx1ZSksXG4gICAgICBpc0FyZyA9ICFpc0FyciAmJiBpc0FyZ3VtZW50cyh2YWx1ZSksXG4gICAgICBpc0J1ZmYgPSAhaXNBcnIgJiYgIWlzQXJnICYmIGlzQnVmZmVyKHZhbHVlKSxcbiAgICAgIGlzVHlwZSA9ICFpc0FyciAmJiAhaXNBcmcgJiYgIWlzQnVmZiAmJiBpc1R5cGVkQXJyYXkodmFsdWUpLFxuICAgICAgc2tpcEluZGV4ZXMgPSBpc0FyciB8fCBpc0FyZyB8fCBpc0J1ZmYgfHwgaXNUeXBlLFxuICAgICAgcmVzdWx0ID0gc2tpcEluZGV4ZXMgPyBiYXNlVGltZXModmFsdWUubGVuZ3RoLCBTdHJpbmcpIDogW10sXG4gICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKFxuICAgICAgICAgICAvLyBTYWZhcmkgOSBoYXMgZW51bWVyYWJsZSBgYXJndW1lbnRzLmxlbmd0aGAgaW4gc3RyaWN0IG1vZGUuXG4gICAgICAgICAgIGtleSA9PSAnbGVuZ3RoJyB8fFxuICAgICAgICAgICAvLyBOb2RlLmpzIDAuMTAgaGFzIGVudW1lcmFibGUgbm9uLWluZGV4IHByb3BlcnRpZXMgb24gYnVmZmVycy5cbiAgICAgICAgICAgKGlzQnVmZiAmJiAoa2V5ID09ICdvZmZzZXQnIHx8IGtleSA9PSAncGFyZW50JykpIHx8XG4gICAgICAgICAgIC8vIFBoYW50b21KUyAyIGhhcyBlbnVtZXJhYmxlIG5vbi1pbmRleCBwcm9wZXJ0aWVzIG9uIHR5cGVkIGFycmF5cy5cbiAgICAgICAgICAgKGlzVHlwZSAmJiAoa2V5ID09ICdidWZmZXInIHx8IGtleSA9PSAnYnl0ZUxlbmd0aCcgfHwga2V5ID09ICdieXRlT2Zmc2V0JykpIHx8XG4gICAgICAgICAgIC8vIFNraXAgaW5kZXggcHJvcGVydGllcy5cbiAgICAgICAgICAgaXNJbmRleChrZXksIGxlbmd0aClcbiAgICAgICAgKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlMaWtlS2V5cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2FycmF5TGlrZUtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDg0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLm1hcGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheU1hcChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlNYXA7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19hcnJheU1hcC5qc1xuLy8gbW9kdWxlIGlkID0gODVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBBcHBlbmRzIHRoZSBlbGVtZW50cyBvZiBgdmFsdWVzYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gYXBwZW5kLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UHVzaChhcnJheSwgdmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzLmxlbmd0aCxcbiAgICAgIG9mZnNldCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W29mZnNldCArIGluZGV4XSA9IHZhbHVlc1tpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5UHVzaDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2FycmF5UHVzaC5qc1xuLy8gbW9kdWxlIGlkID0gODZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RDcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNyZWF0ZWAgd2l0aG91dCBzdXBwb3J0IGZvciBhc3NpZ25pbmdcbiAqIHByb3BlcnRpZXMgdG8gdGhlIGNyZWF0ZWQgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG8gVGhlIG9iamVjdCB0byBpbmhlcml0IGZyb20uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICovXG52YXIgYmFzZUNyZWF0ZSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gb2JqZWN0KCkge31cbiAgcmV0dXJuIGZ1bmN0aW9uKHByb3RvKSB7XG4gICAgaWYgKCFpc09iamVjdChwcm90bykpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgaWYgKG9iamVjdENyZWF0ZSkge1xuICAgICAgcmV0dXJuIG9iamVjdENyZWF0ZShwcm90byk7XG4gICAgfVxuICAgIG9iamVjdC5wcm90b3R5cGUgPSBwcm90bztcbiAgICB2YXIgcmVzdWx0ID0gbmV3IG9iamVjdDtcbiAgICBvYmplY3QucHJvdG90eXBlID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59KCkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VDcmVhdGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19iYXNlQ3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA4N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYXJyYXlQdXNoID0gcmVxdWlyZSgnLi9fYXJyYXlQdXNoJyksXG4gICAgaXNGbGF0dGVuYWJsZSA9IHJlcXVpcmUoJy4vX2lzRmxhdHRlbmFibGUnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mbGF0dGVuYCB3aXRoIHN1cHBvcnQgZm9yIHJlc3RyaWN0aW5nIGZsYXR0ZW5pbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBmbGF0dGVuLlxuICogQHBhcmFtIHtudW1iZXJ9IGRlcHRoIFRoZSBtYXhpbXVtIHJlY3Vyc2lvbiBkZXB0aC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3ByZWRpY2F0ZT1pc0ZsYXR0ZW5hYmxlXSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNTdHJpY3RdIFJlc3RyaWN0IHRvIHZhbHVlcyB0aGF0IHBhc3MgYHByZWRpY2F0ZWAgY2hlY2tzLlxuICogQHBhcmFtIHtBcnJheX0gW3Jlc3VsdD1bXV0gVGhlIGluaXRpYWwgcmVzdWx0IHZhbHVlLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZmxhdHRlbmVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlRmxhdHRlbihhcnJheSwgZGVwdGgsIHByZWRpY2F0ZSwgaXNTdHJpY3QsIHJlc3VsdCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBwcmVkaWNhdGUgfHwgKHByZWRpY2F0ZSA9IGlzRmxhdHRlbmFibGUpO1xuICByZXN1bHQgfHwgKHJlc3VsdCA9IFtdKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XTtcbiAgICBpZiAoZGVwdGggPiAwICYmIHByZWRpY2F0ZSh2YWx1ZSkpIHtcbiAgICAgIGlmIChkZXB0aCA+IDEpIHtcbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgZmxhdHRlbiBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgICAgYmFzZUZsYXR0ZW4odmFsdWUsIGRlcHRoIC0gMSwgcHJlZGljYXRlLCBpc1N0cmljdCwgcmVzdWx0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5UHVzaChyZXN1bHQsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFpc1N0cmljdCkge1xuICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZsYXR0ZW47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19iYXNlRmxhdHRlbi5qc1xuLy8gbW9kdWxlIGlkID0gODhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGNyZWF0ZUJhc2VGb3IgPSByZXF1aXJlKCcuL19jcmVhdGVCYXNlRm9yJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzIG92ZXIgYG9iamVjdGBcbiAqIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBhbmQgaW52b2tlcyBgaXRlcmF0ZWVgIGZvciBlYWNoIHByb3BlcnR5LlxuICogSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGtleXNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGtleXMgb2YgYG9iamVjdGAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG52YXIgYmFzZUZvciA9IGNyZWF0ZUJhc2VGb3IoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRm9yO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fYmFzZUZvci5qc1xuLy8gbW9kdWxlIGlkID0gODlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGNhc3RQYXRoID0gcmVxdWlyZSgnLi9fY2FzdFBhdGgnKSxcbiAgICB0b0tleSA9IHJlcXVpcmUoJy4vX3RvS2V5Jyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZ2V0YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZmF1bHQgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0KG9iamVjdCwgcGF0aCkge1xuICBwYXRoID0gY2FzdFBhdGgocGF0aCwgb2JqZWN0KTtcblxuICB2YXIgaW5kZXggPSAwLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGg7XG5cbiAgd2hpbGUgKG9iamVjdCAhPSBudWxsICYmIGluZGV4IDwgbGVuZ3RoKSB7XG4gICAgb2JqZWN0ID0gb2JqZWN0W3RvS2V5KHBhdGhbaW5kZXgrK10pXTtcbiAgfVxuICByZXR1cm4gKGluZGV4ICYmIGluZGV4ID09IGxlbmd0aCkgPyBvYmplY3QgOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUdldDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2Jhc2VHZXQuanNcbi8vIG1vZHVsZSBpZCA9IDkwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaGFzSW5gIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30ga2V5IFRoZSBrZXkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VIYXNJbihvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYga2V5IGluIE9iamVjdChvYmplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VIYXNJbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2Jhc2VIYXNJbi5qc1xuLy8gbW9kdWxlIGlkID0gOTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0FyZ3VtZW50c2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICovXG5mdW5jdGlvbiBiYXNlSXNBcmd1bWVudHModmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gYXJnc1RhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNBcmd1bWVudHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19iYXNlSXNBcmd1bWVudHMuanNcbi8vIG1vZHVsZSBpZCA9IDkyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNNYXNrZWQgPSByZXF1aXJlKCcuL19pc01hc2tlZCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIHRvU291cmNlID0gcmVxdWlyZSgnLi9fdG9Tb3VyY2UnKTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSBpc0Z1bmN0aW9uKHZhbHVlKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNOYXRpdmU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19iYXNlSXNOYXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDkzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRhVmlld1RhZ10gPSB0eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9XG50eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPSB0eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9XG50eXBlZEFycmF5VGFnc1ttYXBUYWddID0gdHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9XG50eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID0gdHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tzZXRUYWddID0gdHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9XG50eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzVHlwZWRBcnJheWAgd2l0aG91dCBOb2RlLmpzIG9wdGltaXphdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmXG4gICAgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW2Jhc2VHZXRUYWcodmFsdWUpXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNUeXBlZEFycmF5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fYmFzZUlzVHlwZWRBcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gOTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIGlzUHJvdG90eXBlID0gcmVxdWlyZSgnLi9faXNQcm90b3R5cGUnKSxcbiAgICBuYXRpdmVLZXlzSW4gPSByZXF1aXJlKCcuL19uYXRpdmVLZXlzSW4nKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzSW5gIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXNJbihvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXNJbihvYmplY3QpO1xuICB9XG4gIHZhciBpc1Byb3RvID0gaXNQcm90b3R5cGUob2JqZWN0KSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoIShrZXkgPT0gJ2NvbnN0cnVjdG9yJyAmJiAoaXNQcm90byB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlS2V5c0luO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fYmFzZUtleXNJbi5qc1xuLy8gbW9kdWxlIGlkID0gOTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIFN0YWNrID0gcmVxdWlyZSgnLi9fU3RhY2snKSxcbiAgICBhc3NpZ25NZXJnZVZhbHVlID0gcmVxdWlyZSgnLi9fYXNzaWduTWVyZ2VWYWx1ZScpLFxuICAgIGJhc2VGb3IgPSByZXF1aXJlKCcuL19iYXNlRm9yJyksXG4gICAgYmFzZU1lcmdlRGVlcCA9IHJlcXVpcmUoJy4vX2Jhc2VNZXJnZURlZXAnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICBrZXlzSW4gPSByZXF1aXJlKCcuL2tleXNJbicpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1lcmdlYCB3aXRob3V0IHN1cHBvcnQgZm9yIG11bHRpcGxlIHNvdXJjZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge251bWJlcn0gc3JjSW5kZXggVGhlIGluZGV4IG9mIGBzb3VyY2VgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgbWVyZ2VkIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIHZhbHVlcyBhbmQgdGhlaXIgbWVyZ2VkXG4gKiAgY291bnRlcnBhcnRzLlxuICovXG5mdW5jdGlvbiBiYXNlTWVyZ2Uob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4LCBjdXN0b21pemVyLCBzdGFjaykge1xuICBpZiAob2JqZWN0ID09PSBzb3VyY2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgYmFzZUZvcihzb3VyY2UsIGZ1bmN0aW9uKHNyY1ZhbHVlLCBrZXkpIHtcbiAgICBpZiAoaXNPYmplY3Qoc3JjVmFsdWUpKSB7XG4gICAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgICAgYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBzcmNJbmRleCwgYmFzZU1lcmdlLCBjdXN0b21pemVyLCBzdGFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNyY1ZhbHVlLCAoa2V5ICsgJycpLCBvYmplY3QsIHNvdXJjZSwgc3RhY2spXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBuZXdWYWx1ZSA9IHNyY1ZhbHVlO1xuICAgICAgfVxuICAgICAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH1cbiAgfSwga2V5c0luKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlTWVyZ2U7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19iYXNlTWVyZ2UuanNcbi8vIG1vZHVsZSBpZCA9IDk2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhc3NpZ25NZXJnZVZhbHVlID0gcmVxdWlyZSgnLi9fYXNzaWduTWVyZ2VWYWx1ZScpLFxuICAgIGNsb25lQnVmZmVyID0gcmVxdWlyZSgnLi9fY2xvbmVCdWZmZXInKSxcbiAgICBjbG9uZVR5cGVkQXJyYXkgPSByZXF1aXJlKCcuL19jbG9uZVR5cGVkQXJyYXknKSxcbiAgICBjb3B5QXJyYXkgPSByZXF1aXJlKCcuL19jb3B5QXJyYXknKSxcbiAgICBpbml0Q2xvbmVPYmplY3QgPSByZXF1aXJlKCcuL19pbml0Q2xvbmVPYmplY3QnKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNBcnJheUxpa2VPYmplY3QgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlT2JqZWN0JyksXG4gICAgaXNCdWZmZXIgPSByZXF1aXJlKCcuL2lzQnVmZmVyJyksXG4gICAgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaXNGdW5jdGlvbicpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIGlzUGxhaW5PYmplY3QgPSByZXF1aXJlKCcuL2lzUGxhaW5PYmplY3QnKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuL2lzVHlwZWRBcnJheScpLFxuICAgIHRvUGxhaW5PYmplY3QgPSByZXF1aXJlKCcuL3RvUGxhaW5PYmplY3QnKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VNZXJnZWAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBtZXJnZXMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgbWVyZ2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBtZXJnZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzcmNJbmRleCBUaGUgaW5kZXggb2YgYHNvdXJjZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXJnZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1lcmdlIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmVkIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIHZhbHVlcyBhbmQgdGhlaXIgbWVyZ2VkXG4gKiAgY291bnRlcnBhcnRzLlxuICovXG5mdW5jdGlvbiBiYXNlTWVyZ2VEZWVwKG9iamVjdCwgc291cmNlLCBrZXksIHNyY0luZGV4LCBtZXJnZUZ1bmMsIGN1c3RvbWl6ZXIsIHN0YWNrKSB7XG4gIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgc3JjVmFsdWUgPSBzb3VyY2Vba2V5XSxcbiAgICAgIHN0YWNrZWQgPSBzdGFjay5nZXQoc3JjVmFsdWUpO1xuXG4gIGlmIChzdGFja2VkKSB7XG4gICAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgc3RhY2tlZCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICA/IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCAoa2V5ICsgJycpLCBvYmplY3QsIHNvdXJjZSwgc3RhY2spXG4gICAgOiB1bmRlZmluZWQ7XG5cbiAgdmFyIGlzQ29tbW9uID0gbmV3VmFsdWUgPT09IHVuZGVmaW5lZDtcblxuICBpZiAoaXNDb21tb24pIHtcbiAgICB2YXIgaXNBcnIgPSBpc0FycmF5KHNyY1ZhbHVlKSxcbiAgICAgICAgaXNCdWZmID0gIWlzQXJyICYmIGlzQnVmZmVyKHNyY1ZhbHVlKSxcbiAgICAgICAgaXNUeXBlZCA9ICFpc0FyciAmJiAhaXNCdWZmICYmIGlzVHlwZWRBcnJheShzcmNWYWx1ZSk7XG5cbiAgICBuZXdWYWx1ZSA9IHNyY1ZhbHVlO1xuICAgIGlmIChpc0FyciB8fCBpc0J1ZmYgfHwgaXNUeXBlZCkge1xuICAgICAgaWYgKGlzQXJyYXkob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gb2JqVmFsdWU7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc0FycmF5TGlrZU9iamVjdChvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBjb3B5QXJyYXkob2JqVmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNCdWZmKSB7XG4gICAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgICAgIG5ld1ZhbHVlID0gY2xvbmVCdWZmZXIoc3JjVmFsdWUsIHRydWUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNUeXBlZCkge1xuICAgICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgICAgICBuZXdWYWx1ZSA9IGNsb25lVHlwZWRBcnJheShzcmNWYWx1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbmV3VmFsdWUgPSBbXTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChzcmNWYWx1ZSkgfHwgaXNBcmd1bWVudHMoc3JjVmFsdWUpKSB7XG4gICAgICBuZXdWYWx1ZSA9IG9ialZhbHVlO1xuICAgICAgaWYgKGlzQXJndW1lbnRzKG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IHRvUGxhaW5PYmplY3Qob2JqVmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoIWlzT2JqZWN0KG9ialZhbHVlKSB8fCAoc3JjSW5kZXggJiYgaXNGdW5jdGlvbihvYmpWYWx1ZSkpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gaW5pdENsb25lT2JqZWN0KHNyY1ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBpZiAoaXNDb21tb24pIHtcbiAgICAvLyBSZWN1cnNpdmVseSBtZXJnZSBvYmplY3RzIGFuZCBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBzdGFjay5zZXQoc3JjVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICBtZXJnZUZ1bmMobmV3VmFsdWUsIHNyY1ZhbHVlLCBzcmNJbmRleCwgY3VzdG9taXplciwgc3RhY2spO1xuICAgIHN0YWNrWydkZWxldGUnXShzcmNWYWx1ZSk7XG4gIH1cbiAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VNZXJnZURlZXA7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19iYXNlTWVyZ2VEZWVwLmpzXG4vLyBtb2R1bGUgaWQgPSA5N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYmFzZVBpY2tCeSA9IHJlcXVpcmUoJy4vX2Jhc2VQaWNrQnknKSxcbiAgICBoYXNJbiA9IHJlcXVpcmUoJy4vaGFzSW4nKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5waWNrYCB3aXRob3V0IHN1cHBvcnQgZm9yIGluZGl2aWR1YWxcbiAqIHByb3BlcnR5IGlkZW50aWZpZXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmdbXX0gcGF0aHMgVGhlIHByb3BlcnR5IHBhdGhzIHRvIHBpY2suXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlUGljayhvYmplY3QsIHBhdGhzKSB7XG4gIHJldHVybiBiYXNlUGlja0J5KG9iamVjdCwgcGF0aHMsIGZ1bmN0aW9uKHZhbHVlLCBwYXRoKSB7XG4gICAgcmV0dXJuIGhhc0luKG9iamVjdCwgcGF0aCk7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VQaWNrO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fYmFzZVBpY2suanNcbi8vIG1vZHVsZSBpZCA9IDk4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBiYXNlR2V0ID0gcmVxdWlyZSgnLi9fYmFzZUdldCcpLFxuICAgIGJhc2VTZXQgPSByZXF1aXJlKCcuL19iYXNlU2V0JyksXG4gICAgY2FzdFBhdGggPSByZXF1aXJlKCcuL19jYXN0UGF0aCcpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mICBgXy5waWNrQnlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nW119IHBhdGhzIFRoZSBwcm9wZXJ0eSBwYXRocyB0byBwaWNrLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBwcm9wZXJ0eS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGJhc2VQaWNrQnkob2JqZWN0LCBwYXRocywgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcGF0aHMubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0ge307XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgcGF0aCA9IHBhdGhzW2luZGV4XSxcbiAgICAgICAgdmFsdWUgPSBiYXNlR2V0KG9iamVjdCwgcGF0aCk7XG5cbiAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBwYXRoKSkge1xuICAgICAgYmFzZVNldChyZXN1bHQsIGNhc3RQYXRoKHBhdGgsIG9iamVjdCksIHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlUGlja0J5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fYmFzZVBpY2tCeS5qc1xuLy8gbW9kdWxlIGlkID0gOTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlkZW50aXR5ID0gcmVxdWlyZSgnLi9pZGVudGl0eScpLFxuICAgIG92ZXJSZXN0ID0gcmVxdWlyZSgnLi9fb3ZlclJlc3QnKSxcbiAgICBzZXRUb1N0cmluZyA9IHJlcXVpcmUoJy4vX3NldFRvU3RyaW5nJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucmVzdGAgd2hpY2ggZG9lc24ndCB2YWxpZGF0ZSBvciBjb2VyY2UgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VSZXN0KGZ1bmMsIHN0YXJ0KSB7XG4gIHJldHVybiBzZXRUb1N0cmluZyhvdmVyUmVzdChmdW5jLCBzdGFydCwgaWRlbnRpdHkpLCBmdW5jICsgJycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VSZXN0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fYmFzZVJlc3QuanNcbi8vIG1vZHVsZSBpZCA9IDEwMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYXNzaWduVmFsdWUgPSByZXF1aXJlKCcuL19hc3NpZ25WYWx1ZScpLFxuICAgIGNhc3RQYXRoID0gcmVxdWlyZSgnLi9fY2FzdFBhdGgnKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9faXNJbmRleCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIHRvS2V5ID0gcmVxdWlyZSgnLi9fdG9LZXknKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5zZXRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIHBhdGggY3JlYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlU2V0KG9iamVjdCwgcGF0aCwgdmFsdWUsIGN1c3RvbWl6ZXIpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICBwYXRoID0gY2FzdFBhdGgocGF0aCwgb2JqZWN0KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoLFxuICAgICAgbGFzdEluZGV4ID0gbGVuZ3RoIC0gMSxcbiAgICAgIG5lc3RlZCA9IG9iamVjdDtcblxuICB3aGlsZSAobmVzdGVkICE9IG51bGwgJiYgKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSB0b0tleShwYXRoW2luZGV4XSksXG4gICAgICAgIG5ld1ZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAoaW5kZXggIT0gbGFzdEluZGV4KSB7XG4gICAgICB2YXIgb2JqVmFsdWUgPSBuZXN0ZWRba2V5XTtcbiAgICAgIG5ld1ZhbHVlID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIob2JqVmFsdWUsIGtleSwgbmVzdGVkKSA6IHVuZGVmaW5lZDtcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gaXNPYmplY3Qob2JqVmFsdWUpXG4gICAgICAgICAgPyBvYmpWYWx1ZVxuICAgICAgICAgIDogKGlzSW5kZXgocGF0aFtpbmRleCArIDFdKSA/IFtdIDoge30pO1xuICAgICAgfVxuICAgIH1cbiAgICBhc3NpZ25WYWx1ZShuZXN0ZWQsIGtleSwgbmV3VmFsdWUpO1xuICAgIG5lc3RlZCA9IG5lc3RlZFtrZXldO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVNldDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2Jhc2VTZXQuanNcbi8vIG1vZHVsZSBpZCA9IDEwMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgY29uc3RhbnQgPSByZXF1aXJlKCcuL2NvbnN0YW50JyksXG4gICAgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19kZWZpbmVQcm9wZXJ0eScpLFxuICAgIGlkZW50aXR5ID0gcmVxdWlyZSgnLi9pZGVudGl0eScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBzZXRUb1N0cmluZ2Agd2l0aG91dCBzdXBwb3J0IGZvciBob3QgbG9vcCBzaG9ydGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RyaW5nIFRoZSBgdG9TdHJpbmdgIHJlc3VsdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBgZnVuY2AuXG4gKi9cbnZhciBiYXNlU2V0VG9TdHJpbmcgPSAhZGVmaW5lUHJvcGVydHkgPyBpZGVudGl0eSA6IGZ1bmN0aW9uKGZ1bmMsIHN0cmluZykge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHkoZnVuYywgJ3RvU3RyaW5nJywge1xuICAgICdjb25maWd1cmFibGUnOiB0cnVlLFxuICAgICdlbnVtZXJhYmxlJzogZmFsc2UsXG4gICAgJ3ZhbHVlJzogY29uc3RhbnQoc3RyaW5nKSxcbiAgICAnd3JpdGFibGUnOiB0cnVlXG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlU2V0VG9TdHJpbmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19iYXNlU2V0VG9TdHJpbmcuanNcbi8vIG1vZHVsZSBpZCA9IDEwMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VUaW1lcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2Jhc2VUaW1lcy5qc1xuLy8gbW9kdWxlIGlkID0gMTAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBhcnJheU1hcCA9IHJlcXVpcmUoJy4vX2FycmF5TWFwJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pc1N5bWJvbCcpO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVG9TdHJpbmcgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnRvU3RyaW5nIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRvU3RyaW5nYCB3aGljaCBkb2Vzbid0IGNvbnZlcnQgbnVsbGlzaFxuICogdmFsdWVzIHRvIGVtcHR5IHN0cmluZ3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICAvLyBFeGl0IGVhcmx5IGZvciBzdHJpbmdzIHRvIGF2b2lkIGEgcGVyZm9ybWFuY2UgaGl0IGluIHNvbWUgZW52aXJvbm1lbnRzLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbnZlcnQgdmFsdWVzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgcmV0dXJuIGFycmF5TWFwKHZhbHVlLCBiYXNlVG9TdHJpbmcpICsgJyc7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBzeW1ib2xUb1N0cmluZyA/IHN5bWJvbFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VUb1N0cmluZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2Jhc2VUb1N0cmluZy5qc1xuLy8gbW9kdWxlIGlkID0gMTA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5hcnlgIHdpdGhvdXQgc3VwcG9ydCBmb3Igc3RvcmluZyBtZXRhZGF0YS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2FwIGFyZ3VtZW50cyBmb3IuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmFyeShmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jKHZhbHVlKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVW5hcnk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19iYXNlVW5hcnkuanNcbi8vIG1vZHVsZSBpZCA9IDEwNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgVWludDhBcnJheSA9IHJlcXVpcmUoJy4vX1VpbnQ4QXJyYXknKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYGFycmF5QnVmZmVyYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYXJyYXlCdWZmZXIgVGhlIGFycmF5IGJ1ZmZlciB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtBcnJheUJ1ZmZlcn0gUmV0dXJucyB0aGUgY2xvbmVkIGFycmF5IGJ1ZmZlci5cbiAqL1xuZnVuY3Rpb24gY2xvbmVBcnJheUJ1ZmZlcihhcnJheUJ1ZmZlcikge1xuICB2YXIgcmVzdWx0ID0gbmV3IGFycmF5QnVmZmVyLmNvbnN0cnVjdG9yKGFycmF5QnVmZmVyLmJ5dGVMZW5ndGgpO1xuICBuZXcgVWludDhBcnJheShyZXN1bHQpLnNldChuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlcikpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsb25lQXJyYXlCdWZmZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19jbG9uZUFycmF5QnVmZmVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgQnVmZmVyID0gbW9kdWxlRXhwb3J0cyA/IHJvb3QuQnVmZmVyIDogdW5kZWZpbmVkLFxuICAgIGFsbG9jVW5zYWZlID0gQnVmZmVyID8gQnVmZmVyLmFsbG9jVW5zYWZlIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiAgYGJ1ZmZlcmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXIgVGhlIGJ1ZmZlciB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7QnVmZmVyfSBSZXR1cm5zIHRoZSBjbG9uZWQgYnVmZmVyLlxuICovXG5mdW5jdGlvbiBjbG9uZUJ1ZmZlcihidWZmZXIsIGlzRGVlcCkge1xuICBpZiAoaXNEZWVwKSB7XG4gICAgcmV0dXJuIGJ1ZmZlci5zbGljZSgpO1xuICB9XG4gIHZhciBsZW5ndGggPSBidWZmZXIubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gYWxsb2NVbnNhZmUgPyBhbGxvY1Vuc2FmZShsZW5ndGgpIDogbmV3IGJ1ZmZlci5jb25zdHJ1Y3RvcihsZW5ndGgpO1xuXG4gIGJ1ZmZlci5jb3B5KHJlc3VsdCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvbmVCdWZmZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19jbG9uZUJ1ZmZlci5qc1xuLy8gbW9kdWxlIGlkID0gMTA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBjbG9uZUFycmF5QnVmZmVyID0gcmVxdWlyZSgnLi9fY2xvbmVBcnJheUJ1ZmZlcicpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgdHlwZWRBcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSB0eXBlZEFycmF5IFRoZSB0eXBlZCBhcnJheSB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgdHlwZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGNsb25lVHlwZWRBcnJheSh0eXBlZEFycmF5LCBpc0RlZXApIHtcbiAgdmFyIGJ1ZmZlciA9IGlzRGVlcCA/IGNsb25lQXJyYXlCdWZmZXIodHlwZWRBcnJheS5idWZmZXIpIDogdHlwZWRBcnJheS5idWZmZXI7XG4gIHJldHVybiBuZXcgdHlwZWRBcnJheS5jb25zdHJ1Y3RvcihidWZmZXIsIHR5cGVkQXJyYXkuYnl0ZU9mZnNldCwgdHlwZWRBcnJheS5sZW5ndGgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsb25lVHlwZWRBcnJheTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2Nsb25lVHlwZWRBcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gMTA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gY29weUFycmF5KHNvdXJjZSwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xuXG4gIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcHlBcnJheTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2NvcHlBcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gMTA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhc3NpZ25WYWx1ZSA9IHJlcXVpcmUoJy4vX2Fzc2lnblZhbHVlJyksXG4gICAgYmFzZUFzc2lnblZhbHVlID0gcmVxdWlyZSgnLi9fYmFzZUFzc2lnblZhbHVlJyk7XG5cbi8qKlxuICogQ29waWVzIHByb3BlcnRpZXMgb2YgYHNvdXJjZWAgdG8gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBpZGVudGlmaWVycyB0byBjb3B5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIHRvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29waWVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlPYmplY3Qoc291cmNlLCBwcm9wcywgb2JqZWN0LCBjdXN0b21pemVyKSB7XG4gIHZhciBpc05ldyA9ICFvYmplY3Q7XG4gIG9iamVjdCB8fCAob2JqZWN0ID0ge30pO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcblxuICAgIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICAgID8gY3VzdG9taXplcihvYmplY3Rba2V5XSwgc291cmNlW2tleV0sIGtleSwgb2JqZWN0LCBzb3VyY2UpXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBuZXdWYWx1ZSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgICBpZiAoaXNOZXcpIHtcbiAgICAgIGJhc2VBc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcHlPYmplY3Q7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19jb3B5T2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvdmVycmVhY2hpbmcgY29yZS1qcyBzaGltcy4gKi9cbnZhciBjb3JlSnNEYXRhID0gcm9vdFsnX19jb3JlLWpzX3NoYXJlZF9fJ107XG5cbm1vZHVsZS5leHBvcnRzID0gY29yZUpzRGF0YTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2NvcmVKc0RhdGEuanNcbi8vIG1vZHVsZSBpZCA9IDExMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYmFzZVJlc3QgPSByZXF1aXJlKCcuL19iYXNlUmVzdCcpLFxuICAgIGlzSXRlcmF0ZWVDYWxsID0gcmVxdWlyZSgnLi9faXNJdGVyYXRlZUNhbGwnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gbGlrZSBgXy5hc3NpZ25gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhc3NpZ25lciBUaGUgZnVuY3Rpb24gdG8gYXNzaWduIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFzc2lnbmVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVBc3NpZ25lcihhc3NpZ25lcikge1xuICByZXR1cm4gYmFzZVJlc3QoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2VzKSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IHNvdXJjZXMubGVuZ3RoLFxuICAgICAgICBjdXN0b21pemVyID0gbGVuZ3RoID4gMSA/IHNvdXJjZXNbbGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQsXG4gICAgICAgIGd1YXJkID0gbGVuZ3RoID4gMiA/IHNvdXJjZXNbMl0gOiB1bmRlZmluZWQ7XG5cbiAgICBjdXN0b21pemVyID0gKGFzc2lnbmVyLmxlbmd0aCA+IDMgJiYgdHlwZW9mIGN1c3RvbWl6ZXIgPT0gJ2Z1bmN0aW9uJylcbiAgICAgID8gKGxlbmd0aC0tLCBjdXN0b21pemVyKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoZ3VhcmQgJiYgaXNJdGVyYXRlZUNhbGwoc291cmNlc1swXSwgc291cmNlc1sxXSwgZ3VhcmQpKSB7XG4gICAgICBjdXN0b21pemVyID0gbGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IGN1c3RvbWl6ZXI7XG4gICAgICBsZW5ndGggPSAxO1xuICAgIH1cbiAgICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBhc3NpZ25lcihvYmplY3QsIHNvdXJjZSwgaW5kZXgsIGN1c3RvbWl6ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVBc3NpZ25lcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2NyZWF0ZUFzc2lnbmVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDcmVhdGVzIGEgYmFzZSBmdW5jdGlvbiBmb3IgbWV0aG9kcyBsaWtlIGBfLmZvckluYCBhbmQgYF8uZm9yT3duYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVCYXNlRm9yKGZyb21SaWdodCkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0LCBpdGVyYXRlZSwga2V5c0Z1bmMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgaXRlcmFibGUgPSBPYmplY3Qob2JqZWN0KSxcbiAgICAgICAgcHJvcHMgPSBrZXlzRnVuYyhvYmplY3QpLFxuICAgICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1tmcm9tUmlnaHQgPyBsZW5ndGggOiArK2luZGV4XTtcbiAgICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtrZXldLCBrZXksIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQmFzZUZvcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2NyZWF0ZUJhc2VGb3IuanNcbi8vIG1vZHVsZSBpZCA9IDExM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZmxhdHRlbiA9IHJlcXVpcmUoJy4vZmxhdHRlbicpLFxuICAgIG92ZXJSZXN0ID0gcmVxdWlyZSgnLi9fb3ZlclJlc3QnKSxcbiAgICBzZXRUb1N0cmluZyA9IHJlcXVpcmUoJy4vX3NldFRvU3RyaW5nJyk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlUmVzdGAgd2hpY2ggZmxhdHRlbnMgdGhlIHJlc3QgYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gZmxhdFJlc3QoZnVuYykge1xuICByZXR1cm4gc2V0VG9TdHJpbmcob3ZlclJlc3QoZnVuYywgdW5kZWZpbmVkLCBmbGF0dGVuKSwgZnVuYyArICcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmbGF0UmVzdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2ZsYXRSZXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UmF3VGFnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fZ2V0UmF3VGFnLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0VmFsdWU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19nZXRWYWx1ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBjYXN0UGF0aCA9IHJlcXVpcmUoJy4vX2Nhc3RQYXRoJyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuL19pc0luZGV4JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgdG9LZXkgPSByZXF1aXJlKCcuL190b0tleScpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgcGF0aGAgZXhpc3RzIG9uIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCB0byBjaGVjay5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhc0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrIHByb3BlcnRpZXMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHBhdGhgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNQYXRoKG9iamVjdCwgcGF0aCwgaGFzRnVuYykge1xuICBwYXRoID0gY2FzdFBhdGgocGF0aCwgb2JqZWN0KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gZmFsc2U7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gdG9LZXkocGF0aFtpbmRleF0pO1xuICAgIGlmICghKHJlc3VsdCA9IG9iamVjdCAhPSBudWxsICYmIGhhc0Z1bmMob2JqZWN0LCBrZXkpKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIG9iamVjdCA9IG9iamVjdFtrZXldO1xuICB9XG4gIGlmIChyZXN1bHQgfHwgKytpbmRleCAhPSBsZW5ndGgpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGxlbmd0aCA9IG9iamVjdCA9PSBudWxsID8gMCA6IG9iamVjdC5sZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNQYXRoO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9faGFzUGF0aC5qc1xuLy8gbW9kdWxlIGlkID0gMTE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaENsZWFyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9faGFzaENsZWFyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gIHZhciByZXN1bHQgPSB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG4gIHRoaXMuc2l6ZSAtPSByZXN1bHQgPyAxIDogMDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoRGVsZXRlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9faGFzaERlbGV0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hHZXQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19oYXNoR2V0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIG5hdGl2ZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX25hdGl2ZUNyZWF0ZScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IChkYXRhW2tleV0gIT09IHVuZGVmaW5lZCkgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaEhhcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2hhc2hIYXMuanNcbi8vIG1vZHVsZSBpZCA9IDEyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbmF0aXZlQ3JlYXRlID0gcmVxdWlyZSgnLi9fbmF0aXZlQ3JlYXRlJyk7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqXG4gKiBTZXRzIHRoZSBoYXNoIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaGFzaCBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gaGFzaFNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgdGhpcy5zaXplICs9IHRoaXMuaGFzKGtleSkgPyAwIDogMTtcbiAgZGF0YVtrZXldID0gKG5hdGl2ZUNyZWF0ZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IEhBU0hfVU5ERUZJTkVEIDogdmFsdWU7XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hTZXQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19oYXNoU2V0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGJhc2VDcmVhdGUgPSByZXF1aXJlKCcuL19iYXNlQ3JlYXRlJyksXG4gICAgZ2V0UHJvdG90eXBlID0gcmVxdWlyZSgnLi9fZ2V0UHJvdG90eXBlJyksXG4gICAgaXNQcm90b3R5cGUgPSByZXF1aXJlKCcuL19pc1Byb3RvdHlwZScpO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZU9iamVjdChvYmplY3QpIHtcbiAgcmV0dXJuICh0eXBlb2Ygb2JqZWN0LmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgIWlzUHJvdG90eXBlKG9iamVjdCkpXG4gICAgPyBiYXNlQ3JlYXRlKGdldFByb3RvdHlwZShvYmplY3QpKVxuICAgIDoge307XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5pdENsb25lT2JqZWN0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9faW5pdENsb25lT2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ByZWFkYWJsZVN5bWJvbCA9IFN5bWJvbCA/IFN5bWJvbC5pc0NvbmNhdFNwcmVhZGFibGUgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBmbGF0dGVuYWJsZSBgYXJndW1lbnRzYCBvYmplY3Qgb3IgYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZmxhdHRlbmFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNGbGF0dGVuYWJsZSh2YWx1ZSkge1xuICByZXR1cm4gaXNBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpIHx8XG4gICAgISEoc3ByZWFkYWJsZVN5bWJvbCAmJiB2YWx1ZSAmJiB2YWx1ZVtzcHJlYWRhYmxlU3ltYm9sXSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGbGF0dGVuYWJsZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2lzRmxhdHRlbmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDEyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZXEgPSByZXF1aXJlKCcuL2VxJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4vX2lzSW5kZXgnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgdmFsdWUgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IGluZGV4IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgaW5kZXggb3Iga2V5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBvYmplY3QgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBvYmplY3QgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJ1xuICAgICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgICA6ICh0eXBlID09ICdzdHJpbmcnICYmIGluZGV4IGluIG9iamVjdClcbiAgICAgICkge1xuICAgIHJldHVybiBlcShvYmplY3RbaW5kZXhdLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSXRlcmF0ZWVDYWxsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9faXNJdGVyYXRlZUNhbGwuanNcbi8vIG1vZHVsZSBpZCA9IDEyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pc1N5bWJvbCcpO1xuXG4vKiogVXNlZCB0byBtYXRjaCBwcm9wZXJ0eSBuYW1lcyB3aXRoaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVJc0RlZXBQcm9wID0gL1xcLnxcXFsoPzpbXltcXF1dKnwoW1wiJ10pKD86KD8hXFwxKVteXFxcXF18XFxcXC4pKj9cXDEpXFxdLyxcbiAgICByZUlzUGxhaW5Qcm9wID0gL15cXHcqJC87XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lIGFuZCBub3QgYSBwcm9wZXJ0eSBwYXRoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5IGtleXMgb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXkodmFsdWUsIG9iamVjdCkge1xuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIGlmICh0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicgfHxcbiAgICAgIHZhbHVlID09IG51bGwgfHwgaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIHJlSXNQbGFpblByb3AudGVzdCh2YWx1ZSkgfHwgIXJlSXNEZWVwUHJvcC50ZXN0KHZhbHVlKSB8fFxuICAgIChvYmplY3QgIT0gbnVsbCAmJiB2YWx1ZSBpbiBPYmplY3Qob2JqZWN0KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNLZXk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19pc0tleS5qc1xuLy8gbW9kdWxlIGlkID0gMTI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyB1bmlxdWUgb2JqZWN0IGtleS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleWFibGUodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAodHlwZSA9PSAnc3RyaW5nJyB8fCB0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicpXG4gICAgPyAodmFsdWUgIT09ICdfX3Byb3RvX18nKVxuICAgIDogKHZhbHVlID09PSBudWxsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0tleWFibGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19pc0tleWFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDEyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgY29yZUpzRGF0YSA9IHJlcXVpcmUoJy4vX2NvcmVKc0RhdGEnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc01hc2tlZDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX2lzTWFza2VkLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xuICB0aGlzLnNpemUgPSAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RDYWNoZUNsZWFyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fbGlzdENhY2hlQ2xlYXIuanNcbi8vIG1vZHVsZSBpZCA9IDEyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIC0tdGhpcy5zaXplO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVEZWxldGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19saXN0Q2FjaGVEZWxldGUuanNcbi8vIG1vZHVsZSBpZCA9IDEzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdENhY2hlR2V0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fbGlzdENhY2hlR2V0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFzc29jSW5kZXhPZiA9IHJlcXVpcmUoJy4vX2Fzc29jSW5kZXhPZicpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVIYXM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19saXN0Q2FjaGVIYXMuanNcbi8vIG1vZHVsZSBpZCA9IDEzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgKyt0aGlzLnNpemU7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVTZXQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19saXN0Q2FjaGVTZXQuanNcbi8vIG1vZHVsZSBpZCA9IDEzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgSGFzaCA9IHJlcXVpcmUoJy4vX0hhc2gnKSxcbiAgICBMaXN0Q2FjaGUgPSByZXF1aXJlKCcuL19MaXN0Q2FjaGUnKSxcbiAgICBNYXAgPSByZXF1aXJlKCcuL19NYXAnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5zaXplID0gMDtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlQ2xlYXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19tYXBDYWNoZUNsZWFyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdldE1hcERhdGEgPSByZXF1aXJlKCcuL19nZXRNYXBEYXRhJyk7XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIHJlc3VsdCA9IGdldE1hcERhdGEodGhpcywga2V5KVsnZGVsZXRlJ10oa2V5KTtcbiAgdGhpcy5zaXplIC09IHJlc3VsdCA/IDEgOiAwO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlRGVsZXRlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fbWFwQ2FjaGVEZWxldGUuanNcbi8vIG1vZHVsZSBpZCA9IDEzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2V0TWFwRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hcERhdGEnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlR2V0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fbWFwQ2FjaGVHZXQuanNcbi8vIG1vZHVsZSBpZCA9IDEzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2V0TWFwRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hcERhdGEnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBtYXAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5oYXMoa2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBDYWNoZUhhcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX21hcENhY2hlSGFzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdldE1hcERhdGEgPSByZXF1aXJlKCcuL19nZXRNYXBEYXRhJyk7XG5cbi8qKlxuICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IGdldE1hcERhdGEodGhpcywga2V5KSxcbiAgICAgIHNpemUgPSBkYXRhLnNpemU7XG5cbiAgZGF0YS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHRoaXMuc2l6ZSArPSBkYXRhLnNpemUgPT0gc2l6ZSA/IDAgOiAxO1xuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBDYWNoZVNldDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX21hcENhY2hlU2V0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIG1lbW9pemUgPSByZXF1aXJlKCcuL21lbW9pemUnKTtcblxuLyoqIFVzZWQgYXMgdGhlIG1heGltdW0gbWVtb2l6ZSBjYWNoZSBzaXplLiAqL1xudmFyIE1BWF9NRU1PSVpFX1NJWkUgPSA1MDA7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLm1lbW9pemVgIHdoaWNoIGNsZWFycyB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24nc1xuICogY2FjaGUgd2hlbiBpdCBleGNlZWRzIGBNQVhfTUVNT0laRV9TSVpFYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaGF2ZSBpdHMgb3V0cHV0IG1lbW9pemVkLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG1lbW9pemVDYXBwZWQoZnVuYykge1xuICB2YXIgcmVzdWx0ID0gbWVtb2l6ZShmdW5jLCBmdW5jdGlvbihrZXkpIHtcbiAgICBpZiAoY2FjaGUuc2l6ZSA9PT0gTUFYX01FTU9JWkVfU0laRSkge1xuICAgICAgY2FjaGUuY2xlYXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbiAgfSk7XG5cbiAgdmFyIGNhY2hlID0gcmVzdWx0LmNhY2hlO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1lbW9pemVDYXBwZWQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19tZW1vaXplQ2FwcGVkLmpzXG4vLyBtb2R1bGUgaWQgPSAxMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2VcbiAqIFtgT2JqZWN0LmtleXNgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGV4Y2VwdCB0aGF0IGl0IGluY2x1ZGVzIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIG5hdGl2ZUtleXNJbihvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBpZiAob2JqZWN0ICE9IG51bGwpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmF0aXZlS2V5c0luO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fbmF0aXZlS2V5c0luLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGZyZWVHbG9iYWwgPSByZXF1aXJlKCcuL19mcmVlR2xvYmFsJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBwcm9jZXNzYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZVByb2Nlc3MgPSBtb2R1bGVFeHBvcnRzICYmIGZyZWVHbG9iYWwucHJvY2VzcztcblxuLyoqIFVzZWQgdG8gYWNjZXNzIGZhc3RlciBOb2RlLmpzIGhlbHBlcnMuICovXG52YXIgbm9kZVV0aWwgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZyZWVQcm9jZXNzICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcgJiYgZnJlZVByb2Nlc3MuYmluZGluZygndXRpbCcpO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBub2RlVXRpbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX25vZGVVdGlsLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyB1c2luZyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb2JqZWN0VG9TdHJpbmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19vYmplY3RUb1N0cmluZy5qc1xuLy8gbW9kdWxlIGlkID0gMTQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG92ZXJBcmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19vdmVyQXJnLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFVzZWQgdG8gZGV0ZWN0IGhvdCBmdW5jdGlvbnMgYnkgbnVtYmVyIG9mIGNhbGxzIHdpdGhpbiBhIHNwYW4gb2YgbWlsbGlzZWNvbmRzLiAqL1xudmFyIEhPVF9DT1VOVCA9IDgwMCxcbiAgICBIT1RfU1BBTiA9IDE2O1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTm93ID0gRGF0ZS5ub3c7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQnbGwgc2hvcnQgb3V0IGFuZCBpbnZva2UgYGlkZW50aXR5YCBpbnN0ZWFkXG4gKiBvZiBgZnVuY2Agd2hlbiBpdCdzIGNhbGxlZCBgSE9UX0NPVU5UYCBvciBtb3JlIHRpbWVzIGluIGBIT1RfU1BBTmBcbiAqIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcmVzdHJpY3QuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzaG9ydGFibGUgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHNob3J0T3V0KGZ1bmMpIHtcbiAgdmFyIGNvdW50ID0gMCxcbiAgICAgIGxhc3RDYWxsZWQgPSAwO1xuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RhbXAgPSBuYXRpdmVOb3coKSxcbiAgICAgICAgcmVtYWluaW5nID0gSE9UX1NQQU4gLSAoc3RhbXAgLSBsYXN0Q2FsbGVkKTtcblxuICAgIGxhc3RDYWxsZWQgPSBzdGFtcDtcbiAgICBpZiAocmVtYWluaW5nID4gMCkge1xuICAgICAgaWYgKCsrY291bnQgPj0gSE9UX0NPVU5UKSB7XG4gICAgICAgIHJldHVybiBhcmd1bWVudHNbMF07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdW50ID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3J0T3V0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fc2hvcnRPdXQuanNcbi8vIG1vZHVsZSBpZCA9IDE0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgTGlzdENhY2hlID0gcmVxdWlyZSgnLi9fTGlzdENhY2hlJyk7XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqL1xuZnVuY3Rpb24gc3RhY2tDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBMaXN0Q2FjaGU7XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhY2tDbGVhcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX3N0YWNrQ2xlYXIuanNcbi8vIG1vZHVsZSBpZCA9IDE0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0RlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgcmVzdWx0ID0gZGF0YVsnZGVsZXRlJ10oa2V5KTtcblxuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhY2tEZWxldGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19zdGFja0RlbGV0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogR2V0cyB0aGUgc3RhY2sgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrR2V0KGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5nZXQoa2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFja0dldDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX3N0YWNrR2V0LmpzXG4vLyBtb2R1bGUgaWQgPSAxNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDaGVja3MgaWYgYSBzdGFjayB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrSGFzKGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXMoa2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFja0hhcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvX3N0YWNrSGFzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIExpc3RDYWNoZSA9IHJlcXVpcmUoJy4vX0xpc3RDYWNoZScpLFxuICAgIE1hcCA9IHJlcXVpcmUoJy4vX01hcCcpLFxuICAgIE1hcENhY2hlID0gcmVxdWlyZSgnLi9fTWFwQ2FjaGUnKTtcblxuLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG52YXIgTEFSR0VfQVJSQVlfU0laRSA9IDIwMDtcblxuLyoqXG4gKiBTZXRzIHRoZSBzdGFjayBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBzdGFjayBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChkYXRhIGluc3RhbmNlb2YgTGlzdENhY2hlKSB7XG4gICAgdmFyIHBhaXJzID0gZGF0YS5fX2RhdGFfXztcbiAgICBpZiAoIU1hcCB8fCAocGFpcnMubGVuZ3RoIDwgTEFSR0VfQVJSQVlfU0laRSAtIDEpKSB7XG4gICAgICBwYWlycy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICB0aGlzLnNpemUgPSArK2RhdGEuc2l6ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBkYXRhID0gdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZShwYWlycyk7XG4gIH1cbiAgZGF0YS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHRoaXMuc2l6ZSA9IGRhdGEuc2l6ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhY2tTZXQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL19zdGFja1NldC5qc1xuLy8gbW9kdWxlIGlkID0gMTQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBtZW1vaXplQ2FwcGVkID0gcmVxdWlyZSgnLi9fbWVtb2l6ZUNhcHBlZCcpO1xuXG4vKiogVXNlZCB0byBtYXRjaCBwcm9wZXJ0eSBuYW1lcyB3aXRoaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVMZWFkaW5nRG90ID0gL15cXC4vLFxuICAgIHJlUHJvcE5hbWUgPSAvW14uW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXXwoPz0oPzpcXC58XFxbXFxdKSg/OlxcLnxcXFtcXF18JCkpL2c7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGJhY2tzbGFzaGVzIGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nO1xuXG4vKipcbiAqIENvbnZlcnRzIGBzdHJpbmdgIHRvIGEgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbnZhciBzdHJpbmdUb1BhdGggPSBtZW1vaXplQ2FwcGVkKGZ1bmN0aW9uKHN0cmluZykge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmIChyZUxlYWRpbmdEb3QudGVzdChzdHJpbmcpKSB7XG4gICAgcmVzdWx0LnB1c2goJycpO1xuICB9XG4gIHN0cmluZy5yZXBsYWNlKHJlUHJvcE5hbWUsIGZ1bmN0aW9uKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdHJpbmcpIHtcbiAgICByZXN1bHQucHVzaChxdW90ZSA/IHN0cmluZy5yZXBsYWNlKHJlRXNjYXBlQ2hhciwgJyQxJykgOiAobnVtYmVyIHx8IG1hdGNoKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RyaW5nVG9QYXRoO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fc3RyaW5nVG9QYXRoLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvU291cmNlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9fdG9Tb3VyY2UuanNcbi8vIG1vZHVsZSBpZCA9IDE1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYHZhbHVlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcmV0dXJuIGZyb20gdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNvbnN0YW50IGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0cyA9IF8udGltZXMoMiwgXy5jb25zdGFudCh7ICdhJzogMSB9KSk7XG4gKlxuICogY29uc29sZS5sb2cob2JqZWN0cyk7XG4gKiAvLyA9PiBbeyAnYSc6IDEgfSwgeyAnYSc6IDEgfV1cbiAqXG4gKiBjb25zb2xlLmxvZyhvYmplY3RzWzBdID09PSBvYmplY3RzWzFdKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gY29uc3RhbnQodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb25zdGFudDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvY29uc3RhbnQuanNcbi8vIG1vZHVsZSBpZCA9IDE1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYmFzZUZsYXR0ZW4gPSByZXF1aXJlKCcuL19iYXNlRmxhdHRlbicpO1xuXG4vKipcbiAqIEZsYXR0ZW5zIGBhcnJheWAgYSBzaW5nbGUgbGV2ZWwgZGVlcC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBmbGF0dGVuLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZmxhdHRlbmVkIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmZsYXR0ZW4oWzEsIFsyLCBbMywgWzRdXSwgNV1dKTtcbiAqIC8vID0+IFsxLCAyLCBbMywgWzRdXSwgNV1cbiAqL1xuZnVuY3Rpb24gZmxhdHRlbihhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG4gIHJldHVybiBsZW5ndGggPyBiYXNlRmxhdHRlbihhcnJheSwgMSkgOiBbXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmbGF0dGVuO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9mbGF0dGVuLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGJhc2VIYXNJbiA9IHJlcXVpcmUoJy4vX2Jhc2VIYXNJbicpLFxuICAgIGhhc1BhdGggPSByZXF1aXJlKCcuL19oYXNQYXRoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBwYXRoYCBpcyBhIGRpcmVjdCBvciBpbmhlcml0ZWQgcHJvcGVydHkgb2YgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHBhdGhgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0gXy5jcmVhdGUoeyAnYSc6IF8uY3JlYXRlKHsgJ2InOiAyIH0pIH0pO1xuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYS5iJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5oYXNJbihvYmplY3QsIFsnYScsICdiJ10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYicpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaGFzSW4ob2JqZWN0LCBwYXRoKSB7XG4gIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBoYXNQYXRoKG9iamVjdCwgcGF0aCwgYmFzZUhhc0luKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNJbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvaGFzSW4uanNcbi8vIG1vZHVsZSBpZCA9IDE1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmlzQXJyYXlMaWtlYCBleGNlcHQgdGhhdCBpdCBhbHNvIGNoZWNrcyBpZiBgdmFsdWVgXG4gKiBpcyBhbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXlMaWtlT2JqZWN0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9pc0FycmF5TGlrZU9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGdldFByb3RvdHlwZSA9IHJlcXVpcmUoJy4vX2dldFByb3RvdHlwZScpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGluZmVyIHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3Rvci4gKi9cbnZhciBvYmplY3RDdG9yU3RyaW5nID0gZnVuY1RvU3RyaW5nLmNhbGwoT2JqZWN0KTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjguMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChuZXcgRm9vKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdCh7ICd4JzogMCwgJ3knOiAwIH0pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0TGlrZSh2YWx1ZSkgfHwgYmFzZUdldFRhZyh2YWx1ZSkgIT0gb2JqZWN0VGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwcm90byA9IGdldFByb3RvdHlwZSh2YWx1ZSk7XG4gIGlmIChwcm90byA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBDdG9yID0gaGFzT3duUHJvcGVydHkuY2FsbChwcm90bywgJ2NvbnN0cnVjdG9yJykgJiYgcHJvdG8uY29uc3RydWN0b3I7XG4gIHJldHVybiB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IgaW5zdGFuY2VvZiBDdG9yICYmXG4gICAgZnVuY1RvU3RyaW5nLmNhbGwoQ3RvcikgPT0gb2JqZWN0Q3RvclN0cmluZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1BsYWluT2JqZWN0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9pc1BsYWluT2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIE1hcENhY2hlID0gcmVxdWlyZSgnLi9fTWFwQ2FjaGUnKTtcblxuLyoqIEVycm9yIG1lc3NhZ2UgY29uc3RhbnRzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBtZW1vaXplcyB0aGUgcmVzdWx0IG9mIGBmdW5jYC4gSWYgYHJlc29sdmVyYCBpc1xuICogcHJvdmlkZWQsIGl0IGRldGVybWluZXMgdGhlIGNhY2hlIGtleSBmb3Igc3RvcmluZyB0aGUgcmVzdWx0IGJhc2VkIG9uIHRoZVxuICogYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbi4gQnkgZGVmYXVsdCwgdGhlIGZpcnN0IGFyZ3VtZW50XG4gKiBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24gaXMgdXNlZCBhcyB0aGUgbWFwIGNhY2hlIGtleS4gVGhlIGBmdW5jYFxuICogaXMgaW52b2tlZCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKlxuICogKipOb3RlOioqIFRoZSBjYWNoZSBpcyBleHBvc2VkIGFzIHRoZSBgY2FjaGVgIHByb3BlcnR5IG9uIHRoZSBtZW1vaXplZFxuICogZnVuY3Rpb24uIEl0cyBjcmVhdGlvbiBtYXkgYmUgY3VzdG9taXplZCBieSByZXBsYWNpbmcgdGhlIGBfLm1lbW9pemUuQ2FjaGVgXG4gKiBjb25zdHJ1Y3RvciB3aXRoIG9uZSB3aG9zZSBpbnN0YW5jZXMgaW1wbGVtZW50IHRoZVxuICogW2BNYXBgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wcm9wZXJ0aWVzLW9mLXRoZS1tYXAtcHJvdG90eXBlLW9iamVjdClcbiAqIG1ldGhvZCBpbnRlcmZhY2Ugb2YgYGNsZWFyYCwgYGRlbGV0ZWAsIGBnZXRgLCBgaGFzYCwgYW5kIGBzZXRgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaGF2ZSBpdHMgb3V0cHV0IG1lbW9pemVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3Jlc29sdmVyXSBUaGUgZnVuY3Rpb24gdG8gcmVzb2x2ZSB0aGUgY2FjaGUga2V5LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSwgJ2InOiAyIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdjJzogMywgJ2QnOiA0IH07XG4gKlxuICogdmFyIHZhbHVlcyA9IF8ubWVtb2l6ZShfLnZhbHVlcyk7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIHZhbHVlcyhvdGhlcik7XG4gKiAvLyA9PiBbMywgNF1cbiAqXG4gKiBvYmplY3QuYSA9IDI7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIC8vIE1vZGlmeSB0aGUgcmVzdWx0IGNhY2hlLlxuICogdmFsdWVzLmNhY2hlLnNldChvYmplY3QsIFsnYScsICdiJ10pO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddXG4gKlxuICogLy8gUmVwbGFjZSBgXy5tZW1vaXplLkNhY2hlYC5cbiAqIF8ubWVtb2l6ZS5DYWNoZSA9IFdlYWtNYXA7XG4gKi9cbmZ1bmN0aW9uIG1lbW9pemUoZnVuYywgcmVzb2x2ZXIpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicgfHwgKHJlc29sdmVyICE9IG51bGwgJiYgdHlwZW9mIHJlc29sdmVyICE9ICdmdW5jdGlvbicpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHZhciBtZW1vaXplZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBrZXkgPSByZXNvbHZlciA/IHJlc29sdmVyLmFwcGx5KHRoaXMsIGFyZ3MpIDogYXJnc1swXSxcbiAgICAgICAgY2FjaGUgPSBtZW1vaXplZC5jYWNoZTtcblxuICAgIGlmIChjYWNoZS5oYXMoa2V5KSkge1xuICAgICAgcmV0dXJuIGNhY2hlLmdldChrZXkpO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICBtZW1vaXplZC5jYWNoZSA9IGNhY2hlLnNldChrZXksIHJlc3VsdCkgfHwgY2FjaGU7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgbWVtb2l6ZWQuY2FjaGUgPSBuZXcgKG1lbW9pemUuQ2FjaGUgfHwgTWFwQ2FjaGUpO1xuICByZXR1cm4gbWVtb2l6ZWQ7XG59XG5cbi8vIEV4cG9zZSBgTWFwQ2FjaGVgLlxubWVtb2l6ZS5DYWNoZSA9IE1hcENhY2hlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1lbW9pemU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL21lbW9pemUuanNcbi8vIG1vZHVsZSBpZCA9IDE1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYmFzZVBpY2sgPSByZXF1aXJlKCcuL19iYXNlUGljaycpLFxuICAgIGZsYXRSZXN0ID0gcmVxdWlyZSgnLi9fZmxhdFJlc3QnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIG9iamVjdCBjb21wb3NlZCBvZiB0aGUgcGlja2VkIGBvYmplY3RgIHByb3BlcnRpZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uKHN0cmluZ3xzdHJpbmdbXSl9IFtwYXRoc10gVGhlIHByb3BlcnR5IHBhdGhzIHRvIHBpY2suXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogJzInLCAnYyc6IDMgfTtcbiAqXG4gKiBfLnBpY2sob2JqZWN0LCBbJ2EnLCAnYyddKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYyc6IDMgfVxuICovXG52YXIgcGljayA9IGZsYXRSZXN0KGZ1bmN0aW9uKG9iamVjdCwgcGF0aHMpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8ge30gOiBiYXNlUGljayhvYmplY3QsIHBhdGhzKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBpY2s7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoL3BpY2suanNcbi8vIG1vZHVsZSBpZCA9IDE1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYGZhbHNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5zdHViRmFsc2UpO1xuICogLy8gPT4gW2ZhbHNlLCBmYWxzZV1cbiAqL1xuZnVuY3Rpb24gc3R1YkZhbHNlKCkge1xuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R1YkZhbHNlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC9zdHViRmFsc2UuanNcbi8vIG1vZHVsZSBpZCA9IDE1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgY29weU9iamVjdCA9IHJlcXVpcmUoJy4vX2NvcHlPYmplY3QnKSxcbiAgICBrZXlzSW4gPSByZXF1aXJlKCcuL2tleXNJbicpO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBwbGFpbiBvYmplY3QgZmxhdHRlbmluZyBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmdcbiAqIGtleWVkIHByb3BlcnRpZXMgb2YgYHZhbHVlYCB0byBvd24gcHJvcGVydGllcyBvZiB0aGUgcGxhaW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY29udmVydGVkIHBsYWluIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgbmV3IEZvbyk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyIH1cbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBfLnRvUGxhaW5PYmplY3QobmV3IEZvbykpO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiwgJ2MnOiAzIH1cbiAqL1xuZnVuY3Rpb24gdG9QbGFpbk9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gY29weU9iamVjdCh2YWx1ZSwga2V5c0luKHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9QbGFpbk9iamVjdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gvdG9QbGFpbk9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBiYXNlVG9TdHJpbmcgPSByZXF1aXJlKCcuL19iYXNlVG9TdHJpbmcnKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIGBudWxsYFxuICogYW5kIGB1bmRlZmluZWRgIHZhbHVlcy4gVGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvU3RyaW5nKG51bGwpO1xuICogLy8gPT4gJydcbiAqXG4gKiBfLnRvU3RyaW5nKC0wKTtcbiAqIC8vID0+ICctMCdcbiAqXG4gKiBfLnRvU3RyaW5nKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAnMSwyLDMnXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiBiYXNlVG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvU3RyaW5nO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC90b1N0cmluZy5qc1xuLy8gbW9kdWxlIGlkID0gMTYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNjJfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImdldC1waXhlbHNcIlxuLy8gbW9kdWxlIGlkID0gMTYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNjNfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm5kYXJyYXlcIlxuLy8gbW9kdWxlIGlkID0gMTYzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNjRfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm5kYXJyYXktbGluZWFyLWludGVycG9sYXRlXCJcbi8vIG1vZHVsZSBpZCA9IDE2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9