import routerx from 'express-promise-router';
import categoryRoutes from './CategoryRoutes';
import itemRoutes from './ItemRoutes';
import userRoutes from './UserRoutes';
import peopleRoutes from './PeopleRoutes';
import registerRoutes from './RegisterRoutes';
import sellRoutes from './SellRoutes'

const router = routerx();

router.use('/category', categoryRoutes);
router.use('/item', itemRoutes);
router.use('/user', userRoutes);
router.use('/person', peopleRoutes);
router.use('/register', registerRoutes);
router.use('/sell', sellRoutes);

export default router;