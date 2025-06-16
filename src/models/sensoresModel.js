import database from '../../db/connection.js';

export async function findAll() {
    const statement = database.prepare("SELECT * FROM sensores;");
    return statement.all();
}

export async function create(data) {
    const statement = database.prepare(
        "INSERT INTO sensores (id_usuario, localizacao, data_instalacao) VALUES (?, ?, ?);"
    );
    return statement.run(data.id_usuario, data.localizacao, data.data_instalacao);
}

export async function update(id, data) {
    const statement = database.prepare(
        "UPDATE sensores SET id_usuario = ?, localizacao = ?, data_instalacao = ? WHERE id = ?;"
    );
    return statement.run(data.id_usuario, data.localizacao, data.data_instalacao, id);
}

// filepath: src/models/sensoresModel.js
export async function remove(id) {
    // Exemplo: deletando dependências em umidade_solo
    database.prepare("DELETE FROM umidade_solo WHERE id_sensor = ?;").run(Number(id));
    const statement = database.prepare("DELETE FROM sensores WHERE id = ?;");
    return statement.run(Number(id));
}