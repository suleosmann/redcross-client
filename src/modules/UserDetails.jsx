import React from 'react';
import { getData } from 'country-list';
import { useDonationDetails } from '../context/DonationDetailsContext';
import { useDonationType } from '../context/DonationTypeContext';

const UserDetails = () => {
  const { userDetails, updateUserDetails } = useDonationDetails();
  const { donationType } = useDonationType();
  const countries = getData();

  const handleAnonymousChange = (isAnonymous) => {
    updateUserDetails({
      ...userDetails,
      firstName: isAnonymous ? 'Anonymous' : '',
      lastName: isAnonymous ? 'Anonymous' : '',
      email: isAnonymous ? 'anonymous@example.com' : '',
      country: isAnonymous ? 'Anonymous' : 'Kenya',
      phone: isAnonymous ? 'Anonymous' : '+254',
      anonymous: isAnonymous,
      county: isAnonymous ? '' : userDetails.county,
      physicalAddress: isAnonymous ? '' : userDetails.physicalAddress,
    });
  };

  const handleChange = (name, value) => {
    updateUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userDetails);
    // Normally, you'd send this data to the server here
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {donationType === "Donate Now" && (
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={userDetails.anonymous || false}
            onChange={(e) => handleAnonymousChange(e.target.checked)}
            className="w-4 h-4"
          />
          <label className="ml-2 text-gray-700 text-sm">
            Donate anonymously
          </label>
        </div>
      )}
      {!userDetails.anonymous && (
        <>
          <div className="mb-4 md:flex md:justify-between">
            <input
              type="text"
              placeholder="First name"
              value={userDetails.firstName || ''}
              onChange={(e) => handleChange('firstName', e.target.value)}
              required
              className="mb-2 md:mb-0 md:mr-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Last name"
              value={userDetails.lastName || ''}
              onChange={(e) => handleChange('lastName', e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={userDetails.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <select
              value={userDetails.country || ''}
              onChange={(e) => handleChange('country', e.target.value)}
              required
              className="mb-2 md:mb-0 md:mr-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {countries.map(({ code, name }) => (
                <option key={code} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          {/* Always show Physical Address field */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Physical Address"
              value={userDetails.physicalAddress || ''}
              onChange={(e) => handleChange('physicalAddress', e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Phone"
              value={userDetails.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </>
      )}
    </form>
  );
};

export default UserDetails;
