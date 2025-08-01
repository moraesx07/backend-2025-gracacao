import { findAll, create, update, remove } from "../models/sensoresModel.js";
import { z } from "zod";

// Schema de validação para sensores
const SensorSchema = z.object({
    id_usuario: z.number().min(1, "ID do usuário é obrigatório"),
    localizacao: z.string().min(1, "Localização é obrigatória"),
    data_instalacao: z.string().datetime({ message: "Data inválida" }).optional(),
});

export const getSensores = async (req, res) => {
    try {
        const sensores = await findAll();
        res.status(200).json(sensores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar sensores" });
    }
};

export const createSensor = async (req, res) => {
    try {
        const sensorData = SensorSchema.parse(req.body);
        const result = await create(sensorData);
        res.status(201).json({ message: "Sensor criado", id: result.lastInsertRowid });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: "Erro de validação", details: error.errors });
        }
        console.error(error);
        res.status(500).json({ message: "Erro ao criar sensor" });
    }
};

export const updateSensor = async (req, res) => {
    try {
        const { id } = req.params;
        const sensorData = SensorSchema.parse(req.body);
        const result = await update(id, sensorData);
        if (result.changes === 0) return res.status(404).json({ message: "Sensor não encontrado" });
        res.status(200).json({ message: "Sensor atualizado" });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: "Erro de validação", details: error.errors });
        }
        console.error(error);
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