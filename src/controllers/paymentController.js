import { findAll, create, update, remove } from "../models/paymentModel.js";
import { z } from "zod";

// Schema de validação para pagamentos
const PaymentSchema = z.object({
    user_id: z.number().min(1, "ID do usuário é obrigatório"),
    value: z.number().positive("Valor deve ser positivo"),
    receipt: z.string().min(1, "Comprovante é obrigatório"),
    paymentdate: z.string().datetime({ message: "Data inválida" }),
    status: z.enum(["pendente", "aprovado", "rejeitado"]).optional(),
});

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
        const paymentData = PaymentSchema.parse(req.body);
        const result = await create(paymentData);
        res.status(201).json({ message: "Pagamento criado com sucesso", paymentId: result.lastInsertRowid });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: "Erro de validação", details: error.errors });
        }
        console.error("Erro detalhado:", error);
        res.status(500).json({ message: "Erro ao criar pagamento" });
    }
};

// ...existing code...

// ...existing code...

export const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const paymentData = PaymentSchema.parse(req.body);
        const result = await update(id, paymentData);
        if (result.changes === 0) {
            return res.status(404).json({ message: "Pagamento não encontrado" });
        }
        res.status(200).json({ message: "Pagamento atualizado com sucesso" });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: "Erro de validação", details: error.errors });
        }
        console.error("Erro detalhado:", error);
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