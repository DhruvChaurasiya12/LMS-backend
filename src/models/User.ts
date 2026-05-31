import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: [
        "ADMIN",
        "BORROWER",
        "SALES",
        "SANCTION",
        "DISBURSEMENT",
        "COLLECTION"
      ],
      default: "BORROWER"
    },

    pan: String,

    dob: Date,

    salary: Number,

    employmentMode: {
      type: String,
      enum: [
        "SALARIED",
        "SELF_EMPLOYED",
        "UNEMPLOYED"
      ]
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "User",
  userSchema
);