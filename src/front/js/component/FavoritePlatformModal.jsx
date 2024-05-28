import React from 'react';
import '../../styles/Modals.css'; // Importa los estilos
import CardContainer from './CardContainer.jsx';

const FavoritePlatformModal = ({ show, handleClose, handleNext, handlePrev, onInputChange }) => {
    return (
        <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Set up your profile</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <CardContainer onInputChange={onInputChange} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handlePrev}>Go Back</button>
                        <button type="button" className="btn btn-primary" onClick={handleNext}>Continue</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavoritePlatformModal;
