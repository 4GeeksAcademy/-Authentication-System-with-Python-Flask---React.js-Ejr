import React from 'react';
import "../../styles/ModalJobApply.css";
import { FcOk } from "react-icons/fc";
import { FcInfo } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";

const messageIcons = {
  success: <FcOk className='modal-icon' />,
  warning: <FcInfo className='modal-icon' />,
  error: <FcCancel className='modal-icon' />
};

export const ModalJobApply = ({ message, onClose, type}) => {

  return (
    <div className="modal-job-apply">
      <div className="modal-content-job-apply">
        <h5 className='modal-message'>
          {message}
          {messageIcons[type] || messageIcons.error}
        </h5>
        <div className="modal-buttons">
          <button className='btn btn-close2' onClick={onClose}>Cerrar</button>
          <button className='btn btn-close' onClick={onClose}></button>
        </div>
      </div>
    </div>
  );
};
