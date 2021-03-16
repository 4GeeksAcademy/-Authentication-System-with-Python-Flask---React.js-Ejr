import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import tomatelo from "../../img/logo/tomatelo2.png";
import "../../styles/nav.scss";
import "../../styles/public.scss";

export const NavLogin = () => {
	const handleMenu = e => {
		e.preventDefault();
		$("nav").toggleClass("hide");
	};

	return (
		<Container fluid>
			<div className="container">
				<div className="header-wrap">
					<div className="header-top d-flex justify-content-between align-items-center">
						<div className="logo">
							<a href="##">
								<span>
									<img className="logomove" src={tomatelo} alt="Logo de la página" />
								</span>
							</a>
							{/* <span className="text-white top text-uppercase">TOMATELO</span> */}
						</div>
						<div className="main-menubar d-flex align-items-center">
							<nav className="hide">
								<a href="#Tomatelo">TOMATE`LO</a>
								<a href="#AboutContent">Content</a>
								<a href="#Login">Login</a>
							</nav>
							<div className="menu-bar" onClick={e => handleMenu(e)}>
								<span className="fas fa-bars" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};
// Prueba de Angel
