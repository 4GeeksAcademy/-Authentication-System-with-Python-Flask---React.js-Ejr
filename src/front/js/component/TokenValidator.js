import React, { useContext, useEffect } from "react"
import { Context } from "../store/appContext";
import { useNavigate, Outlet } from "react-router-dom";

export const TokenValidator = () => {
    const {store, actions} = useContext (Context);
    const navigate = useNavigate();
    useEffect(() => {
        if (!store.token && localStorage.getItem("jwt-token")){
            console.log(localStorage.getItem("jwt-token"))
            actions.setToken(localStorage.getItem("jwt-token"))
            actions.setProfile(JSON.parse(localStorage.getItem("profile")))
            console.log(store)
        }
        if (!store.token){
            navigate("/register")
        }
    }, [])
    return <>
        <Outlet />
    </>
}