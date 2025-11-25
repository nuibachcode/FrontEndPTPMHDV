// src/routes/AdminRoutes.js

import AdminDashboard from "../pages/Admin/AdminDashboardPage";

import SpecialtyManagement from "../pages/Admin/SpecialtyManagement";
import ServiceManagement from "../pages/Admin/ServiceManagement";

import AdminLayout from "../layout/AdminLayout";
import DoctorManagementPage from "../pages/Admin/DoctorManagementPage";
import DetailedReportsPage from "../pages/Admin/DetailedReportsPage";
import BookingAdminManagement from "../pages/Admin/BookingAdminManagement";
import UserManagement from "../pages/Admin/UserManagement";

export const AdminRoutes = [
  {
    path: "/admin",
    element: AdminDashboard,
    layout: AdminLayout,
    isPrivate: true,
    roles: [1],
  },
  {
    path: "/admin/booking",
    element: BookingAdminManagement,
    layout: AdminLayout,
    isPrivate: true,
    roles: [1],
  },
  {
    path: "/admin/users",
    element: UserManagement,
    layout: AdminLayout,
    isPrivate: true,
    roles: [1],
  },

  {
    path: "/admin/specialties",
    element: SpecialtyManagement,
    layout: AdminLayout,
    isPrivate: true,
    roles: [1],
  },
  {
    path: "/admin/doctors",
    element: DoctorManagementPage,
    layout: AdminLayout,
    isPrivate: true,
    roles: [1],
  },
  {
    path: "/admin/reports",
    element: DetailedReportsPage,
    layout: AdminLayout,
    isPrivate: true,
    roles: [1],
  },
  {
    path: "/admin/services",
    element: ServiceManagement,
    layout: AdminLayout,
    isPrivate: true,
    roles: [1],
  },
];
