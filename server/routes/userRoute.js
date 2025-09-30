const express= require("express");
const route = express.Router();
const userController= require("../controllers/userController");

route.post("/userlogin", userController.userLogin)
route.get("/usertaskdisplay", userController.userTaskDisplay)

route.post("/taskstatuschange", userController.taskStatusChange);


module.exports=route;