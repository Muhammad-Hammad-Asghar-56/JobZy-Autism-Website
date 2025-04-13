const express = require("express");
const { getAllJobs, getjobs, applyJob, getApplicants, getUserAppliedJobs, getEmployerAppliedJobs } = require("../controllers/jobsController");

const router = express.Router(); // Ensure we are creating an instance of the router

// User registration and login
router.get("/", getAllJobs);
router.get("/:jobId", getjobs);

//      Job Apply
router.post("/applyJob/", applyJob);
router.get("/getJobApplicants/:jobId", getApplicants);
router.get("/getJobApplicants/user/:userId", getUserAppliedJobs);
router.get("/getJobApplicants/employer/:empId", getEmployerAppliedJobs);
module.exports = router; // Exporting the router, not an object
