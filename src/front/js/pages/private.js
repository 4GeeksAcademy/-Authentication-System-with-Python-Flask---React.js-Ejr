import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    /* useEffect(() => {
        const fetchUserProfile = async () => {
            const token = actions.validToken();
            if (token) {
                await actions.getUserProfile();
            } else {
                navigate("/login");
            }
        };

        if (!store.currentUser) {
            fetchUserProfile();
        }
    }, [store.currentUser, actions, navigate]);

    const user = store.currentUser?.user; */

    // console.log('currentuser', user);
    const user = store.currentUser?.user;
    return (
        <div className="text-center mt-5">
            <h1>Hello {user ? user.email : "Guest"}!</h1>
            <div className="alert alert-info">
                {user ? `Welcome, ${user.email}` : "Loading user profile..."}
            </div>
        </div>
    );
};