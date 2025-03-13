import express from "express";
import LoginUsers from "../controllers/loginController";

const loginUsers = new LoginUsers;
const router = express.Router();

router.post('/login', loginUsers.loginUser)

export default router;