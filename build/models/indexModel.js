'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class indexModel {
	constructor(ctx) {}
	getData() {
		return new Promise((resolve, reject) => {
			(0, _requestPromise2.default)('http://news.baidu.com/').then(htmlString => {
				const $ = _cheerio2.default.load(htmlString);
				console.log($('.hotnews ul li a').eq(0).text());
				resolve($('.hotnews ul li a').eq(0).text()); //返回给页面的html内容
			}).catch(err => {
				reject(err);
			});
			// setTimeout(() => {
			// 	console.log("后台发送成功～");
			// 	resolve("五秒过后模拟返回了数据咯")
			// }, 5000)
		});
	}
}
exports.default = indexModel;