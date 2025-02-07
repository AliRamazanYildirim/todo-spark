import pool from "../config/db.js";
import { nanoid } from "nanoid";

export const getTodos = async (req, res) => {
  const userEmail = req.params.userEmail;
  try {
    const todos = await pool.query(
      "SELECT * FROM todos WHERE user_email = $1",
      [userEmail]
    );
    res.json(todos.rows);
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createTodo = async (req, res) => {
  const { user_email, title, progress, date } = req.body;
  const id = nanoid();
  try {
    const newTodo = await pool.query(
      `INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)`,
      [id, user_email, title, progress, date]
    );
    res.json(newTodo);
  } catch (error) {
    console.error(error);
  }
};

export const updateTodo = async (req, res) => {
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
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteToDo = await pool.query("DELETE FROM todos WHERE id = $1;", [
      id,
    ]);
    res.json(deleteToDo);
  } catch (error) {
    console.error(error);
  }
};