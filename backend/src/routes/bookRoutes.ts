import express from "express";
import BookController from "../controllers/bookController";
import authMiddleware from "../middleware/authMiddleware";
import upload from "../middleware/uploadMiddleware";

const router = express.Router();
const bookController = new BookController();

router.get(
  "/books",
  authMiddleware,
  bookController.findAllBooksController.bind(bookController)
);
router.post(
  "/books",
  authMiddleware,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "bookPdf", maxCount: 1 },
  ]),
  bookController.createBookController.bind(bookController)
);
router.delete(
  "/books/:id",
  authMiddleware,
  bookController.deleteBookController.bind(bookController)
);
router.get(
  "/books/:id",
  authMiddleware,
  bookController.findBookByIdController.bind(bookController)
);
router.put(
  "/books/:id",
  authMiddleware,
  bookController.updateBookController.bind(bookController)
);

export default router;
