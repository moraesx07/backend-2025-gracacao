import express from 'express';
import { getConfiguracoes, createConfiguracao, updateConfiguracao, deleteConfiguracao } from '../controllers/configuracoesUsuarioController.js';

const router = express.Router();

router.get('/configuracoes-usuario', getConfiguracoes);
router.post('/configuracoes-usuario', createConfiguracao);
router.patch('/configuracoes-usuario/:id', updateConfiguracao);
router.delete('/configuracoes-usuario/:id', deleteConfiguracao);

export default router;