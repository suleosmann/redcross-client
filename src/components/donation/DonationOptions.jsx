import React, { useState } from "react";

const DonationOptions = () => {
  const [option, setOption] = useState("donate");
  const [frequency, setFrequency] = useState("one-time");
  const [selectedDay, setSelectedDay] = useState('');

  console.log(frequency);
  console.log(option);
  console.log(selectedDay);

  const handleDayChange = (e) => {
    const day = parseInt(e.target.value, 10);
    if (day >= 1 && day <= 28) {
      setSelectedDay(day);
    } else {
      // Optionally handle invalid day (e.g., reset the input or show an error message)
      console.log("Please enter a day between 1 and 28.");
      setSelectedDay(""); // Resets the input if the day is not within the range
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-4 mb-4">
        <div className="flex items-center space-x-4">
          <h3>Select donation option: </h3>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              className="form-radio"
              name="donationOption"
              value="donate"
              checked={option === "donate"}
              onChange={() => setOption("donate")}
            />
            <span className="ml-2">Donate Now</span>
          </label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              className="form-radio text-red-600"
              name="donationOption"
              value="pledge"
              checked={option === "pledge"}
              onChange={() => setOption("pledge")}
            />
            <span className="ml-2">Make a Pledge</span>
          </label>
        </div>

        {option === "pledge" && (
          <>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 ${
                  frequency === "one-time"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-600"
                }`}
                onClick={() => setFrequency("one-time")}
              >
                ONE TIME
              </button>
              <button
                className={`px-4 py-2 ${
                  frequency === "monthly"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-600"
                }`}
                onClick={() => setFrequency("monthly")}
              >
                MONTHLY
              </button>
            </div>
            {frequency === "monthly" && (
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  placeholder="Day (1-28)"
                  id="pledge-day"
                  name="pledge-day"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  min="1"
                  max="28"
                  value={selectedDay}
                  onChange={handleDayChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DonationOptions;