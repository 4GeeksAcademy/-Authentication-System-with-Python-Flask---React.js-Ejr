import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.jpg";

export const NavBar = () => {
	return (
			<nav className="nav">
				<div className="container nav__menu">
					<img src={logo} className="nav__logo"/>
					<Link to="/signuplogin" className="nav__btn round">
						<span>CLEANERS</span>
					</Link>
				</div>
			</nav>
		);
	};
