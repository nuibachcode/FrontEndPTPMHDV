import React from "react";
import anhnen from "../../../assets/images/anhnen.avif";

export default function Hero() {
  return (
    <section
      className="d-flex align-items-center position-relative"
      style={{
        minHeight: "80vh",
        backgroundColor: "#ffffff", // nền trắng
        padding: "80px 0",
        overflow: "hidden",
        color: "#222222",
      }}
    >
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center">
          {/* Text content */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h1
              className="display-5 fw-bold mb-4"
              style={{
                color: "#3ec9c9ff",
                lineHeight: "1.3",
              }}
            >
              Nụ cười tự tin, cuộc sống thoải mái
            </h1>

            <p
              className="lead mb-4"
              style={{
                color: "#000000",
                fontSize: "1.15rem",
              }}
            >
              Chúng tôi mang đến dịch vụ{" "}
              <strong>khám và chăm sóc răng miệng </strong>
              toàn diện - từ kiểm tra định kỳ, tẩy trắng răng đến điều trị
              chuyên sâu. Mỗi khách hàng đều được tư vấn tận tình và điều trị
              bởi đội ngũ
              <strong> bác sĩ nha khoa giàu kinh nghiệm</strong>, cùng hệ thống
              thiết bị hiện đại đạt chuẩn quốc tế.
            </p>

            <div
              className="p-4 rounded-4 shadow-sm"
              style={{
                background: "linear-gradient(90deg, #e0ffff, #f8ffff)",
                borderLeft: "6px solid #3ec9c9ff",
              }}
            >
              <p
                className="mb-0"
                style={{
                  fontStyle: "italic",
                  color: "#333",
                  fontSize: "1.05rem",
                }}
              >
                “Hãy để chúng tôi giúp bạn có một nụ cười khỏe mạnh, trắng sáng
                và tự tin hơn mỗi ngày.”
              </p>
            </div>
          </div>

          {/* Ảnh */}
          <div className="col-lg-6 text-center">
            <div className="p-3 bg-white rounded-4 shadow-lg d-inline-block">
              <img
                src={anhnen}
                alt="Nha sĩ"
                className="img-fluid rounded-4"
                style={{
                  maxHeight: "420px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
