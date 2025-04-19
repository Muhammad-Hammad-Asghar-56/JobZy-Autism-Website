// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { Header } from "../components/Header"; // Import Header
// import Footer from "../components/Footer";
// import ComboBox from "../components/ComboBox"; // Assuming ComboBox component
// import InputField from "../components/InputField"; // Assuming ComboBox component
// import JobsApi from "../api/JobsApi"; // Import JobsApi to fetch job listings

// const BrowseJobs = () => {
//   const { user } = useSelector((state) => state.user); // Get user data from Redux
//   const { searchedJob } = useParams();

//   // State for storing job postings
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [filters, setFilters] = useState({
//     jobType: "",
//     location: "",
//   });

//   // Fetch jobs when the component loads
//   useEffect(() => {
//     const getJobs = async () => {
//       const jobsData = await JobsApi.getJobs();
//       setJobs(jobsData); // Set the fetched jobs into the state
//       setFilteredJobs(jobsData); // Initially show all jobs
//     };
//     getJobs();
//   }, []);

//   // Handle filter change
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   // Filter jobs based on selected filters
//   useEffect(() => {
//     const filtered = jobs.filter((job) => {
//       const matchesJobType = filters.jobType
//         ? job.jobType === filters.jobType
//         : true;
//       const matchesLocation = filters.location
//         ? job.location.includes(filters.location)
//         : true;
//       return matchesJobType && matchesLocation;
//     });
//     setFilteredJobs(filtered);
//   }, [filters, jobs]);

//   return (
//     <div className="relative min-h-screen flex flex-col">
//       {" "}
//       {/* This ensures footer sticks to the bottom */}
//       {/* Header */}
//       <Header />
//       {/* Profile Content */}
//       <div className="max-w-[1200px] w-full mx-auto bg-white rounded-lg mt-20 p-6 flex-1">
//         <div className="flex gap-10 flex-col sm:flex-row">
//           {/* Filters Sidebar */}
//           <div className="">
//             <div className="min-w-fit bg-light-gray p-4 !border !border-gray-300 rounded-lg shadow-lg">
//               <h2 className="text-xl font-semibold mb-4">Filters</h2>

//               {/* Job Type Filter */}
//               <ComboBox
//                 label="Job Type"
//                 name="jobType"
//                 value={filters.jobType}
//                 onChange={handleFilterChange}
//                 options={[
//                   "All",
//                   "Full-time",
//                   "Part-time",
//                   "Contract",
//                   "Internship",
//                 ]}
//                 defaultOption="Select Job Type"
//                 bgColor="bg-white"
//               />

//               {/* Location Filter */}
//               <InputField
//                 label="Location"
//                 name="location"
//                 value={filters.location}
//                 onChange={handleFilterChange}
//                 placeholder="Cardiff, Uk"
//                 bgColor="bg-white"
//               />
//             </div>
//           </div>
//           {/* Job Listings */}
//           <div className="w-full sm:w-3/4">
//             <h2 className="text-xl font-semibold mb-4">Job Listings</h2>

//             {/* Job Cards */}
//             <div className="max-h-[400px] sm:max-h-[600px] overflow-y-scroll grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
//               {filteredJobs.map((job, index) => (
//                 <div
//                   key={index}
//                   className="!border !border-gray-300 rounded-lg p-4 shadow-md flex flex-row justify-between">
//                   <div>
//                     <h3 className="text-lg font-semibold">{job.title}</h3>
//                     <span className="text-gray-400">{job.location} </span>
//                     <p className="text-gray-600">
//                       {job.description.slice(0, 100)}...
//                     </p>

//                     <p className="text-gray-600">
//                       <strong> ${job.salary}</strong>
//                     </p>

//                     <p className="text-gray-600">
//                       <strong>Required:</strong> {job.requirements}
//                     </p>
//                   </div>
//                   <div className="flex flex-col justify-between ">
//                     <div className="bg-indigo-100 text-indigo-800 text-center text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm">
//                       {job.jobType}
//                     </div>
//                     {!user?.companyName && (
//                       <Link
//                         to={`/apply-job/${job._id}`}
//                         className="w-full !bg-black text-white font-semibold py-3 px-2 rounded-md mt-6">
//                         Apply now
//                       </Link>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default BrowseJobs;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import ComboBox from "../components/ComboBox";
import InputField from "../components/InputField";
import JobsApi from "../api/JobsApi";

const BrowseJobs = () => {
  const { user } = useSelector((state) => state.user);
  const { searchedJob } = useParams();
  const navigate = useNavigate();

  // State for storing job postings
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    jobType: "",
    location: "",
  });

  // Fetch jobs when the component loads
  useEffect(() => {
    const getJobs = async () => {
      try {
        const jobsData = await JobsApi.getJobs();
        setJobs(jobsData);
        setFilteredJobs(jobsData); // Initially show all jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setFilteredJobs([]);
      }
    };
    getJobs();
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Filter jobs based on searchedJob and filters
  useEffect(() => {
    let filtered = jobs;

    // Filter by searchedJob in title (case-insensitive)
    if (searchedJob) {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(searchedJob.toLowerCase())
      );
    }

    // Apply jobType and location filters
    filtered = filtered.filter((job) => {
      const matchesJobType = filters.jobType
        ? job.jobType === filters.jobType
        : true;
      const matchesLocation = filters.location
        ? job.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;
      return matchesJobType && matchesLocation;
    });

    setFilteredJobs(filtered);
  }, [searchedJob, filters, jobs]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <div className="max-w-[1200px] w-full mx-auto bg-white rounded-lg mt-20 p-6 flex-1">
        <div className="flex gap-10 flex-col sm:flex-row">
          {/* Filters Sidebar */}
          <div className="">
            <div className="min-w-fit bg-light-gray p-4 !border !border-gray-300 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              <ComboBox
                label="Job Type"
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                options={[
                  "All",
                  "Full-time",
                  "Part-time",
                  "Contract",
                  "Internship",
                ]}
                defaultOption="Select Job Type"
                bgColor="bg-white"
              />
              <InputField
                label="Location"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Cardiff, UK"
                bgColor="bg-white"
              />
            </div>
          </div>
          {/* Job Listings */}
          <div className="w-full sm:w-3/4">
            <h2 className="text-xl font-semibold mb-4">
              {searchedJob ? `Jobs matching "${searchedJob}"` : "Job Listings"}
            </h2>
            {filteredJobs.length === 0 ? (
              <p className="text-gray-500 text-center">
                No jobs found matching your criteria.
              </p>
            ) : (
              <div className="max-h-[400px] sm:max-h-[600px] overflow-y-scroll grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job._id}
                    className="!border !border-gray-300 rounded-lg p-4 shadow-md flex flex-row justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{job.title}</h3>
                      <span className="text-gray-400">{job.location}</span>
                      <p className="text-gray-600">
                        {job.description.slice(0, 100)}...
                      </p>
                      <p className="text-gray-600">
                        <strong>${job.salary}</strong>
                      </p>
                      <p className="text-gray-600">
                        <strong>Required:</strong> {job.requirements}
                      </p>
                    </div>
                    <div className="flex flex-col justify-between">
                      <div className="bg-indigo-100 text-indigo-800 text-center text-xs font-medium px-2.5 py-0.5 rounded-sm">
                        {job.jobType}
                      </div>
                      <Link
                        to={`/apply-job/${job._id}`}
                        className="w-full !bg-black text-white font-semibold py-3 px-2 rounded-md mt-6">
                        Apply now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrowseJobs;
