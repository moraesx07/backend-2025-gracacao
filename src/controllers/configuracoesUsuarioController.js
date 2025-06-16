import { findAll, create, update, remove } from "../models/configuracoesUsuarioModel.js";

export const getConfiguracoes = async (req, res) => {
    try {
        const configuracoes = await findAll();
        res.status(200).json(configuracoes);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar configurações" });
    }
};

export const createConfiguracao = async (req, res) => {
    try {
        const result = await create(req.body);
        res.status(201).json({ message: "Configuração criada", id: result.lastInsertRowid });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar configuração" });
    }
};

export const updateConfiguracao = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await update(id, req.body);
        if (result.changes === 0) return res.status(404).json({ message: "Configuração não encontrada" });
        res.status(200).json({ message: "Configuração atualizada" });
    } catch (error) {
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
        res.status(500).json({ message: "Erro ao deletar configuração" });
    }
};