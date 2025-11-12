import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";

// Nhận nội dung trang (như HomePage, BookingPage) qua prop 'children'
const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      {/* children là nội dung thay đổi của từng trang */}
      <main className="container " style={{ marginTop: "120px" }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
