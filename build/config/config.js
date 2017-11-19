'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _local = require('./local');

var _local2 = _interopRequireDefault(_local);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//工具库，方便管理对象数组等
const server = {
	//端口号配置
	"port": 80
}; //文件完整目录

let config = { //基本配置文件，模版目录，静态资源目录
	"viewDir": _path2.default.join(__dirname, '..', 'views/'), //模版目录
	"staticDir": _path2.default.join(__dirname, '..', 'assets/'), //静态资源目录，一般是放在cdn上 //html里的js和css文件都默认从本地的assets文件夹领
	"env": process.env.NODE_ENV

};
if (!config.env || config.env === "development") {
	config = _lodash2.default.extend(config, _local2.default); //扩展config对象
} else {
	config = _lodash2.default.extend(config, server);
}

exports.default = config;