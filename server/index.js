// const express = require("express")
// const app = express()
// const mongoose= require("mongoose");
// const bodyparser = require('body-parser')
// const cors = require('cors');
// const adminRoute= require("./routes/adminRoute");
// const userRoute = require("./routes/userRoute");


// require('dotenv').config();
// app.use(cors());
// mongoose.connect(process.env.DBCON).then(()=>{
//     console.log("DB connected!!!");
// })
// let PORT = process.env.port || 8000
// // Body-parser middleware
// app.use(bodyparser.urlencoded({ extended: true }))
// app.use(bodyparser.json())

// app.use("/admin", adminRoute);
// app.use("/user", userRoute);











// app.listen(PORT, function (error) {
//     if (error) throw error
//     console.log("Server created Successfully on PORT: ", PORT)
// })



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan"); // <-- morgan
const adminRoute = require("./routes/adminRoute");
const userRoute = require("./routes/userRoute");

require("dotenv").config();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Morgan middleware for logging HTTP requests
app.use(morgan("dev"));

mongoose
  .connect(process.env.DBCON)
  .then(() => {
    console.log("DB connected!!!");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

app.use("/admin", adminRoute);
app.use("/user", userRoute);

let PORT = process.env.PORT || 8000;

app.listen(PORT, function (error) {
  if (error) throw error;
  console.log("Server created Successfully on PORT:", PORT);
});
