import { useState } from 'react';
import type { ResetPasswordT } from '../types';
import { useLoading, useNotification } from '../context';
import axios, { isAxiosError } from 'axios';
import { useNavigate } from 'react-router';

export function useResetPassword() {
    const [apiError, setApiError] = useState('');
    const { changeLoadingStatus } = useLoading();
    const { showAlertMessage } = useNotification();
    const navigate = useNavigate();
    const url = `${import.meta.env.VITE_BASE_URL}/auth/resetPassword`;

    async function resetPassword(formData: ResetPasswordT) {
        try {
            changeLoadingStatus(true);
            await axios.post(url, formData, { withCredentials: true });
            showAlertMessage({ message: 'Password reset successful' });
            navigate('/');
        } catch (err) {
            if (isAxiosError(err)) {
                setApiError(err.response?.data.message);
            }
            console.log(err);
        } finally {
            changeLoadingStatus(false);
        }
    }

    return { apiError, resetPassword };
}
