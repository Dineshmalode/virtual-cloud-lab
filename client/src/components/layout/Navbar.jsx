import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-cloud">Cloud</span>
        <span className="logo-ai">Lab AI</span>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register" className="register-btn">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
