import React, { useState } from "react";
import { useAmount } from "../context/AmountContext"; // Adjust path as needed
import useSubmitDonation from "../hooks/useSubmitDonation";
import Button from "../components/common/Button";
import { Navigate, useNavigate } from 'react-router-dom'; 

const SubmitDonationButton = ({ handleBackClick }) => {
  const navigate = useNavigate();
  const { amount, phone } = useAmount();
  const [errorMessage, setErrorMessage] = useState(""); // State to manage error messages

  const isValidPhoneNumber = (phone) => {
    // Regex to match Kenyan phone numbers in two formats:
    // 1. Starting with +254 followed by 9 digits
    // 2. Starting with 07 or 01 followed by 8 more digits
    const regex = /^(?:\+254\d{9}|01\d{8}|07\d{8})$/;
    return regex.test(phone);
  };

  const submitDonation = useSubmitDonation();

  const handleSubmission = () => {
    navigate('/success')
    // Reset error message state on each submission attempt
    setErrorMessage("");

    // if (!isValidPhoneNumber(phone)) {
    //   setErrorMessage("Please enter a valid Kenyan phone number.");
    //   return;
    // }

    if (amount <= 0) {
      setErrorMessage("Please enter a valid donation amount.");
      return;
    }

    submitDonation();
    handleBackClick();
    
  };

  return (
    <>
      {/* Display the error message above the button if it exists */}
      {errorMessage && (
        <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
      )}

      <div className="flex justify-center">
        <Button
          text="Submit"
          color="red"
          textColor="white"
          className="w-32 h-12 mt-4"
          onClick={handleSubmission}
        />
      </div>
    </>
  );
};

export default SubmitDonationButton;
