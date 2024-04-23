import React, { createContext, useContext, useState } from 'react';

export const DonationContext = createContext();

export const useDonation = () => useContext(DonationContext);

export const DonationProvider = ({ children }) => {
  const [selectedSupportOption, setSelectedSupportOption] = useState(null);
  const [dedication, setDedication] = useState("");

  const selectSupportOption = (option) => {
    setSelectedSupportOption(option);
  };

  const setDedicationName = (name) => {
    setDedication(name);
  };

  return (
    <DonationContext.Provider value={{ selectedSupportOption, selectSupportOption, dedication, setDedicationName }}>
      {children}
    </DonationContext.Provider>
  );
};
