import sequelize from "../src/config/database";
import express from "express";
import UserModel from "../src/models/UserModel"

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Tech Academy 05");
})

// async = valor de retorno é uma promise
app.get("/users", async (req, res) => {
    const usersFindAll = await UserModel.findAll();
    res.send(usersFindAll);
});

// sync database
sequelize
    .sync({alter: true})
    .then(() => {
        console.log("database foi sincronizado com sucesso");
    })
    .catch(() => {
        console.log("falha ao tentar sincronizar a database");
    });

// esse fica por ultimo sempre
app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
});
