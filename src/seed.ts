import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";

import connectDB from "./config/db";
import User from "./models/User";

type Role =
  | "ADMIN"
  | "BORROWER"
  | "SALES"
  | "SANCTION"
  | "DISBURSEMENT"
  | "COLLECTION";

interface SeedUser {
  name: string;
  email: string;
  role: Role;
}

const seed = async () => {
  try {
    await connectDB();

    await User.deleteMany({});

    const password = await bcrypt.hash(
      "123456",
      10
    );

    const users: SeedUser[] = [
      {
        name: "Admin",
        email: "admin@test.com",
        role: "ADMIN",
      },
      {
        name: "Sales",
        email: "sales@test.com",
        role: "SALES",
      },
      {
        name: "Sanction",
        email: "sanction@test.com",
        role: "SANCTION",
      },
      {
        name: "Disbursement",
        email: "disbursement@test.com",
        role: "DISBURSEMENT",
      },
      {
        name: "Collection",
        email: "collection@test.com",
        role: "COLLECTION",
      },
      {
        name: "Borrower",
        email: "borrower@test.com",
        role: "BORROWER",
      },
    ];

    for (const user of users) {
      await User.create({
        ...user,
        password,
      });
    }

    console.log("Seed Completed");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();