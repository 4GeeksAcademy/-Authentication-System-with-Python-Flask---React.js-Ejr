import React, { useEffect, useState, useContext } from "react";
import ScrollToTopButton from "../component/ScrollToTopButton.jsx";
import { Context } from "../store/appContext";
import BannerProducts from "../../../../public/images/image_480.png";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "../../styles/listofproducts.css";
import TopProduct from '../component/topproduct.jsx';
import Product from "../component/product.jsx";

const ListOfProducts = () => {
    const { store, actions } = useContext(Context);
    const { products } = store;
    const [visibleProducts, setVisibleProducts] = useState(6); // Mostrará 6 productos por defecto
    const [bannerLoaded, setBannerLoaded] = useState(false); // Nuevo estado para controlar la carga de la imagen del banner

    useEffect(() => {
        actions.getProducts();
    }, []);

    const loadMoreProducts = () => {
        setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 3); // Carga 3 productos más
    };

    return (
        <div className="list-of-products-container">
            <div className="invisible-header-box"></div>
            <div className="w-100 p-0 banner-container products-list-banner">
                <h1 className="banner-products-title">
                    Nuestros productos
                </h1>
                {!bannerLoaded && <Skeleton height={600} width="100%" />} 
                <img 
                    src={BannerProducts} 
                    className="banner-img" 
                    alt="banner-img" 
                    onLoad={() => setBannerLoaded(true)} 
                    style={{ display: bannerLoaded ? 'block' : 'none' }} 
                />
            </div>

            <div className="container-background align-items-center justify-content-center d-flex h-50">
                <div className="row container background d-flex align-center justify-content-evenly">
                    <div className="top-prod-container">
                        <TopProduct />
                    </div>
                    <div className="top-prod-container">
                        <TopProduct />
                    </div>
                    <div className="top-prod-container">
                        <TopProduct />
                    </div>
                </div>
            </div>

            <div className="main-container">
                {products && products.length > 0 ? (
                    products.slice(0, visibleProducts).map((product, index) => (
                        <Product
                            key={index}
                            id={product.id}
                            name={product.name}
                            cost={product.cost}
                            image_url={product.image_url}
                        />
                    ))
                ) : (
                    <h4 className="text-center text-danger m-4">No hay productos disponibles</h4>
                )}
            </div>

            {products && visibleProducts < products.length && (
                <div className="btn-container w-100 d-flex justify-content-center mt-5">
                    <button className="btn-see-more px-5 py-3 rounded" onClick={loadMoreProducts}>
                        Ver más
                    </button>
                </div>
            )}
            <ScrollToTopButton />
        </div>
    );
};

export default ListOfProducts;
