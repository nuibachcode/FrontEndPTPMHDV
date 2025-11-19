import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Giả lập import logo nếu bạn chưa có file ảnh thật
// Cần phải có file này hoặc thay thế bằng component logo thật
import logo from "../assets/images/logo.png";

const DoctorLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Lấy URL hiện tại để xác định link active

  // Hàm xử lý đăng xuất/thoát khu vực
  const handleLogout = () => {
    const confirm = window.confirm(
      "Bạn có chắc chắn muốn thoát khỏi khu vực quản lý Bác sĩ?"
    );
    if (confirm) {
      // Thực hiện logic đăng xuất (xóa token/session) ở đây
      console.log("Đã đăng xuất Bác sĩ");
      navigate("/"); // Chuyển hướng về trang đăng nhập
    }
  };

  // Style chung cho Nav Link
  const navLinkStyle =
    "nav-link text-dark d-flex align-items-center gap-2 px-3 py-2 rounded-2 transition-all";

  // Style cho tab đang active
  const activeStyle = {
    backgroundColor: "rgba(0, 123, 255, 0.15)", // Nền xanh nhạt
    color: "#007bff", // Chữ màu xanh đậm hơn
    fontWeight: "600",
  };

  // Hàm kiểm tra và trả về Props (Class và Style) cho link active
  const getNavLinkProps = (path) => {
    const isActive = location.pathname === path;
    return {
      // Nếu active thì thêm class 'text-primary' để đảm bảo màu chữ là xanh đậm
      className: `${navLinkStyle} ${isActive ? "text-primary" : "text-dark"}`,
      // Áp dụng style active
      style: isActive ? activeStyle : {},
    };
  };

  return (
    <>
      <div className="d-flex vh-100 bg-light">
        {/* --- Sidebar --- */}
        <div
          className="d-flex flex-column flex-shrink-0 p-3 border-end"
          style={{
            width: "280px",
            // Sử dụng gradient nhẹ nhàng tương tự AdminLayout
            background: "linear-gradient(180deg, #e3f2fd 0%, #ffffff 100%)",
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
              // Click logo về Dashboard của Bác sĩ
              onClick={() => navigate("/doctor")}
            />
            <h6 className="fw-bold text-success m-0">
              {/* Dùng màu xanh lá cây (success) hoặc màu khác để phân biệt với Admin */}
              Xin chào, Bác sĩ
            </h6>
          </div>

          <hr className="text-secondary" />

          {/* Menu Items */}
          <ul className="nav flex-column gap-2 mb-auto">
            <li className="nav-item">
              <Link to="/doctor" {...getNavLinkProps("/doctor")}>
                <i className="bi bi-speedometer2 fs-5"></i>{" "}
                {/* Icon Dashboard */}
                Dashboard (Lịch hẹn)
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/doctor/schedule"
                {...getNavLinkProps("/doctor/schedule")}
              >
                <i className="bi bi-calendar-week fs-5"></i>{" "}
                {/* Icon Lịch làm */}
                Quản lý Lịch làm
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/doctor/patient-records"
                {...getNavLinkProps("/doctor/patient-records")}
              >
                <i className="bi bi-journal-medical fs-5"></i>{" "}
                {/* Icon Hồ sơ */}
                Hồ sơ Bệnh nhân
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/doctor/profile"
                {...getNavLinkProps("/doctor/profile")}
              >
                <i className="bi bi-person-circle fs-5"></i>{" "}
                {/* Icon Thông tin */}
                Cập nhật Thông tin
              </Link>
            </li>
          </ul>

          {/* Footer của Sidebar */}
          <div className="mt-auto text-center text-muted small">
            &copy; 2025 Nha Khoa System
          </div>
        </div>

        {/* --- Main Content Wrapper --- */}
        <div className="flex-grow-1 d-flex flex-column overflow-hidden">
          {/* Header */}
          <header className="d-flex justify-content-between align-items-center py-3 px-4 bg-white shadow-sm border-bottom">
            {/* Về trang chủ công cộng */}
            <div>
              <Link
                to="/"
                className="btn btn-light btn-sm d-flex align-items-center gap-2 text-secondary border-0"
              >
                <i className="bi bi-arrow-left"></i>
                Về trang chủ công cộng
              </Link>
            </div>

            {/* User Profile / Logout */}
            <div className="d-flex align-items-center gap-3">
              <span className="fw-semibold text-dark d-none d-md-block">
                Tài khoản Bác sĩ
              </span>
              <div className="vr h-100 mx-2"></div>
              <button
                className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2"
                onClick={handleLogout} // Gọi hàm xác nhận đăng xuất
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

export default DoctorLayout;
