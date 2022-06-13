import React, { Component } from "react";

export const Footer = () => (
		<footer className="footer mt-auto py-3 text-center">
		<div className="container">
			<p>Logo Proyecto Final</p>
		</div>
		<div className="container d-flex justify-content-evenly">
			<div>Política de Privacidad</div>
			<div>Términos del Servicio</div>
			<div>Contacto</div>
		</div>
		<hr class="text-primary border-4 opacity-50"></hr>
		<div className="container">
			<p className="text-secondary">
				© influĕre 2022 Todos los derechos reservados
			</p>
		</div>
	</footer>
);
