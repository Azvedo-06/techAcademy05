import express from "express";
import UserController from "../controllers/userController";

const userController = new UserController;
const router = express.Router();

router.post('/users', userController.createUserController); 
router.get('/users', userController.getAllUserController)
router.delete('/users/:id', userController.deleteUserController);
router.patch('/users/:id', userController.updateUserController);
router.get('/users/:id', userController.getUserByIdController);



export default router;