import React, { createContext, useContext, useState } from "react";

export const FrequencyContext = createContext();

export const useFrequency = () => useContext(FrequencyContext);

export const FrequencyProvider = ({ children }) => {
    const [frequency, setFrequency] = useState("one-time");
    const [donationDate, setDonationDate] = useState(null);

    // Function to update the donation date
    const updateDonationDate = (date) => {
        setDonationDate(date);
    };

    return (
        <FrequencyContext.Provider
            value={{
                frequency,
                setFrequency,
                donationDate,
                updateDonationDate, // Make this method available to context consumers
            }}
        >
            {children}
        </FrequencyContext.Provider>
    );
};

export default FrequencyContext;
