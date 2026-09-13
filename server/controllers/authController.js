import User from "../models/User.js";
import Otp from "../models/Otp.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { sendOtpEmail } from "../services/emailService.js";

/* REGISTER - SEND OTP */

export const register = async (req, res) => {
  try {
    const { fullName, email, college, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered.",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const hashedPassword = await bcrypt.hash(password, 10);

    await Otp.findOneAndDelete({ email });

    await Otp.create({
      email,
      otp,
      fullName,
      college,
      password: hashedPassword,
      role,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendOtpEmail(email, otp, fullName);

    res.status(200).json({
      message: "OTP sent successfully.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to send OTP.",
    });
  }
};

/* VERIFY OTP */

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return res.status(400).json({
        message: "OTP not found.",
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteOne({ email });

      return res.status(400).json({
        message: "OTP expired.",
      });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP.",
      });
    }

    await User.create({
      fullName: otpRecord.fullName,
      email: otpRecord.email,
      college: otpRecord.college,
      password: otpRecord.password,
      role: otpRecord.role,
      isVerified: true,
    });

    await Otp.deleteOne({ email });

    res.status(201).json({
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "OTP verification failed.",
    });
  }
};

/* LOGIN */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful.",

      token,

      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        college: user.college,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Login failed.",
    });
  }
};