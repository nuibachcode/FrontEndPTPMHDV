import React, { useState } from "react";
import {
  Container,
  Card,
  Table,
  Form,
  Button,
  Modal,
  Alert,
} from "react-bootstrap";

// Dữ liệu giả định Specialty (Chuyên khoa)
const mockSpecialties = [
  { id: 1, name: "Chỉnh Nha", description: "Chuyên sắp xếp lại răng và hàm." },
  { id: 2, name: "Nha Tổng Quát", description: "Kiểm tra và điều trị cơ bản." },
  { id: 3, name: "Cấy Ghép Implant", description: "Phục hình răng đã mất." },
];

const SpecialtyManagement = () => {
  const [specialties, setSpecialties] = useState(mockSpecialties);
  const [showModal, setShowModal] = useState(false);
  const [currentSpecialty, setCurrentSpecialty] = useState({
    id: null,
    name: "",
    description: "",
  });

  const handleClose = () => {
    setShowModal(false);
    setCurrentSpecialty({ id: null, name: "", description: "" });
  };

  const handleShow = (specialty = { id: null, name: "", description: "" }) => {
    setCurrentSpecialty(specialty);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic gọi API CREATE hoặc UPDATE bảng Specialty

    if (currentSpecialty.id) {
      // UPDATE
      setSpecialties(
        specialties.map((s) =>
          s.id === currentSpecialty.id ? currentSpecialty : s
        )
      );
      alert("Cập nhật chuyên khoa thành công!");
    } else {
      // CREATE
      const newId = specialties.length + 1;
      setSpecialties([...specialties, { ...currentSpecialty, id: newId }]);
      alert("Thêm chuyên khoa mới thành công!");
    }
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm("Xác nhận xóa chuyên khoa này?")) {
      // Logic gọi API DELETE Specialty
      setSpecialties(specialties.filter((s) => s.id !== id));
      alert("Xóa chuyên khoa thành công!");
    }
  };

  return (
    <Container fluid>
      <h2 className="text-primary fw-bold mb-4">Quản lý Chuyên khoa</h2>

      <div className="d-flex justify-content-end mb-3">
        <Button variant="success" onClick={() => handleShow()}>
          + Thêm Chuyên khoa mới
        </Button>
      </div>

      <Card className="shadow-sm border-0">
        <Card.Body>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên Chuyên khoa</th>
                <th>Mô tả</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {specialties.map((spec) => (
                <tr key={spec.id}>
                  <td>{spec.id}</td>
                  <td>{spec.name}</td>
                  <td>{spec.description}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShow(spec)}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(spec.id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal Sửa/Thêm */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            {currentSpecialty.id
              ? "Cập nhật Chuyên khoa"
              : "Thêm Chuyên khoa mới"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Tên Chuyên khoa</Form.Label>
              <Form.Control
                type="text"
                value={currentSpecialty.name}
                onChange={(e) =>
                  setCurrentSpecialty({
                    ...currentSpecialty,
                    name: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentSpecialty.description}
                onChange={(e) =>
                  setCurrentSpecialty({
                    ...currentSpecialty,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Lưu
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default SpecialtyManagement;
