import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header"; // Import Header
import Footer from "../components/Footer";
import InputField from "../components/InputField"; // Import InputField
import ComboBox from "../components/ComboBox"; // Import ComboBox
import { IoAddCircleOutline } from "react-icons/io5";
import UserApi from "../api/user";
import { setUser } from "../redux/reducers/userSlice";

// User Profile Component
const GeneralUserExperience = () => {
  const { user } = useSelector((state) => state.user); // Get user data from Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // State for work experience form
  const [workExperience, setWorkExperience] = useState({
    jobTitle: "ReactJs",
    companyName: "a",
    startDate: "2025-02",
    endDate: "2025-03",
    description: "a",
    skills: "a",
    location: "a",
    jobType: "a", // New field for job type (could be full-time, part-time, etc.)
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkExperience({
      ...workExperience,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic for submitting the work experience (could be an API call)
    const userObj = await UserApi.updateUserObj(
      "workExperience",
      workExperience,
      navigate
    );
    dispatch(setUser(userObj));
    // Reset the form after submission
    setWorkExperience({
      jobTitle: "",
      companyName: "",
      startDate: "",
      endDate: "",
      description: "",
      skills: "",
      location: "",
      jobType: "",
    });

    // Optionally, navigate to another page
    navigate("/me"); // Example navigation after submission
  };

  // Options for ComboBox (dropdown)
  const jobTypeOptions = ["Full-time", "Part-time", "Freelance", "Internship"];

  return (
    <div className="relative min-h-screen w-full">
      {/* Header */}
      <Header />

      {/* Work Experience Content */}
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg mt-24 p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Add Your Work Experience
        </h2>

        {/* Work Experience Form */}
        <form onSubmit={handleSubmit}>
          {/* Job Title Input */}
          <InputField
            label="Job Title"
            name="jobTitle"
            value={workExperience.jobTitle}
            onChange={handleInputChange}
            placeholder="Enter your job title"
            required
          />

          {/* Company Name Input */}
          <InputField
            label="Company Name"
            name="companyName"
            value={workExperience.companyName}
            onChange={handleInputChange}
            placeholder="Enter company name"
            required
          />

          {/* Start and End Date */}
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <InputField
                label="Start Date"
                name="startDate"
                value={workExperience.startDate}
                onChange={handleInputChange}
                type="month"
                required
              />
            </div>
            <div className="w-1/2">
              <InputField
                label="End Date"
                name="endDate"
                value={workExperience.endDate}
                onChange={handleInputChange}
                type="month"
                required
              />
            </div>
          </div>

          {/* Description Input */}
          <InputField
            label="Description"
            name="description"
            value={workExperience.description}
            onChange={handleInputChange}
            placeholder="Describe your role"
            required
            type="textarea"
          />

          {/* Skills Input */}
          <InputField
            label="Skills Used"
            name="skills"
            value={workExperience.skills}
            onChange={handleInputChange}
            placeholder="Skills used in this job"
            required
          />

          {/* Location Input */}
          <InputField
            label="Location"
            name="location"
            value={workExperience.location}
            onChange={handleInputChange}
            placeholder="Enter location"
            required
          />

          {/* Job Type Dropdown */}
          <ComboBox
            label="Job Type"
            name="jobType"
            value={workExperience.jobType}
            onChange={handleInputChange}
            options={jobTypeOptions}
            defaultOption="Select Job Type"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="!bg-black text-white px-6 py-3 rounded-md hover:bg-blue-600 w-full mt-4">
            Add Experience
          </button>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default GeneralUserExperience;
