import express from "express";
import AuthorController from "../controllers/authorController";
import {authMiddleware} from "../middleware/authMiddleware";


const router = express.Router();
const authorController = new AuthorController();

router.post('/authors', authMiddleware, authorController.createAuthorController); 
router.get('/authors', authMiddleware, authorController.findAllAuthorController)
router.delete('/authors/:id', authMiddleware, authorController.deleteAuthorController);
router.patch('/authors/:id', authMiddleware, authorController.updateAuthorController);
router.get('/authors/:id', authMiddleware, authorController.findAuthorByIdController);

export default router;