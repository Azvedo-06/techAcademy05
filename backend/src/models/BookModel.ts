import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import AuthorModel from "./AuthorModel";
import CategoryModel from "./CategoryModel";

class BookModel extends Model {
    id: number | undefined;
    title: string | undefined;
    description: string | undefined;
    publication_date: Date | undefined;
    authorId: number | undefined; // FK Referência à tabela Autores
    categoryId: number | undefined; // FK Referência à tabela Categorias
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
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: AuthorModel,
                key: 'id'
            }
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: CategoryModel,
                key: 'id'
            }
        },
    },
    {
        sequelize,
        modelName: 'BookModel',
        tableName: 'books'
    }
)

BookModel.belongsTo(AuthorModel, {
    foreignKey: 'authorId', // definindo qual é a fk
    as: 'author' // define o nome da relação na busca
})

BookModel.belongsTo(CategoryModel, {
    foreignKey: 'categoryId', 
    as: 'category'
})

//mapeamento bidirecional 
AuthorModel.hasMany(BookModel, {
    foreignKey: 'authorId',
    as: 'author'
})

// mapeamento bidirecional 
CategoryModel.hasMany(BookModel, {
    foreignKey: 'categoryId',
    as: 'category'
})

export default BookModel;