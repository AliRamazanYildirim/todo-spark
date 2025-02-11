import pool from "../config/db.js";

export const insertUser = async (email, hashedPassword) => {
  return pool.query(`INSERT INTO users(email, hashed_password) VALUES($1, $2)`, [email, hashedPassword]);
};

export const findUserByEmail = async (email) => {
  return pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
};