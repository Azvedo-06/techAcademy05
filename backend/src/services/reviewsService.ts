
import e from "express";
import ReviewsModel from "../models/ReviewsModel";

class reviewsService extends ReviewsModel {
    public async createReviews(comments:string, nota:number, userId:number, bookId:number): Promise<ReviewsModel> {
        try {

            if (!comments || comments.trim() === "" ) {
                throw ("Comentário é obrigatório");
            }

            if (!nota) {
                throw ("Nota é obrigatório");
            }   

            const reviews = await ReviewsModel.create({
                comments,
                nota,
                userId,
                bookId
            })
            
            return reviews
        } catch (error) {
            throw (`${error}`);
        }
    }

    public async findAllReviews(): Promise<ReviewsModel[]> {
        try {
            const reviews = await ReviewsModel.findAll();
            return reviews
        } catch (error) {
            throw (`${error}`);
        }
    }

    public async findReviewsById(id:number): Promise<ReviewsModel> {
        try {
            const reviewsId = await ReviewsModel.findByPk(id);

            if (!reviewsId) {
                throw ("Comentário não existe");
            }

            return reviewsId
        } catch (error) {
            throw (`${error}`);
        }
    }

    public async deleteReviews(id:number): Promise<string> {
        try {
            const reviewsDelete = await ReviewsModel.findByPk(id);

            if (!reviewsDelete) {
                throw ("Comentário não encontrado");
            }

            reviewsDelete.destroy();
            return "Reviews deletado";
        } catch (error) {
            throw (`${error}`);
        }
    }

    public async updateReviews(id:number, comments:string, nota:number, userId:number, bookId:number) {
        try {
            const reviews = await ReviewsModel.findByPk(id);

            if (!reviews) {
                throw ("Comentário não existe");
            }

            if (!comments || comments.trim() === "" ) {
                throw ("Comentário é obrigatório");
            }

            if (!nota) {
                throw ("Nota é obrigatório");
            }   

            reviews.comments = comments
            reviews.nota = nota
            reviews.userId = userId
            reviews.BookId = bookId

            reviews.save();
            return reviews;
        } catch (error) {
            throw (`${error}`)
        }
    }
}

export default reviewsService;