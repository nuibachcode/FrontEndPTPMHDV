import React from "react";
import HeaderAdmin from "../components/Admin/AdminHeader";

import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
  return (
    <>
      <Container
        fluid
        className="pt-5"
        style={{ minHeight: "90vh", marginTop: "50px" }}
      >
        <Row>
          {/* Sidebar Admin */}
          <Col md={3} className="bg-primary p-4 text-white">
            <h5 className="mb-4 fw-bold text-warning">ADMIN PANEL</h5>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/admin/dashboard" className="text-white">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/users" className="text-white">
                Quản lý Tài khoản & Quyền
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/admin/specialties"
                className="text-white"
              >
                Quản lý Chuyên khoa
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/services" className="text-white">
                Quản lý Dịch vụ
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/bookings" className="text-white">
                Xác nhận Lịch hẹn
              </Nav.Link>
              <hr className="bg-secondary" />
              <Nav.Link as={Link} to="/" className="text-warning">
                Đăng xuất
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

export default AdminLayout;
