import React, { useContext, useParams } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/listofproducts.css";
import ImageGallery from "react-image-gallery";
import NoProductImg from "../../../../public/images/no-product-img.png";

const ProductDetailCard = ({ id, name, cost, image_url }) => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();

    const images = [
        {
            original: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDKwG2BjRvK8M-R86MG5AKYtJggmux_0f8IA&s",
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDKwG2BjRvK8M-R86MG5AKYtJggmux_0f8IA&s",
        },
        {
            original: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDKwG2BjRvK8M-R86MG5AKYtJggmux_0f8IA&s",
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDKwG2BjRvK8M-R86MG5AKYtJggmux_0f8IA&s",
        }
    ];

    const isFavorite = () => {
        return store.favorites.some(favorite => favorite.fav_product.id === id);
    };

    const toggleFavorite = async () => {
        if (isFavorite()) {
            const favorite = store.favorites.find(fav => fav.fav_product.id === id);
            await actions.deleteFavorite(favorite.id);
        } else {
            await actions.addFavorite(id);
        }
    };

    const handleNavigate = () => {
        navigate(`/cart`);
    };

    return (
        <>
            <div className="images-container">
                <ImageGallery items={images}
                    showPlayButton={false}
                    thumbnailPosition="top"
                />
            </div>
            <div className="detail-container">
                <button className={`heart-container ${isFavorite() ? "favorite-on" : ""}`} onClick={toggleFavorite} >
                    <i className="bi bi-suit-heart-fill"></i>
                </button>
                <button className="cart-container">
                    <i className="bi bi-cart4"></i>
                </button>
                <div className="data-container">
                    <div className="add-container p-2 m-2">
                        <h3>{name}</h3>
                        <h4>${cost}.00</h4>
                    </div>
                    <div className="add-container p-2 m-2 mt-4">
                        <h4 className="col">Stock Disponible</h4>
                        <p className="col">10 Unidades</p>
                    </div>
                    <button className="buy-btn">Comprar</button>

                    <button className="add-cart-btn" onClick={handleNavigate} >Agregar al carrito</button>
                </div>
            </div>
        </>
    );
};

export default ProductDetailCard;