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
			_.get('/index', _indexController2.default.main());
			_.get('/index/jd', _indexController2.default.jd());
			_.get('/index/work', _indexController2.default.work());
			_.get('/index/work/chatonline', _indexController2.default.chatonline());
			_.get('/index/work/3d', _indexController2.default.work_3d());
			_.get('/index/work/game2048', _indexController2.default.game2048());
			_.get('/index/work/jdmall', _indexController2.default.jdmall());
			_.get('/index/work/gallery', _indexController2.default.gallery());
		}));
	}
};
exports.default = controllerInit;