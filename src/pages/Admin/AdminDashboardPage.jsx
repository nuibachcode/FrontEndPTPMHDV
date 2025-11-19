// src/pages/Admin/AdminDashboardPage.jsx (Đổi tên file cho phù hợp)
import React from "react";
import { Card, Row, Col, Badge, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// Dữ liệu giả định (Giữ nguyên logic và dữ liệu)
const mockData = {
  todayRevenue: 15000000,
  todayOrders: 25,
  monthRevenue: 350000000,
  monthOrders: 580,
  monthTarget: 500000000,
  recentOrders: [
    {
      id: 1001,
      patient: "Nguyễn B",
      total: 500000,
      date: "18/11/2025",
      status: "Hoàn thành",
    },
    {
      id: 1002,
      patient: "Trần C",
      total: 1500000,
      date: "18/11/2025",
      status: "Hoàn thành",
    },
    {
      id: 1003,
      patient: "Lê D",
      total: 300000,
      date: "17/11/2025",
      status: "Chờ thanh toán",
    },
  ],
};

// Hàm định dạng tiền tệ
const formatCurrency = (amount) => {
  return amount.toLocaleString("vi-VN") + " VNĐ";
};

const AdminDashboardPage = () => {
  const progressPercent = (mockData.monthRevenue / mockData.monthTarget) * 100;

  return (
    <div className="admin-dashboard">
      {/* Đổi nhãn từ Manager sang Admin */}
      <h3 className="mb-4 text-warning fw-bold">
        📊 Tổng quan Hiệu suất Kinh doanh
      </h3>
      <p className="text-secondary mb-4">
        Theo dõi các chỉ số tài chính và vận hành quan trọng của phòng khám.
      </p>

      {/* --- 1. Thẻ KPI Tổng hợp --- */}
      <Row className="mb-4">
        {/* Doanh thu Hôm nay */}
        <Col md={3}>
          <Card className="shadow-sm border-start border-primary border-5 h-100">
            <Card.Body>
              <Card.Title className="text-primary fw-bold">
                Doanh thu Hôm nay
              </Card.Title>
              <Card.Text className="fs-3 fw-bolder">
                {formatCurrency(mockData.todayRevenue)}
              </Card.Text>
              <span className="small text-muted">
                +{mockData.todayOrders} đơn hàng
              </span>
            </Card.Body>
          </Card>
        </Col>

        {/* Doanh thu Tháng này */}
        <Col md={4}>
          <Card className="shadow-sm border-start border-warning border-5 h-100">
            <Card.Body>
              <Card.Title className="text-warning fw-bold">
                Doanh thu Tháng này
              </Card.Title>
              <Card.Text className="fs-3 fw-bolder">
                {formatCurrency(mockData.monthRevenue)}
              </Card.Text>
              <div className="progress mt-2" style={{ height: "8px" }}>
                <div
                  className="progress-bar bg-warning"
                  role="progressbar"
                  style={{ width: `${Math.min(progressPercent, 100)}%` }}
                  aria-valuenow={progressPercent}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <span className="small text-muted">
                Đạt {progressPercent.toFixed(1)}% mục tiêu (
                {formatCurrency(mockData.monthTarget)})
              </span>
            </Card.Body>
          </Card>
        </Col>

        {/* Tổng số Đơn hàng trong Tháng */}
        <Col md={3}>
          <Card className="shadow-sm border-start border-success border-5 h-100">
            <Card.Body>
              <Card.Title className="text-success fw-bold">
                Tổng đơn Tháng
              </Card.Title>
              <Card.Text className="fs-3 fw-bolder">
                {mockData.monthOrders} đơn
              </Card.Text>
              <span className="small text-muted">Chỉ số vận hành cốt lõi</span>
            </Card.Body>
          </Card>
        </Col>

        {/* Thẻ Quản lý Bác sĩ (vẫn dùng link admin) */}
        <Col md={2}>
          <Card className="shadow-sm border-start border-info border-5 h-100">
            <Card.Body>
              <Card.Title className="text-info fw-bold">Bác sĩ</Card.Title>
              <Card.Text className="fs-4 fw-bolder">5 Đang hoạt động</Card.Text>
              {/* Đổi link về /admin/doctors */}
              <Button size="sm" variant="info" as={Link} to="/admin/doctors">
                Quản lý ngay
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* --- 2. Bảng Đơn hàng Gần đây --- */}
      <Card className="shadow-sm">
        <Card.Header className="bg-white fw-bold d-flex justify-content-between align-items-center">
          Giao dịch Gần đây
          {/* Đổi link về /admin/appointments */}
          <Button
            variant="outline-primary"
            size="sm"
            as={Link}
            to="/admin/appointments"
          >
            <i className="bi bi-arrow-right"></i> Xem tất cả
          </Button>
        </Card.Header>
        <Card.Body>
          <Table hover responsive>
            <thead>
              <tr>
                <th>Mã Đơn</th>
                <th>Bệnh nhân</th>
                <th>Ngày</th>
                <th className="text-end">Tổng tiền</th>
                <th className="text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {mockData.recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.patient}</td>
                  <td>{order.date}</td>
                  <td className="text-end fw-semibold text-danger">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="text-center">
                    <Badge
                      bg={
                        order.status === "Hoàn thành" ? "success" : "secondary"
                      }
                    >
                      {order.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
