import axios from "axios";
import config from "./BackendConstant";

const endpoint = `${config.BACKEND_API}/api/users`
axios.defaults.withCredentials = true;

const UserApi = {
    // Login User API
    loginUser: async (formData) => {
        try {
            const response = await axios.post(`${endpoint}/login`, {
                email: formData.email,
                password: formData.password,
            });

            if (response.data.message === "Logged in successfully") {
                // Clear form data
                return { success: true, user: response.data.user };
            } else {
                return { success: false, message: "Failed to log in. Please check your email and password." };
            }
        } catch (error) {
            console.error("Login failed:", error);
            return { success: false, message: "An error occurred. Please try again later." };
        }
    },
    // Register User API
    registerUser: async (formData) => {
        try {
            const response = await axios.post(`${endpoint}/register`, {
                title: formData.title,
                firstName: formData.firstName,
                lastName: formData.lastName,
                position: formData.position,
                phoneNumber: formData.phoneNumber,
                additionalInfo: formData.additionalInfo,
                street: formData.street,
                zipCode: formData.zipCode,
                country: formData.country,
                email: formData.email,
                password: formData.password,
            });

            if (response.data.message === "User registered successfully") {
                return response.data.user;
            }
        } catch (error) {
            console.error("Registration failed:", error);
            return { success: false, message: "Failed to register. Please try again." };
        }
    },
    updateUserObj: async (fieldToEdit, obj, navigate) => {
        try {
            const resposne = await axios.put(`${endpoint}/`, {
                fieldToEdit,
                obj: obj
            }, {
                withCredentials: true // Ensures the cookie is sent with the request
            })
            if (resposne.status === 401) {
                navigate("/login")
            }
            if (resposne.data) {
                return resposne.data.user;
            }
        } catch (error) {
            console.error("Registration failed:", error);
            return { success: false, message: "Failed to register. Please try again." };
        }
    }
};

export default UserApi;