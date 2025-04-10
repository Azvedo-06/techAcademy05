import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class CategoryModel extends Model {
  id!: number;
  name!: string;
  description!: string;
}

CategoryModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "CategoryModel",
    tableName: "categories",
  }
);

export default CategoryModel;
