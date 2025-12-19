import { TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { useLoading, useNotification } from '../context/store';

type LoginT = {
    email: string;
    password: string;
};

export default function Login() {
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();
    const { changeLoadingStatus } = useLoading();
    const { showNotification } = useNotification();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginT>();

    const onSubmit1: SubmitHandler<LoginT> = async (formData) => {
        try {
            changeLoadingStatus(true);
            const baseUrl = `${import.meta.env.VITE_BASE_URL}/auth/login`;
            await axios.post(baseUrl, formData, { withCredentials: true });

            navigate('/dashboard');
            changeLoadingStatus(false);
            showNotification('Login was successful');
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setApiError(err?.response?.data?.error?.message);
            }
        } finally {
            changeLoadingStatus(false);
        }
    };

    return (
        <form className="font-secondary m-auto flex h-full w-8/10 flex-col justify-center" onSubmit={handleSubmit(onSubmit1)}>
            <h2 className="text-secondary-500 mb-5 text-3xl font-semibold">Welcome back</h2>

            <TextField
                label="Email"
                variant="outlined"
                className="transition hover:scale-101"
                error={!!apiError}
                {...register('email', { required: true })}
            />

            <p className="text-error m-0 mb-4 h-5"> {errors.email && <span>This field is required</span>}</p>
            <TextField
                label="Password"
                variant="outlined"
                className="transition hover:scale-101"
                type="password"
                error={!!apiError}
                {...register('password', { required: true })}
            />
            <p className="text-error h-5">{apiError ?? <span>Ups... An error occurred, please try again later</span>}</p>
            <p className="text-error m-0 mb-4 h-5"> {errors.password && <span>This field is required</span>}</p>

            <input
                type="submit"
                className={`bg-primary-500 mb-5 h-13 cursor-pointer rounded text-white transition hover:scale-103`}
                value="Login"
            />

            <div className="flex justify-between">
                <p className="text-secondary-400 text-center">
                    <span className="text-primary-500 cursor-pointer transition hover:underline">
                        <Link to="/forgotYourPassword">forgot your password?</Link>
                    </span>
                </p>

                <p className="text-secondary-400 text-center">
                    You don't have account?{' '}
                    <span className="text-primary-500 cursor-pointer transition hover:underline">
                        <Link to="/register">Register</Link>
                    </span>
                </p>
            </div>
        </form>
    );
}
