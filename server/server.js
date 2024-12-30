import express from "express";
import pool from "./db.js";
import cors from "cors";

const PORT = process.env.PORT ?? 8000;
const app = express();

/* app.get('/', (req, res) => {
    res.send('Hallo Welt!');
});
 */
app.use(cors());
app.use(express.json());

app.get("/todos/:userEmail", async (req, res) => {
  console.log(req);
  const userEmail = req.params.userEmail;
  try {
    const todos = await pool.query(
      "SELECT * FROM todos WHERE user_email = $1",
      [userEmail]
    );
    console.log("Fetched todos:", todos.rows); //!Drucken der zurückgegebenen Daten in der Konsole
    res.json(todos.rows);
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
