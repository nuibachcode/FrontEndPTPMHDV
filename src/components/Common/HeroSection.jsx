// src/components/HeroSection.jsx

const HeroSection = ({ title, subtitle }) => {
  return (
    <div className="hero-section">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <a href="/dat-lich" className="btn-primary">
        Đặt lịch ngay
      </a>
    </div>
  );
};

export default HeroSection;
