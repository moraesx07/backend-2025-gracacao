import database from '../../db/connection.js';

// Umidade do solo (CRUD)
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

// Leituras de umidade do solo
export async function findAllLeituras() {
    const statement = database.prepare("SELECT * FROM leituras_umidade_solo;");
    return statement.all();
}

export async function createLeitura(data) {
    const statement = database.prepare(
        "INSERT INTO leituras_umidade_solo (sistema_id, nivel_umidade, data_leitura) VALUES (?, ?, ?);"
    );
    return statement.run(data.sistema_id, data.nivel_umidade, data.data_leitura);
}

export async function updateLeitura(id, data) {
    const statement = database.prepare(
        "UPDATE leituras_umidade_solo SET sistema_id = ?, nivel_umidade = ?, data_leitura = ? WHERE id = ?;"
    );
    return statement.run(data.sistema_id, data.nivel_umidade, data.data_leitura, id);
}

export async function removeLeitura(id) {
    const statement = database.prepare("DELETE FROM leituras_umidade_solo WHERE id = ?;");
    return statement.run(id);
}