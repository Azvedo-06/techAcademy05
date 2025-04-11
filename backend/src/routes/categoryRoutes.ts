import express from "express";
import CategoryController from "../controllers/categoryController";
import authMiddleware from "../middleware/authMiddleware";

const categoryController = new CategoryController();
const router = express.Router();

// Mudando de /categories para /categorys para manter consistência
router.post(
  "/categorys",
  authMiddleware,
  categoryController.createCategoryController.bind(categoryController)
);

router.get(
  "/categorys",
  authMiddleware,
  categoryController.findAllCategoryController.bind(categoryController)
);

router.delete(
  "/categorys/:id",
  authMiddleware,
  categoryController.deleteCategotyController.bind(categoryController)
);

router.get(
  "/categorys/:id",
  authMiddleware,
  categoryController.findCategoryByIdController.bind(categoryController)
);

router.put(
  "/categorys/:id",
  authMiddleware,
  categoryController.updateCategoryController.bind(categoryController)
);

export default router;
