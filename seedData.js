const mongoose = require("mongoose");
const Assignment = require("./models/assignment");

mongoose.connect("mongodb://127.0.0.1:27017/assignmentDB");

async function seed() {
  await Assignment.insertMany([
    {
      title: "DevOps Deployment",
      subject: "Cloud Computing",
      priority: "High",
      dueDate: "2026-03-15",
      status: "Pending"
    },
    {
      title: "AI Skin Scanner Research",
      subject: "Artificial Intelligence",
      priority: "Medium",
      dueDate: "2026-03-18",
      status: "Pending"
    }
  ]);

  console.log("Sample Data Inserted");
  mongoose.connection.close();
}

seed();