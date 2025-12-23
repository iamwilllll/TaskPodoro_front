import { Navigate } from 'react-router-dom';
import { useUser } from '../context';
import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
    const { currentUser } = useUser();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
