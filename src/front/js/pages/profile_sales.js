import React from "react";
import { Context } from "../store/appContext";
import { NavLink } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"

export const Profile_sales = () => {
    return (
        <>
            <Profile_navbar />
            <div className="sales_profile_box">
                <h6 className="date_sale_profile">23/07/2020</h6>
            </div>
        </>
    )
}