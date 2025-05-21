import express from 'express';
const router = express.Router();

import userRoutes from './userRoutes';
import paymentRoutes from './paymentRoutes';

router.use('/api', userRoutes);
router.use('/api', paymentRoutes);

export default router;