import { useContext } from 'react';
import { AmountContext } from '../context/AmountContext';
import { DonationContext } from '../context/DonationContext';
import { DonationDetailsContext } from '../context/DonationDetailsContext';
import { FrequencyContext } from '../context/FrequencyContext';

const useSubmitDonation = () => {
    const { amount, currency, processingFee, phone } = useContext(AmountContext);
    const { selectedSupportOption, dedication } = useContext(DonationContext);
    const { paymentMethod, userDetails } = useContext(DonationDetailsContext);
    const { frequency, donationDate } = useContext(FrequencyContext);

    const submitDonation = async () => {
        const donationData = {
            amount,
            currency,
            processingFee,
            phone,
            selectedSupportOption,
            dedication,
            paymentMethod,
            userDetails,
            frequency,
            donationDate,
        };

        try {
            console.log('Sending donation data:', donationData);

            const response = await fetch('http://127.0.0.1:5555/submit-donation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(donationData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit donation');
            }

            const responseData = await response.json();
            console.log('Donation submitted successfully:', responseData);
            // Handle successful submission (e.g., showing a success message or redirecting the user)
        } catch (error) {
            console.error('Error submitting donation:', error);
            // Handle submission error (e.g., showing an error message)
        }
    };

    return submitDonation;
};

export default useSubmitDonation;
