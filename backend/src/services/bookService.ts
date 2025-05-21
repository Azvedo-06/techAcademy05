import BookModel from "../models/BookModel";
import AuthorModel from "../models/AuthorModel";
import CategoryModel from "../models/CategoryModel";
import { validateNamAll } from "../utils/validateName";
import {
  validateBookExist,
  validateBookTitle,
  validateBookDescription,
  validateBookDate,
} from "../utils/validateBook";

class BookService {
  public async findAllBooks(): Promise<BookModel[]> {
    try {
      const books = await BookModel.findAll({
        include: [
          {
            model: AuthorModel,
            as: "author",
            attributes: ["id", "name"],
          },
          {
            model: CategoryModel,
            as: "category",
            attributes: ["id", "name"],
          },
        ],
        attributes: [
          "id",
          "title",
          "description",
          "publication_date",
          "coverImage",
          "coverImageType",
          "authorId",
          "categoryId",
        ],
      });

      const formattedBooks = books.map((book) => {
        const bookData = book.toJSON();
        if (bookData.coverImage) {
          bookData.coverImage = bookData.coverImage.toString("base64");
        }
        return bookData;
      });

      return formattedBooks;
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      throw error;
    }
  }

  public async findBookById(id: number): Promise<BookModel> {
    try {
      const book = await BookModel.findByPk(id, {
        include: ["author", "category"],
      });
      if (!book) {
        throw "Livro não encontrado";
      }
      return book;
    } catch (error) {
      throw error;
    }
  }

  public async deleteBook(id: number): Promise<void> {
    try {
      const result = await BookModel.destroy({ where: { id } });
      if (result === 0) {
        throw "Livro não encontrado";
      }
    } catch (error) {
      throw error;
    }
  }

  public async createBook(
    title: string,
    description: string,
    publication_date: Date,
    authorId: number,
    categoryId: number,
    coverImage?: Buffer,
    coverImageType?: string
  ): Promise<BookModel> {
    try {
      validateBookTitle(title);
      validateBookDescription(description);
      validateBookDate(publication_date);

      const newBook = await BookModel.create({
        title,
        description,
        publication_date,
        authorId,
        categoryId,
        coverImage,
        coverImageType,
      });

      return newBook;
    } catch (error) {
      console.error("Erro ao criar livro:", error);
      throw error;
    }
  }

  public async updateBook(
    id: number,
    title: string,
    description: string,
    publication_date: Date,
    authorId: number,
    categoryId: number,
    coverImage?: Buffer,
    coverImageType?: string
  ): Promise<BookModel> {
    try {
      // Primeiro, verifica se o livro existe
      const book = await BookModel.findByPk(id);
      if (!book) {
        throw new Error("Livro não encontrado");
      }

      // Log para debug
      console.log("Dados recebidos para atualização:", {
        title,
        description,
        publication_date,
        authorId,
        categoryId
      });

      // Atualiza diretamente no modelo
      await book.update({
        title: title,
        description: description,
        publication_date: publication_date,
        authorId: authorId,
        categoryId: categoryId,
        ...(coverImage && { coverImage }),
        ...(coverImageType && { coverImageType })
      });

      // Recarrega o livro com as associações
      await book.reload({
        include: [
          {
            model: AuthorModel,
            as: "author",
            attributes: ["id", "name"],
          },
          {
            model: CategoryModel,
            as: "category",
            attributes: ["id", "name"],
          },
        ],
      });

      console.log("Livro após atualização:", book.toJSON());

      return book;
    } catch (error) {
      console.error("Erro na atualização:", error);
      throw error;
    }
  }
}

export default BookService;
