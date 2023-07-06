import React, {useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { NavLink } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"

export const Profile_reviews = () => {
    const {actions, store} = useContext(Context);
    
    useEffect (() => {
        actions.getReviews()
    }, [])


    const renderStars = (numStars) => {
        const stars = [];
        for (let i = 0; i < numStars; i++) {
        stars.push(<i className="fa fa-star" key={i}></i>);
        }
        return stars;
    };

    return store.reviews ? (
        <>
            <Profile_navbar />
            {store.reviews.map((reviews, index) => (
            <div className="review_box_profile row" key={index}>
                <div className="product_img_profile_reviews_box col-3">
                    <img src="https://www.motofichas.com/images/phocagallery/Honda/cb500f-2022/01-honda-cb500f-2022-estudio-rojo.jpg" alt="product" className="product_img_profile_favorites"/>
                </div>
                <div className="review_content_profile col-8">
                    <h6 className="name_product_review">{reviews.product_name}</h6>
                    <h6 className="stars_review">{renderStars(reviews.stars)}</h6>
                    <h6 className="comment_review">{reviews.comment}</h6>
                </div>
            </div>
            ))}
        </>
    ): "cargando...";
}