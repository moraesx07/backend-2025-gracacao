import database from '../../db/connection.js';

export async function findAll() {
    const statement = database.prepare("SELECT * FROM umidade_solo;");
    return statement.all();
}

export async function create(data) {
    const statement = database.prepare(
        "INSERT INTO umidade_solo (id_sensor, umidade, data_medicao) VALUES (?, ?, ?);"
    );
    return statement.run(data.id_sensor, data.umidade, data.data_medicao);
}

export async function update(id, data) {
    const statement = database.prepare(
        "UPDATE umidade_solo SET id_sensor = ?, umidade = ?, data_medicao = ? WHERE id = ?;"
    );
    return statement.run(data.id_sensor, data.umidade, data.data_medicao, id);
}

export async function remove(id) {
    const statement = database.prepare("DELETE FROM umidade_solo WHERE id = ?;");
    return statement.run(id);
}