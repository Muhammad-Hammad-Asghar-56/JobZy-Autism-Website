import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import TaskApi from "../api/TaskApi";
import { useSelector } from "react-redux";

const ProgressBar = ({ percentage }) => {
  return (
    <div className="w-full h-6 bg-gray-300 rounded-full overflow-hidden">
      <div
        className="h-full bg-gray-600 transition-all duration-500 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

const DailyTask = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [progress, setProgress] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.user);

  // Fetch tasks and progress
  const fetchData = async () => {
    try {
      // Fetch tasks for today
      const today = new Date().toISOString().split("T")[0];
      const tasksData = await TaskApi.getTasks(user._id, today);
      setTasks(tasksData);

      // Fetch progress for last 7 days
      const progressData = await TaskApi.getProgress(user._id, 7);
      setProgress(progressData);
    } catch (error) {
      if (
        error.includes("Unauthorized") ||
        error.includes("Invalid userId") ||
        error.includes("userId is required")
      ) {
        navigate("/login");
      } else {
        setError("Failed to load tasks or progress. Please try again.");
      }
      console.error("Error fetching data:", error);
    }
  };

  // Fetch tasks and progress on mount
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchData();
  }, [navigate, user]);

  // Calculate overall progress percentage
  const overallProgress =
    progress.length > 0
      ? (
          progress.reduce((sum, p) => sum + p.percentage, 0) / progress.length
        ).toFixed(2)
      : 0;

  // Generate 7-day progress report
  const getWeeklyReport = () => {
    const report = [];
    const today = new Date("2025-04-13"); // Fixed for testing; use new Date() in production
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split("T")[0];
      const progressEntry = progress.find((p) => p.date === dateString);
      report.push({
        date: dateString,
        percentage: progressEntry ? progressEntry.percentage.toFixed(2) : 0,
      });
    }
    return report.reverse(); // Oldest to newest
  };

  const weeklyReport = getWeeklyReport();

  // Handle adding a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    try {
      const task = await TaskApi.addTask(user._id, newTask.trim());
      setTasks([...tasks, task]);
      setNewTask("");
      setError(null);
      // Refresh progress
      const progressData = await TaskApi.getProgress(user._id, 7);
      setProgress(progressData);
    } catch (error) {
      setError("Failed to add task. Please try again.");
      console.error("Error adding task:", error);
    }
  };

  // Handle toggling task completion
  const handleToggleTask = async (id) => {
    try {
      const updatedTask = await TaskApi.toggleTask(user._id, id);
      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
      setError(null);
      // Refresh progress
      const progressData = await TaskApi.getProgress(user._id, 7);
      setProgress(progressData);
    } catch (error) {
      setError("Failed to update task. Please try again.");
      console.error("Error toggling task:", error);
    }
  };

  // Handle deleting a task
  const handleDeleteTask = async (id) => {
    try {
      await TaskApi.deleteTask(user._id, id);
      setTasks(tasks.filter((task) => task._id !== id));
      setError(null);
      // Refresh progress
      const progressData = await TaskApi.getProgress(user._id, 7);
      setProgress(progressData);
    } catch (error) {
      setError("Failed to delete task. Please try again.");
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Header */}
      <Header />

      {/* Content */}
      <div
        className="max-w-[1200px] mx-auto bg-white rounded-lg mt-24 p-6"
        style={{ minHeight: "calc(100vh - 200px)" }}>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Daily Task Tracker
        </h1>
        <p className="text-gray-600 mb-8">
          Add your daily tasks, mark them as done, or remove them as needed.
          Task completion resets daily to keep your routine fresh!
        </p>

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {/* Task Input Form */}
        <form onSubmit={handleAddTask} className="mb-8 flex gap-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a task (e.g., Bicycling, Reading book)"
            className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
            Add Task
          </button>
        </form>

        {/* Task List */}
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">
            No tasks yet. Add one to get started!
          </p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task._id)}
                    className="h-5 w-5 text-blue-600 rounded"
                  />
                  <span
                    className={`text-gray-800 ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}>
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="text-red-500 hover:text-red-700 transition">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Progress Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            7-Day Task Completion
          </h2>
          {/* Overall Progress */}
          {progress.length > 0 ? (
            <div className=" mx-auto border-0 shadow-sm mb-6">
              <div className="p-4">
                <h1 className="text-gray-700 mb-3 font-semibold">
                  Overall Completion: {overallProgress}%
                </h1>
                <ProgressBar percentage={overallProgress} />
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center mb-6">
              No progress data available. Complete some tasks to see your
              progress!
            </p>
          )}

          {/* Weekly Report */}
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Daily Progress (Last 7 Days)
          </h3>
          <div className="flex flex-row gap-4 my-2 overflow-x-scroll">
            {weeklyReport.reverse().map((day) => (
              <div className="flex flex-col gap-2 shadow-md px-2 py-4 my-2">
                <span className="text-gray-700 font-medium">{day.date}</span>
                <div className="flex items-center gap-3">
                  <ProgressBar percentage={day.percentage} />
                  <span className="text-gray-600 text-sm">
                    {day.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DailyTask;
