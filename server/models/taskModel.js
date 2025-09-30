const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  tasktitle: {
    type: String,
    require: true,
  },
  taskdetail: String,

  taskduration: String,
  status: { type: String, default: "pending" },
  priority: { type: String, enum: ["high", "medium", "low"], required: true },
  userid: { type: mongoose.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("task", taskSchema);
