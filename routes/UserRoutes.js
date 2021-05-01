import routerx from 'express-promise-router';
import userController from '../controllers/UserController';
import auth from '../middlewares/AuthMiddleware';

const router = routerx();

router.post('/login', userController.login);
router.post('/add', auth.checkUserRolAdmin, userController.add);
router.get('/query', auth.checkUserRolAdmin, userController.queryById);
router.get('/list', auth.checkUserRolAdmin, userController.list);
router.put('/update', auth.checkUserRolAdmin, userController.update);
router.delete('/remove', auth.checkUserRolAdmin, userController.remove);
//will delete 
router.put('/activate', auth.checkUserRolAdmin, userController.activate);
router.put('/deactivate', auth.checkUserRolAdmin, userController.deactivate);

export default router;