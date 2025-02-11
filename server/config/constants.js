export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
export const SALT_ROUNDS = 10;