import routerx from 'express-promise-router';
import categoryRoutes from './CategoryRoutes';

const router = routerx();

router.use('/category', categoryRoutes);

export default router;