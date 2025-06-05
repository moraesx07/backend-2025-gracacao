import database from '../../db/connection.js';

export async function findAll() {
    try {
        const query = "SELECT id, usarname, email, foto FROM users;";
        const statement = database.prepare(query);
        const users = statement.all();
        return users;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching users: " + error.message);
    } finally {
          statement.finalize();
        database.close();
    }
}