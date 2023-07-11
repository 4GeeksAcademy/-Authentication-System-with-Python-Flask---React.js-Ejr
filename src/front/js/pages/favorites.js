import React, {useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { NavLink } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"

export const Favorites = () => {
    const {actions, store} = useContext(Context);

    useEffect (() => {
        actions.getFavorites()
    }, [])

    const handleRemoveFavorite = (product_id) => {
        actions.putFavorite(product_id)
      };

    return store.favorites ?(
        <>
            <Profile_navbar />
                <div>
                    <h2 className="product_type_profile">
                        Tus vehículos favoritos
                    </h2>
                    <div className="row row_favorites_profile">
                        {store.favorites.map((favorites, index) => (
                        <div className="product_profile_favorites col-2" key={index}>
                            <div className="product_img_profile_favorites_box">
                                <img src="https://www.motofichas.com/images/phocagallery/Honda/cb500f-2022/01-honda-cb500f-2022-estudio-rojo.jpg" alt="product" className="product_img_profile_favorites"/>
                            </div>
                            <div className="product_description_profile_favorites">
                                <div className="row">
                                    <h6 className="col-10 price_product_profile">{favorites.price}€</h6>
                                    <button className="col-2 button_favorite" onClick={() => handleRemoveFavorite(favorites.product_id)}>❤️</button>
                                </div>
                                <div className="row limit-text">
                                    <h6>{favorites.name}</h6>
                                </div>
                            </div>
                        </div>
                         ))}
                    </div>
                </div>
        </>
    ) : "cargando...";
}