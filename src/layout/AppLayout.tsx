import { useLoading, useNotification } from '../context';
import { Alert } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import { useFetchUser } from '../hooks';
import type { ReactNode } from 'react';

export default function AppLayout({ children, className }: { children?: ReactNode; className?: string }) {
    useFetchUser();

    const { isLoading } = useLoading();
    const { message, messageIsVisible, messageShouldRender, linkTo, linkLabel, linkIsVisible, linkShouldRender } =
        useNotification();

    return (
        <div className={`size-full lg:grid ${children ? '' : 'grid-cols-5 grid-rows-10 p-5'} ${className}`}>
            <div
                className={`bg-modal absolute top-0 left-0 z-1 size-full items-center justify-center ${isLoading ? 'flex' : 'hidden'}`}
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

            {children ? (
                children
            ) : (
                <>
                    <SideBar className="col-start-1 col-end-2 row-start-1 row-end-11" />
                    <Header className="col-start-2 col-end-11 row-start-1 row-end-1" />
                    <section className="col-start-2 col-end-11 row-start-2 row-end-11">{<Outlet />}</section>
                </>
            )}
        </div>
    );
}
