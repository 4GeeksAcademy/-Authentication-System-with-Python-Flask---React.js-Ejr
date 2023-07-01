import React from "react";
import { Context } from "../store/appContext";
import { NavLink } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"

export const On_sale = () => {
    return (
        <>
            <Profile_navbar />
                <div className="row row_product_profile">
                    <div className="product_img_profile_box col-2">
                        <img src="https://www.motofichas.com/images/phocagallery/Honda/cb500f-2022/01-honda-cb500f-2022-estudio-rojo.jpg" alt="product" className="product_img_profile"/>
                    </div>
                    <div className="price_name col-6">
                        <h4 className="price_product_profile">4750€</h4>
                        <h5 className="name_product_profile">Honda CB500F como nueva</h5>
                    </div>
                    <div className="col-2 published">
                        <h6 className="published_title_profile">Publicado</h6>
                        <h4 className="published_date_profile">12/03/2021</h4>
                    </div>
                    <div className="col-2 product_profile_buttons">
                        <button className="product_profile_button edit"><i class="fas fa-pencil"></i></button>
                        <button className="product_profile_button sold">🤝🏼</button>
                    </div>
                </div>
        </>
    )
}