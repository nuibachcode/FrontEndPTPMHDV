import React from "react";
import LoginRegisterLayout from "../../layout/LoginRegisterLayout";
import "./RegisterPage.css";

const RegisterPage = () => {
  return (
    <LoginRegisterLayout>
      <h2 className="text-center text-primary mb-4">ĐĂNG KÝ</h2>
      <form className="register-form">
        {/* Họ và tên */}
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-person-fill"></i>
          </span>
          <input type="text" className="form-control" placeholder="Họ và tên" />
        </div>

        {/* Tài khoản */}
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-person-badge-fill"></i>
          </span>
          <input type="text" className="form-control" placeholder="Tài khoản" />
        </div>

        {/* Email */}
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-envelope-fill"></i>
          </span>
          <input type="email" className="form-control" placeholder="Email" />
        </div>

        {/* Số điện thoại */}
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-telephone-fill"></i>
          </span>
          <input
            type="tel"
            className="form-control"
            placeholder="Số điện thoại"
          />
        </div>

        {/* Mật khẩu */}
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-lock-fill"></i>
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="Mật khẩu"
          />
        </div>

        {/* Xác nhận mật khẩu */}
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-lock-fill"></i>
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="Xác nhận mật khẩu"
          />
        </div>

        {/* Địa chỉ */}
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-geo-alt-fill"></i>
          </span>
          <input type="text" className="form-control" placeholder="Địa chỉ" />
        </div>

        {/* Nút đăng ký */}
        <button type="submit" className="btn-register">
          ĐĂNG KÝ
        </button>
      </form>
    </LoginRegisterLayout>
  );
};

export default RegisterPage;
