import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAmount } from "../context/AmountContext";
import { useDonationOptions } from "../context/DonationOptionsContext";
import Tabs from "../components/donation/Tabs";
import TabPanel from "../components/donation/TabPanel";
import MyDonation from "./MyDonation";
import UserForm from "../pages/UserForm";
import PaymentDetails from "./PaymentDetails";
import ContinueButton from "../components/donation/ContinueButton";
import SubmitDonation from "./SubmitDonation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDonate, faCreditCard, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/common/Button";
import { useUserDetails } from "../context/UserDetailsContext";

const DonationForm = () => {
  const { userDetails, isComplete } = useUserDetails();
  const navigate = useNavigate();
  const { amount } = useAmount();
  const { option } = useDonationOptions();
  const tabLabels = ["Donate", "Details", "Payment"];
  const [activeTab, setActiveTab] = useState(tabLabels[0]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleContinueClick = async () => {
    if (activeTab === "Donate") {
      if (!amount) {
        setErrorMessage("Please enter a valid amount.");
        return;
      }
      setErrorMessage("");
    }
    setErrorMessage("");
    if (activeTab === "Details" && !isComplete()) {
      setErrorMessage("Please complete all required fields");
      return;
    }
    setErrorMessage("");
    const currentTabIndex = tabLabels.indexOf(activeTab);
    const nextTabIndex = currentTabIndex + 1;
    if (nextTabIndex < tabLabels.length) {
      setActiveTab(tabLabels[nextTabIndex]);
    }
  };

  const handleAmountButtonClick = () => {
    // Clear the error message when an amount button is clicked
    setErrorMessage("");
  };

  return (
    <div className="bg-white h-{100vhh} p-4  max-w-full md:max-w-1/2 my-2">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab}>
        <TabPanel
          label="Donate"
          icon={<FontAwesomeIcon icon={faDonate} className="text-gray-500" />}
        >
          <MyDonation onAmountButtonClick={handleAmountButtonClick} />
        </TabPanel>
        <TabPanel
          label="Details"
          icon={<FontAwesomeIcon icon={faFileAlt} className="text-gray-500" />}
        >
          <UserForm />
        </TabPanel>
        <TabPanel
          label="Payment"
          icon={<FontAwesomeIcon icon={faCreditCard} className="text-gray-500" />}
        >
          <PaymentDetails />
        </TabPanel>
      </Tabs>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}

      <div className="mt-4 flex flex-row justify-between items-center">
        {activeTab !== tabLabels[0] && (
          <Button
            text="Back"
            color="red"
            textColor="white"
            className="w-32 h-12 mb-2 md:mb-0"
            onClick={() =>
              setActiveTab(tabLabels[tabLabels.indexOf(activeTab) - 1])
            }
          />
        )}
        {activeTab !== tabLabels[tabLabels.length - 1] && (
          <ContinueButton handleContinueClick={handleContinueClick} />
        )}
        {activeTab === tabLabels[tabLabels.length - 1] && <SubmitDonation />}
      </div>
    </div>
  );
};

export default DonationForm;
