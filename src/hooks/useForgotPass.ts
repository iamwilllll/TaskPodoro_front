import axios, { isAxiosError } from 'axios';
import { useState } from 'react';
import { useLoading, useNotification } from '../context';
import type { ForgotPasswordT } from '../types';
import { useNavigate } from 'react-router-dom';

export function useForgotPass() {
    const [apiError, setApiError] = useState('');
    const { changeLoadingStatus } = useLoading();
    const { showAlertMessage } = useNotification();
    const navigate = useNavigate();

    async function forgotPass({ email }: ForgotPasswordT) {
        const url = `${import.meta.env.VITE_BASE_URL}/auth/forgotPassword`;
        email = email.toLocaleLowerCase();

        try {
            changeLoadingStatus(true);
            await axios.post(url, { email }, { withCredentials: true });
            changeLoadingStatus(false);
            showAlertMessage({ message: 'Code send successful' });
            navigate(`/verifyPassCode`);
        } catch (err) {
            if (isAxiosError(err)) return setApiError(err.response?.data.message);
            console.log(err);
        } finally {
            changeLoadingStatus(false);
        }
    }

    return { apiError, forgotPass };
}
