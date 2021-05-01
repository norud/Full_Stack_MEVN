import routerx from 'express-promise-router';
import peopleController from '../controllers/PeopleController';
import auth from '../middlewares/AuthMiddleware';

const router = routerx();


router.post('/add', auth.checkUser, peopleController.add);
router.get('/query', auth.checkUser, peopleController.queryById);
router.get('/list', auth.checkUser, peopleController.list);
router.get('/list/customer', auth.checkUser, peopleController.listCustomer);
router.get('/list/provider', auth.checkUser, peopleController.listProvider);
router.get('/list', auth.checkUser, peopleController.list);
router.put('/update', auth.checkUser, peopleController.update);
router.delete('/remove', auth.checkUser, peopleController.remove);
//will delete 
router.put('/activate', auth.checkUser, peopleController.activate);
router.put('/deactivate', auth.checkUser, peopleController.deactivate);

export default router;