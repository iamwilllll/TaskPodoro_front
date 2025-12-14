import { Routes, Route } from 'react-router';
import AuthLayout from './layout/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
        </Routes>
    );
}
