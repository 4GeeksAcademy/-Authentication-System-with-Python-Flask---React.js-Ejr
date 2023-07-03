import React from "react";
import { Context } from "../store/appContext";
import { NavLink } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"

export const Favorites = () => {
    return (
        <>
            <Profile_navbar />
            <div className="row row_favorites_profile">
                <div className="product_profile_favorites col-2">
                    <div className="product_img_profile_favorites">
                        <image src="" alt="" className=""/>
                    </div>
                    <div className="product_description_profile_favorites">
                        <div className="row">
                            <h6 className="col-10">price</h6>
                            <h6 className="col-2">❤️</h6>
                        </div>
                        <div className="row">
                            <h4>description</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}