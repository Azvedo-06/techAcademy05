import {Sequelize} from "sequelize";

const sequelize = new Sequelize("projeto05", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

export default sequelize;