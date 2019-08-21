module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "+2v8":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("rEAF");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__("km9I"), 'Object', { defineProperty: __webpack_require__("5lsi").f });


/***/ }),

/***/ "/111":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("c9UZ");
var invoke = __webpack_require__("Pqut");
var html = __webpack_require__("/q2R");
var cel = __webpack_require__("21ej");
var global = __webpack_require__("vpus");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__("Dia3")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "/dVr":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("lF35");
var enumBugKeys = __webpack_require__("sqNC");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "/q2R":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("vpus").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "/qTB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getWeeks */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getCurrentWeek; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getDates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getSelectedWeek; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("YLtl");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("wy2R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);


moment__WEBPACK_IMPORTED_MODULE_1___default.a.locale('fr');
const getWeeks = function ({
  calendar
}) {
  return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(calendar, 'weeks');
};
const getCurrentWeek = function ({
  calendar
}, date) {
  const immutableWeeks = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(calendar, 'weeks');

  if (immutableWeeks) {
    return immutableWeeks.get(date || lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(calendar, 'selectedWeek').format('YYYY.MM.DD'));
  }
};
const getDates = function ({
  calendar
}) {
  return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(calendar, 'dates');
};
const getSelectedWeek = function ({
  calendar
}, weekId) {
  if (weekId) {
    return moment__WEBPACK_IMPORTED_MODULE_1___default()(weekId, 'YYYY.MM.DD').startOf('week');
  }

  return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(calendar, 'selectedWeek');
};

/***/ }),

/***/ "033t":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "0YH9":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("YjbZ");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "1xhh":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("aEYI");
var toObject = __webpack_require__("UWyV");
var IE_PROTO = __webpack_require__("zxSf")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "21ej":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("YjbZ");
var document = __webpack_require__("vpus").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("zP+b");


/***/ }),

/***/ "3+yJ":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "33FX":
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__("6QTg");
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),

/***/ "4a9F":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("UWyV");
var $keys = __webpack_require__("/dVr");

__webpack_require__("o7Bf")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "5VZI":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("bqMK");
var ITERATOR = __webpack_require__("78yb")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "5lsi":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("0YH9");
var IE8_DOM_DEFINE = __webpack_require__("wa4t");
var toPrimitive = __webpack_require__("VHRt");
var dP = Object.defineProperty;

exports.f = __webpack_require__("km9I") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "6QTg":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("5lsi");
var createDesc = __webpack_require__("uG7T");
module.exports = __webpack_require__("km9I") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "6Z8V":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "7/T5":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("033t")('meta');
var isObject = __webpack_require__("YjbZ");
var has = __webpack_require__("aEYI");
var setDesc = __webpack_require__("5lsi").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("3+yJ")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "78yb":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("8yT3")('wks');
var uid = __webpack_require__("033t");
var Symbol = __webpack_require__("vpus").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "7G83":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("c9UZ");
var call = __webpack_require__("m3hj");
var isArrayIter = __webpack_require__("5VZI");
var anObject = __webpack_require__("0YH9");
var toLength = __webpack_require__("Y5VZ");
var getIterFn = __webpack_require__("fZ/e");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "8QRw":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("HRhM");
__webpack_require__("LRYe");
__webpack_require__("bcKi");
__webpack_require__("AW6A");
__webpack_require__("kvpx");
__webpack_require__("k0s3");
module.exports = __webpack_require__("MS8/").Promise;


/***/ }),

/***/ "8k7s":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("lt5F");

/***/ }),

/***/ "8kD3":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("pYNG");
var $Object = __webpack_require__("MS8/").Object;
module.exports = function defineProperties(T, D) {
  return $Object.defineProperties(T, D);
};


/***/ }),

