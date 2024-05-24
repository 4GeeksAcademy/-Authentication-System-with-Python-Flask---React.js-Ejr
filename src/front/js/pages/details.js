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
            <div className="footer-view d-flex container mt-5 justify-content-between align-items-center">
                <div className="justify-content-between align-items-center w-75">
                    <div id="carouselExample" className="carousel slide">
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
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div className="container-fluid p-0">
                        <div className="principal mb-3 mt-4 border-top border-bottom m-1 text-dark">
                            <div className="d-flex rounded-end justify-content-between text-center mt-3 m-1 ms-3 me-3">
                                <h1>{store.details.marca_modelo?.toUpperCase()}</h1>
                                <button className={`corazon btn btn-outline-success`} onClick={addOrRemove}>
                                    <i className={`fa-heart ${isFavorite ? "fas text-success" : "far"}`}></i>
                                </button>
                            </div>
                            <div className="d-flex justify-content-between text-center mt-4 p-0 ms-3 me-3">
                                <div className="detalle">
                                    <h6>
                                        MATRICULA
                                    </h6>
                                    <p>
                                        {store.details.matricula?.toUpperCase()}
                                    </p>
                                </div>
                                <div className="detalle">
                                    <h6>
                                        TIPO DE MOTOR
                                    </h6>
                                    <p>
                                        {store.details.motor?.toUpperCase()}
                                    </p>
                                </div>
                                <div className="detalle">
                                    <h6>
                                        TIPO DE CAMBIO
                                    </h6>
                                    <p>
                                        {store.details.tipo_cambio?.toUpperCase()}
                                    </p>
                                </div>
                                <div className="detalle">
                                    <h6>
                                        N° ASIENTOS
                                    </h6>
                                    <p>
                                        {store.details.asientos}
                                    </p>
                                </div>
                                <div className="detalle">
                                    <h6>
                                        PRECIO POR DIA
                                    </h6>
                                    <p>
                                        {store.details.precio} €
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-2 col-6 mx-auto d-flex justify-content-center mt-4">
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