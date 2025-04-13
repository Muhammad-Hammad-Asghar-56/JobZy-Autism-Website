const express = require("express");
const { registerUser, loginUser, logoutUser, getUser, update,deleteUser } = require("../controllers/userController");
const router = express.Router(); // Ensure we are creating an instance of the router

// User registration and login
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route: Get user data
router.get("/me", getUser);
router.put("/", update);
router.delete("/", deleteUser);
// Logout route
router.post("/logout", logoutUser);

module.exports = router; // Exporting the router, not an object
