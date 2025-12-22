import { useState } from 'react';
import type { VerifyUserT } from '../types';
import { useLoading, useNotification } from '../context';
import axios, { isAxiosError } from 'axios';
import { useNavigate } from 'react-router';

export function useVerifyPassCode() {
    const [apiError, setApiError] = useState('');
    const { changeLoadingStatus } = useLoading();
    const { showAlertMessage } = useNotification();
    const navigate = useNavigate();
    const url = `${import.meta.env.VITE_BASE_URL}/auth/verifyPassCode`;

    async function verifyCode(formData: VerifyUserT) {
        try {
            changeLoadingStatus(true);
            await axios.post(url, formData, { withCredentials: true });
            showAlertMessage({ message: 'Code verification was successful' });
            navigate('/resetPassword');
        } catch (err) {
            if (isAxiosError(err)) {
                setApiError(err.response?.data.message);
            }
            console.log(err);
        } finally {
            changeLoadingStatus(false);
        }
    }

    return { apiError, verifyCode };
}
