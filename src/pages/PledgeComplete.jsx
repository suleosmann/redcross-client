import React from 'react';
import Button from "../components/common/Button"; 

const PledgeComplete = ({ onReset }) => {
  return (
    <div className="bg-white h-screen p-4 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-semibold mb-4">Thank you for your pledge!</h2>
      <p>Your commitment helps us make a difference. We will send you details on how to fulfill your pledge soon.</p>
      
    </div>
  );
};

export default PledgeComplete;
