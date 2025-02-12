import { Route, Routes } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PrivateRoute from './auth/PrivateRoute';


export const App = () => {
    return (
        <div className="page-container">
            <Routes>
                {/* Public Routes */}
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                {/* Private Routes */}
                <Route path='/' element={<PrivateRoute />}>
                    <Route index element={<UserInfoPage />} />
                </Route>
            </Routes>
        </div>
    );
}
