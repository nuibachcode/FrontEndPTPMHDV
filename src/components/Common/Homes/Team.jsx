import React from "react";
import Dr_David_Lee from "../../../assets/images/Dr_David_Lee.jpg";
import Dr_Amanda_Reed from "../../../assets/images/Dr_Amanda_Reed.jpg";
import Dr_Emily_Clark from "../../../assets/images/Dr_Emily_Clark.jpg";
import khachhang1 from "../../../assets/images/khachhang3.jpg";
import khachhang2 from "../../../assets/images/khachhang4.jpg";

export default function TeamAndTestimonials() {
  return (
    <section className="py-5 bg-light" id="team">
      <div className="container">
        {/* TIÊU ĐỀ */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Đội Ngũ Bác Sĩ</h2>
          <p className="text-muted">Chuyên môn cao – Tận tâm – Thân thiện</p>
        </div>

        {/* ĐỘI NGŨ BÁC SĨ */}
        <div className="row g-4 mb-5">
          <div className="col-md-4 d-flex flex-column align-items-center text-center">
            <img
              src={Dr_David_Lee}
              className="rounded-circle mb-3 shadow"
              alt="Bác sĩ 1"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <h6 className="fw-bold mb-1">Dr.David Lee</h6>
            <small className="text-muted">Chuyên khoa Răng – Hàm – Mặt</small>
          </div>

          <div className="col-md-4 d-flex flex-column align-items-center text-center">
            <img
              src={Dr_Amanda_Reed}
              className="rounded-circle mb-3 shadow"
              alt="Bác sĩ 2"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <h6 className="fw-bold mb-1">Dr.Amanda Reed</h6>
            <small className="text-muted">Niềng răng – Chỉnh nha</small>
          </div>
          <div className="col-md-4 text-center d-flex flex-column align-items-center">
            <img
              src={Dr_Emily_Clark}
              className="rounded-circle mb-3 shadow"
              alt="Bác sĩ 3"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <h6 className="fw-bold mb-1">Dr.Emily Clark</h6>
            <small className="text-muted">Cấy ghép Implant</small>
          </div>
        </div>

        <hr className="my-5" />

        {/* CẢM NHẬN KHÁCH HÀNG */}
        <div className="text-center mb-4">
          <h3 className="fw-bold">Khách Hàng Nói Gì?</h3>
          <p className="text-muted">
            Hơn 5000+ khách hàng đã tin tưởng lựa chọn
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="p-4 border rounded-4 bg-white shadow-sm h-100">
              <p className="mb-4 fst-italic">
                "Tôi rất ấn tượng với cách bác sĩ tư vấn và chăm sóc. Mọi thứ
                đều sạch sẽ và hiện đại!"
              </p>
              <div className="d-flex flex-column align-items-center">
                <img
                  src={khachhang2}
                  className="rounded shadow mb-3"
                  alt="Khách hàng 1"
                  style={{ width: "350px", objectFit: "cover" }}
                />
                <div className="text-center">
                  <h6 className="mb-0 fw-semibold">Nguyễn Thị Mai</h6>
                  <small className="text-muted">Khách hàng</small>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 border rounded-4 bg-white shadow-sm h-100">
              <p className="mb-4 fst-italic">
                "Lần đầu niềng răng nhưng không hề lo lắng, phòng khám hỗ trợ
                rất tận tâm, chi tiết!"
              </p>
              <div className="d-flex flex-column align-items-center">
                <img
                  src={khachhang1}
                  className="rounded shadow mb-3"
                  alt="Khách hàng 2"
                  style={{
                    width: "350px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
                <div className="text-center">
                  <h6 className="mb-0 fw-semibold">Trần Thanh Thảo</h6>
                  <small className="text-muted">Khách hàng</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
