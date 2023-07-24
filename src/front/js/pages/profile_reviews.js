import React, {useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { NavLink } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"

export const Profile_reviews = () => {
    const {actions, store} = useContext(Context);
    const carImage = "https://images.coches.com/_vn_/kia/Sportage/c399cf1d98a95d24f8e8715dd0b13fb2.jpg?p=cc_vn_high"
    
    useEffect (() => {
        actions.getReviews(),
        actions.getProductsSoldReviewed()
    }, [])


    return store.reviews ? (
        <>
            <Profile_navbar />
            <div>
                <h2 className="product_type_profile">
                            Tus Valoraciones de venta
                        </h2>
                {store.reviews.map((reviews, index) => (
                <div className="review_box_profile row" key={index}>
                    {store.products.map((product, index) => (
                    <div className="product_img_profile_reviews_box col-3" key={index}>
                    {product.images.length > 0 ? (
                    <img src={product.images[0].image} className="card-img-top imgCarousel" alt="..." />
                  ) : (
                    <img src={carImage} className="card-img-top imgCarousel" alt="..." />
                  )}
                    </div>
                    ))}
                    <div className="review_content_profile col-8">
                        <h6 className="name_product_review">{reviews.product_name}</h6>
                        <h6 className="comment_review">{reviews.comment}</h6>
                    </div>
                </div>
                ))}
            </div>
        </>
    ): "cargando...";
}