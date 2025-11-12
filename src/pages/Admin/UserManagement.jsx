import React, { useState } from "react";
import { Container, Card, Table, Badge, Button, Form } from "react-bootstrap";

// Giả định dữ liệu User và Role
const mockUsers = [
  {
    id: 1,
    name: "Admin Cao Nhất",
    email: "admin@abc.com",
    roleId: 3,
    roleName: "admin",
    isActive: true,
  },
  {
    id: 2,
    name: "Nguyễn Văn A",
    email: "bacsi@abc.com",
    roleId: 2,
    roleName: "doctor",
    isActive: true,
  },
  {
    id: 3,
    name: "Trần Văn Khách",
    email: "khach@example.com",
    roleId: 1,
    roleName: "patient",
    isActive: true,
  },
  {
    id: 4,
    name: "Lê Hữu Tín",
    email: "tin@example.com",
    roleId: 1,
    roleName: "patient",
    isActive: false,
  },
];
const mockRoles = [
  { id: 1, name: "patient" },
  { id: 2, name: "doctor" },
  { id: 3, name: "admin" },
];

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [editingUser, setEditingUser] = useState(null);

  const handleUpdateRole = (userId, newRoleId) => {
    const newRoleName = mockRoles.find(
      (r) => r.id === parseInt(newRoleId)
    ).name;
    // Logic gọi API để UPDATE User SET RoleId = newRoleId
    setUsers(
      users.map((u) =>
        u.id === userId
          ? { ...u, roleId: parseInt(newRoleId), roleName: newRoleName }
          : u
      )
    );
    setEditingUser(null);
  };

  const handleLockAccount = (userId) => {
    // Logic gọi API để Khóa/Mở khóa tài khoản (UPDATE User SET isActive = false)
    setUsers(
      users.map((u) => (u.id === userId ? { ...u, isActive: !u.isActive } : u))
    );
  };

  return (
    <Container fluid>
      <h2 className="text-primary fw-bold mb-4">
        Quản lý Tài khoản & Phân quyền
      </h2>
      <Card className="shadow-sm border-0">
        <Card.Body>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên/Email</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.name} <br />
                    <small className="text-muted">{user.email}</small>
                  </td>
                  <td>
                    {editingUser === user.id ? (
                      <Form.Select
                        defaultValue={user.roleId}
                        onChange={(e) =>
                          handleUpdateRole(user.id, e.target.value)
                        }
                      >
                        {mockRoles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name.toUpperCase()}
                          </option>
                        ))}
                      </Form.Select>
                    ) : (
                      <Badge
                        bg={
                          user.roleName === "admin"
                            ? "danger"
                            : user.roleName === "doctor"
                            ? "success"
                            : "primary"
                        }
                      >
                        {user.roleName.toUpperCase()}
                      </Badge>
                    )}
                  </td>
                  <td>
                    <Badge bg={user.isActive ? "success" : "secondary"}>
                      {user.isActive ? "Hoạt động" : "Đã khóa"}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => setEditingUser(user.id)}
                      disabled={editingUser === user.id}
                    >
                      Phân quyền
                    </Button>
                    <Button
                      variant={user.isActive ? "secondary" : "success"}
                      size="sm"
                      onClick={() => handleLockAccount(user.id)}
                    >
                      {user.isActive ? "Khóa" : "Mở khóa"}
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

export default UserManagement;
