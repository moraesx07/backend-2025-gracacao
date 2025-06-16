import express from 'express';
import { getSensores, createSensor, updateSensor, deleteSensor } from '../controllers/sensoresController.js';

const router = express.Router();

router.get('/sensores', getSensores);
router.post('/sensores', createSensor);
router.patch('/sensores/:id', updateSensor);
router.delete('/sensores/:id', deleteSensor);

export default router;