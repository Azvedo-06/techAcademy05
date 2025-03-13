import express from "express";
import AuthorController from "../controllers/authorController";


const router = express.Router();
const authorController = new AuthorController();

router.post('/author', authorController.createAuthorController); 
router.get('/author', authorController.getAllAuthorController)
router.delete('/author/:id', authorController.deleteAuthorController);
router.patch('/author/:id', authorController.updateAuthorController);
router.get('/author/:id', authorController.getAuthorByIdController);

export default router;