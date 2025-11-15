import React from "react";
import about1 from "../../assets/images/anh_about1.jpg";
import about2 from "../../assets/images/anh_about2.jpg";
import about3 from "../../assets/images/anh_about3.jpg";

export default function AboutUs() {
  return (
    <div style={{ marginTop: "40px" }}>
      <div style={{ backgroundColor: "#f8f9fa" }}>
        {/* --- PHẦN BANNER --- */}
        <section
          className="text-center text-white d-flex align-items-center justify-content-center"
          style={{
            backgroundImage: `url(${about1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "500px",
            position: "relative",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          ></div>
          <div className="container position-relative" style={{ zIndex: 2 }}>
            <h1 className="display-4 fw-bold">Về Chúng Tôi</h1>
            <p className="lead">
              SmileCare – Phòng khám nha khoa hiện đại, tận tâm và chuyên nghiệp
            </p>
          </div>
        </section>

        {/* --- GIỚI THIỆU --- */}
        <section className="container py-5">
          <div className="row align-items-center mb-5">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src={about2}
                alt="Phòng khám hiện đại"
                className="img-fluid rounded-4 shadow"
                style={{ height: "350px" }}
              />
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold mb-3" style={{ color: "#3ec9c9ff" }}>
                Phòng khám nha khoa SmileCare
              </h2>
              <p className="text-muted">
                Chúng tôi mang đến dịch vụ nha khoa toàn diện với đội ngũ bác sĩ
                giàu kinh nghiệm, trang thiết bị hiện đại và quy trình điều trị
                chuẩn quốc tế. Không chỉ chú trọng đến chất lượng chuyên môn,
                SmileCare còn quan tâm đến sự thoải mái và an tâm của khách hàng
                trong suốt quá trình thăm khám.
              </p>
              <ul>
                <li>Đảm bảo vô trùng tuyệt đối</li>
                <li>Bác sĩ tận tâm & chuyên môn cao</li>
                <li>Dịch vụ nhẹ nhàng, không đau</li>
                <li>Không gian thoải mái như ở nhà</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- THẾ MẠNH / ƯU ĐIỂM --- */}
        <section className="bg-white py-5 border-top">
          <div className="container text-center">
            <h3 className="fw-bold mb-4" style={{ color: "#3ec9c9ff" }}>
              Thế mạnh của chúng tôi
            </h3>
            <div className="row g-4">
              <div className="col-md-3">
                <div className="p-4 shadow rounded-3 bg-light h-100">
                  <h5 className="fw-bold">Đảm bảo vô trùng</h5>
                  <p className="small text-muted">
                    Quy trình khử khuẩn nghiêm ngặt, an toàn tuyệt đối.
                  </p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-4 shadow rounded-3 bg-light h-100">
                  <h5 className="fw-bold">Bác sĩ kinh nghiệm</h5>
                  <p className="small text-muted">
                    Hơn 10 năm trong nghề, được đào tạo quốc tế.
                  </p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-4 shadow rounded-3 bg-light h-100">
                  <h5 className="fw-bold">Dịch vụ nhẹ nhàng</h5>
                  <p className="small text-muted">
                    Khám & điều trị không đau, trải nghiệm thoải mái.
                  </p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-4 shadow rounded-3 bg-light h-100">
                  <h5 className="fw-bold">Không gian thư giãn</h5>
                  <p className="small text-muted">
                    Thiết kế hiện đại, gần gũi, tạo cảm giác thân thuộc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- TẦM NHÌN & SỨ MỆNH --- */}
        <section className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h3 className="fw-bold mb-3" style={{ color: "#3ec9c9ff" }}>
                Tầm nhìn & Sứ mệnh
              </h3>
              <p className="text-muted">
                Chúng tôi hướng đến trở thành phòng khám nha khoa hàng đầu, mang
                lại nụ cười khỏe đẹp cho cộng đồng. SmileCare cam kết đồng hành
                cùng khách hàng trong hành trình chăm sóc răng miệng toàn diện.
              </p>
              <ul>
                <li>
                  Luôn đặt sức khỏe và sự an toàn của khách hàng lên hàng đầu
                </li>
                <li>Cập nhật công nghệ & phương pháp điều trị mới nhất</li>
                <li>Xây dựng mối quan hệ lâu dài dựa trên niềm tin</li>
              </ul>
            </div>
            <div className="col-md-6">
              <img
                src={about3}
                alt="Tầm nhìn & Sứ mệnh"
                className="img-fluid rounded-4 shadow"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
