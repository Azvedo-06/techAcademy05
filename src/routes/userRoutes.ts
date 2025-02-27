import express from "express";
import { getAllUser, getUserById, createUser } from "../controllers/userController"

const router = express.Router();

router.get('/users', getAllUser);
router.get('/users/:id', getUserById);
router.post('/users', createUser);


export default router;