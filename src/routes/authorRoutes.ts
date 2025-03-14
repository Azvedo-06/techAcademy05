import express from "express";
import AuthorController from "../controllers/authorController";
import {authMiddleware} from "../middleware/authMiddleware";


const router = express.Router();
const authorController = new AuthorController();

router.post('/author', authMiddleware, authorController.createAuthorController); 
router.get('/author', authMiddleware, authorController.getAllAuthorController)
router.delete('/author/:id', authMiddleware, authorController.deleteAuthorController);
router.patch('/author/:id', authMiddleware, authorController.updateAuthorController);
router.get('/author/:id', authMiddleware, authorController.getAuthorByIdController);

export default router;