import { findAll, create, update, remove } from "../models/sensoresModel.js";

export const getSensores = async (req, res) => {
    try {
        const sensores = await findAll();
        res.status(200).json(sensores);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar sensores" });
    }
};

export const createSensor = async (req, res) => {
    try {
        const result = await create(req.body);
        res.status(201).json({ message: "Sensor criado", id: result.lastInsertRowid });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar sensor" });
    }
};

export const updateSensor = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await update(id, req.body);
        if (result.changes === 0) return res.status(404).json({ message: "Sensor não encontrado" });
        res.status(200).json({ message: "Sensor atualizado" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar sensor" });
    }
};

// filepath: controllers/sensoresController.js
export const deleteSensor = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await remove(id);
        if (result.changes === 0) return res.status(404).json({ message: "Sensor não encontrado" });
        res.status(200).json({ message: "Sensor deletado" });
    } catch (error) {
        console.error("Erro ao deletar sensor:", error); // <-- Adicione este log
        res.status(500).json({ message: "Erro ao deletar sensor", error: error.message });
    }
};