import express from 'express';
const router = express.Router();

import {getUsers} from "../controllers/userController"

router.get("/user", getUsers);

export default router;