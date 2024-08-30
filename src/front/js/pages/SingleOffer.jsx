import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { ModalJobApply } from "../component/ModalJobApply.jsx";
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

    const offer = store.jobOffers.find(offer => offer.id === parseInt(id));
    const isProgramador = store.user && store.user.profile_programador;

    useEffect(() => {
        if (offer) {
            actions.getNumeroPostulados(id).then(count => {
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
            setModalType('warning');
            setShowLoginButton(!store.user);
            setIsModalOpen(true);
            return;
        }

        if (isSubscribed) {
            const result = await actions.unapplyFromJobOffer(id);
            if (result.msg) {
                setModalMessage(result.msg);
                setModalType(result.type || 'success');
                setIsSubscribed(false);
                setNumeroInscritos(prev => prev - 1);
                setIsModalOpen(true);
            } else {
                setModalMessage("Error al desinscribirse, intente nuevamente.");
                setModalType('error');
                setIsModalOpen(true);
            }
        } else {
            const result = await actions.applyToJobOffer(id);
            if (result.msg) {
                setModalMessage(result.msg);
                setModalType(result.type || 'success');
                setIsSubscribed(true);
                setNumeroInscritos(prev => prev + 1);
                setIsModalOpen(true);
            } else {
                setModalMessage("Error al inscribirse, intente nuevamente.");
                setModalType('error');
                setIsModalOpen(true);
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setShowLoginButton(false);
    };

    if (!offer) {
        return <div className="container mt-5">Oferta no encontrada</div>;
    }

    return (
        <>
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
                                        <span className="text-muted">Número de inscritos: {numeroInscritos}</span>
                                    </div>
                                    {isProgramador && (
                                        <button
                                            className={`btn ${isSubscribed ? 'btn-desinscribirse' : 'btn-inscribirse'} btn-lg`}
                                            onClick={handleApplyClick}
                                        >
                                            {isSubscribed ? 'Desinscribirse' : 'Inscribirse'}
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
                                        <h3>Requisitos Mínimos</h3>
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
                                    <div className="sigle-buttons">
                                    {isProgramador && (
                                        <button
                                            className={`btn-inscribirse-up ${isSubscribed ? 'btn-desinscribirse-single' : 'btn-inscribirse-sigle'} btn-lg mt-3`}
                                            onClick={handleApplyClick}
                                        >
                                            {isSubscribed ? 'Desinscribirse' : 'Inscribirse'}
                                        </button>
                                    )}
                                    </div>
                                </div>
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
