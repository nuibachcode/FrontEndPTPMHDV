import React, { useState } from "react";
import {
  Card,
  Button,
  Alert,
  ListGroup,
  Row,
  Col,
  Form,
} from "react-bootstrap";

const StepConfirmAndPay = ({ prevStep, data }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod, card, momo

  // Giả định dữ liệu lookup
  const doctorName =
    data.doctorId === 10 ? "TS.BS Nguyễn Văn A" : "ThS.BS Lê Thị B";
  const specialtyName =
    data.specialtyId === 1 ? "Chỉnh Nha" : "Nha Khoa Tổng Quát";
  const selectedServicesNames = ["Cạo vôi răng", "Trám răng"]; // Cần API để lookup tên dịch vụ thực tế

  const handleConfirmBooking = async () => {
    setIsProcessing(true);

    // 1. Chuẩn bị dữ liệu gửi lên Server
    const bookingPayload = {
      DateBooking: data.dateBooking,
      TimeStart: data.timeSlot,
      Description: "Đặt lịch online", // Có thể thêm trường này trong form
      UserId: 1, // ID của người dùng đang đăng nhập
      ScheduleId: data.scheduleId,
      Services: data.serviceIds, // Mảng ID dịch vụ
      PaymentMethod: paymentMethod, // Phương thức thanh toán
      TotalPrice: data.totalPrice,
      // Status mặc định là 'pending'
    };

    console.log("Payload gửi tạo Booking:", bookingPayload);

    try {
      // 2. Gọi API để tạo bản ghi trong Booking, Booking_Service, và Payment
      // const response = await api.post('/bookings', bookingPayload);

      // Giả lập thành công
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsBooked(true);
    } catch (error) {
      alert("Lỗi đặt lịch: Vui lòng thử lại.");
      setIsProcessing(false);
    }
  };

  if (isBooked) {
    return (
      <Alert variant="success" className="text-center p-5">
        <h4 className="alert-heading">🎉 Đặt Lịch Thành Công!</h4>
        <p>Mã Booking của bạn: **#BK{Math.floor(Math.random() * 100000)}**</p>
        <p>
          Bộ phận chăm sóc khách hàng sẽ gọi điện xác nhận trong vòng 30 phút.
        </p>
        <hr />
        <Button variant="primary" href="/patient/history">
          Xem Lịch Sử Đặt Lịch
        </Button>
      </Alert>
    );
  }

  return (
    <>
      <h4 className="text-primary mb-3">4. Xác Nhận & Thanh Toán</h4>

      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-light fw-bold">Tóm tắt đơn hàng</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            Bác sĩ: **{doctorName}** ({specialtyName})
          </ListGroup.Item>
          <ListGroup.Item>
            Ngày khám: **
            {new Date(data.dateBooking).toLocaleDateString("vi-VN")}**
          </ListGroup.Item>
          <ListGroup.Item>Khung giờ: **{data.timeSlot}**</ListGroup.Item>
          <ListGroup.Item>
            Dịch vụ: {selectedServicesNames.join(", ")}
          </ListGroup.Item>
        </ListGroup>
      </Card>

      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-light fw-bold text-danger">
          Tổng Chi Phí: {data.totalPrice.toLocaleString("vi-VN")} VNĐ
        </Card.Header>
        <Card.Body>
          <h5 className="mb-3 text-primary">Chọn Phương Thức Thanh Toán</h5>
          <Form>
            <Form.Check
              type="radio"
              label="Thanh toán tại phòng khám (COD)"
              name="paymentMethod"
              id="paymentCod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mb-2"
            />
            <Form.Check
              type="radio"
              label="Chuyển khoản Ngân hàng (Chờ xác nhận)"
              name="paymentMethod"
              id="paymentBank"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mb-2"
            />
            <Form.Check
              type="radio"
              label="Ví điện tử Momo/ZaloPay"
              name="paymentMethod"
              id="paymentMomo"
              value="momo"
              checked={paymentMethod === "momo"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              disabled
            />
          </Form>
          <Alert variant="warning" className="mt-3">
            Lưu ý: Tất cả Booking ban đầu đều có trạng thái **Pending** cho đến
            khi được Admin xác nhận qua điện thoại.
          </Alert>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-between">
        <Button
          onClick={prevStep}
          variant="outline-primary"
          disabled={isProcessing}
        >
          Quay lại
        </Button>
        <Button
          onClick={handleConfirmBooking}
          variant="success"
          disabled={isProcessing}
        >
          {isProcessing ? "Đang xử lý..." : `Xác nhận và Đặt lịch`}
        </Button>
      </div>
    </>
  );
};

export default StepConfirmAndPay;
