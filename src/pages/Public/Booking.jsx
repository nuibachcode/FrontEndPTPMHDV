import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Form,
  Alert,
  Row,
  Col,
  ListGroup,
  Container,
  Badge, // Thêm Badge để dùng cho các nhãn
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

// Màu chủ đạo
const PRIMARY_COLOR = "#1e8d9c";
const SECONDARY_BG = "#e0f7fa"; // Nền phụ

// --- DỮ LIỆU GIẢ ĐỊNH ---
// (Giữ nguyên dữ liệu mock)
const mockSpecialties = [
  { id: 1, name: "Chỉnh Nha" },
  { id: 2, name: "Nha Tổng Quát" },
];
const mockDoctors = [
  {
    id: 10,
    name: "TS.BS Nguyễn Văn A",
    specialtyId: 1,
    lever: "Chuyên khoa I",
  },
  { id: 11, name: "ThS.BS Lê Thị B", specialtyId: 1, lever: "Chuyên khoa II" },
  { id: 20, name: "BS. Trần Văn C", specialtyId: 2, lever: "Tổng quát" },
];
const mockServices = [
  { id: 101, name: "Niềng răng kim loại", price: 30000000, specialtyId: 1 },
  { id: 201, name: "Cạo vôi răng", price: 500000, specialtyId: 2 },
  { id: 202, name: "Trám răng", price: 800000, specialtyId: 2 },
];
const mockSchedules = [
  { scheduleId: 100, date: new Date(2025, 10, 20), doctorId: 10 },
  { scheduleId: 101, date: new Date(2025, 10, 21), doctorId: 10 },
];
const mockSlots = [
  {
    slotId: 1,
    scheduleId: 100,
    startTime: "08:00",
    endTime: "09:00",
    isBooked: false,
  },
  {
    slotId: 2,
    scheduleId: 100,
    startTime: "09:00",
    endTime: "10:00",
    isBooked: true,
  },
  {
    slotId: 3,
    scheduleId: 100,
    startTime: "10:00",
    endTime: "11:00",
    isBooked: false,
  },
];
const formatDateKey = (date) => date.toISOString().split("T")[0];

