// src/routes/DoctorRoutes.js

import DoctorDashboard from "../pages/Doctor/Dashboard";
import ScheduleManagement from "../pages/Doctor/ScheduleManagement";
import DoctorLayout from "../layout/DoctorLayout";

export const DoctorRoutes = [
  {
    path: "/doctor/dashboard",
    element: DoctorDashboard,
    layout: DoctorLayout,
    isPrivate: true,
    roles: ["doctor", "admin"], // Bác sĩ và Admin có thể xem
  },
  {
    path: "/doctor/schedule",
    element: ScheduleManagement,
    layout: DoctorLayout,
    isPrivate: true,
    roles: ["doctor"], // Chỉ Bác sĩ mới được quản lý lịch
  },
];
