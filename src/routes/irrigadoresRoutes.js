import express from 'express';
import {
    getIrrigadores,
    createIrrigador,
    updateIrrigador,
    deleteIrrigador,
    createControle,
    getControles
} from '../controllers/irrigadoresController.js';

const router = express.Router();

// Rotas de irrigadores
router.get('/irrigadores', getIrrigadores);
router.post('/irrigadores', createIrrigador);
router.patch('/irrigadores/:id', updateIrrigador);
router.delete('/irrigadores/:id', deleteIrrigador);

// Rotas de controle de irrigação
router.post('/controles-irrigacao', createControle);
router.get('/controles-irrigacao', getControles);

export default router;