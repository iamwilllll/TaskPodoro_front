import { Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Overview from './pages/Overview';
import VerifyUser from './pages/VerifyUser';
import ForgotPassword from './pages/ForgotPassword';
import VerifyPassCode from './pages/VerifyPassCode';
import ResetPassword from './pages/ResetPassword';
import AppLayout from './layout/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Groups from './pages/Groups';
import Settings from './pages/Settings';

export default function App() {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                    <Route path="overview" element={<Overview />} />
                    <Route path="groups" element={<Groups />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Route>

            <Route element={<AuthLayout />}>
                <Route path="/" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="verifyUser" element={<VerifyUser />} />
                <Route path="forgotYourPassword" element={<ForgotPassword />} />
                <Route path="verifyPassCode" element={<VerifyPassCode />} />
                <Route path="resetPassword" element={<ResetPassword />} />
            </Route>
        </Routes>
    );
}
