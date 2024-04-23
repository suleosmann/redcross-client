import React, { createContext, useContext, useState } from "react";

// Create the context
const DonationOptionsContext = createContext();

// Custom hook to use the context
export const useDonationOptions = () => useContext(DonationOptionsContext);

// Provider component
export const DonationOptionsProvider = ({ children }) => {
  const [option, setOption] = useState("donate");
  const [frequency, setFrequency] = useState("one-time");
  const [selectedDay, setSelectedDay] = useState('');

  // Handle changes in selected day with validation
  const handleDayChange = (day) => {
    if (day >= 1 && day <= 28) {
      setSelectedDay(day);
    } else {
      console.log("Please enter a day between 1 and 28.");
      setSelectedDay(""); // Resets the input if the day is not within the range
    }
  };

  return (
    <DonationOptionsContext.Provider value={{ option, setOption, frequency, setFrequency, selectedDay, handleDayChange }}>
      {children}
    </DonationOptionsContext.Provider>
  );
};

export default DonationOptionsContext;
