import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Table,
  Alert,
  Badge,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

const mockExistingSchedules = [
  {
    id: 201,
    date: "2025-12-10",
    timeStart: "08:00",
    timeEnd: "12:00",
    maxPatient: 5,
    status: "Active",
  },
  {
    id: 202,
    date: "2025-12-11",
    timeStart: "13:00",
    timeEnd: "17:00",
    maxPatient: 4,
    status: "Active",
  },
];

const ScheduleManagement = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeRange, setTimeRange] = useState({ start: "", end: "" });
  const [maxPatient, setMaxPatient] = useState(3);
  const [schedules, setSchedules] = useState(mockExistingSchedules);

  const handleCreateSchedule = (e) => {
    e.preventDefault();
    if (!selectedDate || !timeRange.start || !timeRange.end) {
      alert("Vui lòng điền đủ thông tin lịch làm việc.");
      return;
    }

    const newSchedule = {
      id: Date.now(),
      date: selectedDate.toISOString().split("T")[0],
      timeStart: timeRange.start,
      timeEnd: timeRange.end,
      maxPatient: parseInt(maxPatient),
      status: "Pending", // Có thể cần Admin duyệt
    };

    // Logic gọi API để CREATE Schedule (Bảng Schedule)
    setSchedules([...schedules, newSchedule]);
    alert("Lịch làm việc đã được đăng ký thành công!");
  };

  // Logic gọi API để DELETE Schedule
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lịch này không?")) {
      setSchedules(schedules.filter((s) => s.id !== id));
    }
  };

  return (
    <Container fluid>
      <h2 className="text-primary fw-bold mb-4">Quản lý Lịch Làm Việc</h2>

      {/* Form Đăng ký Lịch */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Header className="bg-success text-white fw-bold">
          Đăng Ký Ca Làm Việc Mới
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleCreateSchedule}>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Chọn Ngày</Form.Label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Chọn ngày"
                    className="form-control"
                    minDate={new Date()}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Bắt đầu</Form.Label>
                  <Form.Select
                    value={timeRange.start}
                    onChange={(e) =>
                      setTimeRange({ ...timeRange, start: e.target.value })
                    }
                    required
                  >
                    <option value="">-- Giờ --</option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Kết thúc</Form.Label>
                  <Form.Select
                    value={timeRange.end}
                    onChange={(e) =>
                      setTimeRange({ ...timeRange, end: e.target.value })
                    }
                    required
                  >
                    <option value="">-- Giờ --</option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Max Bệnh nhân</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    max="10"
                    value={maxPatient}
                    onChange={(e) => setMaxPatient(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="text-end">
              <Button variant="primary" type="submit">
                Đăng Ký Lịch
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Danh sách Lịch đã đăng ký */}
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-light fw-bold">
          Lịch Làm Việc Đã Đăng Ký
        </Card.Header>
        <Card.Body>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Thời gian</th>
                <th>Max Bệnh nhân</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => (
                <tr key={schedule.id}>
                  <td>{schedule.date}</td>
                  <td>
                    {schedule.timeStart} - {schedule.timeEnd}
                  </td>
                  <td>{schedule.maxPatient}</td>
                  <td>
                    <Badge
                      bg={schedule.status === "Active" ? "info" : "secondary"}
                    >
                      {schedule.status}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(schedule.id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ScheduleManagement;
