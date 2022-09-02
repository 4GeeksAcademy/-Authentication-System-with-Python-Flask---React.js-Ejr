import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar" id="navbar">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate<i class="bi bi-123"></i></span>
					
				</Link>
				
			<div className="fle">
			<button type="button" class="btn ">Primary</button>
				<button type="button" class="btn ">Primary</button>
				<button type="button" class="btn ">Primary</button>
			</div>
				<div className="ml-auto" id="iconos">
				<i class="fa-solid fa-1x fa-user" id="loginicon"></i> <i class="fa-solid fa-1x fa-cart-shopping" id="cart"></i>
				
				</div>
			</div>
			
		</nav>
	);
};
