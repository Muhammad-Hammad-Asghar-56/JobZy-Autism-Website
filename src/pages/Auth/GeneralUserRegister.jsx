import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import InputField from "../../components/InputField";
import ComboBox from "../../components/ComboBox";
import UserApi from "../../api/user";
import { useDispatch } from "react-redux";
const GeneralUserRegister = () => {
  const dispatch = useDispatch();
  // State to manage form data
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    position: "",
    street: "",
    additionalInfo: "",
    zipCode: "",
    place: "",
    country: "",
    phoneNumber: "",
    email: "",
    password: "",
    termsAccepted: false,
  });

  // Reusable ComboBox Component

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add your form submission logic here (e.g., API call)
    UserApi.registerUser(formData, dispatch);
  };

  // Options for dropdowns
  const titleOptions = ["Mr.", "Ms.", "Mrs.", "Dr."];
  const positionOptions = ["Developer", "Designer", "Manager", "HR", "Other"];
  const countryOptions = ["USA", "Canada", "UK", "Australia"];

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center ">
      <div className="card-title flex flex-row gap-4 text-4xl mb-6">
        {/* <img src={logo} alt="" /> */}
        <p>Register User Account</p>
      </div>
      <div className="flex flex-col md:flex-row max-w-4xl mx-auto rounded-lg shadow-lg !border-1 !border-gray-600 overflow-hidden">
        {/* General Information Section */}
        <div className="w-full md:w-1/2 bg-white p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            General Information
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Title Dropdown */}
            <ComboBox
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              options={titleOptions}
              defaultOption="Select Title"
            />
            {/* First Name and Last Name */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <InputField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                />
              </div>
              <div className="w-1/2">
                <InputField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                />
              </div>
            </div>

            {/* Position Dropdown */}
            <ComboBox
              label="Position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              options={positionOptions}
              defaultOption="Select Position"
            />
            <InputField
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
            />
            <InputField
              label="Additional Information"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              placeholder="Additional Information"
            />
          </form>
        </div>

        {/* Contact Details Section */}
        <div className="w-full md:w-1/2 bg-gray-900 text-white p-8">
          <h2 className="text-xl font-semibold mb-6">Contact Details</h2>
          <form onSubmit={handleSubmit}>
            {/* Street + Nr and Additional Information */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <InputField
                  label="Street + Nr"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  placeholder="Street + Nr"
                />
              </div>

              <div className="w-1/2">
                <InputField
                  label="Zip Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="Zip Code"
                />
              </div>
            </div>

            {/* Country */}
            <ComboBox
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              options={countryOptions}
              defaultOption="Select Country"
            />

            {/* Email */}
            <InputField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              type="email"
            />

            {/* Email */}
            <InputField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              type="password"
            />

            {/* Terms Checkbox */}
            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm">
                I do accept the{" "}
                <a href="#" className="underline hover:text-blue-300">
                  Terms and Conditions
                </a>{" "}
                of your site.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full  !text-black bg-white font-semibold py-3 rounded-full hover:bg-gray-100 transition-colors">
              Register an Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GeneralUserRegister;
