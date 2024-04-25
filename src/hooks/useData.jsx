import { useAmount } from '../context/AmountContext'; 
import { useDonationDetails } from '../context/DonationDetailsContext'; 
import { useDonation } from '../context/DonationContext';
import { useDonationOptions } from '../context/DonationOptionsContext';
import { useDonationType } from '../context/DonationTypeContext';

const useData = () => {
    const { amount, currency, processingFee, includeProcessingFee} = useAmount();
    const { selectedSupportOption, dedication } = useDonation();
    const { userDetails } = useDonationDetails();
    const { donationType } = useDonationType();
    const { option, frequency, selectedDay } = useDonationOptions();

    // Function to gather all data
    const getPayload = () => {
        // Construct the payload
        const payload = {
            anonymous: userDetails.anonymous,
            firstName: userDetails.anonymous ? null : userDetails.firstName,
            lastName: userDetails.anonymous ? null : userDetails.lastName,
            email: userDetails.anonymous ? null : userDetails.email,
            country: userDetails.anonymous ? null : userDetails.country,
            county: userDetails.anonymous ? null : userDetails.county,
            phone: userDetails.anonymous ? null : userDetails.phone,
            companyName: userDetails.companyName,
            amount,
            currency,
            processingFee,
            includeProcessingFee,
            totalAmount: amount + processingFee,
            donationType: donationType || option, // Use option as a fallback
            frequency,
            selectedDay,
            dedicationName: dedication ? dedication : null,
            supportOption: selectedSupportOption
        };

        // Filter out null values if anonymous
        if (userDetails.anonymous) {
            Object.keys(payload).forEach(key => payload[key] === null && delete payload[key]);
        }

        return payload;
    };

    return { getPayload };
};

export default useData;
