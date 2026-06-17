import type { Response } from "express";

import { prisma } from "../config/prisma.js";

import type {
  AuthRequest,
} from "../middlewares/auth.middleware.js";

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

    const notes =
      await prisma.note.count({
        where: {
          userId: req.userId,
        },
      });

    const tasks =
      await prisma.task.count({
        where: {
          userId: req.userId,
        },
      });

    const completed =
      await prisma.task.count({
        where: {
          userId: req.userId,
          status: "DONE",
        },
      });

    res.json({
      notes,
      tasks,
      completed,
    });
  } catch {
    res.status(500).json({
      message: "Server Error",
    });
  }
};