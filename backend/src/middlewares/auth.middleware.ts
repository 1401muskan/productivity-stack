import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { verifyToken } from "../utils/jwt.js";

export interface AuthRequest
  extends Request {
  userId?: string;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader =
  req.headers.authorization;

if (!authHeader) {
  return res.status(401).json({
    message: "Unauthorized",
  });
}

if (!authHeader.startsWith("Bearer ")) {
  return res.status(401).json({
    message: "Invalid Authorization Header",
  });
}

const token =
  authHeader.split(" ")[1];

if (!token) {
  return res.status(401).json({
    message: "Token missing",
  });
}

const decoded =
  verifyToken(token);

req.userId =
  decoded.userId;

next();
  } catch {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};
