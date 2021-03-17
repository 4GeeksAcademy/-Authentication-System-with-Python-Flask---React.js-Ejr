import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import tomatelo from "../../img/logo/tomatelo2.png";
import "../../styles/disable_scroll.scss";
import "../../styles/home.scss";

export const NavFav = () => {
	const handleMenu = e => {
		e.preventDefault();
		$("nav").toggleClass("hide");
	};

	return (
		<Container>
			<div className="header-wrap">
				<div className="header-top d-flex justify-content-between align-items-center">
					<div className="logo">
						<Link to="/home">
							<span>
								<img className="logomove" src={tomatelo} alt="Logo de la página" />
							</span>
						</Link>
						{/* <span className="text-white top text-uppercase">PROYECTO M||RA</span> */}
					</div>
					<div className="main-menubar d-flex align-items-center">
						<nav className="hide">
							<Link to="/home">
								<a>Home</a>
							</Link>
							<a href="#Favorites">Favorites</a>
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
