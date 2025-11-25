import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Badge,
  Form,
  InputGroup,
  Row,
  Col,
  Modal,
  Spinner,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import axios from "axios";

const DoctorManagementPage = () => {
  // --- STATE ---
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]); // List chuyên khoa cho dropdown
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    password: "",
    fullName: "",
    phone: "",
    address: "",
    specialtyId: "",
  });

  // --- INIT DATA ---
  useEffect(() => {
    fetchDoctors();
    fetchSpecialties();
  }, []);

  // 1. Lấy danh sách Bác sĩ
  const fetchDoctors = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8081/api/admin/doctors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.EC === 0) {
        const uniqueDoctors = [];
        const map = new Map();
        for (const item of res.data.DT) {
          if (!map.has(item.id)) {
            map.set(item.id, true);
            uniqueDoctors.push(item);
          }
        }
        setDoctors(uniqueDoctors);
      }
    } catch (error) {
      console.log("Lỗi lấy ds bác sĩ:", error);
    }
    setIsLoading(false);
  };

  // 2. Lấy danh sách Chuyên khoa (để nạp vào Form thêm mới)
  const fetchSpecialties = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/specialties");
      if (res.data.EC === 0) setSpecialties(res.data.DT);
    } catch (error) {
      console.log(error);
    }
  };

  // --- HANDLERS ---

  // Xử lý Search (Client-side filtering)
  const filteredDoctors = doctors.filter((doc) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      doc.fullName.toLowerCase().includes(searchLower) ||
      doc.email.toLowerCase().includes(searchLower) ||
      (doc.phone && doc.phone.includes(searchTerm))
    );
  });

  // Reset Form
  const resetForm = () => {
    setFormData({
      id: "",
      email: "",
      password: "",
      fullName: "",
      phone: "",
      address: "",
      specialtyId: "",
    });
    setIsEditing(false);
  };

  // Mở Modal Thêm
  const handleShowAdd = () => {
    resetForm();
    setShowModal(true);
  };

  // Mở Modal Sửa (Fill data vào form)

  // Xử lý Submit Form (Tạo mới / Cập nhật)
  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      let res;
      if (isEditing) {
        // TODO: Gọi API Update Doctor (nếu bạn đã viết API admin update user)
        alert("Chức năng cập nhật đang phát triển ở Backend!");
        // res = await axios.put(...)
      } else {
        // Gọi API Tạo mới
        res = await axios.post(
          "http://localhost:8081/api/admin/doctors",
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      if (res && res.data.EC === 0) {
        alert(isEditing ? "Cập nhật thành công!" : "Thêm bác sĩ thành công!");
        setShowModal(false);
        fetchDoctors(); // Reload lại danh sách
      } else if (res) {
        alert(res.data.EM);
      }
    } catch (error) {
      console.log("Lỗi save:", error);
      alert("Lỗi hệ thống");
    }
  };

  // --- UI COMPONENTS ---

  // Avatar chữ cái đầu (cho đẹp)
  const AvatarCircle = ({ name }) => {
    const firstLetter = name ? name.charAt(0).toUpperCase() : "D";
    return (
      <div
        className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-bold me-3 shadow-sm"
        style={{ width: "45px", height: "45px", fontSize: "1.2rem" }}
      >
        {firstLetter}
      </div>
    );
  };

  return (
    <div className="doctor-management container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="text-primary fw-bold m-0">
            <i className="bi bi-people-fill me-2"></i>Quản Lý Đội Ngũ Bác Sĩ
          </h3>
          <p className="text-muted m-0 mt-1">
            Danh sách và thông tin chi tiết các bác sĩ trong hệ thống
          </p>
        </div>
        <Button
          variant="success"
          className="fw-bold shadow-sm px-4"
          onClick={handleShowAdd}
        >
          <i className="bi bi-person-plus-fill me-2"></i> Thêm Bác Sĩ
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <InputGroup>
            <InputGroup.Text className="bg-white border-end-0">
              <i className="bi bi-search text-muted"></i>
            </InputGroup.Text>
            <Form.Control
              placeholder="Tìm kiếm theo Tên, Email hoặc Số điện thoại..."
              className="border-start-0 ps-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Card.Body>
      </Card>

      {/* Table List */}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          {isLoading ? (
            <div className="text-center p-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Table hover responsive className="align-middle m-0">
              <thead className="bg-light text-secondary">
                <tr>
                  <th className="ps-4 py-3">Bác sĩ</th>
                  <th>Chuyên khoa</th>
                  <th>Liên hệ</th>
                  <th>Địa chỉ</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doc) => (
                    <tr key={doc.id}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center">
                          <AvatarCircle name={doc.fullName} />
                          <div>
                            <div className="fw-bold text-dark">
                              {doc.fullName}
                            </div>
                            <small className="text-muted">{doc.email}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        {doc.DoctorInfo && doc.DoctorInfo.Specialty ? (
                          <Badge
                            bg="info"
                            text="dark"
                            className="px-3 py-2 rounded-pill"
                          >
                            {doc.DoctorInfo.Specialty.nameSpecialty}
                          </Badge>
                        ) : (
                          <span className="text-muted fst-italic small">
                            Chưa cập nhật
                          </span>
                        )}
                      </td>
                      <td>
                        {doc.phone ? (
                          <span className="fw-semibold">{doc.phone}</span>
                        ) : (
                          <span className="text-muted">--</span>
                        )}
                      </td>
                      <td>
                        <span
                          className="text-muted small d-inline-block text-truncate"
                          style={{ maxWidth: "150px" }}
                          title={doc.address}
                        >
                          {doc.address || "--"}
                        </span>
                      </td>
                      <td>
                        {/* Giả sử có trường isActive, nếu không có thì mặc định Active */}
                        <Badge
                          bg={doc.isActive === false ? "secondary" : "success"}
                          className="dot-badge"
                        >
                          {doc.isActive === false ? "Đã khóa" : "Hoạt động"}
                        </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      Không tìm thấy bác sĩ nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* --- MODAL THÊM / SỬA --- */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title className="fw-bold">
            {isEditing ? "Cập Nhật Thông Tin Bác Sĩ" : "Thêm Bác Sĩ Mới"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body className="p-4">
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    Họ và Tên <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="VD: Nguyễn Văn A"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    Email Đăng nhập <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="doctor@gmail.com"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={isEditing} // Không cho sửa email khi edit
                  />
                </Form.Group>
              </Col>

              {!isEditing && (
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Mật khẩu</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Mặc định: 123456"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <Form.Text className="text-muted">
                      Nếu để trống, mật khẩu mặc định là 123456
                    </Form.Text>
                  </Form.Group>
                </Col>
              )}

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Số điện thoại</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="09xxxx"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Chuyên khoa</Form.Label>
                  <Form.Select
                    value={formData.specialtyId}
                    onChange={(e) =>
                      setFormData({ ...formData, specialtyId: e.target.value })
                    }
                  >
                    <option value="">-- Chọn chuyên khoa --</option>
                    {specialties.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.nameSpecialty}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Địa chỉ</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Địa chỉ phòng khám / nhà riêng"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Hủy bỏ
            </Button>
            <Button variant="primary" type="submit" className="fw-bold">
              {isEditing ? "Lưu Thay Đổi" : "Tạo Tài Khoản"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default DoctorManagementPage;
