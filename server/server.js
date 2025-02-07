import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

const PORT = process.env.PORT ?? 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", todoRoutes);

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));