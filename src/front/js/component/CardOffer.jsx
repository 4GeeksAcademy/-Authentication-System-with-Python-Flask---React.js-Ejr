import React, {useState, useContext } from "react";
import "../../styles/CardOffer.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { ModalJobApply } from "./ModalJobApply.jsx";

export const CardOffer = ({ id }) => {
    const { actions, store } = useContext(Context);
    const offer = store.jobOffers.find(offer => offer.id === id);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');


    if (!offer) return <div>Oferta no encontrada</div>;

    const handleViewDetails = () => {
        navigate(`/singleoffer/${id}`);
    };

    const handleSaveClick = () => {
        console.log('Guardar oferta', id);
    };

    const handleApplyClick = async () =>{
        const result = await actions.applyToJobOffer(id);
        if(result.msg){
            setModalMessage(result.msg);
            setIsModalOpen(true);
        }
    }

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
                    </div>
                    <div className="col-9 header-box d-flex flex-column">
                        <h2 className="card-offer-title">{offer.name}</h2>
                        <span className="card-offer-company">Tech-company - España</span>
                        <div className="card-offer-description text-muted">
                            <p className="text-description">{offer.descripcion}</p>
                        </div>
                        <div className="data-footer">
                            <ul className="card-offer-details d-flex text-muted">
                                <li className="list-footer-details">Expira {offer.plazo}</li>
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
                                <button className="btn btn-inscribirse btn-sm" onClick={handleApplyClick}>
                                    Inscribirse
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 save-icon">
                        <button className="btn btn-save" onClick={handleSaveClick}>
                            <FontAwesomeIcon icon={faBookmark} />
                        </button>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <ModalJobApply  
                    message={modalMessage}
                    onClose={handleCloseModal}
                />
            )}       
        </>
    );
};
