import BookModel from "../models/BookModel";
import {validateBookExist, validateBookTitle, validateBookDate, validateBookDescription} from "../utils/funcoes";
class bookService extends BookModel {
    public async findAllBooks(): Promise<BookModel[]> {
        try {
            const books = await BookModel.findAll();

            return books;
        } catch (error) {
            throw (`${error}`)
        }
    }

    public async findBookById(id:number): Promise<BookModel> {
        try {
            const idBook = await validateBookExist(id);

            return idBook
        } catch (error) {
            throw (`${error}`);
        }
    }

    public async createBook(title:string, description:string, publication_date:Date, authorId:number, categoryId:number): Promise<BookModel> {
        try {
            validateBookTitle(title)
            validateBookDescription(description);
            const dateBook = validateBookDate(publication_date);
           
            const newBook = BookModel.create({
                title,
                description,
                publication_date: dateBook,
                authorId,
                categoryId
            });

            return newBook;
        } catch (error) {
            throw (`${error}`)
        }
    }

    public async deleteBook(id:number): Promise<void> {
        try {
            const BookDelete = await validateBookExist(id);
            
            await BookDelete.destroy();
        } catch (error) {
            throw (`${error}`);
        }

    }

    public async updateBook(id:number, title:string, description:string, publication_date:Date, authorId:number, categoryId:number): Promise<void> {
        try {
            const book = await validateBookExist(id);
            validateBookTitle(title);
            validateBookDescription(description);
            const publicationDate = validateBookDate(publication_date);
            

            book.title = title;
            book.description = description;
            book.publication_date = publicationDate;
            book.authorId = authorId;
            book.categoryId = categoryId;

            await book.save();
        } catch (error) {
            throw (`${error}`);
        }
    }
};

export default bookService;
