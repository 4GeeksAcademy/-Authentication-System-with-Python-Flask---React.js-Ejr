import React, { Component } from "react";
import { Buttonsignup } from "./btn-signup";
import { Buttonlogin } from "./btn-login"
import "../../styles/index.css";

export const Intro = () => (
	<div className="container-fluid intro">
        <h2 className="display-7 fw-bold">Discover a world of reading like never before.</h2>
        <p className="col-md-12 fs-4">Sign up now and start building your reading list, connecting with like-minded readers, and exploring the endless wonders of the written word. Your next great read awaits!</p>
        
        <div className="btn-group">
            <Buttonsignup /><Buttonlogin />
        </div>
       
    </div>
);
