import React, { useState } from "react";
import { Container, Card, Table, Badge, Button, Alert } from "react-bootstrap";

// Giả định dữ liệu Booking từ hệ thống
const mockAllBookings = [
  {
    id: "BK1010",
    date: "2025-12-15",
    time: "09:00",
    patient: "Trần Văn Khách",
    phone: "090xxxx111",
    status: "pending",
    doctor: "Nguyễn Văn A",
    service: "Cạo vôi",
  },
  {
    id: "BK1011",
    date: "2025-12-16",
    time: "14:00",
    patient: "Lê Thị B",
    phone: "090xxxx222",
    status: "pending",
    doctor: "Nguyễn Văn A",
    service: "Trám răng",
  },
  {
    id: "BK1012",
    date: "2025-12-17",
    time: "10:00",
    patient: "Phạm Văn C",
    phone: "090xxxx333",
    status: "confirmed",
    doctor: "Lê Thị B",
    service: "Niềng răng",
  },
];

const getStatusBadge = (status) => {
  if (status === "confirmed") return <Badge bg="success">Đã xác nhận</Badge>;
  if (status === "pending")
    return (
      <Badge bg="warning" text="dark">
        Chờ xác nhận (Cần gọi)
      </Badge>
    );
  if (status === "cancelled") return <Badge bg="danger">Đã hủy</Badge>;
  return <Badge bg="secondary">Mới</Badge>;
};

const BookingAdminManagement = () => {
  const [bookings, setBookings] = useState(mockAllBookings);

  const handleConfirm = (bookingId) => {
    if (
      !window.confirm(
        `Xác nhận Booking ${bookingId} này đã được gọi điện và đồng ý?`
      )
    ) {
      return;
    }

    // Logic gọi API để UPDATE Booking SET Status = 'confirmed'
    setBookings(
      bookings.map((b) =>
        b.id === bookingId ? { ...b, status: "confirmed" } : b
      )
    );
    // Thêm thông báo
    alert(`Booking ${bookingId} đã được xác nhận!`);
  };

  const handleCancel = (bookingId) => {
    if (
      !window.confirm(
        `Bạn có chắc chắn muốn HỦY Booking ${bookingId} này không?`
      )
    ) {
      return;
    }
    // Logic gọi API để UPDATE Booking SET Status = 'cancelled'
    setBookings(
      bookings.map((b) =>
        b.id === bookingId ? { ...b, status: "cancelled" } : b
      )
    );
  };

  return (
    <Container fluid style={{ marginTop: "80px" }}>
      <h2 className="text-primary fw-bold mb-4">Quản lý & Xác nhận Lịch hẹn</h2>
      <Alert variant="info">
        Tổng cộng có **{bookings.filter((b) => b.status === "pending").length}**
        lịch hẹn cần gọi điện xác nhận.
      </Alert>

      <Card className="shadow-sm border-0">
        <Card.Body>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Mã/Ngày</th>
                <th>Bệnh nhân/SĐT</th>
                <th>Bác sĩ</th>
                <th>Dịch vụ</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    {booking.id} <br />
                    <small className="text-muted">
                      {booking.date} {booking.time}
                    </small>
                  </td>
                  <td>
                    {booking.patient} <br />
                    <a href={`tel:${booking.phone}`} className="fw-bold">
                      {booking.phone}
                    </a>
                  </td>
                  <td>{booking.doctor}</td>
                  <td>{booking.service}</td>
                  <td>{getStatusBadge(booking.status)}</td>
                  <td>
                    {booking.status === "pending" && (
                      <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        onClick={() => handleConfirm(booking.id)}
                      >
                        Xác nhận (Gọi OK)
                      </Button>
                    )}
                    {booking.status !== "cancelled" && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleCancel(booking.id)}
                      >
                        Hủy
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookingAdminManagement;
