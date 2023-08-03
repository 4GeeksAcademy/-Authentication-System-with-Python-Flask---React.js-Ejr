import React from "react";
import { Link } from "react-router-dom";


export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
				 <icon className="fa-duotone fa-house" fade style={{"--fa-primary-color": "#757575", "--fa-secondary-color": "#757575",}}/>
				</Link>
				<Link to="/register">
					<button className="navbar-button mb-0 h1">Register</button>
				</Link>
				<Link to="/">
					<button className="navbar-button mb-0 h1">Login</button>
				</Link>
				<Link to="/">
					<button className="navbar-button mb-0 h1">Destination Search</button>
				</Link>
				<Link to="/">
					<button className="navbar-button mb-0 h1">Favorites</button>
				</Link>
			
			</div>
		</nav>
	);
};
