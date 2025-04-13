import React from "react";
import { Header } from "../components/Header";

// Import images
import backgroundImage from "../assets/images/bg.jpg";
import man_suit from "../assets/images/man-suit.jpg";
import MillionOfJobs from "../components/MillionOfJobs";
import Footer from "../components/Footer";

// Main HomePage component
const HomePage = () => {
  // Component to render the background image with overlay
  const BackgroundSection = () => (
    <div className="absolute inset-0 -z-10">
      <img
        src={backgroundImage}
        alt="Background"
        className="w-full h-full object-cover opacity-50"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
        }}
      />
      {/* Overlay to adjust background opacity */}
      <div className="absolute inset-0 bg-gray-900 opacity-10"></div>
    </div>
  );

  // Component for the hero section content (text, search, and image)
  const HeroContent = () => (
    <div className="max-w-[1200px] my-auto mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between">
      {/* Left Side: Text and Search */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-dark leading-tight">
          Find a new job and <br /> build career
        </h1>
        <p className="text-gray-100 text-lg">
          Find Jobs, Employment & Career Opportunities. Some of the companies
          we've helped recruit excellent applicants over the years.
        </p>
        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search your keywords"
            className="flex-grow px-4 py-3 text-gray-700 focus:outline-none"
          />
          <button className="!bg-black !m-2 rounded-md text-white px-6 py-3 transition-colors">
            SEARCH
          </button>
        </div>
        {/* Popular Searches */}
        <div className="text-gray-100">
          <span className="font-semibold">Popular Searches:</span> Designer,
          Developer, Web, iOS, PHP, Senior Engineer
        </div>
      </div>

      {/* Right Side: Small Image */}
      <div className="md:w-1/3 mt-8 md:mt-0 relative">
        <img
          src={man_suit}
          alt="Team meeting"
          className="w-full rounded-lg shadow-lg"
        />
      </div>
    </div>
  );

  // Component for the triangle button at the bottom
  const ScrollButton = () => (
    <button
      className="mb-8 w-12 h-12 flex items-center justify-center animate-bounce"
      onClick={() => {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
      }}>
      <svg
        className="w-8 h-8 text-white drop-shadow-md"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </button>
  );
  const BrowseByCategories = () => {
    const categories = [
      { name: "Human Resource", jobs: "90 Jobs Available" },
      { name: "It & Networking", jobs: "90 Jobs Available" },
      { name: "Sales & Marketing", jobs: "90 Jobs Available" },
      { name: "Accounting", jobs: "90 Jobs Available" },
      { name: "Delivery Boy", jobs: "90 Jobs Available" },
      { name: "Data Science", jobs: "90 Jobs Available" },
      { name: "Project Manager", jobs: "90 Jobs Available" },
      { name: "Engineering", jobs: "90 Jobs Available" },
      { name: "Help Center", jobs: "90 Jobs Available" },
      { name: "Full Stack Developer", jobs: "90 Jobs Available" },
    ];

    return (
      <section className="bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Heading and Subheading */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
            Browse by Categories
          </h2>
          <p className="text-gray-600 text-center mt-4">
            Search all the open positions on the web. Get your own personalized
            salary estimate. Read reviews on over 30000+ companies worldwide.
          </p>

          {/* Categories Grid */}
          <div className="flex flex-row flex-wrap justify-between gap-6 mt-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-blue-50 p-6 rounded-lg text-gray-800 shadow-md hover:shadow-lg transition-shadow hover:bg-black hover:text-white">
                <h3 className="text-lg font-semibold ">{category.name}</h3>
                <p className="text-gray-600 mt-1">{category.jobs}</p>
                <a
                  href="#"
                  className="text-blue-500 mt-2 inline-flex items-center hover:underline">
                  Explore Jobs
                  <svg
                    className="w-4 h-4 ml-1"
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
                </a>
              </div>
            ))}
          </div>

          {/* See More Categories Link */}
          <div className="text-center mt-8">
            <a
              href="#"
              className="text-blue-500 inline-flex items-center hover:underline">
              See More Categories
              <svg
                className="w-4 h-4 ml-1"
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
            </a>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Header */}
      <Header />

      {/* Background Section */}
      <BackgroundSection />

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-between min-h-screen">
        {/* Hero Content */}
        <HeroContent />

        {/* Scroll Button */}
        <ScrollButton />
      </div>
      <MillionOfJobs />
      <BrowseByCategories />
      <Footer />
    </div>
  );
};

export default HomePage;
