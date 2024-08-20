import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import BannerProducts from "../../../../public/images/image_480.png";
import "../../styles/listofproducts.css";
import TopProduct from '../component/topproduct.jsx';
import Product from "../component/product.jsx";

const ListOfProducts = () => {
    const { store, actions } = useContext(Context);
    const { products } = store;
    const [showMoreProducts, setShowMoreProducts] = useState(false);

    useEffect(() => {
        actions.getProducts();
    }, []);

    const loadMoreProducts = () => {
        setShowMoreProducts(prevState => !prevState);
    };

  
    const firstGroup = products.slice(0, 3);  
    const secondGroup = products.slice(3, 6); 

   
    const thirdGroup = products.slice(6);

    return (
        <div className="w-100 m-0 p-0 list-of-products-container">
            <div className="invisible-header-box"></div>
            <div className="banner-container w-100 d-flex">
                <div className="container-banner-title align-items-center">
                    <h1 className="banner-products-title">
                        Nuestros productos
                    </h1>
                </div>
                <img src={BannerProducts} className="banner-img" alt="banner-img" />
            </div>

            <div className="container-background align-items-center justify-content-center d-flex h-50">
                <div className="container background">
                    <div className="row d-flex container-top-products col-xs-12">
                        <div className="col-md-4 col-xs-12 container-top-product">
                            <TopProduct />
                        </div>
                        <div className="col-md-4 col-xs-12 container-top-product">
                            <TopProduct />
                        </div>
                        <div className="col-md-4 col-xs-12 container-top-product">
                            <TopProduct />
                        </div>
                    </div>
                </div>
            </div>

         
            <div className="container background mt-5">
                <div className="row d-flex container-top-products dynamic-products">
                    {firstGroup.map((product) => (
                        <Product
                            className="col-md-4 col-xs-12"
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            cost={product.cost}
                            image_url={product.image_url}
                        />
                    ))}
                </div>
            </div>

           
            <div className="container background mt-5">
                <div className="row d-flex container-top-products dynamic-products">
                    {secondGroup.map((product) => (
                        <Product
                            className="col-md-4 col-xs-12"
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            cost={product.cost}
                            image_url={product.image_url}
                        />
                    ))}
                </div>
            </div>

  
            {showMoreProducts && (
                <div className="container background mt-5">
                    <div className="row d-flex flex-wrap container-top-products dynamic-products">
                        {thirdGroup.map((product) => (
                            <Product
                                className="col-md-4 col-xs-12"
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                cost={product.cost}
                                image_url={product.image_url}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div className="btn-container w-100 d-flex justify-content-center mt-5">
                <button className="btn-see-more px-5 py-3 rounded" onClick={loadMoreProducts}>
                    {showMoreProducts ? 'Ver menos' : 'Ver más'}
                </button>
            </div>
        </div>
    );
};

export default ListOfProducts;
