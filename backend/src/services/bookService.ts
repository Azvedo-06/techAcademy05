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
            if (!title || title.trim() === "") {
                throw ("Titulo é obrigatório");
            }
        
            if (!description || title.trim() === "") {
                throw ("Descrição é obrigatório");
            }
        
            const publicationDate = new Date(publication_date);
            if (isNaN(publicationDate.getTime())) {
                throw ("Data de publicação inválida");
            }
            
            const newBook = BookModel.create({
                title,
                description,
                publication_date: publicationDate,
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
                throw ("Livro não encontrado");
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
            
            if(!book) {
                throw ("Livro não encontrado");
            }

            if (!title || title.trim() === "") {
                throw ("Titulo é obrigatório");
            }
        
            if (!description || title.trim() === "") {
                throw ("Descrição é obrigatório");
            }
        
            const publicationDate = new Date(publication_date);
            if (isNaN(publicationDate.getTime())) {
                throw ("Data de publicação inválida");
            }

            book.title = title;
            book.description = description;
            book.publication_date = publicationDate;
            book.authorId = authorId;
            book.categoryId = categoryId;

            await book.save();
            return book;

        } catch (error) {
            throw (`${error}`);
        }
    }
};

export default bookService;
