import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer py-3 d-flex justify-content-evenly align-items-center text-start text-light mt-5 row">
		<p className="m-0 col-md-4 col-10">
			© 2024 HablemosUY. Todos los derechos reservados.
		</p>
		<p className="m-0 col-md-6 col-10 text-end">
			<p>
				Síguenos en redes sociales
				<i className="fa-brands fa-instagram ms-2"></i>
				<i className="fa-brands fa-x-twitter ms-2"></i>
				<i className="fa-brands fa-linkedin ms-2"></i>
			</p>
			<p>
				<Link to="/vistaLegalDocs" className="login__forgot text-light mx-3">Términos y Condiciones</Link>
				|<Link to="/vistaLegalDocs" className="login__forgot text-light mx-3">Declaración de Privacidad</Link>
				|<Link to="/vistaLegalDocs" className="login__forgot text-light ms-3">Aviso Legal</Link>
			</p>
		</p>
	</footer>
);
