// src/pages/Admin/DetailedReportsPage.jsx
import React, { useState } from 'react';
import { Card, Table, Form, Row, Col, Button, Badge } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Dữ liệu báo cáo giả định
const mockReportData = [
    { service: 'Niềng răng sứ', doctor: 'Nguyễn Văn A', revenue: 50000000, count: 2, specialty: 'Chỉnh Nha' },
    { service: 'Trồng Implant', doctor: 'Lê Thị B', revenue: 80000000, count: 5, specialty: 'Phục hình' },
    { service: 'Cạo vôi răng', doctor: 'Trần Văn C', revenue: 5000000, count: 10, specialty: 'Nha Tổng Quát' },
    { service: 'Tẩy trắng', doctor: 'Nguyễn Văn A', revenue: 15000000, count: 4, specialty: 'Chỉnh Nha' },
];

const DetailedReportsPage = () => {
    const [startDate, setStartDate] = useState(new Date(2025, 10, 1)); // Tháng trước
    const [endDate, setEndDate] = useState(new Date()); // Hôm nay
    const [filterSpecialty, setFilterSpecialty] = useState('');

    // Tổng hợp báo cáo (dữ liệu mock không cần lọc phức tạp, chỉ tính tổng)
    const totalRevenue = mockReportData.reduce((sum, item) => sum + item.revenue, 0);
    const totalCount = mockReportData.reduce((sum, item) => sum + item.count, 0);

    const formatCurrency = (amount) => amount.toLocaleString('vi-VN') + ' VNĐ';

    return (
        <div className="detailed-reports-page">
            <h3 className="mb-4 text-warning fw-bold">📈 Báo cáo Chi tiết</h3>
            <p className="text-secondary mb-4">Phân tích hiệu suất doanh thu theo dịch vụ, bác sĩ và khoảng thời gian.</p>

            {/* --- Thanh Lọc Báo cáo --- */}
            <Card className="shadow-sm mb-4">
                <Card.Body>
                    <Form>
                        <Row className="align-items-end">
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label className="small fw-semibold">Từ ngày</Form.Label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label className="small fw-semibold">Đến ngày</Form.Label>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label className="small fw-semibold">Chuyên khoa</Form.Label>
                                    <Form.Control as="select" value={filterSpecialty} onChange={(e) => setFilterSpecialty(e.target.value)}>
                                        <option value="">Tất cả</option>
                                        <option>Chỉnh Nha</option>
                                        <option>Nha Tổng Quát</option>
                                        <option>Phục hình</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Button variant="primary" className="w-100">
                                    <i className="bi bi-filter"></i> Lọc Báo cáo
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>

            {/* --- Tổng kết Báo cáo --- */}
            <Row className="mb-4">
                <Col md={6}>
                    <Card className="shadow-sm border-start border-success border-5 h-100">
                        <Card.Body>
                            <Card.Title className="text-success fw-bold">Tổng Doanh thu ($)</Card.Title>
                            <Card.Text className="fs-3 fw-bolder">
                                {formatCurrency(totalRevenue)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="shadow-sm border-start border-primary border-5 h-100">
                        <Card.Body>
                            <Card.Title className="text-primary fw-bold">Tổng số Đơn hàng</Card.Title>
                            <Card.Text className="fs-3 fw-bolder">
                                {totalCount} đơn
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* --- Bảng Chi tiết Báo cáo --- */}
            <Card className="shadow-sm">
                <Card.Header className="bg-white fw-bold">Báo cáo Doanh thu theo Dịch vụ</Card.Header>
                <Card.Body>
                    <Table responsive striped hover className="mb-0">
                        <thead>
                            <tr>
                                <th>Dịch vụ</th>
                                <th>Chuyên khoa</th>
                                <th>Bác sĩ thực hiện</th>
                                <th>Số lượng</th>
                                <th className="text-end">Doanh thu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockReportData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.service}</td>
                                    <td><Badge bg="info">{data.specialty}</Badge></td>
                                    <td>{data.doctor}</td>
                                    <td>{data.count}</td>
                                    <td className="text-end fw-semibold text-danger">{formatCurrency(data.revenue)}</td>
                                </tr>
                            ))}
                            <tr className="fw-bold bg-light">
                                <td colSpan="4">TỔNG CỘNG</td>
                                <td className="text-end text-danger">{formatCurrency(totalRevenue)}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
};

export default DetailedReportsPage;