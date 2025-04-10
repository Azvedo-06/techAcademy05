import BookService from "../services/bookService";
import { Request, Response } from "express";
import { Router } from "express";
import { Book } from "../types/book";

const bookService = new BookService();
const router = Router();

class BookController {
  public async findAllBooksController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const books = await bookService.findAllBooks();
      return res.status(200).json(books);
    } catch (error) {
      return res.status(500).json({
        error: `Erro ao buscar livros: ${
          error instanceof Error ? error.message : error
        }`,
      });
    }
  }

  public async createBookController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { title, description, publication_date, authorId, categoryId } =
        req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      const coverImage = files?.coverImage?.[0]?.buffer ?? undefined;
      const coverImageType = files?.coverImage?.[0]?.mimetype ?? undefined;
      const bookPdf = files?.bookPdf?.[0]?.buffer ?? undefined;
      const bookPdfName = files?.bookPdf?.[0]?.originalname ?? undefined;

      const book = await bookService.createBook(
        title,
        description,
        new Date(publication_date),
        Number(authorId),
        Number(categoryId),
        coverImage,
        coverImageType,
        bookPdf,
        bookPdfName
      );

      return res.status(201).json(book);
    } catch (error) {
      return res.status(500).json({
        error: `Erro ao criar o livro: ${
          error instanceof Error ? error.message : error
        }`,
      });
    }
  }

  public async deleteBookController(
    req: Request<{ id: string }>,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const bookDelete = await bookService.deleteBook(Number(req.params.id));
      return res.status(204).json(bookDelete);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "erro ao tentar deletar livro: " + error });
    }
  }

  public async findBookByIdController(req: Request, res: Response) {
    try {
      const book = await bookService.findBookById(Number(req.params.id));
      const response = book.toJSON();

      if (book.coverImage) {
        response.coverImage = book.coverImage.toString("base64");
      }

      if (book.bookPdf) {
        response.bookPdf = book.bookPdf.toString("base64");
      }

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar livro: " + error });
    }
  }

  public async updateBookController(
    req: Request<{ id: string }>,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const { title, description, publication_date, authorId, categoryId } =
        req.body;

      const [affectedCount, updatedBooks] = await bookService.updateBook(
        Number(id),
        title,
        description,
        new Date(publication_date),
        Number(authorId),
        Number(categoryId)
      );

      if (affectedCount === 0) {
        return res.status(404).json({ error: "Livro não encontrado" });
      }

      return res.status(200).json(updatedBooks[0]);
    } catch (error) {
      return res.status(500).json({
        error: `Erro ao atualizar livro: ${
          error instanceof Error ? error.message : error
        }`,
      });
    }
  }
}

export default BookController;
