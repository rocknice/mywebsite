//1、入口文件指定ok
//2、loaders配置ok
//3、公用的模块
const webpack = require('webpack');
const fs = require('fs'); //可以读所有的文件夹的插件，fs.readdirSync同步读取将目录生成一个数组对象，我门用map去遍历。
const path = require('path');
const _ = require('lodash');
const pagesPath = path.join(__dirname, '../src/web/views'); //获得模版的路径
const widgetPath = path.join(__dirname, '../src/widget'); //获得组件的路径
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//处理所有的js的入口文件
const jsEntris = {}; //拿到所有的entry入口文件，生成一个json对象


fs.readdirSync(pagesPath).map((o, filename) => { //map为一层层缩减的，此处遍历该文件夹即views，找到内部文件夹
	const _fd = pagesPath + '/' + o;
	// console.log(_fd);
	// console.log('------------');
	fs.readdirSync(_fd).map((innero, ifile) => { //找到各模版文件夹的入口文件装订成册给jsEntris
		if (/.entry.js$/.test(innero)) {
			jsEntris[innero.replace('.entry.js', '')] = path.join(pagesPath, o, innero) //_fd + "/" + o
		}
	});
});
// module.exports = {
// 	entry: jsEntris
// };
//上面代码实现一个功能导出一个文件入口



//下面开始配置webpack生产和开发共有的配置
const _entries = Object.assign(jsEntris); //将jsEntris拷贝一份给_entries
const _modules = {
	rules: [{
		test: /\.js$/,
		loader: "babel-loader",
		options: {
			"presets": [
				['env', {
					"modules": false
				}]
			]
		}
	}, {
		test: /\.css$/,
		loader: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: 'css-loader!postcss-loader'
		})
	}, {　　　　　　
		test: /\.(png|jpg|jpeg)$/,
		loader: 'file-loader?limit=8192&name=img/[name].[ext]'
	}, {
		test: /\.(woff|svg|eot|ttf)$/,
		loader: 'url-loader?name=fonts/[name].[ext]'
	}]
}
const _resolve = { //自动加扩展名，import时自己不用写扩展名了
	extensions: [".js", ".css"]
}
const _devLoaders = _.clone(_modules.rules); //拷贝一份modules，并且可以往里再添加开发环境需要的loaders
const _prodLoaders = _.clone(_modules.rules); //拷贝一份modules，并且可以往里再添加生产环境需要的loaders
const WebpackConfig = {
	dev: {
		entry: _entries,
		module: {
			rules: _devLoaders
		},
		resolve: _resolve
	},
	prod: {
		entry: _entries,
		module: {
			rules: _prodLoaders
		},
		resolve: _resolve
	}
};
module.exports = WebpackConfig;