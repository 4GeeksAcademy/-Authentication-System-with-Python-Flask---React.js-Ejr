import React, { useContext } from 'react';
import { Context } from "../store/appContext";

const Favoritos = () => {
    const { store, actions } = useContext(Context);

    const handleDeleteFavorite = (programador_id, oferta_id, empleador_id) => {
        actions.removeFavorite(programador_id, oferta_id, empleador_id);
    }

    return (
        <div>
            <div className="dropdown me-3">
                <button className="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    Favorites <span className="badge badge-light">{store.favorites.length}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                    {store.favorites.length === 0 ? (
                        <li><span className="dropdown-item">No favorites</span></li>
                    ) : (
                        store.favorites.map((favorite, index) => (
                            <li key={index} className="d-flex justify-content-between align-items-center">
                                <span className="dropdown-item">{favorite.name}</span>
                                <button 
                                    className="btn btn-outline-danger btn-sm" 
                                    style={{ marginRight: "15px" }}
                                    onClick={() => handleDeleteFavorite(favorite.programador_id, favorite.oferta_id, favorite.empleador_id)}
                                >
                                    <i className="fa fa-trash"></i>
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Favoritos;