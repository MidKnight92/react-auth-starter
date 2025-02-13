import { Route, Routes } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PrivateRoutes from './auth/PrivateRoutes';


export const App = () => {
    return (
        <div className="page-container">
            <Routes>
                {/* Public Routes */}
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                {/* Private Routes */}
                <Route path='/' element={<PrivateRoutes />}>
                    <Route index element={<UserInfoPage />} />
                </Route>
            </Routes>
        </div>
    );
}
