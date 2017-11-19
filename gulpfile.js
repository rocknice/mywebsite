const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
//开发环境的gulp
gulp.task('builddev', () => {
	//开发环境 主要是监听文件变化，自动编译
	return watch('./src/nodeuii/**/*.js', {
		ignoreInitial: false //忽略gulp初始化
	}, () => {
		gulp.src('./src/nodeuii/**/*.js')
			.pipe(babel({
				//如果不把它设置成false，使用外面那个babelrc。
				babelrc: false, //很重要，这里要配置自己需要的babel配置，外边的给webpack用
				"plugins": [
					"transform-es2015-modules-commonjs" //因为exports和default和很多es6语法，node现在都识别了，所以只用这个插件编译es6模块化的代码就可以了
				]
			}))
			.pipe(gulp.dest('./build/'))
	})
});
//上线环境的gulp
gulp.task('buildprod', () => {
	//不监听变化，直接编译
	gulp.src('./src/nodeuii/**/*.js')
		.pipe(babel({
			babelrc: false, //很重要，这里要配置自己需要的babel配置
			"plugins": [
				"transform-es2015-modules-commonjs"
			]
		}))
		.pipe(gulp.dest('./build/'))
});
//默认的task
gulp.task('default', [process.env.NODE_ENV == "production" ? "buildprod" : "builddev"]); //根据环境变量来判断开发还是先上环境