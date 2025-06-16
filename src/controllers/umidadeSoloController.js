import { findAll, create, update, remove } from "../models/umidadeSoloModel.js";

export const getUmidades = async (req, res) => {
    try {
        const umidades = await findAll();
        res.status(200).json(umidades);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar umidades" });
    }
};

export const createUmidade = async (req, res) => {
    try {
        const result = await create(req.body);
        res.status(201).json({ message: "Umidade registrada", id: result.lastInsertRowid });
    } catch (error) {
        console.error("Erro detalhado:", error); // Adicione esta linha
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
        res.status(500).json({ message: "Erro ao deletar umidade" });
    }
};