import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Row,
  Col,
} from "react-bootstrap";

// Import component Modal mới
import ChangePasswordModal from "./ChangePasswordModal";

const PatientProfile = () => {
  // Giả định dữ liệu User từ API
  const [userData, setUserData] = useState({
    name: "Trần Văn Khách",
    username: "patient_khach",
    email: "khach@example.com",
    phone: "0901234567",
    address: "123 Đường Sức Khỏe",
  });
  const [initialData, setInitialData] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(null);
  const [showModal, setShowModal] = useState(false); // CHỈ QUẢN LÝ STATE HIỂN THỊ MODAL

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleEditClick = () => {
    setInitialData(userData);
    setIsEditing(true);
    setStatus(null);
  };

  const handleCancel = () => {
    setUserData(initialData);
    setIsEditing(false);
    setStatus(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Cập nhật hồ sơ:", userData);

    setStatus({
      type: "success",
      message: "Cập nhật thông tin cơ bản thành công! 🎉",
    });
    setInitialData(userData);
    setIsEditing(false);
  };

  return (
    <Container className="my-5 pt-5">
      <h1 className="text-primary fw-bold mb-4">
        <i className="bi bi-person-circle me-2"></i> Hồ Sơ Cá Nhân
      </h1>

      {status && (
        <Alert
          variant={status.type}
          onClose={() => setStatus(null)}
          dismissible
        >
          {status.message}
        </Alert>
      )}

      <Card className="shadow-lg border-0">
        <Card.Body>
          <Form onSubmit={handleSave}>
            <Row>
              {/* CỘT TRÁI: THÔNG TIN CƠ BẢN */}
              <Col md={20} className="border-end pe-md-4">
                <h4 className="mb-3 text-secondary">Thông tin Cơ bản</h4>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12">
                    <Form.Label className="fw-bold">
                      <i className="bi bi-person me-2"></i>Họ và Tên
                    </Form.Label>
                    <Form.Control
                      id="name"
                      value={userData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12">
                    <Form.Label className="fw-bold">
                      <i className="bi bi-telephone me-2"></i>Số điện thoại
                    </Form.Label>
                    <Form.Control
                      id="phone"
                      value={userData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12">
                    <Form.Label className="fw-bold">
                      <i className="bi bi-geo-alt me-2"></i>Địa chỉ
                    </Form.Label>
                    <Form.Control
                      id="address"
                      value={userData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </Form.Group>
                </Row>
              </Col>

              {/* CỘT PHẢI: TÀI KHOẢN VÀ BẢO MẬT */}
              <Col md={20} className="ps-md-4">
                <h4 className="mb-3 text-secondary">Tài khoản & Bảo mật</h4>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12">
                    <Form.Label className="fw-bold">
                      <i className="bi bi-at me-2"></i>Tên tài khoản (Username)
                    </Form.Label>
                    <Form.Control
                      id="username"
                      value={userData.username}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12">
                    <Form.Label className="fw-bold">
                      <i className="bi bi-envelope me-2"></i>Email
                    </Form.Label>
                    <Form.Control id="email" value={userData.email} disabled />
                    <Form.Text className="text-muted">
                      Email là định danh chính, không thể thay đổi.
                    </Form.Text>
                  </Form.Group>
                </Row>

                {/* NÚT ĐỔI MẬT KHẨU */}
                <Row className="mb-3 pt-3">
                  <Col md="12">
                    <Button
                      variant="outline-danger"
                      className="w-100"
                      onClick={() => setShowModal(true)} // CHỈ GỌI SHOW MODAL
                    >
                      <i className="bi bi-lock me-2"></i> Đổi Mật Khẩu
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>

            <hr className="my-4" />

            {/* Nút Hành động */}
            <div className="text-end mt-4">
              {isEditing ? (
                <>
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={handleCancel}
                  >
                    Hủy
                  </Button>
                  <Button variant="primary" type="submit">
                    <i className="bi bi-save me-2"></i> Lưu Thay Đổi
                  </Button>
                </>
              ) : (
                <Button variant="primary" onClick={handleEditClick}>
                  <i className="bi bi-pencil-square me-2"></i> Chỉnh sửa Hồ sơ
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* GỌI COMPONENT MODAL MỚI */}
      <ChangePasswordModal
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </Container>
  );
};

export default PatientProfile;
