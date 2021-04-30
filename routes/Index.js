import routerx from 'express-promise-router';
import categoryRoutes from './CategoryRoutes';
import itemRoutes from './ItemRoutes';
import userRoutes from './UserRoutes';

const router = routerx();

router.use('/category', categoryRoutes);
router.use('/item', itemRoutes);
router.use('/user', userRoutes);

export default router;