import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/listofproducts.css";

const Product = ({ id, name, cost, image_url }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/product-detail/${id}`);
    };
    const { store, actions } = useContext(Context);
    const verifyExist = (name) => {
        return store.favorites.some(item => item.name == name)
    }
    return (
        <div className="col-12 col-sm-6 col-md-4 mb-4 card-product-container">
            <div className="card h-100 d-flex flex-column justify-content-between card-products" style={{ background: 'transparent', border: 'none' }}>
            <button className="heart-container" onClick={() => actions.addFavorite(name)} >
                    <i className={`${verifyExist(name) && "text-danger"} bi bi-suit-heart-fill `}></i>
                </button>
                <button className="cart-container">
                    <i className="bi bi-cart4"></i>
                </button>
                <button onClick={handleNavigate} className="btn p-0 w-100 h-100 icons-container" style={{ background: "transparent", border: "none" }}>
                    <img src={image_url} alt={name} className="card-img-top w-50" />
                    <div className="card-body text-center icons-container">
                        <h2 className="card-title">{name}</h2>
                        <h4 className="card-text">${cost}</h4>
                  
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Product;
