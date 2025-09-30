import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminDashBoard = () => {
  const [adminname, setAdminname] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("adminname")) {
      navigate("/home");
    }
    setAdminname(localStorage.getItem("adminname"));
  }, [navigate]);

  const Logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/home");
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <p>Welcome, {adminname}</p>
        <nav>
          <ul>
            <li>
              <Link to="createuser">Create User</Link>
            </li>
            <li>
              <Link to="assigntask">Assign Task</Link>
            </li>
            <li>
              <Link to="displaytask">Display Task</Link>
            </li>
          </ul>
        </nav>
        <button className="logout-btn" onClick={Logout}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashBoard;
