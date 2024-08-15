import React, { useContext, useEffect } from "react"
import { Context } from "../store/appContext";
import { useNavigate, Outlet } from "react-router-dom";

export const TokenValidator = () => {
    const {store} = useContext (Context);
    const navigate = useNavigate();
    useEffect(() => {
        if (!store.token){
            navigate("/login")
        }
    }, [])
    return <>
        <Outlet />
    </>
}