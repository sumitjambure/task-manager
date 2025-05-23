const mongoose = require("mongoose");

// Task schema with fields for title, description, status, and reference to user
const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Task", TaskSchema);
