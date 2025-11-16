import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./App.css"; // Import CSS toàn cục
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
// Khởi tạo root và render component App
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* App là component gốc chứa Router */}
    <App />
  </React.StrictMode>
);
