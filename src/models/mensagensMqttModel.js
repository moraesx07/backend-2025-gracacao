import database from '../../db/connection.js';

export async function findAllMensagens() {
    try {
        const statement = database.prepare("SELECT * FROM mensagens_mqtt;");
        return statement.all();
    } catch (error) {
        console.error("Erro ao buscar mensagens MQTT:", error);
        throw error;
    }
}

export async function createMensagem(data) {
    try {
        const statement = database.prepare(
            "INSERT INTO mensagens_mqtt (sistema_id, tipo_mensagem, payload, data_envio) VALUES (?, ?, ?, ?);"
        );
        return statement.run(data.sistema_id, data.tipo_mensagem, data.payload, data.data_envio);
    } catch (error) {
        console.error("Erro ao criar mensagem MQTT:", error);
        throw error;
    }
}

export async function updateMensagem(id, data) {
    try {
        const statement = database.prepare(
            "UPDATE mensagens_mqtt SET sistema_id = ?, tipo_mensagem = ?, payload = ?, data_envio = ? WHERE id = ?;"
        );
        return statement.run(data.sistema_id, data.tipo_mensagem, data.payload, data.data_envio, id);
    } catch (error) {
        console.error("Erro ao atualizar mensagem MQTT:", error);
        throw error;
    }
}

export async function removeMensagem(id) {
    try {
        const statement = database.prepare("DELETE FROM mensagens_mqtt WHERE id = ?;");
        return statement.run(id);
    } catch (error) {
        console.error("Erro ao deletar mensagem MQTT:", error);
        throw error;
    }
}