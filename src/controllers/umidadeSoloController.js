import { findAll, create, update, remove, findAllLeituras, createLeitura as createLeituraModel, updateLeitura, removeLeitura } from "../models/umidadeSoloModel.js";
import { z } from "zod";

// CRUD umidade_solo
export const getUmidades = async (req, res) => {
    try {
        const umidades = await findAll();
        res.status(200).json(umidades);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar umidades" });
    }
};

export const createUmidade = async (req, res) => {
    try {
        const result = await create(req.body);
        res.status(201).json({ message: "Umidade registrada", id: result.lastInsertRowid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao registrar umidade" });
    }
};

export const updateUmidade = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await update(id, req.body);
        if (result.changes === 0) return res.status(404).json({ message: "Registro não encontrado" });
        res.status(200).json({ message: "Umidade atualizada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar umidade" });
    }
};

export const deleteUmidade = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await remove(id);
        if (result.changes === 0) return res.status(404).json({ message: "Registro não encontrado" });
        res.status(200).json({ message: "Umidade deletada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao deletar umidade" });
    }
};

// Leituras de umidade do solo
const LeituraUmidadeSoloSchema = z.object({
  sistema_id: z.number().min(1, "ID do sistema é obrigatório"),
  nivel_umidade: z.number().min(0).max(100, "Nível de umidade deve ser entre 0 e 100"),
  data_leitura: z.string().datetime({ message: "Data inválida" }),
});

export const createLeitura = async (req, res) => {
  try {
    LeituraUmidadeSoloSchema.parse(req.body);
    const result = await createLeituraModel(req.body);
    res.status(201).json({
      message: "Leitura de umidade criada com sucesso!",
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

export const getLeituras = async (req, res) => {
  try {
    const leituras = await findAllLeituras();
    res.status(200).json({
      message: "Leituras de umidade recuperadas com sucesso!",
      data: leituras,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const patchLeitura = async (req, res) => {
  try {
    LeituraUmidadeSoloSchema.parse(req.body);
    const { id } = req.params;
    const result = await updateLeitura(id, req.body);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Leitura não encontrada" });
    }
    res.status(200).json({ message: "Leitura atualizada com sucesso" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Erro de validação", details: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar leitura" });
  }
};

export const deleteLeitura = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await removeLeitura(id);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Leitura não encontrada" });
    }
    res.status(200).json({ message: "Leitura deletada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar leitura" });
  }
};