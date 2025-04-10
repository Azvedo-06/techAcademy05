import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class AuthorModel extends Model {
  id!: number;
  name!: string;
  birth!: Date;
  bio!: string;
}

AuthorModel.init(
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
    birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "AuthorModel",
    tableName: "authors",
  }
);

export default AuthorModel;
