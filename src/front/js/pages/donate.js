import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Donate = () => {
    const { store, actions } = useContext(Context);
    return (
        <div className="col-11 align-items-center">
            <h1>$Give us your money$</h1>
            <p>Click this link to donate to your friendly neighborhood WordSword developers</p>
        </div>
    )
}