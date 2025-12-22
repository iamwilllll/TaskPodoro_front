import { Controller, useForm } from 'react-hook-form';
import type { VerifyUserT } from '../types';
import { TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router';
import OTPInput from 'react-otp-input';
import { useVerifyPassCode } from '../hooks';

export default function VerifyPassCode() {
    const { handleSubmit, register, formState, control } = useForm<VerifyUserT>();
    const { errors } = formState;
    const { apiError, verifyCode } = useVerifyPassCode();
    const navigate = useNavigate();

    const resendCode = () => navigate('/forgotYourPassword');

    return (
        <form className="font-secondary m-auto flex h-full w-8/10 flex-col justify-center" onSubmit={handleSubmit(verifyCode)}>
            <h2 className="text-secondary-500 mb-5 text-3xl font-semibold">Reset your password</h2>
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

            <p className="text-error m-0 mb-4 h-5"> {errors.email && <span>{errors.email.message}</span>}</p>

            <Controller
                name="code"
                control={control}
                rules={{
                    required: 'Code is required',
                    minLength: {
                        value: 6,
                        message: 'The code must have 6 digits',
                    },
                    pattern: {
                        value: /^\d{6}$/,
                        message: 'Only numbers are allowed',
                    },
                }}
                render={({ field }) => (
                    <OTPInput
                        value={field.value || ''}
                        onChange={field.onChange}
                        numInputs={6}
                        renderSeparator={<span className="text-xl lg:text-2xl">-</span>}
                        renderInput={(props) => <input {...props} />}
                        skipDefaultStyles
                        inputStyle={`m-auto h-[50px] w-full rounded text-center outline focus:outline-2 ${!errors.code ? 'outline-gray-400 focus:outline-black' : 'outline-error focus:outline-red-600'} `}
                        containerStyle="flex w-full items-center justify-center"
                    />
                )}
            />
            <div className="flex w-full items-center justify-between">
                <p className="text-error m-0 mb-4 h-5"> {errors.code && <span>{errors.code.message}</span>}</p>
                <p className="text-error mb-5 h-5">{apiError ?? <span>Ups... An error occurred, please try again later</span>}</p>
            </div>
            <input
                type="submit"
                className={`bg-primary-500 mb-5 h-13 cursor-pointer rounded text-white transition hover:scale-103`}
                value="Verify"
            />
            <div className="align-center flex justify-between">
                <Link className="text-primary-500 cursor-pointer text-center transition hover:underline" to="/">
                    Back to home?
                </Link>

                <p className="text-center">
                    Can't find the code or has it expired?{' '}
                    <span className="text-primary-500 cursor-pointer transition hover:underline" onClick={resendCode}>
                        send again
                    </span>
                </p>
            </div>
        </form>
    );
}
