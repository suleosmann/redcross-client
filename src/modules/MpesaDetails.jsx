import React from 'react';
import { useAmount } from '../context/AmountContext'; 

const MpesaDetails = () => {
  const { amount, processingFee, phone, setPhone } = useAmount(); 

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const totalAmount = (amount || 0) + processingFee;

  return (
    <div style={{ width: '300px', margin: 'auto' }}>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px' }}>Phone</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      <div>
        <label htmlFor="amount" style={{ display: 'block', marginBottom: '5px' }}>Amount</label>
        <input
          type="number"
          id="amount"
          value={totalAmount}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          readOnly 
        />
      </div>
    </div>
  );
};

export default MpesaDetails;
