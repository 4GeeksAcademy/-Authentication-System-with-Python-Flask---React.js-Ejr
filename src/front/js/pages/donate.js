import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Donate = () => {
    const { store, actions } = useContext(Context);
    return (
        <>
            <h1>$Give us your money$</h1>
        </>
    )
}