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

    public async createBookController(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const bookService = new BookService();
            const {title, description, publication_date, authorId, categoryId} = req.body;
            const book = await bookService.createBook(title, description, publication_date, authorId, categoryId);

            return res.status(201).json({ message: "Book created successfully", book }); 
        } catch (error) {
            return res.status(400).json({error: "Erro ao criar o livro: " + error});
        }
    }

    public async deleteBookController(req:Request<{id:string}>, res:Response) {
        try {
            const bookService = new BookService();
            const message = await bookService.deleteBook(Number(req.params.id));

            return res.status(200).json({message});
        } catch (error) {
            return res.status(400).json({error: "Erro ao tentar deletar livro: " + error});
        }
    }
};

export default bookController;