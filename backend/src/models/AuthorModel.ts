import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class AuthorModel extends Model {
    id: number | undefined;
    name: string | undefined;
    bio: string | undefined;
    birth: Date | undefined;
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
            allowNull: false, // permitido nulo ? false
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        birth: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'AuthorModel',
        tableName: 'authors'
    }
);

export default AuthorModel;