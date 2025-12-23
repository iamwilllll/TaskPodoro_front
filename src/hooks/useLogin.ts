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
    const { showAlertMessage, showAlertLink } = useNotification();
    const navigate = useNavigate();

    const [apiError, setApiError] = useState('');

    async function login(formData: LoginT) {
        const controller = new AbortController();
        const url = `${import.meta.env.VITE_BASE_URL}/auth/login`;

        try {
            changeLoadingStatus(true);

            await axios.post(url, formData, { withCredentials: true });

            if (resetForm) resetForm();
            showAlertMessage({ message: 'Login was successful' });
            navigate('/overview');
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setApiError(err?.response?.data?.error?.message);

                if (err.status === 403) {
                    showAlertLink({ linkTo: '/verifyUser', linkLabel: 'Verify your user', duration: 5000 });
                }
            }
        } finally {
            changeLoadingStatus(false);
        }
        return controller.abort();
    }
    return { login, apiError };
}
