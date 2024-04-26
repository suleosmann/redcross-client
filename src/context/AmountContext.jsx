import React, { createContext, useContext, useState, useEffect } from 'react';

export const AmountContext = createContext();

export const useAmount = () => useContext(AmountContext);

export const AmountProvider = ({ children }) => {
  const [amount, setAmount] = useState(null);
  const [currency, setCurrency] = useState('KSH');
  const [processingFee, setProcessingFee] = useState(0);
  const [includeProcessingFee, setIncludeProcessingFee] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, selectPaymentMethod] = useState('card');

  useEffect(() => {
    // Calculate processing fee based on the amount
    const calculateProcessingFee = (amount) => Math.round((amount * 0.035 + Number.EPSILON) * 100) / 100;
    setProcessingFee(calculateProcessingFee(amount));
  }, [amount]);

  useEffect(() => {
    // Reset processing fee to zero when currency changes
    setProcessingFee(0);
    setTotalAmount(amount); // Reset total amount to be without processing fee
  }, [currency]);

  useEffect(() => {
    // Adjust total amount based on whether processing fees are included
    if (includeProcessingFee) {
      setTotalAmount(amount + processingFee);
    } else {
      setTotalAmount(amount);
    }
  }, [amount, processingFee, includeProcessingFee]);

  return (
    <AmountContext.Provider value={{
      amount, setAmount,
      currency, setCurrency,
      processingFee, includeProcessingFee, setIncludeProcessingFee,
      totalAmount, paymentMethod, selectPaymentMethod
    }}>
      {children}
    </AmountContext.Provider>
  );
};

export default AmountContext;
