import React, { Component } from "react";
import "../../styles/footer.css";
import { FaFacebook, FaInstagram, FaTwitter  } from "react-icons/fa";

export const Footer = () => (
	<div className="container">
	<footer className="footer d-flex  justify-content-around align-items-center m-0">
			<div className="text-footer">
				<a className="me-3" href="#">Sobre nosotros</a>
				<a className="me-3" href="#">Contáctanos</a>
				<a className="me-3" href="#">Política de privacidad</a>
				<a className="me-3" href="#">Política de cookies</a>
				<a className="me-3" href="#">Política de Copyright</a>
				<a className="me-3" href="#">Condiciones legales</a>
			
			
			</div>
			<div className="iconos-footer">
				<span className="list-inline-item me-4">¡Síguenos!</span>
				<a className="me-4" href="https://www.facebook.com/groups/fitiniespana/?locale=es_LA" target="_blank"><FaFacebook /></a>
				<a className="me-4" href="https://www.instagram.com/empleos_espana.es" target="_blank"><FaInstagram /></a>
				<a className="me-4" href="https://x.com/empleocero" target="_blank"><FaTwitter /></a>
				
			</div>
			
	</footer>
	</div>
	
);
