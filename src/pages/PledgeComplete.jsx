import React from 'react';

const PledgeComplete = ({ onReset }) => {
  return (
    <div className="bg-green-50 h-screen flex items-center justify-center">
      <div className="text-center p-8 bg-white shadow-xl rounded-lg">
        <svg className="mx-auto mb-6 w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Thank you for your pledge!</h2>
        <p className="mb-6 text-green-600">Your commitment helps us make a difference. We will send you details on how to fulfill your pledge soon.</p>
      </div>
    </div>
  );
};

export default PledgeComplete;
