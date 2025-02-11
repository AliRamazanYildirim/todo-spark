import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config/constants.js";

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};