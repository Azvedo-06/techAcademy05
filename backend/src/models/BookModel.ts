import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import AuthorModel from "./AuthorModel";
import CategoryModel from "./CategoryModel";

class BookModel extends Model {
  id!: number;
  title!: string;
  description!: string;
  publication_date!: Date;
  coverImage!: Buffer | null;
  coverImageType!: string | null;
  authorId!: number | null;
  categoryId!: number | null;
}

BookModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    publication_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    coverImage: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    coverImageType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: AuthorModel,
        key: "id",
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: CategoryModel,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "BookModel",
    tableName: "books",
  }
);

BookModel.belongsTo(AuthorModel, {
  foreignKey: "authorId",
  as: "author",
});

BookModel.belongsTo(CategoryModel, {
  foreignKey: "categoryId",
  as: "category",
});

export default BookModel;
