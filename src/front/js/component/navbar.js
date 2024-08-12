import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { SideMenu } from "./sideMenu";
import { useLocation } from "react-router-dom";


export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const location = useLocation();

    return (location.pathname != "/login" && location.pathname != "/signup") && (
        <nav className="p-2 border-b border-neutral-600">
            <div className="flex justify-between items-center w-full">
                <SideMenu />
                <div className="flex items-center gap-1 logoeffects">
                    <svg className="size-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e8eaed"><path d="m536-84-56-56 142-142-340-340-142 142-56-56 56-58-56-56 84-84-56-58 56-56 58 56 84-84 56 56 58-56 56 56-142 142 340 340 142-142 56 56-56 58 56 56-84 84 56 58-56 56-58-56-84 84-56-56-58 56Z" />
                    </svg>
                    <span className="font-bold text-xl text-neutral-50 mr-2 uppercase">
                        GymTrack
                    </span>
                </div>
            </div>
        </nav>
    );
};