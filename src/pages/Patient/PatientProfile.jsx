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
// Thêm Row và Col vào đây 👆

const PatientProfile = () => {
  // Giả định dữ liệu User từ API
  const [userData, setUserData] = useState({
    name: "Trần Văn Khách",
    email: "khach@example.com",
    phone: "0901234567",
    address: "123 Đường Sức Khỏe",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Logic gọi API để UPDATE bảng User
    console.log("Cập nhật hồ sơ:", userData);

    // Giả lập thành công
    setStatus({ type: "success", message: "Cập nhật thông tin thành công!" });
    setIsEditing(false);
  };

  return (
    <Container className="my-5 pt-5">
      <h1 className="text-primary fw-bold mb-4">Hồ Sơ Cá Nhân</h1>

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
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label className="fw-bold">Họ và Tên</Form.Label>
                <Form.Control
                  id="name"
                  value={userData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label className="fw-bold">Email</Form.Label>
                <Form.Control id="email" value={userData.email} disabled />
                <Form.Text className="text-muted">
                  Email không thể thay đổi.
                </Form.Text>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label className="fw-bold">Số điện thoại</Form.Label>
                <Form.Control
                  id="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label className="fw-bold">Địa chỉ</Form.Label>
                <Form.Control
                  id="address"
                  value={userData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Row>

            <div className="text-end mt-4">
              {isEditing ? (
                <>
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={() => setIsEditing(false)}
                  >
                    Hủy
                  </Button>
                  <Button variant="primary" type="submit">
                    Lưu Thay Đổi
                  </Button>
                </>
              ) : (
                <Button variant="primary" onClick={() => setIsEditing(true)}>
                  Chỉnh sửa Hồ sơ
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PatientProfile;
