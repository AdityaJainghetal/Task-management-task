const AdminModel = require("../models/adminModel");
const UserModel = require("../models/userModel");
const TaskModel = require("../models/taskModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "aditya";


const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  if (name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await AdminModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin: newAdmin,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
// Create User
const createUser = async (req, res) => {
  const { username, designation, email, password } = req.body;

  if (!username || !designation || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      username,
      designation,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ success: true, message: "New user created", user: newUser });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

// Show all users
const UserDatashow = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching users", error: error.message });
  }
};

// Assign task to user
// const assignTask = async (req, res) => {
//   try {
//     const { id, tasktitle, taskdetail, taskduration } = req.body;
//     const task = await TaskModel.create({
//       tasktitle,
//       taskdetail,
//       taskduration,
//       userid: id,
//     });
//     res.status(200).json({ msg: "Task successfully assigned", task });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "Error assigning task", error: error.message });
//   }
// };



const assignTask = async (req, res) => {
  try {
    const { id, tasktitle, taskdetail, taskduration, priority } = req.body;

    // Priority validation
    const validPriorities = ["high", "medium", "low"];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ msg: "Invalid priority value" });
    }

    const task = await TaskModel.create({
      tasktitle,
      taskdetail,
      taskduration,
      priority, // added priority
      userid: id,
    });

    res.status(200).json({ msg: "Task successfully assigned", task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error assigning task", error: error.message });
  }
};

// Display all tasks with user info
const DisplayTaskUser = async (req, res) => {
  try {
    const data = await TaskModel.find().populate("userid");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error fetching tasks", error: error.message });
  }
};

// Delete user task
const DeleteUserTask = async (req, res) => {
  const { id } = req.query; // <-- use query param instead of body
  try {
    await TaskModel.findByIdAndDelete(id);
    res.status(200).json({ msg: "Task deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting task", error: error.message });
  }
};


// const editTask = async (req, res) => {
//   const { id } = req.params;
//   const { tasktitle, taskdetail, taskduration } = req.body;

//   try {
//     const updatedTask = await TaskModel.findByIdAndUpdate(
//       id,
//       { tasktitle, taskdetail, taskduration },
//       { new: true }
//     );

//     if (!updatedTask) {
//       return res.status(404).json({ msg: "Task not found" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Task updated successfully",
//       task: updatedTask,
//     });
//   } catch (error) {
//     res.status(500).json({ msg: "Error updating task", error: error.message });
//   }
// };
// Edit Task
const editTask = async (req, res) => {
  const { id } = req.params;
  const { tasktitle, taskdetail, taskduration, status } = req.body;

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { tasktitle, taskdetail, taskduration, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error updating task", error: error.message });
  }
};



module.exports = {
  adminLogin,
  createUser,
  UserDatashow,
  assignTask,
  DisplayTaskUser,
  DeleteUserTask,
  registerAdmin,
  editTask
};
