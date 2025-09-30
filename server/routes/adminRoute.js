const express = require("express");
const route = express.Router();
const adminController = require("../controllers/adminController");

route.post("/adminlogin", adminController.adminLogin);
route.post("/adminregister", adminController.registerAdmin);


route.put("/edit-task/:id",adminController.editTask);
route.post("/createuser", adminController.createUser);
route.get("/userdatashow", adminController.UserDatashow);
route.post("/assigntask", adminController.assignTask);

route.get("/displaytaskuser", adminController.DisplayTaskUser);
route.get("/deleteusertask", adminController.DeleteUserTask);

module.exports = route;
