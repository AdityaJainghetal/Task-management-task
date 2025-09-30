const UserModel = require("../models/userModel");
const TaskModel = require("../models/taskModel")



const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid user email" });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send response
    res.status(200).json({
      success: true,
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        designation: user.designation,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};


const userTaskDisplay = async(req,res)=>{
    const {id} = req.query;

    try {
        const Task= await TaskModel.find({userid:id});
        res.status(200).send(Task);
    } catch (error) {
        console.log(error)
    }


}


const  taskStatusChange = async(req,res)=>{
    console.log(req.body)


    const {id}= req.body



    try {
        const Task= await  TaskModel.findByIdAndUpdate(id,{status:"Complete"})
        res.status(200).send("Okk")
    } catch (error) {
        console.log(error)
    }

}


module.exports={
    userLogin,
    userTaskDisplay,
    taskStatusChange
}