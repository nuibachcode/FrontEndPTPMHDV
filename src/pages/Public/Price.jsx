import React from "react";

export default function PricePage() {
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
          <h1 className="display-5 fw-bold" style={{ color: "#000000b5" }}>
            Bảng giá dịch vụ
          </h1>
          <p style={{ color: "#000000a5", fontSize: "20px" }}>
            Minh bạch – Hợp lý – Cạnh tranh
          </p>
        </div>
      </section>

      {/* Price Table */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ color: "#3ec9c9ff" }}>
            Giá dịch vụ nha khoa
          </h2>
          <p className="text-muted">
            Cam kết giá niêm yết rõ ràng, không phát sinh thêm chi phí.
          </p>
        </div>

        <div className="table-responsive shadow rounded-4">
          <table className="table table-bordered table-hover align-middle mb-0">
            <thead className="table-info text-center">
              <tr>
                <th style={{ width: "50%" }}>Dịch vụ</th>
                <th>Giá (VNĐ)</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tẩy trắng răng (công nghệ ánh sáng lạnh)</td>
                <td className="text-center fw-bold">1.500.000</td>
                <td>Hiệu quả duy trì 12 – 18 tháng</td>
              </tr>
              <tr>
                <td>Niềng răng kim loại</td>
                <td className="text-center fw-bold">25.000.000</td>
                <td>Thời gian điều trị 18 – 24 tháng</td>
              </tr>
              <tr>
                <td>Niềng răng trong suốt Invisalign</td>
                <td className="text-center fw-bold">60.000.000</td>
                <td>Thẩm mỹ cao, dễ tháo lắp</td>
              </tr>
              <tr>
                <td>Cấy ghép Implant (1 trụ)</td>
                <td className="text-center fw-bold">18.000.000</td>
                <td>Bảo hành 10 năm</td>
              </tr>
              <tr>
                <td>Trám răng thẩm mỹ</td>
                <td className="text-center fw-bold">300.000</td>
                <td>Không đau, đảm bảo thẩm mỹ</td>
              </tr>
              <tr>
                <td>Khám & tư vấn tổng quát</td>
                <td className="text-center fw-bold">Miễn phí</td>
                <td>Dành cho khách hàng mới</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
