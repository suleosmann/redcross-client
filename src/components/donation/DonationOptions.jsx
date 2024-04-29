import React, {useEffect} from "react";
import { useDonationOptions } from "../../context/DonationOptionsContext";
import { useDonationType } from '../../context/DonationTypeContext';
import { useUserDetails } from '../../context/UserDetailsContext';  // Assuming this is the correct path

const DonationOptions = () => {
  const { option, setOption, frequency, setFrequency } = useDonationOptions();
  const { donationType, setDonationType } = useDonationType();
  const { userDetails, updateUserDetails } = useUserDetails(); // Use this to manage user details

  useEffect(() => {
    if (donationType === "organization" || option === "pledge") {
      if (userDetails.anonymous) {
        updateUserDetails({ anonymous: false });
      }
    }
  }, [donationType, option, userDetails.anonymous, updateUserDetails]);

  console.log("donate", donationType);


  return (
    <>
      <div className="flex flex-col space-y-4 mb-4">
        <div className="flex flex-col sm:flex-row  space-y-4 sm:space-y-0 sm:space-x-4">
          <h3 className="flex-shrink-0">Select donate as:</h3>
          <div className="flex flex-wrap items-center space-x-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio"
                name="donateType"
                value="individual"
                checked={donationType === "individual"}
                onChange={() => setDonationType("individual")}
              />
              <span className="ml-2">Individual</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio text-red-600"
                name="donateType"
                value="organization"
                checked={donationType === "organization"}
                onChange={() => setDonationType("organization")}
              />
              <span className="ml-2">Organization</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4 mb-4">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <h3 className="flex-shrink-0">Select donation option:</h3>
          <div className="flex flex-wrap items-center space-x-4">
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
        </div>

        {option === "pledge" && (
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
        )}
      </div>
    </>
  );
};

export default DonationOptions;
