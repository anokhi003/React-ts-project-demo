import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("userToken");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // If no token, redirect to login, preserving the attempted path
      navigate("/login", { replace: true });
    }
    // else do not navigate away from the protected route
  }, [token, navigate, location]);

  // Optionally, you can render null or a loader while redirecting
  if (!token) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
