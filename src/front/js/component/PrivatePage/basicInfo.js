import React, { Component } from "react";
import { Link } from "react-router-dom";

const BasicInfo = () => {


    return (
        <div className="container">
            <div className="mb-3 d-flex flex-column">
                <span className="title">Email:</span>
                <span className="email">email@example.com</span>
            </div>
            <div className="mb-3 d-flex flex-column">
                <span className="title">Name:</span>
                <span className="name">Full name example</span>
            </div>
        </div>
    );
}
export default BasicInfo;