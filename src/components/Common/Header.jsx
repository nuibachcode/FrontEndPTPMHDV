import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo4.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

// Màu sắc chủ đạo
const PRIMARY_COLOR = "#09b7ceff";
const HOVER_COLOR = "#15b7c9ff";
const ACTIVE_COLOR = "#512f9fc3";
const BOOKING_BUTTON_COLOR = "#6964c89a";

// Hàm giả định để kiểm tra trạng thái đăng nhập
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
  return { isAuthenticated: !!user, user };
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  // Hiệu ứng cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hàm xử lý Đăng xuất (Xóa sạch storage)
  const handleLogout = () => {
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      localStorage.removeItem("token"); // Nhớ xóa token
      navigate("/");
      window.location.reload();
    }
  };

  // Component NavItemLink
  const NavItemLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    const [isHovered, setIsHovered] = useState(false);

    const linkStyle = {
      fontWeight: isActive ? "bold" : "normal",
      color: isActive || isHovered ? ACTIVE_COLOR : "white",
      transition: "color 0.2s, border-bottom 0.2s",
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
            <NavItemLink to="/">Trang chủ</NavItemLink>
            <NavItemLink to="/about">Về chúng tôi</NavItemLink>
            <NavItemLink to="/doctors">Bác sĩ</NavItemLink>
            <NavItemLink to="/service">Dịch vụ</NavItemLink>
            <NavItemLink to="/prices">Bảng giá</NavItemLink>
            <NavItemLink to="/feedback">Đánh giá</NavItemLink>

            {/* Nút Đặt lịch hẹn */}
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

            {/* --- LOGIC HIỂN THỊ USER --- */}
            {!isAuthenticated ? (
              // 1. CHƯA ĐĂNG NHẬP
              <li className="nav-item ms-2">
                <Link to="/account/login" className="btn btn-outline-light">
                  Đăng nhập
                </Link>
              </li>
            ) : (
              // 2. ĐÃ ĐĂNG NHẬP
              <li className="nav-item ms-2 d-flex align-items-center gap-2">
                {/* CHECK ROLE: Nếu là Admin (1) hoặc Bác sĩ (2) -> Hiện nút QUẢN LÝ */}
                {user.roleId === 1 || user.roleId === 2 ? (
                  <>
                    <span className="fw-bold text-white me-2 border-end pe-3">
                      {user.roleId === 1 ? "Sếp" : "BS"} {user.fullName}
                    </span>
                    <button
                      className="btn btn-warning btn-sm fw-bold"
                      onClick={() =>
                        navigate(user.roleId === 1 ? "/admin" : "/doctor")
                      }
                    >
                      <i className="bi bi-gear-fill me-1"></i> Quản lý
                    </button>
                    <button
                      className="btn btn-danger btn-sm fw-bold"
                      onClick={handleLogout}
                    >
                      Thoát
                    </button>
                  </>
                ) : (
                  // NẾU LÀ BỆNH NHÂN (3) -> Hiện Dropdown Menu như cũ
                  <NavDropdown
                    title={
                      <span className="fw-bold" style={{ color: "#ffffffff" }}>
                        <i className="bi bi-person-circle me-1"></i>
                        {user?.fullName || user?.email || "Tài khoản"}
                      </span>
                    }
                    id="userDropdown"
                    align="end"
                    menuVariant="dark"
                    className="text-white border border-light px-2 rounded"
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
                      className="text-danger"
                    >
                      <i className="bi bi-box-arrow-right me-2"></i> Đăng xuất
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
