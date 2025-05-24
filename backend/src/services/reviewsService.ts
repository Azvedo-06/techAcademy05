import BookModel from "../models/BookModel";
import ReviewsModel from "../models/ReviewsModel";
import UserModel from "../models/UserModel";
import {
  validateNamAll,
  validateReviewsNota,
  validateReviewsExist,
} from "../utils/funcoes";
class reviewsService extends ReviewsModel {
  public async createReviews(comment: string,rating: number,userId: number,bookId: number): Promise<ReviewsModel> {
    try {
      if (!validateNamAll(comment)) {
        throw 'Comentarios é obrigatório'
      }
      validateReviewsNota(rating);

      const reviews = await ReviewsModel.create({
        comment,
        rating,
        userId,
        bookId,
      });

      return reviews;
    } catch (error) {
      throw `${error}`;
    }
  }

  public async findAllReviews(): Promise<ReviewsModel[]> {
    try {
      const reviews = await ReviewsModel.findAll({
        include: [
          {
            model: UserModel,
            as: 'user',
            attributes: ['name']
          },
          {
            model:  BookModel,
            as: 'book',
            attributes: ['title']
          }
        ]
      });

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

  public async updateReviews(id: number,comment: string,rating: number,userId: number,bookId: number): Promise<void> {
    try {
      const reviews = await validateReviewsExist(id);
      if (!validateNamAll(comment)) {
        throw 'Comentarios é obrigatório'
      }
      validateReviewsNota(rating);

      reviews.comment = comment;
      reviews.rating = rating;
      reviews.userId = userId;
      reviews.bookId = bookId;
      reviews.save();

    } catch (error) {
      throw `${error}`;
    }
  }
}

export default reviewsService;
