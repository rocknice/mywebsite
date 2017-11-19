'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _indexController = require('./indexController');

var _indexController2 = _interopRequireDefault(_indexController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const controllerInit = {
	getAllrouters(app, router) {
		app.use(router(_ => {
			_.get('/', _indexController2.default.index());
			_.get('/index/index', _indexController2.default.index());
			_.get('/index/index.html', _indexController2.default.index());
			_.get('/my_jd', _indexController2.default.my_jd());
		}));
	}
};
exports.default = controllerInit;