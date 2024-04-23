import DonationForm from "../modules/DonationForm";

const DonationContainer = () => {
  const imageUrl = 'https://www.redcross.or.ke/wp-content/uploads/2023/08/Our-brief-but-rich-history-1170x640-1.jpg';


  return (
    <div className="flex max-w-8xl mx-3 h-screen my-6 overflow-hidden bg-white rounded-lg shadow-lg">
      <div className="w-2/5 bg-cover" style={{ backgroundImage: `url(${imageUrl})` }}>
      </div>
      
      <div className="w-1/2 h-screen p-8">
        <DonationForm/>
      </div>
    </div>
  );
};

export default DonationContainer;
