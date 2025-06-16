import database from '../../db/connection.js';

export async function findAll() {
    const statement = database.prepare("SELECT * FROM configuracoes_usuario;");
    return statement.all();
}

export async function create(data) {
    const statement = database.prepare(
        "INSERT INTO configuracoes_usuario (id_usuario, umidade_minima, umidade_maxima, modo_manual) VALUES (?, ?, ?, ?);"
    );
    return statement.run(data.id_usuario, data.umidade_minima, data.umidade_maxima, data.modo_manual ? 1 : 0);
}

export async function update(id, data) {
    const statement = database.prepare(
        "UPDATE configuracoes_usuario SET id_usuario = ?, umidade_minima = ?, umidade_maxima = ?, modo_manual = ? WHERE id = ?;"
    );
    return statement.run(data.id_usuario, data.umidade_minima, data.umidade_maxima, data.modo_manual ? 1 : 0, id);
}

export async function remove(id) {
    const statement = database.prepare("DELETE FROM configuracoes_usuario WHERE id = ?;");
    return statement.run(id);
}