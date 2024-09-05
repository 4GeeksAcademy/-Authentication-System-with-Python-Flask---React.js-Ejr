import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Favoritos } from "../component/favoritos";
import "../../styles/favoritosPage.css";

export const FavoritosPage = () => {
    const { store } = useContext(Context);

    return (
        <div className="favoritos-page-container favoritos-page-mt-5">
            <h1 className="favoritos-page-title favoritos-page-mb-4 text-center">Tus Favoritos</h1>
            <div className="favoritos-page-row">
                <Favoritos />
            </div>
        </div>
    );
};