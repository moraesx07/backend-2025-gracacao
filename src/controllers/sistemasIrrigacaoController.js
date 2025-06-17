import { z } from "zod";
import { findAllSistemas, createSistema, updateSistema, removeSistema } from "../models/sistemasIrrigacaoModel.js";

const SistemaIrrigacaoSchema = z.object({
  usuario_id: z.number().min(1, "ID do usuário é obrigatório"),
  nome_sistema: z.string().min(1, "Nome do sistema é obrigatório"),
  localizacao: z.string().min(1, "Localização é obrigatória"),
});

export const createSistemaIrrigacao = async (req, res) => {
  try {
    SistemaIrrigacaoSchema.parse(req.body);
    const result = await createSistema(req.body);
    res.status(201).json({
      message: "Sistema de irrigação criado com sucesso!",
      id: result.lastInsertRowid,
      data: req.body,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Erro de validação", details: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const updateSistemaIrrigacao = async (req, res) => {
  const { id } = req.params;
  try {
    SistemaIrrigacaoSchema.parse(req.body);
    const result = await updateSistema(id, req.body);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Sistema de irrigação não encontrado" });
    }
    res.status(200).json({
      message: "Sistema de irrigação atualizado com sucesso!",
      data: req.body,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Erro de validação", details: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const getSistemasIrrigacao = async (req, res) => {
  try {
    const sistemas = await findAllSistemas();
    res.status(200).json({
      message: "Sistemas de irrigação encontrados com sucesso!",
      data: sistemas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const deleteSistemaIrrigacao = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await removeSistema(id);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Sistema de irrigação não encontrado" });
    }
    res.status(200).json({
      message: `Sistema de irrigação com ID ${id} deletado com sucesso.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};