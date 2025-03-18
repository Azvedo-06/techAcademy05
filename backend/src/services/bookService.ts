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
};

export default bookService;