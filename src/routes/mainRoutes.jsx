import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/404Page/404Page";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

export default [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "*", element: <NotFoundPage /> },
];
