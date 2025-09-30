import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate, Outlet } from "react-router-dom";

const UserDashboard = () => {
  const [username, Setusername] = useState("");
  const [email, Setemail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/home");
    }
    Setusername(localStorage.getItem("username"));
    Setemail(localStorage.getItem("useremail"));
  }, [navigate]);

  const userlogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/home");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h3>Dashboard</h3>
        </div>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="mytask" className="sidebar-link">
            My Task
          </Nav.Link>
        </Nav>

        <div className="sidebar-user-info">
          <strong>Welcome:</strong> {username}
          <br />
          <small>Email: {email}</small>
        </div>

        <button className="btn btn-danger logout-btn" onClick={userlogout}>
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
