import axios from "axios";
import config from "./BackendConstant";

const endpoint = `${config.BACKEND_API}/api/tasks`;
axios.defaults.withCredentials = true; // Keep for compatibility, though not strictly needed

const TaskApi = {
    addTask: async (userId, text) => {
        try {
            const response = await axios.post(endpoint, { userId, text });
            return response.data;
        } catch (error) {
            console.error("Error adding task:", error);
            throw error.response?.data?.error || "Failed to add task";
        }
    },
    getTasks: async (userId, date) => {
        try {
            const response = await axios.get(endpoint, {
                params: { userId, date },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching tasks:", error);
            throw error.response?.data?.error || "Failed to fetch tasks";
        }
    },
    toggleTask: async (userId, id) => {
        try {
            const response = await axios.patch(`${endpoint}/${id}`, { userId });
            return response.data;
        } catch (error) {
            console.error("Error toggling task:", error);
            throw error.response?.data?.error || "Failed to toggle task";
        }
    },
    deleteTask: async (userId, id) => {
        try {
            const response = await axios.delete(`${endpoint}/${id}`, {
                data: { userId }, // Send userId in body for DELETE
            });
            return response.data;
        } catch (error) {
            console.error("Error deleting task:", error);
            throw error.response?.data?.error || "Failed to delete task";
        }
    },
    getProgress: async (userId, days = 7) => {
        try {
            const response = await axios.get(`${config.BACKEND_API}/api/tasks/progress`, {
                params: { userId, days },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching progress:", error);
            throw error.response?.data?.error || "Failed to fetch progress";
        }
    },
};

export default TaskApi;