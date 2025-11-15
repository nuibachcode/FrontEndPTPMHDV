import React from "react";
import Dr_David_Lee from "../../assets/images/Dr_David_Lee.jpg";
import Dr_Amanda_Reed from "../../assets/images/Dr_Amanda_Reed.jpg";
import Dr_Emily_Clark from "../../assets/images/Dr_Emily_Clark.jpg";
const Doctor = () => {
  const doctors = [
    {
      name: "Dr.David Lee",
      specialty: "Chuyên khoa Răng – Hàm – Mặt",
      image: Dr_David_Lee,
    },
    {
      name: "Dr.Amanda Reed",
      specialty: "Niềng răng – Chỉnh nha",
      image: Dr_Amanda_Reed,
    },
    {
      name: "Dr.Emily Clark",
      specialty: "Cấy ghép Implant",
      image: Dr_Emily_Clark,
    },
  ];

  return (
    <div style={{ marginTop: "50px" }}>
      <div className="container my-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-primary">Đội ngũ Bác sĩ</h2>
          <p className="text-muted">
            Các bác sĩ tận tâm, chuyên môn cao, luôn đồng hành cùng nụ cười khỏe
            mạnh của bạn.
          </p>
        </div>

        <div className="row g-4">
          {doctors.map((doctor, index) => (
            <div key={index} className="col-md-4">
              <div className="card shadow-lg h-100 text-center">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="card-img-top"
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{doctor.name}</h5>
                  <p className="card-text text-muted">{doctor.specialty}</p>
                  <a href="/dat-lich" className="btn btn-outline-primary">
                    Đặt lịch với {doctor.name.split(" ")[1]}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctor;
