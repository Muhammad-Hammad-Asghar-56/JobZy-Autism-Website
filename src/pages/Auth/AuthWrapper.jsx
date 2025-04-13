import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // For navigation

const AuthWrapper = ({ children }) => {
  const { auth } = useSelector((state) => state.user); // Access the 'auth' state from Redux
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    // If the user is not authenticated, redirect them to the home page (or login page)
    if (!auth) {
      navigate("/login"); // Or navigate("/"); for home page
    }
  }, [auth, navigate]); // Only re-run effect if 'auth' state changes

  // Return the children (the wrapped component) if authenticated
  return auth ? <>{children}</> : null;
};

export default AuthWrapper;
