import express from "express";
import UserController from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const userController = new UserController();
const router = express.Router();

router.post('/users', authMiddleware, userController.createUserController); 
router.get('/users', authMiddleware,userController.getAllUserController)
router.delete('/users/:id', authMiddleware, userController.deleteUserController);
router.patch('/users/:id', authMiddleware, userController.updateUserController);
router.get('/users/:id', authMiddleware , userController.getUserByIdController);



export default router;