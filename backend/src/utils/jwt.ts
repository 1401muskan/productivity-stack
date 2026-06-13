import jwt from "jsonwebtoken";
import type { JwtUserPayload } from "../types/jwt.js";

const JWT_SECRET =
  process.env.JWT_SECRET || "hello1401";

export const generateToken = (
  userId: string
): string => {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const verifyToken = (
  token: string
): JwtUserPayload => {
  const decoded = jwt.verify(
    token,
    JWT_SECRET
  );

  if (
    typeof decoded === "string" ||
    !("userId" in decoded)
  ) {
    throw new Error("Invalid token");
  }

  return {
    userId: decoded.userId as string,
  };
};
