// src/routes/index.js

import NotFoundPage from "../pages/Public/NotFoundPage";

// Import các file routes con
import { UserRoutes } from "./UserRoutes";
import { DoctorRoutes } from "./DoctorRoutes"; // Đã tạo
import { AdminRoutes } from "./AdminRoutes"; // Đã tạo

// Tập hợp tất cả các routes lại
const allRoutes = [
  // LƯU Ý: Phải đảm bảo DoctorRoutes và AdminRoutes là các mảng được export
  ...UserRoutes,
  ...DoctorRoutes,
  ...AdminRoutes,

  // Tuyến đường cuối cùng để bắt lỗi 404
  {
    path: "*",
    element: NotFoundPage,
    layout: null,
    isPrivate: false,
  },
];

export default allRoutes;
