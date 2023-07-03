import React from "react";
import { Context } from "../store/appContext";
import { NavLink } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"

export const Profile_reviews = () => {
    return (
        <>
            <Profile_navbar />
            <div className="review_box_profile row">
                <div className="product_img_profile_reviews_box col-3">
                    <img src="https://www.motofichas.com/images/phocagallery/Honda/cb500f-2022/01-honda-cb500f-2022-estudio-rojo.jpg" alt="product" className="product_img_profile_favorites"/>
                </div>
                <div className="review_content_profile col-8">
                    <h6>Nombre del producto</h6>
                    <h6>⭐️⭐️⭐️⭐️⭐️</h6>
                    <h6>Comentario del otro usuario</h6>
                </div>
            </div>
        </>
    )
}