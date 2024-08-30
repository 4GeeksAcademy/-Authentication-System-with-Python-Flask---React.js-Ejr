import React, { useState, useContext, useEffect } from "react";
import "../../styles/CardOffer.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { ModalJobApply } from "./ModalJobApply.jsx";
import { FcExpired } from "react-icons/fc";

export const CardOffer = ({ id }) => {
  const { actions, store } = useContext(Context);
  const offer = store.jobOffers.find(offer => offer.id === id);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('');
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [numeroInscritos, setNumeroInscritos] = useState(0);

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
  }, [store.user, id, actions]);

  const handleViewDetails = () => {
    navigate(`/singleoffer/${id}`);
  };

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
              {numeroInscritos} postulados
            </span>
          </div>
          <div className="col-9 header-box d-flex flex-column">
            <h2 className="card-offer-title">{offer.name}</h2>
            <span className="fecha-publicacion text-muted">
              publicada el {offer.fecha_publicacion}
            </span>
            <span className="card-offer-company">
              nombreEmpresa - {offer.localidad}
            </span>
            <div className="card-offer-description text-muted">
              <p className="text-description">{offer.descripcion}</p>
            </div>
            <div className="data-footer">
              <ul className="card-offer-details d-flex text-muted">
                <li className="list-footer-details">
                  <FcExpired className="exp-icon" /> {offer.plazo}
                </li>
                <li className="list-footer-details">{offer.modalidad + " | "}</li>
                <li className="list-footer-details mx-2">
                  {offer.salario + " | "}
                </li>
                <li className="list-footer-details">{offer.experiencia_minima}</li>
              </ul>
              <div className="card-offer-actions">
                <button
                  onClick={handleViewDetails}
                  className="btn btn-details btn-sm text-decoration-none me-2">
                  Ver detalles
                </button>
                {!store.user || (store.user && store.user.profile_programador) && (
                  <button
                    className={`btn ${isSubscribed ? 'btn-desinscribirse' : 'btn-inscribirse'} btn-sm`}
                    onClick={handleApplyClick}>
                    {isSubscribed ? 'Desinscribirse' : 'Inscribirse'}
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
        />
      )}
    </>
  );
};
