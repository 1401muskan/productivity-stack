import { Router } from "express";

import {
  authenticate,
} from "../middlewares/auth.middleware.js";

import {
  create,
  getAll,
  update,
  remove,
} from "../controllers/task.controller.js";

const router = Router();

router.use(authenticate);

router.post("/", create);

router.get("/", getAll);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;