const express = require("express");
const router = express.Router();
const Assignment = require("../models/assignment");

// Add Assignment
router.post("/", async (req, res) => {
  const newAssignment = new Assignment(req.body);
  const saved = await newAssignment.save();
  res.json(saved);
});

// Get Assignments
router.get("/", async (req, res) => {
  const data = await Assignment.find();
  res.json(data);
});

// Update
router.put("/:id", async (req, res) => {
  const updated = await Assignment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Delete
router.delete("/:id", async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;