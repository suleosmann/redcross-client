import React, { useState } from "react";
import { getData } from "country-list";
import { useDonationDetails } from "../../context/DonationDetailsContext";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const kenyanCounties = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet",
  "Embu", "Garissa", "Homa Bay", "Isiolo", "Kajiado",
  "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga",
  "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia",
  "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit",
  "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi",
  "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua",
  "Nyeri", "Samburu", "Siaya", "Taita-Taveta", "Tana River",
  "Tharaka-Nithi", "Trans Nzoia", "Turkana", "Uasin Gishu",
  "Vihiga", "Wajir", "West Pokot"
];


const UserDetails = () => {
  const { userDetails, updateUserDetails } = useDonationDetails();
  const [selectedCountry, setSelectedCountry] = useState(
    userDetails.country || ""
  );
  const countries = getData();
  const [isCompanyDonation, setIsCompanyDonation] = useState(false);
  const [phone, setPhone] = useState(userDetails.phone || "");

  const handleAnonymousChange = (isAnonymous) => {
    const updatedDetails = isAnonymous
      ? {
          ...userDetails,
          firstName: "Anonymous",
          lastName: "Anonymous",
          email: "anonymous@example.com",
          country: "Anonymous",
          phone: "Anonymous",
          address: "Anonymous",
          anonymous: true,
        }
      : {
          ...userDetails,
          anonymous: false,
        };
    updateUserDetails(updatedDetails);
    console.log("Updated details:", updatedDetails);
  };

  const handleCompanyDonationChange = (checked) => {
    setIsCompanyDonation(checked);
    if (!checked) {
      handleChange("companyName", "");
    } else {
      // If the donation is on behalf of a company, ensure it's not marked as anonymous
      handleAnonymousChange(false);
    }
  };

  const handleChange = (name, value) => {
    if (name === "country") {
      setSelectedCountry(value);
      if (value !== "Kenya") {
        updateUserDetails({ ...userDetails, county: "" });
      }
    }
    updateUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUserDetails({ ...userDetails, isCompanyDonation, phone });
    console.log("Submitted details:", userDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-20 my-12">
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="companyDonationCheckbox"
          checked={isCompanyDonation}
          onChange={(e) => handleCompanyDonationChange(e.target.checked)}
          className="w-4 h-6"
        />
        <label
          htmlFor="companyDonationCheckbox"
          className="ml-2 text-gray-700 text-sm"
        >
          Is this donation on behalf of a company?
        </label>
      </div>

      {isCompanyDonation && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Company name"
            value={userDetails.companyName || ""}
            onChange={(e) => handleChange("companyName", e.target.value)}
            required={isCompanyDonation}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Company name"
          />
        </div>
      )}

      {/* Personal details inputs, shown only when not donating anonymously */}
      {!userDetails.anonymous && (
        <>
          <div className="mb-4 flex">
            <input
              type="text"
              placeholder="First name"
              value={userDetails.firstName || ""}
              onChange={(e) => handleChange("firstName", e.target.value)}
              required={!userDetails.anonymous}
              className="w-full mr-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Last name"
              value={userDetails.lastName || ""}
              onChange={(e) => handleChange("lastName", e.target.value)}
              required={!userDetails.anonymous}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={userDetails.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              required={!userDetails.anonymous}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Select country */}
          <div className="flex">
            <div className="mb-4 mr-4">
              <select
                value={selectedCountry}
                onChange={(e) => handleChange("country", e.target.value)}
                required={!userDetails.anonymous}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {countries.map(({ code, name }) => (
                  <option key={code} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {selectedCountry === "Kenya" && (
              <div className="mb-4">
                <select
                  value={userDetails.county || ""}
                  onChange={(e) => handleChange("county", e.target.value)}
                  required={selectedCountry === "Kenya"}
                  className="w-full px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="">Select County</option>
                  {kenyanCounties.map((county) => (
                    <option key={county} value={county}>
                      {county}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </>
      )}
      <div className="mb-4">
        <input
          type="address"
          placeholder="Physical Address"
          value={userDetails.address || ""}
          onChange={(e) => handleChange("address", e.target.value)}
          required={!userDetails.anonymous}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {!userDetails.anonymous && (
        <div className="mb-4">
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="KE"
            value={phone}
            onChange={(value) => handleChange("phone", value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
      {!isCompanyDonation && (
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={userDetails.anonymous || false}
            onChange={(e) => handleAnonymousChange(e.target.checked)}
            className="w-4 h-4"
            id="anonymousCheckbox"
          />
          <label
            htmlFor="anonymousCheckbox"
            className="ml-2 text-gray-700 text-sm"
          >
            Donate anonymously
          </label>
        </div>
      )}
      
    </form>
  );
};

export default UserDetails;