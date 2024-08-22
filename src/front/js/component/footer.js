import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer py-3 d-flex justify-content-evenly align-items-center text-light mt-5 row">
		<p className="m-0 col-md-4 col-10">
		© 2024 HablemosUY. Todos los derechos reservados.
		</p>
		<p className="m-0 col-md-6 col-10">
		Síguenos en redes sociales | 
		<Link to="/vistaLegalDocs" className="login__forgot text-light m-3">Términos y Condiciones</Link>
		 |<Link to="/vistaLegalDocs" className="login__forgot text-light m-3">Declaración de Privacidad</Link>
		</p>
	</footer>
);
