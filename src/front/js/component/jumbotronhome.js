import React, { Component, useState, useContext } from "react";
import { Buttonsignup } from "./btn-signup";
import { Buttonlogin } from "./btn-login";
import { Buttonlogout } from "../component/btn-logout";
import { ButtonMyProfile } from "../component/btn-myprofile";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Jumbotron = () => {
    const { store, actions } = useContext(Context);
    const loggedOutActions = (
        <>
            <li className="nav-item">
                <Buttonsignup />
            </li>
            <li className="nav-item">
                <Buttonlogin />
            </li>
        </>
    )

    const loggedInActions = (
        <>
            <li className="nav-item">
                <ButtonMyProfile />
            </li>
            <li className="nav-item">
                <Buttonlogout />
            </li>
        </>
    )

    return (
        <div className="container-fluid jumbotron">
            <div className="row align-items-start rowjumbo">
                <div className="col">
                    <h2 className="display-7 fw-bold">Welcome to Book Swap!</h2>
                    <p>Sign up now and start building your reading list, connecting with like-minded readers, and exploring the endless wonders of the written word. Your next great read awaits!</p>

                    <div className="navbar-nav me-auto mb-2 mb-lg-0">
                        <ul className="navbar-nav">
                            {store.token ? loggedInActions : loggedOutActions}
                        </ul>
                    </div>
                </div>

                <div className="col"></div>
            </div>
        </div>
    );
};

export default Jumbotron;


