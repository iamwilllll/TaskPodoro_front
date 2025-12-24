import { Navigate, Outlet } from 'react-router-dom';
import { useLoading, useUser } from '../context';

export default function ProtectedRoute() {
    const { currentUser, isCheckingAuth } = useUser();
    const { changeLoadingStatus } = useLoading();

    if (isCheckingAuth) {
        changeLoadingStatus(true);
        return null;
    }

    if (!currentUser) {
        return <Navigate to="/" replace />;
    }

    return <Outlet  />;
}
