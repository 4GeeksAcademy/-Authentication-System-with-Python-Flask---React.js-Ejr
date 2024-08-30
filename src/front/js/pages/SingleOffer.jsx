import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import "../../styles/SingleOffer.css";

export const SingleOffer = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);

    const offer = store.jobOffers.find(offer => offer.id === parseInt(id));

    if (!offer) {
        return <div className="container mt-5">Oferta no encontrada</div>;
    }

    // Check if the user is a programmer
    const isProgramador = store.user && store.user.profile_programador;

    const handleApplyClick = async () => {
        if (!isProgramador) {
            alert("Solo los programadores pueden inscribirse en esta oferta.");
            return;
        }

        // Check if the user is already subscribed
        const isSubscribed = store.user.inscribedOffers?.includes(id);
        if (isSubscribed) {
            const result = await actions.unapplyFromJobOffer(id);
            if (result.msg) {
                alert(result.msg);
                // Optionally, update the user state here
            }
        } else {
            const result = await actions.applyToJobOffer(id);
            if (result.msg) {
                alert(result.msg);
                // Optionally, update the user state here
            }
        }
    };

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
                                    <h2 className="mb-0">{offer.name}</h2>
                                    <span className="text-muted">
                                        {offer.fecha_publicacion}
                                        <span className="ms-3">{offer.localidad}</span>
                                    </span>
                                    <div className="salary-box">
                                        <span className="text-success">{offer.salario}</span>
                                    </div>
                                </div>
                                {/* Show button only if the user is a programmer */}
                                {isProgramador && (
                                    <button
                                        className="btn btn-single-offer-up btn-lg"
                                        onClick={handleApplyClick}
                                    >
                                        Inscribirse a la oferta
                                    </button>
                                )}
                            </div>
                            <div className="requisit-list d-flex mt-4">
                                <ul className="text-muted">
                                    <li>{offer.modalidad}</li>
                                    <li>{offer.experiencia_minima}</li>
                                    <li>{offer.salario}</li>
                                    <li>{offer.plazo}</li>
                                </ul>
                                <ul className="text-muted">
                                    <li>{offer.idiomas}</li>
                                    <li>{offer.tipo_contrato}</li>
                                    <li>{offer.horario}</li>
                                    <li>{offer.estudios_minimos}</li>
                                </ul>
                            </div>
                            <hr />
                            <div className="requisitos-minimos-single-offer">
                                <div className="text-secondary fw-bold fs-2 text-decoration-underline">
                                    <h3>Requisitos Minimos</h3>
                                </div>
                                <p className="text-muted text-start">
                                    {offer.requisitos_minimos}
                                </p>
                            </div>
                            <hr />
                            <div className="data-single-offer-container">
                                <div className="offer-description mt-3">
                                    <h5 className="fw-bold">Descripción</h5>
                                    <p className="single-offer-description">{offer.descripcion}</p>
                                </div>
                                {/* Show button only if the user is a programmer */}
                                {isProgramador && (
                                    <button
                                        className="btn btn-single-offer-down btn-lg mt-3"
                                        onClick={handleApplyClick}
                                    >
                                        Inscribirse a la oferta
                                    </button>
                                )}
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
