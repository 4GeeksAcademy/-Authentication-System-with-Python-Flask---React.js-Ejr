import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext.js";
import CartCard from "../component/cartcard.jsx";
import "../../styles/cart.css"
const Cart = () => {
    
    return (
        <div className="container">
            <div className="invisible-header-box"></div>
            <CartCard />
            
        </div>
    )
}

export default Cart;