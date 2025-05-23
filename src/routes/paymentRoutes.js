import express from 'express';
const router = express.Router();

import { getPayments } from '../controllers/paymentController.js';

router.get('/payment', getPayments);

export default router;