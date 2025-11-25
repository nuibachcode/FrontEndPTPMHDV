import React, { useEffect, useState } from "react";
import { Container, Card, Table, Badge, Button, Alert } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const BookingHistory = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Lấy thông tin từ LocalStorage
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      const userObj = JSON.parse(storedUser);
      // 2. Gọi hàm fetch với ID thật và Token thật
      if (userObj && userObj.id) {
        fetchHistory(userObj.id, storedToken);
      }
    } else {
      // Nếu chưa đăng nhập -> Đá về trang login
      alert("Vui lòng đăng nhập để xem lịch sử!");
      navigate("/account/login");
    }
  }, []);

  const fetchHistory = async (patientId, token) => {
    try {
      let res = await axios.get(
        `http://localhost:8081/api/booking-history?patientId=${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token chuẩn
          },
        }
      );

      if (res && res.data && res.data.errCode === 0) {
        setHistory(res.data.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      // Nếu lỗi 401/403 (Hết hạn token) -> Đá về login
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        navigate("/account/login");
      }
    }
  };

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
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  // Hàm tính tổng tiền (Ưu tiên lấy giá lúc đặt - priceAtBooking)
  const calculateTotal = (services) => {
    if (!services || services.length === 0) return 0;
    return services.reduce((acc, curr) => {
      // Nếu backend trả về BookingService.priceAtBooking thì lấy, không thì lấy giá gốc
      const price = curr.BookingService
        ? Number(curr.BookingService.priceAtBooking)
        : Number(curr.price);
      return acc + price;
    }, 0);
  };

  return (
    <Container className="my-5 pt-5" style={{ minHeight: "80vh" }}>
      <h2 className="text-primary fw-bold mb-4 text-uppercase border-bottom pb-2">
        <i className="bi bi-clock-history me-2"></i> Lịch Sử Đặt Lịch
      </h2>

      <Card className="shadow border-0 rounded-4">
        <Card.Header className="bg-white py-3">
          <span className="fw-bold text-secondary">
            Danh sách các cuộc hẹn của bạn
          </span>
        </Card.Header>
        <Card.Body className="p-0">
          <Table striped hover responsive className="m-0 align-middle">
            <thead className="bg-light text-secondary">
              <tr>
                <th className="py-3 ps-4">Mã Booking</th>
                <th>Thời gian</th>
                <th>Bác sĩ</th>
                <th>Dịch vụ đăng ký</th>
                <th>Tổng chi phí</th>
                <th>Trạng thái</th>
                {/* <th>Thao tác</th> */}
              </tr>
            </thead>
            <tbody>
              {history && history.length > 0 ? (
                history.map((item) => {
                  let totalAmount = calculateTotal(item.services);

                  return (
                    <tr key={item.id}>
                      <td className="ps-4 fw-bold text-primary">#{item.id}</td>

                      <td>
                        <div className="fw-bold">
                          {item.dateBooking
                            ? moment(item.dateBooking).format("DD/MM/YYYY")
                            : ""}
                        </div>
                        <small className="text-muted">
                          {item.timeStart} - {item.timeEnd}
                        </small>
                      </td>
                      <td>
                        <div className="fw-bold">
                          {item.Schedule.User.fullName
                            ? item.Schedule.User.fullName
                            : ""}
                        </div>
                      </td>
                      <td>
                        {item.services && item.services.length > 0 ? (
                          item.services.map((s, idx) => (
                            <div key={idx}>• {s.nameService}</div>
                          ))
                        ) : (
                          <span className="text-muted fst-italic">
                            Khám thường
                          </span>
                        )}
                      </td>
                      <td className="fw-bold text-danger">
                        {totalAmount.toLocaleString("vi-VN")} đ
                      </td>
                      <td>{getStatusBadge(item.status)}</td>
                      {/* <td>
                        {item.status === "pending" && (
                          <Button variant="outline-danger" size="sm" className="rounded-pill">Hủy lịch</Button>
                        )}
                      </td> */}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <div
                      className="text-muted mb-2"
                      style={{ fontSize: "2rem" }}
                    >
                      <i className="bi bi-calendar2-x"></i>
                    </div>
                    <h5 className="text-muted">Bạn chưa có lịch hẹn nào.</h5>
                    <Button
                      variant="primary"
                      className="mt-3"
                      onClick={() => navigate("/booking")}
                    >
                      Đặt lịch ngay
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookingHistory;