const Booking = () => {
  const [bookingData, setBookingData] = useState({
    specialtyId: "",
    doctorId: "",
    selectedDate: null,
    scheduleId: null,
    slotId: null,
    serviceIds: [],
    totalPrice: 0,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBooked, setIsBooked] = useState(false); // Logic tính toán giữ nguyên...

  const filteredDoctors = mockDoctors.filter(
    (d) => d.specialtyId === parseInt(bookingData.specialtyId)
  );
  const availableDates = mockSchedules
    .filter((s) => s.doctorId === parseInt(bookingData.doctorId))
    .map((s) => s.date);
  const slotsForSelectedDate = bookingData.scheduleId
    ? mockSlots.filter((s) => s.scheduleId === bookingData.scheduleId)
    : [];

  useEffect(() => {
    const total = bookingData.serviceIds.reduce((sum, serviceId) => {
      const service = mockServices.find((s) => s.id === serviceId);
      return sum + (service ? service.price : 0);
    }, 0);
    setBookingData((prev) => ({ ...prev, totalPrice: total }));
  }, [bookingData.serviceIds]);

  useEffect(() => {
    if (bookingData.selectedDate && bookingData.doctorId) {
      const schedule = mockSchedules.find(
        (s) =>
          s.doctorId === parseInt(bookingData.doctorId) &&
          formatDateKey(s.date) === formatDateKey(bookingData.selectedDate)
      );
      setBookingData((prev) => ({
        ...prev,
        scheduleId: schedule ? schedule.scheduleId : null,
        slotId: null,
      }));
    }
  }, [bookingData.selectedDate, bookingData.doctorId]);

  const handleServiceChange = (id) => {
    const serviceId = parseInt(id);
    setBookingData((prev) => {
      const isSelected = prev.serviceIds.includes(serviceId);
      const newIds = isSelected
        ? prev.serviceIds.filter((s) => s !== serviceId)
        : [...prev.serviceIds, serviceId];
      return { ...prev, serviceIds: newIds };
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingData.slotId || bookingData.serviceIds.length === 0) {
      alert("Vui lòng chọn dịch vụ và khung giờ!");
      return;
    }
    setIsProcessing(true);

    const payload = {
      ...bookingData,
      dateBooking: formatDateKey(bookingData.selectedDate),
    };
    console.log("Final Booking Payload:", payload);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsBooked(true);
    setIsProcessing(false);
  };

  if (isBooked) {
    return (
      <Alert variant="success" className="text-center p-5">
                <h4 className="alert-heading">🎉 Đặt Lịch Thành Công!</h4>     
          <p>Mã Booking: **#BK{Math.floor(Math.random() * 100000)}**</p>
                <hr />       {" "}
        <Button variant="primary" as={Link} to="/patient/history">
                    Xem Lịch Sử Đặt Lịch        {" "}
        </Button>
             {" "}
      </Alert>
    );
  }

  return (
    <Container className="my-5 pt-5">
           {" "}
      <h2
        className="text-center mb-5 fw-bolder"
        style={{ color: PRIMARY_COLOR }}
      >
                ĐẶT LỊCH HẸN      {" "}
      </h2>
           {" "}
      <Card className="shadow-lg border-0">
        <Card.Header className="bg-light p-3">
          <Alert variant="info" className="mb-0 small">
            Vui lòng chọn đầy đủ các thông tin để tìm khung giờ khám phù hợp
            nhất.
          </Alert>
        </Card.Header>
               {" "}
        <Form onSubmit={handleBookingSubmit}>
                   {" "}
          <Row>
                        {/* Cột Trái: Dịch vụ, Bác sĩ */}           {" "}
            <Col md={20} className="p-4 border-end">
                           {" "}
              <h5 className="mb-3 fw-bold" style={{ color: PRIMARY_COLOR }}>
                                1. Chọn Dịch vụ & Bác sĩ              {" "}
              </h5>
              <Card
                className="shadow-sm p-3 mb-4"
                style={{ backgroundColor: SECONDARY_BG }}
              >
                {/* Chọn Chuyên khoa */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Chuyên khoa</Form.Label>
                  <Form.Select
                    value={bookingData.specialtyId}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        specialtyId: e.target.value,
                        doctorId: "",
                      })
                    }
                    required
                  >
                    <option value="">-- Chọn Chuyên khoa --</option>
                    {mockSpecialties.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Chọn Bác sĩ */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Bác sĩ</Form.Label>
                  <Form.Select
                    value={bookingData.doctorId}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        doctorId: e.target.value,
                        selectedDate: null,
                      })
                    }
                    required
                    disabled={!bookingData.specialtyId}
                  >
                    <option value="">-- Chọn Bác sĩ --</option>
                    {filteredDoctors.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.lever})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Chọn Dịch vụ */}
                <Form.Group>
                  <Form.Label className="fw-bold">Dịch vụ</Form.Label>
                  <Card className="p-3">
                    {mockServices
                      .filter(
                        (s) =>
                          s.specialtyId === parseInt(bookingData.specialtyId)
                      )
                      .map((service) => (
                        <Form.Check
                          key={service.id}
                          type="checkbox"
                          id={`service-${service.id}`}
                          label={`${
                            service.name
                          } (${service.price.toLocaleString("vi-VN")} VNĐ)`}
                          checked={bookingData.serviceIds.includes(service.id)}
                          onChange={() => handleServiceChange(service.id)}
                        />
                      ))}
                    {bookingData.specialtyId &&
                      mockServices.filter(
                        (s) =>
                          s.specialtyId === parseInt(bookingData.specialtyId)
                      ).length === 0 && (
                        <p className="text-danger small mb-0">
                          Chuyên khoa này chưa có dịch vụ nào.
                        </p>
                      )}
                  </Card>
                </Form.Group>
              </Card>
                         {" "}
            </Col>
                        {/* Cột Phải: Ngày, Giờ, Tóm tắt */}           {" "}
            <Col md={20} className="p-4">
                           {" "}
              <h5 className="mb-3 fw-bold" style={{ color: PRIMARY_COLOR }}>
                                2. Chọn Thời gian & Xác nhận              {" "}
              </h5>
              {/* Chọn Ngày */}
              <Card className="shadow-sm p-3 mb-4">
                <Form.Label className="fw-bold">Chọn Ngày</Form.Label>
                <div className="d-flex justify-content-center">
                  <DatePicker
                    selected={bookingData.selectedDate}
                    onChange={(date) =>
                      setBookingData({ ...bookingData, selectedDate: date })
                    }
                    includeDates={availableDates}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Chọn ngày có lịch"
                    className="form-control"
                    disabled={!bookingData.doctorId}
                    inline
                  />
                </div>
              </Card>
              {/* Chọn Giờ (Slot) */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">
                  Chọn Khung giờ{" "}
                  <Badge bg="success" className="ms-2">
                    Trống
                  </Badge>
                </Form.Label>
                <div className="d-flex flex-wrap gap-2">
                  {slotsForSelectedDate.map((slot) => (
                    <Button
                      key={slot.slotId}
                      variant={
                        slot.isBooked
                          ? "outline-danger" // Slot đã đặt
                          : bookingData.slotId === slot.slotId
                          ? "success" // Slot đang chọn
                          : "outline-primary" // Slot trống
                      }
                      onClick={() =>
                        setBookingData((prev) => ({
                          ...prev,
                          slotId: slot.slotId,
                        }))
                      }
                      size="sm"
                      disabled={slot.isBooked || !bookingData.scheduleId}
                      style={{ transition: "0.2s", minWidth: "80px" }}
                    >
                      {slot.startTime}
                    </Button>
                  ))}
                  {bookingData.scheduleId &&
                    slotsForSelectedDate.length === 0 && (
                      <Alert variant="secondary" className="w-100 py-2">
                        Ngày đã chọn chưa có khung giờ trống!
                      </Alert>
                    )}
                </div>
              </Form.Group>
              {/* Tóm tắt & Thanh toán */}
              <Card
                className="shadow-lg border-warning"
                style={{ borderLeft: "5px solid" }}
              >
                <Card.Header className="bg-light fw-bold">
                  Tóm tắt Lịch hẹn
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Tổng chi phí:{" "}
                    <strong className="float-end text-danger">
                      {bookingData.totalPrice.toLocaleString("vi-VN")} VNĐ
                    </strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Ngày khám:{" "}
                    <span className="float-end">
                      {bookingData.selectedDate
                        ? formatDateKey(bookingData.selectedDate)
                        : "..."}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Giờ khám:{" "}
                    <span className="float-end text-success fw-bold">
                      {mockSlots.find((s) => s.slotId === bookingData.slotId)
                        ?.startTime || "Vui lòng chọn giờ"}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Thanh toán:{" "}
                    <span className="float-end">Tại phòng khám (COD)</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
                         {" "}
            </Col>
                     {" "}
          </Row>
                   {" "}
          <div className="text-center mt-5 p-3 border-top">
                       {" "}
            <Button
              variant="warning"
              type="submit"
              size="lg"
              style={{ padding: "10px 40px", fontSize: "1.2rem" }}
              disabled={
                isProcessing ||
                bookingData.slotId === null ||
                bookingData.serviceIds.length === 0
              }
            >
                           {" "}
              {isProcessing ? "Đang tạo Booking..." : "Xác nhận Đặt lịch"}     
                   {" "}
            </Button>
                     {" "}
          </div>
                 {" "}
        </Form>
             {" "}
      </Card>
         {" "}
    </Container>
  );
};

export default Booking;
