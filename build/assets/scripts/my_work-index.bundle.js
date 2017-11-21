/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__(1);
__webpack_require__(2);
// require('./iconfont.css');
var Header = {
	init: function init() {
		console.log('header');
	}
};
/* harmony default export */ __webpack_exports__["a"] = (Header);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__(4);
var Footer = {
	init: function init() {
		console.log('footer');
	}
};
/* harmony default export */ __webpack_exports__["a"] = (Footer);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/web/widget/header/header.js
var header = __webpack_require__(0);

// EXTERNAL MODULE: ./src/web/widget/footer/footer.js
var footer = __webpack_require__(3);

// CONCATENATED MODULE: ./src/web/widget/work_main/work_main.js
__webpack_require__(10);
var work_main = {
	init: function init() {
		var aim = document.getElementById("main");
		var topNav = document.getElementById("head");
		var num = 0;
		// window.addEventListener("scroll", function() {
		// 	navFadeOut();
		// })
		aim.addEventListener("mousewheel", function (event) {
			if (event.wheelDelta > 0) {
				topNav.style.top = 0;
			} else {
				topNav.style.top = -100 + "px";
			}
		});

		function navFadeOut() {
			if (aim.getBoundingClientRect().top < 50) {
				topNav.style.top = -(50 - aim.getBoundingClientRect().top) + "px";
			} else {
				topNav.style.top = 0;
			}
		}
	}
};
/* harmony default export */ var work_main_work_main = (work_main);
// CONCATENATED MODULE: ./src/web/views/my_work/my_work-index.entry.js

header["a" /* default */].init();

footer["a" /* default */].init();

work_main_work_main.init();

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);