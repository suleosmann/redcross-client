import React, { createContext, useContext, useState } from "react";

const DonationTypeContext = createContext();

export const useDonationType = () => useContext(DonationTypeContext);

export const DonationTypeProvider = ({ children }) => {
  const [donationType, setDonationType] = useState(null);

  return (
    <DonationTypeContext.Provider value={{ donationType, setDonationType }}>
      {children}
    </DonationTypeContext.Provider>
  );
};
