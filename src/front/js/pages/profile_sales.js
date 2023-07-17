import React, {useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { NavLink } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import { Sales_navbar } from "../component/Sales_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"

export const Profile_sales = () => {
    const {actions, store} = useContext(Context);
    const soldCount = store.products.length;

    useEffect (() => {
        actions.getProductsSold()
    }, [])

    useEffect ((product_id) => {
            actions.getStatusInfo(product_id)
    }, [])
    

    return store.products ? (
        <>
            <Profile_navbar />
            <Sales_navbar soldCount={soldCount} />
            {store.products.map((product, index) => (
                <>
                    <div className="sales_profile_box row" key={index}>
                        <div className="col-4">
                            <div className="product_img_profile_box_sales col-2">
                                <img src="https://www.motofichas.com/images/phocagallery/Honda/cb500f-2022/01-honda-cb500f-2022-estudio-rojo.jpg" alt="product" className="product_img_profile"/>
                            </div>
                        </div>
                        <div className="col-8 product_data_sales">
                            <h4 className="col-8 review_sales_profile">***</h4>
                            <h6>{product.name}</h6>
                            <div className="row">
                                <h6 className="col-4">{product.brand}</h6>
                                <h6 className="col-8">{product.model}</h6>
                            </div>
                            <h6>Usuario 1</h6>
                            <h6 className="price_sales_profile">{product.price}€</h6>
                        </div>
                    </div>
                </>
             ))}
         </>
     ): "cargando...";
 }