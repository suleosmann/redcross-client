import React, { createContext, useContext, useState } from "react";

// Create the context
const UserDetailsContext = createContext();

// Create a custom hook to use the context
export const useUserDetails = () => useContext(UserDetailsContext);

// Provider component
export const UserDetailsProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    company: "",
    address: "",
    country: "",
    county: "",
    anonymous: false,
  });

  const isComplete = () => {
    if (userDetails.anonymous) {
      return true;
    }
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "country",
      "phoneNumber",
      "address",
    ];
    if (userDetails.country === "Kenya") {
      requiredFields.push("county");
    }
    if (userDetails.companyName) {
      requiredFields.push("companyName");
    }
  };
  const updateUserDetails = (details) => {
    setUserDetails((prevDetails) => ({ ...prevDetails, ...details }));
  };

  return (
    <UserDetailsContext.Provider
      value={{ userDetails, updateUserDetails, isComplete }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};
