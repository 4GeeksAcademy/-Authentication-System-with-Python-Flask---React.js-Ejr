import React, { Component } from "react";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center back-navbar footer">
		<div className="creadores p-0">
			<ul className="cambria list-unstyled ">
				<li className="fw-bold fs-5 ">Creado por:</li>
				<li><a href="https://www.linkedin.com/in/connor-clements-425124245/" className="text-black text-decoration-none fs-6">Connor Clements  <i class="fa-brands fa-linkedin"></i></a></li>
				<li><a href="https://www.linkedin.com/in/ramiro-sca-048182226/" className="text-black text-decoration-none fs-6">Ramiro Scarinci  <i class="fa-brands fa-linkedin"></i></a></li>
				<li><a href="https://github.com/Sai40k" className="text-black text-decoration-none fs-6 pb-0 mb-0">Ivan Torres Álvarez  <i class="fa-brands fa-github"></i></a></li>
			</ul>
		</div>
		<div className="agradecimientos p-0">
			<ul className="cambria list-unstyled">
				<li className="fw-bold fs-5">Agradecimientos:</li>
				<li>Rosinni Rodriguez</li>
				<li>Amira Mandi</li>
			</ul>
		</div>
		<p>© 2024 GuessNations.</p>
		<p>
			Made with <i className="fa fa-heart text-danger" /> by{" "}
			<a href="http://www.4geeksacademy.com" className="text-danger fw-bold">4Geeks Academy</a>
		</p>
	</footer>
);
