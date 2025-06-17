import express from "express";
import {
  getUmidades,
  createUmidade,
  updateUmidade,
  deleteUmidade,
  createLeitura,
  getLeituras,
  patchLeitura,
  deleteLeitura
} from "../controllers/umidadeSoloController.js";

const router = express.Router();

// Rotas umidade_solo
router.get("/umidade-solo", getUmidades);
router.post("/umidade-solo", createUmidade);
router.patch("/umidade-solo/:id", updateUmidade);
router.delete("/umidade-solo/:id", deleteUmidade);

// Rotas leituras_umidade_solo
router.post("/leituras-umidade-solo", createLeitura);
// router.get("/leituras-umidade-solo", getLeituras);
router.patch("/leituras-umidade-solo/:id", patchLeitura);
router.delete("/leituras-umidade-solo/:id", deleteLeitura);

export default router;