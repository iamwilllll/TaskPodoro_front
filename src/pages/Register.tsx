import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { useRegister } from '../hooks';

type RegisterT = {
    name: string;
    username: string;
    email: string;
    password: string;
    repeat_password: string;
};

export default function Register() {
    const { register, handleSubmit, formState, reset, control } = useForm<RegisterT>();
    const { errors } = formState;
    const password = useWatch({ control, name: 'password' });
    const { registerUser, apiError } = useRegister({ resetForm: reset });

    return (
        <form className="font-secondary m-auto flex h-full w-8/10 flex-col justify-center" onSubmit={handleSubmit(registerUser)}>
            <h2 className="text-secondary-500 mb-5 text-3xl font-semibold">Create an account</h2>
            <TextField
                label="Name"
                variant="outlined"
                className="transition hover:scale-101"
                error={!!errors.name}
                {...register('name', { required: true })}
            />
            <p className="text-error m-0 mb-4 h-5"> {errors.name && <span>This field is required</span>}</p>
            <TextField
                label="Username"
                variant="outlined"
                className="transition hover:scale-101"
                error={!!errors.username}
                {...register('username', { required: true })}
            />
            <p className="text-error m-0 mb-4 h-5"> {errors.username && <span>This field is required</span>}</p>
            <TextField
                label="Email"
                variant="outlined"
                error={!!errors.email || !!apiError}
                className="transition hover:scale-101"
                {...register('email', { required: true, pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })}
            />
            <p className="text-error m-0 mb-4 h-5"> {errors.email && <span>{errors.email.message}</span>}</p>
            <TextField
                label="Password"
                variant="outlined"
                className="transition hover:scale-101"
                type="password"
                error={!!errors.password || !!errors.repeat_password}
                {...register('password', { required: true, minLength: { value: 8, message: 'Password is too short' } })}
            />
            <p className="text-error m-0 mb-4 h-5"> {errors.password && <span>This field is required</span>}</p>
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
            <div className="flex w-full justify-between">
                <p className="text-error m-0 h-5">{errors.repeat_password && <span>{errors.repeat_password.message}</span>}</p>
                <p className="text-error m-0 mb-4 h-5">{apiError && <span>{apiError}</span>}</p>
            </div>
            <input
                type="submit"
                className="bg-primary-500 mb-5 h-13 cursor-pointer rounded text-white transition hover:scale-103"
                value="Create account"
            />

            <p className="text-secondary-400 text-center">
                Already have account?{' '}
                <span className="text-primary-500 cursor-pointer transition hover:underline">
                    <Link to="/">Login</Link>
                </span>
            </p>
        </form>
    );
}
