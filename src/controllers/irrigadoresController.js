import { findAll, create, update, remove } from "../models/irrigadoresModel.js";

export const getIrrigadores = async (req, res) => {
    try {
        const irrigadores = await findAll();
        res.status(200).json(irrigadores);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar irrigadores" });
    }
};

export const createIrrigador = async (req, res) => {
    try {
        const result = await create(req.body);
        res.status(201).json({ message: "Irrigador criado", id: result.lastInsertRowid });
    } catch (error) {
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
        res.status(500).json({ message: "Erro ao deletar irrigador" });
    }
};