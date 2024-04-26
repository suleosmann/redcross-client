import React, { useState } from 'react';
import { useDonation } from '../../context/DonationContext';  // Ensure this path matches your actual file structure

const causesDetails = {
  default: {
    title: 'How a gift to Disaster Relief can help',
    description: 'Your gift to Red Cross Disaster Relief helps people affected by disasters like home fire, hurricanes, tornadoes and countless other crises. Financial donations enable the Red Cross to prepare for, respond to and help people recover from disasters big and small.',
    img: 'https://www.redcross.or.ke/wp-content/uploads/2024/01/WhatsApp-Image-2024-01-17-at-174249-1200x750.jpeg'
  },
  'Where it Matters': {
    title: 'Where it Matters',
    description: "Your gift to Where it Is Needed Most gives us the flexibility to respond whenever and wherever we're needed, providing relief and hope in a dark hour.",
    img: 'https://www.redcross.or.ke/wp-content/uploads/2023/08/key-requirement-1200x800-1.jpg'
  },
  'El-Nino Response': {
    title: 'Supporting El-Nino Response',
    description: 'Aid those affected by the devastating effects of the El-Nino weather phenomenon...',
    img: 'https://www.redcross.or.ke/wp-content/uploads/2024/01/WhatsApp-Image-2024-01-17-at-174249-1200x750.jpeg'
  },
  'Embakasi Gas Explosion': {
    title: 'Helping Victims of Embakasi Gas Explosion',
    description: 'Provide relief to the families impacted by the Embakasi gas explosion...',
    img: 'https://www.aljazeera.com/wp-content/uploads/2024/02/AFP__20240130__34H94FY__v3__Preview__TopshotKenyaFire-1706852455.jpg?resize=1170%2C780&quality=80'
  },
};

const SupportDropdown = () => {
  const [selectedCause, setSelectedCause] = useState('default');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { selectSupportOption } = useDonation(); // Destructure the function to set selected support option

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectCause = (causeKey) => {
    setSelectedCause(causeKey);
    selectSupportOption(causesDetails[causeKey].title); // Update the selected support option in the context
    setIsDropdownOpen(false);
  };

  const { title, description, img } = causesDetails[selectedCause];

  return (
    <div className="relative inline-block text-left mt-4 w-full">
      <div>
        <button
          type="button"
          onClick={handleButtonClick}
          className="inline-flex justify-center w-full md:w-96 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
        >
          {selectedCause === 'default' ? 'Select a cause' : title}
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isDropdownOpen && (
        <div className="origin-top-left absolute left-0 mt-2 w-full md:w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {Object.keys(causesDetails).filter(key => key !== 'default').map((causeKey) => (
              <button
                key={causeKey}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleSelectCause(causeKey)}
              >
                {causesDetails[causeKey].title}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 p-4 border-t border-gray-200">
        <div className="flex flex-col md:flex-row">
          <img src={img} alt={title} className="object-cover h-32 w-full md:w-48" />
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportDropdown;
