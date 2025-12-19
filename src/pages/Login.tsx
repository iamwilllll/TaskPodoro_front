import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLogin } from '../hooks';

type LoginT = {
    email: string;
    password: string;
};

export default function Login() {
    const { register, handleSubmit, formState, reset } = useForm<LoginT>();
    const { errors } = formState;
    const { login, apiError } = useLogin({ resetForm: reset });

    return (
        <form className="font-secondary m-auto flex h-full w-8/10 flex-col justify-center" onSubmit={handleSubmit(login)}>
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

            <div className="flex w-full justify-between">
                <p className="text-error h-5">{apiError ?? <span>Ups... An error occurred, please try again later</span>}</p>
                <p className="text-error m-0 mb-4 h-5"> {errors.password && <span>This field is required</span>}</p>
            </div>

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
