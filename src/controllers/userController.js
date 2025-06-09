import { findAll, create } from "../models/userModel.js";

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
        const userData = req.body;
        const result = await create(userData);
        res.status(201).json({ message: "User created successfully", userId: result.lastInsertRowid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error - controller" });
    }
}