import routerx from 'express-promise-router';
import sellController from '../controllers/SellController';
import auth from '../middlewares/AuthMiddleware';

const router = routerx();

router.post('/add', auth.checkUserSeller, sellController.add);
router.get('/query', auth.checkUserSeller, sellController.queryById);
router.get('/query/code', auth.checkUserSeller, sellController.queryByCode);
router.get('/list', auth.checkUserSeller, sellController.list);
router.get('/reports/last-twelve-months', auth.checkUser, sellController.lastTwelveMonths);
router.get('/reports/by-date-range', auth.checkUser, sellController.queryByDateRange);
//will delete 
router.put('/activate', auth.checkUserSeller, sellController.activate);
router.put('/deactivate', auth.checkUserSeller, sellController.deactivate);

export default router;