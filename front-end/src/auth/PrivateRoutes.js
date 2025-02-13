import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./useUser";

const PrivateRoutes = () => {
    const isAuthenticated = useUser(); 
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoutes;