import React from "react";
import { useAmount } from "../context/AmountContext";
import { useDonation } from "../context/DonationContext";
import { useDonationOptions } from "../context/DonationOptionsContext";
import { useDonationType } from "../context/DonationTypeContext";
import { useUserDetails } from "../context/UserDetailsContext";

const useSubmitDonation = () => {
  const { amount, currency, processingFee, paymentMethod , totalAmount} = useAmount();
  const { selectedSupportOption, dedication } = useDonation();
  const { option, frequency } = useDonationOptions();
  const { donationType } = useDonationType();
  const { userDetails } = useUserDetails();

  // Function to handle submission
  const submitDonation = async () => {
    // Construct the data object to be sent
    const donationData = {
        donationType,
      donationOption: option,
      frequency,
      currency,
      amount,
      processingFee,
      totalAmount,
      selectedSupportOption,
      //   dedication,
      ...userDetails,
      paymentMethod,    
    };

    // Here, you would typically make an API call to submit the donation data
    console.log("Submitting donation:", donationData);

    // Example of making an API call
    // const response = await fetch('/api/donation/submit', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(donationData)
    // });

    // return response.json();
  };

  // Expose the data and the submission function
  return {
    submitDonation,
    amount,
    currency,
    selectedSupportOption,
    dedication,
    donationType,
    ...userDetails,
    option,
    frequency,
  };
};

export default useSubmitDonation;
