import React, { useState } from "react";
import {
  Container,
  Card,
  Table,
  Form,
  Button,
  Modal,
  Row,
  Col,
} from "react-bootstrap";

// Giả định dữ liệu từ API
const mockSpecialties = [
  { id: 1, name: "Chỉnh Nha" },
  { id: 2, name: "Nha Tổng Quát" },
];

const mockServices = [
  {
    id: 101,
    name: "Cạo vôi răng",
    price: 500000,
    duration: 30,
    specialtyId: 2,
  },
  {
    id: 102,
    name: "Trám răng thẩm mỹ",
    price: 800000,
    duration: 45,
    specialtyId: 2,
  },
  {
    id: 103,
    name: "Niềng răng kim loại",
    price: 30000000,
    duration: 180,
    specialtyId: 1,
  },
];

const ServiceManagement = () => {
  const [services, setServices] = useState(mockServices);
  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState({
    id: null,
    name: "",
    price: "",
    duration: "",
    specialtyId: "",
  });

  const handleClose = () => {
    setShowModal(false);
    setCurrentService({
      id: null,
      name: "",
      price: "",
      duration: "",
      specialtyId: "",
    });
  };

  const handleShow = (
    service = { id: null, name: "", price: "", duration: "", specialtyId: "" }
  ) => {
    setCurrentService(service);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic gọi API CREATE hoặc UPDATE bảng Service

    if (currentService.id) {
      // UPDATE
      setServices(
        services.map((s) => (s.id === currentService.id ? currentService : s))
      );
      alert("Cập nhật dịch vụ thành công!");
    } else {
      // CREATE
      const newId = services.length + 100;
      setServices([
        ...services,
        {
          ...currentService,
          id: newId,
          price: parseFloat(currentService.price),
          duration: parseInt(currentService.duration),
        },
      ]);
      alert("Thêm dịch vụ mới thành công!");
    }
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm("Xác nhận xóa dịch vụ này?")) {
      // Logic gọi API DELETE Service
      setServices(services.filter((s) => s.id !== id));
      alert("Xóa dịch vụ thành công!");
    }
  };

  const getSpecialtyName = (id) => {
    const specialty = mockSpecialties.find((s) => s.id === id);
    return specialty ? specialty.name : "Chưa gán";
  };

  return (
    <Container fluid>
      <h2 className="text-primary fw-bold mb-4">Quản lý Dịch vụ</h2>

      <div className="d-flex justify-content-end mb-3">
        <Button variant="success" onClick={() => handleShow()}>
          + Thêm Dịch vụ mới
        </Button>
      </div>

      <Card className="shadow-sm border-0">
        <Card.Body>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên Dịch vụ</th>
                <th>Chuyên khoa</th>
                <th>Giá (VNĐ)</th>
                <th>Thời lượng (phút)</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>{service.id}</td>
                  <td>{service.name}</td>
                  <td>{getSpecialtyName(service.specialtyId)}</td>
                  <td>{service.price.toLocaleString("vi-VN")}</td>
                  <td>{service.duration}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShow(service)}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
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
            {currentService.id ? "Cập nhật Dịch vụ" : "Thêm Dịch vụ mới"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Tên Dịch vụ</Form.Label>
              <Form.Control
                type="text"
                value={currentService.name}
                onChange={(e) =>
                  setCurrentService({ ...currentService, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Giá (VNĐ)</Form.Label>
                  <Form.Control
                    type="number"
                    value={currentService.price}
                    onChange={(e) =>
                      setCurrentService({
                        ...currentService,
                        price: e.target.value,
                      })
                    }
                    required
                    min="0"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Thời lượng (phút)</Form.Label>
                  <Form.Control
                    type="number"
                    value={currentService.duration}
                    onChange={(e) =>
                      setCurrentService({
                        ...currentService,
                        duration: e.target.value,
                      })
                    }
                    required
                    min="15"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Gán vào Chuyên khoa</Form.Label>
              <Form.Select
                value={currentService.specialtyId}
                onChange={(e) =>
                  setCurrentService({
                    ...currentService,
                    specialtyId: parseInt(e.target.value),
                  })
                }
                required
              >
                <option value="">--- Chọn Chuyên khoa ---</option>
                {mockSpecialties.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.name}
                  </option>
                ))}
              </Form.Select>
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

export default ServiceManagement;
