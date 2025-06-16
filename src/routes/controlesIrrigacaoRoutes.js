import express from "express";
import {
  getControles,
  createControle,
  updateControle,
  deleteControle,
} from "../controllers/controlesIrrigacaoController.js";

const router = express.Router();

router.get("/controles", getControles);
router.post("/controles", createControle);
router.patch("/controles/:id", updateControle);
router.delete("/controles/:id", deleteControle);

export default router;
