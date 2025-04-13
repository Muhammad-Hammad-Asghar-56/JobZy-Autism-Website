import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header"; // Import Header
import Footer from "../components/Footer";
import ProfileHeader from "../components/ProfileHeader";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import UserApi from "../api/user";
import { setUser } from "../redux/reducers/userSlice";

const WorkExperienceCard = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Manage "Show More"/"Show Less" state
  const maxDescriptionLength = 210; // Max characters to display

  // Truncate the description to the desired length
  const truncatedDescription =
    job.description.length > maxDescriptionLength
      ? job.description.substring(0, maxDescriptionLength) + "..."
      : job.description;

  // Toggle the description visibility
  const toggleDescription = () => setIsExpanded(!isExpanded);

  return (
    <div className="border px-4 mt-2 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center">
          <span className="text-xl font-semibold mb-2 mr-2">
            {job.jobTitle}
          </span>
          <span className="flex items-center">
            <CiLocationOn />
            {job.location}
          </span>
        </div>
        <p className="text-gray-500">
          {new Date(job.startDate).toLocaleDateString()} -{" "}
          {new Date(job.endDate).toLocaleDateString()}
        </p>
      </div>
      <p className="text-gray-500">{job.companyName}</p>

      {/* Show More / Show Less Button */}
      <div>
        <span className="text-gray-600">
          {isExpanded ? job.description : truncatedDescription}
        </span>
        <span
          onClick={toggleDescription}
          className="text-blue-500 hover:underline mt-2">
          {isExpanded ? "  Show Less" : "  Show More"}
        </span>
      </div>
    </div>
  );
};
const renderProgressBar = (score) => {
  const percentage = score * 10; // Scale from 0-10 to 0-100
  return (
    <div className="bg-gray-300 w-full h-3 rounded-full mt-2">
      <div
        className="bg-blue-500 h-full rounded-full"
        style={{ width: `${percentage}%` }}></div>
    </div>
  );
};
// User Profile Component
const UserProfile = () => {
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
      setNewSkill(""); // Clear the input field after adding the skill
      const updatedUser = await UserApi.updateUserObj("skills", updatedSkills);
      dispatch(setUser(updatedUser));
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Header */}
      <Header />

      {/* Profile Content */}
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg mt-24">
        <ProfileHeader
          name={`${user.firstName} ${user.lastName}`}
          address={user.country}
        />
        <div className="flex flex-col sm:flex-row gap-10">
          <div className="w-full">
            {/* Bio Section */}
            <div className="mb-6 text-justify">
              <h2 className="text-xl font-semibold">Bio</h2>
              <p className="text-gray-600 mt-2">{user.additionalInfo}</p>
            </div>

            {/* Work History Section */}
            <div className="mb-6">
              <div className="flex flex-row justify-between">
                <h2 className="text-xl font-semibold">Work History</h2>
                <IoAddCircleOutline
                  onClick={() => {
                    navigate("/me/experience");
                  }}
                  size={30}
                />
              </div>
              <div className="mt-2">
                {user.workExperience?.map((job, index) => (
                  <WorkExperienceCard key={index} job={job} />
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div className="mb-6">
              <div className="flex flex-row justify-between items-center">
                <h2 className="text-xl font-semibold">Skills</h2>
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
                  onClick={handleAddSkill}
                  className="w-[100px] !border !border-gray-950 text-black rounded-md">
                  Add Skill
                </button>
              </div>
            </div>

            {/* Strengths and Weaknesses Section */}
            <div className="my-4">
              <div className="flex flex-row justify-between items-center">
                <h2 className="text-xl font-semibold">
                  Strengths and Weaknesses
                </h2>
                <button
                  onClick={() => navigate("/me/test-strength")}
                  className="!border !border-gray-600 !bg-black text-white px-6 py-1 rounded-md hover:bg-blue-600 transition-colors">
                  Take Test
                </button>
              </div>
              <div className="mt-2 flex flex-col gap-4">
                <div>
                  <span className="font-semibold text-xl">Strengths: </span>
                  <span>{user.strength_Weakness.strengths}</span>
                </div>
                <div>
                  <span className="font-semibold text-xl">Weaknesses: </span>
                  <span>{user.strength_Weakness.weaknesses}</span>
                </div>
              </div>
              <table className="min-w-full mt-4 table-auto border-collapse text-left">
                <thead>
                  <tr>
                    <th className="py-2 border-b">Category</th>
                    <th className="py-2 border-b">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(user.strength_Weakness.categoryAverages).map(
                    ([category, score], index) => (
                      <tr key={index} className="text-left">
                        <td className="py-2 border-b">
                          {category.replace(/([A-Z])/g, " $1")}
                        </td>
                        <td className="py-2 w-full border-b">
                          <div className="flex flex-row gap-2 ml-5">
                            {/* Custom Progress Bar */}
                            {renderProgressBar(score)}
                            <span>{score * 10}%</span>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* Contact Information */}
          <div className="mb-6 text-nowrap">
            <div className="card container flex flex-col border !border-gray-500 !shadow-lg rounded-lg py-2 px-4">
              {/* Card Title */}
              <h2 className="text-xl font-semibold text-gray-800">
                Get in touch
              </h2>

              {/* Card Content */}
              <p className="text-gray-600 mt-2">Email: {user.email}</p>
              <p className="text-gray-600 mt-2">Phone: {user.phoneNumber}</p>

              <button
                onClick={() => navigate("/cv-download")}
                className="mt-4 w-full border !border-gray-950 text-black px-6 py-3 rounded-md hover:bg-blue-600 transition-colors">
                Invite for Meeting
              </button>
              <button
                onClick={() => navigate("/cv-download")}
                className="mt-4 w-full !bg-black text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors">
                Download CV
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;
