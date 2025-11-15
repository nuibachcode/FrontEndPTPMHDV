import React from "react";
import about1 from "../../../assets/images/anh_about1.jpg";
import about2 from "../../../assets/images/anh_about2.jpg";
import about3 from "../../../assets/images/anh_about3.jpg";

export default function AboutUs() {
  return (
    <div style={{ backgroundColor: "#f7f9fb" }}>
      {/* ===== BANNER ===== */}
      <section
        className="d-flex align-items-center justify-content-center text-white text-center"
        style={{
          backgroundImage: `linear-gradient(
              rgba(0, 0, 0, 0.45),
              rgba(0, 0, 0, 0.55)
            ), url(${about1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "480px",
        }}
      >
        <div className="container">
          <h1 className="display-3 fw-bold mb-3 animate__animated animate__fadeInDown">
            Về Chúng Tôi
          </h1>
          <p className="lead fw-semibold animate__animated animate__fadeInUp">
            SmileCare – Nha khoa hiện đại, chuyên nghiệp và tận tâm hàng đầu
          </p>
        </div>
      </section>

      {/* ===== GIỚI THIỆU ===== */}
      <section className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-md-6">
            <img
              src={about2}
              alt="Phòng khám"
              className="img-fluid rounded-4 shadow-lg"
              style={{ transform: "scale(1.01)", height: "300px" }}
            />
          </div>

          <div className="col-md-6">
            <h2 className="fw-bold mb-3" style={{ color: "#27bebe" }}>
              Phòng khám nha khoa SmileCare
            </h2>

            <p className="text-muted fs-5">
              Chúng tôi cung cấp dịch vụ nha khoa toàn diện với đội ngũ bác sĩ
              giàu kinh nghiệm, công nghệ tiên tiến và quy trình chuẩn quốc tế.
            </p>

            <ul className="fs-6">
              <li className="mb-2">Đảm bảo vô trùng tuyệt đối</li>
              <li className="mb-2">Bác sĩ tận tâm & có chuyên môn sâu</li>
              <li className="mb-2">Dịch vụ nhẹ nhàng – không gây đau</li>
              <li className="mb-2">Không gian thoải mái như ở nhà</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== THẾ MẠNH ===== */}
      <section className="py-5" style={{ background: "#fff" }}>
        <div className="container text-center">
          <h3 className="fw-bold mb-4" style={{ color: "#27bebe" }}>
            Thế mạnh của SmileCare
          </h3>

          <div className="row g-4">
            {[
              {
                title: "Đảm bảo vô trùng",
                text: "Quy trình khử khuẩn chuẩn quốc tế.",
              },
              {
                title: "Bác sĩ kinh nghiệm",
                text: "Chuyên môn sâu, hơn 10 năm kinh nghiệm.",
              },
              {
                title: "Dịch vụ nhẹ nhàng",
                text: "Khám & điều trị êm ái, không đau.",
              },
              {
                title: "Không gian thư giãn",
                text: "Thiết kế hiện đại – thân thiện – dễ chịu.",
              },
            ].map((item, idx) => (
              <div className="col-md-3" key={idx}>
                <div
                  className="p-4 rounded-4 shadow-sm bg-light h-100"
                  style={{
                    transition: "0.3s",
                    border: "1px solid #e9ecef",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-5px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <h5 className="fw-bold mb-2">{item.title}</h5>
                  <p className="small text-muted">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TẦM NHÌN & SỨ MỆNH ===== */}
      <section className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-md-6">
            <h3 className="fw-bold mb-3" style={{ color: "#27bebe" }}>
              Tầm nhìn & Sứ mệnh
            </h3>
            <p className="text-muted fs-5">
              SmileCare hướng đến trở thành nha khoa hàng đầu — mang đến nụ cười
              khỏe đẹp cho cộng đồng bằng chất lượng và sự tận tâm.
            </p>

            <ul className="fs-6">
              <li className="mb-2">
                Luôn đặt sức khỏe khách hàng lên hàng đầu
              </li>
              <li className="mb-2">Cập nhật kỹ thuật – công nghệ hiện đại</li>
              <li className="mb-2">Xây dựng niềm tin & mối quan hệ bền vững</li>
            </ul>
          </div>

          <div className="col-md-6">
            <img
              src={about3}
              alt="Tầm nhìn & Sứ mệnh"
              className="img-fluid rounded-4 shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
