import { useNavigate } from 'react-router';
import { useLoading, useNotification } from '../context';
import axios from 'axios';
import { useState } from 'react';
import type { LoginT } from '../types';

type useLoginProps = {
    resetForm?: () => void;
};

export function useLogin({ resetForm }: useLoginProps) {
    const { changeLoadingStatus } = useLoading();
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    const [apiError, setApiError] = useState('');

    async function login(formData: LoginT) {
        try {
            changeLoadingStatus(true);
            const url = `${import.meta.env.VITE_BASE_URL}/auth/login`;
            await axios.post(url, formData, { withCredentials: true });
            navigate('/dashboard');
            changeLoadingStatus(false);
            showNotification('Login was successful');
            if (resetForm) resetForm();
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setApiError(err?.response?.data?.error?.message);
            }
        } finally {
            changeLoadingStatus(false);
        }
    }
    return { login, apiError };
}
