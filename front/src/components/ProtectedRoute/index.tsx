import { useUser } from "../../hooks/useUser.tsx";
import { Outlet, useNavigate } from 'react-router';
import { useEffect } from "react";

export const ProtectedRoute = () => {
    const { state: { user }, actions: { logout } } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.username) {
            logout()
            navigate("/");
        }
    }, [user?.username]);

    return <Outlet />;
};

export default ProtectedRoute;