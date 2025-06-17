import express from "express";
import {
  createSistemaIrrigacao,
  updateSistemaIrrigacao,
  deleteSistemaIrrigacao,
  getSistemasIrrigacao
} from "../controllers/sistemasIrrigacaoController.js";

const router = express.Router();

router.post("/sistemas-irrigacao", createSistemaIrrigacao);
router.patch("/sistemas-irrigacao/:id", updateSistemaIrrigacao);
router.delete("/sistemas-irrigacao/:id", deleteSistemaIrrigacao);
router.get("/sistemas-irrigacao", getSistemasIrrigacao);

export default router;