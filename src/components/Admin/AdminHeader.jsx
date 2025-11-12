// src/components/Admin/AdminHeader.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Button } from "react-bootstrap";

const AdminHeader = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="top" className="shadow">
      <Container fluid className="px-4">
        <Navbar.Brand className="text-warning fw-bold">
          <Link
            to="/admin/dashboard"
            className="text-warning"
            style={{ textDecoration: "none" }}
          >
            SMILE CARE | ADMIN
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-light" size="sm" as={Link} to="/">
            Thoát (Về trang chủ User)
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminHeader;
