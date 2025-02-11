import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

const PORT = process.env.PORT ?? 8000;
const app = express();

//? Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minuten
  max: 100, // Limit von 100 Anfragen pro IP und Fenster
  message: "Zu viele Anfragen von dieser IP, bitte versuchen Sie es später erneut."
});

app.use(cors());
app.use(express.json());
app.use(limiter); // Rate Limiting Middleware anwenden

app.use("/api/auth", limiter, authRoutes);
app.use("/api", todoRoutes);

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));