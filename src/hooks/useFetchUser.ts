import { useEffect } from 'react';
import axios, { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLoading, useUser } from '../context';

export function useFetchUser() {
    const navigate = useNavigate();
    const { changeLoadingStatus } = useLoading();
    const { setUser } = useUser();

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            changeLoadingStatus(true);
            try {
                const url = `${import.meta.env.VITE_BASE_URL}/user`;
                const { data } = await axios.get(url, { withCredentials: true });
                setUser(data.data);
            } catch (err) {
                if (axios.isCancel(err)) return;
                if (isAxiosError(err)) {
                    if (err.response?.status === 401) navigate('/');
                    console.error(err.message);
                }
            } finally {
                changeLoadingStatus(false);
            }
        })();

        return controller.abort();
    }, [navigate, changeLoadingStatus, setUser]);
}
