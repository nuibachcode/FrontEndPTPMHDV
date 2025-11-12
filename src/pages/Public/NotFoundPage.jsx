// src/pages/NotFoundPage.jsx

const NotFoundPage = () => {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>404 - Không tìm thấy trang</h1>
      <p>
        Trang bạn đang tìm kiếm không tồn tại. Vui lòng kiểm tra lại đường dẫn.
      </p>
      <a href="/" style={{ textDecoration: "none", color: "blue" }}>
        Quay về Trang Chủ
      </a>
    </div>
  );
};

export default NotFoundPage;
