import User from "../models/User";
import bcrypt from "bcryptjs";
import Loan from "../models/Loan";

export const createEmployee = async (req: any, res: any) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({
      email,
    });

    if (exists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getProfile = async (req: any, res: any) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json(user);
};

export const updatePassword = async (req: any, res: any) => {
  const { password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  await User.findByIdAndUpdate(req.user.id, {
    password: hashed,
  });

  res.json({
    message: "Password Updated",
  });
};

export const getHistory = async (req: any, res: any) => {
  const loans = await Loan.find({
    borrower: req.user.id,
  });

  res.json(loans);
};
