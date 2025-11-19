// src/layouts/AdminLayout.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Giả lập import logo (thay thế bằng đường dẫn logo thật của bạn)
import logo from "../assets/images/logo.png";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hàm xử lý đăng xuất/thoát khu vực
  const handleLogout = () => {
    const confirm = window.confirm(
      "Bạn có chắc chắn muốn đăng xuất khỏi khu vực Quản lý?"
    );
    if (confirm) {
      // Xử lý xóa token hoặc logic đăng xuất ở đây
      console.log("Đã đăng xuất quản lý");
      navigate("/"); // Chuyển hướng về trang login
    }
  };

  // Style chung cho Nav Link
  const navLinkStyle =
    "nav-link text-dark d-flex align-items-center gap-2 px-3 py-2 rounded-2 transition-all";

  // Style cho tab đang active (Giữ nguyên màu cam/vàng để phân biệt chức năng Quản lý Kinh doanh)
  const activeStyle = {
    backgroundColor: "rgba(255, 193, 7, 0.3)", // Light warning color background
    color: "#ffc107", // Warning color text
    fontWeight: "600",
  };

  // Hàm kiểm tra và trả về Props (Class và Style) cho link active
  const getNavLinkProps = (path) => {
    const isActive = location.pathname === path;
    return {
      // Dùng text-warning cho màu chữ nổi bật khi active
      className: `${navLinkStyle} ${isActive ? "text-warning" : "text-dark"}`,
      style: isActive ? activeStyle : {},
    };
  };

  // Giả lập tên Admin
  const adminName = "Quản lý";

  return (
    <>
      <div className="d-flex vh-100 bg-light">
        {/* --- Sidebar --- */}
        <div
          className="d-flex flex-column flex-shrink-0 p-3 border-end"
          style={{
            width: "280px",
            // Gradient cam nhạt (từ giao diện Quản lý cũ)
            background: "linear-gradient(180deg, #fff3e0 0%, #ffffff 100%)",
          }}
        >
          {/* Logo Area */}
          <div className="text-center mb-4">
            <img
              src={logo}
              alt="Logo"
              className="rounded-circle shadow-sm mb-2"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                cursor: "pointer",
                border: "3px solid white",
              }}
              // Đổi đường dẫn về dashboard Admin
              onClick={() => navigate("/admin")}
            />
            <h6 className="fw-bold text-warning m-0">Xin chào, Manager</h6>
          </div>

          <hr className="text-secondary" />

          {/* Menu Items (Giữ nguyên chức năng, đổi tên đường dẫn và nhãn) */}
          <ul className="nav flex-column gap-2 mb-auto">
            <li className="nav-item">
              <Link to="/admin" {...getNavLinkProps("/admin")}>
                <i className="bi bi-graph-up-arrow fs-5"></i>
                Tổng quan & Doanh thu
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/doctors" // Đổi từ /manager/doctors
                {...getNavLinkProps("/admin/doctors")}
              >
                <i className="bi bi-people-fill fs-5"></i>
                Quản lý Bác sĩ
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/services" // Đổi từ /manager/appointments
                {...getNavLinkProps("/admin/services")}
              >
                <i className="bi bi-calendar-check fs-5"></i>
                Quản lý dịch vụ
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/reports" // Đổi từ /manager/reports
                {...getNavLinkProps("/admin/reports")}
              >
                <i className="bi bi-bar-chart-line-fill fs-5"></i>
                Báo cáo Chi tiết
              </Link>
            </li>
          </ul>

          <div className="mt-auto text-center text-muted small">
            &copy; 2025 Nha Khoa System
          </div>
        </div>

        {/* --- Main Content Wrapper --- */}
        <div className="flex-grow-1 d-flex flex-column overflow-hidden">
          {/* Header */}
          <header className="d-flex justify-content-between align-items-center py-3 px-4 bg-white shadow-sm border-bottom">
            <div></div>

            <div className="d-flex align-items-center gap-3">
              <span className="fw-semibold text-dark d-none d-md-block">
                Xin chào, {adminName}
              </span>
              <div className="vr h-100 mx-2"></div>
              <button
                className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right"></i>
                <strong>Đăng xuất</strong>
              </button>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-grow-1 p-4 overflow-auto">{children}</main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
