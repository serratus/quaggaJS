var Quagga =

(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory(factory.toString()).default;
    } else if (typeof exports === 'object') {
        exports["Quagga"] = factory(factory.toString()).default;
    } else {
        root["Quagga"] = factory(factory.toString()).default;
    }
})(this, function(__factorySource__) {
    return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/quagga.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!***********************************************************************************!*\
  !*** /Users/adomratchev/node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!***************************************************************************************!*\
  !*** /Users/adomratchev/node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!**********************************************************************************!*\
  !*** /Users/adomratchev/node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!********************************************************************************!*\
  !*** /Users/adomratchev/node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/createClass.js":
/*!*****************************************************************************!*\
  !*** /Users/adomratchev/node_modules/@babel/runtime/helpers/createClass.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/defineProperty.js":
/*!********************************************************************************!*\
  !*** /Users/adomratchev/node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/get.js":
/*!*********************************************************************!*\
  !*** /Users/adomratchev/node_modules/@babel/runtime/helpers/get.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");

var superPropBase = __webpack_require__(/*! ./superPropBase */ "../../node_modules/@babel/runtime/helpers/superPropBase.js");

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!********************************************************************************!*\
  !*** /Users/adomratchev/node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/inherits.js":
/*!**************************************************************************!*\
  !*** /Users/adomratchev/node_modules/@babel/runtime/helpers/inherits.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "../../node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!*********************************************************************************!*\
  !*** /Users/adomratchev/node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!***********************************************************************************!*\
  !*** /Users/adomratchev/node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!*******************************************************************************************!*\
  !*** /Users/adomratchev/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "../../node_modules/@babel/runtime/helpers/typeof.js");

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ "../../node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!********************************************************************************!*\
  !*** /Users/adomratchev/node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/superPropBase.js":
/*!*******************************************************************************!*\
  !*** /Users/adomratchev/node_modules/@babel/runtime/helpers/superPropBase.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!***********************************************************************************!*\
  !*** /Users/adomratchev/node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles */ "../../node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");

var iterableToArray = __webpack_require__(/*! ./iterableToArray */ "../../node_modules/@babel/runtime/helpers/iterableToArray.js");

var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread */ "../../node_modules/@babel/runtime/helpers/nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/typeof.js":
/*!************************************************************************!*\
  !*** /Users/adomratchev/node_modules/@babel/runtime/helpers/typeof.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "../../node_modules/@babel/runtime/regenerator/index.js":
/*!***************************************************************************!*\
  !*** /Users/adomratchev/node_modules/@babel/runtime/regenerator/index.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "../../node_modules/regenerator-runtime/runtime-module.js");


/***/ }),

/***/ "../../node_modules/regenerator-runtime/runtime-module.js":
/*!*****************************************************************************!*\
  !*** /Users/adomratchev/node_modules/regenerator-runtime/runtime-module.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ "../../node_modules/regenerator-runtime/runtime.js");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ "../../node_modules/regenerator-runtime/runtime.js":
/*!**********************************************************************!*\
  !*** /Users/adomratchev/node_modules/regenerator-runtime/runtime.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/analytics/result-collector.ts":
/*!*******************************************!*\
  !*** ./src/analytics/result-collector.ts ***!
  \*******************************************/
/*! exports provided: ResultCollector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResultCollector", function() { return ResultCollector; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_image_debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/image-debug */ "./src/common/image-debug.ts");




var ResultCollector =
/*#__PURE__*/
function () {
  function ResultCollector(config) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ResultCollector);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_canvas", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_context", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_config", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_capacity", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_capture", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_results", void 0);

    this._results = new Array();
    this._config = config;
    this._capacity = config.capacity || 20;
    this._capture = config.capture === true;

    if (this._capture) {
      this._canvas = document.createElement('canvas');
      this._context = this._canvas.getContext('2d');
    }
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ResultCollector, [{
    key: "addResult",
    value: function addResult(data, imageWidth, imageHeight, codeResult) {
      if (codeResult && this._capacity && !this._contains(codeResult) && this._passesFilter(codeResult)) {
        var result = {
          codeResult: codeResult
        };
        this._capacity--;

        if (this._capture) {
          this._canvas.width = imageWidth;
          this._canvas.height = imageHeight;
          _common_image_debug__WEBPACK_IMPORTED_MODULE_3__["ImageDebug"].drawImage(data, imageWidth, imageHeight, this._context);
          result.frame = this._canvas.toDataURL();
        }

        this._results.push(result);
      }
    }
  }, {
    key: "getResults",
    value: function getResults() {
      return this._results;
    }
  }, {
    key: "_contains",
    value: function _contains(codeResult) {
      return this._config.blacklist && this._config.blacklist.some(function (item) {
        return Object.keys(item).every(function (key) {
          return item[key] === codeResult[key];
        });
      });
    }
  }, {
    key: "_passesFilter",
    value: function _passesFilter(codeResult) {
      return typeof this._config.filter !== 'function' || this._config.filter(codeResult);
    }
  }]);

  return ResultCollector;
}();

/***/ }),

/***/ "./src/common/cluster.ts":
/*!*******************************!*\
  !*** ./src/common/cluster.ts ***!
  \*******************************/
/*! exports provided: Cluster */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cluster", function() { return Cluster; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);




/**
 * Creates a cluster for grouping similar orientations of moments
 */
var Cluster =
/*#__PURE__*/
function () {
  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Cluster, null, [{
    key: "clusterize",
    value: function clusterize(moments, threshold) {
      var clusters = new Array();
      moments.forEach(function (moment) {
        var matchingCluster = clusters.find(function (cluster) {
          return cluster.fits(moment);
        });

        if (matchingCluster) {
          matchingCluster.add(moment);
        } else {
          clusters.push(new Cluster(threshold, moment));
        }
      });
      return clusters;
    }
  }]);

  function Cluster(threshold, moment) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Cluster);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_threshold", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_moments", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_center", void 0);

    this._threshold = threshold;
    this._moments = new Array();
    this._center = {
      rad: 0,
      x: 0,
      y: 0
    };

    if (moment) {
      this.add(moment);
    }
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Cluster, [{
    key: "add",
    value: function add(point) {
      this._moments.push(point); // Update center


      this._center.rad = this._moments.reduce(function (sum, p) {
        return sum + p.rad;
      }, 0) / this._moments.length;
      this._center.x = Math.cos(this._center.rad);
      this._center.y = Math.sin(this._center.rad);
    }
  }, {
    key: "fits",
    value: function fits(moment) {
      // check cosine similarity to center-angle
      var similarity = Math.abs(moment.x * this._center.x + moment.y * this._center.y);
      return similarity > this._threshold;
    }
  }, {
    key: "moments",
    get: function get() {
      return this._moments;
    }
  }]);

  return Cluster;
}();

/***/ }),

/***/ "./src/common/events.ts":
/*!******************************!*\
  !*** ./src/common/events.ts ***!
  \******************************/
/*! exports provided: Events */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return Events; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);


var events = {};
var Events =
/*#__PURE__*/
function () {
  function Events() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Events);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Events, null, [{
    key: "subscribe",
    value: function subscribe(event, callback, async) {
      var subscription;

      if (typeof callback === 'function') {
        subscription = {
          callback: callback,
          async: async
        };
      } else {
        subscription = callback;

        if (!subscription.callback) {
          throw 'Callback was not specified on options';
        }
      }

      getEvent(event).subscriptions.push(subscription);
    }
  }, {
    key: "publish",
    value: function publish(type, data) {
      var eventItem = getEvent(type);
      var subscriptions = eventItem.subscriptions; // Publish one-time subscriptions

      subscriptions.filter(function (_ref) {
        var once = _ref.once;
        return !!once;
      }).forEach(function (subscription) {
        return publishSubscription(subscription, data);
      }); // remove them from the subscription

      eventItem.subscriptions = subscriptions.filter(function (_ref2) {
        var once = _ref2.once;
        return !once;
      }); // publish the rest

      eventItem.subscriptions.forEach(function (subscription) {
        return publishSubscription(subscription, data);
      });
    }
  }, {
    key: "once",
    value: function once(event, callback, async) {
      Events.subscribe(event, {
        callback: callback,
        async: async,
        once: true
      });
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(eventName, callback) {
      if (eventName) {
        var event = getEvent(eventName);

        if (event && callback) {
          event.subscriptions = event.subscriptions.filter(function (subscription) {
            return subscription.callback !== callback;
          });
        } else {
          event.subscriptions = [];
        }
      } else {
        events = {};
      }
    }
  }]);

  return Events;
}();

function getEvent(eventName) {
  if (!events[eventName]) {
    events[eventName] = {
      subscriptions: []
    };
  }

  return events[eventName];
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

/***/ }),

/***/ "./src/common/hsv2rgb.ts":
/*!*******************************!*\
  !*** ./src/common/hsv2rgb.ts ***!
  \*******************************/
/*! exports provided: hsv2rgb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hsv2rgb", function() { return hsv2rgb; });
function hsv2rgb(hsv, rgb) {
  var h = hsv[0];
  var s = hsv[1];
  var v = hsv[2];
  var c = v * s;
  var x = c * (1 - Math.abs(h / 60 % 2 - 1));
  var m = v - c;
  var r = 0;
  var g = 0;
  var b = 0;

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

  rgb = rgb || [0, 0, 0];
  rgb[0] = (r + m) * 255 | 0;
  rgb[1] = (g + m) * 255 | 0;
  rgb[2] = (b + m) * 255 | 0;
  return rgb;
}

/***/ }),

/***/ "./src/common/image-debug.ts":
/*!***********************************!*\
  !*** ./src/common/image-debug.ts ***!
  \***********************************/
/*! exports provided: ImageDebug */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageDebug", function() { return ImageDebug; });
var ImageDebug = {
  drawPath: function drawPath(path, context, color, lineWidth) {
    if (path && path.length > 1) {
      context.strokeStyle = color;
      context.fillStyle = color;
      context.lineWidth = lineWidth;
      context.beginPath();
      context.moveTo(path[0].x, path[0].y);
      path.slice(1).forEach(function (_ref) {
        var x = _ref.x,
            y = _ref.y;
        return context.lineTo(x, y);
      });
      context.closePath();
      context.stroke();
    }
  },
  drawImage: function drawImage(imageData, width, height, context) {
    var canvasData = context.getImageData(0, 0, width, height);
    var data = canvasData.data;
    var imageIndex = imageData.length | 0;
    var canvasIndex = data.length | 0;

    if (canvasIndex / imageIndex !== 4) {
      return false;
    }

    while (imageIndex--) {
      var value = imageData[imageIndex];
      data[--canvasIndex] = 255;
      data[--canvasIndex] = value;
      data[--canvasIndex] = value;
      data[--canvasIndex] = value;
    }

    context.putImageData(canvasData, 0, 0);
    return true;
  }
};

/***/ }),

/***/ "./src/common/image-wrapper.ts":
/*!*************************************!*\
  !*** ./src/common/image-wrapper.ts ***!
  \*************************************/
/*! exports provided: ImageWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageWrapper", function() { return ImageWrapper; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hsv2rgb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hsv2rgb */ "./src/common/hsv2rgb.ts");





/**
 * Represents a basic image combining the data and size.
 * In addition, some methods for manipulation are contained.
 */
var ImageWrapper =
/*#__PURE__*/
function () {
  /**
   * @param size The size of the image in pixel
   * @param data If given, a flat array containing the pixel data
   * @param arrayType If given, the desired DataType of the Array (may be typed/non-typed)
   * @param initialize Indicating if the array should be initialized on creation.
   */
  function ImageWrapper(size, data, arrayType, initialize) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ImageWrapper);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "data", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "size", void 0);

    if (!data) {
      this.data = new (arrayType || Uint8Array)(size.x * size.y);

      if (initialize) {
        this.data.fill(0);
      }
    } else {
      this.data = data;
    }

    this.size = size;
  }
  /**
   * Tests if a position is within the image with a given offset
   * @param point The location to test
   * @param border The padding value in pixels
   * @returns true if location inside the image's border, false otherwise
   * @see cvd/image.h
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ImageWrapper, [{
    key: "inImageWithBorder",
    value: function inImageWithBorder(point, border) {
      return point.x >= border && point.y >= border && point.x < this.size.x - border && point.y < this.size.y - border;
    }
    /**
     * Creates an {ImageWrapper) and copies the needed underlying image-data area
     * @param imageWrapper The target {ImageWrapper} where the data should be copied
     * @param fromX The horizontal position where to copy from
     * @param fromY The vertical position where to copy from
    */

  }, {
    key: "subImageAsCopy",
    value: function subImageAsCopy(imageWrapper, fromX, fromY) {
      var sizeY = imageWrapper.size.y;
      var sizeX = imageWrapper.size.x;

      for (var x = 0; x < sizeX; x++) {
        for (var y = 0; y < sizeY; y++) {
          imageWrapper.data[y * sizeX + x] = this.data[(fromY + y) * this.size.x + fromX + x];
        }
      }
    }
    /**
     * Retrieves a given pixel position from the image
     * @param x The x-position
     * @param y The y-position
     * @returns The grayscale value at the pixel-position
     */

  }, {
    key: "get",
    value: function get(x, y) {
      return this.data[y * this.size.x + x];
    }
    /**
     * Sets a given pixel position in the image
     * @param x The x-position
     * @param y The y-position
     * @param value The grayscale value to set
     * @returns The Image itself (for possible chaining)
     */

  }, {
    key: "set",
    value: function set(x, y, value) {
      this.data[y * this.size.x + x] = value;
      return this;
    }
    /**
     * Sets the border of the image (1 pixel) to zero
     */

  }, {
    key: "zeroBorder",
    value: function zeroBorder() {
      var width = this.size.x;
      var height = this.size.y;
      var data = this.data;

      for (var i = 0; i < width; i++) {
        data[i] = data[(height - 1) * width + i] = 0;
      }

      for (var _i = 1; _i < height - 1; _i++) {
        data[_i * width] = data[_i * width + (width - 1)] = 0;
      }
    }
    /**
     * Inverts a binary image in place
     */

  }, {
    key: "invert",
    value: function invert() {
      var data = this.data;

      for (var i = data.length; i--;) {
        data[i] = data[i] ? 0 : 1;
      }
    }
  }, {
    key: "moments",
    value: function moments(labelCount) {
      var height = this.size.y;
      var width = this.size.x;
      var labelSum = new Array();
      var result = new Array();

      if (labelCount <= 0) {
        return result;
      }

      for (var i = 0; i < labelCount; i++) {
        labelSum[i] = {
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

      for (var y = 0; y < height; y++) {
        var ysq = y * y;

        for (var x = 0; x < width; x++) {
          var val = this.data[y * width + x];

          if (val > 0) {
            var label = labelSum[val - 1];
            label.m00 += 1;
            label.m01 += y;
            label.m10 += x;
            label.m11 += x * y;
            label.m02 += ysq;
            label.m20 += x * x;
          }
        }
      }

      var PI = Math.PI;
      var PI_4 = PI / 4;

      for (var _i2 = 0; _i2 < labelCount; _i2++) {
        var _label = labelSum[_i2];

        if (!isNaN(_label.m00) && _label.m00 !== 0) {
          var x_ = _label.m10 / _label.m00;
          var y_ = _label.m01 / _label.m00;
          var mu11 = _label.m11 / _label.m00 - x_ * y_;
          var mu02 = _label.m02 / _label.m00 - y_ * y_;
          var mu20 = _label.m20 / _label.m00 - x_ * x_;
          var tmp = 0.5 * Math.atan((mu02 - mu20) / (2 * mu11)) + (mu11 >= 0 ? PI_4 : -PI_4) + PI;
          _label.theta = (tmp * 180 / PI + 90) % 180 - 90;

          if (_label.theta < 0) {
            _label.theta += 180;
          }

          _label.rad = tmp > PI ? tmp - PI : tmp;
          _label.x = Math.cos(tmp);
          _label.y = Math.sin(tmp);
          result.push(_label);
        }
      }

      return result;
    }
    /**
     * Displays the {ImageWrapper} in a given canvas
     * @param context The rendering context to write to
     * @param scale Scale which is applied to each pixel-value
     */

  }, {
    key: "show",
    value: function show(context, scale) {
      var height = this.size.y;
      var width = this.size.x; // const context = canvas.getContext('2d');
      // canvas.height = height;
      // canvas.width = width;

      var frame = context.getImageData(0, 0, width, height);
      var data = frame.data;
      var current = 0;

      if (!scale) {
        scale = 1.0;
      }

      for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          var pixel = y * width + x;
          current = this.get(x, y) * scale;
          data[pixel * 4 + 0] = current;
          data[pixel * 4 + 1] = current;
          data[pixel * 4 + 2] = current;
          data[pixel * 4 + 3] = 255;
        }
      } //frame.data = data;


      context.putImageData(frame, 0, 0);
    }
    /**
     * Displays the part of the image in a given canvas
     * @param context The rendering context to write to
     * @param scale Scale which is applied to each pixel-value
     * @param fromX The horizontal position where to overlay from
     * @param fromY The vertical position where to overlay from
     */

  }, {
    key: "overlay",
    value: function overlay(context, scale, fromX, fromY) {
      var hsv = [0, 1, 1];
      var whiteRgb = [255, 255, 255];
      var blackRgb = [0, 0, 0];
      var frame = context.getImageData(fromX, fromY, this.size.x, this.size.y);
      var data = frame.data;

      if (!scale || scale < 0 || scale > 360) {
        scale = 360;
      }

      for (var length = this.data.length; length--;) {
        hsv[0] = this.data[length] * scale;
        var rgb = hsv[0] <= 0 ? whiteRgb : hsv[0] >= 360 ? blackRgb : Object(_hsv2rgb__WEBPACK_IMPORTED_MODULE_3__["hsv2rgb"])(hsv);
        data[length * 4 + 0] = rgb[0];
        data[length * 4 + 1] = rgb[1];
        data[length * 4 + 2] = rgb[2];
        data[length * 4 + 3] = 255;
      }

      context.putImageData(frame, fromX, fromY);
    }
  }]);

  return ImageWrapper;
}();

/***/ }),

/***/ "./src/common/media-devices.ts":
/*!*************************************!*\
  !*** ./src/common/media-devices.ts ***!
  \*************************************/
/*! exports provided: enumerateDevices, getUserMedia */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enumerateDevices", function() { return enumerateDevices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserMedia", function() { return getUserMedia; });
function enumerateDevices() {
  if (navigator.mediaDevices && typeof navigator.mediaDevices.enumerateDevices === 'function') {
    return navigator.mediaDevices.enumerateDevices();
  }

  return Promise.reject(new Error('enumerateDevices is not defined'));
}
function getUserMedia(constraints) {
  if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
    return navigator.mediaDevices.getUserMedia(constraints);
  }

  return Promise.reject(new Error('getUserMedia is not defined'));
}

/***/ }),

/***/ "./src/common/merge.ts":
/*!*****************************!*\
  !*** ./src/common/merge.ts ***!
  \*****************************/
/*! exports provided: merge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return merge; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "../../node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Performs a deep merge of objects and returns new object.
 * Does not modify objects (immutable).
 * @see https://stackoverflow.com/a/48218209
 *
 * @param objects - Objects to merge
 * @returns New object with merged key/values
 */
function merge() {
  var isObject = function isObject(obj) {
    return obj && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(obj) === 'object';
  };

  for (var _len = arguments.length, objects = new Array(_len), _key = 0; _key < _len; _key++) {
    objects[_key] = arguments[_key];
  }

  return objects.reduce(function (prev, obj) {
    if (obj) {
      Object.keys(obj).forEach(function (key) {
        var pVal = prev[key];
        var oVal = obj[key];

        if (Array.isArray(pVal) && Array.isArray(oVal)) {
          // prev[key] = pVal.concat(...oVal);
          prev[key] = oVal;
        } else if (isObject(pVal) && isObject(oVal)) {
          prev[key] = merge(pVal, oVal);
        } else {
          prev[key] = oVal;
        }
      });
    }

    return prev;
  }, {});
}

/***/ }),

/***/ "./src/config/config.dev.ts":
/*!**********************************!*\
  !*** ./src/config/config.dev.ts ***!
  \**********************************/
/*! exports provided: config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
var config = {
  inputStream: {
    name: 'Live',
    type: 'LiveStream',
    constraints: {
      width: 640,
      height: 480,
      // aspectRatio: 640/480, // optional
      facingMode: 'environment' // or user
      // deviceId: '38745983457387598375983759834'

    },
    area: {
      top: '0%',
      right: '0%',
      left: '0%',
      bottom: '0%'
    },
    singleChannel: false // true: only the red color-channel is read

  },
  locate: true,
  numOfWorkers: 0,
  decoder: {
    readers: ['code_128_reader'],
    debug: {
      drawBoundingBox: false,
      showFrequency: false,
      drawScanline: false,
      showPattern: false
    }
  },
  locator: {
    halfSample: true,
    patchSize: 'medium',
    // x-small, small, medium, large, x-large
    debug: {
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
  }
};

/***/ }),

/***/ "./src/decoder/barcode-decoder.ts":
/*!****************************************!*\
  !*** ./src/decoder/barcode-decoder.ts ***!
  \****************************************/
/*! exports provided: BarcodeDecoder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarcodeDecoder", function() { return BarcodeDecoder; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../../node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "../../node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _reader_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../reader/index */ "./src/reader/index.ts");
/* harmony import */ var _bresenham__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./bresenham */ "./src/decoder/bresenham.ts");
/* harmony import */ var _common_image_debug__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/image-debug */ "./src/common/image-debug.ts");








;
var BarcodeDecoder =
/*#__PURE__*/
function () {
  function BarcodeDecoder(config, inputImageWrapper) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, BarcodeDecoder);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "_config", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "_inputImageWrapper", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "_frequencyCanvas", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "_patternCanvas", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "_overlayContext", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "_barcodeReaders", void 0);

    this._config = config;
    this._inputImageWrapper = inputImageWrapper;
    this._barcodeReaders = [];

    if ( true && this._config.debug && typeof document !== 'undefined') {
      var debugDiv = document.querySelector('#debug.detection');
      this._frequencyCanvas = document.querySelector('canvas.frequency');

      if (!this._frequencyCanvas) {
        this._frequencyCanvas = document.createElement('canvas');
        this._frequencyCanvas.className = 'frequency';

        if (debugDiv) {
          debugDiv.appendChild(this._frequencyCanvas);
        }
      }

      this._frequencyCanvas.style.display = this._config.debug.showFrequency ? 'block' : 'none';
      this._patternCanvas = document.querySelector('canvas.patternBuffer');

      if (!this._patternCanvas) {
        this._patternCanvas = document.createElement('canvas');
        this._patternCanvas.className = 'patternBuffer';

        if (debugDiv) {
          debugDiv.appendChild(this._patternCanvas);
        }
      }

      this._patternCanvas.style.display = this._config.debug.showPattern ? 'block' : 'none';
      var overlayCanvas = document.querySelector('canvas.drawingBuffer');
      this._overlayContext = overlayCanvas ? overlayCanvas.getContext('2d') : null;
    }

    this._initReaders();
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(BarcodeDecoder, [{
    key: "decodeFromBoundingBoxes",
    value: function decodeFromBoundingBoxes(boxes) {
      var _this = this;

      var barcode = null;

      if (boxes) {
        if (this._config.multiple) {
          var barcodes = boxes.map(function (box) {
            return _this.decodeFromBoundingBox(box);
          });
          return {
            barcodes: barcodes,
            boxes: boxes
          };
        }

        if (boxes.some(function (box) {
          return !!(barcode = _this.decodeFromBoundingBox(box));
        })) {
          barcode.boxes = boxes;
        }
      }

      return barcode;
    }
    /**
     * With the help of the configured readers this function tries to detect
     * a valid barcode pattern within the given area.
     * @param box The area to search in
     * @returns The result {codeResult, line, angle, pattern, threshold}
     */

  }, {
    key: "decodeFromBoundingBox",
    value: function decodeFromBoundingBox(box) {
      var debug =  true && this._overlayContext && this._config.debug;

      if (debug && debug.drawBoundingBox) {
        this._drawPath(box, 'blue', 2);
      }

      var line = this._getLine(box);

      if (line === null) {
        return null;
      }

      var angle = Math.atan2(line[1].y - line[0].y, line[1].x - line[0].x);
      line = this._getExtendedLine(line, angle);

      var result = this._tryDecode(line);

      if (result === null) {
        result = this._tryDecodeBruteForce(box, line, angle);
      }

      if (result === null) {
        return null;
      }

      if (debug && debug.drawScanline) {
        this._drawPath(line, 'red', 3);
      }

      return {
        angle: angle,
        box: box,
        codeResult: result.codeResult,
        line: line,
        pattern: result.barcodeLine.line,
        threshold: result.barcodeLine.threshold
      };
    }
  }, {
    key: "setReaders",
    value: function setReaders(readers) {
      this._config.readers = readers;
      this._barcodeReaders.length = 0;

      this._initReaders();
    }
  }, {
    key: "_initReaders",
    value: function _initReaders() {
      var _this2 = this;

      this._config.readers.forEach(function (readerConfig) {
        var reader;
        var configuration = {};
        var supplements = [];

        if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(readerConfig) === 'object') {
          reader = readerConfig.format;
          configuration = readerConfig.config || {};
        } else if (typeof readerConfig === 'string') {
          reader = readerConfig;
        }

        if (true) {
          console.log('Before registering reader:', reader);
        }

        if (configuration.supplements) {
          supplements = configuration.supplements.map(function (supplement) {
            return new _reader_index__WEBPACK_IMPORTED_MODULE_5__["Readers"][supplement]();
          });
        }

        _this2._barcodeReaders.push(new _reader_index__WEBPACK_IMPORTED_MODULE_5__["Readers"][reader](configuration, supplements));
      });

      if (true) {
        var _console;

        (_console = console).log.apply(_console, ['Registered Readers:'].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(this._barcodeReaders.map(function (_ref) {
          var config = _ref.config,
              FORMAT = _ref.FORMAT;
          return JSON.stringify({
            config: config,
            FORMAT: FORMAT
          });
        }))));
      }
    }
    /**
     * extend the line on both ends
     * @param line
     * @param angle
     */

  }, {
    key: "_getExtendedLine",
    value: function _getExtendedLine(line, angle) {
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

      var lineLength = Math.sqrt(Math.pow(line[1].y - line[0].y, 2) + Math.pow(line[1].x - line[0].x, 2));
      var extensionLength = lineLength * 0.1 | 0;
      extendLine(extensionLength); // check if inside image

      while (extensionLength > 1 && (!this._inputImageWrapper.inImageWithBorder(line[0], 0) || !this._inputImageWrapper.inImageWithBorder(line[1], 0))) {
        extensionLength >>= 1;
        extendLine(-extensionLength);
      }

      return line;
    }
  }, {
    key: "_getLine",
    value: function _getLine(box) {
      return [{
        x: (box[1].x + box[0].x) / 2,
        y: (box[1].y + box[0].y) / 2
      }, {
        x: (box[3].x + box[2].x) / 2,
        y: (box[3].y + box[2].y) / 2
      }];
    }
  }, {
    key: "_tryDecode",
    value: function _tryDecode(line) {
      var debug =  true && this._config.debug;

      if (debug && this._overlayContext) {
        this._drawPath(line, 'red', 3);
      }

      var barcodeLine = _bresenham__WEBPACK_IMPORTED_MODULE_6__["Bresenham"].getBarcodeLine(this._inputImageWrapper, line[0], line[1]);

      if (debug && debug.showFrequency) {
        this._printFrequency(barcodeLine.line);
      }

      barcodeLine = _bresenham__WEBPACK_IMPORTED_MODULE_6__["Bresenham"].toBinaryLine(barcodeLine);

      if (debug && debug.showPattern) {
        this._printPattern(barcodeLine.line);
      }

      var codeResult = null;

      this._barcodeReaders.some(function (reader) {
        return !!(codeResult = reader.decodePattern(barcodeLine.line));
      });

      return codeResult ? {
        codeResult: codeResult,
        barcodeLine: barcodeLine
      } : null;
    }
    /**
     * This method slices the given area apart and tries to detect a barcode-pattern for each slice.
     * It returns the decoded barcode, or null if nothing was found
     * @param box
     * @param line
     * @param lineAngle
     */

  }, {
    key: "_tryDecodeBruteForce",
    value: function _tryDecodeBruteForce(box, line, lineAngle) {
      var sideLength = Math.sqrt(Math.pow(box[1].x - box[0].x, 2) + Math.pow(box[1].y - box[0].y, 2));
      var slices = 16;
      var xdir = Math.sin(lineAngle);
      var ydir = Math.cos(lineAngle);

      for (var i = 1; i < slices; i++) {
        // move line perpendicular to angle
        var dir = sideLength / slices * i * (i % 2 === 0 ? -1 : 1);
        line[0].y += dir * xdir;
        line[0].x -= dir * ydir;
        line[1].y += dir * xdir;
        line[1].x -= dir * ydir;

        var result = this._tryDecode(line);

        if (result) {
          return result;
        }
      }

      return null;
    }
    /**
     * Used for development only
     */

  }, {
    key: "_printFrequency",
    value: function _printFrequency(line) {
      var context = this._frequencyCanvas.getContext('2d');

      this._frequencyCanvas.width = line.length;
      this._frequencyCanvas.height = 256;
      context.beginPath();
      context.strokeStyle = 'blue';

      for (var i = 0; i < line.length; i++) {
        context.moveTo(i, 255);
        context.lineTo(i, 255 - line[i]);
      }

      context.closePath();
      context.stroke();
    }
    /**
     * Used for development only
     */

  }, {
    key: "_printPattern",
    value: function _printPattern(line) {
      var context = this._patternCanvas.getContext('2d');

      this._patternCanvas.width = line.length;
      context.fillStyle = 'black';

      for (var i = 0; i < line.length; i++) {
        if (line[i] === 1) {
          context.fillRect(i, 0, 1, 100);
        }
      }
    }
  }, {
    key: "_drawPath",
    value: function _drawPath(path, color, lineWidth) {
      _common_image_debug__WEBPACK_IMPORTED_MODULE_7__["ImageDebug"].drawPath(path, this._overlayContext, color, lineWidth);
    }
  }]);

  return BarcodeDecoder;
}();

/***/ }),

/***/ "./src/decoder/bresenham.ts":
/*!**********************************!*\
  !*** ./src/decoder/bresenham.ts ***!
  \**********************************/
/*! exports provided: Bresenham */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bresenham", function() { return Bresenham; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Slope;

(function (Slope) {
  Slope[Slope["Up"] = 1] = "Up";
  Slope[Slope["Down"] = -1] = "Down";
})(Slope || (Slope = {}));

;
var Bresenham = {
  /**
   * Scans a line of the given image from point p1 to p2 and returns a result object containing
   * gray-scale values (0-255) of the underlying pixels in addition to the min and max values.
   * @param imageWrapper
   * @param p1 The start point {x,y}
   * @param p2 The end point {x,y}
   * @returns {line, min, max}
   */
  getBarcodeLine: function getBarcodeLine(imageWrapper, p1, p2) {
    var x0 = p1.x | 0;
    var y0 = p1.y | 0;
    var x1 = p2.x | 0;
    var y1 = p2.y | 0;
    var steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);
    var tmp;
    var line = [];
    var imageData = imageWrapper.data;
    var width = imageWrapper.size.x;
    var val;
    var min = 255;
    var max = 0;

    function read(a, b) {
      val = imageData[b * width + a];
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

    var deltax = x1 - x0;
    var deltay = Math.abs(y1 - y0);
    var error = deltax / 2 | 0;
    var y = y0;
    var ystep = y0 < y1 ? 1 : -1;

    for (var x = x0; x < x1; x++) {
      if (steep) {
        read(y, x);
      } else {
        read(x, y);
      }

      error = error - deltay;

      if (error < 0) {
        y += ystep;
        error = error + deltax;
      }
    }

    return {
      line: line,
      min: min,
      max: max
    };
  },

  /**
   * Converts the result from getBarcodeLine into a binary representation
   * also considering the frequency and slope of the signal for more robust results
   * @param result {line, min, max}
   */
  toBinaryLine: function toBinaryLine(result) {
    var min = result.min;
    var max = result.max;
    var line = result.line;
    var center = min + (max - min) / 2;
    var extrema = new Array();
    var threshold = (max - min) / 12;
    var rThreshold = -threshold; // 1. find extrema

    var currentDir = line[0] > center ? Slope.Up : Slope.Down;
    extrema.push({
      pos: 0,
      val: line[0]
    });

    for (var i = 0; i < line.length - 2; i++) {
      var slope = line[i + 1] - line[i];
      var slope2 = line[i + 2] - line[i + 1];
      var dir = void 0;

      if (slope + slope2 < rThreshold && line[i + 1] < center * 1.5) {
        dir = Slope.Down;
      } else if (slope + slope2 > threshold && line[i + 1] > center * 0.5) {
        dir = Slope.Up;
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

    for (var j = extrema[0].pos; j < extrema[1].pos; j++) {
      line[j] = line[j] > center ? 0 : 1;
    } // iterate over extrema and convert to binary based on avg between minmax


    for (var _i = 1; _i < extrema.length - 1; _i++) {
      if (extrema[_i + 1].val > extrema[_i].val) {
        threshold = extrema[_i].val + (extrema[_i + 1].val - extrema[_i].val) / 3 * 2 | 0;
      } else {
        threshold = extrema[_i + 1].val + (extrema[_i].val - extrema[_i + 1].val) / 3 | 0;
      }

      for (var _j = extrema[_i].pos; _j < extrema[_i + 1].pos; _j++) {
        line[_j] = line[_j] > threshold ? 0 : 1;
      }
    }

    return _objectSpread({}, result, {
      threshold: threshold
    });
  }
};

/***/ }),

/***/ "./src/input/camera-access.ts":
/*!************************************!*\
  !*** ./src/input/camera-access.ts ***!
  \************************************/
/*! exports provided: CameraAccess */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CameraAccess", function() { return CameraAccess; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../../node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_media_devices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/media-devices */ "./src/common/media-devices.ts");




var _stream;

var CameraAccess = {
  /**
   * Attempts to attach the camera-stream to a given video element
   * and calls the callback function when the content is ready
   * @param video
   * @param videoConstraints
   */
  request: function () {
    var _request = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(video, videoConstraints) {
      var normalizedConstraints;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              normalizedConstraints = CameraAccess.pickConstraints(videoConstraints);
              _context.next = 3;
              return Object(_common_media_devices__WEBPACK_IMPORTED_MODULE_2__["getUserMedia"])(normalizedConstraints);

            case 3:
              _stream = _context.sent;
              video.srcObject = _stream;
              video.setAttribute('autoplay', '');
              video.setAttribute('muted', '');
              video.setAttribute('playsinline', '');
              return _context.abrupt("return", new Promise(function (resolve) {
                return video.addEventListener('loadedmetadata', function () {
                  video.play();
                  resolve();
                });
              }).then(_waitForVideo.bind(null, video)));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function request(_x, _x2) {
      return _request.apply(this, arguments);
    }

    return request;
  }(),
  release: function release() {
    var tracks = _stream && _stream.getVideoTracks();

    if (tracks && tracks.length) {
      tracks[0].stop();
    }

    _stream = null;
  },
  enumerateVideoDevices: function () {
    var _enumerateVideoDevices = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      var devices;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Object(_common_media_devices__WEBPACK_IMPORTED_MODULE_2__["enumerateDevices"])();

            case 2:
              devices = _context2.sent;
              return _context2.abrupt("return", devices.filter(function (_ref) {
                var kind = _ref.kind;
                return kind === 'videoinput';
              }));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function enumerateVideoDevices() {
      return _enumerateVideoDevices.apply(this, arguments);
    }

    return enumerateVideoDevices;
  }(),
  getActiveStreamLabel: function getActiveStreamLabel() {
    var track = CameraAccess.getActiveTrack();
    return track ? track.label : '';
  },
  getActiveTrack: function getActiveTrack() {
    var tracks = _stream && _stream.getVideoTracks();

    if (tracks && tracks.length) {
      return tracks[0];
    }

    return null;
  },
  pickConstraints: function pickConstraints(videoConstraints) {
    var width = videoConstraints.width,
        height = videoConstraints.height,
        facingMode = videoConstraints.facingMode,
        aspectRatio = videoConstraints.aspectRatio,
        deviceId = videoConstraints.deviceId;
    var _ref2 = videoConstraints,
        minAspectRatio = _ref2.minAspectRatio,
        facing = _ref2.facing;

    if (typeof minAspectRatio !== 'undefined' && minAspectRatio > 0) {
      aspectRatio = minAspectRatio;
      console.log("WARNING: Constraint 'minAspectRatio' is deprecated; Use 'aspectRatio' instead");
    }

    if (typeof facing !== 'undefined') {
      facingMode = facing;
      console.log("WARNING: Constraint 'facing' is deprecated. Use 'facingMode' instead'");
    }

    var normalizedConstraints = deviceId && facingMode ? {
      width: width,
      height: height,
      aspectRatio: aspectRatio,
      deviceId: deviceId
    } : {
      width: width,
      height: height,
      facingMode: facingMode,
      aspectRatio: aspectRatio,
      deviceId: deviceId
    };
    return {
      audio: false,
      video: normalizedConstraints
    };
  }
};

function _waitForVideo(_ref3) {
  var videoWidth = _ref3.videoWidth,
      videoHeight = _ref3.videoHeight;
  return new Promise(function (resolve, reject) {
    var attempts = 10;

    function checkVideo() {
      if (attempts > 0) {
        if (videoWidth > 10 && videoHeight > 10) {
          if (true) {
            console.log("".concat(videoWidth, "px x ").concat(videoHeight, "px"));
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

/***/ }),

/***/ "./src/input/exif-helper.ts":
/*!**********************************!*\
  !*** ./src/input/exif-helper.ts ***!
  \**********************************/
/*! exports provided: AvailableTags, findTagsInObjectURL, findTagsInBuffer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AvailableTags", function() { return AvailableTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findTagsInObjectURL", function() { return findTagsInObjectURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findTagsInBuffer", function() { return findTagsInBuffer; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../../node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);



/**
 * @borrows https://github.com/exif-js/exif-js
 */
var ExifTags = {
  0x0112: 'orientation'
};
var AvailableTags = Object.keys(ExifTags).map(function (key) {
  return ExifTags[key];
});
function findTagsInObjectURL(_x) {
  return _findTagsInObjectURL.apply(this, arguments);
}

function _findTagsInObjectURL() {
  _findTagsInObjectURL = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(src) {
    var tags,
        buffer,
        _args = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tags = _args.length > 1 && _args[1] !== undefined ? _args[1] : AvailableTags;

            if (!/^blob:/i.test(src)) {
              _context.next = 6;
              break;
            }

            _context.next = 4;
            return objectURLToBlob(src);

          case 4:
            buffer = _context.sent;
            return _context.abrupt("return", findTagsInBuffer(buffer, tags));

          case 6:
            return _context.abrupt("return", Promise.resolve(null));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _findTagsInObjectURL.apply(this, arguments);
}

function findTagsInBuffer(file) {
  var selectedTags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : AvailableTags;
  var dataView = new DataView(file);
  var length = file.byteLength;
  var exifTags = selectedTags.reduce(function (result, selectedTag) {
    var exifTag = Object.keys(ExifTags).find(function (tag) {
      return ExifTags[tag] === selectedTag;
    });

    if (exifTag) {
      result[exifTag] = selectedTag;
    }

    return result;
  }, {});
  var offset = 2;

  if (dataView.getUint8(0) !== 0xFF || dataView.getUint8(1) !== 0xD8) {
    return null;
  }

  while (offset < length) {
    if (dataView.getUint8(offset) !== 0xFF) {
      return null;
    }

    var marker = dataView.getUint8(offset + 1);

    if (marker === 0xE1) {
      return readEXIFData(dataView, offset + 4, exifTags);
    } else {
      offset += 2 + dataView.getUint16(offset + 2);
    }
  }

  return null;
}

function objectURLToBlob(_x2) {
  return _objectURLToBlob.apply(this, arguments);
}

function _objectURLToBlob() {
  _objectURLToBlob = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(url) {
    var response;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetch(url);

          case 2:
            response = _context2.sent;

            if (!response.ok) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", response.arrayBuffer());

          case 5:
            throw new Error('HTTP Error ' + response.status);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _objectURLToBlob.apply(this, arguments);
}

function readEXIFData(dataView, start, exifTags) {
  if ('Exif'.split('').some(function (_char, index) {
    return dataView.getUint8(start + index) !== _char.charCodeAt(0);
  })) {
    return null;
  }

  var tiffOffset = start + 6;
  var bigEnd;

  if (dataView.getUint16(tiffOffset) === 0x4949) {
    bigEnd = false;
  } else if (dataView.getUint16(tiffOffset) === 0x4D4D) {
    bigEnd = true;
  } else {
    return null;
  }

  if (dataView.getUint16(tiffOffset + 2, !bigEnd) !== 0x002A) {
    return null;
  }

  var firstIFDOffset = dataView.getUint32(tiffOffset + 4, !bigEnd);

  if (firstIFDOffset < 0x00000008) {
    return null;
  }

  var tags = readTags(dataView, tiffOffset + firstIFDOffset, exifTags, bigEnd);
  return tags;
}

function readTags(dataView, dirStart, strings, bigEnd) {
  var entries = dataView.getUint16(dirStart, !bigEnd);
  var tags = {};

  for (var i = 0; i < entries; i++) {
    var entryOffset = dirStart + i * 12 + 2;
    var tag = strings[dataView.getUint16(entryOffset, !bigEnd)];

    if (tag) {
      tags[tag] = readTagValue(dataView, entryOffset, bigEnd);
    }
  }

  return tags;
}

function readTagValue(dataView, entryOffset, bigEnd) {
  var type = dataView.getUint16(entryOffset + 2, !bigEnd);
  var numValues = dataView.getUint32(entryOffset + 4, !bigEnd);
  return type === 3 && numValues === 1 ? dataView.getUint16(entryOffset + 8, !bigEnd) : undefined;
}

/***/ }),

/***/ "./src/input/frame-grabber.ts":
/*!************************************!*\
  !*** ./src/input/frame-grabber.ts ***!
  \************************************/
/*! exports provided: FrameGrabber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FrameGrabber", function() { return FrameGrabber; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);



var QUATER_CIRCLE = Math.PI / 2;
var FrameGrabber =
/*#__PURE__*/
function () {
  function FrameGrabber(inputStream, canvas) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, FrameGrabber);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_inputStream", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_streamConfig", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_canvas", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_context", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_data", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_canvasHeight", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_canvasWidth", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_height", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_width", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_topLeft", void 0);

    this._inputStream = inputStream;
    this._streamConfig = inputStream.config;
    this._canvasWidth = inputStream.canvasWidth;
    this._canvasHeight = inputStream.canvasHeight;
    this._width = inputStream.width;
    this._height = inputStream.height;
    this._topLeft = inputStream.topLeft;
    this._canvas = canvas || document.createElement('canvas');
    this._canvas.width = this._canvasWidth;
    this._canvas.height = this._canvasHeight;
    this._context = this._canvas.getContext('2d');
    this._data = new Uint8Array(this._width * this._height);

    if (true) {
      console.log('FrameGrabber', JSON.stringify({
        size: {
          x: this._width,
          y: this._height
        },
        topLeft: this._topLeft,
        videoSize: {
          x: inputStream.realWidth,
          y: inputStream.realHeight
        },
        canvasSize: {
          x: this._canvasWidth,
          y: this._canvasHeight
        }
      }));
    }
  }
  /**
   * Fetches a frame from the input stream and puts into the frame buffer.
   * The image data is converted to gray scale and then half-sampled if configured.
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(FrameGrabber, [{
    key: "grab",
    value: function grab(data) {
      this._data = data;

      var frame = this._inputStream.getFrame();

      if (frame) {
        this._adjustCanvasSize();

        var drawable;
        var drawAngle = 0;

        if (frame instanceof HTMLVideoElement) {
          drawable = frame;
        } else {
          drawable = frame.image;

          if (frame.tags) {
            switch (frame.tags.orientation) {
              case 6:
                {
                  drawAngle = QUATER_CIRCLE;
                  break;
                }

              case 8:
                {
                  drawAngle = -QUATER_CIRCLE;
                  break;
                }
            }
          }
        }

        if (drawAngle !== 0) {
          var halfWidth = this._canvasWidth >> 1;
          var halfHeight = this._canvasHeight >> 1;

          this._context.translate(halfWidth, halfHeight);

          this._context.rotate(drawAngle);

          this._context.drawImage(drawable, -halfHeight, -halfWidth, this._canvasHeight, this._canvasWidth);

          this._context.rotate(-drawAngle);

          this._context.translate(-halfWidth, -halfHeight);
        } else {
          this._context.drawImage(drawable, 0, 0, this._canvasWidth, this._canvasHeight);
        }

        var imageData = this._context.getImageData(this._topLeft.x, this._topLeft.y, this._width, this._height).data;

        if (this._streamConfig.halfSample) {
          this._grayAndHalfSampleFromCanvasData(imageData);
        } else {
          this._computeGray(imageData);
        }

        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "_adjustCanvasSize",
    value: function _adjustCanvasSize() {
      if (this._canvas.height !== this._canvasHeight || this._canvas.width !== this._canvasWidth) {
        if (true) {
          console.warn('Canvas size needs to be adjusted');
        }

        this._canvas.height = this._canvasHeight;
        this._canvas.width = this._canvasWidth;
      }
    }
  }, {
    key: "_grayAndHalfSampleFromCanvasData",
    value: function _grayAndHalfSampleFromCanvasData(imageData) {
      var endIndex = imageData.length >> 2;
      var outWidth = this._width >> 1;
      var topRowIndex = 0;
      var bottomRowIndex = this._width;
      var outImageIndex = 0;

      while (bottomRowIndex < endIndex) {
        for (var i = 0; i < outWidth; i++) {
          var top4 = topRowIndex << 2;
          var bottom4 = bottomRowIndex << 2;
          this._data[outImageIndex] = (0.299 * imageData[top4 + 0] + 0.587 * imageData[top4 + 1] + 0.114 * imageData[top4 + 2] + (0.299 * imageData[top4 + 4] + 0.587 * imageData[top4 + 5] + 0.114 * imageData[top4 + 6]) + (0.299 * imageData[bottom4 + 0] + 0.587 * imageData[bottom4 + 1] + 0.114 * imageData[bottom4 + 2]) + (0.299 * imageData[bottom4 + 4] + 0.587 * imageData[bottom4 + 5] + 0.114 * imageData[bottom4 + 6])) / 4 | 0;
          outImageIndex++;
          topRowIndex += 2;
          bottomRowIndex += 2;
        }

        topRowIndex += this._width;
        bottomRowIndex += this._width;
      }
    }
  }, {
    key: "_computeGray",
    value: function _computeGray(imageData) {
      var imageDataLength = imageData.length;

      if (this._streamConfig && this._streamConfig.singleChannel) {
        for (var i = 0, j = 0; i < imageDataLength; i += 4, j++) {
          this._data[j] = imageData[i];
        }
      } else {
        for (var _i = 0, _j = 0; _i < imageDataLength; _i += 4, _j++) {
          this._data[_j] = 0.299 * imageData[_i] + 0.587 * imageData[_i + 1] + 0.114 * imageData[_i + 2] | 0;
        }
      }
    }
  }]);

  return FrameGrabber;
}();

/***/ }),

/***/ "./src/input/image-loader.ts":
/*!***********************************!*\
  !*** ./src/input/image-loader.ts ***!
  \***********************************/
/*! exports provided: ImageLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageLoader", function() { return ImageLoader; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../../node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _exif_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./exif-helper */ "./src/input/exif-helper.ts");





var ImageLoader =
/*#__PURE__*/
function () {
  function ImageLoader() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ImageLoader);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(ImageLoader, null, [{
    key: "load",
    value: function () {
      var _load = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(baseUri, callback, offset, size, sequence) {
        var imageSrcs, loadedImages, notLoadedImages, i, loaded, _loaded;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _loaded = function _ref2() {
                  _loaded = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
                  /*#__PURE__*/
                  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(loadedImage) {
                    var x, y, imageName, firstImage;
                    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            x = 0;

                          case 1:
                            if (!(x < notLoadedImages.length)) {
                              _context.next = 17;
                              break;
                            }

                            if (!(notLoadedImages[x] === loadedImage)) {
                              _context.next = 14;
                              break;
                            }

                            notLoadedImages.splice(x, 1); // TODO: assume the index is the same

                            y = 0;

                          case 5:
                            if (!(y < imageSrcs.length)) {
                              _context.next = 13;
                              break;
                            }

                            imageName = imageSrcs[y].substr(imageSrcs[y].lastIndexOf('/'));

                            if (!(loadedImage.src.lastIndexOf(imageName) !== -1)) {
                              _context.next = 10;
                              break;
                            }

                            loadedImages[y] = {
                              image: loadedImage
                            };
                            return _context.abrupt("break", 13);

                          case 10:
                            y++;
                            _context.next = 5;
                            break;

                          case 13:
                            return _context.abrupt("break", 17);

                          case 14:
                            x++;
                            _context.next = 1;
                            break;

                          case 17:
                            if (!(notLoadedImages.length === 0)) {
                              _context.next = 33;
                              break;
                            }

                            if (true) {
                              console.log('Images loaded');
                            }

                            _context.prev = 19;

                            if (!(sequence === false)) {
                              _context.next = 25;
                              break;
                            }

                            firstImage = loadedImages[0];
                            _context.next = 24;
                            return Object(_exif_helper__WEBPACK_IMPORTED_MODULE_4__["findTagsInObjectURL"])(baseUri);

                          case 24:
                            firstImage.tags = _context.sent;

                          case 25:
                            _context.next = 30;
                            break;

                          case 27:
                            _context.prev = 27;
                            _context.t0 = _context["catch"](19);
                            console.log(_context.t0);

                          case 30:
                            _context.prev = 30;
                            callback(loadedImages);
                            return _context.finish(30);

                          case 33:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, null, [[19, 27, 30, 33]]);
                  }));
                  return _loaded.apply(this, arguments);
                };

                loaded = function _ref(_x6) {
                  return _loaded.apply(this, arguments);
                };

                imageSrcs = new Array(size);
                loadedImages = new Array(size);
                notLoadedImages = new Array();

                if (sequence === false) {
                  imageSrcs[0] = baseUri;
                } else {
                  for (i = 0; i < size; i++) {
                    imageSrcs[i] = "".concat(baseUri, "image-").concat(('00' + (offset + i)).slice(-3), ".jpg");
                  }
                }

                imageSrcs.forEach(function (src) {
                  var image = new Image();
                  notLoadedImages.push(image);

                  image.onload = function () {
                    return loaded(image);
                  };

                  image.src = src;
                });

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function load(_x, _x2, _x3, _x4, _x5) {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }]);

  return ImageLoader;
}();

/***/ }),

/***/ "./src/input/image-stream.ts":
/*!***********************************!*\
  !*** ./src/input/image-stream.ts ***!
  \***********************************/
/*! exports provided: ImageStream */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageStream", function() { return ImageStream; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _image_loader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./image-loader */ "./src/input/image-loader.ts");
/* harmony import */ var _input_stream__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./input-stream */ "./src/input/input-stream.ts");








function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



var ImageStream =
/*#__PURE__*/
function (_InputStream) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ImageStream, _InputStream);

  function ImageStream() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ImageStream);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ImageStream).call(this));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "_baseUrl", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "_ended", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "_frameIndex", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "_height", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "_images", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "_loaded", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "_offset", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "_paused", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "_size", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "_width", void 0);

    _this._canvasHeight = 0;
    _this._canvasWidth = 0;
    _this._baseUrl = null;
    _this._ended = false;
    _this._frameIndex = 0;
    _this._height = 0;
    _this._images = null;
    _this._loaded = false;
    _this._offset = 1;
    _this._paused = true;
    _this._size = 0;
    _this._width = 0;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ImageStream, [{
    key: "setAttribute",
    value: function setAttribute() {}
  }, {
    key: "pause",
    value: function pause() {
      this._paused = true;
    }
  }, {
    key: "play",
    value: function play() {
      this._paused = false;
    }
  }, {
    key: "getFrame",
    value: function getFrame() {
      var _this2 = this;

      var frame = null;

      if (this._loaded && !this._paused) {
        frame = this._images[this._frameIndex];

        if (this._frameIndex < this._size - 1) {
          this._frameIndex++;
        } else {
          setTimeout(function () {
            _this2._ended = true;

            _this2.trigger('ended', []);
          }, 0);
        }
      }

      return frame;
    }
  }, {
    key: "_loadImages",
    value: function _loadImages() {
      var _this3 = this;

      this._loaded = false;
      _image_loader__WEBPACK_IMPORTED_MODULE_7__["ImageLoader"].load(this._baseUrl, function (images) {
        _this3._images = images;

        switch (images[0].tags && images[0].tags.orientation) {
          case 6:
          case 8:
            {
              _this3._width = images[0].image.height;
              _this3._height = images[0].image.width;
              break;
            }

          default:
            {
              _this3._width = images[0].image.width;
              _this3._height = images[0].image.height;
            }
        }

        _this3._canvasWidth = _this3._calculatedWidth = _this3._config.size ? _this3._width > _this3._height ? _this3._config.size : _this3._width * _this3._config.size / _this3._height | 0 : _this3._width;
        _this3._canvasHeight = _this3._calculatedHeight = _this3._config.size ? _this3._width > _this3._height ? _this3._height * _this3._config.size / _this3._width | 0 : _this3._config.size : _this3._height;
        _this3._loaded = true;
        _this3._frameIndex = 0;
        setTimeout(function () {
          return _this3.trigger('canrecord', []);
        }, 0);
      }, this._offset, this._size, this._config.sequence);
    }
  }, {
    key: "realHeight",
    get: function get() {
      return this._height;
    }
  }, {
    key: "realWidth",
    get: function get() {
      return this._width;
    }
  }, {
    key: "config",
    get: function get() {
      return this._config;
    },
    set: function set(config) {
      this._config = _objectSpread({}, config);
      this._baseUrl = config.src;
      this._size = config.sequence && config.length ? config.length : 1;

      this._loadImages();
    }
  }, {
    key: "ended",
    get: function get() {
      return this._ended;
    }
  }, {
    key: "currentTime",
    set: function set(time) {
      this._frameIndex = time;
    }
  }]);

  return ImageStream;
}(_input_stream__WEBPACK_IMPORTED_MODULE_8__["InputStream"]);

/***/ }),

/***/ "./src/input/input-stream-utils.ts":
/*!*****************************************!*\
  !*** ./src/input/input-stream-utils.ts ***!
  \*****************************************/
/*! exports provided: calculatePatchSize, checkImageConstraints, _parseCssDimensionValues, _dimensionsConverters, computeImageArea */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculatePatchSize", function() { return calculatePatchSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkImageConstraints", function() { return checkImageConstraints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_parseCssDimensionValues", function() { return _parseCssDimensionValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_dimensionsConverters", function() { return _dimensionsConverters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeImageArea", function() { return computeImageArea; });
function _computeDivisors(n) {
  var divisors = new Array();
  var largeDivisors = new Array();

  for (var divisor = 1; divisor * divisor <= n; divisor++) {
    if (n % divisor === 0) {
      divisors.push(divisor);

      if (divisor * divisor !== n) {
        largeDivisors.unshift(n / divisor | 0);
      }
    }
  }

  return divisors.concat(largeDivisors);
}

function _computeCommonDivisors(m, n) {
  if (m === n) {
    return _computeDivisors(m);
  }

  var max = m > n ? m : n;
  var min = m > n ? n : m;
  var divisors = new Array();
  var largeDivisors = new Array();

  for (var divisor = 1; divisor * divisor <= min; divisor++) {
    if (max % divisor === 0 && min % divisor === 0) {
      divisors.push(divisor);
      var largeDivisor = min / divisor | 0;

      if (divisor !== largeDivisor && max % largeDivisor === 0) {
        largeDivisors.unshift();
      }
    }
  }

  return divisors.concat(largeDivisors);
}

function calculatePatchSize(patchSize, _ref) {
  var x = _ref.x,
      y = _ref.y;
  var wideSide = Math.max(x | 0, y | 0) | 0;
  var nrOfPatchesList = [8, 10, 15, 20, 32, 60, 80];
  var nrOfPatchesMap = {
    'x-small': 5,
    small: 4,
    medium: 3,
    large: 2,
    'x-large': 1
  };
  var nrOfPatchesIndex = nrOfPatchesMap[patchSize] || nrOfPatchesMap.medium | 0;
  var nrOfPatches = nrOfPatchesList[nrOfPatchesIndex] | 0;
  var desiredPatchSize = wideSide / nrOfPatches | 0;

  function findPatchSizeForDivisors(divisors) {
    var i = 0;
    var found = divisors[divisors.length >> 1] | 0;

    while (i < divisors.length - 1 && divisors[i] < desiredPatchSize) {
      i++;
    }

    if (i > 0) {
      if (Math.abs(divisors[i] - desiredPatchSize) > Math.abs(divisors[i - 1] - desiredPatchSize)) {
        found = divisors[i - 1] | 0;
      } else {
        found = divisors[i] | 0;
      }
    }

    if (desiredPatchSize / found < nrOfPatchesList[nrOfPatchesIndex + 1] / nrOfPatchesList[nrOfPatchesIndex] && desiredPatchSize / found > nrOfPatchesList[nrOfPatchesIndex - 1] / nrOfPatchesList[nrOfPatchesIndex]) {
      return {
        x: found,
        y: found
      };
    }

    return null;
  }

  var optimalPatchSize = findPatchSizeForDivisors(_computeCommonDivisors(x, y)) || findPatchSizeForDivisors(_computeDivisors(wideSide)) || findPatchSizeForDivisors(_computeDivisors(desiredPatchSize * nrOfPatches));
  return optimalPatchSize;
}
function checkImageConstraints(inputStream, config) {
  var width = inputStream.width;
  var height = inputStream.height;
  var shift = config.halfSample ? 1 : 0 | 0;
  var inputStreamConfig = inputStream.config; // calculate width and height based on area

  if (inputStreamConfig && inputStreamConfig.area) {
    var area = computeImageArea(width, height, inputStreamConfig.area);
    inputStream.topLeft = area.topLeft;
    inputStream.setCanvasSize(width, height);
    width = area.width;
    height = area.height;
  }

  var size = {
    x: width >> shift,
    y: height >> shift
  };
  var patchSize = calculatePatchSize(config.patchSize, size);

  if (true) {
    console.log('Patch-Size:', JSON.stringify(patchSize));
  }

  inputStream.width = (size.x / patchSize.x << shift) * patchSize.x | 0;
  inputStream.height = (size.y / patchSize.y << shift) * patchSize.y | 0;

  if (inputStream.width % patchSize.x === 0 && inputStream.height % patchSize.y === 0) {
    return true;
  } // eslint-disable-next-line max-len


  throw new Error("Image dimensions do not comply with the current settings: width (".concat(width, ") and height (").concat(height, ") must be a multiple of ").concat(patchSize.x));
}
function _parseCssDimensionValues(value) {
  var dimension = {
    value: parseFloat(value),
    unit: value.indexOf('%') === value.length - 1 ? '%' : value.indexOf('px') === value.length - 2 ? 'px' : '%'
  };
  return dimension;
}
var _dimensionsConverters = {
  bottom: function bottom(dimension, _ref2) {
    var height = _ref2.height;
    return dimension.unit === '%' ? height - height * dimension.value / 100 | 0 : dimension.unit === 'px' ? height - dimension.value : height;
  },
  left: function left(dimension, _ref3) {
    var width = _ref3.width;
    return dimension.unit === '%' ? width * dimension.value / 100 | 0 : dimension.unit === 'px' ? dimension.value : 0;
  },
  right: function right(dimension, _ref4) {
    var width = _ref4.width;
    return dimension.unit === '%' ? width - width * dimension.value / 100 | 0 : dimension.unit === 'px' ? width - dimension.value : width;
  },
  top: function top(dimension, _ref5) {
    var height = _ref5.height;
    return dimension.unit === '%' ? height * dimension.value / 100 | 0 : dimension.unit === 'px' ? dimension.value : 0;
  }
};
function computeImageArea(inputWidth, inputHeight, area) {
  var context = {
    width: inputWidth,
    height: inputHeight
  };
  var parsedArea = Object.keys(area).reduce(function (result, key) {
    var value = area[key];

    var parsed = _parseCssDimensionValues(value);

    var calculated = _dimensionsConverters[key](parsed, context);

    result[key] = calculated;
    return result;
  }, {});
  return {
    topLeft: {
      x: parsedArea.left,
      y: parsedArea.top
    },
    width: parsedArea.right - parsedArea.left,
    height: parsedArea.bottom - parsedArea.top
  };
}

/***/ }),

/***/ "./src/input/input-stream.ts":
/*!***********************************!*\
  !*** ./src/input/input-stream.ts ***!
  \***********************************/
/*! exports provided: InputStream */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputStream", function() { return InputStream; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var InputStream =
/*#__PURE__*/
function () {
  function InputStream() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, InputStream);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_calculatedHeight", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_calculatedWidth", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_canvasHeight", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_canvasWidth", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_config", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_eventNames", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_eventHandlers", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_topLeft", void 0);

    this._canvasWidth = 0;
    this._canvasHeight = 0;
    this._config = null;
    this._eventNames = ['canrecord', 'ended'];
    this._eventHandlers = new Map();
    this._topLeft = {
      x: 0,
      y: 0
    };
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(InputStream, [{
    key: "setCanvasSize",
    value: function setCanvasSize(width, height) {
      this._canvasWidth = width;
      this._canvasHeight = height;
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(event, listener, _options) {
      if (this._eventNames.indexOf(event) !== -1) {
        if (!this._eventHandlers.has(event)) {
          this._eventHandlers.set(event, new Array());
        }

        this._eventHandlers.get(event).push(listener);
      }
    }
  }, {
    key: "clearEventHandlers",
    value: function clearEventHandlers() {
      this._eventHandlers.clear();
    }
  }, {
    key: "trigger",
    value: function trigger(eventName, argArray) {
      var _this = this;

      var handlers = this._eventHandlers.get(eventName);

      if (handlers) {
        handlers.forEach(function (handler) {
          return handler.apply(_this, argArray);
        });
      }
    }
  }, {
    key: "height",
    get: function get() {
      return this._calculatedHeight;
    },
    set: function set(height) {
      this._calculatedHeight = height;
    }
  }, {
    key: "width",
    get: function get() {
      return this._calculatedWidth;
    },
    set: function set(width) {
      this._calculatedWidth = width;
    }
  }, {
    key: "topLeft",
    get: function get() {
      return _objectSpread({}, this._topLeft);
    },
    set: function set(topLeft) {
      this._topLeft.x = topLeft.x;
      this._topLeft.y = topLeft.y;
    }
  }, {
    key: "canvasHeight",
    get: function get() {
      return this._canvasHeight;
    }
  }, {
    key: "canvasWidth",
    get: function get() {
      return this._canvasWidth;
    }
  }]);

  return InputStream;
}();

/***/ }),

/***/ "./src/input/live-stream.ts":
/*!**********************************!*\
  !*** ./src/input/live-stream.ts ***!
  \**********************************/
/*! exports provided: LiveStream */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveStream", function() { return LiveStream; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _video_stream__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./video-stream */ "./src/input/video-stream.ts");






var LiveStream =
/*#__PURE__*/
function (_VideoStream) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(LiveStream, _VideoStream);

  function LiveStream(video) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, LiveStream);

    video.setAttribute('autoplay', '');
    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(LiveStream).call(this, video));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(LiveStream, [{
    key: "ended",
    get: function get() {
      return false;
    }
  }]);

  return LiveStream;
}(_video_stream__WEBPACK_IMPORTED_MODULE_5__["VideoStream"]);

/***/ }),

/***/ "./src/input/video-stream.ts":
/*!***********************************!*\
  !*** ./src/input/video-stream.ts ***!
  \***********************************/
/*! exports provided: VideoStream, LiveStream */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoStream", function() { return VideoStream; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveStream", function() { return LiveStream; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../../node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _input_stream__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./input-stream */ "./src/input/input-stream.ts");









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


var VideoStream =
/*#__PURE__*/
function (_InputStream) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(VideoStream, _InputStream);

  function VideoStream(video) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, VideoStream);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(VideoStream).call(this));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "_video", void 0);

    _this._video = video;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(VideoStream, [{
    key: "setAttribute",
    value: function setAttribute(name, value) {
      this._video.setAttribute(name, value);
    }
  }, {
    key: "pause",
    value: function pause() {
      this._video.pause();
    }
  }, {
    key: "play",
    value: function play() {
      this._video.play();
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(event, listener, options) {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(VideoStream.prototype), "addEventListener", this).call(this, event, listener, options);

      if (this._eventNames.indexOf(event) === -1) {
        this._video.addEventListener(event, listener, options);
      }
    }
  }, {
    key: "clearEventHandlers",
    value: function clearEventHandlers() {
      // TODO: come up with a way to remove video event handlers
      // this._eventNames.forEach(eventName => {
      //     const handlers = this._eventHandlers.get(eventName);
      //     if (handlers && handlers.length > 0) {
      //         handlers.forEach(handler => this._video.removeEventListener(eventName, handler));
      //     }
      // });
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(VideoStream.prototype), "clearEventHandlers", this).call(this);
    }
  }, {
    key: "trigger",
    value: function trigger(eventName, argArray) {
      if (eventName === 'canrecord') {
        this._initSize();
      }

      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(VideoStream.prototype), "trigger", this).call(this, eventName, argArray);
    }
  }, {
    key: "getFrame",
    value: function getFrame() {
      return this._video;
    }
  }, {
    key: "_initSize",
    value: function _initSize() {
      var width = this._video.videoWidth;
      var height = this._video.videoHeight;
      this._canvasWidth = this._calculatedWidth = this._config.size ? width > height ? this._config.size : width * this._config.size / height | 0 : width;
      this._canvasHeight = this._calculatedHeight = this._config.size ? width > height ? height * this._config.size / width | 0 : this._config.size : height;
    }
  }, {
    key: "realHeight",
    get: function get() {
      return this._video.videoHeight;
    }
  }, {
    key: "realWidth",
    get: function get() {
      return this._video.videoWidth;
    }
  }, {
    key: "config",
    get: function get() {
      return this._config;
    },
    set: function set(config) {
      this._config = _objectSpread({}, config);
      this._video.src = config.src || '';
    }
  }, {
    key: "ended",
    get: function get() {
      return this._video.ended;
    }
  }, {
    key: "currentTime",
    set: function set(time) {
      if (this._config.type !== 'LiveStream') {
        this._video.currentTime = time;
      }
    }
  }]);

  return VideoStream;
}(_input_stream__WEBPACK_IMPORTED_MODULE_8__["InputStream"]);
var LiveStream =
/*#__PURE__*/
function (_VideoStream) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(LiveStream, _VideoStream);

  function LiveStream(video) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, LiveStream);

    video.setAttribute('autoplay', '');
    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(LiveStream).call(this, video));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(LiveStream, [{
    key: "ended",
    get: function get() {
      return false;
    }
  }]);

  return LiveStream;
}(VideoStream);

/***/ }),

/***/ "./src/locator/barcode-locator-utils.ts":
/*!**********************************************!*\
  !*** ./src/locator/barcode-locator-utils.ts ***!
  \**********************************************/
/*! exports provided: invert, transformWithMatrix, otsuThreshold, halfSample */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformWithMatrix", function() { return transformWithMatrix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "otsuThreshold", function() { return otsuThreshold; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "halfSample", function() { return halfSample; });
/**
 * Invert matrix
 * @param matrix the matrix to invert
 * @returns the inverted matrix
 */
function invert(matrix) {
  var a0 = matrix[0];
  var a1 = matrix[1];
  var a2 = matrix[2];
  var a3 = matrix[3];
  var determinant = a0 * a3 - a2 * a1;

  if (!determinant) {
    return null;
  }

  return new Float32Array([a3 / determinant, -a1 / determinant, -a2 / determinant, a0 / determinant]);
}
/**
 * Transforms the vector with a matrix
 * @param { x, y } vector to transform
 * @param matrix matrix to transform with
 * @returns the transformed vector
 */

function transformWithMatrix(_ref, matrix) {
  var x = _ref.x,
      y = _ref.y;
  return {
    x: matrix[0] * x + matrix[2] * y,
    y: matrix[1] * x + matrix[3] * y
  };
}

function _computeHistogram(imageWrapper, bitsPerPixel) {
  if (!bitsPerPixel) {
    bitsPerPixel = 8;
  }

  var imageData = imageWrapper.data;
  var bitShift = 8 - bitsPerPixel;
  var bucketCount = 1 << bitsPerPixel;
  var histogram = new Int32Array(bucketCount);

  for (var i = imageData.length; i--;) {
    histogram[imageData[i] >> bitShift]++;
  }

  return histogram;
}

function _determineOtsuThreshold(imageWrapper, bitsPerPixel) {
  if (!bitsPerPixel) {
    bitsPerPixel = 8;
  }

  var bitShift = 8 - bitsPerPixel;

  var hist = _computeHistogram(imageWrapper, bitsPerPixel);

  var vet = [0];
  var max = (1 << bitsPerPixel) - 1;

  function px(init, end) {
    var sum = 0;

    for (var i = init; i <= end; i++) {
      sum += hist[i];
    }

    return sum;
  }

  function mx(init, end) {
    var sum = 0;

    for (var i = init; i <= end; i++) {
      sum += i * hist[i];
    }

    return sum;
  }

  for (var k = 1; k < max; k++) {
    var p1 = px(0, k);
    var p2 = px(k + 1, max);
    var p12 = p1 * p2 || 1;
    var m1 = mx(0, k) * p2;
    var m2 = mx(k + 1, max) * p1;
    var m12 = m1 - m2;
    vet[k] = m12 * m12 / p12;
  } // index of max element


  var threshold = vet.reduce(function (maxIndex, item, index, array) {
    return item > array[maxIndex] ? index : maxIndex;
  }, 0);
  return threshold << bitShift;
}

function otsuThreshold(imageWrapper, targetWrapper) {
  var threshold = _determineOtsuThreshold(imageWrapper);

  var targetData = targetWrapper.data;
  imageWrapper.data.forEach(function (value, index) {
    targetData[index] = value < threshold ? 1 : 0;
  });
  return threshold;
}
/**
 * @param imageWrapper input image to be sampled
 * @param outImageWrapper {ImageWrapper} to be stored in
 */

function halfSample(imageWrapper, outImageWrapper) {
  var image = imageWrapper.data;
  var width = imageWrapper.size.x;
  var outImage = outImageWrapper.data;
  var endIndex = image.length;
  var outWidth = width >> 1;
  var topRowIndex = 0;
  var bottomRowIndex = width;
  var outImgIndex = 0;

  while (bottomRowIndex < endIndex) {
    for (var i = 0; i < outWidth; i++) {
      outImage[outImgIndex] = image[topRowIndex] + image[topRowIndex + 1] + image[bottomRowIndex] + image[bottomRowIndex + 1] >> 2;
      outImgIndex++;
      topRowIndex += 2;
      bottomRowIndex += 2;
    }

    topRowIndex += width;
    bottomRowIndex += width;
  }
}

/***/ }),

/***/ "./src/locator/barcode-locator.ts":
/*!****************************************!*\
  !*** ./src/locator/barcode-locator.ts ***!
  \****************************************/
/*! exports provided: BarcodeLocator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarcodeLocator", function() { return BarcodeLocator; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_cluster__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/cluster */ "./src/common/cluster.ts");
/* harmony import */ var _common_hsv2rgb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/hsv2rgb */ "./src/common/hsv2rgb.ts");
/* harmony import */ var _common_image_debug__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/image-debug */ "./src/common/image-debug.ts");
/* harmony import */ var _common_image_wrapper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/image-wrapper */ "./src/common/image-wrapper.ts");
/* harmony import */ var _input_input_stream_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../input/input-stream-utils */ "./src/input/input-stream-utils.ts");
/* harmony import */ var _barcode_locator_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./barcode-locator-utils */ "./src/locator/barcode-locator-utils.ts");
/* harmony import */ var _rasterizer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./rasterizer */ "./src/locator/rasterizer.ts");
/* harmony import */ var _skeletonizer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./skeletonizer */ "./src/locator/skeletonizer.js");
/* harmony import */ var _tracer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./tracer */ "./src/locator/tracer.ts");












var MomentSimilarityThreshold = 0.9;
var BarcodeLocator =
/*#__PURE__*/
function () {
  function BarcodeLocator(inputImageWrapper, config) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, BarcodeLocator);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_config", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_inputImageWrapper", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_currentImageWrapper", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_skelImageWrapper", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_subImageWrapper", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_labelImageWrapper", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_binaryImageWrapper", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_patchGrid", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_patchLabelGrid", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_imageToPatchGrid", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_patchSize", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_binaryContext", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_numPatches", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_skeletonizer", void 0);

    this._config = config;
    this._inputImageWrapper = inputImageWrapper;
    this._numPatches = {
      x: 0,
      y: 0
    };

    this._initBuffers();

    this._initCanvas();
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(BarcodeLocator, [{
    key: "locate",
    value: function locate() {
      if (this._config.halfSample) {
        Object(_barcode_locator_utils__WEBPACK_IMPORTED_MODULE_8__["halfSample"])(this._inputImageWrapper, this._currentImageWrapper);
      }

      this._binarizeImage();

      var patchesFound = this._findPatches(); // return unless 5% or more patches are found


      if (patchesFound.length < this._numPatches.x * this._numPatches.y * 0.05) {
        return null;
      } // rasterize area by comparing angular similarity;


      var maxLabel = this._rasterizeAngularSimilarity(patchesFound);

      if (maxLabel < 1) {
        return null;
      } // search for area with the most patches (biggest connected area)


      var topLabels = this._findBiggestConnectedAreas(maxLabel);

      if (topLabels.length === 0) {
        return null;
      }

      var boxes = this._findBoxes(topLabels, maxLabel);

      return boxes;
    }
  }, {
    key: "_initBuffers",
    value: function _initBuffers() {
      if (this._config.halfSample) {
        this._currentImageWrapper = new _common_image_wrapper__WEBPACK_IMPORTED_MODULE_6__["ImageWrapper"]({
          x: this._inputImageWrapper.size.x / 2 | 0,
          y: this._inputImageWrapper.size.y / 2 | 0
        });
      } else {
        this._currentImageWrapper = this._inputImageWrapper;
      }

      this._patchSize = Object(_input_input_stream_utils__WEBPACK_IMPORTED_MODULE_7__["calculatePatchSize"])(this._config.patchSize, this._currentImageWrapper.size);
      this._numPatches.x = this._currentImageWrapper.size.x / this._patchSize.x | 0;
      this._numPatches.y = this._currentImageWrapper.size.y / this._patchSize.y | 0;
      this._binaryImageWrapper = new _common_image_wrapper__WEBPACK_IMPORTED_MODULE_6__["ImageWrapper"](this._currentImageWrapper.size, undefined, Uint8Array, false);
      this._labelImageWrapper = new _common_image_wrapper__WEBPACK_IMPORTED_MODULE_6__["ImageWrapper"](this._patchSize, undefined, Array, true);
      var skeletonImageData = new ArrayBuffer(64 * 1024);
      this._subImageWrapper = new _common_image_wrapper__WEBPACK_IMPORTED_MODULE_6__["ImageWrapper"](this._patchSize, new Uint8Array(skeletonImageData, 0, this._patchSize.x * this._patchSize.y));
      this._skelImageWrapper = new _common_image_wrapper__WEBPACK_IMPORTED_MODULE_6__["ImageWrapper"](this._patchSize, new Uint8Array(skeletonImageData, this._patchSize.x * this._patchSize.y * 3, this._patchSize.x * this._patchSize.y), undefined, true);
      this._skeletonizer = Object(_skeletonizer__WEBPACK_IMPORTED_MODULE_10__["default"])(typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : global, {
        size: this._patchSize.x
      }, skeletonImageData);
      var size = {
        x: this._currentImageWrapper.size.x / this._subImageWrapper.size.x | 0,
        y: this._currentImageWrapper.size.y / this._subImageWrapper.size.y | 0
      };
      this._patchLabelGrid = new _common_image_wrapper__WEBPACK_IMPORTED_MODULE_6__["ImageWrapper"](size, undefined, Int32Array, true);
      this._patchGrid = new _common_image_wrapper__WEBPACK_IMPORTED_MODULE_6__["ImageWrapper"](size, undefined, undefined, true);
      this._imageToPatchGrid = new Array(this._patchLabelGrid.data.length);
    }
  }, {
    key: "_initCanvas",
    value: function _initCanvas() {
      if (this._config.useWorker || typeof document === 'undefined') {
        return;
      }

      var canvas = document.createElement('canvas');
      canvas.className = 'binaryBuffer';
      canvas.width = this._binaryImageWrapper.size.x;
      canvas.height = this._binaryImageWrapper.size.y;

      if ( true && this._config.debug && this._config.debug.showCanvas) {
        document.querySelector('#debug').appendChild(canvas);
      }

      this._binaryContext = canvas.getContext('2d');
    }
    /**
     * Creates a bounding box which encloses all the given patches
     * @returns The minimal bounding box
     */

  }, {
    key: "_boxFromPatches",
    value: function _boxFromPatches(patches) {
      var _this = this;

      var debug =  true && this._config.debug;
      var averageRad = patches.reduce(function (sum, _ref) {
        var pos = _ref.pos,
            rad = _ref.rad;

        if (debug && debug.showPatches) {
          // draw all patches which are to be taken into consideration
          _this._drawRect(pos, _this._subImageWrapper.size, 'red', 1);
        }

        return sum + rad;
      }, 0) / patches.length;
      averageRad = (averageRad * 180 / Math.PI + 90) % 180 - 90;

      if (averageRad < 0) {
        averageRad += 180;
      }

      averageRad = (180 - averageRad) * Math.PI / 180;
      var cos = Math.cos(averageRad);
      var sin = Math.sin(averageRad);
      var matrix = new Float32Array([cos, sin, -sin, cos]);
      var inverseMatrix = Object(_barcode_locator_utils__WEBPACK_IMPORTED_MODULE_8__["invert"])(matrix); // iterate over patches and rotate by angle

      patches.forEach(function (_ref2) {
        var box = _ref2.box;

        for (var j = 0; j < 4; j++) {
          box[j] = Object(_barcode_locator_utils__WEBPACK_IMPORTED_MODULE_8__["transformWithMatrix"])(box[j], matrix);
        }

        if (debug && debug.boxFromPatches.showTransformed) {
          _this._drawPath(box, '#99ff00', 2);
        }
      });
      var minX = this._binaryImageWrapper.size.x;
      var minY = this._binaryImageWrapper.size.y;
      var maxX = -minX;
      var maxY = -minY; // find bounding box

      patches.forEach(function (_ref3) {
        var box = _ref3.box;
        box.forEach(function (_ref4) {
          var x = _ref4.x,
              y = _ref4.y;

          if (x < minX) {
            minX = x;
          }

          if (x > maxX) {
            maxX = x;
          }

          if (y < minY) {
            minY = y;
          }

          if (y > maxY) {
            maxY = y;
          }
        });
      });
      var box = [{
        x: minX,
        y: minY
      }, {
        x: maxX,
        y: minY
      }, {
        x: maxX,
        y: maxY
      }, {
        x: minX,
        y: maxY
      }];

      if (debug && debug.boxFromPatches.showTransformedBox) {
        this._drawPath(box, '#ff0000', 2);
      } // reverse rotation


      box = box.map(function (vertex) {
        return Object(_barcode_locator_utils__WEBPACK_IMPORTED_MODULE_8__["transformWithMatrix"])(vertex, inverseMatrix);
      });

      if (debug && debug.boxFromPatches.showBB) {
        this._drawPath(box, '#ff0000', 2);
      }

      if (this._config.halfSample) {
        // scale
        box = box.map(function (_ref5) {
          var x = _ref5.x,
              y = _ref5.y;
          return {
            x: x * 2,
            y: y *= 2
          };
        });
      }

      return box;
    }
    /**
     * Creates a binary image of the current image
     */

  }, {
    key: "_binarizeImage",
    value: function _binarizeImage() {
      Object(_barcode_locator_utils__WEBPACK_IMPORTED_MODULE_8__["otsuThreshold"])(this._currentImageWrapper, this._binaryImageWrapper);

      this._binaryImageWrapper.zeroBorder();

      if ( true && this._config.debug && this._config.debug.showCanvas) {
        this._binaryImageWrapper.show(this._binaryContext, 255);
      }
    }
    /**
     * Iterate over the entire image, extract patches
     */

  }, {
    key: "_findPatches",
    value: function _findPatches() {
      var debug =  true && this._config.debug;
      var patchesFound = new Array();

      for (var i = 0; i < this._numPatches.x; i++) {
        for (var j = 0; j < this._numPatches.y; j++) {
          var x = this._subImageWrapper.size.x * i;
          var y = this._subImageWrapper.size.y * j; // seperate parts

          this._skeletonize(x, y); // Rasterize, find individual bars


          this._skelImageWrapper.zeroBorder();

          this._labelImageWrapper.data.fill(0);

          var rasterizer = new _rasterizer__WEBPACK_IMPORTED_MODULE_9__["Rasterizer"](this._skelImageWrapper, this._labelImageWrapper);
          var rasterResult = rasterizer.rasterize(0);

          if (debug && debug.showLabels) {
            this._labelImageWrapper.overlay(this._binaryContext, 360 / rasterResult.count | 0, x, y);
          } // calculate moments from the skeletonized patch


          var moments = this._labelImageWrapper.moments(rasterResult.count); // extract eligible patches


          var patch = this._describePatch(moments, j * this._numPatches.x + i, x, y);

          if (patch) {
            patchesFound.push(patch);

            if (debug && debug.showFoundPatches) {
              this._drawRect(patch.pos, this._subImageWrapper.size, '#99ff00', 2);
            }
          }
        }
      }

      return patchesFound;
    }
    /**
     * Finds those connected areas which contain at least 6 patches
     * and returns them ordered DESC by the number of contained patches
     * @param maxLabel
     */

  }, {
    key: "_findBiggestConnectedAreas",
    value: function _findBiggestConnectedAreas(maxLabel) {
      var labelHist = new Array(maxLabel).fill(0);

      this._patchLabelGrid.data.forEach(function (data) {
        if (data > 0) {
          labelHist[data - 1]++;
        }
      }); // extract top areas with at least 6 patches present


      var topLabels = labelHist.map(function (value, index) {
        return {
          value: value,
          index: index
        };
      }).filter(function (_ref6) {
        var value = _ref6.value;
        return value >= 5;
      }).sort(function (a, b) {
        return b.value - a.value;
      }).map(function (_ref7) {
        var index = _ref7.index;
        return index + 1;
      });
      return topLabels;
    }
    /**
     *
     */

  }, {
    key: "_findBoxes",
    value: function _findBoxes(topLabels, maxLabel) {
      var _this2 = this;

      var boxes = new Array();
      var showRemainingPatchLabels =  true && this._config.debug && this._config.debug.showRemainingPatchLabels;
      topLabels.forEach(function (label) {
        var patches = new Array();

        _this2._patchLabelGrid.data.forEach(function (data, index) {
          if (data === label) {
            patches.push(_this2._imageToPatchGrid[index]);
          }
        });

        var box = _this2._boxFromPatches(patches);

        if (box) {
          boxes.push(box);

          if (showRemainingPatchLabels) {
            // draw patch-labels if requested
            var hsv = [label / (maxLabel + 1) * 360, 1, 1];
            var rgb = [0, 0, 0];
            Object(_common_hsv2rgb__WEBPACK_IMPORTED_MODULE_4__["hsv2rgb"])(hsv, rgb);
            var color = "rgb(".concat(rgb.join(','), ")");
            patches.forEach(function (_ref8) {
              var pos = _ref8.pos;
              return _this2._drawRect(pos, _this2._subImageWrapper.size, color, 2);
            });
          }
        }
      });
      return boxes;
    }
    /**
     * Find similar moments (via cluster)
     * @param moments
     */

  }, {
    key: "_similarMoments",
    value: function _similarMoments(moments) {
      var clusters = _common_cluster__WEBPACK_IMPORTED_MODULE_3__["Cluster"].clusterize(moments, MomentSimilarityThreshold);
      var topCluster = clusters.reduce(function (top, item) {
        var count = item.moments.length;
        return count > top.count ? {
          item: item,
          count: count
        } : top;
      }, {
        item: {
          moments: []
        },
        count: 0
      });
      var result = topCluster.item.moments;
      return result;
    }
  }, {
    key: "_skeletonize",
    value: function _skeletonize(x, y) {
      this._binaryImageWrapper.subImageAsCopy(this._subImageWrapper, x, y);

      this._skeletonizer.skeletonize(); // Show skeleton if requested


      if ( true && this._config.debug && this._config.debug.showSkeleton) {
        this._skelImageWrapper.overlay(this._binaryContext, 360, x, y);
      }
    }
    /**
     * Extracts and describes those patches which seem to contain a barcode pattern
     * @param moments
     * @param index
     * @param x
     * @param y
     * @returns list of patches
     */

  }, {
    key: "_describePatch",
    value: function _describePatch(moments, index, x, y) {
      if (moments.length > 1) {
        var minComponentWeight = Math.ceil(this._patchSize.x / 3); // only collect moments which area covers at least minComponentWeight pixels

        var eligibleMoments = moments.filter(function (moment) {
          return moment.m00 > minComponentWeight;
        }); // if at least 2 moments are found which have at least minComponentWeights covered

        if (eligibleMoments.length > 1) {
          var matchingMoments = this._similarMoments(eligibleMoments);

          var length = matchingMoments.length | 0; // Only two of the moments are allowed not to fit into the equation

          if (length > 1 && length << 2 >= eligibleMoments.length * 3 && length << 2 > moments.length) {
            // determine the similarity of the moments
            var rad = matchingMoments.reduce(function (sum, moment) {
              return sum + moment.rad;
            }, 0) / length;
            return {
              index: index,
              pos: {
                x: x,
                y: y
              },
              box: [{
                x: x,
                y: y
              }, {
                x: x + this._subImageWrapper.size.x,
                y: y
              }, {
                x: x + this._subImageWrapper.size.x,
                y: y + this._subImageWrapper.size.y
              }, {
                x: x,
                y: y + this._subImageWrapper.size.y
              }],
              moments: matchingMoments,
              rad: rad,
              x: Math.cos(rad),
              y: Math.sin(rad)
            };
          }
        }
      }

      return null;
    }
  }, {
    key: "_notYetProcessed",
    value: function _notYetProcessed() {
      for (var i = 0; i < this._patchLabelGrid.data.length; i++) {
        if (this._patchLabelGrid.data[i] === 0 && this._patchGrid.data[i] === 1) {
          return i;
        }
      }

      return this._patchLabelGrid.data.length;
    }
  }, {
    key: "_trace",
    value: function _trace(currentIndex, label) {
      var _this3 = this;

      var threshold = 0.95;
      var current = {
        x: currentIndex % this._patchLabelGrid.size.x,
        y: currentIndex / this._patchLabelGrid.size.x | 0
      };

      if (currentIndex < this._patchLabelGrid.data.length) {
        var currentPatch = this._imageToPatchGrid[currentIndex]; // assign label

        this._patchLabelGrid.data[currentIndex] = label;
        _tracer__WEBPACK_IMPORTED_MODULE_11__["SearchDirections"].forEach(function (direction) {
          var y = current.y + direction[0];
          var x = current.x + direction[1];
          var index = y * _this3._patchLabelGrid.size.x + x; // continue if patch empty

          if (_this3._patchGrid.data[index] === 0) {
            _this3._patchLabelGrid.data[index] = Number.MAX_VALUE;
          } else if (_this3._patchLabelGrid.data[index] === 0) {
            var patch = _this3._imageToPatchGrid[index];
            var similarity = Math.abs(patch.x * currentPatch.x + patch.y * currentPatch.y);

            if (similarity > threshold) {
              _this3._trace(index, label);
            }
          }
        });
      }
    }
    /**
     * Finds patches which are connected and share the same orientation
     * @param patchesFound
     */

  }, {
    key: "_rasterizeAngularSimilarity",
    value: function _rasterizeAngularSimilarity(patchesFound) {
      var _this4 = this;

      var label = 0;
      var hsv = [0, 1, 1];
      var rgb = [0, 0, 0]; // prepare for finding the right patches

      this._patchGrid.data.fill(0);

      this._patchLabelGrid.data.fill(0);

      this._imageToPatchGrid.fill(null);

      patchesFound.forEach(function (patch) {
        _this4._imageToPatchGrid[patch.index] = patch;
        _this4._patchGrid.data[patch.index] = 1;
      }); // rasterize the patches found to determine area

      this._patchGrid.zeroBorder();

      var currentIndex = 0;

      while ((currentIndex = this._notYetProcessed()) < this._patchLabelGrid.data.length) {
        label++;

        this._trace(currentIndex, label);
      } // draw patch-labels if requested


      if ( true && this._config.debug && this._config.debug.showPatchLabels) {
        for (var j = 0; j < this._patchLabelGrid.data.length; j++) {
          if (this._patchLabelGrid.data[j] > 0 && this._patchLabelGrid.data[j] <= label) {
            var patch = this._imageToPatchGrid[j];
            hsv[0] = this._patchLabelGrid.data[j] / (label + 1) * 360;
            Object(_common_hsv2rgb__WEBPACK_IMPORTED_MODULE_4__["hsv2rgb"])(hsv, rgb);

            this._drawRect(patch.pos, this._subImageWrapper.size, "rgb(".concat(rgb.join(','), ")"), 2);
          }
        }
      }

      return label;
    }
  }, {
    key: "_drawRect",
    value: function _drawRect(_ref9, size, color, lineWidth) {
      var x = _ref9.x,
          y = _ref9.y;
      this._binaryContext.strokeStyle = color;
      this._binaryContext.fillStyle = color;
      this._binaryContext.lineWidth = lineWidth || 1;

      this._binaryContext.strokeRect(x, y, size.x, size.y);
    }
  }, {
    key: "_drawPath",
    value: function _drawPath(path, color, lineWidth) {
      _common_image_debug__WEBPACK_IMPORTED_MODULE_5__["ImageDebug"].drawPath(path, this._binaryContext, color, lineWidth);
    }
  }]);

  return BarcodeLocator;
}();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/locator/rasterizer.ts":
/*!***********************************!*\
  !*** ./src/locator/rasterizer.ts ***!
  \***********************************/
/*! exports provided: Rasterizer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rasterizer", function() { return Rasterizer; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _tracer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tracer */ "./src/locator/tracer.ts");




/**
 * @borrows http://www.codeproject.com/Tips/407172/Connected-Component-Labeling-and-Vectorization
 */

var EdgeLabel;

(function (EdgeLabel) {
  EdgeLabel[EdgeLabel["Outside"] = -32767] = "Outside";
  EdgeLabel[EdgeLabel["Inside"] = -32766] = "Inside";
})(EdgeLabel || (EdgeLabel = {}));

;
var ContourDirection;

(function (ContourDirection) {
  ContourDirection[ContourDirection["CW"] = 0] = "CW";
  ContourDirection[ContourDirection["CCW"] = 1] = "CCW";
  ContourDirection[ContourDirection["Unknown"] = 2] = "Unknown";
})(ContourDirection || (ContourDirection = {}));

;
var Rasterizer =
/*#__PURE__*/
function () {
  function Rasterizer(imageWrapper, labelWrapper) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Rasterizer);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_width", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_height", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_tracer", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_imageData", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_labelData", void 0);

    this._imageData = imageWrapper.data;
    this._labelData = labelWrapper.data;
    this._width = imageWrapper.size.x;
    this._height = imageWrapper.size.y;
    this._tracer = new _tracer__WEBPACK_IMPORTED_MODULE_3__["Tracer"](imageWrapper, labelWrapper);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Rasterizer, [{
    key: "rasterize",
    value: function rasterize(depthLabel) {
      var colorMap = new Array();

      for (var i = 0; i < 400; i++) {
        colorMap[i] = 0;
      }

      colorMap[0] = this._imageData[0];
      var cc = null;
      var sc;
      var connectedCount = 0;

      for (var cy = 1; cy < this._height - 1; cy++) {
        var labelIndex = 0;
        var bc = colorMap[0];

        for (var cx = 1; cx < this._width - 1; cx++) {
          var pos = cy * this._width + cx;

          if (this._labelData[pos] === 0) {
            var color = this._imageData[pos];

            if (color !== bc) {
              if (labelIndex === 0) {
                var lc = connectedCount + 1;
                colorMap[lc] = color;
                bc = color;

                var vertex = this._tracer.contourTracing(cy, cx, lc, color, EdgeLabel.Outside);

                if (vertex !== null) {
                  connectedCount++;
                  labelIndex = lc;
                  var p = {
                    dir: ContourDirection.CW,
                    index: labelIndex,
                    firstVertex: vertex,
                    nextPeer: cc,
                    insideContours: null
                  };

                  if (cc !== null) {
                    cc.previousPeer = p;
                  }

                  cc = p;
                }
              } else {
                var _vertex = this._tracer.contourTracing(cy, cx, EdgeLabel.Inside, color, labelIndex);

                if (_vertex !== null) {
                  var _p = {
                    dir: depthLabel === 0 ? ContourDirection.CCW : ContourDirection.CW,
                    firstVertex: _vertex,
                    index: depthLabel,
                    insideContours: null
                  };
                  sc = cc;

                  while (sc !== null && sc.index !== labelIndex) {
                    sc = sc.nextPeer;
                  }

                  if (sc !== null) {
                    _p.nextPeer = sc.insideContours;

                    if (sc.insideContours !== null) {
                      sc.insideContours.previousPeer = _p;
                    }

                    sc.insideContours = _p;
                  }
                }
              }
            } else {
              this._labelData[pos] = labelIndex;
            }
          } else if (this._labelData[pos] === EdgeLabel.Inside) {
            labelIndex = 0;
            bc = this._imageData[pos];
          } else if (this._labelData[pos] === EdgeLabel.Outside) {
            labelIndex = 0;
            bc = colorMap[0];
          } else {
            labelIndex = this._labelData[pos];
            bc = colorMap[labelIndex];
          }
        }
      }

      sc = cc;

      while (sc !== null) {
        sc.index = depthLabel;
        sc = sc.nextPeer;
      }

      return {
        cc: cc,
        count: connectedCount
      };
    }
  }, {
    key: "drawContour",
    value: function drawContour(canvas, firstContour) {
      var context = canvas.getContext('2d');
      context.strokeStyle = 'red';
      context.fillStyle = 'red';
      context.lineWidth = 1;
      var pq = firstContour;
      var iq = pq && pq.insideContours;

      while (pq !== null) {
        var q = iq || pq;

        if (iq !== null) {
          iq = iq.nextPeer;
        } else {
          pq = pq.nextPeer;
          iq = pq && pq.insideContours;
        }

        switch (q.dir) {
          case ContourDirection.CW:
            {
              context.strokeStyle = 'red';
              break;
            }

          case ContourDirection.CCW:
            {
              context.strokeStyle = 'blue';
              break;
            }

          case ContourDirection.Unknown:
            {
              context.strokeStyle = 'green';
              break;
            }
        }

        var p = q.firstVertex;
        context.beginPath();
        context.moveTo(p.x, p.y);

        do {
          p = p.next;
          context.lineTo(p.x, p.y);
        } while (p !== q.firstVertex);

        context.stroke();
      }
    }
  }]);

  return Rasterizer;
}();

/***/ }),

/***/ "./src/locator/skeletonizer.js":
/*!*************************************!*\
  !*** ./src/locator/skeletonizer.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable eqeqeq */
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
    skelImagePtr = tempImagePtr + erodedImagePtr | 0; // init skel-image

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

/* harmony default export */ __webpack_exports__["default"] = (Skeletonizer);
/* eslint-enable eqeqeq */

/***/ }),

/***/ "./src/locator/tracer.ts":
/*!*******************************!*\
  !*** ./src/locator/tracer.ts ***!
  \*******************************/
/*! exports provided: SearchDirections, Tracer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchDirections", function() { return SearchDirections; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tracer", function() { return Tracer; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);




/**
 * @borrows http://www.codeproject.com/Tips/407172/Connected-Component-Labeling-and-Vectorization
 */
var SearchDirections = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
var Tracer =
/*#__PURE__*/
function () {
  function Tracer(imageWrapper, labelWrapper) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Tracer);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_imageData", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_labelData", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_width", void 0);

    this._imageData = imageWrapper.data;
    this._labelData = labelWrapper.data;
    this._width = imageWrapper.size.x;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Tracer, [{
    key: "trace",
    value: function trace(current, color, label, edgeLabel) {
      for (var i = 0; i < 7; i++) {
        var y = current.cy + SearchDirections[current.dir][0] | 0;
        var x = current.cx + SearchDirections[current.dir][1] | 0;
        var pos = y * this._width + x | 0;

        if (this._imageData[pos] === color && (this._labelData[pos] === 0 || this._labelData[pos] === label)) {
          this._labelData[pos] = label;
          current.cx = x;
          current.cy = y;
          return true;
        } else {
          if (this._labelData[pos] === 0) {
            this._labelData[pos] = edgeLabel;
          }

          current.dir = (current.dir + 1) % 8;
        }
      }

      return false;
    }
  }, {
    key: "contourTracing",
    value: function contourTracing(sy, sx, label, color, edgeLabel) {
      var Fv = null;
      var current = {
        cx: sx,
        cy: sy,
        dir: 0
      };

      if (this.trace(current, color, label, edgeLabel)) {
        Fv = {
          x: sx,
          y: sy,
          dir: current.dir,
          next: null,
          prev: null
        };
        var Cv = Fv;
        var ldir = current.dir;
        var P = {
          x: current.cx,
          y: current.cy,
          dir: 0,
          next: null,
          prev: Cv
        };
        Cv.next = P;
        Cv = P;

        do {
          current.dir = (current.dir + 6) % 8;
          this.trace(current, color, label, edgeLabel);

          if (ldir !== current.dir) {
            Cv.dir = current.dir;
            P = {
              x: current.cx,
              y: current.cy,
              dir: 0,
              next: null,
              prev: Cv
            };
            Cv.next = P;
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
  }]);

  return Tracer;
}();

/***/ }),

/***/ "./src/quagga.ts":
/*!***********************!*\
  !*** ./src/quagga.ts ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _analytics_result_collector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./analytics/result-collector */ "./src/analytics/result-collector.ts");
/* harmony import */ var _common_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/events */ "./src/common/events.ts");
/* harmony import */ var _common_image_debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/image-debug */ "./src/common/image-debug.ts");
/* harmony import */ var _common_image_wrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/image-wrapper */ "./src/common/image-wrapper.ts");
/* harmony import */ var _common_merge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/merge */ "./src/common/merge.ts");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./config/config */ "./src/config/config.dev.ts");
/* harmony import */ var _decoder_barcode_decoder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./decoder/barcode-decoder */ "./src/decoder/barcode-decoder.ts");
/* harmony import */ var _input_camera_access__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./input/camera-access */ "./src/input/camera-access.ts");
/* harmony import */ var _input_frame_grabber__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./input/frame-grabber */ "./src/input/frame-grabber.ts");
/* harmony import */ var _input_image_stream__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./input/image-stream */ "./src/input/image-stream.ts");
/* harmony import */ var _input_live_stream__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./input/live-stream */ "./src/input/live-stream.ts");
/* harmony import */ var _input_video_stream__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./input/video-stream */ "./src/input/video-stream.ts");
/* harmony import */ var _input_input_stream_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./input/input-stream-utils */ "./src/input/input-stream-utils.ts");
/* harmony import */ var _locator_barcode_locator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./locator/barcode-locator */ "./src/locator/barcode-locator.ts");















var _inputStream;

var _frameGrabber;

var _stopped;

var _canvasContainer = {
  ctx: {
    image: null,
    overlay: null
  },
  dom: {
    image: null,
    overlay: null
  }
};

var _inputImageWrapper;

var _locator;

var _boxSize;

var _decoder;

var _workerPool = new Array();

var _onUIThread;

var _resultCollector;

var _config;

/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init(config, cb, imageWrapper) {
    _onUIThread = true;
    _config = Object(_common_merge__WEBPACK_IMPORTED_MODULE_4__["merge"])(_config_config__WEBPACK_IMPORTED_MODULE_5__["config"], config);

    if (imageWrapper) {
      _onUIThread = false;

      _initializeData(imageWrapper);

      cb();
    } else {
      _initInputStream(cb);
    }
  },
  CameraAccess: _input_camera_access__WEBPACK_IMPORTED_MODULE_7__["CameraAccess"],
  ImageDebug: _common_image_debug__WEBPACK_IMPORTED_MODULE_2__["ImageDebug"],
  ImageWrapper: _common_image_wrapper__WEBPACK_IMPORTED_MODULE_3__["ImageWrapper"],
  ResultCollector: _analytics_result_collector__WEBPACK_IMPORTED_MODULE_0__["ResultCollector"],

  get canvas() {
    return _canvasContainer;
  },

  start: function start() {
    if (_onUIThread && _config.inputStream.type === 'LiveStream') {
      _startContinuousUpdate();
    } else {
      _update();
    }
  },
  stop: function stop() {
    _stopped = true;

    _adjustWorkerPool(0);

    if (_config.inputStream.type === 'LiveStream') {
      _input_camera_access__WEBPACK_IMPORTED_MODULE_7__["CameraAccess"].release();

      _inputStream.clearEventHandlers();
    }
  },
  decodeSingle: function decodeSingle(config, resultCallback) {
    var _this = this;

    config = Object(_common_merge__WEBPACK_IMPORTED_MODULE_4__["merge"])({
      inputStream: {
        type: 'ImageStream',
        sequence: false,
        size: 800,
        src: config.src
      },
      numOfWorkers:  true && config.debug ? 0 : 1,
      locator: {
        halfSample: false
      }
    }, config);
    this.init(config, function () {
      _common_events__WEBPACK_IMPORTED_MODULE_1__["Events"].once('processed', function (result) {
        _this.stop();

        resultCallback.call(null, result);
      }, true);

      _this.start();
    });
  },
  pause: function pause() {
    _stopped = true;
  },
  onDetected: function onDetected(callback) {
    _common_events__WEBPACK_IMPORTED_MODULE_1__["Events"].subscribe('detected', callback);
  },
  offDetected: function offDetected(callback) {
    _common_events__WEBPACK_IMPORTED_MODULE_1__["Events"].unsubscribe('detected', callback);
  },
  onProcessed: function onProcessed(callback) {
    _common_events__WEBPACK_IMPORTED_MODULE_1__["Events"].subscribe('processed', callback);
  },
  offProcessed: function offProcessed(callback) {
    _common_events__WEBPACK_IMPORTED_MODULE_1__["Events"].unsubscribe('processed', callback);
  },
  setReaders: function setReaders(readers) {
    if (_decoder) {
      _decoder.setReaders(readers);
    } else if (_onUIThread && _workerPool.length > 0) {
      _workerPool.forEach(function (_ref) {
        var worker = _ref.worker;
        return worker.postMessage({
          cmd: 'setReaders',
          readers: readers
        });
      });
    }
  },
  registerResultCollector: function registerResultCollector(resultCollector) {
    if (resultCollector && typeof resultCollector.addResult === 'function') {
      _resultCollector = resultCollector;
    }
  }
});

function _initializeData(imageWrapper) {
  _initBuffers(imageWrapper);

  _decoder = new _decoder_barcode_decoder__WEBPACK_IMPORTED_MODULE_6__["BarcodeDecoder"](_config.decoder, _inputImageWrapper);
}

function _initInputStream(callback) {
  var video;

  if (_config.inputStream.type === 'VideoStream') {
    video = document.createElement('video');
    _inputStream = new _input_video_stream__WEBPACK_IMPORTED_MODULE_11__["VideoStream"](video);
  } else if (_config.inputStream.type === 'ImageStream') {
    _inputStream = new _input_image_stream__WEBPACK_IMPORTED_MODULE_9__["ImageStream"]();
  } else if (_config.inputStream.type === 'LiveStream') {
    var viewport = _getViewPort();

    if (viewport) {
      video = viewport.querySelector('video');

      if (!video) {
        video = document.createElement('video');
        viewport.appendChild(video);
      }
    }

    _inputStream = new _input_live_stream__WEBPACK_IMPORTED_MODULE_10__["LiveStream"](video);
    _input_camera_access__WEBPACK_IMPORTED_MODULE_7__["CameraAccess"].request(video, _config.inputStream.constraints).then(function () {
      return _inputStream.trigger('canrecord');
    }, function (err) {
      return callback(err);
    });
  }

  _inputStream.setAttribute('preload', 'auto');

  _inputStream.config = _config.inputStream;

  _inputStream.addEventListener('canrecord', _canRecord.bind(this, callback));
}

function _getViewPort() {
  var target = _config.inputStream.target; // Check if target is already a DOM element

  if (target instanceof HTMLElement) {
    return target;
  } else {
    // Use '#interactive.viewport' as a fallback selector (backwards compatibility)
    var selector = typeof target === 'string' ? target : '#interactive.viewport';
    return document.querySelector(selector);
  }
}

function _canRecord(cb) {
  Object(_input_input_stream_utils__WEBPACK_IMPORTED_MODULE_12__["checkImageConstraints"])(_inputStream, _config.locator);

  _initCanvas();

  _frameGrabber = new _input_frame_grabber__WEBPACK_IMPORTED_MODULE_8__["FrameGrabber"](_inputStream, _canvasContainer.dom.image);

  _adjustWorkerPool(_config.numOfWorkers, function () {
    if (_config.numOfWorkers === 0) {
      _initializeData();
    }

    _inputStream.play();

    cb();
  });
}

function _initCanvas() {
  if (typeof document !== 'undefined') {
    var viewport = _getViewPort();

    _canvasContainer.dom.image = document.querySelector('canvas.imgBuffer');

    if (!_canvasContainer.dom.image) {
      _canvasContainer.dom.image = document.createElement('canvas');
      _canvasContainer.dom.image.className = 'imgBuffer';

      if (viewport && _config.inputStream.type === 'ImageStream') {
        viewport.appendChild(_canvasContainer.dom.image);
      }
    }

    _canvasContainer.ctx.image = _canvasContainer.dom.image.getContext('2d');
    _canvasContainer.dom.image.width = _inputStream.canvasWidth;
    _canvasContainer.dom.image.height = _inputStream.canvasHeight;
    _canvasContainer.dom.overlay = document.querySelector('canvas.drawingBuffer');

    if (!_canvasContainer.dom.overlay) {
      _canvasContainer.dom.overlay = document.createElement('canvas');
      _canvasContainer.dom.overlay.className = 'drawingBuffer';

      if (viewport) {
        viewport.appendChild(_canvasContainer.dom.overlay);
      }

      var clearFix = document.createElement('br');
      clearFix.setAttribute('clear', 'all');

      if (viewport) {
        viewport.appendChild(clearFix);
      }
    }

    _canvasContainer.ctx.overlay = _canvasContainer.dom.overlay.getContext('2d');
    _canvasContainer.dom.overlay.width = _inputStream.canvasWidth;
    _canvasContainer.dom.overlay.height = _inputStream.canvasHeight;
  }
}

function _initBuffers(imageWrapper) {
  if (imageWrapper) {
    _inputImageWrapper = imageWrapper;
  } else {
    _inputImageWrapper = new _common_image_wrapper__WEBPACK_IMPORTED_MODULE_3__["ImageWrapper"]({
      x: _inputStream.width,
      y: _inputStream.height
    });
  }

  if (true) {
    console.log(_inputImageWrapper.size);
  }

  _boxSize = [{
    x: 0,
    y: 0
  }, {
    x: 0,
    y: _inputImageWrapper.size.y
  }, {
    x: _inputImageWrapper.size.x,
    y: _inputImageWrapper.size.y
  }, {
    x: _inputImageWrapper.size.x,
    y: 0
  }];
  _locator = new _locator_barcode_locator__WEBPACK_IMPORTED_MODULE_13__["BarcodeLocator"](_inputImageWrapper, _config.locator);
}

function _transform(polygon, offset) {
  polygon.forEach(function (vertex) {
    vertex.x += offset.x;
    vertex.y += offset.y;
  });
}

function _transformResult(result, offset) {
  if (result.barcodes) {
    result.barcodes.forEach(function (barcode) {
      return _transformResult(barcode, offset);
    });
  }

  if (result.line) {
    _transform(result.line, offset);
  }

  if (result.box) {
    _transform(result.box, offset);
  }

  if (result.boxes) {
    result.boxes.forEach(function (box) {
      return _transform(box, offset);
    });
  }
}

function _addResult(result, imageData, canvasWidth, canvasHeight) {
  if (imageData && _resultCollector) {
    if (result.barcodes) {
      result.barcodes.forEach(function (_ref2) {
        var codeResult = _ref2.codeResult;

        if (codeResult) {
          _resultCollector.addResult(imageData, canvasWidth, canvasHeight, codeResult);
        }
      });
    } else if (result.codeResult) {
      _resultCollector.addResult(imageData, canvasWidth, canvasHeight, result.codeResult);
    }
  }
}

function _hasCodeResult(result) {
  return result && (!!result.codeResult || result.barcodes && result.barcodes.some(function (barcode) {
    return !!barcode.codeResult;
  }));
}

function _publishResult(result, imageData) {
  var resultToPublish = result;

  if (result && _onUIThread) {
    var offset = _inputStream.topLeft;

    if (offset.x !== 0 || offset.y !== 0) {
      _transformResult(result, offset);
    }

    _addResult(result, imageData, _inputStream.canvasWidth, _inputStream.canvasHeight);

    resultToPublish = result.barcodes || result;
  }

  _common_events__WEBPACK_IMPORTED_MODULE_1__["Events"].publish('processed', resultToPublish);

  if (_hasCodeResult(result)) {
    _common_events__WEBPACK_IMPORTED_MODULE_1__["Events"].publish('detected', resultToPublish);
  }
}

function _locateAndDecode() {
  var boxes = _config.locate ? _locator.locate() : [_boxSize];

  var result = _decoder.decodeFromBoundingBoxes(boxes);

  _publishResult(result, _inputImageWrapper.data);
}

function _update() {
  if (_onUIThread) {
    if (_workerPool.length > 0) {
      var availableWorker = _workerPool.find(function (_ref3) {
        var busy = _ref3.busy;
        return !busy;
      });

      if (!availableWorker) {
        return; // all workers are busy
      }

      var imageData = availableWorker.imageData;

      if (_frameGrabber.grab(imageData)) {
        availableWorker.busy = true;
        availableWorker.worker.postMessage({
          cmd: 'process',
          imageData: imageData
        }, [imageData.buffer]);
      }
    } else if (_frameGrabber.grab(_inputImageWrapper.data)) {
      _locateAndDecode();
    }
  } else {
    _locateAndDecode();
  }
}

function _startContinuousUpdate() {
  var delay = 1000 / (_config.frequency || 60);
  var next = null;
  _stopped = false;

  (function frame(timestamp) {
    next = next || timestamp;

    if (!_stopped) {
      if (timestamp >= next) {
        next += delay;

        _update();
      }

      window.requestAnimationFrame(frame);
    }
  })(performance.now());
}

function _initWorker(cb) {
  var blobURL = _generateWorkerBlob();

  var workerThread = {
    worker: new Worker(blobURL),
    imageData: new Uint8Array(_inputStream.width * _inputStream.height),
    busy: true
  };

  workerThread.worker.onmessage = function (_ref4) {
    var data = _ref4.data;

    if (data.event === 'initialized') {
      URL.revokeObjectURL(blobURL);
      workerThread.busy = false;
      workerThread.imageData = new Uint8Array(data.imageData);

      if (true) {
        console.log('Worker initialized');
      }

      cb(workerThread);
    } else if (data.event === 'processed') {
      workerThread.busy = false;
      workerThread.imageData = new Uint8Array(data.imageData);

      _publishResult(data.result, workerThread.imageData);
    } else if (data.event === 'error') {
      if (true) {
        console.log('Worker error:', data.message);
      }
    }
  };

  workerThread.worker.postMessage({
    cmd: 'init',
    size: {
      x: _inputStream.width,
      y: _inputStream.height
    },
    imageData: workerThread.imageData,
    config: Object(_common_merge__WEBPACK_IMPORTED_MODULE_4__["merge"])(_config, {
      inputStream: {
        target: null
      }
    })
  }, [workerThread.imageData.buffer]);
}

function _workerInterface(factory) {
  var Quagga;
  var worker = self;
  var imageWrapper;

  if (factory) {
    Quagga = factory()["default"];

    if (!Quagga) {
      worker.postMessage({
        event: 'error',
        message: 'Quagga could not be created'
      });
      return;
    }
  }

  self.onmessage = function (_ref5) {
    var data = _ref5.data;

    if (data.cmd === 'init') {
      var config = data.config;
      config.numOfWorkers = 0;
      imageWrapper = new Quagga.ImageWrapper({
        x: data.size.x,
        y: data.size.y
      }, new Uint8Array(data.imageData));
      Quagga.init(config, function () {
        return worker.postMessage({
          event: 'initialized',
          imageData: imageWrapper.data
        }, [imageWrapper.data.buffer]);
      }, imageWrapper);
      Quagga.onProcessed(function (result) {
        return worker.postMessage({
          event: 'processed',
          imageData: imageWrapper.data,
          result: result
        }, [imageWrapper.data.buffer]);
      });
    } else if (data.cmd === 'process') {
      imageWrapper.data = new Uint8Array(data.imageData);
      Quagga.start();
    } else if (data.cmd === 'setReaders') {
      Quagga.setReaders(data.readers);
    }
  };
}

function _generateWorkerBlob() {
  // @ts-ignore
  var factorySource = __factorySource__ || '';
  var blob = new Blob(["(".concat(_workerInterface.toString(), ")(").concat(factorySource, ");")], {
    type: 'text/javascript'
  });
  return window.URL.createObjectURL(blob);
}

function _adjustWorkerPool(capacity, cb) {
  var increaseBy = capacity - _workerPool.length;

  if (increaseBy > 0) {
    for (var i = 0; i < increaseBy; i++) {
      _initWorker(function (workerThread) {
        _workerPool.push(workerThread);

        if (_workerPool.length >= capacity && cb) {
          cb();
        }
      });
    }
  } else {
    if (increaseBy < 0) {
      _workerPool.slice(increaseBy).forEach(function (_ref6) {
        var worker = _ref6.worker;
        worker.terminate();

        if (true) {
          console.log('Worker terminated!');
        }
      });

      _workerPool = _workerPool.slice(0, increaseBy);
    }

    return cb && cb();
  }
}

/***/ }),

/***/ "./src/reader/2of5-reader.ts":
/*!***********************************!*\
  !*** ./src/reader/2of5-reader.ts ***!
  \***********************************/
/*! exports provided: TwoOfFiveReader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TwoOfFiveReader", function() { return TwoOfFiveReader; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _barcode_reader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./barcode-reader */ "./src/reader/barcode-reader.ts");








var N = 1;
var W = 3;
var START_PATTERN = [W, N, W, N, N, N];
var STOP_PATTERN = [W, N, N, N, W];
var CODE_PATTERN = [[N, N, W, W, N], [W, N, N, N, W], [N, W, N, N, W], [W, W, N, N, N], [N, N, W, N, W], [W, N, W, N, N], [N, W, W, N, N], [N, N, N, W, W], [W, N, N, W, N], [N, W, N, W, N]];
var startPatternLength = START_PATTERN.reduce(function (sum, val) {
  return sum + val;
}, 0);
var TwoOfFiveReader =
/*#__PURE__*/
function (_BarcodeReader) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(TwoOfFiveReader, _BarcodeReader);

  function TwoOfFiveReader(config) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, TwoOfFiveReader);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(TwoOfFiveReader).call(this, config));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "_barSpaceRatio", void 0);

    _this._barSpaceRatio = [1, 1];
    _this._format = '2of5';
    _this._singleCodeError = 0.78;
    _this._averageCodeError = 0.30;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(TwoOfFiveReader, [{
    key: "decode",
    value: function decode() {
      var startInfo = this._findStart();

      if (!startInfo) {
        return null;
      }

      var endInfo = this._findEnd();

      if (!endInfo) {
        return null;
      }

      var counters = this._fillCounters(startInfo.end, endInfo.start, 0);

      if (counters.length % 10 !== 0) {
        return null;
      }

      var result = new Array();
      var decodedCodes = new Array();
      decodedCodes.push(startInfo);

      var code = this._decodePayload(counters, result, decodedCodes);

      if (!code || result.length < 5) {
        return null;
      }

      decodedCodes.push(endInfo);
      return {
        code: result.join(''),
        start: startInfo.start,
        end: endInfo.end,
        startInfo: startInfo,
        decodedCodes: decodedCodes
      };
    }
  }, {
    key: "_findStart",
    value: function _findStart() {
      var offset = this._nextSet(this._row);

      var narrowBarWidth = 1;
      var startInfo;

      while (!startInfo) {
        startInfo = this._findPattern(START_PATTERN, offset, 0, true);

        if (!startInfo) {
          return null;
        }

        narrowBarWidth = (startInfo.end - startInfo.start) / startPatternLength | 0;
        var leadingWhitespaceStart = startInfo.start - narrowBarWidth * 5;

        if (leadingWhitespaceStart >= 0) {
          if (this._matchRange(leadingWhitespaceStart, startInfo.start, 0)) {
            return startInfo;
          }
        }

        offset = startInfo.end;
        startInfo = null;
      }

      return null;
    }
  }, {
    key: "_verifyTrailingWhitespace",
    value: function _verifyTrailingWhitespace(endInfo) {
      var trailingWhitespaceEnd = endInfo.end + (endInfo.end - endInfo.start) / 2;

      if (trailingWhitespaceEnd < this._row.length) {
        if (this._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
          return endInfo;
        }
      }

      return null;
    }
  }, {
    key: "_findEnd",
    value: function _findEnd() {
      this._row.reverse();

      var offset = this._nextSet(this._row);

      var endInfo = this._findPattern(STOP_PATTERN, offset, 0, true);

      this._row.reverse();

      if (endInfo === null) {
        return null;
      } // reverse numbers


      var start = endInfo.start;
      endInfo.start = this._row.length - endInfo.end;
      endInfo.end = this._row.length - start;
      return endInfo !== null ? this._verifyTrailingWhitespace(endInfo) : null;
    }
  }, {
    key: "_decodeCode",
    value: function _decodeCode(counter) {
      var bestMatch = {
        error: Number.MAX_VALUE,
        code: -1,
        start: 0,
        end: 0
      };

      for (var code = 0; code < CODE_PATTERN.length; code++) {
        var error = this._matchPattern(counter, CODE_PATTERN[code]);

        if (error < bestMatch.error) {
          bestMatch.code = code;
          bestMatch.error = error;
        }
      }

      return bestMatch.error < this.AVERAGE_CODE_ERROR ? bestMatch : null;
    }
  }, {
    key: "_decodePayload",
    value: function _decodePayload(counters, result, decodedCodes) {
      var counterLength = counters.length;
      var counter = [0, 0, 0, 0, 0];
      var pos = 0;
      var code;

      while (pos < counterLength) {
        for (var i = 0; i < 5; i++) {
          counter[i] = counters[pos] * this._barSpaceRatio[0];
          pos += 2;
        }

        code = this._decodeCode(counter);

        if (!code) {
          return null;
        }

        result.push(code.code);
        decodedCodes.push(code);
      }

      return code;
    }
  }]);

  return TwoOfFiveReader;
}(_barcode_reader__WEBPACK_IMPORTED_MODULE_7__["BarcodeReader"]);

/***/ }),

/***/ "./src/reader/barcode-reader.ts":
/*!**************************************!*\
  !*** ./src/reader/barcode-reader.ts ***!
  \**************************************/
/*! exports provided: BarcodeDirection, BarcodeReader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarcodeDirection", function() { return BarcodeDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarcodeReader", function() { return BarcodeReader; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);



var BarcodeDirection;

(function (BarcodeDirection) {
  BarcodeDirection[BarcodeDirection["Forward"] = 1] = "Forward";
  BarcodeDirection[BarcodeDirection["Reverse"] = -1] = "Reverse";
})(BarcodeDirection || (BarcodeDirection = {}));

;
var BarcodeReader =
/*#__PURE__*/
function () {
  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(BarcodeReader, [{
    key: "SINGLE_CODE_ERROR",
    get: function get() {
      return this._singleCodeError;
    }
  }, {
    key: "AVERAGE_CODE_ERROR",
    get: function get() {
      return this._averageCodeError;
    }
  }, {
    key: "FORMAT",
    get: function get() {
      return this._format;
    }
  }], [{
    key: "Exception",
    get: function get() {
      return {
        StartNotFoundException: 'Start-Info was not found!',
        CodeNotFoundException: 'Code could not be found!',
        PatternNotFoundException: 'Pattern could not be found!'
      };
    }
  }]);

  function BarcodeReader(config, supplements) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, BarcodeReader);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_singleCodeError", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_averageCodeError", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_format", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_row", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "config", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "supplements", void 0);

    this._format = 'unknown';
    this._row = [];
    this.config = config || {};
    this.supplements = supplements;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(BarcodeReader, [{
    key: "_findPattern",
    value: function _findPattern(pattern, offset, isWhite, tryHarder) {
      var counter = new Array(pattern.length);
      var bestMatch = {
        error: Number.MAX_VALUE,
        code: -1,
        start: 0,
        end: 0
      };
      var epsilon = this.AVERAGE_CODE_ERROR;
      var counterPos = 0;

      if (!offset) {
        offset = this._nextSet(this._row);
      }

      counter.fill(0);

      for (var i = offset; i < this._row.length; i++) {
        if (this._row[i] ^ isWhite) {
          counter[counterPos]++;
        } else {
          if (counterPos === counter.length - 1) {
            var error = this._matchPattern(counter, pattern);

            if (error < epsilon) {
              bestMatch.error = error;
              bestMatch.start = i - counter.reduce(function (sum, value) {
                return sum + value;
              }, 0);
              bestMatch.end = i;
              return bestMatch;
            }

            if (tryHarder) {
              for (var j = 0; j < counter.length - 2; j++) {
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
          isWhite = isWhite ? 0 : 1;
        }
      }

      return null;
    }
  }, {
    key: "_nextUnset",
    value: function _nextUnset(line, start) {
      for (var i = start || 0; i < line.length; i++) {
        if (!line[i]) {
          return i;
        }
      }

      return line.length;
    }
  }, {
    key: "_nextSet",
    value: function _nextSet(line, start) {
      for (var i = start || 0; i < line.length; i++) {
        if (line[i]) {
          return i;
        }
      }

      return line.length;
    }
  }, {
    key: "_matchRange",
    value: function _matchRange(start, end, value) {
      for (var i = start < 0 ? 0 : start; i < end; i++) {
        if (this._row[i] !== value) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "_matchPattern",
    value: function _matchPattern(counter, code, maxSingleError) {
      var error = 0;
      var sum = 0;
      var modulo = 0;
      maxSingleError = maxSingleError || this.SINGLE_CODE_ERROR || 1;

      for (var i = 0; i < counter.length; i++) {
        sum += counter[i];
        modulo += code[i];
      }

      if (sum < modulo) {
        return Number.MAX_VALUE;
      }

      var barWidth = sum / modulo;
      maxSingleError *= barWidth;

      for (var _i = 0; _i < counter.length; _i++) {
        var count = counter[_i];
        var scaled = code[_i] * barWidth;
        var singleError = Math.abs(count - scaled) / scaled;

        if (singleError > maxSingleError) {
          return Number.MAX_VALUE;
        }

        error += singleError;
      }

      return error / modulo;
    }
  }, {
    key: "_correctBars",
    value: function _correctBars(counter, correction, indices) {
      var length = indices.length;
      var tmp = 0;

      while (length--) {
        tmp = counter[indices[length]] * (1 - (1 - correction) / 2);

        if (tmp > 1) {
          counter[indices[length]] = tmp;
        }
      }
    }
  }, {
    key: "decodePattern",
    value: function decodePattern(pattern) {
      this._row = pattern;
      var result = this.decode();

      if (result === null) {
        this._row.reverse();

        result = this.decode();

        if (result) {
          result.direction = BarcodeDirection.Reverse;
          result.start = this._row.length - result.start;
          result.end = this._row.length - result.end;
        }
      } else {
        result.direction = BarcodeDirection.Forward;
      }

      if (result) {
        result.format = this.FORMAT;
      }

      return result;
    }
  }, {
    key: "_fillCounters",
    value: function _fillCounters(offset, end, isWhite) {
      var counters = new Array();
      var counterPos = 0;
      counters[counterPos] = 0;

      for (var i = offset; i < end; i++) {
        if (this._row[i] ^ isWhite) {
          counters[counterPos]++;
        } else {
          counterPos++;
          counters[counterPos] = 1;
          isWhite = isWhite ? 0 : 1;
        }
      }

      return counters;
    }
  }, {
    key: "_toCounters",
    value: function _toCounters(start, counters) {
      var numCounters = counters.length;
      var end = this._row.length;
      var isWhite = this._row[start] ? 0 : 1;
      var counterPos = 0;
      counters.fill(0);

      for (var i = start; i < end; i++) {
        if (this._row[i] ^ isWhite) {
          counters[counterPos]++;
        } else {
          counterPos++;

          if (counterPos === numCounters) {
            break;
          } else {
            counters[counterPos] = 1;
            isWhite = isWhite ? 0 : 1;
          }
        }
      }

      return counters;
    }
  }]);

  return BarcodeReader;
}();

/***/ }),

/***/ "./src/reader/codabar-reader.ts":
/*!**************************************!*\
  !*** ./src/reader/codabar-reader.ts ***!
  \**************************************/
/*! exports provided: CodabarReader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodabarReader", function() { return CodabarReader; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "../../node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../../node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _barcode_reader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./barcode-reader */ "./src/reader/barcode-reader.ts");










var ALPHABETH_STRING = '0123456789-$:/.+ABCD';

var ALPHABET = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_8___default()(ALPHABETH_STRING).map(function (_char) {
  return _char.charCodeAt(0);
}); // const ALPHABET = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 45, 36, 58, 47, 46, 43, 65, 66, 67, 68];


var CHARACTER_ENCODINGS = [0x003, 0x006, 0x009, 0x060, 0x012, 0x042, 0x021, 0x024, 0x030, 0x048, 0x00c, 0x018, 0x045, 0x051, 0x054, 0x015, 0x01A, 0x029, 0x00B, 0x00E];
var START_END = [0x01A, 0x029, 0x00B, 0x00E];
var MIN_ENCODED_CHARS = 4;
var MAX_ACCEPTABLE = 2.0;
var PADDING = 1.5;
var CodabarReader =
/*#__PURE__*/
function (_BarcodeReader) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(CodabarReader, _BarcodeReader);

  function CodabarReader() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, CodabarReader);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(CodabarReader).call(this));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "_counters", void 0);

    _this._format = 'codabar';
    _this._counters = [];
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(CodabarReader, [{
    key: "decode",
    value: function decode() {
      this._counters = this._fillCounters(this._nextUnset(this._row), this._row.length, 1);

      var start = this._findStart();

      if (!start) {
        return null;
      }

      var result = new Array();
      var nextStart = start.startCounter;
      var pattern;

      do {
        pattern = this._toPattern(nextStart);

        if (pattern < 0) {
          return null;
        }

        var decodedChar = this._patternToChar(pattern);

        if (decodedChar === null) {
          return null;
        }

        result.push(decodedChar);
        nextStart += 8;

        if (result.length > 1 && START_END.some(function (code) {
          return code === pattern;
        })) {
          break;
        }
      } while (nextStart < this._counters.length); // verify end


      if (result.length - 2 < MIN_ENCODED_CHARS || !START_END.some(function (code) {
        return code === pattern;
      })) {
        return null;
      } // verify end white space


      if (!this._verifyWhitespace(start.startCounter, nextStart - 8)) {
        return null;
      }

      if (!this._validateResult(result, start.startCounter)) {
        return null;
      }

      nextStart = nextStart > this._counters.length ? this._counters.length : nextStart;

      var end = start.start + this._sumCounters(start.startCounter, nextStart - 8);

      return {
        code: result.join(''),
        start: start.start,
        end: end,
        startInfo: start,
        decodedCodes: result
      };
    }
  }, {
    key: "_verifyWhitespace",
    value: function _verifyWhitespace(startCounter, endCounter) {
      if (startCounter - 1 <= 0 || this._counters[startCounter - 1] >= this._calculatePatternLength(startCounter) / 2.0) {
        if (endCounter + 8 >= this._counters.length || this._counters[endCounter + 7] >= this._calculatePatternLength(endCounter) / 2.0) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "_calculatePatternLength",
    value: function _calculatePatternLength(offset) {
      var sum = 0;

      for (var i = offset; i < offset + 7; i++) {
        sum += this._counters[i];
      }

      return sum;
    }
  }, {
    key: "_thresholdResultPattern",
    value: function _thresholdResultPattern(result, startCounter) {
      var categorization = {
        space: {
          narrow: {
            size: 0,
            counts: 0,
            min: 0,
            max: Number.MAX_VALUE
          },
          wide: {
            size: 0,
            counts: 0,
            min: 0,
            max: Number.MAX_VALUE
          }
        },
        bar: {
          narrow: {
            size: 0,
            counts: 0,
            min: 0,
            max: Number.MAX_VALUE
          },
          wide: {
            size: 0,
            counts: 0,
            min: 0,
            max: Number.MAX_VALUE
          }
        }
      };
      var pos = startCounter;

      for (var i = 0; i < result.length; i++) {
        var pattern = this._charToPattern(result[i]);

        for (var j = 6; j >= 0; j--) {
          var kind = (j & 1) === 2 ? categorization.bar : categorization.space;
          var cat = (pattern & 1) === 1 ? kind.wide : kind.narrow;
          cat.size += this._counters[pos + j];
          cat.counts++;
          pattern >>= 1;
        }

        pos += 8;
      }

      ['space', 'bar'].forEach(function (key) {
        var kind = categorization[key];
        kind.wide.min = Math.floor((kind.narrow.size / kind.narrow.counts + kind.wide.size / kind.wide.counts) / 2);
        kind.narrow.max = Math.ceil(kind.wide.min);
        kind.wide.max = Math.ceil((kind.wide.size * MAX_ACCEPTABLE + PADDING) / kind.wide.counts);
      });
      return categorization;
    }
  }, {
    key: "_charToPattern",
    value: function _charToPattern(_char2) {
      var charCode = _char2.charCodeAt(0);

      for (var i = 0; i < ALPHABET.length; i++) {
        if (ALPHABET[i] === charCode) {
          return CHARACTER_ENCODINGS[i];
        }
      }

      return 0x0;
    }
  }, {
    key: "_validateResult",
    value: function _validateResult(result, startCounter) {
      var threshold = this._thresholdResultPattern(result, startCounter);

      var pos = startCounter;

      for (var i = 0; i < result.length; i++) {
        var pattern = this._charToPattern(result[i]);

        for (var j = 6; j >= 0; j--) {
          var kind = (j & 1) === 0 ? threshold.bar : threshold.space;
          var cat = (pattern & 1) === 1 ? kind.wide : kind.narrow;
          var size = this._counters[pos + j];

          if (size < cat.min || size > cat.max) {
            return false;
          }

          pattern >>= 1;
        }

        pos += 8;
      }

      return true;
    }
  }, {
    key: "_patternToChar",
    value: function _patternToChar(pattern) {
      for (var i = 0; i < CHARACTER_ENCODINGS.length; i++) {
        if (CHARACTER_ENCODINGS[i] === pattern) {
          return String.fromCharCode(ALPHABET[i]);
        }
      }

      return null;
    }
  }, {
    key: "_computeAlternatingThreshold",
    value: function _computeAlternatingThreshold(offset, end) {
      var min = Number.MAX_VALUE;
      var max = 0;

      for (var i = offset; i < end; i += 2) {
        var counter = this._counters[i];

        if (counter > max) {
          max = counter;
        }

        if (counter < min) {
          min = counter;
        }
      }

      return (min + max) / 2.0 | 0;
    }
  }, {
    key: "_toPattern",
    value: function _toPattern(offset) {
      var numCounters = 7;
      var end = offset + numCounters;

      if (end > this._counters.length) {
        return -1;
      }

      var barThreshold = this._computeAlternatingThreshold(offset, end);

      var spaceThreshold = this._computeAlternatingThreshold(offset + 1, end);

      var bitmask = 1 << numCounters - 1;
      var pattern = 0;

      for (var i = 0; i < numCounters; i++) {
        var threshold = (i & 1) === 0 ? barThreshold : spaceThreshold;

        if (this._counters[offset + i] > threshold) {
          pattern |= bitmask;
        }

        bitmask >>= 1;
      }

      return pattern;
    }
  }, {
    key: "_sumCounters",
    value: function _sumCounters(start, end) {
      var sum = 0;

      for (var i = start; i < end; i++) {
        sum += this._counters[i];
      }

      return sum;
    }
  }, {
    key: "_findStart",
    value: function _findStart() {
      var _this2 = this;

      var start = this._nextUnset(this._row);

      var _loop = function _loop(i) {
        var pattern = _this2._toPattern(i);

        if (pattern !== -1 && START_END.some(function (code) {
          return code === pattern;
        })) {
          // TODO: Look for whitespace ahead
          start += _this2._sumCounters(0, i);

          var end = start + _this2._sumCounters(i, i + 8);

          return {
            v: {
              start: start,
              end: end,
              startCounter: i,
              endCounter: i + 8
            }
          };
        }
      };

      for (var i = 1; i < this._counters.length; i++) {
        var _ret = _loop(i);

        if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(_ret) === "object") return _ret.v;
      }

      return null;
    }
  }]);

  return CodabarReader;
}(_barcode_reader__WEBPACK_IMPORTED_MODULE_9__["BarcodeReader"]);

/***/ }),

/***/ "./src/reader/code-128-reader.ts":
/*!***************************************!*\
  !*** ./src/reader/code-128-reader.ts ***!
  \***************************************/
/*! exports provided: Code128Reader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Code128Reader", function() { return Code128Reader; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _barcode_reader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./barcode-reader */ "./src/reader/barcode-reader.ts");






var CODE_SHIFT = 98;
var CODE_C = 99;
var CODE_B = 100;
var CODE_A = 101;
var START_CODE_A = 103;
var START_CODE_B = 104;
var START_CODE_C = 105;
var STOP_CODE = 106;
var CODE_PATTERN = [[2, 1, 2, 2, 2, 2], [2, 2, 2, 1, 2, 2], [2, 2, 2, 2, 2, 1], [1, 2, 1, 2, 2, 3], [1, 2, 1, 3, 2, 2], [1, 3, 1, 2, 2, 2], [1, 2, 2, 2, 1, 3], [1, 2, 2, 3, 1, 2], [1, 3, 2, 2, 1, 2], [2, 2, 1, 2, 1, 3], [2, 2, 1, 3, 1, 2], [2, 3, 1, 2, 1, 2], [1, 1, 2, 2, 3, 2], [1, 2, 2, 1, 3, 2], [1, 2, 2, 2, 3, 1], [1, 1, 3, 2, 2, 2], [1, 2, 3, 1, 2, 2], [1, 2, 3, 2, 2, 1], [2, 2, 3, 2, 1, 1], [2, 2, 1, 1, 3, 2], [2, 2, 1, 2, 3, 1], [2, 1, 3, 2, 1, 2], [2, 2, 3, 1, 1, 2], [3, 1, 2, 1, 3, 1], [3, 1, 1, 2, 2, 2], [3, 2, 1, 1, 2, 2], [3, 2, 1, 2, 2, 1], [3, 1, 2, 2, 1, 2], [3, 2, 2, 1, 1, 2], [3, 2, 2, 2, 1, 1], [2, 1, 2, 1, 2, 3], [2, 1, 2, 3, 2, 1], [2, 3, 2, 1, 2, 1], [1, 1, 1, 3, 2, 3], [1, 3, 1, 1, 2, 3], [1, 3, 1, 3, 2, 1], [1, 1, 2, 3, 1, 3], [1, 3, 2, 1, 1, 3], [1, 3, 2, 3, 1, 1], [2, 1, 1, 3, 1, 3], [2, 3, 1, 1, 1, 3], [2, 3, 1, 3, 1, 1], [1, 1, 2, 1, 3, 3], [1, 1, 2, 3, 3, 1], [1, 3, 2, 1, 3, 1], [1, 1, 3, 1, 2, 3], [1, 1, 3, 3, 2, 1], [1, 3, 3, 1, 2, 1], [3, 1, 3, 1, 2, 1], [2, 1, 1, 3, 3, 1], [2, 3, 1, 1, 3, 1], [2, 1, 3, 1, 1, 3], [2, 1, 3, 3, 1, 1], [2, 1, 3, 1, 3, 1], [3, 1, 1, 1, 2, 3], [3, 1, 1, 3, 2, 1], [3, 3, 1, 1, 2, 1], [3, 1, 2, 1, 1, 3], [3, 1, 2, 3, 1, 1], [3, 3, 2, 1, 1, 1], [3, 1, 4, 1, 1, 1], [2, 2, 1, 4, 1, 1], [4, 3, 1, 1, 1, 1], [1, 1, 1, 2, 2, 4], [1, 1, 1, 4, 2, 2], [1, 2, 1, 1, 2, 4], [1, 2, 1, 4, 2, 1], [1, 4, 1, 1, 2, 2], [1, 4, 1, 2, 2, 1], [1, 1, 2, 2, 1, 4], [1, 1, 2, 4, 1, 2], [1, 2, 2, 1, 1, 4], [1, 2, 2, 4, 1, 1], [1, 4, 2, 1, 1, 2], [1, 4, 2, 2, 1, 1], [2, 4, 1, 2, 1, 1], [2, 2, 1, 1, 1, 4], [4, 1, 3, 1, 1, 1], [2, 4, 1, 1, 1, 2], [1, 3, 4, 1, 1, 1], [1, 1, 1, 2, 4, 2], [1, 2, 1, 1, 4, 2], [1, 2, 1, 2, 4, 1], [1, 1, 4, 2, 1, 2], [1, 2, 4, 1, 1, 2], [1, 2, 4, 2, 1, 1], [4, 1, 1, 2, 1, 2], [4, 2, 1, 1, 1, 2], [4, 2, 1, 2, 1, 1], [2, 1, 2, 1, 4, 1], [2, 1, 4, 1, 2, 1], [4, 1, 2, 1, 2, 1], [1, 1, 1, 1, 4, 3], [1, 1, 1, 3, 4, 1], [1, 3, 1, 1, 4, 1], [1, 1, 4, 1, 1, 3], [1, 1, 4, 3, 1, 1], [4, 1, 1, 1, 1, 3], [4, 1, 1, 3, 1, 1], [1, 1, 3, 1, 4, 1], [1, 1, 4, 1, 3, 1], [3, 1, 1, 1, 4, 1], [4, 1, 1, 1, 3, 1], [2, 1, 1, 4, 1, 2], [2, 1, 1, 2, 1, 4], [2, 1, 1, 2, 3, 2], [2, 3, 3, 1, 1, 1, 2]];
var MODULE_INDICES = {
  bar: [0, 2, 4],
  space: [1, 3, 5]
};
var Code128Reader =
/*#__PURE__*/
function (_BarcodeReader) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Code128Reader, _BarcodeReader);

  function Code128Reader() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Code128Reader);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Code128Reader).call(this));
    _this._format = 'code_128';
    _this._singleCodeError = 0.64;
    _this._averageCodeError = 0.30;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Code128Reader, [{
    key: "_decodeCode",
    value: function _decodeCode(start, correction) {
      var counter = [0, 0, 0, 0, 0, 0];
      var offset = start;
      var bestMatch = {
        error: Number.MAX_VALUE,
        code: -1,
        start: start,
        end: start,
        correction: {
          bar: 1,
          space: 1
        }
      };
      var epsilon = this.AVERAGE_CODE_ERROR;
      var isWhite = this._row[offset] ? 0 : 1;
      var counterPos = 0;

      for (var i = offset; i < this._row.length; i++) {
        if (this._row[i] ^ isWhite) {
          counter[counterPos]++;
        } else {
          if (counterPos === counter.length - 1) {
            if (correction) {
              this._correct(counter, correction);
            }

            for (var code = 0; code < CODE_PATTERN.length; code++) {
              var error = this._matchPattern(counter, CODE_PATTERN[code]);

              if (error < bestMatch.error) {
                bestMatch.code = code;
                bestMatch.error = error;
              }
            }

            bestMatch.end = i;

            if (bestMatch.code === -1 || bestMatch.error > epsilon) {
              return null;
            }

            var expected = CODE_PATTERN[bestMatch.code];

            if (expected) {
              bestMatch.correction.bar = this._calculateCorrection(expected, counter, MODULE_INDICES.bar);
              bestMatch.correction.space = this._calculateCorrection(expected, counter, MODULE_INDICES.space);
            }

            return bestMatch;
          } else {
            counterPos++;
          }

          counter[counterPos] = 1;
          isWhite = isWhite ? 0 : 1;
        }
      }

      return null;
    }
  }, {
    key: "_correct",
    value: function _correct(counter, correction) {
      this._correctBars(counter, correction.bar, MODULE_INDICES.bar);

      this._correctBars(counter, correction.space, MODULE_INDICES.space);
    }
  }, {
    key: "_findStart",
    value: function _findStart() {
      var counter = [0, 0, 0, 0, 0, 0];

      var offset = this._nextSet(this._row);

      var bestMatch = {
        error: Number.MAX_VALUE,
        code: -1,
        start: 0,
        end: 0,
        correction: {
          bar: 1,
          space: 1
        }
      };
      var epsilon = this.AVERAGE_CODE_ERROR;
      var isWhite = 0;
      var counterPos = 0;
      var sum;

      for (var i = offset; i < this._row.length; i++) {
        if (this._row[i] ^ isWhite) {
          counter[counterPos]++;
        } else {
          if (counterPos === counter.length - 1) {
            sum = 0;

            for (var j = 0; j < counter.length; j++) {
              sum += counter[j];
            }

            for (var code = START_CODE_A; code <= START_CODE_C; code++) {
              var error = this._matchPattern(counter, CODE_PATTERN[code]);

              if (error < bestMatch.error) {
                bestMatch.code = code;
                bestMatch.error = error;
              }
            }

            if (bestMatch.error < epsilon) {
              bestMatch.start = i - sum;
              bestMatch.end = i;
              bestMatch.correction.bar = this._calculateCorrection(CODE_PATTERN[bestMatch.code], counter, MODULE_INDICES.bar);
              bestMatch.correction.space = this._calculateCorrection(CODE_PATTERN[bestMatch.code], counter, MODULE_INDICES.space);
              return bestMatch;
            }

            for (var _j = 0; _j < 4; _j++) {
              counter[_j] = counter[_j + 2];
            }

            counter[4] = 0;
            counter[5] = 0;
            counterPos--;
          } else {
            counterPos++;
          }

          counter[counterPos] = 1;
          isWhite = isWhite ? 0 : 1;
        }
      }

      return null;
    }
  }, {
    key: "decode",
    value: function decode() {
      var result = new Array();

      var startInfo = this._findStart();

      var code = null;
      var done = false;
      var multiplier = 0;
      var checksum = 0;
      var codeset;
      var rawResult = new Array();
      var decodedCodes = new Array();
      var shiftNext = false;
      var unshift;
      var removeLastCharacter = true;

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
        case START_CODE_A:
          codeset = CODE_A;
          break;

        case START_CODE_B:
          codeset = CODE_B;
          break;

        case START_CODE_C:
          codeset = CODE_C;
          break;

        default:
          return null;
      }

      while (!done) {
        unshift = shiftNext;
        shiftNext = false;
        code = this._decodeCode(code.end, code.correction);

        if (code !== null) {
          if (code.code !== STOP_CODE) {
            removeLastCharacter = true;
          }

          if (code.code !== STOP_CODE) {
            rawResult.push(code.code);
            multiplier++;
            checksum += multiplier * code.code;
          }

          decodedCodes.push(code);

          switch (codeset) {
            case CODE_A:
              {
                if (code.code < 64) {
                  result.push(String.fromCharCode(32 + code.code));
                } else if (code.code < 96) {
                  result.push(String.fromCharCode(code.code - 64));
                } else {
                  if (code.code !== STOP_CODE) {
                    removeLastCharacter = false;
                  }

                  switch (code.code) {
                    case CODE_SHIFT:
                      shiftNext = true;
                      codeset = CODE_B;
                      break;

                    case CODE_B:
                      codeset = CODE_B;
                      break;

                    case CODE_C:
                      codeset = CODE_C;
                      break;

                    case STOP_CODE:
                      done = true;
                      break;
                  }
                }

                break;
              }

            case CODE_B:
              {
                if (code.code < 96) {
                  result.push(String.fromCharCode(32 + code.code));
                } else {
                  if (code.code !== STOP_CODE) {
                    removeLastCharacter = false;
                  }

                  switch (code.code) {
                    case CODE_SHIFT:
                      shiftNext = true;
                      codeset = CODE_A;
                      break;

                    case CODE_A:
                      codeset = CODE_A;
                      break;

                    case CODE_C:
                      codeset = CODE_C;
                      break;

                    case STOP_CODE:
                      done = true;
                      break;
                  }
                }

                break;
              }

            case CODE_C:
              {
                if (code.code < 100) {
                  result.push(code.code < 10 ? '0' + code.code : code.code);
                } else {
                  if (code.code !== STOP_CODE) {
                    removeLastCharacter = false;
                  }

                  switch (code.code) {
                    case CODE_A:
                      codeset = CODE_A;
                      break;

                    case CODE_B:
                      codeset = CODE_B;
                      break;

                    case STOP_CODE:
                      done = true;
                      break;
                  }
                }

                break;
              }
          }
        } else {
          done = true;
        }

        if (unshift) {
          codeset = codeset === CODE_A ? CODE_B : CODE_A;
        }
      }

      if (code === null) {
        return null;
      }

      code.end = this._nextUnset(this._row, code.end);

      if (!this._verifyTrailingWhitespace(code)) {
        return null;
      }

      checksum -= multiplier * rawResult[rawResult.length - 1];

      if (checksum % 103 !== rawResult[rawResult.length - 1]) {
        return null;
      }

      if (!result.length) {
        return null;
      } // remove last code from result (checksum)


      if (removeLastCharacter) {
        result.splice(result.length - 1, 1);
      }

      return {
        code: result.join(''),
        start: startInfo.start,
        end: code.end,
        codeset: codeset,
        startInfo: startInfo,
        decodedCodes: decodedCodes,
        endInfo: code
      };
    }
  }, {
    key: "_verifyTrailingWhitespace",
    value: function _verifyTrailingWhitespace(endInfo) {
      var trailingWhitespaceEnd = endInfo.end + (endInfo.end - endInfo.start) / 2;

      if (trailingWhitespaceEnd < this._row.length) {
        if (this._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
          return endInfo;
        }
      }

      return null;
    }
  }, {
    key: "_calculateCorrection",
    value: function _calculateCorrection(expected, normalized, indices) {
      var sumNormalized = 0;
      var sumExpected = 0;

      for (var length = indices.length; length--;) {
        sumExpected += expected[indices[length]];
        sumNormalized += normalized[indices[length]];
      }

      return sumExpected / sumNormalized;
    }
  }]);

  return Code128Reader;
}(_barcode_reader__WEBPACK_IMPORTED_MODULE_5__["BarcodeReader"]);

/***/ }),

/***/ "./src/reader/code-39-reader.ts":
/*!**************************************!*\
  !*** ./src/reader/code-39-reader.ts ***!
  \**************************************/
/*! exports provided: Code39Reader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Code39Reader", function() { return Code39Reader; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../../node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _barcode_reader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./barcode-reader */ "./src/reader/barcode-reader.ts");







var ASTERISK = 0x094;
var ALPHABETH_STRING = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. *$/+%';
var ALPHABET = new Uint16Array(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_5___default()(ALPHABETH_STRING).map(function (_char) {
  return _char.charCodeAt(0);
})); // const ALPHABET = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
//     79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 45, 46, 32, 42, 36, 47, 43, 37];

var CHARACTER_ENCODINGS = new Uint16Array([0x034, 0x121, 0x061, 0x160, 0x031, 0x130, 0x070, 0x025, 0x124, 0x064, 0x109, 0x049, 0x148, 0x019, 0x118, 0x058, 0x00D, 0x10C, 0x04C, 0x01C, 0x103, 0x043, 0x142, 0x013, 0x112, 0x052, 0x007, 0x106, 0x046, 0x016, 0x181, 0x0C1, 0x1C0, 0x091, 0x190, 0x0D0, 0x085, 0x184, 0x0C4, 0x094, 0x0A8, 0x0A2, 0x08A, 0x02A]);
var Code39Reader =
/*#__PURE__*/
function (_BarcodeReader) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Code39Reader, _BarcodeReader);

  function Code39Reader() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Code39Reader);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Code39Reader).call(this));
    _this._format = 'code_39';
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Code39Reader, [{
    key: "decode",
    value: function decode() {
      var start = this._findStart();

      if (!start) {
        return null;
      }

      var result = new Array();
      var counters = new Uint16Array(9);
      var decodedChar;
      var lastStart;

      var nextStart = this._nextSet(this._row, start.end);

      do {
        this._toCounters(nextStart, counters);

        var pattern = this._toPattern(counters);

        if (pattern < 0) {
          return null;
        }

        decodedChar = this._patternToChar(pattern);

        if (decodedChar === null) {
          return null;
        }

        result.push(decodedChar);
        lastStart = nextStart;
        nextStart += counters.reduce(function (sum, item) {
          return sum + item;
        }, 0);
        nextStart = this._nextSet(this._row, nextStart);
      } while (decodedChar !== '*');

      result.pop();

      if (!result.length) {
        return null;
      }

      if (!this._verifyTrailingWhitespace(lastStart, nextStart, counters)) {
        return null;
      }

      return {
        code: result.join(''),
        start: start.start,
        end: nextStart,
        startInfo: start,
        decodedCodes: result
      };
    }
  }, {
    key: "_patternToChar",
    value: function _patternToChar(pattern) {
      for (var i = 0; i < CHARACTER_ENCODINGS.length; i++) {
        if (CHARACTER_ENCODINGS[i] === pattern) {
          return String.fromCharCode(ALPHABET[i]);
        }
      }

      return null;
    }
  }, {
    key: "_verifyTrailingWhitespace",
    value: function _verifyTrailingWhitespace(lastStart, nextStart, counters) {
      var patternSize = counters.reduce(function (sum, item) {
        return sum + item;
      }, 0);
      var trailingWhitespaceEnd = nextStart - lastStart - patternSize;
      return trailingWhitespaceEnd * 3 >= patternSize;
    }
  }, {
    key: "_findNextWidth",
    value: function _findNextWidth(counters, current) {
      var minWidth = Number.MAX_VALUE;

      for (var i = 0; i < counters.length; i++) {
        if (counters[i] < minWidth && counters[i] > current) {
          minWidth = counters[i];
        }
      }

      return minWidth;
    }
  }, {
    key: "_toPattern",
    value: function _toPattern(counters) {
      var numCounters = counters.length;
      var maxNarrowWidth = 0;
      var numWideBars = numCounters;
      var wideBarWidth = 0;
      var pattern;

      while (numWideBars > 3) {
        maxNarrowWidth = this._findNextWidth(counters, maxNarrowWidth);
        numWideBars = 0;
        pattern = 0;

        for (var i = 0; i < numCounters; i++) {
          if (counters[i] > maxNarrowWidth) {
            pattern |= 1 << numCounters - 1 - i;
            numWideBars++;
            wideBarWidth += counters[i];
          }
        }

        if (numWideBars === 3) {
          for (var _i = 0; _i < numCounters && numWideBars > 0; _i++) {
            if (counters[_i] > maxNarrowWidth) {
              numWideBars--;

              if (counters[_i] * 2 >= wideBarWidth) {
                return -1;
              }
            }
          }

          return pattern;
        }
      }

      return -1;
    }
  }, {
    key: "_findStart",
    value: function _findStart() {
      var offset = this._nextSet(this._row);

      var patternStart = offset;
      var counter = new Uint16Array(9);
      var counterPos = 0;
      var isWhite = 0;
      var whiteSpaceMustStart;

      for (var i = offset; i < this._row.length; i++) {
        if (this._row[i] ^ isWhite) {
          counter[counterPos]++;
        } else {
          if (counterPos === counter.length - 1) {
            // find start pattern
            if (this._toPattern(counter) === ASTERISK) {
              whiteSpaceMustStart = Math.max(0, patternStart - (i - patternStart) / 4) | 0;

              if (this._matchRange(whiteSpaceMustStart, patternStart, 0)) {
                return {
                  start: patternStart,
                  end: i
                };
              }
            }

            patternStart += counter[0] + counter[1];

            for (var j = 0; j < 7; j++) {
              counter[j] = counter[j + 2];
            }

            counter[7] = 0;
            counter[8] = 0;
            counterPos--;
          } else {
            counterPos++;
          }

          counter[counterPos] = 1;
          isWhite = isWhite ? 0 : 1;
        }
      }

      return null;
    }
  }]);

  return Code39Reader;
}(_barcode_reader__WEBPACK_IMPORTED_MODULE_6__["BarcodeReader"]);

/***/ }),

/***/ "./src/reader/code-39-vin-reader.ts":
/*!******************************************!*\
  !*** ./src/reader/code-39-vin-reader.ts ***!
  \******************************************/
/*! exports provided: Code39VINReader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Code39VINReader", function() { return Code39VINReader; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../../node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _code_39_reader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./code-39-reader */ "./src/reader/code-39-reader.ts");







var Code39VINReader =
/*#__PURE__*/
function (_Code39Reader) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Code39VINReader, _Code39Reader);

  function Code39VINReader() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Code39VINReader);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Code39VINReader).call(this));
    _this._format = 'code_39_vin';
    return _this;
  }
  /**
   * @borrows
   * https://github.com/zxing/zxing/blob/master/core/src/main/java/com/google/zxing/client/result/VINResultParser.java
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Code39VINReader, [{
    key: "decode",
    value: function decode() {
      var result = _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Code39VINReader.prototype), "decode", this).call(this);

      if (!result) {
        return null;
      }

      var code = result.code;

      if (!code) {
        return null;
      }

      code = code.replace(/[IOQ]/g, '');

      if (!/[A-Z0-9]{17}/.test(code)) {
        if (true) {
          console.log('Failed AZ09 pattern code:', code);
        }

        return null;
      }

      if (!this._checkChecksum(code)) {
        return null;
      }

      result.code = code;
      return result;
    }
  }, {
    key: "_checkChecksum",
    value: function _checkChecksum(code) {
      // TODO
      return !!code;
    }
  }]);

  return Code39VINReader;
}(_code_39_reader__WEBPACK_IMPORTED_MODULE_6__["Code39Reader"]);

/***/ }),

/***/ "./src/reader/code-93-reader.ts":
/*!**************************************!*\
  !*** ./src/reader/code-93-reader.ts ***!
  \**************************************/
/*! exports provided: Code93Reader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Code93Reader", function() { return Code93Reader; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../../node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _barcode_reader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./barcode-reader */ "./src/reader/barcode-reader.ts");







var ALPHABETH_STRING = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%abcd*';
var ALPHABET = new Uint16Array(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_5___default()(ALPHABETH_STRING).map(function (_char) {
  return _char.charCodeAt(0);
}));
var CHARACTER_ENCODINGS = new Uint16Array([0x114, 0x148, 0x144, 0x142, 0x128, 0x124, 0x122, 0x150, 0x112, 0x10A, 0x1A8, 0x1A4, 0x1A2, 0x194, 0x192, 0x18A, 0x168, 0x164, 0x162, 0x134, 0x11A, 0x158, 0x14C, 0x146, 0x12C, 0x116, 0x1B4, 0x1B2, 0x1AC, 0x1A6, 0x196, 0x19A, 0x16C, 0x166, 0x136, 0x13A, 0x12E, 0x1D4, 0x1D2, 0x1CA, 0x16E, 0x176, 0x1AE, 0x126, 0x1DA, 0x1D6, 0x132, 0x15E]);
var ASTERISK = 0x15E;
var Code93Reader =
/*#__PURE__*/
function (_BarcodeReader) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Code93Reader, _BarcodeReader);

  function Code93Reader() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Code93Reader);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Code93Reader).call(this));
    _this._format = 'code_93';
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Code93Reader, [{
    key: "decode",
    value: function decode() {
      var start = this._findStart();

      if (!start) {
        return null;
      }

      var result = new Array();
      var counters = new Uint16Array(6);
      var decodedChar;
      var lastStart;

      var nextStart = this._nextSet(this._row, start.end);

      do {
        this._toCounters(nextStart, counters);

        var pattern = this._toPattern(counters);

        if (pattern < 0) {
          return null;
        }

        decodedChar = this._patternToChar(pattern);

        if (decodedChar === null) {
          return null;
        }

        result.push(decodedChar);
        lastStart = nextStart;
        nextStart += counters.reduce(function (sum, item) {
          return sum + item;
        }, 0);
        nextStart = this._nextSet(this._row, nextStart);
      } while (decodedChar !== '*');

      result.pop();

      if (!result.length) {
        return null;
      }

      if (!this._verifyEnd(lastStart, nextStart)) {
        return null;
      }

      if (!this._verifyChecksums(result)) {
        return null;
      }

      result = result.slice(0, result.length - 2);

      if ((result = this._decodeExtended(result)) === null) {
        return null;
      }

      return {
        code: result.join(''),
        start: start.start,
        end: nextStart,
        startInfo: start,
        decodedCodes: result
      };
    }
  }, {
    key: "_patternToChar",
    value: function _patternToChar(pattern) {
      for (var i = 0; i < CHARACTER_ENCODINGS.length; i++) {
        if (CHARACTER_ENCODINGS[i] === pattern) {
          return String.fromCharCode(ALPHABET[i]);
        }
      }

      return null;
    }
  }, {
    key: "_verifyEnd",
    value: function _verifyEnd(lastStart, nextStart) {
      if (lastStart === nextStart || !this._row[nextStart]) {
        return false;
      }

      return true;
    }
  }, {
    key: "_toPattern",
    value: function _toPattern(counters) {
      var numCounters = counters.length;
      var pattern = 0;
      var sum = 0;

      for (var i = 0; i < numCounters; i++) {
        sum += counters[i];
      }

      for (var _i = 0; _i < numCounters; _i++) {
        var normalized = Math.round(counters[_i] * 9 / sum);

        if (normalized < 1 || normalized > 4) {
          return -1;
        }

        if ((_i & 1) === 0) {
          for (var j = 0; j < normalized; j++) {
            pattern = pattern << 1 | 1;
          }
        } else {
          pattern <<= normalized;
        }
      }

      return pattern;
    }
  }, {
    key: "_findStart",
    value: function _findStart() {
      var counter = new Uint16Array(6);

      var offset = this._nextSet(this._row);

      var patternStart = offset;
      var counterPos = 0;
      var isWhite = 0;
      var whiteSpaceMustStart;

      for (var i = offset; i < this._row.length; i++) {
        if (this._row[i] ^ isWhite) {
          counter[counterPos]++;
        } else {
          if (counterPos === counter.length - 1) {
            // find start pattern
            if (this._toPattern(counter) === ASTERISK) {
              whiteSpaceMustStart = Math.max(0, patternStart - (i - patternStart) / 4) | 0;

              if (this._matchRange(whiteSpaceMustStart, patternStart, 0)) {
                return {
                  start: patternStart,
                  end: i
                };
              }
            }

            patternStart += counter[0] + counter[1];

            for (var j = 0; j < 4; j++) {
              counter[j] = counter[j + 2];
            }

            counter[4] = 0;
            counter[5] = 0;
            counterPos--;
          } else {
            counterPos++;
          }

          counter[counterPos] = 1;
          isWhite = isWhite ? 0 : 1;
        }
      }

      return null;
    }
  }, {
    key: "_decodeExtended",
    value: function _decodeExtended(charArray) {
      var length = charArray.length;
      var result = new Array();

      for (var i = 0; i < length; i++) {
        var _char2 = charArray[i];

        if (_char2 >= 'a' && _char2 <= 'd') {
          if (i > length - 2) {
            return null;
          }

          var nextChar = charArray[++i];
          var nextCharCode = nextChar.charCodeAt(0);
          var decodedChar = void 0;

          switch (_char2) {
            case 'a':
              {
                if (nextChar >= 'A' && nextChar <= 'Z') {
                  decodedChar = String.fromCharCode(nextCharCode - 64);
                } else {
                  return null;
                }

                break;
              }

            case 'b':
              {
                if (nextChar >= 'A' && nextChar <= 'E') {
                  decodedChar = String.fromCharCode(nextCharCode - 38);
                } else if (nextChar >= 'F' && nextChar <= 'J') {
                  decodedChar = String.fromCharCode(nextCharCode - 11);
                } else if (nextChar >= 'K' && nextChar <= 'O') {
                  decodedChar = String.fromCharCode(nextCharCode + 16);
                } else if (nextChar >= 'P' && nextChar <= 'S') {
                  decodedChar = String.fromCharCode(nextCharCode + 43);
                } else if (nextChar >= 'T' && nextChar <= 'Z') {
                  decodedChar = String.fromCharCode(127);
                } else {
                  return null;
                }

                break;
              }

            case 'c':
              {
                if (nextChar >= 'A' && nextChar <= 'O') {
                  decodedChar = String.fromCharCode(nextCharCode - 32);
                } else if (nextChar === 'Z') {
                  decodedChar = ':';
                } else {
                  return null;
                }

                break;
              }

            case 'd':
              {
                if (nextChar >= 'A' && nextChar <= 'Z') {
                  decodedChar = String.fromCharCode(nextCharCode + 32);
                } else {
                  return null;
                }

                break;
              }
          }

          result.push(decodedChar);
        } else {
          result.push(_char2);
        }
      }

      return result;
    }
  }, {
    key: "_verifyChecksums",
    value: function _verifyChecksums(charArray) {
      return this._matchCheckChar(charArray, charArray.length - 2, 20) && this._matchCheckChar(charArray, charArray.length - 1, 15);
    }
  }, {
    key: "_matchCheckChar",
    value: function _matchCheckChar(charArray, index, maxWeight) {
      var arrayToCheck = charArray.slice(0, index);
      var length = arrayToCheck.length;
      var weightedSums = arrayToCheck.reduce(function (sum, _char3, i) {
        var weight = (i * -1 + (length - 1)) % maxWeight + 1;
        var value = ALPHABET.indexOf(_char3.charCodeAt(0));
        return sum + weight * value;
      }, 0);
      var checkChar = ALPHABET[weightedSums % 47];
      return checkChar === charArray[index].charCodeAt(0);
    }
  }]);

  return Code93Reader;
}(_barcode_reader__WEBPACK_IMPORTED_MODULE_6__["BarcodeReader"]);

/***/ }),

/***/ "./src/reader/ean-2-reader.ts":
/*!************************************!*\
  !*** ./src/reader/ean-2-reader.ts ***!
  \************************************/
/*! exports provided: EAN2Reader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EAN2Reader", function() { return EAN2Reader; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ean_reader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ean-reader */ "./src/reader/ean-reader.ts");






var EAN2Reader =
/*#__PURE__*/
function (_EANReader) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(EAN2Reader, _EANReader);

  function EAN2Reader(config, supplements) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, EAN2Reader);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(EAN2Reader).call(this, config, supplements));
    _this._format = 'ean_2';
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(EAN2Reader, [{
    key: "decode",
    value: function decode(row, start) {
      var end = row.length;
      var result = new Array();
      var decodedCodes = new Array();
      var offset = start;
      var codeFrequency = 0;
      var code;
      this._row = row;

      for (var i = 0; i < 2 && offset < end; i++) {
        code = this._decodeCode(offset);

        if (!code) {
          return null;
        }

        decodedCodes.push(code);
        result.push(code.code % 10);

        if (code.code >= this.CODE_G_START) {
          codeFrequency |= 1 << 1 - i;
        }

        if (i !== 1) {
          offset = this._nextSet(this._row, code.end);
          offset = this._nextUnset(this._row, offset);
        }
      }

      if (result.length !== 2 || parseInt(result.join('')) % 4 !== codeFrequency) {
        return null;
      }

      return {
        code: result.join(''),
        decodedCodes: decodedCodes,
        end: code.end
      };
    }
  }]);

  return EAN2Reader;
}(_ean_reader__WEBPACK_IMPORTED_MODULE_5__["EANReader"]);

/***/ }),

/***/ "./src/reader/ean-5-reader.ts":
/*!************************************!*\
  !*** ./src/reader/ean-5-reader.ts ***!
  \************************************/
/*! exports provided: EAN5Reader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EAN5Reader", function() { return EAN5Reader; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ean_reader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ean-reader */ "./src/reader/ean-reader.ts");






var EAN5Reader =
/*#__PURE__*/
function (_EANReader) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(EAN5Reader, _EANReader);

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(EAN5Reader, [{
    key: "CHECK_DIGIT_ENCODINGS",
    get: function get() {
      return [24, 20, 18, 17, 12, 6, 3, 10, 9, 5];
    }
  }]);

  function EAN5Reader(config, supplements) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, EAN5Reader);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(EAN5Reader).call(this, config, supplements));
    _this._format = 'ean_5';
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(EAN5Reader, [{
    key: "decode",
    value: function decode(row, start) {
      var end = row.length;
      var result = new Array();
      var decodedCodes = new Array();
      var codeFrequency = 0;
      var offset = start;
      var code;
      this._row = row;

      for (var i = 0; i < 5 && offset < end; i++) {
        code = this._decodeCode(offset);

        if (!code) {
          return null;
        }

        decodedCodes.push(code);
        result.push(code.code % 10);

        if (code.code >= this.CODE_G_START) {
          codeFrequency |= 1 << 4 - i;
        }

        if (i !== 4) {
          offset = this._nextSet(this._row, code.end);
          offset = this._nextUnset(this._row, offset);
        }
      }

      if (result.length !== 5) {
        return null;
      }

      if (this._extensionChecksum(result) !== this._determineCheckDigit(codeFrequency)) {
        return null;
      }

      return {
        code: result.join(''),
        decodedCodes: decodedCodes,
        end: code.end
      };
    }
  }, {
    key: "_determineCheckDigit",
    value: function _determineCheckDigit(codeFrequency) {
      for (var i = 0; i < 10; i++) {
        if (codeFrequency === this.CHECK_DIGIT_ENCODINGS[i]) {
          return i;
        }
      }

      return null;
    }
  }, {
    key: "_extensionChecksum",
    value: function _extensionChecksum(result) {
      var length = result.length;
      var sum = 0;

      for (var i = length - 2; i >= 0; i -= 2) {
        sum += result[i];
      }

      sum *= 3;

      for (var _i = length - 1; _i >= 0; _i -= 2) {
        sum += result[_i];
      }

      sum *= 3;
      return sum % 10;
    }
  }]);

  return EAN5Reader;
}(_ean_reader__WEBPACK_IMPORTED_MODULE_5__["EANReader"]);

/***/ }),

/***/ "./src/reader/ean-8-reader.ts":
/*!************************************!*\
  !*** ./src/reader/ean-8-reader.ts ***!
  \************************************/
/*! exports provided: EAN8Reader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EAN8Reader", function() { return EAN8Reader; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ean_reader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ean-reader */ "./src/reader/ean-reader.ts");






var EAN8Reader =
/*#__PURE__*/
function (_EANReader) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(EAN8Reader, _EANReader);

  function EAN8Reader(config, supplements) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, EAN8Reader);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(EAN8Reader).call(this, config, supplements));
    _this._format = 'ean_8';
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(EAN8Reader, [{
    key: "_decodePayload",
    value: function _decodePayload(code, result, decodedCodes) {
      for (var i = 0; i < 4; i++) {
        code = this._decodeCode(code.end, this.CODE_G_START);

        if (!code) {
          return null;
        }

        result.push(code.code);
        decodedCodes.push(code);
      }

      code = this._findPattern(this.MIDDLE_PATTERN, code.end, 1, false);

      if (code === null) {
        return null;
      }

      decodedCodes.push(code);

      for (var _i = 0; _i < 4; _i++) {
        code = this._decodeCode(code.end, this.CODE_G_START);

        if (!code) {
          return null;
        }

        decodedCodes.push(code);
        result.push(code.code);
      }

      return code;
    }
  }]);

  return EAN8Reader;
}(_ean_reader__WEBPACK_IMPORTED_MODULE_5__["EANReader"]);

/***/ }),

/***/ "./src/reader/ean-reader.ts":
/*!**********************************!*\
  !*** ./src/reader/ean-reader.ts ***!
  \**********************************/
/*! exports provided: EANReader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EANReader", function() { return EANReader; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _common_merge__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/merge */ "./src/common/merge.ts");
/* harmony import */ var _barcode_reader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./barcode-reader */ "./src/reader/barcode-reader.ts");







function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



var EXTENSION_START_PATTERN = [1, 1, 2];
var CODE_PATTERN = [[3, 2, 1, 1], [2, 2, 2, 1], [2, 1, 2, 2], [1, 4, 1, 1], [1, 1, 3, 2], [1, 2, 3, 1], [1, 1, 1, 4], [1, 3, 1, 2], [1, 2, 1, 3], [3, 1, 1, 2], [1, 1, 2, 3], [1, 2, 2, 2], [2, 2, 1, 2], [1, 1, 4, 1], [2, 3, 1, 1], [1, 3, 2, 1], [4, 1, 1, 1], [2, 1, 3, 1], [3, 1, 2, 1], [2, 1, 1, 3]];
var CODE_FREQUENCY = [0, 11, 13, 14, 19, 25, 28, 21, 22, 26];
var EANReader =
/*#__PURE__*/
function (_BarcodeReader) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(EANReader, _BarcodeReader);

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(EANReader, [{
    key: "CODE_L_START",
    get: function get() {
      return 0;
    }
  }, {
    key: "CODE_G_START",
    get: function get() {
      return 10;
    }
  }, {
    key: "START_PATTERN",
    get: function get() {
      return [1, 1, 1];
    }
  }, {
    key: "STOP_PATTERN",
    get: function get() {
      return [1, 1, 1];
    }
  }, {
    key: "MIDDLE_PATTERN",
    get: function get() {
      return [1, 1, 1, 1, 1];
    }
  }]);

  function EANReader(config, supplements) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, EANReader);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(EANReader).call(this, Object(_common_merge__WEBPACK_IMPORTED_MODULE_6__["merge"])({
      supplements: [] // Allowed extensions to be decoded (2 and/or 5)

    }, config), supplements));
    _this._format = 'ean_13';
    _this._singleCodeError = 0.70;
    _this._averageCodeError = 0.48;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(EANReader, [{
    key: "_decodeCode",
    value: function _decodeCode(start, coderange) {
      var counter = [0, 0, 0, 0];
      var offset = start;
      var bestMatch = {
        error: Number.MAX_VALUE,
        code: -1,
        start: start,
        end: start
      };
      var epsilon = this.AVERAGE_CODE_ERROR;
      var isWhite = this._row[offset] ? 0 : 1;
      var counterPos = 0;

      if (!coderange) {
        coderange = CODE_PATTERN.length;
      }

      for (var i = offset; i < this._row.length; i++) {
        if (this._row[i] ^ isWhite) {
          counter[counterPos]++;
        } else {
          if (counterPos === counter.length - 1) {
            for (var code = 0; code < coderange; code++) {
              var error = this._matchPattern(counter, CODE_PATTERN[code]);

              if (error < bestMatch.error) {
                bestMatch.code = code;
                bestMatch.error = error;
              }
            }

            bestMatch.end = i;

            if (bestMatch.error > epsilon) {
              return null;
            }

            return bestMatch;
          } else {
            counterPos++;
          }

          counter[counterPos] = 1;
          isWhite = isWhite ? 0 : 1;
        }
      }

      return null;
    }
  }, {
    key: "_findStart",
    value: function _findStart() {
      var offset = this._nextSet(this._row);

      var startInfo;

      while (!startInfo) {
        startInfo = this._findPattern(this.START_PATTERN, offset, 0, true);

        if (!startInfo) {
          return null;
        }

        var leadingWhitespaceStart = startInfo.start - (startInfo.end - startInfo.start);

        if (leadingWhitespaceStart >= 0) {
          if (this._matchRange(leadingWhitespaceStart, startInfo.start, 0)) {
            return startInfo;
          }
        }

        offset = startInfo.end;
        startInfo = null;
      }

      return null;
    }
  }, {
    key: "_verifyTrailingWhitespace",
    value: function _verifyTrailingWhitespace(endInfo) {
      var trailingWhitespaceEnd = endInfo.end + (endInfo.end - endInfo.start);

      if (trailingWhitespaceEnd < this._row.length) {
        if (this._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
          return endInfo;
        }
      }

      return null;
    }
  }, {
    key: "_findEnd",
    value: function _findEnd(offset, isWhite) {
      var endInfo = this._findPattern(this.STOP_PATTERN, offset, isWhite, false);

      return endInfo !== null ? this._verifyTrailingWhitespace(endInfo) : null;
    }
  }, {
    key: "_calculateFirstDigit",
    value: function _calculateFirstDigit(codeFrequency) {
      for (var i = 0; i < CODE_FREQUENCY.length; i++) {
        if (codeFrequency === CODE_FREQUENCY[i]) {
          return i;
        }
      }

      return null;
    }
  }, {
    key: "_decodePayload",
    value: function _decodePayload(code, result, decodedCodes) {
      var codeFrequency = 0x0;

      for (var i = 0; i < 6; i++) {
        code = this._decodeCode(code.end);

        if (!code) {
          return null;
        }

        if (code.code >= this.CODE_G_START) {
          code.code -= this.CODE_G_START;
          codeFrequency |= 1 << 5 - i;
        } else {
          codeFrequency |= 0 << 5 - i;
        }

        result.push(code.code);
        decodedCodes.push(code);
      }

      var firstDigit = this._calculateFirstDigit(codeFrequency);

      if (firstDigit === null) {
        return null;
      }

      result.unshift(firstDigit);
      code = this._findPattern(this.MIDDLE_PATTERN, code.end, 1, false);

      if (code === null) {
        return null;
      }

      decodedCodes.push(code);

      for (var _i = 0; _i < 6; _i++) {
        code = this._decodeCode(code.end, this.CODE_G_START);

        if (!code) {
          return null;
        }

        decodedCodes.push(code);
        result.push(code.code);
      }

      return code;
    }
  }, {
    key: "decode",
    value: function decode() {
      var result = new Array();
      var decodedCodes = new Array();
      var resultInfo = {};

      var startInfo = this._findStart();

      if (!startInfo) {
        return null;
      }

      var code = {
        code: startInfo.code,
        start: startInfo.start,
        end: startInfo.end
      };
      decodedCodes.push(code);
      code = this._decodePayload(code, result, decodedCodes);

      if (!code) {
        return null;
      }

      code = this._findEnd(code.end, 0);

      if (!code) {
        return null;
      }

      decodedCodes.push(code); // Checksum

      if (!this._checksum(result)) {
        return null;
      }

      if (this.supplements.length > 0) {
        var supplement = this._decodeExtensions(code.end);

        if (!supplement) {
          return null;
        }

        var lastCode = supplement.decodedCodes[supplement.decodedCodes.length - 1];
        var endInfo = {
          start: lastCode.start + ((lastCode.end - lastCode.start) / 2 | 0),
          end: lastCode.end
        };

        if (!this._verifyTrailingWhitespace(endInfo)) {
          return null;
        }

        resultInfo = {
          supplement: supplement,
          code: result.join('') + supplement.code
        };
      }

      return _objectSpread({
        code: result.join(''),
        start: startInfo.start,
        end: code.end,
        startInfo: startInfo,
        decodedCodes: decodedCodes
      }, resultInfo);
    }
  }, {
    key: "_decodeExtensions",
    value: function _decodeExtensions(offset) {
      var start = this._nextSet(this._row, offset);

      var startInfo = this._findPattern(EXTENSION_START_PATTERN, start, 0, false);

      if (startInfo === null) {
        return null;
      }

      for (var i = 0; i < this.supplements.length; i++) {
        var result = this.supplements[i].decode(this._row, startInfo.end);

        if (result !== null) {
          return {
            code: result.code,
            start: start,
            startInfo: startInfo,
            end: result.end,
            decodedCodes: result.decodedCodes
          };
        }
      }

      return null;
    }
  }, {
    key: "_checksum",
    value: function _checksum(result) {
      var sum = 0;

      for (var i = result.length - 2; i >= 0; i -= 2) {
        sum += result[i];
      }

      sum *= 3;

      for (var _i2 = result.length - 1; _i2 >= 0; _i2 -= 2) {
        sum += result[_i2];
      }

      return sum % 10 === 0;
    }
  }]);

  return EANReader;
}(_barcode_reader__WEBPACK_IMPORTED_MODULE_7__["BarcodeReader"]);

/***/ }),

/***/ "./src/reader/i2of5-reader.ts":
/*!************************************!*\
  !*** ./src/reader/i2of5-reader.ts ***!
  \************************************/
/*! exports provided: I2of5Reader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I2of5Reader", function() { return I2of5Reader; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../../node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _common_merge__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/merge */ "./src/common/merge.ts");
/* harmony import */ var _barcode_reader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./barcode-reader */ "./src/reader/barcode-reader.ts");










var N = 1;
var W = 3;
var START_PATTERN = [N, N, N, N];
var STOP_PATTERN = [N, N, W];
var CODE_PATTERN = [[N, N, W, W, N], [W, N, N, N, W], [N, W, N, N, W], [W, W, N, N, N], [N, N, W, N, W], [W, N, W, N, N], [N, W, W, N, N], [N, N, N, W, W], [W, N, N, W, N], [N, W, N, W, N]];
var MAX_CORRECTION_FACTOR = 5;
var I2of5Reader =
/*#__PURE__*/
function (_BarcodeReader) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(I2of5Reader, _BarcodeReader);

  function I2of5Reader(config) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, I2of5Reader);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(I2of5Reader).call(this, Object(_common_merge__WEBPACK_IMPORTED_MODULE_8__["merge"])({
      normalizeBarSpaceWidth: false // Normalize the width difference between bars and spaces

    }, config)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "_barSpaceRatio", void 0);

    _this._barSpaceRatio = [1, 1];
    _this._format = 'i2of5';

    if (_this.config.normalizeBarSpaceWidth) {
      _this._singleCodeError = 0.38;
      _this._averageCodeError = 0.09;
    } else {
      _this._singleCodeError = 0.78;
      _this._averageCodeError = 0.38;
    }

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(I2of5Reader, [{
    key: "decode",
    value: function decode() {
      var startInfo = this._findStart();

      if (!startInfo) {
        return null;
      }

      var endInfo = this._findEnd();

      if (!endInfo) {
        return null;
      }

      var counters = this._fillCounters(startInfo.end, endInfo.start, 0);

      if (counters.length % 10 !== 0) {
        return null;
      }

      var result = new Array();
      var decodedCodes = new Array();
      decodedCodes.push(startInfo);

      var code = this._decodePayload(counters, result, decodedCodes);

      if (!code || result.length % 2 !== 0 || result.length < 6) {
        return null;
      }

      decodedCodes.push(endInfo);
      return {
        code: result.join(''),
        start: startInfo.start,
        end: endInfo.end,
        startInfo: startInfo,
        decodedCodes: decodedCodes
      };
    }
  }, {
    key: "_matchPattern",
    value: function _matchPattern(counter, code) {
      if (this.config.normalizeBarSpaceWidth) {
        var counterSum = [0, 0];
        var codeSum = [0, 0];
        var correction = [0, 0];
        var correctionRatio = MAX_CORRECTION_FACTOR;
        var correctionRatioInverse = 1 / correctionRatio;

        for (var i = 0; i < counter.length; i++) {
          counterSum[i % 2] += counter[i];
          codeSum[i % 2] += code[i];
        }

        correction[0] = codeSum[0] / counterSum[0];
        correction[1] = codeSum[1] / counterSum[1];
        correction[0] = Math.max(Math.min(correction[0], correctionRatio), correctionRatioInverse);
        correction[1] = Math.max(Math.min(correction[1], correctionRatio), correctionRatioInverse);
        this._barSpaceRatio = correction;

        for (var _i = 0; _i < counter.length; _i++) {
          counter[_i] *= this._barSpaceRatio[_i % 2];
        }
      }

      return _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(I2of5Reader.prototype), "_matchPattern", this).call(this, counter, code);
    }
  }, {
    key: "_findStart",
    value: function _findStart() {
      var offset = this._nextSet(this._row);

      var startInfo;

      while (!startInfo) {
        startInfo = this._findPattern(START_PATTERN, offset, 0, true);

        if (!startInfo) {
          return null;
        }

        var narrowBarWidth = startInfo.end - startInfo.start >> 2;
        var leadingWhitespaceStart = startInfo.start - narrowBarWidth * 10;

        if (leadingWhitespaceStart >= 0) {
          if (this._matchRange(leadingWhitespaceStart, startInfo.start, 0)) {
            return startInfo;
          }
        }

        offset = startInfo.end;
        startInfo = null;
      }

      return null;
    }
  }, {
    key: "_verifyTrailingWhitespace",
    value: function _verifyTrailingWhitespace(endInfo) {
      var trailingWhitespaceEnd = endInfo.end + (endInfo.end - endInfo.start) / 2;

      if (trailingWhitespaceEnd < this._row.length) {
        if (this._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
          return endInfo;
        }
      }

      return null;
    }
  }, {
    key: "_findEnd",
    value: function _findEnd() {
      this._row.reverse();

      var endInfo = this._findPattern(STOP_PATTERN, undefined, 0, false);

      this._row.reverse();

      if (endInfo === null) {
        return null;
      } // reverse numbers


      var start = endInfo.start;
      endInfo.start = this._row.length - endInfo.end;
      endInfo.end = this._row.length - start;
      return endInfo !== null ? this._verifyTrailingWhitespace(endInfo) : null;
    }
  }, {
    key: "_decodeCode",
    value: function _decodeCode(counter) {
      var bestMatch = {
        error: Number.MAX_VALUE,
        code: -1,
        start: 0,
        end: 0
      };

      for (var code = 0; code < CODE_PATTERN.length; code++) {
        var error = this._matchPattern(counter, CODE_PATTERN[code]);

        if (error < bestMatch.error) {
          bestMatch.code = code;
          bestMatch.error = error;
        }
      }

      return bestMatch.error < this.AVERAGE_CODE_ERROR ? bestMatch : null;
    }
  }, {
    key: "_decodePayload",
    value: function _decodePayload(counters, result, decodedCodes) {
      var counterLength = counters.length;
      var counter0 = [0, 0, 0, 0, 0];
      var counter1 = [0, 0, 0, 0, 0];
      var code0;
      var code1;
      var pos = 0;

      while (pos < counterLength) {
        for (var i = 0; i < 5; i++) {
          counter0[i] = counters[pos] * this._barSpaceRatio[0];
          counter1[i] = counters[pos + 1] * this._barSpaceRatio[1];
          pos += 2;
        }

        code0 = this._decodeCode(counter0);

        if (!code0) {
          return null;
        }

        code1 = this._decodeCode(counter1);

        if (!code1) {
          return null;
        }

        result.push(code0.code, code1.code);
        decodedCodes.push(code0, code1);
      }

      return [code0, code1];
    }
  }]);

  return I2of5Reader;
}(_barcode_reader__WEBPACK_IMPORTED_MODULE_9__["BarcodeReader"]);

/***/ }),

/***/ "./src/reader/index.ts":
/*!*****************************!*\
  !*** ./src/reader/index.ts ***!
  \*****************************/
/*! exports provided: Readers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Readers", function() { return Readers; });
/* harmony import */ var _code_128_reader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./code-128-reader */ "./src/reader/code-128-reader.ts");
/* harmony import */ var _code_39_reader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./code-39-reader */ "./src/reader/code-39-reader.ts");
/* harmony import */ var _code_39_vin_reader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./code-39-vin-reader */ "./src/reader/code-39-vin-reader.ts");
/* harmony import */ var _codabar_reader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./codabar-reader */ "./src/reader/codabar-reader.ts");
/* harmony import */ var _ean_reader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ean-reader */ "./src/reader/ean-reader.ts");
/* harmony import */ var _ean_8_reader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ean-8-reader */ "./src/reader/ean-8-reader.ts");
/* harmony import */ var _ean_2_reader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ean-2-reader */ "./src/reader/ean-2-reader.ts");
/* harmony import */ var _ean_5_reader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ean-5-reader */ "./src/reader/ean-5-reader.ts");
/* harmony import */ var _upc_reader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./upc-reader */ "./src/reader/upc-reader.ts");
/* harmony import */ var _upc_e_reader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./upc-e-reader */ "./src/reader/upc-e-reader.ts");
/* harmony import */ var _i2of5_reader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./i2of5-reader */ "./src/reader/i2of5-reader.ts");
/* harmony import */ var _2of5_reader__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./2of5-reader */ "./src/reader/2of5-reader.ts");
/* harmony import */ var _code_93_reader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./code-93-reader */ "./src/reader/code-93-reader.ts");













var Readers = {
  code_128_reader: _code_128_reader__WEBPACK_IMPORTED_MODULE_0__["Code128Reader"],
  ean_reader: _ean_reader__WEBPACK_IMPORTED_MODULE_4__["EANReader"],
  ean_5_reader: _ean_5_reader__WEBPACK_IMPORTED_MODULE_7__["EAN5Reader"],
  ean_2_reader: _ean_2_reader__WEBPACK_IMPORTED_MODULE_6__["EAN2Reader"],
  ean_8_reader: _ean_8_reader__WEBPACK_IMPORTED_MODULE_5__["EAN8Reader"],
  code_39_reader: _code_39_reader__WEBPACK_IMPORTED_MODULE_1__["Code39Reader"],
  code_39_vin_reader: _code_39_vin_reader__WEBPACK_IMPORTED_MODULE_2__["Code39VINReader"],
  codabar_reader: _codabar_reader__WEBPACK_IMPORTED_MODULE_3__["CodabarReader"],
  upc_reader: _upc_reader__WEBPACK_IMPORTED_MODULE_8__["UPCReader"],
  upc_e_reader: _upc_e_reader__WEBPACK_IMPORTED_MODULE_9__["UPCEReader"],
  i2of5_reader: _i2of5_reader__WEBPACK_IMPORTED_MODULE_10__["I2of5Reader"],
  '2of5_reader': _2of5_reader__WEBPACK_IMPORTED_MODULE_11__["TwoOfFiveReader"],
  code_93_reader: _code_93_reader__WEBPACK_IMPORTED_MODULE_12__["Code93Reader"]
};

/***/ }),

/***/ "./src/reader/upc-e-reader.ts":
/*!************************************!*\
  !*** ./src/reader/upc-e-reader.ts ***!
  \************************************/
/*! exports provided: UPCEReader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPCEReader", function() { return UPCEReader; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../../node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ean_reader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ean-reader */ "./src/reader/ean-reader.ts");







var CODE_FREQUENCY = [[56, 52, 50, 49, 44, 38, 35, 42, 41, 37], [7, 11, 13, 14, 19, 25, 28, 21, 22, 26]];
var UPCEReader =
/*#__PURE__*/
function (_EANReader) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(UPCEReader, _EANReader);

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(UPCEReader, [{
    key: "STOP_PATTERN",
    get: function get() {
      return [1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7];
    }
  }]);

  function UPCEReader(config, supplements) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, UPCEReader);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(UPCEReader).call(this, config, supplements));
    _this._format = 'upc_e';
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(UPCEReader, [{
    key: "_decodePayload",
    value: function _decodePayload(code, result, decodedCodes) {
      var codeFrequency = 0x0;

      for (var i = 0; i < 6; i++) {
        code = this._decodeCode(code.end);

        if (!code) {
          return null;
        }

        if (code.code >= this.CODE_G_START) {
          code.code = code.code - this.CODE_G_START;
          codeFrequency |= 1 << 5 - i;
        }

        result.push(code.code);
        decodedCodes.push(code);
      }

      if (!this._determineParity(codeFrequency, result)) {
        return null;
      }

      return code;
    }
  }, {
    key: "_determineParity",
    value: function _determineParity(codeFrequency, result) {
      for (var nrSystem = 0; nrSystem < CODE_FREQUENCY.length; nrSystem++) {
        for (var i = 0; i < CODE_FREQUENCY[nrSystem].length; i++) {
          if (codeFrequency === CODE_FREQUENCY[nrSystem][i]) {
            result.unshift(nrSystem);
            result.push(i);
            return true;
          }
        }
      }

      return false;
    }
  }, {
    key: "_convertToUPCA",
    value: function _convertToUPCA(result) {
      var lastDigit = result[result.length - 2];
      var upca = [result[0]];

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
    }
  }, {
    key: "_checksum",
    value: function _checksum(result) {
      return _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(UPCEReader.prototype), "_checksum", this).call(this, this._convertToUPCA(result));
    }
  }, {
    key: "_findEnd",
    value: function _findEnd(offset, isWhite) {
      isWhite = 1;
      return _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(UPCEReader.prototype), "_findEnd", this).call(this, offset, isWhite);
    }
  }, {
    key: "_verifyTrailingWhitespace",
    value: function _verifyTrailingWhitespace(endInfo) {
      var trailingWhitespaceEnd = endInfo.end + (endInfo.end - endInfo.start) / 2;

      if (trailingWhitespaceEnd < this._row.length) {
        if (this._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
          return endInfo;
        }
      }

      return null;
    }
  }]);

  return UPCEReader;
}(_ean_reader__WEBPACK_IMPORTED_MODULE_6__["EANReader"]);

/***/ }),

/***/ "./src/reader/upc-reader.ts":
/*!**********************************!*\
  !*** ./src/reader/upc-reader.ts ***!
  \**********************************/
/*! exports provided: UPCReader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPCReader", function() { return UPCReader; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../../node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ean_reader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ean-reader */ "./src/reader/ean-reader.ts");







var UPCReader =
/*#__PURE__*/
function (_EANReader) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(UPCReader, _EANReader);

  function UPCReader(config, supplements) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, UPCReader);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(UPCReader).call(this, config, supplements));
    _this._format = 'upc_a';
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(UPCReader, [{
    key: "decode",
    value: function decode() {
      var result = _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(UPCReader.prototype), "decode", this).call(this);

      if (result && result.code && result.code.length === 13 && result.code.charAt(0) === '0') {
        result.code = result.code.substring(1);
        return result;
      }

      return null;
    }
  }]);

  return UPCReader;
}(_ean_reader__WEBPACK_IMPORTED_MODULE_6__["EANReader"]);

/***/ })

/******/ })
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9RdWFnZ2Evd2VicGFjay9teU1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vUXVhZ2dhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1F1YWdnYS8vVXNlcnMvYWRvbXJhdGNoZXYvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vUXVhZ2dhLy9Vc2Vycy9hZG9tcmF0Y2hldi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJ3ZWJwYWNrOi8vUXVhZ2dhLy9Vc2Vycy9hZG9tcmF0Y2hldi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yLmpzIiwid2VicGFjazovL1F1YWdnYS8vVXNlcnMvYWRvbXJhdGNoZXYvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vUXVhZ2dhLy9Vc2Vycy9hZG9tcmF0Y2hldi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly9RdWFnZ2EvL1VzZXJzL2Fkb21yYXRjaGV2L25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL1F1YWdnYS8vVXNlcnMvYWRvbXJhdGNoZXYvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0LmpzIiwid2VicGFjazovL1F1YWdnYS8vVXNlcnMvYWRvbXJhdGNoZXYvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vUXVhZ2dhLy9Vc2Vycy9hZG9tcmF0Y2hldi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIndlYnBhY2s6Ly9RdWFnZ2EvL1VzZXJzL2Fkb21yYXRjaGV2L25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9RdWFnZ2EvL1VzZXJzL2Fkb21yYXRjaGV2L25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL25vbkl0ZXJhYmxlU3ByZWFkLmpzIiwid2VicGFjazovL1F1YWdnYS8vVXNlcnMvYWRvbXJhdGNoZXYvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcyIsIndlYnBhY2s6Ly9RdWFnZ2EvL1VzZXJzL2Fkb21yYXRjaGV2L25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NldFByb3RvdHlwZU9mLmpzIiwid2VicGFjazovL1F1YWdnYS8vVXNlcnMvYWRvbXJhdGNoZXYvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc3VwZXJQcm9wQmFzZS5qcyIsIndlYnBhY2s6Ly9RdWFnZ2EvL1VzZXJzL2Fkb21yYXRjaGV2L25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovL1F1YWdnYS8vVXNlcnMvYWRvbXJhdGNoZXYvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovL1F1YWdnYS8vVXNlcnMvYWRvbXJhdGNoZXYvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwid2VicGFjazovL1F1YWdnYS8vVXNlcnMvYWRvbXJhdGNoZXYvbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS1tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vUXVhZ2dhLy9Vc2Vycy9hZG9tcmF0Y2hldi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwid2VicGFjazovL1F1YWdnYS8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vUXVhZ2dhLy4vc3JjL2FuYWx5dGljcy9yZXN1bHQtY29sbGVjdG9yLnRzIiwid2VicGFjazovL1F1YWdnYS8uL3NyYy9jb21tb24vY2x1c3Rlci50cyIsIndlYnBhY2s6Ly9RdWFnZ2EvLi9zcmMvY29tbW9uL2V2ZW50cy50cyIsIndlYnBhY2s6Ly9RdWFnZ2EvLi9zcmMvY29tbW9uL2hzdjJyZ2IudHMiLCJ3ZWJwYWNrOi8vUXVhZ2dhLy4vc3JjL2NvbW1vbi9pbWFnZS1kZWJ1Zy50cyIsIndlYnBhY2s6Ly9RdWFnZ2EvLi9zcmMvY29tbW9uL2ltYWdlLXdyYXBwZXIudHMiLCJ3ZWJwYWNrOi8vUXVhZ2dhLy4vc3JjL2NvbW1vbi9tZWRpYS1kZXZpY2VzLnRzIiwid2VicGFjazovL1F1YWdnYS8uL3NyYy9jb21tb24vbWVyZ2UudHMiLCJ3ZWJwYWNrOi8vUXVhZ2dhLy4vc3JjL2NvbmZpZy9jb25maWcuZGV2LnRzIiwid2VicGFjazovL1F1YWdnYS8uL3NyYy9kZWNvZGVyL2JhcmNvZGUtZGVjb2Rlci50cyIsIndlYnBhY2s6Ly9RdWFnZ2EvLi9zcmMvZGVjb2Rlci9icmVzZW5oYW0udHMiLCJ3ZWJwYWNrOi8vUXVhZ2dhLy4vc3JjL2lucHV0L2NhbWVyYS1hY2Nlc3MudHMiLCJ3ZWJwYWNrOi8vUXVhZ2dhLy4vc3JjL2lucHV0L2V4aWYtaGVscGVyLnRzIiwid2VicGFjazovL1F1YWdnYS8uL3NyYy9pbnB1dC9mcmFtZS1ncmFiYmVyLnRzIiwid2VicGFjazovL1F1YWdnYS8uL3NyYy9pbnB1dC9pbWFnZS1sb2FkZXIudHMiLCJ3ZWJwYWNrOi8vUXVhZ2dhLy4vc3JjL2lucHV0L2ltYWdlLXN0cmVhbS50cyIsIndlYnBhY2s6Ly9RdWFnZ2EvLi9zcmMvaW5wdXQvaW5wdXQtc3RyZWFtLXV0aWxzLnRzIiwid2VicGFjazovL1F1YWdnYS8uL3NyYy9pbnB1dC9pbnB1dC1zdHJlYW0udHMiLCJ3ZWJwYWNrOi8vUXVhZ2dhLy4vc3JjL2lucHV0L2xpdmUtc3RyZWFtLnRzIiwid2VicGFjazovL1F1YWdnYS8uL3NyYy9pbnB1dC92aWRlby1zdHJlYW0udHMiLCJ3ZWJwYWNrOi8vUXVhZ2dhLy4vc3JjL2xvY2F0b3IvYmFyY29kZS1sb2NhdG9yLXV0aWxzLnRzIiwid2VicGFjazovL1F1YWdnYS8uL3NyYy9sb2NhdG9yL2JhcmNvZGUtbG9jYXRvci50cyIsIndlYnBhY2s6Ly9RdWFnZ2EvLi9zcmMvbG9jYXRvci9yYXN0ZXJpemVyLnRzIiwid2VicGFjazovL1F1YWdnYS8uL3NyYy9sb2NhdG9yL3NrZWxldG9uaXplci5qcyIsIndlYnBhY2s6Ly9RdWFnZ2EvLi9zcmMvbG9jYXRvci90cmFjZXIudHMiLCJ3ZWJwYWNrOi8vUXVhZ2dhLy4vc3JjL3F1YWdnYS50cyIsIndlYnBhY2s6Ly9RdWFnZ2EvLi9zcmMvcmVhZGVyLzJvZjUtcmVhZGVyLnRzIiwid2VicGFjazovL1F1YWdnYS8uL3NyYy9yZWFkZXIvYmFyY29kZS1yZWFkZXIudHMiLCJ3ZWJwYWNrOi8vUXVhZ2dhLy4vc3JjL3JlYWRlci9jb2RhYmFyLXJlYWRlci50cyIsIndlYnBhY2s6Ly9RdWFnZ2EvLi9zcmMvcmVhZGVyL2NvZGUtMTI4LXJlYWRlci50cyIsIndlYnBhY2s6Ly9RdWFnZ2EvLi9zcmMvcmVhZGVyL2NvZGUtMzktcmVhZGVyLnRzIiwid2VicGFjazovL1F1YWdnYS8uL3NyYy9yZWFkZXIvY29kZS0zOS12aW4tcmVhZGVyLnRzIiwid2VicGFjazovL1F1YWdnYS8uL3NyYy9yZWFkZXIvY29kZS05My1yZWFkZXIudHMiLCJ3ZWJwYWNrOi8vUXVhZ2dhLy4vc3JjL3JlYWRlci9lYW4tMi1yZWFkZXIudHMiLCJ3ZWJwYWNrOi8vUXVhZ2dhLy4vc3JjL3JlYWRlci9lYW4tNS1yZWFkZXIudHMiLCJ3ZWJwYWNrOi8vUXVhZ2dhLy4vc3JjL3JlYWRlci9lYW4tOC1yZWFkZXIudHMiLCJ3ZWJwYWNrOi8vUXVhZ2dhLy4vc3JjL3JlYWRlci9lYW4tcmVhZGVyLnRzIiwid2VicGFjazovL1F1YWdnYS8uL3NyYy9yZWFkZXIvaTJvZjUtcmVhZGVyLnRzIiwid2VicGFjazovL1F1YWdnYS8uL3NyYy9yZWFkZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vUXVhZ2dhLy4vc3JjL3JlYWRlci91cGMtZS1yZWFkZXIudHMiLCJ3ZWJwYWNrOi8vUXVhZ2dhLy4vc3JjL3JlYWRlci91cGMtcmVhZGVyLnRzIl0sIm5hbWVzIjpbIlJlc3VsdENvbGxlY3RvciIsImNvbmZpZyIsIl9yZXN1bHRzIiwiQXJyYXkiLCJfY29uZmlnIiwiX2NhcGFjaXR5IiwiY2FwYWNpdHkiLCJfY2FwdHVyZSIsImNhcHR1cmUiLCJfY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiX2NvbnRleHQiLCJnZXRDb250ZXh0IiwiZGF0YSIsImltYWdlV2lkdGgiLCJpbWFnZUhlaWdodCIsImNvZGVSZXN1bHQiLCJfY29udGFpbnMiLCJfcGFzc2VzRmlsdGVyIiwicmVzdWx0Iiwid2lkdGgiLCJoZWlnaHQiLCJJbWFnZURlYnVnIiwiZHJhd0ltYWdlIiwiZnJhbWUiLCJ0b0RhdGFVUkwiLCJwdXNoIiwiYmxhY2tsaXN0Iiwic29tZSIsIml0ZW0iLCJPYmplY3QiLCJrZXlzIiwiZXZlcnkiLCJrZXkiLCJmaWx0ZXIiLCJDbHVzdGVyIiwibW9tZW50cyIsInRocmVzaG9sZCIsImNsdXN0ZXJzIiwiZm9yRWFjaCIsIm1vbWVudCIsIm1hdGNoaW5nQ2x1c3RlciIsImZpbmQiLCJjbHVzdGVyIiwiZml0cyIsImFkZCIsIl90aHJlc2hvbGQiLCJfbW9tZW50cyIsIl9jZW50ZXIiLCJyYWQiLCJ4IiwieSIsInBvaW50IiwicmVkdWNlIiwic3VtIiwicCIsImxlbmd0aCIsIk1hdGgiLCJjb3MiLCJzaW4iLCJzaW1pbGFyaXR5IiwiYWJzIiwiZXZlbnRzIiwiRXZlbnRzIiwiZXZlbnQiLCJjYWxsYmFjayIsImFzeW5jIiwic3Vic2NyaXB0aW9uIiwiZ2V0RXZlbnQiLCJzdWJzY3JpcHRpb25zIiwidHlwZSIsImV2ZW50SXRlbSIsIm9uY2UiLCJwdWJsaXNoU3Vic2NyaXB0aW9uIiwic3Vic2NyaWJlIiwiZXZlbnROYW1lIiwic2V0VGltZW91dCIsImhzdjJyZ2IiLCJoc3YiLCJyZ2IiLCJoIiwicyIsInYiLCJjIiwibSIsInIiLCJnIiwiYiIsImRyYXdQYXRoIiwicGF0aCIsImNvbnRleHQiLCJjb2xvciIsImxpbmVXaWR0aCIsInN0cm9rZVN0eWxlIiwiZmlsbFN0eWxlIiwiYmVnaW5QYXRoIiwibW92ZVRvIiwic2xpY2UiLCJsaW5lVG8iLCJjbG9zZVBhdGgiLCJzdHJva2UiLCJpbWFnZURhdGEiLCJjYW52YXNEYXRhIiwiZ2V0SW1hZ2VEYXRhIiwiaW1hZ2VJbmRleCIsImNhbnZhc0luZGV4IiwidmFsdWUiLCJwdXRJbWFnZURhdGEiLCJJbWFnZVdyYXBwZXIiLCJzaXplIiwiYXJyYXlUeXBlIiwiaW5pdGlhbGl6ZSIsIlVpbnQ4QXJyYXkiLCJmaWxsIiwiYm9yZGVyIiwiaW1hZ2VXcmFwcGVyIiwiZnJvbVgiLCJmcm9tWSIsInNpemVZIiwic2l6ZVgiLCJpIiwibGFiZWxDb3VudCIsImxhYmVsU3VtIiwibTAwIiwibTAxIiwibTEwIiwibTExIiwibTAyIiwibTIwIiwidGhldGEiLCJ5c3EiLCJ2YWwiLCJsYWJlbCIsIlBJIiwiUElfNCIsImlzTmFOIiwieF8iLCJ5XyIsIm11MTEiLCJtdTAyIiwibXUyMCIsInRtcCIsImF0YW4iLCJzY2FsZSIsImN1cnJlbnQiLCJwaXhlbCIsImdldCIsIndoaXRlUmdiIiwiYmxhY2tSZ2IiLCJlbnVtZXJhdGVEZXZpY2VzIiwibmF2aWdhdG9yIiwibWVkaWFEZXZpY2VzIiwiUHJvbWlzZSIsInJlamVjdCIsIkVycm9yIiwiZ2V0VXNlck1lZGlhIiwiY29uc3RyYWludHMiLCJtZXJnZSIsImlzT2JqZWN0Iiwib2JqIiwib2JqZWN0cyIsInByZXYiLCJwVmFsIiwib1ZhbCIsImlzQXJyYXkiLCJpbnB1dFN0cmVhbSIsIm5hbWUiLCJmYWNpbmdNb2RlIiwiYXJlYSIsInRvcCIsInJpZ2h0IiwibGVmdCIsImJvdHRvbSIsInNpbmdsZUNoYW5uZWwiLCJsb2NhdGUiLCJudW1PZldvcmtlcnMiLCJkZWNvZGVyIiwicmVhZGVycyIsImRlYnVnIiwiZHJhd0JvdW5kaW5nQm94Iiwic2hvd0ZyZXF1ZW5jeSIsImRyYXdTY2FubGluZSIsInNob3dQYXR0ZXJuIiwibG9jYXRvciIsImhhbGZTYW1wbGUiLCJwYXRjaFNpemUiLCJzaG93Q2FudmFzIiwic2hvd1BhdGNoZXMiLCJzaG93Rm91bmRQYXRjaGVzIiwic2hvd1NrZWxldG9uIiwic2hvd0xhYmVscyIsInNob3dQYXRjaExhYmVscyIsInNob3dSZW1haW5pbmdQYXRjaExhYmVscyIsImJveEZyb21QYXRjaGVzIiwic2hvd1RyYW5zZm9ybWVkIiwic2hvd1RyYW5zZm9ybWVkQm94Iiwic2hvd0JCIiwiQmFyY29kZURlY29kZXIiLCJpbnB1dEltYWdlV3JhcHBlciIsIl9pbnB1dEltYWdlV3JhcHBlciIsIl9iYXJjb2RlUmVhZGVycyIsInByb2Nlc3MiLCJkZWJ1Z0RpdiIsInF1ZXJ5U2VsZWN0b3IiLCJfZnJlcXVlbmN5Q2FudmFzIiwiY2xhc3NOYW1lIiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImRpc3BsYXkiLCJfcGF0dGVybkNhbnZhcyIsIm92ZXJsYXlDYW52YXMiLCJfb3ZlcmxheUNvbnRleHQiLCJfaW5pdFJlYWRlcnMiLCJib3hlcyIsImJhcmNvZGUiLCJtdWx0aXBsZSIsImJhcmNvZGVzIiwibWFwIiwiYm94IiwiZGVjb2RlRnJvbUJvdW5kaW5nQm94IiwiX2RyYXdQYXRoIiwibGluZSIsIl9nZXRMaW5lIiwiYW5nbGUiLCJhdGFuMiIsIl9nZXRFeHRlbmRlZExpbmUiLCJfdHJ5RGVjb2RlIiwiX3RyeURlY29kZUJydXRlRm9yY2UiLCJwYXR0ZXJuIiwiYmFyY29kZUxpbmUiLCJyZWFkZXJDb25maWciLCJyZWFkZXIiLCJjb25maWd1cmF0aW9uIiwic3VwcGxlbWVudHMiLCJmb3JtYXQiLCJjb25zb2xlIiwibG9nIiwic3VwcGxlbWVudCIsIlJlYWRlcnMiLCJGT1JNQVQiLCJKU09OIiwic3RyaW5naWZ5IiwiZXh0ZW5kTGluZSIsImFtb3VudCIsImV4dGVuc2lvbiIsImxpbmVMZW5ndGgiLCJzcXJ0IiwiZXh0ZW5zaW9uTGVuZ3RoIiwiaW5JbWFnZVdpdGhCb3JkZXIiLCJCcmVzZW5oYW0iLCJnZXRCYXJjb2RlTGluZSIsIl9wcmludEZyZXF1ZW5jeSIsInRvQmluYXJ5TGluZSIsIl9wcmludFBhdHRlcm4iLCJkZWNvZGVQYXR0ZXJuIiwibGluZUFuZ2xlIiwic2lkZUxlbmd0aCIsInNsaWNlcyIsInhkaXIiLCJ5ZGlyIiwiZGlyIiwiZmlsbFJlY3QiLCJTbG9wZSIsInAxIiwicDIiLCJ4MCIsInkwIiwieDEiLCJ5MSIsInN0ZWVwIiwibWluIiwibWF4IiwicmVhZCIsImEiLCJkZWx0YXgiLCJkZWx0YXkiLCJlcnJvciIsInlzdGVwIiwiY2VudGVyIiwiZXh0cmVtYSIsInJUaHJlc2hvbGQiLCJjdXJyZW50RGlyIiwiVXAiLCJEb3duIiwicG9zIiwic2xvcGUiLCJzbG9wZTIiLCJqIiwiX3N0cmVhbSIsIkNhbWVyYUFjY2VzcyIsInJlcXVlc3QiLCJ2aWRlbyIsInZpZGVvQ29uc3RyYWludHMiLCJub3JtYWxpemVkQ29uc3RyYWludHMiLCJwaWNrQ29uc3RyYWludHMiLCJzcmNPYmplY3QiLCJzZXRBdHRyaWJ1dGUiLCJyZXNvbHZlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBsYXkiLCJ0aGVuIiwiX3dhaXRGb3JWaWRlbyIsImJpbmQiLCJyZWxlYXNlIiwidHJhY2tzIiwiZ2V0VmlkZW9UcmFja3MiLCJzdG9wIiwiZW51bWVyYXRlVmlkZW9EZXZpY2VzIiwiZGV2aWNlcyIsImtpbmQiLCJnZXRBY3RpdmVTdHJlYW1MYWJlbCIsInRyYWNrIiwiZ2V0QWN0aXZlVHJhY2siLCJhc3BlY3RSYXRpbyIsImRldmljZUlkIiwibWluQXNwZWN0UmF0aW8iLCJmYWNpbmciLCJhdWRpbyIsInZpZGVvV2lkdGgiLCJ2aWRlb0hlaWdodCIsImF0dGVtcHRzIiwiY2hlY2tWaWRlbyIsIndpbmRvdyIsIkV4aWZUYWdzIiwiQXZhaWxhYmxlVGFncyIsImZpbmRUYWdzSW5PYmplY3RVUkwiLCJzcmMiLCJ0YWdzIiwidGVzdCIsIm9iamVjdFVSTFRvQmxvYiIsImJ1ZmZlciIsImZpbmRUYWdzSW5CdWZmZXIiLCJmaWxlIiwic2VsZWN0ZWRUYWdzIiwiZGF0YVZpZXciLCJEYXRhVmlldyIsImJ5dGVMZW5ndGgiLCJleGlmVGFncyIsInNlbGVjdGVkVGFnIiwiZXhpZlRhZyIsInRhZyIsIm9mZnNldCIsImdldFVpbnQ4IiwibWFya2VyIiwicmVhZEVYSUZEYXRhIiwiZ2V0VWludDE2IiwidXJsIiwiZmV0Y2giLCJyZXNwb25zZSIsIm9rIiwiYXJyYXlCdWZmZXIiLCJzdGF0dXMiLCJzdGFydCIsInNwbGl0IiwiY2hhciIsImluZGV4IiwiY2hhckNvZGVBdCIsInRpZmZPZmZzZXQiLCJiaWdFbmQiLCJmaXJzdElGRE9mZnNldCIsImdldFVpbnQzMiIsInJlYWRUYWdzIiwiZGlyU3RhcnQiLCJzdHJpbmdzIiwiZW50cmllcyIsImVudHJ5T2Zmc2V0IiwicmVhZFRhZ1ZhbHVlIiwibnVtVmFsdWVzIiwidW5kZWZpbmVkIiwiUVVBVEVSX0NJUkNMRSIsIkZyYW1lR3JhYmJlciIsImNhbnZhcyIsIl9pbnB1dFN0cmVhbSIsIl9zdHJlYW1Db25maWciLCJfY2FudmFzV2lkdGgiLCJjYW52YXNXaWR0aCIsIl9jYW52YXNIZWlnaHQiLCJjYW52YXNIZWlnaHQiLCJfd2lkdGgiLCJfaGVpZ2h0IiwiX3RvcExlZnQiLCJ0b3BMZWZ0IiwiX2RhdGEiLCJ2aWRlb1NpemUiLCJyZWFsV2lkdGgiLCJyZWFsSGVpZ2h0IiwiY2FudmFzU2l6ZSIsImdldEZyYW1lIiwiX2FkanVzdENhbnZhc1NpemUiLCJkcmF3YWJsZSIsImRyYXdBbmdsZSIsIkhUTUxWaWRlb0VsZW1lbnQiLCJpbWFnZSIsIm9yaWVudGF0aW9uIiwiaGFsZldpZHRoIiwiaGFsZkhlaWdodCIsInRyYW5zbGF0ZSIsInJvdGF0ZSIsIl9ncmF5QW5kSGFsZlNhbXBsZUZyb21DYW52YXNEYXRhIiwiX2NvbXB1dGVHcmF5Iiwid2FybiIsImVuZEluZGV4Iiwib3V0V2lkdGgiLCJ0b3BSb3dJbmRleCIsImJvdHRvbVJvd0luZGV4Iiwib3V0SW1hZ2VJbmRleCIsInRvcDQiLCJib3R0b200IiwiaW1hZ2VEYXRhTGVuZ3RoIiwiSW1hZ2VMb2FkZXIiLCJiYXNlVXJpIiwic2VxdWVuY2UiLCJsb2FkZWQiLCJsb2FkZWRJbWFnZSIsIm5vdExvYWRlZEltYWdlcyIsInNwbGljZSIsImltYWdlU3JjcyIsImltYWdlTmFtZSIsInN1YnN0ciIsImxhc3RJbmRleE9mIiwibG9hZGVkSW1hZ2VzIiwiZmlyc3RJbWFnZSIsIkltYWdlIiwib25sb2FkIiwiSW1hZ2VTdHJlYW0iLCJfYmFzZVVybCIsIl9lbmRlZCIsIl9mcmFtZUluZGV4IiwiX2ltYWdlcyIsIl9sb2FkZWQiLCJfb2Zmc2V0IiwiX3BhdXNlZCIsIl9zaXplIiwidHJpZ2dlciIsImxvYWQiLCJpbWFnZXMiLCJfY2FsY3VsYXRlZFdpZHRoIiwiX2NhbGN1bGF0ZWRIZWlnaHQiLCJfbG9hZEltYWdlcyIsInRpbWUiLCJJbnB1dFN0cmVhbSIsIl9jb21wdXRlRGl2aXNvcnMiLCJuIiwiZGl2aXNvcnMiLCJsYXJnZURpdmlzb3JzIiwiZGl2aXNvciIsInVuc2hpZnQiLCJjb25jYXQiLCJfY29tcHV0ZUNvbW1vbkRpdmlzb3JzIiwibGFyZ2VEaXZpc29yIiwiY2FsY3VsYXRlUGF0Y2hTaXplIiwid2lkZVNpZGUiLCJuck9mUGF0Y2hlc0xpc3QiLCJuck9mUGF0Y2hlc01hcCIsInNtYWxsIiwibWVkaXVtIiwibGFyZ2UiLCJuck9mUGF0Y2hlc0luZGV4IiwibnJPZlBhdGNoZXMiLCJkZXNpcmVkUGF0Y2hTaXplIiwiZmluZFBhdGNoU2l6ZUZvckRpdmlzb3JzIiwiZm91bmQiLCJvcHRpbWFsUGF0Y2hTaXplIiwiY2hlY2tJbWFnZUNvbnN0cmFpbnRzIiwic2hpZnQiLCJpbnB1dFN0cmVhbUNvbmZpZyIsImNvbXB1dGVJbWFnZUFyZWEiLCJzZXRDYW52YXNTaXplIiwiX3BhcnNlQ3NzRGltZW5zaW9uVmFsdWVzIiwiZGltZW5zaW9uIiwicGFyc2VGbG9hdCIsInVuaXQiLCJpbmRleE9mIiwiX2RpbWVuc2lvbnNDb252ZXJ0ZXJzIiwiaW5wdXRXaWR0aCIsImlucHV0SGVpZ2h0IiwicGFyc2VkQXJlYSIsInBhcnNlZCIsImNhbGN1bGF0ZWQiLCJfZXZlbnROYW1lcyIsIl9ldmVudEhhbmRsZXJzIiwiTWFwIiwibGlzdGVuZXIiLCJfb3B0aW9ucyIsImhhcyIsInNldCIsImNsZWFyIiwiYXJnQXJyYXkiLCJoYW5kbGVycyIsImhhbmRsZXIiLCJhcHBseSIsIkxpdmVTdHJlYW0iLCJWaWRlb1N0cmVhbSIsIl92aWRlbyIsInBhdXNlIiwib3B0aW9ucyIsIl9pbml0U2l6ZSIsImVuZGVkIiwiY3VycmVudFRpbWUiLCJpbnZlcnQiLCJtYXRyaXgiLCJhMCIsImExIiwiYTIiLCJhMyIsImRldGVybWluYW50IiwiRmxvYXQzMkFycmF5IiwidHJhbnNmb3JtV2l0aE1hdHJpeCIsIl9jb21wdXRlSGlzdG9ncmFtIiwiYml0c1BlclBpeGVsIiwiYml0U2hpZnQiLCJidWNrZXRDb3VudCIsImhpc3RvZ3JhbSIsIkludDMyQXJyYXkiLCJfZGV0ZXJtaW5lT3RzdVRocmVzaG9sZCIsImhpc3QiLCJ2ZXQiLCJweCIsImluaXQiLCJlbmQiLCJteCIsImsiLCJwMTIiLCJtMSIsIm0yIiwibTEyIiwibWF4SW5kZXgiLCJhcnJheSIsIm90c3VUaHJlc2hvbGQiLCJ0YXJnZXRXcmFwcGVyIiwidGFyZ2V0RGF0YSIsIm91dEltYWdlV3JhcHBlciIsIm91dEltYWdlIiwib3V0SW1nSW5kZXgiLCJNb21lbnRTaW1pbGFyaXR5VGhyZXNob2xkIiwiQmFyY29kZUxvY2F0b3IiLCJfbnVtUGF0Y2hlcyIsIl9pbml0QnVmZmVycyIsIl9pbml0Q2FudmFzIiwiX2N1cnJlbnRJbWFnZVdyYXBwZXIiLCJfYmluYXJpemVJbWFnZSIsInBhdGNoZXNGb3VuZCIsIl9maW5kUGF0Y2hlcyIsIm1heExhYmVsIiwiX3Jhc3Rlcml6ZUFuZ3VsYXJTaW1pbGFyaXR5IiwidG9wTGFiZWxzIiwiX2ZpbmRCaWdnZXN0Q29ubmVjdGVkQXJlYXMiLCJfZmluZEJveGVzIiwiX3BhdGNoU2l6ZSIsIl9iaW5hcnlJbWFnZVdyYXBwZXIiLCJfbGFiZWxJbWFnZVdyYXBwZXIiLCJza2VsZXRvbkltYWdlRGF0YSIsIkFycmF5QnVmZmVyIiwiX3N1YkltYWdlV3JhcHBlciIsIl9za2VsSW1hZ2VXcmFwcGVyIiwiX3NrZWxldG9uaXplciIsInNrZWxldG9uaXplciIsInNlbGYiLCJnbG9iYWwiLCJfcGF0Y2hMYWJlbEdyaWQiLCJfcGF0Y2hHcmlkIiwiX2ltYWdlVG9QYXRjaEdyaWQiLCJ1c2VXb3JrZXIiLCJfYmluYXJ5Q29udGV4dCIsInBhdGNoZXMiLCJhdmVyYWdlUmFkIiwiX2RyYXdSZWN0IiwiaW52ZXJzZU1hdHJpeCIsIm1pblgiLCJtaW5ZIiwibWF4WCIsIm1heFkiLCJ2ZXJ0ZXgiLCJ6ZXJvQm9yZGVyIiwic2hvdyIsIl9za2VsZXRvbml6ZSIsInJhc3Rlcml6ZXIiLCJSYXN0ZXJpemVyIiwicmFzdGVyUmVzdWx0IiwicmFzdGVyaXplIiwib3ZlcmxheSIsImNvdW50IiwicGF0Y2giLCJfZGVzY3JpYmVQYXRjaCIsImxhYmVsSGlzdCIsInNvcnQiLCJfYm94RnJvbVBhdGNoZXMiLCJqb2luIiwiY2x1c3Rlcml6ZSIsInRvcENsdXN0ZXIiLCJzdWJJbWFnZUFzQ29weSIsInNrZWxldG9uaXplIiwibWluQ29tcG9uZW50V2VpZ2h0IiwiY2VpbCIsImVsaWdpYmxlTW9tZW50cyIsIm1hdGNoaW5nTW9tZW50cyIsIl9zaW1pbGFyTW9tZW50cyIsImN1cnJlbnRJbmRleCIsImN1cnJlbnRQYXRjaCIsIlNlYXJjaERpcmVjdGlvbnMiLCJkaXJlY3Rpb24iLCJOdW1iZXIiLCJNQVhfVkFMVUUiLCJfdHJhY2UiLCJfbm90WWV0UHJvY2Vzc2VkIiwic3Ryb2tlUmVjdCIsIkVkZ2VMYWJlbCIsIkNvbnRvdXJEaXJlY3Rpb24iLCJsYWJlbFdyYXBwZXIiLCJfaW1hZ2VEYXRhIiwiX2xhYmVsRGF0YSIsIl90cmFjZXIiLCJUcmFjZXIiLCJkZXB0aExhYmVsIiwiY29sb3JNYXAiLCJjYyIsInNjIiwiY29ubmVjdGVkQ291bnQiLCJjeSIsImxhYmVsSW5kZXgiLCJiYyIsImN4IiwibGMiLCJjb250b3VyVHJhY2luZyIsIk91dHNpZGUiLCJDVyIsImZpcnN0VmVydGV4IiwibmV4dFBlZXIiLCJpbnNpZGVDb250b3VycyIsInByZXZpb3VzUGVlciIsIkluc2lkZSIsIkNDVyIsImZpcnN0Q29udG91ciIsInBxIiwiaXEiLCJxIiwiVW5rbm93biIsIm5leHQiLCJTa2VsZXRvbml6ZXIiLCJzdGRsaWIiLCJmb3JlaWduIiwiaW11bCIsImVyb2RlIiwiaW5JbWFnZVB0ciIsIm91dEltYWdlUHRyIiwidSIsInlTdGFydDEiLCJ5U3RhcnQyIiwieFN0YXJ0MSIsInhTdGFydDIiLCJzdWJ0cmFjdCIsImFJbWFnZVB0ciIsImJJbWFnZVB0ciIsImJpdHdpc2VPciIsImNvdW50Tm9uWmVybyIsImltYWdlUHRyIiwiZGlsYXRlIiwibWVtY3B5Iiwic3JjSW1hZ2VQdHIiLCJkc3RJbWFnZVB0ciIsInN1YkltYWdlUHRyIiwiZXJvZGVkSW1hZ2VQdHIiLCJ0ZW1wSW1hZ2VQdHIiLCJza2VsSW1hZ2VQdHIiLCJkb25lIiwiZWRnZUxhYmVsIiwic3kiLCJzeCIsIkZ2IiwidHJhY2UiLCJDdiIsImxkaXIiLCJQIiwiX2ZyYW1lR3JhYmJlciIsIl9zdG9wcGVkIiwiX2NhbnZhc0NvbnRhaW5lciIsImN0eCIsImRvbSIsIl9sb2NhdG9yIiwiX2JveFNpemUiLCJfZGVjb2RlciIsIl93b3JrZXJQb29sIiwiX29uVUlUaHJlYWQiLCJfcmVzdWx0Q29sbGVjdG9yIiwiY2IiLCJkZWZhdWx0Q29uZmlnIiwiX2luaXRpYWxpemVEYXRhIiwiX2luaXRJbnB1dFN0cmVhbSIsIl9zdGFydENvbnRpbnVvdXNVcGRhdGUiLCJfdXBkYXRlIiwiX2FkanVzdFdvcmtlclBvb2wiLCJjbGVhckV2ZW50SGFuZGxlcnMiLCJkZWNvZGVTaW5nbGUiLCJyZXN1bHRDYWxsYmFjayIsImNhbGwiLCJvbkRldGVjdGVkIiwib2ZmRGV0ZWN0ZWQiLCJ1bnN1YnNjcmliZSIsIm9uUHJvY2Vzc2VkIiwib2ZmUHJvY2Vzc2VkIiwic2V0UmVhZGVycyIsIndvcmtlciIsInBvc3RNZXNzYWdlIiwiY21kIiwicmVnaXN0ZXJSZXN1bHRDb2xsZWN0b3IiLCJyZXN1bHRDb2xsZWN0b3IiLCJhZGRSZXN1bHQiLCJ2aWV3cG9ydCIsIl9nZXRWaWV3UG9ydCIsImVyciIsIl9jYW5SZWNvcmQiLCJ0YXJnZXQiLCJIVE1MRWxlbWVudCIsInNlbGVjdG9yIiwiY2xlYXJGaXgiLCJfdHJhbnNmb3JtIiwicG9seWdvbiIsIl90cmFuc2Zvcm1SZXN1bHQiLCJfYWRkUmVzdWx0IiwiX2hhc0NvZGVSZXN1bHQiLCJfcHVibGlzaFJlc3VsdCIsInJlc3VsdFRvUHVibGlzaCIsInB1Ymxpc2giLCJfbG9jYXRlQW5kRGVjb2RlIiwiZGVjb2RlRnJvbUJvdW5kaW5nQm94ZXMiLCJhdmFpbGFibGVXb3JrZXIiLCJidXN5IiwiZ3JhYiIsImRlbGF5IiwiZnJlcXVlbmN5IiwidGltZXN0YW1wIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicGVyZm9ybWFuY2UiLCJub3ciLCJfaW5pdFdvcmtlciIsImJsb2JVUkwiLCJfZ2VuZXJhdGVXb3JrZXJCbG9iIiwid29ya2VyVGhyZWFkIiwiV29ya2VyIiwib25tZXNzYWdlIiwiVVJMIiwicmV2b2tlT2JqZWN0VVJMIiwibWVzc2FnZSIsIl93b3JrZXJJbnRlcmZhY2UiLCJmYWN0b3J5IiwiUXVhZ2dhIiwiZmFjdG9yeVNvdXJjZSIsIl9fZmFjdG9yeVNvdXJjZV9fIiwiYmxvYiIsIkJsb2IiLCJ0b1N0cmluZyIsImNyZWF0ZU9iamVjdFVSTCIsImluY3JlYXNlQnkiLCJ0ZXJtaW5hdGUiLCJOIiwiVyIsIlNUQVJUX1BBVFRFUk4iLCJTVE9QX1BBVFRFUk4iLCJDT0RFX1BBVFRFUk4iLCJzdGFydFBhdHRlcm5MZW5ndGgiLCJUd29PZkZpdmVSZWFkZXIiLCJfYmFyU3BhY2VSYXRpbyIsIl9mb3JtYXQiLCJfc2luZ2xlQ29kZUVycm9yIiwiX2F2ZXJhZ2VDb2RlRXJyb3IiLCJzdGFydEluZm8iLCJfZmluZFN0YXJ0IiwiZW5kSW5mbyIsIl9maW5kRW5kIiwiY291bnRlcnMiLCJfZmlsbENvdW50ZXJzIiwiZGVjb2RlZENvZGVzIiwiY29kZSIsIl9kZWNvZGVQYXlsb2FkIiwiX25leHRTZXQiLCJfcm93IiwibmFycm93QmFyV2lkdGgiLCJfZmluZFBhdHRlcm4iLCJsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0IiwiX21hdGNoUmFuZ2UiLCJ0cmFpbGluZ1doaXRlc3BhY2VFbmQiLCJyZXZlcnNlIiwiX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZSIsImNvdW50ZXIiLCJiZXN0TWF0Y2giLCJfbWF0Y2hQYXR0ZXJuIiwiQVZFUkFHRV9DT0RFX0VSUk9SIiwiY291bnRlckxlbmd0aCIsIl9kZWNvZGVDb2RlIiwiQmFyY29kZVJlYWRlciIsIkJhcmNvZGVEaXJlY3Rpb24iLCJTdGFydE5vdEZvdW5kRXhjZXB0aW9uIiwiQ29kZU5vdEZvdW5kRXhjZXB0aW9uIiwiUGF0dGVybk5vdEZvdW5kRXhjZXB0aW9uIiwiaXNXaGl0ZSIsInRyeUhhcmRlciIsImVwc2lsb24iLCJjb3VudGVyUG9zIiwibWF4U2luZ2xlRXJyb3IiLCJtb2R1bG8iLCJTSU5HTEVfQ09ERV9FUlJPUiIsImJhcldpZHRoIiwic2NhbGVkIiwic2luZ2xlRXJyb3IiLCJjb3JyZWN0aW9uIiwiaW5kaWNlcyIsImRlY29kZSIsIlJldmVyc2UiLCJGb3J3YXJkIiwibnVtQ291bnRlcnMiLCJBTFBIQUJFVEhfU1RSSU5HIiwiQUxQSEFCRVQiLCJDSEFSQUNURVJfRU5DT0RJTkdTIiwiU1RBUlRfRU5EIiwiTUlOX0VOQ09ERURfQ0hBUlMiLCJNQVhfQUNDRVBUQUJMRSIsIlBBRERJTkciLCJDb2RhYmFyUmVhZGVyIiwiX2NvdW50ZXJzIiwiX25leHRVbnNldCIsIm5leHRTdGFydCIsInN0YXJ0Q291bnRlciIsIl90b1BhdHRlcm4iLCJkZWNvZGVkQ2hhciIsIl9wYXR0ZXJuVG9DaGFyIiwiX3ZlcmlmeVdoaXRlc3BhY2UiLCJfdmFsaWRhdGVSZXN1bHQiLCJfc3VtQ291bnRlcnMiLCJlbmRDb3VudGVyIiwiX2NhbGN1bGF0ZVBhdHRlcm5MZW5ndGgiLCJjYXRlZ29yaXphdGlvbiIsInNwYWNlIiwibmFycm93IiwiY291bnRzIiwid2lkZSIsImJhciIsIl9jaGFyVG9QYXR0ZXJuIiwiY2F0IiwiZmxvb3IiLCJjaGFyQ29kZSIsIl90aHJlc2hvbGRSZXN1bHRQYXR0ZXJuIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiYmFyVGhyZXNob2xkIiwiX2NvbXB1dGVBbHRlcm5hdGluZ1RocmVzaG9sZCIsInNwYWNlVGhyZXNob2xkIiwiYml0bWFzayIsIkNPREVfU0hJRlQiLCJDT0RFX0MiLCJDT0RFX0IiLCJDT0RFX0EiLCJTVEFSVF9DT0RFX0EiLCJTVEFSVF9DT0RFX0IiLCJTVEFSVF9DT0RFX0MiLCJTVE9QX0NPREUiLCJNT0RVTEVfSU5ESUNFUyIsIkNvZGUxMjhSZWFkZXIiLCJfY29ycmVjdCIsImV4cGVjdGVkIiwiX2NhbGN1bGF0ZUNvcnJlY3Rpb24iLCJfY29ycmVjdEJhcnMiLCJtdWx0aXBsaWVyIiwiY2hlY2tzdW0iLCJjb2Rlc2V0IiwicmF3UmVzdWx0Iiwic2hpZnROZXh0IiwicmVtb3ZlTGFzdENoYXJhY3RlciIsIm5vcm1hbGl6ZWQiLCJzdW1Ob3JtYWxpemVkIiwic3VtRXhwZWN0ZWQiLCJBU1RFUklTSyIsIlVpbnQxNkFycmF5IiwiQ29kZTM5UmVhZGVyIiwibGFzdFN0YXJ0IiwiX3RvQ291bnRlcnMiLCJwb3AiLCJwYXR0ZXJuU2l6ZSIsIm1pbldpZHRoIiwibWF4TmFycm93V2lkdGgiLCJudW1XaWRlQmFycyIsIndpZGVCYXJXaWR0aCIsIl9maW5kTmV4dFdpZHRoIiwicGF0dGVyblN0YXJ0Iiwid2hpdGVTcGFjZU11c3RTdGFydCIsIkNvZGUzOVZJTlJlYWRlciIsInJlcGxhY2UiLCJfY2hlY2tDaGVja3N1bSIsIkNvZGU5M1JlYWRlciIsIl92ZXJpZnlFbmQiLCJfdmVyaWZ5Q2hlY2tzdW1zIiwiX2RlY29kZUV4dGVuZGVkIiwicm91bmQiLCJjaGFyQXJyYXkiLCJuZXh0Q2hhciIsIm5leHRDaGFyQ29kZSIsIl9tYXRjaENoZWNrQ2hhciIsIm1heFdlaWdodCIsImFycmF5VG9DaGVjayIsIndlaWdodGVkU3VtcyIsIndlaWdodCIsImNoZWNrQ2hhciIsIkVBTjJSZWFkZXIiLCJyb3ciLCJjb2RlRnJlcXVlbmN5IiwiQ09ERV9HX1NUQVJUIiwicGFyc2VJbnQiLCJFQU5SZWFkZXIiLCJFQU41UmVhZGVyIiwiX2V4dGVuc2lvbkNoZWNrc3VtIiwiX2RldGVybWluZUNoZWNrRGlnaXQiLCJDSEVDS19ESUdJVF9FTkNPRElOR1MiLCJFQU44UmVhZGVyIiwiTUlERExFX1BBVFRFUk4iLCJFWFRFTlNJT05fU1RBUlRfUEFUVEVSTiIsIkNPREVfRlJFUVVFTkNZIiwiY29kZXJhbmdlIiwiZmlyc3REaWdpdCIsIl9jYWxjdWxhdGVGaXJzdERpZ2l0IiwicmVzdWx0SW5mbyIsIl9jaGVja3N1bSIsIl9kZWNvZGVFeHRlbnNpb25zIiwibGFzdENvZGUiLCJNQVhfQ09SUkVDVElPTl9GQUNUT1IiLCJJMm9mNVJlYWRlciIsIm5vcm1hbGl6ZUJhclNwYWNlV2lkdGgiLCJjb3VudGVyU3VtIiwiY29kZVN1bSIsImNvcnJlY3Rpb25SYXRpbyIsImNvcnJlY3Rpb25SYXRpb0ludmVyc2UiLCJjb3VudGVyMCIsImNvdW50ZXIxIiwiY29kZTAiLCJjb2RlMSIsImNvZGVfMTI4X3JlYWRlciIsImVhbl9yZWFkZXIiLCJlYW5fNV9yZWFkZXIiLCJlYW5fMl9yZWFkZXIiLCJlYW5fOF9yZWFkZXIiLCJjb2RlXzM5X3JlYWRlciIsImNvZGVfMzlfdmluX3JlYWRlciIsImNvZGFiYXJfcmVhZGVyIiwidXBjX3JlYWRlciIsIlVQQ1JlYWRlciIsInVwY19lX3JlYWRlciIsIlVQQ0VSZWFkZXIiLCJpMm9mNV9yZWFkZXIiLCJjb2RlXzkzX3JlYWRlciIsIl9kZXRlcm1pbmVQYXJpdHkiLCJuclN5c3RlbSIsImxhc3REaWdpdCIsInVwY2EiLCJfY29udmVydFRvVVBDQSIsImNoYXJBdCIsInN1YnN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRCxXO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBLGlEQUFpRCxnQkFBZ0I7QUFDakU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0M7Ozs7Ozs7Ozs7O0FDVkE7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxLQUFLO0FBQ0wsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0NBQW9DLGNBQWM7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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NkQ7QUFDekQsaUJBQU9iLE9BQVA7QUFDSDtBQUNKOztBQUVELGFBQU8sSUFBUDtBQUNIO0FBcEZMOztBQUFBO0FBQUEsRUFBZ0MySSxxREFBaEMsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFFTyxJQUFNb0MsU0FBYjtBQUFBO0FBQUE7QUFBQTs7QUFDSSxxQkFBWTk2QixNQUFaLEVBQTBDeU8sV0FBMUMsRUFBOEU7QUFBQTs7QUFBQTs7QUFDMUUsNk1BQU16TyxNQUFOLEVBQWN5TyxXQUFkO0FBRUEsVUFBS2loQixPQUFMLEdBQWUsT0FBZjtBQUgwRTtBQUk3RTs7QUFMTDtBQUFBO0FBQUEsNkJBT3NCO0FBQ2QsVUFBTXZ1QixNQUFNLEdBQUcsK0xBQWY7O0FBRUEsVUFBSUEsTUFBTSxJQUFJQSxNQUFNLENBQUNpdkIsSUFBakIsSUFBeUJqdkIsTUFBTSxDQUFDaXZCLElBQVAsQ0FBWTVzQixNQUFaLEtBQXVCLEVBQWhELElBQXNEckMsTUFBTSxDQUFDaXZCLElBQVAsQ0FBWW9MLE1BQVosQ0FBbUIsQ0FBbkIsTUFBMEIsR0FBcEYsRUFBeUY7QUFDckZyNkIsY0FBTSxDQUFDaXZCLElBQVAsR0FBY2p2QixNQUFNLENBQUNpdkIsSUFBUCxDQUFZcUwsU0FBWixDQUFzQixDQUF0QixDQUFkO0FBQ0EsZUFBT3Q2QixNQUFQO0FBQ0g7O0FBRUQsYUFBTyxJQUFQO0FBQ0g7QUFoQkw7O0FBQUE7QUFBQSxFQUErQnUzQixxREFBL0IsRSIsImZpbGUiOiJxdWFnZ2EuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoZmFjdG9yeS50b1N0cmluZygpKS5kZWZhdWx0O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGV4cG9ydHNbXCJRdWFnZ2FcIl0gPSBmYWN0b3J5KGZhY3RvcnkudG9TdHJpbmcoKSkuZGVmYXVsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290W1wiUXVhZ2dhXCJdID0gZmFjdG9yeShmYWN0b3J5LnRvU3RyaW5nKCkpLmRlZmF1bHQ7XG4gICAgfVxufSkodGhpcywgZnVuY3Rpb24oX19mYWN0b3J5U291cmNlX18pIHtcbiAgICByZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3F1YWdnYS50c1wiKTtcbiIsImZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBhcnIyO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aG91dEhvbGVzOyIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZDsiLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXN5bmNUb0dlbmVyYXRvcjsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJ2YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi9nZXRQcm90b3R5cGVPZlwiKTtcblxudmFyIHN1cGVyUHJvcEJhc2UgPSByZXF1aXJlKFwiLi9zdXBlclByb3BCYXNlXCIpO1xuXG5mdW5jdGlvbiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBSZWZsZWN0LmdldCkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX2dldCA9IFJlZmxlY3QuZ2V0O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX2dldCA9IGZ1bmN0aW9uIF9nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgICAgIHZhciBiYXNlID0gc3VwZXJQcm9wQmFzZSh0YXJnZXQsIHByb3BlcnR5KTtcbiAgICAgIGlmICghYmFzZSkgcmV0dXJuO1xuICAgICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGJhc2UsIHByb3BlcnR5KTtcblxuICAgICAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgICAgIHJldHVybiBkZXNjLmdldC5jYWxsKHJlY2VpdmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlc2MudmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyIHx8IHRhcmdldCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2dldDsiLCJmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gICAgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTtcbiAgfTtcbiAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2Y7IiwidmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vc2V0UHJvdG90eXBlT2ZcIik7XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIHNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW5oZXJpdHM7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGl0ZXIpIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVyKSA9PT0gXCJbb2JqZWN0IEFyZ3VtZW50c11cIikgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheTsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVTcHJlYWQ7IiwidmFyIF90eXBlb2YgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQgPSByZXF1aXJlKFwiLi9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcIik7XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcbiAgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICByZXR1cm4gY2FsbDtcbiAgfVxuXG4gIHJldHVybiBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm47IiwiZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgICBvLl9fcHJvdG9fXyA9IHA7XG4gICAgcmV0dXJuIG87XG4gIH07XG5cbiAgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2Y7IiwidmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vZ2V0UHJvdG90eXBlT2ZcIik7XG5cbmZ1bmN0aW9uIF9zdXBlclByb3BCYXNlKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgd2hpbGUgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkpIHtcbiAgICBvYmplY3QgPSBnZXRQcm90b3R5cGVPZihvYmplY3QpO1xuICAgIGlmIChvYmplY3QgPT09IG51bGwpIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc3VwZXJQcm9wQmFzZTsiLCJ2YXIgYXJyYXlXaXRob3V0SG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhvdXRIb2xlc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheSA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheVwiKTtcblxudmFyIG5vbkl0ZXJhYmxlU3ByZWFkID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVTcHJlYWRcIik7XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdG9Db25zdW1hYmxlQXJyYXk7IiwiZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2YyKG9iaik7IH1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mMihTeW1ib2wuaXRlcmF0b3IpID09PSBcInN5bWJvbFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2Y7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZVwiKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuLy8gVGhpcyBtZXRob2Qgb2Ygb2J0YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0IG5lZWRzIHRvIGJlXG4vLyBrZXB0IGlkZW50aWNhbCB0byB0aGUgd2F5IGl0IGlzIG9idGFpbmVkIGluIHJ1bnRpbWUuanNcbnZhciBnID0gKGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcyB8fCAodHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgJiYgc2VsZik7XG59KSgpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcblxuLy8gVXNlIGBnZXRPd25Qcm9wZXJ0eU5hbWVzYCBiZWNhdXNlIG5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCBjYWxsaW5nXG4vLyBgaGFzT3duUHJvcGVydHlgIG9uIHRoZSBnbG9iYWwgYHNlbGZgIG9iamVjdCBpbiBhIHdvcmtlci4gU2VlICMxODMuXG52YXIgaGFkUnVudGltZSA9IGcucmVnZW5lcmF0b3JSdW50aW1lICYmXG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGcpLmluZGV4T2YoXCJyZWdlbmVyYXRvclJ1bnRpbWVcIikgPj0gMDtcblxuLy8gU2F2ZSB0aGUgb2xkIHJlZ2VuZXJhdG9yUnVudGltZSBpbiBjYXNlIGl0IG5lZWRzIHRvIGJlIHJlc3RvcmVkIGxhdGVyLlxudmFyIG9sZFJ1bnRpbWUgPSBoYWRSdW50aW1lICYmIGcucmVnZW5lcmF0b3JSdW50aW1lO1xuXG4vLyBGb3JjZSByZWV2YWx1dGF0aW9uIG9mIHJ1bnRpbWUuanMuXG5nLnJlZ2VuZXJhdG9yUnVudGltZSA9IHVuZGVmaW5lZDtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9ydW50aW1lXCIpO1xuXG5pZiAoaGFkUnVudGltZSkge1xuICAvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBydW50aW1lLlxuICBnLnJlZ2VuZXJhdG9yUnVudGltZSA9IG9sZFJ1bnRpbWU7XG59IGVsc2Uge1xuICAvLyBSZW1vdmUgdGhlIGdsb2JhbCBwcm9wZXJ0eSBhZGRlZCBieSBydW50aW1lLmpzLlxuICB0cnkge1xuICAgIGRlbGV0ZSBnLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgfSBjYXRjaChlKSB7XG4gICAgZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuIShmdW5jdGlvbihnbG9iYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICB2YXIgaW5Nb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiO1xuICB2YXIgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWU7XG4gIGlmIChydW50aW1lKSB7XG4gICAgaWYgKGluTW9kdWxlKSB7XG4gICAgICAvLyBJZiByZWdlbmVyYXRvclJ1bnRpbWUgaXMgZGVmaW5lZCBnbG9iYWxseSBhbmQgd2UncmUgaW4gYSBtb2R1bGUsXG4gICAgICAvLyBtYWtlIHRoZSBleHBvcnRzIG9iamVjdCBpZGVudGljYWwgdG8gcmVnZW5lcmF0b3JSdW50aW1lLlxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xuICAgIH1cbiAgICAvLyBEb24ndCBib3RoZXIgZXZhbHVhdGluZyB0aGUgcmVzdCBvZiB0aGlzIGZpbGUgaWYgdGhlIHJ1bnRpbWUgd2FzXG4gICAgLy8gYWxyZWFkeSBkZWZpbmVkIGdsb2JhbGx5LlxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIERlZmluZSB0aGUgcnVudGltZSBnbG9iYWxseSAoYXMgZXhwZWN0ZWQgYnkgZ2VuZXJhdGVkIGNvZGUpIGFzIGVpdGhlclxuICAvLyBtb2R1bGUuZXhwb3J0cyAoaWYgd2UncmUgaW4gYSBtb2R1bGUpIG9yIGEgbmV3LCBlbXB0eSBvYmplY3QuXG4gIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lID0gaW5Nb2R1bGUgPyBtb2R1bGUuZXhwb3J0cyA6IHt9O1xuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIHJ1bnRpbWUud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlW3RvU3RyaW5nVGFnU3ltYm9sXSA9XG4gICAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgcnVudGltZS5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBpZiAoISh0b1N0cmluZ1RhZ1N5bWJvbCBpbiBnZW5GdW4pKSB7XG4gICAgICAgIGdlbkZ1blt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIHJ1bnRpbWUuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBydW50aW1lLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBydW50aW1lLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdClcbiAgICApO1xuXG4gICAgcmV0dXJuIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvclwiO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIHJ1bnRpbWUua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBydW50aW1lLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xufSkoXG4gIC8vIEluIHNsb3BweSBtb2RlLCB1bmJvdW5kIGB0aGlzYCByZWZlcnMgdG8gdGhlIGdsb2JhbCBvYmplY3QsIGZhbGxiYWNrIHRvXG4gIC8vIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIGlmIHdlJ3JlIGluIGdsb2JhbCBzdHJpY3QgbW9kZS4gVGhhdCBpcyBzYWRseSBhIGZvcm1cbiAgLy8gb2YgaW5kaXJlY3QgZXZhbCB3aGljaCB2aW9sYXRlcyBDb250ZW50IFNlY3VyaXR5IFBvbGljeS5cbiAgKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzIHx8ICh0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIiAmJiBzZWxmKTtcbiAgfSkoKSB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKClcbik7XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJpbXBvcnQgeyBJbWFnZURlYnVnIH0gZnJvbSAnLi4vY29tbW9uL2ltYWdlLWRlYnVnJztcbmltcG9ydCB7IFF1YWdnYUJhcmNvZGUgfSBmcm9tICcuLi9kZWNvZGVyL2JhcmNvZGUtZGVjb2Rlcic7XG5pbXBvcnQgeyBCYXJjb2RlIH0gZnJvbSAnLi4vcmVhZGVyL2JhcmNvZGUtcmVhZGVyJztcblxuZXhwb3J0IGludGVyZmFjZSBSZXN1bHRDb2xsZWN0b3JDb25maWcge1xuICAgIGNhcGFjaXR5PzogbnVtYmVyO1xuICAgIGNhcHR1cmU/OiBib29sZWFuO1xuICAgIGJsYWNrbGlzdD86IEFycmF5PEJhcmNvZGU+O1xuICAgIGZpbHRlcj86IChpdGVtOiBCYXJjb2RlKSA9PiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgUmVzdWx0Q29sbGVjdG9yIHtcbiAgICBwcml2YXRlIF9jYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHByaXZhdGUgX2NvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICBwcml2YXRlIF9jb25maWc6IFJlc3VsdENvbGxlY3RvckNvbmZpZztcbiAgICBwcml2YXRlIF9jYXBhY2l0eTogbnVtYmVyO1xuICAgIHByaXZhdGUgX2NhcHR1cmU6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfcmVzdWx0czogQXJyYXk8UXVhZ2dhQmFyY29kZT47XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IFJlc3VsdENvbGxlY3RvckNvbmZpZykge1xuICAgICAgICB0aGlzLl9yZXN1bHRzID0gbmV3IEFycmF5PFF1YWdnYUJhcmNvZGU+KCk7XG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgdGhpcy5fY2FwYWNpdHkgPSBjb25maWcuY2FwYWNpdHkgfHwgMjA7XG4gICAgICAgIHRoaXMuX2NhcHR1cmUgPSBjb25maWcuY2FwdHVyZSA9PT0gdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy5fY2FwdHVyZSkge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRSZXN1bHQoZGF0YTogVWludDhBcnJheSwgaW1hZ2VXaWR0aDogbnVtYmVyLCBpbWFnZUhlaWdodDogbnVtYmVyLCBjb2RlUmVzdWx0OiBCYXJjb2RlKTogdm9pZCB7XG4gICAgICAgIGlmIChjb2RlUmVzdWx0ICYmIHRoaXMuX2NhcGFjaXR5ICYmICF0aGlzLl9jb250YWlucyhjb2RlUmVzdWx0KSAmJiB0aGlzLl9wYXNzZXNGaWx0ZXIoY29kZVJlc3VsdCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogUXVhZ2dhQmFyY29kZSA9IHsgY29kZVJlc3VsdCB9O1xuXG4gICAgICAgICAgICB0aGlzLl9jYXBhY2l0eS0tO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fY2FwdHVyZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IGltYWdlV2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IGltYWdlSGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgSW1hZ2VEZWJ1Zy5kcmF3SW1hZ2UoZGF0YSwgaW1hZ2VXaWR0aCwgaW1hZ2VIZWlnaHQsIHRoaXMuX2NvbnRleHQpO1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0LmZyYW1lID0gdGhpcy5fY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9yZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFJlc3VsdHMoKTogQXJyYXk8UXVhZ2dhQmFyY29kZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzdWx0cztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jb250YWlucyhjb2RlUmVzdWx0OiBCYXJjb2RlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuYmxhY2tsaXN0ICYmXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuYmxhY2tsaXN0LnNvbWUoaXRlbSA9PiBPYmplY3Qua2V5cyhpdGVtKS5ldmVyeShrZXkgPT4gaXRlbVtrZXldID09PSBjb2RlUmVzdWx0W2tleV0pKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wYXNzZXNGaWx0ZXIoY29kZVJlc3VsdDogQmFyY29kZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuX2NvbmZpZy5maWx0ZXIgIT09ICdmdW5jdGlvbicgfHwgdGhpcy5fY29uZmlnLmZpbHRlcihjb2RlUmVzdWx0KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBNb21lbnQgfSBmcm9tICcuL21vbWVudCc7XG5cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2x1c3RlciBmb3IgZ3JvdXBpbmcgc2ltaWxhciBvcmllbnRhdGlvbnMgb2YgbW9tZW50c1xuICovXG5leHBvcnQgY2xhc3MgQ2x1c3RlciB7XG4gICAgcHJpdmF0ZSBfdGhyZXNob2xkOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfbW9tZW50czogQXJyYXk8TW9tZW50PjtcbiAgICBwcml2YXRlIF9jZW50ZXI6IE1vbWVudDtcblxuICAgIHN0YXRpYyBjbHVzdGVyaXplKG1vbWVudHM6IEFycmF5PE1vbWVudD4sIHRocmVzaG9sZDogbnVtYmVyKTogQXJyYXk8Q2x1c3Rlcj4ge1xuICAgICAgICBjb25zdCBjbHVzdGVycyA9IG5ldyBBcnJheTxDbHVzdGVyPigpO1xuXG4gICAgICAgIG1vbWVudHMuZm9yRWFjaChtb21lbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hpbmdDbHVzdGVyID0gY2x1c3RlcnMuZmluZChjbHVzdGVyID0+IGNsdXN0ZXIuZml0cyhtb21lbnQpKTtcblxuICAgICAgICAgICAgaWYgKG1hdGNoaW5nQ2x1c3Rlcikge1xuICAgICAgICAgICAgICAgIG1hdGNoaW5nQ2x1c3Rlci5hZGQobW9tZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2x1c3RlcnMucHVzaChuZXcgQ2x1c3Rlcih0aHJlc2hvbGQsIG1vbWVudCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gY2x1c3RlcnM7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IodGhyZXNob2xkOiBudW1iZXIsIG1vbWVudDogTW9tZW50KSB7XG4gICAgICAgIHRoaXMuX3RocmVzaG9sZCA9IHRocmVzaG9sZDtcbiAgICAgICAgdGhpcy5fbW9tZW50cyA9IG5ldyBBcnJheTxNb21lbnQ+KCk7XG4gICAgICAgIHRoaXMuX2NlbnRlciA9IHtcbiAgICAgICAgICAgIHJhZDogMCxcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG1vbWVudCkge1xuICAgICAgICAgICAgdGhpcy5hZGQobW9tZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZChwb2ludDogTW9tZW50KSB7XG4gICAgICAgIHRoaXMuX21vbWVudHMucHVzaChwb2ludCk7XG5cbiAgICAgICAgLy8gVXBkYXRlIGNlbnRlclxuICAgICAgICB0aGlzLl9jZW50ZXIucmFkID0gdGhpcy5fbW9tZW50cy5yZWR1Y2UoKHN1bSwgcCkgPT4gc3VtICsgcC5yYWQsIDApIC8gdGhpcy5fbW9tZW50cy5sZW5ndGg7XG4gICAgICAgIHRoaXMuX2NlbnRlci54ID0gTWF0aC5jb3ModGhpcy5fY2VudGVyLnJhZCk7XG4gICAgICAgIHRoaXMuX2NlbnRlci55ID0gTWF0aC5zaW4odGhpcy5fY2VudGVyLnJhZCk7XG4gICAgfVxuXG4gICAgZml0cyhtb21lbnQ6IE1vbWVudCk6IGJvb2xlYW4ge1xuICAgICAgICAvLyBjaGVjayBjb3NpbmUgc2ltaWxhcml0eSB0byBjZW50ZXItYW5nbGVcbiAgICAgICAgY29uc3Qgc2ltaWxhcml0eSA9IE1hdGguYWJzKG1vbWVudC54ICogdGhpcy5fY2VudGVyLnggKyBtb21lbnQueSAqIHRoaXMuX2NlbnRlci55KTtcbiAgICAgICAgcmV0dXJuIHNpbWlsYXJpdHkgPiB0aGlzLl90aHJlc2hvbGQ7XG4gICAgfVxuXG4gICAgZ2V0IG1vbWVudHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb21lbnRzO1xuICAgIH1cbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgRXZlbnRDYWxsYmFjayB7XG4gICAgKGRhdGE6IGFueSk6IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXZlbnRTdWJzY3JpcHRpb24ge1xuICAgIGNhbGxiYWNrOiBFdmVudENhbGxiYWNrO1xuICAgIGFzeW5jPzogYm9vbGVhbjtcbiAgICBvbmNlPzogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIEV2ZW50SXRlbSB7XG4gICAgc3Vic2NyaXB0aW9uczogQXJyYXk8RXZlbnRTdWJzY3JpcHRpb24+XG59XG5cbmxldCBldmVudHM6IHsgW25hbWU6IHN0cmluZ106IEV2ZW50SXRlbSB9ID0ge307XG5cbmV4cG9ydCBjbGFzcyBFdmVudHMge1xuICAgIHN0YXRpYyBzdWJzY3JpYmUoZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IEV2ZW50U3Vic2NyaXB0aW9uIHwgRXZlbnRDYWxsYmFjaywgYXN5bmM/OiBib29sZWFuKSB7XG4gICAgICAgIGxldCBzdWJzY3JpcHRpb246IEV2ZW50U3Vic2NyaXB0aW9uO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgICAgICAgICBhc3luY1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgaWYgKCFzdWJzY3JpcHRpb24uY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyAnQ2FsbGJhY2sgd2FzIG5vdCBzcGVjaWZpZWQgb24gb3B0aW9ucyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBnZXRFdmVudChldmVudCkuc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmlwdGlvbik7XG4gICAgfVxuXG4gICAgc3RhdGljIHB1Ymxpc2godHlwZTogc3RyaW5nLCBkYXRhPzogYW55KSB7XG4gICAgICAgIGNvbnN0IGV2ZW50SXRlbSA9IGdldEV2ZW50KHR5cGUpO1xuICAgICAgICBjb25zdCBzdWJzY3JpcHRpb25zID0gZXZlbnRJdGVtLnN1YnNjcmlwdGlvbnM7XG5cbiAgICAgICAgLy8gUHVibGlzaCBvbmUtdGltZSBzdWJzY3JpcHRpb25zXG4gICAgICAgIHN1YnNjcmlwdGlvbnMuZmlsdGVyKCh7IG9uY2UgfSkgPT4gISFvbmNlKS5mb3JFYWNoKHN1YnNjcmlwdGlvbiA9PiBwdWJsaXNoU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbiwgZGF0YSkpO1xuXG4gICAgICAgIC8vIHJlbW92ZSB0aGVtIGZyb20gdGhlIHN1YnNjcmlwdGlvblxuICAgICAgICBldmVudEl0ZW0uc3Vic2NyaXB0aW9ucyA9IHN1YnNjcmlwdGlvbnMuZmlsdGVyKCh7IG9uY2UgfSkgPT4gIW9uY2UpO1xuXG4gICAgICAgIC8vIHB1Ymxpc2ggdGhlIHJlc3RcbiAgICAgICAgZXZlbnRJdGVtLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWJzY3JpcHRpb24gPT4gcHVibGlzaFN1YnNjcmlwdGlvbihzdWJzY3JpcHRpb24sIGRhdGEpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgb25jZShldmVudDogc3RyaW5nLCBjYWxsYmFjazogRXZlbnRDYWxsYmFjaywgYXN5bmM/OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIEV2ZW50cy5zdWJzY3JpYmUoZXZlbnQsIHsgY2FsbGJhY2ssIGFzeW5jLCBvbmNlOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyB1bnN1YnNjcmliZShldmVudE5hbWU/OiBzdHJpbmcsIGNhbGxiYWNrPzogRXZlbnRDYWxsYmFjaykge1xuICAgICAgICBpZiAoZXZlbnROYW1lKSB7XG4gICAgICAgICAgICBjb25zdCBldmVudCA9IGdldEV2ZW50KGV2ZW50TmFtZSk7XG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBldmVudC5zdWJzY3JpcHRpb25zID0gZXZlbnQuc3Vic2NyaXB0aW9ucy5maWx0ZXIoc3Vic2NyaXB0aW9uID0+IHN1YnNjcmlwdGlvbi5jYWxsYmFjayAhPT0gY2FsbGJhY2spO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBldmVudC5zdWJzY3JpcHRpb25zID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudHMgPSB7fTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0RXZlbnQoZXZlbnROYW1lOiBzdHJpbmcpOiBFdmVudEl0ZW0ge1xuICAgIGlmICghZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSB7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb25zOiBbXVxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZXZlbnRzW2V2ZW50TmFtZV07XG59XG5cbmZ1bmN0aW9uIHB1Ymxpc2hTdWJzY3JpcHRpb24oc3Vic2NyaXB0aW9uOiBFdmVudFN1YnNjcmlwdGlvbiwgZGF0YTogYW55KTogdm9pZCB7XG4gICAgaWYgKHN1YnNjcmlwdGlvbi5hc3luYykge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5jYWxsYmFjayhkYXRhKTtcbiAgICAgICAgfSwgNCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uLmNhbGxiYWNrKGRhdGEpO1xuICAgIH1cbn1cbiIsImV4cG9ydCB0eXBlIEhTViA9IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcblxuZXhwb3J0IHR5cGUgUkdCID0gW251bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuXG5leHBvcnQgZnVuY3Rpb24gaHN2MnJnYihoc3Y6IEhTViwgcmdiPzogUkdCKTogUkdCIHtcbiAgICBjb25zdCBoID0gaHN2WzBdO1xuICAgIGNvbnN0IHMgPSBoc3ZbMV07XG4gICAgY29uc3QgdiA9IGhzdlsyXTtcbiAgICBjb25zdCBjID0gdiAqIHM7XG4gICAgY29uc3QgeCA9IGMgKiAoMSAtIE1hdGguYWJzKChoIC8gNjApICUgMiAtIDEpKTtcbiAgICBjb25zdCBtID0gdiAtIGM7XG4gICAgbGV0IHIgPSAwO1xuICAgIGxldCBnID0gMDtcbiAgICBsZXQgYiA9IDA7XG5cbiAgICBpZiAoaCA8IDYwKSB7XG4gICAgICAgIHIgPSBjO1xuICAgICAgICBnID0geDtcbiAgICB9IGVsc2UgaWYgKGggPCAxMjApIHtcbiAgICAgICAgciA9IHg7XG4gICAgICAgIGcgPSBjO1xuICAgIH0gZWxzZSBpZiAoaCA8IDE4MCkge1xuICAgICAgICBnID0gYztcbiAgICAgICAgYiA9IHg7XG4gICAgfSBlbHNlIGlmIChoIDwgMjQwKSB7XG4gICAgICAgIGcgPSB4O1xuICAgICAgICBiID0gYztcbiAgICB9IGVsc2UgaWYgKGggPCAzMDApIHtcbiAgICAgICAgciA9IHg7XG4gICAgICAgIGIgPSBjO1xuICAgIH0gZWxzZSBpZiAoaCA8IDM2MCkge1xuICAgICAgICByID0gYztcbiAgICAgICAgYiA9IHg7XG4gICAgfVxuXG4gICAgcmdiID0gcmdiIHx8IFswLCAwLCAwXTtcblxuICAgIHJnYlswXSA9IChyICsgbSkgKiAyNTUgfCAwO1xuICAgIHJnYlsxXSA9IChnICsgbSkgKiAyNTUgfCAwO1xuICAgIHJnYlsyXSA9IChiICsgbSkgKiAyNTUgfCAwO1xuXG4gICAgcmV0dXJuIHJnYjtcbn1cbiIsImltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi9wb2ludCc7XG5cbmV4cG9ydCBjb25zdCBJbWFnZURlYnVnID0ge1xuICAgIGRyYXdQYXRoKHBhdGg6IEFycmF5PFBvaW50PiwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBjb2xvcjogc3RyaW5nLCBsaW5lV2lkdGg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAocGF0aCAmJiBwYXRoLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhwYXRoWzBdLngsIHBhdGhbMF0ueSk7XG4gICAgICAgICAgICBwYXRoLnNsaWNlKDEpLmZvckVhY2goKHsgeCwgeSB9KSA9PiBjb250ZXh0LmxpbmVUbyh4LCB5KSk7XG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkcmF3SW1hZ2UoaW1hZ2VEYXRhOiBVaW50OEFycmF5LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGNhbnZhc0RhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgY29uc3QgZGF0YSA9IGNhbnZhc0RhdGEuZGF0YTtcbiAgICAgICAgbGV0IGltYWdlSW5kZXggPSBpbWFnZURhdGEubGVuZ3RoIHwgMDtcbiAgICAgICAgbGV0IGNhbnZhc0luZGV4ID0gZGF0YS5sZW5ndGggfCAwO1xuXG4gICAgICAgIGlmIChjYW52YXNJbmRleCAvIGltYWdlSW5kZXggIT09IDQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChpbWFnZUluZGV4LS0pIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gaW1hZ2VEYXRhW2ltYWdlSW5kZXhdO1xuICAgICAgICAgICAgZGF0YVstLWNhbnZhc0luZGV4XSA9IDI1NTtcbiAgICAgICAgICAgIGRhdGFbLS1jYW52YXNJbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIGRhdGFbLS1jYW52YXNJbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIGRhdGFbLS1jYW52YXNJbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQucHV0SW1hZ2VEYXRhKGNhbnZhc0RhdGEsIDAsIDApO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE1vbWVudCB9IGZyb20gJy4vbW9tZW50JztcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi9wb2ludCc7XG5pbXBvcnQgeyBIU1YsIGhzdjJyZ2IsIFJHQiB9IGZyb20gJy4vaHN2MnJnYic7XG5cbnR5cGUgQXJyYXlUeXBlID0gQXJyYXk8bnVtYmVyPiB8IFVpbnQ4QXJyYXkgfCBJbnQzMkFycmF5O1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBiYXNpYyBpbWFnZSBjb21iaW5pbmcgdGhlIGRhdGEgYW5kIHNpemUuXG4gKiBJbiBhZGRpdGlvbiwgc29tZSBtZXRob2RzIGZvciBtYW5pcHVsYXRpb24gYXJlIGNvbnRhaW5lZC5cbiAqL1xuZXhwb3J0IGNsYXNzIEltYWdlV3JhcHBlcjxUIGV4dGVuZHMgQXJyYXlUeXBlID0gVWludDhBcnJheT4ge1xuICAgIGRhdGE6IFQgfCBVaW50OEFycmF5O1xuICAgIHNpemU6IFBvaW50O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNpemUgVGhlIHNpemUgb2YgdGhlIGltYWdlIGluIHBpeGVsXG4gICAgICogQHBhcmFtIGRhdGEgSWYgZ2l2ZW4sIGEgZmxhdCBhcnJheSBjb250YWluaW5nIHRoZSBwaXhlbCBkYXRhXG4gICAgICogQHBhcmFtIGFycmF5VHlwZSBJZiBnaXZlbiwgdGhlIGRlc2lyZWQgRGF0YVR5cGUgb2YgdGhlIEFycmF5IChtYXkgYmUgdHlwZWQvbm9uLXR5cGVkKVxuICAgICAqIEBwYXJhbSBpbml0aWFsaXplIEluZGljYXRpbmcgaWYgdGhlIGFycmF5IHNob3VsZCBiZSBpbml0aWFsaXplZCBvbiBjcmVhdGlvbi5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzaXplOiBQb2ludCwgZGF0YT86IFQsIGFycmF5VHlwZT86IHsgbmV3KF86IG51bWJlcik6IFQgfCBVaW50OEFycmF5IH0sIGluaXRpYWxpemU/OiBib29sZWFuKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gbmV3IChhcnJheVR5cGUgfHwgVWludDhBcnJheSkoc2l6ZS54ICogc2l6ZS55KTtcblxuICAgICAgICAgICAgaWYgKGluaXRpYWxpemUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuZmlsbCgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRlc3RzIGlmIGEgcG9zaXRpb24gaXMgd2l0aGluIHRoZSBpbWFnZSB3aXRoIGEgZ2l2ZW4gb2Zmc2V0XG4gICAgICogQHBhcmFtIHBvaW50IFRoZSBsb2NhdGlvbiB0byB0ZXN0XG4gICAgICogQHBhcmFtIGJvcmRlciBUaGUgcGFkZGluZyB2YWx1ZSBpbiBwaXhlbHNcbiAgICAgKiBAcmV0dXJucyB0cnVlIGlmIGxvY2F0aW9uIGluc2lkZSB0aGUgaW1hZ2UncyBib3JkZXIsIGZhbHNlIG90aGVyd2lzZVxuICAgICAqIEBzZWUgY3ZkL2ltYWdlLmhcbiAgICAgKi9cbiAgICBpbkltYWdlV2l0aEJvcmRlcihwb2ludDogUG9pbnQsIGJvcmRlcjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAocG9pbnQueCA+PSBib3JkZXIpXG4gICAgICAgICAgICAmJiAocG9pbnQueSA+PSBib3JkZXIpXG4gICAgICAgICAgICAmJiAocG9pbnQueCA8ICh0aGlzLnNpemUueCAtIGJvcmRlcikpXG4gICAgICAgICAgICAmJiAocG9pbnQueSA8ICh0aGlzLnNpemUueSAtIGJvcmRlcikpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4ge0ltYWdlV3JhcHBlcikgYW5kIGNvcGllcyB0aGUgbmVlZGVkIHVuZGVybHlpbmcgaW1hZ2UtZGF0YSBhcmVhXG4gICAgICogQHBhcmFtIGltYWdlV3JhcHBlciBUaGUgdGFyZ2V0IHtJbWFnZVdyYXBwZXJ9IHdoZXJlIHRoZSBkYXRhIHNob3VsZCBiZSBjb3BpZWRcbiAgICAgKiBAcGFyYW0gZnJvbVggVGhlIGhvcml6b250YWwgcG9zaXRpb24gd2hlcmUgdG8gY29weSBmcm9tXG4gICAgICogQHBhcmFtIGZyb21ZIFRoZSB2ZXJ0aWNhbCBwb3NpdGlvbiB3aGVyZSB0byBjb3B5IGZyb21cbiAgICAqL1xuICAgIHN1YkltYWdlQXNDb3B5KGltYWdlV3JhcHBlcjogSW1hZ2VXcmFwcGVyLCBmcm9tWDogbnVtYmVyLCBmcm9tWTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNpemVZID0gaW1hZ2VXcmFwcGVyLnNpemUueTtcbiAgICAgICAgY29uc3Qgc2l6ZVggPSBpbWFnZVdyYXBwZXIuc2l6ZS54O1xuXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgc2l6ZVg7IHgrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBzaXplWTsgeSsrKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VXcmFwcGVyLmRhdGFbeSAqIHNpemVYICsgeF0gPSB0aGlzLmRhdGFbKGZyb21ZICsgeSkgKiB0aGlzLnNpemUueCArIGZyb21YICsgeF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgYSBnaXZlbiBwaXhlbCBwb3NpdGlvbiBmcm9tIHRoZSBpbWFnZVxuICAgICAqIEBwYXJhbSB4IFRoZSB4LXBvc2l0aW9uXG4gICAgICogQHBhcmFtIHkgVGhlIHktcG9zaXRpb25cbiAgICAgKiBAcmV0dXJucyBUaGUgZ3JheXNjYWxlIHZhbHVlIGF0IHRoZSBwaXhlbC1wb3NpdGlvblxuICAgICAqL1xuICAgIGdldCh4OiBudW1iZXIsIHk6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFbeSAqIHRoaXMuc2l6ZS54ICsgeF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyBhIGdpdmVuIHBpeGVsIHBvc2l0aW9uIGluIHRoZSBpbWFnZVxuICAgICAqIEBwYXJhbSB4IFRoZSB4LXBvc2l0aW9uXG4gICAgICogQHBhcmFtIHkgVGhlIHktcG9zaXRpb25cbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIGdyYXlzY2FsZSB2YWx1ZSB0byBzZXRcbiAgICAgKiBAcmV0dXJucyBUaGUgSW1hZ2UgaXRzZWxmIChmb3IgcG9zc2libGUgY2hhaW5pbmcpXG4gICAgICovXG4gICAgc2V0KHg6IG51bWJlciwgeTogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKTogSW1hZ2VXcmFwcGVyPFQ+IHtcbiAgICAgICAgdGhpcy5kYXRhW3kgKiB0aGlzLnNpemUueCArIHhdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGJvcmRlciBvZiB0aGUgaW1hZ2UgKDEgcGl4ZWwpIHRvIHplcm9cbiAgICAgKi9cbiAgICB6ZXJvQm9yZGVyKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuc2l6ZS54O1xuICAgICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLnNpemUueTtcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuZGF0YTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIGRhdGFbaV0gPSBkYXRhWyhoZWlnaHQgLSAxKSAqIHdpZHRoICsgaV0gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBoZWlnaHQgLSAxOyBpKyspIHtcbiAgICAgICAgICAgIGRhdGFbaSAqIHdpZHRoXSA9IGRhdGFbaSAqIHdpZHRoICsgKHdpZHRoIC0gMSldID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludmVydHMgYSBiaW5hcnkgaW1hZ2UgaW4gcGxhY2VcbiAgICAgKi9cbiAgICBpbnZlcnQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmRhdGE7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IGRhdGEubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICBkYXRhW2ldID0gZGF0YVtpXSA/IDAgOiAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW9tZW50cyhsYWJlbENvdW50OiBudW1iZXIpOiBBcnJheTxNb21lbnQ+IHtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5zaXplLnk7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy5zaXplLng7XG4gICAgICAgIGNvbnN0IGxhYmVsU3VtID0gbmV3IEFycmF5PE1vbWVudD4oKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5PE1vbWVudD4oKTtcblxuICAgICAgICBpZiAobGFiZWxDb3VudCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYWJlbENvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGxhYmVsU3VtW2ldID0ge1xuICAgICAgICAgICAgICAgIG0wMDogMCxcbiAgICAgICAgICAgICAgICBtMDE6IDAsXG4gICAgICAgICAgICAgICAgbTEwOiAwLFxuICAgICAgICAgICAgICAgIG0xMTogMCxcbiAgICAgICAgICAgICAgICBtMDI6IDAsXG4gICAgICAgICAgICAgICAgbTIwOiAwLFxuICAgICAgICAgICAgICAgIHRoZXRhOiAwLFxuICAgICAgICAgICAgICAgIHJhZDogMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIGNvbnN0IHlzcSA9IHkgKiB5O1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsID0gdGhpcy5kYXRhW3kgKiB3aWR0aCArIHhdO1xuICAgICAgICAgICAgICAgIGlmICh2YWwgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gbGFiZWxTdW1bdmFsIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsLm0wMCArPSAxO1xuICAgICAgICAgICAgICAgICAgICBsYWJlbC5tMDEgKz0geTtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwubTEwICs9IHg7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsLm0xMSArPSB4ICogeTtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwubTAyICs9IHlzcTtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwubTIwICs9IHggKiB4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IFBJID0gTWF0aC5QSTtcbiAgICAgICAgY29uc3QgUElfNCA9IFBJIC8gNDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxhYmVsQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBsYWJlbFN1bVtpXTtcbiAgICAgICAgICAgIGlmICghaXNOYU4obGFiZWwubTAwKSAmJiBsYWJlbC5tMDAgIT09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCB4XyA9IGxhYmVsLm0xMCAvIGxhYmVsLm0wMDtcbiAgICAgICAgICAgICAgICBjb25zdCB5XyA9IGxhYmVsLm0wMSAvIGxhYmVsLm0wMDtcbiAgICAgICAgICAgICAgICBjb25zdCBtdTExID0gbGFiZWwubTExIC8gbGFiZWwubTAwIC0geF8gKiB5XztcbiAgICAgICAgICAgICAgICBjb25zdCBtdTAyID0gbGFiZWwubTAyIC8gbGFiZWwubTAwIC0geV8gKiB5XztcbiAgICAgICAgICAgICAgICBjb25zdCBtdTIwID0gbGFiZWwubTIwIC8gbGFiZWwubTAwIC0geF8gKiB4XztcbiAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSAwLjUgKiBNYXRoLmF0YW4oKG11MDIgLSBtdTIwKSAvICgyICogbXUxMSkpICsgKG11MTEgPj0gMCA/IFBJXzQgOiAtUElfNCkgKyBQSTtcbiAgICAgICAgICAgICAgICBsYWJlbC50aGV0YSA9ICh0bXAgKiAxODAgLyBQSSArIDkwKSAlIDE4MCAtIDkwO1xuICAgICAgICAgICAgICAgIGlmIChsYWJlbC50aGV0YSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwudGhldGEgKz0gMTgwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsYWJlbC5yYWQgPSB0bXAgPiBQSSA/IHRtcCAtIFBJIDogdG1wO1xuICAgICAgICAgICAgICAgIGxhYmVsLnggPSBNYXRoLmNvcyh0bXApO1xuICAgICAgICAgICAgICAgIGxhYmVsLnkgPSBNYXRoLnNpbih0bXApO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGxhYmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzcGxheXMgdGhlIHtJbWFnZVdyYXBwZXJ9IGluIGEgZ2l2ZW4gY2FudmFzXG4gICAgICogQHBhcmFtIGNvbnRleHQgVGhlIHJlbmRlcmluZyBjb250ZXh0IHRvIHdyaXRlIHRvXG4gICAgICogQHBhcmFtIHNjYWxlIFNjYWxlIHdoaWNoIGlzIGFwcGxpZWQgdG8gZWFjaCBwaXhlbC12YWx1ZVxuICAgICAqL1xuICAgIHNob3coY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBzY2FsZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuc2l6ZS55O1xuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuc2l6ZS54O1xuICAgICAgICAvLyBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIC8vIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIC8vIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICBjb25zdCBmcmFtZSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICBjb25zdCBkYXRhID0gZnJhbWUuZGF0YTtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSAwO1xuXG4gICAgICAgIGlmICghc2NhbGUpIHtcbiAgICAgICAgICAgIHNjYWxlID0gMS4wO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBoZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGl4ZWwgPSB5ICogd2lkdGggKyB4O1xuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLmdldCh4LCB5KSAqIHNjYWxlO1xuICAgICAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMF0gPSBjdXJyZW50O1xuICAgICAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMV0gPSBjdXJyZW50O1xuICAgICAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgMl0gPSBjdXJyZW50O1xuICAgICAgICAgICAgICAgIGRhdGFbcGl4ZWwgKiA0ICsgM10gPSAyNTU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL2ZyYW1lLmRhdGEgPSBkYXRhO1xuICAgICAgICBjb250ZXh0LnB1dEltYWdlRGF0YShmcmFtZSwgMCwgMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzcGxheXMgdGhlIHBhcnQgb2YgdGhlIGltYWdlIGluIGEgZ2l2ZW4gY2FudmFzXG4gICAgICogQHBhcmFtIGNvbnRleHQgVGhlIHJlbmRlcmluZyBjb250ZXh0IHRvIHdyaXRlIHRvXG4gICAgICogQHBhcmFtIHNjYWxlIFNjYWxlIHdoaWNoIGlzIGFwcGxpZWQgdG8gZWFjaCBwaXhlbC12YWx1ZVxuICAgICAqIEBwYXJhbSBmcm9tWCBUaGUgaG9yaXpvbnRhbCBwb3NpdGlvbiB3aGVyZSB0byBvdmVybGF5IGZyb21cbiAgICAgKiBAcGFyYW0gZnJvbVkgVGhlIHZlcnRpY2FsIHBvc2l0aW9uIHdoZXJlIHRvIG92ZXJsYXkgZnJvbVxuICAgICAqL1xuICAgIG92ZXJsYXkoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBzY2FsZTogbnVtYmVyLCBmcm9tWDogbnVtYmVyLCBmcm9tWTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGhzdjogSFNWID0gWzAsIDEsIDFdO1xuICAgICAgICBjb25zdCB3aGl0ZVJnYjogUkdCID0gWzI1NSwgMjU1LCAyNTVdO1xuICAgICAgICBjb25zdCBibGFja1JnYjogUkdCID0gWzAsIDAsIDBdO1xuICAgICAgICBjb25zdCBmcmFtZSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKGZyb21YLCBmcm9tWSwgdGhpcy5zaXplLngsIHRoaXMuc2l6ZS55KTtcbiAgICAgICAgY29uc3QgZGF0YSA9IGZyYW1lLmRhdGE7XG5cbiAgICAgICAgaWYgKCFzY2FsZSB8fCBzY2FsZSA8IDAgfHwgc2NhbGUgPiAzNjApIHtcbiAgICAgICAgICAgIHNjYWxlID0gMzYwO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgbGVuZ3RoID0gdGhpcy5kYXRhLmxlbmd0aDsgbGVuZ3RoLS07KSB7XG4gICAgICAgICAgICBoc3ZbMF0gPSB0aGlzLmRhdGFbbGVuZ3RoXSAqIHNjYWxlO1xuICAgICAgICAgICAgY29uc3QgcmdiOiBSR0IgPSBoc3ZbMF0gPD0gMCA/IHdoaXRlUmdiIDogaHN2WzBdID49IDM2MCA/IGJsYWNrUmdiIDogaHN2MnJnYihoc3YpO1xuICAgICAgICAgICAgZGF0YVtsZW5ndGggKiA0ICsgMF0gPSByZ2JbMF07XG4gICAgICAgICAgICBkYXRhW2xlbmd0aCAqIDQgKyAxXSA9IHJnYlsxXTtcbiAgICAgICAgICAgIGRhdGFbbGVuZ3RoICogNCArIDJdID0gcmdiWzJdO1xuICAgICAgICAgICAgZGF0YVtsZW5ndGggKiA0ICsgM10gPSAyNTU7XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0LnB1dEltYWdlRGF0YShmcmFtZSwgZnJvbVgsIGZyb21ZKTtcbiAgICB9XG59XG4iLCJcbmV4cG9ydCBmdW5jdGlvbiBlbnVtZXJhdGVEZXZpY2VzKCk6IFByb21pc2U8QXJyYXk8TWVkaWFEZXZpY2VJbmZvPj4ge1xuICAgIGlmIChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzICYmIHR5cGVvZiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdlbnVtZXJhdGVEZXZpY2VzIGlzIG5vdCBkZWZpbmVkJykpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzOiBNZWRpYVN0cmVhbUNvbnN0cmFpbnRzKTogUHJvbWlzZTxNZWRpYVN0cmVhbT4ge1xuICAgIGlmIChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzICYmIHR5cGVvZiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoY29uc3RyYWludHMpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdnZXRVc2VyTWVkaWEgaXMgbm90IGRlZmluZWQnKSk7XG59XG4iLCIvKipcbiAqIFBlcmZvcm1zIGEgZGVlcCBtZXJnZSBvZiBvYmplY3RzIGFuZCByZXR1cm5zIG5ldyBvYmplY3QuXG4gKiBEb2VzIG5vdCBtb2RpZnkgb2JqZWN0cyAoaW1tdXRhYmxlKS5cbiAqIEBzZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ4MjE4MjA5XG4gKlxuICogQHBhcmFtIG9iamVjdHMgLSBPYmplY3RzIHRvIG1lcmdlXG4gKiBAcmV0dXJucyBOZXcgb2JqZWN0IHdpdGggbWVyZ2VkIGtleS92YWx1ZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlKC4uLm9iamVjdHM6IFJlYWRvbmx5QXJyYXk8YW55Pik6IG9iamVjdCB7XG4gICAgY29uc3QgaXNPYmplY3QgPSAob2JqOiB1bmtub3duKSA9PiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCc7XG5cbiAgICByZXR1cm4gb2JqZWN0cy5yZWR1Y2UoKHByZXYsIG9iaikgPT4ge1xuICAgICAgICBpZiAob2JqKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwVmFsID0gcHJldltrZXldO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9WYWwgPSBvYmpba2V5XTtcblxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBWYWwpICYmIEFycmF5LmlzQXJyYXkob1ZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJldltrZXldID0gcFZhbC5jb25jYXQoLi4ub1ZhbCk7XG4gICAgICAgICAgICAgICAgICAgIHByZXZba2V5XSA9IG9WYWw7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc09iamVjdChwVmFsKSAmJiBpc09iamVjdChvVmFsKSkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2W2tleV0gPSBtZXJnZShwVmFsLCBvVmFsKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwcmV2W2tleV0gPSBvVmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgfSwge30pO1xufSIsImltcG9ydCB7IFF1YWdnYUNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcblxuZXhwb3J0IGNvbnN0IGNvbmZpZzogUXVhZ2dhQ29uZmlnID0ge1xuICAgIGlucHV0U3RyZWFtOiB7XG4gICAgICAgIG5hbWU6ICdMaXZlJyxcbiAgICAgICAgdHlwZTogJ0xpdmVTdHJlYW0nLFxuICAgICAgICBjb25zdHJhaW50czoge1xuICAgICAgICAgICAgd2lkdGg6IDY0MCxcbiAgICAgICAgICAgIGhlaWdodDogNDgwLFxuICAgICAgICAgICAgLy8gYXNwZWN0UmF0aW86IDY0MC80ODAsIC8vIG9wdGlvbmFsXG4gICAgICAgICAgICBmYWNpbmdNb2RlOiAnZW52aXJvbm1lbnQnIC8vIG9yIHVzZXJcbiAgICAgICAgICAgIC8vIGRldmljZUlkOiAnMzg3NDU5ODM0NTczODc1OTgzNzU5ODM3NTk4MzQnXG4gICAgICAgIH0sXG4gICAgICAgIGFyZWE6IHtcbiAgICAgICAgICAgIHRvcDogJzAlJyxcbiAgICAgICAgICAgIHJpZ2h0OiAnMCUnLFxuICAgICAgICAgICAgbGVmdDogJzAlJyxcbiAgICAgICAgICAgIGJvdHRvbTogJzAlJ1xuICAgICAgICB9LFxuICAgICAgICBzaW5nbGVDaGFubmVsOiBmYWxzZSAvLyB0cnVlOiBvbmx5IHRoZSByZWQgY29sb3ItY2hhbm5lbCBpcyByZWFkXG4gICAgfSxcbiAgICBsb2NhdGU6IHRydWUsXG4gICAgbnVtT2ZXb3JrZXJzOiAwLFxuICAgIGRlY29kZXI6IHtcbiAgICAgICAgcmVhZGVyczogW1xuICAgICAgICAgICAgJ2NvZGVfMTI4X3JlYWRlcidcbiAgICAgICAgXSxcbiAgICAgICAgZGVidWc6IHtcbiAgICAgICAgICAgIGRyYXdCb3VuZGluZ0JveDogZmFsc2UsXG4gICAgICAgICAgICBzaG93RnJlcXVlbmN5OiBmYWxzZSxcbiAgICAgICAgICAgIGRyYXdTY2FubGluZTogZmFsc2UsXG4gICAgICAgICAgICBzaG93UGF0dGVybjogZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbG9jYXRvcjoge1xuICAgICAgICBoYWxmU2FtcGxlOiB0cnVlLFxuICAgICAgICBwYXRjaFNpemU6ICdtZWRpdW0nLCAvLyB4LXNtYWxsLCBzbWFsbCwgbWVkaXVtLCBsYXJnZSwgeC1sYXJnZVxuICAgICAgICBkZWJ1Zzoge1xuICAgICAgICAgICAgc2hvd0NhbnZhczogZmFsc2UsXG4gICAgICAgICAgICBzaG93UGF0Y2hlczogZmFsc2UsXG4gICAgICAgICAgICBzaG93Rm91bmRQYXRjaGVzOiBmYWxzZSxcbiAgICAgICAgICAgIHNob3dTa2VsZXRvbjogZmFsc2UsXG4gICAgICAgICAgICBzaG93TGFiZWxzOiBmYWxzZSxcbiAgICAgICAgICAgIHNob3dQYXRjaExhYmVsczogZmFsc2UsXG4gICAgICAgICAgICBzaG93UmVtYWluaW5nUGF0Y2hMYWJlbHM6IGZhbHNlLFxuICAgICAgICAgICAgYm94RnJvbVBhdGNoZXM6IHtcbiAgICAgICAgICAgICAgICBzaG93VHJhbnNmb3JtZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dUcmFuc2Zvcm1lZEJveDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd0JCOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcbiIsImltcG9ydCB7IEJveCB9IGZyb20gJy4uL2NvbW1vbi9ib3gnO1xuaW1wb3J0IHsgSW1hZ2VXcmFwcGVyIH0gZnJvbSAnLi4vY29tbW9uL2ltYWdlLXdyYXBwZXInO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLi9jb21tb24vcG9pbnQnO1xuaW1wb3J0IHsgUmVhZGVycyB9IGZyb20gJy4uL3JlYWRlci9pbmRleCc7XG5pbXBvcnQgeyBCYXJjb2RlLCBCYXJjb2RlUmVhZGVyLCBCYXJjb2RlUmVhZGVyQ29uZmlnLCBCYXJjb2RlUmVhZGVyRGVjbGFyYXRpb24sIEJhcmNvZGVSZWFkZXJUeXBlIH0gZnJvbSAnLi4vcmVhZGVyL2JhcmNvZGUtcmVhZGVyJztcbmltcG9ydCB7IEJhcmNvZGVMaW5lLCBCcmVzZW5oYW0gfSBmcm9tICcuL2JyZXNlbmhhbSc7XG5pbXBvcnQgeyBJbWFnZURlYnVnIH0gZnJvbSAnLi4vY29tbW9uL2ltYWdlLWRlYnVnJztcblxuZXhwb3J0IGludGVyZmFjZSBCYXJjb2RlRGVjb2RlckNvbmZpZyB7XG4gICAgZGVidWc/OiB7XG4gICAgICAgIGRyYXdCb3VuZGluZ0JveD86IGJvb2xlYW47XG4gICAgICAgIGRyYXdTY2FubGluZT86IGJvb2xlYW47XG4gICAgICAgIHNob3dGcmVxdWVuY3k/OiBib29sZWFuO1xuICAgICAgICBzaG93UGF0dGVybj86IGJvb2xlYW47XG4gICAgfTtcbiAgICBtdWx0aXBsZT86IGJvb2xlYW47XG4gICAgcmVhZGVycz86IEFycmF5PEJhcmNvZGVSZWFkZXJEZWNsYXJhdGlvbj47XG59XG5cbnR5cGUgTGluZSA9IFtQb2ludCwgUG9pbnRdO1xuXG5leHBvcnQgaW50ZXJmYWNlIFF1YWdnYUJhcmNvZGUge1xuICAgIGFuZ2xlPzogbnVtYmVyO1xuICAgIGJhcmNvZGVzPzogQXJyYXk8UXVhZ2dhQmFyY29kZT47IC8vIFRPT0Q6IGRlYWwgd2l0aCBtdWx0aXBsZSByZXN1bHRzXG4gICAgYm94PzogQm94O1xuICAgIGJveGVzPzogQXJyYXk8Qm94PjsgLy8gVE9PRDogZGVhbCB3aXRoIG11bHRpcGxlIHJlc3VsdHNcbiAgICBjb2RlUmVzdWx0PzogQmFyY29kZTtcbiAgICBmcmFtZT86IHN0cmluZztcbiAgICBsaW5lPzogTGluZTtcbiAgICBwYXR0ZXJuPzogQXJyYXk8bnVtYmVyPjtcbiAgICB0aHJlc2hvbGQ/OiBudW1iZXI7XG59O1xuXG5pbnRlcmZhY2UgQmFyY29kZUFuZEJhcmNvZGVMaW5lIHtcbiAgICBjb2RlUmVzdWx0OiBCYXJjb2RlO1xuICAgIGJhcmNvZGVMaW5lOiBCYXJjb2RlTGluZTtcbn1cblxuZXhwb3J0IGNsYXNzIEJhcmNvZGVEZWNvZGVyIHtcbiAgICBwcml2YXRlIF9jb25maWc6IEJhcmNvZGVEZWNvZGVyQ29uZmlnO1xuICAgIHByaXZhdGUgX2lucHV0SW1hZ2VXcmFwcGVyOiBJbWFnZVdyYXBwZXI8VWludDhBcnJheT47XG4gICAgcHJpdmF0ZSBfZnJlcXVlbmN5Q2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwcml2YXRlIF9wYXR0ZXJuQ2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwcml2YXRlIF9vdmVybGF5Q29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIHByaXZhdGUgX2JhcmNvZGVSZWFkZXJzOiBBcnJheTxCYXJjb2RlUmVhZGVyPjtcblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQmFyY29kZURlY29kZXJDb25maWcsIGlucHV0SW1hZ2VXcmFwcGVyOiBJbWFnZVdyYXBwZXI8VWludDhBcnJheT4pIHtcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuICAgICAgICB0aGlzLl9pbnB1dEltYWdlV3JhcHBlciA9IGlucHV0SW1hZ2VXcmFwcGVyO1xuICAgICAgICB0aGlzLl9iYXJjb2RlUmVhZGVycyA9IFtdO1xuXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHRoaXMuX2NvbmZpZy5kZWJ1ZyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjb25zdCBkZWJ1Z0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZWJ1Zy5kZXRlY3Rpb24nKTtcblxuICAgICAgICAgICAgdGhpcy5fZnJlcXVlbmN5Q2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzLmZyZXF1ZW5jeScpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9mcmVxdWVuY3lDYW52YXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9mcmVxdWVuY3lDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9mcmVxdWVuY3lDYW52YXMuY2xhc3NOYW1lID0gJ2ZyZXF1ZW5jeSc7XG4gICAgICAgICAgICAgICAgaWYgKGRlYnVnRGl2KSB7XG4gICAgICAgICAgICAgICAgICAgIGRlYnVnRGl2LmFwcGVuZENoaWxkKHRoaXMuX2ZyZXF1ZW5jeUNhbnZhcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZnJlcXVlbmN5Q2FudmFzLnN0eWxlLmRpc3BsYXkgPSB0aGlzLl9jb25maWcuZGVidWcuc2hvd0ZyZXF1ZW5jeSA/ICdibG9jaycgOiAnbm9uZSc7XG5cbiAgICAgICAgICAgIHRoaXMuX3BhdHRlcm5DYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMucGF0dGVybkJ1ZmZlcicpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9wYXR0ZXJuQ2FudmFzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGF0dGVybkNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhdHRlcm5DYW52YXMuY2xhc3NOYW1lID0gJ3BhdHRlcm5CdWZmZXInO1xuICAgICAgICAgICAgICAgIGlmIChkZWJ1Z0Rpdikge1xuICAgICAgICAgICAgICAgICAgICBkZWJ1Z0Rpdi5hcHBlbmRDaGlsZCh0aGlzLl9wYXR0ZXJuQ2FudmFzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9wYXR0ZXJuQ2FudmFzLnN0eWxlLmRpc3BsYXkgPSB0aGlzLl9jb25maWcuZGVidWcuc2hvd1BhdHRlcm4gPyAnYmxvY2snIDogJ25vbmUnO1xuXG4gICAgICAgICAgICBjb25zdCBvdmVybGF5Q2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQ2FudmFzRWxlbWVudD4oJ2NhbnZhcy5kcmF3aW5nQnVmZmVyJyk7XG4gICAgICAgICAgICB0aGlzLl9vdmVybGF5Q29udGV4dCA9IG92ZXJsYXlDYW52YXMgPyBvdmVybGF5Q2FudmFzLmdldENvbnRleHQoJzJkJykgOiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faW5pdFJlYWRlcnMoKTtcbiAgICB9XG5cbiAgICBkZWNvZGVGcm9tQm91bmRpbmdCb3hlcyhib3hlczogQXJyYXk8Qm94Pik6IFF1YWdnYUJhcmNvZGUge1xuICAgICAgICBsZXQgYmFyY29kZTogUXVhZ2dhQmFyY29kZSA9IG51bGw7XG5cbiAgICAgICAgaWYgKGJveGVzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY29uZmlnLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFyY29kZXMgPSBib3hlcy5tYXAoYm94ID0+IHRoaXMuZGVjb2RlRnJvbUJvdW5kaW5nQm94KGJveCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGJhcmNvZGVzLCBib3hlcyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJveGVzLnNvbWUoYm94ID0+ICEhKGJhcmNvZGUgPSB0aGlzLmRlY29kZUZyb21Cb3VuZGluZ0JveChib3gpKSkpIHtcbiAgICAgICAgICAgICAgICBiYXJjb2RlLmJveGVzID0gYm94ZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYmFyY29kZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaXRoIHRoZSBoZWxwIG9mIHRoZSBjb25maWd1cmVkIHJlYWRlcnMgdGhpcyBmdW5jdGlvbiB0cmllcyB0byBkZXRlY3RcbiAgICAgKiBhIHZhbGlkIGJhcmNvZGUgcGF0dGVybiB3aXRoaW4gdGhlIGdpdmVuIGFyZWEuXG4gICAgICogQHBhcmFtIGJveCBUaGUgYXJlYSB0byBzZWFyY2ggaW5cbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IHtjb2RlUmVzdWx0LCBsaW5lLCBhbmdsZSwgcGF0dGVybiwgdGhyZXNob2xkfVxuICAgICAqL1xuICAgIGRlY29kZUZyb21Cb3VuZGluZ0JveChib3g6IEJveCk6IFF1YWdnYUJhcmNvZGUge1xuICAgICAgICBjb25zdCBkZWJ1ZyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdGhpcy5fb3ZlcmxheUNvbnRleHQgJiYgdGhpcy5fY29uZmlnLmRlYnVnO1xuXG4gICAgICAgIGlmIChkZWJ1ZyAmJiBkZWJ1Zy5kcmF3Qm91bmRpbmdCb3gpIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYXdQYXRoKGJveCwgJ2JsdWUnLCAyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsaW5lID0gdGhpcy5fZ2V0TGluZShib3gpO1xuXG4gICAgICAgIGlmIChsaW5lID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5hdGFuMihsaW5lWzFdLnkgLSBsaW5lWzBdLnksIGxpbmVbMV0ueCAtIGxpbmVbMF0ueCk7XG4gICAgICAgIGxpbmUgPSB0aGlzLl9nZXRFeHRlbmRlZExpbmUobGluZSwgYW5nbGUpO1xuXG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLl90cnlEZWNvZGUobGluZSk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX3RyeURlY29kZUJydXRlRm9yY2UoYm94LCBsaW5lLCBhbmdsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWJ1ZyAmJiBkZWJ1Zy5kcmF3U2NhbmxpbmUpIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYXdQYXRoKGxpbmUsICdyZWQnLCAzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbmdsZSxcbiAgICAgICAgICAgIGJveCxcbiAgICAgICAgICAgIGNvZGVSZXN1bHQ6IHJlc3VsdC5jb2RlUmVzdWx0LFxuICAgICAgICAgICAgbGluZSxcbiAgICAgICAgICAgIHBhdHRlcm46IHJlc3VsdC5iYXJjb2RlTGluZS5saW5lLFxuICAgICAgICAgICAgdGhyZXNob2xkOiByZXN1bHQuYmFyY29kZUxpbmUudGhyZXNob2xkXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc2V0UmVhZGVycyhyZWFkZXJzOiBBcnJheTxCYXJjb2RlUmVhZGVyRGVjbGFyYXRpb24+KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2NvbmZpZy5yZWFkZXJzID0gcmVhZGVycztcbiAgICAgICAgdGhpcy5fYmFyY29kZVJlYWRlcnMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5faW5pdFJlYWRlcnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0UmVhZGVycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY29uZmlnLnJlYWRlcnMuZm9yRWFjaChyZWFkZXJDb25maWcgPT4ge1xuICAgICAgICAgICAgbGV0IHJlYWRlcjogQmFyY29kZVJlYWRlclR5cGU7XG4gICAgICAgICAgICBsZXQgY29uZmlndXJhdGlvbjogQmFyY29kZVJlYWRlckNvbmZpZyA9IHt9O1xuICAgICAgICAgICAgbGV0IHN1cHBsZW1lbnRzID0gW107XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVhZGVyQ29uZmlnID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHJlYWRlciA9IHJlYWRlckNvbmZpZy5mb3JtYXQ7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbiA9IHJlYWRlckNvbmZpZy5jb25maWcgfHwge307XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZWFkZXJDb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmVhZGVyID0gcmVhZGVyQ29uZmlnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdCZWZvcmUgcmVnaXN0ZXJpbmcgcmVhZGVyOicsIHJlYWRlcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb25maWd1cmF0aW9uLnN1cHBsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgc3VwcGxlbWVudHMgPSBjb25maWd1cmF0aW9uLnN1cHBsZW1lbnRzLm1hcChzdXBwbGVtZW50ID0+IG5ldyBSZWFkZXJzW3N1cHBsZW1lbnRdKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9iYXJjb2RlUmVhZGVycy5wdXNoKG5ldyBSZWFkZXJzW3JlYWRlcl0oY29uZmlndXJhdGlvbiwgc3VwcGxlbWVudHMpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZWdpc3RlcmVkIFJlYWRlcnM6JyxcbiAgICAgICAgICAgICAgICAuLi50aGlzLl9iYXJjb2RlUmVhZGVycy5tYXAoKHsgY29uZmlnLCBGT1JNQVQgfSkgPT4gSlNPTi5zdHJpbmdpZnkoeyBjb25maWcsIEZPUk1BVCB9KSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZXh0ZW5kIHRoZSBsaW5lIG9uIGJvdGggZW5kc1xuICAgICAqIEBwYXJhbSBsaW5lXG4gICAgICogQHBhcmFtIGFuZ2xlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZ2V0RXh0ZW5kZWRMaW5lKGxpbmU6IExpbmUsIGFuZ2xlOiBudW1iZXIpOiBMaW5lIHtcbiAgICAgICAgZnVuY3Rpb24gZXh0ZW5kTGluZShhbW91bnQ6IG51bWJlcikge1xuICAgICAgICAgICAgY29uc3QgZXh0ZW5zaW9uID0ge1xuICAgICAgICAgICAgICAgIHk6IGFtb3VudCAqIE1hdGguc2luKGFuZ2xlKSxcbiAgICAgICAgICAgICAgICB4OiBhbW91bnQgKiBNYXRoLmNvcyhhbmdsZSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGxpbmVbMF0ueSAtPSBleHRlbnNpb24ueTtcbiAgICAgICAgICAgIGxpbmVbMF0ueCAtPSBleHRlbnNpb24ueDtcbiAgICAgICAgICAgIGxpbmVbMV0ueSArPSBleHRlbnNpb24ueTtcbiAgICAgICAgICAgIGxpbmVbMV0ueCArPSBleHRlbnNpb24ueDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxpbmVMZW5ndGggPSBNYXRoLnNxcnQoKGxpbmVbMV0ueSAtIGxpbmVbMF0ueSkgKiogMiArIChsaW5lWzFdLnggLSBsaW5lWzBdLngpICoqIDIpO1xuICAgICAgICBsZXQgZXh0ZW5zaW9uTGVuZ3RoID0gbGluZUxlbmd0aCAqIDAuMSB8IDA7XG5cbiAgICAgICAgZXh0ZW5kTGluZShleHRlbnNpb25MZW5ndGgpO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIGluc2lkZSBpbWFnZVxuICAgICAgICB3aGlsZSAoZXh0ZW5zaW9uTGVuZ3RoID4gMSAmJiAoIXRoaXMuX2lucHV0SW1hZ2VXcmFwcGVyLmluSW1hZ2VXaXRoQm9yZGVyKGxpbmVbMF0sIDApXG4gICAgICAgICAgICB8fCAhdGhpcy5faW5wdXRJbWFnZVdyYXBwZXIuaW5JbWFnZVdpdGhCb3JkZXIobGluZVsxXSwgMCkpKSB7XG4gICAgICAgICAgICBleHRlbnNpb25MZW5ndGggPj49IDE7XG4gICAgICAgICAgICBleHRlbmRMaW5lKC1leHRlbnNpb25MZW5ndGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxpbmU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0TGluZShib3g6IEJveCk6IExpbmUge1xuICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgIHg6IChib3hbMV0ueCArIGJveFswXS54KSAvIDIsXG4gICAgICAgICAgICB5OiAoYm94WzFdLnkgKyBib3hbMF0ueSkgLyAyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHg6IChib3hbM10ueCArIGJveFsyXS54KSAvIDIsXG4gICAgICAgICAgICB5OiAoYm94WzNdLnkgKyBib3hbMl0ueSkgLyAyXG4gICAgICAgIH1dO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RyeURlY29kZShsaW5lOiBMaW5lKTogQmFyY29kZUFuZEJhcmNvZGVMaW5lIHtcbiAgICAgICAgY29uc3QgZGVidWcgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHRoaXMuX2NvbmZpZy5kZWJ1ZztcblxuICAgICAgICBpZiAoZGVidWcgJiYgdGhpcy5fb3ZlcmxheUNvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYXdQYXRoKGxpbmUsICdyZWQnLCAzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBiYXJjb2RlTGluZSA9IEJyZXNlbmhhbS5nZXRCYXJjb2RlTGluZSh0aGlzLl9pbnB1dEltYWdlV3JhcHBlciwgbGluZVswXSwgbGluZVsxXSk7XG5cbiAgICAgICAgaWYgKGRlYnVnICYmIGRlYnVnLnNob3dGcmVxdWVuY3kpIHtcbiAgICAgICAgICAgIHRoaXMuX3ByaW50RnJlcXVlbmN5KGJhcmNvZGVMaW5lLmxpbmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgYmFyY29kZUxpbmUgPSBCcmVzZW5oYW0udG9CaW5hcnlMaW5lKGJhcmNvZGVMaW5lKTtcblxuICAgICAgICBpZiAoZGVidWcgJiYgZGVidWcuc2hvd1BhdHRlcm4pIHtcbiAgICAgICAgICAgIHRoaXMuX3ByaW50UGF0dGVybihiYXJjb2RlTGluZS5saW5lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjb2RlUmVzdWx0OiBCYXJjb2RlID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9iYXJjb2RlUmVhZGVycy5zb21lKHJlYWRlciA9PiAhIShjb2RlUmVzdWx0ID0gcmVhZGVyLmRlY29kZVBhdHRlcm4oYmFyY29kZUxpbmUubGluZSkpKTtcblxuICAgICAgICByZXR1cm4gY29kZVJlc3VsdCA/IHsgY29kZVJlc3VsdCwgYmFyY29kZUxpbmUgfSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2Qgc2xpY2VzIHRoZSBnaXZlbiBhcmVhIGFwYXJ0IGFuZCB0cmllcyB0byBkZXRlY3QgYSBiYXJjb2RlLXBhdHRlcm4gZm9yIGVhY2ggc2xpY2UuXG4gICAgICogSXQgcmV0dXJucyB0aGUgZGVjb2RlZCBiYXJjb2RlLCBvciBudWxsIGlmIG5vdGhpbmcgd2FzIGZvdW5kXG4gICAgICogQHBhcmFtIGJveFxuICAgICAqIEBwYXJhbSBsaW5lXG4gICAgICogQHBhcmFtIGxpbmVBbmdsZVxuICAgICAqL1xuICAgIHByaXZhdGUgX3RyeURlY29kZUJydXRlRm9yY2UoYm94OiBCb3gsIGxpbmU6IExpbmUsIGxpbmVBbmdsZTogbnVtYmVyKTogQmFyY29kZUFuZEJhcmNvZGVMaW5lIHtcbiAgICAgICAgY29uc3Qgc2lkZUxlbmd0aCA9IE1hdGguc3FydCgoYm94WzFdLnggLSBib3hbMF0ueCkgKiogMiArIChib3hbMV0ueSAtIGJveFswXS55KSAqKiAyKTtcbiAgICAgICAgY29uc3Qgc2xpY2VzID0gMTY7XG4gICAgICAgIGNvbnN0IHhkaXIgPSBNYXRoLnNpbihsaW5lQW5nbGUpO1xuICAgICAgICBjb25zdCB5ZGlyID0gTWF0aC5jb3MobGluZUFuZ2xlKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNsaWNlczsgaSsrKSB7XG4gICAgICAgICAgICAvLyBtb3ZlIGxpbmUgcGVycGVuZGljdWxhciB0byBhbmdsZVxuICAgICAgICAgICAgY29uc3QgZGlyID0gc2lkZUxlbmd0aCAvIHNsaWNlcyAqIGkgKiAoaSAlIDIgPT09IDAgPyAtMSA6IDEpO1xuICAgICAgICAgICAgbGluZVswXS55ICs9IGRpciAqIHhkaXI7XG4gICAgICAgICAgICBsaW5lWzBdLnggLT0gZGlyICogeWRpcjtcbiAgICAgICAgICAgIGxpbmVbMV0ueSArPSBkaXIgKiB4ZGlyO1xuICAgICAgICAgICAgbGluZVsxXS54IC09IGRpciAqIHlkaXI7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX3RyeURlY29kZShsaW5lKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXNlZCBmb3IgZGV2ZWxvcG1lbnQgb25seVxuICAgICAqL1xuICAgIHByaXZhdGUgX3ByaW50RnJlcXVlbmN5KGxpbmU6IEFycmF5PG51bWJlcj4pOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuX2ZyZXF1ZW5jeUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLl9mcmVxdWVuY3lDYW52YXMud2lkdGggPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgdGhpcy5fZnJlcXVlbmN5Q2FudmFzLmhlaWdodCA9IDI1NjtcblxuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJ2JsdWUnO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8oaSwgMjU1KTtcbiAgICAgICAgICAgIGNvbnRleHQubGluZVRvKGksIDI1NSAtIGxpbmVbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGZvciBkZXZlbG9wbWVudCBvbmx5XG4gICAgICovXG4gICAgcHJpdmF0ZSBfcHJpbnRQYXR0ZXJuKGxpbmU6IEFycmF5PG51bWJlcj4pOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuX3BhdHRlcm5DYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICB0aGlzLl9wYXR0ZXJuQ2FudmFzLndpZHRoID0gbGluZS5sZW5ndGg7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ2JsYWNrJztcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChsaW5lW2ldID09PSAxKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdChpLCAwLCAxLCAxMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZHJhd1BhdGgocGF0aDogQXJyYXk8UG9pbnQ+LCBjb2xvcjogc3RyaW5nLCBsaW5lV2lkdGg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBJbWFnZURlYnVnLmRyYXdQYXRoKHBhdGgsIHRoaXMuX292ZXJsYXlDb250ZXh0LCBjb2xvciwgbGluZVdpZHRoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uL2NvbW1vbi9wb2ludCc7XG5pbXBvcnQgeyBJbWFnZVdyYXBwZXIgfSBmcm9tICcuLi9jb21tb24vaW1hZ2Utd3JhcHBlcic7XG5cbmVudW0gU2xvcGUge1xuICAgIFVwID0gMSxcbiAgICBEb3duID0gLTFcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFyY29kZUxpbmUge1xuICAgIGxpbmU6IEFycmF5PG51bWJlcj47XG4gICAgbWF4PzogbnVtYmVyO1xuICAgIG1pbj86IG51bWJlcjtcbiAgICB0aHJlc2hvbGQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCBCcmVzZW5oYW0gPSB7XG4gICAgLyoqXG4gICAgICogU2NhbnMgYSBsaW5lIG9mIHRoZSBnaXZlbiBpbWFnZSBmcm9tIHBvaW50IHAxIHRvIHAyIGFuZCByZXR1cm5zIGEgcmVzdWx0IG9iamVjdCBjb250YWluaW5nXG4gICAgICogZ3JheS1zY2FsZSB2YWx1ZXMgKDAtMjU1KSBvZiB0aGUgdW5kZXJseWluZyBwaXhlbHMgaW4gYWRkaXRpb24gdG8gdGhlIG1pbiBhbmQgbWF4IHZhbHVlcy5cbiAgICAgKiBAcGFyYW0gaW1hZ2VXcmFwcGVyXG4gICAgICogQHBhcmFtIHAxIFRoZSBzdGFydCBwb2ludCB7eCx5fVxuICAgICAqIEBwYXJhbSBwMiBUaGUgZW5kIHBvaW50IHt4LHl9XG4gICAgICogQHJldHVybnMge2xpbmUsIG1pbiwgbWF4fVxuICAgICAqL1xuICAgIGdldEJhcmNvZGVMaW5lKGltYWdlV3JhcHBlcjogSW1hZ2VXcmFwcGVyLCBwMTogUG9pbnQsIHAyOiBQb2ludCk6IEJhcmNvZGVMaW5lIHtcbiAgICAgICAgbGV0IHgwID0gcDEueCB8IDA7XG4gICAgICAgIGxldCB5MCA9IHAxLnkgfCAwO1xuICAgICAgICBsZXQgeDEgPSBwMi54IHwgMDtcbiAgICAgICAgbGV0IHkxID0gcDIueSB8IDA7XG4gICAgICAgIGNvbnN0IHN0ZWVwID0gTWF0aC5hYnMoeTEgLSB5MCkgPiBNYXRoLmFicyh4MSAtIHgwKTtcbiAgICAgICAgbGV0IHRtcDogbnVtYmVyO1xuICAgICAgICBjb25zdCBsaW5lID0gW107XG4gICAgICAgIGNvbnN0IGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhO1xuICAgICAgICBjb25zdCB3aWR0aCA9IGltYWdlV3JhcHBlci5zaXplLng7XG4gICAgICAgIGxldCB2YWw6IG51bWJlcjtcbiAgICAgICAgbGV0IG1pbiA9IDI1NTtcbiAgICAgICAgbGV0IG1heCA9IDA7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVhZChhOiBudW1iZXIsIGI6IG51bWJlcikge1xuICAgICAgICAgICAgdmFsID0gaW1hZ2VEYXRhW2IgKiB3aWR0aCArIGFdO1xuICAgICAgICAgICAgbWluID0gdmFsIDwgbWluID8gdmFsIDogbWluO1xuICAgICAgICAgICAgbWF4ID0gdmFsID4gbWF4ID8gdmFsIDogbWF4O1xuICAgICAgICAgICAgbGluZS5wdXNoKHZhbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RlZXApIHtcbiAgICAgICAgICAgIHRtcCA9IHgwO1xuICAgICAgICAgICAgeDAgPSB5MDtcbiAgICAgICAgICAgIHkwID0gdG1wO1xuXG4gICAgICAgICAgICB0bXAgPSB4MTtcbiAgICAgICAgICAgIHgxID0geTE7XG4gICAgICAgICAgICB5MSA9IHRtcDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeDAgPiB4MSkge1xuICAgICAgICAgICAgdG1wID0geDA7XG4gICAgICAgICAgICB4MCA9IHgxO1xuICAgICAgICAgICAgeDEgPSB0bXA7XG5cbiAgICAgICAgICAgIHRtcCA9IHkwO1xuICAgICAgICAgICAgeTAgPSB5MTtcbiAgICAgICAgICAgIHkxID0gdG1wO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRlbHRheCA9IHgxIC0geDA7XG4gICAgICAgIGxldCBkZWx0YXkgPSBNYXRoLmFicyh5MSAtIHkwKTtcbiAgICAgICAgbGV0IGVycm9yID0gKGRlbHRheCAvIDIpIHwgMDtcbiAgICAgICAgbGV0IHkgPSB5MDtcbiAgICAgICAgbGV0IHlzdGVwID0geTAgPCB5MSA/IDEgOiAtMTtcblxuICAgICAgICBmb3IgKGxldCB4ID0geDA7IHggPCB4MTsgeCsrKSB7XG4gICAgICAgICAgICBpZiAoc3RlZXApIHtcbiAgICAgICAgICAgICAgICByZWFkKHksIHgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWFkKHgsIHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXJyb3IgPSBlcnJvciAtIGRlbHRheTtcbiAgICAgICAgICAgIGlmIChlcnJvciA8IDApIHtcbiAgICAgICAgICAgICAgICB5ICs9IHlzdGVwO1xuICAgICAgICAgICAgICAgIGVycm9yID0gZXJyb3IgKyBkZWx0YXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGluZSxcbiAgICAgICAgICAgIG1pbixcbiAgICAgICAgICAgIG1heFxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGUgcmVzdWx0IGZyb20gZ2V0QmFyY29kZUxpbmUgaW50byBhIGJpbmFyeSByZXByZXNlbnRhdGlvblxuICAgICAqIGFsc28gY29uc2lkZXJpbmcgdGhlIGZyZXF1ZW5jeSBhbmQgc2xvcGUgb2YgdGhlIHNpZ25hbCBmb3IgbW9yZSByb2J1c3QgcmVzdWx0c1xuICAgICAqIEBwYXJhbSByZXN1bHQge2xpbmUsIG1pbiwgbWF4fVxuICAgICAqL1xuICAgIHRvQmluYXJ5TGluZShyZXN1bHQ6IEJhcmNvZGVMaW5lKTogQmFyY29kZUxpbmUge1xuICAgICAgICBjb25zdCBtaW4gPSByZXN1bHQubWluO1xuICAgICAgICBjb25zdCBtYXggPSByZXN1bHQubWF4O1xuICAgICAgICBjb25zdCBsaW5lID0gcmVzdWx0LmxpbmU7XG4gICAgICAgIGNvbnN0IGNlbnRlciA9IG1pbiArIChtYXggLSBtaW4pIC8gMjtcbiAgICAgICAgY29uc3QgZXh0cmVtYSA9IG5ldyBBcnJheTx7IHBvczogbnVtYmVyOyB2YWw6IG51bWJlcjsgfT4oKTtcbiAgICAgICAgbGV0IHRocmVzaG9sZCA9IChtYXggLSBtaW4pIC8gMTI7XG4gICAgICAgIGNvbnN0IHJUaHJlc2hvbGQgPSAtdGhyZXNob2xkO1xuXG4gICAgICAgIC8vIDEuIGZpbmQgZXh0cmVtYVxuICAgICAgICBsZXQgY3VycmVudERpciA9IGxpbmVbMF0gPiBjZW50ZXIgPyBTbG9wZS5VcCA6IFNsb3BlLkRvd247XG4gICAgICAgIGV4dHJlbWEucHVzaCh7XG4gICAgICAgICAgICBwb3M6IDAsXG4gICAgICAgICAgICB2YWw6IGxpbmVbMF1cbiAgICAgICAgfSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZS5sZW5ndGggLSAyOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHNsb3BlID0gKGxpbmVbaSArIDFdIC0gbGluZVtpXSk7XG4gICAgICAgICAgICBjb25zdCBzbG9wZTIgPSAobGluZVtpICsgMl0gLSBsaW5lW2kgKyAxXSk7XG4gICAgICAgICAgICBsZXQgZGlyOiBTbG9wZTtcbiAgICAgICAgICAgIGlmICgoc2xvcGUgKyBzbG9wZTIpIDwgclRocmVzaG9sZCAmJiBsaW5lW2kgKyAxXSA8IChjZW50ZXIgKiAxLjUpKSB7XG4gICAgICAgICAgICAgICAgZGlyID0gU2xvcGUuRG93bjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHNsb3BlICsgc2xvcGUyKSA+IHRocmVzaG9sZCAmJiBsaW5lW2kgKyAxXSA+IChjZW50ZXIgKiAwLjUpKSB7XG4gICAgICAgICAgICAgICAgZGlyID0gU2xvcGUuVXA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpciA9IGN1cnJlbnREaXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50RGlyICE9PSBkaXIpIHtcbiAgICAgICAgICAgICAgICBleHRyZW1hLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBwb3M6IGksXG4gICAgICAgICAgICAgICAgICAgIHZhbDogbGluZVtpXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGN1cnJlbnREaXIgPSBkaXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZXh0cmVtYS5wdXNoKHtcbiAgICAgICAgICAgIHBvczogbGluZS5sZW5ndGgsXG4gICAgICAgICAgICB2YWw6IGxpbmVbbGluZS5sZW5ndGggLSAxXVxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGxldCBqID0gZXh0cmVtYVswXS5wb3M7IGogPCBleHRyZW1hWzFdLnBvczsgaisrKSB7XG4gICAgICAgICAgICBsaW5lW2pdID0gbGluZVtqXSA+IGNlbnRlciA/IDAgOiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaXRlcmF0ZSBvdmVyIGV4dHJlbWEgYW5kIGNvbnZlcnQgdG8gYmluYXJ5IGJhc2VkIG9uIGF2ZyBiZXR3ZWVuIG1pbm1heFxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGV4dHJlbWEubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZXh0cmVtYVtpICsgMV0udmFsID4gZXh0cmVtYVtpXS52YWwpIHtcbiAgICAgICAgICAgICAgICB0aHJlc2hvbGQgPSAoZXh0cmVtYVtpXS52YWwgKyAoKGV4dHJlbWFbaSArIDFdLnZhbCAtIGV4dHJlbWFbaV0udmFsKSAvIDMpICogMikgfCAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJlc2hvbGQgPSAoZXh0cmVtYVtpICsgMV0udmFsICsgKChleHRyZW1hW2ldLnZhbCAtIGV4dHJlbWFbaSArIDFdLnZhbCkgLyAzKSkgfCAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gZXh0cmVtYVtpXS5wb3M7IGogPCBleHRyZW1hW2kgKyAxXS5wb3M7IGorKykge1xuICAgICAgICAgICAgICAgIGxpbmVbal0gPSBsaW5lW2pdID4gdGhyZXNob2xkID8gMCA6IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4ucmVzdWx0LFxuICAgICAgICAgICAgdGhyZXNob2xkXG4gICAgICAgIH07XG4gICAgfVxufTtcbiIsImltcG9ydCB7IGdldFVzZXJNZWRpYSwgZW51bWVyYXRlRGV2aWNlcyB9IGZyb20gJy4uL2NvbW1vbi9tZWRpYS1kZXZpY2VzJztcblxubGV0IF9zdHJlYW06IE1lZGlhU3RyZWFtO1xuXG5leHBvcnQgY29uc3QgQ2FtZXJhQWNjZXNzID0ge1xuICAgIC8qKlxuICAgICAqIEF0dGVtcHRzIHRvIGF0dGFjaCB0aGUgY2FtZXJhLXN0cmVhbSB0byBhIGdpdmVuIHZpZGVvIGVsZW1lbnRcbiAgICAgKiBhbmQgY2FsbHMgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gdGhlIGNvbnRlbnQgaXMgcmVhZHlcbiAgICAgKiBAcGFyYW0gdmlkZW9cbiAgICAgKiBAcGFyYW0gdmlkZW9Db25zdHJhaW50c1xuICAgICAqL1xuICAgIGFzeW5jIHJlcXVlc3QodmlkZW86IEhUTUxWaWRlb0VsZW1lbnQsIHZpZGVvQ29uc3RyYWludHM6IE1lZGlhVHJhY2tDb25zdHJhaW50cyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBub3JtYWxpemVkQ29uc3RyYWludHMgPSBDYW1lcmFBY2Nlc3MucGlja0NvbnN0cmFpbnRzKHZpZGVvQ29uc3RyYWludHMpO1xuICAgICAgICBfc3RyZWFtID0gYXdhaXQgZ2V0VXNlck1lZGlhKG5vcm1hbGl6ZWRDb25zdHJhaW50cyk7XG4gICAgICAgIHZpZGVvLnNyY09iamVjdCA9IF9zdHJlYW07XG4gICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnYXV0b3BsYXknLCAnJyk7XG4gICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnbXV0ZWQnLCAnJyk7XG4gICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAnJyk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCAoKSA9PiB7XG4gICAgICAgICAgICB2aWRlby5wbGF5KCk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pKS50aGVuKF93YWl0Rm9yVmlkZW8uYmluZChudWxsLCB2aWRlbykpO1xuICAgIH0sXG5cbiAgICByZWxlYXNlKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0cmFja3MgPSBfc3RyZWFtICYmIF9zdHJlYW0uZ2V0VmlkZW9UcmFja3MoKTtcbiAgICAgICAgaWYgKHRyYWNrcyAmJiB0cmFja3MubGVuZ3RoKSB7XG4gICAgICAgICAgICB0cmFja3NbMF0uc3RvcCgpO1xuICAgICAgICB9XG4gICAgICAgIF9zdHJlYW0gPSBudWxsO1xuICAgIH0sXG5cbiAgICBhc3luYyBlbnVtZXJhdGVWaWRlb0RldmljZXMoKTogUHJvbWlzZTxBcnJheTxNZWRpYURldmljZUluZm8+PiB7XG4gICAgICAgIGNvbnN0IGRldmljZXMgPSBhd2FpdCBlbnVtZXJhdGVEZXZpY2VzKCk7XG4gICAgICAgIHJldHVybiBkZXZpY2VzLmZpbHRlcigoeyBraW5kIH0pID0+IGtpbmQgPT09ICd2aWRlb2lucHV0Jyk7XG4gICAgfSxcblxuICAgIGdldEFjdGl2ZVN0cmVhbUxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHRyYWNrID0gQ2FtZXJhQWNjZXNzLmdldEFjdGl2ZVRyYWNrKCk7XG4gICAgICAgIHJldHVybiB0cmFjayA/IHRyYWNrLmxhYmVsIDogJyc7XG4gICAgfSxcblxuICAgIGdldEFjdGl2ZVRyYWNrKCkge1xuICAgICAgICBjb25zdCB0cmFja3MgPSBfc3RyZWFtICYmIF9zdHJlYW0uZ2V0VmlkZW9UcmFja3MoKTtcbiAgICAgICAgaWYgKHRyYWNrcyAmJiB0cmFja3MubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJhY2tzWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIHBpY2tDb25zdHJhaW50cyh2aWRlb0NvbnN0cmFpbnRzOiBNZWRpYVRyYWNrQ29uc3RyYWludHMpOiBNZWRpYVN0cmVhbUNvbnN0cmFpbnRzIHtcbiAgICAgICAgbGV0IHsgd2lkdGgsIGhlaWdodCwgZmFjaW5nTW9kZSwgYXNwZWN0UmF0aW8sIGRldmljZUlkIH0gPSB2aWRlb0NvbnN0cmFpbnRzO1xuICAgICAgICBjb25zdCB7IG1pbkFzcGVjdFJhdGlvLCBmYWNpbmcgfSA9IHZpZGVvQ29uc3RyYWludHMgYXMgYW55O1xuXG4gICAgICAgIGlmICh0eXBlb2YgbWluQXNwZWN0UmF0aW8gIT09ICd1bmRlZmluZWQnICYmIG1pbkFzcGVjdFJhdGlvID4gMCkge1xuICAgICAgICAgICAgYXNwZWN0UmF0aW8gPSBtaW5Bc3BlY3RSYXRpbztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBXQVJOSU5HOiBDb25zdHJhaW50ICdtaW5Bc3BlY3RSYXRpbycgaXMgZGVwcmVjYXRlZDsgVXNlICdhc3BlY3RSYXRpbycgaW5zdGVhZGApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBmYWNpbmcgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBmYWNpbmdNb2RlID0gZmFjaW5nO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFdBUk5JTkc6IENvbnN0cmFpbnQgJ2ZhY2luZycgaXMgZGVwcmVjYXRlZC4gVXNlICdmYWNpbmdNb2RlJyBpbnN0ZWFkJ2ApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZENvbnN0cmFpbnRzID0gZGV2aWNlSWQgJiYgZmFjaW5nTW9kZSA/XG4gICAgICAgICAgICB7IHdpZHRoLCBoZWlnaHQsIGFzcGVjdFJhdGlvLCBkZXZpY2VJZCB9IDogeyB3aWR0aCwgaGVpZ2h0LCBmYWNpbmdNb2RlLCBhc3BlY3RSYXRpbywgZGV2aWNlSWQgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYXVkaW86IGZhbHNlLFxuICAgICAgICAgICAgdmlkZW86IG5vcm1hbGl6ZWRDb25zdHJhaW50c1xuICAgICAgICB9O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gX3dhaXRGb3JWaWRlbyh7IHZpZGVvV2lkdGgsIHZpZGVvSGVpZ2h0IH0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBsZXQgYXR0ZW1wdHMgPSAxMDtcblxuICAgICAgICBmdW5jdGlvbiBjaGVja1ZpZGVvKCkge1xuICAgICAgICAgICAgaWYgKGF0dGVtcHRzID4gMCkge1xuICAgICAgICAgICAgICAgIGlmICh2aWRlb1dpZHRoID4gMTAgJiYgdmlkZW9IZWlnaHQgPiAxMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7dmlkZW9XaWR0aH1weCB4ICR7dmlkZW9IZWlnaHR9cHhgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2hlY2tWaWRlbywgNTAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlamVjdCgnVW5hYmxlIHRvIHBsYXkgdmlkZW8gc3RyZWFtLiBJcyB3ZWJjYW0gd29ya2luZz8nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF0dGVtcHRzLS07XG4gICAgICAgIH1cbiAgICAgICAgY2hlY2tWaWRlbygpO1xuICAgIH0pO1xufVxuIiwiLyoqXG4gKiBAYm9ycm93cyBodHRwczovL2dpdGh1Yi5jb20vZXhpZi1qcy9leGlmLWpzXG4gKi9cblxuY29uc3QgRXhpZlRhZ3MgPSB7IDB4MDExMjogJ29yaWVudGF0aW9uJyB9O1xuZXhwb3J0IGNvbnN0IEF2YWlsYWJsZVRhZ3M6IEFycmF5PHN0cmluZz4gPSBPYmplY3Qua2V5cyhFeGlmVGFncykubWFwKGtleSA9PiBFeGlmVGFnc1trZXldKTtcblxuZXhwb3J0IGludGVyZmFjZSBUYWdzIHtcbiAgICBba2V5OiBzdHJpbmddOiBudW1iZXIgfCBzdHJpbmc7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaW5kVGFnc0luT2JqZWN0VVJMKHNyYzogc3RyaW5nLCB0YWdzID0gQXZhaWxhYmxlVGFncyk6IFByb21pc2U8VGFncz4ge1xuICAgIGlmICgvXmJsb2I6L2kudGVzdChzcmMpKSB7XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IGF3YWl0IG9iamVjdFVSTFRvQmxvYihzcmMpO1xuICAgICAgICByZXR1cm4gZmluZFRhZ3NJbkJ1ZmZlcihidWZmZXIsIHRhZ3MpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZFRhZ3NJbkJ1ZmZlcihmaWxlOiBBcnJheUJ1ZmZlciwgc2VsZWN0ZWRUYWdzOiBBcnJheTxzdHJpbmc+ID0gQXZhaWxhYmxlVGFncyk6IFRhZ3Mge1xuICAgIGNvbnN0IGRhdGFWaWV3ID0gbmV3IERhdGFWaWV3KGZpbGUpO1xuICAgIGNvbnN0IGxlbmd0aCA9IGZpbGUuYnl0ZUxlbmd0aDtcbiAgICBjb25zdCBleGlmVGFncyA9IHNlbGVjdGVkVGFncy5yZWR1Y2UoKHJlc3VsdCwgc2VsZWN0ZWRUYWcpID0+IHtcbiAgICAgICAgY29uc3QgZXhpZlRhZyA9IE9iamVjdC5rZXlzKEV4aWZUYWdzKS5maW5kKHRhZyA9PiBFeGlmVGFnc1t0YWddID09PSBzZWxlY3RlZFRhZyk7XG4gICAgICAgIGlmIChleGlmVGFnKSB7XG4gICAgICAgICAgICByZXN1bHRbZXhpZlRhZ10gPSBzZWxlY3RlZFRhZztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIHt9KTtcbiAgICBsZXQgb2Zmc2V0ID0gMjtcblxuICAgIGlmICgoZGF0YVZpZXcuZ2V0VWludDgoMCkgIT09IDB4RkYpIHx8IChkYXRhVmlldy5nZXRVaW50OCgxKSAhPT0gMHhEOCkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgd2hpbGUgKG9mZnNldCA8IGxlbmd0aCkge1xuICAgICAgICBpZiAoZGF0YVZpZXcuZ2V0VWludDgob2Zmc2V0KSAhPT0gMHhGRikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtYXJrZXIgPSBkYXRhVmlldy5nZXRVaW50OChvZmZzZXQgKyAxKTtcbiAgICAgICAgaWYgKG1hcmtlciA9PT0gMHhFMSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRFWElGRGF0YShkYXRhVmlldywgb2Zmc2V0ICsgNCwgZXhpZlRhZ3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2Zmc2V0ICs9IDIgKyBkYXRhVmlldy5nZXRVaW50MTYob2Zmc2V0ICsgMik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gb2JqZWN0VVJMVG9CbG9iKHVybDogc3RyaW5nKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmFycmF5QnVmZmVyKCk7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdIVFRQIEVycm9yICcgKyByZXNwb25zZS5zdGF0dXMpO1xufVxuXG5mdW5jdGlvbiByZWFkRVhJRkRhdGEoZGF0YVZpZXc6IERhdGFWaWV3LCBzdGFydDogbnVtYmVyLCBleGlmVGFnczogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSk6IFRhZ3Mge1xuICAgIGlmICgnRXhpZicuc3BsaXQoJycpLnNvbWUoKGNoYXIsIGluZGV4KSA9PiBkYXRhVmlldy5nZXRVaW50OChzdGFydCArIGluZGV4KSAhPT0gY2hhci5jaGFyQ29kZUF0KDApKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB0aWZmT2Zmc2V0ID0gc3RhcnQgKyA2O1xuICAgIGxldCBiaWdFbmQ6IGJvb2xlYW47XG5cbiAgICBpZiAoZGF0YVZpZXcuZ2V0VWludDE2KHRpZmZPZmZzZXQpID09PSAweDQ5NDkpIHtcbiAgICAgICAgYmlnRW5kID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChkYXRhVmlldy5nZXRVaW50MTYodGlmZk9mZnNldCkgPT09IDB4NEQ0RCkge1xuICAgICAgICBiaWdFbmQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChkYXRhVmlldy5nZXRVaW50MTYodGlmZk9mZnNldCArIDIsICFiaWdFbmQpICE9PSAweDAwMkEpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZmlyc3RJRkRPZmZzZXQgPSBkYXRhVmlldy5nZXRVaW50MzIodGlmZk9mZnNldCArIDQsICFiaWdFbmQpO1xuICAgIGlmIChmaXJzdElGRE9mZnNldCA8IDB4MDAwMDAwMDgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgdGFncyA9IHJlYWRUYWdzKGRhdGFWaWV3LCB0aWZmT2Zmc2V0ICsgZmlyc3RJRkRPZmZzZXQsIGV4aWZUYWdzLCBiaWdFbmQpO1xuICAgIHJldHVybiB0YWdzO1xufVxuXG5mdW5jdGlvbiByZWFkVGFncyhkYXRhVmlldzogRGF0YVZpZXcsIGRpclN0YXJ0OiBudW1iZXIsIHN0cmluZ3M6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0sIGJpZ0VuZDogYm9vbGVhbik6IFRhZ3Mge1xuICAgIGNvbnN0IGVudHJpZXMgPSBkYXRhVmlldy5nZXRVaW50MTYoZGlyU3RhcnQsICFiaWdFbmQpO1xuICAgIGNvbnN0IHRhZ3M6IFRhZ3MgPSB7fTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW50cmllczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGVudHJ5T2Zmc2V0ID0gZGlyU3RhcnQgKyBpICogMTIgKyAyO1xuICAgICAgICBjb25zdCB0YWcgPSBzdHJpbmdzW2RhdGFWaWV3LmdldFVpbnQxNihlbnRyeU9mZnNldCwgIWJpZ0VuZCldO1xuICAgICAgICBpZiAodGFnKSB7XG4gICAgICAgICAgICB0YWdzW3RhZ10gPSByZWFkVGFnVmFsdWUoZGF0YVZpZXcsIGVudHJ5T2Zmc2V0LCBiaWdFbmQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhZ3M7XG59XG5cbmZ1bmN0aW9uIHJlYWRUYWdWYWx1ZShkYXRhVmlldzogRGF0YVZpZXcsIGVudHJ5T2Zmc2V0OiBudW1iZXIsIGJpZ0VuZDogYm9vbGVhbik6IG51bWJlciB8IHN0cmluZyB7XG4gICAgY29uc3QgdHlwZSA9IGRhdGFWaWV3LmdldFVpbnQxNihlbnRyeU9mZnNldCArIDIsICFiaWdFbmQpO1xuICAgIGNvbnN0IG51bVZhbHVlcyA9IGRhdGFWaWV3LmdldFVpbnQzMihlbnRyeU9mZnNldCArIDQsICFiaWdFbmQpO1xuXG4gICAgcmV0dXJuIHR5cGUgPT09IDMgJiYgbnVtVmFsdWVzID09PSAxID8gZGF0YVZpZXcuZ2V0VWludDE2KGVudHJ5T2Zmc2V0ICsgOCwgIWJpZ0VuZCkgOiB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uL2NvbW1vbi9wb2ludCc7XG5pbXBvcnQgeyBJbnB1dFN0cmVhbSB9IGZyb20gJy4vaW5wdXQtc3RyZWFtJztcbmltcG9ydCB7IElucHV0U3RyZWFtQ29uZmlnIH0gZnJvbSAnLi9pbnB1dC1zdHJlYW0tY29uZmlnJztcblxuY29uc3QgUVVBVEVSX0NJUkNMRSA9IE1hdGguUEkgLyAyO1xuXG5leHBvcnQgY2xhc3MgRnJhbWVHcmFiYmVyIHtcbiAgICBwcml2YXRlIF9pbnB1dFN0cmVhbTogSW5wdXRTdHJlYW07XG4gICAgcHJpdmF0ZSBfc3RyZWFtQ29uZmlnOiBJbnB1dFN0cmVhbUNvbmZpZztcbiAgICBwcml2YXRlIF9jYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHByaXZhdGUgX2NvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICBwcml2YXRlIF9kYXRhOiBVaW50OEFycmF5O1xuICAgIHByaXZhdGUgX2NhbnZhc0hlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2NhbnZhc1dpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfaGVpZ2h0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfd2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIF90b3BMZWZ0OiBQb2ludDtcblxuICAgIGNvbnN0cnVjdG9yKGlucHV0U3RyZWFtOiBJbnB1dFN0cmVhbSwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgICAgICB0aGlzLl9pbnB1dFN0cmVhbSA9IGlucHV0U3RyZWFtO1xuICAgICAgICB0aGlzLl9zdHJlYW1Db25maWcgPSBpbnB1dFN0cmVhbS5jb25maWc7XG4gICAgICAgIHRoaXMuX2NhbnZhc1dpZHRoID0gaW5wdXRTdHJlYW0uY2FudmFzV2lkdGg7XG4gICAgICAgIHRoaXMuX2NhbnZhc0hlaWdodCA9IGlucHV0U3RyZWFtLmNhbnZhc0hlaWdodDtcbiAgICAgICAgdGhpcy5fd2lkdGggPSBpbnB1dFN0cmVhbS53aWR0aDtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gaW5wdXRTdHJlYW0uaGVpZ2h0O1xuICAgICAgICB0aGlzLl90b3BMZWZ0ID0gaW5wdXRTdHJlYW0udG9wTGVmdDtcbiAgICAgICAgdGhpcy5fY2FudmFzID0gY2FudmFzIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSB0aGlzLl9jYW52YXNXaWR0aDtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IHRoaXMuX2NhbnZhc0hlaWdodDtcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLl9kYXRhID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fd2lkdGggKiB0aGlzLl9oZWlnaHQpO1xuXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRnJhbWVHcmFiYmVyJywgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHNpemU6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogdGhpcy5fd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuX2hlaWdodFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdG9wTGVmdDogdGhpcy5fdG9wTGVmdCxcbiAgICAgICAgICAgICAgICB2aWRlb1NpemU6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogaW5wdXRTdHJlYW0ucmVhbFdpZHRoLFxuICAgICAgICAgICAgICAgICAgICB5OiBpbnB1dFN0cmVhbS5yZWFsSGVpZ2h0XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjYW52YXNTaXplOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHRoaXMuX2NhbnZhc1dpZHRoLFxuICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLl9jYW52YXNIZWlnaHRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGZXRjaGVzIGEgZnJhbWUgZnJvbSB0aGUgaW5wdXQgc3RyZWFtIGFuZCBwdXRzIGludG8gdGhlIGZyYW1lIGJ1ZmZlci5cbiAgICAgKiBUaGUgaW1hZ2UgZGF0YSBpcyBjb252ZXJ0ZWQgdG8gZ3JheSBzY2FsZSBhbmQgdGhlbiBoYWxmLXNhbXBsZWQgaWYgY29uZmlndXJlZC5cbiAgICAgKi9cbiAgICBncmFiKGRhdGE6IFVpbnQ4QXJyYXkpOiBib29sZWFuIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gICAgICAgIGNvbnN0IGZyYW1lID0gdGhpcy5faW5wdXRTdHJlYW0uZ2V0RnJhbWUoKTtcblxuICAgICAgICBpZiAoZnJhbWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkanVzdENhbnZhc1NpemUoKTtcblxuICAgICAgICAgICAgbGV0IGRyYXdhYmxlOiBIVE1MSW1hZ2VFbGVtZW50IHwgSFRNTFZpZGVvRWxlbWVudDtcbiAgICAgICAgICAgIGxldCBkcmF3QW5nbGUgPSAwO1xuXG4gICAgICAgICAgICBpZiAoZnJhbWUgaW5zdGFuY2VvZiBIVE1MVmlkZW9FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZHJhd2FibGUgPSBmcmFtZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZHJhd2FibGUgPSBmcmFtZS5pbWFnZTtcblxuICAgICAgICAgICAgICAgIGlmIChmcmFtZS50YWdzKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZnJhbWUudGFncy5vcmllbnRhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA2OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhd0FuZ2xlID0gUVVBVEVSX0NJUkNMRTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgODoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYXdBbmdsZSA9IC1RVUFURVJfQ0lSQ0xFO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZHJhd0FuZ2xlICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGFsZldpZHRoID0gdGhpcy5fY2FudmFzV2lkdGggPj4gMTtcbiAgICAgICAgICAgICAgICBjb25zdCBoYWxmSGVpZ2h0ID0gdGhpcy5fY2FudmFzSGVpZ2h0ID4+IDE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZXh0LnRyYW5zbGF0ZShoYWxmV2lkdGgsIGhhbGZIZWlnaHQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRleHQucm90YXRlKGRyYXdBbmdsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGV4dC5kcmF3SW1hZ2UoZHJhd2FibGUsIC1oYWxmSGVpZ2h0LCAtaGFsZldpZHRoLCB0aGlzLl9jYW52YXNIZWlnaHQsIHRoaXMuX2NhbnZhc1dpZHRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZXh0LnJvdGF0ZSgtZHJhd0FuZ2xlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZXh0LnRyYW5zbGF0ZSgtaGFsZldpZHRoLCAtaGFsZkhlaWdodCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuZHJhd0ltYWdlKGRyYXdhYmxlLCAwLCAwLCB0aGlzLl9jYW52YXNXaWR0aCwgdGhpcy5fY2FudmFzSGVpZ2h0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgaW1hZ2VEYXRhID0gdGhpcy5fY29udGV4dC5nZXRJbWFnZURhdGEodGhpcy5fdG9wTGVmdC54LCB0aGlzLl90b3BMZWZ0LnksIHRoaXMuX3dpZHRoLCB0aGlzLl9oZWlnaHQpLmRhdGE7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9zdHJlYW1Db25maWcuaGFsZlNhbXBsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dyYXlBbmRIYWxmU2FtcGxlRnJvbUNhbnZhc0RhdGEoaW1hZ2VEYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcHV0ZUdyYXkoaW1hZ2VEYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9hZGp1c3RDYW52YXNTaXplKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fY2FudmFzLmhlaWdodCAhPT0gdGhpcy5fY2FudmFzSGVpZ2h0IHx8IHRoaXMuX2NhbnZhcy53aWR0aCAhPT0gdGhpcy5fY2FudmFzV2lkdGgpIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdDYW52YXMgc2l6ZSBuZWVkcyB0byBiZSBhZGp1c3RlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IHRoaXMuX2NhbnZhc0hlaWdodDtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IHRoaXMuX2NhbnZhc1dpZHRoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ3JheUFuZEhhbGZTYW1wbGVGcm9tQ2FudmFzRGF0YShpbWFnZURhdGE6IFVpbnQ4Q2xhbXBlZEFycmF5KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGVuZEluZGV4ID0gaW1hZ2VEYXRhLmxlbmd0aCA+PiAyO1xuICAgICAgICBjb25zdCBvdXRXaWR0aCA9IHRoaXMuX3dpZHRoID4+IDE7XG4gICAgICAgIGxldCB0b3BSb3dJbmRleCA9IDA7XG4gICAgICAgIGxldCBib3R0b21Sb3dJbmRleCA9IHRoaXMuX3dpZHRoO1xuICAgICAgICBsZXQgb3V0SW1hZ2VJbmRleCA9IDA7XG5cbiAgICAgICAgd2hpbGUgKGJvdHRvbVJvd0luZGV4IDwgZW5kSW5kZXgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0V2lkdGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvcDQgPSB0b3BSb3dJbmRleCA8PCAyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJvdHRvbTQgPSBib3R0b21Sb3dJbmRleCA8PCAyO1xuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFbb3V0SW1hZ2VJbmRleF0gPSAoXG4gICAgICAgICAgICAgICAgICAgICgwLjI5OSAqIGltYWdlRGF0YVt0b3A0ICsgMF0gKyAwLjU4NyAqIGltYWdlRGF0YVt0b3A0ICsgMV0gKyAwLjExNCAqIGltYWdlRGF0YVt0b3A0ICsgMl0pICtcbiAgICAgICAgICAgICAgICAgICAgKDAuMjk5ICogaW1hZ2VEYXRhW3RvcDQgKyA0XSArIDAuNTg3ICogaW1hZ2VEYXRhW3RvcDQgKyA1XSArIDAuMTE0ICogaW1hZ2VEYXRhW3RvcDQgKyA2XSkgK1xuICAgICAgICAgICAgICAgICAgICAoMC4yOTkgKiBpbWFnZURhdGFbYm90dG9tNCArIDBdICsgMC41ODcgKiBpbWFnZURhdGFbYm90dG9tNCArIDFdICsgMC4xMTQgKiBpbWFnZURhdGFbYm90dG9tNCArIDJdKSArXG4gICAgICAgICAgICAgICAgICAgICgwLjI5OSAqIGltYWdlRGF0YVtib3R0b200ICsgNF0gKyAwLjU4NyAqIGltYWdlRGF0YVtib3R0b200ICsgNV0gKyAwLjExNCAqIGltYWdlRGF0YVtib3R0b200ICsgNl0pXG4gICAgICAgICAgICAgICAgKSAvIDQgfCAwO1xuICAgICAgICAgICAgICAgIG91dEltYWdlSW5kZXgrKztcbiAgICAgICAgICAgICAgICB0b3BSb3dJbmRleCArPSAyO1xuICAgICAgICAgICAgICAgIGJvdHRvbVJvd0luZGV4ICs9IDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b3BSb3dJbmRleCArPSB0aGlzLl93aWR0aDtcbiAgICAgICAgICAgIGJvdHRvbVJvd0luZGV4ICs9IHRoaXMuX3dpZHRoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY29tcHV0ZUdyYXkoaW1hZ2VEYXRhOiBVaW50OENsYW1wZWRBcnJheSk6IHZvaWQge1xuICAgICAgICBjb25zdCBpbWFnZURhdGFMZW5ndGggPSBpbWFnZURhdGEubGVuZ3RoO1xuXG4gICAgICAgIGlmICh0aGlzLl9zdHJlYW1Db25maWcgJiYgdGhpcy5fc3RyZWFtQ29uZmlnLnNpbmdsZUNoYW5uZWwpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBqID0gMDsgaSA8IGltYWdlRGF0YUxlbmd0aDsgaSArPSA0LCBqKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhW2pdID0gaW1hZ2VEYXRhW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGogPSAwOyBpIDwgaW1hZ2VEYXRhTGVuZ3RoOyBpICs9IDQsIGorKykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFbal0gPSAwLjI5OSAqIGltYWdlRGF0YVtpXSArIDAuNTg3ICogaW1hZ2VEYXRhW2kgKyAxXSArIDAuMTE0ICogaW1hZ2VEYXRhW2kgKyAyXSB8IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBmaW5kVGFnc0luT2JqZWN0VVJMLCBUYWdzIH0gZnJvbSAnLi9leGlmLWhlbHBlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW1hZ2VJbmZvIHtcbiAgICBpbWFnZTogSFRNTEltYWdlRWxlbWVudDtcbiAgICB0YWdzPzogVGFncztcbn1cblxuZXhwb3J0IGNsYXNzIEltYWdlTG9hZGVyIHtcbiAgICBzdGF0aWMgYXN5bmMgbG9hZChcbiAgICAgICAgYmFzZVVyaTogc3RyaW5nLFxuICAgICAgICBjYWxsYmFjazogKF86IEFycmF5PEltYWdlSW5mbz4pID0+IHZvaWQsXG4gICAgICAgIG9mZnNldDogbnVtYmVyLFxuICAgICAgICBzaXplOiBudW1iZXIsXG4gICAgICAgIHNlcXVlbmNlOiBib29sZWFuXG4gICAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGltYWdlU3JjcyA9IG5ldyBBcnJheTxzdHJpbmc+KHNpemUpO1xuICAgICAgICBjb25zdCBsb2FkZWRJbWFnZXMgPSBuZXcgQXJyYXk8SW1hZ2VJbmZvPihzaXplKTtcbiAgICAgICAgY29uc3Qgbm90TG9hZGVkSW1hZ2VzID0gbmV3IEFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+KCk7XG5cbiAgICAgICAgaWYgKHNlcXVlbmNlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaW1hZ2VTcmNzWzBdID0gYmFzZVVyaTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VTcmNzW2ldID0gYCR7YmFzZVVyaX1pbWFnZS0keygnMDAnICsgKG9mZnNldCArIGkpKS5zbGljZSgtMyl9LmpwZ2A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpbWFnZVNyY3MuZm9yRWFjaChzcmMgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIG5vdExvYWRlZEltYWdlcy5wdXNoKGltYWdlKTtcbiAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IGxvYWRlZChpbWFnZSk7XG4gICAgICAgICAgICBpbWFnZS5zcmMgPSBzcmM7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uIGxvYWRlZChsb2FkZWRJbWFnZTogSFRNTEltYWdlRWxlbWVudCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBub3RMb2FkZWRJbWFnZXMubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgICAgICBpZiAobm90TG9hZGVkSW1hZ2VzW3hdID09PSBsb2FkZWRJbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICBub3RMb2FkZWRJbWFnZXMuc3BsaWNlKHgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBhc3N1bWUgdGhlIGluZGV4IGlzIHRoZSBzYW1lXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgaW1hZ2VTcmNzLmxlbmd0aDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWFnZU5hbWUgPSBpbWFnZVNyY3NbeV0uc3Vic3RyKGltYWdlU3Jjc1t5XS5sYXN0SW5kZXhPZignLycpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2FkZWRJbWFnZS5zcmMubGFzdEluZGV4T2YoaW1hZ2VOYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkZWRJbWFnZXNbeV0gPSB7IGltYWdlOiBsb2FkZWRJbWFnZSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub3RMb2FkZWRJbWFnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0ltYWdlcyBsb2FkZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlcXVlbmNlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3RJbWFnZSA9IGxvYWRlZEltYWdlc1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0SW1hZ2UudGFncyA9IGF3YWl0IGZpbmRUYWdzSW5PYmplY3RVUkwoYmFzZVVyaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhleCk7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobG9hZGVkSW1hZ2VzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbWFnZUluZm8sIEltYWdlTG9hZGVyIH0gZnJvbSAnLi9pbWFnZS1sb2FkZXInO1xuaW1wb3J0IHsgSW5wdXRTdHJlYW0gfSBmcm9tICcuL2lucHV0LXN0cmVhbSc7XG5pbXBvcnQgeyBJbnB1dFN0cmVhbUNvbmZpZyB9IGZyb20gJy4vaW5wdXQtc3RyZWFtLWNvbmZpZyc7XG5cbmV4cG9ydCBjbGFzcyBJbWFnZVN0cmVhbSBleHRlbmRzIElucHV0U3RyZWFtIHtcbiAgICBwcml2YXRlIF9iYXNlVXJsOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfZW5kZWQ6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfZnJhbWVJbmRleDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2hlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2ltYWdlczogQXJyYXk8SW1hZ2VJbmZvPjtcbiAgICBwcml2YXRlIF9sb2FkZWQ6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfb2Zmc2V0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfcGF1c2VkOiBib29sZWFuO1xuICAgIHByaXZhdGUgX3NpemU6IG51bWJlcjtcbiAgICBwcml2YXRlIF93aWR0aDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzSGVpZ2h0ID0gMDtcbiAgICAgICAgdGhpcy5fY2FudmFzV2lkdGggPSAwO1xuICAgICAgICB0aGlzLl9iYXNlVXJsID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZW5kZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZnJhbWVJbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IDA7XG4gICAgICAgIHRoaXMuX2ltYWdlcyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2xvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9vZmZzZXQgPSAxO1xuICAgICAgICB0aGlzLl9wYXVzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zaXplID0gMDtcbiAgICAgICAgdGhpcy5fd2lkdGggPSAwO1xuICAgIH1cblxuICAgIGdldCByZWFsSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XG4gICAgfVxuXG4gICAgZ2V0IHJlYWxXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XG4gICAgfVxuXG4gICAgZ2V0IGNvbmZpZygpOiBJbnB1dFN0cmVhbUNvbmZpZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gICAgfVxuXG4gICAgc2V0IGNvbmZpZyhjb25maWc6IElucHV0U3RyZWFtQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHsgLi4uY29uZmlnIH07XG4gICAgICAgIHRoaXMuX2Jhc2VVcmwgPSBjb25maWcuc3JjO1xuICAgICAgICB0aGlzLl9zaXplID0gY29uZmlnLnNlcXVlbmNlICYmIGNvbmZpZy5sZW5ndGggPyBjb25maWcubGVuZ3RoIDogMTtcblxuICAgICAgICB0aGlzLl9sb2FkSW1hZ2VzKCk7XG4gICAgfVxuXG4gICAgZ2V0IGVuZGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZW5kZWQ7XG4gICAgfVxuXG4gICAgc2V0QXR0cmlidXRlKCkgeyB9XG5cbiAgICBwYXVzZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcGF1c2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwbGF5KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9wYXVzZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzZXQgY3VycmVudFRpbWUodGltZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2ZyYW1lSW5kZXggPSB0aW1lO1xuICAgIH1cblxuICAgIGdldEZyYW1lKCk6IEhUTUxWaWRlb0VsZW1lbnQgfCBJbWFnZUluZm8ge1xuICAgICAgICBsZXQgZnJhbWU6IEltYWdlSW5mbyA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuX2xvYWRlZCAmJiAhdGhpcy5fcGF1c2VkKSB7XG4gICAgICAgICAgICBmcmFtZSA9IHRoaXMuX2ltYWdlc1t0aGlzLl9mcmFtZUluZGV4XTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2ZyYW1lSW5kZXggPCAodGhpcy5fc2l6ZSAtIDEpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZnJhbWVJbmRleCsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZW5kZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2VuZGVkJywgW10pO1xuICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZyYW1lO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2xvYWRJbWFnZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2xvYWRlZCA9IGZhbHNlO1xuICAgICAgICBJbWFnZUxvYWRlci5sb2FkKHRoaXMuX2Jhc2VVcmwsIGltYWdlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZXMgPSBpbWFnZXM7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoaW1hZ2VzWzBdLnRhZ3MgJiYgaW1hZ2VzWzBdLnRhZ3Mub3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgY2FzZSA4OiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gaW1hZ2VzWzBdLmltYWdlLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gaW1hZ2VzWzBdLmltYWdlLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCA9IGltYWdlc1swXS5pbWFnZS53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gaW1hZ2VzWzBdLmltYWdlLmhlaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2NhbnZhc1dpZHRoID0gdGhpcy5fY2FsY3VsYXRlZFdpZHRoID0gdGhpcy5fY29uZmlnLnNpemUgPyB0aGlzLl93aWR0aCA+IHRoaXMuX2hlaWdodCA/XG4gICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnLnNpemUgOiB0aGlzLl93aWR0aCAqIHRoaXMuX2NvbmZpZy5zaXplIC8gdGhpcy5faGVpZ2h0IHwgMCA6IHRoaXMuX3dpZHRoO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzSGVpZ2h0ID0gdGhpcy5fY2FsY3VsYXRlZEhlaWdodCA9IHRoaXMuX2NvbmZpZy5zaXplID8gdGhpcy5fd2lkdGggPiB0aGlzLl9oZWlnaHQgP1xuICAgICAgICAgICAgICAgIHRoaXMuX2hlaWdodCAqIHRoaXMuX2NvbmZpZy5zaXplIC8gdGhpcy5fd2lkdGggfCAwIDogdGhpcy5fY29uZmlnLnNpemUgOiB0aGlzLl9oZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLl9sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fZnJhbWVJbmRleCA9IDA7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudHJpZ2dlcignY2FucmVjb3JkJywgW10pLCAwKTtcbiAgICAgICAgfSwgdGhpcy5fb2Zmc2V0LCB0aGlzLl9zaXplLCB0aGlzLl9jb25maWcuc2VxdWVuY2UpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vY29tbW9uL3BvaW50JztcbmltcG9ydCB7IEJhcmNvZGVMb2NhdG9yQ29uZmlnLCBQYXRjaFNpemVDb25maWcgfSBmcm9tICcuLi9sb2NhdG9yL2JhcmNvZGUtbG9jYXRvci1jb25maWcnO1xuaW1wb3J0IHsgSW5wdXRTdHJlYW0gfSBmcm9tICcuL2lucHV0LXN0cmVhbSc7XG5pbXBvcnQgeyBBcmVhQ29uZmlnIH0gZnJvbSAnLi9pbnB1dC1zdHJlYW0tY29uZmlnJztcblxuZXhwb3J0IGludGVyZmFjZSBEaW1lbnNpb24ge1xuICAgIHVuaXQ6ICclJyB8ICdweCcsXG4gICAgdmFsdWU6IG51bWJlcjtcbn1cblxuZnVuY3Rpb24gX2NvbXB1dGVEaXZpc29ycyhuOiBudW1iZXIpOiBBcnJheTxudW1iZXI+IHtcbiAgICBjb25zdCBkaXZpc29ycyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XG4gICAgY29uc3QgbGFyZ2VEaXZpc29ycyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XG5cbiAgICBmb3IgKGxldCBkaXZpc29yID0gMTsgZGl2aXNvciAqIGRpdmlzb3IgPD0gbjsgZGl2aXNvcisrKSB7XG4gICAgICAgIGlmIChuICUgZGl2aXNvciA9PT0gMCkge1xuICAgICAgICAgICAgZGl2aXNvcnMucHVzaChkaXZpc29yKTtcbiAgICAgICAgICAgIGlmIChkaXZpc29yICogZGl2aXNvciAhPT0gbikge1xuICAgICAgICAgICAgICAgIGxhcmdlRGl2aXNvcnMudW5zaGlmdChuIC8gZGl2aXNvciB8IDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpdmlzb3JzLmNvbmNhdChsYXJnZURpdmlzb3JzKTtcbn1cblxuZnVuY3Rpb24gX2NvbXB1dGVDb21tb25EaXZpc29ycyhtOiBudW1iZXIsIG46IG51bWJlcik6IEFycmF5PG51bWJlcj4ge1xuICAgIGlmIChtID09PSBuKSB7XG4gICAgICAgIHJldHVybiBfY29tcHV0ZURpdmlzb3JzKG0pO1xuICAgIH1cblxuICAgIGNvbnN0IG1heCA9IG0gPiBuID8gbSA6IG47XG4gICAgY29uc3QgbWluID0gbSA+IG4gPyBuIDogbTtcbiAgICBjb25zdCBkaXZpc29ycyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XG4gICAgY29uc3QgbGFyZ2VEaXZpc29ycyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XG5cbiAgICBmb3IgKGxldCBkaXZpc29yID0gMTsgZGl2aXNvciAqIGRpdmlzb3IgPD0gbWluOyBkaXZpc29yKyspIHtcbiAgICAgICAgaWYgKG1heCAlIGRpdmlzb3IgPT09IDAgJiYgbWluICUgZGl2aXNvciA9PT0gMCkge1xuICAgICAgICAgICAgZGl2aXNvcnMucHVzaChkaXZpc29yKTtcbiAgICAgICAgICAgIGNvbnN0IGxhcmdlRGl2aXNvciA9IG1pbiAvIGRpdmlzb3IgfCAwO1xuICAgICAgICAgICAgaWYgKGRpdmlzb3IgIT09IGxhcmdlRGl2aXNvciAmJiBtYXggJSBsYXJnZURpdmlzb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgICBsYXJnZURpdmlzb3JzLnVuc2hpZnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaXZpc29ycy5jb25jYXQobGFyZ2VEaXZpc29ycyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVQYXRjaFNpemUocGF0Y2hTaXplOiBQYXRjaFNpemVDb25maWcsIHsgeCwgeSB9OiBQb2ludCk6IFBvaW50IHtcbiAgICBjb25zdCB3aWRlU2lkZSA9IE1hdGgubWF4KHggfCAwLCB5IHwgMCkgfCAwO1xuICAgIGNvbnN0IG5yT2ZQYXRjaGVzTGlzdCA9IFs4LCAxMCwgMTUsIDIwLCAzMiwgNjAsIDgwXTtcbiAgICBjb25zdCBuck9mUGF0Y2hlc01hcCA9IHtcbiAgICAgICAgJ3gtc21hbGwnOiA1LFxuICAgICAgICBzbWFsbDogNCxcbiAgICAgICAgbWVkaXVtOiAzLFxuICAgICAgICBsYXJnZTogMixcbiAgICAgICAgJ3gtbGFyZ2UnOiAxXG4gICAgfTtcbiAgICBjb25zdCBuck9mUGF0Y2hlc0luZGV4ID0gbnJPZlBhdGNoZXNNYXBbcGF0Y2hTaXplXSB8fCBuck9mUGF0Y2hlc01hcC5tZWRpdW0gfCAwO1xuICAgIGNvbnN0IG5yT2ZQYXRjaGVzID0gbnJPZlBhdGNoZXNMaXN0W25yT2ZQYXRjaGVzSW5kZXhdIHwgMDtcbiAgICBjb25zdCBkZXNpcmVkUGF0Y2hTaXplID0gd2lkZVNpZGUgLyBuck9mUGF0Y2hlcyB8IDA7XG5cbiAgICBmdW5jdGlvbiBmaW5kUGF0Y2hTaXplRm9yRGl2aXNvcnMoZGl2aXNvcnM6IEFycmF5PG51bWJlcj4pOiBQb2ludCB7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgbGV0IGZvdW5kID0gZGl2aXNvcnNbZGl2aXNvcnMubGVuZ3RoID4+IDFdIHwgMDtcblxuICAgICAgICB3aGlsZSAoaSA8IChkaXZpc29ycy5sZW5ndGggLSAxKSAmJiBkaXZpc29yc1tpXSA8IGRlc2lyZWRQYXRjaFNpemUpIHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhkaXZpc29yc1tpXSAtIGRlc2lyZWRQYXRjaFNpemUpID4gTWF0aC5hYnMoZGl2aXNvcnNbaSAtIDFdIC0gZGVzaXJlZFBhdGNoU2l6ZSkpIHtcbiAgICAgICAgICAgICAgICBmb3VuZCA9IGRpdmlzb3JzW2kgLSAxXSB8IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvdW5kID0gZGl2aXNvcnNbaV0gfCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChkZXNpcmVkUGF0Y2hTaXplIC8gZm91bmQgPCBuck9mUGF0Y2hlc0xpc3RbbnJPZlBhdGNoZXNJbmRleCArIDFdIC8gbnJPZlBhdGNoZXNMaXN0W25yT2ZQYXRjaGVzSW5kZXhdICYmXG4gICAgICAgICAgICBkZXNpcmVkUGF0Y2hTaXplIC8gZm91bmQgPiBuck9mUGF0Y2hlc0xpc3RbbnJPZlBhdGNoZXNJbmRleCAtIDFdIC8gbnJPZlBhdGNoZXNMaXN0W25yT2ZQYXRjaGVzSW5kZXhdKSB7XG4gICAgICAgICAgICByZXR1cm4geyB4OiBmb3VuZCwgeTogZm91bmQgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRpbWFsUGF0Y2hTaXplID0gZmluZFBhdGNoU2l6ZUZvckRpdmlzb3JzKF9jb21wdXRlQ29tbW9uRGl2aXNvcnMoeCwgeSkpIHx8XG4gICAgICAgIGZpbmRQYXRjaFNpemVGb3JEaXZpc29ycyhfY29tcHV0ZURpdmlzb3JzKHdpZGVTaWRlKSkgfHxcbiAgICAgICAgZmluZFBhdGNoU2l6ZUZvckRpdmlzb3JzKF9jb21wdXRlRGl2aXNvcnMoZGVzaXJlZFBhdGNoU2l6ZSAqIG5yT2ZQYXRjaGVzKSk7XG5cbiAgICByZXR1cm4gb3B0aW1hbFBhdGNoU2l6ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrSW1hZ2VDb25zdHJhaW50cyhpbnB1dFN0cmVhbTogSW5wdXRTdHJlYW0sIGNvbmZpZzogQmFyY29kZUxvY2F0b3JDb25maWcpIHtcbiAgICBsZXQgd2lkdGggPSBpbnB1dFN0cmVhbS53aWR0aDtcbiAgICBsZXQgaGVpZ2h0ID0gaW5wdXRTdHJlYW0uaGVpZ2h0O1xuICAgIGNvbnN0IHNoaWZ0ID0gY29uZmlnLmhhbGZTYW1wbGUgPyAxIDogMCB8IDA7XG4gICAgY29uc3QgaW5wdXRTdHJlYW1Db25maWcgPSBpbnB1dFN0cmVhbS5jb25maWc7XG5cbiAgICAvLyBjYWxjdWxhdGUgd2lkdGggYW5kIGhlaWdodCBiYXNlZCBvbiBhcmVhXG4gICAgaWYgKGlucHV0U3RyZWFtQ29uZmlnICYmIGlucHV0U3RyZWFtQ29uZmlnLmFyZWEpIHtcbiAgICAgICAgY29uc3QgYXJlYSA9IGNvbXB1dGVJbWFnZUFyZWEod2lkdGgsIGhlaWdodCwgaW5wdXRTdHJlYW1Db25maWcuYXJlYSk7XG4gICAgICAgIGlucHV0U3RyZWFtLnRvcExlZnQgPSBhcmVhLnRvcExlZnQ7XG4gICAgICAgIGlucHV0U3RyZWFtLnNldENhbnZhc1NpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHdpZHRoID0gYXJlYS53aWR0aDtcbiAgICAgICAgaGVpZ2h0ID0gYXJlYS5oZWlnaHQ7XG4gICAgfVxuXG4gICAgY29uc3Qgc2l6ZSA9IHtcbiAgICAgICAgeDogd2lkdGggPj4gc2hpZnQsXG4gICAgICAgIHk6IGhlaWdodCA+PiBzaGlmdFxuICAgIH07XG5cbiAgICBjb25zdCBwYXRjaFNpemUgPSBjYWxjdWxhdGVQYXRjaFNpemUoY29uZmlnLnBhdGNoU2l6ZSwgc2l6ZSk7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1BhdGNoLVNpemU6JywgSlNPTi5zdHJpbmdpZnkocGF0Y2hTaXplKSk7XG4gICAgfVxuXG4gICAgaW5wdXRTdHJlYW0ud2lkdGggPSAoc2l6ZS54IC8gcGF0Y2hTaXplLnggPDwgc2hpZnQpICogcGF0Y2hTaXplLnggfCAwO1xuICAgIGlucHV0U3RyZWFtLmhlaWdodCA9IChzaXplLnkgLyBwYXRjaFNpemUueSA8PCBzaGlmdCkgKiBwYXRjaFNpemUueSB8IDA7XG5cbiAgICBpZiAoKGlucHV0U3RyZWFtLndpZHRoICUgcGF0Y2hTaXplLngpID09PSAwICYmIChpbnB1dFN0cmVhbS5oZWlnaHQgJSBwYXRjaFNpemUueSkgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICB0aHJvdyBuZXcgRXJyb3IoYEltYWdlIGRpbWVuc2lvbnMgZG8gbm90IGNvbXBseSB3aXRoIHRoZSBjdXJyZW50IHNldHRpbmdzOiB3aWR0aCAoJHt3aWR0aH0pIGFuZCBoZWlnaHQgKCR7aGVpZ2h0fSkgbXVzdCBiZSBhIG11bHRpcGxlIG9mICR7cGF0Y2hTaXplLnh9YCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfcGFyc2VDc3NEaW1lbnNpb25WYWx1ZXModmFsdWU6IHN0cmluZyk6IERpbWVuc2lvbiB7XG4gICAgY29uc3QgZGltZW5zaW9uOiBEaW1lbnNpb24gPSB7XG4gICAgICAgIHZhbHVlOiBwYXJzZUZsb2F0KHZhbHVlKSxcbiAgICAgICAgdW5pdDogdmFsdWUuaW5kZXhPZignJScpID09PSB2YWx1ZS5sZW5ndGggLSAxID8gJyUnIDogdmFsdWUuaW5kZXhPZigncHgnKSA9PT0gdmFsdWUubGVuZ3RoIC0gMiA/ICdweCcgOiAnJSdcbiAgICB9O1xuXG4gICAgcmV0dXJuIGRpbWVuc2lvbjtcbn1cblxuZXhwb3J0IGNvbnN0IF9kaW1lbnNpb25zQ29udmVydGVycyA9IHtcbiAgICBib3R0b206IChkaW1lbnNpb246IERpbWVuc2lvbiwgeyBoZWlnaHQgfSkgPT4gZGltZW5zaW9uLnVuaXQgPT09ICclJyA/XG4gICAgICAgIGhlaWdodCAtIGhlaWdodCAqIGRpbWVuc2lvbi52YWx1ZSAvIDEwMCB8IDAgOiBkaW1lbnNpb24udW5pdCA9PT0gJ3B4JyA/IGhlaWdodCAtIGRpbWVuc2lvbi52YWx1ZSA6IGhlaWdodCxcbiAgICBsZWZ0OiAoZGltZW5zaW9uOiBEaW1lbnNpb24sIHsgd2lkdGggfSkgPT4gZGltZW5zaW9uLnVuaXQgPT09ICclJyA/XG4gICAgICAgIHdpZHRoICogZGltZW5zaW9uLnZhbHVlIC8gMTAwIHwgMCA6IGRpbWVuc2lvbi51bml0ID09PSAncHgnID8gZGltZW5zaW9uLnZhbHVlIDogMCxcbiAgICByaWdodDogKGRpbWVuc2lvbjogRGltZW5zaW9uLCB7IHdpZHRoIH0pID0+IGRpbWVuc2lvbi51bml0ID09PSAnJScgP1xuICAgICAgICB3aWR0aCAtIHdpZHRoICogZGltZW5zaW9uLnZhbHVlIC8gMTAwIHwgMCA6IGRpbWVuc2lvbi51bml0ID09PSAncHgnID8gd2lkdGggLSBkaW1lbnNpb24udmFsdWUgOiB3aWR0aCxcbiAgICB0b3A6IChkaW1lbnNpb246IERpbWVuc2lvbiwgeyBoZWlnaHQgfSk6IG51bWJlciA9PiBkaW1lbnNpb24udW5pdCA9PT0gJyUnID9cbiAgICAgICAgaGVpZ2h0ICogZGltZW5zaW9uLnZhbHVlIC8gMTAwIHwgMCA6IGRpbWVuc2lvbi51bml0ID09PSAncHgnID8gZGltZW5zaW9uLnZhbHVlIDogMFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVJbWFnZUFyZWEoaW5wdXRXaWR0aDogbnVtYmVyLCBpbnB1dEhlaWdodDogbnVtYmVyLCBhcmVhOiBBcmVhQ29uZmlnKSB7XG4gICAgY29uc3QgY29udGV4dCA9IHsgd2lkdGg6IGlucHV0V2lkdGgsIGhlaWdodDogaW5wdXRIZWlnaHQgfTtcbiAgICBjb25zdCBwYXJzZWRBcmVhOiB7XG4gICAgICAgIGJvdHRvbT86IG51bWJlcjtcbiAgICAgICAgbGVmdD86IG51bWJlcjtcbiAgICAgICAgcmlnaHQ/OiBudW1iZXI7XG4gICAgICAgIHRvcD86IG51bWJlcjtcbiAgICB9ID0gT2JqZWN0LmtleXMoYXJlYSkucmVkdWNlKChyZXN1bHQsIGtleSkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGFyZWFba2V5XTtcbiAgICAgICAgY29uc3QgcGFyc2VkID0gX3BhcnNlQ3NzRGltZW5zaW9uVmFsdWVzKHZhbHVlKTtcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlZCA9IF9kaW1lbnNpb25zQ29udmVydGVyc1trZXldKHBhcnNlZCwgY29udGV4dCk7XG5cbiAgICAgICAgcmVzdWx0W2tleV0gPSBjYWxjdWxhdGVkO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIHt9KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRvcExlZnQ6IHsgeDogcGFyc2VkQXJlYS5sZWZ0LCB5OiBwYXJzZWRBcmVhLnRvcCB9LFxuICAgICAgICB3aWR0aDogcGFyc2VkQXJlYS5yaWdodCAtIHBhcnNlZEFyZWEubGVmdCxcbiAgICAgICAgaGVpZ2h0OiBwYXJzZWRBcmVhLmJvdHRvbSAtIHBhcnNlZEFyZWEudG9wXG4gICAgfTtcbn1cbiIsImltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vY29tbW9uL3BvaW50JztcbmltcG9ydCB7IEltYWdlSW5mbyB9IGZyb20gJy4vaW1hZ2UtbG9hZGVyJztcbmltcG9ydCB7IElucHV0U3RyZWFtQ29uZmlnIH0gZnJvbSAnLi9pbnB1dC1zdHJlYW0tY29uZmlnJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIElucHV0U3RyZWFtIHtcbiAgICBwcm90ZWN0ZWQgX2NhbGN1bGF0ZWRIZWlnaHQ6IG51bWJlcjtcbiAgICBwcm90ZWN0ZWQgX2NhbGN1bGF0ZWRXaWR0aDogbnVtYmVyO1xuICAgIHByb3RlY3RlZCBfY2FudmFzSGVpZ2h0OiBudW1iZXI7XG4gICAgcHJvdGVjdGVkIF9jYW52YXNXaWR0aDogbnVtYmVyO1xuICAgIHByb3RlY3RlZCBfY29uZmlnOiBJbnB1dFN0cmVhbUNvbmZpZztcbiAgICBwcm90ZWN0ZWQgX2V2ZW50TmFtZXM6IEFycmF5PHN0cmluZz47XG4gICAgcHJvdGVjdGVkIF9ldmVudEhhbmRsZXJzOiBNYXA8c3RyaW5nLCBBcnJheTxFdmVudExpc3RlbmVyPj47XG4gICAgcHJvdGVjdGVkIF90b3BMZWZ0OiBQb2ludDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9jYW52YXNXaWR0aCA9IDA7XG4gICAgICAgIHRoaXMuX2NhbnZhc0hlaWdodCA9IDA7XG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2V2ZW50TmFtZXMgPSBbJ2NhbnJlY29yZCcsICdlbmRlZCddO1xuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXJzID0gbmV3IE1hcDxzdHJpbmcsIEFycmF5PEV2ZW50TGlzdGVuZXI+PigpO1xuICAgICAgICB0aGlzLl90b3BMZWZ0ID0geyB4OiAwLCB5OiAwIH07XG4gICAgfVxuXG4gICAgYWJzdHJhY3QgZ2V0IHJlYWxIZWlnaHQoKTogbnVtYmVyO1xuXG4gICAgYWJzdHJhY3QgZ2V0IHJlYWxXaWR0aCgpOiBudW1iZXI7XG5cbiAgICBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWxjdWxhdGVkSGVpZ2h0O1xuICAgIH1cblxuICAgIHNldCBoZWlnaHQoaGVpZ2h0OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlZEhlaWdodCA9IGhlaWdodDtcbiAgICB9XG5cbiAgICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbGN1bGF0ZWRXaWR0aDtcbiAgICB9XG5cbiAgICBzZXQgd2lkdGgod2lkdGg6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9jYWxjdWxhdGVkV2lkdGggPSB3aWR0aDtcbiAgICB9XG5cbiAgICBnZXQgdG9wTGVmdCgpOiBQb2ludCB7XG4gICAgICAgIHJldHVybiB7IC4uLnRoaXMuX3RvcExlZnQgfTtcbiAgICB9XG5cbiAgICBzZXQgdG9wTGVmdCh0b3BMZWZ0OiBQb2ludCkge1xuICAgICAgICB0aGlzLl90b3BMZWZ0LnggPSB0b3BMZWZ0Lng7XG4gICAgICAgIHRoaXMuX3RvcExlZnQueSA9IHRvcExlZnQueTtcbiAgICB9XG5cbiAgICBzZXRDYW52YXNTaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2NhbnZhc1dpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuX2NhbnZhc0hlaWdodCA9IGhlaWdodDtcbiAgICB9XG5cbiAgICBnZXQgY2FudmFzSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW52YXNIZWlnaHQ7XG4gICAgfVxuXG4gICAgZ2V0IGNhbnZhc1dpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW52YXNXaWR0aDtcbiAgICB9XG5cbiAgICBhYnN0cmFjdCBnZXQgY29uZmlnKCk6IElucHV0U3RyZWFtQ29uZmlnO1xuXG4gICAgYWJzdHJhY3Qgc2V0IGNvbmZpZyhjb25maWc6IElucHV0U3RyZWFtQ29uZmlnKTtcblxuICAgIGFic3RyYWN0IGdldCBlbmRlZCgpOiBib29sZWFuO1xuXG4gICAgYWJzdHJhY3Qgc2V0QXR0cmlidXRlKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQ7XG5cbiAgICBhYnN0cmFjdCBwYXVzZSgpOiB2b2lkO1xuXG4gICAgYWJzdHJhY3QgcGxheSgpOiB2b2lkO1xuXG4gICAgYWJzdHJhY3Qgc2V0IGN1cnJlbnRUaW1lKHRpbWU6IG51bWJlcik7XG5cbiAgICBhZGRFdmVudExpc3RlbmVyKGV2ZW50OiBzdHJpbmcsIGxpc3RlbmVyOiBFdmVudExpc3RlbmVyLCBfb3B0aW9ucz86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2V2ZW50TmFtZXMuaW5kZXhPZihldmVudCkgIT09IC0xKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2V2ZW50SGFuZGxlcnMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlcnMuc2V0KGV2ZW50LCBuZXcgQXJyYXk8RXZlbnRMaXN0ZW5lcj4oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXJzLmdldChldmVudCkucHVzaChsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhckV2ZW50SGFuZGxlcnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlcnMuY2xlYXIoKTtcbiAgICB9XG5cbiAgICB0cmlnZ2VyKGV2ZW50TmFtZTogc3RyaW5nLCBhcmdBcnJheT86IGFueSkge1xuICAgICAgICBjb25zdCBoYW5kbGVycyA9IHRoaXMuX2V2ZW50SGFuZGxlcnMuZ2V0KGV2ZW50TmFtZSk7XG5cbiAgICAgICAgaWYgKGhhbmRsZXJzKSB7XG4gICAgICAgICAgICBoYW5kbGVycy5mb3JFYWNoKGhhbmRsZXIgPT4gaGFuZGxlci5hcHBseSh0aGlzLCBhcmdBcnJheSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWJzdHJhY3QgZ2V0RnJhbWUoKTogSFRNTFZpZGVvRWxlbWVudCB8IEltYWdlSW5mbztcbn1cbiIsImltcG9ydCB7IFZpZGVvU3RyZWFtIH0gZnJvbSAnLi92aWRlby1zdHJlYW0nO1xuXG5leHBvcnQgY2xhc3MgTGl2ZVN0cmVhbSBleHRlbmRzIFZpZGVvU3RyZWFtIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWRlbzogSFRNTFZpZGVvRWxlbWVudCkge1xuICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ2F1dG9wbGF5JywgJycpO1xuICAgICAgICBzdXBlcih2aWRlbyk7XG4gICAgfVxuXG4gICAgZ2V0IGVuZGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW1hZ2VJbmZvIH0gZnJvbSAnLi9pbWFnZS1sb2FkZXInO1xuaW1wb3J0IHsgSW5wdXRTdHJlYW0gfSBmcm9tICcuL2lucHV0LXN0cmVhbSc7XG5pbXBvcnQgeyBJbnB1dFN0cmVhbUNvbmZpZyB9IGZyb20gJy4vaW5wdXQtc3RyZWFtLWNvbmZpZyc7XG5cbmV4cG9ydCBjbGFzcyBWaWRlb1N0cmVhbSBleHRlbmRzIElucHV0U3RyZWFtIHtcbiAgICBwcml2YXRlIF92aWRlbzogSFRNTFZpZGVvRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fdmlkZW8gPSB2aWRlbztcbiAgICB9XG5cbiAgICBnZXQgcmVhbEhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlkZW8udmlkZW9IZWlnaHQ7XG4gICAgfVxuXG4gICAgZ2V0IHJlYWxXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlkZW8udmlkZW9XaWR0aDtcbiAgICB9XG5cbiAgICBnZXQgY29uZmlnKCk6IElucHV0U3RyZWFtQ29uZmlnIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgICB9XG5cbiAgICBzZXQgY29uZmlnKGNvbmZpZzogSW5wdXRTdHJlYW1Db25maWcpIHtcbiAgICAgICAgdGhpcy5fY29uZmlnID0geyAuLi5jb25maWcgfTtcbiAgICAgICAgdGhpcy5fdmlkZW8uc3JjID0gY29uZmlnLnNyYyB8fCAnJztcbiAgICB9XG5cbiAgICBnZXQgZW5kZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aWRlby5lbmRlZDtcbiAgICB9XG5cbiAgICBzZXRBdHRyaWJ1dGUobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3ZpZGVvLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcGF1c2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3ZpZGVvLnBhdXNlKCk7XG4gICAgfVxuXG4gICAgcGxheSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdmlkZW8ucGxheSgpO1xuICAgIH1cblxuICAgIHNldCBjdXJyZW50VGltZSh0aW1lOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy50eXBlICE9PSAnTGl2ZVN0cmVhbScpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZpZGVvLmN1cnJlbnRUaW1lID0gdGltZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnQ6IHN0cmluZywgbGlzdGVuZXI6IEV2ZW50TGlzdGVuZXIsIG9wdGlvbnM/OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyLCBvcHRpb25zKTtcblxuICAgICAgICBpZiAodGhpcy5fZXZlbnROYW1lcy5pbmRleE9mKGV2ZW50KSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyRXZlbnRIYW5kbGVycygpOiB2b2lkIHtcbiAgICAgICAgLy8gVE9ETzogY29tZSB1cCB3aXRoIGEgd2F5IHRvIHJlbW92ZSB2aWRlbyBldmVudCBoYW5kbGVyc1xuICAgICAgICAvLyB0aGlzLl9ldmVudE5hbWVzLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgLy8gICAgIGNvbnN0IGhhbmRsZXJzID0gdGhpcy5fZXZlbnRIYW5kbGVycy5nZXQoZXZlbnROYW1lKTtcbiAgICAgICAgLy8gICAgIGlmIChoYW5kbGVycyAmJiBoYW5kbGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vICAgICAgICAgaGFuZGxlcnMuZm9yRWFjaChoYW5kbGVyID0+IHRoaXMuX3ZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pO1xuICAgICAgICBzdXBlci5jbGVhckV2ZW50SGFuZGxlcnMoKTtcbiAgICB9XG5cbiAgICB0cmlnZ2VyKGV2ZW50TmFtZTogc3RyaW5nLCBhcmdBcnJheT86IGFueSkge1xuICAgICAgICBpZiAoZXZlbnROYW1lID09PSAnY2FucmVjb3JkJykge1xuICAgICAgICAgICAgdGhpcy5faW5pdFNpemUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyLnRyaWdnZXIoZXZlbnROYW1lLCBhcmdBcnJheSlcbiAgICB9XG5cbiAgICBnZXRGcmFtZSgpOiBIVE1MVmlkZW9FbGVtZW50IHwgSW1hZ2VJbmZvIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZpZGVvO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXRTaXplKCkge1xuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuX3ZpZGVvLnZpZGVvV2lkdGg7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuX3ZpZGVvLnZpZGVvSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuX2NhbnZhc1dpZHRoID0gdGhpcy5fY2FsY3VsYXRlZFdpZHRoID1cbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5zaXplID8gd2lkdGggPiBoZWlnaHQgPyB0aGlzLl9jb25maWcuc2l6ZSA6IHdpZHRoICogdGhpcy5fY29uZmlnLnNpemUgLyBoZWlnaHQgfCAwIDogd2lkdGg7XG4gICAgICAgIHRoaXMuX2NhbnZhc0hlaWdodCA9IHRoaXMuX2NhbGN1bGF0ZWRIZWlnaHQgPVxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLnNpemUgPyB3aWR0aCA+IGhlaWdodCA/IGhlaWdodCAqIHRoaXMuX2NvbmZpZy5zaXplIC8gd2lkdGggfCAwIDogdGhpcy5fY29uZmlnLnNpemUgOiBoZWlnaHQ7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTGl2ZVN0cmVhbSBleHRlbmRzIFZpZGVvU3RyZWFtIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWRlbzogSFRNTFZpZGVvRWxlbWVudCkge1xuICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ2F1dG9wbGF5JywgJycpO1xuICAgICAgICBzdXBlcih2aWRlbyk7XG4gICAgfVxuXG4gICAgZ2V0IGVuZGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW1hZ2VXcmFwcGVyIH0gZnJvbSAnLi4vY29tbW9uL2ltYWdlLXdyYXBwZXInO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLi9jb21tb24vcG9pbnQnO1xuXG4vKipcbiAqIEludmVydCBtYXRyaXhcbiAqIEBwYXJhbSBtYXRyaXggdGhlIG1hdHJpeCB0byBpbnZlcnRcbiAqIEByZXR1cm5zIHRoZSBpbnZlcnRlZCBtYXRyaXhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludmVydChtYXRyaXg6IEZsb2F0MzJBcnJheSk6IEZsb2F0MzJBcnJheSB7XG4gICAgY29uc3QgYTAgPSBtYXRyaXhbMF07XG4gICAgY29uc3QgYTEgPSBtYXRyaXhbMV07XG4gICAgY29uc3QgYTIgPSBtYXRyaXhbMl07XG4gICAgY29uc3QgYTMgPSBtYXRyaXhbM107XG4gICAgY29uc3QgZGV0ZXJtaW5hbnQgPSBhMCAqIGEzIC0gYTIgKiBhMTtcblxuICAgIGlmICghZGV0ZXJtaW5hbnQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBGbG9hdDMyQXJyYXkoW2EzIC8gZGV0ZXJtaW5hbnQsIC1hMSAvIGRldGVybWluYW50LCAtYTIgLyBkZXRlcm1pbmFudCwgYTAgLyBkZXRlcm1pbmFudF0pO1xufVxuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlY3RvciB3aXRoIGEgbWF0cml4XG4gKiBAcGFyYW0geyB4LCB5IH0gdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIG1hdHJpeCBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHRoZSB0cmFuc2Zvcm1lZCB2ZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybVdpdGhNYXRyaXgoeyB4LCB5IH06IFBvaW50LCBtYXRyaXg6IEZsb2F0MzJBcnJheSk6IFBvaW50IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiBtYXRyaXhbMF0gKiB4ICsgbWF0cml4WzJdICogeSxcbiAgICAgICAgeTogbWF0cml4WzFdICogeCArIG1hdHJpeFszXSAqIHlcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBfY29tcHV0ZUhpc3RvZ3JhbShpbWFnZVdyYXBwZXI6IEltYWdlV3JhcHBlciwgYml0c1BlclBpeGVsOiBudW1iZXIpOiBJbnQzMkFycmF5IHtcbiAgICBpZiAoIWJpdHNQZXJQaXhlbCkge1xuICAgICAgICBiaXRzUGVyUGl4ZWwgPSA4O1xuICAgIH1cblxuICAgIGNvbnN0IGltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhO1xuICAgIGNvbnN0IGJpdFNoaWZ0ID0gOCAtIGJpdHNQZXJQaXhlbDtcbiAgICBjb25zdCBidWNrZXRDb3VudCA9IDEgPDwgYml0c1BlclBpeGVsO1xuICAgIGNvbnN0IGhpc3RvZ3JhbSA9IG5ldyBJbnQzMkFycmF5KGJ1Y2tldENvdW50KTtcblxuICAgIGZvciAobGV0IGkgPSBpbWFnZURhdGEubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgIGhpc3RvZ3JhbVtpbWFnZURhdGFbaV0gPj4gYml0U2hpZnRdKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhpc3RvZ3JhbTtcbn1cblxuZnVuY3Rpb24gX2RldGVybWluZU90c3VUaHJlc2hvbGQoaW1hZ2VXcmFwcGVyOiBJbWFnZVdyYXBwZXIsIGJpdHNQZXJQaXhlbD86IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKCFiaXRzUGVyUGl4ZWwpIHtcbiAgICAgICAgYml0c1BlclBpeGVsID0gODtcbiAgICB9XG5cbiAgICBjb25zdCBiaXRTaGlmdCA9IDggLSBiaXRzUGVyUGl4ZWw7XG4gICAgY29uc3QgaGlzdCA9IF9jb21wdXRlSGlzdG9ncmFtKGltYWdlV3JhcHBlciwgYml0c1BlclBpeGVsKTtcbiAgICBjb25zdCB2ZXQgPSBbMF07XG4gICAgY29uc3QgbWF4ID0gKDEgPDwgYml0c1BlclBpeGVsKSAtIDE7XG5cbiAgICBmdW5jdGlvbiBweChpbml0OiBudW1iZXIsIGVuZDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHN1bSA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IGluaXQ7IGkgPD0gZW5kOyBpKyspIHtcbiAgICAgICAgICAgIHN1bSArPSBoaXN0W2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN1bTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBteChpbml0OiBudW1iZXIsIGVuZDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHN1bSA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IGluaXQ7IGkgPD0gZW5kOyBpKyspIHtcbiAgICAgICAgICAgIHN1bSArPSBpICogaGlzdFtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdW07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgayA9IDE7IGsgPCBtYXg7IGsrKykge1xuICAgICAgICBjb25zdCBwMSA9IHB4KDAsIGspO1xuICAgICAgICBjb25zdCBwMiA9IHB4KGsgKyAxLCBtYXgpO1xuICAgICAgICBjb25zdCBwMTIgPSBwMSAqIHAyIHx8IDE7XG4gICAgICAgIGNvbnN0IG0xID0gbXgoMCwgaykgKiBwMjtcbiAgICAgICAgY29uc3QgbTIgPSBteChrICsgMSwgbWF4KSAqIHAxO1xuICAgICAgICBjb25zdCBtMTIgPSBtMSAtIG0yO1xuICAgICAgICB2ZXRba10gPSBtMTIgKiBtMTIgLyBwMTI7XG4gICAgfVxuXG4gICAgLy8gaW5kZXggb2YgbWF4IGVsZW1lbnRcbiAgICBjb25zdCB0aHJlc2hvbGQgPSB2ZXQucmVkdWNlKChtYXhJbmRleCwgaXRlbSwgaW5kZXgsIGFycmF5KSA9PiBpdGVtID4gYXJyYXlbbWF4SW5kZXhdID8gaW5kZXggOiBtYXhJbmRleCwgMCk7XG5cbiAgICByZXR1cm4gdGhyZXNob2xkIDw8IGJpdFNoaWZ0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3RzdVRocmVzaG9sZChpbWFnZVdyYXBwZXI6IEltYWdlV3JhcHBlciwgdGFyZ2V0V3JhcHBlcjogSW1hZ2VXcmFwcGVyKTogbnVtYmVyIHtcbiAgICBjb25zdCB0aHJlc2hvbGQgPSBfZGV0ZXJtaW5lT3RzdVRocmVzaG9sZChpbWFnZVdyYXBwZXIpO1xuICAgIGNvbnN0IHRhcmdldERhdGEgPSB0YXJnZXRXcmFwcGVyLmRhdGE7XG5cbiAgICBpbWFnZVdyYXBwZXIuZGF0YS5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgdGFyZ2V0RGF0YVtpbmRleF0gPSB2YWx1ZSA8IHRocmVzaG9sZCA/IDEgOiAwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRocmVzaG9sZDtcbn1cblxuLyoqXG4gKiBAcGFyYW0gaW1hZ2VXcmFwcGVyIGlucHV0IGltYWdlIHRvIGJlIHNhbXBsZWRcbiAqIEBwYXJhbSBvdXRJbWFnZVdyYXBwZXIge0ltYWdlV3JhcHBlcn0gdG8gYmUgc3RvcmVkIGluXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYWxmU2FtcGxlKGltYWdlV3JhcHBlcjogSW1hZ2VXcmFwcGVyLCBvdXRJbWFnZVdyYXBwZXI6IEltYWdlV3JhcHBlcik6IHZvaWQge1xuICAgIGNvbnN0IGltYWdlID0gaW1hZ2VXcmFwcGVyLmRhdGE7XG4gICAgY29uc3Qgd2lkdGggPSBpbWFnZVdyYXBwZXIuc2l6ZS54O1xuICAgIGNvbnN0IG91dEltYWdlID0gb3V0SW1hZ2VXcmFwcGVyLmRhdGE7XG4gICAgY29uc3QgZW5kSW5kZXggPSBpbWFnZS5sZW5ndGg7XG4gICAgY29uc3Qgb3V0V2lkdGggPSB3aWR0aCA+PiAxO1xuICAgIGxldCB0b3BSb3dJbmRleCA9IDA7XG4gICAgbGV0IGJvdHRvbVJvd0luZGV4ID0gd2lkdGg7XG4gICAgbGV0IG91dEltZ0luZGV4ID0gMDtcblxuICAgIHdoaWxlIChib3R0b21Sb3dJbmRleCA8IGVuZEluZGV4KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0V2lkdGg7IGkrKykge1xuICAgICAgICAgICAgb3V0SW1hZ2Vbb3V0SW1nSW5kZXhdID1cbiAgICAgICAgICAgICAgICAoaW1hZ2VbdG9wUm93SW5kZXhdICsgaW1hZ2VbdG9wUm93SW5kZXggKyAxXSArIGltYWdlW2JvdHRvbVJvd0luZGV4XSArIGltYWdlW2JvdHRvbVJvd0luZGV4ICsgMV0pID4+IDI7XG4gICAgICAgICAgICBvdXRJbWdJbmRleCsrO1xuICAgICAgICAgICAgdG9wUm93SW5kZXggKz0gMjtcbiAgICAgICAgICAgIGJvdHRvbVJvd0luZGV4ICs9IDI7XG4gICAgICAgIH1cbiAgICAgICAgdG9wUm93SW5kZXggKz0gd2lkdGg7XG4gICAgICAgIGJvdHRvbVJvd0luZGV4ICs9IHdpZHRoO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJveCB9IGZyb20gJy4uL2NvbW1vbi9ib3gnO1xuaW1wb3J0IHsgQ2x1c3RlciB9IGZyb20gJy4uL2NvbW1vbi9jbHVzdGVyJztcbmltcG9ydCB7IEhTViwgaHN2MnJnYiwgUkdCIH0gZnJvbSAnLi4vY29tbW9uL2hzdjJyZ2InO1xuaW1wb3J0IHsgSW1hZ2VEZWJ1ZyB9IGZyb20gJy4uL2NvbW1vbi9pbWFnZS1kZWJ1Zyc7XG5pbXBvcnQgeyBJbWFnZVdyYXBwZXIgfSBmcm9tICcuLi9jb21tb24vaW1hZ2Utd3JhcHBlcic7XG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICcuLi9jb21tb24vbW9tZW50JztcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vY29tbW9uL3BvaW50JztcbmltcG9ydCB7IGNhbGN1bGF0ZVBhdGNoU2l6ZSB9IGZyb20gJy4uL2lucHV0L2lucHV0LXN0cmVhbS11dGlscyc7XG5pbXBvcnQgeyBCYXJjb2RlTG9jYXRvckNvbmZpZyB9IGZyb20gJy4vYmFyY29kZS1sb2NhdG9yLWNvbmZpZyc7XG5pbXBvcnQgeyBoYWxmU2FtcGxlLCBpbnZlcnQsIG90c3VUaHJlc2hvbGQsIHRyYW5zZm9ybVdpdGhNYXRyaXggfSBmcm9tICcuL2JhcmNvZGUtbG9jYXRvci11dGlscyc7XG5pbXBvcnQgeyBSYXN0ZXJpemVyIH0gZnJvbSAnLi9yYXN0ZXJpemVyJztcbmltcG9ydCBza2VsZXRvbml6ZXIgZnJvbSAnLi9za2VsZXRvbml6ZXInO1xuaW1wb3J0IHsgU2VhcmNoRGlyZWN0aW9ucyB9IGZyb20gJy4vdHJhY2VyJztcblxuaW50ZXJmYWNlIFBhdGNoIHtcbiAgICBib3g6IEJveDtcbiAgICBpbmRleDogbnVtYmVyO1xuICAgIG1vbWVudHM6IEFycmF5PE1vbWVudD47XG4gICAgcG9zOiBQb2ludDtcbiAgICByYWQ6IG51bWJlcjtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xufVxuXG50eXBlIFNjZWxldG9uaXplciA9IGFueTtcblxuY29uc3QgTW9tZW50U2ltaWxhcml0eVRocmVzaG9sZCA9IDAuOTtcblxuZXhwb3J0IGNsYXNzIEJhcmNvZGVMb2NhdG9yIHtcbiAgICBwcml2YXRlIF9jb25maWc6IEJhcmNvZGVMb2NhdG9yQ29uZmlnO1xuICAgIHByaXZhdGUgX2lucHV0SW1hZ2VXcmFwcGVyOiBJbWFnZVdyYXBwZXI7XG4gICAgcHJpdmF0ZSBfY3VycmVudEltYWdlV3JhcHBlcjogSW1hZ2VXcmFwcGVyO1xuICAgIHByaXZhdGUgX3NrZWxJbWFnZVdyYXBwZXI6IEltYWdlV3JhcHBlcjtcbiAgICBwcml2YXRlIF9zdWJJbWFnZVdyYXBwZXI6IEltYWdlV3JhcHBlcjtcbiAgICBwcml2YXRlIF9sYWJlbEltYWdlV3JhcHBlcjogSW1hZ2VXcmFwcGVyPEFycmF5PG51bWJlcj4+O1xuICAgIHByaXZhdGUgX2JpbmFyeUltYWdlV3JhcHBlcjogSW1hZ2VXcmFwcGVyO1xuICAgIHByaXZhdGUgX3BhdGNoR3JpZDogSW1hZ2VXcmFwcGVyO1xuICAgIHByaXZhdGUgX3BhdGNoTGFiZWxHcmlkOiBJbWFnZVdyYXBwZXI8SW50MzJBcnJheT47XG4gICAgcHJpdmF0ZSBfaW1hZ2VUb1BhdGNoR3JpZDogQXJyYXk8UGF0Y2g+O1xuICAgIHByaXZhdGUgX3BhdGNoU2l6ZTogUG9pbnQ7XG4gICAgcHJpdmF0ZSBfYmluYXJ5Q29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIHByaXZhdGUgX251bVBhdGNoZXM6IFBvaW50O1xuICAgIHByaXZhdGUgX3NrZWxldG9uaXplcjogU2NlbGV0b25pemVyO1xuXG4gICAgY29uc3RydWN0b3IoaW5wdXRJbWFnZVdyYXBwZXI6IEltYWdlV3JhcHBlciwgY29uZmlnOiBCYXJjb2RlTG9jYXRvckNvbmZpZykge1xuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG4gICAgICAgIHRoaXMuX2lucHV0SW1hZ2VXcmFwcGVyID0gaW5wdXRJbWFnZVdyYXBwZXI7XG4gICAgICAgIHRoaXMuX251bVBhdGNoZXMgPSB7IHg6IDAsIHk6IDAgfTtcblxuICAgICAgICB0aGlzLl9pbml0QnVmZmVycygpO1xuICAgICAgICB0aGlzLl9pbml0Q2FudmFzKCk7XG4gICAgfVxuXG4gICAgbG9jYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5fY29uZmlnLmhhbGZTYW1wbGUpIHtcbiAgICAgICAgICAgIGhhbGZTYW1wbGUodGhpcy5faW5wdXRJbWFnZVdyYXBwZXIsIHRoaXMuX2N1cnJlbnRJbWFnZVdyYXBwZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYmluYXJpemVJbWFnZSgpO1xuICAgICAgICBjb25zdCBwYXRjaGVzRm91bmQgPSB0aGlzLl9maW5kUGF0Y2hlcygpO1xuICAgICAgICAvLyByZXR1cm4gdW5sZXNzIDUlIG9yIG1vcmUgcGF0Y2hlcyBhcmUgZm91bmRcbiAgICAgICAgaWYgKHBhdGNoZXNGb3VuZC5sZW5ndGggPCB0aGlzLl9udW1QYXRjaGVzLnggKiB0aGlzLl9udW1QYXRjaGVzLnkgKiAwLjA1KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJhc3Rlcml6ZSBhcmVhIGJ5IGNvbXBhcmluZyBhbmd1bGFyIHNpbWlsYXJpdHk7XG4gICAgICAgIGNvbnN0IG1heExhYmVsID0gdGhpcy5fcmFzdGVyaXplQW5ndWxhclNpbWlsYXJpdHkocGF0Y2hlc0ZvdW5kKTtcbiAgICAgICAgaWYgKG1heExhYmVsIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZWFyY2ggZm9yIGFyZWEgd2l0aCB0aGUgbW9zdCBwYXRjaGVzIChiaWdnZXN0IGNvbm5lY3RlZCBhcmVhKVxuICAgICAgICBjb25zdCB0b3BMYWJlbHMgPSB0aGlzLl9maW5kQmlnZ2VzdENvbm5lY3RlZEFyZWFzKG1heExhYmVsKTtcbiAgICAgICAgaWYgKHRvcExhYmVscy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYm94ZXMgPSB0aGlzLl9maW5kQm94ZXModG9wTGFiZWxzLCBtYXhMYWJlbCk7XG4gICAgICAgIHJldHVybiBib3hlcztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0QnVmZmVycygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5oYWxmU2FtcGxlKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50SW1hZ2VXcmFwcGVyID0gbmV3IEltYWdlV3JhcHBlcih7XG4gICAgICAgICAgICAgICAgeDogdGhpcy5faW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS54IC8gMiB8IDAsXG4gICAgICAgICAgICAgICAgeTogdGhpcy5faW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS55IC8gMiB8IDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudEltYWdlV3JhcHBlciA9IHRoaXMuX2lucHV0SW1hZ2VXcmFwcGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcGF0Y2hTaXplID0gY2FsY3VsYXRlUGF0Y2hTaXplKHRoaXMuX2NvbmZpZy5wYXRjaFNpemUsIHRoaXMuX2N1cnJlbnRJbWFnZVdyYXBwZXIuc2l6ZSk7XG5cbiAgICAgICAgdGhpcy5fbnVtUGF0Y2hlcy54ID0gdGhpcy5fY3VycmVudEltYWdlV3JhcHBlci5zaXplLnggLyB0aGlzLl9wYXRjaFNpemUueCB8IDA7XG4gICAgICAgIHRoaXMuX251bVBhdGNoZXMueSA9IHRoaXMuX2N1cnJlbnRJbWFnZVdyYXBwZXIuc2l6ZS55IC8gdGhpcy5fcGF0Y2hTaXplLnkgfCAwO1xuXG4gICAgICAgIHRoaXMuX2JpbmFyeUltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIodGhpcy5fY3VycmVudEltYWdlV3JhcHBlci5zaXplLCB1bmRlZmluZWQsIFVpbnQ4QXJyYXksIGZhbHNlKTtcblxuICAgICAgICB0aGlzLl9sYWJlbEltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIodGhpcy5fcGF0Y2hTaXplLCB1bmRlZmluZWQsIEFycmF5LCB0cnVlKTtcblxuICAgICAgICBjb25zdCBza2VsZXRvbkltYWdlRGF0YSA9IG5ldyBBcnJheUJ1ZmZlcig2NCAqIDEwMjQpO1xuICAgICAgICB0aGlzLl9zdWJJbWFnZVdyYXBwZXIgPSBuZXcgSW1hZ2VXcmFwcGVyKHRoaXMuX3BhdGNoU2l6ZSwgbmV3IFVpbnQ4QXJyYXkoc2tlbGV0b25JbWFnZURhdGEsIDAsIHRoaXMuX3BhdGNoU2l6ZS54ICogdGhpcy5fcGF0Y2hTaXplLnkpKTtcbiAgICAgICAgdGhpcy5fc2tlbEltYWdlV3JhcHBlciA9IG5ldyBJbWFnZVdyYXBwZXIodGhpcy5fcGF0Y2hTaXplLFxuICAgICAgICAgICAgbmV3IFVpbnQ4QXJyYXkoc2tlbGV0b25JbWFnZURhdGEsIHRoaXMuX3BhdGNoU2l6ZS54ICogdGhpcy5fcGF0Y2hTaXplLnkgKiAzLCB0aGlzLl9wYXRjaFNpemUueCAqIHRoaXMuX3BhdGNoU2l6ZS55KSxcbiAgICAgICAgICAgIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX3NrZWxldG9uaXplciA9IHNrZWxldG9uaXplcihcbiAgICAgICAgICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgPyB3aW5kb3cgOiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSA/IHNlbGYgOiBnbG9iYWwsXG4gICAgICAgICAgICB7IHNpemU6IHRoaXMuX3BhdGNoU2l6ZS54IH0sXG4gICAgICAgICAgICBza2VsZXRvbkltYWdlRGF0YVxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IHNpemUgPSB7XG4gICAgICAgICAgICB4OiAodGhpcy5fY3VycmVudEltYWdlV3JhcHBlci5zaXplLnggLyB0aGlzLl9zdWJJbWFnZVdyYXBwZXIuc2l6ZS54KSB8IDAsXG4gICAgICAgICAgICB5OiAodGhpcy5fY3VycmVudEltYWdlV3JhcHBlci5zaXplLnkgLyB0aGlzLl9zdWJJbWFnZVdyYXBwZXIuc2l6ZS55KSB8IDBcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fcGF0Y2hMYWJlbEdyaWQgPSBuZXcgSW1hZ2VXcmFwcGVyKHNpemUsIHVuZGVmaW5lZCwgSW50MzJBcnJheSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX3BhdGNoR3JpZCA9IG5ldyBJbWFnZVdyYXBwZXIoc2l6ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xuICAgICAgICB0aGlzLl9pbWFnZVRvUGF0Y2hHcmlkID0gbmV3IEFycmF5PFBhdGNoPih0aGlzLl9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdENhbnZhcygpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy51c2VXb3JrZXIgfHwgdHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIGNhbnZhcy5jbGFzc05hbWUgPSAnYmluYXJ5QnVmZmVyJztcbiAgICAgICAgY2FudmFzLndpZHRoID0gdGhpcy5fYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHRoaXMuX2JpbmFyeUltYWdlV3JhcHBlci5zaXplLnk7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHRoaXMuX2NvbmZpZy5kZWJ1ZyAmJiB0aGlzLl9jb25maWcuZGVidWcuc2hvd0NhbnZhcykge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RlYnVnJykuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9iaW5hcnlDb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGJvdW5kaW5nIGJveCB3aGljaCBlbmNsb3NlcyBhbGwgdGhlIGdpdmVuIHBhdGNoZXNcbiAgICAgKiBAcmV0dXJucyBUaGUgbWluaW1hbCBib3VuZGluZyBib3hcbiAgICAgKi9cbiAgICBwcml2YXRlIF9ib3hGcm9tUGF0Y2hlcyhwYXRjaGVzOiBBcnJheTxQYXRjaD4pOiBCb3gge1xuICAgICAgICBjb25zdCBkZWJ1ZyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdGhpcy5fY29uZmlnLmRlYnVnO1xuICAgICAgICBsZXQgYXZlcmFnZVJhZCA9IHBhdGNoZXMucmVkdWNlKChzdW0sIHsgcG9zLCByYWQgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKGRlYnVnICYmIGRlYnVnLnNob3dQYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgLy8gZHJhdyBhbGwgcGF0Y2hlcyB3aGljaCBhcmUgdG8gYmUgdGFrZW4gaW50byBjb25zaWRlcmF0aW9uXG4gICAgICAgICAgICAgICAgdGhpcy5fZHJhd1JlY3QocG9zLCB0aGlzLl9zdWJJbWFnZVdyYXBwZXIuc2l6ZSwgJ3JlZCcsIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc3VtICsgcmFkO1xuICAgICAgICB9LCAwKSAvIHBhdGNoZXMubGVuZ3RoO1xuXG4gICAgICAgIGF2ZXJhZ2VSYWQgPSAoYXZlcmFnZVJhZCAqIDE4MCAvIE1hdGguUEkgKyA5MCkgJSAxODAgLSA5MDtcbiAgICAgICAgaWYgKGF2ZXJhZ2VSYWQgPCAwKSB7XG4gICAgICAgICAgICBhdmVyYWdlUmFkICs9IDE4MDtcbiAgICAgICAgfVxuICAgICAgICBhdmVyYWdlUmFkID0gKDE4MCAtIGF2ZXJhZ2VSYWQpICogTWF0aC5QSSAvIDE4MDtcblxuICAgICAgICBjb25zdCBjb3MgPSBNYXRoLmNvcyhhdmVyYWdlUmFkKTtcbiAgICAgICAgY29uc3Qgc2luID0gTWF0aC5zaW4oYXZlcmFnZVJhZCk7XG4gICAgICAgIGNvbnN0IG1hdHJpeCA9IG5ldyBGbG9hdDMyQXJyYXkoW2Nvcywgc2luLCAtc2luLCBjb3NdKTtcbiAgICAgICAgY29uc3QgaW52ZXJzZU1hdHJpeCA9IGludmVydChtYXRyaXgpO1xuXG4gICAgICAgIC8vIGl0ZXJhdGUgb3ZlciBwYXRjaGVzIGFuZCByb3RhdGUgYnkgYW5nbGVcbiAgICAgICAgcGF0Y2hlcy5mb3JFYWNoKCh7IGJveCB9KSA9PiB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDQ7IGorKykge1xuICAgICAgICAgICAgICAgIGJveFtqXSA9IHRyYW5zZm9ybVdpdGhNYXRyaXgoYm94W2pdLCBtYXRyaXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGVidWcgJiYgZGVidWcuYm94RnJvbVBhdGNoZXMuc2hvd1RyYW5zZm9ybWVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZHJhd1BhdGgoYm94LCAnIzk5ZmYwMCcsIDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgbWluWCA9IHRoaXMuX2JpbmFyeUltYWdlV3JhcHBlci5zaXplLng7XG4gICAgICAgIGxldCBtaW5ZID0gdGhpcy5fYmluYXJ5SW1hZ2VXcmFwcGVyLnNpemUueTtcbiAgICAgICAgbGV0IG1heFggPSAtbWluWDtcbiAgICAgICAgbGV0IG1heFkgPSAtbWluWTtcblxuICAgICAgICAvLyBmaW5kIGJvdW5kaW5nIGJveFxuICAgICAgICBwYXRjaGVzLmZvckVhY2goKHsgYm94IH0pID0+IHtcbiAgICAgICAgICAgIGJveC5mb3JFYWNoKCh7IHgsIHkgfSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh4IDwgbWluWCkge1xuICAgICAgICAgICAgICAgICAgICBtaW5YID0geDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHggPiBtYXhYKSB7XG4gICAgICAgICAgICAgICAgICAgIG1heFggPSB4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoeSA8IG1pblkpIHtcbiAgICAgICAgICAgICAgICAgICAgbWluWSA9IHk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh5ID4gbWF4WSkge1xuICAgICAgICAgICAgICAgICAgICBtYXhZID0geTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGJveDogQm94ID0gW3sgeDogbWluWCwgeTogbWluWSB9LCB7IHg6IG1heFgsIHk6IG1pblkgfSwgeyB4OiBtYXhYLCB5OiBtYXhZIH0sIHsgeDogbWluWCwgeTogbWF4WSB9XTtcblxuICAgICAgICBpZiAoZGVidWcgJiYgZGVidWcuYm94RnJvbVBhdGNoZXMuc2hvd1RyYW5zZm9ybWVkQm94KSB7XG4gICAgICAgICAgICB0aGlzLl9kcmF3UGF0aChib3gsICcjZmYwMDAwJywgMik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXZlcnNlIHJvdGF0aW9uXG4gICAgICAgIGJveCA9IGJveC5tYXAodmVydGV4ID0+IHRyYW5zZm9ybVdpdGhNYXRyaXgodmVydGV4LCBpbnZlcnNlTWF0cml4KSkgYXMgQm94O1xuXG4gICAgICAgIGlmIChkZWJ1ZyAmJiBkZWJ1Zy5ib3hGcm9tUGF0Y2hlcy5zaG93QkIpIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYXdQYXRoKGJveCwgJyNmZjAwMDAnLCAyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9jb25maWcuaGFsZlNhbXBsZSkge1xuICAgICAgICAgICAgLy8gc2NhbGVcbiAgICAgICAgICAgIGJveCA9IGJveC5tYXAoKHsgeCwgeSB9KSA9PiAoeyB4OiB4ICogMiwgeTogeSAqPSAyIH0pKSBhcyBCb3g7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYm94O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBiaW5hcnkgaW1hZ2Ugb2YgdGhlIGN1cnJlbnQgaW1hZ2VcbiAgICAgKi9cbiAgICBwcml2YXRlIF9iaW5hcml6ZUltYWdlKCk6IHZvaWQge1xuICAgICAgICBvdHN1VGhyZXNob2xkKHRoaXMuX2N1cnJlbnRJbWFnZVdyYXBwZXIsIHRoaXMuX2JpbmFyeUltYWdlV3JhcHBlcik7XG4gICAgICAgIHRoaXMuX2JpbmFyeUltYWdlV3JhcHBlci56ZXJvQm9yZGVyKCk7XG5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdGhpcy5fY29uZmlnLmRlYnVnICYmIHRoaXMuX2NvbmZpZy5kZWJ1Zy5zaG93Q2FudmFzKSB7XG4gICAgICAgICAgICB0aGlzLl9iaW5hcnlJbWFnZVdyYXBwZXIuc2hvdyh0aGlzLl9iaW5hcnlDb250ZXh0LCAyNTUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZSBvdmVyIHRoZSBlbnRpcmUgaW1hZ2UsIGV4dHJhY3QgcGF0Y2hlc1xuICAgICAqL1xuICAgIHByaXZhdGUgX2ZpbmRQYXRjaGVzKCk6IEFycmF5PFBhdGNoPiB7XG4gICAgICAgIGNvbnN0IGRlYnVnID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0aGlzLl9jb25maWcuZGVidWc7XG4gICAgICAgIGxldCBwYXRjaGVzRm91bmQgPSBuZXcgQXJyYXk8UGF0Y2g+KCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9udW1QYXRjaGVzLng7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9udW1QYXRjaGVzLnk7IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHggPSB0aGlzLl9zdWJJbWFnZVdyYXBwZXIuc2l6ZS54ICogaTtcbiAgICAgICAgICAgICAgICBjb25zdCB5ID0gdGhpcy5fc3ViSW1hZ2VXcmFwcGVyLnNpemUueSAqIGo7XG5cbiAgICAgICAgICAgICAgICAvLyBzZXBlcmF0ZSBwYXJ0c1xuICAgICAgICAgICAgICAgIHRoaXMuX3NrZWxldG9uaXplKHgsIHkpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmFzdGVyaXplLCBmaW5kIGluZGl2aWR1YWwgYmFyc1xuICAgICAgICAgICAgICAgIHRoaXMuX3NrZWxJbWFnZVdyYXBwZXIuemVyb0JvcmRlcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsSW1hZ2VXcmFwcGVyLmRhdGEuZmlsbCgwKTtcbiAgICAgICAgICAgICAgICBjb25zdCByYXN0ZXJpemVyID0gbmV3IFJhc3Rlcml6ZXIodGhpcy5fc2tlbEltYWdlV3JhcHBlciwgdGhpcy5fbGFiZWxJbWFnZVdyYXBwZXIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhc3RlclJlc3VsdCA9IHJhc3Rlcml6ZXIucmFzdGVyaXplKDApO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRlYnVnICYmIGRlYnVnLnNob3dMYWJlbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGFiZWxJbWFnZVdyYXBwZXIub3ZlcmxheSh0aGlzLl9iaW5hcnlDb250ZXh0LCAzNjAgLyByYXN0ZXJSZXN1bHQuY291bnQgfCAwLCB4LCB5KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBjYWxjdWxhdGUgbW9tZW50cyBmcm9tIHRoZSBza2VsZXRvbml6ZWQgcGF0Y2hcbiAgICAgICAgICAgICAgICBjb25zdCBtb21lbnRzID0gdGhpcy5fbGFiZWxJbWFnZVdyYXBwZXIubW9tZW50cyhyYXN0ZXJSZXN1bHQuY291bnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gZXh0cmFjdCBlbGlnaWJsZSBwYXRjaGVzXG4gICAgICAgICAgICAgICAgY29uc3QgcGF0Y2ggPSB0aGlzLl9kZXNjcmliZVBhdGNoKG1vbWVudHMsIGogKiB0aGlzLl9udW1QYXRjaGVzLnggKyBpLCB4LCB5KTtcbiAgICAgICAgICAgICAgICBpZiAocGF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0Y2hlc0ZvdW5kLnB1c2gocGF0Y2gpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWJ1ZyAmJiBkZWJ1Zy5zaG93Rm91bmRQYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kcmF3UmVjdChwYXRjaC5wb3MsIHRoaXMuX3N1YkltYWdlV3JhcHBlci5zaXplLCAnIzk5ZmYwMCcsIDIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhdGNoZXNGb3VuZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aG9zZSBjb25uZWN0ZWQgYXJlYXMgd2hpY2ggY29udGFpbiBhdCBsZWFzdCA2IHBhdGNoZXNcbiAgICAgKiBhbmQgcmV0dXJucyB0aGVtIG9yZGVyZWQgREVTQyBieSB0aGUgbnVtYmVyIG9mIGNvbnRhaW5lZCBwYXRjaGVzXG4gICAgICogQHBhcmFtIG1heExhYmVsXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZmluZEJpZ2dlc3RDb25uZWN0ZWRBcmVhcyhtYXhMYWJlbDogbnVtYmVyKTogQXJyYXk8bnVtYmVyPiB7XG4gICAgICAgIGxldCBsYWJlbEhpc3QgPSBuZXcgQXJyYXk8bnVtYmVyPihtYXhMYWJlbCkuZmlsbCgwKTtcblxuICAgICAgICB0aGlzLl9wYXRjaExhYmVsR3JpZC5kYXRhLmZvckVhY2goKGRhdGE6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEgPiAwKSB7XG4gICAgICAgICAgICAgICAgbGFiZWxIaXN0W2RhdGEgLSAxXSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBleHRyYWN0IHRvcCBhcmVhcyB3aXRoIGF0IGxlYXN0IDYgcGF0Y2hlcyBwcmVzZW50XG4gICAgICAgIGNvbnN0IHRvcExhYmVscyA9IGxhYmVsSGlzdC5tYXAoKHZhbHVlLCBpbmRleCkgPT4gKHsgdmFsdWUsIGluZGV4IH0pKVxuICAgICAgICAgICAgLmZpbHRlcigoeyB2YWx1ZSB9KSA9PiB2YWx1ZSA+PSA1KS5zb3J0KChhLCBiKSA9PiBiLnZhbHVlIC0gYS52YWx1ZSkubWFwKCh7IGluZGV4IH0pID0+IGluZGV4ICsgMSk7XG5cbiAgICAgICAgcmV0dXJuIHRvcExhYmVscztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgX2ZpbmRCb3hlcyh0b3BMYWJlbHM6IEFycmF5PG51bWJlcj4sIG1heExhYmVsOiBudW1iZXIpOiBBcnJheTxCb3g+IHtcbiAgICAgICAgY29uc3QgYm94ZXMgPSBuZXcgQXJyYXk8Qm94PigpO1xuICAgICAgICBjb25zdCBzaG93UmVtYWluaW5nUGF0Y2hMYWJlbHMgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuZGVidWcgJiYgdGhpcy5fY29uZmlnLmRlYnVnLnNob3dSZW1haW5pbmdQYXRjaExhYmVscztcblxuICAgICAgICB0b3BMYWJlbHMuZm9yRWFjaChsYWJlbCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXRjaGVzID0gbmV3IEFycmF5PFBhdGNoPigpO1xuXG4gICAgICAgICAgICB0aGlzLl9wYXRjaExhYmVsR3JpZC5kYXRhLmZvckVhY2goKGRhdGE6IG51bWJlciwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhID09PSBsYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBwYXRjaGVzLnB1c2godGhpcy5faW1hZ2VUb1BhdGNoR3JpZFtpbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBib3ggPSB0aGlzLl9ib3hGcm9tUGF0Y2hlcyhwYXRjaGVzKTtcblxuICAgICAgICAgICAgaWYgKGJveCkge1xuICAgICAgICAgICAgICAgIGJveGVzLnB1c2goYm94KTtcblxuICAgICAgICAgICAgICAgIGlmIChzaG93UmVtYWluaW5nUGF0Y2hMYWJlbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZHJhdyBwYXRjaC1sYWJlbHMgaWYgcmVxdWVzdGVkXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhzdjogSFNWID0gWyhsYWJlbCAvIChtYXhMYWJlbCArIDEpKSAqIDM2MCwgMSwgMV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJnYjogUkdCID0gWzAsIDAsIDBdO1xuICAgICAgICAgICAgICAgICAgICBoc3YycmdiKGhzdiwgcmdiKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IGByZ2IoJHtyZ2Iuam9pbignLCcpfSlgO1xuXG4gICAgICAgICAgICAgICAgICAgIHBhdGNoZXMuZm9yRWFjaCgoeyBwb3MgfSkgPT4gdGhpcy5fZHJhd1JlY3QocG9zLCB0aGlzLl9zdWJJbWFnZVdyYXBwZXIuc2l6ZSwgY29sb3IsIDIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBib3hlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kIHNpbWlsYXIgbW9tZW50cyAodmlhIGNsdXN0ZXIpXG4gICAgICogQHBhcmFtIG1vbWVudHNcbiAgICAgKi9cbiAgICBwcml2YXRlIF9zaW1pbGFyTW9tZW50cyhtb21lbnRzOiBBcnJheTxNb21lbnQ+KTogQXJyYXk8TW9tZW50PiB7XG4gICAgICAgIGNvbnN0IGNsdXN0ZXJzID0gQ2x1c3Rlci5jbHVzdGVyaXplKG1vbWVudHMsIE1vbWVudFNpbWlsYXJpdHlUaHJlc2hvbGQpO1xuICAgICAgICBjb25zdCB0b3BDbHVzdGVyID0gY2x1c3RlcnMucmVkdWNlKCh0b3AsIGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gaXRlbS5tb21lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiBjb3VudCA+IHRvcC5jb3VudCA/IHsgaXRlbSwgY291bnQgfSA6IHRvcDtcbiAgICAgICAgfSwgeyBpdGVtOiB7IG1vbWVudHM6IFtdIH0sIGNvdW50OiAwIH0pO1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0b3BDbHVzdGVyLml0ZW0ubW9tZW50cztcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NrZWxldG9uaXplKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2JpbmFyeUltYWdlV3JhcHBlci5zdWJJbWFnZUFzQ29weSh0aGlzLl9zdWJJbWFnZVdyYXBwZXIsIHgsIHkpO1xuICAgICAgICB0aGlzLl9za2VsZXRvbml6ZXIuc2tlbGV0b25pemUoKTtcblxuICAgICAgICAvLyBTaG93IHNrZWxldG9uIGlmIHJlcXVlc3RlZFxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0aGlzLl9jb25maWcuZGVidWcgJiYgdGhpcy5fY29uZmlnLmRlYnVnLnNob3dTa2VsZXRvbikge1xuICAgICAgICAgICAgdGhpcy5fc2tlbEltYWdlV3JhcHBlci5vdmVybGF5KHRoaXMuX2JpbmFyeUNvbnRleHQsIDM2MCwgeCwgeSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHRyYWN0cyBhbmQgZGVzY3JpYmVzIHRob3NlIHBhdGNoZXMgd2hpY2ggc2VlbSB0byBjb250YWluIGEgYmFyY29kZSBwYXR0ZXJuXG4gICAgICogQHBhcmFtIG1vbWVudHNcbiAgICAgKiBAcGFyYW0gaW5kZXhcbiAgICAgKiBAcGFyYW0geFxuICAgICAqIEBwYXJhbSB5XG4gICAgICogQHJldHVybnMgbGlzdCBvZiBwYXRjaGVzXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZGVzY3JpYmVQYXRjaChtb21lbnRzOiBBcnJheTxNb21lbnQ+LCBpbmRleDogbnVtYmVyLCB4OiBudW1iZXIsIHk6IG51bWJlcik6IFBhdGNoIHtcbiAgICAgICAgaWYgKG1vbWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgY29uc3QgbWluQ29tcG9uZW50V2VpZ2h0ID0gTWF0aC5jZWlsKHRoaXMuX3BhdGNoU2l6ZS54IC8gMyk7XG4gICAgICAgICAgICAvLyBvbmx5IGNvbGxlY3QgbW9tZW50cyB3aGljaCBhcmVhIGNvdmVycyBhdCBsZWFzdCBtaW5Db21wb25lbnRXZWlnaHQgcGl4ZWxzXG4gICAgICAgICAgICBjb25zdCBlbGlnaWJsZU1vbWVudHMgPSBtb21lbnRzLmZpbHRlcihtb21lbnQgPT4gbW9tZW50Lm0wMCA+IG1pbkNvbXBvbmVudFdlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIGlmIGF0IGxlYXN0IDIgbW9tZW50cyBhcmUgZm91bmQgd2hpY2ggaGF2ZSBhdCBsZWFzdCBtaW5Db21wb25lbnRXZWlnaHRzIGNvdmVyZWRcbiAgICAgICAgICAgIGlmIChlbGlnaWJsZU1vbWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoaW5nTW9tZW50cyA9IHRoaXMuX3NpbWlsYXJNb21lbnRzKGVsaWdpYmxlTW9tZW50cyk7XG4gICAgICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gbWF0Y2hpbmdNb21lbnRzLmxlbmd0aCB8IDA7XG5cbiAgICAgICAgICAgICAgICAvLyBPbmx5IHR3byBvZiB0aGUgbW9tZW50cyBhcmUgYWxsb3dlZCBub3QgdG8gZml0IGludG8gdGhlIGVxdWF0aW9uXG4gICAgICAgICAgICAgICAgaWYgKGxlbmd0aCA+IDEgJiYgKGxlbmd0aCA8PCAyKSA+PSBlbGlnaWJsZU1vbWVudHMubGVuZ3RoICogMyAmJiAobGVuZ3RoIDw8IDIpID4gbW9tZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIHRoZSBzaW1pbGFyaXR5IG9mIHRoZSBtb21lbnRzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhZCA9IG1hdGNoaW5nTW9tZW50cy5yZWR1Y2UoKHN1bTogbnVtYmVyLCBtb21lbnQ6IE1vbWVudCkgPT4gc3VtICsgbW9tZW50LnJhZCwgMCkgLyBsZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zOiB7IHgsIHkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJveDogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgeCwgeSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogeCArIHRoaXMuX3N1YkltYWdlV3JhcHBlci5zaXplLngsIHkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHg6IHggKyB0aGlzLl9zdWJJbWFnZVdyYXBwZXIuc2l6ZS54LCB5OiB5ICsgdGhpcy5fc3ViSW1hZ2VXcmFwcGVyLnNpemUueSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgeCwgeTogeSArIHRoaXMuX3N1YkltYWdlV3JhcHBlci5zaXplLnkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbWVudHM6IG1hdGNoaW5nTW9tZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IE1hdGguY29zKHJhZCksXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBNYXRoLnNpbihyYWQpXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbm90WWV0UHJvY2Vzc2VkKCk6IG51bWJlciB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3BhdGNoTGFiZWxHcmlkLmRhdGFbaV0gPT09IDAgJiYgdGhpcy5fcGF0Y2hHcmlkLmRhdGFbaV0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdHJhY2UoY3VycmVudEluZGV4OiBudW1iZXIsIGxhYmVsOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdGhyZXNob2xkID0gMC45NTtcbiAgICAgICAgY29uc3QgY3VycmVudDogUG9pbnQgPSB7XG4gICAgICAgICAgICB4OiBjdXJyZW50SW5kZXggJSB0aGlzLl9wYXRjaExhYmVsR3JpZC5zaXplLngsXG4gICAgICAgICAgICB5OiAoY3VycmVudEluZGV4IC8gdGhpcy5fcGF0Y2hMYWJlbEdyaWQuc2l6ZS54KSB8IDBcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoY3VycmVudEluZGV4IDwgdGhpcy5fcGF0Y2hMYWJlbEdyaWQuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQYXRjaCA9IHRoaXMuX2ltYWdlVG9QYXRjaEdyaWRbY3VycmVudEluZGV4XTtcbiAgICAgICAgICAgIC8vIGFzc2lnbiBsYWJlbFxuICAgICAgICAgICAgdGhpcy5fcGF0Y2hMYWJlbEdyaWQuZGF0YVtjdXJyZW50SW5kZXhdID0gbGFiZWw7XG5cbiAgICAgICAgICAgIFNlYXJjaERpcmVjdGlvbnMuZm9yRWFjaChkaXJlY3Rpb24gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHkgPSBjdXJyZW50LnkgKyBkaXJlY3Rpb25bMF07XG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IGN1cnJlbnQueCArIGRpcmVjdGlvblsxXTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHkgKiB0aGlzLl9wYXRjaExhYmVsR3JpZC5zaXplLnggKyB4O1xuXG4gICAgICAgICAgICAgICAgLy8gY29udGludWUgaWYgcGF0Y2ggZW1wdHlcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcGF0Y2hHcmlkLmRhdGFbaW5kZXhdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhdGNoTGFiZWxHcmlkLmRhdGFbaW5kZXhdID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3BhdGNoTGFiZWxHcmlkLmRhdGFbaW5kZXhdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhdGNoID0gdGhpcy5faW1hZ2VUb1BhdGNoR3JpZFtpbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNpbWlsYXJpdHkgPSBNYXRoLmFicyhwYXRjaC54ICogY3VycmVudFBhdGNoLnggKyBwYXRjaC55ICogY3VycmVudFBhdGNoLnkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2ltaWxhcml0eSA+IHRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJhY2UoaW5kZXgsIGxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgcGF0Y2hlcyB3aGljaCBhcmUgY29ubmVjdGVkIGFuZCBzaGFyZSB0aGUgc2FtZSBvcmllbnRhdGlvblxuICAgICAqIEBwYXJhbSBwYXRjaGVzRm91bmRcbiAgICAgKi9cbiAgICBwcml2YXRlIF9yYXN0ZXJpemVBbmd1bGFyU2ltaWxhcml0eShwYXRjaGVzRm91bmQ6IEFycmF5PFBhdGNoPik6IG51bWJlciB7XG4gICAgICAgIGxldCBsYWJlbCA9IDA7XG4gICAgICAgIGNvbnN0IGhzdjogSFNWID0gWzAsIDEsIDFdO1xuICAgICAgICBjb25zdCByZ2I6IFJHQiA9IFswLCAwLCAwXTtcblxuICAgICAgICAvLyBwcmVwYXJlIGZvciBmaW5kaW5nIHRoZSByaWdodCBwYXRjaGVzXG4gICAgICAgIHRoaXMuX3BhdGNoR3JpZC5kYXRhLmZpbGwoMCk7XG4gICAgICAgIHRoaXMuX3BhdGNoTGFiZWxHcmlkLmRhdGEuZmlsbCgwKTtcbiAgICAgICAgdGhpcy5faW1hZ2VUb1BhdGNoR3JpZC5maWxsKG51bGwpO1xuXG4gICAgICAgIHBhdGNoZXNGb3VuZC5mb3JFYWNoKHBhdGNoID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlVG9QYXRjaEdyaWRbcGF0Y2guaW5kZXhdID0gcGF0Y2g7XG4gICAgICAgICAgICB0aGlzLl9wYXRjaEdyaWQuZGF0YVtwYXRjaC5pbmRleF0gPSAxO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyByYXN0ZXJpemUgdGhlIHBhdGNoZXMgZm91bmQgdG8gZGV0ZXJtaW5lIGFyZWFcbiAgICAgICAgdGhpcy5fcGF0Y2hHcmlkLnplcm9Cb3JkZXIoKTtcblxuICAgICAgICBsZXQgY3VycmVudEluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKChjdXJyZW50SW5kZXggPSB0aGlzLl9ub3RZZXRQcm9jZXNzZWQoKSkgPCB0aGlzLl9wYXRjaExhYmVsR3JpZC5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgbGFiZWwrKztcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlKGN1cnJlbnRJbmRleCwgbGFiZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZHJhdyBwYXRjaC1sYWJlbHMgaWYgcmVxdWVzdGVkXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHRoaXMuX2NvbmZpZy5kZWJ1ZyAmJiB0aGlzLl9jb25maWcuZGVidWcuc2hvd1BhdGNoTGFiZWxzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX3BhdGNoTGFiZWxHcmlkLmRhdGEubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcGF0Y2hMYWJlbEdyaWQuZGF0YVtqXSA+IDAgJiYgdGhpcy5fcGF0Y2hMYWJlbEdyaWQuZGF0YVtqXSA8PSBsYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXRjaCA9IHRoaXMuX2ltYWdlVG9QYXRjaEdyaWRbal07XG4gICAgICAgICAgICAgICAgICAgIGhzdlswXSA9ICh0aGlzLl9wYXRjaExhYmVsR3JpZC5kYXRhW2pdIC8gKGxhYmVsICsgMSkpICogMzYwO1xuICAgICAgICAgICAgICAgICAgICBoc3YycmdiKGhzdiwgcmdiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZHJhd1JlY3QocGF0Y2gucG9zLCB0aGlzLl9zdWJJbWFnZVdyYXBwZXIuc2l6ZSwgYHJnYigke3JnYi5qb2luKCcsJyl9KWAsIDIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsYWJlbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kcmF3UmVjdCh7IHgsIHkgfTogUG9pbnQsIHNpemU6IFBvaW50LCBjb2xvcjogc3RyaW5nLCBsaW5lV2lkdGg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9iaW5hcnlDb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgICAgIHRoaXMuX2JpbmFyeUNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgIHRoaXMuX2JpbmFyeUNvbnRleHQubGluZVdpZHRoID0gbGluZVdpZHRoIHx8IDE7XG4gICAgICAgIHRoaXMuX2JpbmFyeUNvbnRleHQuc3Ryb2tlUmVjdCh4LCB5LCBzaXplLngsIHNpemUueSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZHJhd1BhdGgocGF0aDogQXJyYXk8UG9pbnQ+LCBjb2xvcjogc3RyaW5nLCBsaW5lV2lkdGg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBJbWFnZURlYnVnLmRyYXdQYXRoKHBhdGgsIHRoaXMuX2JpbmFyeUNvbnRleHQsIGNvbG9yLCBsaW5lV2lkdGgpO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGJvcnJvd3MgaHR0cDovL3d3dy5jb2RlcHJvamVjdC5jb20vVGlwcy80MDcxNzIvQ29ubmVjdGVkLUNvbXBvbmVudC1MYWJlbGluZy1hbmQtVmVjdG9yaXphdGlvblxuICovXG5cbmltcG9ydCB7IEltYWdlV3JhcHBlciB9IGZyb20gJy4uL2NvbW1vbi9pbWFnZS13cmFwcGVyJztcbmltcG9ydCB7IENvbnRvdXJWZXJ0ZXgsIFRyYWNlciB9IGZyb20gJy4vdHJhY2VyJztcblxuZW51bSBFZGdlTGFiZWwge1xuICAgIE91dHNpZGUgPSAtMzI3NjcsXG4gICAgSW5zaWRlID0gLTMyNzY2XG59O1xuXG5lbnVtIENvbnRvdXJEaXJlY3Rpb24ge1xuICAgIENXID0gMCxcbiAgICBDQ1cgPSAxLFxuICAgIFVua25vd24gPSAyXG59O1xuXG5pbnRlcmZhY2UgQ29udG91ciB7XG4gICAgZGlyOiBDb250b3VyRGlyZWN0aW9uO1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgZmlyc3RWZXJ0ZXg6IENvbnRvdXJWZXJ0ZXg7XG4gICAgcHJldmlvdXNQZWVyPzogQ29udG91cjtcbiAgICBuZXh0UGVlcj86IENvbnRvdXI7XG4gICAgaW5zaWRlQ29udG91cnM6IENvbnRvdXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmFzdGVyUmVzdWx0IHtcbiAgICBjYzogQ29udG91cjtcbiAgICBjb3VudDogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgUmFzdGVyaXplciB7XG4gICAgcHJpdmF0ZSBfd2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIF9oZWlnaHQ6IG51bWJlcjtcbiAgICBwcml2YXRlIF90cmFjZXI6IFRyYWNlcjtcbiAgICBwcml2YXRlIF9pbWFnZURhdGE6IFVpbnQ4QXJyYXk7XG4gICAgcHJpdmF0ZSBfbGFiZWxEYXRhOiBBcnJheTxudW1iZXI+O1xuXG4gICAgY29uc3RydWN0b3IoaW1hZ2VXcmFwcGVyOiBJbWFnZVdyYXBwZXI8VWludDhBcnJheT4sIGxhYmVsV3JhcHBlcjogSW1hZ2VXcmFwcGVyPEFycmF5PG51bWJlcj4+KSB7XG4gICAgICAgIHRoaXMuX2ltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhO1xuICAgICAgICB0aGlzLl9sYWJlbERhdGEgPSBsYWJlbFdyYXBwZXIuZGF0YSBhcyBBcnJheTxudW1iZXI+O1xuICAgICAgICB0aGlzLl93aWR0aCA9IGltYWdlV3JhcHBlci5zaXplLng7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IGltYWdlV3JhcHBlci5zaXplLnk7XG4gICAgICAgIHRoaXMuX3RyYWNlciA9IG5ldyBUcmFjZXIoaW1hZ2VXcmFwcGVyLCBsYWJlbFdyYXBwZXIpO1xuICAgIH1cblxuICAgIHJhc3Rlcml6ZShkZXB0aExhYmVsOiBudW1iZXIpOiBSYXN0ZXJSZXN1bHQge1xuICAgICAgICBjb25zdCBjb2xvck1hcCA9IG5ldyBBcnJheTxudW1iZXI+KCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0MDA7IGkrKykge1xuICAgICAgICAgICAgY29sb3JNYXBbaV0gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgY29sb3JNYXBbMF0gPSB0aGlzLl9pbWFnZURhdGFbMF07XG5cbiAgICAgICAgbGV0IGNjOiBDb250b3VyID0gbnVsbDtcbiAgICAgICAgbGV0IHNjOiBDb250b3VyO1xuICAgICAgICBsZXQgY29ubmVjdGVkQ291bnQgPSAwO1xuXG4gICAgICAgIGZvciAobGV0IGN5ID0gMTsgY3kgPCB0aGlzLl9oZWlnaHQgLSAxOyBjeSsrKSB7XG4gICAgICAgICAgICBsZXQgbGFiZWxJbmRleCA9IDA7XG4gICAgICAgICAgICBsZXQgYmMgPSBjb2xvck1hcFswXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgY3ggPSAxOyBjeCA8IHRoaXMuX3dpZHRoIC0gMTsgY3grKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvcyA9IGN5ICogdGhpcy5fd2lkdGggKyBjeDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sYWJlbERhdGFbcG9zXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHRoaXMuX2ltYWdlRGF0YVtwb3NdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IgIT09IGJjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWxJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxjID0gY29ubmVjdGVkQ291bnQgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yTWFwW2xjXSA9IGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJjID0gY29sb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmVydGV4ID0gdGhpcy5fdHJhY2VyLmNvbnRvdXJUcmFjaW5nKGN5LCBjeCwgbGMsIGNvbG9yLCBFZGdlTGFiZWwuT3V0c2lkZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZlcnRleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0ZWRDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbEluZGV4ID0gbGM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHA6IENvbnRvdXIgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXI6IENvbnRvdXJEaXJlY3Rpb24uQ1csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogbGFiZWxJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0VmVydGV4OiB2ZXJ0ZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0UGVlcjogY2MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNpZGVDb250b3VyczogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2MgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnByZXZpb3VzUGVlciA9IHA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MgPSBwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmVydGV4ID0gdGhpcy5fdHJhY2VyLmNvbnRvdXJUcmFjaW5nKGN5LCBjeCwgRWRnZUxhYmVsLkluc2lkZSwgY29sb3IsIGxhYmVsSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2ZXJ0ZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcDogQ29udG91ciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcjogZGVwdGhMYWJlbCA9PT0gMCA/IENvbnRvdXJEaXJlY3Rpb24uQ0NXIDogQ29udG91ckRpcmVjdGlvbi5DVyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0VmVydGV4OiB2ZXJ0ZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogZGVwdGhMYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc2lkZUNvbnRvdXJzOiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjID0gY2M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgoc2MgIT09IG51bGwpICYmIHNjLmluZGV4ICE9PSBsYWJlbEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYyA9IHNjLm5leHRQZWVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzYyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5uZXh0UGVlciA9IHNjLmluc2lkZUNvbnRvdXJzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjLmluc2lkZUNvbnRvdXJzICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2MuaW5zaWRlQ29udG91cnMucHJldmlvdXNQZWVyID0gcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjLmluc2lkZUNvbnRvdXJzID0gcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsRGF0YVtwb3NdID0gbGFiZWxJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbGFiZWxEYXRhW3Bvc10gPT09IEVkZ2VMYWJlbC5JbnNpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGJjID0gdGhpcy5faW1hZ2VEYXRhW3Bvc107XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9sYWJlbERhdGFbcG9zXSA9PT0gRWRnZUxhYmVsLk91dHNpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGJjID0gY29sb3JNYXBbMF07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxJbmRleCA9IHRoaXMuX2xhYmVsRGF0YVtwb3NdO1xuICAgICAgICAgICAgICAgICAgICBiYyA9IGNvbG9yTWFwW2xhYmVsSW5kZXhdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHNjID0gY2M7XG4gICAgICAgIHdoaWxlIChzYyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc2MuaW5kZXggPSBkZXB0aExhYmVsO1xuICAgICAgICAgICAgc2MgPSBzYy5uZXh0UGVlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjYyxcbiAgICAgICAgICAgIGNvdW50OiBjb25uZWN0ZWRDb3VudFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGRyYXdDb250b3VyKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIGZpcnN0Q29udG91cjogQ29udG91cik6IHZvaWQge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9ICdyZWQnO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICdyZWQnO1xuICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IDE7XG5cbiAgICAgICAgbGV0IHBxID0gZmlyc3RDb250b3VyO1xuICAgICAgICBsZXQgaXEgPSBwcSAmJiBwcS5pbnNpZGVDb250b3VycztcblxuICAgICAgICB3aGlsZSAocHEgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBxID0gaXEgfHwgcHE7XG5cbiAgICAgICAgICAgIGlmIChpcSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlxID0gaXEubmV4dFBlZXI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBxID0gcHEubmV4dFBlZXI7XG4gICAgICAgICAgICAgICAgaXEgPSBwcSAmJiBwcS5pbnNpZGVDb250b3VycztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3dpdGNoIChxLmRpcikge1xuICAgICAgICAgICAgICAgIGNhc2UgQ29udG91ckRpcmVjdGlvbi5DVzoge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJ3JlZCc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIENvbnRvdXJEaXJlY3Rpb24uQ0NXOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAnYmx1ZSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIENvbnRvdXJEaXJlY3Rpb24uVW5rbm93bjoge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJ2dyZWVuJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcCA9IHEuZmlyc3RWZXJ0ZXg7XG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8ocC54LCBwLnkpO1xuXG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgcCA9IHAubmV4dDtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhwLngsIHAueSk7XG4gICAgICAgICAgICB9IHdoaWxlIChwICE9PSBxLmZpcnN0VmVydGV4KTtcblxuICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGVxZXFlcSAqL1xuZnVuY3Rpb24gU2tlbGV0b25pemVyKHN0ZGxpYiwgZm9yZWlnbiwgYnVmZmVyKSB7XG4gICAgXCJ1c2UgYXNtXCI7XG5cbiAgICB2YXIgaW1hZ2VzID0gbmV3IHN0ZGxpYi5VaW50OEFycmF5KGJ1ZmZlciksXG4gICAgICAgIHNpemUgPSBmb3JlaWduLnNpemUgfCAwLFxuICAgICAgICBpbXVsID0gc3RkbGliLk1hdGguaW11bDtcblxuICAgIGZ1bmN0aW9uIGVyb2RlKGluSW1hZ2VQdHIsIG91dEltYWdlUHRyKSB7XG4gICAgICAgIGluSW1hZ2VQdHIgPSBpbkltYWdlUHRyIHwgMDtcbiAgICAgICAgb3V0SW1hZ2VQdHIgPSBvdXRJbWFnZVB0ciB8IDA7XG5cbiAgICAgICAgdmFyIHYgPSAwLFxuICAgICAgICAgICAgdSA9IDAsXG4gICAgICAgICAgICBzdW0gPSAwLFxuICAgICAgICAgICAgeVN0YXJ0MSA9IDAsXG4gICAgICAgICAgICB5U3RhcnQyID0gMCxcbiAgICAgICAgICAgIHhTdGFydDEgPSAwLFxuICAgICAgICAgICAgeFN0YXJ0MiA9IDAsXG4gICAgICAgICAgICBvZmZzZXQgPSAwO1xuXG4gICAgICAgIGZvciAodiA9IDE7ICh2IHwgMCkgPCAoKHNpemUgLSAxKSB8IDApOyB2ID0gKHYgKyAxKSB8IDApIHtcbiAgICAgICAgICAgIG9mZnNldCA9IChvZmZzZXQgKyBzaXplKSB8IDA7XG4gICAgICAgICAgICBmb3IgKHUgPSAxOyAodSB8IDApIDwgKChzaXplIC0gMSkgfCAwKTsgdSA9ICh1ICsgMSkgfCAwKSB7XG4gICAgICAgICAgICAgICAgeVN0YXJ0MSA9IChvZmZzZXQgLSBzaXplKSB8IDA7XG4gICAgICAgICAgICAgICAgeVN0YXJ0MiA9IChvZmZzZXQgKyBzaXplKSB8IDA7XG4gICAgICAgICAgICAgICAgeFN0YXJ0MSA9ICh1IC0gMSkgfCAwO1xuICAgICAgICAgICAgICAgIHhTdGFydDIgPSAodSArIDEpIHwgMDtcbiAgICAgICAgICAgICAgICBzdW0gPSAoKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDEgKyB4U3RhcnQxKSB8IDBdIHwgMClcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MSArIHhTdGFydDIpIHwgMF0gfCAwKVxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyBvZmZzZXQgKyB1KSB8IDBdIHwgMClcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MiArIHhTdGFydDEpIHwgMF0gfCAwKVxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQyICsgeFN0YXJ0MikgfCAwXSB8IDApKSB8IDA7XG4gICAgICAgICAgICAgICAgaWYgKChzdW0gfCAwKSA9PSAoNSB8IDApKSB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlc1sob3V0SW1hZ2VQdHIgKyBvZmZzZXQgKyB1KSB8IDBdID0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZXNbKG91dEltYWdlUHRyICsgb2Zmc2V0ICsgdSkgfCAwXSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdWJ0cmFjdChhSW1hZ2VQdHIsIGJJbWFnZVB0ciwgb3V0SW1hZ2VQdHIpIHtcbiAgICAgICAgYUltYWdlUHRyID0gYUltYWdlUHRyIHwgMDtcbiAgICAgICAgYkltYWdlUHRyID0gYkltYWdlUHRyIHwgMDtcbiAgICAgICAgb3V0SW1hZ2VQdHIgPSBvdXRJbWFnZVB0ciB8IDA7XG5cbiAgICAgICAgdmFyIGxlbmd0aCA9IDA7XG5cbiAgICAgICAgbGVuZ3RoID0gaW11bChzaXplLCBzaXplKSB8IDA7XG5cbiAgICAgICAgd2hpbGUgKChsZW5ndGggfCAwKSA+IDApIHtcbiAgICAgICAgICAgIGxlbmd0aCA9IChsZW5ndGggLSAxKSB8IDA7XG4gICAgICAgICAgICBpbWFnZXNbKG91dEltYWdlUHRyICsgbGVuZ3RoKSB8IDBdID1cbiAgICAgICAgICAgICAgICAoKGltYWdlc1soYUltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCkgLSAoaW1hZ2VzWyhiSW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKSkgfCAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYml0d2lzZU9yKGFJbWFnZVB0ciwgYkltYWdlUHRyLCBvdXRJbWFnZVB0cikge1xuICAgICAgICBhSW1hZ2VQdHIgPSBhSW1hZ2VQdHIgfCAwO1xuICAgICAgICBiSW1hZ2VQdHIgPSBiSW1hZ2VQdHIgfCAwO1xuICAgICAgICBvdXRJbWFnZVB0ciA9IG91dEltYWdlUHRyIHwgMDtcblxuICAgICAgICB2YXIgbGVuZ3RoID0gMDtcblxuICAgICAgICBsZW5ndGggPSBpbXVsKHNpemUsIHNpemUpIHwgMDtcblxuICAgICAgICB3aGlsZSAoKGxlbmd0aCB8IDApID4gMCkge1xuICAgICAgICAgICAgbGVuZ3RoID0gKGxlbmd0aCAtIDEpIHwgMDtcbiAgICAgICAgICAgIGltYWdlc1sob3V0SW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gPVxuICAgICAgICAgICAgICAgICgoaW1hZ2VzWyhhSW1hZ2VQdHIgKyBsZW5ndGgpIHwgMF0gfCAwKSB8IChpbWFnZXNbKGJJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSB8IDApKSB8IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb3VudE5vblplcm8oaW1hZ2VQdHIpIHtcbiAgICAgICAgaW1hZ2VQdHIgPSBpbWFnZVB0ciB8IDA7XG5cbiAgICAgICAgdmFyIHN1bSA9IDAsXG4gICAgICAgICAgICBsZW5ndGggPSAwO1xuXG4gICAgICAgIGxlbmd0aCA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xuXG4gICAgICAgIHdoaWxlICgobGVuZ3RoIHwgMCkgPiAwKSB7XG4gICAgICAgICAgICBsZW5ndGggPSAobGVuZ3RoIC0gMSkgfCAwO1xuICAgICAgICAgICAgc3VtID0gKChzdW0gfCAwKSArIChpbWFnZXNbKGltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCkpIHwgMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoc3VtIHwgMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdChpbWFnZVB0ciwgdmFsdWUpIHtcbiAgICAgICAgaW1hZ2VQdHIgPSBpbWFnZVB0ciB8IDA7XG4gICAgICAgIHZhbHVlID0gdmFsdWUgfCAwO1xuXG4gICAgICAgIHZhciBsZW5ndGggPSAwO1xuXG4gICAgICAgIGxlbmd0aCA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xuXG4gICAgICAgIHdoaWxlICgobGVuZ3RoIHwgMCkgPiAwKSB7XG4gICAgICAgICAgICBsZW5ndGggPSAobGVuZ3RoIC0gMSkgfCAwO1xuICAgICAgICAgICAgaW1hZ2VzWyhpbWFnZVB0ciArIGxlbmd0aCkgfCAwXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlsYXRlKGluSW1hZ2VQdHIsIG91dEltYWdlUHRyKSB7XG4gICAgICAgIGluSW1hZ2VQdHIgPSBpbkltYWdlUHRyIHwgMDtcbiAgICAgICAgb3V0SW1hZ2VQdHIgPSBvdXRJbWFnZVB0ciB8IDA7XG5cbiAgICAgICAgdmFyIHYgPSAwLFxuICAgICAgICAgICAgdSA9IDAsXG4gICAgICAgICAgICBzdW0gPSAwLFxuICAgICAgICAgICAgeVN0YXJ0MSA9IDAsXG4gICAgICAgICAgICB5U3RhcnQyID0gMCxcbiAgICAgICAgICAgIHhTdGFydDEgPSAwLFxuICAgICAgICAgICAgeFN0YXJ0MiA9IDAsXG4gICAgICAgICAgICBvZmZzZXQgPSAwO1xuXG4gICAgICAgIGZvciAodiA9IDE7ICh2IHwgMCkgPCAoKHNpemUgLSAxKSB8IDApOyB2ID0gKHYgKyAxKSB8IDApIHtcbiAgICAgICAgICAgIG9mZnNldCA9IChvZmZzZXQgKyBzaXplKSB8IDA7XG4gICAgICAgICAgICBmb3IgKHUgPSAxOyAodSB8IDApIDwgKChzaXplIC0gMSkgfCAwKTsgdSA9ICh1ICsgMSkgfCAwKSB7XG4gICAgICAgICAgICAgICAgeVN0YXJ0MSA9IChvZmZzZXQgLSBzaXplKSB8IDA7XG4gICAgICAgICAgICAgICAgeVN0YXJ0MiA9IChvZmZzZXQgKyBzaXplKSB8IDA7XG4gICAgICAgICAgICAgICAgeFN0YXJ0MSA9ICh1IC0gMSkgfCAwO1xuICAgICAgICAgICAgICAgIHhTdGFydDIgPSAodSArIDEpIHwgMDtcbiAgICAgICAgICAgICAgICBzdW0gPSAoKGltYWdlc1soaW5JbWFnZVB0ciArIHlTdGFydDEgKyB4U3RhcnQxKSB8IDBdIHwgMClcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MSArIHhTdGFydDIpIHwgMF0gfCAwKVxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyBvZmZzZXQgKyB1KSB8IDBdIHwgMClcbiAgICAgICAgICAgICAgICAgICAgKyAoaW1hZ2VzWyhpbkltYWdlUHRyICsgeVN0YXJ0MiArIHhTdGFydDEpIHwgMF0gfCAwKVxuICAgICAgICAgICAgICAgICAgICArIChpbWFnZXNbKGluSW1hZ2VQdHIgKyB5U3RhcnQyICsgeFN0YXJ0MikgfCAwXSB8IDApKSB8IDA7XG4gICAgICAgICAgICAgICAgaWYgKChzdW0gfCAwKSA+ICgwIHwgMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzWyhvdXRJbWFnZVB0ciArIG9mZnNldCArIHUpIHwgMF0gPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlc1sob3V0SW1hZ2VQdHIgKyBvZmZzZXQgKyB1KSB8IDBdID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1lbWNweShzcmNJbWFnZVB0ciwgZHN0SW1hZ2VQdHIpIHtcbiAgICAgICAgc3JjSW1hZ2VQdHIgPSBzcmNJbWFnZVB0ciB8IDA7XG4gICAgICAgIGRzdEltYWdlUHRyID0gZHN0SW1hZ2VQdHIgfCAwO1xuXG4gICAgICAgIHZhciBsZW5ndGggPSAwO1xuXG4gICAgICAgIGxlbmd0aCA9IGltdWwoc2l6ZSwgc2l6ZSkgfCAwO1xuXG4gICAgICAgIHdoaWxlICgobGVuZ3RoIHwgMCkgPiAwKSB7XG4gICAgICAgICAgICBsZW5ndGggPSAobGVuZ3RoIC0gMSkgfCAwO1xuICAgICAgICAgICAgaW1hZ2VzWyhkc3RJbWFnZVB0ciArIGxlbmd0aCkgfCAwXSA9IChpbWFnZXNbKHNyY0ltYWdlUHRyICsgbGVuZ3RoKSB8IDBdIHwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB6ZXJvQm9yZGVyKGltYWdlUHRyKSB7XG4gICAgICAgIGltYWdlUHRyID0gaW1hZ2VQdHIgfCAwO1xuXG4gICAgICAgIHZhciB4ID0gMCxcbiAgICAgICAgICAgIHkgPSAwO1xuXG4gICAgICAgIGZvciAoeCA9IDA7ICh4IHwgMCkgPCAoKHNpemUgLSAxKSB8IDApOyB4ID0gKHggKyAxKSB8IDApIHtcbiAgICAgICAgICAgIGltYWdlc1soaW1hZ2VQdHIgKyB4KSB8IDBdID0gMDtcbiAgICAgICAgICAgIGltYWdlc1soaW1hZ2VQdHIgKyB5KSB8IDBdID0gMDtcbiAgICAgICAgICAgIHkgPSAoKHkgKyBzaXplKSAtIDEpIHwgMDtcbiAgICAgICAgICAgIGltYWdlc1soaW1hZ2VQdHIgKyB5KSB8IDBdID0gMDtcbiAgICAgICAgICAgIHkgPSAoeSArIDEpIHwgMDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHggPSAwOyAoeCB8IDApIDwgKHNpemUgfCAwKTsgeCA9ICh4ICsgMSkgfCAwKSB7XG4gICAgICAgICAgICBpbWFnZXNbKGltYWdlUHRyICsgeSkgfCAwXSA9IDA7XG4gICAgICAgICAgICB5ID0gKHkgKyAxKSB8IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBza2VsZXRvbml6ZSgpIHtcbiAgICAgICAgdmFyIHN1YkltYWdlUHRyID0gMCxcbiAgICAgICAgICAgIGVyb2RlZEltYWdlUHRyID0gMCxcbiAgICAgICAgICAgIHRlbXBJbWFnZVB0ciA9IDAsXG4gICAgICAgICAgICBza2VsSW1hZ2VQdHIgPSAwLFxuICAgICAgICAgICAgc3VtID0gMCxcbiAgICAgICAgICAgIGRvbmUgPSAwO1xuXG4gICAgICAgIGVyb2RlZEltYWdlUHRyID0gaW11bChzaXplLCBzaXplKSB8IDA7XG4gICAgICAgIHRlbXBJbWFnZVB0ciA9IChlcm9kZWRJbWFnZVB0ciArIGVyb2RlZEltYWdlUHRyKSB8IDA7XG4gICAgICAgIHNrZWxJbWFnZVB0ciA9ICh0ZW1wSW1hZ2VQdHIgKyBlcm9kZWRJbWFnZVB0cikgfCAwO1xuXG4gICAgICAgIC8vIGluaXQgc2tlbC1pbWFnZVxuICAgICAgICBpbml0KHNrZWxJbWFnZVB0ciwgMCk7XG4gICAgICAgIHplcm9Cb3JkZXIoc3ViSW1hZ2VQdHIpO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGVyb2RlKHN1YkltYWdlUHRyLCBlcm9kZWRJbWFnZVB0cik7XG4gICAgICAgICAgICBkaWxhdGUoZXJvZGVkSW1hZ2VQdHIsIHRlbXBJbWFnZVB0cik7XG4gICAgICAgICAgICBzdWJ0cmFjdChzdWJJbWFnZVB0ciwgdGVtcEltYWdlUHRyLCB0ZW1wSW1hZ2VQdHIpO1xuICAgICAgICAgICAgYml0d2lzZU9yKHNrZWxJbWFnZVB0ciwgdGVtcEltYWdlUHRyLCBza2VsSW1hZ2VQdHIpO1xuICAgICAgICAgICAgbWVtY3B5KGVyb2RlZEltYWdlUHRyLCBzdWJJbWFnZVB0cik7XG4gICAgICAgICAgICBzdW0gPSBjb3VudE5vblplcm8oc3ViSW1hZ2VQdHIpIHwgMDtcbiAgICAgICAgICAgIGRvbmUgPSAoKHN1bSB8IDApID09IDAgfCAwKTtcbiAgICAgICAgfSB3aGlsZSAoIWRvbmUpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHNrZWxldG9uaXplOiBza2VsZXRvbml6ZVxuICAgIH07XG59XG5leHBvcnQgZGVmYXVsdCBTa2VsZXRvbml6ZXI7XG4vKiBlc2xpbnQtZW5hYmxlIGVxZXFlcSAqL1xuIiwiaW1wb3J0IHsgSW1hZ2VXcmFwcGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9pbWFnZS13cmFwcGVyXCI7XG5cbi8qKlxuICogQGJvcnJvd3MgaHR0cDovL3d3dy5jb2RlcHJvamVjdC5jb20vVGlwcy80MDcxNzIvQ29ubmVjdGVkLUNvbXBvbmVudC1MYWJlbGluZy1hbmQtVmVjdG9yaXphdGlvblxuICovXG5cbnR5cGUgRGlyZWN0aW9uID0gbnVtYmVyO1xuXG5leHBvcnQgY29uc3QgU2VhcmNoRGlyZWN0aW9uczogQXJyYXk8QXJyYXk8RGlyZWN0aW9uPj4gPSBbWzAsIDFdLCBbMSwgMV0sIFsxLCAwXSwgWzEsIC0xXSwgWzAsIC0xXSwgWy0xLCAtMV0sIFstMSwgMF0sIFstMSwgMV1dO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbnRvdXJWZXJ0ZXgge1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgZGlyOiBEaXJlY3Rpb24sXG4gICAgbmV4dDogQ29udG91clZlcnRleCxcbiAgICBwcmV2OiBDb250b3VyVmVydGV4XG59XG5cbmludGVyZmFjZSBDdXJyZW50IHtcbiAgICBjeDogbnVtYmVyLFxuICAgIGN5OiBudW1iZXIsXG4gICAgZGlyOiBEaXJlY3Rpb25cbn1cblxuZXhwb3J0IGNsYXNzIFRyYWNlciB7XG4gICAgcHJpdmF0ZSBfaW1hZ2VEYXRhOiBVaW50OEFycmF5O1xuICAgIHByaXZhdGUgX2xhYmVsRGF0YTogQXJyYXk8bnVtYmVyPjtcbiAgICBwcml2YXRlIF93aWR0aDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoaW1hZ2VXcmFwcGVyOiBJbWFnZVdyYXBwZXIsIGxhYmVsV3JhcHBlcjogSW1hZ2VXcmFwcGVyPEFycmF5PG51bWJlcj4+KSB7XG4gICAgICAgIHRoaXMuX2ltYWdlRGF0YSA9IGltYWdlV3JhcHBlci5kYXRhO1xuICAgICAgICB0aGlzLl9sYWJlbERhdGEgPSBsYWJlbFdyYXBwZXIuZGF0YSBhcyBBcnJheTxudW1iZXI+O1xuICAgICAgICB0aGlzLl93aWR0aCA9IGltYWdlV3JhcHBlci5zaXplLng7XG4gICAgfVxuXG4gICAgdHJhY2UoY3VycmVudDogQ3VycmVudCwgY29sb3I6IG51bWJlciwgbGFiZWw6IG51bWJlciwgZWRnZUxhYmVsOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBjdXJyZW50LmN5ICsgU2VhcmNoRGlyZWN0aW9uc1tjdXJyZW50LmRpcl1bMF0gfCAwO1xuICAgICAgICAgICAgY29uc3QgeCA9IGN1cnJlbnQuY3ggKyBTZWFyY2hEaXJlY3Rpb25zW2N1cnJlbnQuZGlyXVsxXSB8IDA7XG4gICAgICAgICAgICBjb25zdCBwb3MgPSB5ICogdGhpcy5fd2lkdGggKyB4IHwgMDtcblxuICAgICAgICAgICAgaWYgKCh0aGlzLl9pbWFnZURhdGFbcG9zXSA9PT0gY29sb3IpICYmICgodGhpcy5fbGFiZWxEYXRhW3Bvc10gPT09IDApIHx8ICh0aGlzLl9sYWJlbERhdGFbcG9zXSA9PT0gbGFiZWwpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsRGF0YVtwb3NdID0gbGFiZWw7XG4gICAgICAgICAgICAgICAgY3VycmVudC5jeCA9IHg7XG4gICAgICAgICAgICAgICAgY3VycmVudC5jeSA9IHk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xhYmVsRGF0YVtwb3NdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsRGF0YVtwb3NdID0gZWRnZUxhYmVsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdXJyZW50LmRpciA9IChjdXJyZW50LmRpciArIDEpICUgODtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb250b3VyVHJhY2luZyhzeTogbnVtYmVyLCBzeDogbnVtYmVyLCBsYWJlbDogbnVtYmVyLCBjb2xvcjogbnVtYmVyLCBlZGdlTGFiZWw6IG51bWJlcik6IENvbnRvdXJWZXJ0ZXgge1xuICAgICAgICBsZXQgRnY6IENvbnRvdXJWZXJ0ZXggPSBudWxsO1xuICAgICAgICBjb25zdCBjdXJyZW50OiBDdXJyZW50ID0ge1xuICAgICAgICAgICAgY3g6IHN4LFxuICAgICAgICAgICAgY3k6IHN5LFxuICAgICAgICAgICAgZGlyOiAwXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMudHJhY2UoY3VycmVudCwgY29sb3IsIGxhYmVsLCBlZGdlTGFiZWwpKSB7XG4gICAgICAgICAgICBGdiA9IHtcbiAgICAgICAgICAgICAgICB4OiBzeCxcbiAgICAgICAgICAgICAgICB5OiBzeSxcbiAgICAgICAgICAgICAgICBkaXI6IGN1cnJlbnQuZGlyLFxuICAgICAgICAgICAgICAgIG5leHQ6IG51bGwsXG4gICAgICAgICAgICAgICAgcHJldjogbnVsbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxldCBDdiA9IEZ2O1xuICAgICAgICAgICAgbGV0IGxkaXIgPSBjdXJyZW50LmRpcjtcbiAgICAgICAgICAgIGxldCBQID0ge1xuICAgICAgICAgICAgICAgIHg6IGN1cnJlbnQuY3gsXG4gICAgICAgICAgICAgICAgeTogY3VycmVudC5jeSxcbiAgICAgICAgICAgICAgICBkaXI6IDAsXG4gICAgICAgICAgICAgICAgbmV4dDogbnVsbCxcbiAgICAgICAgICAgICAgICBwcmV2OiBDdlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIEN2Lm5leHQgPSBQO1xuICAgICAgICAgICAgQ3YgPSBQO1xuXG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgY3VycmVudC5kaXIgPSAoY3VycmVudC5kaXIgKyA2KSAlIDg7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNlKGN1cnJlbnQsIGNvbG9yLCBsYWJlbCwgZWRnZUxhYmVsKTtcblxuICAgICAgICAgICAgICAgIGlmIChsZGlyICE9PSBjdXJyZW50LmRpcikge1xuICAgICAgICAgICAgICAgICAgICBDdi5kaXIgPSBjdXJyZW50LmRpcjtcbiAgICAgICAgICAgICAgICAgICAgUCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGN1cnJlbnQuY3gsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBjdXJyZW50LmN5LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlyOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXY6IEN2XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIEN2Lm5leHQgPSBQO1xuICAgICAgICAgICAgICAgICAgICBDdiA9IFA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgQ3YuZGlyID0gbGRpcjtcbiAgICAgICAgICAgICAgICAgICAgQ3YueCA9IGN1cnJlbnQuY3g7XG4gICAgICAgICAgICAgICAgICAgIEN2LnkgPSBjdXJyZW50LmN5O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxkaXIgPSBjdXJyZW50LmRpcjtcbiAgICAgICAgICAgIH0gd2hpbGUgKGN1cnJlbnQuY3ggIT09IHN4IHx8IGN1cnJlbnQuY3kgIT09IHN5KTtcblxuICAgICAgICAgICAgRnYucHJldiA9IEN2LnByZXY7XG4gICAgICAgICAgICBDdi5wcmV2Lm5leHQgPSBGdjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRnY7XG4gICAgfVxufVxuIiwiaW1wb3J0IF9wb2x5ZmlsbHMgZnJvbSAnLi9jb21tb24vcG9seWZpbGxzJztcbmltcG9ydCB7IFJlc3VsdENvbGxlY3RvciB9IGZyb20gJy4vYW5hbHl0aWNzL3Jlc3VsdC1jb2xsZWN0b3InO1xuaW1wb3J0IHsgQm94IH0gZnJvbSAnLi9jb21tb24vYm94JztcbmltcG9ydCB7IEV2ZW50Q2FsbGJhY2ssIEV2ZW50cywgRXZlbnRTdWJzY3JpcHRpb24gfSBmcm9tICcuL2NvbW1vbi9ldmVudHMnO1xuaW1wb3J0IHsgSW1hZ2VEZWJ1ZyB9IGZyb20gJy4vY29tbW9uL2ltYWdlLWRlYnVnJztcbmltcG9ydCB7IEltYWdlV3JhcHBlciB9IGZyb20gJy4vY29tbW9uL2ltYWdlLXdyYXBwZXInO1xuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICcuL2NvbW1vbi9tZXJnZSc7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4vY29tbW9uL3BvaW50JztcbmltcG9ydCB7IGNvbmZpZyBhcyBkZWZhdWx0Q29uZmlnLCBRdWFnZ2FDb25maWcgfSBmcm9tICcuL2NvbmZpZy9jb25maWcnO1xuaW1wb3J0IHsgQmFyY29kZURlY29kZXIsIFF1YWdnYUJhcmNvZGUgfSBmcm9tICcuL2RlY29kZXIvYmFyY29kZS1kZWNvZGVyJztcbmltcG9ydCB7IENhbWVyYUFjY2VzcyB9IGZyb20gJy4vaW5wdXQvY2FtZXJhLWFjY2Vzcyc7XG5pbXBvcnQgeyBGcmFtZUdyYWJiZXIgfSBmcm9tICcuL2lucHV0L2ZyYW1lLWdyYWJiZXInO1xuaW1wb3J0IHsgSW1hZ2VTdHJlYW0gfSBmcm9tICcuL2lucHV0L2ltYWdlLXN0cmVhbSc7XG5pbXBvcnQgeyBJbnB1dFN0cmVhbSB9IGZyb20gJy4vaW5wdXQvaW5wdXQtc3RyZWFtJztcbmltcG9ydCB7IExpdmVTdHJlYW0gfSBmcm9tICcuL2lucHV0L2xpdmUtc3RyZWFtJztcbmltcG9ydCB7IFZpZGVvU3RyZWFtIH0gZnJvbSAnLi9pbnB1dC92aWRlby1zdHJlYW0nO1xuaW1wb3J0IHsgY2hlY2tJbWFnZUNvbnN0cmFpbnRzIH0gZnJvbSAnLi9pbnB1dC9pbnB1dC1zdHJlYW0tdXRpbHMnO1xuaW1wb3J0IHsgQmFyY29kZUxvY2F0b3IgfSBmcm9tICcuL2xvY2F0b3IvYmFyY29kZS1sb2NhdG9yJztcbmltcG9ydCB7IEJhcmNvZGVSZWFkZXJEZWNsYXJhdGlvbiB9IGZyb20gJy4vcmVhZGVyL2JhcmNvZGUtcmVhZGVyJztcblxuaW50ZXJmYWNlIFdvcmtlclRocmVhZCB7XG4gICAgd29ya2VyOiBXb3JrZXI7XG4gICAgaW1hZ2VEYXRhOiBVaW50OEFycmF5O1xuICAgIGJ1c3k6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUXVhZ2dhQ2FudmFzQ29udGFpbmVyIHtcbiAgICBjdHg6IHtcbiAgICAgICAgaW1hZ2U6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcbiAgICAgICAgb3ZlcmxheTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXG4gICAgfSxcbiAgICBkb206IHtcbiAgICAgICAgaW1hZ2U6IEhUTUxDYW52YXNFbGVtZW50LFxuICAgICAgICBvdmVybGF5OiBIVE1MQ2FudmFzRWxlbWVudFxuICAgIH1cbn1cblxubGV0IF9pbnB1dFN0cmVhbTogSW5wdXRTdHJlYW07XG5sZXQgX2ZyYW1lR3JhYmJlcjogRnJhbWVHcmFiYmVyO1xubGV0IF9zdG9wcGVkOiBib29sZWFuO1xuY29uc3QgX2NhbnZhc0NvbnRhaW5lcjogUXVhZ2dhQ2FudmFzQ29udGFpbmVyID0ge1xuICAgIGN0eDoge1xuICAgICAgICBpbWFnZTogbnVsbCxcbiAgICAgICAgb3ZlcmxheTogbnVsbFxuICAgIH0sXG4gICAgZG9tOiB7XG4gICAgICAgIGltYWdlOiBudWxsLFxuICAgICAgICBvdmVybGF5OiBudWxsXG4gICAgfVxufTtcbmxldCBfaW5wdXRJbWFnZVdyYXBwZXI6IEltYWdlV3JhcHBlcjtcbmxldCBfbG9jYXRvcjogQmFyY29kZUxvY2F0b3I7XG5sZXQgX2JveFNpemU6IEJveDtcbmxldCBfZGVjb2RlcjogQmFyY29kZURlY29kZXI7XG5sZXQgX3dvcmtlclBvb2wgPSBuZXcgQXJyYXk8V29ya2VyVGhyZWFkPigpO1xubGV0IF9vblVJVGhyZWFkOiBib29sZWFuO1xubGV0IF9yZXN1bHRDb2xsZWN0b3I6IFJlc3VsdENvbGxlY3RvcjtcbmxldCBfY29uZmlnOiBRdWFnZ2FDb25maWc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbml0KGNvbmZpZzogUXVhZ2dhQ29uZmlnLCBjYjogKCkgPT4gdm9pZCwgaW1hZ2VXcmFwcGVyPzogSW1hZ2VXcmFwcGVyKSB7XG4gICAgICAgIF9vblVJVGhyZWFkID0gdHJ1ZTtcbiAgICAgICAgX2NvbmZpZyA9IG1lcmdlKGRlZmF1bHRDb25maWcsIGNvbmZpZyk7XG4gICAgICAgIGlmIChpbWFnZVdyYXBwZXIpIHtcbiAgICAgICAgICAgIF9vblVJVGhyZWFkID0gZmFsc2U7XG4gICAgICAgICAgICBfaW5pdGlhbGl6ZURhdGEoaW1hZ2VXcmFwcGVyKTtcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfaW5pdElucHV0U3RyZWFtKGNiKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBDYW1lcmFBY2Nlc3M6IENhbWVyYUFjY2VzcyxcblxuICAgIEltYWdlRGVidWc6IEltYWdlRGVidWcsXG5cbiAgICBJbWFnZVdyYXBwZXI6IEltYWdlV3JhcHBlcixcblxuICAgIFJlc3VsdENvbGxlY3RvcjogUmVzdWx0Q29sbGVjdG9yLFxuXG4gICAgZ2V0IGNhbnZhcygpOiBRdWFnZ2FDYW52YXNDb250YWluZXIge1xuICAgICAgICByZXR1cm4gX2NhbnZhc0NvbnRhaW5lcjtcbiAgICB9LFxuXG4gICAgc3RhcnQoKTogdm9pZCB7XG4gICAgICAgIGlmIChfb25VSVRocmVhZCAmJiBfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09ICdMaXZlU3RyZWFtJykge1xuICAgICAgICAgICAgX3N0YXJ0Q29udGludW91c1VwZGF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3VwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0b3AoKTogdm9pZCB7XG4gICAgICAgIF9zdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgX2FkanVzdFdvcmtlclBvb2woMCk7XG4gICAgICAgIGlmIChfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09ICdMaXZlU3RyZWFtJykge1xuICAgICAgICAgICAgQ2FtZXJhQWNjZXNzLnJlbGVhc2UoKTtcbiAgICAgICAgICAgIF9pbnB1dFN0cmVhbS5jbGVhckV2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkZWNvZGVTaW5nbGUoY29uZmlnOiBRdWFnZ2FDb25maWcsIHJlc3VsdENhbGxiYWNrOiAoXzogUXVhZ2dhQmFyY29kZSkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICBjb25maWcgPSBtZXJnZSh7XG4gICAgICAgICAgICBpbnB1dFN0cmVhbToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdJbWFnZVN0cmVhbScsXG4gICAgICAgICAgICAgICAgc2VxdWVuY2U6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNpemU6IDgwMCxcbiAgICAgICAgICAgICAgICBzcmM6IGNvbmZpZy5zcmNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBudW1PZldvcmtlcnM6IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGNvbmZpZy5kZWJ1ZykgPyAwIDogMSxcbiAgICAgICAgICAgIGxvY2F0b3I6IHtcbiAgICAgICAgICAgICAgICBoYWxmU2FtcGxlOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjb25maWcpO1xuXG4gICAgICAgIHRoaXMuaW5pdChjb25maWcsICgpID0+IHtcbiAgICAgICAgICAgIEV2ZW50cy5vbmNlKCdwcm9jZXNzZWQnLCAocmVzdWx0OiBRdWFnZ2FCYXJjb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0Q2FsbGJhY2suY2FsbChudWxsLCByZXN1bHQpO1xuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBwYXVzZSgpOiB2b2lkIHtcbiAgICAgICAgX3N0b3BwZWQgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBvbkRldGVjdGVkKGNhbGxiYWNrOiBFdmVudFN1YnNjcmlwdGlvbiB8IEV2ZW50Q2FsbGJhY2spOiB2b2lkIHtcbiAgICAgICAgRXZlbnRzLnN1YnNjcmliZSgnZGV0ZWN0ZWQnLCBjYWxsYmFjayk7XG4gICAgfSxcblxuICAgIG9mZkRldGVjdGVkKGNhbGxiYWNrOiBFdmVudENhbGxiYWNrKTogdm9pZCB7XG4gICAgICAgIEV2ZW50cy51bnN1YnNjcmliZSgnZGV0ZWN0ZWQnLCBjYWxsYmFjayk7XG4gICAgfSxcblxuICAgIG9uUHJvY2Vzc2VkKGNhbGxiYWNrOiBFdmVudFN1YnNjcmlwdGlvbiB8IEV2ZW50Q2FsbGJhY2spOiB2b2lkIHtcbiAgICAgICAgRXZlbnRzLnN1YnNjcmliZSgncHJvY2Vzc2VkJywgY2FsbGJhY2spO1xuICAgIH0sXG5cbiAgICBvZmZQcm9jZXNzZWQoY2FsbGJhY2s6IEV2ZW50Q2FsbGJhY2spOiB2b2lkIHtcbiAgICAgICAgRXZlbnRzLnVuc3Vic2NyaWJlKCdwcm9jZXNzZWQnLCBjYWxsYmFjayk7XG4gICAgfSxcblxuICAgIHNldFJlYWRlcnMocmVhZGVyczogQXJyYXk8QmFyY29kZVJlYWRlckRlY2xhcmF0aW9uPik6IHZvaWQge1xuICAgICAgICBpZiAoX2RlY29kZXIpIHtcbiAgICAgICAgICAgIF9kZWNvZGVyLnNldFJlYWRlcnMocmVhZGVycyk7XG4gICAgICAgIH0gZWxzZSBpZiAoX29uVUlUaHJlYWQgJiYgX3dvcmtlclBvb2wubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgX3dvcmtlclBvb2wuZm9yRWFjaCgoeyB3b3JrZXIgfSkgPT4gd29ya2VyLnBvc3RNZXNzYWdlKHsgY21kOiAnc2V0UmVhZGVycycsIHJlYWRlcnMgfSkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlZ2lzdGVyUmVzdWx0Q29sbGVjdG9yKHJlc3VsdENvbGxlY3RvcjogUmVzdWx0Q29sbGVjdG9yKTogdm9pZCB7XG4gICAgICAgIGlmIChyZXN1bHRDb2xsZWN0b3IgJiYgdHlwZW9mIHJlc3VsdENvbGxlY3Rvci5hZGRSZXN1bHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIF9yZXN1bHRDb2xsZWN0b3IgPSByZXN1bHRDb2xsZWN0b3I7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5mdW5jdGlvbiBfaW5pdGlhbGl6ZURhdGEoaW1hZ2VXcmFwcGVyPzogSW1hZ2VXcmFwcGVyKTogdm9pZCB7XG4gICAgX2luaXRCdWZmZXJzKGltYWdlV3JhcHBlcik7XG4gICAgX2RlY29kZXIgPSBuZXcgQmFyY29kZURlY29kZXIoX2NvbmZpZy5kZWNvZGVyLCBfaW5wdXRJbWFnZVdyYXBwZXIpO1xufVxuXG5mdW5jdGlvbiBfaW5pdElucHV0U3RyZWFtKGNhbGxiYWNrOiAoZXJyPzogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgbGV0IHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50O1xuICAgIGlmIChfY29uZmlnLmlucHV0U3RyZWFtLnR5cGUgPT09ICdWaWRlb1N0cmVhbScpIHtcbiAgICAgICAgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgICBfaW5wdXRTdHJlYW0gPSBuZXcgVmlkZW9TdHJlYW0odmlkZW8pO1xuICAgIH0gZWxzZSBpZiAoX2NvbmZpZy5pbnB1dFN0cmVhbS50eXBlID09PSAnSW1hZ2VTdHJlYW0nKSB7XG4gICAgICAgIF9pbnB1dFN0cmVhbSA9IG5ldyBJbWFnZVN0cmVhbSgpO1xuICAgIH0gZWxzZSBpZiAoX2NvbmZpZy5pbnB1dFN0cmVhbS50eXBlID09PSAnTGl2ZVN0cmVhbScpIHtcbiAgICAgICAgY29uc3Qgdmlld3BvcnQgPSBfZ2V0Vmlld1BvcnQoKTtcbiAgICAgICAgaWYgKHZpZXdwb3J0KSB7XG4gICAgICAgICAgICB2aWRlbyA9IHZpZXdwb3J0LnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XG4gICAgICAgICAgICBpZiAoIXZpZGVvKSB7XG4gICAgICAgICAgICAgICAgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgICAgICAgICAgIHZpZXdwb3J0LmFwcGVuZENoaWxkKHZpZGVvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfaW5wdXRTdHJlYW0gPSBuZXcgTGl2ZVN0cmVhbSh2aWRlbyk7XG4gICAgICAgIENhbWVyYUFjY2Vzcy5yZXF1ZXN0KHZpZGVvLCBfY29uZmlnLmlucHV0U3RyZWFtLmNvbnN0cmFpbnRzKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gX2lucHV0U3RyZWFtLnRyaWdnZXIoJ2NhbnJlY29yZCcpLCBlcnIgPT4gY2FsbGJhY2soZXJyKSk7XG4gICAgfVxuXG4gICAgX2lucHV0U3RyZWFtLnNldEF0dHJpYnV0ZSgncHJlbG9hZCcsICdhdXRvJyk7XG4gICAgX2lucHV0U3RyZWFtLmNvbmZpZyA9IF9jb25maWcuaW5wdXRTdHJlYW07XG4gICAgX2lucHV0U3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnJlY29yZCcsIF9jYW5SZWNvcmQuYmluZCh0aGlzLCBjYWxsYmFjaykpO1xufVxuXG5mdW5jdGlvbiBfZ2V0Vmlld1BvcnQoKTogSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0IHRhcmdldCA9IF9jb25maWcuaW5wdXRTdHJlYW0udGFyZ2V0O1xuICAgIC8vIENoZWNrIGlmIHRhcmdldCBpcyBhbHJlYWR5IGEgRE9NIGVsZW1lbnRcbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBVc2UgJyNpbnRlcmFjdGl2ZS52aWV3cG9ydCcgYXMgYSBmYWxsYmFjayBzZWxlY3RvciAoYmFja3dhcmRzIGNvbXBhdGliaWxpdHkpXG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gdHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycgPyB0YXJnZXQgOiAnI2ludGVyYWN0aXZlLnZpZXdwb3J0JztcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gX2NhblJlY29yZChjYjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIGNoZWNrSW1hZ2VDb25zdHJhaW50cyhfaW5wdXRTdHJlYW0sIF9jb25maWcubG9jYXRvcik7XG4gICAgX2luaXRDYW52YXMoKTtcbiAgICBfZnJhbWVHcmFiYmVyID0gbmV3IEZyYW1lR3JhYmJlcihfaW5wdXRTdHJlYW0sIF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlKTtcblxuICAgIF9hZGp1c3RXb3JrZXJQb29sKF9jb25maWcubnVtT2ZXb3JrZXJzLCAoKSA9PiB7XG4gICAgICAgIGlmIChfY29uZmlnLm51bU9mV29ya2VycyA9PT0gMCkge1xuICAgICAgICAgICAgX2luaXRpYWxpemVEYXRhKCk7XG4gICAgICAgIH1cblxuICAgICAgICBfaW5wdXRTdHJlYW0ucGxheSgpO1xuICAgICAgICBjYigpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBfaW5pdENhbnZhcygpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zdCB2aWV3cG9ydCA9IF9nZXRWaWV3UG9ydCgpO1xuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcy5pbWdCdWZmZXInKTtcbiAgICAgICAgaWYgKCFfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZSkge1xuICAgICAgICAgICAgX2NhbnZhc0NvbnRhaW5lci5kb20uaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlLmNsYXNzTmFtZSA9ICdpbWdCdWZmZXInO1xuICAgICAgICAgICAgaWYgKHZpZXdwb3J0ICYmIF9jb25maWcuaW5wdXRTdHJlYW0udHlwZSA9PT0gJ0ltYWdlU3RyZWFtJykge1xuICAgICAgICAgICAgICAgIHZpZXdwb3J0LmFwcGVuZENoaWxkKF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmN0eC5pbWFnZSA9IF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLmltYWdlLndpZHRoID0gX2lucHV0U3RyZWFtLmNhbnZhc1dpZHRoO1xuICAgICAgICBfY2FudmFzQ29udGFpbmVyLmRvbS5pbWFnZS5oZWlnaHQgPSBfaW5wdXRTdHJlYW0uY2FudmFzSGVpZ2h0O1xuXG4gICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMuZHJhd2luZ0J1ZmZlcicpO1xuICAgICAgICBpZiAoIV9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkpIHtcbiAgICAgICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkuY2xhc3NOYW1lID0gJ2RyYXdpbmdCdWZmZXInO1xuICAgICAgICAgICAgaWYgKHZpZXdwb3J0KSB7XG4gICAgICAgICAgICAgICAgdmlld3BvcnQuYXBwZW5kQ2hpbGQoX2NhbnZhc0NvbnRhaW5lci5kb20ub3ZlcmxheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjbGVhckZpeCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJyk7XG4gICAgICAgICAgICBjbGVhckZpeC5zZXRBdHRyaWJ1dGUoJ2NsZWFyJywgJ2FsbCcpO1xuICAgICAgICAgICAgaWYgKHZpZXdwb3J0KSB7XG4gICAgICAgICAgICAgICAgdmlld3BvcnQuYXBwZW5kQ2hpbGQoY2xlYXJGaXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9jYW52YXNDb250YWluZXIuY3R4Lm92ZXJsYXkgPSBfY2FudmFzQ29udGFpbmVyLmRvbS5vdmVybGF5LmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkud2lkdGggPSBfaW5wdXRTdHJlYW0uY2FudmFzV2lkdGg7XG4gICAgICAgIF9jYW52YXNDb250YWluZXIuZG9tLm92ZXJsYXkuaGVpZ2h0ID0gX2lucHV0U3RyZWFtLmNhbnZhc0hlaWdodDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIF9pbml0QnVmZmVycyhpbWFnZVdyYXBwZXI/OiBJbWFnZVdyYXBwZXIpOiB2b2lkIHtcbiAgICBpZiAoaW1hZ2VXcmFwcGVyKSB7XG4gICAgICAgIF9pbnB1dEltYWdlV3JhcHBlciA9IGltYWdlV3JhcHBlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBfaW5wdXRJbWFnZVdyYXBwZXIgPSBuZXcgSW1hZ2VXcmFwcGVyKHtcbiAgICAgICAgICAgIHg6IF9pbnB1dFN0cmVhbS53aWR0aCxcbiAgICAgICAgICAgIHk6IF9pbnB1dFN0cmVhbS5oZWlnaHRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgY29uc29sZS5sb2coX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUpO1xuICAgIH1cbiAgICBfYm94U2l6ZSA9IFtcbiAgICAgICAgeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgIHsgeDogMCwgeTogX2lucHV0SW1hZ2VXcmFwcGVyLnNpemUueSB9LFxuICAgICAgICB7IHg6IF9pbnB1dEltYWdlV3JhcHBlci5zaXplLngsIHk6IF9pbnB1dEltYWdlV3JhcHBlci5zaXplLnkgfSxcbiAgICAgICAgeyB4OiBfaW5wdXRJbWFnZVdyYXBwZXIuc2l6ZS54LCB5OiAwIH1cbiAgICBdO1xuICAgIF9sb2NhdG9yID0gbmV3IEJhcmNvZGVMb2NhdG9yKF9pbnB1dEltYWdlV3JhcHBlciwgX2NvbmZpZy5sb2NhdG9yKTtcbn1cblxuZnVuY3Rpb24gX3RyYW5zZm9ybShwb2x5Z29uOiBSZWFkb25seUFycmF5PFBvaW50Piwgb2Zmc2V0OiBQb2ludCk6IHZvaWQge1xuICAgIHBvbHlnb24uZm9yRWFjaCh2ZXJ0ZXggPT4ge1xuICAgICAgICB2ZXJ0ZXgueCArPSBvZmZzZXQueDtcbiAgICAgICAgdmVydGV4LnkgKz0gb2Zmc2V0Lnk7XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gX3RyYW5zZm9ybVJlc3VsdChyZXN1bHQ6IFF1YWdnYUJhcmNvZGUsIG9mZnNldDogUG9pbnQpOiB2b2lkIHtcbiAgICBpZiAocmVzdWx0LmJhcmNvZGVzKSB7XG4gICAgICAgIHJlc3VsdC5iYXJjb2Rlcy5mb3JFYWNoKGJhcmNvZGUgPT4gX3RyYW5zZm9ybVJlc3VsdChiYXJjb2RlLCBvZmZzZXQpKTtcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0LmxpbmUpIHtcbiAgICAgICAgX3RyYW5zZm9ybShyZXN1bHQubGluZSwgb2Zmc2V0KTtcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0LmJveCkge1xuICAgICAgICBfdHJhbnNmb3JtKHJlc3VsdC5ib3gsIG9mZnNldCk7XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdC5ib3hlcykge1xuICAgICAgICByZXN1bHQuYm94ZXMuZm9yRWFjaChib3ggPT4gX3RyYW5zZm9ybShib3gsIG9mZnNldCkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gX2FkZFJlc3VsdChyZXN1bHQ6IFF1YWdnYUJhcmNvZGUsIGltYWdlRGF0YTogVWludDhBcnJheSwgY2FudmFzV2lkdGg6IG51bWJlciwgY2FudmFzSGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaW1hZ2VEYXRhICYmIF9yZXN1bHRDb2xsZWN0b3IpIHtcbiAgICAgICAgaWYgKHJlc3VsdC5iYXJjb2Rlcykge1xuICAgICAgICAgICAgcmVzdWx0LmJhcmNvZGVzLmZvckVhY2goKHsgY29kZVJlc3VsdCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNvZGVSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3Jlc3VsdENvbGxlY3Rvci5hZGRSZXN1bHQoaW1hZ2VEYXRhLCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0LCBjb2RlUmVzdWx0KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5jb2RlUmVzdWx0KSB7XG4gICAgICAgICAgICBfcmVzdWx0Q29sbGVjdG9yLmFkZFJlc3VsdChpbWFnZURhdGEsIGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQsIHJlc3VsdC5jb2RlUmVzdWx0KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gX2hhc0NvZGVSZXN1bHQocmVzdWx0OiBRdWFnZ2FCYXJjb2RlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHJlc3VsdCAmJiAoISFyZXN1bHQuY29kZVJlc3VsdCB8fCByZXN1bHQuYmFyY29kZXMgJiYgcmVzdWx0LmJhcmNvZGVzLnNvbWUoYmFyY29kZSA9PiAhIWJhcmNvZGUuY29kZVJlc3VsdCkpO1xufVxuXG5mdW5jdGlvbiBfcHVibGlzaFJlc3VsdChyZXN1bHQ/OiBRdWFnZ2FCYXJjb2RlLCBpbWFnZURhdGE/OiBVaW50OEFycmF5KTogdm9pZCB7XG4gICAgbGV0IHJlc3VsdFRvUHVibGlzaDogUXVhZ2dhQmFyY29kZSB8IEFycmF5PFF1YWdnYUJhcmNvZGU+ID0gcmVzdWx0O1xuXG4gICAgaWYgKHJlc3VsdCAmJiBfb25VSVRocmVhZCkge1xuICAgICAgICBjb25zdCBvZmZzZXQgPSBfaW5wdXRTdHJlYW0udG9wTGVmdDtcblxuICAgICAgICBpZiAob2Zmc2V0LnggIT09IDAgfHwgb2Zmc2V0LnkgIT09IDApIHtcbiAgICAgICAgICAgIF90cmFuc2Zvcm1SZXN1bHQocmVzdWx0LCBvZmZzZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgX2FkZFJlc3VsdChyZXN1bHQsIGltYWdlRGF0YSwgX2lucHV0U3RyZWFtLmNhbnZhc1dpZHRoLCBfaW5wdXRTdHJlYW0uY2FudmFzSGVpZ2h0KTtcbiAgICAgICAgcmVzdWx0VG9QdWJsaXNoID0gcmVzdWx0LmJhcmNvZGVzIHx8IHJlc3VsdDtcbiAgICB9XG5cbiAgICBFdmVudHMucHVibGlzaCgncHJvY2Vzc2VkJywgcmVzdWx0VG9QdWJsaXNoKTtcbiAgICBpZiAoX2hhc0NvZGVSZXN1bHQocmVzdWx0KSkge1xuICAgICAgICBFdmVudHMucHVibGlzaCgnZGV0ZWN0ZWQnLCByZXN1bHRUb1B1Ymxpc2gpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gX2xvY2F0ZUFuZERlY29kZSgpOiB2b2lkIHtcbiAgICBjb25zdCBib3hlcyA9IF9jb25maWcubG9jYXRlID8gX2xvY2F0b3IubG9jYXRlKCkgOiBbX2JveFNpemVdO1xuICAgIGNvbnN0IHJlc3VsdCA9IF9kZWNvZGVyLmRlY29kZUZyb21Cb3VuZGluZ0JveGVzKGJveGVzKTtcbiAgICBfcHVibGlzaFJlc3VsdChyZXN1bHQsIF9pbnB1dEltYWdlV3JhcHBlci5kYXRhKTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAoX29uVUlUaHJlYWQpIHtcbiAgICAgICAgaWYgKF93b3JrZXJQb29sLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGF2YWlsYWJsZVdvcmtlciA9IF93b3JrZXJQb29sLmZpbmQoKHsgYnVzeSB9KSA9PiAhYnVzeSk7XG4gICAgICAgICAgICBpZiAoIWF2YWlsYWJsZVdvcmtlcikge1xuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gYWxsIHdvcmtlcnMgYXJlIGJ1c3lcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgaW1hZ2VEYXRhID0gYXZhaWxhYmxlV29ya2VyLmltYWdlRGF0YTtcblxuICAgICAgICAgICAgaWYgKF9mcmFtZUdyYWJiZXIuZ3JhYihpbWFnZURhdGEpKSB7XG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlV29ya2VyLmJ1c3kgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGF2YWlsYWJsZVdvcmtlci53b3JrZXIucG9zdE1lc3NhZ2UoeyBjbWQ6ICdwcm9jZXNzJywgaW1hZ2VEYXRhIH0sIFtpbWFnZURhdGEuYnVmZmVyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoX2ZyYW1lR3JhYmJlci5ncmFiKF9pbnB1dEltYWdlV3JhcHBlci5kYXRhKSkge1xuICAgICAgICAgICAgX2xvY2F0ZUFuZERlY29kZSgpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgX2xvY2F0ZUFuZERlY29kZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gX3N0YXJ0Q29udGludW91c1VwZGF0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBkZWxheSA9IDEwMDAgLyAoX2NvbmZpZy5mcmVxdWVuY3kgfHwgNjApO1xuICAgIGxldCBuZXh0ID0gbnVsbDtcbiAgICBfc3RvcHBlZCA9IGZhbHNlO1xuXG4gICAgKGZ1bmN0aW9uIGZyYW1lKHRpbWVzdGFtcCk6IHZvaWQge1xuICAgICAgICBuZXh0ID0gbmV4dCB8fCB0aW1lc3RhbXA7XG4gICAgICAgIGlmICghX3N0b3BwZWQpIHtcbiAgICAgICAgICAgIGlmICh0aW1lc3RhbXAgPj0gbmV4dCkge1xuICAgICAgICAgICAgICAgIG5leHQgKz0gZGVsYXk7XG4gICAgICAgICAgICAgICAgX3VwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmcmFtZSk7XG4gICAgICAgIH1cbiAgICB9KHBlcmZvcm1hbmNlLm5vdygpKSk7XG59XG5cbmZ1bmN0aW9uIF9pbml0V29ya2VyKGNiOiAod29ya2VyVGhyZWFkOiBXb3JrZXJUaHJlYWQpID0+IHZvaWQpOiB2b2lkIHtcbiAgICBjb25zdCBibG9iVVJMID0gX2dlbmVyYXRlV29ya2VyQmxvYigpO1xuICAgIGNvbnN0IHdvcmtlclRocmVhZCA9IHtcbiAgICAgICAgd29ya2VyOiBuZXcgV29ya2VyKGJsb2JVUkwpLFxuICAgICAgICBpbWFnZURhdGE6IG5ldyBVaW50OEFycmF5KF9pbnB1dFN0cmVhbS53aWR0aCAqIF9pbnB1dFN0cmVhbS5oZWlnaHQpLFxuICAgICAgICBidXN5OiB0cnVlXG4gICAgfTtcblxuICAgIHdvcmtlclRocmVhZC53b3JrZXIub25tZXNzYWdlID0gKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgIGlmIChkYXRhLmV2ZW50ID09PSAnaW5pdGlhbGl6ZWQnKSB7XG4gICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGJsb2JVUkwpO1xuICAgICAgICAgICAgd29ya2VyVGhyZWFkLmJ1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgIHdvcmtlclRocmVhZC5pbWFnZURhdGEgPSBuZXcgVWludDhBcnJheShkYXRhLmltYWdlRGF0YSk7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdXb3JrZXIgaW5pdGlhbGl6ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNiKHdvcmtlclRocmVhZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ldmVudCA9PT0gJ3Byb2Nlc3NlZCcpIHtcbiAgICAgICAgICAgIHdvcmtlclRocmVhZC5idXN5ID0gZmFsc2U7XG4gICAgICAgICAgICB3b3JrZXJUaHJlYWQuaW1hZ2VEYXRhID0gbmV3IFVpbnQ4QXJyYXkoZGF0YS5pbWFnZURhdGEpO1xuICAgICAgICAgICAgX3B1Ymxpc2hSZXN1bHQoZGF0YS5yZXN1bHQsIHdvcmtlclRocmVhZC5pbWFnZURhdGEpO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEuZXZlbnQgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1dvcmtlciBlcnJvcjonLCBkYXRhLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHdvcmtlclRocmVhZC53b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBjbWQ6ICdpbml0JyxcbiAgICAgICAgc2l6ZTogeyB4OiBfaW5wdXRTdHJlYW0ud2lkdGgsIHk6IF9pbnB1dFN0cmVhbS5oZWlnaHQgfSxcbiAgICAgICAgaW1hZ2VEYXRhOiB3b3JrZXJUaHJlYWQuaW1hZ2VEYXRhLFxuICAgICAgICBjb25maWc6IG1lcmdlKF9jb25maWcsIHsgaW5wdXRTdHJlYW06IHsgdGFyZ2V0OiBudWxsIH0gfSlcbiAgICB9LCBbd29ya2VyVGhyZWFkLmltYWdlRGF0YS5idWZmZXJdKTtcbn1cblxuZnVuY3Rpb24gX3dvcmtlckludGVyZmFjZShmYWN0b3J5OiBGdW5jdGlvbik6IHZvaWQge1xuICAgIGxldCBRdWFnZ2E6IGFueTtcbiAgICBjb25zdCB3b3JrZXI6IGFueSA9IHNlbGY7XG4gICAgbGV0IGltYWdlV3JhcHBlcjogSW1hZ2VXcmFwcGVyO1xuXG4gICAgaWYgKGZhY3RvcnkpIHtcbiAgICAgICAgUXVhZ2dhID0gZmFjdG9yeSgpLmRlZmF1bHQ7XG4gICAgICAgIGlmICghUXVhZ2dhKSB7XG4gICAgICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2UoeyBldmVudDogJ2Vycm9yJywgbWVzc2FnZTogJ1F1YWdnYSBjb3VsZCBub3QgYmUgY3JlYXRlZCcgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxmLm9ubWVzc2FnZSA9ICh7IGRhdGEgfSkgPT4ge1xuICAgICAgICBpZiAoZGF0YS5jbWQgPT09ICdpbml0Jykge1xuICAgICAgICAgICAgY29uc3QgY29uZmlnOiBRdWFnZ2FDb25maWcgPSBkYXRhLmNvbmZpZztcbiAgICAgICAgICAgIGNvbmZpZy5udW1PZldvcmtlcnMgPSAwO1xuICAgICAgICAgICAgaW1hZ2VXcmFwcGVyID0gbmV3IFF1YWdnYS5JbWFnZVdyYXBwZXIoeyB4OiBkYXRhLnNpemUueCwgeTogZGF0YS5zaXplLnkgfSwgbmV3IFVpbnQ4QXJyYXkoZGF0YS5pbWFnZURhdGEpKTtcbiAgICAgICAgICAgIFF1YWdnYS5pbml0KFxuICAgICAgICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICAgICAgICAoKSA9PiB3b3JrZXIucG9zdE1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgICAgIHsgZXZlbnQ6ICdpbml0aWFsaXplZCcsIGltYWdlRGF0YTogaW1hZ2VXcmFwcGVyLmRhdGEgfSwgW2ltYWdlV3JhcHBlci5kYXRhLmJ1ZmZlcl1cbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIGltYWdlV3JhcHBlclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIFF1YWdnYS5vblByb2Nlc3NlZCgocmVzdWx0OiBRdWFnZ2FCYXJjb2RlKSA9PlxuICAgICAgICAgICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZShcbiAgICAgICAgICAgICAgICAgICAgeyBldmVudDogJ3Byb2Nlc3NlZCcsIGltYWdlRGF0YTogaW1hZ2VXcmFwcGVyLmRhdGEsIHJlc3VsdCB9LCBbaW1hZ2VXcmFwcGVyLmRhdGEuYnVmZmVyXVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5jbWQgPT09ICdwcm9jZXNzJykge1xuICAgICAgICAgICAgaW1hZ2VXcmFwcGVyLmRhdGEgPSBuZXcgVWludDhBcnJheShkYXRhLmltYWdlRGF0YSk7XG4gICAgICAgICAgICBRdWFnZ2Euc3RhcnQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLmNtZCA9PT0gJ3NldFJlYWRlcnMnKSB7XG4gICAgICAgICAgICBRdWFnZ2Euc2V0UmVhZGVycyhkYXRhLnJlYWRlcnMpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gX2dlbmVyYXRlV29ya2VyQmxvYigpOiBzdHJpbmcge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBsZXQgZmFjdG9yeVNvdXJjZTogc3RyaW5nID0gX19mYWN0b3J5U291cmNlX18gfHwgJyc7XG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtgKCR7X3dvcmtlckludGVyZmFjZS50b1N0cmluZygpfSkoJHtmYWN0b3J5U291cmNlfSk7YF0sIHsgdHlwZTogJ3RleHQvamF2YXNjcmlwdCcgfSk7XG5cbiAgICByZXR1cm4gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG59XG5cbmZ1bmN0aW9uIF9hZGp1c3RXb3JrZXJQb29sKGNhcGFjaXR5OiBudW1iZXIsIGNiPzogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIGNvbnN0IGluY3JlYXNlQnkgPSBjYXBhY2l0eSAtIF93b3JrZXJQb29sLmxlbmd0aDtcblxuICAgIGlmIChpbmNyZWFzZUJ5ID4gMCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluY3JlYXNlQnk7IGkrKykge1xuICAgICAgICAgICAgX2luaXRXb3JrZXIod29ya2VyVGhyZWFkID0+IHtcbiAgICAgICAgICAgICAgICBfd29ya2VyUG9vbC5wdXNoKHdvcmtlclRocmVhZCk7XG4gICAgICAgICAgICAgICAgaWYgKF93b3JrZXJQb29sLmxlbmd0aCA+PSBjYXBhY2l0eSAmJiBjYikge1xuICAgICAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGluY3JlYXNlQnkgPCAwKSB7XG4gICAgICAgICAgICBfd29ya2VyUG9vbC5zbGljZShpbmNyZWFzZUJ5KS5mb3JFYWNoKCh7IHdvcmtlciB9KSA9PiB7XG4gICAgICAgICAgICAgICAgd29ya2VyLnRlcm1pbmF0ZSgpO1xuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdXb3JrZXIgdGVybWluYXRlZCEnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF93b3JrZXJQb29sID0gX3dvcmtlclBvb2wuc2xpY2UoMCwgaW5jcmVhc2VCeSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNiICYmIGNiKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQmFyY29kZSwgQmFyY29kZUluZm8sIEJhcmNvZGVSZWFkZXIsIEJhcmNvZGVSZWFkZXJDb25maWcgfSBmcm9tICcuL2JhcmNvZGUtcmVhZGVyJztcblxuY29uc3QgTiA9IDE7XG5jb25zdCBXID0gMztcbmNvbnN0IFNUQVJUX1BBVFRFUk4gPSBbVywgTiwgVywgTiwgTiwgTl07XG5jb25zdCBTVE9QX1BBVFRFUk4gPSBbVywgTiwgTiwgTiwgV107XG5jb25zdCBDT0RFX1BBVFRFUk4gPSBbXG4gICAgW04sIE4sIFcsIFcsIE5dLFxuICAgIFtXLCBOLCBOLCBOLCBXXSxcbiAgICBbTiwgVywgTiwgTiwgV10sXG4gICAgW1csIFcsIE4sIE4sIE5dLFxuICAgIFtOLCBOLCBXLCBOLCBXXSxcbiAgICBbVywgTiwgVywgTiwgTl0sXG4gICAgW04sIFcsIFcsIE4sIE5dLFxuICAgIFtOLCBOLCBOLCBXLCBXXSxcbiAgICBbVywgTiwgTiwgVywgTl0sXG4gICAgW04sIFcsIE4sIFcsIE5dXG5dO1xuY29uc3Qgc3RhcnRQYXR0ZXJuTGVuZ3RoID0gU1RBUlRfUEFUVEVSTi5yZWR1Y2UoKHN1bSwgdmFsKSA9PiBzdW0gKyB2YWwsIDApO1xuXG5leHBvcnQgY2xhc3MgVHdvT2ZGaXZlUmVhZGVyIGV4dGVuZHMgQmFyY29kZVJlYWRlciB7XG4gICAgcHJpdmF0ZSBfYmFyU3BhY2VSYXRpbzogW251bWJlciwgbnVtYmVyXTtcblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZz86IEJhcmNvZGVSZWFkZXJDb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICB0aGlzLl9iYXJTcGFjZVJhdGlvID0gWzEsIDFdO1xuICAgICAgICB0aGlzLl9mb3JtYXQgPSAnMm9mNSc7XG4gICAgICAgIHRoaXMuX3NpbmdsZUNvZGVFcnJvciA9IDAuNzg7XG4gICAgICAgIHRoaXMuX2F2ZXJhZ2VDb2RlRXJyb3IgPSAwLjMwO1xuICAgIH1cblxuICAgIGRlY29kZSgpOiBCYXJjb2RlIHtcbiAgICAgICAgY29uc3Qgc3RhcnRJbmZvID0gdGhpcy5fZmluZFN0YXJ0KCk7XG5cbiAgICAgICAgaWYgKCFzdGFydEluZm8pIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZW5kSW5mbyA9IHRoaXMuX2ZpbmRFbmQoKTtcblxuICAgICAgICBpZiAoIWVuZEluZm8pIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY291bnRlcnMgPSB0aGlzLl9maWxsQ291bnRlcnMoc3RhcnRJbmZvLmVuZCwgZW5kSW5mby5zdGFydCwgMCk7XG5cbiAgICAgICAgaWYgKGNvdW50ZXJzLmxlbmd0aCAlIDEwICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheTxudW1iZXI+KCk7XG4gICAgICAgIGNvbnN0IGRlY29kZWRDb2RlcyA9IG5ldyBBcnJheTxCYXJjb2RlSW5mbz4oKTtcblxuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChzdGFydEluZm8pO1xuXG4gICAgICAgIGNvbnN0IGNvZGUgPSB0aGlzLl9kZWNvZGVQYXlsb2FkKGNvdW50ZXJzLCByZXN1bHQsIGRlY29kZWRDb2Rlcyk7XG5cbiAgICAgICAgaWYgKCFjb2RlIHx8IHJlc3VsdC5sZW5ndGggPCA1KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGVuZEluZm8pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2RlOiByZXN1bHQuam9pbignJyksXG4gICAgICAgICAgICBzdGFydDogc3RhcnRJbmZvLnN0YXJ0LFxuICAgICAgICAgICAgZW5kOiBlbmRJbmZvLmVuZCxcbiAgICAgICAgICAgIHN0YXJ0SW5mbyxcbiAgICAgICAgICAgIGRlY29kZWRDb2Rlc1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfZmluZFN0YXJ0KCk6IEJhcmNvZGVJbmZvIHtcbiAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMuX25leHRTZXQodGhpcy5fcm93KTtcbiAgICAgICAgbGV0IG5hcnJvd0JhcldpZHRoID0gMTtcbiAgICAgICAgbGV0IHN0YXJ0SW5mbzogQmFyY29kZUluZm87XG5cbiAgICAgICAgd2hpbGUgKCFzdGFydEluZm8pIHtcbiAgICAgICAgICAgIHN0YXJ0SW5mbyA9IHRoaXMuX2ZpbmRQYXR0ZXJuKFNUQVJUX1BBVFRFUk4sIG9mZnNldCwgMCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmICghc3RhcnRJbmZvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5hcnJvd0JhcldpZHRoID0gKHN0YXJ0SW5mby5lbmQgLSBzdGFydEluZm8uc3RhcnQpIC8gc3RhcnRQYXR0ZXJuTGVuZ3RoIHwgMDtcbiAgICAgICAgICAgIGNvbnN0IGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQgPSBzdGFydEluZm8uc3RhcnQgLSBuYXJyb3dCYXJXaWR0aCAqIDU7XG5cbiAgICAgICAgICAgIGlmIChsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0ID49IDApIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWF0Y2hSYW5nZShsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0LCBzdGFydEluZm8uc3RhcnQsIDApKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGFydEluZm87XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvZmZzZXQgPSBzdGFydEluZm8uZW5kO1xuICAgICAgICAgICAgc3RhcnRJbmZvID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlKGVuZEluZm86IEJhcmNvZGVJbmZvKTogQmFyY29kZUluZm8ge1xuICAgICAgICBjb25zdCB0cmFpbGluZ1doaXRlc3BhY2VFbmQgPSBlbmRJbmZvLmVuZCArIChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpIC8gMjtcblxuICAgICAgICBpZiAodHJhaWxpbmdXaGl0ZXNwYWNlRW5kIDwgdGhpcy5fcm93Lmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX21hdGNoUmFuZ2UoZW5kSW5mby5lbmQsIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCwgMCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW5kSW5mbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfZmluZEVuZCgpOiBCYXJjb2RlSW5mbyB7XG4gICAgICAgIHRoaXMuX3Jvdy5yZXZlcnNlKCk7XG5cbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5fbmV4dFNldCh0aGlzLl9yb3cpO1xuICAgICAgICBjb25zdCBlbmRJbmZvID0gdGhpcy5fZmluZFBhdHRlcm4oU1RPUF9QQVRURVJOLCBvZmZzZXQsIDAsIHRydWUpO1xuXG4gICAgICAgIHRoaXMuX3Jvdy5yZXZlcnNlKCk7XG5cbiAgICAgICAgaWYgKGVuZEluZm8gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmV2ZXJzZSBudW1iZXJzXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gZW5kSW5mby5zdGFydDtcbiAgICAgICAgZW5kSW5mby5zdGFydCA9IHRoaXMuX3Jvdy5sZW5ndGggLSBlbmRJbmZvLmVuZDtcbiAgICAgICAgZW5kSW5mby5lbmQgPSB0aGlzLl9yb3cubGVuZ3RoIC0gc3RhcnQ7XG5cbiAgICAgICAgcmV0dXJuIGVuZEluZm8gIT09IG51bGwgPyB0aGlzLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UoZW5kSW5mbykgOiBudWxsO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfZGVjb2RlQ29kZShjb3VudGVyOiBSZWFkb25seUFycmF5PG51bWJlcj4pOiBCYXJjb2RlSW5mbyB7XG4gICAgICAgIGNvbnN0IGJlc3RNYXRjaDogQmFyY29kZUluZm8gPSB7XG4gICAgICAgICAgICBlcnJvcjogTnVtYmVyLk1BWF9WQUxVRSxcbiAgICAgICAgICAgIGNvZGU6IC0xLFxuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICBlbmQ6IDBcbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKGxldCBjb2RlID0gMDsgY29kZSA8IENPREVfUEFUVEVSTi5sZW5ndGg7IGNvZGUrKykge1xuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSB0aGlzLl9tYXRjaFBhdHRlcm4oY291bnRlciwgQ09ERV9QQVRURVJOW2NvZGVdKTtcbiAgICAgICAgICAgIGlmIChlcnJvciA8IGJlc3RNYXRjaC5lcnJvcikge1xuICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb2RlID0gY29kZTtcbiAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBiZXN0TWF0Y2guZXJyb3IgPCB0aGlzLkFWRVJBR0VfQ09ERV9FUlJPUiA/IGJlc3RNYXRjaCA6IG51bGw7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9kZWNvZGVQYXlsb2FkKGNvdW50ZXJzOiBSZWFkb25seUFycmF5PG51bWJlcj4sIHJlc3VsdDogQXJyYXk8bnVtYmVyPiwgZGVjb2RlZENvZGVzOiBBcnJheTxCYXJjb2RlSW5mbz4pOiBCYXJjb2RlSW5mbyB7XG4gICAgICAgIGNvbnN0IGNvdW50ZXJMZW5ndGggPSBjb3VudGVycy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGNvdW50ZXIgPSBbMCwgMCwgMCwgMCwgMF07XG4gICAgICAgIGxldCBwb3MgPSAwO1xuICAgICAgICBsZXQgY29kZTogQmFyY29kZUluZm87XG5cbiAgICAgICAgd2hpbGUgKHBvcyA8IGNvdW50ZXJMZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY291bnRlcltpXSA9IGNvdW50ZXJzW3Bvc10gKiB0aGlzLl9iYXJTcGFjZVJhdGlvWzBdO1xuICAgICAgICAgICAgICAgIHBvcyArPSAyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb2RlID0gdGhpcy5fZGVjb2RlQ29kZShjb3VudGVyKTtcblxuICAgICAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSk7XG4gICAgICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb2RlO1xuICAgIH1cbn1cbiIsImV4cG9ydCBlbnVtIEJhcmNvZGVEaXJlY3Rpb24ge1xuICAgIEZvcndhcmQgPSAxLFxuICAgIFJldmVyc2UgPSAtMVxufTtcblxuZXhwb3J0IHR5cGUgQmFyY29kZUZvcm1hdCA9IHN0cmluZztcblxuZXhwb3J0IHR5cGUgQmFyY29kZVJlYWRlclR5cGUgPSBzdHJpbmc7XG5cbmV4cG9ydCB0eXBlIEJhcmNvZGVSZWFkZXJEZWNsYXJhdGlvbiA9IEJhcmNvZGVSZWFkZXJUeXBlIHwgeyBmb3JtYXQ6IEJhcmNvZGVSZWFkZXJUeXBlOyBjb25maWc6IEJhcmNvZGVSZWFkZXJDb25maWc7IH07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFyY29kZVJlYWRlckNvbmZpZyB7XG4gICAgbm9ybWFsaXplQmFyU3BhY2VXaWR0aD86IGJvb2xlYW47XG4gICAgc3VwcGxlbWVudHM/OiBBcnJheTxCYXJjb2RlUmVhZGVyVHlwZT47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFyY29kZUNvcnJlY3Rpb24ge1xuICAgIGJhcjogbnVtYmVyO1xuICAgIHNwYWNlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFyY29kZUluZm8ge1xuICAgIGNvZGU/OiBudW1iZXI7XG4gICAgY29ycmVjdGlvbj86IEJhcmNvZGVDb3JyZWN0aW9uO1xuICAgIGVuZD86IG51bWJlcjtcbiAgICBlbmRDb3VudGVyPzogbnVtYmVyO1xuICAgIGVycm9yPzogbnVtYmVyO1xuICAgIHN0YXJ0PzogbnVtYmVyO1xuICAgIHN0YXJ0Q291bnRlcj86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCYXJjb2RlIHtcbiAgICBjb2RlPzogc3RyaW5nO1xuICAgIGNvZGVzZXQ/OiBudW1iZXI7XG4gICAgY29ycmVjdGlvbj86IEJhcmNvZGVDb3JyZWN0aW9uO1xuICAgIGRlY29kZWRDb2Rlcz86IEFycmF5PHN0cmluZyB8IEJhcmNvZGVJbmZvPjtcbiAgICBkaXJlY3Rpb24/OiBCYXJjb2RlRGlyZWN0aW9uO1xuICAgIGVuZD86IG51bWJlcjtcbiAgICBlbmRJbmZvPzogQmFyY29kZUluZm87XG4gICAgZm9ybWF0PzogQmFyY29kZUZvcm1hdDtcbiAgICBzdGFydD86IG51bWJlcjtcbiAgICBzdGFydEluZm8/OiBCYXJjb2RlSW5mbztcbiAgICBzdXBwbGVtZW50PzogQmFyY29kZTtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhcmNvZGVSZWFkZXIge1xuICAgIHByb3RlY3RlZCBfc2luZ2xlQ29kZUVycm9yOiBudW1iZXI7XG4gICAgcHJvdGVjdGVkIF9hdmVyYWdlQ29kZUVycm9yOiBudW1iZXI7XG4gICAgcHJvdGVjdGVkIF9mb3JtYXQ6IEJhcmNvZGVGb3JtYXQ7XG4gICAgcHJvdGVjdGVkIF9yb3c6IEFycmF5PG51bWJlcj47XG5cbiAgICBjb25maWc6IEJhcmNvZGVSZWFkZXJDb25maWc7XG4gICAgc3VwcGxlbWVudHM6IEFycmF5PEJhcmNvZGVSZWFkZXI+O1xuXG4gICAgc3RhdGljIGdldCBFeGNlcHRpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBTdGFydE5vdEZvdW5kRXhjZXB0aW9uOiAnU3RhcnQtSW5mbyB3YXMgbm90IGZvdW5kIScsXG4gICAgICAgICAgICBDb2RlTm90Rm91bmRFeGNlcHRpb246ICdDb2RlIGNvdWxkIG5vdCBiZSBmb3VuZCEnLFxuICAgICAgICAgICAgUGF0dGVybk5vdEZvdW5kRXhjZXB0aW9uOiAnUGF0dGVybiBjb3VsZCBub3QgYmUgZm91bmQhJ1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldCBTSU5HTEVfQ09ERV9FUlJPUigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2luZ2xlQ29kZUVycm9yO1xuICAgIH1cblxuICAgIGdldCBBVkVSQUdFX0NPREVfRVJST1IoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F2ZXJhZ2VDb2RlRXJyb3I7XG4gICAgfVxuXG4gICAgZ2V0IEZPUk1BVCgpOiBCYXJjb2RlRm9ybWF0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWc/OiBCYXJjb2RlUmVhZGVyQ29uZmlnLCBzdXBwbGVtZW50cz86IEFycmF5PEJhcmNvZGVSZWFkZXI+KSB7XG4gICAgICAgIHRoaXMuX2Zvcm1hdCA9ICd1bmtub3duJztcbiAgICAgICAgdGhpcy5fcm93ID0gW107XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgICAgICB0aGlzLnN1cHBsZW1lbnRzID0gc3VwcGxlbWVudHM7XG4gICAgfVxuXG4gICAgYWJzdHJhY3QgZGVjb2RlKHJvdz86IEFycmF5PG51bWJlcj4sIHN0YXJ0PzogbnVtYmVyKTogQmFyY29kZTtcblxuICAgIHByb3RlY3RlZCBfZmluZFBhdHRlcm4ocGF0dGVybjogUmVhZG9ubHlBcnJheTxudW1iZXI+LCBvZmZzZXQ6IG51bWJlciwgaXNXaGl0ZTogMCB8IDEsIHRyeUhhcmRlcjogYm9vbGVhbik6IEJhcmNvZGVJbmZvIHtcbiAgICAgICAgY29uc3QgY291bnRlciA9IG5ldyBBcnJheTxudW1iZXI+KHBhdHRlcm4ubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgYmVzdE1hdGNoOiBCYXJjb2RlSW5mbyA9IHtcbiAgICAgICAgICAgIGVycm9yOiBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgICAgICAgY29kZTogLTEsXG4gICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgIGVuZDogMFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBlcHNpbG9uID0gdGhpcy5BVkVSQUdFX0NPREVfRVJST1I7XG4gICAgICAgIGxldCBjb3VudGVyUG9zID0gMDtcblxuICAgICAgICBpZiAoIW9mZnNldCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gdGhpcy5fbmV4dFNldCh0aGlzLl9yb3cpO1xuICAgICAgICB9XG5cbiAgICAgICAgY291bnRlci5maWxsKDApO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBvZmZzZXQ7IGkgPCB0aGlzLl9yb3cubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9yb3dbaV0gXiBpc1doaXRlKSB7XG4gICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gdGhpcy5fbWF0Y2hQYXR0ZXJuKGNvdW50ZXIsIHBhdHRlcm4pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciA8IGVwc2lsb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLnN0YXJ0ID0gaSAtIGNvdW50ZXIucmVkdWNlKChzdW0sIHZhbHVlKSA9PiBzdW0gKyB2YWx1ZSwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZW5kID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHJ5SGFyZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvdW50ZXIubGVuZ3RoIC0gMjsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcltqXSA9IGNvdW50ZXJbaiArIDJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyLmxlbmd0aCAtIDJdID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlci5sZW5ndGggLSAxXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyUG9zLS07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XG4gICAgICAgICAgICAgICAgaXNXaGl0ZSA9IGlzV2hpdGUgPyAwIDogMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX25leHRVbnNldChsaW5lOiBSZWFkb25seUFycmF5PG51bWJlcj4sIHN0YXJ0PzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0IHx8IDA7IGkgPCBsaW5lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIWxpbmVbaV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGluZS5sZW5ndGg7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9uZXh0U2V0KGxpbmU6IFJlYWRvbmx5QXJyYXk8bnVtYmVyPiwgc3RhcnQ/OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnQgfHwgMDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChsaW5lW2ldKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpbmUubGVuZ3RoO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfbWF0Y2hSYW5nZShzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgdmFsdWU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnQgPCAwID8gMCA6IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9yb3dbaV0gIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfbWF0Y2hQYXR0ZXJuKGNvdW50ZXI6IFJlYWRvbmx5QXJyYXk8bnVtYmVyPiwgY29kZTogUmVhZG9ubHlBcnJheTxudW1iZXI+LCBtYXhTaW5nbGVFcnJvcj86IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGxldCBlcnJvciA9IDA7XG4gICAgICAgIGxldCBzdW0gPSAwO1xuICAgICAgICBsZXQgbW9kdWxvID0gMDtcblxuICAgICAgICBtYXhTaW5nbGVFcnJvciA9IG1heFNpbmdsZUVycm9yIHx8IHRoaXMuU0lOR0xFX0NPREVfRVJST1IgfHwgMTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHN1bSArPSBjb3VudGVyW2ldO1xuICAgICAgICAgICAgbW9kdWxvICs9IGNvZGVbaV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3VtIDwgbW9kdWxvKSB7XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJhcldpZHRoID0gc3VtIC8gbW9kdWxvO1xuICAgICAgICBtYXhTaW5nbGVFcnJvciAqPSBiYXJXaWR0aDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50ZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gY291bnRlcltpXTtcbiAgICAgICAgICAgIGNvbnN0IHNjYWxlZCA9IGNvZGVbaV0gKiBiYXJXaWR0aDtcbiAgICAgICAgICAgIGNvbnN0IHNpbmdsZUVycm9yID0gTWF0aC5hYnMoY291bnQgLSBzY2FsZWQpIC8gc2NhbGVkO1xuXG4gICAgICAgICAgICBpZiAoc2luZ2xlRXJyb3IgPiBtYXhTaW5nbGVFcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlcnJvciArPSBzaW5nbGVFcnJvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlcnJvciAvIG1vZHVsbztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2NvcnJlY3RCYXJzKGNvdW50ZXI6IEFycmF5PG51bWJlcj4sIGNvcnJlY3Rpb246IG51bWJlciwgaW5kaWNlczogQXJyYXk8bnVtYmVyPikge1xuICAgICAgICBsZXQgbGVuZ3RoID0gaW5kaWNlcy5sZW5ndGg7XG4gICAgICAgIGxldCB0bXAgPSAwO1xuXG4gICAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICAgICAgdG1wID0gY291bnRlcltpbmRpY2VzW2xlbmd0aF1dICogKDEgLSAoKDEgLSBjb3JyZWN0aW9uKSAvIDIpKTtcbiAgICAgICAgICAgIGlmICh0bXAgPiAxKSB7XG4gICAgICAgICAgICAgICAgY291bnRlcltpbmRpY2VzW2xlbmd0aF1dID0gdG1wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVjb2RlUGF0dGVybihwYXR0ZXJuOiBBcnJheTxudW1iZXI+KTogQmFyY29kZSB7XG4gICAgICAgIHRoaXMuX3JvdyA9IHBhdHRlcm47XG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmRlY29kZSgpO1xuXG4gICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvdy5yZXZlcnNlKCk7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmRlY29kZSgpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5kaXJlY3Rpb24gPSBCYXJjb2RlRGlyZWN0aW9uLlJldmVyc2U7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0ID0gdGhpcy5fcm93Lmxlbmd0aCAtIHJlc3VsdC5zdGFydDtcbiAgICAgICAgICAgICAgICByZXN1bHQuZW5kID0gdGhpcy5fcm93Lmxlbmd0aCAtIHJlc3VsdC5lbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQuZGlyZWN0aW9uID0gQmFyY29kZURpcmVjdGlvbi5Gb3J3YXJkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgcmVzdWx0LmZvcm1hdCA9IHRoaXMuRk9STUFUO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBfZmlsbENvdW50ZXJzKG9mZnNldDogbnVtYmVyLCBlbmQ6IG51bWJlciwgaXNXaGl0ZTogMCB8IDEpOiBBcnJheTxudW1iZXI+IHtcbiAgICAgICAgY29uc3QgY291bnRlcnMgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xuICAgICAgICBsZXQgY291bnRlclBvcyA9IDA7XG5cbiAgICAgICAgY291bnRlcnNbY291bnRlclBvc10gPSAwO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBvZmZzZXQ7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcbiAgICAgICAgICAgICAgICBjb3VudGVyc1tjb3VudGVyUG9zXSsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XG4gICAgICAgICAgICAgICAgY291bnRlcnNbY291bnRlclBvc10gPSAxO1xuICAgICAgICAgICAgICAgIGlzV2hpdGUgPSBpc1doaXRlID8gMCA6IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY291bnRlcnM7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF90b0NvdW50ZXJzKHN0YXJ0OiBudW1iZXIsIGNvdW50ZXJzOiBVaW50MTZBcnJheSk6IFVpbnQxNkFycmF5IHtcbiAgICAgICAgY29uc3QgbnVtQ291bnRlcnMgPSBjb3VudGVycy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGVuZCA9IHRoaXMuX3Jvdy5sZW5ndGg7XG4gICAgICAgIGxldCBpc1doaXRlOiAwIHwgMSA9IHRoaXMuX3Jvd1tzdGFydF0gPyAwIDogMTtcbiAgICAgICAgbGV0IGNvdW50ZXJQb3MgPSAwO1xuXG4gICAgICAgIGNvdW50ZXJzLmZpbGwoMCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9yb3dbaV0gXiBpc1doaXRlKSB7XG4gICAgICAgICAgICAgICAgY291bnRlcnNbY291bnRlclBvc10rKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xuICAgICAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBudW1Db3VudGVycykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyc1tjb3VudGVyUG9zXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGlzV2hpdGUgPSBpc1doaXRlID8gMCA6IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvdW50ZXJzO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJhcmNvZGUsIEJhcmNvZGVJbmZvLCBCYXJjb2RlUmVhZGVyIH0gZnJvbSAnLi9iYXJjb2RlLXJlYWRlcic7XG5cbmNvbnN0IEFMUEhBQkVUSF9TVFJJTkcgPSAnMDEyMzQ1Njc4OS0kOi8uK0FCQ0QnO1xuY29uc3QgQUxQSEFCRVQgPSBbLi4uQUxQSEFCRVRIX1NUUklOR10ubWFwKGNoYXIgPT4gY2hhci5jaGFyQ29kZUF0KDApKTtcbi8vIGNvbnN0IEFMUEhBQkVUID0gWzQ4LCA0OSwgNTAsIDUxLCA1MiwgNTMsIDU0LCA1NSwgNTYsIDU3LCA0NSwgMzYsIDU4LCA0NywgNDYsIDQzLCA2NSwgNjYsIDY3LCA2OF07XG5jb25zdCBDSEFSQUNURVJfRU5DT0RJTkdTID0gWzB4MDAzLCAweDAwNiwgMHgwMDksIDB4MDYwLCAweDAxMiwgMHgwNDIsIDB4MDIxLCAweDAyNCwgMHgwMzAsIDB4MDQ4LCAweDAwYywgMHgwMTgsIDB4MDQ1LFxuICAgIDB4MDUxLCAweDA1NCwgMHgwMTUsIDB4MDFBLCAweDAyOSwgMHgwMEIsIDB4MDBFXTtcbmNvbnN0IFNUQVJUX0VORCA9IFsweDAxQSwgMHgwMjksIDB4MDBCLCAweDAwRV07XG5jb25zdCBNSU5fRU5DT0RFRF9DSEFSUyA9IDQ7XG5jb25zdCBNQVhfQUNDRVBUQUJMRSA9IDIuMDtcbmNvbnN0IFBBRERJTkcgPSAxLjU7XG5cbmludGVyZmFjZSBUaHJlc2hvbGQge1xuICAgIHNwYWNlOiB7XG4gICAgICAgIG5hcnJvdzoge1xuICAgICAgICAgICAgc2l6ZTogbnVtYmVyO1xuICAgICAgICAgICAgY291bnRzOiBudW1iZXI7XG4gICAgICAgICAgICBtaW46IG51bWJlcjtcbiAgICAgICAgICAgIG1heDogbnVtYmVyO1xuICAgICAgICB9O1xuICAgICAgICB3aWRlOiB7XG4gICAgICAgICAgICBzaXplOiBudW1iZXI7XG4gICAgICAgICAgICBjb3VudHM6IG51bWJlcjtcbiAgICAgICAgICAgIG1pbjogbnVtYmVyO1xuICAgICAgICAgICAgbWF4OiBudW1iZXI7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBiYXI6IHtcbiAgICAgICAgbmFycm93OiB7XG4gICAgICAgICAgICBzaXplOiBudW1iZXI7XG4gICAgICAgICAgICBjb3VudHM6IG51bWJlcjtcbiAgICAgICAgICAgIG1pbjogbnVtYmVyO1xuICAgICAgICAgICAgbWF4OiBudW1iZXI7XG4gICAgICAgIH07XG4gICAgICAgIHdpZGU6IHtcbiAgICAgICAgICAgIHNpemU6IG51bWJlcjtcbiAgICAgICAgICAgIGNvdW50czogbnVtYmVyO1xuICAgICAgICAgICAgbWluOiBudW1iZXI7XG4gICAgICAgICAgICBtYXg6IG51bWJlcjtcbiAgICAgICAgfTtcbiAgICB9O1xufVxuXG5leHBvcnQgY2xhc3MgQ29kYWJhclJlYWRlciBleHRlbmRzIEJhcmNvZGVSZWFkZXIge1xuICAgIHByaXZhdGUgX2NvdW50ZXJzOiBBcnJheTxudW1iZXI+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fZm9ybWF0ID0gJ2NvZGFiYXInO1xuICAgICAgICB0aGlzLl9jb3VudGVycyA9IFtdO1xuICAgIH1cblxuICAgIGRlY29kZSgpOiBCYXJjb2RlIHtcbiAgICAgICAgdGhpcy5fY291bnRlcnMgPSB0aGlzLl9maWxsQ291bnRlcnModGhpcy5fbmV4dFVuc2V0KHRoaXMuX3JvdyksIHRoaXMuX3Jvdy5sZW5ndGgsIDEpO1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5fZmluZFN0YXJ0KCk7XG4gICAgICAgIGlmICghc3RhcnQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5PHN0cmluZz4oKTtcbiAgICAgICAgbGV0IG5leHRTdGFydCA9IHN0YXJ0LnN0YXJ0Q291bnRlcjtcbiAgICAgICAgbGV0IHBhdHRlcm46IG51bWJlcjtcblxuICAgICAgICBkbyB7XG4gICAgICAgICAgICBwYXR0ZXJuID0gdGhpcy5fdG9QYXR0ZXJuKG5leHRTdGFydCk7XG4gICAgICAgICAgICBpZiAocGF0dGVybiA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRlY29kZWRDaGFyID0gdGhpcy5fcGF0dGVyblRvQ2hhcihwYXR0ZXJuKTtcbiAgICAgICAgICAgIGlmIChkZWNvZGVkQ2hhciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goZGVjb2RlZENoYXIpO1xuICAgICAgICAgICAgbmV4dFN0YXJ0ICs9IDg7XG4gICAgICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+IDEgJiYgU1RBUlRfRU5ELnNvbWUoY29kZSA9PiBjb2RlID09PSBwYXR0ZXJuKSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlIChuZXh0U3RhcnQgPCB0aGlzLl9jb3VudGVycy5sZW5ndGgpO1xuXG4gICAgICAgIC8vIHZlcmlmeSBlbmRcbiAgICAgICAgaWYgKChyZXN1bHQubGVuZ3RoIC0gMikgPCBNSU5fRU5DT0RFRF9DSEFSUyB8fCAhU1RBUlRfRU5ELnNvbWUoY29kZSA9PiBjb2RlID09PSBwYXR0ZXJuKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB2ZXJpZnkgZW5kIHdoaXRlIHNwYWNlXG4gICAgICAgIGlmICghdGhpcy5fdmVyaWZ5V2hpdGVzcGFjZShzdGFydC5zdGFydENvdW50ZXIsIG5leHRTdGFydCAtIDgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVSZXN1bHQocmVzdWx0LCBzdGFydC5zdGFydENvdW50ZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIG5leHRTdGFydCA9IG5leHRTdGFydCA+IHRoaXMuX2NvdW50ZXJzLmxlbmd0aCA/IHRoaXMuX2NvdW50ZXJzLmxlbmd0aCA6IG5leHRTdGFydDtcbiAgICAgICAgY29uc3QgZW5kID0gc3RhcnQuc3RhcnQgKyB0aGlzLl9zdW1Db3VudGVycyhzdGFydC5zdGFydENvdW50ZXIsIG5leHRTdGFydCAtIDgpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2RlOiByZXN1bHQuam9pbignJyksXG4gICAgICAgICAgICBzdGFydDogc3RhcnQuc3RhcnQsXG4gICAgICAgICAgICBlbmQsXG4gICAgICAgICAgICBzdGFydEluZm86IHN0YXJ0LFxuICAgICAgICAgICAgZGVjb2RlZENvZGVzOiByZXN1bHRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3ZlcmlmeVdoaXRlc3BhY2Uoc3RhcnRDb3VudGVyOiBudW1iZXIsIGVuZENvdW50ZXI6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoKHN0YXJ0Q291bnRlciAtIDEgPD0gMClcbiAgICAgICAgICAgIHx8IHRoaXMuX2NvdW50ZXJzW3N0YXJ0Q291bnRlciAtIDFdID49ICh0aGlzLl9jYWxjdWxhdGVQYXR0ZXJuTGVuZ3RoKHN0YXJ0Q291bnRlcikgLyAyLjApKSB7XG4gICAgICAgICAgICBpZiAoKGVuZENvdW50ZXIgKyA4ID49IHRoaXMuX2NvdW50ZXJzLmxlbmd0aClcbiAgICAgICAgICAgICAgICB8fCB0aGlzLl9jb3VudGVyc1tlbmRDb3VudGVyICsgN10gPj0gKHRoaXMuX2NhbGN1bGF0ZVBhdHRlcm5MZW5ndGgoZW5kQ291bnRlcikgLyAyLjApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2FsY3VsYXRlUGF0dGVybkxlbmd0aChvZmZzZXQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGxldCBzdW0gPSAwO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBvZmZzZXQ7IGkgPCBvZmZzZXQgKyA3OyBpKyspIHtcbiAgICAgICAgICAgIHN1bSArPSB0aGlzLl9jb3VudGVyc1tpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdW07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdGhyZXNob2xkUmVzdWx0UGF0dGVybihyZXN1bHQ6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPiwgc3RhcnRDb3VudGVyOiBudW1iZXIpOiBUaHJlc2hvbGQge1xuICAgICAgICBjb25zdCBjYXRlZ29yaXphdGlvbjogVGhyZXNob2xkID0ge1xuICAgICAgICAgICAgc3BhY2U6IHtcbiAgICAgICAgICAgICAgICBuYXJyb3c6IHsgc2l6ZTogMCwgY291bnRzOiAwLCBtaW46IDAsIG1heDogTnVtYmVyLk1BWF9WQUxVRSB9LFxuICAgICAgICAgICAgICAgIHdpZGU6IHsgc2l6ZTogMCwgY291bnRzOiAwLCBtaW46IDAsIG1heDogTnVtYmVyLk1BWF9WQUxVRSB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFyOiB7XG4gICAgICAgICAgICAgICAgbmFycm93OiB7IHNpemU6IDAsIGNvdW50czogMCwgbWluOiAwLCBtYXg6IE51bWJlci5NQVhfVkFMVUUgfSxcbiAgICAgICAgICAgICAgICB3aWRlOiB7IHNpemU6IDAsIGNvdW50czogMCwgbWluOiAwLCBtYXg6IE51bWJlci5NQVhfVkFMVUUgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBsZXQgcG9zID0gc3RhcnRDb3VudGVyO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcGF0dGVybiA9IHRoaXMuX2NoYXJUb1BhdHRlcm4ocmVzdWx0W2ldKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDY7IGogPj0gMDsgai0tKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2luZCA9IChqICYgMSkgPT09IDIgPyBjYXRlZ29yaXphdGlvbi5iYXIgOiBjYXRlZ29yaXphdGlvbi5zcGFjZTtcbiAgICAgICAgICAgICAgICBjb25zdCBjYXQgPSAocGF0dGVybiAmIDEpID09PSAxID8ga2luZC53aWRlIDoga2luZC5uYXJyb3c7XG4gICAgICAgICAgICAgICAgY2F0LnNpemUgKz0gdGhpcy5fY291bnRlcnNbcG9zICsgal07XG4gICAgICAgICAgICAgICAgY2F0LmNvdW50cysrO1xuICAgICAgICAgICAgICAgIHBhdHRlcm4gPj49IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwb3MgKz0gODtcbiAgICAgICAgfVxuXG4gICAgICAgIFsnc3BhY2UnLCAnYmFyJ10uZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2luZCA9IGNhdGVnb3JpemF0aW9uW2tleV07XG4gICAgICAgICAgICBraW5kLndpZGUubWluID0gTWF0aC5mbG9vcigoa2luZC5uYXJyb3cuc2l6ZSAvIGtpbmQubmFycm93LmNvdW50cyArIGtpbmQud2lkZS5zaXplIC8ga2luZC53aWRlLmNvdW50cykgLyAyKTtcbiAgICAgICAgICAgIGtpbmQubmFycm93Lm1heCA9IE1hdGguY2VpbChraW5kLndpZGUubWluKTtcbiAgICAgICAgICAgIGtpbmQud2lkZS5tYXggPSBNYXRoLmNlaWwoKGtpbmQud2lkZS5zaXplICogTUFYX0FDQ0VQVEFCTEUgKyBQQURESU5HKSAvIGtpbmQud2lkZS5jb3VudHMpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gY2F0ZWdvcml6YXRpb247XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2hhclRvUGF0dGVybihjaGFyOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBjaGFyQ29kZSA9IGNoYXIuY2hhckNvZGVBdCgwKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEFMUEhBQkVULmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoQUxQSEFCRVRbaV0gPT09IGNoYXJDb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIENIQVJBQ1RFUl9FTkNPRElOR1NbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gMHgwO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3ZhbGlkYXRlUmVzdWx0KHJlc3VsdDogUmVhZG9ubHlBcnJheTxzdHJpbmc+LCBzdGFydENvdW50ZXI6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSB0aGlzLl90aHJlc2hvbGRSZXN1bHRQYXR0ZXJuKHJlc3VsdCwgc3RhcnRDb3VudGVyKTtcbiAgICAgICAgbGV0IHBvcyA9IHN0YXJ0Q291bnRlcjtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHBhdHRlcm4gPSB0aGlzLl9jaGFyVG9QYXR0ZXJuKHJlc3VsdFtpXSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSA2OyBqID49IDA7IGotLSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtpbmQgPSAoaiAmIDEpID09PSAwID8gdGhyZXNob2xkLmJhciA6IHRocmVzaG9sZC5zcGFjZTtcbiAgICAgICAgICAgICAgICBjb25zdCBjYXQgPSAocGF0dGVybiAmIDEpID09PSAxID8ga2luZC53aWRlIDoga2luZC5uYXJyb3c7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IHRoaXMuX2NvdW50ZXJzW3BvcyArIGpdO1xuICAgICAgICAgICAgICAgIGlmIChzaXplIDwgY2F0Lm1pbiB8fCBzaXplID4gY2F0Lm1heCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhdHRlcm4gPj49IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwb3MgKz0gODtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3BhdHRlcm5Ub0NoYXIocGF0dGVybjogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBDSEFSQUNURVJfRU5DT0RJTkdTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoQ0hBUkFDVEVSX0VOQ09ESU5HU1tpXSA9PT0gcGF0dGVybikge1xuICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKEFMUEhBQkVUW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NvbXB1dGVBbHRlcm5hdGluZ1RocmVzaG9sZChvZmZzZXQ6IG51bWJlciwgZW5kOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBsZXQgbWluID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgbGV0IG1heCA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IG9mZnNldDsgaSA8IGVuZDsgaSArPSAyKSB7XG4gICAgICAgICAgICBjb25zdCBjb3VudGVyID0gdGhpcy5fY291bnRlcnNbaV07XG4gICAgICAgICAgICBpZiAoY291bnRlciA+IG1heCkge1xuICAgICAgICAgICAgICAgIG1heCA9IGNvdW50ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY291bnRlciA8IG1pbikge1xuICAgICAgICAgICAgICAgIG1pbiA9IGNvdW50ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKChtaW4gKyBtYXgpIC8gMi4wKSB8IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdG9QYXR0ZXJuKG9mZnNldDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgbnVtQ291bnRlcnMgPSA3O1xuICAgICAgICBjb25zdCBlbmQgPSBvZmZzZXQgKyBudW1Db3VudGVycztcblxuICAgICAgICBpZiAoZW5kID4gdGhpcy5fY291bnRlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBiYXJUaHJlc2hvbGQgPSB0aGlzLl9jb21wdXRlQWx0ZXJuYXRpbmdUaHJlc2hvbGQob2Zmc2V0LCBlbmQpO1xuICAgICAgICBjb25zdCBzcGFjZVRocmVzaG9sZCA9IHRoaXMuX2NvbXB1dGVBbHRlcm5hdGluZ1RocmVzaG9sZChvZmZzZXQgKyAxLCBlbmQpO1xuICAgICAgICBsZXQgYml0bWFzayA9IDEgPDwgKG51bUNvdW50ZXJzIC0gMSk7XG4gICAgICAgIGxldCBwYXR0ZXJuID0gMDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvdW50ZXJzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IChpICYgMSkgPT09IDAgPyBiYXJUaHJlc2hvbGQgOiBzcGFjZVRocmVzaG9sZDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jb3VudGVyc1tvZmZzZXQgKyBpXSA+IHRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgIHBhdHRlcm4gfD0gYml0bWFzaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJpdG1hc2sgPj49IDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGF0dGVybjtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zdW1Db3VudGVycyhzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGxldCBzdW0gPSAwO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICAgICAgICBzdW0gKz0gdGhpcy5fY291bnRlcnNbaV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3VtO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfZmluZFN0YXJ0KCk6IEJhcmNvZGVJbmZvIHtcbiAgICAgICAgbGV0IHN0YXJ0ID0gdGhpcy5fbmV4dFVuc2V0KHRoaXMuX3Jvdyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLl9jb3VudGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcGF0dGVybiA9IHRoaXMuX3RvUGF0dGVybihpKTtcbiAgICAgICAgICAgIGlmIChwYXR0ZXJuICE9PSAtMSAmJiBTVEFSVF9FTkQuc29tZShjb2RlID0+IGNvZGUgPT09IHBhdHRlcm4pKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogTG9vayBmb3Igd2hpdGVzcGFjZSBhaGVhZFxuICAgICAgICAgICAgICAgIHN0YXJ0ICs9IHRoaXMuX3N1bUNvdW50ZXJzKDAsIGkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHN0YXJ0ICsgdGhpcy5fc3VtQ291bnRlcnMoaSwgaSArIDgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBlbmQsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0Q291bnRlcjogaSxcbiAgICAgICAgICAgICAgICAgICAgZW5kQ291bnRlcjogaSArIDhcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQmFyY29kZSwgQmFyY29kZUNvcnJlY3Rpb24sIEJhcmNvZGVJbmZvLCBCYXJjb2RlUmVhZGVyIH0gZnJvbSAnLi9iYXJjb2RlLXJlYWRlcic7XG5cbmNvbnN0IENPREVfU0hJRlQgPSA5ODtcbmNvbnN0IENPREVfQyA9IDk5O1xuY29uc3QgQ09ERV9CID0gMTAwO1xuY29uc3QgQ09ERV9BID0gMTAxO1xuY29uc3QgU1RBUlRfQ09ERV9BID0gMTAzO1xuY29uc3QgU1RBUlRfQ09ERV9CID0gMTA0O1xuY29uc3QgU1RBUlRfQ09ERV9DID0gMTA1O1xuY29uc3QgU1RPUF9DT0RFID0gMTA2O1xuY29uc3QgQ09ERV9QQVRURVJOID0gW1xuICAgIFsyLCAxLCAyLCAyLCAyLCAyXSxcbiAgICBbMiwgMiwgMiwgMSwgMiwgMl0sXG4gICAgWzIsIDIsIDIsIDIsIDIsIDFdLFxuICAgIFsxLCAyLCAxLCAyLCAyLCAzXSxcbiAgICBbMSwgMiwgMSwgMywgMiwgMl0sXG4gICAgWzEsIDMsIDEsIDIsIDIsIDJdLFxuICAgIFsxLCAyLCAyLCAyLCAxLCAzXSxcbiAgICBbMSwgMiwgMiwgMywgMSwgMl0sXG4gICAgWzEsIDMsIDIsIDIsIDEsIDJdLFxuICAgIFsyLCAyLCAxLCAyLCAxLCAzXSxcbiAgICBbMiwgMiwgMSwgMywgMSwgMl0sXG4gICAgWzIsIDMsIDEsIDIsIDEsIDJdLFxuICAgIFsxLCAxLCAyLCAyLCAzLCAyXSxcbiAgICBbMSwgMiwgMiwgMSwgMywgMl0sXG4gICAgWzEsIDIsIDIsIDIsIDMsIDFdLFxuICAgIFsxLCAxLCAzLCAyLCAyLCAyXSxcbiAgICBbMSwgMiwgMywgMSwgMiwgMl0sXG4gICAgWzEsIDIsIDMsIDIsIDIsIDFdLFxuICAgIFsyLCAyLCAzLCAyLCAxLCAxXSxcbiAgICBbMiwgMiwgMSwgMSwgMywgMl0sXG4gICAgWzIsIDIsIDEsIDIsIDMsIDFdLFxuICAgIFsyLCAxLCAzLCAyLCAxLCAyXSxcbiAgICBbMiwgMiwgMywgMSwgMSwgMl0sXG4gICAgWzMsIDEsIDIsIDEsIDMsIDFdLFxuICAgIFszLCAxLCAxLCAyLCAyLCAyXSxcbiAgICBbMywgMiwgMSwgMSwgMiwgMl0sXG4gICAgWzMsIDIsIDEsIDIsIDIsIDFdLFxuICAgIFszLCAxLCAyLCAyLCAxLCAyXSxcbiAgICBbMywgMiwgMiwgMSwgMSwgMl0sXG4gICAgWzMsIDIsIDIsIDIsIDEsIDFdLFxuICAgIFsyLCAxLCAyLCAxLCAyLCAzXSxcbiAgICBbMiwgMSwgMiwgMywgMiwgMV0sXG4gICAgWzIsIDMsIDIsIDEsIDIsIDFdLFxuICAgIFsxLCAxLCAxLCAzLCAyLCAzXSxcbiAgICBbMSwgMywgMSwgMSwgMiwgM10sXG4gICAgWzEsIDMsIDEsIDMsIDIsIDFdLFxuICAgIFsxLCAxLCAyLCAzLCAxLCAzXSxcbiAgICBbMSwgMywgMiwgMSwgMSwgM10sXG4gICAgWzEsIDMsIDIsIDMsIDEsIDFdLFxuICAgIFsyLCAxLCAxLCAzLCAxLCAzXSxcbiAgICBbMiwgMywgMSwgMSwgMSwgM10sXG4gICAgWzIsIDMsIDEsIDMsIDEsIDFdLFxuICAgIFsxLCAxLCAyLCAxLCAzLCAzXSxcbiAgICBbMSwgMSwgMiwgMywgMywgMV0sXG4gICAgWzEsIDMsIDIsIDEsIDMsIDFdLFxuICAgIFsxLCAxLCAzLCAxLCAyLCAzXSxcbiAgICBbMSwgMSwgMywgMywgMiwgMV0sXG4gICAgWzEsIDMsIDMsIDEsIDIsIDFdLFxuICAgIFszLCAxLCAzLCAxLCAyLCAxXSxcbiAgICBbMiwgMSwgMSwgMywgMywgMV0sXG4gICAgWzIsIDMsIDEsIDEsIDMsIDFdLFxuICAgIFsyLCAxLCAzLCAxLCAxLCAzXSxcbiAgICBbMiwgMSwgMywgMywgMSwgMV0sXG4gICAgWzIsIDEsIDMsIDEsIDMsIDFdLFxuICAgIFszLCAxLCAxLCAxLCAyLCAzXSxcbiAgICBbMywgMSwgMSwgMywgMiwgMV0sXG4gICAgWzMsIDMsIDEsIDEsIDIsIDFdLFxuICAgIFszLCAxLCAyLCAxLCAxLCAzXSxcbiAgICBbMywgMSwgMiwgMywgMSwgMV0sXG4gICAgWzMsIDMsIDIsIDEsIDEsIDFdLFxuICAgIFszLCAxLCA0LCAxLCAxLCAxXSxcbiAgICBbMiwgMiwgMSwgNCwgMSwgMV0sXG4gICAgWzQsIDMsIDEsIDEsIDEsIDFdLFxuICAgIFsxLCAxLCAxLCAyLCAyLCA0XSxcbiAgICBbMSwgMSwgMSwgNCwgMiwgMl0sXG4gICAgWzEsIDIsIDEsIDEsIDIsIDRdLFxuICAgIFsxLCAyLCAxLCA0LCAyLCAxXSxcbiAgICBbMSwgNCwgMSwgMSwgMiwgMl0sXG4gICAgWzEsIDQsIDEsIDIsIDIsIDFdLFxuICAgIFsxLCAxLCAyLCAyLCAxLCA0XSxcbiAgICBbMSwgMSwgMiwgNCwgMSwgMl0sXG4gICAgWzEsIDIsIDIsIDEsIDEsIDRdLFxuICAgIFsxLCAyLCAyLCA0LCAxLCAxXSxcbiAgICBbMSwgNCwgMiwgMSwgMSwgMl0sXG4gICAgWzEsIDQsIDIsIDIsIDEsIDFdLFxuICAgIFsyLCA0LCAxLCAyLCAxLCAxXSxcbiAgICBbMiwgMiwgMSwgMSwgMSwgNF0sXG4gICAgWzQsIDEsIDMsIDEsIDEsIDFdLFxuICAgIFsyLCA0LCAxLCAxLCAxLCAyXSxcbiAgICBbMSwgMywgNCwgMSwgMSwgMV0sXG4gICAgWzEsIDEsIDEsIDIsIDQsIDJdLFxuICAgIFsxLCAyLCAxLCAxLCA0LCAyXSxcbiAgICBbMSwgMiwgMSwgMiwgNCwgMV0sXG4gICAgWzEsIDEsIDQsIDIsIDEsIDJdLFxuICAgIFsxLCAyLCA0LCAxLCAxLCAyXSxcbiAgICBbMSwgMiwgNCwgMiwgMSwgMV0sXG4gICAgWzQsIDEsIDEsIDIsIDEsIDJdLFxuICAgIFs0LCAyLCAxLCAxLCAxLCAyXSxcbiAgICBbNCwgMiwgMSwgMiwgMSwgMV0sXG4gICAgWzIsIDEsIDIsIDEsIDQsIDFdLFxuICAgIFsyLCAxLCA0LCAxLCAyLCAxXSxcbiAgICBbNCwgMSwgMiwgMSwgMiwgMV0sXG4gICAgWzEsIDEsIDEsIDEsIDQsIDNdLFxuICAgIFsxLCAxLCAxLCAzLCA0LCAxXSxcbiAgICBbMSwgMywgMSwgMSwgNCwgMV0sXG4gICAgWzEsIDEsIDQsIDEsIDEsIDNdLFxuICAgIFsxLCAxLCA0LCAzLCAxLCAxXSxcbiAgICBbNCwgMSwgMSwgMSwgMSwgM10sXG4gICAgWzQsIDEsIDEsIDMsIDEsIDFdLFxuICAgIFsxLCAxLCAzLCAxLCA0LCAxXSxcbiAgICBbMSwgMSwgNCwgMSwgMywgMV0sXG4gICAgWzMsIDEsIDEsIDEsIDQsIDFdLFxuICAgIFs0LCAxLCAxLCAxLCAzLCAxXSxcbiAgICBbMiwgMSwgMSwgNCwgMSwgMl0sXG4gICAgWzIsIDEsIDEsIDIsIDEsIDRdLFxuICAgIFsyLCAxLCAxLCAyLCAzLCAyXSxcbiAgICBbMiwgMywgMywgMSwgMSwgMSwgMl1cbl07XG5jb25zdCBNT0RVTEVfSU5ESUNFUyA9IHsgYmFyOiBbMCwgMiwgNF0sIHNwYWNlOiBbMSwgMywgNV0gfTtcblxuZXhwb3J0IGNsYXNzIENvZGUxMjhSZWFkZXIgZXh0ZW5kcyBCYXJjb2RlUmVhZGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9mb3JtYXQgPSAnY29kZV8xMjgnO1xuICAgICAgICB0aGlzLl9zaW5nbGVDb2RlRXJyb3IgPSAwLjY0O1xuICAgICAgICB0aGlzLl9hdmVyYWdlQ29kZUVycm9yID0gMC4zMDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2RlY29kZUNvZGUoc3RhcnQ6IG51bWJlciwgY29ycmVjdGlvbjogQmFyY29kZUNvcnJlY3Rpb24pOiBCYXJjb2RlSW5mbyB7XG4gICAgICAgIGNvbnN0IGNvdW50ZXIgPSBbMCwgMCwgMCwgMCwgMCwgMF07XG4gICAgICAgIGNvbnN0IG9mZnNldCA9IHN0YXJ0O1xuICAgICAgICBjb25zdCBiZXN0TWF0Y2g6IEJhcmNvZGVJbmZvID0ge1xuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXG4gICAgICAgICAgICBjb2RlOiAtMSxcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgIGVuZDogc3RhcnQsXG4gICAgICAgICAgICBjb3JyZWN0aW9uOiB7XG4gICAgICAgICAgICAgICAgYmFyOiAxLFxuICAgICAgICAgICAgICAgIHNwYWNlOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGVwc2lsb24gPSB0aGlzLkFWRVJBR0VfQ09ERV9FUlJPUjtcbiAgICAgICAgbGV0IGlzV2hpdGU6IDAgfCAxID0gdGhpcy5fcm93W29mZnNldF0gPyAwIDogMTtcbiAgICAgICAgbGV0IGNvdW50ZXJQb3MgPSAwO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBvZmZzZXQ7IGkgPCB0aGlzLl9yb3cubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9yb3dbaV0gXiBpc1doaXRlKSB7XG4gICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3JyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3JyZWN0KGNvdW50ZXIsIGNvcnJlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgY29kZSA9IDA7IGNvZGUgPCBDT0RFX1BBVFRFUk4ubGVuZ3RoOyBjb2RlKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gdGhpcy5fbWF0Y2hQYXR0ZXJuKGNvdW50ZXIsIENPREVfUEFUVEVSTltjb2RlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPCBiZXN0TWF0Y2guZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guY29kZSA9IGNvZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZW5kID0gaTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYmVzdE1hdGNoLmNvZGUgPT09IC0xIHx8IGJlc3RNYXRjaC5lcnJvciA+IGVwc2lsb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhwZWN0ZWQgPSBDT0RFX1BBVFRFUk5bYmVzdE1hdGNoLmNvZGVdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXhwZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb3JyZWN0aW9uLmJhciA9IHRoaXMuX2NhbGN1bGF0ZUNvcnJlY3Rpb24oZXhwZWN0ZWQsIGNvdW50ZXIsIE1PRFVMRV9JTkRJQ0VTLmJhcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guY29ycmVjdGlvbi5zcGFjZSA9IHRoaXMuX2NhbGN1bGF0ZUNvcnJlY3Rpb24oZXhwZWN0ZWQsIGNvdW50ZXIsIE1PRFVMRV9JTkRJQ0VTLnNwYWNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXN0TWF0Y2g7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlclBvcysrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xuICAgICAgICAgICAgICAgIGlzV2hpdGUgPSBpc1doaXRlID8gMCA6IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jb3JyZWN0KGNvdW50ZXI6IEFycmF5PG51bWJlcj4sIGNvcnJlY3Rpb246IEJhcmNvZGVDb3JyZWN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2NvcnJlY3RCYXJzKGNvdW50ZXIsIGNvcnJlY3Rpb24uYmFyLCBNT0RVTEVfSU5ESUNFUy5iYXIpO1xuICAgICAgICB0aGlzLl9jb3JyZWN0QmFycyhjb3VudGVyLCBjb3JyZWN0aW9uLnNwYWNlLCBNT0RVTEVfSU5ESUNFUy5zcGFjZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9maW5kU3RhcnQoKSB7XG4gICAgICAgIGNvbnN0IGNvdW50ZXIgPSBbMCwgMCwgMCwgMCwgMCwgMF07XG4gICAgICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuX25leHRTZXQodGhpcy5fcm93KTtcbiAgICAgICAgY29uc3QgYmVzdE1hdGNoID0ge1xuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXG4gICAgICAgICAgICBjb2RlOiAtMSxcbiAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICAgICAgZW5kOiAwLFxuICAgICAgICAgICAgY29ycmVjdGlvbjoge1xuICAgICAgICAgICAgICAgIGJhcjogMSxcbiAgICAgICAgICAgICAgICBzcGFjZTogMVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBlcHNpbG9uID0gdGhpcy5BVkVSQUdFX0NPREVfRVJST1I7XG4gICAgICAgIGxldCBpc1doaXRlOiAwIHwgMSA9IDA7XG4gICAgICAgIGxldCBjb3VudGVyUG9zID0gMDtcbiAgICAgICAgbGV0IHN1bTogbnVtYmVyO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBvZmZzZXQ7IGkgPCB0aGlzLl9yb3cubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9yb3dbaV0gXiBpc1doaXRlKSB7XG4gICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoY291bnRlclBvcyA9PT0gY291bnRlci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1bSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY291bnRlci5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VtICs9IGNvdW50ZXJbal07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgY29kZSA9IFNUQVJUX0NPREVfQTsgY29kZSA8PSBTVEFSVF9DT0RFX0M7IGNvZGUrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSB0aGlzLl9tYXRjaFBhdHRlcm4oY291bnRlciwgQ09ERV9QQVRURVJOW2NvZGVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciA8IGJlc3RNYXRjaC5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb2RlID0gY29kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoYmVzdE1hdGNoLmVycm9yIDwgZXBzaWxvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLnN0YXJ0ID0gaSAtIHN1bTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmNvcnJlY3Rpb24uYmFyID0gdGhpcy5fY2FsY3VsYXRlQ29ycmVjdGlvbihDT0RFX1BBVFRFUk5bYmVzdE1hdGNoLmNvZGVdLCBjb3VudGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1PRFVMRV9JTkRJQ0VTLmJhcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2guY29ycmVjdGlvbi5zcGFjZSA9IHRoaXMuX2NhbGN1bGF0ZUNvcnJlY3Rpb24oQ09ERV9QQVRURVJOW2Jlc3RNYXRjaC5jb2RlXSwgY291bnRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNT0RVTEVfSU5ESUNFUy5zcGFjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA0OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbal0gPSBjb3VudGVyW2ogKyAyXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyWzRdID0gMDtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcls1XSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MtLTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xuICAgICAgICAgICAgICAgIGlzV2hpdGUgPSBpc1doaXRlID8gMCA6IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBkZWNvZGUoKTogQmFyY29kZSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheTxzdHJpbmcgfCBudW1iZXI+KCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0SW5mbyA9IHRoaXMuX2ZpbmRTdGFydCgpO1xuICAgICAgICBsZXQgY29kZTogQmFyY29kZUluZm8gPSBudWxsO1xuICAgICAgICBsZXQgZG9uZSA9IGZhbHNlO1xuICAgICAgICBsZXQgbXVsdGlwbGllciA9IDA7XG4gICAgICAgIGxldCBjaGVja3N1bSA9IDA7XG4gICAgICAgIGxldCBjb2Rlc2V0OiBudW1iZXI7XG4gICAgICAgIGxldCByYXdSZXN1bHQgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xuICAgICAgICBsZXQgZGVjb2RlZENvZGVzID0gbmV3IEFycmF5PEJhcmNvZGVJbmZvPigpO1xuICAgICAgICBsZXQgc2hpZnROZXh0ID0gZmFsc2U7XG4gICAgICAgIGxldCB1bnNoaWZ0OiBib29sZWFuO1xuICAgICAgICBsZXQgcmVtb3ZlTGFzdENoYXJhY3RlciA9IHRydWU7XG5cbiAgICAgICAgaWYgKHN0YXJ0SW5mbyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29kZSA9IHtcbiAgICAgICAgICAgIGNvZGU6IHN0YXJ0SW5mby5jb2RlLFxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0SW5mby5zdGFydCxcbiAgICAgICAgICAgIGVuZDogc3RhcnRJbmZvLmVuZCxcbiAgICAgICAgICAgIGNvcnJlY3Rpb246IHtcbiAgICAgICAgICAgICAgICBiYXI6IHN0YXJ0SW5mby5jb3JyZWN0aW9uLmJhcixcbiAgICAgICAgICAgICAgICBzcGFjZTogc3RhcnRJbmZvLmNvcnJlY3Rpb24uc3BhY2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XG4gICAgICAgIGNoZWNrc3VtID0gY29kZS5jb2RlO1xuXG4gICAgICAgIHN3aXRjaCAoY29kZS5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlIFNUQVJUX0NPREVfQTpcbiAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gQ09ERV9BO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTVEFSVF9DT0RFX0I6XG4gICAgICAgICAgICAgICAgY29kZXNldCA9IENPREVfQjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU1RBUlRfQ09ERV9DOlxuICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBDT0RFX0M7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKCFkb25lKSB7XG4gICAgICAgICAgICB1bnNoaWZ0ID0gc2hpZnROZXh0O1xuICAgICAgICAgICAgc2hpZnROZXh0ID0gZmFsc2U7XG4gICAgICAgICAgICBjb2RlID0gdGhpcy5fZGVjb2RlQ29kZShjb2RlLmVuZCwgY29kZS5jb3JyZWN0aW9uKTtcbiAgICAgICAgICAgIGlmIChjb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSAhPT0gU1RPUF9DT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUxhc3RDaGFyYWN0ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgIT09IFNUT1BfQ09ERSkge1xuICAgICAgICAgICAgICAgICAgICByYXdSZXN1bHQucHVzaChjb2RlLmNvZGUpO1xuICAgICAgICAgICAgICAgICAgICBtdWx0aXBsaWVyKys7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrc3VtICs9IG11bHRpcGxpZXIgKiBjb2RlLmNvZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjb2Rlc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQ09ERV9BOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29kZS5jb2RlIDwgNjQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKDMyICsgY29kZS5jb2RlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvZGUuY29kZSA8IDk2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlLmNvZGUgLSA2NCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29kZS5jb2RlICE9PSBTVE9QX0NPREUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTGFzdENoYXJhY3RlciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvZGUuY29kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIENPREVfU0hJRlQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlmdE5leHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IENPREVfQjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIENPREVfQjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBDT0RFX0I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBDT0RFX0M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gQ09ERV9DO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1RPUF9DT0RFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXNlIENPREVfQjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSA8IDk2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgzMiArIGNvZGUuY29kZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29kZS5jb2RlICE9PSBTVE9QX0NPREUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTGFzdENoYXJhY3RlciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvZGUuY29kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIENPREVfU0hJRlQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlmdE5leHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IENPREVfQTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIENPREVfQTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVzZXQgPSBDT0RFX0E7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBDT0RFX0M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gQ09ERV9DO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1RPUF9DT0RFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXNlIENPREVfQzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSA8IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSA8IDEwID8gJzAnICsgY29kZS5jb2RlIDogY29kZS5jb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUuY29kZSAhPT0gU1RPUF9DT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUxhc3RDaGFyYWN0ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjb2RlLmNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBDT0RFX0E6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gQ09ERV9BO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQ09ERV9COlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZXNldCA9IENPREVfQjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNUT1BfQ09ERTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHVuc2hpZnQpIHtcbiAgICAgICAgICAgICAgICBjb2Rlc2V0ID0gY29kZXNldCA9PT0gQ09ERV9BID8gQ09ERV9CIDogQ09ERV9BO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29kZS5lbmQgPSB0aGlzLl9uZXh0VW5zZXQodGhpcy5fcm93LCBjb2RlLmVuZCk7XG4gICAgICAgIGlmICghdGhpcy5fdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlKGNvZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoZWNrc3VtIC09IG11bHRpcGxpZXIgKiByYXdSZXN1bHRbcmF3UmVzdWx0Lmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAoY2hlY2tzdW0gJSAxMDMgIT09IHJhd1Jlc3VsdFtyYXdSZXN1bHQubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSBsYXN0IGNvZGUgZnJvbSByZXN1bHQgKGNoZWNrc3VtKVxuICAgICAgICBpZiAocmVtb3ZlTGFzdENoYXJhY3Rlcikge1xuICAgICAgICAgICAgcmVzdWx0LnNwbGljZShyZXN1bHQubGVuZ3RoIC0gMSwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29kZTogcmVzdWx0LmpvaW4oJycpLFxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0SW5mby5zdGFydCxcbiAgICAgICAgICAgIGVuZDogY29kZS5lbmQsXG4gICAgICAgICAgICBjb2Rlc2V0LFxuICAgICAgICAgICAgc3RhcnRJbmZvLFxuICAgICAgICAgICAgZGVjb2RlZENvZGVzLFxuICAgICAgICAgICAgZW5kSW5mbzogY29kZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlKGVuZEluZm86IEJhcmNvZGVJbmZvKTogQmFyY29kZUluZm8ge1xuICAgICAgICBjb25zdCB0cmFpbGluZ1doaXRlc3BhY2VFbmQgPSBlbmRJbmZvLmVuZCArIChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpIC8gMjtcblxuICAgICAgICBpZiAodHJhaWxpbmdXaGl0ZXNwYWNlRW5kIDwgdGhpcy5fcm93Lmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX21hdGNoUmFuZ2UoZW5kSW5mby5lbmQsIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCwgMCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW5kSW5mbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NhbGN1bGF0ZUNvcnJlY3Rpb24oXG4gICAgICAgIGV4cGVjdGVkOiBSZWFkb25seUFycmF5PG51bWJlcj4sXG4gICAgICAgIG5vcm1hbGl6ZWQ6IFJlYWRvbmx5QXJyYXk8bnVtYmVyPixcbiAgICAgICAgaW5kaWNlczogUmVhZG9ubHlBcnJheTxudW1iZXI+XG4gICAgKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHN1bU5vcm1hbGl6ZWQgPSAwO1xuICAgICAgICBsZXQgc3VtRXhwZWN0ZWQgPSAwO1xuXG4gICAgICAgIGZvciAobGV0IGxlbmd0aCA9IGluZGljZXMubGVuZ3RoOyBsZW5ndGgtLTspIHtcbiAgICAgICAgICAgIHN1bUV4cGVjdGVkICs9IGV4cGVjdGVkW2luZGljZXNbbGVuZ3RoXV07XG4gICAgICAgICAgICBzdW1Ob3JtYWxpemVkICs9IG5vcm1hbGl6ZWRbaW5kaWNlc1tsZW5ndGhdXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdW1FeHBlY3RlZCAvIHN1bU5vcm1hbGl6ZWQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQmFyY29kZSwgQmFyY29kZUluZm8sIEJhcmNvZGVSZWFkZXIgfSBmcm9tICcuL2JhcmNvZGUtcmVhZGVyJztcblxuY29uc3QgQVNURVJJU0sgPSAweDA5NDtcbmNvbnN0IEFMUEhBQkVUSF9TVFJJTkcgPSAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaLS4gKiQvKyUnO1xuY29uc3QgQUxQSEFCRVQgPSBuZXcgVWludDE2QXJyYXkoWy4uLkFMUEhBQkVUSF9TVFJJTkddLm1hcChjaGFyID0+IGNoYXIuY2hhckNvZGVBdCgwKSkpO1xuLy8gY29uc3QgQUxQSEFCRVQgPSBbNDgsIDQ5LCA1MCwgNTEsIDUyLCA1MywgNTQsIDU1LCA1NiwgNTcsIDY1LCA2NiwgNjcsIDY4LCA2OSwgNzAsIDcxLCA3MiwgNzMsIDc0LCA3NSwgNzYsIDc3LCA3OCxcbi8vICAgICA3OSwgODAsIDgxLCA4MiwgODMsIDg0LCA4NSwgODYsIDg3LCA4OCwgODksIDkwLCA0NSwgNDYsIDMyLCA0MiwgMzYsIDQ3LCA0MywgMzddO1xuY29uc3QgQ0hBUkFDVEVSX0VOQ09ESU5HUyA9IG5ldyBVaW50MTZBcnJheShbXG4gICAgMHgwMzQsIDB4MTIxLCAweDA2MSwgMHgxNjAsIDB4MDMxLCAweDEzMCwgMHgwNzAsIDB4MDI1LCAweDEyNCwgMHgwNjQsIDB4MTA5LCAweDA0OSwgMHgxNDgsIDB4MDE5LCAweDExOCwgMHgwNTgsXG4gICAgMHgwMEQsIDB4MTBDLCAweDA0QywgMHgwMUMsIDB4MTAzLCAweDA0MywgMHgxNDIsIDB4MDEzLCAweDExMiwgMHgwNTIsIDB4MDA3LCAweDEwNiwgMHgwNDYsIDB4MDE2LCAweDE4MSwgMHgwQzEsXG4gICAgMHgxQzAsIDB4MDkxLCAweDE5MCwgMHgwRDAsIDB4MDg1LCAweDE4NCwgMHgwQzQsIDB4MDk0LCAweDBBOCwgMHgwQTIsIDB4MDhBLCAweDAyQVxuXSk7XG5cbmV4cG9ydCBjbGFzcyBDb2RlMzlSZWFkZXIgZXh0ZW5kcyBCYXJjb2RlUmVhZGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9mb3JtYXQgPSAnY29kZV8zOSc7XG4gICAgfVxuXG4gICAgZGVjb2RlKCk6IEJhcmNvZGUge1xuICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuX2ZpbmRTdGFydCgpO1xuXG4gICAgICAgIGlmICghc3RhcnQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5PHN0cmluZz4oKTtcbiAgICAgICAgbGV0IGNvdW50ZXJzID0gbmV3IFVpbnQxNkFycmF5KDkpO1xuICAgICAgICBsZXQgZGVjb2RlZENoYXI6IHN0cmluZztcbiAgICAgICAgbGV0IGxhc3RTdGFydDogbnVtYmVyO1xuICAgICAgICBsZXQgbmV4dFN0YXJ0ID0gdGhpcy5fbmV4dFNldCh0aGlzLl9yb3csIHN0YXJ0LmVuZCk7XG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgdGhpcy5fdG9Db3VudGVycyhuZXh0U3RhcnQsIGNvdW50ZXJzKTtcbiAgICAgICAgICAgIGNvbnN0IHBhdHRlcm4gPSB0aGlzLl90b1BhdHRlcm4oY291bnRlcnMpO1xuICAgICAgICAgICAgaWYgKHBhdHRlcm4gPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWNvZGVkQ2hhciA9IHRoaXMuX3BhdHRlcm5Ub0NoYXIocGF0dGVybik7XG4gICAgICAgICAgICBpZiAoZGVjb2RlZENoYXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGRlY29kZWRDaGFyKTtcbiAgICAgICAgICAgIGxhc3RTdGFydCA9IG5leHRTdGFydDtcbiAgICAgICAgICAgIG5leHRTdGFydCArPSBjb3VudGVycy5yZWR1Y2UoKHN1bSwgaXRlbSkgPT4gc3VtICsgaXRlbSwgMCk7XG4gICAgICAgICAgICBuZXh0U3RhcnQgPSB0aGlzLl9uZXh0U2V0KHRoaXMuX3JvdywgbmV4dFN0YXJ0KTtcbiAgICAgICAgfSB3aGlsZSAoZGVjb2RlZENoYXIgIT09ICcqJyk7XG4gICAgICAgIHJlc3VsdC5wb3AoKTtcblxuICAgICAgICBpZiAoIXJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UobGFzdFN0YXJ0LCBuZXh0U3RhcnQsIGNvdW50ZXJzKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29kZTogcmVzdWx0LmpvaW4oJycpLFxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LnN0YXJ0LFxuICAgICAgICAgICAgZW5kOiBuZXh0U3RhcnQsXG4gICAgICAgICAgICBzdGFydEluZm86IHN0YXJ0LFxuICAgICAgICAgICAgZGVjb2RlZENvZGVzOiByZXN1bHRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3BhdHRlcm5Ub0NoYXIocGF0dGVybik6IHN0cmluZyB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQ0hBUkFDVEVSX0VOQ09ESU5HUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKENIQVJBQ1RFUl9FTkNPRElOR1NbaV0gPT09IHBhdHRlcm4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShBTFBIQUJFVFtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlKGxhc3RTdGFydDogbnVtYmVyLCBuZXh0U3RhcnQ6IG51bWJlciwgY291bnRlcnM6IFVpbnQxNkFycmF5KTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHBhdHRlcm5TaXplID0gY291bnRlcnMucmVkdWNlKChzdW0sIGl0ZW0pID0+IHN1bSArIGl0ZW0sIDApO1xuICAgICAgICBjb25zdCB0cmFpbGluZ1doaXRlc3BhY2VFbmQgPSBuZXh0U3RhcnQgLSBsYXN0U3RhcnQgLSBwYXR0ZXJuU2l6ZTtcbiAgICAgICAgcmV0dXJuICh0cmFpbGluZ1doaXRlc3BhY2VFbmQgKiAzKSA+PSBwYXR0ZXJuU2l6ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9maW5kTmV4dFdpZHRoKGNvdW50ZXJzOiBVaW50MTZBcnJheSwgY3VycmVudDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IG1pbldpZHRoID0gTnVtYmVyLk1BWF9WQUxVRTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY291bnRlcnNbaV0gPCBtaW5XaWR0aCAmJiBjb3VudGVyc1tpXSA+IGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBtaW5XaWR0aCA9IGNvdW50ZXJzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1pbldpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RvUGF0dGVybihjb3VudGVyczogVWludDE2QXJyYXkpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBudW1Db3VudGVycyA9IGNvdW50ZXJzLmxlbmd0aDtcbiAgICAgICAgbGV0IG1heE5hcnJvd1dpZHRoID0gMDtcbiAgICAgICAgbGV0IG51bVdpZGVCYXJzID0gbnVtQ291bnRlcnM7XG4gICAgICAgIGxldCB3aWRlQmFyV2lkdGggPSAwO1xuICAgICAgICBsZXQgcGF0dGVybjogbnVtYmVyO1xuXG4gICAgICAgIHdoaWxlIChudW1XaWRlQmFycyA+IDMpIHtcbiAgICAgICAgICAgIG1heE5hcnJvd1dpZHRoID0gdGhpcy5fZmluZE5leHRXaWR0aChjb3VudGVycywgbWF4TmFycm93V2lkdGgpO1xuICAgICAgICAgICAgbnVtV2lkZUJhcnMgPSAwO1xuICAgICAgICAgICAgcGF0dGVybiA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvdW50ZXJzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoY291bnRlcnNbaV0gPiBtYXhOYXJyb3dXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuIHw9IDEgPDwgKG51bUNvdW50ZXJzIC0gMSAtIGkpO1xuICAgICAgICAgICAgICAgICAgICBudW1XaWRlQmFycysrO1xuICAgICAgICAgICAgICAgICAgICB3aWRlQmFyV2lkdGggKz0gY291bnRlcnNbaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobnVtV2lkZUJhcnMgPT09IDMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvdW50ZXJzICYmIG51bVdpZGVCYXJzID4gMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudGVyc1tpXSA+IG1heE5hcnJvd1dpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBudW1XaWRlQmFycy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjb3VudGVyc1tpXSAqIDIpID49IHdpZGVCYXJXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcGF0dGVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9maW5kU3RhcnQoKTogQmFyY29kZUluZm8ge1xuICAgICAgICBjb25zdCBvZmZzZXQgPSB0aGlzLl9uZXh0U2V0KHRoaXMuX3Jvdyk7XG4gICAgICAgIGxldCBwYXR0ZXJuU3RhcnQgPSBvZmZzZXQ7XG4gICAgICAgIGNvbnN0IGNvdW50ZXIgPSBuZXcgVWludDE2QXJyYXkoOSk7XG4gICAgICAgIGxldCBjb3VudGVyUG9zID0gMDtcbiAgICAgICAgbGV0IGlzV2hpdGU6IDAgfCAxID0gMDtcbiAgICAgICAgbGV0IHdoaXRlU3BhY2VNdXN0U3RhcnQ6IG51bWJlcjtcblxuICAgICAgICBmb3IgKGxldCBpID0gb2Zmc2V0OyBpIDwgdGhpcy5fcm93Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fcm93W2ldIF4gaXNXaGl0ZSkge1xuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBmaW5kIHN0YXJ0IHBhdHRlcm5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RvUGF0dGVybihjb3VudGVyKSA9PT0gQVNURVJJU0spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaXRlU3BhY2VNdXN0U3RhcnQgPSBNYXRoLm1heCgwLCBwYXR0ZXJuU3RhcnQgLSAoKGkgLSBwYXR0ZXJuU3RhcnQpIC8gNCkpIHwgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXRjaFJhbmdlKHdoaXRlU3BhY2VNdXN0U3RhcnQsIHBhdHRlcm5TdGFydCwgMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogcGF0dGVyblN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IGlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcGF0dGVyblN0YXJ0ICs9IGNvdW50ZXJbMF0gKyBjb3VudGVyWzFdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDc7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcltqXSA9IGNvdW50ZXJbaiArIDJdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbN10gPSAwO1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyWzhdID0gMDtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlclBvcy0tO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY291bnRlcltjb3VudGVyUG9zXSA9IDE7XG4gICAgICAgICAgICAgICAgaXNXaGl0ZSA9IGlzV2hpdGUgPyAwIDogMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJhcmNvZGUgfSBmcm9tICcuL2JhcmNvZGUtcmVhZGVyJztcbmltcG9ydCB7IENvZGUzOVJlYWRlciB9IGZyb20gJy4vY29kZS0zOS1yZWFkZXInO1xuXG5leHBvcnQgY2xhc3MgQ29kZTM5VklOUmVhZGVyIGV4dGVuZHMgQ29kZTM5UmVhZGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9mb3JtYXQgPSAnY29kZV8zOV92aW4nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBib3Jyb3dzXG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL3p4aW5nL3p4aW5nL2Jsb2IvbWFzdGVyL2NvcmUvc3JjL21haW4vamF2YS9jb20vZ29vZ2xlL3p4aW5nL2NsaWVudC9yZXN1bHQvVklOUmVzdWx0UGFyc2VyLmphdmFcbiAgICAgKi9cbiAgICBkZWNvZGUoKTogQmFyY29kZSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHN1cGVyLmRlY29kZSgpO1xuICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY29kZSA9IHJlc3VsdC5jb2RlO1xuXG4gICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKC9bSU9RXS9nLCAnJyk7XG5cbiAgICAgICAgaWYgKCEvW0EtWjAtOV17MTd9Ly50ZXN0KGNvZGUpKSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgQVowOSBwYXR0ZXJuIGNvZGU6JywgY29kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fY2hlY2tDaGVja3N1bShjb2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQuY29kZSA9IGNvZGU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2hlY2tDaGVja3N1bShjb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgICByZXR1cm4gISFjb2RlO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJhcmNvZGUsIEJhcmNvZGVJbmZvLCBCYXJjb2RlUmVhZGVyIH0gZnJvbSAnLi9iYXJjb2RlLXJlYWRlcic7XG5cbmNvbnN0IEFMUEhBQkVUSF9TVFJJTkcgPSAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaLS4gJC8rJWFiY2QqJztcbmNvbnN0IEFMUEhBQkVUID0gbmV3IFVpbnQxNkFycmF5KFsuLi5BTFBIQUJFVEhfU1RSSU5HXS5tYXAoY2hhciA9PiBjaGFyLmNoYXJDb2RlQXQoMCkpKTtcbmNvbnN0IENIQVJBQ1RFUl9FTkNPRElOR1MgPSBuZXcgVWludDE2QXJyYXkoW1xuICAgIDB4MTE0LCAweDE0OCwgMHgxNDQsIDB4MTQyLCAweDEyOCwgMHgxMjQsIDB4MTIyLCAweDE1MCwgMHgxMTIsIDB4MTBBLCAweDFBOCwgMHgxQTQsIDB4MUEyLCAweDE5NCwgMHgxOTIsIDB4MThBLFxuICAgIDB4MTY4LCAweDE2NCwgMHgxNjIsIDB4MTM0LCAweDExQSwgMHgxNTgsIDB4MTRDLCAweDE0NiwgMHgxMkMsIDB4MTE2LCAweDFCNCwgMHgxQjIsIDB4MUFDLCAweDFBNiwgMHgxOTYsIDB4MTlBLFxuICAgIDB4MTZDLCAweDE2NiwgMHgxMzYsIDB4MTNBLCAweDEyRSwgMHgxRDQsIDB4MUQyLCAweDFDQSwgMHgxNkUsIDB4MTc2LCAweDFBRSwgMHgxMjYsIDB4MURBLCAweDFENiwgMHgxMzIsIDB4MTVFXG5dKTtcbmNvbnN0IEFTVEVSSVNLID0gMHgxNUU7XG5cbmV4cG9ydCBjbGFzcyBDb2RlOTNSZWFkZXIgZXh0ZW5kcyBCYXJjb2RlUmVhZGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9mb3JtYXQgPSAnY29kZV85Myc7XG4gICAgfVxuXG4gICAgZGVjb2RlKCk6IEJhcmNvZGUge1xuICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuX2ZpbmRTdGFydCgpO1xuXG4gICAgICAgIGlmICghc3RhcnQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XG4gICAgICAgIGxldCBjb3VudGVycyA9IG5ldyBVaW50MTZBcnJheSg2KTtcbiAgICAgICAgbGV0IGRlY29kZWRDaGFyOiBzdHJpbmc7XG4gICAgICAgIGxldCBsYXN0U3RhcnQ6IG51bWJlcjtcbiAgICAgICAgbGV0IG5leHRTdGFydCA9IHRoaXMuX25leHRTZXQodGhpcy5fcm93LCBzdGFydC5lbmQpO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHRoaXMuX3RvQ291bnRlcnMobmV4dFN0YXJ0LCBjb3VudGVycyk7XG4gICAgICAgICAgICBjb25zdCBwYXR0ZXJuID0gdGhpcy5fdG9QYXR0ZXJuKGNvdW50ZXJzKTtcbiAgICAgICAgICAgIGlmIChwYXR0ZXJuIDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVjb2RlZENoYXIgPSB0aGlzLl9wYXR0ZXJuVG9DaGFyKHBhdHRlcm4pO1xuICAgICAgICAgICAgaWYgKGRlY29kZWRDaGFyID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaChkZWNvZGVkQ2hhcik7XG4gICAgICAgICAgICBsYXN0U3RhcnQgPSBuZXh0U3RhcnQ7XG4gICAgICAgICAgICBuZXh0U3RhcnQgKz0gY291bnRlcnMucmVkdWNlKChzdW0sIGl0ZW0pID0+IHN1bSArIGl0ZW0sIDApO1xuICAgICAgICAgICAgbmV4dFN0YXJ0ID0gdGhpcy5fbmV4dFNldCh0aGlzLl9yb3csIG5leHRTdGFydCk7XG4gICAgICAgIH0gd2hpbGUgKGRlY29kZWRDaGFyICE9PSAnKicpO1xuICAgICAgICByZXN1bHQucG9wKCk7XG5cbiAgICAgICAgaWYgKCFyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fdmVyaWZ5RW5kKGxhc3RTdGFydCwgbmV4dFN0YXJ0KSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX3ZlcmlmeUNoZWNrc3VtcyhyZXN1bHQpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5zbGljZSgwLCByZXN1bHQubGVuZ3RoIC0gMik7XG4gICAgICAgIGlmICgocmVzdWx0ID0gdGhpcy5fZGVjb2RlRXh0ZW5kZWQocmVzdWx0KSkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvZGU6IHJlc3VsdC5qb2luKCcnKSxcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydC5zdGFydCxcbiAgICAgICAgICAgIGVuZDogbmV4dFN0YXJ0LFxuICAgICAgICAgICAgc3RhcnRJbmZvOiBzdGFydCxcbiAgICAgICAgICAgIGRlY29kZWRDb2RlczogcmVzdWx0XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9wYXR0ZXJuVG9DaGFyKHBhdHRlcm46IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQ0hBUkFDVEVSX0VOQ09ESU5HUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKENIQVJBQ1RFUl9FTkNPRElOR1NbaV0gPT09IHBhdHRlcm4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShBTFBIQUJFVFtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmVyaWZ5RW5kKGxhc3RTdGFydDogbnVtYmVyLCBuZXh0U3RhcnQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAobGFzdFN0YXJ0ID09PSBuZXh0U3RhcnQgfHwgIXRoaXMuX3Jvd1tuZXh0U3RhcnRdKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdG9QYXR0ZXJuKGNvdW50ZXJzOiBVaW50MTZBcnJheSk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IG51bUNvdW50ZXJzID0gY291bnRlcnMubGVuZ3RoO1xuICAgICAgICBsZXQgcGF0dGVybiA9IDA7XG4gICAgICAgIGxldCBzdW0gPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvdW50ZXJzOyBpKyspIHtcbiAgICAgICAgICAgIHN1bSArPSBjb3VudGVyc1tpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ291bnRlcnM7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5vcm1hbGl6ZWQgPSBNYXRoLnJvdW5kKGNvdW50ZXJzW2ldICogOSAvIHN1bSk7XG4gICAgICAgICAgICBpZiAobm9ybWFsaXplZCA8IDEgfHwgbm9ybWFsaXplZCA+IDQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKGkgJiAxKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbm9ybWFsaXplZDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm4gPSAocGF0dGVybiA8PCAxKSB8IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXR0ZXJuIDw8PSBub3JtYWxpemVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhdHRlcm47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZmluZFN0YXJ0KCk6IEJhcmNvZGVJbmZvIHtcbiAgICAgICAgY29uc3QgY291bnRlciA9IG5ldyBVaW50MTZBcnJheSg2KTtcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5fbmV4dFNldCh0aGlzLl9yb3cpO1xuICAgICAgICBsZXQgcGF0dGVyblN0YXJ0ID0gb2Zmc2V0O1xuICAgICAgICBsZXQgY291bnRlclBvcyA9IDA7XG4gICAgICAgIGxldCBpc1doaXRlOiAwIHwgMSA9IDA7XG4gICAgICAgIGxldCB3aGl0ZVNwYWNlTXVzdFN0YXJ0OiBudW1iZXI7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IG9mZnNldDsgaSA8IHRoaXMuX3Jvdy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3Jvd1tpXSBeIGlzV2hpdGUpIHtcbiAgICAgICAgICAgICAgICBjb3VudGVyW2NvdW50ZXJQb3NdKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChjb3VudGVyUG9zID09PSBjb3VudGVyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZmluZCBzdGFydCBwYXR0ZXJuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl90b1BhdHRlcm4oY291bnRlcikgPT09IEFTVEVSSVNLKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlTXVzdFN0YXJ0ID0gTWF0aC5tYXgoMCwgcGF0dGVyblN0YXJ0IC0gKChpIC0gcGF0dGVyblN0YXJ0KSAvIDQpKSB8IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWF0Y2hSYW5nZSh3aGl0ZVNwYWNlTXVzdFN0YXJ0LCBwYXR0ZXJuU3RhcnQsIDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHBhdHRlcm5TdGFydCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm5TdGFydCArPSBjb3VudGVyWzBdICsgY291bnRlclsxXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA0OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXJbal0gPSBjb3VudGVyW2ogKyAyXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyWzRdID0gMDtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcls1XSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJQb3MtLTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xuICAgICAgICAgICAgICAgIGlzV2hpdGUgPSBpc1doaXRlID8gMCA6IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kZWNvZGVFeHRlbmRlZChjaGFyQXJyYXk6IEFycmF5PHN0cmluZz4pOiBBcnJheTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gY2hhckFycmF5Lmxlbmd0aDtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5PHN0cmluZz4oKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2hhciA9IGNoYXJBcnJheVtpXTtcbiAgICAgICAgICAgIGlmIChjaGFyID49ICdhJyAmJiBjaGFyIDw9ICdkJykge1xuICAgICAgICAgICAgICAgIGlmIChpID4gKGxlbmd0aCAtIDIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0Q2hhciA9IGNoYXJBcnJheVsrK2ldO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRDaGFyQ29kZSA9IG5leHRDaGFyLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgICAgICAgICAgbGV0IGRlY29kZWRDaGFyOiBzdHJpbmc7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjaGFyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2EnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dENoYXIgPj0gJ0EnICYmIG5leHRDaGFyIDw9ICdaJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlY29kZWRDaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShuZXh0Q2hhckNvZGUgLSA2NCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0Q2hhciA+PSAnQScgJiYgbmV4dENoYXIgPD0gJ0UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVjb2RlZENoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKG5leHRDaGFyQ29kZSAtIDM4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dENoYXIgPj0gJ0YnICYmIG5leHRDaGFyIDw9ICdKJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlY29kZWRDaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShuZXh0Q2hhckNvZGUgLSAxMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRDaGFyID49ICdLJyAmJiBuZXh0Q2hhciA8PSAnTycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWNvZGVkQ2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUobmV4dENoYXJDb2RlICsgMTYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuZXh0Q2hhciA+PSAnUCcgJiYgbmV4dENoYXIgPD0gJ1MnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVjb2RlZENoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKG5leHRDaGFyQ29kZSArIDQzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dENoYXIgPj0gJ1QnICYmIG5leHRDaGFyIDw9ICdaJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlY29kZWRDaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZSgxMjcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2MnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dENoYXIgPj0gJ0EnICYmIG5leHRDaGFyIDw9ICdPJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlY29kZWRDaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShuZXh0Q2hhckNvZGUgLSAzMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRDaGFyID09PSAnWicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWNvZGVkQ2hhciA9ICc6JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXNlICdkJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRDaGFyID49ICdBJyAmJiBuZXh0Q2hhciA8PSAnWicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWNvZGVkQ2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUobmV4dENoYXJDb2RlICsgMzIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGRlY29kZWRDaGFyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY2hhcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF92ZXJpZnlDaGVja3N1bXMoY2hhckFycmF5OiBBcnJheTxzdHJpbmc+KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXRjaENoZWNrQ2hhcihjaGFyQXJyYXksIGNoYXJBcnJheS5sZW5ndGggLSAyLCAyMClcbiAgICAgICAgICAgICYmIHRoaXMuX21hdGNoQ2hlY2tDaGFyKGNoYXJBcnJheSwgY2hhckFycmF5Lmxlbmd0aCAtIDEsIDE1KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tYXRjaENoZWNrQ2hhcihjaGFyQXJyYXk6IEFycmF5PHN0cmluZz4sIGluZGV4OiBudW1iZXIsIG1heFdlaWdodDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGFycmF5VG9DaGVjayA9IGNoYXJBcnJheS5zbGljZSgwLCBpbmRleCk7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IGFycmF5VG9DaGVjay5sZW5ndGg7XG4gICAgICAgIGNvbnN0IHdlaWdodGVkU3VtcyA9IGFycmF5VG9DaGVjay5yZWR1Y2UoKHN1bSwgY2hhciwgaSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgd2VpZ2h0ID0gKCgoaSAqIC0xKSArIChsZW5ndGggLSAxKSkgJSBtYXhXZWlnaHQpICsgMTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gQUxQSEFCRVQuaW5kZXhPZihjaGFyLmNoYXJDb2RlQXQoMCkpO1xuICAgICAgICAgICAgcmV0dXJuIHN1bSArICh3ZWlnaHQgKiB2YWx1ZSk7XG4gICAgICAgIH0sIDApO1xuXG4gICAgICAgIGNvbnN0IGNoZWNrQ2hhciA9IEFMUEhBQkVUWyh3ZWlnaHRlZFN1bXMgJSA0NyldO1xuICAgICAgICByZXR1cm4gY2hlY2tDaGFyID09PSBjaGFyQXJyYXlbaW5kZXhdLmNoYXJDb2RlQXQoMCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQmFyY29kZSwgQmFyY29kZUluZm8sIEJhcmNvZGVSZWFkZXIsIEJhcmNvZGVSZWFkZXJDb25maWcgfSBmcm9tICcuL2JhcmNvZGUtcmVhZGVyJztcbmltcG9ydCB7IEVBTlJlYWRlciB9IGZyb20gJy4vZWFuLXJlYWRlcic7XG5cbmV4cG9ydCBjbGFzcyBFQU4yUmVhZGVyIGV4dGVuZHMgRUFOUmVhZGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc/OiBCYXJjb2RlUmVhZGVyQ29uZmlnLCBzdXBwbGVtZW50cz86IEFycmF5PEJhcmNvZGVSZWFkZXI+KSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZywgc3VwcGxlbWVudHMpO1xuXG4gICAgICAgIHRoaXMuX2Zvcm1hdCA9ICdlYW5fMic7XG4gICAgfVxuXG4gICAgZGVjb2RlKHJvdz86IEFycmF5PG51bWJlcj4sIHN0YXJ0PzogbnVtYmVyKTogQmFyY29kZSB7XG4gICAgICAgIGNvbnN0IGVuZCA9IHJvdy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheTxudW1iZXI+KCk7XG4gICAgICAgIGNvbnN0IGRlY29kZWRDb2RlcyA9IG5ldyBBcnJheTxCYXJjb2RlSW5mbz4oKTtcbiAgICAgICAgbGV0IG9mZnNldCA9IHN0YXJ0O1xuICAgICAgICBsZXQgY29kZUZyZXF1ZW5jeSA9IDA7XG4gICAgICAgIGxldCBjb2RlOiBCYXJjb2RlSW5mbztcblxuICAgICAgICB0aGlzLl9yb3cgPSByb3c7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyICYmIG9mZnNldCA8IGVuZDsgaSsrKSB7XG4gICAgICAgICAgICBjb2RlID0gdGhpcy5fZGVjb2RlQ29kZShvZmZzZXQpO1xuICAgICAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSAlIDEwKTtcbiAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgPj0gdGhpcy5DT0RFX0dfU1RBUlQpIHtcbiAgICAgICAgICAgICAgICBjb2RlRnJlcXVlbmN5IHw9IDEgPDwgKDEgLSBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gdGhpcy5fbmV4dFNldCh0aGlzLl9yb3csIGNvZGUuZW5kKTtcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSB0aGlzLl9uZXh0VW5zZXQodGhpcy5fcm93LCBvZmZzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggIT09IDIgfHwgKHBhcnNlSW50KHJlc3VsdC5qb2luKCcnKSkgJSA0KSAhPT0gY29kZUZyZXF1ZW5jeSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29kZTogcmVzdWx0LmpvaW4oJycpLFxuICAgICAgICAgICAgZGVjb2RlZENvZGVzLFxuICAgICAgICAgICAgZW5kOiBjb2RlLmVuZFxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJhcmNvZGUsIEJhcmNvZGVJbmZvLCBCYXJjb2RlUmVhZGVyLCBCYXJjb2RlUmVhZGVyQ29uZmlnIH0gZnJvbSAnLi9iYXJjb2RlLXJlYWRlcic7XG5pbXBvcnQgeyBFQU5SZWFkZXIgfSBmcm9tICcuL2Vhbi1yZWFkZXInO1xuXG5leHBvcnQgY2xhc3MgRUFONVJlYWRlciBleHRlbmRzIEVBTlJlYWRlciB7XG4gICAgZ2V0IENIRUNLX0RJR0lUX0VOQ09ESU5HUygpOiBBcnJheTxudW1iZXI+IHtcbiAgICAgICAgcmV0dXJuIFsyNCwgMjAsIDE4LCAxNywgMTIsIDYsIDMsIDEwLCA5LCA1XTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWc/OiBCYXJjb2RlUmVhZGVyQ29uZmlnLCBzdXBwbGVtZW50cz86IEFycmF5PEJhcmNvZGVSZWFkZXI+KSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZywgc3VwcGxlbWVudHMpO1xuXG4gICAgICAgIHRoaXMuX2Zvcm1hdCA9ICdlYW5fNSc7XG4gICAgfVxuXG4gICAgZGVjb2RlKHJvdz86IEFycmF5PG51bWJlcj4sIHN0YXJ0PzogbnVtYmVyKTogQmFyY29kZSB7XG4gICAgICAgIGNvbnN0IGVuZCA9IHJvdy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheTxudW1iZXI+KCk7XG4gICAgICAgIGNvbnN0IGRlY29kZWRDb2RlcyA9IG5ldyBBcnJheTxCYXJjb2RlSW5mbz4oKTtcbiAgICAgICAgbGV0IGNvZGVGcmVxdWVuY3kgPSAwO1xuICAgICAgICBsZXQgb2Zmc2V0ID0gc3RhcnQ7XG4gICAgICAgIGxldCBjb2RlOiBCYXJjb2RlSW5mbztcblxuICAgICAgICB0aGlzLl9yb3cgPSByb3c7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1ICYmIG9mZnNldCA8IGVuZDsgaSsrKSB7XG4gICAgICAgICAgICBjb2RlID0gdGhpcy5fZGVjb2RlQ29kZShvZmZzZXQpO1xuICAgICAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSAlIDEwKTtcbiAgICAgICAgICAgIGlmIChjb2RlLmNvZGUgPj0gdGhpcy5DT0RFX0dfU1RBUlQpIHtcbiAgICAgICAgICAgICAgICBjb2RlRnJlcXVlbmN5IHw9IDEgPDwgKDQgLSBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpICE9PSA0KSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gdGhpcy5fbmV4dFNldCh0aGlzLl9yb3csIGNvZGUuZW5kKTtcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSB0aGlzLl9uZXh0VW5zZXQodGhpcy5fcm93LCBvZmZzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggIT09IDUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2V4dGVuc2lvbkNoZWNrc3VtKHJlc3VsdCkgIT09IHRoaXMuX2RldGVybWluZUNoZWNrRGlnaXQoY29kZUZyZXF1ZW5jeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvZGU6IHJlc3VsdC5qb2luKCcnKSxcbiAgICAgICAgICAgIGRlY29kZWRDb2RlcyxcbiAgICAgICAgICAgIGVuZDogY29kZS5lbmRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kZXRlcm1pbmVDaGVja0RpZ2l0KGNvZGVGcmVxdWVuY3k6IG51bWJlcik6IG51bWJlciB8IG51bGwge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjb2RlRnJlcXVlbmN5ID09PSB0aGlzLkNIRUNLX0RJR0lUX0VOQ09ESU5HU1tpXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2V4dGVuc2lvbkNoZWNrc3VtKHJlc3VsdDogQXJyYXk8bnVtYmVyPik6IG51bWJlciB7XG4gICAgICAgIGxldCBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuICAgICAgICBsZXQgc3VtID0gMDtcblxuICAgICAgICBmb3IgKGxldCBpID0gbGVuZ3RoIC0gMjsgaSA+PSAwOyBpIC09IDIpIHtcbiAgICAgICAgICAgIHN1bSArPSByZXN1bHRbaV07XG4gICAgICAgIH1cbiAgICAgICAgc3VtICo9IDM7XG4gICAgICAgIGZvciAobGV0IGkgPSBsZW5ndGggLSAxOyBpID49IDA7IGkgLT0gMikge1xuICAgICAgICAgICAgc3VtICs9IHJlc3VsdFtpXTtcbiAgICAgICAgfVxuICAgICAgICBzdW0gKj0gMztcblxuICAgICAgICByZXR1cm4gc3VtICUgMTA7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQmFyY29kZUluZm8sIEJhcmNvZGVSZWFkZXIsIEJhcmNvZGVSZWFkZXJDb25maWcgfSBmcm9tICcuL2JhcmNvZGUtcmVhZGVyJztcbmltcG9ydCB7IEVBTlJlYWRlciB9IGZyb20gJy4vZWFuLXJlYWRlcic7XG5cbmV4cG9ydCBjbGFzcyBFQU44UmVhZGVyIGV4dGVuZHMgRUFOUmVhZGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc/OiBCYXJjb2RlUmVhZGVyQ29uZmlnLCBzdXBwbGVtZW50cz86IEFycmF5PEJhcmNvZGVSZWFkZXI+KSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZywgc3VwcGxlbWVudHMpO1xuXG4gICAgICAgIHRoaXMuX2Zvcm1hdCA9ICdlYW5fOCc7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9kZWNvZGVQYXlsb2FkKGNvZGU6IEJhcmNvZGVJbmZvLCByZXN1bHQ6IEFycmF5PG51bWJlcj4sIGRlY29kZWRDb2RlczogQXJyYXk8QmFyY29kZUluZm8+KTogQmFyY29kZUluZm8ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgY29kZSA9IHRoaXMuX2RlY29kZUNvZGUoY29kZS5lbmQsIHRoaXMuQ09ERV9HX1NUQVJUKTtcbiAgICAgICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goY29kZS5jb2RlKTtcbiAgICAgICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29kZSA9IHRoaXMuX2ZpbmRQYXR0ZXJuKHRoaXMuTUlERExFX1BBVFRFUk4sIGNvZGUuZW5kLCAxLCBmYWxzZSk7XG5cbiAgICAgICAgaWYgKGNvZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIGNvZGUgPSB0aGlzLl9kZWNvZGVDb2RlKGNvZGUuZW5kLCB0aGlzLkNPREVfR19TVEFSVCk7XG5cbiAgICAgICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29kZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBtZXJnZSB9IGZyb20gJy4uL2NvbW1vbi9tZXJnZSc7XG5pbXBvcnQgeyBCYXJjb2RlLCBCYXJjb2RlSW5mbywgQmFyY29kZVJlYWRlciwgQmFyY29kZVJlYWRlckNvbmZpZyB9IGZyb20gJy4vYmFyY29kZS1yZWFkZXInO1xuXG5jb25zdCBFWFRFTlNJT05fU1RBUlRfUEFUVEVSTiA9IFsxLCAxLCAyXTtcbmNvbnN0IENPREVfUEFUVEVSTiA9IFtcbiAgICBbMywgMiwgMSwgMV0sXG4gICAgWzIsIDIsIDIsIDFdLFxuICAgIFsyLCAxLCAyLCAyXSxcbiAgICBbMSwgNCwgMSwgMV0sXG4gICAgWzEsIDEsIDMsIDJdLFxuICAgIFsxLCAyLCAzLCAxXSxcbiAgICBbMSwgMSwgMSwgNF0sXG4gICAgWzEsIDMsIDEsIDJdLFxuICAgIFsxLCAyLCAxLCAzXSxcbiAgICBbMywgMSwgMSwgMl0sXG4gICAgWzEsIDEsIDIsIDNdLFxuICAgIFsxLCAyLCAyLCAyXSxcbiAgICBbMiwgMiwgMSwgMl0sXG4gICAgWzEsIDEsIDQsIDFdLFxuICAgIFsyLCAzLCAxLCAxXSxcbiAgICBbMSwgMywgMiwgMV0sXG4gICAgWzQsIDEsIDEsIDFdLFxuICAgIFsyLCAxLCAzLCAxXSxcbiAgICBbMywgMSwgMiwgMV0sXG4gICAgWzIsIDEsIDEsIDNdXG5dO1xuY29uc3QgQ09ERV9GUkVRVUVOQ1kgPSBbMCwgMTEsIDEzLCAxNCwgMTksIDI1LCAyOCwgMjEsIDIyLCAyNl07XG5cbmV4cG9ydCBjbGFzcyBFQU5SZWFkZXIgZXh0ZW5kcyBCYXJjb2RlUmVhZGVyIHtcbiAgICBnZXQgQ09ERV9MX1NUQVJUKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGdldCBDT0RFX0dfU1RBUlQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIDEwO1xuICAgIH1cblxuICAgIGdldCBTVEFSVF9QQVRURVJOKCk6IEFycmF5PG51bWJlcj4ge1xuICAgICAgICByZXR1cm4gWzEsIDEsIDFdO1xuICAgIH1cblxuICAgIGdldCBTVE9QX1BBVFRFUk4oKTogQXJyYXk8bnVtYmVyPiB7XG4gICAgICAgIHJldHVybiBbMSwgMSwgMV07XG4gICAgfVxuXG4gICAgZ2V0IE1JRERMRV9QQVRURVJOKCk6IEFycmF5PG51bWJlcj4ge1xuICAgICAgICByZXR1cm4gWzEsIDEsIDEsIDEsIDFdO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZz86IEJhcmNvZGVSZWFkZXJDb25maWcsIHN1cHBsZW1lbnRzPzogQXJyYXk8QmFyY29kZVJlYWRlcj4pIHtcbiAgICAgICAgc3VwZXIobWVyZ2Uoe1xuICAgICAgICAgICAgc3VwcGxlbWVudHM6IFtdIC8vIEFsbG93ZWQgZXh0ZW5zaW9ucyB0byBiZSBkZWNvZGVkICgyIGFuZC9vciA1KVxuICAgICAgICB9LCBjb25maWcpLCBzdXBwbGVtZW50cyk7XG5cbiAgICAgICAgdGhpcy5fZm9ybWF0ID0gJ2Vhbl8xMyc7XG4gICAgICAgIHRoaXMuX3NpbmdsZUNvZGVFcnJvciA9IDAuNzA7XG4gICAgICAgIHRoaXMuX2F2ZXJhZ2VDb2RlRXJyb3IgPSAwLjQ4O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfZGVjb2RlQ29kZShzdGFydDogbnVtYmVyLCBjb2RlcmFuZ2U/OiBudW1iZXIpOiBCYXJjb2RlSW5mbyB7XG4gICAgICAgIGNvbnN0IGNvdW50ZXIgPSBbMCwgMCwgMCwgMF07XG4gICAgICAgIGNvbnN0IG9mZnNldCA9IHN0YXJ0O1xuICAgICAgICBjb25zdCBiZXN0TWF0Y2g6IEJhcmNvZGVJbmZvID0ge1xuICAgICAgICAgICAgZXJyb3I6IE51bWJlci5NQVhfVkFMVUUsXG4gICAgICAgICAgICBjb2RlOiAtMSxcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgIGVuZDogc3RhcnRcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZXBzaWxvbiA9IHRoaXMuQVZFUkFHRV9DT0RFX0VSUk9SO1xuICAgICAgICBsZXQgaXNXaGl0ZTogMCB8IDEgPSB0aGlzLl9yb3dbb2Zmc2V0XSA/IDAgOiAxO1xuICAgICAgICBsZXQgY291bnRlclBvcyA9IDA7XG5cbiAgICAgICAgaWYgKCFjb2RlcmFuZ2UpIHtcbiAgICAgICAgICAgIGNvZGVyYW5nZSA9IENPREVfUEFUVEVSTi5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gb2Zmc2V0OyBpIDwgdGhpcy5fcm93Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fcm93W2ldIF4gaXNXaGl0ZSkge1xuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10rKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ZXJQb3MgPT09IGNvdW50ZXIubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBjb2RlID0gMDsgY29kZSA8IGNvZGVyYW5nZTsgY29kZSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IHRoaXMuX21hdGNoUGF0dGVybihjb3VudGVyLCBDT0RFX1BBVFRFUk5bY29kZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIDwgYmVzdE1hdGNoLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLmNvZGUgPSBjb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5lbmQgPSBpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYmVzdE1hdGNoLmVycm9yID4gZXBzaWxvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJlc3RNYXRjaDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyUG9zKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvdW50ZXJbY291bnRlclBvc10gPSAxO1xuICAgICAgICAgICAgICAgIGlzV2hpdGUgPSBpc1doaXRlID8gMCA6IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2ZpbmRTdGFydCgpOiBCYXJjb2RlSW5mbyB7XG4gICAgICAgIGxldCBvZmZzZXQgPSB0aGlzLl9uZXh0U2V0KHRoaXMuX3Jvdyk7XG4gICAgICAgIGxldCBzdGFydEluZm86IEJhcmNvZGVJbmZvO1xuXG4gICAgICAgIHdoaWxlICghc3RhcnRJbmZvKSB7XG4gICAgICAgICAgICBzdGFydEluZm8gPSB0aGlzLl9maW5kUGF0dGVybih0aGlzLlNUQVJUX1BBVFRFUk4sIG9mZnNldCwgMCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmICghc3RhcnRJbmZvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGxlYWRpbmdXaGl0ZXNwYWNlU3RhcnQgPSBzdGFydEluZm8uc3RhcnQgLSAoc3RhcnRJbmZvLmVuZCAtIHN0YXJ0SW5mby5zdGFydCk7XG5cbiAgICAgICAgICAgIGlmIChsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0ID49IDApIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWF0Y2hSYW5nZShsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0LCBzdGFydEluZm8uc3RhcnQsIDApKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGFydEluZm87XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvZmZzZXQgPSBzdGFydEluZm8uZW5kO1xuICAgICAgICAgICAgc3RhcnRJbmZvID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlKGVuZEluZm86IEJhcmNvZGVJbmZvKTogQmFyY29kZUluZm8ge1xuICAgICAgICBjb25zdCB0cmFpbGluZ1doaXRlc3BhY2VFbmQgPSBlbmRJbmZvLmVuZCArIChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpO1xuXG4gICAgICAgIGlmICh0cmFpbGluZ1doaXRlc3BhY2VFbmQgPCB0aGlzLl9yb3cubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbWF0Y2hSYW5nZShlbmRJbmZvLmVuZCwgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kLCAwKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbmRJbmZvO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9maW5kRW5kKG9mZnNldDogbnVtYmVyLCBpc1doaXRlOiAwIHwgMSk6IEJhcmNvZGVJbmZvIHtcbiAgICAgICAgY29uc3QgZW5kSW5mbyA9IHRoaXMuX2ZpbmRQYXR0ZXJuKHRoaXMuU1RPUF9QQVRURVJOLCBvZmZzZXQsIGlzV2hpdGUsIGZhbHNlKTtcblxuICAgICAgICByZXR1cm4gZW5kSW5mbyAhPT0gbnVsbCA/IHRoaXMuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZShlbmRJbmZvKSA6IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2FsY3VsYXRlRmlyc3REaWdpdChjb2RlRnJlcXVlbmN5OiBudW1iZXIpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBDT0RFX0ZSRVFVRU5DWS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNvZGVGcmVxdWVuY3kgPT09IENPREVfRlJFUVVFTkNZW2ldKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9kZWNvZGVQYXlsb2FkKGNvZGU6IEJhcmNvZGVJbmZvLCByZXN1bHQ6IEFycmF5PG51bWJlcj4sIGRlY29kZWRDb2RlczogQXJyYXk8QmFyY29kZUluZm8+KTogQmFyY29kZUluZm8ge1xuICAgICAgICBsZXQgY29kZUZyZXF1ZW5jeSA9IDB4MDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgY29kZSA9IHRoaXMuX2RlY29kZUNvZGUoY29kZS5lbmQpO1xuICAgICAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29kZS5jb2RlID49IHRoaXMuQ09ERV9HX1NUQVJUKSB7XG4gICAgICAgICAgICAgICAgY29kZS5jb2RlIC09IHRoaXMuQ09ERV9HX1NUQVJUO1xuICAgICAgICAgICAgICAgIGNvZGVGcmVxdWVuY3kgfD0gMSA8PCAoNSAtIGkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb2RlRnJlcXVlbmN5IHw9IDAgPDwgKDUgLSBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvZGUuY29kZSk7XG4gICAgICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpcnN0RGlnaXQgPSB0aGlzLl9jYWxjdWxhdGVGaXJzdERpZ2l0KGNvZGVGcmVxdWVuY3kpO1xuXG4gICAgICAgIGlmIChmaXJzdERpZ2l0ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC51bnNoaWZ0KGZpcnN0RGlnaXQpO1xuXG4gICAgICAgIGNvZGUgPSB0aGlzLl9maW5kUGF0dGVybih0aGlzLk1JRERMRV9QQVRURVJOLCBjb2RlLmVuZCwgMSwgZmFsc2UpO1xuXG4gICAgICAgIGlmIChjb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgICAgICBjb2RlID0gdGhpcy5fZGVjb2RlQ29kZShjb2RlLmVuZCwgdGhpcy5DT0RFX0dfU1RBUlQpO1xuXG4gICAgICAgICAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XG4gICAgICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvZGU7XG4gICAgfVxuXG4gICAgZGVjb2RlKCk6IEJhcmNvZGUge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xuICAgICAgICBjb25zdCBkZWNvZGVkQ29kZXMgPSBuZXcgQXJyYXk8QmFyY29kZUluZm8+KCk7XG4gICAgICAgIGxldCByZXN1bHRJbmZvOiBCYXJjb2RlID0ge307XG4gICAgICAgIGxldCBzdGFydEluZm8gPSB0aGlzLl9maW5kU3RhcnQoKTtcblxuICAgICAgICBpZiAoIXN0YXJ0SW5mbykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY29kZTogQmFyY29kZUluZm8gPSB7XG4gICAgICAgICAgICBjb2RlOiBzdGFydEluZm8uY29kZSxcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydEluZm8uc3RhcnQsXG4gICAgICAgICAgICBlbmQ6IHN0YXJ0SW5mby5lbmRcbiAgICAgICAgfTtcbiAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XG5cbiAgICAgICAgY29kZSA9IHRoaXMuX2RlY29kZVBheWxvYWQoY29kZSwgcmVzdWx0LCBkZWNvZGVkQ29kZXMpO1xuXG4gICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb2RlID0gdGhpcy5fZmluZEVuZChjb2RlLmVuZCwgMCk7XG5cbiAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlY29kZWRDb2Rlcy5wdXNoKGNvZGUpO1xuXG4gICAgICAgIC8vIENoZWNrc3VtXG4gICAgICAgIGlmICghdGhpcy5fY2hlY2tzdW0ocmVzdWx0KSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zdXBwbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBzdXBwbGVtZW50ID0gdGhpcy5fZGVjb2RlRXh0ZW5zaW9ucyhjb2RlLmVuZCk7XG4gICAgICAgICAgICBpZiAoIXN1cHBsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbGFzdENvZGUgPSBzdXBwbGVtZW50LmRlY29kZWRDb2Rlc1tzdXBwbGVtZW50LmRlY29kZWRDb2Rlcy5sZW5ndGggLSAxXSBhcyBCYXJjb2RlSW5mbztcbiAgICAgICAgICAgIGNvbnN0IGVuZEluZm8gPSB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IGxhc3RDb2RlLnN0YXJ0ICsgKCgobGFzdENvZGUuZW5kIC0gbGFzdENvZGUuc3RhcnQpIC8gMikgfCAwKSxcbiAgICAgICAgICAgICAgICBlbmQ6IGxhc3RDb2RlLmVuZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLl92ZXJpZnlUcmFpbGluZ1doaXRlc3BhY2UoZW5kSW5mbykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzdWx0SW5mbyA9IHtcbiAgICAgICAgICAgICAgICBzdXBwbGVtZW50LFxuICAgICAgICAgICAgICAgIGNvZGU6IHJlc3VsdC5qb2luKCcnKSArIHN1cHBsZW1lbnQuY29kZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2RlOiByZXN1bHQuam9pbignJyksXG4gICAgICAgICAgICBzdGFydDogc3RhcnRJbmZvLnN0YXJ0LFxuICAgICAgICAgICAgZW5kOiBjb2RlLmVuZCxcbiAgICAgICAgICAgIHN0YXJ0SW5mbyxcbiAgICAgICAgICAgIGRlY29kZWRDb2RlcyxcbiAgICAgICAgICAgIC4uLnJlc3VsdEluZm9cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kZWNvZGVFeHRlbnNpb25zKG9mZnNldDogbnVtYmVyKTogQmFyY29kZSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5fbmV4dFNldCh0aGlzLl9yb3csIG9mZnNldCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0SW5mbyA9IHRoaXMuX2ZpbmRQYXR0ZXJuKEVYVEVOU0lPTl9TVEFSVF9QQVRURVJOLCBzdGFydCwgMCwgZmFsc2UpO1xuXG4gICAgICAgIGlmIChzdGFydEluZm8gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN1cHBsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5zdXBwbGVtZW50c1tpXS5kZWNvZGUodGhpcy5fcm93LCBzdGFydEluZm8uZW5kKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiByZXN1bHQuY29kZSxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0SW5mbyxcbiAgICAgICAgICAgICAgICAgICAgZW5kOiByZXN1bHQuZW5kLFxuICAgICAgICAgICAgICAgICAgICBkZWNvZGVkQ29kZXM6IHJlc3VsdC5kZWNvZGVkQ29kZXNcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9jaGVja3N1bShyZXN1bHQ6IEFycmF5PG51bWJlcj4pOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHN1bSA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IHJlc3VsdC5sZW5ndGggLSAyOyBpID49IDA7IGkgLT0gMikge1xuICAgICAgICAgICAgc3VtICs9IHJlc3VsdFtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1bSAqPSAzO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSByZXN1bHQubGVuZ3RoIC0gMTsgaSA+PSAwOyBpIC09IDIpIHtcbiAgICAgICAgICAgIHN1bSArPSByZXN1bHRbaV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3VtICUgMTAgPT09IDA7XG4gICAgfVxufSIsImltcG9ydCB7IG1lcmdlIH0gZnJvbSAnLi4vY29tbW9uL21lcmdlJztcbmltcG9ydCB7IEJhcmNvZGUsIEJhcmNvZGVJbmZvLCBCYXJjb2RlUmVhZGVyLCBCYXJjb2RlUmVhZGVyQ29uZmlnIH0gZnJvbSAnLi9iYXJjb2RlLXJlYWRlcic7XG5cbmNvbnN0IE4gPSAxO1xuY29uc3QgVyA9IDM7XG5jb25zdCBTVEFSVF9QQVRURVJOID0gW04sIE4sIE4sIE5dO1xuY29uc3QgU1RPUF9QQVRURVJOID0gW04sIE4sIFddO1xuY29uc3QgQ09ERV9QQVRURVJOID0gW1xuICAgIFtOLCBOLCBXLCBXLCBOXSxcbiAgICBbVywgTiwgTiwgTiwgV10sXG4gICAgW04sIFcsIE4sIE4sIFddLFxuICAgIFtXLCBXLCBOLCBOLCBOXSxcbiAgICBbTiwgTiwgVywgTiwgV10sXG4gICAgW1csIE4sIFcsIE4sIE5dLFxuICAgIFtOLCBXLCBXLCBOLCBOXSxcbiAgICBbTiwgTiwgTiwgVywgV10sXG4gICAgW1csIE4sIE4sIFcsIE5dLFxuICAgIFtOLCBXLCBOLCBXLCBOXVxuXTtcbmNvbnN0IE1BWF9DT1JSRUNUSU9OX0ZBQ1RPUiA9IDU7XG5cbmV4cG9ydCBjbGFzcyBJMm9mNVJlYWRlciBleHRlbmRzIEJhcmNvZGVSZWFkZXIge1xuICAgIHByaXZhdGUgX2JhclNwYWNlUmF0aW86IFtudW1iZXIsIG51bWJlcl07XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWc/OiBCYXJjb2RlUmVhZGVyQ29uZmlnKSB7XG4gICAgICAgIHN1cGVyKG1lcmdlKHtcbiAgICAgICAgICAgIG5vcm1hbGl6ZUJhclNwYWNlV2lkdGg6IGZhbHNlIC8vIE5vcm1hbGl6ZSB0aGUgd2lkdGggZGlmZmVyZW5jZSBiZXR3ZWVuIGJhcnMgYW5kIHNwYWNlc1xuICAgICAgICB9LCBjb25maWcpKTtcblxuICAgICAgICB0aGlzLl9iYXJTcGFjZVJhdGlvID0gWzEsIDFdO1xuICAgICAgICB0aGlzLl9mb3JtYXQgPSAnaTJvZjUnO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5ub3JtYWxpemVCYXJTcGFjZVdpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLl9zaW5nbGVDb2RlRXJyb3IgPSAwLjM4O1xuICAgICAgICAgICAgdGhpcy5fYXZlcmFnZUNvZGVFcnJvciA9IDAuMDk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zaW5nbGVDb2RlRXJyb3IgPSAwLjc4O1xuICAgICAgICAgICAgdGhpcy5fYXZlcmFnZUNvZGVFcnJvciA9IDAuMzg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWNvZGUoKTogQmFyY29kZSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0SW5mbyA9IHRoaXMuX2ZpbmRTdGFydCgpO1xuXG4gICAgICAgIGlmICghc3RhcnRJbmZvKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVuZEluZm8gPSB0aGlzLl9maW5kRW5kKCk7XG5cbiAgICAgICAgaWYgKCFlbmRJbmZvKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvdW50ZXJzID0gdGhpcy5fZmlsbENvdW50ZXJzKHN0YXJ0SW5mby5lbmQsIGVuZEluZm8uc3RhcnQsIDApO1xuXG4gICAgICAgIGlmIChjb3VudGVycy5sZW5ndGggJSAxMCAhPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xuICAgICAgICBjb25zdCBkZWNvZGVkQ29kZXMgPSBuZXcgQXJyYXk8QmFyY29kZUluZm8+KCk7XG5cbiAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goc3RhcnRJbmZvKTtcblxuICAgICAgICBjb25zdCBjb2RlID0gdGhpcy5fZGVjb2RlUGF5bG9hZChjb3VudGVycywgcmVzdWx0LCBkZWNvZGVkQ29kZXMpO1xuXG4gICAgICAgIGlmICghY29kZSB8fCByZXN1bHQubGVuZ3RoICUgMiAhPT0gMCB8fCByZXN1bHQubGVuZ3RoIDwgNikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChlbmRJbmZvKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29kZTogcmVzdWx0LmpvaW4oJycpLFxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0SW5mby5zdGFydCxcbiAgICAgICAgICAgIGVuZDogZW5kSW5mby5lbmQsXG4gICAgICAgICAgICBzdGFydEluZm8sXG4gICAgICAgICAgICBkZWNvZGVkQ29kZXNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX21hdGNoUGF0dGVybihjb3VudGVyOiBBcnJheTxudW1iZXI+LCBjb2RlOiBSZWFkb25seUFycmF5PG51bWJlcj4pOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5jb25maWcubm9ybWFsaXplQmFyU3BhY2VXaWR0aCkge1xuICAgICAgICAgICAgY29uc3QgY291bnRlclN1bTogW251bWJlciwgbnVtYmVyXSA9IFswLCAwXTtcbiAgICAgICAgICAgIGNvbnN0IGNvZGVTdW06IFtudW1iZXIsIG51bWJlcl0gPSBbMCwgMF07XG4gICAgICAgICAgICBjb25zdCBjb3JyZWN0aW9uOiBbbnVtYmVyLCBudW1iZXJdID0gWzAsIDBdO1xuICAgICAgICAgICAgY29uc3QgY29ycmVjdGlvblJhdGlvID0gTUFYX0NPUlJFQ1RJT05fRkFDVE9SO1xuICAgICAgICAgICAgY29uc3QgY29ycmVjdGlvblJhdGlvSW52ZXJzZSA9IDEgLyBjb3JyZWN0aW9uUmF0aW87XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvdW50ZXJTdW1baSAlIDJdICs9IGNvdW50ZXJbaV07XG4gICAgICAgICAgICAgICAgY29kZVN1bVtpICUgMl0gKz0gY29kZVtpXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29ycmVjdGlvblswXSA9IGNvZGVTdW1bMF0gLyBjb3VudGVyU3VtWzBdO1xuICAgICAgICAgICAgY29ycmVjdGlvblsxXSA9IGNvZGVTdW1bMV0gLyBjb3VudGVyU3VtWzFdO1xuXG4gICAgICAgICAgICBjb3JyZWN0aW9uWzBdID0gTWF0aC5tYXgoTWF0aC5taW4oY29ycmVjdGlvblswXSwgY29ycmVjdGlvblJhdGlvKSwgY29ycmVjdGlvblJhdGlvSW52ZXJzZSk7XG4gICAgICAgICAgICBjb3JyZWN0aW9uWzFdID0gTWF0aC5tYXgoTWF0aC5taW4oY29ycmVjdGlvblsxXSwgY29ycmVjdGlvblJhdGlvKSwgY29ycmVjdGlvblJhdGlvSW52ZXJzZSk7XG4gICAgICAgICAgICB0aGlzLl9iYXJTcGFjZVJhdGlvID0gY29ycmVjdGlvbjtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY291bnRlcltpXSAqPSB0aGlzLl9iYXJTcGFjZVJhdGlvW2kgJSAyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdXBlci5fbWF0Y2hQYXR0ZXJuKGNvdW50ZXIsIGNvZGUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfZmluZFN0YXJ0KCk6IEJhcmNvZGVJbmZvIHtcbiAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMuX25leHRTZXQodGhpcy5fcm93KTtcbiAgICAgICAgbGV0IHN0YXJ0SW5mbzogQmFyY29kZUluZm87XG5cbiAgICAgICAgd2hpbGUgKCFzdGFydEluZm8pIHtcbiAgICAgICAgICAgIHN0YXJ0SW5mbyA9IHRoaXMuX2ZpbmRQYXR0ZXJuKFNUQVJUX1BBVFRFUk4sIG9mZnNldCwgMCwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAoIXN0YXJ0SW5mbykge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBuYXJyb3dCYXJXaWR0aCA9IChzdGFydEluZm8uZW5kIC0gc3RhcnRJbmZvLnN0YXJ0KSA+PiAyO1xuICAgICAgICAgICAgY29uc3QgbGVhZGluZ1doaXRlc3BhY2VTdGFydCA9IHN0YXJ0SW5mby5zdGFydCAtIG5hcnJvd0JhcldpZHRoICogMTA7XG5cbiAgICAgICAgICAgIGlmIChsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0ID49IDApIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWF0Y2hSYW5nZShsZWFkaW5nV2hpdGVzcGFjZVN0YXJ0LCBzdGFydEluZm8uc3RhcnQsIDApKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGFydEluZm87XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvZmZzZXQgPSBzdGFydEluZm8uZW5kO1xuICAgICAgICAgICAgc3RhcnRJbmZvID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfdmVyaWZ5VHJhaWxpbmdXaGl0ZXNwYWNlKGVuZEluZm86IEJhcmNvZGVJbmZvKTogQmFyY29kZUluZm8ge1xuICAgICAgICBjb25zdCB0cmFpbGluZ1doaXRlc3BhY2VFbmQgPSBlbmRJbmZvLmVuZCArIChlbmRJbmZvLmVuZCAtIGVuZEluZm8uc3RhcnQpIC8gMjtcblxuICAgICAgICBpZiAodHJhaWxpbmdXaGl0ZXNwYWNlRW5kIDwgdGhpcy5fcm93Lmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX21hdGNoUmFuZ2UoZW5kSW5mby5lbmQsIHRyYWlsaW5nV2hpdGVzcGFjZUVuZCwgMCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW5kSW5mbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfZmluZEVuZCgpOiBCYXJjb2RlSW5mbyB7XG4gICAgICAgIHRoaXMuX3Jvdy5yZXZlcnNlKCk7XG5cbiAgICAgICAgY29uc3QgZW5kSW5mbyA9IHRoaXMuX2ZpbmRQYXR0ZXJuKFNUT1BfUEFUVEVSTiwgdW5kZWZpbmVkLCAwLCBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5fcm93LnJldmVyc2UoKTtcblxuICAgICAgICBpZiAoZW5kSW5mbyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXZlcnNlIG51bWJlcnNcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBlbmRJbmZvLnN0YXJ0O1xuICAgICAgICBlbmRJbmZvLnN0YXJ0ID0gdGhpcy5fcm93Lmxlbmd0aCAtIGVuZEluZm8uZW5kO1xuICAgICAgICBlbmRJbmZvLmVuZCA9IHRoaXMuX3Jvdy5sZW5ndGggLSBzdGFydDtcblxuICAgICAgICByZXR1cm4gZW5kSW5mbyAhPT0gbnVsbCA/IHRoaXMuX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZShlbmRJbmZvKSA6IG51bGw7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9kZWNvZGVDb2RlKGNvdW50ZXI6IEFycmF5PG51bWJlcj4pOiBCYXJjb2RlSW5mbyB7XG4gICAgICAgIGNvbnN0IGJlc3RNYXRjaDogQmFyY29kZUluZm8gPSB7XG4gICAgICAgICAgICBlcnJvcjogTnVtYmVyLk1BWF9WQUxVRSxcbiAgICAgICAgICAgIGNvZGU6IC0xLFxuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICBlbmQ6IDBcbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKGxldCBjb2RlID0gMDsgY29kZSA8IENPREVfUEFUVEVSTi5sZW5ndGg7IGNvZGUrKykge1xuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSB0aGlzLl9tYXRjaFBhdHRlcm4oY291bnRlciwgQ09ERV9QQVRURVJOW2NvZGVdKTtcbiAgICAgICAgICAgIGlmIChlcnJvciA8IGJlc3RNYXRjaC5lcnJvcikge1xuICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5jb2RlID0gY29kZTtcbiAgICAgICAgICAgICAgICBiZXN0TWF0Y2guZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBiZXN0TWF0Y2guZXJyb3IgPCB0aGlzLkFWRVJBR0VfQ09ERV9FUlJPUiA/IGJlc3RNYXRjaCA6IG51bGw7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9kZWNvZGVQYXlsb2FkKGNvdW50ZXJzOiBSZWFkb25seUFycmF5PG51bWJlcj4sIHJlc3VsdDogQXJyYXk8bnVtYmVyPiwgZGVjb2RlZENvZGVzOiBBcnJheTxCYXJjb2RlSW5mbz4pOiBbQmFyY29kZUluZm8sIEJhcmNvZGVJbmZvXSB7XG4gICAgICAgIGNvbnN0IGNvdW50ZXJMZW5ndGggPSBjb3VudGVycy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGNvdW50ZXIwID0gWzAsIDAsIDAsIDAsIDBdO1xuICAgICAgICBjb25zdCBjb3VudGVyMSA9IFswLCAwLCAwLCAwLCAwXTtcbiAgICAgICAgbGV0IGNvZGUwOiBCYXJjb2RlSW5mbztcbiAgICAgICAgbGV0IGNvZGUxOiBCYXJjb2RlSW5mbztcbiAgICAgICAgbGV0IHBvcyA9IDA7XG5cbiAgICAgICAgd2hpbGUgKHBvcyA8IGNvdW50ZXJMZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY291bnRlcjBbaV0gPSBjb3VudGVyc1twb3NdICogdGhpcy5fYmFyU3BhY2VSYXRpb1swXTtcbiAgICAgICAgICAgICAgICBjb3VudGVyMVtpXSA9IGNvdW50ZXJzW3BvcyArIDFdICogdGhpcy5fYmFyU3BhY2VSYXRpb1sxXTtcbiAgICAgICAgICAgICAgICBwb3MgKz0gMjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29kZTAgPSB0aGlzLl9kZWNvZGVDb2RlKGNvdW50ZXIwKTtcbiAgICAgICAgICAgIGlmICghY29kZTApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29kZTEgPSB0aGlzLl9kZWNvZGVDb2RlKGNvdW50ZXIxKTtcbiAgICAgICAgICAgIGlmICghY29kZTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzdWx0LnB1c2goY29kZTAuY29kZSwgY29kZTEuY29kZSk7XG4gICAgICAgICAgICBkZWNvZGVkQ29kZXMucHVzaChjb2RlMCwgY29kZTEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFtjb2RlMCwgY29kZTFdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvZGUxMjhSZWFkZXIgfSBmcm9tICcuL2NvZGUtMTI4LXJlYWRlcic7XG5pbXBvcnQgeyBDb2RlMzlSZWFkZXIgfSBmcm9tICcuL2NvZGUtMzktcmVhZGVyJztcbmltcG9ydCB7IENvZGUzOVZJTlJlYWRlciB9IGZyb20gJy4vY29kZS0zOS12aW4tcmVhZGVyJztcbmltcG9ydCB7IENvZGFiYXJSZWFkZXIgfSBmcm9tICcuL2NvZGFiYXItcmVhZGVyJztcbmltcG9ydCB7IEVBTlJlYWRlciB9IGZyb20gJy4vZWFuLXJlYWRlcic7XG5pbXBvcnQgeyBFQU44UmVhZGVyIH0gZnJvbSAnLi9lYW4tOC1yZWFkZXInO1xuaW1wb3J0IHsgRUFOMlJlYWRlciB9IGZyb20gJy4vZWFuLTItcmVhZGVyJztcbmltcG9ydCB7IEVBTjVSZWFkZXIgfSBmcm9tICcuL2Vhbi01LXJlYWRlcic7XG5pbXBvcnQgeyBVUENSZWFkZXIgfSBmcm9tICcuL3VwYy1yZWFkZXInO1xuaW1wb3J0IHsgVVBDRVJlYWRlciB9IGZyb20gJy4vdXBjLWUtcmVhZGVyJztcbmltcG9ydCB7IEkyb2Y1UmVhZGVyIH0gZnJvbSAnLi9pMm9mNS1yZWFkZXInO1xuaW1wb3J0IHsgVHdvT2ZGaXZlUmVhZGVyIH0gZnJvbSAnLi8yb2Y1LXJlYWRlcic7XG5pbXBvcnQgeyBDb2RlOTNSZWFkZXIgfSBmcm9tICcuL2NvZGUtOTMtcmVhZGVyJztcblxuZXhwb3J0IGNvbnN0IFJlYWRlcnMgPSB7XG4gICAgY29kZV8xMjhfcmVhZGVyOiBDb2RlMTI4UmVhZGVyLFxuICAgIGVhbl9yZWFkZXI6IEVBTlJlYWRlcixcbiAgICBlYW5fNV9yZWFkZXI6IEVBTjVSZWFkZXIsXG4gICAgZWFuXzJfcmVhZGVyOiBFQU4yUmVhZGVyLFxuICAgIGVhbl84X3JlYWRlcjogRUFOOFJlYWRlcixcbiAgICBjb2RlXzM5X3JlYWRlcjogQ29kZTM5UmVhZGVyLFxuICAgIGNvZGVfMzlfdmluX3JlYWRlcjogQ29kZTM5VklOUmVhZGVyLFxuICAgIGNvZGFiYXJfcmVhZGVyOiBDb2RhYmFyUmVhZGVyLFxuICAgIHVwY19yZWFkZXI6IFVQQ1JlYWRlcixcbiAgICB1cGNfZV9yZWFkZXI6IFVQQ0VSZWFkZXIsXG4gICAgaTJvZjVfcmVhZGVyOiBJMm9mNVJlYWRlcixcbiAgICAnMm9mNV9yZWFkZXInOiBUd29PZkZpdmVSZWFkZXIsXG4gICAgY29kZV85M19yZWFkZXI6IENvZGU5M1JlYWRlclxufTtcbiIsImltcG9ydCB7IEJhcmNvZGVJbmZvLCBCYXJjb2RlUmVhZGVyLCBCYXJjb2RlUmVhZGVyQ29uZmlnIH0gZnJvbSAnLi9iYXJjb2RlLXJlYWRlcic7XG5pbXBvcnQgeyBFQU5SZWFkZXIgfSBmcm9tICcuL2Vhbi1yZWFkZXInO1xuXG5jb25zdCBDT0RFX0ZSRVFVRU5DWSA9IFtbNTYsIDUyLCA1MCwgNDksIDQ0LCAzOCwgMzUsIDQyLCA0MSwgMzddLCBbNywgMTEsIDEzLCAxNCwgMTksIDI1LCAyOCwgMjEsIDIyLCAyNl1dO1xuXG5leHBvcnQgY2xhc3MgVVBDRVJlYWRlciBleHRlbmRzIEVBTlJlYWRlciB7XG4gICAgZ2V0IFNUT1BfUEFUVEVSTigpIHtcbiAgICAgICAgcmV0dXJuIFsxIC8gNiAqIDcsIDEgLyA2ICogNywgMSAvIDYgKiA3LCAxIC8gNiAqIDcsIDEgLyA2ICogNywgMSAvIDYgKiA3XTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWc/OiBCYXJjb2RlUmVhZGVyQ29uZmlnLCBzdXBwbGVtZW50cz86IEFycmF5PEJhcmNvZGVSZWFkZXI+KSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZywgc3VwcGxlbWVudHMpO1xuXG4gICAgICAgIHRoaXMuX2Zvcm1hdCA9ICd1cGNfZSc7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9kZWNvZGVQYXlsb2FkKGNvZGU6IEJhcmNvZGVJbmZvLCByZXN1bHQ6IEFycmF5PG51bWJlcj4sIGRlY29kZWRDb2RlczogQXJyYXk8QmFyY29kZUluZm8+KTogQmFyY29kZUluZm8ge1xuICAgICAgICBsZXQgY29kZUZyZXF1ZW5jeSA9IDB4MDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgY29kZSA9IHRoaXMuX2RlY29kZUNvZGUoY29kZS5lbmQpO1xuICAgICAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29kZS5jb2RlID49IHRoaXMuQ09ERV9HX1NUQVJUKSB7XG4gICAgICAgICAgICAgICAgY29kZS5jb2RlID0gY29kZS5jb2RlIC0gdGhpcy5DT0RFX0dfU1RBUlQ7XG4gICAgICAgICAgICAgICAgY29kZUZyZXF1ZW5jeSB8PSAxIDw8ICg1IC0gaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaChjb2RlLmNvZGUpO1xuICAgICAgICAgICAgZGVjb2RlZENvZGVzLnB1c2goY29kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX2RldGVybWluZVBhcml0eShjb2RlRnJlcXVlbmN5LCByZXN1bHQpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb2RlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RldGVybWluZVBhcml0eShjb2RlRnJlcXVlbmN5OiBudW1iZXIsIHJlc3VsdDogQXJyYXk8bnVtYmVyPik6IGJvb2xlYW4ge1xuICAgICAgICBmb3IgKGxldCBuclN5c3RlbSA9IDA7IG5yU3lzdGVtIDwgQ09ERV9GUkVRVUVOQ1kubGVuZ3RoOyBuclN5c3RlbSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IENPREVfRlJFUVVFTkNZW25yU3lzdGVtXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChjb2RlRnJlcXVlbmN5ID09PSBDT0RFX0ZSRVFVRU5DWVtuclN5c3RlbV1baV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnVuc2hpZnQobnJTeXN0ZW0pO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jb252ZXJ0VG9VUENBKHJlc3VsdDogQXJyYXk8bnVtYmVyPik6IEFycmF5PG51bWJlcj4ge1xuICAgICAgICBjb25zdCBsYXN0RGlnaXQgPSByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDJdO1xuICAgICAgICBsZXQgdXBjYSA9IFtyZXN1bHRbMF1dO1xuXG4gICAgICAgIGlmIChsYXN0RGlnaXQgPD0gMikge1xuICAgICAgICAgICAgdXBjYSA9IHVwY2EuY29uY2F0KHJlc3VsdC5zbGljZSgxLCAzKSkuY29uY2F0KFtsYXN0RGlnaXQsIDAsIDAsIDAsIDBdKS5jb25jYXQocmVzdWx0LnNsaWNlKDMsIDYpKTtcbiAgICAgICAgfSBlbHNlIGlmIChsYXN0RGlnaXQgPT09IDMpIHtcbiAgICAgICAgICAgIHVwY2EgPSB1cGNhLmNvbmNhdChyZXN1bHQuc2xpY2UoMSwgNCkpLmNvbmNhdChbMCwgMCwgMCwgMCwgMF0pLmNvbmNhdChyZXN1bHQuc2xpY2UoNCwgNikpO1xuICAgICAgICB9IGVsc2UgaWYgKGxhc3REaWdpdCA9PT0gNCkge1xuICAgICAgICAgICAgdXBjYSA9IHVwY2EuY29uY2F0KHJlc3VsdC5zbGljZSgxLCA1KSkuY29uY2F0KFswLCAwLCAwLCAwLCAwLCByZXN1bHRbNV1dKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVwY2EgPSB1cGNhLmNvbmNhdChyZXN1bHQuc2xpY2UoMSwgNikpLmNvbmNhdChbMCwgMCwgMCwgMCwgbGFzdERpZ2l0XSk7XG4gICAgICAgIH1cblxuICAgICAgICB1cGNhLnB1c2gocmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXSk7XG4gICAgICAgIHJldHVybiB1cGNhO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfY2hlY2tzdW0ocmVzdWx0OiBBcnJheTxudW1iZXI+KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBzdXBlci5fY2hlY2tzdW0odGhpcy5fY29udmVydFRvVVBDQShyZXN1bHQpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2ZpbmRFbmQob2Zmc2V0OiBudW1iZXIsIGlzV2hpdGU6IDAgfCAxKSB7XG4gICAgICAgIGlzV2hpdGUgPSAxO1xuICAgICAgICByZXR1cm4gc3VwZXIuX2ZpbmRFbmQob2Zmc2V0LCBpc1doaXRlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3ZlcmlmeVRyYWlsaW5nV2hpdGVzcGFjZShlbmRJbmZvOiBCYXJjb2RlSW5mbyk6IEJhcmNvZGVJbmZvIHtcbiAgICAgICAgY29uc3QgdHJhaWxpbmdXaGl0ZXNwYWNlRW5kID0gZW5kSW5mby5lbmQgKyAoZW5kSW5mby5lbmQgLSBlbmRJbmZvLnN0YXJ0KSAvIDI7XG5cbiAgICAgICAgaWYgKHRyYWlsaW5nV2hpdGVzcGFjZUVuZCA8IHRoaXMuX3Jvdy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXRjaFJhbmdlKGVuZEluZm8uZW5kLCB0cmFpbGluZ1doaXRlc3BhY2VFbmQsIDApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVuZEluZm87XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59IiwiaW1wb3J0IHsgQmFyY29kZSwgQmFyY29kZVJlYWRlciwgQmFyY29kZVJlYWRlckNvbmZpZyB9IGZyb20gJy4vYmFyY29kZS1yZWFkZXInO1xuaW1wb3J0IHsgRUFOUmVhZGVyIH0gZnJvbSAnLi9lYW4tcmVhZGVyJztcblxuZXhwb3J0IGNsYXNzIFVQQ1JlYWRlciBleHRlbmRzIEVBTlJlYWRlciB7XG4gICAgY29uc3RydWN0b3IoY29uZmlnPzogQmFyY29kZVJlYWRlckNvbmZpZywgc3VwcGxlbWVudHM/OiBBcnJheTxCYXJjb2RlUmVhZGVyPikge1xuICAgICAgICBzdXBlcihjb25maWcsIHN1cHBsZW1lbnRzKTtcblxuICAgICAgICB0aGlzLl9mb3JtYXQgPSAndXBjX2EnO1xuICAgIH1cblxuICAgIGRlY29kZSgpOiBCYXJjb2RlIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gc3VwZXIuZGVjb2RlKCk7XG5cbiAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuY29kZSAmJiByZXN1bHQuY29kZS5sZW5ndGggPT09IDEzICYmIHJlc3VsdC5jb2RlLmNoYXJBdCgwKSA9PT0gJzAnKSB7XG4gICAgICAgICAgICByZXN1bHQuY29kZSA9IHJlc3VsdC5jb2RlLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==