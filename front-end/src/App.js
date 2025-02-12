import { Route, Routes } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import LoginPage from './pages/LoginPage';


export const App = () => {
    return (
        <div className="page-container">
            <Routes>
                <Route path='/' element={<UserInfoPage />}></Route>
                <Route path='/login' element={<LoginPage />}></Route>
            </Routes>
        </div>
    );
}
