const Employer = require("../models/Employer");
const Jobs = require("../models/Jobs");
exports.getAllJobs = async (req, res) => {
    try {
        // Retrieve all employers along with their job postings
        const employers = await Employer.find().select("jobs"); // Only retrieve the 'jobs' field

        if (!employers) {
            return res.status(404).json({ message: "No jobs found" });
        }

        // Collect all jobs from all employers
        const allJobs = employers.flatMap(employer => employer.jobs);

        // Return the jobs
        res.status(200).json({ jobs: allJobs });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getjobs = async (req, res) => {
    try {
        const { jobId } = req.params;

        // Retrieve the employer by ID and include their jobs
        const employer = await Employer.findOne({ 'jobs._id': jobId }).select('jobs');

        if (!employer) {
            return res.status(404).json({ message: "Employer or job not found" });
        }

        // Find the job within the employer's jobs list
        const job = employer.jobs.find(job => job._id.toString() === jobId);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Return the employer's ID, job details, and employee details
        res.status(200).json({
            status: "success",
            job: {
                employerId: employer._id,
                job
            }
        });

    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


//                      Job applicants
exports.applyJob = async (req, res) => {
    const { jobId, userId } = req.body;

    try {
        let jobApplication = await Jobs.findOne({ jobId });

        if (!jobApplication) {
            const employer = await Employer.findOne({ 'jobs._id': jobId });
            if (!employer) {
                return res.status(404).json({ message: "Employer or job not found" });
            }

            jobApplication = new Jobs({
                jobId,
                employerId: employer._id,
                applicants: [{ user: userId, status: 'Pending' }],
            });
        } else {
            const alreadyApplied = jobApplication.applicants.find(app => app.user.toString() === userId);
            if (alreadyApplied) {
                return res.status(400).json({ message: "User already applied for this job" });
            }

            jobApplication.applicants.push({ user: userId, status: 'Pending' });
        }

        await jobApplication.save();
        res.status(200).json({ message: "Application submitted successfully" });

    } catch (error) {
        console.error("Error applying to job:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.getApplicants = async (req, res) => {
    const { jobId } = req.params;

    try {
        const jobApplication = await Jobs.findOne({ jobId }).populate('applicants.user');

        if (!jobApplication || jobApplication.applicants.length === 0) {
            return res.status(404).json({ message: "No applications found for this job" });
        }

        const applicantsWithStatus = jobApplication.applicants.map(app => ({
            user: app.user,
            status: app.status
        }));

        res.status(200).json({ applicants: applicantsWithStatus });

    } catch (error) {
        console.error("Error fetching applicants:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getUserAppliedJobs = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find jobs where this user is in the applicants array
        const appliedJobs = await Jobs.find({ 'applicants.user': userId });

        if (!appliedJobs || appliedJobs.length === 0) {
            return res.status(404).json({ message: "No applied jobs found for this user" });
        }

        const detailedJobs = await Promise.all(
            appliedJobs.map(async (job) => {
                const employer = await Employer.findOne({ 'jobs._id': job.jobId }, { companyName: 1, jobs: 1 });
                const jobDetails = employer?.jobs?.find(j => j._id.toString() === job.jobId.toString());

                const applicant = job.applicants.find(a => a.user.toString() === userId);
                const status = applicant?.status || 'Pending';

                return {
                    jobId: job.jobId,
                    employerId: employer?._id,
                    companyName: employer?.companyName,
                    jobDetails,
                    status,
                };
            })
        );

        res.status(200).json({ appliedJobs: detailedJobs });

    } catch (error) {
        console.error("Error fetching user's applied jobs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



exports.getEmployerAppliedJobs = async (req, res) => {
    const { empId } = req.params;

    try {
        // Find all Jobs records that belong to this employer
        const employerJobs = await Jobs.find({ employerId: empId }).populate('applicants.user');

        if (!employerJobs || employerJobs.length === 0) {
            return res.status(404).json({ message: "No job applications found for this employer" });
        }

        const detailedJobs = await Promise.all(
            employerJobs.map(async (job) => {
                const employer = await Employer.findOne(
                    { _id: empId, 'jobs._id': job.jobId },
                    { companyName: 1, jobs: 1 }
                );

                const jobDetails = employer?.jobs?.find(j => j._id.toString() === job.jobId.toString());

                return {
                    jobId: job.jobId,
                    jobDetails,
                    companyName: employer?.companyName,
                    applicants: job.applicants.map(app => ({
                        user: app.user,
                        status: app.status
                    }))
                };
            })
        );

        res.status(200).json({ jobs: detailedJobs });

    } catch (error) {
        console.error("Error fetching employer's job applications:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.updateEmployeeStatus = async (req, res) => {
    const { applicantId, jobId, status } = req.body;

    // Validate the input
    if (!employeeId || !jobId || !status || !employeeId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Ensure the status is one of the valid ones
    const validStatuses = ['Pending', 'Hired', 'Rejected'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        // Find the job by jobId
        const job = await Jobs.findOne({ jobId: jobId });

        // If job not found, return error
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Find the applicant who matches both userId and employeeId
        const applicant = job.applicants.find(applicant =>
            applicant._id.toString() === employeeId
        );

        if (!applicant) {
            return res.status(404).json({ message: 'Applicant not found for this job' });
        }

        // Update the applicant's status
        applicant.status = status;

        // Save the updated job document
        await job.save();

        // Respond with success
        return res.status(200).json({
            message: 'Employee status updated successfully',
            job: job,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};