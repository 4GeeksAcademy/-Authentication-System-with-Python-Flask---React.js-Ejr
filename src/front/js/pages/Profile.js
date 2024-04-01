import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./../store/appContext"

const Profile = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");
        if (!token) {
            navigate("/login");
        } else {
            actions.getMyTasks();
        }
    }, [navigate]);

    return (
        <div className="text-center profile-page">
            <h1 className="profile-title">Profile</h1>
        </div>
    );
};

export default Profile;
