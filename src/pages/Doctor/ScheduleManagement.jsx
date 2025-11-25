import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Table,
  Badge,
  Alert,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import moment from "moment"; // Nhớ cài moment: npm install moment

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

const ScheduleManagement = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeRange, setTimeRange] = useState({ start: "", end: "" });
  const [maxPatient, setMaxPatient] = useState(5);
  const [schedules, setSchedules] = useState([]);
  const [statusMsg, setStatusMsg] = useState(null); // Thông báo

  const user = JSON.parse(localStorage.getItem("user"));

  // 1. Load danh sách lịch khi vào trang
  useEffect(() => {
    if (user && user.id) {
      fetchSchedules();
    }
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8081/api/schedules/doctor?doctorId=${user.id}`
      );
      if (res.data.EC === 0) {
        setSchedules(res.data.DT);
      }
    } catch (e) {
      console.log("Lỗi lấy lịch:", e);
    }
  };

  const handleCreateSchedule = async (e) => {
    e.preventDefault();
    if (!selectedDate || !timeRange.start || !timeRange.end) {
      alert("Vui lòng điền đủ thông tin!");
      return;
    }

    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");

    try {
      const payload = {
        doctorId: user.id,
        dateWork: formattedDate,
        timeStart: timeRange.start,
        timeEnd: timeRange.end,
        maxPatient: parseInt(maxPatient),
        description: "Lịch khám bệnh",
      };

      // --- LẤY TOKEN TỪ LOCALSTORAGE ---
      // Kiểm tra xem lúc Login bạn lưu token tên là gì (token, accessToken, hay nằm trong object user)
      const token = localStorage.getItem("token");

      // Gọi API tạo lịch kèm Header
      const res = await axios.post(
        "http://localhost:8081/api/schedules",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token kèm theo
          },
        }
      );

      if (res.data.EC === 0) {
        setStatusMsg({ type: "success", text: "Đăng ký lịch thành công!" });
        fetchSchedules();
      } else {
        setStatusMsg({ type: "danger", text: res.data.EM });
      }
    } catch (error) {
      console.log("Lỗi tạo lịch:", error);
      // Log lỗi chi tiết từ backend để dễ debug
      if (error.response) {
        console.log(error.response.data);
        if (error.response.status === 401)
          alert("Hết phiên đăng nhập hoặc chưa login!");
      }
      setStatusMsg({ type: "danger", text: "Lỗi hệ thống" });
    }

    setTimeout(() => setStatusMsg(null), 3000);
  };
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa lịch này?")) {
      try {
        const token = localStorage.getItem("token"); // Lấy token

        const res = await axios.delete(
          `http://localhost:8081/api/schedules/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gửi token
            },
          }
        );

        if (res.data.EC === 0) {
          setStatusMsg({ type: "success", text: "Xóa lịch thành công" });
          fetchSchedules();
        } else {
          alert(res.data.EM);
        }
      } catch (e) {
        console.log("Lỗi xóa:", e);
        if (e.response && e.response.status === 401) {
          alert("Bạn không có quyền xóa hoặc chưa đăng nhập!");
        }
      }
    }
  };

  return (
    <Container fluid className="py-4">
      <h2 className="text-primary fw-bold mb-4">
        <i className="bi bi-calendar-check me-2"></i>Quản lý Lịch Làm Việc
      </h2>

      {statusMsg && <Alert variant={statusMsg.type}>{statusMsg.text}</Alert>}

      {/* Form Đăng ký */}
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
                    max="20"
                    value={maxPatient}
                    onChange={(e) => setMaxPatient(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="text-end">
              <Button variant="primary" type="submit">
                <i className="bi bi-plus-circle me-1"></i> Đăng Ký Lịch
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Danh sách Lịch */}
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-light fw-bold">
          Danh Sách Lịch Đã Đăng Ký
        </Card.Header>
        <Card.Body>
          <Table striped hover responsive className="align-middle">
            <thead>
              <tr>
                <th>Ngày làm việc</th>
                <th>Thời gian</th>
                <th>Max Bệnh nhân</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {schedules && schedules.length > 0 ? (
                schedules.map((schedule) => (
                  <tr key={schedule.id}>
                    <td>{moment(schedule.dateWork).format("DD/MM/YYYY")}</td>
                    <td className="fw-bold text-primary">
                      {schedule.timeStart} - {schedule.timeEnd}
                    </td>
                    <td>{schedule.maxPatient}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(schedule.id)}
                      >
                        <i className="bi bi-trash"></i> Xóa
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    Chưa có lịch làm việc nào.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ScheduleManagement;
