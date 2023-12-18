import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {

    const handleInicioClick = () => {
        console.log("Botón de Inicio clicado");

    };

    const handleServiciosClick = () => {
        console.log("Botón de Servicios clicado");

    };

    const handleProfesionalesClick = () => {
        console.log("Botón de Profesionales clicado");

    };

    const handleLoginClick = () => {
        console.log("Botón de Iniciar Sesión clicado");
    
    };

    const handleRegisterClick = () => {
        console.log("Botón de Registrarse clicado");
  
    };

    return (
        <div className="bubbleContainer">
            <div className="navLinks">
                <button className="navLink" onClick={handleInicioClick}>
                    <div className="navLabel">Inicio</div>
                </button>
                <button className="navLink" onClick={handleServiciosClick}>
                    <div className="navLabel">Servicios</div>
                </button>
                <button className="navLink" onClick={handleProfesionalesClick}>
                    <div className="navLabel">Profesionales</div>
                </button>
            </div>
            <div className="navLinks1">
                <button className="navLink" onClick={handleLoginClick}>
                    <div className="navLabel">Iniciar Sesión</div>
                </button>
                <button className="navLink" onClick={handleRegisterClick}>
                    <div className="navLabel">Registrarse</div>
                </button>
            </div>
            <div className="brand">
                <FontAwesomeIcon icon={faHeartbeat} />
                <div className="brandname">PhysioCareSync</div>
            </div>
        </div>
    );
};
