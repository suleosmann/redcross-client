import React, { createContext, useContext, useState } from 'react';

export const DonationDetailsContext = createContext();

export const useDonationDetails = () => useContext(DonationDetailsContext);

export const DonationDetailsProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: 'Kenya',
    phone: '+254',
    anonymous: false,
    companyName: '',
    county: ''
  });

  // Function to update userDetails
  const updateUserDetails = (details) => {
    setUserDetails(prevDetails => ({ ...prevDetails, ...details }));
  };

  const isComplete = () => {
    if (userDetails.anonymous) {
      return true;  // If anonymous, no need for other fields
    }
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'country'];
    if (userDetails.country === 'Kenya') {
      requiredFields.push('county');
    }
    if (userDetails.companyName) {
      requiredFields.push('companyName');
    }
    return requiredFields.every(field => userDetails[field]);
  };

  return (
    <DonationDetailsContext.Provider value={{ userDetails, updateUserDetails, isComplete }}>
      {children}
    </DonationDetailsContext.Provider>
  );
};
