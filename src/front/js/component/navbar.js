import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/klipartz.com.png";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="d-flex justify-content-between m-3 w-100">
				<div>
					<Link to="/">
						<img className="logo" src={logo}  />
					</Link>
				</div>
				<div className="ml-auto">
					<i class="fa-solid fa-circle-user fa-2x"></i>
				</div>
			</div>
		</nav>
	);
};
