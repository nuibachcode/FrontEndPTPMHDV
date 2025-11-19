import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo4.png";
import { Link, useLocation } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Màu sắc chủ đạo từ code của bạn
const PRIMARY_COLOR = "#09b7ceff";
const HOVER_COLOR = "#15b7c9ff";
const ACTIVE_COLOR = "#512f9fc3"; // Màu Xanh Tím cho Active/Hover
const BOOKING_BUTTON_COLOR = "#6964c89a"; // Màu Xanh Tím cho nút Đặt lịch

// Hàm giả định để kiểm tra trạng thái đăng nhập
const useAuth = () => {
  // Giả định user object có các trường: roleName, fullName, email, và id
  const user = JSON.parse(localStorage.getItem("user"));
  return { isAuthenticated: !!user, user };
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng
  const { isAuthenticated, user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  // Hiệu ứng thay đổi header khi cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hàm xử lý Đăng xuất
  const handleLogout = () => {
    // Thường thì nên dùng Context/Redux để quản lý Auth, nhưng ở đây dùng localStorage trực tiếp
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      navigate("/"); // Chuyển hướng về trang chủ
      window.location.reload(); // Reload để cập nhật Header
    }
  };

  // Component nhỏ cho một mục NavLink tùy chỉnh (Đã thêm useState cho Hover)
  const NavItemLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    const [isHovered, setIsHovered] = useState(false);

    const linkStyle = {
      fontWeight: isActive ? "bold" : "normal",
      color: isActive || isHovered ? ACTIVE_COLOR : "white", // Chữ đổi màu khi Active/Hover
      transition: "color 0.2s, border-bottom 0.2s",
      // Gạch chân màu ACTIVE_COLOR cho link đang active hoặc khi hover
      borderBottom:
        isActive || isHovered
          ? `3px solid ${ACTIVE_COLOR}`
          : "3px solid transparent",
      paddingBottom: "5px",
      textDecoration: "none",
    };

    return (
      <li
        className="nav-item mx-2"
        style={{ height: "100%", display: "flex", alignItems: "center" }}
      >
        <Link
          to={to}
          className="nav-link"
          style={linkStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {children}
        </Link>
      </li>
    );
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark shadow-lg fixed-top ${
        scrolled ? "py-1" : "py-2"
      }`}
      style={{
        backgroundColor: scrolled ? HOVER_COLOR : PRIMARY_COLOR,
        transition: "background-color 0.3s, padding 0.3s",
        minHeight: "70px",
      }}
    >
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center py-0">
          <img
            src={logo}
            alt="SmileCare Logo"
            style={{
              height: scrolled ? "50px" : "70px",
              width: "auto",
              transition: "height 0.3s",
            }}
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
            <NavItemLink to="/">Trang chủ</NavItemLink>
            <NavItemLink to="/about">Về chúng tôi</NavItemLink>
            <NavItemLink to="/doctors">Bác sĩ</NavItemLink>
            <NavItemLink to="/service">Dịch vụ</NavItemLink>
            <NavItemLink to="/prices">Bảng giá</NavItemLink>
            <NavItemLink to="/feedback">Đánh giá</NavItemLink>

            {/* Nút Đặt lịch hẹn - Luôn nổi bật */}
            <li className="nav-item ms-3">
              <Link
                to="/booking"
                className="btn fw-bold shadow-sm"
                style={{
                  backgroundColor: BOOKING_BUTTON_COLOR,
                  color: "white",
                }}
              >
                Đặt lịch hẹn
              </Link>
            </li>

            {/* LOGIC ĐĂNG NHẬP / HỒ SƠ CÁ NHÂN */}
            {!isAuthenticated ? (
              <li className="nav-item ms-2">
                <Link to="/account/login" className="btn btn-outline-light">
                  Đăng nhập
                </Link>
              </li>
            ) : (
              <li className="nav-item ms-2">
                <NavDropdown
                  // Hiển thị Tên đầy đủ hoặc Email
                  title={
                    <span className="fw-bold  " style={{ color: "#ffffffff" }}>
                      <i className="bi bi-person-circle me-1"></i>
                      {user?.fullName || user?.email || "Tài khoản"}
                    </span>
                  }
                  id="userDropdown"
                  align="end"
                  menuVariant="dark" // Menu màu tối
                  // CSS cho nút toggle, dùng màu ACTIVE_COLOR làm màu nổi bật

                  toggleClassName="text-white border border-light px-2 rounded"
                >
                  <NavDropdown.Item as={Link} to="/patient/profile">
                    <i className="bi bi-person-badge me-2"></i> Thông tin cá
                    nhân
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/patient/history">
                    <i className="bi bi-calendar-check me-2"></i> Lịch sử Đặt
                    lịch
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={handleLogout}
                    className="text-danger" // Màu đỏ cho nút Đăng xuất
                  >
                    <i className="bi bi-box-arrow-right me-2"></i> Đăng xuất
                  </NavDropdown.Item>
                </NavDropdown>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
