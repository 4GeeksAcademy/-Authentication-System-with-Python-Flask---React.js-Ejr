import React, { useContext } from "react";
import "../../styles/CardOffer.css";
import { useNavigate } from "react-router-dom";
import { StarRating } from "./StarsRating.jsx";
import { Context } from "../store/appContext.js";

export const CardOffer = ({ id }) => {
    const { store } = useContext(Context);
    const offer = store.jobOffers.find(offer => offer.id === id);
    const navigate = useNavigate();

    if (!offer) return <div>Oferta no encontrada</div>;

    const handleViewDetails = () => {
        navigate(`/singleoffer/${id}`);
    };

    return (
        <>
            <div className="container">
                <div className="row card-offer">
                    <div className="col-2 img-box">
                        <img
                            className=" card-offer-logo"
                            src="https://img.freepik.com/vector-premium/concepto-pequena-empresa-fachada-cafeteria-tiendas-ventas_654623-1161.jpg"
                            alt="Company Logo"
                        />
                        <StarRating rating={offer.rating} />
                    </div>
                    <div className="col-9 header-box d-flex flex-column">
                        <h2 className="card-offer-title">{offer.name}</h2>
                        <span className="card-offer-company">Tech-company - España</span>
                        <div className="card-offer-description text-muted">
                            <p className="text-description">{offer.descripcion}</p>
                        </div>
                        <div className="data-footer">
                            <ul className="card-offer-details d-flex text-muted">
                                <li className="list-footer-details">{offer.modalidad + " | "}</li>
                                <li className="list-footer-details mx-2">{offer.salario + " | "}</li>
                                <li className="list-footer-details">{offer.experiencia_minima}</li>
                            </ul>
                            <div className="card-offer-actions">
                                <button
                                    onClick={handleViewDetails}
                                    className="btn btn-details btn-sm text-decoration-none me-2">
                                    Ver detalles
                                </button>
                                <button className="btn btn-inscribirse btn-sm">Inscribirse</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-1">


                    </div>
                </div>
            </div>
        </>

        /*** 
        <div className="card-offer my-2 p-3 d-flex align-items-center">
            <div className="card-offer-logo me-3">
                <img
                    className="card-offer-logo"
                    src="https://img.freepik.com/vector-premium/concepto-pequena-empresa-fachada-cafeteria-tiendas-ventas_654623-1161.jpg"
                    alt="Company Logo"
                />
                <StarRating rating={offer.rating} />
            </div>
            <div className="card-offer-body">
                <div className="title-box">
                    <h2 className="card-offer-title">{offer.name}</h2>
                    <span className="card-offer-company mb-1">Tech-company - España</span>
                </div>
                <div className="card-offer-description text-muted">
                    <p className="text-description">{offer.descripcion}</p>
                </div>
                <div className="card-offer-footer d-flex justify-content-between align-items-center mt-2">
                    <div className="card-offer-details text-muted">
                        <span>{offer.experiencia_minima}</span>
                        <span className="mx-2">|</span>
                        <span>{offer.salario}</span>
                        <span className="mx-2">|</span>
                        <span>{offer.modalidad}</span>
                    </div>
                </div>
            </div>
        </div>
        */
    );
};
