import express from "express";
import LoginUsers from "../controllers/loginController";
import {authMiddleware} from "../middleware/authMiddleware";

const loginUsers = new LoginUsers;
const router = express.Router();

router.post('/login',loginUsers.loginUser)

export default router;