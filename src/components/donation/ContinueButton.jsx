import React from "react";
import Button from "../common/Button";

const ContinueButton = ({ handleContinueClick }) => {
  return (
    <div className="flex justify-end"> 
      <Button
        text="Continue"
        color="red"
        textColor="white"
        className="w-32 h-12 mb-2 md:mb-0" // Adjust widths as needed
        onClick={handleContinueClick}
      />
    </div>
  );
};

export default ContinueButton;
