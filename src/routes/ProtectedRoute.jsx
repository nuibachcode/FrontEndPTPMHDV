import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Hàm giả định để lấy thông tin xác thực và vai trò của người dùng
// THAY THẾ BẰNG LOGIC THỰC TẾ (ví dụ: lấy từ Context API, Redux hoặc localStorage)
const useAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Nếu có user, coi như đã đăng nhập
  const isAuthenticated = !!user;
  // Lấy RoleName (ví dụ: 'patient', 'doctor', 'admin') và chuyển về chữ thường để so sánh
  const role = user ? user.roleName.toLowerCase() : null;

  return { isAuthenticated, role };
};

const ProtectedRoute = ({ children, route }) => {
  const { isAuthenticated, role } = useAuth();

  // Lấy yêu cầu từ cấu hình route (ví dụ: isPrivate: true, roles: ['admin'])
  const isPrivate = route.isPrivate;
  const requiredRoles = route.roles;

  // --- 1. KIỂM TRA ĐĂNG NHẬP (Authentication) ---

  if (isPrivate && !isAuthenticated) {
    // Nếu trang là riêng tư và chưa đăng nhập, chuyển hướng đến trang Login
    return <Navigate to="/account/login" replace />;
  }

  // --- 2. KIỂM TRA PHÂN QUYỀN (Authorization) ---

  if (isAuthenticated && requiredRoles && requiredRoles.length > 0) {
    // Nếu đã đăng nhập và route yêu cầu roles cụ thể

    if (!role || !requiredRoles.includes(role)) {
      // Nếu vai trò của người dùng không khớp với bất kỳ vai trò nào được yêu cầu

      // Tùy chọn: Chuyển hướng đến trang báo lỗi 403 (Truy cập bị từ chối) hoặc Trang chủ
      return <Navigate to="/" replace />;
    }
  }

  // Nếu người dùng đã đăng nhập và có quyền, hiển thị nội dung trang con
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
