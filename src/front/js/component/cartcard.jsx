import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import '../../styles/wishcard.css';
import NoProductImg from "../../../../public/images/no-product-img.png";
import "../../styles/cart.css"
const CartCard = ({ id, name, cost, image_url }) => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const handleNavigate = () => {
        navigate(`/product/${id}`);
    };

    const handlePago = async () => {
       await actions.pagoMercadoPago(20);  
let url = store.mercadoPago.init_point;
console.log(url)
window.location.replace(url)
    };
console.log(cost)
    return (
        <div className="container">
        <div className="card wish-card-container d-flex flex-column m-2">
            <button onClick={handleNavigate} className="h-100">
                <div className="image-container">
                    <img src={image_url || NoProductImg} alt={name} className="card-img-top" />
                </div>
                <div className="card-body mt-auto">
                    <h5 className="card-title">{name || "Ejemplo"}</h5>
                    <p className="card-text">${cost || "00"}.00</p>
                   
                </div>
            </button>
            
        </div>
        <div className="container">
            <button className="btn-mp" onClick={handlePago}>
                        Comprar
                    </button>
        </div>
        </div>
    );
};

export default CartCard;
