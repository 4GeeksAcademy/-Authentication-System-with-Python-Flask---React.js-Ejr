import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { NavLink } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"

export const Profile_configuration = () => {
    const {actions, store} = useContext(Context);

    useEffect (() => {
        actions.getUser()
    }, [])
    return (
        <>
            <Profile_navbar />
            <div className="container">
                <h2>{store.users.full_name}</h2>
            </div>
        </>
    )
}