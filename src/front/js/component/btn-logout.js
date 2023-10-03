import React, { useContext } from "react";
import "../../styles/index.css";
import { Context } from "../store/appContext";

export const Buttonlogout = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid py-5">
            <a onClick={actions.logout} className="btn login" role="button">Log out</a>
        </div>

    )
};

export default Buttonlogout;