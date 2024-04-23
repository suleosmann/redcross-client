import React from "react";
import { useFrequency } from "../../context/FrequencyContext";

const DonationDetails = () => {
    const { frequency, donationDate, updateDonationDate } = useFrequency();

    const handleDateChange = (event) => {
        const newDate = event.target.value;
        // Ensure the entered date is within the 1-28 range
        const validDate = Math.max(1, Math.min(28, parseInt(newDate, 10) || 0));
        updateDonationDate(validDate);
    };

    return (
        <div>
            {frequency === "monthly" && (
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Choose a Donation Date (1-28):
                        <input
                            type="number"
                            value={donationDate || ''}
                            onChange={handleDateChange}
                            min="1"
                            max="28"
                            placeholder="Day of the month"
                            className="mt-1 block w-64 rounded-md border-2 border-grey-200 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500"
                        />
                    </label>
                </div>
            )}
        </div>
    );
};

export default DonationDetails;
