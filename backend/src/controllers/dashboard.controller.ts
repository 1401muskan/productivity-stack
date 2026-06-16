import type { Response } from "express";
import { prisma } from "../config/prisma.js";
import type { AuthRequest } from "../middlewares/auth.middleware.js";

export const getStats = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const notesCount =
      await prisma.note.count({
        where: {
          userId: req.userId,
        },
      });

    res.json({
      notes: notesCount,
      tasks: 0,
      events: 0,
    });
  } catch {
    res.status(500).json({
      message: "Server Error",
    });
  }
};