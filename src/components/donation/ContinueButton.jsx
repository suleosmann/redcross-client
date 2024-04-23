import React from "react";
import Button from "../common/Button";

const ContinueButton = ({ handleContinueClick }) => {
  return (
    <div className="flex justify-end"> 
      <Button
        text="Continue"
        color="red"
        textColor="white"
        className="w-32 h-12 mt-4"
        onClick={handleContinueClick}
      />
    </div>
  );
};

export default ContinueButton;
