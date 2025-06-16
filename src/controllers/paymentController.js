import { findAll, create, update, remove } from "../models/paymentModel.js";

// Buscar todos os pagamentos
export const getPayments = async (req, res) => {
    try {
        const payments = await findAll();
        res.status(200).json(payments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao buscar pagamentos" });
    }
};

// Criar pagamento
export const createPayment = async (req, res) => {
    try {
        const paymentData = req.body;
        if (
            !paymentData.user_id ||
            !paymentData.value ||
            !paymentData.receipt ||
            !paymentData.paymentdate
        ) {
            return res.status(400).json({ message: "Campos obrigatórios faltando" });
        }
        const result = await create(paymentData);
        res.status(201).json({ message: "Pagamento criado com sucesso", paymentId: result.lastInsertRowid });
    } catch (error) {
        console.error("Erro detalhado:", error); // Log detalhado do erro
        res.status(500).json({ message: "Erro ao criar pagamento" });
    }
};

// ...existing code...

// ...existing code...

export const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const paymentData = req.body;
        const result = await update(id, paymentData);
        if (result.changes === 0) {
            return res.status(404).json({ message: "Pagamento não encontrado" });
        }
        res.status(200).json({ message: "Pagamento atualizado com sucesso" });
    } catch (error) {
        console.error("Erro detalhado:", error); // Adicione esta linha
        res.status(500).json({ message: "Internal Server Error - controller" });
    }
};

export const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await remove(id);
        if (result.changes === 0) {
            return res.status(404).json({ message: "Pagamento não encontrado" });
        }
        res.status(200).json({ message: "Pagamento deletado com sucesso" });
    } catch (error) {
        console.error("Erro detalhado:", error); // Adicione esta linha
        res.status(500).json({ message: "Internal Server Error - controller" });
    }
};
// ...existing code...