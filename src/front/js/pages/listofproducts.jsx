import React from "react";
import BannerProducts from "../../../../public/images/image_480.png";
import "../../styles/listofproducts.css"
const ListOfProducts = () => {
    return (
        <div className="w-100 m-0 p-0 list-of-products-container">
            <div className="banner-container w-100 d-flex" >
            <div className="container-banner-title align-items-center">
                <h1 className="banner-products-title">
                    Nuestros productos
                </h1>
            </div>
        
                <img src={BannerProducts} className="banner-img" alt="banner-img" />
                </div>
        </div>
    )
}

export default ListOfProducts;