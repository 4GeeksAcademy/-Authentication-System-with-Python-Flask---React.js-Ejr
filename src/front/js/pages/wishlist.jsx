import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import WishCard from "../component/wishCard.jsx"
import '../../styles/wishlist.css'

const WishList = () => {

    const { store, actions } = useContext(Context)
    const { favorites } = store;

    useEffect(() => {
        actions.getFavoritesByUserId();
    }, []);

    return (
        <>
            <div className="invisible-header-box" style={{width: "5"}} ></div>
            <h1 className="text-center">Lista de deseos</h1>
            <div className="wishlist-container">
                <div className="main-container">
                    {store.favorites && store.favorites.length > 0 &&
                        store.favorites.map((product, index) => (
                            <WishCard
                                key={index}

                                id={product.id}
                                name={product.name}
                                cost={product.cost}
                            // image_url={product.image_url}
                            />
                        ))}
                </div>
                <div className="aside-container">
                    <div className="buttons-container">
                        <Link to="/products" >
                            <button className="products-btn">
                                Explorar productos
                            </button>
                        </Link >
                        <Link to="/cart" >
                            <button className="cart-btn">
                                Ir al carrito
                            </button>
                        </Link >
                    </div>
                </div>
            </div>
        </>
    );
}

export default WishList;