const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

//mongoose.connect("mongodb://127.0.0.1:27017/assignmentDB")
mongoose.connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/assignmentDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const assignmentRoutes = require("./routes/assignmentRoutes");
app.use("/assignments", assignmentRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});