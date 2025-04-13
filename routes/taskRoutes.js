const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");
const User = require("../models/User");
const Employer = require("../models/Employer");
const router = express.Router();

// Helper to validate userId and determine userType
const validateUser = async (userId) => {
    try {
        // Check if userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return null; // Invalid format
        }

        // Check if userId exists in User collection
        const user = await User.findById(userId);
        if (user) return { id: userId, type: "User" };

        // Check if userId exists in Employer collection
        const employer = await Employer.findById(userId);
        if (employer) return { id: userId, type: "Employer" };

        return null; // userId not found
    } catch (error) {
        console.error("Error validating user:", error);
        return null;
    }
};

// Add a new task
router.post("/", async (req, res) => {
    try {
        const { userId, text } = req.body;
        if (!userId) return res.status(400).json({ error: "userId is required" });
        if (!text) return res.status(400).json({ error: "Task text is required" });

        const user = await validateUser(userId);
        if (!user) return res.status(401).json({ error: "Invalid userId" });

        const task = new Task({
            userId: user.id,
            userType: user.type,
            text,
        });
        await task.save();

        res.status(201).json(task);
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Toggle task completion
router.patch("/:id", async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ error: "userId is required" });

        const user = await validateUser(userId);
        if (!user) return res.status(401).json({ error: "Invalid userId" });

        const task = await Task.findOne({
            _id: req.params.id,
            userId: user.id,
            userType: user.type,
        });
        if (!task) return res.status(404).json({ error: "Task not found" });

        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date() : null;
        await task.save();

        res.json(task);
    } catch (error) {
        console.error("Error toggling task:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Delete a task
router.delete("/:id", async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ error: "userId is required" });

        const user = await validateUser(userId);
        if (!user) return res.status(401).json({ error: "Invalid userId" });

        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: user.id,
            userType: user.type,
        });
        if (!task) return res.status(404).json({ error: "Task not found" });

        res.json({ message: "Task deleted" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Get tasks for a specific day
router.get("/", async (req, res) => {
    try {
        const { userId, date } = req.query;
        if (!userId) return res.status(400).json({ error: "userId is required" });

        const user = await validateUser(userId);
        if (!user) return res.status(401).json({ error: "Invalid userId" });

        const query = { userId: user.id, userType: user.type };
        if (date) query.date = date;

        const tasks = await Task.find(query);
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Get progress for the last N days
router.get("/progress", async (req, res) => {
    try {
        const { userId, days = 7 } = req.query;
        if (!userId) return res.status(400).json({ error: "userId is required" });

        const user = await validateUser(userId);
        if (!user) return res.status(401).json({ error: "Invalid userId" });

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(days));

        const progress = await Task.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(user.id), // Fixed ObjectId instantiation
                    userType: user.type,
                    createdAt: { $gte: startDate },
                },
            },
            {
                $group: {
                    _id: "$date",
                    totalTasks: { $sum: 1 },
                    completedTasks: {
                        $sum: { $cond: [{ $eq: ["$completed", true] }, 1, 0] },
                    },
                },
            },
            {
                $project: {
                    date: "$_id",
                    percentage: {
                        $cond: [
                            { $eq: ["$totalTasks", 0] }, // Handle division by zero
                            0,
                            {
                                $multiply: [
                                    { $divide: ["$completedTasks", "$totalTasks"] },
                                    100,
                                ],
                            },
                        ],
                    },
                },
            },
            { $sort: { date: 1 } },
        ]);

        res.json(progress);
    } catch (error) {
        console.error("Error fetching progress:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;