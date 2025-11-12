// src/routes/AdminRoutes.js

import AdminDashboard from "../pages/Admin/Dashboard"; // Cần tạo thêm file này
import UserManagement from "../pages/Admin/UserManagement";
import SpecialtyManagement from "../pages/Admin/SpecialtyManagement";
import ServiceManagement from "../pages/Admin/ServiceManagement";
import BookingAdminManagement from "../pages/Admin/BookingAdminManagement";
import AdminLayout from "../layout/AdminLayout";

export const AdminRoutes = [
  {
    path: "/admin/dashboard",
    element: AdminDashboard,
    layout: AdminLayout,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/admin/users",
    element: UserManagement,
    layout: AdminLayout,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/admin/specialties",
    element: SpecialtyManagement,
    layout: AdminLayout,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/admin/services",
    element: ServiceManagement,
    layout: AdminLayout,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/admin/bookings",
    element: BookingAdminManagement,
    layout: AdminLayout,
    isPrivate: true,
    roles: ["admin"],
  },
];
