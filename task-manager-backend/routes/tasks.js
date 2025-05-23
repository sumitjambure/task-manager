const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");
const { taskSchema, updateTaskSchema } = require("../validators/taskValidator");


// Create new task, validate input and attach logged-in user ID
router.post("/", auth, async (req, res) => {
    const { error } = taskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const task = new Task({
            ...req.body,
            userId: req.user.id, // Attach logged-in user's ID
        });
        const saved = await task.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: "Failed to create task" });
    }
});


// Fetch paginated tasks for logged-in user
router.get("/", auth, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    try {
        const totalTasks = await Task.countDocuments({ userId: req.user.id });
        const tasks = await Task.find({ userId: req.user.id })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.json({
            tasks,
            currentPage: page,
            totalPages: Math.ceil(totalTasks / limit),
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

// Update task by ID, validate input, ensure task belongs to user

router.put("/:id", auth, async (req, res) => {
    const { error } = updateTaskSchema.validate(req.body);  // ✅ use update schema
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const updated = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ error: "Failed to update task" });
    }
});


// Delete task by ID, ensure task belongs to user
router.delete("/:id", auth, async (req, res) => {
    try {
        await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete task" });
    }
});

module.exports = router;
