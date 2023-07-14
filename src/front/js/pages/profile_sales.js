import React from "react";
import { Context } from "../store/appContext";
import { NavLink } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"

export const Profile_sales = () => {
    return (
        <>
            <Profile_navbar />
            <h6 className="date_sale_profile">23/07/2020</h6>
            <div className="sales_profile_box row">
                <div className="col-4">
                    <div className="product_img_profile_box_sales col-2">
                        <img src="https://www.motofichas.com/images/phocagallery/Honda/cb500f-2022/01-honda-cb500f-2022-estudio-rojo.jpg" alt="product" className="product_img_profile"/>
                    </div>
                </div>
                <div className="col-8 product_data_sales">
                    <h4 className="col-8 review_sales_profile">***</h4>
                    <h6>Honda CB500F en perfectas condiciones</h6>
                    <div className="row">
                        <h6 className="col-4">Honda</h6>
                        <h6 className="col-8">CB500F</h6>
                    </div>
                    <h6>Usuario 1</h6>
                    <h6 className="price_sales_profile">4.500€</h6>
                </div>
            </div>
        </>
    )
}