import { Navigate, Outlet, redirect } from "react-router-dom";

const PrivateRoutes = () => {
    const isAuthenticated = null
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoutes;