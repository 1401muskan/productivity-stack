import type { Response } from "express";

import type {
  AuthRequest,
} from "../middlewares/auth.middleware.js";

import * as eventService
  from "../services/event.service.js";

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
      start,
      end,
    } = req.body;

    const event =
      await eventService.createEvent(
        title,
        start,
        end,
        req.userId
      );

    res.status(201).json(event);
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

    const events =
      await eventService.getEvents(
        req.userId
      );

    res.json(events);
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

    const eventId =
      String(req.params.id);

    const {
      title,
      start,
      end,
    } = req.body;

    await eventService.updateEvent(
      eventId,
      title,
      start,
      end,
      req.userId
    );

    res.json({
      message: "Event updated",
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

    const eventId =
      String(req.params.id);

    await eventService.deleteEvent(
      eventId,
      req.userId
    );

    res.json({
      message: "Event deleted",
    });
  } catch {
    res.status(500).json({
      message: "Server Error",
    });
  }
};