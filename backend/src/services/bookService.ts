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

    public async createBook(title:string, description:string, publication_date:Date, authorId:number, categoryId:number): Promise<BookModel> {
        try {
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

    public async deleteBook(id:number) {
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
};

export default bookService;