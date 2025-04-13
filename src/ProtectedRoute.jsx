import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { auth } = useSelector((state) => state.user); // Access the auth field from Redux state

  if (!auth) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children (the protected route)
  return children;
};

export default ProtectedRoute;
