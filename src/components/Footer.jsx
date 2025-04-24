import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png"; // Import your logo
import { useSelector } from "react-redux";

const Footer = () => {
  // Define footer links based on the sitemap
  const { user } = useSelector((state) => state.user);
  const footerLinks = {
    SpecWorks: [
      { name: "Home", path: "/" },
      { name: "About Us", path: "/aboutus" },
      { name: "Contact Us", path: "/contact" },
      { name: "Login/Sign Up", path: "/login" },
      { name: "Learn Autism", path: "/Learn-autism" },
    ],
    ...(user?.companyName
      ? {
          "For Employers": [
            { name: "Employer Dashboard", path: "/me" },
            { name: "Post a Job", path: "/me/post-job" },
            { name: "Manage Applications", path: "/employer/applications" },
            { name: "Test Information", path: "/employer/test-information" },
            { name: "Start Test", path: "/employer/start-test" },
            { name: "Autism Awareness", path: "/Learn-autism" },
          ],
        }
      : {
          "For Job Seekers": [
            { name: "Browse Jobs", path: "/jobs" },
            { name: "Applied Jobs", path: "/list-applied-jobs" },
            { name: "Daily Tasks", path: "/dailyTask" },
            { name: "Strength Test", path: "/me/test-strength" },
            { name: "Skill Development", path: "/resources" },
            { name: "User Dashboard", path: "/me" },
          ],
        }),
  };
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-[1200px] mx-auto px-6 py-8 lg:py-12">
        {/* Main Footer Content */}
        <div className="md:flex md:justify-between mb-6">
          {/* Logo and Branding */}
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="SpecWorks Logo" className="h-10 mr-3" />
              <span className="self-center text-2xl font-semibold text-white">
                SpecWorks
              </span>
            </Link>
          </div>

          {/* Footer Links */}
          <div className="w-4/6 flex flex-row justify-end">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section} className="mx-4">
                <h2 className="mb-6 text-sm font-semibold text-white uppercase">
                  {section}
                </h2>
                <ul className="space-y-3 p-0">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-gray-400 hover:text-white hover:underline">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />

        {/* Copyright and Social Media Links */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-gray-400 sm:text-center">
            © {new Date().getFullYear()}{" "}
            <Link to="/" className="hover:underline">
              SpecWorks™
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:mt-0 space-x-5">
            <a
              href=""
              className="text-gray-400 hover:text-white"
              aria-label="Facebook page">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 8 19"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href=""
              className="text-gray-400 hover:text-white"
              aria-label="Twitter page">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 17"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              hhref=""
              className="text-gray-400 hover:text-white"
              aria-label="LinkedIn page">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.027-3.063-1.854-3.063-1.854 0-2.136 1.445-2.136 2.939v5.728h-3v-11h2.893v1.504h.041c.402-.762 1.385-1.564 2.854-1.564 3.051 0 3.612 2.008 3.612 4.616v6.444z" />
              </svg>
            </a>
            <a
              href=""
              className="text-gray-400 hover:text-white"
              aria-label="GitHub account">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
