import express from 'express';
const router = express.Router();

import { getPayments, createPayment, updatePayment, deletePayment } from "../controllers/paymentController.js";

router.get("/payment", getPayments);
router.post("/payment", createPayment);
router.patch("/payment/:id", updatePayment);
router.delete("/payment/:id", deletePayment);

export default router;