import Sidebar from "../../components/layout/Sidebar";
import TopNavbar from "../../components/layout/TopNavbar";
import "./Dashboard.css";

import {
  FaServer,
  FaDatabase,
  FaUserShield,
  FaNetworkWired,
} from "react-icons/fa";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard-container">

      <Sidebar />

      <div className="dashboard-content">

        <TopNavbar />

        {/* Welcome Card */}

        <section className="welcome-card">
          <h1>Hello, {user?.fullName} 🚀</h1>

          <p>
            Practice AWS services through guided labs and track your cloud
            learning progress inside CloudLab AI.
          </p>

          <button>Start AWS Practice</button>
        </section>

        {/* Stats */}

        <section className="stats-grid">

          <div className="stat-card">
            <h2>0</h2>
            <p>Completed Labs</p>
          </div>

          <div className="stat-card">
            <h2>0</h2>
            <p>AWS Points</p>
          </div>

          <div className="stat-card">
            <h2># --</h2>
            <p>Leaderboard Rank</p>
          </div>

          <div className="stat-card">
            <h2>0</h2>
            <p>Certificates</p>
          </div>

        </section>

        {/* AWS Practice */}

        <section className="labs-section-dashboard">

          <h2>AWS Practice Labs</h2>

          <div className="labs-grid-dashboard">

            <div className="lab-card-dashboard">
              <FaServer className="lab-icon-dashboard blue-icon" />
              <h3>EC2 Virtual Machine</h3>
              <p>Launch and configure Linux EC2 instances.</p>
              <button>Start Lab</button>
            </div>

            <div className="lab-card-dashboard">
              <FaDatabase className="lab-icon-dashboard orange-icon" />
              <h3>S3 Storage</h3>
              <p>Create buckets, upload objects and manage permissions.</p>
              <button>Start Lab</button>
            </div>

            <div className="lab-card-dashboard">
              <FaUserShield className="lab-icon-dashboard green-icon" />
              <h3>IAM Security</h3>
              <p>Create users, roles, groups and policies.</p>
              <button>Start Lab</button>
            </div>

            <div className="lab-card-dashboard">
              <FaNetworkWired className="lab-icon-dashboard purple-icon" />
              <h3>VPC Networking</h3>
              <p>Build secure networking with subnets and gateways.</p>
              <button>Start Lab</button>
            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default Dashboard;