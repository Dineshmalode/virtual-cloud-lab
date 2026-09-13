import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export const registerUser = async (userData) => {
  const res = await API.post("/register", userData);
  return res.data;
};

export const verifyOtp = async (otpData) => {
  const res = await API.post("/verify-otp", otpData);
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await API.post("/login", userData);
  return res.data;
};

/* Forgot Password */

export const forgotPassword = async (email) => {
  const res = await API.post("/forgot-password", { email });
  return res.data;
};

export const verifyResetOtp = async (data) => {
  const res = await API.post("/verify-reset-otp", data);
  return res.data;
};

export const resetPassword = async (data) => {
  const res = await API.post("/reset-password", data);
  return res.data;
};

export default API;