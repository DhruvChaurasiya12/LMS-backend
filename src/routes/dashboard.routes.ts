import express from "express";

import {
  authMiddleware,
} from "../middleware/auth";

import {
  authorize,
} from "../middleware/role";

import {
  getSalesLeads,
  getAppliedLoans,
  approveLoan,
  rejectLoan,
  getSanctionedLoans,
  disburseLoan,
  getDisbursedLoans,
  addPayment,
  getDashboardStats,
} from "../controllers/dashboard.controller";

const router =
  express.Router();

router.get(
  "/sales",
  authMiddleware,
  authorize([
    "SALES",
    "ADMIN",
  ]),
  getSalesLeads
);

router.get(
  "/sanction",
  authMiddleware,
  authorize([
    "SANCTION",
    "ADMIN",
  ]),
  getAppliedLoans
);

router.patch(
  "/sanction/:id/approve",
  authMiddleware,
  authorize([
    "SANCTION",
    "ADMIN",
  ]),
  approveLoan
);

router.patch(
  "/sanction/:id/reject",
  authMiddleware,
  authorize([
    "SANCTION",
    "ADMIN",
  ]),
  rejectLoan
);

router.get(
  "/disbursement",
  authMiddleware,
  authorize([
    "DISBURSEMENT",
    "ADMIN",
  ]),
  getSanctionedLoans
);

router.patch(
  "/disbursement/:id",
  authMiddleware,
  authorize([
    "DISBURSEMENT",
    "ADMIN",
  ]),
  disburseLoan
);

router.get(
  "/collection",
  authMiddleware,
  authorize([
    "COLLECTION",
    "ADMIN",
  ]),
  getDisbursedLoans
);

router.post(
  "/payment",
  authMiddleware,
  authorize([
    "COLLECTION",
    "ADMIN",
  ]),
  addPayment
);

router.get(
  "/stats",
  authMiddleware,
  authorize(["ADMIN"]),
  getDashboardStats
);

export default router;