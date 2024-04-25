import React from "react";
import AmountSelector from "../components/donation/AmountSelector";
import ProcessingFeeCheckbox from "../components/donation/ProcessingFeeCheckbox";
import SupportDropdown from "../components/donation/SupportDropdowns";
import DedicateGift from "../components/donation/DedicateGift";
import DonationOptions from "../components/donation/DonationOptions";


const MyDonation = () => {
  return (
    <div>
      <DonationOptions/>
      <AmountSelector />
      <ProcessingFeeCheckbox />
      <SupportDropdown />
      {/* <DedicateGift /> */}
    </div>
  );
};

export default MyDonation;
