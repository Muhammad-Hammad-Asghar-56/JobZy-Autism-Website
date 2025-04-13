import React from "react";
import ab01 from "../assets/images/ab01.png";

const MillionOfJobs = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Left Side: Images */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          {/* Large Image */}
          <img
            src={ab01}
            alt="Professional"
            className="!w-sm max-h-sm rounded-lg shadow-lg"
          />
        </div>

        {/* Right Side: Text and List */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Millions of jobs. <br /> Find the one that’s for you.
          </h2>
          <p className="text-gray-600">
            Search all the open positions on the web. Get your own personalized
            salary estimate. Read reviews on over 30000+ companies worldwide.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center">
              <svg
                className="w-5 h-5 text-gray-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">
                Digital marketing solutions for tomorrow
              </span>
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 text-gray-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">
                Our talented & experienced marketing agency
              </span>
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 text-gray-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">
                Create your own skin to match your brand
              </span>
            </li>
          </ul>
          <button className="!bg-black text-white px-6 py-2 rounded-lg hover:!bg-gray-600 transition-colors flex items-center">
            ABOUT US
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default MillionOfJobs;
