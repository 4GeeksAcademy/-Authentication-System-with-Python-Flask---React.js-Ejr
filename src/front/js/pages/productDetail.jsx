import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import '../../styles/productdetail.css';
import NoProductImg from "../../../../public/images/no-product-img.png";
import ProductDetailCard from "../component/productCardDetail.jsx";

const ProductDetail = () => {
    const { actions, store } = useContext(Context);
    const { product } = store;
    const { id } = useParams();

    useEffect(() => {
        actions.getProduct(id);
    }, [id]);

    return (
        <div className="product-detail-container">
            <div className="invisible-header-box"></div>
            <div className="first-container w-md-100">
                <ProductDetailCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    cost={product.cost}
                    image_url={product.image_url}
                />
            </div>
            <h1 className="border-bottom mt-4 mb-2">
                Productos Relacionados
            </h1>
            <div className="products-container w-100 mb-5 mx-auto">
                <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="3000">
                            <button className="w-75 mx-auto d-flex align-center justify-content-center border-0 bg-transparent">
                                <img src={NoProductImg} className="bg-success d-block w-75 rounded" alt="..." loading="lazy" />
                            </button>
                        </div>
                        <div className="carousel-item" data-bs-interval="3000">
                            <button className="w-75 mx-auto d-flex align-center justify-content-center border-0 bg-transparent">
                                <img src={NoProductImg} className="bg-danger d-block w-75 rounded" alt="..." loading="lazy" />
                            </button>
                        </div>
                        <div className="carousel-item" data-bs-interval="3000">
                            <button className="w-75 mx-auto d-flex align-center justify-content-center border-0 bg-transparent">
                                <img src={NoProductImg} className="bg-warning d-block w-75 rounded" alt="..." loading="lazy" />
                            </button>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;