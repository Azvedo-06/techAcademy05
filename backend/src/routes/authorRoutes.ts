import express from "express";
import AuthorController from "../controllers/authorController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();
const authorController = new AuthorController();

router.get(
  "/authors",
  authMiddleware,
  authorController.findAllAuthorController.bind(authorController)
);

router.post(
  "/authors",
  authMiddleware,
  authorController.createAuthorController.bind(authorController)
);

router.delete(
  "/authors/:id",
  authMiddleware,
  authorController.deleteAuthorController.bind(authorController)
);

router.get(
  "/authors/:id",
  authMiddleware,
  authorController.findAuthorByIdController.bind(authorController)
);

router.put(
  "/authors/:id",
  authMiddleware,
  authorController.updateAuthorController.bind(authorController)
);

export default router;
