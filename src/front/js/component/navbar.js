import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import "../../styles/home.scss";
//ffdfdfdfHOLAAAAAAAAAAAAAAAAAAAAAA********************************************
export const Navbar = () => {
	const handleMenu = e => {
		$("nav").toggleClass("hide");
		$("span", this).toggleClass("lnr-menu lnr-cross");
		$(".main-menu").addClass("mobile-menu");
	};

	return (
		<Container>
			<div className="header-wrap">
				<div className="header-top d-flex justify-content-between align-items-center">
					<div className="logo">
						<a href="##">
							<img
								className="logomove"
								src="https://logos-download.com/wp-content/uploads/2016/09/Star_Wars_logo-1.png"
								alt=""
							/>
						</a>
						<span className="text-white top text-uppercase">PROYECTO M||RA</span>
					</div>
					<div className="main-menubar d-flex align-items-center">
						<nav className="hide">
							<a href="index.html">Inicio</a>
							<a href="generic.html">Generico</a>
							<a href="elements.html">Elementos</a>
						</nav>
						<div className="menu-bar" onClick={e => handleMenu(e)}>
							<span className="fas fa-bars" />
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};
