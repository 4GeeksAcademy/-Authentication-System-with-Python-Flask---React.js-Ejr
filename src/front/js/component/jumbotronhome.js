import React, { Component } from "react";
import { Buttonsignup } from "./btn-signup";
import { Buttonlogin } from "./btn-login";
import "../../styles/home.css";

export const Jumbotron = () => (
    <div className="container-fluid jumbotron">
        <div className="row align-items-start rowjumbo">
                <div className="col">
                    <h2 className="display-7 fw-bold">Welcome to Book Swap!</h2>
                    <p>Sign up now and start building your reading list, connecting with like-minded readers, and exploring the endless wonders of the written word. Your next great read awaits!</p>
                                
                    <div className="row align-items-start">
                        <div className="col">
                            <Buttonsignup />
                        </div>
                        <div className="col">
                            <Buttonlogin />
                        </div>
                    </div>
                </div>
                
            <div className="col"></div>
        </div>
    </div>

);


export default Jumbotron;