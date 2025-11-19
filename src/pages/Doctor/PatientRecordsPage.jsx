import React, { useState } from "react";
import {
  Form,
  Row,
  Col,
  Card,
  Button,
  Table,
  InputGroup,
} from "react-bootstrap";

const PatientRecordsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // Giả lập danh sách hồ sơ bệnh nhân
  const mockPatients = [
    {
      id: "BN001",
      name: "Nguyễn Văn A",
      phone: "090xxxx123",
      lastVisit: "10/11/2025",
    },
    {
      id: "BN002",
      name: "Trần Thị B",
      phone: "091xxxx456",
      lastVisit: "05/11/2025",
    },
    {
      id: "BN003",
      name: "Lê Văn C",
      phone: "098xxxx789",
      lastVisit: "15/11/2025",
    },
  ];

  // Logic tìm kiếm đơn giản
  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewRecord = (patient) => {
    // Thêm logic để mở modal hoặc chuyển hướng đến trang chi tiết hồ sơ
    alert(`Xem chi tiết và Cập nhật hồ sơ của bệnh nhân: ${patient.name}`);
  };

  return (
    <div className="patient-records-page">
      <h3 className="mb-4 text-primary">🩺 Hồ sơ Bệnh nhân</h3>
      <p className="text-secondary mb-4">
        Tìm kiếm bệnh nhân để xem lịch sử khám và cập nhật hồ sơ y tế.
      </p>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={8}>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm theo Tên hoặc Mã bệnh nhân..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={4} className="text-end">
              <Button variant="outline-success">
                <i className="bi bi-person-plus"></i> Thêm Bệnh nhân Mới
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Header className="bg-white fw-bold">
          Danh sách Hồ sơ ($ {filteredPatients.length} hồ sơ)
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Mã HS</th>
                <th>Tên Bệnh nhân</th>
                <th>Số điện thoại</th>
                <th>Lần khám Gần nhất</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.id}</td>
                    <td>{patient.name}</td>
                    <td>{patient.phone}</td>
                    <td>{patient.lastVisit}</td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleViewRecord(patient)}
                      >
                        <i className="bi bi-eye"></i> Xem & Cập nhật
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-danger">
                    Không tìm thấy bệnh nhân nào khớp với từ khóa.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PatientRecordsPage;
