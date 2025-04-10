import express from "express";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes";
import authorRoutes from "./routes/authorRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import loginRoutes from "./routes/loginRoutes";
import reviewsRoutes from "./routes/reviewsRoutes";
import userRoutes from "./routes/userRoutes"; // Add this import

const app = express();

app.use(cors());
app.use(express.json());

app.use(bookRoutes);
app.use(authorRoutes);
app.use(categoryRoutes);
app.use(loginRoutes);
app.use(reviewsRoutes);
app.use(userRoutes); // Add this line

export default app;
