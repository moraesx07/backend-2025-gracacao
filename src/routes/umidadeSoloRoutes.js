import express from 'express';
import { getUmidades, createUmidade, updateUmidade, deleteUmidade } from '../controllers/umidadeSoloController.js';

const router = express.Router();

router.get('/umidade-solo', getUmidades);
router.post('/umidade-solo', createUmidade);
router.patch('/umidade-solo/:id', updateUmidade);
router.delete('/umidade-solo/:id', deleteUmidade);

export default router;