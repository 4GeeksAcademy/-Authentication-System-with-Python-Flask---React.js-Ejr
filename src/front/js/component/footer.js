import React, { Component } from "react";
import "../../styles/footer.css";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer>
        <div className="footer-container">
            <ul className="footer-links">
                <Link to="/">
                    <li><a href="#home">Inicio</a></li>
                </Link>
                <Link to="/about">
                    <li><a href="#about">Sobre Nosotros</a></li>
                </Link>
                <Link to="/contacto">
                    <li><a href="#contact">Contacto</a></li>
                </Link>
            </ul>
			<p>&copy; 2024 LEARNING NETWORK. Todos los derechos reservados.</p>
        </div>
    </footer>
);
