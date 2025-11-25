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
    roles: [1, 2],
  },

  {
    path: "/doctor/schedule",
    element: ScheduleManagement,
    layout: DoctorLayout,
    isPrivate: true,
    roles: [2],
  },
  {
    path: "/doctor/profile",
    element: Profile,
    layout: DoctorLayout,
    isPrivate: true,
    roles: [2],
  },
  {
    path: "/doctor/patient-records",
    element: PatientRecordsPage,
    layout: DoctorLayout,
    isPrivate: true,
    roles: [2],
  },
];
