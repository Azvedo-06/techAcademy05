import sequelize from "../src/config/database";
import express from "express";
import userRoutes from "./routes/userRoutes";
import loginRoutes from "./routes/loginRoutes";
import authorRoutes from "./routes/authorRoutes"
import categoryRoutes from "./routes/categoryRoutes";
import bookRoutes from "./routes/bookRoutes"
import reviewRoutes from "./routes/reviewsRoutes"

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Tech Academy 05");
})

app.use(express.json());
app.use(authorRoutes);
app.use(userRoutes);
app.use(loginRoutes);
app.use(categoryRoutes);
app.use(bookRoutes);
app.use(reviewRoutes);

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
