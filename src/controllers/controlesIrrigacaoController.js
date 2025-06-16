import { findAll, create, remove, update } from "../models/controlesIrrigacaoModel.js";
import { z } from "zod";

const controleSchema = z.object({
  id_irrigador: z.number().int().positive("ID do irrigador inválido"),
  acao: z.enum(["ligar", "desligar"], "Ação deve ser 'ligar' ou 'desligar'"),
  data_execucao: z.string().datetime("Data de execução inválida"),
});

export const getControles = async (req, res) => {
  try {
    const controles = await findAll();
    res.status(200).json(controles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno ao buscar controles" });
  }
};

export const createControle = async (req, res) => {
  try {
    const controleData = controleSchema.parse(req.body);
    const result = await create(controleData);
    res.status(201).json({ message: "Controle criado com sucesso", id: result.lastInsertRowid });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno ao criar controle" });
  }
};

export const updateControle = async (req, res) => {
  try {
    const { id } = req.params;
    const controleData = controleSchema.parse(req.body);
    const result = await update(id, controleData);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Controle não encontrado" });
    }
    res.status(200).json({ message: "Controle atualizado com sucesso" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno ao atualizar controle" });
  }
};

export const deleteControle = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await remove(id);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Controle não encontrado" });
    }
    res.status(200).json({ message: "Controle deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno ao deletar controle" });
  }
};
