
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactSwitch from "react-switch";
import { ThemeContext } from "../layout";
import { Context } from "../store/appContext";
import ReactModal from 'react-modal'
import { useNavigate } from "react-router-dom";
import { Login } from "../pages/login";



export const SwitchLight = () => {
    return (
      <div className="modalLogin">
        <ReactModal
          style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(170, 190, 214, 0.75)', // Color de fondo del overlay
              backdropFilter: 'blur(8px) saturate(180%)', // Efecto de desenfoque
              WebkitBackdropFilter: 'blur(16px) saturate(180%)', // Prefijo para navegadores basados en WebKit
            },
            content: {
              position: 'absolute',
              top: '40px',
              left: '40px',
              right: '40px',
              bottom: '40px',
              border: '1px solid rgba(209, 213, 219, 0.3)', 
              backgroundColor: 'rgba(255, 255, 255, 0.75)', 
              borderRadius: '12px', 
              outline: 'none',
              padding: '20px',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
            },
          }}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Login Modal"
        >
          <Login onSubmit={handleSubmit} />
        </ReactModal>
      </div>
    );
  };