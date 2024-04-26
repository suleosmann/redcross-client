import React from "react";
import AmountSelector from "../components/donation/AmountSelector";
import ProcessingFeeCheckbox from "../components/donation/ProcessingFeeCheckbox";
import SupportDropdown from "../components/donation/SupportDropdowns";
import DonationOptions from "../components/donation/DonationOptions";

const MyDonation = ({ onAmountButtonClick }) => {
  return (
    <div>
      <DonationOptions />
      <AmountSelector onAmountButtonClick={onAmountButtonClick} />
      <ProcessingFeeCheckbox />
      <SupportDropdown />
    </div>
  );
};

export default MyDonation;
