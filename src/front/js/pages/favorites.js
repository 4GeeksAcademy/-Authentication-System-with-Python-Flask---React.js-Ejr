import React, {useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"
import { Placeholder_favorites } from "./placeholder_favorites";
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';

export const Favorites = () => {
    const {actions, store} = useContext(Context);
    const carImage = "https://images.coches.com/_vn_/kia/Sportage/c399cf1d98a95d24f8e8715dd0b13fb2.jpg?p=cc_vn_high"
    const navigate = useNavigate()
    defineElement(lottie.loadAnimation);
    useEffect (() => {
        actions.getFavorites();
        actions.getProductsOnSale()
    }, [])

    const handleRemoveFavorite = (product_id) => {
      actions.putFavorite(product_id)
      window.location.reload();
      };

    return store.favorites ?(
        <>
            <Profile_navbar />
                <div>
                    <h2 className="product_type_profile">
                        <strong>Tus vehículos favoritos</strong>
                        
                    </h2>
                    <div className="row row_favorites_profile">

                        {store.favorites.map((favorites, index) => 
                        {  
                        return (
                        <div className="product_profile_favorites col-2" key={index}>
                         
                            <div className="product_img_profile_favorites_box" key={index}>
                                    {favorites.image ? (
                            <img src={favorites.image} className="product_img_profile_favorites" alt="..." />
                          ) : (
                            <img src={carImage} className="card-img-top imgCarousel" alt="..." />
                          )}
                            </div>
                      
                            <div className="product_description_profile_favorites">
                            <div className="row d-flex justify-content-between">
                                <h6 className="col-8 price_product_profile">
                                  {favorites.price}
                                  <i class="fa-solid fa-euro-sign"></i>
                                </h6>
                                <div className="col-4 d-flex justify-content-end">
                                  <button
                                    className="button_favorite_favorites btnFavorite mt-1 "
                                    id="heartCard"
                                    onClick={() => handleRemoveFavorite(favorites.product_id)}
                                  >
                                   <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                                    <lord-icon
                                        className='lordicon'
                                        src="https://cdn.lordicon.com/rjzlnunf.json"
                                        trigger="morph"
                                        colors="primary:#1663c7,secondary:#16a9c7"
                                        state="morph-heart-broken"
                                        style={{"width":"20px","height":"30px", }}>
                                    </lord-icon>
                                  </button>
                                </div>
                              </div>
                              <div className="row limit-text">
                                  <h6>{favorites.name}</h6>
                              </div>
                            </div>
                        </div>
                         )})}
                    </div>
                </div>
        </>
    ) : <Placeholder_favorites/>
}