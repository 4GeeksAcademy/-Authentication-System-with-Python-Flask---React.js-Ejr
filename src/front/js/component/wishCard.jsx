import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import '../../styles/wishcard.css'
import Product from "./product.jsx";

import ImageProduct from "../../../../public/images/QUAKER® AVENA TRADICIONAL.png";

const WishCard = ({ id, name, cost, image_url }) => {

    const { store, actions } = useContext(Context);
    const { products } = store;

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/product-detail/${id}`);
    };

    useEffect(() => {
        actions.getProducts();
    }, []);

    return (
        <div className="card-container">
            <div className="card h-75 d-flex flex-column justify-content-between " style={{background:'transparent',border:'none'}}>
                <button onClick={handleNavigate} className="btn p-0 w-100 h-100" style={{ background: "transparent", border: "none" }}>
                    <img src={ImageProduct} alt={name} className="card-img-top" />
                    <div className="card-body">
                        <h2 className="card-title">{name}</h2>
                        <h4 className="card-text">{cost}</h4>
                    </div>
                </button>
            </div>
        </div>
    );
}

export default WishCard;