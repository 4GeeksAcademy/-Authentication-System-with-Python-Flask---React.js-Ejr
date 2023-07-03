import React from "react";
import { Context } from "../store/appContext";
import { NavLink } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"

export const On_sale = () => {
    return (
        <>
            <Profile_navbar />
            <div className="on_sale_products">
                <div className="row">
                    <input className="col-1" type="checkbox" id="checkbox"></input>
                    <label for="checkbox" className="col-1"></label>
                        <img src="https://www.ruroc.com/media/catalog/product/j/o/joker_visor_4.jpg" alt="product" className="col-1"/>
                        <h4 className="col-2">4750€</h4>
                        <h4 className="col-4">Honda CB500F como nueva</h4>
                        <div className="col-2">
                            <button className="product_profile_button edit"><i class="fas fa-pencil"></i></button>
                            <button className="product_profile_button sold">🤝🏼</button>
                        </div>
                </div>
            </div>
        </>
    )
}