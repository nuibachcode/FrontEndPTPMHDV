// src/layouts/AdminLayout.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Thay bằng logo thật của bạn
import logo from "../assets/images/logo.png";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminName, setAdminName] = useState("Quản trị viên");

  // Lấy tên Admin từ localStorage khi component load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAdminName(user.fullName || "Quản trị viên");
    }
  }, []);

  // Hàm xử lý đăng xuất chuẩn chỉnh
  const handleLogout = () => {
    const confirm = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (confirm) {
      // 1. Xóa sạch bộ nhớ
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // 2. Đá về trang login
      navigate("/");
    }
  };

  // Style chung cho Nav Link
  const navLinkStyle =
    "nav-link text-dark d-flex align-items-center gap-2 px-3 py-2 rounded-2 transition-all mb-1";

  // Style cho tab đang active
  const activeStyle = {
    backgroundColor: "rgba(255, 193, 7, 0.2)", // Màu nền vàng nhạt
    color: "#d97706", // Màu chữ cam đậm
    fontWeight: "600",
    borderLeft: "4px solid #d97706",
  };

  // Hàm kiểm tra link active
  const getNavLinkProps = (path) => {
    // Active khi đường dẫn bắt đầu bằng path (để active cả trang con)
    const isActive =
      location.pathname === path || location.pathname.startsWith(path + "/");
    return {
      className: `${navLinkStyle} ${isActive ? "" : "hover-bg-light"}`,
      style: isActive ? activeStyle : {},
    };
  };

  return (
    <div className="d-flex vh-100 bg-light overflow-hidden">
      {/* --- SIDEBAR --- */}
      <div
        className="d-flex flex-column flex-shrink-0 bg-white shadow-sm"
        style={{ width: "260px", zIndex: 100 }}
      >
        {/* Logo Area */}
        <div className="p-4 text-center border-bottom">
          <img
            src={logo}
            alt="Logo"
            className="mb-2"
            style={{ width: "60px", height: "60px", cursor: "pointer" }}
            onClick={() => navigate("/admin")}
          />
          <h6 className="fw-bold text-uppercase text-primary m-0 ls-1">
            ADMIN
          </h6>
        </div>

        {/* Menu Items */}
        <div className="overflow-auto flex-grow-1 p-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/admin" {...getNavLinkProps("/admin")}>
                <i className="bi bi-grid-1x2-fill fs-5"></i>
                Dashboard
              </Link>
            </li>

            <div
              className="text-uppercase text-muted small fw-bold mt-3 mb-2 ps-3"
              style={{ fontSize: "0.75rem" }}
            >
              Quản lý hệ thống
            </div>

            <li className="nav-item">
              <Link to="/admin/users" {...getNavLinkProps("/admin/users")}>
                <i className="bi bi-people-fill fs-5"></i>
                Người dùng (Users)
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/doctors" {...getNavLinkProps("/admin/doctors")}>
                <i className="bi bi-person-video2 fs-5"></i>
                Đội ngũ Bác sĩ
              </Link>
            </li>

            <div
              className="text-uppercase text-muted small fw-bold mt-3 mb-2 ps-3"
              style={{ fontSize: "0.75rem" }}
            >
              Dịch vụ & Lịch hẹn
            </div>

            <li className="nav-item">
              <Link
                to="/admin/services"
                {...getNavLinkProps("/admin/services")}
              >
                <i className="bi bi-hdd-stack-fill fs-5"></i>
                Dịch vụ khám
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/specialties"
                {...getNavLinkProps("/admin/specialties")}
              >
                <i className="bi bi-hdd-stack-fill fs-5"></i>
                Chuyên khoa
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/booking" {...getNavLinkProps("/admin/booking")}>
                <i className="bi bi-calendar-check-fill fs-5"></i>
                Quản lý Lịch hẹn
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/reports" {...getNavLinkProps("/admin/reports")}>
                <i className="bi bi-bar-chart-line-fill fs-5"></i>
                Báo cáo thống kê
              </Link>
            </li>
          </ul>
        </div>

        {/* Footer Sidebar */}
        <div className="p-3 border-top text-center">
          <div className="d-grid">
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center gap-2"
            >
              <i className="bi bi-box-arrow-right"></i> Đăng xuất
            </button>
          </div>
          <div className="mt-2 text-muted small" style={{ fontSize: "0.7rem" }}>
            Version 1.0.0
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* Header */}
        <header
          className="bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center shadow-sm"
          style={{ height: "70px" }}
        >
          <h5 className="m-0 fw-bold text-secondary">
            {/* Hiển thị tiêu đề trang động dựa trên path (Optional) */}
            Quản Trị Hệ Thống
          </h5>

          <div className="d-flex align-items-center gap-3">
            <div className="text-end d-none d-md-block">
              <div className="fw-bold text-dark">{adminName}</div>
              <div
                className="text-success small"
                style={{ fontSize: "0.75rem" }}
              >
                ● Online
              </div>
            </div>
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
              style={{ width: "40px", height: "40px" }}
            >
              {adminName.charAt(0)}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-grow-1 p-4 overflow-auto bg-light">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
