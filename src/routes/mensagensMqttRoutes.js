import express from "express";
import {
  createMensagemMqtt,
  getMensagens,
  patchMensagemMqtt,
  deleteMensagemMqtt
} from "../controllers/mensagensMqttController.js";

const router = express.Router();

router.post("/mensagens-mqtt", createMensagemMqtt);
router.get("/mensagens-mqtt", getMensagens);
router.patch("/mensagens-mqtt/:id", patchMensagemMqtt);
router.delete("/mensagens-mqtt/:id", deleteMensagemMqtt);

export default router;