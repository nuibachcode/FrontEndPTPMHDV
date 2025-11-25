// src/layouts/DoctorLayout.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Thay bằng logo thật của bạn
import logo from "../assets/images/logo.png";

const DoctorLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [doctorName, setDoctorName] = useState("Bác sĩ");

  // Lấy tên Bác sĩ từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setDoctorName(user.fullName || "Bác sĩ");
    }
  }, []);

  // Hàm xử lý đăng xuất chuẩn
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

  // Style cho tab đang active (Màu XANH DƯƠNG cho Bác sĩ)
  const activeStyle = {
    backgroundColor: "rgba(13, 110, 253, 0.15)", // Màu nền xanh nhạt
    color: "#0d6efd", // Màu chữ xanh đậm
    fontWeight: "600",
    borderLeft: "4px solid #0d6efd",
  };

  // Hàm kiểm tra link active
  const getNavLinkProps = (path) => {
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
            onClick={() => navigate("/doctor")}
          />
          <h6 className="fw-bold text-uppercase text-info m-0 ls-1">
            Doctor Portal
          </h6>
        </div>

        {/* Menu Items */}
        <div className="overflow-auto flex-grow-1 p-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/doctor" {...getNavLinkProps("/doctor")}>
                <i className="bi bi-speedometer2 fs-5"></i>
                Dashboard (Tổng quan)
              </Link>
            </li>

            <div
              className="text-uppercase text-muted small fw-bold mt-3 mb-2 ps-3"
              style={{ fontSize: "0.75rem" }}
            >
              Lịch trình & Khám bệnh
            </div>

            <li className="nav-item">
              <Link
                to="/doctor/schedule"
                {...getNavLinkProps("/doctor/schedule")}
              >
                <i className="bi bi-calendar-week fs-5"></i>
                Quản lý Lịch làm
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/doctor/patient-records"
                {...getNavLinkProps("/doctor/patient-records")}
              >
                <i className="bi bi-journal-medical fs-5"></i>
                Hồ sơ Bệnh nhân
              </Link>
            </li>

            <div
              className="text-uppercase text-muted small fw-bold mt-3 mb-2 ps-3"
              style={{ fontSize: "0.75rem" }}
            >
              Cá nhân
            </div>

            <li className="nav-item">
              <Link
                to="/doctor/profile"
                {...getNavLinkProps("/doctor/profile")}
              >
                <i className="bi bi-person-circle fs-5"></i>
                Thông tin cá nhân
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
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* Header */}
        <header
          className="bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center shadow-sm"
          style={{ height: "70px" }}
        >
          <div>
            <Link
              to="/"
              className="btn btn-light btn-sm text-secondary fw-semibold d-flex align-items-center gap-2"
            >
              <i className="bi bi-arrow-left"></i> Web Trang Chủ
            </Link>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="text-end d-none d-md-block">
              <div className="fw-bold text-dark">BS. {doctorName}</div>
              <div
                className="text-success small"
                style={{ fontSize: "0.75rem" }}
              >
                ● Đang làm việc
              </div>
            </div>
            <div
              className="rounded-circle bg-info text-white d-flex align-items-center justify-content-center fw-bold shadow-sm"
              style={{ width: "40px", height: "40px" }}
            >
              {doctorName.charAt(0)}
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

export default DoctorLayout;
