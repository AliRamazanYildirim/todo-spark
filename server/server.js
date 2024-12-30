import express from "express";
import pool from "./db.js";
import cors from "cors";
import { nanoid } from "nanoid";

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

//Create a new todo

app.post('/todos',  async (req, res) => {
  const {user_email, title, progress, date} = req.body;
  console.log(user_email, title, progress, date);
  
  const id = nanoid();
  try {
    const newTodo = await pool.query(`INSERT INTO todos(id, user_email, title, progress, date) VALUES(
    $1, $2, $3, $4, $5)`, [id, user_email, title, progress, date])
    res.json(newTodo);
  } catch (error) {
    console.error(error);
  }
})

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
