import React from "react";
import anhrang from "../../../assets/images/khamrang.jpg";
import "./Service.css";
import { Link } from "react-router-dom";
export default function Services() {
  return (
    <section className="py-5 bg-white" id="services">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Dịch Vụ Nổi Bật</h2>
          <p className="text-muted">
            Chúng tôi cung cấp các dịch vụ nha khoa toàn diện, hiện đại và an
            toàn.
          </p>
        </div>

        {/* 3 dịch vụ chính */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="border rounded-4 p-4 text-center h-100 shadow-sm service-card">
              <i className="bi bi-brightness-high text-primary fs-1 mb-3"></i>
              <h5 className="fw-semibold">Tẩy Trắng Răng</h5>
              <p className="text-muted">
                Giúp bạn sở hữu nụ cười trắng sáng, tự tin hơn chỉ sau 60 phút
                điều trị.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="border rounded-4 p-4 text-center h-100 shadow-sm service-card">
              <i className="bi bi-sliders text-primary fs-1 mb-3"></i>
              <h5 className="fw-semibold">Niềng Răng</h5>
              <p className="text-muted">
                Chỉnh nha chuyên sâu với các loại niềng phù hợp từng độ tuổi và
                nhu cầu.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="border rounded-4 p-4 text-center h-100 shadow-sm service-card">
              <i className="bi bi-shield-check text-primary fs-1 mb-3"></i>
              <h5 className="fw-semibold">Cấy Ghép Implant</h5>
              <p className="text-muted">
                Phục hồi răng mất với công nghệ Implant hiện đại, bền bỉ như
                răng thật.
              </p>
            </div>
          </div>
        </div>

        {/* Ưu điểm */}
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <img
              src={anhrang}
              alt="Ưu điểm"
              className="img-fluid rounded-4 shadow "
            />
          </div>
          <div className="col-lg-6 ">
            <h3 className="fw-bold mb-3">Tại Sao Nên Chọn Chúng Tôi?</h3>
            <ul className="list-unstyled">
              <li className="d-flex align-items-start mb-3">
                <i className="bi bi-check2-circle text-primary fs-4 me-3"></i>
                <div>
                  <h6 className="mb-1 fw-semibold">
                    Khám nhanh – Không chờ đợi
                  </h6>
                  <p className="mb-0 text-muted small">
                    Quy trình đặt lịch thông minh, không tốn thời gian.
                  </p>
                </div>
              </li>
              <li className="d-flex align-items-start mb-3">
                <i className="bi bi-credit-card-2-front text-primary fs-4 me-3"></i>
                <div>
                  <h6 className="mb-1 fw-semibold">Hỗ trợ trả góp 0%</h6>
                  <p className="mb-0 text-muted small">
                    Thanh toán linh hoạt, hỗ trợ tài chính nhẹ nhàng.
                  </p>
                </div>
              </li>
              <li className="d-flex align-items-start mb-3">
                <i className="bi bi-headset text-primary fs-4 me-3"></i>
                <div>
                  <h6 className="mb-1 fw-semibold">
                    Phục vụ 24/7 kể cả cuối tuần
                  </h6>
                  <p className="mb-0 text-muted small">
                    Luôn sẵn sàng hỗ trợ trong mọi tình huống khẩn cấp.
                  </p>
                </div>
              </li>
            </ul>
            <Link to="/whyus" className="btn btn-outline-primary mt-3 px-4">
              Tìm hiểu thêm
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
