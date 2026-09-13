import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Auth.css";
import { verifyResetOtp } from "../../services/authService";

function VerifyResetOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await verifyResetOtp({ email, otp });

      alert(response.message);

      navigate("/reset-password", {
        state: { email },
      });
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <h1><span className="blue">Cloud</span><span className="orange">Lab AI</span></h1>
          <p>Verify Password Reset OTP</p>
        </div>

        <div className="verify-email-box">
          <strong>Email</strong>
          <p>{email}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>6 Digit OTP</label>
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
      </div>
    </div>
  );
}

export default VerifyResetOtp;