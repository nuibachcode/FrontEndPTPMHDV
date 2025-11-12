import React from "react";
import { Container, Card, Table, Badge, Button } from "react-bootstrap";

// Giả định dữ liệu lịch sử Booking
const mockHistory = [
  {
    id: "BK1001",
    date: "15/11/2025",
    time: "09:00",
    doctor: "Nguyễn Văn A",
    status: "confirmed",
    total: 500000,
  },
  {
    id: "BK1002",
    date: "01/10/2025",
    time: "14:30",
    doctor: "Lê Thị B",
    status: "completed",
    total: 1000000,
  },
  {
    id: "BK1003",
    date: "25/11/2025",
    time: "10:00",
    doctor: "Nguyễn Văn A",
    status: "pending",
    total: 800000,
  },
  {
    id: "BK1004",
    date: "05/09/2025",
    time: "11:00",
    doctor: "Trần Văn C",
    status: "cancelled",
    total: 0,
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "confirmed":
      return <Badge bg="success">Đã xác nhận</Badge>;
    case "pending":
      return (
        <Badge bg="warning" text="dark">
          Chờ xác nhận
        </Badge>
      );
    case "completed":
      return <Badge bg="primary">Hoàn thành</Badge>;
    case "cancelled":
      return <Badge bg="danger">Đã hủy</Badge>;
    default:
      return <Badge bg="secondary">Không rõ</Badge>;
  }
};

const BookingHistory = () => {
  return (
    <Container className="my-5 pt-5">
      <h1 className="text-primary fw-bold mb-4">Lịch Sử Đặt Lịch Của Tôi</h1>

      <Card className="shadow-lg border-0">
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Mã Booking</th>
                <th>Ngày Khám</th>
                <th>Bác sĩ</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {mockHistory.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    {item.date} lúc {item.time}
                  </td>
                  <td>{item.doctor}</td>
                  <td>{item.total.toLocaleString("vi-VN")} VNĐ</td>
                  <td>{getStatusBadge(item.status)}</td>
                  <td>
                    {item.status === "pending" && (
                      <Button variant="danger" size="sm">
                        Hủy
                      </Button>
                    )}
                    {item.status !== "pending" &&
                      item.status !== "cancelled" && (
                        <Button variant="info" size="sm">
                          Chi tiết
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

export default BookingHistory;
