import User from "../models/User.js";
import Otp from "../models/Otp.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "../services/emailService.js";

/* ---------------- REGISTER : SEND OTP ---------------- */

export const register = async (req, res) => {
  try {
    const { fullName, email, college, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    await Otp.findOneAndDelete({ email });

    await Otp.create({
      email,
      otp,
      purpose: "register",
      fullName,
      college,
      password: hashedPassword,
      role,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendOtpEmail(email, otp, fullName);

    res.json({ message: "OTP sent successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Registration failed." });
  }
};

/* ---------------- VERIFY REGISTER OTP ---------------- */

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpData = await Otp.findOne({ email, purpose: "register" });

    if (!otpData) {
      return res.status(400).json({ message: "OTP not found." });
    }

    if (otpData.expiresAt < new Date()) {
      await Otp.deleteOne({ email });
      return res.status(400).json({ message: "OTP expired." });
    }

    if (otpData.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    await User.create({
      fullName: otpData.fullName,
      email: otpData.email,
      college: otpData.college,
      password: otpData.password,
      role: otpData.role,
      isVerified: true,
    });

    await Otp.deleteOne({ email });

    res.status(201).json({ message: "Email verified successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Verification failed." });
  }
};

/* ---------------- LOGIN ---------------- */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed." });
  }
};

/* ---------------- FORGOT PASSWORD : SEND OTP ---------------- */

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not registered." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.findOneAndDelete({ email });

    await Otp.create({
      email,
      otp,
      purpose: "reset-password",
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendOtpEmail(email, otp, user.fullName);

    res.json({ message: "Password reset OTP sent successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to send OTP." });
  }
};

/* ---------------- VERIFY RESET OTP ---------------- */

export const verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpData = await Otp.findOne({
      email,
      purpose: "reset-password",
    });

    if (!otpData) {
      return res.status(400).json({ message: "OTP not found." });
    }

    if (otpData.expiresAt < new Date()) {
      await Otp.deleteOne({ email });
      return res.status(400).json({ message: "OTP expired." });
    }

    if (otpData.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    res.json({ message: "OTP verified successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "OTP verification failed." });
  }
};

/* ---------------- RESET PASSWORD ---------------- */

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const otpData = await Otp.findOne({
      email,
      purpose: "reset-password",
    });

    if (!otpData) {
      return res.status(400).json({ message: "OTP verification required." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );

    await Otp.deleteOne({ email });

    res.json({ message: "Password updated successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Password reset failed." });
  }
};