import BookModel from "../models/BookModel";

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
            const idBook = await BookModel.findByPk(id);
            
            if (!idBook) {
                throw ("Livro não encontrado");
            }

            return idBook
        } catch (error) {
            throw (`${error}`);
        }
    }

    public async createBook(title:string, description:string, publication_date:Date, authorId:number, categoryId:number): Promise<BookModel> {
        try {
            validarBook(title, description, publication_date);

            const newBook = BookModel.create({
                title,
                description,
                publication_date: validarBook,
                authorId,
                categoryId
            });

            return newBook;
        } catch (error) {
            throw (`${error}`)
        }
    }

    public async deleteBook(id:number): Promise<string> {
        try {
            const BookDelete = await BookModel.findByPk(id);
            
            if (!BookDelete) {
                throw new Error("Livro não encontrado");
            }

            await BookDelete.destroy();
            return "Livro deletado";
        } catch (error) {
            throw (`${error}`);
        }

    }

    public async updateBook(id:number, title:string, description:string, publication_date:Date, authorId:number, categoryId:number): Promise<BookModel> {
        try {
            const book = await BookModel.findByPk(id);

            if (!book) {
                throw Error("Livro não encontrado");
            }

            if (!title || title.trim() === "") {
                throw new Error("Titulo é obrigatório");
            }

            if (!description || title.trim() === "") {
                throw new Error("Descrição é obrigatório");
            }

            const publicationDate = new Date(publication_date);
            if (isNaN(publicationDate.getTime())) {
                throw new Error("Data de publicação inválida");
            }

            book.title = title;
            book.description = description;
            book.publication_date = publication_date;
            book.authorId = authorId;
            book.categoryId = categoryId;

            await book.save();
            return book;

        } catch (error) {
            throw new Error(`Erro ao tentar atualizar livro: ${error}`);
        }
    }
};

export default bookService;

function validarBook(title: string, description: string, publication_date: Date) {
    if (!title || title.trim() === "") {
        throw new Error("Titulo é obrigatório");
    }

    if (!description || title.trim() === "") {
        throw new Error("Descrição é obrigatório");
    }

    const publicationDate = new Date(publication_date);
    if (isNaN(publicationDate.getTime())) {
        throw new Error("Data de publicação inválida");
    }
}
