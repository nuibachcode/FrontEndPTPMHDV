import React from "react";

export default function Footer() {
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
            <form>
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Nhập email của bạn"
              />
              <button className="btn btn-primary w-100">Gửi</button>
            </form>
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
