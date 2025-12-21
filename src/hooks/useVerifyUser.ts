import { useNavigate } from 'react-router';
import { useLoading, useNotification } from '../context';
import axios, { isAxiosError } from 'axios';
import { useState } from 'react';
import type { VerifyUserT } from '../types/index';

export function useVerifyUser() {
    const { changeLoadingStatus } = useLoading();
    const { showAlertMessage } = useNotification();
    const navigate = useNavigate();
    const [apiError, setApiError] = useState('');
    const url = `${import.meta.env.VITE_BASE_URL}/auth/verifyUser`;

    async function verifyUser(formData: VerifyUserT) {
        try {
            changeLoadingStatus(true);
            await axios.post(url, formData, { withCredentials: true });
            showAlertMessage({ message: 'User verification was successful' });
            navigate('/');
        } catch (err) {
            if (isAxiosError(err)) {
                setApiError(err.response?.data.error.message);
            }

            console.log(err);
        } finally {
            changeLoadingStatus(false);
        }
    }

    return { verifyUser, apiError };
}
