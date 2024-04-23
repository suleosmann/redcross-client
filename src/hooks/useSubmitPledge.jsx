import { useContext, useState } from 'react';
import { AmountContext } from '../context/AmountContext'; 
import { DonationOptionsContext } from '../context/DonationOptionsContext'; 

const useSubmitPledge = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {
        totalAmount,
        currency,
        includeProcessingFee,
        processingFee,
    } = useContext(AmountContext);
    const {
        option,
        frequency,
        selectedDay,
    } = useContext(DonationOptionsContext);

    const submitDonation = async (userDetails) => {
        setIsLoading(true);
        setError(null);
        const postData = {
            ...userDetails,
            totalAmount,
            currency,
            includeProcessingFee,
            processingFee,
            donationType: option,
            frequency,
            pledgeDay: selectedDay,
        };

        try {
            console.log(postData);
            const response = await fetch('https://your-endpoint.com/api/donations', {
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
        }
    };

    return { isLoading, error, submitDonation };
};

export default useSubmitPledge;
