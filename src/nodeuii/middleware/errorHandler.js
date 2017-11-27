// const log4js = require('log4js');
// import log4js from 'log4js';
const errorHandler = {
	error(app, logger) {
		//处理500的错误
		app.use(async(ctx, next) => {
			try {
				await next();
			} catch (err) {
				logger.error(err); //捕捉错误并输入日志中
				ctx.status = err.status || 500;
				ctx.body = "500";
			}
		});
		//处理404的错误
		app.use(async(ctx, next) => {
			await next();
			if (404 != ctx.status) return;
			ctx.status = 404;
			ctx.body = "sorry 该板块正在开发中～";
		});
	}
};
export default errorHandler;