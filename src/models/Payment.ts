import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    loanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
      required: true
    },

    utr: {
      type: String,
      unique: true,
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    paymentDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Payment",
  paymentSchema
);