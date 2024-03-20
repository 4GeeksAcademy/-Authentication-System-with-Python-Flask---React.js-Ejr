// Private.js
import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.token) {
            navigate('/login');
        } else if (!store.user) {
            actions.authenticateUser();
        }
    }, [store.token, store.user]);
    
    return (
        <div className="container text-center">
            <h1>Hello!</h1>
            {store.user ? (
                <div>
                    <h2>Email: {store.user.email}</h2>
                </div>
            ) : (
                <h3>User not found</h3>
            )}
        </div>
    );
}

export default Private;
