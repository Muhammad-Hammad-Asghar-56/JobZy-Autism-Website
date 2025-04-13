import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import MaleAvatarGif from "../assets/images/Male Avatar.gif";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, auth } = useSelector((state) => state.user);

  const pageTitles = {
    "/": "Home",
    "/jobs": "Jobs",
    "/aboutus": "ABOUT",
    "/learn-autism": "LEARN AUTISM",
    "/dailyTask": "ROUTINE",
    "/contact": "CONTACT US",
  };
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10); // Change background after scrolling 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);
  return (
    <nav
      className={`w-full  fixed top-0 left-0 z-50 transition-colors duration-300 ${
        isScrolled || isMenuOpen ? "bg-white shadow-md" : "bg-transparent"
      }  px-6 py-2`}>
      <div className="flex items-center justify-between">
        {/* Desktop Menu */}
        <div className="max-w-[1200px] mx-auto w-full hidden py-4 md:flex justify-between items-center">
          <div className="flex flex-row gap-2 items-center">
            <img src={logo} width={40} alt="" />
            <h1 className="card-title">Jobzy</h1>
          </div>
          <ul className="flex flex-row space-x-6">
            {Object.entries(pageTitles).map(([path, title]) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`text-gray-200 hover:text-gray-500 ${
                    location.pathname === path ? "font-bold" : ""
                  }`}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
          <div>
            {!auth ? (
              <button
                onClick={() => navigate("/login")}
                className={`border-2 border-black px-4 py-2 rounded ${
                  isScrolled ? "text-gray-700" : "text-gray-200"
                } hover:bg-gray-100`}
                style={{ border: "1px solid black" }}>
                Login/Register
              </button>
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => navigate("/me")} // Navigate to profile
              >
                <img
                  src={MaleAvatarGif} // Use the static avatar GIF
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-gray-300"
                />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div
          className={`md:hidden focus:outline-none flex flex-row justify-between w-full`}>
          <div className="flex flex-row gap-2 items-center">
            <img src={logo} width={40} alt="" />
            <h1 className="card-title">Jobzy</h1>
          </div>
          <button
            className="md:hidden focus:outline-none relative w-6 h-6"
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              className={`w-6 h-6 absolute transition-opacity duration-300 ease-in-out ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <IoMdClose
              size={25}
              className={`absolute transition-opacity duration-300 ease-in-out ${
                isMenuOpen ? "opacity-100" : "opacity-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden fixed left-0 right-0 bg-white shadow-md transition-all duration-300 ease-in-out ${
          isMenuOpen ? "top-15 opacity-100" : "-top-full opacity-0"
        }`}>
        <ul className="flex flex-col items-center py-4 px-8">
          {Object.entries(pageTitles).map(([path, title]) => (
            <li key={path} className="w-full">
              <Link
                to={path}
                className={`block py-2  text-left text-gray-700 hover:text-blue-500 hover:bg-gray-100 ${
                  location.pathname === path ? "font-bold" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
