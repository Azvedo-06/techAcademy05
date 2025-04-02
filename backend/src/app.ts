import express from "express";
import userRoutes from "./routes/userRoutes";
import loginRoutes from "./routes/loginRoutes";
import authorRoutes from "./routes/authorRoutes"
import categoryRoutes from "./routes/categoryRoutes";
import bookRoutes from "./routes/bookRoutes"
import reviewRoutes from "./routes/reviewsRoutes"

const app = express();

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

export default app;