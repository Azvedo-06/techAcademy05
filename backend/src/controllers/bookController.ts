import BookService from "../services/bookService";
import { Request, Response } from "express";

class bookController {
    public async findAllBooksController(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> {
        try {
            const bookService = new BookService();
            const books = await bookService.findAllBooks();
            return res.status(200).json(books)
        } catch (error) {
            return res.status(400).json({error: "Erro ao buscar livros. Tente novamente: " + error})
        }
    }
};

export default bookController;