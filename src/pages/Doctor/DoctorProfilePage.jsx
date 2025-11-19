import React, { useState } from "react";
import { Form, Row, Col, Card, Button, Alert } from "react-bootstrap";

const DoctorProfilePage = () => {
  // Giả lập dữ liệu thông tin Bác sĩ
  const [profile, setProfile] = useState({
    fullName: "Nguyễn Văn A",
    email: "dr.nguyena@smilecare.com",
    phone: "0901 234 567",
    specialty: "Nha khoa Tổng quát",
    qualification: "Thạc sĩ Răng Hàm Mặt, Đại học Y Hà Nội",
    description:
      "Hơn 10 năm kinh nghiệm trong điều trị tủy và nha khoa thẩm mỹ.",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(null); // 'success' hoặc 'error'

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Logic gọi API để lưu thông tin cập nhật
    console.log("Saving Profile:", profile);

    // Giả lập thành công
    setIsEditing(false);
    setStatus("success");

    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div className="doctor-profile-page">
      <h3 className="mb-4 text-primary">⚙️ Cập nhật Thông tin Cá nhân</h3>
      <p className="text-secondary mb-4">
        Quản lý hồ sơ cá nhân và thông tin chuyên môn hiển thị trên trang web.
      </p>

      {status === "success" && (
        <Alert variant="success" className="mb-4">
          <i className="bi bi-check-circle-fill"></i> Cập nhật thông tin thành
          công!
        </Alert>
      )}

      <Card className="shadow-sm">
        <Card.Header className="bg-white fw-bold">Thông tin Cơ bản</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSave}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="fullName">
                  <Form.Label>Họ và Tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email (Không đổi)</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={profile.email}
                    readOnly
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="phone">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="specialty">
                  <Form.Label>Chuyên khoa</Form.Label>
                  <Form.Control
                    type="text"
                    name="specialty"
                    value={profile.specialty}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="qualification" className="mb-3">
              <Form.Label>Học vị & Chứng chỉ</Form.Label>
              <Form.Control
                type="text"
                name="qualification"
                value={profile.qualification}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </Form.Group>

            <Form.Group controlId="description" className="mb-4">
              <Form.Label>Mô tả Chuyên môn</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={profile.description}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </Form.Group>

            {isEditing ? (
              <div className="d-flex gap-2">
                <Button variant="primary" type="submit">
                  <i className="bi bi-save"></i> Lưu Thay Đổi
                </Button>
                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                  <i className="bi bi-x-circle"></i> Hủy
                </Button>
              </div>
            ) : (
              <Button variant="warning" onClick={() => setIsEditing(true)}>
                <i className="bi bi-pencil"></i> Chỉnh Sửa Hồ Sơ
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DoctorProfilePage;