/***/ "8yT3":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("MS8/");
var global = __webpack_require__("vpus");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("BMx2") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "9R6u":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("vpus");
var core = __webpack_require__("MS8/");
var LIBRARY = __webpack_require__("BMx2");
var wksExt = __webpack_require__("gA0n");
var defineProperty = __webpack_require__("5lsi").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "A3A3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FETCH_CLASSES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return fetchClassesAction; });
/* unused harmony export ADD_CLASSE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return addClasseAction; });
/* unused harmony export DELETE_CLASSE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return removeClasseAction; });
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Ml6p");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("pNaP");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _school_school_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("UOrh");



const taskRef = '/classes/';
const FETCH_CLASSES = 'classes/FETCH_CLASSES';
const fetchClassesAction = function () {
  return function (dispatch, getState) {
    try {
      const ref = Object(firebase__WEBPACK_IMPORTED_MODULE_1__["database"])().ref(taskRef).orderByChild('schoolYear').equalTo(Object(_school_school_selectors__WEBPACK_IMPORTED_MODULE_2__[/* getSchoolYear */ "a"])(getState()));
      const onValueChange = ref.on('value', function (snapshot) {
        const classes = [];
        snapshot.forEach(function (childSnapshot) {
          classes.push(childSnapshot.val());
        });
        dispatch({
          type: FETCH_CLASSES,
          classes
        });
      });
      return function () {
        return ref.off('value', onValueChange);
      };
    } catch (error) {
      console.error(error);
      return _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a.resolve();
    }
  };
};
const ADD_CLASSE = 'classes/ADD_CLASSE';
const addClasseAction = function (classe) {
  return async function (dispatch) {
    try {
      await Object(firebase__WEBPACK_IMPORTED_MODULE_1__["database"])().ref(taskRef + classe._id).set(classe);
      await dispatch({
        type: ADD_CLASSE
      });
    } catch (error) {
      console.error(error);
    }
  };
};
const DELETE_CLASSE = 'classes/DELETE_CLASSE';
const removeClasseAction = function (classeId) {
  return async function (dispatch) {
    try {
      await Object(firebase__WEBPACK_IMPORTED_MODULE_1__["database"])().ref(taskRef + classeId).remove();
      await dispatch({
        type: DELETE_CLASSE
      });
    } catch (error) {
      console.error(error);
    }
  };
};

/***/ }),

/***/ "AVPL":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "AW6A":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("BMx2");
var global = __webpack_require__("vpus");
var ctx = __webpack_require__("c9UZ");
var classof = __webpack_require__("Frtj");
var $export = __webpack_require__("rEAF");
var isObject = __webpack_require__("YjbZ");
var aFunction = __webpack_require__("Sv8M");
var anInstance = __webpack_require__("MKJH");
var forOf = __webpack_require__("7G83");
var speciesConstructor = __webpack_require__("v4/U");
var task = __webpack_require__("/111").set;
var microtask = __webpack_require__("KExU")();
var newPromiseCapabilityModule = __webpack_require__("a/Wp");
var perform = __webpack_require__("yuJN");
var userAgent = __webpack_require__("Bv5W");
var promiseResolve = __webpack_require__("Ly5I");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__("78yb")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__("33FX")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__("TXdN")($Promise, PROMISE);
__webpack_require__("ti+1")(PROMISE);
Wrapper = __webpack_require__("MS8/")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("KQ9h")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "Al62":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return uuidv4; });
const uuidv4 = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};

/***/ }),

/***/ "BMx2":
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "BVu9":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("Dia3");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "BnAI":
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__("Pb7z");
var gOPN = __webpack_require__("hRWd").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "Bv5W":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("vpus");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "CscF":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("0YH9");
var dPs = __webpack_require__("bqtW");
var enumBugKeys = __webpack_require__("sqNC");
var IE_PROTO = __webpack_require__("zxSf")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("21ej")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("/q2R").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "DMnC":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("6QTg");


/***/ }),

/***/ "Dia3":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "FIas":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("NXYE");

/***/ }),

