import React from "react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import LearnAutismContent from "../components/LearnAutismContent";

const AboutAutism = () => {
  return (
    <div className="relative min-h-screen w-full">
      {/* Header */}
      <Header />

      {/* Content */}
      <div className="max-w-[1200px] mx-auto bg-white  rounded-lg mt-24 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">About Autism</h1>

        <LearnAutismContent />
      </div>

      <Footer />
    </div>
  );
};

export default AboutAutism;
