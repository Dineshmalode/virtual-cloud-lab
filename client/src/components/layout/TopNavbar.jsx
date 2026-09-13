function TopNavbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="top-navbar">
      <div>
        <h2>Welcome Back 👋</h2>
        <p>Continue your AWS hands-on learning journey.</p>
      </div>

      <div className="profile-box">
        <div className="avatar">
          {user?.fullName?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h4>{user?.fullName}</h4>
          <p>{user?.email}</p>
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;