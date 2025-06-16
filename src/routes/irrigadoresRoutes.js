import express from 'express';
import { getIrrigadores, createIrrigador, updateIrrigador, deleteIrrigador } from '../controllers/irrigadoresController.js';

const router = express.Router();

router.get('/irrigadores', getIrrigadores);
router.post('/irrigadores', createIrrigador);
router.patch('/irrigadores/:id', updateIrrigador);
router.delete('/irrigadores/:id', deleteIrrigador);

export default router;