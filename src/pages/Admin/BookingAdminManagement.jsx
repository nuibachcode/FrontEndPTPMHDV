import React, { useEffect, useState } from "react";
import {
  Table,
  Badge,
  Button,
  Card,
  Container,
  Modal,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import moment from "moment";

const BookingAdminManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // State cho Modal Thanh toán
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [paymentData, setPaymentData] = useState({
    amount: 0,
    method: "TIEN_MAT",
    note: "",
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  // 1. Lấy danh sách lịch hẹn từ API (Có kiểm tra Role)
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      // Gọi qua Gateway (8080)
      const res = await axios.get("http://localhost:8080/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.EC === 0) {
        const mappedData = res.data.DT.map((item) => {
          
          // --- XỬ LÝ TÊN BỆNH NHÂN (CHECK ROLE 3) ---
          let patientObj = { fullName: "---", phone: "" };
          
          if (item.patientInfo) {
             // Chỉ nhận nếu roleId === 3 (Bệnh nhân)
             if (item.patientInfo.roleId === 3) {
                 patientObj = item.patientInfo;
             } else {
                 // Nếu ID tồn tại nhưng sai Role (VD: Admin)
                 patientObj = { 
                    fullName: `⚠️ Sai Role (ID: ${item.patientId})`, 
                    phone: item.patientInfo.phone 
                 };
             }
          } else {
             // Không tìm thấy ID trong bảng User
             patientObj = { 
                fullName: `Không tìm thấy (ID: ${item.patientId})`, 
                phone: "" 
             };
          }

          // --- XỬ LÝ TÊN BÁC SĨ (CHECK ROLE 2) ---
          let doctorObj = { fullName: "---" };
          
          if (item.scheduleInfo?.doctorInfo) {
              const docInfo = item.scheduleInfo.doctorInfo;
              // Chỉ nhận nếu roleId === 2 (Bác sĩ)
              if (docInfo.roleId === 2) {
                  doctorObj = docInfo;
              } else {
                  doctorObj = { fullName: `⚠️ Sai Role (ID: ${item.scheduleId})` };
              }
          }

          return {
            ...item,
            // Map dịch vụ
            services: item.bookingServiceAssociations?.map((bs) => ({
              id: bs.serviceId,
              nameService: bs.service?.nameService || "Dịch vụ",
              price: bs.priceAtBooking,
            })) || [],
            
            // Gán object đã xử lý logic vào
            User: patientObj,
            Schedule: { User: doctorObj },
          };
        });

        // Sắp xếp ID giảm dần để thấy cái mới nhất
        setBookings(mappedData.sort((a, b) => b.id - a.id));
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // 2. Xử lý Xác nhận / Hủy Lịch
  const handleUpdateStatus = async (bookingId, newStatus) => {
    const statusToSend =
      newStatus === "confirmed"
        ? "CONFIRMED"
        : newStatus === "cancelled"
        ? "CANCELLED"
        : newStatus;

    if (
      !window.confirm(`Bạn chắc chắn muốn chuyển trạng thái sang ${newStatus}?`)
    )
      return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:8080/api/bookings/${bookingId}`,
        { status: statusToSend },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.EC === 0) {
        alert("Cập nhật trạng thái thành công!");
        fetchBookings();
      }
    } catch (e) {
      alert("Lỗi cập nhật trạng thái");
    }
  };

  // 3. Mở Modal Thanh toán
  const handleOpenPayment = (booking) => {
    const total = booking.services.reduce(
      (acc, s) => acc + Number(s.price || 0),
      0
    );

    setSelectedBooking(booking);
    setPaymentData({ amount: total, method: "TIEN_MAT", note: "" });
    setShowPaymentModal(true);
  };

  // 4. Xử lý Xác nhận Thanh toán
  const handleConfirmPayment = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        bookingId: selectedBooking.id,
        amount: paymentData.amount,
        method: paymentData.method,
        note: paymentData.note,
        transactionCode: `TRX_${Date.now()}`,
      };

      // B1: Gọi Payment Service
      const resPayment = await axios.post(
        "http://localhost:8080/api/payments",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (resPayment.data.EC === 0) {
        // B2: Cập nhật trạng thái Booking -> COMPLETED
        await axios.put(
          `http://localhost:8080/api/bookings/${selectedBooking.id}`,
          { status: "COMPLETED" },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("Thanh toán thành công! Trạng thái lịch hẹn đã cập nhật.");
        setShowPaymentModal(false);
        fetchBookings(); // Load lại để ẩn nút Thu tiền
      }
    } catch (e) {
      console.error(e);
      alert("Lỗi thanh toán: " + (e.response?.data?.EM || "Lỗi server"));
    }
  };

  const getStatusBadge = (status) => {
    const s = (status || "").toLowerCase();
    switch (s) {
      case "pending":
        return <Badge bg="warning" text="dark">Chờ xác nhận</Badge>;
      case "confirmed":
        return <Badge bg="primary">Đã xác nhận</Badge>;
      case "completed":
      case "compeled":
        return <Badge bg="success">Đã thanh toán</Badge>;
      case "cancelled":
        return <Badge bg="danger">Đã hủy</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <Container fluid className="py-4">
      <h3 className="mb-4 text-primary fw-bold">
        <i className="bi bi-calendar-check me-2"></i>Quản Lý & Điều Phối Lịch Hẹn
      </h3>

      <Alert variant="info">
        <i className="bi bi-info-circle me-2"></i>
        Admin vui lòng gọi điện xác nhận với khách hàng trước khi chuyển trạng
        thái sang <strong>Đã xác nhận</strong>.
      </Alert>

      <Card className="border-0 shadow-sm">
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
            </div>
          ) : (
            <Table hover responsive className="align-middle">
              <thead className="bg-light">
                <tr>
                  <th>Mã BK</th>
                  <th>Bệnh nhân / SĐT</th>
                  <th>Bác sĩ</th>
                  <th>Ngày khám</th>
                  <th>Dịch vụ</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((item) => (
                  <tr key={item.id}>
                    <td className="fw-bold">#{item.id}</td>
                    <td>
                      {/* HIỂN THỊ TÊN BỆNH NHÂN */}
                      <div className="fw-bold">{item.User?.fullName}</div>
                      <small className="text-muted">{item.User?.phone}</small>
                    </td>
                    <td>
                      {/* HIỂN THỊ TÊN BÁC SĨ */}
                      {item.Schedule?.User?.fullName}
                    </td>
                    <td>
                      {item.dateBooking
                        ? moment(item.dateBooking).format("DD/MM/YYYY")
                        : ""}{" "}
                      <br />
                      <small className="text-primary">
                        {item.timeStart} - {item.timeEnd}
                      </small>
                    </td>
                    <td>
                      {item.services?.map((s, index) => (
                        <div key={index}>• {s.nameService}</div>
                      ))}
                    </td>
                    <td>{getStatusBadge(item.status)}</td>
                    <td>
                      <div className="d-flex gap-2">
                        {item.status === "PENDING" && (
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(item.id, "confirmed")
                            }
                          >
                            <i className="bi bi-check-lg"></i> Xác nhận
                          </Button>
                        )}

                        {item.status === "CONFIRMED" && (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleOpenPayment(item)}
                          >
                            <i className="bi bi-cash-coin"></i> Thu tiền
                          </Button>
                        )}

                        {item.status !== "COMPLETED" &&
                          item.status !== "CANCELLED" && (
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() =>
                                handleUpdateStatus(item.id, "cancelled")
                              }
                            >
                              <i className="bi bi-x-lg"></i> Hủy
                            </Button>
                          )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>Xác nhận Thu tiền</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Khách hàng</Form.Label>
              <Form.Control
                type="text"
                value={selectedBooking?.User?.fullName || ""}
                disabled
                className="bg-light fw-bold"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">
                Tổng tiền thực thu (VNĐ)
              </Form.Label>
              <Form.Control
                type="number"
                value={paymentData.amount}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, amount: e.target.value })
                }
                className="form-control-lg border-success text-success fw-bold"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hình thức thanh toán</Form.Label>
              <Form.Select
                value={paymentData.method}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, method: e.target.value })
                }
              >
                <option value="TIEN_MAT">Tiền mặt</option>
                <option value="CHUYEN_KHOAN">Chuyển khoản Ngân hàng</option>
                <option value="THE_TIN_DUNG">Thẻ tín dụng / Visa</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ghi chú giao dịch</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={paymentData.note}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, note: e.target.value })
                }
                placeholder="VD: Khách chuyển khoản VCB..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPaymentModal(false)}
          >
            Hủy bỏ
          </Button>
          <Button variant="success" onClick={handleConfirmPayment}>
            Xác nhận Đã thu
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BookingAdminManagement;