import React, { useEffect, useState } from "react";
import { Card, Row, Col, Badge, Table, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const AdminDashboardPage = () => {
  // State lưu dữ liệu thật
  const [stats, setStats] = useState({
    todayRevenue: 0,
    todayOrders: 0,
    monthRevenue: 0,
    monthOrders: 0,
    monthTarget: 500000000, // Target cứng
    countDoctors: 0,
  });
  const [recentPayments, setRecentPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // Gọi API qua Gateway (Port 8080)
      const [resStats, resRecent] = await Promise.all([
        axios.get("http://localhost:8080/api/admin/stats", config),
        axios.get("http://localhost:8080/api/admin/payments/recent", config),
      ]);

      if (resStats.data.EC === 0) {
        const data = resStats.data.DT;
        setStats((prev) => ({
          ...prev,
          todayRevenue: Number(data.revenueToday || 0),
          monthRevenue: Number(data.revenueMonth || 0),
          monthOrders: Number(data.totalOrders || 0),
          countDoctors: Number(data.totalDoctors || 0),
        }));
      }

      if (resRecent.data.EC === 0) {
        setRecentPayments(resRecent.data.DT || []);
      }
    } catch (error) {
      console.log("Lỗi lấy dashboard:", error);
      // Fallback: Nếu Gateway lỗi thì thử gọi trực tiếp (chỉ để debug)
      if (error.response && error.response.status === 404) {
          console.warn("Gateway chưa route được, hãy kiểm tra config Gateway.");
      }
    }
    setIsLoading(false);
  };

  const formatCurrency = (amount) => {
    return Number(amount).toLocaleString("vi-VN") + " VNĐ";
  };

  const progressPercent = (stats.monthRevenue / stats.monthTarget) * 100;

  if (isLoading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  return (
    <div className="admin-dashboard">
      <h3 className="mb-4 text-warning fw-bold">
        📊 Tổng quan Hiệu suất Kinh doanh
      </h3>

      {/* --- 1. Thẻ KPI --- */}
      <Row className="mb-4">
        {/* Doanh thu Hôm nay */}
        <Col md={3}>
          <Card className="shadow-sm border-start border-primary border-5 h-100">
            <Card.Body>
              <Card.Title className="text-primary fw-bold">
                Doanh thu Hôm nay
              </Card.Title>
              <Card.Text className="fs-3 fw-bolder">
                {formatCurrency(stats.todayRevenue)}
              </Card.Text>
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
                {formatCurrency(stats.monthRevenue)}
              </Card.Text>
              <div className="progress mt-2" style={{ height: "8px" }}>
                <div
                  className="progress-bar bg-warning"
                  style={{ width: `${Math.min(progressPercent, 100)}%` }}
                ></div>
              </div>
              <span className="small text-muted">
                Đạt {progressPercent.toFixed(1)}% mục tiêu
              </span>
            </Card.Body>
          </Card>
        </Col>

        {/* Tổng đơn */}
        <Col md={3}>
          <Card className="shadow-sm border-start border-success border-5 h-100">
            <Card.Body>
              <Card.Title className="text-success fw-bold">
                Tổng đơn Tháng
              </Card.Title>
              <Card.Text className="fs-3 fw-bolder">
                {stats.monthOrders} đơn
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Bác sĩ */}
        <Col md={2}>
          <Card className="shadow-sm border-start border-info border-5 h-100">
            <Card.Body>
              <Card.Title className="text-info fw-bold">Bác sĩ</Card.Title>
              <Card.Text className="fs-4 fw-bolder">
                {stats.countDoctors} Đang hoạt động
              </Card.Text>
              <Button size="sm" variant="info" as={Link} to="/admin/doctors">
                Quản lý ngay
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* --- 2. Bảng Giao dịch Gần đây --- */}
      <Card className="shadow-sm">
        <Card.Header className="bg-white fw-bold">
          Giao dịch Gần đây
        </Card.Header>
        <Card.Body>
          <Table hover responsive>
            <thead>
              <tr>
                <th>Mã GD</th>
                <th>Bệnh nhân</th>
                <th>Ngày</th>
                <th className="text-end">Số tiền</th>
                <th className="text-center">Hình thức</th>
                <th className="text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((item) => (
                <tr key={item.id}>
                  <td>#{item.id}</td>
                  <td>{item.Booking?.User?.fullName || "Khách vãng lai"}</td>
                  <td>{moment(item.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                  <td className="text-end fw-bold text-danger">
                    {formatCurrency(item.amount)}
                  </td>
                  <td className="text-center">
                    <Badge bg={item.method === "TIEN_MAT" ? "success" : "primary"}>
                      {item.method === "TIEN_MAT" ? "Tiền mặt" : "Chuyển khoản"}
                    </Badge>
                  </td>
                  <td className="text-center">
                    {/* --- ĐÃ SỬA CHỖ NÀY: SO SÁNH CHỮ HOA ĐỂ KHỚP VỚI DATABASE --- */}
                    <Badge
                      bg={(item.status || "").toUpperCase() === "SUCCESS" ? "success" : "warning"}
                      text={(item.status || "").toUpperCase() === "SUCCESS" ? "white" : "dark"}
                    >
                      {(item.status || "").toUpperCase() === "SUCCESS" ? "Thành công" : "Chờ xử lý"}
                    </Badge>
                  </td>
                </tr>
              ))}
              {recentPayments.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">
                    Chưa có giao dịch nào.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;