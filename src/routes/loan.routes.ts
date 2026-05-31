import express from "express";

import { authMiddleware } from "../middleware/auth";

import { upload } from "../config/multer";

import { applyLoan } from "../controllers/loan.controller";

const router = express.Router();

router.post("/apply", authMiddleware, upload.single("salarySlip"), applyLoan);

export default router;
