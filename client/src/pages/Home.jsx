import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUserType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!usertype) {
      toast.error("Please select user type");
      return;
    }

    if (usertype === "admin") {
      let api = "http://localhost:8000/admin/adminlogin";
      try {
        const response = await axios.post(api, {
          email: userid,
          password: password,
        });

        if (response.data.success) {
          localStorage.setItem("adminname", response.data.admin.name);
          localStorage.setItem("adminemail", response.data.admin.email);
          localStorage.setItem("usertoken", response.data.token);

          toast.success("Admin login successful!");
          navigate("/admindashboard");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Admin login failed");
      }
    } else if (usertype === "user") {
      let api = "http://localhost:8000/user/userlogin";
      try {
        const response = await axios.post(api, {
          email: userid,
          password: password,
        });

        if (response.status === 200) {
          localStorage.setItem("username", response.data.user.username);
          localStorage.setItem("useremail", response.data.user.email);
          localStorage.setItem("uid", response.data.user.id);
          localStorage.setItem("usertoken", response.data.token);

          toast.success("User login successful!");
          navigate("/userdashboard");
        }
      } catch (error) {
        toast.error(error.response?.data?.msg || "User login failed");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login Form</h2>
        <form>
          {/* Email */}
          <div className="form-group">
            <label>Enter Email:</label>
            <input
              type="text"
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Enter Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {/* User Type */}
          <div className="form-group">
            <label>Login As:</label>
            <select value={usertype} onChange={(e) => setUserType(e.target.value)}>
              <option value="">Select user type</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Submit */}
          <button type="button" onClick={handleSubmit} className="btn-submit">
            Submit
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Home;
