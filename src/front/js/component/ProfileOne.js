import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const ProfileOne = () => {
    return (
        <div className="profile_one">
            <div className="row mt-2">
                <div className="col-5 my-5">
                    <a className="nav-link active" aria-current="page" href="#" >
                        0 ratings
                    </a>
                </div>
                <div className="col-5 my-5">
                    <a className="nav-link" href="#">
                        0 reviews
                    </a>
                </div>
            </div>
        </div >
    )
}
