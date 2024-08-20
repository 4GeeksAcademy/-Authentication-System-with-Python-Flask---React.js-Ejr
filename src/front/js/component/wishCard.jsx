import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import '../../styles/wishcard.css'
import Product from "./product.jsx";

import ImageProduct from "../../../../public/images/QUAKER® AVENA TRADICIONAL.png";

const WishCard = ({ id, name, cost, image_url }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/product/${id}`);
    };
    return (
        <div className="card wish-card-container d-flex flex-column m-2">
            <button onClick={handleNavigate} className="h-100" >
                <div className="image-container">
                    <img src={image_url || ImageProduct} alt={name} className="card-img-top" />
                </div>
                <div className="card-body mt-auto">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">${cost}</p>
                </div>
            </button>
        </div>
    );
}

export default WishCard;