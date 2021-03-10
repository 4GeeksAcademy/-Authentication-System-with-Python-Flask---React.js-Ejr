import React from "react";
//import { Link } from "react-router-dom";
//import { Container } from "react-bootstrap";
import tomatelo from "../../img/logo/tomatelo2.png";
import "../../styles/home.scss";

export const Navbar = () => {
	const handleMenu = e => {
		e.preventDefault();
		$("nav").toggleClass("hide");
		$("span", this).toggleClass("lnr-menu lnr-cross");
		$(".main-menu").addClass("mobile-menu");
	};

	return (
		<div className="header-wrap">
			<div className="header-top d-flex justify-content-between align-items-center">
				<div className="logo">
					<a href="##">
						<span>
							<img className="logomove" src={tomatelo} alt="Logo de la página" />
						</span>
					</a>
					{/* <span className="text-white top text-uppercase">PROYECTO M||RA</span> */}
				</div>
				<div className="main-menubar d-flex align-items-center">
					<nav className="hide">
						<a href="#">Inicio</a>
						<a href="#">Generico</a>
						<a href="#">Elementos</a>
					</nav>
					<div className="menu-bar" onClick={e => handleMenu(e)}>
						<span className="fas fa-bars" />
					</div>
				</div>
			</div>
		</div>
	);
};
// Prueba de Angel
