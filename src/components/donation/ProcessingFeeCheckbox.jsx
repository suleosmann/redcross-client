import React from "react";
import { useAmount } from "../../context/AmountContext";

const ProcessingFeeCheckbox = () => {
  const { amount, currency, processingFee, totalAmount, includeProcessingFee, setIncludeProcessingFee } = useAmount();

  const handleCheckboxChange = (e) => {
    setIncludeProcessingFee(e.target.checked);
    console.log(e.target.checked);
  };

  console.log(currency);
  const currencySymbol = currency === 'USD' ? '$' : 'KSH';
  console.log('total',totalAmount)
  return (
    <div className="p-4 border border-gray-300 rounded-md">
      <label className="flex items-center mt-2">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-black border-gray-300 rounded"
          checked={includeProcessingFee}
          onChange={handleCheckboxChange}
        />
        <span className="ml-2 text-gray-700 text-sm">
          Please add {currencySymbol} {processingFee} to cover processing fees and
          other expenses associated with my donation.
        </span>
      </label>
      {includeProcessingFee && (
        <p className="mt-2 text-gray-700 text-sm">
          Total donation amount including processing fees: {currencySymbol} {totalAmount}
        </p>
      )}
    </div>
  );
};

export default ProcessingFeeCheckbox;
