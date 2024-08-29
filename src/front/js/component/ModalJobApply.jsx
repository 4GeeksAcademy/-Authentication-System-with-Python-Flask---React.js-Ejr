import React from 'react';
import "../../styles/ModalJobApply.css"


export const ModalJobApply = ({message, onClose}) =>{
    return(
        <div className="modal">
            <div className="modal-content">
                <h5>{message}</h5>
                <button className='btn btn-closeModal' onClick={onClose}>Cerrar</button>
            </div>
        </div>
    )
}