import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

const ProtectedRoute = ({ element: Component }) => {
    const { store } = useContext(Context);

    return store.user.isSignedIn ? Component : <Navigate to="/signIn" />;
};

export default ProtectedRoute;
