// SingleOffer.jsx
import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { ModalJobApply } from "../component/ModalJobApply.jsx";
import { StarsRating } from "../component/StarsRating.jsx";
import "../../styles/SingleOffer.css";

export const SingleOffer = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const [numeroInscritos, setNumeroInscritos] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('');
    const [showLoginButton, setShowLoginButton] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const offer = store.jobOffers.find((offer) => offer.id === parseInt(id));
    const isProgramador = store.user && store.user.profile_programador;

    useEffect(() => {
        if (offer) {
            actions.getNumeroPostulados(id).then((count) => {
                if (count !== null) {
                    setNumeroInscritos(count);
                }
            });
        }

        if (store.user && store.user.profile_programador) {
            const subscribed = store.user.inscribedOffers?.includes(parseInt(id));
            setIsSubscribed(subscribed);
        }
    }, [id, offer, actions, store.user]);

    const handleApplyClick = async () => {
        if (!store.user || !store.user.profile_programador) {
            setModalMessage("Solo los programadores pueden inscribirse en esta oferta.");
            setModalType("warning");
            setShowLoginButton(!store.user);
            setIsModalOpen(true);
            return;
        }

        try {
            let result;
            if (isSubscribed) {
                result = await actions.unapplyFromJobOffer(id);
                if (result?.msg) {
                    setModalMessage(result.msg);
                    setModalType(result.type === "success" ? "success" : "error");
                    setIsSubscribed(false);
                    setNumeroInscritos((prev) => prev - 1);
                } else {
                    throw new Error("Error al desinscribirse, intente nuevamente.");
                }
            } else {
                result = await actions.applyToJobOffer(id);
                if (result?.msg) {
                    setModalMessage(result.msg);
                    setModalType(result.type === "success" ? "success" : "error");
                    setIsSubscribed(true);
                    setNumeroInscritos((prev) => prev + 1);
                } else {
                    throw new Error("Error al inscribirse, intente nuevamente.");
                }
            }
        } catch (error) {
            setModalMessage(error.message);
            setModalType("error");
        } finally {
            setIsModalOpen(true);
        }
    };

    const handleViewCompany = () => {
        navigate(`/Companyview/${id}`);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setShowLoginButton(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: "numeric", month: "long" };
        return date.toLocaleDateString("es-ES", options);
    };

    if (!offer) {
        return <div className="container mt-5">Oferta no encontrada</div>;
    }

    return (
        <>
            <div className="container my-5">
                <div className="card single-offer-box mb-4 shadow-lg p-3">
                    <div className="row">
                        <div className="col-2">
                            <div className="card-offer-logo">
                                <img
                                    src="https://img.freepik.com/vector-premium/concepto-pequena-empresa-fachada-cafeteria-tiendas-ventas_654623-1161.jpg"
                                    alt="Company Logo"
                                    className="img-fluid rounded"
                                />
                                <div className="text-muted postulados-single-offer d-flex mt-2">
                                    <span className="text-muted ms-1 num-postulados-single">{numeroInscritos}</span>
                                    <span className="text-muted ms-1 num-postulados-single">Inscritos a esta oferta</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-7 text-start">
                            <div className="d-flex flex-column flex-md-row align-items-start justify-content-between">
                                <div className="d-flex flex-column">
                                    <h2 className="mb-0">{offer.name}</h2>
                                    <span 
                                        className="companyName-localidad"
                                        onClick={handleViewCompany}
                                    >
                                        {offer.nombre_empresa} - {offer.localidad}
                                    </span>
                                    <span className="fecha_publicacion text-secondary">
                                        publicada el {formatDate(offer.fecha_publicacion)}
                                    </span>
                                    <StarsRating SingleOfferRating="single-offer-rating" />
                                </div>
                                {isProgramador && (
                                    <button
                                        className="btn btn-apply mt-2 mt-md-0"
                                        onClick={handleApplyClick}
                                    >
                                        {isSubscribed ? "Desinscribirse" : "Inscribirse"}
                                    </button>
                                )}
                            </div>
                            <div className="col-3">

                            </div>
                        </div>
                    </div>
                        <div className="row">
                            <div className="col-12 mt-4">
                                <div className="data-header-list">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <ul className="text-muted">
                                                <li>{offer.idiomas}</li>
                                                <li>{offer.salario}</li>
                                                <li>{offer.estudios_minimos}</li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul className="text-muted">
                                                <li>{offer.modalidad}</li>
                                                <li>{offer.tipo_contrato}</li>
                                                <li>{offer.localidad}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-4">
                            <div className="requisits-box">
                                <h2>Requisitos</h2>
                                <div className="formacion">
                                    <h5 className="lh-1 mt-4">Estudios mínimos</h5>
                                    <p>{offer.estudios_minimos}</p>
                                </div>
                                <div className="experiencia-min mt-4">
                                    <h5>Experiencia mínima</h5>
                                    <p>{offer.experiencia_minima}</p>
                                </div>
                                <div className="idiomas mt-4">
                                    <h5>Idiomas requeridos</h5>
                                    <p>{offer.idiomas}</p>
                                </div>
                                <div className="tipo-contrato mt-4">
                                    <h5>Tipo de contrato</h5>
                                    <p>{offer.tipo_contrato}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-4">
                            <hr />
                            <div className="requisitos-minimos-single-offer">
                                <h3>Requisitos Mínimos</h3>
                                <p className="text-muted text-start">{offer.requisitos_minimos}</p>
                            </div>
                            <hr />
                            <div className="offer-description mt-3">
                                <h5 className="fw-bold">Descripción</h5>
                                <p>{offer.descripcion}</p>
                            </div>
                            {isProgramador && (
                                <div className="text-end mt-4">
                                    <button
                                        className="btn btn-apply"
                                        onClick={handleApplyClick}
                                    >
                                        {isSubscribed ? "Desinscribirse" : "Inscribirse"}
                                    </button>
                                </div>
                            )}
                        </div>
                    
                </div>
            </div>
            {isModalOpen && (
                <ModalJobApply
                    message={modalMessage}
                    type={modalType}
                    onClose={handleCloseModal}
                    showLoginButton={showLoginButton}
                />
            )}
        </>
    );
};
