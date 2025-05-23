import express from 'express';
const router = express.Router();

import userRoutes from './userRoutes.js';
import paymentRoutes from './paymentRoutes.js';

router.use('/api', userRoutes);
router.use('/api', paymentRoutes);

export default router;