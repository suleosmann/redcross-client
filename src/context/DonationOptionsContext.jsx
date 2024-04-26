import React, { createContext, useContext, useState } from "react";

// Create the context
export const DonationOptionsContext = createContext();

// Custom hook to use the context
export const useDonationOptions = () => useContext(DonationOptionsContext);

// Provider component
export const DonationOptionsProvider = ({ children }) => {
  const [option, setOption] = useState("donate");
  const [frequency, setFrequency] = useState("one-time");

  // Handle changes in selected day with validation
  
  return (
    <DonationOptionsContext.Provider value={{ option, setOption, frequency, setFrequency}}>
      {children}
    </DonationOptionsContext.Provider>
  );
};

export default DonationOptionsContext;
