import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import { SideMenu } from "./sideMenu";
import { LogoGymtrack } from "./logoGymtrack";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const location = useLocation();

    return (
        location.pathname !== "/login" && location.pathname !== "/signup" && (
            <>
                <nav className="fixed top-0 left-0 w-full p-2 border-b border-neutral-600 bg-neutral-900 z-50 ">
                    <div className="flex justify-between items-center w-full">
                        <SideMenu />
                        <div className="logoeffects">
                            <LogoGymtrack logoSize="medium" />
                        </div>
                    </div>
                </nav>
                <div className="mt-16"></div>
            </>
        )
    );
};
