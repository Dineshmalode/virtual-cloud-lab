import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (email, otp, name) => {
  const mailOptions = {
    from: `"CloudLab AI" <${process.env.EMAIL_USER}>`,
    to: email,

    subject: "CloudLab AI - Email Verification OTP",

    html: `
      <div style="font-family:Arial;padding:30px;background:#f4f7fb">
        <div style="background:white;padding:30px;border-radius:12px;max-width:500px;margin:auto">

          <h2 style="color:#2563EB;">CloudLab AI</h2>

          <p>Hello <b>${name}</b>,</p>

          <p>Your verification code is:</p>

          <div style="
            background:#EFF6FF;
            color:#2563EB;
            font-size:34px;
            font-weight:bold;
            text-align:center;
            padding:20px;
            border-radius:12px;
            letter-spacing:8px;">
            ${otp}
          </div>

          <p style="margin-top:25px">
            This OTP is valid for <b>5 minutes</b>.
          </p>

          <hr/>

          <p style="font-size:13px;color:#64748B">
            CloudLab AI • AWS Hands-on Virtual Practice Platform
          </p>

        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};