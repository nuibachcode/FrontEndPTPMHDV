// File: src/App.js (Hoặc App.jsx)

import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import mainRoutes from "./routes/mainRoutes"; // Import mảng routes

function App() {
  return (
    <>
      <Routes>
        {/* Map Main */}
        {mainRoutes.map((r, i) => (
          <Route key={i} path={r.path} element={r.element} />
        ))}
      </Routes>

      {/* config react-toastify */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}

export default App;
