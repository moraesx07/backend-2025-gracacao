import database from '../../db/connection.js';

// Irrigadores
export async function findAll() {
    const statement = database.prepare("SELECT * FROM irrigadores;");
    return statement.all();
}

export async function create(data) {
    const statement = database.prepare(
        "INSERT INTO irrigadores (id_usuario, status, data_ultima_ativacao) VALUES (?, ?, ?);"
    );
    return statement.run(data.id_usuario, data.status ? 1 : 0, data.data_ultima_ativacao);
}

export async function update(id, data) {
    const statement = database.prepare(
        "UPDATE irrigadores SET id_usuario = ?, status = ?, data_ultima_ativacao = ? WHERE id = ?;"
    );
    return statement.run(data.id_usuario, data.status ? 1 : 0, data.data_ultima_ativacao, id);
}

export async function remove(id) {
    const statement = database.prepare("DELETE FROM irrigadores WHERE id = ?;");
    return statement.run(id);
}

// Controles de Irrigação
export async function findAllControles() {
    const statement = database.prepare("SELECT * FROM controles_irrigacao;");
    return statement.all();
}

export async function createControle(data) {
    const statement = database.prepare(
        "INSERT INTO controles_irrigacao (sistema_id, status, data_controle) VALUES (?, ?, ?);"
    );
    return statement.run(data.sistema_id, data.status, data.data_controle);
}