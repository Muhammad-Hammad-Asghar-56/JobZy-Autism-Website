import React, { useState } from "react";
import ComboBox from "../../components/ComboBox";
import InputField from "../../components/InputField";
import EmployerApi from "../../api/employer";

const EmployerRegister = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    position: "",
    email: "",
    password: "",
    phoneNumber: "",
    industry: "",
    accommodations: "",
    termsAccepted: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    EmployerApi.registerUser(formData);
  };

  const industryOptions = [
    "Technology",
    "Healthcare",
    "Education",
    "Retail",
    "Finance",
    "Other",
  ];

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-light-gray">
      <div className="card-title flex flex-row gap-4 text-3xl mb-6">
        <p>Employer Registration</p>
      </div>
      <div className="flex flex-col md:flex-row max-w-4xl mx-auto border border-gray-500 rounded-lg shadow-lg bg-light-beige p-8">
        <div className="w-full md:w-1/2 px-6 py-2 bg-white">
          <form onSubmit={handleSubmit}>
            <InputField
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Company Name"
              bgColor="bg-light-gray"
            />
            <div className="flex space-x-4">
              <InputField
                label="Contact Name"
                name="contactName"
                value={formData.contactName}
                onChange={handleInputChange}
                placeholder="Your Name"
                bgColor="bg-light-gray"
              />
              <InputField
                label="Position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="Your Position"
                bgColor="bg-light-gray"
              />
            </div>
            <ComboBox
              label="Industry"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              options={industryOptions}
              defaultOption="Select Industry"
              bgColor="bg-light-gray"
            />
            <InputField
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              bgColor="bg-light-gray"
            />
            <InputField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              type="email"
              bgColor="bg-light-gray"
            />
            <InputField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              type="password"
              bgColor="bg-light-gray"
            />
            <InputField
              label="Accommodations for Autistic Employees"
              name="accommodations"
              value={formData.accommodations}
              onChange={handleInputChange}
              placeholder="Provide accommodations"
              bgColor="bg-light-gray"
            />
            <div className="mb-6 flex items-center text-soft-gray">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                className="h-4 w-4 text-soft-blue focus:ring-soft-blue border-gray-300 rounded"
              />
              <label className="ml-2 text-sm">
                I accept the{" "}
                <a href="#" className="underline hover:text-soft-blue">
                  Terms and Conditions
                </a>
                .
              </label>
            </div>
            <button
              type="submit"
              className="w-full !bg-black text-white font-semibold py-3 rounded-full hover:bg-light-blue transition-colors">
              Register as Employer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployerRegister;
