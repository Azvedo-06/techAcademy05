import { json } from "sequelize";
import ReviewsService from "../services/reviewsService";
import {Request, Response } from "express";

const reviewsService = new ReviewsService();
class reviewsController {
    public async createReviewsController(req:Request, res:Response): Promise<Response<any, Record<string, any>>> {
        try {
            const {comments, nota, userId, BookId} = req.body;
            const reviews = await reviewsService.createReviews(comments, nota, userId, BookId);

            return res.status(201).json(reviews);
        } catch (error) {
            return res.status(500).json({error: "erro ao tentar criar comentário: " + error})
        }
    }

    public async findAllReviewsController(req:Request, res:Response): Promise<Response<any, Record<string, any>>> {
        try {
            const reviews = await reviewsService.findAllReviews();

            return res.status(200).json(reviews)
        } catch (error) {
            return res.status(500).json({error: "erro ao tentar buscar comentários: " + error})
        }
    }

    public async findReviewsByIdController(req:Request<{id:string}>, res:Response): Promise<Response<any, Record<string, any>>> {
        try {
            const reviews = await reviewsService.findReviewsById(Number(req.params.id));

            return res.status(200).json(reviews)
        } catch (error) {
            return res.status(500).json({error: "erro tente novamente: " + error});
        }
    }

    public async deleteReviewsController(req:Request<{id:string}>, res:Response): Promise<Response<any, Record<string, any>>> {
        try {
            const reviews = await reviewsService.deleteReviews(Number(req.params.id));

            return res.status(204).json(reviews)
        } catch (error) {
            return res.status(500).json({error: "erro ao tentar deletar comentário: " + error});
        }
    }

    public async updateReviewsController(req:Request, res:Response) {
        try {
            const {id} = req.params;
            const {comments, nota, userId, BookId} = req.body;

            const update = await reviewsService.updateReviews(
                parseInt(id, 10),
                comments,
                nota,
                userId,
                BookId
            )

            return res.status(204).json(update)
        } catch (error) {
            return res.status(500).json({error: "erro ao tentar atualizar comentário: " + error});
        }
    }
};

export default reviewsController;