import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { AmountContext } from '../context/AmountContext';
import { DonationDetailsContext } from '../context/DonationDetailsContext';
import { useDonationOptions } from '../context/DonationOptionsContext'; // Import the custom hook
import Tabs from '../components/donation/Tabs';
import TabPanel from '../components/donation/TabPanel';
import MyDonation from './MyDonation';
import PaymentType from './PaymentType';
import PaymentDetails from './PaymentDetails';
import ContinueButton from '../components/donation/ContinueButton';
import SubmitDonation from './SubmitDonation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDonate, faCreditCard, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import Button from "../components/common/Button";

const DonationForm = () => {
  const navigate = useNavigate(); // For navigation
  const { option } = useDonationOptions(); // Get the donation option
  const tabLabels = ['My Donation', 'Payment Type', 'Payment Details'];
  const [activeTab, setActiveTab] = useState(tabLabels[0]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleContinueClick = () => {
    setErrorMessage(''); // Clear previous error messages

    const currentTabIndex = tabLabels.indexOf(activeTab);
    const nextTabIndex = currentTabIndex + 1;

    if (option === 'pledge' && currentTabIndex === 1) {
      // Redirect to a custom page or change the component state
      navigate('/pledge-complete'); // Example of using navigate
    } else if (nextTabIndex < tabLabels.length) {
      setActiveTab(tabLabels[nextTabIndex]);
    }
  };

  return (
    <div className="bg-white h-[80vh] p-4 rounded-lg shadow-md max-w-1/2 my-2">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab}>
        <TabPanel label="My Donation" icon={<FontAwesomeIcon icon={faDonate} className="text-gray-500" />}>
          <MyDonation />
        </TabPanel>
        <TabPanel label="Payment Type" icon={<FontAwesomeIcon icon={faCreditCard} className="text-gray-500" />}>
          <PaymentType />
        </TabPanel>
        <TabPanel label="Payment Details" icon={<FontAwesomeIcon icon={faFileAlt} className="text-gray-500" />}>
          <PaymentDetails />
        </TabPanel>
      </Tabs>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}

      <div className="mt-4 flex justify-between">
        {activeTab !== tabLabels[0] && (
          <Button text="Back" color="red" textColor="white" className="w-32 h-12 mt-4" onClick={() => setActiveTab(tabLabels[tabLabels.indexOf(activeTab) - 1])} />
        )}
        {activeTab !== tabLabels[tabLabels.length - 1] && (
          <ContinueButton handleContinueClick={handleContinueClick} />
        )}
        {activeTab === tabLabels[tabLabels.length - 1] && (
          <SubmitDonation />
        )}
      </div>
    </div>
  );
};

export default DonationForm;
