/* eslint-disable @typescript-eslint/no-explicit-any */
import AppLayout from '../layout/AppLayout';
import axios, { isAxiosError } from 'axios';
import { useLoading, useNotification } from '../context/store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function Dashboard() {
    const { changeLoadingStatus } = useLoading();
    const { showNotification } = useNotification();
    const navigate = useNavigate();
    const [user, setUser] = useState<any>();

    useEffect(() => {
        const controller = new AbortController();
        const fetchUser = async () => {
            try {
                changeLoadingStatus(true);
                const getUserUrl = `${import.meta.env.VITE_BASE_URL}/user`;
                const { data } = await axios.get(getUserUrl, { withCredentials: true });
                setUser(data.data);
            } catch (err) {
                if (axios.isCancel(err)) return;
                if (isAxiosError(err)) {
                    if (err.response?.status === 401) {
                        navigate('/');
                    }
                    console.error(err.message);
                }
            } finally {
                changeLoadingStatus(false);
            }
        };

        fetchUser();
        return () => controller.abort();
    }, [changeLoadingStatus, navigate]);

    const handleLogout = async () => {
        try {
            const logoutUrl = `${import.meta.env.VITE_BASE_URL}/auth/logout`;
            changeLoadingStatus(true);
            await axios.post(logoutUrl, {}, { withCredentials: true });
            showNotification('Log out successful');
            setUser({});
            navigate('/');
        } catch (err) {
            if (axios.isCancel(err)) return;
            if (isAxiosError(err)) {
                if (err.response?.status === 401) {
                    navigate('/');
                }
                console.error(err.message);
            }
        } finally {
            changeLoadingStatus(false);
        }
    };

    if (user)
        return (
            <AppLayout>
                <button onClick={handleLogout}>Log out</button>
            </AppLayout>
        );
}
