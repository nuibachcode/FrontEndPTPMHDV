// src/pages/HomePage.jsx

import HeroSection from "../../components/Common/HeroSection";
import ServiceList from "../../components/Common/ServiceList";

const HomePage = () => {
  return (
    <>
      <HeroSection
        title="Chào mừng đến với Nha Khoa ABC"
        subtitle="Nơi mang đến nụ cười hoàn hảo cho bạn và gia đình."
      />
      <ServiceList />
    </>
  );
};

export default HomePage;
