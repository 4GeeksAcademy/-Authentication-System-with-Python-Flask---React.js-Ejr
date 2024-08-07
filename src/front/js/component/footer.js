import React, { Component } from "react";
import "../../styles/footer.css";
import { FaFacebook, FaInstagram, FaTwitter  } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer flex-sm-row flex-column text-center ">
			<div className="text-footer ">
			<ul className="d-flex list-inline m-0">
				<li className="list-inline-item me-4"><a href="#">Sobre nosotros</a></li>
				<li className="list-inline-item me-4"><a href="#">Contáctanos</a></li>
				<li className="list-inline-item me-4"><a href="#">Política de privacidad</a></li>
				<li className="list-inline-item me-4"><a href="#">Política de cookies</a></li>
				<li className="list-inline-item me-4"><a href="#">Política de Copyright</a></li>
				<li className="list-inline-item me-4"><a href="#">Condiciones legales</a></li>
			
			</ul>
			</div>
			<div className="iconos-footer ">
			<ul className="d-flex list-inline m-0">
				<li className="list-inline-item me-4">¡Síguenos!</li>
				<li className="list-inline-item me-4"><a href="https://www.facebook.com/groups/fitiniespana/?locale=es_LA" target="_blank"><FaFacebook /></a></li>
				<li className="list-inline-item me-4"><a href="https://www.instagram.com/empleos_espana.es" target="_blank"><FaInstagram /></a></li>
				<li className="list-inline-item me-4"><a href="https://x.com/empleocero" target="_blank"><FaTwitter /></a></li>
				
			</ul>
			</div>

	</footer>
);
