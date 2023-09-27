import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom"; 

export const ProfileTwo = () => {
    return (
        <div className="friend_wishlist">
            <div className="card text-center" style={{ width: "200px", borderRadius: "30px" }}>
                <div className="card-body d-flex flex-column justify-content-center">
                    <Link to="/friends" className="card-text-box-public">
                        <i className="fas fa-user-friends mx-2"></i>Friends
                    </Link>
                    <Link to="/wishlist" className="card-text-box-public">
                        <i className="fas fa-heart mx-2"></i>My Wishlist
                    </Link>
                </div>
            </div>
        </div>
    )
}

