const express = require("express");
const { getAllJobs, getjobs, applyJob, getApplicants, getUserAppliedJobs, getEmployerAppliedJobs, updateEmployeeStatus } = require("../controllers/jobsController");
const { updateEmployerField } = require("../controllers/employerController");

const router = express.Router(); // Ensure we are creating an instance of the router

// User registration and login
router.get("/", getAllJobs);
router.get("/:jobId", getjobs);

//      Job Apply
router.post("/applyJob/", applyJob);
router.get("/getJobApplicants/:jobId", getApplicants);
router.get("/getJobApplicants/user/:userId", getUserAppliedJobs);
router.get("/getJobApplicants/employer/:empId", getEmployerAppliedJobs);
router.put("/udpateEmployeeStatus/", updateEmployeeStatus);
module.exports = router; // Exporting the router, not an object
