// App.js
import React from "react";
import DonationContainer from "./pages/DonationContainer";
import { FrequencyProvider } from "./context/FrequencyContext";
import { AmountProvider } from "./context/AmountContext";
import {DonationProvider} from "./context/DonationContext";
import ContextProviderCombiner from "./context/ContextProviderCombiner"; // Adjust the import path as necessary
import { DonationDetailsProvider } from './context/DonationDetailsContext';
import {DonationTypeProvider} from "./context/DonationTypeContext";


function App() {
  return (
    <ContextProviderCombiner contexts={[<AmountProvider />, <FrequencyProvider />, <DonationProvider/>, <DonationDetailsProvider/>, <DonationTypeProvider/>]}>
      <DonationContainer />
    </ContextProviderCombiner>
  );
}

export default App;
