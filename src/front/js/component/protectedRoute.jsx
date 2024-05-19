import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Context } from "../store/appContext";

const ProtectedRoute = ({ roles }) => {
    const { store } = useContext(Context);

    if (!store.token) {

        return <Navigate to="/" />;
    }

    if (roles && !roles.includes(store.role)) {

        return <Navigate to="/" />;
    }


    return <Outlet />;
};

export default ProtectedRoute;