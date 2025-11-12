// src/components/ServiceList.jsx

const services = [
  { name: "Khám Tổng Quát", desc: "Kiểm tra răng miệng định kỳ." },
  { name: "Tẩy Trắng Răng", desc: "Làm trắng răng an toàn và hiệu quả." },
  { name: "Niềng Răng", desc: "Tư vấn các phương pháp chỉnh nha." },
];

const ServiceList = () => {
  return (
    <div className="service-list">
      <h2>Các Dịch Vụ Của Chúng Tôi</h2>
      {services.map((service, index) => (
        <div key={index} className="service-item">
          <h3>{service.name}</h3>
          <p>{service.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
