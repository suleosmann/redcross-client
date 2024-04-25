import { useContext, useState } from 'react';
import { AmountContext } from '../context/AmountContext'; 
import { DonationOptionsContext } from '../context/DonationOptionsContext'; 
import useData from './useData';  // Assuming useData is the custom hook to gather payload

const useSubmitPledge = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getPayload } = useData();  // use the custom hook to get the payload function

    const submitDonation = async (userDetails) => {
        setIsLoading(true);
        setError(null);
        
        // Gather the data from the custom hook function
        const postData = getPayload(userDetails);  // Pass userDetails if required or just call getPayload()

        try {
            console.log("Sending the following data to the server:", postData);
            const response = await fetch('http://127.0.0.1:5555/donate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData)
            });
            if (!response.ok) {
                throw new Error('Failed to submit donation');
            }
            const result = await response.json();
            setIsLoading(false);
            return result;
        } catch (error) {
            setIsLoading(false);
            setError(error.message || 'Something went wrong');
            console.error("Error submitting donation:", error);
        }
    };

    return { isLoading, error, submitDonation };
};

export default useSubmitPledge;
