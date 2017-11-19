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
				data: result
			}); //给页面返回一个hello
		};
	},
	my_jd() {
		return async (ctx, next) => {
			//表示此函数里有异步的请求
			const indexModelIns = new _indexModel2.default();
			const result = await indexModelIns.getData(); //向接口发送请求，并将异步返回的数据保存在result，将此异步变为同步，接收到了再执行下一行
			ctx.body = await ctx.render('my_jd', {
				data: result
			}); //给页面返回一个hello
		};
	}
};
exports.default = indexController;