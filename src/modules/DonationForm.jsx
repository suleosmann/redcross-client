import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AmountContext, useAmount } from '../context/AmountContext';
import { useDonationDetails } from '../context/DonationDetailsContext';
import { useDonationOptions } from '../context/DonationOptionsContext';

import Tabs from '../components/donation/Tabs';
import TabPanel from '../components/donation/TabPanel';
import MyDonation from './MyDonation';
import UserDetailsForm from './UserDetailsForm';
import PaymentDetails from './PaymentDetails';
import ContinueButton from '../components/donation/ContinueButton';
import SubmitDonation from './SubmitDonation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDonate, faCreditCard, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import Button from "../components/common/Button";
import useSubmitPledge from '../hooks/useSubmitPledge';

import { useUserDetails } from '../context/UserDetailsContext';

const DonationForm = () => {
  const { userDetails, isComplete } = useUserDetails();

  const navigate = useNavigate();
  const { amount } = useAmount();
  const { option, selectedDay, frequency } = useDonationOptions();
  const { submitDonation, isLoading, error } = useSubmitPledge();

  const tabLabels = ['My Donation', 'User Details Form', 'Payment Details'];
  const [activeTab, setActiveTab] = useState(tabLabels[0]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleContinueClick = async () => {
    if (activeTab === 'My Donation') {
      if (!amount) {
        setErrorMessage('Please enter a valid amount and select an option.');
        return; 
      }
      else if (frequency === 'monthly' && !selectedDay) {
        setErrorMessage('Please select a pledge day.');
        return;
      }
    }
    
    // Validate user details in the "User Details Form" tab
    if (activeTab === 'User Details Form' && !isComplete()) {
      setErrorMessage('Please complete all required fields');
      return;
    }
  
    setErrorMessage('');
    const currentTabIndex = tabLabels.indexOf(activeTab);
    const nextTabIndex = currentTabIndex + 1;
  
    if (option === 'pledge' && currentTabIndex === 1) {
      try {
        const result = await submitDonation(userDetails);
        console.log('Donation submitted successfully:', result);
        navigate('/pledge-complete');
      } catch (error) {
        console.error('Error submitting donation:', error);
        setErrorMessage(error.message || 'Failed to submit donation.');
      }
    } else if (nextTabIndex < tabLabels.length) {
      setActiveTab(tabLabels[nextTabIndex]);
    }
  };
  

  return (
    <div className="bg-white h-screen p-4 rounded-lg shadow-md max-w-1/2 my-2">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab}>
        <TabPanel label="My Donation" icon={<FontAwesomeIcon icon={faDonate} className="text-gray-500" />}>
          <MyDonation />
        </TabPanel>
        <TabPanel label="User Details Form" icon={<FontAwesomeIcon icon={faCreditCard} className="text-gray-500" />}>
          <UserDetailsForm />
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
          <ContinueButton handleContinueClick={handleContinueClick} isLoading={isLoading} />
        )}
        {activeTab === tabLabels[tabLabels.length - 1] && (
          <SubmitDonation />
        )}
      </div>
    </div>
  );
};

export default DonationForm;
