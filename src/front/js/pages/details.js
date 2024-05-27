import React, { useEffect, useContext, useState } from "react";
import { useParams } from 'react-router-dom';
import { Context } from "../store/appContext.js";
import { ModalAlquilar } from "../component/modalalquilar.js";
import "../../styles/index.css";

export const Details = () => {
    const { store, actions } = useContext(Context);
    const [isFavorite, setIsFavorite] = useState(false);
    const params = useParams();

    const addOrRemove = async () => {
        if (isFavorite) {
            await actions.removeFav(params.id);
        } else {
            await actions.addFav(params.id);
        }
    }

    useEffect(() => {
        actions.getDetails(params.id);
    }, []);

    useEffect(() => {
        setIsFavorite(store.favorites.some((favorite) => favorite.id == params.id));
    }, [store.favorites]);

    return (
        <>
            <div className="d-flex footer-view mt-4">
                <div id="carouselExample" className="carousel slide w-75 me-4 ms-3 carousel-dark slide">
                    <div id="favorite-btn-carousel" className="position-absolute">
                        <button className="corazon btn btn-outline-success btn-lg" onClick={addOrRemove}>
                            <i className={`fa-heart ${isFavorite ? "fas text-success" : "far"}`}></i>
                        </button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={store.details?.url_img1} style={{ height: "450px", objectFit: "cover" }} className="d-block w-100 rounded-3" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={store.details?.url_img2} style={{ height: "450px", objectFit: "cover" }} className="d-block w-100 rounded-3" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={store.details?.url_img3} style={{ height: "450px", objectFit: "cover" }} className="d-block w-100 rounded-3" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon bg-success" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon bg-success" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div>
                    <div>
                        <div className= "d-flex text-success mb-4">
                            <h1 className="me-1"><strong>{store.details.marca_modelo?.toUpperCase()}</strong></h1>
                        </div>
                        <div>
                            <div className="d-flex mb-4">
                                <h5>
                                    <strong>MATRICULA:</strong> {store.details.matricula?.toUpperCase()} 
                                </h5>
                            </div>
                            <div className="d-flex mb-4">
                                <h5>
                                    <strong>TIPO DE MOTOR:</strong> {store.details.motor}
                                </h5>
                            </div>
                            <div className="d-flex mb-4">
                                <h5>
                                    <strong>TIPO DE CAMBIO:</strong> {store.details.tipo_cambio}
                                </h5>
                            </div>
                            <div className="d-flex mb-4">
                                <h5>
                                <strong>N° ASIENTOS:</strong> {store.details.asientos}
                                </h5>
                            </div>
                            <div className="d-flex mb-4">
                                <h5>
                                    <strong>PRECIO POR DIA:</strong> {store.details.precio} €
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-2 col-6 mx-auto d-flex mt-4">
                        <ModalAlquilar
                            vehicle_id={store.details.id}
                            marca_modelo={store.details.marca_modelo}
                            precio={store.details.precio}
                            precio_id_stripe={store.details.precio_id_stripe}
                            url_img1={store.details.url_img1}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};