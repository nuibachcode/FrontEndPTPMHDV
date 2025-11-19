// src/routes/DoctorRoutes.js

import DoctorDashboard from "../pages/Doctor/Dashboard";
import ScheduleManagement from "../pages/Doctor/ScheduleManagement";
import DoctorLayout from "../layout/DoctorLayout";
import Profile from "../pages/Doctor/DoctorProfilePage";
import PatientRecordsPage from "../pages/Doctor/PatientRecordsPage";
export const DoctorRoutes = [
  {
    path: "/doctor",
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
  {
    path: "/doctor/profile",
    element: Profile,
    layout: DoctorLayout,
    isPrivate: true,
    roles: ["doctor"], // Chỉ Bác sĩ mới được quản lý lịch
  },
  {
    path: "/doctor/patient-records",
    element: PatientRecordsPage,
    layout: DoctorLayout,
    isPrivate: true,
    roles: ["doctor"], // Chỉ Bác sĩ mới được quản lý lịch
  },
];
