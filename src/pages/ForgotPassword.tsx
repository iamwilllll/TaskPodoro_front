import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useForgotPass } from '../hooks';
import type { ForgotPasswordT } from '../types';

export default function ForgotPassword() {
    const { handleSubmit, register, formState } = useForm<ForgotPasswordT>();
    const { errors } = formState;
    const { apiError, forgotPass } = useForgotPass();

    return (
        <form className="font-secondary m-auto flex h-full w-8/10 flex-col justify-center" onSubmit={handleSubmit(forgotPass)}>
            <h2 className="text-secondary-500 mb-5 text-3xl font-semibold">Verify your account</h2>
            <TextField
                label="Email"
                variant="outlined"
                error={!!errors.email || !!apiError}
                className="transition hover:scale-101"
                {...register('email', {
                    required: { value: true, message: 'Email is required' },
                    pattern: { value: /^\S+@\S+$/, message: 'Invalid email' },
                })}
            />
            <div className="flex w-full items-center justify-between">
                <p className="text-error m-0 mb-4 h-5"> {errors.email && <span>{errors.email.message}</span>}</p>
                <p className="text-error mb-5 h-5">{apiError ?? <span>Ups... An error occurred, please try again later</span>}</p>
            </div>
            <input
                type="submit"
                className={`bg-primary-500 mb-5 h-13 cursor-pointer rounded text-white transition hover:scale-103`}
                value="Send code"
            />
            <div className="align-center flex justify-between">
                <Link className="text-primary-500 cursor-pointer text-center transition hover:underline" to="/">
                    Back to home?
                </Link>
            </div>
        </form>
    );
}
