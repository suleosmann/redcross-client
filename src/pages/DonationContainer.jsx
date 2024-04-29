import DonationForm from "../modules/DonationForm";
import TopBar from "../components/Navbars/TopBar";
import NavBar from "../components/Navbars/SimpleNavBar";
import Cta from "../components/Footer/Cta"
import Footer from "../components/Footer/Footer"

const DonationContainer = () => {
  const imageUrl =
    "https://www.redcross.or.ke/wp-content/uploads/2023/08/Our-brief-but-rich-history-1170x640-1.jpg";

  return (
    <>
      <TopBar />
      <NavBar />
      <div className="flex flex-wrap max-w-8xl mx-auto my-6 min-h-[600px] h-[96vh] overflow-hidden bg-white rounded-lg shadow-lg">
        <div
          className="w-full md:w-2/5 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          {/* Background image container */}
        </div>

        <div className="w-full md:w-3/5 h-full p-8 overflow-y-auto">
          <DonationForm />
        </div>
      </div>
      <Cta/>
      <Footer/>
    </>
  );
};

export default DonationContainer;
