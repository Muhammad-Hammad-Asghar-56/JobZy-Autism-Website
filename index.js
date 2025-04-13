const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");

// Import routes
const userRoutes = require("./routes/userRoutes");
const jobsRoutes = require("./routes/jobsRoutes");
const employerRoutes = require("./routes/employerRoutes");
const taskRoutes = require("./routes/taskRoutes");
// Initialize express app
const app = express();

// Load environment variables
dotenv.config();

// CORS options
const corsOptions = {
    origin: "http://localhost:5173", // Allow the frontend to make requests
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies to be sent
};

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions)); // Apply CORS middleware

// Session setup
app.use(
    session({
        secret: process.env.SESSION_SECRET || "your_secret_key", // Set your session secret
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // For development, set secure to false (for production, use true with HTTPS)
    })
);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/employer", employerRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/tasks/", taskRoutes)
// Test Route
app.get('/', (req, res) => {
    res.send('API is working');
});

// Optional: Dummy test route
app.post('/api/echo', (req, res) => {
    res.status(200).json({ youSent: req.body });
});

// Only start the server when this file is run directly, not when it's imported in tests
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export app for testing
module.exports = app;
