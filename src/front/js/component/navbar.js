import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { SideMenu } from "./sideMenu";
import { useLocation } from "react-router-dom";
import { LogoGymtrack } from "./logoGymtrack";


export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const location = useLocation();

    return (location.pathname != "/login" && location.pathname != "/signup") && (
        <nav className="p-2 border-b border-neutral-600">
            <div className="flex justify-between items-center w-full">
                <SideMenu />
                <div className=" logoeffects">
                    <LogoGymtrack logoSize="medium" />
                </div>
            </div>
        </nav>
    );
};