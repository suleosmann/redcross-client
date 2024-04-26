import React, { useState, useEffect } from 'react';
import mpesaLogo from '../assets/mpesa.png'; 
import cards from '../assets/cards.jpeg'; 
import { useAmount } from '../context/AmountContext'; 
import { useUserDetails } from '../context/UserDetailsContext';

const PaymentComponent = () => {
  const [selectedTab, setSelectedTab] = useState('CARD'); // Default to CARD
  const { totalAmount, currency } = useAmount();
  const { userDetails, updateUserDetails } = useUserDetails();

  // Set default tab based on currency
  useEffect(() => {
    if (currency === 'KSH') {
      setSelectedTab('MPESA');
    }
  }, [currency]);

  const handlePhoneChange = (event) => {
    updateUserDetails({ ...userDetails, phoneNumber: event.target.value });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex flex-wrap justify-between mb-4">
        {currency !== "USD" && (
          <button
            className={`flex-1 text-center focus:outline-none text-lg py-2 ${selectedTab === 'MPESA' ? 'text-red-500 border-b-2 border-red-500 font-semibold' : 'text-gray-500'}`}
            onClick={() => setSelectedTab('MPESA')}
          >
            MPESA
          </button>
        )}
        <button
          className={`flex-1 text-center focus:outline-none text-lg py-2 ${selectedTab === 'CARD' ? 'text-red-500 border-b-2 border-red-500 font-semibold' : 'text-gray-500'}`}
          onClick={() => setSelectedTab('CARD')}
        >
          CARD
        </button>
      </div>

      {selectedTab === 'MPESA' && currency !== "USD" && (
        <div>
          <div className="flex justify-center mb-4">
            <img src={mpesaLogo} alt="Mpesa Logo" className="h-auto max-w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              className="mt-1 block w-full border-b-2 border-gray-300 p-2 text-lg focus:border-blue-500 focus:outline-none"
              placeholder="Enter your phone number"
              value={userDetails.anonymous ? '' : userDetails.phoneNumber || ''}
              onChange={handlePhoneChange}
              disabled={userDetails.anonymous}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Total Amount</label>
            <input
              type="number"
              id="amount"
              className="mt-1 block w-full border-b-2 border-gray-300 p-2 text-lg focus:border-blue-500 focus:outline-none"
              value={totalAmount || 0}
              readOnly 
            />
          </div>
        </div>
      )}

      {selectedTab === 'CARD' && (
        <div className="flex justify-center">
          <img src={cards} alt="Payment Cards" className="h-auto max-w-full" />
        </div>
      )}
    </div>
  );
};

export default PaymentComponent;
