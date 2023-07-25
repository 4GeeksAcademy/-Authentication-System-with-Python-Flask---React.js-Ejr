import React, {useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { NavLink } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import { Sales_navbar } from "../component/Sales_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"

export const Profile_sales = () => {
    const {actions, store} = useContext(Context);
    const [productsSold, setProductsSold] = useState([]);
    const [productsSoldReviewed, setProductsSoldReviewed] = useState([]);
    const carImage = "https://images.coches.com/_vn_/kia/Sportage/c399cf1d98a95d24f8e8715dd0b13fb2.jpg?p=cc_vn_high"


    useEffect(() => {
        async function fetchProducts() {
          const response = await actions.getProductsSold();
          setProductsSold(response); 
        }
        fetchProducts();
      }, []);

      useEffect(() => {
        async function fetchProducts() {
          const response = await actions.getProductsSoldReviewed();
          setProductsSoldReviewed(response); 
        }
        fetchProducts();
      }, []);

    return productsSold || productsSoldReviewed ? (
        <>
            <Profile_navbar />
            <Sales_navbar soldCount={productsSold.length + productsSoldReviewed.length} />
            {[...productsSold, ...productsSoldReviewed].map((product, index) => (
                <>
                    <div className="sales_profile_box row" key={index}>
                        <div className="col-4">
                            <div className="product_img_profile_box_sales col-2">
                            {product.images.length > 0 ? (
                                <img src={product.images[0].image} className="card-img-top imgCarousel" alt="..." />
                            ) : (
                                <img src={carImage} className="card-img-top imgCarousel" alt="..." />
                            )}
                            </div>
                        </div>
                        <div className="col-8 product_data_sales">
                            <div className="row">
                                <h6 className="col-4">{product.name}</h6>
                                <h6 className="col-8">{product.year}</h6>
                            </div>
                            <div className="row">
                                <h6 className="col-4">{product.brand.name}</h6>
                                <h6 className="col-8">{product.model.model}</h6>
                            </div>
                            <h6 className="price_sales_profile">{product.price}€</h6>
                        </div>
                    </div>
                </>
             ))}
         </>
     ): "cargando...";
 }