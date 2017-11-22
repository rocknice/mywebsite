'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _errorHandler = require('./middleware/errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _controllerInit = require('./controllers/controllerInit');

var _controllerInit2 = _interopRequireDefault(_controllerInit);

var _koaSimpleRouter = require('koa-simple-router');

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _koaSwig = require('koa-swig');

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default();
//监听端口
//路由控制插件
//上面一部分是纯服务器端配置
//下面是前端需要的配置
// console.log('系统变量', process.env.NODE_ENV)
const hpserver = app.listen(_config2.default.port, () => {
	console.log('wsy listening on port ', _config2.default.port);
});
const io = require('socket.io')(hpserver); //把websockt挂载到端口3000上

let c = {
	count: 0
};
io.on('connection', function (socket) {
	let client = {
		username: false,
		onlineCount: c.count
	};
	socket.emit('open'); //通知客户端已连接
	//对message事件的监听
	socket.on('login', function (data) {
		c.count += 1;
		client.username = data.username;
		data.onlineCount = c.count;
		client.onlineCount = c.count;
		console.log('客户端发来服务器用户信息', data);
		socket.emit('login', data);
		socket.broadcast.emit('login', data);
	});
	socket.on('message', function (msg) {
		socket.emit('message', msg);
		//广播向所有用户发消息
		socket.broadcast.emit('message', msg);
	});
	socket.on('disconnect', function () {
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

app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
	root: _config2.default.viewDir,
	autoescape: true,
	cache: 'memory',
	ext: 'html',
	writeBody: false
}));
app.use((0, _koaStatic2.default)(_config2.default.staticDir));
//管理错误日志打印的地方
_log4js2.default.configure({
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
const logger = _log4js2.default.getLogger('wsylog');
// logger.error();
// logger.error('test error'); 这只是一个示范，假如捕捉到了错误错误内容为test error
_errorHandler2.default.error(app, logger); // 捕捉错误，500和404

_controllerInit2.default.getAllrouters(app, _koaSimpleRouter2.default); //初始化路由

//api测试的时候 supertest 文件
exports.default = app;