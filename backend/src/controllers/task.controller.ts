import type { Response } from "express";

import type {
  AuthRequest,
} from "../middlewares/auth.middleware.js";

import * as taskService from "../services/task.service.js";

export const create = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const {
      title,
      description,
    } = req.body;

    const task =
      await taskService.createTask(
        title,
        description,
        req.userId
      );

    res.status(201).json(task);
  } catch {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getAll = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const tasks =
      await taskService.getTasks(
        req.userId
      );

    res.json(tasks);
  } catch {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const update = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const taskId = String(req.params.id);

    const {
      title,
      description,
      status,
    } = req.body;

    await taskService.updateTask(
      taskId,
      req.userId,
      title,
      description,
      status
    );

    res.json({
      message: "Task updated",
    });
  } catch {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const remove = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const taskId = String(req.params.id);

    await taskService.deleteTask(
      taskId,
      req.userId
    );

    res.json({
      message: "Task deleted",
    });
  } catch {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
