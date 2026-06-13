import type { Request, Response } from "express";
import {
  loginUser,
  registerUser,
} from "../services/auth.services.js";
import { prisma } from "../config/prisma.js";
import type { AuthRequest } from "../middlewares/auth.middleware.js";

export const register = async (
  req: Request,
  res: Response
) => {
     console.log("REGISTER HIT");
  console.log(req.body);
  try {
    const { name, email, password } = req.body;

    const data = await registerUser(
      name,
      email,
      password
    );

    res.status(201).json(data);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const data = await loginUser(
      email,
      password
    );

    res.json(data);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getCurrentUser = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    res.json(user);
  } catch {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
