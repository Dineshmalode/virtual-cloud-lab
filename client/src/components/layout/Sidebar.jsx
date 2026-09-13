import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaAws,
  FaChartLine,
  FaCertificate,
  FaTrophy,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully!");

    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>
          <span className="blue">Cloud</span>
          <span className="orange">Lab AI</span>
        </h2>

        <p>AWS Practice Platform</p>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/user/dashboard">
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/user/labs">
          <FaAws />
          <span>AWS Labs</span>
        </NavLink>

        <NavLink to="/user/progress">
          <FaChartLine />
          <span>Progress</span>
        </NavLink>

        <NavLink to="/user/certificates">
          <FaCertificate />
          <span>Certificates</span>
        </NavLink>

        <NavLink to="/user/competitions">
          <FaTrophy />
          <span>Competitions</span>
        </NavLink>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;