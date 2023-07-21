import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer text-center py-5 text-center mt-4">
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
					<li>Sobre Nosotros</li>
					<li>Cómo funciona</li>
					
				</ul>
			</div>
			
			<div className="">
			<h5 className="text-start ps-2 ms-4">
					Soporte
				</h5>
				<ul className="text-start">
					<li>Centro de Ayuda</li>
					<li>Reglas de Publicación</li>
					
				</ul>
			</div>
			
			<div className="">
			<h5 className="text-start ps-2 ms-4">
					Legal
				</h5>
				<ul className="text-start">
					<li>Aviso Legal</li>
					<li>Política de Privacidad</li>
					
				</ul>
				</div>

				<div className="">
					<h5 className="text-start ps-2 ms-4">
						Cookies
					</h5>
				<ul className="text-start">
					<li>Nuestros Socios</li>
					<li>Política de Cookies</li>
					
				</ul>
				</div>



		</div>
	
	</footer>
);
