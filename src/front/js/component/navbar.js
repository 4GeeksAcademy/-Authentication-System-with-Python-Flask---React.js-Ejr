import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar"

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				< SearchBar/>
			</div>
		</nav>
	);
};
