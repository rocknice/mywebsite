import local from './local';
import path from 'path'; //文件完整目录
import _ from 'lodash'; //工具库，方便管理对象数组等
const server = {
	//端口号配置
	"port": 80
};
let config = { //基本配置文件，模版目录，静态资源目录
	"viewDir": path.join(__dirname, '..', 'views/'), //模版目录
	"staticDir": path.join(__dirname, '..', 'assets/'), //静态资源目录，一般是放在cdn上 //html里的js和css文件都默认从本地的assets文件夹领
	"env": process.env.NODE_ENV

};
if (!config.env || config.env === "development") {
	config = _.extend(config, local); //扩展config对象
} else {
	config = _.extend(config, server);
}

export default config;