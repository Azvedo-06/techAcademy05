import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel";
import BookModel from "./BookModel";

class ReviewsModel extends Model {
  id: number | undefined;
  comment: string | undefined;
  rating: number | undefined;
  userId: number | undefined; 
  bookId: number | undefined;
}

ReviewsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "ReviewsModel",
    tableName: "reviews",
  }
);

ReviewsModel.belongsTo(UserModel, {
  foreignKey: "userId", // definindo qual é a fk
  as: "user", // define o nome da relação na busca
});
// mapeamento bidirecional
UserModel.hasMany(ReviewsModel, {
  foreignKey: "userId",
  as: "user",
});

ReviewsModel.belongsTo(BookModel, {
  foreignKey: "bookId",
  as: "book",
});
// mapeamento bidirecional
BookModel.hasMany(ReviewsModel, {
  foreignKey: "bookId",
  as: "book",
});

export default ReviewsModel;
