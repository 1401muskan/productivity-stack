import type { Request, Response } from "express";
import {
  loginUser,
  registerUser,
} from "../services/auth.services.js";

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
