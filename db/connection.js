import {DatabaseSync} from "node:sqlite";
//import { DatabaseSync } from 'sqlite3'; // ✅ CORRETO para sqlite3 tradicional


import {dbPath} from "../src/utils/dbpath.js"

console.log("caminho importado:" + dbPath);

let db = null;

try {
    db = new DatabaseSync(dbPath, {
        verbose: console.log,
        mode: DatabaseSync.OPEN_READWRITE | DatabaseSync.OPEN_CREATE,
    });
    console.log("Banco de dados conectado com sucesso");
} catch (error) {
    console.log(error);
    
}

export default db;