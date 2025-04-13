import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header"; // Import Header
import Footer from "../components/Footer";
import ProfileHeader from "../components/ProfileHeader";
import InputField from "../components/InputField"; // Import InputField
import ComboBox from "../components/ComboBox"; // Import ComboBox
import UserApi from "../api/user"; // API to interact with user
import { setUser } from "../redux/reducers/userSlice"; // Redux actions
import { GoPlusCircle } from "react-icons/go"; // Icon for adding job
import { IoAddCircleOutline } from "react-icons/io5";
import EmployerApi from "../api/employer";

const AddJob = () => {
  const { user } = useSelector((state) => state.user); // Get user data from Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // States for skill input and list
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState(user.skills || []);
  const [showAddSkill, setShowAddSkill] = useState(false);

  const handleAddSkill = async () => {
    if (newSkill && !skills.includes(newSkill)) {
      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);
      setNewSkill("");
    }
  };
  // State for form inputs
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    jobType: "",
    requirements: "",
  });

  // Job type options (can be dynamic based on your requirements)
  const jobTypeOptions = ["Full-time", "Part-time", "Contract", "Internship"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, location, salary, jobType, requirements } =
      formData;

    // Add job data to the user's profile
    const jobData = {
      title,
      description,
      location,
      salary,
      jobType,
      requirements,
      skills,
    };

    try {
      let jobs = [...user.jobs];
      jobs.push(jobData);
      const updatedUser = await EmployerApi.updateUserObj("jobs", jobs);

      // Dispatch the updated user data
      dispatch(setUser(updatedUser));

      // Navigate to the employer profile page after successful submission
      navigate("/me"); // Assuming "/me" is the employer profile page
    } catch (error) {
      console.error("Failed to add job:", error);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Header */}
      <Header />

      {/* Profile Content */}
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg mt-24 p-6">
        <h2 className="text-2xl font-semibold mb-6">Add New Job Posting</h2>

        <form onSubmit={handleSubmit}>
          {/* Job Title */}
          <InputField
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter job title"
            bgColor="bg-light-gray"
          />

          {/* Job Description */}
          <InputField
            label="Job Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter job description"
            bgColor="bg-light-gray"
          />

          {/* Job Location */}
          <InputField
            label="Job Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Enter job location"
            bgColor="bg-light-gray"
          />

          {/* Salary */}
          <InputField
            label="Salary"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            placeholder="Enter salary"
            bgColor="bg-light-gray"
          />

          {/* Job Type */}
          <ComboBox
            label="Job Type"
            name="jobType"
            value={formData.jobType}
            onChange={handleInputChange}
            options={jobTypeOptions}
            defaultOption="Select Job Type"
            bgColor="bg-light-gray"
          />

          {/* Job Requirements */}
          <InputField
            label="Job Requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleInputChange}
            placeholder="Enter job requirements"
            bgColor="bg-light-gray"
          />

          {/* Skills Section */}
          <div className="mb-6">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-lg text-gray-600">Required Skills</h2>
              <IoAddCircleOutline
                onClick={() => {
                  setShowAddSkill(!showAddSkill);
                }}
                size={30}
              />
            </div>
            <div className="flex flex-wrap gap-4 mt-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
            {/* Add Skill Input */}
            <div
              className={`mt-4 flex flex-row gap-2 transition-all duration-300 ease-in-out overflow-hidden ${
                showAddSkill ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
              }`}>
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="!border !border-gray-300 p-2 rounded-md w-full"
                placeholder="Enter a new skill"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="w-[100px] !border !border-gray-950 text-black rounded-md">
                Add Skill
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full !bg-black text-white font-semibold py-3 rounded-md mt-6">
            Post new Job
          </button>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AddJob;
