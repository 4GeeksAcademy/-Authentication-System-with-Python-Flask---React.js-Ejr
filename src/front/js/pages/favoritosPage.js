import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Favoritos } from "../component/favoritos";

export const FavoritosPage = () => {
    const { store } = useContext(Context);

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Tus Favoritos</h1>
            <div className="row justify-content-center">
                <Favoritos />
            </div>
        </div>
    );
};
