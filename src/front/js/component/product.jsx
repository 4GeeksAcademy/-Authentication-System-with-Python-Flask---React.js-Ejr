import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/listofproducts.css";
import NoProductImg from "../../../../public/images/no-product-img.png";

const Product = ({ id, name, cost, image_url }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/product/${id}`);
    };
    const { store, actions } = useContext(Context);
    const verifyExist = (name) => {
        return store.favorites.some(item => item.name == name)
    }
    return (
        <div className="card product-card-container d-flex flex-column m-3">
            <button className="heart-container" onClick={() => actions.addFavorite(name)} >
                <i className={`${verifyExist(name) && "text-danger"} bi bi-suit-heart-fill`}></i>
            </button>
            <button className="cart-container">
                <i className="bi bi-cart4"></i>
            </button>
            <button onClick={handleNavigate} className="h-100 card-link-button" >
                <div className="image-container">
                    <img src={image_url || NoProductImg} alt={name} className="card-img-top" />
                </div>
                <div className="card-body mt-auto">
                    <h5 className="card-title">{name || "Ejemplo"}</h5>
                    <p className="card-text">${cost || "00"}.00</p>
                </div>
            </button>
        </div>
    );
};

export default Product;
