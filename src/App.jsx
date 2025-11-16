<<<<<<< HEAD
=======
// File: src/App.js (Hoặc App.jsx)

import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import mainRoutes from "./routes/mainRoutes"; // Import mảng routes
import adminRoutes from "./routes/adminRoutes";
>>>>>>> origin/phongdev

import React from "react"; // Cần thiết vì sử dụng React.Fragment
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import allRoutes from "./routes";
import ProtectedRoute from "./routes/ProtectedRoute";
import ScrollToTop from "./components/Common/CrollToTop";
function App() {
  return (
    <>

      <Router>
        <ScrollToTop />
        <Routes>
          {allRoutes.map((route, index) => {
            const PageComponent = route.element;
            // Nếu layout là null, sử dụng React.Fragment để không render thêm thẻ HTML
            const LayoutComponent = route.layout || React.Fragment;



            // --- 1. Xử lý các Routes yêu cầu đăng nhập/phân quyền ---
            if (route.isPrivate) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  // ProtectedRoute sẽ bao bọc cả Layout và Page Component
                  element={
                    <ProtectedRoute route={route}>
                      <LayoutComponent>
                        <PageComponent />
                      </LayoutComponent>
                    </ProtectedRoute>
                  }
                />
              );
            }

            // --- 2. Xử lý các Routes công khai (Public) ---
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <LayoutComponent>
                    <PageComponent />
                  </LayoutComponent>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </>
  );
}

export default App;
