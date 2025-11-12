import React from "react";
import { Link } from "react-router-dom";
import "./404Page.css";

const NotFoundPage = () => {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100 not-found-container">
      {/* Số 404 với style viền */}
      <h1 className="text-404">404</h1>

      {/* Text "Page not found" */}
      <h2 className="text-white mb-4">Page not found</h2>

      {/* Nút "Home" */}
      <div className="d-flex justify-content-center mt-3">
        <Link
          to="/"
          className="btn text-white shadow w-auto px-4"
          style={{
            background: "linear-gradient(135deg, #00aaff, #0cbe44ff)",
            borderRadius: "50px",
            padding: "10px",
          }}
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
