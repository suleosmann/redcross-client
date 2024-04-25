import React, { useState } from "react";
import { useUserDetails } from "../context/UserDetailsContext";
import { useDonationType } from "../context/DonationTypeContext";
import { useDonationOptions } from "../context/DonationOptionsContext";
import { getData } from "country-list";

function UserForm() {
  const { donationType } = useDonationType();
  const { option } = useDonationOptions();

  const countries = getData();

  const { userDetails, updateUserDetails } = useUserDetails();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateUserDetails(name, value);
  };
  
  const handleAnonymousChange = (isAnonymous) => {
    if (isAnonymous) {
      updateUserDetails({
        email: 'anonymous@anonymous.com',
        firstName: 'Anonymous',
        lastName: 'Anonymous',
        phoneNumber: 'Anonymous',
        company: 'Anonymous',
        address: 'Anonymous',
        country: 'Anonymous',
        county: 'Anonymous',
        anonymous: true,
      });
    } else {
      updateUserDetails({
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        company: '',
        address: '',
        country: '',
        county: '',
        anonymous: false,
      });
    }
  };

  // List of Kenyan counties
  const kenyanCounties = [
    "Baringo",
    "Bomet",
    "Bungoma",
    "Busia",
    "Elgeyo Marakwet",
    "Embu",
    "Garissa",
    "Homa Bay",
    "Isiolo",
    "Kajiado",
    "Kakamega",
    "Kericho",
    "Kiambu",
    "Kilifi",
    "Kirinyaga",
    "Kisii",
    "Kisumu",
    "Kitui",
    "Kwale",
    "Laikipia",
    "Lamu",
    "Machakos",
    "Makueni",
    "Mandera",
    "Marsabit",
    "Meru",
    "Migori",
    "Mombasa",
    "Murang'a",
    "Nairobi",
    "Nakuru",
    "Nandi",
    "Narok",
    "Nyamira",
    "Nyandarua",
    "Nyeri",
    "Samburu",
    "Siaya",
    "Taita-Taveta",
    "Tana River",
    "Tharaka-Nithi",
    "Trans Nzoia",
    "Turkana",
    "Uasin Gishu",
    "Vihiga",
    "Wajir",
    "West Pokot",
  ];

  return (
    <form className="max-w-lg mx-auto my-24">
        {!userDetails.anonymous && (
      <>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="floating_first_name"
            id="floating_first_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
            placeholder=" "
            required
            value={userDetails.firstName}
            onChange={handleInputChange}
          />
          <label
            htmlFor="floating_first_name"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-red-600"
          >
            First name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="floating_last_name"
            id="floating_last_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-blue-red peer"
            placeholder=" "
            required
            value={userDetails.lastName}
            onChange={handleInputChange}
          />
          <label
            htmlFor="floating_last_name"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-red-600"
          >
            Last name
          </label>
        </div>
      </div>
      {donationType === "organization" && (
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="floating_company"
            id="floating_company"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
            placeholder=" "
            required
            value={userDetails.company}
            onChange={handleInputChange}
          />
          <label
            htmlFor="floating_company"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Company (Ex. Google)
          </label>
        </div>
      )}
      {/* Email Input */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="floating_email"
          id="floating_email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
          placeholder=" "
          required
          value={userDetails.email}
          onChange={handleInputChange}
        />
        <label
          htmlFor="floating_email"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-red-600"
        >
          Email address
        </label>
      </div>


      {/* Country Selector */}
      <div className="relative z-0 w-full mb-5 group">
        <select
          name="floating_country"
          id="floating_country"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
          required
          value={userDetails.country}
          onChange={handleInputChange}
        >
          <option value="">Select Country</option>
          {countries.map(({ code, name }) => (
            <option key={code} value={name}>
              {name}
            </option>
          ))}
        </select>
        <label
          htmlFor="floating_country"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-red-600"
        >
          Country
        </label>
      </div>

      {/* Kenyan County Selector */}
      {userDetails.country === "Kenya" && (
        <div className="relative z-0 w-full mb-5 group">
          <select
            name="floating_county"
            id="floating_county"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
            required
            value={userDetails.county}
            onChange={handleInputChange}
          >
            <option value="">Select County</option>
            {kenyanCounties.map((county) => (
              <option key={county} value={county}>
                {county}
              </option>
            ))}
          </select>
          <label
            htmlFor="floating_county"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-red-600"
          >
            County
          </label>
        </div>
      )}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          name="floating_phone"
          id="floating_phone"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
          placeholder=" "
          required
          value={userDetails.phoneNumber}
          onChange={handleInputChange}
        />
        <label
          htmlFor="floating_phone"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Phone number (123-456-7890)
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_address"
          id="floating_address"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
          placeholder=""
          required
          value={userDetails.address}
          onChange={handleInputChange}
        />
        <label
          htmlFor="floating_company"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Physical Address
        </label>
      </div>

      
      </>)}
      {option !== "pledge" && donationType !== "organization" &&(
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={userDetails.anonymous}
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
}

export default UserForm;
