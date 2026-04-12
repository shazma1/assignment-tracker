const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: String,
  subject: String,
  priority: String,
  dueDate: String,
  status: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model("Assignment", assignmentSchema);