import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InputField from "../../components/InputField";
import UserApi from "../../api/user";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/reducers/userSlice";
import EmployerApi from "../../api/employer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dummy login logic
    const data = {
      email: formData.email,
      password: formData.password,
    };

    try {
      // Attempt to login as a user first
      let userData = await UserApi.loginUser(data);

      // If login as user fails, try to login as employer
      if (!userData.success) {
        userData = await EmployerApi.loginUser(data);
      }

      if (userData.success) {
        console.log(userData);
        dispatch(setUser(userData.user)); // Dispatch the user data to redux store
        navigate("/me"); // Navigate to the user's profile page
        setFormData({ email: "", password: "" }); // Clear the form fields after successful login
      } else {
        // Handle the case where both user and employer login fail
        alert(userData.message); // Show an error message to the user
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-light-gray">
      <div className="card-title flex flex-row gap-4 text-3xl mb-6">
        <p>Login</p>
      </div>
      <div className="flex flex-col md:flex-row max-w-4xl mx-auto border border-gray-500 rounded-lg shadow-lg bg-light-beige p-8">
        <div className="w-full md:w-1/2 px-6 py-2 bg-white">
          <form onSubmit={handleSubmit}>
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

            <button
              type="submit"
              className="w-full !bg-black text-white font-semibold py-3 rounded-full hover:bg-light-blue transition-colors">
              Login
            </button>
            <button
              onClick={() => {
                navigate("/signup-user");
              }}
              className="w-full mt-2 !border !border-gray-950 text-gray-700 font-semibold py-3 rounded-full hover:bg-light-blue transition-colors">
              Register
            </button>
            <div className="mt-4 w-full text-center">
              <Link to={"/signup-employer"} className="!text-blue-800">
                Signup as a employer
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
