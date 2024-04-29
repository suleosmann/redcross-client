import React from "react";
import { useAmount } from "../context/AmountContext";
import { useDonation } from "../context/DonationContext";
import { useDonationOptions } from "../context/DonationOptionsContext";
import { useDonationType } from "../context/DonationTypeContext";
import { useUserDetails } from "../context/UserDetailsContext";

const useSubmitDonation = () => {
  const { amount, currency, processingFee, paymentMethod, totalAmount } = useAmount();
  const { selectedSupportOption, dedication } = useDonation();
  const { option, frequency } = useDonationOptions();
  const { donationType } = useDonationType();
  const { userDetails } = useUserDetails();

  // Function to handle submission
  const submitDonation = async () => {
    // Prefill or adjust details if anonymous
    const prefilledDetails = userDetails.anonymous ? {
      firstName: 'Anonymous',
      lastName: 'Donor',
      email: 'anonymous@example.com',
      phoneNumber: 'anonymous',
      company: 'anonymous',
      address: 'anonymous',
      country: 'anonymous',
      county: 'anonymous',
    } : userDetails;

    const donationData = {
      donationType,
      donationOption: option,
      frequency,
      currency,
      amount,
      processingFee,
      totalAmount,
      selectedSupportOption,
      ...prefilledDetails,
      paymentMethod,
    };

    console.log("Submitting donation:", donationData);

    // The actual API call would be uncommented in production
    // const response = await fetch('/api/donation/submit', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(donationData)
    // });

    // return response.json();
  };

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
