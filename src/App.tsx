import { Routes, Route } from 'react-router';
import AuthLayout from './layout/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import VerifyUser from './pages/VerifyUser';
import ForgotPassword from './pages/ForgotPassword';
import VerifyPassCode from './pages/VerifyPassCode';
import ResetPassword from './pages/ResetPassword';

export default function App() {
    return (
        <Routes>
            <Route path="dashboard" element={<Dashboard />} />

            <Route element={<AuthLayout />}>
                <Route path="/*" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="verifyUser" element={<VerifyUser />} />
                <Route path="/forgotYourPassword" element={<ForgotPassword />} />
                <Route path="/verifyPassCode" element={<VerifyPassCode />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
            </Route>
        </Routes>
    );
}
