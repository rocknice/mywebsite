const conf = require('./webpack.conf');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlAfterWebapckPlugin = require('./htmlAfterWebpackPlugin.js');
const options = {
	output: {
		path: path.join(__dirname, '../build/assets/'), //编译打包完，存放在本地的地址
		publicPath: '/', //服务器上存放静态资源css、js的父目录，对应app.js里的静态资源目录
		filename: 'scripts/[name].bundle.js' //js存放的路径和文件的名称
	},
	plugins: [
		new ExtractTextPlugin("styles/[name].css"), //css存放的路径和文件名称
		//scope hoisting
		new webpack.optimize.ModuleConcatenationPlugin(), //将一些有联系的模块，放到一个闭包函数里面去，通过减少闭包函数数量从而加快JS的执行速度。
		new HtmlWebpackPlugin({
			filename: '../views/index.html',
			template: 'src/web/views/index/pages/index.html',
			inject: false,
			chunks: ['index-index']
		}),
		new HtmlWebpackPlugin({
			filename: '../views/my_jd.html',
			template: 'src/web/views/my_jd/pages/my_jd.html',
			inject: false,
			chunks: ['my_jd-index']
		}),
		new HtmlWebpackPlugin({
			filename: '../views/my_work.html',
			template: 'src/web/views/my_work/pages/my_work.html',
			inject: false,
			chunks: ['my_work-index']
		}),
		new HtmlWebpackPlugin({
			filename: '../views/my_work_3d.html',
			template: 'src/web/views/my_work_3d/pages/my_work_3d.html',
			inject: false,
			chunks: ['my_work_3d-index']
		}),
		// new HtmlWebpackPlugin({
		// 	filename: '../views/my_work_chatonline.html',
		// 	template: 'src/web/views/my_work_chatonline/pages/my_work_chatonline.html',
		// 	inject: false,
		// 	chunks: ['my_work_chatonline-index']
		// }),
		new HtmlWebpackPlugin({
			filename: '../views/layout.html',
			template: 'src/web/views/common/pages/layout.html',
			inject: false
		}),
		new HtmlWebpackPlugin({
			filename: '../views/work_layout.html',
			template: 'src/web/views/common/pages/work_layout.html',
			inject: false
		}),
		new HtmlWebpackPlugin({
			filename: '../widget/header.html',
			template: 'src/web/widget/header/header.html',
			inject: false
		}),
		new HtmlWebpackPlugin({
			filename: '../widget/main.html',
			template: 'src/web/widget/main/main.html',
			inject: false
		}),
		new HtmlWebpackPlugin({
			filename: '../widget/footer.html',
			template: 'src/web/widget/footer/footer.html',
			inject: false
		}),
		new HtmlWebpackPlugin({
			filename: '../widget/jd_main.html',
			template: 'src/web/widget/jd_main/jd_main.html',
			inject: false
		}),
		new HtmlWebpackPlugin({
			filename: '../widget/work_main.html',
			template: 'src/web/widget/work_main/work_main.html',
			inject: false
		}),
		new HtmlWebpackPlugin({
			filename: '../widget/3d_main.html',
			template: 'src/web/widget/3d_main/3d_main.html',
			inject: false
		}),
		// new HtmlWebpackPlugin({
		// 	filename: '../widget/chatonline_main.html',
		// 	template: 'src/web/widget/chatonline_main/chatonline_main.html',
		// 	inject: false
		// }),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"dev"'
			}
		}),
		new HtmlAfterWebapckPlugin({})
	]
}
const _options = Object.assign(conf.dev, options);
module.exports = _options;