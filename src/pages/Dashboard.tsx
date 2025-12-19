import AppLayout from '../layout/AppLayout';
import { useUser } from '../context/store';
import {} from '../hooks/useLogout';
import { useFetchUser, useLogout } from '../hooks';

export default function Dashboard() {
    useFetchUser();
    const { currentUser } = useUser();
    const { logout } = useLogout();

    return (
        <AppLayout>
            <button onClick={logout}>Log out</button>
            <p>{currentUser && currentUser?.name}</p>
        </AppLayout>
    );
}
