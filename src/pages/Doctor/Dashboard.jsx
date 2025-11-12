import React from "react";
import { Container, Card, Table, Badge, Alert } from "react-bootstrap";

// Giả định dữ liệu Booking đã được gán cho bác sĩ hiện tại
const mockBookings = [
  {
    id: "BK1005",
    date: "15/12/2025",
    time: "09:00",
    patientName: "Phạm Thị D",
    service: "Cạo vôi răng",
    status: "confirmed",
  },
  {
    id: "BK1006",
    date: "15/12/2025",
    time: "10:00",
    patientName: "Nguyễn Văn E",
    service: "Trám răng",
    status: "confirmed",
  },
  {
    id: "BK1007",
    date: "16/12/2025",
    time: "14:00",
    patientName: "Trần Văn G",
    service: "Chỉnh nha (Tư vấn)",
    status: "pending",
  },
];

const getStatusBadge = (status) => {
  if (status === "confirmed") return <Badge bg="success">Đã xác nhận</Badge>;
  if (status === "pending")
    return (
      <Badge bg="warning" text="dark">
        Chờ Admin duyệt
      </Badge>
    );
  return <Badge bg="secondary">Mới</Badge>;
};

const DoctorDashboard = () => {
  const today = new Date().toLocaleDateString("vi-VN");

  return (
    <Container fluid>
      <h2 className="text-primary fw-bold mb-4">Dashboard Bác sĩ</h2>
      <Alert variant="info">
        Xin chào Bác sĩ **Nguyễn Văn A**. Đây là lịch hẹn đã được xác nhận của
        bạn.
      </Alert>

      <Card className="shadow-sm border-0 mb-4">
        <Card.Header className="bg-primary text-white fw-bold">
          Lịch Hẹn Sắp Tới (Ngày {today})
        </Card.Header>
        <Card.Body>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Thời gian</th>
                <th>Mã Booking</th>
                <th>Bệnh nhân</th>
                <th>Dịch vụ</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {mockBookings.map((item) => (
                <tr key={item.id}>
                  <td>{item.time}</td>
                  <td>{item.id}</td>
                  <td>{item.patientName}</td>
                  <td>{item.service}</td>
                  <td>{getStatusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {mockBookings.length === 0 && (
            <p className="text-center text-muted">
              Không có lịch hẹn nào sắp tới.
            </p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DoctorDashboard;
