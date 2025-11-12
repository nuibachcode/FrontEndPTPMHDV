import React from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";

// Dữ liệu giả định thống kê
const mockStats = {
  totalBookings: 150,
  pendingBookings: 12, // Cần Admin xác nhận
  totalDoctors: 8,
  totalPatients: 120,
};

const DoctorDashboard = () => {
  return (
    <Container fluid>
      <h2 className="text-primary fw-bold mb-4">Dashboard Quản Trị Hệ thống</h2>
      <Alert variant="success">
        Chào mừng Admin! Xem các chỉ số quan trọng và hành động cần thiết dưới
        đây.
      </Alert>

      {/* Thẻ thống kê */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="shadow-sm border-left-primary h-100 py-2">
            <Card.Body>
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Tổng Booking
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {mockStats.totalBookings}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm border-left-warning h-100 py-2">
            <Card.Body>
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Booking Chờ Xác nhận
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {mockStats.pendingBookings}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm border-left-success h-100 py-2">
            <Card.Body>
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Tổng Bác sĩ
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {mockStats.totalDoctors}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm border-left-info h-100 py-2">
            <Card.Body>
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Tổng Bệnh nhân
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {mockStats.totalPatients}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Các biểu đồ/báo cáo khác có thể thêm ở đây */}
    </Container>
  );
};

export default DoctorDashboard;
