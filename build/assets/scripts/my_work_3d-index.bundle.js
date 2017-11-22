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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/web/widget/3d_main/3d_main.js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(12);
__webpack_require__(13);
__webpack_require__(14);
var work_3d = {
	init: function init() {
		var flag = true;
		//flag叫标志量，用来作为控制一段语句是否运行的标志。这段语句里，当flag为true时，可以执行自动旋转，且设置flag为false，所以不能执行触摸动作，当gamma角度小于1时，flag为true，可以执行触摸动作。
		//陀螺仪：
		(function () {
			var box = document.getElementsByClassName("container");
			var angle = document.getElementById("angle");
			// box[0].addEventListener("transitionend", function(e) {  
			// 	console.log('css3运动结束！');  
			// },false);
			window.addEventListener('deviceorientation', function (event) {
				// box[0].addEventListener = null;
				var g = event.gamma;
				var n = Math.floor(g);
				angle.innerHTML = "Gama角为: " + n + "°";
				if (Math.abs(n) > 10) {
					flag = false;
					box[0].style.transform = "rotateY(" + n * 3 + "deg)";
				} else {
					flag = true;
				}
			}, false);
		})();

		var Rotate = function () {
			function Rotate(id) {
				_classCallCheck(this, Rotate);

				this.elem = document.getElementById(id);
			}
			//鼠标拖拽


			_createClass(Rotate, [{
				key: 'mouseDrag',
				value: function mouseDrag() {
					var elem = this.elem;
					var box = elem.children;
					var ev = void 0,
					    down_x = void 0,
					    move_x = void 0;
					var dist = 0;
					elem.onmousedown = function (e) {
						e.preventDefault();
						ev = window.event || e;
						down_x = ev.screenX + dist; //down_x表示初始点x坐标，减前一次的移动距离。
						elem.onmousemove = function (e) {
							if (flag) {
								move_x = e.screenX;
								dist = down_x - move_x; //move_x随着鼠标移动变化，down_x不变，偏移量dist始终等于新的偏移量加前一次的偏移量，前一次的偏移量dist也由鼠标松开的时候固定。
								box[0].style.transform = "rotateY(" + dist / 2 + "deg)";
							}
						};
						elem.onmouseleave = function (e) {
							elem.onmousemove = null;
							elem.onmouseup = null;
						};
						elem.onmouseup = function (e) {
							elem.onmousemove = null;
							elem.onmouseup = null;
						};
						return false;
					};
				}
				//触屏拖拽

			}, {
				key: 'touchDrag',
				value: function touchDrag() {
					var elem = this.elem;
					var box = elem.children;
					var ev = void 0,
					    touch_x = void 0,
					    move_x = void 0;
					var dist = 0;
					elem.addEventListener("touchstart", function (e) {
						e.preventDefault();
						ev = window.event || e;
						touch_x = ev.touches[0].screenX + dist; //down_x表示初始点x坐标，减前一次的移动距离。
					}, false);
					elem.addEventListener("touchmove", function (e) {
						if (flag) {
							e.preventDefault();
							move_x = e.touches[0].screenX;
							dist = touch_x - move_x;
							box[0].style.transform = "rotateY(" + dist + "deg)";
						}
					});
				}
				//播放音乐

			}, {
				key: 'playAudio',
				value: function playAudio() {
					var playbtn = document.getElementsByClassName("iconfont");
					var elem = document.getElementById("audio");
					playbtn[0].addEventListener("click", function (e) {
						var classname = e.className;
						if (elem.paused) {
							elem.play();
							playbtn[0].className = "iconfont" + " " + "icon-zanting";
						} else {
							elem.pause();
							playbtn[0].className = "iconfont" + " " + "icon-play";
						}
					}, false);
				}
				//3d样式兼容safari

			}, {
				key: 'browserUA',
				value: function browserUA() {
					var elem = this.elem;
					var ua = window.navigator.userAgent;
					var isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1 && ua.indexOf("Mobile") == -1;
					if (isSafari === true) {
						elem.style.perspective = "40rem";
						elem.style.perspectiveOrigin = "100% 2%";
					}
				}
			}]);

			return Rotate;
		}();

		var f = new Rotate("box");
		f.mouseDrag();
		f.touchDrag();
		f.playAudio();
		f.browserUA();
	}
};
/* harmony default export */ var _d_main = (work_3d);
// CONCATENATED MODULE: ./src/web/views/my_work_3d/my_work_3d-index.entry.js

_d_main.init();

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);