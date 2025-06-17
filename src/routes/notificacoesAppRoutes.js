import express from "express";
import {
  createNotificacaoApp,
  getNotificacoesApp,
  patchNotificacaoApp,
  deleteNotificacaoApp
} from "../controllers/notificacoesAppController.js";

const router = express.Router();

router.post("/notificacoes-app", createNotificacaoApp);
router.get("/notificacoes-app", getNotificacoesApp);
router.patch("/notificacoes-app/:id", patchNotificacaoApp);
router.delete("/notificacoes-app/:id", deleteNotificacaoApp);

export default router;