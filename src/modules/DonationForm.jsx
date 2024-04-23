import React, { useState, useContext } from 'react';
import { AmountContext } from '../context/AmountContext';
import { DonationDetailsContext } from '../context/DonationDetailsContext';
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
  const tabLabels = ['My Donation', 'Payment Type', 'Payment Details'];
  const [activeTab, setActiveTab] = useState(tabLabels[0]);

  const { amount, phone } = useContext(AmountContext);
  const { paymentMethod, userDetails } = useContext(DonationDetailsContext);

  const [errorMessage, setErrorMessage] = useState('');

  const handleContinueClick = () => {
    setErrorMessage(''); // Clear previous error messages

    // Add your validation logic here

    // Move to the next tab if validations pass
    const currentTabIndex = tabLabels.indexOf(activeTab);
    const nextTabIndex = currentTabIndex + 1;
    if (nextTabIndex < tabLabels.length) {
      setActiveTab(tabLabels[nextTabIndex]);
    }
  };

  const handleBackClick = () => {
    const currentTabIndex = tabLabels.indexOf(activeTab);
    const prevTabIndex = currentTabIndex - 1;
    if (prevTabIndex >= 0) {
      setActiveTab(tabLabels[prevTabIndex]);
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
          <Button
          text="Back"
          color="red"
          textColor="white"
          className="w-32 h-12 mt-4"
          onClick={handleBackClick}
        />
        )}
        {activeTab !== tabLabels[tabLabels.length - 1] && (
          <ContinueButton handleContinueClick={handleContinueClick} />
          
        )}
        {activeTab === tabLabels[tabLabels.length - 1] && (
          <SubmitDonation handleBackClick={handleBackClick} />
          
        )}
      </div>
    </div>
  );
};

export default DonationForm;
