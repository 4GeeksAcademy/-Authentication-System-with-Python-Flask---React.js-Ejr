import React, { useState } from "react";
import { Context } from "../store/appContext";

export const FriendRequest = () => {
    return (
        <div className="Friend_requests">
            <a className="nav-link" href="#">
                Friend Requests
            </a>
            <div className="row align-items-center my-4">
                <div className="col-md-2">
                    <img src="https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg" alt="Profile Icon" style={{ width: "5rem", height: "5rem" }} className="rounded-circle" />
                </div>
                <div className="col-md-10">
                    <div className="row g-3">
                        <div className="col-md-5 text-center">
                            <div className="alert" >
                                <button type="submit" className="btn btn-primary mb-5 custom-update" style={{ width: "190px", height: "50px" }}>
                                    Accept Friend request
                                </button>
                            </div>
                        </div>
                        <div className="col-md-5 text-center">
                            <div className="alert" >
                                <button type="submit" className="btn btn-primary mb-5 alert-info-decline" style={{ width: "190px", height: "50px" }}>
                                    Decline Friend request
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}