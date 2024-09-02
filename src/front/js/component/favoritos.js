import React, { useContext, useEffect } from 'react';
import { Context } from "../store/appContext";

export const Favoritos = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getFavorites();
    }, []);


    const renderFavoriteInfo = (favorito) => {
        if (favorito.oferta_id) {
            return (
                <>
                    <h5 className="card-title">{favorito.ofertas.name}</h5>
                    <p className="card-text">{favorito.ofertas.descripcion}</p>
                    <p className="card-text"><strong>Empresa:</strong> {favorito.ofertas.nombre_empresa}</p>
                </>
            );
        } else if (favorito.programador_id) {
            return (
                <>
                    <h5 className="card-title">{favorito.programador.user.name}</h5>
                    <p className="card-text">{favorito.programador.descripcion}</p>
                    <p className="card-text"><strong>Tecnologías:</strong> {favorito.programador.tecnologias}</p>
                    <p className="card-text"><strong>Experiencia:</strong> {favorito.programador.experiencia}</p>
                </>
            );
        } else if (favorito.empleador_id) {
            return (
                <>
                    <h5 className="card-title">{favorito.empleador.user.name}</h5>
                    <p className="card-text">{favorito.empleador.descripcion}</p>
                    <p className="card-text"><strong>CIF:</strong> {favorito.empleador.cif}</p>
                </>
            );
        } else {
            return <p className="card-text">Información no disponible</p>;
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
            {store.favorites && store.favorites.length > 0 ? (
                        store.favorites.map((favorito, index) => (
                            <div key={index} className="col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        {renderFavoriteInfo(favorito)}
                                        <button
                                            className="btn btn-danger mt-3"
                                            onClick={() =>
                                                actions.removeFavorite(
                                                    favorito.programador_id,
                                                    favorito.empleador_id,
                                                    favorito.oferta_id
                                                )
                                            }
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <p className="text-center">No tienes favoritos aún.</p>
                        </div>
                    )}
                </div>
            </div>

    );
};
