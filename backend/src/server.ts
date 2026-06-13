import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Workspace API Running");
});

app.use("/api/auth", authRoutes);

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
