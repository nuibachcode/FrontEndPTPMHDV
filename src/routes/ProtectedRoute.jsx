import React from "react";
import { Navigate } from "react-router-dom";

const useAuth = () => {
  const userString = localStorage.getItem("user");
  let user = null;
  if (userString) {
    try {
      user = JSON.parse(userString);
    } catch (e) {
      user = null;
    }
  }
  const isAuthenticated = !!user;
  const userRoleId = user ? user.roleId : null;

  return { isAuthenticated, userRoleId };
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRoleId } = useAuth();

  console.log("--- DEBUG PROTECTED ---");
  console.log("User Role:", userRoleId);
  console.log("Required Roles:", allowedRoles);

  if (!isAuthenticated) {
    return <Navigate to="/account/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(userRoleId)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
