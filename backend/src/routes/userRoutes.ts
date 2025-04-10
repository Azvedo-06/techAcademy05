import express from "express";
import UserController from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const userController = new UserController();
const router = express.Router();

router.post("/users", userController.createUserController);
router.get("/users", authMiddleware, userController.findAllUserController);
router.delete(
  "/users/:id",
  authMiddleware,
  userController.deleteUserController
);
router.put("/users/:id", authMiddleware, userController.updateUserController);
router.get("/users/:id", authMiddleware, userController.findUserByIdController);

export default router;
