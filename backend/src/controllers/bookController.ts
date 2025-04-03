import BookService from "../services/bookService";
import { Request, Response } from "express";

const bookService = new BookService();
class bookController {    
    public async findAllBooksController(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> {
        try {
            const books = await bookService.findAllBooks();
            return res.status(200).json(books)
        } catch (error) {
            return res.status(500).json({error: "erro ao buscar livros. Tente novamente: " + error})
        }
    }

    public async createBookController(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const {title, description, publication_date, authorId, categoryId} = req.body;
            const book = await bookService.createBook(title, description, publication_date, authorId, categoryId);

            return res.status(201).json(book); 
        } catch (error) {
            return res.status(500).json({error: "erro ao criar o livro: " + error});
        }
    }

    public async deleteBookController(req:Request<{id:string}>, res:Response): Promise<Response<any, Record<string, any>>> {
        try {
            const bookDelete = await bookService.deleteBook(Number(req.params.id));

            return res.status(204).json(bookDelete);
        } catch (error) {
            return res.status(500).json({error: "erro ao tentar deletar livro: " + error});
        }
    }

    public async findBookByIdController(req:Request<{id:string}>, res:Response): Promise<Response<any, Record<string, any>>> {
        try {
            const book = await bookService.findBookById(Number(req.params.id));

            return res.status(200).json(book)
        } catch (error) {
            return res.status(500).json({error: "erro tente novamente: " + error});
        }
    }

    public async updateBookController(req:Request, res:Response): Promise<Response<any, Record<string, any>>> {
        try {
            const {id} = req.params;
            const {title, description, publication_date, authorId, categoryId} = req.body;

            const update = await bookService.updateBook(
                parseInt(id, 10),
                title,
                description,
                publication_date,
                authorId,
                categoryId
            );

            return res.status(204).json(update);
        } catch (error) {
            return res.status(500).json({error: "erro ao tentar atualizar livro: " + error});
        }
    }
};

export default bookController;