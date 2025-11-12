import React, { useState, useEffect } from "react";
import { Card, Button, Alert, ListGroup, Badge } from "react-bootstrap";

// Giả định dữ liệu Bác sĩ từ API (dựa trên SpecialtyId = 1)
const mockDoctors = [
  {
    id: 10,
    name: "TS.BS Nguyễn Văn A",
    lever: "Chuyên khoa I",
    bio: "Hơn 15 năm kinh nghiệm về Chỉnh nha.",
    specialtyId: 1,
  },
  {
    id: 11,
    name: "ThS.BS Lê Thị B",
    lever: "Chuyên khoa II",
    bio: "Bác sĩ trẻ, tận tâm, chuyên niềng răng trong suốt.",
    specialtyId: 1,
  },
  {
    id: 20,
    name: "BS. Trần Văn C",
    lever: "Tổng quát",
    bio: "Khám và tư vấn tổng quát răng miệng.",
    specialtyId: 2,
  },
];

const StepSelectDoctor = ({ nextStep, prevStep, data }) => {
  const { specialtyId, doctorId } = data;
  const [selectedDoctor, setSelectedDoctor] = useState(doctorId || null);

  // Lọc danh sách bác sĩ theo chuyên khoa đã chọn (data.specialtyId)
  const filteredDoctors = mockDoctors.filter(
    (d) => d.specialtyId === specialtyId
  );

  const handleNext = () => {
    if (!selectedDoctor) {
      alert("Vui lòng chọn một Bác sĩ!");
      return;
    }
    nextStep({ doctorId: selectedDoctor });
  };

  if (!specialtyId) {
    return (
      <Alert variant="warning">
        Vui lòng quay lại Bước 1 để chọn Chuyên khoa.
      </Alert>
    );
  }

  return (
    <>
      <h4 className="text-primary mb-3">2. Chọn Bác Sĩ</h4>
      <Alert variant="info">
        Bạn đang tìm bác sĩ thuộc Chuyên khoa **
        {specialtyId === 1 ? "Chỉnh Nha" : "Nha Khoa Tổng Quát"}**.
      </Alert>

      <div className="d-flex flex-column gap-3 mb-4">
        {filteredDoctors.map((doctor) => (
          <Card
            key={doctor.id}
            className={`shadow-sm ${
              selectedDoctor === doctor.id ? "border-primary border-3" : ""
            }`}
            onClick={() => setSelectedDoctor(doctor.id)}
            style={{ cursor: "pointer" }}
          >
            <Card.Body className="d-flex align-items-center">
              {/* Avatar placeholder */}
              <div
                className="me-3"
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#e9ecef",
                  borderRadius: "50%",
                  textAlign: "center",
                  lineHeight: "60px",
                }}
              >
                <Badge bg="primary">Ảnh</Badge>
              </div>
              <div>
                <h5 className="mb-0 text-dark fw-bold">{doctor.name}</h5>
                <Badge bg="success" className="me-2">
                  {doctor.lever}
                </Badge>
                <p className="text-muted mb-0 small">
                  {doctor.bio.substring(0, 50)}...
                </p>
              </div>
              <div className="ms-auto">
                <Button
                  variant={
                    selectedDoctor === doctor.id
                      ? "primary"
                      : "outline-secondary"
                  }
                  size="sm"
                >
                  {selectedDoctor === doctor.id ? "Đã chọn" : "Chọn"}
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <div className="d-flex justify-content-between">
        <Button onClick={prevStep} variant="outline-primary">
          Quay lại
        </Button>
        <Button
          onClick={handleNext}
          variant="primary"
          disabled={!selectedDoctor}
        >
          Tiếp tục
        </Button>
      </div>
    </>
  );
};

export default StepSelectDoctor;
