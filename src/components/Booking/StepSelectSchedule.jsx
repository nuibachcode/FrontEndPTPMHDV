import React, { useState, useEffect } from "react";
import {
  Button,
  Alert,
  Row,
  Col,
  Form,
  ListGroup,
  Badge,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Đừng quên import CSS cho DatePicker

// Giả định dữ liệu lịch làm việc của Bác sĩ ID 10
const mockSchedules = [
  {
    scheduleId: 100,
    date: new Date(2025, 10, 15),
    slots: ["08:00", "09:00", "10:00"],
    maxPatient: 3,
  },
  {
    scheduleId: 101,
    date: new Date(2025, 10, 16),
    slots: ["13:00", "14:00"],
    maxPatient: 2,
  },
];

// Hàm format ngày tháng để so sánh
const formatDate = (date) =>
  date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

const StepSelectSchedule = ({ nextStep, prevStep, data }) => {
  const { doctorId, scheduleId, timeSlot } = data;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState(
    scheduleId || null
  );
  const [selectedTime, setSelectedTime] = useState(timeSlot || null);

  // Lấy danh sách ngày có lịch của bác sĩ
  const availableDates = mockSchedules.map((s) => s.date);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedScheduleId(null);
    setSelectedTime(null);
  };

  const handleSelectTime = (slot, id) => {
    setSelectedTime(slot);
    setSelectedScheduleId(id);
  };

  const handleNext = () => {
    if (!selectedScheduleId || !selectedTime) {
      alert("Vui lòng chọn ngày và khung giờ khám!");
      return;
    }
    nextStep({
      scheduleId: selectedScheduleId,
      timeSlot: selectedTime,
      // DateBooking được lấy từ selectedDate
      dateBooking: selectedDate.toISOString().split("T")[0],
    });
  };

  // Tìm lịch làm việc cho ngày đã chọn
  const scheduleForSelectedDay = selectedDate
    ? mockSchedules.find((s) => formatDate(s.date) === formatDate(selectedDate))
    : null;

  if (!doctorId) {
    return (
      <Alert variant="warning">Vui lòng quay lại Bước 2 để chọn Bác sĩ.</Alert>
    );
  }

  return (
    <>
      <h4 className="text-primary mb-3">3. Chọn Ngày & Giờ Khám</h4>
      <Alert variant="info">
        Bạn đang đặt lịch với Bác sĩ **
        {doctorId === 10 ? "Nguyễn Văn A" : "Lê Thị B"}**.
      </Alert>

      <Row>
        <Col md={5}>
          <Form.Label className="fw-bold">Chọn ngày:</Form.Label>
          {/* DatePicker chỉ cho phép chọn những ngày có trong lịch (includeDates) */}
          <DatePicker
            selected={selectedDate}
            onChange={handleSelectDate}
            includeDates={availableDates}
            dateFormat="dd/MM/yyyy"
            placeholderText="Chọn một ngày có lịch"
            className="form-control"
            inline
          />
        </Col>
        <Col md={7}>
          <Form.Label className="fw-bold">Khung giờ trống:</Form.Label>
          <Card style={{ minHeight: "300px" }}>
            <Card.Body>
              {selectedDate && scheduleForSelectedDay ? (
                <div className="d-flex flex-wrap gap-2">
                  {scheduleForSelectedDay.slots.map((slot, index) => (
                    <Button
                      key={index}
                      variant={
                        selectedTime === slot ? "success" : "outline-success"
                      }
                      onClick={() =>
                        handleSelectTime(
                          slot,
                          scheduleForSelectedDay.scheduleId
                        )
                      }
                      size="sm"
                    >
                      {slot}
                    </Button>
                  ))}
                  <Alert
                    variant="light"
                    className="w-100 mt-3 small text-muted"
                  >
                    Ca làm việc: {scheduleForSelectedDay.slots[0]} -{" "}
                    {scheduleForSelectedDay.slots.slice(-1)[0]}
                  </Alert>
                </div>
              ) : selectedDate ? (
                <Alert variant="secondary">
                  Ngày này chưa có lịch làm việc.
                </Alert>
              ) : (
                <Alert variant="secondary">Vui lòng chọn ngày trên lịch.</Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="d-flex justify-content-between mt-4">
        <Button onClick={prevStep} variant="outline-primary">
          Quay lại
        </Button>
        <Button
          onClick={handleNext}
          variant="primary"
          disabled={!selectedScheduleId || !selectedTime}
        >
          Tiếp tục
        </Button>
      </div>
    </>
  );
};

export default StepSelectSchedule;
