require('./3d_main.css');
require('./3d_iconfont.css');
require('./3d_common.css');
const work_3d = {
	init() {
		let flag = true;
		//flag叫标志量，用来作为控制一段语句是否运行的标志。这段语句里，当flag为true时，可以执行自动旋转，且设置flag为false，所以不能执行触摸动作，当gamma角度小于1时，flag为true，可以执行触摸动作。
		//陀螺仪：
		(function() {
			let box = document.getElementsByClassName("container");
			let angle = document.getElementById("angle")
				// box[0].addEventListener("transitionend", function(e) {  
				// 	console.log('css3运动结束！');  
				// },false);
			window.addEventListener('deviceorientation', function(event) {
				// box[0].addEventListener = null;
				let g = event.gamma;
				let n = Math.floor(g);
				angle.innerHTML = "Gama角为: " + n + "°";
				if (Math.abs(n) > 10) {
					flag = false;
					box[0].style.transform = "rotateY(" + n * 3 + "deg)";
				} else {
					flag = true;
				}
			}, false)
		})();


		class Rotate {
			constructor(id) {
					this.elem = document.getElementById(id);
				}
				//鼠标拖拽
			mouseDrag() {
					let elem = this.elem;
					let box = elem.children;
					let ev, down_x, move_x;
					let dist = 0;
					elem.onmousedown = (e) => {
						e.preventDefault();
						ev = window.event || e;
						down_x = ev.screenX + dist; //down_x表示初始点x坐标，减前一次的移动距离。
						elem.onmousemove = (e) => {
							if (flag) {
								move_x = e.screenX;
								dist = down_x - move_x; //move_x随着鼠标移动变化，down_x不变，偏移量dist始终等于新的偏移量加前一次的偏移量，前一次的偏移量dist也由鼠标松开的时候固定。
								box[0].style.transform = "rotateY(" + dist / 2 + "deg)";
							}
						}
						elem.onmouseleave = (e) => {
							elem.onmousemove = null;
							elem.onmouseup = null;
						}
						elem.onmouseup = (e) => {
							elem.onmousemove = null;
							elem.onmouseup = null;
						};
						return false;
					};
				}
				//触屏拖拽
			touchDrag() {
					let elem = this.elem;
					let box = elem.children;
					let ev, touch_x, move_x;
					let dist = 0;
					elem.addEventListener("touchstart", (e) => {
						e.preventDefault();
						ev = window.event || e;
						touch_x = ev.touches[0].screenX + dist; //down_x表示初始点x坐标，减前一次的移动距离。
					}, false);
					elem.addEventListener("touchmove", (e) => {
						if (flag) {
							e.preventDefault();
							move_x = e.touches[0].screenX;
							dist = touch_x - move_x;
							box[0].style.transform = "rotateY(" + dist + "deg)";
						}
					})
				}
				//播放音乐
			playAudio() {
					let playbtn = document.getElementsByClassName("iconfont");
					let elem = document.getElementById("audio");
					playbtn[0].addEventListener("click", (e) => {
						let classname = e.className;
						if (elem.paused) {
							elem.play();
							playbtn[0].className = "iconfont" + " " + "icon-zanting";
						} else {
							elem.pause();
							playbtn[0].className = "iconfont" + " " + "icon-play";
						}
					}, false)
				}
				//3d样式兼容safari
			browserUA() {
				let elem = this.elem;
				let ua = window.navigator.userAgent;
				let isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1 && ua.indexOf("Mobile") == -1;
				if (isSafari === true) {
					elem.style.perspective = "40rem";
					elem.style.perspectiveOrigin = "100% 2%";
				}
			}
		}
		let f = new Rotate("box");
		f.mouseDrag();
		f.touchDrag();
		f.playAudio();
		f.browserUA();
	}
}
export default work_3d;