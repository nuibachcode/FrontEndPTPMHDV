// LoginPage.js
import React from "react";
import { Link } from "react-router-dom";
import LoginRegisterLayout from "../../layout/LoginRegisterLayout";

const LoginPage = () => {
  return (
    <LoginRegisterLayout>
      <h2 className="text-center text-primary mb-4">ĐĂNG NHẬP</h2>
      <form>
        {/* Email */}
        <div className="mb-3 input-group shadow-sm rounded">
          <span className="input-group-text bg-primary text-white border-0">
            <i className="bi bi-person"></i>
          </span>
          <input
            type="text"
            className="form-control border-0"
            placeholder="Nhập email hoặc tài khoản"
          />
        </div>

        {/* Mật khẩu */}
        <div className="mb-3 input-group shadow-sm rounded">
          <span className="input-group-text bg-primary text-white border-0">
            <i className="bi bi-lock"></i>
          </span>
          <input
            type="password"
            className="form-control border-0"
            placeholder="Mật khẩu"
          />
        </div>

        {/* Ghi nhớ & quên mật khẩu */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="remember" />
            <label className="form-check-label" htmlFor="remember">
              Ghi nhớ
            </label>
          </div>
          <Link to="/account/forgot-password" className="text-decoration-none">
            Quên mật khẩu?
          </Link>
        </div>

        {/* Nút đăng nhập */}
        <button
          type="submit"
          className="btn w-100 mb-3 text-white shadow"
          style={{
            background: "linear-gradient(135deg, #00aaff, #5d1ec3ff)",
            borderRadius: "50px",
            padding: "10px",
          }}
        >
          ĐĂNG NHẬP
        </button>

        <hr />

        {/* Nút đăng ký (ĐÃ SỬA THÀNH LINK) */}
        <Link
          to="/account/register" // Chuyển hướng đến trang đăng ký
          className="btn w-100 mt-3 text-white shadow text-decoration-none"
          style={{
            background: "linear-gradient(135deg, #00aaff, #0cbe44ff)",
            borderRadius: "50px",
            padding: "10px",
          }}
        >
          ĐĂNG KÝ
        </Link>
      </form>
    </LoginRegisterLayout>
  );
};

export default LoginPage;
