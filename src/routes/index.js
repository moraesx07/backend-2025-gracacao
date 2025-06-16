import express from 'express';
const router = express.Router();

import userRoutes from './userRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import controlesIrrigacaoRoutes from './controlesIrrigacaoRoutes.js';

router.use('/', userRoutes);
router.use('/', paymentRoutes);
router.use('/controles', controlesIrrigacaoRoutes);

export default router;
