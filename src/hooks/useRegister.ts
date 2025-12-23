import { useNavigate } from 'react-router';
import { useLoading, useNotification } from '../context';
import { useState } from 'react';
import axios, { isAxiosError } from 'axios';
import type { RegisterT } from '../types';

type useRegisterProps = {
    resetForm?: () => void;
};

export function useRegister({ resetForm }: useRegisterProps) {
    const { changeLoadingStatus } = useLoading();
    const { showAlertMessage } = useNotification();
    const navigate = useNavigate();
    const [apiError, setApiError] = useState('');

    async function registerUser(formData: RegisterT) {
        const controller = new AbortController();
        const registerObj: RegisterT = {
            ...formData,
            username: formData.username.toLocaleLowerCase(),
            email: formData.email.toLocaleLowerCase(),
        };
        try {
            const url = `${import.meta.env.VITE_BASE_URL}/auth/register`;
            changeLoadingStatus(true);
            await axios.post(url, registerObj, { withCredentials: true });
            showAlertMessage({ message: 'The user registered successfully, place check your email' });

            navigate('/');
            if (resetForm) resetForm();
        } catch (err) {
            if (isAxiosError(err)) {
                return setApiError(err?.response?.data?.error.message);
            }
            console.log(err);
        } finally {
            changeLoadingStatus(false);
        }

        return controller.abort();
    }

    return { registerUser, apiError };
}
