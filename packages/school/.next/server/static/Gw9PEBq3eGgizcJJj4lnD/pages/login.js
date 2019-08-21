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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ "+2v8":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("rEAF");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__("km9I"), 'Object', { defineProperty: __webpack_require__("5lsi").f });


/***/ }),

/***/ "0YH9":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("YjbZ");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
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

/***/ "48v0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SIGNIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SIGNOUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AUTO_LOGIN_DONE; });
const SIGNIN = 'account/SIGNIN';
const SIGNOUT = 'account/SIGNOUT';
const AUTO_LOGIN_DONE = 'account/AUTO_LOGIN_DONE';

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

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("O2ls");


/***/ }),

/***/ "8GVj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return showToaster; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hideToaster; });
/* harmony import */ var _display_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("UMvX");

const showToaster = function (message, style = 'default', timeout = 3000) {
  return {
    type: _display_constants__WEBPACK_IMPORTED_MODULE_0__[/* SHOW_TOASTER */ "b"],
    message,
    style,
    timeout
  };
};
const hideToaster = function () {
  return {
    type: _display_constants__WEBPACK_IMPORTED_MODULE_0__[/* HIDE_TOASTER */ "a"]
  };
};

/***/ }),

/***/ "DZ++":
/***/ (function(module, exports) {

module.exports = require("@school/ui");

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

/***/ "MGin":
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),

/***/ "MS8/":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "O2ls":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: /Users/miaou/Projects/school.github.io/node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("znL5");

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-router"
var external_react_router_ = __webpack_require__("MGin");

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: external "@school/ui"
var ui_ = __webpack_require__("DZ++");

// EXTERNAL MODULE: ./components/button.js
var components_button = __webpack_require__("a3/r");

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__("YLtl");
var external_lodash_default = /*#__PURE__*/__webpack_require__.n(external_lodash_);

// EXTERNAL MODULE: external "firebase"
var external_firebase_ = __webpack_require__("pNaP");

// CONCATENATED MODULE: ./config/firebase.js

const config = {
  apiKey: 'AIzaSyB7W5Xjq5UTGllPEvlJW48xSGmSb-GBDMA',
  authDomain: 'school-81af1.firebaseapp.com',
  databaseURL: 'https://school-81af1.firebaseio.com',
  projectId: 'school-81af1',
  storageBucket: 'school-81af1.appspot.com'
};
external_firebase_["initializeApp"](config);
/* harmony default export */ var firebase = (external_firebase_);
// EXTERNAL MODULE: ./modules/account/account.constants.js
var account_constants = __webpack_require__("48v0");

// EXTERNAL MODULE: ./modules/display/display.actions.js
var display_actions = __webpack_require__("8GVj");

// CONCATENATED MODULE: ./modules/account/account.actions.js




const login = function (user) {
  return {
    type: account_constants["b" /* SIGNIN */],
    user: external_lodash_default.a.pick(user, ['email', 'uid', 'refreshToken'])
  };
};
const logout = function () {
  return {
    type: account_constants["c" /* SIGNOUT */],
    user: null
  };
};
const autoLogin = function () {
  return function (dispatch) {
    const stopObserver = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        dispatch(login(user));
      }

      dispatch(Object(display_actions["b" /* showToaster */])('La connexion automatique à fini'));
      dispatch({
        type: account_constants["a" /* AUTO_LOGIN_DONE */]
      });
      stopObserver();
    });
  };
};
function signIn(email, password) {
  return function (dispatch) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
      dispatch(login(user));
      dispatch(Object(display_actions["b" /* showToaster */])('Connexion reussi'));
    });
  };
}
function signOut() {
  return function (dispatch) {
    firebase.auth().signOut().then(function (error) {
      if (!error) {
        dispatch(logout());
        dispatch(Object(display_actions["b" /* showToaster */])('Déconnection réussi'));
      }
    });
  };
}
// CONCATENATED MODULE: ./modules/account/account.selectors.js

const getUid = function ({
  account
}) {
  return external_lodash_default.a.get(account, 'user.uid', undefined);
};
const getAutoLoginDone = function ({
  account
}) {
  return external_lodash_default.a.get(account, 'autoLoginDone', false);
};
// CONCATENATED MODULE: ./pages/login.js

var __jsx = external_react_default.a.createElement;








class login_Login extends external_react_["Component"] {
  constructor(...args) {
    var _this;

    super(...args);
    _this = this;

    Object(defineProperty["a" /* default */])(this, "signin", function (event) {
      event.preventDefault();
      const {
        signInAction
      } = _this.props;
      signInAction(event.target.email.value, event.target.passwordLogin.value);
    });
  }

  render() {
    const {
      uid
    } = this.props;

    if (uid) {
      return __jsx(external_react_router_["Redirect"], {
        to: {
          pathname: '/home'
        }
      });
    }

    return __jsx("form", {
      onSubmit: this.signin
    }, __jsx("fieldset", {
      id: "sign_up",
      className: "ba b--transparent ph0 mh0"
    }, __jsx("legend", null, "Connection"), __jsx(ui_["InputForm"], {
      type: "email",
      name: "email",
      textLabel: "Email"
    }), __jsx(ui_["InputForm"], {
      type: "password",
      name: "passwordLogin",
      textLabel: "Mot de passe"
    })), __jsx(components_button["a" /* Button */], {
      type: "submit"
    }, "Se connecter"));
  }

}

login_Login.defaultProps = {
  uid: ''
};

const mapStateToProps = function (state) {
  return {
    uid: getUid(state)
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    signInAction: function (email, password) {
      return dispatch(signIn(email, password));
    }
  };
};

/* harmony default export */ var pages_login = __webpack_exports__["default"] = (Object(external_react_redux_["connect"])(mapStateToProps, mapDispatchToProps)(login_Login));

/***/ }),

/***/ "Sv8M":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "UMvX":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SHOW_TOASTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HIDE_TOASTER; });
const SHOW_TOASTER = 'display/SHOW_TOASTER';
const HIDE_TOASTER = 'display/HIDE_TOASTER';

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

/***/ "a3/r":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Button; });
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("hsUr");
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__);

const Button = _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0___default()("button", {
  target: "ervio5o0",
  label: "Button"
})({
  name: "1izwmmy",
  styles: "font-size:.875rem;text-decoration:none;padding:0.5rem 1rem;background-color:#a463f2;color:#fff;border-radius:9999px;border-style:none;border-width:0;"
});

/***/ }),

/***/ "aEYI":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
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

/***/ "h74D":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "hsUr":
/***/ (function(module, exports) {

module.exports = require("@emotion/styled-base");

/***/ }),

/***/ "km9I":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("3+yJ")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "pNaP":
/***/ (function(module, exports) {

module.exports = require("firebase");

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

/***/ })

/******/ });