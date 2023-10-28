import React, { useContext } from "react";
import "../../styles/index.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Buttonlogout = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogOutClick = () => {
        actions.logout()
        navigate("/");
    }


    return (
        <div className="container-fluid py-5">
            <a onClick={handleLogOutClick} className="btn login" role="button">Log out</a>
        </div>

    )
};

export default Buttonlogout;