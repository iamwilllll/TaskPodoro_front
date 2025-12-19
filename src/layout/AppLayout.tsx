import { type ReactNode } from 'react';
import { useLoading, useNotification } from '../context/store';
import { Alert } from '@mui/material';

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

            {isVisible && (
                <Alert severity="success" className="alert">
                    {message}
                </Alert>
            )}

            {children}
        </div>
    );
}

