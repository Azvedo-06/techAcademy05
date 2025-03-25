import express from "express";
import reviewController from "../controllers/reviewController";
import authMiddleware from "../middleware/authMiddleware";

const ReviewController = new reviewController();
const router = express.Router();




export default router;