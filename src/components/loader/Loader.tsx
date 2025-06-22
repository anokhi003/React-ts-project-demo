import React from "react";
import "./loader.css";

interface LoaderProps {
  isAuthLoader?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isAuthLoader = false }) => {
  return (
    <div className={isAuthLoader ? "loader-container-auth" : "loader-container"}>
      <span className={isAuthLoader ? "loader-auth" : "loader"}></span>
    </div>
  );
};

export default Loader;
