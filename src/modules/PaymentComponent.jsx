import React, { useState } from 'react';
import mpesaLogo from '../assets/mpesa.png'; 
import visaLogo from '../assets/visa.jpg'; 
import mastercardLogo from '../assets/mastercard.png'; 
import { useAmount } from '../context/AmountContext'; 
import { useDonationDetails } from '../context/DonationDetailsContext'; // Ensure you have this hook

const PaymentComponent = () => {
  const [selectedTab, setSelectedTab] = useState('MPESA');
  const { totalAmount } = useAmount();
  const { userDetails, updateUserDetails } = useDonationDetails(); // Use the context via the hook

  const handlePhoneChange = (event) => {
    updateUserDetails({ ...userDetails, phone: event.target.value });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex border-red-500 mb-4">
        <button
          className={`focus:outline-none text-lg mr-8 ${selectedTab === 'MPESA' ? 'text-red-500 border-b-2 border-red-500 font-semibold' : 'text-gray-500'}`}
          onClick={() => setSelectedTab('MPESA')}
        >
          MPESA
        </button>
        <button
          className={`focus:outline-none text-lg ${selectedTab === 'CARD' ? 'text-red-500 border-b-2 border-red-500 font-semibold' : 'text-gray-500'}`}
          onClick={() => setSelectedTab('CARD')}
        >
          CARD
        </button>
      </div>

      {selectedTab === 'MPESA' && (
        <div>
          <div className="flex justify-center mb-4">
            <img src={mpesaLogo} alt="Mpesa Logo" className="h-auto w-40" />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              className="mt-1 block w-full border-b-2 border-gray-300 p-2 text-lg focus:border-blue-500 focus:outline-none"
              value={userDetails.phone || ''}
              onChange={handlePhoneChange}
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
        <div className="flex space-x-2">
          <img src={visaLogo} alt="Visa Logo" className="h-auto w-40" />
          <img src={mastercardLogo} alt="MasterCard Logo" className="h-auto" />
        </div>
      )}
    </div>
  );
};

export default PaymentComponent;
