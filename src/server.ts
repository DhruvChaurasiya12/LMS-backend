import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db";

import authRoutes from "./routes/auth.routes";
import loanRoutes from "./routes/loan.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);
app.use(
  "/api/users",
  userRoutes
);
app.use(
  "/api/loan",
  loanRoutes
);
app.use(
  "/api/dashboard",
  dashboardRoutes
);
app.use(
  "/uploads",
  express.static(
    "uploads"
  )
);

app.get("/", (_, res) => {
  res.send("LMS API Running");
});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  );
});