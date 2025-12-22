import { useForm, useWatch } from 'react-hook-form';
import type { ResetPasswordT } from '../types';
import { TextField } from '@mui/material';
import { Link } from 'react-router';
import { useResetPassword } from '../hooks';

export default function ResetPassword() {
    const { handleSubmit, register, formState, control } = useForm<ResetPasswordT>();
    const { errors } = formState;
    const { apiError, resetPassword } = useResetPassword();

    const password = useWatch({ control, name: 'password' });

    return (
        <form className="font-secondary m-auto flex h-full w-8/10 flex-col justify-center" onSubmit={handleSubmit(resetPassword)}>
            <h2 className="text-secondary-500 mb-5 text-3xl font-semibold">Reset your password</h2>

            <TextField
                label="Password"
                variant="outlined"
                className="transition hover:scale-101"
                type="password"
                error={!!errors.password || !!errors.repeat_password}
                {...register('password', {
                    required: { value: true, message: 'Password is required' },
                    minLength: { value: 8, message: 'Password is too short' },
                })}
            />
            <p className="text-error m-0 mb-4 h-5"> {errors.password && <span>{errors.password.message}</span>}</p>

            <TextField
                label="Repeat password"
                variant="outlined"
                className="transition hover:scale-101"
                type="password"
                error={!!errors.repeat_password}
                {...register('repeat_password', {
                    required: { value: true, message: 'This field is required' },
                    validate: (value) => value === password || 'Passwords not match',
                    minLength: { value: 8, message: 'Password is too short' },
                })}
            />

            <div className="flex items-center justify-between">
                <p className="text-error m-0 mb-4 h-5">
                    {errors.repeat_password && <span>{errors.repeat_password.message}</span>}
                </p>
                <p className="text-error m-0 mb-4 h-5">
                    {apiError ?? <span>Ups... An error occurred, please try again later</span>}
                </p>
            </div>
            <input
                type="submit"
                className={`bg-primary-500 mb-5 h-13 cursor-pointer rounded text-white transition hover:scale-103`}
                value="Verify"
            />

            <Link className="text-primary-500 cursor-pointer text-left transition hover:underline" to="/">
                Back to home?
            </Link>
        </form>
    );
}
