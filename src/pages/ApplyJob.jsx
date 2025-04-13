import React, { useEffect, useState } from "react";
import JobsApi from "../api/JobsApi";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header"; // Import Header
import Footer from "../components/Footer";
import EmployerApi from "../api/employer"; // API to fetch employer details
import MaleAvatarGif from "../assets/images/Male Avatar.gif"; // Static avatar
import { useSelector } from "react-redux";

const ApplyJob = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [employer, setEmployer] = useState(null);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // Fetch the job and employer details when the jobId changes
  useEffect(() => {
    const getJobInfo = async (jobId) => {
      try {
        // Fetch job details from the API
        const jobResponse = await JobsApi.getJobInfo(jobId);
        setJob(jobResponse.job); // Store the job data in state

        // Fetch employer details using the employerId
        const employerResponse = await EmployerApi.getEmployer(
          jobResponse.employerId
        );
        setEmployer(employerResponse); // Store the employer data in state
      } catch (error) {
        console.error("Error fetching job and employer details:", error);
      }
    };
    getJobInfo(jobId); // Call the function to fetch the job and employer data
  }, [jobId]);

  // Display loading state until data is fetched
  if (!job || !employer) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading job and employer details...</p>
      </div>
    );
  }

  const handleApplyJob = async () => {
    const result = await JobsApi.applyJob(jobId, user._id);
    if (result) {
      navigate("/list-applied-jobs");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Job Details */}
      <div className="max-w-[1200px] w-full mx-auto bg-white rounded-lg mt-20 p-6 flex-1">
        <h1 className="text-3xl font-bold flex justify-between">
          <span>{job.title}</span>
          <div>
            <p>${job.salary}/-</p>
            <p className="text-sm font-normal">
              <strong> {job.jobType} </strong> - based
            </p>
          </div>
        </h1>
        <div className="mb-4">
          <span>{job.location}</span>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl ">
            <strong>Description</strong>
          </h2>
          <p className="text-gray-600 text-justify">{job.description}</p>

          <h3 className="text-lg">
            <strong>Company: </strong> {employer.companyName}
          </h3>
          <h3 className="text-lg">
            <strong>Requirements: </strong> {job.requirements}
          </h3>
        </div>
        <div className="mt-4 card !border !border-gray-300">
          <div className="flex flex-row items-center space-x-4">
            {/* Profile Avatar */}
            <img
              src={MaleAvatarGif} // Replace with actual user avatar
              alt="User Avatar"
              className="w-20 h-20 rounded-full border-4 border-white"
            />
            <div>
              {console.log(employer)}
              <h1 className="text-2xl font-bold">{employer.contactName}</h1>
              {/* Address */}
              <p className="text-lg">{employer.industry}</p>
            </div>
          </div>
          <div className="text-justify text-gray-600">
            <p>{employer.accommodations}</p>
          </div>
        </div>
        <button
          onClick={handleApplyJob}
          className="w-full !bg-black text-white font-semibold py-3 px-2 rounded-md mt-6">
          Apply Now
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ApplyJob;
