require('./work_main.css');
const work_main = {
	init() {
		let aim = document.getElementById("main");
		let topNav = document.getElementById("head");
		let num = 0;
		// window.addEventListener("scroll", function() {
		// 	navFadeOut();
		// })
		aim.addEventListener("mousewheel", function(event) {
			if (event.wheelDelta > 0) {
				topNav.style.top = 0;
			} else {
				topNav.style.top = -100 + "px";
			}
		})

		function navFadeOut() {
			if (aim.getBoundingClientRect().top < 50) {
				topNav.style.top = -(50 - aim.getBoundingClientRect().top) + "px";
			} else {
				topNav.style.top = 0;
			}
		}
	}
}
export default work_main;