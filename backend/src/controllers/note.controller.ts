import type { Response } from "express";

import type {
  AuthRequest,
} from "../middlewares/auth.middleware.js";

import * as noteService from "../services/note.service.js";

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

    const { title, content } = req.body;

    const note = await noteService.createNote(
      title,
      content,
      req.userId
    );

    return res.status(201).json(note);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
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

    const notes = await noteService.getNotes(
      req.userId
    );

    return res.json(notes);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getOne = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const noteId = req.params.id;

    if (!noteId || Array.isArray(noteId)) {
      return res.status(400).json({
        message: "Invalid note id",
      });
    }

    const note = await noteService.getNote(
      noteId,
      req.userId
    );

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.json(note);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
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

    const noteId = req.params.id;

    if (!noteId || Array.isArray(noteId)) {
      return res.status(400).json({
        message: "Invalid note id",
      });
    }

    const { title, content } = req.body;

    await noteService.updateNote(
      noteId,
      req.userId,
      title,
      content
    );

    return res.json({
      message: "Note updated",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
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

    const noteId = req.params.id;

    if (!noteId || Array.isArray(noteId)) {
      return res.status(400).json({
        message: "Invalid note id",
      });
    }

    await noteService.deleteNote(
      noteId,
      req.userId
    );

    return res.json({
      message: "Note deleted",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};