/***/ "Frtj":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("Dia3");
var TAG = __webpack_require__("78yb")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "HRhM":
/***/ (function(module, exports) {



/***/ }),

/***/ "JnqE":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__("rEAF");
var ownKeys = __webpack_require__("gEXB");
var toIObject = __webpack_require__("Pb7z");
var gOPD = __webpack_require__("Yw23");
var createProperty = __webpack_require__("uBe4");

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),

/***/ "KExU":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("vpus");
var macrotask = __webpack_require__("/111").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__("Dia3")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "KQ9h":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("78yb")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "LRYe":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("qAmP")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("pPI1")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "LSYY":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("+2v8");
var $Object = __webpack_require__("MS8/").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "LcAa":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("LSYY");

/***/ }),

/***/ "Ly5I":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("0YH9");
var isObject = __webpack_require__("YjbZ");
var newPromiseCapability = __webpack_require__("a/Wp");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "MKJH":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "MS8/":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "Ml6p":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("8QRw");

/***/ }),

/***/ "NXYE":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("sXoR");
var $Object = __webpack_require__("MS8/").Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),

/***/ "Pb7z":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("BVu9");
var defined = __webpack_require__("AVPL");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "Pqut":
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "RrZ7":
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "SLE+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getClasses; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("YLtl");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

const getClasses = function ({
  classes
}) {
  return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(classes, 'classes', []);
};

/***/ }),

/***/ "Sv8M":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "TPw6":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cpAI");

/***/ }),

/***/ "TXdN":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("5lsi").f;
var has = __webpack_require__("aEYI");
var TAG = __webpack_require__("78yb")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "UOrh":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getPreview */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getSchoolYear; });
/* unused harmony export getClasse */
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("YLtl");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

const getPreview = function ({
  school
}) {
  return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(school, 'preview');
};
const getSchoolYear = function ({
  school
}) {
  return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(school, 'schoolYear');
};
const getClasse = function ({
  school
}, classeId) {
  return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(school, 'classes', []), function (classe) {
    return classe._id === classeId;
  });
};

/***/ }),

/***/ "UWyV":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("AVPL");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "VHRt":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("YjbZ");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "WCOB":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("JnqE");
module.exports = __webpack_require__("MS8/").Object.getOwnPropertyDescriptors;


/***/ }),

/***/ "XQss":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("Pb7z");
var toLength = __webpack_require__("Y5VZ");
var toAbsoluteIndex = __webpack_require__("rQsC");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "Y5VZ":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("mHa6");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "YHlp":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FETCH_DATES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return fetchDatesAction; });
/* unused harmony export ADD_DATE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return addDateAction; });
/* unused harmony export EDIT_DATE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return editDateAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FETCH_WEEK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return fetchWeekAction; });
/* unused harmony export ADD_WEEK */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return addWeekAction; });
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("TPw6");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Ml6p");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("pNaP");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("wy2R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _school_school_selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("UOrh");





