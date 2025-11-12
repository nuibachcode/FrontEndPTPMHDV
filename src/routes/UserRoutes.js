// src/routes/UserRoutes.js

import DefaultLayout from "../layout/DefaultLayout";

// Import Pages
import HomePage from "../pages/Public/HomePage";
import BookingFlow from "../pages/Public/BookingFlow";
import Login from "../pages/Public/Login";
import Register from "../pages/Public/Register";
import PatientProfile from "../pages/Patient/PatientProfile";
import BookingHistory from "../pages/Patient/BookingHistory";
import ForgotPassword from "../pages/Public/ForgotPassword";
// Định nghĩa các Routes cho Người dùng (Patient/Public)
export const UserRoutes = [
  // Trang công khai (sử dụng DefaultLayout)
  {
    path: "/",
    element: HomePage,
    layout: DefaultLayout,
    isPrivate: false,
  },
  {
    path: "/booking",
    element: BookingFlow,
    layout: DefaultLayout,
    isPrivate: false,
  },
  // Các trang Auth (Không dùng Layout chung)
  {
    path: "/account/login",
    element: Login,
    layout: null,
    isPrivate: false,
  },
  {
    path: "/account/register",
    element: Register,
    layout: null,
    isPrivate: false,
  },
  {
    path: "/account/forgot-password",
    element: ForgotPassword, // Component mới
    layout: null,
    isPrivate: false,
  },
  // Trang Bệnh nhân đã đăng nhập
  {
    path: "/patient/profile",
    element: PatientProfile,
    layout: DefaultLayout,
    isPrivate: true,
    roles: ["patient", "doctor", "admin"],
  },
  {
    path: "/patient/history",
    element: BookingHistory,
    layout: DefaultLayout,
    isPrivate: true,
    roles: ["patient"],
  },
];

// File này sẽ được export và import vào index.js
