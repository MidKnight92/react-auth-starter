import { Route, Routes } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PrivateRoutes from './auth/PrivateRoutes';
import PleaseVerifyEmailPage from './pages/PleaseVerifyEmailPage';
import EmailVerficationLandingPage from './pages/EmailVerficationLandingPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import PasswordResetLandingPage from './pages/PasswordRestLandingPage';

export const App = () => {
    return (
        <div className="page-container">
            <Routes>
                {/* Public Routes */}
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/forgot-password' element={<ForgotPasswordPage />} />
                <Route path="/reset-password/:passwordResetCode" element={<PasswordResetLandingPage />} />
                <Route path="/please-verify" element={<PleaseVerifyEmailPage />} />
                <Route path="/verify-email/:verfication" element={<EmailVerficationLandingPage />} />
                {/* Private Routes */}
                <Route path='/' element={<PrivateRoutes />}>
                    <Route index element={<UserInfoPage />} />
                </Route>
            </Routes>
        </div>
    );
}
