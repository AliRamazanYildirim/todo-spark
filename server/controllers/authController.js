import { EMAIL_REGEX } from "../config/constants.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import { insertUser, findUserByEmail } from "../config/queries.js";

export const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ detail: "Email and password are required" });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ detail: "Invalid email format" });
  }

  if (password.length < 6) {
    return res.status(400).json({ detail: "Password must be at least 6 characters long" });
  }

  const hashedPassword = hashPassword(password);

  try {
    await insertUser(email, hashedPassword);
    const token = generateToken({ email });
    res.cookie("Email", email, { httpOnly: true });
    res.cookie("Token", token, { httpOnly: true });
    res.json({ email, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ detail: error.detail });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ detail: "Email and password are required" });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ detail: "Invalid email format" });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user.rows.length) {
      return res.status(404).json({ detail: "User not found" });
    }

    const success = comparePassword(password, user.rows[0].hashed_password);
    if (success) {
      const token = generateToken({ email });
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