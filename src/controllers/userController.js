import { findAll } from "../models/userModel.js";

export const getUsers = async (req, res) => {
    try {
       const users = await findAll() //buscar os usuários no banco de dados
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - controller" });
    }
}

export const createUser = async (req, res) => {
    try {
        const userData = req.body; // Obter os dados do usuário do corpo da requisição
        const result = await create(userData); // Chamar a função create do modelo
        res.status(201).json({ message: "User created successfully", userId: result.lastInsertRowid });// O lastInsertRowid é usado para obter o ID do usuário recém-criado
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - controller" });
    }
}
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - controller" });
        
    }
}