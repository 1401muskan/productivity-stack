import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import noteRoutes from "./routes/note.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import taskRoutes from "./routes/task.routes.js";
import eventRoutes from "./routes/event.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Workspace API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/events",eventRoutes);

app.get("/test", (req, res) => {
  res.json({
    message: "Backend working",
  });
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
