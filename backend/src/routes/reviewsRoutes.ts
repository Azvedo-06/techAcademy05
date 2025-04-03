import express from "express";
import ReviewsController from "../controllers/reviewsController";
import authMiddleware from "../middleware/authMiddleware";

const reviewsController = new ReviewsController();
const router = express.Router();

router.post('/reviews', authMiddleware, reviewsController.createReviewsController);
router.get('/reviews/:id', authMiddleware, reviewsController.findReviewsByIdController);
router.get('/reviews', authMiddleware, reviewsController.findAllReviewsController);
router.delete('/reviews/:id', authMiddleware, reviewsController.deleteReviewsController);
router.put('/reviews/:id', authMiddleware, reviewsController.updateReviewsController);

export default router;