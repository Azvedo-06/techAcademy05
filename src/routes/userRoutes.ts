import express from "express";
import { 
    /*getAllUser*/
    /*createUser,*/
    /*deleteUser*/
    getUserById, 
    updateUser,
    getAllUserController,
    deleteUserController,
    createUserController
} from "../controllers/userController"

const router = express.Router();

router.post('/users', createUserController); 
router.get('/users', getAllUserController)
router.delete('/users/:id', deleteUserController);
router.patch('/users/:id', updateUser);
router.get('/users/:id', getUserById);


export default router;