import indexController from './indexController';
const controllerInit = {
	getAllrouters(app, router) {
		app.use(router(_ => {
			_.get('/', indexController.index());
			_.get('/index/index', indexController.index());
			_.get('/index', indexController.main());
			_.get('/index/jd', indexController.jd());
			_.get('/index/work', indexController.work());
			_.get('/index/work/chatonline', indexController.chatonline());
			_.get('/index/work/3d', indexController.work_3d());
			_.get('/index/work/game2048', indexController.game2048());
			_.get('/index/work/jdmall', indexController.jdmall());
			_.get('/index/work/gallery', indexController.gallery());
		}));
	}
};
export default controllerInit;