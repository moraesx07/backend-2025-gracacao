import { findAll, create, update, remove, findAllControles, createControle as createControleModel } from "../models/irrigadoresModel.js";
import { z } from "zod";

// Schema de validação para irrigadores
const IrrigadorSchema = z.object({
    id_usuario: z.number().min(1, "ID do usuário é obrigatório"),
    status: z.boolean().optional(),
    data_ultima_ativacao: z.string().datetime({ message: "Data inválida" }).optional(),
});

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
        const irrigadorData = IrrigadorSchema.parse(req.body);
        const result = await create(irrigadorData);
        res.status(201).json({ message: "Irrigador criado", id: result.lastInsertRowid });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: "Erro de validação", details: error.errors });
        }
        console.error(error);
        res.status(500).json({ message: "Erro ao criar irrigador" });
    }
};

export const updateIrrigador = async (req, res) => {
    try {
        const { id } = req.params;
        const irrigadorData = IrrigadorSchema.parse(req.body);
        const result = await update(id, irrigadorData);
        if (result.changes === 0) return res.status(404).json({ message: "Irrigador não encontrado" });
        res.status(200).json({ message: "Irrigador atualizado" });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: "Erro de validação", details: error.errors });
        }
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
    const controleData = ControleIrrigacaoSchema.parse(req.body);
    const result = await createControleModel(controleData);
    res.status(201).json({
      message: "Controle de irrigação criado com sucesso!",
      id: result.lastInsertRowid,
      data: controleData,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Erro de validação", details: error.errors });
    }
    console.error(error);
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