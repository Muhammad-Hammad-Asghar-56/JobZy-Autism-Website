const express = require("express");
const router = express.Router();
const {
    registerEmployer,
    loginEmployer,
    updateEmployerField,
    getEmployer,
} = require("../controllers/employerController");

// Register a new employer
router.post("/register", registerEmployer);

// Login an employer
router.post("/login", loginEmployer);

// Update employer fields (e.g., job posting)
router.put("/", updateEmployerField);
router.get("/:id", getEmployer);

module.exports = router;
