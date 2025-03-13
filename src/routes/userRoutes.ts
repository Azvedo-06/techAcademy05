import express from "express";
import userController  from "../controllers/userController"


const UserController = new userController;
const router = express.Router();

router.post('/users', UserController.createUserController); 
router.get('/users', UserController.getAllUserController)
router.delete('/users/:id', UserController.deleteUserController);
router.patch('/users/:id', UserController.updateUserController);
router.get('/users/:id', UserController.getUserByIdController);


export default router;