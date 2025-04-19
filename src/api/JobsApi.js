import axios from "axios";
import config from "./BackendConstant"; // Ensure the correct file path for BackendConstant

const endpoint = `${config.BACKEND_API}/api/jobs`;
axios.defaults.withCredentials = true;

const JobsApi = {
    getJobs: async () => {
        try {
            const response = await axios.get(endpoint); // Await the response
            return response.data.jobs; // Return the jobs data from the response
        } catch (error) {
            console.error("Error fetching jobs:", error);
            return []; // Return an empty array in case of an error
        }
    },
    getJobInfo: async (jobId) => {
        try {
            const response = await axios.get(`${endpoint}/${jobId}`); // Await the response
            if (response.data.status === "success") {
                return response.data.job; // Return the jobs data from the response
            }
            throw new Error("Error");

        } catch (error) {
            console.error("Error fetching jobs:", error);
            return []; // Return an empty array in case of an error
        }
    },
    applyJob: async (jobId, userId) => {
        try {
            const response = await axios.post(`${endpoint}/applyJob/`, {
                userId,
                jobId
            }); // Await the response
            if (response.status == 200) {
                return true; // Return the jobs data from the response
            } else if (response.message === "User already applied for this job") {
                return true;
            }
            throw new Error("Error");

        } catch (error) {
            console.error("Error fetching jobs:", error);
            return []; // Return an empty array in case of an error
        }
    },

    getUserAppliedJob: async (userId) => {
        try {
            const response = await axios.get(`${endpoint}/getJobApplicants/user/${userId}`); // Await the response
            if (response.status == 200) {
                return response.data.appliedJobs;
            }
            throw new Error("Error");

        } catch (error) {
            console.error("Error fetching jobs:", error);
            return []; // Return an empty array in case of an error
        }
    },
    getEmployersJobsApplicatants: async (userId) => {
        try {
            const response = await axios.get(`${endpoint}/getJobApplicants/employer/${userId}`); // Await the response
            if (response.status == 200) {
                return response.data.jobs;
            }
            throw new Error("Error");
        } catch (error) {

        }
    },
    updateApplicantStatus: async (userId, jobId, employeeId, status) => {
        try {
            const response = await axios.put(`${endpoint}/udpateEmployeeStatus/`, {
                userId, jobId, status, employeeId
            }); // Await the response

            if (response.status == 200) {
                return;
            }
            throw new Error("Error");
        } catch (error) {

        }
    }
};

export default JobsApi;
