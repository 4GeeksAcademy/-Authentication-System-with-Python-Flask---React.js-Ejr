import React from 'react';
import "../../styles/ModalJobApply.css";
import { FcOk } from "react-icons/fc";
import { FcInfo } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';

const messageIcons = {
  success: <FcOk className='modal-icon' />,
  warning: <FcInfo className='modal-icon' />,
  error: <FcCancel className='modal-icon' />
};

export const ModalJobApply = ({ message, onClose, type, showLoginButton }) => {
  const navigate = useNavigate();

  const handleRedirectToLogin = () => {
    navigate('/login'); 
  };

  return (
    <div className="modal-job-apply">
      <div className="modal-content-job-apply">
        <h5 className='modal-message'>
          {message}
          {messageIcons[type] || messageIcons.error}
        </h5>
        <div className="modal-buttons">
          {showLoginButton && (
            <button className='btn btn-login btn-sm mx-3' onClick={handleRedirectToLogin}>
              Ir al Login
            </button>
          )}
          <button className='btn btn-close2' onClick={onClose}>Cerrar</button>
          <button className='btn btn-close' onClick={onClose}></button>
        </div>
      </div>
    </div>
  );
};
