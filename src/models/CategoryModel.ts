import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class CategoryModel extends Model {
    id: number | undefined;
    name: string | undefined;
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
        }
    },
    {
        sequelize,
        modelName: 'CategoryModel',
        tableName: 'categorys'
    }
);

export default CategoryModel;