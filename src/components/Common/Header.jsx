import React, { useState, useEffect } from "react";
// Giả định bạn vẫn muốn dùng logo này
import logo from "../../assets/images/logo4.png";
import { Link, useLocation } from "react-router-dom";
import { NavDropdown } from "react-bootstrap"; // Dùng NavDropdown để có menu đẹp hơn

// Màu sắc chủ đạo (Giữ màu bạn đã cung cấp)
const PRIMARY_COLOR = "#1e8d9c";
const HOVER_COLOR = "#0f5a63"; // Xanh đậm hơn khi hover
const ACTIVE_COLOR = "#ffc107"; // Màu vàng nổi bật cho trạng thái Active/Đặt lịch

// Hàm giả định để kiểm tra trạng thái đăng nhập
const useAuth = () => {
  // Trong thực tế, hàm này gọi từ Context/Redux
  const user = JSON.parse(localStorage.getItem("user"));
  return { isAuthenticated: !!user, user };
};

export default function Header() {
  const location = useLocation();
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

  // Component nhỏ cho một mục NavLink tùy chỉnh
  const NavItemLink = ({ to, children }) => {
    const isActive =
      location.pathname === to ||
      (to === "/booking" && location.pathname.startsWith("/booking"));

    const linkStyle = {
      fontWeight: isActive ? "bold" : "normal",
      color: "white",
      transition: "0.2s",
      // Gạch chân màu vàng cho link đang active
      borderBottom: isActive
        ? `3px solid ${ACTIVE_COLOR}`
        : "3px solid transparent",
      paddingBottom: "5px",
      textDecoration: "none",
    };

    return (
      <li
        className="nav-item mx-2"
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          to={to}
          className="nav-link"
          style={linkStyle}
          // Thêm hiệu ứng hover trực tiếp
          onMouseEnter={(e) => (e.currentTarget.style.color = ACTIVE_COLOR)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
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
        // Dùng màu chủ đạo và chuyển đổi background khi cuộn
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
            {/* Các mục menu chi tiết sử dụng NavItemLink */}
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
                className="btn btn-warning fw-bold text-dark shadow-sm"
              >
                Đặt lịch hẹn
              </Link>
            </li>

            {/* Logic Đăng nhập / Hồ sơ */}
            {!isAuthenticated ? (
              <li className="nav-item ms-2">
                <Link to="/account/login" className="btn btn-outline-light">
                  Đăng nhập
                </Link>
              </li>
            ) : (
              <li className="nav-item ms-2">
                {/* Menu User đã đăng nhập */}
                <NavDropdown
                  title={`Hi, ${user.roleName.toUpperCase()}`}
                  id="userDropdown"
                  align="end"
                  menuVariant="dark" // Menu màu tối
                  style={{
                    // Áp dụng màu cho toggle button
                    color: "white",
                    borderColor: "white",
                  }}
                >
                  <NavDropdown.Item as={Link} to="/patient/profile">
                    Hồ sơ
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/patient/history">
                    Lịch sử
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={() => localStorage.removeItem("user")}
                  >
                    Đăng xuất
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
