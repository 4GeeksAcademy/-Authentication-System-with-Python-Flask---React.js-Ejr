import React, { Component } from "react";
import { Buttonsignup } from "./btn-signup";
import { Buttonlogin } from "./btn-login"
import "../../styles/index.css";

export const Jumbotron = () => (
	<div className="container-fluid jumbotron">
        <div className="container">
            <h1 className="display-5 fw-bold">Welcome to Book Swap!</h1>
            <p className="col-md-8 fs-6">Sign up now and start building your reading list, connecting with like-minded readers, and exploring the endless wonders of the written word. Your next great read awaits!</p>
        
            <div className="btn-group">
                <Buttonsignup /><Buttonlogin />
            </div>
        </div>
    </div>
);
