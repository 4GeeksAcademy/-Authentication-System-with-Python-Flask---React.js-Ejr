import React from 'react';
import "../../styles/ModalJobApply.css"
import { FcOk } from "react-icons/fc";
import { FcInfo } from "react-icons/fc";
import {FcCancel} from "react-icons/fc"

const messageIcons = {
    success: <FcOk className='modal-icon' />,
    warning: <FcInfo className='modal-icon' />,
    error: <FcCancel className='modal-icon' />
}


export const ModalJobApply = ({ message, onClose, type }) => {
    
    return (
        <div className="modal">
            <div className="modal-content">
                <h5 className='modal-message'>
                    {message}
                    {messageIcons[type] || messageIcons.error}
                </h5>
                <button className='btn btn-close' onClick={onClose}></button>
            </div>
        </div>
    )
}