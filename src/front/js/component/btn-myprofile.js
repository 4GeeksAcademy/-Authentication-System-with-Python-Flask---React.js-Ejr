import React, { useContext } from "react";
import "../../styles/index.css";
import { Context } from "../store/appContext";

export const ButtonMyProfile = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid py-5">
        <a href="/PublicProfile" className="btn signup" role="button">My Profile</a>
    </div>

    )
};

export default ButtonMyProfile;