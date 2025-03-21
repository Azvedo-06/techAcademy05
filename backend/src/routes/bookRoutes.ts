import express from "express";
import BookController from "../controllers/bookController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();
const bookController = new BookController();

router.get("/books", authMiddleware, bookController.findAllBooksController);
router.delete("/books/:id", authMiddleware, bookController.deleteBookController);
router.post("/books", authMiddleware, bookController.createBookController);

export default router;