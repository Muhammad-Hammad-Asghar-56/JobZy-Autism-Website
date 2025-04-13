import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import JobsApi from "../api/JobsApi";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
const UserAppliedJobList = () => {
  const { user } = useSelector((state) => state.user);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const jobsResponse = await JobsApi.getUserAppliedJob(user._id);
        setJobs(jobsResponse || []);
        console.log(jobsResponse.appliedJobs);
      } catch (error) {
        console.error("Failed to fetch applied jobs:", error);
      }
    };
    getJobs();
  }, [user._id]);

  return (
    <div className="relative min-h-screen flex flex-col">
      {" "}
      {/* This ensures footer sticks to the bottom */}
      {/* Header */}
      <Header />
      {/* Profile Content */}
      <div className="max-w-[1200px] w-full mx-auto bg-white rounded-lg mt-20 p-6 flex-1">
        <div className="">
          <h2 className="text-2xl font-semibold mb-4">
            Jobs You've Applied For
          </h2>
          {jobs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 border">Company</th>
                    <th className="py-2 px-4 border">Job Title</th>
                    <th className="py-2 px-4 border">Location</th>
                    <th className="py-2 px-4 border">Salary</th>
                    <th className="py-2 px-4 border">Type</th>
                    <th className="py-2 px-4 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.jobId} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border">{job.companyName}</td>
                      <td className="py-2 px-4 border">
                        {job.jobDetails?.title}
                      </td>
                      <td className="py-2 px-4 border">
                        {job.jobDetails?.location}
                      </td>
                      <td className="py-2 px-4 border">
                        ${job.jobDetails?.salary}
                      </td>
                      <td className="py-2 px-4 border">
                        {job.jobDetails?.jobType}
                      </td>
                      <td className="py-2 px-4 border">
                        {job.status === "Pending" && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm">
                            Pending
                          </span>
                        )}
                        {job.status === "Hired" && (
                          <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm">
                            Hired
                          </span>
                        )}
                        {job.status === "Rejected" && (
                          <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm">
                            Rejected
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">
              You haven't applied to any jobs yet.
            </p>
          )}
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserAppliedJobList;
