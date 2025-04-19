import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import GeneralUserRegister from "./pages/Auth/GeneralUserRegister";
import EmployerRegister from "./pages/Auth/EmployerRegister";
import Login from "./pages/Auth/Login";
import { useSelector } from "react-redux";
import UserProfile from "./pages/UserProfile";
import AuthWrapper from "./pages/Auth/AuthWrapper";
import GeneralUserExperience from "./pages/GeneralUserExperience";
import StrengthTest from "./pages/StrengthTest";
import EmployerProfile from "./pages/EmployerProfile";
import AddJob from "./pages/AddJob";
import BrowseJobs from "./pages/BrowseJobs";
import ApplyJob from "./pages/ApplyJob";
import UserAppliedJobList from "./pages/UserAppliedJobList";
import EmployerApplications from "./pages/EmployerApplications";
import LearnTest from "./pages/LearnTest";
import Test from "./pages/Test";
import AboutAutism from "./pages/AboutAutism";
import DailyTask from "./pages/DailyTask";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const { user } = useSelector((state) => state.user);

  const checkUser = (user) => {
    return user?.userType === "GeneralUser" ? (
      <UserProfile />
    ) : (
      <EmployerProfile />
    );
  };

  return (
    <Router>
      <div className="flex w-screen h-screen">
        <div
          className={`flex w-full flex-col transition-all duration-300 ease-in-out`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/aboutus" element={<AboutPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup-user" element={<GeneralUserRegister />} />
            <Route path="/signup-employer" element={<EmployerRegister />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/Learn-autism" element={<AboutAutism />}></Route>
            <Route path="/jobs/:searchedJob?" element={<BrowseJobs />} />

            {/* Protected route using AuthWrapper */}
            <Route
              path="/me"
              element={<AuthWrapper>{checkUser(user)} </AuthWrapper>}
            />
            <Route
              path="/me/experience"
              element={
                <AuthWrapper>
                  <GeneralUserExperience />
                </AuthWrapper>
              }
            />
            <Route
              path="/me/test-strength"
              element={
                <AuthWrapper>
                  <StrengthTest />
                </AuthWrapper>
              }
            />
            <Route
              path="/me/post-job"
              element={
                <AuthWrapper>
                  <AddJob />
                </AuthWrapper>
              }
            />
            <Route
              path="/dailyTask"
              element={
                <AuthWrapper>
                  <DailyTask />
                </AuthWrapper>
              }
            />

            {/*  User: Apply for a job */}
            <Route
              path="/apply-job/:jobId"
              element={
                <AuthWrapper>
                  <ApplyJob />
                </AuthWrapper>
              }
            />
            <Route
              path="/list-applied-jobs"
              element={
                <AuthWrapper>
                  <UserAppliedJobList />
                </AuthWrapper>
              }
            />

            <Route
              path="/employer/applications"
              element={
                <AuthWrapper>
                  <EmployerApplications />
                </AuthWrapper>
              }
            />
            <Route
              path="/employer/test-information"
              element={
                <AuthWrapper>
                  <LearnTest />
                </AuthWrapper>
              }
            />
            <Route
              path="/employer/start-test"
              element={
                <AuthWrapper>
                  <Test />
                </AuthWrapper>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
