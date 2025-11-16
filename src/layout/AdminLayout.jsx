
import { Link, useNavigate } from "react-router-dom";

// Giả lập import logo nếu bạn chưa có file ảnh thật
import logo from "../assets/images/logo.png";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    const confirm = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (confirm) {
      // Xử lý xóa token hoặc logic đăng xuất ở đây
      console.log("Đã đăng xuất");
      navigate("/login"); // Chuyển hướng về trang login
    }
  };

  // Style cho Nav Link để tái sử dụng
  const navLinkStyle =
    "nav-link text-dark d-flex align-items-center gap-2 px-3 py-2 rounded-2 transition-all";
  const activeStyle = {
    backgroundColor: "rgba(255,255,255,0.5)",
    fontWeight: "600",
  }; // Ví dụ style active

  return (
    <>
      <div className="d-flex vh-100 bg-light">
        {/* --- Sidebar --- */}
        <div
          className="d-flex flex-column flex-shrink-0 p-3 border-end"
          style={{
            width: "280px",
            background: "linear-gradient(180deg, #e3f2fd 0%, #ffffff 100%)", // Gradient xanh nhạt nhẹ nhàng hơn
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
              onClick={() => window.location.reload()}
            />
            <h6 className="fw-bold text-primary m-0">
              Xin chào, Quản trị viên
            </h6>
          </div>

          <hr className="text-secondary" />

          {/* Menu Items */}
          <ul className="nav flex-column gap-2 mb-auto">
            <li className="nav-item">
              <Link
                to="/admin/users"
                className={navLinkStyle}
                style={{ ...activeStyle }}
              >
                {/* Giả sử đây là tab đang active */}
                <i className="bi bi-people fs-5"></i>
                Quản lý người dùng
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/appointments"
                className={`${navLinkStyle} hover-bg-white`}
              >
                <i className="bi bi-calendar-check fs-5"></i>
                Quản lý lịch hẹn
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/services"
                className={`${navLinkStyle} hover-bg-white`}
              >
                <i className="bi bi-gear fs-5"></i>
                Quản lý dịch vụ
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/reports"
                className={`${navLinkStyle} hover-bg-white`}
              >
                <i className="bi bi-bar-chart fs-5"></i>
                Báo cáo & Thống kê
              </Link>
            </li>
          </ul>

          {/* Footer của Sidebar (nếu cần) */}
          <div className="mt-auto text-center text-muted small">
            &copy; 2025 Nha Khoa System
          </div>
        </div>

        {/* --- Main Content Wrapper --- */}
        <div className="flex-grow-1 d-flex flex-column overflow-hidden">
          {/* Header */}
          <header className="d-flex justify-content-between align-items-center py-3 px-4 bg-white shadow-sm border-bottom">
            {/* Breadcrumb / Back Link */}
            <div>
              <Link
                to="/"
                className="btn btn-light btn-sm d-flex align-items-center gap-2 text-secondary border-0"
              >
                <i className="bi bi-arrow-left"></i>
                Về trang chủ
              </Link>
            </div>

            {/* User Profile / Logout */}
            <div className="d-flex align-items-center gap-3">
              <span className="fw-semibold text-dark d-none d-md-block">
                Xin chào, Admin
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
>>>>>>> origin/phongdev
export default AdminLayout;
