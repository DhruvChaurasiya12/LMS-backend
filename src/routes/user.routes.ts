import express from "express";
import {
  createEmployee,
  getProfile,
  updatePassword,
  getHistory,
} from "../controllers/user.controller";

import { authMiddleware } from "../middleware/auth";

import { authorize } from "../middleware/role";

const router = express.Router();

router.post("/create", authMiddleware, authorize(["ADMIN"]), createEmployee);

router.get("/profile", authMiddleware, getProfile);

router.patch("/password", authMiddleware, updatePassword);

router.get("/history", authMiddleware, getHistory);

export default router;
