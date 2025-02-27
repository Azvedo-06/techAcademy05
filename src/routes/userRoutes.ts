import express from "express";
import { getAllUser, getUserById, createUser, updateUser, deleteUser } from "../controllers/userController"

const router = express.Router();

router.get('/users', getAllUser);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;