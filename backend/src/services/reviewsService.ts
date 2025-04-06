import ReviewsModel from "../models/ReviewsModel";
import {
  validateNamAll,
  validateReviewsNota,
  validateReviewsExist,
} from "../utils/funcoes";
class reviewsService extends ReviewsModel {
  public async createReviews(comments: string,nota: number,userId: number,BookId: number): Promise<ReviewsModel> {
    try {
      if (!validateNamAll(comments)) {
        throw 'Comentarios é obrigatório'
      }
      validateReviewsNota(nota);

      const reviews = await ReviewsModel.create({
        comments,
        nota,
        userId,
        BookId,
      });

      return reviews;
    } catch (error) {
      throw `${error}`;
    }
  }

  public async findAllReviews(): Promise<ReviewsModel[]> {
    try {
      const reviews = await ReviewsModel.findAll();

      return reviews;
    } catch (error) {
      throw `${error}`;
    }
  }

  public async findReviewsById(id: number): Promise<ReviewsModel> {
    try {
      const reviewsId = await validateReviewsExist(id);

      return reviewsId;
    } catch (error) {
      throw `${error}`;
    }
  }

  public async deleteReviews(id: number): Promise<void> {
    try {
      const reviewsDelete = await validateReviewsExist(id);

      reviewsDelete.destroy();

    } catch (error) {
      throw `${error}`;
    }
  }

  public async updateReviews(id: number,comments: string,nota: number,userId: number,BookId: number): Promise<void> {
    try {
      const reviews = await validateReviewsExist(id);
      if (!validateNamAll(comments)) {
        throw 'Comentarios é obrigatório'
      }
      validateReviewsNota(nota);

      reviews.comments = comments;
      reviews.nota = nota;
      reviews.userId = userId;
      reviews.BookId = BookId;
      reviews.save();

    } catch (error) {
      throw `${error}`;
    }
  }
}

export default reviewsService;
