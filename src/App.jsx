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
            const LayoutComponent = route.layout || React.Fragment;

            if (route.isPrivate) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <ProtectedRoute allowedRoles={route.roles}>
                      <LayoutComponent>
                        <PageComponent />
                      </LayoutComponent>
                    </ProtectedRoute>
                  }
                />
              );
            }

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