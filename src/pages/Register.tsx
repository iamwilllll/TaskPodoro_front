import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';

type RegisterT = {
    name: string;
    username: string;
    email: string;
    password: string;
    repeat_password: string;
};

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterT>();

    const onSubmit1: SubmitHandler<RegisterT> = (data) => {
        console.log(data);
    };

    return (
        <form className="font-secondary m-auto flex h-full w-8/10 flex-col justify-center" onSubmit={handleSubmit(onSubmit1)}>
            <h2 className="text-secondary-500 mb-5 text-3xl font-semibold">Create an account</h2>
            <TextField
                label="Name"
                variant="outlined"
                className="transition hover:scale-101"
                {...register('name', { required: true })}
            />
            <p className="text-error m-0 mb-4 h-5"> {errors.name && <span>This field is required</span>}</p>
            <TextField
                label="Username"
                variant="outlined"
                className="transition hover:scale-101"
                {...register('username', { required: true })}
            />
            <p className="text-error m-0 mb-4 h-5"> {errors.username && <span>This field is required</span>}</p>
            <TextField
                label="Email"
                variant="outlined"
                className="transition hover:scale-101"
                {...register('email', { required: true })}
            />
            <p className="text-error m-0 mb-4 h-5"> {errors.email && <span>This field is required</span>}</p>
            <TextField
                label="Password"
                variant="outlined"
                className="transition hover:scale-101"
                type="password"
                {...register('password', { required: true })}
            />
            <p className="text-error m-0 mb-4 h-5"> {errors.password && <span>This field is required</span>}</p>
            <TextField
                label="Repeat password"
                variant="outlined"
                className="transition hover:scale-101"
                type="password"
                {...register('repeat_password', { required: true })}
            />
            <p className="text-error m-0 mb-4 h-5"> {errors.repeat_password && <span>This field is required</span>}</p>

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
