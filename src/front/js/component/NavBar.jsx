import React, { useState, useEffect, useContext, StrictMode } from "react";
import { Context } from "../store/appContext";
import { Link, useLocation } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {

	const { store, actions } = useContext(Context);

	const location = useLocation();
	const currentPath = location.pathname;

	const menu= [
		{label: 'Inicio', url: '/'},
		{label: 'Servicios', url: '/servicios'},
		{label: 'Eventos', url: '/eventos'},
		{label: 'Galería', url: '/galeria'},
		{label: 'Planes', url: '/planes'},
		{label: 'Contacto', url: '/contacto'}
	];

	return (
		<nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light shadow p-3 mb-5">
			<div className="container-fluid">
				<a className="navbar-brand" href="/">TechSports</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu"
					aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarMenu">
					<ul className="navbar-nav ms-auto mx-2 mb-2 mb-lg-0">
						{menu.map((item) => {
							console.log("DOS");
							return (
								<li className="nav-item mx-2" key={item.label} >
									<a className={`${currentPath === item.url ? "nav-link bg-primary text-white rounded-3" : "nav-link"}`}
										href={item.url}>{item.label}
									</a>
								</li>
							);
						})}
						<li>
							<a className={`${currentPath === "/cuenta" ? "nav-link bg-primary text-white rounded-3" : "nav-link"}`}
							 href="/cuenta"><i className="fa fa-fw fa-user"></i> Cuenta</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
