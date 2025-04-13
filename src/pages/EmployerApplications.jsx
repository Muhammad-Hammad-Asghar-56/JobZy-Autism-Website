import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import JobsApi from "../api/JobsApi";
import ComboBox from "../components/ComboBox";

const EmployerApplications = () => {
  const { user } = useSelector((state) => state.user);
  const [jobs, setJobs] = useState([]);
  const [expandedJob, setExpandedJob] = useState(null);
  const [visibleDropdowns, setVisibleDropdowns] = useState({});

  useEffect(() => {
    const getJobs = async () => {
      try {
        const jobsResponse = await JobsApi.getEmployersJobsApplicatants(
          user._id
        );
        setJobs([...jobsResponse, ...jobsResponse] || []);
      } catch (error) {
        console.error("Failed to fetch applied jobs:", error);
      }
    };
    getJobs();
  }, [user._id]);

  const toggleAccordion = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const toggleDropdown = (jobId) => {
    setVisibleDropdowns((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };
  const status = ["Hired", "Pending", "Rejected"];
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <div className="max-w-[1200px] w-full mx-auto bg-white  rounded-lg mt-20 p-6 flex-1">
        <h2 className="text-2xl font-semibold mb-4">Job Applicants</h2>

        {jobs.map((job) => (
          <div
            key={job.jobId}
            className="!border !border-gray-300 rounded-md mb-4">
            <button
              className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 font-semibold"
              onClick={() => toggleAccordion(job.jobId)}>
              {job.jobDetails?.title} at {job.companyName}
            </button>

            {expandedJob === job.jobId && (
              <div className="px-4 py-3">
                <p className="text-sm text-gray-700 mb-2">
                  {job.jobDetails?.description}
                </p>
                <button
                  onClick={() => toggleDropdown(job.jobId)}
                  className="text-blue-600 hover:underline text-sm mb-2">
                  {visibleDropdowns[job.jobId] ? "Hide" : "Show"} Applicants (
                  {job.applicants.length})
                </button>

                {visibleDropdowns[job.jobId] && (
                  <ul className="mt-2 space-y-3">
                    {job.applicants.map((app) => (
                      <li
                        key={app.user._id}
                        className="border p-3 rounded-md bg-gray-50">
                        <div className="flex flex-row justify-between items-center">
                          <table className="min-w-full border mt-4 text-left text-sm">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="py-2 px-4 border">Name</th>
                                <th className="py-2 px-4 border">Position</th>
                                <th className="py-2 px-4 border">Email</th>
                                <th className="py-2 px-4 border">Status</th>
                                <th className="py-2 px-4 border">
                                  Change Status
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {job.applicants.map((app) => (
                                <tr
                                  key={app.user._id}
                                  className="hover:bg-gray-50">
                                  <td className="py-2 px-4 border font-medium">
                                    {app.user.title} {app.user.firstName}{" "}
                                    {app.user.lastName}
                                  </td>
                                  <td className="py-2 px-4 border">
                                    {app.user.position}
                                  </td>
                                  <td className="py-2 px-4 border">
                                    {app.user.email}
                                  </td>
                                  <td className="py-2 px-4 border">
                                    {app.status === "Pending" && (
                                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-sm">
                                        Pending
                                      </span>
                                    )}
                                    {app.status === "Hired" && (
                                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-sm">
                                        Hired
                                      </span>
                                    )}
                                    {app.status === "Rejected" && (
                                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-sm">
                                        Rejected
                                      </span>
                                    )}
                                  </td>
                                  <td className="py-2 px-4 border">
                                    <ComboBox
                                      onChange={(e) => {
                                        // Add status change handler logic here
                                      }}
                                      options={["Pending", "Hired", "Rejected"]}
                                      customClassName="mb-0"
                                      defaultValue={app.status}
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default EmployerApplications;
