import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import "../../styles/SingleOffer.css";

export const SingleOffer = () => {
    const { id } = useParams();
    const { store } = useContext(Context);

    const offer = store.jobOffers.find(offer => offer.id === parseInt(id));

    if (!offer) {
        return <div className="container mt-5">Oferta no encontrada</div>;
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-8">
                    <div className="card single-card single-offer-box mb-4">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="card-offer-logo">
                                    <img
                                        src="https://img.freepik.com/vector-premium/concepto-pequena-empresa-fachada-cafeteria-tiendas-ventas_654623-1161.jpg"
                                        alt="Company Logo"
                                    />
                                </div>
                                <div className="d-flex flex-column offer-header">
                                    <h2 className="mb-0 ">{offer.title}</h2>
                                    <span className="text-muted">{offer.company}<span className="ms-3">{offer.location}</span></span>
                                    <div className="salary-box">
                                        <span className="text-success">{offer.salary}</span>
                                    </div>
                                </div>
                                <button className="btn btn-single-offer-up btn-lg">Inscribirse a la oferta</button>
                            </div>
                            <div className="requisit-list d-flex mt-4">
                                <ul className="text-muted">
                                    <li>Estudios mínimos</li>
                                    <li>Años de experiencia</li>
                                    <li>{offer.location}</li>
                                </ul>
                                <ul className="text-muted">
                                    <li>Tipo de contrato</li>
                                    <li>Tecnologías</li>
                                    <li>Otros</li>
                                </ul>
                            </div>
                            <hr />
                            <div className="data-single-offer-container">

                                <div className="offer-description mt-3">
                                    <h5 className="fw-bold">Descripción</h5>
                                    <p className="single-offer-description">{offer.description}</p>
                                </div>
                                <button className="btn btn-single-offer-down btn-lg mt-3">Inscribirse a la oferta</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card mb-3 card-single-offer">
                        <h5 className="card-header">Featured</h5>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <button href="#" className="btn btn-primary">Go somewhere</button>
                        </div>
                    </div>
                    <div className="card card-single-offer">
                        <h5 className="card-header">Featured</h5>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <button href="#" className="btn btn-primary">Go somewhere</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
