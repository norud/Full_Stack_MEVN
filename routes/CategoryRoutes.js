import routerx from 'express-promise-router';
import categoryController from '../controllers/CategoryController';
import auth from '../middlewares/AuthMiddleware';

const router = routerx();

router.post('/add', auth.checkUserRolManager, categoryController.add);
router.get('/query', auth.checkUserRolManager, categoryController.queryById);
router.get('/list', auth.checkUserRolManager, categoryController.list);
router.put('/update', auth.checkUserRolManager, categoryController.update);
router.delete('/remove', auth.checkUserRolManager, categoryController.remove);
//will delete 
router.put('/activate', auth.checkUserRolManager, categoryController.activate);
router.put('/deactivate', auth.checkUserRolManager, categoryController.deactivate);

export default router;