import { Navigate, Outlet, redirect } from "react-router-dom";

const PrivateRoute = () => {
    const isAuthenticated = null
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute;