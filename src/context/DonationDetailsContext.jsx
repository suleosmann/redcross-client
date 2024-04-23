import React, { createContext, useContext, useState } from 'react';

export const DonationDetailsContext = createContext();

export const useDonationDetails = () => useContext(DonationDetailsContext);

export const DonationDetailsProvider = ({ children }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: 'Kenya',
    phone: '+254',
    anonymous: false,
  });

  const selectPaymentMethod = (method) => {
    setPaymentMethod(method);
    console.log("Selected payment method:", method); // Add this line

  };

  const updateUserDetails = (details) => {
    setUserDetails(prevDetails => ({ ...prevDetails, ...details }));
  };

  return (
    <DonationDetailsContext.Provider value={{ paymentMethod, selectPaymentMethod, userDetails, updateUserDetails }}>
      {children}
    </DonationDetailsContext.Provider>
  );
};
