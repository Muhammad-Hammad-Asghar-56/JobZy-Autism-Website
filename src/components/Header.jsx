// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useEffect, useState, useRef } from "react";
// import logo from "../assets/images/logo.png";
// import { IoMdClose } from "react-icons/io";
// import { useSelector, useDispatch } from "react-redux";
// import MaleAvatarGif from "../assets/images/Male Avatar.gif";
// import { resetUser } from "../redux/reducers/userSlice";

// export function Header() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const { user, auth } = useSelector((state) => state.user);
//   const profileRef = useRef(null);

//   const pageTitles = {
//     "/": "Home",
//     "/jobs": "Jobs",
//     "/aboutus": "ABOUT",
//     "/learn-autism": "LEARN AUTISM",
//     "/dailyTask": "ROUTINE",
//     "/contact": "CONTACT US",
//   };

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close profile dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setIsProfileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     console.log("Logouting");
//     dispatch(resetUser());
//     setIsProfileOpen(false);
//     navigate("/login");
//   };

//   return (
//     <nav
//       className={`w-full fixed top-0 left-0 z-50 transition-colors duration-300 ${
//         isScrolled || isMenuOpen ? "bg-white shadow-md" : "bg-transparent"
//       } px-6 py-2`}>
//       <div className="flex items-center justify-between">
//         {/* Desktop Menu */}
//         <div className="max-w-[1200px] mx-auto w-full hidden py-4 md:flex justify-between items-center">
//           <div className="flex flex-row gap-2 items-center">
//             <img src={logo} width={40} alt="" />
//             <h1 className="card-title">Jobzy</h1>
//           </div>
//           <ul className="flex flex-row space-x-6">
//             {Object.entries(pageTitles).map(([path, title]) => (
//               <li key={path}>
//                 <Link
//                   to={path}
//                   className={`text-gray-700 hover:text-gray-500 no-underline ${
//                     location.pathname === path ? "font-bold" : ""
//                   }`}>
//                   {title}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//           <div className="relative" ref={profileRef}>
//             {!auth ? (
//               <button
//                 onClick={() => navigate("/login")}
//                 className={`border-2 border-black px-4 py-2 rounded ${
//                   isScrolled ? "text-gray-700" : "text-gray-200"
//                 } hover:bg-gray-100`}
//                 style={{ border: "1px solid black" }}>
//                 Login/Register
//               </button>
//             ) : (
//               <>
//                 <img
//                   src={MaleAvatarGif}
//                   alt="User Avatar"
//                   className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer"
//                   onClick={() => setIsProfileOpen(!isProfileOpen)}
//                 />
//                 {isProfileOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
//                     <Link
//                       to="/me"
//                       className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
//                       onClick={() => setIsProfileOpen(false)}>
//                       My Profile
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg">
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden flex flex-row justify-between w-full">
//           <div className="flex flex-row gap-2 items-center">
//             <img src={logo} width={40} alt="" />
//             <h1 className="card-title">Jobzy</h1>
//           </div>
//           <div className="flex items-center gap-4">
//             {auth && (
//               <div className="relative" ref={profileRef}>
//                 <img
//                   src={MaleAvatarGif}
//                   alt="User Avatar"
//                   className="w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer"
//                   onClick={() => setIsProfileOpen(!isProfileOpen)}
//                 />
//                 {isProfileOpen && (
//                   <div className="absolute right-0 top-10 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
//                     <Link
//                       to="/me"
//                       className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
//                       onClick={() => setIsProfileOpen(false)}>
//                       My Profile
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg">
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//             <button
//               className="relative w-6 h-6"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}>
//               <svg
//                 className={`w-6 h-6 absolute transition-opacity duration-300 ease-in-out ${
//                   isMenuOpen ? "opacity-0" : "opacity-100"
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//               <IoMdClose
//                 size={25}
//                 className={`absolute transition-opacity duration-300 ease-in-out ${
//                   isMenuOpen ? "opacity-100" : "opacity-0"
//                 }`}
//               />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       <div
//         className={`md:hidden fixed left-0 right-0 bg-white shadow-md transition-all duration-300 ease-in-out ${
//           isMenuOpen ? "top-14 opacity-100" : "-top-full opacity-0"
//         }`}>
//         <ul className="flex flex-col items-center py-4 px-8">
//           {Object.entries(pageTitles).map(([path, title]) => (
//             <li key={path} className="w-full">
//               <Link
//                 to={path}
//                 className={`block py-2 text-left text-gray-700 hover:text-blue-500 hover:bg-gray-100 ${
//                   location.pathname === path ? "font-bold" : ""
//                 }`}
//                 onClick={() => setIsMenuOpen(false)}>
//                 {title}
//               </Link>
//             </li>
//           ))}
//           {!auth && (
//             <li className="w-full">
//               <Link
//                 to="/login"
//                 className="block py-2 text-left text-gray-700 hover:text-blue-500 hover:bg-gray-100"
//                 onClick={() => setIsMenuOpen(false)}>
//                 Login/Register
//               </Link>
//             </li>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// }

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import logo from "../assets/images/logo.png";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import MaleAvatarGif from "../assets/images/Male Avatar.gif";
import { resetUser } from "../redux/reducers/userSlice";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, auth } = useSelector((state) => state.user);
  const desktopProfileRef = useRef(null);
  const mobileProfileRef = useRef(null);

  const pageTitles = {
    "/": "Home",
    "/jobs": "Jobs",
    "/aboutus": "ABOUT",
    "/learn-autism": "LEARN ABOUT AUTISM",
    "/dailyTask": "ROUTINE",
    "/contact": "CONTACT US",
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isDesktopClickOutside =
        desktopProfileRef.current &&
        !desktopProfileRef.current.contains(event.target);
      const isMobileClickOutside =
        mobileProfileRef.current &&
        !mobileProfileRef.current.contains(event.target);
      if (isDesktopClickOutside && isMobileClickOutside) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle logout
  const handleLogout = () => {
    console.log("Logouting");
    dispatch(resetUser());
    setIsProfileOpen(false);
    navigate("/login");
  };

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-colors duration-300 ${
        isScrolled || isMenuOpen ? "bg-white shadow-md" : "bg-transparent"
      } px-6 py-2`}>
      <div className="flex items-center justify-between">
        {/* Desktop Menu */}
        <div className="max-w-[1200px] mx-auto w-full hidden py-4 md:flex justify-between items-center">
          <div className="flex flex-row gap-2 items-center">
            <img src={logo} width={40} alt="" />
            <h1 className="card-title">SpecWorks</h1>
          </div>
          <ul className="flex flex-row space-x-6">
            {Object.entries(pageTitles).map(([path, title]) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`text-gray-700 hover:text-gray-500 no-underline ${
                    location.pathname === path ? "font-bold" : ""
                  }`}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="relative" ref={desktopProfileRef}>
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
              <>
                <img
                  src={MaleAvatarGif}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer"
                  onClick={() => {
                    console.log(
                      "Avatar clicked, toggling profile:",
                      !isProfileOpen
                    );
                    setIsProfileOpen(!isProfileOpen);
                  }}
                />
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <Link
                      to="/me"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
                      onClick={() => {
                        console.log("My Profile clicked");
                        setIsProfileOpen(false);
                      }}>
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        console.log("Logout button clicked");
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg">
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex flex-row justify-between w-full">
          <div className="flex flex-row gap-2 items-center">
            <img src={logo} width={40} alt="" />
            <h1 className="card-title">Jobzy</h1>
          </div>
          <div className="flex items-center gap-4">
            {auth && (
              <div className="relative" ref={mobileProfileRef}>
                <img
                  src={MaleAvatarGif}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer"
                  onClick={() => {
                    console.log(
                      "Mobile avatar clicked, toggling profile:",
                      !isProfileOpen
                    );
                    setIsProfileOpen(!isProfileOpen);
                  }}
                />
                {isProfileOpen && (
                  <div className="absolute right-0 top-10 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <Link
                      to="/me"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
                      onClick={() => {
                        console.log("Mobile My Profile clicked");
                        setIsProfileOpen(false);
                      }}>
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        console.log("Mobile Logout button clicked");
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
            <button
              className="relative w-6 h-6"
              onClick={() => {
                console.log("Hamburger clicked, toggling menu:", !isMenuOpen);
                setIsMenuOpen(!isMenuOpen);
              }}>
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
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden fixed left-0 right-0 bg-white shadow-md transition-all duration-300 ease-in-out ${
          isMenuOpen ? "top-14 opacity-100" : "-top-full opacity-0"
        }`}>
        <ul className="flex flex-col items-center py-4 px-8">
          {Object.entries(pageTitles).map(([path, title]) => (
            <li key={path} className="w-full">
              <Link
                to={path}
                className={`block py-2 text-left text-gray-700 hover:text-blue-500 hover:bg-gray-100 ${
                  location.pathname === path ? "font-bold" : ""
                }`}
                onClick={() => {
                  console.log(`${title} link clicked`);
                  setIsMenuOpen(false);
                }}>
                {title}
              </Link>
            </li>
          ))}
          {!auth && (
            <li className="w-full">
              <Link
                to="/login"
                className="block py-2 text-left text-gray-700 hover:text-blue-500 hover:bg-gray-100"
                onClick={() => {
                  console.log("Login/Register link clicked");
                  setIsMenuOpen(false);
                }}>
                Login/Register
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
