import routerx from 'express-promise-router';
import userController from '../controllers/UserController';

const router = routerx();

router.post('/login', userController.login);
router.post('/add', userController.add);
router.get('/query', userController.queryById);
router.get('/list', userController.list);
router.put('/update', userController.update);
router.delete('/remove', userController.remove);
//will delete 
router.put('/activate', userController.activate);
router.put('/deactivate', userController.deactivate);

export default router;