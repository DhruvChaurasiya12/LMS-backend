import Payment from "../models/Payment";
import Loan from "../models/Loan";

export const getSalesLeads = async (req: any, res: any) => {
  try {
    const Loan = (await import("../models/Loan")).default;

    const User = (await import("../models/User")).default;

    const loans = await Loan.find().select("borrower");

    const borrowerIds = loans.map((loan: any) => loan.borrower);

    const leads = await User.find({
      role: "BORROWER",
      _id: {
        $nin: borrowerIds,
      },
    });

    res.json(leads);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getAppliedLoans = async (req: any, res: any) => {
  const loans = await Loan.find({
    status: "APPLIED",
  }).populate("borrower");

  res.json(loans);
};

export const approveLoan = async (req: any, res: any) => {
  const loan = await Loan.findById(req.params.id);

  if (!loan) {
    return res.status(404).json({
      message: "Loan not found",
    });
  }

  loan.status = "SANCTIONED";

  await loan.save();

  res.json(loan);
};

export const rejectLoan = async (req: any, res: any) => {
  const loan = await Loan.findById(req.params.id);

  if (!loan) {
    return res.status(404).json({
      message: "Loan not found",
    });
  }

  loan.status = "REJECTED";

  loan.rejectionReason = req.body.reason;

  await loan.save();

  res.json(loan);
};

export const getSanctionedLoans = async (req: any, res: any) => {
  const loans = await Loan.find({
    status: "SANCTIONED",
  });

  res.json(loans);
};

export const disburseLoan = async (req: any, res: any) => {
  const loan = await Loan.findById(req.params.id);

  if (!loan) {
    return res.status(404).json({
      message: "Loan not found",
    });
  }

  loan.status = "DISBURSED";

  await loan.save();

  res.json(loan);
};

export const getDisbursedLoans = async (req: any, res: any) => {
  const loans = await Loan.find({
    status: "DISBURSED",
  });

  res.json(loans);
};

export const addPayment = async (req: any, res: any) => {
  const { loanId, utr, amount } = req.body;

  const existing = await Payment.findOne({
    utr,
  });

  if (existing) {
    return res.status(400).json({
      message: "UTR already exists",
    });
  }

  const loan = await Loan.findById(loanId);

  if (!loan) {
    return res.status(404).json({
      message: "Loan not found",
    });
  }

  const outstanding = Number(
    (loan.totalRepayment - loan.paidAmount).toFixed(2),
  );

  if (Number(amount) > outstanding) {
    return res.status(400).json({
      message: "Payment exceeds outstanding balance",
    });
  }

  await Payment.create({
    loanId,
    utr,
    amount,
  });

  loan.paidAmount += Number(amount);

  const remaining = loan.totalRepayment - loan.paidAmount;

  if (remaining <= 0.01) {
    loan.status = "CLOSED";
  }

  await loan.save();

  res.json({
    message: "Payment recorded",
    loan,
  });
};

export const getDashboardStats = async (req: any, res: any) => {
  try {
    const totalLoans = await Loan.countDocuments();

    const applied = await Loan.countDocuments({
      status: "APPLIED",
    });

    const sanctioned = await Loan.countDocuments({
      status: "SANCTIONED",
    });

    const disbursed = await Loan.countDocuments({
      status: "DISBURSED",
    });

    const closed = await Loan.countDocuments({
      status: "CLOSED",
    });

    const rejected = await Loan.countDocuments({
      status: "REJECTED",
    });

    res.json({
      totalLoans,
      applied,
      sanctioned,
      disbursed,
      closed,
      rejected,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
