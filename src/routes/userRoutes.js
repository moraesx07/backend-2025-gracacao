import express from 'express';
const router = express.Router();

import {getUsers} from "../controllers/userController.js";

router.get("/user", getUsers);

export default router;