import React, { useContext, useEffect } from 'react';
import { Context } from "../store/appContext";
import "../../styles/faovirtos.css";

export const Favoritos = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getFavorites();
    }, []);

    const renderFavoriteInfo = (favorito) => {
        console.log(favorito.id);
        if (favorito.id) {
            return (
                <>
                    <h5 className="favoritos-card-title text-center">Ofertas</h5>
                    <p className="favoritos-card-text"><strong>Empresa:</strong> {favorito.nombre_empresa}</p>
                    <p className="favoritos-card-text"><strong>Nombre de la oferta:</strong> {favorito.name}</p>
                    <p className="favoritos-card-text"><strong>Descripcion:</strong> {favorito.descripcion}</p>
                    <p className="favoritos-card-text"><strong>Estudios minimos: </strong> {favorito.estudios_minimos}</p>
                    <p className="favoritos-card-text"><strong>Experiencia minima: </strong>{favorito.experiencia_minima}</p>
                    <p className="favoritos-card-text"><strong>Fecha de publicacion:</strong> {favorito.fecha_publicacion}</p>
                    <p className="favoritos-card-text"><strong>Horario: </strong> {favorito.horario}</p>
                    <p className="favoritos-card-text"><strong>Idiomas: </strong> {favorito.idiomas}</p>
                    <p className="favoritos-card-text"><strong>Localidad: </strong> {favorito.localidad}</p>
                    <p className="favoritos-card-text"><strong>Modalidad: </strong> {favorito.modalidad}</p>
                    <p className="favoritos-card-text"><strong>Plazo: </strong> {favorito.plazo}</p>
                    <p className="favoritos-card-text"><strong>Requisitos minimos: </strong> {favorito.requisitos_minimos}</p>
                    <p className="favoritos-card-text"><strong>Salario: </strong>{favorito.salario}</p>
                    <p className="favoritos-card-text"><strong>Tipo de contrato:</strong> {favorito.tipo_contrato}</p>
                </>
            );
        } else if (favorito.programador_id) {
            return (
                <>
                    <h5 className="favoritos-card-title">{favorito.programador.user.name}</h5>
                    <p className="favoritos-card-text">{favorito.programador.descripcion}</p>
                    <p className="favoritos-card-text"><strong>Tecnologías:</strong> {favorito.programador.tecnologias}</p>
                    <p className="favoritos-card-text"><strong>Experiencia:</strong> {favorito.programador.experiencia}</p>
                </>
            );
        } else if (favorito.empleador_id) {
            return (
                <>
                    <h5 className="favoritos-card-title">{favorito.empleador.user.name}</h5>
                    <p className="favoritos-card-text">{favorito.empleador.descripcion}</p>
                    <p className="favoritos-card-text"><strong>CIF:</strong> {favorito.empleador.cif}</p>
                </>
            );
        } else {
            return <p className="favoritos-card-text">Información no disponible</p>;
        }
    };

    return (
        <div className="favoritos-container mt-5">
            <div className="favoritos-row row">
                {store.favorites && store.favorites.length > 0 ? (
                    store.favorites.map((favorito, index) => (
                        <div key={index} className="favoritos-col col-md-4 mb-3">
                            <div className="favoritos-card card">
                                <div className="favoritos-card-body card-body">
                                    {renderFavoriteInfo(favorito)}
                                    <button
                                        className="favoritos-btn  mt-3"
                                        onClick={() =>
                                            actions.removeFavorite(
                                                favorito.programador_id,
                                                favorito.empleador_id,
                                                favorito.id
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
                    <div className="favoritos-empty col-12">
                        <p className="favoritos-empty-text text-center">No tienes favoritos aún.</p>
                    </div>
                )}
            </div>
        </div>

    );
};