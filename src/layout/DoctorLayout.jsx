import React from "react";
import Header from "../components/Common/Header"; // Dùng Header chung
import Footer from "../components/Common/Footer"; // Dùng Footer chung
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const DoctorLayout = ({ children }) => {
  return (
    <>
      <Container fluid className="pt-5" style={{ minHeight: "90vh" }}>
        <Row>
          {/* Sidebar - Dùng cho điều hướng nội bộ của bác sĩ */}
          <Col md={3} className="bg-light border-end p-4">
            <h5 className="text-primary mb-4 fw-bold">Khu Vực Bác Sĩ</h5>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/doctor/dashboard" className="text-dark">
                Dashboard (Lịch hẹn)
              </Nav.Link>
              <Nav.Link as={Link} to="/doctor/schedule" className="text-dark">
                Quản lý Lịch làm
              </Nav.Link>
              <Nav.Link as={Link} to="/doctor/profile" className="text-dark">
                Cập nhật Thông tin
              </Nav.Link>
              <hr />
              <Nav.Link as={Link} to="/" className="text-danger">
                Thoát khu vực quản lý
              </Nav.Link>
            </Nav>
          </Col>

          {/* Content */}
          <Col md={9} className="p-4">
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DoctorLayout;
