import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const ProfileTwo = () => {
    return (
        <div className="friend_wishlist">
            <div className="card text-center" style={{ width: "200px", borderRadius: "30px" }}>
                <div className="card-body d-flex flex-column justify-content-center">
                    <p className="card-text"><i className="fas fa-user-friends mx-2"></i>Friends</p>
                    <p className="card-text"><i className="fas fa-heart mx-2"></i>My Wishlist</p>
                </div>
            </div>
        </div>
    )
}
