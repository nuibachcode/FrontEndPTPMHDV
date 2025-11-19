// src/pages/Admin/DoctorManagementPage.jsx
import React, { useState } from "react";
import {
  Card,
  Table,
  Button,
  Badge,
  Form,
  InputGroup,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Dữ liệu giả định
const mockDoctors = [
  {
    id: 10,
    name: "TS.BS Nguyễn Văn A",
    email: "nguyena@clinic.com",
    specialty: "Chỉnh Nha",
    status: "Hoạt động",
    role: "DOCTOR",
  },
  {
    id: 11,
    name: "ThS.BS Lê Thị B",
    email: "lethib@clinic.com",
    specialty: "Nha Tổng Quát",
    status: "Hoạt động",
    role: "DOCTOR",
  },
  {
    id: 12,
    name: "BS. Trần Văn C",
    email: "tranvc@clinic.com",
    specialty: "Nha Tổng Quát",
    status: "Đã khóa",
    role: "DOCTOR",
  },
  {
    id: 13,
    name: "BS. Phạm Thị D",
    email: "phamd@clinic.com",
    specialty: "Phục hình",
    status: "Hoạt động",
    role: "DOCTOR",
  },
];

const DoctorManagementPage = () => {
  const [doctors, setDoctors] = useState(mockDoctors);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  const navigate = useNavigate();

  // Logic tìm kiếm
  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xử lý khóa/mở khóa tài khoản
  const toggleStatus = (id) => {
    setDoctors((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              status: doc.status === "Hoạt động" ? "Đã khóa" : "Hoạt động",
            }
          : doc
      )
    );
  };

  // Mở modal chỉnh sửa
  const openEditModal = (doctor) => {
    setCurrentDoctor(doctor);
    setShowModal(true);
  };

  // Xử lý lưu thông tin chỉnh sửa (Giả định)
  const handleSaveEdit = (e) => {
    e.preventDefault();
    // Cập nhật state doctors với currentDoctor đã chỉnh sửa
    setDoctors((prev) =>
      prev.map((doc) => (doc.id === currentDoctor.id ? currentDoctor : doc))
    );
    setShowModal(false);
    alert(`Đã cập nhật thông tin bác sĩ ${currentDoctor.name}`);
  };

  // Cập nhật state tạm thời trong Modal
  const handleModalChange = (e) => {
    setCurrentDoctor({ ...currentDoctor, [e.target.name]: e.target.value });
  };

  // Hàm lấy màu cho Badge trạng thái
  const getStatusVariant = (status) => {
    return status === "Hoạt động" ? "success" : "secondary";
  };

  return (
    <div className="doctor-management-page">
      <h3 className="mb-4 text-warning fw-bold">🧑‍⚕️ Quản lý Bác sĩ</h3>
      <p className="text-secondary mb-4">
        Danh sách tài khoản Bác sĩ, phân quyền chuyên môn và trạng thái hoạt
        động.
      </p>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={7}>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm theo Tên hoặc Email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={5} className="text-end">
              <Button
                variant="success"
                onClick={() =>
                  openEditModal({
                    id: null,
                    name: "",
                    email: "",
                    specialty: "",
                    status: "Hoạt động",
                    role: "DOCTOR",
                  })
                }
              >
                <i className="bi bi-person-plus-fill"></i> Thêm Bác sĩ Mới
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive hover className="mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên Bác sĩ & Email</th>
                <th>Chuyên khoa</th>
                <th>Trạng thái</th>
                <th className="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.id || "Mới"}</td>
                  <td>
                    <div className="fw-semibold">{doc.name}</div>
                    <div className="small text-muted">{doc.email}</div>
                  </td>
                  <td>{doc.specialty}</td>
                  <td>
                    <Badge
                      bg={getStatusVariant(doc.status)}
                      className="py-2 px-3"
                    >
                      {doc.status}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <Button
                      variant="info"
                      size="sm"
                      className="me-2"
                      onClick={() => openEditModal(doc)}
                    >
                      <i className="bi bi-pencil-square"></i> Sửa
                    </Button>
                    <Button
                      variant={
                        doc.status === "Hoạt động" ? "secondary" : "warning"
                      }
                      size="sm"
                      onClick={() => toggleStatus(doc.id)}
                    >
                      <i
                        className={`bi bi-${
                          doc.status === "Hoạt động" ? "lock" : "unlock"
                        }`}
                      ></i>{" "}
                      {doc.status === "Hoạt động" ? "Khóa" : "Mở khóa"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal Chỉnh sửa Bác sĩ */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentDoctor && currentDoctor.id
              ? "Chỉnh Sửa Bác sĩ"
              : "Thêm Bác sĩ Mới"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveEdit}>
          <Modal.Body>
            {currentDoctor && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và Tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={currentDoctor.name}
                    onChange={handleModalChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={currentDoctor.email}
                    onChange={handleModalChange}
                    required
                    disabled={currentDoctor.id !== null}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Chuyên khoa</Form.Label>
                  <Form.Control
                    as="select"
                    name="specialty"
                    value={currentDoctor.specialty}
                    onChange={handleModalChange}
                    required
                  >
                    <option>Chỉnh Nha</option>
                    <option>Nha Tổng Quát</option>
                    <option>Phục hình</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Trạng thái</Form.Label>
                  <Form.Control
                    as="select"
                    name="status"
                    value={currentDoctor.status}
                    onChange={handleModalChange}
                    required
                  >
                    <option>Hoạt động</option>
                    <option>Đã khóa</option>
                  </Form.Control>
                </Form.Group>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Lưu Thay Đổi
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default DoctorManagementPage;
