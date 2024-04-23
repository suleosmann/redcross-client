import React, { createContext, useContext, useState, useEffect } from 'react';

export const AmountContext = createContext();

export const useAmount = () => useContext(AmountContext);

export const AmountProvider = ({ children }) => {
  const [amount, setAmount] = useState(null);
  const [currency, setCurrency] = useState('USD');
  const [processingFee, setProcessingFee] = useState(0);
  const [includeProcessingFee, setIncludeProcessingFee] = useState(false); // Include this state
  const [totalAmount, setTotalAmount] = useState(0); 

  useEffect(() => {
    const calculateProcessingFee = (amount) => Math.round((amount * 0.035 + Number.EPSILON) * 100) / 100;
    setProcessingFee(calculateProcessingFee(amount));
  }, [amount]);

  useEffect(() => {
    if (includeProcessingFee && processingFee !== 0) {
      setTotalAmount(amount + processingFee);
    } else {
      setTotalAmount(amount); // Update to just the amount when not including fee
    }
  }, [amount, processingFee, includeProcessingFee]);

  return (
    <AmountContext.Provider value={{ amount, setAmount, currency, setCurrency, processingFee, includeProcessingFee, setIncludeProcessingFee, totalAmount }}>
      {children}
    </AmountContext.Provider>
  );
};

export default AmountContext;
