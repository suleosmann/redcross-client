import React, { useState, useEffect } from "react";
import { useAmount } from "../../context/AmountContext";

// Preset amounts in USD
const amountsUSD = [75, 125, 250, 500, 1000];
// Corresponding preset amounts in KSH, hardcoded for direct control
const amountsKSH = [1500, 2500, 5000, 10000, 20000];

const AmountSelector = ({ currency }) => {
  const { setAmount, setCurrency } = useAmount();

  // The initial selected amount and custom amount are now purely component state
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");

  // Determine initial currency state from props instead of session storage
  const [isKsh, setIsKsh] = useState(currency === "KSH");

  // No need for useEffect hooks to sync with session storage here
  
  useEffect(() => {
    // Directly update amount in context when selectedAmount or customAmount changes
    if (selectedAmount !== null) {
      setAmount(selectedAmount);
    } else if (customAmount !== "") {
      setAmount(parseFloat(customAmount) || 0);
    }
  }, [selectedAmount, customAmount, setAmount]);

  // Currency change now directly toggles between USD and KSH without session storage
  const toggleCurrency = () => {
    const newCurrency = isKsh ? "USD" : "KSH";
    setIsKsh(!isKsh);
    setCurrency(newCurrency);
  };

  const handlePresetAmountClick = (amount) => {
    // Check if the clicked amount is already selected
    if (selectedAmount === amount) {
        // Unset the selected amount
        setSelectedAmount(null);
        setCustomAmount(""); // Reset custom amount if any
    } else {
        // Set the clicked amount as the new selected amount
        setSelectedAmount(amount);
        setCustomAmount(""); // Reset custom amount if it was previously set
    }
    console.log(amount)
};


  const handleCustomAmountChange = (e) => {
    const newCustomAmount = e.target.value;
    setSelectedAmount(null);
    setCustomAmount(newCustomAmount);
  };

  return (
    <div className="mb-4">
      <div className="flex space-x-6">
      <div className="mb-4 flex items-center">
        <label className="mr-2">{isKsh ? "KSH" : "USD"}</label>
        <div onClick={toggleCurrency} className="relative inline-block w-12 h-6 bg-gray-300 rounded-full cursor-pointer">
          <span className={`absolute left-1 top-1 bg-red-600 w-4 h-4 rounded-full transition-transform ${isKsh ? "translate-x-6" : ""}`}></span>
        </div>
      </div>
      <div>
        <p>Choose Amount</p>
      </div>
      </div>
      <div className="flex items-center space-x-4">
        {(isKsh ? amountsKSH : amountsUSD).map((presetAmount) => (
          <button
            key={presetAmount}
            onClick={() => handlePresetAmountClick(presetAmount)}
            className={`w-[600px] h-10 rounded-lg border-2 ${
              selectedAmount === presetAmount
                ? "bg-white text-red-500 border-red-500"
                : "bg-red-500 text-white border-transparent"
            }`}
          >
            {isKsh ? `KSH ${presetAmount}` : `$${presetAmount}`}
          </button>
        ))}
        <div className="flex border-2 border-red-500">
          <span className="p-2 bg-red-500 text-white">
            {isKsh ? "KSH" : "$"}
          </span>
          <input
            type="number"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="Other Amounts"
            className="w-40 h-10"
          />
        </div>
      </div>
    </div>
  );
};

export default AmountSelector;
