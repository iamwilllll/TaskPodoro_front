import { useLoading, useNotification, useUser } from '../context';
import axios, { isAxiosError } from 'axios';
import { useNavigate } from 'react-router';

export function useLogout() {
    const { changeLoadingStatus } = useLoading();
    const { showAlertMessage } = useNotification();
    const { resetUser } = useUser();
    const navigate = useNavigate();

    async function logout() {
        const controller = new AbortController();
        try {
            const logoutUrl = `${import.meta.env.VITE_BASE_URL}/auth/logout`;
            changeLoadingStatus(true);
            await axios.post(logoutUrl, {}, { withCredentials: true });
            navigate('/');
            showAlertMessage({ message: 'Log out successful' });
            resetUser();
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
        return controller.abort();
    }

    return { logout };
}
