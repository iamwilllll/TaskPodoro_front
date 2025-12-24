import { Link } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';

export default function Error_404() {
    return (
        <AppLayout>
            <Link to="/overview" className="size-20 w-100">
                Home
            </Link>
        </AppLayout>
    );
}
