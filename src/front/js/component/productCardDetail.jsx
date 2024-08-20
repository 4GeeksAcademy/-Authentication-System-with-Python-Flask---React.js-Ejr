import React, { useContext, useParams } from "react";
import { Context } from "../store/appContext";
import "../../styles/listofproducts.css";
import ImageGallery from "react-image-gallery";
import ImgA from '../../../../public/images/cereal.png'

const ProductDetailCard = ({ id, name, cost }) => {

    const { actions, store } = useContext(Context);


    const images = [
        {
            original: "https://quaker.lat/cl/sites/cl/files/2023-07/QUAKER%C2%AE%20AVENA%20TRADICIONAL.png",
            thumbnail: "https://quaker.lat/cl/sites/cl/files/2023-07/QUAKER%C2%AE%20AVENA%20TRADICIONAL.png",
        },
        {
            original: "https://images.lider.cl/wmtcl?source=url%5Bfile%3A%2Fproductos%2F296899d.jpg%5D&scale=size%5B450x450%5D&sink=format%5Bwebp%5D",
            thumbnail: "https://images.lider.cl/wmtcl?source=url%5Bfile%3A%2Fproductos%2F296899d.jpg%5D&scale=size%5B450x450%5D&sink=format%5Bwebp%5D",
        }
    ];

    const verifyExist = (name) => {
        return store.favorites.some(item => item.name == name)
    }

    return (
        <>
            <div className="images-container">
                <ImageGallery items={images}
                    showPlayButton={false}
                    thumbnailPosition="top"
                />
            </div>
            <div className="detail-container">
                <button className="heart-container" onClick={() => actions.addFavorite(name)} >
                    <i className={`${verifyExist(name) && "text-danger"} bi bi-suit-heart-fill`}></i>
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

                    {/* <button className="add-cart-btn">Agregar al carrito</button> */}
                </div>
            </div>
        </>
    );
};

export default ProductDetailCard;