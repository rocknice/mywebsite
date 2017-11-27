import rp from 'request-promise';
import cheerio from 'cheerio';
export default class indexModel {
	constructor(ctx) {

	}
	getData() {
		return new Promise((resolve, reject) => {
			rp('http://news.baidu.com/')
				.then((htmlString) => {
					const $ = cheerio.load(htmlString);
					console.log($('.hotnews ul li a').eq(0).text());
					resolve($('.hotnews ul li a').eq(0).text()); //返回给页面的html内容
				})
				.catch((err) => {
					reject(err);
				});
			// setTimeout(() => {
			// 	console.log("后台发送成功～");
			// 	resolve("五秒过后模拟返回了数据咯")
			// }, 5000)
		})
	}
}