import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = ({ text, color = 'red', textColor = 'white', icon, onClick, className }) => {
  // Determine base color classes based on the color prop
  const baseColorClasses = color === 'red' ? 'bg-red-500 hover:bg-red-500' : 'bg-red-500 hover:bg-red-500';

  // Check if icon is a string (path to an image) or a FontAwesome icon object
  const isImageIcon = typeof icon === 'string';

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-6 py-2 rounded-full ${baseColorClasses} text-${textColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-600 transition ease-in duration-200 text-center text-base font-semibold shadow-md ${className}`}
    >
      {isImageIcon ? (
        <img src={icon} alt="Icon" className="mr-2 h-5 w-5" /> // Adjust h-5 w-5 based on your needs
      ) : (
        icon && <FontAwesomeIcon icon={icon} className={`mr-2 text-${textColor}`} />
      )}
      {text}
    </button>
  );
};

export default Button;
