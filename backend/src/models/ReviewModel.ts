import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel";
import BookModel from "./BookModel";
// import UserModel from "./UserModel";
// import BookModel from "./BookModel";

class ReviewModel extends Model {
  id!: number | undefined;
  comments!: string | undefined;
  nota!: number | undefined;
  userId!: number | undefined; // FK Referência à tabela Autores
  BookId!: number | undefined; // FK Referência à tabela Categorias
}

ReviewModel.init(
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
      references: {
        model: "users", // Nome da tabela referenciada
        key: "id",
      },
    },
    BookId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "books", // Nome da tabela referenciada
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "ReviewModel",
    tableName: "reviews",
  }
);

ReviewModel.belongsTo(UserModel, {
  foreignKey: "userId", // definindo qual é a fk
  as: "user", // define o nome da relação na busca
});
// mapeamento bidirecional
UserModel.hasMany(ReviewModel, {
  foreignKey: "userId",
  as: "user",
});

ReviewModel.belongsTo(BookModel, {
  foreignKey: "BookId",
  as: "book",
});
// mapeamento bidirecional
BookModel.hasMany(ReviewModel, {
  foreignKey: "BookId",
  as: "book",
});

export default ReviewModel;
