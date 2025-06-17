import database from '../../db/connection.js';

export async function findAllSistemas() {
    try {
        const statement = database.prepare("SELECT * FROM sistemas_irrigacao;");
        return statement.all();
    } catch (error) {
        console.error("Erro ao buscar sistemas de irrigação:", error);
        throw error;
    }
}

export async function createSistema(data) {
    try {
        const statement = database.prepare(
            "INSERT INTO sistemas_irrigacao (usuario_id, nome_sistema, localizacao) VALUES (?, ?, ?);"
        );
        return statement.run(data.usuario_id, data.nome_sistema, data.localizacao);
    } catch (error) {
        console.error("Erro ao criar sistema de irrigação:", error);
        throw error;
    }
}

export async function updateSistema(id, data) {
    try {
        const statement = database.prepare(
            "UPDATE sistemas_irrigacao SET usuario_id = ?, nome_sistema = ?, localizacao = ? WHERE id = ?;"
        );
        return statement.run(data.usuario_id, data.nome_sistema, data.localizacao, id);
    } catch (error) {
        console.error("Erro ao atualizar sistema de irrigação:", error);
        throw error;
    }
}

export async function removeSistema(id) {
    try {
        const statement = database.prepare("DELETE FROM sistemas_irrigacao WHERE id = ?;");
        return statement.run(id);
    } catch (error) {
        console.error("Erro ao deletar sistema de irrigação:", error);
        throw error;
    }
}