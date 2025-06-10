import express from 'express';
const router = express.Router();

import {getUsers, createUser, deleteUser} from "../controllers/userController.js";

router.get("/user", getUsers);
router.post("/user", createUser);
router.delete("/user/:id", deleteUser);

export default router;