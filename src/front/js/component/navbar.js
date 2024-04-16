import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/klipartz.com.png";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light p-0">
			<div className="d-flex justify-content-between w-100 back-navbar align-items-center">
				<div>
					<Link to="/">
						<img className="logo m-3" src={logo}  />
					</Link>
					<a href="#queEsGuessNation" className="text-black text-decoration-none cambria fs-5 p-2">¿Que es GuessNation?</a>
					<a href="#comoJugar" className="text-black text-decoration-none cambria fs-5 p-2">¿Como Jugar?</a>
					<a href="#ranking" className="text-black text-decoration-none cambria fs-5 p-2">Ranking</a>
				</div>
				<div className="ml-auto">
					<Link to="/login">
						<i class="fa-solid fa-circle-user fa-2x m-3 text-black "></i>
					</Link>
				</div>
			</div>
		</nav>
	);
};
