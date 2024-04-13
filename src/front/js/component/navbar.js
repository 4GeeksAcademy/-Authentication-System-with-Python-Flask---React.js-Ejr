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
				</div>
				<div className="ml-auto">
					<i class="fa-solid fa-circle-user fa-2x m-3 "></i>
				</div>
			</div>
		</nav>
	);
};
