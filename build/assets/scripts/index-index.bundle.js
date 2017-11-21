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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/web/widget/header/header.js
var header = __webpack_require__(0);

// EXTERNAL MODULE: ./src/web/widget/footer/footer.js
var footer = __webpack_require__(3);

// CONCATENATED MODULE: ./src/web/widget/main/main.js
__webpack_require__(6);
var Main = {
	init: function init() {
		window.onload = function () {

			var oCanvas = document.getElementById('canvasParticle');
			var cxt = null;
			//用来存放粒子的素组
			var particles = {};
			var particleIndex = 0;

			if (oCanvas.getContext) {
				cxt = oCanvas.getContext('2d');
			}

			oCanvas.width = window.innerWidth;
			oCanvas.height = window.innerHeight;

			function Particle() {
				particleIndex++;

				particles[particleIndex] = this;

				//粒子放射的中心点
				this.x = oCanvas.width / 2;
				this.y = oCanvas.height / 2;
				//初始化粒子沿X轴和Y轴的速度
				this.vx = Math.random() * 6 - 3;
				this.vy = Math.random() * 4 - 2;

				this.growth = (Math.abs(this.vx) + Math.abs(this.vy)) * 0.01; // 根据x/y轴的位置决定大小
				this.id = particleIndex;
				this.size = 0;
				this.color = getRandomColor();
			};

			Particle.prototype.draw = function () {
				this.x += this.vx;
				this.y += this.vy;
				//根据移动的距离逐渐变大
				this.size += this.growth;

				if (this.x < 0 || this.x > oCanvas.width || this.y < 0 || this.y > oCanvas.height) {
					//出界则移除
					delete particles[this.id];
				}

				cxt.fillStyle = this.color;
				cxt.beginPath();
				cxt.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
				cxt.fill();
			};

			function animate() {
				requestAnimationFrame(animate);

				cxt.fillStyle = '#222222';
				cxt.fillRect(0, 0, oCanvas.width, oCanvas.height);
				//每次网数组添加一个数据
				new Particle();
				//遍历数组，依次画出
				for (var i in particles) {
					particles[i].draw();
				}
			};
			requestAnimationFrame(animate);
		};

		//随机颜色方法
		function getRandomColor() {
			return '#' + (Math.random() * 0xffffff << 0).toString(16);
		};
	}
};
/* harmony default export */ var main = (Main);
// CONCATENATED MODULE: ./src/web/views/index/index-index.entry.js

header["a" /* default */].init();

footer["a" /* default */].init();

main.init();

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);