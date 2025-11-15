import React from "react";
import service1 from "../../../assets/images/anhservice.png";
import service2 from "../../../assets/images/anh_herodetail5.png";
import service3 from "../../../assets/images/anh_herodetail6.png";
import service4 from "../../../assets/images/anh_herodetail4.webp";

export default function ServicesDetail() {
  return (
    <div style={{ marginTop: "80px" }}>
      <div style={{ backgroundColor: "#f8f9fa" }}>
        {/* --- PHẦN BANNER --- */}
        <section
          className="text-center text-white d-flex align-items-center justify-content-center"
          style={{
            backgroundImage: `url(${service1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
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
            <h1 className="display-4 fw-bold">
              Dịch vụ nha khoa chuyên nghiệp
            </h1>
            <p className="lead">
              Tận tâm – Hiện đại – Mang lại nụ cười tự tin cho bạn
            </p>
          </div>
        </section>

        {/* --- PHẦN CHI TIẾT DỊCH VỤ --- */}
        <section className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold" style={{ color: "#3ec9c9ff" }}>
              Các dịch vụ nổi bật
            </h2>
            <p className="text-muted">
              Được thực hiện bởi đội ngũ bác sĩ chuyên môn cao cùng công nghệ
              hiện đại.
            </p>
          </div>

          {/* Dịch vụ 1 */}
          <div className="row align-items-center mb-5">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src={service2}
                alt="Tẩy trắng răng"
                className="img-fluid rounded-4 shadow"
              />
            </div>
            <div className="col-md-6">
              <h3 className="fw-bold mb-3">Tẩy trắng răng</h3>
              <p className="text-muted">
                Sử dụng công nghệ ánh sáng lạnh hiện đại giúp răng trắng sáng tự
                nhiên chỉ sau một lần điều trị. Quy trình an toàn, không gây ê
                buốt, được kiểm định nghiêm ngặt theo tiêu chuẩn nha khoa quốc
                tế.
              </p>
              <ul>
                <li>Thời gian thực hiện: 30 – 45 phút</li>
                <li>Hiệu quả duy trì: 12 – 18 tháng</li>
                <li>Không gây hại men răng</li>
              </ul>
            </div>
          </div>

          {/* Dịch vụ 2 */}
          <div className="row align-items-center mb-5 flex-md-row-reverse">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src={service3}
                alt="Niềng răng thẩm mỹ"
                className="img-fluid rounded-4 shadow"
              />
            </div>
            <div className="col-md-6">
              <h3 className="fw-bold mb-3">Niềng răng thẩm mỹ</h3>
              <p className="text-muted">
                Giải pháp chỉnh nha toàn diện giúp sắp xếp lại răng sai lệch,
                khớp cắn chuẩn xác và nụ cười hài hòa. Có nhiều lựa chọn: niềng
                kim loại, sứ, hoặc trong suốt Invisalign.
              </p>
              <ul>
                <li>Thời gian điều trị: 12 – 24 tháng</li>
                <li>Định kỳ kiểm tra: mỗi 6 tuần</li>
                <li>Không gây đau, dễ vệ sinh</li>
              </ul>
            </div>
          </div>

          {/* Dịch vụ 3 */}
          <div className="row align-items-center mb-5">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src={service4}
                alt="Cấy ghép Implant"
                className="img-fluid rounded-4 shadow"
              />
            </div>
            <div className="col-md-6">
              <h3 className="fw-bold mb-3">Cấy ghép Implant</h3>
              <p className="text-muted">
                Phục hồi răng mất bằng trụ Titanium tích hợp sinh học, mang lại
                cảm giác và chức năng như răng thật. Quy trình được thực hiện
                trong môi trường vô trùng tuyệt đối.
              </p>
              <ul>
                <li>Tuổi thọ implant lên đến 20 năm</li>
                <li>Giúp bảo tồn xương hàm tự nhiên</li>
                <li>Thẩm mỹ cao, ăn nhai tốt</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- PHẦN CAM KẾT --- */}
        <section className="bg-white py-5 text-center border-top">
          <div className="container">
            <h3 className="fw-bold mb-3" style={{ color: "#3ec9c9ff" }}>
              Cam kết của chúng tôi
            </h3>
            <p className="text-muted mb-4">
              SmileCare tự hào là địa chỉ nha khoa được hàng nghìn khách hàng
              tin tưởng, với đội ngũ bác sĩ tận tâm, trang thiết bị hiện đại và
              dịch vụ chăm sóc khách hàng chu đáo.
            </p>

            <div className="d-flex justify-content-center gap-4 flex-wrap">
              <div
                className="p-4 shadow rounded-3 bg-light"
                style={{ maxWidth: "300px" }}
              >
                <h5 className="fw-bold mb-2">
                  100% bác sĩ có chứng chỉ quốc tế
                </h5>
                <p className="text-muted small">
                  Được đào tạo chuyên sâu và cập nhật kỹ thuật tiên tiến.
                </p>
              </div>
              <div
                className="p-4 shadow rounded-3 bg-light"
                style={{ maxWidth: "300px" }}
              >
                <h5 className="fw-bold mb-2">Trang thiết bị hiện đại</h5>
                <p className="text-muted small">
                  Hệ thống máy X-quang, máy tẩy trắng, ghế nha khoa cao cấp.
                </p>
              </div>
              <div
                className="p-4 shadow rounded-3 bg-light"
                style={{ maxWidth: "300px" }}
              >
                <h5 className="fw-bold mb-2">Chính sách bảo hành rõ ràng</h5>
                <p className="text-muted small">
                  Khách hàng được theo dõi định kỳ và hỗ trợ miễn phí khi cần.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
