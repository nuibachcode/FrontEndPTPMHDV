import React, { useState } from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";

// Giả định các Component con cho từng bước
import StepSelectSpecialty from "../../components/Booking/StepSelectSpecialty";
import StepSelectDoctor from "../../components/Booking/StepSelectDoctor";
import StepSelectSchedule from "../../components/Booking/StepSelectSchedule";
import StepConfirmAndPay from "../../components/Booking/StepConfirmAndPay";

const BookingFlow = () => {
  // 1. Quản lý trạng thái bước hiện tại
  const [step, setStep] = useState(1);

  // 2. Quản lý dữ liệu booking qua các bước
  const [bookingData, setBookingData] = useState({
    specialtyId: null,
    doctorId: null,
    scheduleId: null,
    timeSlot: null,
    serviceIds: [],
    totalPrice: 0,
  });

  // 3. Hàm chuyển bước
  const nextStep = (data = {}) => {
    setBookingData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  // 4. Hàm hiển thị nội dung từng bước
  const renderStepContent = () => {
    switch (step) {
      case 1:
        // Chọn Chuyên khoa và Dịch vụ (Service)
        return <StepSelectSpecialty nextStep={nextStep} data={bookingData} />;
      case 2:
        // Chọn Bác sĩ (Doctor)
        return (
          <StepSelectDoctor
            nextStep={nextStep}
            prevStep={prevStep}
            data={bookingData}
          />
        );
      case 3:
        // Chọn Lịch trống (Schedule)
        return (
          <StepSelectSchedule
            nextStep={nextStep}
            prevStep={prevStep}
            data={bookingData}
          />
        );
      case 4:
        // Xác nhận, Thanh toán, và Hoàn tất
        return <StepConfirmAndPay prevStep={prevStep} data={bookingData} />;
      default:
        return <div>Đặt lịch hoàn tất! Cảm ơn bạn.</div>;
    }
  };

  return (
    <Container className="my-5 pt-5">
      <h1 className="text-center text-primary mb-4 fw-bold">
        Đặt Lịch Hẹn Khám Nha Khoa
      </h1>
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-light text-center">
              {/* Thanh tiến trình (Progress Bar) */}
              <div className="d-flex justify-content-between align-items-center">
                {["Chuyên khoa", "Bác sĩ", "Lịch hẹn", "Xác nhận"].map(
                  (label, index) => (
                    <div
                      key={index}
                      className={`text-center flex-grow-1 ${
                        step >= index + 1 ? "text-primary" : "text-muted"
                      }`}
                    >
                      <div
                        className={`fw-bold ${
                          step === index + 1
                            ? "border-bottom border-primary border-3"
                            : ""
                        }`}
                      >
                        Bước {index + 1}: {label}
                      </div>
                    </div>
                  )
                )}
              </div>
            </Card.Header>
            <Card.Body className="p-4">{renderStepContent()}</Card.Body>
            <Card.Footer className="bg-white border-0 text-end">
              {/* Có thể thêm nút Quay lại tại đây, nhưng tôi sẽ đặt trong component con */}
              <Button
                variant="outline-secondary"
                className="me-2"
                onClick={prevStep}
                disabled={step === 1 || step > 4}
              >
                Quay lại
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingFlow;
