import express from 'express';
const router = express.Router();

import userRoutes from './userRoutes.js';
import paymentRoutes from './paymentRoutes.js';

router.use('/', userRoutes);
router.use('/', paymentRoutes);

export default router;