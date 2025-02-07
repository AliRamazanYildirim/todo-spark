import express from "express";
import pool from "./db.js";
import cors from "cors";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

app.post("/todos", async (req, res) => {
  const { user_email, title, progress, date } = req.body;
  console.log(user_email, title, progress, date);

  const id = nanoid();
  try {
    const newTodo = await pool.query(
      `INSERT INTO todos(id, user_email, title, progress, date) VALUES(
    $1, $2, $3, $4, $5)`,
      [id, user_email, title, progress, date]
    );
    res.json(newTodo);
  } catch (error) {
    console.error(error);
  }
});

//Edit a new todo

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;

  try {
    const editToDo = await pool.query(
      "UPDATE todos SET user_email =$1, title= $2, progress = $3, date = $4 WHERE id = $5;",
      [user_email, title, progress, date, id]
    );
    res.json(editToDo);
  } catch (error) {
    console.error(error);
  }
});

//Delete a todo

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteToDo = await pool.query("DELETE FROM todos WHERE id = $1;", [
      id,
    ]);
    res.json(deleteToDo);
  } catch (error) {
    console.error(error);
  }
});

//Signup

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  console.log(email, password);
  try {
    const signUp = await pool.query(
      `INSERT INTO users(email, hashed_password) VALUES($1, $2)`,
      [email, hashedPassword]
    );
    const token = jwt.sign({ email }, "secret", { expiresIn: "1d" });
    res.cookie("Email", email, { httpOnly: true });
    res.cookie("Token", token, { httpOnly: true });
    res.json({ email, token });
  } catch (error) {
    console.error(error);
    if (error) {
      res.json({ detail: error.detail });
    }
  }
});

//Login

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    if (!user.rows.length) {
      res.json({ detail: "User not found" });
      return;
    }

    const success = await bcrypt.compare(
      password,
      user.rows[0].hashed_password
    );
    if (success) {
      const token = jwt.sign({ email }, "secret", { expiresIn: "1d" });
      res.cookie("Email", email, { httpOnly: true });
      res.cookie("Token", token, { httpOnly: true });
      res.json({ email: user.rows[0].email, token });
    } else {
      res.json({ detail: "Login failed" });
    }
  } catch (error) {
    console.error(error);
    res.json({ detail: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
