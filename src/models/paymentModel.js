import database from '../../db/connection.js';

// Buscar todos os pagamentos
export async function findAll() {
    try {
        const query = "SELECT * FROM payments;";
        const statement = database.prepare(query);
        const payments = statement.all();
        return payments;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching payments: " + error.message);
    }
}

// Criar um novo pagamento
export async function create(paymentData) {
    try {
        const query = `
            INSERT INTO payments (
                user_id, user_control, value, receipt, obs, paymentdate, verified, photo
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `;
        const statement = database.prepare(query);
       const params = [
    paymentData.user_id,
    paymentData.user_control || null,
    paymentData.value,
    paymentData.receipt,
    paymentData.obs || null,
    paymentData.paymentdate,
    paymentData.verified ? 1 : 0, // <-- Corrigido aqui!
    paymentData.photo || null
];
        const result = statement.run(...params);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error creating payment: " + error.message);
    }
}

// ...existing code...

// Atualizar um pagamento
export async function update(id, paymentData) {
    try {
        const query = `
            UPDATE payments SET
                user_id = ?,
                user_control = ?,
                value = ?,
                receipt = ?,
                obs = ?,
                paymentdate = ?,
                verified = ?,
                photo = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?;
        `;
        const statement = database.prepare(query);
        const params = [
            paymentData.user_id,
            paymentData.user_control || null,
            paymentData.value,
            paymentData.receipt,
            paymentData.obs || null,
            paymentData.paymentdate,
            paymentData.verified ? 1 : 0, // Corrigido para 0/1
            paymentData.photo || null,
            id
        ];
        const result = statement.run(...params);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error updating payment: " + error.message);
    }
}

// Deletar um pagamento
export async function remove(id) {
    try {
        const query = "DELETE FROM payments WHERE id = ?;";
        const statement = database.prepare(query);
        const result = statement.run(id);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting payment: " + error.message);
    }
}
// ...existing code...