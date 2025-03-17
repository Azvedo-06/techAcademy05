import express from "express";
import CategoryController from "../controllers/categoryController";
import authMiddleware from "../middleware/authMiddleware";

const categoryController = new CategoryController();
const router = express.Router();

router.post('/categorys', authMiddleware, categoryController.createCategoryController); 
router.get('/categorys', authMiddleware,categoryController.getAllCategoryController)
router.delete('/categorys/:id', authMiddleware, categoryController.deleteCategotyController);
router.patch('/categorys/:id', authMiddleware, categoryController.updateCategoryController);
router.get('/categorys/:id', authMiddleware , categoryController.getCategoryByIdController);

export default router;