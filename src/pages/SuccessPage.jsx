import React from 'react';

const SuccessPage = () => {
  return (
    <div className="h-screen bg-green-50 flex items-center justify-center">
      <div className="text-center">
        <svg className="mx-auto mb-4 w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h1 className="text-xl font-semibold text-green-600">Payment Successful</h1>
        <p className="text-green-600">Your transaction has been processed successfully.</p>
      </div>
    </div>
  );
};

export default SuccessPage;
