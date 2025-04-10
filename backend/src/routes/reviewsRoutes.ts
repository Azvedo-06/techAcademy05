import express from "express";
import ReviewsController from "../controllers/reviewsController";
import authMiddleware from "../middleware/authMiddleware";

const reviewsController = new ReviewsController();
const router = express.Router();

router.post(
  "/reviews",
  authMiddleware,
  reviewsController.createReviewsController.bind(reviewsController)
);
router.get(
  "/reviews/:id",
  authMiddleware,
  reviewsController.findReviewsByIdController.bind(reviewsController)
);
router.get(
  "/reviews",
  authMiddleware,
  reviewsController.findAllReviewsController.bind(reviewsController)
);
router.delete(
  "/reviews/:id",
  authMiddleware,
  reviewsController.deleteReviewsController.bind(reviewsController)
);
router.put(
  "/reviews/:id",
  authMiddleware,
  reviewsController.updateReviewsController.bind(reviewsController)
);

export default router;
