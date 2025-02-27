import express from "express";
import { getAllUser, getUserById, /*createUser,*/ updateUser, deleteUser, createUserController } from "../controllers/userController"

const router = express.Router();

router.get('/users', getAllUser);
router.get('/users/:id', getUserById);
//router.post('/users', createUser); // rota direta do controller
router.post('/users', createUserController); // rota passando pelo serve e depois controller
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;