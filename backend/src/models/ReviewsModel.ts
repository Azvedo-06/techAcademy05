import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel";
import BookModel from "./BookModel";

class ReviewsModel extends Model {
  id: number | undefined;
  comments: string | undefined;
  nota: number | undefined;
  userId: number | undefined; 
  BookId: number | undefined;
}

ReviewsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nota: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    BookId: {
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
  foreignKey: "BookId",
  as: "book",
});
// mapeamento bidirecional
BookModel.hasMany(ReviewsModel, {
  foreignKey: "BookId",
  as: "book",
});

export default ReviewsModel;
