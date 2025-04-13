const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "userType", // Dynamically reference User or Employer
    },
    userType: {
        type: String,
        required: true,
        enum: ["User", "Employer"], // Restrict to valid models
    },
    text: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    completedAt: {
        type: Date,
        default: null,
    },
    date: {
        type: String, // YYYY-MM-DD
        default: () => new Date().toISOString().split("T")[0],
    },
});

module.exports = mongoose.model("Task", taskSchema);