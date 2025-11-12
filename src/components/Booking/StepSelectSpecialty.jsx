import React, { useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";

// Giả định dữ liệu lấy từ API
const mockSpecialties = [
  {
    id: 1,
    name: "Chỉnh Nha",
    services: [
      { id: 101, name: "Niềng răng kim loại", price: 30000000 },
      { id: 102, name: "Niềng răng trong suốt", price: 60000000 },
    ],
  },
  {
    id: 2,
    name: "Nha Khoa Tổng Quát",
    services: [
      { id: 201, name: "Cạo vôi răng", price: 500000 },
      { id: 202, name: "Trám răng", price: 800000 },
    ],
  },
];

const StepSelectSpecialty = ({ nextStep, data }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState(
    data.specialtyId || null
  );
  const [selectedServices, setSelectedServices] = useState(
    data.serviceIds || []
  );

  const handleSelectService = (serviceId, price) => {
    const index = selectedServices.findIndex((s) => s.id === serviceId);
    let newServices;
    if (index > -1) {
      newServices = selectedServices.filter((s) => s.id !== serviceId);
    } else {
      newServices = [...selectedServices, { id: serviceId, price }];
    }
    setSelectedServices(newServices);
  };

  const handleNext = () => {
    if (!selectedSpecialty || selectedServices.length === 0) {
      alert("Vui lòng chọn Chuyên khoa và ít nhất một Dịch vụ!");
      return;
    }

    const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

    nextStep({
      specialtyId: selectedSpecialty,
      serviceIds: selectedServices.map((s) => s.id), // Chỉ lưu ID
      totalPrice: totalPrice,
    });
  };

  const currentSpecialty = mockSpecialties.find(
    (s) => s.id === selectedSpecialty
  );

  return (
    <>
      <h4 className="text-primary mb-3">1. Chọn Chuyên Khoa & Dịch Vụ</h4>
      <div className="mb-4">
        <Form.Label className="fw-bold">Chuyên khoa:</Form.Label>
        <div className="d-flex flex-wrap gap-3">
          {mockSpecialties.map((spec) => (
            <Button
              key={spec.id}
              variant={
                selectedSpecialty === spec.id ? "primary" : "outline-primary"
              }
              onClick={() => setSelectedSpecialty(spec.id)}
            >
              {spec.name}
            </Button>
          ))}
        </div>
      </div>

      {currentSpecialty && (
        <div className="mb-4">
          <Form.Label className="fw-bold">
            Dịch vụ ({currentSpecialty.name}):
          </Form.Label>
          <Card className="p-3">
            {currentSpecialty.services.map((service) => (
              <Form.Check
                key={service.id}
                type="checkbox"
                id={`service-${service.id}`}
                label={`${service.name} (${service.price.toLocaleString(
                  "vi-VN"
                )} VNĐ)`}
                checked={selectedServices.some((s) => s.id === service.id)}
                onChange={() => handleSelectService(service.id, service.price)}
                className="mb-2"
              />
            ))}
          </Card>
          <Alert variant="info" className="mt-3">
            Tổng tiền tạm tính: **
            {selectedServices
              .reduce((sum, s) => sum + s.price, 0)
              .toLocaleString("vi-VN")}{" "}
            VNĐ**
          </Alert>
        </div>
      )}

      <div className="text-end">
        <Button
          onClick={handleNext}
          variant="primary"
          disabled={!selectedSpecialty || selectedServices.length === 0}
        >
          Tiếp tục
        </Button>
      </div>
    </>
  );
};

export default StepSelectSpecialty;
