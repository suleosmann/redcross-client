import React from "react";
import Button from "../components/common/Button";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import mpesa from "../assets/mpesa.png";
import UserDetails from "./UserDetails";
import { useDonationDetails } from "../context/DonationDetailsContext";
import { useDonationType } from "../context/DonationTypeContext";
import DetailsForm from "../components/donation/DetailsForm";


const PaymentOptions = () => {
  // // Use context for managing the selected payment method
  // const { paymentMethod, selectPaymentMethod } = useDonationDetails();
  // const { donationType } = useDonationType();
  
  // if (donationType === "Make a Pledge") {
  //   return <UserDetails />;
  // }

  return (
    <>
    <DetailsForm/>
      {/* <div className="flex justify-between space-x-4 my-12">
        <Button
          text="Credit Card"
          color={paymentMethod === "creditCard" ? "white" : "transparent"}
          textColor="black"
          icon={faCreditCard}
          onClick={() => selectPaymentMethod("creditCard")}
          className={`w-1/2 rounded-none h-32 p-4 border-2 bg-white ${
            paymentMethod === "creditCard"
              ? "border-red-600"
              : "border-gray-300"
          }`}
        />
        <Button
          text="Mpesa"
          color={paymentMethod === "Mpesa" ? "white" : "transparent"}
          textColor="black"
          icon={mpesa}
          onClick={() => selectPaymentMethod("Mpesa")}
          className={`w-1/2 p-4 rounded-none bg-white border-2 ${
            paymentMethod === "Mpesa" ? "border-red-600" : "border-gray-300"
          }`}
        />
      </div>
      <UserDetails /> */}
    </>
  );
};

export default PaymentOptions;
