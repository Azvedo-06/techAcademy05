import sequelize from "../src/config/database";
import express from "express";
import userRoutes from "./routes/userRoutes";
import loginRoutes from "./routes/loginRoutes";

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Tech Academy 05");
})

app.use(express.json());
app.use(userRoutes);
app.use(loginRoutes);

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
