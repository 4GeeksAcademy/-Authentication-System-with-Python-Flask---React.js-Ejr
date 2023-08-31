import React from "react";
import '../../styles/NavBar.css'

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <button className="navbar-logo">TechSports</button>
            </div>
            <div className="navbar-links">
                <a href="#" className="navbar-link">Inicio</a>
                <a href="#" className="navbar-link">Servicios</a>
                <a href="#" className="navbar-link">Eventos</a>
                <a href="#" className="navbar-link">Galería</a>
                <a href="#" className="navbar-link">Planes</a>
                <a href="#" className="navbar-link">Contacto</a>
                <a href="#" className="navbar-link">Perfil</a>
            </div>
        </nav>
    );
}

export default Navbar;
