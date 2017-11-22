class PraiseButton {
	constructor(element) {
		//实例属性
		this.element = element;
		this.father = $(this.element.children().get(0));
		this.photos = this.father.children('li');
		console.log(this.photos);
		this.navfather = $(this.element.children().get(1));
		this.nav = this.navfather.children('li');
		console.log(this.nav);

	};
}
//子类Thumb
class Slide extends PraiseButton {
	constructor(element) {
			super(element);
		}
		//由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。
		//ES6 规定，通过super调用父类的方法时，super会绑定子类的this。
		// 手动轮播
	slideBanner() {
			let a = this.photos;
			let b = this.nav;
			let t = "";
			// this.element.click(() => {
			// 	this.element.hide();
			// })
			for (let i = 0; i < this.nav.length; i++) {
				b.eq(i).hover(() => {
					if (t) {
						clearTimeout(t);
					}
					t = setTimeout(() => {
						a.eq(i).addClass("current").siblings().removeClass("current");
						b.eq(i).addClass("current").siblings().removeClass("current");
					}, 350)
				})
			}
		}
		// 自动轮播
	autoPlay() {
		let i = 1;
		let a = this.photos;
		let b = this.nav;
		setInterval(() => {
			a.eq(i).addClass("current").siblings().removeClass("current");
			b.eq(i).addClass("current").siblings().removeClass("current");
			i++;
			if (i > 5) {
				i = 0;
			}
		}, 3000)
	}
}

let d = new Slide($('.hot-rec .hot-goods')); //这里给jquery写了一个插件
d.slideBanner();
d.autoPlay();



// class Slide{
// 	constructor(element){
// 		//实例属性
// 		this.element = element;

// 		this.wrap = element.children[0];

// 		this.photos = this.wrap.children("li");

// 		this.father = element.children[1];
// 		this.button = this.father.children("li");

// 	}
// 	slideBanner() {
// 		let a= this.element
// 		console.log(a);
// 		a.hide();
// 	}
// }
// class One extends Slide{
// 	constructor(element){
// 		super(element);
// 	}
// 	slideBanner() {
// 		console.log(this.element);
// 		for(let i = 0; i < this.button.length ; i++){
// 			this.button.eq(i).hover(()=>{
// 				this.photos.eq(i).addClass("current").siblings().removeClass("current");
// 				this.button.eq(i).addClass("current").siblings().removeClass("current");
// 			})
// 		}
// 	}
// }
// document.getElementsByClassName("hot-goods")
// var slide = new Slide($("hot-goods"));
// slide.slidebanner();