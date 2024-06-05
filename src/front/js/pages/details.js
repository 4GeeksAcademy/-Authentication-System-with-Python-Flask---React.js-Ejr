import React, { useEffect, useContext} from "react";
import { useParams } from 'react-router-dom';
import { Context } from "../store/appContext.js";
import { ModalAlquilar } from "../component/modalalquilar.js";
import "../../styles/index.css";

export const Details = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    useEffect(() => {
        actions.getDetails(params.id);
    }, []);

    

    return (
        <div className="d-flex justify-content-evenly flex-wrap gap-4 footer-view mt-4">
            {params.id == store.details.id ?
                <>
                    <div id="details-carousel" className="carousel slide w-75 carousel-dark slide">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={store.details?.url_img1} style={{ "maxHeight": "500px", objectFit: "cover" }} className="d-block w-100 ps-3 rounded-3" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src={store.details?.url_img2} style={{ "maxHeight": "500px", objectFit: "cover" }} className="d-block w-100 ps-3 rounded-3" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src={store.details?.url_img3} style={{ "maxHeight": "500px", objectFit: "cover" }} className="d-block w-100 ps-3 rounded-3" alt="..." />
                            </div>
                            <button className="carousel-control-prev ms-3" type="button" data-bs-target="#details-carousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon bg-success" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#details-carousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon bg-success" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
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
                        <div className="d-grid gap-2 col-6 mx-auto d-flex my-4">
                            <ModalAlquilar
                                vehicle_id={store.details.id}
                                marca_modelo={store.details.marca_modelo}
                                precio={store.details.precio}
                                precio_id_stripe={store.details.precio_id_stripe}
                                url_img1={store.details.url_img1}
                            />
                        </div>
                    </div>
                </>
            : null }
        </div>
    );
};