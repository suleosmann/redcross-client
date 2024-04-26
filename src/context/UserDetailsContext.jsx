import React, { createContext, useContext, useState } from "react";
import {useDonationType} from "./DonationTypeContext"

const UserDetailsContext = createContext();

export const useUserDetails = () => useContext(UserDetailsContext);

export const UserDetailsProvider = ({ children }) => {
    const {donationType} = useDonationType();
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

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isComplete = () => {
    if (userDetails.anonymous) {
      return true;
    }


    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "country",
      "address",
    ];
    if (donationType === "organization" ){
        requiredFields.push("company"); 
    }

    if (userDetails.country === "Kenya") {
      requiredFields.push("county");
    }

    for (let field of requiredFields) {
      if (!userDetails[field] || userDetails[field].trim() === "") {
        return false;
      }
    }

    return validateEmail(userDetails.email);
  };

  //   const updateUserDetails = (name, value) => {
  //   setUserDetails(prevDetails => ({
  //     ...prevDetails,
  //     [name]: value
  //   }));
  // };

  // const updateUserDetails = (details) => {
  //     setUserDetails(prevDetails => ({ ...prevDetails, ...details }));
  //   };

  const updateUserDetails = (nameOrDetails, value) => {
    if (typeof nameOrDetails === "string" && value !== undefined) {
      // Handle the case where name and value are provided
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [nameOrDetails]: value,
      }));
    } else if (typeof nameOrDetails === "object" && value === undefined) {
      // Handle the case where an object is provided
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        ...nameOrDetails,
      }));
    } else {
      console.error("Invalid arguments passed to updateUserDetails");
    }
  };

  return (
    <UserDetailsContext.Provider
      value={{ userDetails, updateUserDetails, isComplete }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};
