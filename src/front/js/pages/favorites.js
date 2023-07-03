import React from "react";
import { Context } from "../store/appContext";
import { NavLink } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"

export const Favorites = () => {
    return (
        <>
            <Profile_navbar />
            <h2 className="product_type_profile">
                Motos
            </h2>
            <div className="row row_favorites_profile">
                <div className="product_profile_favorites col-2">
                    <div className="product_img_profile_favorites_box">
                        <img src="https://www.motofichas.com/images/phocagallery/Honda/cb500f-2022/01-honda-cb500f-2022-estudio-rojo.jpg" alt="product" className="product_img_profile_favorites"/>
                    </div>
                    <div className="product_description_profile_favorites">
                        <div className="row">
                            <h6 className="col-10 price_product_profile">4500€</h6>
                            <h6 className="col-2">❤️</h6>
                        </div>
                        <div className="row">
                            <h6>En perfecto estado. Todas ...</h6>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="product_type_profile">
                Coches
            </h2>
            <div className="row row_favorites_profile">
                <div className="product_profile_favorites col-2">
                    <div className="product_img_profile_favorites_box">
                        <img src="https://www.motofichas.com/images/phocagallery/Honda/cb500f-2022/01-honda-cb500f-2022-estudio-rojo.jpg" alt="product" className="product_img_profile_favorites"/>
                    </div>
                    <div className="product_description_profile_favorites">
                        <div className="row">
                            <h6 className="col-10 price_product_profile">4500€</h6>
                            <h6 className="col-2">❤️</h6>
                        </div>
                        <div className="row">
                            <h6>En perfecto estado. Todas ...</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}