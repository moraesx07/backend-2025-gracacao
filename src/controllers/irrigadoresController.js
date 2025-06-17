import { findAll, create, update, remove, findAllControles, createControle as createControleModel } from "../models/irrigadoresModel.js";
import { z } from "zod";

// CRUD irrigadores
export const getIrrigadores = async (req, res) => {
    try {
        const irrigadores = await findAll();
        res.status(200).json(irrigadores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar irrigadores" });
    }
};

export const createIrrigador = async (req, res) => {
    try {
        const result = await create(req.body);
        res.status(201).json({ message: "Irrigador criado", id: result.lastInsertRowid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar irrigador" });
    }
};

export const updateIrrigador = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await update(id, req.body);
        if (result.changes === 0) return res.status(404).json({ message: "Irrigador não encontrado" });
        res.status(200).json({ message: "Irrigador atualizado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar irrigador" });
    }
};

export const deleteIrrigador = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await remove(id);
        if (result.changes === 0) return res.status(404).json({ message: "Irrigador não encontrado" });
        res.status(200).json({ message: "Irrigador deletado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao deletar irrigador" });
    }
};

// Controle de irrigação (ligar/desligar)
const ControleIrrigacaoSchema = z.object({
  sistema_id: z.number().min(1, "ID do sistema é obrigatório"),
  status: z.enum(["ligado", "desligado"], "Status deve ser 'ligado' ou 'desligado'"),
  data_controle: z.string().datetime({ message: "Data inválida" }),
});

export const createControle = async (req, res) => {
  try {
    ControleIrrigacaoSchema.parse(req.body);
    const result = await createControleModel(req.body);
    res.status(201).json({
      message: "Controle de irrigação criado com sucesso!",
      id: result.lastInsertRowid,
      data: req.body,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Erro de validação", details: error.errors });
    }
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const getControles = async (req, res) => {
  try {
    const controles = await findAllControles();
    res.status(200).json({
      message: "Controles de irrigação recuperados com sucesso!",
      data: controles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};