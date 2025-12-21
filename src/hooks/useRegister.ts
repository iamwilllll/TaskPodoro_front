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
    const { showNotification } = useNotification();
    const navigate = useNavigate();
    const [apiError, setApiError] = useState('');

    async function registerUser(formData: RegisterT) {
        const registerObj: RegisterT = {
            ...formData,
            username: formData.username.toLocaleLowerCase(),
            email: formData.email.toLocaleLowerCase(),
        };

        try {
            const url = `${import.meta.env.VITE_BASE_URL}/auth/register`;
            changeLoadingStatus(true);
            await axios.post(url, registerObj, { withCredentials: true });
            showNotification('The user registered successfully, place check your email');
            navigate('/');

            if (resetForm) resetForm();
        } catch (err) {
            if (isAxiosError(err)) {
                setApiError(err?.response?.data?.error.message);
            }
            console.log(err);
        } finally {
            changeLoadingStatus(false);
        }
    }

    return { registerUser, apiError };
}

/* 
    const { register, handleSubmit, formState, reset, watch } = useForm<RegisterT>();
    const { errors } = formState;
    const { changeLoadingStatus } = useLoading();
    const { showNotification } = useNotification();
    const navigate = useNavigate();
    const password = watch('password');
    const [apiError, setApiError] = useState('');

    
*/
