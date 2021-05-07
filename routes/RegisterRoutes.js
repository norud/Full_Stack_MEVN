import routerx from 'express-promise-router';
import registerController from '../controllers/RegisterController';
import auth from '../middlewares/AuthMiddleware';

const router = routerx();

router.post('/add', auth.checkUserRolManager, registerController.add);
router.get('/query', auth.checkUserRolManager, registerController.queryById);
router.get('/query/code', auth.checkUserSeller, registerController.queryByCode);
router.get('/list', auth.checkUserRolManager, registerController.list);
router.get('/reports/last-twelve-months', auth.checkUser, registerController.lastTwelveMonths);
router.get('/reports/by-date-range', auth.checkUser, registerController.queryByDateRange);
//will delete 
router.put('/activate', auth.checkUserRolManager, registerController.activate);
router.put('/deactivate', auth.checkUserRolManager, registerController.deactivate);

export default router;