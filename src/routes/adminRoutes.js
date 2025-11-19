// src/routes/AdminRoutes.js

import AdminDashboard from "../pages/Admin/AdminDashboardPage"; // Cần tạo thêm file này

import SpecialtyManagement from "../pages/Admin/SpecialtyManagement";
import ServiceManagement from "../pages/Admin/ServiceManagement";

import AdminLayout from "../layout/AdminLayout";
import DoctorManagementPage from "../pages/Admin/DoctorManagementPage";
import DetailedReportsPage from "../pages/Admin/DetailedReportsPage";

export const AdminRoutes = [
  {
    path: "/admin",
    element: AdminDashboard,
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
    path: "/admin/doctors",
    element: DoctorManagementPage,
    layout: AdminLayout,
    isPrivate: true,
    rules: ["Admin"],
  },
  {
    path: "/admin/reports",
    element: DetailedReportsPage,
    layout: AdminLayout,
    isPrivate: true,
    rules: ["Admin"],
  },
  {
    path: "/admin/services",
    element: ServiceManagement,
    layout: AdminLayout,
    isPrivate: true,
    roles: ["admin"],
  },
];