moment__WEBPACK_IMPORTED_MODULE_3___default.a.locale('fr');
const dateRef = '/dates/';
const weeksRef = '/weeks/';
const FETCH_DATES = 'calendar/FETCH_DATES';
const fetchDatesAction = function () {
  return function (dispatch) {
    try {
      const ref = Object(firebase__WEBPACK_IMPORTED_MODULE_2__["database"])().ref(dateRef).orderByChild('timestamp').startAt(moment__WEBPACK_IMPORTED_MODULE_3___default()().startOf('week').unix() / 1000);
      const onValueChange = ref.on('value', function (snapshot) {
        const dates = [];
        snapshot.forEach(function (childSnapshot) {
          dates.push(childSnapshot.val());
        });
        dispatch({
          type: FETCH_DATES,
          dates
        });
      });
      return function () {
        return ref.off('value', onValueChange);
      };
    } catch (error) {
      console.error(error);
      return _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1___default.a.resolve();
    }
  };
};
const ADD_DATE = 'calendar/ADD_DATE';
const addDateAction = function (date) {
  return async function (dispatch) {
    try {
      await Object(firebase__WEBPACK_IMPORTED_MODULE_2__["database"])().ref(dateRef + date._id).set(date);
      await dispatch({
        type: ADD_DATE
      });
    } catch (error) {
      console.error(error);
    }
  };
};
const EDIT_DATE = 'calendar/EDIT_DATE';
const editDateAction = function (date) {
  return async function (dispatch) {
    try {
      await Object(firebase__WEBPACK_IMPORTED_MODULE_2__["database"])().ref(dateRef + date._id).set(date);
      await dispatch({
        type: EDIT_DATE
      });
    } catch (error) {
      console.error(error);
    }
  };
};
const FETCH_WEEK = 'calendar/FETCH_WEEK';
const fetchWeekAction = function (date) {
  return function (dispatch) {
    try {
      Object(firebase__WEBPACK_IMPORTED_MODULE_2__["database"])().ref(weeksRef).orderByChild('date').equalTo(date || moment__WEBPACK_IMPORTED_MODULE_3___default()().startOf('week').format('YYYY.MM.DD')).on('value', function (snapshot) {
        const week = snapshot.val();

        if (week) {
          dispatch({
            type: FETCH_WEEK,
            week: week[_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0___default()(week)[0]]
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
};
const ADD_WEEK = 'calendar/ADD_WEEK';
const addWeekAction = function (date) {
  return async function (dispatch, getState) {
    try {
      await Object(firebase__WEBPACK_IMPORTED_MODULE_2__["database"])().ref(weeksRef).push().set({
        date,
        schoolYear: Object(_school_school_selectors__WEBPACK_IMPORTED_MODULE_4__[/* getSchoolYear */ "a"])(getState())
      });
      await dispatch({
        type: ADD_WEEK
      });
    } catch (error) {
      console.error(error);
    }
  };
};

/***/ }),

/***/ "YLtl":
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "YjbZ":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "Yw23":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("6Z8V");
var createDesc = __webpack_require__("uG7T");
var toIObject = __webpack_require__("Pb7z");
var toPrimitive = __webpack_require__("VHRt");
var has = __webpack_require__("aEYI");
var IE8_DOM_DEFINE = __webpack_require__("wa4t");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("km9I") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "a/Wp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__("Sv8M");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "aEYI":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "aJeV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("RrZ7");
var step = __webpack_require__("kr9U");
var Iterators = __webpack_require__("bqMK");
var toIObject = __webpack_require__("Pb7z");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("pPI1")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "bcKi":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("aJeV");
var global = __webpack_require__("vpus");
var hide = __webpack_require__("6QTg");
var Iterators = __webpack_require__("bqMK");
var TO_STRING_TAG = __webpack_require__("78yb")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "bqMK":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "bqtW":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("5lsi");
var anObject = __webpack_require__("0YH9");
var getKeys = __webpack_require__("/dVr");

module.exports = __webpack_require__("km9I") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "c9UZ":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("Sv8M");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "cpAI":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("4a9F");
module.exports = __webpack_require__("MS8/").Object.keys;


/***/ }),

/***/ "dg6p":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "emby":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("8kD3");

/***/ }),

/***/ "fZ/e":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("Frtj");
var ITERATOR = __webpack_require__("78yb")('iterator');
var Iterators = __webpack_require__("bqMK");
module.exports = __webpack_require__("MS8/").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "gA0n":
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__("78yb");


/***/ }),

/***/ "gEXB":
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__("hRWd");
var gOPS = __webpack_require__("dg6p");
var anObject = __webpack_require__("0YH9");
var Reflect = __webpack_require__("vpus").Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),

/***/ "h74D":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "hRWd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("lF35");
var hiddenKeys = __webpack_require__("sqNC").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "hsUr":
/***/ (function(module, exports) {

module.exports = require("@emotion/styled-base");

/***/ }),

