import React, { Component } from "react";
import "../../styles/footer.css";
import { FaFacebook, FaInstagram, FaTwitter  } from "react-icons/fa";

export const Footer = () => (
	
	<footer className="footer d-flex  justify-content-around align-items-center m-0 mt-5">
			<div className="text-footer">
				<a className="me-3 footer-link" href="#">Sobre nosotros</a>
				<a className="me-3 footer-link" href="#">Contáctanos</a>
				<a className="me-3 footer-link" href="#">Política de privacidad</a>
				<a className="me-3 footer-link" href="#">Política de cookies</a>
				<a className="me-3 footer-link" href="#">Política de Copyright</a>
				<a className="me-3 footer-link" href="#">Condiciones legales</a>
			</div>
			<div className="iconos-footer">
				<span className="list-inline-item me-4">¡Síguenos!</span>
				<a className="me-4 rrss" href="https://www.facebook.com/groups/fitiniespana/?locale=es_LA" target="_blank"><FaFacebook /></a>
				<a className="me-4 rrss" href="https://www.instagram.com/empleos_espana.es" target="_blank"><FaInstagram /></a>
				<a className="me-4 rrss" href="https://x.com/empleocero" target="_blank"><FaTwitter /></a>
			</div>
	</footer>

	
);
