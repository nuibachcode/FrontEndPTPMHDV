import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // 'success', 'error', 'loading'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    // ⭐ LOGIC GỌI API ĐỂ GỬI EMAIL RESET LINK ⭐
    console.log("Yêu cầu reset mật khẩu cho Email:", email);

    try {
      // Giả định gọi API thành công
      // const response = await api.post('/auth/forgot-password', { email });

      // Giả lập độ trễ
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setStatus("success");
      setEmail(""); // Xóa email sau khi gửi
    } catch (error) {
      console.error("Lỗi gửi yêu cầu reset:", error);
      setStatus("error");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "90vh", backgroundColor: "#e9ecef" }}
    >
      <Card
        className="shadow-lg p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <Card.Body>
          <h2 className="card-title text-center text-primary mb-4">
            Quên Mật Khẩu
          </h2>
          <p className="text-center text-muted mb-4 small">
            Vui lòng nhập địa chỉ email bạn đã dùng để đăng ký. Chúng tôi sẽ gửi
            link đặt lại mật khẩu cho bạn.
          </p>

          {/* Hiển thị thông báo */}
          {status === "success" && (
            <Alert variant="success" className="text-center">
              ✅ Link đặt lại mật khẩu đã được gửi đến email của bạn!
            </Alert>
          )}
          {status === "error" && (
            <Alert variant="danger" className="text-center">
              ❌ Lỗi: Không tìm thấy email hoặc xảy ra lỗi hệ thống.
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label htmlFor="email" className="form-label">
                Địa chỉ Email
              </Form.Label>
              <Form.Control
                type="email"
                id="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading" || status === "success"}
              />
            </Form.Group>

            <Button
              type="submit"
              className="btn btn-primary w-100 mb-3"
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading" ? "Đang gửi..." : "Gửi Yêu Cầu Đặt Lại"}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <Link to="/account/login" className="text-muted small">
              Quay lại Đăng nhập
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ForgotPassword;
