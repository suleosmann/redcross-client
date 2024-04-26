import React, { useEffect, useState } from "react";
import { useAmount } from "../../context/AmountContext";
import { useDonationType } from "../../context/DonationTypeContext";

// Preset amounts in USD and their KSH equivalents for individuals and organizations
const amountsUSDIndividual = [75, 125, 250, 500, 1000, 2000];
const amountsKSHIndividual = [1500, 2500, 5000, 10000, 20000, 30000];
const amountsUSDOrganization = [250, 500, 1000, 2000, 4000, 5000];
const amountsKSHOrganization = [25000, 50000, 100000, 200000, 400000, 500000];

const AmountSelector = ({ currency , onAmountButtonClick}) => {
  const { amount, setAmount, setCurrency } = useAmount();
  const { donationType } = useDonationType();
  const [isKsh, setIsKsh] = useState(true); // Set KSH as the default currency
  const [selectedAmount, setSelectedAmount] = useState(amount);
  const [customAmount, setCustomAmount] = useState("");

  // Choose the correct set of amounts based on donation type and currency
  const amountsUSD = donationType === "organization" ? amountsUSDOrganization : amountsUSDIndividual;
  const amountsKSH = donationType === "organization" ? amountsKSHOrganization : amountsKSHIndividual;

  useEffect(() => {
    setAmount(selectedAmount);
  }, [selectedAmount, setAmount]);

  useEffect(() => {
    if (customAmount !== "") {
      setAmount(parseFloat(customAmount) || 0);
    }
  }, [customAmount, setAmount]);

  useEffect(() => {
    setCurrency(isKsh ? "KSH" : "USD");
  }, [isKsh, setCurrency]);

  const toggleCurrency = () => {
    setIsKsh(!isKsh);
  };

  const handlePresetAmountClick = (amount) => {
    setSelectedAmount(selectedAmount === amount ? null : amount);
    setCustomAmount("");
    onAmountButtonClick()
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  

  return (
    <div className="mb-4">
      <div className="flex items-center space-x-2 mb-4">
        <span className={`text-gray-700 font-medium ${isKsh ? "font-bold" : ""}`}>KSH</span>
        <div onClick={toggleCurrency} className="relative inline-block w-12 h-6 bg-gray-300 rounded-full cursor-pointer transition-colors duration-300">
          <span className={`absolute left-1 top-1 bg-red-600 w-4 h-4 rounded-full shadow-md transition-transform duration-300 ${isKsh ? "" : "translate-x-6"}`}></span>
        </div>
        <span className={`text-gray-700 font-medium ${!isKsh ? "font-bold" : ""}`}>USD</span>
      </div>
      <p className="font-medium mb-2">Choose Amount:</p>
      <div className="grid grid-cols-3 gap-4">
        {(isKsh ? amountsKSH : amountsUSD).map((presetAmount) => (
          <button
            key={presetAmount}
            onClick={() => handlePresetAmountClick(presetAmount)}
            className={`text-sm px-3 py-2 rounded-md border ${
              selectedAmount === presetAmount ? "bg-red-500 text-white border-red-500" : "bg-white text-red-500 border-gray-300"
            }`}
          >
            {isKsh ? `KSH ${presetAmount}` : `$${presetAmount}`}
          </button>
        ))}
      </div>
      <div className="flex border-2 border-gray-300 rounded-md overflow-hidden mt-3">
          <span className="p-2 bg-red-500 text-white">
            {isKsh ? "KSH" : "$"}
          </span>
          <input
            type="number"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="Other Amount"
            className="flex-1 p-2 text-sm"
          />
        </div>
    </div>
  );
};

export default AmountSelector;
