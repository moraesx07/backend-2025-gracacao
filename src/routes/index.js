import express from 'express';
const router = express.Router();

import userRoutes from './userRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import sensoresRoutes from './sensoresRoutes.js';
import umidadeSoloRoutes from './umidadeSoloRoutes.js';
import irrigadoresRoutes from './irrigadoresRoutes.js';
import configuracoesUsuarioRoutes from './configuracoesUsuarioRoutes.js';
import mensagensMqttRoutes from './mensagensMqttRoutes.js';
import notificacoesAppRoutes from './notificacoesAppRoutes.js';
import sistemasIrrigacaoRoutes from './sistemasIrrigacaoRoutes.js';
// Se você unificou as rotas de irrigadores e controles de irrigação,
// não precisa importar controlesIrrigacaoRoutes separadamente.
// Remova a linha abaixo se já incluiu as rotas de controle de irrigação em irrigadoresRoutes.js
// import controlesIrrigacaoRoutes from './controlesIrrigacaoRoutes.js';
router.use('/', mensagensMqttRoutes);
router.use('/', notificacoesAppRoutes);
router.use('/', sistemasIrrigacaoRoutes);
router.use('/', userRoutes);
router.use('/', paymentRoutes);
router.use('/', sensoresRoutes);
router.use('/', umidadeSoloRoutes);
router.use('/', irrigadoresRoutes);
router.use('/', configuracoesUsuarioRoutes);

// Remova ou comente a linha abaixo se já está tudo em irrigadoresRoutes.js
// router.use('/', controlesIrrigacaoRoutes);

export default router;