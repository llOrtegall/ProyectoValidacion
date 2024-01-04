import { sign, verify, Secret } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET || '';

export const generateToken = (id: string) => {
  const jwt = sign({ id }, JWT_SECRET, { expiresIn: '1h' });
  return jwt;
}

export const verifyToken = (jwt: string) => {
  const isOk = verify(jwt, JWT_SECRET);
  return isOk;
}