/***/ "k0s3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__("rEAF");
var newPromiseCapability = __webpack_require__("a/Wp");
var perform = __webpack_require__("yuJN");

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),

/***/ "km9I":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("3+yJ")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "kr9U":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "kvpx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__("rEAF");
var core = __webpack_require__("MS8/");
var global = __webpack_require__("vpus");
var speciesConstructor = __webpack_require__("v4/U");
var promiseResolve = __webpack_require__("Ly5I");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ "kyuf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("CscF");
var descriptor = __webpack_require__("uG7T");
var setToStringTag = __webpack_require__("TXdN");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("6QTg")(IteratorPrototype, __webpack_require__("78yb")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "lF35":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("aEYI");
var toIObject = __webpack_require__("Pb7z");
var arrayIndexOf = __webpack_require__("XQss")(false);
var IE_PROTO = __webpack_require__("zxSf")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "lt5F":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("nWAv");
module.exports = __webpack_require__("MS8/").Object.getOwnPropertySymbols;


/***/ }),

/***/ "lw8j":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("Dia3");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "m3hj":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("0YH9");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "mHa6":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "nWAv":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__("vpus");
var has = __webpack_require__("aEYI");
var DESCRIPTORS = __webpack_require__("km9I");
var $export = __webpack_require__("rEAF");
var redefine = __webpack_require__("DMnC");
var META = __webpack_require__("7/T5").KEY;
var $fails = __webpack_require__("3+yJ");
var shared = __webpack_require__("8yT3");
var setToStringTag = __webpack_require__("TXdN");
var uid = __webpack_require__("033t");
var wks = __webpack_require__("78yb");
var wksExt = __webpack_require__("gA0n");
var wksDefine = __webpack_require__("9R6u");
var enumKeys = __webpack_require__("xmEN");
var isArray = __webpack_require__("lw8j");
var anObject = __webpack_require__("0YH9");
var isObject = __webpack_require__("YjbZ");
var toObject = __webpack_require__("UWyV");
var toIObject = __webpack_require__("Pb7z");
var toPrimitive = __webpack_require__("VHRt");
var createDesc = __webpack_require__("uG7T");
var _create = __webpack_require__("CscF");
var gOPNExt = __webpack_require__("BnAI");
var $GOPD = __webpack_require__("Yw23");
var $GOPS = __webpack_require__("dg6p");
var $DP = __webpack_require__("5lsi");
var $keys = __webpack_require__("/dVr");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__("hRWd").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__("6Z8V").f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__("BMx2")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__("6QTg")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "o7Bf":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("rEAF");
var core = __webpack_require__("MS8/");
var fails = __webpack_require__("3+yJ");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "pNaP":
/***/ (function(module, exports) {

module.exports = require("firebase");

/***/ }),

/***/ "pPI1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("BMx2");
var $export = __webpack_require__("rEAF");
var redefine = __webpack_require__("DMnC");
var hide = __webpack_require__("6QTg");
var Iterators = __webpack_require__("bqMK");
var $iterCreate = __webpack_require__("kyuf");
var setToStringTag = __webpack_require__("TXdN");
var getPrototypeOf = __webpack_require__("1xhh");
var ITERATOR = __webpack_require__("78yb")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "pYNG":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("rEAF");
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__("km9I"), 'Object', { defineProperties: __webpack_require__("bqtW") });


/***/ }),

/***/ "qAmP":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("mHa6");
var defined = __webpack_require__("AVPL");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "rEAF":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("vpus");
var core = __webpack_require__("MS8/");
var ctx = __webpack_require__("c9UZ");
var hide = __webpack_require__("6QTg");
var has = __webpack_require__("aEYI");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "rQsC":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("mHa6");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "sXAp":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("WCOB");

/***/ }),

