import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Login = () => {
    const { store, actions } = useContext(Context);
    return (
        <>
            <h1>Welcome to the login page :)</h1>
        </>
    )
}