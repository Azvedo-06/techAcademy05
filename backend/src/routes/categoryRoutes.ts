import express from "express";
import CategoryController from "../controllers/categoryController";
import authMiddleware from "../middleware/authMiddleware";

const categoryController = new CategoryController();
const router = express.Router();

router.post(
  "/categorys",
  authMiddleware,
  categoryController.createCategoryController
);
router.get(
  "/categorys",
  authMiddleware,
  categoryController.findAllCategoryController
);
router.delete(
  "/categorys/:id",
  authMiddleware,
  categoryController.deleteCategotyController
);
router.get(
  "/categorys/:id",
  authMiddleware,
  categoryController.findCategoryByIdController
);
router.put(
  "/categorys/:id",
  authMiddleware,
  categoryController.updateCategoryController
);

export default router;
