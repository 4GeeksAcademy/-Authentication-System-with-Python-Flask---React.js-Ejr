import React, {useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { NavLink } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import { Sales_navbar } from "../component/Sales_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"

export const Profile_sales = () => {
    const {actions, store} = useContext(Context);
    const soldCount = store.products.length;
    const [products, setProducts] = useState([]);
    const carImage = "https://images.coches.com/_vn_/kia/Sportage/c399cf1d98a95d24f8e8715dd0b13fb2.jpg?p=cc_vn_high"


    useEffect(() => {
        async function fetchProducts() {
          const response = await actions.getProductsSold();
          setProducts(response); 
        }
        fetchProducts();
      }, []);

    return store.products ? (
        <>
            <Profile_navbar />
            <Sales_navbar soldCount={soldCount} />
            {store.products.map((product, index) => (
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
                            <h6>{product.name}</h6>
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