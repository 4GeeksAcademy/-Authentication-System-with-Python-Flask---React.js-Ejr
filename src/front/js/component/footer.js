import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer text-center py-5 text-center">
		<div className="container d-md-flex justify-content-evenly">
			<div className="text-center mb-4">
				<h4 className="">
					<Link to="/login" id="footerH4">
					WhataCar
					</Link>
				</h4>
			</div>

			<div className="">
				<h5 className="text-start ps-2 ms-4">
					WhataCar
				</h5>
				<ul className="text-start">
					<Link to="/sobre-nosotros">
					<li>Sobre Nosotros</li>
					</Link>
					<Link to="/como-funciona">
					<li>Cómo funciona</li>
					</Link>
					
				</ul>
			</div>
			
			<div className="">
			<h5 className="text-start ps-2 ms-4">
					Soporte
				</h5>
				<ul className="text-start">
					<Link to="/centro-de-ayuda">
					<li>Centro de Ayuda</li>
					</Link>
					<Link to="/reglas-de-publicacion">
					<li>Reglas de Publicación</li>
					</Link>
				</ul>
			</div>
			
			<div className="">
			<h5 className="text-start ps-2 ms-4">
					Legal
				</h5>
				<ul className="text-start">
					<Link to="/aviso-legal">
					<li>Aviso Legal</li>
					</Link>
					<Link to="/politica-de-privacidad">
					<li>Política de Privacidad</li>
					</Link>
				</ul>
				</div>

				<div className="">
					<h5 className="text-start ps-2 ms-4">
						Cookies
					</h5>
				<ul className="text-start">
					<Link to="/nuestros-socios">
					<li>Nuestros Socios</li>
					</Link>					
					<Link to="/politica-de-cookies">
					<li>Política de Cookies</li>
					</Link>
					
				</ul>
				</div>



		</div>
	
	</footer>
);
