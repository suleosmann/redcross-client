// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DonationContainer from "./pages/DonationContainer";
import PledgeComplete from "./pages/PledgeComplete";
import SuccessPage from "./pages/SuccessPage";
import { FrequencyProvider } from "./context/FrequencyContext";
import { AmountProvider } from "./context/AmountContext";
import { DonationProvider } from "./context/DonationContext";
import ContextProviderCombiner from "./context/ContextProviderCombiner";
import { DonationDetailsProvider } from './context/DonationDetailsContext';
import { DonationTypeProvider } from "./context/DonationTypeContext";
import { DonationOptionsProvider } from "./context/DonationOptionsContext";

function App() {
  return (
    <BrowserRouter>
      <ContextProviderCombiner contexts={[<AmountProvider />, <FrequencyProvider />, <DonationProvider/>, <DonationDetailsProvider/>, <DonationTypeProvider/>, <DonationOptionsProvider/>]}>
        <Routes>
          <Route path="/" element={<DonationContainer />} />
          <Route path="/pledge-complete" element={<PledgeComplete />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </ContextProviderCombiner>
    </BrowserRouter>
  );
}

export default App;
