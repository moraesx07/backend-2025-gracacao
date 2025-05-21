import express from 'express';
const router = express.Router();

import { getPayments } from '../controllers/paymentController';

router.get('/payment', getPayments);

export default router;