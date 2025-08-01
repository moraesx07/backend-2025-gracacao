import { findAll, create, update, remove } from "../models/configuracoesUsuarioModel.js";
import { z } from "zod";

// Schema de validação para configurações de usuário
const ConfiguracaoUsuarioSchema = z.object({
    id_usuario: z.number().min(1, "ID do usuário é obrigatório"),
    umidade_minima: z.number().min(0).max(100, "Umidade mínima deve ser entre 0 e 100").optional(),
    umidade_maxima: z.number().min(0).max(100, "Umidade máxima deve ser entre 0 e 100").optional(),
    modo_manual: z.boolean().optional(),
});

export const getConfiguracoes = async (req, res) => {
    try {
        const configuracoes = await findAll();
        res.status(200).json(configuracoes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar configurações" });
    }
};

export const createConfiguracao = async (req, res) => {
    try {
        const configuracaoData = ConfiguracaoUsuarioSchema.parse(req.body);
        const result = await create(configuracaoData);
        res.status(201).json({ message: "Configuração criada", id: result.lastInsertRowid });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: "Erro de validação", details: error.errors });
        }
        console.error(error);
        res.status(500).json({ message: "Erro ao criar configuração" });
    }
};

export const updateConfiguracao = async (req, res) => {
    try {
        const { id } = req.params;
        const configuracaoData = ConfiguracaoUsuarioSchema.parse(req.body);
        const result = await update(id, configuracaoData);
        if (result.changes === 0) return res.status(404).json({ message: "Configuração não encontrada" });
        res.status(200).json({ message: "Configuração atualizada" });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: "Erro de validação", details: error.errors });
        }
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar configuração" });
    }
};

export const deleteConfiguracao = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await remove(id);
        if (result.changes === 0) return res.status(404).json({ message: "Configuração não encontrada" });
        res.status(200).json({ message: "Configuração deletada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao deletar configuração" });
    }
};