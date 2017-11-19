"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
// const log4js = require('log4js');
// import log4js from 'log4js';
const errorHandler = {
	error(app, logger) {
		//处理500的错误
		app.use(async (ctx, next) => {
			try {
				await next();
			} catch (err) {
				logger.error(err); //捕捉错误并输入日志中
				ctx.status = err.status || 500;
				ctx.body = "500";
			}
		});
		//处理404的错误
		app.use(async (ctx, next) => {
			await next();
			if (404 != ctx.status) return;
			ctx.status = 404;
			ctx.body = "页面找不到，发生了404";
		});
	}
};
exports.default = errorHandler;