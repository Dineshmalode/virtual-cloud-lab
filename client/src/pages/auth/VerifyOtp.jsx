import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Auth.css";
import { verifyOtp } from "../../services/authService";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await verifyOtp({
        email,
        otp,
      });

      alert(response.message);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "OTP Verification Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>
            <span className="blue">Cloud</span>
            <span className="orange">Lab AI</span>
          </h1>

          <p>Email Verification</p>
        </div>

        <div className="verify-email-box">
          <strong>Email:</strong>
          <p>{email}</p>
        </div>

        <form className="auth-form" onSubmit={handleVerify}>
          <div className="form-group">
            <label>Enter 6 Digit OTP</label>

            <input
              type="text"
              maxLength="6"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button className="auth-btn" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="auth-footer">
          OTP is valid for 5 minutes.
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;