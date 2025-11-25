import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Table,
  Form,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import axios from "axios";

const SpecialtyManagement = () => {
  const [specialties, setSpecialties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [currentSpecialty, setCurrentSpecialty] = useState({
    id: null,
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const fetchSpecialties = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:8081/api/specialties");
      if (res.data.EC === 0) {
        // Map dữ liệu: nameSpecialty -> name
        const mappedData = res.data.DT.map((item) => ({
          id: item.id,
          name: item.nameSpecialty,
          description: item.description,
        }));
        setSpecialties(mappedData);
      }
    } catch (e) {
      console.log("Lỗi lấy chuyên khoa:", e);
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    setShowModal(false);
    setCurrentSpecialty({ id: null, name: "", description: "" });
  };

  const handleShow = (specialty = null) => {
    if (specialty) setCurrentSpecialty(specialty);
    else setCurrentSpecialty({ id: null, name: "", description: "" });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      let res;
      const payload = {
        name: currentSpecialty.name,
        description: currentSpecialty.description,
      };

      if (currentSpecialty.id) {
        // UPDATE
        res = await axios.put(
          `http://localhost:8081/api/specialties/${currentSpecialty.id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // CREATE
        res = await axios.post(
          "http://localhost:8081/api/specialties",
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (res.data.EC === 0) {
        alert(
          currentSpecialty.id ? "Cập nhật thành công!" : "Thêm mới thành công!"
        );
        fetchSpecialties();
        handleClose();
      } else {
        alert(res.data.EM);
      }
    } catch (e) {
      alert("Lỗi hệ thống");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xác nhận xóa chuyên khoa này?")) {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.delete(
          `http://localhost:8081/api/specialties/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.EC === 0) {
          alert("Xóa thành công!");
          fetchSpecialties();
        } else {
          alert(res.data.EM);
        }
      } catch (e) {
        alert("Lỗi khi xóa");
      }
    }
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold m-0">
          <i className="bi bi-heart-pulse-fill me-2"></i>Quản lý Chuyên khoa
        </h2>
        <Button variant="success" onClick={() => handleShow()}>
          <i className="bi bi-plus-circle me-2"></i> Thêm Chuyên khoa
        </Button>
      </div>

      <Card className="shadow-sm border-0">
        <Card.Body className="p-0">
          {isLoading ? (
            <div className="text-center p-5">
              <Spinner animation="border" />
            </div>
          ) : (
            <Table hover responsive className="align-middle m-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">ID</th>
                  <th>Tên Chuyên khoa</th>
                  <th>Mô tả</th>
                  <th className="text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {specialties.map((spec) => (
                  <tr key={spec.id}>
                    <td className="ps-4">#{spec.id}</td>
                    <td className="fw-bold text-primary">{spec.name}</td>
                    <td>{spec.description}</td>
                    <td className="text-center">
                      <Button
                        variant="light"
                        size="sm"
                        className="me-2 text-primary border-primary"
                        onClick={() => handleShow(spec)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                      <Button
                        variant="light"
                        size="sm"
                        className="text-danger border-danger"
                        onClick={() => handleDelete(spec.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            {currentSpecialty.id ? "Cập nhật" : "Thêm mới"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="p-4">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">
                Tên Chuyên khoa <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={currentSpecialty.name}
                onChange={(e) =>
                  setCurrentSpecialty({
                    ...currentSpecialty,
                    name: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentSpecialty.description}
                onChange={(e) =>
                  setCurrentSpecialty({
                    ...currentSpecialty,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Lưu Thay Đổi
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default SpecialtyManagement;
