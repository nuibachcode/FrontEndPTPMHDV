import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";

const ChangePasswordModal = ({ show, onHide }) => {
  // State cho Form Đổi mật khẩu
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordStatus, setPasswordStatus] = useState(null);

  // Xử lý thay đổi input trong form mật khẩu
  const handlePasswordFormChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.id]: e.target.value });
    setPasswordStatus(null); // Xóa thông báo khi người dùng bắt đầu nhập lại
  };

  // Xử lý đổi mật khẩu
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordStatus(null);
    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    // --- VALIDATION LOGIC ---
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordStatus({
        type: "danger",
        message: "Vui lòng điền đầy đủ tất cả các trường.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordStatus({
        type: "danger",
        message: "Mật khẩu mới và Xác nhận mật khẩu không khớp.",
      });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordStatus({
        type: "danger",
        message: "Mật khẩu mới phải có ít nhất 6 ký tự.",
      });
      return;
    }
    // --- END VALIDATION ---

    // Logic gọi API đổi mật khẩu
    console.log("Đổi mật khẩu thành công:", newPassword);

    // Giả lập thành công
    setPasswordStatus({
      type: "success",
      message: "Mật khẩu đã được thay đổi thành công! 🔒",
    });
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    // Đóng modal sau khi thông báo thành công (2 giây)
    setTimeout(() => {
      onHide();
      setPasswordStatus(null);
    }, 2000);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-primary fw-bold">
          <i className="bi bi-key me-2"></i> Đổi Mật Khẩu
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {passwordStatus && (
          <Alert
            variant={passwordStatus.type}
            onClose={() => setPasswordStatus(null)}
            dismissible
          >
            {passwordStatus.message}
          </Alert>
        )}
        <Form onSubmit={handlePasswordSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Mật khẩu hiện tại</Form.Label>
            <Form.Control
              type="password"
              id="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Mật khẩu mới</Form.Label>
            <Form.Control
              type="password"
              id="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Xác nhận mật khẩu mới</Form.Label>
            <Form.Control
              type="password"
              id="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordFormChange}
            />
          </Form.Group>
          <div className="d-grid mt-4">
            <Button variant="danger" type="submit">
              Lưu Mật Khẩu Mới
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;
