import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header"; // Import Header
import Footer from "../components/Footer";
import ProfileHeader from "../components/ProfileHeader";
import { setUser } from "../redux/reducers/userSlice";
import { GoPlusCircle } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import EmployerApi from "../api/employer";
const EmployerProfile = () => {
  const { user } = useSelector((state) => state.user); // Get user data from Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteJob = async (index) => {
    try {
      const updatedJobs = [...user.jobs];
      updatedJobs.splice(index, 1); // Remove the job from the list
      const updatedUser = await EmployerApi.updateUserObj("jobs", updatedJobs);
      dispatch(setUser(updatedUser)); // Update Redux store with the new job list
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  return (
    <div className="relative min-h-screen w-full">
      {/* Header */}
      <Header />

      {/* Profile Content */}
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg mt-24 p-6">
        <ProfileHeader
          name={`${user.contactName} - ${user.companyName}`}
          address={user.industry}
        />
        <div className="flex flex-row gap-10">
          <div>
            <div className="w-full">
              {/* Bio Section */}
              <div className="mb-6 text-justify">
                <h2 className="text-xl font-semibold">Bio</h2>
                <p className="text-gray-600 mt-2">{user.accommodations}</p>
              </div>
            </div>

            {/* Jobs Section */}
            <div className="mt-6">
              <div className="flex flex-row justify-between items-center">
                <h2 className="text-xl font-semibold mb-4">Jobs Posted</h2>
                <GoPlusCircle
                  size={25}
                  onClick={() =>
                    user.passedTest
                      ? navigate("/me/post-job")
                      : navigate("/employer/test-information")
                  }
                />
              </div>
              {user.jobs && user.jobs.length > 0 ? (
                <div>
                  {user.jobs.map((job, index) => (
                    <div key={index} className="border-b py-2">
                      <div className="flex flex-row justify-between">
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <MdDeleteOutline
                          className="text-red-700"
                          size={20}
                          onClick={() => deleteJob(index)}
                        />
                      </div>
                      <p className="text-gray-600 text-justify">
                        {job.description}
                      </p>
                      <p className="text-gray-600">
                        <strong>Location:</strong> {job.location}
                      </p>
                      <p className="text-gray-600">
                        <strong>Salary:</strong> {job.salary}
                      </p>
                      <p className="text-gray-600">
                        <strong>Job Type:</strong> {job.jobType}
                      </p>
                      <p className="text-gray-600">
                        <strong>Requirements:</strong> {job.requirements}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No jobs posted yet.</p>
              )}
            </div>
          </div>
          {/* Contact Information */}
          <div className="mb-6 text-nowrap">
            <div className="card container flex flex-col border !border-gray-500 !shadow-lg rounded-lg py-2 px-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Get in touch
              </h2>
              <p className="text-gray-600 mt-2">Email: {user.email}</p>
              <p className="text-gray-600 mt-2">Phone: {user.phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EmployerProfile;
