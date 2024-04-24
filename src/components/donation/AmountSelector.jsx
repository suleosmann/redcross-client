import React, { useEffect, useState } from "react";
import { useAmount } from "../../context/AmountContext";

// Preset amounts in USD and their KSH equivalents
const amountsUSD = [75, 125, 250, 500, 1000];
const amountsKSH = [1500, 2500, 5000, 10000, 20000];

const AmountSelector = ({ currency }) => {
  const { amount, setAmount, setCurrency } = useAmount();

  // Using state to handle which currency is currently active
  const [isKsh, setIsKsh] = useState(currency === "KSH");

  // Update the local state based on the current value in the context
  const [selectedAmount, setSelectedAmount] = useState(amount);
  const [customAmount, setCustomAmount] = useState("");

  useEffect(() => {
    // Set the amount in context when selectedAmount changes
    setAmount(selectedAmount);
  }, [selectedAmount, setAmount]);

  useEffect(() => {
    // Update the custom amount in context if it's a valid number
    if (customAmount !== "") {
      setAmount(parseFloat(customAmount) || 0);
    }
  }, [customAmount, setAmount]);

  // Toggle currency between USD and KSH
  const toggleCurrency = () => {
    const newCurrency = isKsh ? "USD" : "KSH";
    setIsKsh(!isKsh);
    setCurrency(newCurrency);
    // Reset selected amount when changing currency
    setSelectedAmount(null);
    setCustomAmount("");
  };

  const handlePresetAmountClick = (amount) => {
    // Toggle selected amount or deselect if the same amount is clicked
    if (selectedAmount === amount) {
      setSelectedAmount(null);
    } else {
      setSelectedAmount(amount);
      setCustomAmount(""); // Clear custom amount input
    }
  };

  const handleCustomAmountChange = (e) => {
    const newCustomAmount = e.target.value;
    setSelectedAmount(null); // Clear any selected preset amount
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
            placeholder="Other Amount"
            className="w-40 h-10"
          />
        </div>
      </div>
    </div>
  );
};

export default AmountSelector;
