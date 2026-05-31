import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    tenure: {
      type: Number,
      required: true
    },

    interest: {
      type: Number,
      required: true
    },

    totalRepayment: {
      type: Number,
      required: true
    },

    salarySlip: {
      type: String
    },

    status: {
      type: String,
      enum: [
        "APPLIED",
        "SANCTIONED",
        "REJECTED",
        "DISBURSED",
        "CLOSED"
      ],
      default: "APPLIED"
    },

    rejectionReason: String,

    paidAmount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Loan",
  loanSchema
);