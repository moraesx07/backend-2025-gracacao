import express from 'express';
const router = express.Router();

import userRoutes from './userRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import sensoresRoutes from './sensoresRoutes.js';
import umidadeSoloRoutes from './umidadeSoloRoutes.js';
import irrigadoresRoutes from './irrigadoresRoutes.js';
import configuracoesUsuarioRoutes from './configuracoesUsuarioRoutes.js';

router.use('/', userRoutes);
router.use('/', paymentRoutes);
router.use('/', sensoresRoutes);
router.use('/', umidadeSoloRoutes);
router.use('/', irrigadoresRoutes);
router.use('/', configuracoesUsuarioRoutes);

export default router;