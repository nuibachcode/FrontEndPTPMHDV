import React, { useState } from "react";
// Import Link từ react-router-dom nếu bạn có ý định dùng link nội bộ
// import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'error' hoặc 'success'

  // Biểu thức chính quy đơn giản để kiểm tra định dạng email
  const validateEmail = (email) => {
    // Regex đơn giản: chứa @ và ít nhất một dấu . sau @
    const re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn form gửi đi mặc định

    if (!email) {
      // 1. Kiểm tra nếu email trống
      setMessage("❌ Vui lòng nhập địa chỉ email của bạn.");
      setMessageType("error");
      return;
    }

    if (!validateEmail(email)) {
      // 2. Kiểm tra định dạng email
      setMessage("⚠️ Email không hợp lệ. Vui lòng nhập đúng định dạng.");
      setMessageType("error");
      return;
    }

    // 3. Nếu email hợp lệ
    setMessage(`✅ Đăng ký thành công! Thông tin sẽ được gửi đến: ${email}`);
    setMessageType("success");
    setEmail(""); // Xóa email sau khi gửi thành công

    // *** Thêm logic API gửi email tại đây nếu cần ***
  };

  // Định nghĩa màu cho thông báo
  const messageColor = messageType === "success" ? "#28a745" : "#dc3545";

  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container">
        <div className="row gy-4">
          {/* Thông tin bệnh nhân */}
          <div className="col-md-3">
            <h5 className="fw-bold mb-3">Thông Tin Bệnh Nhân</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Giới Thiệu
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Lịch Sử
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Phản Hồi
                </a>
              </li>
            </ul>
          </div>

          {/* Dịch vụ */}
          <div className="col-md-3">
            <h5 className="fw-bold mb-3">Dịch Vụ</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Chăm Sóc Phòng Ngừa
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Cấy Ghép Răng
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Niềng Răng Thẩm Mỹ
                </a>
              </li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div className="col-md-3">
            <h5 className="fw-bold mb-3">Liên Hệ</h5>
            <p className="mb-1">
              Số 2, Xuân Phương, Tu Hoang, Bắc Từ Liêm. Hà Nội
            </p>
            <p className="mb-1">📞 212-000-2299</p>
            <p className="mb-0">✉️ info@smilecare.com</p>
          </div>

          {/* Đăng ký nhận tin */}
          <div className="col-md-3">
            <h5 className="fw-bold mb-3">Đăng Ký Nhận Tin</h5>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Nhập email của bạn"
                value={email} // Gán giá trị từ state
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage(""); // Xóa thông báo khi người dùng bắt đầu nhập lại
                }}
              />
              <button type="submit" className="btn btn-primary w-100">
                Gửi
              </button>
            </form>

            {/* Vùng hiển thị thông báo */}
            {message && (
              <p className="mt-2 fw-bold" style={{ color: messageColor }}>
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Đường kẻ phân cách */}
        <hr className="border-light my-4" />

        {/* Bản quyền */}
        <p className="text-center mb-0">
          &copy; 2025 <strong>SmileCare</strong>. Đã đăng ký bản quyền.
        </p>
      </div>
    </footer>
  );
}