/***/ "sXoR":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__("Pb7z");
var $getOwnPropertyDescriptor = __webpack_require__("Yw23").f;

__webpack_require__("o7Bf")('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),

/***/ "sqNC":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "ti+1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("vpus");
var core = __webpack_require__("MS8/");
var dP = __webpack_require__("5lsi");
var DESCRIPTORS = __webpack_require__("km9I");
var SPECIES = __webpack_require__("78yb")('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "uBe4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("5lsi");
var createDesc = __webpack_require__("uG7T");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "uG7T":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "v4/U":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("0YH9");
var aFunction = __webpack_require__("Sv8M");
var SPECIES = __webpack_require__("78yb")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "vpus":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "wa4t":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("km9I") && !__webpack_require__("3+yJ")(function () {
  return Object.defineProperty(__webpack_require__("21ej")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "wy2R":
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "xmEN":
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__("/dVr");
var gOPS = __webpack_require__("dg6p");
var pIE = __webpack_require__("6Z8V");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "yuJN":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "zP+b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "@emotion/styled-base"
var styled_base_ = __webpack_require__("hsUr");
var styled_base_default = /*#__PURE__*/__webpack_require__.n(styled_base_);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: /Users/miaou/Projects/school.github.io/node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("znL5");

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__("YLtl");
var external_lodash_default = /*#__PURE__*/__webpack_require__.n(external_lodash_);

// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__("wy2R");
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);

// EXTERNAL MODULE: /Users/miaou/Projects/school.github.io/node_modules/@babel/runtime-corejs2/core-js/object/define-property.js
var define_property = __webpack_require__("LcAa");
var define_property_default = /*#__PURE__*/__webpack_require__.n(define_property);

// EXTERNAL MODULE: /Users/miaou/Projects/school.github.io/node_modules/@babel/runtime-corejs2/core-js/object/define-properties.js
var define_properties = __webpack_require__("emby");
var define_properties_default = /*#__PURE__*/__webpack_require__.n(define_properties);

// EXTERNAL MODULE: /Users/miaou/Projects/school.github.io/node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptors.js
var get_own_property_descriptors = __webpack_require__("sXAp");
var get_own_property_descriptors_default = /*#__PURE__*/__webpack_require__.n(get_own_property_descriptors);

// EXTERNAL MODULE: /Users/miaou/Projects/school.github.io/node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js
var get_own_property_descriptor = __webpack_require__("FIas");
var get_own_property_descriptor_default = /*#__PURE__*/__webpack_require__.n(get_own_property_descriptor);

// EXTERNAL MODULE: /Users/miaou/Projects/school.github.io/node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js
var get_own_property_symbols = __webpack_require__("8k7s");
var get_own_property_symbols_default = /*#__PURE__*/__webpack_require__.n(get_own_property_symbols);

// EXTERNAL MODULE: /Users/miaou/Projects/school.github.io/node_modules/@babel/runtime-corejs2/core-js/object/keys.js
var object_keys = __webpack_require__("TPw6");
var keys_default = /*#__PURE__*/__webpack_require__.n(object_keys);

// CONCATENATED MODULE: ./modules/calendar/components/presenceCase.component.js








var __jsx = external_react_default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = keys_default()(object); if (get_own_property_symbols_default.a) { var symbols = get_own_property_symbols_default()(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return get_own_property_descriptor_default()(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (get_own_property_descriptors_default.a) { define_properties_default()(target, get_own_property_descriptors_default()(source)); } else { ownKeys(source).forEach(function (key) { define_property_default()(target, key, get_own_property_descriptor_default()(source, key)); }); } } return target; }



const Item = styled_base_default()("div", {
  target: "e14w9upc0",
  label: "Item"
})({
  name: "16kb41",
  styles: "height:50px;"
});

class presenceCase_component_PresenceCase extends external_react_["Component"] {
  constructor(...args) {
    var _this;

    super(...args);
    _this = this;

    Object(defineProperty["a" /* default */])(this, "onClickTogglePresence", function (e) {
      e.preventDefault();
      const {
        presence,
        date,
        classeId,
        editDate
      } = _this.props;

      if (!presence) {
        editDate(_objectSpread({}, date, {
          classes: [...date.classes, classeId]
        }));
      } else {
        editDate(_objectSpread({}, date, {
          classes: date.classes.filter(function (item) {
            return item !== classeId;
          })
        }));
      }
    });
  }

  render() {
    const {
      presence
    } = this.props;
    return __jsx(Item, {
      className: "pa3 bb b--black-20"
    }, __jsx("a", {
      href: "#0",
      onClick: this.onClickTogglePresence,
      className: `f5 no-underline ${presence ? 'green' : 'black'} bg-animate hover-bg-black hover-white items-center center`
    }, __jsx("span", {
      className: "pl1"
    }, presence ? 'Présent' : 'Absent')));
  }

}

/* harmony default export */ var presenceCase_component = (presenceCase_component_PresenceCase);
// EXTERNAL MODULE: ./src/utils.js
var utils = __webpack_require__("Al62");

// CONCATENATED MODULE: ./modules/calendar/components/presenceTable/presenceTable.component.js


var presenceTable_component_jsx = external_react_default.a.createElement;





external_moment_default.a.locale('fr');

const Container = styled_base_default()("div", {
  target: "eh2gib20",
  label: "Container"
})({
  name: "1fw2sel",
  styles: "display:grid;overflow:auto;height:500px;width:700px;"
});

const Grid = styled_base_default()("div", {
  target: "eh2gib21",
  label: "Grid"
})({
  name: "4knjz3",
  styles: "display:flex;flex-wrap:nowrap;"
});

const LittleCol = styled_base_default()("div", {
  target: "eh2gib22",
  label: "LittleCol"
})({
  name: "1x68ryb",
  styles: "width:100px;min-width:100px;"
});

const ItemHeader = styled_base_default()("div", {
  target: "eh2gib23",
  label: "ItemHeader"
})({
  name: "95j005",
  styles: "height:50px;min-height:50px;position:sticky;position:-webkit-sticky;background:white;top:0;"
});

const ColFixedLeft = styled_base_default()("div", {
  target: "eh2gib24",
  label: "ColFixedLeft"
})({
  name: "1127zhp",
  styles: "position:sticky;left:0;z-index:9998;background:white;width:250px;min-width:250px;"
});

const presenceTable_component_Item = styled_base_default()("div", {
  target: "eh2gib25",
  label: "Item"
})({
  name: "5lsvks",
  styles: "height:50px;padding:0.4rem;"
});

class presenceTable_component_PresenceTable extends external_react_["Component"] {
  constructor(...args) {
    var _this;

    super(...args);
    _this = this;

    Object(defineProperty["a" /* default */])(this, "handleAddDate", function () {
      const {
        addDate,
        dates
      } = _this.props;
      const date = external_moment_default()(dates[dates.length - 1].from, 'YYYY.MM.DD').add(1, 'weeks');
      addDate({
        _id: Object(utils["a" /* uuidv4 */])(),
        from: date.format('YYYY.MM.DD'),
        to: date.clone().add(4, 'days').format('YYYY.MM.DD'),
        timestamp: date.clone().add(4, 'days').unix(),
        classes: ['']
      });
    });
  }

  componentDidMount() {
    const {
      fetchClasses,
      fetchDates
    } = this.props;
    this.stopFetchingClasses = fetchClasses();
    this.stopFetchingDates = fetchDates();
  }

  componentWillUnmount() {
    this.stopFetchingClasses();
    this.stopFetchingDates();
  }

  render() {
    const {
      classes,
      dates,
      editDate
    } = this.props;

    const classesSorted = external_lodash_default.a.sortBy(classes, ['name']);

    const datesSorted = external_lodash_default.a.sortBy(dates, ['timestamp']);

    return presenceTable_component_jsx("div", {
      className: "pa4"
    }, presenceTable_component_jsx(Container, null, presenceTable_component_jsx(Grid, null, presenceTable_component_jsx(ColFixedLeft, null, presenceTable_component_jsx(ItemHeader, {
      className: "b--black-20 bb f5 black bg-animate items-center pa3 center fw6"
    }, presenceTable_component_jsx("span", null, "Semaine")), datesSorted.map(function (date) {
      return presenceTable_component_jsx(presenceTable_component_Item, {
        key: date._id,
        className: "b--black-20 bb f5 black bg-animate items-center pa3 center"
      }, presenceTable_component_jsx("span", null, "Du\xA0", external_moment_default()(date.from, 'YYYY.MM.DD').format('dddd D MMMM'), presenceTable_component_jsx("br", null), "Au\xA0", external_moment_default()(date.to, 'YYYY.MM.DD').format('dddd D MMMM')));
    })), classesSorted.map(function (classe) {
      return presenceTable_component_jsx(LittleCol, {
        key: classe._id
      }, presenceTable_component_jsx(ItemHeader, {
        className: "tc pa3 bb b--black-20 fw6"
      }, presenceTable_component_jsx("span", null, classe.name)), datesSorted.map(function (date) {
        return presenceTable_component_jsx(presenceCase_component, {
          editDate: editDate,
          date: date,
          presence: date.classes.includes(classe._id),
          classeId: classe._id,
          key: date._id + classe._id
        });
      }));
    }), presenceTable_component_jsx("button", {
      onClick: this.handleAddDate
    }, "+"))));
  }

}
// EXTERNAL MODULE: ./modules/classes/classes.actions.js
var classes_actions = __webpack_require__("A3A3");

// EXTERNAL MODULE: ./modules/calendar/calendar.actions.js
var calendar_actions = __webpack_require__("YHlp");

// EXTERNAL MODULE: ./modules/classes/classes.selectors.js
var classes_selectors = __webpack_require__("SLE+");

// EXTERNAL MODULE: ./modules/calendar/calendar.selectors.js
var calendar_selectors = __webpack_require__("/qTB");

// CONCATENATED MODULE: ./modules/calendar/components/presenceTable/presenceTable.connector.js







const mapStateToProps = function (state) {
  return {
    classes: Object(classes_selectors["a" /* getClasses */])(state),
    dates: Object(calendar_selectors["b" /* getDates */])(state)
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    addDate: function (date) {
      return dispatch(Object(calendar_actions["c" /* addDateAction */])(date));
    },
    editDate: function (date) {
      return dispatch(Object(calendar_actions["e" /* editDateAction */])(date));
    },
    fetchClasses: function () {
      return dispatch(Object(classes_actions["c" /* fetchClassesAction */])());
    },
    fetchDates: function () {
      return dispatch(Object(calendar_actions["f" /* fetchDatesAction */])());
    }
  };
};

const ConnectedPresenceTable = Object(external_react_redux_["connect"])(mapStateToProps, mapDispatchToProps)(presenceTable_component_PresenceTable);
// CONCATENATED MODULE: ./pages/calendrier.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Calendar", function() { return Calendar; });

var calendrier_jsx = external_react_default.a.createElement;



const Wrapper = styled_base_default()("div", {
  target: "efqmr030",
  label: "Wrapper"
})({
  name: "1nry18x",
  styles: "max-width:48rem;margin:0 auto;"
});

const Calendar = function () {
  return calendrier_jsx(Wrapper, null, calendrier_jsx(ConnectedPresenceTable, null));
};

/***/ }),

/***/ "znL5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _defineProperty; });
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("LcAa");
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(obj, key, {
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

/***/ }),

/***/ "zxSf":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("8yT3")('keys');
var uid = __webpack_require__("033t");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ })

/******/ });