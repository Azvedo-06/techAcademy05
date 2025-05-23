import { Sequelize } from "sequelize";

const sequelize = new Sequelize("projeto05", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
