import React from "react";
import { useDonationType } from "../../context/DonationTypeContext";


const TypeButton = () => {
    const { setDonationType } = useDonationType();

  return (
    <>
      <div className="flex space-x-10">
        <p className="mt-2 mr-12">Select donate as: </p>
        <button onClick={() => setDonationType("Individual")} className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium rounded-lg group bg-white hover:bg-white hover:border-2 hover:border-red-500">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-white bg-red-500 dark:bg-red-500 rounded-md group-hover:bg-white group-hover:text-black">
            Individual
          </span>
        </button>
        <button onClick={() => setDonationType("Organization")} className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium rounded-lg group bg-white hover:bg-white hover:border-2 hover:border-red-500">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-white bg-red-500 dark:bg-red-500 rounded-md group-hover:bg-white group-hover:text-black">
            Organization
          </span>
        </button>
      </div>
    </>
  );
};

export default TypeButton;
