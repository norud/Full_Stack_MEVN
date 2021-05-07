import routerx from 'express-promise-router';
import itemController from '../controllers/ItemController';
import auth from '../middlewares/AuthMiddleware';

const router = routerx();

router.post('/add', auth.checkUserRolManager, itemController.add);
router.get('/query', auth.checkUserRolManager, itemController.queryById);
router.get('/query/code', auth.checkUser, itemController.queryByCode);
router.get('/list', auth.checkUserRolManager, itemController.list);
router.put('/update', auth.checkUserRolManager, itemController.update);
router.delete('/remove', auth.checkUserRolManager, itemController.remove);
//will delete 
router.put('/activate', auth.checkUserRolManager, itemController.activate);
router.put('/deactivate', auth.checkUserRolManager, itemController.deactivate);

export default router;