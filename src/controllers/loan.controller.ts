import Loan from "../models/Loan";
import User from "../models/User";

import { checkEligibility } from "../utils/bre";

export const applyLoan = async (req: any, res: any) => {
  try {
    const { pan, dob, salary, employmentMode, amount, tenure } = req.body;

    // Salary Slip Required
    if (!req.file) {
      return res.status(400).json({
        message: "Salary slip is required",
      });
    }

    // Prevent Multiple Active Loans
    const existingLoan = await Loan.findOne({
      borrower: req.user.id,
      status: {
        $in: ["APPLIED", "SANCTIONED", "DISBURSED"],
      },
    });

    if (existingLoan) {
      return res.status(400).json({
        message: "You already have an active loan",
      });
    }

    // BRE Validation
    const eligibility = checkEligibility({
      pan,
      dob,
      salary: Number(salary),
      employmentMode,
    });

    if (!eligibility.success) {
      return res.status(400).json(eligibility);
    }

    // Save Borrower Details
    await User.findByIdAndUpdate(req.user.id, {
      pan,
      dob,
      salary,
      employmentMode,
    });

    // Interest Calculation
    const interest = Number(
      ((Number(amount) * 12 * Number(tenure)) / (365 * 100)).toFixed(2),
    );

    // Total Repayment
    const totalRepayment = Number((Number(amount) + interest).toFixed(2));

    // Create Loan
    const loan = await Loan.create({
      borrower: req.user.id,

      amount: Number(amount),

      tenure: Number(tenure),

      interest,

      totalRepayment,

      paidAmount: 0,

      salarySlip: req.file.path,

      status: "APPLIED",
    });

    return res.status(201).json({
      message: "Loan application submitted successfully",
      loan,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};
