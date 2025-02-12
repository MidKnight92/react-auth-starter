import { Route, Routes } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';


export const App = () => {
    return (
        <div className="page-container">
            <Routes>
                <Route path='/' element={<UserInfoPage />}></Route>
            </Routes>
        </div>
    );
}
