import BookModel from "../models/BookModel";
import AuthorModel from "../models/AuthorModel";
import CategoryModel from "../models/CategoryModel";
import { validateNamAll } from "../utils/validateName";
import { validateBookDate } from "../utils/validateDate";
import { validateBookDescription } from "../utils/validateDescription";

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
    // Remover temporariamente
    // bookPdf?: Buffer,
    // bookPdfName?: string
  ): Promise<BookModel> {
    try {
      if (!validateNamAll(title)) {
        throw "Titulo do livro é obrigatório";
      }
      validateBookDescription(description);
      const dateBook = validateBookDate(publication_date);

      const newBook = await BookModel.create({
        title,
        description,
        publication_date: dateBook,
        authorId,
        categoryId,
        coverImage,
        coverImageType,
      });

      return newBook;
    } catch (error) {
      throw error;
    }
  }

  public async updateBook(
    id: number,
    title: string,
    description: string,
    publication_date: Date,
    authorId: number,
    categoryId: number
  ): Promise<[number, BookModel[]]> {
    try {
      if (!validateNamAll(title)) {
        throw "Titulo do livro é obrigatório";
      }
      validateBookDescription(description);
      const dateBook = validateBookDate(publication_date);

      const result = await BookModel.update(
        {
          title,
          description,
          publication_date: dateBook,
          authorId,
          categoryId,
        },
        {
          where: { id },
          returning: true,
        }
      );

      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default BookService;
