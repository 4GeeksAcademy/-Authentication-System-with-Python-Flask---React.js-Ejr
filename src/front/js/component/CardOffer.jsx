import React, { useState, useContext, useEffect } from "react";
import "../../styles/CardOffer.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { ModalJobApply } from "./ModalJobApply.jsx";
import { FaRegHeart, FaHeart } from "react-icons/fa"; 
import { StarsRating} from "./StarsRating.jsx"

export const CardOffer = ({ id }) => {
    const { actions, store } = useContext(Context);
    const offer = store.jobOffers.find((offer) => offer.id === id);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [numeroInscritos, setNumeroInscritos] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false); 

    if (!offer) return <div>Oferta no encontrada</div>;

    useEffect(() => {
        if (store.user && store.user.profile_programador) {
            const subscribed = store.user.inscribedOffers?.includes(id);
            setIsSubscribed(subscribed);
        }
        actions.getNumeroPostulados(id).then((count) => {
            if (count !== null) {
                setNumeroInscritos(count);
            }
        });

        
        const favorite = store.favorites?.some((fav) => fav.oferta_id === id);
        setIsFavorite(favorite);
    }, [store.user, id, actions, store.favorites]);

    const handleViewDetails = () => {
        navigate(`/singleoffer/${id}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long' };
        return date.toLocaleDateString('es-ES', options);
    };

    const handleApplyClick = async () => {
        if (!store.user || !store.user.profile_programador) {
            setModalMessage("Solo los programadores pueden inscribirse en esta oferta.");
            setModalType("warning");
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

    const handleFavoriteClick = async () => {
        if (!store.user) {
            setModalMessage("Debes estar registrado para agregar a favoritos.");
            setModalType("warning");
            setIsModalOpen(true);
            return;
        }
        const programador_id = store.user.profile_programador?.id || null; 
        const empleador_id = store.user.profile_empleador?.id || null; 
        const oferta_id = id; 
    
        try {
            if (isFavorite) {
                await actions.removeFavorite(programador_id, empleador_id, oferta_id);
            } else {
                await actions.addFavorite(programador_id, empleador_id, oferta_id);
            }
            setIsFavorite(!isFavorite);
        } catch (error) {
            setModalMessage("Error al agregar a favoritos. Intente nuevamente.");
            setModalType("error");
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="container">
                <div className="row card-offer mt-2">
                    <div className="col-2 img-box">
                        <img
                            className="card-offer-logo"
                            src="https://img.freepik.com/vector-premium/concepto-pequena-empresa-fachada-cafeteria-tiendas-ventas_654623-1161.jpg"
                            alt="Company Logo"
                        />
                        <span className="num-postulados text-muted">
                            ({numeroInscritos}) Se han inscrito
                        </span>
                    </div>
                    <div className="col-9 header-box d-flex flex-column">
                        <div className="title-heart d-flex justify-content-between">
                            <h2 className="card-offer-title">{offer.name}</h2>
                            <div onClick={handleFavoriteClick} style={{ cursor: "pointer" }}>
                                {isFavorite ? (
                                    <FaHeart className="heart-icon" />
                                ) : (
                                    <FaRegHeart className="heart-icon" />
                                )}
                            </div>
                        </div>
                        <span className="card-offer-company">
                            {offer.nombre_empresa} - {offer.localidad}
                        </span>
                        <StarsRating offerId={id} />
                        <div className="card-offer-description text-muted">
                            <p className="text-description">{offer.descripcion}</p>
                        </div>
                        <div className="data-footer">
                            <ul className="card-offer-details d-flex text-muted">
                                <li className="list-footer-details">
                                    Publicada el {formatDate(offer.fecha_publicacion)}
                                </li>
                                <li className="list-footer-details">
                                    {offer.modalidad + " | "}
                                </li>
                                <li className="list-footer-details mx-2">
                                    {offer.salario + " | "}
                                </li>
                                <li className="list-footer-details">
                                    {offer.experiencia_minima}
                                </li>
                            </ul>
                            <div className="card-offer-actions">
                                <button
                                    onClick={handleViewDetails}
                                    className="btn btn-details btn-sm text-decoration-none me-3"
                                >
                                    Ver detalles
                                </button>
                                {!store.user ||
                                    (store.user && store.user.profile_programador && (
                                        <button
                                            className={`btn ${isSubscribed
                                                ? "btn-desinscribirse"
                                                : "btn-inscribirse"
                                                } btn-sm`}
                                            onClick={handleApplyClick}
                                        >
                                            {isSubscribed ? "Desinscribirse" : "Inscribirse"}
                                        </button>
                                    ))}
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
                />
            )}
        </>
    );
};