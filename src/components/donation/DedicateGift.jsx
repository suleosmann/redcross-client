import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";
import { useDonation } from "../../context/DonationContext"; // Ensure the path matches

const DedicateGift = () => {
  const { dedication, setDedicationName } = useDonation();
  const isDedicated = !!dedication; // This will check if dedication is not an empty string

  const handleCheckboxChange = () => {
    setDedicationName(isDedicated ? "" : " "); 
  };

  const handleNameChange = (event) => {
    setDedicationName(event.target.value);
  };

  return (
    <div className="space-y-3">
      <label className="flex items-center space-x-2 cursor-pointer" onClick={handleCheckboxChange}>
        <FontAwesomeIcon
          icon={isDedicated ? faCheckSquare : faSquare}
          className={`cursor-pointer ${isDedicated ? "text-red-600" : "text-white border-2 border-gray-400"}`}
        />
        <span className="text-gray-700">
          Dedicate this gift to a friend or loved one
        </span>
      </label>
      {isDedicated && (
        <input
          type="text"
          placeholder="Enter Name"
          value={dedication}
          onChange={handleNameChange}
          className="form-input mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      )}
    </div>
  );
};

export default DedicateGift;
