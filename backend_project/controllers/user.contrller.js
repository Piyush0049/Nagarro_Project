import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  try {
    const { userName, email, phoneNumber, password } = req.body;

    if (!userName || !email || !phoneNumber || !password) {
      return res.status(400).json({
        message: "Some required fields are missing",
        success: false,
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or phone number already in use",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      userName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};



