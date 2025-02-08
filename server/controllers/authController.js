import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// E-Mail-Bestätigungsregex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const signup = async (req, res) => {
  const { email, password } = req.body;

  // Überprüfen der Anmeldeinformationen
  if (!email || !password) {
    return res.status(400).json({ detail: "Email and password are required" });
  }

  // E-Mail-Bestätigung
  if (!emailRegex.test(email)) {
    return res.status(400).json({ detail: "Invalid email format" });
  }

  // Überprüfung der Passwortlänge
  if (password.length < 6) {
    return res.status(400).json({ detail: "Password must be at least 6 characters long" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

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
    res.json({ detail: error.detail });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Überprüfen der Anmeldeinformationen
  if (!email || !password) {
    return res.status(400).json({ detail: "Email and password are required" });
  }

  // E-Mail-Bestätigung
  if (!emailRegex.test(email)) {
    return res.status(400).json({ detail: "Invalid email format" });
  }

  try {
    const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    if (!user.rows.length) {
      return res.status(404).json({ detail: "User not found" });
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
      res.status(401).json({ detail: "Login failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ detail: error.message });
  }
};