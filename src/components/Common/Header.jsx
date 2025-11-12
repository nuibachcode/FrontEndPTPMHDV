import React from "react";
// Giả định bạn vẫn muốn dùng logo này
import logo from "../../assets/images/logo4.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    // Sử dụng bg-primary (Xanh dương đậm) và navbar-dark (Chữ trắng)
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg fixed-top"
      style={{ paddingTop: "0.3rem", paddingBottom: "0.3rem" }}
    >
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center py-0">
          <img
            src={logo}
            alt="SmileCare Logo"
            // Giữ nguyên kích thước logo lớn
            style={{ height: "70px", width: "auto" }}
          />
        </Link>

        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Các mục menu chi tiết */}
            <li className="nav-item">
              {/* Trang chủ: Giữ màu trắng (navbar-dark) và làm đậm hơn (fw-bold) */}
              <Link to="/" className="nav-link fw-bold text-white">
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                Về chúng tôi
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/doctor" className="nav-link">
                Bác sĩ
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/service" className="nav-link">
                Dịch vụ
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/price" className="nav-link">
                Bảng giá
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/feedback" className="nav-link">
                Đánh giá
              </Link>
            </li>

            {/* Nút Đặt lịch hẹn - Nổi bật (Ví dụ: btn-warning) */}
            <li className="nav-item ms-3">
              <Link to="/booking" className="btn btn-warning fw-bold text-dark">
                Đặt lịch hẹn
              </Link>
            </li>

            {/* Nút Đăng nhập/Tài khoản */}
            <li className="nav-item ms-2">
              <Link to="/account/login" className="btn btn-outline-light">
                Đăng nhập
              </Link>
            </li>

            {/* PHẦN USER ĐÃ ĐĂNG NHẬP (Ví dụ) */}
            {/*
            <li className="nav-item dropdown ms-2">
              <a className="nav-link dropdown-toggle btn btn-outline-light" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Tên User
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/patient/profile">Hồ sơ</Link></li>
                <li><Link className="dropdown-item" to="/patient/history">Lịch sử</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item">Đăng xuất</button></li>
              </ul>
            </li>
            */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
