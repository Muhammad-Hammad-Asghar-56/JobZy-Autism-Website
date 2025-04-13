import React from "react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import LearnAutismContent from "../components/LearnAutismContent";

const LearnTest = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full">
      {/* Header */}
      <Header />

      {/* Content */}
      <div className="max-w-[1200px] mx-auto bg-white  rounded-lg mt-24 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Supporting Autistic Employees in the Workplace
        </h1>

        <LearnAutismContent />

        <section>
          <button
            className="w-full px-4 py-3 text-center !bg-black text-white font-semibold"
            onClick={() => navigate("/employer/start-test")}>
            Start Test
          </button>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default LearnTest;
