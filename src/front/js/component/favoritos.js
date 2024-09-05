import React, { useContext, useEffect } from 'react';
import { Context } from "../store/appContext";
import { CardOffer } from "./CardOffer.jsx";

export const Favoritos = () => {
    const { store, actions } = useContext(Context);

    
    useEffect(() => {
        actions.getFavorites(); 
    }, []);

    
    if (!store.favorites || store.favorites.length === 0) {
        return <div>No tienes ofertas guardadas como favoritas.</div>;
    }

    return (
        <div className="container ">
            <h1 className="text-center mb-4">Tus Favoritos</h1>
            <div className="row justify-content-center">
                {store.favorites.map((favoriteOffer) => (
                    <div className="col-12  d-flex">
                        <CardOffer id={favoriteOffer.id} />
                    </div>
                ))}
            </div>
        </div>
    );
};