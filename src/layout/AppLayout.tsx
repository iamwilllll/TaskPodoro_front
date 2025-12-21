import { type ReactNode } from 'react';
import { useLoading, useNotification } from '../context';
import { Alert } from '@mui/material';
import { Link } from 'react-router-dom';

type AppLayoutProps = {
    children?: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
    const { isLoading } = useLoading();
    const { isVisible, message } = useNotification();

    return (
        <div className="size-full">
            <div
                className={`bg-modal absolute top-0 left-0 z-5 size-full items-center justify-center ${isLoading ? 'flex' : 'hidden'}`}
            >
                <div className="loader size-25"></div>
            </div>

            {messageShouldRender && (
                <Alert severity="success" className={`alert ${messageIsVisible ? 'alert-in' : 'alert-out'}`}>
                    {message}
                </Alert>
            )}

            {linkShouldRender && (
                <Alert severity="info" className={`alert ${linkIsVisible ? 'alert-in' : 'alert-out'}`}>
                    <Link className="font-semibold underline" to={linkTo}>
                        {linkLabel}
                    </Link>
                </Alert>
            )}
            {children}
        </div>
    );
}
