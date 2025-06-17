import database from '../../db/connection.js';

export async function findAllNotificacoes() {
    try {
        const statement = database.prepare("SELECT * FROM notificacoes_app;");
        return statement.all();
    } catch (error) {
        console.error("Erro ao buscar notificações:", error);
        throw error;
    }
}

export async function createNotificacao(data) {
    try {
        const statement = database.prepare(
            "INSERT INTO notificacoes_app (usuario_id, mensagem, data_notificacao, lida) VALUES (?, ?, ?, ?);"
        );
        return statement.run(data.usuario_id, data.mensagem, data.data_notificacao, data.lida ? 1 : 0);
    } catch (error) {
        console.error("Erro ao criar notificação:", error);
        throw error;
    }
}

export async function updateNotificacao(id, data) {
    try {
        const statement = database.prepare(
            "UPDATE notificacoes_app SET usuario_id = ?, mensagem = ?, data_notificacao = ?, lida = ? WHERE id = ?;"
        );
        return statement.run(data.usuario_id, data.mensagem, data.data_notificacao, data.lida ? 1 : 0, id);
    } catch (error) {
        console.error("Erro ao atualizar notificação:", error);
        throw error;
    }
}

export async function removeNotificacao(id) {
    try {
        const statement = database.prepare("DELETE FROM notificacoes_app WHERE id = ?;");
        return statement.run(id);
    } catch (error) {
        console.error("Erro ao deletar notificação:", error);
        throw error;
    }
}