import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";
import { useDonation } from "../../context/DonationContext"; 
const DedicateGift = () => {
  const [isDedicated, setIsDedicated] = useState(false);
  const { setDedicationName } = useDonation(); 

  const handleCheckboxChange = () => {
    setIsDedicated(!isDedicated);
    if (isDedicated) setDedicationName("");
  };

  const handleNameChange = (event) => {
    setDedicationName(event.target.value); 
  };

  return (
    <div className="space-y-3">
      <label className="flex items-center space-x-2">
        <FontAwesomeIcon
          icon={isDedicated ? faCheckSquare : faSquare}
          onClick={handleCheckboxChange}
          className={`cursor-pointer border-2 border-gray-300 ${isDedicated ? "text-red-600" : "text-white"}`}
        />
        <span className="text-gray-500">
          Dedicate this gift to a friend or loved one
        </span>
      </label>
      {isDedicated && (
        <input
          type="text"
          placeholder="Enter Name"
          onChange={handleNameChange} // Use handleNameChange to update the dedication name in the context
          className="form-input mt-1 block w-full border-2 p-2 border-gray-500 rounded-md shadow-sm"
          
        />
      )}
    </div>
  );
};

export default DedicateGift;
