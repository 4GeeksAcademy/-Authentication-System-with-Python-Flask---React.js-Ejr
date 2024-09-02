// SingleOffer.jsx
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { ModalJobApply } from "../component/ModalJobApply.jsx";
import { StarsRating } from "../component/StarsRating.jsx";
import "../../styles/SingleOffer.css";

export const SingleOffer = () => {
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
            <div className="container big-singleoffer-container my-5 position-relative">
                <div className="card single-card single-offer-box mb-4 position-relative">
                    <div className="card-body">
                        <div className="card-offer-logo">
                            <img
                                src="https://img.freepik.com/vector-premium/concepto-pequena-empresa-fachada-cafeteria-tiendas-ventas_654623-1161.jpg"
                                alt="Company Logo"
                            />
                            <div className="text-muted postulados-single-offer d-flex">
                                <span className="text-muted ms-1 num-postulados-single">{numeroInscritos}</span>
                                <span className="text-muted ms-1 num-postulados-single">Inscritos a esta oferta</span>
                            </div>
                        </div>
                        <div className="card-singleoffer-header d-flex align-items-center">
                            <div className="d-flex flex-column offer-header">
                                <h2 className="mb-0">{offer.name}</h2>
                                <span className="ms-3 companyName-localidad">
                                    {offer.nombre_empresa} - {offer.localidad}
                                </span>
                                <span className="fecha_publicacion text-secondary">
                                    publicada el {formatDate(offer.fecha_publicacion)}
                                </span>
                                <StarsRating SingleOfferRating="single-offer-rating" />
                            </div>
                            {isProgramador && (
                                <button
                                    className={`btn btn-apply btn-apply-top-right`}
                                    onClick={handleApplyClick}
                                >
                                    {isSubscribed ? "Desinscribirse" : "Inscribirse"}
                                </button>
                            )}
                        </div>
                        <div className="data-header-list d-flex justify-content-start mt-5">
                            <ul className="text-muted data-1">
                                <li>{offer.idiomas}</li>
                                <li>{offer.salario}</li>
                                <li>{offer.estudios_minimos}</li>
                            </ul>
                            <ul className="text-muted data-2">
                                <li>{offer.modalidad}</li>
                                <li>{offer.tipo_contrato}</li>
                                <li>{offer.localidad}</li>
                            </ul>
                        </div>
                        <div className="requisits-box">
                            <h2 className="">Requisitos</h2>
                            <div className="formacion">
                                <h5 className="lh-1 mt-4">Estudios minimos</h5>
                                <p>{offer.estudios_minimos}</p>
                            </div>
                            <div className="expriencia-min mt-4">
                                <h5>Experiencia minima</h5>
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
                        <hr />
                        <div className="requisitos-minimos-single-offer">
                            <div className="fs-4">
                                <h3 className="">Requisitos Mínimos</h3>
                            </div>
                            <p className="text-muted text-start">{offer.requisitos_minimos}</p>
                        </div>
                        <hr />
                        <div className="data-single-offer-container position-relative">
                            <div className="offer-description mt-3">
                                <h5 className="fw-bold">Descripción</h5>
                                <p className="single-offer-description">{offer.descripcion}</p>
                            </div>
                            <div className="sigle-buttons mx-2">
                                {isProgramador && (
                                    <button
                                        className={`btn btn-apply btn-apply-bottom-left`}
                                        onClick={handleApplyClick}
                                    >
                                        {isSubscribed ? "Desinscribirse" : "Inscribirse"}
                                    </button>
                                )}
                            </div>
                        </div>
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
