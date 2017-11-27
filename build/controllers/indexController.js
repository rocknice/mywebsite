'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _indexModel = require('../models/indexModel');

var _indexModel2 = _interopRequireDefault(_indexModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const indexController = {
	index() {
		return async (ctx, next) => {
			//表示此函数里有异步的请求
			const indexModelIns = new _indexModel2.default();
			const result = await indexModelIns.getData(); //向接口发送请求，并将异步返回的数据保存在result，将此异步变为同步，接收到了再执行下一行
			ctx.body = await ctx.render('index', {
				data: result,
				title: '网站首页'
			}); //给页面返回一个hello
		};
	},
	main() {
		return async (ctx, next) => {
			//表示此函数里有异步的请求
			if (ctx.request.header['x-pjax']) {
				ctx.body = await ctx.render('../widget/main', {
					title: '网站首页'
				});
			} else {
				ctx.body = await ctx.render('index', {
					title: '网站首页'
				});
			}
		};
	},
	jd() {
		return async (ctx, next) => {
			//表示此函数里有异步的请求
			if (ctx.request.header['x-pjax']) {
				ctx.body = await ctx.render('../widget/jd_main', {
					title: '个人简介'
				});
			} else {
				ctx.body = await ctx.render('my_jd', {
					title: '个人简介'
				});
			}
		};
	},
	work() {
		return async (ctx, next) => {
			//表示此函数里有异步的请求
			if (ctx.request.header['x-pjax']) {
				ctx.body = await ctx.render('../widget/work_main', {
					title: '我的作品'
				});
			} else {
				ctx.body = await ctx.render('my_work', {
					title: '我的作品'
				});
			}
		};
	},
	work_3d() {
		return async (ctx, next) => {
			//表示此函数里有异步的请求	
			ctx.body = await ctx.render('my_work_3d', {
				title: '3d全景图'
			});
		};
	},
	jdmall() {
		return async (ctx, next) => {
			//表示此函数里有异步的请求	
			ctx.body = await ctx.render('jdmall', {
				title: '京东全球购'
			});
		};
	},
	game2048() {
		return async (ctx, next) => {
			//表示此函数里有异步的请求	
			ctx.body = await ctx.render('game2048', {
				title: '2048游戏'
			});
		};
	},
	chatonline() {
		return async (ctx, next) => {
			//表示此函数里有异步的请求	
			ctx.body = await ctx.render('my_work_chatonline', {
				title: 'chatonline'
			});
		};
	}

};
exports.default = indexController;