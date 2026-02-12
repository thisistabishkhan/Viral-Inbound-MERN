import { useState } from 'react';
import axios from 'axios';

const useFormSubmit = (apiUrl = '/api/leads') => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const submitForm = async (formData, formId) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        setResponseMessage('');

        try {
            // Prepare data payload
            const payload = {
                ...formData,
                formName: formId
            };

            const response = await axios.post(apiUrl, payload);

            if (response.data.success) {
                setSuccess(true);
                setResponseMessage("Thank you! We'll be in touch soon.");
                return true;
            } else {
                setError(response.data.message || 'Submission failed');
                return false;
            }
        } catch (err) {
            console.error('Form Submission Error:', err);
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
            setResponseMessage('Something went wrong. Please try again.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const resetStatus = () => {
        setLoading(false);
        setError(null);
        setSuccess(false);
        setResponseMessage('');
    };

    return {
        loading,
        error,
        success,
        responseMessage,
        submitForm,
        resetStatus
    };
};

export default useFormSubmit;
