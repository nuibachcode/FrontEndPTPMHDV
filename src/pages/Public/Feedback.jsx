import React from "react";

export default function Feedback() {
  // Giả lập dữ liệu đánh giá
  const reviews = [
    {
      id: 1,
      name: "Nguyễn Thị Lan",
      avatar: "https://i.pravatar.cc/100?img=5",
      rating: 5,
      comment:
        "Dịch vụ rất tuyệt vời! Bác sĩ nhẹ nhàng, giải thích chi tiết. Sau khi niềng răng tôi tự tin hơn rất nhiều.",
    },
    {
      id: 2,
      name: "Trần Văn Hùng",
      avatar: "https://i.pravatar.cc/100?img=12",
      rating: 4,
      comment:
        "Phòng khám sạch sẽ, trang thiết bị hiện đại. Chỉ có điều lúc cao điểm phải chờ hơi lâu.",
    },
    {
      id: 3,
      name: "Lê Minh Tú",
      avatar: "https://i.pravatar.cc/100?img=20",
      rating: 5,
      comment:
        "Cấy ghép implant rất thành công. Ăn uống thoải mái, cảm giác như răng thật. Cảm ơn SmileCare!",
    },
  ];

  return (
    <div style={{ marginTop: "80px" }}>
      {/* Banner */}
      <section
        className="text-center text-white d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: "#CFF4FC",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "250px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></div>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <h1 className="display-5 fw-bold" style={{ color: "#000000a5" }}>
            Đánh giá khách hàng
          </h1>
          <p style={{ color: "#000000a5" }}>
            Cảm nhận thực tế từ những khách hàng đã trải nghiệm dịch vụ
          </p>
        </div>
      </section>

      {/* Reviews */}
      <section className="container py-5">
        <div className="row g-4">
          {reviews.map((review) => (
            <div className="col-md-4" key={review.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="rounded-circle mb-3"
                    width="80"
                    height="80"
                  />
                  <h5 className="card-title fw-bold">{review.name}</h5>

                  {/* Hiển thị sao */}
                  <div className="mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <i
                        key={i}
                        className={`bi ${
                          i < review.rating
                            ? "bi-star-fill text-warning"
                            : "bi-star text-muted"
                        }`}
                      ></i>
                    ))}
                  </div>

                  <p className="card-text text-muted">"{review.comment}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
