// console.log('系统变量', process.env.NODE_ENV)
import Koa from 'koa';
import log4js from 'log4js';
import config from './config/config';
import errorHandler from './middleware/errorHandler';
import controllerInit from './controllers/controllerInit';
import router from 'koa-simple-router'; //路由控制插件
//上面一部分是纯服务器端配置
//下面是前端需要的配置
import render from 'koa-swig';
import server from 'koa-static';
import co from 'co';
const app = new Koa();
//监听端口
const hpserver = app.listen(config.port, () => {
	console.log('wsy listening on port ', config.port);
});

app.context.render = co.wrap(render({
	root: config.viewDir,
	autoescape: true,
	cache: 'memory',
	ext: 'html',
	writeBody: false
}));
app.use(server(config.staticDir));
const io = require('socket.io')(hpserver); //把websockt挂载到端口3000上


let c = {
	count: 0
}
io.on('connection', function(socket) {
	let client = {
		username: false,
		onlineCount: c.count
	}
	socket.emit('open'); //通知客户端已连接
	//对message事件的监听
	socket.on('login', function(data) {
		c.count += 1;
		client.username = data.username;
		data.onlineCount = c.count;
		client.onlineCount = c.count;
		console.log('客户端发来服务器用户信息', data);
		socket.emit('login', data);
		socket.broadcast.emit('login', data);

	});
	socket.on('message', function(msg) {
		socket.emit('message', msg);
		//广播向所有用户发消息
		socket.broadcast.emit('message', msg);

	});
	socket.on('disconnect', function() {
		// let data = client;
		console.log("服务器断开啦");
		if (client.username && client.onlineCount) {
			c.count -= 1;
			client.onlineCount = c.count;
			console.log(client);
			socket.broadcast.emit('logout', client);
		}
		// let name = data.username;
		// console.log(name);
	});
});



//管理错误日志打印的地方
log4js.configure({
	appenders: {
		wsylog: {
			type: 'file',
			filename: './logs/wsy.log'
		}
	},
	categories: {
		default: {
			appenders: ['wsylog'],
			level: 'error'
		}
	}
});
const logger = log4js.getLogger('wsylog');
// logger.error();
// logger.error('test error'); 这只是一个示范，假如捕捉到了错误错误内容为test error
errorHandler.error(app, logger); // 捕捉错误，500和404

controllerInit.getAllrouters(app, router); //初始化路由

//api测试的时候 supertest 文件
export default app;